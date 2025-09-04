import { Casters } from "./components/Casters";
import { CurrentMapStats } from "./components/CurrentMapStats";
import { Logo } from "./components/Logo";
import { PlayerInfo } from "./components/PlayerInfo";
import { ScoreBars } from "./components/ScoreBars";

export function VersusScreen() {
  return (
    <div>
      <div id="main">
        <div id="top">
          <PlayerInfo playerNum={1} />
          <ScoreBars />
          <PlayerInfo playerNum={2} />
        </div>
        <div id="gameplay">
          <div id="greenscreen"></div>
        </div>
        <div id="orange-line"></div>
        <div id="bottom">
          <Logo />
          <CurrentMapStats />
          <Casters />
        </div>
      </div>
    </div>
  );
}
