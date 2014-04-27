/// <reference path="../dependencies.ts" />

class DOMTree extends TSObject {

	static find(criterion: string) : IList<DOMElement> {
		var results : any = jQuery(document).find(criterion);
		var list : IList<DOMElement> = new ArrayList<DOMElement>();
		
		results.each((i, e) => {
			list.add(DOMElement.fromJS(e));
		});

		return list;
	}

	static findSingle(criterion : string) : DOMElement {
		return new DOMElement(jQuery(document).find(criterion).first());
	}
}