import { useEffect, useRef, useState } from "react";

export default function useFormValidation() {
	const [formData, setFormData] = useState();

	const formRef = useRef(null);

	useEffect(() => {
		const formControls = formRef.current.elements;

		const formElements = {};
		for (let i = 0; i < formControls.length; i++) {
			if (
				formControls[i].type !== "submit" &&
				formControls[i].type !== "button"
			) {
				Object.assign(formElements, {
					[formControls[i].name]: { value: "", isValid: false },
				});
			}
		}
		setFormData(formElements);
	}, []);

	const handleInputValue = (e, isValid) => {
		setFormData({
			...formData,
			[e.target.name]: { value: e.target.value, isValid },
		});
	};

	const isFormValid = () => {
		if (formData !== undefined) {
			for (const [key, value] of Object.entries(formData)) {
				if (value.isValid !== true) {
					return false;
				}
			}

			return true;
		}
	};

	return [formData, formRef, handleInputValue, isFormValid];
}