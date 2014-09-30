// Libs part

/// <reference path="libs/jquery.d.ts" />
/// <reference path="libs/jqueryui.d.ts" />

// System part

/// <reference path="system/TSObject.ts" />
/// <reference path="system/NumberHelper.ts" />
/// <reference path="system/Timer.ts" />
/// <reference path="system/Action.ts" />
/// <reference path="system/Func.ts" />
/// <reference path="system/Exception.ts" />
/// <reference path="system/DOMElement.ts" />
/// <reference path="system/DOMTree.ts" />
/// <reference path="system/strings/StringBuffer.ts" />
/// <reference path="system/node-webkit/NodeWindow.ts" />
/// <reference path="system/node-webkit/Presenter.ts" />
/// <reference path="system/Regex.ts" />
/// <reference path="system/Log.ts" />
/// <reference path="system/Pair.ts" />
/// <reference path="system/Guid.ts" />
/// <reference path="system/MathHelper.ts" />
/// <reference path="system/StringHelper.ts" />
/// <reference path="helpers/FormHelper.ts" />
/// <reference path="system/Environment.ts" />
/// <reference path="system/storage/CacheAPI.ts" />
/// <reference path="system/storage/FileAPI.ts" />
/// <reference path="system/Random.ts" />

// Collections parts

/// <reference path="system/collections/utils/CollectionException.ts" />
/// <reference path="system/collections/IList.ts" />
/// <reference path="system/collections/impl/ArrayList.ts" />
/// <reference path="system/collections/IDictionary.ts" />
/// <reference path="system/collections/impl/Dictionary.ts" />
/// <reference path="system/collections/Queue.ts" />

// Storage part

/// <reference path="system/storage/SQLAPI.ts" />
/// <reference path="system/storage/ActiveRecord/IActiveRecordObject.ts" />
/// <reference path="system/storage/ActiveRecord/ActiveRecordConfig.ts" />
/// <reference path="system/storage/ActiveRecord/ActiveRecordException.ts" />
/// <reference path="system/storage/ActiveRecord/ActiveRecordHelper.ts" />
/// <reference path="system/storage/ActiveRecord/ActiveRecordObject.ts" />

// Ajax part

/// <reference path="system/ajax/AjaxRequest.ts" />
/// <reference path="system/ajax/AjaxRequestDataType.ts" />
/// <reference path="system/ajax/AjaxRequestException.ts" />
/// <reference path="system/ajax/AjaxRequestType.ts" />
/// <reference path="system/ajax/GetRequest.ts" />

// Helpers part

/// <reference path="helpers/ExceptionHandler.ts" />
/// <reference path="helpers/URLHelper.ts" />
/// <reference path="helpers/URLDetailsProvider.ts" />
/// <reference path="helpers/SecurityHelper.ts" />
/// <reference path="helpers/FaviconHelper.ts" />
/// <reference path="helpers/VersionHelper.ts" />

// Beans part

/// <reference path="models/beans/Bookmark.ts" />
/// <reference path="models/beans/Tag.ts" />

// DAO part

/// <reference path="models/utils/AROFactory.ts" />
/// <reference path="models/dao/utils/DAOException.ts" />
/// <reference path="models/dao/IBookmarkDAO.ts" />
/// <reference path="models/dao/ITagDAO.ts" />
/// <reference path="models/dao/ITagBookmarkDAO.ts" />
/// <reference path="models/dao/utils/DataAccessObject.ts" />
/// <reference path="models/dao/impl/BookmarkDAO.ts" />
/// <reference path="models/dao/impl/TagDAO.ts" />
/// <reference path="models/dao/impl/TagBookmarkDAO.ts" />
/// <reference path="models/dao/utils/DAOTables.ts" />
/// <reference path="models/utils/DAOFactory.ts" />

// Business part
/// <reference path="models/business/utils/IInternalBookmarkBusiness.ts" />
/// <reference path="models/business/utils/IInternalTagBusiness.ts" />
/// <reference path="models/business/utils/InternalBusinessFactory.ts" />
/// <reference path="models/business/utils/TagBookmarkBusinessArgs.ts" />
/// <reference path="models/business/utils/BusinessException.ts" />
/// <reference path="models/business/IBookmarkBusiness.ts" />
/// <reference path="models/business/impl/BookmarkBusiness.ts" />
/// <reference path="models/business/ITagBusiness.ts" />
/// <reference path="models/business/impl/TagBusiness.ts" />
/// <reference path="models/business/utils/ScoredBookmark.ts" />
/// <reference path="models/business/ITagBookmarkBusiness.ts" />
/// <reference path="models/business/impl/TagBookmarkBusiness.ts" />
/// <reference path="models/utils/BusinessFactory.ts" />

// Presenters part

/// <reference path="presenters/YimelloPresenter.ts" />
/// <reference path="presenters/IntroPresenter.ts" />
/// <reference path="presenters/TourPresenter.ts" />

// Main presenter
/// <reference path="presenters/MainPresenter/context-menus/ContextMenu.ts" />
/// <reference path="presenters/MainPresenter/context-menus/BookmarkContextMenu.ts" />

/// <reference path="presenters/MainPresenter/overlay-menus/OverlayMenu.ts" />
/// <reference path="presenters/MainPresenter/overlay-menus/BookmarkFormMenu.ts" />
/// <reference path="presenters/MainPresenter/overlay-menus/TagListMenu.ts" />

//grunt-start
/// <reference path="presenters/MainPresenter/BookmarkList.ts" />
/// <reference path="presenters/MainPresenter/MainPresenter.ts" />
/// <reference path="presenters/MainPresenter/SearchBar.ts" />
/// <reference path="presenters/MainPresenter/context-menus/TagContextMenu.ts" />
/// <reference path="presenters/MainPresenter/context-menus/interfaces/IBookmarkContextMenuListener.ts" />
/// <reference path="presenters/MainPresenter/context-menus/interfaces/ITagContextMenuListener.ts" />
/// <reference path="presenters/MainPresenter/interfaces/IBookmarkListListener.ts" />
/// <reference path="presenters/MainPresenter/interfaces/ISearchBarListener.ts" />
/// <reference path="presenters/MainPresenter/overlay-menus/BookmarkDeletionMenu.ts" />
/// <reference path="presenters/MainPresenter/overlay-menus/CreateBackupMenu.ts" />
/// <reference path="presenters/MainPresenter/overlay-menus/ImportBackupMenu.ts" />
/// <reference path="presenters/MainPresenter/overlay-menus/ImportBrowserMenu.ts" />
/// <reference path="presenters/MainPresenter/overlay-menus/TagDeletionMenu.ts" />
/// <reference path="presenters/MainPresenter/overlay-menus/TagFormMenu.ts" />
/// <reference path="presenters/MainPresenter/overlay-menus/interfaces/IBookmarkDeletionMenuListener.ts" />
/// <reference path="presenters/MainPresenter/overlay-menus/interfaces/IBookmarkFormMenuListener.ts" />
/// <reference path="presenters/MainPresenter/overlay-menus/interfaces/IImportBackupMenuListener.ts" />
/// <reference path="presenters/MainPresenter/overlay-menus/interfaces/IImportBrowserMenuListener.ts" />
/// <reference path="presenters/MainPresenter/overlay-menus/interfaces/ITagDeletionMenuListener.ts" />
/// <reference path="presenters/MainPresenter/overlay-menus/interfaces/ITagFormMenuListener.ts" />
/// <reference path="presenters/MainPresenter/overlay-menus/interfaces/ITagListMenuListener.ts" />
/// <reference path="presenters/MainPresenter/templates/BookmarkTemplate.ts" />
/// <reference path="presenters/MainPresenter/templates/TagBookmarkFormTemplate.ts" />
/// <reference path="presenters/MainPresenter/templates/TagListTemplate.ts" />
/// <reference path="presenters/utils/Notifier.ts" />
//grunt-end