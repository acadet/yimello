var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var tsUnit;
(function (tsUnit) {
    var Test = (function () {
        function Test() {
            this.tests = [];
            this.testClass = new TestClass();
        }
        Test.prototype.addTestClass = function (testClass, name) {
            if (typeof name === "undefined") { name = 'Tests'; }
            this.tests.push(new TestDefintion(testClass, name));
        };

        Test.prototype.isReservedFunctionName = function (functionName) {
            for (var prop in this.testClass) {
                if (prop === functionName) {
                    return true;
                }
            }
            return false;
        };

        Test.prototype.run = function () {
            var testContext = new TestContext();
            var testResult = new TestResult();

            for (var i = 0; i < this.tests.length; ++i) {
                var testClass = this.tests[i].testClass;
                var testName = this.tests[i].name;
                for (var prop in testClass) {
                    if (!this.isReservedFunctionName(prop)) {
                        if (typeof testClass[prop] === 'function') {
                            if (typeof testClass['setUp'] === 'function') {
                                testClass['setUp']();
                            }
                            try  {
                                testClass[prop](testContext);
                                testResult.passes.push(new TestDescription(testName, prop, 'OK'));
                            } catch (err) {
                                testResult.errors.push(new TestDescription(testName, prop, err));
                            }
                            if (typeof testClass['tearDown'] === 'function') {
                                testClass['tearDown']();
                            }
                        }
                    }
                }
            }

            return testResult;
        };

        Test.prototype.showResults = function (target, result) {
            var template = '<article>' + '<h1>' + this.getTestResult(result) + '</h1>' + '<p>' + this.getTestSummary(result) + '</p>' + '<section id="tsFail">' + '<h2>Errors</h2>' + '<ul class="bad">' + this.getTestResultList(result.errors) + '</ul>' + '</section>' + '<section id="tsOkay">' + '<h2>Passing Tests</h2>' + '<ul class="good">' + this.getTestResultList(result.passes) + '</ul>' + '</section>' + '</article>';

            target.innerHTML = template;
        };

        Test.prototype.getTestResult = function (result) {
            return result.errors.length === 0 ? 'Test Passed' : 'Test Failed';
        };

        Test.prototype.getTestSummary = function (result) {
            return 'Total tests: <span id="tsUnitTotalCout">' + (result.passes.length + result.errors.length).toString() + '</span>. ' + 'Passed tests: <span id="tsUnitPassCount" class="good">' + result.passes.length + '</span>. ' + 'Failed tests: <span id="tsUnitFailCount" class="bad">' + result.errors.length + '</span>.';
        };

        Test.prototype.getTestResultList = function (testResults) {
            var list = '';
            var group = '';
            var isFirst = true;
            for (var i = 0; i < testResults.length; ++i) {
                var result = testResults[i];
                if (result.testName !== group) {
                    group = result.testName;
                    if (isFirst) {
                        isFirst = false;
                    } else {
                        list += '</li></ul>';
                    }
                    list += '<li>' + result.testName + '<ul>';
                }
                list += '<li>' + result.funcName + '(): ' + this.encodeHtmlEntities(result.message) + '</li>';
            }
            return list + '</ul>';
        };

        Test.prototype.encodeHtmlEntities = function (input) {
            var entitiesToReplace = { '&': '&amp;', '<': '&lt;', '>': '&gt;' };
            input.replace(/[&<>]/g, function (entity) {
                return entitiesToReplace[entity] || entity;
            });
            return input;
        };
        return Test;
    })();
    tsUnit.Test = Test;

    var TestContext = (function () {
        function TestContext() {
        }
        TestContext.prototype.setUp = function () {
        };

        TestContext.prototype.tearDown = function () {
        };

        TestContext.prototype.areIdentical = function (a, b) {
            if (a !== b) {
                throw 'areIdentical failed when passed ' + '{' + (typeof a) + '} "' + a + '" and ' + '{' + (typeof b) + '} "' + b + '"';
            }
        };

        TestContext.prototype.areNotIdentical = function (a, b) {
            if (a === b) {
                throw 'areNotIdentical failed when passed ' + '{' + (typeof a) + '} "' + a + '" and ' + '{' + (typeof b) + '} "' + b + '"';
            }
        };

        TestContext.prototype.isTrue = function (a) {
            if (!a) {
                throw 'isTrue failed when passed ' + '{' + (typeof a) + '} "' + a + '"';
            }
        };

        TestContext.prototype.isFalse = function (a) {
            if (a) {
                throw 'isFalse failed when passed ' + '{' + (typeof a) + '} "' + a + '"';
            }
        };

        TestContext.prototype.isTruthy = function (a) {
            if (!a) {
                throw 'isTrue failed when passed ' + '{' + (typeof a) + '} "' + a + '"';
            }
        };

        TestContext.prototype.isFalsey = function (a) {
            if (a) {
                throw 'isFalse failed when passed ' + '{' + (typeof a) + '} "' + a + '"';
            }
        };

        TestContext.prototype.throws = function (a) {
            var isThrown = false;
            try  {
                a();
            } catch (ex) {
                isThrown = true;
            }
            if (!isThrown) {
                throw 'did not throw an error';
            }
        };

        TestContext.prototype.fail = function () {
            throw 'fail';
        };
        return TestContext;
    })();
    tsUnit.TestContext = TestContext;

    var TestClass = (function (_super) {
        __extends(TestClass, _super);
        function TestClass() {
            _super.apply(this, arguments);
        }
        return TestClass;
    })(TestContext);
    tsUnit.TestClass = TestClass;

    var FakeFunction = (function () {
        function FakeFunction(name, delgate) {
            this.name = name;
            this.delgate = delgate;
        }
        return FakeFunction;
    })();
    tsUnit.FakeFunction = FakeFunction;

    var Fake = (function () {
        function Fake(obj) {
            for (var prop in obj) {
                if (typeof obj[prop] === 'function') {
                    this[prop] = function () {
                    };
                } else {
                    this[prop] = null;
                }
            }
        }
        Fake.prototype.create = function () {
            return this;
        };

        Fake.prototype.addFunction = function (name, delegate) {
            this[name] = delegate;
        };

        Fake.prototype.addProperty = function (name, value) {
            this[name] = value;
        };
        return Fake;
    })();
    tsUnit.Fake = Fake;

    var TestDefintion = (function () {
        function TestDefintion(testClass, name) {
            this.testClass = testClass;
            this.name = name;
        }
        return TestDefintion;
    })();

    var TestError = (function () {
        function TestError(name, message) {
            this.name = name;
            this.message = message;
        }
        return TestError;
    })();

    var TestDescription = (function () {
        function TestDescription(testName, funcName, message) {
            this.testName = testName;
            this.funcName = funcName;
            this.message = message;
        }
        return TestDescription;
    })();
    tsUnit.TestDescription = TestDescription;

    var TestResult = (function () {
        function TestResult() {
            this.passes = [];
            this.errors = [];
        }
        return TestResult;
    })();
    tsUnit.TestResult = TestResult;
})(tsUnit || (tsUnit = {}));
var TSObject = (function () {
    function TSObject() {
    }
    TSObject.prototype.equals = function (obj) {
        return this === obj;
    };

    TSObject.exists = function (obj) {
        return (obj !== null && obj !== undefined);
    };

    TSObject.prototype.toString = function () {
        return '';
    };
    return TSObject;
})();

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
    function Exception(msg, name) {
        if (typeof name === "undefined") { name = 'Exception'; }
        _super.call(this);

        this._error = new Error(msg);
        this._error.name = name;
    }
    Exception.prototype.getMessage = function () {
        return this._error.message;
    };

    Exception.prototype.getName = function () {
        return this._error.name;
    };

    Exception.prototype.getStackTrace = function () {
        return this._error.stack;
    };

    Exception.prototype.toString = function () {
        return this._error.name + ': ' + this._error.message;
    };
    return Exception;
})(TSObject);
var DOMElementEvents = (function () {
    function DOMElementEvents() {
    }
    DOMElementEvents.Blur = 'blur';
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

    DOMElement.prototype.getAttribute = function (key) {
        return this._element.attr(key);
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

    DOMElement.prototype.getTagName = function () {
        return this._element.get(0).localName;
    };

    DOMElement.prototype.getText = function () {
        return this._element.text();
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
var DOMTreeException = (function (_super) {
    __extends(DOMTreeException, _super);
    function DOMTreeException() {
        _super.apply(this, arguments);
    }
    return DOMTreeException;
})(Exception);

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

    DOMTree.fromString = function (s) {
        var a;
        var l;

        a = jQuery.parseHTML(s);

        if (a === null) {
            return null;
        }

        l = new ArrayList();

        for (var i = 0; i < a.length; i++) {
            var d = DOMElement.fromJS(a[i]);
            l.add(d);
        }

        return l;
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
var RegexFlags = (function () {
    function RegexFlags() {
    }
    RegexFlags.Insensitive = 'i';
    RegexFlags.Global = 'g';
    RegexFlags.Multi = 'm';
    return RegexFlags;
})();

var Regex = (function (_super) {
    __extends(Regex, _super);
    function Regex(pattern, flags) {
        if (typeof flags === "undefined") { flags = null; }
        _super.call(this);

        this._regex = new RegExp(pattern, this._buildFlags(flags));
    }
    Regex.prototype._buildFlags = function (flags) {
        var s = '';

        if (flags !== null) {
            for (var i = 0; i < flags.length; i++) {
                s += flags[0];
            }
        }

        return s;
    };

    Regex.prototype.execute = function (s) {
        var r = this._regex.exec(s);

        if (r === null) {
            return null;
        } else {
            return r[1];
        }
    };

    Regex.prototype.test = function (s) {
        return this._regex.test(s);
    };
    return Regex;
})(TSObject);
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["Debug"] = 0] = "Debug";
    LogLevel[LogLevel["Test"] = 1] = "Test";
    LogLevel[LogLevel["Production"] = 2] = "Production";
})(LogLevel || (LogLevel = {}));

var Log = (function () {
    function Log() {
    }
    Log.setLevel = function (l) {
        Log._currentLevel = l;
    };

    Log.debug = function (msg) {
        if (this._currentLevel <= 0 /* Debug */) {
            console.log('DEBUG: ' + msg);
        }
    };

    Log.inform = function (msg) {
        if (this._currentLevel <= 1 /* Test */) {
            console.log('%cINFORM: ' + msg, 'color: LightSkyBlue;');
        }
    };

    Log.warn = function (msg) {
        if (this._currentLevel <= 2 /* Production */) {
            console.log('%cWARN: ' + msg, 'color: orange;');
        }
    };

    Log.error = function (e) {
        console.error('Error: ' + e.toString());
    };
    Log._currentLevel = 0 /* Debug */;
    return Log;
})();
var Pair = (function (_super) {
    __extends(Pair, _super);
    function Pair(first, second) {
        if (typeof first === "undefined") { first = null; }
        if (typeof second === "undefined") { second = null; }
        _super.call(this);

        this._first = first;
        this._second = second;
    }
    Pair.prototype.getFirst = function () {
        return this._first;
    };

    Pair.prototype.setFirst = function (first) {
        this._first = first;
    };

    Pair.prototype.getSecond = function () {
        return this._second;
    };

    Pair.prototype.setSecond = function (second) {
        this._second = second;
    };
    return Pair;
})(TSObject);
var ArrayList = (function (_super) {
    __extends(ArrayList, _super);
    function ArrayList() {
        _super.call(this);

        this._content = new Array();
    }
    ArrayList.prototype.add = function (t) {
        this._content.push(t);
    };

    ArrayList.prototype.clone = function () {
        var l = new ArrayList();

        for (var i = 0; i < this.getLength(); i++) {
            l.add(this.getAt(i));
        }

        return l;
    };

    ArrayList.prototype.forEach = function (f) {
        for (var i = 0; i < this.getLength(); i++) {
            f(this.getAt(i));
        }
    };

    ArrayList.prototype.getAt = function (index) {
        return this._content[index];
    };

    ArrayList.prototype.getLength = function () {
        return this._content.length;
    };

    ArrayList.prototype.insertAt = function (index, t) {
        if (index > this.getLength() || index < 0) {
            throw new Exception('Unbound index');
        }

        if (index === this.getLength() || this.getLength() === 0) {
            this.add(t);
            return;
        }

        this._content.splice(index, 0, t);
    };

    ArrayList.prototype.map = function (f) {
        for (var i = 0; i < this._content.length; i++) {
            f(this._content[i]);
        }
    };

    ArrayList.prototype.toArray = function () {
        return this._content;
    };
    return ArrayList;
})(TSObject);
var DictionaryException = (function (_super) {
    __extends(DictionaryException, _super);
    function DictionaryException() {
        _super.apply(this, arguments);
    }
    return DictionaryException;
})(Exception);

var Dictionary = (function (_super) {
    __extends(Dictionary, _super);
    function Dictionary() {
        _super.call(this);

        this._keys = new Array();
        this._values = new Array();
    }
    Dictionary.prototype.add = function (key, value) {
        if (this.containsKey(key)) {
            throw new DictionaryException('Unable to add couple: key is already existing');
        }

        this._keys.push(key);
        this._values.push(value);
    };

    Dictionary.prototype.clone = function () {
        var d = new Dictionary();

        this.forEach(function (k, v) {
            d.add(k, v);
        });

        return d;
    };

    Dictionary.prototype.containsKey = function (key) {
        for (var i = 0; i < this._keys.length; i++) {
            if (this._keys[i] === key) {
                return true;
            }
        }

        return false;
    };

    Dictionary.prototype.forEach = function (f) {
        for (var i = 0; i < this._keys.length; i++) {
            f(this._keys[i], this._values[i]);
        }
    };

    Dictionary.prototype.get = function (key) {
        for (var i = 0; i < this._keys.length; i++) {
            if (this._keys[i] === key) {
                return this._values[i];
            }
        }

        return null;
    };

    Dictionary.prototype.getLength = function () {
        return this._keys.length;
    };
    return Dictionary;
})(TSObject);

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
var ActiveRecordConfig = (function (_super) {
    __extends(ActiveRecordConfig, _super);
    function ActiveRecordConfig(databaseName, databaseVersion, databaseSize) {
        if (typeof databaseVersion === "undefined") { databaseVersion = '1.0'; }
        if (typeof databaseSize === "undefined") { databaseSize = 10 * 1024 * 1024; }
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
var ActiveRecordException = (function (_super) {
    __extends(ActiveRecordException, _super);
    function ActiveRecordException(msg) {
        _super.call(this, msg, 'ActiveRecordException');
    }
    return ActiveRecordException;
})(Exception);
var ActiveRecordHelper = (function (_super) {
    __extends(ActiveRecordHelper, _super);
    function ActiveRecordHelper() {
        _super.apply(this, arguments);
    }
    ActiveRecordHelper.transactionErrorHandler = function (e) {
        Log.error(new ActiveRecordException(e.getMessage()));
    };

    ActiveRecordHelper.executeErrorHandler = function (tx, e) {
        Log.error(new ActiveRecordException(e.getMessage()));
        return true;
    };

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
        if (!TSObject.exists(ActiveRecordObject._currentDB)) {
            ActiveRecordObject._currentDB = SQLDatabase.open(ActiveRecordObject._currentConfig.getDatabaseName(), ActiveRecordObject._currentConfig.getDatabaseVersion(), ActiveRecordObject._currentConfig.getDatabaseName(), ActiveRecordObject._currentConfig.getDatabaseSize());
        }
    };

    ActiveRecordObject.init = function (config) {
        ActiveRecordObject._currentConfig = config;
    };

    ActiveRecordObject.executeSQL = function (request, callback) {
        ActiveRecordObject._init();
        ActiveRecordObject._currentDB.transaction(function (tx) {
            tx.execute(request, [], function (tx, outcome) {
                return callback(outcome);
            }, ActiveRecordHelper.executeErrorHandler);
        });
    };

    ActiveRecordObject.get = function (table, callback, converter) {
        if (typeof converter === "undefined") { converter = null; }
        ActiveRecordObject._init();
        ActiveRecordObject._currentDB.transaction(function (tx) {
            tx.execute('SELECT * FROM ?', [table], function (tx, outcome) {
                callback(ActiveRecordHelper.getListFromSQLResultSet(outcome, converter));
            }, ActiveRecordHelper.executeErrorHandler);
        }, ActiveRecordHelper.transactionErrorHandler);
    };

    ActiveRecordObject.insert = function (table, data, callback) {
        if (typeof callback === "undefined") { callback = null; }
        if (!TSObject.exists(data)) {
            Log.error(new ActiveRecordException('insert(): Provided data are undefined'));
            if (callback !== null) {
                callback(false);
            }
            return;
        }

        ActiveRecordObject._init();
        ActiveRecordObject._currentDB.transaction(function (tx) {
            var args;
            var s = new StringBuffer();
            s.append('(');

            for (var i = 0; i < data.getLength(); i++) {
                if (i === 0) {
                    s.append('?');
                } else {
                    s.append(', ?');
                }
            }

            s.append(')');
            args = data.clone();
            args.insertAt(0, table);

            tx.execute('INSERT INTO ? VALUES ' + s.toString(), args.toArray(), function (tx, outcome) {
                if (callback !== null) {
                    callback(true);
                }
            }, ActiveRecordHelper.executeErrorHandler);
        }, ActiveRecordHelper.transactionErrorHandler);
    };

    ActiveRecordObject.update = function (table, selector, data, callback) {
        if (typeof callback === "undefined") { callback = null; }
        if (!TSObject.exists(data)) {
            Log.error(new ActiveRecordException('update(): Provided data are undefined'));
            if (callback !== null) {
                callback(false);
            }
            return;
        }

        ActiveRecordObject._init();
        ActiveRecordObject._currentDB.transaction(function (tx) {
            var args;
            var marks = new StringBuffer();

            for (var i = 0; i < data.getLength(); i++) {
                if (i === 0) {
                    marks.append('? = ?');
                } else {
                    marks.append(', ? = ?');
                }
            }

            data.forEach(function (k, v) {
                args.add(k);
                args.add(v);
            });

            args.insertAt(0, table);
            args.add(selector.getFirst());
            args.add(selector.getSecond());

            tx.execute('UPDATE INTO ? SET ' + marks.toString() + ' WHERE ? = ?', args.toArray(), function (tx, outcome) {
                if (callback !== null) {
                    callback(true);
                }
            }, ActiveRecordHelper.executeErrorHandler);
        }, ActiveRecordHelper.transactionErrorHandler);
    };

    ActiveRecordObject.couple = function (table, pairs, callback) {
        if (typeof callback === "undefined") { callback = null; }
        if (!TSObject.exists(pairs)) {
            Log.error(new ActiveRecordException('couple(): Provided pairs are undefined'));
            if (callback !== null) {
                callback(false);
            }
            return;
        }

        ActiveRecordObject._init();
        ActiveRecordObject._currentDB.transaction(function (tx) {
            for (var i = 0; i < pairs.getLength(); i++) {
                var p = pairs.getAt(i);
                var args = new ArrayList();

                args.add(table);
                args.add(p.getFirst());
                args.add(p.getSecond());

                tx.execute('INSERT INTO ? VALUES (?, ?)', args.toArray(), function (tx, outcome) {
                    if (callback !== null) {
                        callback(true);
                    }
                }, ActiveRecordHelper.executeErrorHandler);
            }
        }, ActiveRecordHelper.transactionErrorHandler);
    };
    return ActiveRecordObject;
})(TSObject);

var AjaxRequest = (function (_super) {
    __extends(AjaxRequest, _super);
    function AjaxRequest(url) {
        _super.call(this);

        this._errorHandler = function (xhr, status, error) {
            ExceptionHandler.throw(new AjaxRequestException(error));
        };

        this._url = url;
    }
    AjaxRequest.prototype.setURL = function (url) {
        this._url = url;
        return this;
    };

    AjaxRequest.prototype.setType = function (type) {
        this._type = type;
        return this;
    };

    AjaxRequest.prototype.setDataType = function (dataType) {
        this._dataType = dataType;
        return this;
    };

    AjaxRequest.prototype.setData = function (obj) {
        this._data = obj;
        return this;
    };

    AjaxRequest.prototype.setErrorHandler = function (h) {
        this._errorHandler = h;
        return this;
    };

    AjaxRequest.prototype.execute = function (success) {
        jQuery.ajax({
            type: this._type,
            dataType: this._dataType,
            url: this._url,
            data: this._data,
            success: success,
            error: this._errorHandler
        });
    };
    return AjaxRequest;
})(TSObject);
var AjaxRequestDataType = (function () {
    function AjaxRequestDataType() {
    }
    AjaxRequestDataType.Xml = 'xml';

    AjaxRequestDataType.Html = 'html';

    AjaxRequestDataType.Json = 'json';

    AjaxRequestDataType.Text = 'text';
    return AjaxRequestDataType;
})();
var AjaxRequestException = (function (_super) {
    __extends(AjaxRequestException, _super);
    function AjaxRequestException() {
        _super.apply(this, arguments);
    }
    return AjaxRequestException;
})(Exception);
var AjaxRequestType = (function () {
    function AjaxRequestType() {
    }
    AjaxRequestType.Get = 'GET';

    AjaxRequestType.Post = 'POST';

    AjaxRequestType.Put = 'PUT';

    AjaxRequestType.Delete = 'DELETE';
    return AjaxRequestType;
})();
var GetRequest = (function (_super) {
    __extends(GetRequest, _super);
    function GetRequest(url) {
        _super.call(this, url);

        this.setType(AjaxRequestType.Get);
    }
    return GetRequest;
})(AjaxRequest);
var ExceptionHandler = (function (_super) {
    __extends(ExceptionHandler, _super);
    function ExceptionHandler() {
        _super.apply(this, arguments);
    }
    ExceptionHandler.throw = function (e) {
        throw e;
    };
    return ExceptionHandler;
})(TSObject);
var URLHelper = (function (_super) {
    __extends(URLHelper, _super);
    function URLHelper() {
        _super.apply(this, arguments);
    }
    URLHelper.isValid = function (url) {
        var e;

        e = new Regex('http\:\/\/.*\..*', [RegexFlags.Insensitive]);

        return e.test(url);
    };
    return URLHelper;
})(TSObject);
var URLDetailsProviderError;
(function (URLDetailsProviderError) {
    URLDetailsProviderError[URLDetailsProviderError["BadURL"] = 0] = "BadURL";
    URLDetailsProviderError[URLDetailsProviderError["NoMedata"] = 1] = "NoMedata";
    URLDetailsProviderError[URLDetailsProviderError["Ajax"] = 2] = "Ajax";
})(URLDetailsProviderError || (URLDetailsProviderError = {}));

var URLDetailsProvider = (function (_super) {
    __extends(URLDetailsProvider, _super);
    function URLDetailsProvider() {
        _super.apply(this, arguments);
    }
    URLDetailsProvider.getDetails = function (url, success, errorHandler) {
        if (URLHelper.isValid(url)) {
            var request;

            request = new GetRequest(url);
            request.setDataType(AjaxRequestDataType.Html);
            request.setErrorHandler(function (xhr, status, error) {
                errorHandler(2 /* Ajax */, error);
            });
            request.execute(function (data, status, xhr) {
                var title;
                var description;
                var r1, r2;

                r1 = new Regex('\<title\>(.*)\<\/title\>', [RegexFlags.Insensitive]);
                title = r1.execute(data);

                r2 = new Regex('\<meta name\=\"description\" content\=\"(.*)\"', [RegexFlags.Insensitive]);
                description = r2.execute(data);

                success(title, description);
            });
        } else {
            errorHandler(0 /* BadURL */, 'URL is bad formatted');
        }
    };
    return URLDetailsProvider;
})(TSObject);
var DAOTables = (function () {
    function DAOTables() {
    }
    DAOTables.Tags = 'tags';
    DAOTables.Bookmarks = 'bookmarks';

    DAOTables.TagBookmark = 'tag_bookmark';
    return DAOTables;
})();
var DataAccessObject = (function (_super) {
    __extends(DataAccessObject, _super);
    function DataAccessObject() {
        _super.call(this);

        var config = new ActiveRecordConfig('yimello');

        ActiveRecordObject.init(config);
    }
    DataAccessObject.prototype.getId = function () {
        return this._id;
    };

    DataAccessObject.prototype.setId = function (id) {
        this._id = id;
        return this;
    };
    return DataAccessObject;
})(TSObject);
var BookmarkDAO = (function (_super) {
    __extends(BookmarkDAO, _super);
    function BookmarkDAO() {
        _super.apply(this, arguments);
    }
    BookmarkDAO.prototype.getURL = function () {
        return this._url;
    };

    BookmarkDAO.prototype.setURL = function (u) {
        this._url = u;
        return this;
    };

    BookmarkDAO.prototype.getTitle = function () {
        return this._title;
    };

    BookmarkDAO.prototype.setTitle = function (t) {
        this._title = t;
        return this;
    };

    BookmarkDAO.prototype.getDescription = function () {
        return this._description;
    };

    BookmarkDAO.prototype.setDescription = function (d) {
        this._description = d;
        return this;
    };

    BookmarkDAO.prototype.add = function (callback) {
        if (typeof callback === "undefined") { callback = null; }
        var l = new ArrayList();

        l.add(this.getId());
        l.add(this.getURL());
        l.add(this.getTitle());
        l.add(this.getDescription());

        ActiveRecordObject.insert(DAOTables.Bookmarks, l, callback);
    };

    BookmarkDAO.prototype.update = function (callback) {
        if (typeof callback === "undefined") { callback = null; }
        var dict;
        var selector;

        dict = new Dictionary();
        selector = new Pair('id', this.getId());

        dict.add('title', this.getTitle());
        dict.add('url', this.getURL());
        dict.add('description', this.getDescription());

        ActiveRecordObject.update(DAOTables.Bookmarks, selector, dict, callback);
    };

    BookmarkDAO.prototype.bindToTags = function (tags) {
        var _this = this;
        var l = new ArrayList();

        tags.forEach(function (t) {
            var p;
            p = new Pair(_this.getId(), t.getId());
            l.add(p);
        });

        ActiveRecordObject.couple(DAOTables.Bookmarks, l);
    };
    return BookmarkDAO;
})(DataAccessObject);
var TagDAO = (function (_super) {
    __extends(TagDAO, _super);
    function TagDAO() {
        _super.apply(this, arguments);
    }
    TagDAO._fromObject = function (obj) {
        var t = new TagDAO();
        t.setId(obj.id);
        t.setLabel(obj.label);

        return t;
    };

    TagDAO.prototype.getLabel = function () {
        return this._label;
    };

    TagDAO.prototype.setLabel = function (l) {
        this._label = l;
        return this;
    };

    TagDAO.get = function (callback) {
        ActiveRecordObject.get(DAOTables.Tags, callback, TagDAO._fromObject);
    };
    return TagDAO;
})(DataAccessObject);
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
            if (e.getWhich() === 13) {
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
    MainPresenter.prototype._switchToBookmarkForm = function () {
        this._mainViewWrapper.animate({
            left: '-100%'
        }, 500);

        this._bookmarkFormWrapper.animate({
            left: 0
        }, 500);
    };

    MainPresenter.prototype._addTag = function (value) {
        var e;

        console.log('here :' + value);

        if (!TSObject.exists(this._tagList)) {
            this._tagList = this._bookmarkFormWrapper.findSingle('.tags');
        }

        e = DOMElement.fromString('<li>' + value + '</li>');
        this._tagList.append(e);
    };

    MainPresenter.prototype.onStart = function () {
        var _this = this;
        this._mainViewWrapper = DOMTree.findSingle('#js-main-view-wrapper');
        this._bookmarkFormWrapper = DOMTree.findSingle('#js-bookmark-form-wrapper');
        this._bookmarkAddTrigger = DOMTree.findSingle('#js-bookmark-add-trigger');
        this._urlInput = this._bookmarkFormWrapper.findSingle('input[name="url"]');
        this._titleInput = this._bookmarkFormWrapper.findSingle('input[name="title"]');
        this._descriptionInput = this._bookmarkFormWrapper.findSingle('textarea[name="description"]');
        this._tagsInput = this._bookmarkFormWrapper.findSingle('input[name="tags"]');

        this._bookmarkAddTrigger.on(DOMElementEvents.Click, function (arg) {
            _this._switchToBookmarkForm();
        });

        this._bookmarkFormWrapper.findSingle('form').on(DOMElementEvents.Submit, function (arg) {
            arg.preventDefault();
        });

        this._urlInput.on(DOMElementEvents.Blur, function (arg) {
            URLDetailsProvider.getDetails(_this._urlInput.getValue(), function (title, description) {
                if (TSObject.exists(title)) {
                    _this._titleInput.setValue(title);
                }

                if (TSObject.exists(description)) {
                    _this._descriptionInput.setValue(description);
                }
            }, function (type, msg) {
                ExceptionHandler.throw(new Exception('An error has occured with type ' + type + ' and following message: ' + msg));
            });
        });

        this._tagsInput.on(DOMElementEvents.KeyDown, function (arg) {
            if (arg.getWhich() === 13) {
                _this._addTag(arg.getTarget().getValue());
                _this._tagsInput.setValue('');
            }
        });
    };

    MainPresenter.prototype.onDestroy = function () {
        this._bookmarkAddTrigger.off(DOMElementEvents.Click);
    };
    return MainPresenter;
})(Presenter);
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
var UnitTestClass = (function (_super) {
    __extends(UnitTestClass, _super);
    function UnitTestClass() {
        _super.apply(this, arguments);
    }
    UnitTestClass.handle = function (u) {
        var test = new tsUnit.Test();

        test.addTestClass(u);
        test.showResults(document.getElementById('outcome'), test.run());
    };
    return UnitTestClass;
})(tsUnit.TestClass);
var ActiveRecordHelperTest = (function (_super) {
    __extends(ActiveRecordHelperTest, _super);
    function ActiveRecordHelperTest() {
        _super.apply(this, arguments);
    }
    ActiveRecordHelperTest.prototype.myMethodTest = function () {
        this.areIdentical(true, false);
    };
    return ActiveRecordHelperTest;
})(UnitTestClass);

UnitTestClass.handle(new ActiveRecordHelperTest());
