// Libs part

/// <reference path="../app/libs/jquery.d.ts" />
/// <reference path="../app/libs/jqueryui.d.ts" />

// System part

/// <reference path="../app/system/TSObject.ts" />
/// <reference path="../app/system/NumberHelper.ts" />
/// <reference path="../app/system/Timer.ts" />
/// <reference path="../app/system/Action.ts" />
/// <reference path="../app/system/Func.ts" />
/// <reference path="../app/system/Exception.ts" />
/// <reference path="../app/system/DOMElement.ts" />
/// <reference path="../app/system/DOMTree.ts" />
/// <reference path="../app/system/strings/StringBuffer.ts" />
/// <reference path="../app/system/node-webkit/NodeWindow.ts" />
/// <reference path="../app/system/node-webkit/Presenter.ts" />
/// <reference path="../app/system/Regex.ts" />
/// <reference path="../app/system/Log.ts" />
/// <reference path="../app/system/Pair.ts" />
/// <reference path="../app/system/Guid.ts" />
/// <reference path="../app/system/MathHelper.ts" />
/// <reference path="../app/system/StringHelper.ts" />
/// <reference path="../app/helpers/FormHelper.ts" />
/// <reference path="../app/system/Environment.ts" />
/// <reference path="../app/system/storage/CacheAPI.ts" />
/// <reference path="../app/system/storage/FileAPI.ts" />
/// <reference path="../app/system/Random.ts" />

// Collections parts

/// <reference path="../app/system/collections/utils/CollectionException.ts" />
/// <reference path="../app/system/collections/IList.ts" />
/// <reference path="../app/system/collections/impl/ArrayList.ts" />
/// <reference path="../app/system/collections/IDictionary.ts" />
/// <reference path="../app/system/collections/impl/Dictionary.ts" />
/// <reference path="../app/system/collections/Queue.ts" />

// Storage part

/// <reference path="../app/system/storage/SQLAPI.ts" />
/// <reference path="../app/system/storage/ActiveRecord/IActiveRecordObject.ts" />
/// <reference path="../app/system/storage/ActiveRecord/ActiveRecordConfig.ts" />
/// <reference path="../app/system/storage/ActiveRecord/ActiveRecordException.ts" />
/// <reference path="../app/system/storage/ActiveRecord/ActiveRecordHelper.ts" />
/// <reference path="../app/system/storage/ActiveRecord/ActiveRecordObject.ts" />

// Ajax part

/// <reference path="../app/system/ajax/AjaxRequest.ts" />
/// <reference path="../app/system/ajax/AjaxRequestDataType.ts" />
/// <reference path="../app/system/ajax/AjaxRequestException.ts" />
/// <reference path="../app/system/ajax/AjaxRequestType.ts" />
/// <reference path="../app/system/ajax/GetRequest.ts" />

// Helpers part

/// <reference path="../app/helpers/ExceptionHandler.ts" />
/// <reference path="../app/helpers/URLHelper.ts" />
/// <reference path="../app/helpers/URLDetailsProvider.ts" />
/// <reference path="../app/helpers/SecurityHelper.ts" />
/// <reference path="../app/helpers/FaviconHelper.ts" />
/// <reference path="../app/helpers/VersionHelper.ts" />

// Beans part

/// <reference path="../app/models/beans/Bookmark.ts" />
/// <reference path="../app/models/beans/Tag.ts" />

// DAO part

/// <reference path="../app/models/utils/AROFactory.ts" />
/// <reference path="../app/models/dao/utils/DAOException.ts" />
/// <reference path="../app/models/dao/IBookmarkDAO.ts" />
/// <reference path="../app/models/dao/ITagDAO.ts" />
/// <reference path="../app/models/dao/ITagBookmarkDAO.ts" />
/// <reference path="../app/models/dao/utils/DataAccessObject.ts" />
/// <reference path="../app/models/dao/impl/BookmarkDAO.ts" />
/// <reference path="../app/models/dao/impl/TagDAO.ts" />
/// <reference path="../app/models/dao/impl/TagBookmarkDAO.ts" />
/// <reference path="../app/models/dao/utils/DAOTables.ts" />
/// <reference path="../app/models/utils/DAOFactory.ts" />

// Business part
/// <reference path="../app/models/business/utils/IInternalBookmarkBusiness.ts" />
/// <reference path="../app/models/business/utils/IInternalTagBusiness.ts" />
/// <reference path="../app/models/business/utils/InternalBusinessFactory.ts" />
/// <reference path="../app/models/business/utils/TagBookmarkBusinessArgs.ts" />
/// <reference path="../app/models/business/utils/BusinessException.ts" />
/// <reference path="../app/models/business/IBookmarkBusiness.ts" />
/// <reference path="../app/models/business/impl/BookmarkBusiness.ts" />
/// <reference path="../app/models/business/ITagBusiness.ts" />
/// <reference path="../app/models/business/impl/TagBusiness.ts" />
/// <reference path="../app/models/business/utils/ScoredBookmark.ts" />
/// <reference path="../app/models/business/ITagBookmarkBusiness.ts" />
/// <reference path="../app/models/business/impl/TagBookmarkBusiness.ts" />
/// <reference path="../app/models/utils/BusinessFactory.ts" />

// Presenters part

/// <reference path="../app/presenters/utils/NotificationMessage.ts" />
/// <reference path="../app/presenters/YimelloPresenter.ts" />
/// <reference path="../app/presenters/IntroPresenter.ts" />
/// <reference path="../app/presenters/TourPresenter.ts" />

// Main presenter
/// <reference path="../app/presenters/MainPresenter/context-menus/ContextMenu.ts" />
/// <reference path="../app/presenters/MainPresenter/context-menus/BookmarkContextMenu.ts" />

/// <reference path="../app/presenters/MainPresenter/overlay-menus/OverlayMenu.ts" />
/// <reference path="../app/presenters/MainPresenter/overlay-menus/BookmarkFormMenu.ts" />
/// <reference path="../app/presenters/MainPresenter/overlay-menus/TagListMenu.ts" />


//grunt-start
/// <reference path="../app/presenters/MainPresenter/BookmarkList.ts" />
/// <reference path="../app/presenters/MainPresenter/MainPresenter.ts" />
/// <reference path="../app/presenters/MainPresenter/SearchBar.ts" />
/// <reference path="../app/presenters/MainPresenter/TagList.ts" />
/// <reference path="../app/presenters/MainPresenter/interfaces/IBookmarkFormSubscriber.ts" />
/// <reference path="../app/presenters/MainPresenter/interfaces/IBookmarkListSubscriber.ts" />
/// <reference path="../app/presenters/MainPresenter/interfaces/ISearchBarListener.ts" />
/// <reference path="../app/presenters/MainPresenter/interfaces/ITagListSubscriber.ts" />
/// <reference path="../app/presenters/MainPresenter/overlay-menus/MenuControl.ts" />
/// <reference path="../app/presenters/MainPresenter/overlay-menus/MenuSubMenu.ts" />
/// <reference path="../app/presenters/MainPresenter/overlay-menus/SubMenu.ts" />
/// <reference path="../app/presenters/MainPresenter/overlay-menus/TagFormSubMenu.ts" />
/// <reference path="../app/presenters/MainPresenter/overlay-menus/interfaces/IMenuControlSubscriber.ts" />
/// <reference path="../app/presenters/MainPresenter/overlay-menus/interfaces/ISubMenuOwner.ts" />
/// <reference path="../app/presenters/MainPresenter/overlay-menus/interfaces/ITagListMenuListener.ts" />
/// <reference path="../app/presenters/MainPresenter/overlay-menus/utils/DragFileArea.ts" />
/// <reference path="../app/presenters/MainPresenter/templates/BookmarkTemplate.ts" />
/// <reference path="../app/presenters/MainPresenter/templates/TagBookmarkFormTemplate.ts" />
/// <reference path="../app/presenters/MainPresenter/templates/TagListTemplate.ts" />
/// <reference path="../app/presenters/MainPresenter/utils/MainPresenterMediator.ts" />
//grunt-end