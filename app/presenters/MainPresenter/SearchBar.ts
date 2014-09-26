/// <reference path="../../dependencies.ts" />

class SearchBar {
	//region Fields

	private _listener : ISearchBarListener;
	private _bar : DOMElement;
	private _input : DOMElement;
	private _clear : DOMElement;
	private _delayer : Timer;
	
	//endregion Fields
	
	//region Constructors

	constructor(listener : ISearchBarListener) {
		this._listener = listener;
		this._setUp();
	}
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods

	private _startTimer() : void {
		var value : string;

		value = this._input.getValue();

		if (TSObject.exists(this._delayer)) {
			this._delayer.stop();
		}

		this._delayer = new Timer(
			(o) => {
				if (value.length > 0) {
					this._listener.onSearchRequest(value);
				} else {
					this._listener.onSearchCancel();
				}
			},
			700
		);
	}

	private _hideClear() : void {
		if (!this._clear.hasClass('hidden')) {
			this._clear.addClass('hidden');
		}
	}

	private _setUp() : void {
		var showClear : Action0;

		this._bar = DOMTree.findSingle('.js-search-bar');
		this._input = this._bar.findSingle('input');
		this._clear = this._bar.findSingle('.js-clear-search-bar');

		showClear = () => {
			if (this._clear.hasClass('hidden')) {
				this._clear.removeClass('hidden');
			}
		};

		this._clear.on(
			DOMElementEvents.Click,
			(args) => {
				if (this._input.getValue().length > 0) {
					this._input.setValue('');
					this._hideClear();
					this._input.focus();
					this._startTimer();
				}
			}
		);
		this._input.on(
			DOMElementEvents.Focus,
			(args) => {
				if (!this._bar.hasClass('active')) {
					this._bar.addClass('active');
				}
			}
		);
		this._input.on(
			DOMElementEvents.Blur,
			(args) => {
				if (this._input.getValue().length < 1) {
					this._hideClear();
					this._bar.removeClass('active');
				}
			}
		);
		this._input.on(
			DOMElementEvents.KeyDown,
			(args) => {
				var value : string;

				value = this._input.getValue();
				if (value.length > 0) {
					showClear();
				} else {
					this._hideClear();
				}

				this._startTimer();
			}
		);
	}
	
	//endregion Private Methods
	
	//region Public Methods
	
	reset() : void {
		if (TSObject.exists(this._delayer)) {
			this._delayer.stop();
		}
		this._hideClear();
		this._input.setValue('');
		this._input.blur();
	}

	//endregion Public Methods
	
	//endregion Methods
}
