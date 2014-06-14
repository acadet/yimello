/// <reference path="../dependencies.ts" />

class StringHelper {

	static compare(s1 : string, s2 : string) : boolean {
		var e1 : string, e2 : string;

		e1 = s1.trim().toLowerCase();
		e2 = s2.trim().toLowerCase();

		return e1 === e2;
	}

	static trim(s : string) : string {
		return s.trim();
	}
}
