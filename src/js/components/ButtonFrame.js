import React from "react";

export default class ButtonFrame extends React.Component {
	render() {

		var disabled = (this.props.selectedNumbers.length === 0), 
			button, 
			correct = this.props.correct;

		switch(correct) {
			case true:
					button = (
							<button className="btn btn-success btn-lg" onClick={this.props.acceptAnswer}>
									<span className="glyphicon glyphicon-ok"></span>
							</button>
					);	
					break;
			case false:
					button = (
							<button className="btn btn-danger btn-lg">
									<span className="glyphicon glyphicon-remove"></span>
							</button>
					);	
					break;
			default:
				button = (
					<button className="btn btn-primary btn-lg" disabled={disabled} onClick={this.props.checkAnswer}>=</button>
				);	
		};

		return (
			<div id="button-frame">
				{button}
				<br></br>
				<br></br>
				<button disabled={this.props.redraws === 0} className="btn btn-warning btn-xs" onClick={this.props.redraw}>
					<span className="glyphicon glyphicon-refresh"></span>
					&nbsp;
					{this.props.redraws}
				</button>
			</div>
		);
	}
}