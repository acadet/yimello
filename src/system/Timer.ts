/// <reference path="../dependencies.ts" />

interface TimerHandler {
	(obj: TSObject) : void;
}

class Timer extends TSObject {
	
	constructor(handler: TimerHandler, delay : number, argument = null, frequency = -1) {
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

	clear() : void {
		if (this._hasIntervals) {
			clearInterval(this._timer);
		} else {
			clearTimeout(this._timer);
		}
	}

	private _timer : any;
	private _hasIntervals : boolean;
}