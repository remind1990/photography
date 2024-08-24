import React from 'react';

type Props = {};

const Main = (props: Props) => {
  return (
    <div className="w-full">
      <main className=" w-full min-h-[500px] flex">
        <div className="w-full flex flex-col items-center justify-center bg-[url('/bg1.jpg')] bg-cover bg-center text-stone-100">
          <h1>Creative platform for creating people</h1>
        </div>
      </main>
    </div>
  );
};

export default Main;
