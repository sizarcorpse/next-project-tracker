"use client";

import dynamic from "next/dynamic";
import { FC } from "react";

const Output = dynamic(
  async () => (await import("editorjs-react-renderer")).default,
  { ssr: false }
);

const style = {
  paragraph: {
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
  },
};

const EditorRender = ({ content }: any) => {
  return <Output style={style} className="text-sm" data={content} />;
};

export default EditorRender;
