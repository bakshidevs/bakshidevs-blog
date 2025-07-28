import useEditorStore from "../store/editorStore";

export default function BlogTitleInput() {
  const { blogTitle, setStateValue}= useEditorStore();
  return (
    <input
      className="bg-accent/10 px-3 py-5 outline-0 focus:outline-1 focus:outline-accent rounded-md"
      value={blogTitle}
      onChange={(e) => setStateValue({name: "blogTitle", value: e.target.value})}
      onClick={(e) => e.currentTarget.select()}
      name="blogTitle"
      placeholder="Enter your blog title..."
    />
  );
}
