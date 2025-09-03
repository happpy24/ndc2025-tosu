import { useTosu } from "./state/tosu";
import "./static/style.css";
import avatar from "./static/img/happy.png";
import logo from "./static/img/logo.png";
import { motion } from "motion/react";

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
