/// <reference path="../../dependencies.ts" />

class CacheAPI {
	//region Fields
	
	//endregion Fields
	
	//region Constructors
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	//endregion Private Methods
	
	//region Public Methods
	
	static get(key : string) : string {
		return localStorage[key];
	}

	static set(key : string, value : string) : void {
		localStorage[key] = value;
	}

	static remove(key : string) : void {
		localStorage.removeItem(key);
	}

	//endregion Public Methods
	
	//endregion Methods
}
