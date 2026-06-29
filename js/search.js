// Home-page search: filters LOCATIONS as the user types and renders
// a small dropdown of matches that link straight to the detail page.

(function () {
  var input = document.getElementById("hero-search");
  var results = document.getElementById("hero-results");
  if (!input || !results) return;

  function render(items) {
    if (!items.length) {
      results.innerHTML = "";
      results.style.display = "none";
      return;
    }
    var html = items.map(function (l) {
      var meta = CATEGORIES[l.category];
      return (
        '<a href="location.html?id=' + encodeURIComponent(l.id) + '">' +
          '<div>' +
            '<div class="name">' + l.name + '</div>' +
            '<div class="sub">' + meta.label + ' · ' + l.zone + ' Zone</div>' +
          '</div>' +
        '</a>'
      );
    }).join("");
    results.innerHTML = html;
    results.style.display = "block";
  }

  function search(query) {
    var q = query.trim().toLowerCase();
    if (!q) return [];
    return LOCATIONS.filter(function (l) {
      return (
        l.name.toLowerCase().indexOf(q) !== -1 ||
        (l.thaiName || "").toLowerCase().indexOf(q) !== -1 ||
        (l.shortCode || "").toLowerCase().indexOf(q) !== -1 ||
        l.description.toLowerCase().indexOf(q) !== -1
      );
    }).slice(0, 5);
  }

  input.addEventListener("input", function (e) {
    render(search(e.target.value));
  });

  // Close the dropdown when clicking elsewhere.
  document.addEventListener("click", function (e) {
    if (!results.contains(e.target) && e.target !== input) {
      results.style.display = "none";
    }
  });
})();

// Featured cards and category counters on the home page.
(function () {
  var featuredEl = document.getElementById("featured-cards");
  if (featuredEl) {
    var first3 = LOCATIONS.slice(0, 3);
    featuredEl.innerHTML = first3.map(function (l) {
      var meta = CATEGORIES[l.category];
      return (
        '<a class="card" href="location.html?id=' + l.id + '">' +
          '<div class="meta">' +
            '<span>' + meta.emoji + '</span>' +
            '<span>' + meta.label + '</span>' +
            '<span>·</span>' +
            '<span>' + l.zone + ' Zone</span>' +
          '</div>' +
          '<h3>' + l.name + '</h3>' +
          (l.thaiName ? '<div class="thai">' + l.thaiName + '</div>' : '') +
          '<p class="desc">' + l.description + '</p>' +
        '</a>'
      );
    }).join("");
  }

  var catGrid = document.getElementById("category-grid");
  if (catGrid) {
    var keys = ["academic","library","dining","sports","dormitory","service"];
    catGrid.innerHTML = keys.map(function (key) {
      var meta = CATEGORIES[key];
      var count = LOCATIONS.filter(function (l){ return l.category === key; }).length;
      return (
        '<a class="category-tile" href="locations.html?category=' + key + '">' +
          '<div class="emoji">' + meta.emoji + '</div>' +
          '<div class="label">' + meta.label + '</div>' +
          '<div class="count">' + count + ' places</div>' +
        '</a>'
      );
    }).join("");
  }
})();
