import { useState } from "react";
import './validation.css'

export default function FormTextarea(props) {
	const { label, errorMessage, onChange, validation, className, ...inputProps } = props;

	const [isError, setIsError] = useState(true);

	function handleChanged(e) {
		const isValid = validation(e.target.value)
		onChange(e, isValid);
		setIsError(isValid)
	}

	return (
		<>
			{label && <label>{label}</label>}
			<textarea
				{...inputProps}
				onChange={handleChanged}
				className={`${className} ${!isError && 'border-error'}`}
			></textarea>
			{!isError && <span>{errorMessage}</span>}
		</>
	);
}
