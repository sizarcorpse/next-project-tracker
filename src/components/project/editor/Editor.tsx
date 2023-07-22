"use client";
import { EditorRender } from "@/components/project";
import { Button } from "@/components/ui/button";
import EditorJS from "@editorjs/editorjs";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { mutate } from "swr";

type EditorProps = {
  editable?: boolean;
  content?: any;
  projectId: string;
};

const Editor: FC<EditorProps> = ({ editable = true, content, projectId }) => {
  const ref = useRef<EditorJS>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isEditable, setIsEditable] = useState<boolean>(editable);
  const {
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      content: {},
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
    const ImageTool = (await import("@editorjs/image")).default;
    const Embed = (await import("@editorjs/embed")).default;
    const Table = (await import("@editorjs/table")).default;

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor;
        },
        placeholder: "Type here to write project instructions",
        inlineToolbar: true,
        data: content || { blocks: [] },
        readOnly: !isEditable,
        tools: {
          header: {
            class: Header,
            config: {
              placeholder: "Header",
            },
            shortcut: "CMD+SHIFT+H",
          },
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: `${process.env.NEXT_API_URL}/editor/link`,
            },
          },
          simpleImage: SimpleImage,
          list: {
            class: List,
            inlineToolbar: true,
          },
          table: Table,
          code: Code,
          inlineCode: InlineCode,
          embed: {
            class: Embed,
            config: {
              services: {
                youtube: true,
              },
            },
          },
        },
      });
    }
  }, [isEditable, content]);

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
    try {
      const blocks = await ref.current?.save();
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_API_URL}/projects/${projectId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: blocks,
          }),
        }
      );
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.message);
      }
      setIsLoading(false);
      toast.success("Project instruction updated successfully!");
      mutate(`${process.env.NEXT_API_URL}/projects/${json.data.slug}/`);
    } catch (error: any) {
      toast.error(error.message);
      setIsLoading(false);
    }
  }
  return (
    <div className="w-full h-full bg-card text-card-foreground p-8 rounded-md">
      <form
        className="w-full  h-full text-card-foreground"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div id="editor" className="bg-secondary p-4 rounded-md shadow-sm" />
        <div>
          <Button type="submit">{isLoading ? "Loading..." : "Save"}</Button>
        </div>
      </form>
    </div>
  );
};

export default Editor;
