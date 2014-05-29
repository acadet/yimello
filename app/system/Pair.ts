/// <reference path="../dependencies.ts" />

class Pair<T, U> extends TSObject {
	//region Fields
	
	private _first : T;
	private _second : U;

	//endregion Fields
	
	//region Constructors
	
	//endregion Constructors
	
	constructor(first : T = null, second : U = null) {
		super();

		this._first = first;
		this._second = second;
	}

	//region Methods
	
	//region Private Methods
	
	//endregion Private Methods
	
	//region Public Methods
	
	getFirst() : T {
		return this._first;
	}

	setFirst(first : T) : void {
		this._first = first;
	}

	getSecond() : U {
		return this._second;
	}

	setSecond(second : U) : void {
		this._second = second;
	}

	//endregion Public Methods
	
	//endregion Methods
}
