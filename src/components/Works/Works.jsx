import WorksTable from "../WorksTable/WorksTable";

import { Link } from "react-router-dom";

export default function Works() {
	return (
		<div className="container">
			<h2>Works</h2>

			<WorksTable />

			<Link className="btn btn-primary" to="/add-work">Add work</Link>
		</div>
	);
}
