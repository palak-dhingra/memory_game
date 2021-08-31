const cardsArray=[
    {
        name : 'chimpanzee',
        src : 'images/chimpanzee.png'
    },
    {
        name : 'chimpanzee',
        src : 'images/chimpanzee.png'
    },
    {
        name : 'chocolate-bar',
        src : 'images/chocolate-bar.png'
    },
    {
        name : 'chocolate-bar',
        src : 'images/chocolate-bar.png'
    },
    {
        name : 'cupcake',
        src : 'images/cupcake.png'
    },
    {
        name : 'cupcake',
        src : 'images/cupcake.png'
    },
    {
        name : 'dress',
        src : 'images/dress.png'
    },
    {
        name : 'dress',
        src : 'images/dress.png'
    },
    {
        name : 'mage',
        src : 'images/mage.png'
    },
    {
        name : 'mage',
        src : 'images/mage.png'
    },
    {
        name : 'ninja',
        src : 'images/ninja.png'
    },
    {
        name : 'ninja',
        src : 'images/ninja.png'
    }
]


var grid = document.querySelector('#grid');
var resultScore = document.querySelector("#result")
var messageBox = document.querySelector("#message")
const headerTag = document.querySelector(".header")

let cardsChosen = []
let cardsChosenId = []
let cardsWon = []

function createBoard(){
    //shuffle the deck
    cardsArray.sort(() => 0.5 - Math.random())
    
    for(var i=0; i<cardsArray.length; i++){
        const card = document.createElement('img');
        card.setAttribute('data-id', i);
        card.setAttribute('src', 'images/question.png');
        card.addEventListener('click', flipCard);
        grid.appendChild(card);
    }
}

function displayMessage(message){
    messageBox.innerText = message;
}

function checkForMatch(){
    const cards = document.querySelectorAll('img')
    var optionOneId = cardsChosenId[0];
    var optionTwoId = cardsChosenId[1];

    if(optionOneId == optionTwoId){
        cards[optionOneId].setAttribute('src', 'images/question.png');
        cards[optionTwoId].setAttribute('src', 'images/question.png');

        displayMessage("you just clicked same image 🤦‍♀️")
    }
    else if(cardsChosen[0] == cardsChosen[1]){
        displayMessage("you found a match 🎉")
        cards[optionOneId].setAttribute('src', 'images/answer.png');
        cards[optionTwoId].setAttribute('src', 'images/answer.png');

        cards[optionOneId].removeEventListener('click', flipCard)
        cards[optionTwoId].removeEventListener('click', flipCard)

        cardsWon.push(cardsChosen);
    }else{
        displayMessage("oops, try again 🤷‍♂️")
        cards[optionOneId].setAttribute('src', 'images/question.png');
        cards[optionTwoId].setAttribute('src', 'images/question.png');
    }

    cardsChosen = []
    cardsChosenId = []

    resultScore.innerText = cardsWon.length
    if(cardsWon.length === cardsArray.length/2){
        displayMessage("wohoaaa! you found them all 😍🙌")
        var buttonReset = document.createElement('button')
        buttonReset.textContent = "Play Again ?"
        buttonReset.addEventListener('click', resetBoard);
        headerTag.appendChild(buttonReset);
    }
}

function resetBoard(){
    grid.innerHTML=""
    cardsWon = []
    headerTag.removeChild(this)
    displayMessage("")
    resultScore.innerText = 0
    createBoard()
    
}

function flipCard(){
    let cardId = this.getAttribute('data-id');
    cardsChosen.push(cardsArray[cardId].name);
    cardsChosenId.push(cardId);
    this.setAttribute('src', cardsArray[cardId].src);
    if(cardsChosen.length === 2){
        setTimeout(checkForMatch, 500)
    }
}



createBoard()
