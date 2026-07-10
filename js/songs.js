// ============================================================
// SONGS PAGE — EDIT YOUR 15 SONGS HERE
// title / artist  : text shown in the playlist + player
// cover           : path to an image, e.g. "assets/images/song1.jpg"
// audio           : path to an audio file, e.g. "assets/audio/song1.mp3"
//                   (a short clip is enough — it doesn't need to be the full song)
// ============================================================
const SONGS = [
  { title: "tila tala", artist: "syd hartha", cover: "assets/images/song1.jpg", audio: "assets/audios/song1.mp4" },
  { title: "Don't Know What To Do", artist: "Blackpink", cover: "assets/images/song2.jpg", audio: "assets/audios/song2.mp4" },
  { title: "REDRED", artist: "Cortis", cover: "assets/images/song3.jpg", audio: "assets/audios/song3.mp4" },
  { title: "Ayoko Maging Kaibigan", artist: "kiddotin", cover: "assets/images/song4.jpg", audio: "assets/audios/song4.mp4" },
  { title: "Selos", artist: "the vowels they orbit", cover: "assets/images/song5.png", audio: "assets/audios/song5.mp4" },
  { title: "Batangina", artist: "Dyessa Garcia & Young Momshie", cover: "assets/images/song6.jpg", audio: "assets/audios/song6.mp4" },
  { title: "PRIBADO", artist: "Toni Fowler x Tito Vince x Papi Galang", cover: "assets/images/song7.jpg", audio: "assets/audios/song7.mp4" },
  { title: "Worth It?", artist: "Joshua Kim", cover: "assets/images/song8.jpg", audio: "assets/audios/song8.mp4" },
  { title: "Pag-Ibig ay Kanibalismo II", artist: "fitterkarma", cover: "assets/images/song9.jpg", audio: "assets/audios/song9.mp4" },
  { title: "Araw-Araw", artist: "Ben&Ben", cover: "assets/images/song10.jpg", audio: "assets/audios/song10.mp4" },
  { title: "Minsan", artist: "Munimuni", cover: "assets/images/song11.jpg", audio: "assets/audios/song11.mp4" },
  { title: "Tongue Tied", artist: "Grouplove", cover: "assets/images/song12.jpg", audio: "assets/audios/song12.mp4" },
  { title: "Saranggola", artist: "Ben&Ben", cover: "assets/images/song13.jpg", audio: "assets/audios/song13.mp4" },
  { title: "Like Real People Do", artist: "Hozier", cover: "assets/images/song14.jpg", audio: "assets/audios/song14.mp4" },
  { title: "Sagada", artist: "Cup of Joe", cover: "assets/images/song15.jpg", audio: "assets/audios/song15.mp4" },
];

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- render playlist ---------- */
  const songList = document.getElementById('songList');
  const trackCount = document.getElementById('trackCount');
  trackCount.textContent = `${SONGS.length} songs`;

  SONGS.forEach((song, i) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="track-no">${i + 1}</span>
      <img class="cover-thumb" src="${song.cover}" alt="${song.title} cover"
           onerror="this.style.background='linear-gradient(145deg,#F3C6D0,#B9A6DC)'; this.removeAttribute('src');">
      <span class="meta">
        <span class="t-title">${song.title}</span>
        <span class="t-artist">${song.artist}</span>
      </span>
      <span class="duration">▶</span>
    `;
    li.addEventListener('click', () => openPlayer(song));
    songList.appendChild(li);
  });

  /* ---------- album -> playlist expand ---------- */
  const albumStage = document.getElementById('albumStage');
  const playlistStage = document.getElementById('playlistStage');
  const albumCover = document.getElementById('albumCover');
  const backBtn = document.getElementById('backBtn');

  albumCover.addEventListener('click', () => {
    albumStage.classList.add('hide');
    playlistStage.classList.add('show');
  });
  backBtn.addEventListener('click', () => {
    playlistStage.classList.remove('show');
    albumStage.classList.remove('hide');
  });

  /* ---------- vertical "podcast style" player ---------- */
  const playerModal   = document.getElementById('playerModal');
  const playerCover   = document.getElementById('playerCover');
  const playerTitle   = document.getElementById('playerTitle');
  const playerArtist  = document.getElementById('playerArtist');
  const audioEl       = document.getElementById('audioEl');
  const playToggle    = document.getElementById('playToggle');
  const playIcon      = document.getElementById('playIcon');
  const progressFill  = document.getElementById('progressFill');
  const curTimeEl     = document.getElementById('curTime');
  const durTimeEl     = document.getElementById('durTime');
  const closePlayer   = document.getElementById('closePlayer');

  const ICON_PLAY  = '<path d="M8 5v14l11-7z"/>';
  const ICON_PAUSE = '<path d="M6 5h4v14H6zM14 5h4v14h-4z"/>';

  function formatTime(sec) {
    if (!isFinite(sec)) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  function openPlayer(song) {
    playerCover.src = song.cover;
    playerCover.onerror = () => { playerCover.style.background = 'linear-gradient(145deg,#F3C6D0,#B9A6DC)'; playerCover.removeAttribute('src'); };
    playerTitle.textContent = song.title;
    playerArtist.textContent = song.artist;
    audioEl.src = song.audio;
    progressFill.style.width = '0%';
    curTimeEl.textContent = '0:00';
    durTimeEl.textContent = '0:00';

    playerModal.classList.add('active');
    audioEl.play().then(() => {
      playIcon.innerHTML = ICON_PAUSE;
    }).catch(() => {
      // autoplay might be blocked until the user interacts — that's fine
      playIcon.innerHTML = ICON_PLAY;
    });
  }

  playToggle.addEventListener('click', () => {
    if (audioEl.paused) {
      audioEl.play();
      playIcon.innerHTML = ICON_PAUSE;
    } else {
      audioEl.pause();
      playIcon.innerHTML = ICON_PLAY;
    }
  });

  audioEl.addEventListener('timeupdate', () => {
    if (audioEl.duration) {
      progressFill.style.width = (audioEl.currentTime / audioEl.duration) * 100 + '%';
      curTimeEl.textContent = formatTime(audioEl.currentTime);
    }
  });
  audioEl.addEventListener('loadedmetadata', () => {
    durTimeEl.textContent = formatTime(audioEl.duration);
  });
  audioEl.addEventListener('ended', () => { playIcon.innerHTML = ICON_PLAY; });

  function closePlayerModal() {
    audioEl.pause();
    playerModal.classList.remove('active');
  }
  closePlayer.addEventListener('click', closePlayerModal);
  playerModal.addEventListener('click', (e) => { if (e.target === playerModal) closePlayerModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closePlayerModal(); });

});
