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

	static truncate(s : string, nb : number, expander : string = '...') : string {
		if (!TSObject.exists(s)) {
			Log.error(new Exception('Unable to truncate string: no string provided'));
			return null;
		}

		if (nb < 1) {
			Log.error(new Exception('Unable to truncate string: number must be positive'));
			return null;
		}

		for (var i = 0; i < s.length; i++) {
			if (i === nb) {
				return s.substring(0, i) + expander;
			}
		}

		return s;
	}

	static truncateWords(s : string, nb : number, expander : string = '...') : string {
		var acc : number;

		if (!TSObject.exists(s)) {
			Log.error(new Exception('Unable to truncate string: no string provided'));
			return null;
		}

		if (nb < 1) {
			Log.error(new Exception('Unable to truncate string: number must be positive'));
			return null;
		}

		acc = 0;
		for (var i = 0; i < s.length; i++) {
			if (s.charAt(i) === ' ') {
				acc++;

				if (acc === nb) {
					return s.substring(0, i - 1) + expander;
				}
			}
		}

		return s;
	}

	// TODO : test
	static extractWords(sentence : string) : IList<string> {
		var list : IList<string>;
		var tmp : string;
		var s : string;

		if (!TSObject.exists(sentence)) {
			Log.error(new Exception('Unable to extract: specified string is null'));
			return null;
		}

		list = new ArrayList<string>();

		if (sentence.length < 1) {
			Log.warn('Nothing to extract, string is empty');
			return list;
		}

		s = StringHelper.trim(sentence);
		tmp = '';
		for (var i = 0; i < s.length; i++) {
			var e : string = s.charAt(i);
			if (e === ' ') {
				list.add(tmp);
				tmp = '';
			} else {
				tmp += e;
			}
		}

		return list;
	}
}
