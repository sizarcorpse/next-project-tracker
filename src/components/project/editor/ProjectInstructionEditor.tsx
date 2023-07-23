"use client";

import { Button } from "@/components/ui/button";
import { useProjectInstructionSheet } from "@/hooks/";
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

const ProjectInstructionEditor: FC<EditorProps> = ({
  editable = true,
  content,
  projectId,
}) => {
  const ref = useRef<EditorJS>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isEditable, setIsEditable] = useState<boolean>(editable);
  const { onClose } = useProjectInstructionSheet();
  const { handleSubmit } = useForm();

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
        data: content,
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

  const onSubmit = async () => {
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
  };

  return (
    <div className="w-full h-full rounded-md">
      <form
        className="text-card-foreground flex flex-col gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div
          id="editor"
          className="w-full h-full bg-card text-card-foreground p-4 rounded-md shadow-sm"
        />
        <div className="flex flex-row items-center justify-start gap-4">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Update Instruction</Button>
        </div>
      </form>
    </div>
  );
};

export default ProjectInstructionEditor;
