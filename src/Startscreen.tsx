import logo from "./static/img/logo.png";
import { useMatchQuery } from "./state/huis";
import { Chat } from "./components/Chat";

export function StartScreen() {
  const { player1, player2, ...match } = useMatchQuery();

  return (
    <div>
      <div id="main">
        <div id="ss-top">
          <div id="ss-title">
            <div id="ss-stage-name">{match.roundName}</div>
            <div id="ss-winner-loser">({match.bracket} Bracket)</div>
          </div>
          <div id="ss-upcoming">UPCOMING</div>
          <div id="ss-vs">
            <div id="ss-red-player">
              <div id="ss-red-player-icon">
                <img src={player1.avatarUrl} />
              </div>
              <div id="ss-player-info" className="align-right">
                <div id="ss-player-name">{player1.name}</div>
                <div id="ss-player-seed">Seed: {player1.seed}</div>
                <div id="ss-player-supporters">
                  Supporters: {player1.supporters}
                </div>
                <div id="ss-player-pickems">
                  Pickems: {player1.pickemsRate}%
                </div>
              </div>
            </div>
            <div id="ss-vs-text">VS</div>
            <div id="ss-blue-player">
              <div id="ss-blue-player-icon">
                <img src={player2.avatarUrl} />
              </div>
              <div id="ss-player-info">
                <div id="ss-player-name">{player2.name}</div>
                <div id="ss-player-seed">Seed: {player2.seed}</div>
                <div id="ss-player-supporters">
                  Supporters: {player2.supporters}
                </div>
                <div id="ss-player-pickems">
                  Pickems: {player2.pickemsRate}%
                </div>
              </div>
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
