import { Metadata } from "next";
import "@xyflow/react/dist/style.css"
import {redirect} from "next/navigation";
import {ensSchema} from "@/schemas/ens.schema";
import ENSFlow from '@/components/ENSFlow';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const metadata: Metadata = {
  title: "ENSvolution | Visualize ENS Profile Evolution",
  description: "Interactive visualization of ENS profile changes over time",
};

export default async function HomePage({ searchParams }: Props) {
  const currSearchParams = await searchParams;
  const ensName = currSearchParams.name ? Array.isArray(currSearchParams.name) ? currSearchParams.name[0] : currSearchParams.name : null
  if(!ensName) redirect('?name=nick.eth')
  if(!ensSchema.safeParse({ensName}).success) redirect('404')

  return (
      <ENSFlow ensName={ensName} />
  )
}
