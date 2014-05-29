/// <reference path="../dependencies.ts" />

class TourPresenter extends Presenter {

	constructor() {
	    super();
	}

	onStart() : void {
		var i : number = 0;
		this._slides = DOMTree.findSingle('.slides');
		this._slideCursors = DOMTree.findSingle('.slide-cursors');

		this._slides.find('.slide').map((e) => {
			e.verticalCenterizeWithMargin(this._slides);
			e.setData('id', NumberHelper.toString(i));

			if (i != 0) {
				e.setCss({
					left: this._slides.getWidth()
				});
			} else {
				this._currentSlide = e;
			}

			e.find('form').map((e) => {
				e.on(DOMElementEvents.Submit, (arg) => {
					arg.preventDefault();
				});
			});

			i++;
		});

		this._slideCursors.verticalCenterizeWithMargin(this._slideCursors.parent());
		
		for(var j = 0; j < i; j++) {
			var d : DOMElement = DOMElement.fromString('<li></li>');
			d.addClass('slide-cursor');

			if (j == 0) {
				d.addClass('active-cursor');
			}

			d.setData('slide-id', NumberHelper.toString(j));
			d.on(DOMElementEvents.Click, (e) => {
				this._swapSlide(NumberHelper.parseString(e.getTarget().getData('slide-id')));
			});
			this._slideCursors.append(d);
		}

		DOMTree.findSingle('.slide form.tag-form input[name="tags"]')
			.on(DOMElementEvents.KeyDown, (e) => {
				if (e.getWhich() === 13) {
					this._createTag(e.getTarget().getValue());
					e.getTarget().setValue('');
				}
			});

		DOMTree.findSingle('#go-button').on(DOMElementEvents.Click, (e) => {
			e.getTarget().off(DOMElementEvents.Click);
			NodeWindow.moveTo('main.html');
		});
	}

	onDestroy() : void {
		this._slideCursors.find('.slide-cursor').map((e) => {
			e.off(DOMElementEvents.Click);
		});
	}

	

	private _slides : DOMElement;
	private _slideCursors : DOMElement;
	private _currentSlide : DOMElement;
	private _tags : DOMElement;
	private static _tagIds : number;

	private _swapSlide(id : number) : void {
		var currentId : number = NumberHelper.parseString(this._currentSlide.getData('id'));
		var newSlide : DOMElement;

		if (id == currentId) {
			return;
		}

		newSlide = this._slides.findSingle('.slide[data-id="' + id + '"]');

		if (id > currentId) {
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

		this._slideCursors
			.findSingle('.slide-cursor[data-slide-id="' + id + '"]').addClass('active-cursor');
		this._slideCursors
			.findSingle('.slide-cursor[data-slide-id="' + currentId + '"]').removeClass('active-cursor');

		this._currentSlide = newSlide;
	}

	private _createTag(value : string) : void {
		var tag : DOMElement;
		var img : DOMElement;

		if (this._tags == null) {
			this._tags = DOMTree.findSingle('.slide .tags');
			TourPresenter._tagIds = 0;
		}

		tag = 
			DOMElement.fromString('<li><p>' + value + '</p></li>');
		tag.addClass('tag');
		img = DOMElement.fromString('<img />');
		img.setAttribute('src', "assets/img/x-mark-icon.png");
		img.addClass('delete-tag');
		img.setData('tag-id', NumberHelper.toString(TourPresenter._tagIds));
		TourPresenter._tagIds++;

		tag.append(img);
		this._tags.append(tag);

		img.on(DOMElementEvents.Click, (e) => {
			img.off(DOMElementEvents.Click);
			tag.remove();
		});
	}
}