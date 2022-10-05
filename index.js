const audioContext = new (window.AudioContext || window.webkitAudioContext)()

// Game variables

let score = 0
let turnCounter = 0

let potentialScore = 100

let frequencies = [250, 440, 500, 1000, 2000]

let numGenerator = () => {
  let randomNumber = Math.floor(Math.random() * frequencies.length)
  return randomNumber
}
numGenerator()

let answer = frequencies[numGenerator()]
console.log(answer)

let buttons = document.querySelectorAll('button')

const scoreBoard = document.querySelector('h1')

const section = document.querySelector('section')

const level = document.querySelector('h2')

level.innerHTML = 'LEVEL 1'

// Oscillator and gain node
let osc = audioContext.createOscillator()
let gain = audioContext.createGain()

osc.connect(gain)
gain.connect(audioContext.destination)
osc.start()
gain.gain.value = 0

// Sets frequency based off a random index from the frequency array
let oscFreq = osc.frequency
oscFreq.setValueAtTime(answer, audioContext.currentTime)

// Play/Pause/Volume buttons -- Currently WORKS but only lets you start and stop ONCE
// Sets OSC to start and stop after duration
// osc.start()

// setTimeout(() => {
//   osc.stop()
// }, 2000)

const play = document.querySelector('#play')
const mute = document.querySelector('#pause')

play.addEventListener('click', () => {
  gain.gain.value = 0.03
})

mute.addEventListener('click', () => {
  gain.gain.value = 0
})

// Game play functions
// Updates the answer as well as the OSC frequncy when answer is correctly guessed
let updateAnswer = () => {
  numGenerator()
  potentialScore = 100
  answer = frequencies[numGenerator()]
  console.log(`NEW ANSWER:${answer}`) //logs new answer

  oscFreq.setValueAtTime(answer, audioContext.currentTime)
}

// Levels up game
// creates one div and add one freq to the array
let levelTwo = () => {
  potentialScore = 100
  level.innerHTML = 'LEVEL 2'
  frequencies.push(4000)
  const freqPush = document.createElement('button')
  section.appendChild(freqPush)
  buttons = document.querySelectorAll('button')

  buttonClicks()
}

// Creates two divs and adds two freqs to the array
let levelThree = () => {
  level.innerHTML = 'LEVEL 3'
  frequencies.push(6000)
  frequencies.unshift(100)
  const freqPushTwo = document.createElement('button')
  const freqUnshift = document.createElement('button')
  section.appendChild(freqPushTwo)
  section.prepend(freqUnshift)
  buttons = document.querySelectorAll('button')

  buttonClicks()
}

// Creates new div and adds one new freq in the middle of the array
let levelFour = () => {
  level.innerHTML = 'LEVEL 4'
  frequencies.splice(5, 0, 1500)
  const freqSplice = document.createElement('button')
  section.appendChild(freqSplice)
  buttons = document.querySelectorAll('button')

  buttonClicks()
}

// Creates new div and adds one new frq in the middle of the array
let levelFive = () => {
  level.innerHTML = 'LEVEL 5'
  frequencies.splice(7, 0, 3000)
  const freqSpliceTwo = document.createElement('button')
  section.appendChild(freqSpliceTwo)
  buttons = document.querySelectorAll('button')

  buttonClicks()
}

// Logic for the button clicks
let buttonClicks = () => {
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].innerHTML = `${frequencies[i]}Hz`
  }

  // Loops through the buttons and looks at the innerHTML
  for (let i = 0; i < buttons.length; i++)
    // Displays the frequencys from the array of frequencies on the buttons
    buttons[i].addEventListener('click', () => {
      if (buttons[i].innerHTML == `${answer}Hz`) {
        console.log('YOU ARE CORRECT')
        // score += potentialScore
        turnCounter++
        updateAnswer()

        // Changes score and mutes the OSC
        // gain.gain.value = 0
        scoreBoard.innerHTML = turnCounter
        if (turnCounter === 5) {
          levelTwo()
        } else if (turnCounter === 12) {
          levelThree()
        } else if (turnCounter === 20) {
          levelFour()
        } else if (turnCounter === 30) {
          levelFive()
        }
      } else {
        // Decrements potential score every guess
        console.log('Try Again')
        // potentialScore -= 10
        // console.log(potentialScore)
        // scoreBoard.innerHTML = score
        // if (potentialScore <= 50) {
        //   updateAnswer()
        // }
      }
    })
}
let playGame = () => {
  buttonClicks()
}

playGame()
