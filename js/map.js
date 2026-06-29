// Map page: renders zone rectangles plus a pin per location.
// Selecting a pin updates the side panel with a preview.

(function () {
  var svg = document.getElementById("campus-map");
  var side = document.getElementById("map-side");
  if (!svg || !side) return;

  var zoneColors = {
    North:   "#d6ead0",
    South:   "#f3e5cc",
    East:    "#cfe3ec",
    West:    "#e9d6e3",
    Central: "#efe6d4"
  };

  // Background zone rectangles + labels.
  var zonesMarkup =
    '<rect x="20"  y="20"  width="560" height="120" rx="20" fill="' + zoneColors.North   + '" opacity="0.85"/>' +
    '<rect x="20"  y="150" width="100" height="250" rx="20" fill="' + zoneColors.West    + '" opacity="0.85"/>' +
    '<rect x="130" y="150" width="330" height="120" rx="20" fill="' + zoneColors.Central + '" opacity="0.85"/>' +
    '<rect x="470" y="150" width="110" height="250" rx="20" fill="' + zoneColors.East    + '" opacity="0.85"/>' +
    '<rect x="130" y="280" width="330" height="120" rx="20" fill="' + zoneColors.South   + '" opacity="0.85"/>' +
    '<text x="300" y="42"  text-anchor="middle" font-size="11" fill="#5b4a45" font-weight="700">NORTH</text>' +
    '<text x="70"  y="280" text-anchor="middle" font-size="11" fill="#5b4a45" font-weight="700">WEST</text>' +
    '<text x="295" y="215" text-anchor="middle" font-size="11" fill="#8a7b73" font-weight="700">CENTRAL</text>' +
    '<text x="525" y="280" text-anchor="middle" font-size="11" fill="#5b4a45" font-weight="700">EAST</text>' +
    '<text x="295" y="395" text-anchor="middle" font-size="11" fill="#5b4a45" font-weight="700">SOUTH</text>';

  // One <g> per pin.
  var pinsMarkup = LOCATIONS.map(function (l) {
    var c = MAP_COORDS[l.id];
    if (!c) return "";
    return (
      '<g class="pin" data-id="' + l.id + '" transform="translate(' + c.x + ',' + c.y + ')" style="cursor:pointer">' +
        '<circle r="7" fill="#6f2019" stroke="#fff" stroke-width="2"/>' +
        '<text y="-12" text-anchor="middle" font-size="10" fill="#271815">' + (l.shortCode || "") + '</text>' +
      '</g>'
    );
  }).join("");

  svg.innerHTML = zonesMarkup + pinsMarkup;

  function showLocation(l) {
    var meta = CATEGORIES[l.category];
    side.innerHTML =
      '<span class="pill">' + meta.emoji + ' ' + meta.label + ' · ' + l.zone + ' Zone</span>' +
      '<h2 style="margin-top:10px">' + l.name + '</h2>' +
      (l.thaiName ? '<div class="muted" style="font-size:13px">' + l.thaiName + '</div>' : '') +
      '<p style="margin-top:12px">' + l.description + '</p>' +
      '<a class="btn btn-primary" href="location.html?id=' + l.id + '">Open details</a>';
  }

  function highlight(id) {
    var groups = svg.querySelectorAll(".pin");
    for (var i = 0; i < groups.length; i++) {
      var circle = groups[i].querySelector("circle");
      circle.setAttribute("r", groups[i].getAttribute("data-id") === id ? 11 : 7);
    }
  }

  svg.addEventListener("click", function (e) {
    var g = e.target.closest(".pin");
    if (!g) return;
    var id = g.getAttribute("data-id");
    var loc = findLocation(id);
    if (!loc) return;
    highlight(id);
    showLocation(loc);
  });

  svg.addEventListener("mouseover", function (e) {
    var g = e.target.closest(".pin");
    if (!g) return;
    var loc = findLocation(g.getAttribute("data-id"));
    if (loc) showLocation(loc);
  });
})();
