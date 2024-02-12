import React from "react";
import DOMPurify from "dompurify";
import ReactMarkdown from 'react-markdown';
import { X } from 'lucide-react';

function AiAssisted({ data,handleModelClose }) {


  return (
    <div>
        <div className="flex flex-row justify-between items-center">
            <p className="text-lg font-semibold">AI Assisted Protocol</p>
            <X onClick={handleModelClose}/>
        </div>
        <hr className="w-full my-4"/>
      <ReactMarkdown>{data}</ReactMarkdown>
    </div>
  );
}

export default AiAssisted;
