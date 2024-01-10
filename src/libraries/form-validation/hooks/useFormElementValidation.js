import { useEffect, useState } from "react";

export default function useFormElementValidation(name, value, validation, onChange) {

	const [isError, setIsError] = useState(true);

	function handleChanged(e) {
		validate(name, e.target.value);
	}

	useEffect(() => {
		validate(name, value);
	}, [value]);

	function validate(name, value) {
		if (value === undefined) return;
		
		const isValid = validation(value);
		onChange({ name, value }, isValid);
		setIsError(isValid);
	}

	return [isError, handleChanged];
}