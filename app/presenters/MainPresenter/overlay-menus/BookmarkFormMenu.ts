/// <reference path="../../../dependencies.ts" />

class BookmarkFormMenu extends OverlayMenu {
	//region Fields

	private _updatingBookmark : Bookmark;
	private _notifier : INotifier;
	private _listener : IBookmarkFormMenuListener;

	private _bookmarkIcon : DOMElement;
	private _urlInput : DOMElement;
	private _titleInput : DOMElement;
	private _descriptionInput : DOMElement;
	private _tagList : DOMElement;
	private _tagAdditionInput : DOMElement;
	
	//endregion Fields
	
	//region Constructors

	constructor(subscriber : IBookmarkFormMenuListener, notifier : INotifier) {
		super(DOMTree.findSingle('.js-bookmark-form-menu-wrapper'));

		this._listener = subscriber;
		this._notifier = notifier;

		this._setUp();
	}
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods

	private _setUp() : void {
		var menu : DOMElement, form : DOMElement;

		menu = DOMTree.findSingle('.js-bookmark-form-menu');

		DOMTree
			.findSingle('.js-bookmark-form-trigger')
			.on(
				DOMElementEvents.Click,
				(args) => {
					this.prepareAddition();
				}
			);

		form = menu.findSingle('form');
		form.on(
			DOMElementEvents.Submit,
			(args) => {
				args.preventDefault();
			}
		);

		form
			.findSingle('.js-confirm-button')
			.on(
				DOMElementEvents.Click,
				(args) => {
					if (TSObject.exists(this._updatingBookmark)) {
						this._update();
					} else {
						this._add();
					}
				}
			);

		this._bookmarkIcon = form.findSingle('.js-bookmark-icon');
		this._urlInput = form.findSingle('input[name="url"]');
		this._titleInput = form.findSingle('input[name="title"]');
		this._descriptionInput = form.findSingle('textarea[name="description"]');
		this._tagList = form.findSingle('.js-available-tags');
		this._tagAdditionInput = form.findSingle('input[name="tag"]');

		this._setUpURLInput();
		this._setUpTagAdditionInput();

		form
			.findSingle('.js-bookmark-form-cancel')
			.on(
				DOMElementEvents.Click,
				(args) => {
					super.hide();
				}
			);
	}

	private _setUpURLInput() : void {
		var callback : Action<DOMElementEventObject>;

		callback = (args) => {
			var url : string;

			url = this._urlInput.getValue();

			if (!FormHelper.isFilled(url)) {
				return;
			}

			if (FormHelper.isFilled(this._titleInput.getValue())
				|| FormHelper.isFilled(this._descriptionInput.getValue())) {
				return;
			}

			this._notifier.inform(PresenterMessages.APE);

			URLDetailsProvider.getDetails(
				url,
				(title, description) => {
					this._bookmarkIcon.setAttribute('src', FaviconHelper.getSrc(url));
					this._titleInput.setValue(title);
					this._descriptionInput.setValue(description);
					this._notifier.inform(PresenterMessages.DONE);
				},
				(type, msg) => {
					Log.warn('An error has occured while processing URL: ' + msg);
					this._bookmarkIcon.setAttribute('src', FaviconHelper.getDefaultSrc());
					if (type === URLDetailsProviderError.Ajax) {
						this._notifier.warn(PresenterMessages.PARROT);
					} else {
						this._notifier.warn(PresenterMessages.MULE);
					}
				}
			);
		};

		this._urlInput.on(
			DOMElementEvents.KeyDown,
			(args) => {
				if (args.getWhich() === 13) {
					callback(args);
				}
			}
		);

		this._urlInput.on(
			DOMElementEvents.Blur,
			callback
		);
	}

	private _setUpTagAdditionInput() : void {
		this._tagAdditionInput.on(
			DOMElementEvents.KeyDown,
			(args) => {
				if (args.getWhich() === 13) {
					BusinessFactory.buildTag(
						(business) => {
							var value : string;

							value = this._tagAdditionInput.getValue();
							this._tagAdditionInput.setValue('');

							if (business.isValueValid(value)) {
								var children : IList<DOMElement>;
								var newElement : DOMElement;
								var comparableValue : string;

								children = this._tagList.getChildren();
								value = SecurityHelper.disarm(StringHelper.trim(value));
								comparableValue = value.toLowerCase();

								for (var i = 0; i < children.getLength(); i++) {
									var e : DOMElement = children.getAt(i);

									if (e.getText().toLowerCase() === comparableValue) {
										e.addClass('active');
										return;
									}
								}

								newElement = DOMElement.fromString(TagBookmarkTemplate.build(new Tag().setLabel(value)));
								newElement.addClass('active');
								newElement.on(
									DOMElementEvents.Click,
									(args) => {
										newElement.remove();
									}
								);
								this._tagList.append(newElement);
							}
						}
					);
				}
			}
		);
	}

	private _getSelectedTags() : IList<Tag> {
		var outcome : IList<Tag>;
		var children : IList<DOMElement>;

		outcome = new ArrayList<Tag>();
		children = this._tagList.getChildren();

		children.forEach(
			(e) => {
				if (e.hasClass('active')) {
					var t : Tag;

					t = new Tag();
					t
						.setId(e.getData('id'))
						.setLabel(e.getText());

					outcome.add(t);
				}
			}
		);

		return outcome;
	}

	private _add() : void {
		var b : Bookmark;

		b = new Bookmark();
		b.setURL(this._urlInput.getValue());
		b.setTitle(this._titleInput.getValue());
		b.setDescription(this._descriptionInput.getValue());

		BusinessFactory.buildTagBookmark(
			(business) => {
				business.addMergeAndBind(
					b,
					this._getSelectedTags(),
					() => {
						this._listener.onBookmarkAddition();
						super.hide();
					},
					(msg) => this._notifier.alert(msg)
				);
			}
		);
	}

	private _update() : void {
		this._updatingBookmark.setURL(this._urlInput.getValue());
		this._updatingBookmark.setTitle(this._titleInput.getValue());
		this._updatingBookmark.setDescription(this._descriptionInput.getValue());

		BusinessFactory.buildTagBookmark(
			(business) => {
				business.updateMergeAndBind(
					this._updatingBookmark,
					this._getSelectedTags(),
					() => {
						this._listener.onBookmarkUpdate();
						super.hide();
					},
					(msg) => this._notifier.alert(msg)
				);
			}
		);
	}
	
	//endregion Private Methods
	
	//region Public Methods

	prepareAddition() : void {
		this._updatingBookmark = null;

		this._bookmarkIcon.setAttribute('src', FaviconHelper.getDefaultSrc());
		this._urlInput.setValue('');
		this._titleInput.setValue('');
		this._descriptionInput.setValue('');
		this._tagAdditionInput.setValue('');

		BusinessFactory.buildTag(
			(business) => {
				business.sortByLabelAsc(
					(outcome) => {
						this._tagList.setHTML(TagBookmarkTemplate.buildList(outcome));
						this
							._tagList
							.find('li')
							.forEach(
								(e) => {
									e.on(DOMElementEvents.Click, (args) => e.toggleClass('active'));
								}
							);

						super.show();
					}
				);
			}
		);
	}

	prepareUpdate(bookmark : Bookmark) : void {
		this._updatingBookmark = bookmark;

		this._bookmarkIcon.setAttribute('src', FaviconHelper.getSrc(bookmark.getURL()));
		this._urlInput.setValue(bookmark.getURL());
		this._titleInput.setValue(bookmark.getTitle());
		this._descriptionInput.setValue(bookmark.getDescription());
		this._tagAdditionInput.setValue('');

		BusinessFactory.buildTag(
			(business) => {
				business.sortByLabelAsc(
					(tags) => {
						this._tagList.setHTML(TagBookmarkTemplate.buildList(tags));

						BusinessFactory.buildTagBookmark(
							(business) => {
								business.sortTagsByLabelAscForBookmark(
									this._updatingBookmark,
									(outcome) => {
										var i : number;

										i = 0;
										this
											._tagList
											.find('li')
											.forEach(
												(e) => {
													if (TSObject.exists(
															outcome.findFirst(
																(o) => (o.getId() === tags.getAt(i).getId())
															)
														)) {
														e.addClass('active');
													}

													e.on(DOMElementEvents.Click, (args) => e.toggleClass('active'));
													i++;
												}
											);

										super.show();
									}
								);
							}
						);
					}
				);
			}
		);
	}
	
	//endregion Public Methods
	
	//endregion Methods
}
