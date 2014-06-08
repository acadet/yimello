/// <reference path="../../dependencies.ts" />

/**
 * A list collection
 */
interface IList<T> {
	/**
	 * Adds a new item to list
	 * @param {T} t [description]
	 */
	add(t: T) : void;

	/**
	 * Clones current list
	 * @return {IList<T>} [description]
	 */
	clone() : IList<T>;

	/**
	 * Finds first matching of provided selector.
	 * If no element is found, returns null
	 * @param  {Func<T, boolean>} f             Selector
	 * @return {T}                     [description]
	 */
	findFirst(f : Func<T, boolean>) : T;

	/**
	 * Applies a function to each element of list
	 * @param {Action<T>} f [description]
	 */
	forEach(f : Action<T>) : void;

	/**
	 * Gets an element at specified index
	 * @param  {number} index [description]
	 * @return {T}            [description]
	 */
	getAt(index: number) : T;

	/**
	 * Gets length of list
	 * @return {number} [description]
	 */
	getLength() : number;

	/**
	 * Inserts an element at specified index
	 * @param {number} index [description]
	 * @param {T}      t     [description]
	 */
	insertAt(index : number, t : T) : void;

	/**
	 * Removes an element from list
	 * @param {T} t [description]
	 */
	remove(t : T) : void;

	/**
	 * Casts list to an array
	 * @return {Array<T>} [description]
	 */
	toArray() : Array<T>;
}

