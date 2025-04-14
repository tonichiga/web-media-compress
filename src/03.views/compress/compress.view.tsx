import { MediaConverter } from "@/04.widgets/media-converter";

const CompressView = () => {
  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
          Media Converter
        </h1>
        <p className="mb-8 text-center text-gray-600">
          Convert your media files between different formats with ease
        </p>
        <MediaConverter />
      </div>
    </main>
  );
};

export default CompressView;
