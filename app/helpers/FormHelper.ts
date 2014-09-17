/// <reference path="../dependencies.ts" />

/**
 * Provides methods for form handling
 */
class FormHelper {
	
	/**
	 * Returns true if a field is filled
	 * @param Content of field to test
	 */
	static isFilled(value : string) : boolean {
		if (!TSObject.exists(value)) {
			return false;
		}

		return value.trim() !== '';
	}
}
