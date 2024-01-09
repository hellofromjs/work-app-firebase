import { useEffect, useState } from "react";
import * as service from "../../services/TimesCrudService";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../services/AuthServices";


export default function AddWork() {
	const [user, loading, error] = useAuthState(auth)
	const navigate = useNavigate();
	const { id } = useParams();
	const [submitDisabled, setSubmitDisabled] = useState(true);

	const [items, setItems] = useState({
		date: "",
		company: "",
		service: "",
		description: "",
		from: "",
		to: "",
		uid: "",
	});

	const [errors, setErrors] = useState({
		date: false,
		description: false,
		company: true,
		service: true,
		from: true,
		to: true,
	});

	useEffect(() => {
		if (id) {
			service.showById((item) => setItems(item), id);
			
			setErrors({
				date: false,
				description: false,
				company: false,
				service: false,
				from: false,
				to: false,
			});
		}
	}, [id]);

	useEffect(() => {
		for (const [key, value] of Object.entries(errors)) {
			if (value == true) {
				setSubmitDisabled(true);
				return;
			}

			setSubmitDisabled(false);
		}
	}, [id, errors]);

	function handleFormData(e) {
		if (e.target.name == "company") {
			setErrors((prevValue) => ({ ...prevValue, company: false }));
		} else if (e.target.name == "service") {
			setErrors((prevValue) => ({ ...prevValue, service: false }));
		} else if (e.target.name == "from") {
			setErrors((prevValue) => ({ ...prevValue, from: false }));
		} else if (e.target.name == "to") {
			setErrors((prevValue) => ({ ...prevValue, to: false }));
		}

		setItems((prevData) => ({
			...prevData,
			[e.target.name]: e.target.value,
		}));
	}

	function submitHandler(e) {
		e.preventDefault();

		if (id) {
			service.updateWork(id, items);
		} else {
			service.addWork({ ...items, uid: user.id });
		}

		navigate("/");
	}

	function validateDate(e) {
		if (e.target.value == "") {
			setErrors((prevValue) => ({ ...prevValue, date: true }));
		} else {
			setErrors((prevValue) => ({ ...prevValue, date: false }));
		}
	}

	function validateDescription(e) {
		if (e.target.value == "") {
			setErrors((prevValue) => ({ ...prevValue, description: true }));
		} else {
			setErrors((prevValue) => ({ ...prevValue, description: false }));
		}
	}

	return (
		<div className="container">
			<div className="card">
				<div className="card-header">
					<h2>Prideti atlikta darba</h2>
				</div>
				<div className="card-body">
					<form className="form" onSubmit={submitHandler}>
						<div className="mb-3">
							<label htmlFor="date">Pasirinkite data</label>
							<input
								className={`form-control ${errors.date && "is-invalid"}`}
								id="date"
								type="date"
								name="date"
								value={items.date}
								onChange={(e) => {
									handleFormData(e);
									validateDate(e);
								}}
							/>
							<div className="invalid-feedback">
								Please provide a valid value
							</div>
						</div>

						<div className="mb-3">
							<select
								name="company"
								id="company"
								className="form-select"
								value={items.company}
								onChange={handleFormData}
							>
								<option hidden>Pasirinkite imone:</option>
								<option value="kb">Kilobaitas</option>
								<option value="it">IT sfera</option>
							</select>
						</div>

						<div className="mb-3">
							<select
								name="service"
								id="service"
								className="form-select"
								value={items.service}
								onChange={handleFormData}
							>
								<option hidden>Pasirinkite darba:</option>
								<option value="dev">Development</option>
								<option value="ux">UX design</option>
							</select>
						</div>

						<div className="mb-3">
							<textarea
								name="description"
								id="description"
								className={`form-control ${errors.description && "is-invalid"}`}
								placeholder="Darbo aprasymas"
								value={items.description}
								onChange={(e) => {
									handleFormData(e);
									validateDescription(e);
								}}
							></textarea>
							<div className="invalid-feedback">
								Please provide a valid value
							</div>
						</div>

						<div className="row">
							<div className="mb-3 col-2">
								<label htmlFor="from">Nuo:</label>
								<input
									className="form-control"
									type="time"
									id="from"
									name="from"
									value={items.from}
									onChange={handleFormData}
								/>
							</div>

							<div className="mb-3 col-2">
								<label htmlFor="to">Iki:</label>
								<input
									className="form-control"
									type="time"
									id="to"
									name="to"
									value={items.to}
									onChange={handleFormData}
								/>
							</div>
						</div>

						<div>
							{id ? (
								<button
									type="submit"
									className="btn btn-primary"
									disabled={submitDisabled}
								>
									Atnaujinti
								</button>
							) : (
								<button
									type="submit"
									className="btn btn-primary"
									disabled={submitDisabled}
								>
									Saugoti
								</button>
							)}
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
