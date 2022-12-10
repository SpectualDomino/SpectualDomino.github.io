//Main vars for game

var data = {
    balance: 500,
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

PayDebt.onclick = function(){
    if(data.balance >= parseInt(removeDebt.value)){
        data.balance -= parseInt(removeDebt.value)
        data.debt -= parseInt(removeDebt.value)
        if(data.payments < data.turn){
            data.payments += 1
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

function calcCreditScore(key,key2,key3,key4){
    data[key] = 850 - ((data[key2] * .3)/(data[key3]+data[key4]))
}

a1Btn.onclick = function(){
    console.log("working")
    switch(data.turn){
        case 1:{
            add("limit",10000)
            add("apr", 12)
            gameManager()
        }
        break;
        case 2:{
            add("debt",3000)
            add("apr", 2)
            gameManager()
        }
        break;
        case 3:{
            add("payIncrease",100)
            gameManager()
        }
        break;
        case 4:{
            add("balance",2000)
            gameManager()
        }
        break;
    }
    
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
            a1.innerHTML = "Car loan for $3,000 but APR will +2%"
            a2.innerHTML = "Car loan for $1,000 but APR will +4%"
        }
        break;
        case 3:{
            questionTxt.innerHTML = "Sense you got a car loan you've worked harder and got a raise and offer"
            a1.innerHTML = "Take Offer make $600 per turn"
            a2.innerHTML = "Take Raise 50% chance of $550 or $650"
        }
        break;
        case 4:{
            questionTxt.innerHTML = "You find a brief case with $2,000"
            a1.innerHTML = "Keep the $2000"
            a2.innerHTML = "Turn it in for 50% chance of getting $500 or $2,500 reward"
        }
    }
    add("balance",(500+data.payIncrease))
    Interest("debt","apr")
    if(data.turn % 2 == 0){
        calcCreditScore("creditScore","debt","turn","payments")
    }
    refresh()
}


function startGame(){
    open("game1.html","_self")
}

function refresh(){
    turnTxt.innerHTML = 'Turn: ' + data.turn
    balanceTxt.innerHTML = "Balance: $" +data.balance.toLocaleString()
    debtTxt.innerHTML = "Debt: $" + data.debt.toLocaleString()
    creditScoreTxt.innerHTML = "Credit Score: " + Math.round(data.creditScore) 
    limitTxt.innerHTML = "Limit: $" + data.limit.toLocaleString()
    aprTxt.innerHTML = "APR: " + data.apr.toLocaleString() + "%"
}

rulesBtn.onclick = function(){
    data = {
        balance: 500,
        debt:2000,
        limit:0,
        creditScore:0,
        turn:0,
        apr:0,
        payments:0
    }
    removeDebt.value = ""
    gameManager()
    refresh()

}