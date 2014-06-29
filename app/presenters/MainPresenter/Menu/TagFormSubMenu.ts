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

		label = StringHelper.trim(this._input.getValue());
		if (label === '') {
			alert('A tag must have a label');
			return;
		}

		label = SecurityHelper.disarm(label);

		// TODO : create business method
		TagDAO.findByLabel(
			label,
			(outcome) => {
				if (TSObject.exists(outcome)) {
					alert('A tag with same label is already existing');
				} else {
					var tag : TagDAO = new TagDAO();
					tag.setLabel(label);

					// TODO : handle errors when adding
					tag.add();
					this.hide();
					this.getOwner().onTagAddition();
				}
			}
		);
	}

	private _update() : void {
		var label : string;

		label = StringHelper.trim(this._input.getValue());
		if (label === '') {
			alert('A tag must have a label');
			return;
		}
		
		label = SecurityHelper.disarm(label);
		
		if (StringHelper.compare(label, this._currentUpdatedTag.getLabel())) {
			// Tag has not been edited, do nothing
			this.hide();
			this.getOwner().onTagUpdate();
			return;
		}

		// TODO : create business method
		TagDAO.findByLabel(
			label,
			(outcome) => {
				if (TSObject.exists(outcome)) {
					alert('A tag with same label is already existing');
				} else {
					this._currentUpdatedTag.setLabel(label);
					// TODO : handle errors when updating
					this._currentUpdatedTag.update();
					this.hide();
					this.getOwner().onTagUpdate();
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
