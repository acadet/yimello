/// <reference path="../../dependencies.ts" />

interface INotifier {
	inform(msg : string) : void;

	warn(msg : string) : void;

	alert(msg : string) : void;
}
