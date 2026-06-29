# CampusCoordinator

A small static website that helps students at **Mae Fah Luang University**
(Chiang Rai, Thailand) find their way around campus — classrooms, dorms,
canteens, the library, sports facilities, and student services.

Built with plain HTML, CSS, and JavaScript so it can be hosted anywhere —
including free GitHub Pages.

## Project structure

```
campuscoordinator/
├── index.html          ← Homepage with search and quick categories
├── locations.html      ← Full directory + category filters
├── location.html       ← Single-location detail page (?id=...)
├── map.html            ← Interactive zone map (SVG)
├── about.html          ← About page
│
├── css/
│   ├── base.css        ← Tokens, resets, typography
│   ├── layout.css      ← Header, footer, hero, sections
│   └── components.css  ← Buttons, cards, chips, search, map
│
├── js/
│   ├── data.js         ← The list of campus locations
│   ├── main.js         ← Nav highlighting + mobile menu
│   ├── search.js       ← Homepage search + category tiles
│   ├── locations.js    ← Directory page filtering
│   ├── location-detail.js ← Renders one location
│   └── map.js          ← Renders the SVG map and pins
│
└── assets/
    └── campus-hero.jpg
```

## Run it locally

You can just open `index.html` in a browser, but most browsers block
`fetch`/script loading from `file://` for some pages. The safer option:

```bash
# any of these work from inside the campuscoordinator/ folder
python3 -m http.server 8000
# or
npx serve .
```

Then open <http://localhost:8000>.

## Publish on GitHub Pages

1. Push this folder to a GitHub repository.
2. Go to **Settings → Pages**.
3. Source: *Deploy from a branch* → `main` / root (or `/campuscoordinator` if you
   keep it in a subfolder).
4. Save. After a minute your site will be live at
   `https://<your-username>.github.io/<repo-name>/`.

## Adding or editing a location

All locations live in [`js/data.js`](js/data.js) — add a new entry to the
`LOCATIONS` array and (optionally) a coordinate to `MAP_COORDS` so a pin
shows up on the map.

## License

Do whatever you like with it. Made by students, for students.
