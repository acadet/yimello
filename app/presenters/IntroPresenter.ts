/// <reference path="../dependencies.ts" />

class IntroPresenter extends Presenter {
	//region Fields
	
	private _hexagon : DOMElement;

	//endregion Fields
	
	//region Constructors
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	private _animateHexagon(rounds : number) : void {
		this._hexagon.setCss({
			top : NumberHelper.toString(Random.get(20, 400)) + 'px',
			left : NumberHelper.toString(Random.get(20, 700)) + 'px'
		});

		this._hexagon.animate(
			{
				opacity : 0.3
			},
			400,
			(e) => {
				e.animate(
					{
						opacity : 0
					},
					800,
					(e) => {
						if (rounds === 0) {
							return;
						} else {
							this._animateHexagon(rounds - 1);
						}
					}
				);
			}
		);
	}

	//endregion Private Methods
	
	//region Public Methods
	
	onStart() : void {
		var t : Timer;

		DOMTree.findSingle('.js-intro-strap').centerize();
		this._hexagon = DOMTree.findSingle('.js-hexagon');

		t = new Timer((o) => {
			if (CacheAPI.get('tour') === 'ok') {
				NodeWindow.moveTo('main.html');
			} else {
				CacheAPI.set('tour', 'ok');
				NodeWindow.moveTo('tour.html');
			}
		}, 3000);

		this._animateHexagon(100);
	}

	//endregion Public Methods
	
	//endregion Methods
}
