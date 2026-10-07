import "./globals.css";
import Header from "./_components/header";
import Footer from "./_components/footer";
import { fontDefault } from "./fonts";
import { fetchLogos, fetchMenuHeader } from "@/lib/api";
import { Media } from "@/payload-types";
import { defaultMedata } from "@/utils/metaData";
import { Metadata } from "next";
import Analytics from "./_components/analytics";
import { OPERATOR } from "@/utils/constant";
import HeaderNew from "./_components/header-new";

export const metadata: Metadata = defaultMedata;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const logos = await fetchLogos();
  const menu = await fetchMenuHeader();
  const {
    header: { use_layout: useLayoutHeader },
    footer: { grouped_menu: menuFooter },
  } = menu;

  return (
    <html lang="en" data-theme={OPERATOR}>
      <head>
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no"
        />
        {logos?.favicon && (
          <link rel="icon" href={(logos?.favicon as Media)?.url || ""} sizes="any" />
        )}
      </head>
      <body
        className={`${fontDefault.className}bg-white w-screen overflow-x-hidden`}
      >
        {useLayoutHeader && <HeaderNew menu={menu} />}
        {!useLayoutHeader && <Header menu={menu} logos={logos} />}
        <Analytics />
        <div className="w-full">{children}</div>
        <Footer menuGroupedItems={menuFooter || []} logos={logos} />
      </body>
    </html>
  );
}
