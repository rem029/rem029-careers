import { REVALIDATE_KEY } from "@/utils/constant";
import { revalidatePath } from "next/cache";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<Response> {
  const collection = request.nextUrl.searchParams.get("collection");
  const slug = request.nextUrl.searchParams.get("slug");
  const secret = request.nextUrl.searchParams.get("secret");
  const isHomePage = request.nextUrl.searchParams.get("is_home_page") === "true";

  console.log("@next.router", collection, slug, isHomePage, secret);

  if (
    !secret ||
    secret !== REVALIDATE_KEY ||
    typeof collection !== "string" ||
    typeof slug !== "string" ||
    typeof isHomePage !== "boolean"
  ) {
    // Do not indicate that the revalidation key is incorrect in the response
    // This will protect this API route from being exploited
    return new Response("Invalid request", { status: 400 });
  }

  if (
    typeof collection === "string" &&
    typeof slug === "string" &&
    typeof isHomePage === "boolean"
  ) {
    let collectionFound = false;

    if (collection === "careers") {
      console.log("@next.router", "updating career");
      revalidatePath(`/jobs/${slug}`);
      revalidatePath(`/preview/jobs/${slug}`);
      collectionFound = true;
    }

    if (collection === "pages") {
      if (isHomePage) {
        console.log("@next.router", "updating pages home page");
        revalidatePath(`/`, "page");
        revalidatePath(`/preview`, "page");
      } else {
        console.log("@next.router", "updating pages");

        if (slug === "/jobs/[id]") {
          revalidatePath(`${slug}`, "layout");
          revalidatePath(`/preview${slug}`, "layout");
        } else {
          revalidatePath(`/${slug}`);
          revalidatePath(`/preview/${slug}`);
        }
      }
    }

    if (collection === "menus") {
      revalidatePath(`/`, "layout");
      revalidatePath(`/preview`, "layout");
      collectionFound = true;
    }

    if (collectionFound)
      return NextResponse.json({ revalidated: true, now: Date.now() });
  }

  return NextResponse.json({ revalidated: false, now: Date.now() });
}
