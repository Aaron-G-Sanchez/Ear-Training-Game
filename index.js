console.log('BING CHILLING')

const frequencies = [250, 440, 500, 1000, 2000]

const button = document.querySelectorAll('button')

const testHTML = document.querySelector('h1')

testHTML.innerHTML = 'BING CHILLING'

for (let i = 0; i < button.length; i++) {
  button[i].innerHTML = frequencies[i]
}
