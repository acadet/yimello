/// <reference path="../dependencies.ts" />

class Environment {
	static isOnline() : boolean {
		return navigator.onLine;
	}
}
