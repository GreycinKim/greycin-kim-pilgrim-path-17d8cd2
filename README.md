# Waymark

A reading journal for **The Pilgrim’s Progress**. Sign in, mark the passage you are on, and a pin shows that place on the map — from the City of Destruction to the Celestial City.

The four plates follow Christian’s journey in Part I, joined into one map you can scroll. Plate IV is at the top and Plate I is at the bottom. The map opens on the plate you are reading. Passages are named for the story, not for a page number, so they line up in any unabridged edition. You can also keep a note on each passage.

Anyone signed in on this copy of Waymark shows up on the map, under a name they choose. That name is the only thing other readers see — not an email, and not the notes on a passage. Open **Leaderboard** for the ranking — rank, points, and how long someone has been at a passage — or tap a colored pin.

The book icon beside your name opens a reference for Part I: the people and the places, a picture of each, and the scriptures Bunyan set in the margin. On the map, drag or scroll up and down to move from plate to plate. Plate IV is above Plate III, then Plate II, then Plate I. The menu under Waymark jumps to a plate. The path still shows one city at a time: choose it from the menu, then choose one place. Each person at that place appears as a picture under the name.

Each place is worth 50 points the first time you reach it. **I’ve read this passage** is the only way to open that place’s quiz: one 45-second chance, with the path question included. The total sits beside your name, and company shows everyone else’s score. Characters from the book have left a line at each passage. Your own note stays private. Tap a pin on the map and the passage opens over the plate. The bar along the bottom switches between the map, the leaderboard, a badge for every stop, and the retreat schedule. The schedule includes a photo scavenger hunt for before and after the retreat. Uploading the picture or selfie is worth 25 points on the leaderboard, once. The picture stays on your card. The profile button in the corner keeps your map name, a picture other readers see on your pin, and a daily check-in. Change the picture from that button. **Your name** in that same sheet is private. An admin sees it, along with each reader’s map name, the questions they missed, the missions they finished, and a gallery. **Download pictures for Google Drive** saves those photos as a zip.

## Run it

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:3000](http://127.0.0.1:3000). Create an account, then use **I’ve read this passage** to move the pin. Drag or scroll the map to move between plates, and pinch to zoom. **Places** shows the other towns and landmarks drawn on the plate.

Accounts, your place, and notes are stored in `data/waymark.sqlite` on this machine. That folder is not committed.

## Session secret

Sessions are signed cookies. In production set a long random `SESSION_SECRET` (see `.env.example`). If you leave it unset, the app creates `data/.session-secret` the first time it runs.
