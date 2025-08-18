export async function makeApiQuery<T extends object = object>(
  url: string | null
): Promise<[T, Response]> {
  if (!url) {
    throw new Error('URL is required');
  }

  const response = await fetch(url);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const data = await response.json();

  return [data, response];
}
