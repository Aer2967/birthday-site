BIRTHDAY WEBSITE — HOW TO FINISH IT
====================================

This is a 3-page static site (just open index.html in a browser — no
server or build step needed). Everything lives in plain HTML/CSS/JS.

FOLDERS
-------
assets/images/  → put your photos here (shop background, song covers, idol pics)
assets/audio/   → put short mp3 clips here for the songs page
assets/video/   → put short mp4 clips here for the idols page (optional)

1) HOME PAGE (index.html)
--------------------------
- Background photo: save your "aesthetic Hirono shop" photo as
    assets/images/shop-bg.jpg
  (any filename works, just update the path in css/style.css under `.shopfront`)

- Birthday letter text: open index.html and find the block that says
    EDIT YOUR MESSAGE BELOW
  Replace the placeholder paragraph with your own message. Line breaks
  in that block show up exactly as you type them.

- The cat, cake, and envelope are drawn with plain SVG/CSS shapes (no
  image files needed) so it works right away. Feel free to swap colors
  in css/style.css (search for #D9B8A3 = cat color).

2) SONGS PAGE (songs.html + js/songs.js)
-----------------------------------------
Open js/songs.js — at the very top there's a SONGS array with 15
entries. For each song, fill in:
    title  → song name
    artist → artist name
    cover  → path to a cover image, e.g. "assets/images/song1.jpg"
    audio  → path to an audio clip, e.g. "assets/audio/song1.mp3"
              (doesn't need to be the full song — a 30 second clip is
              plenty and keeps the site lightweight)

Everything else (the album cover, the expanding playlist, the vertical
now-playing popup) is generated automatically from that list.

3) IDOLS PAGE (idols.html)
----------------------------
Each "polaroid" card points to a placeholder file, e.g.
    assets/images/juhoon1.jpg
    assets/video/jennie-wave.mp4
Just drop your own photos/clips into the matching assets folder using
those exact filenames, or open idols.html and change the `src="..."`
paths to whatever filenames you used. Until you add real files, each
card shows a soft gradient placeholder instead of a broken image icon.

Add or remove <div class="polaroid">...</div> blocks to change how many
photos appear per idol.

A NOTE ON MEDIA
-----------------
I couldn't include real photos/videos of real people or copyrighted
music in the code itself — you'll need to add your own image, video,
and audio files to the assets folders as described above. Everything
is wired up and ready to go the moment you drop files in with the
matching names (or update the paths).

Enjoy! 🎂
