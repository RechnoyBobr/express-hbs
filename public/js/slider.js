let trackX = 0;
let prevperc = 0;
let curr = 0;
const track = document.querySelector(`.slider`);
let flag = 0;
window.onmousedown = (e) => {
  trackX = parseFloat(e.clientX);
  flag = 1;
};
window.onmousemove = (e) => {
  if (!flag) return;
  const mouseDelta = trackX - e.clientX,
    maxDelta = window.innerWidth / 2;
  let percentage = (mouseDelta / maxDelta) * -100,
    nextpercentage = Math.max(Math.min(prevperc + percentage, 0), -100);
  curr = nextpercentage;
  track.animate(
    {
      transform: `translate(${nextpercentage}%, -45%)`,
    },
    { duration: 1200, fill: "forwards" }
  );
  for (const image of track.querySelectorAll(`img`)) {
    image.animate(
      {
        objectPosition: `${nextpercentage + 100}% -50%`,
      },
      { duration: 1200, fill: "forwards" }
    );
  }
};
window.onmouseup = (e) => {
  flag = 0;
  prevperc = curr;
};

let player = document.querySelector(`#hoverme_video`);

player.addEventListener(`mouseover`, (e) => {
  player.play();
});

const repeatInput = document.querySelector(`#repeatpass`);
const passInput = document.querySelector(`#pass`);
const errorNode = document.querySelector(`#errorcode`);
const sendBtn = document.querySelector(`#submit`);
repeatInput.addEventListener(`input`, (e) => {
  if (repeatInput.value != passInput.value) {
    errorNode.innerHTML = `Пароли не совпадают!`;
    sendBtn.disabled = true;
    sendBtn.classList.add(`disabled`);
  } else {
    errorNode.innerHTML = " ";
    sendBtn.disabled = false;
    sendBtn.classList.remove(`disabled`);
  }
});
