console.log('BING CHILLING')

const frequencies = [250, 440, 500, 1000, 2000]

const button = document.querySelectorAll('button')

const question = document.querySelector('h1')

const answer = 1000

// Come back to -- basic quiz logic
// const quizFunction = () => {
//   if (button[i].innerHTML == answer) {
//     console.log('You are right')
//   }
// }

// Displays the frequencys from the array of frequencies on the buttons
for (let i = 0; i < button.length; i++) {
  button[i].innerHTML = `${frequencies[i]} Hz`
}

for (let i = 0; i < button.length; i++)
  button[i].addEventListener('click', () => {
    console.log(button[i].innerHTML)
  })
