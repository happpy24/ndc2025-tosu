import { Casters } from "./components/Casters";
import { Chat } from "./components/Chat";
import { Logo } from "./components/Logo";
import { PlayerInfo } from "./components/PlayerInfo";
import { StageInfo } from "./components/StageInfo";

export function MappoolScreen() {
  // const a = useMappoolQuery();

  return (
    <div>
      <div id="main">
        <div id="top">
          <PlayerInfo playerNum={1} />
          <div id="middle">
            <StageInfo />
          </div>
          <PlayerInfo playerNum={2} />
        </div>
        <div id="current-status">
          <div id="current-status-pb">MAPPOOL - Next to pick: </div>
          <div id="current-status-player blue">KawaiiSniperBoy</div>
        </div>
        <div id="mappool">
          <div id="mappool-left">
            <div id="nm-pool">
              <div className="mappool-map nm">
                <div className="mappool-map-top">
                  <div className="mappool-map-bg"></div>
                  <div className="mappool-map-id nm">NM1</div>
                </div>
                <div className="mappool-map-bottom">
                  <div className="mappool-map-artist-title">
                    IYOSIS feat. Vivi - Happy's Perfecte Baby Bracket
                  </div>
                  <div className="mappool-map-difficulty">
                    De Perfecte Baby Brackawfawfawfawffawfawfawfawet!!!
                  </div>
                </div>
              </div>
              <div className="mappool-map nm">
                <div className="mappool-map-top">
                  <div className="mappool-map-bg"></div>
                  <div className="mappool-map-id nm">NM2</div>
                </div>
                <div className="mappool-map-bottom">
                  <div className="mappool-map-artist-title">
                    IYOSIS feat. Vivi - Happy's Perfecte Baby Bracket
                    awfawfawfawfawfawfawfafwawf
                  </div>
                  <div className="mappool-map-difficulty">
                    De Perfecte Baby Bracket!!!
                  </div>
                </div>
              </div>
              <div className="mappool-map nm">
                <div className="mappool-map-top">
                  <div className="mappool-map-bg"></div>
                  <div className="mappool-map-id nm">NM3</div>
                </div>
                <div className="mappool-map-bottom">
                  <div className="mappool-map-artist-title">
                    IYOSIS feat. Vivi - Happy's Perfecte Baby Bracket
                  </div>
                  <div className="mappool-map-difficulty">
                    De Perfecte Baby Bracket!!!
                  </div>
                </div>
              </div>
              <div className="mappool-map nm">
                <div className="mappool-map-top">
                  <div className="mappool-map-bg"></div>
                  <div className="mappool-map-id nm">NM4</div>
                </div>
                <div className="mappool-map-bottom">
                  <div className="mappool-map-artist-title">
                    IYOSIS feat. Vivi - Happy's Perfecte Baby Bracket
                  </div>
                  <div className="mappool-map-difficulty">
                    De Perfecte Baby Bracket!!!
                  </div>
                </div>
              </div>
              <div className="mappool-map nm">
                <div className="mappool-map-top">
                  <div className="mappool-map-bg"></div>
                  <div className="mappool-map-id nm">NM5</div>
                </div>
                <div className="mappool-map-bottom">
                  <div className="mappool-map-artist-title">
                    IYOSIS feat. Vivi - Happy's Perfecte Baby Bracket
                  </div>
                  <div className="mappool-map-difficulty">
                    De Perfecte Baby Bracket!!!
                  </div>
                </div>
              </div>
              <div className="mappool-map nm">
                <div className="mappool-map-top">
                  <div className="mappool-map-bg"></div>
                  <div className="mappool-map-id nm">NM6</div>
                </div>
                <div className="mappool-map-bottom">
                  <div className="mappool-map-artist-title">
                    IYOSIS feat. Vivi - Happy's Perfecte Baby Bracket
                  </div>
                  <div className="mappool-map-difficulty">
                    De Perfecte Baby Bracket!!!
                  </div>
                </div>
              </div>
              <div className="mappool-map nm">
                <div className="mappool-map-top">
                  <div className="mappool-map-bg"></div>
                  <div className="mappool-map-id nm">NM7</div>
                </div>
                <div className="mappool-map-bottom">
                  <div className="mappool-map-artist-title">
                    IYOSIS feat. Vivi - Happy's Perfecte Baby Bracket
                  </div>
                  <div className="mappool-map-difficulty">
                    De Perfecte Baby Bracket!!!
                  </div>
                </div>
              </div>
            </div>
            <div id="hd-pool">
              <div className="mappool-map hd">
                <div className="mappool-map-top">
                  <div className="mappool-map-bg"></div>
                  <div className="mappool-map-id hd">HD1</div>
                </div>
                <div className="mappool-map-bottom">
                  <div className="mappool-map-artist-title">
                    IYOSIS feat. Vivi - Happy's Perfecte Baby Bracket
                  </div>
                  <div className="mappool-map-difficulty">
                    De Perfecte Baby Bracket!!!
                  </div>
                </div>
              </div>
              <div className="mappool-map hd">
                <div className="mappool-map-top">
                  <div className="mappool-map-bg"></div>
                  <div className="mappool-map-id hd">HD2</div>
                </div>
                <div className="mappool-map-bottom">
                  <div className="mappool-map-artist-title">
                    IYOSIS feat. Vivi - Happy's Perfecte Baby Bracket
                  </div>
                  <div className="mappool-map-difficulty">
                    De Perfecte Baby Bracket!!!
                  </div>
                </div>
              </div>
              <div className="mappool-map hd">
                <div className="mappool-map-top">
                  <div className="mappool-map-bg"></div>
                  <div className="mappool-map-id hd">HD3</div>
                </div>
                <div className="mappool-map-bottom">
                  <div className="mappool-map-artist-title">
                    IYOSIS feat. Vivi - Happy's Perfecte Baby Bracket
                  </div>
                  <div className="mappool-map-difficulty">
                    De Perfecte Baby Bracket!!!
                  </div>
                </div>
              </div>
            </div>
            <div id="hr-pool">
              <div className="mappool-map hr">
                <div className="mappool-map-top">
                  <div className="mappool-map-bg"></div>
                  <div className="mappool-map-id hr">HR1</div>
                </div>
                <div className="mappool-map-bottom">
                  <div className="mappool-map-artist-title">
                    IYOSIS feat. Vivi - Happy's Perfecte Baby Bracket
                  </div>
                  <div className="mappool-map-difficulty">
                    De Perfecte Baby Bracket!!!
                  </div>
                </div>
              </div>
              <div className="mappool-map hr">
                <div className="mappool-map-top">
                  <div className="mappool-map-bg"></div>
                  <div className="mappool-map-id hr">HR2</div>
                </div>
                <div className="mappool-map-bottom">
                  <div className="mappool-map-artist-title">
                    IYOSIS feat. Vivi - Happy's Perfecte Baby Bracket
                  </div>
                  <div className="mappool-map-difficulty">
                    De Perfecte Baby Bracket!!!
                  </div>
                </div>
              </div>
              <div className="mappool-map hr">
                <div className="mappool-map-top">
                  <div className="mappool-map-bg"></div>
                  <div className="mappool-map-id hr">HR3</div>
                </div>
                <div className="mappool-map-bottom">
                  <div className="mappool-map-artist-title">
                    IYOSIS feat. Vivi - Happy's Perfecte Baby Bracket
                  </div>
                  <div className="mappool-map-difficulty">
                    De Perfecte Baby Bracket!!!
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="mappool-right">
            <div id="dt-pool">
              <div className="mappool-map dt">
                <div className="mappool-map-top">
                  <div className="mappool-map-bg"></div>
                  <div className="mappool-map-id dt">DT1</div>
                </div>
                <div className="mappool-map-bottom">
                  <div className="mappool-map-artist-title">
                    IYOSIS feat. Vivi - Happy's Perfecte Baby Bracket
                  </div>
                  <div className="mappool-map-difficulty">
                    De Perfecte Baby Bracket!!!
                  </div>
                </div>
              </div>
              <div className="mappool-map dt">
                <div className="mappool-map-top">
                  <div className="mappool-map-bg"></div>
                  <div className="mappool-map-id dt">DT2</div>
                </div>
                <div className="mappool-map-bottom">
                  <div className="mappool-map-artist-title">
                    IYOSIS feat. Vivi - Happy's Perfecte Baby Bracket
                  </div>
                  <div className="mappool-map-difficulty">
                    De Perfecte Baby Bracket!!!
                  </div>
                </div>
              </div>
              <div className="mappool-map dt">
                <div className="mappool-map-top">
                  <div className="mappool-map-bg"></div>
                  <div className="mappool-map-id dt">DT3</div>
                </div>
                <div className="mappool-map-bottom">
                  <div className="mappool-map-artist-title">
                    IYOSIS feat. Vivi - Happy's Perfecte Baby Bracket
                  </div>
                  <div className="mappool-map-difficulty">
                    De Perfecte Baby Bracket!!!
                  </div>
                </div>
              </div>
              <div className="mappool-map dt">
                <div className="mappool-map-top">
                  <div className="mappool-map-bg"></div>
                  <div className="mappool-map-id dt">DT4</div>
                </div>
                <div className="mappool-map-bottom">
                  <div className="mappool-map-artist-title">
                    IYOSIS feat. Vivi - Happy's Perfecte Baby Bracket
                  </div>
                  <div className="mappool-map-difficulty">
                    De Perfecte Baby Bracket!!!
                  </div>
                </div>
              </div>
            </div>
            <div id="tb-pool">
              <div className="mappool-map tb">
                <div className="mappool-map-top tb">
                  <div className="mappool-map-bg"></div>
                  <div className="mappool-map-id tb">TB</div>
                </div>
                <div className="mappool-map-bottom tb">
                  <div className="mappool-map-artist-title tb">
                    IYOSIS feat. Vivi - Happy's Perfecte Baby Bracket
                  </div>
                  <div className="mappool-map-difficulty tb">
                    De Perfecte Baby Bracket!!!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
