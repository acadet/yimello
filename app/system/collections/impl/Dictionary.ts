/// <reference path="../../../dependencies.ts" />

class DictionaryException extends Exception {}

class Dictionary<T, U> extends TSObject implements IDictionary<T, U> {
	//region Fields
	
	private _keys : Array<T>;
	private _values : Array<U>;

	//endregion Fields
	
	//region Constructors
	
	constructor() {
		super();

		this._keys = new Array<T>();
		this._values = new Array<U>();
	}

	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	//endregion Private Methods
	
	//region Public Methods
	
	add(key : T, value : U) : void {
		if (this.containsKey(key)) {
			throw new DictionaryException('Unable to add couple: key is already existing');
		}

		this._keys.push(key);
		this._values.push(value);
	}

	clone() : IDictionary<T, U> {
		var d : IDictionary<T, U> = new Dictionary<T, U>();

		this.forEach((k, v) => {
			d.add(k, v);
		});

		return d;
	}

	containsKey(key : T) : boolean {
		for (var i = 0; i < this._keys.length; i++) {
			if (this._keys[i] === key) {
				return true;
			}
		}

		return false;
	}

	forEach(f : (key : T, value : U)=>void) : void {
		for (var i = 0; i < this._keys.length; i++) {
			f(this._keys[i], this._values[i]);
		}
	}

	get(key : T) : U {
		for (var i = 0; i < this._keys.length; i++) {
			if (this._keys[i] === key) {
				return this._values[i];
			}
		}

		return null;
	}

	getLength() : number {
		return this._keys.length;
	}

	//endregion Public Methods
	
	//endregion Methods
}

