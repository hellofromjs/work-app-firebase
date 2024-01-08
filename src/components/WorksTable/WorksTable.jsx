import Work from "../Work/Work";
import * as service from "../../services/TimesCrudService";
import { useEffect, useState } from "react";

export default function WorksTable() {
	const [works, setWorks] = useState([]);

	useEffect(() => {
		service.getAllWorks((works) => {
			setWorks(works);
		});
	}, []);

	return (
		<table className="table table-bordered table-striped">
			<thead>
				<tr>
					<th>Data</th>
					<th>Klientas</th>
					<th>Suteikta paslauga</th>
					<th>Aprasymas</th>
					<th>Trukme</th>
					<th>Keisti</th>
					<th>Salinti</th>
				</tr>
			</thead>
			<tbody>
				{works.map((work) => (
					<Work key={work.id} work={work} />
				))}
			</tbody>
		</table>
	);
}
