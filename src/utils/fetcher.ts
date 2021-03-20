import axios from 'axios';

export async function fetcher (url: string): Promise<unknown> {
  const response = await axios.get(url);

  return response.data;
}
