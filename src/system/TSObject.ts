class TSObject {

	equals(obj: TSObject) : boolean {
		return this === obj;
	}

	static exists(obj : any) : boolean {
		return (obj !== null && obj !== undefined);
	}

	toString() : string {
		return '';
	}
}
