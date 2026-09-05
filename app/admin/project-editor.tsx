'use client';

import { useActionState, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { ImagePlus, Save, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { saveProject, type SaveState } from './actions';
import type { ProjectRecord } from '@/db';

function SubmitButton({ published }: { published: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button className="admin-primary" type="submit" disabled={pending}>
      {pending ? (
        'Đang lưu…'
      ) : published ? (
        <>
          <Send /> Lưu & đăng
        </>
      ) : (
        <>
          <Save /> Lưu bản nháp
        </>
      )}
    </button>
  );
}

export default function ProjectEditor({
  project,
}: {
  project: ProjectRecord | null;
}) {
  const [state, action] = useActionState(saveProject, {
    ok: false,
    message: '',
  } satisfies SaveState);
  const [published, setPublished] = useState(project?.status === 'published');
  return (
    <form className="editor-form" action={action} encType="multipart/form-data">
      <input type="hidden" name="id" value={project?.id ?? state.id ?? ''} />
      <input
        type="hidden"
        name="status"
        value={published ? 'published' : 'draft'}
      />
      <div className="editor-heading">
        <div>
          <span>{project ? 'CHỈNH SỬA DỰ ÁN' : 'DỰ ÁN MỚI'}</span>
          <h2>{project?.title ?? 'Kể một câu chuyện mới'}</h2>
        </div>
        <label className="publish-control" htmlFor="publish-status">
          <span>
            <b>{published ? 'Đã đăng' : 'Bản nháp'}</b>
            <small>
              {published ? 'Hiển thị trên portfolio' : 'Chỉ bạn nhìn thấy'}
            </small>
          </span>
          <Switch
            id="publish-status"
            checked={published}
            onCheckedChange={setPublished}
            aria-label="Trạng thái đăng dự án"
          />
        </label>
      </div>
      {state.message && (
        <output
          className={state.ok ? 'form-message success' : 'form-message error'}
        >
          {state.message}
        </output>
      )}
      <div className="editor-grid">
        <label htmlFor="project-title">
          Tiêu đề dự án *
          <Input
            name="title"
            id="project-title"
            required
            maxLength={120}
            defaultValue={project?.title}
          />
        </label>
        <label htmlFor="project-category">
          Lĩnh vực *
          <Input
            name="category"
            id="project-category"
            required
            maxLength={80}
            placeholder="Brand Identity"
            defaultValue={project?.category}
          />
        </label>
        <label className="wide" htmlFor="project-subtitle">
          Mô tả ngắn *
          <Input
            name="subtitle"
            id="project-subtitle"
            required
            maxLength={240}
            defaultValue={project?.subtitle}
          />
        </label>
        <label htmlFor="project-year">
          Năm *
          <Input
            name="year"
            id="project-year"
            required
            maxLength={8}
            defaultValue={project?.year ?? new Date().getFullYear()}
          />
        </label>
        <label htmlFor="project-order">
          Thứ tự
          <Input
            name="sortOrder"
            id="project-order"
            type="number"
            defaultValue={project?.sortOrder ?? 0}
          />
        </label>
        <label className="wide" htmlFor="project-image">
          Ảnh bìa
          <ImagePlus aria-hidden="true" />
          <Input
            name="image"
            id="project-image"
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
          />
          <small>JPG, PNG, WebP hoặc GIF · tối đa 8MB</small>
        </label>
        <label className="wide" htmlFor="project-brief">
          Bối cảnh / vấn đề *
          <Textarea
            id="project-brief"
            name="brief"
            required
            defaultValue={project?.brief}
          />
        </label>
        <label className="wide" htmlFor="project-role">
          Vai trò của bạn *
          <Textarea
            id="project-role"
            name="role"
            required
            defaultValue={project?.role}
          />
        </label>
        <label className="wide" htmlFor="project-process">
          Quá trình thực hiện *
          <Textarea
            id="project-process"
            name="process"
            required
            defaultValue={project?.process}
          />
        </label>
        <label className="wide" htmlFor="project-result">
          Kết quả *
          <Textarea
            id="project-result"
            name="result"
            required
            defaultValue={project?.result}
          />
        </label>
      </div>
      <div className="editor-actions">
        <span>Mọi thay đổi được lưu an toàn vào portfolio.</span>
        <SubmitButton published={published} />
      </div>
    </form>
  );
}
