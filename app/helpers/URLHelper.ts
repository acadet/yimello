/// <reference path="../dependencies.ts" />

/**
 * Provides useful methods for URL manipulation
 */
class URLHelper extends TSObject {
	//region Fields
	
	//endregion Fields
	
	//region Constructors
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	//endregion Private Methods
	
	//region Public Methods
	
	/**
	 * Tests if an URL has valid format
	 * @param  {string}  url [description]
	 * @return {boolean}     [description]
	 */
	static isValid(url : string) : boolean {
		var e : Regex;

		e = new Regex('http(s?)\:\/\/.*', [RegexFlags.Insensitive]);

		return e.test(url);
	}

	static buildAbsolute(s : string, url : string) : string {
		var editedURL : string;

		if (!TSObject.exists(s) || s === '') {
			Log.warn('Unable to build absolute URL: no string provided');
			return '';
		}

		if (!URLHelper.isValid(url)) {
			Log.error(new Exception('Unable to build absolute URL: provided url is invalid'));
			return null;
		}

		if (url.charAt(url.length - 1) !== '/') {
			editedURL = url + '/';
		} else {
			editedURL = url;
		}

		if (s.length < 7) {
			return editedURL + s;
		}

		if (s.substring(0, 7) === 'http://') {
			return s;
		} else {
			return editedURL + s;
		}
	}

	//endregion Public Methods
	
	//endregion Methods
}
