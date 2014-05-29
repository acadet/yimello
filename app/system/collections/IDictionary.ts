/// <reference path="../../dependencies.ts" />

interface IDictionary<T, U> {
	add(key : T, value : U) : void;

	clone() : IDictionary<T, U>;

	containsKey(key : T) : boolean;

	forEach(f : (key : T, value : U)=>void) : void;

	get(key : T) : U;

	getLength() : number;
}
