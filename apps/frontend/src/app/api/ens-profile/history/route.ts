import ENSNodeProfileService from "@/service/ensnode-profile.service";

export const maxDuration = 30

export async function GET(req: Request) {
    const url = new URL(req.url);
    const ensName = url.searchParams.get('ensName');

    if (!ensName) {
        return new Response('ensName is required', { status: 400 });
    }

    const ensNodeProfileService = new ENSNodeProfileService();

    const history = await ensNodeProfileService.getProfileStates(ensName);
    return new Response(JSON.stringify(history), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
