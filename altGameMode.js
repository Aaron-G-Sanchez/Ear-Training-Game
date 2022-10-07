const audioContext = new (window.AudioContext || window.webkitAudioContext)()

// Game Variables

let turnCounter = 0

let timerOnStart = 6

let unmuteTimer = 03

let octaveOne = [
  130.813, 138.591, 146.832, 155.563, 164.814, 174.614, 184.997, 195.998,
  207.652, 220, 233.082, 246.942
]

let octaveTwo = [
  261.626, 277.183, 293.665, 311.127, 329.628, 349.228, 369.994, 391.995,
  415.305, 440, 466.164, 493.883
]

let bothOctaves = [...octaveOne, ...octaveTwo]

// let bothOctaves = [
//   130.813, 138.591, 146.832, 155.563, 164.814, 174.614, 184.997, 195.998,
//   207.652, 220, 233.082, 246.942, 261.626, 277.183, 293.665, 311.127, 329.628,
//   349.228, 369.994, 391.995, 415.305, 440, 466.164, 493.883
// ]

let buttons = document.querySelectorAll('button')

const section = document.querySelector('section')

const level = document.querySelector('h2')

const timer = document.querySelector('.timer')

const firstOctave = document.querySelectorAll('.first-octave')

const secondOctave = document.querySelectorAll('.second-octave')

const header = document.querySelector('header')

timer.innerHTML = `Press Start`

level.innerHTML = 'LEVEL 1'

// Picks at random a frequency from the arrays
let octaveOneFreqGen = () => {
  let randomNumber = Math.floor(Math.random() * octaveOne.length)
  return randomNumber
}

let octaveTwoFreqGen = () => {
  let randomNumber = Math.floor(Math.random() * octaveTwo.length)
  return randomNumber
}

let bothOctaveFreqGen = () => {
  let randomNumber = Math.floor(Math.random() * bothOctaves.length)
  return randomNumber
}
// Selects random index from array
let answer = octaveOne[octaveOneFreqGen()]

// Audio mute
const unmute = () => {
  let unmuteInterval = setInterval(() => {
    unmuteTimer--
    if (unmuteTimer === 0) {
      clearInterval(unmuteInterval)
      gain.gain.value = 0.03
    }
  }, 1000)
}

// Oscillator and gain node
let osc = audioContext.createOscillator()
let gain = audioContext.createGain()

osc.connect(gain)
gain.connect(audioContext.destination)
osc.start()
gain.gain.value = 0.0

// Sets frequency based off a random index from the frequency array
let oscFreq = osc.frequency
oscFreq.setValueAtTime(answer, audioContext.currentTime)

// Play pause buttons
const start = document.querySelector('#start')
const play = document.querySelector('#play')
const mute = document.querySelector('#pause')

start.addEventListener(
  'click',
  () => {
    audioContext.resume()
    let countDownTimer = setInterval(() => {
      timerOnStart--
      timer.innerHTML = `:${timerOnStart}`
      if (timerOnStart === 0) {
        timerOnStart = 0
        timer.innerHTML = ``
        gain.gain.value = 0.03

        clearInterval(countDownTimer)
      }
    }, 1000)
  },
  { once: true }
)

play.addEventListener('click', () => {
  gain.gain.value = 0.03
  audioContext.resume()
})

mute.addEventListener('click', () => {
  gain.gain.value = 0
})

// Game Functions
const hideSecondOctave = () => {
  for (let i = 0; i < secondOctave.length; i++) {
    secondOctave[i].style.opacity = 0
  }
}

const hideFirstOctave = () => {
  for (let i = 0; i < firstOctave.length; i++) {
    firstOctave[i].style.opacity = 0
  }
}
const showSecondOctave = () => {
  for (let i = 0; i < secondOctave.length; i++) {
    secondOctave[i].style.opacity = 1
  }
}

const showFirstOctave = () => {
  for (let i = 0; i < firstOctave.length; i++) {
    firstOctave[i].style.opacity = 1
  }
}

// Sets up the game space and levels
hideSecondOctave()

const levelTwo = () => {
  level.innerHTML = 'LEVEL 2'

  updateAnswer()
}

const levelThree = () => {
  level.innerHTML = 'LEVEL 3'
  hideFirstOctave()
  showSecondOctave()

  levelThreeUpdateAnswer()
}

const levelFour = () => {
  level.innerHTML = 'LEVEL 4'

  levelThreeUpdateAnswer()
}

const levelFive = () => {
  level.innerHTML = 'LEVEL 5'
  showFirstOctave()

  levelFiveUpdateAnswer()
}
// Updates answer as well as OSC frequency
let updateAnswer = () => {
  octaveOneFreqGen()
  answer = octaveOne[octaveOneFreqGen()]

  oscFreq.setValueAtTime(answer, audioContext.currentTime)

  // After Delay plays audio again
  unmuteTimer = 03
  unmute()
}

let levelThreeUpdateAnswer = () => {
  octaveTwoFreqGen()
  answer = octaveTwo[octaveTwoFreqGen()]

  oscFreq.setValueAtTime(answer, audioContext.currentTime)

  // After delay plays audio again
  unmuteTimer = 03
  unmute()
}

let levelFiveUpdateAnswer = () => {
  bothOctaveFreqGen()
  answer = bothOctaves[bothOctaveFreqGen()]

  oscFreq.setValueAtTime(answer, audioContext.currentTime)

  // After delay plays audio again
  if (turnCounter < 39) {
    unmuteTimer = 03
    unmute()
  } else {
    gain.gain.value = 0
  }
}

let gameOver = () => {
  gain.gain.value = 0
  let overlay = document.createElement('div')
  overlay.setAttribute('class', 'game-over')
  overlay.innerHTML = `<p>THANKS <br/> FOR <br/> PLAYING</p><button id="reset">PLAY AGAIN?</button>`
  header.prepend(overlay)
  overlay.style.height = '100%'
  let resetGame = document.querySelector('#reset')
  resetGame.addEventListener('click', () => {
    location.reload()
  })
}

// Loops through the buttons looking for the correct answer
let buttonClicks = () => {
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', () => {
      let buttonFreq = Number(buttons[i].getAttribute('data-value'))

      if (buttonFreq == answer) {
        gain.gain.value = 0
        if (turnCounter <= 11) {
          updateAnswer()
        } else if (turnCounter >= 12 && turnCounter <= 25) {
          levelThreeUpdateAnswer()
        } else if (turnCounter >= 26) {
          levelFiveUpdateAnswer()
        }
        turnCounter++

        // Turn counter rules
        if (turnCounter === 6) {
          levelTwo()
        } else if (turnCounter === 12) {
          levelThree()
        } else if (turnCounter === 18) {
          levelFour()
        } else if (turnCounter === 25) {
          levelFive()
        } else if (turnCounter === 40) {
          gameOver()
        }
      }
    })
  }
}

let playGame = () => {
  buttonClicks()
}

playGame()
