/// <reference path="../dependencies.ts" />

class ActionHelper {
	static getValueOrDefaultNoArgs(action : Action0) : Action0 {
		var mock : Action0;

		mock = () => { return; };

		return (TSObject.exists(action)) ? action : mock;
	}

	static getValueOrDefault<T>(action : Action<T>) : Action<T> {
		var mock : Action<T>;

		mock = (arg) => {
			return;
		};

		return (TSObject.exists(action)) ? action : mock;
	}
}