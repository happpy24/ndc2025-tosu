import { MappoolScreen } from "@/Mappools";
import { SchedulingScreen } from "@/Scheduling";
import { StandbyScreen } from "@/Standby";
import { StartScreen } from "@/Startscreen";
import { VersusScreen } from "@/Versus";
import { WinnerScreen } from "@/Winner";
import z from "zod";

export const screens = {
  start: StartScreen,
  standby: StandbyScreen,
  versus: VersusScreen,
  mappool: MappoolScreen,
  scheduling: SchedulingScreen,
  winner: WinnerScreen,
} as const;

export const screensSchema = z.object(screens);
export const screenNameSchema = z.keyof(screensSchema);
export type ScreenName = z.infer<typeof screenNameSchema>;
export const screenNames = Object.keys(screens) as ScreenName[];
