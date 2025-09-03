import { useTosu } from "./state/tosu";
import "./static/style.css";
import avatar from "./static/img/happy.png";
import logo from "./static/img/logo.png";

export function MappoolScreen() {
	const { player1, player2, tourney, beatmap, directPath } = useTosu();

	const totalMapPoints = Math.ceil(tourney.bestOF / 2);

	const redMapPoints = Array.from({ length: totalMapPoints }, (_, i) => (
		<div
			key={i}
			className={`map-point${i < tourney.points.left ? " map-won" : ""}`}
		></div>
	));
	const blueMapPoints = Array.from({ length: totalMapPoints }, (_, i) => (
		<div
			key={i}
			className={`map-point${i < tourney.points.right ? " map-won" : ""}`}
		></div>
	));

	return (
		<div>
			<div id="main">
				<div id="top">
					<div id="red-player">
						<div id="player">
							<div id="red-player-icon">
								<img src={avatar} />
							</div>
							<div id="player-info">
								<div id="player-name">
									{player1.name ? "" : "Unknown player"}
								</div>
								<div id="player-seed">Seed: 22</div>
								<div id="player-supporters">Supporters: 22</div>
								<div id="player-pickems">Pickems: 50%</div>
							</div>
						</div>
						<div id="red-maps-won">{redMapPoints}</div>
					</div>
					<div
						id="blue-player"
						className="flex-reverse"
					>
						<div
							id="player"
							className="flex-reverse"
						>
							<div id="blue-player-icon">
								<img src={avatar} />
							</div>
							<div id="player-info">
								<div
									id="player-name"
									className="align-right"
								>
									{player2.name ? "" : "Unknown player"}
								</div>
								<div
									id="player-seed"
									className="align-right"
								>
									Seed: 22
								</div>
								<div
									id="player-supporters"
									className="align-right"
								>
									Supporters: 22
								</div>
								<div
									id="player-pickems"
									className="align-right"
								>
									Pickems: 50%
								</div>
							</div>
						</div>
						<div id="blue-maps-won">{blueMapPoints}</div>
					</div>
				</div>
				<div id="gameplay">
					<div id="greenscreen"></div>
				</div>
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
