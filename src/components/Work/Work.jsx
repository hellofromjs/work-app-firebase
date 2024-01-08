import { Link } from "react-router-dom";
import * as service from "../../services/TimesCrudService";

export default function Work({ work }) {
	const deleteHandler = () => {
		service.deleteWork(work.id);
	};

	function duration() {
		const [fromHours, fromMinutes] = work.from.split(":");
		const [toHours, toMinutes] = work.to.split(":");

		return `${String(Math.abs(toHours - fromHours)).padStart(2, "0")}:
				${String(Math.abs(toMinutes - fromMinutes)).padStart(2, "0")}`;
	}

	return (
		<tr>
			<td>{work.date}</td>
			<td>{work.company}</td>
			<td>{work.service}</td>
			<td>{work.description}</td>
			<td>{duration()}</td>
			<td>
				<Link className="btn btn-primary" to={`/update-work/${work.id}`}>
					Keisti
				</Link>
			</td>
			<td>
				<a className="btn btn-danger" onClick={deleteHandler} href="#">
					Salinti
				</a>
			</td>
		</tr>
	);
}
