export const isEmailValid = (value) => {
	if (value.includes("@")) {
		return true;
	}
	
	return false;
}

export const isPasswordValid = (value) => {
	if (value.length >= 6) {
		return true;
	}
	return false;
}