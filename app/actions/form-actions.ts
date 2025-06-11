// app/actions/form-actions.ts
'use server';

import {api} from '@/hooks/useApi'; // Adjust path to your Axios instance
import { cookies } from 'next/headers';

interface LoginData {
  email: string;
  password: string;
}

export async function loginAction(formData: LoginData) {
  try {
    const response = await api.post('/auth/login', {
      email: formData.email,
      password: formData.password,
    });

    const { tokens, user } = response.data;

    // Set refresh token in HTTP-only cookie
    (await
      // Set refresh token in HTTP-only cookie
      cookies()).set('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 3600, // 7 days
      path: '/',
    });

    return {
      success: true,
      accessToken: tokens.accessToken,
      user,
      redirect: '/',
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || 'Login failed',
    };
  }
}

export async function logoutAction() {
  (await cookies()).delete('refreshToken');
  return { success: true };
}