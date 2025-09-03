import { useWebSocket } from "partysocket/react";
import { VersusScreen } from "./Versus";
import { useEffect, useState } from "react";
import { TosuDataSchema } from "./schemas/tosuData";

export type Player = {
  name: string;
  score: number;
};

export type TosuData = {
  player1: Player;
  player2: Player;
};

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
        console.error("failed to parse json schema:", e);
      }
    });

    tosuSocket.addEventListener("error", () => {
      console.error("error connecting to tosu");
    });
  }, [tosuSocket, setTosuData]);

  return <VersusScreen data={tosuData} />;
}
