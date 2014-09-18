/// <reference path="../../../dependencies.ts" />

class MenuControl implements ISubMenuOwner {
	//region Fields

	private _overlay : DOMElement;

	private _tagForm : TagFormSubMenu;
	private _menu : MenuSubMenu;

	private _subscriber : IMenuControlSubscriber;

	//endregion Fields
	
	//region Constructors
	
	constructor(subscriber : IMenuControlSubscriber) {
		this._overlay = DOMTree.findSingle('.js-overlay');
		this._tagForm = new TagFormSubMenu(this._overlay, this);
		this._menu = new MenuSubMenu(this._overlay, this);
		this._subscriber = subscriber;

		DOMTree
			.findSingle('.js-menu-trigger')
			.on(
				DOMElementEvents.Click,
				(e) => {
					this._showOverlay();
					this._menu.show();
				}
			);
		DOMTree
			.findSingle('.js-tag-form-trigger')
			.on(
				DOMElementEvents.Click,
				(e) => {
					this._showOverlay();
					this._tagForm.showToAdd();
				}
			);

		this._overlay.on(
			DOMElementEvents.Click,
			(e) => {
				this._hideCurrentSubMenu();
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
			800
		);
	}

	private _hideOverlay() : void {
		this._overlay.animate(
			{
				opacity : 0
			},
			800,
			(e) => {
				this._overlay.setCss({
					zIndex : 0,
					display : 'none'
				});
			}
		);
	}

	private _hideCurrentSubMenu() : void {
		if (this._tagForm.isDisplayed()) {
			if (!this._tagForm.isHovering()) {
				this._tagForm.hide();
				this._hideOverlay();
			}
		} else {
			if (!this._menu.isHovering()) {
				this._menu.hide();
				this._hideOverlay();
			}
		}
	}

	//endregion Private Methods
	
	//region Public Methods

	onTagAddition() : void {
		this._hideOverlay();
		this._subscriber.onTagAddition();
	}

	onTagUpdate() : void {
		this._hideOverlay();
		this._subscriber.onTagUpdate();
	}

	onTagCancellation() : void {
		this._hideOverlay();
		this._subscriber.onTagCancellation();
	}

	prepareForTagUpdate(tag : Tag) : void {
		this._showOverlay();
		this._tagForm.showToUpdate(tag);
	}

	hide() : void {
		this._hideOverlay();
	}

	//endregion Public Methods
	
	//endregion Methods
}
