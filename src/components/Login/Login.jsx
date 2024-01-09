import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword } from "../../services/AuthServices";
import { useAuthState } from "react-firebase-hooks/auth";
import { isEmailValid, isPasswordValid } from "../../utilities/validate";
import FormInput from "../Validation/FormInput";
import useFormValidation from "../../utilities/useFormValidation";

const Login = () => {
	const [formData, formRef, handleInputValue, isFormValid] =
		useFormValidation();

	const [user, loading, error] = useAuthState(auth);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		await signInWithEmailAndPassword(
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
			<h2 className="mt-3 text-center">Prisijungti</h2>

			<form className="form" onSubmit={handleSubmit} ref={formRef}>
				<div className="mb-3">
					<FormInput
						onChange={handleInputValue}
						name="email"
						type="email"
						className="form-control"
						placeholder="Jusu emailas"
						errorMessage="Toks emailas nera leistinas"
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
						validation={isPasswordValid}
					/>
				</div>
				<div className="mb-3">
					<button
						className="btn btn-primary"
						type="submit"
						disabled={!isFormValid(formData)}
					>
						Prisijungti
					</button>
				</div>
				<div>
					<p>
						Neturite paskyros? <Link to="/register">Galite registruotis</Link>
					</p>
					<p>
						Nepavyksta prisijungti?{" "}
						<Link to="/password-reset">Atstatykite slaptazodi</Link>
					</p>
				</div>
			</form>
		</div>
	);
};

export default Login;
