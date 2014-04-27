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

    DOMElement.prototype.setCss = function (properties) {
        this._element.css(properties);
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

    DOMElement.prototype.toString = function () {
        return this._element.html();
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
var ArrayList = (function (_super) {
    __extends(ArrayList, _super);
    function ArrayList() {
        _super.call(this);

        this.content = new Array();
    }
    ArrayList.prototype.add = function (t) {
        this.content.push(t);
    };

    ArrayList.prototype.getAt = function (index) {
        return this.content[index];
    };

    ArrayList.prototype.getLength = function () {
        return this.content.length;
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

            sbf.append('" style="stroke: black; stroke-width: 1; fill: white;" />');

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

            Patchwork._target.setCss({
                'width': Patchwork._target.getWidth() + Patchwork._length,
                'left': Patchwork._target.getLeft() - Patchwork._length / 2
            });

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
                'width': '100%',
                'height': '100%'
            });
        };

        Patchwork._length = 40;
        return Patchwork;
    })(TSObject);
    PatchworkModule.Patchwork = Patchwork;
})(PatchworkModule || (PatchworkModule = {}));
var Presenter = (function (_super) {
    __extends(Presenter, _super);
    function Presenter() {
        _super.apply(this, arguments);
    }
    return Presenter;
})(TSObject);
var Patchwork = PatchworkModule.Patchwork;

var IntroPresenter = (function (_super) {
    __extends(IntroPresenter, _super);
    function IntroPresenter() {
        _super.call(this);

        this._reset();
    }
    IntroPresenter.prototype._reset = function () {
        Patchwork.build();
    };
    return IntroPresenter;
})(Presenter);
