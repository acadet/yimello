/// <reference path="../../dependencies.ts" />

class BookmarkFormMainPresenter extends TSObject {
	//region Fields
	
	/**
	 * URL input of bookmark form
	 */
	private _urlInput : DOMElement;

	/**
	 * Title input of bookmark form
	 */
	private _titleInput : DOMElement;

	/**
	 * Description input of bookmark form
	 */
	private _descriptionInput : DOMElement;

	/**
	 * Tags input of bookmark form
	 */
	private _tagsInput : DOMElement;

	private _tagList : DOMElement;

	private _tagDataList : DOMElement;

	private _currentTags : IList<TagDAO>;

	private _subscriber : IBookmarkFormMainPresenterSubscriber;

	//endregion Fields
	
	//region Constructors
	
	constructor(wrapper : DOMElement, subscriber : IBookmarkFormMainPresenterSubscriber) {
		super();

		this._subscriber = subscriber;

		this._urlInput = wrapper.findSingle('input[name="url"]');
		this._titleInput = wrapper.findSingle('input[name="title"]');
		this._descriptionInput = wrapper.findSingle('textarea[name="description"]');
		this._tagsInput = wrapper.findSingle('input[name="tags"]');
		this._tagList = wrapper.findSingle('.js-form-tag-list');
		this._tagDataList = wrapper.findSingle('.js-tag-suggestions');

		wrapper
			.findSingle('.js-cancel-button')
			.on(
				DOMElementEvents.Click,
				(e) => {
					this._subscriber.onCancel();
				}
			);

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
	
	private _onSave() : void {
		var b : BookmarkDAO;

		b = new BookmarkDAO();
		b
			.setURL(this._urlInput.getValue())
			.setTitle(this._titleInput.getValue())
			.setDescription(this._descriptionInput.getValue());

		PresenterMediator
			.getBookmarkBusiness()
			.add(
				b,
				(outcome) => {
					// TODO save tags
				}
			);
	}

	private _addTag(value : string) : void {
		var tag : TagDAO;
		var e : DOMElement;
		var test : TagDAO;

		value = SecurityHelper.disarm(value);

		test = this._currentTags.findFirst(
			(o) => {
				return StringHelper.compare(o.getLabel(), value);
			}
		);

		if (test !== null) {
			return;
		}

		tag = new TagDAO();
		tag.setLabel(value);
		this._currentTags.add(tag);

		e = DOMElement.fromString('<li>' + tag.getLabel() + '</li>');

		this._tagList.append(e);
	}

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

	private _prepareURLInput() : void {
		var callback : DOMElementEventHandler;

		callback = (e) => {
			var title : string;
			var description : string;

			title = this._titleInput.getValue();
			description = this._descriptionInput.getValue();

			if (TSObject.exists(title) || title !== ''
				|| TSObject.exists(description) || description !== '') {
				return;
			}

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
