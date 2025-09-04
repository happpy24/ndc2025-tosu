import { useState, useRef, useEffect } from "react";

export function Dashboard() {
  // Match ID dropdown
  const [matchIsOpen, matchSetOpen] = useState(false);
  const [matchSelected, matchSetSelected] = useState("Select");
  const matchDropdownRef = useRef<HTMLDivElement | null>(null);
  const matchOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  // Checkbox
  const [autoSelect, setAutoSelect] = useState(false);

  // Scene switcher
  const [selectedScene, setSelectedScene] = useState("start");
  const scenes = [
    "start",
    "standby",
    "versus",
    "mappool",
    "scheduling",
    "winner",
  ];

  // Red/Blue buttons
  const [activePlayer, setActivePlayer] = useState<"red" | "blue">("red");

  // Bans & Picks dropdown
  const [bansSelection, setBansSelection] = useState("Select");
  const [bansOpen, setBansOpen] = useState(false);
  const [picksSelection, setPicksSelection] = useState("Select");
  const [picksOpen, setPicksOpen] = useState(false);
  const pickbanOptions = ["Map 1", "Map 2", "Map 3", "Map 4", "Map 5", "Map 6"];
  const bansDropdownRef = useRef<HTMLDivElement | null>(null);
  const picksDropdownRef = useRef<HTMLDivElement | null>(null);

  const handleBanConfirm = () => {
    if (bansSelection === "Confirmed!" || bansSelection === "Select") return;
    setBansSelection("Confirmed!");
    console.log("Ban confirmed");
  };

  const handlePickConfirm = () => {
    if (picksSelection === "Confirmed!" || picksSelection === "Select") return;
    setPicksSelection("Confirmed!");
    console.log("Pick confirmed");
  };

  const [dateTime, setDateTime] = useState("");

  const handleDateTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDateTime(value);
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
            {matchSelected}
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
