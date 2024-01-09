import WorksTable from "../WorksTable/WorksTable";
import { Link } from "react-router-dom";
import * as service from "../../services/TimesCrudService";
import { useEffect, useState } from "react";
import { auth } from '../../services/AuthServices'
import { useAuthState } from "react-firebase-hooks/auth";

export default function Works() {
	const [works, setWorks] = useState([]);
	const [user, loading, error] = useAuthState(auth)

	useEffect(() => {
		if (loading) return

		if (user) {
			service.getAllWorks(works => setWorks(works), user);
		}
	}, [user, loading]);

	return (
		<div className="container">
			<h2>Works</h2>

			<WorksTable works={works} />

			<Link className="btn btn-primary" to="/add-work">Add work</Link>
			
		</div>
	);
}
