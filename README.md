# Raymond Liu — Portfolio

A static portfolio with two illustrated seasons: autumn for Career and cherry blossom spring for Personal. Open `index.html` directly, or run a local preview:

```sh
python3 -m http.server 4173
```

Then visit http://localhost:4173. No build step or package installation is required.

[Published site](https://raymond-liu0503.github.io/Personal-Website/)

The page structure and portfolio content live in `index.html`, seasonal styles in `styles.css`, and view switching and decorative motion in `scripts.js`. Career is the initial view. The controls support keyboard input, and reduced-motion preferences disable scenery animation.

Original generated landscape artwork is stored as optimized WebP files in `media/scenery/`. Each season has a wide composition and a separate portrait composition for phones. `branches.webp` is a transparent two-part illustration sheet: autumn on the left, cherry blossom on the right. Personal photographs remain in `media/`.
