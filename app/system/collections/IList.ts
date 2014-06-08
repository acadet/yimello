/// <reference path="../../dependencies.ts" />

interface IList<T> {
	add(t: T) : void;

	clone() : IList<T>;

	findFirst(f : Func<T, boolean>) : T;

	forEach(f : Action<T>) : void;

	getAt(index: number) : T;

	getLength() : number;

	insertAt(index : number, t : T) : void;

	remove(t : T) : void;

	toArray() : Array<T>;
}

