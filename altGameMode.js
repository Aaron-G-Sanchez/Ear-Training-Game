const audioContext = new (window.AudioContext || window.webkitAudioContext)()

// Game Variables

let score = 0
let turnCounter = 0

let potentialScore = 100

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

const pitch = Object.keys(frequencies)
const freq = Object.values(frequencies)

let pitchGenerator = () => {
  let randomPitch = freq[Math.floor(Math.random() * freq.length)]
  return randomPitch
}

pitchGenerator()

// let numGenerator = () => {
//   let randomNumber = Math.floor(Math.random() * Object.keys(frequencies).length)
//   return randomNumber
// }
// numGenerator()

// let answer = frequencies

// // Oscillator and gain node
// let osc = audioContext.createOscillator()
// let gain = audioContext.createGain()

// osc.connect(gain)
// gain.connect(audioContext.destination)
// osc.start()
// gain.gain.value = 0

// // Sets frequency based off a random index from the frequency array
// let oscFreq = osc.frequency
// oscFreq.setValueAtTime(answer, audioContext.currentTime)

// for in loop to iterate throuhg object
// for (const property in frequencies) {
//   console.log(`${property}: ${frequencies[property]}`)
// }
