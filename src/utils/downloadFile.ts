import type { Character } from '../components/card-list/card-list.types';

export const downloadFile = (
  selectedIds: number[],
  items: Character[] | null
) => {
  const headers = [
    'Id',
    'Name',
    'Height',
    'Mass',
    'Birth Year',
    'Hair Color',
    'Eye Color',
    'Skin Color',
  ];

  const rows: (string | number | null | undefined)[][] =
    items?.map((character, index) => [
      index,
      character.name,
      character.height,
      character.mass,
      character.birth_year,
      character.hair_color,
      character.eye_color,
      character.skin_color,
    ]) ?? [];

  const filteredRows = rows?.filter((row) =>
    selectedIds.includes(row[0] as number)
  );

  const csvContent = [headers, ...(filteredRows ?? [])]
    .map((row) => row.map((cell) => `"${cell}"`).join(','))
    .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `${filteredRows?.length || 0}_items.csv`;
  link.click();
  URL.revokeObjectURL(url);
};
