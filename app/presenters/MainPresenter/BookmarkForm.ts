/// <reference path="../../dependencies.ts" />

class BookmarkForm {
	//region Fields
	
	/**
	 * URL input
	 */
	private _urlInput : DOMElement;

	/**
	 * Title input
	 */
	private _titleInput : DOMElement;

	/**
	 * Description input
	 */
	private _descriptionInput : DOMElement;

	/**
	 * Tags input
	 */
	private _tagsInput : DOMElement;

	/**
	 * List where tags are displayed
	 */
	private _tagList : DOMElement;

	/**
	 * DataList where tags are appended (suggested tags for user)
	 */
	private _tagDataList : DOMElement;

	private _bookmarkIcon : DOMElement;

	private _deleteButton : DOMElement;

	/**
	 * List of current tags
	 */
	private _currentTags : IList<Tag>;

	/**
	 * Subscriber to form event
	 */
	private _subscriber : IBookmarkFormSubscriber;

	private _isUpdating : boolean;

	private _currentUpdatedBookmark : Bookmark;

	private _notificationObj : NotificationMessage;

	//endregion Fields
	
	//region Constructors
	
	constructor(subscriber : IBookmarkFormSubscriber, notificationObj : NotificationMessage) {
		var wrapper : DOMElement = DOMTree.findSingle('.js-bookmark-form-wrapper');

		this._subscriber = subscriber;
		this._notificationObj = notificationObj;

		// First, grab all dom elements
		this._urlInput = wrapper.findSingle('input[name="url"]');
		this._titleInput = wrapper.findSingle('input[name="title"]');
		this._descriptionInput = wrapper.findSingle('textarea[name="description"]');
		this._tagsInput = wrapper.findSingle('input[name="tags"]');
		this._tagList = wrapper.findSingle('.js-form-tag-list');
		this._tagDataList = wrapper.findSingle('.js-tag-suggestions');
		this._deleteButton = wrapper.findSingle('.js-delete-button');
		this._bookmarkIcon = wrapper.findSingle('.js-bookmark-icon');

		// Cancel button
		var cancelTrigger : DOMElement = wrapper.findSingle('.js-cancel-trigger');
		cancelTrigger.verticalCenterizeWithMargin();
		cancelTrigger.on(
				DOMElementEvents.Click,
				(e) => {
					this._subscriber.onBookmarkCancellation();
				}
			);

		// Save button
		wrapper
			.findSingle('.js-save-button')
			.on(
				DOMElementEvents.Click,
				(e) => {
					if (this._isUpdating) {
						this._onUpdate();
					} else {
						this._onAdd();
					}
				}
			);

		// Delete button
		this._deleteButton.on(
			DOMElementEvents.Click,
			(e) => {
				this._onDelete();
			}
		);

		this._bookmarkIcon.on(
			DOMElementEvents.Click,
			(e) => {
				if (this._isUpdating) {
					BusinessFactory.buildBookmark(
						(business) => {
							this._currentUpdatedBookmark.setViews(this._currentUpdatedBookmark.getViews() + 1);
							// TODO: test errors
							business.update(this._currentUpdatedBookmark);
							NodeWindow.openExternal(this._currentUpdatedBookmark.getURL());
						}
					);
				}
			}
		);

		this._prepareTagsInput();
		this._prepareURLInput();
	}

	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	private _engineFormInputs() : boolean {
		var url : string = this._urlInput.getValue();
		var title : string = this._titleInput.getValue();

		this._urlInput.removeClass('error');
		this._titleInput.removeClass('error');
		this._tagsInput.removeClass('error');

		// Test if all values have been provided
		if (!FormHelper.isFilled(url)) {
			this._notificationObj.alert('Your bookmark will be nicer with an address');
			this._urlInput.addClass('error');
			return false;
		}

		if (!FormHelper.isFilled(title)) {
			this._notificationObj.alert('Sorry, but a title is needed too!');
			this._titleInput.addClass('error');
			return false;
		}

		if (this._currentTags.getLength() < 1) {
			this._notificationObj.alert('Oh no! Don\'t let your bookmark alone! Introduce him some tags');
			this._tagsInput.addClass('error');
			return false;
		}

		return true;
	}

	/**
	 * Called when user asks for saving
	 */
	private _onAdd() : void {
		var b : Bookmark;
		var url : string = this._urlInput.getValue();
		var title : string = this._titleInput.getValue();
		var description : string = this._descriptionInput.getValue();

		if (!this._engineFormInputs()) {
			return;
		}

		b = new Bookmark();
		b
			.setURL(url)
			.setTitle(title)
			.setDescription(description);

		// Process: add new bookmark
		// Then save new tags
		// Finally bind tags to bookmark
		BusinessFactory.buildBookmark(
			(bkBusiness) => {
				bkBusiness.add(
					b,
					(outcome) => {
						b = outcome;

						BusinessFactory.buildTag(
							(tagBusiness) => {
								tagBusiness.merge(
									this._currentTags,
									(outcome) => {
										BusinessFactory.buildTagBookmark(
											(tagBkBusiness) => {
												tagBkBusiness.bindTags(
													b,
													outcome,
													() => {
														this._subscriber.onBookmarkAddition();
													},
													this._notificationObj.alert
												);
											}
										);
									},
									this._notificationObj.alert
								);
							}
						);
					},
					this._notificationObj.alert
				);
			}
		);
	}

	private _onUpdate() : void {
		var url : string = this._urlInput.getValue();
		var title : string = this._titleInput.getValue();
		var description : string = this._descriptionInput.getValue();

		if (!this._engineFormInputs()) {
			return;
		}

		this._currentUpdatedBookmark
			.setURL(url)
			.setTitle(title)
			.setDescription(description);

		// TODO: replace by a single function
		BusinessFactory.buildBookmark(
			(bkBusiness) => {
				bkBusiness.update(
					this._currentUpdatedBookmark,
					(outcome) => {
						this._currentUpdatedBookmark = outcome;

						BusinessFactory.buildTag(
							(tagBusiness) => {
								tagBusiness.merge(
									this._currentTags,
									(outcome) => {
										BusinessFactory.buildTagBookmark(
											(tagBkBusiness) => {
												tagBkBusiness.updateTagBinding(
													this._currentUpdatedBookmark,
													outcome,
													() => {
														this._subscriber.onBookmarkUpdate();
													},
													this._notificationObj.alert
												);
											}
										);
									},
									this._notificationObj.alert
								);
							}
						);
					},
					this._notificationObj.alert
				);
			}
		);
	}

	private _onDelete() : void {
		var isOk : boolean;

		if (!this._isUpdating) {
			return;
		}

		isOk = confirm('Do you want to remove this bookmark?');
		if (!isOk) {
			return;
		}

		BusinessFactory.buildBookmark(
			(business) => {
				business.delete(
					this._currentUpdatedBookmark,
					() => {
						this._subscriber.onBookmarkDeletion();
					},
					this._notificationObj.alert
				);
			}
		);
	}

	/**
	 * Called when a new tag is added by user
	 * @param {string} value [description]
	 */
	private _addTag(value : string) : void {
		var tag : Tag;
		var e : DOMElement;
		var test : Tag;
		var s : StringBuffer;

		// Do nothing with empty strings
		if (StringHelper.trim(value) === '') {
			return;
		}

		// Avoid harmful values
		value = SecurityHelper.disarm(value);

		// Test if tag is not already in list
		test = this._currentTags.findFirst(
			(o) => {
				return StringHelper.compare(o.getLabel(), value);
			}
		);

		if (test !== null) {
			// A similar value is already in list, do nothing
			return;
		}

		tag = new Tag();
		tag.setLabel(value);
		this._currentTags.add(tag);

		s = new StringBuffer('<li><p>' + tag.getLabel() + '</p>');
		s.append('<img src="assets/img/x-mark-icon-2.png" data-label="' + tag.getLabel() + '" /></li>');
		e = DOMElement.fromString(s.toString());

		e
			.findSingle('img')
			.on(
				DOMElementEvents.Click,
				(arg) => {
					this._currentTags.removeIf(
						e => StringHelper.compare(arg.getTarget().getData('label'), e.getLabel())
					);
					e.remove();
				}
			);

		this._tagList.append(e);
	}

	/**
	 * Binds events to tag input
	 */
	private _prepareTagsInput() : void {
		this._tagsInput.on(
			DOMElementEvents.KeyDown,
			(e) => {
				if (e.getWhich() === 13) {
					this._addTag(e.getTarget().getValue());
					e.getTarget().setValue('');
				}
			}
		);
	}

	/**
	 * Binds events to url input
	 */
	private _prepareURLInput() : void {
		var callback : DOMElementEventHandler;

		callback = (e) => {
			var title : string;
			var description : string;

			title = this._titleInput.getValue();
			description = this._descriptionInput.getValue();

			if (FormHelper.isFilled(title) || FormHelper.isFilled(description)) {
				// Fill title and description only if they are not already
				// filled
				return;
			}

			// Get details from provided url
			URLDetailsProvider.getDetails(
				e.getTarget().getValue(),
				(title, description) => {
					this._titleInput.setValue(title);
					this._descriptionInput.setValue(description);

					this._bookmarkIcon.setAttribute('src', FaviconHelper.getSrc(e.getTarget().getValue()));
				},
				(type, error) => {
					// TODO
				}
			);
		};

		// Handler can be triggered on blur or enter key pressed
		this._urlInput.on(DOMElementEvents.Blur, callback);
		this._urlInput.on(
			DOMElementEvents.KeyDown,
			(e) => {
				if (e.getWhich() === 13) {
					callback(e);
				}
			}
		);
	}

	private _reset() : void {
		// Reset current tag list
		this._currentTags = new ArrayList<Tag>();
		this._tagList.getChildren().forEach(e => e.remove());

		// Reset tag suggestions
		this._tagDataList.getChildren().forEach(e => e.remove());
		BusinessFactory.buildTag(
			(business) => {
				business.sortByLabelAsc(
					(outcome) => {
						outcome.forEach(
							(tag)  => {
								var e : DOMElement;
								e = DOMElement.fromString('<option value="' + tag.getLabel() + '"></option>');

								this._tagDataList.append(e);
							}
						);
					}
				);
			}
		);

		// Reset inputs
		this._urlInput.setValue('');
		this._titleInput.setValue('');
		this._descriptionInput.setValue('');
		this._tagsInput.setValue('');

		this._deleteButton.setCss({display : 'none'});
	}

	//endregion Private Methods
	
	//region Public Methods
	
	resetToAdd() : void {
		this._reset();
		this._isUpdating = false;

		// Reset all fields
		this._urlInput.setValue('');
		this._titleInput.setValue('');
		this._descriptionInput.setValue('');

		this._bookmarkIcon.setAttribute('src', FaviconHelper.getDefaultSrc());
	}

	resetToUpdate(bookmark : Bookmark) : void {
		this._reset();
		this._isUpdating = true;
		this._currentUpdatedBookmark = bookmark;

		this._urlInput.setValue(bookmark.getURL());
		this._titleInput.setValue(bookmark.getTitle());
		this._descriptionInput.setValue(bookmark.getDescription());

		this._deleteButton.setCss({display : 'inline-block'});
		this._bookmarkIcon.setAttribute('src', FaviconHelper.getSrc(bookmark.getURL()));

		BusinessFactory.buildTagBookmark(
			(business) => {
				business.sortTagsByLabelAscForBookmark(
					bookmark,
					(outcome) => {
						outcome.forEach(e => this._addTag(e.getLabel()));
					}
				);
			}
		);
	}

	//endregion Public Methods
	
	//endregion Methods
}
