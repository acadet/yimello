/// <reference path="../../dependencies.ts" />

interface IList<T> {
	add(t: T) : void;

	clone() : IList<T>;

	forEach(f : Action<T>) : void;

	getAt(index: number) : T;

	getLength() : number;

	insertAt(index : number, t : T) : void;

	map(f : Action<T>) : void;

	toArray() : Array<T>;
}

