const audioContext = new (window.AudioContext || window.webkitAudioContext)()

// Game Variables

let turnCounter = 0

let timerOnStart = 5

let unmuteTimer = 03

let frequencies = {
  C3: 130.813,
  Cs3: 138.591,
  D3: 146.832,
  Ds3: 155.563,
  E3: 164.814,
  F3: 174.614,
  Fs3: 184.997,
  G3: 195.998,
  Gs3: 207.652,
  A3: 220,
  As3: 233.082,
  B3: 246.942,
  C4: 261.626,
  Cs4: 277.183,
  D4: 293.665,
  Ds4: 311.127,
  E4: 329.628,
  F4: 349.228,
  Fs4: 369.994,
  G4: 391.995,
  Gs4: 415.305,
  A4: 440,
  As4: 466.164,
  B4: 493.883
}

let octaveOne = [
  130.813, 138.591, 146.832, 155.563, 164.814, 174.614, 184.997, 195.998,
  207.652, 220, 233.082, 246.942
]

let octaveTwo = [
  261.626, 277.183, 293.665, 311.127, 329.628, 349.228, 369.994, 391.995,
  415.305, 440, 466.164, 493.883
]

let bothOctaves = [...octaveOne, ...octaveTwo]

const pitch = Object.keys(frequencies)
const freq = Object.values(frequencies)

let buttons = document.querySelectorAll('button')

const scoreBoard = document.querySelector('h1')

const section = document.querySelector('section')

const level = document.querySelector('h2')

const timer = document.querySelector('.timer')

const firstOctave = document.querySelectorAll('.first-octave')

const secondOctave = document.querySelectorAll('.second-octave')

timer.innerHTML = `Press Start`

level.innerHTML = 'LEVEL 1'

// Picks at random a frequency from the object
let pitchGenerator = () => {
  let randomPitch = freq[Math.floor(Math.random() * freq.length)]
  return randomPitch
}

// Selects random value from object
let answer = pitchGenerator()
// let answer = 174.614

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
        timer.innerHTML = `:${timerOnStart}`
        gain.gain.value = 0.03
        console.log('Here is the first freq')
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
  for (let i = 0; i < buttons.length; i++) {
    secondOctave[i].style.opacity = 0
  }
}

const hideFirstOctave = () => {
  for (let i = 0; i < buttons.length; i++) {
    firstOctave[i].style.opacity = 0
  }
}
const showSecondOctave = () => {
  for (let i = 0; i < buttons.length; i++) {
    secondOctave[i].style.opacity = 1
  }
}

const showFirstOctave = () => {
  for (let i = 0; i < buttons.length; i++) {
    firstOctave[i].style.opacity = 1
  }
}

let updateAnswer = () => {
  answer = pitchGenerator()
  console.log(`NEW ANSWER:${answer}`) //logs new answer

  oscFreq.setValueAtTime(answer, audioContext.currentTime)
}

let buttonClicks = () => {
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', () => {
      let buttonFreq = Number(buttons[i].getAttribute('data-value'))
      console.log(buttonFreq)
      if (buttonFreq == answer) {
        console.log('YOU ARE CORRECT')
        updateAnswer()
      }
    })
  }
}

let playGame = () => {
  buttonClicks()
}

playGame()
