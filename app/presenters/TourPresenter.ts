/// <reference path="../dependencies.ts" />

enum TourPresenterSlides {
	Hello,
	Guidelines,
	URL,
	Tags,
	End
}

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

	private _tagInput : DOMElement;

	private _urlInput : DOMElement;

	private _currentBookmark : Bookmark;
	private _currentTags : IList<Tag>;

	//endregion Fields
	
	//region Constructors

	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	/**
	 * Swaps to another slide
	 * @param {TourPresenterSlides} id Targeted slide
	 */
	private _swapSlide(id : TourPresenterSlides) : void {
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
		BusinessFactory.buildTag(
			(business) => {
				var tag : DOMElement;
				var tagObj : Tag;

				if (!business.isValueValid(value)) {
					return;
				}

				// Avoid harmful values
				value = SecurityHelper.disarm(value);

				// Start to build a new tag
				tag =
					DOMElement.fromString('<li>' + value + '</li>');
				tag.addClass('tag');
				this._tags.append(tag);

				tagObj = new Tag();
				tagObj.setLabel(value);

				this._currentTags.add(tagObj);

				// On click on delete icon, remove bound tag
				tag.on(DOMElementEvents.Click, (e) => {
					tag.off(DOMElementEvents.Click);
					tag.remove();
					this._currentTags.remove(tagObj);
				});
			}
		);
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
		this._tagInput = this._slides.findSingle('.js-slide .js-tag-form input[name="tags"]');
		this._tags = DOMTree.findSingle('.js-slide .js-tag-list');
		this._currentTags = new ArrayList<Tag>();

		this._tagInput.on(
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

	private _saveURLInput() : void {
		var url : string;

		url = StringHelper.trim(this._urlInput.getValue());
		this._urlInput.removeClass('success');
		this._urlInput.removeClass('error');

		if (url !== '') {
			BusinessFactory.buildBookmark(
				(business) => {
					business.createFromURL(
						url,
						(bookmark) => {
							var t : Timer<any>;

							this._currentBookmark = bookmark;
							this._urlInput.addClass('success');

							t = new Timer<any>(
								(o) => {
									this._swapSlide(TourPresenterSlides.Tags);
								},
								2000
							);
						},
						(errorMsg) => {
							super.getNotifier().alert(errorMsg);
							this._urlInput.addClass('error');
						},
						(warningMsg) => {
							super.getNotifier().warn(warningMsg);
						}
					);
				}
			);
		} else {
			this._urlInput.addClass('error');
		}
	}

	private _prepareURLForm() : void {
		this._slides
			.findSingle('.js-slide .js-url-form .js-save-url-trigger')
			.on(
				DOMElementEvents.Click,
				(e) => {
					this._saveURLInput();
				}
			);
		this._urlInput.on(
			DOMElementEvents.KeyDown,
			(e) => {
				if (e.getWhich() === 13) {
					this._saveURLInput();
				}
			}
		);
	}

	private _prepareTagForm() : void {
		var tagSaveTrigger : DOMElement;

		this._prepareTagGenerator();

		tagSaveTrigger = DOMTree.findSingle('.js-slide form .js-save-tags-trigger');

		tagSaveTrigger.on(
			DOMElementEvents.Click,
			(e) => {
				if (TSObject.exists(this._currentBookmark)) {
					if (this._currentTags.getLength() > 0) {
						BusinessFactory.buildTag(
							(tagBusiness) => {
								tagBusiness.merge(
									this._currentTags,
									(outcome) => {
										this._currentTags = outcome;

										BusinessFactory.buildTagBookmark(
											(tgBkBusiness) => {
												tgBkBusiness.bindTags(
													this._currentBookmark,
													this._currentTags,
													() => {
														var timer : Timer<any>;

														this._tagInput.addClass('success');
														timer = new Timer<any>(
															(o) => {
																this._swapSlide(TourPresenterSlides.End);
															},
															2000
														);
													},
													(errorMsg) => {
														super.getNotifier().alert(errorMsg);
														this._tagInput.addClass('error');
													}
												);
											}
										);
									},
									(errorMsg) => {
										super.getNotifier().alert(errorMsg);
										this._tagInput.addClass('error');
									}
								);
							}
						);
					} else {
						super.getNotifier().alert(PresenterMessages.BURRO);
						this._tagInput.addClass('error');
					}
				} else {
					super.getNotifier().alert(PresenterMessages.RAM);
					this._urlInput.addClass('error');
					this._swapSlide(TourPresenterSlides.URL);
				}
			}
		);
	}

	//endregion Private Methods
	
	//region Public Methods
	
	onStart() : void {
		super.onStart();

		// First, get UI elements
		this._slides = DOMTree.findSingle('.js-slide-list');
		this._slideCursors = DOMTree.findSingle('.js-slide-cursor-list');
		this._urlInput = this._slides.findSingle('.js-slide .js-url-form input[name="url"]');

		this._prepareSlidesAndCursors();

		this._prepareURLForm();

		this._prepareTagForm();


		// Hello trigger moves from 0 to 1
		this._slides
			.findSingle('.js-hello-trigger')
			.on(
				DOMElementEvents.Click,
				(e) => {
					this._swapSlide(TourPresenterSlides.Guidelines);
				}
			);

		// Guidelines trigger move from 1 to 2
		this._slides
			.findSingle('.js-guidelines-trigger')
			.on(
				DOMElementEvents.Click,
				(e) => {
					this._swapSlide(TourPresenterSlides.URL);
				}
			);

		// Go button ends the tour
		DOMTree.findSingle('.js-go-button').on(DOMElementEvents.Click, (e) => {
			e.getTarget().off(DOMElementEvents.Click);
			NodeWindow.moveTo('main.html');
		});
	}

	onDestroy() : void {
		super.onDestroy();
		
		// TODO : remove event handler bindings
		this._slideCursors.find('.js-slide-cursor').forEach((e) => {
			e.off(DOMElementEvents.Click);
		});
	}

	//endregion Public Methods
	
	//endregion Methods
}
