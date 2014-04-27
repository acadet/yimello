/// <reference path="../../../dependencies.ts" />

class ArrayList<T> extends TSObject implements IList<T> {
	constructor() {
		super();

		this.content = new Array();
	}

	add(t: T) : void {
		this.content.push(t);
	}

	getAt(index: number) : T {
		return this.content[index];
	}

	getLength() : number {
		return this.content.length;
	}

	private content : Array<T>;
}