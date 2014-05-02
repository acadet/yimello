/// <reference path="../../../dependencies.ts" />

interface IList<T> {
	add(t: T) : void;

	getAt(index: number) : T;

	getLength() : number;

	map(f : Action<T>) : void;
}