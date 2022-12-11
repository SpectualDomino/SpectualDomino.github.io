//Main vars for game

var data = {
    balance: 0,
    debt:2000,
    limit:0,
    creditScore:0,
    turn:0,
    apr:0,
    payments:0,
    payIncrease:0
}

//Text document variables
var startBtn = document.getElementById("start")
var questionTxt = document.getElementById("question")
var a1 = document.getElementById("a1")
var a2 = document.getElementById("a2")
var a1Btn = document.getElementById("a1Btn")
var a2Btn = document.getElementById("a2Btn")
var turnTxt = document.getElementById("turnTxt")
var balanceTxt = document.getElementById("balance")
var debtTxt = document.getElementById("debt")
var creditScoreTxt = document.getElementById("credit")
var limitTxt = document.getElementById("limit")
var aprTxt = document.getElementById("apr")
var rulesBtn = document.getElementById("rules")
var PaybtnContainer =document.getElementById("payBtnContainer")
var PayDebt = document.getElementById("payDebt")
var removeDebt = document.getElementById("removeDebt")
var scoresLose = document.getElementById("scoresLose")
var closeBtn

function openRules(){
    rulesBtn.setAttribute("disabled","true")
    let newDiv = document.createElement("div")
    let newTitle = document.createElement("h1")
    let rulesTxt = document.createElement("p")
    let closeBtn = document.createElement("button")
    closeBtn.innerHTML = "X"
    rulesTxt.innerHTML = "1. To win the game you have to pay off your debt. \n2. To lose the game your debt has to go higher than your limit, credit score hits 300, or not pay off debt before end.\n3. Every Turn is considered one month your credit score only updates every two months.\n4. You earn $500 a turn which can be more on future turns.\n5. Your credit score is calculated with how many payments you make which has to be 5% of your debt to count as one.\n6. Each turn you have to make a choice which could be benefit you or hurt you.\n7. Some choices have luck involved because sometimes you get lucky in life."
    newTitle.innerHTML = "Managing Credit"
    newDiv.id = "newDiv"
    closeBtn.id = "closeRules"
    newDiv.appendChild(newTitle)
    newDiv.appendChild(rulesTxt)
    newDiv.appendChild(closeBtn)
    closeBtn.addEventListener("click",()=>{
        rulesBtn.removeAttribute("disabled")
        document.body.removeChild(newDiv)
    })
    document.body.appendChild(newDiv)
}



PayDebt.onclick = function(){
    if(data.balance >= parseInt(removeDebt.value)){
        data.balance -= parseInt(removeDebt.value)
        data.debt -= parseInt(removeDebt.value)
        if(data.payments < data.turn && (data.debt * 0.05) <= parseInt(removeDebt.value)){
            data.payments += 1
            console.log(data.payments)
        }
    }
    refresh()
}

function add(key, value){
    data[key] = data[key] + (value || 1)
}

function subtract(key=String,value){
    data[key] = data[key] - (value || 1)

}

function Interest(key, key2){
    data[key] = data[key] * (1+ (data[key2]/100))
}

function calcCreditScore(key,key2,key3,key4,key5){
    data[key] = 850 - ((data[key2] * (data[key2]/data[key5]))/(data[key3]+data[key4]))
}

function gameManager(){
    add("turn",1)
    switch(data.turn){
        case 1:{
            questionTxt.innerHTML = "Its your first turn choose your credit card"
            a1.innerHTML = "Credit limit of $10,000 and a APR of 12%"
            a2.innerHTML = "Credit limit of $8,000 and a APR of 10%"
        }
        break;
        case 2:{
            questionTxt.innerHTML = "You need to get a loan choose"
            a1.innerHTML = "Car loan for $3,000 but APR will +2% if credit score is less than 550 its 4%"
            a2.innerHTML = "Car loan for $1,000 but APR will +4% if credit score is less than 550 its 6%"
        }
        break;
        case 3:{
            questionTxt.innerHTML = "Sense you got a car loan you've worked harder and got a raise and offer"
            a1.innerHTML = "Take Offer make $600 per turn"
            a2.innerHTML = "Take Raise 50% chance of $550 or $650"
        }
        break;
        case 4:{
            questionTxt.innerHTML = "You break your arm. The bills $600"
            a1.innerHTML = "Pay $600 from balance"
            a2.innerHTML = "Take out a $600 loan but APR will +1% or +2% if credit below 400"
        }
        break;
        case 5:{
            questionTxt.innerHTML = "You find a brief case with $1,500"
            a1.innerHTML = "Keep the $1500"
            a2.innerHTML = "Turn it in for 25% of getting $3,000 reward"
        }
        break;
        case 6:{
            questionTxt.innerHTML = "You got a promotion! But you crashed your car on the way to work"
            a1.innerHTML = "Pay raise of $100 and pay $500 from balance"
            a2.innerHTML = "Pay raise of $100 and get a loan $500 with +1% apr"
        }
        break;
        case 7:{
            questionTxt.innerHTML = "You left a candle burning your house burned down!"
            a1.innerHTML = "Pay $1500 from balance"
            a2.innerHTML = "Take out a $1500 loan but APR will +2% or +3% if credit below 500"
        }
        break;
        case 8:{
            questionTxt.innerHTML = "Your credit card company is rewarding its customers."
            a1.innerHTML = "If your credit score is over 600 -4% else -2%"
            a2.innerHTML = "If your creidt score is over 600 -$2000 debt else -$1000 debt"
        }
        break;
    }
    add("balance",(500+data.payIncrease))
    Interest("debt","apr")
    if(data.turn % 2 == 0){
        calcCreditScore("creditScore","debt","turn","payments","limit")
    }
    refresh()
}
var randNum
//Left Side
a1Btn.onclick = function(){
    switch(data.turn){
        case 1:{
            add("limit",10000)
            add("apr", 12)
            gameManager()
        }
        break;
        case 2:{
            add("debt",3000)
            if(data.creditScore >= 550){
                add("apr", 2)
            }
            else{
                add("apr",4)
            }
            gameManager()
        }
        break;
        case 3:{
            add("payIncrease",100)
            gameManager()
        }
        break;
        case 4:{
            if(data.balance >= 600)
            {
                subtract("balance",600)
                gameManager()
            }
        }
        break;
        case 5:{
            add("balance",1500)
            gameManager()
        }
        break;
        case 6: {
            add("payIncrease",100)
            if(data.balance >= 500)
            {
                subtract("balance",500)
                gameManager()
            }
        }
        break;
        case 7: {
            if(data.balance >= 1500)
            {
                subtract("balance",1500)
                gameManager()
            }
        }
        case 8: {
            if(data.creditScore >= 600){
                subtract("apr",4)
            }
            else{
                subtract("apr",2)
            }
            gameManager()
        }
        break;
    }

}

//Right side
a2Btn.onclick = function(){
    switch(data.turn){
        case 1:{
            add("limit",8000)
            add("apr", 10)
            gameManager()
        }
        break;
        case 2:{
            add("debt",1000)
            if(data.creditScore >= 550){
                add("apr", 4)
            }
            else{
                add("apr",6)
            }
            gameManager()
        }
        break;
        case 3:{
            randNum = Math.round((Math.random() * 1))
            if(randNum = 1){
                add("payIncrease",150)
            }
            else{
                add("payIncrease",50)
            }
            gameManager()
        }
        break;
        case 4:{
            
            add("debt",600)
            if(data.creditScore < 400){
                add("apr",2)
            }else{
                add("apr",1)
            }
            gameManager()
            
        }
        break;
        case 5:{
            randNum = Math.round((Math.random() * 4))
            console.log(randNum)
            if(randNum < 1){
                add("balance",3000)
            }
            gameManager()
        }
        break;
        case 6: {
            add("payIncrease",100)
            add("debt",500)
            add("apr",1)
            gameManager()
        }
        break;
        case 7:{
            add("debt",1500)
            if(data.creditScore < 500){
                add("apr",3)
            }else{
                add("apr",2)
            }
            gameManager()
        }
        break;
        case 8: {
            if(data.creditScore >= 600){
                subtract("debt",2000)
            }
            else{
                subtract("debt",1000)
            }
            gameManager()
        }
        break;
    }
    
}



function startGame(){
    open("game1.html","_self")
}

function refresh(){  
    //Win the game
    if(data.debt < 0 && data.turn > 0){
        localStorage.setItem("user",JSON.stringify(data))
        open("youWin.html","_self")
    }
    //
    removeDebt.value = ""
    turnTxt.innerHTML = 'Turn: ' + data.turn
    balanceTxt.innerHTML = "Balance: $" +data.balance.toLocaleString()
    debtTxt.innerHTML = "Debt: $" + Math.round(data.debt).toLocaleString()
    creditScoreTxt.innerHTML = "Credit Score: " + Math.round(data.creditScore) 
    limitTxt.innerHTML = "Limit: $" + data.limit.toLocaleString()
    aprTxt.innerHTML = "APR: " + data.apr.toLocaleString() + "%"
    //Lose the Game
    if(data.creditScore <= 300 && data.turn > 1 || data.limit < data.debt && data.turn > 1){
        open("gameOver.html","_self")
    }
}

function playAgain(){
    open("index.html","_self")
}
function turnsDisplay(){
    var dataS = JSON.parse(localStorage.getItem("user"))
    
    var turnAmount = document.getElementById("turnsAmount")
    turnAmount.innerHTML = "You won in "+ (dataS["turn"] - 1) + " Turns"
}