import { useTosu } from "./state/tosu";
import "./static/style.css";

export function VersusScreen() {
  const { player1, player2 } = useTosu();

  return (
    <div>
      <div id="main">
        <div id="top">
          <div id="red-player">
            <div id="player">
              <div id="player-icon">
                <img src="Happy.png" />
              </div>
              <div id="player-info">
                <div id="player-name">{player1.name}</div>
                <div id="player-seed">Seed: 22</div>
                <div id="player-supporters">Supporters: 22</div>
              </div>
            </div>
            <div id="red-maps-won"></div>
          </div>
          <div id="middle">
            <div id="stage-info">
              <div id="stage-name">Quarter Finals</div>
              <div id="winner-loser">(Winners Bracket)</div>
            </div>
            <div id="scoring">
              <div id="score-red">
                <div id="score-values-red">
                  <div id="score-now-red">{player1.score}</div>
                  <div id="score-difference-red">-600000</div>
                </div>

                <div id="score-bar-red"></div>
              </div>
              <div id="score-blue">
                <div id="score-values-blue">
                  <div id="score-now-blue" className="winning">
                    {player2.score}
                  </div>
                  <div id="score-difference-blue" className="winning">
                    +600000
                  </div>
                </div>
                <div id="score-bar-blue" className="winning"></div>
              </div>
            </div>
          </div>
          <div id="blue-player" className="flex-reverse">
            <div id="player" className="flex-reverse">
              <div id="player-icon">
                <img src="Happy.png" />
              </div>
              <div id="player-info">
                <div id="player-name" className="align-right">
                  {player2.name}
                </div>
                <div id="player-seed" className="align-right">
                  Seed: 22
                </div>
                <div id="player-supporters" className="align-right">
                  Supporters: 22
                </div>
              </div>
            </div>
            <div id="blue-maps-won"></div>
          </div>
        </div>
        <div id="gameplay">
          <div id="greenscreen"></div>
          <div id="mappool"></div>
        </div>
        <div id="orange-line"></div>
        <div id="bottom">
          <div id="ndc-logo"></div>
          <div id="current-map">
            <div id="current-map-info">
              <div id="current-map-name"></div>
              <div id="current-map-artist"></div>
              <div id="diff-mapper">
                <div id="current-map-difficulty"></div>
                <div id="current-map-mapper"></div>
              </div>
            </div>
            <div id="current-map-stats">
              <div id="current-map-cs">
                <p>CS</p>
                <div id="cs"></div>
              </div>
              <div id="current-map-ar">
                <p>AR</p>
                <div id="ar"></div>
              </div>
              <div id="current-map-od">
                <p>OD</p>
                <div id="od"></div>
              </div>
              <div id="current-map-sr">
                <p>SR</p>
                <div id="sr"></div>
              </div>
              <div id="current-map-bpm">
                <p>BPM</p>
                <div id="bpm"></div>
              </div>
              <div id="current-map-length">
                <p>Length</p>
                <div id="length"></div>
              </div>
            </div>
          </div>
          <div id="casters">CASTERS</div>
        </div>
      </div>
    </div>
  );
}
