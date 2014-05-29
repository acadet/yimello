/// <reference path="../dependencies.ts" />

class URLHelper extends TSObject {
	//region Fields
	
	//endregion Fields
	
	//region Constructors
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	//endregion Private Methods
	
	//region Public Methods
	
	static isValid(url : string) : boolean {
		var e : Regex;

		e = new Regex('http\:\/\/.*\..*', [RegexFlags.Insensitive]);

		return e.test(url);
	}

	//endregion Public Methods
	
	//endregion Methods
}
