/// <reference path="../../dependencies.ts" />

declare var gui : any;

/**
 * A handler for node window events
 */
interface NodeWindowEventHandler {
	() : void;
}

/**
 * Supported events by node window
 */
class NodeWindowEvents {
	/**
	 * Triggered when window loses focus
	 */
	static Blur : string = "blur";
	
	/**
	 * Triggered when window gains focus
	 */
	static Focus : string = "focus";

	/**
	 * Triggered when window is about to close
	 */
	static Close : string = "close";

	static Move : string = "move";
}

class NodeWindow {
	//region Fields
	
	private static _moveListeners : IList<NodeWindowEventHandler>;

	//endregion Fields
	
	//region Constructors
	
	//endregion Constructors
	
	//region Methods
	
	//region Private Methods
	
	//endregion Private Methods
	
	//region Public Methods
	
	/**
	 * Gets current instance of Node window
	 * @return {any} [description]
	 */
	static getInstance() : any {
		return gui.Window.get();
	}

	/**
	 * Subscribes to a Node window event
	 * @param {NodeWindowEvents}       event    [description]
	 * @param {NodeWindowEventHandler} callback [description]
	 */
	static on(event : NodeWindowEvents, callback : NodeWindowEventHandler) : void {
		if (event !== NodeWindowEvents.Move) {
			NodeWindow.getInstance().on(event, callback);
		} else {
			// Move is a custom event
			if (!TSObject.exists(NodeWindow._moveListeners)) {
				NodeWindow._moveListeners = new ArrayList<NodeWindowEventHandler>();
			}
			NodeWindow._moveListeners.add(callback);
		}
	}

	/**
	 * Moves to another page. Triggers move event
	 * @param {string} page [description]
	 */
	static moveTo(page : string) : void {
		NodeWindow._moveListeners.forEach(l => l());
		// Change location
		NodeWindow.getInstance().window.location = page;
	}

	static close() : void {
		gui.Window.get().close();
	}

	//endregion Public Methods
	
	//endregion Methods
}
