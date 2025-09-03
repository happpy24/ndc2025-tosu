import { useWebSocket } from "partysocket/react";
import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode
} from "react";
import z from "zod";

export type Player = {
	name: string;
	score: number;
};

export type Tourney = {
	scoreVisible: boolean;
	bestOF: number;
	points: {
		left: number;
		right: number;
	};
	chat: unknown[];
};

export type Beatmap = {
	title: string;
	artist: string;
	difficulty: string;
	mapper: string;
	cs: number;
	ar: number;
	od: number;
	stars: number;
	bpm: number;
	length: number;
};

export type TosuData = {
	player1: Player;
	player2: Player;
	tourney: Tourney;
	beatmap: Beatmap;
};

const TosuDataSchema = z.object({
	tourney: z.object({
		scoreVisible: z.boolean(),
		starsVisible: z.boolean(),
		ipcState: z.number(),
		bestOF: z.number(),
		team: z.object({
			left: z.string(),
			right: z.string()
		}),
		points: z.object({
			left: z.number(),
			right: z.number()
		}),
		chat: z.array(z.unknown()),
		totalScore: z.object({
			left: z.number(),
			right: z.number()
		}),
		clients: z.array(z.unknown())
	}),
	beatmap: z.object({
		isKiai: z.boolean(),
		isBreak: z.boolean(),
		isConvert: z.boolean(),
		time: z.object({
			live: z.number(),
			firstObject: z.number(),
			lastObject: z.number(),
			mp3Length: z.number()
		}),
		status: z.object({
			number: z.number(),
			name: z.string()
		}),
		id: z.number(),
		set: z.number(),
		artist: z.string(),
		artistUnicode: z.string(),
		title: z.string(),
		titleUnicode: z.string(),
		mapper: z.string(),
		version: z.string(),
		stats: z.object({
			stars: z.object({
				live: z.number(),
				total: z.number()
			}),
			ar: z.object({
				original: z.number(),
				converted: z.number()
			}),
			cs: z.object({
				original: z.number(),
				converted: z.number()
			}),
			od: z.object({
				original: z.number(),
				converted: z.number()
			}),
			hp: z.object({
				original: z.number(),
				converted: z.number()
			}),
			bpm: z.object({
				realtime: z.number(),
				common: z.number(),
				min: z.number(),
				max: z.number()
			}),
			maxCombo: z.number()
		})
	})
});

const TosuContext = createContext<TosuData | null>(null);

export function TosuProvider({ children }: { children: ReactNode }) {
	const tosuSocket = useWebSocket("ws://127.0.0.1:24050/websocket/v2");

	const [tosuData, setTosuData] = useState<TosuData>({
		player1: { name: "loading...", score: 0 },
		player2: { name: "loading...", score: 0 },
		tourney: {
			scoreVisible: false,
			bestOF: 0,
			points: { left: 0, right: 0 },
			chat: []
		},
		beatmap: {
			title: "loading...",
			artist: "loading...",
			difficulty: "loading...",
			mapper: "loading...",
			cs: 0,
			ar: 0,
			od: 0,
			stars: 0,
			bpm: 0,
			length: 0
		}
	});

	useEffect(() => {
		tosuSocket.addEventListener("open", () => {
			console.log("connected to tosu");
		});

		tosuSocket.addEventListener("close", () => {
			console.log("disconnected from tosu");
		});

		tosuSocket.addEventListener("message", (e) => {
			try {
				const json = JSON.parse(e.data);
				const parsedData = TosuDataSchema.parse(json);

				setTosuData({
					player1: {
						name: parsedData.tourney.team.left,
						score: parsedData.tourney.totalScore.left
					},
					player2: {
						name: parsedData.tourney.team.right,
						score: parsedData.tourney.totalScore.right
					},
					tourney: {
						scoreVisible: parsedData.tourney.scoreVisible,
						bestOF: parsedData.tourney.bestOF,
						points: {
							left: parsedData.tourney.points.left,
							right: parsedData.tourney.points.right
						},
						chat: parsedData.tourney.chat
					},
					beatmap: {
						title: parsedData.beatmap.title,
						artist: parsedData.beatmap.artist,
						difficulty: parsedData.beatmap.version,
						mapper: parsedData.beatmap.mapper,
						cs: parsedData.beatmap.stats.cs.converted,
						ar: parsedData.beatmap.stats.ar.converted,
						od: parsedData.beatmap.stats.od.converted,
						stars: parsedData.beatmap.stats.stars.total,
						bpm: parsedData.beatmap.stats.bpm.realtime,
						length: parsedData.beatmap.time.lastObject
					}
				});
			} catch (e) {
				console.error("failed to parse tosu data schema:", e);
			}
		});

		tosuSocket.addEventListener("error", () => {
			console.error("error connecting to tosu");
		});
	}, [tosuSocket, setTosuData]);

	return <TosuContext value={tosuData}>{children}</TosuContext>;
}

export function useTosu() {
	const tosuData = useContext(TosuContext);
	if (!tosuData) {
		throw new Error(`useTosu must be used within a TosuProvider`);
	}
	return tosuData;
}
