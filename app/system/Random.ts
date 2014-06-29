/// <reference path="../dependencies.ts" />

class Random {
	static get(min : number, max : number) : number {
		return (Math.random() * max) + min;
	}
}
