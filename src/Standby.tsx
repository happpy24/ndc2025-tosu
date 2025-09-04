import { PlayerInfo } from "./components/PlayerInfo";
import { Chat } from "./components/Chat";
import { Logo } from "./components/Logo";
import { Casters } from "./components/Casters";
import { StageInfo } from "./components/StageInfo";

export function StandbyScreen() {
  return (
    <div>
      <div id="main" className="mask">
        <div id="top">
          <PlayerInfo playerNum={1} />
          <div id="middle">
            <StageInfo />
          </div>
          <PlayerInfo playerNum={2} />
        </div>
        <div id="gameplay"></div>
        <div id="orange-line"></div>
        <div id="bottom">
          <Logo />
          <Chat />
          <Casters />
        </div>
      </div>
    </div>
  );
}
