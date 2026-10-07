export const useFallback = <T,>(
  fallbackValue: T | null,
  contextHook: () => T,
): T => {
  return fallbackValue || contextHook();
};
