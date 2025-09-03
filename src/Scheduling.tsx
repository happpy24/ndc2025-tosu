import { useTosu } from "./state/tosu";
import "./static/style.css";
import avatar from "./static/img/happy.png";
import logo from "./static/img/logo.png";

export function SchedulingScreen() {
  const { player1, player2, tourney, beatmap, directPath } = useTosu();

  return (
    <div>
      <div id="main"></div>
    </div>
  );
}
