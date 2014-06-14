/// <reference path="../../dependencies.ts" />

class BookmarkForm extends TSObject {
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

	/**
	 * List of current tags
	 */
	private _currentTags : IList<TagDAO>;

	/**
	 * Subscriber to form event
	 */
	private _subscriber : IBookmarkFormSubscriber;

	private _isUpdating : boolean;

	private _currentUpdatedBookmark : BookmarkDAO;

	//endregion Fields
	
	//region Constructors
	
	constructor(subscriber : IBookmarkFormSubscriber) {
		super();
		var wrapper : DOMElement = DOMTree.findSingle('.js-bookmark-form-wrapper');

		this._subscriber = subscriber;

		// First, grab all dom elements
		this._urlInput = wrapper.findSingle('input[name="url"]');
		this._titleInput = wrapper.findSingle('input[name="title"]');
		this._descriptionInput = wrapper.findSingle('textarea[name="description"]');
		this._tagsInput = wrapper.findSingle('input[name="tags"]');
		this._tagList = wrapper.findSingle('.js-form-tag-list');
		this._tagDataList = wrapper.findSingle('.js-tag-suggestions');

		// Cancel button
		wrapper
			.findSingle('.js-cancel-button')
			.on(
				DOMElementEvents.Click,
				(e) => {
					this._subscriber.onFormCancel();
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

		this._prepareTagsInput();
		this._prepareURLInput();
	}

	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	/**
	 * Called when user asks for saving
	 */
	private _onAdd() : void {
		var b : BookmarkDAO;
		var url : string = this._urlInput.getValue();
		var title : string = this._titleInput.getValue();
		var description : string = this._descriptionInput.getValue();

		// Test if all values have been provided
		if (!FormHelper.isFilled(url)) {
			alert('URL field must be filled');
			return;
		}

		if (!FormHelper.isFilled(title)) {
			alert('title field must be filled');
			return;
		}

		if (this._currentTags.getLength() < 1) {
			alert('Tags must be specified');
			return;
		}

		b = new BookmarkDAO();
		b
			.setURL(url)
			.setTitle(title)
			.setDescription(description);

		// Process: add new bookmark
		// Then save new tags
		// Finally bind tags to bookmark
		PresenterMediator
			.getBookmarkBusiness()
			.add(
				b,
				(outcome) => {
					b = outcome;

					PresenterMediator
						.getTagBusiness()
						.merge(
							this._currentTags,
							(outcome) => {
								PresenterMediator
									.getBookmarkBusiness()
									.bindTags(
										b,
										outcome,
										(success) => {
											if (success) {
												this._subscriber.onFormSave();
											} else {
												alert('An error has occured while saving bookmark');
											}
										}
									);
							}
						);
				}
			);
	}

	private _onUpdate() : void {
		var url : string = this._urlInput.getValue();
		var title : string = this._titleInput.getValue();
		var description : string = this._descriptionInput.getValue();

		// Test if all values have been provided
		if (!FormHelper.isFilled(url)) {
			alert('URL field must be filled');
			return;
		}

		if (!FormHelper.isFilled(title)) {
			alert('title field must be filled');
			return;
		}

		if (this._currentTags.getLength() < 1) {
			alert('Tags must be specified');
			return;
		}

		this._currentUpdatedBookmark
			.setURL(url)
			.setTitle(title)
			.setDescription(description);

		PresenterMediator
			.getBookmarkBusiness()
			.update(
				this._currentUpdatedBookmark,
				(outcome) => {
					this._currentUpdatedBookmark = outcome;

					PresenterMediator
						.getTagBusiness()
						.merge(
							this._currentTags,
							(outcome) => {
								PresenterMediator
									.getBookmarkBusiness()
									.updateTagBinding(
										this._currentUpdatedBookmark,
										outcome,
										(success) => {
											if (success) {
												this._subscriber.onFormSave();
											} else {
												alert('An error occurend while updating bookmark');
											}
										}
									);
							}
						);
				}
			);
	}

	/**
	 * Called when a new tag is added by user
	 * @param {string} value [description]
	 */
	private _addTag(value : string) : void {
		var tag : TagDAO;
		var e : DOMElement;
		var test : TagDAO;

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

		tag = new TagDAO();
		tag.setLabel(value);
		this._currentTags.add(tag);

		e = DOMElement.fromString('<li>' + tag.getLabel() + '</li>');

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

			if (!TSObject.exists(title) || title !== ''
				|| !TSObject.exists(description) || description !== '') {
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
		this._currentTags = new ArrayList<TagDAO>();
		this._tagList.setHTML('');

		// Reset tag suggestions
		this._tagDataList.setHTML('');
		TagDAO.sortByLabelAsc(
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

	//endregion Private Methods
	
	//region Public Methods
	
	resetToAdd() : void {
		this._reset();
		this._isUpdating = false;

		// Reset all fields
		this._urlInput.setValue('');
		this._titleInput.setValue('');
		this._descriptionInput.setValue('');
	}

	resetToUpdate(bookmark : BookmarkDAO) : void {
		this._reset();
		this._isUpdating = true;
		this._currentUpdatedBookmark = bookmark;

		this._urlInput.setValue(bookmark.getURL());
		this._titleInput.setValue(bookmark.getTitle());
		this._descriptionInput.setValue(bookmark.getDescription());

		PresenterMediator
			.getTagBusiness()
			.sortByLabelAscForBookmark(
				bookmark,
				(outcome) => {
					outcome.forEach(e => this._addTag(e.getLabel()));
				}
			);
	}

	//endregion Public Methods
	
	//endregion Methods
}
