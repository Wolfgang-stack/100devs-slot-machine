//array of options
//              [banana, penguin, cowboy, money, grandma]
const icons = ["🍌", "🐧", "🤠", "💰", "👵"];
//spin button
const spin = document.querySelector("#spin");
//text things
const currentCash = document.getElementById("currentCash");
const betAmount = document.getElementById("betAmount");
const winAmount = document.getElementById("winAmount");
//bet Mods
const betAdd = document.getElementById("betAdd");
const betSub = document.getElementById("betSub");
const bet = document.getElementById("bet");
const addFive = document.getElementById("addFive");
const addTen = document.getElementById("addTen");
const addHund = document.getElementById("addHund");
const allIn = document.getElementById("allIn");
//jackpot stuff
const jackpot = document.getElementById("jackpot");
const slotScreen = document.getElementById("slotScreen");
const playaPlaya = document.getElementById("playaPlaya");
//audio
const slotSong = document.getElementById("slotSong");
const jorkportSong = document.getElementById("jorkport");
const winSong = document.getElementById("winny");
slotSong.volume = 0.3;
jorkportSong.volume = 0.3;
winSong.volume = 0.3;

//array of three slot screen elements
let slotIcons = Array.from(document.querySelectorAll(".slotIcon"));
//do I need this LOL
let randomIndeces = Array(3)
  .fill(5)
  .map((x) => (x = Math.floor(Math.random() * x)));
console.log(randomIndeces);
//this sets the emoji randomly... idk
slotIcons.forEach((e, i) => (e.innerText = icons[randomIndeces[i]]));

//event listeners
bet.addEventListener("click", modifyBetAmount);
spin.addEventListener("click", animateMate);
//main func
function animateMate() {
  if (Number(currentCash.innerText) - Number(betAmount.innerText) >= 0) {
    //play a song
    slotSong.play();
    //set win amount to 0
    winAmount.innerText = "0";
    //disable the event listener
    spin.removeEventListener("click", animateMate);
    //subtract the bet from the cashhhhh
    currentCash.innerText =
      Number(currentCash.innerText) - Number(betAmount.innerText);
    //spin left reel
    spinThatReel(slotIcons[0], 30 - Math.floor(Math.random() * 5));
    //wait half a second and spin the middle reel
    setTimeout(() => {
      spinThatReel(slotIcons[1], 36 - Math.floor(Math.random() * 5));
    }, 500);
    //wait a second and spin the right wheel
    setTimeout(() => {
      spinThatReel(slotIcons[2], 41 - Math.floor(Math.random() * 5));
    }, 1000);

    //win conditions
    //wait 5 seconds (animation length)
    setTimeout(() => {
      //three money bags? naturally 300*betAmount
      if (
        slotIcons[0].innerText === "💰" &&
        slotIcons[1].innerText === "💰" &&
        slotIcons[2].innerText === "💰"
      ) {
        winAmount.innerText = Number(betAmount.innerText) * 300;
        currentCash.innerText =
          Number(currentCash.innerText) + Number(winAmount.innerText);
        jackpot.animate(jackFrames, jackTime);
        slotScreen.animate(screenJackFrames, jackTime);
        playaPlaya.animate(screenJackFrames, jackTime);
        jorkportSong.play();
        setTimeout(() => {
          jorkportSong.pause();
          jorkportSong.currentTime = 0;
        }, 5250);
      } else if (
        //three of a kind = 200* betAmount
        slotIcons[0].innerText === slotIcons[1].innerText &&
        slotIcons[0].innerText === slotIcons[2].innerText
      ) {
        winAmount.innerText = Number(betAmount.innerText) * 200;
        currentCash.innerText =
          Number(currentCash.innerText) + Number(winAmount.innerText);
        jackpot.animate(jackFrames, jackTime);
        slotScreen.animate(screenJackFrames, jackTime);
        playaPlaya.animate(screenJackFrames, jackTime);
        jorkportSong.play();
        setTimeout(() => {
          jorkportSong.pause();
          jorkportSong.currentTime = 0;
        }, 5250);
        //two of a kind in the first two reels? 3 * betAmount
      } else if (slotIcons[0].innerText === slotIcons[1].innerText) {
        winAmount.innerText = Number(betAmount.innerText) * 3;
        currentCash.innerText =
          Number(currentCash.innerText) + Number(winAmount.innerText);
        winSong.play();
        setTimeout(() => {
          winSong.pause();
          winSong.currentTime = 0;
        }, 5250);
        //somthing in the middle with two money bags???? 50 * betAmount
      } else if (
        slotIcons[0].innerText === "💰" &&
        slotIcons[2].innerText === "💰"
      ) {
        winAmount.innerText = Number(betAmount.innerText) * 50;
        currentCash.innerText =
          Number(currentCash.innerText) + Number(winAmount.innerText);
        winSong.play();
        setTimeout(() => {
          winSong.pause();
          winSong.currentTime = 0;
        }, 5250);
        //something in the middle with two of the same something on either side? 3 * betAmount
      } else if (
        slotIcons[0].innerText === slotIcons[2].innerText &&
        slotIcons[0].innerText !== slotIcons[1].innerText
      ) {
        winAmount.innerText = Number(betAmount.innerText) * 3;
        currentCash.innerText =
          Number(currentCash.innerText) + Number(winAmount.innerText);
        winSong.play();
        setTimeout(() => {
          winSong.pause();
          winSong.currentTime = 0;
        }, 5250);
      }
      //add event listener again
      spin.addEventListener("click", animateMate);
      //pause and reset audio
      slotSong.pause();
      slotSong.currentTime = 0;
    }, 5200);
    //if you have not enough monies then computer will tells you
  } else {
    alert("you do not have enough monies");
  }
}

//change the bet amount
function modifyBetAmount(e) {
  if (e.target === betAdd) {
    if (Number(betAmount.innerText) + 1 <= Number(currentCash.innerText)) {
      betAmount.innerText = Number(betAmount.innerText) + 1;
    } else {
      alert("you do not have enough monies");
    }
  } else if (e.target === betSub) {
    if (Number(betAmount.innerText) > 0) {
      betAmount.innerText = Number(betAmount.innerText) - 1;
    }
  } else if (e.target === addFive) {
    if (Number(betAmount.innerText) + 5 <= Number(currentCash.innerText)) {
      betAmount.innerText = Number(betAmount.innerText) + 5;
    } else {
      alert("you do not have enough monies");
    }
  } else if (e.target === addTen) {
    if (Number(betAmount.innerText) + 10 <= Number(currentCash.innerText)) {
      betAmount.innerText = Number(betAmount.innerText) + 10;
    } else {
      alert("you do not have enough monies");
    }
  } else if (e.target === addHund) {
    if (Number(betAmount.innerText) + 100 <= Number(currentCash.innerText)) {
      betAmount.innerText = Number(betAmount.innerText) + 100;
    } else {
      alert("you do not have enough monies");
    }
  } else if (e.target === allIn) {
    betAmount.innerText = Number(currentCash.innerText);
  }
}

//aniStuff
//for the 'spin'
const normalFrames = [{ top: "-50%" }, { top: "80%" }];

let normalTime = {
  duration: 55,
  iterations: 1,
  fill: "both",
};
//for tha first one
const slowFrames = [{ top: "0%" }, { top: "100%" }];
const slowTime = {
  duration: 750,
  iterations: 1,
  fill: "both",
};
//for tha last one
const endFrames = [{ top: "-100%" }, { top: "0%" }];
const endTime = {
  duration: 750,
  iterations: 1,
  fill: "both",
};
//spin it to win it, baby!
function spinThatReel(e, spins) {
  //interval counter
  let intervalCount = 0;
  //do an animate
  e.animate(slowFrames, slowTime);
  //do many animate
  const changeTheBaby = setInterval(() => {
    e.animate(normalFrames, normalTime);
    //increase interval count
    intervalCount++;
    //set a counter to index of current emojijiji
    let counter = icons.indexOf(e.innerHTML);
    //increase by one
    counter++;
    //unless
    if (counter >= 5) {
      //then make it zeroooooo
      counter = 0;
    }
    //the emoji now is chillin
    e.innerHTML = icons[counter];
    //if it spun too many times
    if (intervalCount > spins) {
      //do one more animate
      e.animate(endFrames, endTime);
      //and change the baby
      clearInterval(changeTheBaby);
    }
  }, 80);
}

//jackpot box shadow animation
const screenJackFrames = [
  { boxShadow: "0 0 10px 10px rgb(255, 255, 0)" },
  { boxShadow: "0 0 0 0 black" },
];
const jackFrames = [
  {
    border: "8px ridge rgb(255, 255, 0)",
    color: "rgb(251, 251, 0)",
    boxShadow: "0 0 10px 10px rgb(255, 255, 0)",
    textShadow: "0px 0px 20px rgb(255, 255, 0)",
  },
  {
    border: "8px ridge rgb(128, 128, 50)",
    color: "rgb(138, 138, 100)",
    boxShadow: "0 0 0 0 black",
    textShadow: "0px 0px 0px black",
  },
];
const jackTime = {
  duration: 1000,
  iterations: 5,
  fill: "both",
};
