
function chooseDifficulty(bal,debt, creditScore,missedPayment){
    localStorage.setItem("bal", bal)
    localStorage.setItem("debt", debt)
    localStorage.setItem("creditScore", creditScore)
    localStorage.setItem("missedPayment",missedPayment)
    localStorage.setItem("limit", 5000)
    localStorage.setItem("apr", 0)
    open("game1.html","_self")
}
function updateBal(){
    var lBal = localStorage.getItem("bal")
    var lDebt = localStorage.getItem("debt")
    var lCreditScore = localStorage.getItem("creditScore")
    var lmissedPayment = localStorage.getItem("missedPayment")

    var lApr = localStorage.getItem("apr")

    var balance = document.getElementById("balance")
    var debt = document.getElementById("money")
    var credit = document.getElementById("credit")
    var missedP = document.getElementById("missedP")

    var apr = document.getElementById("apr")

    balance.innerHTML = "Current Balance: $" + lBal
    debt.innerText = "Current Debt: $"+ lDebt
    credit.innerHTML = "Current Credit Score: " + lCreditScore
    missedP.innerHTML = "Missed Payments: " + lmissedPayment
    apr.innerHTML = "Current Apr: " + lApr + "%"

    
    
}
function userChoice(newBal,newDebt,newCredit,newMissedPayment,newLimit,newApr){
    var lBal = localStorage.getItem("bal")
    var lDebt = localStorage.getItem("debt")
    var lCreditScore = localStorage.getItem("creditScore")
    var lLimit = localStorage.getItem("limit")
    var lmissedPayment = localStorage.getItem("missedPayment")
    var lTurn = localStorage.getItem("turn")
    var lApr = localStorage.getItem("apr")
    
    localStorage.setItem("bal",lBal += newBal)
    localStorage.setItem("debt", lDebt += newDebt)
    localStorage.setItem("creditScore", lCreditScore += newCredit)
    localStorage.setItem("limit", lLimit += newLimit)
    localStorage.setItem("missedPayment", lmissedPayment += newMissedPayment)
    localStorage.setItem("turn", lTurn += 1)
    localStorage.setItem("apr",lApr += newApr)
    updateBal()
}
function carLoan(amount,turns){
    var lBal = localStorage.getItem("bal")
    var lDebt = localStorage.getItem("debt")
    var lCreditScore = localStorage.getItem("creditScore")
    var lLimit = localStorage.getItem("limit")
    var lmissedPayment = localStorage.getItem("missedPayment")
    var lTurn = localStorage.getItem("turn")
    var lApr = localStorage.getItem("apr")

    if(turns > 0){
    localStorage.setItem("")
    }

}
