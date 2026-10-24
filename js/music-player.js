
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("refugio-audio");
  if (!audio) return;

  const $ = id => document.getElementById(id);

  const title = $("music-title");
  const artist = $("music-artist");
  const playBtn = $("music-play");
  const prevBtn = $("music-prev");
  const nextBtn = $("music-next");
  const shuffleBtn = $("music-shuffle");
  const repeatBtn = $("music-repeat");
  const seek = $("music-seek");
  const current = $("music-current");
  const duration = $("music-duration");
  const volume = $("music-volume");

  // 25.mp3 es la primera canción.
  // Las demás se mezclan aleatoriamente después.
  const songs = [
    { title: "25", artist: "Refugio Angie", file: "25.mp3" },
    { title: "Creo en mí", artist: "Natalia Jiménez", file: "creo-en-mi.mp3" },
    { title: "Forever Star", artist: "Hidden Love OST", file: "forever-star.mp3" },
    { title: "Dime qué quieres", artist: "Lytos", file: "dime-que-quieres.mp3" },
    { title: "Solo quiero ser normal", artist: "Lytos", file: "solo-quiero-ser-normal.mp3" },
    { title: "Espejismos", artist: "Porta", file: "espejismos.mp3" },
    { title: "Alzo mi voz", artist: "Tito El Bambino ft. Tercer Cielo", file: "alzo-mi-voz.mp3" },
    { title: "Something Happened to My Heart", artist: "T-MAX", file: "something-happened.mp3" }
  ];

  let order = [];
  let position = 0;
  let shuffle = true;
  let repeat = true;
  let seeking = false;

  function formatTime(seconds) {
    if (!Number.isFinite(seconds)) return "0:00";

    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return `${minutes}:${String(secs).padStart(2, "0")}`;
  }

  function makeOrder(firstIndex = 0) {
    const rest = songs
      .map((_, i) => i)
      .filter(i => i !== firstIndex);

    if (shuffle) {
      for (let i = rest.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [rest[i], rest[j]] = [rest[j], rest[i]];
      }
    }

    order = [firstIndex, ...rest];
    position = 0;
  }

  function loadSong(autoplay = false) {
    const song = songs[order[position]];

    title.textContent = song.title;
    artist.textContent = song.artist;

    audio.src = `musica/${song.file}`;
    audio.load();

    seek.value = 0;
    current.textContent = "0:00";
    duration.textContent = "0:00";

    playBtn.textContent = "▶";
    playBtn.setAttribute("aria-label", "Reproducir");

    if (autoplay) playSong();
  }

  async function playSong() {
    try {
      await audio.play();

      playBtn.textContent = "⏸";
      playBtn.setAttribute("aria-label", "Pausar");

      artist.textContent = songs[order[position]].artist;
    } catch (error) {
      playBtn.textContent = "▶";
      playBtn.setAttribute("aria-label", "Reproducir");
      artist.textContent = "Pulsa ▶ para escuchar";
    }
  }

  function pauseSong() {
    audio.pause();

    playBtn.textContent = "▶";
    playBtn.setAttribute("aria-label", "Reproducir");
  }

  function nextSong() {
    if (position + 1 >= order.length) {
      if (!repeat) {
        pauseSong();
        return;
      }

      // Al acabar la lista, crea otra ronda aleatoria.
      // La canción 25 no vuelve a ser la primera automáticamente.
      const nextIndex = shuffle
        ? 1 + Math.floor(Math.random() * (songs.length - 1))
        : 0;

      makeOrder(nextIndex);
    } else {
      position++;
    }

    loadSong(true);
  }

  function previousSong() {
    if (audio.currentTime > 3) {
      audio.currentTime = 0;
      return;
    }

    if (position > 0) {
      position--;
    } else if (repeat) {
      position = order.length - 1;
    }

    loadSong(true);
  }

  playBtn.addEventListener("click", () => {
    if (audio.paused) {
      playSong();
    } else {
      pauseSong();
    }
  });

  nextBtn.addEventListener("click", nextSong);
  prevBtn.addEventListener("click", previousSong);

  shuffleBtn.classList.add("active");
  shuffleBtn.setAttribute("aria-pressed", "true");

  repeatBtn.classList.add("active");
  repeatBtn.setAttribute("aria-pressed", "true");

  shuffleBtn.addEventListener("click", () => {
    shuffle = !shuffle;

    shuffleBtn.classList.toggle("active", shuffle);
    shuffleBtn.setAttribute("aria-pressed", String(shuffle));

    const currentIndex = order[position];

    const rest = songs
      .map((_, i) => i)
      .filter(i => i !== currentIndex);

    if (shuffle) {
      for (let i = rest.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [rest[i], rest[j]] = [rest[j], rest[i]];
      }
    }

    order = [currentIndex, ...rest];
    position = 0;

    loadSong();
  });

  repeatBtn.addEventListener("click", () => {
    repeat = !repeat;

    repeatBtn.classList.toggle("active", repeat);
    repeatBtn.setAttribute("aria-pressed", String(repeat));
  });

  volume.addEventListener("input", () => {
    audio.volume = Number(volume.value);
  });

  audio.volume = Number(volume.value);

  audio.addEventListener("loadedmetadata", () => {
    duration.textContent = formatTime(audio.duration);
  });

  audio.addEventListener("timeupdate", () => {
    current.textContent = formatTime(audio.currentTime);

    if (!seeking && Number.isFinite(audio.duration) && audio.duration > 0) {
      seek.value = (audio.currentTime / audio.duration) * 100;
    }
  });

  seek.addEventListener("input", () => {
    seeking = true;

    if (Number.isFinite(audio.duration)) {
      current.textContent = formatTime(
        (Number(seek.value) / 100) * audio.duration
      );
    }
  });

  seek.addEventListener("change", () => {
    if (Number.isFinite(audio.duration)) {
      audio.currentTime = (Number(seek.value) / 100) * audio.duration;
    }

    seeking = false;
  });

  audio.addEventListener("ended", nextSong);

  audio.addEventListener("error", () => {
    title.textContent = "No se pudo cargar el audio";
    artist.textContent =
      `Revisa que exista: musica/${songs[order[position]].file}`;

    playBtn.textContent = "▶";
  });

  // Comienza con 25.mp3, pero espera a que Angie pulse reproducir.
  makeOrder(0);
  loadSong();
});
