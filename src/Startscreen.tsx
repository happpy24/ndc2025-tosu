import { useTosu } from "./state/tosu";
import "./static/style.css";
import avatar from "./static/img/happy.png";
import logo from "./static/img/logo.png";
import { motion } from "motion/react";

export function StartScreen() {
	const { player1, player2, tourney, beatmap, directPath } = useTosu();

	return (
		<div>
			<div id="main">
				<div id="ss-top">
					<div id="ss-title">
						<div id="ss-stage-name">Quarter Finals</div>
						<div id="ss-winner-loser">(Winners Bracket)</div>
					</div>
					<div id="ss-upcoming">UPCOMING</div>
					<div id="ss-vs">
						<div id="ss-red-player">
							<div id="ss-red-player-icon">
								<img src={avatar} />
							</div>
							<div
								id="ss-player-info"
								className="align-right"
							>
								<div id="ss-player-name">{player1.name}</div>
								<div id="ss-player-seed">Seed: 22</div>
								<div id="ss-player-supporters">
									Supporters: 22
								</div>
								<div id="ss-player-pickems">Pickems: 50%</div>
							</div>
						</div>
						<div id="ss-vs-text">VS</div>
						<div id="ss-blue-player">
							<div id="ss-blue-player-icon">
								<img src={avatar} />
							</div>
							<div id="ss-player-info">
								<div id="ss-player-name">{player2.name}</div>
								<div id="ss-player-seed">Seed: 22</div>
								<div id="ss-player-supporters">
									Supporters: 22
								</div>
								<div id="ss-player-pickems">Pickems: 50%</div>
							</div>
						</div>
					</div>
				</div>
				<div id="orange-line"></div>
				<div id="bottom">
					<div id="ndc-logo">
						<img src={logo} />
					</div>
					<div id="chat">
						{tourney.chat
							.filter((msg: any) => msg.team !== "bot")
							.map((msg: any, idx: number) => (
								<motion.div
									className="chat-message"
									key={msg.id ?? idx}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5 }}
									layout
								>
									<div
										className="chat-username"
										style={{
											color:
												msg.team === "left"
													? "#FD515C"
													: msg.team === "right"
													? "#5583F9"
													: "#FF962D"
										}}
									>
										{msg.name}:
									</div>
									<div className="chat-text">
										{msg.message}
									</div>
								</motion.div>
							))}
					</div>
					<div id="casters">CASTERS</div>
				</div>
			</div>
		</div>
	);
}
