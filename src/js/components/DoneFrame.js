import React from "react";

export default class DoneFrame extends React.Component {
	render() {
		return (
			<div className="well text-center">
				<h2>{this.props.doneStatus}</h2>
			</div>
		);
	}
}