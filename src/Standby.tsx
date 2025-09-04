import { PlayerInfo } from "./components/PlayerInfo";
import { Chat } from "./components/Chat";
import { Logo } from "./components/Logo";

export function StandbyScreen() {
  return (
    <div>
      <div id="main">
        <div id="top">
          <PlayerInfo playerNum={1} />
          <PlayerInfo playerNum={2} />
        </div>
        <div id="gameplay">
          <div id="greenscreen"></div>
        </div>
        <div id="orange-line"></div>
        <div id="bottom">
          <Logo />
          <Chat />
          <div id="casters">CASTERS</div>
        </div>
      </div>
    </div>
  );
}
