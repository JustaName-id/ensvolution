import {NextRequest} from "next/server";
import ENSNodeProfileService from "@/service/ensnode-profile.service";

interface QueryParams {
    ensName: string;
}

export async function GET(req: NextRequest & { query: QueryParams }) {
    const { searchParams } = req.nextUrl;
    const ensName = searchParams.get('ensName');

    if (!ensName) {
        return new Response('ensName is required', { status: 400 });
    }

    const ensNodeProfileService = new ENSNodeProfileService()

    const history = await ensNodeProfileService.getProfileStates(ensName)
    return new Response(JSON.stringify(history), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}