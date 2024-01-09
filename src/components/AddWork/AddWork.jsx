import { useEffect } from "react";
import * as service from "../../services/TimesCrudService";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../services/AuthServices";
import useFormValidation from "../../utilities/useFormValidation";
import FormInput from "../Validation/FormInput";
import FormTextarea from "../Validation/FormTextarea";
import FormSelect from "../Validation/FormSelect";

export default function AddWork() {
	const [user, loading, error] = useAuthState(auth);
	const navigate = useNavigate();
	const { id } = useParams();

	const [formData, formRef, handleInputValue, isFormValid] =
		useFormValidation();

	useEffect(() => {
		if (id) {
			service.showById((workData) => {
				// TODO: set form data here
			}, id);
		}
	}, [id]);

	function submitHandler(e) {
		e.preventDefault();

		if (id) {
			service.updateWork(id, formData);
		} else {
			service.addWork({ ...formData, uid: user.uid });
		}

		navigate("/");
	}

	return (
		<div className="container">
			<div className="card">
				<div className="card-header">
					<h2>Prideti atlikta darba</h2>
				</div>
				<div className="card-body">
					<form className="form" onSubmit={submitHandler} ref={formRef}>
						<div className="mb-3">
							<FormInput
								onChange={handleInputValue}
								name="date"
								type="date"
								className="form-control"
								errorMessage="Data turi buti pasirinkta"
								label="Pasirinkite data"
								validation={(value) => {
									if (value.length > 0) {
										return true;
									}
									return false;
								}}
							/>
						</div>

						<div className="mb-3">
							<FormSelect
								onChange={handleInputValue}
								name="company"
								className="form-control"
								errorMessage="Vardas turi buti tarp 3 ir 12 raidziu"
								validation={() => true}
								options={[
									{
										text: "Pasirinkite imone:",
										attributes: { hidden: true },
									},
									{
										text: "Kilobaitas",
										attributes: { value: "kb" },
									},
									{
										text: "IT sfera",
										attributes: { value: "it" },
									},
								]}
							/>
						</div>

						<div className="mb-3">
							<FormSelect
								onChange={handleInputValue}
								name="service"
								className="form-control"
								errorMessage="Vardas turi buti tarp 3 ir 12 raidziu"
								validation={() => true}
								options={[
									{
										text: "Pasirinkite darba:",
										attributes: { hidden: true },
									},
									{
										text: "Development",
										attributes: { value: "dev" },
									},
									{
										text: "UX design",
										attributes: { value: "ux" },
									},
								]}
							/>
						</div>

						<div className="mb-3">
							<FormTextarea
								onChange={handleInputValue}
								name="description"
								type="date"
								className="form-control"
								placeholder="Darbo aprasymas"
								errorMessage="Aprasymas turi buti bent 4 simboliai"
								label="Pasirinkite data"
								validation={(value) => {
									if (value.length >= 4) {
										return true;
									}
									return false;
								}}
							/>
						</div>

						<div className="row">
							<div className="mb-3 col-2">
								<FormInput
									onChange={handleInputValue}
									name="from"
									type="time"
									className="form-control"
									errorMessage="Turite pasirinkti laika"
									label="Nuo"
									validation={(value) => {
										if (value.length > 0) {
											return true;
										}
										return false;
									}}
								/>
							</div>

							<div className="mb-3 col-2">
								<FormInput
									onChange={handleInputValue}
									name="to"
									type="time"
									className="form-control"
									errorMessage="Turite pasirinkti laika"
									label="Iki"
									validation={(value) => {
										if (value.length > 0) {
											return true;
										}
										return false;
									}}
								/>
							</div>
						</div>

						<div>
							{id ? (
								<button
									type="submit"
									className="btn btn-primary"
									disabled={!isFormValid(formData)}
								>
									Atnaujinti
								</button>
							) : (
								<button
									type="submit"
									className="btn btn-primary"
									disabled={!isFormValid(formData)}
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
