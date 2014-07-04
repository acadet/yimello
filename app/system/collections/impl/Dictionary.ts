/// <reference path="../../../dependencies.ts" />

/**
 * An implementation of dictionary collection.
 * Uses two arrays in parallel
 * @type {[type]}
 */
class Dictionary<T, U> extends TSObject implements IDictionary<T, U> {
	//region Fields
	
	/**
	 * Array of keys
	 */
	private _keys : Array<T>;

	/**
	 * Array of values
	 */
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
			throw new CollectionException('Unable to add couple: key is already existing');
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

	forEach(f : Action2<T, U>) : void {
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

		throw new CollectionException('Unable to find value for specified key');
	}

	getLength() : number {
		return this._keys.length;
	}

	// TODO : test
	remove(key : T) : void {
		var index : number;

		index = this._keys.indexOf(key);

		if (index > -1) {
			this._keys.splice(index, 1);
			this._values.splice(index, 1);
		} else {
			throw new CollectionException('Unable to remove: item not found');
		}
	}

	//endregion Public Methods
	
	//endregion Methods
}

