export interface DaisyUIThemeColors {
  primary?: string;
  secondary?: string;
  accent?: string;
  neutral?: string;
  info?: string;
  success?: string;
  warning?: string;
  error?: string;
  [key: string]: string | undefined;
}

export type DaisyUITheme = Record<string, DaisyUIThemeColors>;

const themes: DaisyUITheme = {
  printemps: {
    primary: "#00D072",
    secondary: "#E5B420",
    accent: "#6C6C6C",
    neutral: "#F3F3F3",
    info: "#9ca3af",
    success: "#4ade80",
    warning: "#eab308",
    error: "#dc2626",
  },
  dohaoasis: {
    primary: "#143422",
    secondary: "#CBB263",
    "text-black": "#696969",
    info: "#9ca3af",
    success: "#4ade80",
    warning: "#eab308",
    error: "#dc2626",
  },
  default: {
    primary: "#143422",
    secondary: "#CBB263",
    "text-black": "#696969",
    info: "#9ca3af",
    success: "#4ade80",
    warning: "#eab308",
    error: "#dc2626",
  },
};

export default themes;
