let numb = document.querySelectorAll(".items-content h2");
let statsSection = document.querySelector(".our");
let el = document.querySelector(".scrTop");
let scol = document.querySelector(".scol");
let started = false;

let ourSkills = document.querySelector(".ourskills");
let countspan = document.querySelectorAll(".count");
let main = document.querySelectorAll(".main");

let videoTitle = document.querySelector(".show .show_title");
let listVideo = document.querySelectorAll(".list-video li");
let videoitem = document.querySelector(".show .timeVedio");
let videoPlay = document.querySelector(".show video");
let realTime = document.querySelectorAll(".realtime");
let videos = document.querySelector(".video");

let listVideoTime = document.querySelectorAll(".list-video li video");
let videoSpan = document.querySelectorAll(".list-video li span");
listVideoTime.forEach((tim, index) => {
  tim.addEventListener("loadedmetadata", () => {
    let duration = tim.duration;
    videoSpan[index].innerHTML = `
    ${
      Math.floor(duration) > 3600
        ? Math.floor(duration / 3600)
            .toString()
            .padStart(2, "0") + ":"
        : ""
    }
    ${Math.floor(Math.floor(duration / 60) % 60)
      .toString()
      .padStart(2, "0")}:
    ${Math.floor(duration % 60)
      .toString()
      .padStart(2, "0")}
    `;
  });
});

listVideo.forEach((video) => {
  video.onclick = () => {
    listVideo.forEach((vide) => {
      vide.classList.remove("active");
    });
    video.classList.add("active");
    let src = video.children[0].getAttribute("src");
    videoPlay.src = src;
    let titles = video.children[1].innerHTML;
    videoTitle.innerHTML = titles;
    videoPlay.play();
  };
});
videoPlay.addEventListener("timeupdate", (e) => {
  let { currentTime, duration } = e.target;
  let fullTime = Math.floor(duration);
  let second = Math.floor(currentTime) % 60;
  let minutes = Math.floor(Math.floor(currentTime / 60) % 60);
  let hours = Math.floor(currentTime / 3600);
  console.log();
  videoitem.innerHTML = `
  ${
    fullTime > 3600
      ? Math.floor(duration / 3600)
          .toString()
          .padStart(2, "0") + ":"
      : ""
  }
  ${Math.floor(Math.floor(fullTime % 3600) / 60)
    .toString()
    .padStart(2, "0")}:
    ${Math.floor(fullTime % 60)
      .toString()
      .padStart(2, "0")}
  |
  ${fullTime > 3600 ? (hours < 10 ? "0" : "") + hours + ":" : ""}
  ${(minutes < 10 ? "0" : "") + minutes}:
  ${(second < 10 ? "0" : "") + second}`;
});

function startCount(el) {
  let goal = el.dataset.goal;
  let county = setInterval(() => {
    el.textContent++;
    if (el.textContent == goal) {
      clearInterval(county);
    }
  }, 2000 / goal);
}
countspan.forEach((el) => {
  let targ = el.dataset.conty;
  let int = setInterval(() => {
    el.textContent++;
    if (el.textContent == targ) {
      clearInterval(int);
    }
  }, 2000 / targ);
});

let height = document.body.scrollHeight - document.body.clientHeight;
window.addEventListener("scroll", () => {
  let scroTp = document.body.scrollTop;
  el.style.width = `${(scroTp / height) * 100}%`;
});

window.onscroll = function () {
  if (scrollY >= 400) {
    scol.style.display = "block";
  } else {
    scol.style.display = "none";
  }

  scol.onclick = function () {
    scroll({
      left: 0,
      top: 0,
      behavior: "smooth",
    });
  };

  if (window.scrollY >= statsSection.offsetTop) {
    if (!started) {
      numb.forEach((nums) => startCount(nums));
    }
    started = true;
  }
  if (window.scrollY >= ourSkills.offsetTop) {
    main.forEach((el) => {
      el.style.width = "100%";
    });
    countspan.forEach((el) => {
      el.style.width = "50";
      el.style.opacity = "1";
    });
  }
  // // if you want to play auto you should meta the video to play auto!!
  // if (window.scrollY >= videos.offsetTop) {
  //   videoPlay.paused ? videoPlay.play() : "";
  // }
};

let monthday = document.querySelector(".M-D");
let hours = document.querySelector(".hours");
let minutes = document.querySelector(".minutes");
let seconds = document.querySelector(".seconds");
setInterval(() => {
  let currentTime = new Date();
  monthday.innerHTML = `${
    (currentTime.getMonth() < 10 ? "0" : "") + (currentTime.getMonth() + 1)
  } / ${(currentTime.getDate() < 10 ? "0" : "") + currentTime.getDate()}`;
  hours.innerHTML =
    (currentTime.getHours() < 10 ? "0" : "") +
    (currentTime.getHours() > 12
      ? currentTime.getHours() - 12
      : currentTime.getHours()) +
    " " +
    `<sup>${
      currentTime.getHours() > 12 || currentTime.getHours() == 0 ? "PM" : "AM"
    }</sup>`;
  minutes.innerHTML =
    (currentTime.getMinutes() < 10 ? "0" : "") + currentTime.getMinutes();
  seconds.innerHTML =
    (currentTime.getSeconds() < 10 ? "0" : "") + currentTime.getSeconds();
});
