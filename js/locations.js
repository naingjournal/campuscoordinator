// Directory page: category chips + free-text search.
// Reads ?category=... from the URL so we can deep-link from the home tiles.

(function () {
  var listEl = document.getElementById("loc-list");
  var emptyEl = document.getElementById("loc-empty");
  var chipsEl = document.getElementById("loc-chips");
  var searchEl = document.getElementById("loc-search");
  if (!listEl) return;

  var params = new URLSearchParams(window.location.search);
  var state = {
    category: params.get("category") || "",
    query: ""
  };

  function renderChips() {
    var keys = ["", "academic","library","dining","sports","dormitory","service","landmark"];
    chipsEl.innerHTML = keys.map(function (k) {
      var label = k === "" ? "All" : (CATEGORIES[k].emoji + " " + CATEGORIES[k].label);
      var active = state.category === k ? " is-active" : "";
      return '<button class="chip' + active + '" data-cat="' + k + '">' + label + '</button>';
    }).join("");
  }

  function renderList() {
    var q = state.query.trim().toLowerCase();
    var items = LOCATIONS.filter(function (l) {
      if (state.category && l.category !== state.category) return false;
      if (!q) return true;
      return (
        l.name.toLowerCase().indexOf(q) !== -1 ||
        (l.thaiName || "").toLowerCase().indexOf(q) !== -1 ||
        l.description.toLowerCase().indexOf(q) !== -1
      );
    });

    if (!items.length) {
      listEl.innerHTML = "";
      emptyEl.style.display = "block";
      return;
    }
    emptyEl.style.display = "none";

    listEl.innerHTML = items.map(function (l) {
      var meta = CATEGORIES[l.category];
      return (
        '<a class="card" href="location.html?id=' + l.id + '">' +
          '<div class="meta">' +
            '<span>' + meta.emoji + ' ' + meta.label + '</span>' +
            '<span style="margin-left:auto">' + l.zone + ' Zone</span>' +
          '</div>' +
          '<h3>' + l.name + '</h3>' +
          (l.thaiName ? '<div class="thai">' + l.thaiName + '</div>' : '') +
          '<p class="desc">' + l.description + '</p>' +
        '</a>'
      );
    }).join("");
  }

  // Wire up events.
  chipsEl.addEventListener("click", function (e) {
    var btn = e.target.closest(".chip");
    if (!btn) return;
    state.category = btn.getAttribute("data-cat");
    // Keep the URL in sync so the back button works as expected.
    var nextParams = new URLSearchParams();
    if (state.category) nextParams.set("category", state.category);
    var qs = nextParams.toString();
    history.replaceState(null, "", qs ? "?" + qs : window.location.pathname);
    renderChips();
    renderList();
  });

  searchEl.addEventListener("input", function (e) {
    state.query = e.target.value;
    renderList();
  });

  renderChips();
  renderList();
})();
