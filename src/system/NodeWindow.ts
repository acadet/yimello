/// <reference path="../dependencies.ts" />

declare var gui : any;

interface NodeWindowEventHandler {
	() : void;
}

class NodeWindow {

	constructor() {
		throw new Exception("You cannot create a Window object");
	}

	static getInstance() : any {
		return gui.Window.get();
	}

	static on(event : NodeWindowEvents, callback : NodeWindowEventHandler) : void {
		NodeWindow.getInstance().on(event, callback);	
	}

	static moveTo(page : string) : void {
		NodeWindow.getInstance().window.location = page;
	}
}