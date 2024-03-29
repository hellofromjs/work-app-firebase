import Work from "../Work/Work";

export default function WorksTable({works}) {
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
