import type { PaginationProps } from '../components/pagination/pagination.types';

export async function makeApiQuery(
  url: string | null
): Promise<[PaginationProps, Response]> {
  if (!url) {
    throw new Error('URL is required');
  }

  const response = await fetch(url);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const data = (await response.json()) as PaginationProps;

  return [data, response];
}
