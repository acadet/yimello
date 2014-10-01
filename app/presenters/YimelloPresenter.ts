/// <reference path="../dependencies.ts" />

class YimelloPresenter extends Presenter {
	//region Fields

	private _notifier : INotifier;

	//endregion Fields
	
	//region Constructors
	
	constructor() {
		super();

		this._notifier = new Notifier();

		DOMTree
			.findSingle('.js-exit-trigger')
			.on(
				DOMElementEvents.Click,
				(e) => {
					NodeWindow.close();
				}
			);

		DOMTree
			.findSingle('.js-minimize-trigger')
			.on(
				DOMElementEvents.Click,
				(e) => {
					NodeWindow.minimize();
				}
			);
	}

	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	//endregion Private Methods
	
	//region Public Methods

	onStart() : void {
		super.onStart();

		DOMTree.findSingle('.js-body').animate(
			{
				opacity : 1
			},
			500
		);
	}

	getNotifier() : INotifier {
		return this._notifier;
	}

	//endregion Public Methods
	
	//endregion Methods
}
