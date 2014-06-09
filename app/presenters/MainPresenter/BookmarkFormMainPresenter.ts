/// <reference path="../../dependencies.ts" />

class BookmarkFormMainPresenter extends TSObject {
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
	 * @type {DOMElement}
	 */
	private _tagDataList : DOMElement;

	/**
	 * List of current tags
	 * @type {IList<TagDAO>}
	 */
	private _currentTags : IList<TagDAO>;

	/**
	 * Subscriber to form event
	 */
	private _subscriber : IBookmarkFormMainPresenterSubscriber;

	//endregion Fields
	
	//region Constructors
	
	constructor(wrapper : DOMElement, subscriber : IBookmarkFormMainPresenterSubscriber) {
		super();

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
					this._subscriber.onCancel();
				}
			);

		// Save button
		wrapper
			.findSingle('.js-save-button')
			.on(
				DOMElementEvents.Click,
				(e) => {
					this._onSave();
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
	private _onSave() : void {
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

		if (!FormHelper.isFilled(description)) {
			alert('description field must be filled');
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
												this._subscriber.onSave();
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

	/**
	 * Called when a new tag is added by user
	 * @param {string} value [description]
	 */
	private _addTag(value : string) : void {
		var tag : TagDAO;
		var e : DOMElement;
		var test : TagDAO;

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

			if (TSObject.exists(title) || title !== ''
				|| TSObject.exists(description) || description !== '') {
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

	//endregion Private Methods
	
	//region Public Methods
	
	/**
	 * Resets whole form for a new input
	 */
	reset() : void {
		// Reset all fields
		this._urlInput.setValue('');
		this._titleInput.setValue('');
		this._descriptionInput.setValue('');

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

	//endregion Public Methods
	
	//endregion Methods
}
