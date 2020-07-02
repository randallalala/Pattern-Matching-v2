// //----------------------------------------------------- NAME OF PLAYER  -----------------------------------------------

// function getPlayerName() {

//     let body = document.querySelector("body");
//     let player = document.createElement('p');
//     player.id = "player";
//     playerName = prompt('Enter your name');
//     body.appendChild(player);
//     document.getElementById('player').innerHTML = "Hello " + playerName;

//     if (playerName == null) { // if no name entered, show stranger
//         document.getElementById("player").innerHTML = "Hello Stranger";
//     }
// }
// getPlayerName();



// //---------------------------------------------------  TIMER  ------------------------------------------------------------

// function timer() {
//     let timeleft = patternTimerRef; 
//     downloadTimer = setInterval(function () { //trigger every 1s
//         if (timeleft <= 0) { // keep running if more than 0s
//             document.getElementById("countdown").innerHTML = "Time's Up! you have lost the game..";
//             if (timeleft == 0) { // if timer 0s
//                 document.getElementById("progressBar").value = 0; // clear prog bar
//                 msg.innerHTML = ""; // reset back to empty
//                 gameState = false; 
//                 reset();
//             }
//         } else { //keep running words and progbar if havent reached 0s
//             document.getElementById("countdown").innerHTML = timeleft + " seconds remaining";
//             document.getElementById("progressBar").value = patternTimerRef - timeleft;
//         }
//         timeleft -= 1;
//     }, 1000);
// }





//---------------------------------------------- GLOBAL VARIABLES ----------------------------------------------
let audio = new Audio('homer_scream.mp3');
audio.volume = 0.2;
let levelsCompleted = 0;
let movesCounter = 0;
// let downloadTimer = null;
// let patternTimerRef = null;
let globalIndex = 0;
// console.log(patternTimerRef);
let msg = document.createElement('p');
let body = document.querySelector("body");
msg.id = "msg";
body.appendChild(msg);
let gameState = false;
// let difficulty = document.getElementById("difficulty");

let startCubesDiv = 2;
let gameCubes = startCubesDiv*startCubesDiv;

let gameLevel = 1;
let randomPattern = [];
let playerPattern = [];
let globalI = null


//------------------------------------------------- START BUTTON / PLAYER PATTERN ---------------------------------

document.getElementById("startBtn").addEventListener('click', function () {
    gameState = true;

    if (gameState = true) {
        generatePattern();
        movesCounter = 1;
        this.style.display = 'none' // hide start button

    }
})

// ---------------------------------------------- RANDOM PATTERN LOOP  --------------------------------------------

function generatePattern() {

    for (let i = randomPattern.length; i <= gameLevel; i++) {

        let random = Math.floor(Math.random() * gameCubes);
        randomPattern.push(random);
        // patternTimerRef = i + 4; // num of seconds in timer + 4sec 
        // document.getElementById("progressBar").max = patternTimerRef;

    }
    // console.log(patternTimerRef);
    level(); //level counter
    moves(); // moves counter
    blinker(); // sound and flash for button
    // clearInterval(downloadTimer); // clear timer interval 
    // timer(); //
    // console.log(gameState);
    console.log("randomPattern " + randomPattern);
}

// --------------------------------------------------------------------------------------------

// let cubePreVar = 3
// let cubeVar = 3
// let rowPlus = 3 //grid style row and col
// let colPlus = 3
// let duoWin = 0 //global var
// let duoWinColPlus = 3
// let duoWinRowPlus = 3

// duoWin ++ // reset duoWin
// duoWinRowPlus ++ //reset both
// duoWinColPlus ++ 
// function complicatedLoop() {
//     if (duoWin == 2) {
//         duoWinRowPlus++
//     }

//     function rowPlus() {
//         // refresh gameCubes
//     }

//     if (duoWin == 4) {
//         duoWinColPlus++
//     }

//     function colPlus() {
//         // refresh gameCubes
//     }
// }

// ---------------------------------------------------------------------------
let grid = document.querySelector(".grid");

function gridSet() {
    grid.style.setProperty('grid-template-columns', 'repeat(' + startCubesDiv + ', auto)')
    grid.style.setProperty('grid-template-rows', 'repeat(' + startCubesDiv + ', auto)')
}
gridSet()

// function cubeUp() {
//     for (let i = 0; i < cubePreVar; i++) {
//         if (i == 3) {
//             gameLevel++
//             cubeUp2()
//         }
//     }
// }

// function cubeUp2() {
//     for (let i = 0; i < cubeVar; i++) {
//         if (i == 3) {
//             gameLevel++
//         }
//     }
// }

/*  **Pseudo code**
    1. after winning two levels - add three(x) boxes below
       - win counter (var 1) to count 
       - for loop side ++ (var 2)  
       - change grid style row (var 3)
       - function bottom() + three boxes
    2. after winning two levels - add three(x) boxes to side
       - win counter (var 3)  to count 
       - for loop (var 2)  
       - change grid style col (var 4)
       - function side() + three boxes
    3. x++ 
       - 4boxes bottom
       - 4boxes side
    4. x++
*/


// -------------------------------------------RANDOM COLOR / USER INPUT FUNCTION -------------------------------------------------
function generateCube() {
    grid.innerHTML = ""
    for (let i = 0; i < gameCubes; i++) {
        let randomColor = Math.floor(Math.random() * 16777215).toString(16);
        //make i global 
        globalI = i
        //create cube div
        let cube = document.createElement('div');
        // assign id from cube0
        cube.id = i;
        // // console.log(cube.id);
        // ADD CUBES CLASS
        cube.classList.add("cubes")
        // MAKE CUBE CHILD OF GRID
        grid.appendChild(cube);
        // SET RANDOM COLOR TO NEW DIV
        document.getElementById(i).style.backgroundColor = `#${randomColor}`;
        // PUT I IN BOX
        // document.getElementById(i).innerHTML = i;
        document.getElementById(i).addEventListener("click", function () {
            // // console.log("cube" + i);
            // blink when user select square
            $(this).fadeOut(100).fadeIn(100);
            // push selection into array
            playerPattern.push(i);
            compare();
        })
    }
}
generateCube()

// --------------------------------------- COMPARE -----------------------------------------------------

function compare() {
    let globalIndex = playerPattern.length - 1
    if (randomPattern[globalIndex] == playerPattern[globalIndex]) {
        // console.log(globalIndex + '-Index correct');
        // console.log(playerPattern[globalIndex] + "-playerPattern correct");
        // console.log(randomPattern[globalIndex] + "-randomPattern correct");

        if (playerPattern.length == randomPattern.length) {
            globalIndex = 0;
            // console.log("deeeperr");
            if (JSON.stringify(randomPattern) == JSON.stringify(playerPattern)) {
                // console.log("Correct " + playerPattern);
                startCubesDiv ++ //var 
                levelsCompleted++; // levels counter
                gameLevel++
                // reset random pattern loop
                // randomPattern = []; 
                // reset playerpattern
                playerPattern = [];
                // if (difficulty.value == "normal") {
                //     gameLevel++; // add one more pattern to next sequence
                // } else if (difficulty.value == "extreme") {
                //     gameLevel += 3; //add 3 more patterns to next sequence
                // }
                gameCubes = startCubesDiv*startCubesDiv
                // win msg on screen
                gridSet()
                win();
                generateCube()

            }

        }
    } else {
        console.log("lose");
        gameState = false
        return lose(); // lose msg on screen
        // console.log(globalIndex + "-Index wrong");
        // console.log(playerPattern[globalIndex] + "-playerPattern wrong");
        // console.log(randomPattern[globalIndex] + "-randomPattern wrong");
    }
}

// -------------------------------------------------- SHOW RESET BUTTON / RELOAD ON CLICK  --------------------------------

function reset() {
    playerPattern = [];
    randomPattern = [];
    resetBtn();
    document.getElementById("resetBtn").addEventListener("click", function () {
        location.reload();
    })
}

//--------------------------------------------------- RESET BUTTON  ----------------------------------------------

function resetBtn() {
    let resetBtn = document.createElement('button');
    resetBtn.id = "resetBtn";
    resetBtn.classList.add("btn btn-secondary btn-lg");
    body.appendChild(resetBtn);
    document.getElementById('resetBtn').innerHTML = "Reset Game";
}

//--------------------------------------------------- COLOR SQUARES BLINKER+SOUND  ---------------------------------

function blinker() {

    for (let i = 1; i < randomPattern.length + 1; i++) {
        setTimeout(function () { // delay for flash
            $("#" + randomPattern[i - 1]).fadeOut(200).fadeIn(200);
            document.getElementById("sound").play();
        }, i * 900); // each flash 900ms apart 
    }
}

//--------------------------------------------------- WIN LOSE TIMEUP NOTIFICATION  ---------------------------------


function lose() {
    msg.innerHTML = "Incorrect, you have lost the game..";
    // clearInterval(downloadTimer);
    // document.getElementById("progressBar").value = 0;
    // document.getElementById("countdown").innerHTML = "";
    reset();
    gameState = false;

}

function win() {
    msg.innerHTML = "Correct! Next round will have an additional sequence added";
    generatePattern();

}

// //---------------------------------------------------- LEVELS COMPLETED  -----------------------------------------------

function level() {  // level counter

    let body = document.querySelector("body");
    let levelIndicator = document.createElement('p');
    levelIndicator.id = "levels";
    body.appendChild(levelIndicator);
    document.getElementById('levels').innerHTML = "Levels Completed: " + levelsCompleted;

}

// //----------------------------------------------------- # OF MOVES  -----------------------------------------------------

function moves() {   // moves/click counter

    let body = document.querySelector("body");
    let moves = document.createElement('p');
    moves.id = "moves";
    body.appendChild(moves);
    document.getElementById('moves').innerHTML = "Total Moves Made: " + movesCounter;
}
