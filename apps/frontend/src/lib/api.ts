import { BACKEND_API_KEY, BACKEND_URL, REVALIDATE_SECONDS } from "@/utils/constant";
import {
  Analytics,
  BackgroundColor,
  Career,
  CareersApplication,
  CareersInfoSetting,
  CareersListSetting,
  CareersMedia,
  CareersSiteSetting,
  Category,
  Config,
  Logo,
  MarginDesktop,
  MarginMobile,
  Menu,
  MenuGroupedItems,
  MenuItems,
  PaddingDesktop,
  PaddingMobile,
  Page,
} from "@/payload-types";

export const AUTH_HEADER = {
  Authorization: BACKEND_API_KEY ? `users API-Key ${BACKEND_API_KEY}` : ``,
};

export async function fetchMenuHeader(): Promise<Menu> {
  const res = await fetch(`${BACKEND_URL}/api/globals/menus`, {
    headers: { ...AUTH_HEADER },
    next: {
      revalidate: REVALIDATE_SECONDS,
    },
  });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch pages data, error: ${res.status} ${res.statusText}`,
    );
  }
  const data = await res.json();

  return data;
}

export async function fetchLogos(): Promise<Logo> {
  const res = await fetch(`${BACKEND_URL}/api/globals/logos`, {
    headers: { ...AUTH_HEADER },
    next: {
      revalidate: REVALIDATE_SECONDS,
    },
  });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch pages data, error: ${res.status} ${res.statusText}`,
    );
  }
  const data = await res.json();

  return data;
}

export async function fetchCareersListSettings(): Promise<
  CareersListSetting | undefined
> {
  const res = await fetch(`${BACKEND_URL}/api/globals/careers-list-settings`, {
    headers: { ...AUTH_HEADER },
    next: {
      revalidate: REVALIDATE_SECONDS,
    },
  });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch pages data, error: ${res.status} ${res.statusText}`,
    );
  }
  const data = await res.json();
  return data ? data : undefined;
}

export async function fetchCareersInfoSettings(): Promise<
  CareersInfoSetting | undefined
> {
  const res = await fetch(`${BACKEND_URL}/api/globals/careers-info-settings`, {
    headers: { ...AUTH_HEADER },
    next: {
      revalidate: REVALIDATE_SECONDS,
    },
  });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch pages data, error: ${res.status} ${res.statusText}`,
    );
  }
  const data = await res.json();
  return data ? data : undefined;
}

export async function postCareersJob(
  careerApplicant: CareersApplication,
): Promise<Career | string | undefined> {
  const res = await fetch(`${BACKEND_URL}/api/submit-application`, {
    method: "post",
    headers: { ...AUTH_HEADER, "Content-Type": "application/json" },
    next: {
      revalidate: REVALIDATE_SECONDS,
    },
    cache: "no-store",
    body: JSON.stringify(careerApplicant),
  });

  const data = await res.json();

  if (!res.ok || res.status !== 201) {
    return data?.message || "";
  }

  const response: Career | undefined = data?.doc ? (data.doc as Career) : undefined;

  return response;
}

export async function verifyCaptcha(token: string): Promise<boolean> {
  const res = await fetch(`${BACKEND_URL}/api/verify-captcha`, {
    method: "post",
    headers: { ...AUTH_HEADER, "Content-Type": "application/json" },
    next: {
      revalidate: REVALIDATE_SECONDS,
    },
    cache: "no-store",
    body: JSON.stringify({ token }),
  });

  if (!res.ok || res.status !== 201) {
    return false;
  }

  const data = await res.json();
  const reponse = data.result;

  return reponse;
}

export const addAnalytics = async (
  eventType: Analytics["eventType"],
  path: string,
  additionalData?: any,
) => {
  await postDocCollection("analytics", {
    eventType: eventType,
    path: path,
    referrer: document.referrer || null,
    ipAddress: null,
    userAgent: navigator.userAgent,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    id: -1,
    additionalData,
  });
};

export async function postDocCollection<T extends keyof Config["collections"]>(
  collection: T,
  data: Config["collections"][T],
) {
  const res = await fetch(`${BACKEND_URL}/api/${collection}`, {
    method: "post",
    headers: { ...AUTH_HEADER, "Content-Type": "application/json" },
    next: {
      revalidate: REVALIDATE_SECONDS,
      tags: [collection],
    },
    cache: "no-store",
    body: JSON.stringify(data),
  });

  if (!res.ok || res.status !== 201) {
    return undefined;
  }

  const result = await res.json();

  const response: T | undefined = result?.doc ? (result.doc as T) : undefined;

  return response;
}

export async function postUploadMedia(
  formData: FormData,
  slug: string,
): Promise<CareersMedia | undefined> {
  const res = await fetch(`${BACKEND_URL}/api/${slug}`, {
    method: "post",
    headers: { ...AUTH_HEADER },
    next: {
      revalidate: REVALIDATE_SECONDS,
    },
    body: formData,
  });

  if (!res.ok || res.status !== 201) {
    return undefined;
  }

  const data = await res.json();
  const response: CareersMedia | undefined = data?.doc
    ? (data.doc as CareersMedia)
    : undefined;

  return response;
}

export async function fetchCareersJobInfoById(
  id: string,
): Promise<Career | undefined> {
  const res = await fetch(`${BACKEND_URL}/api/careers/${id}`, {
    headers: { ...AUTH_HEADER },
    next: {
      revalidate: REVALIDATE_SECONDS,
    },
  });

  if (!res.ok) {
    return undefined;
  }

  const data = await res.json();
  return data ? data : undefined;
}

export async function fetchCareersJobInfo(): Promise<Career[] | undefined> {
  const res = await fetch(`${BACKEND_URL}/api/careers`, {
    headers: { ...AUTH_HEADER },
    next: {
      revalidate: REVALIDATE_SECONDS,
    },
  });

  if (!res.ok) {
    return undefined;
  }

  const data = await res.json();

  return data.docs.length > 0 ? data.docs : undefined;
}

export async function fetchCategories(): Promise<Category[] | null> {
  const res = await fetch(
    `${BACKEND_URL}/api/category?where[_status][equals]=published`,
    {
      headers: { ...AUTH_HEADER },
      next: {
        revalidate: REVALIDATE_SECONDS,
      },
    },
  );

  if (!res.ok) {
    throw new Error(
      `Failed to fetch pages data, error: ${res.status} ${res.statusText}`,
    );
  }
  const data = await res.json();

  return data.docs.length > 0 ? data.docs : null;
}

export async function fetchPages(): Promise<Page[] | null> {
  const res = await fetch(
    `${BACKEND_URL}/api/pages?where[_status][equals]=published`,
    {
      headers: { ...AUTH_HEADER },
      next: {
        revalidate: REVALIDATE_SECONDS,
      },
    },
  );

  if (!res.ok) {
    throw new Error(
      `Failed to fetch pages data, error: ${res.status} ${res.statusText}`,
    );
  }
  const data = await res.json();

  return data.docs.length > 0 ? data.docs : null;
}

export async function fetchHomepageData(): Promise<Page | null> {
  const res = await fetch(
    `${BACKEND_URL}/api/pages?where[is_homepage][equals]=true`,
    {
      headers: { ...AUTH_HEADER },
      next: {
        revalidate: REVALIDATE_SECONDS,
      },
    },
  );

  if (!res.ok) {
    throw new Error(
      `Failed to fetch homepage data, error: ${res.status} ${res.statusText}`,
    );
  }
  const data = await res.json();

  return data.docs.length > 0 ? data.docs[0] : null;
}

export async function fetchPageData(slug: string): Promise<Page | null> {
  const res = await fetch(`${BACKEND_URL}/api/pages?where[slug][equals]=${slug}`, {
    headers: {
      ...AUTH_HEADER,
    },
    next: {
      revalidate: REVALIDATE_SECONDS,
    },
  });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch page data, error: ${res.status} ${res.statusText}`,
    );
  }
  const data = await res.json();

  return data.docs.length > 0 ? data.docs[0] : null;
}

export async function fetchSiteSettings(): Promise<CareersSiteSetting | null> {
  const res = await fetch(`${BACKEND_URL}/api/globals/careers-site-settings`, {
    headers: {
      ...AUTH_HEADER,
    },
    next: {
      revalidate: REVALIDATE_SECONDS,
    },
  });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch page data, error: ${res.status} ${res.statusText}`,
    );
  }
  const data = await res.json();
  return data;
}
