import React from 'react';
import "./win.css";
function Win(){
return(
	<div>
	<button type = "button" data-toggle = "modal" data-target = "#win">click </button>
	<div id = "win" className = "modal fade"  role = "dialog">
		<div className = "modal-dialog model-lg">
			<div className = "modal-content">
				<div className = "modal-header">
				<h1> You won </h1>
				</div>
				<div className = "modal-body">
					<button> start over </button>
					<button> exit </button>
				</div>
			</div>
		</div>
	</div>
	</div>
	)
}
export default Win;