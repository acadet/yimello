/// <reference path="../../dependencies.ts" />

/**
 * A dictionary collection
 * @type {[type]}
 */
interface IDictionary<T, U> {
	/**
	 * Adds couple to collection
	 * @param {T} key   [description]
	 * @param {U} value [description]
	 */
	add(key : T, value : U) : void;

	/**
	 * Clones dictionary
	 * @return {IDictionary<T, U>} [description]
	 */
	clone() : IDictionary<T, U>;

	/**
	 * Tests if current dictionary contains specified key
	 * @param  {T}       key [description]
	 * @return {boolean}     [description]
	 */
	containsKey(key : T) : boolean;

	/**
	 * Applies a function to each element
	 * @param {Action2<T, U>} f [description]
	 */
	forEach(f : Action2<T, U>) : void;

	/**
	 * Gets value for specified key
	 * @param  {T} key [description]
	 * @return {U}     [description]
	 */
	get(key : T) : U;

	getLength() : number;
}
