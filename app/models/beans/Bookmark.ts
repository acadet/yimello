/// <reference path="../../dependencies.ts" />

/**
 * Bookmark entity
 */
class Bookmark {
	//region Fields

	/**
	 * Id of bookmark
	 */
	private _id : string;
	
	/**
	 * URL of bookmark
	 */
	private _url : string;

	/**
	 * Title of bookmark
	 */
	private _title : string;

	/**
	 * Description of bookmark
	 */
	private _description : string;

	/**
	 * Number of times bookmark has been viewed
	 */
	private _views : number;

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
	 * Sets id
	 * @param  {string}   id [description]
	 * @return {Bookmark}    [description]
	 */
	setId(id : string) : Bookmark {
		this._id = id;
		return this;
	}
	
	/**
	 * Returns URL
	 */
	getURL() : string {
		return this._url;
	}

	/**
	 * Sets URL
	 * @param  {string}      u [description]
	 * @return {Bookmark}   [description]
	 */
	setURL(u : string) : Bookmark {
		this._url = u;
		return this;
	}

	/**
	 * Returns title
	 * @return {string} [description]
	 */
	getTitle() : string {
		return this._title;
	}

	/**
	 * Sets title
	 * @param  {string}      t [description]
	 * @return {Bookmark}   [description]
	 */
	setTitle(t : string) : Bookmark {
		this._title = t;
		return this;
	}

	/**
	 * Returns description
	 * @return {string} [description]
	 */
	getDescription() : string {
		return this._description;
	}

	/**
	 * Sets description
	 * @param  {string}      d [description]
	 * @return {Bookmark}   [description]
	 */
	setDescription(d : string) : Bookmark {
		this._description = d;
		return this;
	}

	/**
	 * Gets view number
	 * @return {number} [description]
	 */
	getViews() : number {
		return this._views;
	}

	/**
	 * Sets view number
	 * @param  {number}      value [description]
	 * @return {Bookmark}       [description]
	 */
	setViews(value : number) : Bookmark {
		this._views = value;
		return this;
	}

	/**
	 * Transforms bookmark as a list of data. 
	 * Data are sorted to match DB organization
	 * @return {IList<any>} [description]
	 */
	toList() : IList<any> {
		var l : IList<any> = new ArrayList<any>();

		l.add(this.getId());
		l.add(this.getURL());
		l.add(this.getTitle());
		l.add(this.getDescription());
		l.add(this.getViews());

		return l;
	}

	/**
	 * Filled a bookmark from a table object
	 * @param  {any}         obj Object built by DB
	 * @return {Bookmark}     [description]
	 */
	static fromObject(obj : any) : Bookmark {
		var b : Bookmark = new Bookmark();

		b.setId(obj.id);
		b.setURL(obj.url);
		b.setTitle(obj.title);
		b.setDescription(obj.description);
		b.setViews(obj.views);

		return b;
	}

	/**
	 * Returns a JSON object matching data of this bookmark
	 * @return {any} JSON outcome
	 */
	toJSON() : any {
		var o : any = {};

		o.id = this.getId();
		o.url = this.getURL();
		o.title = this.getTitle();
		o.description = this.getDescription();
		o.views = this.getViews();

		return o;
	}

	/**
	 * Hydrates provided bookmark with data of this one
	 * @param {Bookmark} out Bookmark to hydrate
	 */
	hydrate(out : Bookmark) : void {
		out.setId(this.getId());
		out.setURL(this.getURL());
		out.setTitle(this.getTitle());
		out.setDescription(this.getDescription());
		out.setViews(this.getViews());
	}
}
