import { motion } from "framer-motion";
import { sectionVariants, getAnimations } from "./animations";
import type { AnimTypes } from "./animations";
import { useMatchQuery } from "./state/huis";
import { Chat } from "./components/Chat";
import { Logo } from "./components/Logo";
import { Casters } from "./components/Casters";
import { MainContent } from "./components/MainContent";
import { FooterContent } from "./components/FooterContent";
import Countdown, { zeroPad } from "react-countdown";
import { useSettings } from "./state/dashboard";

interface StartScreenProps {
  from?: string;
  to: string;
}

const renderer = ({
  hours,
  minutes,
  seconds,
}: {
  hours: number;
  minutes: number;
  seconds: number;
}) => (
  <span>
    {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
  </span>
);

export function StartScreen({ from, to }: StartScreenProps) {
  const { player1, player2, ...match } = useMatchQuery();
  const [settings] = useSettings();
  // treat this component as self (to) and other as from
  const anims: AnimTypes = getAnimations(to, from ?? "");

  const slideDirection: 1 | -1 = 1;

  return (
    <div id="main">
      {/* MainContent */}
      <motion.div
        key={`main-${to}`}
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
                  {/*
                  <div id="ss-player-supporters">
                    Supporters: {player1.supporters}
                  </div>
                  */}
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
                  {/*
                  <div id="ss-player-supporters">
                    Supporters: {player2.supporters}
                  </div>
                  */}
                  <div id="ss-player-pickems">
                    Pickems: {player2.pickemsRate}%
                  </div>
                </div>
              </div>
            </div>
            {settings.countdown && (
              <div id="ss-time-to-start">
                Time to start:{" "}
                <Countdown
                  key={`countdown-${Number(settings.countdown)}`}
                  renderer={renderer}
                  date={settings.countdown}
                  autoStart={true}
                />
              </div>
            )}
          </div>
        </MainContent>
      </motion.div>

      {/* FooterContent */}
      <motion.div
        key={`footer-${to}`}
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
  );
}
