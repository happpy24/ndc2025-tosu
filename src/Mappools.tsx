import clsx from "clsx";
import { Casters } from "./components/Casters";
import { Chat } from "./components/Chat";
import { Logo } from "./components/Logo";
import { MainContent } from "./components/MainContent";
import { PlayerInfo } from "./components/PlayerInfo";
import { StageInfo } from "./components/StageInfo";
import { useMappoolQuery, type Beatmap } from "./state/huis";

function ModBracket(
  beatmaps: Beatmap[],
  mod: Lowercase<Beatmap["modBracket"]>,
) {
  const tb = mod === "tb" && "tb";

  return (
    <div id={`${mod}-pool`}>
      {beatmaps.map((map) => (
        <div className={`mappool-map ${mod}`} key={map.mapId}>
          <div className="picked-red ">
            <div className="picked-indicator-red">PICKED BY RED</div>
          </div>
          <div className="picked-blue">
            <div className="picked-indicator-blue">PICKED BY BLUE</div>
          </div>
          <div className="banned-red">
            <div className="banned-indicator-red">Banned by Red</div>
          </div>
          <div className="banned-blue">
            <div className="banned-indicator-blue">Banned by Blue</div>
          </div>
          <div className={clsx("mappool-map-top", tb)}>
            <img className={"mappool-map-bg"} src={map.bgUrl} />
            <div
              className={`mappool-map-id ${mod}`}
            >{`${map.modBracket}${map.modBracketIndex}`}</div>
          </div>
          <div className={clsx("mappool-map-bottom", tb)}>
            <div className={clsx("mappool-map-artist-title", tb)}>
              {`${map.artist} - ${map.title}`}
            </div>
            <div className={clsx("mappool-map-difficulty", tb)}>
              {map.diffName}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

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

        <MainContent>
          <div id="mappool">
            <div id="mappool-left">
              {ModBracket(beatmaps.NM, "nm")}
              {ModBracket(beatmaps.HD, "hd")}
              {ModBracket(beatmaps.HR, "hr")}
            </div>
            <div id="mappool-right">
              {ModBracket(beatmaps.DT, "dt")}
              {ModBracket(beatmaps.TB, "tb")}
            </div>
          </div>
        </MainContent>
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
