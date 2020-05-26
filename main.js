

const quoteDisplayElement = document.getElementById("quoteDisplay") //Zadání
const quoteInputElement = document.getElementById("quoteInput") //User Input
const timerElement = document.getElementById("timer") //Timer
var wordsPerMinute = 0
var wordsPerCurrentInput = 0
var arrayQuote = quoteDisplayElement.querySelectorAll('span'); //array všech <span>character</span>
var arrayValue = quoteInputElement.value.split('') //array všech písmen v inputu
var arrayValueTotal = []
var wpmtext = document.getElementById("wpm")
var timerInterval =  0
var characterCount = [];
var playagainbutton = document.getElementById("playagain")

function fetchAPI() { //Náhodný citát od API

  return fetch('http://api.quotable.io/random')
  .then(resp => resp.json()) //json
  .then(data => data.content) //citát

}

function scoreUpdate() {
  if (wordsPerCurrentInput < 3) { wpmtext.textContent = wordsPerCurrentInput + wordsPerMinute  }
  else {
    wpmtext.textContent =  wordsPerMinute + wordsPerCurrentInput
  }

}

async function LoadNewQuote() {  //New quote


  const quote = await fetchAPI(); // const quote je náhodná hláška

  characterCount = characterCount.concat(arrayValue)
  wordsPerMinute += quoteInputElement.value.split(" ").length - 1 //

  quoteDisplayElement.innerText = "" //Vymazat DisplayElement

  quote.split("").forEach(character => {   //Rozdělení na <span> pro každý charakter - písmeno, mezera atd
    const characterSpan = document.createElement("span")
    characterSpan.innerText = character // pro každý charakter vytvořit <span> jejíž text je právě charakter
    quoteDisplayElement.appendChild(characterSpan) // Zahrnout <span> do <div> DisplayElement

  })
  quoteInputElement.value = null; //input se vynuluje, aby uživatel mohl začít psát citát od znova

}

function startTimer() { //Spuštění Časovače
  playagainbutton.style.display = "flex"
  document.getElementById("instruction").style.display = "none"
  quoteInputElement.removeEventListener("input", startTimer)

  timerElement.innerText = "60"
  startTime = new Date() //čas při zapnutí startovače
  timerInterval =  setInterval(() => {
    if(timerElement.textContent != 0) {timer.innerText = 60 - getTimerTime()} //Odpočet 60 sekund
    else {
      clearInterval(timerInterval)
      timeIsOver()
      }
  }, 1000)
}

function getTimerTime() { //Pomáhá určit skutečný čas
  return Math.floor((new Date() - startTime) / 1000) //rozdíl mezi aktuálním časem a časem při zapnutí


}

function timeIsOver() {
  characterCount = characterCount.concat(arrayValue)
  timerInterval = 0;
  timerElement.textContent = characterCount.length + " " + "characters per minute"

quoteInputElement.style.border = "4px solid black"
quoteInputElement.disabled = true
}

function reset() {
  window.location.reload()
}



quoteInputElement.addEventListener("input", startTimer)

quoteInputElement.addEventListener("input", () => { //pokud se změní input



  arrayQuote = quoteDisplayElement.querySelectorAll('span'); //array všech <span>character</span>
   arrayValue = quoteInputElement.value.split('') //array všech písmen v inputu
   let correct = true //boolean

wordsPerCurrentInput = quoteInputElement.value.split(" ").filter(prvek => prvek != "").length

scoreUpdate()

arrayQuote.forEach((characterSpan, index) => { //pro všechny <span>character</span>

 const character = arrayValue[index]; // character = písmeno z inputu s indexem který se zvětšuje po 1, tj. 0, 1, 2

function isCorrect() {//Shoda Zadání a Inputu
  if (character == null) {  //pokud písmeno ještě není napsané
    characterSpan.classList.remove('correct')
    characterSpan.classList.remove('incorrect')
    correct = false
  }
  else if (character == characterSpan.innerText) { // pokud se písmeno z quote shouduje s písmenem z inputu
    characterSpan.classList.add('correct')
    characterSpan.classList.remove('incorrect')
    //correct = true
    if (character == " ") {
        wpm++
    }
  }
  else {
    characterSpan.classList.add('incorrect') //pokud se nezhodují
    characterSpan.classList.remove('correct')
    correct = false
  }
}

isCorrect()

})
if (correct) LoadNewQuote() //pokud je vše správně
})

playagain.addEventListener("click", reset)


LoadNewQuote() //start
