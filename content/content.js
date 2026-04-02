(() => {
  const BADGE_ID = "thegoodplace-badge";

  if (document.getElementById(BADGE_ID)) return;

  chrome.runtime.sendMessage(
    { type: "GET_BRAND_INFO", url: window.location.href },
    (response) => {
      if (chrome.runtime.lastError || !response) return;
      if (!response.found) return;

      createBadge(response);
    }
  );

  function getScoreColor(score) {
    if (score >= 8) return "#2e7d32";
    if (score >= 6) return "#f9a825";
    if (score >= 4) return "#ef6c00";
    return "#c62828";
  }

  function getScoreEmoji(score) {
    if (score >= 8) return "\u{1F33F}";
    if (score >= 6) return "\u{1F7E1}";
    if (score >= 4) return "\u{26A0}\uFE0F";
    return "\u{1F6A8}";
  }

  function getScoreLabel(score) {
    if (score >= 8) return "Eccellente";
    if (score >= 6) return "Discreto";
    if (score >= 4) return "Insufficiente";
    return "Critico";
  }

  function createBadge(data) {
    const badge = document.createElement("div");
    badge.id = BADGE_ID;

    const color = getScoreColor(data.overall);
    const emoji = getScoreEmoji(data.overall);

    badge.innerHTML = `
      <div class="tgp-badge" style="--tgp-color: ${color}">
        <div class="tgp-badge-header" id="tgp-toggle">
          <span class="tgp-badge-emoji">${emoji}</span>
          <span class="tgp-badge-score">${data.overall}</span>
          <span class="tgp-badge-slash">/10</span>
        </div>
        <div class="tgp-badge-panel" id="tgp-panel">
          <div class="tgp-brand-name">${data.brand}</div>
          <div class="tgp-label">${getScoreLabel(data.overall)}</div>
          <div class="tgp-scores">
            ${Object.entries(data.scores)
              .map(
                ([key, value]) => `
              <div class="tgp-score-row">
                <span class="tgp-score-name">${formatCriteriaName(key)}</span>
                <div class="tgp-score-bar-bg">
                  <div class="tgp-score-bar" style="width: ${value * 10}%; background: ${getScoreColor(value)}"></div>
                </div>
                <span class="tgp-score-value">${value}</span>
              </div>`
              )
              .join("")}
          </div>
          <div class="tgp-note">${data.note}</div>
          <div class="tgp-fonti">
            Fonti: ${data.fonti.map((f) => `<span class="tgp-fonte">${f}</span>`).join(", ")}
          </div>
          <div class="tgp-footer">The Good Place - Finanza Etica</div>
        </div>
      </div>
    `;

    document.body.appendChild(badge);

    const toggle = document.getElementById("tgp-toggle");
    const panel = document.getElementById("tgp-panel");

    toggle.addEventListener("click", () => {
      panel.classList.toggle("tgp-open");
      badge
        .querySelector(".tgp-badge")
        .classList.toggle("tgp-expanded");
    });
  }

  function formatCriteriaName(key) {
    const names = {
      ambiente: "Ambiente",
      diritti_lavoro: "Diritti Lavoro",
      trasparenza: "Trasparenza",
      governance: "Governance",
      comunita: "Comunita",
      armamenti: "No Armamenti",
    };
    return names[key] || key;
  }
})();
