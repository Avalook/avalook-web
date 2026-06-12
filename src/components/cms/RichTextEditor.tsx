// WYSIWYG editor for the Blog Post "Body" (rich content) field.
//
// Built on TipTap. The writer formats with a toolbar (bold / headings / lists /
// links / images) and never sees HTML. Output is an HTML string saved verbatim
// into the CMS item; the public site renders it as-is (see RichText.tsx +
// src/data/content.ts, both of which detect the block-level HTML and skip the
// legacy "split blank lines into paragraphs" path).

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link2,
  Image as ImageIcon,
  Undo2,
  Redo2,
} from "lucide-react";
import type { ReactNode } from "react";

/** True when the string already carries block-level HTML (a prior TipTap save). */
const isBlockHtml = (v: string) => /<(p|h[1-6]|ul|ol|li|blockquote|figure|img|hr|table)\b/i.test(v);

/** Convert legacy plain-text (blank-line paragraphs) into HTML TipTap can load. */
const toEditorHtml = (raw: string): string => {
  const v = (raw ?? "").trim();
  if (!v) return "";
  if (isBlockHtml(v)) return v; // already HTML — load verbatim
  // Plain text (optionally with inline <a>) — blank lines become paragraphs.
  return v
    .split(/\n\n+/)
    .map((chunk) => `<p>${chunk.trim().replace(/\n/g, "<br>")}</p>`)
    .join("");
};

export function RichTextEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (html: string) => void;
}) {
  const editor = useEditor({
    immediatelyRender: false, // TanStack Start SSR — create the editor on the client
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        link: {
          openOnClick: false,
          autolink: true,
          HTMLAttributes: { rel: "noopener", target: "_blank" },
        },
      }),
      Image.configure({ HTMLAttributes: { class: "post-inline-img" } }),
      Placeholder.configure({
        placeholder: "Viết nội dung bài viết… Bôi đen chữ rồi bấm nút để định dạng.",
      }),
    ],
    content: toEditorHtml(value),
    editorProps: { attributes: { class: "cms-rte-input" } },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html === "<p></p>" ? "" : html); // normalise the empty doc to ""
    },
  });

  if (!editor) {
    return <div className="cms-rte cms-rte-loading">Đang tải trình soạn thảo…</div>;
  }

  const setLink = () => {
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Dán đường link (để trống để bỏ link):", prev ?? "https://");
    if (url === null) return; // cancelled
    if (url.trim() === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url.trim() }).run();
  };

  const addImage = () => {
    const url = window.prompt("Dán URL ảnh (vd /assets/img/cover.jpg hoặc https://…):", "");
    if (!url || !url.trim()) return;
    editor.chain().focus().setImage({ src: url.trim() }).run();
  };

  return (
    <div className="cms-rte">
      <div className="cms-rte-toolbar">
        <Btn
          onClick={() => editor.chain().focus().toggleBold().run()}
          on={editor.isActive("bold")}
          title="Đậm (Ctrl+B)"
        >
          <Bold size={15} />
        </Btn>
        <Btn
          onClick={() => editor.chain().focus().toggleItalic().run()}
          on={editor.isActive("italic")}
          title="Nghiêng (Ctrl+I)"
        >
          <Italic size={15} />
        </Btn>
        <i className="cms-rte-sep" />
        <Btn
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          on={editor.isActive("heading", { level: 2 })}
          title="Tiêu đề lớn"
        >
          <Heading2 size={15} />
        </Btn>
        <Btn
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          on={editor.isActive("heading", { level: 3 })}
          title="Tiêu đề nhỏ"
        >
          <Heading3 size={15} />
        </Btn>
        <i className="cms-rte-sep" />
        <Btn
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          on={editor.isActive("bulletList")}
          title="Danh sách chấm"
        >
          <List size={15} />
        </Btn>
        <Btn
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          on={editor.isActive("orderedList")}
          title="Danh sách số"
        >
          <ListOrdered size={15} />
        </Btn>
        <Btn
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          on={editor.isActive("blockquote")}
          title="Trích dẫn"
        >
          <Quote size={15} />
        </Btn>
        <i className="cms-rte-sep" />
        <Btn onClick={setLink} on={editor.isActive("link")} title="Chèn / sửa link">
          <Link2 size={15} />
        </Btn>
        <Btn onClick={addImage} on={false} title="Chèn ảnh">
          <ImageIcon size={15} />
        </Btn>
        <i className="cms-rte-sep" />
        <Btn
          onClick={() => editor.chain().focus().undo().run()}
          on={false}
          disabled={!editor.can().undo()}
          title="Hoàn tác (Ctrl+Z)"
        >
          <Undo2 size={15} />
        </Btn>
        <Btn
          onClick={() => editor.chain().focus().redo().run()}
          on={false}
          disabled={!editor.can().redo()}
          title="Làm lại (Ctrl+Shift+Z)"
        >
          <Redo2 size={15} />
        </Btn>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}

function Btn({
  onClick,
  on,
  title,
  disabled,
  children,
}: {
  onClick: () => void;
  on: boolean;
  title: string;
  disabled?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      className={`cms-rte-btn${on ? " is-on" : ""}`}
      title={title}
      aria-label={title}
      disabled={disabled}
      // keep the editor selection when clicking a toolbar button
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
