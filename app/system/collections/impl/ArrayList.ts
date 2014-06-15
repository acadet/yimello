/// <reference path="../../../dependencies.ts" />

/**
 * An implementation of list collection.
 * Based on an array
 */
class ArrayList<T> extends TSObject implements IList<T> {
	//region Fields

	/**
	 * Used array for storing data
	 */
	private _content : Array<T>;

	//endregion Fields

	//region Constructors

	constructor() {
		super();

		this._content = new Array();
	}

	//endregion Constructors

	//region Methods

	//region Private Methods

	//endregion Private Methods

	//region Public Methods

	add(t: T) : void {
		this._content.push(t);
	}

	clone() : IList<T> {
		var l : IList<T> = new ArrayList<T>();

		for (var i = 0; i < this.getLength(); i++) {
			l.add(this.getAt(i));
		}

		return l;
	}

	findFirst(f : Func<T, boolean>) : T {
		for (var i = 0; i < this.getLength(); i++) {
			var t : T = this.getAt(i);

			if (f(t)) {
				return t;
			}
		}

		return null;
	}

	forEach(f : Action<T>) : void {
		for(var i = 0; i < this.getLength() ; i++) {
			f(this.getAt(i));
		}
	}

	getAt(index: number) : T {
		if (index < 0) {
			throw new CollectionException('Negative index');
		}

		if (index >= this._content.length) {
			throw new CollectionException('Unbound index');
		}

		return this._content[index];
	}

	getLength() : number {
		return this._content.length;
	}

	insertAt(index : number, t : T) : void {

		if (index > this.getLength() || index < 0) {
			throw new CollectionException('Unbound index');
		}

		if (index === this.getLength() || this.getLength() === 0) {
			this.add(t);
			return;
		}

		this._content.splice(index, 0, t);
	}

	map(f : Func<T, T>) : void {
		var a : Array<T> = new Array<T>();

		for (var i = 0; i < this.getLength(); i++) {
			a.push(f(this.getAt(i)));
		}

		this._content = a;
	}

	remove(t : T) : void {
		var index : number;

		index = this._content.indexOf(t);

		if (index > -1) {
			this._content.splice(index, 1);
		} else {
			throw new CollectionException('Unable to remove: item not found');
		}
	}

	removeIf(f : Func<T, boolean>) : void {
		var a : Array<T> = new Array<T>();

		this.forEach(
			(e) => {
				if (!f(e)) {
					a.push(e);
				}
			}
		);

		this._content = a;
	}

	toArray() : Array<T> {
		return this._content;
	}

	//endregion Public Methods

	//endregion Methods
}
