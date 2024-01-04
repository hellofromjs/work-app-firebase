import "./App.css";
import Header from "../Header/Header";
import Works from "../Works/Works";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddWork from "../AddWork/AddWork";

function App() {
	return (
		<div>
			<Router basename={import.meta.env.VITE_REPO_NAME}>
				<Header />
				<Routes>
					<Route path="/" element={<Works />} />
					<Route path="/add-work" element={<AddWork />} />
					<Route path="/update-work/:id" element={<AddWork />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
