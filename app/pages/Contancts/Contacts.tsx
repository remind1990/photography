import React from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';

type Props = {};

const Contacts = (props: Props) => {
  return (
    <section className=" w-full  flex flex-col gap-20  main-bg">
      <div className="w-full flex min-h-[500px] items-center justify-center bg-[url('/bg3.jpg')] bg-center bg-cover text-stone-100">
        <h1 className="text-4xl">Lets connect!</h1>
      </div>
      <div className="w-full flex min-h-[500px] main-bg text-stone-100 p-4 gap-4">
        <ContactList />
        <ContactForm />
      </div>
    </section>
  );
};

export default Contacts;
