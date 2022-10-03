const audioContext = new (window.AudioContext || window.webkitAudioContext)()

// Game variables
const frequencies = [250, 440, 500, 1000, 2000]
let randomNumber = Math.floor(Math.random() * frequencies.length)

console.log(randomNumber)

const button = document.querySelectorAll('button')

const question = document.querySelector('h1')

const answer = frequencies[randomNumber]
console.log(answer)

// Oscillator
let osc = audioContext.createOscillator()

osc.connect(audioContext.destination)

// Sets OSC to start and stop after duration
// osc.start()

// setTimeout(() => {
//   osc.stop()
// }, 2000)

// Play/Pause buttons -- Currently WORKS but only lets you start and stop ONCE
const play = document.querySelector('#play')
const pause = document.querySelector('#pause')

play.addEventListener('click', () => {
  console.log('Play')
  osc.start()
})

pause.addEventListener('click', () => {
  console.log('Pause')
  osc.stop()
})

// Displays the frequencys from the array of frequencies on the buttons
for (let i = 0; i < button.length; i++) {
  button[i].innerHTML = `${frequencies[i]}Hz`
}

// Loops through the buttons and looks at the innerHTML
for (let i = 0; i < button.length; i++)
  button[i].addEventListener('click', () => {
    if (button[i].innerHTML == `${answer}Hz`) {
      console.log('YOU ARE CORRECT')
    } else {
      console.log(button[i].innerHTML)
    }
  })
