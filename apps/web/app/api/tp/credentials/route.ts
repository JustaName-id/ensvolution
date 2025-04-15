import axios from 'axios'
import {serverEnv} from "@/config/serverEnv";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const address = url.searchParams.get('address');

    if (!address) {
        return new Response('Address is required', { status: 400 })
    }

    let credentials;

    try {
        const response = await axios.get(
            `https://api.talentprotocol.com/api/v2/passport_credentials?passport_id=${address}`,
            {
                headers: {
                    Accept: 'application/json',
                    'x-api-key': serverEnv.talentProtocolApiKey,
                },
            },
        )
        credentials = response.data
    } catch (error) {
        console.error('Error fetching Talent Protocol Credentials', error)
        return new Response('Error fetching Talent Protocol Credentials', {
            status: 500,
        })
    }

    return new Response(JSON.stringify(credentials), {
        headers: {
            'Content-Type': 'application/json',
        },
    })
}