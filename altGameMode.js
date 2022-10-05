const audioContext = new (window.AudioContext || window.webkitAudioContext)()

// Game Variables

let score = 0
let turnCounter = 0

let potentialScore = 100

let frequencies = {
  C3: 130.813,
  Cs: 138.591,
  D3: 146.832,
  Ds: 155.563,
  E3: 164.814,
  F3: 174.614,
  Fs: 184.997,
  G3: 195.998,
  Gs: 207.652,
  A3: 220,
  As: 233.082,
  B3: 246.942,
  C4: 261.626,
  Cs: 277.183,
  D4: 293.665,
  Ds: 311.127,
  E4: 329.628,
  F4: 349.228,
  Fs: 369.994,
  G4: 391.995,
  Gs: 415.305,
  A4: 440,
  As: 466.164,
  B4: 493.883
}

let numGenerator = () => {
  let randomNumber = Math.floor(Math.random() * Object.keys(frequencies).length)
  return randomNumber
}
numGenerator()

// console.log(Object.keys(frequencies).length)
