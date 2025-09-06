import z from "zod";
import { screenNameSchema } from "./screens";

export const settingsSchema = z.object({
  matchId: z.number(),
  automaticSelect: z.boolean(),
  activeScreen: screenNameSchema,
  previousScreen: screenNameSchema.nullish(),
  countdown: z.date().nullish(),
  bans: z.object({
    red: z.array(z.string()),
    blue: z.array(z.string()),
  }),
  picks: z.object({
    red: z.array(z.string()),
    blue: z.array(z.string()),
  }),
});

export type DashboardSettings = z.infer<typeof settingsSchema>;

export const settingsMessageSchema = z.object({
  type: z.literal("SETTINGS"),
  settings: settingsSchema,
});

export type SettingsMessage = z.infer<typeof settingsMessageSchema>;
