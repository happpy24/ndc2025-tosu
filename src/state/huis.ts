import { getAvatarUrl, type WithRequired } from "@/util";
import { useQuery } from "@tanstack/react-query";

import { z } from "zod";

const zodBinaryToBoolean = z.number().min(0).max(1).pipe(z.coerce.boolean());

const zodParseHuisApiDate = z.preprocess((val) => {
  if (typeof val === "string") {
    return val.replace(" ", "T");
  }
  return val;
}, z.coerce.date().nullable());

const staffSchema = z
  .object({
    staff_user_uid: z.number().nullable(),
    staff_username: z.string().nullable(),
    role_uid: z.number().nullable(),
    staff_user_id: z.number().nullable(),
  })
  .transform((staff) => ({
    name: staff.staff_username,
    osuId: staff.staff_user_id,
    roleId: staff.role_uid,
  }));

const matchSchema = z
  .object({
    uid: z.number(),
    tourney_id: z.number(),
    round_uid: z.number(),
    custom_id: z.number(),

    match_date: zodParseHuisApiDate,

    is_loser_bracket: zodBinaryToBoolean,
    is_forfeit: zodBinaryToBoolean,
    is_conditional: zodBinaryToBoolean,
    is_rescheduled: zodBinaryToBoolean,

    is_winner_bracket_gf: zodBinaryToBoolean,
    is_bracket_reset: zodBinaryToBoolean,
    is_loser_bracket_gf: zodBinaryToBoolean,
    is_group_stage: zodBinaryToBoolean,
    is_showmatch: zodBinaryToBoolean,

    round_acronym: z.string(),

    player1_id: z.number(),
    player2_id: z.number(),

    seed1: z.number(),
    seed2: z.number(),
    id1: z.number(),
    id2: z.number(),
    name1: z.string(),
    name2: z.string(),

    staff: z.array(staffSchema),

    pickems: z.array(z.object({ pickems_winner: 1 | 2 })),
    pickems_rate1: z.number(),
    pickems_rate2: z.number(),
    pickems_multiplier: z.number(),

    // mp_links: z.array(z.any()),
  })
  .transform((match) => {
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

    const supporters = match.pickems.reduce(
      ({ player1, player2 }, cur) =>
        cur.pickems_winner === 1
          ? { player1: player1 + 1, player2 }
          : { player1, player2: player2 + 1 },
      { player1: 0, player2: 0 },
    );

    const getPlayer = (i: 1 | 2) => ({
      name: match[`name${i}`],
      osuId: match[`player${i}_id`],
      seed: match[`seed${i}`],
      avatarUrl: getAvatarUrl(match[`player${i}_id`]),
      pickemsRate: match[`pickems_rate${i}`],
      supporters: supporters[`player${i}`],
    });

    type Player = WithRequired<
      Partial<ReturnType<typeof getPlayer>>,
      "name" | "avatarUrl" | "pickemsRate"
    >;

    return {
      huisId: match.uid,
      tourneyId: match.tourney_id,
      roundId: match.round_uid,
      roundAbbr: match.round_acronym,
      roundName: ROUND_NAMES[match.round_acronym] ?? "???",
      bracket: match.is_loser_bracket ? "losers" : "winners",
      customId: match.custom_id,
      date: match.match_date,
      player1: getPlayer(1) as Player,
      player2: getPlayer(2) as Player,
      showMatch: match.is_showmatch,
      pickemsMultiplier: match.pickems_multiplier,
    };
  });

const matchesSchema = z.object({
  confirmed: z.array(matchSchema),
  conditionals: z.array(z.any()),
});

export type Match = z.infer<typeof matchSchema>;

export type Player = Match["player1"];

async function fetchMatchesCurrentWeek(tourneyId: string) {
  console.log("fetching matches");
  const response = await fetch(
    "https://api.tourney.huismetbenen.nl/matches/list/current-week",
    {
      headers: { "x-tourney-id": tourneyId },
    },
  );

  if (!response.ok) {
    throw new Error(
      `${response.status} ${response.statusText}: ${response.text}`,
    );
  }

  const data = await response.json();
  const parsedData = matchesSchema.parse(data);
  const matches = parsedData.confirmed;
  return matches;
}

const TOURNEY_ID = "31"; // TODO: add tourney selection

export function useMatchesQuery() {
  return useQuery({
    queryKey: ["huis", "matches", TOURNEY_ID],
    queryFn: () => fetchMatchesCurrentWeek(TOURNEY_ID),
  });
}

export function useMatchQuery(): WithRequired<
  Partial<Match>,
  "roundName" | "bracket" | "player1" | "player2"
> {
  const { data, error, isPending } = useMatchesQuery();
  const SELECTED_MATCH = 0;

  const avatarUrl = getAvatarUrl();

  if (isPending) {
    return {
      roundName: "???",
      bracket: "???",
      player1: { name: "???", avatarUrl, pickemsRate: 0 },
      player2: { name: "???", avatarUrl, pickemsRate: 0 },
    };
  }

  if (!data?.[SELECTED_MATCH]) {
    return {
      roundName: "Unknown round",
      bracket: "???",
      player1: {
        name: "Unknown player",
        avatarUrl,
        pickemsRate: 0,
      },
      player2: {
        name: "Unknown player",
        avatarUrl,
        pickemsRate: 0,
      },
    };
  }

  return data[0];
}

const mappoolSchema = z
  .object({
    beatmaps: z.array(
      z.object({
        mod_bracket: z.literal(["NM", "HD", "HR", "DT", "TB"]),
        mod_bracket_index: z.number(),
        title: z.string(),
        artist: z.string(),
        creator_name: z.string(),
        creator_id: z.number(),
        diff_name: z.string(),
        set_id: z.number(),
        map_id: z.number(),
        is_custom_map: zodBinaryToBoolean,
        ar: z.number(),
        cs: z.number(),
        hp: z.number(),
        od: z.number(),
        bpm: z.number(),
      }),
    ),
  })
  .transform((mappool) =>
    mappool.beatmaps.map(
      ({
        mod_bracket,
        mod_bracket_index,
        creator_name,
        creator_id,
        diff_name,
        set_id,
        map_id,
        is_custom_map,
        ...map
      }) => ({
        modBracket: mod_bracket,
        modBracketIndex: mod_bracket_index,
        creatorName: creator_name,
        creatorId: creator_id,
        diffName: diff_name,
        setId: set_id,
        mapId: map_id,
        isCustomMap: is_custom_map,
        ...map,
      }),
    ),
  );

export type Mappool = z.infer<typeof mappoolSchema>;

async function fetchMappool(tourneyId: string, roundAbbr: string) {
  console.log("fetching mappool");
  const response = await fetch(
    `https://api.tourney.huismetbenen.nl/mappools/get/${roundAbbr}`,
    {
      headers: { "x-tourney-id": tourneyId },
    },
  );

  if (!response.ok) {
    throw new Error(
      `${response.status} ${response.statusText}: ${response.text}`,
    );
  }

  const data = await response.json();
  const parsedData = mappoolSchema.parse(data);
  return parsedData;
}

export function useMappoolQuery() {
  const { roundAbbr } = useMatchQuery();

  return useQuery({
    enabled: !!roundAbbr,
    queryKey: ["huis", "mappool", TOURNEY_ID, roundAbbr],
    queryFn: () => (roundAbbr ? fetchMappool(TOURNEY_ID, roundAbbr) : []),
  });
}

export function useSchedulingQuery() {
  const matches = useMatchesQuery();

  const data = matches.data;

  // const data = matches.data?.map()

  return { ...matches, data };
}
