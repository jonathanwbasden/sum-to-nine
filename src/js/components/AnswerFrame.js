import React from "react";

export default class AnswerFrame extends React.Component {
	render() {

		var props = this.props;
		var selectedNumbers = props.selectedNumbers.map(function(number) {
			return (
				<div onClick={props.unselectNumber.bind(this, number)} className="number">{number}</div>
			);
		});

		return (
			<div id="answer-frame">
				<div className="well">
					{selectedNumbers}
				</div>
			</div>
		);
	}
}