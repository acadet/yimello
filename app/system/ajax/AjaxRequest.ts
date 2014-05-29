/// <reference path="../../dependencies.ts" />

interface AjaxSuccessCallback {
	(data : any, status : string, xhr : JQueryXHR) : any;
}

interface AjaxErrorHandler {
	(xhr : JQueryXHR, status : string, error : string) : any;
}

class AjaxRequest extends TSObject {
	//region Fields
	
	private _url : string;
	private _type : AjaxRequestType;
	private _dataType : AjaxRequestDataType;
	private _data : Object;
	private _errorHandler : AjaxErrorHandler;

	//endregion Fields
	
	//region Constructors
	
	constructor(url : string) {
		super();

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
	
	setURL(url : string) : AjaxRequest {
		this._url = url;
		return this;
	}

	setType(type : AjaxRequestType) : AjaxRequest {
		this._type = type;
		return this;
	}

	setDataType(dataType : AjaxRequestDataType) : AjaxRequest {
		this._dataType = dataType;
		return this;
	}

	setData(obj : Object) : AjaxRequest {
		this._data = obj;
		return this;
	}

	setErrorHandler(h : AjaxErrorHandler) : AjaxRequest {
		this._errorHandler = h;
		return this;
	}

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
