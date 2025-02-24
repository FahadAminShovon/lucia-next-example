'use server';
import { db } from '@/lib/db';
import bcyrpt from 'bcrypt';
import { cookies } from 'next/headers';
import { lucia } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { generateIdFromEntropySize } from 'lucia';

export async function signup(formData: FormData) {
  const username = formData.get('username');
  // username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
  // keep in mind some database (e.g. mysql) are case insensitive
  if (
    typeof username !== 'string' ||
    username.length < 3 ||
    username.length > 31 ||
    !/^[a-z0-9_-]+$/.test(username)
  ) {
    return {
      error: 'Invalid username',
    };
  }
  const password = formData.get('password');
  if (
    typeof password !== 'string' ||
    password.length < 6 ||
    password.length > 255
  ) {
    return {
      error: 'Invalid password',
    };
  }

  const passwordHash = await bcyrpt.hash(password, 10);
  const userId = generateIdFromEntropySize(10); // 16 characters long

  await db.user.create({
    data: {
      id: userId,
      username,
      password_hash: passwordHash,
    },
  });

  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect('/');
}
