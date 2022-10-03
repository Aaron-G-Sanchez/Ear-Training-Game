const AudioContext = window.AudioContext || window.webkitAudioContext

const audioContext = new AudioContext()

// Game variables

const frequencies = [250, 440, 500, 1000, 2000]

const button = document.querySelectorAll('button')

const question = document.querySelector('h1')

const answer = '1000Hz'

// play pause buttons
const play = document.querySelector('#play')
const pause = document.querySelector('#pause')

play.addEventListener('click', () => {
  console.log('Play')
})

pause.addEventListener('click', () => {
  console.log('Pause')
})

// Displays the frequencys from the array of frequencies on the buttons
for (let i = 0; i < button.length; i++) {
  button[i].innerHTML = `${frequencies[i]}Hz`
}

// Loops through the buttons and looks at the innerHTML
for (let i = 0; i < button.length; i++)
  button[i].addEventListener('click', () => {
    if (button[i].innerHTML == answer) {
      console.log('YOU ARE CORRECT')
    } else {
      console.log(button[i].innerHTML)
    }
  })
