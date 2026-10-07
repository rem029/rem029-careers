"use client";

import { Logo, Media, Menu } from "@/payload-types";
import Image from "next/image";
import Link from "next/link";
import { IoMenu } from "react-icons/io5";
import { RendererMenuItems } from "../renderer-menu-items";
import { useState } from "react";
import themes from "@/utils/themes";
import {
  BACKEND_LIVE_PREVIEW_API_ROUTE,
  BACKEND_LIVE_PREVIEW_URL,
  OPERATOR,
} from "@/utils/constant";
import {
  generateCSSOverlay,
  generateCSSProperties,
  getBgColor,
  getFontColor,
} from "@/utils/helpers";
import { useLivePreview } from "@payloadcms/live-preview-react";

export interface HeaderProps {
  logos: Logo;
  menu?: Menu;
}

export default function Header({ menu, logos }: HeaderProps) {
  const [showDrawer, setShowDrawer] = useState(false);
  const toggleDrawer = () => setShowDrawer((prevState) => !prevState);

  const { data: dataMenu } = useLivePreview({
    initialData: menu,
    serverURL: BACKEND_LIVE_PREVIEW_URL,
    depth: 2,
    apiRoute: BACKEND_LIVE_PREVIEW_API_ROUTE,
  });

  const menuHeader = dataMenu?.header;

  const responsiveClassname = `responsive__header`;

  const theme = themes[OPERATOR];

  const paddings = generateCSSProperties("padding", {
    desktop: menuHeader?.padding_desktop,
    mobile: menuHeader?.padding_mobile,
  });

  const margin = generateCSSProperties("margin", {
    desktop: menuHeader?.margin_desktop,
    mobile: menuHeader?.margin_mobile,
  });

  const width = menuHeader?.max_width || undefined;
  const widthFull = width?.full ? `width: 100%; max-width: 100%;` : "";
  const widthMax = !width?.full
    ? `width: 100%; max-width: ${Number(width?.max)}px;`
    : "";

  const bg = menuHeader?.bg || undefined;
  const bgImg = bg?.option === "img" ? (bg?.img as Media) : undefined;
  const bgFit = bg?.object_fit;

  const { value: fontColor, custom: fontCustomColor } = getFontColor(
    menuHeader?.color,
  );
  const { value: bgColor, custom: bgColorCustom } = getBgColor(menuHeader?.bg);

  const bgOpacity = menuHeader?.bg?.opacity || "";

  const ov = menuHeader?.bg?.overlay ? menuHeader?.bg?.ov : undefined;
  const overlayCSS = ov ? generateCSSOverlay(ov, theme) : "";

  const inlineStyle = `
  .${responsiveClassname} {
      position: relative;
      box-sizing: border-box;
      ${paddings.desktop.join("\n")}
      ${margin.desktop.join("\n")}
      ${widthFull}
      ${widthMax}
  }

    .${responsiveClassname}-overlay {
        ${overlayCSS}
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
        width: 100%;
        height: 100%;
        pointer-events: none;
    }

    @media only screen and (max-width: 768px) {
      .${responsiveClassname} {
          ${paddings.mobile.join("\n")}
          ${margin.mobile.join("\n")}
      }
    }
  `;

  return (
    <>
      <style>{inlineStyle}</style>
      <header
        className={`${bgColor} ${bgOpacity} relative w-full flex justify-center shadow-md shadow-neutral`}
        style={{
          backgroundColor: bgColorCustom,
        }}
      >
        <div className={`${responsiveClassname}-overlay`}></div>
        <div
          className={`${responsiveClassname} w-full flex max-lg:px-8 py-4 gap-4 flex-row items-center justify-between box-border px-2 max-md:px-1`}
          style={{
            gap: menuHeader?.num_gap || undefined,
            minHeight:
              (menuHeader?.min_height && menuHeader.min_height) || undefined,
            backgroundColor: bgColorCustom,
            backgroundImage: bgImg?.url ? `url(${bgImg?.url})` : undefined,
            backgroundSize: bgFit || undefined,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
          }}
        >
          {menuHeader?.menu && menuHeader?.menu.length > 0 && (
            <div className="drawer !w-auto hidden max-lg:block z-[9999]">
              <input
                id="side-drawer-nav"
                type="checkbox"
                className="drawer-toggle"
                checked={showDrawer}
                onChange={() => toggleDrawer()}
              />
              <div className="drawer-content flex flex-col items-center justify-center ">
                <label
                  htmlFor="side-drawer-nav"
                  className="btn btn-ghost drawer-button lg:hidden"
                >
                  <IoMenu
                    className={`text-xl ${fontColor}`}
                    style={{ color: fontCustomColor }}
                  />
                </label>
              </div>
              <div className="drawer-side z-[99] lg:hidden">
                <label
                  htmlFor="side-drawer-nav"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>
                <ul
                  className="menu bg-white text-primary min-h-full w-80 p-4 gap-6 lg:hidden"
                  onClick={() => toggleDrawer()}
                >
                  <li className="flex flex-row w-full">
                    {logos?.logo_primary && (
                      <Link className="p-0 m-0" href="/">
                        <Image
                          src={(logos.logo_primary as Media)?.url || ""}
                          alt={(logos.logo_primary as Media)?.alt || "logo_primary"}
                          width={190}
                          height={41}
                          className="w-24 h-auto object-contain"
                        />
                      </Link>
                    )}
                  </li>
                  <RendererMenuItems menuItems={menuHeader?.menu} />
                </ul>
              </div>
            </div>
          )}

          {logos?.logo_primary && (
            <Link className="p-0 m-0 px-8" href="/">
              <Image
                src={(logos.logo_primary as Media)?.url || ""}
                alt={(logos.logo_primary as Media)?.alt || "logo_primary"}
                width={190}
                height={41}
                className="w-28 h-auto object-contain"
              />
            </Link>
          )}
          <div
            className={`${fontColor} flex flex-row items-center justify-center gap-8 flex-1 max-lg:hidden max-w-fit`}
            style={{ color: fontCustomColor }}
          >
            <RendererMenuItems menuItems={menuHeader?.menu} />
          </div>
          {logos?.logo_secondary && (
            <Link className="p-0 m-0" href="/">
              <Image
                src={(logos.logo_secondary as Media)?.url || ""}
                alt={(logos.logo_secondary as Media)?.alt || "logo_secondary"}
                width={190}
                height={41}
                className="w-20 h-auto object-contain"
              />
            </Link>
          )}
        </div>
      </header>
    </>
  );
}
