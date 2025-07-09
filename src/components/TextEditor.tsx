import MDEditor from '@uiw/react-md-editor';
import { useState } from 'react';
import remarkGfm from 'remark-gfm';


export default function TextEditor() {
    const [editorValue, setEditorValue] = useState<any>("# Hello World!")
    return (
        <div className="h-full">
            <h1>TextEditor</h1>
            <div className="h-full">
                <MDEditor
                    value={editorValue}
                    onChange={setEditorValue}
                    style={{
                        minHeight: "525px",
                        // backgroundColor: "#f1f1f1",
                        color: "#FAF4ED"
                    }}
                    previewOptions={{
                        remarkPlugins: [remarkGfm],
                    }}
                />
                <MDEditor.Markdown
                    source={editorValue}
                    remarkPlugins={[remarkGfm]}
                />
            </div>
        </div>
    )
}
