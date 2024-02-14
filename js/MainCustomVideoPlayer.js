const container = document.querySelector(".containervideo");
let speedOptionsli = container.querySelectorAll(".speed-options li");
let progressarea = container.querySelector(".progress-area span");
let videoTimeLine = container.querySelector(".video-timeline");
let fullScreenicon = container.querySelector(".fullscreen i");
let skipBackward = container.querySelector(".skip-backward");
let speedOptions = container.querySelector(".speed-options");
let fullScreenbtn = container.querySelector(".fullscreen");
let skipForward = container.querySelector(".skip-forward");
let progressBar = container.querySelector(".progress-bar");
let mainVideo = container.querySelector(".wrapper Video");
let Speedbtn = container.querySelector(".playback-speed");
let duratTime = container.querySelector(".duration-time");
let picinpicbtn = container.querySelector(".pic-in-pic");
let iconVideo = container.querySelector(".play-pause i");
let play_pause = container.querySelector(".play-pause");
let currtime = container.querySelector(".current-time");
let volumeicon = container.querySelector(".volume i");
let volumeRange = container.querySelector(".range");
let volumeBtn = container.querySelector(".volume");
let wrapper = container.querySelector(".wrapper");
let playVideo = container.querySelector(".play");
let prevbtn = container.querySelector(".prev");
let nextbtn = container.querySelector(".next");
let timer;
//  for timer
const Timeformat = (time) => {
  let seconds = Math.floor(time % 60),
    minutes = Math.floor(time / 60) % 60,
    hours = Math.floor(time / 3600);
  if (hours == 0) {
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};
// for hiden the control
const hideControls = () => {
  if (mainVideo.paused) return;
  timer = setTimeout(() => {
    wrapper.classList.remove("show-controls");
  }, 3000);
};
wrapper.addEventListener("touchcancel", () => {
  clearTimeout(timer); // Clear any existing timer
  wrapper.classList.add("show-controls");
  hideControls();
});
wrapper.addEventListener("mousemove", () => {
  clearTimeout(timer); // Clear any existing timer
  wrapper.classList.add("show-controls");
  hideControls();
});

// Initialize the controls
hideControls();

// play and pause
playVideo.addEventListener("click", () => {
  mainVideo.paused ? mainVideo.play() : mainVideo.pause();
});
play_pause.addEventListener("click", () => {
  mainVideo.paused ? mainVideo.play() : mainVideo.pause();
});
mainVideo.addEventListener("play", () => {
  iconVideo.classList.replace("fa-play", "fa-pause");
});
mainVideo.addEventListener("pause", () => {
  iconVideo.classList.replace("fa-pause", "fa-play");
});
// currentTime and duration for video
mainVideo.addEventListener("timeupdate", (e) => {
  const { currentTime, duration } = e.target;
  const pres = ((currentTime / duration) * 100).toFixed(2);
  progressBar.style.width = `${pres}%`;
  currtime.innerHTML = Timeformat(currentTime);
  duratTime.innerHTML = Timeformat(duration);
});
// Backward and Forward for video
skipBackward.addEventListener("click", () => {
  mainVideo.currentTime -= 5;
});
prevbtn.addEventListener("dblclick", () => {
  mainVideo.currentTime -= 5;
});
skipForward.addEventListener("click", () => {
  mainVideo.currentTime += 10;
});
nextbtn.addEventListener("dblclick", () => {
  mainVideo.currentTime += 10;
});
//  volume max and min for video
volumeBtn.addEventListener("click", () => {
  if (!volumeicon.classList.contains("fa-volume-high")) {
    mainVideo.volume = 1;
    volumeicon.classList.replace("fa-volume-xmark", "fa-volume-high");
  } else {
    mainVideo.volume = 0.0;
    volumeicon.classList.replace("fa-volume-high", "fa-volume-xmark");
  }
  volumeRange.value = mainVideo.volume;
});
volumeRange.addEventListener("input", (e) => {
  mainVideo.volume = e.target.value;
  if (mainVideo.volume <= 0) {
    volumeicon.classList.remove(
      "fa-volume-high",
      "fa-volume-low",
      "fa-volume-off"
    );
    volumeicon.classList.add("fa-volume-xmark");
  } else if (mainVideo.volume <= 0.3) {
    volumeicon.classList.remove(
      "fa-volume-high",
      "fa-volume-xmark",
      "fa-volume-low"
    );
    volumeicon.classList.add("fa-volume-off");
  } else if (mainVideo.volume <= 0.7) {
    volumeicon.classList.remove(
      "fa-volume-high",
      "fa-volume-xmark",
      "fa-volume-off"
    );
    volumeicon.classList.add("fa-volume-low");
  } else {
    volumeicon.classList.remove(
      "fa-volume-low",
      "fa-volume-xmark",
      "fa-volume-off"
    );
    volumeicon.classList.add("fa-volume-high");
  }
});
// Speed Options Show and hidden
Speedbtn.addEventListener("click", () => {
  speedOptions.classList.toggle("showSpeedOptions");
});
document.addEventListener("click", (e) => {
  if (
    e.target.tagName !== "SPAN" ||
    e.target.className !== "material-symbols-rounded"
  ) {
    speedOptions.classList.remove("showSpeedOptions");
  }
});
speedOptionsli.forEach((opt) => {
  opt.addEventListener("click", () => {
    speedOptionsli.forEach((e) => {
      e.classList.remove("active");
    });
    mainVideo.playbackRate = opt.dataset.speed;
    opt.classList.add("active");
  });
});
// pic-in-pic mode
picinpicbtn.addEventListener("click", () => {
  mainVideo.requestPictureInPicture();
});
// FullScreen
fullScreenbtn.addEventListener("click", () => {
  container.classList.toggle("fullscreen");
  if (document.fullscreenElement) {
    fullScreenicon.classList.replace("fa-compress", "fa-expand");
    return document.exitFullscreen();
  }
  fullScreenicon.classList.replace("fa-expand", "fa-compress");
  container.requestFullscreen();
});
// video-timeline county
videoTimeLine.addEventListener("click", (e) => {
  let timelineWidth = e.target.clientWidth;
  mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
});
// Draggable progressBar
const draggableprogressBar = (e) => {
  let timelineWidth = videoTimeLine.clientWidth;
  progressBar.style.width = `${e.offsetX}px`;
  mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
  currtime.innerText = Timeformat(mainVideo.currentTime);
};
// for move the progress with time
videoTimeLine.addEventListener("mousedown", () =>
  videoTimeLine.addEventListener("mousemove", draggableprogressBar)
);
document.addEventListener("mouseup", () =>
  videoTimeLine.removeEventListener("mousemove", draggableprogressBar)
);
//  for show current time with move progress
videoTimeLine.addEventListener("mousemove", (e) => {
  let offsetx = e.offsetX;
  progressarea.style.left = `${offsetx}px`;
  let timelineWidth = videoTimeLine.clientWidth;
  let percent = (e.offsetX / timelineWidth) * mainVideo.duration;
  progressarea.innerText = Timeformat(percent);
});
