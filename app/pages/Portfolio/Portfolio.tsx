import Carousel from '@/components/Carousel';
import { useTranslations } from 'next-intl';

const images = [
  '/photo1.jpg',
  '/photo2.jpg',
  '/photo3.jpg',
  '/photo4.jpg',
  '/photo5.jpg',
  '/photo6.jpg',
  '/photo7.jpg',
  '/photo8.jpg',
];

const Portfolio = ({ photos }: { photos: string[] }) => {
  const t = useTranslations('Portfolio');
  return (
    <section className="w-full flex flex-col">
      <div className="w-full flex min-h-[300px] items-center justify-center bg-black text-stone-100">
        <h1 className="text-3xl md:text-6xl faded-text text-stone-100">
          {t('made_by')}
        </h1>
      </div>
      <div className="min-h-[500px]  bg-black z-1">
        <Carousel images={photos ?? images} />
      </div>
      <div className="min-h-[800px] w-full bg-[url('/bg5.jpg')] bg-cover relative">
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>
      <div className="min-h-[800px] w-full bg-[url('/bg10.jpg')] bg-cover relative">
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>
    </section>
  );
};

export default Portfolio;
