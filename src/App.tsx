import { useWebSocket } from "partysocket/react";
import { VersusScreen } from "./Versus";
import { useEffect, useState } from "react";
import z from "zod";

export type Player = {
  name: string;
  score: number;
};

export type TosuData = {
  player1: Player;
  player2: Player;
};

const TosuDataSchema = z.object({
  tourney: z.object({
    team: z.object({
      left: z.string(),
      right: z.string(),
    }),
    totalScore: z.object({
      left: z.number(),
      right: z.number(),
    }),
  }),
  beatmap: z.object({
    isKiai: z.boolean(),
    isBreak: z.boolean(),
    isConvert: z.boolean(),
    time: z.object({
      live: z.number(),
      firstObject: z.number(),
      lastObject: z.number(),
      mp3Length: z.number(),
    }),
    status: z.object({
      number: z.number(),
      name: z.string(),
    }),
    id: z.number(),
    set: z.number(),
    artist: z.string(),
    artistUnicode: z.string(),
    title: z.string(),
    titleUnicode: z.string(),
    mapper: z.string(),
    stats: z.object({
      stars: z.object({
        live: z.number(),
        total: z.number(),
      }),
      ar: z.object({
        original: z.number(),
        converted: z.number(),
      }),
      cs: z.object({
        original: z.number(),
        converted: z.number(),
      }),
      od: z.object({
        original: z.number(),
        converted: z.number(),
      }),
      hp: z.object({
        original: z.number(),
        converted: z.number(),
      }),
      bpm: z.object({
        realtime: z.number(),
        common: z.number(),
        min: z.number(),
        max: z.number(),
      }),
      maxCombo: z.number(),
    }),
  }),
});

export function App() {
  const tosuSocket = useWebSocket("ws://127.0.0.1:24050/websocket/v2");
  const [tosuData, setTosuData] = useState<TosuData>({
    player1: { name: "loading...", score: 0 },
    player2: { name: "loading...", score: 0 },
  });

  useEffect(() => {
    tosuSocket.addEventListener("open", () => {
      console.log("connected to tosu");
    });

    tosuSocket.addEventListener("close", () => {
      console.log("disconnected from tosu");
    });

    tosuSocket.addEventListener("message", (e) => {
      try {
        const json = JSON.parse(e.data);
        const parsedData = TosuDataSchema.parse(json);

        setTosuData({
          player1: {
            name: parsedData.tourney.team.left,
            score: parsedData.tourney.totalScore.left,
          },
          player2: {
            name: parsedData.tourney.team.right,
            score: parsedData.tourney.totalScore.right,
          },
        });
      } catch (e) {
        console.error("failed to parse tosu data schema:", e);
      }
    });

    tosuSocket.addEventListener("error", () => {
      console.error("error connecting to tosu");
    });
  }, [tosuSocket, setTosuData]);

  return <VersusScreen data={tosuData} />;
}
