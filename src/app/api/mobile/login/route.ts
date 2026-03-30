/**
 * POST /api/mobile/login
 * Mobile-specific auth endpoint — returns a signed JWT for Bearer token auth.
 */
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET = process.env.NEXTAUTH_SECRET || 'fallback-secret';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json() as { email: string; password: string };

    if (!email || !password) {
      return NextResponse.json({ error: 'Email et mot de passe requis' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    if (!user) {
      return NextResponse.json({ error: 'Email ou mot de passe incorrect' }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: 'Email ou mot de passe incorrect' }, { status: 401 });
    }

    const token = jwt.sign(
      { sub: user.id, email: user.email, role: user.role, clientId: user.clientId },
      SECRET,
      { expiresIn: '30d' }
    );

    return NextResponse.json({
      token,
      user: {
        id: user.id,
        clientId: user.clientId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        plan: user.plan,
      },
    });
  } catch (err) {
    console.error('[mobile/login]', err);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
