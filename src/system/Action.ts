/// <reference path="../dependencies.ts" />

interface Action<T> {
	(t : T) : void;
}