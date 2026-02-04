"use client"

import { BoldToolbar } from "@/components/toolbars/bold"
import { BulletListToolbar } from "@/components/toolbars/bullet-list"
import { HeadingToolbar } from "@/components/toolbars/heading"
import { ItalicToolbar } from "@/components/toolbars/italic"
import { LinkToolbar } from "@/components/toolbars/link"
import { OrderedListToolbar } from "@/components/toolbars/ordered-list"
import { RedoToolbar } from "@/components/toolbars/redo"
import { StrikeThroughToolbar } from "@/components/toolbars/strikethrough"
import { ToolbarProvider } from "@/components/toolbars/toolbar-provider"
import { UnderlineToolbar } from "@/components/toolbars/underline"
import { UndoToolbar } from "@/components/toolbars/undo"
import { Separator } from "@/components/ui/separator"
import Document from "@tiptap/extension-document"
import TextAlign from "@tiptap/extension-text-align"
import { Placeholder } from "@tiptap/extensions"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { useEffect } from "react"

interface RichTextFormFieldProps {
  value?: string
  onChange?: (value: string) => void
  className?: string
  disabled?: boolean
}

// Wrap the entire editor content under a single root element by overriding Document
const CustomDocument = Document.extend({
  // Keep default content expression, only customize HTML wrapper
  renderHTML({ HTMLAttributes }) {
    // All block nodes will render inside this single wrapper element
    return ["div", { ...HTMLAttributes, class: "tiptap-doc" }, 0]
  },
})

const extensions = [
  CustomDocument,
  StarterKit.configure({
    // Disable the default Document to use our custom wrapper above
    document: false,
    orderedList: {
      HTMLAttributes: {
        class: "list-decimal",
      },
    },
    bulletList: {
      HTMLAttributes: {
        class: "list-disc",
      },
    },
    heading: {
      levels: [1, 2, 3, 4],
      HTMLAttributes: {
        class: "tiptap-heading",
      },
    },
    // Configure Link extension within StarterKit
    link: {
      openOnClick: false,
      autolink: true,
      defaultProtocol: 'https',
      protocols: ['http', 'https'],
    },
  }),
  Placeholder.configure({
    placeholder: "description ...",
  }),
  TextAlign.configure({ types: ["heading", "paragraph"] }),
];

export const RichTextFormField = ({ value = "", onChange, disabled }: RichTextFormFieldProps) => {
  const editor = useEditor({
    extensions,
    content: value,
    editable: !disabled,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      // Serialize with a consistent single root wrapper
      const html = editor.getHTML()
      onChange?.(html)
    },
  })

  // Update editor content when value prop changes
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value)
    }
  }, [editor, value])

  if (!editor) return null

  return (
    <div className="border w-full relative rounded-md overflow-hidden pb-3">
      <div className="flex w-full items-center py-2 px-2 justify-between border-b  sticky top-0 left-0 bg-background z-20">
        <ToolbarProvider editor={editor}>
          <div className="flex items-center gap-2">
            <UndoToolbar />
            <RedoToolbar />
            <Separator orientation="vertical" className="h-7" />
            <HeadingToolbar />
            <Separator orientation="vertical" className="h-7" />
            <BoldToolbar />
            <ItalicToolbar />
            <UnderlineToolbar />
            <StrikeThroughToolbar />
            <OrderedListToolbar />
            <BulletListToolbar />
            <LinkToolbar />
            <Separator orientation="vertical" className="h-7" />
            {/* aligments */}
            {/* <TextAlignButton align="left" />
            <TextAlignButton align="center" />
            <TextAlignButton align="right" />
            <TextAlignButton align="justify" /> */}
          </div>
        </ToolbarProvider>
      </div>
      <div
        onClick={() => {
          editor?.chain().focus().run();
        }}
        className="cursor-text min-h-[18rem] bg-background"
      >
        <EditorContent className="outline-none" editor={editor} />
      </div>
    </div>
  )
}
