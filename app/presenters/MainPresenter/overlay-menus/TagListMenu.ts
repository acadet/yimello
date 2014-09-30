/// <reference path="../../../dependencies.ts" />

class TagListMenu extends OverlayMenu implements ITagContextMenuListener {
	//region Fields

	private _listener : ITagListMenuListener;
	private _ctxtMenu : TagContextMenu;
	
	//endregion Fields
	
	//region Constructors

	constructor(listener : ITagListMenuListener) {
		super(DOMTree.findSingle('.js-tag-list-menu-wrapper'));

		this._listener = listener;
		this._ctxtMenu = new TagContextMenu(this);
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
											DOMElementEvents.MouseDown,
											(args) => {
												if (args.getWhich() === 3) {
													this._ctxtMenu.show(e.getData('id'), args.getPageY(), args.getPageX());
												} else if (args.getWhich() === 1) {
													var t : Tag;

													t = new Tag();
													t.setId(e.getData('id'));
													t.setLabel(e.getText());
													this._listener.onTagSelection(t);
												}
											}
										);
									}
								);
							menu.on(
								DOMElementEvents.MouseDown,
								(args) => {
									if (args.getWhich() === 1 && !this._ctxtMenu.isVisible()) {
										super.hide();
									}
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

	//region ITagContextMenuListener

	requestEdition(id : string) : void {
		this._listener.onTagEditionRequest(id);
	}

	requestDeletion(id : string) : void {
		this._listener.onTagDeletionRequest(id);
	}

	//endregion ITagContextMenuListener

	//endregion Public Methods
	
	//endregion Methods
}
