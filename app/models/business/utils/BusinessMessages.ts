/// <reference path="../../../dependencies.ts" />

class BusinessMessages {
	static DEFAULT : string = 'Ouch! An inner error has occured. Please try again';

	// BookmarkBusiness
	static COATI : string = 'Ow! Your URL is invalid. Please check it again';
	static MOOSE : string = 'Hem... I was not able to connect website. You should check your Internet connection.';

	// TagBusiness
	static CONY : string = 'A tag with same label is already exisiting. Please choose another one';
	static EWE : string = 'What about adding a label?';

	// TagBookmarkBusiness
	static FOX : string = 'No tags? Please don\'t leave your bookmark alone :(';
	static PANDA : string = 'A bookmark with same URL is already existing. Please choose another one.';
	static WEASEL : string = 'Whoops! An error has occured while importing your file. Please try again';
}
