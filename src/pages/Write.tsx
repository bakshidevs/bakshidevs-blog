import { useState } from "react";

import DOMPurify from "dompurify";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

export default function Write() {
  const [text, setText] = useState<string>("");
  return (
    <TabGroup>
      <TabList className="flex">
        <Tab className="flex-1 text-center py-2 px-4 border-b-2 data-hover:bg-olive/30 data-selected:bg-accent/10">
          Write
        </Tab>
        <Tab className="flex-1 text-center py-2 px-4 border-b-2 data-hover:bg-olive/30 data-selected:bg-accent/10">
          Preview
        </Tab>
      </TabList>
      <TabPanels className="mt-4">
        <TabPanel>
          <h1 className="py-4 font-bold text-2xl">HTML Editor</h1>
          <textarea
            className="w-full h-96 p-4 border border-gray-300 dark:border-gray-700 rounded-md"
            placeholder="Write your HTML content here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </TabPanel>
        <TabPanel>
          <div className="my-4">
            <h2 className="text-xl font-semibold mb-2">Preview</h2>
            <div
              className="p-4 border min-h-96 border-gray-300 dark:border-gray-700 rounded-md"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(text) }}
            ></div>
          </div>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  )
}
