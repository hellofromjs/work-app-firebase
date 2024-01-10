import useFormElementValidation from "../hooks/useFormElementValidation";
import "./validation.css";

export default function FormSelect(props) {
	const {
		label,
		errorMessage,
		onChange,
		validation,
		options,
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
			<select
				name={name}
				{...inputProps}
				onChange={handleChanged}
				className={`${className} ${!isError && "border-error"}`}
				value={value || ""}
			>
				{options.map((option, i) => (
					<option key={i} {...option.attributes}>
						{option.text}
					</option>
				))}
			</select>
			{!isError && <span className="text-error">{errorMessage}</span>}
		</>
	);
}
