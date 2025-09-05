import { screenNames, type ScreenName } from "@/schemas/screens";
import { useSettings } from "@/state/dashboard";
import { useCurrentMatchesQuery, useMappoolQuery } from "@/state/huis";
import { useState, useRef, useEffect } from "react";

export function Dashboard() {
  const { data: matches } = useCurrentMatchesQuery();
  const [settings, setSettings] = useSettings();

  // Match ID dropdown
  const [matchIsOpen, matchSetOpen] = useState(false);
  const [matchSelected, matchSetSelected] = useState<number>();
  const matchDropdownRef = useRef<HTMLDivElement | null>(null);
  const matchOptions = matches?.map((match) => match.uid) ?? [];

  // Checkbox
  const [autoSelect, setAutoSelect] = useState(false);

  // Scene switcher
  const [selectedScene, _setSelectedScene] = useState<ScreenName>("start");
  const setSelectedScene = (scene: ScreenName) => {
    setSettings({ activeScreen: scene, previousScreen: selectedScene });
    _setSelectedScene(scene);
  };
  const scenes = screenNames;

  // Red/Blue buttons
  const [activePlayer, setActivePlayer] = useState<"red" | "blue">("red");

  const { beatmaps } = useMappoolQuery();
  const pickbanOptions = Object.values(beatmaps)
    .flat()
    .map((map) => map.modBracket + map.modBracketIndex);

  // Bans & Picks dropdown
  const [bansSelection, setBansSelection] = useState("Select");
  const [bansOpen, setBansOpen] = useState(false);
  const [picksSelection, setPicksSelection] = useState("Select");
  const [picksOpen, setPicksOpen] = useState(false);
  const bansDropdownRef = useRef<HTMLDivElement | null>(null);
  const picksDropdownRef = useRef<HTMLDivElement | null>(null);

  const handleBanConfirm = () => {
    if (bansSelection === "Confirmed!" || bansSelection === "Select") return;
    const bans = settings.bans[activePlayer];
    const newBansActivePlayer = bans.includes(bansSelection)
      ? bans.filter((b) => b !== bansSelection)
      : bans.concat([bansSelection]);
    const newBans = structuredClone(settings.bans);
    newBans[activePlayer] = newBansActivePlayer;

    setSettings({ bans: newBans });
    setBansSelection("Confirmed!");
    console.log("Ban confirmed");
  };

  const handlePickConfirm = () => {
    if (picksSelection === "Confirmed!" || picksSelection === "Select") return;
    const picks = settings.picks[activePlayer];
    const newPicksActivePlayer = picks.includes(picksSelection)
      ? picks.filter((b) => b !== picksSelection)
      : picks.concat([picksSelection]);
    const newPicks = structuredClone(settings.picks);
    newPicks[activePlayer] = newPicksActivePlayer;

    setSettings({ picks: newPicks });
    setPicksSelection("Confirmed!");
    console.log("Pick confirmed");
  };

  const [dateTime, setDateTime] = useState("");

  const handleDateTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDateTime(value);
    setSettings({ countdown: new Date(value) });
    console.log("Selected date and time:", value);
  };

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        matchDropdownRef.current &&
        !matchDropdownRef.current.contains(e.target as Node)
      )
        matchSetOpen(false);
      if (
        bansDropdownRef.current &&
        !bansDropdownRef.current.contains(e.target as Node)
      )
        setBansOpen(false);
      if (
        picksDropdownRef.current &&
        !picksDropdownRef.current.contains(e.target as Node)
      )
        setPicksOpen(false);
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div id="main">
      <div id="title">tourney!dash</div>

      {/* Match Select */}
      <div id="match-select">
        <div id="match-select-id" ref={matchDropdownRef}>
          <div id="match-select-id-text">Select a Match ID:</div>
          <div
            id="match-select-id-input"
            className={matchIsOpen ? "open" : ""}
            onClick={() => matchSetOpen(!matchIsOpen)}
          >
            {matchSelected ?? "Select"}
          </div>
          <div
            className={`match-select-dropdown-options ${matchIsOpen ? "show" : ""}`}
          >
            {matchOptions.map((opt) => (
              <div
                key={opt}
                onClick={() => {
                  matchSetSelected(opt);
                  matchSetOpen(false);
                  setSettings({ matchId: opt });
                }}
              >
                {opt}
              </div>
            ))}
          </div>
        </div>
        <div id="match-select-auto">
          <div id="match-select-auto-text">Automatic select:</div>
          <div
            id="match-select-auto-checkbox"
            className={autoSelect ? "checked" : ""}
            onClick={() => setAutoSelect(!autoSelect)}
          />
        </div>
      </div>

      <div className="divider"></div>

      {/* Scene Switcher */}
      <div id="scene-switcher">
        <div id="scene-switcher-text">Scene Switcher</div>
        <div id="scene-switcher-select">
          {scenes.map((scene) => (
            <div
              key={scene}
              className={`scene-switcher-option ${selectedScene === scene ? "selected" : ""}`}
              onClick={() => setSelectedScene(scene)}
            >
              {scene.charAt(0).toUpperCase() + scene.slice(1)}
            </div>
          ))}
        </div>
      </div>

      <div className="divider"></div>

      {/* Mappool Control Panel */}
      <div id="mappool-controls">
        <div id="mappool-controls-text">Mappool Control Panel</div>

        {/* Red/Blue Input Buttons */}
        <div id="player-select">
          <button
            id="red-input"
            className={activePlayer === "red" ? "red active" : "red"}
            onClick={() => setActivePlayer("red")}
          >
            Red Input
          </button>
          <button
            id="blue-input"
            className={activePlayer === "blue" ? "blue active" : "blue"}
            onClick={() => setActivePlayer("blue")}
          >
            Blue Input
          </button>
        </div>

        {/* Bans / Picks */}
        <div id="mappool-select">
          <div id="bans" ref={bansDropdownRef}>
            <div id="bans-text">Ban/Unban</div>
            <div
              id="ban-select-id-input"
              className={bansOpen ? "open" : ""}
              onClick={() => setBansOpen(!bansOpen)}
            >
              {bansSelection}
            </div>
            <div
              className={`ban-select-dropdown-options ${bansOpen ? "show" : ""}`}
            >
              {pickbanOptions.map((opt) => (
                <div
                  key={opt}
                  onClick={() => {
                    setBansSelection(opt);
                    setBansOpen(false);
                  }}
                >
                  {opt}
                </div>
              ))}
            </div>
            <div id="bans-confirm" onClick={handleBanConfirm}>
              Confirm
            </div>
          </div>

          <div id="picks" ref={picksDropdownRef}>
            <div id="picks-text">Pick/Unpick</div>
            <div
              id="pick-select-id-input"
              className={picksOpen ? "open" : ""}
              onClick={() => setPicksOpen(!picksOpen)}
            >
              {picksSelection}
            </div>
            <div
              className={`pick-select-dropdown-options ${picksOpen ? "show" : ""}`}
            >
              {pickbanOptions.map((opt) => (
                <div
                  key={opt}
                  onClick={() => {
                    setPicksSelection(opt);
                    setPicksOpen(false);
                  }}
                >
                  {opt}
                </div>
              ))}
            </div>
            <div id="picks-confirm" onClick={handlePickConfirm}>
              Confirm
            </div>
          </div>
        </div>
      </div>

      <div className="divider"></div>

      {/* Countdown */}
      <div id="countdown">
        <div id="countdown-text">Countdown</div>
        <input
          id="countdown-input"
          type="datetime-local"
          value={dateTime}
          onChange={handleDateTimeChange}
        ></input>
      </div>
    </div>
  );
}
