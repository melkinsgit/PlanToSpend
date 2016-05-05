//

// stuff I pulled from cat.js

// set cats

	// read the credit card cat data
	var creditCard = req.body.creditCard1;
	
	// create the array and push the value into it ** there will eventually be more than 1
	req.body.creditCards = [];
	req.body.creditCards.push(creditCard);
	
	// utils
	// read the credit card cat data
	var utility = req.body.utility;
	
	// create the array and push the value into it ** there will eventually be more than 1
	req.body.utils = [];
	req.body.utils.push(utility);
	
	// mine
	// read the my category cat data
	var myCat = req.body.myCat;
	
	// create the array and push the value into it ** there will eventually be more than 1
	req.body.mine = [];
	req.body.mine.push(myCat);
	
	// loans
	// read the credit card cat data
	var loan = req.body.loan;
	
	// create the array and push the value into it ** there will eventually be more than 1
	req.body.loans = [];
	req.body.loans.push(loan);
	
	// savings
	// read the credit card cat data
	var saving = req.body.saving;
	
	// create the array and push the value into it ** there will eventually be more than 1
	req.body.savings = [];
	req.body.savings.push(saving);
	
// removing userCats from user model
	
	thisUserCats : {
		housing: String,
		creditCards: [String],
		utils: [String],
		carPayment: String,
		carIns: String,
		healthIns: String,
		mine: [String],
		loans: [String],
		savings: [String]}