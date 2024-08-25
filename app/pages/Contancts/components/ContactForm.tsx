'use client';
import Button from '@/ui/Button';
import React from 'react';
import { useForm } from 'react-hook-form';

type Props = {};

function ContactForm({}: Props) {
  const { register, handleSubmit } = useForm();

  const submitForm = (data: any) => {
    console.log(data);
  };
  return (
    <form
      className="flex flex-col gap-6 w-[50%] border border-stone-800 p-8 text-stone-800 rounded-md"
      onSubmit={handleSubmit(submitForm)}
    >
      <h2 className="text-xl">Hey you can send me email right here!</h2>
      <div className="formField">
        <label htmlFor="name">name</label>
        <input
          className="input"
          type="text"
          id="name"
          {...register('name', { required: true })}
          autoFocus
        />
      </div>
      <div className="formField">
        <label htmlFor="surname">Surname</label>
        <input
          className="input"
          type="text"
          id="surname"
          {...register('surname', { required: true })}
        />
      </div>
      <div className="formField">
        <label htmlFor="phone">Phone number</label>
        <input
          className="input"
          type="text"
          id="phone"
          {...register('phone', { required: true })}
        />
      </div>
      <div className="formField">
        <label htmlFor="comment">Write your request</label>
        <textarea
          className="input"
          id="comment"
          {...register('comment', { required: true })}
        />
      </div>
      <Button size="medium">Send</Button>
    </form>
  );
}

export default ContactForm;
