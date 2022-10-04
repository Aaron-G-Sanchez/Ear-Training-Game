const audioContext = new (window.AudioContext || window.webkitAudioContext)()

// Game variables

let score = 0

let potentialScore = 100

const frequencies = [250, 440, 500, 1000, 2000]

let numGenerator = () => {
  let randomNumber = Math.floor(Math.random() * frequencies.length)
  return randomNumber
}
numGenerator()

let answer = frequencies[numGenerator()]
console.log(answer)

const button = document.querySelectorAll('button')

const question = document.querySelector('h1')

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
// When an answer is correct, this function is called and updates the answer as well as the OSC frequncy
let updateAnswer = () => {
  numGenerator()
  answer = frequencies[numGenerator()]
  console.log(answer)

  oscFreq.setValueAtTime(answer, audioContext.currentTime)
}

let playGame = () => {
  // Displays the frequencys from the array of frequencies on the buttons
  for (let i = 0; i < button.length; i++) {
    button[i].innerHTML = `${frequencies[i]}Hz`
  }

  // Loops through the buttons and looks at the innerHTML
  for (let i = 0; i < button.length; i++)
    button[i].addEventListener('click', () => {
      if (button[i].innerHTML == `${answer}Hz`) {
        console.log('YOU ARE CORRECT')
        updateAnswer()

        // Changes score and mutes the OSC AND changes the frequency of the osc
        score += potentialScore
        // gain.gain.value = 0
        question.innerHTML = score
      } else {
        console.log(button[i].innerHTML)

        // Decrements potential score every guess
        potentialScore -= 10
        question.innerHTML = score
      }
    })
}

playGame()
