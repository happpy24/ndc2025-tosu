import { motion, AnimatePresence } from "framer-motion";
import { sectionVariants, getAnimations } from "./animations";
import type { AnimTypes } from "./animations";
import { Casters } from "./components/Casters";
import { CurrentMapStats } from "./components/CurrentMapStats";
import { Logo } from "./components/Logo";
import { MainContent } from "./components/MainContent";
import { HeaderContent } from "./components/HeaderContent";
import { FooterContent } from "./components/FooterContent";
import { PlayerInfo } from "./components/PlayerInfo";
import { ScoreBars } from "./components/ScoreBars";

interface VersusScreenProps {
  previous?: string;
}

export function VersusScreen({ previous }: VersusScreenProps) {
  const anims: AnimTypes = getAnimations(previous || "standby", "standby");

  const slideDirection: 1 | -1 = 1;
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
              <ScoreBars />
              <PlayerInfo playerNum={2} />
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
            <div id="gameplay"></div>
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
              <CurrentMapStats />
              <Casters />
            </div>
          </FooterContent>
        </motion.div>
      </div>
    </div>
  );
}
