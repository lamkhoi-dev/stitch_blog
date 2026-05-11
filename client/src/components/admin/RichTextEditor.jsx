import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { useCallback } from 'react';
import adminService from '../../services/adminService';

function ToolbarButton({ onClick, active, icon, title }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${
        active ? 'bg-primary text-white' : 'text-on-surface-variant hover:bg-surface'
      }`}
    >
      <span className="material-symbols-outlined text-[18px]">{icon}</span>
    </button>
  );
}

function Toolbar({ editor }) {
  if (!editor) return null;

  const addImage = useCallback(async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      try {
        const result = await adminService.uploadImage(file);
        const baseUrl = import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || 'http://localhost:5001';
        editor.chain().focus().setImage({ src: `${baseUrl}${result.url}` }).run();
      } catch {
        const url = window.prompt('Nhập URL hình ảnh:');
        if (url) editor.chain().focus().setImage({ src: url }).run();
      }
    };
    input.click();
  }, [editor]);

  const addLink = useCallback(() => {
    const url = window.prompt('Nhập URL:', 'https://');
    if (url) {
      editor.chain().focus().toggleLink({ href: url, target: '_blank' }).run();
    }
  }, [editor]);

  return (
    <div className="flex flex-wrap items-center gap-0.5 p-2 border-b border-outline-variant/20 bg-surface/50">
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive('bold')}
        icon="format_bold"
        title="Bold"
      />
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        active={editor.isActive('italic')}
        icon="format_italic"
        title="Italic"
      />
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        active={editor.isActive('underline')}
        icon="format_underlined"
        title="Underline"
      />

      <div className="w-px h-6 bg-outline-variant/20 mx-1" />

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        active={editor.isActive('heading', { level: 2 })}
        icon="format_h2"
        title="Heading 2"
      />
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        active={editor.isActive('heading', { level: 3 })}
        icon="format_h3"
        title="Heading 3"
      />

      <div className="w-px h-6 bg-outline-variant/20 mx-1" />

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        active={editor.isActive('bulletList')}
        icon="format_list_bulleted"
        title="Bullet List"
      />
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        active={editor.isActive('orderedList')}
        icon="format_list_numbered"
        title="Ordered List"
      />
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        active={editor.isActive('blockquote')}
        icon="format_quote"
        title="Blockquote"
      />

      <div className="w-px h-6 bg-outline-variant/20 mx-1" />

      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        active={editor.isActive({ textAlign: 'left' })}
        icon="format_align_left"
        title="Align Left"
      />
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        active={editor.isActive({ textAlign: 'center' })}
        icon="format_align_center"
        title="Align Center"
      />

      <div className="w-px h-6 bg-outline-variant/20 mx-1" />

      <ToolbarButton onClick={addLink} active={editor.isActive('link')} icon="link" title="Link" />
      <ToolbarButton onClick={addImage} icon="image" title="Insert Image" />

      <div className="w-px h-6 bg-outline-variant/20 mx-1" />

      <ToolbarButton
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        icon="horizontal_rule"
        title="Horizontal Rule"
      />
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        active={editor.isActive('codeBlock')}
        icon="code"
        title="Code Block"
      />
    </div>
  );
}

export default function RichTextEditor({ content, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
      }),
      Image.configure({ inline: false, allowBase64: true }),
      Link.configure({ openOnClick: false, HTMLAttributes: { target: '_blank' } }),
      Placeholder.configure({ placeholder: 'Bắt đầu viết nội dung bài viết...' }),
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: content || '',
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none min-h-[350px] p-4 focus:outline-none',
      },
    },
  });

  return (
    <div className="border border-outline-variant/20 rounded-sm overflow-hidden bg-white">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
