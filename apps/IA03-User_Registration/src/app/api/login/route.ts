import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { db } from '../lib/firebase';

type LoginRequestBody = {
  email: string;
  password: string;
};

export async function POST(req: Request) {
  try {
    const body: LoginRequestBody = await req.json();

    if (!body.email || !body.password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 },
      );
    }

    const userDoc = await db.collection('users').doc(body.email).get();

    if (!userDoc.exists) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const userData = userDoc.data();
    if (!userData) {
      return NextResponse.json(
        { message: 'User data is corrupted' },
        { status: 500 },
      );
    }

    const passwordMatch = await bcrypt.compare(
      body.password,
      userData.password,
    );
    if (!passwordMatch) {
      return NextResponse.json(
        { message: 'Invalid password' },
        { status: 401 },
      );
    }

    return NextResponse.json(
      {
        email: userData.email,
        createdAt: userData.createdAt.toDate
          ? userData.createdAt.toDate().toISOString()
          : userData.createdAt,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'An error occurred during login' },
      { status: 500 },
    );
  }
}
