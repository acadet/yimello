/// <reference path="../dependencies.ts" />

class IntroPresenter extends YimelloPresenter {
	//region Fields

	private _mustExit : boolean;

	//endregion Fields
	
	//region Constructors
	
	constructor() {
	    super();
	
	    this._mustExit = false;
	}

	//endregion Constructors
	
	//region Methods
	
	//region Private Methods

	private _exit() : void {
		if (CacheAPI.get('tour') === 'ok') {
			NodeWindow.moveTo('main.html');
		} else {
			CacheAPI.set('tour', 'ok');
			NodeWindow.moveTo('tour.html');
		}
	}

	private _testVersion() : void {
		VersionHelper.isUpToDate(
			(success) => {
				if (!success) {
					var body : DOMElement, icon : DOMElement;
					var originalWidth : number, originalHeight : number;
					var duration : number = 600;

					body = DOMTree.findSingle('.js-body');
					icon = body.findSingle('.js-update-icon');
					originalWidth = 50;
					originalHeight = 50;

					icon.on(
						DOMElementEvents.Click,
						(args) => {
							NodeWindow.openExternal('http://yimello.adriencadet.com');
						}
					);

					icon.setCss({
						width : originalWidth,
						height : originalHeight,
						top : body.getHeight() - 100,
						left : (body.getWidth() - originalWidth) / 2
					});

					icon.animateEasing(
						{
							opacity : 1,
							width : originalWidth * 2,
							height : originalHeight * 2,
							top : body.getHeight() - 100 - (originalHeight / 2),
							left : (body.getWidth() - originalWidth * 2) / 2
						},
						duration,
						'easeOutBack'
					);

					icon
						.findSingle('img')
						.animateEasing(
							{
								marginLeft : (originalWidth * 2 - 50) / 2,
								marginTop : (originalHeight * 2 - 50) / 2
							},
							duration,
							'easeOutBack',
							(o) => {
								icon.addClass('pulse');

								if (this._mustExit) {
									var t : Timer;

									t = new Timer(
										(o) => {
											this._exit();
										},
										3000
									);
								} else {
									this._mustExit = true;
								}
							}
						);
				} else {
					if (this._mustExit) {
						this._exit();
					} else {
						this._mustExit = true;
					}
				}
			}
		);
	}

	//endregion Private Methods
	
	//region Public Methods
	
	onStart() : void {
		var t : Timer;

		super.onStart();

		t = new Timer(
			(o) => {
				this._testVersion();
			},
			500
		);

		BusinessFactory.buildTagBookmark(
			(business) => {
				business.backup(
					() => {
						if (this._mustExit) {
							this._exit();
						} else {
							this._mustExit = true;
						}
					}
				);
			}
		);
	}

	//endregion Public Methods
	
	//endregion Methods
}
