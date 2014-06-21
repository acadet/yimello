/// <reference path="../dependencies.ts" />

class FaviconHelper extends TSObject {
	//region Fields
	
	//endregion Fields
	
	//region Constructors
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	//endregion Private Methods
	
	//region Public Methods

	static getDefaultSrc() : string {
		return 'assets/img/default-bookmark-icon.png';
	}

	static getSrc(url : string) : string {
		if (Environment.isOnline()) {
			return 'http://g.etfv.co/' + url;
		} else {
			return FaviconHelper.getDefaultSrc();
		}
	}

	static getImgTag(url : string) : DOMElement {
		return DOMElement.fromString('<img src="' + FaviconHelper.getSrc(url) + '" />');
	}

	//endregion Public Methods
	
	//endregion Methods
}
