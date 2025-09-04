import { PlayerInfo } from "./components/PlayerInfo";
import { useTosu } from "./state/tosu";
import avatar from "./static/img/happy.png";
import logo from "./static/img/logo.png";

export function VersusScreen() {
  const { player1, player2, tourney, beatmap } = useTosu();

  const maxScore = player1.score + player2.score;
  const maxBarWidth = 600;

  const redBarWidth =
    (Math.min(player1.score, maxScore) / maxScore) * maxBarWidth;
  const blueBarWidth =
    (Math.min(player2.score, maxScore) / maxScore) * maxBarWidth;

  const redWinning = player1.score > player2.score;
  const blueWinning = player2.score > player1.score;

  const totalMapPoints = Math.ceil(tourney.bestOf / 2);

  const redMapPoints = Array.from({ length: totalMapPoints }, (_, i) => (
    <div
      key={i}
      className={`map-point${i < tourney.points.left ? " map-won" : ""}`}
    ></div>
  ));
  const blueMapPoints = Array.from({ length: totalMapPoints }, (_, i) => (
    <div
      key={i}
      className={`map-point${i < tourney.points.right ? " map-won" : ""}`}
    ></div>
  ));

  function formatTime(ms: number): string {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const paddedMinutes = String(minutes).padStart(2, "0");
    const paddedSeconds = String(seconds).padStart(2, "0");
    return `${paddedMinutes}:${paddedSeconds}`;
  }

  return (
    <div>
      <div id="main">
        <div id="top">
          <PlayerInfo playerNum={1} />
          <div id="middle">
            <div id="stage-info">
              <div id="stage-name">Quarter Finals</div>
              <div id="winner-loser">(Winners Bracket)</div>
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
          <div id="ndc-logo">
            <img src={logo} />
          </div>
          <div id="current-map">
            <div id="overlay-opacity"></div>
            <div
              id="beatmap-background"
              style={{
                backgroundImage: `url('file:///${beatmap.backgroundPath}')`,
              }}
            ></div>
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
          <div id="casters">CASTERS</div>
        </div>
      </div>
    </div>
  );
}
