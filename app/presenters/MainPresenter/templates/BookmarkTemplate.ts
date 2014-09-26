/// <reference path="../../../dependencies.ts" />

class BookmarkTemplate {
	public static build(values : IList<Bookmark>) : string {
		var template : StringBuffer;

		template = new StringBuffer();

		values.forEach(
			(e) => {
				template
					.append('<li data-id="' + e.getId() + '">')
					.append('<div class="bookmark-favicon-wrapper">')
					.append('<img src="' + FaviconHelper.getSrc(e.getURL()) + '">')
					.append('</div>')
					.append('<div class="bookmark-details-wrapper">')
					.append('<h2>' + e.getTitle() + '</h2>')
					.append('<p>' + e.getDescription() + '</p>')
					.append('</div>')
					.append('</li>');
			}
		);

		return template.toString();
	}
}
