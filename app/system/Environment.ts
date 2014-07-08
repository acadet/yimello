/// <reference path="../dependencies.ts" />

class Environment {
	static isOnline() : boolean {
		return navigator.onLine;
	}

	static getWidth() : number {
		return DOMTree.getRoot().getWidth();
	}

	static getHeight() : number {
		return DOMTree.getRoot().getHeight();
	}
}
