export function CurrentMapStats() {
  return (
    <div id="current-map">
      <div id="current-map-info">
        <div id="current-map-name"></div>
        <div id="current-map-artist"></div>
        <div id="diff-mapper">
          <div id="current-map-difficulty"></div>
          <div id="current-map-mapper"></div>
        </div>
      </div>
      <div id="current-map-stats">
        <div id="current-map-cs">
          <p>CS</p>
          <div id="cs"></div>
        </div>
        <div id="current-map-ar">
          <p>AR</p>
          <div id="ar"></div>
        </div>
        <div id="current-map-od">
          <p>OD</p>
          <div id="od"></div>
        </div>
        <div id="current-map-sr">
          <p>SR</p>
          <div id="sr"></div>
        </div>
        <div id="current-map-bpm">
          <p>BPM</p>
          <div id="bpm"></div>
        </div>
        <div id="current-map-length">
          <p>Length</p>
          <div id="length"></div>
        </div>
      </div>
    </div>
  );
}
