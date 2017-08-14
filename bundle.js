/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 377);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(15);
var hide = __webpack_require__(17);
var redefine = __webpack_require__(20);
var ctx = __webpack_require__(23);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Symbol__ = __webpack_require__(12);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NonDeclaredType", function() { return NonDeclaredType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Any", function() { return Any; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Unit", function() { return Unit; });
/* harmony export (immutable) */ __webpack_exports__["Option"] = Option;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Array", function() { return FableArray; });
/* harmony export (immutable) */ __webpack_exports__["Tuple"] = Tuple;
/* harmony export (immutable) */ __webpack_exports__["GenericParam"] = GenericParam;
/* harmony export (immutable) */ __webpack_exports__["Interface"] = Interface;
/* harmony export (immutable) */ __webpack_exports__["makeGeneric"] = makeGeneric;
/* harmony export (immutable) */ __webpack_exports__["isGeneric"] = isGeneric;
/* harmony export (immutable) */ __webpack_exports__["getDefinition"] = getDefinition;
/* harmony export (immutable) */ __webpack_exports__["extendInfo"] = extendInfo;
/* harmony export (immutable) */ __webpack_exports__["hasInterface"] = hasInterface;
/* harmony export (immutable) */ __webpack_exports__["getPropertyNames"] = getPropertyNames;
/* harmony export (immutable) */ __webpack_exports__["isArray"] = isArray;
/* harmony export (immutable) */ __webpack_exports__["getRestParams"] = getRestParams;
/* harmony export (immutable) */ __webpack_exports__["toString"] = toString;
/* harmony export (immutable) */ __webpack_exports__["hash"] = hash;
/* harmony export (immutable) */ __webpack_exports__["equals"] = equals;
/* harmony export (immutable) */ __webpack_exports__["compare"] = compare;
/* harmony export (immutable) */ __webpack_exports__["equalsRecords"] = equalsRecords;
/* harmony export (immutable) */ __webpack_exports__["compareRecords"] = compareRecords;
/* harmony export (immutable) */ __webpack_exports__["equalsUnions"] = equalsUnions;
/* harmony export (immutable) */ __webpack_exports__["compareUnions"] = compareUnions;
/* harmony export (immutable) */ __webpack_exports__["createDisposable"] = createDisposable;
/* harmony export (immutable) */ __webpack_exports__["createObj"] = createObj;
/* harmony export (immutable) */ __webpack_exports__["toPlainJsObj"] = toPlainJsObj;
/* harmony export (immutable) */ __webpack_exports__["round"] = round;
/* harmony export (immutable) */ __webpack_exports__["randomNext"] = randomNext;
/* harmony export (immutable) */ __webpack_exports__["defaultArg"] = defaultArg;

var NonDeclaredType = (function () {
    function NonDeclaredType(kind, definition, generics) {
        this.kind = kind;
        this.definition = definition;
        this.generics = generics;
    }
    NonDeclaredType.prototype.Equals = function (other) {
        if (this.kind === other.kind && this.definition === other.definition) {
            return typeof this.generics === "object"
                ? equalsRecords(this.generics, other.generics)
                : this.generics === other.generics;
        }
        return false;
    };
    return NonDeclaredType;
}());

var Any = new NonDeclaredType("Any");
var Unit = new NonDeclaredType("Unit");
function Option(t) {
    return new NonDeclaredType("Option", null, t);
}
function FableArray(t, isTypedArray) {
    if (isTypedArray === void 0) { isTypedArray = false; }
    var def = null, genArg = null;
    if (isTypedArray) {
        def = t;
    }
    else {
        genArg = t;
    }
    return new NonDeclaredType("Array", def, genArg);
}

function Tuple(ts) {
    return new NonDeclaredType("Tuple", null, ts);
}
function GenericParam(definition) {
    return new NonDeclaredType("GenericParam", definition);
}
function Interface(definition) {
    return new NonDeclaredType("Interface", definition);
}
function makeGeneric(typeDef, genArgs) {
    return new NonDeclaredType("GenericType", typeDef, genArgs);
}
function isGeneric(typ) {
    return typ instanceof NonDeclaredType && typ.kind === "GenericType";
}
function getDefinition(typ) {
    return isGeneric(typ) ? typ.definition : typ;
}
function extendInfo(cons, info) {
    var parent = Object.getPrototypeOf(cons.prototype);
    if (typeof parent[__WEBPACK_IMPORTED_MODULE_0__Symbol__["default"].reflection] === "function") {
        var newInfo_1 = {}, parentInfo_1 = parent[__WEBPACK_IMPORTED_MODULE_0__Symbol__["default"].reflection]();
        Object.getOwnPropertyNames(info).forEach(function (k) {
            var i = info[k];
            if (typeof i === "object") {
                newInfo_1[k] = Array.isArray(i)
                    ? (parentInfo_1[k] || []).concat(i)
                    : Object.assign(parentInfo_1[k] || {}, i);
            }
            else {
                newInfo_1[k] = i;
            }
        });
        return newInfo_1;
    }
    return info;
}
function hasInterface(obj, interfaceName) {
    if (interfaceName === "System.Collections.Generic.IEnumerable") {
        return typeof obj[Symbol.iterator] === "function";
    }
    else if (typeof obj[__WEBPACK_IMPORTED_MODULE_0__Symbol__["default"].reflection] === "function") {
        var interfaces = obj[__WEBPACK_IMPORTED_MODULE_0__Symbol__["default"].reflection]().interfaces;
        return Array.isArray(interfaces) && interfaces.indexOf(interfaceName) > -1;
    }
    return false;
}
function getPropertyNames(obj) {
    if (obj == null) {
        return [];
    }
    var propertyMap = typeof obj[__WEBPACK_IMPORTED_MODULE_0__Symbol__["default"].reflection] === "function" ? obj[__WEBPACK_IMPORTED_MODULE_0__Symbol__["default"].reflection]().properties || [] : obj;
    return Object.getOwnPropertyNames(propertyMap);
}
function isArray(obj) {
    return Array.isArray(obj) || ArrayBuffer.isView(obj);
}
function getRestParams(args, idx) {
    for (var _len = args.length, restArgs = Array(_len > idx ? _len - idx : 0), _key = idx; _key < _len; _key++)
        restArgs[_key - idx] = args[_key];
    return restArgs;
}
function toString(o) {
    return o != null && typeof o.ToString == "function" ? o.ToString() : String(o);
}
function hash(x) {
    var s = JSON.stringify(x);
    var h = 5381, i = 0, len = s.length;
    while (i < len) {
        h = (h * 33) ^ s.charCodeAt(i++);
    }
    return h;
}
function equals(x, y) {
    if (x === y)
        return true;
    else if (x == null)
        return y == null;
    else if (y == null)
        return false;
    else if (Object.getPrototypeOf(x) !== Object.getPrototypeOf(y))
        return false;
    else if (typeof x.Equals === "function")
        return x.Equals(y);
    else if (Array.isArray(x)) {
        if (x.length != y.length)
            return false;
        for (var i = 0; i < x.length; i++)
            if (!equals(x[i], y[i]))
                return false;
        return true;
    }
    else if (ArrayBuffer.isView(x)) {
        if (x.byteLength !== y.byteLength)
            return false;
        var dv1 = new DataView(x.buffer), dv2 = new DataView(y.buffer);
        for (var i = 0; i < x.byteLength; i++)
            if (dv1.getUint8(i) !== dv2.getUint8(i))
                return false;
        return true;
    }
    else if (x instanceof Date)
        return x.getTime() == y.getTime();
    else
        return false;
}
function compare(x, y) {
    if (x === y)
        return 0;
    if (x == null)
        return y == null ? 0 : -1;
    else if (y == null)
        return 1;
    else if (Object.getPrototypeOf(x) !== Object.getPrototypeOf(y))
        return -1;
    else if (typeof x.CompareTo === "function")
        return x.CompareTo(y);
    else if (Array.isArray(x)) {
        if (x.length != y.length)
            return x.length < y.length ? -1 : 1;
        for (var i = 0, j = 0; i < x.length; i++)
            if ((j = compare(x[i], y[i])) !== 0)
                return j;
        return 0;
    }
    else if (ArrayBuffer.isView(x)) {
        if (x.byteLength != y.byteLength)
            return x.byteLength < y.byteLength ? -1 : 1;
        var dv1 = new DataView(x.buffer), dv2 = new DataView(y.buffer);
        for (var i = 0, b1 = 0, b2 = 0; i < x.byteLength; i++) {
            b1 = dv1.getUint8(i), b2 = dv2.getUint8(i);
            if (b1 < b2)
                return -1;
            if (b1 > b2)
                return 1;
        }
        return 0;
    }
    else if (x instanceof Date)
        return compare(x.getTime(), y.getTime());
    else
        return x < y ? -1 : 1;
}
function equalsRecords(x, y) {
    if (x === y) {
        return true;
    }
    else {
        var keys = getPropertyNames(x);
        for (var i = 0; i < keys.length; i++) {
            if (!equals(x[keys[i]], y[keys[i]]))
                return false;
        }
        return true;
    }
}
function compareRecords(x, y) {
    if (x === y) {
        return 0;
    }
    else {
        var keys = getPropertyNames(x);
        for (var i = 0; i < keys.length; i++) {
            var res = compare(x[keys[i]], y[keys[i]]);
            if (res !== 0)
                return res;
        }
        return 0;
    }
}
function equalsUnions(x, y) {
    if (x === y) {
        return true;
    }
    else if (x.Case !== y.Case) {
        return false;
    }
    else {
        for (var i = 0; i < x.Fields.length; i++) {
            if (!equals(x.Fields[i], y.Fields[i]))
                return false;
        }
        return true;
    }
}
function compareUnions(x, y) {
    if (x === y) {
        return 0;
    }
    else {
        var res = compare(x.Case, y.Case);
        if (res !== 0)
            return res;
        for (var i = 0; i < x.Fields.length; i++) {
            res = compare(x.Fields[i], y.Fields[i]);
            if (res !== 0)
                return res;
        }
        return 0;
    }
}
function createDisposable(f) {
    return _a = {
            Dispose: f
        },
        _a[__WEBPACK_IMPORTED_MODULE_0__Symbol__["default"].reflection] = function () { return { interfaces: ["System.IDisposable"] }; },
        _a;
    var _a;
}
function createObj(fields) {
    var iter = fields[Symbol.iterator]();
    var cur = iter.next(), o = {};
    while (!cur.done) {
        o[cur.value[0]] = cur.value[1];
        cur = iter.next();
    }
    return o;
}
function toPlainJsObj(source) {
    if (source != null && source.constructor != Object) {
        var target = {};
        var props = Object.getOwnPropertyNames(source);
        for (var i = 0; i < props.length; i++) {
            target[props[i]] = source[props[i]];
        }
        var proto = Object.getPrototypeOf(source);
        if (proto != null) {
            props = Object.getOwnPropertyNames(proto);
            for (var i = 0; i < props.length; i++) {
                var prop = Object.getOwnPropertyDescriptor(proto, props[i]);
                if (prop.value) {
                    target[props[i]] = prop.value;
                }
                else if (prop.get) {
                    target[props[i]] = prop.get.apply(source);
                }
            }
        }
        return target;
    }
    else {
        return source;
    }
}
function round(value, digits) {
    if (digits === void 0) { digits = 0; }
    var m = Math.pow(10, digits);
    var n = +(digits ? value * m : value).toFixed(8);
    var i = Math.floor(n), f = n - i;
    var e = 1e-8;
    var r = (f > 0.5 - e && f < 0.5 + e) ? ((i % 2 == 0) ? i : i + 1) : Math.round(n);
    return digits ? r / m : r;
}
function randomNext(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function defaultArg(arg, defaultValue, f) {
    return arg == null ? defaultValue : (f != null ? f(arg) : arg);
}


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(78)('wks');
var uid = __webpack_require__(49);
var Symbol = __webpack_require__(2).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Util__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Array__ = __webpack_require__(369);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ListClass__ = __webpack_require__(59);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Enumerator", function() { return Enumerator; });
/* harmony export (immutable) */ __webpack_exports__["getEnumerator"] = getEnumerator;
/* harmony export (immutable) */ __webpack_exports__["toIterator"] = toIterator;
/* harmony export (immutable) */ __webpack_exports__["toList"] = toList;
/* harmony export (immutable) */ __webpack_exports__["ofList"] = ofList;
/* harmony export (immutable) */ __webpack_exports__["ofArray"] = ofArray;
/* harmony export (immutable) */ __webpack_exports__["append"] = append;
/* harmony export (immutable) */ __webpack_exports__["average"] = average;
/* harmony export (immutable) */ __webpack_exports__["averageBy"] = averageBy;
/* harmony export (immutable) */ __webpack_exports__["concat"] = concat;
/* harmony export (immutable) */ __webpack_exports__["collect"] = collect;
/* harmony export (immutable) */ __webpack_exports__["choose"] = choose;
/* harmony export (immutable) */ __webpack_exports__["compareWith"] = compareWith;
/* harmony export (immutable) */ __webpack_exports__["delay"] = delay;
/* harmony export (immutable) */ __webpack_exports__["empty"] = empty;
/* harmony export (immutable) */ __webpack_exports__["enumerateWhile"] = enumerateWhile;
/* harmony export (immutable) */ __webpack_exports__["enumerateThenFinally"] = enumerateThenFinally;
/* harmony export (immutable) */ __webpack_exports__["enumerateUsing"] = enumerateUsing;
/* harmony export (immutable) */ __webpack_exports__["exactlyOne"] = exactlyOne;
/* harmony export (immutable) */ __webpack_exports__["except"] = except;
/* harmony export (immutable) */ __webpack_exports__["exists"] = exists;
/* harmony export (immutable) */ __webpack_exports__["exists2"] = exists2;
/* harmony export (immutable) */ __webpack_exports__["filter"] = filter;
/* harmony export (immutable) */ __webpack_exports__["where"] = where;
/* harmony export (immutable) */ __webpack_exports__["fold"] = fold;
/* harmony export (immutable) */ __webpack_exports__["foldBack"] = foldBack;
/* harmony export (immutable) */ __webpack_exports__["fold2"] = fold2;
/* harmony export (immutable) */ __webpack_exports__["foldBack2"] = foldBack2;
/* harmony export (immutable) */ __webpack_exports__["forAll"] = forAll;
/* harmony export (immutable) */ __webpack_exports__["forAll2"] = forAll2;
/* harmony export (immutable) */ __webpack_exports__["tryHead"] = tryHead;
/* harmony export (immutable) */ __webpack_exports__["head"] = head;
/* harmony export (immutable) */ __webpack_exports__["initialize"] = initialize;
/* harmony export (immutable) */ __webpack_exports__["initializeInfinite"] = initializeInfinite;
/* harmony export (immutable) */ __webpack_exports__["tryItem"] = tryItem;
/* harmony export (immutable) */ __webpack_exports__["item"] = item;
/* harmony export (immutable) */ __webpack_exports__["iterate"] = iterate;
/* harmony export (immutable) */ __webpack_exports__["iterate2"] = iterate2;
/* harmony export (immutable) */ __webpack_exports__["iterateIndexed"] = iterateIndexed;
/* harmony export (immutable) */ __webpack_exports__["iterateIndexed2"] = iterateIndexed2;
/* harmony export (immutable) */ __webpack_exports__["isEmpty"] = isEmpty;
/* harmony export (immutable) */ __webpack_exports__["tryLast"] = tryLast;
/* harmony export (immutable) */ __webpack_exports__["last"] = last;
/* harmony export (immutable) */ __webpack_exports__["count"] = count;
/* harmony export (immutable) */ __webpack_exports__["map"] = map;
/* harmony export (immutable) */ __webpack_exports__["mapIndexed"] = mapIndexed;
/* harmony export (immutable) */ __webpack_exports__["map2"] = map2;
/* harmony export (immutable) */ __webpack_exports__["mapIndexed2"] = mapIndexed2;
/* harmony export (immutable) */ __webpack_exports__["map3"] = map3;
/* harmony export (immutable) */ __webpack_exports__["mapFold"] = mapFold;
/* harmony export (immutable) */ __webpack_exports__["mapFoldBack"] = mapFoldBack;
/* harmony export (immutable) */ __webpack_exports__["max"] = max;
/* harmony export (immutable) */ __webpack_exports__["maxBy"] = maxBy;
/* harmony export (immutable) */ __webpack_exports__["min"] = min;
/* harmony export (immutable) */ __webpack_exports__["minBy"] = minBy;
/* harmony export (immutable) */ __webpack_exports__["pairwise"] = pairwise;
/* harmony export (immutable) */ __webpack_exports__["permute"] = permute;
/* harmony export (immutable) */ __webpack_exports__["rangeStep"] = rangeStep;
/* harmony export (immutable) */ __webpack_exports__["rangeChar"] = rangeChar;
/* harmony export (immutable) */ __webpack_exports__["range"] = range;
/* harmony export (immutable) */ __webpack_exports__["readOnly"] = readOnly;
/* harmony export (immutable) */ __webpack_exports__["reduce"] = reduce;
/* harmony export (immutable) */ __webpack_exports__["reduceBack"] = reduceBack;
/* harmony export (immutable) */ __webpack_exports__["replicate"] = replicate;
/* harmony export (immutable) */ __webpack_exports__["reverse"] = reverse;
/* harmony export (immutable) */ __webpack_exports__["scan"] = scan;
/* harmony export (immutable) */ __webpack_exports__["scanBack"] = scanBack;
/* harmony export (immutable) */ __webpack_exports__["singleton"] = singleton;
/* harmony export (immutable) */ __webpack_exports__["skip"] = skip;
/* harmony export (immutable) */ __webpack_exports__["skipWhile"] = skipWhile;
/* harmony export (immutable) */ __webpack_exports__["sortWith"] = sortWith;
/* harmony export (immutable) */ __webpack_exports__["sum"] = sum;
/* harmony export (immutable) */ __webpack_exports__["sumBy"] = sumBy;
/* harmony export (immutable) */ __webpack_exports__["tail"] = tail;
/* harmony export (immutable) */ __webpack_exports__["take"] = take;
/* harmony export (immutable) */ __webpack_exports__["truncate"] = truncate;
/* harmony export (immutable) */ __webpack_exports__["takeWhile"] = takeWhile;
/* harmony export (immutable) */ __webpack_exports__["tryFind"] = tryFind;
/* harmony export (immutable) */ __webpack_exports__["find"] = find;
/* harmony export (immutable) */ __webpack_exports__["tryFindBack"] = tryFindBack;
/* harmony export (immutable) */ __webpack_exports__["findBack"] = findBack;
/* harmony export (immutable) */ __webpack_exports__["tryFindIndex"] = tryFindIndex;
/* harmony export (immutable) */ __webpack_exports__["findIndex"] = findIndex;
/* harmony export (immutable) */ __webpack_exports__["tryFindIndexBack"] = tryFindIndexBack;
/* harmony export (immutable) */ __webpack_exports__["findIndexBack"] = findIndexBack;
/* harmony export (immutable) */ __webpack_exports__["tryPick"] = tryPick;
/* harmony export (immutable) */ __webpack_exports__["pick"] = pick;
/* harmony export (immutable) */ __webpack_exports__["unfold"] = unfold;
/* harmony export (immutable) */ __webpack_exports__["zip"] = zip;
/* harmony export (immutable) */ __webpack_exports__["zip3"] = zip3;




var Enumerator = (function () {
    function Enumerator(iter) {
        this.iter = iter;
    }
    Enumerator.prototype.MoveNext = function () {
        var cur = this.iter.next();
        this.current = cur.value;
        return !cur.done;
    };
    Object.defineProperty(Enumerator.prototype, "Current", {
        get: function () {
            return this.current;
        },
        enumerable: true,
        configurable: true
    });
    Enumerator.prototype.Reset = function () {
        throw new Error("JS iterators cannot be reset");
    };
    Enumerator.prototype.Dispose = function () { };
    return Enumerator;
}());

function getEnumerator(o) {
    return typeof o.GetEnumerator === "function"
        ? o.GetEnumerator() : new Enumerator(o[Symbol.iterator]());
}
function toIterator(en) {
    return {
        next: function () {
            return en.MoveNext()
                ? { done: false, value: en.Current }
                : { done: true, value: null };
        }
    };
}
function __failIfNone(res) {
    if (res == null)
        throw new Error("Seq did not contain any matching element");
    return res;
}
function toList(xs) {
    return foldBack(function (x, acc) {
        return new __WEBPACK_IMPORTED_MODULE_2__ListClass__["b" /* default */](x, acc);
    }, xs, new __WEBPACK_IMPORTED_MODULE_2__ListClass__["b" /* default */]());
}
function ofList(xs) {
    return delay(function () { return unfold(function (x) { return x.tail != null ? [x.head, x.tail] : null; }, xs); });
}
function ofArray(xs) {
    return delay(function () { return unfold(function (i) { return i < xs.length ? [xs[i], i + 1] : null; }, 0); });
}
function append(xs, ys) {
    return delay(function () {
        var firstDone = false;
        var i = xs[Symbol.iterator]();
        var iters = [i, null];
        return unfold(function () {
            var cur;
            if (!firstDone) {
                cur = iters[0].next();
                if (!cur.done) {
                    return [cur.value, iters];
                }
                else {
                    firstDone = true;
                    iters = [null, ys[Symbol.iterator]()];
                }
            }
            cur = iters[1].next();
            return !cur.done ? [cur.value, iters] : null;
        }, iters);
    });
}
function average(xs) {
    var count = 1;
    var sum = reduce(function (acc, x) {
        count++;
        return acc + x;
    }, xs);
    return sum / count;
}
function averageBy(f, xs) {
    var count = 1;
    var sum = reduce(function (acc, x) {
        count++;
        return (count === 2 ? f(acc) : acc) + f(x);
    }, xs);
    return sum / count;
}
function concat(xs) {
    return delay(function () {
        var iter = xs[Symbol.iterator]();
        var output = { value: null };
        return unfold(function (innerIter) {
            var hasFinished = false;
            while (!hasFinished) {
                if (innerIter == null) {
                    var cur = iter.next();
                    if (!cur.done) {
                        innerIter = cur.value[Symbol.iterator]();
                    }
                    else {
                        hasFinished = true;
                    }
                }
                else {
                    var cur = innerIter.next();
                    if (!cur.done) {
                        output = { value: cur.value };
                        hasFinished = true;
                    }
                    else {
                        innerIter = null;
                    }
                }
            }
            return innerIter != null && output != null ? [output.value, innerIter] : null;
        }, null);
    });
}
function collect(f, xs) {
    return concat(map(f, xs));
}
function choose(f, xs) {
    var trySkipToNext = function (iter) {
        var cur = iter.next();
        if (!cur.done) {
            var y = f(cur.value);
            return y != null ? [y, iter] : trySkipToNext(iter);
        }
        return void 0;
    };
    return delay(function () {
        return unfold(function (iter) {
            return trySkipToNext(iter);
        }, xs[Symbol.iterator]());
    });
}
function compareWith(f, xs, ys) {
    var nonZero = tryFind(function (i) { return i != 0; }, map2(function (x, y) { return f(x, y); }, xs, ys));
    return nonZero != null ? nonZero : count(xs) - count(ys);
}
function delay(f) {
    return _a = {},
        _a[Symbol.iterator] = function () { return f()[Symbol.iterator](); },
        _a;
    var _a;
}
function empty() {
    return unfold(function () { return void 0; });
}
function enumerateWhile(cond, xs) {
    return concat(unfold(function () { return cond() ? [xs, true] : null; }));
}
function enumerateThenFinally(xs, finalFn) {
    return delay(function () {
        var iter;
        try {
            iter = xs[Symbol.iterator]();
        }
        catch (err) {
            return void 0;
        }
        finally {
            finalFn();
        }
        return unfold(function (iter) {
            try {
                var cur = iter.next();
                return !cur.done ? [cur.value, iter] : null;
            }
            catch (err) {
                return void 0;
            }
            finally {
                finalFn();
            }
        }, iter);
    });
}
function enumerateUsing(disp, work) {
    var isDisposed = false;
    var disposeOnce = function () {
        if (!isDisposed) {
            isDisposed = true;
            disp.Dispose();
        }
    };
    try {
        return enumerateThenFinally(work(disp), disposeOnce);
    }
    catch (err) {
        return void 0;
    }
    finally {
        disposeOnce();
    }
}
function exactlyOne(xs) {
    var iter = xs[Symbol.iterator]();
    var fst = iter.next();
    if (fst.done)
        throw new Error("Seq was empty");
    var snd = iter.next();
    if (!snd.done)
        throw new Error("Seq had multiple items");
    return fst.value;
}
function except(itemsToExclude, source) {
    var exclusionItems = Array.from(itemsToExclude);
    var testIsNotInExclusionItems = function (element) { return !exclusionItems.some(function (excludedItem) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Util__["equals"])(excludedItem, element); }); };
    return filter(testIsNotInExclusionItems, source);
}
function exists(f, xs) {
    function aux(iter) {
        var cur = iter.next();
        return !cur.done && (f(cur.value) || aux(iter));
    }
    return aux(xs[Symbol.iterator]());
}
function exists2(f, xs, ys) {
    function aux(iter1, iter2) {
        var cur1 = iter1.next(), cur2 = iter2.next();
        return !cur1.done && !cur2.done && (f(cur1.value, cur2.value) || aux(iter1, iter2));
    }
    return aux(xs[Symbol.iterator](), ys[Symbol.iterator]());
}
function filter(f, xs) {
    function trySkipToNext(iter) {
        var cur = iter.next();
        while (!cur.done) {
            if (f(cur.value)) {
                return [cur.value, iter];
            }
            cur = iter.next();
        }
        return void 0;
    }
    return delay(function () { return unfold(trySkipToNext, xs[Symbol.iterator]()); });
}
function where(f, xs) {
    return filter(f, xs);
}
function fold(f, acc, xs) {
    if (Array.isArray(xs) || ArrayBuffer.isView(xs)) {
        return xs.reduce(f, acc);
    }
    else {
        var cur = void 0;
        for (var i = 0, iter = xs[Symbol.iterator]();; i++) {
            cur = iter.next();
            if (cur.done)
                break;
            acc = f(acc, cur.value, i);
        }
        return acc;
    }
}
function foldBack(f, xs, acc) {
    var arr = Array.isArray(xs) || ArrayBuffer.isView(xs) ? xs : Array.from(xs);
    for (var i = arr.length - 1; i >= 0; i--) {
        acc = f(arr[i], acc, i);
    }
    return acc;
}
function fold2(f, acc, xs, ys) {
    var iter1 = xs[Symbol.iterator](), iter2 = ys[Symbol.iterator]();
    var cur1, cur2;
    for (var i = 0;; i++) {
        cur1 = iter1.next();
        cur2 = iter2.next();
        if (cur1.done || cur2.done) {
            break;
        }
        acc = f(acc, cur1.value, cur2.value, i);
    }
    return acc;
}
function foldBack2(f, xs, ys, acc) {
    var ar1 = Array.isArray(xs) || ArrayBuffer.isView(xs) ? xs : Array.from(xs);
    var ar2 = Array.isArray(ys) || ArrayBuffer.isView(ys) ? ys : Array.from(ys);
    for (var i = ar1.length - 1; i >= 0; i--) {
        acc = f(ar1[i], ar2[i], acc, i);
    }
    return acc;
}
function forAll(f, xs) {
    return fold(function (acc, x) { return acc && f(x); }, true, xs);
}
function forAll2(f, xs, ys) {
    return fold2(function (acc, x, y) { return acc && f(x, y); }, true, xs, ys);
}
function tryHead(xs) {
    var iter = xs[Symbol.iterator]();
    var cur = iter.next();
    return cur.done ? null : cur.value;
}
function head(xs) {
    return __failIfNone(tryHead(xs));
}
function initialize(n, f) {
    return delay(function () {
        return unfold(function (i) { return i < n ? [f(i), i + 1] : null; }, 0);
    });
}
function initializeInfinite(f) {
    return delay(function () {
        return unfold(function (i) { return [f(i), i + 1]; }, 0);
    });
}
function tryItem(i, xs) {
    if (i < 0)
        return null;
    if (Array.isArray(xs) || ArrayBuffer.isView(xs))
        return i < xs.length ? xs[i] : null;
    for (var j = 0, iter = xs[Symbol.iterator]();; j++) {
        var cur = iter.next();
        if (cur.done)
            return null;
        if (j === i)
            return cur.value;
    }
}
function item(i, xs) {
    return __failIfNone(tryItem(i, xs));
}
function iterate(f, xs) {
    fold(function (_, x) { return f(x); }, null, xs);
}
function iterate2(f, xs, ys) {
    fold2(function (_, x, y) { return f(x, y); }, null, xs, ys);
}
function iterateIndexed(f, xs) {
    fold(function (_, x, i) { return f(i, x); }, null, xs);
}
function iterateIndexed2(f, xs, ys) {
    fold2(function (_, x, y, i) { return f(i, x, y); }, null, xs, ys);
}
function isEmpty(xs) {
    var i = xs[Symbol.iterator]();
    return i.next().done;
}
function tryLast(xs) {
    try {
        return reduce(function (_, x) { return x; }, xs);
    }
    catch (err) {
        return null;
    }
}
function last(xs) {
    return __failIfNone(tryLast(xs));
}
function count(xs) {
    return Array.isArray(xs) || ArrayBuffer.isView(xs)
        ? xs.length
        : fold(function (acc, x) { return acc + 1; }, 0, xs);
}
function map(f, xs) {
    return delay(function () { return unfold(function (iter) {
        var cur = iter.next();
        return !cur.done ? [f(cur.value), iter] : null;
    }, xs[Symbol.iterator]()); });
}
function mapIndexed(f, xs) {
    return delay(function () {
        var i = 0;
        return unfold(function (iter) {
            var cur = iter.next();
            return !cur.done ? [f(i++, cur.value), iter] : null;
        }, xs[Symbol.iterator]());
    });
}
function map2(f, xs, ys) {
    return delay(function () {
        var iter1 = xs[Symbol.iterator]();
        var iter2 = ys[Symbol.iterator]();
        return unfold(function () {
            var cur1 = iter1.next(), cur2 = iter2.next();
            return !cur1.done && !cur2.done ? [f(cur1.value, cur2.value), null] : null;
        });
    });
}
function mapIndexed2(f, xs, ys) {
    return delay(function () {
        var i = 0;
        var iter1 = xs[Symbol.iterator]();
        var iter2 = ys[Symbol.iterator]();
        return unfold(function () {
            var cur1 = iter1.next(), cur2 = iter2.next();
            return !cur1.done && !cur2.done ? [f(i++, cur1.value, cur2.value), null] : null;
        });
    });
}
function map3(f, xs, ys, zs) {
    return delay(function () {
        var iter1 = xs[Symbol.iterator]();
        var iter2 = ys[Symbol.iterator]();
        var iter3 = zs[Symbol.iterator]();
        return unfold(function () {
            var cur1 = iter1.next(), cur2 = iter2.next(), cur3 = iter3.next();
            return !cur1.done && !cur2.done && !cur3.done ? [f(cur1.value, cur2.value, cur3.value), null] : null;
        });
    });
}
function mapFold(f, acc, xs) {
    var result = [];
    var r;
    var cur;
    for (var i = 0, iter = xs[Symbol.iterator]();; i++) {
        cur = iter.next();
        if (cur.done)
            break;
        _a = f(acc, cur.value), r = _a[0], acc = _a[1];
        result.push(r);
    }
    return [result, acc];
    var _a;
}
function mapFoldBack(f, xs, acc) {
    var arr = Array.isArray(xs) || ArrayBuffer.isView(xs) ? xs : Array.from(xs);
    var result = [];
    var r;
    for (var i = arr.length - 1; i >= 0; i--) {
        _a = f(arr[i], acc), r = _a[0], acc = _a[1];
        result.push(r);
    }
    return [result, acc];
    var _a;
}
function max(xs) {
    return reduce(function (acc, x) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Util__["compare"])(acc, x) === 1 ? acc : x; }, xs);
}
function maxBy(f, xs) {
    return reduce(function (acc, x) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Util__["compare"])(f(acc), f(x)) === 1 ? acc : x; }, xs);
}
function min(xs) {
    return reduce(function (acc, x) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Util__["compare"])(acc, x) === -1 ? acc : x; }, xs);
}
function minBy(f, xs) {
    return reduce(function (acc, x) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Util__["compare"])(f(acc), f(x)) === -1 ? acc : x; }, xs);
}
function pairwise(xs) {
    return skip(2, scan(function (last, next) { return [last[1], next]; }, [0, 0], xs));
}
function permute(f, xs) {
    return ofArray(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Array__["a" /* permute */])(f, Array.from(xs)));
}
function rangeStep(first, step, last) {
    if (step === 0)
        throw new Error("Step cannot be 0");
    return delay(function () { return unfold(function (x) { return step > 0 && x <= last || step < 0 && x >= last ? [x, x + step] : null; }, first); });
}
function rangeChar(first, last) {
    return delay(function () { return unfold(function (x) { return x <= last ? [x, String.fromCharCode(x.charCodeAt(0) + 1)] : null; }, first); });
}
function range(first, last) {
    return rangeStep(first, 1, last);
}
function readOnly(xs) {
    return map(function (x) { return x; }, xs);
}
function reduce(f, xs) {
    if (Array.isArray(xs) || ArrayBuffer.isView(xs))
        return xs.reduce(f);
    var iter = xs[Symbol.iterator]();
    var cur = iter.next();
    if (cur.done)
        throw new Error("Seq was empty");
    var acc = cur.value;
    for (;;) {
        cur = iter.next();
        if (cur.done)
            break;
        acc = f(acc, cur.value);
    }
    return acc;
}
function reduceBack(f, xs) {
    var ar = Array.isArray(xs) || ArrayBuffer.isView(xs) ? xs : Array.from(xs);
    if (ar.length === 0)
        throw new Error("Seq was empty");
    var acc = ar[ar.length - 1];
    for (var i = ar.length - 2; i >= 0; i--)
        acc = f(ar[i], acc, i);
    return acc;
}
function replicate(n, x) {
    return initialize(n, function () { return x; });
}
function reverse(xs) {
    var ar = Array.isArray(xs) || ArrayBuffer.isView(xs) ? xs.slice(0) : Array.from(xs);
    return ofArray(ar.reverse());
}
function scan(f, seed, xs) {
    return delay(function () {
        var iter = xs[Symbol.iterator]();
        return unfold(function (acc) {
            if (acc == null)
                return [seed, seed];
            var cur = iter.next();
            if (!cur.done) {
                acc = f(acc, cur.value);
                return [acc, acc];
            }
            return void 0;
        }, null);
    });
}
function scanBack(f, xs, seed) {
    return reverse(scan(function (acc, x) { return f(x, acc); }, seed, reverse(xs)));
}
function singleton(x) {
    return unfold(function (x) { return x != null ? [x, null] : null; }, x);
}
function skip(n, xs) {
    return _a = {},
        _a[Symbol.iterator] = function () {
            var iter = xs[Symbol.iterator]();
            for (var i = 1; i <= n; i++)
                if (iter.next().done)
                    throw new Error("Seq has not enough elements");
            return iter;
        },
        _a;
    var _a;
}
function skipWhile(f, xs) {
    return delay(function () {
        var hasPassed = false;
        return filter(function (x) { return hasPassed || (hasPassed = !f(x)); }, xs);
    });
}
function sortWith(f, xs) {
    var ys = Array.from(xs);
    return ofArray(ys.sort(f));
}
function sum(xs) {
    return fold(function (acc, x) { return acc + x; }, 0, xs);
}
function sumBy(f, xs) {
    return fold(function (acc, x) { return acc + f(x); }, 0, xs);
}
function tail(xs) {
    var iter = xs[Symbol.iterator]();
    var cur = iter.next();
    if (cur.done)
        throw new Error("Seq was empty");
    return _a = {},
        _a[Symbol.iterator] = function () { return iter; },
        _a;
    var _a;
}
function take(n, xs, truncate) {
    if (truncate === void 0) { truncate = false; }
    return delay(function () {
        var iter = xs[Symbol.iterator]();
        return unfold(function (i) {
            if (i < n) {
                var cur = iter.next();
                if (!cur.done)
                    return [cur.value, i + 1];
                if (!truncate)
                    throw new Error("Seq has not enough elements");
            }
            return void 0;
        }, 0);
    });
}
function truncate(n, xs) {
    return take(n, xs, true);
}
function takeWhile(f, xs) {
    return delay(function () {
        var iter = xs[Symbol.iterator]();
        return unfold(function (i) {
            var cur = iter.next();
            if (!cur.done && f(cur.value))
                return [cur.value, null];
            return void 0;
        }, 0);
    });
}
function tryFind(f, xs, defaultValue) {
    for (var i = 0, iter = xs[Symbol.iterator]();; i++) {
        var cur = iter.next();
        if (cur.done)
            return defaultValue === void 0 ? null : defaultValue;
        if (f(cur.value, i))
            return cur.value;
    }
}
function find(f, xs) {
    return __failIfNone(tryFind(f, xs));
}
function tryFindBack(f, xs, defaultValue) {
    var match = null;
    for (var i = 0, iter = xs[Symbol.iterator]();; i++) {
        var cur = iter.next();
        if (cur.done)
            return match === null ? (defaultValue === void 0 ? null : defaultValue) : match;
        if (f(cur.value, i))
            match = cur.value;
    }
}
function findBack(f, xs) {
    return __failIfNone(tryFindBack(f, xs));
}
function tryFindIndex(f, xs) {
    for (var i = 0, iter = xs[Symbol.iterator]();; i++) {
        var cur = iter.next();
        if (cur.done)
            return null;
        if (f(cur.value, i))
            return i;
    }
}
function findIndex(f, xs) {
    return __failIfNone(tryFindIndex(f, xs));
}
function tryFindIndexBack(f, xs) {
    var match = -1;
    for (var i = 0, iter = xs[Symbol.iterator]();; i++) {
        var cur = iter.next();
        if (cur.done)
            return match === -1 ? null : match;
        if (f(cur.value, i))
            match = i;
    }
}
function findIndexBack(f, xs) {
    return __failIfNone(tryFindIndexBack(f, xs));
}
function tryPick(f, xs) {
    for (var i = 0, iter = xs[Symbol.iterator]();; i++) {
        var cur = iter.next();
        if (cur.done)
            break;
        var y = f(cur.value, i);
        if (y != null)
            return y;
    }
    return void 0;
}
function pick(f, xs) {
    return __failIfNone(tryPick(f, xs));
}
function unfold(f, acc) {
    return _a = {},
        _a[Symbol.iterator] = function () {
            return {
                next: function () {
                    var res = f(acc);
                    if (res != null) {
                        acc = res[1];
                        return { done: false, value: res[0] };
                    }
                    return { done: true };
                }
            };
        },
        _a;
    var _a;
}
function zip(xs, ys) {
    return map2(function (x, y) { return [x, y]; }, xs, ys);
}
function zip3(xs, ys, zs) {
    return map3(function (x, y, z) { return [x, y, z]; }, xs, ys, zs);
}


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(1);
var IE8_DOM_DEFINE = __webpack_require__(125);
var toPrimitive = __webpack_require__(30);
var dP = Object.defineProperty;

exports.f = __webpack_require__(9) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(3)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(29);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(27);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["setType"] = setType;
/* harmony export (immutable) */ __webpack_exports__["getType"] = getType;
var fableGlobal = function () {
    var globalObj = typeof window !== "undefined" ? window
        : (typeof global !== "undefined" ? global
            : (typeof self !== "undefined" ? self : {}));
    if (typeof globalObj.__FABLE_CORE__ === "undefined") {
        globalObj.__FABLE_CORE__ = {
            types: new Map(),
            symbols: {
                reflection: Symbol("reflection"),
            }
        };
    }
    return globalObj.__FABLE_CORE__;
}();
function setType(fullName, cons) {
    fableGlobal.types.set(fullName, cons);
}
function getType(fullName) {
    return fableGlobal.types.get(fullName);
}
/* harmony default export */ __webpack_exports__["default"] = (fableGlobal.symbols);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(379)))

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(56);
var defined = __webpack_require__(27);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 15 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.0' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 16 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(8);
var createDesc = __webpack_require__(39);
module.exports = __webpack_require__(9) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(57);
var createDesc = __webpack_require__(39);
var toIObject = __webpack_require__(14);
var toPrimitive = __webpack_require__(30);
var has = __webpack_require__(16);
var IE8_DOM_DEFINE = __webpack_require__(125);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(9) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(16);
var toObject = __webpack_require__(11);
var IE_PROTO = __webpack_require__(102)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var hide = __webpack_require__(17);
var has = __webpack_require__(16);
var SRC = __webpack_require__(49)('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(15).inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var fails = __webpack_require__(3);
var defined = __webpack_require__(27);
var quot = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function (string, tag, attribute, value) {
  var S = String(defined(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function (NAME, exec) {
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function () {
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ListClass__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Seq__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Map__ = __webpack_require__(51);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ofArray", function() { return __WEBPACK_IMPORTED_MODULE_0__ListClass__["a"]; });
/* harmony export (immutable) */ __webpack_exports__["append"] = append;
/* harmony export (immutable) */ __webpack_exports__["choose"] = choose;
/* harmony export (immutable) */ __webpack_exports__["collect"] = collect;
/* harmony export (immutable) */ __webpack_exports__["concat"] = concat;
/* harmony export (immutable) */ __webpack_exports__["filter"] = filter;
/* harmony export (immutable) */ __webpack_exports__["where"] = where;
/* harmony export (immutable) */ __webpack_exports__["initialize"] = initialize;
/* harmony export (immutable) */ __webpack_exports__["map"] = map;
/* harmony export (immutable) */ __webpack_exports__["mapIndexed"] = mapIndexed;
/* harmony export (immutable) */ __webpack_exports__["partition"] = partition;
/* harmony export (immutable) */ __webpack_exports__["replicate"] = replicate;
/* harmony export (immutable) */ __webpack_exports__["reverse"] = reverse;
/* harmony export (immutable) */ __webpack_exports__["singleton"] = singleton;
/* harmony export (immutable) */ __webpack_exports__["slice"] = slice;
/* harmony export (immutable) */ __webpack_exports__["unzip"] = unzip;
/* harmony export (immutable) */ __webpack_exports__["unzip3"] = unzip3;
/* harmony export (immutable) */ __webpack_exports__["groupBy"] = groupBy;






/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__ListClass__["b" /* default */]);

function append(xs, ys) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Seq__["fold"])(function (acc, x) { return new __WEBPACK_IMPORTED_MODULE_0__ListClass__["b" /* default */](x, acc); }, ys, reverse(xs));
}
function choose(f, xs) {
    var r = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Seq__["fold"])(function (acc, x) {
        var y = f(x);
        return y != null ? new __WEBPACK_IMPORTED_MODULE_0__ListClass__["b" /* default */](y, acc) : acc;
    }, new __WEBPACK_IMPORTED_MODULE_0__ListClass__["b" /* default */](), xs);
    return reverse(r);
}
function collect(f, xs) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Seq__["fold"])(function (acc, x) { return append(acc, f(x)); }, new __WEBPACK_IMPORTED_MODULE_0__ListClass__["b" /* default */](), xs);
}
function concat(xs) {
    return collect(function (x) { return x; }, xs);
}
function filter(f, xs) {
    return reverse(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Seq__["fold"])(function (acc, x) { return f(x) ? new __WEBPACK_IMPORTED_MODULE_0__ListClass__["b" /* default */](x, acc) : acc; }, new __WEBPACK_IMPORTED_MODULE_0__ListClass__["b" /* default */](), xs));
}
function where(f, xs) {
    return filter(f, xs);
}
function initialize(n, f) {
    if (n < 0) {
        throw new Error("List length must be non-negative");
    }
    var xs = new __WEBPACK_IMPORTED_MODULE_0__ListClass__["b" /* default */]();
    for (var i = 1; i <= n; i++) {
        xs = new __WEBPACK_IMPORTED_MODULE_0__ListClass__["b" /* default */](f(n - i), xs);
    }
    return xs;
}
function map(f, xs) {
    return reverse(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Seq__["fold"])(function (acc, x) { return new __WEBPACK_IMPORTED_MODULE_0__ListClass__["b" /* default */](f(x), acc); }, new __WEBPACK_IMPORTED_MODULE_0__ListClass__["b" /* default */](), xs));
}
function mapIndexed(f, xs) {
    return reverse(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Seq__["fold"])(function (acc, x, i) { return new __WEBPACK_IMPORTED_MODULE_0__ListClass__["b" /* default */](f(i, x), acc); }, new __WEBPACK_IMPORTED_MODULE_0__ListClass__["b" /* default */](), xs));
}
function partition(f, xs) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Seq__["fold"])(function (acc, x) {
        var lacc = acc[0], racc = acc[1];
        return f(x) ? [new __WEBPACK_IMPORTED_MODULE_0__ListClass__["b" /* default */](x, lacc), racc] : [lacc, new __WEBPACK_IMPORTED_MODULE_0__ListClass__["b" /* default */](x, racc)];
    }, [new __WEBPACK_IMPORTED_MODULE_0__ListClass__["b" /* default */](), new __WEBPACK_IMPORTED_MODULE_0__ListClass__["b" /* default */]()], reverse(xs));
}
function replicate(n, x) {
    return initialize(n, function () { return x; });
}
function reverse(xs) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Seq__["fold"])(function (acc, x) { return new __WEBPACK_IMPORTED_MODULE_0__ListClass__["b" /* default */](x, acc); }, new __WEBPACK_IMPORTED_MODULE_0__ListClass__["b" /* default */](), xs);
}
function singleton(x) {
    return new __WEBPACK_IMPORTED_MODULE_0__ListClass__["b" /* default */](x, new __WEBPACK_IMPORTED_MODULE_0__ListClass__["b" /* default */]());
}
function slice(lower, upper, xs) {
    var noLower = (lower == null);
    var noUpper = (upper == null);
    return reverse(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Seq__["fold"])(function (acc, x, i) { return (noLower || lower <= i) && (noUpper || i <= upper) ? new __WEBPACK_IMPORTED_MODULE_0__ListClass__["b" /* default */](x, acc) : acc; }, new __WEBPACK_IMPORTED_MODULE_0__ListClass__["b" /* default */](), xs));
}
function unzip(xs) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Seq__["foldBack"])(function (xy, acc) {
        return [new __WEBPACK_IMPORTED_MODULE_0__ListClass__["b" /* default */](xy[0], acc[0]), new __WEBPACK_IMPORTED_MODULE_0__ListClass__["b" /* default */](xy[1], acc[1])];
    }, xs, [new __WEBPACK_IMPORTED_MODULE_0__ListClass__["b" /* default */](), new __WEBPACK_IMPORTED_MODULE_0__ListClass__["b" /* default */]()]);
}
function unzip3(xs) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Seq__["foldBack"])(function (xyz, acc) {
        return [new __WEBPACK_IMPORTED_MODULE_0__ListClass__["b" /* default */](xyz[0], acc[0]), new __WEBPACK_IMPORTED_MODULE_0__ListClass__["b" /* default */](xyz[1], acc[1]), new __WEBPACK_IMPORTED_MODULE_0__ListClass__["b" /* default */](xyz[2], acc[2])];
    }, xs, [new __WEBPACK_IMPORTED_MODULE_0__ListClass__["b" /* default */](), new __WEBPACK_IMPORTED_MODULE_0__ListClass__["b" /* default */](), new __WEBPACK_IMPORTED_MODULE_0__ListClass__["b" /* default */]()]);
}
function groupBy(f, xs) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Seq__["toList"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Seq__["map"])(function (k) { return [k[0], __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Seq__["toList"])(k[1])]; }, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Map__["groupBy"])(f, xs)));
}


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(13);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 24 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(3);

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(23);
var IObject = __webpack_require__(56);
var toObject = __webpack_require__(11);
var toLength = __webpack_require__(10);
var asc = __webpack_require__(84);
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),
/* 27 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(0);
var core = __webpack_require__(15);
var fails = __webpack_require__(3);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 29 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(4);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var Map = __webpack_require__(146);
var $export = __webpack_require__(0);
var shared = __webpack_require__(78)('metadata');
var store = shared.store || (shared.store = new (__webpack_require__(149))());

var getOrCreateMetadataMap = function (target, targetKey, create) {
  var targetMetadata = store.get(target);
  if (!targetMetadata) {
    if (!create) return undefined;
    store.set(target, targetMetadata = new Map());
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if (!keyMetadata) {
    if (!create) return undefined;
    targetMetadata.set(targetKey, keyMetadata = new Map());
  } return keyMetadata;
};
var ordinaryHasOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata = function (MetadataKey, MetadataValue, O, P) {
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function (target, targetKey) {
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false);
  var keys = [];
  if (metadataMap) metadataMap.forEach(function (_, key) { keys.push(key); });
  return keys;
};
var toMetaKey = function (it) {
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};
var exp = function (O) {
  $export($export.S, 'Reflect', O);
};

module.exports = {
  store: store,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(1);
var dPs = __webpack_require__(133);
var enumBugKeys = __webpack_require__(87);
var IE_PROTO = __webpack_require__(102)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(86)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(89).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(135);
var enumBugKeys = __webpack_require__(87);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

if (__webpack_require__(9)) {
  var LIBRARY = __webpack_require__(44);
  var global = __webpack_require__(2);
  var fails = __webpack_require__(3);
  var $export = __webpack_require__(0);
  var $typed = __webpack_require__(80);
  var $buffer = __webpack_require__(108);
  var ctx = __webpack_require__(23);
  var anInstance = __webpack_require__(41);
  var propertyDesc = __webpack_require__(39);
  var hide = __webpack_require__(17);
  var redefineAll = __webpack_require__(46);
  var toInteger = __webpack_require__(29);
  var toLength = __webpack_require__(10);
  var toIndex = __webpack_require__(143);
  var toAbsoluteIndex = __webpack_require__(48);
  var toPrimitive = __webpack_require__(30);
  var has = __webpack_require__(16);
  var classof = __webpack_require__(42);
  var isObject = __webpack_require__(4);
  var toObject = __webpack_require__(11);
  var isArrayIter = __webpack_require__(91);
  var create = __webpack_require__(32);
  var getPrototypeOf = __webpack_require__(19);
  var gOPN = __webpack_require__(45).f;
  var getIterFn = __webpack_require__(58);
  var uid = __webpack_require__(49);
  var wks = __webpack_require__(6);
  var createArrayMethod = __webpack_require__(26);
  var createArrayIncludes = __webpack_require__(64);
  var speciesConstructor = __webpack_require__(79);
  var ArrayIterators = __webpack_require__(110);
  var Iterators = __webpack_require__(43);
  var $iterDetect = __webpack_require__(73);
  var setSpecies = __webpack_require__(47);
  var arrayFill = __webpack_require__(83);
  var arrayCopyWithin = __webpack_require__(117);
  var $DP = __webpack_require__(8);
  var $GOPD = __webpack_require__(18);
  var dP = $DP.f;
  var gOPD = $GOPD.f;
  var RangeError = global.RangeError;
  var TypeError = global.TypeError;
  var Uint8Array = global.Uint8Array;
  var ARRAY_BUFFER = 'ArrayBuffer';
  var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
  var PROTOTYPE = 'prototype';
  var ArrayProto = Array[PROTOTYPE];
  var $ArrayBuffer = $buffer.ArrayBuffer;
  var $DataView = $buffer.DataView;
  var arrayForEach = createArrayMethod(0);
  var arrayFilter = createArrayMethod(2);
  var arraySome = createArrayMethod(3);
  var arrayEvery = createArrayMethod(4);
  var arrayFind = createArrayMethod(5);
  var arrayFindIndex = createArrayMethod(6);
  var arrayIncludes = createArrayIncludes(true);
  var arrayIndexOf = createArrayIncludes(false);
  var arrayValues = ArrayIterators.values;
  var arrayKeys = ArrayIterators.keys;
  var arrayEntries = ArrayIterators.entries;
  var arrayLastIndexOf = ArrayProto.lastIndexOf;
  var arrayReduce = ArrayProto.reduce;
  var arrayReduceRight = ArrayProto.reduceRight;
  var arrayJoin = ArrayProto.join;
  var arraySort = ArrayProto.sort;
  var arraySlice = ArrayProto.slice;
  var arrayToString = ArrayProto.toString;
  var arrayToLocaleString = ArrayProto.toLocaleString;
  var ITERATOR = wks('iterator');
  var TAG = wks('toStringTag');
  var TYPED_CONSTRUCTOR = uid('typed_constructor');
  var DEF_CONSTRUCTOR = uid('def_constructor');
  var ALL_CONSTRUCTORS = $typed.CONSTR;
  var TYPED_ARRAY = $typed.TYPED;
  var VIEW = $typed.VIEW;
  var WRONG_LENGTH = 'Wrong length!';

  var $map = createArrayMethod(1, function (O, length) {
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function () {
    // eslint-disable-next-line no-undef
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
    new Uint8Array(1).set({});
  });

  var toOffset = function (it, BYTES) {
    var offset = toInteger(it);
    if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function (it) {
    if (isObject(it) && TYPED_ARRAY in it) return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function (C, length) {
    if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function (O, list) {
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function (C, list) {
    var index = 0;
    var length = list.length;
    var result = allocate(C, length);
    while (length > index) result[index] = list[index++];
    return result;
  };

  var addGetter = function (it, key, internal) {
    dP(it, key, { get: function () { return this._d[internal]; } });
  };

  var $from = function from(source /* , mapfn, thisArg */) {
    var O = toObject(source);
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iterFn = getIterFn(O);
    var i, length, values, result, step, iterator;
    if (iterFn != undefined && !isArrayIter(iterFn)) {
      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
        values.push(step.value);
      } O = values;
    }
    if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
    for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/* ...items */) {
    var index = 0;
    var length = arguments.length;
    var result = allocate(this, length);
    while (length > index) result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function () { arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString() {
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /* , end */) {
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /* , thisArg */) {
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /* , start, end */) { // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /* , thisArg */) {
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /* , thisArg */) {
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /* , thisArg */) {
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /* , thisArg */) {
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /* , fromIndex */) {
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /* , fromIndex */) {
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator) { // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) { // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /* , thisArg */) {
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse() {
      var that = this;
      var length = validate(that).length;
      var middle = Math.floor(length / 2);
      var index = 0;
      var value;
      while (index < middle) {
        value = that[index];
        that[index++] = that[--length];
        that[length] = value;
      } return that;
    },
    some: function some(callbackfn /* , thisArg */) {
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn) {
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end) {
      var O = validate(this);
      var length = O.length;
      var $begin = toAbsoluteIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end) {
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /* , offset */) {
    validate(this);
    var offset = toOffset(arguments[1], 1);
    var length = this.length;
    var src = toObject(arrayLike);
    var len = toLength(src.length);
    var index = 0;
    if (len + offset > length) throw RangeError(WRONG_LENGTH);
    while (index < len) this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries() {
      return arrayEntries.call(validate(this));
    },
    keys: function keys() {
      return arrayKeys.call(validate(this));
    },
    values: function values() {
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function (target, key) {
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key) {
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc) {
    if (isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ) {
      target[key] = desc.value;
      return target;
    } return dP(target, key, desc);
  };

  if (!ALL_CONSTRUCTORS) {
    $GOPD.f = $getDesc;
    $DP.f = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty: $setDesc
  });

  if (fails(function () { arrayToString.call({}); })) {
    arrayToString = arrayToLocaleString = function toString() {
      return arrayJoin.call(this);
    };
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice: $slice,
    set: $set,
    constructor: function () { /* noop */ },
    toString: arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function () { return this[TYPED_ARRAY]; }
  });

  // eslint-disable-next-line max-statements
  module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
    CLAMPED = !!CLAMPED;
    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + KEY;
    var SETTER = 'set' + KEY;
    var TypedArray = global[NAME];
    var Base = TypedArray || {};
    var TAC = TypedArray && getPrototypeOf(TypedArray);
    var FORCED = !TypedArray || !$typed.ABV;
    var O = {};
    var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function (that, index) {
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function (that, index, value) {
      var data = that._d;
      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function (that, index) {
      dP(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if (FORCED) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME, '_d');
        var index = 0;
        var offset = 0;
        var buffer, byteLength, length, klass;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new $ArrayBuffer(byteLength);
        } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (TYPED_ARRAY in data) {
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while (index < length) addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if (!fails(function () {
      TypedArray(1);
    }) || !fails(function () {
      new TypedArray(-1); // eslint-disable-line no-new
    }) || !$iterDetect(function (iter) {
      new TypedArray(); // eslint-disable-line no-new
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(1.5); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if (!isObject(data)) return new Base(toIndex(data));
        if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if (TYPED_ARRAY in data) return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
        if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator = TypedArrayPrototype[ITERATOR];
    var CORRECT_ITER_NAME = !!$nativeIterator
      && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
    var $iterator = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
      dP(TypedArrayPrototype, TAG, {
        get: function () { return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES
    });

    $export($export.S + $export.F * fails(function () { Base.of.call(TypedArray, 1); }), NAME, {
      from: $from,
      of: $of
    });

    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;

    $export($export.P + $export.F * fails(function () {
      new TypedArray(1).slice();
    }), NAME, { slice: $slice });

    $export($export.P + $export.F * (fails(function () {
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
    }) || !fails(function () {
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, { toLocaleString: $toLocaleString });

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function () { /* empty */ };


/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Util__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__RegExp__ = __webpack_require__(371);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Date__ = __webpack_require__(40);
/* harmony export (immutable) */ __webpack_exports__["compare"] = compare;
/* harmony export (immutable) */ __webpack_exports__["compareTo"] = compareTo;
/* harmony export (immutable) */ __webpack_exports__["indexOfAny"] = indexOfAny;
/* harmony export (immutable) */ __webpack_exports__["fsFormat"] = fsFormat;
/* harmony export (immutable) */ __webpack_exports__["format"] = format;
/* harmony export (immutable) */ __webpack_exports__["endsWith"] = endsWith;
/* harmony export (immutable) */ __webpack_exports__["initialize"] = initialize;
/* harmony export (immutable) */ __webpack_exports__["insert"] = insert;
/* harmony export (immutable) */ __webpack_exports__["isNullOrEmpty"] = isNullOrEmpty;
/* harmony export (immutable) */ __webpack_exports__["isNullOrWhiteSpace"] = isNullOrWhiteSpace;
/* harmony export (immutable) */ __webpack_exports__["join"] = join;
/* harmony export (immutable) */ __webpack_exports__["newGuid"] = newGuid;
/* harmony export (immutable) */ __webpack_exports__["padLeft"] = padLeft;
/* harmony export (immutable) */ __webpack_exports__["padRight"] = padRight;
/* harmony export (immutable) */ __webpack_exports__["remove"] = remove;
/* harmony export (immutable) */ __webpack_exports__["replace"] = replace;
/* harmony export (immutable) */ __webpack_exports__["replicate"] = replicate;
/* harmony export (immutable) */ __webpack_exports__["split"] = split;
/* harmony export (immutable) */ __webpack_exports__["trim"] = trim;









var fsFormatRegExp = /(^|[^%])%([0+ ]*)(-?\d+)?(?:\.(\d+))?(\w)/;
var formatRegExp = /\{(\d+)(,-?\d+)?(?:\:(.+?))?\}/g;
var StringComparison = {
    CurrentCulture: 0,
    CurrentCultureIgnoreCase: 1,
    InvariantCulture: 2,
    InvariantCultureIgnoreCase: 3,
    Ordinal: 4,
    OrdinalIgnoreCase: 5,
};
function cmp(x, y, ic) {
    function isIgnoreCase(i) {
        return i === true ||
            i === StringComparison.CurrentCultureIgnoreCase ||
            i === StringComparison.InvariantCultureIgnoreCase ||
            i === StringComparison.OrdinalIgnoreCase;
    }
    function isOrdinal(i) {
        return i === StringComparison.Ordinal ||
            i === StringComparison.OrdinalIgnoreCase;
    }
    if (x == null)
        return y == null ? 0 : -1;
    if (y == null)
        return 1;
    if (isOrdinal(ic)) {
        if (isIgnoreCase(ic)) {
            x = x.toLowerCase();
            y = y.toLowerCase();
        }
        return (x === y) ? 0 : (x < y ? -1 : 1);
    }
    else {
        if (isIgnoreCase(ic)) {
            x = x.toLocaleLowerCase();
            y = y.toLocaleLowerCase();
        }
        return x.localeCompare(y);
    }
}
function compare() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    switch (args.length) {
        case 2: return cmp(args[0], args[1], false);
        case 3: return cmp(args[0], args[1], args[2]);
        case 4: return cmp(args[0], args[1], args[2] === true);
        case 5: return cmp(args[0].substr(args[1], args[4]), args[2].substr(args[3], args[4]), false);
        case 6: return cmp(args[0].substr(args[1], args[4]), args[2].substr(args[3], args[4]), args[5]);
        case 7: return cmp(args[0].substr(args[1], args[4]), args[2].substr(args[3], args[4]), args[5] === true);
        default: throw new Error("String.compare: Unsupported number of parameters");
    }
}
function compareTo(x, y) {
    return cmp(x, y, false);
}
function indexOfAny(str, anyOf) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    if (str == null || str === "")
        return -1;
    var startIndex = (args.length > 0) ? args[0] : 0;
    if (startIndex < 0)
        throw new Error("String.indexOfAny: Start index cannot be negative");
    var length = (args.length > 1) ? args[1] : str.length - startIndex;
    if (length < 0)
        throw new Error("String.indexOfAny: Length cannot be negative");
    if (length > str.length - startIndex)
        throw new Error("String.indexOfAny: Invalid startIndex and length");
    str = str.substr(startIndex, length);
    for (var _a = 0, anyOf_1 = anyOf; _a < anyOf_1.length; _a++) {
        var c = anyOf_1[_a];
        var index = str.indexOf(c);
        if (index > -1)
            return index + startIndex;
    }
    return -1;
}
function toHex(value) {
    return value < 0
        ? "ff" + (16777215 - (Math.abs(value) - 1)).toString(16)
        : value.toString(16);
}
function fsFormat(str) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var _cont;
    function isObject(x) {
        return x !== null && typeof x === "object" && !(x instanceof Number) && !(x instanceof String) && !(x instanceof Boolean);
    }
    function formatOnce(str, rep) {
        return str.replace(fsFormatRegExp, function (_, prefix, flags, pad, precision, format) {
            switch (format) {
                case "f":
                case "F":
                    rep = rep.toFixed(precision || 6);
                    break;
                case "g":
                case "G":
                    rep = rep.toPrecision(precision);
                    break;
                case "e":
                case "E":
                    rep = rep.toExponential(precision);
                    break;
                case "O":
                    rep = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Util__["toString"])(rep);
                    break;
                case "A":
                    try {
                        rep = JSON.stringify(rep, function (k, v) {
                            return v && v[Symbol.iterator] && !Array.isArray(v) && isObject(v) ? Array.from(v)
                                : v && typeof v.ToString === "function" ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Util__["toString"])(v) : v;
                        });
                    }
                    catch (err) {
                        rep = "{" + Object.getOwnPropertyNames(rep).map(function (k) { return k + ": " + String(rep[k]); }).join(", ") + "}";
                    }
                    break;
                case "x":
                    rep = toHex(Number(rep));
                    break;
                case "X":
                    rep = toHex(Number(rep)).toUpperCase();
                    break;
            }
            var plusPrefix = flags.indexOf("+") >= 0 && parseInt(rep) >= 0;
            if (!isNaN(pad = parseInt(pad))) {
                var ch = pad >= 0 && flags.indexOf("0") >= 0 ? "0" : " ";
                rep = padLeft(rep, Math.abs(pad) - (plusPrefix ? 1 : 0), ch, pad < 0);
            }
            var once = prefix + (plusPrefix ? "+" + rep : rep);
            return once.replace(/%/g, "%%");
        });
    }
    function makeFn(str) {
        return function (rep) {
            var str2 = formatOnce(str, rep);
            return fsFormatRegExp.test(str2)
                ? makeFn(str2) : _cont(str2.replace(/%%/g, "%"));
        };
    }
    if (args.length === 0) {
        return function (cont) {
            _cont = cont;
            return fsFormatRegExp.test(str) ? makeFn(str) : _cont(str);
        };
    }
    else {
        for (var i = 0; i < args.length; i++) {
            str = formatOnce(str, args[i]);
        }
        return str.replace(/%%/g, "%");
    }
}
function format(str) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return str.replace(formatRegExp, function (match, idx, pad, format) {
        var rep = args[idx], padSymbol = " ";
        if (typeof rep === "number") {
            switch ((format || "").substring(0, 1)) {
                case "f":
                case "F":
                    rep = format.length > 1 ? rep.toFixed(format.substring(1)) : rep.toFixed(2);
                    break;
                case "g":
                case "G":
                    rep = format.length > 1 ? rep.toPrecision(format.substring(1)) : rep.toPrecision();
                    break;
                case "e":
                case "E":
                    rep = format.length > 1 ? rep.toExponential(format.substring(1)) : rep.toExponential();
                    break;
                case "p":
                case "P":
                    rep = (format.length > 1 ? (rep * 100).toFixed(format.substring(1)) : (rep * 100).toFixed(2)) + " %";
                    break;
                case "x":
                    rep = toHex(Number(rep));
                    break;
                case "X":
                    rep = toHex(Number(rep)).toUpperCase();
                    break;
                default:
                    var m = /^(0+)(\.0+)?$/.exec(format);
                    if (m != null) {
                        var decs = 0;
                        if (m[2] != null)
                            rep = rep.toFixed(decs = m[2].length - 1);
                        pad = "," + (m[1].length + (decs ? decs + 1 : 0)).toString();
                        padSymbol = "0";
                    }
                    else if (format) {
                        rep = format;
                    }
            }
        }
        else if (rep instanceof Date) {
            if (format.length === 1) {
                switch (format) {
                    case "D":
                        rep = rep.toDateString();
                        break;
                    case "T":
                        rep = rep.toLocaleTimeString();
                        break;
                    case "d":
                        rep = rep.toLocaleDateString();
                        break;
                    case "t":
                        rep = rep.toLocaleTimeString().replace(/:\d\d(?!:)/, "");
                        break;
                    case "o":
                    case "O":
                        if (rep.kind === 2) {
                            var offset = rep.getTimezoneOffset() * -1;
                            rep = format("{0:yyyy-MM-dd}T{0:HH:mm}:{1:00.000}{2}{3:00}:{4:00}", rep, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Date__["second"])(rep), offset >= 0 ? "+" : "-", ~~(offset / 60), offset % 60);
                        }
                        else {
                            rep = rep.toISOString();
                        }
                }
            }
            else {
                rep = format.replace(/\w+/g, function (match2) {
                    var rep2 = match2;
                    switch (match2.substring(0, 1)) {
                        case "y":
                            rep2 = match2.length < 4 ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Date__["year"])(rep) % 100 : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Date__["year"])(rep);
                            break;
                        case "h":
                            rep2 = rep.getHours() > 12 ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Date__["hour"])(rep) % 12 : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Date__["hour"])(rep);
                            break;
                        case "M":
                            rep2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Date__["month"])(rep);
                            break;
                        case "d":
                            rep2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Date__["day"])(rep);
                            break;
                        case "H":
                            rep2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Date__["hour"])(rep);
                            break;
                        case "m":
                            rep2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Date__["minute"])(rep);
                            break;
                        case "s":
                            rep2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Date__["second"])(rep);
                            break;
                    }
                    if (rep2 !== match2 && rep2 < 10 && match2.length > 1) {
                        rep2 = "0" + rep2;
                    }
                    return rep2;
                });
            }
        }
        if (!isNaN(pad = parseInt((pad || "").substring(1)))) {
            rep = padLeft(rep, Math.abs(pad), padSymbol, pad < 0);
        }
        return rep;
    });
}
function endsWith(str, search) {
    var idx = str.lastIndexOf(search);
    return idx >= 0 && idx == str.length - search.length;
}
function initialize(n, f) {
    if (n < 0)
        throw new Error("String length must be non-negative");
    var xs = new Array(n);
    for (var i = 0; i < n; i++)
        xs[i] = f(i);
    return xs.join("");
}
function insert(str, startIndex, value) {
    if (startIndex < 0 || startIndex > str.length) {
        throw new Error("startIndex is negative or greater than the length of this instance.");
    }
    return str.substring(0, startIndex) + value + str.substring(startIndex);
}
function isNullOrEmpty(str) {
    return typeof str !== "string" || str.length == 0;
}
function isNullOrWhiteSpace(str) {
    return typeof str !== "string" || /^\s*$/.test(str);
}
function join(delimiter, xs) {
    xs = typeof xs == "string" ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Util__["getRestParams"])(arguments, 1) : xs;
    return (Array.isArray(xs) ? xs : Array.from(xs)).join(delimiter);
}
function newGuid() {
    var uuid = "";
    for (var i = 0; i < 32; i++) {
        var random = Math.random() * 16 | 0;
        if (i === 8 || i === 12 || i === 16 || i === 20)
            uuid += "-";
        uuid += (i === 12 ? 4 : i === 16 ? random & 3 | 8 : random).toString(16);
    }
    return uuid;
}
function padLeft(str, len, ch, isRight) {
    ch = ch || " ";
    str = String(str);
    len = len - str.length;
    for (var i = -1; ++i < len;)
        str = isRight ? str + ch : ch + str;
    return str;
}
function padRight(str, len, ch) {
    return padLeft(str, len, ch, true);
}
function remove(str, startIndex, count) {
    if (startIndex >= str.length) {
        throw new Error("startIndex must be less than length of string");
    }
    if (typeof count === "number" && (startIndex + count) > str.length) {
        throw new Error("Index and count must refer to a location within the string.");
    }
    return str.slice(0, startIndex) + (typeof count === "number" ? str.substr(startIndex + count) : "");
}
function replace(str, search, replace) {
    return str.replace(new RegExp(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__RegExp__["a" /* escape */])(search), "g"), replace);
}
function replicate(n, x) {
    return initialize(n, function () { return x; });
}
function split(str, splitters, count, removeEmpty) {
    count = typeof count == "number" ? count : null;
    removeEmpty = typeof removeEmpty == "number" ? removeEmpty : null;
    if (count < 0)
        throw new Error("Count cannot be less than zero");
    if (count === 0)
        return [];
    splitters = Array.isArray(splitters) ? splitters : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Util__["getRestParams"])(arguments, 1);
    splitters = splitters.map(function (x) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__RegExp__["a" /* escape */])(x); });
    splitters = splitters.length > 0 ? splitters : [" "];
    var m;
    var i = 0;
    var splits = [];
    var reg = new RegExp(splitters.join("|"), "g");
    while ((count == null || count > 1) && (m = reg.exec(str)) !== null) {
        if (!removeEmpty || (m.index - i) > 0) {
            count = count != null ? count - 1 : count;
            splits.push(str.substring(i, m.index));
        }
        i = reg.lastIndex;
    }
    if (!removeEmpty || (str.length - i) > 0)
        splits.push(str.substring(i));
    return splits;
}
function trim(str, side) {
    var chars = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        chars[_i - 2] = arguments[_i];
    }
    if (side == "both" && chars.length == 0)
        return str.trim();
    if (side == "start" || side == "both") {
        var reg = chars.length == 0 ? /^\s+/ : new RegExp("^[" + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__RegExp__["a" /* escape */])(chars.join("")) + "]+");
        str = str.replace(reg, "");
    }
    if (side == "end" || side == "both") {
        var reg = chars.length == 0 ? /\s+$/ : new RegExp("[" + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__RegExp__["a" /* escape */])(chars.join("")) + "]+$");
        str = str.replace(reg, "");
    }
    return str;
}


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(6)('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__(17)(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(23);
var call = __webpack_require__(127);
var isArrayIter = __webpack_require__(91);
var anObject = __webpack_require__(1);
var toLength = __webpack_require__(10);
var getIterFn = __webpack_require__(58);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(49)('meta');
var isObject = __webpack_require__(4);
var has = __webpack_require__(16);
var setDesc = __webpack_require__(8).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(3)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TimeSpan__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Util__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Long__ = __webpack_require__(60);
/* harmony export (immutable) */ __webpack_exports__["minValue"] = minValue;
/* harmony export (immutable) */ __webpack_exports__["maxValue"] = maxValue;
/* harmony export (immutable) */ __webpack_exports__["parse"] = parse;
/* harmony export (immutable) */ __webpack_exports__["tryParse"] = tryParse;
/* harmony export (immutable) */ __webpack_exports__["create"] = create;
/* harmony export (immutable) */ __webpack_exports__["now"] = now;
/* harmony export (immutable) */ __webpack_exports__["utcNow"] = utcNow;
/* harmony export (immutable) */ __webpack_exports__["today"] = today;
/* harmony export (immutable) */ __webpack_exports__["isLeapYear"] = isLeapYear;
/* harmony export (immutable) */ __webpack_exports__["daysInMonth"] = daysInMonth;
/* harmony export (immutable) */ __webpack_exports__["toUniversalTime"] = toUniversalTime;
/* harmony export (immutable) */ __webpack_exports__["toLocalTime"] = toLocalTime;
/* harmony export (immutable) */ __webpack_exports__["timeOfDay"] = timeOfDay;
/* harmony export (immutable) */ __webpack_exports__["date"] = date;
/* harmony export (immutable) */ __webpack_exports__["kind"] = kind;
/* harmony export (immutable) */ __webpack_exports__["day"] = day;
/* harmony export (immutable) */ __webpack_exports__["hour"] = hour;
/* harmony export (immutable) */ __webpack_exports__["millisecond"] = millisecond;
/* harmony export (immutable) */ __webpack_exports__["minute"] = minute;
/* harmony export (immutable) */ __webpack_exports__["month"] = month;
/* harmony export (immutable) */ __webpack_exports__["second"] = second;
/* harmony export (immutable) */ __webpack_exports__["year"] = year;
/* harmony export (immutable) */ __webpack_exports__["dayOfWeek"] = dayOfWeek;
/* harmony export (immutable) */ __webpack_exports__["ticks"] = ticks;
/* harmony export (immutable) */ __webpack_exports__["toBinary"] = toBinary;
/* harmony export (immutable) */ __webpack_exports__["dayOfYear"] = dayOfYear;
/* harmony export (immutable) */ __webpack_exports__["add"] = add;
/* harmony export (immutable) */ __webpack_exports__["addDays"] = addDays;
/* harmony export (immutable) */ __webpack_exports__["addHours"] = addHours;
/* harmony export (immutable) */ __webpack_exports__["addMinutes"] = addMinutes;
/* harmony export (immutable) */ __webpack_exports__["addSeconds"] = addSeconds;
/* harmony export (immutable) */ __webpack_exports__["addMilliseconds"] = addMilliseconds;
/* harmony export (immutable) */ __webpack_exports__["addTicks"] = addTicks;
/* harmony export (immutable) */ __webpack_exports__["addYears"] = addYears;
/* harmony export (immutable) */ __webpack_exports__["addMonths"] = addMonths;
/* harmony export (immutable) */ __webpack_exports__["subtract"] = subtract;
/* harmony export (immutable) */ __webpack_exports__["toLongDateString"] = toLongDateString;
/* harmony export (immutable) */ __webpack_exports__["toShortDateString"] = toShortDateString;
/* harmony export (immutable) */ __webpack_exports__["toLongTimeString"] = toLongTimeString;
/* harmony export (immutable) */ __webpack_exports__["toShortTimeString"] = toShortTimeString;
/* harmony export (immutable) */ __webpack_exports__["equals"] = equals;
/* harmony export (immutable) */ __webpack_exports__["compare"] = compare;
/* harmony export (immutable) */ __webpack_exports__["compareTo"] = compareTo;
/* harmony export (immutable) */ __webpack_exports__["op_Addition"] = op_Addition;
/* harmony export (immutable) */ __webpack_exports__["op_Subtraction"] = op_Subtraction;



function minValue() {
    return parse(-8640000000000000, 1);
}
function maxValue() {
    return parse(8640000000000000, 1);
}
function parse(v, kind) {
    if (kind == null) {
        kind = typeof v == "string" && v.slice(-1) == "Z" ? 1 : 2;
    }
    var date = (v == null) ? new Date() : new Date(v);
    if (kind === 2) {
        date.kind = kind;
    }
    if (isNaN(date.getTime())) {
        throw new Error("The string is not a valid Date.");
    }
    return date;
}
function tryParse(v) {
    try {
        return [true, parse(v)];
    }
    catch (_err) {
        return [false, minValue()];
    }
}
function create(year, month, day, h, m, s, ms, kind) {
    if (h === void 0) { h = 0; }
    if (m === void 0) { m = 0; }
    if (s === void 0) { s = 0; }
    if (ms === void 0) { ms = 0; }
    if (kind === void 0) { kind = 2; }
    var date;
    if (kind === 2) {
        date = new Date(year, month - 1, day, h, m, s, ms);
        date.kind = kind;
    }
    else {
        date = new Date(Date.UTC(year, month - 1, day, h, m, s, ms));
    }
    if (isNaN(date.getTime())) {
        throw new Error("The parameters describe an unrepresentable Date.");
    }
    return date;
}
function now() {
    return parse();
}
function utcNow() {
    return parse(null, 1);
}
function today() {
    return date(now());
}
function isLeapYear(year) {
    return year % 4 == 0 && year % 100 != 0 || year % 400 == 0;
}
function daysInMonth(year, month) {
    return month == 2
        ? isLeapYear(year) ? 29 : 28
        : month >= 8 ? month % 2 == 0 ? 31 : 30 : month % 2 == 0 ? 30 : 31;
}
function toUniversalTime(d) {
    return d.kind === 2 ? new Date(d.getTime()) : d;
}
function toLocalTime(d) {
    if (d.kind === 2) {
        return d;
    }
    else {
        var d2 = new Date(d.getTime());
        d2.kind = 2;
        return d2;
    }
}
function timeOfDay(d) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__TimeSpan__["create"])(0, hour(d), minute(d), second(d), millisecond(d));
}
function date(d) {
    return create(year(d), month(d), day(d), 0, 0, 0, 0, d.kind || 1);
}
function kind(d) {
    return d.kind || 1;
}
function day(d) {
    return d.kind === 2 ? d.getDate() : d.getUTCDate();
}
function hour(d) {
    return d.kind === 2 ? d.getHours() : d.getUTCHours();
}
function millisecond(d) {
    return d.kind === 2 ? d.getMilliseconds() : d.getUTCMilliseconds();
}
function minute(d) {
    return d.kind === 2 ? d.getMinutes() : d.getUTCMinutes();
}
function month(d) {
    return (d.kind === 2 ? d.getMonth() : d.getUTCMonth()) + 1;
}
function second(d) {
    return d.kind === 2 ? d.getSeconds() : d.getUTCSeconds();
}
function year(d) {
    return d.kind === 2 ? d.getFullYear() : d.getUTCFullYear();
}
function dayOfWeek(d) {
    return d.kind === 2 ? d.getDay() : d.getUTCDay();
}
function ticks(d) {
    return __WEBPACK_IMPORTED_MODULE_2__Long__["a" /* fromNumber */](d.getTime())
        .add(62135596800000)
        .sub(d.kind == 2 ? d.getTimezoneOffset() * 60 * 1000 : 0)
        .mul(10000);
}
function toBinary(d) {
    return ticks(d);
}
function dayOfYear(d) {
    var _year = year(d);
    var _month = month(d);
    var _day = day(d);
    for (var i = 1; i < _month; i++)
        _day += daysInMonth(_year, i);
    return _day;
}
function add(d, ts) {
    return parse(d.getTime() + ts, d.kind || 1);
}
function addDays(d, v) {
    return parse(d.getTime() + v * 86400000, d.kind || 1);
}
function addHours(d, v) {
    return parse(d.getTime() + v * 3600000, d.kind || 1);
}
function addMinutes(d, v) {
    return parse(d.getTime() + v * 60000, d.kind || 1);
}
function addSeconds(d, v) {
    return parse(d.getTime() + v * 1000, d.kind || 1);
}
function addMilliseconds(d, v) {
    return parse(d.getTime() + v, d.kind || 1);
}
function addTicks(d, t) {
    return parse(__WEBPACK_IMPORTED_MODULE_2__Long__["a" /* fromNumber */](d.getTime()).add(t.div(10000)).toNumber(), d.kind || 1);
}
function addYears(d, v) {
    var newMonth = month(d);
    var newYear = year(d) + v;
    var _daysInMonth = daysInMonth(newYear, newMonth);
    var newDay = Math.min(_daysInMonth, day(d));
    return create(newYear, newMonth, newDay, hour(d), minute(d), second(d), millisecond(d), d.kind || 1);
}
function addMonths(d, v) {
    var newMonth = month(d) + v;
    var newMonth_ = 0;
    var yearOffset = 0;
    if (newMonth > 12) {
        newMonth_ = newMonth % 12;
        yearOffset = Math.floor(newMonth / 12);
        newMonth = newMonth_;
    }
    else if (newMonth < 1) {
        newMonth_ = 12 + newMonth % 12;
        yearOffset = Math.floor(newMonth / 12) + (newMonth_ == 12 ? -1 : 0);
        newMonth = newMonth_;
    }
    var newYear = year(d) + yearOffset;
    var _daysInMonth = daysInMonth(newYear, newMonth);
    var newDay = Math.min(_daysInMonth, day(d));
    return create(newYear, newMonth, newDay, hour(d), minute(d), second(d), millisecond(d), d.kind || 1);
}
function subtract(d, that) {
    return typeof that == "number"
        ? parse(d.getTime() - that, d.kind || 1)
        : d.getTime() - that.getTime();
}
function toLongDateString(d) {
    return d.toDateString();
}
function toShortDateString(d) {
    return d.toLocaleDateString();
}
function toLongTimeString(d) {
    return d.toLocaleTimeString();
}
function toShortTimeString(d) {
    return d.toLocaleTimeString().replace(/:\d\d(?!:)/, "");
}
function equals(d1, d2) {
    return d1.getTime() == d2.getTime();
}
function compare(x, y) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Util__["compare"])(x, y);
}
function compareTo(x, y) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Util__["compare"])(x, y);
}
function op_Addition(x, y) {
    return add(x, y);
}
function op_Subtraction(x, y) {
    return subtract(x, y);
}


/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(24);
var TAG = __webpack_require__(6)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(135);
var hiddenKeys = __webpack_require__(87).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(20);
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var dP = __webpack_require__(8);
var DESCRIPTORS = __webpack_require__(9);
var SPECIES = __webpack_require__(6)('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(29);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 49 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Util__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Symbol__ = __webpack_require__(12);


var GenericComparer = (function () {
    function GenericComparer(f) {
        this.Compare = f || __WEBPACK_IMPORTED_MODULE_0__Util__["compare"];
    }
    GenericComparer.prototype[__WEBPACK_IMPORTED_MODULE_1__Symbol__["default"].reflection] = function () {
        return { interfaces: ["System.IComparer"] };
    };
    return GenericComparer;
}());
/* harmony default export */ __webpack_exports__["default"] = (GenericComparer);


/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ListClass__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Util__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__GenericComparer__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Symbol__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Seq__ = __webpack_require__(7);
/* harmony export (immutable) */ __webpack_exports__["groupBy"] = groupBy;
/* harmony export (immutable) */ __webpack_exports__["countBy"] = countBy;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MapTree", function() { return MapTree; });
/* harmony export (immutable) */ __webpack_exports__["create"] = create;
/* harmony export (immutable) */ __webpack_exports__["add"] = add;
/* harmony export (immutable) */ __webpack_exports__["remove"] = remove;
/* harmony export (immutable) */ __webpack_exports__["containsValue"] = containsValue;
/* harmony export (immutable) */ __webpack_exports__["tryGetValue"] = tryGetValue;
/* harmony export (immutable) */ __webpack_exports__["exists"] = exists;
/* harmony export (immutable) */ __webpack_exports__["find"] = find;
/* harmony export (immutable) */ __webpack_exports__["tryFind"] = tryFind;
/* harmony export (immutable) */ __webpack_exports__["filter"] = filter;
/* harmony export (immutable) */ __webpack_exports__["fold"] = fold;
/* harmony export (immutable) */ __webpack_exports__["foldBack"] = foldBack;
/* harmony export (immutable) */ __webpack_exports__["forAll"] = forAll;
/* harmony export (immutable) */ __webpack_exports__["isEmpty"] = isEmpty;
/* harmony export (immutable) */ __webpack_exports__["iterate"] = iterate;
/* harmony export (immutable) */ __webpack_exports__["map"] = map;
/* harmony export (immutable) */ __webpack_exports__["partition"] = partition;
/* harmony export (immutable) */ __webpack_exports__["findKey"] = findKey;
/* harmony export (immutable) */ __webpack_exports__["tryFindKey"] = tryFindKey;
/* harmony export (immutable) */ __webpack_exports__["pick"] = pick;
/* harmony export (immutable) */ __webpack_exports__["tryPick"] = tryPick;












function groupBy(f, xs) {
    var keys = [], iter = xs[Symbol.iterator]();
    var acc = create(), cur = iter.next();
    while (!cur.done) {
        var k = f(cur.value), vs = tryFind(k, acc);
        if (vs == null) {
            keys.push(k);
            acc = add(k, [cur.value], acc);
        }
        else {
            vs.push(cur.value);
        }
        cur = iter.next();
    }
    return keys.map(function (k) { return [k, acc.get(k)]; });
}
function countBy(f, xs) {
    return groupBy(f, xs).map(function (kv) { return [kv[0], kv[1].length]; });
}
var MapTree = (function () {
    function MapTree(caseName, fields) {
        this.Case = caseName;
        this.Fields = fields;
    }
    return MapTree;
}());

function tree_sizeAux(acc, m) {
    return m.Case === "MapOne"
        ? acc + 1
        : m.Case === "MapNode"
            ? tree_sizeAux(tree_sizeAux(acc + 1, m.Fields[2]), m.Fields[3])
            : acc;
}
function tree_size(x) {
    return tree_sizeAux(0, x);
}
function tree_empty() {
    return new MapTree("MapEmpty", []);
}
function tree_height(_arg1) {
    return _arg1.Case === "MapOne" ? 1 : _arg1.Case === "MapNode" ? _arg1.Fields[4] : 0;
}
function tree_isEmpty(m) {
    return m.Case === "MapEmpty" ? true : false;
}
function tree_mk(l, k, v, r) {
    var matchValue = [l, r];
    var $target1 = function () {
        var hl = tree_height(l);
        var hr = tree_height(r);
        var m = hl < hr ? hr : hl;
        return new MapTree("MapNode", [k, v, l, r, m + 1]);
    };
    if (matchValue[0].Case === "MapEmpty") {
        if (matchValue[1].Case === "MapEmpty") {
            return new MapTree("MapOne", [k, v]);
        }
        else {
            return $target1();
        }
    }
    else {
        return $target1();
    }
}
;
function tree_rebalance(t1, k, v, t2) {
    var t1h = tree_height(t1);
    var t2h = tree_height(t2);
    if (t2h > t1h + 2) {
        if (t2.Case === "MapNode") {
            if (tree_height(t2.Fields[2]) > t1h + 1) {
                if (t2.Fields[2].Case === "MapNode") {
                    return tree_mk(tree_mk(t1, k, v, t2.Fields[2].Fields[2]), t2.Fields[2].Fields[0], t2.Fields[2].Fields[1], tree_mk(t2.Fields[2].Fields[3], t2.Fields[0], t2.Fields[1], t2.Fields[3]));
                }
                else {
                    throw new Error("rebalance");
                }
            }
            else {
                return tree_mk(tree_mk(t1, k, v, t2.Fields[2]), t2.Fields[0], t2.Fields[1], t2.Fields[3]);
            }
        }
        else {
            throw new Error("rebalance");
        }
    }
    else {
        if (t1h > t2h + 2) {
            if (t1.Case === "MapNode") {
                if (tree_height(t1.Fields[3]) > t2h + 1) {
                    if (t1.Fields[3].Case === "MapNode") {
                        return tree_mk(tree_mk(t1.Fields[2], t1.Fields[0], t1.Fields[1], t1.Fields[3].Fields[2]), t1.Fields[3].Fields[0], t1.Fields[3].Fields[1], tree_mk(t1.Fields[3].Fields[3], k, v, t2));
                    }
                    else {
                        throw new Error("rebalance");
                    }
                }
                else {
                    return tree_mk(t1.Fields[2], t1.Fields[0], t1.Fields[1], tree_mk(t1.Fields[3], k, v, t2));
                }
            }
            else {
                throw new Error("rebalance");
            }
        }
        else {
            return tree_mk(t1, k, v, t2);
        }
    }
}
function tree_add(comparer, k, v, m) {
    if (m.Case === "MapOne") {
        var c = comparer.Compare(k, m.Fields[0]);
        if (c < 0) {
            return new MapTree("MapNode", [k, v, new MapTree("MapEmpty", []), m, 2]);
        }
        else if (c === 0) {
            return new MapTree("MapOne", [k, v]);
        }
        return new MapTree("MapNode", [k, v, m, new MapTree("MapEmpty", []), 2]);
    }
    else if (m.Case === "MapNode") {
        var c = comparer.Compare(k, m.Fields[0]);
        if (c < 0) {
            return tree_rebalance(tree_add(comparer, k, v, m.Fields[2]), m.Fields[0], m.Fields[1], m.Fields[3]);
        }
        else if (c === 0) {
            return new MapTree("MapNode", [k, v, m.Fields[2], m.Fields[3], m.Fields[4]]);
        }
        return tree_rebalance(m.Fields[2], m.Fields[0], m.Fields[1], tree_add(comparer, k, v, m.Fields[3]));
    }
    return new MapTree("MapOne", [k, v]);
}
function tree_find(comparer, k, m) {
    var res = tree_tryFind(comparer, k, m);
    if (res != null)
        return res;
    throw new Error("key not found");
}
function tree_tryFind(comparer, k, m) {
    if (m.Case === "MapOne") {
        var c = comparer.Compare(k, m.Fields[0]);
        return c === 0 ? m.Fields[1] : null;
    }
    else if (m.Case === "MapNode") {
        var c = comparer.Compare(k, m.Fields[0]);
        if (c < 0) {
            return tree_tryFind(comparer, k, m.Fields[2]);
        }
        else {
            if (c === 0) {
                return m.Fields[1];
            }
            else {
                return tree_tryFind(comparer, k, m.Fields[3]);
            }
        }
    }
    return null;
}
function tree_partition1(comparer, f, k, v, acc1, acc2) {
    return f(k, v) ? [tree_add(comparer, k, v, acc1), acc2] : [acc1, tree_add(comparer, k, v, acc2)];
}
function tree_partitionAux(comparer, f, s, acc_0, acc_1) {
    var acc = [acc_0, acc_1];
    if (s.Case === "MapOne") {
        return tree_partition1(comparer, f, s.Fields[0], s.Fields[1], acc[0], acc[1]);
    }
    else if (s.Case === "MapNode") {
        var acc_2 = tree_partitionAux(comparer, f, s.Fields[3], acc[0], acc[1]);
        var acc_3 = tree_partition1(comparer, f, s.Fields[0], s.Fields[1], acc_2[0], acc_2[1]);
        return tree_partitionAux(comparer, f, s.Fields[2], acc_3[0], acc_3[1]);
    }
    return acc;
}
function tree_partition(comparer, f, s) {
    return tree_partitionAux(comparer, f, s, tree_empty(), tree_empty());
}
function tree_filter1(comparer, f, k, v, acc) {
    return f(k, v) ? tree_add(comparer, k, v, acc) : acc;
}
function tree_filterAux(comparer, f, s, acc) {
    return s.Case === "MapOne" ? tree_filter1(comparer, f, s.Fields[0], s.Fields[1], acc) : s.Case === "MapNode" ? tree_filterAux(comparer, f, s.Fields[3], tree_filter1(comparer, f, s.Fields[0], s.Fields[1], tree_filterAux(comparer, f, s.Fields[2], acc))) : acc;
}
function tree_filter(comparer, f, s) {
    return tree_filterAux(comparer, f, s, tree_empty());
}
function tree_spliceOutSuccessor(m) {
    if (m.Case === "MapOne") {
        return [m.Fields[0], m.Fields[1], new MapTree("MapEmpty", [])];
    }
    else if (m.Case === "MapNode") {
        if (m.Fields[2].Case === "MapEmpty") {
            return [m.Fields[0], m.Fields[1], m.Fields[3]];
        }
        else {
            var kvl = tree_spliceOutSuccessor(m.Fields[2]);
            return [kvl[0], kvl[1], tree_mk(kvl[2], m.Fields[0], m.Fields[1], m.Fields[3])];
        }
    }
    throw new Error("internal error: Map.spliceOutSuccessor");
}
function tree_remove(comparer, k, m) {
    if (m.Case === "MapOne") {
        var c = comparer.Compare(k, m.Fields[0]);
        if (c === 0) {
            return new MapTree("MapEmpty", []);
        }
        else {
            return m;
        }
    }
    else if (m.Case === "MapNode") {
        var c = comparer.Compare(k, m.Fields[0]);
        if (c < 0) {
            return tree_rebalance(tree_remove(comparer, k, m.Fields[2]), m.Fields[0], m.Fields[1], m.Fields[3]);
        }
        else {
            if (c === 0) {
                var matchValue = [m.Fields[2], m.Fields[3]];
                if (matchValue[0].Case === "MapEmpty") {
                    return m.Fields[3];
                }
                else {
                    if (matchValue[1].Case === "MapEmpty") {
                        return m.Fields[2];
                    }
                    else {
                        var patternInput = tree_spliceOutSuccessor(m.Fields[3]);
                        var sv = patternInput[1];
                        var sk = patternInput[0];
                        var r_ = patternInput[2];
                        return tree_mk(m.Fields[2], sk, sv, r_);
                    }
                }
            }
            else {
                return tree_rebalance(m.Fields[2], m.Fields[0], m.Fields[1], tree_remove(comparer, k, m.Fields[3]));
            }
        }
    }
    else {
        return tree_empty();
    }
}
function tree_mem(comparer, k, m) {
    if (m.Case === "MapOne") {
        return comparer.Compare(k, m.Fields[0]) === 0;
    }
    else if (m.Case === "MapNode") {
        var c = comparer.Compare(k, m.Fields[0]);
        if (c < 0) {
            return tree_mem(comparer, k, m.Fields[2]);
        }
        else {
            if (c === 0) {
                return true;
            }
            else {
                return tree_mem(comparer, k, m.Fields[3]);
            }
        }
    }
    else {
        return false;
    }
}
function tree_iter(f, m) {
    if (m.Case === "MapOne") {
        f(m.Fields[0], m.Fields[1]);
    }
    else if (m.Case === "MapNode") {
        tree_iter(f, m.Fields[2]);
        f(m.Fields[0], m.Fields[1]);
        tree_iter(f, m.Fields[3]);
    }
}
function tree_tryPick(f, m) {
    if (m.Case === "MapOne") {
        return f(m.Fields[0], m.Fields[1]);
    }
    else if (m.Case === "MapNode") {
        var matchValue = tree_tryPick(f, m.Fields[2]);
        if (matchValue == null) {
            var matchValue_1 = f(m.Fields[0], m.Fields[1]);
            if (matchValue_1 == null) {
                return tree_tryPick(f, m.Fields[3]);
            }
            else {
                var res = matchValue_1;
                return res;
            }
        }
        else {
            var res = matchValue;
            return res;
        }
    }
    else {
        return null;
    }
}
function tree_exists(f, m) {
    return m.Case === "MapOne" ? f(m.Fields[0], m.Fields[1]) : m.Case === "MapNode" ? (tree_exists(f, m.Fields[2]) ? true : f(m.Fields[0], m.Fields[1])) ? true : tree_exists(f, m.Fields[3]) : false;
}
function tree_forall(f, m) {
    return m.Case === "MapOne" ? f(m.Fields[0], m.Fields[1]) : m.Case === "MapNode" ? (tree_forall(f, m.Fields[2]) ? f(m.Fields[0], m.Fields[1]) : false) ? tree_forall(f, m.Fields[3]) : false : true;
}
function tree_mapi(f, m) {
    return m.Case === "MapOne" ? new MapTree("MapOne", [m.Fields[0], f(m.Fields[0], m.Fields[1])]) : m.Case === "MapNode" ? new MapTree("MapNode", [m.Fields[0], f(m.Fields[0], m.Fields[1]), tree_mapi(f, m.Fields[2]), tree_mapi(f, m.Fields[3]), m.Fields[4]]) : tree_empty();
}
function tree_foldBack(f, m, x) {
    return m.Case === "MapOne" ? f(m.Fields[0], m.Fields[1], x) : m.Case === "MapNode" ? tree_foldBack(f, m.Fields[2], f(m.Fields[0], m.Fields[1], tree_foldBack(f, m.Fields[3], x))) : x;
}
function tree_fold(f, x, m) {
    return m.Case === "MapOne" ? f(x, m.Fields[0], m.Fields[1]) : m.Case === "MapNode" ? tree_fold(f, f(tree_fold(f, x, m.Fields[2]), m.Fields[0], m.Fields[1]), m.Fields[3]) : x;
}
function tree_mkFromEnumerator(comparer, acc, e) {
    var cur = e.next();
    while (!cur.done) {
        acc = tree_add(comparer, cur.value[0], cur.value[1], acc);
        cur = e.next();
    }
    return acc;
}
function tree_ofSeq(comparer, c) {
    var ie = c[Symbol.iterator]();
    return tree_mkFromEnumerator(comparer, tree_empty(), ie);
}
function tree_collapseLHS(stack) {
    if (stack.tail != null) {
        if (stack.head.Case === "MapOne") {
            return stack;
        }
        else if (stack.head.Case === "MapNode") {
            return tree_collapseLHS(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* ofArray */])([
                stack.head.Fields[2],
                new MapTree("MapOne", [stack.head.Fields[0], stack.head.Fields[1]]),
                stack.head.Fields[3]
            ], stack.tail));
        }
        else {
            return tree_collapseLHS(stack.tail);
        }
    }
    else {
        return new __WEBPACK_IMPORTED_MODULE_0__ListClass__["b" /* default */]();
    }
}
function tree_mkIterator(s) {
    return { stack: tree_collapseLHS(new __WEBPACK_IMPORTED_MODULE_0__ListClass__["b" /* default */](s, new __WEBPACK_IMPORTED_MODULE_0__ListClass__["b" /* default */]())), started: false };
}
function tree_moveNext(i) {
    function current(i) {
        if (i.stack.tail == null) {
            return null;
        }
        else if (i.stack.head.Case === "MapOne") {
            return [i.stack.head.Fields[0], i.stack.head.Fields[1]];
        }
        throw new Error("Please report error: Map iterator, unexpected stack for current");
    }
    if (i.started) {
        if (i.stack.tail == null) {
            return { done: true, value: null };
        }
        else {
            if (i.stack.head.Case === "MapOne") {
                i.stack = tree_collapseLHS(i.stack.tail);
                return {
                    done: i.stack.tail == null,
                    value: current(i)
                };
            }
            else {
                throw new Error("Please report error: Map iterator, unexpected stack for moveNext");
            }
        }
    }
    else {
        i.started = true;
        return {
            done: i.stack.tail == null,
            value: current(i)
        };
    }
    ;
}
var FableMap = (function () {
    function FableMap() {
    }
    FableMap.prototype.ToString = function () {
        return "map [" + Array.from(this).map(__WEBPACK_IMPORTED_MODULE_1__Util__["toString"]).join("; ") + "]";
    };
    FableMap.prototype.Equals = function (m2) {
        return this.CompareTo(m2) === 0;
    };
    FableMap.prototype.CompareTo = function (m2) {
        var _this = this;
        return this === m2 ? 0 : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__Seq__["compareWith"])(function (kvp1, kvp2) {
            var c = _this.comparer.Compare(kvp1[0], kvp2[0]);
            return c !== 0 ? c : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Util__["compare"])(kvp1[1], kvp2[1]);
        }, this, m2);
    };
    FableMap.prototype[Symbol.iterator] = function () {
        var i = tree_mkIterator(this.tree);
        return {
            next: function () { return tree_moveNext(i); }
        };
    };
    FableMap.prototype.entries = function () {
        return this[Symbol.iterator]();
    };
    FableMap.prototype.keys = function () {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__Seq__["map"])(function (kv) { return kv[0]; }, this);
    };
    FableMap.prototype.values = function () {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__Seq__["map"])(function (kv) { return kv[1]; }, this);
    };
    FableMap.prototype.get = function (k) {
        return tree_find(this.comparer, k, this.tree);
    };
    FableMap.prototype.has = function (k) {
        return tree_mem(this.comparer, k, this.tree);
    };
    FableMap.prototype.set = function (k, v) {
        throw new Error("not supported");
    };
    FableMap.prototype.delete = function (k) {
        throw new Error("not supported");
    };
    FableMap.prototype.clear = function () {
        throw new Error("not supported");
    };
    Object.defineProperty(FableMap.prototype, "size", {
        get: function () {
            return tree_size(this.tree);
        },
        enumerable: true,
        configurable: true
    });
    FableMap.prototype[__WEBPACK_IMPORTED_MODULE_3__Symbol__["default"].reflection] = function () {
        return {
            type: "Microsoft.FSharp.Collections.FSharpMap",
            interfaces: ["System.IEquatable", "System.IComparable", "System.Collections.Generic.IDictionary"]
        };
    };
    return FableMap;
}());
/* harmony default export */ __webpack_exports__["default"] = (FableMap);
function from(comparer, tree) {
    var map = new FableMap();
    map.tree = tree;
    map.comparer = comparer || new __WEBPACK_IMPORTED_MODULE_2__GenericComparer__["default"]();
    return map;
}
function create(ie, comparer) {
    comparer = comparer || new __WEBPACK_IMPORTED_MODULE_2__GenericComparer__["default"]();
    return from(comparer, ie ? tree_ofSeq(comparer, ie) : tree_empty());
}
function add(k, v, map) {
    return from(map.comparer, tree_add(map.comparer, k, v, map.tree));
}
function remove(item, map) {
    return from(map.comparer, tree_remove(map.comparer, item, map.tree));
}
function containsValue(v, map) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__Seq__["fold"])(function (acc, k) { return acc || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Util__["equals"])(map.get(k), v); }, false, map.keys());
}
function tryGetValue(map, key, defaultValue) {
    return map.has(key) ? [true, map.get(key)] : [false, defaultValue];
}
function exists(f, map) {
    return tree_exists(f, map.tree);
}
function find(k, map) {
    return tree_find(map.comparer, k, map.tree);
}
function tryFind(k, map) {
    return tree_tryFind(map.comparer, k, map.tree);
}
function filter(f, map) {
    return from(map.comparer, tree_filter(map.comparer, f, map.tree));
}
function fold(f, seed, map) {
    return tree_fold(f, seed, map.tree);
}
function foldBack(f, map, seed) {
    return tree_foldBack(f, map.tree, seed);
}
function forAll(f, map) {
    return tree_forall(f, map.tree);
}
function isEmpty(map) {
    return tree_isEmpty(map.tree);
}
function iterate(f, map) {
    tree_iter(f, map.tree);
}
function map(f, map) {
    return from(map.comparer, tree_mapi(f, map.tree));
}
function partition(f, map) {
    var rs = tree_partition(map.comparer, f, map.tree);
    return [from(map.comparer, rs[0]), from(map.comparer, rs[1])];
}
function findKey(f, map) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__Seq__["pick"])(function (kv) { return f(kv[0], kv[1]) ? kv[0] : null; }, map);
}
function tryFindKey(f, map) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__Seq__["tryPick"])(function (kv) { return f(kv[0], kv[1]) ? kv[0] : null; }, map);
}
function pick(f, map) {
    var res = tryPick(f, map);
    if (res != null)
        return res;
    throw new Error("key not found");
}
function tryPick(f, map) {
    return tree_tryPick(f, map.tree);
}


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(8).f;
var has = __webpack_require__(16);
var TAG = __webpack_require__(6)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var defined = __webpack_require__(27);
var fails = __webpack_require__(3);
var spaces = __webpack_require__(106);
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Trampoline", function() { return Trampoline; });
/* harmony export (immutable) */ __webpack_exports__["protectedCont"] = protectedCont;
/* harmony export (immutable) */ __webpack_exports__["protectedBind"] = protectedBind;
/* harmony export (immutable) */ __webpack_exports__["protectedReturn"] = protectedReturn;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AsyncBuilder", function() { return AsyncBuilder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "singleton", function() { return singleton; });
var Trampoline = (function () {
    function Trampoline() {
        this.callCount = 0;
    }
    Object.defineProperty(Trampoline, "maxTrampolineCallCount", {
        get: function () {
            return 2000;
        },
        enumerable: true,
        configurable: true
    });
    Trampoline.prototype.incrementAndCheck = function () {
        return this.callCount++ > Trampoline.maxTrampolineCallCount;
    };
    Trampoline.prototype.hijack = function (f) {
        this.callCount = 0;
        setTimeout(f, 0);
    };
    return Trampoline;
}());

function protectedCont(f) {
    return function (ctx) {
        if (ctx.cancelToken.isCancelled)
            ctx.onCancel("cancelled");
        else if (ctx.trampoline.incrementAndCheck())
            ctx.trampoline.hijack(function () {
                try {
                    f(ctx);
                }
                catch (err) {
                    ctx.onError(err);
                }
            });
        else
            try {
                f(ctx);
            }
            catch (err) {
                ctx.onError(err);
            }
    };
}
function protectedBind(computation, binder) {
    return protectedCont(function (ctx) {
        computation({
            onSuccess: function (x) {
                try {
                    binder(x)(ctx);
                }
                catch (ex) {
                    ctx.onError(ex);
                }
            },
            onError: ctx.onError,
            onCancel: ctx.onCancel,
            cancelToken: ctx.cancelToken,
            trampoline: ctx.trampoline
        });
    });
}
function protectedReturn(value) {
    return protectedCont(function (ctx) { return ctx.onSuccess(value); });
}
var AsyncBuilder = (function () {
    function AsyncBuilder() {
    }
    AsyncBuilder.prototype.Bind = function (computation, binder) {
        return protectedBind(computation, binder);
    };
    AsyncBuilder.prototype.Combine = function (computation1, computation2) {
        return this.Bind(computation1, function () { return computation2; });
    };
    AsyncBuilder.prototype.Delay = function (generator) {
        return protectedCont(function (ctx) { return generator()(ctx); });
    };
    AsyncBuilder.prototype.For = function (sequence, body) {
        var iter = sequence[Symbol.iterator]();
        var cur = iter.next();
        return this.While(function () { return !cur.done; }, this.Delay(function () {
            var res = body(cur.value);
            cur = iter.next();
            return res;
        }));
    };
    AsyncBuilder.prototype.Return = function (value) {
        return protectedReturn(value);
    };
    AsyncBuilder.prototype.ReturnFrom = function (computation) {
        return computation;
    };
    AsyncBuilder.prototype.TryFinally = function (computation, compensation) {
        return protectedCont(function (ctx) {
            computation({
                onSuccess: function (x) {
                    compensation();
                    ctx.onSuccess(x);
                },
                onError: function (x) {
                    compensation();
                    ctx.onError(x);
                },
                onCancel: function (x) {
                    compensation();
                    ctx.onCancel(x);
                },
                cancelToken: ctx.cancelToken,
                trampoline: ctx.trampoline
            });
        });
    };
    AsyncBuilder.prototype.TryWith = function (computation, catchHandler) {
        return protectedCont(function (ctx) {
            computation({
                onSuccess: ctx.onSuccess,
                onCancel: ctx.onCancel,
                cancelToken: ctx.cancelToken,
                trampoline: ctx.trampoline,
                onError: function (ex) {
                    try {
                        catchHandler(ex)(ctx);
                    }
                    catch (ex2) {
                        ctx.onError(ex2);
                    }
                }
            });
        });
    };
    AsyncBuilder.prototype.Using = function (resource, binder) {
        return this.TryFinally(binder(resource), function () { return resource.Dispose(); });
    };
    AsyncBuilder.prototype.While = function (guard, computation) {
        var _this = this;
        if (guard())
            return this.Bind(computation, function () { return _this.While(guard, computation); });
        else
            return this.Return(void 0);
    };
    AsyncBuilder.prototype.Zero = function () {
        return protectedCont(function (ctx) { return ctx.onSuccess(void 0); });
    };
    return AsyncBuilder;
}());

var singleton = new AsyncBuilder();


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(24);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 57 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(42);
var ITERATOR = __webpack_require__(6)('iterator');
var Iterators = __webpack_require__(43);
module.exports = __webpack_require__(15).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Symbol__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Util__ = __webpack_require__(5);
/* harmony export (immutable) */ __webpack_exports__["a"] = ofArray;




function ofArray(args, base) {
    var acc = base || new List();
    for (var i = args.length - 1; i >= 0; i--) {
        acc = new List(args[i], acc);
    }
    return acc;
}
var List = (function () {
    function List(head, tail) {
        this.head = head;
        this.tail = tail;
    }
    List.prototype.ToString = function () {
        return "[" + Array.from(this).map(__WEBPACK_IMPORTED_MODULE_1__Util__["toString"]).join("; ") + "]";
    };
    List.prototype.Equals = function (x) {
        if (this === x) {
            return true;
        }
        else {
            var iter1 = this[Symbol.iterator](), iter2 = x[Symbol.iterator]();
            for (;;) {
                var cur1 = iter1.next(), cur2 = iter2.next();
                if (cur1.done)
                    return cur2.done ? true : false;
                else if (cur2.done)
                    return false;
                else if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Util__["equals"])(cur1.value, cur2.value))
                    return false;
            }
        }
    };
    List.prototype.CompareTo = function (x) {
        if (this === x) {
            return 0;
        }
        else {
            var acc = 0;
            var iter1 = this[Symbol.iterator](), iter2 = x[Symbol.iterator]();
            for (;;) {
                var cur1 = iter1.next(), cur2 = iter2.next();
                if (cur1.done)
                    return cur2.done ? acc : -1;
                else if (cur2.done)
                    return 1;
                else {
                    acc = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Util__["compare"])(cur1.value, cur2.value);
                    if (acc != 0)
                        return acc;
                }
            }
        }
    };
    Object.defineProperty(List.prototype, "length", {
        get: function () {
            var cur = this, acc = 0;
            while (cur.tail != null) {
                cur = cur.tail;
                acc++;
            }
            return acc;
        },
        enumerable: true,
        configurable: true
    });
    List.prototype[Symbol.iterator] = function () {
        var cur = this;
        return {
            next: function () {
                var tmp = cur;
                cur = cur.tail;
                return { done: tmp.tail == null, value: tmp.head };
            }
        };
    };
    List.prototype[__WEBPACK_IMPORTED_MODULE_0__Symbol__["default"].reflection] = function () {
        return {
            type: "Microsoft.FSharp.Collections.FSharpList",
            interfaces: ["System.IEquatable", "System.IComparable"]
        };
    };
    return List;
}());
/* harmony default export */ __webpack_exports__["b"] = (List);


/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Symbol__ = __webpack_require__(12);
/* unused harmony export Long */
/* unused harmony export isLong */
/* unused harmony export fromInt */
/* harmony export (immutable) */ __webpack_exports__["a"] = fromNumber;
/* harmony export (immutable) */ __webpack_exports__["b"] = fromBits;
/* unused harmony export fromString */
/* unused harmony export fromValue */
/* unused harmony export ZERO */
/* unused harmony export UZERO */
/* unused harmony export ONE */
/* unused harmony export UONE */
/* unused harmony export NEG_ONE */
/* unused harmony export MAX_VALUE */
/* unused harmony export MAX_UNSIGNED_VALUE */
/* unused harmony export MIN_VALUE */

var Long = (function () {
    function Long(low, high, unsigned) {
        this.eq = this.equals;
        this.neq = this.notEquals;
        this.lt = this.lessThan;
        this.lte = this.lessThanOrEqual;
        this.gt = this.greaterThan;
        this.gte = this.greaterThanOrEqual;
        this.comp = this.compare;
        this.neg = this.negate;
        this.abs = this.absolute;
        this.sub = this.subtract;
        this.mul = this.multiply;
        this.div = this.divide;
        this.mod = this.modulo;
        this.shl = this.shiftLeft;
        this.shr = this.shiftRight;
        this.shru = this.shiftRightUnsigned;
        this.Equals = this.equals;
        this.CompareTo = this.compare;
        this.ToString = this.toString;
        this.low = low | 0;
        this.high = high | 0;
        this.unsigned = !!unsigned;
    }
    Long.prototype.toInt = function () {
        return this.unsigned ? this.low >>> 0 : this.low;
    };
    Long.prototype.toNumber = function () {
        if (this.unsigned)
            return ((this.high >>> 0) * TWO_PWR_32_DBL) + (this.low >>> 0);
        return this.high * TWO_PWR_32_DBL + (this.low >>> 0);
    };
    Long.prototype.toString = function (radix) {
        if (radix === void 0) { radix = 10; }
        radix = radix || 10;
        if (radix < 2 || 36 < radix)
            throw RangeError('radix');
        if (this.isZero())
            return '0';
        if (this.isNegative()) {
            if (this.eq(MIN_VALUE)) {
                var radixLong = fromNumber(radix), div = this.div(radixLong), rem1 = div.mul(radixLong).sub(this);
                return div.toString(radix) + rem1.toInt().toString(radix);
            }
            else
                return '-' + this.neg().toString(radix);
        }
        var radixToPower = fromNumber(pow_dbl(radix, 6), this.unsigned), rem = this;
        var result = '';
        while (true) {
            var remDiv = rem.div(radixToPower), intval = rem.sub(remDiv.mul(radixToPower)).toInt() >>> 0, digits = intval.toString(radix);
            rem = remDiv;
            if (rem.isZero())
                return digits + result;
            else {
                while (digits.length < 6)
                    digits = '0' + digits;
                result = '' + digits + result;
            }
        }
    };
    Long.prototype.getHighBits = function () {
        return this.high;
    };
    Long.prototype.getHighBitsUnsigned = function () {
        return this.high >>> 0;
    };
    Long.prototype.getLowBits = function () {
        return this.low;
    };
    Long.prototype.getLowBitsUnsigned = function () {
        return this.low >>> 0;
    };
    Long.prototype.getNumBitsAbs = function () {
        if (this.isNegative())
            return this.eq(MIN_VALUE) ? 64 : this.neg().getNumBitsAbs();
        var val = this.high != 0 ? this.high : this.low;
        for (var bit = 31; bit > 0; bit--)
            if ((val & (1 << bit)) != 0)
                break;
        return this.high != 0 ? bit + 33 : bit + 1;
    };
    Long.prototype.isZero = function () {
        return this.high === 0 && this.low === 0;
    };
    Long.prototype.isNegative = function () {
        return !this.unsigned && this.high < 0;
    };
    Long.prototype.isPositive = function () {
        return this.unsigned || this.high >= 0;
    };
    Long.prototype.isOdd = function () {
        return (this.low & 1) === 1;
    };
    Long.prototype.isEven = function () {
        return (this.low & 1) === 0;
    };
    Long.prototype.equals = function (other) {
        if (!isLong(other))
            other = fromValue(other);
        if (this.unsigned !== other.unsigned && (this.high >>> 31) === 1 && (other.high >>> 31) === 1)
            return false;
        return this.high === other.high && this.low === other.low;
    };
    Long.prototype.notEquals = function (other) {
        return !this.eq(other);
    };
    Long.prototype.lessThan = function (other) {
        return this.comp(other) < 0;
    };
    Long.prototype.lessThanOrEqual = function (other) {
        return this.comp(other) <= 0;
    };
    Long.prototype.greaterThan = function (other) {
        return this.comp(other) > 0;
    };
    Long.prototype.greaterThanOrEqual = function (other) {
        return this.comp(other) >= 0;
    };
    Long.prototype.compare = function (other) {
        if (!isLong(other))
            other = fromValue(other);
        if (this.eq(other))
            return 0;
        var thisNeg = this.isNegative(), otherNeg = other.isNegative();
        if (thisNeg && !otherNeg)
            return -1;
        if (!thisNeg && otherNeg)
            return 1;
        if (!this.unsigned)
            return this.sub(other).isNegative() ? -1 : 1;
        return (other.high >>> 0) > (this.high >>> 0) || (other.high === this.high && (other.low >>> 0) > (this.low >>> 0)) ? -1 : 1;
    };
    Long.prototype.negate = function () {
        if (!this.unsigned && this.eq(MIN_VALUE))
            return MIN_VALUE;
        return this.not().add(ONE);
    };
    Long.prototype.absolute = function () {
        if (!this.unsigned && this.isNegative())
            return this.negate();
        else
            return this;
    };
    Long.prototype.add = function (addend) {
        if (!isLong(addend))
            addend = fromValue(addend);
        var a48 = this.high >>> 16;
        var a32 = this.high & 0xFFFF;
        var a16 = this.low >>> 16;
        var a00 = this.low & 0xFFFF;
        var b48 = addend.high >>> 16;
        var b32 = addend.high & 0xFFFF;
        var b16 = addend.low >>> 16;
        var b00 = addend.low & 0xFFFF;
        var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
        c00 += a00 + b00;
        c16 += c00 >>> 16;
        c00 &= 0xFFFF;
        c16 += a16 + b16;
        c32 += c16 >>> 16;
        c16 &= 0xFFFF;
        c32 += a32 + b32;
        c48 += c32 >>> 16;
        c32 &= 0xFFFF;
        c48 += a48 + b48;
        c48 &= 0xFFFF;
        return fromBits((c16 << 16) | c00, (c48 << 16) | c32, this.unsigned);
    };
    Long.prototype.subtract = function (subtrahend) {
        if (!isLong(subtrahend))
            subtrahend = fromValue(subtrahend);
        return this.add(subtrahend.neg());
    };
    Long.prototype.multiply = function (multiplier) {
        if (this.isZero())
            return ZERO;
        if (!isLong(multiplier))
            multiplier = fromValue(multiplier);
        if (multiplier.isZero())
            return ZERO;
        if (this.eq(MIN_VALUE))
            return multiplier.isOdd() ? MIN_VALUE : ZERO;
        if (multiplier.eq(MIN_VALUE))
            return this.isOdd() ? MIN_VALUE : ZERO;
        if (this.isNegative()) {
            if (multiplier.isNegative())
                return this.neg().mul(multiplier.neg());
            else
                return this.neg().mul(multiplier).neg();
        }
        else if (multiplier.isNegative())
            return this.mul(multiplier.neg()).neg();
        if (this.lt(TWO_PWR_24) && multiplier.lt(TWO_PWR_24))
            return fromNumber(this.toNumber() * multiplier.toNumber(), this.unsigned);
        var a48 = this.high >>> 16;
        var a32 = this.high & 0xFFFF;
        var a16 = this.low >>> 16;
        var a00 = this.low & 0xFFFF;
        var b48 = multiplier.high >>> 16;
        var b32 = multiplier.high & 0xFFFF;
        var b16 = multiplier.low >>> 16;
        var b00 = multiplier.low & 0xFFFF;
        var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
        c00 += a00 * b00;
        c16 += c00 >>> 16;
        c00 &= 0xFFFF;
        c16 += a16 * b00;
        c32 += c16 >>> 16;
        c16 &= 0xFFFF;
        c16 += a00 * b16;
        c32 += c16 >>> 16;
        c16 &= 0xFFFF;
        c32 += a32 * b00;
        c48 += c32 >>> 16;
        c32 &= 0xFFFF;
        c32 += a16 * b16;
        c48 += c32 >>> 16;
        c32 &= 0xFFFF;
        c32 += a00 * b32;
        c48 += c32 >>> 16;
        c32 &= 0xFFFF;
        c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
        c48 &= 0xFFFF;
        return fromBits((c16 << 16) | c00, (c48 << 16) | c32, this.unsigned);
    };
    Long.prototype.divide = function (divisor) {
        if (!isLong(divisor))
            divisor = fromValue(divisor);
        if (divisor.isZero())
            throw Error('division by zero');
        if (this.isZero())
            return this.unsigned ? UZERO : ZERO;
        var approx = 0, rem = ZERO, res = ZERO;
        if (!this.unsigned) {
            if (this.eq(MIN_VALUE)) {
                if (divisor.eq(ONE) || divisor.eq(NEG_ONE))
                    return MIN_VALUE;
                else if (divisor.eq(MIN_VALUE))
                    return ONE;
                else {
                    var halfThis = this.shr(1);
                    var approx_1 = halfThis.div(divisor).shl(1);
                    if (approx_1.eq(ZERO)) {
                        return divisor.isNegative() ? ONE : NEG_ONE;
                    }
                    else {
                        rem = this.sub(divisor.mul(approx_1));
                        res = approx_1.add(rem.div(divisor));
                        return res;
                    }
                }
            }
            else if (divisor.eq(MIN_VALUE))
                return this.unsigned ? UZERO : ZERO;
            if (this.isNegative()) {
                if (divisor.isNegative())
                    return this.neg().div(divisor.neg());
                return this.neg().div(divisor).neg();
            }
            else if (divisor.isNegative())
                return this.div(divisor.neg()).neg();
            res = ZERO;
        }
        else {
            if (!divisor.unsigned)
                divisor = divisor.toUnsigned();
            if (divisor.gt(this))
                return UZERO;
            if (divisor.gt(this.shru(1)))
                return UONE;
            res = UZERO;
        }
        rem = this;
        while (rem.gte(divisor)) {
            approx = Math.max(1, Math.floor(rem.toNumber() / divisor.toNumber()));
            var log2 = Math.ceil(Math.log(approx) / Math.LN2), delta = (log2 <= 48) ? 1 : pow_dbl(2, log2 - 48), approxRes = fromNumber(approx), approxRem = approxRes.mul(divisor);
            while (approxRem.isNegative() || approxRem.gt(rem)) {
                approx -= delta;
                approxRes = fromNumber(approx, this.unsigned);
                approxRem = approxRes.mul(divisor);
            }
            if (approxRes.isZero())
                approxRes = ONE;
            res = res.add(approxRes);
            rem = rem.sub(approxRem);
        }
        return res;
    };
    Long.prototype.modulo = function (divisor) {
        if (!isLong(divisor))
            divisor = fromValue(divisor);
        return this.sub(this.div(divisor).mul(divisor));
    };
    ;
    Long.prototype.not = function () {
        return fromBits(~this.low, ~this.high, this.unsigned);
    };
    ;
    Long.prototype.and = function (other) {
        if (!isLong(other))
            other = fromValue(other);
        return fromBits(this.low & other.low, this.high & other.high, this.unsigned);
    };
    Long.prototype.or = function (other) {
        if (!isLong(other))
            other = fromValue(other);
        return fromBits(this.low | other.low, this.high | other.high, this.unsigned);
    };
    Long.prototype.xor = function (other) {
        if (!isLong(other))
            other = fromValue(other);
        return fromBits(this.low ^ other.low, this.high ^ other.high, this.unsigned);
    };
    Long.prototype.shiftLeft = function (numBits) {
        if (isLong(numBits))
            numBits = numBits.toInt();
        numBits = numBits & 63;
        if (numBits === 0)
            return this;
        else if (numBits < 32)
            return fromBits(this.low << numBits, (this.high << numBits) | (this.low >>> (32 - numBits)), this.unsigned);
        else
            return fromBits(0, this.low << (numBits - 32), this.unsigned);
    };
    Long.prototype.shiftRight = function (numBits) {
        if (isLong(numBits))
            numBits = numBits.toInt();
        numBits = numBits & 63;
        if (numBits === 0)
            return this;
        else if (numBits < 32)
            return fromBits((this.low >>> numBits) | (this.high << (32 - numBits)), this.high >> numBits, this.unsigned);
        else
            return fromBits(this.high >> (numBits - 32), this.high >= 0 ? 0 : -1, this.unsigned);
    };
    Long.prototype.shiftRightUnsigned = function (numBits) {
        if (isLong(numBits))
            numBits = numBits.toInt();
        numBits = numBits & 63;
        if (numBits === 0)
            return this;
        else {
            var high = this.high;
            if (numBits < 32) {
                var low = this.low;
                return fromBits((low >>> numBits) | (high << (32 - numBits)), high >>> numBits, this.unsigned);
            }
            else if (numBits === 32)
                return fromBits(high, 0, this.unsigned);
            else
                return fromBits(high >>> (numBits - 32), 0, this.unsigned);
        }
    };
    Long.prototype.toSigned = function () {
        if (!this.unsigned)
            return this;
        return fromBits(this.low, this.high, false);
    };
    Long.prototype.toUnsigned = function () {
        if (this.unsigned)
            return this;
        return fromBits(this.low, this.high, true);
    };
    Long.prototype.toBytes = function (le) {
        return le ? this.toBytesLE() : this.toBytesBE();
    };
    Long.prototype.toBytesLE = function () {
        var hi = this.high, lo = this.low;
        return [
            lo & 0xff,
            (lo >>> 8) & 0xff,
            (lo >>> 16) & 0xff,
            (lo >>> 24) & 0xff,
            hi & 0xff,
            (hi >>> 8) & 0xff,
            (hi >>> 16) & 0xff,
            (hi >>> 24) & 0xff
        ];
    };
    Long.prototype.toBytesBE = function () {
        var hi = this.high, lo = this.low;
        return [
            (hi >>> 24) & 0xff,
            (hi >>> 16) & 0xff,
            (hi >>> 8) & 0xff,
            hi & 0xff,
            (lo >>> 24) & 0xff,
            (lo >>> 16) & 0xff,
            (lo >>> 8) & 0xff,
            lo & 0xff
        ];
    };
    Long.prototype[__WEBPACK_IMPORTED_MODULE_0__Symbol__["default"].reflection] = function () {
        return {
            type: "System.Int64",
            interfaces: ["FSharpRecord", "System.IComparable"],
            properties: {
                low: "number",
                high: "number",
                unsigned: "boolean"
            }
        };
    };
    return Long;
}());

var INT_CACHE = {};
var UINT_CACHE = {};
function isLong(obj) {
    return (obj && obj instanceof Long);
}
function fromInt(value, unsigned) {
    if (unsigned === void 0) { unsigned = false; }
    var obj, cachedObj, cache;
    if (unsigned) {
        value >>>= 0;
        if (cache = (0 <= value && value < 256)) {
            cachedObj = UINT_CACHE[value];
            if (cachedObj)
                return cachedObj;
        }
        obj = fromBits(value, (value | 0) < 0 ? -1 : 0, true);
        if (cache)
            UINT_CACHE[value] = obj;
        return obj;
    }
    else {
        value |= 0;
        if (cache = (-128 <= value && value < 128)) {
            cachedObj = INT_CACHE[value];
            if (cachedObj)
                return cachedObj;
        }
        obj = fromBits(value, value < 0 ? -1 : 0, false);
        if (cache)
            INT_CACHE[value] = obj;
        return obj;
    }
}
function fromNumber(value, unsigned) {
    if (unsigned === void 0) { unsigned = false; }
    if (isNaN(value) || !isFinite(value))
        return unsigned ? UZERO : ZERO;
    if (unsigned) {
        if (value < 0)
            return UZERO;
        if (value >= TWO_PWR_64_DBL)
            return MAX_UNSIGNED_VALUE;
    }
    else {
        if (value <= -TWO_PWR_63_DBL)
            return MIN_VALUE;
        if (value + 1 >= TWO_PWR_63_DBL)
            return MAX_VALUE;
    }
    if (value < 0)
        return fromNumber(-value, unsigned).neg();
    return fromBits((value % TWO_PWR_32_DBL) | 0, (value / TWO_PWR_32_DBL) | 0, unsigned);
}
function fromBits(lowBits, highBits, unsigned) {
    return new Long(lowBits, highBits, unsigned);
}
var pow_dbl = Math.pow;
function fromString(str, unsigned, radix) {
    if (unsigned === void 0) { unsigned = false; }
    if (radix === void 0) { radix = 10; }
    if (str.length === 0)
        throw Error('empty string');
    if (str === "NaN" || str === "Infinity" || str === "+Infinity" || str === "-Infinity")
        return ZERO;
    if (typeof unsigned === 'number') {
        radix = unsigned,
            unsigned = false;
    }
    else {
        unsigned = !!unsigned;
    }
    radix = radix || 10;
    if (radix < 2 || 36 < radix)
        throw RangeError('radix');
    var p = str.indexOf('-');
    if (p > 0)
        throw Error('interior hyphen');
    else if (p === 0) {
        return fromString(str.substring(1), unsigned, radix).neg();
    }
    var radixToPower = fromNumber(pow_dbl(radix, 8));
    var result = ZERO;
    for (var i = 0; i < str.length; i += 8) {
        var size = Math.min(8, str.length - i), value = parseInt(str.substring(i, i + size), radix);
        if (size < 8) {
            var power = fromNumber(pow_dbl(radix, size));
            result = result.mul(power).add(fromNumber(value));
        }
        else {
            result = result.mul(radixToPower);
            result = result.add(fromNumber(value));
        }
    }
    result.unsigned = unsigned;
    return result;
}
function fromValue(val) {
    if (val instanceof Long)
        return val;
    if (typeof val === 'number')
        return fromNumber(val);
    if (typeof val === 'string')
        return fromString(val);
    return fromBits(val.low, val.high, val.unsigned);
}
var TWO_PWR_16_DBL = 1 << 16;
var TWO_PWR_24_DBL = 1 << 24;
var TWO_PWR_32_DBL = TWO_PWR_16_DBL * TWO_PWR_16_DBL;
var TWO_PWR_64_DBL = TWO_PWR_32_DBL * TWO_PWR_32_DBL;
var TWO_PWR_63_DBL = TWO_PWR_64_DBL / 2;
var TWO_PWR_24 = fromInt(TWO_PWR_24_DBL);
var ZERO = fromInt(0);
var UZERO = fromInt(0, true);
var ONE = fromInt(1);
var UONE = fromInt(1, true);
var NEG_ONE = fromInt(-1);
var MAX_VALUE = fromBits(0xFFFFFFFF | 0, 0x7FFFFFFF | 0, false);
var MAX_UNSIGNED_VALUE = fromBits(0xFFFFFFFF | 0, 0xFFFFFFFF | 0, true);
var MIN_VALUE = fromBits(0, 0x80000000 | 0, false);


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
    'stream': __webpack_require__(82),
    'gen': __webpack_require__(373),
    'quantifier': __webpack_require__(374),
    'select': __webpack_require__(375)
};

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModuleDefinition = exports.ModuleImport = exports.TypeAssignment = exports.ValueAssignment = exports.TagDefault = exports.Constraint = exports.UpperEndpoint = exports.LowerEndpoint = exports.SetOfType = exports.SequenceOfType = exports.NamedNumberValue = exports.Value = exports.NamedTypeModifier = exports.ComponentType = exports.AsnType = exports.AsnTypeKind = exports.TagClass = exports.TagKind = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Symbol2 = __webpack_require__(12);

var _Symbol3 = _interopRequireDefault(_Symbol2);

var _Util = __webpack_require__(5);

var _List = __webpack_require__(22);

var _List2 = _interopRequireDefault(_List);

var _BigInt = __webpack_require__(81);

var _BigInt2 = _interopRequireDefault(_BigInt);

var _Map2 = __webpack_require__(51);

var _Map3 = _interopRequireDefault(_Map2);

var _String = __webpack_require__(35);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TagKind = exports.TagKind = function () {
  function TagKind(caseName, fields) {
    _classCallCheck(this, TagKind);

    this.Case = caseName;
    this.Fields = fields;
  }

  _createClass(TagKind, [{
    key: _Symbol3.default.reflection,
    value: function () {
      return {
        type: "FsAsn1.Schema.TagKind",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
        cases: {
          Explicit: [],
          Implicit: []
        }
      };
    }
  }, {
    key: "Equals",
    value: function (other) {
      return (0, _Util.equalsUnions)(this, other);
    }
  }, {
    key: "CompareTo",
    value: function (other) {
      return (0, _Util.compareUnions)(this, other);
    }
  }]);

  return TagKind;
}();

(0, _Symbol2.setType)("FsAsn1.Schema.TagKind", TagKind);

var TagClass = exports.TagClass = function () {
  function TagClass(caseName, fields) {
    _classCallCheck(this, TagClass);

    this.Case = caseName;
    this.Fields = fields;
  }

  _createClass(TagClass, [{
    key: _Symbol3.default.reflection,
    value: function () {
      return {
        type: "FsAsn1.Schema.TagClass",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
        cases: {
          Application: [],
          Private: [],
          Universal: []
        }
      };
    }
  }, {
    key: "Equals",
    value: function (other) {
      return (0, _Util.equalsUnions)(this, other);
    }
  }, {
    key: "CompareTo",
    value: function (other) {
      return (0, _Util.compareUnions)(this, other);
    }
  }]);

  return TagClass;
}();

(0, _Symbol2.setType)("FsAsn1.Schema.TagClass", TagClass);

var AsnTypeKind = exports.AsnTypeKind = function () {
  function AsnTypeKind(caseName, fields) {
    _classCallCheck(this, AsnTypeKind);

    this.Case = caseName;
    this.Fields = fields;
  }

  _createClass(AsnTypeKind, [{
    key: _Symbol3.default.reflection,
    value: function () {
      return {
        type: "FsAsn1.Schema.AsnTypeKind",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
        cases: {
          AnyType: [(0, _Util.Option)("string")],
          BitStringType: [],
          BooleanType: [],
          ChoiceType: [(0, _Util.makeGeneric)(_List2.default, {
            T: (0, _Util.Tuple)(["string", AsnType])
          })],
          IntegerType: [(0, _Util.makeGeneric)(_List2.default, {
            T: (0, _Util.Tuple)(["string", NamedNumberValue])
          })],
          NullType: [],
          ObjectIdentifierType: [],
          OctetStringType: [],
          ReferencedType: ["string"],
          SequenceOfType: [(0, _Util.Option)(Constraint), SequenceOfType],
          SequenceType: [(0, _Util.makeGeneric)(_List2.default, {
            T: ComponentType
          })],
          SetOfType: [(0, _Util.Option)(Constraint), SetOfType],
          SetType: [(0, _Util.makeGeneric)(_List2.default, {
            T: ComponentType
          })],
          TaggedType: [(0, _Util.Option)(TagClass), "number", TagKind, AsnType]
        }
      };
    }
  }, {
    key: "Equals",
    value: function (other) {
      return (0, _Util.equalsUnions)(this, other);
    }
  }, {
    key: "CompareTo",
    value: function (other) {
      return (0, _Util.compareUnions)(this, other);
    }
  }]);

  return AsnTypeKind;
}();

(0, _Symbol2.setType)("FsAsn1.Schema.AsnTypeKind", AsnTypeKind);

var AsnType = exports.AsnType = function () {
  function AsnType(kind, constraint, typeName, schemaName, componentName, range) {
    _classCallCheck(this, AsnType);

    this.Kind = kind;
    this.Constraint = constraint;
    this.TypeName = typeName;
    this.SchemaName = schemaName;
    this.ComponentName = componentName;
    this.Range = range;
  }

  _createClass(AsnType, [{
    key: _Symbol3.default.reflection,
    value: function () {
      return {
        type: "FsAsn1.Schema.AsnType",
        interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
        properties: {
          Kind: AsnTypeKind,
          Constraint: (0, _Util.Option)(Constraint),
          TypeName: (0, _Util.Option)("string"),
          SchemaName: "string",
          ComponentName: (0, _Util.Option)("string"),
          Range: (0, _Util.Option)((0, _Util.Tuple)(["number", "number"]))
        }
      };
    }
  }, {
    key: "Equals",
    value: function (other) {
      return (0, _Util.equalsRecords)(this, other);
    }
  }, {
    key: "CompareTo",
    value: function (other) {
      return (0, _Util.compareRecords)(this, other);
    }
  }]);

  return AsnType;
}();

(0, _Symbol2.setType)("FsAsn1.Schema.AsnType", AsnType);

var ComponentType = exports.ComponentType = function () {
  function ComponentType(caseName, fields) {
    _classCallCheck(this, ComponentType);

    this.Case = caseName;
    this.Fields = fields;
  }

  _createClass(ComponentType, [{
    key: _Symbol3.default.reflection,
    value: function () {
      return {
        type: "FsAsn1.Schema.ComponentType",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
        cases: {
          ComponentType: ["string", AsnType, (0, _Util.Option)(NamedTypeModifier)]
        }
      };
    }
  }, {
    key: "Equals",
    value: function (other) {
      return (0, _Util.equalsUnions)(this, other);
    }
  }, {
    key: "CompareTo",
    value: function (other) {
      return (0, _Util.compareUnions)(this, other);
    }
  }]);

  return ComponentType;
}();

(0, _Symbol2.setType)("FsAsn1.Schema.ComponentType", ComponentType);

var NamedTypeModifier = exports.NamedTypeModifier = function () {
  function NamedTypeModifier(caseName, fields) {
    _classCallCheck(this, NamedTypeModifier);

    this.Case = caseName;
    this.Fields = fields;
  }

  _createClass(NamedTypeModifier, [{
    key: _Symbol3.default.reflection,
    value: function () {
      return {
        type: "FsAsn1.Schema.NamedTypeModifier",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
        cases: {
          Default: [Value],
          Optional: []
        }
      };
    }
  }, {
    key: "Equals",
    value: function (other) {
      return (0, _Util.equalsUnions)(this, other);
    }
  }, {
    key: "CompareTo",
    value: function (other) {
      return (0, _Util.compareUnions)(this, other);
    }
  }]);

  return NamedTypeModifier;
}();

(0, _Symbol2.setType)("FsAsn1.Schema.NamedTypeModifier", NamedTypeModifier);

var Value = exports.Value = function () {
  function Value(caseName, fields) {
    _classCallCheck(this, Value);

    this.Case = caseName;
    this.Fields = fields;
  }

  _createClass(Value, [{
    key: _Symbol3.default.reflection,
    value: function () {
      return {
        type: "FsAsn1.Schema.Value",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
        cases: {
          BooleanValue: ["boolean"],
          IntegerValue: [_BigInt2.default],
          OidValue: [(0, _Util.makeGeneric)(_List2.default, {
            T: (0, _Util.Tuple)([(0, _Util.Option)("string"), (0, _Util.Option)(_BigInt2.default)])
          })],
          ReferencedValue: ["string"],
          SequenceOfValue: [(0, _Util.makeGeneric)(_List2.default, {
            T: Value
          })]
        }
      };
    }
  }, {
    key: "Equals",
    value: function (other) {
      return (0, _Util.equalsUnions)(this, other);
    }
  }, {
    key: "CompareTo",
    value: function (other) {
      return (0, _Util.compareUnions)(this, other);
    }
  }]);

  return Value;
}();

(0, _Symbol2.setType)("FsAsn1.Schema.Value", Value);

var NamedNumberValue = exports.NamedNumberValue = function () {
  function NamedNumberValue(caseName, fields) {
    _classCallCheck(this, NamedNumberValue);

    this.Case = caseName;
    this.Fields = fields;
  }

  _createClass(NamedNumberValue, [{
    key: _Symbol3.default.reflection,
    value: function () {
      return {
        type: "FsAsn1.Schema.NamedNumberValue",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
        cases: {
          DefinedValue: [Value],
          SignedNumber: [_BigInt2.default]
        }
      };
    }
  }, {
    key: "Equals",
    value: function (other) {
      return (0, _Util.equalsUnions)(this, other);
    }
  }, {
    key: "CompareTo",
    value: function (other) {
      return (0, _Util.compareUnions)(this, other);
    }
  }]);

  return NamedNumberValue;
}();

(0, _Symbol2.setType)("FsAsn1.Schema.NamedNumberValue", NamedNumberValue);

var SequenceOfType = exports.SequenceOfType = function () {
  function SequenceOfType(caseName, fields) {
    _classCallCheck(this, SequenceOfType);

    this.Case = caseName;
    this.Fields = fields;
  }

  _createClass(SequenceOfType, [{
    key: _Symbol3.default.reflection,
    value: function () {
      return {
        type: "FsAsn1.Schema.SequenceOfType",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
        cases: {
          SequenceOfNamedType: ["string", AsnType],
          SequenceOfType: [AsnType]
        }
      };
    }
  }, {
    key: "Equals",
    value: function (other) {
      return (0, _Util.equalsUnions)(this, other);
    }
  }, {
    key: "CompareTo",
    value: function (other) {
      return (0, _Util.compareUnions)(this, other);
    }
  }]);

  return SequenceOfType;
}();

(0, _Symbol2.setType)("FsAsn1.Schema.SequenceOfType", SequenceOfType);

var SetOfType = exports.SetOfType = function () {
  function SetOfType(caseName, fields) {
    _classCallCheck(this, SetOfType);

    this.Case = caseName;
    this.Fields = fields;
  }

  _createClass(SetOfType, [{
    key: _Symbol3.default.reflection,
    value: function () {
      return {
        type: "FsAsn1.Schema.SetOfType",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
        cases: {
          SetOfNamedType: ["string", AsnType],
          SetOfType: [AsnType]
        }
      };
    }
  }, {
    key: "Equals",
    value: function (other) {
      return (0, _Util.equalsUnions)(this, other);
    }
  }, {
    key: "CompareTo",
    value: function (other) {
      return (0, _Util.compareUnions)(this, other);
    }
  }]);

  return SetOfType;
}();

(0, _Symbol2.setType)("FsAsn1.Schema.SetOfType", SetOfType);

var LowerEndpoint = exports.LowerEndpoint = function () {
  function LowerEndpoint(caseName, fields) {
    _classCallCheck(this, LowerEndpoint);

    this.Case = caseName;
    this.Fields = fields;
  }

  _createClass(LowerEndpoint, [{
    key: _Symbol3.default.reflection,
    value: function () {
      return {
        type: "FsAsn1.Schema.LowerEndpoint",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
        cases: {
          Min: [],
          Value: [Value]
        }
      };
    }
  }, {
    key: "Equals",
    value: function (other) {
      return (0, _Util.equalsUnions)(this, other);
    }
  }, {
    key: "CompareTo",
    value: function (other) {
      return (0, _Util.compareUnions)(this, other);
    }
  }]);

  return LowerEndpoint;
}();

(0, _Symbol2.setType)("FsAsn1.Schema.LowerEndpoint", LowerEndpoint);

var UpperEndpoint = exports.UpperEndpoint = function () {
  function UpperEndpoint(caseName, fields) {
    _classCallCheck(this, UpperEndpoint);

    this.Case = caseName;
    this.Fields = fields;
  }

  _createClass(UpperEndpoint, [{
    key: _Symbol3.default.reflection,
    value: function () {
      return {
        type: "FsAsn1.Schema.UpperEndpoint",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
        cases: {
          Max: [],
          Value: [Value]
        }
      };
    }
  }, {
    key: "Equals",
    value: function (other) {
      return (0, _Util.equalsUnions)(this, other);
    }
  }, {
    key: "CompareTo",
    value: function (other) {
      return (0, _Util.compareUnions)(this, other);
    }
  }]);

  return UpperEndpoint;
}();

(0, _Symbol2.setType)("FsAsn1.Schema.UpperEndpoint", UpperEndpoint);

var Constraint = exports.Constraint = function () {
  function Constraint(caseName, fields) {
    _classCallCheck(this, Constraint);

    this.Case = caseName;
    this.Fields = fields;
  }

  _createClass(Constraint, [{
    key: _Symbol3.default.reflection,
    value: function () {
      return {
        type: "FsAsn1.Schema.Constraint",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
        cases: {
          SingleValue: [Value],
          SizeConstraint: [Constraint],
          Union: [Constraint, Constraint],
          ValueRange: [LowerEndpoint, UpperEndpoint]
        }
      };
    }
  }, {
    key: "Equals",
    value: function (other) {
      return (0, _Util.equalsUnions)(this, other);
    }
  }, {
    key: "CompareTo",
    value: function (other) {
      return (0, _Util.compareUnions)(this, other);
    }
  }]);

  return Constraint;
}();

(0, _Symbol2.setType)("FsAsn1.Schema.Constraint", Constraint);

var TagDefault = exports.TagDefault = function () {
  function TagDefault(caseName, fields) {
    _classCallCheck(this, TagDefault);

    this.Case = caseName;
    this.Fields = fields;
  }

  _createClass(TagDefault, [{
    key: _Symbol3.default.reflection,
    value: function () {
      return {
        type: "FsAsn1.Schema.TagDefault",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
        cases: {
          AutomaticTags: [],
          ExplicitTags: [],
          ImplicitTags: []
        }
      };
    }
  }, {
    key: "Equals",
    value: function (other) {
      return (0, _Util.equalsUnions)(this, other);
    }
  }, {
    key: "CompareTo",
    value: function (other) {
      return (0, _Util.compareUnions)(this, other);
    }
  }]);

  return TagDefault;
}();

(0, _Symbol2.setType)("FsAsn1.Schema.TagDefault", TagDefault);

var ValueAssignment = exports.ValueAssignment = function () {
  function ValueAssignment(name, type, value, range) {
    _classCallCheck(this, ValueAssignment);

    this.Name = name;
    this.Type = type;
    this.Value = value;
    this.Range = range;
  }

  _createClass(ValueAssignment, [{
    key: _Symbol3.default.reflection,
    value: function () {
      return {
        type: "FsAsn1.Schema.ValueAssignment",
        interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
        properties: {
          Name: "string",
          Type: AsnType,
          Value: Value,
          Range: (0, _Util.Option)((0, _Util.Tuple)(["number", "number"]))
        }
      };
    }
  }, {
    key: "Equals",
    value: function (other) {
      return (0, _Util.equalsRecords)(this, other);
    }
  }, {
    key: "CompareTo",
    value: function (other) {
      return (0, _Util.compareRecords)(this, other);
    }
  }]);

  return ValueAssignment;
}();

(0, _Symbol2.setType)("FsAsn1.Schema.ValueAssignment", ValueAssignment);

var TypeAssignment = exports.TypeAssignment = function () {
  function TypeAssignment(name, type, range) {
    _classCallCheck(this, TypeAssignment);

    this.Name = name;
    this.Type = type;
    this.Range = range;
  }

  _createClass(TypeAssignment, [{
    key: _Symbol3.default.reflection,
    value: function () {
      return {
        type: "FsAsn1.Schema.TypeAssignment",
        interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
        properties: {
          Name: "string",
          Type: AsnType,
          Range: (0, _Util.Option)((0, _Util.Tuple)(["number", "number"]))
        }
      };
    }
  }, {
    key: "Equals",
    value: function (other) {
      return (0, _Util.equalsRecords)(this, other);
    }
  }, {
    key: "CompareTo",
    value: function (other) {
      return (0, _Util.compareRecords)(this, other);
    }
  }]);

  return TypeAssignment;
}();

(0, _Symbol2.setType)("FsAsn1.Schema.TypeAssignment", TypeAssignment);

var ModuleImport = exports.ModuleImport = function () {
  function ModuleImport(identifier, oid, valueReferences, typeReferences) {
    _classCallCheck(this, ModuleImport);

    this.Identifier = identifier;
    this.Oid = oid;
    this.ValueReferences = valueReferences;
    this.TypeReferences = typeReferences;
  }

  _createClass(ModuleImport, [{
    key: _Symbol3.default.reflection,
    value: function () {
      return {
        type: "FsAsn1.Schema.ModuleImport",
        interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
        properties: {
          Identifier: "string",
          Oid: (0, _Util.Array)((0, _Util.Tuple)([(0, _Util.Option)("string"), (0, _Util.Option)(_BigInt2.default)])),
          ValueReferences: (0, _Util.makeGeneric)(_List2.default, {
            T: "string"
          }),
          TypeReferences: (0, _Util.makeGeneric)(_List2.default, {
            T: "string"
          })
        }
      };
    }
  }, {
    key: "Equals",
    value: function (other) {
      return (0, _Util.equalsRecords)(this, other);
    }
  }, {
    key: "CompareTo",
    value: function (other) {
      return (0, _Util.compareRecords)(this, other);
    }
  }]);

  return ModuleImport;
}();

(0, _Symbol2.setType)("FsAsn1.Schema.ModuleImport", ModuleImport);

var ModuleDefinition = exports.ModuleDefinition = function () {
  function ModuleDefinition(identifier, oid, tagDefault, extensibilityImplied, typeAssignments, valueAssignments, imports, range, elementsDefinedByOid) {
    _classCallCheck(this, ModuleDefinition);

    this.Identifier = identifier;
    this.Oid = oid;
    this.TagDefault = tagDefault;
    this.ExtensibilityImplied = extensibilityImplied;
    this.TypeAssignments = typeAssignments;
    this.ValueAssignments = valueAssignments;
    this.Imports = imports;
    this.Range = range;
    this.ElementsDefinedByOid = elementsDefinedByOid;
  }

  _createClass(ModuleDefinition, [{
    key: _Symbol3.default.reflection,
    value: function () {
      return {
        type: "FsAsn1.Schema.ModuleDefinition",
        interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
        properties: {
          Identifier: "string",
          Oid: (0, _Util.Array)((0, _Util.Tuple)([(0, _Util.Option)("string"), (0, _Util.Option)(_BigInt2.default)])),
          TagDefault: (0, _Util.Option)(TagDefault),
          ExtensibilityImplied: "boolean",
          TypeAssignments: (0, _Util.makeGeneric)(_Map3.default, {
            Key: "string",
            Value: TypeAssignment
          }),
          ValueAssignments: (0, _Util.makeGeneric)(_Map3.default, {
            Key: "string",
            Value: ValueAssignment
          }),
          Imports: (0, _Util.makeGeneric)(_List2.default, {
            T: ModuleImport
          }),
          Range: (0, _Util.Option)((0, _Util.Tuple)(["number", "number"])),
          ElementsDefinedByOid: (0, _Util.makeGeneric)(_Map3.default, {
            Key: "string",
            Value: (0, _Util.Tuple)(["string", "string"])
          })
        }
      };
    }
  }, {
    key: "Equals",
    value: function (other) {
      return (0, _Util.equalsRecords)(this, other);
    }
  }, {
    key: "CompareTo",
    value: function (other) {
      return (0, _Util.compareRecords)(this, other);
    }
  }, {
    key: "TryFindType",
    value: function (name) {
      return (0, _Util.defaultArg)(function (table) {
        return (0, _Map2.tryFind)(name, table);
      }(this.TypeAssignments), null, function (ta) {
        return ta.Type;
      });
    }
  }, {
    key: "FindType",
    value: function (name) {
      var matchValue = this.TryFindType(name);

      if (matchValue == null) {
        return (0, _String.fsFormat)("Module '%s' doesn't contain type '%s'")(function (x) {
          throw new Error(x);
        })(this.Identifier)(name);
      } else {
        return matchValue;
      }
    }
  }]);

  return ModuleDefinition;
}();

(0, _Symbol2.setType)("FsAsn1.Schema.ModuleDefinition", ModuleDefinition);

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/parse.kep'
 * DO NOT EDIT
*/

var stream = __webpack_require__(61)["stream"],
    seshat = __webpack_require__(376),
    Tail, trampoline, ParserError, ParseError, MultipleError, UnknownError, UnexpectError, ExpectError, ParserState,
        Position, Parser, label, late, rec, unparser, always, of, never, bind, chain, map, ap, extract, getParserState,
        setParserState, modifyParserState, getState, setState, modifyState, getInput, setInput, getPosition,
        setPosition, fail, attempt, look, lookahead, next, sequences, sequencea, sequence, empty, either, concat,
        choices, choicea, choice, optional, expected, not, eager, binds, cons, append, enumerations, enumerationa,
        enumeration, many, many1, manyTill, memo, token, anyToken, eof, exec, parseState, parseStream, parse, runState,
        runStream, run, testState, testStream, test, NIL = stream["NIL"],
    first = stream["first"],
    isEmpty = stream["isEmpty"],
    rest = stream["rest"],
    reduceRight = stream["reduceRight"],
    foldr = stream["foldr"],
    identity = (function(x) {
        return x;
    }),
    args = (function() {
        var args0 = arguments;
        return args0;
    });
(Tail = (function(p, state, m, cok, cerr, eok, eerr) {
    var self = this;
    (self.p = p);
    (self.state = state);
    (self.m = m);
    (self.cok = cok);
    (self.cerr = cerr);
    (self.eok = eok);
    (self.eerr = eerr);
}));
(trampoline = (function(f) {
    var value = f;
    while ((value instanceof Tail)) {
        (value = value.p(value.state, value.m, value.cok, value.cerr, value.eok, value.eerr));
    }
    return value;
}));
var Memoer = (function(memoer, frames) {
    var self = this;
    (self.memoer = memoer);
    (self.frames = frames);
});
(Memoer.empty = new(Memoer)(seshat.create((function(x, y) {
    return x.compare(y);
}), (function(x, y) {
    return ((x.id === y.id) && ((x.state === y.state) || (x.state && x.state.eq(y.state))));
})), NIL));
(Memoer.pushWindow = (function(m, lower) {
    return new(Memoer)(m.memoer, stream.cons(lower, m.frames));
}));
(Memoer.popWindow = (function(m) {
    var frames = m["frames"],
        r = rest(frames);
    return new(Memoer)((isEmpty(r) ? seshat.prune(m.memoer, first(frames)) : m.memoer), r);
}));
(Memoer.prune = (function(m, position) {
    return (isEmpty(m.frames) ? new(Memoer)(seshat.prune(m.memoer, position), m.frames) : m);
}));
(Memoer.lookup = (function(m, pos, id) {
    return seshat.lookup(m.memoer, pos, id);
}));
(Memoer.update = (function(m, pos, id, val) {
    return new(Memoer)(seshat.update(m.memoer, pos, id, val), m.frames);
}));
(Position = (function(i) {
    var self = this;
    (self.index = i);
}));
(Position.initial = new(Position)(0));
(Position.prototype.toString = (function() {
    var self = this;
    return ("" + self.index);
}));
(Position.prototype.increment = (function(_, _0) {
    var self = this;
    return new(Position)((self.index + 1));
}));
(Position.prototype.compare = (function(pos) {
    var self = this;
    return (self.index - pos.index);
}));
(ParserState = (function(input, position, userState) {
    var self = this;
    (self.input = input);
    (self.position = position);
    (self.userState = userState);
}));
(ParserState.prototype.eq = (function(other) {
    var self = this;
    return ((other && (self.input === other.input)) && (self.userState === other.userState));
}));
(ParserState.prototype.isEmpty = (function() {
    var self = this;
    return isEmpty(self.input);
}));
(ParserState.prototype.first = (function() {
    var self = this;
    return first(self.input);
}));
(ParserState.prototype.next = (function(tok) {
    var self = this;
    if ((!self._next)) {
        var r = rest(self.input),
            s = new(ParserState)(r, self.position.increment(tok, r), self.userState);
        (self._next = new(Parser)((function(_, m, cok) {
            return cok(tok, s, m);
        })));
    }
    return self._next;
}));
(ParserState.prototype.setInput = (function(input) {
    var self = this;
    return new(ParserState)(input, self.position, self.userState);
}));
(ParserState.prototype.setPosition = (function(position) {
    var self = this;
    return new(ParserState)(self.input, position, self.userState);
}));
(ParserState.prototype.setUserState = (function(userState) {
    var self = this;
    return new(ParserState)(self.input, self.position, userState);
}));
(ParserError = (function(msg) {
    var self = this;
    (self.message = msg);
}));
(ParserError.prototype = new(Error)());
(ParserError.prototype.constructor = ParserError);
(ParserError.prototype.name = "ParserError");
(ParseError = (function(position, msg) {
    var self = this;
    (self.position = position);
    (self._msg = (msg || ""));
}));
(ParseError.prototype = new(Error)());
(ParseError.prototype.constructor = ParseError);
(ParseError.prototype.name = "ParseError");
(ParseError.prototype.toString = (function() {
    var self = this;
    return self.message;
}));
Object.defineProperties(ParseError.prototype, ({
    message: ({
        configurable: true,
        get: (function() {
            var self = this;
            return ((("At " + self.position) + " ") + self.errorMessage);
        })
    }),
    errorMessage: ({
        configurable: true,
        get: (function() {
            var self = this;
            return self._msg;
        })
    })
}));
(MultipleError = (function(position, errors) {
    var self = this;
    (self.position = position);
    (self.errors = (errors || []));
}));
(MultipleError.prototype = new(ParseError)());
(MultipleError.prototype.constructor = MultipleError);
(MultipleError.prototype.name = "MultipleError");
Object.defineProperty(MultipleError.prototype, "errorMessage", ({
    get: (function() {
        var self = this;
        return (("[" + self.errors.map((function(x) {
                return x.message;
            }))
            .join(", ")) + "]");
    })
}));
var ChoiceError = (function(position, pErr, qErr) {
    var self = this;
    (self.position = position);
    (self._pErr = pErr);
    (self._qErr = qErr);
});
(ChoiceError.prototype = new(MultipleError)());
(ChoiceError.prototype.constructor = MultipleError);
(ChoiceError.prototype.name = "ChoiceError");
Object.defineProperty(ChoiceError.prototype, "errors", ({
    get: (function() {
        var self = this;
        return [self._pErr].concat(self._qErr.errors);
    })
}));
(UnknownError = (function(position) {
    var self = this;
    (self.position = position);
}));
(UnknownError.prototype = new(ParseError)());
(UnknownError.prototype.constructor = UnknownError);
(UnknownError.prototype.name = "UnknownError");
Object.defineProperty(UnknownError.prototype, "errorMessage", ({
    value: "unknown error"
}));
(UnexpectError = (function(position, unexpected) {
    var self = this;
    (self.position = position);
    (self.unexpected = unexpected);
}));
(UnexpectError.prototype = new(ParseError)());
(UnexpectError.prototype.constructor = UnexpectError);
(UnexpectError.prototype.name = "UnexpectError");
Object.defineProperty(UnexpectError.prototype, "errorMessage", ({
    get: (function() {
        var self = this;
        return ("unexpected: " + self.unexpected);
    })
}));
(ExpectError = (function(position, expected, found) {
    var self = this;
    (self.position = position);
    (self.expected = expected);
    (self.found = found);
}));
(ExpectError.prototype = new(ParseError)());
(ExpectError.prototype.constructor = ExpectError);
(ExpectError.prototype.name = "ExpectError");
Object.defineProperty(ExpectError.prototype, "errorMessage", ({
    get: (function() {
        var self = this;
        return (("expected: " + self.expected) + (self.found ? (" found: " + self.found) : ""));
    })
}));
(Parser = (function(n) {
    var self = this;
    (self.run = n);
}));
(unparser = (function(p, state, m, cok, cerr, eok, eerr) {
    return new(Tail)(p.run, state, m, cok, cerr, eok, eerr);
}));
(label = (function(name, p) {
    return (p.run.hasOwnProperty("displayName") ? label(name, new(Parser)((function(state, m, cok, cerr, eok,
        eerr) {
        return new(Tail)(p.run, state, m, cok, cerr, eok, eerr);
    }))) : new(Parser)(Object.defineProperty(p.run, "displayName", ({
        value: name,
        writable: false
    }))));
}));
(late = (function(def) {
    var value;
    return new(Parser)((function(state, m, cok, cerr, eok, eerr) {
        (value = (value || def()));
        var p = value;
        return new(Tail)(p.run, state, m, cok, cerr, eok, eerr);
    }));
}));
(rec = (function(def) {
    var value = def(late((function() {
        return value;
    })));
    return value;
}));
(Parser.prototype.of = (function(x) {
    return new(Parser)((function(state, m, _, _0, eok, _1) {
        return eok(x, state, m);
    }));
}));
(Parser.of = Parser.prototype.of);
(of = Parser.of);
(always = of);
(never = (function(x) {
    return new(Parser)((function(state, m, _, _0, _1, eerr) {
        return eerr(x, state, m);
    }));
}));
(Parser.chain = (function(p, f) {
    return new(Parser)((function(state, m, cok, cerr, eok, eerr) {
        var cok0 = (function(x, state0, m0) {
            var p0 = f(x);
            return new(Tail)(p0.run, state0, m0, cok, cerr, cok, cerr);
        }),
            eok0 = (function(x, state0, m0) {
                var p0 = f(x);
                return new(Tail)(p0.run, state0, m0, cok, cerr, eok, eerr);
            });
        return new(Tail)(p.run, state, m, cok0, cerr, eok0, eerr);
    }));
}));
(chain = Parser.chain);
(bind = chain);
(Parser.prototype.chain = (function(f) {
    var self = this;
    return chain(self, f);
}));
(Parser.prototype.map = (function(f) {
    var self = this;
    return chain(self, (function(z) {
        return of(f(z));
    }));
}));
(Parser.map = (function(f, p) {
    return p.map(f);
}));
(map = Parser.map);
(Parser.ap = (function(f, m) {
    return chain(f, (function(f0) {
        return m.map(f0);
    }));
}));
(ap = Parser.ap);
(Parser.prototype.ap = (function(m2) {
    var self = this;
    return ap(self, m2);
}));
(modifyParserState = (function(f) {
    return new(Parser)((function(state, m, _, _0, eok, _1) {
        var newState = f(state);
        return eok(newState, newState, m);
    }));
}));
var p = new(Parser)((function(state, m, _, _0, eok, _1) {
    return eok(state, state, m);
}));
(getParserState = (p.run.hasOwnProperty("displayName") ? label("Get Parser State", new(Parser)((function(state, m, cok,
    cerr, eok, eerr) {
    return new(Tail)(p.run, state, m, cok, cerr, eok, eerr);
}))) : new(Parser)(Object.defineProperty(p.run, "displayName", ({
    value: "Get Parser State",
    writable: false
})))));
(setParserState = (function(z) {
    return new(Parser)((function(state, m, _, _0, eok, _1) {
        return eok(z, z, m);
    }));
}));
(extract = (function(f) {
    return new(Parser)((function(state, m, _, _0, eok, _1) {
        return eok(f(state), state, m);
    }));
}));
(modifyState = (function(f) {
    return new(Parser)((function(state, m, _, _0, eok, _1) {
        var newState = state.setUserState(f(state.userState));
        return eok(newState, newState, m);
    }));
}));
var p0 = new(Parser)((function(state, m, _, _0, eok, _1) {
    return eok(state.userState, state, m);
}));
(getState = (p0.run.hasOwnProperty("displayName") ? label("Get State", new(Parser)((function(state, m, cok, cerr, eok,
    eerr) {
    return new(Tail)(p0.run, state, m, cok, cerr, eok, eerr);
}))) : new(Parser)(Object.defineProperty(p0.run, "displayName", ({
    value: "Get State",
    writable: false
})))));
(setState = (function(z) {
    return new(Parser)((function(state, m, _, _0, eok, _1) {
        var newState = state.setUserState(z);
        return eok(newState, newState, m);
    }));
}));
var p1 = new(Parser)((function(state, m, _, _0, eok, _1) {
    return eok(state.position, state, m);
}));
(getPosition = (p1.run.hasOwnProperty("displayName") ? label("Get Position", new(Parser)((function(state, m, cok, cerr,
    eok, eerr) {
    return new(Tail)(p1.run, state, m, cok, cerr, eok, eerr);
}))) : new(Parser)(Object.defineProperty(p1.run, "displayName", ({
    value: "Get Position",
    writable: false
})))));
(setPosition = (function(position) {
    return new(Parser)((function(state, m, _, _0, eok, _1) {
        var newState = state.setPosition(position);
        return eok(newState, newState, m);
    }));
}));
var p2 = new(Parser)((function(state, m, _, _0, eok, _1) {
    return eok(state.input, state, m);
}));
(getInput = (p2.run.hasOwnProperty("displayName") ? label("Get Input", new(Parser)((function(state, m, cok, cerr, eok,
    eerr) {
    return new(Tail)(p2.run, state, m, cok, cerr, eok, eerr);
}))) : new(Parser)(Object.defineProperty(p2.run, "displayName", ({
    value: "Get Input",
    writable: false
})))));
(setInput = (function(input) {
    return new(Parser)((function(state, m, _, _0, eok, _1) {
        var newState = state.setInput(input);
        return eok(newState, newState, m);
    }));
}));
(fail = (function(msg) {
    var e = (msg ? ParseError : UnknownError);
    return chain(getPosition, (function(z) {
        var x = new(e)(z, msg);
        return new(Parser)((function(state, m, _, _0, _1, eerr) {
            return eerr(x, state, m);
        }));
    }));
}));
(attempt = (function(p3) {
    return new(Parser)((function(state, m, cok, cerr, eok, eerr) {
        var peerr = (function(x, s, m0) {
            return eerr(x, s, Memoer.popWindow(m0));
        }),
            m0 = Memoer.pushWindow(m, state.position),
            cok0 = (function(x, s, m1) {
                return cok(x, s, Memoer.popWindow(m1));
            }),
            eok0 = (function(x, s, m1) {
                return eok(x, s, Memoer.popWindow(m1));
            });
        return new(Tail)(p3.run, state, m0, cok0, peerr, eok0, peerr);
    }));
}));
(look = (function(p3) {
    return chain(getParserState, (function(v1) {
        return chain(p3, (function(v2) {
            return next(setParserState(v1), of(v2));
        }));
    }));
}));
(lookahead = (function(p3) {
    return chain(getInput, (function(v1) {
        return chain(getPosition, (function(v2) {
            return chain(p3, (function(x) {
                return sequence(new(Parser)((function(state, m, _, _0, eok, _1) {
                    var newState = state.setPosition(v2);
                    return eok(newState, newState, m);
                })), setInput(v1), of(x));
            }));
        }));
    }));
}));
(next = (function(p3, q) {
    return chain(p3, (function() {
        return q;
    }));
}));
(sequences = reduceRight.bind(null, (function(x, y) {
    return chain(y, (function() {
        return x;
    }));
})));
var x = stream.from;
(sequencea = (function(z) {
    return sequences(x(z));
}));
(sequence = (function() {
    var args0 = arguments;
    return sequencea(args.apply(null, args0));
}));
var e = (undefined ? ParseError : UnknownError);
(Parser.prototype.empty = chain(getPosition, (function(z) {
    var x0 = new(e)(z, undefined);
    return new(Parser)((function(state, m, _, _0, _1, eerr) {
        return eerr(x0, state, m);
    }));
})));
(Parser.empty = Parser.prototype.empty);
(empty = Parser.empty);
(Parser.concat = (function(p3, q) {
    return new(Parser)((function(state, m, cok, cerr, eok, eerr) {
        var position = state["position"],
            peerr = (function(errFromP, _, mFromP) {
                var qeerr = (function(errFromQ, _0, mFromQ) {
                    return eerr(new(MultipleError)(position, [errFromP, errFromQ]), state,
                        mFromQ);
                });
                return new(Tail)(q.run, state, mFromP, cok, cerr, eok, qeerr);
            });
        return new(Tail)(p3.run, state, m, cok, cerr, eok, peerr);
    }));
}));
(concat = Parser.concat);
(either = concat);
(Parser.prototype.concat = (function(p3) {
    var self = this;
    return concat(self, p3);
}));
var x0;
(choices = foldr.bind(null, (function(x0, y) {
    return new(Parser)((function(state, m, cok, cerr, eok, eerr) {
        var position = state["position"],
            peerr = (function(errFromP, _, mFromP) {
                var qeerr = (function(errFromQ, _0, mFromQ) {
                    return eerr(new(ChoiceError)(position, errFromP, errFromQ), state,
                        mFromQ);
                });
                return new(Tail)(x0.run, state, mFromP, cok, cerr, eok, qeerr);
            });
        return new(Tail)(y.run, state, m, cok, cerr, eok, peerr);
    }));
}), ((x0 = new(MultipleError)(null, [])), new(Parser)((function(state, m, _, _0, _1, eerr) {
    return eerr(x0, state, m);
})))));
var x1 = stream.from;
(choicea = (function(z) {
    return choices(x1(z));
}));
(choice = (function() {
    var args0 = arguments;
    return choicea(args.apply(null, args0));
}));
(optional = (function(x2, p3) {
    return (p3 ? concat(p3, of(x2)) : concat(x2, of(null)));
}));
(expected = (function(expect, p3) {
    return new(Parser)((function(state, m, cok, cerr, eok, eerr) {
        var eerr0 = (function(x2, state0, m0) {
            return eerr(new(ExpectError)(state0.position, expect), state0, m0);
        });
        return new(Tail)(p3.run, state, m, cok, cerr, eok, eerr0);
    }));
}));
(not = (function(p3) {
    var p4 = concat(chain(new(Parser)((function(state, m, cok, cerr, eok, eerr) {
        var peerr = (function(x2, s, m0) {
            return eerr(x2, s, Memoer.popWindow(m0));
        }),
            m0 = Memoer.pushWindow(m, state.position),
            cok0 = (function(x2, s, m1) {
                return cok(x2, s, Memoer.popWindow(m1));
            }),
            eok0 = (function(x2, s, m1) {
                return eok(x2, s, Memoer.popWindow(m1));
            });
        return new(Tail)(p3.run, state, m0, cok0, peerr, eok0, peerr);
    })), (function(x2) {
        return chain(getPosition, (function(z) {
            var x3 = new(UnexpectError)(z, x2);
            return new(Parser)((function(state, m, _, _0, _1, eerr) {
                return eerr(x3, state, m);
            }));
        }));
    })), of(null));
    return new(Parser)((function(state, m, cok, cerr, eok, eerr) {
        var peerr = (function(x2, s, m0) {
            return eerr(x2, s, Memoer.popWindow(m0));
        }),
            m0 = Memoer.pushWindow(m, state.position),
            cok0 = (function(x2, s, m1) {
                return cok(x2, s, Memoer.popWindow(m1));
            }),
            eok0 = (function(x2, s, m1) {
                return eok(x2, s, Memoer.popWindow(m1));
            });
        return new(Tail)(p4.run, state, m0, cok0, peerr, eok0, peerr);
    }));
}));
(eager = map.bind(null, stream.toArray));
(binds = (function(p3, f) {
    return chain(eager(p3), (function(x2) {
        return f.apply(undefined, x2);
    }));
}));
var f = stream.cons;
(cons = (function(p10, p20) {
    return chain(p10, (function(x2) {
        return map((function(y) {
            return f(x2, y);
        }), p20);
    }));
}));
var f0 = stream.append;
(append = (function(p10, p20) {
    return chain(p10, (function(x2) {
        return map((function(y) {
            return f0(x2, y);
        }), p20);
    }));
}));
(enumerations = foldr.bind(null, (function(x2, y) {
    return cons(y, x2);
}), of(NIL)));
var x2 = stream.from;
(enumerationa = (function(z) {
    return enumerations(x2(z));
}));
(enumeration = (function() {
    var args0 = arguments;
    return enumerationa(args.apply(null, args0));
}));
var err = new(ParserError)("Many parser applied to parser that accepts an empty string"),
    manyError = (function() {
        throw err;
    });
(many = (function(p3) {
    var safeP = new(Parser)((function(state, m, cok, cerr, eok, eerr) {
        return new(Tail)(p3.run, state, m, cok, cerr, manyError, eerr);
    }));
    return rec((function(self) {
        var p4 = cons(safeP, self);
        return (p4 ? concat(p4, of(NIL)) : concat(NIL, of(null)));
    }));
}));
(many1 = (function(p3) {
    return cons(p3, many(p3));
}));
(manyTill = (function(p3, end) {
    return rec((function(self) {
        var p4, p5;
        return concat(((p4 = chain(getInput, (function(v1) {
                return chain(getPosition, (function(v2) {
                    return chain(end, (function(x3) {
                        return sequence(new(Parser)((function(state, m,
                            _, _0, eok, _1) {
                            var newState = state.setPosition(
                                v2);
                            return eok(newState, newState,
                                m);
                        })), setInput(v1), of(x3));
                    }));
                }));
            }))), new(Parser)((function(state, m, cok, cerr, eok, eerr) {
                var peerr = (function(x3, s, m0) {
                    return eerr(x3, s, Memoer.popWindow(m0));
                }),
                    m0 = Memoer.pushWindow(m, state.position),
                    cok0 = (function(x3, s, m1) {
                        return cok(x3, s, Memoer.popWindow(m1));
                    }),
                    eok0 = (function(x3, s, m1) {
                        return eok(x3, s, Memoer.popWindow(m1));
                    });
                return new(Tail)(p4.run, state, m0, cok0, peerr, eok0, peerr);
            })))
            .map((function(_) {
                return NIL;
            })), ((p5 = cons(p3, self)), (p5 ? concat(p5, of(NIL)) : concat(NIL, of(null)))));
    }));
}));
(memo = (function(p3) {
    return new(Parser)((function(state, m, cok, cerr, eok, eerr) {
        var position = state["position"],
            key = ({
                id: p3,
                state: state
            }),
            entry = Memoer.lookup(m, position, key);
        if (entry) {
            var type = entry[0],
                x3 = entry[1],
                s = entry[2];
            switch (type) {
                case "cok":
                    return cok(x3, s, m);
                case "ceerr":
                    return cerr(x3, s, m);
                case "eok":
                    return eok(x3, s, m);
                case "eerr":
                    return eerr(x3, s, m);
            }
        }
        var cok0 = (function(x4, pstate, pm) {
            return cok(x4, pstate, Memoer.update(pm, position, key, ["cok", x4, pstate]));
        }),
            cerr0 = (function(x4, pstate, pm) {
                return cerr(x4, pstate, Memoer.update(pm, position, key, ["cerr", x4, pstate]));
            }),
            eok0 = (function(x4, pstate, pm) {
                return eok(x4, pstate, Memoer.update(pm, position, key, ["eok", x4, pstate]));
            }),
            eerr0 = (function(x4, pstate, pm) {
                return eerr(x4, pstate, Memoer.update(pm, position, key, ["eerr", x4, pstate]));
            });
        return new(Tail)(p3.run, state, m, cok0, cerr0, eok0, eerr0);
    }));
}));
var defaultErr = (function(pos, tok) {
    return new(UnexpectError)(pos, ((tok === null) ? "end of input" : tok));
});
(token = (function(consume, onErr) {
    var errorHandler = (onErr || defaultErr);
    return new(Parser)((function(s, m, cok, cerr, eok, eerr) {
        var tok, pcok, p3;
        return (s.isEmpty() ? eerr(errorHandler(s.position, null), s, m) : ((tok = s.first()), (consume(
            tok) ? ((pcok = (function(x3, s0, m0) {
            return cok(x3, s0, Memoer.prune(m0, s0.position));
        })), (p3 = s.next(tok)), new(Tail)(p3.run, s, m, pcok, cerr, pcok, cerr)) : eerr(
            errorHandler(s.position, tok), s, m))));
    }));
}));
var p3 = token((function() {
    return true;
}));
(anyToken = (p3.run.hasOwnProperty("displayName") ? label("Any Token", new(Parser)((function(state, m, cok, cerr, eok,
    eerr) {
    return new(Tail)(p3.run, state, m, cok, cerr, eok, eerr);
}))) : new(Parser)(Object.defineProperty(p3.run, "displayName", ({
    value: "Any Token",
    writable: false
})))));
var p4 = concat(chain(new(Parser)((function(state, m, cok, cerr, eok, eerr) {
    var peerr = (function(x3, s, m0) {
        return eerr(x3, s, Memoer.popWindow(m0));
    }),
        m0 = Memoer.pushWindow(m, state.position),
        cok0 = (function(x3, s, m1) {
            return cok(x3, s, Memoer.popWindow(m1));
        }),
        eok0 = (function(x3, s, m1) {
            return eok(x3, s, Memoer.popWindow(m1));
        });
    return new(Tail)(anyToken.run, state, m0, cok0, peerr, eok0, peerr);
})), (function(x3) {
    return chain(getPosition, (function(z) {
        var x4 = new(UnexpectError)(z, x3);
        return new(Parser)((function(state, m, _, _0, _1, eerr) {
            return eerr(x4, state, m);
        }));
    }));
})), of(null)),
    p5 = new(Parser)((function(state, m, cok, cerr, eok, eerr) {
        var peerr = (function(x3, s, m0) {
            return eerr(x3, s, Memoer.popWindow(m0));
        }),
            m0 = Memoer.pushWindow(m, state.position),
            cok0 = (function(x3, s, m1) {
                return cok(x3, s, Memoer.popWindow(m1));
            }),
            eok0 = (function(x3, s, m1) {
                return eok(x3, s, Memoer.popWindow(m1));
            });
        return new(Tail)(p4.run, state, m0, cok0, peerr, eok0, peerr);
    }));
(eof = (p5.run.hasOwnProperty("displayName") ? label("EOF", new(Parser)((function(state, m, cok, cerr, eok, eerr) {
    return new(Tail)(p5.run, state, m, cok, cerr, eok, eerr);
}))) : new(Parser)(Object.defineProperty(p5.run, "displayName", ({
    value: "EOF",
    writable: false
})))));
(exec = (function() {
    var args0 = arguments;
    return trampoline(unparser.apply(null, args0));
}));
(parseState = (function(p6, state, ok, err0) {
    return exec(p6, state, Memoer.empty, ok, err0, ok, err0);
}));
(parseStream = (function(p6, s, ud, ok, err0) {
    var state = new(ParserState)(s, Position.initial, ud);
    return exec(p6, state, Memoer.empty, ok, err0, ok, err0);
}));
(parse = (function(p6, input, ud, ok, err0) {
    var s = stream.from(input),
        state = new(ParserState)(s, Position.initial, ud);
    return exec(p6, state, Memoer.empty, ok, err0, ok, err0);
}));
var err0 = (function(x3) {
    throw x3;
});
(runState = (function(p6, state) {
    return exec(p6, state, Memoer.empty, identity, err0, identity, err0);
}));
(runStream = (function(p6, s, ud) {
    return runState(p6, new(ParserState)(s, Position.initial, ud));
}));
(run = (function(p6, input, ud) {
    var s = stream.from(input);
    return runState(p6, new(ParserState)(s, Position.initial, ud));
}));
var ok = (function() {
    return true;
}),
    err1 = (function() {
        return false;
    });
(testState = (function(p6, state) {
    return exec(p6, state, Memoer.empty, ok, err1, ok, err1);
}));
(testStream = (function(p6, s, ud) {
    return testState(p6, new(ParserState)(s, Position.initial, ud));
}));
(test = (function(p6, input, ud) {
    var s = stream.from(input);
    return testState(p6, new(ParserState)(s, Position.initial, ud));
}));
(exports["Tail"] = Tail);
(exports["trampoline"] = trampoline);
(exports["ParserError"] = ParserError);
(exports["ParseError"] = ParseError);
(exports["MultipleError"] = MultipleError);
(exports["UnknownError"] = UnknownError);
(exports["UnexpectError"] = UnexpectError);
(exports["ExpectError"] = ExpectError);
(exports["ParserState"] = ParserState);
(exports["Position"] = Position);
(exports["Parser"] = Parser);
(exports["label"] = label);
(exports["late"] = late);
(exports["rec"] = rec);
(exports["unparser"] = unparser);
(exports["always"] = always);
(exports["of"] = of);
(exports["never"] = never);
(exports["bind"] = bind);
(exports["chain"] = chain);
(exports["map"] = map);
(exports["ap"] = ap);
(exports["extract"] = extract);
(exports["getParserState"] = getParserState);
(exports["setParserState"] = setParserState);
(exports["modifyParserState"] = modifyParserState);
(exports["getState"] = getState);
(exports["setState"] = setState);
(exports["modifyState"] = modifyState);
(exports["getInput"] = getInput);
(exports["setInput"] = setInput);
(exports["getPosition"] = getPosition);
(exports["setPosition"] = setPosition);
(exports["fail"] = fail);
(exports["attempt"] = attempt);
(exports["look"] = look);
(exports["lookahead"] = lookahead);
(exports["next"] = next);
(exports["sequences"] = sequences);
(exports["sequencea"] = sequencea);
(exports["sequence"] = sequence);
(exports["empty"] = empty);
(exports["either"] = either);
(exports["concat"] = concat);
(exports["choices"] = choices);
(exports["choicea"] = choicea);
(exports["choice"] = choice);
(exports["optional"] = optional);
(exports["expected"] = expected);
(exports["not"] = not);
(exports["eager"] = eager);
(exports["binds"] = binds);
(exports["cons"] = cons);
(exports["append"] = append);
(exports["enumerations"] = enumerations);
(exports["enumerationa"] = enumerationa);
(exports["enumeration"] = enumeration);
(exports["many"] = many);
(exports["many1"] = many1);
(exports["manyTill"] = manyTill);
(exports["memo"] = memo);
(exports["token"] = token);
(exports["anyToken"] = anyToken);
(exports["eof"] = eof);
(exports["exec"] = exec);
(exports["parseState"] = parseState);
(exports["parseStream"] = parseStream);
(exports["parse"] = parse);
(exports["runState"] = runState);
(exports["runStream"] = runStream);
(exports["run"] = run);
(exports["testState"] = testState);
(exports["testStream"] = testStream);
(exports["test"] = test);

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(14);
var toLength = __webpack_require__(10);
var toAbsoluteIndex = __webpack_require__(48);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(20);
var redefineAll = __webpack_require__(46);
var meta = __webpack_require__(38);
var forOf = __webpack_require__(37);
var anInstance = __webpack_require__(41);
var isObject = __webpack_require__(4);
var fails = __webpack_require__(3);
var $iterDetect = __webpack_require__(73);
var setToStringTag = __webpack_require__(52);
var inheritIfRequired = __webpack_require__(90);

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function (KEY) {
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function (a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance = new C();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    var ACCEPT_ITERABLES = $iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    // weak collections should not contains .clear method
    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var hide = __webpack_require__(17);
var redefine = __webpack_require__(20);
var fails = __webpack_require__(3);
var defined = __webpack_require__(27);
var wks = __webpack_require__(6);

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);
  var fns = exec(defined, SYMBOL, ''[KEY]);
  var strfn = fns[0];
  var rxfn = fns[1];
  if (fails(function () {
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  })) {
    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__(1);
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),
/* 68 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(24);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__(4);
var cof = __webpack_require__(24);
var MATCH = __webpack_require__(6)('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(32);
var descriptor = __webpack_require__(39);
var setToStringTag = __webpack_require__(52);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(17)(IteratorPrototype, __webpack_require__(6)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(44);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(20);
var hide = __webpack_require__(17);
var has = __webpack_require__(16);
var Iterators = __webpack_require__(43);
var $iterCreate = __webpack_require__(71);
var setToStringTag = __webpack_require__(52);
var getPrototypeOf = __webpack_require__(19);
var ITERATOR = __webpack_require__(6)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(6)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Forced replacement prototype accessors methods
module.exports = __webpack_require__(44) || !__webpack_require__(3)(function () {
  var K = Math.random();
  // In FF throws only define methods
  // eslint-disable-next-line no-undef, no-useless-call
  __defineSetter__.call(null, K, function () { /* empty */ });
  delete __webpack_require__(2)[K];
});


/***/ }),
/* 75 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(0);
var aFunction = __webpack_require__(13);
var ctx = __webpack_require__(23);
var forOf = __webpack_require__(37);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(0);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(1);
var aFunction = __webpack_require__(13);
var SPECIES = __webpack_require__(6)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var hide = __webpack_require__(17);
var uid = __webpack_require__(49);
var TYPED = uid('typed_array');
var VIEW = uid('view');
var ABV = !!(global.ArrayBuffer && global.DataView);
var CONSTR = ABV;
var i = 0;
var l = 9;
var Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while (i < l) {
  if (Typed = global[TypedArrayConstructors[i++]]) {
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV: ABV,
  CONSTR: CONSTR,
  TYPED: TYPED,
  VIEW: VIEW
};


/***/ }),
/* 81 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Symbol__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Util__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Seq__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Long__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__String__ = __webpack_require__(35);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "one", function() { return one; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "two", function() { return two; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "zero", function() { return zero; });
/* harmony export (immutable) */ __webpack_exports__["fromInt32"] = fromInt32;
/* harmony export (immutable) */ __webpack_exports__["fromInt64"] = fromInt64;
/* harmony export (immutable) */ __webpack_exports__["nat"] = nat;
/* harmony export (immutable) */ __webpack_exports__["create"] = create;
/* harmony export (immutable) */ __webpack_exports__["posn"] = posn;
/* harmony export (immutable) */ __webpack_exports__["negn"] = negn;
/* harmony export (immutable) */ __webpack_exports__["op_Equality"] = op_Equality;
/* harmony export (immutable) */ __webpack_exports__["op_Inequality"] = op_Inequality;
/* harmony export (immutable) */ __webpack_exports__["op_LessThan"] = op_LessThan;
/* harmony export (immutable) */ __webpack_exports__["op_GreaterThan"] = op_GreaterThan;
/* harmony export (immutable) */ __webpack_exports__["compare"] = compare;
/* harmony export (immutable) */ __webpack_exports__["hash"] = hash;
/* harmony export (immutable) */ __webpack_exports__["op_UnaryNegation"] = op_UnaryNegation;
/* harmony export (immutable) */ __webpack_exports__["scale"] = scale;
/* harmony export (immutable) */ __webpack_exports__["subnn"] = subnn;
/* harmony export (immutable) */ __webpack_exports__["addnn"] = addnn;
/* harmony export (immutable) */ __webpack_exports__["op_Addition"] = op_Addition;
/* harmony export (immutable) */ __webpack_exports__["op_Subtraction"] = op_Subtraction;
/* harmony export (immutable) */ __webpack_exports__["op_Multiply"] = op_Multiply;
/* harmony export (immutable) */ __webpack_exports__["divRem"] = divRem;
/* harmony export (immutable) */ __webpack_exports__["op_Division"] = op_Division;
/* harmony export (immutable) */ __webpack_exports__["op_Modulus"] = op_Modulus;
/* harmony export (immutable) */ __webpack_exports__["op_RightShift"] = op_RightShift;
/* harmony export (immutable) */ __webpack_exports__["op_LeftShift"] = op_LeftShift;
/* harmony export (immutable) */ __webpack_exports__["op_BitwiseAnd"] = op_BitwiseAnd;
/* harmony export (immutable) */ __webpack_exports__["op_BitwiseOr"] = op_BitwiseOr;
/* harmony export (immutable) */ __webpack_exports__["greatestCommonDivisor"] = greatestCommonDivisor;
/* harmony export (immutable) */ __webpack_exports__["abs"] = abs;
/* harmony export (immutable) */ __webpack_exports__["op_LessThanOrEqual"] = op_LessThanOrEqual;
/* harmony export (immutable) */ __webpack_exports__["op_GreaterThanOrEqual"] = op_GreaterThanOrEqual;
/* harmony export (immutable) */ __webpack_exports__["toSByte"] = toSByte;
/* harmony export (immutable) */ __webpack_exports__["toByte"] = toByte;
/* harmony export (immutable) */ __webpack_exports__["toInt16"] = toInt16;
/* harmony export (immutable) */ __webpack_exports__["toUInt16"] = toUInt16;
/* harmony export (immutable) */ __webpack_exports__["toInt32"] = toInt32;
/* harmony export (immutable) */ __webpack_exports__["toUInt32"] = toUInt32;
/* harmony export (immutable) */ __webpack_exports__["toInt64"] = toInt64;
/* harmony export (immutable) */ __webpack_exports__["toUInt64"] = toUInt64;
/* harmony export (immutable) */ __webpack_exports__["toDouble"] = toDouble;
/* harmony export (immutable) */ __webpack_exports__["toSingle"] = toSingle;
/* harmony export (immutable) */ __webpack_exports__["toDecimal"] = toDecimal;
/* harmony export (immutable) */ __webpack_exports__["parse"] = parse;
/* harmony export (immutable) */ __webpack_exports__["factorial"] = factorial;
/* harmony export (immutable) */ __webpack_exports__["op_UnaryPlus"] = op_UnaryPlus;
/* harmony export (immutable) */ __webpack_exports__["pow"] = pow;








var BigInteger = (function () {
    function BigInteger(signInt, v) {
        this.signInt = signInt;
        this.v = v;
    }
    BigInteger.prototype[__WEBPACK_IMPORTED_MODULE_0__Symbol__["default"].reflection] = function () {
        return {
            type: "System.Numerics.BigInteger",
            interfaces: ["FSharpRecord", "System.IComparable"],
            properties: {
                signInt: "number",
                v: __WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["a" /* default */]
            }
        };
    };
    Object.defineProperty(BigInteger.prototype, "Sign", {
        get: function () {
            if (this.IsZero) {
                return 0;
            }
            else {
                return this.signInt;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BigInteger.prototype, "SignInt", {
        get: function () {
            return this.signInt;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BigInteger.prototype, "V", {
        get: function () {
            return this.v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BigInteger.prototype, "IsZero", {
        get: function () {
            if (this.SignInt === 0) {
                return true;
            }
            else {
                return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["b" /* isZero */])(this.V);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BigInteger.prototype, "IsOne", {
        get: function () {
            if (this.SignInt === 1) {
                return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["c" /* isOne */])(this.V);
            }
            else {
                return false;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BigInteger.prototype, "StructuredDisplayString", {
        get: function () {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Util__["toString"])(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BigInteger.prototype, "IsSmall", {
        get: function () {
            if (this.IsZero) {
                return true;
            }
            else {
                return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["d" /* isSmall */])(this.V);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BigInteger.prototype, "IsNegative", {
        get: function () {
            if (this.SignInt === -1) {
                return !this.IsZero;
            }
            else {
                return false;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BigInteger.prototype, "IsPositive", {
        get: function () {
            if (this.SignInt === 1) {
                return !this.IsZero;
            }
            else {
                return false;
            }
        },
        enumerable: true,
        configurable: true
    });
    BigInteger.prototype.CompareTo = function (obj) {
        if (obj instanceof BigInteger) {
            var that = obj;
            return compare(this, that);
        }
        else {
            throw new Error("the objects are not comparable" + '\nParameter name: ' + "obj");
        }
    };
    BigInteger.prototype.ToString = function () {
        var matchValue = this.SignInt;
        var $var19 = null;
        switch (matchValue) {
            case 1:
                {
                    $var19 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["e" /* toString */])(this.V);
                    break;
                }
            case -1:
                {
                    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["b" /* isZero */])(this.V)) {
                        $var19 = "0";
                    }
                    else {
                        $var19 = "-" + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["e" /* toString */])(this.V);
                    }
                    break;
                }
            case 0:
                {
                    $var19 = "0";
                    break;
                }
            default:
                {
                    throw new Error("signs should be +/- 1 or 0");
                }
        }
        return $var19;
    };
    BigInteger.prototype.Equals = function (obj) {
        if (obj instanceof BigInteger) {
            var that = obj;
            return op_Equality(this, that);
        }
        else {
            return false;
        }
    };
    BigInteger.prototype.GetHashCode = function () {
        return hash(this);
    };
    return BigInteger;
}());
/* harmony default export */ __webpack_exports__["default"] = (BigInteger);
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Symbol__["setType"])("System.Numerics.BigInteger", BigInteger);
var smallLim = 4096;
var smallPosTab = Array.from(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__Seq__["initialize"])(smallLim, function (n) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["f" /* ofInt32 */])(n); }));
var one = fromInt32(1);
var two = fromInt32(2);
var zero = fromInt32(0);
function fromInt32(n) {
    if (n >= 0) {
        return new BigInteger(1, nat(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["f" /* ofInt32 */])(n)));
    }
    else if (n === -2147483648) {
        return new BigInteger(-1, nat(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["g" /* ofInt64 */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__Long__["a" /* fromNumber */])(n, false).neg())));
    }
    else {
        return new BigInteger(-1, nat(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["f" /* ofInt32 */])(-n)));
    }
}
function fromInt64(n) {
    if (n.CompareTo(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__Long__["b" /* fromBits */])(0, 0, false)) >= 0) {
        return new BigInteger(1, nat(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["g" /* ofInt64 */])(n)));
    }
    else if (n.Equals(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__Long__["b" /* fromBits */])(0, 2147483648, false))) {
        return new BigInteger(-1, nat(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["h" /* add */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["g" /* ofInt64 */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__Long__["b" /* fromBits */])(4294967295, 2147483647, false)), __WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["i" /* one */])));
    }
    else {
        return new BigInteger(-1, nat(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["g" /* ofInt64 */])(n.neg())));
    }
}
function nat(n) {
    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["d" /* isSmall */])(n) ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["j" /* getSmall */])(n) < smallLim : false) {
        return smallPosTab[__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["j" /* getSmall */])(n)];
    }
    else {
        return n;
    }
}
function create(s, n) {
    return new BigInteger(s, nat(n));
}
function posn(n) {
    return new BigInteger(1, nat(n));
}
function negn(n) {
    return new BigInteger(-1, nat(n));
}
function op_Equality(x, y) {
    var matchValue = [x.SignInt, y.SignInt];
    var _target9 = function () {
        throw new Error("signs should be +/- 1 or 0" + '\nParameter name: ' + "x");
    };
    if (matchValue[0] === -1) {
        if (matchValue[1] === -1) {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["k" /* equal */])(x.V, y.V);
        }
        else if (matchValue[1] === 0) {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["b" /* isZero */])(x.V);
        }
        else if (matchValue[1] === 1) {
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["b" /* isZero */])(x.V)) {
                return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["b" /* isZero */])(y.V);
            }
            else {
                return false;
            }
        }
        else {
            return _target9();
        }
    }
    else if (matchValue[0] === 0) {
        if (matchValue[1] === -1) {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["b" /* isZero */])(y.V);
        }
        else if (matchValue[1] === 0) {
            return true;
        }
        else if (matchValue[1] === 1) {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["b" /* isZero */])(y.V);
        }
        else {
            return _target9();
        }
    }
    else if (matchValue[0] === 1) {
        if (matchValue[1] === -1) {
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["b" /* isZero */])(x.V)) {
                return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["b" /* isZero */])(y.V);
            }
            else {
                return false;
            }
        }
        else if (matchValue[1] === 0) {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["b" /* isZero */])(x.V);
        }
        else if (matchValue[1] === 1) {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["k" /* equal */])(x.V, y.V);
        }
        else {
            return _target9();
        }
    }
    else {
        return _target9();
    }
}
function op_Inequality(x, y) {
    return !op_Equality(x, y);
}
function op_LessThan(x, y) {
    var matchValue = [x.SignInt, y.SignInt];
    var _target9 = function () {
        throw new Error("signs should be +/- 1 or 0" + '\nParameter name: ' + "x");
    };
    if (matchValue[0] === -1) {
        if (matchValue[1] === -1) {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["l" /* lt */])(y.V, x.V);
        }
        else if (matchValue[1] === 0) {
            return !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["b" /* isZero */])(x.V);
        }
        else if (matchValue[1] === 1) {
            if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["b" /* isZero */])(x.V)) {
                return true;
            }
            else {
                return !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["b" /* isZero */])(y.V);
            }
        }
        else {
            return _target9();
        }
    }
    else if (matchValue[0] === 0) {
        if (matchValue[1] === -1) {
            return false;
        }
        else if (matchValue[1] === 0) {
            return false;
        }
        else if (matchValue[1] === 1) {
            return !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["b" /* isZero */])(y.V);
        }
        else {
            return _target9();
        }
    }
    else if (matchValue[0] === 1) {
        if (matchValue[1] === -1) {
            return false;
        }
        else if (matchValue[1] === 0) {
            return false;
        }
        else if (matchValue[1] === 1) {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["l" /* lt */])(x.V, y.V);
        }
        else {
            return _target9();
        }
    }
    else {
        return _target9();
    }
}
function op_GreaterThan(x, y) {
    var matchValue = [x.SignInt, y.SignInt];
    var _target9 = function () {
        throw new Error("signs should be +/- 1 or 0" + '\nParameter name: ' + "x");
    };
    if (matchValue[0] === -1) {
        if (matchValue[1] === -1) {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["m" /* gt */])(y.V, x.V);
        }
        else if (matchValue[1] === 0) {
            return false;
        }
        else if (matchValue[1] === 1) {
            return false;
        }
        else {
            return _target9();
        }
    }
    else if (matchValue[0] === 0) {
        if (matchValue[1] === -1) {
            return !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["b" /* isZero */])(y.V);
        }
        else if (matchValue[1] === 0) {
            return false;
        }
        else if (matchValue[1] === 1) {
            return false;
        }
        else {
            return _target9();
        }
    }
    else if (matchValue[0] === 1) {
        if (matchValue[1] === -1) {
            if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["b" /* isZero */])(x.V)) {
                return true;
            }
            else {
                return !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["b" /* isZero */])(y.V);
            }
        }
        else if (matchValue[1] === 0) {
            return !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["b" /* isZero */])(x.V);
        }
        else if (matchValue[1] === 1) {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["m" /* gt */])(x.V, y.V);
        }
        else {
            return _target9();
        }
    }
    else {
        return _target9();
    }
}
function compare(n, nn) {
    if (op_LessThan(n, nn)) {
        return -1;
    }
    else if (op_Equality(n, nn)) {
        return 0;
    }
    else {
        return 1;
    }
}
function hash(z) {
    if (z.SignInt === 0) {
        return 1;
    }
    else {
        return z.SignInt + hash(z.V);
    }
}
function op_UnaryNegation(z) {
    var matchValue = z.SignInt;
    if (matchValue === 0) {
        return zero;
    }
    else {
        return create(-matchValue, z.V);
    }
}
function scale(k, z) {
    if (z.SignInt === 0) {
        return zero;
    }
    else if (k < 0) {
        return create(-z.SignInt, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["n" /* scale */])(-k, z.V));
    }
    else {
        return create(z.SignInt, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["n" /* scale */])(k, z.V));
    }
}
function subnn(nx, ny) {
    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["o" /* gte */])(nx, ny)) {
        return posn(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["p" /* sub */])(nx, ny));
    }
    else {
        return negn(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["p" /* sub */])(ny, nx));
    }
}
function addnn(nx, ny) {
    return posn(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["h" /* add */])(nx, ny));
}
function op_Addition(x, y) {
    if (y.IsZero) {
        return x;
    }
    else if (x.IsZero) {
        return y;
    }
    else {
        var matchValue = [x.SignInt, y.SignInt];
        var _target4 = function () {
            throw new Error("signs should be +/- 1" + '\nParameter name: ' + "x");
        };
        if (matchValue[0] === -1) {
            if (matchValue[1] === -1) {
                return op_UnaryNegation(addnn(x.V, y.V));
            }
            else if (matchValue[1] === 1) {
                return subnn(y.V, x.V);
            }
            else {
                return _target4();
            }
        }
        else if (matchValue[0] === 1) {
            if (matchValue[1] === -1) {
                return subnn(x.V, y.V);
            }
            else if (matchValue[1] === 1) {
                return addnn(x.V, y.V);
            }
            else {
                return _target4();
            }
        }
        else {
            return _target4();
        }
    }
}
function op_Subtraction(x, y) {
    if (y.IsZero) {
        return x;
    }
    else if (x.IsZero) {
        return op_UnaryNegation(y);
    }
    else {
        var matchValue = [x.SignInt, y.SignInt];
        var _target4 = function () {
            throw new Error("signs should be +/- 1" + '\nParameter name: ' + "x");
        };
        if (matchValue[0] === -1) {
            if (matchValue[1] === -1) {
                return subnn(y.V, x.V);
            }
            else if (matchValue[1] === 1) {
                return op_UnaryNegation(addnn(x.V, y.V));
            }
            else {
                return _target4();
            }
        }
        else if (matchValue[0] === 1) {
            if (matchValue[1] === -1) {
                return addnn(x.V, y.V);
            }
            else if (matchValue[1] === 1) {
                return subnn(x.V, y.V);
            }
            else {
                return _target4();
            }
        }
        else {
            return _target4();
        }
    }
}
function op_Multiply(x, y) {
    if (x.IsZero) {
        return x;
    }
    else if (y.IsZero) {
        return y;
    }
    else if (x.IsOne) {
        return y;
    }
    else if (y.IsOne) {
        return x;
    }
    else {
        var m = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["q" /* mul */])(x.V, y.V);
        return create(x.SignInt * y.SignInt, m);
    }
}
function divRem(x, y) {
    if (y.IsZero) {
        throw new Error();
    }
    if (x.IsZero) {
        return [zero, zero];
    }
    else {
        var patternInput = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["r" /* divmod */])(x.V, y.V);
        var matchValue = [x.SignInt, y.SignInt];
        var _target4 = function () {
            throw new Error("signs should be +/- 1" + '\nParameter name: ' + "x");
        };
        if (matchValue[0] === -1) {
            if (matchValue[1] === -1) {
                return [posn(patternInput[0]), negn(patternInput[1])];
            }
            else if (matchValue[1] === 1) {
                return [negn(patternInput[0]), negn(patternInput[1])];
            }
            else {
                return _target4();
            }
        }
        else if (matchValue[0] === 1) {
            if (matchValue[1] === -1) {
                return [negn(patternInput[0]), posn(patternInput[1])];
            }
            else if (matchValue[1] === 1) {
                return [posn(patternInput[0]), posn(patternInput[1])];
            }
            else {
                return _target4();
            }
        }
        else {
            return _target4();
        }
    }
}
function op_Division(x, y) {
    return divRem(x, y)[0];
}
function op_Modulus(x, y) {
    return divRem(x, y)[1];
}
function op_RightShift(x, y) {
    return op_Division(x, pow(two, y));
}
function op_LeftShift(x, y) {
    return op_Multiply(x, pow(two, y));
}
function op_BitwiseAnd(x, y) {
    return posn(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["s" /* bitAnd */])(x.V, y.V));
}
function op_BitwiseOr(x, y) {
    return posn(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["t" /* bitOr */])(x.V, y.V));
}
function greatestCommonDivisor(x, y) {
    var matchValue = [x.SignInt, y.SignInt];
    if (matchValue[0] === 0) {
        if (matchValue[1] === 0) {
            return zero;
        }
        else {
            return posn(y.V);
        }
    }
    else if (matchValue[1] === 0) {
        return posn(x.V);
    }
    else {
        return posn(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["u" /* hcf */])(x.V, y.V));
    }
}
function abs(x) {
    if (x.SignInt === -1) {
        return op_UnaryNegation(x);
    }
    else {
        return x;
    }
}
function op_LessThanOrEqual(x, y) {
    var matchValue = [x.SignInt, y.SignInt];
    var _target9 = function () {
        throw new Error("signs should be +/- 1 or 0" + '\nParameter name: ' + "x");
    };
    if (matchValue[0] === -1) {
        if (matchValue[1] === -1) {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["v" /* lte */])(y.V, x.V);
        }
        else if (matchValue[1] === 0) {
            return true;
        }
        else if (matchValue[1] === 1) {
            return true;
        }
        else {
            return _target9();
        }
    }
    else if (matchValue[0] === 0) {
        if (matchValue[1] === -1) {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["b" /* isZero */])(y.V);
        }
        else if (matchValue[1] === 0) {
            return true;
        }
        else if (matchValue[1] === 1) {
            return true;
        }
        else {
            return _target9();
        }
    }
    else if (matchValue[0] === 1) {
        if (matchValue[1] === -1) {
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["b" /* isZero */])(x.V)) {
                return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["b" /* isZero */])(y.V);
            }
            else {
                return false;
            }
        }
        else if (matchValue[1] === 0) {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["b" /* isZero */])(x.V);
        }
        else if (matchValue[1] === 1) {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["v" /* lte */])(x.V, y.V);
        }
        else {
            return _target9();
        }
    }
    else {
        return _target9();
    }
}
function op_GreaterThanOrEqual(x, y) {
    var matchValue = [x.SignInt, y.SignInt];
    var _target9 = function () {
        throw new Error("signs should be +/- 1 or 0" + '\nParameter name: ' + "x");
    };
    if (matchValue[0] === -1) {
        if (matchValue[1] === -1) {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["o" /* gte */])(y.V, x.V);
        }
        else if (matchValue[1] === 0) {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["b" /* isZero */])(x.V);
        }
        else if (matchValue[1] === 1) {
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["b" /* isZero */])(x.V)) {
                return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["b" /* isZero */])(y.V);
            }
            else {
                return false;
            }
        }
        else {
            return _target9();
        }
    }
    else if (matchValue[0] === 0) {
        if (matchValue[1] === -1) {
            return true;
        }
        else if (matchValue[1] === 0) {
            return true;
        }
        else if (matchValue[1] === 1) {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["b" /* isZero */])(y.V);
        }
        else {
            return _target9();
        }
    }
    else if (matchValue[0] === 1) {
        if (matchValue[1] === -1) {
            return true;
        }
        else if (matchValue[1] === 0) {
            return true;
        }
        else if (matchValue[1] === 1) {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["o" /* gte */])(x.V, y.V);
        }
        else {
            return _target9();
        }
    }
    else {
        return _target9();
    }
}
function toSByte(x) {
    return (toInt32(x) + 0x80 & 0xFF) - 0x80;
}
function toByte(x) {
    return toUInt32(x) & 0xFF;
}
function toInt16(x) {
    return (toInt32(x) + 0x8000 & 0xFFFF) - 0x8000;
}
function toUInt16(x) {
    return toUInt32(x) & 0xFFFF;
}
function toInt32(x) {
    if (x.IsZero) {
        return 0;
    }
    else {
        var u = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["w" /* toUInt32 */])(x.V);
        if (u <= 2147483647 >>> 0) {
            return x.SignInt * ~~u;
        }
        else if (x.SignInt === -1 ? u === 2147483647 + 1 >>> 0 : false) {
            return -2147483648;
        }
        else {
            throw new Error();
        }
    }
}
function toUInt32(x) {
    if (x.IsZero) {
        return 0;
    }
    else {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["w" /* toUInt32 */])(x.V);
    }
}
function toInt64(x) {
    if (x.IsZero) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__Long__["b" /* fromBits */])(0, 0, false);
    }
    else {
        var u = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["x" /* toUInt64 */])(x.V);
        if (u.CompareTo(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__Long__["b" /* fromBits */])(4294967295, 2147483647, false)) <= 0) {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__Long__["a" /* fromNumber */])(x.SignInt, false).mul(u);
        }
        else if (x.SignInt === -1 ? u.Equals(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__Long__["b" /* fromBits */])(4294967295, 2147483647, false).add(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__Long__["b" /* fromBits */])(1, 0, false))) : false) {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__Long__["b" /* fromBits */])(0, 2147483648, false);
        }
        else {
            throw new Error();
        }
    }
}
function toUInt64(x) {
    if (x.IsZero) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__Long__["b" /* fromBits */])(0, 0, true);
    }
    else {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["x" /* toUInt64 */])(x.V);
    }
}
function toDouble(x) {
    var matchValue = x.SignInt;
    var $var20 = null;
    switch (matchValue) {
        case 1:
            {
                $var20 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["y" /* toFloat */])(x.V);
                break;
            }
        case -1:
            {
                $var20 = -__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["y" /* toFloat */])(x.V);
                break;
            }
        case 0:
            {
                $var20 = 0;
                break;
            }
        default:
            {
                throw new Error("signs should be +/- 1 or 0" + '\nParameter name: ' + "x");
            }
    }
    return $var20;
}
function toSingle(x) {
    return Math.fround(toDouble(x));
}
function toDecimal(x) {
    return toDouble(x);
}
function parse(text) {
    if (text == null) {
        throw new Error("text");
    }
    var text_1 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__String__["trim"])(text, "both");
    var len = text_1.length;
    if (len === 0) {
        throw new Error();
    }
    var matchValue = [text_1[0], len];
    if (matchValue[0] === "+") {
        if (matchValue[1] === 1) {
            throw new Error();
        }
        else {
            return posn(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["z" /* ofString */])(text_1.slice(1, len - 1 + 1)));
        }
    }
    else if (matchValue[0] === "-") {
        if (matchValue[1] === 1) {
            throw new Error();
        }
        else {
            return negn(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["z" /* ofString */])(text_1.slice(1, len - 1 + 1)));
        }
    }
    else {
        return posn(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["z" /* ofString */])(text_1));
    }
}
function factorial(x) {
    if (x.IsNegative) {
        throw new Error("mustBeNonNegative" + '\nParameter name: ' + "x");
    }
    if (x.IsPositive) {
        return posn(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["A" /* factorial */])(x.V));
    }
    else {
        return one;
    }
}
function op_UnaryPlus(n1) {
    return n1;
}
function pow(x, y) {
    if (y < 0) {
        throw new Error("y");
    }
    var matchValue = [x.IsZero, y];
    if (matchValue[0]) {
        if (matchValue[1] === 0) {
            return one;
        }
        else {
            return zero;
        }
    }
    else {
        var yval = fromInt32(y);
        return create(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["b" /* isZero */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["B" /* rem */])(yval.V, __WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["C" /* two */])) ? 1 : x.SignInt, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__BigInt_BigNat__["D" /* pow */])(x.V, yval.V));
    }
}


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/stream.kep'
 * DO NOT EDIT
*/

var end, NIL, stream, memoStream, rec, cons, append, appendz, concat, bind, from, first, rest, isEmpty, isStream,
        reverse, foldl, foldr, reduce, reduceRight, zip, zipWith, indexed, map, filter, forEach, toArray, arrayReduce =
        Function.prototype.call.bind(Array.prototype.reduce),
    memo = (function(f) {
        var value;
        return (function() {
            if ((value === undefined)) {
                (value = f());
            }
            return value;
        });
    });
(end = null);
(NIL = null);
(stream = (function(val, f) {
    return ({
        first: val,
        rest: f
    });
}));
(memoStream = (function(val, f) {
    var f0 = memo(f);
    return ({
        first: val,
        rest: f0
    });
}));
(rec = (function(def) {
    var value = def((function() {
        return value;
    }));
    return value;
}));
(first = (function(x) {
    return x.first;
}));
(rest = (function(s) {
    return s.rest();
}));
(isEmpty = (function(y) {
    return (null === y);
}));
(isStream = (function(s) {
    return (((s && s.hasOwnProperty("first")) && s.hasOwnProperty("rest")) || (null === s));
}));
(cons = (function(val, s) {
    var f = (function() {
        return s;
    });
    return ({
        first: val,
        rest: f
    });
}));
(appendz = (function(s1, f) {
    var val, f0, f1;
    return ((null === s1) ? f() : ((val = s1.first), (f0 = (function() {
        return appendz(s1.rest(), f);
    })), (f1 = memo(f0)), ({
        first: val,
        rest: f1
    })));
}));
var reducer = (function(s1, s2) {
    return appendz(s1, (function() {
        return s2;
    }));
});
(append = (function() {
    var streams = arguments;
    return arrayReduce(streams, reducer, null);
}));
(concat = (function(s) {
    return ((null === s) ? s : appendz(s.first, (function() {
        return concat(s.rest());
    })));
}));
var fromImpl = (function(arr, i, len) {
    var val, f, f0;
    return ((i >= len) ? null : ((val = arr[i]), (f = (function() {
        return fromImpl(arr, (i + 1), len);
    })), (f0 = memo(f)), ({
        first: val,
        rest: f0
    })));
});
(from = (function(arr) {
    var length = arr["length"],
        val, f, f0;
    return ((0 >= length) ? null : ((val = arr[0]), (f = (function() {
        return fromImpl(arr, 1, length);
    })), (f0 = memo(f)), ({
        first: val,
        rest: f0
    })));
}));
(zipWith = (function(f, l1, l2) {
    var val, f0, f1;
    return (((null === l1) || (null === l2)) ? null : ((val = f(l1.first, l2.first)), (f0 = zipWith.bind(null,
        f, l1.rest(), l2.rest())), (f1 = memo(f0)), ({
        first: val,
        rest: f1
    })));
}));
var f = (function(x, y) {
    return [x, y];
});
(zip = (function(l1, l2) {
    var x, y, val, f0, f1;
    return (((null === l1) || (null === l2)) ? null : ((x = l1.first), (y = l2.first), (val = [x, y]), (f0 =
        zipWith.bind(null, f, l1.rest(), l2.rest())), (f1 = memo(f0)), ({
        first: val,
        rest: f1
    })));
}));
var count = (function(n) {
    var f0 = (function() {
        return count((n + 1));
    });
    return ({
        first: n,
        rest: f0
    });
}),
    f0;
(indexed = zip.bind(null, ((f0 = (function() {
    return count(1);
})), ({
    first: 0,
    rest: f0
}))));
(foldl = (function(f1, z, s) {
    var y, s0, r = z;
    for (var head = s;
        (!((y = head), (null === y)));
        (head = ((s0 = head), s0.rest()))) {
        var x;
        (r = f1(r, ((x = head), x.first)));
    }
    return r;
}));
(reverse = foldl.bind(null, (function(x, y) {
    var f1 = (function() {
        return x;
    });
    return ({
        first: y,
        rest: f1
    });
}), null));
(foldr = (function(f1, z, s) {
    return foldl(f1, z, reverse(s));
}));
(reduce = (function(f1, s) {
    return foldl(f1, s.first, s.rest());
}));
(reduceRight = (function(f1, s) {
    return reduce(f1, reverse(s));
}));
(map = (function(f1, s) {
    var val, f2, f3;
    return ((null === s) ? s : ((val = f1(s.first)), (f2 = (function() {
        return map(f1, s.rest());
    })), (f3 = memo(f2)), ({
        first: val,
        rest: f3
    })));
}));
(filter = (function(pred, s) {
    var y, s0;
    for (var head = s;
        (!((y = head), (null === y)));
        (head = ((s0 = head), s0.rest()))) {
        var x = head,
            x0 = x.first;
        if (pred(x0)) {
            var f1 = (function() {
                var s1;
                return filter(pred, ((s1 = head), s1.rest()));
            }),
                f2 = memo(f1);
            return ({
                first: x0,
                rest: f2
            });
        }
    }
    return null;
}));
var y = concat;
(bind = (function() {
    var args = arguments;
    return y(map.apply(null, args));
}));
(forEach = (function(f1, s) {
    var y0, s0, x;
    for (var head = s;
        (!((y0 = head), (null === y0)));
        (head = ((s0 = head), s0.rest()))) f1(((x = head), x.first));
}));
var builder = (function(p, c) {
    p.push(c);
    return p;
});
(toArray = (function(s) {
    return foldl(builder, [], s);
}));
(exports["end"] = end);
(exports["NIL"] = NIL);
(exports["stream"] = stream);
(exports["memoStream"] = memoStream);
(exports["rec"] = rec);
(exports["cons"] = cons);
(exports["append"] = append);
(exports["appendz"] = appendz);
(exports["concat"] = concat);
(exports["bind"] = bind);
(exports["from"] = from);
(exports["first"] = first);
(exports["rest"] = rest);
(exports["isEmpty"] = isEmpty);
(exports["isStream"] = isStream);
(exports["reverse"] = reverse);
(exports["foldl"] = foldl);
(exports["foldr"] = foldr);
(exports["reduce"] = reduce);
(exports["reduceRight"] = reduceRight);
(exports["zip"] = zip);
(exports["zipWith"] = zipWith);
(exports["indexed"] = indexed);
(exports["map"] = map);
(exports["filter"] = filter);
(exports["forEach"] = forEach);
(exports["toArray"] = toArray);

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)

var toObject = __webpack_require__(11);
var toAbsoluteIndex = __webpack_require__(48);
var toLength = __webpack_require__(10);
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var aLen = arguments.length;
  var index = toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
  var end = aLen > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(160);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(8);
var createDesc = __webpack_require__(39);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
var document = __webpack_require__(2).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 87 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__(6)('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(2).document;
module.exports = document && document.documentElement;


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
var setPrototypeOf = __webpack_require__(101).set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(43);
var ITERATOR = __webpack_require__(6)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 92 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 93 */
/***/ (function(module, exports) {

// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x) {
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;


/***/ }),
/* 94 */
/***/ (function(module, exports) {

// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var macrotask = __webpack_require__(107).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(24)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if (Observer) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(13);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(33);
var gOPS = __webpack_require__(75);
var pIE = __webpack_require__(57);
var toObject = __webpack_require__(11);
var IObject = __webpack_require__(56);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(3)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

// all object keys, includes non-enumerable and symbols
var gOPN = __webpack_require__(45);
var gOPS = __webpack_require__(75);
var anObject = __webpack_require__(1);
var Reflect = __webpack_require__(2).Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var path = __webpack_require__(139);
var invoke = __webpack_require__(68);
var aFunction = __webpack_require__(13);
module.exports = function (/* ...pargs */) {
  var fn = aFunction(this);
  var length = arguments.length;
  var pargs = Array(length);
  var i = 0;
  var _ = path._;
  var holder = false;
  while (length > i) if ((pargs[i] = arguments[i++]) === _) holder = true;
  return function (/* ...args */) {
    var that = this;
    var aLen = arguments.length;
    var j = 0;
    var k = 0;
    var args;
    if (!holder && !aLen) return invoke(fn, pargs, that);
    args = pargs.slice();
    if (holder) for (;length > j; j++) if (args[j] === _) args[j] = arguments[k++];
    while (aLen > k) args.push(arguments[k++]);
    return invoke(fn, args, that);
  };
};


/***/ }),
/* 100 */
/***/ (function(module, exports) {

module.exports = function (regExp, replace) {
  var replacer = replace === Object(replace) ? function (part) {
    return replace[part];
  } : replace;
  return function (it) {
    return String(it).replace(regExp, replacer);
  };
};


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(4);
var anObject = __webpack_require__(1);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(23)(Function.call, __webpack_require__(18).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(78)('keys');
var uid = __webpack_require__(49);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(29);
var defined = __webpack_require__(27);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__(70);
var defined = __webpack_require__(27);

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toInteger = __webpack_require__(29);
var defined = __webpack_require__(27);

module.exports = function repeat(count) {
  var str = String(defined(this));
  var res = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
  return res;
};


/***/ }),
/* 106 */
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(23);
var invoke = __webpack_require__(68);
var html = __webpack_require__(89);
var cel = __webpack_require__(86);
var global = __webpack_require__(2);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(24)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var DESCRIPTORS = __webpack_require__(9);
var LIBRARY = __webpack_require__(44);
var $typed = __webpack_require__(80);
var hide = __webpack_require__(17);
var redefineAll = __webpack_require__(46);
var fails = __webpack_require__(3);
var anInstance = __webpack_require__(41);
var toInteger = __webpack_require__(29);
var toLength = __webpack_require__(10);
var toIndex = __webpack_require__(143);
var gOPN = __webpack_require__(45).f;
var dP = __webpack_require__(8).f;
var arrayFill = __webpack_require__(83);
var setToStringTag = __webpack_require__(52);
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length!';
var WRONG_INDEX = 'Wrong index!';
var $ArrayBuffer = global[ARRAY_BUFFER];
var $DataView = global[DATA_VIEW];
var Math = global.Math;
var RangeError = global.RangeError;
// eslint-disable-next-line no-shadow-restricted-names
var Infinity = global.Infinity;
var BaseBuffer = $ArrayBuffer;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;
var BUFFER = 'buffer';
var BYTE_LENGTH = 'byteLength';
var BYTE_OFFSET = 'byteOffset';
var $BUFFER = DESCRIPTORS ? '_b' : BUFFER;
var $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH;
var $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
function packIEEE754(value, mLen, nBytes) {
  var buffer = Array(nBytes);
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var i = 0;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  var e, m, c;
  value = abs(value);
  // eslint-disable-next-line no-self-compare
  if (value != value || value === Infinity) {
    // eslint-disable-next-line no-self-compare
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if (value * (c = pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }
    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
}
function unpackIEEE754(buffer, mLen, nBytes) {
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = eLen - 7;
  var i = nBytes - 1;
  var s = buffer[i--];
  var e = s & 127;
  var m;
  s >>= 7;
  for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
}

function unpackI32(bytes) {
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
}
function packI8(it) {
  return [it & 0xff];
}
function packI16(it) {
  return [it & 0xff, it >> 8 & 0xff];
}
function packI32(it) {
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
}
function packF64(it) {
  return packIEEE754(it, 52, 8);
}
function packF32(it) {
  return packIEEE754(it, 23, 4);
}

function addGetter(C, key, internal) {
  dP(C[PROTOTYPE], key, { get: function () { return this[internal]; } });
}

function get(view, bytes, index, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
}
function set(view, bytes, index, conversion, value, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = conversion(+value);
  for (var i = 0; i < bytes; i++) store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
}

if (!$typed.ABV) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
    var byteLength = toIndex(length);
    this._b = arrayFill.call(Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH];
    var offset = toInteger(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if (!fails(function () {
    $ArrayBuffer(1);
  }) || !fails(function () {
    new $ArrayBuffer(-1); // eslint-disable-line no-new
  }) || fails(function () {
    new $ArrayBuffer(); // eslint-disable-line no-new
    new $ArrayBuffer(1.5); // eslint-disable-line no-new
    new $ArrayBuffer(NaN); // eslint-disable-line no-new
    return $ArrayBuffer.name != ARRAY_BUFFER;
  })) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, $ArrayBuffer);
      return new BaseBuffer(toIndex(length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, BaseBuffer[key]);
    }
    if (!LIBRARY) ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2));
  var $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if (view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(15);
var LIBRARY = __webpack_require__(44);
var wksExt = __webpack_require__(144);
var defineProperty = __webpack_require__(8).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(36);
var step = __webpack_require__(92);
var Iterators = __webpack_require__(43);
var toIObject = __webpack_require__(14);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(72)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 111 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Symbol__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Util__ = __webpack_require__(5);
/* harmony export (immutable) */ __webpack_exports__["choice1Of2"] = choice1Of2;
/* harmony export (immutable) */ __webpack_exports__["choice2Of2"] = choice2Of2;



function choice1Of2(v) {
    return new Choice("Choice1Of2", [v]);
}
function choice2Of2(v) {
    return new Choice("Choice2Of2", [v]);
}
var Choice = (function () {
    function Choice(t, d) {
        this.Case = t;
        this.Fields = d;
    }
    Object.defineProperty(Choice.prototype, "valueIfChoice1", {
        get: function () {
            return this.Case === "Choice1Of2" ? this.Fields[0] : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Choice.prototype, "valueIfChoice2", {
        get: function () {
            return this.Case === "Choice2Of2" ? this.Fields[0] : null;
        },
        enumerable: true,
        configurable: true
    });
    Choice.prototype.Equals = function (other) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Util__["equalsUnions"])(this, other);
    };
    Choice.prototype.CompareTo = function (other) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Util__["compareUnions"])(this, other);
    };
    Choice.prototype[__WEBPACK_IMPORTED_MODULE_0__Symbol__["default"].reflection] = function () {
        return {
            type: "Microsoft.FSharp.Core.FSharpChoice",
            interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"]
        };
    };
    return Choice;
}());
/* harmony default export */ __webpack_exports__["default"] = (Choice);


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.$7C$SimpleValue$7C$Collection$7C$ = exports.EitherOrBoth = exports.AsnElementError = exports.AsnValueError = exports.InvalidElementValue = exports.InvalidHeader = exports.NoData = exports.AsnValue = exports.AsnElement = exports.AsnBoolean = exports.AsnBitString = exports.AsnHeader = exports.Length = exports.LengthOctets = exports.IdentifierOctets = exports.Encoding = exports.AsnClass = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.makeHeader = makeHeader;
exports.left = left;
exports.right = right;
exports.mapLeft = mapLeft;
exports.mapRight = mapRight;
exports.toTuple = toTuple;
exports.makeElement = makeElement;
exports.childElements = childElements;
exports.cataAsn = cataAsn;
exports.foldAsn = foldAsn;
exports.filter = filter;

var _Symbol2 = __webpack_require__(12);

var _Symbol3 = _interopRequireDefault(_Symbol2);

var _Util = __webpack_require__(5);

var _Schema = __webpack_require__(62);

var _BigInt = __webpack_require__(81);

var _BigInt2 = _interopRequireDefault(_BigInt);

var _List = __webpack_require__(22);

var _List2 = _interopRequireDefault(_List);

var _Choice = __webpack_require__(111);

var _Choice2 = _interopRequireDefault(_Choice);

var _Seq = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AsnClass = exports.AsnClass = function () {
  function AsnClass(caseName, fields) {
    _classCallCheck(this, AsnClass);

    this.Case = caseName;
    this.Fields = fields;
  }

  _createClass(AsnClass, [{
    key: _Symbol3.default.reflection,
    value: function () {
      return {
        type: "FsAsn1.Types.AsnClass",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
        cases: {
          Application: [],
          ContextSpecific: [],
          Private: [],
          Universal: []
        }
      };
    }
  }, {
    key: "Equals",
    value: function (other) {
      return (0, _Util.equalsUnions)(this, other);
    }
  }, {
    key: "CompareTo",
    value: function (other) {
      return (0, _Util.compareUnions)(this, other);
    }
  }]);

  return AsnClass;
}();

(0, _Symbol2.setType)("FsAsn1.Types.AsnClass", AsnClass);

var Encoding = exports.Encoding = function () {
  function Encoding(caseName, fields) {
    _classCallCheck(this, Encoding);

    this.Case = caseName;
    this.Fields = fields;
  }

  _createClass(Encoding, [{
    key: _Symbol3.default.reflection,
    value: function () {
      return {
        type: "FsAsn1.Types.Encoding",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
        cases: {
          Constructed: [],
          Primitive: []
        }
      };
    }
  }, {
    key: "Equals",
    value: function (other) {
      return (0, _Util.equalsUnions)(this, other);
    }
  }, {
    key: "CompareTo",
    value: function (other) {
      return (0, _Util.compareUnions)(this, other);
    }
  }]);

  return Encoding;
}();

(0, _Symbol2.setType)("FsAsn1.Types.Encoding", Encoding);

var IdentifierOctets = exports.IdentifierOctets = function () {
  function IdentifierOctets(caseName, fields) {
    _classCallCheck(this, IdentifierOctets);

    this.Case = caseName;
    this.Fields = fields;
  }

  _createClass(IdentifierOctets, [{
    key: _Symbol3.default.reflection,
    value: function () {
      return {
        type: "FsAsn1.Types.IdentifierOctets",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
        cases: {
          HighTagNumberForm: [AsnClass, "number"],
          LowTagNumberForm: [AsnClass, "number"]
        }
      };
    }
  }, {
    key: "Equals",
    value: function (other) {
      return (0, _Util.equalsUnions)(this, other);
    }
  }, {
    key: "CompareTo",
    value: function (other) {
      return (0, _Util.compareUnions)(this, other);
    }
  }]);

  return IdentifierOctets;
}();

(0, _Symbol2.setType)("FsAsn1.Types.IdentifierOctets", IdentifierOctets);

var LengthOctets = exports.LengthOctets = function () {
  function LengthOctets(caseName, fields) {
    _classCallCheck(this, LengthOctets);

    this.Case = caseName;
    this.Fields = fields;
  }

  _createClass(LengthOctets, [{
    key: _Symbol3.default.reflection,
    value: function () {
      return {
        type: "FsAsn1.Types.LengthOctets",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
        cases: {
          LongForm: [(0, _Util.Array)(Uint8Array, true)],
          ShortForm: ["number"]
        }
      };
    }
  }, {
    key: "Equals",
    value: function (other) {
      return (0, _Util.equalsUnions)(this, other);
    }
  }, {
    key: "CompareTo",
    value: function (other) {
      return (0, _Util.compareUnions)(this, other);
    }
  }]);

  return LengthOctets;
}();

(0, _Symbol2.setType)("FsAsn1.Types.LengthOctets", LengthOctets);

var Length = exports.Length = function () {
  function Length(caseName, fields) {
    _classCallCheck(this, Length);

    this.Case = caseName;
    this.Fields = fields;
  }

  _createClass(Length, [{
    key: _Symbol3.default.reflection,
    value: function () {
      return {
        type: "FsAsn1.Types.Length",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
        cases: {
          Definite: ["number", "number"],
          Indefinite: []
        }
      };
    }
  }, {
    key: "Equals",
    value: function (other) {
      return (0, _Util.equalsUnions)(this, other);
    }
  }, {
    key: "CompareTo",
    value: function (other) {
      return (0, _Util.compareUnions)(this, other);
    }
  }]);

  return Length;
}();

(0, _Symbol2.setType)("FsAsn1.Types.Length", Length);

var AsnHeader = exports.AsnHeader = function () {
  function AsnHeader(_class, encoding, tag, length) {
    _classCallCheck(this, AsnHeader);

    this.Class = _class;
    this.Encoding = encoding;
    this.Tag = tag;
    this.Length = length;
  }

  _createClass(AsnHeader, [{
    key: _Symbol3.default.reflection,
    value: function () {
      return {
        type: "FsAsn1.Types.AsnHeader",
        interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
        properties: {
          Class: AsnClass,
          Encoding: Encoding,
          Tag: "number",
          Length: Length
        }
      };
    }
  }, {
    key: "Equals",
    value: function (other) {
      return (0, _Util.equalsRecords)(this, other);
    }
  }, {
    key: "CompareTo",
    value: function (other) {
      return (0, _Util.compareRecords)(this, other);
    }
  }, {
    key: "ElementLength",
    get: function () {
      var patternInput = void 0;

      if (this.Length.Case === "Indefinite") {
        throw new Error("Not supported");
      } else {
        patternInput = [this.Length.Fields[0], this.Length.Fields[1]];
      }

      return 1 + patternInput[1] + patternInput[0];
    }
  }, {
    key: "HeaderLength",
    get: function () {
      var lenOctets = void 0;

      if (this.Length.Case === "Indefinite") {
        throw new Error("Not supported");
      } else {
        lenOctets = this.Length.Fields[1];
      }

      return 1 + lenOctets;
    }
  }]);

  return AsnHeader;
}();

(0, _Symbol2.setType)("FsAsn1.Types.AsnHeader", AsnHeader);

function makeHeader(cls, encoding, tag, length) {
  return new AsnHeader(cls, encoding, tag, length);
}

var AsnBitString = exports.AsnBitString = function () {
  function AsnBitString(numberOfUnusedBits, data) {
    _classCallCheck(this, AsnBitString);

    this.NumberOfUnusedBits = numberOfUnusedBits;
    this.Data = data;
  }

  _createClass(AsnBitString, [{
    key: _Symbol3.default.reflection,
    value: function () {
      return {
        type: "FsAsn1.Types.AsnBitString",
        interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
        properties: {
          NumberOfUnusedBits: "number",
          Data: (0, _Util.Array)(Uint8Array, true)
        }
      };
    }
  }, {
    key: "Equals",
    value: function (other) {
      return (0, _Util.equalsRecords)(this, other);
    }
  }, {
    key: "CompareTo",
    value: function (other) {
      return (0, _Util.compareRecords)(this, other);
    }
  }]);

  return AsnBitString;
}();

(0, _Symbol2.setType)("FsAsn1.Types.AsnBitString", AsnBitString);

var AsnBoolean = exports.AsnBoolean = function () {
  function AsnBoolean(caseName, fields) {
    _classCallCheck(this, AsnBoolean);

    this.Case = caseName;
    this.Fields = fields;
  }

  _createClass(AsnBoolean, [{
    key: _Symbol3.default.reflection,
    value: function () {
      return {
        type: "FsAsn1.Types.AsnBoolean",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
        cases: {
          False: [],
          True: ["number"]
        }
      };
    }
  }, {
    key: "Equals",
    value: function (other) {
      return (0, _Util.equalsUnions)(this, other);
    }
  }, {
    key: "CompareTo",
    value: function (other) {
      return (0, _Util.compareUnions)(this, other);
    }
  }]);

  return AsnBoolean;
}();

(0, _Symbol2.setType)("FsAsn1.Types.AsnBoolean", AsnBoolean);

var AsnElement = exports.AsnElement = function () {
  function AsnElement(header, value, offset, schemaType) {
    _classCallCheck(this, AsnElement);

    this.Header = header;
    this.Value = value;
    this.Offset = offset;
    this.SchemaType = schemaType;
  }

  _createClass(AsnElement, [{
    key: _Symbol3.default.reflection,
    value: function () {
      return {
        type: "FsAsn1.Types.AsnElement",
        interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
        properties: {
          Header: AsnHeader,
          Value: AsnValue,
          Offset: "number",
          SchemaType: (0, _Util.Option)(_Schema.AsnType)
        }
      };
    }
  }, {
    key: "Equals",
    value: function (other) {
      return (0, _Util.equalsRecords)(this, other);
    }
  }, {
    key: "CompareTo",
    value: function (other) {
      return (0, _Util.compareRecords)(this, other);
    }
  }, {
    key: "Range",
    get: function () {
      return [this.Offset, this.Offset + this.Header.ElementLength - 1];
    }
  }, {
    key: "HeaderRange",
    get: function () {
      var lenOctets = void 0;
      var matchValue = this.Header.Length;

      if (matchValue.Case === "Indefinite") {
        throw new Error("Not supported");
      } else {
        lenOctets = matchValue.Fields[1];
      }

      return [this.Offset, this.Offset + this.Header.HeaderLength - 1];
    }
  }]);

  return AsnElement;
}();

(0, _Symbol2.setType)("FsAsn1.Types.AsnElement", AsnElement);

var AsnValue = exports.AsnValue = function () {
  function AsnValue(caseName, fields) {
    _classCallCheck(this, AsnValue);

    this.Case = caseName;
    this.Fields = fields;
  }

  _createClass(AsnValue, [{
    key: _Symbol3.default.reflection,
    value: function () {
      return {
        type: "FsAsn1.Types.AsnValue",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
        cases: {
          BitString: [AsnBitString],
          Boolean: [AsnBoolean],
          ExplicitTag: [AsnElement],
          IA5String: ["string"],
          Integer: [_BigInt2.default],
          Null: [],
          ObjectIdentifier: [(0, _Util.Array)(_BigInt2.default)],
          OctetString: [(0, _Util.Array)(Uint8Array, true)],
          PrintableString: ["string"],
          RelativeObjectIdentifier: [(0, _Util.Array)(_BigInt2.default)],
          Sequence: [(0, _Util.Array)(AsnElement)],
          Set: [(0, _Util.Array)(AsnElement)],
          T61String: ["string"],
          UTCTime: [_Util.Any],
          UTF8String: ["string"],
          Unknown: [(0, _Util.Array)(Uint8Array, true)],
          VisibleString: ["string"]
        }
      };
    }
  }, {
    key: "Equals",
    value: function (other) {
      return (0, _Util.equalsUnions)(this, other);
    }
  }, {
    key: "CompareTo",
    value: function (other) {
      return (0, _Util.compareUnions)(this, other);
    }
  }]);

  return AsnValue;
}();

(0, _Symbol2.setType)("FsAsn1.Types.AsnValue", AsnValue);

var NoData = exports.NoData = function () {
  function NoData(offset) {
    _classCallCheck(this, NoData);

    this.Offset = offset;
  }

  _createClass(NoData, [{
    key: _Symbol3.default.reflection,
    value: function () {
      return {
        type: "FsAsn1.Types.NoData",
        interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
        properties: {
          Offset: "number"
        }
      };
    }
  }, {
    key: "Equals",
    value: function (other) {
      return (0, _Util.equalsRecords)(this, other);
    }
  }, {
    key: "CompareTo",
    value: function (other) {
      return (0, _Util.compareRecords)(this, other);
    }
  }]);

  return NoData;
}();

(0, _Symbol2.setType)("FsAsn1.Types.NoData", NoData);

var InvalidHeader = exports.InvalidHeader = function () {
  function InvalidHeader(offset) {
    _classCallCheck(this, InvalidHeader);

    this.Offset = offset;
  }

  _createClass(InvalidHeader, [{
    key: _Symbol3.default.reflection,
    value: function () {
      return {
        type: "FsAsn1.Types.InvalidHeader",
        interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
        properties: {
          Offset: "number"
        }
      };
    }
  }, {
    key: "Equals",
    value: function (other) {
      return (0, _Util.equalsRecords)(this, other);
    }
  }, {
    key: "CompareTo",
    value: function (other) {
      return (0, _Util.compareRecords)(this, other);
    }
  }]);

  return InvalidHeader;
}();

(0, _Symbol2.setType)("FsAsn1.Types.InvalidHeader", InvalidHeader);

var InvalidElementValue = exports.InvalidElementValue = function () {
  function InvalidElementValue(offset, realLength, header, schemaType, value) {
    _classCallCheck(this, InvalidElementValue);

    this.Offset = offset;
    this.RealLength = realLength;
    this.Header = header;
    this.SchemaType = schemaType;
    this.Value = value;
  }

  _createClass(InvalidElementValue, [{
    key: _Symbol3.default.reflection,
    value: function () {
      return {
        type: "FsAsn1.Types.InvalidElementValue",
        interfaces: ["FSharpRecord", "System.IEquatable"],
        properties: {
          Offset: "number",
          RealLength: "number",
          Header: AsnHeader,
          SchemaType: (0, _Util.Option)(_Schema.AsnType),
          Value: AsnValueError
        }
      };
    }
  }, {
    key: "Equals",
    value: function (other) {
      return (0, _Util.equalsRecords)(this, other);
    }
  }, {
    key: "RealRange",
    get: function () {
      return [this.Offset, this.Offset + this.Header.HeaderLength + this.RealLength - 1];
    }
  }, {
    key: "HeaderRange",
    get: function () {
      return [this.Offset, this.Offset + this.Header.HeaderLength - 1];
    }
  }]);

  return InvalidElementValue;
}();

(0, _Symbol2.setType)("FsAsn1.Types.InvalidElementValue", InvalidElementValue);

var AsnValueError = exports.AsnValueError = function () {
  function AsnValueError(exception, childrenErrors) {
    _classCallCheck(this, AsnValueError);

    this.Exception = exception;
    this.ChildrenErrors = childrenErrors;
  }

  _createClass(AsnValueError, [{
    key: _Symbol3.default.reflection,
    value: function () {
      return {
        type: "FsAsn1.Types.AsnValueError",
        interfaces: ["FSharpRecord", "System.IEquatable"],
        properties: {
          Exception: (0, _Util.Option)(Error),
          ChildrenErrors: (0, _Util.makeGeneric)(_List2.default, {
            T: AsnElementError
          })
        }
      };
    }
  }, {
    key: "Equals",
    value: function (other) {
      return (0, _Util.equalsRecords)(this, other);
    }
  }]);

  return AsnValueError;
}();

(0, _Symbol2.setType)("FsAsn1.Types.AsnValueError", AsnValueError);

var AsnElementError = exports.AsnElementError = function () {
  function AsnElementError(caseName, fields) {
    _classCallCheck(this, AsnElementError);

    this.Case = caseName;
    this.Fields = fields;
  }

  _createClass(AsnElementError, [{
    key: _Symbol3.default.reflection,
    value: function () {
      return {
        type: "FsAsn1.Types.AsnElementError",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: {
          InvalidHeader: [InvalidHeader],
          InvalidValue: [InvalidElementValue],
          NoData: [NoData]
        }
      };
    }
  }, {
    key: "Equals",
    value: function (other) {
      return (0, _Util.equalsUnions)(this, other);
    }
  }]);

  return AsnElementError;
}();

(0, _Symbol2.setType)("FsAsn1.Types.AsnElementError", AsnElementError);

var EitherOrBoth = exports.EitherOrBoth = function () {
  function EitherOrBoth(caseName, fields) {
    _classCallCheck(this, EitherOrBoth);

    this.Case = caseName;
    this.Fields = fields;
  }

  _createClass(EitherOrBoth, [{
    key: _Symbol3.default.reflection,
    value: function () {
      return {
        type: "FsAsn1.Types.EitherOrBoth",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
        cases: {
          Both: [(0, _Util.GenericParam)("a"), (0, _Util.GenericParam)("b")],
          Left: [(0, _Util.GenericParam)("a")],
          Right: [(0, _Util.GenericParam)("b")]
        }
      };
    }
  }, {
    key: "Equals",
    value: function (other) {
      return (0, _Util.equalsUnions)(this, other);
    }
  }, {
    key: "CompareTo",
    value: function (other) {
      return (0, _Util.compareUnions)(this, other);
    }
  }]);

  return EitherOrBoth;
}();

(0, _Symbol2.setType)("FsAsn1.Types.EitherOrBoth", EitherOrBoth);

function left(x) {
  if (x.Case === "Right") {
    return null;
  } else if (x.Case === "Both") {
    return x.Fields[0];
  } else {
    return x.Fields[0];
  }
}

function right(x) {
  if (x.Case === "Right") {
    return x.Fields[0];
  } else if (x.Case === "Both") {
    return x.Fields[1];
  } else {
    return null;
  }
}

function mapLeft(f, x) {
  if (x.Case === "Right") {
    return new EitherOrBoth("Right", [x.Fields[0]]);
  } else if (x.Case === "Both") {
    return new EitherOrBoth("Both", [f(x.Fields[0]), x.Fields[1]]);
  } else {
    return new EitherOrBoth("Left", [f(x.Fields[0])]);
  }
}

function mapRight(f, x) {
  if (x.Case === "Right") {
    return new EitherOrBoth("Right", [f(x.Fields[0])]);
  } else if (x.Case === "Both") {
    return new EitherOrBoth("Both", [x.Fields[0], f(x.Fields[1])]);
  } else {
    return new EitherOrBoth("Left", [x.Fields[0]]);
  }
}

function toTuple(x) {
  return [left(x), right(x)];
}

function makeElement(header, value, offset, schemaType) {
  return new AsnElement(header, value, offset, schemaType);
}

function _SimpleValue_Collection_(value) {
  var $var1 = value.Case === "Integer" ? [0] : value.Case === "ObjectIdentifier" ? [0] : value.Case === "OctetString" ? [0] : value.Case === "PrintableString" ? [0] : value.Case === "UTF8String" ? [0] : value.Case === "T61String" ? [0] : value.Case === "Unknown" ? [0] : value.Case === "BitString" ? [0] : value.Case === "UTCTime" ? [0] : value.Case === "Boolean" ? [0] : value.Case === "RelativeObjectIdentifier" ? [0] : value.Case === "VisibleString" ? [0] : value.Case === "IA5String" ? [0] : value.Case === "Sequence" ? [1, value.Fields[0]] : value.Case === "Set" ? [1, value.Fields[0]] : value.Case === "ExplicitTag" ? [2] : [0];

  switch ($var1[0]) {
    case 0:
      return new _Choice2.default("Choice1Of2", [null]);

    case 1:
      return new _Choice2.default("Choice2Of2", [$var1[1]]);

    case 2:
      return new _Choice2.default("Choice2Of2", [[value.Fields[0]]]);
  }
}

exports.$7C$SimpleValue$7C$Collection$7C$ = _SimpleValue_Collection_;

function childElements(value) {
  var activePatternResult625 = _SimpleValue_Collection_(value);

  if (activePatternResult625.Case === "Choice2Of2") {
    return activePatternResult625.Fields[0];
  } else {
    return [];
  }
}

function cataAsn(fSimple, fCollection, asnElement) {
  var recurse = function recurse(asnElement_1) {
    return cataAsn(fSimple, fCollection, asnElement_1);
  };

  var activePatternResult627 = _SimpleValue_Collection_(asnElement.Value);

  if (activePatternResult627.Case === "Choice2Of2") {
    return fCollection(asnElement)(function (array) {
      return array.map(recurse);
    }(activePatternResult627.Fields[0]));
  } else {
    return fSimple(asnElement);
  }
}

function foldAsn(fSimple, fCollection, acc, asnElement) {
  var recurse = function recurse(acc_1) {
    return function (asnElement_1) {
      return foldAsn(fSimple, fCollection, acc_1, asnElement_1);
    };
  };

  var activePatternResult632 = _SimpleValue_Collection_(asnElement.Value);

  if (activePatternResult632.Case === "Choice2Of2") {
    var acc_2 = fCollection(acc)(asnElement);
    return function (array) {
      return (0, _Seq.fold)(function ($var2, $var3) {
        return recurse($var2)($var3);
      }, acc_2, array);
    }(activePatternResult632.Fields[0]);
  } else {
    return fSimple(acc)(asnElement);
  }
}

function filter(predicate, el) {
  var fSimple = function fSimple(el_1) {
    if (predicate(el_1)) {
      return (0, _List.ofArray)([el_1]);
    } else {
      return new _List2.default();
    }
  };

  var fCollection = function fCollection(el_2) {
    return function (children) {
      var result = (0, _List.concat)(children);

      if (predicate(el_2)) {
        return new _List2.default(el_2, result);
      } else {
        return result;
      }
    };
  };

  return cataAsn(fSimple, function (arg00) {
    var clo1 = fCollection(arg00);
    return function (arg10) {
      return clo1(arg10);
    };
  }, el);
}

/***/ }),
/* 113 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AsyncBuilder__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Choice__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Seq__ = __webpack_require__(7);
/* harmony export (immutable) */ __webpack_exports__["awaitPromise"] = awaitPromise;
/* harmony export (immutable) */ __webpack_exports__["cancellationToken"] = cancellationToken;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultCancellationToken", function() { return defaultCancellationToken; });
/* harmony export (immutable) */ __webpack_exports__["catchAsync"] = catchAsync;
/* harmony export (immutable) */ __webpack_exports__["fromContinuations"] = fromContinuations;
/* harmony export (immutable) */ __webpack_exports__["ignore"] = ignore;
/* harmony export (immutable) */ __webpack_exports__["parallel"] = parallel;
/* harmony export (immutable) */ __webpack_exports__["sleep"] = sleep;
/* harmony export (immutable) */ __webpack_exports__["start"] = start;
/* harmony export (immutable) */ __webpack_exports__["startImmediate"] = startImmediate;
/* harmony export (immutable) */ __webpack_exports__["startWithContinuations"] = startWithContinuations;
/* harmony export (immutable) */ __webpack_exports__["startAsPromise"] = startAsPromise;







var Async = (function () {
    function Async() {
    }
    return Async;
}());
/* harmony default export */ __webpack_exports__["default"] = (Async);
function emptyContinuation(x) {
}
function awaitPromise(p) {
    return fromContinuations(function (conts) {
        return p.then(conts[0]).catch(function (err) {
            return (err == "cancelled" ? conts[2] : conts[1])(err);
        });
    });
}
function cancellationToken() {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__AsyncBuilder__["protectedCont"])(function (ctx) { return ctx.onSuccess(ctx.cancelToken); });
}
var defaultCancellationToken = { isCancelled: false };
function catchAsync(work) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__AsyncBuilder__["protectedCont"])(function (ctx) {
        work({
            onSuccess: function (x) { return ctx.onSuccess(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Choice__["choice1Of2"])(x)); },
            onError: function (ex) { return ctx.onSuccess(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Choice__["choice2Of2"])(ex)); },
            onCancel: ctx.onCancel,
            cancelToken: ctx.cancelToken,
            trampoline: ctx.trampoline
        });
    });
}
function fromContinuations(f) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__AsyncBuilder__["protectedCont"])(function (ctx) { return f([ctx.onSuccess, ctx.onError, ctx.onCancel]); });
}
function ignore(computation) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__AsyncBuilder__["protectedBind"])(computation, function (x) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__AsyncBuilder__["protectedReturn"])(void 0); });
}
function parallel(computations) {
    return awaitPromise(Promise.all(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Seq__["map"])(function (w) { return startAsPromise(w); }, computations)));
}
function sleep(millisecondsDueTime) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__AsyncBuilder__["protectedCont"])(function (ctx) {
        setTimeout(function () { return ctx.cancelToken.isCancelled ? ctx.onCancel("cancelled") : ctx.onSuccess(void 0); }, millisecondsDueTime);
    });
}
function start(computation, cancellationToken) {
    return startWithContinuations(computation, cancellationToken);
}
function startImmediate(computation, cancellationToken) {
    return start(computation, cancellationToken);
}
function startWithContinuations(computation, continuation, exceptionContinuation, cancellationContinuation, cancelToken) {
    if (typeof continuation !== "function") {
        cancelToken = continuation;
        continuation = null;
    }
    var trampoline = new __WEBPACK_IMPORTED_MODULE_0__AsyncBuilder__["Trampoline"]();
    computation({
        onSuccess: continuation ? continuation : emptyContinuation,
        onError: exceptionContinuation ? exceptionContinuation : emptyContinuation,
        onCancel: cancellationContinuation ? cancellationContinuation : emptyContinuation,
        cancelToken: cancelToken ? cancelToken : defaultCancellationToken,
        trampoline: trampoline
    });
}
function startAsPromise(computation, cancellationToken) {
    return new Promise(function (resolve, reject) {
        return startWithContinuations(computation, resolve, reject, reject, cancellationToken ? cancellationToken : defaultCancellationToken);
    });
}


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ElementType = exports.TypeTag = exports.$7C$Kind$7C$_$7C$ = exports.isValidPrintableString = exports.printableCharSet = exports.AsnContext = exports.AsnBoundedStream = exports.AsnArrayStream = exports.AsnElementException = exports.EndOfAsnStreamException = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.createBoundedStream = createBoundedStream;
exports.decodeAsnClass = decodeAsnClass;
exports.readLength = readLength;
exports.readTagNumber = readTagNumber;
exports.readHeader = readHeader;
exports.decodeInteger = decodeInteger;
exports.readRelativeOid = readRelativeOid;
exports.readOid = readOid;
exports.decodeUTCTime = decodeUTCTime;
exports.isValidPrintableChar = isValidPrintableChar;
exports.toAsnClass = toAsnClass;
exports.toTagClass = toTagClass;
exports.toExpectedTag = toExpectedTag;
exports.matchChoiceComponent = matchChoiceComponent;
exports.oidValueNameToTypeName = oidValueNameToTypeName;
exports.matchAnyTypeDefinedBy = matchAnyTypeDefinedBy;
exports.tryInterpretAsDifferentType = tryInterpretAsDifferentType;
exports.matchSequenceComponentType = matchSequenceComponentType;
exports.readCollection = readCollection;
exports.readValueUniversal = readValueUniversal;
exports.readValue = readValue;
exports.readElement = readElement;
exports.nameOfType = nameOfType;
exports.componentName = componentName;
exports.readElementFromArray = readElementFromArray;

var _Symbol2 = __webpack_require__(12);

var _Symbol3 = _interopRequireDefault(_Symbol2);

var _Util = __webpack_require__(5);

var _List = __webpack_require__(22);

var _List2 = _interopRequireDefault(_List);

var _Schema = __webpack_require__(62);

var _Seq = __webpack_require__(7);

var _Map = __webpack_require__(51);

var _String = __webpack_require__(35);

var _Types = __webpack_require__(112);

var _BigInt = __webpack_require__(81);

var _TimeSpan = __webpack_require__(151);

var _Date = __webpack_require__(40);

var _Set = __webpack_require__(372);

var _GenericComparer = __webpack_require__(50);

var _GenericComparer2 = _interopRequireDefault(_GenericComparer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EndOfAsnStreamException = exports.EndOfAsnStreamException = function (_Error) {
  _inherits(EndOfAsnStreamException, _Error);

  function EndOfAsnStreamException() {
    var _ret;

    _classCallCheck(this, EndOfAsnStreamException);

    var _this2 = _possibleConstructorReturn(this, (EndOfAsnStreamException.__proto__ || Object.getPrototypeOf(EndOfAsnStreamException)).call(this));

    return _ret = Object.setPrototypeOf(_this2, EndOfAsnStreamException.prototype), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(EndOfAsnStreamException, [{
    key: _Symbol3.default.reflection,
    value: function () {
      return {
        type: "FsAsn1.Reader.EndOfAsnStreamException",
        interfaces: ["FSharpRecord"],
        properties: {}
      };
    }
  }]);

  return EndOfAsnStreamException;
}(Error);

(0, _Symbol2.setType)("FsAsn1.Reader.EndOfAsnStreamException", EndOfAsnStreamException);

var AsnElementException = exports.AsnElementException = function (_Error2) {
  _inherits(AsnElementException, _Error2);

  function AsnElementException(data0) {
    _classCallCheck(this, AsnElementException);

    var _this3 = _possibleConstructorReturn(this, (AsnElementException.__proto__ || Object.getPrototypeOf(AsnElementException)).call(this));

    Object.setPrototypeOf(_this3, AsnElementException.prototype);
    _this3.Data0 = data0;
    return _this3;
  }

  _createClass(AsnElementException, [{
    key: _Symbol3.default.reflection,
    value: function () {
      return {
        type: "FsAsn1.Reader.AsnElementException",
        interfaces: ["FSharpRecord"],
        properties: {
          Data0: "string"
        }
      };
    }
  }]);

  return AsnElementException;
}(Error);

(0, _Symbol2.setType)("FsAsn1.Reader.AsnElementException", AsnElementException);

var AsnArrayStream = exports.AsnArrayStream = function () {
  _createClass(AsnArrayStream, [{
    key: _Symbol3.default.reflection,
    value: function () {
      return {
        type: "FsAsn1.Reader.AsnArrayStream",
        interfaces: ["FsAsn1.Reader.IAsnStream"],
        properties: {}
      };
    }
  }]);

  function AsnArrayStream(arr, pos) {
    _classCallCheck(this, AsnArrayStream);

    this.arr = arr;
    this.pos = pos;
    this.position = this.pos;
  }

  _createClass(AsnArrayStream, [{
    key: "CanRead",
    value: function (len) {
      return this.pos + len <= this.arr.length;
    }
  }, {
    key: "ReadByte",
    value: function () {
      if (this.position + 1 > this.arr.length) {
        throw new EndOfAsnStreamException();
      } else {
        var b = this.arr[this.position];
        this.position = this.position + 1;
        return b;
      }
    }
  }, {
    key: "ReadBytes",
    value: function (len) {
      if (this.position + len > this.arr.length) {
        this.position = this.arr.length;
        throw new EndOfAsnStreamException();
      } else {
        var bs = this.arr.slice(this.position, this.position + len - 1 + 1);
        this.position = this.position + len;
        return bs;
      }
    }
  }, {
    key: "Position",
    get: function () {
      return this.position;
    }
  }]);

  return AsnArrayStream;
}();

(0, _Symbol2.setType)("FsAsn1.Reader.AsnArrayStream", AsnArrayStream);

var AsnBoundedStream = exports.AsnBoundedStream = function () {
  _createClass(AsnBoundedStream, [{
    key: _Symbol3.default.reflection,
    value: function () {
      return {
        type: "FsAsn1.Reader.AsnBoundedStream",
        interfaces: ["FsAsn1.Reader.IAsnStream"],
        properties: {}
      };
    }
  }]);

  function AsnBoundedStream(stream, limit) {
    _classCallCheck(this, AsnBoundedStream);

    this.this = {
      contents: null
    };
    var _this = this.this;
    ({});
    this.stream = stream;
    this.limit = limit;
    this.this.contents = this;
    this["init@44"] = 1;
  }

  _createClass(AsnBoundedStream, [{
    key: "CanRead_0",
    value: function (len) {
      return this.stream.Position + len <= this.limit;
    }
  }, {
    key: "CanRead",
    value: function (len) {
      return this.this.contents.CanRead_0(len);
    }
  }, {
    key: "ReadBytes",
    value: function (len) {
      if (this.this.contents.CanRead_0(len)) {
        return this.stream.ReadBytes(len);
      } else {
        this.stream.ReadBytes(this.limit - this.stream.Position);
        throw new EndOfAsnStreamException();
      }
    }
  }, {
    key: "ReadByte",
    value: function () {
      if (this.this.contents.CanRead_0(1)) {
        return this.stream.ReadByte();
      } else {
        throw new EndOfAsnStreamException();
      }
    }
  }, {
    key: "Position",
    get: function () {
      return this.stream.Position;
    }
  }]);

  return AsnBoundedStream;
}();

(0, _Symbol2.setType)("FsAsn1.Reader.AsnBoundedStream", AsnBoundedStream);

function createBoundedStream(stream, expectedBytes) {
  return new AsnBoundedStream(stream, stream.Position + expectedBytes);
}

var AsnContext = exports.AsnContext = function () {
  _createClass(AsnContext, [{
    key: _Symbol3.default.reflection,
    value: function () {
      return {
        type: "FsAsn1.Reader.AsnContext",
        properties: {
          Empty: AsnContext,
          Modules: (0, _Util.makeGeneric)(_List2.default, {
            T: _Schema.ModuleDefinition
          }),
          Stream: (0, _Util.Interface)("FsAsn1.Reader.IAsnStream")
        }
      };
    }
  }]);

  function AsnContext(stream, modules) {
    _classCallCheck(this, AsnContext);

    this.stream = stream;
    this.modules = modules;
  }

  _createClass(AsnContext, [{
    key: "LookupType",
    value: function (name) {
      return (0, _Util.defaultArg)((0, _Seq.tryPick)(function (md) {
        return (0, _Map.tryFind)(name, md.TypeAssignments);
      }, this.modules), null, function (ta) {
        return ta.Type;
      });
    }
  }, {
    key: "ResolveType",
    value: function (_ResolveType) {
      function ResolveType(_x) {
        return _ResolveType.apply(this, arguments);
      }

      ResolveType.toString = function () {
        return _ResolveType.toString();
      };

      return ResolveType;
    }(function (ty) {
      ResolveType: while (true) {
        if (ty.Kind.Case === "ReferencedType") {
          var matchValue = this.LookupType(ty.Kind.Fields[0]);

          if (matchValue != null) {
            ty = matchValue;
            continue ResolveType;
          } else {
            return ty;
          }
        } else {
          return ty;
        }
      }
    })
  }, {
    key: "LookupValue",
    value: function (name) {
      return (0, _Util.defaultArg)((0, _Seq.tryPick)(function (md) {
        return (0, _Map.tryFind)(name, md.ValueAssignments);
      }, this.modules), null, function (ta) {
        return ta.Value;
      });
    }
  }, {
    key: "LookupValueByOid",
    value: function (oid) {
      var _this4 = this;

      var resolveOidComponent = function resolveOidComponent(_arg1) {
        if (_arg1[1] == null) {
          if (_arg1[0] != null) {
            var name = _arg1[0];

            var matchValue = _this4.LookupValue(name);

            if (matchValue == null) {
              return (0, _String.fsFormat)("Cannot find OID value for '%s'")(function (x) {
                throw new Error(x);
              })(name);
            } else if (matchValue.Case === "OidValue") {
              return resolveOid(matchValue.Fields[0]);
            } else {
              return (0, _String.fsFormat)("Unexpected type for value '%s'")(function (x) {
                throw new Error(x);
              })(name);
            }
          } else {
            return (0, _String.fsFormat)("TODO")(function (x) {
              throw new Error(x);
            });
          }
        } else {
          var num = _arg1[1];
          return (0, _List.ofArray)([num]);
        }
      };

      var resolveOid = function resolveOid(oid_1) {
        return function (list) {
          return (0, _List.collect)(resolveOidComponent, list);
        }(oid_1);
      };

      var isValueAssignment = function isValueAssignment(oid_2) {
        return function (v) {
          var $var4 = v.Type.Kind.Case === "ObjectIdentifierType" ? v.Value.Case === "OidValue" ? [0] : [1] : [1];

          switch ($var4[0]) {
            case 0:
              var oidValue = v.Value.Fields[0];
              return (0, _Util.equals)(oid_2, Array.from(resolveOid(oidValue)));

            case 1:
              return false;
          }
        };
      };

      var matchingAssignments = (0, _Seq.toList)((0, _Seq.where)(isValueAssignment(oid), (0, _Seq.map)(function (tuple) {
        return tuple[1];
      }, (0, _Seq.collect)(function (table) {
        return table;
      }, (0, _Seq.map)(function (m) {
        return m.ValueAssignments;
      }, this.Modules)))));

      if (matchingAssignments.tail == null) {
        return null;
      } else if (matchingAssignments.tail.tail == null) {
        return matchingAssignments.head;
      } else {
        return (0, _String.fsFormat)("More than one value definition for OID %A")(function (x) {
          throw new Error(x);
        })(oid);
      }
    }
  }, {
    key: "WithBoundedStream",
    value: function (expectedBytes) {
      return new AsnContext(createBoundedStream(this.stream, expectedBytes), this.modules);
    }
  }, {
    key: "Stream",
    get: function () {
      return this.stream;
    }
  }, {
    key: "Modules",
    get: function () {
      return this.modules;
    }
  }], [{
    key: "FromArray",
    value: function (arr, modules) {
      return new AsnContext(new AsnArrayStream(arr, 0), modules);
    }
  }, {
    key: "Empty",
    get: function () {
      return new AsnContext(new AsnArrayStream(new Uint8Array([]), 0), new _List2.default());
    }
  }]);

  return AsnContext;
}();

(0, _Symbol2.setType)("FsAsn1.Reader.AsnContext", AsnContext);

function decodeAsnClass(b) {
  switch (b) {
    case 0:
      return new _Types.AsnClass("Universal", []);

    case 1:
      return new _Types.AsnClass("Application", []);

    case 2:
      return new _Types.AsnClass("ContextSpecific", []);

    case 3:
      return new _Types.AsnClass("Private", []);

    default:
      throw new Error("Incorrect value");
  }
}

function readLength(stream) {
  var firstLengthOctet = ~~stream.ReadByte();
  var value = firstLengthOctet & 127;
  var isShortForm = firstLengthOctet >> 7 === 0;

  if (isShortForm) {
    return new _Types.Length("Definite", [value, 1]);
  } else {
    return function (x) {
      return new _Types.Length("Definite", [x, value + 1]);
    }((0, _Seq.fold)(function (sum, b) {
      return sum * 256 + ~~b;
    }, 0, stream.ReadBytes(value)));
  }
}

function readTagNumber(tagByte, stream) {
  var tagNumber = tagByte & 31;
  var isShortForm = tagNumber < 31;

  if (isShortForm) {
    return tagNumber;
  } else {
    var readByte = function readByte(acc) {
      readByte: while (true) {
        var b = ~~stream.ReadByte();
        var value = b & 127;
        var isEnd = value === b;
        var newAcc = acc * 128 + value;

        if (isEnd) {
          return newAcc;
        } else {
          acc = newAcc;
          continue readByte;
        }
      }
    };

    return readByte(0);
  }
}

function readHeader(stream) {
  var b = ~~stream.ReadByte();
  var cls = decodeAsnClass(b >> 6);
  var encoding = (b >> 5 & 1) === 0 ? new _Types.Encoding("Primitive", []) : new _Types.Encoding("Constructed", []);
  var tagNumber = readTagNumber(b, stream);
  var length = readLength(stream);
  return (0, _Types.makeHeader)(cls, encoding, tagNumber, length);
}

function decodeInteger(bytes) {
  var firstByte = ~~bytes[0];
  var initialValue = (firstByte & 127) + (firstByte & 128) * -1;
  return (0, _Seq.fold)(function (sum, b) {
    return (0, _BigInt.op_Addition)((0, _BigInt.op_Multiply)(sum, (0, _BigInt.fromInt32)(256)), (0, _BigInt.fromInt32)(~~b));
  }, (0, _BigInt.fromInt32)(initialValue), (0, _Seq.skip)(1, bytes));
}

function readRelativeOid(stream, _length) {
  var readNextValue = function readNextValue(valuesAcc) {
    return function (valueAcc) {
      readNextValue: while (true) {
        if (stream.CanRead(1)) {
          var b = stream.ReadByte();
          var value = (0, _BigInt.op_Addition)((0, _BigInt.op_Multiply)(valueAcc, (0, _BigInt.fromInt32)(128)), (0, _BigInt.fromInt32)(~~(b & 127)));

          if ((b & 128) > 0) {
            valuesAcc = valuesAcc;
            valueAcc = value;
            continue readNextValue;
          } else {
            valuesAcc = new _List2.default(value, valuesAcc);
            valueAcc = _BigInt.zero;
            continue readNextValue;
          }
        } else {
          return Array.from(valuesAcc).slice().reverse();
        }
      }
    };
  };

  return readNextValue(new _List2.default())(_BigInt.zero);
}

function readOid(stream, length) {
  var subidentifiers = readRelativeOid(stream, length);
  var first = subidentifiers[0];
  var patternInput = first.CompareTo((0, _BigInt.fromInt32)(40)) < 0 ? [_BigInt.zero, first] : first.CompareTo((0, _BigInt.fromInt32)(80)) < 0 ? [_BigInt.one, (0, _BigInt.op_Subtraction)(first, (0, _BigInt.fromInt32)(40))] : [(0, _BigInt.fromInt32)(2), (0, _BigInt.op_Subtraction)(first, (0, _BigInt.fromInt32)(80))];
  return Array.from((0, _Seq.concat)((0, _List.ofArray)([[patternInput[0], patternInput[1]], subidentifiers.slice(1)])));
}

function decodeUTCTime(str) {
  var read2Digits = function read2Digits(str_1) {
    return function (index) {
      var v = Number.parseInt(str_1.substr(index, 2));

      if (v < 0) {
        throw new Error("Unexpected value");
      } else {
        return v;
      }
    };
  };

  var decodeOffset = function decodeOffset(str_2) {
    if (str_2 === "Z") {
      return 0;
    } else if (str_2.indexOf("+") === 0) {
      var h = read2Digits(str_2)(1);
      var m = read2Digits(str_2)(3);
      return (0, _TimeSpan.create)(h, m, 0);
    } else if (str_2.indexOf("-") === 0) {
      var h_1 = read2Digits(str_2)(1);
      var m_1 = read2Digits(str_2)(3);
      return (0, _TimeSpan.create)(-h_1, -m_1, 0);
    } else {
      throw new Error("Unexpected string");
    }
  };

  var year = void 0;
  var last2Digits = read2Digits(str)(0);

  if (last2Digits > 50) {
    year = 1900 + last2Digits;
  } else {
    year = 2000 + last2Digits;
  }

  var month = read2Digits(str)(2);
  var day = read2Digits(str)(4);
  var hour = read2Digits(str)(6);
  var minute = read2Digits(str)(8);
  var patternInput = void 0;
  var matchValue = str.length;

  switch (matchValue) {
    case 11:
    case 15:
      var timeZoneString = str.substr(10);
      patternInput = [0, decodeOffset(timeZoneString)];
      break;

    case 13:
    case 17:
      var timeZoneString_1 = str.substr(12);
      patternInput = [read2Digits(str)(10), decodeOffset(timeZoneString_1)];
      break;

    default:
      patternInput = (0, _String.fsFormat)("Unexpected length of UTCTime field: %d")(function (x) {
        throw new Error(x);
      })(str.length);
  }

  return [(0, _Date.create)(year, month, day, hour, minute, patternInput[0], 0, 1), patternInput[1]];
}

var printableCharSet = exports.printableCharSet = (0, _Set.create)("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 '()+,-./:=?", new _GenericComparer2.default(_Util.compare));

function isValidPrintableChar(ch) {
  return printableCharSet.has(ch);
}

var isValidPrintableString = exports.isValidPrintableString = function isValidPrintableString(source) {
  return (0, _Seq.forAll)(function (ch) {
    return isValidPrintableChar(ch);
  }, source);
};

function _Kind___(ty) {
  if (ty != null) {
    return ty.Kind;
  } else {
    return null;
  }
}

exports.$7C$Kind$7C$_$7C$ = _Kind___;

function toAsnClass(cls) {
  if (cls == null) {
    return new _Types.AsnClass("ContextSpecific", []);
  } else if (cls.Case === "Private") {
    return new _Types.AsnClass("Private", []);
  } else if (cls.Case === "Application") {
    return new _Types.AsnClass("Application", []);
  } else {
    return new _Types.AsnClass("Universal", []);
  }
}

function toTagClass(cls) {
  if (cls.Case === "Private") {
    return new _Schema.TagClass("Private", []);
  } else if (cls.Case === "Application") {
    return new _Schema.TagClass("Application", []);
  } else if (cls.Case === "ContextSpecific") {
    return null;
  } else {
    return new _Schema.TagClass("Universal", []);
  }
}

var TypeTag = exports.TypeTag = function () {
  function TypeTag(caseName, fields) {
    _classCallCheck(this, TypeTag);

    this.Case = caseName;
    this.Fields = fields;
  }

  _createClass(TypeTag, [{
    key: _Symbol3.default.reflection,
    value: function () {
      return {
        type: "FsAsn1.Reader.TypeTag",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
        cases: {
          AnyTag: [],
          ChoiceComponentTag: [(0, _Util.makeGeneric)(_List2.default, {
            T: (0, _Util.Tuple)(["string", _Schema.AsnType])
          })],
          ExplicitlyTaggedType: [_Types.AsnClass, "number", _Schema.AsnType],
          ImplicitlyTaggedType: [_Types.AsnClass, "number", _Schema.AsnType],
          UniversalTag: [_Types.AsnClass, "number"],
          UnresolvedTypeTag: ["string"]
        }
      };
    }
  }, {
    key: "Equals",
    value: function (other) {
      return (0, _Util.equalsUnions)(this, other);
    }
  }, {
    key: "CompareTo",
    value: function (other) {
      return (0, _Util.compareUnions)(this, other);
    }
  }]);

  return TypeTag;
}();

(0, _Symbol2.setType)("FsAsn1.Reader.TypeTag", TypeTag);

function toExpectedTag(ctx, ty) {
  toExpectedTag: while (true) {
    var wrap = function wrap(tag) {
      return new TypeTag("UniversalTag", [new _Types.AsnClass("Universal", []), tag]);
    };

    var $var5 = ty.Case === "SequenceOfType" ? [0] : ty.Case === "SetType" ? [1] : ty.Case === "SetOfType" ? [1] : ty.Case === "BooleanType" ? [2] : ty.Case === "NullType" ? [3] : ty.Case === "BitStringType" ? [4] : ty.Case === "ObjectIdentifierType" ? [5] : ty.Case === "OctetStringType" ? [6] : ty.Case === "IntegerType" ? [7] : ty.Case === "ReferencedType" ? ty.Fields[0] === "PrintableString" ? [8] : ty.Fields[0] === "VisibleString" ? [9] : ty.Fields[0] === "UTF8String" ? [10] : ty.Fields[0] === "T61String" ? [11] : ty.Fields[0] === "IA5String" ? [12] : ty.Fields[0] === "UTCTime" ? [13] : ty.Fields[0] === "RelativeObjectIdentifier" ? [14] : [19, ty.Fields[0]] : ty.Case === "TaggedType" ? ty.Fields[2].Case === "Implicit" ? [16, ty.Fields[0], ty.Fields[1], ty.Fields[3]] : [15, ty.Fields[0], ty.Fields[1], ty.Fields[3]] : ty.Case === "AnyType" ? [17] : ty.Case === "ChoiceType" ? [18, ty.Fields[0]] : [0];

    switch ($var5[0]) {
      case 0:
        return wrap(16);

      case 1:
        return wrap(17);

      case 2:
        return wrap(1);

      case 3:
        return wrap(5);

      case 4:
        return wrap(3);

      case 5:
        return wrap(6);

      case 6:
        return wrap(4);

      case 7:
        return wrap(2);

      case 8:
        return wrap(19);

      case 9:
        return wrap(26);

      case 10:
        return wrap(12);

      case 11:
        return wrap(20);

      case 12:
        return wrap(22);

      case 13:
        return wrap(23);

      case 14:
        return wrap(13);

      case 15:
        return new TypeTag("ExplicitlyTaggedType", [toAsnClass($var5[1]), $var5[2], $var5[3]]);

      case 16:
        var matchValue = ctx.ResolveType($var5[3]);

        if (matchValue.Kind.Case === "ChoiceType") {
          return new TypeTag("ExplicitlyTaggedType", [toAsnClass($var5[1]), $var5[2], $var5[3]]);
        } else {
          return new TypeTag("ImplicitlyTaggedType", [toAsnClass($var5[1]), $var5[2], $var5[3]]);
        }

      case 17:
        return new TypeTag("AnyTag", []);

      case 18:
        return new TypeTag("ChoiceComponentTag", [$var5[1]]);

      case 19:
        var ty_1 = ctx.LookupType($var5[1]);

        if (ty_1 == null) {
          return new TypeTag("UnresolvedTypeTag", [$var5[1]]);
        } else {
          ctx = ctx;
          ty = ty_1.Kind;
          continue toExpectedTag;
        }

    }
  }
}

function matchChoiceComponent(ctx, header, components) {
  return (0, _Util.defaultArg)((0, _Seq.tryFind)(function (tupledArg) {
    var matchValue = toExpectedTag(ctx, tupledArg[1].Kind);
    var $var6 = matchValue.Case === "ExplicitlyTaggedType" ? [0, matchValue.Fields[0], matchValue.Fields[1]] : matchValue.Case === "ImplicitlyTaggedType" ? [0, matchValue.Fields[0], matchValue.Fields[1]] : matchValue.Case === "UnresolvedTypeTag" ? [1] : matchValue.Case === "AnyTag" ? [2] : matchValue.Case === "ChoiceComponentTag" ? [3] : [0, matchValue.Fields[0], matchValue.Fields[1]];

    switch ($var6[0]) {
      case 0:
        return (0, _Util.equals)([$var6[1], $var6[2]], [header.Class, header.Tag]);

      case 1:
        return false;

      case 2:
        throw new Error("Cannot read CHOICE type with a component of ANY type");

      case 3:
        throw new Error("TODO Not implemented yet");
    }
  }, components), null, function (tuple) {
    return tuple[1];
  });
}

function oidValueNameToTypeName(name) {
  var n = name.substr(name.lastIndexOf("-") + 1);
  return n[0].toUpperCase() + n.substr(1);
}

function matchAnyTypeDefinedBy(ctx, componentName, previous, previousElements) {
  var targetElement = (0, _Seq.find)(function (tupledArg) {
    return tupledArg[1].Fields[0] === componentName;
  }, function (list2) {
    return (0, _Seq.toList)((0, _Seq.zip)(previousElements, list2));
  }(previous))[0];

  var equalsOid = function equalsOid(oidParts) {
    return function (value) {
      if (value.Case === "OidValue") {
        return function (p) {
          return p.length !== oidParts.length ? false : (0, _Seq.forAll2)(function (n1, n2) {
            return n1.Equals(n2);
          }, p, (0, _List.ofArray)(oidParts));
        }((0, _List.map)(function ($var7) {
          return $var7[1];
        }, value.Fields[0]));
      } else {
        return false;
      }
    };
  };

  if (targetElement.Value.Case === "ObjectIdentifier") {
    var knownValues = (0, _List.collect)(function (md) {
      return (0, _Seq.toList)(md.ValueAssignments);
    }, ctx.Modules);
    var namedOidValue = (0, _Seq.tryFind)(function (tupledArg_1) {
      return equalsOid(targetElement.Value.Fields[0])(tupledArg_1[1].Value);
    }, knownValues);

    if (namedOidValue != null) {
      var name = namedOidValue[0];
      var newType = ctx.LookupType(oidValueNameToTypeName(name));
      return newType;
    } else {
      throw new Error("None");
    }
  } else {
    throw new Error("ANY type must refer to a component of OBJECT IDENTIFIER type");
  }
}

function tryInterpretAsDifferentType(ctx, previousElements, componentType, typeName, schemaName) {
  var oidTypeDefinitions = void 0;
  var md = (0, _Seq.find)(function (m) {
    return m.Identifier === schemaName;
  }, ctx.Modules);
  oidTypeDefinitions = (0, _Map.tryFind)(typeName, md.ElementsDefinedByOid);

  var matchOidComponent = function matchOidComponent(name) {
    return function (el) {
      var $var8 = el.Value.Case === "ObjectIdentifier" ? el.SchemaType != null ? el.SchemaType.ComponentName != null ? function () {
        var oid = el.Value.Fields[0];
        var componentName = el.SchemaType.ComponentName;
        return componentName === name;
      }() ? [0, el.SchemaType.ComponentName, el.Value.Fields[0]] : [1] : [1] : [1] : [1];

      switch ($var8[0]) {
        case 0:
          return $var8[2];

        case 1:
          return null;
      }
    };
  };

  var interpretAs = function interpretAs(innerType) {
    return new _Schema.AsnType(new _Schema.AsnTypeKind("TaggedType", [new _Schema.TagClass("Universal", []), 4, new _Schema.TagKind("Explicit", []), innerType]), null, componentType.TypeName, componentType.SchemaName, componentType.ComponentName, componentType.Range);
  };

  var $var9 = oidTypeDefinitions != null ? function () {
    var valueComponent = oidTypeDefinitions[1];
    var oidComponent = oidTypeDefinitions[0];
    return (0, _Util.equals)(valueComponent, componentType.ComponentName);
  }() ? [0, oidTypeDefinitions[0], oidTypeDefinitions[1]] : [1] : [1];

  switch ($var9[0]) {
    case 0:
      var oid_1 = (0, _Seq.tryPick)(matchOidComponent($var9[1]), previousElements);
      var matchValue = (0, _Util.defaultArg)(oid_1, null, function (arg00) {
        return ctx.LookupValueByOid(arg00);
      });

      if (matchValue != null) {
        var typeName_1 = oidValueNameToTypeName(matchValue.Name);
        var matchValue_1 = ctx.LookupType(typeName_1);

        if (matchValue_1 == null) {
          var matchValue_2 = ctx.LookupType(typeName_1 + "Syntax");

          if (matchValue_2 == null) {
            return null;
          } else {
            return interpretAs(matchValue_2);
          }
        } else {
          return interpretAs(matchValue_1);
        }
      } else {
        return null;
      }

    case 1:
      return null;
  }
}

function matchSequenceComponentType(ctx, header, previous, next, previousElements) {
  matchSequenceComponentType: while (true) {
    var $var10 = next.tail != null ? next.head.Fields[2] != null ? next.head.Fields[2].Case === "Optional" ? [2, next.head, next.tail, next.head.Fields[1]] : [2, next.head, next.tail, next.head.Fields[1]] : [1, next.head, next.tail, next.head.Fields[1]] : [0];

    switch ($var10[0]) {
      case 0:
        return [null, previous, new _List2.default()];

      case 1:
        var matchValue = toExpectedTag(ctx, $var10[3].Kind);
        var $var11 = matchValue.Case === "ExplicitlyTaggedType" ? matchValue.Fields[2].Kind.Case === "AnyType" ? matchValue.Fields[2].Kind.Fields[0] != null ? [0, matchValue.Fields[0], matchValue.Fields[2].Kind.Fields[0], matchValue.Fields[1]] : [1] : [1] : [1];

        switch ($var11[0]) {
          case 0:
            var newType = matchAnyTypeDefinedBy(ctx, $var11[2], previous, previousElements);
            return [new _Schema.AsnType(new _Schema.AsnTypeKind("TaggedType", [toTagClass($var11[1]), $var11[3], new _Schema.TagKind("Explicit", []), newType]), $var10[3].Constraint, $var10[3].TypeName, $var10[3].SchemaName, $var10[3].ComponentName, $var10[3].Range), new _List2.default($var10[1], previous), $var10[2]];

          case 1:
            return [$var10[3], new _List2.default($var10[1], previous), $var10[2]];
        }

      case 2:
        var matchValue_1 = toExpectedTag(ctx, $var10[3].Kind);
        var $var12 = matchValue_1.Case === "ExplicitlyTaggedType" ? [0, matchValue_1.Fields[0], matchValue_1.Fields[1]] : matchValue_1.Case === "ImplicitlyTaggedType" ? [0, matchValue_1.Fields[0], matchValue_1.Fields[1]] : matchValue_1.Case === "UnresolvedTypeTag" ? [1] : matchValue_1.Case === "AnyTag" ? [2] : matchValue_1.Case === "ChoiceComponentTag" ? [3] : [0, matchValue_1.Fields[0], matchValue_1.Fields[1]];

        switch ($var12[0]) {
          case 0:
            if ((0, _Util.equals)([$var12[1], $var12[2]], [header.Class, header.Tag])) {
              return [$var10[3], new _List2.default($var10[1], previous), $var10[2]];
            } else {
              ctx = ctx;
              header = header;
              previous = previous;
              next = $var10[2];
              previousElements = previousElements;
              continue matchSequenceComponentType;
            }

          case 1:
            throw new Error("Not implemented yet");

          case 2:
            return [$var10[3], previous, $var10[2]];

          case 3:
            throw new Error("Not implemented yet");
        }

    }
  }
}

function readCollection(ctx, ty) {
  var _loop = function _loop() {
    var stream = ctx.Stream;

    var readElements = function readElements(tryFindType) {
      return function (initialState) {
        var recurse = function recurse(acc) {
          return function (state) {
            if (stream.CanRead(1)) {
              var position = stream.Position;

              try {
                var header = readHeader(stream);
                var patternInput = tryFindType(header)(state)(acc);
                var res = readValue(ctx, header, patternInput[0]);
                var elResult = (0, _Types.mapRight)(function (vv) {
                  return (0, _Types.makeElement)(header, vv, position, patternInput[0]);
                }, (0, _Types.mapLeft)(function (e) {
                  return new _Types.AsnElementError("InvalidValue", [new _Types.InvalidElementValue(position, stream.Position - position - header.HeaderLength, header, patternInput[0], e)]);
                }, res));
                return recurse(new _List2.default(elResult, acc))(patternInput[1]);
              } catch (e_1) {
                var err = stream.Position === position ? new _Types.AsnElementError("NoData", [new _Types.NoData(position)]) : new _Types.AsnElementError("InvalidHeader", [new _Types.InvalidHeader(position)]);
                return (0, _List.reverse)(new _List2.default(new _Types.EitherOrBoth("Left", [err]), acc));
              }
            } else {
              return (0, _List.reverse)(acc);
            }
          };
        };

        return recurse(new _List2.default())(initialState);
      };
    };

    var readElementsNoState = function readElementsNoState(tryFindType_1) {
      return readElements(function (h) {
        return function () {
          return function (_arg1) {
            return [tryFindType_1(h), null];
          };
        };
      })(null);
    };

    var $var13 = void 0;

    if (ty != null) {
      if (ty.Kind.Case === "SequenceType") {
        $var13 = [0, ty.Kind.Fields[0], ty.SchemaName, ty.TypeName];
      } else {
        var activePatternResult869 = _Kind___(ty);

        if (activePatternResult869 != null) {
          if (activePatternResult869.Case === "SequenceOfType") {
            if (activePatternResult869.Fields[1].Case === "SequenceOfType") {
              $var13 = [1, activePatternResult869.Fields[1].Fields[0]];
            } else {
              $var13 = [2];
            }
          } else {
            $var13 = [2];
          }
        } else {
          $var13 = [2];
        }
      }
    } else {
      var activePatternResult870 = _Kind___(ty);

      if (activePatternResult870 != null) {
        if (activePatternResult870.Case === "SequenceOfType") {
          if (activePatternResult870.Fields[1].Case === "SequenceOfType") {
            $var13 = [1, activePatternResult870.Fields[1].Fields[0]];
          } else {
            $var13 = [2];
          }
        } else {
          $var13 = [2];
        }
      } else {
        $var13 = [2];
      }
    }

    switch ($var13[0]) {
      case 0:
        return {
          v: readElements(function (header_1) {
            return function (components) {
              return function (previousResults) {
                var previousElements = (0, _List.choose)(function (x) {
                  return (0, _Types.right)(x);
                }, previousResults);
                var patternInput_1 = matchSequenceComponentType(ctx, header_1, components[0], components[1], previousElements);
                var matchValue = [patternInput_1[0], $var13[3]];
                var $var14 = matchValue[0] != null ? matchValue[1] != null ? [0, matchValue[0], matchValue[1]] : [1] : [1];

                switch ($var14[0]) {
                  case 0:
                    var matchValue_1 = tryInterpretAsDifferentType(ctx, previousElements, $var14[1], $var14[2], $var13[2]);

                    if (matchValue_1 == null) {
                      return [$var14[1], [patternInput_1[1], patternInput_1[2]]];
                    } else {
                      return [matchValue_1, [patternInput_1[1], patternInput_1[2]]];
                    }

                  case 1:
                    return [patternInput_1[0], [patternInput_1[1], patternInput_1[2]]];
                }
              };
            };
          })([new _List2.default(), $var13[1]])
        };

      case 1:
        return {
          v: readElementsNoState(function (_arg3) {
            return $var13[1];
          })
        };

      case 2:
        var $var15 = void 0;

        var activePatternResult868 = _Kind___(ty);

        if (activePatternResult868 != null) {
          if (activePatternResult868.Case === "SetType") {
            $var15 = [0, activePatternResult868.Fields[0]];
          } else {
            $var15 = [1];
          }
        } else {
          $var15 = [1];
        }

        switch ($var15[0]) {
          case 0:
            var toPair = function toPair(ty_1) {
              var matchValue_2 = toExpectedTag(ctx, ty_1.Kind);
              var $var16 = matchValue_2.Case === "ExplicitlyTaggedType" ? [0, matchValue_2.Fields[0], matchValue_2.Fields[1]] : matchValue_2.Case === "ImplicitlyTaggedType" ? [0, matchValue_2.Fields[0], matchValue_2.Fields[1]] : matchValue_2.Case === "UnresolvedTypeTag" ? [1] : matchValue_2.Case === "AnyTag" ? [2] : matchValue_2.Case === "ChoiceComponentTag" ? [3] : [0, matchValue_2.Fields[0], matchValue_2.Fields[1]];

              switch ($var16[0]) {
                case 0:
                  return [[$var16[1], $var16[2]], ty_1];

                case 1:
                  return (0, _String.fsFormat)("Cannot determine tag of type %s")(function (x) {
                    throw new Error(x);
                  })(matchValue_2.Fields[0]);

                case 2:
                  throw new Error("Cannot determine tag of ANY type");

                case 3:
                  throw new Error("Cannot determine tag of CHOICE type");
              }
            };

            return {
              v: readElements(function (header_2) {
                return function (componentMap) {
                  return function (_previousElements) {
                    var key = [header_2.Class, header_2.Tag];
                    var matchValue_3 = (0, _Map.tryFind)(key, componentMap);

                    if (matchValue_3 == null) {
                      return (0, _String.fsFormat)("Unexpected component of SET type with class %A and tag %d")(function (x) {
                        throw new Error(x);
                      })(header_2.Class)(header_2.Tag);
                    } else {
                      return [matchValue_3, (0, _Map.remove)(key, componentMap)];
                    }
                  };
                };
              })((0, _Map.create)((0, _List.map)(function (tupledArg) {
                var $var17 = tupledArg[1].tail != null ? tupledArg[1].tail.tail == null ? [0, tupledArg[1].head] : [1] : [1];

                switch ($var17[0]) {
                  case 0:
                    return $var17[1];

                  case 1:
                    return (0, _String.fsFormat)("Multiple components with the same class and tag: %A")(function (x) {
                      throw new Error(x);
                    })(tupledArg[0]);
                }
              }, (0, _List.groupBy)(function (tuple) {
                return tuple[0];
              }, (0, _List.map)(function (_arg4) {
                return toPair(_arg4.Fields[1]);
              }, $var15[1]))), new _GenericComparer2.default(_Util.compare)))
            };

          case 1:
            var $var18 = void 0;

            var activePatternResult867 = _Kind___(ty);

            if (activePatternResult867 != null) {
              if (activePatternResult867.Case === "SetOfType") {
                if (activePatternResult867.Fields[1].Case === "SetOfType") {
                  $var18 = [0, activePatternResult867.Fields[1].Fields[0]];
                } else {
                  $var18 = [1];
                }
              } else {
                $var18 = [1];
              }
            } else {
              $var18 = [1];
            }

            switch ($var18[0]) {
              case 0:
                return {
                  v: readElementsNoState(function (_arg5) {
                    return $var18[1];
                  })
                };

              case 1:
                var $var19 = void 0;

                var activePatternResult866 = _Kind___(ty);

                if (activePatternResult866 != null) {
                  if (activePatternResult866.Case === "ReferencedType") {
                    $var19 = [0, activePatternResult866.Fields[0]];
                  } else {
                    $var19 = [1];
                  }
                } else {
                  $var19 = [1];
                }

                switch ($var19[0]) {
                  case 0:
                    var _var23 = ctx;
                    ty = ctx.LookupType($var19[1]);
                    ctx = _var23;
                    return "continue|readCollection";

                  case 1:
                    if (ty == null) {
                      return {
                        v: readElementsNoState(function (_arg6) {
                          return null;
                        })
                      };
                    } else {
                      return {
                        v: (0, _String.fsFormat)("Unexpected collection type %A")(function (x) {
                          throw new Error(x);
                        })(ty)
                      };
                    }

                }

            }

        }

    }
  };

  readCollection: while (true) {
    var _ret2 = _loop();

    switch (_ret2) {
      case "continue|readCollection":
        continue readCollection;

      default:
        if ((typeof _ret2 === "undefined" ? "undefined" : _typeof(_ret2)) === "object") return _ret2.v;
    }
  }
}

function readValueUniversal(ctx, tag, len, ty) {
  var stream = ctx.Stream;
  var matchValue = tag;

  switch (matchValue) {
    case 16:
      var res = readCollection(ctx, ty);
      var el = new _Types.AsnValue("Sequence", [Array.from((0, _List.choose)(function (x) {
        return (0, _Types.right)(x);
      }, res))]);
      var errs = (0, _List.choose)(function (x_1) {
        return (0, _Types.left)(x_1);
      }, res);

      if (errs.tail == null) {
        return new _Types.EitherOrBoth("Right", [el]);
      } else {
        return new _Types.EitherOrBoth("Both", [new _Types.AsnValueError(null, errs), el]);
      }

    case 17:
      var res_1 = readCollection(ctx, ty);
      var el_1 = new _Types.AsnValue("Set", [Array.from((0, _List.choose)(function (x_2) {
        return (0, _Types.right)(x_2);
      }, res_1))]);
      var errs_1 = (0, _List.choose)(function (x_3) {
        return (0, _Types.left)(x_3);
      }, res_1);

      if (errs_1.tail == null) {
        return new _Types.EitherOrBoth("Right", [el_1]);
      } else {
        return new _Types.EitherOrBoth("Both", [new _Types.AsnValueError(null, errs_1), el_1]);
      }

    case 2:
      return new _Types.EitherOrBoth("Right", [new _Types.AsnValue("Integer", [decodeInteger(stream.ReadBytes(len))])]);

    case 6:
      return new _Types.EitherOrBoth("Right", [new _Types.AsnValue("ObjectIdentifier", [readOid(stream, len)])]);

    case 13:
      return new _Types.EitherOrBoth("Right", [new _Types.AsnValue("RelativeObjectIdentifier", [readRelativeOid(stream, len)])]);

    case 5:
      return new _Types.EitherOrBoth("Right", [new _Types.AsnValue("Null", [])]);

    case 19:
      var str = function () {
        var objectArg = new TextDecoder('ascii');
        return function (arg00) {
          return objectArg.decode(arg00);
        };
      }()(stream.ReadBytes(len));

      if (isValidPrintableString(str)) {
        return new _Types.EitherOrBoth("Right", [new _Types.AsnValue("PrintableString", [str])]);
      } else {
        throw new Error("Invalid printable string");
      }

    case 12:
      return new _Types.EitherOrBoth("Right", [new _Types.AsnValue("UTF8String", [function () {
        var objectArg_1 = new TextDecoder('utf-8');
        return function (arg00_1) {
          return objectArg_1.decode(arg00_1);
        };
      }()(stream.ReadBytes(len))])]);

    case 26:
      return new _Types.EitherOrBoth("Right", [new _Types.AsnValue("VisibleString", [function () {
        var objectArg_2 = new TextDecoder('utf-8');
        return function (arg00_2) {
          return objectArg_2.decode(arg00_2);
        };
      }()(stream.ReadBytes(len))])]);

    case 22:
      return new _Types.EitherOrBoth("Right", [new _Types.AsnValue("IA5String", [function () {
        var objectArg_3 = new TextDecoder('utf-8');
        return function (arg00_3) {
          return objectArg_3.decode(arg00_3);
        };
      }()(stream.ReadBytes(len))])]);

    case 23:
      return new _Types.EitherOrBoth("Right", [new _Types.AsnValue("UTCTime", [decodeUTCTime(function () {
        var objectArg_4 = new TextDecoder('ascii');
        return function (arg00_4) {
          return objectArg_4.decode(arg00_4);
        };
      }()(stream.ReadBytes(len)))])]);

    case 3:
      var numberOfUnusedBits = stream.ReadByte();
      var bytes = stream.ReadBytes(len - 1);
      return new _Types.EitherOrBoth("Right", [new _Types.AsnValue("BitString", [new _Types.AsnBitString(numberOfUnusedBits, bytes)])]);

    case 4:
      return new _Types.EitherOrBoth("Right", [new _Types.AsnValue("OctetString", [stream.ReadBytes(len)])]);

    case 1:
      if (len !== 1) {
        throw new AsnElementException("Invalid length of boolean value.");
      }

      var matchValue_1 = stream.ReadByte();

      if (matchValue_1 === 0) {
        return new _Types.EitherOrBoth("Right", [new _Types.AsnValue("Boolean", [new _Types.AsnBoolean("False", [])])]);
      } else {
        return new _Types.EitherOrBoth("Right", [new _Types.AsnValue("Boolean", [new _Types.AsnBoolean("True", [matchValue_1])])]);
      }

    default:
      (0, _String.fsFormat)("Unsupported universal class tag '%d'")(function (x) {
        console.log(x);
      })(tag);
      return new _Types.EitherOrBoth("Right", [new _Types.AsnValue("Unknown", [stream.ReadBytes(len)])]);
  }
}

function readValue(ctx, h, ty) {
  var patternInput = [h.Tag, h.Length];

  var failsToMatchHeader = function failsToMatchHeader(expectedTag) {
    var compare = function compare(cls) {
      return function (tag) {
        if (!cls.Equals(h.Class)) {
          return true;
        } else {
          return tag !== h.Tag;
        }
      };
    };

    if (expectedTag.Case === "ExplicitlyTaggedType") {
      return compare(expectedTag.Fields[0])(expectedTag.Fields[1]);
    } else if (expectedTag.Case === "ImplicitlyTaggedType") {
      return compare(expectedTag.Fields[0])(expectedTag.Fields[1]);
    } else if (expectedTag.Case === "UnresolvedTypeTag") {
      return false;
    } else if (expectedTag.Case === "AnyTag") {
      return false;
    } else if (expectedTag.Case === "ChoiceComponentTag") {
      return false;
    } else {
      return compare(expectedTag.Fields[0])(expectedTag.Fields[1]);
    }
  };

  var readValueOfDefiniteLength = function readValueOfDefiniteLength(len) {
    var ctx_1 = ctx.WithBoundedStream(len);
    var stream = ctx_1.Stream;
    var ty_1 = (0, _Util.defaultArg)(ty, null, function (arg00) {
      return ctx_1.ResolveType(arg00);
    });
    var expectedTag_1 = (0, _Util.defaultArg)((0, _Util.defaultArg)(ty_1, null, function (ty_3) {
      return ty_3.Kind;
    }), null, function (ty_2) {
      return toExpectedTag(ctx_1, ty_2);
    });

    var readAsUnknownType = function readAsUnknownType() {
      return new _Types.EitherOrBoth("Right", [new _Types.AsnValue("Unknown", [stream.ReadBytes(len)])]);
    };

    var readWithNoType = function readWithNoType() {
      if (h.Class.Case === "Universal") {
        return readValueUniversal(ctx_1, patternInput[0], len, null);
      } else {
        return new _Types.EitherOrBoth("Right", [new _Types.AsnValue("Unknown", [stream.ReadBytes(len)])]);
      }
    };

    var matchValue = function (option) {
      return (0, _Util.defaultArg)(option, null, failsToMatchHeader);
    }(expectedTag_1);

    var $var20 = matchValue != null ? matchValue ? [0] : [1] : [1];

    switch ($var20[0]) {
      case 0:
        (0, _String.fsFormat)("Unexpected class and tag for type %A: %A %d")(function (x) {
          throw new Error(x);
        })(ty_1)(h.Class)(h.Tag);
        break;

      case 1:
        break;
    }

    if (expectedTag_1 == null) {
      return readWithNoType(null);
    } else if (expectedTag_1.Case === "ExplicitlyTaggedType") {
      return (0, _Types.mapLeft)(function (e) {
        return new _Types.AsnValueError(null, (0, _List.ofArray)([e]));
      }, (0, _Types.mapRight)(function (arg0) {
        return new _Types.AsnValue("ExplicitTag", [arg0]);
      }, readElement(ctx_1, expectedTag_1.Fields[2])));
    } else if (expectedTag_1.Case === "ImplicitlyTaggedType") {
      var matchValue_1 = toExpectedTag(ctx_1, expectedTag_1.Fields[2].Kind);
      var $var21 = matchValue_1.Case === "ExplicitlyTaggedType" ? [0, matchValue_1.Fields[0], matchValue_1.Fields[1]] : matchValue_1.Case === "ImplicitlyTaggedType" ? [0, matchValue_1.Fields[0], matchValue_1.Fields[1]] : matchValue_1.Case === "AnyTag" ? [1] : matchValue_1.Case === "ChoiceComponentTag" ? [2] : matchValue_1.Case === "UnresolvedTypeTag" ? [3] : [0, matchValue_1.Fields[0], matchValue_1.Fields[1]];

      switch ($var21[0]) {
        case 0:
          return readValue(ctx_1, new _Types.AsnHeader($var21[1], h.Encoding, $var21[2], h.Length), expectedTag_1.Fields[2]);

        case 1:
          return (0, _String.fsFormat)("Cannot read value of implicitly tagged ANY type")(function (x) {
            throw new Error(x);
          });

        case 2:
          return (0, _String.fsFormat)("Cannot read value of implicitly tagged CHOICE type")(function (x) {
            throw new Error(x);
          });

        case 3:
          return readAsUnknownType(null);
      }
    } else if (expectedTag_1.Case === "AnyTag") {
      if (h.Class.Case === "Universal") {
        return readValueUniversal(ctx_1, patternInput[0], len, null);
      } else {
        return readAsUnknownType(null);
      }
    } else if (expectedTag_1.Case === "UnresolvedTypeTag") {
      return readAsUnknownType(null);
    } else if (expectedTag_1.Case === "ChoiceComponentTag") {
      var matchValue_2 = matchChoiceComponent(ctx_1, h, expectedTag_1.Fields[0]);

      if (matchValue_2 == null) {
        return readAsUnknownType(null);
      } else {
        return readValue(ctx_1, h, matchValue_2);
      }
    } else {
      return readValueUniversal(ctx_1, patternInput[0], len, ty_1);
    }
  };

  var tryMoveTo = function tryMoveTo(pos) {
    try {
      ctx.Stream.ReadBytes(pos - ctx.Stream.Position);
    } catch (matchValue_3) {
      if (matchValue_3 instanceof EndOfAsnStreamException) {} else {
        throw new Error();
      }
    }
  };

  if (patternInput[1].Case === "Indefinite") {
    throw new Error("Not supported yet");
  } else {
    var position = ctx.Stream.Position;

    try {
      var res = readValueOfDefiniteLength(patternInput[1].Fields[0]);
      tryMoveTo(patternInput[1].Fields[0] + position);
      return res;
    } catch (e_1) {
      tryMoveTo(patternInput[1].Fields[0] + position);
      return new _Types.EitherOrBoth("Left", [new _Types.AsnValueError(e_1, new _List2.default())]);
    }
  }
}

function readElement(ctx, ty) {
  var stream = ctx.Stream;
  var position = stream.Position;

  try {
    var header = readHeader(stream);
    return (0, _Types.mapLeft)(function (e) {
      return new _Types.AsnElementError("InvalidValue", [new _Types.InvalidElementValue(position, stream.Position - position - header.HeaderLength, header, ty, e)]);
    }, (0, _Types.mapRight)(function (v) {
      return (0, _Types.makeElement)(header, v, position, ty);
    }, readValue(ctx, header, ty)));
  } catch (e_1) {
    (0, _String.fsFormat)("%A")(function (x) {
      console.log(x);
    })(e_1);

    if (position === stream.Position) {
      return new _Types.EitherOrBoth("Left", [new _Types.AsnElementError("NoData", [new _Types.NoData(position)])]);
    } else {
      return new _Types.EitherOrBoth("Left", [new _Types.AsnElementError("InvalidHeader", [new _Types.InvalidHeader(position)])]);
    }
  }
}

function nameOfType(ty) {
  var matchValue = [ty.TypeName, ty.Kind];

  if (matchValue[0] == null) {
    if (matchValue[1].Case === "ReferencedType") {
      var n = matchValue[1].Fields[0];
      return n;
    } else {
      return null;
    }
  } else {
    var typeName = matchValue[0];
    return typeName;
  }
}

function componentName(ty) {
  var $var22 = ty != null ? ty.ComponentName != null ? [0, ty.ComponentName] : [1] : [1];

  switch ($var22[0]) {
    case 0:
      return $var22[1];

    case 1:
      return null;
  }
}

var ElementType = exports.ElementType = function () {
  function ElementType(caseName, fields) {
    _classCallCheck(this, ElementType);

    this.Case = caseName;
    this.Fields = fields;
  }

  _createClass(ElementType, [{
    key: _Symbol3.default.reflection,
    value: function () {
      return {
        type: "FsAsn1.Reader.ElementType",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
        cases: {
          Type: [_Schema.AsnType],
          TypeName: ["string"],
          UnknownType: []
        }
      };
    }
  }, {
    key: "Equals",
    value: function (other) {
      return (0, _Util.equalsUnions)(this, other);
    }
  }, {
    key: "CompareTo",
    value: function (other) {
      return (0, _Util.compareUnions)(this, other);
    }
  }]);

  return ElementType;
}();

(0, _Symbol2.setType)("FsAsn1.Reader.ElementType", ElementType);

function readElementFromArray(modules, elType, arr) {
  var ctx = AsnContext.FromArray(arr, modules);
  var ty = void 0;

  if (elType.Case === "Type") {
    ty = elType.Fields[0];
  } else if (elType.Case === "TypeName") {
    var matchValue = ctx.LookupType(elType.Fields[0]);

    if (matchValue == null) {
      ty = (0, _String.fsFormat)("Cannot resolve type name '%s'")(function (x) {
        throw new Error(x);
      })(elType.Fields[0]);
    } else {
      ty = matchValue;
    }
  } else {
    ty = null;
  }

  return readElement(ctx, ty);
}

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.syncScroll = syncScroll;
exports.addClass = addClass;
exports.removeClass = removeClass;
exports.base64ToByteArray = base64ToByteArray;
exports.byteToUpperHex = byteToUpperHex;
exports.appendTo = appendTo;
exports.tryGetElementById = tryGetElementById;
exports.findParent = findParent;
exports.toSeq = toSeq;
exports.withTarget = withTarget;
exports.lengthStr = lengthStr;
exports.valueStr = valueStr;
exports.typeStr = typeStr;
exports.fetchAsync2 = fetchAsync2;
exports.zipAsResultList = zipAsResultList;
exports.cataAsnResult = cataAsnResult;

var _String = __webpack_require__(35);

var _Seq = __webpack_require__(7);

var _Date = __webpack_require__(40);

var _Util = __webpack_require__(5);

var _Async = __webpack_require__(113);

var _List = __webpack_require__(22);

var _List2 = _interopRequireDefault(_List);

var _Types = __webpack_require__(112);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function syncScroll(sourceEl, sourceContainer, targetEl, targetContainer) {
  var newScrollTop = targetEl.offsetTop - (sourceEl.offsetTop - sourceContainer.scrollTop);
  targetContainer.scrollTop = newScrollTop;
}

function addClass(cls, el) {
  el.classList.add(cls);
}

function removeClass(cls, el) {
  el.classList.remove(cls);
}

function base64ToByteArray(b64) {
  var byteString = window.atob(b64);
  var byteArray = new Uint8Array(byteString.length);

  for (var i = 0; i <= byteString.length - 1; i++) {
    byteArray[i] = byteString.charCodeAt(i);
  }

  return byteArray;
}

function byteToUpperHex(b) {
  return (0, _String.padLeft)(b.toString(16).toLocaleUpperCase(), 2, "0");
}

function appendTo(targetEl, el) {
  targetEl.appendChild(el);
}

function tryGetElementById(id) {
  return document.getElementById(id);
}

function findParent(predicate, el) {
  var matchValue = el;

  if (matchValue != null) {
    if (predicate(matchValue)) {
      return matchValue;
    } else if (matchValue != null) {
      return findParent(predicate, matchValue.parentElement);
    } else {
      throw new Error("c:\\dev\\FsAsn1\\src\\FsAsn1.Viewer\\Utils.fs", 37, 10);
    }
  } else {
    return null;
  }
}

function toSeq(nodeList) {
  return (0, _Seq.delay)(function () {
    return (0, _Seq.map)(function (i) {
      return nodeList[i];
    }, (0, _Seq.range)(0, ~~nodeList.length - 1));
  });
}

function withTarget(func) {
  return function (delegateArg0) {
    return function (e) {
      func(e.target);
      return null;
    }(delegateArg0);
  };
}

function lengthStr(header) {
  if (header.Length.Case === "Indefinite") {
    return "Indefinite";
  } else {
    return String(header.Length.Fields[0]);
  }
}

function valueStr(asnValue) {
  var utcTimeToString = function utcTimeToString(dto) {
    return (0, _String.fsFormat)("%02d.%02d.%d %02d:%02d")(function (x) {
      return x;
    })(function () {
      var copyOfStruct = dto["0"];
      return (0, _Date.day)(copyOfStruct);
    }())(function () {
      var copyOfStruct_1 = dto["0"];
      return (0, _Date.month)(copyOfStruct_1);
    }())(function () {
      var copyOfStruct_2 = dto["0"];
      return (0, _Date.year)(copyOfStruct_2);
    }())(function () {
      var copyOfStruct_3 = dto["0"];
      return (0, _Date.hour)(copyOfStruct_3);
    }())(function () {
      var copyOfStruct_4 = dto["0"];
      return (0, _Date.minute)(copyOfStruct_4);
    }());
  };

  var visibleOctetStringBytes = 10;
  var $var1 = asnValue.Case === "ObjectIdentifier" ? [1, asnValue.Fields[0]] : asnValue.Case === "RelativeObjectIdentifier" ? [1, asnValue.Fields[0]] : asnValue.Case === "OctetString" ? [2] : asnValue.Case === "UTCTime" ? [3] : asnValue.Case === "PrintableString" ? [4, asnValue.Fields[0]] : asnValue.Case === "UTF8String" ? [4, asnValue.Fields[0]] : asnValue.Case === "T61String" ? [4, asnValue.Fields[0]] : asnValue.Case === "VisibleString" ? [4, asnValue.Fields[0]] : asnValue.Case === "IA5String" ? [4, asnValue.Fields[0]] : asnValue.Case === "Boolean" ? [5] : asnValue.Case === "Null" ? [6] : asnValue.Case === "Sequence" ? [6] : asnValue.Case === "Set" ? [6] : asnValue.Case === "Unknown" ? [6] : asnValue.Case === "BitString" ? [6] : asnValue.Case === "ExplicitTag" ? [6] : [0];

  switch ($var1[0]) {
    case 0:
      return (0, _Util.toString)(asnValue.Fields[0]);

    case 1:
      return (0, _String.join)(".", (0, _Seq.map)(function (n) {
        return (0, _Util.toString)(n);
      }, $var1[1]));

    case 2:
      var addSuffix = function addSuffix(s) {
        if (asnValue.Fields[0].length > visibleOctetStringBytes) {
          return s + "...";
        } else {
          return s;
        }
      };

      return addSuffix((0, _String.join)("", Array.from((0, _Seq.map)((0, _String.fsFormat)("%02x")(function (x) {
        return x;
      }), function (array) {
        return array.slice(0, visibleOctetStringBytes);
      }(asnValue.Fields[0])))));

    case 3:
      return utcTimeToString(asnValue.Fields[0]);

    case 4:
      return (0, _String.fsFormat)("\"%s\"")(function (x) {
        return x;
      })($var1[1]);

    case 5:
      if (asnValue.Fields[0].Case === "False") {
        return "FALSE";
      } else {
        return "TRUE";
      }

    case 6:
      return null;
  }
}

function typeStr(asnValue) {
  if (asnValue.Case === "Integer") {
    return "INTEGER";
  } else if (asnValue.Case === "ObjectIdentifier") {
    return "OBJECT_IDENTIFIER";
  } else if (asnValue.Case === "RelativeObjectIdentifier") {
    return "RELATIVE_OBJECT_IDENTIFIER";
  } else if (asnValue.Case === "OctetString") {
    return "OCTET_STRING";
  } else if (asnValue.Case === "PrintableString") {
    return "PRINTABLE_STRING";
  } else if (asnValue.Case === "IA5String") {
    return "IA5_STRING";
  } else if (asnValue.Case === "VisibleString") {
    return "VISIBLE_STRING";
  } else if (asnValue.Case === "UTF8String") {
    return "UTF8_STRING";
  } else if (asnValue.Case === "Sequence") {
    return "SEQUENCE";
  } else if (asnValue.Case === "Set") {
    return "SET";
  } else if (asnValue.Case === "T61String") {
    return "T61_STRING";
  } else if (asnValue.Case === "Unknown") {
    return "Unknown";
  } else if (asnValue.Case === "BitString") {
    return "BITSTRING";
  } else if (asnValue.Case === "UTCTime") {
    return "UTC_TIME";
  } else if (asnValue.Case === "ExplicitTag") {
    return "EXPLICIT_TAG";
  } else if (asnValue.Case === "Boolean") {
    return "BOOLEAN";
  } else {
    return "NULL";
  }
}

function fetchAsync2(url, init) {
  var pathname = document.location.pathname;
  var basePath = void 0;
  var matchValue = pathname.lastIndexOf("/");

  if (matchValue === -1) {
    basePath = "";
  } else {
    basePath = pathname.substr(0, matchValue);
  }

  return (0, _Async.awaitPromise)(fetch(basePath + url, init));
}

function zipAsResultList(els, errEls) {
  var matchValue = [els, errEls];
  var $var2 = matchValue[0].tail != null ? matchValue[1].tail != null ? matchValue[1].head.Case === "InvalidValue" ? function () {
    var tail2_1 = matchValue[1].tail;
    var tail1_2 = matchValue[0].tail;
    var h2_1 = matchValue[1].head.Fields[0].Header;
    var h1_2 = matchValue[0].head;
    var err_1 = matchValue[1].head;
    return h1_2.Header.Equals(h2_1);
  }() ? [0, matchValue[1].head, matchValue[0].head, matchValue[1].head.Fields[0].Header, matchValue[0].tail, matchValue[1].tail] : [1] : [1] : [1] : [1];

  switch ($var2[0]) {
    case 0:
      return new _List2.default(new _Types.EitherOrBoth("Both", [$var2[1], $var2[2]]), zipAsResultList($var2[4], $var2[5]));

    case 1:
      var $var3 = matchValue[0].tail != null ? matchValue[1].tail != null ? matchValue[1].head.Case === "InvalidValue" ? function () {
        var tail2 = matchValue[1].tail;
        var tail1_1 = matchValue[0].tail;
        var off = matchValue[1].head.Fields[0].Offset;
        var h2 = matchValue[1].head.Fields[0].Header;
        var h1_1 = matchValue[0].head;
        var err = matchValue[1].head;
        return !h1_1.Header.Equals(h2);
      }() ? [0, matchValue[1].head, matchValue[0].head, matchValue[1].head.Fields[0].Header, matchValue[1].head.Fields[0].Offset, matchValue[0].tail, matchValue[1].tail] : [1] : [1] : [1] : [1];

      switch ($var3[0]) {
        case 0:
          if ($var3[2].Offset < $var3[4]) {
            return new _List2.default(new _Types.EitherOrBoth("Right", [$var3[2]]), zipAsResultList($var3[5], errEls));
          } else {
            return new _List2.default(new _Types.EitherOrBoth("Left", [$var3[1]]), zipAsResultList(els, $var3[6]));
          }

        case 1:
          if (matchValue[0].tail == null) {
            if (matchValue[1].tail == null) {
              return new _List2.default();
            } else {
              return (0, _List.map)(function (arg0) {
                return new _Types.EitherOrBoth("Left", [arg0]);
              }, matchValue[1]);
            }
          } else {
            var tail1 = matchValue[0].tail;
            var h1 = matchValue[0].head;
            return new _List2.default(new _Types.EitherOrBoth("Right", [h1]), zipAsResultList(tail1, errEls));
          }

      }

  }
}

function cataAsnResult(fSimple, fCollection, res) {
  var recurse = function recurse(res_1) {
    return cataAsnResult(fSimple, fCollection, res_1);
  };

  var patternInput = void 0;
  var matchValue = (0, _Types.right)(res);
  var $var4 = void 0;

  if (matchValue != null) {
    var activePatternResult268 = (0, _Types.$7C$SimpleValue$7C$Collection$7C$)(matchValue.Value);

    if (activePatternResult268.Case === "Choice2Of2") {
      $var4 = [0, activePatternResult268.Fields[0]];
    } else {
      $var4 = [1];
    }
  } else {
    $var4 = [1];
  }

  switch ($var4[0]) {
    case 0:
      patternInput = [true, $var4[1]];
      break;

    case 1:
      patternInput = [false, []];
      break;
  }

  var patternInput_1 = void 0;
  var matchValue_1 = (0, _Types.left)(res);
  var $var5 = matchValue_1 != null ? matchValue_1.Case === "InvalidValue" ? function () {
    var iev = matchValue_1.Fields[0];
    return !iev.Value.ChildrenErrors.Equals(new _List2.default());
  }() ? [0, matchValue_1.Fields[0]] : [1] : [1] : [1];

  switch ($var5[0]) {
    case 0:
      patternInput_1 = [true, $var5[1].Value.ChildrenErrors];
      break;

    case 1:
      patternInput_1 = [false, new _List2.default()];
      break;
  }

  if (patternInput[0] ? true : patternInput_1[0]) {
    return fCollection(res)(Array.from(function (list) {
      return (0, _List.map)(recurse, list);
    }(zipAsResultList((0, _Seq.toList)(patternInput[1]), patternInput_1[1]))));
  } else {
    return fSimple(res);
  }
}

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

var cof = __webpack_require__(24);
module.exports = function (it, msg) {
  if (typeof it != 'number' && cof(it) != 'Number') throw TypeError(msg);
  return +it;
};


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)

var toObject = __webpack_require__(11);
var toAbsoluteIndex = __webpack_require__(48);
var toLength = __webpack_require__(10);

module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = toLength(O.length);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = Math.min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];
    else delete O[to];
    to += inc;
    from += inc;
  } return O;
};


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(37);

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(13);
var toObject = __webpack_require__(11);
var IObject = __webpack_require__(56);
var toLength = __webpack_require__(10);

module.exports = function (that, callbackfn, aLen, memo, isRight) {
  aFunction(callbackfn);
  var O = toObject(that);
  var self = IObject(O);
  var length = toLength(O.length);
  var index = isRight ? length - 1 : 0;
  var i = isRight ? -1 : 1;
  if (aLen < 2) for (;;) {
    if (index in self) {
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if (isRight ? index < 0 : length <= index) {
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for (;isRight ? index >= 0 : length > index; index += i) if (index in self) {
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction = __webpack_require__(13);
var isObject = __webpack_require__(4);
var invoke = __webpack_require__(68);
var arraySlice = [].slice;
var factories = {};

var construct = function (F, len, args) {
  if (!(len in factories)) {
    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);
  var bound = function (/* args... */) {
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if (isObject(fn.prototype)) bound.prototype = fn.prototype;
  return bound;
};


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__(8).f;
var create = __webpack_require__(32);
var redefineAll = __webpack_require__(46);
var ctx = __webpack_require__(23);
var anInstance = __webpack_require__(41);
var forOf = __webpack_require__(37);
var $iterDefine = __webpack_require__(72);
var step = __webpack_require__(92);
var setSpecies = __webpack_require__(47);
var DESCRIPTORS = __webpack_require__(9);
var fastKey = __webpack_require__(38).fastKey;
var validate = __webpack_require__(54);
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(42);
var from = __webpack_require__(118);
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefineAll = __webpack_require__(46);
var getWeak = __webpack_require__(38).getWeak;
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var anInstance = __webpack_require__(41);
var forOf = __webpack_require__(37);
var createArrayMethod = __webpack_require__(26);
var $has = __webpack_require__(16);
var validate = __webpack_require__(54);
var arrayFind = createArrayMethod(5);
var arrayFindIndex = createArrayMethod(6);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (that) {
  return that._l || (that._l = new UncaughtFrozenStore());
};
var UncaughtFrozenStore = function () {
  this.a = [];
};
var findUncaughtFrozen = function (store, key) {
  return arrayFind(store.a, function (it) {
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function (key) {
    var index = arrayFindIndex(this.a, function (it) {
      return it[0] === key;
    });
    if (~index) this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;      // collection type
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME))['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME)).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var data = getWeak(anObject(key), true);
    if (data === true) uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
var isArray = __webpack_require__(69);
var isObject = __webpack_require__(4);
var toLength = __webpack_require__(10);
var ctx = __webpack_require__(23);
var IS_CONCAT_SPREADABLE = __webpack_require__(6)('isConcatSpreadable');

function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? ctx(mapper, thisArg, 3) : false;
  var element, spreadable;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      spreadable = false;
      if (isObject(element)) {
        spreadable = element[IS_CONCAT_SPREADABLE];
        spreadable = spreadable !== undefined ? !!spreadable : isArray(element);
      }

      if (spreadable && depth > 0) {
        targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1fffffffffffff) throw TypeError();
        target[targetIndex] = element;
      }

      targetIndex++;
    }
    sourceIndex++;
  }
  return targetIndex;
}

module.exports = flattenIntoArray;


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(9) && !__webpack_require__(3)(function () {
  return Object.defineProperty(__webpack_require__(86)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var isObject = __webpack_require__(4);
var floor = Math.floor;
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(1);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys = __webpack_require__(33);
var toIObject = __webpack_require__(14);
module.exports = function (object, el) {
  var O = toIObject(object);
  var keys = getKeys(O);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) if (O[key = keys[index++]] === el) return key;
};


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var sign = __webpack_require__(94);
var pow = Math.pow;
var EPSILON = pow(2, -52);
var EPSILON32 = pow(2, -23);
var MAX32 = pow(2, 127) * (2 - EPSILON32);
var MIN32 = pow(2, -126);

var roundTiesToEven = function (n) {
  return n + 1 / EPSILON - 1 / EPSILON;
};

module.exports = Math.fround || function fround(x) {
  var $abs = Math.abs(x);
  var $sign = sign(x);
  var a, result;
  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
  a = (1 + EPSILON32 / EPSILON) * $abs;
  result = a - (a - $abs);
  // eslint-disable-next-line no-self-compare
  if (result > MAX32 || result != result) return $sign * Infinity;
  return $sign * result;
};


/***/ }),
/* 130 */
/***/ (function(module, exports) {

// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x) {
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};


/***/ }),
/* 131 */
/***/ (function(module, exports) {

// https://rwaldron.github.io/proposal-math-extensions/
module.exports = Math.scale || function scale(x, inLow, inHigh, outLow, outHigh) {
  if (
    arguments.length === 0
      // eslint-disable-next-line no-self-compare
      || x != x
      // eslint-disable-next-line no-self-compare
      || inLow != inLow
      // eslint-disable-next-line no-self-compare
      || inHigh != inHigh
      // eslint-disable-next-line no-self-compare
      || outLow != outLow
      // eslint-disable-next-line no-self-compare
      || outHigh != outHigh
  ) return NaN;
  if (x === Infinity || x === -Infinity) return x;
  return (x - inLow) * (outHigh - outLow) / (inHigh - inLow) + outLow;
};


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(8);
var gOPD = __webpack_require__(18);
var ownKeys = __webpack_require__(98);
var toIObject = __webpack_require__(14);

module.exports = function define(target, mixin) {
  var keys = ownKeys(toIObject(mixin));
  var length = keys.length;
  var i = 0;
  var key;
  while (length > i) dP.f(target, key = keys[i++], gOPD.f(mixin, key));
  return target;
};


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(8);
var anObject = __webpack_require__(1);
var getKeys = __webpack_require__(33);

module.exports = __webpack_require__(9) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(14);
var gOPN = __webpack_require__(45).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(16);
var toIObject = __webpack_require__(14);
var arrayIndexOf = __webpack_require__(64)(false);
var IE_PROTO = __webpack_require__(102)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys = __webpack_require__(33);
var toIObject = __webpack_require__(14);
var isEnum = __webpack_require__(57).f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) if (isEnum.call(O, key = keys[i++])) {
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

var $parseFloat = __webpack_require__(2).parseFloat;
var $trim = __webpack_require__(53).trim;

module.exports = 1 / $parseFloat(__webpack_require__(106) + '-0') !== -Infinity ? function parseFloat(str) {
  var string = $trim(String(str), 3);
  var result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

var $parseInt = __webpack_require__(2).parseInt;
var $trim = __webpack_require__(53).trim;
var ws = __webpack_require__(106);
var hex = /^[-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ }),
/* 140 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

var newPromiseCapability = __webpack_require__(96);

module.exports = function (C, x) {
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-string-pad-start-end
var toLength = __webpack_require__(10);
var repeat = __webpack_require__(105);
var defined = __webpack_require__(27);

module.exports = function (that, maxLength, fillString, left) {
  var S = String(defined(that));
  var stringLength = S.length;
  var fillStr = fillString === undefined ? ' ' : String(fillString);
  var intMaxLength = toLength(maxLength);
  if (intMaxLength <= stringLength || fillStr == '') return S;
  var fillLen = intMaxLength - stringLength;
  var stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/ecma262/#sec-toindex
var toInteger = __webpack_require__(29);
var toLength = __webpack_require__(10);
module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toInteger(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length!');
  return length;
};


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(6);


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(42);
var ITERATOR = __webpack_require__(6)('iterator');
var Iterators = __webpack_require__(43);
module.exports = __webpack_require__(15).isIterable = function (it) {
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    // eslint-disable-next-line no-prototype-builtins
    || Iterators.hasOwnProperty(classof(O));
};


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(121);
var validate = __webpack_require__(54);
var MAP = 'Map';

// 23.1 Map Objects
module.exports = __webpack_require__(65)(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if (__webpack_require__(9) && /./g.flags != 'g') __webpack_require__(8).f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__(67)
});


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(121);
var validate = __webpack_require__(54);
var SET = 'Set';

// 23.2 Set Objects
module.exports = __webpack_require__(65)(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var each = __webpack_require__(26)(0);
var redefine = __webpack_require__(20);
var meta = __webpack_require__(38);
var assign = __webpack_require__(97);
var weak = __webpack_require__(123);
var isObject = __webpack_require__(4);
var fails = __webpack_require__(3);
var validate = __webpack_require__(54);
var WEAK_MAP = 'WeakMap';
var getWeak = meta.getWeak;
var isExtensible = Object.isExtensible;
var uncaughtFrozenStore = weak.ufstore;
var tmp = {};
var InternalMap;

var wrapper = function (get) {
  return function WeakMap() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key) {
    if (isObject(key)) {
      var data = getWeak(key);
      if (data === true) return uncaughtFrozenStore(validate(this, WEAK_MAP)).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value) {
    return weak.def(validate(this, WEAK_MAP), key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = __webpack_require__(65)(WEAK_MAP, wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if (fails(function () { return new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7; })) {
  InternalMap = weak.getConstructor(wrapper, WEAK_MAP);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function (key) {
    var proto = $WeakMap.prototype;
    var method = proto[key];
    redefine(proto, key, function (a, b) {
      // store frozen objects on internal weakmap shim
      if (isObject(a) && !isExtensible(a)) {
        if (!this._f) this._f = new InternalMap();
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}


/***/ }),
/* 150 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Symbol__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Util__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Long__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Seq__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__FFT__ = __webpack_require__(370);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__List__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__String__ = __webpack_require__(35);
/* unused harmony export bound */
/* unused harmony export setBound */
/* unused harmony export coeff */
/* unused harmony export coeff64 */
/* unused harmony export setCoeff */
/* unused harmony export pow64 */
/* unused harmony export pow32 */
/* unused harmony export hash */
/* unused harmony export maxInt */
/* unused harmony export minInt */
/* unused harmony export baseBits */
/* unused harmony export baseN */
/* unused harmony export baseMask */
/* unused harmony export baseNi64 */
/* unused harmony export baseMaski64 */
/* unused harmony export baseMaskU */
/* unused harmony export baseMask32A */
/* unused harmony export baseMask32B */
/* unused harmony export baseShift32B */
/* unused harmony export baseMask64A */
/* unused harmony export baseMask64B */
/* unused harmony export baseMask64C */
/* unused harmony export baseShift64B */
/* unused harmony export baseShift64C */
/* unused harmony export divbase */
/* unused harmony export modbase */
/* unused harmony export createN */
/* unused harmony export copyN */
/* unused harmony export normN */
/* unused harmony export boundInt */
/* unused harmony export boundInt64 */
/* unused harmony export boundBase */
/* unused harmony export embed */
/* unused harmony export embed64 */
/* unused harmony export eval32 */
/* unused harmony export eval64 */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return one; });
/* unused harmony export zero */
/* unused harmony export restrictTo */
/* unused harmony export shiftUp */
/* unused harmony export shiftDown */
/* unused harmony export degree */
/* unused harmony export addP */
/* harmony export (immutable) */ __webpack_exports__["h"] = add;
/* unused harmony export subP */
/* harmony export (immutable) */ __webpack_exports__["p"] = sub;
/* harmony export (immutable) */ __webpack_exports__["b"] = isZero;
/* unused harmony export IsZero */
/* harmony export (immutable) */ __webpack_exports__["c"] = isOne;
/* harmony export (immutable) */ __webpack_exports__["k"] = equal;
/* unused harmony export shiftCompare */
/* unused harmony export compare */
/* harmony export (immutable) */ __webpack_exports__["l"] = lt;
/* harmony export (immutable) */ __webpack_exports__["m"] = gt;
/* harmony export (immutable) */ __webpack_exports__["v"] = lte;
/* harmony export (immutable) */ __webpack_exports__["o"] = gte;
/* unused harmony export min */
/* unused harmony export max */
/* unused harmony export contributeArr */
/* harmony export (immutable) */ __webpack_exports__["n"] = scale;
/* unused harmony export mulSchoolBookBothSmall */
/* unused harmony export mulSchoolBookCarry */
/* unused harmony export mulSchoolBookOneSmall */
/* unused harmony export mulSchoolBookNeitherSmall */
/* unused harmony export mulSchoolBook */
/* unused harmony export encoding */
/* unused harmony export mkEncoding */
/* unused harmony export table */
/* unused harmony export calculateTableTow */
/* unused harmony export encodingGivenResultBits */
/* unused harmony export bitmask */
/* unused harmony export twopowers */
/* unused harmony export twopowersI64 */
/* unused harmony export wordBits */
/* unused harmony export bits */
/* unused harmony export extractBits */
/* unused harmony export encodePoly */
/* unused harmony export decodeResultBits */
/* unused harmony export decodePoly */
/* unused harmony export quickMulUsingFft */
/* unused harmony export minDigitsKaratsuba */
/* unused harmony export recMulKaratsuba */
/* unused harmony export mulKaratsuba */
/* unused harmony export productDigitsUpperSchoolBook */
/* unused harmony export singleDigitForceSchoolBook */
/* unused harmony export productDigitsUpperFft */
/* harmony export (immutable) */ __webpack_exports__["q"] = mul;
/* unused harmony export scaleSubInPlace */
/* unused harmony export scaleSub */
/* unused harmony export scaleAddInPlace */
/* unused harmony export scaleAdd */
/* unused harmony export removeFactor */
/* harmony export (immutable) */ __webpack_exports__["r"] = divmod;
/* unused harmony export div */
/* harmony export (immutable) */ __webpack_exports__["B"] = rem;
/* harmony export (immutable) */ __webpack_exports__["s"] = bitAnd;
/* harmony export (immutable) */ __webpack_exports__["t"] = bitOr;
/* harmony export (immutable) */ __webpack_exports__["u"] = hcf;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "C", function() { return two; });
/* unused harmony export powi */
/* harmony export (immutable) */ __webpack_exports__["D"] = pow;
/* harmony export (immutable) */ __webpack_exports__["y"] = toFloat;
/* harmony export (immutable) */ __webpack_exports__["f"] = ofInt32;
/* harmony export (immutable) */ __webpack_exports__["g"] = ofInt64;
/* harmony export (immutable) */ __webpack_exports__["w"] = toUInt32;
/* harmony export (immutable) */ __webpack_exports__["x"] = toUInt64;
/* harmony export (immutable) */ __webpack_exports__["e"] = toString;
/* harmony export (immutable) */ __webpack_exports__["z"] = ofString;
/* harmony export (immutable) */ __webpack_exports__["d"] = isSmall;
/* harmony export (immutable) */ __webpack_exports__["j"] = getSmall;
/* harmony export (immutable) */ __webpack_exports__["A"] = factorial;








var BigNat = (function () {
    function BigNat(bound, digits) {
        this.bound = bound;
        this.digits = digits;
    }
    BigNat.prototype[__WEBPACK_IMPORTED_MODULE_0__Symbol__["default"].reflection] = function () {
        return {
            type: "Microsoft.FSharp.Math.BigNat",
            interfaces: ["FSharpRecord"],
            properties: {
                bound: "number",
                digits: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Util__["Array"])(Int32Array, true)
            }
        };
    };
    return BigNat;
}());
/* harmony default export */ __webpack_exports__["a"] = (BigNat);
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Symbol__["setType"])("Microsoft.FSharp.Math.BigNat", BigNat);
function bound(n) {
    return n.bound;
}
function setBound(n, v) {
    n.bound = v;
}
function coeff(n, i) {
    return n.digits[i];
}
function coeff64(n, i) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Long__["a" /* fromNumber */])(coeff(n, i), false);
}
function setCoeff(n, i, v) {
    n.digits[i] = v;
}
function pow64(x, n) {
    if (n === 0) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Long__["b" /* fromBits */])(1, 0, false);
    }
    else if (n % 2 === 0) {
        return pow64(x.mul(x), ~~(n / 2));
    }
    else {
        return x.mul(pow64(x.mul(x), ~~(n / 2)));
    }
}
function pow32(x, n) {
    if (n === 0) {
        return 1;
    }
    else if (n % 2 === 0) {
        return pow32(x * x, ~~(n / 2));
    }
    else {
        return x * pow32(x * x, ~~(n / 2));
    }
}
function hash(n) {
    var res = 0;
    for (var i = 0; i <= n.bound - 1; i++) {
        res = n.digits[i] + (res << 3);
    }
    return res;
}
function maxInt(a, b) {
    if (a < b) {
        return b;
    }
    else {
        return a;
    }
}
function minInt(a, b) {
    if (a < b) {
        return a;
    }
    else {
        return b;
    }
}
var baseBits = 24;
var baseN = 16777216;
var baseMask = 16777215;
var baseNi64 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Long__["b" /* fromBits */])(16777216, 0, false);
var baseMaski64 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Long__["b" /* fromBits */])(16777215, 0, false);
var baseMaskU = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Long__["b" /* fromBits */])(16777215, 0, true);
var baseMask32A = 16777215;
var baseMask32B = 255;
var baseShift32B = 24;
var baseMask64A = 16777215;
var baseMask64B = 16777215;
var baseMask64C = 65535;
var baseShift64B = 24;
var baseShift64C = 48;
function divbase(x) {
    return ~~(x >>> 0 >> baseBits);
}
function modbase(x) {
    return x & baseMask;
}
function createN(b) {
    return new BigNat(b, new Int32Array(b));
}
function copyN(x) {
    return new BigNat(x.bound, x.digits.slice());
}
function normN(n) {
    var findLeastBound = function (na) { return function (i) {
        if (i === -1 ? true : na[i] !== 0) {
            return i + 1;
        }
        else {
            return findLeastBound(na)(i - 1);
        }
    }; };
    var bound_1 = findLeastBound(n.digits)(n.bound - 1);
    n.bound = bound_1;
    return n;
}
var boundInt = 2;
var boundInt64 = 3;
var boundBase = 1;
function embed(x) {
    var x_1 = x < 0 ? 0 : x;
    if (x_1 < baseN) {
        var r = createN(1);
        r.digits[0] = x_1;
        return normN(r);
    }
    else {
        var r = createN(boundInt);
        for (var i = 0; i <= boundInt - 1; i++) {
            r.digits[i] = ~~(x_1 / pow32(baseN, i)) % baseN;
        }
        return normN(r);
    }
}
function embed64(x) {
    var x_1 = x.CompareTo(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Long__["b" /* fromBits */])(0, 0, false)) < 0 ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Long__["b" /* fromBits */])(0, 0, false) : x;
    var r = createN(boundInt64);
    for (var i = 0; i <= boundInt64 - 1; i++) {
        r.digits[i] = ~~x_1.div(pow64(baseNi64, i)).mod(baseNi64).toNumber();
    }
    return normN(r);
}
function eval32(n) {
    if (n.bound === 1) {
        return n.digits[0];
    }
    else {
        var acc = 0;
        for (var i = n.bound - 1; i >= 0; i--) {
            acc = n.digits[i] + baseN * acc;
        }
        return acc;
    }
}
function eval64(n) {
    if (n.bound === 1) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Long__["a" /* fromNumber */])(n.digits[0], false);
    }
    else {
        var acc = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Long__["b" /* fromBits */])(0, 0, false);
        for (var i = n.bound - 1; i >= 0; i--) {
            acc = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Long__["a" /* fromNumber */])(n.digits[i], false).add(baseNi64.mul(acc));
        }
        return acc;
    }
}
var one = embed(1);
var zero = embed(0);
function restrictTo(d, n) {
    return new BigNat(minInt(d, n.bound), n.digits);
}
function shiftUp(d, n) {
    var m = createN(n.bound + d);
    for (var i = 0; i <= n.bound - 1; i++) {
        m.digits[i + d] = n.digits[i];
    }
    return m;
}
function shiftDown(d, n) {
    if (n.bound - d <= 0) {
        return zero;
    }
    else {
        var m = createN(n.bound - d);
        for (var i = 0; i <= m.bound - 1; i++) {
            m.digits[i] = n.digits[i + d];
        }
        return m;
    }
}
function degree(n) {
    return n.bound - 1;
}
function addP(i, n, c, p, q, r) {
    if (i < n) {
        var x = (function () {
            var $var2 = i;
            var $var1 = p;
            if ($var2 < $var1.bound) {
                return $var1.digits[$var2];
            }
            else {
                return 0;
            }
        })() + (function () {
            var $var4 = i;
            var $var3 = q;
            if ($var4 < $var3.bound) {
                return $var3.digits[$var4];
            }
            else {
                return 0;
            }
        })() + c;
        r.digits[i] = modbase(x);
        var c_1 = divbase(x);
        addP(i + 1, n, c_1, p, q, r);
    }
}
function add(p, q) {
    var rbound = 1 + maxInt(p.bound, q.bound);
    var r = createN(rbound);
    var carry = 0;
    addP(0, rbound, carry, p, q, r);
    return normN(r);
}
function subP(i, n, c, p, q, r) {
    if (i < n) {
        var x = (function () {
            var $var6 = i;
            var $var5 = p;
            if ($var6 < $var5.bound) {
                return $var5.digits[$var6];
            }
            else {
                return 0;
            }
        })() - (function () {
            var $var8 = i;
            var $var7 = q;
            if ($var8 < $var7.bound) {
                return $var7.digits[$var8];
            }
            else {
                return 0;
            }
        })() + c;
        if (x > 0) {
            r.digits[i] = modbase(x);
            var c_1 = divbase(x);
            return subP(i + 1, n, c_1, p, q, r);
        }
        else {
            var x_1 = x + baseN;
            r.digits[i] = modbase(x_1);
            var c_1 = divbase(x_1) - 1;
            return subP(i + 1, n, c_1, p, q, r);
        }
    }
    else {
        var underflow = c !== 0;
        return underflow;
    }
}
function sub(p, q) {
    var rbound = maxInt(p.bound, q.bound);
    var r = createN(rbound);
    var carry = 0;
    var underflow = subP(0, rbound, carry, p, q, r);
    if (underflow) {
        return embed(0);
    }
    else {
        return normN(r);
    }
}
function isZero(p) {
    return p.bound === 0;
}
function IsZero(p) {
    return isZero(p);
}
function isOne(p) {
    if (p.bound === 1) {
        return p.digits[0] === 1;
    }
    else {
        return false;
    }
}
function equal(p, q) {
    if (p.bound === q.bound) {
        var check_1 = function (pa) { return function (qa) { return function (i) {
            if (i === -1) {
                return true;
            }
            else if (pa[i] === qa[i]) {
                return check_1(pa)(qa)(i - 1);
            }
            else {
                return false;
            }
        }; }; };
        return check_1(p.digits)(q.digits)(p.bound - 1);
    }
    else {
        return false;
    }
}
function shiftCompare(p, pn, q, qn) {
    if (p.bound + pn < q.bound + qn) {
        return -1;
    }
    else if (p.bound + pn > q.bound + pn) {
        return 1;
    }
    else {
        var check_2 = function (pa) { return function (qa) { return function (i) {
            if (i === -1) {
                return 0;
            }
            else {
                var pai = i < pn ? 0 : pa[i - pn];
                var qai = i < qn ? 0 : qa[i - qn];
                if (pai === qai) {
                    return check_2(pa)(qa)(i - 1);
                }
                else if (pai < qai) {
                    return -1;
                }
                else {
                    return 1;
                }
            }
        }; }; };
        return check_2(p.digits)(q.digits)(p.bound + pn - 1);
    }
}
function compare(p, q) {
    if (p.bound < q.bound) {
        return -1;
    }
    else if (p.bound > q.bound) {
        return 1;
    }
    else {
        var check_3 = function (pa) { return function (qa) { return function (i) {
            if (i === -1) {
                return 0;
            }
            else if (pa[i] === qa[i]) {
                return check_3(pa)(qa)(i - 1);
            }
            else if (pa[i] < qa[i]) {
                return -1;
            }
            else {
                return 1;
            }
        }; }; };
        return check_3(p.digits)(q.digits)(p.bound - 1);
    }
}
function lt(p, q) {
    return compare(p, q) === -1;
}
function gt(p, q) {
    return compare(p, q) === 1;
}
function lte(p, q) {
    return compare(p, q) !== 1;
}
function gte(p, q) {
    return compare(p, q) !== -1;
}
function min(a, b) {
    if (lt(a, b)) {
        return a;
    }
    else {
        return b;
    }
}
function max(a, b) {
    if (lt(a, b)) {
        return b;
    }
    else {
        return a;
    }
}
function contributeArr(a, i, c) {
    var x = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Long__["a" /* fromNumber */])(a[i], false).add(c);
    var c_1 = x.div(baseNi64);
    var x_1 = ~~x.and(baseMaski64).toNumber();
    a[i] = x_1;
    if (c_1.CompareTo(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Long__["b" /* fromBits */])(0, 0, false)) > 0) {
        contributeArr(a, i + 1, c_1);
    }
}
function scale(k, p) {
    var rbound = p.bound + boundInt;
    var r = createN(rbound);
    var k_1 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Long__["a" /* fromNumber */])(k, false);
    for (var i = 0; i <= p.bound - 1; i++) {
        var kpi = k_1.mul(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Long__["a" /* fromNumber */])(p.digits[i], false));
        contributeArr(r.digits, i, kpi);
    }
    return normN(r);
}
function mulSchoolBookBothSmall(p, q) {
    var r = createN(2);
    var rak = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Long__["a" /* fromNumber */])(p, false).mul(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Long__["a" /* fromNumber */])(q, false));
    setCoeff(r, 0, ~~rak.and(baseMaski64).toNumber());
    setCoeff(r, 1, ~~rak.div(baseNi64).toNumber());
    return normN(r);
}
function mulSchoolBookCarry(r, c, k) {
    if (c.CompareTo(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Long__["b" /* fromBits */])(0, 0, false)) > 0) {
        var rak = coeff64(r, k).add(c);
        setCoeff(r, k, ~~rak.and(baseMaski64).toNumber());
        mulSchoolBookCarry(r, rak.div(baseNi64), k + 1);
    }
}
function mulSchoolBookOneSmall(p, q) {
    var bp = bound(p);
    var rbound = bp + 1;
    var r = createN(rbound);
    var q_1 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Long__["a" /* fromNumber */])(q, false);
    var c = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Long__["b" /* fromBits */])(0, 0, false);
    for (var i = 0; i <= bp - 1; i++) {
        var rak = c.add(coeff64(r, i)).add(coeff64(p, i).mul(q_1));
        setCoeff(r, i, ~~rak.and(baseMaski64).toNumber());
        c = rak.div(baseNi64);
    }
    mulSchoolBookCarry(r, c, bp);
    return normN(r);
}
function mulSchoolBookNeitherSmall(p, q) {
    var rbound = p.bound + q.bound;
    var r = createN(rbound);
    for (var i = 0; i <= p.bound - 1; i++) {
        var pai = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Long__["a" /* fromNumber */])(p.digits[i], false);
        var c = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Long__["b" /* fromBits */])(0, 0, false);
        var k = i;
        for (var j = 0; j <= q.bound - 1; j++) {
            var qaj = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Long__["a" /* fromNumber */])(q.digits[j], false);
            var rak = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Long__["a" /* fromNumber */])(r.digits[k], false).add(c).add(pai.mul(qaj));
            r.digits[k] = ~~rak.and(baseMaski64).toNumber();
            c = rak.div(baseNi64);
            k = k + 1;
        }
        mulSchoolBookCarry(r, c, k);
    }
    return normN(r);
}
function mulSchoolBook(p, q) {
    var pSmall = bound(p) === 1;
    var qSmall = bound(q) === 1;
    if (pSmall ? qSmall : false) {
        return mulSchoolBookBothSmall(coeff(p, 0), coeff(q, 0));
    }
    else if (pSmall) {
        return mulSchoolBookOneSmall(q, coeff(p, 0));
    }
    else if (qSmall) {
        return mulSchoolBookOneSmall(p, coeff(q, 0));
    }
    else {
        return mulSchoolBookNeitherSmall(p, q);
    }
}
var encoding = (function () {
    function encoding(bigL, twoToBigL, k, bigK, bigN, split, splits) {
        this.bigL = bigL;
        this.twoToBigL = twoToBigL;
        this.k = k;
        this.bigK = bigK;
        this.bigN = bigN;
        this.split = split;
        this.splits = splits;
    }
    encoding.prototype[__WEBPACK_IMPORTED_MODULE_0__Symbol__["default"].reflection] = function () {
        return {
            type: "Microsoft.FSharp.Math.BigNatModule.encoding",
            interfaces: ["FSharpRecord"],
            properties: {
                bigL: "number",
                twoToBigL: "number",
                k: "number",
                bigK: "number",
                bigN: "number",
                split: "number",
                splits: Int32Array
            }
        };
    };
    return encoding;
}());

__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Symbol__["setType"])("Microsoft.FSharp.Math.BigNatModule.encoding", encoding);
function mkEncoding(bigL, k, bigK, bigN) {
    return new encoding(bigL, pow32(2, bigL), k, bigK, bigN, ~~(baseBits / bigL), Int32Array.from(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__Seq__["initialize"])(~~(baseBits / bigL), function (i) { return pow32(2, bigL * i); })));
}
var table = [mkEncoding(1, 28, 268435456, 268435456), mkEncoding(2, 26, 67108864, 134217728), mkEncoding(3, 24, 16777216, 50331648), mkEncoding(4, 22, 4194304, 16777216), mkEncoding(5, 20, 1048576, 5242880), mkEncoding(6, 18, 262144, 1572864), mkEncoding(7, 16, 65536, 458752), mkEncoding(8, 14, 16384, 131072), mkEncoding(9, 12, 4096, 36864), mkEncoding(10, 10, 1024, 10240), mkEncoding(11, 8, 256, 2816), mkEncoding(12, 6, 64, 768), mkEncoding(13, 4, 16, 208)];
function calculateTableTow(bigL) {
    var k = __WEBPACK_IMPORTED_MODULE_4__FFT__["a" /* maxBitsInsideFp */] - 2 * bigL;
    var bigK = pow64(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Long__["b" /* fromBits */])(2, 0, false), k);
    var N = bigK.mul(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Long__["a" /* fromNumber */])(bigL, false));
    return [bigL, k, bigK, N];
}
function encodingGivenResultBits(bitsRes) {
    var selectFrom = function (i) {
        if (i + 1 < table.length ? bitsRes < table[i + 1].bigN : false) {
            return selectFrom(i + 1);
        }
        else {
            return table[i];
        }
    };
    if (bitsRes >= table[0].bigN) {
        throw new Error("Product is huge, around 268435456 bits, beyond quickmul");
    }
    else {
        return selectFrom(0);
    }
}
var bitmask = Int32Array.from(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__Seq__["initialize"])(baseBits, function (i) { return pow32(2, i) - 1; }));
var twopowers = Int32Array.from(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__Seq__["initialize"])(baseBits, function (i) { return pow32(2, i); }));
var twopowersI64 = Array.from(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__Seq__["initialize"])(baseBits, function (i) { return pow64(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Long__["b" /* fromBits */])(2, 0, false), i); }));
function wordBits(word) {
    var hi = function (k) {
        if (k === 0) {
            return 0;
        }
        else if ((word & twopowers[k - 1]) !== 0) {
            return k;
        }
        else {
            return hi(k - 1);
        }
    };
    return hi(baseBits);
}
function bits(u) {
    if (u.bound === 0) {
        return 0;
    }
    else {
        return degree(u) * baseBits + wordBits(u.digits[degree(u)]);
    }
}
function extractBits(n, enc, bi) {
    var bj = bi + enc.bigL - 1;
    var biw = ~~(bi / baseBits);
    var bjw = ~~(bj / baseBits);
    if (biw !== bjw) {
        var x = (function () {
            var $var10 = biw;
            var $var9 = n;
            if ($var10 < $var9.bound) {
                return $var9.digits[$var10];
            }
            else {
                return 0;
            }
        })();
        var y = (function () {
            var $var12 = bjw;
            var $var11 = n;
            if ($var12 < $var11.bound) {
                return $var11.digits[$var12];
            }
            else {
                return 0;
            }
        })();
        var xbit = bi % baseBits;
        var nxbits = baseBits - xbit;
        var x_1 = x >> xbit;
        var y_1 = y << nxbits;
        var x_2 = x_1 | y_1;
        var x_3 = x_2 & bitmask[enc.bigL];
        return x_3;
    }
    else {
        var x = (function () {
            var $var14 = biw;
            var $var13 = n;
            if ($var14 < $var13.bound) {
                return $var13.digits[$var14];
            }
            else {
                return 0;
            }
        })();
        var xbit = bi % baseBits;
        var x_1 = x >> xbit;
        var x_2 = x_1 & bitmask[enc.bigL];
        return x_2;
    }
}
function encodePoly(enc, n) {
    var poly = Uint32Array.from(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__Seq__["replicate"])(enc.bigK, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__FFT__["b" /* ofInt32 */])(0)));
    var biMax = n.bound * baseBits;
    var encoder = function (i) { return function (bi) {
        if (i === enc.bigK ? true : bi > biMax) { }
        else {
            var pi = extractBits(n, enc, bi);
            poly[i] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__FFT__["b" /* ofInt32 */])(pi);
            var i_1 = i + 1;
            var bi_1 = bi + enc.bigL;
            encoder(i_1)(bi_1);
        }
    }; };
    encoder(0)(0);
    return poly;
}
function decodeResultBits(enc, poly) {
    var n = 0;
    for (var i = 0; i <= poly.length - 1; i++) {
        if (poly[i] !== __WEBPACK_IMPORTED_MODULE_4__FFT__["c" /* mzero */]) {
            n = i;
        }
    }
    var rbits = __WEBPACK_IMPORTED_MODULE_4__FFT__["a" /* maxBitsInsideFp */] + enc.bigL * n + 1;
    return rbits + 1;
}
function decodePoly(enc, poly) {
    var rbound = ~~(decodeResultBits(enc, poly) / baseBits) + 1;
    var r = createN(rbound);
    var evaluate = function (i) { return function (j) { return function (d) {
        if (i === enc.bigK) { }
        else {
            if (j >= rbound) { }
            else {
                var x = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Long__["a" /* fromNumber */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__FFT__["d" /* toInt */])(poly[i]), false).mul(twopowersI64[d]);
                contributeArr(r.digits, j, x);
            }
            var i_1 = i + 1;
            var d_1 = d + enc.bigL;
            var patternInput = d_1 >= baseBits ? [j + 1, d_1 - baseBits] : [j, d_1];
            evaluate(i_1)(patternInput[0])(patternInput[1]);
        }
    }; }; };
    evaluate(0)(0)(0);
    return normN(r);
}
function quickMulUsingFft(u, v) {
    var bitsRes = bits(u) + bits(v);
    var enc = encodingGivenResultBits(bitsRes);
    var upoly = encodePoly(enc, u);
    var vpoly = encodePoly(enc, v);
    var rpoly = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__FFT__["e" /* computeFftPaddedPolynomialProduct */])(enc.bigK, enc.k, upoly, vpoly);
    var r = decodePoly(enc, rpoly);
    return normN(r);
}
var minDigitsKaratsuba = 16;
function recMulKaratsuba(mul, p, q) {
    var bp = p.bound;
    var bq = q.bound;
    var bmax = maxInt(bp, bq);
    if (bmax > minDigitsKaratsuba) {
        var k = ~~(bmax / 2);
        var a0 = restrictTo(k, p);
        var a1 = shiftDown(k, p);
        var b0 = restrictTo(k, q);
        var b1 = shiftDown(k, q);
        var q0 = mul(a0)(b0);
        var q1 = mul(add(a0, a1))(add(b0, b1));
        var q2 = mul(a1)(b1);
        var p1 = sub(q1, add(q0, q2));
        var r = add(q0, shiftUp(k, add(p1, shiftUp(k, q2))));
        return r;
    }
    else {
        return mulSchoolBook(p, q);
    }
}
function mulKaratsuba(x, y) {
    return recMulKaratsuba(function (x_1) { return function (y_1) { return mulKaratsuba(x_1, y_1); }; }, x, y);
}
var productDigitsUpperSchoolBook = ~~(64000 / baseBits);
var singleDigitForceSchoolBook = ~~(32000 / baseBits);
var productDigitsUpperFft = ~~(table[0].bigN / baseBits);
function mul(p, q) {
    return mulSchoolBook(p, q);
}
function scaleSubInPlace(x, f, a, n) {
    var invariant = function (tupledArg) { };
    var patternInput = [x.digits, degree(x)];
    var patternInput_1 = [a.digits, degree(a)];
    var f_1 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Long__["a" /* fromNumber */])(f, false);
    var j = 0;
    var z = f_1.mul(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Long__["a" /* fromNumber */])(patternInput_1[0][0], false));
    while (z.CompareTo(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Long__["b" /* fromBits */])(0, 0, false)) > 0 ? true : j < patternInput_1[1]) {
        if (j > patternInput[1]) {
            throw new Error("scaleSubInPlace: pre-condition did not apply, result would be -ve");
        }
        invariant([z, j, n]);
        var zLo = ~~z.and(baseMaski64).toNumber();
        var zHi = z.div(baseNi64);
        if (zLo <= patternInput[0][j + n]) {
            patternInput[0][j + n] = patternInput[0][j + n] - zLo;
        }
        else {
            patternInput[0][j + n] = patternInput[0][j + n] + (baseN - zLo);
            zHi = zHi.add(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Long__["b" /* fromBits */])(1, 0, false));
        }
        if (j < patternInput_1[1]) {
            z = zHi.add(f_1.mul(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Long__["a" /* fromNumber */])(patternInput_1[0][j + 1], false)));
        }
        else {
            z = zHi;
        }
        j = j + 1;
    }
    normN(x);
}
function scaleSub(x, f, a, n) {
    var freshx = add(x, zero);
    scaleSubInPlace(freshx, f, a, n);
    return normN(freshx);
}
function scaleAddInPlace(x, f, a, n) {
    var invariant = function (tupledArg) { };
    var patternInput = [x.digits, degree(x)];
    var patternInput_1 = [a.digits, degree(a)];
    var f_1 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Long__["a" /* fromNumber */])(f, false);
    var j = 0;
    var z = f_1.mul(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Long__["a" /* fromNumber */])(patternInput_1[0][0], false));
    while (z.CompareTo(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Long__["b" /* fromBits */])(0, 0, false)) > 0 ? true : j < patternInput_1[1]) {
        if (j > patternInput[1]) {
            throw new Error("scaleSubInPlace: pre-condition did not apply, result would be -ve");
        }
        invariant([z, j, n]);
        var zLo = ~~z.and(baseMaski64).toNumber();
        var zHi = z.div(baseNi64);
        if (zLo < baseN - patternInput[0][j + n]) {
            patternInput[0][j + n] = patternInput[0][j + n] + zLo;
        }
        else {
            patternInput[0][j + n] = zLo - (baseN - patternInput[0][j + n]);
            zHi = zHi.add(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Long__["b" /* fromBits */])(1, 0, false));
        }
        if (j < patternInput_1[1]) {
            z = zHi.add(f_1.mul(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Long__["a" /* fromNumber */])(patternInput_1[0][j + 1], false)));
        }
        else {
            z = zHi;
        }
        j = j + 1;
    }
    normN(x);
}
function scaleAdd(x, f, a, n) {
    var freshx = add(x, zero);
    scaleAddInPlace(freshx, f, a, n);
    return normN(freshx);
}
function removeFactor(x, a, n) {
    var patternInput = [degree(a), degree(x)];
    if (patternInput[1] < patternInput[0] + n) {
        return 0;
    }
    else {
        var patternInput_1 = [a.digits, x.digits];
        var f = patternInput[0] === 0
            ? patternInput[1] === n
                ? ~~(patternInput_1[1][n] / patternInput_1[0][0])
                : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Long__["a" /* fromNumber */])(patternInput_1[1][patternInput[1]], false).mul(baseNi64).add(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Long__["a" /* fromNumber */])(patternInput_1[1][patternInput[1] - 1], false)).div(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Long__["a" /* fromNumber */])(patternInput_1[0][0], false)).toNumber()
            : patternInput[1] === patternInput[0] + n
                ? ~~(patternInput_1[1][patternInput[1]] / (patternInput_1[0][patternInput[0]] + 1))
                : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Long__["a" /* fromNumber */])(patternInput_1[1][patternInput[1]], false).mul(baseNi64).add(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Long__["a" /* fromNumber */])(patternInput_1[1][patternInput[1] - 1], false)).div(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Long__["a" /* fromNumber */])(patternInput_1[0][patternInput[0]], false).add(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Long__["b" /* fromBits */])(1, 0, false))).toNumber();
        if (f === 0) {
            var lte_1 = shiftCompare(a, n, x, 0) !== 1;
            if (lte_1) {
                return 1;
            }
            else {
                return 0;
            }
        }
        else {
            return f;
        }
    }
}
function divmod(b, a) {
    if (isZero(a)) {
        throw new Error();
    }
    else if (degree(b) < degree(a)) {
        return [zero, b];
    }
    else {
        var x = copyN(b);
        var d = createN(degree(b) - degree(a) + 1 + 1);
        var p = degree(b);
        var m = degree(a);
        var n = p - m;
        var Invariant = function (tupledArg) { };
        var finished = false;
        while (!finished) {
            Invariant([d, x, n, p]);
            var f = removeFactor(x, a, n);
            if (f > 0) {
                scaleSubInPlace(x, f, a, n);
                scaleAddInPlace(d, f, one, n);
                Invariant([d, x, n, p]);
            }
            else {
                if (f === 0) {
                    finished = n === 0;
                }
                else {
                    finished = false;
                }
                if (!finished) {
                    if (p === m + n) {
                        Invariant([d, x, n - 1, p]);
                        n = n - 1;
                    }
                    else {
                        Invariant([d, x, n - 1, p - 1]);
                        n = n - 1;
                        p = p - 1;
                    }
                }
            }
        }
        return [normN(d), normN(x)];
    }
}
function div(b, a) {
    return divmod(b, a)[0];
}
function rem(b, a) {
    return divmod(b, a)[1];
}
function bitAnd(a, b) {
    var rbound = minInt(a.bound, b.bound);
    var r = createN(rbound);
    for (var i = 0; i <= r.bound - 1; i++) {
        r.digits[i] = a.digits[i] & b.digits[i];
    }
    return normN(r);
}
function bitOr(a, b) {
    var rbound = maxInt(a.bound, b.bound);
    var r = createN(rbound);
    for (var i = 0; i <= a.bound - 1; i++) {
        r.digits[i] = r.digits[i] | a.digits[i];
    }
    for (var i = 0; i <= b.bound - 1; i++) {
        r.digits[i] = r.digits[i] | b.digits[i];
    }
    return normN(r);
}
function hcf(a, b) {
    var hcfloop = function (a_1) { return function (b_1) {
        if (equal(zero, a_1)) {
            return b_1;
        }
        else {
            var patternInput = divmod(b_1, a_1);
            return hcfloop(patternInput[1])(a_1);
        }
    }; };
    if (lt(a, b)) {
        return hcfloop(a)(b);
    }
    else {
        return hcfloop(b)(a);
    }
}
var two = embed(2);
function powi(x, n) {
    var power = function (acc) { return function (x_1) { return function (n_1) {
        if (n_1 === 0) {
            return acc;
        }
        else if (n_1 % 2 === 0) {
            return power(acc)(mul(x_1, x_1))(~~(n_1 / 2));
        }
        else {
            return power(mul(x_1, acc))(mul(x_1, x_1))(~~(n_1 / 2));
        }
    }; }; };
    return power(one)(x)(n);
}
function pow(x, n) {
    var power = function (acc) { return function (x_1) { return function (n_1) {
        if (isZero(n_1)) {
            return acc;
        }
        else {
            var patternInput = divmod(n_1, two);
            if (isZero(patternInput[1])) {
                return power(acc)(mul(x_1, x_1))(patternInput[0]);
            }
            else {
                return power(mul(x_1, acc))(mul(x_1, x_1))(patternInput[0]);
            }
        }
    }; }; };
    return power(one)(x)(n);
}
function toFloat(n) {
    var basef = baseN;
    var evalFloat = function (acc) { return function (k) { return function (i) {
        if (i === n.bound) {
            return acc;
        }
        else {
            return evalFloat(acc + k * n.digits[i])(k * basef)(i + 1);
        }
    }; }; };
    return evalFloat(0)(1)(0);
}
function ofInt32(n) {
    return embed(n);
}
function ofInt64(n) {
    return embed64(n);
}
function toUInt32(n) {
    var matchValue = n.bound;
    var $var15 = null;
    switch (matchValue) {
        case 0:
            {
                $var15 = 0;
                break;
            }
        case 1:
            {
                $var15 = n.digits[0] >>> 0;
                break;
            }
        case 2:
            {
                {
                    var patternInput = [n.digits[0], n.digits[1]];
                    if (patternInput[1] > baseMask32B) {
                        throw new Error();
                    }
                    $var15 = ((patternInput[0] & baseMask32A) >>> 0) + ((patternInput[1] & baseMask32B) >>> 0 << baseShift32B);
                }
                break;
            }
        default:
            {
                throw new Error();
            }
    }
    return $var15;
}
function toUInt64(n) {
    var matchValue = n.bound;
    var $var16 = null;
    switch (matchValue) {
        case 0:
            {
                $var16 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Long__["b" /* fromBits */])(0, 0, true);
                break;
            }
        case 1:
            {
                $var16 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Long__["a" /* fromNumber */])(n.digits[0], true);
                break;
            }
        case 2:
            {
                {
                    var patternInput = [n.digits[0], n.digits[1]];
                    $var16 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Long__["a" /* fromNumber */])(patternInput[0] & baseMask64A, true).add(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Long__["a" /* fromNumber */])(patternInput[1] & baseMask64B, true).shl(baseShift64B));
                }
                break;
            }
        case 3:
            {
                {
                    var patternInput = [n.digits[0], n.digits[1], n.digits[2]];
                    if (patternInput[2] > baseMask64C) {
                        throw new Error();
                    }
                    $var16 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Long__["a" /* fromNumber */])(patternInput[0] & baseMask64A, true).add(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Long__["a" /* fromNumber */])(patternInput[1] & baseMask64B, true).shl(baseShift64B)).add(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Long__["a" /* fromNumber */])(patternInput[2] & baseMask64C, true).shl(baseShift64C));
                }
                break;
            }
        default:
            {
                throw new Error();
            }
    }
    return $var16;
}
function toString(n) {
    var degn = degree(n);
    var route = function (prior) { return function (k) { return function (ten2k) {
        if (degree(ten2k) > degn) {
            return new __WEBPACK_IMPORTED_MODULE_5__List__["default"]([k, ten2k], prior);
        }
        else {
            return route(new __WEBPACK_IMPORTED_MODULE_5__List__["default"]([k, ten2k], prior))(k + 1)(mul(ten2k, ten2k));
        }
    }; }; };
    var kten2ks = route(new __WEBPACK_IMPORTED_MODULE_5__List__["default"]())(0)(embed(10));
    var collect = function (isLeading) { return function (digits) { return function (n_1) { return function (_arg1) {
        if (_arg1.tail != null) {
            var ten2k = _arg1.head[1];
            var patternInput = divmod(n_1, ten2k);
            if (isLeading ? isZero(patternInput[0]) : false) {
                var digits_1 = collect(isLeading)(digits)(patternInput[1])(_arg1.tail);
                return digits_1;
            }
            else {
                var digits_1 = collect(false)(digits)(patternInput[1])(_arg1.tail);
                var digits_2 = collect(isLeading)(digits_1)(patternInput[0])(_arg1.tail);
                return digits_2;
            }
        }
        else {
            var n_2 = eval32(n_1);
            if (isLeading ? n_2 === 0 : false) {
                return digits;
            }
            else {
                return new __WEBPACK_IMPORTED_MODULE_5__List__["default"](String(n_2), digits);
            }
        }
    }; }; }; };
    var digits = collect(true)(new __WEBPACK_IMPORTED_MODULE_5__List__["default"]())(n)(kten2ks);
    if (digits.tail == null) {
        return "0";
    }
    else {
        return __WEBPACK_IMPORTED_MODULE_6__String__["join"].apply(void 0, [""].concat(Array.from(digits)));
    }
}
function ofString(str) {
    var len = str.length;
    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__String__["isNullOrEmpty"])(str)) {
        throw new Error("empty string" + '\nParameter name: ' + "str");
    }
    var ten = embed(10);
    var build = function (acc) { return function (i) {
        if (i === len) {
            return acc;
        }
        else {
            var c = str[i];
            var d = c.charCodeAt(0) - "0".charCodeAt(0);
            if (0 <= d ? d <= 9 : false) {
                return build(add(mul(ten, acc), embed(d)))(i + 1);
            }
            else {
                throw new Error();
            }
        }
    }; };
    return build(embed(0))(0);
}
function isSmall(n) {
    return n.bound <= 1;
}
function getSmall(n) {
    var $var18 = 0;
    var $var17 = n;
    if ($var18 < $var17.bound) {
        return $var17.digits[$var18];
    }
    else {
        return 0;
    }
}
function factorial(n) {
    var productR = function (a) { return function (b) {
        if (equal(a, b)) {
            return a;
        }
        else {
            var m = div(add(a, b), ofInt32(2));
            return mul(productR(a)(m), productR(add(m, one))(b));
        }
    }; };
    return productR(one)(n);
}


/***/ }),
/* 151 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Util__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Long__ = __webpack_require__(60);
/* harmony export (immutable) */ __webpack_exports__["create"] = create;
/* harmony export (immutable) */ __webpack_exports__["fromTicks"] = fromTicks;
/* harmony export (immutable) */ __webpack_exports__["fromDays"] = fromDays;
/* harmony export (immutable) */ __webpack_exports__["fromHours"] = fromHours;
/* harmony export (immutable) */ __webpack_exports__["fromMinutes"] = fromMinutes;
/* harmony export (immutable) */ __webpack_exports__["fromSeconds"] = fromSeconds;
/* harmony export (immutable) */ __webpack_exports__["days"] = days;
/* harmony export (immutable) */ __webpack_exports__["hours"] = hours;
/* harmony export (immutable) */ __webpack_exports__["minutes"] = minutes;
/* harmony export (immutable) */ __webpack_exports__["seconds"] = seconds;
/* harmony export (immutable) */ __webpack_exports__["milliseconds"] = milliseconds;
/* harmony export (immutable) */ __webpack_exports__["ticks"] = ticks;
/* harmony export (immutable) */ __webpack_exports__["totalDays"] = totalDays;
/* harmony export (immutable) */ __webpack_exports__["totalHours"] = totalHours;
/* harmony export (immutable) */ __webpack_exports__["totalMinutes"] = totalMinutes;
/* harmony export (immutable) */ __webpack_exports__["totalSeconds"] = totalSeconds;
/* harmony export (immutable) */ __webpack_exports__["negate"] = negate;
/* harmony export (immutable) */ __webpack_exports__["add"] = add;
/* harmony export (immutable) */ __webpack_exports__["subtract"] = subtract;
/* harmony export (immutable) */ __webpack_exports__["compare"] = compare;
/* harmony export (immutable) */ __webpack_exports__["compareTo"] = compareTo;
/* harmony export (immutable) */ __webpack_exports__["duration"] = duration;


function create(d, h, m, s, ms) {
    if (d === void 0) { d = 0; }
    if (h === void 0) { h = 0; }
    if (m === void 0) { m = 0; }
    if (s === void 0) { s = 0; }
    if (ms === void 0) { ms = 0; }
    switch (arguments.length) {
        case 1:
            return fromTicks(arguments[0]);
        case 3:
            d = 0, h = arguments[0], m = arguments[1], s = arguments[2], ms = 0;
            break;
        default:
            d = arguments[0], h = arguments[1], m = arguments[2], s = arguments[3], ms = arguments[4] || 0;
            break;
    }
    return d * 86400000 + h * 3600000 + m * 60000 + s * 1000 + ms;
}
function fromTicks(ticks) {
    return ticks.div(10000).toNumber();
}
function fromDays(d) {
    return create(d, 0, 0, 0);
}
function fromHours(h) {
    return create(h, 0, 0);
}
function fromMinutes(m) {
    return create(0, m, 0);
}
function fromSeconds(s) {
    return create(0, 0, s);
}
function days(ts) {
    return Math.floor(ts / 86400000);
}
function hours(ts) {
    return Math.floor(ts % 86400000 / 3600000);
}
function minutes(ts) {
    return Math.floor(ts % 3600000 / 60000);
}
function seconds(ts) {
    return Math.floor(ts % 60000 / 1000);
}
function milliseconds(ts) {
    return Math.floor(ts % 1000);
}
function ticks(ts) {
    return __WEBPACK_IMPORTED_MODULE_1__Long__["a" /* fromNumber */](ts).mul(10000);
}
function totalDays(ts) {
    return ts / 86400000;
}
function totalHours(ts) {
    return ts / 3600000;
}
function totalMinutes(ts) {
    return ts / 60000;
}
function totalSeconds(ts) {
    return ts / 1000;
}
function negate(ts) {
    return ts * -1;
}
function add(ts1, ts2) {
    return ts1 + ts2;
}
function subtract(ts1, ts2) {
    return ts1 - ts2;
}
function compare(x, y) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Util__["compare"])(x, y);
}
function compareTo(x, y) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Util__["compare"])(x, y);
}
function duration(x) {
    return Math.abs(x);
}


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(368);
__webpack_require__(166);
__webpack_require__(58);
__webpack_require__(168);
__webpack_require__(145);
__webpack_require__(165);
__webpack_require__(167);
__webpack_require__(172);
__webpack_require__(170);
__webpack_require__(171);
__webpack_require__(173);
__webpack_require__(169);
__webpack_require__(174);
__webpack_require__(175);
__webpack_require__(176);
module.exports = __webpack_require__(15);


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeSpan = makeSpan;
exports.typeNameEl = typeNameEl;
exports.componentNameEl = componentNameEl;
exports.elInfo = elInfo;
exports.makeOffsets = makeOffsets;
exports.getRange = getRange;
exports.getHeaderRange = getHeaderRange;
exports.makeHexRuns = makeHexRuns;
exports.makeStructureHierarchy = makeStructureHierarchy;
exports.makeSchemaDom = makeSchemaDom;
exports.exampleFile = exampleFile;
exports.knownTypeButton = knownTypeButton;

var _Util = __webpack_require__(5);

var _Reader = __webpack_require__(114);

var _String = __webpack_require__(35);

var _Utils = __webpack_require__(115);

var _Seq = __webpack_require__(7);

var _List = __webpack_require__(22);

var _List2 = _interopRequireDefault(_List);

var _Types = __webpack_require__(112);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeSpan(className, text) {
  var el = document.createElement("span");
  el.textContent = text;
  el.className = className;
  return el;
}

function typeNameEl(ty) {
  return (0, _Util.defaultArg)(function (option) {
    return (0, _Util.defaultArg)(option, null, function (ty_1) {
      return (0, _Reader.nameOfType)(ty_1);
    });
  }(ty), null, function (name) {
    var el = document.createElement('a');
    el.textContent = name;
    el.className = "s-type-name";
    el.href = "#t-" + name;
    return el;
  });
}

function componentNameEl(ty) {
  return (0, _Util.defaultArg)((0, _Reader.componentName)(ty), null, function (n) {
    var el = document.createElement("span");
    el.textContent = n;
    el.className = "s-component-name";
    return el;
  });
}

function elInfo(ctx, s, e, header, value, schemaType, isSimpleValue) {
  var elId = (0, _String.fsFormat)("S%d-%d")(function (x) {
    return x;
  })(s)(e);
  var patternInput = void 0;

  if (isSimpleValue) {
    patternInput = [null, null];
  } else {
    var checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.id = "cb-" + elId;
    var label = document.createElement('label');
    label.setAttribute("for", "cb-" + elId);
    patternInput = [checkbox, label];
  }

  var typeName = typeNameEl(schemaType);
  var compName = componentNameEl(schemaType);
  var asnType = (0, _Util.defaultArg)(value, null, function ($var6) {
    return makeSpan("s-asn-type", (0, _Utils.typeStr)($var6));
  });
  var value_1 = (0, _Util.defaultArg)(function (option) {
    return (0, _Util.defaultArg)(option, null, function (asnValue) {
      return (0, _Utils.valueStr)(asnValue);
    });
  }(value), null, function () {
    var className = "s-value";
    return function (text) {
      return makeSpan(className, text);
    };
  }());
  var choiceComponent = void 0;
  var componentType = void 0;
  var matchValue = (0, _Util.defaultArg)(schemaType, null, function (arg00) {
    return ctx.ResolveType(arg00);
  });
  var $var7 = matchValue != null ? matchValue.Kind.Case === "ChoiceType" ? [0, matchValue.Kind.Fields[0]] : [1] : [1];

  switch ($var7[0]) {
    case 0:
      componentType = (0, _Reader.matchChoiceComponent)(ctx, header, $var7[1]);
      break;

    case 1:
      componentType = null;
      break;
  }

  choiceComponent = (0, _Util.defaultArg)(function (option_1) {
    return (0, _Util.defaultArg)(option_1, null, function (ty) {
      return (0, _Reader.nameOfType)(ty);
    });
  }(componentType), null, function (name) {
    var rootEl = document.createElement("span");
    rootEl.className = "s-choice-component";
    var el = document.createElement("span");
    el.textContent = componentType.ComponentName;
    el.className = "s-component-name";
    (0, _Seq.iterate)(function (el_1) {
      (0, _Utils.appendTo)(rootEl, el_1);
    }, function () {
      var typeEl = document.createElement('a');
      typeEl.textContent = name;
      typeEl.className = "s-type-name";
      typeEl.href = "#t-" + name;
      return (0, _List.ofArray)([document.createTextNode("("), el, typeEl, document.createTextNode(")")]);
    }());
    return rootEl;
  });
  var el_2 = document.createElement("div");
  el_2.id = elId;
  (0, _Seq.iterate)(function (el_3) {
    (0, _Utils.appendTo)(el_2, el_3);
  }, (0, _List.choose)(function (x) {
    return x;
  }, (0, _List.ofArray)([patternInput[0], patternInput[1], compName, value_1, typeName, choiceComponent, asnType])));

  if (typeName != null) {
    el_2.typeName = typeName.textContent;
  }

  return el_2;
}

function makeOffsets(byteLength) {
  return (0, _Seq.delay)(function () {
    var lineCount = ~~((byteLength - 1) / 16) + 1;
    return (0, _Seq.collect)(function (i) {
      var div = document.createElement("div");
      div.textContent = (0, _String.padLeft)((i * 16).toString(16).toLocaleUpperCase(), 6, "0");
      return (0, _Seq.singleton)(div);
    }, (0, _Seq.range)(0, lineCount - 1));
  });
}

function getRange(result) {
  var matchValue = (0, _Types.toTuple)(result);
  var $var8 = matchValue[0] != null ? matchValue[0].Case === "InvalidValue" ? [1, matchValue[0].Fields[0]] : [2] : matchValue[1] != null ? [0, matchValue[1]] : [2];

  switch ($var8[0]) {
    case 0:
      return $var8[1].Range;

    case 1:
      return $var8[1].RealRange;

    case 2:
      return null;
  }
}

function getHeaderRange(result) {
  var matchValue = (0, _Types.toTuple)(result);
  var $var9 = matchValue[0] != null ? matchValue[0].Case === "InvalidValue" ? [1, matchValue[0].Fields[0]] : [2] : matchValue[1] != null ? [0, matchValue[1]] : [2];

  switch ($var9[0]) {
    case 0:
      return $var9[1].HeaderRange;

    case 1:
      return $var9[1].HeaderRange;

    case 2:
      return null;
  }
}

function makeHexRuns(asnElement, bytes) {
  var toHexString = function toHexString(tupledArg) {
    return (0, _String.join)(" ", function (array) {
      return Array.from((0, _Seq.map)(function (b) {
        return (0, _Utils.byteToUpperHex)(b);
      }, array));
    }(bytes.slice(tupledArg[0], tupledArg[1] + 1)));
  };

  var makeId = function makeId(tupledArg_1) {
    return (0, _String.fsFormat)("H%d-%d")(function (x) {
      return x;
    })(tupledArg_1[0])(tupledArg_1[1]);
  };

  var makeHexRun = function makeHexRun(tupledArg_2) {
    return function (id) {
      var span = document.createElement("span");
      span.textContent = toHexString([tupledArg_2[0], tupledArg_2[1]]) + " ";
      span.id = id;
      return span;
    };
  };

  var fSimple = function fSimple(result) {
    var range = getRange(result);
    return (0, _Util.defaultArg)(range, null, function (r) {
      return makeHexRun(r)(makeId(r));
    });
  };

  var fCollection = function fCollection(result_1) {
    return function (children) {
      var range_1 = getRange(result_1);
      var headerRange = getHeaderRange(result_1);
      var matchValue = [range_1, headerRange];
      var $var10 = matchValue[0] != null ? matchValue[1] != null ? [0, matchValue[1], matchValue[0]] : [1] : [1];

      switch ($var10[0]) {
        case 0:
          var run = makeHexRun($var10[1])(makeId($var10[2]));
          (0, _Seq.iterate)(function (el) {
            (0, _Utils.appendTo)(run, el);
          }, (0, _Seq.choose)(function (x) {
            return x;
          }, children));
          return run;

        case 1:
          return null;
      }
    };
  };

  return (0, _Utils.cataAsnResult)(fSimple, function () {
    var clo0 = fCollection;
    return function (arg00) {
      var clo1 = clo0(arg00);
      return function (arg10) {
        return clo1(arg10);
      };
    };
  }(), asnElement);
}

function makeStructureHierarchy(ctx, asnResult) {
  var makeErrorElement = function makeErrorElement(errEl) {
    if (errEl.Case === "InvalidHeader") {
      var el = document.createElement("div");
      el.textContent = "Invalid header";
      return el;
    } else if (errEl.Case === "InvalidValue") {
      var range = errEl.Fields[0].RealRange;
      var ex = errEl.Fields[0].Value.Exception;
      var el_1 = void 0;
      var value = null;
      var isSimpleValue = errEl.Fields[0].Value.ChildrenErrors.Equals(new _List2.default());
      el_1 = elInfo(ctx, range[0], range[1], errEl.Fields[0].Header, value, errEl.Fields[0].SchemaType, isSimpleValue);
      var el2 = document.createElement("span");
      el2.classList.add("error-message");
      el2.textContent = "Invalid value" + (function () {
        return ex != null;
      }(null) ? ": " + ex.message : "");
      el_1.appendChild(el2);
      el_1.classList.add("error");
      return el_1;
    } else {
      var el_2 = document.createElement("div");
      el_2.textContent = "No data";
      return el_2;
    }
  };

  var fSimple = function fSimple(result) {
    var $var11 = result.Case === "Both" ? [0, result.Fields[1]] : result.Case === "Left" ? [1] : [0, result.Fields[0]];

    switch ($var11[0]) {
      case 0:
        var tupledArg = getRange(result);
        var value_1 = $var11[1].Value;
        var isSimpleValue_1 = true;
        return elInfo(ctx, tupledArg[0], tupledArg[1], $var11[1].Header, value_1, $var11[1].SchemaType, isSimpleValue_1);

      case 1:
        return makeErrorElement(result.Fields[0]);
    }
  };

  var fCollection = function fCollection(result_1) {
    return function (children) {
      var domEl = void 0;
      var $var12 = result_1.Case === "Both" ? [0, result_1.Fields[1]] : result_1.Case === "Left" ? [1] : [0, result_1.Fields[0]];

      switch ($var12[0]) {
        case 0:
          var tupledArg_1 = getRange(result_1);
          var value_2 = $var12[1].Value;
          var isSimpleValue_2 = false;
          domEl = elInfo(ctx, tupledArg_1[0], tupledArg_1[1], $var12[1].Header, value_2, $var12[1].SchemaType, isSimpleValue_2);
          break;

        case 1:
          domEl = makeErrorElement(result_1.Fields[0]);
          break;
      }

      children.forEach(function (c) {
        domEl.appendChild(c);
      });
      return domEl;
    };
  };

  return (0, _Utils.cataAsnResult)(fSimple, fCollection, asnResult);
}

function makeSchemaDom(info, schema, modules) {
  var schemaRootEl = document.createElement("div");
  schemaRootEl.classList.add("schema");
  schemaRootEl.textContent = schema;
  var textNode = schemaRootEl.childNodes[0];
  var offset = 0;
  console.time("ranges");
  (0, _Seq.iterate)(function (ta) {
    if (ta.Range == null) {} else {
      var s = ta.Range[0];
      var e = ta.Range[1];
      var range = document.createRange();
      range.setStart(textNode, s - offset);
      range.setEnd(textNode, e - offset);
      var span = document.createElement("span");
      span.id = (0, _String.fsFormat)("t-%s")(function (x) {
        return x;
      })(ta.Name);
      range.surroundContents(span);
      textNode = schemaRootEl.lastChild;
      offset = e;
    }
  }, (0, _Seq.sortWith)(function (x, y) {
    return (0, _Util.compare)(function (ta_1) {
      return ta_1.Range[0];
    }(x), function (ta_1) {
      return ta_1.Range[0];
    }(y));
  }, (0, _Seq.map)(function (kvp) {
    return kvp[1];
  }, (0, _Seq.collect)(function (md) {
    return md.TypeAssignments;
  }, modules))));
  console.timeEnd("ranges");
  schemaRootEl.setAttribute("data-schema-id", info.Id);
  schemaRootEl.classList.add("hidden");
  var optionEl = document.createElement('option');
  optionEl.value = info.Id;
  optionEl.textContent = info.DisplayName;
  return [optionEl, schemaRootEl];
}

function exampleFile(f) {
  var listItem = document.createElement('li');
  var link = document.createElement('a');
  link.href = "#example=" + f.Path;
  link.textContent = f.Description;
  (0, _Utils.appendTo)(listItem, link);
  return listItem;
}

function knownTypeButton(index, kt) {
  var btnEl = document.createElement('button');
  btnEl.textContent = kt.DisplayName;
  btnEl.classList.add("schema-button");
  btnEl.setAttribute("data-known-type", (0, _Util.toString)(index));
  return btnEl;
}

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.knownTypes = exports.exampleFiles = exports.KnownTypes = exports.Schemas = exports.ExampleFile = exports.KnownType = exports.SchemaInfo = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Symbol2 = __webpack_require__(12);

var _Symbol3 = _interopRequireDefault(_Symbol2);

var _Util = __webpack_require__(5);

var _Map2 = __webpack_require__(51);

var _Map3 = _interopRequireDefault(_Map2);

var _List = __webpack_require__(22);

var _List2 = _interopRequireDefault(_List);

var _GenericComparer = __webpack_require__(50);

var _GenericComparer2 = _interopRequireDefault(_GenericComparer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SchemaInfo = exports.SchemaInfo = function () {
  function SchemaInfo(id, displayName, url, overrides) {
    _classCallCheck(this, SchemaInfo);

    this.Id = id;
    this.DisplayName = displayName;
    this.Url = url;
    this.Overrides = overrides;
  }

  _createClass(SchemaInfo, [{
    key: _Symbol3.default.reflection,
    value: function () {
      return {
        type: "FsAsn1.Viewer.Data.SchemaInfo",
        interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
        properties: {
          Id: "string",
          DisplayName: "string",
          Url: "string",
          Overrides: (0, _Util.makeGeneric)(_Map3.default, {
            Key: "string",
            Value: (0, _Util.makeGeneric)(_Map3.default, {
              Key: "string",
              Value: (0, _Util.Tuple)(["string", "string"])
            })
          })
        }
      };
    }
  }, {
    key: "Equals",
    value: function (other) {
      return (0, _Util.equalsRecords)(this, other);
    }
  }, {
    key: "CompareTo",
    value: function (other) {
      return (0, _Util.compareRecords)(this, other);
    }
  }]);

  return SchemaInfo;
}();

(0, _Symbol2.setType)("FsAsn1.Viewer.Data.SchemaInfo", SchemaInfo);

var KnownType = exports.KnownType = function () {
  function KnownType(typeName, displayName, schemas) {
    _classCallCheck(this, KnownType);

    this.TypeName = typeName;
    this.DisplayName = displayName;
    this.Schemas = schemas;
  }

  _createClass(KnownType, [{
    key: _Symbol3.default.reflection,
    value: function () {
      return {
        type: "FsAsn1.Viewer.Data.KnownType",
        interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
        properties: {
          TypeName: (0, _Util.Option)("string"),
          DisplayName: "string",
          Schemas: (0, _Util.makeGeneric)(_List2.default, {
            T: SchemaInfo
          })
        }
      };
    }
  }, {
    key: "Equals",
    value: function (other) {
      return (0, _Util.equalsRecords)(this, other);
    }
  }, {
    key: "CompareTo",
    value: function (other) {
      return (0, _Util.compareRecords)(this, other);
    }
  }]);

  return KnownType;
}();

(0, _Symbol2.setType)("FsAsn1.Viewer.Data.KnownType", KnownType);

var ExampleFile = exports.ExampleFile = function () {
  function ExampleFile(path, description, type) {
    _classCallCheck(this, ExampleFile);

    this.Path = path;
    this.Description = description;
    this.Type = type;
  }

  _createClass(ExampleFile, [{
    key: _Symbol3.default.reflection,
    value: function () {
      return {
        type: "FsAsn1.Viewer.Data.ExampleFile",
        interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
        properties: {
          Path: "string",
          Description: "string",
          Type: KnownType
        }
      };
    }
  }, {
    key: "Equals",
    value: function (other) {
      return (0, _Util.equalsRecords)(this, other);
    }
  }, {
    key: "CompareTo",
    value: function (other) {
      return (0, _Util.compareRecords)(this, other);
    }
  }]);

  return ExampleFile;
}();

(0, _Symbol2.setType)("FsAsn1.Viewer.Data.ExampleFile", ExampleFile);

var Schemas = exports.Schemas = function (__exports) {
  var Cms = __exports.Cms = new SchemaInfo("rfc3852", "RFC3852: Cryptographic Message Syntax (CMS)", "/Data/rfc3852.txt", (0, _Map2.create)(null, new _GenericComparer2.default(_Util.compare)));
  var X509 = __exports.X509 = new SchemaInfo("rfc5280", "RFC5280: X.509 Certificate and Certificate Revocation List", "/Data/rfc5280.txt", (0, _Map2.create)((0, _List.ofArray)([["PKIX1Explicit88", (0, _Map2.create)((0, _List.ofArray)([["Extension", ["extnID", "extnValue"]]]), new _GenericComparer2.default(_Util.compare))]]), new _GenericComparer2.default(_Util.compare)));
  return __exports;
}({});

var KnownTypes = exports.KnownTypes = function (__exports) {
  var X509Certificate = __exports.X509Certificate = new KnownType("Certificate", "X.509 Certificate (RFC 5280)", (0, _List.ofArray)([Schemas.X509]));
  var CmsSignedData = __exports.CmsSignedData = new KnownType("ContentInfo", "CMS Signed Data (RFC 3852)", (0, _List.ofArray)([Schemas.Cms, Schemas.X509]));
  var None = __exports.None = new KnownType(null, "Unknown type", new _List2.default());
  return __exports;
}({});

var exampleFiles = exports.exampleFiles = (0, _List.ofArray)([new ExampleFile("google_ssl.cer", "Google SSL certificate", KnownTypes.X509Certificate), new ExampleFile("BouncyCastle/cms/sigs/PSSSignDataSHA1.sig", "Example CMS signed file (BouncyCastle test data)", KnownTypes.CmsSignedData)]);
var knownTypes = exports.knownTypes = (0, _List.ofArray)([KnownTypes.X509Certificate, KnownTypes.CmsSignedData, KnownTypes.None]);

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.moduleDefinitionBegin = exports.parseModuleImports = exports.extensionDefault = exports.tagDefault = exports.typeAssignments = exports.ptypeKind = exports.valueAssignment = exports.typeAssignment = exports.choiceType = exports.alternativeTypeLists = exports.alternativeTypeList = exports.setOfType = exports.sequenceOfType = exports.setType = exports.sequenceType = exports.componentTypeList = exports.comment = exports.componentType = exports.namedTypeModifier = exports.sequenceOfValue = exports.referencedValue = exports.simpleElement = exports.pconstraintElements = exports.pconstraintElementsRef = exports.psizeConstraint = exports.pvalueRange = exports.psingleValue = exports.pconstraint = exports.pconstraintRef = exports.upperEndpoint = exports.lowerEndpoint = exports.valueReference = exports.namedType = exports.oidValue = exports.oidValueComponents = exports.oidComponent = exports.integerValue = exports.booleanValue = exports.anyType = exports.octetStringType = exports.booleanType = exports.objectIdentifierType = exports.integer = exports.namedNumberList = exports.namedNumber = exports.signedNumber = exports.bitString = exports.pnull = exports.prefixedType = exports.taggedType = exports.tagKind = exports.tag = exports.tagClass = exports.value = exports.valueRef = exports.definedValue = exports.definedValueRef = exports.ptype = exports.ptypeRef = exports.identifierNoSpace = exports.identifier = exports.moduleReference = exports.typeReference = exports.case = exports.Position$2E$get_IntLine = exports.Position$2E$get_IntColumn = exports.Position$2E$get_IntIndex = exports.UserState = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.choice = choice;
exports.intIndex = intIndex;
exports.intColumn = intColumn;
exports.intLine = intLine;
exports.makeRange = makeRange;
exports.str_ws = str_ws;
exports.inParentheses = inParentheses;
exports.inBrackets = inBrackets;
exports.inBraces = inBraces;
exports.specifyTagKind = specifyTagKind;
exports.commaSepListWithComments = commaSepListWithComments;
exports.withRange = withRange;
exports.parseSubstring = parseSubstring;
exports.parse = parse;
exports.previousIndex = previousIndex;
exports.isNewline = isNewline;
exports.isWhitespace = isWhitespace;
exports.parseAssignmentsInRange = parseAssignmentsInRange;
exports.parseAssignments = parseAssignments;
exports.indexOf = indexOf;
exports.lastIndexOf = lastIndexOf;
exports.lastIndexOfAny = lastIndexOfAny;
exports.parseModuleDefinition = parseModuleDefinition;
exports.parseAllModuleDefinitions = parseAllModuleDefinitions;

var _fparsec = __webpack_require__(378);

var _fparsec2 = _interopRequireDefault(_fparsec);

var _Symbol2 = __webpack_require__(12);

var _Symbol3 = _interopRequireDefault(_Symbol2);

var _Schema = __webpack_require__(62);

var _Util = __webpack_require__(5);

var _BigInt = __webpack_require__(81);

var _List = __webpack_require__(22);

var _List2 = _interopRequireDefault(_List);

var _Map = __webpack_require__(51);

var _GenericComparer = __webpack_require__(50);

var _GenericComparer2 = _interopRequireDefault(_GenericComparer);

var _String = __webpack_require__(35);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function choice(ps) {
  var clo1 = _fparsec2.default.choice(ps);

  return function (arg10) {
    return clo1(arg10);
  };
}

var UserState = exports.UserState = function () {
  function UserState(offset, useRanges, tagKindDefault, moduleName) {
    _classCallCheck(this, UserState);

    this.Offset = offset;
    this.UseRanges = useRanges;
    this.TagKindDefault = tagKindDefault;
    this.ModuleName = moduleName;
  }

  _createClass(UserState, [{
    key: _Symbol3.default.reflection,
    value: function () {
      return {
        type: "FsAsn1.SchemaParser.UserState",
        interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
        properties: {
          Offset: "number",
          UseRanges: "boolean",
          TagKindDefault: _Schema.TagKind,
          ModuleName: "string"
        }
      };
    }
  }, {
    key: "Equals",
    value: function (other) {
      return (0, _Util.equalsRecords)(this, other);
    }
  }, {
    key: "CompareTo",
    value: function (other) {
      return (0, _Util.compareRecords)(this, other);
    }
  }]);

  return UserState;
}();

(0, _Symbol2.setType)("FsAsn1.SchemaParser.UserState", UserState);

function intIndex(p) {
  return ~~p.index.toNumber();
}

function intColumn(p) {
  return ~~p.column.toNumber();
}

function intLine(p) {
  return ~~p.line.toNumber();
}

function Position_get_IntIndex() {
  return this.index;
}

exports.Position$2E$get_IntIndex = Position_get_IntIndex;

function Position_get_IntColumn() {
  return this.column;
}

exports.Position$2E$get_IntColumn = Position_get_IntColumn;

function Position_get_IntLine() {
  return this.line;
}

exports.Position$2E$get_IntLine = Position_get_IntLine;

function makeRange(fromPos, toPos, state) {
  if (state.UseRanges) {
    return [state.Offset + Position_get_IntIndex.bind(fromPos)(), state.Offset + Position_get_IntIndex.bind(toPos)()];
  } else {
    return null;
  }
}

function str_ws(s) {
  return _fparsec2.default.op_DotGreaterGreater(_fparsec2.default.pstring(s), _fparsec2.default.spaces);
}

function _case(str, value) {
  return _fparsec2.default.op_GreaterGreaterPercent(str_ws(str), value);
}

exports.case = _case;

function inParentheses(p) {
  return _fparsec2.default.between(str_ws("("), str_ws(")"), p);
}

function inBrackets(p) {
  return _fparsec2.default.between(str_ws("["), str_ws("]"), p);
}

function inBraces(p) {
  return _fparsec2.default.between(str_ws("{"), str_ws("}"), p);
}

var typeReference = exports.typeReference = _fparsec2.default.op_DotGreaterGreater(_fparsec2.default.many1Satisfy2L(function (arg00_) {
  return arg00_ >= 'A' && arg00_ <= 'Z';
}, function (c) {
  return (c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z' ? true : c >= '0' && c <= '9') ? true : c === "-";
}, "typereference"), _fparsec2.default.spaces);

var moduleReference = exports.moduleReference = typeReference;

var identifier = exports.identifier = _fparsec2.default.op_DotGreaterGreater(_fparsec2.default.many1Satisfy2L(function (arg00_) {
  return arg00_ >= 'a' && arg00_ <= 'z';
}, function (c) {
  return (c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z' ? true : c >= '0' && c <= '9') ? true : c === "-";
}, "identifier"), _fparsec2.default.spaces);

var identifierNoSpace = exports.identifierNoSpace = _fparsec2.default.many1Satisfy2L(function (arg00_) {
  return arg00_ >= 'a' && arg00_ <= 'z';
}, function (c) {
  return (c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z' ? true : c >= '0' && c <= '9') ? true : c === "-";
}, "identifier");

var patternInput_86_5 = _fparsec2.default.createParserForwardedToRef();

var ptypeRef = exports.ptypeRef = patternInput_86_5[1];
var ptype = exports.ptype = patternInput_86_5[0];

var patternInput_87_6 = _fparsec2.default.createParserForwardedToRef();

var definedValueRef = exports.definedValueRef = patternInput_87_6[1];
var definedValue = exports.definedValue = patternInput_87_6[0];

var patternInput_88_7 = _fparsec2.default.createParserForwardedToRef();

var valueRef = exports.valueRef = patternInput_88_7[1];
var value = exports.value = patternInput_88_7[0];

var tagClass = exports.tagClass = _fparsec2.default.op_LessBarGreater(_fparsec2.default.op_LessBarGreater(_case("UNIVERSAL", new _Schema.TagClass("Universal", [])), _case("APPLICATION", new _Schema.TagClass("Application", []))), _case("PRIVATE", new _Schema.TagClass("Private", [])));

var tag = exports.tag = inBrackets(_fparsec2.default.op_DotGreaterGreaterDot(_fparsec2.default.opt(tagClass), _fparsec2.default.pint32));

var tagKind = exports.tagKind = _fparsec2.default.op_LessBarGreater(_case("EXPLICIT", new _Schema.TagKind("Explicit", [])), _case("IMPLICIT", new _Schema.TagKind("Implicit", [])));

function specifyTagKind(schemaKind, defaultKind, innerTypeKind) {
  var matchValue = [schemaKind, innerTypeKind];

  if (matchValue[0] == null) {
    return defaultKind;
  } else {
    var kind = matchValue[0];
    return kind;
  }
}

var taggedType = exports.taggedType = _fparsec2.default.pipe4(tag, _fparsec2.default.opt(tagKind), ptype, _fparsec2.default.getUserState, function (tupledArg) {
  return function (t) {
    return function (ty) {
      return function (s) {
        return new _Schema.AsnTypeKind("TaggedType", [tupledArg[0], tupledArg[1], specifyTagKind(t, s.TagKindDefault, ty.Kind), ty]);
      };
    };
  };
});

var prefixedType = exports.prefixedType = taggedType;

var pnull = exports.pnull = _case("NULL", new _Schema.AsnTypeKind("NullType", []));

var bitString = exports.bitString = _case("BIT STRING", new _Schema.AsnTypeKind("BitStringType", []));

var signedNumber = exports.signedNumber = _fparsec2.default.op_BarGreaterGreater(_fparsec2.default.numberLiteral(2, "signedNumber"), function (nl) {
  return (0, _BigInt.parse)(nl.string);
});

var namedNumber = exports.namedNumber = _fparsec2.default.op_DotGreaterGreaterDot(identifier, inParentheses(_fparsec2.default.op_LessBarGreater(_fparsec2.default.op_BarGreaterGreater(signedNumber, function (arg0) {
  return new _Schema.NamedNumberValue("SignedNumber", [arg0]);
}), _fparsec2.default.op_BarGreaterGreater(definedValue, function (arg0_1) {
  return new _Schema.NamedNumberValue("DefinedValue", [arg0_1]);
}))));

var namedNumberList = exports.namedNumberList = _fparsec2.default.sepBy(namedNumber, str_ws(","));

var integer = exports.integer = _fparsec2.default.op_BarGreaterGreater(_fparsec2.default.op_GreaterGreaterDot(str_ws("INTEGER"), _fparsec2.default.op_LessBarGreaterPercent(inBraces(namedNumberList), new _List2.default())), function (arg0) {
  return new _Schema.AsnTypeKind("IntegerType", [arg0]);
});

var objectIdentifierType = exports.objectIdentifierType = _fparsec2.default.op_GreaterGreaterPercent(str_ws("OBJECT IDENTIFIER"), new _Schema.AsnTypeKind("ObjectIdentifierType", []));

var booleanType = exports.booleanType = _fparsec2.default.op_GreaterGreaterPercent(str_ws("BOOLEAN"), new _Schema.AsnTypeKind("BooleanType", []));

var octetStringType = exports.octetStringType = _fparsec2.default.op_GreaterGreaterPercent(str_ws("OCTET STRING"), new _Schema.AsnTypeKind("OctetStringType", []));

var anyType = exports.anyType = _fparsec2.default.op_GreaterGreaterDot(str_ws("ANY"), _fparsec2.default.op_BarGreaterGreater(_fparsec2.default.opt(_fparsec2.default.op_GreaterGreaterDot(str_ws("DEFINED BY"), identifier)), function (arg0) {
  return new _Schema.AsnTypeKind("AnyType", [arg0]);
}));

var booleanValue = exports.booleanValue = function () {
  var ptrue = _fparsec2.default.op_GreaterGreaterPercent(str_ws("TRUE"), new _Schema.Value("BooleanValue", [true]));

  var pfalse = _fparsec2.default.op_GreaterGreaterPercent(str_ws("FALSE"), new _Schema.Value("BooleanValue", [false]));

  return _fparsec2.default.op_LessBarGreater(ptrue, pfalse);
}();

var integerValue = exports.integerValue = _fparsec2.default.op_BarGreaterGreater(signedNumber, function (arg0) {
  return new _Schema.Value("IntegerValue", [arg0]);
});

var oidComponent = exports.oidComponent = _fparsec2.default.op_LessBarGreater(_fparsec2.default.op_BarGreaterGreater(signedNumber, function (x) {
  return [null, x];
}), _fparsec2.default.op_DotGreaterGreaterDot(_fparsec2.default.op_BarGreaterGreater(identifierNoSpace, function (arg0) {
  return arg0;
}), _fparsec2.default.opt(inParentheses(signedNumber))));

var oidValueComponents = exports.oidValueComponents = inBraces(_fparsec2.default.pipe3(_fparsec2.default.op_DotGreaterGreater(oidComponent, _fparsec2.default.spaces), _fparsec2.default.op_DotGreaterGreater(oidComponent, _fparsec2.default.spaces), _fparsec2.default.many(_fparsec2.default.op_DotGreaterGreater(oidComponent, _fparsec2.default.spaces)), function (c1) {
  return function (c2) {
    return function (rest) {
      return (0, _List.ofArray)([c1, c2], rest);
    };
  };
}));

var oidValue = exports.oidValue = _fparsec2.default.op_BarGreaterGreater(oidValueComponents, function (arg0) {
  return new _Schema.Value("OidValue", [arg0]);
});

var namedType = exports.namedType = _fparsec2.default.op_DotGreaterGreaterDot(identifier, ptype);

var valueReference = exports.valueReference = identifier;

var lowerEndpoint = exports.lowerEndpoint = _fparsec2.default.op_LessBarGreater(_fparsec2.default.op_GreaterGreaterPercent(str_ws("MIN"), new _Schema.LowerEndpoint("Min", [])), _fparsec2.default.op_BarGreaterGreater(value, function (arg0) {
  return new _Schema.LowerEndpoint("Value", [arg0]);
}));

var upperEndpoint = exports.upperEndpoint = _fparsec2.default.op_LessBarGreater(_fparsec2.default.op_GreaterGreaterPercent(str_ws("MAX"), new _Schema.UpperEndpoint("Max", [])), _fparsec2.default.op_BarGreaterGreater(value, function (arg0) {
  return new _Schema.UpperEndpoint("Value", [arg0]);
}));

var patternInput_162_8 = _fparsec2.default.createParserForwardedToRef();

var pconstraintRef = exports.pconstraintRef = patternInput_162_8[1];
var pconstraint = exports.pconstraint = patternInput_162_8[0];

var psingleValue = exports.psingleValue = _fparsec2.default.op_BarGreaterGreater(value, function (arg0) {
  return new _Schema.Constraint("SingleValue", [arg0]);
});

var pvalueRange = exports.pvalueRange = _fparsec2.default.op_BarGreaterGreater(_fparsec2.default.op_DotGreaterGreaterDot(_fparsec2.default.op_DotGreaterGreater(lowerEndpoint, _fparsec2.default.pstring("..")), upperEndpoint), function (tupledArg) {
  return new _Schema.Constraint("ValueRange", [tupledArg[0], tupledArg[1]]);
});

var psizeConstraint = exports.psizeConstraint = _fparsec2.default.op_BarGreaterGreater(_fparsec2.default.op_GreaterGreaterDot(str_ws("SIZE"), pconstraint), function (arg0) {
  return new _Schema.Constraint("SizeConstraint", [arg0]);
});

var patternInput_168_9 = _fparsec2.default.createParserForwardedToRef();

var pconstraintElementsRef = exports.pconstraintElementsRef = patternInput_168_9[1];
var pconstraintElements = exports.pconstraintElements = patternInput_168_9[0];

var simpleElement = exports.simpleElement = _fparsec2.default.op_LessBarGreater(_fparsec2.default.op_LessBarGreater(psizeConstraint, _fparsec2.default.attempt(pvalueRange)), psingleValue);

pconstraintElementsRef.contents = _fparsec2.default.pipe2(simpleElement, _fparsec2.default.opt(_fparsec2.default.op_GreaterGreaterDot(str_ws("|"), pconstraintElements)), function (c1) {
  return function (c2) {
    return c2 == null ? c1 : new _Schema.Constraint("Union", [c1, c2]);
  };
});
pconstraintRef.contents = inParentheses(pconstraintElements);
definedValueRef.contents = _fparsec2.default.op_BarGreaterGreater(valueReference, function (arg0) {
  return new _Schema.Value("ReferencedValue", [arg0]);
});
var referencedValue = exports.referencedValue = definedValue;

var sequenceOfValue = exports.sequenceOfValue = _fparsec2.default.op_BarGreaterGreater(inBraces(_fparsec2.default.sepBy(value, str_ws(","))), function (arg0) {
  return new _Schema.Value("SequenceOfValue", [arg0]);
});

valueRef.contents = _fparsec2.default.op_LessBarGreater(_fparsec2.default.op_LessBarGreater(_fparsec2.default.op_LessBarGreater(_fparsec2.default.op_LessBarGreater(booleanValue, integerValue), referencedValue), _fparsec2.default.attempt(oidValue)), sequenceOfValue);

var namedTypeModifier = exports.namedTypeModifier = _fparsec2.default.op_LessBarGreater(_fparsec2.default.op_GreaterGreaterPercent(str_ws("OPTIONAL"), new _Schema.NamedTypeModifier("Optional", [])), _fparsec2.default.op_BarGreaterGreater(_fparsec2.default.op_GreaterGreaterDot(str_ws("DEFAULT"), value), function (arg0) {
  return new _Schema.NamedTypeModifier("Default", [arg0]);
}));

var componentType = exports.componentType = _fparsec2.default.op_BarGreaterGreater(_fparsec2.default.op_DotGreaterGreaterDot(namedType, _fparsec2.default.opt(namedTypeModifier)), function (tupledArg) {
  return new _Schema.ComponentType("ComponentType", [tupledArg[0][0], function () {
    var ComponentName = tupledArg[0][0];
    return new _Schema.AsnType(tupledArg[0][1].Kind, tupledArg[0][1].Constraint, tupledArg[0][1].TypeName, tupledArg[0][1].SchemaName, ComponentName, tupledArg[0][1].Range);
  }(), tupledArg[1]]);
});

var comment = exports.comment = _fparsec2.default.op_LessBarGreater(_fparsec2.default.op_DotGreaterGreater(_fparsec2.default.op_GreaterGreaterDot(_fparsec2.default.pstring("--"), _fparsec2.default.skipManyTill(_fparsec2.default.anyChar, _fparsec2.default.op_LessBarGreater(_fparsec2.default.skipString("--"), _fparsec2.default.skipNewline))), _fparsec2.default.spaces), _fparsec2.default.op_GreaterGreaterEquals(_fparsec2.default.getPosition, function (p) {
  return Position_get_IntColumn.bind(p)() === 1 ? _fparsec2.default.op_DotGreaterGreater(_fparsec2.default.skipRestOfLine(true), _fparsec2.default.spaces) : _fparsec2.default.fail("?");
}));

function commaSepListWithComments(p) {
  return _fparsec2.default.op_DotGreaterGreater(_fparsec2.default.op_GreaterGreaterDot(_fparsec2.default.many(comment), _fparsec2.default.sepBy(p, _fparsec2.default.op_DotGreaterGreater(str_ws(","), _fparsec2.default.many(comment)))), _fparsec2.default.many(comment));
}

var componentTypeList = exports.componentTypeList = commaSepListWithComments(componentType);

var sequenceType = exports.sequenceType = _fparsec2.default.op_BarGreaterGreater(_fparsec2.default.op_GreaterGreaterDot(str_ws("SEQUENCE"), inBraces(componentTypeList)), function (arg0) {
  return new _Schema.AsnTypeKind("SequenceType", [arg0]);
});

var setType = exports.setType = _fparsec2.default.op_BarGreaterGreater(_fparsec2.default.op_GreaterGreaterDot(str_ws("SET"), inBraces(componentTypeList)), function (arg0) {
  return new _Schema.AsnTypeKind("SetType", [arg0]);
});

var sequenceOfType = exports.sequenceOfType = _fparsec2.default.op_BarGreaterGreater(_fparsec2.default.op_DotGreaterGreaterDot(_fparsec2.default.attempt(_fparsec2.default.op_DotGreaterGreater(_fparsec2.default.op_GreaterGreaterDot(str_ws("SEQUENCE"), _fparsec2.default.opt(psizeConstraint)), str_ws("OF"))), _fparsec2.default.op_LessBarGreater(_fparsec2.default.op_BarGreaterGreater(ptype, function (arg0) {
  return new _Schema.SequenceOfType("SequenceOfType", [arg0]);
}), _fparsec2.default.op_BarGreaterGreater(namedType, function (tupledArg) {
  return new _Schema.SequenceOfType("SequenceOfNamedType", [tupledArg[0], tupledArg[1]]);
}))), function (tupledArg_1) {
  return new _Schema.AsnTypeKind("SequenceOfType", [tupledArg_1[0], tupledArg_1[1]]);
});

var setOfType = exports.setOfType = _fparsec2.default.op_BarGreaterGreater(_fparsec2.default.op_DotGreaterGreaterDot(_fparsec2.default.attempt(_fparsec2.default.op_DotGreaterGreater(_fparsec2.default.op_GreaterGreaterDot(str_ws("SET"), _fparsec2.default.opt(psizeConstraint)), str_ws("OF"))), _fparsec2.default.op_LessBarGreater(_fparsec2.default.op_BarGreaterGreater(ptype, function (arg0) {
  return new _Schema.SetOfType("SetOfType", [arg0]);
}), _fparsec2.default.op_BarGreaterGreater(namedType, function (tupledArg) {
  return new _Schema.SetOfType("SetOfNamedType", [tupledArg[0], tupledArg[1]]);
}))), function (tupledArg_1) {
  return new _Schema.AsnTypeKind("SetOfType", [tupledArg_1[0], tupledArg_1[1]]);
});

var alternativeTypeList = exports.alternativeTypeList = commaSepListWithComments(namedType);
var alternativeTypeLists = exports.alternativeTypeLists = alternativeTypeList;

var choiceType = exports.choiceType = _fparsec2.default.op_BarGreaterGreater(_fparsec2.default.op_GreaterGreaterDot(str_ws("CHOICE"), inBraces(alternativeTypeLists)), function ($var24) {
  return new _Schema.AsnTypeKind("ChoiceType", [(0, _List.map)(function (tupledArg) {
    return [tupledArg[0], function () {
      var ComponentName = tupledArg[0];
      return new _Schema.AsnType(tupledArg[1].Kind, tupledArg[1].Constraint, tupledArg[1].TypeName, tupledArg[1].SchemaName, ComponentName, tupledArg[1].Range);
    }()];
  }, $var24)]);
});

function withRange(p) {
  return _fparsec2.default.pipe3(_fparsec2.default.getPosition, p, _fparsec2.default.op_DotGreaterGreaterDot(_fparsec2.default.getPosition, _fparsec2.default.getUserState), function (s) {
    return function (res) {
      return function (tupledArg) {
        return [makeRange(s, tupledArg[0], tupledArg[1]), res];
      };
    };
  });
}

var typeAssignment = exports.typeAssignment = _fparsec2.default.op_BarGreaterGreater(_fparsec2.default.op_GreaterGreaterDot(_fparsec2.default.spaces, withRange(_fparsec2.default.op_DotGreaterGreaterDot(_fparsec2.default.attempt(_fparsec2.default.op_DotGreaterGreater(_fparsec2.default.op_DotGreaterGreater(typeReference, _fparsec2.default.pstring("::=")), _fparsec2.default.spaces)), ptype))), function (tupledArg) {
  return new _Schema.TypeAssignment(tupledArg[1][0], function () {
    var TypeName = tupledArg[1][0];
    return new _Schema.AsnType(tupledArg[1][1].Kind, tupledArg[1][1].Constraint, TypeName, tupledArg[1][1].SchemaName, tupledArg[1][1].ComponentName, tupledArg[1][1].Range);
  }(), tupledArg[0]);
});

var valueAssignment = exports.valueAssignment = _fparsec2.default.op_BarGreaterGreater(_fparsec2.default.op_GreaterGreaterDot(_fparsec2.default.spaces, withRange(_fparsec2.default.op_DotGreaterGreaterDot(_fparsec2.default.attempt(_fparsec2.default.op_DotGreaterGreater(_fparsec2.default.op_DotGreaterGreaterDot(valueReference, _fparsec2.default.op_DotGreaterGreater(ptype, _fparsec2.default.spaces)), str_ws("::="))), value))), function (tupledArg) {
  var ty = tupledArg[1][0][1];
  var n = tupledArg[1][0][0];
  return new _Schema.ValueAssignment(n, ty, tupledArg[1][1], tupledArg[0]);
});

var ptypeKind = exports.ptypeKind = (0, _fparsec.choice)([sequenceOfType, sequenceType, setOfType, setType, choiceType, pnull, bitString, integer, prefixedType, objectIdentifierType, booleanType, octetStringType, anyType, _fparsec2.default.op_BarGreaterGreater(typeReference, function (arg0) {
  return new _Schema.AsnTypeKind("ReferencedType", [arg0]);
})]);
ptypeRef.contents = _fparsec2.default.op_BarGreaterGreater(withRange(_fparsec2.default.op_DotGreaterGreaterDot(_fparsec2.default.op_DotGreaterGreaterDot(ptypeKind, _fparsec2.default.opt(pconstraint)), _fparsec2.default.getUserState)), function (tupledArg) {
  var kind = tupledArg[1][0][0];
  var cs = tupledArg[1][0][1];
  var ComponentName = null;
  var TypeName = null;
  return new _Schema.AsnType(kind, cs, TypeName, tupledArg[1][1].ModuleName, ComponentName, tupledArg[0]);
});

var typeAssignments = exports.typeAssignments = _fparsec2.default.many(typeAssignment);

var tagDefault = exports.tagDefault = _fparsec2.default.opt(_fparsec2.default.op_LessBarGreater(_fparsec2.default.op_LessBarGreater(_case("EXPLICIT TAGS", new _Schema.TagDefault("ExplicitTags", [])), _case("IMPLICIT TAGS", new _Schema.TagDefault("ImplicitTags", []))), _case("AUTOMATIC TAGS", new _Schema.TagDefault("AutomaticTags", []))));

var extensionDefault = exports.extensionDefault = _fparsec2.default.op_LessBarGreater(_fparsec2.default.op_GreaterGreaterPercent(str_ws("EXTENSIBILITY IMPLIED"), true), _fparsec2.default.preturn(false));

var parseModuleImports = exports.parseModuleImports = function () {
  var symbol = _fparsec2.default.op_LessBarGreater(typeReference, valueReference);

  var _import = _fparsec2.default.pipe3(_fparsec2.default.sepBy(symbol, str_ws(",")), _fparsec2.default.op_GreaterGreaterDot(str_ws("FROM"), moduleReference), oidValueComponents, function (symbols) {
    return function (moduleName) {
      return function (oidComponents) {
        return new _Schema.ModuleImport(moduleName, Array.from(oidComponents), (0, _List.filter)(function (r) {
          return r[0] >= 'a' && r[0] <= 'z';
        }, symbols), (0, _List.filter)(function (r_1) {
          return r_1[0] >= 'A' && r_1[0] <= 'Z';
        }, symbols));
      };
    };
  });

  return _fparsec2.default.op_LessBarGreaterPercent(_fparsec2.default.op_DotGreaterGreater(_fparsec2.default.op_GreaterGreaterDot(str_ws("IMPORTS"), _fparsec2.default.many(_import)), str_ws(";")), new _List2.default());
}();

var moduleDefinitionBegin = exports.moduleDefinitionBegin = _fparsec2.default.pipe4(moduleReference, _fparsec2.default.op_DotGreaterGreater(oidValueComponents, str_ws("DEFINITIONS")), tagDefault, _fparsec2.default.op_DotGreaterGreaterDot(_fparsec2.default.op_DotGreaterGreater(_fparsec2.default.op_DotGreaterGreater(extensionDefault, str_ws("::=")), str_ws("BEGIN")), parseModuleImports), function (ident) {
  return function (oidComponents) {
    return function (tagDefault_1) {
      return function (tupledArg) {
        return new _Schema.ModuleDefinition(ident, Array.from(oidComponents), tagDefault_1, tupledArg[0], (0, _Map.create)(null, new _GenericComparer2.default(_Util.compare)), (0, _Map.create)(null, new _GenericComparer2.default(_Util.compare)), tupledArg[1], null, (0, _Map.create)(null, new _GenericComparer2.default(_Util.compare)));
      };
    };
  };
});

function parseSubstring(p, str, start, count) {
  var matchValue = _fparsec2.default.runParserOnSubstring(p, new UserState(0, true, new _Schema.TagKind("Explicit", []), "GLOBAL"), "", str, start, count);

  if (matchValue.Case === "Failure") {
    throw new Error(matchValue.Fields[0]);
  } else {
    return matchValue.Fields[0];
  }
}

function parse(p, str) {
  return parseSubstring(p, str, 0, str.length);
}

function previousIndex(str, startIndex, f) {
  var index = startIndex;

  while (index >= 0 ? !f(str[index]) : false) {
    index = index - 1;
  }

  if (index === -1) {
    return null;
  } else {
    return index;
  }
}

function isNewline(c) {
  if (c === "\r") {
    return true;
  } else {
    return c === "\n";
  }
}

function isWhitespace(c) {
  if (c === " ") {
    return true;
  } else {
    return isNewline(c);
  }
}

function parseAssignmentsInRange(str, fromIndex, toIndex, tagDefault_1, moduleName) {
  var parseNext = function parseNext(fromIndex_1) {
    return function (acc) {
      return function (acc2) {
        var index = str.indexOf("::=", fromIndex_1);

        var trimRangeEnd = function trimRangeEnd(range) {
          var matchValue = previousIndex(str, range[1] - 1, function ($var25) {
            return !isWhitespace($var25);
          });

          if (matchValue == null) {
            throw new Error("Incorrect initial range");
          } else {
            return [range[0], matchValue + 1];
          }
        };

        if (index === -1 ? true : index >= toIndex) {
          return [acc, acc2];
        } else {
          var recurse = parseNext(index + "::=".length);
          var start = (0, _Util.defaultArg)(previousIndex(str, index, function (c) {
            return isNewline(c);
          }), 0);
          var count = toIndex - start;

          var matchValue_1 = _fparsec2.default.runParserOnSubstring(typeAssignment, new UserState(start, true, tagDefault_1, moduleName), "", str, start, count);

          if (matchValue_1.Case === "Failure") {
            var matchValue_2 = _fparsec2.default.runParserOnSubstring(valueAssignment, new UserState(start, true, tagDefault_1, moduleName), "", str, start, count);

            if (matchValue_2.Case === "Failure") {
              return recurse(acc)(acc2);
            } else {
              return recurse(acc)(new _List2.default(function () {
                var _Range = function (option) {
                  return (0, _Util.defaultArg)(option, null, trimRangeEnd);
                }(matchValue_2.Fields[0].Range);

                return new _Schema.ValueAssignment(matchValue_2.Fields[0].Name, matchValue_2.Fields[0].Type, matchValue_2.Fields[0].Value, _Range);
              }(), acc2));
            }
          } else {
            return recurse(new _List2.default(function () {
              var _Range_1 = function (option_1) {
                return (0, _Util.defaultArg)(option_1, null, trimRangeEnd);
              }(matchValue_1.Fields[0].Range);

              return new _Schema.TypeAssignment(matchValue_1.Fields[0].Name, matchValue_1.Fields[0].Type, _Range_1);
            }(), acc))(acc2);
          }
        }
      };
    };
  };

  var patternInput = parseNext(fromIndex)(new _List2.default())(new _List2.default());
  return [(0, _List.reverse)(patternInput[0]), (0, _List.reverse)(patternInput[1])];
}

function parseAssignments(str) {
  var fromIndex = 0;
  var toIndex = str.length - 1;
  return function (tagDefault_1) {
    return function (moduleName) {
      return parseAssignmentsInRange(str, fromIndex, toIndex, tagDefault_1, moduleName);
    };
  };
}

function indexOf(value_1, str, startIndex) {
  var matchValue = str.indexOf(value_1, startIndex);

  if (matchValue === -1) {
    return null;
  } else {
    return matchValue;
  }
}

function lastIndexOf(value_1, str, startIndex) {
  var matchValue = str.lastIndexOf(value_1, startIndex);

  if (matchValue === -1) {
    return null;
  } else {
    return matchValue;
  }
}

function lastIndexOfAny(anyOf, str, startIndex) {
  var matchValue = (0, _String.lastIndexOfAny)(str, anyOf, startIndex);

  if (matchValue === -1) {
    return null;
  } else {
    return matchValue;
  }
}

function parseModuleDefinition(str, start) {
  return (0, _Util.defaultArg)((0, _Util.defaultArg)((0, _Util.defaultArg)((0, _Util.defaultArg)(indexOf("DEFINITIONS", str, start), null, function () {
    var value_1 = "{";
    return function (startIndex) {
      return lastIndexOf(value_1, str, startIndex);
    };
  }()), null, function (i_1) {
    return previousIndex(str, i_1 - 1, function ($var26) {
      return !isWhitespace($var26);
    });
  }), null, function (i) {
    return previousIndex(str, i - 1, function (c) {
      return isWhitespace(c);
    });
  }), null, function (lineStart) {
    var patternInput = parseSubstring(_fparsec2.default.op_GreaterGreaterDot(_fparsec2.default.spaces, _fparsec2.default.tuple2(_fparsec2.default.getPosition, moduleDefinitionBegin)), str, lineStart, str.length - lineStart);
    var endIndex = str.indexOf("END", lineStart + Position_get_IntIndex.bind(patternInput[0])());
    var tagKindDefault = void 0;

    if (patternInput[1].TagDefault == null) {
      tagKindDefault = new _Schema.TagKind("Explicit", []);
    } else if (patternInput[1].TagDefault.Case === "ImplicitTags") {
      tagKindDefault = new _Schema.TagKind("Implicit", []);
    } else if (patternInput[1].TagDefault.Case === "AutomaticTags") {
      throw new Error("Automatic tags are not supported");
    } else {
      tagKindDefault = new _Schema.TagKind("Explicit", []);
    }

    var patternInput_1 = parseAssignmentsInRange(str, lineStart + Position_get_IntIndex.bind(patternInput[0])(), endIndex, tagKindDefault, patternInput[1].Identifier);
    var TypeAssignments = (0, _Map.create)((0, _List.map)(function (ta) {
      return [ta.Name, ta];
    }, patternInput_1[0]), new _GenericComparer2.default(_Util.compare));
    var ValueAssignments = (0, _Map.create)((0, _List.map)(function (va) {
      return [va.Name, va];
    }, patternInput_1[1]), new _GenericComparer2.default(_Util.compare));
    var _Range = [lineStart + Position_get_IntIndex.bind(patternInput[0])(), endIndex + "END".length];
    return new _Schema.ModuleDefinition(patternInput[1].Identifier, patternInput[1].Oid, patternInput[1].TagDefault, patternInput[1].ExtensibilityImplied, TypeAssignments, ValueAssignments, patternInput[1].Imports, _Range, patternInput[1].ElementsDefinedByOid);
  });
}

function parseAllModuleDefinitions(str) {
  var parseNext = function parseNext(start) {
    return function (acc) {
      parseNext: while (true) {
        var matchValue = parseModuleDefinition(str, start);
        var $var27 = matchValue != null ? matchValue.Range != null ? [0, matchValue.Range[1], matchValue] : [1] : [1];

        switch ($var27[0]) {
          case 0:
            start = $var27[1];
            acc = new _List2.default($var27[2], acc);
            continue parseNext;

          case 1:
            return (0, _List.reverse)(acc);
        }
      }
    };
  };

  return parseNext(0)(new _List2.default());
}

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/incremental.kep'
 * DO NOT EDIT
*/

var __o = __webpack_require__(63),
    stream = __webpack_require__(61)["stream"],
    provide, provideString, finish, parseIncState, parseInc, runIncState, runInc, runManyState, runManyStream, runMany,
        bind = __o["bind"],
    getParserState = __o["getParserState"],
    next = __o["next"],
    optional = __o["optional"],
    parseState = __o["parseState"],
    Parser = __o["Parser"],
    ParserState = __o["ParserState"],
    Position = __o["Position"],
    runState = __o["runState"],
    trampoline = __o["trampoline"],
    streamFrom = stream["from"],
    isEmpty = stream["isEmpty"],
    NIL = stream["NIL"],
    memoStream = stream["memoStream"],
    Request = (function(chunk, k) {
        var self = this;
        (self.chunk = chunk);
        (self.k = k);
    }),
    Session = (function(done, k, chunks) {
        var self = this;
        (self.done = done);
        (self.k = k);
        (self.chunks = chunks);
    });
(Session.prototype.addChunk = (function(c) {
    var self = this;
    return new(Session)(self.done, self.k, self.chunks.concat(c));
}));
(Session.prototype.hasChunk = (function(c) {
    var self = this;
    return (c < self.chunks.length);
}));
(Session.prototype.getChunk = (function(c) {
    var self = this;
    return self.chunks[c];
}));
var IncrementalState = (function(chunk, state) {
    var self = this;
    (self.chunk = chunk);
    (self.state = state);
});
Object.defineProperties(IncrementalState.prototype, ({
    input: ({
        get: (function() {
            var self = this;
            return self.state.input;
        })
    }),
    position: ({
        get: (function() {
            var self = this;
            return self.state.position;
        })
    }),
    userState: ({
        get: (function() {
            var self = this;
            return self.state.userState;
        })
    })
}));
(IncrementalState.prototype.eq = (function(other) {
    var self = this;
    return ((other && (other.chunk === self.chunk)) && self.state.eq(other.state));
}));
(IncrementalState.prototype.isEmpty = (function() {
    var self = this;
    return self.state.isEmpty();
}));
(IncrementalState.prototype.first = (function() {
    var self = this;
    return self.state.first();
}));
(IncrementalState.prototype.next = (function(x) {
    var self = this;
    if ((!self._next)) {
        var chunk = self.chunk;
        (self._next = bind(next(self.state.next(x), getParserState), (function(innerState) {
            var state;
            return (innerState.isEmpty() ? new(Parser)((function(_, m, cok) {
                return new(Request)((chunk + 1), (function(i) {
                    return cok(x, new(IncrementalState)((chunk + 1), innerState
                        .setInput(i)), m);
                }));
            })) : ((state = new(IncrementalState)(chunk, innerState)), new(Parser)((function(_,
                m, cok) {
                return cok(x, state, m);
            }))));
        })));
    }
    return self._next;
}));
(IncrementalState.prototype.setInput = (function(input) {
    var self = this;
    return new(IncrementalState)(self.chunk, self.state.setInput(input));
}));
(IncrementalState.prototype.setPosition = (function(position) {
    var self = this;
    return new(IncrementalState)(self.chunk, self.state.setPosition(position));
}));
(IncrementalState.prototype.setUserState = (function(userState) {
    var self = this;
    return new(IncrementalState)(self.chunk, self.state.setUserState(userState));
}));
var forceProvide = (function(c, r) {
    if (r.done) return r;
    var r2 = r.addChunk(c),
        result = trampoline(r2.k(c));
    while (((result instanceof Request) && r2.hasChunk(result.chunk))) {
        (result = trampoline(result.k(r2.getChunk(result.chunk))));
    }
    return ((result instanceof Request) ? new(Session)(false, result.k, r2.chunks) : result);
});
(provide = (function(c, r) {
    return (isEmpty(c) ? r : forceProvide(c, r));
}));
(provideString = (function(input, r) {
    return provide(streamFrom(input), r);
}));
var x = forceProvide.bind(null, NIL);
(finish = (function(z) {
    var r = x(z);
    return r.k();
}));
(parseIncState = (function(p, state, ok, err) {
    var pok = (function(x0, s) {
        return new(Session)(true, ok.bind(null, x0, s));
    }),
        perr = (function(x0, s) {
            return new(Session)(true, err.bind(null, x0, s));
        });
    return provide(state.input, new(Session)(false, (function(i) {
        return parseState(p, new(IncrementalState)(0, state.setInput(i)), pok, perr);
    }), []));
}));
(parseInc = (function(p, ud, ok, err) {
    return parseIncState(p, new(ParserState)(NIL, Position.initial, ud), ok, err);
}));
var ok = (function(x0) {
    return x0;
}),
    err = (function(x0) {
        throw x0;
    });
(runIncState = (function(p, state) {
    return parseIncState(p, state, ok, err);
}));
(runInc = (function(p, ud) {
    return runIncState(p, new(ParserState)(NIL, Position.initial, ud));
}));
(runManyState = (function(p, state) {
    var manyP = optional(NIL, bind(p, (function(x0) {
        return new(Parser)((function(state0, m, _, _0, eok, _1) {
            return eok(memoStream(x0, runState.bind(null, manyP, state0, m)), state0, m);
        }));
    })));
    return runState(manyP, state);
}));
(runManyStream = (function(p, s, ud) {
    return runManyState(p, new(ParserState)(s, Position.initial, ud));
}));
(runMany = (function(p, input, ud) {
    return runManyStream(p, streamFrom(input), ud);
}));
(exports["provide"] = provide);
(exports["provideString"] = provideString);
(exports["finish"] = finish);
(exports["parseIncState"] = parseIncState);
(exports["parseInc"] = parseInc);
(exports["runIncState"] = runIncState);
(exports["runInc"] = runInc);
(exports["runManyState"] = runManyState);
(exports["runManyStream"] = runManyStream);
(exports["runMany"] = runMany);

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/lang.kep'
 * DO NOT EDIT
*/

var __o = __webpack_require__(61)["stream"],
    __o0 = __webpack_require__(61)["gen"],
    __o1 = __webpack_require__(63),
    times, atMostTimes, betweenTimes, then, between, sepBy1, sepBy, sepEndBy1, sepEndBy, endBy1, endBy, chainl1, chainl,
        chainr1, chainr, NIL = __o["NIL"],
    repeat = __o0["repeat"],
    append = __o1["append"],
    always = __o1["always"],
    bind = __o1["bind"],
    cons = __o1["cons"],
    either = __o1["either"],
    enumerations = __o1["enumerations"],
    late = __o1["late"],
    many = __o1["many"],
    many1 = __o1["many1"],
    next = __o1["next"],
    optional = __o1["optional"],
    rec = __o1["rec"],
    _end = always(NIL),
    _optionalValueParser = optional.bind(null, NIL);
(times = (function() {
    var args = arguments;
    return enumerations(repeat.apply(null, args));
}));
(atMostTimes = (function(n, p) {
    return ((n <= 0) ? _end : _optionalValueParser(cons(p, late((function() {
        return atMostTimes((n - 1), p);
    })))));
}));
(betweenTimes = (function(min, max, p) {
    var args, n;
    return append(((args = [min, p]), enumerations(repeat.apply(null, args))), ((n = (max - min)), ((n <= 0) ?
        _end : _optionalValueParser(cons(p, late((function() {
            return atMostTimes((n - 1), p);
        })))))));
}));
(then = (function(p, q) {
    return bind(p, (function(x) {
        return next(q, always(x));
    }));
}));
(between = (function(open, close, p) {
    return next(open, bind(p, (function(x) {
        return next(close, always(x));
    })));
}));
(sepBy1 = (function(sep, p) {
    return cons(p, many(next(sep, p)));
}));
(sepBy = (function() {
    var args = arguments;
    return _optionalValueParser(sepBy1.apply(null, args));
}));
(sepEndBy1 = (function(sep, p) {
    return rec((function(self) {
        return cons(p, _optionalValueParser(next(sep, _optionalValueParser(self))));
    }));
}));
(sepEndBy = (function(sep, p) {
    return either(rec((function(self) {
        return cons(p, _optionalValueParser(next(sep, _optionalValueParser(self))));
    })), next(optional(sep), _end));
}));
(endBy1 = (function(sep, p) {
    return many1(bind(p, (function(x) {
        return next(sep, always(x));
    })));
}));
(endBy = (function(sep, p) {
    return many(bind(p, (function(x) {
        return next(sep, always(x));
    })));
}));
(chainl1 = (function(op, p) {
    return bind(p, (function chain(x) {
        return optional(x, bind(op, (function(f) {
            return bind(p, (function(y) {
                return chain(f(x, y));
            }));
        })));
    }));
}));
(chainl = (function(op, x, p) {
    return optional(x, bind(p, (function chain(x0) {
        return optional(x0, bind(op, (function(f) {
            return bind(p, (function(y) {
                return chain(f(x0, y));
            }));
        })));
    })));
}));
(chainr1 = (function(op, p) {
    return rec((function(self) {
        return bind(p, (function(x) {
            return optional(x, bind(op, (function(f) {
                return self.map((function(y) {
                    return f(x, y);
                }));
            })));
        }));
    }));
}));
(chainr = (function(op, x, p) {
    return optional(x, rec((function(self) {
        return bind(p, (function(x0) {
            return optional(x0, bind(op, (function(f) {
                return self.map((function(y) {
                    return f(x0, y);
                }));
            })));
        }));
    })));
}));
(exports["times"] = times);
(exports["atMostTimes"] = atMostTimes);
(exports["betweenTimes"] = betweenTimes);
(exports["then"] = then);
(exports["between"] = between);
(exports["sepBy1"] = sepBy1);
(exports["sepBy"] = sepBy);
(exports["sepEndBy1"] = sepEndBy1);
(exports["sepEndBy"] = sepEndBy);
(exports["endBy1"] = endBy1);
(exports["endBy"] = endBy);
(exports["chainl1"] = chainl1);
(exports["chainl"] = chainl);
(exports["chainr1"] = chainr1);
(exports["chainr"] = chainr);

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/text.kep'
 * DO NOT EDIT
*/

var __o = __webpack_require__(63),
    character, oneOf, noneOf, string, trie, match, anyChar, letter, space, digit, always = __o["always"],
    attempt = __o["attempt"],
    bind = __o["bind"],
    optional = __o["optional"],
    ExpectError = __o["ExpectError"],
    next = __o["next"],
    label = __o["label"],
    token = __o["token"],
    join = Function.prototype.call.bind(Array.prototype.join),
    map = Function.prototype.call.bind(Array.prototype.map),
    reduce = Function.prototype.call.bind(Array.prototype.reduce),
    reduceRight = Function.prototype.call.bind(Array.prototype.reduceRight),
    StringError = (function(position, string, index, expected, found) {
        var self = this;
        ExpectError.call(self, position, expected, found);
        (self.string = string);
        (self.index = index);
    });
(StringError.prototype = new(ExpectError)());
(StringError.prototype.constructor = StringError);
Object.defineProperty(StringError.prototype, "errorMessage", ({
    "get": (function() {
        var self = this;
        return ((((((("In string: '" + self.string) + "' at index: ") + self.index) + ", Expected: ") +
            self.expected) + " Found: ") + (self.found ? self.found : "end of input"));
    })
}));
var unbox = (function(y) {
    return ("" + y);
}),
    _character = (function(c, err) {
        var x;
        return token(((x = ("" + c)), (function(r) {
            return (x === ("" + r));
        })), err);
    });
(character = (function(c) {
    return _character(c, (function(pos, tok) {
        return new(ExpectError)(pos, c, ((tok === null) ? "end of input" : tok));
    }));
}));
(oneOf = (function(chars) {
    var chars0 = map(chars, unbox),
        msg;
    return token((function(x) {
        return (chars0.indexOf(("" + x)) >= 0);
    }), ((msg = join(chars0, " or ")), (function(pos, tok) {
        return new(ExpectError)(pos, msg, ((tok === null) ? "end of input" : tok));
    })));
}));
(noneOf = (function(chars) {
    var chars0 = map(chars, unbox),
        msg;
    return token((function(z) {
        var x = (chars0.indexOf(("" + z)) >= 0);
        return (!x);
    }), ((msg = ("none of:" + join(chars0, " or "))), (function(pos, tok) {
        return new(ExpectError)(pos, msg, ((tok === null) ? "end of input" : tok));
    })));
}));
var reducer = (function(p, c, i, s) {
    return next(_character(c, (function(pos, tok) {
        return new(StringError)(pos, s, i, c, tok);
    })), p);
});
(string = (function(s) {
    return attempt(reduceRight(s, reducer, always(("" + s))));
}));
var wordReduce = (function(parent, l) {
    (parent[l] = (parent[l] || ({})));
    return parent[l];
}),
    wordsReduce = (function(trie, word) {
        var node = reduce(word, wordReduce, trie);
        (node[""] = word);
        return trie;
    }),
    _trie = (function(trie) {
        var chars, msg, keys = Object.keys(trie),
            paths = reduce(keys, (function(p, c) {
                if (c) {
                    (p[c] = _trie(trie[c]));
                }
                return p;
            }), ({})),
            select = attempt(bind(((chars = map(keys, unbox)), token((function(x) {
                return (chars.indexOf(("" + x)) >= 0);
            }), ((msg = join(chars, " or ")), (function(pos, tok) {
                return new(ExpectError)(pos, msg, ((tok === null) ? "end of input" : tok));
            })))), (function(y) {
                return paths[y];
            })));
        return (trie.hasOwnProperty("") ? optional(trie[""], select) : select);
    });
(trie = (function(z) {
    var z0 = reduce(z, wordsReduce, ({})),
        chars, msg, keys, paths, select;
    return attempt(((keys = Object.keys(z0)), (paths = reduce(keys, (function(p, c) {
        if (c) {
            (p[c] = _trie(z0[c]));
        }
        return p;
    }), ({}))), (select = attempt(bind(((chars = map(keys, unbox)), token((function(x) {
        return (chars.indexOf(("" + x)) >= 0);
    }), ((msg = join(chars, " or ")), (function(pos, tok) {
        return new(ExpectError)(pos, msg, ((tok === null) ? "end of input" :
            tok));
    })))), (function(y) {
        return paths[y];
    })))), (z0.hasOwnProperty("") ? optional(z0[""], select) : select)));
}));
(match = (function(pattern, expected) {
    return token(RegExp.prototype.test.bind(pattern), (function(pos, tok) {
        return new(ExpectError)(pos, expected, ((tok === null) ? "end of input" : tok));
    }));
}));
var pattern;
(anyChar = label("Any Character", ((pattern = /^.$/), token(RegExp.prototype.test.bind(pattern), (function(pos, tok) {
    return new(ExpectError)(pos, "any character", ((tok === null) ? "end of input" : tok));
})))));
var pattern0;
(letter = label("Any Letter", ((pattern0 = /^[a-z]$/i), token(RegExp.prototype.test.bind(pattern0), (function(pos, tok) {
    return new(ExpectError)(pos, "any letter character", ((tok === null) ? "end of input" : tok));
})))));
var pattern1;
(space = label("Any Whitespace", ((pattern1 = /^\s$/i), token(RegExp.prototype.test.bind(pattern1), (function(pos, tok) {
    return new(ExpectError)(pos, "any space character", ((tok === null) ? "end of input" : tok));
})))));
var pattern2;
(digit = label("Any Digit", ((pattern2 = /^[0-9]$/i), token(RegExp.prototype.test.bind(pattern2), (function(pos, tok) {
    return new(ExpectError)(pos, "any digit character", ((tok === null) ? "end of input" : tok));
})))));
(exports["character"] = character);
(exports["oneOf"] = oneOf);
(exports["noneOf"] = noneOf);
(exports["string"] = string);
(exports["trie"] = trie);
(exports["match"] = match);
(exports["anyChar"] = anyChar);
(exports["letter"] = letter);
(exports["space"] = space);
(exports["digit"] = digit);

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
    'parse': __webpack_require__(63),
    'incremental': __webpack_require__(156),
    'lang': __webpack_require__(157),
    'text': __webpack_require__(158)
};

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
var isArray = __webpack_require__(69);
var SPECIES = __webpack_require__(6)('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var fails = __webpack_require__(3);
var getTime = Date.prototype.getTime;
var $toISOString = Date.prototype.toISOString;

var lz = function (num) {
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
module.exports = (fails(function () {
  return $toISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
}) || !fails(function () {
  $toISOString.call(new Date(NaN));
})) ? function toISOString() {
  if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
  var d = this;
  var y = d.getUTCFullYear();
  var m = d.getUTCMilliseconds();
  var s = y < 0 ? '-' : y > 9999 ? '+' : '';
  return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
    '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
    'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
    ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
} : $toISOString;


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__(1);
var toPrimitive = __webpack_require__(30);
var NUMBER = 'number';

module.exports = function (hint) {
  if (hint !== 'string' && hint !== NUMBER && hint !== 'default') throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(33);
var gOPS = __webpack_require__(75);
var pIE = __webpack_require__(57);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 164 */
/***/ (function(module, exports) {

// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};


/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(15);
var $export = __webpack_require__(0);
var partial = __webpack_require__(99);
// https://esdiscuss.org/topic/promise-returning-delay-function
$export($export.G + $export.F, {
  delay: function delay(time) {
    return new (core.Promise || global.Promise)(function (resolve) {
      setTimeout(partial.call(resolve, true), time);
    });
  }
});


/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(23);
var $export = __webpack_require__(0);
var createDesc = __webpack_require__(39);
var assign = __webpack_require__(97);
var create = __webpack_require__(32);
var getPrototypeOf = __webpack_require__(19);
var getKeys = __webpack_require__(33);
var dP = __webpack_require__(8);
var keyOf = __webpack_require__(128);
var aFunction = __webpack_require__(13);
var forOf = __webpack_require__(37);
var isIterable = __webpack_require__(145);
var $iterCreate = __webpack_require__(71);
var step = __webpack_require__(92);
var isObject = __webpack_require__(4);
var toIObject = __webpack_require__(14);
var DESCRIPTORS = __webpack_require__(9);
var has = __webpack_require__(16);

// 0 -> Dict.forEach
// 1 -> Dict.map
// 2 -> Dict.filter
// 3 -> Dict.some
// 4 -> Dict.every
// 5 -> Dict.find
// 6 -> Dict.findKey
// 7 -> Dict.mapPairs
var createDictMethod = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_EVERY = TYPE == 4;
  return function (object, callbackfn, that /* = undefined */) {
    var f = ctx(callbackfn, that, 3);
    var O = toIObject(object);
    var result = IS_MAP || TYPE == 7 || TYPE == 2
          ? new (typeof this == 'function' ? this : Dict)() : undefined;
    var key, val, res;
    for (key in O) if (has(O, key)) {
      val = O[key];
      res = f(val, key, object);
      if (TYPE) {
        if (IS_MAP) result[key] = res;          // map
        else if (res) switch (TYPE) {
          case 2: result[key] = val; break;     // filter
          case 3: return true;                  // some
          case 5: return val;                   // find
          case 6: return key;                   // findKey
          case 7: result[res[0]] = res[1];      // mapPairs
        } else if (IS_EVERY) return false;      // every
      }
    }
    return TYPE == 3 || IS_EVERY ? IS_EVERY : result;
  };
};
var findKey = createDictMethod(6);

var createDictIter = function (kind) {
  return function (it) {
    return new DictIterator(it, kind);
  };
};
var DictIterator = function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._a = getKeys(iterated);   // keys
  this._i = 0;                   // next index
  this._k = kind;                // kind
};
$iterCreate(DictIterator, 'Dict', function () {
  var that = this;
  var O = that._t;
  var keys = that._a;
  var kind = that._k;
  var key;
  do {
    if (that._i >= keys.length) {
      that._t = undefined;
      return step(1);
    }
  } while (!has(O, key = keys[that._i++]));
  if (kind == 'keys') return step(0, key);
  if (kind == 'values') return step(0, O[key]);
  return step(0, [key, O[key]]);
});

function Dict(iterable) {
  var dict = create(null);
  if (iterable != undefined) {
    if (isIterable(iterable)) {
      forOf(iterable, true, function (key, value) {
        dict[key] = value;
      });
    } else assign(dict, iterable);
  }
  return dict;
}
Dict.prototype = null;

function reduce(object, mapfn, init) {
  aFunction(mapfn);
  var O = toIObject(object);
  var keys = getKeys(O);
  var length = keys.length;
  var i = 0;
  var memo, key;
  if (arguments.length < 3) {
    if (!length) throw TypeError('Reduce of empty object with no initial value');
    memo = O[keys[i++]];
  } else memo = Object(init);
  while (length > i) if (has(O, key = keys[i++])) {
    memo = mapfn(memo, O[key], key, object);
  }
  return memo;
}

function includes(object, el) {
  // eslint-disable-next-line no-self-compare
  return (el == el ? keyOf(object, el) : findKey(object, function (it) {
    // eslint-disable-next-line no-self-compare
    return it != it;
  })) !== undefined;
}

function get(object, key) {
  if (has(object, key)) return object[key];
}
function set(object, key, value) {
  if (DESCRIPTORS && key in Object) dP.f(object, key, createDesc(0, value));
  else object[key] = value;
  return object;
}

function isDict(it) {
  return isObject(it) && getPrototypeOf(it) === Dict.prototype;
}

$export($export.G + $export.F, { Dict: Dict });

$export($export.S, 'Dict', {
  keys: createDictIter('keys'),
  values: createDictIter('values'),
  entries: createDictIter('entries'),
  forEach: createDictMethod(0),
  map: createDictMethod(1),
  filter: createDictMethod(2),
  some: createDictMethod(3),
  every: createDictMethod(4),
  find: createDictMethod(5),
  findKey: findKey,
  mapPairs: createDictMethod(7),
  reduce: reduce,
  keyOf: keyOf,
  includes: includes,
  has: has,
  get: get,
  set: set,
  isDict: isDict
});


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(139);
var $export = __webpack_require__(0);

// Placeholder
__webpack_require__(15)._ = path._ = path._ || {};

$export($export.P + $export.F, 'Function', { part: __webpack_require__(99) });


/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(1);
var get = __webpack_require__(58);
module.exports = __webpack_require__(15).getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};


/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(72)(Number, 'Number', function (iterated) {
  this._l = +iterated;
  this._i = 0;
}, function () {
  var i = this._i++;
  var done = !(i < this._l);
  return { done: done, value: done ? undefined : i };
});


/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);

$export($export.S + $export.F, 'Object', { classof: __webpack_require__(42) });


/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var define = __webpack_require__(132);

$export($export.S + $export.F, 'Object', { define: define });


/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);

$export($export.S + $export.F, 'Object', { isObject: __webpack_require__(4) });


/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var define = __webpack_require__(132);
var create = __webpack_require__(32);

$export($export.S + $export.F, 'Object', {
  make: function (proto, mixin) {
    return define(create(proto), mixin);
  }
});


/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/benjamingr/RexExp.escape
var $export = __webpack_require__(0);
var $re = __webpack_require__(100)(/[\\^$*+?.()|[\]{}]/g, '\\$&');

$export($export.S, 'RegExp', { escape: function escape(it) { return $re(it); } });


/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $re = __webpack_require__(100)(/[&<>"']/g, {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&apos;'
});

$export($export.P + $export.F, 'String', { escapeHTML: function escapeHTML() { return $re(this); } });


/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $re = __webpack_require__(100)(/&(?:amp|lt|gt|quot|apos);/g, {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&apos;': "'"
});

$export($export.P + $export.F, 'String', { unescapeHTML: function unescapeHTML() { return $re(this); } });


/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = __webpack_require__(0);

$export($export.P, 'Array', { copyWithin: __webpack_require__(117) });

__webpack_require__(36)('copyWithin');


/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $every = __webpack_require__(26)(4);

$export($export.P + $export.F * !__webpack_require__(25)([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */) {
    return $every(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = __webpack_require__(0);

$export($export.P, 'Array', { fill: __webpack_require__(83) });

__webpack_require__(36)('fill');


/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $filter = __webpack_require__(26)(2);

$export($export.P + $export.F * !__webpack_require__(25)([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = __webpack_require__(0);
var $find = __webpack_require__(26)(6);
var KEY = 'findIndex';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(36)(KEY);


/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__(0);
var $find = __webpack_require__(26)(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(36)(KEY);


/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $forEach = __webpack_require__(26)(0);
var STRICT = __webpack_require__(25)([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(23);
var $export = __webpack_require__(0);
var toObject = __webpack_require__(11);
var call = __webpack_require__(127);
var isArrayIter = __webpack_require__(91);
var toLength = __webpack_require__(10);
var createProperty = __webpack_require__(85);
var getIterFn = __webpack_require__(58);

$export($export.S + $export.F * !__webpack_require__(73)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $indexOf = __webpack_require__(64)(false);
var $native = [].indexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(25)($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});


/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = __webpack_require__(0);

$export($export.S, 'Array', { isArray: __webpack_require__(69) });


/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.13 Array.prototype.join(separator)
var $export = __webpack_require__(0);
var toIObject = __webpack_require__(14);
var arrayJoin = [].join;

// fallback for not array-like strings
$export($export.P + $export.F * (__webpack_require__(56) != Object || !__webpack_require__(25)(arrayJoin)), 'Array', {
  join: function join(separator) {
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});


/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toIObject = __webpack_require__(14);
var toInteger = __webpack_require__(29);
var toLength = __webpack_require__(10);
var $native = [].lastIndexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(25)($native)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
    // convert -0 to +0
    if (NEGATIVE_ZERO) return $native.apply(this, arguments) || 0;
    var O = toIObject(this);
    var length = toLength(O.length);
    var index = length - 1;
    if (arguments.length > 1) index = Math.min(index, toInteger(arguments[1]));
    if (index < 0) index = length + index;
    for (;index >= 0; index--) if (index in O) if (O[index] === searchElement) return index || 0;
    return -1;
  }
});


/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $map = __webpack_require__(26)(1);

$export($export.P + $export.F * !__webpack_require__(25)([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var createProperty = __webpack_require__(85);

// WebKit Array.of isn't generic
$export($export.S + $export.F * __webpack_require__(3)(function () {
  function F() { /* empty */ }
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */) {
    var index = 0;
    var aLen = arguments.length;
    var result = new (typeof this == 'function' ? this : Array)(aLen);
    while (aLen > index) createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});


/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $reduce = __webpack_require__(119);

$export($export.P + $export.F * !__webpack_require__(25)([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});


/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $reduce = __webpack_require__(119);

$export($export.P + $export.F * !__webpack_require__(25)([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});


/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var html = __webpack_require__(89);
var cof = __webpack_require__(24);
var toAbsoluteIndex = __webpack_require__(48);
var toLength = __webpack_require__(10);
var arraySlice = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * __webpack_require__(3)(function () {
  if (html) arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end) {
    var len = toLength(this.length);
    var klass = cof(this);
    end = end === undefined ? len : end;
    if (klass == 'Array') return arraySlice.call(this, begin, end);
    var start = toAbsoluteIndex(begin, len);
    var upTo = toAbsoluteIndex(end, len);
    var size = toLength(upTo - start);
    var cloned = Array(size);
    var i = 0;
    for (; i < size; i++) cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});


/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $some = __webpack_require__(26)(3);

$export($export.P + $export.F * !__webpack_require__(25)([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var aFunction = __webpack_require__(13);
var toObject = __webpack_require__(11);
var fails = __webpack_require__(3);
var $sort = [].sort;
var test = [1, 2, 3];

$export($export.P + $export.F * (fails(function () {
  // IE8-
  test.sort(undefined);
}) || !fails(function () {
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !__webpack_require__(25)($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});


/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(47)('Array');


/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = __webpack_require__(0);

$export($export.S, 'Date', { now: function () { return new Date().getTime(); } });


/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = __webpack_require__(0);
var toISOString = __webpack_require__(161);

// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (Date.prototype.toISOString !== toISOString), 'Date', {
  toISOString: toISOString
});


/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(11);
var toPrimitive = __webpack_require__(30);

$export($export.P + $export.F * __webpack_require__(3)(function () {
  return new Date(NaN).toJSON() !== null
    || Date.prototype.toJSON.call({ toISOString: function () { return 1; } }) !== 1;
}), 'Date', {
  // eslint-disable-next-line no-unused-vars
  toJSON: function toJSON(key) {
    var O = toObject(this);
    var pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});


/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

var TO_PRIMITIVE = __webpack_require__(6)('toPrimitive');
var proto = Date.prototype;

if (!(TO_PRIMITIVE in proto)) __webpack_require__(17)(proto, TO_PRIMITIVE, __webpack_require__(162));


/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

var DateProto = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var $toString = DateProto[TO_STRING];
var getTime = DateProto.getTime;
if (new Date(NaN) + '' != INVALID_DATE) {
  __webpack_require__(20)(DateProto, TO_STRING, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}


/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = __webpack_require__(0);

$export($export.P, 'Function', { bind: __webpack_require__(120) });


/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isObject = __webpack_require__(4);
var getPrototypeOf = __webpack_require__(19);
var HAS_INSTANCE = __webpack_require__(6)('hasInstance');
var FunctionProto = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if (!(HAS_INSTANCE in FunctionProto)) __webpack_require__(8).f(FunctionProto, HAS_INSTANCE, { value: function (O) {
  if (typeof this != 'function' || !isObject(O)) return false;
  if (!isObject(this.prototype)) return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while (O = getPrototypeOf(O)) if (this.prototype === O) return true;
  return false;
} });


/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(8).f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || __webpack_require__(9) && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});


/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.3 Math.acosh(x)
var $export = __webpack_require__(0);
var log1p = __webpack_require__(130);
var sqrt = Math.sqrt;
var $acosh = Math.acosh;

$export($export.S + $export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x) {
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});


/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.5 Math.asinh(x)
var $export = __webpack_require__(0);
var $asinh = Math.asinh;

function asinh(x) {
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });


/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.7 Math.atanh(x)
var $export = __webpack_require__(0);
var $atanh = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x) {
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});


/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.9 Math.cbrt(x)
var $export = __webpack_require__(0);
var sign = __webpack_require__(94);

$export($export.S, 'Math', {
  cbrt: function cbrt(x) {
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});


/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.11 Math.clz32(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  clz32: function clz32(x) {
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});


/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.12 Math.cosh(x)
var $export = __webpack_require__(0);
var exp = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x) {
    return (exp(x = +x) + exp(-x)) / 2;
  }
});


/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.14 Math.expm1(x)
var $export = __webpack_require__(0);
var $expm1 = __webpack_require__(93);

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', { expm1: $expm1 });


/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { fround: __webpack_require__(129) });


/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = __webpack_require__(0);
var abs = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2) { // eslint-disable-line no-unused-vars
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;
    while (i < aLen) {
      arg = abs(arguments[i++]);
      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});


/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.18 Math.imul(x, y)
var $export = __webpack_require__(0);
var $imul = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * __webpack_require__(3)(function () {
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y) {
    var UINT16 = 0xffff;
    var xn = +x;
    var yn = +y;
    var xl = UINT16 & xn;
    var yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});


/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.21 Math.log10(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  log10: function log10(x) {
    return Math.log(x) * Math.LOG10E;
  }
});


/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.20 Math.log1p(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { log1p: __webpack_require__(130) });


/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.22 Math.log2(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  log2: function log2(x) {
    return Math.log(x) / Math.LN2;
  }
});


/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.28 Math.sign(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { sign: __webpack_require__(94) });


/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.30 Math.sinh(x)
var $export = __webpack_require__(0);
var expm1 = __webpack_require__(93);
var exp = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * __webpack_require__(3)(function () {
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x) {
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});


/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.33 Math.tanh(x)
var $export = __webpack_require__(0);
var expm1 = __webpack_require__(93);
var exp = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x) {
    var a = expm1(x = +x);
    var b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});


/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.34 Math.trunc(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  trunc: function trunc(it) {
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});


/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var has = __webpack_require__(16);
var cof = __webpack_require__(24);
var inheritIfRequired = __webpack_require__(90);
var toPrimitive = __webpack_require__(30);
var fails = __webpack_require__(3);
var gOPN = __webpack_require__(45).f;
var gOPD = __webpack_require__(18).f;
var dP = __webpack_require__(8).f;
var $trim = __webpack_require__(53).trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(__webpack_require__(32)(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = __webpack_require__(9) ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__(20)(global, NUMBER, $Number);
}


/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.1 Number.EPSILON
var $export = __webpack_require__(0);

$export($export.S, 'Number', { EPSILON: Math.pow(2, -52) });


/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.2 Number.isFinite(number)
var $export = __webpack_require__(0);
var _isFinite = __webpack_require__(2).isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it) {
    return typeof it == 'number' && _isFinite(it);
  }
});


/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var $export = __webpack_require__(0);

$export($export.S, 'Number', { isInteger: __webpack_require__(126) });


/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.4 Number.isNaN(number)
var $export = __webpack_require__(0);

$export($export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});


/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.5 Number.isSafeInteger(number)
var $export = __webpack_require__(0);
var isInteger = __webpack_require__(126);
var abs = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number) {
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});


/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = __webpack_require__(0);

$export($export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });


/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = __webpack_require__(0);

$export($export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });


/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseFloat = __webpack_require__(137);
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', { parseFloat: $parseFloat });


/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseInt = __webpack_require__(138);
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', { parseInt: $parseInt });


/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toInteger = __webpack_require__(29);
var aNumberValue = __webpack_require__(116);
var repeat = __webpack_require__(105);
var $toFixed = 1.0.toFixed;
var floor = Math.floor;
var data = [0, 0, 0, 0, 0, 0];
var ERROR = 'Number.toFixed: incorrect invocation!';
var ZERO = '0';

var multiply = function (n, c) {
  var i = -1;
  var c2 = c;
  while (++i < 6) {
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};
var divide = function (n) {
  var i = 6;
  var c = 0;
  while (--i >= 0) {
    c += data[i];
    data[i] = floor(c / n);
    c = (c % n) * 1e7;
  }
};
var numToString = function () {
  var i = 6;
  var s = '';
  while (--i >= 0) {
    if (s !== '' || i === 0 || data[i] !== 0) {
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
    }
  } return s;
};
var pow = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};
var log = function (x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  } return n;
};

$export($export.P + $export.F * (!!$toFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128.0.toFixed(0) !== '1000000000000000128'
) || !__webpack_require__(3)(function () {
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits) {
    var x = aNumberValue(this, ERROR);
    var f = toInteger(fractionDigits);
    var s = '';
    var m = ZERO;
    var e, z, j, k;
    if (f < 0 || f > 20) throw RangeError(ERROR);
    // eslint-disable-next-line no-self-compare
    if (x != x) return 'NaN';
    if (x <= -1e21 || x >= 1e21) return String(x);
    if (x < 0) {
      s = '-';
      x = -x;
    }
    if (x > 1e-21) {
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(0, z);
        j = f;
        while (j >= 7) {
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call(ZERO, f);
      }
    }
    if (f > 0) {
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    } return m;
  }
});


/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $fails = __webpack_require__(3);
var aNumberValue = __webpack_require__(116);
var $toPrecision = 1.0.toPrecision;

$export($export.P + $export.F * ($fails(function () {
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !$fails(function () {
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision) {
    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
  }
});


/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(0);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(97) });


/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(32) });


/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !__webpack_require__(9), 'Object', { defineProperties: __webpack_require__(133) });


/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(9), 'Object', { defineProperty: __webpack_require__(8).f });


/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(4);
var meta = __webpack_require__(38).onFreeze;

__webpack_require__(28)('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});


/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(14);
var $getOwnPropertyDescriptor = __webpack_require__(18).f;

__webpack_require__(28)('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 Object.getOwnPropertyNames(O)
__webpack_require__(28)('getOwnPropertyNames', function () {
  return __webpack_require__(134).f;
});


/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(11);
var $getPrototypeOf = __webpack_require__(19);

__webpack_require__(28)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.11 Object.isExtensible(O)
var isObject = __webpack_require__(4);

__webpack_require__(28)('isExtensible', function ($isExtensible) {
  return function isExtensible(it) {
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});


/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.12 Object.isFrozen(O)
var isObject = __webpack_require__(4);

__webpack_require__(28)('isFrozen', function ($isFrozen) {
  return function isFrozen(it) {
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});


/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.13 Object.isSealed(O)
var isObject = __webpack_require__(4);

__webpack_require__(28)('isSealed', function ($isSealed) {
  return function isSealed(it) {
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});


/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.10 Object.is(value1, value2)
var $export = __webpack_require__(0);
$export($export.S, 'Object', { is: __webpack_require__(164) });


/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(11);
var $keys = __webpack_require__(33);

__webpack_require__(28)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.15 Object.preventExtensions(O)
var isObject = __webpack_require__(4);
var meta = __webpack_require__(38).onFreeze;

__webpack_require__(28)('preventExtensions', function ($preventExtensions) {
  return function preventExtensions(it) {
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});


/***/ }),
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.17 Object.seal(O)
var isObject = __webpack_require__(4);
var meta = __webpack_require__(38).onFreeze;

__webpack_require__(28)('seal', function ($seal) {
  return function seal(it) {
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});


/***/ }),
/* 249 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(0);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(101).set });


/***/ }),
/* 250 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.3.6 Object.prototype.toString()
var classof = __webpack_require__(42);
var test = {};
test[__webpack_require__(6)('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  __webpack_require__(20)(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}


/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseFloat = __webpack_require__(137);
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), { parseFloat: $parseFloat });


/***/ }),
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseInt = __webpack_require__(138);
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), { parseInt: $parseInt });


/***/ }),
/* 253 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(44);
var global = __webpack_require__(2);
var ctx = __webpack_require__(23);
var classof = __webpack_require__(42);
var $export = __webpack_require__(0);
var isObject = __webpack_require__(4);
var aFunction = __webpack_require__(13);
var anInstance = __webpack_require__(41);
var forOf = __webpack_require__(37);
var speciesConstructor = __webpack_require__(79);
var task = __webpack_require__(107).set;
var microtask = __webpack_require__(95)();
var newPromiseCapabilityModule = __webpack_require__(96);
var perform = __webpack_require__(140);
var promiseResolve = __webpack_require__(141);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(6)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) { /* empty */ }
}();

// helpers
var sameConstructor = LIBRARY ? function (a, b) {
  // with library wrapper special case
  return a === b || a === $Promise && b === Wrapper;
} : function (a, b) {
  return a === b;
};
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value);
            if (domain) domain.exit();
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  if (promise._h == 1) return false;
  var chain = promise._a || promise._c;
  var i = 0;
  var reaction;
  while (chain.length > i) {
    reaction = chain[i++];
    if (reaction.fail || !isUnhandled(reaction.promise)) return false;
  } return true;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(46)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return sameConstructor($Promise, C)
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(52)($Promise, PROMISE);
__webpack_require__(47)(PROMISE);
Wrapper = __webpack_require__(15)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
    if (x instanceof $Promise && sameConstructor(x.constructor, this)) return x;
    return promiseResolve(this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(73)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export = __webpack_require__(0);
var aFunction = __webpack_require__(13);
var anObject = __webpack_require__(1);
var rApply = (__webpack_require__(2).Reflect || {}).apply;
var fApply = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !__webpack_require__(3)(function () {
  rApply(function () { /* empty */ });
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList) {
    var T = aFunction(target);
    var L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});


/***/ }),
/* 255 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export = __webpack_require__(0);
var create = __webpack_require__(32);
var aFunction = __webpack_require__(13);
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var fails = __webpack_require__(3);
var bind = __webpack_require__(120);
var rConstruct = (__webpack_require__(2).Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(rConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  rConstruct(function () { /* empty */ });
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});


/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP = __webpack_require__(8);
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var toPrimitive = __webpack_require__(30);

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * __webpack_require__(3)(function () {
  // eslint-disable-next-line no-undef
  Reflect.defineProperty(dP.f({}, 1, { value: 1 }), 1, { value: 2 });
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes) {
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 257 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export = __webpack_require__(0);
var gOPD = __webpack_require__(18).f;
var anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey) {
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});


/***/ }),
/* 258 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 26.1.5 Reflect.enumerate(target)
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var Enumerate = function (iterated) {
  this._t = anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = [];      // keys
  var key;
  for (key in iterated) keys.push(key);
};
__webpack_require__(71)(Enumerate, 'Object', function () {
  var that = this;
  var keys = that._k;
  var key;
  do {
    if (that._i >= keys.length) return { value: undefined, done: true };
  } while (!((key = keys[that._i++]) in that._t));
  return { value: key, done: false };
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target) {
    return new Enumerate(target);
  }
});


/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD = __webpack_require__(18);
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
    return gOPD.f(anObject(target), propertyKey);
  }
});


/***/ }),
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.8 Reflect.getPrototypeOf(target)
var $export = __webpack_require__(0);
var getProto = __webpack_require__(19);
var anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target) {
    return getProto(anObject(target));
  }
});


/***/ }),
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD = __webpack_require__(18);
var getPrototypeOf = __webpack_require__(19);
var has = __webpack_require__(16);
var $export = __webpack_require__(0);
var isObject = __webpack_require__(4);
var anObject = __webpack_require__(1);

function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var desc, proto;
  if (anObject(target) === receiver) return target[propertyKey];
  if (desc = gOPD.f(target, propertyKey)) return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if (isObject(proto = getPrototypeOf(target))) return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', { get: get });


/***/ }),
/* 262 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.9 Reflect.has(target, propertyKey)
var $export = __webpack_require__(0);

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey) {
    return propertyKey in target;
  }
});


/***/ }),
/* 263 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.10 Reflect.isExtensible(target)
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target) {
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});


/***/ }),
/* 264 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.11 Reflect.ownKeys(target)
var $export = __webpack_require__(0);

$export($export.S, 'Reflect', { ownKeys: __webpack_require__(98) });


/***/ }),
/* 265 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.12 Reflect.preventExtensions(target)
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target) {
    anObject(target);
    try {
      if ($preventExtensions) $preventExtensions(target);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 266 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export = __webpack_require__(0);
var setProto = __webpack_require__(101);

if (setProto) $export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto) {
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 267 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP = __webpack_require__(8);
var gOPD = __webpack_require__(18);
var getPrototypeOf = __webpack_require__(19);
var has = __webpack_require__(16);
var $export = __webpack_require__(0);
var createDesc = __webpack_require__(39);
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);

function set(target, propertyKey, V /* , receiver */) {
  var receiver = arguments.length < 4 ? target : arguments[3];
  var ownDesc = gOPD.f(anObject(target), propertyKey);
  var existingDescriptor, proto;
  if (!ownDesc) {
    if (isObject(proto = getPrototypeOf(target))) {
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if (has(ownDesc, 'value')) {
    if (ownDesc.writable === false || !isObject(receiver)) return false;
    existingDescriptor = gOPD.f(receiver, propertyKey) || createDesc(0);
    existingDescriptor.value = V;
    dP.f(receiver, propertyKey, existingDescriptor);
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', { set: set });


/***/ }),
/* 268 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var inheritIfRequired = __webpack_require__(90);
var dP = __webpack_require__(8).f;
var gOPN = __webpack_require__(45).f;
var isRegExp = __webpack_require__(70);
var $flags = __webpack_require__(67);
var $RegExp = global.RegExp;
var Base = $RegExp;
var proto = $RegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;
// "new" creates a new object, old webkit buggy here
var CORRECT_NEW = new $RegExp(re1) !== re1;

if (__webpack_require__(9) && (!CORRECT_NEW || __webpack_require__(3)(function () {
  re2[__webpack_require__(6)('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))) {
  $RegExp = function RegExp(p, f) {
    var tiRE = this instanceof $RegExp;
    var piRE = isRegExp(p);
    var fiU = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function (key) {
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function () { return Base[key]; },
      set: function (it) { Base[key] = it; }
    });
  };
  for (var keys = gOPN(Base), i = 0; keys.length > i;) proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  __webpack_require__(20)(global, 'RegExp', $RegExp);
}

__webpack_require__(47)('RegExp');


/***/ }),
/* 269 */
/***/ (function(module, exports, __webpack_require__) {

// @@match logic
__webpack_require__(66)('match', 1, function (defined, MATCH, $match) {
  // 21.1.3.11 String.prototype.match(regexp)
  return [function match(regexp) {
    'use strict';
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, $match];
});


/***/ }),
/* 270 */
/***/ (function(module, exports, __webpack_require__) {

// @@replace logic
__webpack_require__(66)('replace', 2, function (defined, REPLACE, $replace) {
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return [function replace(searchValue, replaceValue) {
    'use strict';
    var O = defined(this);
    var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined
      ? fn.call(searchValue, O, replaceValue)
      : $replace.call(String(O), searchValue, replaceValue);
  }, $replace];
});


/***/ }),
/* 271 */
/***/ (function(module, exports, __webpack_require__) {

// @@search logic
__webpack_require__(66)('search', 1, function (defined, SEARCH, $search) {
  // 21.1.3.15 String.prototype.search(regexp)
  return [function search(regexp) {
    'use strict';
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[SEARCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  }, $search];
});


/***/ }),
/* 272 */
/***/ (function(module, exports, __webpack_require__) {

// @@split logic
__webpack_require__(66)('split', 2, function (defined, SPLIT, $split) {
  'use strict';
  var isRegExp = __webpack_require__(70);
  var _split = $split;
  var $push = [].push;
  var $SPLIT = 'split';
  var LENGTH = 'length';
  var LAST_INDEX = 'lastIndex';
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
    // based on es5-shim implementation, need to rework it
    $split = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return _split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var separator2, match, lastIndex, lastLength, i;
      // Doesn't need flags gy, but they don't hurt
      if (!NPCG) separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
      while (match = separatorCopy.exec(string)) {
        // `separatorCopy.lastIndex` is not reliable cross-browser
        lastIndex = match.index + match[0][LENGTH];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
          // eslint-disable-next-line no-loop-func
          if (!NPCG && match[LENGTH] > 1) match[0].replace(separator2, function () {
            for (i = 1; i < arguments[LENGTH] - 2; i++) if (arguments[i] === undefined) match[i] = undefined;
          });
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    $split = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
    };
  }
  // 21.1.3.17 String.prototype.split(separator, limit)
  return [function split(separator, limit) {
    var O = defined(this);
    var fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
  }, $split];
});


/***/ }),
/* 273 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(147);
var anObject = __webpack_require__(1);
var $flags = __webpack_require__(67);
var DESCRIPTORS = __webpack_require__(9);
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  __webpack_require__(20)(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (__webpack_require__(3)(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}


/***/ }),
/* 274 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.2 String.prototype.anchor(name)
__webpack_require__(21)('anchor', function (createHTML) {
  return function anchor(name) {
    return createHTML(this, 'a', 'name', name);
  };
});


/***/ }),
/* 275 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.3 String.prototype.big()
__webpack_require__(21)('big', function (createHTML) {
  return function big() {
    return createHTML(this, 'big', '', '');
  };
});


/***/ }),
/* 276 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.4 String.prototype.blink()
__webpack_require__(21)('blink', function (createHTML) {
  return function blink() {
    return createHTML(this, 'blink', '', '');
  };
});


/***/ }),
/* 277 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.5 String.prototype.bold()
__webpack_require__(21)('bold', function (createHTML) {
  return function bold() {
    return createHTML(this, 'b', '', '');
  };
});


/***/ }),
/* 278 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $at = __webpack_require__(103)(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos) {
    return $at(this, pos);
  }
});


/***/ }),
/* 279 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])

var $export = __webpack_require__(0);
var toLength = __webpack_require__(10);
var context = __webpack_require__(104);
var ENDS_WITH = 'endsWith';
var $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * __webpack_require__(88)(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = context(this, searchString, ENDS_WITH);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = toLength(that.length);
    var end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
    var search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});


/***/ }),
/* 280 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.6 String.prototype.fixed()
__webpack_require__(21)('fixed', function (createHTML) {
  return function fixed() {
    return createHTML(this, 'tt', '', '');
  };
});


/***/ }),
/* 281 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.7 String.prototype.fontcolor(color)
__webpack_require__(21)('fontcolor', function (createHTML) {
  return function fontcolor(color) {
    return createHTML(this, 'font', 'color', color);
  };
});


/***/ }),
/* 282 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.8 String.prototype.fontsize(size)
__webpack_require__(21)('fontsize', function (createHTML) {
  return function fontsize(size) {
    return createHTML(this, 'font', 'size', size);
  };
});


/***/ }),
/* 283 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var toAbsoluteIndex = __webpack_require__(48);
var fromCharCode = String.fromCharCode;
var $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x) { // eslint-disable-line no-unused-vars
    var res = [];
    var aLen = arguments.length;
    var i = 0;
    var code;
    while (aLen > i) {
      code = +arguments[i++];
      if (toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});


/***/ }),
/* 284 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)

var $export = __webpack_require__(0);
var context = __webpack_require__(104);
var INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__(88)(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),
/* 285 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.9 String.prototype.italics()
__webpack_require__(21)('italics', function (createHTML) {
  return function italics() {
    return createHTML(this, 'i', '', '');
  };
});


/***/ }),
/* 286 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(103)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(72)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 287 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.10 String.prototype.link(url)
__webpack_require__(21)('link', function (createHTML) {
  return function link(url) {
    return createHTML(this, 'a', 'href', url);
  };
});


/***/ }),
/* 288 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var toIObject = __webpack_require__(14);
var toLength = __webpack_require__(10);

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite) {
    var tpl = toIObject(callSite.raw);
    var len = toLength(tpl.length);
    var aLen = arguments.length;
    var res = [];
    var i = 0;
    while (len > i) {
      res.push(String(tpl[i++]));
      if (i < aLen) res.push(String(arguments[i]));
    } return res.join('');
  }
});


/***/ }),
/* 289 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: __webpack_require__(105)
});


/***/ }),
/* 290 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.11 String.prototype.small()
__webpack_require__(21)('small', function (createHTML) {
  return function small() {
    return createHTML(this, 'small', '', '');
  };
});


/***/ }),
/* 291 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])

var $export = __webpack_require__(0);
var toLength = __webpack_require__(10);
var context = __webpack_require__(104);
var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * __webpack_require__(88)(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = context(this, searchString, STARTS_WITH);
    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});


/***/ }),
/* 292 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.12 String.prototype.strike()
__webpack_require__(21)('strike', function (createHTML) {
  return function strike() {
    return createHTML(this, 'strike', '', '');
  };
});


/***/ }),
/* 293 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.13 String.prototype.sub()
__webpack_require__(21)('sub', function (createHTML) {
  return function sub() {
    return createHTML(this, 'sub', '', '');
  };
});


/***/ }),
/* 294 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.14 String.prototype.sup()
__webpack_require__(21)('sup', function (createHTML) {
  return function sup() {
    return createHTML(this, 'sup', '', '');
  };
});


/***/ }),
/* 295 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.1.3.25 String.prototype.trim()
__webpack_require__(53)('trim', function ($trim) {
  return function trim() {
    return $trim(this, 3);
  };
});


/***/ }),
/* 296 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(2);
var has = __webpack_require__(16);
var DESCRIPTORS = __webpack_require__(9);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(20);
var META = __webpack_require__(38).KEY;
var $fails = __webpack_require__(3);
var shared = __webpack_require__(78);
var setToStringTag = __webpack_require__(52);
var uid = __webpack_require__(49);
var wks = __webpack_require__(6);
var wksExt = __webpack_require__(144);
var wksDefine = __webpack_require__(109);
var keyOf = __webpack_require__(128);
var enumKeys = __webpack_require__(163);
var isArray = __webpack_require__(69);
var anObject = __webpack_require__(1);
var toIObject = __webpack_require__(14);
var toPrimitive = __webpack_require__(30);
var createDesc = __webpack_require__(39);
var _create = __webpack_require__(32);
var gOPNExt = __webpack_require__(134);
var $GOPD = __webpack_require__(18);
var $DP = __webpack_require__(8);
var $keys = __webpack_require__(33);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(45).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(57).f = $propertyIsEnumerable;
  __webpack_require__(75).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(44)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key) {
    if (isSymbol(key)) return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    if (it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    replacer = args[1];
    if (typeof replacer == 'function') $replacer = replacer;
    if ($replacer || !isArray(replacer)) replacer = function (key, value) {
      if ($replacer) value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(17)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 297 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $typed = __webpack_require__(80);
var buffer = __webpack_require__(108);
var anObject = __webpack_require__(1);
var toAbsoluteIndex = __webpack_require__(48);
var toLength = __webpack_require__(10);
var isObject = __webpack_require__(4);
var ArrayBuffer = __webpack_require__(2).ArrayBuffer;
var speciesConstructor = __webpack_require__(79);
var $ArrayBuffer = buffer.ArrayBuffer;
var $DataView = buffer.DataView;
var $isView = $typed.ABV && ArrayBuffer.isView;
var $slice = $ArrayBuffer.prototype.slice;
var VIEW = $typed.VIEW;
var ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), { ArrayBuffer: $ArrayBuffer });

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it) {
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * __webpack_require__(3)(function () {
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end) {
    if ($slice !== undefined && end === undefined) return $slice.call(anObject(this), start); // FF fix
    var len = anObject(this).byteLength;
    var first = toAbsoluteIndex(start, len);
    var final = toAbsoluteIndex(end === undefined ? len : end, len);
    var result = new (speciesConstructor(this, $ArrayBuffer))(toLength(final - first));
    var viewS = new $DataView(this);
    var viewT = new $DataView(result);
    var index = 0;
    while (first < final) {
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

__webpack_require__(47)(ARRAY_BUFFER);


/***/ }),
/* 298 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
$export($export.G + $export.W + $export.F * !__webpack_require__(80).ABV, {
  DataView: __webpack_require__(108).DataView
});


/***/ }),
/* 299 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(34)('Float32', 4, function (init) {
  return function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 300 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(34)('Float64', 8, function (init) {
  return function Float64Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 301 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(34)('Int16', 2, function (init) {
  return function Int16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 302 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(34)('Int32', 4, function (init) {
  return function Int32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 303 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(34)('Int8', 1, function (init) {
  return function Int8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 304 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(34)('Uint16', 2, function (init) {
  return function Uint16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 305 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(34)('Uint32', 4, function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 306 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(34)('Uint8', 1, function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 307 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(34)('Uint8', 1, function (init) {
  return function Uint8ClampedArray(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
}, true);


/***/ }),
/* 308 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var weak = __webpack_require__(123);
var validate = __webpack_require__(54);
var WEAK_SET = 'WeakSet';

// 23.4 WeakSet Objects
__webpack_require__(65)(WEAK_SET, function (get) {
  return function WeakSet() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value) {
    return weak.def(validate(this, WEAK_SET), value, true);
  }
}, weak, false, true);


/***/ }),
/* 309 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatMap
var $export = __webpack_require__(0);
var flattenIntoArray = __webpack_require__(124);
var toObject = __webpack_require__(11);
var toLength = __webpack_require__(10);
var aFunction = __webpack_require__(13);
var arraySpeciesCreate = __webpack_require__(84);

$export($export.P, 'Array', {
  flatMap: function flatMap(callbackfn /* , thisArg */) {
    var O = toObject(this);
    var sourceLen, A;
    aFunction(callbackfn);
    sourceLen = toLength(O.length);
    A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments[1]);
    return A;
  }
});

__webpack_require__(36)('flatMap');


/***/ }),
/* 310 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatten
var $export = __webpack_require__(0);
var flattenIntoArray = __webpack_require__(124);
var toObject = __webpack_require__(11);
var toLength = __webpack_require__(10);
var toInteger = __webpack_require__(29);
var arraySpeciesCreate = __webpack_require__(84);

$export($export.P, 'Array', {
  flatten: function flatten(/* depthArg = 1 */) {
    var depthArg = arguments[0];
    var O = toObject(this);
    var sourceLen = toLength(O.length);
    var A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toInteger(depthArg));
    return A;
  }
});

__webpack_require__(36)('flatten');


/***/ }),
/* 311 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export = __webpack_require__(0);
var $includes = __webpack_require__(64)(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__(36)('includes');


/***/ }),
/* 312 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
var $export = __webpack_require__(0);
var microtask = __webpack_require__(95)();
var process = __webpack_require__(2).process;
var isNode = __webpack_require__(24)(process) == 'process';

$export($export.G, {
  asap: function asap(fn) {
    var domain = isNode && process.domain;
    microtask(domain ? domain.bind(fn) : fn);
  }
});


/***/ }),
/* 313 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/ljharb/proposal-is-error
var $export = __webpack_require__(0);
var cof = __webpack_require__(24);

$export($export.S, 'Error', {
  isError: function isError(it) {
    return cof(it) === 'Error';
  }
});


/***/ }),
/* 314 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-global
var $export = __webpack_require__(0);

$export($export.G, { global: __webpack_require__(2) });


/***/ }),
/* 315 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
__webpack_require__(76)('Map');


/***/ }),
/* 316 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
__webpack_require__(77)('Map');


/***/ }),
/* 317 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(0);

$export($export.P + $export.R, 'Map', { toJSON: __webpack_require__(122)('Map') });


/***/ }),
/* 318 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  clamp: function clamp(x, lower, upper) {
    return Math.min(upper, Math.max(lower, x));
  }
});


/***/ }),
/* 319 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', { DEG_PER_RAD: Math.PI / 180 });


/***/ }),
/* 320 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);
var RAD_PER_DEG = 180 / Math.PI;

$export($export.S, 'Math', {
  degrees: function degrees(radians) {
    return radians * RAD_PER_DEG;
  }
});


/***/ }),
/* 321 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);
var scale = __webpack_require__(131);
var fround = __webpack_require__(129);

$export($export.S, 'Math', {
  fscale: function fscale(x, inLow, inHigh, outLow, outHigh) {
    return fround(scale(x, inLow, inHigh, outLow, outHigh));
  }
});


/***/ }),
/* 322 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  iaddh: function iaddh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});


/***/ }),
/* 323 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  imulh: function imulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >> 16;
    var v1 = $v >> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
  }
});


/***/ }),
/* 324 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  isubh: function isubh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});


/***/ }),
/* 325 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', { RAD_PER_DEG: 180 / Math.PI });


/***/ }),
/* 326 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);
var DEG_PER_RAD = Math.PI / 180;

$export($export.S, 'Math', {
  radians: function radians(degrees) {
    return degrees * DEG_PER_RAD;
  }
});


/***/ }),
/* 327 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', { scale: __webpack_require__(131) });


/***/ }),
/* 328 */
/***/ (function(module, exports, __webpack_require__) {

// http://jfbastien.github.io/papers/Math.signbit.html
var $export = __webpack_require__(0);

$export($export.S, 'Math', { signbit: function signbit(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) != x ? x : x == 0 ? 1 / x == Infinity : x > 0;
} });


/***/ }),
/* 329 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  umulh: function umulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >>> 16;
    var v1 = $v >>> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
  }
});


/***/ }),
/* 330 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(11);
var aFunction = __webpack_require__(13);
var $defineProperty = __webpack_require__(8);

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
__webpack_require__(9) && $export($export.P + __webpack_require__(74), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter) {
    $defineProperty.f(toObject(this), P, { get: aFunction(getter), enumerable: true, configurable: true });
  }
});


/***/ }),
/* 331 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(11);
var aFunction = __webpack_require__(13);
var $defineProperty = __webpack_require__(8);

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
__webpack_require__(9) && $export($export.P + __webpack_require__(74), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter) {
    $defineProperty.f(toObject(this), P, { set: aFunction(setter), enumerable: true, configurable: true });
  }
});


/***/ }),
/* 332 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(0);
var $entries = __webpack_require__(136)(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});


/***/ }),
/* 333 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export = __webpack_require__(0);
var ownKeys = __webpack_require__(98);
var toIObject = __webpack_require__(14);
var gOPD = __webpack_require__(18);
var createProperty = __webpack_require__(85);

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIObject(object);
    var getDesc = gOPD.f;
    var keys = ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;
    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) createProperty(result, key, desc);
    }
    return result;
  }
});


/***/ }),
/* 334 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(11);
var toPrimitive = __webpack_require__(30);
var getPrototypeOf = __webpack_require__(19);
var getOwnPropertyDescriptor = __webpack_require__(18).f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
__webpack_require__(9) && $export($export.P + __webpack_require__(74), 'Object', {
  __lookupGetter__: function __lookupGetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.get;
    } while (O = getPrototypeOf(O));
  }
});


/***/ }),
/* 335 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(11);
var toPrimitive = __webpack_require__(30);
var getPrototypeOf = __webpack_require__(19);
var getOwnPropertyDescriptor = __webpack_require__(18).f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
__webpack_require__(9) && $export($export.P + __webpack_require__(74), 'Object', {
  __lookupSetter__: function __lookupSetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.set;
    } while (O = getPrototypeOf(O));
  }
});


/***/ }),
/* 336 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(0);
var $values = __webpack_require__(136)(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});


/***/ }),
/* 337 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/zenparsing/es-observable
var $export = __webpack_require__(0);
var global = __webpack_require__(2);
var core = __webpack_require__(15);
var microtask = __webpack_require__(95)();
var OBSERVABLE = __webpack_require__(6)('observable');
var aFunction = __webpack_require__(13);
var anObject = __webpack_require__(1);
var anInstance = __webpack_require__(41);
var redefineAll = __webpack_require__(46);
var hide = __webpack_require__(17);
var forOf = __webpack_require__(37);
var RETURN = forOf.RETURN;

var getMethod = function (fn) {
  return fn == null ? undefined : aFunction(fn);
};

var cleanupSubscription = function (subscription) {
  var cleanup = subscription._c;
  if (cleanup) {
    subscription._c = undefined;
    cleanup();
  }
};

var subscriptionClosed = function (subscription) {
  return subscription._o === undefined;
};

var closeSubscription = function (subscription) {
  if (!subscriptionClosed(subscription)) {
    subscription._o = undefined;
    cleanupSubscription(subscription);
  }
};

var Subscription = function (observer, subscriber) {
  anObject(observer);
  this._c = undefined;
  this._o = observer;
  observer = new SubscriptionObserver(this);
  try {
    var cleanup = subscriber(observer);
    var subscription = cleanup;
    if (cleanup != null) {
      if (typeof cleanup.unsubscribe === 'function') cleanup = function () { subscription.unsubscribe(); };
      else aFunction(cleanup);
      this._c = cleanup;
    }
  } catch (e) {
    observer.error(e);
    return;
  } if (subscriptionClosed(this)) cleanupSubscription(this);
};

Subscription.prototype = redefineAll({}, {
  unsubscribe: function unsubscribe() { closeSubscription(this); }
});

var SubscriptionObserver = function (subscription) {
  this._s = subscription;
};

SubscriptionObserver.prototype = redefineAll({}, {
  next: function next(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      try {
        var m = getMethod(observer.next);
        if (m) return m.call(observer, value);
      } catch (e) {
        try {
          closeSubscription(subscription);
        } finally {
          throw e;
        }
      }
    }
  },
  error: function error(value) {
    var subscription = this._s;
    if (subscriptionClosed(subscription)) throw value;
    var observer = subscription._o;
    subscription._o = undefined;
    try {
      var m = getMethod(observer.error);
      if (!m) throw value;
      value = m.call(observer, value);
    } catch (e) {
      try {
        cleanupSubscription(subscription);
      } finally {
        throw e;
      }
    } cleanupSubscription(subscription);
    return value;
  },
  complete: function complete(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      subscription._o = undefined;
      try {
        var m = getMethod(observer.complete);
        value = m ? m.call(observer, value) : undefined;
      } catch (e) {
        try {
          cleanupSubscription(subscription);
        } finally {
          throw e;
        }
      } cleanupSubscription(subscription);
      return value;
    }
  }
});

var $Observable = function Observable(subscriber) {
  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
};

redefineAll($Observable.prototype, {
  subscribe: function subscribe(observer) {
    return new Subscription(observer, this._f);
  },
  forEach: function forEach(fn) {
    var that = this;
    return new (core.Promise || global.Promise)(function (resolve, reject) {
      aFunction(fn);
      var subscription = that.subscribe({
        next: function (value) {
          try {
            return fn(value);
          } catch (e) {
            reject(e);
            subscription.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
    });
  }
});

redefineAll($Observable, {
  from: function from(x) {
    var C = typeof this === 'function' ? this : $Observable;
    var method = getMethod(anObject(x)[OBSERVABLE]);
    if (method) {
      var observable = anObject(method.call(x));
      return observable.constructor === C ? observable : new C(function (observer) {
        return observable.subscribe(observer);
      });
    }
    return new C(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          try {
            if (forOf(x, false, function (it) {
              observer.next(it);
              if (done) return RETURN;
            }) === RETURN) return;
          } catch (e) {
            if (done) throw e;
            observer.error(e);
            return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  },
  of: function of() {
    for (var i = 0, l = arguments.length, items = Array(l); i < l;) items[i] = arguments[i++];
    return new (typeof this === 'function' ? this : $Observable)(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          for (var j = 0; j < items.length; ++j) {
            observer.next(items[j]);
            if (done) return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  }
});

hide($Observable.prototype, OBSERVABLE, function () { return this; });

$export($export.G, { Observable: $Observable });

__webpack_require__(47)('Observable');


/***/ }),
/* 338 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(0);
var core = __webpack_require__(15);
var global = __webpack_require__(2);
var speciesConstructor = __webpack_require__(79);
var promiseResolve = __webpack_require__(141);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 339 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(0);
var newPromiseCapability = __webpack_require__(96);
var perform = __webpack_require__(140);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 340 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(31);
var anObject = __webpack_require__(1);
var toMetaKey = metadata.key;
var ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({ defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey) {
  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
} });


/***/ }),
/* 341 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(31);
var anObject = __webpack_require__(1);
var toMetaKey = metadata.key;
var getOrCreateMetadataMap = metadata.map;
var store = metadata.store;

metadata.exp({ deleteMetadata: function deleteMetadata(metadataKey, target /* , targetKey */) {
  var targetKey = arguments.length < 3 ? undefined : toMetaKey(arguments[2]);
  var metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
  if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
  if (metadataMap.size) return true;
  var targetMetadata = store.get(target);
  targetMetadata['delete'](targetKey);
  return !!targetMetadata.size || store['delete'](target);
} });


/***/ }),
/* 342 */
/***/ (function(module, exports, __webpack_require__) {

var Set = __webpack_require__(148);
var from = __webpack_require__(118);
var metadata = __webpack_require__(31);
var anObject = __webpack_require__(1);
var getPrototypeOf = __webpack_require__(19);
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

var ordinaryMetadataKeys = function (O, P) {
  var oKeys = ordinaryOwnMetadataKeys(O, P);
  var parent = getPrototypeOf(O);
  if (parent === null) return oKeys;
  var pKeys = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

metadata.exp({ getMetadataKeys: function getMetadataKeys(target /* , targetKey */) {
  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });


/***/ }),
/* 343 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(31);
var anObject = __webpack_require__(1);
var getPrototypeOf = __webpack_require__(19);
var ordinaryHasOwnMetadata = metadata.has;
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

var ordinaryGetMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

metadata.exp({ getMetadata: function getMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 344 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(31);
var anObject = __webpack_require__(1);
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadataKeys: function getOwnMetadataKeys(target /* , targetKey */) {
  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });


/***/ }),
/* 345 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(31);
var anObject = __webpack_require__(1);
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadata: function getOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 346 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(31);
var anObject = __webpack_require__(1);
var getPrototypeOf = __webpack_require__(19);
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

var ordinaryHasMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

metadata.exp({ hasMetadata: function hasMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 347 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(31);
var anObject = __webpack_require__(1);
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

metadata.exp({ hasOwnMetadata: function hasOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 348 */
/***/ (function(module, exports, __webpack_require__) {

var $metadata = __webpack_require__(31);
var anObject = __webpack_require__(1);
var aFunction = __webpack_require__(13);
var toMetaKey = $metadata.key;
var ordinaryDefineOwnMetadata = $metadata.set;

$metadata.exp({ metadata: function metadata(metadataKey, metadataValue) {
  return function decorator(target, targetKey) {
    ordinaryDefineOwnMetadata(
      metadataKey, metadataValue,
      (targetKey !== undefined ? anObject : aFunction)(target),
      toMetaKey(targetKey)
    );
  };
} });


/***/ }),
/* 349 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
__webpack_require__(76)('Set');


/***/ }),
/* 350 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
__webpack_require__(77)('Set');


/***/ }),
/* 351 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(0);

$export($export.P + $export.R, 'Set', { toJSON: __webpack_require__(122)('Set') });


/***/ }),
/* 352 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/mathiasbynens/String.prototype.at
var $export = __webpack_require__(0);
var $at = __webpack_require__(103)(true);

$export($export.P, 'String', {
  at: function at(pos) {
    return $at(this, pos);
  }
});


/***/ }),
/* 353 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/String.prototype.matchAll/
var $export = __webpack_require__(0);
var defined = __webpack_require__(27);
var toLength = __webpack_require__(10);
var isRegExp = __webpack_require__(70);
var getFlags = __webpack_require__(67);
var RegExpProto = RegExp.prototype;

var $RegExpStringIterator = function (regexp, string) {
  this._r = regexp;
  this._s = string;
};

__webpack_require__(71)($RegExpStringIterator, 'RegExp String', function next() {
  var match = this._r.exec(this._s);
  return { value: match, done: match === null };
});

$export($export.P, 'String', {
  matchAll: function matchAll(regexp) {
    defined(this);
    if (!isRegExp(regexp)) throw TypeError(regexp + ' is not a regexp!');
    var S = String(this);
    var flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp);
    var rx = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
    rx.lastIndex = toLength(regexp.lastIndex);
    return new $RegExpStringIterator(rx, S);
  }
});


/***/ }),
/* 354 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(0);
var $pad = __webpack_require__(142);

$export($export.P, 'String', {
  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});


/***/ }),
/* 355 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(0);
var $pad = __webpack_require__(142);

$export($export.P, 'String', {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});


/***/ }),
/* 356 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(53)('trimLeft', function ($trim) {
  return function trimLeft() {
    return $trim(this, 1);
  };
}, 'trimStart');


/***/ }),
/* 357 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(53)('trimRight', function ($trim) {
  return function trimRight() {
    return $trim(this, 2);
  };
}, 'trimEnd');


/***/ }),
/* 358 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(109)('asyncIterator');


/***/ }),
/* 359 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(109)('observable');


/***/ }),
/* 360 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-global
var $export = __webpack_require__(0);

$export($export.S, 'System', { global: __webpack_require__(2) });


/***/ }),
/* 361 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.from
__webpack_require__(76)('WeakMap');


/***/ }),
/* 362 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.of
__webpack_require__(77)('WeakMap');


/***/ }),
/* 363 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.from
__webpack_require__(76)('WeakSet');


/***/ }),
/* 364 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.of
__webpack_require__(77)('WeakSet');


/***/ }),
/* 365 */
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__(110);
var getKeys = __webpack_require__(33);
var redefine = __webpack_require__(20);
var global = __webpack_require__(2);
var hide = __webpack_require__(17);
var Iterators = __webpack_require__(43);
var wks = __webpack_require__(6);
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),
/* 366 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $task = __webpack_require__(107);
$export($export.G + $export.B, {
  setImmediate: $task.set,
  clearImmediate: $task.clear
});


/***/ }),
/* 367 */
/***/ (function(module, exports, __webpack_require__) {

// ie9- setTimeout & setInterval additional parameters fix
var global = __webpack_require__(2);
var $export = __webpack_require__(0);
var invoke = __webpack_require__(68);
var partial = __webpack_require__(99);
var navigator = global.navigator;
var MSIE = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
var wrap = function (set) {
  return MSIE ? function (fn, time /* , ...args */) {
    return set(invoke(
      partial,
      [].slice.call(arguments, 2),
      // eslint-disable-next-line no-new-func
      typeof fn == 'function' ? fn : Function(fn)
    ), time);
  } : set;
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout: wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});


/***/ }),
/* 368 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(296);
__webpack_require__(235);
__webpack_require__(237);
__webpack_require__(236);
__webpack_require__(239);
__webpack_require__(241);
__webpack_require__(246);
__webpack_require__(240);
__webpack_require__(238);
__webpack_require__(248);
__webpack_require__(247);
__webpack_require__(243);
__webpack_require__(244);
__webpack_require__(242);
__webpack_require__(234);
__webpack_require__(245);
__webpack_require__(249);
__webpack_require__(250);
__webpack_require__(202);
__webpack_require__(204);
__webpack_require__(203);
__webpack_require__(252);
__webpack_require__(251);
__webpack_require__(222);
__webpack_require__(232);
__webpack_require__(233);
__webpack_require__(223);
__webpack_require__(224);
__webpack_require__(225);
__webpack_require__(226);
__webpack_require__(227);
__webpack_require__(228);
__webpack_require__(229);
__webpack_require__(230);
__webpack_require__(231);
__webpack_require__(205);
__webpack_require__(206);
__webpack_require__(207);
__webpack_require__(208);
__webpack_require__(209);
__webpack_require__(210);
__webpack_require__(211);
__webpack_require__(212);
__webpack_require__(213);
__webpack_require__(214);
__webpack_require__(215);
__webpack_require__(216);
__webpack_require__(217);
__webpack_require__(218);
__webpack_require__(219);
__webpack_require__(220);
__webpack_require__(221);
__webpack_require__(283);
__webpack_require__(288);
__webpack_require__(295);
__webpack_require__(286);
__webpack_require__(278);
__webpack_require__(279);
__webpack_require__(284);
__webpack_require__(289);
__webpack_require__(291);
__webpack_require__(274);
__webpack_require__(275);
__webpack_require__(276);
__webpack_require__(277);
__webpack_require__(280);
__webpack_require__(281);
__webpack_require__(282);
__webpack_require__(285);
__webpack_require__(287);
__webpack_require__(290);
__webpack_require__(292);
__webpack_require__(293);
__webpack_require__(294);
__webpack_require__(197);
__webpack_require__(199);
__webpack_require__(198);
__webpack_require__(201);
__webpack_require__(200);
__webpack_require__(186);
__webpack_require__(184);
__webpack_require__(190);
__webpack_require__(187);
__webpack_require__(193);
__webpack_require__(195);
__webpack_require__(183);
__webpack_require__(189);
__webpack_require__(180);
__webpack_require__(194);
__webpack_require__(178);
__webpack_require__(192);
__webpack_require__(191);
__webpack_require__(185);
__webpack_require__(188);
__webpack_require__(177);
__webpack_require__(179);
__webpack_require__(182);
__webpack_require__(181);
__webpack_require__(196);
__webpack_require__(110);
__webpack_require__(268);
__webpack_require__(273);
__webpack_require__(147);
__webpack_require__(269);
__webpack_require__(270);
__webpack_require__(271);
__webpack_require__(272);
__webpack_require__(253);
__webpack_require__(146);
__webpack_require__(148);
__webpack_require__(149);
__webpack_require__(308);
__webpack_require__(297);
__webpack_require__(298);
__webpack_require__(303);
__webpack_require__(306);
__webpack_require__(307);
__webpack_require__(301);
__webpack_require__(304);
__webpack_require__(302);
__webpack_require__(305);
__webpack_require__(299);
__webpack_require__(300);
__webpack_require__(254);
__webpack_require__(255);
__webpack_require__(256);
__webpack_require__(257);
__webpack_require__(258);
__webpack_require__(261);
__webpack_require__(259);
__webpack_require__(260);
__webpack_require__(262);
__webpack_require__(263);
__webpack_require__(264);
__webpack_require__(265);
__webpack_require__(267);
__webpack_require__(266);
__webpack_require__(311);
__webpack_require__(309);
__webpack_require__(310);
__webpack_require__(352);
__webpack_require__(355);
__webpack_require__(354);
__webpack_require__(356);
__webpack_require__(357);
__webpack_require__(353);
__webpack_require__(358);
__webpack_require__(359);
__webpack_require__(333);
__webpack_require__(336);
__webpack_require__(332);
__webpack_require__(330);
__webpack_require__(331);
__webpack_require__(334);
__webpack_require__(335);
__webpack_require__(317);
__webpack_require__(351);
__webpack_require__(316);
__webpack_require__(350);
__webpack_require__(362);
__webpack_require__(364);
__webpack_require__(315);
__webpack_require__(349);
__webpack_require__(361);
__webpack_require__(363);
__webpack_require__(314);
__webpack_require__(360);
__webpack_require__(313);
__webpack_require__(318);
__webpack_require__(319);
__webpack_require__(320);
__webpack_require__(321);
__webpack_require__(322);
__webpack_require__(324);
__webpack_require__(323);
__webpack_require__(325);
__webpack_require__(326);
__webpack_require__(327);
__webpack_require__(329);
__webpack_require__(328);
__webpack_require__(338);
__webpack_require__(339);
__webpack_require__(340);
__webpack_require__(341);
__webpack_require__(343);
__webpack_require__(342);
__webpack_require__(345);
__webpack_require__(344);
__webpack_require__(346);
__webpack_require__(347);
__webpack_require__(348);
__webpack_require__(312);
__webpack_require__(337);
__webpack_require__(367);
__webpack_require__(366);
__webpack_require__(365);
module.exports = __webpack_require__(15);


/***/ }),
/* 369 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export addRangeInPlace */
/* unused harmony export copyTo */
/* unused harmony export partition */
/* harmony export (immutable) */ __webpack_exports__["a"] = permute;
/* unused harmony export removeInPlace */
/* unused harmony export setSlice */
/* unused harmony export sortInPlaceBy */
/* unused harmony export unzip */
/* unused harmony export unzip3 */
/* unused harmony export getSubArray */
/* unused harmony export fill */
function addRangeInPlace(range, xs) {
    var iter = range[Symbol.iterator]();
    var cur = iter.next();
    while (!cur.done) {
        xs.push(cur.value);
        cur = iter.next();
    }
}
function copyTo(source, sourceIndex, target, targetIndex, count) {
    while (count--)
        target[targetIndex++] = source[sourceIndex++];
}
function partition(f, xs) {
    var ys = [], zs = [], j = 0, k = 0;
    for (var i = 0; i < xs.length; i++)
        if (f(xs[i]))
            ys[j++] = xs[i];
        else
            zs[k++] = xs[i];
    return [ys, zs];
}
function permute(f, xs) {
    var ys = xs.map(function () { return null; });
    var checkFlags = new Array(xs.length);
    for (var i = 0; i < xs.length; i++) {
        var j = f(i);
        if (j < 0 || j >= xs.length)
            throw new Error("Not a valid permutation");
        ys[j] = xs[i];
        checkFlags[j] = 1;
    }
    for (var i = 0; i < xs.length; i++)
        if (checkFlags[i] != 1)
            throw new Error("Not a valid permutation");
    return ys;
}
function removeInPlace(item, xs) {
    var i = xs.indexOf(item);
    if (i > -1) {
        xs.splice(i, 1);
        return true;
    }
    return false;
}
function setSlice(target, lower, upper, source) {
    var length = (upper || target.length - 1) - lower;
    if (ArrayBuffer.isView(target) && source.length <= length)
        target.set(source, lower);
    else
        for (var i = lower | 0, j = 0; j <= length; i++, j++)
            target[i] = source[j];
}
function sortInPlaceBy(f, xs, dir) {
    if (dir === void 0) { dir = 1; }
    return xs.sort(function (x, y) {
        x = f(x);
        y = f(y);
        return (x < y ? -1 : x == y ? 0 : 1) * dir;
    });
}
function unzip(xs) {
    var bs = new Array(xs.length), cs = new Array(xs.length);
    for (var i = 0; i < xs.length; i++) {
        bs[i] = xs[i][0];
        cs[i] = xs[i][1];
    }
    return [bs, cs];
}
function unzip3(xs) {
    var bs = new Array(xs.length), cs = new Array(xs.length), ds = new Array(xs.length);
    for (var i = 0; i < xs.length; i++) {
        bs[i] = xs[i][0];
        cs[i] = xs[i][1];
        ds[i] = xs[i][2];
    }
    return [bs, cs, ds];
}
function getSubArray(xs, startIndex, count) {
    return xs.slice(startIndex, startIndex + count);
}
function fill(target, targetIndex, count, value) {
    target.fill(value, targetIndex, targetIndex + count);
}


/***/ }),
/* 370 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Long__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Seq__ = __webpack_require__(7);
/* unused harmony export pow32 */
/* unused harmony export leastBounding2Power */
/* unused harmony export k */
/* unused harmony export m */
/* unused harmony export g */
/* unused harmony export w */
/* unused harmony export primeP */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return maxBitsInsideFp; });
/* unused harmony export p */
/* unused harmony export p64 */
/* harmony export (immutable) */ __webpack_exports__["d"] = toInt;
/* harmony export (immutable) */ __webpack_exports__["b"] = ofInt32;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return mzero; });
/* unused harmony export mone */
/* unused harmony export mtwo */
/* unused harmony export mpow */
/* unused harmony export mpowL */
/* unused harmony export m2PowNthRoot */
/* unused harmony export minv */
/* unused harmony export computeFFT */
/* unused harmony export computFftInPlace */
/* unused harmony export computeInverseFftInPlace */
/* unused harmony export maxTwoPower */
/* unused harmony export twoPowerTable */
/* harmony export (immutable) */ __webpack_exports__["e"] = computeFftPaddedPolynomialProduct;
/* unused harmony export padTo */
/* unused harmony export computeFftPolynomialProduct */
/* unused harmony export maxFp */


function pow32(x, n) {
    if (n === 0) {
        return 1;
    }
    else if (n % 2 === 0) {
        return pow32(x * x, ~~(n / 2));
    }
    else {
        return x * pow32(x * x, ~~(n / 2));
    }
}
function leastBounding2Power(b) {
    var findBounding2Power = function (b_1) { return function (tp) { return function (i) {
        if (b_1 <= tp) {
            return [tp, i];
        }
        else {
            return findBounding2Power(b_1)(tp * 2)(i + 1);
        }
    }; }; };
    return findBounding2Power(b)(1)(0);
}
var k = 27;
var m = 15;
var g = 31;
var w = 440564289;
var primeP = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Long__["b" /* fromBits */])(2013265921, 0, false);
var maxBitsInsideFp = 30;
var p = 2013265921;
var p64 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Long__["b" /* fromBits */])(2013265921, 0, true);
function toInt(x) {
    return ~~x;
}
function ofInt32(x) {
    return x >>> 0;
}
var mzero = 0;
var mone = 1;
var mtwo = 2;
function mpow(x, n) {
    if (n === 0) {
        return mone;
    }
    else if (n % 2 === 0) {
        return mpow(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Long__["a" /* fromNumber */])(x, true).mul(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Long__["a" /* fromNumber */])(x, true)).mod(p64).toNumber() >>> 0, ~~(n / 2));
    }
    else {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Long__["a" /* fromNumber */])(x, true).mul(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Long__["a" /* fromNumber */])(mpow(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Long__["a" /* fromNumber */])(x, true).mul(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Long__["a" /* fromNumber */])(x, true)).mod(p64).toNumber() >>> 0, ~~(n / 2)), true)).mod(p64).toNumber() >>> 0;
    }
}
function mpowL(x, n) {
    if (n.Equals(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Long__["b" /* fromBits */])(0, 0, false))) {
        return mone;
    }
    else if (n.mod(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Long__["b" /* fromBits */])(2, 0, false)).Equals(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Long__["b" /* fromBits */])(0, 0, false))) {
        return mpowL(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Long__["a" /* fromNumber */])(x, true).mul(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Long__["a" /* fromNumber */])(x, true)).mod(p64).toNumber() >>> 0, n.div(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Long__["b" /* fromBits */])(2, 0, false)));
    }
    else {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Long__["a" /* fromNumber */])(x, true).mul(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Long__["a" /* fromNumber */])(mpowL(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Long__["a" /* fromNumber */])(x, true).mul(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Long__["a" /* fromNumber */])(x, true)).mod(p64).toNumber() >>> 0, n.div(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Long__["b" /* fromBits */])(2, 0, false))), true)).mod(p64).toNumber() >>> 0;
    }
}
function m2PowNthRoot(n) {
    return mpow(w >>> 0, pow32(2, k - n));
}
function minv(x) {
    return mpowL(x, primeP.sub(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Long__["b" /* fromBits */])(2, 0, false)));
}
function computeFFT(lambda, mu, n, w_1, u, res, offset) {
    if (n === 1) {
        res[offset] = u[mu];
    }
    else {
        var halfN = ~~(n / 2);
        var ww = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Long__["a" /* fromNumber */])(w_1, true).mul(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Long__["a" /* fromNumber */])(w_1, true)).mod(p64).toNumber() >>> 0;
        var offsetHalfN = offset + halfN;
        computeFFT(lambda * 2, mu, halfN, ww, u, res, offset);
        computeFFT(lambda * 2, lambda + mu, halfN, ww, u, res, offsetHalfN);
        var wj = mone;
        for (var j = 0; j <= halfN - 1; j++) {
            var even = res[offset + j];
            var odd = res[offsetHalfN + j];
            res[offset + j] = (even + (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Long__["a" /* fromNumber */])(wj, true).mul(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Long__["a" /* fromNumber */])(odd, true)).mod(p64).toNumber() >>> 0)) % p;
            res[offsetHalfN + j] = (even + p - (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Long__["a" /* fromNumber */])(wj, true).mul(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Long__["a" /* fromNumber */])(odd, true)).mod(p64).toNumber() >>> 0)) % p;
            wj = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Long__["a" /* fromNumber */])(w_1, true).mul(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Long__["a" /* fromNumber */])(wj, true)).mod(p64).toNumber() >>> 0;
        }
    }
}
function computFftInPlace(n, w_1, u) {
    var lambda = 1;
    var mu = 0;
    var res = Uint32Array.from(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Seq__["replicate"])(n, mzero));
    var offset = 0;
    computeFFT(lambda, mu, n, w_1, u, res, offset);
    return res;
}
function computeInverseFftInPlace(n, w_1, uT) {
    var bigKInv = minv(n >>> 0);
    return computFftInPlace(n, minv(w_1), uT).map(function (y) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Long__["a" /* fromNumber */])(bigKInv, true).mul(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Long__["a" /* fromNumber */])(y, true)).mod(p64).toNumber() >>> 0; });
}
var maxTwoPower = 29;
var twoPowerTable = Int32Array.from(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Seq__["initialize"])(maxTwoPower - 1, function (i) { return pow32(2, i); }));
function computeFftPaddedPolynomialProduct(bigK, k_1, u, v) {
    var w_1 = m2PowNthRoot(k_1);
    var uT = computFftInPlace(bigK, w_1, u);
    var vT = computFftInPlace(bigK, w_1, v);
    var rT = Uint32Array.from(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Seq__["initialize"])(bigK, function (i) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Long__["a" /* fromNumber */])(uT[i], true).mul(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Long__["a" /* fromNumber */])(vT[i], true)).mod(p64).toNumber() >>> 0; }));
    var r = computeInverseFftInPlace(bigK, w_1, rT);
    return r;
}
function padTo(n, u) {
    var uBound = u.length;
    return Uint32Array.from(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Seq__["initialize"])(n, function (i) {
        if (i < uBound) {
            return ofInt32(u[i]);
        }
        else {
            return mzero;
        }
    }));
}
function computeFftPolynomialProduct(degu, u, degv, v) {
    var deguv = degu + degv;
    var bound = deguv + 1;
    var patternInput = leastBounding2Power(bound);
    var w_1 = m2PowNthRoot(patternInput[1]);
    var u_1 = padTo(patternInput[0], u);
    var v_1 = padTo(patternInput[0], v);
    var uT = computFftInPlace(patternInput[0], w_1, u_1);
    var vT = computFftInPlace(patternInput[0], w_1, v_1);
    var rT = Uint32Array.from(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Seq__["initialize"])(patternInput[0], function (i) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Long__["a" /* fromNumber */])(uT[i], true).mul(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Long__["a" /* fromNumber */])(vT[i], true)).mod(p64).toNumber() >>> 0; }));
    var r = computeInverseFftInPlace(patternInput[0], w_1, rT);
    return Int32Array.from(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Seq__["map"])(function (x) { return toInt(x); }, r));
}
var maxFp = (p + p - mone) % p;


/***/ }),
/* 371 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export create */
/* harmony export (immutable) */ __webpack_exports__["a"] = escape;
/* unused harmony export unescape */
/* unused harmony export isMatch */
/* unused harmony export match */
/* unused harmony export matches */
/* unused harmony export options */
/* unused harmony export replace */
/* unused harmony export split */
function create(pattern, options) {
    var flags = "g";
    flags += options & 1 ? "i" : "";
    flags += options & 2 ? "m" : "";
    return new RegExp(pattern, flags);
}
function escape(str) {
    return str.replace(/[\-\[\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
function unescape(str) {
    return str.replace(/\\([\-\[\/\{\}\(\)\*\+\?\.\\\^\$\|])/g, "$1");
}
function isMatch(str, pattern, options) {
    if (options === void 0) { options = 0; }
    var reg = str instanceof RegExp
        ? (reg = str, str = pattern, reg.lastIndex = options, reg)
        : reg = create(pattern, options);
    return reg.test(str);
}
function match(str, pattern, options) {
    if (options === void 0) { options = 0; }
    var reg = str instanceof RegExp
        ? (reg = str, str = pattern, reg.lastIndex = options, reg)
        : reg = create(pattern, options);
    return reg.exec(str);
}
function matches(str, pattern, options) {
    if (options === void 0) { options = 0; }
    var reg = str instanceof RegExp
        ? (reg = str, str = pattern, reg.lastIndex = options, reg)
        : reg = create(pattern, options);
    if (!reg.global)
        throw new Error("Non-global RegExp");
    var m;
    var matches = [];
    while ((m = reg.exec(str)) !== null)
        matches.push(m);
    return matches;
}
function options(reg) {
    var options = 256;
    options |= reg.ignoreCase ? 1 : 0;
    options |= reg.multiline ? 2 : 0;
    return options;
}
function replace(reg, input, replacement, limit, offset) {
    if (offset === void 0) { offset = 0; }
    function replacer() {
        var res = arguments[0];
        if (limit !== 0) {
            limit--;
            var match_1 = [];
            var len = arguments.length;
            for (var i = 0; i < len - 2; i++)
                match_1.push(arguments[i]);
            match_1.index = arguments[len - 2];
            match_1.input = arguments[len - 1];
            res = replacement(match_1);
        }
        return res;
    }
    if (typeof reg == "string") {
        var tmp = reg;
        reg = create(input, limit);
        input = tmp;
        limit = undefined;
    }
    if (typeof replacement == "function") {
        limit = limit == null ? -1 : limit;
        return input.substring(0, offset) + input.substring(offset).replace(reg, replacer);
    }
    else {
        if (limit != null) {
            var m = void 0;
            var sub1 = input.substring(offset);
            var _matches = matches(reg, sub1);
            var sub2 = matches.length > limit ? (m = _matches[limit - 1], sub1.substring(0, m.index + m[0].length)) : sub1;
            return input.substring(0, offset) + sub2.replace(reg, replacement) + input.substring(offset + sub2.length);
        }
        else {
            return input.replace(reg, replacement);
        }
    }
}
function split(reg, input, limit, offset) {
    if (offset === void 0) { offset = 0; }
    if (typeof reg == "string") {
        var tmp = reg;
        reg = create(input, limit);
        input = tmp;
        limit = undefined;
    }
    input = input.substring(offset);
    return input.split(reg, limit);
}


/***/ }),
/* 372 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__List__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Util__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__GenericComparer__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Symbol__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Seq__ = __webpack_require__(7);
/* harmony export (immutable) */ __webpack_exports__["distinctBy"] = distinctBy;
/* harmony export (immutable) */ __webpack_exports__["distinct"] = distinct;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetTree", function() { return SetTree; });
/* harmony export (immutable) */ __webpack_exports__["create"] = create;
/* harmony export (immutable) */ __webpack_exports__["isEmpty"] = isEmpty;
/* harmony export (immutable) */ __webpack_exports__["add"] = add;
/* harmony export (immutable) */ __webpack_exports__["addInPlace"] = addInPlace;
/* harmony export (immutable) */ __webpack_exports__["remove"] = remove;
/* harmony export (immutable) */ __webpack_exports__["union"] = union;
/* harmony export (immutable) */ __webpack_exports__["op_Addition"] = op_Addition;
/* harmony export (immutable) */ __webpack_exports__["unionInPlace"] = unionInPlace;
/* harmony export (immutable) */ __webpack_exports__["unionMany"] = unionMany;
/* harmony export (immutable) */ __webpack_exports__["difference"] = difference;
/* harmony export (immutable) */ __webpack_exports__["op_Subtraction"] = op_Subtraction;
/* harmony export (immutable) */ __webpack_exports__["differenceInPlace"] = differenceInPlace;
/* harmony export (immutable) */ __webpack_exports__["intersect"] = intersect;
/* harmony export (immutable) */ __webpack_exports__["intersectInPlace"] = intersectInPlace;
/* harmony export (immutable) */ __webpack_exports__["intersectMany"] = intersectMany;
/* harmony export (immutable) */ __webpack_exports__["isProperSubsetOf"] = isProperSubsetOf;
/* harmony export (immutable) */ __webpack_exports__["isProperSubset"] = isProperSubset;
/* harmony export (immutable) */ __webpack_exports__["isSubsetOf"] = isSubsetOf;
/* harmony export (immutable) */ __webpack_exports__["isSubset"] = isSubset;
/* harmony export (immutable) */ __webpack_exports__["isProperSupersetOf"] = isProperSupersetOf;
/* harmony export (immutable) */ __webpack_exports__["isProperSuperset"] = isProperSuperset;
/* harmony export (immutable) */ __webpack_exports__["isSupersetOf"] = isSupersetOf;
/* harmony export (immutable) */ __webpack_exports__["isSuperset"] = isSuperset;
/* harmony export (immutable) */ __webpack_exports__["copyTo"] = copyTo;
/* harmony export (immutable) */ __webpack_exports__["partition"] = partition;
/* harmony export (immutable) */ __webpack_exports__["filter"] = filter;
/* harmony export (immutable) */ __webpack_exports__["map"] = map;
/* harmony export (immutable) */ __webpack_exports__["exists"] = exists;
/* harmony export (immutable) */ __webpack_exports__["forAll"] = forAll;
/* harmony export (immutable) */ __webpack_exports__["fold"] = fold;
/* harmony export (immutable) */ __webpack_exports__["foldBack"] = foldBack;
/* harmony export (immutable) */ __webpack_exports__["iterate"] = iterate;
/* harmony export (immutable) */ __webpack_exports__["minimumElement"] = minimumElement;
/* harmony export (immutable) */ __webpack_exports__["minElement"] = minElement;
/* harmony export (immutable) */ __webpack_exports__["maximumElement"] = maximumElement;
/* harmony export (immutable) */ __webpack_exports__["maxElement"] = maxElement;












function distinctBy(f, xs) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__Seq__["choose"])(function (tup) { return tup[0]; }, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__Seq__["scan"])(function (tup, x) {
        var acc = tup[1];
        var k = f(x);
        return acc.has(k) ? [null, acc] : [x, add(k, acc)];
    }, [null, create()], xs));
}
function distinct(xs) {
    return distinctBy(function (x) { return x; }, xs);
}
var SetTree = (function () {
    function SetTree(caseName, fields) {
        this.Case = caseName;
        this.Fields = fields;
    }
    return SetTree;
}());

var tree_tolerance = 2;
function tree_countAux(s, acc) {
    return s.Case === "SetOne" ? acc + 1 : s.Case === "SetEmpty" ? acc : tree_countAux(s.Fields[1], tree_countAux(s.Fields[2], acc + 1));
}
function tree_count(s) {
    return tree_countAux(s, 0);
}
function tree_SetOne(n) {
    return new SetTree("SetOne", [n]);
}
function tree_SetNode(x, l, r, h) {
    return new SetTree("SetNode", [x, l, r, h]);
}
function tree_height(t) {
    return t.Case === "SetOne" ? 1 : t.Case === "SetNode" ? t.Fields[3] : 0;
}
function tree_mk(l, k, r) {
    var matchValue = [l, r];
    var $target1 = function () {
        var hl = tree_height(l);
        var hr = tree_height(r);
        var m = hl < hr ? hr : hl;
        return tree_SetNode(k, l, r, m + 1);
    };
    if (matchValue[0].Case === "SetEmpty") {
        if (matchValue[1].Case === "SetEmpty") {
            return tree_SetOne(k);
        }
        else {
            return $target1();
        }
    }
    else {
        return $target1();
    }
}
function tree_rebalance(t1, k, t2) {
    var t1h = tree_height(t1);
    var t2h = tree_height(t2);
    if (t2h > t1h + tree_tolerance) {
        if (t2.Case === "SetNode") {
            if (tree_height(t2.Fields[1]) > t1h + 1) {
                if (t2.Fields[1].Case === "SetNode") {
                    return tree_mk(tree_mk(t1, k, t2.Fields[1].Fields[1]), t2.Fields[1].Fields[0], tree_mk(t2.Fields[1].Fields[2], t2.Fields[0], t2.Fields[2]));
                }
                else {
                    throw new Error("rebalance");
                }
            }
            else {
                return tree_mk(tree_mk(t1, k, t2.Fields[1]), t2.Fields[0], t2.Fields[2]);
            }
        }
        else {
            throw new Error("rebalance");
        }
    }
    else {
        if (t1h > t2h + tree_tolerance) {
            if (t1.Case === "SetNode") {
                if (tree_height(t1.Fields[2]) > t2h + 1) {
                    if (t1.Fields[2].Case === "SetNode") {
                        return tree_mk(tree_mk(t1.Fields[1], t1.Fields[0], t1.Fields[2].Fields[1]), t1.Fields[2].Fields[0], tree_mk(t1.Fields[2].Fields[2], k, t2));
                    }
                    else {
                        throw new Error("rebalance");
                    }
                }
                else {
                    return tree_mk(t1.Fields[1], t1.Fields[0], tree_mk(t1.Fields[2], k, t2));
                }
            }
            else {
                throw new Error("rebalance");
            }
        }
        else {
            return tree_mk(t1, k, t2);
        }
    }
}
function tree_add(comparer, k, t) {
    if (t.Case === "SetOne") {
        var c = comparer.Compare(k, t.Fields[0]);
        if (c < 0) {
            return tree_SetNode(k, new SetTree("SetEmpty", []), t, 2);
        }
        else if (c === 0) {
            return t;
        }
        else {
            return tree_SetNode(k, t, new SetTree("SetEmpty", []), 2);
        }
    }
    else if (t.Case === "SetEmpty") {
        return tree_SetOne(k);
    }
    else {
        var c = comparer.Compare(k, t.Fields[0]);
        if (c < 0) {
            return tree_rebalance(tree_add(comparer, k, t.Fields[1]), t.Fields[0], t.Fields[2]);
        }
        else if (c === 0) {
            return t;
        }
        else {
            return tree_rebalance(t.Fields[1], t.Fields[0], tree_add(comparer, k, t.Fields[2]));
        }
    }
}
function tree_balance(comparer, t1, k, t2) {
    var matchValue = [t1, t2];
    var $target1 = function (t1_1) { return tree_add(comparer, k, t1_1); };
    var $target2 = function (k1, t2_1) { return tree_add(comparer, k, tree_add(comparer, k1, t2_1)); };
    if (matchValue[0].Case === "SetOne") {
        if (matchValue[1].Case === "SetEmpty") {
            return $target1(matchValue[0]);
        }
        else {
            if (matchValue[1].Case === "SetOne") {
                return $target2(matchValue[0].Fields[0], matchValue[1]);
            }
            else {
                return $target2(matchValue[0].Fields[0], matchValue[1]);
            }
        }
    }
    else {
        if (matchValue[0].Case === "SetNode") {
            if (matchValue[1].Case === "SetOne") {
                var k2 = matchValue[1].Fields[0];
                var t1_1 = matchValue[0];
                return tree_add(comparer, k, tree_add(comparer, k2, t1_1));
            }
            else {
                if (matchValue[1].Case === "SetNode") {
                    var h1 = matchValue[0].Fields[3];
                    var h2 = matchValue[1].Fields[3];
                    var k1 = matchValue[0].Fields[0];
                    var k2 = matchValue[1].Fields[0];
                    var t11 = matchValue[0].Fields[1];
                    var t12 = matchValue[0].Fields[2];
                    var t21 = matchValue[1].Fields[1];
                    var t22 = matchValue[1].Fields[2];
                    if (h1 + tree_tolerance < h2) {
                        return tree_rebalance(tree_balance(comparer, t1, k, t21), k2, t22);
                    }
                    else {
                        if (h2 + tree_tolerance < h1) {
                            return tree_rebalance(t11, k1, tree_balance(comparer, t12, k, t2));
                        }
                        else {
                            return tree_mk(t1, k, t2);
                        }
                    }
                }
                else {
                    return $target1(matchValue[0]);
                }
            }
        }
        else {
            var t2_1 = matchValue[1];
            return tree_add(comparer, k, t2_1);
        }
    }
}
function tree_split(comparer, pivot, t) {
    if (t.Case === "SetOne") {
        var c = comparer.Compare(t.Fields[0], pivot);
        if (c < 0) {
            return [t, false, new SetTree("SetEmpty", [])];
        }
        else if (c === 0) {
            return [new SetTree("SetEmpty", []), true, new SetTree("SetEmpty", [])];
        }
        else {
            return [new SetTree("SetEmpty", []), false, t];
        }
    }
    else if (t.Case === "SetEmpty") {
        return [new SetTree("SetEmpty", []), false, new SetTree("SetEmpty", [])];
    }
    else {
        var c = comparer.Compare(pivot, t.Fields[0]);
        if (c < 0) {
            var patternInput = tree_split(comparer, pivot, t.Fields[1]);
            return [patternInput[0], patternInput[1], tree_balance(comparer, patternInput[2], t.Fields[0], t.Fields[2])];
        }
        else if (c === 0) {
            return [t.Fields[1], true, t.Fields[2]];
        }
        else {
            var patternInput = tree_split(comparer, pivot, t.Fields[2]);
            return [tree_balance(comparer, t.Fields[1], t.Fields[0], patternInput[0]), patternInput[1], patternInput[2]];
        }
    }
}
function tree_spliceOutSuccessor(t) {
    if (t.Case === "SetOne") {
        return [t.Fields[0], new SetTree("SetEmpty", [])];
    }
    else if (t.Case === "SetNode") {
        if (t.Fields[1].Case === "SetEmpty") {
            return [t.Fields[0], t.Fields[2]];
        }
        else {
            var patternInput = tree_spliceOutSuccessor(t.Fields[1]);
            return [patternInput[0], tree_mk(patternInput[1], t.Fields[0], t.Fields[2])];
        }
    }
    else {
        throw new Error("internal error: Map.spliceOutSuccessor");
    }
}
function tree_remove(comparer, k, t) {
    if (t.Case === "SetOne") {
        var c = comparer.Compare(k, t.Fields[0]);
        if (c === 0) {
            return new SetTree("SetEmpty", []);
        }
        else {
            return t;
        }
    }
    else if (t.Case === "SetNode") {
        var c = comparer.Compare(k, t.Fields[0]);
        if (c < 0) {
            return tree_rebalance(tree_remove(comparer, k, t.Fields[1]), t.Fields[0], t.Fields[2]);
        }
        else if (c === 0) {
            var matchValue = [t.Fields[1], t.Fields[2]];
            if (matchValue[0].Case === "SetEmpty") {
                return t.Fields[2];
            }
            else if (matchValue[1].Case === "SetEmpty") {
                return t.Fields[1];
            }
            else {
                var patternInput = tree_spliceOutSuccessor(t.Fields[2]);
                return tree_mk(t.Fields[1], patternInput[0], patternInput[1]);
            }
        }
        else {
            return tree_rebalance(t.Fields[1], t.Fields[0], tree_remove(comparer, k, t.Fields[2]));
        }
    }
    else {
        return t;
    }
}
function tree_mem(comparer, k, t) {
    if (t.Case === "SetOne") {
        return comparer.Compare(k, t.Fields[0]) === 0;
    }
    else if (t.Case === "SetEmpty") {
        return false;
    }
    else {
        var c = comparer.Compare(k, t.Fields[0]);
        if (c < 0) {
            return tree_mem(comparer, k, t.Fields[1]);
        }
        else if (c === 0) {
            return true;
        }
        else {
            return tree_mem(comparer, k, t.Fields[2]);
        }
    }
}
function tree_iter(f, t) {
    if (t.Case === "SetOne") {
        f(t.Fields[0]);
    }
    else {
        if (t.Case === "SetEmpty") { }
        else {
            tree_iter(f, t.Fields[1]);
            f(t.Fields[0]);
            tree_iter(f, t.Fields[2]);
        }
    }
}
function tree_foldBack(f, m, x) {
    return m.Case === "SetOne" ? f(m.Fields[0], x) : m.Case === "SetEmpty" ? x : tree_foldBack(f, m.Fields[1], f(m.Fields[0], tree_foldBack(f, m.Fields[2], x)));
}
function tree_fold(f, x, m) {
    if (m.Case === "SetOne") {
        return f(x, m.Fields[0]);
    }
    else if (m.Case === "SetEmpty") {
        return x;
    }
    else {
        var x_1 = tree_fold(f, x, m.Fields[1]);
        var x_2 = f(x_1, m.Fields[0]);
        return tree_fold(f, x_2, m.Fields[2]);
    }
}
function tree_forall(f, m) {
    return m.Case === "SetOne" ? f(m.Fields[0]) : m.Case === "SetEmpty" ? true : (f(m.Fields[0]) ? tree_forall(f, m.Fields[1]) : false) ? tree_forall(f, m.Fields[2]) : false;
}
function tree_exists(f, m) {
    return m.Case === "SetOne" ? f(m.Fields[0]) : m.Case === "SetEmpty" ? false : (f(m.Fields[0]) ? true : tree_exists(f, m.Fields[1])) ? true : tree_exists(f, m.Fields[2]);
}
function tree_isEmpty(m) {
    return m.Case === "SetEmpty" ? true : false;
}
function tree_subset(comparer, a, b) {
    return tree_forall(function (x) { return tree_mem(comparer, x, b); }, a);
}
function tree_psubset(comparer, a, b) {
    return tree_forall(function (x) { return tree_mem(comparer, x, b); }, a) ? tree_exists(function (x) { return !tree_mem(comparer, x, a); }, b) : false;
}
function tree_filterAux(comparer, f, s, acc) {
    if (s.Case === "SetOne") {
        if (f(s.Fields[0])) {
            return tree_add(comparer, s.Fields[0], acc);
        }
        else {
            return acc;
        }
    }
    else if (s.Case === "SetEmpty") {
        return acc;
    }
    else {
        var acc_1 = f(s.Fields[0]) ? tree_add(comparer, s.Fields[0], acc) : acc;
        return tree_filterAux(comparer, f, s.Fields[1], tree_filterAux(comparer, f, s.Fields[2], acc_1));
    }
}
function tree_filter(comparer, f, s) {
    return tree_filterAux(comparer, f, s, new SetTree("SetEmpty", []));
}
function tree_diffAux(comparer, m, acc) {
    return m.Case === "SetOne" ? tree_remove(comparer, m.Fields[0], acc) : m.Case === "SetEmpty" ? acc : tree_diffAux(comparer, m.Fields[1], tree_diffAux(comparer, m.Fields[2], tree_remove(comparer, m.Fields[0], acc)));
}
function tree_diff(comparer, a, b) {
    return tree_diffAux(comparer, b, a);
}
function tree_union(comparer, t1, t2) {
    var matchValue = [t1, t2];
    var $target2 = function (t) { return t; };
    var $target3 = function (k1, t2_1) { return tree_add(comparer, k1, t2_1); };
    if (matchValue[0].Case === "SetEmpty") {
        var t = matchValue[1];
        return t;
    }
    else {
        if (matchValue[0].Case === "SetOne") {
            if (matchValue[1].Case === "SetEmpty") {
                return $target2(matchValue[0]);
            }
            else {
                if (matchValue[1].Case === "SetOne") {
                    return $target3(matchValue[0].Fields[0], matchValue[1]);
                }
                else {
                    return $target3(matchValue[0].Fields[0], matchValue[1]);
                }
            }
        }
        else {
            if (matchValue[1].Case === "SetEmpty") {
                return $target2(matchValue[0]);
            }
            else {
                if (matchValue[1].Case === "SetOne") {
                    var k2 = matchValue[1].Fields[0];
                    var t1_1 = matchValue[0];
                    return tree_add(comparer, k2, t1_1);
                }
                else {
                    var h1 = matchValue[0].Fields[3];
                    var h2 = matchValue[1].Fields[3];
                    var k1 = matchValue[0].Fields[0];
                    var k2 = matchValue[1].Fields[0];
                    var t11 = matchValue[0].Fields[1];
                    var t12 = matchValue[0].Fields[2];
                    var t21 = matchValue[1].Fields[1];
                    var t22 = matchValue[1].Fields[2];
                    if (h1 > h2) {
                        var patternInput = tree_split(comparer, k1, t2);
                        var lo = patternInput[0];
                        var hi = patternInput[2];
                        return tree_balance(comparer, tree_union(comparer, t11, lo), k1, tree_union(comparer, t12, hi));
                    }
                    else {
                        var patternInput = tree_split(comparer, k2, t1);
                        var lo = patternInput[0];
                        var hi = patternInput[2];
                        return tree_balance(comparer, tree_union(comparer, t21, lo), k2, tree_union(comparer, t22, hi));
                    }
                }
            }
        }
    }
}
function tree_intersectionAux(comparer, b, m, acc) {
    if (m.Case === "SetOne") {
        if (tree_mem(comparer, m.Fields[0], b)) {
            return tree_add(comparer, m.Fields[0], acc);
        }
        else {
            return acc;
        }
    }
    else if (m.Case === "SetEmpty") {
        return acc;
    }
    else {
        var acc_1 = tree_intersectionAux(comparer, b, m.Fields[2], acc);
        var acc_2 = tree_mem(comparer, m.Fields[0], b) ? tree_add(comparer, m.Fields[0], acc_1) : acc_1;
        return tree_intersectionAux(comparer, b, m.Fields[1], acc_2);
    }
}
function tree_intersection(comparer, a, b) {
    return tree_intersectionAux(comparer, b, a, new SetTree("SetEmpty", []));
}
function tree_partition1(comparer, f, k, acc1, acc2) {
    return f(k) ? [tree_add(comparer, k, acc1), acc2] : [acc1, tree_add(comparer, k, acc2)];
}
function tree_partitionAux(comparer, f, s, acc_0, acc_1) {
    var acc = [acc_0, acc_1];
    if (s.Case === "SetOne") {
        var acc1 = acc[0];
        var acc2 = acc[1];
        return tree_partition1(comparer, f, s.Fields[0], acc1, acc2);
    }
    else {
        if (s.Case === "SetEmpty") {
            return acc;
        }
        else {
            var acc_2 = tree_partitionAux(comparer, f, s.Fields[2], acc[0], acc[1]);
            var acc_3 = tree_partition1(comparer, f, s.Fields[0], acc_2[0], acc_2[1]);
            return tree_partitionAux(comparer, f, s.Fields[1], acc_3[0], acc_3[1]);
        }
    }
}
function tree_partition(comparer, f, s) {
    var seed = [new SetTree("SetEmpty", []), new SetTree("SetEmpty", [])];
    var arg30_ = seed[0];
    var arg31_ = seed[1];
    return tree_partitionAux(comparer, f, s, arg30_, arg31_);
}
function tree_minimumElementAux(s, n) {
    return s.Case === "SetOne" ? s.Fields[0] : s.Case === "SetEmpty" ? n : tree_minimumElementAux(s.Fields[1], s.Fields[0]);
}
function tree_minimumElementOpt(s) {
    return s.Case === "SetOne" ? s.Fields[0] : s.Case === "SetEmpty" ? null : tree_minimumElementAux(s.Fields[1], s.Fields[0]);
}
function tree_maximumElementAux(s, n) {
    return s.Case === "SetOne" ? s.Fields[0] : s.Case === "SetEmpty" ? n : tree_maximumElementAux(s.Fields[2], s.Fields[0]);
}
function tree_maximumElementOpt(s) {
    return s.Case === "SetOne" ? s.Fields[0] : s.Case === "SetEmpty" ? null : tree_maximumElementAux(s.Fields[2], s.Fields[0]);
}
function tree_minimumElement(s) {
    var matchValue = tree_minimumElementOpt(s);
    if (matchValue == null) {
        throw new Error("Set contains no elements");
    }
    else {
        return matchValue;
    }
}
function tree_maximumElement(s) {
    var matchValue = tree_maximumElementOpt(s);
    if (matchValue == null) {
        throw new Error("Set contains no elements");
    }
    else {
        return matchValue;
    }
}
function tree_collapseLHS(stack) {
    return stack.tail != null
        ? stack.head.Case === "SetOne"
            ? stack
            : stack.head.Case === "SetNode"
                ? tree_collapseLHS(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__List__["ofArray"])([
                    stack.head.Fields[1],
                    tree_SetOne(stack.head.Fields[0]),
                    stack.head.Fields[2]
                ], stack.tail))
                : tree_collapseLHS(stack.tail)
        : new __WEBPACK_IMPORTED_MODULE_0__List__["default"]();
}
function tree_mkIterator(s) {
    return { stack: tree_collapseLHS(new __WEBPACK_IMPORTED_MODULE_0__List__["default"](s, new __WEBPACK_IMPORTED_MODULE_0__List__["default"]())), started: false };
}
;
function tree_moveNext(i) {
    function current(i) {
        if (i.stack.tail == null) {
            return null;
        }
        else if (i.stack.head.Case === "SetOne") {
            return i.stack.head.Fields[0];
        }
        throw new Error("Please report error: Set iterator, unexpected stack for current");
    }
    if (i.started) {
        if (i.stack.tail == null) {
            return { done: true, value: null };
        }
        else {
            if (i.stack.head.Case === "SetOne") {
                i.stack = tree_collapseLHS(i.stack.tail);
                return {
                    done: i.stack.tail == null,
                    value: current(i)
                };
            }
            else {
                throw new Error("Please report error: Set iterator, unexpected stack for moveNext");
            }
        }
    }
    else {
        i.started = true;
        return {
            done: i.stack.tail == null,
            value: current(i)
        };
    }
    ;
}
function tree_compareStacks(comparer, l1, l2) {
    var $target8 = function (n1k, t1) { return tree_compareStacks(comparer, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__List__["ofArray"])([new SetTree("SetEmpty", []), tree_SetOne(n1k)], t1), l2); };
    var $target9 = function (n1k, n1l, n1r, t1) { return tree_compareStacks(comparer, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__List__["ofArray"])([n1l, tree_SetNode(n1k, new SetTree("SetEmpty", []), n1r, 0)], t1), l2); };
    var $target11 = function (n2k, n2l, n2r, t2) { return tree_compareStacks(comparer, l1, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__List__["ofArray"])([n2l, tree_SetNode(n2k, new SetTree("SetEmpty", []), n2r, 0)], t2)); };
    if (l1.tail != null) {
        if (l2.tail != null) {
            if (l2.head.Case === "SetOne") {
                if (l1.head.Case === "SetOne") {
                    var n1k = l1.head.Fields[0], n2k = l2.head.Fields[0], t1 = l1.tail, t2 = l2.tail, c = comparer.Compare(n1k, n2k);
                    if (c !== 0) {
                        return c;
                    }
                    else {
                        return tree_compareStacks(comparer, t1, t2);
                    }
                }
                else {
                    if (l1.head.Case === "SetNode") {
                        if (l1.head.Fields[1].Case === "SetEmpty") {
                            var emp = l1.head.Fields[1], n1k = l1.head.Fields[0], n1r = l1.head.Fields[2], n2k = l2.head.Fields[0], t1 = l1.tail, t2 = l2.tail, c = comparer.Compare(n1k, n2k);
                            if (c !== 0) {
                                return c;
                            }
                            else {
                                return tree_compareStacks(comparer, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__List__["ofArray"])([n1r], t1), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__List__["ofArray"])([emp], t2));
                            }
                        }
                        else {
                            return $target9(l1.head.Fields[0], l1.head.Fields[1], l1.head.Fields[2], l1.tail);
                        }
                    }
                    else {
                        var n2k = l2.head.Fields[0], t2 = l2.tail;
                        return tree_compareStacks(comparer, l1, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__List__["ofArray"])([new SetTree("SetEmpty", []), tree_SetOne(n2k)], t2));
                    }
                }
            }
            else {
                if (l2.head.Case === "SetNode") {
                    if (l2.head.Fields[1].Case === "SetEmpty") {
                        if (l1.head.Case === "SetOne") {
                            var n1k = l1.head.Fields[0], n2k = l2.head.Fields[0], n2r = l2.head.Fields[2], t1 = l1.tail, t2 = l2.tail, c = comparer.Compare(n1k, n2k);
                            if (c !== 0) {
                                return c;
                            }
                            else {
                                return tree_compareStacks(comparer, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__List__["ofArray"])([new SetTree("SetEmpty", [])], t1), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__List__["ofArray"])([n2r], t2));
                            }
                        }
                        else {
                            if (l1.head.Case === "SetNode") {
                                if (l1.head.Fields[1].Case === "SetEmpty") {
                                    var n1k = l1.head.Fields[0], n1r = l1.head.Fields[2], n2k = l2.head.Fields[0], n2r = l2.head.Fields[2], t1 = l1.tail, t2 = l2.tail, c = comparer.Compare(n1k, n2k);
                                    if (c !== 0) {
                                        return c;
                                    }
                                    else {
                                        return tree_compareStacks(comparer, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__List__["ofArray"])([n1r], t1), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__List__["ofArray"])([n2r], t2));
                                    }
                                }
                                else {
                                    return $target9(l1.head.Fields[0], l1.head.Fields[1], l1.head.Fields[2], l1.tail);
                                }
                            }
                            else {
                                return $target11(l2.head.Fields[0], l2.head.Fields[1], l2.head.Fields[2], l2.tail);
                            }
                        }
                    }
                    else {
                        if (l1.head.Case === "SetOne") {
                            return $target8(l1.head.Fields[0], l1.tail);
                        }
                        else {
                            if (l1.head.Case === "SetNode") {
                                return $target9(l1.head.Fields[0], l1.head.Fields[1], l1.head.Fields[2], l1.tail);
                            }
                            else {
                                return $target11(l2.head.Fields[0], l2.head.Fields[1], l2.head.Fields[2], l2.tail);
                            }
                        }
                    }
                }
                else {
                    if (l1.head.Case === "SetOne") {
                        return $target8(l1.head.Fields[0], l1.tail);
                    }
                    else {
                        if (l1.head.Case === "SetNode") {
                            return $target9(l1.head.Fields[0], l1.head.Fields[1], l1.head.Fields[2], l1.tail);
                        }
                        else {
                            return tree_compareStacks(comparer, l1.tail, l2.tail);
                        }
                    }
                }
            }
        }
        else {
            return 1;
        }
    }
    else {
        if (l2.tail != null) {
            return -1;
        }
        else {
            return 0;
        }
    }
}
function tree_compare(comparer, s1, s2) {
    if (s1.Case === "SetEmpty") {
        if (s2.Case === "SetEmpty") {
            return 0;
        }
        else {
            return -1;
        }
    }
    else {
        if (s2.Case === "SetEmpty") {
            return 1;
        }
        else {
            return tree_compareStacks(comparer, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__List__["ofArray"])([s1]), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__List__["ofArray"])([s2]));
        }
    }
}
function tree_mkFromEnumerator(comparer, acc, e) {
    var cur = e.next();
    while (!cur.done) {
        acc = tree_add(comparer, cur.value, acc);
        cur = e.next();
    }
    return acc;
}
function tree_ofSeq(comparer, c) {
    var ie = c[Symbol.iterator]();
    return tree_mkFromEnumerator(comparer, new SetTree("SetEmpty", []), ie);
}
var FableSet = (function () {
    function FableSet() {
    }
    FableSet.prototype.ToString = function () {
        return "set [" + Array.from(this).map(__WEBPACK_IMPORTED_MODULE_1__Util__["toString"]).join("; ") + "]";
    };
    FableSet.prototype.Equals = function (s2) {
        return this.CompareTo(s2) === 0;
    };
    FableSet.prototype.CompareTo = function (s2) {
        return this === s2 ? 0 : tree_compare(this.comparer, this.tree, s2.tree);
    };
    FableSet.prototype[Symbol.iterator] = function () {
        var i = tree_mkIterator(this.tree);
        return {
            next: function () { return tree_moveNext(i); }
        };
    };
    FableSet.prototype.values = function () {
        return this[Symbol.iterator]();
    };
    FableSet.prototype.has = function (v) {
        return tree_mem(this.comparer, v, this.tree);
    };
    FableSet.prototype.add = function (v) {
        throw new Error("not supported");
    };
    FableSet.prototype.delete = function (v) {
        throw new Error("not supported");
    };
    FableSet.prototype.clear = function () {
        throw new Error("not supported");
    };
    Object.defineProperty(FableSet.prototype, "size", {
        get: function () {
            return tree_count(this.tree);
        },
        enumerable: true,
        configurable: true
    });
    FableSet.prototype[__WEBPACK_IMPORTED_MODULE_3__Symbol__["default"].reflection] = function () {
        return {
            type: "Microsoft.FSharp.Collections.FSharpSet",
            interfaces: ["System.IEquatable", "System.IComparable"]
        };
    };
    return FableSet;
}());
/* harmony default export */ __webpack_exports__["default"] = (FableSet);
function from(comparer, tree) {
    var s = new FableSet();
    s.tree = tree;
    s.comparer = comparer || new __WEBPACK_IMPORTED_MODULE_2__GenericComparer__["default"]();
    return s;
}
function create(ie, comparer) {
    comparer = comparer || new __WEBPACK_IMPORTED_MODULE_2__GenericComparer__["default"]();
    return from(comparer, ie ? tree_ofSeq(comparer, ie) : new SetTree("SetEmpty", []));
}
function isEmpty(s) {
    return tree_isEmpty(s.tree);
}
function add(item, s) {
    return from(s.comparer, tree_add(s.comparer, item, s.tree));
}
function addInPlace(item, s) {
    return s.has(item) ? false : (s.add(item), true);
}
function remove(item, s) {
    return from(s.comparer, tree_remove(s.comparer, item, s.tree));
}
function union(set1, set2) {
    return set2.tree.Case === "SetEmpty"
        ? set1
        : set1.tree.Case === "SetEmpty"
            ? set2
            : from(set1.comparer, tree_union(set1.comparer, set1.tree, set2.tree));
}
function op_Addition(set1, set2) {
    return union(set1, set2);
}
function unionInPlace(set1, set2) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__Seq__["iterate"])(function (x) { set1.add(x); }, set2);
}
function unionMany(sets) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__Seq__["fold"])(function (acc, s) { return union(s, acc); }, create(), sets);
}
function difference(set1, set2) {
    return set1.tree.Case === "SetEmpty"
        ? set1
        : set2.tree.Case === "SetEmpty"
            ? set1
            : from(set1.comparer, tree_diff(set1.comparer, set1.tree, set2.tree));
}
function op_Subtraction(set1, set2) {
    return difference(set1, set2);
}
function differenceInPlace(set1, set2) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__Seq__["iterate"])(function (x) { set1.delete(x); }, set2);
}
function intersect(set1, set2) {
    return set2.tree.Case === "SetEmpty"
        ? set2
        : set1.tree.Case === "SetEmpty"
            ? set1
            : from(set1.comparer, tree_intersection(set1.comparer, set1.tree, set2.tree));
}
function intersectInPlace(set1, set2) {
    var set2_ = set2 instanceof Set ? set2 : new Set(set2);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__Seq__["iterate"])(function (x) { if (!set2_.has(x)) {
        set1.delete(x);
    } }, set1);
}
function intersectMany(sets) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__Seq__["reduce"])(function (s1, s2) { return intersect(s1, s2); }, sets);
}
function isProperSubsetOf(set1, set2) {
    if (set1 instanceof FableSet && set2 instanceof FableSet) {
        return tree_psubset(set1.comparer, set1.tree, set2.tree);
    }
    else {
        set2 = set2 instanceof Set ? set2 : new Set(set2);
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__Seq__["forAll"])(function (x) { return set2.has(x); }, set1) && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__Seq__["exists"])(function (x) { return !set1.has(x); }, set2);
    }
}
function isProperSubset(set1, set2) {
    return isProperSubsetOf(set1, set2);
}
function isSubsetOf(set1, set2) {
    if (set1 instanceof FableSet && set2 instanceof FableSet) {
        return tree_subset(set1.comparer, set1.tree, set2.tree);
    }
    else {
        set2 = set2 instanceof Set ? set2 : new Set(set2);
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__Seq__["forAll"])(function (x) { return set2.has(x); }, set1);
    }
}
function isSubset(set1, set2) {
    return isSubsetOf(set1, set2);
}
function isProperSupersetOf(set1, set2) {
    if (set1 instanceof FableSet && set2 instanceof FableSet) {
        return tree_psubset(set1.comparer, set2.tree, set1.tree);
    }
    else {
        return isProperSubset(set2 instanceof Set ? set2 : new Set(set2), set1);
    }
}
function isProperSuperset(set1, set2) {
    return isProperSupersetOf(set1, set2);
}
function isSupersetOf(set1, set2) {
    if (set1 instanceof FableSet && set2 instanceof FableSet) {
        return tree_subset(set1.comparer, set2.tree, set1.tree);
    }
    else {
        return isSubset(set2 instanceof Set ? set2 : new Set(set2), set1);
    }
}
function isSuperset(set1, set2) {
    return isSupersetOf(set1, set2);
}
function copyTo(xs, arr, arrayIndex, count) {
    if (!Array.isArray(arr) && !ArrayBuffer.isView(arr))
        throw new Error("Array is invalid");
    count = count || arr.length;
    var i = arrayIndex || 0;
    var iter = xs[Symbol.iterator]();
    while (count--) {
        var el = iter.next();
        if (el.done)
            break;
        arr[i++] = el.value;
    }
}
function partition(f, s) {
    if (s.tree.Case === "SetEmpty") {
        return [s, s];
    }
    else {
        var tuple = tree_partition(s.comparer, f, s.tree);
        return [from(s.comparer, tuple[0]), from(s.comparer, tuple[1])];
    }
}
function filter(f, s) {
    if (s.tree.Case === "SetEmpty") {
        return s;
    }
    else {
        return from(s.comparer, tree_filter(s.comparer, f, s.tree));
    }
}
function map(f, s) {
    var comparer = new __WEBPACK_IMPORTED_MODULE_2__GenericComparer__["default"]();
    return from(comparer, tree_fold(function (acc, k) { return tree_add(comparer, f(k), acc); }, new SetTree("SetEmpty", []), s.tree));
}
function exists(f, s) {
    return tree_exists(f, s.tree);
}
function forAll(f, s) {
    return tree_forall(f, s.tree);
}
function fold(f, seed, s) {
    return tree_fold(f, seed, s.tree);
}
function foldBack(f, s, seed) {
    return tree_foldBack(f, s.tree, seed);
}
function iterate(f, s) {
    tree_iter(f, s.tree);
}
function minimumElement(s) {
    return tree_minimumElement(s.tree);
}
function minElement(s) {
    return tree_minimumElement(s.tree);
}
function maximumElement(s) {
    return tree_maximumElement(s.tree);
}
function maxElement(s) {
    return tree_maximumElement(s.tree);
}


/***/ }),
/* 373 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/gen.kep'
 * DO NOT EDIT
*/

var __o = __webpack_require__(82),
    repeat, range, NIL = __o["NIL"],
    memoStream = __o["memoStream"];
(repeat = (function(times, x) {
    return ((times <= 0) ? NIL : memoStream(x, (function() {
        return repeat((times - 1), x);
    })));
}));
var rangeImpl = (function(lower, upper, step) {
    return (((step > 0) ? (upper <= lower) : (upper >= lower)) ? NIL : memoStream(lower, (function() {
        return rangeImpl((lower + step), upper, step);
    })));
});
(range = (function(lower, upper, step) {
    var rangeLower = (isNaN(lower) ? Infinity : (+lower)),
        rangeStep = (isNaN(step) ? 1 : (+step));
    return (isNaN(upper) ? (((rangeStep > 0) ? (rangeLower <= 0) : (rangeLower >= 0)) ? NIL : memoStream(0, (
        function() {
            return rangeImpl((0 + rangeStep), rangeLower, rangeStep);
        }))) : (((rangeStep > 0) ? (upper <= rangeLower) : (upper >= rangeLower)) ? NIL : memoStream(
        rangeLower, (function() {
            return rangeImpl((rangeLower + rangeStep), upper, rangeStep);
        }))));
}));
(exports["repeat"] = repeat);
(exports["range"] = range);

/***/ }),
/* 374 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/quantifier.kep'
 * DO NOT EDIT
*/

var __o = __webpack_require__(82),
    any, every, isEmpty = __o["isEmpty"],
    first = __o["first"],
    rest = __o["rest"],
    not = (function(y) {
        return (function(z) {
            var x = y(z);
            return (!x);
        });
    });
(any = (function(pred, s) {
    for (var current = s;
        (!isEmpty(current));
        (current = rest(current)))
        if (pred(first(current))) return true;
    return false;
}));
(every = (function(pred, s) {
    return (!any(not(pred), s));
}));
(exports["any"] = any);
(exports["every"] = every);

/***/ }),
/* 375 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/select.kep'
 * DO NOT EDIT
*/

var __o = __webpack_require__(82),
    takeWhile, take, skipWhile, skip, NIL = __o["NIL"],
    first = __o["first"],
    isEmpty = __o["isEmpty"],
    map = __o["map"],
    stream = __o["stream"],
    rest = __o["rest"],
    indexed = __o["indexed"],
    value = (function(__o0) {
        var x = __o0[1];
        return x;
    });
(takeWhile = (function(pred, s) {
    var x;
    return (isEmpty(s) ? s : ((x = first(s)), (pred(x) ? stream(x, (function() {
        return takeWhile(pred, rest(s));
    })) : NIL)));
}));
(take = (function(count, s) {
    return ((isNaN(count) || (count < 0)) ? s : map(value, takeWhile((function(z) {
        var i = z[0];
        return (count > i);
    }), indexed(s))));
}));
(skipWhile = (function(pred, s) {
    for (var head = s;
        (!isEmpty(head));
        (head = rest(head)))
        if ((!pred(first(head)))) return head;
    return NIL;
}));
(skip = (function(count, s) {
    return ((isNaN(count) || (count <= 0)) ? s : map(value, skipWhile((function(z) {
        var i = z[0];
        return (count > i);
    }), indexed(s))));
}));
(exports["takeWhile"] = takeWhile);
(exports["take"] = take);
(exports["skipWhile"] = skipWhile);
(exports["skip"] = skip);

/***/ }),
/* 376 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * THIS FILE IS AUTO GENERATED from 'lib/seshet.kep'
 * DO NOT EDIT
*/

var create, lookup, update, prune;
var max = (function(x, y) {
    return ((x > y) ? x : y);
});
var heightFromChild = (function(child) {
    return (child ? (1 + child.height) : 0);
});
var height = (function(root) {
    return (!root ? 0 : max(heightFromChild(root.left), heightFromChild(root.right)));
});
var bf = (function(node) {
    return (!node ? 0 : (heightFromChild(node.left) - heightFromChild(node.right)));
});
var Cell = (function(id, val, delegate) {
    (this.id = id);
    (this.val = val);
    (this.delegate = delegate);
});
(Cell.lookup = (function(base, eq, id) {
    for (var cell = base; cell;
        (cell = cell.delegate))
        if (eq(cell.id, id)) return cell.val;
    return null;
}));
var Node = (function(key, cell, l, r, height) {
    (this.key = key);
    (this.cell = cell);
    (this.left = l);
    (this.right = r);
    (this.height = height);
});
(Node.setChildren = (function(node, l, r) {
    return new(Node)(node.key, node.cell, l, r, ((l || r) ? (1 + max(height(l), height(r))) : 0));
}));
(Node.setLeft = (function(node, l) {
    return Node.setChildren(node, l, node.right);
}));
(Node.setRight = (function(node, r) {
    return Node.setChildren(node, node.left, r);
}));
(Node.lookup = (function(root, compare, eq, key, id) {
    for (var node = root; node;) {
        var diff = compare(key, node.key);
        if ((diff === 0)) return Cell.lookup(node.cell, eq, id);
        (node = ((diff < 0) ? node.left : node.right));
    }
    return null;
}));
(Node.put = (function(node, id, val) {
    return new(Node)(node.key, new(Cell)(id, val, node.cell), node.left, node.right, node.height);
}));
var rr = (function(node) {
    return (!node ? node : Node.setLeft(node.right, Node.setRight(node, node.right.left)));
});
var ll = (function(node) {
    return (!node ? node : Node.setRight(node.left, Node.setLeft(node, node.left.right)));
});
var lr = (function(node) {
    return ll(Node.setLeft(node, rr(node.left)));
});
var rl = (function(node) {
    return rr(Node.setRight(node, ll(node.right)));
});
var rot = (function(node) {
    var d = bf(node);
    if ((d > 1)) return ((bf(node.left) <= -1) ? lr(node) : ll(node));
    else if ((d < -1)) return ((bf(node.right) >= 1) ? rl(node) : rr(node));
    return node;
});
(Node.update = (function(root, compare, key, id, val) {
    if (!root) return new(Node)(key, new(Cell)(id, val, null), null, null, 0);
    var diff = compare(key, root.key);
    if ((diff === 0)) return Node.put(root, id, val);
    return rot(((diff < 0) ? Node.setLeft(root, Node.update(root.left, compare, key, id, val)) : Node.setRight(
        root, Node.update(root.right, compare, key, id, val))));
}));
(Node.rebalance = (function(root) {
    return ((Math.abs(bf(root)) <= 1) ? root : rot(Node.setChildren(root, Node.rebalance(root.left), Node.rebalance(
        root.right))));
}));
(Node.prune = (function(root, compare, lower, upper) {
    if (!root) return root;
    if ((lower !== undefined)) {
        var dl = compare(root.key, lower);
        if ((dl < 0)) return Node.prune(root.right, compare, lower, upper);
        else if ((dl === 0)) return Node.setChildren(root, null, Node.prune(root.right, compare, undefined,
            upper));
    }
    if (((upper !== undefined) && (compare(root.key, upper) >= 0))) return Node.prune(root.left, compare, lower,
        upper);
    return Node.setChildren(root, Node.prune(root.left, compare, lower, upper), Node.prune(root.right, compare,
        lower, upper));
}));
var Memoer = (function(compare, eq, root) {
    (this.compare = compare);
    (this.eq = eq);
    (this.root = root);
});
(Memoer.setRoot = (function(m, root) {
    return new(Memoer)(m.compare, m.eq, root);
}));
(create = (function() {
        var equals = (function(x, y) {
            return (x === y);
        });
        return (function(compare, eq) {
            return new(Memoer)(compare, (eq || equals), null);
        });
    })
    .call(this));
(lookup = (function(m, key, id) {
    return Node.lookup(m.root, m.compare, m.eq, key, id);
}));
(update = (function(m, key, id, val) {
    return Memoer.setRoot(m, Node.update(m.root, m.compare, key, id, val));
}));
(prune = (function(m, lower, upper) {
    return Memoer.setRoot(m, Node.rebalance(Node.prune(m.root, m.compare, lower, upper)));
}));
(exports.create = create);
(exports.lookup = lookup);
(exports.update = update);
(exports.prune = prune);

/***/ }),
/* 377 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.State = exports.LoadedSchema = exports.listOfExamples = exports.fileInput = exports.dropbox = exports.previewInfoEl = exports.introEl = exports.closeButtonEl = exports.fileInfoEl = exports.schemaSelectorEl = exports.offsetsEl = exports.moduleSelector = exports.viewer = exports.hexViewerOffsets = exports.hexViewerBytes = exports.hexBytes = exports.hexViewer = exports.schemasEl = exports.schemaViewer = exports.byId = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.updateSchema = updateSchema;
exports.removeAllChildren = removeAllChildren;
exports.read = read;
exports.hideIntro = hideIntro;
exports.showIntro = showIntro;
exports.fetchSchema = fetchSchema;
exports.fetchData = fetchData;
exports.parseSchema = parseSchema;
exports.loadSchemaDom = loadSchemaDom;
exports.loadFile = loadFile;
exports.loadExampleFile = loadExampleFile;
exports.loadSelectedFile = loadSelectedFile;

var _String = __webpack_require__(35);

var _Reader = __webpack_require__(114);

var _Util = __webpack_require__(5);

var _Seq = __webpack_require__(7);

var _Utils = __webpack_require__(115);

var _Components = __webpack_require__(153);

var _Async = __webpack_require__(113);

var _AsyncBuilder = __webpack_require__(55);

var _List = __webpack_require__(22);

var _List2 = _interopRequireDefault(_List);

var _Map = __webpack_require__(51);

var _GenericComparer = __webpack_require__(50);

var _GenericComparer2 = _interopRequireDefault(_GenericComparer);

var _Schema = __webpack_require__(62);

var _SchemaParser = __webpack_require__(155);

var _Symbol2 = __webpack_require__(12);

var _Symbol3 = _interopRequireDefault(_Symbol2);

var _Data = __webpack_require__(154);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

__webpack_require__(152);

var byId = exports.byId = function byId(arg00) {
  return document.getElementById(arg00);
};

var schemaViewer = exports.schemaViewer = byId("schema-viewer");
var schemasEl = exports.schemasEl = byId("schemas");
var hexViewer = exports.hexViewer = byId("hex-viewer");
var hexBytes = exports.hexBytes = byId("hex-bytes");
var hexViewerBytes = exports.hexViewerBytes = byId("bytes");
var hexViewerOffsets = exports.hexViewerOffsets = byId("hex-offsets");
var viewer = exports.viewer = byId("viewer");
var moduleSelector = exports.moduleSelector = byId("module-selector");
var offsetsEl = exports.offsetsEl = byId("hex-offsets");
var schemaSelectorEl = exports.schemaSelectorEl = byId("schema-selector");
var fileInfoEl = exports.fileInfoEl = byId("file-info");
var closeButtonEl = exports.closeButtonEl = byId("close-button");
var introEl = exports.introEl = byId("intro");
var previewInfoEl = exports.previewInfoEl = byId("preview-info");
var dropbox = exports.dropbox = byId("dropbox");
var fileInput = exports.fileInput = byId("file");
var listOfExamples = exports.listOfExamples = document.querySelector("#intro ul");

function updateSchema() {
  var selectedValue = moduleSelector.value;

  if (selectedValue !== "") {
    var els = schemaViewer.getElementsByClassName("schema");

    for (var i = 0; i <= ~~els.length - 1; i++) {
      els[i].classList.add("hidden");
    }

    schemaViewer.querySelector((0, _String.fsFormat)("[data-schema-id=%s]")(function (x) {
      return x;
    })(selectedValue)).classList.remove("hidden");
  }
}

function removeAllChildren(el) {
  while (el.firstChild != null) {
    el.removeChild(el.firstChild);
  }
}

function read(byteArray, modules, rootTypeName) {
  var ctx = new _Reader.AsnContext(new _Reader.AsnArrayStream(byteArray, 0), modules);
  var ty = (0, _Util.defaultArg)(rootTypeName, null, function (arg00) {
    return ctx.LookupType(arg00);
  });
  var res = (0, _Reader.readElement)(ctx, ty);
  removeAllChildren(offsetsEl);
  removeAllChildren(hexViewerBytes);
  removeAllChildren(viewer);
  (0, _Seq.iterate)(function (el) {
    (0, _Utils.appendTo)(offsetsEl, el);
  }, (0, _Components.makeOffsets)(byteArray.length));
  (0, _Seq.iterate)(function (el_1) {
    (0, _Utils.appendTo)(hexViewerBytes, el_1);
  }, (0, _Util.defaultArg)((0, _Components.makeHexRuns)(res, byteArray), [], function (x) {
    return [x];
  }));

  (function (el_2) {
    (0, _Utils.appendTo)(viewer, el_2);
  })((0, _Components.makeStructureHierarchy)(ctx, res));
}

function hideIntro() {
  (0, _Utils.addClass)("hidden", introEl);
  (0, _Utils.removeClass)("hidden", viewer);
  (0, _Utils.removeClass)("hidden", schemaViewer);
  (0, _Utils.removeClass)("hidden", hexViewer);
}

function showIntro() {
  (0, _Utils.removeClass)("hidden", introEl);
  (0, _Utils.addClass)("hidden", viewer);
  (0, _Utils.addClass)("hidden", schemaViewer);
  (0, _Utils.addClass)("hidden", hexViewer);
  (0, _Utils.addClass)("hidden", previewInfoEl);
  (0, _Utils.addClass)("hidden", schemaSelectorEl);
}

function fetchSchema(info) {
  return function (builder_) {
    return builder_.Delay(function () {
      return builder_.Bind((0, _Utils.fetchAsync2)(info.Url, {}), function (_arg1) {
        return _arg1.ok ? builder_.ReturnFrom((0, _Async.awaitPromise)(_arg1.text())) : builder_.Return((0, _String.fsFormat)("ERROR: %d")(function (x) {
          throw new Error(x);
        })(_arg1.status));
      });
    });
  }(_AsyncBuilder.singleton);
}

function fetchData(url) {
  return function (builder_) {
    return builder_.Delay(function () {
      return builder_.Bind((0, _Utils.fetchAsync2)(url, {
        headers: _defineProperty({}, "Content-Type", "application/octet-stream")
      }), function (_arg1) {
        return _arg1.ok ? builder_.ReturnFrom((0, _Async.awaitPromise)(_arg1.arrayBuffer())) : builder_.Return((0, _String.fsFormat)("ERROR: %d")(function (x) {
          throw new Error(x);
        })(_arg1.status));
      });
    });
  }(_AsyncBuilder.singleton);
}

function parseSchema(text, schemaInfo) {
  return (0, _List.map)(function (md) {
    var overrides = (0, _Map.tryFind)(md.Identifier, schemaInfo.Overrides);
    var ElementsDefinedByOid = overrides != null ? overrides : (0, _Map.create)(null, new _GenericComparer2.default(_Util.compare));
    return new _Schema.ModuleDefinition(md.Identifier, md.Oid, md.TagDefault, md.ExtensibilityImplied, md.TypeAssignments, md.ValueAssignments, md.Imports, md.Range, ElementsDefinedByOid);
  }, (0, _SchemaParser.parseAllModuleDefinitions)(text));
}

var LoadedSchema = exports.LoadedSchema = function () {
  function LoadedSchema(info, moduleDefinitions, optionElement, schemaElement) {
    _classCallCheck(this, LoadedSchema);

    this.Info = info;
    this.ModuleDefinitions = moduleDefinitions;
    this.OptionElement = optionElement;
    this.SchemaElement = schemaElement;
  }

  _createClass(LoadedSchema, [{
    key: _Symbol3.default.reflection,
    value: function () {
      return {
        type: "FsAsn1.Viewer.Main.LoadedSchema",
        interfaces: ["FSharpRecord", "System.IEquatable"],
        properties: {
          Info: _Data.SchemaInfo,
          ModuleDefinitions: (0, _Util.makeGeneric)(_List2.default, {
            T: _Schema.ModuleDefinition
          }),
          OptionElement: (0, _Util.Interface)("Fable.Import.Browser.HTMLElement"),
          SchemaElement: (0, _Util.Interface)("Fable.Import.Browser.HTMLElement")
        }
      };
    }
  }, {
    key: "Equals",
    value: function (other) {
      return (0, _Util.equalsRecords)(this, other);
    }
  }]);

  return LoadedSchema;
}();

(0, _Symbol2.setType)("FsAsn1.Viewer.Main.LoadedSchema", LoadedSchema);

function loadSchemaDom(info) {
  return function (builder_) {
    return builder_.Delay(function () {
      return builder_.Bind(fetchSchema(info), function (_arg1) {
        console.time("parsing");
        var modules = parseSchema(_arg1, info);
        console.timeEnd("parsing");
        var patternInput = (0, _Components.makeSchemaDom)(info, _arg1, modules);
        return builder_.Return(new LoadedSchema(info, modules, patternInput[0], patternInput[1]));
      });
    });
  }(_AsyncBuilder.singleton);
}

function loadFile(path, ty, byteData) {
  return function (builder_) {
    return builder_.Delay(function () {
      return builder_.Bind((0, _Async.parallel)(function (source) {
        return (0, _Seq.map)(function (info) {
          return loadSchemaDom(info);
        }, source);
      }(ty.Schemas)), function (_arg1) {
        removeAllChildren(moduleSelector);
        removeAllChildren(schemasEl);

        _arg1.forEach(function (ls) {
          (0, _Utils.appendTo)(moduleSelector, ls.OptionElement);
          (0, _Utils.appendTo)(schemasEl, ls.SchemaElement);
        });

        updateSchema();
        var modules = (0, _List.collect)(function (ls_1) {
          return ls_1.ModuleDefinitions;
        }, (0, _List.ofArray)(_arg1));
        fileInfoEl.textContent = (0, _String.fsFormat)("%s (%.2f KB)")(function (x) {
          return x;
        })(path)(byteData.length / 1024);
        (0, _Utils.removeClass)("hidden", fileInfoEl);
        (0, _Utils.removeClass)("hidden", closeButtonEl);
        return builder_.TryWith(builder_.Delay(function () {
          read(byteData, modules, ty.TypeName);
          hideIntro();
          return builder_.Zero();
        }), function (_arg2) {
          (0, _String.fsFormat)("%A")(function (x) {
            console.log(x);
          })(_arg2);
          return builder_.Zero();
        });
      });
    });
  }(_AsyncBuilder.singleton);
}

function loadExampleFile(path) {
  var matchValue = (0, _Seq.tryFind)(function (ef) {
    return ef.Path === path;
  }, _Data.exampleFiles);

  if (matchValue == null) {} else {
    var ty = matchValue.Type;
    var path_1 = matchValue.Path;

    (function (arg00) {
      (0, _Async.start)(arg00);
    })(function (builder_) {
      return builder_.Delay(function () {
        return builder_.Bind(fetchData("/Data/" + path_1), function (_arg1) {
          var byteData = new Uint8Array(_arg1);
          return builder_.ReturnFrom(loadFile(path_1, ty, byteData));
        });
      });
    }(_AsyncBuilder.singleton));
  }
}

function loadSelectedFile(fs) {
  var readFile = function readFile(file) {
    return function (knownType) {
      var reader = new FileReader();

      reader.onload = function (e) {
        var data = new Uint8Array(reader.result);

        (function (arg00) {
          (0, _Async.start)(arg00);
        })(loadFile(file.name, knownType, data));

        return null;
      };

      reader.readAsArrayBuffer(file);
    };
  };

  var file_1 = fs[0];
  previewInfoEl.textContent = (0, _String.fsFormat)("Load %s (%.2f KB) as:")(function (x) {
    return x;
  })(file_1.name)(file_1.size / 1024);
  previewInfoEl.classList.remove("hidden");
  schemaSelectorEl.classList.remove("hidden");
  schemaSelectorEl.addEventListener('click', function (e_1) {
    var el = e_1.target;
    var matchValue = el.getAttribute("data-known-type");

    if (matchValue == null) {} else {
      readFile(file_1)((0, _Seq.item)(Number.parseInt(matchValue), _Data.knownTypes));
    }

    return null;
  });
}

var State = exports.State = function (__exports) {
  var ElementSet = function () {
    function ElementSet(id, structure, hex, schema) {
      _classCallCheck(this, ElementSet);

      this.Id = id;
      this.Structure = structure;
      this.Hex = hex;
      this.Schema = schema;
    }

    _createClass(ElementSet, [{
      key: _Symbol3.default.reflection,
      value: function () {
        return {
          type: "FsAsn1.Viewer.Main.State.ElementSet",
          interfaces: ["FSharpRecord", "System.IEquatable"],
          properties: {
            Id: "string",
            Structure: (0, _Util.Interface)("Fable.Import.Browser.HTMLElement"),
            Hex: (0, _Util.Interface)("Fable.Import.Browser.HTMLElement"),
            Schema: (0, _Util.Option)((0, _Util.Tuple)(["string", (0, _Util.Interface)("Fable.Import.Browser.HTMLElement")]))
          }
        };
      }
    }, {
      key: "Equals",
      value: function (other) {
        return (0, _Util.equalsRecords)(this, other);
      }
    }, {
      key: "Elements",
      value: function () {
        if (this.Schema == null) {
          return (0, _List.ofArray)([this.Structure, this.Hex]);
        } else {
          var el = this.Schema[1];
          return (0, _List.ofArray)([this.Structure, this.Hex, el]);
        }
      }
    }, {
      key: "AddClass",
      value: function (cls) {
        (0, _Seq.iterate)(function (el) {
          (0, _Utils.addClass)(cls, el);
        }, this.Elements());
      }
    }, {
      key: "RemoveClass",
      value: function (cls) {
        (0, _Seq.iterate)(function (el) {
          (0, _Utils.removeClass)(cls, el);
        }, this.Elements());
      }
    }]);

    return ElementSet;
  }();

  (0, _Symbol2.setType)("FsAsn1.Viewer.Main.State.ElementSet", ElementSet);

  var isHexElement = __exports.isHexElement = function (el) {
    return el.id.indexOf("H") === 0;
  };

  var isStructureElement = __exports.isStructureElement = function (el) {
    return el.id.indexOf("S") === 0;
  };

  var getElementSet = function getElementSet(el) {
    var id = el.id.substr(1);
    var hexEl = (0, _Utils.tryGetElementById)("H" + id);
    var structureEl = (0, _Utils.tryGetElementById)("S" + id);
    var typeName = structureEl["typeName"];
    var typeEl = (0, _Utils.tryGetElementById)("t-" + typeName);
    return new ElementSet(id, structureEl, hexEl, (0, _Util.defaultArg)(typeEl, null, function (el_1) {
      return [typeName, el_1];
    }));
  };

  var syncOtherViews = function syncOtherViews(el, set) {
    if (isStructureElement(el)) {
      var sync = function sync(targetEl) {
        return function (targetContainer) {
          (0, _Utils.syncScroll)(set.Structure, viewer, targetEl, targetContainer);
        };
      };

      sync(set.Hex)(hexBytes);

      if (set.Schema == null) {} else {
        var el_1 = set.Schema[1];
        var schemaId = el_1.parentElement.getAttribute("data-schema-id");
        moduleSelector.value = schemaId;
        updateSchema();
        sync(el_1)(schemasEl);
      }
    }

    if (isHexElement(el)) {
      var sync_1 = function sync_1(targetEl_1) {
        return function (targetContainer_1) {
          (0, _Utils.syncScroll)(set.Hex, hexBytes, targetEl_1, targetContainer_1);
        };
      };

      sync_1(set.Structure)(viewer);

      if (set.Schema == null) {} else {
        var el_2 = set.Schema[1];
        sync_1(el_2)(schemasEl);
      }
    }
  };

  var patternInput_267 = function () {
    var hoverSet = {
      contents: null
    };
    var selectionSet = {
      contents: null
    };

    var update = function update(cls) {
      return function (curSet) {
        return function (newSet) {
          var matchValue = curSet.contents;

          if (matchValue == null) {} else {
            matchValue.RemoveClass(cls);
          }

          if (newSet == null) {
            curSet.contents = null;
          } else {
            newSet.AddClass(cls);
            curSet.contents = newSet;
          }
        };
      };
    };

    var hoverEl = function hoverEl(el) {
      update("hover")(hoverSet)((0, _Util.defaultArg)((0, _Util.defaultArg)(el, null, function () {
        var predicate = function predicate(x) {
          if (isHexElement(x)) {
            return true;
          } else {
            return isStructureElement(x);
          }
        };

        return function (el_2) {
          return (0, _Utils.findParent)(predicate, el_2);
        };
      }()), null, function (el_1) {
        return getElementSet(el_1);
      }));
    };

    var selectEl = function selectEl(el_3) {
      (function (_arg1) {
        if (_arg1 == null) {
          update("selected")(selectionSet)(null);
        } else {
          var set = _arg1[1];
          var el_4 = _arg1[0];
          update("selected")(selectionSet)(set);
          syncOtherViews(el_4, set);
        }
      })((0, _Util.defaultArg)((0, _Util.defaultArg)(el_3, null, function () {
        var predicate_1 = function predicate_1(x_1) {
          if (isHexElement(x_1)) {
            return true;
          } else {
            return isStructureElement(x_1);
          }
        };

        return function (el_6) {
          return (0, _Utils.findParent)(predicate_1, el_6);
        };
      }()), null, function (el_5) {
        return [el_5, getElementSet(el_5)];
      }));
    };

    return [hoverEl, selectEl];
  }();

  var select = __exports.select = patternInput_267[1];
  var hover = __exports.hover = patternInput_267[0];
  return __exports;
}({});

hexViewer.addEventListener('click', (0, _Utils.withTarget)(function ($var13) {
  return State.select(function (arg0) {
    return arg0;
  }($var13));
}));
hexViewer.addEventListener('mouseover', (0, _Utils.withTarget)(function ($var14) {
  return State.hover(function (arg0) {
    return arg0;
  }($var14));
}));
hexViewer.addEventListener('mouseleave', function (_arg1) {
  State.hover(null);
  return null;
});
viewer.addEventListener('click', (0, _Utils.withTarget)(function ($var15) {
  return State.select(function (arg0) {
    return arg0;
  }($var15));
}));
viewer.addEventListener('mouseover', (0, _Utils.withTarget)(function ($var16) {
  return State.hover(function (arg0) {
    return arg0;
  }($var16));
}));
viewer.addEventListener('mouseleave', function (e) {
  State.hover(null);
  return null;
});
moduleSelector.addEventListener('change', function (e_1) {
  updateSchema();
  return null;
});
window.addEventListener('hashchange', function (e_2) {
  loadExampleFile(location.hash.substr("#example=".length));
  return null;
});
dropbox.addEventListener('dragenter', function (e_3) {
  e_3.stopPropagation();
  e_3.preventDefault();
  dropbox.classList.add("active");
  return null;
});
dropbox.addEventListener('dragleave', function (e_4) {
  e_4.stopPropagation();
  e_4.preventDefault();
  dropbox.classList.remove("active");
  return null;
});
dropbox.addEventListener('dragover', function (e_5) {
  e_5.stopPropagation();
  e_5.preventDefault();
  return null;
});
dropbox.addEventListener('drop', function (e_6) {
  e_6.stopPropagation();
  e_6.preventDefault();
  loadSelectedFile(e_6.dataTransfer.files);
  return null;
});
fileInput.addEventListener('change', function (e_7) {
  loadSelectedFile(fileInput.files);
  fileInput.value = null;
  return null;
});
(0, _Seq.iterate)(function ($var17) {
  return function (el) {
    (0, _Utils.appendTo)(listOfExamples, el);
  }(function (f) {
    return (0, _Components.exampleFile)(f);
  }($var17));
}, _Data.exampleFiles);
(0, _Seq.iterate)(function (el) {
  (0, _Utils.appendTo)(schemaSelectorEl, el);
}, (0, _List.mapIndexed)(function (index, kt) {
  return (0, _Components.knownTypeButton)(index, kt);
}, _Data.knownTypes));

if (location.hash.indexOf("#example=") === 0) {
  loadExampleFile(location.hash.substr("#example=".length));
}

closeButtonEl.addEventListener('click', function (e_8) {
  showIntro();
  moduleSelector.innerHTML = "";
  viewer.innerHTML = "";
  hexViewerOffsets.innerHTML = "";
  hexViewerBytes.innerHTML = "";
  schemasEl.innerHTML = "";
  (0, _Utils.addClass)("hidden", fileInfoEl);
  (0, _Utils.addClass)("hidden", closeButtonEl);
  location.hash = "";
  return null;
});

/***/ }),
/* 378 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bennu__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bennu___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_bennu__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_nu_stream__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_nu_stream___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_nu_stream__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_fable_core_List__ = __webpack_require__(22);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "choice", function() { return choice; });





//TODO class
function LastConsumedPosition(index, line, column, previous) {
    this.index = index;
    this.line = line;
    this.column = column;
    this.previous = previous;
}

LastConsumedPosition.initial = new LastConsumedPosition(0, 1, 1, null);

LastConsumedPosition.prototype.toString = function() { return `Line: ${this.line} Column: ${this.column}` }; 

LastConsumedPosition.prototype.increment = function(tok, restOfInput) {
    let isNewLine = tok === "\n" || (tok === "\r" && (!restOfInput || restOfInput.first !== "\n"));

    if (isNewLine) {
        return new LastConsumedPosition(this.index + 1, this.line + 1, 1, tok); 
    } else {
        return new LastConsumedPosition(this.index + 1, this.line, this.column + 1, tok); 
    }    
};
    
LastConsumedPosition.prototype.eq = function(other) {
    return other && other.index === this.index && other.previous === this.previous; 
};

let eagerList = function (p) {
	return __WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].bind(__WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].eager(p), arr => __WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].of(__WEBPACK_IMPORTED_MODULE_2_fable_core_List__["ofArray"](arr)));
}
		
let manyString = (p) => __WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].bind(__WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].eager(__WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].many(p)), arr => __WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].of(arr.join("")));
let many1String = (p) => __WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].bind(__WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].eager(__WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].many1(p)), arr => __WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].of(arr.join("")));
		

let newline = __WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].choice(__WEBPACK_IMPORTED_MODULE_0_bennu__["text"].string("\n"), __WEBPACK_IMPORTED_MODULE_0_bennu__["text"].string("\r\n"), __WEBPACK_IMPORTED_MODULE_0_bennu__["text"].string("\r"));

let wrapInSuccess = (p) =>
    __WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].bind(p, 
        r => __WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].bind(__WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].getParserState, 
            s => __WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].of({ Case: 'Success', Fields: [r, s.userState, s.position]})))


let choice = ps =>
    __WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].choicea(Array.from(ps))

//TODO turn into separate non-default exports
/* harmony default export */ __webpack_exports__["default"] = ({
    eof: __WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].eof,
	fail: (msg) => __WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].never(msg),
    attempt: p => __WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].attempt(p),
    preturn: __WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].of,
    choice,
    skipManyTill: (p, endp) => __WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].sequence(__WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].eager(__WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].manyTill(p, endp)), endp, __WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].of(null)),
    //TODO false not supported
    skipRestOfLine: (skipNewline) => __WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].sequence(__WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].eager(__WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].manyTill(__WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].anyToken, newline)), newline),
    manyTill: (p, endp) => __WEBPACK_IMPORTED_MODULE_0_bennu__["lang"].then(__WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].eager(__WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].manyTill(p, endp)), endp),
	op_GreaterGreaterEquals: (p, f) => __WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].bind(p, f),
	anyChar: __WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].anyToken,
	skipString: (s) => __WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].next(__WEBPACK_IMPORTED_MODULE_0_bennu__["text"].string(s), __WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].of(null)),	
    skipNewline: __WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].next(__WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].choice(__WEBPACK_IMPORTED_MODULE_0_bennu__["text"].string("\n"), __WEBPACK_IMPORTED_MODULE_0_bennu__["text"].string("\r\n"), __WEBPACK_IMPORTED_MODULE_0_bennu__["text"].string("\r")), __WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].of(null)),
    newline,
    getPosition: __WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].getPosition,
    getUserState: __WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].getState,
	//TODO check this one
	op_DotGreaterGreaterQmark: (p1, p2) =>
		__WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].attempt(__WEBPACK_IMPORTED_MODULE_0_bennu__["lang"].then(p1, p2)),
    run: (p, str) => { 
        try {    
            return __WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].runState(wrapInSuccess(p), new __WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].ParserState(__WEBPACK_IMPORTED_MODULE_1_nu_stream__["stream"].from(str), LastConsumedPosition.initial));             
        } catch (ex) {
            return { Case: 'Failure', Fields: [ex.toString()] };
        }	    
	},
    runParserOnSubstring: (p, userState, streamName, str, index, count) => { 
        try {
            return __WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].runState(wrapInSuccess(p), new __WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].ParserState(__WEBPACK_IMPORTED_MODULE_1_nu_stream__["stream"].from(str.substring(index, index + count)), LastConsumedPosition.initial, userState)); 
        } catch (ex) {
            return { Case: 'Failure', Fields: [ex.toString()] };
        }	    
    },
    runParserOnString: (p, userState, streamName, str) => { 
        try {
            return __WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].runState(wrapInSuccess(p), new __WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].ParserState(__WEBPACK_IMPORTED_MODULE_1_nu_stream__["stream"].from(str), LastConsumedPosition.initial, userState));             
        } catch (ex) {
            return { Case: 'Failure', Fields: [ex.toString()] };
        }	    
    },
	pstring: (str) => __WEBPACK_IMPORTED_MODULE_0_bennu__["text"].string(str),
	pint32:
		__WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].bind(many1String(__WEBPACK_IMPORTED_MODULE_0_bennu__["text"].digit), n => __WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].of(Number.parseInt(n))),
	spaces:
		__WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].next(manyString(__WEBPACK_IMPORTED_MODULE_0_bennu__["text"].space), __WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].of(null)),
	numberLiteral: (opts, label) =>
		__WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].bind(many1String(__WEBPACK_IMPORTED_MODULE_0_bennu__["text"].digit), s => __WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].of({ string: s })),
	opt: p => __WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].optional(null, p),
	many: p => eagerList(__WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].many(p)),
	sepBy: (p, sep) => eagerList(__WEBPACK_IMPORTED_MODULE_0_bennu__["lang"].sepBy(sep, p)),
	op_BarGreaterGreater: (p, f) => __WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].bind(p, x => __WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].of(f(x))),
	op_LessBarGreater: __WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].either,
	op_LessBarGreaterPercent: (p, v) => __WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].either(p, __WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].of(v)),
	op_GreaterGreaterDot:  __WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].next,
	op_DotGreaterGreater:  __WEBPACK_IMPORTED_MODULE_0_bennu__["lang"].then,
	op_DotGreaterGreaterDot: (p1, p2) => __WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].bind(p1, x => __WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].bind(p2, y => __WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].of([x,y]))),
	op_GreaterGreaterPercent: (p1, v) => __WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].next(p1, __WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].of(v)),
	between: __WEBPACK_IMPORTED_MODULE_0_bennu__["lang"].between,
	pipe4: (p1,p2,p3,p4,f) =>
		__WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].bind(p1, 
			x => __WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].bind(p2, 
				y => __WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].bind(p3, 
					z => __WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].bind(p4,
                        w => __WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].of(f(x)(y)(z)(w)))))),
    pipe3: (p1,p2,p3,f) =>
        __WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].bind(p1, 
            x => __WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].bind(p2, 
                y => __WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].bind(p3, 
                    z => __WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].of(f(x)(y)(z))))),
	tuple3: (p1,p2,p3,f) =>
        __WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].bind(p1, 
            x => __WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].bind(p2, 
                y => __WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].bind(p3, 
                    z => __WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].of([x, y, z])))),
    tuple2: (p1,p2,f) =>
        __WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].bind(p1, 
            x => __WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].bind(p2, 
                y => __WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].of([x, y]))),
	pipe2: (p1, p2, f) =>
		__WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].bind(p1, x => __WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].bind(p2, y => __WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].of(f(x)(y)))),
	createParserForwardedToRef: () =>
		{ let ref = {contents: undefined}; return [__WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].late(() => ref.contents), ref]},	
    many1Satisfy2L: (f1, f, p3) =>
        __WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].bind(__WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].token(f1), 
            x => __WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].bind(manyString(__WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].token(f)),
                y => __WEBPACK_IMPORTED_MODULE_0_bennu__["parse"].of(x + y)))
});


/***/ }),
/* 379 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map