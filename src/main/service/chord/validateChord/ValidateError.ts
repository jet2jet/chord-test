export const enum ValidateErrorReason {
	InvalidValue = 0,
	Duplicated,
	InvalidAppendForChordType,
	NoMajor7WithSeventh,
	NoSixthWithOtherNumbers,
	NoAdd9WithOtherNumbers,
	/** @note Flat5 + Seventh/Major7 is valid */
	NoFlat5WithOtherNumbers,
	/** @note Sharp5 + Seventh/Major7 is valid */
	NoSharp5WithOtherNumbers,
	NoSameDegrees,
}

export default class ValidateError extends Error {
	constructor(public reason: ValidateErrorReason) {
		super(`ValidateError [reason: ${reason}]`);
	}
}
