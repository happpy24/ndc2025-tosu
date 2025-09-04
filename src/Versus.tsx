import { Casters } from "./components/Casters";
import { CurrentMapStats } from "./components/CurrentMapStats";
import { Logo } from "./components/Logo";
import { MainContent } from "./components/MainContent";
import { PlayerInfo } from "./components/PlayerInfo";
import { ScoreBars } from "./components/ScoreBars";

export function VersusScreen() {
  return (
    <div>
      <div id="main" className="mask">
        <div id="top">
          <PlayerInfo playerNum={1} />
          <ScoreBars />
          <PlayerInfo playerNum={2} />
        </div>
        <MainContent>
          <div id="gameplay"></div>
        </MainContent>
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
