import { useEffect, useState } from "react";
import { useSettings } from "@/state/dashboard";
import { useMappoolQuery } from "@/state/huis";
import { useTosu } from "@/state/tosu";

export function CurrentMapStats() {
  const { beatmap } = useTosu();
  const { beatmaps } = useMappoolQuery();
  const [settings] = useSettings();

  const [pickedByPlayer, setPickedByPlayer] = useState<
    "player1" | "player2" | null
  >(null);

  // Determines which player picked the current map
  useEffect(() => {
    const currentMap = Object.values(beatmaps)
      .flat()
      .find((map) => map.mapId === beatmap.mapId);
    const tb = currentMap?.modBracket === "TB" && "tb";

    if (
      !currentMap?.modBracket ||
      currentMap?.modBracketIndex === undefined ||
      tb
    ) {
      setPickedByPlayer(null);
      return;
    }

    const mapIdentifier = `${currentMap.modBracket}${currentMap.modBracketIndex}`;
    const { player1, player2 } = settings;
    const pickedByPlayer = player1.picks.includes(mapIdentifier)
      ? "player1"
      : player2.picks.includes(mapIdentifier)
        ? "player2"
        : null;

    setPickedByPlayer(pickedByPlayer);
  }, [beatmaps, beatmap.mapId, settings.player1, settings.player2]);

  return (
    <div
      id="current-map"
      className={pickedByPlayer ? `current-map-picked-${pickedByPlayer}` : ""}
    >
      <img id="beatmap-background" src={beatmap.bgUrl}></img>
      <div id="current-map-info">
        <div id="current-map-name">{beatmap.title}</div>
        <div id="current-map-artist">{beatmap.artist}</div>
        <div id="diff-mapper">
          <div id="current-map-difficulty">[{beatmap.difficulty}]</div>
          <div id="current-map-mapper">Mapped by: {beatmap.mapper}</div>
        </div>
      </div>
      <div id="current-map-stats">
        <div id="current-map-cs">
          <p>CS</p>
          <div id="cs">{beatmap.cs}</div>
        </div>
        <div id="current-map-ar">
          <p>AR</p>
          <div id="ar">{beatmap.ar}</div>
        </div>
        <div id="current-map-od">
          <p>OD</p>
          <div id="od">{beatmap.od}</div>
        </div>
        <div id="current-map-sr">
          <p>SR</p>
          <div id="sr">{beatmap.stars}</div>
        </div>
        <div id="current-map-bpm">
          <p>BPM</p>
          <div id="bpm">{beatmap.bpm}</div>
        </div>
        <div id="current-map-length">
          <p>Length</p>
          <div id="length">{formatTime(beatmap.length)}</div>
        </div>
      </div>
    </div>
  );
}

function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const paddedMinutes = String(minutes).padStart(2, "0");
  const paddedSeconds = String(seconds).padStart(2, "0");
  return `${paddedMinutes}:${paddedSeconds}`;
}
