'use client';
import Loader from '@/components/Loader';
import Button from '@/ui/Button';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';

type Props = {};

function ContactForm({}: Props) {
  const t = useTranslations('Contacts');
  const { register, handleSubmit } = useForm();
  const [loader, setLoader] = useState<boolean>(false);

  const submitForm = async (data: any) => {
    try {
      setLoader(true);
      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.message);
      } else {
        console.error('Failed to send email');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <form
      className="flex flex-col gap-6 w-[50%] border border-stone-800 p-8 text-stone-800 rounded-md"
      onSubmit={handleSubmit(submitForm)}
    >
      <h2 className="text-xl">{t('contact_form_title')}</h2>
      <div className="formField">
        <label className="min-w-[100px]" htmlFor="name">
          {t('form.name_label')}
        </label>
        <input
          className="input"
          type="text"
          id="name"
          {...register('name', { required: true })}
          autoFocus
        />
      </div>
      <div className="formField">
        <label className="min-w-[100px]" htmlFor="surname">
          {t('form.surname_label')}
        </label>
        <input
          className="input"
          type="text"
          id="surname"
          {...register('surname', { required: true })}
        />
      </div>
      <div className="formField">
        <label className="min-w-[100px]" htmlFor="phone">
          {t('form.phone_label')}
        </label>
        <input
          className="input"
          type="text"
          id="phone"
          {...register('phone', { required: true })}
        />
      </div>
      <div className="formField">
        <label className="min-w-[100px]" htmlFor="email">
          {t('form.email_label')}
        </label>
        <input
          className="input"
          type="text"
          id="email"
          {...register('email', { required: true })}
        />
      </div>
      <div className="formField">
        <label className="min-w-[100px]" htmlFor="comment">
          {t('form.comment_label')}
        </label>
        <textarea
          className="input"
          id="comment"
          {...register('comment', { required: true })}
        />
      </div>
      <Button size="medium">
        {loader ? (
          <Loader width="24px" height="24px" />
        ) : (
          t('form.submit_button')
        )}
      </Button>
    </form>
  );
}

export default ContactForm;
