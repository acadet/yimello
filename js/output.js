var TSObject = (function () {
    function TSObject() {
    }
    TSObject.prototype.equals = function (obj) {
        return this === obj;
    };

    TSObject.prototype.toString = function () {
        return '';
    };
    return TSObject;
})();
var NumberHelper = (function () {
    function NumberHelper() {
    }
    NumberHelper.parseString = function (s) {
        var n = +s;
        return n;
    };

    NumberHelper.toString = function (n) {
        var o = n;
        return o.toString();
    };
    return NumberHelper;
})();
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};

var Timer = (function (_super) {
    __extends(Timer, _super);
    function Timer(handler, delay, argument, frequency) {
        if (typeof argument === "undefined") { argument = null; }
        if (typeof frequency === "undefined") { frequency = -1; }
        var _this = this;
        _super.call(this);

        if (frequency > 0) {
            this._hasIntervals = true;
            setTimeout(function () {
                _this._timer = setInterval(function () {
                    handler(argument);
                }, frequency);
            }, delay);
        } else {
            this._hasIntervals = false;
            this._timer = setTimeout(function () {
                handler(argument);
            }, delay);
        }
    }
    Timer.prototype.clear = function () {
        if (this._hasIntervals) {
            clearInterval(this._timer);
        } else {
            clearTimeout(this._timer);
        }
    };
    return Timer;
})(TSObject);
var Exception = (function (_super) {
    __extends(Exception, _super);
    function Exception(msg) {
        _super.call(this);
        this._error = new Error(msg);
    }
    Exception.prototype.getMessage = function () {
        return this._error.message;
    };

    Exception.prototype.getStackTrace = function () {
        return this._error.stack;
    };

    Exception.prototype.toError = function () {
        return this._error;
    };
    return Exception;
})(TSObject);
var ExceptionHandler = (function (_super) {
    __extends(ExceptionHandler, _super);
    function ExceptionHandler() {
        _super.apply(this, arguments);
    }
    ExceptionHandler.throw = function (e) {
        throw e.toError();
    };
    return ExceptionHandler;
})(TSObject);
var DOMElementEvents = (function () {
    function DOMElementEvents() {
    }
    DOMElementEvents.Click = 'click';

    DOMElementEvents.KeyDown = 'keydown';

    DOMElementEvents.Submit = 'submit';
    return DOMElementEvents;
})();

var DOMElementEventObject = (function (_super) {
    __extends(DOMElementEventObject, _super);
    function DOMElementEventObject(eventObject) {
        _super.call(this);

        this._eventObject = eventObject;
        this._target = DOMElement.fromJS(eventObject.target);
        this._pageX = eventObject.pageX;
        this._pageY = eventObject.pageY;
        this._which = eventObject.which;
    }
    DOMElementEventObject.prototype.getTarget = function () {
        return this._target;
    };

    DOMElementEventObject.prototype.getPageX = function () {
        return this._pageX;
    };

    DOMElementEventObject.prototype.getPageY = function () {
        return this._pageY;
    };

    DOMElementEventObject.prototype.getWhich = function () {
        return this._which;
    };

    DOMElementEventObject.prototype.preventDefault = function () {
        this._eventObject.preventDefault();
    };
    return DOMElementEventObject;
})(TSObject);

var DOMElementException = (function (_super) {
    __extends(DOMElementException, _super);
    function DOMElementException() {
        _super.apply(this, arguments);
    }
    return DOMElementException;
})(Exception);

var DOMElement = (function (_super) {
    __extends(DOMElement, _super);
    function DOMElement(jQueryObject) {
        _super.call(this);

        this._element = jQueryObject;
    }
    DOMElement.prototype.addClass = function (value) {
        this._element.addClass(value);
    };

    DOMElement.prototype.animate = function (prop, duration, callback) {
        var _this = this;
        if (typeof callback === "undefined") { callback = null; }
        this._element.animate(prop, duration, function () {
            if (callback != null) {
                callback(_this);
            }
        });
    };

    DOMElement.prototype.append = function (e) {
        this._element.append(e.toJQuery());
        return this;
    };

    DOMElement.prototype.centerize = function (reference) {
        if (typeof reference === "undefined") { reference = new DOMElement($('body')); }
        this.horizontalCenterize(reference);
        this.verticalCenterize(reference);
    };

    DOMElement.prototype.centerizeWithMargin = function (reference) {
        if (typeof reference === "undefined") { reference = new DOMElement($('body')); }
        this.horizontalCenterizeWithMargin(reference);
        this.verticalCenterizeWithMargin(reference);
    };

    DOMElement.prototype.find = function (criterion) {
        var results = this._element.find(criterion);
        var list = new ArrayList();

        results.each(function (i, e) {
            list.add(DOMElement.fromJS(e));
        });

        return list;
    };

    DOMElement.prototype.findSingle = function (criterion) {
        return new DOMElement(this._element.find(criterion).first());
    };

    DOMElement.fromJS = function (o) {
        return new DOMElement(jQuery(o));
    };

    DOMElement.fromString = function (s) {
        var parse = jQuery.parseHTML(s);
        var o;

        if (parse == null) {
            ExceptionHandler.throw(new DOMElementException('Unable to create DOMElement from string: parse has failed'));
        }

        if (parse.length > 1) {
            ExceptionHandler.throw(new DOMElementException('Unable to create DOMElement from string: specified string contains more than a single element'));
        }

        o = parse[0];

        return DOMElement.fromJS(o);
    };

    DOMElement.prototype.getData = function (key) {
        return this._element.attr('data-' + key);
    };

    DOMElement.prototype.getHeight = function (actual) {
        if (typeof actual === "undefined") { actual = false; }
        return this._element.outerHeight(actual);
    };

    DOMElement.prototype.getLeft = function (relative) {
        if (typeof relative === "undefined") { relative = false; }
        if (relative) {
            return this._element.position().left;
        } else {
            return this._element.offset().left;
        }
    };

    DOMElement.prototype.getTop = function (relative) {
        if (typeof relative === "undefined") { relative = false; }
        if (relative) {
            return this._element.position().top;
        } else {
            return this._element.offset().top;
        }
    };

    DOMElement.prototype.getValue = function () {
        return this._element.val();
    };

    DOMElement.prototype.getWidth = function (actual) {
        if (typeof actual === "undefined") { actual = false; }
        return this._element.outerWidth(actual);
    };

    DOMElement.prototype.horizontalCenterize = function (reference) {
        if (typeof reference === "undefined") { reference = new DOMElement($('body')); }
        this.setCss({
            left: (reference.getWidth() - this.getWidth()) / 2
        });
    };

    DOMElement.prototype.horizontalCenterizeWithMargin = function (reference) {
        if (typeof reference === "undefined") { reference = new DOMElement($('body')); }
        this.setCss({
            marginLeft: (reference.getWidth() - this.getWidth()) / 2
        });
    };

    DOMElement.prototype.off = function (event) {
        this._element.off(event);
    };

    DOMElement.prototype.on = function (event, handler) {
        this._element.on(event, function (e) {
            handler(new DOMElementEventObject(e));
        });
    };

    DOMElement.prototype.parent = function (selector) {
        if (typeof selector === "undefined") { selector = null; }
        return new DOMElement(this._element.parent(selector).first());
    };

    DOMElement.prototype.remove = function () {
        this._element.remove();
    };

    DOMElement.prototype.removeClass = function (value) {
        this._element.removeClass(value);
    };

    DOMElement.prototype.setAttribute = function (key, value) {
        this._element.attr(key, value);
    };

    DOMElement.prototype.setCss = function (properties) {
        this._element.css(properties);
        return this;
    };

    DOMElement.prototype.setData = function (key, value) {
        this._element.attr('data-' + key, value);
    };

    DOMElement.prototype.setText = function (text) {
        this._element.text(text);
    };

    DOMElement.prototype.setValue = function (value) {
        this._element.val(value);
    };

    DOMElement.prototype.toJQuery = function () {
        return this._element;
    };

    DOMElement.prototype.toString = function () {
        return this._element.html();
    };

    DOMElement.prototype.verticalCenterize = function (reference) {
        if (typeof reference === "undefined") { reference = new DOMElement($('body')); }
        this.setCss({
            top: (reference.getHeight() - this.getHeight()) / 2
        });
    };

    DOMElement.prototype.verticalCenterizeWithMargin = function (reference) {
        if (typeof reference === "undefined") { reference = new DOMElement($('body')); }
        this.setCss({
            marginTop: (reference.getHeight() - this.getHeight()) / 2
        });
    };
    return DOMElement;
})(TSObject);
var DOMTree = (function (_super) {
    __extends(DOMTree, _super);
    function DOMTree() {
        _super.apply(this, arguments);
    }
    DOMTree.find = function (criterion) {
        var results = jQuery(document).find(criterion);
        var list = new ArrayList();

        results.each(function (i, e) {
            list.add(DOMElement.fromJS(e));
        });

        return list;
    };

    DOMTree.findSingle = function (criterion) {
        return new DOMElement(jQuery(document).find(criterion).first());
    };
    return DOMTree;
})(TSObject);
var StringBuffer = (function (_super) {
    __extends(StringBuffer, _super);
    function StringBuffer(first) {
        if (typeof first === "undefined") { first = ''; }
        _super.call(this);

        this._content = new Array();
        this._content.push(first);
    }
    StringBuffer.prototype.append = function (s) {
        this._content.push(s);
        return this;
    };

    StringBuffer.prototype.toString = function () {
        var result = '';

        for (var i = 0; i < this._content.length; i++) {
            result += this._content[i];
        }

        return result;
    };
    return StringBuffer;
})(TSObject);

var NodeWindowEvents = (function () {
    function NodeWindowEvents() {
    }
    NodeWindowEvents.Blur = "blur";

    NodeWindowEvents.Focus = "focus";

    NodeWindowEvents.Close = "close";

    NodeWindowEvents.Move = "move";
    return NodeWindowEvents;
})();

var NodeWindow = (function () {
    function NodeWindow() {
        throw new Exception("You cannot create a Window object");
    }
    NodeWindow.getInstance = function () {
        return gui.Window.get();
    };

    NodeWindow.on = function (event, callback) {
        if (event != NodeWindowEvents.Move) {
            NodeWindow.getInstance().on(event, callback);
        } else {
            if (NodeWindow._moveListeners == null) {
                NodeWindow._moveListeners = new ArrayList();
            }
            NodeWindow._moveListeners.add(callback);
        }
    };

    NodeWindow.moveTo = function (page) {
        NodeWindow._moveListeners.map(function (l) {
            l();
        });
        NodeWindow.getInstance().window.location = page;
    };
    return NodeWindow;
})();
var ArrayList = (function (_super) {
    __extends(ArrayList, _super);
    function ArrayList() {
        _super.call(this);

        this._content = new Array();
    }
    ArrayList.prototype.add = function (t) {
        this._content.push(t);
    };

    ArrayList.prototype.getAt = function (index) {
        return this._content[index];
    };

    ArrayList.prototype.getLength = function () {
        return this._content.length;
    };

    ArrayList.prototype.map = function (f) {
        for (var i = 0; i < this._content.length; i++) {
            f(this._content[i]);
        }
    };
    return ArrayList;
})(TSObject);
var Presenter = (function (_super) {
    __extends(Presenter, _super);
    function Presenter() {
        _super.call(this);

        PresenterMediator.setInstance(this);

        this._onStart();

        NodeWindow.on(NodeWindowEvents.Blur, this._onPause);
        NodeWindow.on(NodeWindowEvents.Focus, this._onResume);
        NodeWindow.on(NodeWindowEvents.Close, this._onDestroy);
        NodeWindow.on(NodeWindowEvents.Move, function () {
            PresenterMediator.getInstance().onDestroy.call(PresenterMediator.getInstance());
        });
    }
    Presenter.prototype.onStart = function () {
    };

    Presenter.prototype.onLoad = function () {
        DOMTree.findSingle('body').animate({
            opacity: 1
        }, 500);
    };

    Presenter.prototype.onResume = function () {
    };

    Presenter.prototype.onPause = function () {
    };

    Presenter.prototype.onDestroy = function () {
    };

    Presenter.prototype._onStart = function () {
        this.onStart();
        this.onLoad();
    };

    Presenter.prototype._onResume = function () {
        if (!PresenterMediator.hasResumed()) {
            PresenterMediator.setResumed(true);
            PresenterMediator.getInstance().onResume.call(PresenterMediator.getInstance());
        }
    };

    Presenter.prototype._onPause = function () {
        PresenterMediator.setResumed(false);
        PresenterMediator.getInstance().onPause.call(PresenterMediator.getInstance());
    };

    Presenter.prototype._onDestroy = function () {
        PresenterMediator.getInstance().onDestroy.call(PresenterMediator.getInstance());
        gui.Window.get().close();
    };
    return Presenter;
})(TSObject);
var PresenterMediator = (function (_super) {
    __extends(PresenterMediator, _super);
    function PresenterMediator() {
        _super.apply(this, arguments);
    }
    PresenterMediator.getInstance = function () {
        return PresenterMediator._currentInstance;
    };

    PresenterMediator.setInstance = function (p) {
        PresenterMediator._currentInstance = p;
        PresenterMediator._hasResumed = false;
    };

    PresenterMediator.hasResumed = function () {
        return PresenterMediator._hasResumed;
    };

    PresenterMediator.setResumed = function (b) {
        PresenterMediator._hasResumed = b;
    };
    return PresenterMediator;
})(TSObject);
var IntroPresenter = (function (_super) {
    __extends(IntroPresenter, _super);
    function IntroPresenter() {
        _super.call(this);
    }
    IntroPresenter.prototype.onStart = function () {
        var t;

        DOMTree.findSingle('.intro-strap').centerize();

        t = new Timer(function (o) {
            NodeWindow.moveTo('tour.html');
        }, 3000);
    };
    return IntroPresenter;
})(Presenter);
var TourPresenter = (function (_super) {
    __extends(TourPresenter, _super);
    function TourPresenter() {
        _super.call(this);
    }
    TourPresenter.prototype.onStart = function () {
        var _this = this;
        var i = 0;
        this._slides = DOMTree.findSingle('.slides');
        this._slideCursors = DOMTree.findSingle('.slide-cursors');

        this._slides.find('.slide').map(function (e) {
            e.verticalCenterizeWithMargin(_this._slides);
            e.setData('id', NumberHelper.toString(i));

            if (i != 0) {
                e.setCss({
                    left: _this._slides.getWidth()
                });
            } else {
                _this._currentSlide = e;
            }

            e.find('form').map(function (e) {
                e.on(DOMElementEvents.Submit, function (arg) {
                    arg.preventDefault();
                });
            });

            i++;
        });

        this._slideCursors.verticalCenterizeWithMargin(this._slideCursors.parent());

        for (var j = 0; j < i; j++) {
            var d = DOMElement.fromString('<li></li>');
            d.addClass('slide-cursor');

            if (j == 0) {
                d.addClass('active-cursor');
            }

            d.setData('slide-id', NumberHelper.toString(j));
            d.on(DOMElementEvents.Click, function (e) {
                _this._swapSlide(NumberHelper.parseString(e.getTarget().getData('slide-id')));
            });
            this._slideCursors.append(d);
        }

        DOMTree.findSingle('.slide form.tag-form input[name="tags"]').on(DOMElementEvents.KeyDown, function (e) {
            if (e.getWhich() == '13') {
                _this._createTag(e.getTarget().getValue());
                e.getTarget().setValue('');
            }
        });

        DOMTree.findSingle('#go-button').on(DOMElementEvents.Click, function (e) {
            e.getTarget().off(DOMElementEvents.Click);
            NodeWindow.moveTo('main.html');
        });
    };

    TourPresenter.prototype.onDestroy = function () {
        this._slideCursors.find('.slide-cursor').map(function (e) {
            e.off(DOMElementEvents.Click);
        });
    };

    TourPresenter.prototype._swapSlide = function (id) {
        var currentId = NumberHelper.parseString(this._currentSlide.getData('id'));
        var newSlide;

        if (id == currentId) {
            return;
        }

        newSlide = this._slides.findSingle('.slide[data-id="' + id + '"]');

        if (id > currentId) {
            newSlide.setCss({
                left: this._slides.getWidth()
            }).animate({
                left: 0
            }, 500);
            this._currentSlide.animate({
                left: -this._slides.getWidth()
            }, 500);
        } else {
            newSlide.setCss({
                left: -this._slides.getWidth()
            }).animate({
                left: 0
            }, 500);
            this._currentSlide.animate({
                left: this._slides.getWidth()
            }, 500);
        }

        this._slideCursors.findSingle('.slide-cursor[data-slide-id="' + id + '"]').addClass('active-cursor');
        this._slideCursors.findSingle('.slide-cursor[data-slide-id="' + currentId + '"]').removeClass('active-cursor');

        this._currentSlide = newSlide;
    };

    TourPresenter.prototype._createTag = function (value) {
        var tag;
        var img;

        if (this._tags == null) {
            this._tags = DOMTree.findSingle('.slide .tags');
            TourPresenter._tagIds = 0;
        }

        tag = DOMElement.fromString('<li><p>' + value + '</p></li>');
        tag.addClass('tag');
        img = DOMElement.fromString('<img />');
        img.setAttribute('src', "assets/img/x-mark-icon.png");
        img.addClass('delete-tag');
        img.setData('tag-id', NumberHelper.toString(TourPresenter._tagIds));
        TourPresenter._tagIds++;

        tag.append(img);
        this._tags.append(tag);

        img.on(DOMElementEvents.Click, function (e) {
            img.off(DOMElementEvents.Click);
            tag.remove();
        });
    };
    return TourPresenter;
})(Presenter);
var MainPresenter = (function (_super) {
    __extends(MainPresenter, _super);
    function MainPresenter() {
        _super.apply(this, arguments);
    }
    return MainPresenter;
})(Presenter);
var ActiveRecordConfig = (function (_super) {
    __extends(ActiveRecordConfig, _super);
    function ActiveRecordConfig(databaseName, databaseVersion, databaseSize) {
        if (typeof databaseVersion === "undefined") { databaseVersion = '1.0'; }
        if (typeof databaseSize === "undefined") { databaseSize = 5 * 1024 * 1024; }
        _super.call(this);

        this.setDatabaseName(databaseName);
        this.setDatabaseVersion(databaseVersion);
        this.setDatabaseSize(databaseSize);
    }
    ActiveRecordConfig.prototype.getDatabaseName = function () {
        return this._dbName;
    };

    ActiveRecordConfig.prototype.setDatabaseName = function (name) {
        this._dbName = name;
    };

    ActiveRecordConfig.prototype.getDatabaseVersion = function () {
        return this._dbVersion;
    };

    ActiveRecordConfig.prototype.setDatabaseVersion = function (version) {
        this._dbVersion = version;
    };

    ActiveRecordConfig.prototype.getDatabaseSize = function () {
        return this._dbSize;
    };

    ActiveRecordConfig.prototype.setDatabaseSize = function (size) {
        this._dbSize = size;
    };
    return ActiveRecordConfig;
})(TSObject);
var ActiveRecordHelper = (function (_super) {
    __extends(ActiveRecordHelper, _super);
    function ActiveRecordHelper() {
        _super.apply(this, arguments);
    }
    ActiveRecordHelper.getListFromSQLResultSet = function (set, converter) {
        if (typeof converter === "undefined") { converter = null; }
        var s = set.getRows();
        var outcome = new ArrayList();

        for (var i = 0; i < s.getLength(); i++) {
            if (converter !== null) {
                outcome.add(converter(s.item(i)));
            } else {
                outcome.add(s.item(i));
            }
        }

        return outcome;
    };
    return ActiveRecordHelper;
})(TSObject);
var ActiveRecordObject = (function (_super) {
    __extends(ActiveRecordObject, _super);
    function ActiveRecordObject() {
        _super.apply(this, arguments);
    }
    ActiveRecordObject._init = function () {
        if (ActiveRecordObject._currentDB !== null) {
            ActiveRecordObject._currentDB = SQLDatabase.open(ActiveRecordObject._currentConfig.getDatabaseName(), ActiveRecordObject._currentConfig.getDatabaseVersion(), ActiveRecordObject._currentConfig.getDatabaseName(), ActiveRecordObject._currentConfig.getDatabaseSize());
        }
    };

    ActiveRecordObject.init = function (config) {
        ActiveRecordObject._currentConfig = config;
    };

    ActiveRecordObject.get = function (table, callback, converter) {
        if (typeof converter === "undefined") { converter = null; }
        ActiveRecordObject._init();
        ActiveRecordObject._currentDB.transaction(function (tx) {
            tx.execute('SELECT * FROM ?', [table], function (tx, outcome) {
                callback(ActiveRecordHelper.getListFromSQLResultSet(outcome, converter));
            }, null);
        });
    };
    return ActiveRecordObject;
})(TSObject);

var SQLRowSet = (function () {
    function SQLRowSet(rowSet) {
        this._rows = rowSet;
    }
    SQLRowSet.prototype.getLength = function () {
        return this._rows.length;
    };

    SQLRowSet.prototype.item = function (i) {
        return this._rows.item(i);
    };
    return SQLRowSet;
})();

var SQLResultSet = (function () {
    function SQLResultSet(set) {
        this._set = set;
    }
    SQLResultSet.prototype.getInsertId = function () {
        return this._set.insertId;
    };

    SQLResultSet.prototype.getRowsAffected = function () {
        return this._set.rowsAffected;
    };

    SQLResultSet.prototype.getRows = function () {
        return new SQLRowSet(this._set.rows);
    };
    return SQLResultSet;
})();

var SQLTransaction = (function () {
    function SQLTransaction(transaction) {
        this._tx = transaction;
    }
    SQLTransaction.prototype.execute = function (statement, arguments, success, error) {
        this._tx.executeSql(statement, arguments, function (o, results) {
            success(new SQLTransaction(o), new SQLResultSet(results));
        }, function (tx, e) {
            error(new SQLTransaction(tx), new SQLError(e));
        });
    };
    return SQLTransaction;
})();

var SQLError = (function () {
    function SQLError(error) {
        this._error = error;
    }
    SQLError.prototype.getCode = function () {
        return this._error.code;
    };

    SQLError.prototype.getMessage = function () {
        return this._error.message;
    };
    return SQLError;
})();

var SQLDatabase = (function () {
    function SQLDatabase(dbObj) {
        this._db = dbObj;
    }
    SQLDatabase.open = function (name, version, displayName, size, callback) {
        if (typeof callback === "undefined") { callback = null; }
        var db = window.openDatabase(name, version, displayName, size, function (o) {
            callback(new SQLDatabase(o));
        });

        return new SQLDatabase(db);
    };

    SQLDatabase.prototype.transaction = function (success, error) {
        if (typeof error === "undefined") { error = null; }
        this._db.transaction(function (o) {
            success(new SQLTransaction(o));
        }, function (o) {
            error(new SQLError(o));
        });
    };
    return SQLDatabase;
})();
