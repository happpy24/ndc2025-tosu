import { motion, AnimatePresence } from "framer-motion";
import { sectionVariants, getAnimations } from "./animations";
import type { AnimTypes } from "./animations";
import dayjs from "dayjs";
import { useMatchQuery, useSchedulingQuery } from "./state/huis";
import { useTosu } from "./state/tosu";
import avatar from "./static/img/happy.png";
import logo from "./static/img/logo.png";
import clsx from "clsx";
import { MainContent } from "./components/MainContent";
import { HeaderContent } from "./components/HeaderContent";
import { FooterContent } from "./components/FooterContent";
import { Casters } from "./components/Casters";

interface SchedulingScreenProps {
  previous?: string;
}

export function SchedulingScreen({ previous }: SchedulingScreenProps) {
  const anims: AnimTypes = getAnimations(previous || "standby", "standby");

  const slideDirection: 1 | -1 = 1;

  const { roundName } = useMatchQuery();
  const { data: schedule, error, isPending } = useSchedulingQuery();

  return (
    <div id="main-scheduling">
      <motion.div
        key={`main-${previous}`}
        {...(anims.main === "slide"
          ? sectionVariants.main.slide(slideDirection)
          : anims.main === "fade"
            ? sectionVariants.main.fade
            : sectionVariants.main.none)}
      >
        <MainContent>
          <div id="schedule">
            <div id="schedule-left">
              <div id="schedule-upcoming">
                <div id="schedule-upcoming-text">Upcoming Matches</div>
                <div id="upcoming-matches">
                  {schedule.upcoming.map((match) => (
                    <div className="match" key={match.uid}>
                      <div className="match-info">
                        <div className="match-red-player">
                          <div className="match-red-player-icon">
                            <img src={match.player1.avatarUrl} />
                          </div>
                          <div className="match-player-name">
                            {match.player1.name ?? "Unknown player"}
                          </div>
                          <div
                            className={clsx(
                              "match-box",
                              match.player1.winner && "win",
                            )}
                          >
                            <div className="match-score">
                              {match.player1.score}
                            </div>
                          </div>
                        </div>
                        <div className="match-vs">
                          <div className="divider"></div>
                          <div className="match-vs-text">VS</div>
                          <div className="divider"></div>
                        </div>
                        <div className="match-blue-player">
                          <div className="match-blue-player-icon">
                            <img src={match.player2.avatarUrl} />
                          </div>
                          <div className="match-player-name">
                            {match.player2.name ?? "Unknown player"}
                          </div>
                          <div
                            className={clsx(
                              "match-box",
                              match.player2.winner && "win",
                            )}
                          >
                            <div className="match-score">
                              {match.player2.score}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="match-time">
                        <div className="match-until">
                          {dayjs(match.date).fromNow()}
                        </div>
                        <div className="match-timestamp">
                          {dayjs(match.date).format("dddd HH:mm")}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div id="schedule-previous">
                <div id="schedule-previous-text">Previous Matches</div>
                <div id="previous-matches">
                  {schedule.recent.map((match) => (
                    <div className="match" key={match.uid}>
                      <div className="match-info">
                        <div className="match-red-player">
                          <div className="match-red-player-icon">
                            <img src={match.player1.avatarUrl} />
                          </div>
                          <div className="match-player-name">
                            {match.player1.name ?? "Unknown player"}
                          </div>
                          <div
                            className={clsx(
                              "match-box",
                              match.player1.winner && "win",
                            )}
                          >
                            <div className="match-score">
                              {match.player1.score}
                            </div>
                          </div>
                        </div>
                        <div className="match-vs">
                          <div className="divider"></div>
                          <div className="match-vs-text">VS</div>
                          <div className="divider"></div>
                        </div>
                        <div className="match-blue-player">
                          <div className="match-blue-player-icon">
                            <img src={match.player2.avatarUrl} />
                          </div>
                          <div className="match-player-name">
                            {match.player2.name ?? "Unknown player"}
                          </div>
                          <div
                            className={clsx(
                              "match-box",
                              match.player2.winner && "win",
                            )}
                          >
                            <div className="match-score">
                              {match.player2.score}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="match-time">
                        <div className="match-until">
                          {dayjs(match.date).fromNow()}
                        </div>
                        <div className="match-timestamp">
                          {dayjs(match.date).format("dddd HH:mm")}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div id="scheduling-right">
              <div id="scheduling-text">Scheduling</div>
              <div id="scheduling-stage">{roundName}</div>
              <div id="scheduling-logo">
                <img src={logo} />
              </div>
              <div id="scheduling-casters">
                <Casters />
              </div>
            </div>
          </div>
        </MainContent>
      </motion.div>
    </div>
  );
}
