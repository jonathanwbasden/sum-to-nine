import React from "react";

import StarsFrame from './StarsFrame.js';
import ButtonFrame from './ButtonFrame.js';
import AnswerFrame from './AnswerFrame.js';
import NumbersFrame from './NumbersFrame.js';
import DoneFrame from './DoneFrame.js';

export default class Game extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			numberOfStars :  this.randomNumber(),
			selectedNumbers : [],
			correct : null,
			usedNumbers : [],
			redraws: 5,
			doneStatus : null
		};
	}

	randomNumber() {
		return Math.floor(Math.random() * 9) + 1;
	}

	selectNumber(clickedNumber) {
		if(this.state.selectedNumbers.indexOf(clickedNumber) < 0) {
			this.setState({
				selectedNumbers : this.state.selectedNumbers.concat(clickedNumber),
				correct : null
			});
		}
	}

	unselectNumber(clickedNumber) {
		var index = this.state.selectedNumbers.indexOf(clickedNumber);
		this.state.selectedNumbers.splice(index, 1);
		this.setState({			
			selectedNumbers : this.state.selectedNumbers,
			correct : null
		});
	}

	sumOfSelectedNumbers() {
		return this.state.selectedNumbers.reduce(function(p, n) {
			return p+n;
		}, 0);
	}

	acceptAnswer() {
		var usedNumbers = this.state.usedNumbers.concat(this.state.selectedNumbers);
		this.setState({
			selectedNumbers: [],
			usedNumbers: usedNumbers,
			correct: null,
			numberOfStars: this.randomNumber()
		});
		this.updateDoneStatus();
	}

	checkAnswer() {
		var correct = (this.state.numberOfStars === this.sumOfSelectedNumbers());
		this.setState({
			correct : correct
		});
	}

	possibleSolutions() {
		var numberOfStars = this.state.numberOfStars,
			possibleNumbers = [],
			usedNumbers = this.state.usedNumbers;

		for(var i = 0; i <=9; i++) {
			if(usedNumbers.indexOf(i) < 0) {
				possibleNumbers.push(i);
			}
		}

		return possibleCombinationSum(possibleNumbers, numberOfStars);

	}

	updateDoneStatus() {
		if(this.state.usedNumbers.length === 9) {
			this.setState({ doneStatus: 'Done. Nice!' });
			return;
		}
		var solutions = this.possibleSolutions();
		alert(solutions); 
		if(!this.state.redraws === 0 && !solutions) {
			this.setState({ doneStatus: 'Game Over!' });
		}
	}

	redraw() {

		if(this.state.redraws > 0) {
			this.setState({
				numberOfStars:  this.randomNumber(),
				correct: null,
				selectedNumbers: [],
				redraws: this.state.redraws - 1
			});
			this.updateDoneStatus();
		}
	}

	render() {
		var selectedNumbers = this.state.selectedNumbers,
			numberOfStars = this.state.numberOfStars,
			correct = this.state.correct,
			usedNumbers = this.state.usedNumbers,
			redraws = this.state.redraws,
			doneStatus = this.state.doneStatus,
			bottomFrame;

		if(doneStatus) {
			bottomFrame = <DoneFrame doneStatus={doneStatus} />;
		}
		else {
			bottomFrame = <NumbersFrame selectedNumbers={selectedNumbers} 
							  selectNumber={this.selectNumber.bind(this)} 
							  usedNumbers={this.state.usedNumbers} />
		}	

		return (
			<div id="game">
				<div className="clearfix">
					<StarsFrame numberOfStars={numberOfStars} />
					<ButtonFrame selectedNumbers={selectedNumbers} 
								 unselectNumber={this.unselectNumber.bind(this)} 
								 correct={correct}
								 checkAnswer={this.checkAnswer.bind(this)}
								 acceptAnswer={this.acceptAnswer.bind(this)}
								 redraw={this.redraw.bind(this)}
								 redraws={this.state.redraws} />
					<AnswerFrame selectedNumbers={selectedNumbers} unselectNumber={this.unselectNumber.bind(this)} />
				</div>
				{bottomFrame}
			</div>
		);
	}
}

var possibleCombinationSum = function(arr, n) {
  if (arr.indexOf(n) >= 0) { return true; }
  if (arr[0] > n) { return false; }
  if (arr[arr.length - 1] > n) {
    arr.pop();
    return possibleCombinationSum(arr, n);
  }
  var listSize = arr.length, combinationsCount = (1 << listSize)
  for (var i = 1; i < combinationsCount ; i++ ) {
    var combinationSum = 0;
    for (var j=0 ; j < listSize ; j++) {
      if (i & (1 << j)) { combinationSum += arr[j]; }
    }
    if (n === combinationSum) { return true; }
  }
  return false;
};