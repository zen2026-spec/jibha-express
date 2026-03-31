/**
 * POST /api/mobile/google
 * Reçoit un accessToken Google depuis l'app mobile,
 * vérifie l'identité via l'API Google UserInfo,
 * puis crée ou retrouve l'utilisateur et retourne un JWT.
 *
 * Body: { accessToken: string }
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const SECRET = process.env.NEXTAUTH_SECRET!;

interface GoogleUser {
  id: string;
  email: string;
  name: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
}

function generateClientId(): string {
  const digits = Math.floor(10000 + Math.random() * 90000);
  return `JBX${digits}`;
}

export async function POST(req: NextRequest) {
  try {
    const { accessToken } = await req.json() as { accessToken: string };

    if (!accessToken) {
      return NextResponse.json({ error: 'accessToken requis' }, { status: 400 });
    }

    // ── Vérifier le token auprès de Google ──────────────────────────────────
    const googleRes = await fetch(
      `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`,
    );
    if (!googleRes.ok) {
      return NextResponse.json({ error: 'Token Google invalide' }, { status: 401 });
    }
    const gUser = await googleRes.json() as GoogleUser;

    if (!gUser.email) {
      return NextResponse.json({ error: 'Email non disponible depuis Google' }, { status: 400 });
    }

    // ── Chercher un compte Google existant ──────────────────────────────────
    const existingAccount = await prisma.account.findUnique({
      where: { provider_providerAccountId: { provider: 'google', providerAccountId: gUser.id } },
      include: { user: true },
    });

    let user = existingAccount?.user ?? null;

    if (!user) {
      // Pas de compte Google → chercher par email
      user = await prisma.user.findUnique({ where: { email: gUser.email } }) ?? null;

      if (user) {
        // L'utilisateur existe (compte email/mdp) → lier le compte Google
        await prisma.account.create({
          data: {
            userId: user.id,
            type: 'oauth',
            provider: 'google',
            providerAccountId: gUser.id,
          },
        });
      } else {
        // Nouvel utilisateur → créer le compte
        const nameParts = (gUser.name ?? '').split(' ');
        const firstName = gUser.given_name ?? nameParts[0] ?? 'Prénom';
        const lastName  = gUser.family_name ?? nameParts.slice(1).join(' ') || 'Nom';

        // Générer un clientId unique
        let clientId = generateClientId();
        let attempts = 0;
        while (await prisma.user.findUnique({ where: { clientId } })) {
          clientId = generateClientId();
          if (++attempts > 10) throw new Error('clientId non unique');
        }

        // Hash aléatoire (l'utilisateur ne se connectera qu'avec Google)
        const passwordHash = await bcrypt.hash(crypto.randomBytes(32).toString('hex'), 10);

        user = await prisma.user.create({
          data: {
            clientId,
            email: gUser.email,
            passwordHash,
            firstName,
            lastName,
            phone: '',
            city: '',
            accounts: {
              create: {
                type: 'oauth',
                provider: 'google',
                providerAccountId: gUser.id,
              },
            },
          },
        });
      }
    }

    // ── Générer le JWT mobile ───────────────────────────────────────────────
    const token = jwt.sign(
      { sub: user.id, email: user.email, role: user.role, clientId: user.clientId },
      SECRET,
      { expiresIn: '30d' },
    );

    return NextResponse.json({
      token,
      user: {
        id:        user.id,
        clientId:  user.clientId,
        email:     user.email,
        firstName: user.firstName,
        lastName:  user.lastName,
        plan:      user.plan,
      },
    });

  } catch (err) {
    console.error('[mobile/google]', err);
    return NextResponse.json({ error: 'Erreur serveur', detail: String(err) }, { status: 500 });
  }
}
