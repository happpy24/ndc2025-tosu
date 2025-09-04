import { motion, AnimatePresence } from "framer-motion";
import { sectionVariants, getAnimations } from "./animations";
import type { AnimTypes } from "./animations";
import { useMatchQuery } from "./state/huis";
import { Chat } from "./components/Chat";
import { Logo } from "./components/Logo";
import { Casters } from "./components/Casters";
import { MainContent } from "./components/MainContent";
import { FooterContent } from "./components/FooterContent";

interface StartScreenProps {
  previous?: string;
  next?: string;
  isLeaving?: boolean;
}

export function StartScreen({ previous, next, isLeaving }: StartScreenProps) {
  const { player1, player2, ...match } = useMatchQuery();

  const current = "start";
  const from = isLeaving ? current : previous || current;
  const to = isLeaving ? next || current : current;
  const anims: AnimTypes = getAnimations(from, to);

  const slideDirection: 1 | -1 = 1;

  return (
    <div id="main">
      {/* MainContent */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`main-${from}->${to}`}
          {...(anims.main === "slide"
            ? sectionVariants.main.slide(slideDirection)
            : anims.main === "fade"
              ? sectionVariants.main.fade
              : sectionVariants.main.none)}
        >
          <MainContent>
            <div id="ss-top">
              <div id="ss-title">
                <div id="ss-stage-name">{match.roundName}</div>
                <div id="ss-winner-loser">({match.bracket} Bracket)</div>
              </div>
              <div id="ss-upcoming">UPCOMING</div>

              <div id="ss-vs">
                <div id="ss-red-player">
                  <div id="ss-red-player-icon">
                    <img src={player1.avatarUrl} />
                  </div>
                  <div id="ss-player-info" className="align-right">
                    <div id="ss-player-name">{player1.name}</div>
                    <div id="ss-player-seed">Seed: {player1.seed}</div>
                    <div id="ss-player-supporters">
                      Supporters: {player1.supporters}
                    </div>
                    <div id="ss-player-pickems">
                      Pickems: {player1.pickemsRate}%
                    </div>
                  </div>
                </div>

                <div id="ss-vs-text">VS</div>

                <div id="ss-blue-player">
                  <div id="ss-blue-player-icon">
                    <img src={player2.avatarUrl} />
                  </div>
                  <div id="ss-player-info">
                    <div id="ss-player-name">{player2.name}</div>
                    <div id="ss-player-seed">Seed: {player2.seed}</div>
                    <div id="ss-player-supporters">
                      Supporters: {player2.supporters}
                    </div>
                    <div id="ss-player-pickems">
                      Pickems: {player2.pickemsRate}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </MainContent>
        </motion.div>
      </AnimatePresence>

      {/* FooterContent */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`footer-${from}->${to}`}
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
      </AnimatePresence>
    </div>
  );
}
