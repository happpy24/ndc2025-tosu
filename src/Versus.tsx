import { motion, AnimatePresence } from "framer-motion";
import { sectionVariants, getAnimations } from "./animations";
import { Casters } from "./components/Casters";
import { CurrentMapStats } from "./components/CurrentMapStats";
import { Logo } from "./components/Logo";
import { MainContent } from "./components/MainContent";
import { PlayerInfo } from "./components/PlayerInfo";
import { ScoreBars } from "./components/ScoreBars";
import { HeaderContent } from "./components/HeaderContent";
import { FooterContent } from "./components/FooterContent";

interface VersusScreenProps {
  previous?: string;
}

export function VersusScreen({ previous }: VersusScreenProps) {
  const anims = getAnimations(previous || "versus", "versus");

  const getVariant = (section: "header" | "main" | "footer", type: string) => {
    const variant =
      sectionVariants[section][type as keyof typeof sectionVariants.header];
    return typeof variant === "function" ? variant(1) : variant;
  };

  return (
    <div className="mask">
      {/* Header */}
      <AnimatePresence mode={anims.header === "fade" ? "wait" : "popLayout"}>
        <motion.div
          key={`header-${previous}`}
          initial={getVariant("header", anims.header).initial}
          animate={getVariant("header", anims.header).animate}
          exit={getVariant("header", anims.header).exit}
          transition={getVariant("header", anims.header).transition}
        >
          <HeaderContent>
            <div id="top">
              <PlayerInfo playerNum={1} />
              <ScoreBars />
              <PlayerInfo playerNum={2} />
            </div>
          </HeaderContent>
        </motion.div>
      </AnimatePresence>

      {/* Main */}
      <AnimatePresence mode={anims.main === "fade" ? "wait" : "popLayout"}>
        <motion.div
          key={`main-${previous}`}
          initial={getVariant("main", anims.main).initial}
          animate={getVariant("main", anims.main).animate}
          exit={getVariant("main", anims.main).exit}
          transition={getVariant("main", anims.main).transition}
        >
          <MainContent>
            <div id="gameplay"></div>
          </MainContent>
        </motion.div>
      </AnimatePresence>

      {/* Footer */}
      <AnimatePresence mode={anims.footer === "fade" ? "wait" : "popLayout"}>
        <motion.div
          key={`footer-${previous}`}
          initial={getVariant("footer", anims.footer).initial}
          animate={getVariant("footer", anims.footer).animate}
          exit={getVariant("footer", anims.footer).exit}
          transition={getVariant("footer", anims.footer).transition}
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
      </AnimatePresence>
    </div>
  );
}
