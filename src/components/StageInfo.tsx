import { useMatchQuery } from "@/state/huis";

export function StageInfo() {
  const { roundName, bracket } = useMatchQuery();

  return (
    <div id="stage-info">
      <div id="stage-name">{roundName}</div>
      <div id="winner-loser">({bracket} Bracket)</div>
    </div>
  );
}
