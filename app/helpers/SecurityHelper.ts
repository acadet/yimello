/// <reference path="../dependencies.ts" />

class SecurityHelper {
	//region Fields
	
	//endregion Fields
	
	//region Constructors
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	//endregion Private Methods
	
	//region Public Methods
	
	static disarm(s : string) : string {
		var outcome : string;

		if (!TSObject.exists(s)) {
			Log.warn('SecurityHelper: unable to disarm, given value is null');
			return null;
		}

		outcome = '';
		for (var i = 0; i < s.length; i++) {
			var c : string = s.charAt(i);

			switch (c) {
				case '<':
					outcome += '&lt;';
					break;
				case '>':
					outcome += '&gt;';
					break;
				default:
					outcome += c;
					break;
			}
		}

		outcome = outcome.trim();

		return outcome;
	}

	//endregion Public Methods
	
	//endregion Methods
}
