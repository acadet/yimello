/// <reference path="../test_dependencies.ts" />

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
			private _findByLabelOutcome : Tag;

			private _addTimes : number;
			private _updateTimes : number;
			private _deleteTimes : number;
			private _findByLabelTimes : number;

			private _addArgs : Array<any>;
			private _updateArgs : Array<any>;
			private _deleteArgs : Array<any>;
			private _findByLabelArgs : Array<any>;

			constructor() {
				this._addTimes = 0;
				this._updateTimes = 0;
				this._deleteTimes = 0;
				this._findByLabelTimes = 0;
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

			get(callback : Action<IList<Tag>>) : void {}

			find(id : string, callback : Action<Tag>) : void {}

			findByLabel(label : string, callback : Action<Tag>) : void {
				this._findByLabelTimes++;
				this._findByLabelArgs = [label, callback];
				callback(this._findByLabelOutcome);
			}

			sortByLabelAsc(callback : Action<IList<Tag>>) : void {}

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

			setFindByLabelOutcome(value : Tag) : Mocks.DAO.TagDAO {
				this._findByLabelOutcome = value;
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

			findByLabelTimes() : number {
				return this._findByLabelTimes;
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

			findByLabelArgs() : Array<any> {
				return this._findByLabelArgs;
			}
		}

		export class TagBookmarkDAO implements ITagBookmarkDAO {
			private _removeBookmarkRelationsOutcome : boolean;
			private _removeTagRelationsOutcome : boolean;

			private _removeBookmarkRelationsTimes : number;
			private _removeTagRelationsTimes : number;

			private _removeBookmarkRelationsArgs : Array<any>;
			private _removeTagRelationsArgs : Array<any>;

			constructor() {
				this._removeBookmarkRelationsTimes = 0;
				this._removeTagRelationsTimes = 0;
			}

			addRelation(tag : Tag, bookmark : Bookmark, callback? : Action<boolean>) : void {}

			addMultipleTagRelations(bookmark : Bookmark, tags : IList<Tag>, callback? : Action<boolean>) : void {}

			updateBookmarkRelations(bookmark : Bookmark, tags : IList<Tag>, callback? : Action<boolean>) : void {} 

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

			sortTagsByLabelAscForBookmark(bookmark : Bookmark, callback : Action<IList<Tag>>) : void {}

			sortBookmarksByTitleAscForTag(tag : Tag, callback : Action<IList<Bookmark>>) : void {}

			sortBookmarksByTitleAscWithBoundTagsByLabelAsc(callback : Action<IList<Pair<Bookmark, IList<Tag>>>>) : void {}


			setRemoveBookmarkRelationsOutcome(value : boolean) : Mocks.DAO.TagBookmarkDAO {
				this._removeBookmarkRelationsOutcome = value;
				return this;
			}

			setRemoveTagRelationsOutcome(value : boolean) : Mocks.DAO.TagBookmarkDAO {
				this._removeTagRelationsOutcome = value;
				return this;
			}

			removeBookmarkRelationsTimes() : number {
				return this._removeBookmarkRelationsTimes;
			}

			removeTagRelationsTimes() : number {
				return this._removeTagRelationsTimes;
			}

			removeBookmarkRelationsArgs() : Array<any> {
				return this._removeBookmarkRelationsArgs;
			}

			removeTagRelationsArgs() : Array<any> {
				return this._removeTagRelationsArgs;
			}
		}
	}
}
