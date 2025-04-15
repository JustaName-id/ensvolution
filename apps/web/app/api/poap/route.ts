import axios from 'axios';
import {serverEnv} from "@/config/serverEnv";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const address = url.searchParams.get('address');

  if (!address) {
    return new Response('Address is required', { status: 400 });
  }

  let poaps = [];

  try {
    const response = await axios.get(
      `https://api.poap.tech/actions/scan/${address}`,
      {
        headers: {
          Accept: 'application/json',
          'x-api-key': serverEnv.poapApiKey,
        },
      }
    );
    poaps = response.data;
  } catch (error) {
    console.error('Error fetching POAPs', error);
    return new Response('Error fetching POAPs', { status: 500 });
  }

  return new Response(JSON.stringify(poaps), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}