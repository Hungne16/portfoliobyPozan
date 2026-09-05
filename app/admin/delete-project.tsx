'use client';
import { Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { deleteProject } from './actions';
export default function DeleteProject({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="delete-trigger">
        <Trash2 /> Xóa dự án
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Xóa “{title}”?</AlertDialogTitle>
          <AlertDialogDescription>
            Dự án và ảnh bìa sẽ bị xóa vĩnh viễn.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Giữ lại</AlertDialogCancel>
          <form action={deleteProject}>
            <input type="hidden" name="id" value={id} />
            <AlertDialogAction type="submit" variant="destructive">
              Xóa dự án
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
