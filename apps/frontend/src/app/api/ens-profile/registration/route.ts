import ENSRegistrationService from '@/service/ens-registration.service';

export const maxDuration = 30;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const ensName = url.searchParams.get('ensName');

  if (!ensName) {
    return new Response('ensName is required', { status: 400 });
  }

  const service = new ENSRegistrationService();
  const registration = await service.getRegistration(ensName);

  return new Response(JSON.stringify(registration), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
