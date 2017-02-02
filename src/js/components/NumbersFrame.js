import React from "react";

export default class NumbersFrame extends React.Component {

	render() {

		var numbers = [], 
			className, 
			selectedNumbers = this.props.selectedNumbers,
			usedNumbers = this.props.usedNumbers;

		for(var i = 1; i <= 9; i++) {
			className = "number selected-" + (selectedNumbers.indexOf(i)>=0);
			className += " used-" + (this.props.usedNumbers.indexOf(i) >=0);
			numbers.push(<div onClick={this.props.selectNumber.bind(this,i)} className={className}>{i}</div>);
		}

		return (
			<div id="numbers-frame">
				<div className="well">
					{numbers}
				</div>
			</div>
		);
	}
}