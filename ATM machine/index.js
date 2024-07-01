#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inquirer_1 = require("inquirer");
var chalk_1 = require("chalk");
// Initialize user balance and pin code
var myBalance = 5000;
var myPin = 1234;
// Print welcome message
console.log(chalk_1.default.bold.rgb(204, 204, 204)("\n  \t\t <<<=====Wellcome to zia Machine=====>>>"));
console.log(chalk_1.default.bold.rgb(204, 204, 204)("<<<==========>>>  ".concat(chalk_1.default.bold.hex('#9999F')('Welcome To \'Code With Hamza\' - ATM Machine'), "  <<<===========>>>")));
console.log(chalk_1.default.bold.rgb(204, 204, 204)("\t\t <<<======================================>>>\n"));
// Prompt the user to enter their PIN
var pinAnswer = await inquirer_1.default.prompt([
    {
        name: "pin",
        type: "number",
        message: chalk_1.default.hex('#99CCFF')("Enter your pin code: ")
    }
]);
// Check if the entered PIN is correct
if (pinAnswer.pin === myPin) {
    console.log(chalk_1.default.bold.greenBright("\n Pin is Correct ! Login Successful\n"));
    // Prompt the user to select (withdraw or check balance)
    var operationAns = await inquirer_1.default.prompt([
        {
            name: "operation",
            type: "list",
            message: chalk_1.default.hex('#99CCFF')("Select your operation: "),
            choices: ["Withdraw Ammount", "Check Balance"]
        }
    ]);
    // If the user selects "Withdraw"
    if (operationAns.operation === "Withdraw Ammount") {
        // Prompt the user to select ("Fast Cash" or "Enter Amount")
        var withdrawAns = await inquirer_1.default.prompt([
            {
                name: "withdrawMethod",
                type: "list",
                message: chalk_1.default.hex('#99CCFF')("Choose withdrawal method:"),
                choices: ["Fast Cash", "Enter Amount"]
            }
        ]);
        // If the user selects "Fast Cash"
        if (withdrawAns.withdrawMethod === "Fast Cash") {
            var fastCashAns = await inquirer_1.default.prompt([
                {
                    name: "fastCash",
                    type: "list",
                    message: chalk_1.default.hex('#CCFFFF')("Select Amount:"),
                    choices: [1000, 2000, 5000, 10000, 20000, 50000]
                }
            ]);
            // Check if the user have sufficient balance
            if (fastCashAns.fastCash > myBalance) {
                console.log(chalk_1.default.red("\nInsufficient Balance"));
            }
            else {
                // Withdraw the selected fast cash amount from the user's balance
                myBalance -= fastCashAns.fastCash;
                console.log("\n".concat(chalk_1.default.green("$", fastCashAns.fastCash), " Withdraw Successfully !"));
                console.log("Your Remaining Balance is ".concat(chalk_1.default.greenBright("$", myBalance)));
            }
        }
        // If the user selects "Enter Amount"
        else if (withdrawAns.withdrawMethod === "Enter Amount") {
            var amountAns = await inquirer_1.default.prompt([
                {
                    name: "amount",
                    type: "number",
                    message: chalk_1.default.hex('#CCFFFF')("Enter amount to withdraw: ")
                }
            ]);
            // Check if the user have sufficient balance
            if (amountAns.amount > myBalance) {
                console.log(chalk_1.default.red("\nInsufficient Balance"));
            }
            else {
                // Withdraw the selected amount from the user's balance
                myBalance -= amountAns.amount;
                console.log("\n".concat(chalk_1.default.greenBright("$", amountAns.amount), " Withdraw Successfully !"));
                console.log("Your Remaining Balance is ".concat(chalk_1.default.greenBright("$", myBalance)));
            }
        }
    }
    // If the user selects "Check Balance"
    else if (operationAns.operation === "Check Balance") {
        console.log("\nYour Balance is ".concat(chalk_1.default.greenBright("$", myBalance)));
    }
}
// If the entered PIN is incorrect
else {
    console.log(chalk_1.default.red("\nPin is Incorrect, Try Again!"));
}
