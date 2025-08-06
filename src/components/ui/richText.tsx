
import dynamic from "next/dynamic";
import { useEffect } from "react";
import "react-quill-new/dist/quill.snow.css";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

function RichText(
    {
        theme,
        content,
        onChange,
        readOnly,
        error=false
    }
    :
    {
        theme?:'snow' | 'bubble';
        content:string;
        onChange: (value:string) => void;
        readOnly:boolean;
        error?:boolean;
    }
){

    useEffect(()=>{

    }, [error])

    const toolbarOptions = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
  ];

    return(
        <ReactQuill
              theme={theme}
              value={content}
              onChange={onChange}
              modules={{ toolbar: toolbarOptions }}
              readOnly={readOnly}
              className={`custom-quill text-white bg-slate-900 rounded-lg h-[30vh] ${error ? 'quill-error' : ''}`}
            />
    );
}

export default RichText;