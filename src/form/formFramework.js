export function createControl(config, validation) {
	return {
		...config,
		validation,
		valid: !validation,
		touched: false,
		value: ''
	}
}

export function validate(value, validation = null) {
	if (!validation){
		return true;
	}
	let isValid = true;

	if (validation.required) {
		isValid = isValid && value.trim() !== '';
	}
	return isValid;
}

export function validateForm(formControls) {
	let isFormValid = true;
	for (let control in formControls) {
		if (formControls.hasOwnProperty(control)) {
			isFormValid = isFormValid && formControls[control].valid;
		}
	}
	return isFormValid;
}
