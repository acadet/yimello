/// <reference path="../references.ts" />

module Mocks {
	export module DAO {
		export class ActiveRecordObject implements IActiveRecordObject {
			private _executeSQLOutcome : SQLResultSet;
			private _getOutcome : IList<any>;
			private _findOutcome : any;
			private _insertOutcome : boolean;
			private _updateOutcome : boolean;
			private _deleteOutcome : boolean;

			private _executeSQLTimes : number;
			private _getTimes : number;
			private _findTimes : number;
			private _insertTimes : number;
			private _updateTimes : number;
			private _deleteTimes : number;

			private _executeSQLArgs : Array<any>;
			private _getArgs : Array<any>;
			private _findArgs : Array<any>;
			private _insertArgs : Array<any>;
			private _updateArgs : Array<any>;
			private _deleteArgs : Array<any>;

			constructor() {
				this._executeSQLTimes = 0;
				this._getTimes = 0;
				this._findTimes = 0;
				this._insertTimes = 0;
				this._updateTimes = 0;
				this._deleteTimes = 0;
			}

			//region IActiveRecordObject

			executeSQL(request : string, callback? : Action<any>) : void {
				this._executeSQLTimes++;
				this._executeSQLArgs = [request, callback];
				if (TSObject.exists(callback)) {
					callback(this._executeSQLOutcome);
				}
			}

			get<T>(table : string, callback : Action<IList<T>>, converter? : Func<any, T>) : void {
				this._getTimes++;
				this._getArgs = [table, callback, converter];
				callback(this._getOutcome);
			}

			find<T>(
				table : string,
				selector : Pair<string, any>,
				callback : Action<T>,
				converter? : Func<any, T>) : void {

				this._findTimes++;
				this._findArgs = [table, selector, callback, converter];
				callback(this._findOutcome);
			}

			insert(table : string, data : IList<any>, callback? : Action<boolean>) : void {
				this._insertTimes++;
				this._insertArgs = [table, data, callback];
				if (TSObject.exists(callback)) {
					callback(this._insertOutcome);
				}
			}

			update(
				table : string,
				selector : Pair<string, any>,
				data : IDictionary<string, any>,
				callback? : Action<boolean>) : void {

				
				this._updateTimes++;
				this._updateArgs = [table, selector, data, callback];
				if (TSObject.exists(callback)) {
					callback(this._updateOutcome);
				}
			}

			delete(table : string, selector : Pair<string, any>, callback? : Action<boolean>) : void {
				this._deleteTimes++;
				this._deleteArgs = [table, selector, callback];
				if (TSObject.exists(callback)) {
					callback(this._deleteOutcome);
				}
			}

			//endregion IActiveRecordObject

			setExecuteSQLOutcome(value : Array<any>) : Mocks.DAO.ActiveRecordObject {
				var mockRowSet : Mocks.ARO.SQLRowSet;
				var mockSet : Mocks.ARO.SQLSet;

				mockRowSet = new Mocks.ARO.SQLRowSet();
				for (var i = 0; i < value.length; i++) {
					mockRowSet.push(value[i]);
				}

				mockSet = new Mocks.ARO.SQLSet();
				mockSet.rows = mockRowSet;

				this._executeSQLOutcome = new SQLResultSet(mockSet);

				return this;
			}

			setGetOutcome(value : IList<any>) : Mocks.DAO.ActiveRecordObject {
				this._getOutcome = value;
				return this;
			}

			setFindOutcome(value : any) : Mocks.DAO.ActiveRecordObject {
				this._findOutcome = value;
				return this;
			}

			setInsertOutcome(value : boolean) : Mocks.DAO.ActiveRecordObject {
				this._insertOutcome = value;
				return this;
			}

			setUpdateOutcome(value : boolean) : Mocks.DAO.ActiveRecordObject {
				this._updateOutcome = value;
				return this;
			}

			setDeleteOutcome(value : boolean) : Mocks.DAO.ActiveRecordObject {
				this._deleteOutcome = value;
				return this;
			}

			executeSQLTimes() : number {
				return this._executeSQLTimes;
			}

			getTimes() : number {
				return this._getTimes;
			}

			findTimes() : number {
				return this._findTimes;
			}

			insertTimes() : number {
				return this._insertTimes;
			}

			updateTimes() : number {
				return this._updateTimes;
			}

			deleteTimes() : number {
				return this._deleteTimes;
			}

			executeSQLArgs() : Array<any> {
				return this._executeSQLArgs;
			}

			getArgs() : Array<any> {
				return this._getArgs;
			}

			findArgs() : Array<any> {
				return this._findArgs;
			}

			insertArgs() : Array<any> {
				return this._insertArgs;
			}

			updateArgs() : Array<any> {
				return this._updateArgs;
			}

			deleteArgs() : Array<any> {
				return this._deleteArgs;
			}
		}

		export class BookmarkDAO implements IBookmarkDAO {
			private _addOutcome : Bookmark;
			private _updateOutcome : Bookmark;
			private _deleteOutcome : boolean;
			private _findOutcome : Bookmark;
			private _sortByViewsDescThenByTitleAscOutcome : IList<Bookmark>;

			private _addTimes : number;
			private _updateTimes : number;
			private _deleteTimes : number;
			private _findTimes : number;
			private _sortByViewsDescThenByTitleAscTimes : number;

			private _addArgs : Array<any>;
			private _updateArgs : Array<any>;
			private _deleteArgs : Array<any>;
			private _findArgs : Array<any>;
			private _sortByViewsDescThenByTitleAscArgs : Array<any>;

			constructor() {
				this._addTimes = 0;
				this._updateTimes = 0;
				this._deleteTimes = 0;
				this._findTimes = 0;
				this._sortByViewsDescThenByTitleAscTimes = 0;
			}
			
			add(bookmark : Bookmark, callback? : Action<Bookmark>) : void {
				this._addTimes++;
				this._addArgs = [bookmark, callback];

				if (TSObject.exists(callback)) {
					callback(this._addOutcome);
				}
			}

			addRaw(bookmark : Bookmark, callback? : Action<boolean>) : void {}

			update(bookmark : Bookmark, callback? : Action<Bookmark>) : void {
				this._updateTimes++;
				this._updateArgs = [bookmark, callback];

				if (TSObject.exists(callback)) {
					callback(this._updateOutcome);
				}
			}

			delete(bookmark : Bookmark, callback? : Action<boolean>) : void {
				this._deleteTimes++;
				this._deleteArgs = [bookmark, callback];

				if (TSObject.exists(callback)) {
					callback(this._deleteOutcome);
				}
			}

			get(callback : Action<IList<Bookmark>>) : void {}

			find(id : string, callback : Action<Bookmark>) : void {
				this._findTimes++;
				this._findArgs = [id, callback];

				callback(this._findOutcome);
			}

			findByURL(url : string, callback : Action<Bookmark>) : void {}
			
			sortByViewsDescThenByTitleAsc(callback : Action<IList<Bookmark>>) : void {
				this._sortByViewsDescThenByTitleAscTimes++;
				this._sortByViewsDescThenByTitleAscArgs = [callback];
				callback(this._sortByViewsDescThenByTitleAscOutcome);
			}

			sortByTitleAsc(callback : Action<IList<Bookmark>>) : void {}

			setAddOutcome(value : Bookmark) : Mocks.DAO.BookmarkDAO {
				this._addOutcome = value;
				return this;
			}

			setUpdateOutcome(value : Bookmark) : Mocks.DAO.BookmarkDAO {
				this._updateOutcome = value;
				return this;
			}

			setDeleteOutcome(value : boolean) : Mocks.DAO.BookmarkDAO {
				this._deleteOutcome = value;
				return this;
			}

			setFindOutcome(value : Bookmark) : Mocks.DAO.BookmarkDAO {
				this._findOutcome = value;
				return this;
			}

			setSortByViewsDescThenByTitleAscOutcome(value : IList<Bookmark>) : Mocks.DAO.BookmarkDAO {
				this._sortByViewsDescThenByTitleAscOutcome = value;
				return this;
			}

			addTimes() : number {
				return this._addTimes;
			}

			updateTimes() : number {
				return this._updateTimes;
			}

			deleteTimes() : number {
				return this._deleteTimes;
			}

			findTimes() : number {
				return this._findTimes;
			}

			sortByViewsDescThenByTitleAscTimes() : number {
				return this._sortByViewsDescThenByTitleAscTimes++;
			}

			addArgs() : Array<any> {
				return this._addArgs;
			}

			updateArgs() : Array<any> {
				return this._updateArgs;
			}

			deleteArgs() : Array<any> {
				return this._deleteArgs;
			}

			findArgs() : Array<any> {
				return this._findArgs;
			}

			sortByViewsDescThenByTitleAscArgs() : Array<any> {
				return this._sortByViewsDescThenByTitleAscArgs;
			}
		}

		export class TagDAO implements ITagDAO {
			private _addOutcome : Tag;
			private _updateOutcome : Tag;
			private _deleteOutcome : boolean;
			private _getOutcome : IList<Tag>;
			private _findByLabelOutcome : Tag;
			private _sortByLabelAscOutcome : IList<Tag>;

			private _addTimes : number;
			private _updateTimes : number;
			private _deleteTimes : number;
			private _getTimes : number;
			private _findByLabelTimes : number;
			private _sortByLabelAscTimes : number;

			private _addArgs : Array<any>;
			private _updateArgs : Array<any>;
			private _deleteArgs : Array<any>;
			private _getArgs : Array<any>;
			private _findByLabelArgs : Array<any>;
			private _sortByLabelAscArgs : Array<any>;

			constructor() {
				this._addTimes = 0;
				this._updateTimes = 0;
				this._deleteTimes = 0;
				this._getTimes = 0;
				this._findByLabelTimes = 0;
				this._sortByLabelAscTimes = 0;
			}

			add(tag : Tag, callback? : Action<Tag>) : void {
				this._addTimes++;
				this._addArgs = [tag, callback];
				if (TSObject.exists(callback)) {
					callback(this._addOutcome);
				}
			}

			addRaw(tag : Tag, callback? : Action<boolean>) : void {}

			update(tag : Tag, callback? : Action<Tag>) : void {
				this._updateTimes++;
				this._updateArgs = [tag, callback];
				if (TSObject.exists(callback)) {
					callback(this._updateOutcome);
				}
			}

			delete(tag : Tag, callback? : Action<boolean>) : void {
				this._deleteTimes++;
				this._deleteArgs = [tag, callback];
				if (TSObject.exists(callback)) {
					callback(this._deleteOutcome);
				}
			}

			get(callback : Action<IList<Tag>>) : void {
				this._getTimes++;
				this._getArgs = [callback];
				callback(this._getOutcome);
			}

			find(id : string, callback : Action<Tag>) : void {}

			findByLabel(label : string, callback : Action<Tag>) : void {
				this._findByLabelTimes++;
				this._findByLabelArgs = [label, callback];
				callback(this._findByLabelOutcome);
			}

			sortByLabelAsc(callback : Action<IList<Tag>>) : void {
				this._sortByLabelAscTimes++;
				this._sortByLabelAscArgs = [callback];
				callback(this._sortByLabelAscOutcome);
			}

			setAddOutcome(value : Tag) : Mocks.DAO.TagDAO {
				this._addOutcome = value;
				return this;
			}

			setUpdateOutcome(value : Tag) : Mocks.DAO.TagDAO {
				this._updateOutcome = value;
				return this;
			}

			setDeleteOutcome(value : boolean) : Mocks.DAO.TagDAO {
				this._deleteOutcome = value;
				return this;
			}

			setGetOutcome(value : IList<Tag>) : Mocks.DAO.TagDAO {
				this._getOutcome = value;
				return this;
			}

			setFindByLabelOutcome(value : Tag) : Mocks.DAO.TagDAO {
				this._findByLabelOutcome = value;
				return this;
			}

			setSortByLabelAscOutcome(value : IList<Tag>) : Mocks.DAO.TagDAO {
				this._sortByLabelAscOutcome = value;
				return this;
			}

			addTimes() : number {
				return this._addTimes;
			}

			updateTimes() : number {
				return this._updateTimes;
			}

			deleteTimes() : number {
				return this._deleteTimes;
			}

			getTimes() : number {
				return this._getTimes;
			}

			findByLabelTimes() : number {
				return this._findByLabelTimes;
			}

			sortByLabelAscTimes() : number {
				return this._sortByLabelAscTimes;
			}

			addArgs() : Array<any> {
				return this._addArgs;
			}

			updateArgs() : Array<any> {
				return this._updateArgs;
			}

			deleteArgs() : Array<any> {
				return this._deleteArgs;
			}

			getArgs() : Array<any> {
				return this._getArgs;
			}

			findByLabelArgs() : Array<any> {
				return this._findByLabelArgs;
			}

			sortByLabelAscArgs() : Array<any> {
				return this._sortByLabelAscArgs;
			}
		}

		export class TagBookmarkDAO implements ITagBookmarkDAO {
			private _addMultipleTagRelationsOutcome : boolean;
			private _updateBookmarkRelationsOutcome : boolean;
			private _removeBookmarkRelationsOutcome : boolean;
			private _removeTagRelationsOutcome : boolean;
			private _sortTagsByLabelAscForBookmarkOutcome : IList<Tag>;
			private _sortBookmarksByTitleAscForTagOutcome : IList<Bookmark>;
			private _sortBookmarksByTitleAscWithBoundTagsByLabelAscOutcome : IList<Pair<Bookmark, IList<Tag>>>;

			private _addMultipleTagRelationsTimes : number;
			private _updateBookmarkRelationsTimes : number;
			private _removeBookmarkRelationsTimes : number;
			private _removeTagRelationsTimes : number;
			private _sortTagsByLabelAscForBookmarkTimes : number;
			private _sortBookmarksByTitleAscForTagTimes : number;
			private _sortBookmarksByTitleAscWithBoundTagsByLabelAscTimes : number;

			private _addMultipleTagRelationsArgs : Array<any>;
			private _updateBookmarkRelationsArgs : Array<any>;
			private _removeBookmarkRelationsArgs : Array<any>;
			private _removeTagRelationsArgs : Array<any>;
			private _sortTagsByLabelAscForBookmarkArgs : Array<any>;
			private _sortBookmarksByTitleAscForTagArgs : Array<any>;
			private _sortBookmarksByTitleAscWithBoundTagsByLabelAscArgs : Array<any>;

			constructor() {
				this._addMultipleTagRelationsTimes = 0;
				this._updateBookmarkRelationsTimes = 0;
				this._removeBookmarkRelationsTimes = 0;
				this._removeTagRelationsTimes = 0;
				this._sortTagsByLabelAscForBookmarkTimes = 0;
				this._sortBookmarksByTitleAscForTagTimes = 0;
				this._sortBookmarksByTitleAscWithBoundTagsByLabelAscTimes = 0;
			}

			addRelation(tag : Tag, bookmark : Bookmark, callback? : Action<boolean>) : void {}

			addMultipleTagRelations(bookmark : Bookmark, tags : IList<Tag>, callback? : Action<boolean>) : void {
				this._addMultipleTagRelationsTimes++;
				this._addMultipleTagRelationsArgs = [bookmark, tags, callback];
				if (TSObject.exists(callback)) {
					callback(this._addMultipleTagRelationsOutcome);
				}
			}

			updateBookmarkRelations(bookmark : Bookmark, tags : IList<Tag>, callback? : Action<boolean>) : void {
				this._updateBookmarkRelationsTimes++;
				this._updateBookmarkRelationsArgs = [bookmark, tags, callback];
				if (TSObject.exists(callback)) {
					callback(this._updateBookmarkRelationsOutcome);
				}
			}

			removeBookmarkRelations(bookmark : Bookmark, callback? : Action<boolean>) : void {
				this._removeBookmarkRelationsTimes++;
				this._removeBookmarkRelationsArgs = [bookmark, callback];

				if (TSObject.exists(callback)) {
					callback(this._removeBookmarkRelationsOutcome);
				}
			}

			removeTagRelations(tag : Tag, callback? : Action<boolean>) : void {
				this._removeTagRelationsTimes++;
				this._removeTagRelationsArgs = [tag, callback];

				if (TSObject.exists(callback)) {
					callback(this._removeTagRelationsOutcome);
				}
			}

			getRaw(callback : Action<IList<any>>) : void {}

			sortTagsByLabelAscForBookmark(bookmark : Bookmark, callback : Action<IList<Tag>>) : void {
				this._sortTagsByLabelAscForBookmarkTimes++;
				this._sortTagsByLabelAscForBookmarkArgs = [bookmark, callback];
				callback(this._sortTagsByLabelAscForBookmarkOutcome);
			}

			sortBookmarksByTitleAscForTag(tag : Tag, callback : Action<IList<Bookmark>>) : void {
				this._sortBookmarksByTitleAscForTagTimes++;
				this._sortBookmarksByTitleAscForTagArgs = [tag, callback];
				callback(this._sortBookmarksByTitleAscForTagOutcome);
			}

			sortBookmarksByTitleAscWithBoundTagsByLabelAsc(callback : Action<IList<Pair<Bookmark, IList<Tag>>>>) : void {
				this._sortBookmarksByTitleAscWithBoundTagsByLabelAscTimes++;
				this._sortBookmarksByTitleAscWithBoundTagsByLabelAscArgs = [callback];
				callback(this._sortBookmarksByTitleAscWithBoundTagsByLabelAscOutcome);
			}


			setAddMultipleTagsRelationsOutcome(value : boolean) : Mocks.DAO.TagBookmarkDAO {
				this._addMultipleTagRelationsOutcome = value;
				return this;
			}

			setUpdateBookmarkRelationsOutcome(value : boolean) : Mocks.DAO.TagBookmarkDAO {
				this._updateBookmarkRelationsOutcome = value;
				return this;
			}

			setRemoveBookmarkRelationsOutcome(value : boolean) : Mocks.DAO.TagBookmarkDAO {
				this._removeBookmarkRelationsOutcome = value;
				return this;
			}

			setRemoveTagRelationsOutcome(value : boolean) : Mocks.DAO.TagBookmarkDAO {
				this._removeTagRelationsOutcome = value;
				return this;
			}

			setSortTagsByLabelAscForBookmarkOutcome(value : IList<Tag>) : Mocks.DAO.TagBookmarkDAO {
				this._sortTagsByLabelAscForBookmarkOutcome = value;
				return this;
			}

			setSortBookmarksByTitleAscForTagOutcome(value : IList<Bookmark>) : Mocks.DAO.TagBookmarkDAO {
				this._sortBookmarksByTitleAscForTagOutcome = value;
				return this;
			}

			setSortBookmarksByTitleAscWithBoundTagsByLabelAscOutcome(value : IList<Pair<Bookmark, IList<Tag>>>) : Mocks.DAO.TagBookmarkDAO {
				this._sortBookmarksByTitleAscWithBoundTagsByLabelAscOutcome = value;
				return this;
			}

			addMultipleTagRelationsTimes() : number {
				return this._addMultipleTagRelationsTimes;
			}

			updateBookmarkRelationsTimes() : number {
				return this._updateBookmarkRelationsTimes;
			}

			removeBookmarkRelationsTimes() : number {
				return this._removeBookmarkRelationsTimes;
			}

			removeTagRelationsTimes() : number {
				return this._removeTagRelationsTimes;
			}

			sortTagsByLabelAscForBookmarkTimes() : number {
				return this._sortTagsByLabelAscForBookmarkTimes;
			}

			sortBookmarksByTitleAscForTagTimes() : number {
				return this._sortBookmarksByTitleAscForTagTimes;
			}

			sortBookmarksByTitleAscWithBoundTagsByLabelAscTimes() : number {
				return this._sortBookmarksByTitleAscWithBoundTagsByLabelAscTimes;
			}

			addMultipleTagRelationsArgs() : Array<any> {
				return this._addMultipleTagRelationsArgs;
			}

			updateBookmarkRelationsArgs() : Array<any> {
				return this._updateBookmarkRelationsArgs;
			}

			removeBookmarkRelationsArgs() : Array<any> {
				return this._removeBookmarkRelationsArgs;
			}

			removeTagRelationsArgs() : Array<any> {
				return this._removeTagRelationsArgs;
			}

			sortTagsByLabelAscForBookmarkArgs() : Array<any> {
				return this._sortTagsByLabelAscForBookmarkArgs;
			}

			sortBookmarksByTitleAscForTagArgs() : Array<any> {
				return this._sortBookmarksByTitleAscForTagArgs;
			}

			sortBookmarksByTitleAscWithBoundTagsByLabelAscArgs() : Array<any> {
				return this._sortBookmarksByTitleAscWithBoundTagsByLabelAscArgs;
			}
		}
	}
}
