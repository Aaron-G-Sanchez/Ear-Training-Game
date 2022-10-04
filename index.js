const audioContext = new (window.AudioContext || window.webkitAudioContext)()

// Game variables

let score = 0

let potentialScore = 100

const frequencies = [250, 440, 500, 1000, 2000]
let randomNumber = Math.floor(Math.random() * frequencies.length)

const button = document.querySelectorAll('button')

const question = document.querySelector('h1')

let answer = frequencies[randomNumber]
console.log(answer)

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
// Displays the frequencys from the array of frequencies on the buttons
for (let i = 0; i < button.length; i++) {
  button[i].innerHTML = `${frequencies[i]}Hz`
}

// Loops through the buttons and looks at the innerHTML
for (let i = 0; i < button.length; i++)
  button[i].addEventListener('click', () => {
    if (button[i].innerHTML == `${answer}Hz`) {
      console.log('YOU ARE CORRECT')
      score += potentialScore
      console.log(score)
    } else {
      console.log(button[i].innerHTML)
      potentialScore -= 10
      console.log(potentialScore)
    }
  })
