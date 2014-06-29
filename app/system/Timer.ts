/// <reference path="../dependencies.ts" />

class Timer extends TSObject {
	//region Fields
	
	private _timer : any;
	private _hasIntervals : boolean;

	//endregion Fields
	
	//region Constructors
	
	constructor(handler: Action<any>, delay : number, argument : any = null, frequency : number = -1) {
		super();

		if (frequency > 0) {
			this._hasIntervals = true;
			setTimeout(() => {
				this._timer = setInterval(() => {
					handler(argument);
				}, frequency);
			}, delay);
		} else {
			this._hasIntervals = false;
			this._timer = setTimeout(() => {
				handler(argument);
			}, delay);
		}
	}

	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	//endregion Private Methods
	
	//region Public Methods
	
	stop() : void {
		if (this._hasIntervals) {
			clearInterval(this._timer);
		} else {
			clearTimeout(this._timer);
		}
	}

	//endregion Public Methods
	
	//endregion Methods
}
