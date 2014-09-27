/// <reference path="../../../dependencies.ts" />

class TagBookmarkTemplate {
	static build(values : IList<Tag>) : string {
		var outcome : StringBuffer;

		outcome = new StringBuffer();

		values.forEach((e) => {
			outcome.append('<li data-id="' + e.getId() + '">' + e.getLabel() + '</li>');
		});

		return outcome.toString();
	}
}
