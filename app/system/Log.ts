/// <reference path="../dependencies.ts" />

enum LogLevel {
	Debug,
	Test,
	Production
}

class Log {
	//region Fields	

	private static _currentLevel : LogLevel = LogLevel.Debug;

	//endregion Fields
	
	//region Constructors
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods

	//endregion Private Methods
	
	//region Public Methods
	
	static setLevel(l : LogLevel) : void {
		Log._currentLevel = l;
	}

	static debug(msg : string) : void {
		if (this._currentLevel <= LogLevel.Debug) {
			console.log('DEBUG: ' + msg);
		}
	}

	static inform(msg : string) : void {
		if (this._currentLevel <= LogLevel.Test) {
			console.log('%cINFORM: ' + msg, 'color: DeepSkyBlue;');
		}
	}

	static warn(msg : string) : void {
		if (this._currentLevel <= LogLevel.Production) {
			console.log('%cWARN: ' + msg, 'color: orange;');
		}
	}

	static error(e : Exception) : void {
		console.error('Error: ' + e.toString());
	}

	//endregion Public Methods
	
	//endregion Methods
}
