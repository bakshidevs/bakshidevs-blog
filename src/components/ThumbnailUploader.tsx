import { UploadCloud, X } from 'lucide-react';

export default function ThumbnailUploader({
  thumbnailFile,
  setThumbnailFile,
  title
}: {
  thumbnailFile: File | null;
  setThumbnailFile: (file: File | null) => void;
  title: string;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setThumbnailFile(e.target.files[0]);
    }
  };

  return (
    <div className="bg-accent/10 mb-3 rounded-md flex justify-center items-center p-4">
      {thumbnailFile ? (
        <div className="relative">
          <img src={URL.createObjectURL(thumbnailFile)} alt={title} />
          <button
            className="absolute top-0 right-0 bg-red-500 hover:bg-red-600 p-1 rounded-md"
            onClick={() => setThumbnailFile(null)}
          >
            <X />
          </button>
        </div>
      ) : (
        <label htmlFor="blog-thumbnail" className="rounded-md border-2 border-dotted border-accent flex flex-col items-center p-8 cursor-pointer">
          <UploadCloud />
          <p className="text-accent font-semibold">Click to browse or drag & drop</p>
          <p className="text-sm text-secondary/50 dark:text-primary/50">PNG, JPG, GIF</p>
          <input id="blog-thumbnail" className="hidden" type="file" onChange={handleChange} />
        </label>
      )}
    </div>
  );
}
