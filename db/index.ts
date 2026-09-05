import { env } from 'cloudflare:workers';

export type ProjectRecord = {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  brief: string;
  role: string;
  process: string;
  result: string;
  imageKey: string | null;
  status: 'draft' | 'published';
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};
export function getDatabase(): D1Database {
  if (!env.DB) throw new Error('Dịch vụ lưu trữ dự án chưa sẵn sàng.');
  return env.DB;
}
export function getFiles(): R2Bucket {
  if (!env.FILES) throw new Error('Kho ảnh dự án chưa sẵn sàng.');
  return env.FILES;
}
export async function listProjects(
  includeDrafts = false,
): Promise<ProjectRecord[]> {
  const where = includeDrafts ? '' : "WHERE status = 'published'";
  const result = await getDatabase()
    .prepare(
      `SELECT id,title,subtitle,category,year,brief,role,process,result,image_key AS imageKey,status,sort_order AS sortOrder,created_at AS createdAt,updated_at AS updatedAt FROM projects ${where} ORDER BY sort_order ASC,created_at DESC`,
    )
    .all<ProjectRecord>();
  return result.results;
}
export async function getProject(id: string): Promise<ProjectRecord | null> {
  return getDatabase()
    .prepare(
      'SELECT id,title,subtitle,category,year,brief,role,process,result,image_key AS imageKey,status,sort_order AS sortOrder,created_at AS createdAt,updated_at AS updatedAt FROM projects WHERE id=? LIMIT 1',
    )
    .bind(id)
    .first<ProjectRecord>();
}
