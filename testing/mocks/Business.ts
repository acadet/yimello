/// <reference path="../test_dependencies.ts" />

module Mocks {
	export module Business {
		export class BookmarkBusiness implements IInternalBookmarkBusiness {
			createFromURL(
				url : string,
				callback? : Action<Bookmark>,
				errorHandler? : Action<string>,
				warningHandler? : Action<string>) : void {}

			add(bookmark : Bookmark, callback? : Action<Bookmark>, errorHandler? : Action<string>) : void {}

			update(bookmark : Bookmark, callback? : Action<Bookmark>, errorHandler? : Action<string>) : void {}

			delete(bookmark : Bookmark, callback? : Action0, errorHandler? : Action<string>) : void {}

			find(id : string, callback : Action<Bookmark>, errorHandler? : Action<string>) : void {}

			sortByViewsDescThenByTitleAsc(callback : Action<IList<Bookmark>>, errorHandler? : Action<string>) : void {}

			engineBookmark(bookmark : Bookmark) : void {}

			isNotAlreadyExisting(url : string, callback : Action<boolean>) : void {}

			isNotAlreadyExistingButNotProvided(url : string, bookmark : Bookmark, callback : Action<boolean>) : void {}
		}

		export class TagBusiness implements IInternalTagBusiness {
			isValueValid(value : string) : boolean {
				return true;
			}

			compare(newLabel : string, exisitingLabel : string) : boolean {
				return true;
			}

			add(tag : Tag, callback? : Action<Tag>, errorHandler? : Action<string>) : void {}

			addList(tags : IList<Tag>, callback? : Action<IList<Tag>>, errorHandler? : Action<string>) : void {}

			update(tag : Tag, callback? : Action<Tag>, errorHandler? : Action<string>) : void {}

			delete(tag : Tag, callback? : Action0, errorHandler? : Action<string>) : void {}

			find(id : string, callback : Action<Tag>, errorHandler? : Action<string>) : void {}

			merge(tags : IList<Tag>, callback? : Action<IList<Tag>>, errorHandler? : Action<string>) : void {}

			sortByLabelAsc(callback : Action<IList<Tag>>, errorHandler? : Action<string>) : void {}

			engineTag(tag : Tag) : void {}

			isNotAlreadyExisting(label : string, callback : Action<boolean>) : void {}

			isNotAlreadyExistingButNotProvided(label : string, tag : Tag, callback : Action<boolean>) : void {}
		}
	}
}
