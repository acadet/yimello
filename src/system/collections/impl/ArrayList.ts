/// <reference path="../../../dependencies.ts" />

class ArrayList<T> extends TSObject implements IList<T> {
	constructor() {
		super();

		this._content = new Array();
	}

	add(t: T) : void {
		this._content.push(t);
	}

	getAt(index: number) : T {
		return this._content[index];
	}

	getLength() : number {
		return this._content.length;
	}

	map(f: Action<T>) : void {
		for(var i = 0; i < this._content.length; i++) {
			f(this._content[i]);
		}
	}

	private _content : Array<T>;
}