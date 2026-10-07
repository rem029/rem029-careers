import { fetchCareersJobInfo } from "@/lib/api";
import Page from "../page";
export const dynamic = "force-dynamic";
export async function generateStaticParams() {
  try {
    const careers = await fetchCareersJobInfo();
    return careers?.map(({ id }) => id) || [];
  } catch (error) {
    return [];
  }
}

export default Page;
