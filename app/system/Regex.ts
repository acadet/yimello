/// <reference path="../dependencies.ts" />

class RegexFlags {
	static Insensitive : string = 'i';
	static Global : string = 'g';
	static Multi : string = 'm';
}

class Regex extends TSObject {
	//region Fields
	
	private _regex : any;

	//endregion Fields
	
	//region Constructors
	
	constructor(pattern : string, flags : Array<RegexFlags> = null) {
	    super();
	
		this._regex = new RegExp(pattern, this._buildFlags(flags));
	}

	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	private _buildFlags(flags : Array<RegexFlags>) : string {
		var s : string = '';

		if (flags !== null) {
			for (var i = 0; i < flags.length; i++) {
				s += flags[i];
			}
		}

		return s;
	}

	//endregion Private Methods
	
	//region Public Methods

	execute(s : string) : string {
		var r : any = this._regex.exec(s);

		if (r === null) {
			return null;
		} else {
			return r[1];
		}
	}

	test(s : string) : boolean {
		return this._regex.test(s);
	}

	//endregion Public Methods
	
	//endregion Methods
}
