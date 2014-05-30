/// <reference path="../dependencies.ts" />

class Guid {
	//region Fields
	
	//endregion Fields
	
	//region Constructors
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	static _randomString(length : number) : string {
		if (length < 1) {
			return null;
		} else {
			var charSet : string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
			var outcome : string = '';

			for(var i = 0; i < length; i++) {
				var index : number;

				index = MathHelper.floor(MathHelper.random() * charSet.length);
				outcome += charSet.charAt(index);
			}

			return outcome;
		}
	}

	//endregion Private Methods
	
	//region Public Methods
	
	static newGuid() : string {
		var outcome : StringBuffer;

		outcome = new StringBuffer();
		outcome.append(Guid._randomString(8));
		outcome.append('-');
		outcome.append(Guid._randomString(4));
		outcome.append('-');
		outcome.append(Guid._randomString(4));
		outcome.append('-');
		outcome.append(Guid._randomString(4));
		outcome.append('-');
		outcome.append(Guid._randomString(12));

		return outcome.toString();
	}

	//endregion Public Methods
	
	//endregion Methods
}
