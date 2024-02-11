const music_img = document.querySelector(".music_img");
const song_title = document.querySelector(".song_title");
const prev_btn = document.querySelector(".back_btn");
const play_btn = document.querySelector(".play_btn");
const pause_btn = document.querySelector(".pause_btn");
const next_btn = document.querySelector(".next_btn");
const audio = document.querySelector(".audio");
const play = document.querySelector(".play");
const menu_btn = document.querySelector(".all_musics");
const modal = document.querySelector(".modal");
const running = document.querySelector(".border_m2");
const timeBox = document.querySelector(".border_m");
const time1 = document.querySelector(".time1");
const time2 = document.querySelector(".time2");
const input = document.querySelector(".input");
const repeat = document.querySelector(".repeat");

const musics = [
  "Billie Eilish",
  "Hope",
  "Look At Me",
  "Moonlight",
  "Another love",
  "Unutmak istiyorum", 
  "Жена_до_конца",
  "Teksidir mam"
];

musics.forEach((item, i) => {
  modal.innerHTML += `
    <h2 onclick = "selectMusic(${i})">${item}</h2>
  `;
});

const selectMusic = (id) => {
  index = id;
  loadMusic(index);
  playMusic();
  play_btn.setAttribute("src", "./image/pause.png");
  modal.classList.remove("active");
};

var index = 0;

const loadMusic = (id) => {
 if(localStorage.getItem("musicIndex")){
  music_img.setAttribute("src", `./music_image/${musics[localStorage.getItem("musicIndex")]}.jpg`);
  song_title.textContent = musics[localStorage.getItem("musicIndex")];
  audio.setAttribute("src", `./music/${musics[localStorage.getItem("musicIndex")]}.mp3`);
 }else{
  music_img.setAttribute("src", `./music_image/${musics[id]}.jpg`);
  song_title.textContent = musics[id];
  audio.setAttribute("src", `./music/${musics[id]}.mp3`);
 }
};

loadMusic(index);

const playMusic = () => {
  audio.play();
  music_img.classList.add("active");
};

const pauseMusic = () => {
  audio.pause();
  music_img.classList.remove("active");
};

play_btn.addEventListener("click", () => {
  if (music_img.classList.contains("active")) {
    pauseMusic();
    play_btn.setAttribute("src", "./image/play.png");
  } else {
    playMusic();
    play_btn.setAttribute("src", "./image/pause.png");
  }
});

const next_to = () => {
  index++;

  loadMusic(index);
  playMusic();
  if (index == musics.length) {
    index = 0;
    loadMusic(index);
    playMusic();
  }
  play_btn.setAttribute("src", "./image/pause.png");
};

const prev_to = () => {
  index--;
  loadMusic(index);
  playMusic();
  if (index == -1) {
    index = 4;
    loadMusic(index);
    playMusic();
  }
  play_btn.setAttribute("src", "./image/pause.png");
};

next_btn.addEventListener("click", ()=>{
  localStorage.clear()
  next_to()
});
prev_btn.addEventListener("click", prev_to);

menu_btn.addEventListener("click", () => {
  modal.classList.toggle("active");
});

const progress = (e) => {
  const duration = e.srcElement.duration;
  const currentTime = e.srcElement.currentTime;

  var musicProgress = (currentTime * 100) / duration;
  running.style.width = `${musicProgress}%`;

  var startMinuts = Math.floor(currentTime / 60)
  var startSeconds = Math.floor(currentTime - (startMinuts * 60))


  time1.textContent = `${startMinuts < 10 ? "0" + startMinuts : startMinuts}:${startSeconds < 10 ? "0" + startSeconds : startSeconds}`

  var musicMinuts = Math.floor(duration / 60)
  var musicSeconds = Math.floor(duration - (musicMinuts * 60))

  if(musicMinuts || musicSeconds){
    time2.textContent = `${musicMinuts < 10 ? "0" + musicMinuts : musicMinuts}:${musicSeconds < 10 ? "0" + musicSeconds : musicSeconds}`
  }else{
    time2.textContent = "00:00"
  }

}

timeBox.addEventListener("click", (e)=>{
  const boxWidth = timeBox.clientWidth
  const clickPoint = e.offsetX
  const duration = audio.duration

  audio.currentTime = duration * clickPoint / boxWidth
})

const setVolume = ()=>{
  audio.volume = input.value / input.max
}


repeat.addEventListener("click", ()=>{
  localStorage.setItem("musicIndex", index)
})


audio.addEventListener("timeupdate", progress);
audio.addEventListener("ended", next_to);
input.addEventListener("input", setVolume)


document.addEventListener("keydown", (e) => {
  const key = e.keyCode;
  
  if(key == 32 && music_img.classList.contains("active")){
    pauseMusic()
    play_btn.setAttribute("src", "./image/play.png");
  }else if(key == 32 ){
    playMusic()
    play_btn.setAttribute("src", "./image/pause.png");
  }

  if(key == 39){
    next_to()
  }else if(key == 37){
    prev_to()
  }

  if(key == 38){
    input.value ++
    setVolume()
  }else if(key == 40){
    input.value --
    setVolume()
  }

  if(key == 77) {
    modal.classList.toggle("active")
  }
});
