/// <reference path="../../dependencies.ts" />

class TagList {
	//region Fields
	
	private _destList : DOMElement;
	private _mostPopularTrigger : DOMElement;
	private _subscriber : ITagListSubscriber;
	private _currentSelectedTag : DOMElement;

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
	
	private _buildDOMTag(tag : TagDAO, mostPop : boolean = false) : DOMElement {
		var s : StringBuffer;
		var e : DOMElement;

		s = new StringBuffer('<li>');
		if (!mostPop) {
			s.append('<img class="js-tag-delete" src="assets/img/trash-icon.png" />');
			s.append('<img class="js-tag-edit" src="assets/img/edit-icon.png" />');
		}
		s.append('<p>');
		if (mostPop) {
			s.append('Most popular');
		} else {
			s.append(tag.getLabel());
		}
		s.append('</p>');
		s.append('</li>');

		e = DOMElement.fromString(s.toString());
		if (mostPop) {
			e.addClass('js-most-popular');
		} else {
			e.setData('id', tag.getId());
		}

		return e;
	}

	private _buildMostPopularTag() : DOMElement {
		return this._buildDOMTag(null, true);
	}

	private _setActive(e : DOMElement) : void {
		if (TSObject.exists(this._currentSelectedTag)) {
			this._currentSelectedTag.removeClass('active');
		}

		e.addClass('active');
		this._currentSelectedTag = e;
	}

	private _subscribeTriggers() : void {
		this._destList
			.getChildren()
			.forEach(
				(e) => {
					var target : DOMElement;

					target = e.findSingle('> p');

					if (e.hasClass('js-most-popular')) {
						target.on(
							DOMElementEvents.Click,
							(arg) => {
								this._subscriber.onMostPopularSelection();
								this._setActive(e);
							}
						);
					} else {
						target.on(
							DOMElementEvents.Click,
							(arg) => {
								this._subscriber.onTagSelection(e.getData('id'));
								this._setActive(e);
							}
						);

						e
							.findSingle('.js-tag-delete')
							.on(
								DOMElementEvents.Click,
								(arg) => {
									this._deleteTag(e.getData('id'));
								}
							);
						e
							.findSingle('.js-tag-edit')
							.on(
								DOMElementEvents.Click,
								(arg) => {
									this._subscriber.onTagUpdate(e.getData('id'));
								}
							);
					}
				}
			);
	}

	private _unsubscribeTriggers() : void {
		this._destList
			.getChildren()
			.forEach(
				(e) => {
					e
						.findSingle('> p')
						.off(DOMElementEvents.Click);
				}
			);
	}

	private _deleteTag(id : string) : void {
		var tag : TagDAO;
		var isOk : boolean;

		isOk = confirm('Do you want to remove this tag?');
		if (!isOk) {
			return;
		}

		tag = new TagDAO();
		tag.setId(id);
		// TODO : test success
		tag.delete();
		this.reset();
		this._subscriber.onTagDeletion();
	}

	//endregion Private Methods
	
	//region Public Methods
	
	reset() : void {
		this._unsubscribeTriggers();
		this._destList.getChildren().forEach(e => e.remove());

		this._mostPopularTrigger = this._buildMostPopularTag();
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

		this._setActive(this._mostPopularTrigger);
	}

	//endregion Public Methods
	
	//endregion Methods
}
