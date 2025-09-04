import { motion, AnimatePresence } from "framer-motion";
import { sectionVariants, getAnimations } from "./animations";
import type { AnimTypes } from "./animations";
import { PlayerInfo } from "./components/PlayerInfo";
import { Chat } from "./components/Chat";
import { Logo } from "./components/Logo";
import { Casters } from "./components/Casters";
import { StageInfo } from "./components/StageInfo";
import { MainContent } from "./components/MainContent";
import { HeaderContent } from "./components/HeaderContent";
import { FooterContent } from "./components/FooterContent";

interface StandbyScreenProps {
  previous?: string;
  next?: string;
  isLeaving?: boolean;
}

export function StandbyScreen({
  previous,
  next,
  isLeaving,
}: StandbyScreenProps) {
  const current = "standby";
  const from = isLeaving ? current : previous || current;
  const to = isLeaving ? next || current : current;
  const anims: AnimTypes = getAnimations(from, to);

  const slideDirection: 1 | -1 = 1;

  return (
    <div id="main">
      {/* Header */}
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={
          anims.header === "slide"
            ? sectionVariants.header.slide(slideDirection)
            : anims.header === "fade"
              ? sectionVariants.header.fade
              : sectionVariants.header.none
        }
      >
        <HeaderContent>
          <div id="top">
            <PlayerInfo playerNum={1} />
            <div id="middle">
              <StageInfo />
            </div>
            <PlayerInfo playerNum={2} />
          </div>
        </HeaderContent>
      </motion.div>

      {/* Main */}
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={
          anims.main === "slide"
            ? sectionVariants.main.slide(slideDirection)
            : anims.main === "fade"
              ? sectionVariants.main.fade
              : sectionVariants.main.none
        }
      >
        <MainContent>
          <div id="gameplay"></div>
        </MainContent>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={
          anims.footer === "slide"
            ? sectionVariants.footer.slide(slideDirection)
            : anims.footer === "fade"
              ? sectionVariants.footer.fade
              : sectionVariants.footer.none
        }
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
  );
}
