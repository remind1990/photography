import Loader from '@/components/Loader';

export default function GalleryPage({ photos }: { photos: string[] }) {
  if (!photos.length) {
    return (
      <div className="flex flex-col items-center w-full min-h-[400px]">
        <Loader />
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center w-full min-h-[400px]">
      <h1 className="my-5 text-6xl">My Gallery</h1>
      <div className="grid grid-cols-4 gap-2 w-full">
        {photos?.map((url, index) => (
          <div key={index} className=" w-full h-[500px]">
            <img
              src={url}
              alt={`Photo ${index}`}
              className=" w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
