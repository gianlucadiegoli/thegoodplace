const criteriaNames = {
  ambiente: "Ambiente",
  diritti_lavoro: "Diritti Lavoro",
  trasparenza: "Trasparenza",
  governance: "Governance",
  comunita: "Comunita",
  armamenti: "No Armamenti",
};

function getScoreColor(score) {
  if (score >= 8) return "#2e7d32";
  if (score >= 6) return "#f9a825";
  if (score >= 4) return "#ef6c00";
  return "#c62828";
}

function getScoreLabel(score) {
  if (score >= 8) return "Buono";
  if (score >= 6) return "Sufficiente";
  if (score >= 4) return "Insufficiente";
  return "Gravemente insufficiente";
}

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const tab = tabs[0];
  if (!tab?.url) {
    showNotFound("Nessun URL");
    return;
  }

  chrome.runtime.sendMessage(
    { type: "GET_BRAND_INFO", url: tab.url },
    (response) => {
      if (chrome.runtime.lastError || !response) {
        showNotFound("Errore di comunicazione");
        return;
      }

      if (!response.found) {
        showNotFound(response.domain || "sconosciuto");
        return;
      }

      showBrand(response);
    }
  );
});

function showNotFound(domain) {
  document.getElementById("content").innerHTML = `
    <div class="not-found">
      <p>Nessun dato disponibile per</p>
      <p class="domain">${domain}</p>
      <p style="margin-top:12px; font-size:11px;">Il database viene aggiornato periodicamente con nuovi brand.</p>
    </div>
  `;
}

function showBrand(data) {
  const color = getScoreColor(data.overall);
  const label = getScoreLabel(data.overall);

  const scoresHtml = Object.entries(data.scores)
    .map(
      ([key, value]) => `
    <div class="score-row">
      <span class="name">${criteriaNames[key] || key}</span>
      <div class="bar-bg">
        <div class="bar" style="width: ${value * 10}%; background: ${getScoreColor(value)}"></div>
      </div>
      <span class="val">${value}</span>
    </div>`
    )
    .join("");

  document.getElementById("content").innerHTML = `
    <div class="brand-card">
      <div class="brand-top">
        <div class="brand-name">${data.brand}</div>
        <div class="overall-score" style="background: ${color}">
          <span class="num">${data.overall}</span>
          <span class="den">/10</span>
        </div>
      </div>
      <div class="score-label" style="color: ${color}">${label}</div>
      ${scoresHtml}
      <div class="note">${data.note}</div>
      <div class="fonti">Fonti: ${data.fonti.join(", ")}</div>
    </div>
  `;
}
