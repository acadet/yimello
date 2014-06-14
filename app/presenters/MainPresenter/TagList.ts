/// <reference path="../../dependencies.ts" />

class TagList {
	//region Fields
	
	private _destList : DOMElement;
	private _mostPopularTrigger : DOMElement;
	private _subscriber : ITagListSubscriber;

	//endregion Fields
	
	//region Constructors
	
	constructor(sub : ITagListSubscriber) {
		this._subscriber = sub;
		this._destList = DOMTree.findSingle('.js-tag-list');
		this._mostPopularTrigger = this._destList.findSingle('.js-most-popular');
		this._subscribeTriggers();
	}

	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	private _buildDOMTag(tag : TagDAO) : DOMElement {
		var e : DOMElement;

		e = DOMElement.fromString('<li>' + tag.getLabel() + '</li>');
		e.setData('id', tag.getId());

		return e;
	}

	private _subscribeTriggers() : void {
		this._destList
			.getChildren()
			.forEach(
				(e) => {
					if (e.hasClass('js-most-popular')) {
						e.on(
							DOMElementEvents.Click,
							(arg) => {
								this._subscriber.onMostPopularSelection();
							}
						);
					} else {
						e.on(
							DOMElementEvents.Click,
							(arg) => {
								this._subscriber.onTagSelection(e.getData('id'));
							}
						);
					}
				}
			);
	}

	//endregion Private Methods
	
	//region Public Methods
	
	reset() : void {
		this._destList.getChildren().forEach(e => e.off(DOMElementEvents.Click));
		this._destList.setHTML('');

		this._mostPopularTrigger = DOMElement.fromString('<li>Most popular</li>');
		this._mostPopularTrigger.addClass('js-most-popular');
		this._destList.append(this._mostPopularTrigger);

		TagDAO.sortByLabelAsc(
			(outcome) => {
				outcome.forEach(
					(e) => {
						this._destList.append(this._buildDOMTag(e));
					}
				);
				this._subscribeTriggers();
			}
		);
	}

	//endregion Public Methods
	
	//endregion Methods
}
