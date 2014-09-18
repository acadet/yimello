/// <reference path="../../dependencies.ts" />

class Presenter {

	//region Fields

	private _isPaused : boolean;
	
	//endregion Fields
	
	//region Constructors
	
	constructor() {
		super();

		this._isPaused = false;

		NodeWindow.on(NodeWindowEvents.Blur, this._onPause);
		NodeWindow.on(NodeWindowEvents.Focus, this._onResume);
		NodeWindow.on(NodeWindowEvents.Close, this._onDestroy);
		NodeWindow.on(NodeWindowEvents.Move, () => {
			this.onDestroy();
		});

		this.onStart();
	}

	//endregion Constructors
	
	//region Methods
	
	//region Private Methods

	private _onResume() : void {
		if (this._isPaused) {
			this._isPaused = false;
			this.onResume();
		}
	}

	private _onPause() : void {
		this._isPaused = true;
		this.onPause();
	}

	private _onDestroy() : void {
		this.onDestroy();
		NodeWindow.close();
	}

	//endregion Private Methods
	
	//region Public Methods
	
	onStart() : void {

	}

	onResume() : void {

	}

	onPause() : void {

	}

	onDestroy() : void {

	}

	//endregion Public Methods
	
	//endregion Methods
}
