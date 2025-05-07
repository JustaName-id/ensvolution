import { Metadata, ResolvingMetadata } from "next";
import "@xyflow/react/dist/style.css";
import { redirect } from "next/navigation";
import { ensSchema } from "@/schemas/ens.schema";
import ENSFlow from '@/components/ENSFlow';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://ensvolution.xyz";

const imagesPath = "/images/og";
const ogImage = `${imagesPath}/og-default.jpg`;
const twitterImage = `${imagesPath}/twitter-card.jpg`;
const whatsappImage = `${imagesPath}/whatsapp-preview.jpg`;
const linkedinImage = `${imagesPath}/linkedin-card.jpg`;

export async function generateMetadata(
  { searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const currSearchParams = await searchParams;
  const ensName = currSearchParams.name ?
    Array.isArray(currSearchParams.name) ? currSearchParams.name[0] : currSearchParams.name
    : "nick.eth";

  const title = ensName ? `${ensName} | ENSvolution` : "ENSvolution | Visualize ENS Profile Evolution";
  const description = ensName ?
    `Explore how ${ensName}'s ENS profile has evolved over time with interactive visualizations` :
    "Interactive visualization of ENS profile changes over time - track the evolution of any ENS name";

  const url = ensName ? `${baseUrl}?name=${encodeURIComponent(ensName)}` : baseUrl;

  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    openGraph: {
      type: 'website',
      title,
      description,
      siteName: 'ENSvolution',
      url,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `ENSvolution - Visualize ${ensName || 'ENS'} profile evolution`,
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [
        {
          url: twitterImage,
          width: 1200,
          height: 628,
          alt: `ENSvolution - Visualize ${ensName || 'ENS'} profile evolution`,
        }
      ],
      creator: '@justaname_id',
    },

    other: {
      'whatsapp:image': `${baseUrl}${whatsappImage}`,
      'linkedin:image': `${baseUrl}${linkedinImage}`,
    },
  };
}

export default async function HomePage({ searchParams }: Props) {
  const currSearchParams = await searchParams;
  const ensName = currSearchParams.name ?
    Array.isArray(currSearchParams.name) ? currSearchParams.name[0] : currSearchParams.name
    : null;

  if (!ensName) redirect('?name=nick.eth');
  if (!ensSchema.safeParse({ ensName }).success) redirect('404');

  return (
    <ENSFlow ensName={ensName} />
  );
}
