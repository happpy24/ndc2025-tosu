import { useTosu } from "./state/tosu";
import "./static/style.css";
import avatar from "./static/img/happy.png";
import logo from "./static/img/logo.png";

export function WinnerScreen() {
	const { player1, player2, tourney, beatmap, directPath } = useTosu();

	return (
		<div>
			<div id="main">
				<div id="orange-line"></div>
				<div id="bottom">
					<div id="ndc-logo">
						<img src={logo} />
					</div>
					<div id="chat"></div>
					<div id="casters">CASTERS</div>
				</div>
			</div>
		</div>
	);
}
