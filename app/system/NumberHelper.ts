/// <reference path="../dependencies.ts" />

class NumberHelper {

	static parseString(s : string) : number {
		var n : number = +s;
		return n;
	}

	static toString(n : number) : string {
		var o : any = n;
		return o.toString();
	}
}