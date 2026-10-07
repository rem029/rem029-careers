export type OpacityType =
  | "0"
  | "5"
  | "10"
  | "15"
  | "20"
  | "25"
  | "30"
  | "35"
  | "40"
  | "45"
  | "50"
  | "55"
  | "60"
  | "65"
  | "70"
  | "75"
  | "80"
  | "85"
  | "90"
  | "95"
  | "100";

export interface OverlayInterface {
  children: JSX.Element | JSX.Element[];
  color?: "black" | "gray";
  opacityStart?: OpacityType;
  opacityEnd?: OpacityType;
}

export default function Overlay({
  children,
  color = "gray",
  opacityStart = "100",
  opacityEnd = "0",
}: OverlayInterface) {
  const from =
    color === "black"
      ? `from-black/${opacityStart}`
      : `from-gray-950/${opacityStart}`;

  const to =
    color === "black" ? `to-black/${opacityEnd}` : `to-gray-50/${opacityEnd}`;

  return (
    <div
      className={`absolute left-0 top-0 w-full h-full bg-gradient-to-t ${from} ${to}`}
    >
      {children}
    </div>
  );
}
