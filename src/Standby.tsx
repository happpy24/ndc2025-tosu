import logo from "./static/img/logo.png";
import { PlayerInfo } from "./components/PlayerInfo";
import { Chat } from "./components/Chat";

export function StandbyScreen() {
  return (
    <div>
      <div id="main" className="mask">
        <div id="top">
          <PlayerInfo playerNum={1} />
          <PlayerInfo playerNum={2} />
        </div>
        <div id="gameplay"></div>
        <div id="orange-line"></div>
        <div id="bottom">
          <div id="ndc-logo">
            <img src={logo} />
          </div>
          <Chat />
          <div id="casters">CASTERS</div>
        </div>
      </div>
    </div>
  );
}
