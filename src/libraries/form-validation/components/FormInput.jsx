import useFormElementValidation from "../hooks/useFormElementValidation";
import "./validation.css";

export default function FormInput(props) {
	const {
		label,
		errorMessage,
		onChange,
		validation,
		className,
		value,
		name,
		...inputProps
	} = props;

	const [isError, handleChanged] = useFormElementValidation(
		name,
		value,
		validation,
		onChange
	);

	return (
		<>
			{label && <label>{label}</label>}
			<input
				{...inputProps}
				name={name}
				onChange={handleChanged}
				value={value || ""}
				className={`${className} ${!isError && "border-error"}`}
			/>
			{!isError && <span className="text-error">{errorMessage}</span>}
		</>
	);
}
