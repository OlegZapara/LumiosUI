import { z } from "zod";

export function withFallback<T>(schema: z.ZodType<T>, fallback: T) {
  return z.preprocess(
    (value) => {
      const parseResult = schema.safeParse(value);
      if (parseResult.success) return value;
      return fallback;
    },
    z.custom((v) => true),
  );
}
