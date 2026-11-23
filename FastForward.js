//fast forward functionality

let portfolioBalance = 0; //To be updated by admin
let internalClock = 0; //handle fastforwarding + game ending (once internal clock reaches 52, since 52 weeks in a year)
let stock1 = 0; //to be updated by data Manager
let stock2 = 0;
let stock3 = 0;


function updatePrice(stock, internalClock) { //update stock price from data manager
    if (stock === 1) {
        stock1 = dataManager.getStockPrice(1, internalClock); //get stock price from data manager based on current week
        document.getElementById('stock-price-1').textContent = '$' + stock1; //update stock price in UI
    }
    if (stock === 2) {
        stock2 = dataManager.getStockPrice(2, internalClock);
        document.getElementById('stock-price-2').textContent = '$' + stock2;
    }
    if (stock === 3) {
        stock3 = dataManager.getStockPrice(3, internalClock);
        document.getElementById('stock-price-3').textContent = '$' + stock3;
    }
}

function updatePortfolio() { //update portfolio balance on current prices + owned stocks whenever user fast forwards
	const stock1Owned = parseInt(document.getElementById('stock-owned-1').textContent) || 0; 
	const stock2Owned = parseInt(document.getElementById('stock-owned-2').textContent) || 0;
	const stock3Owned = parseInt(document.getElementById('stock-owned-3').textContent) || 0;
	
	const portfolio1Value = stock1 * stock1Owned; //calculate value of owned stock based on current price
	const portfolio2Value = stock2 * stock2Owned;
	const portfolio3Value = stock3 * stock3Owned;

    
	
	document.getElementById('owned-stock-value-1').textContent = '$' + Math.round(portfolio1Value); //update UI with updated values
	document.getElementById('owned-stock-value-2').textContent = '$' + Math.round(portfolio2Value);
    document.getElementById('owned-stock-value-3').textContent = '$' + Math.round(portfolio3Value);
}

function fastForward(timePeriod) { //fast forward the game by a week month or year based on updated time

    if (timePeriod === 'week') { //if btn is week
        internalClock += 1; //increment by 1
        if(internalClock >= 48) { //if internal clock is at or above 48, set to 48 so datamanager can pull prices from week 48
            internalClock = 48;
            endGame(); //end game
        }
        else {
        updatePrice(1, internalClock);
        updatePrice(2, internalClock);
        updatePrice(3, internalClock);
        updatePortfolio();
        }
    }

    if (timePeriod === 'month') { //if btn is month
        internalClock += 4; //increment by 4 weeks (simplify each month as 4 weeks)
        if(internalClock >= 48) {
            internalClock = 48;
            endGame();
        }
        else {
        updatePrice(1, internalClock);
        updatePrice(2, internalClock);
        updatePrice(3, internalClock);
        updatePortfolio();
        }
    }
    if (timePeriod === 'year') { //if btn is year
        internalClock += 48; //end game
        endGame();
    }
}

document.getElementById('fast-forward-button-1').addEventListener('click', function() {
	fastForward('week');
});

document.getElementById('fast-forward-button-2').addEventListener('click', function() {
	fastForward('month');
});

document.getElementById('fast-forward-button-3').addEventListener('click', function() {
	fastForward('year');
});

function endGame() { //runs once internal clock reaches 48 weeks
    updatePortfolio();
    updatePrice(1, internalClock);
    updatePrice(2, internalClock);
    updatePrice(3, internalClock);
    //EndgameDisplay() display popup with final portfolio value and profit margin and ability to copy score to clipboard
}



