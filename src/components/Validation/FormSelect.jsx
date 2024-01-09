import { useState } from "react";
import './validation.css'

export default function FormSelect(props) {
	const { label, errorMessage, onChange, validation, options, className, ...inputProps } =
		props;

	const [isError, setIsError] = useState(true);

	function handleChanged(e) {
		const isValid = validation(e.target.value);
		onChange(e, isValid);
		setIsError(isValid);
	}

	return (
		<>
			{label && <label>{label}</label>}
			<select
				{...inputProps}
				onChange={handleChanged}
				className={`${className} ${!isError && 'border-error'}`}
			>
				{options.map((option, i) => <option key={i} {...option.attributes}>{option.text}</option>)}
			</select>
			{!isError && <span>{errorMessage}</span>}
		</>
	);
}
