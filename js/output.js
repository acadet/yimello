var TSObject = (function () {
    function TSObject() {
    }
    TSObject.prototype.equals = function (obj) {
        return false;
    };

    TSObject.prototype.toString = function () {
        return '';
    };
    return TSObject;
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
    return Exception;
})(TSObject);
var DOMElement = (function (_super) {
    __extends(DOMElement, _super);
    function DOMElement(jQueryObject) {
        _super.call(this);

        this._element = jQueryObject;
    }
    DOMElement.prototype.append = function (content) {
        this._element.append(content);
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
        return new DOMElement(jQuery.parseHTML(s));
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

    DOMElement.prototype.setCss = function (properties) {
        this._element.css(properties);
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
        NodeWindow.getInstance().on(event, callback);
    };

    NodeWindow.moveTo = function (page) {
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
var PatchworkModule;
(function (PatchworkModule) {
    var Point = (function (_super) {
        __extends(Point, _super);
        function Point(x, y) {
            _super.call(this);

            this._x = x;
            this._y = y;
        }
        Point.prototype.getX = function () {
            return this._x;
        };

        Point.prototype.getY = function () {
            return this._y;
        };

        Point.prototype.toString = function () {
            return this._x + ',' + this._y;
        };
        return Point;
    })(TSObject);

    var Triangle = (function (_super) {
        __extends(Triangle, _super);
        function Triangle(e1, e2, e3) {
            _super.call(this);

            this._e1 = e1;
            this._e2 = e2;
            this._e3 = e3;
        }
        Triangle.prototype.build = function () {
            var sbf = new StringBuffer('<polygon points="');

            sbf.append(this._e1.toString()).append(' ').append(this._e2.toString()).append(' ').append(this._e3.toString());

            sbf.append('" />');

            return sbf.toString();
        };
        return Triangle;
    })(TSObject);

    var Line = (function (_super) {
        __extends(Line, _super);
        function Line(e1, e2) {
            _super.call(this);

            this._e1 = e1;
            this._e2 = e2;
        }
        Line.prototype.build = function () {
            var sbf = new StringBuffer('<line style="stroke-width: 1; stroke: black;" ');

            sbf.append('x1="' + this._e1.getX() + '" ').append('y1="' + this._e1.getY() + '" ').append('x2="' + this._e2.getX() + '" ').append('y2="' + this._e2.getY() + '" ');

            return sbf.append(' />').toString();
        };
        return Line;
    })(TSObject);

    var Patchwork = (function (_super) {
        __extends(Patchwork, _super);
        function Patchwork() {
            _super.apply(this, arguments);
        }
        Patchwork.setLength = function (value) {
            Patchwork._length = value;
        };

        Patchwork.build = function (className) {
            if (typeof className === "undefined") { className = 'patchwork'; }
            var x = 0;
            var y = 0;
            var h = Patchwork._length / 2 * Math.sqrt(3);
            var content = new StringBuffer();

            Patchwork._target = DOMTree.findSingle('.' + className);

            while (y < Patchwork._target.getHeight()) {
                while (x < Patchwork._target.getWidth()) {
                    var t1 = new Triangle(new Point(x, y + h), new Point(x + Patchwork._length / 2, y), new Point(x + Patchwork._length, y + h));

                    var t2 = new Triangle(new Point(x + Patchwork._length / 2, y), new Point(x + Patchwork._length * 3 / 2, y), new Point(x + Patchwork._length, y + h));

                    var t3 = new Triangle(new Point(x, y + h), new Point(x + Patchwork._length, y + h), new Point(x + Patchwork._length / 2, y + 2 * h));

                    var t4 = new Triangle(new Point(x + Patchwork._length / 2, y + 2 * h), new Point(x + Patchwork._length, y + h), new Point(x + Patchwork._length * 3 / 2, y + 2 * h));

                    content.append(t1.build()).append(t2.build()).append(t3.build()).append(t4.build());

                    x += Patchwork._length;
                }

                x = 0;
                y += 2 * h;
            }

            Patchwork._target.append('<svg>' + content.toString() + '</svg>');

            Patchwork._canvas = Patchwork._target.findSingle('svg');

            Patchwork._canvas.setCss({
                position: 'absolute',
                top: 0,
                width: Patchwork._target.getWidth() + Patchwork._length,
                left: Patchwork._target.getLeft() - Patchwork._length / 2,
                height: '100%'
            });
        };

        Patchwork._length = 50;
        return Patchwork;
    })(TSObject);
    PatchworkModule.Patchwork = Patchwork;
})(PatchworkModule || (PatchworkModule = {}));
var Presenter = (function (_super) {
    __extends(Presenter, _super);
    function Presenter() {
        _super.call(this);

        PresenterMediator.setInstance(this);

        this.onStart();

        NodeWindow.on(NodeWindowEvents.Blur, this._onPause);
        NodeWindow.on(NodeWindowEvents.Focus, this._onResume);
        NodeWindow.on(NodeWindowEvents.Close, this._onDestroy);
    }
    Presenter.prototype.onStart = function () {
    };

    Presenter.prototype.onResume = function () {
    };

    Presenter.prototype.onPause = function () {
    };

    Presenter.prototype.onDestroy = function () {
    };

    Presenter.prototype._onResume = function () {
        if (!PresenterMediator.hasResumed()) {
            PresenterMediator.setResumed(true);
            PresenterMediator.getInstance().onResume();
        }
    };

    Presenter.prototype._onPause = function () {
        PresenterMediator.setResumed(false);
        PresenterMediator.getInstance().onPause();
    };

    Presenter.prototype._onDestroy = function () {
        PresenterMediator.getInstance().onDestroy();
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
        this._slides = DOMTree.findSingle('.slides');
        this._slideCursors = DOMTree.findSingle('.slide-cursors');

        this._slides.find('.slide').map(function (e) {
            e.centerizeWithMargin(_this._slides);
        });
    };
    return TourPresenter;
})(Presenter);
