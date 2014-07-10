/// <reference path="../../../dependencies.ts" />

class TagFormSubMenu extends SubMenu {
	//region Fields

	private _input : DOMElement;
	private _isUpdating : boolean;
	private _currentUpdatedTag : TagDAO;

	//endregion Fields
	
	//region Constructors

	constructor(overlay : DOMElement, owner : ISubMenuOwner) {
		super(overlay.findSingle('.js-tag-form-wrapper'), owner);

		this._isUpdating = false;
		this._input = this.getTarget().findSingle('input[name="tag"]');
		this
			.getTarget()
			.findSingle('.js-cancel-tag-button')
			.on(
				DOMElementEvents.Click,
				(e) => {
					this.hide();
					this.getOwner().onTagCancellation();
				}
			);

		this
			.getTarget()
			.findSingle('.js-save-tag-button')
			.on(
				DOMElementEvents.Click,
				(e) => {
					if (this._isUpdating) {
						this._update();
					} else {
						this._add();
					}
				}
			);
		this._input.on(
			DOMElementEvents.KeyDown,
			(e) => {
				if (e.getWhich() === 13) {
					if (this._isUpdating) {
						this._update();
					} else {
						this._add();
					}
				}
			}
		);
	}

	//endregion Constructors
	
	//region Methods
	
	//region Private Methods

	private _add() : void {
		var label : string;

		label = this._input.getValue();

		if (!FormHelper.isFilled(label)) {
			MainPresenterMediator.showError('Um. I guess your forgot something, don\'t you?');
			return;
		}

		PresenterMediator
			.getTagBusiness()
			.isAlreadyExisting(
				label,
				(success) => {
					if (success) {
						var tag : TagDAO;

						tag = new TagDAO();
						tag.setLabel(label);
						PresenterMediator
							.getTagBusiness()
							.add(
								tag,
								(outcome) => {
									this.hide();
									this.getOwner().onTagAddition();
								},
								MainPresenterMediator.showError
							);
					} else {
						MainPresenterMediator.showError('Unfortunately a tag with same label is already existing. Please use another one');
					}
				}
			);
	}

	private _update() : void {
		var label : string;
		var areEqual : boolean;

		label = this._input.getValue();

		if (!FormHelper.isFilled(label)) {
			MainPresenterMediator.showError('Um. I guess your forgot something, don\'t you?');
			return;
		}
		
		areEqual =
			PresenterMediator
				.getTagBusiness()
				.compare(
					label,
					this._currentUpdatedTag.getLabel()
				);

		if (areEqual) {
			// Tag has not been edited, do nothing
			this.hide();
			this.getOwner().onTagUpdate();
			return;
		}

		PresenterMediator
			.getTagBusiness()
			.isAlreadyExisting(
				label,
				(success) => {
					if (success) {
						this._currentUpdatedTag.setLabel(label);
						PresenterMediator
							.getTagBusiness()
							.update(
								this._currentUpdatedTag,
								(outcome) => {
									this.hide();
									this.getOwner().onTagUpdate();
								},
								MainPresenterMediator.showError
							);
					} else {
						MainPresenterMediator.showError('Unfortunately a tag with same label is already existing. Please use another one');
					}
				}
			);
	}

	//endregion Private Methods
	
	//region Public Methods

	showToAdd() : void {
		this._input.setValue('');
		this._isUpdating = false;
		super.show();
	}

	showToUpdate(tag : TagDAO) : void {
		this._input.setValue(tag.getLabel());
		this._isUpdating = true;
		this._currentUpdatedTag = tag;
		super.show();
	}

	//endregion Public Methods
	
	//endregion Methods
}
