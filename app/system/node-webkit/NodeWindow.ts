/// <reference path="../../dependencies.ts" />

declare var gui : any;

interface NodeWindowEventHandler {
	() : void;
}

class NodeWindowEvents {
	static Blur : string = "blur";
	
	static Focus : string = "focus";

	static Close : string = "close";

	static Move : string = "move";
}

class NodeWindow {

	constructor() {
		throw new Exception("You cannot create a Window object");
	}

	static getInstance() : any {
		return gui.Window.get();
	}

	static on(event : NodeWindowEvents, callback : NodeWindowEventHandler) : void {
		if (event != NodeWindowEvents.Move) {
			NodeWindow.getInstance().on(event, callback);
		} else {
			if (NodeWindow._moveListeners == null) {
				NodeWindow._moveListeners = new ArrayList<NodeWindowEventHandler>();
			}
			NodeWindow._moveListeners.add(callback);
		}
	}

	static moveTo(page : string) : void {
		NodeWindow._moveListeners.forEach((l) => {
			l();
		});
		NodeWindow.getInstance().window.location = page;
	}

	private static _moveListeners : IList<NodeWindowEventHandler>;
}