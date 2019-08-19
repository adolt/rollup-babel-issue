var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var fails = function fails(exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

// https://tc39.github.io/ecma262/#sec-array.isarray

_export({
  target: 'Array',
  stat: true
}, {
  isArray: isArray$3
});

var path = {};

var isArray = path.Array.isArray;

var isArray$1 = isArray;

var isArray$2 = isArray$1;

var hasOwnProperty = {}.hasOwnProperty;

var has = function has(it, key) {
  return hasOwnProperty.call(it, key);
};

var O = 'object';

var check = function check(it) {
  return it && it.Math == Math && it;
}; // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028


var global_1 = // eslint-disable-next-line no-undef
check((typeof globalThis === "undefined" ? "undefined" : _typeof_1(globalThis)) == O && globalThis) || check((typeof window === "undefined" ? "undefined" : _typeof_1(window)) == O && window) || check((typeof self === "undefined" ? "undefined" : _typeof_1(self)) == O && self) || check(_typeof_1(commonjsGlobal) == O && commonjsGlobal) || // eslint-disable-next-line no-new-func
Function('return this')();

var descriptors = !fails(function () {
  return defineProperty$3({}, 'a', {
    get: function get() {
      return 7;
    }
  }).a != 7;
});

var document$1 = global_1.document; // typeof document.createElement is 'object' in old IE

var EXISTS = isObject(document$1) && isObject(document$1.createElement);

var documentCreateElement = function documentCreateElement(it) {
  return EXISTS ? document$1.createElement(it) : {};
};

var ie8DomDefine = !descriptors && !fails(function () {
  return defineProperty$3(documentCreateElement('div'), 'a', {
    get: function get() {
      return 7;
    }
  }).a != 7;
});

var anObject = function anObject(it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  }

  return it;
};

// https://tc39.github.io/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string

var toPrimitive = function toPrimitive(input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var nativeDefineProperty = defineProperty$3; // `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty

var f = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (ie8DomDefine) try {
    return nativeDefineProperty(O, P, Attributes);
  } catch (error) {
    /* empty */
  }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};
var objectDefineProperty = {
  f: f
};

var createPropertyDescriptor = function createPropertyDescriptor(bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var hide = descriptors ? function (object, key, value) {
  return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var setGlobal = function setGlobal(key, value) {
  try {
    hide(global_1, key, value);
  } catch (error) {
    global_1[key] = value;
  }

  return value;
};

var shared = createCommonjsModule(function (module) {
  var SHARED = '__core-js_shared__';
  var store = global_1[SHARED] || setGlobal(SHARED, {});
  (module.exports = function (key, value) {
    return store[key] || (store[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: '3.2.1',
    mode:  'pure' ,
    copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
  });
});

var id = 0;
var postfix = Math.random();

var uid = function uid(key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};

var split = ''.split; // fallback for non-array-like ES3 and non-enumerable old V8 strings

var indexedObject = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;

// `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
var requireObjectCoercible = function requireObjectCoercible(it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};

var toIndexedObject = function toIndexedObject(it) {
  return indexedObject(requireObjectCoercible(it));
};

var functionToString = shared('native-function-to-string', Function.toString);

var WeakMap = global_1.WeakMap;
var nativeWeakMap = typeof WeakMap === 'function' && /native code/.test(functionToString.call(WeakMap));

var keys = shared('keys');

var sharedKey = function sharedKey(key) {
  return keys[key] || (keys[key] = uid(key));
};

var hiddenKeys = {};

var WeakMap$1 = global_1.WeakMap;
var set, get, has$1;

var enforce = function enforce(it) {
  return has$1(it) ? get(it) : set(it, {});
};

var getterFor = function getterFor(TYPE) {
  return function (it) {
    var state;

    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    }

    return state;
  };
};

if (nativeWeakMap) {
  var store = new WeakMap$1();
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;

  set = function set(it, metadata) {
    wmset.call(store, it, metadata);
    return metadata;
  };

  get = function get(it) {
    return wmget.call(store, it) || {};
  };

  has$1 = function has(it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;

  set = function set(it, metadata) {
    hide(it, STATE, metadata);
    return metadata;
  };

  get = function get(it) {
    return has(it, STATE) ? it[STATE] : {};
  };

  has$1 = function has$1(it) {
    return has(it, STATE);
  };
}

var internalState = {
  set: set,
  get: get,
  has: has$1,
  enforce: enforce,
  getterFor: getterFor
};

var entryVirtual = function entryVirtual(CONSTRUCTOR) {
  return path[CONSTRUCTOR + 'Prototype'];
};

var entries = entries$2(entryVirtual('Array'));

var entries$1 = entries;

var TO_STRING_TAG = wellKnownSymbol('toStringTag'); // ES3 wrong here

var CORRECT_ARGUMENTS = classofRaw(function () {
  return arguments;
}()) == 'Arguments'; // fallback for IE11 Script Access Denied error

var tryGet = function tryGet(it, key) {
  try {
    return it[key];
  } catch (error) {
    /* empty */
  }
}; // getting tag from ES6+ `Object.prototype.toString`


var classof = function classof(it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null' // @@toStringTag case
  : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag // builtinTag case
  : CORRECT_ARGUMENTS ? classofRaw(O) // ES3 arguments fallback
  : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};

var ArrayPrototype = Array.prototype;
var DOMIterables = {
  DOMTokenList: true,
  NodeList: true
};

var entries_1 = function entries_1(it) {
  var own = entries$2(it);

  return it === ArrayPrototype || it instanceof Array && own === entries$2(ArrayPrototype) // eslint-disable-next-line no-prototype-builtins
  || DOMIterables.hasOwnProperty(classof(it)) ? entries$1 : own;
};

var entries$2 = entries_1;

var keys$1 = keys$3(entryVirtual('Array'));

var keys$2 = keys$1;

var ArrayPrototype$1 = Array.prototype;
var DOMIterables$1 = {
  DOMTokenList: true,
  NodeList: true
};

var keys_1 = function keys_1(it) {
  var own = keys$3(it);

  return it === ArrayPrototype$1 || it instanceof Array && own === keys$3(ArrayPrototype$1) // eslint-disable-next-line no-prototype-builtins
  || DOMIterables$1.hasOwnProperty(classof(it)) ? keys$2 : own;
};

var keys$3 = keys_1;

// https://tc39.github.io/ecma262/#sec-toobject

var toObject = function toObject(argument) {
  return Object(requireObjectCoercible(argument));
};

var correctPrototypeGetter = !fails(function () {
  function F() {
    /* empty */
  }

  F.prototype.constructor = null;
  return getPrototypeOf$2(new F()) !== F.prototype;
});

var FAILS_ON_PRIMITIVES = fails(function () {
  objectGetPrototypeOf(1);
}); // `Object.getPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.getprototypeof

_export({
  target: 'Object',
  stat: true,
  forced: FAILS_ON_PRIMITIVES,
  sham: !correctPrototypeGetter
}, {
  getPrototypeOf: function getPrototypeOf(it) {
    return objectGetPrototypeOf(toObject(it));
  }
});

var getPrototypeOf = path.Object.getPrototypeOf;

var getPrototypeOf$1 = getPrototypeOf;

var getPrototypeOf$2 = getPrototypeOf$1;

var IE_PROTO = sharedKey('IE_PROTO');
var ObjectPrototype = Object.prototype; // `Object.getPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.getprototypeof

var objectGetPrototypeOf = correctPrototypeGetter ? getPrototypeOf$2 : function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];

  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  }

  return O instanceof Object ? ObjectPrototype : null;
};

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;
// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object


var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

if (keys$3([])) {
  var _context;

  arrayIterator = keys$3(_context = []).call(_context); // Safari 8 has buggy iterators w/o `next`

  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;else {
    PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

if (IteratorPrototype == undefined) IteratorPrototype = {}; // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
var iteratorsCore = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};

// https://tc39.github.io/ecma262/#sec-object.create

_export({
  target: 'Object',
  stat: true,
  sham: !descriptors
}, {
  create: objectCreate
});

var Object$1 = path.Object;

var create = function create(P, D) {
  return Object$1.create(P, D);
};

var create$1 = create;

var create$2 = create$1;

// https://tc39.github.io/ecma262/#sec-object.defineproperties

_export({
  target: 'Object',
  stat: true,
  forced: !descriptors,
  sham: !descriptors
}, {
  defineProperties: objectDefineProperties
});

var defineProperties_1 = createCommonjsModule(function (module) {
  var Object = path.Object;

  var defineProperties = module.exports = function defineProperties(T, D) {
    return Object.defineProperties(T, D);
  };

  if (Object.defineProperties.sham) defineProperties.sham = true;
});

var defineProperties = defineProperties_1;

var defineProperties$1 = defineProperties;

var FAILS_ON_PRIMITIVES$1 = fails(function () {
  objectKeys(1);
}); // `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys

_export({
  target: 'Object',
  stat: true,
  forced: FAILS_ON_PRIMITIVES$1
}, {
  keys: function keys(it) {
    return objectKeys(toObject(it));
  }
});

var keys$4 = keys$3(path.Object);

var keys$5 = keys$4;

var keys$6 = keys$5;

var $includes = includes$4(arrayIncludes); // `Array.prototype.includes` method
// https://tc39.github.io/ecma262/#sec-array.prototype.includes


_export({
  target: 'Array',
  proto: true
}, {
  includes: function includes(el
  /* , fromIndex = 0 */
  ) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
}); // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables

var includes = includes$4(entryVirtual('Array'));

var MATCH = wellKnownSymbol('match'); // `IsRegExp` abstract operation
// https://tc39.github.io/ecma262/#sec-isregexp

var isRegexp = function isRegexp(it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classofRaw(it) == 'RegExp');
};

var notARegexp = function notARegexp(it) {
  if (isRegexp(it)) {
    throw TypeError("The method doesn't accept regular expressions");
  }

  return it;
};

var MATCH$1 = wellKnownSymbol('match');

var correctIsRegexpLogic = function correctIsRegexpLogic(METHOD_NAME) {
  var regexp = /./;

  try {
    '/./'[METHOD_NAME](regexp);
  } catch (e) {
    try {
      regexp[MATCH$1] = false;
      return '/./'[METHOD_NAME](regexp);
    } catch (f) {
      /* empty */
    }
  }

  return false;
};

// https://tc39.github.io/ecma262/#sec-string.prototype.includes


_export({
  target: 'String',
  proto: true,
  forced: !correctIsRegexpLogic('includes')
}, {
  includes: function includes(searchString
  /* , position = 0 */
  ) {
    var _context;

    return !!~indexOf$2(_context = String(requireObjectCoercible(this))).call(_context, notARegexp(searchString), arguments.length > 1 ? arguments[1] : undefined);
  }
});

var includes$1 = includes$4(entryVirtual('String'));

var ArrayPrototype$2 = Array.prototype;
var StringPrototype = String.prototype;

var includes$2 = function includes$2(it) {
  var own = includes$4(it);

  if (it === ArrayPrototype$2 || it instanceof Array && own === includes$4(ArrayPrototype$2)) return includes;

  if (typeof it === 'string' || it === StringPrototype || it instanceof String && own === includes$4(StringPrototype)) {
    return includes$1;
  }

  return own;
};

var includes$3 = includes$2;

var includes$4 = includes$3;

var ceil = Math.ceil;
var floor = Math.floor; // `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger

var toInteger = function toInteger(argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};

var min = Math.min; // `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength

var toLength = function toLength(argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

var max = Math.max;
var min$1 = Math.min; // Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(length, length).

var toAbsoluteIndex = function toAbsoluteIndex(index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
};

var createMethod = function createMethod(IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value; // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare

    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++]; // eslint-disable-next-line no-self-compare

      if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not
    } else for (; length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    }
    return !IS_INCLUDES && -1;
  };
};

var arrayIncludes = {
  // `Array.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};

var sloppyArrayMethod = function sloppyArrayMethod(METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !method || !fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal
    method.call(null, argument || function () {
      throw 1;
    }, 1);
  });
};

var _context$1;

var $indexOf = indexOf$2(arrayIncludes);

var nativeIndexOf = indexOf$2([]);

var NEGATIVE_ZERO = !!nativeIndexOf && 1 / indexOf$2(_context$1 = [1]).call(_context$1, 1, -0) < 0;
var SLOPPY_METHOD = sloppyArrayMethod('indexOf'); // `Array.prototype.indexOf` method
// https://tc39.github.io/ecma262/#sec-array.prototype.indexof

_export({
  target: 'Array',
  proto: true,
  forced: NEGATIVE_ZERO || SLOPPY_METHOD
}, {
  indexOf: function indexOf(searchElement
  /* , fromIndex = 0 */
  ) {
    return NEGATIVE_ZERO // convert -0 to +0
    ? nativeIndexOf.apply(this, arguments) || 0 : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var indexOf = indexOf$2(entryVirtual('Array'));

var ArrayPrototype$3 = Array.prototype;

var indexOf_1 = function indexOf_1(it) {
  var own = indexOf$2(it);

  return it === ArrayPrototype$3 || it instanceof Array && own === indexOf$2(ArrayPrototype$3) ? indexOf : own;
};

var indexOf$1 = indexOf_1;

var indexOf$2 = indexOf$1;

var indexOf$3 = indexOf$2(arrayIncludes);

var objectKeysInternal = function objectKeysInternal(object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;

  for (key in O) {
    !has(hiddenKeys, key) && has(O, key) && result.push(key);
  } // Don't enum bug & hidden keys


  while (names.length > i) {
    if (has(O, key = names[i++])) {
      ~indexOf$3(result, key) || result.push(key);
    }
  }

  return result;
};

// IE8- don't enum bug keys
var enumBugKeys = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];

// https://tc39.github.io/ecma262/#sec-object.keys

var objectKeys = keys$6 || function keys(O) {
  return objectKeysInternal(O, enumBugKeys);
};

// https://tc39.github.io/ecma262/#sec-object.defineproperties

var objectDefineProperties = descriptors ? defineProperties$1 : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;

  while (length > index) {
    objectDefineProperty.f(O, key = keys[index++], Properties[key]);
  }

  return O;
};

var aFunction = function aFunction(variable) {
  return typeof variable == 'function' ? variable : undefined;
};

var getBuiltIn = function getBuiltIn(namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global_1[namespace]) : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
};

var html = getBuiltIn('document', 'documentElement');

var IE_PROTO$1 = sharedKey('IE_PROTO');
var PROTOTYPE = 'prototype';

var Empty = function Empty() {
  /* empty */
}; // Create object with fake `null` prototype: use iframe Object with cleared prototype


var _createDict = function createDict() {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var length = enumBugKeys.length;
  var lt = '<';
  var script = 'script';
  var gt = '>';
  var js = 'java' + script + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  iframe.src = String(js);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + script + gt + 'document.F=Object' + lt + '/' + script + gt);
  iframeDocument.close();
  _createDict = iframeDocument.F;

  while (length--) {
    delete _createDict[PROTOTYPE][enumBugKeys[length]];
  }

  return _createDict();
}; // `Object.create` method
// https://tc39.github.io/ecma262/#sec-object.create


var objectCreate = create$2 || function create(O, Properties) {
  var result;

  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null; // add "__proto__" for Object.getPrototypeOf polyfill

    result[IE_PROTO$1] = O;
  } else result = _createDict();

  return Properties === undefined ? result : objectDefineProperties(result, Properties);
};

hiddenKeys[IE_PROTO$1] = true;

var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');
var test = {};
test[TO_STRING_TAG$1] = 'z'; // `Object.prototype.toString` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring

var objectToString = String(test) !== '[object z]' ? function toString() {
  return '[object ' + classof(this) + ']';
} : test.toString;

var defineProperty = objectDefineProperty.f;
var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag');
var METHOD_REQUIRED = objectToString !== {}.toString;

var setToStringTag = function setToStringTag(it, TAG, STATIC, SET_METHOD) {
  if (it) {
    var target = STATIC ? it : it.prototype;

    if (!has(target, TO_STRING_TAG$2)) {
      defineProperty(target, TO_STRING_TAG$2, {
        configurable: true,
        value: TAG
      });
    }

    if (SET_METHOD && METHOD_REQUIRED) hide(target, 'toString', objectToString);
  }
};

var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;

var createIteratorConstructor = function createIteratorConstructor(IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, {
    next: createPropertyDescriptor(1, next)
  });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  return IteratorConstructor;
};

var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor = getOwnPropertyDescriptor$2; // Nashorn ~ JDK8 bug

var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({
  1: 2
}, 1); // `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable

var f$1 = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;
var objectPropertyIsEnumerable = {
  f: f$1
};

var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptor$2; // `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor

var f$2 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (ie8DomDefine) try {
    return nativeGetOwnPropertyDescriptor(O, P);
  } catch (error) {
    /* empty */
  }
  if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
};
var objectGetOwnPropertyDescriptor = {
  f: f$2
};

var nativeGetOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
var FAILS_ON_PRIMITIVES$2 = fails(function () {
  nativeGetOwnPropertyDescriptor$1(1);
});
var FORCED = !descriptors || FAILS_ON_PRIMITIVES$2; // `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor

_export({
  target: 'Object',
  stat: true,
  forced: FORCED,
  sham: !descriptors
}, {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
    return nativeGetOwnPropertyDescriptor$1(toIndexedObject(it), key);
  }
});

var getOwnPropertyDescriptor_1 = createCommonjsModule(function (module) {
  var Object = path.Object;

  var getOwnPropertyDescriptor = module.exports = function getOwnPropertyDescriptor(it, key) {
    return Object.getOwnPropertyDescriptor(it, key);
  };

  if (Object.getOwnPropertyDescriptor.sham) getOwnPropertyDescriptor.sham = true;
});

var getOwnPropertyDescriptor$1 = getOwnPropertyDescriptor_1;

var getOwnPropertyDescriptor$2 = getOwnPropertyDescriptor$1;

// https://tc39.github.io/ecma262/#sec-object.setprototypeof

_export({
  target: 'Object',
  stat: true
}, {
  setPrototypeOf: objectSetPrototypeOf
});

var setPrototypeOf = path.Object.setPrototypeOf;

var setPrototypeOf$1 = setPrototypeOf;

var setPrototypeOf$2 = setPrototypeOf$1;

var aPossiblePrototype = function aPossiblePrototype(it) {
  if (!isObject(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  }

  return it;
};

// https://tc39.github.io/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.

/* eslint-disable no-proto */

var objectSetPrototypeOf = setPrototypeOf$2 || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;

  try {
    setter = getOwnPropertyDescriptor$2(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) {
    /* empty */
  }

  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);else O.__proto__ = proto;
    return O;
  };
}() : undefined);

var redefine = function redefine(target, key, value, options) {
  if (options && options.enumerable) target[key] = value;else hide(target, key, value);
};

var IteratorPrototype$2 = iteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS$1 = iteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR$1 = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var defineIterator = function defineIterator(Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function getIterationMethod(KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS$1 && KIND in IterablePrototype) return IterablePrototype[KIND];

    switch (KIND) {
      case KEYS:
        return function keys() {
          return new IteratorConstructor(this, KIND);
        };

      case VALUES:
        return function values() {
          return new IteratorConstructor(this, KIND);
        };

      case ENTRIES:
        return function entries() {
          return new IteratorConstructor(this, KIND);
        };
    }

    return function () {
      return new IteratorConstructor(this);
    };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR$1] || IterablePrototype['@@iterator'] || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS$1 && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? entries$2(IterablePrototype) || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY; // fix native

  if (anyNativeIterator) {
    CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));

    if (IteratorPrototype$2 !== Object.prototype && CurrentIteratorPrototype.next) {


      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
    }
  } // fix Array#{values, @@iterator}.name in V8 / FF


  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    INCORRECT_VALUES_NAME = true;

    defaultIterator = function values() {
      return nativeIterator.call(this);
    };
  } // define iterator


  if (( FORCED) && IterablePrototype[ITERATOR$1] !== defaultIterator) {
    hide(IterablePrototype, ITERATOR$1, defaultIterator);
  }

  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else _export({
      target: NAME,
      proto: true,
      forced: BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME
    }, methods);
  }

  return methods;
};

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = internalState.set;
var getInternalState = internalState.getterFor(ARRAY_ITERATOR); // `Array.prototype.entries` method
// https://tc39.github.io/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.github.io/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.github.io/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.github.io/ecma262/#sec-createarrayiterator

var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated),
    // target
    index: 0,
    // next index
    kind: kind // kind

  }); // `%ArrayIteratorPrototype%.next` method
  // https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;

  if (!target || index >= target.length) {
    state.target = undefined;
    return {
      value: undefined,
      done: true
    };
  }

  if (kind == 'keys') return {
    value: index,
    done: false
  };
  if (kind == 'values') return {
    value: target[index],
    done: false
  };
  return {
    value: [index, target[index]],
    done: false
  };
}, 'values'); // argumentsList[@@iterator] is %ArrayProto_values%

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
var domIterables = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};

var TO_STRING_TAG$3 = wellKnownSymbol('toStringTag');

for (var COLLECTION_NAME in domIterables) {
  var Collection = global_1[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;

  if (CollectionPrototype && !CollectionPrototype[TO_STRING_TAG$3]) {
    hide(CollectionPrototype, TO_STRING_TAG$3, COLLECTION_NAME);
  }
}

var $findIndex = findIndex$2(arrayIteration);

var FIND_INDEX = 'findIndex';
var SKIPS_HOLES = true; // Shouldn't skip holes

if (FIND_INDEX in []) Array(1)[FIND_INDEX](function () {
  SKIPS_HOLES = false;
}); // `Array.prototype.findIndex` method
// https://tc39.github.io/ecma262/#sec-array.prototype.findindex

_export({
  target: 'Array',
  proto: true,
  forced: SKIPS_HOLES
}, {
  findIndex: function findIndex(callbackfn
  /* , that = undefined */
  ) {
    return $findIndex(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
}); // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables

var findIndex = findIndex$2(entryVirtual('Array'));

var ArrayPrototype$4 = Array.prototype;

var findIndex_1 = function findIndex_1(it) {
  var own = findIndex$2(it);

  return it === ArrayPrototype$4 || it instanceof Array && own === findIndex$2(ArrayPrototype$4) ? findIndex : own;
};

var findIndex$1 = findIndex_1;

var findIndex$2 = findIndex$1;

var $find = find$2(arrayIteration);

var FIND = 'find';
var SKIPS_HOLES$1 = true; // Shouldn't skip holes

if (FIND in []) Array(1)[FIND](function () {
  SKIPS_HOLES$1 = false;
}); // `Array.prototype.find` method
// https://tc39.github.io/ecma262/#sec-array.prototype.find

_export({
  target: 'Array',
  proto: true,
  forced: SKIPS_HOLES$1
}, {
  find: function find(callbackfn
  /* , that = undefined */
  ) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
}); // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables

var find = find$2(entryVirtual('Array'));

var ArrayPrototype$5 = Array.prototype;

var find_1 = function find_1(it) {
  var own = find$2(it);

  return it === ArrayPrototype$5 || it instanceof Array && own === find$2(ArrayPrototype$5) ? find : own;
};

var find$1 = find_1;

var find$2 = find$1;

var $every = every$2(arrayIteration); // `Array.prototype.every` method
// https://tc39.github.io/ecma262/#sec-array.prototype.every


_export({
  target: 'Array',
  proto: true,
  forced: sloppyArrayMethod('every')
}, {
  every: function every(callbackfn
  /* , thisArg */
  ) {
    return $every(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var every = every$2(entryVirtual('Array'));

var ArrayPrototype$6 = Array.prototype;

var every_1 = function every_1(it) {
  var own = every$2(it);

  return it === ArrayPrototype$6 || it instanceof Array && own === every$2(ArrayPrototype$6) ? every : own;
};

var every$1 = every_1;

var every$2 = every$1;

var $some = some$2(arrayIteration); // `Array.prototype.some` method
// https://tc39.github.io/ecma262/#sec-array.prototype.some


_export({
  target: 'Array',
  proto: true,
  forced: sloppyArrayMethod('some')
}, {
  some: function some(callbackfn
  /* , thisArg */
  ) {
    return $some(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var some = some$2(entryVirtual('Array'));

var ArrayPrototype$7 = Array.prototype;

var some_1 = function some_1(it) {
  var own = some$2(it);

  return it === ArrayPrototype$7 || it instanceof Array && own === some$2(ArrayPrototype$7) ? some : own;
};

var some$1 = some_1;

var some$2 = some$1;

var SPECIES = wellKnownSymbol('species');

var arrayMethodHasSpeciesSupport = function arrayMethodHasSpeciesSupport(METHOD_NAME) {
  return !fails(function () {
    var array = [];
    var constructor = array.constructor = {};

    constructor[SPECIES] = function () {
      return {
        foo: 1
      };
    };

    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};

var $filter = filter$2(arrayIteration); // `Array.prototype.filter` method
// https://tc39.github.io/ecma262/#sec-array.prototype.filter
// with adding support of @@species


_export({
  target: 'Array',
  proto: true,
  forced: !arrayMethodHasSpeciesSupport('filter')
}, {
  filter: function filter(callbackfn
  /* , thisArg */
  ) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var filter = filter$2(entryVirtual('Array'));

var ArrayPrototype$8 = Array.prototype;

var filter_1 = function filter_1(it) {
  var own = filter$2(it);

  return it === ArrayPrototype$8 || it instanceof Array && own === filter$2(ArrayPrototype$8) ? filter : own;
};

var filter$1 = filter_1;

var filter$2 = filter$1;

var $map = map$2(arrayIteration); // `Array.prototype.map` method
// https://tc39.github.io/ecma262/#sec-array.prototype.map
// with adding support of @@species


_export({
  target: 'Array',
  proto: true,
  forced: !arrayMethodHasSpeciesSupport('map')
}, {
  map: function map(callbackfn
  /* , thisArg */
  ) {
    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var map = map$2(entryVirtual('Array'));

var ArrayPrototype$9 = Array.prototype;

var map_1 = function map_1(it) {
  var own = map$2(it);

  return it === ArrayPrototype$9 || it instanceof Array && own === map$2(ArrayPrototype$9) ? map : own;
};

var map$1 = map_1;

var map$2 = map$1;

var aFunction$1 = function aFunction(it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  }

  return it;
};

var bindContext = function bindContext(fn, that, length) {
  aFunction$1(fn);
  if (that === undefined) return fn;

  switch (length) {
    case 0:
      return function () {
        return fn.call(that);
      };

    case 1:
      return function (a) {
        return fn.call(that, a);
      };

    case 2:
      return function (a, b) {
        return fn.call(that, a, b);
      };

    case 3:
      return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
  }

  return function ()
  /* ...args */
  {
    return fn.apply(that, arguments);
  };
};

var SPECIES$1 = wellKnownSymbol('species'); // `ArraySpeciesCreate` abstract operation
// https://tc39.github.io/ecma262/#sec-arrayspeciescreate

var arraySpeciesCreate = function arraySpeciesCreate(originalArray, length) {
  var C;

  if (isArray$3(originalArray)) {
    C = originalArray.constructor; // cross-realm fallback

    if (typeof C == 'function' && (C === Array || isArray$3(C.prototype))) C = undefined;else if (isObject(C)) {
      C = C[SPECIES$1];
      if (C === null) C = undefined;
    }
  }

  return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};

var push = [].push; // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation

var createMethod$1 = function createMethod(TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = indexedObject(O);
    var boundFunction = bindContext(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var value, result;

    for (; length > index; index++) {
      if (NO_HOLES || index in self) {
        value = self[index];
        result = boundFunction(value, index, O);

        if (TYPE) {
          if (IS_MAP) target[index] = result; // map
          else if (result) switch (TYPE) {
              case 3:
                return true;
              // some

              case 5:
                return value;
              // find

              case 6:
                return index;
              // findIndex

              case 2:
                push.call(target, value);
              // filter
            } else if (IS_EVERY) return false; // every
        }
      }
    }

    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

var arrayIteration = {
  // `Array.prototype.forEach` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
  forEach: createMethod$1(0),
  // `Array.prototype.map` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.map
  map: createMethod$1(1),
  // `Array.prototype.filter` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
  filter: createMethod$1(2),
  // `Array.prototype.some` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.some
  some: createMethod$1(3),
  // `Array.prototype.every` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.every
  every: createMethod$1(4),
  // `Array.prototype.find` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.find
  find: createMethod$1(5),
  // `Array.prototype.findIndex` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod$1(6)
};

var arrayIteration_1 = forEach$2(arrayIteration);

var $forEach = forEach$2(arrayIteration); // `Array.prototype.forEach` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach


var arrayForEach = sloppyArrayMethod('forEach') ? function forEach(callbackfn
/* , thisArg */
) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
} : forEach$2([]);

// https://tc39.github.io/ecma262/#sec-array.prototype.foreach


_export({
  target: 'Array',
  proto: true,
  forced: forEach$2([]) != arrayForEach
}, {
  forEach: arrayForEach
});

var forEach = forEach$2(entryVirtual('Array'));

var forEach$1 = forEach;

var ArrayPrototype$a = Array.prototype;
var DOMIterables$2 = {
  DOMTokenList: true,
  NodeList: true
};

var forEach_1 = function forEach_1(it) {
  var own = forEach$2(it);

  return it === ArrayPrototype$a || it instanceof Array && own === forEach$2(ArrayPrototype$a) // eslint-disable-next-line no-prototype-builtins
  || DOMIterables$2.hasOwnProperty(classof(it)) ? forEach$1 : own;
};

var forEach$2 = forEach_1;

var nativeGetOwnPropertyNames = objectGetOwnPropertyNames.f;
var toString = {}.toString;
var windowNames = (typeof window === "undefined" ? "undefined" : _typeof_1(window)) == 'object' && window && getOwnPropertyNames$2 ? getOwnPropertyNames$2(window) : [];

var getWindowNames = function getWindowNames(it) {
  try {
    return nativeGetOwnPropertyNames(it);
  } catch (error) {
    return slice$2(windowNames).call(windowNames);
  }
}; // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window


var f$3 = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : nativeGetOwnPropertyNames(toIndexedObject(it));
};

var objectGetOwnPropertyNamesExternal = {
  f: f$3
};

var nativeGetOwnPropertyNames$1 = objectGetOwnPropertyNamesExternal.f;
var FAILS_ON_PRIMITIVES$3 = fails(function () {
  return !getOwnPropertyNames$2(1);
}); // `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames

_export({
  target: 'Object',
  stat: true,
  forced: FAILS_ON_PRIMITIVES$3
}, {
  getOwnPropertyNames: nativeGetOwnPropertyNames$1
});

var Object$2 = path.Object;

var getOwnPropertyNames = function getOwnPropertyNames(it) {
  return Object$2.getOwnPropertyNames(it);
};

var getOwnPropertyNames$1 = getOwnPropertyNames;

var getOwnPropertyNames$2 = getOwnPropertyNames$1;

var hiddenKeys$1 = concat$2(enumBugKeys).call(enumBugKeys, 'length', 'prototype'); // `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames


var f$4 = getOwnPropertyNames$2 || function getOwnPropertyNames(O) {
  return objectKeysInternal(O, hiddenKeys$1);
};

var objectGetOwnPropertyNames = {
  f: f$4
};

var getOwnPropertySymbols = path.Object.getOwnPropertySymbols;

var getOwnPropertySymbols$1 = getOwnPropertySymbols;

var getOwnPropertySymbols$2 = getOwnPropertySymbols$1;

var f$5 = getOwnPropertySymbols$2;
var objectGetOwnPropertySymbols = {
  f: f$5
};

var $forEach$1 = forEach$2(arrayIteration);

var HIDDEN = sharedKey('hidden');
var SYMBOL = 'Symbol';
var PROTOTYPE$1 = 'prototype';
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
var setInternalState$1 = internalState.set;
var getInternalState$1 = internalState.getterFor(SYMBOL);
var ObjectPrototype$1 = Object[PROTOTYPE$1];
var $Symbol = global_1.Symbol;
var JSON$1 = global_1.JSON;
var nativeJSONStringify = JSON$1 && JSON$1.stringify;
var nativeGetOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;
var nativeDefineProperty$1 = objectDefineProperty.f;
var nativeGetOwnPropertyNames$2 = objectGetOwnPropertyNamesExternal.f;
var nativePropertyIsEnumerable$1 = objectPropertyIsEnumerable.f;
var AllSymbols = shared('symbols');
var ObjectPrototypeSymbols = shared('op-symbols');
var StringToSymbolRegistry = shared('string-to-symbol-registry');
var SymbolToStringRegistry = shared('symbol-to-string-registry');
var WellKnownSymbolsStore = shared('wks');
var QObject = global_1.QObject; // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173

var USE_SETTER = !QObject || !QObject[PROTOTYPE$1] || !QObject[PROTOTYPE$1].findChild; // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687

var setSymbolDescriptor = descriptors && fails(function () {
  return objectCreate(nativeDefineProperty$1({}, 'a', {
    get: function get() {
      return nativeDefineProperty$1(this, 'a', {
        value: 7
      }).a;
    }
  })).a != 7;
}) ? function (O, P, Attributes) {
  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor$2(ObjectPrototype$1, P);
  if (ObjectPrototypeDescriptor) delete ObjectPrototype$1[P];
  nativeDefineProperty$1(O, P, Attributes);

  if (ObjectPrototypeDescriptor && O !== ObjectPrototype$1) {
    nativeDefineProperty$1(ObjectPrototype$1, P, ObjectPrototypeDescriptor);
  }
} : nativeDefineProperty$1;

var wrap = function wrap(tag, description) {
  var symbol = AllSymbols[tag] = objectCreate($Symbol[PROTOTYPE$1]);
  setInternalState$1(symbol, {
    type: SYMBOL,
    tag: tag,
    description: description
  });
  if (!descriptors) symbol.description = description;
  return symbol;
};

var isSymbol = nativeSymbol && _typeof_1($Symbol.iterator) == 'symbol' ? function (it) {
  return _typeof_1(it) == 'symbol';
} : function (it) {
  return Object(it) instanceof $Symbol;
};

var $defineProperty = function defineProperty(O, P, Attributes) {
  if (O === ObjectPrototype$1) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
  anObject(O);
  var key = toPrimitive(P, true);
  anObject(Attributes);

  if (has(AllSymbols, key)) {
    if (!Attributes.enumerable) {
      if (!has(O, HIDDEN)) nativeDefineProperty$1(O, HIDDEN, createPropertyDescriptor(1, {}));
      O[HIDDEN][key] = true;
    } else {
      if (has(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
      Attributes = objectCreate(Attributes, {
        enumerable: createPropertyDescriptor(0, false)
      });
    }

    return setSymbolDescriptor(O, key, Attributes);
  }

  return nativeDefineProperty$1(O, key, Attributes);
};

var $defineProperties = function defineProperties(O, Properties) {
  var _context;

  anObject(O);
  var properties = toIndexedObject(Properties);

  var keys = concat$2(_context = objectKeys(properties)).call(_context, $getOwnPropertySymbols(properties));
  return O;
};

var $create = function create(O, Properties) {
  return Properties === undefined ? objectCreate(O) : $defineProperties(objectCreate(O), Properties);
};

var $propertyIsEnumerable = function propertyIsEnumerable(V) {
  var P = toPrimitive(V, true);
  var enumerable = nativePropertyIsEnumerable$1.call(this, P);
  if (this === ObjectPrototype$1 && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) return false;
  return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
};

var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
  var it = toIndexedObject(O);
  var key = toPrimitive(P, true);
  if (it === ObjectPrototype$1 && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
  var descriptor = nativeGetOwnPropertyDescriptor$2(it, key);

  if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
    descriptor.enumerable = true;
  }

  return descriptor;
};

var $getOwnPropertyNames = function getOwnPropertyNames(O) {
  var names = nativeGetOwnPropertyNames$2(toIndexedObject(O));
  var result = [];
  return result;
};

var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype$1;
  var names = nativeGetOwnPropertyNames$2(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
  var result = [];
  return result;
}; // `Symbol` constructor
// https://tc39.github.io/ecma262/#sec-symbol-constructor


if (!nativeSymbol) {
  $Symbol = function _Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
    var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
    var tag = uid(description);

    var setter = function setter(value) {
      if (this === ObjectPrototype$1) setter.call(ObjectPrototypeSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
    };

    if (descriptors && USE_SETTER) setSymbolDescriptor(ObjectPrototype$1, tag, {
      configurable: true,
      set: setter
    });
    return wrap(tag, description);
  };

  redefine($Symbol[PROTOTYPE$1], 'toString', function toString() {
    return getInternalState$1(this).tag;
  });
  objectPropertyIsEnumerable.f = $propertyIsEnumerable;
  objectDefineProperty.f = $defineProperty;
  objectGetOwnPropertyDescriptor.f = $getOwnPropertyDescriptor;
  objectGetOwnPropertyNames.f = objectGetOwnPropertyNamesExternal.f = $getOwnPropertyNames;
  objectGetOwnPropertySymbols.f = $getOwnPropertySymbols;

  if (descriptors) {
    // https://github.com/tc39/proposal-Symbol-description
    nativeDefineProperty$1($Symbol[PROTOTYPE$1], 'description', {
      configurable: true,
      get: function description() {
        return getInternalState$1(this).description;
      }
    });
  }

  wrappedWellKnownSymbol.f = function (name) {
    return wrap(wellKnownSymbol(name), name);
  };
}

_export({
  global: true,
  wrap: true,
  forced: !nativeSymbol,
  sham: !nativeSymbol
}, {
  Symbol: $Symbol
});
$forEach$1(objectKeys(WellKnownSymbolsStore), function (name) {
  defineWellKnownSymbol(name);
});
_export({
  target: SYMBOL,
  stat: true,
  forced: !nativeSymbol
}, {
  // `Symbol.for` method
  // https://tc39.github.io/ecma262/#sec-symbol.for
  'for': function _for(key) {
    var string = String(key);
    if (has(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
    var symbol = $Symbol(string);
    StringToSymbolRegistry[string] = symbol;
    SymbolToStringRegistry[symbol] = string;
    return symbol;
  },
  // `Symbol.keyFor` method
  // https://tc39.github.io/ecma262/#sec-symbol.keyfor
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
    if (has(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
  },
  useSetter: function useSetter() {
    USE_SETTER = true;
  },
  useSimple: function useSimple() {
    USE_SETTER = false;
  }
});
_export({
  target: 'Object',
  stat: true,
  forced: !nativeSymbol,
  sham: !descriptors
}, {
  // `Object.create` method
  // https://tc39.github.io/ecma262/#sec-object.create
  create: $create,
  // `Object.defineProperty` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperty
  defineProperty: $defineProperty,
  // `Object.defineProperties` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperties
  defineProperties: $defineProperties,
  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
});
_export({
  target: 'Object',
  stat: true,
  forced: !nativeSymbol
}, {
  // `Object.getOwnPropertyNames` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
  getOwnPropertyNames: $getOwnPropertyNames,
  // `Object.getOwnPropertySymbols` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertysymbols
  getOwnPropertySymbols: $getOwnPropertySymbols
}); // Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443

_export({
  target: 'Object',
  stat: true,
  forced: fails(function () {
    objectGetOwnPropertySymbols.f(1);
  })
}, {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return objectGetOwnPropertySymbols.f(toObject(it));
  }
}); // `JSON.stringify` method behavior with symbols
// https://tc39.github.io/ecma262/#sec-json.stringify

JSON$1 && _export({
  target: 'JSON',
  stat: true,
  forced: !nativeSymbol || fails(function () {
    var symbol = $Symbol(); // MS Edge converts symbol values to JSON as {}

    return nativeJSONStringify([symbol]) != '[null]' // WebKit converts symbol values to JSON as null
    || nativeJSONStringify({
      a: symbol
    }) != '{}' // V8 throws on boxed symbols
    || nativeJSONStringify(Object(symbol)) != '{}';
  })
}, {
  stringify: function stringify(it) {
    var args = [it];
    var index = 1;
    var replacer, $replacer;

    while (arguments.length > index) {
      args.push(arguments[index++]);
    }

    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined

    if (!isArray$3(replacer)) replacer = function replacer(key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return nativeJSONStringify.apply(JSON$1, args);
  }
}); // `Symbol.prototype[@@toPrimitive]` method
// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@toprimitive

if (!$Symbol[PROTOTYPE$1][TO_PRIMITIVE]) hide($Symbol[PROTOTYPE$1], TO_PRIMITIVE, $Symbol[PROTOTYPE$1].valueOf); // `Symbol.prototype[@@toStringTag]` property
// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@tostringtag

setToStringTag($Symbol, SYMBOL);
hiddenKeys[HIDDEN] = true;

// https://tc39.github.io/ecma262/#sec-symbol.asynciterator

defineWellKnownSymbol('asyncIterator');

// https://tc39.github.io/ecma262/#sec-symbol.hasinstance

defineWellKnownSymbol('hasInstance');

// https://tc39.github.io/ecma262/#sec-symbol.isconcatspreadable

defineWellKnownSymbol('isConcatSpreadable');

// https://tc39.github.io/ecma262/#sec-symbol.match

defineWellKnownSymbol('match');

defineWellKnownSymbol('matchAll');

// https://tc39.github.io/ecma262/#sec-symbol.replace

defineWellKnownSymbol('replace');

// https://tc39.github.io/ecma262/#sec-symbol.search

defineWellKnownSymbol('search');

// https://tc39.github.io/ecma262/#sec-symbol.species

defineWellKnownSymbol('species');

// https://tc39.github.io/ecma262/#sec-symbol.split

defineWellKnownSymbol('split');

// https://tc39.github.io/ecma262/#sec-symbol.toprimitive

defineWellKnownSymbol('toPrimitive');

// https://tc39.github.io/ecma262/#sec-symbol.tostringtag

defineWellKnownSymbol('toStringTag');

// https://tc39.github.io/ecma262/#sec-symbol.unscopables

defineWellKnownSymbol('unscopables');

// https://tc39.github.io/ecma262/#sec-math-@@tostringtag

setToStringTag(Math, 'Math', true);

// https://tc39.github.io/ecma262/#sec-json-@@tostringtag

setToStringTag(global_1.JSON, 'JSON', true);

var symbol = path.Symbol;

var symbol$1 = symbol;

var symbol$2 = symbol$1;

var nativeSymbol = !!getOwnPropertySymbols$2 && !fails(function () {
  // Chrome 38 Symbol has incorrect toString conversion
  // eslint-disable-next-line no-undef
  return !String(symbol$2());
});

var _Symbol = global_1.Symbol;
var store$1 = shared('wks');

var wellKnownSymbol = function wellKnownSymbol(name) {
  return store$1[name] || (store$1[name] = nativeSymbol && _Symbol[name] || (nativeSymbol ? _Symbol : uid)('Symbol.' + name));
};

var f$6 = wellKnownSymbol;
var wrappedWellKnownSymbol = {
  f: f$6
};

var defineProperty$1 = objectDefineProperty.f;

var defineWellKnownSymbol = function defineWellKnownSymbol(NAME) {
  var _Symbol = path.Symbol || (path.Symbol = {});

  if (!has(_Symbol, NAME)) defineProperty$1(_Symbol, NAME, {
    value: wrappedWellKnownSymbol.f(NAME)
  });
};

// https://tc39.github.io/ecma262/#sec-symbol.iterator

defineWellKnownSymbol('iterator');

var createMethod$2 = function createMethod(CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible($this));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF ? CONVERT_TO_STRING ? S.charAt(position) : first : CONVERT_TO_STRING ? slice$2(S).call(S, position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

var stringMultibyte = {
  // `String.prototype.codePointAt` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod$2(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod$2(true)
};

var charAt = stringMultibyte.charAt;
var STRING_ITERATOR = 'String Iterator';
var setInternalState$2 = internalState.set;
var getInternalState$2 = internalState.getterFor(STRING_ITERATOR); // `String.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator

defineIterator(String, 'String', function (iterated) {
  setInternalState$2(this, {
    type: STRING_ITERATOR,
    string: String(iterated),
    index: 0
  }); // `%StringIteratorPrototype%.next` method
  // https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState$2(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return {
    value: undefined,
    done: true
  };
  point = charAt(string, index);
  state.index += point.length;
  return {
    value: point,
    done: false
  };
});

var iterator = wrappedWellKnownSymbol.f('iterator');

var iterator$1 = iterator;

var iterator$2 = iterator$1;

// https://github.com/tc39/proposal-using-statement

defineWellKnownSymbol('asyncDispose');

// https://github.com/tc39/proposal-using-statement

defineWellKnownSymbol('dispose');

// https://github.com/tc39/proposal-observable

defineWellKnownSymbol('observable');

// https://github.com/tc39/proposal-pattern-matching

defineWellKnownSymbol('patternMatch');

// https://tc39.github.io/proposal-string-replaceall/

defineWellKnownSymbol('replaceAll');

var symbol$3 = symbol;

var symbol$4 = symbol$3;

var _typeof_1 = createCommonjsModule(function (module) {
  function _typeof2(obj) {
    if (typeof symbol$4 === "function" && _typeof_1(iterator$2) === "symbol") {
      _typeof2 = function _typeof2(obj) {
        return _typeof_1(obj);
      };
    } else {
      _typeof2 = function _typeof2(obj) {
        return obj && typeof symbol$4 === "function" && obj.constructor === symbol$4 && obj !== symbol$4.prototype ? "symbol" : _typeof_1(obj);
      };
    }

    return _typeof2(obj);
  }

  function _typeof(obj) {
    if (typeof symbol$4 === "function" && _typeof2(iterator$2) === "symbol") {
      module.exports = _typeof = function _typeof(obj) {
        return _typeof2(obj);
      };
    } else {
      module.exports = _typeof = function _typeof(obj) {
        return obj && typeof symbol$4 === "function" && obj.constructor === symbol$4 && obj !== symbol$4.prototype ? "symbol" : _typeof2(obj);
      };
    }

    return _typeof(obj);
  }

  module.exports = _typeof;
});

var isObject = function isObject(it) {
  return _typeof_1(it) === 'object' ? it !== null : typeof it === 'function';
};

var createProperty = function createProperty(object, key, value) {
  var propertyKey = toPrimitive(key);
  if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));else object[propertyKey] = value;
};

var SPECIES$2 = wellKnownSymbol('species');

var nativeSlice = slice$2([]);

var max$1 = Math.max; // `Array.prototype.slice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects

_export({
  target: 'Array',
  proto: true,
  forced: !arrayMethodHasSpeciesSupport('slice')
}, {
  slice: function slice(start, end) {
    var O = toIndexedObject(this);
    var length = toLength(O.length);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length); // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible

    var Constructor, result, n;

    if (isArray$3(O)) {
      Constructor = O.constructor; // cross-realm fallback

      if (typeof Constructor == 'function' && (Constructor === Array || isArray$3(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject(Constructor)) {
        Constructor = Constructor[SPECIES$2];
        if (Constructor === null) Constructor = undefined;
      }

      if (Constructor === Array || Constructor === undefined) {
        return nativeSlice.call(O, k, fin);
      }
    }

    result = new (Constructor === undefined ? Array : Constructor)(max$1(fin - k, 0));

    for (n = 0; k < fin; k++, n++) {
      if (k in O) createProperty(result, n, O[k]);
    }

    result.length = n;
    return result;
  }
});

var slice = slice$2(entryVirtual('Array'));

var ArrayPrototype$b = Array.prototype;

var slice_1 = function slice_1(it) {
  var own = slice$2(it);

  return it === ArrayPrototype$b || it instanceof Array && own === slice$2(ArrayPrototype$b) ? slice : own;
};

var slice$1 = slice_1;

var slice$2 = slice$1;

var toString$1 = {}.toString;

var classofRaw = function classofRaw(it) {
  var _context;

  return slice$2(_context = toString$1.call(it)).call(_context, 8, -1);
};

// https://tc39.github.io/ecma262/#sec-isarray

var isArray$3 = isArray$2 || function isArray(arg) {
  return classofRaw(arg) == 'Array';
};

var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';
var IS_CONCAT_SPREADABLE_SUPPORT = !fails(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return concat$2(array).call(array)[0] !== array;
});
var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

var isConcatSpreadable = function isConcatSpreadable(O) {
  if (!isObject(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray$3(O);
};

var FORCED$1 = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT; // `Array.prototype.concat` method
// https://tc39.github.io/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species

_export({
  target: 'Array',
  proto: true,
  forced: FORCED$1
}, {
  concat: function concat(arg) {
    // eslint-disable-line no-unused-vars
    var O = toObject(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;

    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];

      if (isConcatSpreadable(E)) {
        len = toLength(E.length);
        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);

        for (k = 0; k < len; k++, n++) {
          if (k in E) createProperty(A, n, E[k]);
        }
      } else {
        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        createProperty(A, n++, E);
      }
    }

    A.length = n;
    return A;
  }
});

var concat = concat$2(entryVirtual('Array'));

var ArrayPrototype$c = Array.prototype;

var concat_1 = function concat_1(it) {
  var own = concat$2(it);

  return it === ArrayPrototype$c || it instanceof Array && own === concat$2(ArrayPrototype$c) ? concat : own;
};

var concat$1 = concat_1;

var concat$2 = concat$1;

var slice$3 = slice$2([]);

var factories = {};

var construct = function construct(C, argsLength, args) {
  if (!(argsLength in factories)) {
    for (var list = [], i = 0; i < argsLength; i++) {
      list[i] = 'a[' + i + ']';
    } // eslint-disable-next-line no-new-func


    factories[argsLength] = Function('C,a', 'return new C(' + list.join(',') + ')');
  }

  return factories[argsLength](C, args);
}; // `Function.prototype.bind` method implementation
// https://tc39.github.io/ecma262/#sec-function.prototype.bind


var functionBind = bind$2(Function) || function bind(that
/* , ...args */
) {
  var fn = aFunction$1(this);
  var partArgs = slice$3.call(arguments, 1);

  var boundFunction = function bound()
  /* args... */
  {
    var args = concat$2(partArgs).call(partArgs, slice$3.call(arguments));

    return this instanceof boundFunction ? construct(fn, args.length, args) : fn.apply(that, args);
  };

  if (isObject(fn.prototype)) boundFunction.prototype = fn.prototype;
  return boundFunction;
};

// https://tc39.github.io/ecma262/#sec-function.prototype.bind

_export({
  target: 'Function',
  proto: true
}, {
  bind: functionBind
});

var bind = bind$2(entryVirtual('Function'));

var FunctionPrototype = Function.prototype;

var bind_1 = function bind_1(it) {
  var own = bind$2(it);

  return it === FunctionPrototype || it instanceof Function && own === bind$2(FunctionPrototype) ? bind : own;
};

var bind$1 = bind_1;

var bind$2 = bind$1;

var replacement = /#|\.prototype\./;

var isForced = function isForced(feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true : value == NATIVE ? false : typeof detection == 'function' ? fails(detection) : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';
var isForced_1 = isForced;

var getOwnPropertyDescriptor$3 = objectGetOwnPropertyDescriptor.f;

var wrapConstructor = function wrapConstructor(NativeConstructor) {
  var Wrapper = function Wrapper(a, b, c) {
    if (this instanceof NativeConstructor) {
      switch (arguments.length) {
        case 0:
          return new NativeConstructor();

        case 1:
          return new NativeConstructor(a);

        case 2:
          return new NativeConstructor(a, b);
      }

      return new NativeConstructor(a, b, c);
    }

    return NativeConstructor.apply(this, arguments);
  };

  Wrapper.prototype = NativeConstructor.prototype;
  return Wrapper;
};
/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/


var _export = function _export(options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var PROTO = options.proto;
  var nativeSource = GLOBAL ? global_1 : STATIC ? global_1[TARGET] : (global_1[TARGET] || {}).prototype;
  var target = GLOBAL ? path : path[TARGET] || (path[TARGET] = {});
  var targetPrototype = target.prototype;
  var FORCED, USE_NATIVE, VIRTUAL_PROTOTYPE;
  var key, sourceProperty, targetProperty, nativeProperty, resultProperty, descriptor;

  for (key in source) {
    FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced); // contains in native

    USE_NATIVE = !FORCED && nativeSource && has(nativeSource, key);
    targetProperty = target[key];
    if (USE_NATIVE) if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor$3(nativeSource, key);
      nativeProperty = descriptor && descriptor.value;
    } else nativeProperty = nativeSource[key]; // export native or implementation

    sourceProperty = USE_NATIVE && nativeProperty ? nativeProperty : source[key];
    if (USE_NATIVE && _typeof_1(targetProperty) === _typeof_1(sourceProperty)) continue; // bind timers to global for call from export context

    if (bind$2(options) && USE_NATIVE) resultProperty = bindContext(sourceProperty, global_1); // wrap global constructors for prevent changs in this version
    else if (options.wrap && USE_NATIVE) resultProperty = wrapConstructor(sourceProperty); // make static versions for prototype methods
      else if (PROTO && typeof sourceProperty == 'function') resultProperty = bindContext(Function.call, sourceProperty); // default case
        else resultProperty = sourceProperty; // add a flag to not completely full polyfills

    if (options.sham || sourceProperty && sourceProperty.sham || targetProperty && targetProperty.sham) {
      hide(resultProperty, 'sham', true);
    }

    target[key] = resultProperty;

    if (PROTO) {
      VIRTUAL_PROTOTYPE = TARGET + 'Prototype';
      if (!has(path, VIRTUAL_PROTOTYPE)) hide(path, VIRTUAL_PROTOTYPE, {}); // export virtual prototype methods

      path[VIRTUAL_PROTOTYPE][key] = sourceProperty; // export real prototype methods

      if (options.real && targetPrototype && !targetPrototype[key]) hide(targetPrototype, key, sourceProperty);
    }
  }
};

// https://tc39.github.io/ecma262/#sec-object.defineproperty

_export({
  target: 'Object',
  stat: true,
  forced: !descriptors,
  sham: !descriptors
}, {
  defineProperty: objectDefineProperty.f
});

var defineProperty_1 = createCommonjsModule(function (module) {
  var Object = path.Object;

  var defineProperty = module.exports = function defineProperty(it, key, desc) {
    return Object.defineProperty(it, key, desc);
  };

  if (Object.defineProperty.sham) defineProperty.sham = true;
});

var defineProperty$2 = defineProperty_1;

var defineProperty$3 = defineProperty$2;

var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = objectGetOwnPropertyNames.f(anObject(it));
  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
  return getOwnPropertySymbols ? concat$2(keys).call(keys, getOwnPropertySymbols(it)) : keys;
};

// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors

_export({
  target: 'Object',
  stat: true,
  sham: !descriptors
}, {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIndexedObject(object);
    var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
    var keys = ownKeys(O);
    var result = {};
    var index = 0;
    var key, descriptor;

    while (keys.length > index) {
      descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
      if (descriptor !== undefined) createProperty(result, key, descriptor);
    }

    return result;
  }
});

var getOwnPropertyDescriptors = path.Object.getOwnPropertyDescriptors;

var getOwnPropertyDescriptors$1 = getOwnPropertyDescriptors;

var getOwnPropertyDescriptors$2 = getOwnPropertyDescriptors$1;

var defineProperty$4 = defineProperty_1;

var defineProperty$5 = defineProperty$4;

function _defineProperty(obj, key, value) {
  if (key in obj) {
    defineProperty$5(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var defineProperty$6 = _defineProperty;

var indexOf$4 = indexOf_1;

var indexOf$5 = indexOf$4;

var getOwnPropertySymbols$3 = getOwnPropertySymbols;

var getOwnPropertySymbols$4 = getOwnPropertySymbols$3;

var keys$7 = keys$4;

var keys$8 = keys$7;

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};

  var sourceKeys = keys$8(source);

  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (indexOf$5(excluded).call(excluded, key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var objectWithoutPropertiesLoose = _objectWithoutPropertiesLoose;

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = objectWithoutPropertiesLoose(source, excluded);
  var key, i;

  if (getOwnPropertySymbols$4) {
    var sourceSymbolKeys = getOwnPropertySymbols$4(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (indexOf$5(excluded).call(excluded, key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

var objectWithoutProperties = _objectWithoutProperties;

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var classCallCheck = _classCallCheck;

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;

    defineProperty$5(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var createClass = _createClass;

// a string of all valid unicode whitespaces
// eslint-disable-next-line max-len
var whitespaces = "\t\n\x0B\f\r \xA0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF";

var whitespace = '[' + whitespaces + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$'); // `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation

var createMethod$3 = function createMethod(TYPE) {
  return function ($this) {
    var string = String(requireObjectCoercible($this));
    if (TYPE & 1) string = string.replace(ltrim, '');
    if (TYPE & 2) string = string.replace(rtrim, '');
    return string;
  };
};

var stringTrim = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimstart
  start: createMethod$3(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
  end: createMethod$3(2),
  // `String.prototype.trim` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.trim
  trim: createMethod$3(3)
};

var non = "\u200B\x85\u180E"; // check that a method works with the correct list
// of whitespaces and has a correct name

var forcedStringTrimMethod = function forcedStringTrimMethod(METHOD_NAME) {
  return fails(function () {
    return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() != non || whitespaces[METHOD_NAME].name !== METHOD_NAME;
  });
};

var $trim = trim$2(stringTrim); // `String.prototype.trim` method
// https://tc39.github.io/ecma262/#sec-string.prototype.trim


_export({
  target: 'String',
  proto: true,
  forced: forcedStringTrimMethod('trim')
}, {
  trim: function trim() {
    return $trim(this);
  }
});

var trim = trim$2(entryVirtual('String'));

var StringPrototype$1 = String.prototype;

var trim_1 = function trim_1(it) {
  var own = trim$2(it);

  return typeof it === 'string' || it === StringPrototype$1 || it instanceof String && own === trim$2(StringPrototype$1) ? trim : own;
};

var trim$1 = trim_1;

var trim$2 = trim$1;

var trim$3 = trim$2(stringTrim);

var nativeParseFloat = global_1.parseFloat;
var FORCED$2 = 1 / nativeParseFloat(whitespaces + '-0') !== -Infinity; // `parseFloat` method
// https://tc39.github.io/ecma262/#sec-parsefloat-string

var _parseFloat = FORCED$2 ? function parseFloat(string) {
  var trimmedString = trim$3(String(string));
  var result = nativeParseFloat(trimmedString);
  return result === 0 && trimmedString.charAt(0) == '-' ? -0 : result;
} : nativeParseFloat;

// https://tc39.github.io/ecma262/#sec-parsefloat-string

_export({
  global: true,
  forced: _parseFloat$3 != _parseFloat
}, {
  parseFloat: _parseFloat
});

var _parseFloat$1 = path.parseFloat;

var _parseFloat$2 = _parseFloat$1;

var _parseFloat$3 = _parseFloat$2;

var stackframe = createCommonjsModule(function (module, exports) {
  (function (root, factory) {

    /* istanbul ignore next */

    {
      module.exports = factory();
    }
  })(commonjsGlobal, function () {

    function _isNumber(n) {
      return !isNaN(_parseFloat$3(n)) && isFinite(n);
    }

    function StackFrame(functionName, args, fileName, lineNumber, columnNumber, source) {
      if (functionName !== undefined) {
        this.setFunctionName(functionName);
      }

      if (args !== undefined) {
        this.setArgs(args);
      }

      if (fileName !== undefined) {
        this.setFileName(fileName);
      }

      if (lineNumber !== undefined) {
        this.setLineNumber(lineNumber);
      }

      if (columnNumber !== undefined) {
        this.setColumnNumber(columnNumber);
      }

      if (source !== undefined) {
        this.setSource(source);
      }
    }

    StackFrame.prototype = {
      getFunctionName: function getFunctionName() {
        return this.functionName;
      },
      setFunctionName: function setFunctionName(v) {
        this.functionName = String(v);
      },
      getArgs: function getArgs() {
        return this.args;
      },
      setArgs: function setArgs(v) {
        if (Object.prototype.toString.call(v) !== '[object Array]') {
          throw new TypeError('Args must be an Array');
        }

        this.args = v;
      },
      // NOTE: Property name may be misleading as it includes the path,
      // but it somewhat mirrors V8's JavaScriptStackTraceApi
      // https://code.google.com/p/v8/wiki/JavaScriptStackTraceApi and Gecko's
      // http://mxr.mozilla.org/mozilla-central/source/xpcom/base/nsIException.idl#14
      getFileName: function getFileName() {
        return this.fileName;
      },
      setFileName: function setFileName(v) {
        this.fileName = String(v);
      },
      getLineNumber: function getLineNumber() {
        return this.lineNumber;
      },
      setLineNumber: function setLineNumber(v) {
        if (!_isNumber(v)) {
          throw new TypeError('Line Number must be a Number');
        }

        this.lineNumber = Number(v);
      },
      getColumnNumber: function getColumnNumber() {
        return this.columnNumber;
      },
      setColumnNumber: function setColumnNumber(v) {
        if (!_isNumber(v)) {
          throw new TypeError('Column Number must be a Number');
        }

        this.columnNumber = Number(v);
      },
      getSource: function getSource() {
        return this.source;
      },
      setSource: function setSource(v) {
        this.source = String(v);
      },
      toString: function toString() {
        var functionName = this.getFunctionName() || '{anonymous}';
        var args = '(' + (this.getArgs() || []).join(',') + ')';
        var fileName = this.getFileName() ? '@' + this.getFileName() : '';
        var lineNumber = _isNumber(this.getLineNumber()) ? ':' + this.getLineNumber() : '';
        var columnNumber = _isNumber(this.getColumnNumber()) ? ':' + this.getColumnNumber() : '';
        return functionName + args + fileName + lineNumber + columnNumber;
      }
    };
    return StackFrame;
  });
});

var errorStackParser = createCommonjsModule(function (module, exports) {
  (function (root, factory) {

    /* istanbul ignore next */

    {
      module.exports = factory(stackframe);
    }
  })(commonjsGlobal, function ErrorStackParser(StackFrame) {

    var FIREFOX_SAFARI_STACK_REGEXP = /(^|@)\S+\:\d+/;
    var CHROME_IE_STACK_REGEXP = /^\s*at .*(\S+\:\d+|\(native\))/m;
    var SAFARI_NATIVE_CODE_REGEXP = /^(eval@)?(\[native code\])?$/;

    function _map(array, fn, thisArg) {
      if (typeof map$2(Array.prototype) === 'function') {
        return map$2(array).call(array, fn, thisArg);
      } else {
        var output = new Array(array.length);

        for (var i = 0; i < array.length; i++) {
          output[i] = fn.call(thisArg, array[i]);
        }

        return output;
      }
    }

    function _filter(array, fn, thisArg) {
      if (typeof filter$2(Array.prototype) === 'function') {
        return filter$2(array).call(array, fn, thisArg);
      } else {
        var output = [];

        for (var i = 0; i < array.length; i++) {
          if (fn.call(thisArg, array[i])) {
            output.push(array[i]);
          }
        }

        return output;
      }
    }

    function _indexOf(array, target) {
      if (typeof indexOf$2(Array.prototype) === 'function') {
        return indexOf$2(array).call(array, target);
      } else {
        for (var i = 0; i < array.length; i++) {
          if (array[i] === target) {
            return i;
          }
        }

        return -1;
      }
    }

    return {
      /**
       * Given an Error object, extract the most information from it.
       *
       * @param {Error} error object
       * @return {Array} of StackFrames
       */
      parse: function ErrorStackParser$$parse(error) {
        if (typeof error.stacktrace !== 'undefined' || typeof error['opera#sourceloc'] !== 'undefined') {
          return this.parseOpera(error);
        } else if (error.stack && error.stack.match(CHROME_IE_STACK_REGEXP)) {
          return this.parseV8OrIE(error);
        } else if (error.stack) {
          return this.parseFFOrSafari(error);
        } else {
          throw new Error('Cannot parse given Error object');
        }
      },
      // Separate line and column numbers from a string of the form: (URI:Line:Column)
      extractLocation: function ErrorStackParser$$extractLocation(urlLike) {
        // Fail-fast but return locations like "(native)"
        if (indexOf$2(urlLike).call(urlLike, ':') === -1) {
          return [urlLike];
        }

        var regExp = /(.+?)(?:\:(\d+))?(?:\:(\d+))?$/;
        var parts = regExp.exec(urlLike.replace(/[\(\)]/g, ''));
        return [parts[1], parts[2] || undefined, parts[3] || undefined];
      },
      parseV8OrIE: function ErrorStackParser$$parseV8OrIE(error) {
        var filtered = _filter(error.stack.split('\n'), function (line) {
          return !!line.match(CHROME_IE_STACK_REGEXP);
        }, this);

        return _map(filtered, function (line) {
          var _context;

          if (indexOf$2(line).call(line, '(eval ') > -1) {
            // Throw away eval information until we implement stacktrace.js/stackframe#8
            line = line.replace(/eval code/g, 'eval').replace(/(\(eval at [^\()]*)|(\)\,.*$)/g, '');
          }

          var tokens = slice$2(_context = line.replace(/^\s+/, '').replace(/\(eval code/g, '(').split(/\s+/)).call(_context, 1);

          var locationParts = this.extractLocation(tokens.pop());
          var functionName = tokens.join(' ') || undefined;
          var fileName = _indexOf(['eval', '<anonymous>'], locationParts[0]) > -1 ? undefined : locationParts[0];
          return new StackFrame(functionName, undefined, fileName, locationParts[1], locationParts[2], line);
        }, this);
      },
      parseFFOrSafari: function ErrorStackParser$$parseFFOrSafari(error) {
        var filtered = _filter(error.stack.split('\n'), function (line) {
          return !line.match(SAFARI_NATIVE_CODE_REGEXP);
        }, this);

        return _map(filtered, function (line) {
          // Throw away eval information until we implement stacktrace.js/stackframe#8
          if (indexOf$2(line).call(line, ' > eval') > -1) {
            line = line.replace(/ line (\d+)(?: > eval line \d+)* > eval\:\d+\:\d+/g, ':$1');
          }

          if (indexOf$2(line).call(line, '@') === -1 && indexOf$2(line).call(line, ':') === -1) {
            // Safari eval frames only have function names and nothing else
            return new StackFrame(line);
          } else {
            var tokens = line.split('@');
            var locationParts = this.extractLocation(tokens.pop());
            var functionName = tokens.join('@') || undefined;
            return new StackFrame(functionName, undefined, locationParts[0], locationParts[1], locationParts[2], line);
          }
        }, this);
      },
      parseOpera: function ErrorStackParser$$parseOpera(e) {
        var _context2;

        if (!e.stacktrace || indexOf$2(_context2 = e.message).call(_context2, '\n') > -1 && e.message.split('\n').length > e.stacktrace.split('\n').length) {
          return this.parseOpera9(e);
        } else if (!e.stack) {
          return this.parseOpera10(e);
        } else {
          return this.parseOpera11(e);
        }
      },
      parseOpera9: function ErrorStackParser$$parseOpera9(e) {
        var lineRE = /Line (\d+).*script (?:in )?(\S+)/i;
        var lines = e.message.split('\n');
        var result = [];

        for (var i = 2, len = lines.length; i < len; i += 2) {
          var match = lineRE.exec(lines[i]);

          if (match) {
            result.push(new StackFrame(undefined, undefined, match[2], match[1], undefined, lines[i]));
          }
        }

        return result;
      },
      parseOpera10: function ErrorStackParser$$parseOpera10(e) {
        var lineRE = /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i;
        var lines = e.stacktrace.split('\n');
        var result = [];

        for (var i = 0, len = lines.length; i < len; i += 2) {
          var match = lineRE.exec(lines[i]);

          if (match) {
            result.push(new StackFrame(match[3] || undefined, undefined, match[2], match[1], undefined, lines[i]));
          }
        }

        return result;
      },
      // Opera 10.65+ Error.stack very similar to FF/Safari
      parseOpera11: function ErrorStackParser$$parseOpera11(error) {
        var filtered = _filter(error.stack.split('\n'), function (line) {
          return !!line.match(FIREFOX_SAFARI_STACK_REGEXP) && !line.match(/^Error created at/);
        }, this);

        return _map(filtered, function (line) {
          var tokens = line.split('@');
          var locationParts = this.extractLocation(tokens.pop());
          var functionCall = tokens.shift() || '';
          var functionName = functionCall.replace(/<anonymous function(: (\w+))?>/, '$2').replace(/\([^\)]*\)/g, '') || undefined;
          var argsRaw;

          if (functionCall.match(/\(([^\)]*)\)/)) {
            argsRaw = functionCall.replace(/^[^\(]+\(([^\)]*)\)$/, '$1');
          }

          var args = argsRaw === undefined || argsRaw === '[arguments not available]' ? undefined : argsRaw.split(',');
          return new StackFrame(functionName, args, locationParts[0], locationParts[1], locationParts[2], line);
        }, this);
      }
    };
  });
});

function filePathToFileName(fileUrl) {
  var origin = window.location.origin || window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');

  if (indexOf$2(fileUrl).call(fileUrl, origin) > -1) {
    fileUrl = fileUrl.replace(origin + '/', '');
  }

  return fileUrl;
}

function cleanFilePath() {
  var filePath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  if (filePath === '<anonymous>') {
    filePath = '';
  }

  return filePath;
}

function isFileInline(fileUrl) {
  if (fileUrl) {
    var _context;

    return indexOf$2(_context = window.location.href).call(_context, fileUrl) === 0;
  }

  return false;
}

function normalizeStackFrames(stackFrames) {
  return map$2(stackFrames).call(stackFrames, function (frame) {
    if (frame.functionName) {
      frame.functionName = normalizeFunctionName(frame.functionName);
    }

    return frame;
  });
}

function normalizeFunctionName(fnName) {
  // SpinderMonkey name convetion (https://developer.mozilla.org/en-US/docs/Tools/Debugger-API/Debugger.Object#Accessor_Properties_of_the_Debugger.Object_prototype)
  // We use a/b to refer to the b defined within a
  var parts = fnName.split('/');

  if (parts.length > 1) {
    fnName = ['Object', parts[parts.length - 1]].join('.');
  } else {
    fnName = parts[0];
  } // a< to refer to a function that occurs somewhere within an expression that is assigned to a.


  fnName = fnName.replace(/.<$/gi, '.<anonymous>'); // Normalize IE's 'Anonymous function'

  fnName = fnName.replace(/^Anonymous function$/, '<anonymous>'); // Always use the last part

  parts = fnName.split('.');

  if (parts.length > 1) {
    fnName = parts[parts.length - 1];
  } else {
    fnName = parts[0];
  }

  return fnName;
}

function createStackTraces(errorEvent) {
  var error = errorEvent.error,
      filename = errorEvent.filename,
      lineno = errorEvent.lineno,
      colno = errorEvent.colno;
  var stackTraces = [];

  if (error) {
    try {
      stackTraces = errorStackParser.parse(error);
    } catch (e) {
      /**
       * Ignore library errors from error-stack-parser, since it does not
       * provide any valuable information for the user
       */
    }
  }

  if (stackTraces.length === 0) {
    stackTraces = [{
      fileName: filename,
      lineNumber: lineno,
      columnNumber: colno
    }];
  }

  var normalizedStackTraces = normalizeStackFrames(stackTraces);
  return map$2(normalizedStackTraces).call(normalizedStackTraces, function (stack) {
    var fileName = stack.fileName,
        lineNumber = stack.lineNumber,
        columnNumber = stack.columnNumber,
        _stack$functionName = stack.functionName,
        functionName = _stack$functionName === void 0 ? '<anonymous>' : _stack$functionName;

    if (!fileName && !lineNumber) {
      return {};
    }

    if (!columnNumber && !lineNumber) {
      return {};
    }

    var filePath = cleanFilePath(fileName);
    var cleanedFileName = filePathToFileName(filePath);

    if (isFileInline(filePath)) {
      cleanedFileName = '(inline script)';
    }

    return {
      abs_path: fileName,
      filename: cleanedFileName,
      function: functionName,
      lineno: lineNumber,
      colno: columnNumber
    };
  });
}
function filterInvalidFrames(frames) {
  return filter$2(frames).call(frames, function (_ref) {
    var filename = _ref.filename,
        lineno = _ref.lineno;
    return typeof filename !== 'undefined' && typeof lineno !== 'undefined';
  });
}

var $JSON = path.JSON || (path.JSON = {
  stringify: stringify$2
});

var stringify = function stringify(it) {
  // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};

var stringify$1 = stringify;

var stringify$2 = stringify$1;

var rngBrowser = createCommonjsModule(function (module) {
  var _context, _context2;

  // Unique ID creation requires a high quality random # generator.  In the
  // browser this is a little complicated due to unknown quality of Math.random()
  // and inconsistent support for the `crypto` API.  We do the best we can via
  // feature-detection
  // getRandomValues needs to be invoked in a context where "this" is a Crypto
  // implementation. Also, find the complete implementation of crypto on IE11.
  var getRandomValues = typeof crypto != 'undefined' && crypto.getRandomValues && bind$2(_context = crypto.getRandomValues).call(_context, crypto) || typeof msCrypto != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && bind$2(_context2 = msCrypto.getRandomValues).call(_context2, msCrypto);

  if (getRandomValues) {
    // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
    var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

    module.exports = function whatwgRNG() {
      getRandomValues(rnds8);
      return rnds8;
    };
  } else {
    // Math.random()-based (RNG)
    //
    // If all else fails, use Math.random().  It's fast, but is of unspecified
    // quality.
    var rnds = new Array(16);

    module.exports = function mathRNG() {
      for (var i = 0, r; i < 16; i++) {
        if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
        rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
      }

      return rnds;
    };
  }
});

var slice$4 = slice$2([]);

function isCORSSupported() {
  var xhr = new window.XMLHttpRequest();
  return 'withCredentials' in xhr;
}

var byteToHex = [];

for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToHex(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex; // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4

  return [bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]]].join('');
}

function getDtHeaderValue(span) {
  var dtVersion = '00';
  var dtUnSampledFlags = '00'; // 00000001 ->  '01' -> recorded

  var dtSampledFlags = '01';

  if (span && span.traceId && span.id && span.parentId) {
    var flags = span.sampled ? dtSampledFlags : dtUnSampledFlags;
    /**
     * In the case of unsampled traces, propagate transaction id (parentId)
     * instead of span id to the downstream
     */

    var id = span.sampled ? span.id : span.parentId;
    return dtVersion + '-' + span.traceId + '-' + id + '-' + flags;
  }
}

function parseDtHeaderValue(value) {
  var parsed = /^([\da-f]{2})-([\da-f]{32})-([\da-f]{16})-([\da-f]{2})$/.exec(value);

  if (parsed) {
    var flags = parsed[4];
    var sampled = flags !== '00';
    return {
      traceId: parsed[2],
      id: parsed[3],
      sampled: sampled
    };
  }
}

function isDtHeaderValid(header) {
  return /^[\da-f]{2}-[\da-f]{32}-[\da-f]{16}-[\da-f]{2}$/.test(header) && slice$2(header).call(header, 3, 35) !== '00000000000000000000000000000000' && slice$2(header).call(header, 36, 52) !== '0000000000000000';
}

function checkSameOrigin(source, target) {
  var isSame = false;

  if (typeof target === 'string') {
    isSame = source === target;
  } else if (isArray$2(target)) {
    forEach$2(target).call(target, function (t) {
      if (!isSame) {
        isSame = checkSameOrigin(source, t);
      }
    });
  }

  return isSame;
}

function generateRandomId(length) {
  var id = bytesToHex(rngBrowser());
  return id.substr(0, length);
}

function isPlatformSupported() {
  return typeof window !== 'undefined' && typeof forEach$2(Array.prototype) === 'function' && typeof stringify$2 === 'function' && typeof bind$2(Function) === 'function' && window.performance && typeof window.performance.now === 'function' && isCORSSupported();
}
/**
 * Convert values of the Tag/Label to be string to be compatible
 * with the apm server prior to <6.7 version
 *
 * TODO: Remove string conversion in the next major release since
 * support for boolean and number in the APM server has landed in 6.7
 * https://github.com/elastic/apm-server/pull/1712/
 */


function setLabel(key, value, obj) {
  if (!obj || !key) return;
  var skey = removeInvalidChars(key);

  if (value) {
    value = String(value);
  }

  obj[skey] = value;
  return obj;
}

var navigationTimingKeys = ['fetchStart', 'domainLookupStart', 'domainLookupEnd', 'connectStart', 'connectEnd', 'secureConnectionStart', 'requestStart', 'responseStart', 'responseEnd', 'domLoading', 'domInteractive', 'domContentLoadedEventStart', 'domContentLoadedEventEnd', 'domComplete', 'loadEventStart', 'loadEventEnd'];

function getNavigationTimingMarks() {
  var timing = window.performance.timing;
  var fetchStart = timing.fetchStart;
  var marks = {};

  forEach$2(navigationTimingKeys).call(navigationTimingKeys, function (timingKey) {
    var m = timing[timingKey];

    if (m && m >= fetchStart) {
      marks[timingKey] = m - fetchStart;
    }
  });

  return marks;
}
/**
 * Paint Timing Metrics that is available during page load
 * https://www.w3.org/TR/paint-timing/
 */


function getPaintTimingMarks() {
  var paints = {};
  var perf = window.performance;

  if (perf.getEntriesByType) {
    var entries = perf.getEntriesByType('paint');

    if (entries.length > 0) {
      var timings = perf.timing;
      /**
       * To avoid capturing the unload event handler effect in paint timings
       */

      var unloadDiff = timings.fetchStart - timings.navigationStart;

      for (var i = 0; i < entries.length; i++) {
        var data = entries[i];
        var calcPaintTime = unloadDiff >= 0 ? data.startTime - unloadDiff : data.startTime;
        paints[data.name] = calcPaintTime;
      }
    }
  }

  return paints;
}
/**
 *  Server timing information on Performance resource timing entries
 *  https://www.w3.org/TR/server-timing/
 *  [
 *    {
 *      name: "cdn-cache",
 *      duration: 0,
 *      desciprion: "HIT"
 *    },
 *    {
 *      name: "edge",
 *      duration: 4,
 *      desciption: ''
 *    }
 *  ]
 *  returns "cdn-cache;desc=HIT, edge;dur=4"
 */


function getServerTimingInfo() {
  var serverTimingEntries = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var serverTimingInfo = [];
  var entrySeparator = ', ';
  var valueSeparator = ';';

  for (var _i = 0; _i < serverTimingEntries.length; _i++) {
    var _serverTimingEntries$ = serverTimingEntries[_i],
        name = _serverTimingEntries$.name,
        duration = _serverTimingEntries$.duration,
        description = _serverTimingEntries$.description;
    var timingValue = name;

    if (description) {
      timingValue += valueSeparator + 'desc=' + description;
    }

    if (duration) {
      timingValue += valueSeparator + 'dur=' + duration;
    }

    serverTimingInfo.push(timingValue);
  }

  return serverTimingInfo.join(entrySeparator);
}

function getPageMetadata() {
  return {
    page: {
      referer: document.referrer,
      url: window.location.href
    }
  };
}

function stripQueryStringFromUrl(url) {
  return url && url.split('?')[0];
}

function isObject$1(value) {
  // http://jsperf.com/isobject4
  return value !== null && _typeof_1(value) === 'object';
}

function isFunction(value) {
  return typeof value === 'function';
}

function baseExtend(dst, objs, deep) {
  for (var i = 0, ii = objs.length; i < ii; ++i) {
    var obj = objs[i];
    if (!isObject$1(obj) && !isFunction(obj)) continue;

    var keys = keys$6(obj);

    for (var j = 0, jj = keys.length; j < jj; j++) {
      var key = keys[j];
      var src = obj[key];

      if (deep && isObject$1(src)) {
        if (!isObject$1(dst[key])) dst[key] = isArray$2(src) ? [] : {};
        baseExtend(dst[key], [src], false); // only one level of deep merge
      } else {
        dst[key] = src;
      }
    }
  }

  return dst;
}

function getElasticScript() {
  if (typeof document !== 'undefined') {
    var scripts = document.getElementsByTagName('script');

    for (var i = 0, l = scripts.length; i < l; i++) {
      var _context;

      var sc = scripts[i];

      if (indexOf$2(_context = sc.src).call(_context, 'elastic') > 0) {
        return sc;
      }
    }
  }
}

function getCurrentScript() {
  if (typeof document !== 'undefined') {
    // Source http://www.2ality.com/2014/05/current-script.html
    var currentScript = document.currentScript;

    if (!currentScript) {
      return getElasticScript();
    }

    return currentScript;
  }
}

function extend(dst) {
  return baseExtend(dst, slice$4.call(arguments, 1), false);
}

function merge(dst) {
  return baseExtend(dst, slice$4.call(arguments, 1), true);
}

function isUndefined(obj) {
  return typeof obj === 'undefined';
}

function noop() {}

function removeInvalidChars(key) {
  return key.replace(/[.*"]/g, '_');
}

function getLatestNonXHRSpan(spans) {
  var latestSpan = null;

  for (var _i2 = 0; _i2 < spans.length; _i2++) {
    var _context2;

    var span = spans[_i2];

    if (indexOf$2(_context2 = String(span.type)).call(_context2, 'external') === -1 && (!latestSpan || latestSpan._end < span._end)) {
      latestSpan = span;
    }
  }

  return latestSpan;
}

function getEarliestSpan(spans) {
  var earliestSpan = spans[0];

  for (var _i3 = 1; _i3 < spans.length; _i3++) {
    var span = spans[_i3];

    if (earliestSpan._start > span._start) {
      earliestSpan = span;
    }
  }

  return earliestSpan;
}

function getPageLoadMarks() {
  var marks = getNavigationTimingMarks();
  var paintMarks = getPaintTimingMarks();
  var agent = {
    timeToFirstByte: marks.responseStart,
    domInteractive: marks.domInteractive,
    domComplete: marks.domComplete
  };

  if (paintMarks['first-contentful-paint']) {
    agent.firstContentfulPaint = paintMarks['first-contentful-paint'];
  }

  return {
    navigationTiming: marks,
    agent: agent
  };
}

/**
 * MIT License
 *
 * Copyright (c) 2017-present, Elasticsearch BV
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */

/**
 * Task States
 */
var SCHEDULE = 'schedule';
var INVOKE = 'invoke';
var CLEAR = 'clear';
/**
 * Event listener methods
 */

var ADD_EVENT_LISTENER_STR = 'addEventListener';
var REMOVE_EVENT_LISTENER_STR = 'removeEventListener';
/**
 * Resource Timing initiator types that will be captured as spans
 */

var RESOURCE_INITIATOR_TYPES = ['link', 'css', 'script', 'img', 'xmlhttprequest', 'fetch', 'beacon', 'iframe'];
/**
 * The amount of time it is allowed for a transaction to be reused in another startTransaction
 */

var REUSABILITY_THRESHOLD = 5000;
/**
 * Maximum duration of the span that is used to decide if the span is valid - 300 secs / 5 mins
 */

var MAX_SPAN_DURATION = 5 * 60 * 1000;
/**
 * Transaction & Span - Name & Types
 */

var PAGE_LOAD = 'page-load';
var NAME_UNKNOWN = 'Unknown';
var TYPE_CUSTOM = 'custom';
/**
 * Check only for long tasks that are more than 60ms
 */

var USER_TIMING_THRESHOLD = 60;
/**
 * Others
 */

var KEYWORD_LIMIT = 1024;
/**
 * Events - to be consumed by the users
 */

var TRANSACTION_START = 'transaction:start';
var TRANSACTION_END = 'transaction:end';
/**
 * Internal Events
 */

var CONFIG_CHANGE = 'config:change';
/**
 * Events types that are used to toggle auto instrumentations
 */

var XMLHTTPREQUEST = 'xmlhttprequest';
var FETCH = 'fetch';
var HISTORY = 'history';
var ERROR = 'error';
/**
 * Event modifiers, append these to event names.
 */

var BEFORE_EVENT = ':before';
var AFTER_EVENT = ':after';

/**
 * All models value holds the arrary of form
 * [ limit, required, placeholder]
 *
 * Defaults are represented in the array as true
 * to reduce the bundlesize
 * true -> !0 in the minified code
 */

var METADATA_MODEL = {
  service: {
    name: [KEYWORD_LIMIT, true],
    version: true,
    agent: {
      version: [KEYWORD_LIMIT, true]
    },
    environment: true
  }
};
var RESPONSE_MODEL = {
  '*': true,
  headers: {
    '*': true
  }
};
var CONTEXT_MODEL = {
  user: {
    id: true,
    email: true,
    username: true
  },
  tags: {
    '*': true
  },

  /** Spans */
  http: {
    response: RESPONSE_MODEL
  },

  /** Transactions */
  response: RESPONSE_MODEL
};
var SPAN_MODEL = {
  name: [KEYWORD_LIMIT, true],
  type: [KEYWORD_LIMIT, true],
  id: [KEYWORD_LIMIT, true],
  trace_id: [KEYWORD_LIMIT, true],
  parent_id: [KEYWORD_LIMIT, true],
  transaction_id: [KEYWORD_LIMIT, true],
  subtype: true,
  action: true,
  context: CONTEXT_MODEL
};
var TRANSACTION_MODEL = {
  name: true,
  parent_id: true,
  type: [KEYWORD_LIMIT, true],
  id: [KEYWORD_LIMIT, true],
  trace_id: [KEYWORD_LIMIT, true],
  span_count: {
    started: [KEYWORD_LIMIT, true]
  },
  context: CONTEXT_MODEL
};
var ERROR_MODEL = {
  id: [KEYWORD_LIMIT, true],
  trace_id: true,
  transaction_id: true,
  parent_id: true,
  culprit: true,
  exception: {
    type: true
  },
  transaction: {
    type: true
  },
  context: CONTEXT_MODEL
};

function truncate(value) {
  var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : KEYWORD_LIMIT;
  var required = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var placeholder = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'N/A';

  /*
    The request will fail if we set a string placeholder
    when the apm server expects a number.
    However, if this happens it must be a bug.
  */
  if (required && isEmpty(value)) {
    value = placeholder;
  }

  if (typeof value === 'string') {
    return value.substring(0, limit);
  }

  return value;
}

function isEmpty(value) {
  return value == null || value === '' || typeof value === 'undefined';
}

function replaceValue(target, key, currModel) {
  var value = truncate(target[key], currModel[0], currModel[1]);

  if (isEmpty(value)) {
    delete target[key];
    return;
  }

  target[key] = value;
}

function truncateModel() {
  var model = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var target = arguments.length > 1 ? arguments[1] : undefined;
  var childTarget = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : target;

  var keys = keys$6(model);

  var emptyArr = [];

  var _loop = function _loop(i) {
    var currKey = keys[i];
    var currModel = model[currKey] === true ? emptyArr : model[currKey];

    if (!isArray$2(currModel)) {
      truncateModel(currModel, target, childTarget[currKey]);
    } else {
      /**
       * To avoid traversing the target object, we keep a reference to
       * the current depth inorder to get the value associated with the key
       * and set the truncated value in target object
       *
       * when the key is '*', Apply truncation to all the keys in current level
       */
      if (currKey === '*') {
        var _context;

        forEach$2(_context = keys$6(childTarget)).call(_context, function (key) {
          return replaceValue(childTarget, key, currModel);
        });
      } else {
        replaceValue(childTarget, currKey, currModel);
      }
    }
  };

  for (var i = 0; i < keys.length; i++) {
    _loop(i);
  }

  return target;
}

var ErrorLogging =
/*#__PURE__*/
function () {
  function ErrorLogging(apmServer, configService, transactionService) {
    classCallCheck(this, ErrorLogging);

    this._apmServer = apmServer;
    this._configService = configService;
    this._transactionService = transactionService;
  }
  /**
   * errorEvent = { message, filename, lineno, colno, error }
   */


  createClass(ErrorLogging, [{
    key: "createErrorDataModel",
    value: function createErrorDataModel(errorEvent) {
      var frames = createStackTraces(errorEvent);
      var filteredFrames = filterInvalidFrames(frames); // If filename empty, assume inline script

      var culprit = '(inline script)';
      var lastFrame = filteredFrames[filteredFrames.length - 1];

      if (lastFrame && lastFrame.filename) {
        culprit = lastFrame.filename;
      }

      var message = errorEvent.message || errorEvent.error && errorEvent.error.message;
      var errorType = errorEvent.error ? errorEvent.error.name : '';

      if (!errorType) {
        /**
         * Try to extract type from message formatted like
         * 'ReferenceError: Can't find variable: initHighlighting'
         */
        if (message && indexOf$2(message).call(message, ':') > -1) {
          errorType = message.split(':')[0];
        }
      }

      var configContext = this._configService.get('context');

      var errorContext;

      if (_typeof_1(errorEvent.error) === 'object') {
        errorContext = this._getErrorProperties(errorEvent.error);
      }

      var browserMetadata = getPageMetadata();
      var context = merge({}, browserMetadata, configContext, errorContext);
      var errorObject = {
        id: generateRandomId(),
        culprit: culprit,
        exception: {
          message: message,
          stacktrace: filteredFrames,
          type: errorType
        },
        context: context
      };

      var currentTransaction = this._transactionService.getCurrentTransaction();

      if (currentTransaction) {
        errorObject.trace_id = currentTransaction.traceId;
        errorObject.parent_id = currentTransaction.id;
        errorObject.transaction_id = currentTransaction.id;
        errorObject.transaction = {
          type: currentTransaction.type,
          sampled: currentTransaction.sampled
        };
      }

      return truncateModel(ERROR_MODEL, errorObject);
    }
  }, {
    key: "logErrorEvent",
    value: function logErrorEvent(errorEvent, sendImmediately) {
      if (typeof errorEvent === 'undefined') {
        return;
      }

      var errorObject = this.createErrorDataModel(errorEvent);

      if (typeof errorObject.exception.message === 'undefined') {
        return;
      }

      if (sendImmediately) {
        return this._apmServer.sendErrors([errorObject]);
      } else {
        return this._apmServer.addError(errorObject);
      }
    }
  }, {
    key: "registerGlobalEventListener",
    value: function registerGlobalEventListener() {
      var _this = this;

      window.addEventListener('error', function (errorEvent) {
        return _this.logErrorEvent(errorEvent);
      });
    }
  }, {
    key: "logError",
    value: function logError(messageOrError) {
      var errorEvent = {};

      if (typeof messageOrError === 'string') {
        errorEvent.message = messageOrError;
      } else {
        errorEvent.error = messageOrError;
      }

      return this.logErrorEvent(errorEvent);
    }
  }, {
    key: "_getErrorProperties",
    value: function _getErrorProperties(error) {
      var _context;

      var properties = {};

      forEach$2(_context = keys$6(error)).call(_context, function (key) {
        if (key === 'stack') return;
        var val = error[key];
        if (val === null) return; // null is typeof object and well break the switch below

        switch (_typeof_1(val)) {
          case 'function':
            return;

          case 'object':
            // ignore all objects except Dates
            if (typeof val.toISOString !== 'function') return;
            val = val.toISOString();
        }

        properties[key] = val;
      });

      return properties;
    }
  }]);

  return ErrorLogging;
}();

/**
 * MIT License
 *
 * Copyright (c) 2017-present, Elasticsearch BV
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
var ErrorLogging$1 = {
  ErrorLogging: ErrorLogging,
  registerServices: function registerServices(serviceFactory) {
    serviceFactory.registerServiceCreator('ErrorLogging', function () {
      var apmService = serviceFactory.getService('ApmServer');
      var configService = serviceFactory.getService('ConfigService');
      var transactionService = serviceFactory.getService('TransactionService');
      return new ErrorLogging(apmService, configService, transactionService);
    });
  }
};

var nativeSort = sort$2([]);

var test$1 = [1, 2, 3]; // IE8-

var FAILS_ON_UNDEFINED = fails(function () {
  sort$2(test$1).call(test$1, undefined);
}); // V8 bug

var FAILS_ON_NULL = fails(function () {
  sort$2(test$1).call(test$1, null);
}); // Old WebKit

var SLOPPY_METHOD$1 = sloppyArrayMethod('sort');
var FORCED$3 = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || SLOPPY_METHOD$1; // `Array.prototype.sort` method
// https://tc39.github.io/ecma262/#sec-array.prototype.sort

_export({
  target: 'Array',
  proto: true,
  forced: FORCED$3
}, {
  sort: function sort(comparefn) {
    return comparefn === undefined ? nativeSort.call(toObject(this)) : nativeSort.call(toObject(this), aFunction$1(comparefn));
  }
});

var sort = sort$2(entryVirtual('Array'));

var ArrayPrototype$d = Array.prototype;

var sort_1 = function sort_1(it) {
  var own = sort$2(it);

  return it === ArrayPrototype$d || it instanceof Array && own === sort$2(ArrayPrototype$d) ? sort : own;
};

var sort$1 = sort_1;

var sort$2 = sort$1;

var _context$2;

var min$2 = Math.min;

var nativeLastIndexOf = lastIndexOf$2([]);

var NEGATIVE_ZERO$1 = !!nativeLastIndexOf && 1 / lastIndexOf$2(_context$2 = [1]).call(_context$2, 1, -0) < 0;
var SLOPPY_METHOD$2 = sloppyArrayMethod('lastIndexOf'); // `Array.prototype.lastIndexOf` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.lastindexof

var arrayLastIndexOf = NEGATIVE_ZERO$1 || SLOPPY_METHOD$2 ? function lastIndexOf(searchElement
/* , fromIndex = @[*-1] */
) {
  // convert -0 to +0
  if (NEGATIVE_ZERO$1) return nativeLastIndexOf.apply(this, arguments) || 0;
  var O = toIndexedObject(this);
  var length = toLength(O.length);
  var index = length - 1;
  if (arguments.length > 1) index = min$2(index, toInteger(arguments[1]));
  if (index < 0) index = length + index;

  for (; index >= 0; index--) {
    if (index in O && O[index] === searchElement) return index || 0;
  }

  return -1;
} : nativeLastIndexOf;

// https://tc39.github.io/ecma262/#sec-array.prototype.lastindexof

_export({
  target: 'Array',
  proto: true,
  forced: arrayLastIndexOf !== lastIndexOf$2([])
}, {
  lastIndexOf: arrayLastIndexOf
});

var lastIndexOf = lastIndexOf$2(entryVirtual('Array'));

var ArrayPrototype$e = Array.prototype;

var lastIndexOf_1 = function lastIndexOf_1(it) {
  var own = lastIndexOf$2(it);

  return it === ArrayPrototype$e || it instanceof Array && own === lastIndexOf$2(ArrayPrototype$e) ? lastIndexOf : own;
};

var lastIndexOf$1 = lastIndexOf_1;

var lastIndexOf$2 = lastIndexOf$1;

/**
 * MIT License
 *
 * Copyright (c) 2017-present, Elasticsearch BV
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */

/**
 * Bare miniaml URL parser that is not compatible with URL Api
 * in the browser
 *
 * Does not support
 * - URLSearchParams
 * - Unicode chars, Punycode
 *
 * {
 *    hash: '',
 *    host: '',
 *    origin: '',
 *    path: ''
 *    protocol: '',
 *    query: '',
 * }
 *
 * Based on code from url-parser!
 * https://github.com/unshiftio/url-parse/blob/master/index.js
 *
 */

/**
 * Order of the RULES are very important
 *
 * RULE[0] -> for checking the index of the character on the URL
 * RULE[1] -> key to store the associated value present after the RULE[0]
 * RULE[2] -> Extract from the front till the last index
 * RULE[3] -> Left over values of the URL
 */
var RULES = [['#', 'hash'], ['?', 'query'], ['/', 'path'], ['@', 'auth', 1], [NaN, 'host', undefined, 1] //
];
var PROTOCOL_REGEX = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\S\s]*)/i;

var Url =
/*#__PURE__*/
function () {
  function Url(url) {
    classCallCheck(this, Url);

    var _this$extractProtocol = this.extractProtocol(url || ''),
        protocol = _this$extractProtocol.protocol,
        address = _this$extractProtocol.address,
        slashes = _this$extractProtocol.slashes;

    var relative = !protocol && !slashes;
    var location = this.getLocation();

    var instructions = slice$2(RULES).call(RULES); // Sanitize what is left of the address


    address = address.replace('\\', '/');
    var index;

    for (var i = 0; i < instructions.length; i++) {
      var instruction = instructions[i];
      var parse = instruction[0];
      var key = instruction[1];

      if (typeof parse === 'string') {
        index = indexOf$2(address).call(address, parse);

        if (~index) {
          var instLength = instruction[2];

          if (instLength) {
            /**
             * we need to figure out the explicit index where the auth portion
             * in the host ends before parsing the rest of the URL as host.
             *
             * ex: http://a@b@c.com/d
             * auth -> a@b
             * host -> c.com
             */
            var newIndex = lastIndexOf$2(address).call(address, parse);

            index = Math.max(index, newIndex);
            this[key] = slice$2(address).call(address, 0, index);
            address = slice$2(address).call(address, index + instLength);
          } else {
            this[key] = slice$2(address).call(address, index);
            address = slice$2(address).call(address, 0, index);
          }
        }
      } else {
        /** NaN condition */
        this[key] = address;
      }
      /**
       * Default values for all keys from location if url is relative
       */


      this[key] = this[key] || (relative && instruction[3] ? location[key] || '' : '');
      /**
       * host should be lowercased so they can be used to
       * create a proper `origin`.
       */

      if (instruction[3]) this[key] = this[key].toLowerCase();
    }

    this.relative = relative;
    this.protocol = protocol || location.protocol || '';
    this.origin = this.protocol && this.host && this.protocol !== 'file:' ? this.protocol + '//' + this.host : 'null';
    this.href = this.toString();
  }

  createClass(Url, [{
    key: "toString",
    value: function toString() {
      var result = this.protocol;
      result += '//';

      if (this.auth) {
        var REDACTED = '[REDACTED]';
        var userpass = this.auth.split(':');
        var username = userpass[0] ? REDACTED : '';
        var password = userpass[1] ? ':' + REDACTED : '';
        result += username + password + '@';
      }

      result += this.host;
      result += this.path;
      result += this.query;
      result += this.hash;
      return result;
    }
  }, {
    key: "getLocation",
    value: function getLocation() {
      var globalVar = {};

      if (typeof window !== 'undefined') {
        globalVar = window;
      }

      return globalVar.location;
    }
  }, {
    key: "extractProtocol",
    value: function extractProtocol(url) {
      var match = PROTOCOL_REGEX.exec(url);
      return {
        protocol: match[1] ? match[1].toLowerCase() : '',
        slashes: !!match[2],
        address: match[3]
      };
    }
  }]);

  return Url;
}();

/**
 * MIT License
 *
 * Copyright (c) 2017-present, Elasticsearch BV
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
var globalState = {
  fetchInProgress: false
};
function apmSymbol(name) {
  return '__apm_symbol__' + name;
}

function isPropertyWritable(propertyDesc) {
  if (!propertyDesc) {
    return true;
  }

  if (propertyDesc.writable === false) {
    return false;
  }

  return !(typeof propertyDesc.get === 'function' && typeof propertyDesc.set === 'undefined');
}

function attachOriginToPatched(patched, original) {
  patched[apmSymbol('OriginalDelegate')] = original;
}

function patchMethod(target, name, patchFn) {
  var proto = target;

  while (proto && !proto.hasOwnProperty(name)) {
    proto = getPrototypeOf$2(proto);
  }

  if (!proto && target[name]) {
    // somehow we did not find it, but we can see it. This happens on IE for Window properties.
    proto = target;
  }

  var delegateName = apmSymbol(name);
  var delegate;

  if (proto && !(delegate = proto[delegateName])) {
    delegate = proto[delegateName] = proto[name]; // check whether proto[name] is writable
    // some property is readonly in safari, such as HtmlCanvasElement.prototype.toBlob

    var desc = proto && getOwnPropertyDescriptor$2(proto, name);

    if (isPropertyWritable(desc)) {
      var patchDelegate = patchFn(delegate, delegateName, name);

      proto[name] = function () {
        return patchDelegate(this, arguments);
      };

      attachOriginToPatched(proto[name], delegate);
    }
  }

  return delegate;
}
var XHR_IGNORE = apmSymbol('xhrIgnore');
var XHR_SYNC = apmSymbol('xhrSync');
var XHR_URL = apmSymbol('xhrURL');
var XHR_METHOD = apmSymbol('xhrMethod');

/**
 * MIT License
 *
 * Copyright (c) 2017-present, Elasticsearch BV
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
var XHR_TASK = apmSymbol('xhrTask');
var XHR_LISTENER = apmSymbol('xhrListener');
var XHR_SCHEDULED = apmSymbol('xhrScheduled');
function patchXMLHttpRequest(callback) {
  var XMLHttpRequestPrototype = XMLHttpRequest.prototype;
  var oriAddListener = XMLHttpRequestPrototype[ADD_EVENT_LISTENER_STR];
  var oriRemoveListener = XMLHttpRequestPrototype[REMOVE_EVENT_LISTENER_STR];

  if (!oriAddListener) {
    var XMLHttpRequestEventTarget = window['XMLHttpRequestEventTarget'];

    if (XMLHttpRequestEventTarget) {
      var XMLHttpRequestEventTargetPrototype = XMLHttpRequestEventTarget.prototype;
      oriAddListener = XMLHttpRequestEventTargetPrototype[ADD_EVENT_LISTENER_STR];
      oriRemoveListener = XMLHttpRequestEventTargetPrototype[REMOVE_EVENT_LISTENER_STR];
    }
  }

  var READY_STATE_CHANGE = 'readystatechange';

  function invokeTask(task) {
    task.state = INVOKE;

    if (!task.ignore) {
      callback(INVOKE, task);
    }
  }

  function scheduleTask(task) {
    XMLHttpRequest[XHR_SCHEDULED] = false;
    task.state = SCHEDULE;

    if (!task.ignore) {
      callback(SCHEDULE, task);
    }

    var data = task.data;
    var target = data.target; // remove existing event listener

    var listener = target[XHR_LISTENER];

    if (!oriAddListener) {
      oriAddListener = target[ADD_EVENT_LISTENER_STR];
      oriRemoveListener = target[REMOVE_EVENT_LISTENER_STR];
    }

    if (listener) {
      oriRemoveListener.call(target, READY_STATE_CHANGE, listener);
    }

    var newListener = target[XHR_LISTENER] = function () {
      if (target.readyState === target.DONE) {
        // sometimes on some browsers XMLHttpRequest will fire onreadystatechange with
        // readyState=4 multiple times, so we need to check task state here
        if (!data.aborted && XMLHttpRequest[XHR_SCHEDULED] && task.state === SCHEDULE) {
          invokeTask(task);
        }
      }
    };

    oriAddListener.call(target, READY_STATE_CHANGE, newListener);
    var storedTask = target[XHR_TASK];

    if (!storedTask) {
      target[XHR_TASK] = task;
    }

    var result = sendNative.apply(target, data.args);
    XMLHttpRequest[XHR_SCHEDULED] = true;
    return result;
  }

  function clearTask(task) {
    task.state = CLEAR;
    callback(CLEAR, task);
    var data = task.data; // Note - ideally, we would call data.target.removeEventListener here, but it's too late
    // to prevent it from firing. So instead, we store info for the event listener.

    data.aborted = true;
  }

  var openNative = patchMethod(XMLHttpRequestPrototype, 'open', function () {
    return function (self, args) {
      self[XHR_METHOD] = args[0];
      self[XHR_URL] = args[1];
      self[XHR_SYNC] = args[2] === false;
      return openNative.apply(self, args);
    };
  });
  var sendNative = patchMethod(XMLHttpRequestPrototype, 'send', function () {
    return function (self, args) {
      var task = {
        source: XMLHTTPREQUEST,
        state: '',
        type: 'macroTask',
        ignore: self[XHR_IGNORE],
        data: {
          target: self,
          method: self[XHR_METHOD],
          sync: self[XHR_SYNC],
          url: self[XHR_URL],
          args: args,
          aborted: false
        }
      };
      var result = scheduleTask(task);

      if (self[XHR_SYNC]) {
        invokeTask(task);
      }

      return result;
    };
  });
  var abortNative = patchMethod(XMLHttpRequestPrototype, 'abort', function () {
    return function (self, args) {
      var task = self[XHR_TASK];

      if (task && typeof task.type === 'string') {
        // If the XHR has already been aborted, do nothing.
        if (task.data && task.data.aborted) {
          return;
        }

        clearTask(task);
      }

      return abortNative.apply(self, args);
    };
  });
}

var userAgent = getBuiltIn('navigator', 'userAgent') || '';

var slice$5 = slice$2([]);

var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check

var wrap$1 = function wrap(scheduler) {
  return function (handler, timeout
  /* , ...arguments */
  ) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice$5.call(arguments, 2) : undefined;
    return scheduler(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof handler == 'function' ? handler : Function(handler)).apply(this, args);
    } : handler, timeout);
  };
}; // ie9- setTimeout & setInterval additional parameters fix
// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers


_export({
  global: true,
  bind: true,
  forced: MSIE
}, {
  // `setTimeout` method
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-settimeout
  setTimeout: wrap$1(global_1.setTimeout),
  // `setInterval` method
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-setinterval
  setInterval: wrap$1(global_1.setInterval)
});

var setTimeout = path.setTimeout;

var setTimeout$1 = setTimeout;

var es6Promise = createCommonjsModule(function (module, exports) {
  /*!
   * @overview es6-promise - a tiny implementation of Promises/A+.
   * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
   * @license   Licensed under MIT license
   *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
   * @version   v4.2.8+1e68dce6
   */
  (function (global, factory) {
     module.exports = factory() ;
  })(commonjsGlobal, function () {

    function objectOrFunction(x) {
      var type = _typeof_1(x);

      return x !== null && (type === 'object' || type === 'function');
    }

    function isFunction(x) {
      return typeof x === 'function';
    }

    var _isArray = void 0;

    if (isArray$2) {
      _isArray = isArray$2;
    } else {
      _isArray = function _isArray(x) {
        return Object.prototype.toString.call(x) === '[object Array]';
      };
    }

    var isArray = _isArray;
    var len = 0;
    var vertxNext = void 0;
    var customSchedulerFn = void 0;

    var asap = function asap(callback, arg) {
      queue[len] = callback;
      queue[len + 1] = arg;
      len += 2;

      if (len === 2) {
        // If len is 2, that means that we need to schedule an async flush.
        // If additional callbacks are queued before the queue is flushed, they
        // will be processed by this flush that we are scheduling.
        if (customSchedulerFn) {
          customSchedulerFn(flush);
        } else {
          scheduleFlush();
        }
      }
    };

    function setScheduler(scheduleFn) {
      customSchedulerFn = scheduleFn;
    }

    function setAsap(asapFn) {
      asap = asapFn;
    }

    var browserWindow = typeof window !== 'undefined' ? window : undefined;
    var browserGlobal = browserWindow || {};
    var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
    var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]'; // test for web worker but not in IE10

    var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined'; // node

    function useNextTick() {
      // node version 0.10.x displays a deprecation warning when nextTick is used recursively
      // see https://github.com/cujojs/when/issues/410 for details
      return function () {
        return process.nextTick(flush);
      };
    } // vertx


    function useVertxTimer() {
      if (typeof vertxNext !== 'undefined') {
        return function () {
          vertxNext(flush);
        };
      }

      return useSetTimeout();
    }

    function useMutationObserver() {
      var iterations = 0;
      var observer = new BrowserMutationObserver(flush);
      var node = document.createTextNode('');
      observer.observe(node, {
        characterData: true
      });
      return function () {
        node.data = iterations = ++iterations % 2;
      };
    } // web worker


    function useMessageChannel() {
      var channel = new MessageChannel();
      channel.port1.onmessage = flush;
      return function () {
        return channel.port2.postMessage(0);
      };
    }

    function useSetTimeout() {
      // Store setTimeout reference so es6-promise will be unaffected by
      // other code modifying setTimeout (like sinon.useFakeTimers())
      var globalSetTimeout = setTimeout$1;
      return function () {
        return globalSetTimeout(flush, 1);
      };
    }

    var queue = new Array(1000);

    function flush() {
      for (var i = 0; i < len; i += 2) {
        var callback = queue[i];
        var arg = queue[i + 1];
        callback(arg);
        queue[i] = undefined;
        queue[i + 1] = undefined;
      }

      len = 0;
    }

    function attemptVertx() {
      try {
        var vertx = Function('return this')().require('vertx');

        vertxNext = vertx.runOnLoop || vertx.runOnContext;
        return useVertxTimer();
      } catch (e) {
        return useSetTimeout();
      }
    }

    var scheduleFlush = void 0; // Decide what async method to use to triggering processing of queued callbacks:

    if (isNode) {
      scheduleFlush = useNextTick();
    } else if (BrowserMutationObserver) {
      scheduleFlush = useMutationObserver();
    } else if (isWorker) {
      scheduleFlush = useMessageChannel();
    } else if (browserWindow === undefined && typeof commonjsRequire === 'function') {
      scheduleFlush = attemptVertx();
    } else {
      scheduleFlush = useSetTimeout();
    }

    function then(onFulfillment, onRejection) {
      var parent = this;
      var child = new this.constructor(noop);

      if (child[PROMISE_ID] === undefined) {
        makePromise(child);
      }

      var _state = parent._state;

      if (_state) {
        var callback = arguments[_state - 1];
        asap(function () {
          return invokeCallback(_state, child, callback, parent._result);
        });
      } else {
        subscribe(parent, child, onFulfillment, onRejection);
      }

      return child;
    }
    /**
      `Promise.resolve` returns a promise that will become resolved with the
      passed `value`. It is shorthand for the following:
    
      ```javascript
      let promise = new Promise(function(resolve, reject){
        resolve(1);
      });
    
      promise.then(function(value){
        // value === 1
      });
      ```
    
      Instead of writing the above, your code now simply becomes the following:
    
      ```javascript
      let promise = Promise.resolve(1);
    
      promise.then(function(value){
        // value === 1
      });
      ```
    
      @method resolve
      @static
      @param {Any} value value that the returned promise will be resolved with
      Useful for tooling.
      @return {Promise} a promise that will become fulfilled with the given
      `value`
    */


    function resolve$1(object) {
      /*jshint validthis:true */
      var Constructor = this;

      if (object && _typeof_1(object) === 'object' && object.constructor === Constructor) {
        return object;
      }

      var promise = new Constructor(noop);
      resolve(promise, object);
      return promise;
    }

    var PROMISE_ID = Math.random().toString(36).substring(2);

    function noop() {}

    var PENDING = void 0;
    var FULFILLED = 1;
    var REJECTED = 2;

    function selfFulfillment() {
      return new TypeError("You cannot resolve a promise with itself");
    }

    function cannotReturnOwn() {
      return new TypeError('A promises callback cannot return that same promise.');
    }

    function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
      try {
        then$$1.call(value, fulfillmentHandler, rejectionHandler);
      } catch (e) {
        return e;
      }
    }

    function handleForeignThenable(promise, thenable, then$$1) {
      asap(function (promise) {
        var sealed = false;
        var error = tryThen(then$$1, thenable, function (value) {
          if (sealed) {
            return;
          }

          sealed = true;

          if (thenable !== value) {
            resolve(promise, value);
          } else {
            fulfill(promise, value);
          }
        }, function (reason) {
          if (sealed) {
            return;
          }

          sealed = true;
          reject(promise, reason);
        }, 'Settle: ' + (promise._label || ' unknown promise'));

        if (!sealed && error) {
          sealed = true;
          reject(promise, error);
        }
      }, promise);
    }

    function handleOwnThenable(promise, thenable) {
      if (thenable._state === FULFILLED) {
        fulfill(promise, thenable._result);
      } else if (thenable._state === REJECTED) {
        reject(promise, thenable._result);
      } else {
        subscribe(thenable, undefined, function (value) {
          return resolve(promise, value);
        }, function (reason) {
          return reject(promise, reason);
        });
      }
    }

    function handleMaybeThenable(promise, maybeThenable, then$$1) {
      if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
        handleOwnThenable(promise, maybeThenable);
      } else {
        if (then$$1 === undefined) {
          fulfill(promise, maybeThenable);
        } else if (isFunction(then$$1)) {
          handleForeignThenable(promise, maybeThenable, then$$1);
        } else {
          fulfill(promise, maybeThenable);
        }
      }
    }

    function resolve(promise, value) {
      if (promise === value) {
        reject(promise, selfFulfillment());
      } else if (objectOrFunction(value)) {
        var then$$1 = void 0;

        try {
          then$$1 = value.then;
        } catch (error) {
          reject(promise, error);
          return;
        }

        handleMaybeThenable(promise, value, then$$1);
      } else {
        fulfill(promise, value);
      }
    }

    function publishRejection(promise) {
      if (promise._onerror) {
        promise._onerror(promise._result);
      }

      publish(promise);
    }

    function fulfill(promise, value) {
      if (promise._state !== PENDING) {
        return;
      }

      promise._result = value;
      promise._state = FULFILLED;

      if (promise._subscribers.length !== 0) {
        asap(publish, promise);
      }
    }

    function reject(promise, reason) {
      if (promise._state !== PENDING) {
        return;
      }

      promise._state = REJECTED;
      promise._result = reason;
      asap(publishRejection, promise);
    }

    function subscribe(parent, child, onFulfillment, onRejection) {
      var _subscribers = parent._subscribers;
      var length = _subscribers.length;
      parent._onerror = null;
      _subscribers[length] = child;
      _subscribers[length + FULFILLED] = onFulfillment;
      _subscribers[length + REJECTED] = onRejection;

      if (length === 0 && parent._state) {
        asap(publish, parent);
      }
    }

    function publish(promise) {
      var subscribers = promise._subscribers;
      var settled = promise._state;

      if (subscribers.length === 0) {
        return;
      }

      var child = void 0,
          callback = void 0,
          detail = promise._result;

      for (var i = 0; i < subscribers.length; i += 3) {
        child = subscribers[i];
        callback = subscribers[i + settled];

        if (child) {
          invokeCallback(settled, child, callback, detail);
        } else {
          callback(detail);
        }
      }

      promise._subscribers.length = 0;
    }

    function invokeCallback(settled, promise, callback, detail) {
      var hasCallback = isFunction(callback),
          value = void 0,
          error = void 0,
          succeeded = true;

      if (hasCallback) {
        try {
          value = callback(detail);
        } catch (e) {
          succeeded = false;
          error = e;
        }

        if (promise === value) {
          reject(promise, cannotReturnOwn());
          return;
        }
      } else {
        value = detail;
      }

      if (promise._state !== PENDING) ; else if (hasCallback && succeeded) {
        resolve(promise, value);
      } else if (succeeded === false) {
        reject(promise, error);
      } else if (settled === FULFILLED) {
        fulfill(promise, value);
      } else if (settled === REJECTED) {
        reject(promise, value);
      }
    }

    function initializePromise(promise, resolver) {
      try {
        resolver(function resolvePromise(value) {
          resolve(promise, value);
        }, function rejectPromise(reason) {
          reject(promise, reason);
        });
      } catch (e) {
        reject(promise, e);
      }
    }

    var id = 0;

    function nextId() {
      return id++;
    }

    function makePromise(promise) {
      promise[PROMISE_ID] = id++;
      promise._state = undefined;
      promise._result = undefined;
      promise._subscribers = [];
    }

    function validationError() {
      return new Error('Array Methods must be provided an Array');
    }

    var Enumerator = function () {
      function Enumerator(Constructor, input) {
        this._instanceConstructor = Constructor;
        this.promise = new Constructor(noop);

        if (!this.promise[PROMISE_ID]) {
          makePromise(this.promise);
        }

        if (isArray(input)) {
          this.length = input.length;
          this._remaining = input.length;
          this._result = new Array(this.length);

          if (this.length === 0) {
            fulfill(this.promise, this._result);
          } else {
            this.length = this.length || 0;

            this._enumerate(input);

            if (this._remaining === 0) {
              fulfill(this.promise, this._result);
            }
          }
        } else {
          reject(this.promise, validationError());
        }
      }

      Enumerator.prototype._enumerate = function _enumerate(input) {
        for (var i = 0; this._state === PENDING && i < input.length; i++) {
          this._eachEntry(input[i], i);
        }
      };

      Enumerator.prototype._eachEntry = function _eachEntry(entry, i) {
        var c = this._instanceConstructor;
        var resolve$$1 = c.resolve;

        if (resolve$$1 === resolve$1) {
          var _then = void 0;

          var error = void 0;
          var didError = false;

          try {
            _then = entry.then;
          } catch (e) {
            didError = true;
            error = e;
          }

          if (_then === then && entry._state !== PENDING) {
            this._settledAt(entry._state, i, entry._result);
          } else if (typeof _then !== 'function') {
            this._remaining--;
            this._result[i] = entry;
          } else if (c === Promise$1) {
            var promise = new c(noop);

            if (didError) {
              reject(promise, error);
            } else {
              handleMaybeThenable(promise, entry, _then);
            }

            this._willSettleAt(promise, i);
          } else {
            this._willSettleAt(new c(function (resolve$$1) {
              return resolve$$1(entry);
            }), i);
          }
        } else {
          this._willSettleAt(resolve$$1(entry), i);
        }
      };

      Enumerator.prototype._settledAt = function _settledAt(state, i, value) {
        var promise = this.promise;

        if (promise._state === PENDING) {
          this._remaining--;

          if (state === REJECTED) {
            reject(promise, value);
          } else {
            this._result[i] = value;
          }
        }

        if (this._remaining === 0) {
          fulfill(promise, this._result);
        }
      };

      Enumerator.prototype._willSettleAt = function _willSettleAt(promise, i) {
        var enumerator = this;
        subscribe(promise, undefined, function (value) {
          return enumerator._settledAt(FULFILLED, i, value);
        }, function (reason) {
          return enumerator._settledAt(REJECTED, i, reason);
        });
      };

      return Enumerator;
    }();
    /**
      `Promise.all` accepts an array of promises, and returns a new promise which
      is fulfilled with an array of fulfillment values for the passed promises, or
      rejected with the reason of the first passed promise to be rejected. It casts all
      elements of the passed iterable to promises as it runs this algorithm.
    
      Example:
    
      ```javascript
      let promise1 = resolve(1);
      let promise2 = resolve(2);
      let promise3 = resolve(3);
      let promises = [ promise1, promise2, promise3 ];
    
      Promise.all(promises).then(function(array){
        // The array here would be [ 1, 2, 3 ];
      });
      ```
    
      If any of the `promises` given to `all` are rejected, the first promise
      that is rejected will be given as an argument to the returned promises's
      rejection handler. For example:
    
      Example:
    
      ```javascript
      let promise1 = resolve(1);
      let promise2 = reject(new Error("2"));
      let promise3 = reject(new Error("3"));
      let promises = [ promise1, promise2, promise3 ];
    
      Promise.all(promises).then(function(array){
        // Code here never runs because there are rejected promises!
      }, function(error) {
        // error.message === "2"
      });
      ```
    
      @method all
      @static
      @param {Array} entries array of promises
      @param {String} label optional string for labeling the promise.
      Useful for tooling.
      @return {Promise} promise that is fulfilled when all `promises` have been
      fulfilled, or rejected if any of them become rejected.
      @static
    */


    function all(entries) {
      return new Enumerator(this, entries).promise;
    }
    /**
      `Promise.race` returns a new promise which is settled in the same way as the
      first passed promise to settle.
    
      Example:
    
      ```javascript
      let promise1 = new Promise(function(resolve, reject){
        setTimeout(function(){
          resolve('promise 1');
        }, 200);
      });
    
      let promise2 = new Promise(function(resolve, reject){
        setTimeout(function(){
          resolve('promise 2');
        }, 100);
      });
    
      Promise.race([promise1, promise2]).then(function(result){
        // result === 'promise 2' because it was resolved before promise1
        // was resolved.
      });
      ```
    
      `Promise.race` is deterministic in that only the state of the first
      settled promise matters. For example, even if other promises given to the
      `promises` array argument are resolved, but the first settled promise has
      become rejected before the other promises became fulfilled, the returned
      promise will become rejected:
    
      ```javascript
      let promise1 = new Promise(function(resolve, reject){
        setTimeout(function(){
          resolve('promise 1');
        }, 200);
      });
    
      let promise2 = new Promise(function(resolve, reject){
        setTimeout(function(){
          reject(new Error('promise 2'));
        }, 100);
      });
    
      Promise.race([promise1, promise2]).then(function(result){
        // Code here never runs
      }, function(reason){
        // reason.message === 'promise 2' because promise 2 became rejected before
        // promise 1 became fulfilled
      });
      ```
    
      An example real-world use case is implementing timeouts:
    
      ```javascript
      Promise.race([ajax('foo.json'), timeout(5000)])
      ```
    
      @method race
      @static
      @param {Array} promises array of promises to observe
      Useful for tooling.
      @return {Promise} a promise which settles in the same way as the first passed
      promise to settle.
    */


    function race(entries) {
      /*jshint validthis:true */
      var Constructor = this;

      if (!isArray(entries)) {
        return new Constructor(function (_, reject) {
          return reject(new TypeError('You must pass an array to race.'));
        });
      } else {
        return new Constructor(function (resolve, reject) {
          var length = entries.length;

          for (var i = 0; i < length; i++) {
            Constructor.resolve(entries[i]).then(resolve, reject);
          }
        });
      }
    }
    /**
      `Promise.reject` returns a promise rejected with the passed `reason`.
      It is shorthand for the following:
    
      ```javascript
      let promise = new Promise(function(resolve, reject){
        reject(new Error('WHOOPS'));
      });
    
      promise.then(function(value){
        // Code here doesn't run because the promise is rejected!
      }, function(reason){
        // reason.message === 'WHOOPS'
      });
      ```
    
      Instead of writing the above, your code now simply becomes the following:
    
      ```javascript
      let promise = Promise.reject(new Error('WHOOPS'));
    
      promise.then(function(value){
        // Code here doesn't run because the promise is rejected!
      }, function(reason){
        // reason.message === 'WHOOPS'
      });
      ```
    
      @method reject
      @static
      @param {Any} reason value that the returned promise will be rejected with.
      Useful for tooling.
      @return {Promise} a promise rejected with the given `reason`.
    */


    function reject$1(reason) {
      /*jshint validthis:true */
      var Constructor = this;
      var promise = new Constructor(noop);
      reject(promise, reason);
      return promise;
    }

    function needsResolver() {
      throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
    }

    function needsNew() {
      throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
    }
    /**
      Promise objects represent the eventual result of an asynchronous operation. The
      primary way of interacting with a promise is through its `then` method, which
      registers callbacks to receive either a promise's eventual value or the reason
      why the promise cannot be fulfilled.
    
      Terminology
      -----------
    
      - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
      - `thenable` is an object or function that defines a `then` method.
      - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
      - `exception` is a value that is thrown using the throw statement.
      - `reason` is a value that indicates why a promise was rejected.
      - `settled` the final resting state of a promise, fulfilled or rejected.
    
      A promise can be in one of three states: pending, fulfilled, or rejected.
    
      Promises that are fulfilled have a fulfillment value and are in the fulfilled
      state.  Promises that are rejected have a rejection reason and are in the
      rejected state.  A fulfillment value is never a thenable.
    
      Promises can also be said to *resolve* a value.  If this value is also a
      promise, then the original promise's settled state will match the value's
      settled state.  So a promise that *resolves* a promise that rejects will
      itself reject, and a promise that *resolves* a promise that fulfills will
      itself fulfill.
    
    
      Basic Usage:
      ------------
    
      ```js
      let promise = new Promise(function(resolve, reject) {
        // on success
        resolve(value);
    
        // on failure
        reject(reason);
      });
    
      promise.then(function(value) {
        // on fulfillment
      }, function(reason) {
        // on rejection
      });
      ```
    
      Advanced Usage:
      ---------------
    
      Promises shine when abstracting away asynchronous interactions such as
      `XMLHttpRequest`s.
    
      ```js
      function getJSON(url) {
        return new Promise(function(resolve, reject){
          let xhr = new XMLHttpRequest();
    
          xhr.open('GET', url);
          xhr.onreadystatechange = handler;
          xhr.responseType = 'json';
          xhr.setRequestHeader('Accept', 'application/json');
          xhr.send();
    
          function handler() {
            if (this.readyState === this.DONE) {
              if (this.status === 200) {
                resolve(this.response);
              } else {
                reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
              }
            }
          };
        });
      }
    
      getJSON('/posts.json').then(function(json) {
        // on fulfillment
      }, function(reason) {
        // on rejection
      });
      ```
    
      Unlike callbacks, promises are great composable primitives.
    
      ```js
      Promise.all([
        getJSON('/posts'),
        getJSON('/comments')
      ]).then(function(values){
        values[0] // => postsJSON
        values[1] // => commentsJSON
    
        return values;
      });
      ```
    
      @class Promise
      @param {Function} resolver
      Useful for tooling.
      @constructor
    */


    var Promise$1 = function () {
      function Promise(resolver) {
        this[PROMISE_ID] = nextId();
        this._result = this._state = undefined;
        this._subscribers = [];

        if (noop !== resolver) {
          typeof resolver !== 'function' && needsResolver();
          this instanceof Promise ? initializePromise(this, resolver) : needsNew();
        }
      }
      /**
      The primary way of interacting with a promise is through its `then` method,
      which registers callbacks to receive either a promise's eventual value or the
      reason why the promise cannot be fulfilled.
       ```js
      findUser().then(function(user){
        // user is available
      }, function(reason){
        // user is unavailable, and you are given the reason why
      });
      ```
       Chaining
      --------
       The return value of `then` is itself a promise.  This second, 'downstream'
      promise is resolved with the return value of the first promise's fulfillment
      or rejection handler, or rejected if the handler throws an exception.
       ```js
      findUser().then(function (user) {
        return user.name;
      }, function (reason) {
        return 'default name';
      }).then(function (userName) {
        // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
        // will be `'default name'`
      });
       findUser().then(function (user) {
        throw new Error('Found user, but still unhappy');
      }, function (reason) {
        throw new Error('`findUser` rejected and we're unhappy');
      }).then(function (value) {
        // never reached
      }, function (reason) {
        // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
        // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
      });
      ```
      If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
       ```js
      findUser().then(function (user) {
        throw new PedagogicalException('Upstream error');
      }).then(function (value) {
        // never reached
      }).then(function (value) {
        // never reached
      }, function (reason) {
        // The `PedgagocialException` is propagated all the way down to here
      });
      ```
       Assimilation
      ------------
       Sometimes the value you want to propagate to a downstream promise can only be
      retrieved asynchronously. This can be achieved by returning a promise in the
      fulfillment or rejection handler. The downstream promise will then be pending
      until the returned promise is settled. This is called *assimilation*.
       ```js
      findUser().then(function (user) {
        return findCommentsByAuthor(user);
      }).then(function (comments) {
        // The user's comments are now available
      });
      ```
       If the assimliated promise rejects, then the downstream promise will also reject.
       ```js
      findUser().then(function (user) {
        return findCommentsByAuthor(user);
      }).then(function (comments) {
        // If `findCommentsByAuthor` fulfills, we'll have the value here
      }, function (reason) {
        // If `findCommentsByAuthor` rejects, we'll have the reason here
      });
      ```
       Simple Example
      --------------
       Synchronous Example
       ```javascript
      let result;
       try {
        result = findResult();
        // success
      } catch(reason) {
        // failure
      }
      ```
       Errback Example
       ```js
      findResult(function(result, err){
        if (err) {
          // failure
        } else {
          // success
        }
      });
      ```
       Promise Example;
       ```javascript
      findResult().then(function(result){
        // success
      }, function(reason){
        // failure
      });
      ```
       Advanced Example
      --------------
       Synchronous Example
       ```javascript
      let author, books;
       try {
        author = findAuthor();
        books  = findBooksByAuthor(author);
        // success
      } catch(reason) {
        // failure
      }
      ```
       Errback Example
       ```js
       function foundBooks(books) {
       }
       function failure(reason) {
       }
       findAuthor(function(author, err){
        if (err) {
          failure(err);
          // failure
        } else {
          try {
            findBoooksByAuthor(author, function(books, err) {
              if (err) {
                failure(err);
              } else {
                try {
                  foundBooks(books);
                } catch(reason) {
                  failure(reason);
                }
              }
            });
          } catch(error) {
            failure(err);
          }
          // success
        }
      });
      ```
       Promise Example;
       ```javascript
      findAuthor().
        then(findBooksByAuthor).
        then(function(books){
          // found books
      }).catch(function(reason){
        // something went wrong
      });
      ```
       @method then
      @param {Function} onFulfilled
      @param {Function} onRejected
      Useful for tooling.
      @return {Promise}
      */

      /**
      `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
      as the catch block of a try/catch statement.
      ```js
      function findAuthor(){
      throw new Error('couldn't find that author');
      }
      // synchronous
      try {
      findAuthor();
      } catch(reason) {
      // something went wrong
      }
      // async with promises
      findAuthor().catch(function(reason){
      // something went wrong
      });
      ```
      @method catch
      @param {Function} onRejection
      Useful for tooling.
      @return {Promise}
      */


      Promise.prototype.catch = function _catch(onRejection) {
        return this.then(null, onRejection);
      };
      /**
        `finally` will be invoked regardless of the promise's fate just as native
        try/catch/finally behaves
      
        Synchronous example:
      
        ```js
        findAuthor() {
          if (Math.random() > 0.5) {
            throw new Error();
          }
          return new Author();
        }
      
        try {
          return findAuthor(); // succeed or fail
        } catch(error) {
          return findOtherAuther();
        } finally {
          // always runs
          // doesn't affect the return value
        }
        ```
      
        Asynchronous example:
      
        ```js
        findAuthor().catch(function(reason){
          return findOtherAuther();
        }).finally(function(){
          // author was either found, or not
        });
        ```
      
        @method finally
        @param {Function} callback
        @return {Promise}
      */


      Promise.prototype.finally = function _finally(callback) {
        var promise = this;
        var constructor = promise.constructor;

        if (isFunction(callback)) {
          return promise.then(function (value) {
            return constructor.resolve(callback()).then(function () {
              return value;
            });
          }, function (reason) {
            return constructor.resolve(callback()).then(function () {
              throw reason;
            });
          });
        }

        return promise.then(callback, callback);
      };

      return Promise;
    }();

    Promise$1.prototype.then = then;
    Promise$1.all = all;
    Promise$1.race = race;
    Promise$1.resolve = resolve$1;
    Promise$1.reject = reject$1;
    Promise$1._setScheduler = setScheduler;
    Promise$1._setAsap = setAsap;
    Promise$1._asap = asap;
    /*global self*/

    function polyfill() {
      var local = void 0;

      if (typeof commonjsGlobal !== 'undefined') {
        local = commonjsGlobal;
      } else if (typeof self !== 'undefined') {
        local = self;
      } else {
        try {
          local = Function('return this')();
        } catch (e) {
          throw new Error('polyfill failed because global object is unavailable in this environment');
        }
      }

      var P = local.Promise;

      if (P) {
        var promiseToString = null;

        try {
          promiseToString = Object.prototype.toString.call(P.resolve());
        } catch (e) {// silently ignored
        }

        if (promiseToString === '[object Promise]' && !P.cast) {
          return;
        }
      }

      local.Promise = Promise$1;
    } // Strange compat..


    Promise$1.polyfill = polyfill;
    Promise$1.Promise = Promise$1;
    return Promise$1;
  });
});
var es6Promise_1 = es6Promise.Promise;

/**
 * MIT License
 *
 * Copyright (c) 2017-present, Elasticsearch BV
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
function patchFetch(callback) {
  if (!window.fetch || !window.Request) {
    return;
  }

  function scheduleTask(task) {
    task.state = SCHEDULE;
    callback(SCHEDULE, task);
  }

  function invokeTask(task) {
    task.state = INVOKE;
    callback(INVOKE, task);
  }

  var nativeFetch = window.fetch;

  window.fetch = function (input, init) {
    var fetchSelf = this;
    var args = arguments;
    var request, url;

    if (typeof input === 'string') {
      request = new Request(input, init);
      url = input;
    } else if (input) {
      request = input;
      url = request.url;
    } else {
      return nativeFetch.apply(fetchSelf, args);
    }

    var task = {
      source: FETCH,
      state: '',
      type: 'macroTask',
      data: {
        target: request,
        method: request.method,
        sync: false,
        url: url,
        args: args,
        aborted: false
      }
    };
    return new es6Promise_1(function (resolve, reject) {
      globalState.fetchInProgress = true;
      scheduleTask(task);
      var promise;

      try {
        promise = nativeFetch.apply(fetchSelf, [request]);
      } catch (error) {
        reject(error);
        task.data.error = error;
        invokeTask(task);
        globalState.fetchInProgress = false;
        return;
      }

      promise.then(function (response) {
        resolve(response); // invokeTask in the next execution cycle to let the promise resolution complete

        es6Promise_1.resolve().then(function () {
          task.data.response = response;
          invokeTask(task);
        });
      }, function (error) {
        reject(error);
        es6Promise_1.resolve().then(function () {
          task.data.error = error;
          invokeTask(task);
        });
      });
      globalState.fetchInProgress = false;
    });
  };
}

/**
 * MIT License
 *
 * Copyright (c) 2017-present, Elasticsearch BV
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
function patchHistory(callback) {
  if (!window.history) {
    return;
  }

  var nativePushState = history.pushState;

  if (typeof nativePushState === 'function') {
    history.pushState = function (state, title, url) {
      var task = {
        source: HISTORY,
        data: {
          state: state,
          title: title,
          url: url
        }
      };
      callback(INVOKE, task);
      nativePushState.apply(this, arguments);
    };
  }
}

var max$2 = Math.max;
var min$3 = Math.min;
var MAX_SAFE_INTEGER$1 = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded'; // `Array.prototype.splice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.splice
// with adding support of @@species

_export({
  target: 'Array',
  proto: true,
  forced: !arrayMethodHasSpeciesSupport('splice')
}, {
  splice: function splice(start, deleteCount
  /* , ...items */
  ) {
    var O = toObject(this);
    var len = toLength(O.length);
    var actualStart = toAbsoluteIndex(start, len);
    var argumentsLength = arguments.length;
    var insertCount, actualDeleteCount, A, k, from, to;

    if (argumentsLength === 0) {
      insertCount = actualDeleteCount = 0;
    } else if (argumentsLength === 1) {
      insertCount = 0;
      actualDeleteCount = len - actualStart;
    } else {
      insertCount = argumentsLength - 2;
      actualDeleteCount = min$3(max$2(toInteger(deleteCount), 0), len - actualStart);
    }

    if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER$1) {
      throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
    }

    A = arraySpeciesCreate(O, actualDeleteCount);

    for (k = 0; k < actualDeleteCount; k++) {
      from = actualStart + k;
      if (from in O) createProperty(A, k, O[from]);
    }

    A.length = actualDeleteCount;

    if (insertCount < actualDeleteCount) {
      for (k = actualStart; k < len - actualDeleteCount; k++) {
        from = k + actualDeleteCount;
        to = k + insertCount;
        if (from in O) O[to] = O[from];else delete O[to];
      }

      for (k = len; k > len - actualDeleteCount + insertCount; k--) {
        delete O[k - 1];
      }
    } else if (insertCount > actualDeleteCount) {
      for (k = len - actualDeleteCount; k > actualStart; k--) {
        from = k + actualDeleteCount - 1;
        to = k + insertCount - 1;
        if (from in O) O[to] = O[from];else delete O[to];
      }
    }

    for (k = 0; k < insertCount; k++) {
      O[k + actualStart] = arguments[k + 2];
    }

    O.length = len - actualDeleteCount + insertCount;
    return A;
  }
});

var splice = splice$2(entryVirtual('Array'));

var ArrayPrototype$f = Array.prototype;

var splice_1 = function splice_1(it) {
  var own = splice$2(it);

  return it === ArrayPrototype$f || it instanceof Array && own === splice$2(ArrayPrototype$f) ? splice : own;
};

var splice$1 = splice_1;

var splice$2 = splice$1;

var EventHandler =
/*#__PURE__*/
function () {
  function EventHandler() {
    classCallCheck(this, EventHandler);

    this.observers = {};
  }

  createClass(EventHandler, [{
    key: "observe",
    value: function observe(name, fn) {
      var _this = this;

      if (typeof fn === 'function') {
        if (!this.observers[name]) {
          this.observers[name] = [];
        }

        this.observers[name].push(fn);
        return function () {
          var _context;

          var index = indexOf$2(_context = _this.observers[name]).call(_context, fn);

          if (index > -1) {
            var _context2;

            splice$2(_context2 = _this.observers[name]).call(_context2, index, 1);
          }
        };
      }
    }
  }, {
    key: "sendOnly",
    value: function sendOnly(name, args) {
      var obs = this.observers[name];

      if (obs) {
        forEach$2(obs).call(obs, function (fn) {
          try {
            fn.apply(undefined, args);
          } catch (error) {
            console.log(error, error.stack);
          }
        });
      }
    }
  }, {
    key: "send",
    value: function send(name, args) {
      this.sendOnly(name + BEFORE_EVENT, args);
      this.sendOnly(name, args);
      this.sendOnly(name + AFTER_EVENT, args);
    }
  }]);

  return EventHandler;
}();

/**
 * MIT License
 *
 * Copyright (c) 2017-present, Elasticsearch BV
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
var patchEventHandler = new EventHandler();
var alreadyPatched = false;

function patchAll() {
  if (!alreadyPatched) {
    alreadyPatched = true;
    patchXMLHttpRequest(function (event, task) {
      patchEventHandler.send(XMLHTTPREQUEST, [event, task]);
    });
    patchFetch(function (event, task) {
      patchEventHandler.send(FETCH, [event, task]);
    });
    patchHistory(function (event, task) {
      patchEventHandler.send(HISTORY, [event, task]);
    });
  }

  return patchEventHandler;
}

/**
 * MIT License
 *
 * Copyright (c) 2017-present, Elasticsearch BV
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
var __DEV__ = process.env.NODE_ENV !== 'production';

var PerformanceMonitoring =
/*#__PURE__*/
function () {
  function PerformanceMonitoring(apmServer, configService, loggingService, transactionService) {
    classCallCheck(this, PerformanceMonitoring);

    this._apmServer = apmServer;
    this._configService = configService;
    this._logginService = loggingService;
    this._transactionService = transactionService;
  }

  createClass(PerformanceMonitoring, [{
    key: "init",
    value: function init() {
      var _this = this;

      var flags = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      /**
       * We need to run this event listener after all of user-registered listener,
       * since this event listener adds the transaction to the queue to be send to APM Server.
       */
      this._configService.events.observe(TRANSACTION_END + AFTER_EVENT, function (tr) {
        var payload = _this.createTransactionPayload(tr);

        if (payload) {
          _this._apmServer.addTransaction(payload);
        } else if (__DEV__) {
          _this._logginService.debug('Could not create a payload from the Transaction', tr);
        }
      });

      if (flags[HISTORY]) {
        patchEventHandler.observe(HISTORY, this.getHistorySub());
      }

      if (flags[XMLHTTPREQUEST]) {
        patchEventHandler.observe(XMLHTTPREQUEST, this.getXHRSub());
      }

      if (flags[FETCH]) {
        patchEventHandler.observe(FETCH, this.getFetchSub());
      }
    }
  }, {
    key: "getHistorySub",
    value: function getHistorySub() {
      var transactionService = this._transactionService;
      return function (event, task) {
        if (task.source === HISTORY && event === INVOKE) {
          transactionService.startTransaction(task.data.title, 'route-change', {
            canReuse: true
          });
        }
      };
    }
  }, {
    key: "getXHRSub",
    value: function getXHRSub() {
      var _this2 = this;

      return function (event, task) {
        if (task.source === XMLHTTPREQUEST && !globalState.fetchInProgress) {
          _this2.processAPICalls(event, task);
        }
      };
    }
  }, {
    key: "getFetchSub",
    value: function getFetchSub() {
      var _this3 = this;

      return function (event, task) {
        if (task.source === FETCH) {
          _this3.processAPICalls(event, task);
        }
      };
    }
  }, {
    key: "processAPICalls",
    value: function processAPICalls(event, task) {
      var configService = this._configService;
      var transactionService = this._transactionService;

      if (event === SCHEDULE && task.data) {
        var requestUrl = new Url(task.data.url);
        var spanName = task.data.method + ' ' + (requestUrl.relative ? requestUrl.path : stripQueryStringFromUrl(requestUrl.href));
        var span = transactionService.startSpan(spanName, 'external.http');
        var taskId = transactionService.addTask();

        if (!span) {
          return;
        }

        var isDtEnabled = configService.get('distributedTracing');
        var dtOrigins = configService.get('distributedTracingOrigins');
        var currentUrl = new Url(window.location.href);
        var isSameOrigin = checkSameOrigin(requestUrl.origin, currentUrl.origin) || checkSameOrigin(requestUrl.origin, dtOrigins);
        var target = task.data.target;

        if (isDtEnabled && isSameOrigin && target) {
          this.injectDtHeader(span, target);
        }

        span.addContext({
          http: {
            method: task.data.method,
            url: requestUrl.href
          }
        });
        span.sync = task.data.sync;
        task.data.span = span;
        task.id = taskId;
      }

      if (event === INVOKE && task.data && task.data.span) {
        if (typeof task.data.target.status !== 'undefined') {
          task.data.span.addContext({
            http: {
              status_code: task.data.target.status
            }
          });
        } else if (task.data.response) {
          task.data.span.addContext({
            http: {
              status_code: task.data.response.status
            }
          });
        }

        task.data.span.end();
      }

      if (event === INVOKE && task.id) {
        transactionService.removeTask(task.id);
      }
    }
  }, {
    key: "injectDtHeader",
    value: function injectDtHeader(span, target) {
      var configService = this._configService;
      var headerName = configService.get('distributedTracingHeaderName');
      var headerValueCallback = configService.get('distributedTracingHeaderValueCallback');
      var headerValue = headerValueCallback(span);
      var isHeaderValid = isDtHeaderValid(headerValue);

      if (headerName && headerValue && isHeaderValid) {
        if (typeof target.setRequestHeader === 'function') {
          target.setRequestHeader(headerName, headerValue);
        } else if (target.headers && typeof target.headers.append === 'function') {
          target.headers.append(headerName, headerValue);
        } else {
          target[headerName] = headerValue;
        }
      }
    }
  }, {
    key: "extractDtHeader",
    value: function extractDtHeader(target) {
      var configService = this._configService;
      var headerName = configService.get('distributedTracingHeaderName');

      if (target) {
        return parseDtHeaderValue(target[headerName]);
      }
    }
  }, {
    key: "setTransactionContext",
    value: function setTransactionContext(transaction) {
      var context = this._configService.get('context');

      if (context) {
        transaction.addContext(context);
      }
    }
  }, {
    key: "filterTransaction",
    value: function filterTransaction(tr) {
      var transactionDurationThreshold = this._configService.get('transactionDurationThreshold');

      var duration = tr.duration();

      if (!duration) {
        if (__DEV__) {
          var message = 'Transaction was discarded! ';

          if (duration === 0) {
            message += "Transaction duration is 0";
          } else {
            message += "Transaction wasn't ended";
          }

          this._logginService.debug(message);
        }

        return false;
      }

      if (duration > transactionDurationThreshold) {
        if (__DEV__) {
          var _context;

          this._logginService.debug(concat$2(_context = "Transaction was discarded! Transaction duration (".concat(duration, ") is greater than the transactionDurationThreshold configuration (")).call(_context, transactionDurationThreshold, ")"));
        }

        return false;
      }

      if (tr.spans.length === 0) {
        if (__DEV__) {
          this._logginService.debug("Transaction was discarded! Transaction does not include any spans");
        }

        return false;
      }
      /**
       * In case of unsampled transaction, send only the transaction to apm server
       *  without any spans to reduce the payload size
       */


      if (!tr.sampled) {
        tr.resetSpans();
      }

      var browserResponsivenessInterval = this._configService.get('browserResponsivenessInterval');

      var checkBrowserResponsiveness = this._configService.get('checkBrowserResponsiveness');

      if (checkBrowserResponsiveness && !tr.isHardNavigation) {
        var buffer = this._configService.get('browserResponsivenessBuffer');

        var wasBrowserResponsive = this.checkBrowserResponsiveness(tr, browserResponsivenessInterval, buffer);

        if (!wasBrowserResponsive) {
          if (__DEV__) {
            this._logginService.debug('Transaction was discarded! Browser was not responsive enough during the transaction.', ' duration:', duration, ' browserResponsivenessCounter:', tr.browserResponsivenessCounter, 'interval:', browserResponsivenessInterval);
          }

          return false;
        }
      }

      return true;
    }
  }, {
    key: "adjustTransactionTime",
    value: function adjustTransactionTime(transaction) {
      /**
       * Adjust start time of the transaction
       */
      var spans = transaction.spans;
      var earliestSpan = getEarliestSpan(spans);

      if (earliestSpan && earliestSpan._start < transaction._start) {
        transaction._start = earliestSpan._start;
      }
      /**
       * Adjust end time of the transaction to match the latest
       * span end time
       */


      var latestSpan = getLatestNonXHRSpan(spans);

      if (latestSpan && latestSpan._end > transaction._end) {
        transaction._end = latestSpan._end;
      }
      /**
       * Set all spans that are longer than the transaction to
       * be truncated spans
       */


      var transactionEnd = transaction._end;

      for (var i = 0; i < spans.length; i++) {
        var span = spans[i];

        if (span._end > transactionEnd) {
          span._end = transactionEnd;
          span.type += '.truncated';
        }

        if (span._start > transactionEnd) {
          span._start = transactionEnd;
        }
      }
    }
  }, {
    key: "prepareTransaction",
    value: function prepareTransaction(transaction) {
      var _context2, _context3;

      sort$2(_context2 = transaction.spans).call(_context2, function (spanA, spanB) {
        return spanA._start - spanB._start;
      });

      if (this._configService.get('groupSimilarSpans')) {
        var similarSpanThreshold = this._configService.get('similarSpanThreshold');

        transaction.spans = this.groupSmallContinuouslySimilarSpans(transaction, similarSpanThreshold);
      }

      transaction.spans = filter$2(_context3 = transaction.spans).call(_context3, function (span) {
        return span.duration() > 0 && span._start >= transaction._start && span._end <= transaction._end;
      });
      this.setTransactionContext(transaction);
    }
  }, {
    key: "createTransactionDataModel",
    value: function createTransactionDataModel(transaction) {
      var _context4;

      var configContext = this._configService.get('context');

      var transactionStart = transaction._start;

      var spans = map$2(_context4 = transaction.spans).call(_context4, function (span) {
        var spanData = {
          id: span.id,
          transaction_id: transaction.id,
          parent_id: span.parentId || transaction.id,
          trace_id: transaction.traceId,
          name: span.name,
          type: span.type,
          subType: span.subType,
          action: span.action,
          sync: span.sync,
          start: span._start - transactionStart,
          duration: span.duration(),
          context: span.context
        };
        return truncateModel(SPAN_MODEL, spanData);
      });

      var context = merge({}, configContext, transaction.context);
      var transactionData = {
        id: transaction.id,
        trace_id: transaction.traceId,
        name: transaction.name,
        type: transaction.type,
        duration: transaction.duration(),
        spans: spans,
        context: context,
        marks: transaction.marks,
        span_count: {
          started: spans.length
        },
        sampled: transaction.sampled
      };
      return truncateModel(TRANSACTION_MODEL, transactionData);
    }
  }, {
    key: "createTransactionPayload",
    value: function createTransactionPayload(transaction) {
      this.adjustTransactionTime(transaction);
      this.prepareTransaction(transaction);
      var filtered = this.filterTransaction(transaction);

      if (filtered) {
        return this.createTransactionDataModel(transaction);
      }
    }
  }, {
    key: "convertTransactionsToServerModel",
    value: function convertTransactionsToServerModel(transactions) {
      var _this4 = this;

      return map$2(transactions).call(transactions, function (tr) {
        return _this4.createTransactionDataModel(tr);
      });
    }
  }, {
    key: "groupSmallContinuouslySimilarSpans",
    value: function groupSmallContinuouslySimilarSpans(transaction, threshold) {
      var _context5;

      var transDuration = transaction.duration();
      var spans = [];
      var lastCount = 1;

      forEach$2(_context5 = transaction.spans).call(_context5, function (span, index) {
        if (spans.length === 0) {
          spans.push(span);
        } else {
          var lastSpan = spans[spans.length - 1];
          var isContinuouslySimilar = lastSpan.type === span.type && lastSpan.subType === span.subType && lastSpan.action === span.action && lastSpan.name === span.name && span.duration() / transDuration < threshold && (span._start - lastSpan._end) / transDuration < threshold;
          var isLastSpan = transaction.spans.length === index + 1;

          if (isContinuouslySimilar) {
            lastCount++;
            lastSpan._end = span._end;
          }

          if (lastCount > 1 && (!isContinuouslySimilar || isLastSpan)) {
            lastSpan.name = lastCount + 'x ' + lastSpan.name;
            lastCount = 1;
          }

          if (!isContinuouslySimilar) {
            spans.push(span);
          }
        }
      });

      return spans;
    }
  }, {
    key: "checkBrowserResponsiveness",
    value: function checkBrowserResponsiveness(transaction, interval, buffer) {
      var counter = transaction.browserResponsivenessCounter;

      if (typeof interval === 'undefined' || typeof counter === 'undefined') {
        return true;
      }

      var duration = transaction.duration();
      var expectedCount = Math.floor(duration / interval);
      var wasBrowserResponsive = counter + buffer >= expectedCount;
      return wasBrowserResponsive;
    }
  }]);

  return PerformanceMonitoring;
}();

var setInterval = path.setInterval;

var setInterval$1 = setInterval;

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

var assertThisInitialized = _assertThisInitialized;

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof_1(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

var possibleConstructorReturn = _possibleConstructorReturn;

var getPrototypeOf$3 = getPrototypeOf;

var getPrototypeOf$4 = getPrototypeOf$3;

var setPrototypeOf$3 = setPrototypeOf;

var setPrototypeOf$4 = setPrototypeOf$3;

var getPrototypeOf$5 = createCommonjsModule(function (module) {
  function _getPrototypeOf(o) {
    module.exports = _getPrototypeOf = setPrototypeOf$4 ? getPrototypeOf$4 : function _getPrototypeOf(o) {
      return o.__proto__ || getPrototypeOf$4(o);
    };
    return _getPrototypeOf(o);
  }

  module.exports = _getPrototypeOf;
});

var create$3 = create;

var create$4 = create$3;

var setPrototypeOf$5 = createCommonjsModule(function (module) {
  function _setPrototypeOf(o, p) {
    module.exports = _setPrototypeOf = setPrototypeOf$4 || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  module.exports = _setPrototypeOf;
});

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = create$4(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf$5(subClass, superClass);
}

var inherits = _inherits;

// https://tc39.github.io/ecma262/#sec-date.now

_export({
  target: 'Date',
  stat: true
}, {
  now: function now() {
    return new Date().getTime();
  }
});

var now = path.Date.now;

var now$1 = now;

var now$2 = now$1;

var SpanBase =
/*#__PURE__*/
function () {
  // context
  function SpanBase(name, type) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    classCallCheck(this, SpanBase);

    /**
     * Check for undefined and empty string
     */
    if (!name) {
      name = NAME_UNKNOWN;
    }

    if (!type) {
      type = TYPE_CUSTOM;
    }

    this.options = options;
    this.name = name;
    this.type = type;
    this.id = this.options.id || generateRandomId(16);
    this.traceId = this.options.traceId;
    this.sampled = this.options.sampled;
    this.timestamp = this.options.timestamp || now$2();
    this.ended = false;
    this._start = window.performance.now();
    this._end = undefined;
    this.onEnd = this.options.onEnd;
  }

  createClass(SpanBase, [{
    key: "ensureContext",
    value: function ensureContext() {
      if (!this.context) {
        this.context = {};
      }
    }
  }, {
    key: "addTags",
    value: function addTags(tags) {
      console.warn('addTags deprecated, please use addLabels');
      this.addLabels(tags);
    }
  }, {
    key: "addLabels",
    value: function addLabels(tags) {
      this.ensureContext();
      var ctx = this.context;

      if (!ctx.tags) {
        ctx.tags = {};
      }

      var keys = keys$6(tags);

      forEach$2(keys).call(keys, function (k) {
        return setLabel(k, tags[k], ctx.tags);
      });
    }
  }, {
    key: "addContext",
    value: function addContext(context) {
      if (!context) return;
      this.ensureContext();
      merge(this.context, context);
    }
  }, {
    key: "end",
    value: function end() {
      if (this.ended) {
        return;
      }

      this.ended = true;
      this._end = window.performance.now();
      this.callOnEnd();
    }
  }, {
    key: "callOnEnd",
    value: function callOnEnd() {
      if (typeof this.onEnd === 'function') {
        this.onEnd(this);
      }
    }
  }, {
    key: "duration",
    value: function duration() {
      if (isUndefined(this._end) || isUndefined(this._start)) {
        return null;
      }

      var diff = this._end - this._start;
      return _parseFloat$3(diff);
    }
  }]);

  return SpanBase;
}();

var Span =
/*#__PURE__*/
function (_SpanBase) {
  inherits(Span, _SpanBase);

  function Span(name, type, options) {
    var _context;

    var _this;

    classCallCheck(this, Span);

    _this = possibleConstructorReturn(this, getPrototypeOf$5(Span).call(this, name, type, options));
    _this.parentId = _this.options.parentId;
    _this.subType = undefined;
    _this.action = undefined;

    if (indexOf$2(_context = _this.type).call(_context, '.') !== -1) {
      var fields = _this.type.split('.', 3);

      _this.type = fields[0];
      _this.subType = fields[1];
      _this.action = fields[2];
    }

    _this.sync = _this.options.sync;
    return _this;
  }

  return Span;
}(SpanBase);

var Transaction =
/*#__PURE__*/
function (_SpanBase) {
  inherits(Transaction, _SpanBase);

  function Transaction(name, type, options) {
    var _this;

    classCallCheck(this, Transaction);

    _this = possibleConstructorReturn(this, getPrototypeOf$5(Transaction).call(this, name, type, options));
    _this.traceId = generateRandomId();
    _this.marks = undefined;
    _this.spans = [];
    _this._activeSpans = {};
    _this.nextAutoTaskId = 1;
    _this._scheduledTasks = [];
    _this.isHardNavigation = false;
    _this.sampled = Math.random() <= _this.options.transactionSampleRate;
    return _this;
  }

  createClass(Transaction, [{
    key: "addMarks",
    value: function addMarks(obj) {
      this.marks = merge(this.marks || {}, obj);
    }
  }, {
    key: "mark",
    value: function mark(key) {
      var skey = removeInvalidChars(key);

      var now = window.performance.now() - this._start;

      var custom = {};
      custom[skey] = now;
      this.addMarks({
        custom: custom
      });
    }
  }, {
    key: "canReuse",
    value: function canReuse() {
      var threshold = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : REUSABILITY_THRESHOLD;
      return !!this.options.canReuse && !this.ended && performance.now() - this._start < threshold; // To avoid a stale transaction capture everything
    }
  }, {
    key: "redefine",
    value: function redefine(name, type, options) {
      if (name) {
        this.name = name;
      }

      if (type) {
        this.type = type;
      }

      if (options) {
        this.options = extend(this.options, options);
      }
    }
  }, {
    key: "startSpan",
    value: function startSpan(name, type, options) {
      var _this2 = this;

      if (this.ended) {
        return;
      }

      var opts = extend({}, options);

      opts.onEnd = function (trc) {
        _this2._onSpanEnd(trc);
      };

      opts.traceId = this.traceId;
      opts.sampled = this.sampled;

      if (!opts.parentId) {
        opts.parentId = this.id;
      }

      var span = new Span(name, type, opts);
      this._activeSpans[span.id] = span;
      return span;
    }
  }, {
    key: "isFinished",
    value: function isFinished() {
      return this._scheduledTasks.length === 0;
    }
  }, {
    key: "detectFinish",
    value: function detectFinish() {
      if (this.isFinished()) this.end();
    }
  }, {
    key: "end",
    value: function end() {
      if (this.ended) {
        return;
      }

      this.ended = true;
      this._end = window.performance.now(); // truncate active spans

      for (var sid in this._activeSpans) {
        var span = this._activeSpans[sid];
        span.type = span.type + '.truncated';
        span.end();
      }

      var metadata = getPageMetadata();
      this.addContext(metadata);
      this.callOnEnd();
    }
  }, {
    key: "addTask",
    value: function addTask(taskId) {
      var _context;

      if (typeof taskId === 'undefined') {
        taskId = 'task' + this.nextAutoTaskId++;
      }

      if (indexOf$2(_context = this._scheduledTasks).call(_context, taskId) == -1) {
        this._scheduledTasks.push(taskId);

        return taskId;
      }
    }
  }, {
    key: "removeTask",
    value: function removeTask(taskId) {
      var _context2;

      var index = indexOf$2(_context2 = this._scheduledTasks).call(_context2, taskId);

      if (index > -1) {
        var _context3;

        splice$2(_context3 = this._scheduledTasks).call(_context3, index, 1);
      }

      this.detectFinish();
    }
  }, {
    key: "resetSpans",
    value: function resetSpans() {
      this.spans = [];
    }
  }, {
    key: "_onSpanEnd",
    value: function _onSpanEnd(span) {
      this.spans.push(span); // Remove span from _activeSpans

      delete this._activeSpans[span.id];
    }
  }]);

  return Transaction;
}(SpanBase);

/**
 * Navigation Timing Spans
 *
 * eventPairs[0] -> start time of span
 * eventPairs[1] -> end time of span
 * eventPairs[2] -> name of the span
 */

var eventPairs = [['domainLookupStart', 'domainLookupEnd', 'Domain lookup'], ['connectStart', 'connectEnd', 'Making a connection to the server'], ['requestStart', 'responseEnd', 'Requesting and receiving the document'], ['domLoading', 'domInteractive', 'Parsing the document, executing sync. scripts'], ['domContentLoadedEventStart', 'domContentLoadedEventEnd', 'Fire "DOMContentLoaded" event'], ['loadEventStart', 'loadEventEnd', 'Fire "load" event']];
/**
 * start, end, baseTime - unsigned long long(PerformanceTiming)
 * representing the moment, in milliseconds since the UNIX epoch
 *
 * transactionEnd - DOMHighResTimeStamp, measured in milliseconds.
 *
 * We have to convert the long values in milliseconds before doing the comparision
 * eg: end - baseTime <= transactionEnd
 */

function shouldCreateSpan(start, end, baseTime, transactionEnd) {
  return typeof start === 'number' && typeof end === 'number' && start >= baseTime && end > start && end - baseTime <= transactionEnd && end - start < MAX_SPAN_DURATION && start - baseTime < MAX_SPAN_DURATION && end - baseTime < MAX_SPAN_DURATION;
}
/**
 * Both Navigation and Resource timing level 2 exposes these below information
 *
 * for CORS requests without Timing-Allow-Origin header, transferSize & encodedBodySize will be 0
 */


function getResponseContext(perfTimingEntry) {
  var transferSize = perfTimingEntry.transferSize,
      encodedBodySize = perfTimingEntry.encodedBodySize,
      decodedBodySize = perfTimingEntry.decodedBodySize,
      serverTiming = perfTimingEntry.serverTiming;
  var respContext = {
    transfer_size: transferSize,
    encoded_body_size: encodedBodySize,
    decoded_body_size: decodedBodySize
  };
  var serverTimingStr = getServerTimingInfo(serverTiming);

  if (serverTimingStr) {
    respContext.headers = {
      'server-timing': serverTimingStr
    };
  }

  return respContext;
}

function createNavigationTimingSpans(timings, baseTime, transactionEnd) {
  var spans = [];

  for (var i = 0; i < eventPairs.length; i++) {
    var start = timings[eventPairs[i][0]];
    var end = timings[eventPairs[i][1]];

    if (!shouldCreateSpan(start, end, baseTime, transactionEnd)) {
      continue;
    }

    var span = new Span(eventPairs[i][2], 'hard-navigation.browser-timing');

    if (eventPairs[i][0] === 'requestStart') {
      span.pageResponse = true;
    }

    span._start = start - baseTime;
    span.ended = true;
    span._end = end - baseTime;
    spans.push(span);
  }

  return spans;
}

function createResourceTimingSpan(resourceTimingEntry) {
  var name = resourceTimingEntry.name,
      initiatorType = resourceTimingEntry.initiatorType,
      startTime = resourceTimingEntry.startTime,
      responseEnd = resourceTimingEntry.responseEnd;
  var kind = 'resource';

  if (initiatorType) {
    kind += '.' + initiatorType;
  }

  var spanName = stripQueryStringFromUrl(name);
  var span = new Span(spanName, kind);
  /**
   * Add context information for spans
   */

  span.addContext({
    http: {
      url: name,
      response: getResponseContext(resourceTimingEntry)
    }
  });
  span._start = startTime;
  span.end();
  span._end = responseEnd;
  return span;
}

function createResourceTimingSpans(entries, filterUrls, transactionEnd) {
  var spans = [];

  for (var i = 0; i < entries.length; i++) {
    var _entries$i = entries[i],
        initiatorType = _entries$i.initiatorType,
        name = _entries$i.name,
        startTime = _entries$i.startTime,
        responseEnd = _entries$i.responseEnd;
    /**
     * Skipping the timing information of API calls because of auto patching XHR and Fetch
     */

    if (initiatorType === 'xmlhttprequest' || initiatorType === 'fetch' || !name) {
      continue;
    }
    /**
     * Create spans for all known resource initiator types
     */


    if (indexOf$2(RESOURCE_INITIATOR_TYPES).call(RESOURCE_INITIATOR_TYPES, initiatorType) !== -1) {
      if (!shouldCreateSpan(startTime, responseEnd, 0, transactionEnd)) {
        continue;
      }

      spans.push(createResourceTimingSpan(entries[i]));
    } else {
      /**
       * Since IE does not support initiatorType in Resource timing entry,
       * We have to manually filter the API calls from creating duplicate Spans
       *
       * Skip span creation if initiatorType is other than known types specified as part of RESOURCE_INITIATOR_TYPES
       * The reason being, there are other types like embed, video, audio, navigation etc
       *
       * Check the below webplatform test to know more
       * https://github.com/web-platform-tests/wpt/blob/b0020d5df18998609b38786878f7a0b92cc680aa/resource-timing/resource_initiator_types.html#L93
       */
      if (initiatorType != null) {
        continue;
      }

      var foundAjaxReq = false;

      for (var j = 0; j < filterUrls.length; j++) {
        var idx = lastIndexOf$2(name).call(name, filterUrls[j]);

        if (idx > -1 && idx === name.length - filterUrls[j].length) {
          foundAjaxReq = true;
          break;
        }
      }
      /**
       * Create span if its not an ajax request
       */


      if (!foundAjaxReq && shouldCreateSpan(startTime, responseEnd, 0, transactionEnd)) {
        spans.push(createResourceTimingSpan(entries[i]));
      }
    }
  }

  return spans;
}

function createUserTimingSpans(entries, transactionEnd) {
  var userTimingSpans = [];

  for (var i = 0; i < entries.length; i++) {
    var _entries$i2 = entries[i],
        name = _entries$i2.name,
        startTime = _entries$i2.startTime,
        duration = _entries$i2.duration;
    var end = startTime + duration;

    if (duration <= USER_TIMING_THRESHOLD || !shouldCreateSpan(startTime, end, 0, transactionEnd)) {
      continue;
    }

    var kind = 'app';
    var span = new Span(name, kind);
    span._start = startTime;
    span.end();
    span._end = end;
    userTimingSpans.push(span);
  }

  return userTimingSpans;
}

function captureHardNavigation(transaction) {
  var perf = window.performance;

  if (transaction.isHardNavigation && perf && perf.timing) {
    var _context2;

    var timings = perf.timing;

    if (transaction.marks && transaction.marks.custom) {
      var _context;

      var customMarks = transaction.marks.custom;

      forEach$2(_context = keys$6(customMarks)).call(_context, function (key) {
        customMarks[key] += transaction._start;
      });
    } // must be zero otherwise the calculated relative _start time would be wrong


    transaction._start = 0;
    /**
     * Threshold that decides if the span must be
     * captured as part of the page load transaction
     *
     * Denotes the time when the onload event fires
     */

    var transactionEnd = transaction._end;

    forEach$2(_context2 = createNavigationTimingSpans(timings, timings.fetchStart, transactionEnd)).call(_context2, function (span) {
      span.traceId = transaction.traceId;
      span.sampled = transaction.sampled;

      if (span.pageResponse && transaction.options.pageLoadSpanId) {
        span.id = transaction.options.pageLoadSpanId;
      }

      transaction.spans.push(span);
    });
    /**
     * capture resource timing information as Spans during page load transaction
     */


    if (typeof perf.getEntriesByType === 'function') {
      var _context3, _context4;

      var resourceEntries = perf.getEntriesByType('resource');
      var ajaxUrls = [];

      for (var i = 0; i < transaction.spans; i++) {
        var span = transaction.spans[i];

        if (span.type === 'external' && span.subType === 'http') {
          continue;
        }

        ajaxUrls.push(span.name.split(' ')[1]);
      }

      forEach$2(_context3 = createResourceTimingSpans(resourceEntries, ajaxUrls, transactionEnd)).call(_context3, function (span) {
        return transaction.spans.push(span);
      });

      var userEntries = perf.getEntriesByType('measure');

      forEach$2(_context4 = createUserTimingSpans(userEntries, transactionEnd)).call(_context4, function (span) {
        return transaction.spans.push(span);
      });
      /**
       * Add transaction context information from performance navigation timing entry level 2 API
       */


      var navigationEntry = perf.getEntriesByType('navigation');

      if (navigationEntry && navigationEntry.length > 0) {
        navigationEntry = navigationEntry[0];
        transaction.addContext({
          response: getResponseContext(navigationEntry)
        });
      }
    }
  }
}

var TransactionService =
/*#__PURE__*/
function () {
  function TransactionService(logger, config) {
    classCallCheck(this, TransactionService);

    if (__DEV__ && typeof config === 'undefined') {
      logger.debug('TransactionService: config is not provided');
    }

    this._config = config;
    this._logger = logger;
    this.currentTransaction = undefined;
    this._alreadyCapturedPageLoad = false;
  }

  createClass(TransactionService, [{
    key: "ensureCurrentTransaction",
    value: function ensureCurrentTransaction(options) {
      if (!options) {
        options = this.createPerfOptions();
      }

      var tr = this.getCurrentTransaction();

      if (tr) {
        return tr;
      } else {
        options.canReuse = true;
        return this.createTransaction(undefined, undefined, options);
      }
    }
  }, {
    key: "getCurrentTransaction",
    value: function getCurrentTransaction() {
      if (this.currentTransaction && !this.currentTransaction.ended) {
        return this.currentTransaction;
      }
    }
  }, {
    key: "setCurrentTransaction",
    value: function setCurrentTransaction(value) {
      this.currentTransaction = value;
    }
  }, {
    key: "createTransaction",
    value: function createTransaction(name, type, options) {
      var tr = new Transaction(name, type, options);
      this.setCurrentTransaction(tr);

      if (options.checkBrowserResponsiveness) {
        this.startCounter(tr);
      }

      return tr;
    }
  }, {
    key: "startCounter",
    value: function startCounter(transaction) {
      transaction.browserResponsivenessCounter = 0;

      var interval = this._config.get('browserResponsivenessInterval');

      if (typeof interval === 'undefined') {
        if (__DEV__) {
          this._logger.debug('browserResponsivenessInterval is undefined!');
        }

        return;
      }

      var id = setInterval$1(function () {
        if (transaction.ended) {
          window.clearInterval(id);
        } else {
          transaction.browserResponsivenessCounter++;
        }
      }, interval);
    }
  }, {
    key: "capturePageLoadMetrics",
    value: function capturePageLoadMetrics(tr) {
      var capturePageLoad = this._config.get('capturePageLoad');

      if (capturePageLoad && !this._alreadyCapturedPageLoad && tr.isHardNavigation) {
        captureHardNavigation(tr);
        tr.addMarks(getPageLoadMarks());
        self._alreadyCapturedPageLoad = true;
        return true;
      }
    }
  }, {
    key: "createPerfOptions",
    value: function createPerfOptions(options) {
      var config = this._config.config;
      return extend({
        pageLoadTraceId: config.pageLoadTraceId,
        pageLoadSampled: config.pageLoadSampled,
        pageLoadSpanId: config.pageLoadSpanId,
        pageLoadTransactionName: config.pageLoadTransactionName,
        transactionSampleRate: config.transactionSampleRate,
        checkBrowserResponsiveness: config.checkBrowserResponsiveness
      }, options);
    }
  }, {
    key: "startTransaction",
    value: function startTransaction(name, type, options) {
      var _this = this;

      var perfOptions = this.createPerfOptions(options);
      var tr = this.getCurrentTransaction();

      if (!tr) {
        tr = this.createTransaction(name, type, perfOptions);
      } else if (tr.canReuse() && perfOptions.canReuse) {
        /*
         * perfOptions could also have `canReuse:true` in which case we
         * allow a redefinition until there's a call that doesn't have that
         * or the threshold is exceeded.
         */
        if (__DEV__) {
          this._logger.debug('Redefining the current transaction', tr, name, type, perfOptions);
        }
        /**
         * We want to keep the type in it's original value, therefore,
         * passing undefined as type. For example, in the case of a page-load
         * we want to keep the type but redefine the name to the first route.
         */


        tr.redefine(name, undefined, perfOptions);
      } else {
        if (__DEV__) {
          this._logger.debug('Ending old transaction', tr);
        }

        tr.end();
        tr = this.createTransaction(name, type, perfOptions);
      }

      if (type === PAGE_LOAD) {
        tr.isHardNavigation = true;

        if (perfOptions.pageLoadTraceId) {
          tr.traceId = perfOptions.pageLoadTraceId;
        }

        if (perfOptions.pageLoadSampled) {
          tr.sampled = perfOptions.pageLoadSampled;
        }
        /**
         * The name must be set as soon as the transaction is started
         * Ex: Helps to decide sampling based on name
         */


        if (tr.name === NAME_UNKNOWN && perfOptions.pageLoadTransactionName) {
          tr.name = perfOptions.pageLoadTransactionName;
        }
      }

      if (__DEV__) {
        this._logger.debug('TransactionService.startTransaction', tr);
      }

      this._config.events.send(TRANSACTION_START, [tr]);

      tr.onEnd = function () {
        return es6Promise_1.resolve().then(function () {
          if (__DEV__) {
            _this._logger.debug('TransactionService transaction finished', tr);
          }

          if (_this.shouldIgnoreTransaction(tr.name)) {
            return;
          }

          if (tr.type === PAGE_LOAD) {
            /**
             * Setting the pageLoadTransactionName via configService.setConfig after
             * transaction has started should also reflect the correct name.
             */
            var pageLoadTransactionName = _this._config.get('pageLoadTransactionName');

            if (tr.name === NAME_UNKNOWN && pageLoadTransactionName) {
              tr.name = pageLoadTransactionName;
            }

            var captured = _this.capturePageLoadMetrics(tr);

            if (captured) {
              _this.add(tr);
            }
          } else {
            _this.add(tr);
          }
        }, function (err) {
          if (__DEV__) {
            _this._logger.debug('TransactionService transaction onEnd', err);
          }
        });
      };

      return tr;
    }
  }, {
    key: "shouldIgnoreTransaction",
    value: function shouldIgnoreTransaction(transactionName) {
      var ignoreList = this._config.get('ignoreTransactions');

      if (ignoreList && ignoreList.length) {
        for (var i = 0; i < ignoreList.length; i++) {
          var element = ignoreList[i];

          if (typeof element.test === 'function') {
            if (element.test(transactionName)) {
              return true;
            }
          } else if (element === transactionName) {
            return true;
          }
        }
      }

      return false;
    }
  }, {
    key: "startSpan",
    value: function startSpan(name, type, options) {
      var trans = this.ensureCurrentTransaction();

      if (trans) {
        if (__DEV__) {
          this._logger.debug('TransactionService.startSpan', name, type);
        }

        var span = trans.startSpan(name, type, options);
        return span;
      }
    }
  }, {
    key: "add",
    value: function add(transaction) {
      this._config.events.send(TRANSACTION_END, [transaction]);

      if (__DEV__) {
        this._logger.debug('TransactionService.add', transaction);
      }
    }
  }, {
    key: "addTask",
    value: function addTask(taskId) {
      var tr = this.ensureCurrentTransaction();

      if (tr) {
        var taskId = tr.addTask(taskId);

        if (__DEV__) {
          this._logger.debug('TransactionService.addTask', taskId);
        }
      }

      return taskId;
    }
  }, {
    key: "removeTask",
    value: function removeTask(taskId) {
      var tr = this.getCurrentTransaction();

      if (tr) {
        tr.removeTask(taskId);

        if (__DEV__) {
          this._logger.debug('TransactionService.removeTask', taskId);
        }
      }
    }
  }, {
    key: "detectFinish",
    value: function detectFinish() {
      var tr = this.getCurrentTransaction();

      if (tr) {
        tr.detectFinish();

        if (__DEV__) {
          this._logger.debug('TransactionService.detectFinish');
        }
      }
    }
  }]);

  return TransactionService;
}();

/**
 * MIT License
 *
 * Copyright (c) 2017-present, Elasticsearch BV
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
var PerformanceMonitoring$1 = {
  PerformanceMonitoring: PerformanceMonitoring,
  registerServices: function registerServices(serviceFactory) {
    serviceFactory.registerServiceCreator('TransactionService', function () {
      var configService = serviceFactory.getService('ConfigService');
      var loggingService = serviceFactory.getService('LoggingService');
      return new TransactionService(loggingService, configService);
    });
    serviceFactory.registerServiceCreator('PerformanceMonitoring', function () {
      var configService = serviceFactory.getService('ConfigService');
      var loggingService = serviceFactory.getService('LoggingService');
      var apmService = serviceFactory.getService('ApmServer');
      var transactionService = serviceFactory.getService('TransactionService');
      return new PerformanceMonitoring(apmService, configService, loggingService, transactionService);
    });
  }
};

/**
 * MIT License
 *
 * Copyright (c) 2017-present, Elasticsearch BV
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
var Queue =
/*#__PURE__*/
function () {
  function Queue(onFlush, opts) {
    classCallCheck(this, Queue);

    if (!opts) opts = {};
    this.onFlush = onFlush;
    this.items = [];
    this.queueLimit = opts.queueLimit || -1;
    this.flushInterval = opts.flushInterval || 0;
    this.timeoutId = undefined;
  }

  createClass(Queue, [{
    key: "_setTimer",
    value: function _setTimer() {
      var _this = this;

      this.timeoutId = setTimeout$1(function () {
        _this.flush();
      }, this.flushInterval);
    }
  }, {
    key: "flush",
    value: function flush() {
      this.onFlush(this.items);

      this._clear();
    }
  }, {
    key: "_clear",
    value: function _clear() {
      if (typeof this.timeoutId !== 'undefined') {
        clearTimeout(this.timeoutId);
        this.timeoutId = undefined;
      }

      this.items = [];
    }
  }, {
    key: "add",
    value: function add(item) {
      this.items.push(item);

      if (this.queueLimit !== -1 && this.items.length >= this.queueLimit) {
        this.flush();
      } else {
        if (typeof this.timeoutId === 'undefined') {
          this._setTimer();
        }
      }
    }
  }]);

  return Queue;
}();

/**
 * MIT License
 *
 * Copyright (c) 2017-present, Elasticsearch BV
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
function throttle(fn, onThrottle, opts) {
  var context = opts.context || this;
  var limit = opts.limit;
  var interval = opts.interval;

  var countFn = opts.countFn || function () {};

  var counter = 0;
  var timeoutId;
  return function () {
    var count = typeof countFn === 'function' && countFn.apply(context, arguments);

    if (typeof count !== 'number') {
      count = 1;
    }

    counter = counter + count;

    if (typeof timeoutId === 'undefined') {
      timeoutId = setTimeout$1(function () {
        counter = 0;
        timeoutId = undefined;
      }, interval);
    }

    if (counter > limit) {
      if (typeof onThrottle === 'function') {
        return onThrottle.apply(context, arguments);
      }
    } else {
      return fn.apply(context, arguments);
    }
  };
}

/**
 * MIT License
 *
 * Copyright (c) 2017-present, Elasticsearch BV
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
var NDJSON =
/*#__PURE__*/
function () {
  function NDJSON() {
    classCallCheck(this, NDJSON);
  }

  createClass(NDJSON, null, [{
    key: "stringify",
    value: function stringify(object) {
      return stringify$2(object) + '\n';
    }
  }]);

  return NDJSON;
}();

var ApmServer =
/*#__PURE__*/
function () {
  function ApmServer(configService, loggingService) {
    classCallCheck(this, ApmServer);

    this._configService = configService;
    this._loggingService = loggingService;
    this.errorQueue = undefined;
    this.transactionQueue = undefined;
    this.throttleAddError = undefined;
    this.throttleAddTransaction = undefined;
    this.initialized = false;
    this.ndjsonSpan = {};
  }

  createClass(ApmServer, [{
    key: "init",
    value: function init() {
      if (this.initialized) {
        return;
      }

      this.initialized = true;
      this.initErrorQueue();
      this.initTransactionQueue();
    }
  }, {
    key: "createMetaData",
    value: function createMetaData() {
      var cfg = this._configService;
      var metadata = {
        service: {
          name: cfg.get('serviceName'),
          version: cfg.get('serviceVersion'),
          agent: {
            name: 'js-base',
            version: cfg.version
          },
          language: {
            name: 'javascript'
          },
          environment: cfg.get('environment')
        }
      };
      return truncateModel(METADATA_MODEL, metadata);
    }
  }, {
    key: "_postJson",
    value: function _postJson(endPoint, payload) {
      return this._makeHttpRequest('POST', endPoint, payload, {
        'Content-Type': 'application/x-ndjson'
      });
    }
  }, {
    key: "_constructError",
    value: function _constructError(reason) {
      var url = reason.url,
          status = reason.status,
          responseText = reason.responseText;
      var message = url + ' HTTP status: ' + status;

      if (__DEV__ && responseText) {
        try {
          var serverErrors = [];
          var response = JSON.parse(responseText);

          if (response.errors && response.errors.length > 0) {
            var _context;

            forEach$2(_context = response.errors).call(_context, function (err) {
              return serverErrors.push(err.message);
            });

            message += ' ' + serverErrors.join(',');
          }
        } catch (e) {
          this._loggingService.debug('Error parsing response from APM server', e);
        }
      }

      return new Error(message);
    }
  }, {
    key: "_makeHttpRequest",
    value: function _makeHttpRequest(method, url, payload, headers) {
      return new es6Promise_1(function (resolve, reject) {
        var xhr = new window.XMLHttpRequest();
        xhr[XHR_IGNORE] = true;
        xhr.open(method, url, true);
        xhr.timeout = 10000;

        if (headers) {
          for (var header in headers) {
            if (headers.hasOwnProperty(header)) {
              xhr.setRequestHeader(header, headers[header]);
            }
          }
        }

        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            var status = xhr.status,
                responseText = xhr.responseText; // An http 4xx or 5xx error. Signal an error.

            if (status === 0 || status > 399 && status < 600) {
              reject({
                url: url,
                status: status,
                responseText: responseText
              });
            } else {
              resolve(responseText);
            }
          }
        };

        xhr.onerror = function () {
          var status = xhr.status,
              responseText = xhr.responseText;
          reject({
            url: url,
            status: status,
            responseText: responseText
          });
        };

        xhr.send(payload);
      });
    }
  }, {
    key: "_createQueue",
    value: function _createQueue(onFlush) {
      var queueLimit = this._configService.get('queueLimit');

      var flushInterval = this._configService.get('flushInterval');

      return new Queue(onFlush, {
        queueLimit: queueLimit,
        flushInterval: flushInterval
      });
    }
  }, {
    key: "initErrorQueue",
    value: function initErrorQueue() {
      var _this = this,
          _context2;

      if (this.errorQueue) {
        this.errorQueue.flush();
      }

      this.errorQueue = this._createQueue(function (errors) {
        var p = _this.sendErrors(errors);

        if (p) {
          p.catch(function (reason) {
            _this._loggingService.warn('Failed sending errors!', _this._constructError(reason));
          });
        }
      });

      var limit = this._configService.get('errorThrottleLimit');

      var interval = this._configService.get('errorThrottleInterval');

      this.throttleAddError = throttle(bind$2(_context2 = this.errorQueue.add).call(_context2, this.errorQueue), function () {
        return _this._loggingService.warn('Dropped error due to throttling!');
      }, {
        limit: limit,
        interval: interval
      });
    }
  }, {
    key: "initTransactionQueue",
    value: function initTransactionQueue() {
      var _this2 = this,
          _context3;

      if (this.transactionQueue) {
        this.transactionQueue.flush();
      }

      this.transactionQueue = this._createQueue(function (transactions) {
        var p = _this2.sendTransactions(transactions);

        if (p) {
          p.catch(function (reason) {
            _this2._loggingService.warn('Failed sending transactions!', _this2._constructError(reason));
          });
        }
      });

      var limit = this._configService.get('transactionThrottleLimit');

      var interval = this._configService.get('transactionThrottleInterval');

      this.throttleAddTransaction = throttle(bind$2(_context3 = this.transactionQueue.add).call(_context3, this.transactionQueue), function () {
        return _this2._loggingService.warn('Dropped transaction due to throttling!');
      }, {
        limit: limit,
        interval: interval
      });
    }
  }, {
    key: "addError",
    value: function addError(error) {
      if (!this.errorQueue) {
        this.initErrorQueue();
      }

      this.throttleAddError(error);
    }
  }, {
    key: "addTransaction",
    value: function addTransaction(transaction) {
      if (!this.transactionQueue) {
        this.initTransactionQueue();
      }

      this.throttleAddTransaction(transaction);
    }
  }, {
    key: "ndjsonErrors",
    value: function ndjsonErrors(errors) {
      return map$2(errors).call(errors, function (error) {
        return NDJSON.stringify({
          error: error
        });
      });
    }
  }, {
    key: "ndjsonTransactions",
    value: function ndjsonTransactions(transactions) {
      var ndjsonSpan = this.ndjsonSpan;
      return map$2(transactions).call(transactions, function (tr) {
        var spans = '';

        if (tr.spans) {
          var _context4;

          spans = map$2(_context4 = tr.spans).call(_context4, function (sp) {
            ndjsonSpan.span = sp;
            return NDJSON.stringify(ndjsonSpan);
          }).join('');
          delete tr.spans;
        }

        return NDJSON.stringify({
          transaction: tr
        }) + spans;
      });
    }
  }, {
    key: "_send",
    value: function _send() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'transaction';

      if (data.length === 0) {
        return;
      }

      var _this$createMetaData = this.createMetaData(),
          service = _this$createMetaData.service;

      var payload = {
        service: service,
        data: data
      };

      var filteredPayload = this._configService.applyFilters(payload);

      if (!filteredPayload) {
        this._loggingService.warn('Dropped payload due to filtering!');

        return;
      }

      var endPoint = this._configService.getEndpointUrl();

      var ndjson;

      if (type === 'errors') {
        ndjson = this.ndjsonErrors(filteredPayload.data);
      } else if (type === 'transaction') {
        ndjson = this.ndjsonTransactions(filteredPayload.data);
      } else {
        if (__DEV__) {
          this._loggingService.debug('Dropped payload due to unknown data type');
        }

        return;
      }

      ndjson.unshift(NDJSON.stringify({
        metadata: {
          service: filteredPayload.service
        }
      }));
      var ndjsonPayload = ndjson.join('');
      return this._postJson(endPoint, ndjsonPayload);
    }
  }, {
    key: "sendTransactions",
    value: function sendTransactions(transactions) {
      return this._send(transactions);
    }
  }, {
    key: "sendErrors",
    value: function sendErrors(errors) {
      return this._send(errors, 'errors');
    }
  }]);

  return ApmServer;
}();

var createMethod$4 = function createMethod(IS_RIGHT) {
  return function (that, callbackfn, argumentsLength, memo) {
    aFunction$1(callbackfn);
    var O = toObject(that);
    var self = indexedObject(O);
    var length = toLength(O.length);
    var index = IS_RIGHT ? length - 1 : 0;
    var i = IS_RIGHT ? -1 : 1;
    if (argumentsLength < 2) while (true) {
      if (index in self) {
        memo = self[index];
        index += i;
        break;
      }

      index += i;

      if (IS_RIGHT ? index < 0 : length <= index) {
        throw TypeError('Reduce of empty array with no initial value');
      }
    }

    for (; IS_RIGHT ? index >= 0 : length > index; index += i) {
      if (index in self) {
        memo = callbackfn(memo, self[index], index, O);
      }
    }

    return memo;
  };
};

var arrayReduce = {
  // `Array.prototype.reduce` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.reduce
  left: createMethod$4(false),
  // `Array.prototype.reduceRight` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.reduceright
  right: createMethod$4(true)
};

var $reduce = arrayReduce.left; // `Array.prototype.reduce` method
// https://tc39.github.io/ecma262/#sec-array.prototype.reduce

_export({
  target: 'Array',
  proto: true,
  forced: sloppyArrayMethod('reduce')
}, {
  reduce: function reduce(callbackfn
  /* , initialValue */
  ) {
    return $reduce(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var reduce = reduce$2(entryVirtual('Array'));

var ArrayPrototype$g = Array.prototype;

var reduce_1 = function reduce_1(it) {
  var own = reduce$2(it);

  return it === ArrayPrototype$g || it instanceof Array && own === reduce$2(ArrayPrototype$g) ? reduce : own;
};

var reduce$1 = reduce_1;

var reduce$2 = reduce$1;

function getConfigFromScript() {
  var script = getCurrentScript();
  var config = getDataAttributesFromNode(script);
  return config;
}

function getDataAttributesFromNode(node) {
  if (!node) {
    return {};
  }

  var dataAttrs = {};
  var dataRegex = /^data-([\w-]+)$/;
  var attrs = node.attributes;

  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];

    if (dataRegex.test(attr.nodeName)) {
      var _context;

      var key = attr.nodeName.match(dataRegex)[1]; // camelCase key

      var camelCasedkey = map$2(_context = key.split('-')).call(_context, function (value, index) {
        return index > 0 ? value.charAt(0).toUpperCase() + value.substring(1) : value;
      }).join('');

      dataAttrs[camelCasedkey] = attr.value || attr.nodeValue;
    }
  }

  return dataAttrs;
}

var Config =
/*#__PURE__*/
function () {
  function Config() {
    classCallCheck(this, Config);

    this.config = {};
    this.defaults = {
      serviceName: '',
      serviceVersion: '',
      environment: '',
      serverUrl: 'http://localhost:8200',
      serverUrlPrefix: '/intake/v2/rum/events',
      active: true,
      instrument: true,
      disableInstrumentations: [],
      debug: false,
      logLevel: 'warn',
      browserResponsivenessInterval: 500,
      browserResponsivenessBuffer: 3,
      checkBrowserResponsiveness: true,
      groupSimilarSpans: true,
      similarSpanThreshold: 0.05,
      capturePageLoad: true,
      ignoreTransactions: [],
      // throttlingRequestLimit: 20,
      // throttlingInterval: 30000, // 30s
      errorThrottleLimit: 20,
      errorThrottleInterval: 30000,
      transactionThrottleLimit: 20,
      transactionThrottleInterval: 30000,
      transactionDurationThreshold: 60000,
      queueLimit: -1,
      flushInterval: 500,
      sendPageLoadTransaction: true,
      distributedTracing: true,
      distributedTracingOrigins: [],
      distributedTracingHeaderValueCallback: getDtHeaderValue,
      distributedTracingHeaderName: 'elastic-apm-traceparent',
      pageLoadTraceId: '',
      pageLoadSpanId: '',
      pageLoadSampled: false,
      pageLoadTransactionName: '',
      transactionSampleRate: 1.0,
      context: {}
    };
    this.events = new EventHandler();
    this.filters = [];
    /**
     * Packages that uses rum-core under the hood must override
     * the version via setVersion
     */

    this.version = '';
  }

  createClass(Config, [{
    key: "init",
    value: function init() {
      var scriptData = getConfigFromScript();
      this.setConfig(scriptData);
    }
  }, {
    key: "isActive",
    value: function isActive() {
      return this.get('active');
    }
  }, {
    key: "setVersion",
    value: function setVersion(version) {
      this.version = version;
    }
  }, {
    key: "addFilter",
    value: function addFilter(cb) {
      if (typeof cb !== 'function') {
        throw new Error('Argument to must be function');
      }

      this.filters.push(cb);
    }
  }, {
    key: "applyFilters",
    value: function applyFilters(data) {
      for (var i = 0; i < this.filters.length; i++) {
        data = this.filters[i](data);

        if (!data) {
          return;
        }
      }

      return data;
    }
  }, {
    key: "get",
    value: function get(key) {
      var _context2;

      return reduce$2(_context2 = key.split('.')).call(_context2, function (obj, objKey) {
        return obj && obj[objKey];
      }, this.config);
    }
  }, {
    key: "getEndpointUrl",
    value: function getEndpointUrl() {
      return this.config.serverUrl + this.config.serverUrlPrefix;
    }
  }, {
    key: "set",
    value: function set(key, value) {
      var levels = key.split('.');
      var maxLevel = levels.length - 1;
      var target = this.config;

      for (var i = 0; i < maxLevel + 1; i++) {
        var level = levels[i];

        if (!level) {
          continue;
        }

        if (i === maxLevel) {
          target[level] = value;
        } else {
          var obj = target[level] || {};
          target[level] = obj;
          target = obj;
        }
      }
    }
  }, {
    key: "setUserContext",
    value: function setUserContext() {
      var userContext = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var context = {};
      var id = userContext.id,
          username = userContext.username,
          email = userContext.email;

      if (typeof id === 'number' || typeof id === 'string') {
        context.id = id;
      }

      if (typeof username === 'string') {
        context.username = username;
      }

      if (typeof email === 'string') {
        context.email = email;
      }

      this.set('context.user', context);
    }
  }, {
    key: "setCustomContext",
    value: function setCustomContext(customContext) {
      if (customContext && _typeof_1(customContext) === 'object') {
        this.set('context.custom', customContext);
      }
    }
  }, {
    key: "addLabels",
    value: function addLabels(tags) {
      var _this = this;

      if (!this.config.context.tags) {
        this.config.context.tags = {};
      }

      var keys = keys$6(tags);

      forEach$2(keys).call(keys, function (k) {
        return setLabel(k, tags[k], _this.config.context.tags);
      });
    }
  }, {
    key: "setConfig",
    value: function setConfig() {
      var properties = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      /**
       * Normalize config
       *
       * Remove all trailing slash for serverUrl since serverUrlPrefix
       * includes a forward slash for the path
       */
      if (properties.serverUrl) {
        properties.serverUrl = properties.serverUrl.replace(/\/+$/, '');
      }

      this.config = merge({}, this.defaults, this.config, properties);
      this.events.send(CONFIG_CHANGE, [this.config]);
    }
    /**
     * Validate the config aganist the required parameters and
     * generates error messages with missing and invalid keys
     */

  }, {
    key: "validate",
    value: function validate() {
      var _context3;

      var properties = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var requiredKeys = ['serviceName', 'serverUrl'];
      var errors = {
        missing: [],
        invalid: []
        /**
         * Check when required keys are missing
         */

      };

      forEach$2(_context3 = keys$6(properties)).call(_context3, function (key) {
        if (indexOf$2(requiredKeys).call(requiredKeys, key) !== -1 && !properties[key]) {
          errors.missing.push(key);
        }
      });
      /**
       * Invalid values on the config
       */


      if (properties.serviceName && !/^[a-zA-Z0-9 _-]+$/.test(properties.serviceName)) {
        errors.invalid.push({
          key: 'serviceName',
          value: properties.serviceName,
          allowed: 'a-z, A-Z, 0-9, _, -, <space>'
        });
      }

      return errors;
    }
  }]);

  return Config;
}();

var LoggingService =
/*#__PURE__*/
function () {
  function LoggingService(spec) {
    classCallCheck(this, LoggingService);

    if (!spec) spec = {};
    this.levels = ['trace', 'debug', 'info', 'warn', 'error'];
    this.level = spec.level || 'info';
    this.prefix = spec.prefix || '';
    this.resetLogMethods();
  }

  createClass(LoggingService, [{
    key: "shouldLog",
    value: function shouldLog(level) {
      var _context, _context2;

      return indexOf$2(_context = this.levels).call(_context, level) >= indexOf$2(_context2 = this.levels).call(_context2, this.level);
    }
  }, {
    key: "setLevel",
    value: function setLevel(level) {
      this.level = level;
      this.resetLogMethods();
    }
  }, {
    key: "resetLogMethods",
    value: function resetLogMethods() {
      var _context3;

      var loggingService = this;

      forEach$2(_context3 = this.levels).call(_context3, function (level) {
        loggingService[level] = loggingService.shouldLog(level) ? log : noop;

        function log() {
          var prefix = loggingService.prefix;
          var normalizedLevel;

          switch (level) {
            case 'trace':
              normalizedLevel = 'info';
              break;

            case 'debug':
              normalizedLevel = 'info';
              break;

            default:
              normalizedLevel = level;
          }

          var args = arguments;

          if (prefix) {
            if (typeof prefix === 'function') prefix = prefix(level);
            args[0] = prefix + args[0];
          }

          if (console) {
            var realMethod = console[normalizedLevel] ? console[normalizedLevel] : console.log;

            if (typeof realMethod === 'function') {
              realMethod.apply(console, args);
            }
          }
        }
      });
    }
  }]);

  return LoggingService;
}();

var ServiceFactory =
/*#__PURE__*/
function () {
  function ServiceFactory() {
    classCallCheck(this, ServiceFactory);

    this._serviceCreators = {};
    this._serviceInstances = {};
    this.initialized = false;
  }

  createClass(ServiceFactory, [{
    key: "registerCoreServices",
    value: function registerCoreServices() {
      var serviceFactory = this;
      this.registerServiceCreator('ConfigService', function () {
        return new Config();
      });
      this.registerServiceCreator('LoggingService', function () {
        return new LoggingService();
      });
      this.registerServiceCreator('ApmServer', function () {
        return new ApmServer(serviceFactory.getService('ConfigService'), serviceFactory.getService('LoggingService'));
      });
    }
  }, {
    key: "init",
    value: function init() {
      if (this.initialized) {
        return;
      }

      this.initialized = true;
      var configService = this.getService('ConfigService');
      configService.init();
      var loggingService = this.getService('LoggingService');

      function setLogLevel(loggingService, configService) {
        var debug = configService.get('debug');
        var logLevel = configService.get('logLevel');

        if (debug === true && logLevel !== 'trace') {
          loggingService.setLevel('debug');
        } else {
          loggingService.setLevel(logLevel);
        }
      }

      setLogLevel(loggingService, configService);
      configService.events.observe(CONFIG_CHANGE, function () {
        setLogLevel(loggingService, configService);
      });
      var apmServer = this.getService('ApmServer');
      apmServer.init();
    }
  }, {
    key: "registerServiceCreator",
    value: function registerServiceCreator(name, creator) {
      this._serviceCreators[name] = creator;
    }
  }, {
    key: "registerServiceInstance",
    value: function registerServiceInstance(name, instance) {
      this._serviceInstances[name] = instance;
    }
  }, {
    key: "getService",
    value: function getService(name) {
      if (!this._serviceInstances[name]) {
        if (typeof this._serviceCreators[name] === 'function') {
          this._serviceInstances[name] = this._serviceCreators[name](this);
        } else {
          throw new Error('Can not get service, No creator for: ' + name);
        }
      }

      return this._serviceInstances[name];
    }
  }]);

  return ServiceFactory;
}();

function getInstrumentationFlags(instrument, disabledInstrumentations) {
  var _flags, _context;

  /**
   * Valid instrumentation flags
   */
  var flags = (_flags = {}, defineProperty$6(_flags, XMLHTTPREQUEST, false), defineProperty$6(_flags, FETCH, false), defineProperty$6(_flags, HISTORY, false), defineProperty$6(_flags, PAGE_LOAD, false), defineProperty$6(_flags, ERROR, false), _flags);

  if (!instrument) {
    return flags;
  }

  forEach$2(_context = keys$6(flags)).call(_context, function (key) {
    if (indexOf$2(disabledInstrumentations).call(disabledInstrumentations, key) === -1) {
      flags[key] = true;
    }
  });

  return flags;
}

/**
 * MIT License
 *
 * Copyright (c) 2017-present, Elasticsearch BV
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */

function createServiceFactory() {
  var serviceFactory = new ServiceFactory();
  serviceFactory.registerCoreServices();
  ErrorLogging$1.registerServices(serviceFactory);
  PerformanceMonitoring$1.registerServices(serviceFactory);
  return serviceFactory;
}

/**
 * MIT License
 *
 * Copyright (c) 2017-present, Elasticsearch BV
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
var alreadyBootstrap = false;
var enabled = false;
function bootstrap() {
  if (alreadyBootstrap) {
    return enabled;
  }

  alreadyBootstrap = true;

  if (isPlatformSupported()) {
    patchAll();
    enabled = true;
  } else {
    console.log('APM: Platform is not supported!');
  }

  return enabled;
}

var ApmBase =
/*#__PURE__*/
function () {
  function ApmBase(serviceFactory, disable) {
    classCallCheck(this, ApmBase);

    this._disable = disable;
    this.serviceFactory = serviceFactory;
    this._initialized = false;
  }

  createClass(ApmBase, [{
    key: "init",
    value: function init(config) {
      if (this.isEnabled() && !this._initialized) {
        this._initialized = true;
        var configService = this.serviceFactory.getService('ConfigService');
        /**
         * Set Agent version to be sent as part of metadata to the APM Server
         */

        configService.setVersion('4.4.2');
        this.config(config);
        /**
         * Deactive agent when the active config flag is set to false
         */

        var loggingService = this.serviceFactory.getService('LoggingService');

        if (!configService.isActive()) {
          loggingService.info('RUM agent is inactive');
          return this;
        }

        this.serviceFactory.init();
        var flags = getInstrumentationFlags(configService.get('instrument'), configService.get('disableInstrumentations'));
        var performanceMonitoring = this.serviceFactory.getService('PerformanceMonitoring');
        performanceMonitoring.init(flags);

        if (flags[ERROR]) {
          var errorLogging = this.serviceFactory.getService('ErrorLogging');
          errorLogging.registerGlobalEventListener();
        }

        if (flags[PAGE_LOAD] && configService.get('sendPageLoadTransaction')) {
          this._sendPageLoadMetrics();
        }
      }

      return this;
    }
  }, {
    key: "_sendPageLoadMetrics",
    value: function _sendPageLoadMetrics() {
      var transactionService = this.serviceFactory.getService('TransactionService');
      /**
       * Name of the transaction is set in transaction service to
       * avoid duplicating the logic at multiple places
       */

      var tr = transactionService.startTransaction(undefined, PAGE_LOAD, {
        canReuse: true
      });

      if (tr) {
        tr.addTask(PAGE_LOAD);
      }

      var sendPageLoadMetrics = function sendPageLoadMetrics() {
        // to make sure PerformanceTiming.loadEventEnd has a value
        setTimeout$1(function () {
          if (tr) {
            tr.removeTask(PAGE_LOAD);
          }
        });
      };

      if (document.readyState === 'complete') {
        sendPageLoadMetrics();
      } else {
        window.addEventListener('load', sendPageLoadMetrics);
      }
    }
  }, {
    key: "isEnabled",
    value: function isEnabled() {
      return !this._disable;
    }
  }, {
    key: "observe",
    value: function observe(name, fn) {
      var configService = this.serviceFactory.getService('ConfigService');
      configService.events.observe(name, fn);
    }
    /**
     * When the required config keys are invalid, the agent is deactivated with
     * logging error to the console
     *
     * validation error format
     * {
     *  missing: [ 'key1', 'key2']
     *  invalid: [{
     *    key: 'a',
     *    value: 'abcd',
     *    allowed: 'string'
     *  }]
     * }
     */

  }, {
    key: "config",
    value: function config(_config) {
      var configService = this.serviceFactory.getService('ConfigService');

      var _configService$valida = configService.validate(_config),
          missing = _configService$valida.missing,
          invalid = _configService$valida.invalid;

      if (missing.length === 0 && invalid.length === 0) {
        configService.setConfig(_config);
      } else {
        var loggingService = this.serviceFactory.getService('LoggingService');
        var separator = ', ';
        var message = "RUM Agent isn't correctly configured: ";

        if (missing.length > 0) {
          message += 'Missing config - ' + missing.join(separator);

          if (invalid.length > 0) {
            message += separator;
          }
        }

        forEach$2(invalid).call(invalid, function (_ref, index) {
          var _context, _context2;

          var key = _ref.key,
              value = _ref.value,
              allowed = _ref.allowed;
          message += concat$2(_context = concat$2(_context2 = "".concat(key, " \"")).call(_context2, value, "\" contains invalid characters! (allowed: ")).call(_context, allowed, ")") + (index !== invalid.length - 1 ? separator : '');
        });

        loggingService.error(message);
        configService.setConfig({
          active: false
        });
      }
    }
  }, {
    key: "setUserContext",
    value: function setUserContext(userContext) {
      var configService = this.serviceFactory.getService('ConfigService');
      configService.setUserContext(userContext);
    }
  }, {
    key: "setCustomContext",
    value: function setCustomContext(customContext) {
      var configService = this.serviceFactory.getService('ConfigService');
      configService.setCustomContext(customContext);
    }
  }, {
    key: "addTags",
    value: function addTags(tags) {
      var loggingService = this.serviceFactory.getService('LoggingService');
      loggingService.warn('addTags deprecated, please use addLabels');
      this.addLabels(tags);
    }
  }, {
    key: "addLabels",
    value: function addLabels(labels) {
      var configService = this.serviceFactory.getService('ConfigService');
      configService.addLabels(labels);
    } // Should call this method before 'load' event on window is fired

  }, {
    key: "setInitialPageLoadName",
    value: function setInitialPageLoadName(name) {
      if (this.isEnabled()) {
        var configService = this.serviceFactory.getService('ConfigService');
        configService.setConfig({
          pageLoadTransactionName: name
        });
      }
    }
  }, {
    key: "startTransaction",
    value: function startTransaction(name, type, options) {
      if (this.isEnabled()) {
        var transactionService = this.serviceFactory.getService('TransactionService');
        return transactionService.startTransaction(name, type, options);
      }
    }
  }, {
    key: "startSpan",
    value: function startSpan(name, type) {
      if (this.isEnabled()) {
        var transactionService = this.serviceFactory.getService('TransactionService');
        return transactionService.startSpan(name, type);
      }
    }
  }, {
    key: "getCurrentTransaction",
    value: function getCurrentTransaction() {
      if (this.isEnabled()) {
        var transactionService = this.serviceFactory.getService('TransactionService');
        return transactionService.getCurrentTransaction();
      }
    }
  }, {
    key: "getTransactionService",
    value: function getTransactionService() {
      if (this.isEnabled()) {
        var transactionService = this.serviceFactory.getService('TransactionService');
        return transactionService;
      }
    }
  }, {
    key: "captureError",
    value: function captureError(error) {
      if (this.isEnabled()) {
        var errorLogging = this.serviceFactory.getService('ErrorLogging');
        return errorLogging.logError(error);
      }
    }
  }, {
    key: "addFilter",
    value: function addFilter(fn) {
      var configService = this.serviceFactory.getService('ConfigService');
      configService.addFilter(fn);
    }
  }]);

  return ApmBase;
}();

var _context$3;
var enabled$1 = bootstrap();
var serviceFactory = createServiceFactory();
var apmBase = new ApmBase(serviceFactory, !enabled$1);

if (typeof window !== 'undefined') {
  window.elasticApm = apmBase;
}

var init = bind$2(_context$3 = apmBase.init).call(_context$3, apmBase);

var isOnline = function isOnline() {
  var isDevOrQA = /(n?dev|qa)/.test(window.location.host);
  var isProduction = process.env.NODE_ENV === 'production';
  return isProduction && !isDevOrQA;
};

var getPageLoadTransactionName = function getPageLoadTransactionName() {
  var useBrowserHistory = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var path = '/';

  if (useBrowserHistory) {
    path = window.location.pathname;
  } else {
    path = window.location.hash.split('?')[0].replace('#', '');
  }

  return path || '/';
};

function ownKeys$1(object, enumerableOnly) { var keys = keys$6(object); if (getOwnPropertySymbols$2) { var symbols = getOwnPropertySymbols$2(object); if (enumerableOnly) symbols = filter$2(symbols).call(symbols, function (sym) { return getOwnPropertyDescriptor$2(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { var _context; forEach$2(_context = ownKeys$1(source, true)).call(_context, function (key) { defineProperty$6(target, key, source[key]); }); } else if (getOwnPropertyDescriptors$2) { defineProperties$1(target, getOwnPropertyDescriptors$2(source)); } else { var _context2; forEach$2(_context2 = ownKeys$1(source)).call(_context2, function (key) { defineProperty$3(target, key, getOwnPropertyDescriptor$2(source, key)); }); } } return target; }
function initApm(_ref) {
  var useBrowserHistory = _ref.useBrowserHistory,
      options = objectWithoutProperties(_ref, ["useBrowserHistory"]);

  return init(_objectSpread({
    active: isOnline(),
    serverUrl: 'https://apm.domain.cn',
    pageLoadTransactionName: getPageLoadTransactionName(useBrowserHistory)
  }, options));
}

export { initApm };
