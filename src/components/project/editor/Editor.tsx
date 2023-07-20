"use client";
import { EditorRender } from "@/components/project";
import EditorJS from "@editorjs/editorjs";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

const Editor = () => {
  const ref = useRef<EditorJS>();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [payload, setPayload] = useState<any>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      content: null,
    },
  });

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const List = (await import("@editorjs/list")).default;
    const Code = (await import("@editorjs/code")).default;
    const LinkTool = (await import("@editorjs/link")).default;
    const InlineCode = (await import("@editorjs/inline-code")).default;
    const SimpleImage = (await import("@editorjs/simple-image")).default;
    const Embed = (await import("@editorjs/embed")).default;

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",

        onReady() {
          ref.current = editor;
        },
        placeholder: "Type here to write project instructions",
        inlineToolbar: true,
        data: { blocks: [] },
        tools: {
          header: Header,
          linkTool: {
            class: LinkTool,
          },
          image: SimpleImage,
          list: List,
          code: Code,
          inlineCode: InlineCode,
          embed: Embed,
        },
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await initializeEditor();
    };

    if (isMounted) {
      init();
      return () => {
        ref.current?.destroy();
        ref.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);

  if (!isMounted) {
    return null;
  }

  async function onSubmit(data: any) {
    const blocks = await ref.current?.save();

    setPayload(blocks);
  }
  return (
    <>
      <div className="bg-card text-card-foreground p-8 rounded-md">
        <form
          id="subreddit-post-form"
          className="w-full text-card-foreground"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div id="editor" className="min-h-[200px] bg-white w-full" />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="mt-10">
        <EditorRender content={payload} />
      </div>
    </>
  );
};

export default Editor;
