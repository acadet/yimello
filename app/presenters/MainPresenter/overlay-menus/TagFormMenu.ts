/// <reference path="../../../dependencies.ts" />

class TagFormMenu extends OverlayMenu {
	//region Fields

	private _labelInput : DOMElement;

	private _updatingTag : Tag;

	private _listener : ITagFormMenuListener;
	private _notifier : INotifier;
	
	//endregion Fields
	
	//region Constructors

	constructor(listener : ITagFormMenuListener, notifier : INotifier) {
		super(DOMTree.findSingle('.js-tag-form-menu-wrapper'));

		this._listener = listener;
		this._notifier = notifier;

		this._setUp();
	}
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods

	private _setUp() : void {
		var form : DOMElement;

		form = DOMTree.findSingle('.js-tag-form-menu form');

		form.on(
			DOMElementEvents.Submit,
			(args) => {
				args.preventDefault();

				if (TSObject.exists(this._updatingTag)) {
					this._update();
				} else {
					this._add();
				}
			}
		);

		this._labelInput = form.findSingle('input[name="label"]');

		form
			.findSingle('.js-tag-form-cancel')
			.on(
				DOMElementEvents.Click,
				(args) => {
					super.hide();
				}
			);

		DOMTree
			.findSingle('.js-tag-form-trigger')
			.on(
				DOMElementEvents.Click,
				(args) => {
					this.prepareAddition();
				}
			);
	}

	private _add() : void {
		var value : string;

		value = this._labelInput.getValue();
		BusinessFactory.buildTag(
			(business) => {
				var t : Tag;

				t = new Tag();
				t.setLabel(value);

				business.add(
					t,
					(outcome) => {
						this._listener.onTagAddition();
						super.hide();
					},
					(error) => this._notifier.alert(error)
				);
			}
		);
	}

	private _update() : void {
		var value : string;

		value = this._labelInput.getValue();
		if (value === this._updatingTag.getLabel()) {
			this._listener.onTagUpdate();
			super.hide();
			return;
		}

		BusinessFactory.buildTag(
			(business) => {

				this._updatingTag.setLabel(value);

				business.update(
					this._updatingTag,
					(outcome) => {
						this._listener.onTagUpdate();
						super.hide();
					},
					(error) => this._notifier.alert(error)
				);
			}
		);
	}
	
	//endregion Private Methods
	
	//region Public Methods

	prepareAddition() : void {
		this._updatingTag = null;
		this._labelInput.setValue('');
		super.show();
	}

	prepareUpdate(tag : Tag) : void {
		this._updatingTag = tag;
		this._labelInput.setValue(tag.getLabel());
		super.show();
	}
	
	//endregion Public Methods
	
	//endregion Methods
}
