import { Casters } from "./components/Casters";
import { Chat } from "./components/Chat";
import { Logo } from "./components/Logo";
import { PlayerInfo } from "./components/PlayerInfo";
import { StageInfo } from "./components/StageInfo";
import { useMappoolQuery } from "./state/huis";

export function MappoolScreen() {
  const { beatmaps } = useMappoolQuery();

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
              {beatmaps.NM.map((map) => (
                <div className="mappool-map nm">
                  <div className="mappool-map-top">
                    <div className="mappool-map-bg"></div>
                    <div className="mappool-map-id nm">{`${map.modBracket}${map.modBracketIndex}`}</div>
                  </div>
                  <div className="mappool-map-bottom">
                    <div className="mappool-map-artist-title">
                      {`${map.artist} - ${map.title}`}
                    </div>
                    <div className="mappool-map-difficulty">{map.diffName}</div>
                  </div>
                </div>
              ))}
            </div>
            <div id="hd-pool">
              {beatmaps.HD.map((map) => (
                <div className="mappool-map hd">
                  <div className="mappool-map-top">
                    <div className="mappool-map-bg"></div>
                    <div className="mappool-map-id hd">{`${map.modBracket}${map.modBracketIndex}`}</div>
                  </div>
                  <div className="mappool-map-bottom">
                    <div className="mappool-map-artist-title">
                      {`${map.artist} - ${map.title}`}
                    </div>
                    <div className="mappool-map-difficulty">{map.diffName}</div>
                  </div>
                </div>
              ))}
            </div>
            <div id="hr-pool">
              {beatmaps.HR.map((map) => (
                <div className="mappool-map hr">
                  <div className="mappool-map-top">
                    <div className="mappool-map-bg"></div>
                    <div className="mappool-map-id hr">{`${map.modBracket}${map.modBracketIndex}`}</div>
                  </div>
                  <div className="mappool-map-bottom">
                    <div className="mappool-map-artist-title">
                      {`${map.artist} - ${map.title}`}
                    </div>
                    <div className="mappool-map-difficulty">{map.diffName}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div id="mappool-right">
            <div id="dt-pool">
              {beatmaps.DT.map((map) => (
                <div className="mappool-map dt">
                  <div className="mappool-map-top">
                    <div className="mappool-map-bg"></div>
                    <div className="mappool-map-id dt">{`${map.modBracket}${map.modBracketIndex}`}</div>
                  </div>
                  <div className="mappool-map-bottom">
                    <div className="mappool-map-artist-title">
                      {`${map.artist} - ${map.title}`}
                    </div>
                    <div className="mappool-map-difficulty">{map.diffName}</div>
                  </div>
                </div>
              ))}
            </div>
            <div id="tb-pool">
              {beatmaps.TB.map((map) => (
                <div className="mappool-map tb">
                  <div className="mappool-map-top tb">
                    <div className="mappool-map-bg"></div>
                    <div className="mappool-map-id tb">{map.modBracket}</div>
                  </div>
                  <div className="mappool-map-bottom tb">
                    <div className="mappool-map-artist-title tb">
                      {`${map.artist} - ${map.title}`}
                    </div>
                    <div className="mappool-map-difficulty tb">
                      {map.diffName}
                    </div>
                  </div>
                </div>
              ))}
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
