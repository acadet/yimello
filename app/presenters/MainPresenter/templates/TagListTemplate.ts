/// <reference path="../../../dependencies.ts" />

class TagListTemplate {
	public static build(values : IList<Tag>) : string {
		var currentIndex : string;
		var outcome : StringBuffer;

		outcome = new StringBuffer('<h2 class="js-most-popular-trigger">Most popular</h2>');

		if (values.getLength() < 1) {
			return outcome.toString();
		}

		values.forEach(
			(e) => {
				var pre : string;

				pre = e.getLabel()[0];
				if (!TSObject.exists(currentIndex) || currentIndex !== pre) {
					if (TSObject.exists(currentIndex)) {
						outcome.append('</ul>');
					}
					if (isNaN(parseInt(pre))) {
						currentIndex = pre;
					} else {
						currentIndex = '#';
					}
					outcome.append('<h2 class="index">' + currentIndex + '</h2><ul>');
				}

				outcome.append('<li data-id="' + e.getId() + '">' + e.getLabel() + '</li>');
			}
		);

		outcome.append('</ul>');
		return outcome.toString();
	}
}
