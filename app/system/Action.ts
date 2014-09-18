/// <reference path="../dependencies.ts" />

interface Action0 {
	() : void;
}

interface Action<T> {
	(t : T) : void;
}

interface Action2<T, U> {
	(t : T, u : U) : void;
}

interface Action3<T, U, V> {
	(t : T, u : U, v : V) : void;
}

interface Action4<T, U, V, W> {
	(t : T, u : U, v : V, w : W) : void;
}

class ActionHelper {
	getValueOrDefault<T>(action : Action<T>) : Action<T> {
		var mock : Action<T>;

		mock = (arg) => {
			return;
		};

		return (TSObject.exists(act)) ? action : mock;
	}
}
