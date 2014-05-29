/// <reference path="../dependencies.ts" />

interface Func0<U> {
	() : U;
}

interface Func<T, U> {
	(t: T) : U;
}

interface Func2<T, U, V> {
	(t : T, u : U) : V;
}

interface Func3<T, U, V, W> {
	(t : T, u : U, v : V) : W
}

interface Func4<T, U, V, W, X> {
	(t : T, u : U, v : V, w : W) : X
}