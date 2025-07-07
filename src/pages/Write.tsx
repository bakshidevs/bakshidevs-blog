import { useState } from "react";

import DOMPurify from "dompurify";

export default function Write() {
  const [text, setText] = useState<string>("");
  return (
    <div>
      <h1 className="py-4 font-bold text-2xl">HTML Editor</h1>
      <textarea
        className="w-full h-96 p-4 border border-gray-300 dark:border-gray-700 rounded-md"
        placeholder="Write your HTML content here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <div className="my-4">
        <h2 className="text-xl font-semibold mb-2">Preview</h2>
        <div
          className="p-4 border border-gray-300 dark:border-gray-700 rounded-md"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(text) }}
        ></div>
      </div>
    </div>
  )
}
