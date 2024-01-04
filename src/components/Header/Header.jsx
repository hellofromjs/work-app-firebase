import { Link } from "react-router-dom";

export default function Header() {
	return (
		<nav className="navbar bg-body-tertiary">
			<div className="container-fluid">
				<Link to='/' className="navbar-brand">
					Work App
				</Link>
			</div>
		</nav>
	);
}
