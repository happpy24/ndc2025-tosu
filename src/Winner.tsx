import { Chat } from "./components/Chat";
import { useTosu } from "./state/tosu";
import avatar from "./static/img/happy.png";
import logo from "./static/img/logo.png";
import trophy from "./static/img/trophy.png";

export function WinnerScreen() {
  const { player1 } = useTosu();

  return (
    <div>
      <div id="main">
        <div id="win-top">
          <div id="win-left">
            <div id="win-text">Winner</div>
            <div id="win-player">
              <div id="win-player-icon">
                <img src={avatar} />
              </div>
              <div id="win-player-info">
                <div id="win-player-name">
                  {player1.name !== "" ? player1.name : "Unknown player"}
                </div>
                <div id="win-player-seed">Seed: 22</div>
                <div id="win-player-supporters">Supporters: 22</div>
                <div id="win-player-pickems">Pickems: 50%</div>
              </div>
            </div>
            <div id="win-stage-info">
              <div id="win-stage-name">Quarter Finals</div>
              <div id="win-winner-loser">(Winners Bracket)</div>
            </div>
          </div>
          <div id="win-right">
            <div id="trophy">
              <img src={trophy} />
            </div>
          </div>
        </div>
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
