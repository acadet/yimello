/// <reference path="../../dependencies.ts" />

class Queue<T> extends TSObject {
	//region Fields
	
	private _content : Array<T>;

	//endregion Fields
	
	//region Constructors
	
	constructor() {
		super();

		this._content = new Array<T>();
	}

	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	//endregion Private Methods
	
	//region Public Methods
	
	getLength() : number {
		return this._content.length;
	}

	push(t : T) : void {
		this._content.push(t);
	}

	top() : T {
		if (this.getLength() === 0) {
			Log.warn('You call top() on an empty queue');
			return null;
		} else {
			return this._content[0];
		}
	}

	pop() : T {
		if (this.getLength() === 0) {
			Log.warn('You call pop() an empty queue');
			return null;
		} else {
			var t : T = this._content[0];

			if (this.getLength() > 1) {
				this._content.splice(0, 1);
			} else {
				this._content = new Array<T>();
			}

			return t;
		}
	}

	//endregion Public Methods
	
	//endregion Methods
}
