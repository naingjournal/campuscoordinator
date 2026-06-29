// Detail page: reads ?id=... and renders one location.
// If the id is missing or unknown we show a friendly 404 panel.

(function () {
  var root = document.getElementById("detail-root");
  if (!root) return;

  var params = new URLSearchParams(window.location.search);
  var id = params.get("id");
  var loc = id ? findLocation(id) : null;

  if (!loc) {
    root.innerHTML =
      '<div style="text-align:center;padding:80px 0">' +
        '<h1 style="color:var(--maroon-600)">Location not found</h1>' +
        '<p class="muted">That place isn\'t in the directory.</p>' +
        '<a class="btn btn-primary" href="locations.html">Back to all locations</a>' +
      '</div>';
    return;
  }

  document.title = loc.name + " — CampusCoordinator";

  var meta = CATEGORIES[loc.category];

  var infoCards = [
    { label: "Campus zone", value: loc.zone },
  ];
  if (loc.hours) infoCards.push({ label: "Opening hours", value: loc.hours });
  if (loc.shortCode) infoCards.push({ label: "Building code", value: loc.shortCode });

  var infoHtml = infoCards.map(function (c) {
    return (
      '<div class="info-card">' +
        '<div class="label">' + c.label + '</div>' +
        '<div class="value">' + c.value + '</div>' +
      '</div>'
    );
  }).join("");

  var tipsHtml = "";
  if (loc.tips && loc.tips.length) {
    tipsHtml =
      '<section class="tips">' +
        '<h3>💡 Student tips</h3>' +
        '<ul>' +
          loc.tips.map(function (t) { return '<li>' + t + '</li>'; }).join("") +
        '</ul>' +
      '</section>';
  }

  var related = LOCATIONS.filter(function (l) {
    return l.category === loc.category && l.id !== loc.id;
  }).slice(0, 3);

  var relatedHtml = "";
  if (related.length) {
    relatedHtml =
      '<section style="margin-top:56px">' +
        '<h2 style="font-size:24px">More ' + meta.label.toLowerCase() + ' spots</h2>' +
        '<div class="cards" style="margin-top:20px">' +
          related.map(function (r) {
            return (
              '<a class="card" href="location.html?id=' + r.id + '">' +
                '<h3 style="font-size:18px;margin:0">' + r.name + '</h3>' +
                '<div class="thai" style="margin-top:6px">' + r.zone + ' Zone</div>' +
              '</a>'
            );
          }).join("") +
        '</div>' +
      '</section>';
  }

  root.innerHTML =
    '<a class="back-link" href="locations.html">← All locations</a>' +
    '<header class="detail-head">' +
      '<span class="pill">' + meta.emoji + ' ' + meta.label + '</span>' +
      '<h1>' + loc.name + '</h1>' +
      (loc.thaiName ? '<p class="muted" style="margin-top:-8px">' + loc.thaiName + '</p>' : '') +
      '<p class="lead">' + loc.description + '</p>' +
    '</header>' +
    '<div class="info-grid">' + infoHtml + '</div>' +
    tipsHtml +
    relatedHtml;
})();
