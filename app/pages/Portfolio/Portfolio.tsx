import Carousel from '@/components/Carousel';

const images = ['/photo1.jpg', '/photo2.jpg', '/photo3.jpg'];

const Portfolio = () => {
  return (
    <section className="w-full flex flex-col">
      <div className="w-full flex min-h-[300px] items-center justify-center bg-black text-stone-100">
        <h1 className="text-6xl faded-text text-stone-100">
          Made by Olha Dubenko
        </h1>
      </div>
      <div className="min-h-[500px]  bg-black z-1">
        <Carousel images={images} />
      </div>
    </section>
  );
};

export default Portfolio;
