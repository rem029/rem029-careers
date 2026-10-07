import { fetchPages } from "@/lib/api";
import Page from "../../page";

export default Page;

export const dynamic = "force-static";
export async function generateStaticParams() {
  try {
    const pages = await fetchPages();
    return pages?.map(({ slug }) => slug) || [];
  } catch (error) {
    return [];
  }
}

export { generateMetadata } from "../../page";
