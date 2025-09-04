import { Casters } from "./components/Casters";
import { CurrentMapStats } from "./components/CurrentMapStats";
import { Logo } from "./components/Logo";
import { PlayerInfo } from "./components/PlayerInfo";
import { useMatchQuery } from "./state/huis";
import { useTosu } from "./state/tosu";

export function VersusScreen() {
  const { player1, player2 } = useTosu();
  const { roundName, bracket } = useMatchQuery();

  const maxScore = player1.score + player2.score;
  const maxBarWidth = 600;

  const redBarWidth =
    (Math.min(player1.score, maxScore) / maxScore) * maxBarWidth;
  const blueBarWidth =
    (Math.min(player2.score, maxScore) / maxScore) * maxBarWidth;

  const redWinning = player1.score > player2.score;
  const blueWinning = player2.score > player1.score;

  return (
    <div>
      <div id="main">
        <div id="top">
          <PlayerInfo playerNum={1} />
          <div id="middle">
            <div id="stage-info">
              <div id="stage-name">{roundName}</div>
              <div id="winner-loser">({bracket} Bracket)</div>
            </div>
            <div id="scoring">
              <div id="score-red">
                <div
                  id="score-values-red"
                  style={{
                    width: `${redBarWidth}px`,
                    maxWidth: "600px",
                  }}
                >
                  <div
                    id="score-now-red"
                    className={redWinning ? "winning" : ""}
                  >
                    {player1.score.toLocaleString("de-DE")}
                  </div>
                  {player1.score - player2.score > 0 && (
                    <div id="score-difference-red">
                      +{(player1.score - player2.score).toLocaleString("de-DE")}
                    </div>
                  )}
                </div>

                <div
                  id="score-bar-red"
                  className={redWinning ? "winning" : ""}
                  style={{
                    width: `${redBarWidth}px`,
                    maxWidth: "600px",
                  }}
                ></div>
              </div>
              <div id="score-blue">
                <div
                  id="score-values-blue"
                  style={{
                    width: `${blueBarWidth}px`,
                    maxWidth: "600px",
                  }}
                >
                  <div
                    id="score-now-blue"
                    className={blueWinning ? "winning" : ""}
                  >
                    {player2.score.toLocaleString("de-DE")}
                  </div>
                  {player2.score - player1.score > 0 && (
                    <div id="score-difference-blue">
                      +{(player2.score - player1.score).toLocaleString("de-DE")}
                    </div>
                  )}
                </div>
                <div
                  id="score-bar-blue"
                  className={blueWinning ? "winning" : ""}
                  style={{
                    width: `${blueBarWidth}px`,
                    maxWidth: "600px",
                  }}
                ></div>
              </div>
            </div>
          </div>
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
