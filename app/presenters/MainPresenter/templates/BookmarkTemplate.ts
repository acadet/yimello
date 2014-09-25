/// <reference path="../../../dependencies.ts" />

class BookmarkTemplate {
	public static build(value : Bookmark) : DOMElement {
		var template : StringBuffer;

		template = new StringBuffer('<li>');
		template
			.append('<div class="bookmark-favicon-wrapper">')
			.append('<img src="' + FaviconHelper.getSrc(value.getURL()) + '">')
			.append('</div>')
			.append('<div class="bookmark-details-wrapper">')
			.append('<h2>' + value.getTitle() + '</h2>')
			.append('<p>' + value.getDescription() + '</p>')
			.append('</div>')
			.append('</li>');

		return DOMElement.fromString(template.toString());
	}
}
