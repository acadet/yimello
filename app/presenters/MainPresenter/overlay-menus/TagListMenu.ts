/// <reference path="../../../dependencies.ts" />

class TagListMenu extends OverlayMenu {
	//region Fields

	private _listener : ITagListMenuListener;
	
	//endregion Fields
	
	//region Constructors

	constructor(listener : ITagListMenuListener) {
		super(DOMTree.findSingle('.js-tag-list-menu-wrapper'));
		this._listener = listener;
		this._setUp();
	}
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods

	private _setUp() : void {
		var f : Action<DOMElementEventObject>;
		var menu : DOMElement;

		menu = DOMTree.findSingle('.js-tag-list-menu');

		f = (args) => {
			BusinessFactory.buildTag(
				(business) => {
					business.sortByLabelAsc(
						(outcome) => {
							menu.setHTML(TagListTemplate.build(outcome));
							menu
								.findSingle('.js-most-popular-trigger')
								.on(
									DOMElementEvents.Click,
									(args) => {
										this._listener.onMostPopularSelection();
										super.hide();
									}
								);
							menu
								.find('li')
								.forEach(
									(e) => {
										e.on(
											DOMElementEvents.Click,
											(args) => {
												var t : Tag;

												t = new Tag();
												t.setId(e.getData('id'));
												t.setLabel(e.getText());
												this._listener.onTagSelection(t);
											}
										);
									}
								);
							menu.on(
								DOMElementEvents.Click,
								(args) => {
									super.hide();
								}
							);
							super.show();
						}
					);
				}
			);
		};

		DOMTree
			.findSingle('.js-tag-list-trigger')
			.on(
				DOMElementEvents.Click,
				f
			);
		DOMTree
			.findSingle('.js-current-tag')
			.on(
				DOMElementEvents.Click,
				f
			);
	}
	
	//endregion Private Methods
	
	//region Public Methods

	//endregion Public Methods
	
	//endregion Methods
}
