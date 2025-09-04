import { motion, AnimatePresence } from "framer-motion";
import { sectionVariants, getAnimations } from "./animations";
import type { AnimTypes } from "./animations";
import clsx from "clsx";
import { Casters } from "./components/Casters";
import { Chat } from "./components/Chat";
import { Logo } from "./components/Logo";
import { MainContent } from "./components/MainContent";
import { HeaderContent } from "./components/HeaderContent";
import { FooterContent } from "./components/FooterContent";
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
          {["red", "blue"].map((side) => (
            <>
              <div className={`picked-${side}`} key={`picked-${side}`}>
                <div className={`picked-indicator-${side}`}>
                  Picked by {side}
                </div>
              </div>
              <div className={`banned-${side}`} key={`banned-${side}`}>
                <div className={`banned-indicator-${side}`}>
                  Banned by {side}
                </div>
              </div>
            </>
          ))}
          <div className={clsx("mappool-map-top", tb)}>
            <img className={"mappool-map-bg"} src={map.bgUrl} />
            <div
              className={`mappool-map-id ${mod}`}
            >{`${map.modBracket}${tb ? "" : map.modBracketIndex}`}</div>
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

interface MappoolScreenProps {
  previous?: string;
}

export function MappoolScreen({ previous }: MappoolScreenProps) {
  const anims: AnimTypes = getAnimations(previous || "standby", "standby");

  const slideDirection: 1 | -1 = 1;

  const { beatmaps } = useMappoolQuery();

  return (
    <div>
      <div id="main">
        <motion.div
          key={`header-${previous}`}
          {...(anims.header === "slide"
            ? sectionVariants.header.slide(slideDirection)
            : anims.header === "fade"
              ? sectionVariants.header.fade
              : sectionVariants.header.none)}
        >
          <HeaderContent>
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
          </HeaderContent>
        </motion.div>

        <motion.div
          key={`main-${previous}`}
          {...(anims.main === "slide"
            ? sectionVariants.main.slide(slideDirection)
            : anims.main === "fade"
              ? sectionVariants.main.fade
              : sectionVariants.main.none)}
        >
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
        </motion.div>

        <motion.div
          key={`footer-${previous}`}
          {...(anims.footer === "slide"
            ? sectionVariants.footer.slide(slideDirection)
            : anims.footer === "fade"
              ? sectionVariants.footer.fade
              : sectionVariants.footer.none)}
        >
          <FooterContent>
            <div id="orange-line"></div>
            <div id="bottom">
              <Logo />
              <Chat />
              <Casters />
            </div>
          </FooterContent>
        </motion.div>
      </div>
    </div>
  );
}
