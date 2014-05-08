/// <reference path="../../../dependencies.ts" />

class ActiveRecordConfig extends TSObject {
	//region Fields
	
	private _dbName : string;
	private _dbVersion : string;
	private _dbSize : number;

	//endregion Fields
	
	//region Constructors
	
	constructor(
		databaseName : string,
		databaseVersion : string = '1.0',
		databaseSize : number = 5 * 1024 * 1024) {
		super();

		this.setDatabaseName(databaseName);
		this.setDatabaseVersion(databaseVersion);
		this.setDatabaseSize(databaseSize);
	}

	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	//endregion Private Methods
	
	//region Public Methods
	
	getDatabaseName() : string {
		return this._dbName;
	}

	setDatabaseName(name : string) : void {
		this._dbName = name;
	}

	getDatabaseVersion() : string {
		return this._dbVersion;
	}

	setDatabaseVersion(version : string) : void {
		this._dbVersion = version;
	}

	getDatabaseSize() : number {
		return this._dbSize;
	}

	setDatabaseSize(size : number) : void {
		this._dbSize = size;
	}

	//endregion Public Methods
	
	//endregion Methods
	
}
