//Main vars for game

var data = {
    balance: 500,
    debt:0,
    limit:0,
    creditScore:0,
    turn:1,
    apr:0
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

function add(key, value){
    data[key] = data[key] + (value || 1)
}

function subtract(key=String,value){
    data[key] = data[key] - (value || 1)

}

function Interest(key, key2){
    data[key] = data[key] * (1+ (data[key2]/100))
}

function leftClick(){
a1Btn.onclick() = function(){
    switch(data.turn){
        case 1:{
            add("limit",10000)
            add("apr", 12)
        }
    }
}
}

function gameManager(turn){
    switch(data.turn){
        case 1:{
            questionTxt.innerHTML = "Its your first turn choose your credit card"
            a1.innerHTML = "Credit limit of $10,000 and a APR of 12%"
            a2.innerHTML = "Credit limit of $8,000 and a APR of 10%"
            add("limit",10000)
            add("apr", 12)
        }
        case 2:{
            questionTxt.innerHTML = ""
        }
    }
    Interest("debt","apr")
    add("turn",1)
    refresh()
}

try{
    startBtn.onclick = function(){
        open("game1.html","_self")
        
    }
}
catch(error){
    refresh()
}

function refresh(){
    turnTxt.innerHTML = 'Turn: ' + data.turn
    balanceTxt.innerHTML = "Balance: " +data.balance
    debtTxt.innerHTML = "Debt: " + data.debt
    creditScoreTxt.innerHTML = "Credit Score: " + data.creditScore
    limitTxt.innerHTML = "Limit: " + data.limit
    aprTxt.innerHTML = "APR: " + data.apr + "%"
}
gameManager(data.turn)
