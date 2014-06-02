/// <reference path="../dependencies.ts" />

class TourPresenter extends YimelloPresenter {
	//region Fields
	
	/**
	 * Wraps all slides
	 */
	private _slides : DOMElement;

	/**
	 * Wraps all slide cursors
	 */
	private _slideCursors : DOMElement;

	/**
	 * Pointer to current slide
	 */
	private _currentSlide : DOMElement;

	/**
	 * Wraps all tags
	 */
	private _tags : DOMElement;

	/**
	 * Current available tag id
	 */
	private static _tagID : number;

	private _currentBookmark : BookmarkDAO;
	private _currentTags : IList<TagDAO>;

	//endregion Fields
	
	//region Constructors

	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	/**
	 * Swaps to another slide
	 * @param {number} id Targeted slide
	 */
	private _swapSlide(id : number) : void {
		var currentId : number;
		var newSlide : DOMElement;

		currentId = NumberHelper.parseString(this._currentSlide.getData('id'));

		if (id === currentId) {
			// Same slide than current one, do nothing
			return;
		}

		newSlide = this._slides.findSingle('.js-slide[data-id="' + id + '"]');

		if (id > currentId) {
			// Animation from right to left
			newSlide
				.setCss({
					left: this._slides.getWidth()
				})
				.animate({
					left: 0
				}, 500);
			this._currentSlide.animate({
				left: -this._slides.getWidth()
			}, 500);
		} else {
			// Animation from left to right
			newSlide
				.setCss({
					left: -this._slides.getWidth()
				})
				.animate({
					left: 0
				}, 500);
			this._currentSlide.animate({
				left: this._slides.getWidth()
			}, 500);
		}

		// Update cursors
		this._slideCursors
			.findSingle('.js-slide-cursor[data-slide-id="' + id + '"]')
			.addClass('js-active-cursor')
			.addClass('active-cursor');
		this._slideCursors
			.findSingle('.js-slide-cursor[data-slide-id="' + currentId + '"]')
			.removeClass('js-active-cursor')
			.removeClass('active-cursor');

		// Update current slide
		this._currentSlide = newSlide;
	}

	/**
	 * Appends tag to tag list
	 * @param {string} value Used label
	 */
	private _createTag(value : string) : void {
		var tag : DOMElement;
		var img : DOMElement;
		var tagObj : TagDAO;

		if (!TSObject.exists(this._tags)) {
			// Save pointer to tag list if not already done
			this._tags = DOMTree.findSingle('.js-slide .js-tag-list');
			TourPresenter._tagID = 0;
			this._currentTags = new ArrayList<TagDAO>();
		}

		// Start to build a new tag
		tag =
			DOMElement.fromString('<li><p>' + value + '</p></li>');
		tag.addClass('tag');
		img = DOMElement.fromString('<img />');
		img.setAttribute('src', "assets/img/x-mark-icon.png");
		img.addClass('delete-tag');
		img.setData('tag-id', NumberHelper.toString(TourPresenter._tagID));
		TourPresenter._tagID++;

		tag.append(img);
		this._tags.append(tag);

		tagObj = new TagDAO();
		tagObj.setLabel(value);

		this._currentTags.add(tagObj);

		// On click on delete icon, remove bound tag
		img.on(DOMElementEvents.Click, (e) => {
			img.off(DOMElementEvents.Click);
			tag.remove();
			this._currentTags.remove(tagObj);
		});
	}

	/**
	 * Prepares slides and associated cursors
	 */
	private _prepareSlidesAndCursors() : void {
		var i : number = 0;

		// Centerize each slide vertically
		this._slides.find('.js-slide').forEach((e) => {
			e.verticalCenterizeWithMargin(this._slides);
			e.setData('id', NumberHelper.toString(i));

			if (i !== 0) {
				e.setCss({
					left: this._slides.getWidth()
				});
			} else {
				// On start, first one is the current one
				this._currentSlide = e;
			}

			e.find('form').forEach((e) => {
				// Block all forms to auto submit
				e.on(DOMElementEvents.Submit, (arg) => {
					arg.preventDefault();
				});
			});

			i++;
		});

		// Centerize wrapper of cursors
		this._slideCursors.verticalCenterizeWithMargin(this._slideCursors.parent());
		
		// Build all cursors using found slides
		for(var j = 0; j < i; j++) {
			var d : DOMElement = DOMElement.fromString('<li></li>');
			d.addClass('js-slide-cursor');
			d.addClass('slide-cursor');

			if (j === 0) {
				d.addClass('active-cursor');
				d.addClass('js-active-cursor');
			}

			d.setData('slide-id', NumberHelper.toString(j));
			d.on(DOMElementEvents.Click, (e) => {
				// Each cursor trigger swap event
				this._swapSlide(NumberHelper.parseString(e.getTarget().getData('slide-id')));
			});
			this._slideCursors.append(d);
		}
	}

	/**
	 * Prepares tag generator
	 */
	private _prepareTagGenerator() : void {
		this._slides
			.findSingle('.js-slide .js-tag-form input[name="tags"]')
			.on(
				DOMElementEvents.KeyDown, 
				(e) => {
					if (e.getWhich() === 13) {
						// Only trigger when key is 'enter'
						this._createTag(e.getTarget().getValue());
						e.getTarget().setValue('');
					}
				}
			);
	}

	private _prepareURLForm() : void {
		var urlInput : DOMElement;

		urlInput = this._slides.findSingle('.js-slide .js-url-form input[name="url"]');

		this._slides
			.findSingle('.js-slide .js-url-form .js-save-url-trigger')
			.on(
				DOMElementEvents.Click,
				(e) => {
					var url : string;

					url = urlInput.getValue();

					urlInput.removeClass('success');
					urlInput.removeClass('error');

					if (url !== '') {
						this
							.getBookmarkBusiness()
							.createFromURL(
								url,
								(bookmark) => {
									if (bookmark === null) {
										var e : DOMElement;
										var timer : Timer;

										e = DOMElement.fromString('<div>Provided url is wrong</div>');
										e.addClass('error-bubble');
										e.setCss({
											top : urlInput.getBottom(),
											left : (urlInput.getWidth() - e.getWidth()) / 2,
											opacity : 0
										});

										DOMTree.append(e);
										e.animate(
											{
												opacity : 1
											},
											500
										);

										timer = new Timer(
											(o) => {
												e.animate(
													{
														opacity : 0
													},
													500,
													(e) => {
														e.remove();
													}
												);
											},
											2000
										);

										urlInput.addClass('error');
									} else {
										var timer : Timer;

										this._currentBookmark = bookmark;
										urlInput.addClass('success');

										timer = new Timer(
											(o) => {
												this._swapSlide(3);
											},
											2000
										);
									}
								}
							);
					} else {
						urlInput.addClass('error');
					}
				}
			);
	}

	private _prepareTagForm() : void {
		var tagSaveTrigger : DOMElement;

		this._prepareTagGenerator();

		DOMTree.findSingle('.js-slide form .js-save-tags-trigger');

		tagSaveTrigger.on(
			DOMElementEvents.Click,
			(e) => {
				if (TSObject.exists(this._currentBookmark)) {
					if (this._currentTags.getLength() > 0) {
						
					} else {
						// TODO
					}
				} else {
					// TODO
				}
			}
		);
	}

	//endregion Private Methods
	
	//region Public Methods
	
	onStart() : void {
		// First, get UI elements
		this._slides = DOMTree.findSingle('.js-slide-list');
		this._slideCursors = DOMTree.findSingle('.js-slide-cursor-list');

		this._prepareSlidesAndCursors();

		this._prepareURLForm();

		this._prepareTagForm();


		// Hello trigger moves from 0 to 1
		this._slides
			.findSingle('.js-hello-trigger')
			.on(
				DOMElementEvents.Click,
				(e) => {
					this._swapSlide(1);
				}
			);

		// Guidelines trigger move from 1 to 2
		this._slides
			.findSingle('.js-guidelines-trigger')
			.on(
				DOMElementEvents.Click,
				(e) => {
					this._swapSlide(2);
				}
			);

		// Go button ends the tour
		DOMTree.findSingle('.js-go-button').on(DOMElementEvents.Click, (e) => {
			e.getTarget().off(DOMElementEvents.Click);
			NodeWindow.moveTo('main.html');
		});
	}

	onDestroy() : void {
		// TODO : remove event handler bindings
		this._slideCursors.find('.js-slide-cursor').forEach((e) => {
			e.off(DOMElementEvents.Click);
		});
	}

	//endregion Public Methods
	
	//endregion Methods
}
