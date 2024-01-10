import { useEffect, useRef, useState } from "react";

export default function useFormValidation() {
	const [formData, setFormData] = useState();
	const [formNewData, setFormNewData] = useState();

	const formRef = useRef(null);

	useEffect(() => {
		const formControls = formRef.current.elements;

		const formElements = {};
		for (let i = 0; i < formControls.length; i++) {
			if (
				formControls[i].type !== "submit" &&
				formControls[i].type !== "button"
			) {
				// for each form element create default state
				Object.assign(formElements, {
					[formControls[i].name]: { value: undefined, isValid: false },
				});
			}
		}
		setFormData(() => formElements);
	}, []);

	useEffect(() => {
		if (formData !== undefined) {
			const newState = { ...formData };
			// update existing form state with new data
			for (const [key, value] of Object.entries(formNewData)) {
				if (Object.hasOwn(newState, key)) {
					newState[key].value = value;
				}
			}

			setFormData(newState);
		}
	}, [formNewData]);

	const handleInputValue = ({ name, value }, isValid) => {
		setFormData(oldValue => ({
			...oldValue,
			[name]: { value: value, isValid },
		}));
	};

	const isFormValid = () => {
		if (formData !== undefined) {
			// if all form element values are valid, form is valid
			for (const [_, value] of Object.entries(formData)) {
				if (value.isValid !== true) {
					return false;
				}
			}

			return true;
		}
	};

	// remove any additional properties and return just key-value pairs
	const formDataFlat = () => {
		if (formData !== undefined) {
			const flatObject = {};
			for (const [key, value] of Object.entries(formData)) {
				flatObject[key] = value.value;
			}

			return flatObject;
		}
	};

	return [formData, formRef, handleInputValue, isFormValid, formDataFlat, setFormNewData];
}