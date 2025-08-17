import type { Character } from '../components/card-list/card-list.types';
import { downloadCsvAction } from '../app/actions/downloadCsvAction';

type Props = {
  selectedIds: number[];
  items: Character[] | null;
};

export async function downloadFile({ selectedIds, items }: Props) {
  const { csvContent, fileName } = await downloadCsvAction(selectedIds, items);
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = fileName || `${selectedIds.length}_items.csv`;
  link.click();
  URL.revokeObjectURL(url);
}
