import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
	auth,
	registerWithEmailAndPassword,
} from "../../services/AuthServices";
import FormInput from "../../libraries/form-validation/components/FormInput";

import useFormValidation from "../../libraries/form-validation/hooks/useFormValidation";
import { isEmailValid, isPasswordValid } from "../../utilities/validate";

const Register = () => {
	const [formData, formRef, handleInputValue, isFormValid] =
		useFormValidation();

	const [user, loading, _error] = useAuthState(auth);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		await registerWithEmailAndPassword(
			formData.name.value,
			formData.email.value,
			formData.password.value
		);
	};

	useEffect(() => {
		if (loading) return;
		if (user) navigate("/works");
	}, [user, loading]);

	return (
		<div className="container">
			<h2 className="mt-3 text-center">Registruokis</h2>

			<form className="form" onSubmit={handleSubmit} ref={formRef}>
				<div className="mb-3">
					<FormInput
						onChange={handleInputValue}
						name="name"
						type="text"
						className="form-control"
						placeholder="Jusu vardas"
						errorMessage="Vardas turi buti tarp 3 ir 12 raidziu"
						value={formData?.name.value}
						validation={(value) => {
							if (value.length >= 3 && value.length <= 12) {
								return true;
							}
							return false;
						}}
					/>
				</div>
				<div className="mb-3">
					<FormInput
						onChange={handleInputValue}
						name="email"
						type="email"
						className="form-control"
						placeholder="Jusu emailas"
						errorMessage="Toks emailas nera leistinas"
						value={formData?.email.value}
						validation={isEmailValid}
					/>
				</div>
				<div className="mb-3">
					<FormInput
						onChange={handleInputValue}
						name="password"
						type="password"
						className="form-control"
						placeholder="Slaptazodis"
						errorMessage="Slaptazodis turi buti bent 6 simboliai"
						value={formData?.password.value}
						validation={isPasswordValid}
					/>
				</div>
				<div className="mb-3">
					<button
						className="btn btn-primary"
						type="submit"
						disabled={!isFormValid(formData)}
					>
						Registruotis
					</button>
				</div>
				<div>
					<p>
						Turite pasyra? <Link to="/">Galite prisijungti</Link>
					</p>
				</div>
			</form>
		</div>
	);
};

export default Register;
