/// <reference path="../../dependencies.ts" />

/**
 * A tag entity
 */
class Tag {
	//region Fields

	/**
	 * ID of tag
	 */
	private _id : string;
	
	/**
	 * Label of tag
	 */
	private _label : string;

	//endregion Fields
	
	//region Constructors
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods

	//endregion Private Methods
	
	//region Public Methods

	/**
	 * Returns id
	 * @return {string} [description]
	 */
	getId() : string {
		return this._id;
	}

	/**
	 * Sets its
	 * @param  {string} id [description]
	 * @return {Tag}       [description]
	 */
	setId(id : string) : Tag {
		this._id = id;
		return this;
	}
	
	/**
	 * Returns label
	 * @return {string} [description]
	 */
	getLabel() : string {
		return this._label;
	}

	/**
	 * Sets label
	 * @param  {string} l [description]
	 * @return {Tag}   [description]
	 */
	setLabel(l : string) : Tag {
		this._label = l;
		return this;
	}

	/**
	 * Transforms current tag as a list of data.
	 * Data are sorted to match organization of DB
	 * @return {IList<any>} [description]
	 */
	toList() : IList<any> {
		var l : IList<any> = new ArrayList<any>();

		l.add(this.getId());
		l.add(this.getLabel());

		return l;
	}

	/**
	 * Fills a tag entity from a DB object
	 * @param  {any}    obj Object built by DB
	 * @return {Tag}     [description]
	 */
	static fromObject(obj : any) : Tag {
		var t : TagDAO;

		t = new TagDAO();
		t.setId(obj.id);
		t.setLabel(obj.label);

		return t;
	}

	/**
	 * Returns a JSON object hydrated with data of this
	 * @return {any} JSON outcome
	 */
	toJSON() : any {
		var o : any = {};

		o.id = this.getId();
		o.label = this.getLabel();

		return o;
	}

	/**
	 * Hydrates provided tag with this' data
	 * @param {Tag} out [description]
	 */
	hydrate(out : Tag) : void {
		out.setId(this.getId());
		out.setLabel(this.getLabel());
	}
}
