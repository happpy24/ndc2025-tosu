import { useQuery } from "@tanstack/react-query";

import { z } from "zod";

const staffSchema = z.object({
  staff_user_uid: z.number().nullable(),
  staff_username: z.string().nullable(),
  role_uid: z.number().nullable(),
  staff_user_id: z.number().nullable(),
});

const binaryToBoolean = z
  .number()
  .int()
  .min(0)
  .max(1)
  .int()
  .pipe(z.coerce.boolean());

const matchSchema = z.object({
  uid: z.number().int(),
  tourney_id: z.number().int(),
  round_uid: z.number().int(),
  custom_id: z.number().int(),

  match_date: z.preprocess((val) => {
    if (typeof val === "string") {
      return val.replace(" ", "T");
    }
    return val;
  }, z.coerce.date().nullable()),

  is_loser_bracket: binaryToBoolean,
  is_forfeit: binaryToBoolean,
  is_conditional: binaryToBoolean,
  is_rescheduled: binaryToBoolean,

  is_winner_bracket_gf: binaryToBoolean,
  is_bracket_reset: binaryToBoolean,
  is_loser_bracket_gf: binaryToBoolean,
  is_group_stage: binaryToBoolean,
  is_showmatch: binaryToBoolean,

  round_acronym: z.string(),

  player1_id: z.number().int(),
  player2_id: z.number().int(),

  seed1: z.number().int(),
  seed2: z.number().int(),
  id1: z.number().int(),
  id2: z.number().int(),
  name1: z.string(),
  name2: z.string(),

  staff: z.array(staffSchema),

  pickems: z.array(z.object({ pickems_winner: 1 | 2 })),
  pickems_rate1: z.number(),
  pickems_rate2: z.number(),
  pickems_multiplier: z.number(),

  // mp_links: z.array(z.any()),
});

const huisApiResponseSchema = z.object({
  confirmed: z.array(matchSchema),
  conditionals: z.array(z.any()),
});

export type HuisPlayer = {
  huisId?: number;
  osuId?: number;
  seed?: number;
  name: string;
  avatarUrl: string;
  pickemsRate?: number;
  supporters?: number;
};

export type HuisMatch = {
  huisId?: number;
  tourneyId?: number;
  roundId?: number;
  roundAbbr?: string;
  roundName: string;
  bracket: "winners" | "losers" | "???";
  customId?: number;
  date?: Date | null;
  showMatch?: boolean;
  pickemsMultiplier?: number;
  player1: HuisPlayer;
  player2: HuisPlayer;
};

async function fetchMatchesCurrentWeek(tourneyId: string) {
  console.log("fetchMatchesCurrentWeek called");
  const response = await fetch(
    "https://api.tourney.huismetbenen.nl/matches/list/current-week",
    {
      headers: {
        "x-tourney-id": tourneyId,
      },
    },
  );

  if (!response.ok) {
    throw new Error(
      `${response.status} ${response.statusText}: ${response.text}`,
    );
  }

  const data = await response.json();
  const parsedData = huisApiResponseSchema.parse(data);
  console.log({ parsedData });

  if (!parsedData.confirmed[0]) {
    return [];
  }

  const ROUND_NAMES: Record<string, string> = {
    ro32: "Round of 32",
    ro16: "Round of 16",
    qf: "Quarter Finals",
    sf: "Semi Finals",
    f: "Finals",
    gf: "Grand Finals",
    lr1: "Losers Round 1",
    lr2: "Losers Round 2",
    lr3: "Losers Round 3",
    lr4: "Losers Round 4",
    lr5: "Losers Round 5",
    lr6: "Losers Round 6",
    lr7: "Losers Round 7",
    lr8: "Losers Round 8",
    lr9: "Losers Round 9",
    lr10: "Losers Round 10",
    lr11: "Losers Round 11",
    lr12: "Losers Round 12",
  } as const;

  const matches = parsedData.confirmed.map((match): HuisMatch => {
    const supporters = match.pickems.reduce(
      ({ player1, player2 }, cur) =>
        cur.pickems_winner === 1
          ? { player1: player1 + 1, player2 }
          : { player1, player2: player2 + 1 },
      { player1: 0, player2: 0 },
    );

    return {
      huisId: match.uid,
      tourneyId: match.tourney_id,
      roundId: match.round_uid,
      roundAbbr: match.round_acronym,
      roundName: ROUND_NAMES[match.round_acronym] || "???",
      bracket: match.is_loser_bracket ? "losers" : "winners",
      customId: match.custom_id,
      date: match.match_date,
      player1: {
        huisId: match.id1,
        name: match.name1,
        osuId: match.player1_id,
        seed: match.seed1,
        avatarUrl: `https://a.ppy.sh/${match.player1_id}`,
        pickemsRate: match.pickems_rate1,
        supporters: supporters.player1,
      },
      player2: {
        huisId: match.id2,
        name: match.name2,
        osuId: match.player2_id,
        seed: match.seed2,
        avatarUrl: `https://a.ppy.sh/${match.player2_id}`,
        pickemsRate: match.pickems_rate2,
        supporters: supporters.player2,
      },
      showMatch: match.is_showmatch,
      pickemsMultiplier: match.pickems_multiplier,
    };
  });

  return matches;
}

export function useMatchesQuery() {
  const TOURNEY_ID = "31";

  return useQuery({
    queryKey: ["tourney", "matches", "week", TOURNEY_ID],
    queryFn: () => fetchMatchesCurrentWeek(TOURNEY_ID),
    throwOnError: true,
    placeholderData: [
      {
        roundName: "???",
        bracket: "???",
        player1: { name: "???", avatarUrl: "https://a.ppy.sh" },
        player2: { name: "???", avatarUrl: "https://a.ppy.sh" },
      },
    ] satisfies HuisMatch[],
  });
}

export function useMatchQuery(): HuisMatch {
  const { data, error } = useMatchesQuery();
  const SELECTED_MATCH = 0;

  if (!data?.[SELECTED_MATCH]) {
    return {
      roundName: "Unknown round",
      bracket: "???",
      player1: {
        name: "Unknown player",
        avatarUrl: `https://a.ppy.sh`,
      },
      player2: {
        name: "Unknown player",
        avatarUrl: `https://a.ppy.sh`,
      },
    };
  }

  if (error) {
    throw new Error(error.message);
  }

  return data[0];
}
