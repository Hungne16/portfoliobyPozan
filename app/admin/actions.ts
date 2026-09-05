'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getDatabase, getFiles, getProject } from '@/db';
import { requireChatGPTUser } from '@/app/chatgpt-auth';

const acceptedImages = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
]);
export async function requireAdmin() {
  const user = await requireChatGPTUser('/admin');
  const db = getDatabase();
  const owner = await db
    .prepare('SELECT user_id FROM admins LIMIT 1')
    .first<{ user_id: string }>();
  if (!owner) {
    await db
      .prepare('INSERT INTO admins (user_id,email,created_at) VALUES (?,?,?)')
      .bind(user.userId, user.email, new Date().toISOString())
      .run();
  } else if (owner.user_id !== user.userId) {
    throw new Error('Tài khoản này không có quyền quản trị portfolio.');
  }
  return user;
}
function value(form: FormData, key: string, max = 3000) {
  const raw = form.get(key);
  return typeof raw === 'string' ? raw.trim().slice(0, max) : '';
}
function validate(form: FormData) {
  const data = {
    title: value(form, 'title', 120),
    subtitle: value(form, 'subtitle', 240),
    category: value(form, 'category', 80),
    year: value(form, 'year', 8),
    brief: value(form, 'brief'),
    role: value(form, 'role', 500),
    process: value(form, 'process'),
    result: value(form, 'result'),
    status: value(form, 'status') === 'published' ? 'published' : 'draft',
    sortOrder: Number.parseInt(value(form, 'sortOrder', 6) || '0', 10),
  } as const;
  if (
    !data.title ||
    !data.subtitle ||
    !data.category ||
    !data.year ||
    !data.brief ||
    !data.role ||
    !data.process ||
    !data.result
  )
    throw new Error('Vui lòng điền đầy đủ các trường bắt buộc.');
  return {
    ...data,
    sortOrder: Number.isFinite(data.sortOrder) ? data.sortOrder : 0,
  };
}
async function uploadImage(file: File | null, projectId: string) {
  if (!file || file.size === 0) return null;
  if (!acceptedImages.has(file.type) || file.size > 8 * 1024 * 1024)
    throw new Error('Ảnh phải là JPG, PNG, WebP hoặc GIF và nhỏ hơn 8MB.');
  const ext = file.type.split('/')[1].replace('jpeg', 'jpg');
  const key = `projects/${projectId}/${crypto.randomUUID()}.${ext}`;
  await getFiles().put(key, file.stream(), {
    httpMetadata: {
      contentType: file.type,
      cacheControl: 'public, max-age=31536000, immutable',
    },
  });
  return key;
}
export type SaveState = { ok: boolean; message: string; id?: string };
export async function saveProject(
  _state: SaveState,
  form: FormData,
): Promise<SaveState> {
  try {
    await requireAdmin();
    const db = getDatabase();
    const id = value(form, 'id', 60) || crypto.randomUUID();
    const current = await getProject(id);
    const data = validate(form);
    const image = form.get('image');
    const imageKey =
      (await uploadImage(image instanceof File ? image : null, id)) ??
      current?.imageKey ??
      null;
    const now = new Date().toISOString();
    await db
      .prepare(
        `INSERT INTO projects (id,title,subtitle,category,year,brief,role,process,result,image_key,status,sort_order,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET title=excluded.title,subtitle=excluded.subtitle,category=excluded.category,year=excluded.year,brief=excluded.brief,role=excluded.role,process=excluded.process,result=excluded.result,image_key=excluded.image_key,status=excluded.status,sort_order=excluded.sort_order,updated_at=excluded.updated_at`,
      )
      .bind(
        id,
        data.title,
        data.subtitle,
        data.category,
        data.year,
        data.brief,
        data.role,
        data.process,
        data.result,
        imageKey,
        data.status,
        data.sortOrder,
        current?.createdAt ?? now,
        now,
      )
      .run();
    if (current?.imageKey && current.imageKey !== imageKey)
      await getFiles().delete(current.imageKey);
    revalidatePath('/');
    revalidatePath('/admin');
    return {
      ok: true,
      message:
        data.status === 'published'
          ? 'Đã đăng dự án lên portfolio.'
          : 'Đã lưu bản nháp.',
      id,
    };
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : 'Không thể lưu dự án lúc này.',
    };
  }
}
export async function deleteProject(form: FormData) {
  await requireAdmin();
  const id = value(form, 'id', 60);
  const current = await getProject(id);
  if (current?.imageKey) await getFiles().delete(current.imageKey);
  await getDatabase().prepare('DELETE FROM projects WHERE id=?').bind(id).run();
  revalidatePath('/');
  revalidatePath('/admin');
  redirect('/admin?status=deleted');
}
