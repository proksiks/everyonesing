const songsData = [
  {
    title: "Песня мужу",
    name: "Мария",
    audio: "./public/audio/music-1.mp3",
    image: "./public/images/examples/cover.png",
    date: "12 ноября 2025",
    color: "#EF0105",
    text: "Мужа зовут Вова, называю его «муженька». Познакомились когда он переехал к нам жить, мне было тогда 12 лет, потом немного подросла и в 14 начались наши отношения 🙊 Хочу упомянуть рождения нашего сына Миши 19.05.202 этот день полностью поменял нашу жизнь🙏🏽 Я хочу выразить всю свою любовь к этому человеку, мы вместе 11 год, через многое прошли, и уверена ещё много всего прекрасного будет в нашей жизни, мы обязательно справимся со всеми проблемами, заведем собаку, сделаем ремонт мечты в нашем доме, и у нас обязательно будет ещё и голубоглазая малышка👧🏼 Ценю его отношение к семье, доброту и заботу…..",
    duration: 0,
  },
  {
    title: "Песня жене",
    name: "Андрей",
    audio: "./public/audio/music-2.mp3",
    image: "./public/images/examples/ex.png",
    date: "15 ноября 2025",
    color: "#FF0C59",
    text: "Моя жена - это самый родной и близкий человек для меня. Мы вместе уже много лет, и каждый день с ней - это настоящее счастье. Она поддерживает меня в трудные моменты и радуется со мной в моменты радости. Я не представляю свою жизнь без нее. Эта песня - мое признание в любви и благодарность за все, что она для меня делает.",
    duration: 0,
  },
  {
    title: "Песня жене",
    name: "Андрей",
    audio: "./public/audio/music-2.mp3",
    image: "./public/images/examples/ex.png",
    date: "15 ноября 2025",
    color: "#FF4400",
    text: "Моя жена - это самый родной и близкий человек для меня. Мы вместе уже много лет, и каждый день с ней - это настоящее счастье. Она поддерживает меня в трудные моменты и радуется со мной в моменты радости. Я не представляю свою жизнь без нее. Эта песня - мое признание в любви и благодарность за все, что она для меня делает.",
    duration: 0,
  },
  {
    title: "Песня жене",
    name: "Андрей",
    audio: "./public/audio/music-2.mp3",
    image: "./public/images/examples/ex.png",
    date: "15 ноября 2025",
    color: "#4971FC",
    text: "Моя жена - это самый родной и близкий человек для меня. Мы вместе уже много лет, и каждый день с ней - это настоящее счастье. Она поддерживает меня в трудные моменты и радуется со мной в моменты радости. Я не представляю свою жизнь без нее. Эта песня - мое признание в любви и благодарность за все, что она для меня делает.",
    duration: 0,
  },
  {
    title: "Песня жене",
    name: "Андрей",
    audio: "./public/audio/music-2.mp3",
    image: "./public/images/examples/ex.png",
    date: "15 ноября 2025",
    color: "#88b58b",
    text: "Моя жена - это самый родной и близкий человек для меня. Мы вместе уже много лет, и каждый день с ней - это настоящее счастье. Она поддерживает меня в трудные моменты и радуется со мной в моменты радости. Я не представляю свою жизнь без нее. Эта песня - мое признание в любви и благодарность за все, что она для меня делает.",
    duration: 0,
  },
];

class AudioPlayer {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    if (!this.container) {
      console.error(`Container with selector ${containerSelector} not found`);
      return;
    }
    console.log("by @ProKsiKzzz");
    this.currentIndex = 0;
    this.isPlaying = false;
    this.audio = new Audio();
    this.isFullTextVisible = false;
    this.fullText = "";

    this.init();
  }

  init() {
    this.createPlayer();
    this.loadSong(this.currentIndex, false);
    this.bindEvents();
    this.loadAllDurations();

    window.addEventListener("resize", () => this.handleResize());
  }

  createPlayer() {
    this.container.innerHTML = `
      <div class="examples__head">
        <h2 class="examples__head-title">Примеры авторских песен</h2>
        <p class="examples__head-text">Уже более 1700 историй любви, благодарности и дружбы мы превратили в песни</p>
      </div>

      <div class="examples__body">
        <div class="examples__body-decorate" style="background: ${songsData[0].color};"></div>
        <div class="examples__player">
          <div class="examples__player-head">
            <div class="examples__player-preview">
              <img width="134" height="134" class="examples__player-preview-img" src="" alt="Картинка">
            </div>
            <div class="examples__player-info">
              <div class="examples__player-title"></div>
              <div class="examples__player-name"></div>
            </div>
          </div>
          <div class="examples__player-timer">
            <div class="examples__player-timer-bar">
              <button class="examples__player-prev" type="button">
                <img src="./public/images/examples/icons/prev.svg" alt="Предыдущая песня">
              </button>
              <div class="examples__player-timer-progress">
                <span class="examples__player-timer-progress-line" style="width: 0%;"></span>
              </div>
              <button class="examples__player-next" type="button">
                <img src="./public/images/examples/icons/next.svg" alt="Следующая песня">
              </button>
            </div>
            <button class="examples__player-timer-button" type="button">
              <img class="examples__player-timer-button-icon _show" src="./public/images/icons/play.svg"
                   alt="Включить песню">
              <img class="examples__player-timer-button-icon" src="./public/images/icons/pause.svg"
                   alt="Пауза">
            </button>
          </div>

          <div class="examples__player-sub-title">Другие примеры</div>

          <ul class="examples__player-composition-list"></ul>

          <a class="examples__player-button button button_gradient" href="#">
              <img src="./public/images/icons/mic.svg" alt="Микрофон">
              Заказать песню
          </a>
        </div>
        <div class="examples__content">
          <h3 class="examples__content-title"></h3>
          <div class="examples__content-inner">
            <div class="examples__content-picture">
              <img width="385" height="452" class="examples__content-img" src="" alt="Картинка">
            </div>
            <div class="examples__content-body">
              <p class="examples__content-text"></p>

              <button class="examples__content-more _show" type="button">
                Читать историю полностью
              </button>

              <div class="examples__content-date"></div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.playerPreviewImg = this.container.querySelector(
      ".examples__player-preview-img"
    );
    this.playerTitle = this.container.querySelector(".examples__player-title");
    this.playerName = this.container.querySelector(".examples__player-name");
    this.progressBar = this.container.querySelector(
      ".examples__player-timer-progress-line"
    );
    this.timerButton = this.container.querySelector(
      ".examples__player-timer-button"
    );
    const timerIcons = this.container.querySelectorAll(
      ".examples__player-timer-button-icon"
    );
    this.timerPlayIcon = timerIcons[0];
    this.timerPauseIcon = timerIcons[1];

    this.prevButton = this.container.querySelector(".examples__player-prev");
    this.nextButton = this.container.querySelector(".examples__player-next");
    this.compositionList = this.container.querySelector(
      ".examples__player-composition-list"
    );
    this.contentTitle = this.container.querySelector(
      ".examples__content-title"
    );
    this.contentImg = this.container.querySelector(".examples__content-img");
    this.contentText = this.container.querySelector(".examples__content-text");
    this.contentMoreButton = this.container.querySelector(
      ".examples__content-more"
    );
    this.contentDate = this.container.querySelector(".examples__content-date");

    this.renderCompositionList();
  }

  renderCompositionList() {
    this.compositionList.innerHTML = "";
    songsData.forEach((song, index) => {
      const item = document.createElement("li");
      item.className = "examples__player-composition-item";
      item.innerHTML = `
        <div class="examples__player-composition-inner">
          <div class="examples__player-composition-cover">
            <img width="53" height="53" class="examples__player-composition-cover-img" src="${song.image}" alt="Картинка">
            <button class="examples__player-composition-cover-button" data-index="${index}">
              <img class="examples__player-composition-cover-button-icon _show" src="./public/images/icons/play.svg" alt="Включить песню">
              <img class="examples__player-composition-cover-button-icon" src="./public/images/icons/pause.svg" alt="Пауза">
            </button>
          </div>
          <div class="examples__player-composition-content">
            <div class="examples__player-composition-title">${song.title}</div>
            <div class="examples__player-composition-name">${song.name}</div>
          </div>
          <div class="examples__player-composition-time" data-index="${index}">--:--</div>
        </div>
      `;
      this.compositionList.appendChild(item);
    });

    this.bindCompositionButtons();
  }

  bindCompositionButtons() {
    const coverButtons = this.container.querySelectorAll(
      ".examples__player-composition-cover-button"
    );
    coverButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const index = parseInt(e.currentTarget.getAttribute("data-index"), 10);

        if (this.currentIndex !== index) {
          this.currentIndex = index;
          this.loadSong(index, true);
          return;
        }

        this.togglePlay();
      });
    });
  }

  bindEvents() {
    this.prevButton.addEventListener("click", () => this.prevSong());
    this.nextButton.addEventListener("click", () => this.nextSong());
    this.timerButton.addEventListener("click", () => {
      this.togglePlay();
    });

    this.audio.addEventListener("timeupdate", () => this.updateProgress());
    this.audio.addEventListener("ended", () => this.nextSong(true));
    this.audio.addEventListener("loadedmetadata", () => {
      this.updateCompositionTimeDisplay(this.currentIndex, this.audio.duration);
    });
  }

  updateCompositionTimeDisplay(index, duration) {
    if (!duration) return;
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    const durationTimeStr = `${minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
    const compositionTimeElement = this.container.querySelector(
      `.examples__player-composition-time[data-index="${index}"]`
    );
    if (compositionTimeElement) {
      compositionTimeElement.textContent = durationTimeStr;
    }
  }

  loadSong(index, autoplay = false) {
    const song = songsData[index];
    if (!song) return;

    this.playerPreviewImg.src = song.image;
    this.playerTitle.textContent = song.title;
    this.playerName.textContent = song.name;
    this.contentTitle.textContent = song.name;
    this.contentImg.src = song.image;
    this.contentDate.textContent = song.date;

    const decorateElement = this.container.querySelector(
      ".examples__body-decorate"
    );
    if (decorateElement && song.color) {
      decorateElement.style.background = song.color;
    }

    this.currentSongText = song.text;
    this.updateStoryText(song.text);

    this.audio.src = song.audio;
    this.audio.load();

    if (autoplay) {
      this.audio.play();
      this.isPlaying = true;
    } else {
      this.isPlaying = false;
    }

    this.updateUIState();
  }

  async loadAllDurations() {
    for (let i = 0; i < songsData.length; i++) {
      const song = songsData[i];
      const audio = new Audio();
      await new Promise((resolve) => {
        audio.onloadedmetadata = () => {
          song.duration = audio.duration;
          this.updateCompositionTimeDisplay(i, audio.duration);
          resolve();
        };
        audio.onerror = () => {
          this.updateCompositionTimeDisplay(i, 0);
          resolve();
        };
        audio.src = song.audio;
        audio.load();
      });
    }
  }

  updateStoryText(text) {
    const maxLength = 400;
    if (text.length > maxLength) {
      this.contentText.textContent = text.substring(0, maxLength) + "...";
      this.contentMoreButton.classList.add("_show");

      if (window.innerWidth < 1280) {
        this.contentText.classList.remove("_show");
        this.contentMoreButton.textContent = "Читать историю полностью";
        this.isFullTextVisible = false;
        this.fullText = text;

        this.contentMoreButton.onclick = () => {
          if (!this.isFullTextVisible) {
            this.contentText.textContent = this.fullText;
            this.contentText.classList.add("_show");
            this.contentMoreButton.textContent = "Скрыть историю";
            this.isFullTextVisible = true;
          } else {
            this.contentText.classList.remove("_show");
            this.contentMoreButton.textContent = "Читать историю полностью";
            this.isFullTextVisible = false;
          }
        };
      } else {
        this.contentText.classList.add("_show");
        this.contentMoreButton.textContent = "Читать историю полностью";
        this.isFullTextVisible = false;
        this.fullText = text;

        this.contentMoreButton.onclick = () => {
          if (!this.isFullTextVisible) {
            this.contentText.textContent = this.fullText;
            this.contentMoreButton.textContent = "Скрыть историю";
            this.isFullTextVisible = true;
          } else {
            this.contentText.textContent = text.substring(0, maxLength) + "...";
            this.contentMoreButton.textContent = "Читать историю полностью";
            this.isFullTextVisible = false;
          }
        };
      }
    } else {
      this.contentText.textContent = text;
      this.contentMoreButton.classList.remove("_show");
      this.contentText.classList.add("_show");
      this.contentMoreButton.onclick = null;

      if (window.innerWidth < 1280) {
        this.contentText.classList.remove("_show");
        this.contentMoreButton.classList.add("_show");
        this.contentMoreButton.textContent = "Читать историю полностью";
        this.isFullTextVisible = false;
        this.fullText = text;

        this.contentMoreButton.onclick = () => {
          if (!this.isFullTextVisible) {
            this.contentText.textContent = this.fullText;
            this.contentText.classList.add("_show");
            this.contentMoreButton.textContent = "Скрыть историю";
            this.isFullTextVisible = true;
          } else {
            this.contentText.classList.remove("_show");
            this.contentMoreButton.textContent = "Читать историю полностью";
            this.isFullTextVisible = false;
          }
        };
      }
    }
  }

  updateUIState() {
    const allButtons = this.container.querySelectorAll(
      ".examples__player-composition-cover-button"
    );

    allButtons.forEach((button) => {
      const index = parseInt(button.getAttribute("data-index"), 10);
      const icons = button.querySelectorAll(
        ".examples__player-composition-cover-button-icon"
      );
      const playIcon = icons[0];
      const pauseIcon = icons[1];

      playIcon.classList.add("_show");
      pauseIcon.classList.remove("_show");

      if (index === this.currentIndex && this.isPlaying) {
        playIcon.classList.remove("_show");
        pauseIcon.classList.add("_show");
      }
    });

    if (this.isPlaying) {
      this.timerPlayIcon.classList.remove("_show");
      this.timerPauseIcon.classList.add("_show");
    } else {
      this.timerPlayIcon.classList.add("_show");
      this.timerPauseIcon.classList.remove("_show");
    }
  }

  togglePlay() {
    if (this.audio.paused) {
      this.audio.play();
      this.isPlaying = true;
    } else {
      this.audio.pause();
      this.isPlaying = false;
    }
    this.updateUIState();
  }

  prevSong(fromEnded = false) {
    this.currentIndex =
      (this.currentIndex - 1 + songsData.length) % songsData.length;

    const shouldAutoplay = this.isPlaying || fromEnded;
    this.loadSong(this.currentIndex, shouldAutoplay);
  }

  nextSong(fromEnded = false) {
    this.currentIndex = (this.currentIndex + 1) % songsData.length;
    const shouldAutoplay = this.isPlaying || fromEnded;
    this.loadSong(this.currentIndex, shouldAutoplay);
  }

  updateProgress() {
    const percent = (this.audio.currentTime / this.audio.duration) * 100;
    this.progressBar.style.width = `${percent || 0}%`;
  }

  handleResize() {
    if (this.currentSongText) {
      this.updateStoryText(this.currentSongText);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const playerContainer = document.querySelector(".examples");
  if (playerContainer) {
    new AudioPlayer(".examples");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const playerContainer = document.querySelector(".examples");
  if (playerContainer) {
    new AudioPlayer(".examples");
  }
});
