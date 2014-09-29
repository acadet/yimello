/// <reference path="../../../dependencies.ts" />

class TagBookmarkTemplate {
	static build(value : Tag) : string {
		return '<li data-id="' + value.getId() + '">' + value.getLabel() + '</li>';
	}

	static buildList(values : IList<Tag>) : string {
		var outcome : StringBuffer;

		outcome = new StringBuffer();

		values.forEach((e) => {
			outcome.append(this.build(e));
		});

		return outcome.toString();
	}
}
