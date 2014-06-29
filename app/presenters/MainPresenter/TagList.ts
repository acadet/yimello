/// <reference path="../../dependencies.ts" />

class TagList {
	//region Fields
	
	private _destList : DOMElement;
	private _mostPopularTrigger : DOMElement;
	private _searchTab : DOMElement;
	private _subscriber : ITagListSubscriber;
	private _currentSelectedTab : DOMElement;

	//endregion Fields
	
	//region Constructors
	
	constructor(sub : ITagListSubscriber) {
		this._subscriber = sub;
		this._destList = DOMTree.findSingle('.js-tag-list');
		this._mostPopularTrigger = this._destList.findSingle('.js-most-popular');
		this._currentSelectedTab = this._mostPopularTrigger;
	}

	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	private _buildDOMTag(tag : TagDAO) : DOMElement {
		var s : StringBuffer;
		var e : DOMElement;

		s = new StringBuffer('<li>');
		s.append('<img class="js-tag-delete" src="assets/img/trash-icon.png" />');
		s.append('<img class="js-tag-edit" src="assets/img/edit-icon.png" />');
		s.append('<p>');
		s.append(tag.getLabel());
		s.append('</p></li>');

		e = DOMElement.fromString(s.toString());
		e.setData('id', tag.getId());

		return e;
	}

	private _buildNoEditionDOMTag(mostPop : boolean) : DOMElement {
		var s : StringBuffer;
		var e : DOMElement;

		s = new StringBuffer('<li><p>');
		if (mostPop) {
			s.append('Most popular');
		} else {
			s.append('Search results');
		}
		s.append('</p></li>');

		e = DOMElement.fromString(s.toString());
		if (mostPop) {
			e.addClass('js-most-popular');
		} else {
			e.addClass('js-search-tab');
		}

		return e;
	}

	private _buildMostPopularTag() : DOMElement {
		return this._buildNoEditionDOMTag(true);
	}

	private _buildSearchTab() : DOMElement {
		var e : DOMElement = this._buildNoEditionDOMTag(false);
		e.setCss({ display : 'none' });
		return e;
	}

	private _setActive(e : DOMElement) : void {
		if (TSObject.exists(this._currentSelectedTab)) {
			this._currentSelectedTab.removeClass('active');
		}

		e.addClass('active');
		this._currentSelectedTab = e;
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
					} else if (e.hasClass('js-search-tab')) {
						target.on(
							DOMElementEvents.Click,
							(arg) => {
								this._subscriber.onSearchTabSelection();
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
									this._subscriber.askingForTagUpdate(e.getData('id'));
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

					if (!e.hasClass('js-most-popular') && !e.hasClass('js-search-tab')) {
						e.findSingle('.js-tag-delete').off(DOMElementEvents.Click);
						e.findSingle('.js-tag-edit').off(DOMElementEvents.Click);
					}
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

		if (this.getCurrentTagId() === id) {
			this._currentSelectedTab = null;
		}

		this._subscriber.onTagDeletion();
	}

	//endregion Private Methods
	
	//region Public Methods

	resetList() : void {
		var mostPop : boolean = false;
		var searchTab : boolean = false;
		var currentId : string;

		if (TSObject.exists(this._currentSelectedTab)) {
			if (this.isMostPopularSelected()) {
				mostPop = true;
			} else if (this.isSearchTabSelected()) {
				searchTab = true;
			} else {
				currentId = this.getCurrentTagId();
			}
		}

		this._unsubscribeTriggers();
		this._destList.getChildren().forEach(e => e.remove());

		this._searchTab = this._buildSearchTab();
		this._destList.append(this._searchTab);
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
				if (TSObject.exists(this._currentSelectedTab)) {
					if (mostPop) {
						this._setActive(this._mostPopularTrigger);
						this._currentSelectedTab = this._mostPopularTrigger;
					} else if (searchTab) {
						this._setActive(this._searchTab);
						this._currentSelectedTab = this._searchTab;
					} else {
						var e : DOMElement;

						e = this._destList
							.getChildren()
							.findFirst(e => e.getData('id') === currentId);
						this._setActive(e);
						this._currentSelectedTab = e;
					}
				} else {
					this._setActive(this._mostPopularTrigger);
					this._currentSelectedTab = this._mostPopularTrigger;
				}
			}
		);
	}

	selectMostPopular() : void {
		this._setActive(this._mostPopularTrigger);
	}

	enableSearchTab() : void {
		this._searchTab.setCss({ display : 'block'});
		this._setActive(this._searchTab);
	}

	disableSearchTab() : void {
		this._searchTab.setCss({ display : 'none'});
	}

	isMostPopularSelected() : boolean {
		return this._currentSelectedTab.hasClass('js-most-popular');
	}

	isSearchTabSelected() : boolean {
		return this._currentSelectedTab.hasClass('js-search-tab');
	}

	getCurrentTagId() : string {
		return this._currentSelectedTab.getData('id');
	}

	//endregion Public Methods
	
	//endregion Methods
}
