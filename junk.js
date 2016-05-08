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
		
// from cats listing

li Housing: #{cat.housing}
				li Utilities: #{cat.utils}
				li Car Payment: #{cat.carPayment} 
				li Car Insurance: #{cat.carIns}
				li Health Insurance: #{cat.healthIns}
				li Your Categories: #{cat.mine}
				li Credit Cards: #{cat.creditCards}
				li Loans: #{cat.loans}
				li Savings: #{cat.savings}
				
				
// more from cats listing

li 
						#{cat.income2}
					li 
						#{cat.income3}
					li 
						#{cat.income4}
					li 
						#{cat.income5}
				li Housing: #{cat.housing}
				ul Utilities:
					li 
						#{cat.util1}
					li 
						#{cat.util2}
					li 
						#{cat.util3}
					li 
						#{cat.util4}
				ul Cell Phone:
					li 
						#{cat.cell1}
					li 
						#{cat.cell2}
				ul Car Payment: 
					li 
						#{cat.carPayment1}
					li 
						#{cat.carPayment2}
					li 
						#{cat.carPayment3}
				ul Car Insurance: 
					li 
						#{cat.carIns1}
					li 
						#{cat.carIns2}
					li 
						#{cat.carIns3}
				li Health Insurance: #{cat.healthIns}
				ul Credit Cards:
					li 
						#{cat.creditCard1}
					li 
						#{cat.creditCard2}
					li 
						#{cat.creditCard3}
					li 
						#{cat.creditCard4}
				ul Loans:
					li 
						#{cat.loan1}
					li 
						#{cat.loan2}
					li 
						#{cat.loan3}
					li 
						#{cat.loan4}
				ul Savings:
					li 
						#{cat.saving1}
					li 
						#{cat.saving2}
					li 
						#{cat.saving3}
					li 
						#{cat.saving4}
					li 
						#{cat.saving5}
				ul Your Categories:
					li 
						#{cat.mine1}
					li 
						#{cat.mine2}
					li 
						#{cat.mine3}
					li 
						#{cat.mine4}
					li 
						#{cat.mine5}
						
// from enter cats list

if(categories.length==0)
					p You haven't picked your categories yet.
				else
					
						each category in categories
							is #{category}