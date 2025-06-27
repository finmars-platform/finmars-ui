export function maskPropToMaskOptions(mask) {
	if (typeof mask === 'string') {
		return { mask };
	}

	return mask;
}
