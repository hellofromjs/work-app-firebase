import { Link } from "react-router-dom";
import User from "../User/User";

export default function Header() {
	return (
		<nav className="navbar bg-body-tertiary">
			<div className="container-fluid">
				<Link to='/' className="navbar-brand">
					Work App
				</Link>
				<User/>
			</div>
		</nav>
	);
}
