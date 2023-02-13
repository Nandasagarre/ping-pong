// updatemaxscore();
let winner = "";
// window.localStorage.setItem('maxscore', 0);
// window.localStorage.removeItem('wonby');
// by default ball statrts from player
let palyer2Lost = window.localStorage.getItem("palyer2Lost");
let balltemp = 6; // variable that holdes x direction of ball
let xdir = -1;
let ydir = -1;

// loded for first time make max score 0;

// if (performance.navigation.type != 1) {
//            let firsttime_max = document.getElementById('max');
//            firsttime_max.innerText='0';
//            localStorage.clear();
//        }

// let gameState = 'start';
let isStart = 0;
let stop = 0;
let s1 = document.querySelector(".s1");
let s1_cordinates = s1.getBoundingClientRect();
let s2 = document.querySelector(".s2");
let s2_cordinates = s2.getBoundingClientRect();
let board = document.querySelector(".board");
let board_coord = board.getBoundingClientRect();
let temp = 50; // for strides

let ballytemp = 50;
let ball = document.querySelector(".ball");
let ball_cordinates = ball.getBoundingClientRect();

let p1 = document.getElementById("p1");
let p2 = document.getElementById("p2");
let p1score = 0;
let p2score = 0;

//check if player 2 lost before and start ball from player 2
if (typeof palyer2Lost != "undefined") {
  console.log("checked", palyer2Lost);
  //if payer 2 lost in last game then player 2 gets serve the ball;
  if (palyer2Lost == 1) {
    ball.style.top = "70%";
    ball_cordinates = ball.getBoundingClientRect();
    balltemp = 70;
    xdir = 1;
    ydir = 1;
  }
}

document.addEventListener("keydown", (e) => {
  //if y pressed by user
  if (e.code == "KeyY") {
    location.reload(true);
  }

  if (e.code == "Enter") {
    // checking if page loaded for first time
    if (performance.navigation.type == 1) {
      alert(
        "max score " +
          localStorage.getItem("maxscore") +
          " by " +
          localStorage.getItem("wonby") +
          " click enter to continue"
      );
      let updatedscore = document.getElementById("max");
      updatemaxscore.innerText =
        localStorage.getItem("maxscore") +
        " by " +
        localStorage.getItem("wonby");
    } else {
      localStorage.clear();
      alert("click Enter to start - firsttime!!");
      // let firsttime_maxscore = document.getElementById('max');
      // firsttime_maxscore.innerText='0';
    }

    isStart = 1;

    if (stop == 0) {
      requestAnimationFrame(() => {
        moveBall();
      });
    }
  }

  if (isStart == 1) {
    if (e.code == "KeyD") {
      console.log(s1_cordinates.x, board_coord.right);
      if (temp >= 85) {
        s1.style.left = board_coord.left;
      } else {
        console.log(temp);
        temp = temp + 5;
        s1.style.left = temp + "%";
        s2.style.left = temp + "%";
      }

      s1_cordinates = s1.getBoundingClientRect();
      s2_cordinates = s2.getBoundingClientRect();
    }

    if (e.code == "KeyA") {
      if (temp <= 0) {
        s1.style.right = board_coord.right;
      } else {
        console.log(temp);
        temp = temp - 5;
        s1.style.left = temp + "%";
        s2.style.left = temp + "%";
      }

      s1_cordinates = s1.getBoundingClientRect();
      s2_cordinates = s2.getBoundingClientRect();
    }
  }
});

function moveBall() {
  console.log(balltemp);
  ball.style.top = balltemp + "%";
  ball.style.left = ballytemp + "%";
  if (
    ball_cordinates.top <= s1_cordinates.bottom &&
    ball_cordinates.left >= s1_cordinates.left &&
    ball_cordinates.right <= s1_cordinates.right
  ) {
    xdir = -1;
    p1score = p1score + 1;
    p1.innerText = p1score;
  }

  if (
    ball_cordinates.bottom >= s2_cordinates.top &&
    ball_cordinates.left >= s2_cordinates.left &&
    ball_cordinates.right <= s2_cordinates.right
  ) {
    xdir = 1;
    p2score = p2score + 1;
    p2.innerText = p2score;
  }

  if (ball_cordinates.left <= board_coord.left) {
    ydir = -1;
  }

  if (ball_cordinates.right >= board_coord.right) {
    ydir = 1;
  }

  ballytemp = ballytemp - 0.5 * ydir;
  balltemp = balltemp - 0.5 * xdir;
  ball_cordinates = ball.getBoundingClientRect();

  if (ball_cordinates.top < board_coord.top) {
    alert("player2 won with" + p2score);
    window.localStorage.setItem("palyer2Lost", 0);
    // window.localStorage.setItem('wonby', 'player2');
    winner = "p2";
    let maxplayer = Math.max(p1score, p2score);
    let max = Math.max(window.localStorage.getItem("maxscore"), maxplayer);
    window.localStorage.setItem("maxscore", max);
    reset();
  } else if (ball_cordinates.bottom > board_coord.bottom) {
    alert("player1 won with" + p1score);
    window.localStorage.setItem("palyer2Lost", 1);
    // window.localStorage.setItem('wonby', 'player1');

    let maxplayer = Math.max(p1score, p2score);
    let max = Math.max(window.localStorage.getItem("maxscore"), maxplayer);
    window.localStorage.setItem("maxscore", max);
    reset();
  } else {
    requestAnimationFrame(() => {
      moveBall();
    });
  }
}

function reset() {
  updatemaxscore();
  location.reload();
}

function updatemaxscore() {
  if (p1score > p2score) {
    if (p1 > localStorage.getItem("maxscore")) {
      window.localStorage.setItem("wonby", "player1");
    }
  } else {
    if (p2 > localStorage.getItem("maxscore")) {
      window.localStorage.setItem("wonby", "player2");
    }
  }
}
