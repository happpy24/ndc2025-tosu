import { useSchedulingQuery } from "./state/huis";
import { useTosu } from "./state/tosu";
import avatar from "./static/img/happy.png";
import logo from "./static/img/logo.png";

export function SchedulingScreen() {
  const { player1, player2 } = useTosu();

  return (
    <div>
      <div id="main-scheduling">
        <div id="schedule">
          <div id="schedule-upcoming">
            <div id="schedule-upcoming-text">Upcoming Matches</div>
            <div id="upcoming-matches">
              <div className="match">
                <div className="match-info">
                  <div className="match-red-player">
                    <div className="match-red-player-icon">
                      <img src={avatar} />
                    </div>
                    <div className="match-player-name">
                      {player1.name !== "" ? player1.name : "Unknown player"}
                    </div>
                    <div className="match-box">
                      <div className="match-score">0</div>
                    </div>
                  </div>
                  <div className="match-vs">
                    <div className="divider"></div>
                    <div className="match-vs-text">VS</div>
                    <div className="divider"></div>
                  </div>
                  <div className="match-blue-player">
                    <div className="match-blue-player-icon">
                      <img src={avatar} />
                    </div>
                    <div className="match-player-name">
                      {player2.name !== "" ? player2.name : "Unknown player"}
                    </div>
                    <div className="match-box">
                      <div className="match-score">0</div>
                    </div>
                  </div>
                </div>
                <div className="match-time">
                  <div className="match-until">In 5 hours</div>
                  <div className="match-timestamp">Monday 20:00</div>
                </div>
              </div>
              <div className="match">
                <div className="match-info">
                  <div className="match-red-player">
                    <div className="match-red-player-icon">
                      <img src={avatar} />
                    </div>
                    <div className="match-player-name">
                      {player1.name !== "" ? player1.name : "Unknown player"}
                    </div>
                    <div className="match-box">
                      <div className="match-score">0</div>
                    </div>
                  </div>
                  <div className="match-vs">
                    <div className="divider"></div>
                    <div className="match-vs-text">VS</div>
                    <div className="divider"></div>
                  </div>
                  <div className="match-blue-player">
                    <div className="match-blue-player-icon">
                      <img src={avatar} />
                    </div>
                    <div className="match-player-name">
                      {player2.name !== "" ? player2.name : "Unknown player"}
                    </div>
                    <div className="match-box">
                      <div className="match-score">0</div>
                    </div>
                  </div>
                </div>
                <div className="match-time">
                  <div className="match-until">In 5 hours</div>
                  <div className="match-timestamp">Monday 20:00</div>
                </div>
              </div>
            </div>
          </div>
          <div id="schedule-previous">
            <div id="schedule-previous-text">Previous Matches</div>
            <div id="previous-matches">
              <div className="match">
                <div className="match-info">
                  <div className="match-red-player">
                    <div className="match-red-player-icon">
                      <img src={avatar} />
                    </div>
                    <div className="match-player-name">
                      {player1.name !== "" ? player1.name : "Unknown player"}
                    </div>
                    <div className="match-box">
                      <div className="match-score">0</div>
                    </div>
                  </div>
                  <div className="match-vs">
                    <div className="divider"></div>
                    <div className="match-vs-text">VS</div>
                    <div className="divider"></div>
                  </div>
                  <div className="match-blue-player">
                    <div className="match-blue-player-icon">
                      <img src={avatar} />
                    </div>
                    <div className="match-player-name">
                      {player2.name !== "" ? player2.name : "Unknown player"}
                    </div>
                    <div className="match-box">
                      <div className="match-score">0</div>
                    </div>
                  </div>
                </div>
                <div className="match-time">
                  <div className="match-until">In 5 hours</div>
                  <div className="match-timestamp">Monday 20:00</div>
                </div>
              </div>
              <div className="match">
                <div className="match-info">
                  <div className="match-red-player">
                    <div className="match-red-player-icon">
                      <img src={avatar} />
                    </div>
                    <div className="match-player-name">
                      {player1.name !== "" ? player1.name : "Unknown player"}
                    </div>
                    <div className="match-box">
                      <div className="match-score">0</div>
                    </div>
                  </div>
                  <div className="match-vs">
                    <div className="divider"></div>
                    <div className="match-vs-text">VS</div>
                    <div className="divider"></div>
                  </div>
                  <div className="match-blue-player">
                    <div className="match-blue-player-icon">
                      <img src={avatar} />
                    </div>
                    <div className="match-player-name">
                      {player2.name !== "" ? player2.name : "Unknown player"}
                    </div>
                    <div className="match-box">
                      <div className="match-score">0</div>
                    </div>
                  </div>
                </div>
                <div className="match-time">
                  <div className="match-until">In 5 hours</div>
                  <div className="match-timestamp">Monday 20:00</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="scheduling-right">
          <div id="scheduling-text">Scheduling</div>
          <div id="scheduling-stage">QUARTER FINALS</div>
          <div id="scheduling-logo">
            <img src={logo} />
          </div>
        </div>
      </div>
    </div>
  );
}
