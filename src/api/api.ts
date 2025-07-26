export async function makeApiQuery(url: string | null) {
  if (!url) {
    throw new Error('URL is required');
  }

  const response = await fetch(url);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const data = await response.json();
  console.log('___', data);

  return [data, response];
}
