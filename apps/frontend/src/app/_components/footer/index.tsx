import { Logo, Media, MenuGroupedItems } from "@/payload-types";

import { RendererMenuGroupedItems } from "../renderer-menu-grouped-items";
import { fontPrimary } from "@/app/fonts";
import Link from "next/link";
import Image from "next/image";
import { OPERATOR } from "@/utils/constant";
import {
  RiFacebookCircleLine,
  RiInstagramLine,
  RiSnapchatFill,
  RiTiktokFill,
  RiTwitterXFill,
  RiYoutubeFill,
} from "react-icons/ri";
import { AiOutlineLinkedin } from "react-icons/ai";

import svgDOFooterGuiness from "../../../../public/dohaoasis/awards-01_Guiness.svg";
import svgDOFooterGuinessSub01 from "../../../../public/dohaoasis/awards-02_Guiness World Record _ EpiQ Coaster.svg";
import svgDOFooterGuinessSub02 from "../../../../public/dohaoasis/awards-02_Guiness World Record _ Magma Blast.svg";

import svgDOFooterBooking from "../../../../public/dohaoasis/awards-01_Booking.com.svg";
import svgDOFooterBookingSub01 from "../../../../public/dohaoasis/awards-02_Booking_Awards.svg";

import svgDOFooterQTAward from "../../../../public/dohaoasis/awards-01_Qatar Tourism Award.svg";
import svgDOFooterQTAwardSub01 from "../../../../public/dohaoasis/awards-02_QTA _01.svg";
import svgDOFooterQTAwardSub02 from "../../../../public/dohaoasis/awards-02_QTA _02.svg";

import svgDOFooterTripAdvisor from "../../../../public/dohaoasis/awards-01_TRIP ADVISOR_TRAVELERS CHOICE.svg";
import svgDOFooterTripAdvisorSub01 from "../../../../public/dohaoasis/awards-02_2022 Travelers CHoice_IL GALANTE.svg";
import svgDOFooterTripAdvisorSub02 from "../../../../public/dohaoasis/awards-02_2022_Travelersʼ Choice Best Awards_QALAMKAARI.svg";
import svgDOFooterTripAdvisorSub03 from "../../../../public/dohaoasis/awards-02_2023 Travelers Choice_BANYAN TREE DOHA.svg";
import svgDOFooterTripAdvisorSub04 from "../../../../public/dohaoasis/awards-02_2023 Travelers Choice_IL GALANTE.svg";
import svgDOFooterTripAdvisorSub05 from "../../../../public/dohaoasis/awards-02_2023 Travelers Choice_QALAMKARRI.svg";
import svgDOFooterTripAdvisorSub06 from "../../../../public/dohaoasis/awards-02_2023 Travelers Choice_QUEST.svg";
import svgDOFooterTripAdvisorSub07 from "../../../../public/dohaoasis/awards-02_2023 Travelers Choice_SAFFRON.svg";
import svgDOFooterTripAdvisorSub08 from "../../../../public/dohaoasis/awards-02_2024 Travelers Choice Awards_QUEST.svg";
import svgDOFooterTripAdvisorSub09 from "../../../../public/dohaoasis/awards-02_2024 Travelers Choice Awards_QUEST.svg";
import svgDOFooterTripAdvisorSub10 from "../../../../public/dohaoasis/awards-02_Best of the Best Restaurant_QALAMKARRI.svg";

import svgDOFooterISO from "../../../../public/dohaoasis/awards-01_Iso.svg";

export interface HeaderProps {
  menuGroupedItems?: MenuGroupedItems;
  logos: Logo;
}

export default function Footer({ logos, menuGroupedItems }: HeaderProps) {
  return (
    <footer className="w-full flex flex-row bg-primary text-white">
      <div className="w-full h-full grid grid-cols-2 max-lg:grid-cols-1 gap-4 py-8 px-6">
        <div className="w-full max-md:w-full h-max grid grid-cols-2 max-lg:grid-cols-1 gap-4 max-md:gap-8">
          <div className="flex flex-col flex-1 justify-between max-lg:gap-8">
            {logos?.logo_primary && (
              <Link className="p-0 m-0" href="/">
                <Image
                  src={(logos.logo_primary as Media)?.url || ""}
                  alt={(logos.logo_primary as Media)?.alt || "logo_primary"}
                  width={240}
                  height={41}
                  className="w-60 max-lg:w-40 h-auto object-contain"
                />
              </Link>
            )}

            {OPERATOR === "dohaoasis" && (
              <div className="grid grid-cols-7 gap-2 max-lg:gap-1">
                <Link
                  className="w-full max-w-12 max-md:max-w-8 min-w-6 h-auto p-1"
                  href="https://www.facebook.com/thedohaoasis"
                >
                  <RiFacebookCircleLine className="w-full h-full text-secondary" />
                </Link>
                <Link
                  className="w-full max-w-12 max-md:max-w-8 min-w-6 h-auto p-1"
                  href="https://www.instagram.com/dohaoasis/"
                >
                  <RiInstagramLine className="w-full h-full text-secondary" />
                </Link>
                <Link
                  className="w-full max-w-12 max-md:max-w-8 min-w-6 h-auto p-1"
                  href="https://www.linkedin.com/company/dohaoasis/"
                >
                  <AiOutlineLinkedin className="w-full h-full text-secondary" />
                </Link>
                <Link
                  className="w-full max-w-12 max-md:max-w-8 min-w-6 h-auto p-1"
                  href="https://www.tiktok.com/@dohaoasis"
                >
                  <RiTiktokFill className="w-full h-full text-secondary" />
                </Link>
                <Link
                  className="w-full max-w-12 max-md:max-w-8 min-w-6 h-auto p-1"
                  href="https://www.snapchat.com/add/thedohaoasis"
                >
                  <RiSnapchatFill className="w-full h-full text-secondary" />
                </Link>
                <Link
                  className="w-full max-w-12 max-md:max-w-8 min-w-6 h-auto p-1"
                  href="https://www.youtube.com/@dohaoasisofficial"
                >
                  <RiYoutubeFill className="w-full h-full text-secondary" />
                </Link>
                <Link
                  className="w-full max-w-12 max-md:max-w-8 min-w-6 h-auto p-1"
                  href="https://x.com/dohaoasis"
                >
                  <RiTwitterXFill className="w-full h-full text-secondary" />
                </Link>
              </div>
            )}
          </div>

          <div className="flex h-max flex-col max-md:py-4 gap-8 max-lg:gap-4 border-l-[1px] max-lg:border-t-[1px] max-lg:border-l-0 border-white p-2 max-lg:p-0 border-opacity-15">
            <RendererMenuGroupedItems menuGroupedItems={menuGroupedItems || []} />
          </div>
        </div>

        {OPERATOR === "dohaoasis" && (
          <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4">
            <div className="grid grid-cols-3 gap-2">
              <div className="relative w-full max-w-48 h-auto aspect-square place-items-center content-center p-2 border-r-[1px] border-white border-opacity-15">
                <Image
                  src={svgDOFooterGuiness}
                  alt={"dohaoasis_footer_booking"}
                  fill
                />
              </div>
              <div className="relative w-full max-w-32 h-auto aspect-square place-items-center content-center p-1">
                <Image
                  src={svgDOFooterGuinessSub01}
                  alt={"dohaoasis_footer_booking"}
                  fill
                />
              </div>
              <div className="relative w-full max-w-32 h-auto aspect-square place-items-center content-center p-1">
                <Image
                  src={svgDOFooterGuinessSub02}
                  alt={"dohaoasis_footer_booking"}
                  fill
                />
              </div>
              <div className="relative w-full max-w-48 h-auto aspect-square place-items-center content-center p-2 border-r-[1px] border-white border-opacity-15">
                <Image
                  src={svgDOFooterBooking}
                  alt={"dohaoasis_footer_booking"}
                  fill
                />
              </div>
              <div className="relative w-full max-w-32 h-auto aspect-square place-items-center content-center p-1">
                <Image
                  src={svgDOFooterBookingSub01}
                  alt={"dohaoasis_footer_booking"}
                  fill
                />
              </div>
              <div className="relative w-full max-w-32 h-auto aspect-square place-items-center content-center p-1"></div>
              <div className="relative w-full max-w-48 h-auto aspect-square place-items-center content-center p-2 border-r-[1px] border-white border-opacity-15">
                <Image
                  src={svgDOFooterQTAward}
                  alt={"dohaoasis_footer_booking"}
                  fill
                />
              </div>
              <div className="relative w-full max-w-32 h-auto aspect-square place-items-center content-center p-1">
                <Image
                  src={svgDOFooterQTAwardSub01}
                  alt={"dohaoasis_footer_booking"}
                  fill
                />
              </div>
              <div className="relative w-full max-w-32 h-auto aspect-square place-items-center content-center p-1">
                <Image
                  src={svgDOFooterQTAwardSub02}
                  alt={"dohaoasis_footer_booking"}
                  fill
                />
              </div>
              {/* ISO Hidden */}
              <div className="max-md:hidden relative w-full max-w-48 h-auto aspect-square place-items-center content-center p-2 border-r-[0px] border-white border-opacity-15">
                {/* <Image src={svgDOFooterISO} alt={"dohaoasis_footer_booking"} fill /> */}
              </div>
              <div className="max-md:hidden relative w-full max-w-32 h-auto aspect-square place-items-center content-center p-1"></div>
              <div className="max-md:hidden relative w-full max-w-32 h-auto aspect-square place-items-center content-center p-1"></div>
              <div className="max-md:hidden relative w-full max-w-48 h-auto aspect-square place-items-center content-center p-2"></div>
              <div className="max-md:hidden relative w-full max-w-32 h-auto aspect-square place-items-center content-center p-1"></div>
              <div className="max-md:hidden relative w-full max-w-32 h-auto aspect-square place-items-center content-center p-1"></div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="relative w-full max-w-48 h-auto aspect-square place-items-center content-center p-2 border-r-[1px] border-white border-opacity-15">
                <Image
                  src={svgDOFooterTripAdvisor}
                  alt={"dohaoasis_footer_booking"}
                  fill
                />
              </div>

              <div className="relative w-full max-w-32 h-auto aspect-square place-items-center content-center p-1">
                <Image
                  src={svgDOFooterTripAdvisorSub01}
                  alt={"dohaoasis_footer_booking"}
                  fill
                />
              </div>
              <div className="relative w-full max-w-32 h-auto aspect-square place-items-center content-center p-1">
                <Image
                  src={svgDOFooterTripAdvisorSub02}
                  alt={"dohaoasis_footer_booking"}
                  fill
                />
              </div>

              <div className="relative w-full max-w-48 h-auto aspect-square place-items-center content-center p-2 border-r-[1px] border-white border-opacity-15"></div>
              <div className="relative w-full max-w-32 h-auto aspect-square place-items-center content-center p-1">
                <Image
                  src={svgDOFooterTripAdvisorSub03}
                  alt={"dohaoasis_footer_booking"}
                  fill
                />
              </div>
              <div className="relative w-full max-w-32 h-auto aspect-square place-items-center content-center p-1">
                <Image
                  src={svgDOFooterTripAdvisorSub04}
                  alt={"dohaoasis_footer_booking"}
                  fill
                />
              </div>

              <div className="relative w-full max-w-48 h-auto aspect-square place-items-center content-center p-2 border-r-[1px] border-white border-opacity-15"></div>
              <div className="relative w-full max-w-32 h-auto aspect-square place-items-center content-center p-1">
                <Image
                  src={svgDOFooterTripAdvisorSub05}
                  alt={"dohaoasis_footer_booking"}
                  fill
                />
              </div>
              <div className="relative w-full max-w-32 h-auto aspect-square place-items-center content-center p-1">
                <Image
                  src={svgDOFooterTripAdvisorSub06}
                  alt={"dohaoasis_footer_booking"}
                  fill
                />
              </div>

              <div className="relative w-full max-w-48 h-auto aspect-square place-items-center content-center p-2 border-r-[1px] border-white border-opacity-15"></div>
              <div className="relative w-full max-w-32 h-auto aspect-square place-items-center content-center p-1">
                <Image
                  src={svgDOFooterTripAdvisorSub07}
                  alt={"dohaoasis_footer_booking"}
                  fill
                />
              </div>
              <div className="relative w-full max-w-32 h-auto aspect-square place-items-center content-center p-1">
                <Image
                  src={svgDOFooterTripAdvisorSub08}
                  alt={"dohaoasis_footer_booking"}
                  fill
                />
              </div>

              <div className="relative w-full max-w-48 h-auto aspect-square place-items-center content-center p-2 border-r-[1px] border-white border-opacity-15"></div>
              <div className="relative w-full max-w-32 h-auto aspect-square place-items-center content-center p-1">
                <Image
                  src={svgDOFooterTripAdvisorSub09}
                  alt={"dohaoasis_footer_booking"}
                  fill
                />
              </div>
              <div className="relative w-full max-w-32 h-auto aspect-square place-items-center content-center p-1">
                <Image
                  src={svgDOFooterTripAdvisorSub10}
                  alt={"dohaoasis_footer_booking"}
                  fill
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col justify-center gap-2">
          <p
            className={`${fontPrimary.className} w-full text-gray-300 text-sm text-left`}
          >
            POWERED BY DOHA OASIS IT DEPARTMENT
            <span className="rounded-full w-2 h-2 bg-secondary" />
          </p>
        </div>
      </div>
    </footer>
  );
}
