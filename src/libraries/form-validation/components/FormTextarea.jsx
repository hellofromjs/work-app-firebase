import useFormElementValidation from "../hooks/useFormElementValidation";
import "./validation.css";

export default function FormTextarea(props) {
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
			<textarea
				name={name}
				{...inputProps}
				onChange={handleChanged}
				className={`${className} ${!isError && "border-error"}`}
				value={value || ""}
			></textarea>
			{!isError && <span className="text-error">{errorMessage}</span>}
		</>
	);
}
