'use client';
import { useTranslations } from 'next-intl';
import React from 'react';
import { useForm } from 'react-hook-form';
import { auth } from '@/lib/firebase.config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Button from '@/ui/Button';
import { Router } from 'next/router';
import { useRouter } from 'next/navigation';

type FormData = {
  email: string;
  password: string;
};

function SignIn() {
  const { register, handleSubmit } = useForm<FormData>();
  const t = useTranslations('Contacts');
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      console.log('Signed in:', userCredential.user);
      router.push('/portfolio');
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <div className="flex flex-col w-full  min-h-[500px] items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 w-full max-w-[500px]  main-bg  p-4 rounded-md items-center justify-center"
      >
        <div className="formField">
          <label className="min-w-[100px]" htmlFor="email">
            {t('form.email_label')}
          </label>
          <input
            className="input"
            type="email"
            id="email"
            {...register('email', { required: true })}
          />
        </div>
        <div className="formField">
          <label className="min-w-[100px]" htmlFor="password">
            {t('form.password')}
          </label>
          <input
            className="input"
            type="password"
            id="password"
            {...register('password', { required: true })}
          />
        </div>
        <Button variant="primary">Sign In</Button>
      </form>
    </div>
  );
}

export default SignIn;
