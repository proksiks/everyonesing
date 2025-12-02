const songsData = [
  {
    title: "Любимому",
    name: "Виктория",
    audio: "https://everyonesing.ru/wp-content/uploads/2025/09/Любимому-Песня.mp3",
    image: "https://everyonesing.ru/wp-content/uploads/2025/09/IMG_6135-974x1024.jpg",
    video: "https://everyonesing.ru/wp-content/uploads/2025/10/IMG_6379.mp4",
    date: "12 ноября 2025",
    color: "#EF0105",
    text: "Муж Дима. Зову его “Пуся”😁 Мы вместе 4 года. Как все началось: Твое ночное сообщение куришь кальян и вот уже ты вызвал мне такси, не зная даже имен друг друга, потом телепроект, ссоры, ругань, расставания, но мы справились  Мы переезжаем в нашу новую квартиру рядом с Москвой сити Я счастлива , что мы проходим этот путь вместе  И многое еще впереди",
    duration: 0,
  },
  {
    title: "На Свадьбу",
    name: "Наталия",
    audio: "https://everyonesing.ru/wp-content/uploads/2025/09/Любимому-Песня.mp3",
    image: "https://everyonesing.ru/wp-content/uploads/2025/09/IMG_6137-1024x1024.jpg",
    video: "https://everyonesing.ru/wp-content/uploads/2025/10/IMG_6376.mp4",
    date: "15 ноября 2025",
    color: "#FF0C59",
    text: "Дарю песню в честь нашей свадьбы! Рома. Моя любовь Работает инженером, все что связано с самолетами. Коллекционирует кроссовки если вдруг это поможет 😅 266 дней с момента предложения руки и сердца Песня как еще одно признание в любви, слова вместо клятвы ",
    duration: 0,
  },
  {
    title: "Подруге",
    name: "Анастасия",
    audio: "https://everyonesing.ru/wp-content/uploads/2025/09/Подруге-Песня.mp3",
    image: "https://everyonesing.ru/wp-content/uploads/2025/09/IMG_6139-987x1024.jpg",
    video: "https://everyonesing.ru/wp-content/uploads/2025/10/IMG_6378.mp4",
    date: "15 ноября 2025",
    color: "#FF4400",
    text: "Яна Она мастер маникюра, иногда занимается спортом, но обычно быстро бросает. 10 лет дружим, учились вместе в колледже За все время знакомства мы жили и в разных городах, и в одном доме на разных этажах. Когда были на расстоянии, все равно всегда общались и ждали встречи. Раньше мы тусили всю ночь, а сейчас она помогает укачивать мою дочку.",
    duration: 0,
  },
  {
    title: "Песня жене",
    name: "Александр",
    audio: "https://everyonesing.ru/wp-content/uploads/2025/09/Жене-Песня.mp3",
    image: "https://everyonesing.ru/wp-content/uploads/2025/09/IMG_6138-1024x1024.jpg",
    video: "https://everyonesing.ru/wp-content/uploads/2025/10/IMG_6377.mp4",
    date: "15 ноября 2025",
    color: "#4971FC",
    text: "Жену называю Ксения, малышка, зая. Она покорила меня с первого взгляда. Она очень ласковая, добрая, отзывчивая. Вместе мы уже 13 лет. Хотели ребенка очень сильно 😅У нас 5 детей сейчас. 3 мальчика и 2 девочки Хобби , рисует картины по номерам 🤣🤣🤣 Хочу поблагодарить ее за то, что была всегда рядом и выразить чувства благодарности, нежности и любви к семье…",
    duration: 0,
  },
  {
    title: "Маме",
    name: "Алина",
    audio: "https://everyonesing.ru/wp-content/uploads/2025/09/Маме-Песня.mp3",
    image: "https://everyonesing.ru/wp-content/uploads/2025/09/IMG_6133-2-1024x1024.jpg",
    video: "https://everyonesing.ru/wp-content/uploads/2025/10/IMG_6371.mp4",
    date: "15 ноября 2025",
    color: "#88b58b",
    text: "День рождения мамы - 55 лет. Обратиться в песне - Энием Заботливая, добрая, искренняя, нежная, чувствительная, любящая, ласковая, добросердечная, драгоценная, единственная, веселая, зажигательная, душевная Спасибо за то, что подарила образование и всегда давала все самое лучшее, во многом отказывая себе. Мама любит как папа играет на гитаре и поет песню «танцы вдвоем» группы Технология",
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

          <div class="examples__player-composition-list-wrapper">
            <ul class="examples__player-composition-list"></ul>
          </div>
          <a class="examples__player-button button button_gradient" href="#">
              <img src="./public/images/icons/mic.svg" alt="Микрофон">
              Заказать песню
          </a>
        </div>
        <div class="examples__content">
          <h3 class="examples__content-title"></h3>
          <div class="examples__content-inner">
            <div class="examples__content-picture">
              <video width="385" height="452" class="examples__content-video" src="" poster="" alt="Картинка" muted playsinline></video>
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
    this.contentVideo = this.container.querySelector(
      ".examples__content-video"
    );
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
        <button class="examples__player-composition-inner" data-index="${index}">
          <div class="examples__player-composition-cover">
            <img width="53" height="53" class="examples__player-composition-cover-img" src="${song.image}" alt="Картинка">
            <div class="examples__player-composition-cover-button">
              <img class="examples__player-composition-cover-button-icon _show" src="./public/images/icons/play.svg" alt="Включить песню">
              <img class="examples__player-composition-cover-button-icon" src="./public/images/icons/pause.svg" alt="Пауза">
            </div>
          </div>
          <div class="examples__player-composition-content">
            <div class="examples__player-composition-title">${song.title}</div>
            <div class="examples__player-composition-name">${song.name}</div>
          </div>
          <div class="examples__player-composition-time" data-index="${index}">--:--</div>
        </button>
      `;
      this.compositionList.appendChild(item);
    });

    this.bindCompositionButtons();
    this.updateActiveComposition();
  }

  bindCompositionButtons() {
    const coverButtons = this.container.querySelectorAll(
      ".examples__player-composition-inner"
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

  updateActiveComposition() {
    const allCompositions = this.container.querySelectorAll(
      ".examples__player-composition-inner"
    );

    allCompositions.forEach((composition, index) => {
      if (index === this.currentIndex) {
        composition.classList.add("_active");
      } else {
        composition.classList.remove("_active");
      }
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
    this.contentDate.textContent = song.date;

    // Установка видео, если оно есть
    if (song.video) {
      this.contentVideo.src = song.video;
      this.contentVideo.poster = song.image;
      this.contentVideo.style.display = "block";
    } else {
      this.contentVideo.style.display = "none";
      this.contentVideo.src = "";
    }

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

      // Автоматическое воспроизведение видео, если оно есть
      if (song.video) {
        this.contentVideo.muted = true;
        this.contentVideo
          .play()
          .catch((e) =>
            console.log("Видео не может быть воспроизведено автоматически:", e)
          );
      }
    } else {
      this.isPlaying = false;
    }

    this.updateUIState();
    this.updateActiveComposition();
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
      ".examples__player-composition-inner"
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

      // Воспроизведение видео, если оно есть
      const currentSong = songsData[this.currentIndex];
      if (currentSong && currentSong.video) {
        this.contentVideo.muted = true;
        this.contentVideo
          .play()
          .catch((e) => console.log("Видео не может быть воспроизведено:", e));
      }
    } else {
      this.audio.pause();
      this.isPlaying = false;

      // Пауза видео, если оно есть
      const currentSong = songsData[this.currentIndex];
      if (currentSong && currentSong.video) {
        this.contentVideo.pause();
      }
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
