// Sets up the mobile menu toggle and highlights the active nav link.
// Loaded on every page.

(function () {
  var header = document.querySelector(".site-header");
  if (!header) return;

  var toggle = header.querySelector(".menu-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      header.classList.toggle("menu-open");
    });
  }

  // Highlight current nav item by comparing pathnames.
  var here = window.location.pathname.split("/").pop() || "index.html";
  var links = header.querySelectorAll(".nav a");
  for (var i = 0; i < links.length; i++) {
    var target = links[i].getAttribute("href");
    if (target === here) {
      links[i].classList.add("is-active");
    }
  }
})();
