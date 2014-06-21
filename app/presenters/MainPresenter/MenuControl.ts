/// <reference path="../../dependencies.ts" />

class MenuControl {
	//region Fields
	
	private _menuTrigger : DOMElement;
	private _tagFormTrigger : DOMElement;
	private _overlay : DOMElement;

	private _tagFormWrapper : DOMElement;
	private _menuPannel : DOMElement;

	private _isMenuCurrent : boolean;
	private _isOverSubMenu : boolean;

	//endregion Fields
	
	//region Constructors
	
	constructor() {
		this._menuTrigger = DOMTree.findSingle('.js-menu-trigger');
		this._tagFormTrigger = DOMTree.findSingle('.js-tag-form-trigger');
		this._overlay = DOMTree.findSingle('.js-overlay');
		this._tagFormWrapper = this._overlay.findSingle('.js-tag-form-wrapper');
		this._menuPannel = this._overlay.findSingle('.js-menu-pannel');

		this._isOverSubMenu = false;

		this._menuTrigger.on(
			DOMElementEvents.Click,
			(e) => {
				this._showMenu();
			}
		);
		this._tagFormTrigger.on(
			DOMElementEvents.Click,
			(e) => {
				this._showTagForm();
			}
		);
		this._bindMouseEvents(this._menuPannel);
		this._bindMouseEvents(this._tagFormWrapper);
		this._overlay.on(
			DOMElementEvents.Click,
			(e) => {
				if (!this._isOverSubMenu) {
					this._hideCurrentSubMenu();
				}
			}
		);
		this._menuPannel
			.findSingle('.js-tour-trigger')
			.on(
				DOMElementEvents.Click,
				(e) => {
					NodeWindow.moveTo('tour.html');
				}
			);
		this._menuPannel
			.findSingle('.js-close-trigger')
			.on(
				DOMElementEvents.Click,
				(e) => {
					NodeWindow.close();
				}
			);
	}

	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	private _showOverlay() : void {
		this._overlay.setCss({
			zIndex : 999,
			display : 'block',
			opacity : 0
		});

		this._overlay.animate(
			{
				opacity : 1
			},
			1000
		);
	}

	private _hideOverlay() : void {
		this._overlay.animate(
			{
				opacity : 0
			},
			1000,
			(e) => {
				this._overlay.setCss({
					zIndex : 0,
					display : 'none'
				});
			}
		);
	}

	private _showSubMenu(e : DOMElement) : void {
		e.centerize();
		e.showDrop(
			500,
			'up'
		);
	}

	private _hideSubMenu(e : DOMElement) : void {
		e.hideDrop(
			500,
			'up'
		);
	}

	private _showMenu() : void {
		this._showOverlay();
		this._showSubMenu(this._menuPannel);
		this._isMenuCurrent = true;
	}

	private _hideMenu() : void {
		this._hideSubMenu(this._menuPannel);
		this._hideOverlay();
	}

	private _showTagForm() : void {
		this._showOverlay();
		this._showSubMenu(this._tagFormWrapper);
		this._isMenuCurrent = false;
	}

	private _hideTagForm() : void {
		this._hideSubMenu(this._tagFormWrapper);
		this._hideOverlay();
	}

	private _hideCurrentSubMenu() : void {
		if (this._isMenuCurrent) {
			this._hideMenu();
		} else {
			this._hideTagForm();
		}
	}

	private _bindMouseEvents(e : DOMElement) : void {
		e
			.on(
				DOMElementEvents.MouseEnter,
				(e) => {
					this._isOverSubMenu = true;
				}
			)
			.on(
				DOMElementEvents.MouseLeave,
				(e) => {
					this._isOverSubMenu = false;
				}
			);
	}

	//endregion Private Methods
	
	//region Public Methods
	
	//endregion Public Methods
	
	//endregion Methods
}
