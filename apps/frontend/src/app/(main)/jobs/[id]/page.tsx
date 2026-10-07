import { fetchCareersJobInfo } from "@/lib/api";
import Page from "../page";
export default Page;

export const dynamic = "force-static";
export async function generateStaticParams() {
  try {
    const careers = await fetchCareersJobInfo();
    return careers?.map(({ id }) => id) || [];
  } catch (error) {
    return [];
  }
}

export { generateMetadata } from "../page";
