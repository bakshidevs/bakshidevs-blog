export default function BlogTitleInput({ value, onChange }: { value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <input
      className="bg-accent/10 px-3 py-5 outline-0 focus:outline-1 focus:outline-accent rounded-md"
      value={value}
      onChange={onChange}
      name="title"
      placeholder="Enter your blog title..."
    />
  );
}
