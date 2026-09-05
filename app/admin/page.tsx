import Link from 'next/link';
import { ArrowLeft, ExternalLink, FilePlus2, FolderKanban } from 'lucide-react';
import { getProject, listProjects } from '@/db';
import { requireAdmin } from './actions';
import ProjectEditor from './project-editor';
import DeleteProject from './delete-project';
import './admin.css';

export const dynamic = 'force-dynamic';
export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  const user = await requireAdmin();
  const params = await searchParams;
  const items = await listProjects(true);
  const selected = params.edit ? await getProject(params.edit) : null;
  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span>✳</span>
          <div>
            <b>sora studio</b>
            <small>PORTFOLIO MANAGER</small>
          </div>
        </div>
        <Link href="/" className="back-link">
          <ArrowLeft /> Về portfolio
        </Link>
        <div className="library-title">
          <span>DỰ ÁN CỦA MÌNH</span>
          <b>{items.length}</b>
        </div>
        <Link
          className={!selected ? 'project-row active' : 'project-row'}
          href="/admin"
        >
          <FilePlus2 />
          <span>
            <b>Tạo dự án mới</b>
            <small>Bắt đầu từ trang trắng</small>
          </span>
        </Link>
        <div className="project-list">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/admin?edit=${item.id}`}
              className={
                selected?.id === item.id ? 'project-row active' : 'project-row'
              }
            >
              <FolderKanban />
              <span>
                <b>{item.title}</b>
                <small>
                  {item.category} ·{' '}
                  {item.status === 'published' ? 'Đã đăng' : 'Bản nháp'}
                </small>
              </span>
            </Link>
          ))}
        </div>
        <div className="admin-user">
          <span>{user.displayName.slice(0, 1).toUpperCase()}</span>
          <div>
            <b>{user.displayName}</b>
            <small>{user.email}</small>
          </div>
          {/* SIWC sign-out requires a top-level browser navigation. */}
          {/* oxlint-disable-next-line next(no-html-link-for-pages) */}
          <a href="/signout-with-chatgpt?return_to=/" target="_top">
            Đăng xuất
          </a>
        </div>
      </aside>
      <section className="admin-workspace">
        <header className="admin-topbar">
          <div>
            <span>WORKSPACE / PROJECTS</span>
            <p>Quản lý nội dung xuất hiện trên portfolio.</p>
          </div>
          <Link href="/" target="_blank">
            Xem trang thật <ExternalLink />
          </Link>
        </header>
        <ProjectEditor key={selected?.id ?? 'new'} project={selected} />
        {selected && (
          <div className="danger-zone">
            <div>
              <b>Vùng nguy hiểm</b>
              <p>Xóa cả nội dung dự án và ảnh đã tải lên.</p>
            </div>
            <DeleteProject id={selected.id} title={selected.title} />
          </div>
        )}
      </section>
    </main>
  );
}
