/// <reference path="../../dependencies.ts" />

class SearchBar {
	//region Fields

	private _bar : DOMElement;
	
	//endregion Fields
	
	//region Constructors

	constructor() {
		this._setUp();
	}
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods

	private _setUp() : void {
		var input : DOMElement, clear : DOMElement;
		var hideClear : Action0, showClear : Action0;

		this._bar = DOMTree.findSingle('.js-search-bar');
		input = this._bar.findSingle('input');
		clear = this._bar.findSingle('.js-clear-search-bar');

		hideClear = () => {
			if (!clear.hasClass('hidden')) {
				clear.addClass('hidden');
			}
		};

		showClear = () => {
			if (clear.hasClass('hidden')) {
				clear.removeClass('hidden');
			}
		};

		clear.on(
			DOMElementEvents.Click,
			(args) => {
				if (input.getValue().length > 0) {
					input.setValue('');
					hideClear();
					input.focus();
				}
			}
		);
		input.on(
			DOMElementEvents.Focus,
			(args) => {
				if (!this._bar.hasClass('active')) {
					this._bar.addClass('active');
				}
			}
		);
		input.on(
			DOMElementEvents.Blur,
			(args) => {
				if (input.getValue().length < 1) {
					hideClear();
					this._bar.removeClass('active');
				}
			}
		);
		input.on(
			DOMElementEvents.KeyDown,
			(args) => {
				var value : string;

				value = input.getValue();
				if (value.length > 0) {
					showClear();
				} else {
					hideClear();
				}
			}
		);
	}
	
	//endregion Private Methods
	
	//region Public Methods
	
	//endregion Public Methods
	
	//endregion Methods
}
