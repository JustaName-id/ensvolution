import OwnershipChangesService from '@/service/ownership-changes.service';

export const maxDuration = 30;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const ensName = url.searchParams.get('ensName');

  if (!ensName) {
    return new Response('ensName is required', { status: 400 });
  }

  const service = new OwnershipChangesService();
  const changes = await service.getOwnershipChanges(ensName);

  return new Response(JSON.stringify(changes), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
