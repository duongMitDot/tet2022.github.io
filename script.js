const daySpan = document.querySelector(".days")
const hourSpan = document.querySelector(".hours")
const minuteSpan = document.querySelector(".minutes")
const secondSpan = document.querySelector(".seconds")
const musicPlay = document.querySelector(".musics")
const playBtn = document.querySelector(".play-btn")
const pauseBtn = document.querySelector(".pause-btn")
const songs = [
  {
      name: "Năm qua tôi đã làm gì",
      path: './music/NamQuaDaLamGiGalaNhacViet2021-NooPhuocThinh-6937919.mp3',
  },
  {
      name: "1 năm mới bình an",
      path: './music/Mot-Nam-Moi-Binh-An-Son-Tung-M-TP.mp3',
  },
  {
      name: "Happy New Year",
      path: "./music/Happy-New-Year-A-Teens.mp3"
  }
];
let isPlaying = false
let currSong, flag = 0
const audio = new Audio()
const nowYear = new Date()

const countdown = () => {
    const datePos = nowYear.getDate()
    const monthPos = nowYear.getMonth()
    const yearPos = nowYear.getFullYear()

    const countDateTime = new Date(yearPos, monthPos+1, 1).getTime()
    const nowTime = new Date().getTime()
    const distance = countDateTime - nowTime

    const days = Math.floor(distance / (1000 * 60 * 60 * 24))
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((distance % (1000 * 60)) / 1000)

    daySpan.innerHTML = days
    hourSpan.innerHTML = hours
    minuteSpan.innerHTML = minutes
    secondSpan.innerHTML = seconds
    if (distance < 0) {
        clearInterval(countdownInterval)
    }
}

const handleEvent = () => {
  musicPlay.addEventListener("click", (e) => {
      if (isPlaying) {
          playBtn.classList.remove("hide")
          pauseBtn.classList.add("hide")
          currSong.pause()
      } else {
          playBtn.classList.add("hide")
          pauseBtn.classList.remove("hide")
          pauseBtn.style.animation = 'rotateBtn 2s linear 0.2s infinite'
          selectTrack(flag)
      }
  })
}

function  selectTrack(flag) {
  songs.forEach((song, index) => {
      if (flag === index) {
          initPlayer(song.path, (flag) => {
              selectTrack(flag)
          });
      } 
  })
}

function initPlayer(url, callback) {
  audio.src = url
  if (audio.src !== undefined) {
      audio.play()
  }
  audio.volume = 0.3
  audio.onplay = () => {
      isPlaying = true
      currSong = audio
  }
  audio.onpause = () => {
      isPlaying = false
      currSong = null
  }
  audio.onended = () => {
      isPlaying = false
      currSong = null
      if (flag < songs.length - 1 ) {
          callback(++flag)
      } else {
          flag = 0
          callback(flag)
      }
  }
}

// firework.start();
countdown()
handleEvent()
const countdownInterval = setInterval(countdown, 1000)
