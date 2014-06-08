/// <reference path="../../dependencies.ts" />

/**
 * Delegate called when ajax call encounters a success
 */
interface AjaxSuccessCallback {
	(data : any, status : string, xhr : JQueryXHR) : any;
}

/**
 * Delegate called when ajax call encounters an error
 */
interface AjaxErrorHandler {
	(xhr : JQueryXHR, status : string, error : string) : any;
}

/**
 * Helper for ajax requests
 */
class AjaxRequest extends TSObject {
	//region Fields
	
	/**
	 * Target of call
	 */
	private _url : string;

	/**
	 * Type of call (get, post etc.)
	 */
	private _type : AjaxRequestType;

	/**
	 * Expected data type
	 */
	private _dataType : AjaxRequestDataType;

	/**
	 * Extra data to send
	 */
	private _data : Object;

	/**
	 * Optionnal custom error handler
	 */
	private _errorHandler : AjaxErrorHandler;

	//endregion Fields
	
	//region Constructors
	
	constructor(url : string) {
		super();

		// Set default error handler
		this._errorHandler = (xhr, status, error) => {
			ExceptionHandler.throw(new AjaxRequestException(error));
		};

		this._url = url;
	}

	//endregion Constructors
	
	//region Methods
	
	//region Private Methods

	//endregion Private Methods
	
	//region Public Methods
	
	/**
	 * Sets targetted URL
	 * @param  {string}      url [description]
	 * @return {AjaxRequest}     [description]
	 */
	setURL(url : string) : AjaxRequest {
		this._url = url;
		return this;
	}

	/**
	 * Sets ajax request type
	 * @param  {AjaxRequestType} type [description]
	 * @return {AjaxRequest}          [description]
	 */
	setType(type : AjaxRequestType) : AjaxRequest {
		this._type = type;
		return this;
	}

	/**
	 * Sets expected data type
	 * @param  {AjaxRequestDataType} dataType [description]
	 * @return {AjaxRequest}                  [description]
	 */
	setDataType(dataType : AjaxRequestDataType) : AjaxRequest {
		this._dataType = dataType;
		return this;
	}

	/**
	 * Sets extra data
	 * @param  {Object}      obj [description]
	 * @return {AjaxRequest}     [description]
	 */
	setData(obj : Object) : AjaxRequest {
		this._data = obj;
		return this;
	}

	/**
	 * Sets custom error handler
	 * @param  {AjaxErrorHandler} h [description]
	 * @return {AjaxRequest}        [description]
	 */
	setErrorHandler(h : AjaxErrorHandler) : AjaxRequest {
		this._errorHandler = h;
		return this;
	}

	/**
	 * Runs ajax call
	 * @param {AjaxSuccessCallback} success Callback to execute if succeed
	 */
	execute(success : AjaxSuccessCallback) : void {
		jQuery.ajax({
			type : <string> this._type,
			dataType : <string> this._dataType,
			url : this._url,
			data : this._data,
			success : success,
			error : this._errorHandler
		});
	}

	//endregion Public Methods
	
	//endregion Methods
}
