import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { db } from '../lib/firebase';

type RegisterRequestBody = {
  email: string;
  password: string;
};

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(req: Request) {
  try {
    const body: RegisterRequestBody = await req.json();

    if (!body.email || !body.password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 },
      );
    }

    if (!isValidEmail(body.email)) {
      return NextResponse.json(
        { message: 'Invalid email format' },
        { status: 400 },
      );
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(body.password, saltRounds);

    const usersCollection = db.collection('users');
    const userDoc = await usersCollection.doc(body.email).get();

    if (userDoc.exists) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 },
      );
    }

    await usersCollection.doc(body.email).set({
      email: body.email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: 'User registered successfully' },
      { status: 201 },
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'An error occurred during registration' },
      { status: 500 },
    );
  }
}
