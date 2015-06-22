var global = Function("return this;")();
/*jshint strict:true node:true es5:true onevar:true laxcomma:true laxbreak:true eqeqeq:true immed:true latedef:true*/
(function () {
  "use strict";

  var oldRequire = require
    , modules = {}
    ;

  function newRequire(modulename) {
    var err
      , mod
      , metamod
      ;

    try {
      mod = oldRequire(modulename);
    } catch(e) {
      err = e;
    }

    if (mod) {
      return mod;
    }

    metamod = modules[modulename];
    
    if (metamod) {
      mod = metamod();
      return mod;
    }

    // make it possible to require 'process', etc
    mod = global[modulename];

    if (mod) {
      return mod;
    }

    console.error(modulename);
    throw err;
  }

  function provide(modulename, factory) {
    var modReal
      ;

    function metamod() {
      if (modReal) {
        return modReal;
      }

      if (!factory.__pakmanager_factory__) {
        modReal = factory;
        return factory;
      }

      if (factory.__factoryIsResolving) {
        console.error('Your circular dependencies are too powerful!');
        return factory.__moduleExports;
      }

      factory.__factoryIsResolving = true;
      factory.__moduleExports = {};
      modReal = factory(factory.__moduleExports);
      factory.__factoryIsResolving = false;

      return modReal;
    }

    modules[modulename] = metamod;
    // somewhat of a dirty hack since I don't have a plug for loading the "main" module otherwise
    modules['pakmanager.main'] = metamod;
  }

  require = newRequire;
  global.require = newRequire;
  global.provide = provide;
}());

// pakmanager:number-is-nan
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  'use strict';
    module.exports = Number.isNaN || function (x) {
    	return x !== x;
    };
    
  provide("number-is-nan", module.exports);
}(global));

// pakmanager:core-util-is
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  // Copyright Joyent, Inc. and other Node contributors.
    //
    // Permission is hereby granted, free of charge, to any person obtaining a
    // copy of this software and associated documentation files (the
    // "Software"), to deal in the Software without restriction, including
    // without limitation the rights to use, copy, modify, merge, publish,
    // distribute, sublicense, and/or sell copies of the Software, and to permit
    // persons to whom the Software is furnished to do so, subject to the
    // following conditions:
    //
    // The above copyright notice and this permission notice shall be included
    // in all copies or substantial portions of the Software.
    //
    // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
    // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
    // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
    // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
    // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
    // USE OR OTHER DEALINGS IN THE SOFTWARE.
    
    // NOTE: These type checking functions intentionally don't use `instanceof`
    // because it is fragile and can be easily faked with `Object.create()`.
    function isArray(ar) {
      return Array.isArray(ar);
    }
    exports.isArray = isArray;
    
    function isBoolean(arg) {
      return typeof arg === 'boolean';
    }
    exports.isBoolean = isBoolean;
    
    function isNull(arg) {
      return arg === null;
    }
    exports.isNull = isNull;
    
    function isNullOrUndefined(arg) {
      return arg == null;
    }
    exports.isNullOrUndefined = isNullOrUndefined;
    
    function isNumber(arg) {
      return typeof arg === 'number';
    }
    exports.isNumber = isNumber;
    
    function isString(arg) {
      return typeof arg === 'string';
    }
    exports.isString = isString;
    
    function isSymbol(arg) {
      return typeof arg === 'symbol';
    }
    exports.isSymbol = isSymbol;
    
    function isUndefined(arg) {
      return arg === void 0;
    }
    exports.isUndefined = isUndefined;
    
    function isRegExp(re) {
      return isObject(re) && objectToString(re) === '[object RegExp]';
    }
    exports.isRegExp = isRegExp;
    
    function isObject(arg) {
      return typeof arg === 'object' && arg !== null;
    }
    exports.isObject = isObject;
    
    function isDate(d) {
      return isObject(d) && objectToString(d) === '[object Date]';
    }
    exports.isDate = isDate;
    
    function isError(e) {
      return isObject(e) &&
          (objectToString(e) === '[object Error]' || e instanceof Error);
    }
    exports.isError = isError;
    
    function isFunction(arg) {
      return typeof arg === 'function';
    }
    exports.isFunction = isFunction;
    
    function isPrimitive(arg) {
      return arg === null ||
             typeof arg === 'boolean' ||
             typeof arg === 'number' ||
             typeof arg === 'string' ||
             typeof arg === 'symbol' ||  // ES6 symbol
             typeof arg === 'undefined';
    }
    exports.isPrimitive = isPrimitive;
    
    function isBuffer(arg) {
      return Buffer.isBuffer(arg);
    }
    exports.isBuffer = isBuffer;
    
    function objectToString(o) {
      return Object.prototype.toString.call(o);
    }
  provide("core-util-is", module.exports);
}(global));

// pakmanager:process-nextick-args
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  'use strict';
    module.exports = nextTick;
    
    function nextTick(fn) {
      var args = new Array(arguments.length - 1);
      var i = 0;
      while (i < arguments.length) {
        args[i++] = arguments[i];
      }
      process.nextTick(function afterTick() {
        fn.apply(null, args);
      });
    }
    
  provide("process-nextick-args", module.exports);
}(global));

// pakmanager:inherits
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  module.exports = require('util').inherits
    
  provide("inherits", module.exports);
}(global));

// pakmanager:isarray
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  module.exports = Array.isArray || function (arr) {
      return Object.prototype.toString.call(arr) == '[object Array]';
    };
    
  provide("isarray", module.exports);
}(global));

// pakmanager:util-deprecate
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  
    /**
     * For Node.js, simply re-export the core `util.deprecate` function.
     */
    
    module.exports = require('util').deprecate;
    
  provide("util-deprecate", module.exports);
}(global));

// pakmanager:once
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  var wrappy = require('wrappy')
    module.exports = wrappy(once)
    
    once.proto = once(function () {
      Object.defineProperty(Function.prototype, 'once', {
        value: function () {
          return once(this)
        },
        configurable: true
      })
    })
    
    function once (fn) {
      var f = function () {
        if (f.called) return f.value
        f.called = true
        return f.value = fn.apply(this, arguments)
      }
      f.called = false
      return f
    }
    
  provide("once", module.exports);
}(global));

// pakmanager:wrappy
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  // Returns a wrapper function that returns a wrapped callback
    // The wrapper function should do some stuff, and return a
    // presumably different callback function.
    // This makes sure that own properties are retained, so that
    // decorations and such are not lost along the way.
    module.exports = wrappy
    function wrappy (fn, cb) {
      if (fn && cb) return wrappy(fn)(cb)
    
      if (typeof fn !== 'function')
        throw new TypeError('need wrapper function')
    
      Object.keys(fn).forEach(function (k) {
        wrapper[k] = fn[k]
      })
    
      return wrapper
    
      function wrapper() {
        var args = new Array(arguments.length)
        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i]
        }
        var ret = fn.apply(this, args)
        var cb = args[args.length-1]
        if (typeof ret === 'function' && ret !== cb) {
          Object.keys(cb).forEach(function (k) {
            ret[k] = cb[k]
          })
        }
        return ret
      }
    }
    
  provide("wrappy", module.exports);
}(global));

// pakmanager:brace-expansion
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  var concatMap = require('concat-map');
    var balanced = require('balanced-match');
    
    module.exports = expandTop;
    
    var escSlash = '\0SLASH'+Math.random()+'\0';
    var escOpen = '\0OPEN'+Math.random()+'\0';
    var escClose = '\0CLOSE'+Math.random()+'\0';
    var escComma = '\0COMMA'+Math.random()+'\0';
    var escPeriod = '\0PERIOD'+Math.random()+'\0';
    
    function numeric(str) {
      return parseInt(str, 10) == str
        ? parseInt(str, 10)
        : str.charCodeAt(0);
    }
    
    function escapeBraces(str) {
      return str.split('\\\\').join(escSlash)
                .split('\\{').join(escOpen)
                .split('\\}').join(escClose)
                .split('\\,').join(escComma)
                .split('\\.').join(escPeriod);
    }
    
    function unescapeBraces(str) {
      return str.split(escSlash).join('\\')
                .split(escOpen).join('{')
                .split(escClose).join('}')
                .split(escComma).join(',')
                .split(escPeriod).join('.');
    }
    
    
    // Basically just str.split(","), but handling cases
    // where we have nested braced sections, which should be
    // treated as individual members, like {a,{b,c},d}
    function parseCommaParts(str) {
      if (!str)
        return [''];
    
      var parts = [];
      var m = balanced('{', '}', str);
    
      if (!m)
        return str.split(',');
    
      var pre = m.pre;
      var body = m.body;
      var post = m.post;
      var p = pre.split(',');
    
      p[p.length-1] += '{' + body + '}';
      var postParts = parseCommaParts(post);
      if (post.length) {
        p[p.length-1] += postParts.shift();
        p.push.apply(p, postParts);
      }
    
      parts.push.apply(parts, p);
    
      return parts;
    }
    
    function expandTop(str) {
      if (!str)
        return [];
    
      return expand(escapeBraces(str), true).map(unescapeBraces);
    }
    
    function identity(e) {
      return e;
    }
    
    function embrace(str) {
      return '{' + str + '}';
    }
    function isPadded(el) {
      return /^-?0\d/.test(el);
    }
    
    function lte(i, y) {
      return i <= y;
    }
    function gte(i, y) {
      return i >= y;
    }
    
    function expand(str, isTop) {
      var expansions = [];
    
      var m = balanced('{', '}', str);
      if (!m || /\$$/.test(m.pre)) return [str];
    
      var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
      var isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
      var isSequence = isNumericSequence || isAlphaSequence;
      var isOptions = /^(.*,)+(.+)?$/.test(m.body);
      if (!isSequence && !isOptions) {
        // {a},b}
        if (m.post.match(/,.*}/)) {
          str = m.pre + '{' + m.body + escClose + m.post;
          return expand(str);
        }
        return [str];
      }
    
      var n;
      if (isSequence) {
        n = m.body.split(/\.\./);
      } else {
        n = parseCommaParts(m.body);
        if (n.length === 1) {
          // x{{a,b}}y ==> x{a}y x{b}y
          n = expand(n[0], false).map(embrace);
          if (n.length === 1) {
            var post = m.post.length
              ? expand(m.post, false)
              : [''];
            return post.map(function(p) {
              return m.pre + n[0] + p;
            });
          }
        }
      }
    
      // at this point, n is the parts, and we know it's not a comma set
      // with a single entry.
    
      // no need to expand pre, since it is guaranteed to be free of brace-sets
      var pre = m.pre;
      var post = m.post.length
        ? expand(m.post, false)
        : [''];
    
      var N;
    
      if (isSequence) {
        var x = numeric(n[0]);
        var y = numeric(n[1]);
        var width = Math.max(n[0].length, n[1].length)
        var incr = n.length == 3
          ? Math.abs(numeric(n[2]))
          : 1;
        var test = lte;
        var reverse = y < x;
        if (reverse) {
          incr *= -1;
          test = gte;
        }
        var pad = n.some(isPadded);
    
        N = [];
    
        for (var i = x; test(i, y); i += incr) {
          var c;
          if (isAlphaSequence) {
            c = String.fromCharCode(i);
            if (c === '\\')
              c = '';
          } else {
            c = String(i);
            if (pad) {
              var need = width - c.length;
              if (need > 0) {
                var z = new Array(need + 1).join('0');
                if (i < 0)
                  c = '-' + z + c.slice(1);
                else
                  c = z + c;
              }
            }
          }
          N.push(c);
        }
      } else {
        N = concatMap(n, function(el) { return expand(el, false) });
      }
    
      for (var j = 0; j < N.length; j++) {
        for (var k = 0; k < post.length; k++) {
          var expansion = pre + N[j] + post[k];
          if (!isTop || isSequence || expansion)
            expansions.push(expansion);
        }
      }
    
      return expansions;
    }
    
    
  provide("brace-expansion", module.exports);
}(global));

// pakmanager:balanced-match
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  module.exports = balanced;
    function balanced(a, b, str) {
      var bal = 0;
      var m = {};
      var ended = false;
    
      for (var i = 0; i < str.length; i++) {
        if (a == str.substr(i, a.length)) {
          if (!('start' in m)) m.start = i;
          bal++;
        }
        else if (b == str.substr(i, b.length) && 'start' in m) {
          ended = true;
          bal--;
          if (!bal) {
            m.end = i;
            m.pre = str.substr(0, m.start);
            m.body = (m.end - m.start > 1)
              ? str.substring(m.start + a.length, m.end)
              : '';
            m.post = str.slice(m.end + b.length);
            return m;
          }
        }
      }
    
      // if we opened more than we closed, find the one we closed
      if (bal && ended) {
        var start = m.start + a.length;
        m = balanced(a, b, str.substr(start));
        if (m) {
          m.start += start;
          m.end += start;
          m.pre = str.slice(0, start) + m.pre;
        }
        return m;
      }
    }
    
  provide("balanced-match", module.exports);
}(global));

// pakmanager:concat-map
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  module.exports = function (xs, fn) {
        var res = [];
        for (var i = 0; i < xs.length; i++) {
            var x = fn(xs[i], i);
            if (isArray(x)) res.push.apply(res, x);
            else res.push(x);
        }
        return res;
    };
    
    var isArray = Array.isArray || function (xs) {
        return Object.prototype.toString.call(xs) === '[object Array]';
    };
    
  provide("concat-map", module.exports);
}(global));

// pakmanager:is-finite
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  'use strict';
    var numberIsNan = require('number-is-nan');
    
    module.exports = Number.isFinite || function (val) {
    	return !(typeof val !== 'number' || numberIsNan(val) || val === Infinity || val === -Infinity);
    };
    
  provide("is-finite", module.exports);
}(global));

// pakmanager:readable-stream/lib/_stream_writable
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  // A bit simpler than readable streams.
    // Implement an async ._write(chunk, cb), and it'll handle all
    // the drain event emission and buffering.
    
    'use strict';
    
    module.exports = Writable;
    
    /*<replacement>*/
    var processNextTick = require('process-nextick-args');
    /*</replacement>*/
    
    
    /*<replacement>*/
    var Buffer = require('buffer').Buffer;
    /*</replacement>*/
    
    Writable.WritableState = WritableState;
    
    
    /*<replacement>*/
    var util = require('core-util-is');
    util.inherits = require('inherits');
    /*</replacement>*/
    
    
    
    /*<replacement>*/
    var Stream;
     (function (){try{
    Stream = require('st' + 'ream');
    }catch(_){Stream = require('events').EventEmitter;}}())
    /*</replacement>*/
    
    
    util.inherits(Writable, Stream);
    
    function nop() {}
    
    function WriteReq(chunk, encoding, cb) {
      this.chunk = chunk;
      this.encoding = encoding;
      this.callback = cb;
      this.next = null;
    }
    
    function WritableState(options, stream) {
      var Duplex =  require('readable-stream/lib/_stream_duplex');
    
      options = options || {};
    
      // object stream flag to indicate whether or not this stream
      // contains buffers or objects.
      this.objectMode = !!options.objectMode;
    
      if (stream instanceof Duplex)
        this.objectMode = this.objectMode || !!options.writableObjectMode;
    
      // the point at which write() starts returning false
      // Note: 0 is a valid value, means that we always return false if
      // the entire buffer is not flushed immediately on write()
      var hwm = options.highWaterMark;
      var defaultHwm = this.objectMode ? 16 : 16 * 1024;
      this.highWaterMark = (hwm || hwm === 0) ? hwm : defaultHwm;
    
      // cast to ints.
      this.highWaterMark = ~~this.highWaterMark;
    
      this.needDrain = false;
      // at the start of calling end()
      this.ending = false;
      // when end() has been called, and returned
      this.ended = false;
      // when 'finish' is emitted
      this.finished = false;
    
      // should we decode strings into buffers before passing to _write?
      // this is here so that some node-core streams can optimize string
      // handling at a lower level.
      var noDecode = options.decodeStrings === false;
      this.decodeStrings = !noDecode;
    
      // Crypto is kind of old and crusty.  Historically, its default string
      // encoding is 'binary' so we have to make this configurable.
      // Everything else in the universe uses 'utf8', though.
      this.defaultEncoding = options.defaultEncoding || 'utf8';
    
      // not an actual buffer we keep track of, but a measurement
      // of how much we're waiting to get pushed to some underlying
      // socket or file.
      this.length = 0;
    
      // a flag to see when we're in the middle of a write.
      this.writing = false;
    
      // when true all writes will be buffered until .uncork() call
      this.corked = 0;
    
      // a flag to be able to tell if the onwrite cb is called immediately,
      // or on a later tick.  We set this to true at first, because any
      // actions that shouldn't happen until "later" should generally also
      // not happen before the first write call.
      this.sync = true;
    
      // a flag to know if we're processing previously buffered items, which
      // may call the _write() callback in the same tick, so that we don't
      // end up in an overlapped onwrite situation.
      this.bufferProcessing = false;
    
      // the callback that's passed to _write(chunk,cb)
      this.onwrite = function(er) {
        onwrite(stream, er);
      };
    
      // the callback that the user supplies to write(chunk,encoding,cb)
      this.writecb = null;
    
      // the amount that is being written when _write is called.
      this.writelen = 0;
    
      this.bufferedRequest = null;
      this.lastBufferedRequest = null;
    
      // number of pending user-supplied write callbacks
      // this must be 0 before 'finish' can be emitted
      this.pendingcb = 0;
    
      // emit prefinish if the only thing we're waiting for is _write cbs
      // This is relevant for synchronous Transform streams
      this.prefinished = false;
    
      // True if the error was already emitted and should not be thrown again
      this.errorEmitted = false;
    }
    
    WritableState.prototype.getBuffer = function writableStateGetBuffer() {
      var current = this.bufferedRequest;
      var out = [];
      while (current) {
        out.push(current);
        current = current.next;
      }
      return out;
    };
    
    Object.defineProperty(WritableState.prototype, 'buffer', {
      get: require('util-deprecate')(function() {
        return this.getBuffer();
      }, '_writableState.buffer is deprecated. Use ' +
          '_writableState.getBuffer() instead.')
    });
    
    function Writable(options) {
      var Duplex =  require('readable-stream/lib/_stream_duplex');
    
      // Writable ctor is applied to Duplexes, though they're not
      // instanceof Writable, they're instanceof Readable.
      if (!(this instanceof Writable) && !(this instanceof Duplex))
        return new Writable(options);
    
      this._writableState = new WritableState(options, this);
    
      // legacy.
      this.writable = true;
    
      if (options) {
        if (typeof options.write === 'function')
          this._write = options.write;
    
        if (typeof options.writev === 'function')
          this._writev = options.writev;
      }
    
      Stream.call(this);
    }
    
    // Otherwise people can pipe Writable streams, which is just wrong.
    Writable.prototype.pipe = function() {
      this.emit('error', new Error('Cannot pipe. Not readable.'));
    };
    
    
    function writeAfterEnd(stream, cb) {
      var er = new Error('write after end');
      // TODO: defer error events consistently everywhere, not just the cb
      stream.emit('error', er);
      processNextTick(cb, er);
    }
    
    // If we get something that is not a buffer, string, null, or undefined,
    // and we're not in objectMode, then that's an error.
    // Otherwise stream chunks are all considered to be of length=1, and the
    // watermarks determine how many objects to keep in the buffer, rather than
    // how many bytes or characters.
    function validChunk(stream, state, chunk, cb) {
      var valid = true;
    
      if (!(Buffer.isBuffer(chunk)) &&
          typeof chunk !== 'string' &&
          chunk !== null &&
          chunk !== undefined &&
          !state.objectMode) {
        var er = new TypeError('Invalid non-string/buffer chunk');
        stream.emit('error', er);
        processNextTick(cb, er);
        valid = false;
      }
      return valid;
    }
    
    Writable.prototype.write = function(chunk, encoding, cb) {
      var state = this._writableState;
      var ret = false;
    
      if (typeof encoding === 'function') {
        cb = encoding;
        encoding = null;
      }
    
      if (chunk instanceof Buffer)
        encoding = 'buffer';
      else if (!encoding)
        encoding = state.defaultEncoding;
    
      if (typeof cb !== 'function')
        cb = nop;
    
      if (state.ended)
        writeAfterEnd(this, cb);
      else if (validChunk(this, state, chunk, cb)) {
        state.pendingcb++;
        ret = writeOrBuffer(this, state, chunk, encoding, cb);
      }
    
      return ret;
    };
    
    Writable.prototype.cork = function() {
      var state = this._writableState;
    
      state.corked++;
    };
    
    Writable.prototype.uncork = function() {
      var state = this._writableState;
    
      if (state.corked) {
        state.corked--;
    
        if (!state.writing &&
            !state.corked &&
            !state.finished &&
            !state.bufferProcessing &&
            state.bufferedRequest)
          clearBuffer(this, state);
      }
    };
    
    Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
      // node::ParseEncoding() requires lower case.
      if (typeof encoding === 'string')
        encoding = encoding.toLowerCase();
      if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64',
    'ucs2', 'ucs-2','utf16le', 'utf-16le', 'raw']
    .indexOf((encoding + '').toLowerCase()) > -1))
        throw new TypeError('Unknown encoding: ' + encoding);
      this._writableState.defaultEncoding = encoding;
    };
    
    function decodeChunk(state, chunk, encoding) {
      if (!state.objectMode &&
          state.decodeStrings !== false &&
          typeof chunk === 'string') {
        chunk = new Buffer(chunk, encoding);
      }
      return chunk;
    }
    
    // if we're already writing something, then just put this
    // in the queue, and wait our turn.  Otherwise, call _write
    // If we return false, then we need a drain event, so set that flag.
    function writeOrBuffer(stream, state, chunk, encoding, cb) {
      chunk = decodeChunk(state, chunk, encoding);
    
      if (chunk instanceof Buffer)
        encoding = 'buffer';
      var len = state.objectMode ? 1 : chunk.length;
    
      state.length += len;
    
      var ret = state.length < state.highWaterMark;
      // we must ensure that previous needDrain will not be reset to false.
      if (!ret)
        state.needDrain = true;
    
      if (state.writing || state.corked) {
        var last = state.lastBufferedRequest;
        state.lastBufferedRequest = new WriteReq(chunk, encoding, cb);
        if (last) {
          last.next = state.lastBufferedRequest;
        } else {
          state.bufferedRequest = state.lastBufferedRequest;
        }
      } else {
        doWrite(stream, state, false, len, chunk, encoding, cb);
      }
    
      return ret;
    }
    
    function doWrite(stream, state, writev, len, chunk, encoding, cb) {
      state.writelen = len;
      state.writecb = cb;
      state.writing = true;
      state.sync = true;
      if (writev)
        stream._writev(chunk, state.onwrite);
      else
        stream._write(chunk, encoding, state.onwrite);
      state.sync = false;
    }
    
    function onwriteError(stream, state, sync, er, cb) {
      --state.pendingcb;
      if (sync)
        processNextTick(cb, er);
      else
        cb(er);
    
      stream._writableState.errorEmitted = true;
      stream.emit('error', er);
    }
    
    function onwriteStateUpdate(state) {
      state.writing = false;
      state.writecb = null;
      state.length -= state.writelen;
      state.writelen = 0;
    }
    
    function onwrite(stream, er) {
      var state = stream._writableState;
      var sync = state.sync;
      var cb = state.writecb;
    
      onwriteStateUpdate(state);
    
      if (er)
        onwriteError(stream, state, sync, er, cb);
      else {
        // Check if we're actually ready to finish, but don't emit yet
        var finished = needFinish(state);
    
        if (!finished &&
            !state.corked &&
            !state.bufferProcessing &&
            state.bufferedRequest) {
          clearBuffer(stream, state);
        }
    
        if (sync) {
          processNextTick(afterWrite, stream, state, finished, cb);
        } else {
          afterWrite(stream, state, finished, cb);
        }
      }
    }
    
    function afterWrite(stream, state, finished, cb) {
      if (!finished)
        onwriteDrain(stream, state);
      state.pendingcb--;
      cb();
      finishMaybe(stream, state);
    }
    
    // Must force callback to be called on nextTick, so that we don't
    // emit 'drain' before the write() consumer gets the 'false' return
    // value, and has a chance to attach a 'drain' listener.
    function onwriteDrain(stream, state) {
      if (state.length === 0 && state.needDrain) {
        state.needDrain = false;
        stream.emit('drain');
      }
    }
    
    
    // if there's something in the buffer waiting, then process it
    function clearBuffer(stream, state) {
      state.bufferProcessing = true;
      var entry = state.bufferedRequest;
    
      if (stream._writev && entry && entry.next) {
        // Fast case, write everything using _writev()
        var buffer = [];
        var cbs = [];
        while (entry) {
          cbs.push(entry.callback);
          buffer.push(entry);
          entry = entry.next;
        }
    
        // count the one we are adding, as well.
        // TODO(isaacs) clean this up
        state.pendingcb++;
        state.lastBufferedRequest = null;
        doWrite(stream, state, true, state.length, buffer, '', function(err) {
          for (var i = 0; i < cbs.length; i++) {
            state.pendingcb--;
            cbs[i](err);
          }
        });
    
        // Clear buffer
      } else {
        // Slow case, write chunks one-by-one
        while (entry) {
          var chunk = entry.chunk;
          var encoding = entry.encoding;
          var cb = entry.callback;
          var len = state.objectMode ? 1 : chunk.length;
    
          doWrite(stream, state, false, len, chunk, encoding, cb);
          entry = entry.next;
          // if we didn't call the onwrite immediately, then
          // it means that we need to wait until it does.
          // also, that means that the chunk and cb are currently
          // being processed, so move the buffer counter past them.
          if (state.writing) {
            break;
          }
        }
    
        if (entry === null)
          state.lastBufferedRequest = null;
      }
      state.bufferedRequest = entry;
      state.bufferProcessing = false;
    }
    
    Writable.prototype._write = function(chunk, encoding, cb) {
      cb(new Error('not implemented'));
    };
    
    Writable.prototype._writev = null;
    
    Writable.prototype.end = function(chunk, encoding, cb) {
      var state = this._writableState;
    
      if (typeof chunk === 'function') {
        cb = chunk;
        chunk = null;
        encoding = null;
      } else if (typeof encoding === 'function') {
        cb = encoding;
        encoding = null;
      }
    
      if (chunk !== null && chunk !== undefined)
        this.write(chunk, encoding);
    
      // .end() fully uncorks
      if (state.corked) {
        state.corked = 1;
        this.uncork();
      }
    
      // ignore unnecessary end() calls.
      if (!state.ending && !state.finished)
        endWritable(this, state, cb);
    };
    
    
    function needFinish(state) {
      return (state.ending &&
              state.length === 0 &&
              state.bufferedRequest === null &&
              !state.finished &&
              !state.writing);
    }
    
    function prefinish(stream, state) {
      if (!state.prefinished) {
        state.prefinished = true;
        stream.emit('prefinish');
      }
    }
    
    function finishMaybe(stream, state) {
      var need = needFinish(state);
      if (need) {
        if (state.pendingcb === 0) {
          prefinish(stream, state);
          state.finished = true;
          stream.emit('finish');
        } else {
          prefinish(stream, state);
        }
      }
      return need;
    }
    
    function endWritable(stream, state, cb) {
      state.ending = true;
      finishMaybe(stream, state);
      if (cb) {
        if (state.finished)
          processNextTick(cb);
        else
          stream.once('finish', cb);
      }
      state.ended = true;
    }
    
  provide("readable-stream/lib/_stream_writable", module.exports);
}(global));

// pakmanager:readable-stream/lib/_stream_readable
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  'use strict';
    
    module.exports = Readable;
    
    /*<replacement>*/
    var processNextTick = require('process-nextick-args');
    /*</replacement>*/
    
    
    /*<replacement>*/
    var isArray = require('isarray');
    /*</replacement>*/
    
    
    /*<replacement>*/
    var Buffer = require('buffer').Buffer;
    /*</replacement>*/
    
    Readable.ReadableState = ReadableState;
    
    var EE = require('events').EventEmitter;
    
    /*<replacement>*/
    if (!EE.listenerCount) EE.listenerCount = function(emitter, type) {
      return emitter.listeners(type).length;
    };
    /*</replacement>*/
    
    
    
    /*<replacement>*/
    var Stream;
     (function (){try{
    Stream = require('st' + 'ream');
    }catch(_){Stream = require('events').EventEmitter;}}())
    /*</replacement>*/
    
    
    /*<replacement>*/
    var util = require('core-util-is');
    util.inherits = require('inherits');
    /*</replacement>*/
    
    
    
    /*<replacement>*/
    var debug = require('util');
    if (debug && debug.debuglog) {
      debug = debug.debuglog('stream');
    } else {
      debug = function () {};
    }
    /*</replacement>*/
    
    var StringDecoder;
    
    util.inherits(Readable, Stream);
    
    function ReadableState(options, stream) {
      var Duplex =  require('readable-stream/lib/_stream_duplex');
    
      options = options || {};
    
      // object stream flag. Used to make read(n) ignore n and to
      // make all the buffer merging and length checks go away
      this.objectMode = !!options.objectMode;
    
      if (stream instanceof Duplex)
        this.objectMode = this.objectMode || !!options.readableObjectMode;
    
      // the point at which it stops calling _read() to fill the buffer
      // Note: 0 is a valid value, means "don't call _read preemptively ever"
      var hwm = options.highWaterMark;
      var defaultHwm = this.objectMode ? 16 : 16 * 1024;
      this.highWaterMark = (hwm || hwm === 0) ? hwm : defaultHwm;
    
      // cast to ints.
      this.highWaterMark = ~~this.highWaterMark;
    
      this.buffer = [];
      this.length = 0;
      this.pipes = null;
      this.pipesCount = 0;
      this.flowing = null;
      this.ended = false;
      this.endEmitted = false;
      this.reading = false;
    
      // a flag to be able to tell if the onwrite cb is called immediately,
      // or on a later tick.  We set this to true at first, because any
      // actions that shouldn't happen until "later" should generally also
      // not happen before the first write call.
      this.sync = true;
    
      // whenever we return null, then we set a flag to say
      // that we're awaiting a 'readable' event emission.
      this.needReadable = false;
      this.emittedReadable = false;
      this.readableListening = false;
    
      // Crypto is kind of old and crusty.  Historically, its default string
      // encoding is 'binary' so we have to make this configurable.
      // Everything else in the universe uses 'utf8', though.
      this.defaultEncoding = options.defaultEncoding || 'utf8';
    
      // when piping, we only care about 'readable' events that happen
      // after read()ing all the bytes and not getting any pushback.
      this.ranOut = false;
    
      // the number of writers that are awaiting a drain event in .pipe()s
      this.awaitDrain = 0;
    
      // if true, a maybeReadMore has been scheduled
      this.readingMore = false;
    
      this.decoder = null;
      this.encoding = null;
      if (options.encoding) {
        if (!StringDecoder)
          StringDecoder = require('string_decoder/').StringDecoder;
        this.decoder = new StringDecoder(options.encoding);
        this.encoding = options.encoding;
      }
    }
    
    function Readable(options) {
      var Duplex =  require('readable-stream/lib/_stream_duplex');
    
      if (!(this instanceof Readable))
        return new Readable(options);
    
      this._readableState = new ReadableState(options, this);
    
      // legacy
      this.readable = true;
    
      if (options && typeof options.read === 'function')
        this._read = options.read;
    
      Stream.call(this);
    }
    
    // Manually shove something into the read() buffer.
    // This returns true if the highWaterMark has not been hit yet,
    // similar to how Writable.write() returns true if you should
    // write() some more.
    Readable.prototype.push = function(chunk, encoding) {
      var state = this._readableState;
    
      if (!state.objectMode && typeof chunk === 'string') {
        encoding = encoding || state.defaultEncoding;
        if (encoding !== state.encoding) {
          chunk = new Buffer(chunk, encoding);
          encoding = '';
        }
      }
    
      return readableAddChunk(this, state, chunk, encoding, false);
    };
    
    // Unshift should *always* be something directly out of read()
    Readable.prototype.unshift = function(chunk) {
      var state = this._readableState;
      return readableAddChunk(this, state, chunk, '', true);
    };
    
    Readable.prototype.isPaused = function() {
      return this._readableState.flowing === false;
    };
    
    function readableAddChunk(stream, state, chunk, encoding, addToFront) {
      var er = chunkInvalid(state, chunk);
      if (er) {
        stream.emit('error', er);
      } else if (chunk === null) {
        state.reading = false;
        onEofChunk(stream, state);
      } else if (state.objectMode || chunk && chunk.length > 0) {
        if (state.ended && !addToFront) {
          var e = new Error('stream.push() after EOF');
          stream.emit('error', e);
        } else if (state.endEmitted && addToFront) {
          var e = new Error('stream.unshift() after end event');
          stream.emit('error', e);
        } else {
          if (state.decoder && !addToFront && !encoding)
            chunk = state.decoder.write(chunk);
    
          if (!addToFront)
            state.reading = false;
    
          // if we want the data now, just emit it.
          if (state.flowing && state.length === 0 && !state.sync) {
            stream.emit('data', chunk);
            stream.read(0);
          } else {
            // update the buffer info.
            state.length += state.objectMode ? 1 : chunk.length;
            if (addToFront)
              state.buffer.unshift(chunk);
            else
              state.buffer.push(chunk);
    
            if (state.needReadable)
              emitReadable(stream);
          }
    
          maybeReadMore(stream, state);
        }
      } else if (!addToFront) {
        state.reading = false;
      }
    
      return needMoreData(state);
    }
    
    
    
    // if it's past the high water mark, we can push in some more.
    // Also, if we have no data yet, we can stand some
    // more bytes.  This is to work around cases where hwm=0,
    // such as the repl.  Also, if the push() triggered a
    // readable event, and the user called read(largeNumber) such that
    // needReadable was set, then we ought to push more, so that another
    // 'readable' event will be triggered.
    function needMoreData(state) {
      return !state.ended &&
             (state.needReadable ||
              state.length < state.highWaterMark ||
              state.length === 0);
    }
    
    // backwards compatibility.
    Readable.prototype.setEncoding = function(enc) {
      if (!StringDecoder)
        StringDecoder = require('string_decoder/').StringDecoder;
      this._readableState.decoder = new StringDecoder(enc);
      this._readableState.encoding = enc;
      return this;
    };
    
    // Don't raise the hwm > 128MB
    var MAX_HWM = 0x800000;
    function roundUpToNextPowerOf2(n) {
      if (n >= MAX_HWM) {
        n = MAX_HWM;
      } else {
        // Get the next highest power of 2
        n--;
        for (var p = 1; p < 32; p <<= 1) n |= n >> p;
        n++;
      }
      return n;
    }
    
    function howMuchToRead(n, state) {
      if (state.length === 0 && state.ended)
        return 0;
    
      if (state.objectMode)
        return n === 0 ? 0 : 1;
    
      if (n === null || isNaN(n)) {
        // only flow one buffer at a time
        if (state.flowing && state.buffer.length)
          return state.buffer[0].length;
        else
          return state.length;
      }
    
      if (n <= 0)
        return 0;
    
      // If we're asking for more than the target buffer level,
      // then raise the water mark.  Bump up to the next highest
      // power of 2, to prevent increasing it excessively in tiny
      // amounts.
      if (n > state.highWaterMark)
        state.highWaterMark = roundUpToNextPowerOf2(n);
    
      // don't have that much.  return null, unless we've ended.
      if (n > state.length) {
        if (!state.ended) {
          state.needReadable = true;
          return 0;
        } else {
          return state.length;
        }
      }
    
      return n;
    }
    
    // you can override either this method, or the async _read(n) below.
    Readable.prototype.read = function(n) {
      debug('read', n);
      var state = this._readableState;
      var nOrig = n;
    
      if (typeof n !== 'number' || n > 0)
        state.emittedReadable = false;
    
      // if we're doing read(0) to trigger a readable event, but we
      // already have a bunch of data in the buffer, then just trigger
      // the 'readable' event and move on.
      if (n === 0 &&
          state.needReadable &&
          (state.length >= state.highWaterMark || state.ended)) {
        debug('read: emitReadable', state.length, state.ended);
        if (state.length === 0 && state.ended)
          endReadable(this);
        else
          emitReadable(this);
        return null;
      }
    
      n = howMuchToRead(n, state);
    
      // if we've ended, and we're now clear, then finish it up.
      if (n === 0 && state.ended) {
        if (state.length === 0)
          endReadable(this);
        return null;
      }
    
      // All the actual chunk generation logic needs to be
      // *below* the call to _read.  The reason is that in certain
      // synthetic stream cases, such as passthrough streams, _read
      // may be a completely synchronous operation which may change
      // the state of the read buffer, providing enough data when
      // before there was *not* enough.
      //
      // So, the steps are:
      // 1. Figure out what the state of things will be after we do
      // a read from the buffer.
      //
      // 2. If that resulting state will trigger a _read, then call _read.
      // Note that this may be asynchronous, or synchronous.  Yes, it is
      // deeply ugly to write APIs this way, but that still doesn't mean
      // that the Readable class should behave improperly, as streams are
      // designed to be sync/async agnostic.
      // Take note if the _read call is sync or async (ie, if the read call
      // has returned yet), so that we know whether or not it's safe to emit
      // 'readable' etc.
      //
      // 3. Actually pull the requested chunks out of the buffer and return.
    
      // if we need a readable event, then we need to do some reading.
      var doRead = state.needReadable;
      debug('need readable', doRead);
    
      // if we currently have less than the highWaterMark, then also read some
      if (state.length === 0 || state.length - n < state.highWaterMark) {
        doRead = true;
        debug('length less than watermark', doRead);
      }
    
      // however, if we've ended, then there's no point, and if we're already
      // reading, then it's unnecessary.
      if (state.ended || state.reading) {
        doRead = false;
        debug('reading or ended', doRead);
      }
    
      if (doRead) {
        debug('do read');
        state.reading = true;
        state.sync = true;
        // if the length is currently zero, then we *need* a readable event.
        if (state.length === 0)
          state.needReadable = true;
        // call internal read method
        this._read(state.highWaterMark);
        state.sync = false;
      }
    
      // If _read pushed data synchronously, then `reading` will be false,
      // and we need to re-evaluate how much data we can return to the user.
      if (doRead && !state.reading)
        n = howMuchToRead(nOrig, state);
    
      var ret;
      if (n > 0)
        ret = fromList(n, state);
      else
        ret = null;
    
      if (ret === null) {
        state.needReadable = true;
        n = 0;
      }
    
      state.length -= n;
    
      // If we have nothing in the buffer, then we want to know
      // as soon as we *do* get something into the buffer.
      if (state.length === 0 && !state.ended)
        state.needReadable = true;
    
      // If we tried to read() past the EOF, then emit end on the next tick.
      if (nOrig !== n && state.ended && state.length === 0)
        endReadable(this);
    
      if (ret !== null)
        this.emit('data', ret);
    
      return ret;
    };
    
    function chunkInvalid(state, chunk) {
      var er = null;
      if (!(Buffer.isBuffer(chunk)) &&
          typeof chunk !== 'string' &&
          chunk !== null &&
          chunk !== undefined &&
          !state.objectMode) {
        er = new TypeError('Invalid non-string/buffer chunk');
      }
      return er;
    }
    
    
    function onEofChunk(stream, state) {
      if (state.ended) return;
      if (state.decoder) {
        var chunk = state.decoder.end();
        if (chunk && chunk.length) {
          state.buffer.push(chunk);
          state.length += state.objectMode ? 1 : chunk.length;
        }
      }
      state.ended = true;
    
      // emit 'readable' now to make sure it gets picked up.
      emitReadable(stream);
    }
    
    // Don't emit readable right away in sync mode, because this can trigger
    // another read() call => stack overflow.  This way, it might trigger
    // a nextTick recursion warning, but that's not so bad.
    function emitReadable(stream) {
      var state = stream._readableState;
      state.needReadable = false;
      if (!state.emittedReadable) {
        debug('emitReadable', state.flowing);
        state.emittedReadable = true;
        if (state.sync)
          processNextTick(emitReadable_, stream);
        else
          emitReadable_(stream);
      }
    }
    
    function emitReadable_(stream) {
      debug('emit readable');
      stream.emit('readable');
      flow(stream);
    }
    
    
    // at this point, the user has presumably seen the 'readable' event,
    // and called read() to consume some data.  that may have triggered
    // in turn another _read(n) call, in which case reading = true if
    // it's in progress.
    // However, if we're not ended, or reading, and the length < hwm,
    // then go ahead and try to read some more preemptively.
    function maybeReadMore(stream, state) {
      if (!state.readingMore) {
        state.readingMore = true;
        processNextTick(maybeReadMore_, stream, state);
      }
    }
    
    function maybeReadMore_(stream, state) {
      var len = state.length;
      while (!state.reading && !state.flowing && !state.ended &&
             state.length < state.highWaterMark) {
        debug('maybeReadMore read 0');
        stream.read(0);
        if (len === state.length)
          // didn't get any data, stop spinning.
          break;
        else
          len = state.length;
      }
      state.readingMore = false;
    }
    
    // abstract method.  to be overridden in specific implementation classes.
    // call cb(er, data) where data is <= n in length.
    // for virtual (non-string, non-buffer) streams, "length" is somewhat
    // arbitrary, and perhaps not very meaningful.
    Readable.prototype._read = function(n) {
      this.emit('error', new Error('not implemented'));
    };
    
    Readable.prototype.pipe = function(dest, pipeOpts) {
      var src = this;
      var state = this._readableState;
    
      switch (state.pipesCount) {
        case 0:
          state.pipes = dest;
          break;
        case 1:
          state.pipes = [state.pipes, dest];
          break;
        default:
          state.pipes.push(dest);
          break;
      }
      state.pipesCount += 1;
      debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);
    
      var doEnd = (!pipeOpts || pipeOpts.end !== false) &&
                  dest !== process.stdout &&
                  dest !== process.stderr;
    
      var endFn = doEnd ? onend : cleanup;
      if (state.endEmitted)
        processNextTick(endFn);
      else
        src.once('end', endFn);
    
      dest.on('unpipe', onunpipe);
      function onunpipe(readable) {
        debug('onunpipe');
        if (readable === src) {
          cleanup();
        }
      }
    
      function onend() {
        debug('onend');
        dest.end();
      }
    
      // when the dest drains, it reduces the awaitDrain counter
      // on the source.  This would be more elegant with a .once()
      // handler in flow(), but adding and removing repeatedly is
      // too slow.
      var ondrain = pipeOnDrain(src);
      dest.on('drain', ondrain);
    
      function cleanup() {
        debug('cleanup');
        // cleanup event handlers once the pipe is broken
        dest.removeListener('close', onclose);
        dest.removeListener('finish', onfinish);
        dest.removeListener('drain', ondrain);
        dest.removeListener('error', onerror);
        dest.removeListener('unpipe', onunpipe);
        src.removeListener('end', onend);
        src.removeListener('end', cleanup);
        src.removeListener('data', ondata);
    
        // if the reader is waiting for a drain event from this
        // specific writer, then it would cause it to never start
        // flowing again.
        // So, if this is awaiting a drain, then we just call it now.
        // If we don't know, then assume that we are waiting for one.
        if (state.awaitDrain &&
            (!dest._writableState || dest._writableState.needDrain))
          ondrain();
      }
    
      src.on('data', ondata);
      function ondata(chunk) {
        debug('ondata');
        var ret = dest.write(chunk);
        if (false === ret) {
          debug('false write response, pause',
                src._readableState.awaitDrain);
          src._readableState.awaitDrain++;
          src.pause();
        }
      }
    
      // if the dest has an error, then stop piping into it.
      // however, don't suppress the throwing behavior for this.
      function onerror(er) {
        debug('onerror', er);
        unpipe();
        dest.removeListener('error', onerror);
        if (EE.listenerCount(dest, 'error') === 0)
          dest.emit('error', er);
      }
      // This is a brutally ugly hack to make sure that our error handler
      // is attached before any userland ones.  NEVER DO THIS.
      if (!dest._events || !dest._events.error)
        dest.on('error', onerror);
      else if (isArray(dest._events.error))
        dest._events.error.unshift(onerror);
      else
        dest._events.error = [onerror, dest._events.error];
    
    
    
      // Both close and finish should trigger unpipe, but only once.
      function onclose() {
        dest.removeListener('finish', onfinish);
        unpipe();
      }
      dest.once('close', onclose);
      function onfinish() {
        debug('onfinish');
        dest.removeListener('close', onclose);
        unpipe();
      }
      dest.once('finish', onfinish);
    
      function unpipe() {
        debug('unpipe');
        src.unpipe(dest);
      }
    
      // tell the dest that it's being piped to
      dest.emit('pipe', src);
    
      // start the flow if it hasn't been started already.
      if (!state.flowing) {
        debug('pipe resume');
        src.resume();
      }
    
      return dest;
    };
    
    function pipeOnDrain(src) {
      return function() {
        var state = src._readableState;
        debug('pipeOnDrain', state.awaitDrain);
        if (state.awaitDrain)
          state.awaitDrain--;
        if (state.awaitDrain === 0 && EE.listenerCount(src, 'data')) {
          state.flowing = true;
          flow(src);
        }
      };
    }
    
    
    Readable.prototype.unpipe = function(dest) {
      var state = this._readableState;
    
      // if we're not piping anywhere, then do nothing.
      if (state.pipesCount === 0)
        return this;
    
      // just one destination.  most common case.
      if (state.pipesCount === 1) {
        // passed in one, but it's not the right one.
        if (dest && dest !== state.pipes)
          return this;
    
        if (!dest)
          dest = state.pipes;
    
        // got a match.
        state.pipes = null;
        state.pipesCount = 0;
        state.flowing = false;
        if (dest)
          dest.emit('unpipe', this);
        return this;
      }
    
      // slow case. multiple pipe destinations.
    
      if (!dest) {
        // remove all.
        var dests = state.pipes;
        var len = state.pipesCount;
        state.pipes = null;
        state.pipesCount = 0;
        state.flowing = false;
    
        for (var i = 0; i < len; i++)
          dests[i].emit('unpipe', this);
        return this;
      }
    
      // try to find the right one.
      var i = indexOf(state.pipes, dest);
      if (i === -1)
        return this;
    
      state.pipes.splice(i, 1);
      state.pipesCount -= 1;
      if (state.pipesCount === 1)
        state.pipes = state.pipes[0];
    
      dest.emit('unpipe', this);
    
      return this;
    };
    
    // set up data events if they are asked for
    // Ensure readable listeners eventually get something
    Readable.prototype.on = function(ev, fn) {
      var res = Stream.prototype.on.call(this, ev, fn);
    
      // If listening to data, and it has not explicitly been paused,
      // then call resume to start the flow of data on the next tick.
      if (ev === 'data' && false !== this._readableState.flowing) {
        this.resume();
      }
    
      if (ev === 'readable' && this.readable) {
        var state = this._readableState;
        if (!state.readableListening) {
          state.readableListening = true;
          state.emittedReadable = false;
          state.needReadable = true;
          if (!state.reading) {
            processNextTick(nReadingNextTick, this);
          } else if (state.length) {
            emitReadable(this, state);
          }
        }
      }
    
      return res;
    };
    Readable.prototype.addListener = Readable.prototype.on;
    
    function nReadingNextTick(self) {
      debug('readable nexttick read 0');
      self.read(0);
    }
    
    // pause() and resume() are remnants of the legacy readable stream API
    // If the user uses them, then switch into old mode.
    Readable.prototype.resume = function() {
      var state = this._readableState;
      if (!state.flowing) {
        debug('resume');
        state.flowing = true;
        resume(this, state);
      }
      return this;
    };
    
    function resume(stream, state) {
      if (!state.resumeScheduled) {
        state.resumeScheduled = true;
        processNextTick(resume_, stream, state);
      }
    }
    
    function resume_(stream, state) {
      if (!state.reading) {
        debug('resume read 0');
        stream.read(0);
      }
    
      state.resumeScheduled = false;
      stream.emit('resume');
      flow(stream);
      if (state.flowing && !state.reading)
        stream.read(0);
    }
    
    Readable.prototype.pause = function() {
      debug('call pause flowing=%j', this._readableState.flowing);
      if (false !== this._readableState.flowing) {
        debug('pause');
        this._readableState.flowing = false;
        this.emit('pause');
      }
      return this;
    };
    
    function flow(stream) {
      var state = stream._readableState;
      debug('flow', state.flowing);
      if (state.flowing) {
        do {
          var chunk = stream.read();
        } while (null !== chunk && state.flowing);
      }
    }
    
    // wrap an old-style stream as the async data source.
    // This is *not* part of the readable stream interface.
    // It is an ugly unfortunate mess of history.
    Readable.prototype.wrap = function(stream) {
      var state = this._readableState;
      var paused = false;
    
      var self = this;
      stream.on('end', function() {
        debug('wrapped end');
        if (state.decoder && !state.ended) {
          var chunk = state.decoder.end();
          if (chunk && chunk.length)
            self.push(chunk);
        }
    
        self.push(null);
      });
    
      stream.on('data', function(chunk) {
        debug('wrapped data');
        if (state.decoder)
          chunk = state.decoder.write(chunk);
    
        // don't skip over falsy values in objectMode
        if (state.objectMode && (chunk === null || chunk === undefined))
          return;
        else if (!state.objectMode && (!chunk || !chunk.length))
          return;
    
        var ret = self.push(chunk);
        if (!ret) {
          paused = true;
          stream.pause();
        }
      });
    
      // proxy all the other methods.
      // important when wrapping filters and duplexes.
      for (var i in stream) {
        if (this[i] === undefined && typeof stream[i] === 'function') {
          this[i] = function(method) { return function() {
            return stream[method].apply(stream, arguments);
          }; }(i);
        }
      }
    
      // proxy certain important events.
      var events = ['error', 'close', 'destroy', 'pause', 'resume'];
      forEach(events, function(ev) {
        stream.on(ev, self.emit.bind(self, ev));
      });
    
      // when we try to consume some more bytes, simply unpause the
      // underlying stream.
      self._read = function(n) {
        debug('wrapped _read', n);
        if (paused) {
          paused = false;
          stream.resume();
        }
      };
    
      return self;
    };
    
    
    
    // exposed for testing purposes only.
    Readable._fromList = fromList;
    
    // Pluck off n bytes from an array of buffers.
    // Length is the combined lengths of all the buffers in the list.
    function fromList(n, state) {
      var list = state.buffer;
      var length = state.length;
      var stringMode = !!state.decoder;
      var objectMode = !!state.objectMode;
      var ret;
    
      // nothing in the list, definitely empty.
      if (list.length === 0)
        return null;
    
      if (length === 0)
        ret = null;
      else if (objectMode)
        ret = list.shift();
      else if (!n || n >= length) {
        // read it all, truncate the array.
        if (stringMode)
          ret = list.join('');
        else
          ret = Buffer.concat(list, length);
        list.length = 0;
      } else {
        // read just some of it.
        if (n < list[0].length) {
          // just take a part of the first list item.
          // slice is the same for buffers and strings.
          var buf = list[0];
          ret = buf.slice(0, n);
          list[0] = buf.slice(n);
        } else if (n === list[0].length) {
          // first list is a perfect match
          ret = list.shift();
        } else {
          // complex case.
          // we have enough to cover it, but it spans past the first buffer.
          if (stringMode)
            ret = '';
          else
            ret = new Buffer(n);
    
          var c = 0;
          for (var i = 0, l = list.length; i < l && c < n; i++) {
            var buf = list[0];
            var cpy = Math.min(n - c, buf.length);
    
            if (stringMode)
              ret += buf.slice(0, cpy);
            else
              buf.copy(ret, c, 0, cpy);
    
            if (cpy < buf.length)
              list[0] = buf.slice(cpy);
            else
              list.shift();
    
            c += cpy;
          }
        }
      }
    
      return ret;
    }
    
    function endReadable(stream) {
      var state = stream._readableState;
    
      // If we get here before consuming all the bytes, then that is a
      // bug in node.  Should never happen.
      if (state.length > 0)
        throw new Error('endReadable called on non-empty stream');
    
      if (!state.endEmitted) {
        state.ended = true;
        processNextTick(endReadableNT, state, stream);
      }
    }
    
    function endReadableNT(state, stream) {
      // Check that we didn't get one last unshift.
      if (!state.endEmitted && state.length === 0) {
        state.endEmitted = true;
        stream.readable = false;
        stream.emit('end');
      }
    }
    
    function forEach (xs, f) {
      for (var i = 0, l = xs.length; i < l; i++) {
        f(xs[i], i);
      }
    }
    
    function indexOf (xs, x) {
      for (var i = 0, l = xs.length; i < l; i++) {
        if (xs[i] === x) return i;
      }
      return -1;
    }
    
  provide("readable-stream/lib/_stream_readable", module.exports);
}(global));

// pakmanager:readable-stream/lib/_stream_duplex
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  // a duplex stream is just a stream that is both readable and writable.
    // Since JS doesn't have multiple prototypal inheritance, this class
    // prototypally inherits from Readable, and then parasitically from
    // Writable.
    
    'use strict';
    
    module.exports = Duplex;
    
    /*<replacement>*/
    var processNextTick = require('process-nextick-args');
    /*</replacement>*/
    
    
    /*<replacement>*/
    var objectKeys = Object.keys || function (obj) {
      var keys = [];
      for (var key in obj) keys.push(key);
      return keys;
    }
    /*</replacement>*/
    
    
    
    /*<replacement>*/
    var util = require('core-util-is');
    util.inherits = require('inherits');
    /*</replacement>*/
    
    var Readable =  require('readable-stream/lib/_stream_readable');
    var Writable =  require('readable-stream/lib/_stream_writable');
    
    util.inherits(Duplex, Readable);
    
    var keys = objectKeys(Writable.prototype);
    for (var v = 0; v < keys.length; v++) {
      var method = keys[v];
      if (!Duplex.prototype[method])
        Duplex.prototype[method] = Writable.prototype[method];
    }
    
    function Duplex(options) {
      if (!(this instanceof Duplex))
        return new Duplex(options);
    
      Readable.call(this, options);
      Writable.call(this, options);
    
      if (options && options.readable === false)
        this.readable = false;
    
      if (options && options.writable === false)
        this.writable = false;
    
      this.allowHalfOpen = true;
      if (options && options.allowHalfOpen === false)
        this.allowHalfOpen = false;
    
      this.once('end', onend);
    }
    
    // the no-half-open enforcer
    function onend() {
      // if we allow half-open state, or if the writable side ended,
      // then we're ok.
      if (this.allowHalfOpen || this._writableState.ended)
        return;
    
      // no more data can be written.
      // But allow more writes to happen in this tick.
      processNextTick(onEndNT, this);
    }
    
    function onEndNT(self) {
      self.end();
    }
    
    function forEach (xs, f) {
      for (var i = 0, l = xs.length; i < l; i++) {
        f(xs[i], i);
      }
    }
    
  provide("readable-stream/lib/_stream_duplex", module.exports);
}(global));

// pakmanager:readable-stream/lib/_stream_transform
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  // a transform stream is a readable/writable stream where you do
    // something with the data.  Sometimes it's called a "filter",
    // but that's not a great name for it, since that implies a thing where
    // some bits pass through, and others are simply ignored.  (That would
    // be a valid example of a transform, of course.)
    //
    // While the output is causally related to the input, it's not a
    // necessarily symmetric or synchronous transformation.  For example,
    // a zlib stream might take multiple plain-text writes(), and then
    // emit a single compressed chunk some time in the future.
    //
    // Here's how this works:
    //
    // The Transform stream has all the aspects of the readable and writable
    // stream classes.  When you write(chunk), that calls _write(chunk,cb)
    // internally, and returns false if there's a lot of pending writes
    // buffered up.  When you call read(), that calls _read(n) until
    // there's enough pending readable data buffered up.
    //
    // In a transform stream, the written data is placed in a buffer.  When
    // _read(n) is called, it transforms the queued up data, calling the
    // buffered _write cb's as it consumes chunks.  If consuming a single
    // written chunk would result in multiple output chunks, then the first
    // outputted bit calls the readcb, and subsequent chunks just go into
    // the read buffer, and will cause it to emit 'readable' if necessary.
    //
    // This way, back-pressure is actually determined by the reading side,
    // since _read has to be called to start processing a new chunk.  However,
    // a pathological inflate type of transform can cause excessive buffering
    // here.  For example, imagine a stream where every byte of input is
    // interpreted as an integer from 0-255, and then results in that many
    // bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
    // 1kb of data being output.  In this case, you could write a very small
    // amount of input, and end up with a very large amount of output.  In
    // such a pathological inflating mechanism, there'd be no way to tell
    // the system to stop doing the transform.  A single 4MB write could
    // cause the system to run out of memory.
    //
    // However, even in such a pathological case, only a single written chunk
    // would be consumed, and then the rest would wait (un-transformed) until
    // the results of the previous transformed chunk were consumed.
    
    'use strict';
    
    module.exports = Transform;
    
    var Duplex =  require('readable-stream/lib/_stream_duplex');
    
    /*<replacement>*/
    var util = require('core-util-is');
    util.inherits = require('inherits');
    /*</replacement>*/
    
    util.inherits(Transform, Duplex);
    
    
    function TransformState(stream) {
      this.afterTransform = function(er, data) {
        return afterTransform(stream, er, data);
      };
    
      this.needTransform = false;
      this.transforming = false;
      this.writecb = null;
      this.writechunk = null;
    }
    
    function afterTransform(stream, er, data) {
      var ts = stream._transformState;
      ts.transforming = false;
    
      var cb = ts.writecb;
    
      if (!cb)
        return stream.emit('error', new Error('no writecb in Transform class'));
    
      ts.writechunk = null;
      ts.writecb = null;
    
      if (data !== null && data !== undefined)
        stream.push(data);
    
      if (cb)
        cb(er);
    
      var rs = stream._readableState;
      rs.reading = false;
      if (rs.needReadable || rs.length < rs.highWaterMark) {
        stream._read(rs.highWaterMark);
      }
    }
    
    
    function Transform(options) {
      if (!(this instanceof Transform))
        return new Transform(options);
    
      Duplex.call(this, options);
    
      this._transformState = new TransformState(this);
    
      // when the writable side finishes, then flush out anything remaining.
      var stream = this;
    
      // start out asking for a readable event once data is transformed.
      this._readableState.needReadable = true;
    
      // we have implemented the _read method, and done the other things
      // that Readable wants before the first _read call, so unset the
      // sync guard flag.
      this._readableState.sync = false;
    
      if (options) {
        if (typeof options.transform === 'function')
          this._transform = options.transform;
    
        if (typeof options.flush === 'function')
          this._flush = options.flush;
      }
    
      this.once('prefinish', function() {
        if (typeof this._flush === 'function')
          this._flush(function(er) {
            done(stream, er);
          });
        else
          done(stream);
      });
    }
    
    Transform.prototype.push = function(chunk, encoding) {
      this._transformState.needTransform = false;
      return Duplex.prototype.push.call(this, chunk, encoding);
    };
    
    // This is the part where you do stuff!
    // override this function in implementation classes.
    // 'chunk' is an input chunk.
    //
    // Call `push(newChunk)` to pass along transformed output
    // to the readable side.  You may call 'push' zero or more times.
    //
    // Call `cb(err)` when you are done with this chunk.  If you pass
    // an error, then that'll put the hurt on the whole operation.  If you
    // never call cb(), then you'll never get another chunk.
    Transform.prototype._transform = function(chunk, encoding, cb) {
      throw new Error('not implemented');
    };
    
    Transform.prototype._write = function(chunk, encoding, cb) {
      var ts = this._transformState;
      ts.writecb = cb;
      ts.writechunk = chunk;
      ts.writeencoding = encoding;
      if (!ts.transforming) {
        var rs = this._readableState;
        if (ts.needTransform ||
            rs.needReadable ||
            rs.length < rs.highWaterMark)
          this._read(rs.highWaterMark);
      }
    };
    
    // Doesn't matter what the args are here.
    // _transform does all the work.
    // That we got here means that the readable side wants more data.
    Transform.prototype._read = function(n) {
      var ts = this._transformState;
    
      if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
        ts.transforming = true;
        this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
      } else {
        // mark that we need a transform, so that any data that comes in
        // will get processed, now that we've asked for it.
        ts.needTransform = true;
      }
    };
    
    
    function done(stream, er) {
      if (er)
        return stream.emit('error', er);
    
      // if there's nothing in the write buffer, then that means
      // that nothing more will ever be provided
      var ws = stream._writableState;
      var ts = stream._transformState;
    
      if (ws.length)
        throw new Error('calling transform done when ws.length != 0');
    
      if (ts.transforming)
        throw new Error('calling transform done when still transforming');
    
      return stream.push(null);
    }
    
  provide("readable-stream/lib/_stream_transform", module.exports);
}(global));

// pakmanager:readable-stream/lib/_stream_readable.js
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  'use strict';
    
    module.exports = Readable;
    
    /*<replacement>*/
    var processNextTick = require('process-nextick-args');
    /*</replacement>*/
    
    
    /*<replacement>*/
    var isArray = require('isarray');
    /*</replacement>*/
    
    
    /*<replacement>*/
    var Buffer = require('buffer').Buffer;
    /*</replacement>*/
    
    Readable.ReadableState = ReadableState;
    
    var EE = require('events').EventEmitter;
    
    /*<replacement>*/
    if (!EE.listenerCount) EE.listenerCount = function(emitter, type) {
      return emitter.listeners(type).length;
    };
    /*</replacement>*/
    
    
    
    /*<replacement>*/
    var Stream;
     (function (){try{
    Stream = require('st' + 'ream');
    }catch(_){Stream = require('events').EventEmitter;}}())
    /*</replacement>*/
    
    
    /*<replacement>*/
    var util = require('core-util-is');
    util.inherits = require('inherits');
    /*</replacement>*/
    
    
    
    /*<replacement>*/
    var debug = require('util');
    if (debug && debug.debuglog) {
      debug = debug.debuglog('stream');
    } else {
      debug = function () {};
    }
    /*</replacement>*/
    
    var StringDecoder;
    
    util.inherits(Readable, Stream);
    
    function ReadableState(options, stream) {
      var Duplex =  require('readable-stream/lib/_stream_duplex');
    
      options = options || {};
    
      // object stream flag. Used to make read(n) ignore n and to
      // make all the buffer merging and length checks go away
      this.objectMode = !!options.objectMode;
    
      if (stream instanceof Duplex)
        this.objectMode = this.objectMode || !!options.readableObjectMode;
    
      // the point at which it stops calling _read() to fill the buffer
      // Note: 0 is a valid value, means "don't call _read preemptively ever"
      var hwm = options.highWaterMark;
      var defaultHwm = this.objectMode ? 16 : 16 * 1024;
      this.highWaterMark = (hwm || hwm === 0) ? hwm : defaultHwm;
    
      // cast to ints.
      this.highWaterMark = ~~this.highWaterMark;
    
      this.buffer = [];
      this.length = 0;
      this.pipes = null;
      this.pipesCount = 0;
      this.flowing = null;
      this.ended = false;
      this.endEmitted = false;
      this.reading = false;
    
      // a flag to be able to tell if the onwrite cb is called immediately,
      // or on a later tick.  We set this to true at first, because any
      // actions that shouldn't happen until "later" should generally also
      // not happen before the first write call.
      this.sync = true;
    
      // whenever we return null, then we set a flag to say
      // that we're awaiting a 'readable' event emission.
      this.needReadable = false;
      this.emittedReadable = false;
      this.readableListening = false;
    
      // Crypto is kind of old and crusty.  Historically, its default string
      // encoding is 'binary' so we have to make this configurable.
      // Everything else in the universe uses 'utf8', though.
      this.defaultEncoding = options.defaultEncoding || 'utf8';
    
      // when piping, we only care about 'readable' events that happen
      // after read()ing all the bytes and not getting any pushback.
      this.ranOut = false;
    
      // the number of writers that are awaiting a drain event in .pipe()s
      this.awaitDrain = 0;
    
      // if true, a maybeReadMore has been scheduled
      this.readingMore = false;
    
      this.decoder = null;
      this.encoding = null;
      if (options.encoding) {
        if (!StringDecoder)
          StringDecoder = require('string_decoder/').StringDecoder;
        this.decoder = new StringDecoder(options.encoding);
        this.encoding = options.encoding;
      }
    }
    
    function Readable(options) {
      var Duplex =  require('readable-stream/lib/_stream_duplex');
    
      if (!(this instanceof Readable))
        return new Readable(options);
    
      this._readableState = new ReadableState(options, this);
    
      // legacy
      this.readable = true;
    
      if (options && typeof options.read === 'function')
        this._read = options.read;
    
      Stream.call(this);
    }
    
    // Manually shove something into the read() buffer.
    // This returns true if the highWaterMark has not been hit yet,
    // similar to how Writable.write() returns true if you should
    // write() some more.
    Readable.prototype.push = function(chunk, encoding) {
      var state = this._readableState;
    
      if (!state.objectMode && typeof chunk === 'string') {
        encoding = encoding || state.defaultEncoding;
        if (encoding !== state.encoding) {
          chunk = new Buffer(chunk, encoding);
          encoding = '';
        }
      }
    
      return readableAddChunk(this, state, chunk, encoding, false);
    };
    
    // Unshift should *always* be something directly out of read()
    Readable.prototype.unshift = function(chunk) {
      var state = this._readableState;
      return readableAddChunk(this, state, chunk, '', true);
    };
    
    Readable.prototype.isPaused = function() {
      return this._readableState.flowing === false;
    };
    
    function readableAddChunk(stream, state, chunk, encoding, addToFront) {
      var er = chunkInvalid(state, chunk);
      if (er) {
        stream.emit('error', er);
      } else if (chunk === null) {
        state.reading = false;
        onEofChunk(stream, state);
      } else if (state.objectMode || chunk && chunk.length > 0) {
        if (state.ended && !addToFront) {
          var e = new Error('stream.push() after EOF');
          stream.emit('error', e);
        } else if (state.endEmitted && addToFront) {
          var e = new Error('stream.unshift() after end event');
          stream.emit('error', e);
        } else {
          if (state.decoder && !addToFront && !encoding)
            chunk = state.decoder.write(chunk);
    
          if (!addToFront)
            state.reading = false;
    
          // if we want the data now, just emit it.
          if (state.flowing && state.length === 0 && !state.sync) {
            stream.emit('data', chunk);
            stream.read(0);
          } else {
            // update the buffer info.
            state.length += state.objectMode ? 1 : chunk.length;
            if (addToFront)
              state.buffer.unshift(chunk);
            else
              state.buffer.push(chunk);
    
            if (state.needReadable)
              emitReadable(stream);
          }
    
          maybeReadMore(stream, state);
        }
      } else if (!addToFront) {
        state.reading = false;
      }
    
      return needMoreData(state);
    }
    
    
    
    // if it's past the high water mark, we can push in some more.
    // Also, if we have no data yet, we can stand some
    // more bytes.  This is to work around cases where hwm=0,
    // such as the repl.  Also, if the push() triggered a
    // readable event, and the user called read(largeNumber) such that
    // needReadable was set, then we ought to push more, so that another
    // 'readable' event will be triggered.
    function needMoreData(state) {
      return !state.ended &&
             (state.needReadable ||
              state.length < state.highWaterMark ||
              state.length === 0);
    }
    
    // backwards compatibility.
    Readable.prototype.setEncoding = function(enc) {
      if (!StringDecoder)
        StringDecoder = require('string_decoder/').StringDecoder;
      this._readableState.decoder = new StringDecoder(enc);
      this._readableState.encoding = enc;
      return this;
    };
    
    // Don't raise the hwm > 128MB
    var MAX_HWM = 0x800000;
    function roundUpToNextPowerOf2(n) {
      if (n >= MAX_HWM) {
        n = MAX_HWM;
      } else {
        // Get the next highest power of 2
        n--;
        for (var p = 1; p < 32; p <<= 1) n |= n >> p;
        n++;
      }
      return n;
    }
    
    function howMuchToRead(n, state) {
      if (state.length === 0 && state.ended)
        return 0;
    
      if (state.objectMode)
        return n === 0 ? 0 : 1;
    
      if (n === null || isNaN(n)) {
        // only flow one buffer at a time
        if (state.flowing && state.buffer.length)
          return state.buffer[0].length;
        else
          return state.length;
      }
    
      if (n <= 0)
        return 0;
    
      // If we're asking for more than the target buffer level,
      // then raise the water mark.  Bump up to the next highest
      // power of 2, to prevent increasing it excessively in tiny
      // amounts.
      if (n > state.highWaterMark)
        state.highWaterMark = roundUpToNextPowerOf2(n);
    
      // don't have that much.  return null, unless we've ended.
      if (n > state.length) {
        if (!state.ended) {
          state.needReadable = true;
          return 0;
        } else {
          return state.length;
        }
      }
    
      return n;
    }
    
    // you can override either this method, or the async _read(n) below.
    Readable.prototype.read = function(n) {
      debug('read', n);
      var state = this._readableState;
      var nOrig = n;
    
      if (typeof n !== 'number' || n > 0)
        state.emittedReadable = false;
    
      // if we're doing read(0) to trigger a readable event, but we
      // already have a bunch of data in the buffer, then just trigger
      // the 'readable' event and move on.
      if (n === 0 &&
          state.needReadable &&
          (state.length >= state.highWaterMark || state.ended)) {
        debug('read: emitReadable', state.length, state.ended);
        if (state.length === 0 && state.ended)
          endReadable(this);
        else
          emitReadable(this);
        return null;
      }
    
      n = howMuchToRead(n, state);
    
      // if we've ended, and we're now clear, then finish it up.
      if (n === 0 && state.ended) {
        if (state.length === 0)
          endReadable(this);
        return null;
      }
    
      // All the actual chunk generation logic needs to be
      // *below* the call to _read.  The reason is that in certain
      // synthetic stream cases, such as passthrough streams, _read
      // may be a completely synchronous operation which may change
      // the state of the read buffer, providing enough data when
      // before there was *not* enough.
      //
      // So, the steps are:
      // 1. Figure out what the state of things will be after we do
      // a read from the buffer.
      //
      // 2. If that resulting state will trigger a _read, then call _read.
      // Note that this may be asynchronous, or synchronous.  Yes, it is
      // deeply ugly to write APIs this way, but that still doesn't mean
      // that the Readable class should behave improperly, as streams are
      // designed to be sync/async agnostic.
      // Take note if the _read call is sync or async (ie, if the read call
      // has returned yet), so that we know whether or not it's safe to emit
      // 'readable' etc.
      //
      // 3. Actually pull the requested chunks out of the buffer and return.
    
      // if we need a readable event, then we need to do some reading.
      var doRead = state.needReadable;
      debug('need readable', doRead);
    
      // if we currently have less than the highWaterMark, then also read some
      if (state.length === 0 || state.length - n < state.highWaterMark) {
        doRead = true;
        debug('length less than watermark', doRead);
      }
    
      // however, if we've ended, then there's no point, and if we're already
      // reading, then it's unnecessary.
      if (state.ended || state.reading) {
        doRead = false;
        debug('reading or ended', doRead);
      }
    
      if (doRead) {
        debug('do read');
        state.reading = true;
        state.sync = true;
        // if the length is currently zero, then we *need* a readable event.
        if (state.length === 0)
          state.needReadable = true;
        // call internal read method
        this._read(state.highWaterMark);
        state.sync = false;
      }
    
      // If _read pushed data synchronously, then `reading` will be false,
      // and we need to re-evaluate how much data we can return to the user.
      if (doRead && !state.reading)
        n = howMuchToRead(nOrig, state);
    
      var ret;
      if (n > 0)
        ret = fromList(n, state);
      else
        ret = null;
    
      if (ret === null) {
        state.needReadable = true;
        n = 0;
      }
    
      state.length -= n;
    
      // If we have nothing in the buffer, then we want to know
      // as soon as we *do* get something into the buffer.
      if (state.length === 0 && !state.ended)
        state.needReadable = true;
    
      // If we tried to read() past the EOF, then emit end on the next tick.
      if (nOrig !== n && state.ended && state.length === 0)
        endReadable(this);
    
      if (ret !== null)
        this.emit('data', ret);
    
      return ret;
    };
    
    function chunkInvalid(state, chunk) {
      var er = null;
      if (!(Buffer.isBuffer(chunk)) &&
          typeof chunk !== 'string' &&
          chunk !== null &&
          chunk !== undefined &&
          !state.objectMode) {
        er = new TypeError('Invalid non-string/buffer chunk');
      }
      return er;
    }
    
    
    function onEofChunk(stream, state) {
      if (state.ended) return;
      if (state.decoder) {
        var chunk = state.decoder.end();
        if (chunk && chunk.length) {
          state.buffer.push(chunk);
          state.length += state.objectMode ? 1 : chunk.length;
        }
      }
      state.ended = true;
    
      // emit 'readable' now to make sure it gets picked up.
      emitReadable(stream);
    }
    
    // Don't emit readable right away in sync mode, because this can trigger
    // another read() call => stack overflow.  This way, it might trigger
    // a nextTick recursion warning, but that's not so bad.
    function emitReadable(stream) {
      var state = stream._readableState;
      state.needReadable = false;
      if (!state.emittedReadable) {
        debug('emitReadable', state.flowing);
        state.emittedReadable = true;
        if (state.sync)
          processNextTick(emitReadable_, stream);
        else
          emitReadable_(stream);
      }
    }
    
    function emitReadable_(stream) {
      debug('emit readable');
      stream.emit('readable');
      flow(stream);
    }
    
    
    // at this point, the user has presumably seen the 'readable' event,
    // and called read() to consume some data.  that may have triggered
    // in turn another _read(n) call, in which case reading = true if
    // it's in progress.
    // However, if we're not ended, or reading, and the length < hwm,
    // then go ahead and try to read some more preemptively.
    function maybeReadMore(stream, state) {
      if (!state.readingMore) {
        state.readingMore = true;
        processNextTick(maybeReadMore_, stream, state);
      }
    }
    
    function maybeReadMore_(stream, state) {
      var len = state.length;
      while (!state.reading && !state.flowing && !state.ended &&
             state.length < state.highWaterMark) {
        debug('maybeReadMore read 0');
        stream.read(0);
        if (len === state.length)
          // didn't get any data, stop spinning.
          break;
        else
          len = state.length;
      }
      state.readingMore = false;
    }
    
    // abstract method.  to be overridden in specific implementation classes.
    // call cb(er, data) where data is <= n in length.
    // for virtual (non-string, non-buffer) streams, "length" is somewhat
    // arbitrary, and perhaps not very meaningful.
    Readable.prototype._read = function(n) {
      this.emit('error', new Error('not implemented'));
    };
    
    Readable.prototype.pipe = function(dest, pipeOpts) {
      var src = this;
      var state = this._readableState;
    
      switch (state.pipesCount) {
        case 0:
          state.pipes = dest;
          break;
        case 1:
          state.pipes = [state.pipes, dest];
          break;
        default:
          state.pipes.push(dest);
          break;
      }
      state.pipesCount += 1;
      debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);
    
      var doEnd = (!pipeOpts || pipeOpts.end !== false) &&
                  dest !== process.stdout &&
                  dest !== process.stderr;
    
      var endFn = doEnd ? onend : cleanup;
      if (state.endEmitted)
        processNextTick(endFn);
      else
        src.once('end', endFn);
    
      dest.on('unpipe', onunpipe);
      function onunpipe(readable) {
        debug('onunpipe');
        if (readable === src) {
          cleanup();
        }
      }
    
      function onend() {
        debug('onend');
        dest.end();
      }
    
      // when the dest drains, it reduces the awaitDrain counter
      // on the source.  This would be more elegant with a .once()
      // handler in flow(), but adding and removing repeatedly is
      // too slow.
      var ondrain = pipeOnDrain(src);
      dest.on('drain', ondrain);
    
      function cleanup() {
        debug('cleanup');
        // cleanup event handlers once the pipe is broken
        dest.removeListener('close', onclose);
        dest.removeListener('finish', onfinish);
        dest.removeListener('drain', ondrain);
        dest.removeListener('error', onerror);
        dest.removeListener('unpipe', onunpipe);
        src.removeListener('end', onend);
        src.removeListener('end', cleanup);
        src.removeListener('data', ondata);
    
        // if the reader is waiting for a drain event from this
        // specific writer, then it would cause it to never start
        // flowing again.
        // So, if this is awaiting a drain, then we just call it now.
        // If we don't know, then assume that we are waiting for one.
        if (state.awaitDrain &&
            (!dest._writableState || dest._writableState.needDrain))
          ondrain();
      }
    
      src.on('data', ondata);
      function ondata(chunk) {
        debug('ondata');
        var ret = dest.write(chunk);
        if (false === ret) {
          debug('false write response, pause',
                src._readableState.awaitDrain);
          src._readableState.awaitDrain++;
          src.pause();
        }
      }
    
      // if the dest has an error, then stop piping into it.
      // however, don't suppress the throwing behavior for this.
      function onerror(er) {
        debug('onerror', er);
        unpipe();
        dest.removeListener('error', onerror);
        if (EE.listenerCount(dest, 'error') === 0)
          dest.emit('error', er);
      }
      // This is a brutally ugly hack to make sure that our error handler
      // is attached before any userland ones.  NEVER DO THIS.
      if (!dest._events || !dest._events.error)
        dest.on('error', onerror);
      else if (isArray(dest._events.error))
        dest._events.error.unshift(onerror);
      else
        dest._events.error = [onerror, dest._events.error];
    
    
    
      // Both close and finish should trigger unpipe, but only once.
      function onclose() {
        dest.removeListener('finish', onfinish);
        unpipe();
      }
      dest.once('close', onclose);
      function onfinish() {
        debug('onfinish');
        dest.removeListener('close', onclose);
        unpipe();
      }
      dest.once('finish', onfinish);
    
      function unpipe() {
        debug('unpipe');
        src.unpipe(dest);
      }
    
      // tell the dest that it's being piped to
      dest.emit('pipe', src);
    
      // start the flow if it hasn't been started already.
      if (!state.flowing) {
        debug('pipe resume');
        src.resume();
      }
    
      return dest;
    };
    
    function pipeOnDrain(src) {
      return function() {
        var state = src._readableState;
        debug('pipeOnDrain', state.awaitDrain);
        if (state.awaitDrain)
          state.awaitDrain--;
        if (state.awaitDrain === 0 && EE.listenerCount(src, 'data')) {
          state.flowing = true;
          flow(src);
        }
      };
    }
    
    
    Readable.prototype.unpipe = function(dest) {
      var state = this._readableState;
    
      // if we're not piping anywhere, then do nothing.
      if (state.pipesCount === 0)
        return this;
    
      // just one destination.  most common case.
      if (state.pipesCount === 1) {
        // passed in one, but it's not the right one.
        if (dest && dest !== state.pipes)
          return this;
    
        if (!dest)
          dest = state.pipes;
    
        // got a match.
        state.pipes = null;
        state.pipesCount = 0;
        state.flowing = false;
        if (dest)
          dest.emit('unpipe', this);
        return this;
      }
    
      // slow case. multiple pipe destinations.
    
      if (!dest) {
        // remove all.
        var dests = state.pipes;
        var len = state.pipesCount;
        state.pipes = null;
        state.pipesCount = 0;
        state.flowing = false;
    
        for (var i = 0; i < len; i++)
          dests[i].emit('unpipe', this);
        return this;
      }
    
      // try to find the right one.
      var i = indexOf(state.pipes, dest);
      if (i === -1)
        return this;
    
      state.pipes.splice(i, 1);
      state.pipesCount -= 1;
      if (state.pipesCount === 1)
        state.pipes = state.pipes[0];
    
      dest.emit('unpipe', this);
    
      return this;
    };
    
    // set up data events if they are asked for
    // Ensure readable listeners eventually get something
    Readable.prototype.on = function(ev, fn) {
      var res = Stream.prototype.on.call(this, ev, fn);
    
      // If listening to data, and it has not explicitly been paused,
      // then call resume to start the flow of data on the next tick.
      if (ev === 'data' && false !== this._readableState.flowing) {
        this.resume();
      }
    
      if (ev === 'readable' && this.readable) {
        var state = this._readableState;
        if (!state.readableListening) {
          state.readableListening = true;
          state.emittedReadable = false;
          state.needReadable = true;
          if (!state.reading) {
            processNextTick(nReadingNextTick, this);
          } else if (state.length) {
            emitReadable(this, state);
          }
        }
      }
    
      return res;
    };
    Readable.prototype.addListener = Readable.prototype.on;
    
    function nReadingNextTick(self) {
      debug('readable nexttick read 0');
      self.read(0);
    }
    
    // pause() and resume() are remnants of the legacy readable stream API
    // If the user uses them, then switch into old mode.
    Readable.prototype.resume = function() {
      var state = this._readableState;
      if (!state.flowing) {
        debug('resume');
        state.flowing = true;
        resume(this, state);
      }
      return this;
    };
    
    function resume(stream, state) {
      if (!state.resumeScheduled) {
        state.resumeScheduled = true;
        processNextTick(resume_, stream, state);
      }
    }
    
    function resume_(stream, state) {
      if (!state.reading) {
        debug('resume read 0');
        stream.read(0);
      }
    
      state.resumeScheduled = false;
      stream.emit('resume');
      flow(stream);
      if (state.flowing && !state.reading)
        stream.read(0);
    }
    
    Readable.prototype.pause = function() {
      debug('call pause flowing=%j', this._readableState.flowing);
      if (false !== this._readableState.flowing) {
        debug('pause');
        this._readableState.flowing = false;
        this.emit('pause');
      }
      return this;
    };
    
    function flow(stream) {
      var state = stream._readableState;
      debug('flow', state.flowing);
      if (state.flowing) {
        do {
          var chunk = stream.read();
        } while (null !== chunk && state.flowing);
      }
    }
    
    // wrap an old-style stream as the async data source.
    // This is *not* part of the readable stream interface.
    // It is an ugly unfortunate mess of history.
    Readable.prototype.wrap = function(stream) {
      var state = this._readableState;
      var paused = false;
    
      var self = this;
      stream.on('end', function() {
        debug('wrapped end');
        if (state.decoder && !state.ended) {
          var chunk = state.decoder.end();
          if (chunk && chunk.length)
            self.push(chunk);
        }
    
        self.push(null);
      });
    
      stream.on('data', function(chunk) {
        debug('wrapped data');
        if (state.decoder)
          chunk = state.decoder.write(chunk);
    
        // don't skip over falsy values in objectMode
        if (state.objectMode && (chunk === null || chunk === undefined))
          return;
        else if (!state.objectMode && (!chunk || !chunk.length))
          return;
    
        var ret = self.push(chunk);
        if (!ret) {
          paused = true;
          stream.pause();
        }
      });
    
      // proxy all the other methods.
      // important when wrapping filters and duplexes.
      for (var i in stream) {
        if (this[i] === undefined && typeof stream[i] === 'function') {
          this[i] = function(method) { return function() {
            return stream[method].apply(stream, arguments);
          }; }(i);
        }
      }
    
      // proxy certain important events.
      var events = ['error', 'close', 'destroy', 'pause', 'resume'];
      forEach(events, function(ev) {
        stream.on(ev, self.emit.bind(self, ev));
      });
    
      // when we try to consume some more bytes, simply unpause the
      // underlying stream.
      self._read = function(n) {
        debug('wrapped _read', n);
        if (paused) {
          paused = false;
          stream.resume();
        }
      };
    
      return self;
    };
    
    
    
    // exposed for testing purposes only.
    Readable._fromList = fromList;
    
    // Pluck off n bytes from an array of buffers.
    // Length is the combined lengths of all the buffers in the list.
    function fromList(n, state) {
      var list = state.buffer;
      var length = state.length;
      var stringMode = !!state.decoder;
      var objectMode = !!state.objectMode;
      var ret;
    
      // nothing in the list, definitely empty.
      if (list.length === 0)
        return null;
    
      if (length === 0)
        ret = null;
      else if (objectMode)
        ret = list.shift();
      else if (!n || n >= length) {
        // read it all, truncate the array.
        if (stringMode)
          ret = list.join('');
        else
          ret = Buffer.concat(list, length);
        list.length = 0;
      } else {
        // read just some of it.
        if (n < list[0].length) {
          // just take a part of the first list item.
          // slice is the same for buffers and strings.
          var buf = list[0];
          ret = buf.slice(0, n);
          list[0] = buf.slice(n);
        } else if (n === list[0].length) {
          // first list is a perfect match
          ret = list.shift();
        } else {
          // complex case.
          // we have enough to cover it, but it spans past the first buffer.
          if (stringMode)
            ret = '';
          else
            ret = new Buffer(n);
    
          var c = 0;
          for (var i = 0, l = list.length; i < l && c < n; i++) {
            var buf = list[0];
            var cpy = Math.min(n - c, buf.length);
    
            if (stringMode)
              ret += buf.slice(0, cpy);
            else
              buf.copy(ret, c, 0, cpy);
    
            if (cpy < buf.length)
              list[0] = buf.slice(cpy);
            else
              list.shift();
    
            c += cpy;
          }
        }
      }
    
      return ret;
    }
    
    function endReadable(stream) {
      var state = stream._readableState;
    
      // If we get here before consuming all the bytes, then that is a
      // bug in node.  Should never happen.
      if (state.length > 0)
        throw new Error('endReadable called on non-empty stream');
    
      if (!state.endEmitted) {
        state.ended = true;
        processNextTick(endReadableNT, state, stream);
      }
    }
    
    function endReadableNT(state, stream) {
      // Check that we didn't get one last unshift.
      if (!state.endEmitted && state.length === 0) {
        state.endEmitted = true;
        stream.readable = false;
        stream.emit('end');
      }
    }
    
    function forEach (xs, f) {
      for (var i = 0, l = xs.length; i < l; i++) {
        f(xs[i], i);
      }
    }
    
    function indexOf (xs, x) {
      for (var i = 0, l = xs.length; i < l; i++) {
        if (xs[i] === x) return i;
      }
      return -1;
    }
    
  provide("readable-stream/lib/_stream_readable.js", module.exports);
}(global));

// pakmanager:readable-stream/lib/_stream_writable.js
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  // A bit simpler than readable streams.
    // Implement an async ._write(chunk, cb), and it'll handle all
    // the drain event emission and buffering.
    
    'use strict';
    
    module.exports = Writable;
    
    /*<replacement>*/
    var processNextTick = require('process-nextick-args');
    /*</replacement>*/
    
    
    /*<replacement>*/
    var Buffer = require('buffer').Buffer;
    /*</replacement>*/
    
    Writable.WritableState = WritableState;
    
    
    /*<replacement>*/
    var util = require('core-util-is');
    util.inherits = require('inherits');
    /*</replacement>*/
    
    
    
    /*<replacement>*/
    var Stream;
     (function (){try{
    Stream = require('st' + 'ream');
    }catch(_){Stream = require('events').EventEmitter;}}())
    /*</replacement>*/
    
    
    util.inherits(Writable, Stream);
    
    function nop() {}
    
    function WriteReq(chunk, encoding, cb) {
      this.chunk = chunk;
      this.encoding = encoding;
      this.callback = cb;
      this.next = null;
    }
    
    function WritableState(options, stream) {
      var Duplex =  require('readable-stream/lib/_stream_duplex');
    
      options = options || {};
    
      // object stream flag to indicate whether or not this stream
      // contains buffers or objects.
      this.objectMode = !!options.objectMode;
    
      if (stream instanceof Duplex)
        this.objectMode = this.objectMode || !!options.writableObjectMode;
    
      // the point at which write() starts returning false
      // Note: 0 is a valid value, means that we always return false if
      // the entire buffer is not flushed immediately on write()
      var hwm = options.highWaterMark;
      var defaultHwm = this.objectMode ? 16 : 16 * 1024;
      this.highWaterMark = (hwm || hwm === 0) ? hwm : defaultHwm;
    
      // cast to ints.
      this.highWaterMark = ~~this.highWaterMark;
    
      this.needDrain = false;
      // at the start of calling end()
      this.ending = false;
      // when end() has been called, and returned
      this.ended = false;
      // when 'finish' is emitted
      this.finished = false;
    
      // should we decode strings into buffers before passing to _write?
      // this is here so that some node-core streams can optimize string
      // handling at a lower level.
      var noDecode = options.decodeStrings === false;
      this.decodeStrings = !noDecode;
    
      // Crypto is kind of old and crusty.  Historically, its default string
      // encoding is 'binary' so we have to make this configurable.
      // Everything else in the universe uses 'utf8', though.
      this.defaultEncoding = options.defaultEncoding || 'utf8';
    
      // not an actual buffer we keep track of, but a measurement
      // of how much we're waiting to get pushed to some underlying
      // socket or file.
      this.length = 0;
    
      // a flag to see when we're in the middle of a write.
      this.writing = false;
    
      // when true all writes will be buffered until .uncork() call
      this.corked = 0;
    
      // a flag to be able to tell if the onwrite cb is called immediately,
      // or on a later tick.  We set this to true at first, because any
      // actions that shouldn't happen until "later" should generally also
      // not happen before the first write call.
      this.sync = true;
    
      // a flag to know if we're processing previously buffered items, which
      // may call the _write() callback in the same tick, so that we don't
      // end up in an overlapped onwrite situation.
      this.bufferProcessing = false;
    
      // the callback that's passed to _write(chunk,cb)
      this.onwrite = function(er) {
        onwrite(stream, er);
      };
    
      // the callback that the user supplies to write(chunk,encoding,cb)
      this.writecb = null;
    
      // the amount that is being written when _write is called.
      this.writelen = 0;
    
      this.bufferedRequest = null;
      this.lastBufferedRequest = null;
    
      // number of pending user-supplied write callbacks
      // this must be 0 before 'finish' can be emitted
      this.pendingcb = 0;
    
      // emit prefinish if the only thing we're waiting for is _write cbs
      // This is relevant for synchronous Transform streams
      this.prefinished = false;
    
      // True if the error was already emitted and should not be thrown again
      this.errorEmitted = false;
    }
    
    WritableState.prototype.getBuffer = function writableStateGetBuffer() {
      var current = this.bufferedRequest;
      var out = [];
      while (current) {
        out.push(current);
        current = current.next;
      }
      return out;
    };
    
    Object.defineProperty(WritableState.prototype, 'buffer', {
      get: require('util-deprecate')(function() {
        return this.getBuffer();
      }, '_writableState.buffer is deprecated. Use ' +
          '_writableState.getBuffer() instead.')
    });
    
    function Writable(options) {
      var Duplex =  require('readable-stream/lib/_stream_duplex');
    
      // Writable ctor is applied to Duplexes, though they're not
      // instanceof Writable, they're instanceof Readable.
      if (!(this instanceof Writable) && !(this instanceof Duplex))
        return new Writable(options);
    
      this._writableState = new WritableState(options, this);
    
      // legacy.
      this.writable = true;
    
      if (options) {
        if (typeof options.write === 'function')
          this._write = options.write;
    
        if (typeof options.writev === 'function')
          this._writev = options.writev;
      }
    
      Stream.call(this);
    }
    
    // Otherwise people can pipe Writable streams, which is just wrong.
    Writable.prototype.pipe = function() {
      this.emit('error', new Error('Cannot pipe. Not readable.'));
    };
    
    
    function writeAfterEnd(stream, cb) {
      var er = new Error('write after end');
      // TODO: defer error events consistently everywhere, not just the cb
      stream.emit('error', er);
      processNextTick(cb, er);
    }
    
    // If we get something that is not a buffer, string, null, or undefined,
    // and we're not in objectMode, then that's an error.
    // Otherwise stream chunks are all considered to be of length=1, and the
    // watermarks determine how many objects to keep in the buffer, rather than
    // how many bytes or characters.
    function validChunk(stream, state, chunk, cb) {
      var valid = true;
    
      if (!(Buffer.isBuffer(chunk)) &&
          typeof chunk !== 'string' &&
          chunk !== null &&
          chunk !== undefined &&
          !state.objectMode) {
        var er = new TypeError('Invalid non-string/buffer chunk');
        stream.emit('error', er);
        processNextTick(cb, er);
        valid = false;
      }
      return valid;
    }
    
    Writable.prototype.write = function(chunk, encoding, cb) {
      var state = this._writableState;
      var ret = false;
    
      if (typeof encoding === 'function') {
        cb = encoding;
        encoding = null;
      }
    
      if (chunk instanceof Buffer)
        encoding = 'buffer';
      else if (!encoding)
        encoding = state.defaultEncoding;
    
      if (typeof cb !== 'function')
        cb = nop;
    
      if (state.ended)
        writeAfterEnd(this, cb);
      else if (validChunk(this, state, chunk, cb)) {
        state.pendingcb++;
        ret = writeOrBuffer(this, state, chunk, encoding, cb);
      }
    
      return ret;
    };
    
    Writable.prototype.cork = function() {
      var state = this._writableState;
    
      state.corked++;
    };
    
    Writable.prototype.uncork = function() {
      var state = this._writableState;
    
      if (state.corked) {
        state.corked--;
    
        if (!state.writing &&
            !state.corked &&
            !state.finished &&
            !state.bufferProcessing &&
            state.bufferedRequest)
          clearBuffer(this, state);
      }
    };
    
    Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
      // node::ParseEncoding() requires lower case.
      if (typeof encoding === 'string')
        encoding = encoding.toLowerCase();
      if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64',
    'ucs2', 'ucs-2','utf16le', 'utf-16le', 'raw']
    .indexOf((encoding + '').toLowerCase()) > -1))
        throw new TypeError('Unknown encoding: ' + encoding);
      this._writableState.defaultEncoding = encoding;
    };
    
    function decodeChunk(state, chunk, encoding) {
      if (!state.objectMode &&
          state.decodeStrings !== false &&
          typeof chunk === 'string') {
        chunk = new Buffer(chunk, encoding);
      }
      return chunk;
    }
    
    // if we're already writing something, then just put this
    // in the queue, and wait our turn.  Otherwise, call _write
    // If we return false, then we need a drain event, so set that flag.
    function writeOrBuffer(stream, state, chunk, encoding, cb) {
      chunk = decodeChunk(state, chunk, encoding);
    
      if (chunk instanceof Buffer)
        encoding = 'buffer';
      var len = state.objectMode ? 1 : chunk.length;
    
      state.length += len;
    
      var ret = state.length < state.highWaterMark;
      // we must ensure that previous needDrain will not be reset to false.
      if (!ret)
        state.needDrain = true;
    
      if (state.writing || state.corked) {
        var last = state.lastBufferedRequest;
        state.lastBufferedRequest = new WriteReq(chunk, encoding, cb);
        if (last) {
          last.next = state.lastBufferedRequest;
        } else {
          state.bufferedRequest = state.lastBufferedRequest;
        }
      } else {
        doWrite(stream, state, false, len, chunk, encoding, cb);
      }
    
      return ret;
    }
    
    function doWrite(stream, state, writev, len, chunk, encoding, cb) {
      state.writelen = len;
      state.writecb = cb;
      state.writing = true;
      state.sync = true;
      if (writev)
        stream._writev(chunk, state.onwrite);
      else
        stream._write(chunk, encoding, state.onwrite);
      state.sync = false;
    }
    
    function onwriteError(stream, state, sync, er, cb) {
      --state.pendingcb;
      if (sync)
        processNextTick(cb, er);
      else
        cb(er);
    
      stream._writableState.errorEmitted = true;
      stream.emit('error', er);
    }
    
    function onwriteStateUpdate(state) {
      state.writing = false;
      state.writecb = null;
      state.length -= state.writelen;
      state.writelen = 0;
    }
    
    function onwrite(stream, er) {
      var state = stream._writableState;
      var sync = state.sync;
      var cb = state.writecb;
    
      onwriteStateUpdate(state);
    
      if (er)
        onwriteError(stream, state, sync, er, cb);
      else {
        // Check if we're actually ready to finish, but don't emit yet
        var finished = needFinish(state);
    
        if (!finished &&
            !state.corked &&
            !state.bufferProcessing &&
            state.bufferedRequest) {
          clearBuffer(stream, state);
        }
    
        if (sync) {
          processNextTick(afterWrite, stream, state, finished, cb);
        } else {
          afterWrite(stream, state, finished, cb);
        }
      }
    }
    
    function afterWrite(stream, state, finished, cb) {
      if (!finished)
        onwriteDrain(stream, state);
      state.pendingcb--;
      cb();
      finishMaybe(stream, state);
    }
    
    // Must force callback to be called on nextTick, so that we don't
    // emit 'drain' before the write() consumer gets the 'false' return
    // value, and has a chance to attach a 'drain' listener.
    function onwriteDrain(stream, state) {
      if (state.length === 0 && state.needDrain) {
        state.needDrain = false;
        stream.emit('drain');
      }
    }
    
    
    // if there's something in the buffer waiting, then process it
    function clearBuffer(stream, state) {
      state.bufferProcessing = true;
      var entry = state.bufferedRequest;
    
      if (stream._writev && entry && entry.next) {
        // Fast case, write everything using _writev()
        var buffer = [];
        var cbs = [];
        while (entry) {
          cbs.push(entry.callback);
          buffer.push(entry);
          entry = entry.next;
        }
    
        // count the one we are adding, as well.
        // TODO(isaacs) clean this up
        state.pendingcb++;
        state.lastBufferedRequest = null;
        doWrite(stream, state, true, state.length, buffer, '', function(err) {
          for (var i = 0; i < cbs.length; i++) {
            state.pendingcb--;
            cbs[i](err);
          }
        });
    
        // Clear buffer
      } else {
        // Slow case, write chunks one-by-one
        while (entry) {
          var chunk = entry.chunk;
          var encoding = entry.encoding;
          var cb = entry.callback;
          var len = state.objectMode ? 1 : chunk.length;
    
          doWrite(stream, state, false, len, chunk, encoding, cb);
          entry = entry.next;
          // if we didn't call the onwrite immediately, then
          // it means that we need to wait until it does.
          // also, that means that the chunk and cb are currently
          // being processed, so move the buffer counter past them.
          if (state.writing) {
            break;
          }
        }
    
        if (entry === null)
          state.lastBufferedRequest = null;
      }
      state.bufferedRequest = entry;
      state.bufferProcessing = false;
    }
    
    Writable.prototype._write = function(chunk, encoding, cb) {
      cb(new Error('not implemented'));
    };
    
    Writable.prototype._writev = null;
    
    Writable.prototype.end = function(chunk, encoding, cb) {
      var state = this._writableState;
    
      if (typeof chunk === 'function') {
        cb = chunk;
        chunk = null;
        encoding = null;
      } else if (typeof encoding === 'function') {
        cb = encoding;
        encoding = null;
      }
    
      if (chunk !== null && chunk !== undefined)
        this.write(chunk, encoding);
    
      // .end() fully uncorks
      if (state.corked) {
        state.corked = 1;
        this.uncork();
      }
    
      // ignore unnecessary end() calls.
      if (!state.ending && !state.finished)
        endWritable(this, state, cb);
    };
    
    
    function needFinish(state) {
      return (state.ending &&
              state.length === 0 &&
              state.bufferedRequest === null &&
              !state.finished &&
              !state.writing);
    }
    
    function prefinish(stream, state) {
      if (!state.prefinished) {
        state.prefinished = true;
        stream.emit('prefinish');
      }
    }
    
    function finishMaybe(stream, state) {
      var need = needFinish(state);
      if (need) {
        if (state.pendingcb === 0) {
          prefinish(stream, state);
          state.finished = true;
          stream.emit('finish');
        } else {
          prefinish(stream, state);
        }
      }
      return need;
    }
    
    function endWritable(stream, state, cb) {
      state.ending = true;
      finishMaybe(stream, state);
      if (cb) {
        if (state.finished)
          processNextTick(cb);
        else
          stream.once('finish', cb);
      }
      state.ended = true;
    }
    
  provide("readable-stream/lib/_stream_writable.js", module.exports);
}(global));

// pakmanager:readable-stream/lib/_stream_duplex.js
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  // a duplex stream is just a stream that is both readable and writable.
    // Since JS doesn't have multiple prototypal inheritance, this class
    // prototypally inherits from Readable, and then parasitically from
    // Writable.
    
    'use strict';
    
    module.exports = Duplex;
    
    /*<replacement>*/
    var processNextTick = require('process-nextick-args');
    /*</replacement>*/
    
    
    /*<replacement>*/
    var objectKeys = Object.keys || function (obj) {
      var keys = [];
      for (var key in obj) keys.push(key);
      return keys;
    }
    /*</replacement>*/
    
    
    
    /*<replacement>*/
    var util = require('core-util-is');
    util.inherits = require('inherits');
    /*</replacement>*/
    
    var Readable =  require('readable-stream/lib/_stream_readable');
    var Writable =  require('readable-stream/lib/_stream_writable');
    
    util.inherits(Duplex, Readable);
    
    var keys = objectKeys(Writable.prototype);
    for (var v = 0; v < keys.length; v++) {
      var method = keys[v];
      if (!Duplex.prototype[method])
        Duplex.prototype[method] = Writable.prototype[method];
    }
    
    function Duplex(options) {
      if (!(this instanceof Duplex))
        return new Duplex(options);
    
      Readable.call(this, options);
      Writable.call(this, options);
    
      if (options && options.readable === false)
        this.readable = false;
    
      if (options && options.writable === false)
        this.writable = false;
    
      this.allowHalfOpen = true;
      if (options && options.allowHalfOpen === false)
        this.allowHalfOpen = false;
    
      this.once('end', onend);
    }
    
    // the no-half-open enforcer
    function onend() {
      // if we allow half-open state, or if the writable side ended,
      // then we're ok.
      if (this.allowHalfOpen || this._writableState.ended)
        return;
    
      // no more data can be written.
      // But allow more writes to happen in this tick.
      processNextTick(onEndNT, this);
    }
    
    function onEndNT(self) {
      self.end();
    }
    
    function forEach (xs, f) {
      for (var i = 0, l = xs.length; i < l; i++) {
        f(xs[i], i);
      }
    }
    
  provide("readable-stream/lib/_stream_duplex.js", module.exports);
}(global));

// pakmanager:readable-stream/lib/_stream_transform.js
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  // a transform stream is a readable/writable stream where you do
    // something with the data.  Sometimes it's called a "filter",
    // but that's not a great name for it, since that implies a thing where
    // some bits pass through, and others are simply ignored.  (That would
    // be a valid example of a transform, of course.)
    //
    // While the output is causally related to the input, it's not a
    // necessarily symmetric or synchronous transformation.  For example,
    // a zlib stream might take multiple plain-text writes(), and then
    // emit a single compressed chunk some time in the future.
    //
    // Here's how this works:
    //
    // The Transform stream has all the aspects of the readable and writable
    // stream classes.  When you write(chunk), that calls _write(chunk,cb)
    // internally, and returns false if there's a lot of pending writes
    // buffered up.  When you call read(), that calls _read(n) until
    // there's enough pending readable data buffered up.
    //
    // In a transform stream, the written data is placed in a buffer.  When
    // _read(n) is called, it transforms the queued up data, calling the
    // buffered _write cb's as it consumes chunks.  If consuming a single
    // written chunk would result in multiple output chunks, then the first
    // outputted bit calls the readcb, and subsequent chunks just go into
    // the read buffer, and will cause it to emit 'readable' if necessary.
    //
    // This way, back-pressure is actually determined by the reading side,
    // since _read has to be called to start processing a new chunk.  However,
    // a pathological inflate type of transform can cause excessive buffering
    // here.  For example, imagine a stream where every byte of input is
    // interpreted as an integer from 0-255, and then results in that many
    // bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
    // 1kb of data being output.  In this case, you could write a very small
    // amount of input, and end up with a very large amount of output.  In
    // such a pathological inflating mechanism, there'd be no way to tell
    // the system to stop doing the transform.  A single 4MB write could
    // cause the system to run out of memory.
    //
    // However, even in such a pathological case, only a single written chunk
    // would be consumed, and then the rest would wait (un-transformed) until
    // the results of the previous transformed chunk were consumed.
    
    'use strict';
    
    module.exports = Transform;
    
    var Duplex =  require('readable-stream/lib/_stream_duplex');
    
    /*<replacement>*/
    var util = require('core-util-is');
    util.inherits = require('inherits');
    /*</replacement>*/
    
    util.inherits(Transform, Duplex);
    
    
    function TransformState(stream) {
      this.afterTransform = function(er, data) {
        return afterTransform(stream, er, data);
      };
    
      this.needTransform = false;
      this.transforming = false;
      this.writecb = null;
      this.writechunk = null;
    }
    
    function afterTransform(stream, er, data) {
      var ts = stream._transformState;
      ts.transforming = false;
    
      var cb = ts.writecb;
    
      if (!cb)
        return stream.emit('error', new Error('no writecb in Transform class'));
    
      ts.writechunk = null;
      ts.writecb = null;
    
      if (data !== null && data !== undefined)
        stream.push(data);
    
      if (cb)
        cb(er);
    
      var rs = stream._readableState;
      rs.reading = false;
      if (rs.needReadable || rs.length < rs.highWaterMark) {
        stream._read(rs.highWaterMark);
      }
    }
    
    
    function Transform(options) {
      if (!(this instanceof Transform))
        return new Transform(options);
    
      Duplex.call(this, options);
    
      this._transformState = new TransformState(this);
    
      // when the writable side finishes, then flush out anything remaining.
      var stream = this;
    
      // start out asking for a readable event once data is transformed.
      this._readableState.needReadable = true;
    
      // we have implemented the _read method, and done the other things
      // that Readable wants before the first _read call, so unset the
      // sync guard flag.
      this._readableState.sync = false;
    
      if (options) {
        if (typeof options.transform === 'function')
          this._transform = options.transform;
    
        if (typeof options.flush === 'function')
          this._flush = options.flush;
      }
    
      this.once('prefinish', function() {
        if (typeof this._flush === 'function')
          this._flush(function(er) {
            done(stream, er);
          });
        else
          done(stream);
      });
    }
    
    Transform.prototype.push = function(chunk, encoding) {
      this._transformState.needTransform = false;
      return Duplex.prototype.push.call(this, chunk, encoding);
    };
    
    // This is the part where you do stuff!
    // override this function in implementation classes.
    // 'chunk' is an input chunk.
    //
    // Call `push(newChunk)` to pass along transformed output
    // to the readable side.  You may call 'push' zero or more times.
    //
    // Call `cb(err)` when you are done with this chunk.  If you pass
    // an error, then that'll put the hurt on the whole operation.  If you
    // never call cb(), then you'll never get another chunk.
    Transform.prototype._transform = function(chunk, encoding, cb) {
      throw new Error('not implemented');
    };
    
    Transform.prototype._write = function(chunk, encoding, cb) {
      var ts = this._transformState;
      ts.writecb = cb;
      ts.writechunk = chunk;
      ts.writeencoding = encoding;
      if (!ts.transforming) {
        var rs = this._readableState;
        if (ts.needTransform ||
            rs.needReadable ||
            rs.length < rs.highWaterMark)
          this._read(rs.highWaterMark);
      }
    };
    
    // Doesn't matter what the args are here.
    // _transform does all the work.
    // That we got here means that the readable side wants more data.
    Transform.prototype._read = function(n) {
      var ts = this._transformState;
    
      if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
        ts.transforming = true;
        this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
      } else {
        // mark that we need a transform, so that any data that comes in
        // will get processed, now that we've asked for it.
        ts.needTransform = true;
      }
    };
    
    
    function done(stream, er) {
      if (er)
        return stream.emit('error', er);
    
      // if there's nothing in the write buffer, then that means
      // that nothing more will ever be provided
      var ws = stream._writableState;
      var ts = stream._transformState;
    
      if (ws.length)
        throw new Error('calling transform done when ws.length != 0');
    
      if (ts.transforming)
        throw new Error('calling transform done when still transforming');
    
      return stream.push(null);
    }
    
  provide("readable-stream/lib/_stream_transform.js", module.exports);
}(global));

// pakmanager:readable-stream/lib/_stream_passthrough.js
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  // a passthrough stream.
    // basically just the most minimal sort of Transform stream.
    // Every written chunk gets output as-is.
    
    'use strict';
    
    module.exports = PassThrough;
    
    var Transform =  require('readable-stream/lib/_stream_transform');
    
    /*<replacement>*/
    var util = require('core-util-is');
    util.inherits = require('inherits');
    /*</replacement>*/
    
    util.inherits(PassThrough, Transform);
    
    function PassThrough(options) {
      if (!(this instanceof PassThrough))
        return new PassThrough(options);
    
      Transform.call(this, options);
    }
    
    PassThrough.prototype._transform = function(chunk, encoding, cb) {
      cb(null, chunk);
    };
    
  provide("readable-stream/lib/_stream_passthrough.js", module.exports);
}(global));

// pakmanager:readable-stream
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  (function (){
      try {
        exports.Stream = require('st' + 'ream'); // hack to fix a circular dependency issue when used with browserify
      } catch(_){}
    }());
    exports = module.exports =  require('readable-stream/lib/_stream_readable.js');
    exports.Readable = exports;
    exports.Writable =  require('readable-stream/lib/_stream_writable.js');
    exports.Duplex =  require('readable-stream/lib/_stream_duplex.js');
    exports.Transform =  require('readable-stream/lib/_stream_transform.js');
    exports.PassThrough =  require('readable-stream/lib/_stream_passthrough.js');
    
  provide("readable-stream", module.exports);
}(global));

// pakmanager:xtend
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  module.exports = extend
    
    function extend() {
        var target = {}
    
        for (var i = 0; i < arguments.length; i++) {
            var source = arguments[i]
    
            for (var key in source) {
                if (source.hasOwnProperty(key)) {
                    target[key] = source[key]
                }
            }
        }
    
        return target
    }
    
  provide("xtend", module.exports);
}(global));

// pakmanager:inflight
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  var wrappy = require('wrappy')
    var reqs = Object.create(null)
    var once = require('once')
    
    module.exports = wrappy(inflight)
    
    function inflight (key, cb) {
      if (reqs[key]) {
        reqs[key].push(cb)
        return null
      } else {
        reqs[key] = [cb]
        return makeres(key)
      }
    }
    
    function makeres (key) {
      return once(function RES () {
        var cbs = reqs[key]
        var len = cbs.length
        var args = slice(arguments)
        for (var i = 0; i < len; i++) {
          cbs[i].apply(null, args)
        }
        if (cbs.length > len) {
          // added more in the interim.
          // de-zalgo, just in case, but don't call again.
          cbs.splice(0, len)
          process.nextTick(function () {
            RES.apply(null, args)
          })
        } else {
          delete reqs[key]
        }
      })
    }
    
    function slice (args) {
      var length = args.length
      var array = []
    
      for (var i = 0; i < length; i++) array[i] = args[i]
      return array
    }
    
  provide("inflight", module.exports);
}(global));

// pakmanager:minimatch
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  module.exports = minimatch
    minimatch.Minimatch = Minimatch
    
    var path = { sep: '/' }
    try {
      path = require('path')
    } catch (er) {}
    
    var GLOBSTAR = minimatch.GLOBSTAR = Minimatch.GLOBSTAR = {}
    var expand = require('brace-expansion')
    
    // any single thing other than /
    // don't need to escape / when using new RegExp()
    var qmark = '[^/]'
    
    // * => any number of characters
    var star = qmark + '*?'
    
    // ** when dots are allowed.  Anything goes, except .. and .
    // not (^ or / followed by one or two dots followed by $ or /),
    // followed by anything, any number of times.
    var twoStarDot = '(?:(?!(?:\\\/|^)(?:\\.{1,2})($|\\\/)).)*?'
    
    // not a ^ or / followed by a dot,
    // followed by anything, any number of times.
    var twoStarNoDot = '(?:(?!(?:\\\/|^)\\.).)*?'
    
    // characters that need to be escaped in RegExp.
    var reSpecials = charSet('().*{}+?[]^$\\!')
    
    // "abc" -> { a:true, b:true, c:true }
    function charSet (s) {
      return s.split('').reduce(function (set, c) {
        set[c] = true
        return set
      }, {})
    }
    
    // normalizes slashes.
    var slashSplit = /\/+/
    
    minimatch.filter = filter
    function filter (pattern, options) {
      options = options || {}
      return function (p, i, list) {
        return minimatch(p, pattern, options)
      }
    }
    
    function ext (a, b) {
      a = a || {}
      b = b || {}
      var t = {}
      Object.keys(b).forEach(function (k) {
        t[k] = b[k]
      })
      Object.keys(a).forEach(function (k) {
        t[k] = a[k]
      })
      return t
    }
    
    minimatch.defaults = function (def) {
      if (!def || !Object.keys(def).length) return minimatch
    
      var orig = minimatch
    
      var m = function minimatch (p, pattern, options) {
        return orig.minimatch(p, pattern, ext(def, options))
      }
    
      m.Minimatch = function Minimatch (pattern, options) {
        return new orig.Minimatch(pattern, ext(def, options))
      }
    
      return m
    }
    
    Minimatch.defaults = function (def) {
      if (!def || !Object.keys(def).length) return Minimatch
      return minimatch.defaults(def).Minimatch
    }
    
    function minimatch (p, pattern, options) {
      if (typeof pattern !== 'string') {
        throw new TypeError('glob pattern string required')
      }
    
      if (!options) options = {}
    
      // shortcut: comments match nothing.
      if (!options.nocomment && pattern.charAt(0) === '#') {
        return false
      }
    
      // "" only matches ""
      if (pattern.trim() === '') return p === ''
    
      return new Minimatch(pattern, options).match(p)
    }
    
    function Minimatch (pattern, options) {
      if (!(this instanceof Minimatch)) {
        return new Minimatch(pattern, options)
      }
    
      if (typeof pattern !== 'string') {
        throw new TypeError('glob pattern string required')
      }
    
      if (!options) options = {}
      pattern = pattern.trim()
    
      // windows support: need to use /, not \
      if (path.sep !== '/') {
        pattern = pattern.split(path.sep).join('/')
      }
    
      this.options = options
      this.set = []
      this.pattern = pattern
      this.regexp = null
      this.negate = false
      this.comment = false
      this.empty = false
    
      // make the set of regexps etc.
      this.make()
    }
    
    Minimatch.prototype.debug = function () {}
    
    Minimatch.prototype.make = make
    function make () {
      // don't do it more than once.
      if (this._made) return
    
      var pattern = this.pattern
      var options = this.options
    
      // empty patterns and comments match nothing.
      if (!options.nocomment && pattern.charAt(0) === '#') {
        this.comment = true
        return
      }
      if (!pattern) {
        this.empty = true
        return
      }
    
      // step 1: figure out negation, etc.
      this.parseNegate()
    
      // step 2: expand braces
      var set = this.globSet = this.braceExpand()
    
      if (options.debug) this.debug = console.error
    
      this.debug(this.pattern, set)
    
      // step 3: now we have a set, so turn each one into a series of path-portion
      // matching patterns.
      // These will be regexps, except in the case of "**", which is
      // set to the GLOBSTAR object for globstar behavior,
      // and will not contain any / characters
      set = this.globParts = set.map(function (s) {
        return s.split(slashSplit)
      })
    
      this.debug(this.pattern, set)
    
      // glob --> regexps
      set = set.map(function (s, si, set) {
        return s.map(this.parse, this)
      }, this)
    
      this.debug(this.pattern, set)
    
      // filter out everything that didn't compile properly.
      set = set.filter(function (s) {
        return s.indexOf(false) === -1
      })
    
      this.debug(this.pattern, set)
    
      this.set = set
    }
    
    Minimatch.prototype.parseNegate = parseNegate
    function parseNegate () {
      var pattern = this.pattern
      var negate = false
      var options = this.options
      var negateOffset = 0
    
      if (options.nonegate) return
    
      for (var i = 0, l = pattern.length
        ; i < l && pattern.charAt(i) === '!'
        ; i++) {
        negate = !negate
        negateOffset++
      }
    
      if (negateOffset) this.pattern = pattern.substr(negateOffset)
      this.negate = negate
    }
    
    // Brace expansion:
    // a{b,c}d -> abd acd
    // a{b,}c -> abc ac
    // a{0..3}d -> a0d a1d a2d a3d
    // a{b,c{d,e}f}g -> abg acdfg acefg
    // a{b,c}d{e,f}g -> abdeg acdeg abdeg abdfg
    //
    // Invalid sets are not expanded.
    // a{2..}b -> a{2..}b
    // a{b}c -> a{b}c
    minimatch.braceExpand = function (pattern, options) {
      return braceExpand(pattern, options)
    }
    
    Minimatch.prototype.braceExpand = braceExpand
    
    function braceExpand (pattern, options) {
      if (!options) {
        if (this instanceof Minimatch) {
          options = this.options
        } else {
          options = {}
        }
      }
    
      pattern = typeof pattern === 'undefined'
        ? this.pattern : pattern
    
      if (typeof pattern === 'undefined') {
        throw new Error('undefined pattern')
      }
    
      if (options.nobrace ||
        !pattern.match(/\{.*\}/)) {
        // shortcut. no need to expand.
        return [pattern]
      }
    
      return expand(pattern)
    }
    
    // parse a component of the expanded set.
    // At this point, no pattern may contain "/" in it
    // so we're going to return a 2d array, where each entry is the full
    // pattern, split on '/', and then turned into a regular expression.
    // A regexp is made at the end which joins each array with an
    // escaped /, and another full one which joins each regexp with |.
    //
    // Following the lead of Bash 4.1, note that "**" only has special meaning
    // when it is the *only* thing in a path portion.  Otherwise, any series
    // of * is equivalent to a single *.  Globstar behavior is enabled by
    // default, and can be disabled by setting options.noglobstar.
    Minimatch.prototype.parse = parse
    var SUBPARSE = {}
    function parse (pattern, isSub) {
      var options = this.options
    
      // shortcuts
      if (!options.noglobstar && pattern === '**') return GLOBSTAR
      if (pattern === '') return ''
    
      var re = ''
      var hasMagic = !!options.nocase
      var escaping = false
      // ? => one single character
      var patternListStack = []
      var plType
      var stateChar
      var inClass = false
      var reClassStart = -1
      var classStart = -1
      // . and .. never match anything that doesn't start with .,
      // even when options.dot is set.
      var patternStart = pattern.charAt(0) === '.' ? '' // anything
      // not (start or / followed by . or .. followed by / or end)
      : options.dot ? '(?!(?:^|\\\/)\\.{1,2}(?:$|\\\/))'
      : '(?!\\.)'
      var self = this
    
      function clearStateChar () {
        if (stateChar) {
          // we had some state-tracking character
          // that wasn't consumed by this pass.
          switch (stateChar) {
            case '*':
              re += star
              hasMagic = true
            break
            case '?':
              re += qmark
              hasMagic = true
            break
            default:
              re += '\\' + stateChar
            break
          }
          self.debug('clearStateChar %j %j', stateChar, re)
          stateChar = false
        }
      }
    
      for (var i = 0, len = pattern.length, c
        ; (i < len) && (c = pattern.charAt(i))
        ; i++) {
        this.debug('%s\t%s %s %j', pattern, i, re, c)
    
        // skip over any that are escaped.
        if (escaping && reSpecials[c]) {
          re += '\\' + c
          escaping = false
          continue
        }
    
        switch (c) {
          case '/':
            // completely not allowed, even escaped.
            // Should already be path-split by now.
            return false
    
          case '\\':
            clearStateChar()
            escaping = true
          continue
    
          // the various stateChar values
          // for the "extglob" stuff.
          case '?':
          case '*':
          case '+':
          case '@':
          case '!':
            this.debug('%s\t%s %s %j <-- stateChar', pattern, i, re, c)
    
            // all of those are literals inside a class, except that
            // the glob [!a] means [^a] in regexp
            if (inClass) {
              this.debug('  in class')
              if (c === '!' && i === classStart + 1) c = '^'
              re += c
              continue
            }
    
            // if we already have a stateChar, then it means
            // that there was something like ** or +? in there.
            // Handle the stateChar, then proceed with this one.
            self.debug('call clearStateChar %j', stateChar)
            clearStateChar()
            stateChar = c
            // if extglob is disabled, then +(asdf|foo) isn't a thing.
            // just clear the statechar *now*, rather than even diving into
            // the patternList stuff.
            if (options.noext) clearStateChar()
          continue
    
          case '(':
            if (inClass) {
              re += '('
              continue
            }
    
            if (!stateChar) {
              re += '\\('
              continue
            }
    
            plType = stateChar
            patternListStack.push({ type: plType, start: i - 1, reStart: re.length })
            // negation is (?:(?!js)[^/]*)
            re += stateChar === '!' ? '(?:(?!' : '(?:'
            this.debug('plType %j %j', stateChar, re)
            stateChar = false
          continue
    
          case ')':
            if (inClass || !patternListStack.length) {
              re += '\\)'
              continue
            }
    
            clearStateChar()
            hasMagic = true
            re += ')'
            plType = patternListStack.pop().type
            // negation is (?:(?!js)[^/]*)
            // The others are (?:<pattern>)<type>
            switch (plType) {
              case '!':
                re += '[^/]*?)'
                break
              case '?':
              case '+':
              case '*':
                re += plType
                break
              case '@': break // the default anyway
            }
          continue
    
          case '|':
            if (inClass || !patternListStack.length || escaping) {
              re += '\\|'
              escaping = false
              continue
            }
    
            clearStateChar()
            re += '|'
          continue
    
          // these are mostly the same in regexp and glob
          case '[':
            // swallow any state-tracking char before the [
            clearStateChar()
    
            if (inClass) {
              re += '\\' + c
              continue
            }
    
            inClass = true
            classStart = i
            reClassStart = re.length
            re += c
          continue
    
          case ']':
            //  a right bracket shall lose its special
            //  meaning and represent itself in
            //  a bracket expression if it occurs
            //  first in the list.  -- POSIX.2 2.8.3.2
            if (i === classStart + 1 || !inClass) {
              re += '\\' + c
              escaping = false
              continue
            }
    
            // handle the case where we left a class open.
            // "[z-a]" is valid, equivalent to "\[z-a\]"
            if (inClass) {
              // split where the last [ was, make sure we don't have
              // an invalid re. if so, re-walk the contents of the
              // would-be class to re-translate any characters that
              // were passed through as-is
              // TODO: It would probably be faster to determine this
              // without a try/catch and a new RegExp, but it's tricky
              // to do safely.  For now, this is safe and works.
              var cs = pattern.substring(classStart + 1, i)
              try {
                RegExp('[' + cs + ']')
              } catch (er) {
                // not a valid class!
                var sp = this.parse(cs, SUBPARSE)
                re = re.substr(0, reClassStart) + '\\[' + sp[0] + '\\]'
                hasMagic = hasMagic || sp[1]
                inClass = false
                continue
              }
            }
    
            // finish up the class.
            hasMagic = true
            inClass = false
            re += c
          continue
    
          default:
            // swallow any state char that wasn't consumed
            clearStateChar()
    
            if (escaping) {
              // no need
              escaping = false
            } else if (reSpecials[c]
              && !(c === '^' && inClass)) {
              re += '\\'
            }
    
            re += c
    
        } // switch
      } // for
    
      // handle the case where we left a class open.
      // "[abc" is valid, equivalent to "\[abc"
      if (inClass) {
        // split where the last [ was, and escape it
        // this is a huge pita.  We now have to re-walk
        // the contents of the would-be class to re-translate
        // any characters that were passed through as-is
        cs = pattern.substr(classStart + 1)
        sp = this.parse(cs, SUBPARSE)
        re = re.substr(0, reClassStart) + '\\[' + sp[0]
        hasMagic = hasMagic || sp[1]
      }
    
      // handle the case where we had a +( thing at the *end*
      // of the pattern.
      // each pattern list stack adds 3 chars, and we need to go through
      // and escape any | chars that were passed through as-is for the regexp.
      // Go through and escape them, taking care not to double-escape any
      // | chars that were already escaped.
      for (var pl = patternListStack.pop(); pl; pl = patternListStack.pop()) {
        var tail = re.slice(pl.reStart + 3)
        // maybe some even number of \, then maybe 1 \, followed by a |
        tail = tail.replace(/((?:\\{2})*)(\\?)\|/g, function (_, $1, $2) {
          if (!$2) {
            // the | isn't already escaped, so escape it.
            $2 = '\\'
          }
    
          // need to escape all those slashes *again*, without escaping the
          // one that we need for escaping the | character.  As it works out,
          // escaping an even number of slashes can be done by simply repeating
          // it exactly after itself.  That's why this trick works.
          //
          // I am sorry that you have to see this.
          return $1 + $1 + $2 + '|'
        })
    
        this.debug('tail=%j\n   %s', tail, tail)
        var t = pl.type === '*' ? star
          : pl.type === '?' ? qmark
          : '\\' + pl.type
    
        hasMagic = true
        re = re.slice(0, pl.reStart) + t + '\\(' + tail
      }
    
      // handle trailing things that only matter at the very end.
      clearStateChar()
      if (escaping) {
        // trailing \\
        re += '\\\\'
      }
    
      // only need to apply the nodot start if the re starts with
      // something that could conceivably capture a dot
      var addPatternStart = false
      switch (re.charAt(0)) {
        case '.':
        case '[':
        case '(': addPatternStart = true
      }
    
      // if the re is not "" at this point, then we need to make sure
      // it doesn't match against an empty path part.
      // Otherwise a/* will match a/, which it should not.
      if (re !== '' && hasMagic) re = '(?=.)' + re
    
      if (addPatternStart) re = patternStart + re
    
      // parsing just a piece of a larger pattern.
      if (isSub === SUBPARSE) {
        return [re, hasMagic]
      }
    
      // skip the regexp for non-magical patterns
      // unescape anything in it, though, so that it'll be
      // an exact match against a file etc.
      if (!hasMagic) {
        return globUnescape(pattern)
      }
    
      var flags = options.nocase ? 'i' : ''
      var regExp = new RegExp('^' + re + '$', flags)
    
      regExp._glob = pattern
      regExp._src = re
    
      return regExp
    }
    
    minimatch.makeRe = function (pattern, options) {
      return new Minimatch(pattern, options || {}).makeRe()
    }
    
    Minimatch.prototype.makeRe = makeRe
    function makeRe () {
      if (this.regexp || this.regexp === false) return this.regexp
    
      // at this point, this.set is a 2d array of partial
      // pattern strings, or "**".
      //
      // It's better to use .match().  This function shouldn't
      // be used, really, but it's pretty convenient sometimes,
      // when you just want to work with a regex.
      var set = this.set
    
      if (!set.length) {
        this.regexp = false
        return this.regexp
      }
      var options = this.options
    
      var twoStar = options.noglobstar ? star
        : options.dot ? twoStarDot
        : twoStarNoDot
      var flags = options.nocase ? 'i' : ''
    
      var re = set.map(function (pattern) {
        return pattern.map(function (p) {
          return (p === GLOBSTAR) ? twoStar
          : (typeof p === 'string') ? regExpEscape(p)
          : p._src
        }).join('\\\/')
      }).join('|')
    
      // must match entire pattern
      // ending in a * or ** will make it less strict.
      re = '^(?:' + re + ')$'
    
      // can match anything, as long as it's not this.
      if (this.negate) re = '^(?!' + re + ').*$'
    
      try {
        this.regexp = new RegExp(re, flags)
      } catch (ex) {
        this.regexp = false
      }
      return this.regexp
    }
    
    minimatch.match = function (list, pattern, options) {
      options = options || {}
      var mm = new Minimatch(pattern, options)
      list = list.filter(function (f) {
        return mm.match(f)
      })
      if (mm.options.nonull && !list.length) {
        list.push(pattern)
      }
      return list
    }
    
    Minimatch.prototype.match = match
    function match (f, partial) {
      this.debug('match', f, this.pattern)
      // short-circuit in the case of busted things.
      // comments, etc.
      if (this.comment) return false
      if (this.empty) return f === ''
    
      if (f === '/' && partial) return true
    
      var options = this.options
    
      // windows: need to use /, not \
      if (path.sep !== '/') {
        f = f.split(path.sep).join('/')
      }
    
      // treat the test path as a set of pathparts.
      f = f.split(slashSplit)
      this.debug(this.pattern, 'split', f)
    
      // just ONE of the pattern sets in this.set needs to match
      // in order for it to be valid.  If negating, then just one
      // match means that we have failed.
      // Either way, return on the first hit.
    
      var set = this.set
      this.debug(this.pattern, 'set', set)
    
      // Find the basename of the path by looking for the last non-empty segment
      var filename
      var i
      for (i = f.length - 1; i >= 0; i--) {
        filename = f[i]
        if (filename) break
      }
    
      for (i = 0; i < set.length; i++) {
        var pattern = set[i]
        var file = f
        if (options.matchBase && pattern.length === 1) {
          file = [filename]
        }
        var hit = this.matchOne(file, pattern, partial)
        if (hit) {
          if (options.flipNegate) return true
          return !this.negate
        }
      }
    
      // didn't get any hits.  this is success if it's a negative
      // pattern, failure otherwise.
      if (options.flipNegate) return false
      return this.negate
    }
    
    // set partial to true to test if, for example,
    // "/a/b" matches the start of "/*/b/*/d"
    // Partial means, if you run out of file before you run
    // out of pattern, then that's fine, as long as all
    // the parts match.
    Minimatch.prototype.matchOne = function (file, pattern, partial) {
      var options = this.options
    
      this.debug('matchOne',
        { 'this': this, file: file, pattern: pattern })
    
      this.debug('matchOne', file.length, pattern.length)
    
      for (var fi = 0,
          pi = 0,
          fl = file.length,
          pl = pattern.length
          ; (fi < fl) && (pi < pl)
          ; fi++, pi++) {
        this.debug('matchOne loop')
        var p = pattern[pi]
        var f = file[fi]
    
        this.debug(pattern, p, f)
    
        // should be impossible.
        // some invalid regexp stuff in the set.
        if (p === false) return false
    
        if (p === GLOBSTAR) {
          this.debug('GLOBSTAR', [pattern, p, f])
    
          // "**"
          // a/**/b/**/c would match the following:
          // a/b/x/y/z/c
          // a/x/y/z/b/c
          // a/b/x/b/x/c
          // a/b/c
          // To do this, take the rest of the pattern after
          // the **, and see if it would match the file remainder.
          // If so, return success.
          // If not, the ** "swallows" a segment, and try again.
          // This is recursively awful.
          //
          // a/**/b/**/c matching a/b/x/y/z/c
          // - a matches a
          // - doublestar
          //   - matchOne(b/x/y/z/c, b/**/c)
          //     - b matches b
          //     - doublestar
          //       - matchOne(x/y/z/c, c) -> no
          //       - matchOne(y/z/c, c) -> no
          //       - matchOne(z/c, c) -> no
          //       - matchOne(c, c) yes, hit
          var fr = fi
          var pr = pi + 1
          if (pr === pl) {
            this.debug('** at the end')
            // a ** at the end will just swallow the rest.
            // We have found a match.
            // however, it will not swallow /.x, unless
            // options.dot is set.
            // . and .. are *never* matched by **, for explosively
            // exponential reasons.
            for (; fi < fl; fi++) {
              if (file[fi] === '.' || file[fi] === '..' ||
                (!options.dot && file[fi].charAt(0) === '.')) return false
            }
            return true
          }
    
          // ok, let's see if we can swallow whatever we can.
          while (fr < fl) {
            var swallowee = file[fr]
    
            this.debug('\nglobstar while', file, fr, pattern, pr, swallowee)
    
            // XXX remove this slice.  Just pass the start index.
            if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
              this.debug('globstar found match!', fr, fl, swallowee)
              // found a match.
              return true
            } else {
              // can't swallow "." or ".." ever.
              // can only swallow ".foo" when explicitly asked.
              if (swallowee === '.' || swallowee === '..' ||
                (!options.dot && swallowee.charAt(0) === '.')) {
                this.debug('dot detected!', file, fr, pattern, pr)
                break
              }
    
              // ** swallows a segment, and continue.
              this.debug('globstar swallow a segment, and continue')
              fr++
            }
          }
    
          // no match was found.
          // However, in partial mode, we can't say this is necessarily over.
          // If there's more *pattern* left, then
          if (partial) {
            // ran out of file
            this.debug('\n>>> no match, partial?', file, fr, pattern, pr)
            if (fr === fl) return true
          }
          return false
        }
    
        // something other than **
        // non-magic patterns just have to match exactly
        // patterns with magic have been turned into regexps.
        var hit
        if (typeof p === 'string') {
          if (options.nocase) {
            hit = f.toLowerCase() === p.toLowerCase()
          } else {
            hit = f === p
          }
          this.debug('string match', p, f, hit)
        } else {
          hit = f.match(p)
          this.debug('pattern match', p, f, hit)
        }
    
        if (!hit) return false
      }
    
      // Note: ending in / means that we'll get a final ""
      // at the end of the pattern.  This can only match a
      // corresponding "" at the end of the file.
      // If the file ends in /, then it can only match a
      // a pattern that ends in /, unless the pattern just
      // doesn't have any more for it. But, a/b/ should *not*
      // match "a/b/*", even though "" matches against the
      // [^/]*? pattern, except in partial mode, where it might
      // simply not be reached yet.
      // However, a/b/ should still satisfy a/*
    
      // now either we fell off the end of the pattern, or we're done.
      if (fi === fl && pi === pl) {
        // ran out of pattern and filename at the same time.
        // an exact hit!
        return true
      } else if (fi === fl) {
        // ran out of file, but still had pattern left.
        // this is ok if we're doing the match as part of
        // a glob fs traversal.
        return partial
      } else if (pi === pl) {
        // ran out of pattern, still have file left.
        // this is only acceptable if we're on the very last
        // empty segment of a file with a trailing slash.
        // a/* should match a/b/
        var emptyFileEnd = (fi === fl - 1) && (file[fi] === '')
        return emptyFileEnd
      }
    
      // should be unreachable.
      throw new Error('wtf?')
    }
    
    // replace stuff like \* with *
    function globUnescape (s) {
      return s.replace(/\\(.)/g, '$1')
    }
    
    function regExpEscape (s) {
      return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
    }
    
  provide("minimatch", module.exports);
}(global));

// pakmanager:path-is-absolute
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  'use strict';
    
    function posix(path) {
    	return path.charAt(0) === '/';
    };
    
    function win32(path) {
    	// https://github.com/joyent/node/blob/b3fcc245fb25539909ef1d5eaa01dbf92e168633/lib/path.js#L56
    	var splitDeviceRe = /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/;
    	var result = splitDeviceRe.exec(path);
    	var device = result[1] || '';
    	var isUnc = !!device && device.charAt(1) !== ':';
    
    	// UNC paths are always absolute
    	return !!result[2] || isUnc;
    };
    
    module.exports = process.platform === 'win32' ? win32 : posix;
    module.exports.posix = posix;
    module.exports.win32 = win32;
    
  provide("path-is-absolute", module.exports);
}(global));

// pakmanager:camelcase
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  'use strict';
    module.exports = function (str) {
    	str = str.trim();
    
    	if (str.length === 1 || !(/[_.\- ]+/).test(str) ) {
    		if (str[0] === str[0].toLowerCase() && str.slice(1) !== str.slice(1).toLowerCase()) {
    			return str;
    		}
    
    		return str.toLowerCase();
    	}
    
    	return str
    	.replace(/^[_.\- ]+/, '')
    	.toLowerCase()
    	.replace(/[_.\- ]+(\w|$)/g, function (m, p1) {
    		return p1.toUpperCase();
    	});
    };
    
  provide("camelcase", module.exports);
}(global));

// pakmanager:map-obj
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  'use strict';
    module.exports = function (obj, cb) {
    	var ret = {};
    	var keys = Object.keys(obj);
    
    	for (var i = 0; i < keys.length; i++) {
    		var key = keys[i];
    		var res = cb(key, obj[key], obj);
    		ret[res[0]] = res[1];
    	}
    
    	return ret;
    };
    
  provide("map-obj", module.exports);
}(global));

// pakmanager:get-stdin
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  'use strict';
    
    module.exports = function (cb) {
    	var stdin = process.stdin;
    	var ret = '';
    
    	if (stdin.isTTY) {
    		setImmediate(cb, '');
    		return;
    	}
    
    	stdin.setEncoding('utf8');
    
    	stdin.on('readable', function () {
    		var chunk;
    
    		while (chunk = stdin.read()) {
    			ret += chunk;
    		}
    	});
    
    	stdin.on('end', function () {
    		cb(ret);
    	});
    };
    
    module.exports.buffer = function (cb) {
    	var stdin = process.stdin;
    	var ret = [];
    	var len = 0;
    
    	if (stdin.isTTY) {
    		setImmediate(cb, new Buffer(''));
    		return;
    	}
    
    	stdin.on('readable', function () {
    		var chunk;
    
    		while (chunk = stdin.read()) {
    			ret.push(chunk);
    			len += chunk.length;
    		}
    	});
    
    	stdin.on('end', function () {
    		cb(Buffer.concat(ret, len));
    	});
    };
    
  provide("get-stdin", module.exports);
}(global));

// pakmanager:minimist
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  module.exports = function (args, opts) {
        if (!opts) opts = {};
        
        var flags = { bools : {}, strings : {}, unknownFn: null };
    
        if (typeof opts['unknown'] === 'function') {
            flags.unknownFn = opts['unknown'];
        }
    
        if (typeof opts['boolean'] === 'boolean' && opts['boolean']) {
          flags.allBools = true;
        } else {
          [].concat(opts['boolean']).filter(Boolean).forEach(function (key) {
              flags.bools[key] = true;
          });
        }
        
        var aliases = {};
        Object.keys(opts.alias || {}).forEach(function (key) {
            aliases[key] = [].concat(opts.alias[key]);
            aliases[key].forEach(function (x) {
                aliases[x] = [key].concat(aliases[key].filter(function (y) {
                    return x !== y;
                }));
            });
        });
    
        [].concat(opts.string).filter(Boolean).forEach(function (key) {
            flags.strings[key] = true;
            if (aliases[key]) {
                flags.strings[aliases[key]] = true;
            }
         });
    
        var defaults = opts['default'] || {};
        
        var argv = { _ : [] };
        Object.keys(flags.bools).forEach(function (key) {
            setArg(key, defaults[key] === undefined ? false : defaults[key]);
        });
        
        var notFlags = [];
    
        if (args.indexOf('--') !== -1) {
            notFlags = args.slice(args.indexOf('--')+1);
            args = args.slice(0, args.indexOf('--'));
        }
    
        function argDefined(key, arg) {
            return (flags.allBools && /^--[^=]+$/.test(arg)) ||
                flags.strings[key] || flags.bools[key] || aliases[key];
        }
    
        function setArg (key, val, arg) {
            if (arg && flags.unknownFn && !argDefined(key, arg)) {
                if (flags.unknownFn(arg) === false) return;
            }
    
            var value = !flags.strings[key] && isNumber(val)
                ? Number(val) : val
            ;
            setKey(argv, key.split('.'), value);
            
            (aliases[key] || []).forEach(function (x) {
                setKey(argv, x.split('.'), value);
            });
        }
    
        function setKey (obj, keys, value) {
            var o = obj;
            keys.slice(0,-1).forEach(function (key) {
                if (o[key] === undefined) o[key] = {};
                o = o[key];
            });
    
            var key = keys[keys.length - 1];
            if (o[key] === undefined || flags.bools[key] || typeof o[key] === 'boolean') {
                o[key] = value;
            }
            else if (Array.isArray(o[key])) {
                o[key].push(value);
            }
            else {
                o[key] = [ o[key], value ];
            }
        }
        
        for (var i = 0; i < args.length; i++) {
            var arg = args[i];
            
            if (/^--.+=/.test(arg)) {
                // Using [\s\S] instead of . because js doesn't support the
                // 'dotall' regex modifier. See:
                // http://stackoverflow.com/a/1068308/13216
                var m = arg.match(/^--([^=]+)=([\s\S]*)$/);
                setArg(m[1], m[2], arg);
            }
            else if (/^--no-.+/.test(arg)) {
                var key = arg.match(/^--no-(.+)/)[1];
                setArg(key, false, arg);
            }
            else if (/^--.+/.test(arg)) {
                var key = arg.match(/^--(.+)/)[1];
                var next = args[i + 1];
                if (next !== undefined && !/^-/.test(next)
                && !flags.bools[key]
                && !flags.allBools
                && (aliases[key] ? !flags.bools[aliases[key]] : true)) {
                    setArg(key, next, arg);
                    i++;
                }
                else if (/^(true|false)$/.test(next)) {
                    setArg(key, next === 'true', arg);
                    i++;
                }
                else {
                    setArg(key, flags.strings[key] ? '' : true, arg);
                }
            }
            else if (/^-[^-]+/.test(arg)) {
                var letters = arg.slice(1,-1).split('');
                
                var broken = false;
                for (var j = 0; j < letters.length; j++) {
                    var next = arg.slice(j+2);
                    
                    if (next === '-') {
                        setArg(letters[j], next, arg)
                        continue;
                    }
                    
                    if (/[A-Za-z]/.test(letters[j])
                    && /-?\d+(\.\d*)?(e-?\d+)?$/.test(next)) {
                        setArg(letters[j], next, arg);
                        broken = true;
                        break;
                    }
                    
                    if (letters[j+1] && letters[j+1].match(/\W/)) {
                        setArg(letters[j], arg.slice(j+2), arg);
                        broken = true;
                        break;
                    }
                    else {
                        setArg(letters[j], flags.strings[letters[j]] ? '' : true, arg);
                    }
                }
                
                var key = arg.slice(-1)[0];
                if (!broken && key !== '-') {
                    if (args[i+1] && !/^(-|--)[^-]/.test(args[i+1])
                    && !flags.bools[key]
                    && (aliases[key] ? !flags.bools[aliases[key]] : true)) {
                        setArg(key, args[i+1], arg);
                        i++;
                    }
                    else if (args[i+1] && /true|false/.test(args[i+1])) {
                        setArg(key, args[i+1] === 'true', arg);
                        i++;
                    }
                    else {
                        setArg(key, flags.strings[key] ? '' : true, arg);
                    }
                }
            }
            else {
                if (!flags.unknownFn || flags.unknownFn(arg) !== false) {
                    argv._.push(
                        flags.strings['_'] || !isNumber(arg) ? arg : Number(arg)
                    );
                }
                if (opts.stopEarly) {
                    argv._.push.apply(argv._, args.slice(i + 1));
                    break;
                }
            }
        }
        
        Object.keys(defaults).forEach(function (key) {
            if (!hasKey(argv, key.split('.'))) {
                setKey(argv, key.split('.'), defaults[key]);
                
                (aliases[key] || []).forEach(function (x) {
                    setKey(argv, x.split('.'), defaults[key]);
                });
            }
        });
        
        if (opts['--']) {
            argv['--'] = new Array();
            notFlags.forEach(function(key) {
                argv['--'].push(key);
            });
        }
        else {
            notFlags.forEach(function(key) {
                argv._.push(key);
            });
        }
    
        return argv;
    };
    
    function hasKey (obj, keys) {
        var o = obj;
        keys.slice(0,-1).forEach(function (key) {
            o = (o[key] || {});
        });
    
        var key = keys[keys.length - 1];
        return key in o;
    }
    
    function isNumber (x) {
        if (typeof x === 'number') return true;
        if (/^0x[0-9a-f]+$/i.test(x)) return true;
        return /^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(x);
    }
    
    
  provide("minimist", module.exports);
}(global));

// pakmanager:repeating
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  'use strict';
    var isFinite = require('is-finite');
    
    module.exports = function (str, n) {
    	if (typeof str !== 'string') {
    		throw new TypeError('Expected a string as the first argument');
    	}
    
    	if (n < 0 || !isFinite(n)) {
    		throw new TypeError('Expected a finite positive number');
    	}
    
    	var ret = '';
    
    	do {
    		if (n & 1) {
    			ret += str;
    		}
    
    		str += str;
    	} while (n = n >> 1);
    
    	return ret;
    };
    
  provide("repeating", module.exports);
}(global));

// pakmanager:lodash._basetostring
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  /**
     * lodash 3.0.0 (Custom Build) <https://lodash.com/>
     * Build: `lodash modern modularize exports="npm" -o ./`
     * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
     * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
     * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
     * Available under MIT license <https://lodash.com/license>
     */
    
    /**
     * Converts `value` to a string if it is not one. An empty string is returned
     * for `null` or `undefined` values.
     *
     * @private
     * @param {*} value The value to process.
     * @returns {string} Returns the string.
     */
    function baseToString(value) {
      if (typeof value == 'string') {
        return value;
      }
      return value == null ? '' : (value + '');
    }
    
    module.exports = baseToString;
    
  provide("lodash._basetostring", module.exports);
}(global));

// pakmanager:through2
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  var Transform = require('readable-stream/transform')
      , inherits  = require('util').inherits
      , xtend     = require('xtend')
    
    function DestroyableTransform(opts) {
      Transform.call(this, opts)
      this._destroyed = false
    }
    
    inherits(DestroyableTransform, Transform)
    
    DestroyableTransform.prototype.destroy = function(err) {
      if (this._destroyed) return
      this._destroyed = true
      
      var self = this
      process.nextTick(function() {
        if (err)
          self.emit('error', err)
        self.emit('close')
      })
    }
    
    // a noop _transform function
    function noop (chunk, enc, callback) {
      callback(null, chunk)
    }
    
    
    // create a new export function, used by both the main export and
    // the .ctor export, contains common logic for dealing with arguments
    function through2 (construct) {
      return function (options, transform, flush) {
        if (typeof options == 'function') {
          flush     = transform
          transform = options
          options   = {}
        }
    
        if (typeof transform != 'function')
          transform = noop
    
        if (typeof flush != 'function')
          flush = null
    
        return construct(options, transform, flush)
      }
    }
    
    
    // main export, just make me a transform stream!
    module.exports = through2(function (options, transform, flush) {
      var t2 = new DestroyableTransform(options)
    
      t2._transform = transform
    
      if (flush)
        t2._flush = flush
    
      return t2
    })
    
    
    // make me a reusable prototype that I can `new`, or implicitly `new`
    // with a constructor call
    module.exports.ctor = through2(function (options, transform, flush) {
      function Through2 (override) {
        if (!(this instanceof Through2))
          return new Through2(override)
    
        this.options = xtend(options, override)
    
        DestroyableTransform.call(this, this.options)
      }
    
      inherits(Through2, DestroyableTransform)
    
      Through2.prototype._transform = transform
    
      if (flush)
        Through2.prototype._flush = flush
    
      return Through2
    })
    
    
    module.exports.obj = through2(function (options, transform, flush) {
      var t2 = new DestroyableTransform(xtend({ objectMode: true, highWaterMark: 16 }, options))
    
      t2._transform = transform
    
      if (flush)
        t2._flush = flush
    
      return t2
    })
    
  provide("through2", module.exports);
}(global));

// pakmanager:lodash
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  /**
     * @license
     * lodash 3.9.3 (Custom Build) <https://lodash.com/>
     * Build: `lodash modern -d -o ./index.js`
     * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
     * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
     * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
     * Available under MIT license <https://lodash.com/license>
     */
    ;(function() {
    
      /** Used as a safe reference for `undefined` in pre-ES5 environments. */
      var undefined;
    
      /** Used as the semantic version number. */
      var VERSION = '3.9.3';
    
      /** Used to compose bitmasks for wrapper metadata. */
      var BIND_FLAG = 1,
          BIND_KEY_FLAG = 2,
          CURRY_BOUND_FLAG = 4,
          CURRY_FLAG = 8,
          CURRY_RIGHT_FLAG = 16,
          PARTIAL_FLAG = 32,
          PARTIAL_RIGHT_FLAG = 64,
          ARY_FLAG = 128,
          REARG_FLAG = 256;
    
      /** Used as default options for `_.trunc`. */
      var DEFAULT_TRUNC_LENGTH = 30,
          DEFAULT_TRUNC_OMISSION = '...';
    
      /** Used to detect when a function becomes hot. */
      var HOT_COUNT = 150,
          HOT_SPAN = 16;
    
      /** Used to indicate the type of lazy iteratees. */
      var LAZY_DROP_WHILE_FLAG = 0,
          LAZY_FILTER_FLAG = 1,
          LAZY_MAP_FLAG = 2;
    
      /** Used as the `TypeError` message for "Functions" methods. */
      var FUNC_ERROR_TEXT = 'Expected a function';
    
      /** Used as the internal argument placeholder. */
      var PLACEHOLDER = '__lodash_placeholder__';
    
      /** `Object#toString` result references. */
      var argsTag = '[object Arguments]',
          arrayTag = '[object Array]',
          boolTag = '[object Boolean]',
          dateTag = '[object Date]',
          errorTag = '[object Error]',
          funcTag = '[object Function]',
          mapTag = '[object Map]',
          numberTag = '[object Number]',
          objectTag = '[object Object]',
          regexpTag = '[object RegExp]',
          setTag = '[object Set]',
          stringTag = '[object String]',
          weakMapTag = '[object WeakMap]';
    
      var arrayBufferTag = '[object ArrayBuffer]',
          float32Tag = '[object Float32Array]',
          float64Tag = '[object Float64Array]',
          int8Tag = '[object Int8Array]',
          int16Tag = '[object Int16Array]',
          int32Tag = '[object Int32Array]',
          uint8Tag = '[object Uint8Array]',
          uint8ClampedTag = '[object Uint8ClampedArray]',
          uint16Tag = '[object Uint16Array]',
          uint32Tag = '[object Uint32Array]';
    
      /** Used to match empty string literals in compiled template source. */
      var reEmptyStringLeading = /\b__p \+= '';/g,
          reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
          reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;
    
      /** Used to match HTML entities and HTML characters. */
      var reEscapedHtml = /&(?:amp|lt|gt|quot|#39|#96);/g,
          reUnescapedHtml = /[&<>"'`]/g,
          reHasEscapedHtml = RegExp(reEscapedHtml.source),
          reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
    
      /** Used to match template delimiters. */
      var reEscape = /<%-([\s\S]+?)%>/g,
          reEvaluate = /<%([\s\S]+?)%>/g,
          reInterpolate = /<%=([\s\S]+?)%>/g;
    
      /** Used to match property names within property paths. */
      var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/,
          reIsPlainProp = /^\w*$/,
          rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g;
    
      /**
       * Used to match `RegExp` [special characters](http://www.regular-expressions.info/characters.html#special).
       * In addition to special characters the forward slash is escaped to allow for
       * easier `eval` use and `Function` compilation.
       */
      var reRegExpChars = /[.*+?^${}()|[\]\/\\]/g,
          reHasRegExpChars = RegExp(reRegExpChars.source);
    
      /** Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks). */
      var reComboMark = /[\u0300-\u036f\ufe20-\ufe23]/g;
    
      /** Used to match backslashes in property paths. */
      var reEscapeChar = /\\(\\)?/g;
    
      /** Used to match [ES template delimiters](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-template-literal-lexical-components). */
      var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
    
      /** Used to match `RegExp` flags from their coerced string values. */
      var reFlags = /\w*$/;
    
      /** Used to detect hexadecimal string values. */
      var reHasHexPrefix = /^0[xX]/;
    
      /** Used to detect host constructors (Safari > 5). */
      var reIsHostCtor = /^\[object .+?Constructor\]$/;
    
      /** Used to detect unsigned integer values. */
      var reIsUint = /^\d+$/;
    
      /** Used to match latin-1 supplementary letters (excluding mathematical operators). */
      var reLatin1 = /[\xc0-\xd6\xd8-\xde\xdf-\xf6\xf8-\xff]/g;
    
      /** Used to ensure capturing order of template delimiters. */
      var reNoMatch = /($^)/;
    
      /** Used to match unescaped characters in compiled string literals. */
      var reUnescapedString = /['\n\r\u2028\u2029\\]/g;
    
      /** Used to match words to create compound words. */
      var reWords = (function() {
        var upper = '[A-Z\\xc0-\\xd6\\xd8-\\xde]',
            lower = '[a-z\\xdf-\\xf6\\xf8-\\xff]+';
    
        return RegExp(upper + '+(?=' + upper + lower + ')|' + upper + '?' + lower + '|' + upper + '+|[0-9]+', 'g');
      }());
    
      /** Used to detect and test for whitespace. */
      var whitespace = (
        // Basic whitespace characters.
        ' \t\x0b\f\xa0\ufeff' +
    
        // Line terminators.
        '\n\r\u2028\u2029' +
    
        // Unicode category "Zs" space separators.
        '\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000'
      );
    
      /** Used to assign default `context` object properties. */
      var contextProps = [
        'Array', 'ArrayBuffer', 'Date', 'Error', 'Float32Array', 'Float64Array',
        'Function', 'Int8Array', 'Int16Array', 'Int32Array', 'Math', 'Number',
        'Object', 'RegExp', 'Set', 'String', '_', 'clearTimeout', 'document',
        'isFinite', 'parseFloat', 'parseInt', 'setTimeout', 'TypeError', 'Uint8Array',
        'Uint8ClampedArray', 'Uint16Array', 'Uint32Array', 'WeakMap', 'window'
      ];
    
      /** Used to make template sourceURLs easier to identify. */
      var templateCounter = -1;
    
      /** Used to identify `toStringTag` values of typed arrays. */
      var typedArrayTags = {};
      typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
      typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
      typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
      typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
      typedArrayTags[uint32Tag] = true;
      typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
      typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
      typedArrayTags[dateTag] = typedArrayTags[errorTag] =
      typedArrayTags[funcTag] = typedArrayTags[mapTag] =
      typedArrayTags[numberTag] = typedArrayTags[objectTag] =
      typedArrayTags[regexpTag] = typedArrayTags[setTag] =
      typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
    
      /** Used to identify `toStringTag` values supported by `_.clone`. */
      var cloneableTags = {};
      cloneableTags[argsTag] = cloneableTags[arrayTag] =
      cloneableTags[arrayBufferTag] = cloneableTags[boolTag] =
      cloneableTags[dateTag] = cloneableTags[float32Tag] =
      cloneableTags[float64Tag] = cloneableTags[int8Tag] =
      cloneableTags[int16Tag] = cloneableTags[int32Tag] =
      cloneableTags[numberTag] = cloneableTags[objectTag] =
      cloneableTags[regexpTag] = cloneableTags[stringTag] =
      cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
      cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
      cloneableTags[errorTag] = cloneableTags[funcTag] =
      cloneableTags[mapTag] = cloneableTags[setTag] =
      cloneableTags[weakMapTag] = false;
    
      /** Used as an internal `_.debounce` options object by `_.throttle`. */
      var debounceOptions = {
        'leading': false,
        'maxWait': 0,
        'trailing': false
      };
    
      /** Used to map latin-1 supplementary letters to basic latin letters. */
      var deburredLetters = {
        '\xc0': 'A',  '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
        '\xe0': 'a',  '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
        '\xc7': 'C',  '\xe7': 'c',
        '\xd0': 'D',  '\xf0': 'd',
        '\xc8': 'E',  '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
        '\xe8': 'e',  '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
        '\xcC': 'I',  '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
        '\xeC': 'i',  '\xed': 'i', '\xee': 'i', '\xef': 'i',
        '\xd1': 'N',  '\xf1': 'n',
        '\xd2': 'O',  '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
        '\xf2': 'o',  '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
        '\xd9': 'U',  '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
        '\xf9': 'u',  '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
        '\xdd': 'Y',  '\xfd': 'y', '\xff': 'y',
        '\xc6': 'Ae', '\xe6': 'ae',
        '\xde': 'Th', '\xfe': 'th',
        '\xdf': 'ss'
      };
    
      /** Used to map characters to HTML entities. */
      var htmlEscapes = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '`': '&#96;'
      };
    
      /** Used to map HTML entities to characters. */
      var htmlUnescapes = {
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&#39;': "'",
        '&#96;': '`'
      };
    
      /** Used to determine if values are of the language type `Object`. */
      var objectTypes = {
        'function': true,
        'object': true
      };
    
      /** Used to escape characters for inclusion in compiled string literals. */
      var stringEscapes = {
        '\\': '\\',
        "'": "'",
        '\n': 'n',
        '\r': 'r',
        '\u2028': 'u2028',
        '\u2029': 'u2029'
      };
    
      /** Detect free variable `exports`. */
      var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;
    
      /** Detect free variable `module`. */
      var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;
    
      /** Detect free variable `global` from Node.js. */
      var freeGlobal = freeExports && freeModule && typeof global == 'object' && global && global.Object && global;
    
      /** Detect free variable `self`. */
      var freeSelf = objectTypes[typeof self] && self && self.Object && self;
    
      /** Detect free variable `window`. */
      var freeWindow = objectTypes[typeof window] && window && window.Object && window;
    
      /** Detect the popular CommonJS extension `module.exports`. */
      var moduleExports = freeModule && freeModule.exports === freeExports && freeExports;
    
      /**
       * Used as a reference to the global object.
       *
       * The `this` value is used if it's the global object to avoid Greasemonkey's
       * restricted `window` object, otherwise the `window` object is used.
       */
      var root = freeGlobal || ((freeWindow !== (this && this.window)) && freeWindow) || freeSelf || this;
    
      /*--------------------------------------------------------------------------*/
    
      /**
       * The base implementation of `compareAscending` which compares values and
       * sorts them in ascending order without guaranteeing a stable sort.
       *
       * @private
       * @param {*} value The value to compare.
       * @param {*} other The other value to compare.
       * @returns {number} Returns the sort order indicator for `value`.
       */
      function baseCompareAscending(value, other) {
        if (value !== other) {
          var valIsNull = value === null,
              valIsUndef = value === undefined,
              valIsReflexive = value === value;
    
          var othIsNull = other === null,
              othIsUndef = other === undefined,
              othIsReflexive = other === other;
    
          if ((value > other && !othIsNull) || !valIsReflexive ||
              (valIsNull && !othIsUndef && othIsReflexive) ||
              (valIsUndef && othIsReflexive)) {
            return 1;
          }
          if ((value < other && !valIsNull) || !othIsReflexive ||
              (othIsNull && !valIsUndef && valIsReflexive) ||
              (othIsUndef && valIsReflexive)) {
            return -1;
          }
        }
        return 0;
      }
    
      /**
       * The base implementation of `_.findIndex` and `_.findLastIndex` without
       * support for callback shorthands and `this` binding.
       *
       * @private
       * @param {Array} array The array to search.
       * @param {Function} predicate The function invoked per iteration.
       * @param {boolean} [fromRight] Specify iterating from right to left.
       * @returns {number} Returns the index of the matched value, else `-1`.
       */
      function baseFindIndex(array, predicate, fromRight) {
        var length = array.length,
            index = fromRight ? length : -1;
    
        while ((fromRight ? index-- : ++index < length)) {
          if (predicate(array[index], index, array)) {
            return index;
          }
        }
        return -1;
      }
    
      /**
       * The base implementation of `_.indexOf` without support for binary searches.
       *
       * @private
       * @param {Array} array The array to search.
       * @param {*} value The value to search for.
       * @param {number} fromIndex The index to search from.
       * @returns {number} Returns the index of the matched value, else `-1`.
       */
      function baseIndexOf(array, value, fromIndex) {
        if (value !== value) {
          return indexOfNaN(array, fromIndex);
        }
        var index = fromIndex - 1,
            length = array.length;
    
        while (++index < length) {
          if (array[index] === value) {
            return index;
          }
        }
        return -1;
      }
    
      /**
       * The base implementation of `_.isFunction` without support for environments
       * with incorrect `typeof` results.
       *
       * @private
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
       */
      function baseIsFunction(value) {
        // Avoid a Chakra JIT bug in compatibility modes of IE 11.
        // See https://github.com/jashkenas/underscore/issues/1621 for more details.
        return typeof value == 'function' || false;
      }
    
      /**
       * Converts `value` to a string if it's not one. An empty string is returned
       * for `null` or `undefined` values.
       *
       * @private
       * @param {*} value The value to process.
       * @returns {string} Returns the string.
       */
      function baseToString(value) {
        if (typeof value == 'string') {
          return value;
        }
        return value == null ? '' : (value + '');
      }
    
      /**
       * Used by `_.trim` and `_.trimLeft` to get the index of the first character
       * of `string` that is not found in `chars`.
       *
       * @private
       * @param {string} string The string to inspect.
       * @param {string} chars The characters to find.
       * @returns {number} Returns the index of the first character not found in `chars`.
       */
      function charsLeftIndex(string, chars) {
        var index = -1,
            length = string.length;
    
        while (++index < length && chars.indexOf(string.charAt(index)) > -1) {}
        return index;
      }
    
      /**
       * Used by `_.trim` and `_.trimRight` to get the index of the last character
       * of `string` that is not found in `chars`.
       *
       * @private
       * @param {string} string The string to inspect.
       * @param {string} chars The characters to find.
       * @returns {number} Returns the index of the last character not found in `chars`.
       */
      function charsRightIndex(string, chars) {
        var index = string.length;
    
        while (index-- && chars.indexOf(string.charAt(index)) > -1) {}
        return index;
      }
    
      /**
       * Used by `_.sortBy` to compare transformed elements of a collection and stable
       * sort them in ascending order.
       *
       * @private
       * @param {Object} object The object to compare to `other`.
       * @param {Object} other The object to compare to `object`.
       * @returns {number} Returns the sort order indicator for `object`.
       */
      function compareAscending(object, other) {
        return baseCompareAscending(object.criteria, other.criteria) || (object.index - other.index);
      }
    
      /**
       * Used by `_.sortByOrder` to compare multiple properties of each element
       * in a collection and stable sort them in the following order:
       *
       * If `orders` is unspecified, sort in ascending order for all properties.
       * Otherwise, for each property, sort in ascending order if its corresponding value in
       * orders is true, and descending order if false.
       *
       * @private
       * @param {Object} object The object to compare to `other`.
       * @param {Object} other The object to compare to `object`.
       * @param {boolean[]} orders The order to sort by for each property.
       * @returns {number} Returns the sort order indicator for `object`.
       */
      function compareMultiple(object, other, orders) {
        var index = -1,
            objCriteria = object.criteria,
            othCriteria = other.criteria,
            length = objCriteria.length,
            ordersLength = orders.length;
    
        while (++index < length) {
          var result = baseCompareAscending(objCriteria[index], othCriteria[index]);
          if (result) {
            if (index >= ordersLength) {
              return result;
            }
            return result * (orders[index] ? 1 : -1);
          }
        }
        // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
        // that causes it, under certain circumstances, to provide the same value for
        // `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
        // for more details.
        //
        // This also ensures a stable sort in V8 and other engines.
        // See https://code.google.com/p/v8/issues/detail?id=90 for more details.
        return object.index - other.index;
      }
    
      /**
       * Used by `_.deburr` to convert latin-1 supplementary letters to basic latin letters.
       *
       * @private
       * @param {string} letter The matched letter to deburr.
       * @returns {string} Returns the deburred letter.
       */
      function deburrLetter(letter) {
        return deburredLetters[letter];
      }
    
      /**
       * Used by `_.escape` to convert characters to HTML entities.
       *
       * @private
       * @param {string} chr The matched character to escape.
       * @returns {string} Returns the escaped character.
       */
      function escapeHtmlChar(chr) {
        return htmlEscapes[chr];
      }
    
      /**
       * Used by `_.template` to escape characters for inclusion in compiled
       * string literals.
       *
       * @private
       * @param {string} chr The matched character to escape.
       * @returns {string} Returns the escaped character.
       */
      function escapeStringChar(chr) {
        return '\\' + stringEscapes[chr];
      }
    
      /**
       * Gets the index at which the first occurrence of `NaN` is found in `array`.
       *
       * @private
       * @param {Array} array The array to search.
       * @param {number} fromIndex The index to search from.
       * @param {boolean} [fromRight] Specify iterating from right to left.
       * @returns {number} Returns the index of the matched `NaN`, else `-1`.
       */
      function indexOfNaN(array, fromIndex, fromRight) {
        var length = array.length,
            index = fromIndex + (fromRight ? 0 : -1);
    
        while ((fromRight ? index-- : ++index < length)) {
          var other = array[index];
          if (other !== other) {
            return index;
          }
        }
        return -1;
      }
    
      /**
       * Checks if `value` is object-like.
       *
       * @private
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
       */
      function isObjectLike(value) {
        return !!value && typeof value == 'object';
      }
    
      /**
       * Used by `trimmedLeftIndex` and `trimmedRightIndex` to determine if a
       * character code is whitespace.
       *
       * @private
       * @param {number} charCode The character code to inspect.
       * @returns {boolean} Returns `true` if `charCode` is whitespace, else `false`.
       */
      function isSpace(charCode) {
        return ((charCode <= 160 && (charCode >= 9 && charCode <= 13) || charCode == 32 || charCode == 160) || charCode == 5760 || charCode == 6158 ||
          (charCode >= 8192 && (charCode <= 8202 || charCode == 8232 || charCode == 8233 || charCode == 8239 || charCode == 8287 || charCode == 12288 || charCode == 65279)));
      }
    
      /**
       * Replaces all `placeholder` elements in `array` with an internal placeholder
       * and returns an array of their indexes.
       *
       * @private
       * @param {Array} array The array to modify.
       * @param {*} placeholder The placeholder to replace.
       * @returns {Array} Returns the new array of placeholder indexes.
       */
      function replaceHolders(array, placeholder) {
        var index = -1,
            length = array.length,
            resIndex = -1,
            result = [];
    
        while (++index < length) {
          if (array[index] === placeholder) {
            array[index] = PLACEHOLDER;
            result[++resIndex] = index;
          }
        }
        return result;
      }
    
      /**
       * An implementation of `_.uniq` optimized for sorted arrays without support
       * for callback shorthands and `this` binding.
       *
       * @private
       * @param {Array} array The array to inspect.
       * @param {Function} [iteratee] The function invoked per iteration.
       * @returns {Array} Returns the new duplicate-value-free array.
       */
      function sortedUniq(array, iteratee) {
        var seen,
            index = -1,
            length = array.length,
            resIndex = -1,
            result = [];
    
        while (++index < length) {
          var value = array[index],
              computed = iteratee ? iteratee(value, index, array) : value;
    
          if (!index || seen !== computed) {
            seen = computed;
            result[++resIndex] = value;
          }
        }
        return result;
      }
    
      /**
       * Used by `_.trim` and `_.trimLeft` to get the index of the first non-whitespace
       * character of `string`.
       *
       * @private
       * @param {string} string The string to inspect.
       * @returns {number} Returns the index of the first non-whitespace character.
       */
      function trimmedLeftIndex(string) {
        var index = -1,
            length = string.length;
    
        while (++index < length && isSpace(string.charCodeAt(index))) {}
        return index;
      }
    
      /**
       * Used by `_.trim` and `_.trimRight` to get the index of the last non-whitespace
       * character of `string`.
       *
       * @private
       * @param {string} string The string to inspect.
       * @returns {number} Returns the index of the last non-whitespace character.
       */
      function trimmedRightIndex(string) {
        var index = string.length;
    
        while (index-- && isSpace(string.charCodeAt(index))) {}
        return index;
      }
    
      /**
       * Used by `_.unescape` to convert HTML entities to characters.
       *
       * @private
       * @param {string} chr The matched character to unescape.
       * @returns {string} Returns the unescaped character.
       */
      function unescapeHtmlChar(chr) {
        return htmlUnescapes[chr];
      }
    
      /*--------------------------------------------------------------------------*/
    
      /**
       * Create a new pristine `lodash` function using the given `context` object.
       *
       * @static
       * @memberOf _
       * @category Utility
       * @param {Object} [context=root] The context object.
       * @returns {Function} Returns a new `lodash` function.
       * @example
       *
       * _.mixin({ 'foo': _.constant('foo') });
       *
       * var lodash = _.runInContext();
       * lodash.mixin({ 'bar': lodash.constant('bar') });
       *
       * _.isFunction(_.foo);
       * // => true
       * _.isFunction(_.bar);
       * // => false
       *
       * lodash.isFunction(lodash.foo);
       * // => false
       * lodash.isFunction(lodash.bar);
       * // => true
       *
       * // using `context` to mock `Date#getTime` use in `_.now`
       * var mock = _.runInContext({
       *   'Date': function() {
       *     return { 'getTime': getTimeMock };
       *   }
       * });
       *
       * // or creating a suped-up `defer` in Node.js
       * var defer = _.runInContext({ 'setTimeout': setImmediate }).defer;
       */
      function runInContext(context) {
        // Avoid issues with some ES3 environments that attempt to use values, named
        // after built-in constructors like `Object`, for the creation of literals.
        // ES5 clears this up by stating that literals must use built-in constructors.
        // See https://es5.github.io/#x11.1.5 for more details.
        context = context ? _.defaults(root.Object(), context, _.pick(root, contextProps)) : root;
    
        /** Native constructor references. */
        var Array = context.Array,
            Date = context.Date,
            Error = context.Error,
            Function = context.Function,
            Math = context.Math,
            Number = context.Number,
            Object = context.Object,
            RegExp = context.RegExp,
            String = context.String,
            TypeError = context.TypeError;
    
        /** Used for native method references. */
        var arrayProto = Array.prototype,
            objectProto = Object.prototype,
            stringProto = String.prototype;
    
        /** Used to detect DOM support. */
        var document = (document = context.window) ? document.document : null;
    
        /** Used to resolve the decompiled source of functions. */
        var fnToString = Function.prototype.toString;
    
        /** Used to check objects for own properties. */
        var hasOwnProperty = objectProto.hasOwnProperty;
    
        /** Used to generate unique IDs. */
        var idCounter = 0;
    
        /**
         * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
         * of values.
         */
        var objToString = objectProto.toString;
    
        /** Used to restore the original `_` reference in `_.noConflict`. */
        var oldDash = context._;
    
        /** Used to detect if a method is native. */
        var reIsNative = RegExp('^' +
          escapeRegExp(fnToString.call(hasOwnProperty))
          .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
        );
    
        /** Native method references. */
        var ArrayBuffer = getNative(context, 'ArrayBuffer'),
            bufferSlice = getNative(ArrayBuffer && new ArrayBuffer(0), 'slice'),
            ceil = Math.ceil,
            clearTimeout = context.clearTimeout,
            floor = Math.floor,
            getPrototypeOf = getNative(Object, 'getPrototypeOf'),
            parseFloat = context.parseFloat,
            push = arrayProto.push,
            Set = getNative(context, 'Set'),
            setTimeout = context.setTimeout,
            splice = arrayProto.splice,
            Uint8Array = getNative(context, 'Uint8Array'),
            WeakMap = getNative(context, 'WeakMap');
    
        /** Used to clone array buffers. */
        var Float64Array = (function() {
          // Safari 5 errors when using an array buffer to initialize a typed array
          // where the array buffer's `byteLength` is not a multiple of the typed
          // array's `BYTES_PER_ELEMENT`.
          try {
            var func = getNative(context, 'Float64Array'),
                result = new func(new ArrayBuffer(10), 0, 1) && func;
          } catch(e) {}
          return result || null;
        }());
    
        /* Native method references for those with the same name as other `lodash` methods. */
        var nativeCreate = getNative(Object, 'create'),
            nativeIsArray = getNative(Array, 'isArray'),
            nativeIsFinite = context.isFinite,
            nativeKeys = getNative(Object, 'keys'),
            nativeMax = Math.max,
            nativeMin = Math.min,
            nativeNow = getNative(Date, 'now'),
            nativeNumIsFinite = getNative(Number, 'isFinite'),
            nativeParseInt = context.parseInt,
            nativeRandom = Math.random;
    
        /** Used as references for `-Infinity` and `Infinity`. */
        var NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY,
            POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
    
        /** Used as references for the maximum length and index of an array. */
        var MAX_ARRAY_LENGTH = 4294967295,
            MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1,
            HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;
    
        /** Used as the size, in bytes, of each `Float64Array` element. */
        var FLOAT64_BYTES_PER_ELEMENT = Float64Array ? Float64Array.BYTES_PER_ELEMENT : 0;
    
        /**
         * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
         * of an array-like value.
         */
        var MAX_SAFE_INTEGER = 9007199254740991;
    
        /** Used to store function metadata. */
        var metaMap = WeakMap && new WeakMap;
    
        /** Used to lookup unminified function names. */
        var realNames = {};
    
        /*------------------------------------------------------------------------*/
    
        /**
         * Creates a `lodash` object which wraps `value` to enable implicit chaining.
         * Methods that operate on and return arrays, collections, and functions can
         * be chained together. Methods that return a boolean or single value will
         * automatically end the chain returning the unwrapped value. Explicit chaining
         * may be enabled using `_.chain`. The execution of chained methods is lazy,
         * that is, execution is deferred until `_#value` is implicitly or explicitly
         * called.
         *
         * Lazy evaluation allows several methods to support shortcut fusion. Shortcut
         * fusion is an optimization that merges iteratees to avoid creating intermediate
         * arrays and reduce the number of iteratee executions.
         *
         * Chaining is supported in custom builds as long as the `_#value` method is
         * directly or indirectly included in the build.
         *
         * In addition to lodash methods, wrappers have `Array` and `String` methods.
         *
         * The wrapper `Array` methods are:
         * `concat`, `join`, `pop`, `push`, `reverse`, `shift`, `slice`, `sort`,
         * `splice`, and `unshift`
         *
         * The wrapper `String` methods are:
         * `replace` and `split`
         *
         * The wrapper methods that support shortcut fusion are:
         * `compact`, `drop`, `dropRight`, `dropRightWhile`, `dropWhile`, `filter`,
         * `first`, `initial`, `last`, `map`, `pluck`, `reject`, `rest`, `reverse`,
         * `slice`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, `toArray`,
         * and `where`
         *
         * The chainable wrapper methods are:
         * `after`, `ary`, `assign`, `at`, `before`, `bind`, `bindAll`, `bindKey`,
         * `callback`, `chain`, `chunk`, `commit`, `compact`, `concat`, `constant`,
         * `countBy`, `create`, `curry`, `debounce`, `defaults`, `defer`, `delay`,
         * `difference`, `drop`, `dropRight`, `dropRightWhile`, `dropWhile`, `fill`,
         * `filter`, `flatten`, `flattenDeep`, `flow`, `flowRight`, `forEach`,
         * `forEachRight`, `forIn`, `forInRight`, `forOwn`, `forOwnRight`, `functions`,
         * `groupBy`, `indexBy`, `initial`, `intersection`, `invert`, `invoke`, `keys`,
         * `keysIn`, `map`, `mapKeys`, `mapValues`, `matches`, `matchesProperty`,
         * `memoize`, `merge`, `method`, `methodOf`, `mixin`, `negate`, `omit`, `once`,
         * `pairs`, `partial`, `partialRight`, `partition`, `pick`, `plant`, `pluck`,
         * `property`, `propertyOf`, `pull`, `pullAt`, `push`, `range`, `rearg`,
         * `reject`, `remove`, `rest`, `restParam`, `reverse`, `set`, `shuffle`,
         * `slice`, `sort`, `sortBy`, `sortByAll`, `sortByOrder`, `splice`, `spread`,
         * `take`, `takeRight`, `takeRightWhile`, `takeWhile`, `tap`, `throttle`,
         * `thru`, `times`, `toArray`, `toPlainObject`, `transform`, `union`, `uniq`,
         * `unshift`, `unzip`, `unzipWith`, `values`, `valuesIn`, `where`, `without`,
         * `wrap`, `xor`, `zip`, `zipObject`, `zipWith`
         *
         * The wrapper methods that are **not** chainable by default are:
         * `add`, `attempt`, `camelCase`, `capitalize`, `clone`, `cloneDeep`, `deburr`,
         * `endsWith`, `escape`, `escapeRegExp`, `every`, `find`, `findIndex`, `findKey`,
         * `findLast`, `findLastIndex`, `findLastKey`, `findWhere`, `first`, `get`,
         * `gt`, `gte`, `has`, `identity`, `includes`, `indexOf`, `inRange`, `isArguments`,
         * `isArray`, `isBoolean`, `isDate`, `isElement`, `isEmpty`, `isEqual`, `isError`,
         * `isFinite` `isFunction`, `isMatch`, `isNative`, `isNaN`, `isNull`, `isNumber`,
         * `isObject`, `isPlainObject`, `isRegExp`, `isString`, `isUndefined`,
         * `isTypedArray`, `join`, `kebabCase`, `last`, `lastIndexOf`, `lt`, `lte`,
         * `max`, `min`, `noConflict`, `noop`, `now`, `pad`, `padLeft`, `padRight`,
         * `parseInt`, `pop`, `random`, `reduce`, `reduceRight`, `repeat`, `result`,
         * `runInContext`, `shift`, `size`, `snakeCase`, `some`, `sortedIndex`,
         * `sortedLastIndex`, `startCase`, `startsWith`, `sum`, `template`, `trim`,
         * `trimLeft`, `trimRight`, `trunc`, `unescape`, `uniqueId`, `value`, and `words`
         *
         * The wrapper method `sample` will return a wrapped value when `n` is provided,
         * otherwise an unwrapped value is returned.
         *
         * @name _
         * @constructor
         * @category Chain
         * @param {*} value The value to wrap in a `lodash` instance.
         * @returns {Object} Returns the new `lodash` wrapper instance.
         * @example
         *
         * var wrapped = _([1, 2, 3]);
         *
         * // returns an unwrapped value
         * wrapped.reduce(function(total, n) {
         *   return total + n;
         * });
         * // => 6
         *
         * // returns a wrapped value
         * var squares = wrapped.map(function(n) {
         *   return n * n;
         * });
         *
         * _.isArray(squares);
         * // => false
         *
         * _.isArray(squares.value());
         * // => true
         */
        function lodash(value) {
          if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
            if (value instanceof LodashWrapper) {
              return value;
            }
            if (hasOwnProperty.call(value, '__chain__') && hasOwnProperty.call(value, '__wrapped__')) {
              return wrapperClone(value);
            }
          }
          return new LodashWrapper(value);
        }
    
        /**
         * The function whose prototype all chaining wrappers inherit from.
         *
         * @private
         */
        function baseLodash() {
          // No operation performed.
        }
    
        /**
         * The base constructor for creating `lodash` wrapper objects.
         *
         * @private
         * @param {*} value The value to wrap.
         * @param {boolean} [chainAll] Enable chaining for all wrapper methods.
         * @param {Array} [actions=[]] Actions to peform to resolve the unwrapped value.
         */
        function LodashWrapper(value, chainAll, actions) {
          this.__wrapped__ = value;
          this.__actions__ = actions || [];
          this.__chain__ = !!chainAll;
        }
    
        /**
         * An object environment feature flags.
         *
         * @static
         * @memberOf _
         * @type Object
         */
        var support = lodash.support = {};
    
        (function(x) {
          var Ctor = function() { this.x = x; },
              object = { '0': x, 'length': x },
              props = [];
    
          Ctor.prototype = { 'valueOf': x, 'y': x };
          for (var key in new Ctor) { props.push(key); }
    
          /**
           * Detect if the DOM is supported.
           *
           * @memberOf _.support
           * @type boolean
           */
          try {
            support.dom = document.createDocumentFragment().nodeType === 11;
          } catch(e) {
            support.dom = false;
          }
        }(1, 0));
    
        /**
         * By default, the template delimiters used by lodash are like those in
         * embedded Ruby (ERB). Change the following template settings to use
         * alternative delimiters.
         *
         * @static
         * @memberOf _
         * @type Object
         */
        lodash.templateSettings = {
    
          /**
           * Used to detect `data` property values to be HTML-escaped.
           *
           * @memberOf _.templateSettings
           * @type RegExp
           */
          'escape': reEscape,
    
          /**
           * Used to detect code to be evaluated.
           *
           * @memberOf _.templateSettings
           * @type RegExp
           */
          'evaluate': reEvaluate,
    
          /**
           * Used to detect `data` property values to inject.
           *
           * @memberOf _.templateSettings
           * @type RegExp
           */
          'interpolate': reInterpolate,
    
          /**
           * Used to reference the data object in the template text.
           *
           * @memberOf _.templateSettings
           * @type string
           */
          'variable': '',
    
          /**
           * Used to import variables into the compiled template.
           *
           * @memberOf _.templateSettings
           * @type Object
           */
          'imports': {
    
            /**
             * A reference to the `lodash` function.
             *
             * @memberOf _.templateSettings.imports
             * @type Function
             */
            '_': lodash
          }
        };
    
        /*------------------------------------------------------------------------*/
    
        /**
         * Creates a lazy wrapper object which wraps `value` to enable lazy evaluation.
         *
         * @private
         * @param {*} value The value to wrap.
         */
        function LazyWrapper(value) {
          this.__wrapped__ = value;
          this.__actions__ = null;
          this.__dir__ = 1;
          this.__dropCount__ = 0;
          this.__filtered__ = false;
          this.__iteratees__ = null;
          this.__takeCount__ = POSITIVE_INFINITY;
          this.__views__ = null;
        }
    
        /**
         * Creates a clone of the lazy wrapper object.
         *
         * @private
         * @name clone
         * @memberOf LazyWrapper
         * @returns {Object} Returns the cloned `LazyWrapper` object.
         */
        function lazyClone() {
          var actions = this.__actions__,
              iteratees = this.__iteratees__,
              views = this.__views__,
              result = new LazyWrapper(this.__wrapped__);
    
          result.__actions__ = actions ? arrayCopy(actions) : null;
          result.__dir__ = this.__dir__;
          result.__filtered__ = this.__filtered__;
          result.__iteratees__ = iteratees ? arrayCopy(iteratees) : null;
          result.__takeCount__ = this.__takeCount__;
          result.__views__ = views ? arrayCopy(views) : null;
          return result;
        }
    
        /**
         * Reverses the direction of lazy iteration.
         *
         * @private
         * @name reverse
         * @memberOf LazyWrapper
         * @returns {Object} Returns the new reversed `LazyWrapper` object.
         */
        function lazyReverse() {
          if (this.__filtered__) {
            var result = new LazyWrapper(this);
            result.__dir__ = -1;
            result.__filtered__ = true;
          } else {
            result = this.clone();
            result.__dir__ *= -1;
          }
          return result;
        }
    
        /**
         * Extracts the unwrapped value from its lazy wrapper.
         *
         * @private
         * @name value
         * @memberOf LazyWrapper
         * @returns {*} Returns the unwrapped value.
         */
        function lazyValue() {
          var array = this.__wrapped__.value();
          if (!isArray(array)) {
            return baseWrapperValue(array, this.__actions__);
          }
          var dir = this.__dir__,
              isRight = dir < 0,
              view = getView(0, array.length, this.__views__),
              start = view.start,
              end = view.end,
              length = end - start,
              index = isRight ? end : (start - 1),
              takeCount = nativeMin(length, this.__takeCount__),
              iteratees = this.__iteratees__,
              iterLength = iteratees ? iteratees.length : 0,
              resIndex = 0,
              result = [];
    
          outer:
          while (length-- && resIndex < takeCount) {
            index += dir;
    
            var iterIndex = -1,
                value = array[index];
    
            while (++iterIndex < iterLength) {
              var data = iteratees[iterIndex],
                  iteratee = data.iteratee,
                  type = data.type;
    
              if (type == LAZY_DROP_WHILE_FLAG) {
                if (data.done && (isRight ? (index > data.index) : (index < data.index))) {
                  data.count = 0;
                  data.done = false;
                }
                data.index = index;
                if (!data.done) {
                  var limit = data.limit;
                  if (!(data.done = limit > -1 ? (data.count++ >= limit) : !iteratee(value))) {
                    continue outer;
                  }
                }
              } else {
                var computed = iteratee(value);
                if (type == LAZY_MAP_FLAG) {
                  value = computed;
                } else if (!computed) {
                  if (type == LAZY_FILTER_FLAG) {
                    continue outer;
                  } else {
                    break outer;
                  }
                }
              }
            }
            result[resIndex++] = value;
          }
          return result;
        }
    
        /*------------------------------------------------------------------------*/
    
        /**
         * Creates a cache object to store key/value pairs.
         *
         * @private
         * @static
         * @name Cache
         * @memberOf _.memoize
         */
        function MapCache() {
          this.__data__ = {};
        }
    
        /**
         * Removes `key` and its value from the cache.
         *
         * @private
         * @name delete
         * @memberOf _.memoize.Cache
         * @param {string} key The key of the value to remove.
         * @returns {boolean} Returns `true` if the entry was removed successfully, else `false`.
         */
        function mapDelete(key) {
          return this.has(key) && delete this.__data__[key];
        }
    
        /**
         * Gets the cached value for `key`.
         *
         * @private
         * @name get
         * @memberOf _.memoize.Cache
         * @param {string} key The key of the value to get.
         * @returns {*} Returns the cached value.
         */
        function mapGet(key) {
          return key == '__proto__' ? undefined : this.__data__[key];
        }
    
        /**
         * Checks if a cached value for `key` exists.
         *
         * @private
         * @name has
         * @memberOf _.memoize.Cache
         * @param {string} key The key of the entry to check.
         * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
         */
        function mapHas(key) {
          return key != '__proto__' && hasOwnProperty.call(this.__data__, key);
        }
    
        /**
         * Sets `value` to `key` of the cache.
         *
         * @private
         * @name set
         * @memberOf _.memoize.Cache
         * @param {string} key The key of the value to cache.
         * @param {*} value The value to cache.
         * @returns {Object} Returns the cache object.
         */
        function mapSet(key, value) {
          if (key != '__proto__') {
            this.__data__[key] = value;
          }
          return this;
        }
    
        /*------------------------------------------------------------------------*/
    
        /**
         *
         * Creates a cache object to store unique values.
         *
         * @private
         * @param {Array} [values] The values to cache.
         */
        function SetCache(values) {
          var length = values ? values.length : 0;
    
          this.data = { 'hash': nativeCreate(null), 'set': new Set };
          while (length--) {
            this.push(values[length]);
          }
        }
    
        /**
         * Checks if `value` is in `cache` mimicking the return signature of
         * `_.indexOf` by returning `0` if the value is found, else `-1`.
         *
         * @private
         * @param {Object} cache The cache to search.
         * @param {*} value The value to search for.
         * @returns {number} Returns `0` if `value` is found, else `-1`.
         */
        function cacheIndexOf(cache, value) {
          var data = cache.data,
              result = (typeof value == 'string' || isObject(value)) ? data.set.has(value) : data.hash[value];
    
          return result ? 0 : -1;
        }
    
        /**
         * Adds `value` to the cache.
         *
         * @private
         * @name push
         * @memberOf SetCache
         * @param {*} value The value to cache.
         */
        function cachePush(value) {
          var data = this.data;
          if (typeof value == 'string' || isObject(value)) {
            data.set.add(value);
          } else {
            data.hash[value] = true;
          }
        }
    
        /*------------------------------------------------------------------------*/
    
        /**
         * Copies the values of `source` to `array`.
         *
         * @private
         * @param {Array} source The array to copy values from.
         * @param {Array} [array=[]] The array to copy values to.
         * @returns {Array} Returns `array`.
         */
        function arrayCopy(source, array) {
          var index = -1,
              length = source.length;
    
          array || (array = Array(length));
          while (++index < length) {
            array[index] = source[index];
          }
          return array;
        }
    
        /**
         * A specialized version of `_.forEach` for arrays without support for callback
         * shorthands and `this` binding.
         *
         * @private
         * @param {Array} array The array to iterate over.
         * @param {Function} iteratee The function invoked per iteration.
         * @returns {Array} Returns `array`.
         */
        function arrayEach(array, iteratee) {
          var index = -1,
              length = array.length;
    
          while (++index < length) {
            if (iteratee(array[index], index, array) === false) {
              break;
            }
          }
          return array;
        }
    
        /**
         * A specialized version of `_.forEachRight` for arrays without support for
         * callback shorthands and `this` binding.
         *
         * @private
         * @param {Array} array The array to iterate over.
         * @param {Function} iteratee The function invoked per iteration.
         * @returns {Array} Returns `array`.
         */
        function arrayEachRight(array, iteratee) {
          var length = array.length;
    
          while (length--) {
            if (iteratee(array[length], length, array) === false) {
              break;
            }
          }
          return array;
        }
    
        /**
         * A specialized version of `_.every` for arrays without support for callback
         * shorthands and `this` binding.
         *
         * @private
         * @param {Array} array The array to iterate over.
         * @param {Function} predicate The function invoked per iteration.
         * @returns {boolean} Returns `true` if all elements pass the predicate check,
         *  else `false`.
         */
        function arrayEvery(array, predicate) {
          var index = -1,
              length = array.length;
    
          while (++index < length) {
            if (!predicate(array[index], index, array)) {
              return false;
            }
          }
          return true;
        }
    
        /**
         * A specialized version of `baseExtremum` for arrays which invokes `iteratee`
         * with one argument: (value).
         *
         * @private
         * @param {Array} array The array to iterate over.
         * @param {Function} iteratee The function invoked per iteration.
         * @param {Function} comparator The function used to compare values.
         * @param {*} exValue The initial extremum value.
         * @returns {*} Returns the extremum value.
         */
        function arrayExtremum(array, iteratee, comparator, exValue) {
          var index = -1,
              length = array.length,
              computed = exValue,
              result = computed;
    
          while (++index < length) {
            var value = array[index],
                current = +iteratee(value);
    
            if (comparator(current, computed)) {
              computed = current;
              result = value;
            }
          }
          return result;
        }
    
        /**
         * A specialized version of `_.filter` for arrays without support for callback
         * shorthands and `this` binding.
         *
         * @private
         * @param {Array} array The array to iterate over.
         * @param {Function} predicate The function invoked per iteration.
         * @returns {Array} Returns the new filtered array.
         */
        function arrayFilter(array, predicate) {
          var index = -1,
              length = array.length,
              resIndex = -1,
              result = [];
    
          while (++index < length) {
            var value = array[index];
            if (predicate(value, index, array)) {
              result[++resIndex] = value;
            }
          }
          return result;
        }
    
        /**
         * A specialized version of `_.map` for arrays without support for callback
         * shorthands and `this` binding.
         *
         * @private
         * @param {Array} array The array to iterate over.
         * @param {Function} iteratee The function invoked per iteration.
         * @returns {Array} Returns the new mapped array.
         */
        function arrayMap(array, iteratee) {
          var index = -1,
              length = array.length,
              result = Array(length);
    
          while (++index < length) {
            result[index] = iteratee(array[index], index, array);
          }
          return result;
        }
    
        /**
         * A specialized version of `_.reduce` for arrays without support for callback
         * shorthands and `this` binding.
         *
         * @private
         * @param {Array} array The array to iterate over.
         * @param {Function} iteratee The function invoked per iteration.
         * @param {*} [accumulator] The initial value.
         * @param {boolean} [initFromArray] Specify using the first element of `array`
         *  as the initial value.
         * @returns {*} Returns the accumulated value.
         */
        function arrayReduce(array, iteratee, accumulator, initFromArray) {
          var index = -1,
              length = array.length;
    
          if (initFromArray && length) {
            accumulator = array[++index];
          }
          while (++index < length) {
            accumulator = iteratee(accumulator, array[index], index, array);
          }
          return accumulator;
        }
    
        /**
         * A specialized version of `_.reduceRight` for arrays without support for
         * callback shorthands and `this` binding.
         *
         * @private
         * @param {Array} array The array to iterate over.
         * @param {Function} iteratee The function invoked per iteration.
         * @param {*} [accumulator] The initial value.
         * @param {boolean} [initFromArray] Specify using the last element of `array`
         *  as the initial value.
         * @returns {*} Returns the accumulated value.
         */
        function arrayReduceRight(array, iteratee, accumulator, initFromArray) {
          var length = array.length;
          if (initFromArray && length) {
            accumulator = array[--length];
          }
          while (length--) {
            accumulator = iteratee(accumulator, array[length], length, array);
          }
          return accumulator;
        }
    
        /**
         * A specialized version of `_.some` for arrays without support for callback
         * shorthands and `this` binding.
         *
         * @private
         * @param {Array} array The array to iterate over.
         * @param {Function} predicate The function invoked per iteration.
         * @returns {boolean} Returns `true` if any element passes the predicate check,
         *  else `false`.
         */
        function arraySome(array, predicate) {
          var index = -1,
              length = array.length;
    
          while (++index < length) {
            if (predicate(array[index], index, array)) {
              return true;
            }
          }
          return false;
        }
    
        /**
         * A specialized version of `_.sum` for arrays without support for iteratees.
         *
         * @private
         * @param {Array} array The array to iterate over.
         * @returns {number} Returns the sum.
         */
        function arraySum(array) {
          var length = array.length,
              result = 0;
    
          while (length--) {
            result += +array[length] || 0;
          }
          return result;
        }
    
        /**
         * Used by `_.defaults` to customize its `_.assign` use.
         *
         * @private
         * @param {*} objectValue The destination object property value.
         * @param {*} sourceValue The source object property value.
         * @returns {*} Returns the value to assign to the destination object.
         */
        function assignDefaults(objectValue, sourceValue) {
          return objectValue === undefined ? sourceValue : objectValue;
        }
    
        /**
         * Used by `_.template` to customize its `_.assign` use.
         *
         * **Note:** This function is like `assignDefaults` except that it ignores
         * inherited property values when checking if a property is `undefined`.
         *
         * @private
         * @param {*} objectValue The destination object property value.
         * @param {*} sourceValue The source object property value.
         * @param {string} key The key associated with the object and source values.
         * @param {Object} object The destination object.
         * @returns {*} Returns the value to assign to the destination object.
         */
        function assignOwnDefaults(objectValue, sourceValue, key, object) {
          return (objectValue === undefined || !hasOwnProperty.call(object, key))
            ? sourceValue
            : objectValue;
        }
    
        /**
         * A specialized version of `_.assign` for customizing assigned values without
         * support for argument juggling, multiple sources, and `this` binding `customizer`
         * functions.
         *
         * @private
         * @param {Object} object The destination object.
         * @param {Object} source The source object.
         * @param {Function} customizer The function to customize assigned values.
         * @returns {Object} Returns `object`.
         */
        function assignWith(object, source, customizer) {
          var index = -1,
              props = keys(source),
              length = props.length;
    
          while (++index < length) {
            var key = props[index],
                value = object[key],
                result = customizer(value, source[key], key, object, source);
    
            if ((result === result ? (result !== value) : (value === value)) ||
                (value === undefined && !(key in object))) {
              object[key] = result;
            }
          }
          return object;
        }
    
        /**
         * The base implementation of `_.assign` without support for argument juggling,
         * multiple sources, and `customizer` functions.
         *
         * @private
         * @param {Object} object The destination object.
         * @param {Object} source The source object.
         * @returns {Object} Returns `object`.
         */
        function baseAssign(object, source) {
          return source == null
            ? object
            : baseCopy(source, keys(source), object);
        }
    
        /**
         * The base implementation of `_.at` without support for string collections
         * and individual key arguments.
         *
         * @private
         * @param {Array|Object} collection The collection to iterate over.
         * @param {number[]|string[]} props The property names or indexes of elements to pick.
         * @returns {Array} Returns the new array of picked elements.
         */
        function baseAt(collection, props) {
          var index = -1,
              isNil = collection == null,
              isArr = !isNil && isArrayLike(collection),
              length = isArr ? collection.length : 0,
              propsLength = props.length,
              result = Array(propsLength);
    
          while(++index < propsLength) {
            var key = props[index];
            if (isArr) {
              result[index] = isIndex(key, length) ? collection[key] : undefined;
            } else {
              result[index] = isNil ? undefined : collection[key];
            }
          }
          return result;
        }
    
        /**
         * Copies properties of `source` to `object`.
         *
         * @private
         * @param {Object} source The object to copy properties from.
         * @param {Array} props The property names to copy.
         * @param {Object} [object={}] The object to copy properties to.
         * @returns {Object} Returns `object`.
         */
        function baseCopy(source, props, object) {
          object || (object = {});
    
          var index = -1,
              length = props.length;
    
          while (++index < length) {
            var key = props[index];
            object[key] = source[key];
          }
          return object;
        }
    
        /**
         * The base implementation of `_.callback` which supports specifying the
         * number of arguments to provide to `func`.
         *
         * @private
         * @param {*} [func=_.identity] The value to convert to a callback.
         * @param {*} [thisArg] The `this` binding of `func`.
         * @param {number} [argCount] The number of arguments to provide to `func`.
         * @returns {Function} Returns the callback.
         */
        function baseCallback(func, thisArg, argCount) {
          var type = typeof func;
          if (type == 'function') {
            return thisArg === undefined
              ? func
              : bindCallback(func, thisArg, argCount);
          }
          if (func == null) {
            return identity;
          }
          if (type == 'object') {
            return baseMatches(func);
          }
          return thisArg === undefined
            ? property(func)
            : baseMatchesProperty(func, thisArg);
        }
    
        /**
         * The base implementation of `_.clone` without support for argument juggling
         * and `this` binding `customizer` functions.
         *
         * @private
         * @param {*} value The value to clone.
         * @param {boolean} [isDeep] Specify a deep clone.
         * @param {Function} [customizer] The function to customize cloning values.
         * @param {string} [key] The key of `value`.
         * @param {Object} [object] The object `value` belongs to.
         * @param {Array} [stackA=[]] Tracks traversed source objects.
         * @param {Array} [stackB=[]] Associates clones with source counterparts.
         * @returns {*} Returns the cloned value.
         */
        function baseClone(value, isDeep, customizer, key, object, stackA, stackB) {
          var result;
          if (customizer) {
            result = object ? customizer(value, key, object) : customizer(value);
          }
          if (result !== undefined) {
            return result;
          }
          if (!isObject(value)) {
            return value;
          }
          var isArr = isArray(value);
          if (isArr) {
            result = initCloneArray(value);
            if (!isDeep) {
              return arrayCopy(value, result);
            }
          } else {
            var tag = objToString.call(value),
                isFunc = tag == funcTag;
    
            if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
              result = initCloneObject(isFunc ? {} : value);
              if (!isDeep) {
                return baseAssign(result, value);
              }
            } else {
              return cloneableTags[tag]
                ? initCloneByTag(value, tag, isDeep)
                : (object ? value : {});
            }
          }
          // Check for circular references and return corresponding clone.
          stackA || (stackA = []);
          stackB || (stackB = []);
    
          var length = stackA.length;
          while (length--) {
            if (stackA[length] == value) {
              return stackB[length];
            }
          }
          // Add the source value to the stack of traversed objects and associate it with its clone.
          stackA.push(value);
          stackB.push(result);
    
          // Recursively populate clone (susceptible to call stack limits).
          (isArr ? arrayEach : baseForOwn)(value, function(subValue, key) {
            result[key] = baseClone(subValue, isDeep, customizer, key, value, stackA, stackB);
          });
          return result;
        }
    
        /**
         * The base implementation of `_.create` without support for assigning
         * properties to the created object.
         *
         * @private
         * @param {Object} prototype The object to inherit from.
         * @returns {Object} Returns the new object.
         */
        var baseCreate = (function() {
          function object() {}
          return function(prototype) {
            if (isObject(prototype)) {
              object.prototype = prototype;
              var result = new object;
              object.prototype = null;
            }
            return result || {};
          };
        }());
    
        /**
         * The base implementation of `_.delay` and `_.defer` which accepts an index
         * of where to slice the arguments to provide to `func`.
         *
         * @private
         * @param {Function} func The function to delay.
         * @param {number} wait The number of milliseconds to delay invocation.
         * @param {Object} args The arguments provide to `func`.
         * @returns {number} Returns the timer id.
         */
        function baseDelay(func, wait, args) {
          if (typeof func != 'function') {
            throw new TypeError(FUNC_ERROR_TEXT);
          }
          return setTimeout(function() { func.apply(undefined, args); }, wait);
        }
    
        /**
         * The base implementation of `_.difference` which accepts a single array
         * of values to exclude.
         *
         * @private
         * @param {Array} array The array to inspect.
         * @param {Array} values The values to exclude.
         * @returns {Array} Returns the new array of filtered values.
         */
        function baseDifference(array, values) {
          var length = array ? array.length : 0,
              result = [];
    
          if (!length) {
            return result;
          }
          var index = -1,
              indexOf = getIndexOf(),
              isCommon = indexOf == baseIndexOf,
              cache = (isCommon && values.length >= 200) ? createCache(values) : null,
              valuesLength = values.length;
    
          if (cache) {
            indexOf = cacheIndexOf;
            isCommon = false;
            values = cache;
          }
          outer:
          while (++index < length) {
            var value = array[index];
    
            if (isCommon && value === value) {
              var valuesIndex = valuesLength;
              while (valuesIndex--) {
                if (values[valuesIndex] === value) {
                  continue outer;
                }
              }
              result.push(value);
            }
            else if (indexOf(values, value, 0) < 0) {
              result.push(value);
            }
          }
          return result;
        }
    
        /**
         * The base implementation of `_.forEach` without support for callback
         * shorthands and `this` binding.
         *
         * @private
         * @param {Array|Object|string} collection The collection to iterate over.
         * @param {Function} iteratee The function invoked per iteration.
         * @returns {Array|Object|string} Returns `collection`.
         */
        var baseEach = createBaseEach(baseForOwn);
    
        /**
         * The base implementation of `_.forEachRight` without support for callback
         * shorthands and `this` binding.
         *
         * @private
         * @param {Array|Object|string} collection The collection to iterate over.
         * @param {Function} iteratee The function invoked per iteration.
         * @returns {Array|Object|string} Returns `collection`.
         */
        var baseEachRight = createBaseEach(baseForOwnRight, true);
    
        /**
         * The base implementation of `_.every` without support for callback
         * shorthands and `this` binding.
         *
         * @private
         * @param {Array|Object|string} collection The collection to iterate over.
         * @param {Function} predicate The function invoked per iteration.
         * @returns {boolean} Returns `true` if all elements pass the predicate check,
         *  else `false`
         */
        function baseEvery(collection, predicate) {
          var result = true;
          baseEach(collection, function(value, index, collection) {
            result = !!predicate(value, index, collection);
            return result;
          });
          return result;
        }
    
        /**
         * Gets the extremum value of `collection` invoking `iteratee` for each value
         * in `collection` to generate the criterion by which the value is ranked.
         * The `iteratee` is invoked with three arguments: (value, index|key, collection).
         *
         * @private
         * @param {Array|Object|string} collection The collection to iterate over.
         * @param {Function} iteratee The function invoked per iteration.
         * @param {Function} comparator The function used to compare values.
         * @param {*} exValue The initial extremum value.
         * @returns {*} Returns the extremum value.
         */
        function baseExtremum(collection, iteratee, comparator, exValue) {
          var computed = exValue,
              result = computed;
    
          baseEach(collection, function(value, index, collection) {
            var current = +iteratee(value, index, collection);
            if (comparator(current, computed) || (current === exValue && current === result)) {
              computed = current;
              result = value;
            }
          });
          return result;
        }
    
        /**
         * The base implementation of `_.fill` without an iteratee call guard.
         *
         * @private
         * @param {Array} array The array to fill.
         * @param {*} value The value to fill `array` with.
         * @param {number} [start=0] The start position.
         * @param {number} [end=array.length] The end position.
         * @returns {Array} Returns `array`.
         */
        function baseFill(array, value, start, end) {
          var length = array.length;
    
          start = start == null ? 0 : (+start || 0);
          if (start < 0) {
            start = -start > length ? 0 : (length + start);
          }
          end = (end === undefined || end > length) ? length : (+end || 0);
          if (end < 0) {
            end += length;
          }
          length = start > end ? 0 : (end >>> 0);
          start >>>= 0;
    
          while (start < length) {
            array[start++] = value;
          }
          return array;
        }
    
        /**
         * The base implementation of `_.filter` without support for callback
         * shorthands and `this` binding.
         *
         * @private
         * @param {Array|Object|string} collection The collection to iterate over.
         * @param {Function} predicate The function invoked per iteration.
         * @returns {Array} Returns the new filtered array.
         */
        function baseFilter(collection, predicate) {
          var result = [];
          baseEach(collection, function(value, index, collection) {
            if (predicate(value, index, collection)) {
              result.push(value);
            }
          });
          return result;
        }
    
        /**
         * The base implementation of `_.find`, `_.findLast`, `_.findKey`, and `_.findLastKey`,
         * without support for callback shorthands and `this` binding, which iterates
         * over `collection` using the provided `eachFunc`.
         *
         * @private
         * @param {Array|Object|string} collection The collection to search.
         * @param {Function} predicate The function invoked per iteration.
         * @param {Function} eachFunc The function to iterate over `collection`.
         * @param {boolean} [retKey] Specify returning the key of the found element
         *  instead of the element itself.
         * @returns {*} Returns the found element or its key, else `undefined`.
         */
        function baseFind(collection, predicate, eachFunc, retKey) {
          var result;
          eachFunc(collection, function(value, key, collection) {
            if (predicate(value, key, collection)) {
              result = retKey ? key : value;
              return false;
            }
          });
          return result;
        }
    
        /**
         * The base implementation of `_.flatten` with added support for restricting
         * flattening and specifying the start index.
         *
         * @private
         * @param {Array} array The array to flatten.
         * @param {boolean} [isDeep] Specify a deep flatten.
         * @param {boolean} [isStrict] Restrict flattening to arrays-like objects.
         * @returns {Array} Returns the new flattened array.
         */
        function baseFlatten(array, isDeep, isStrict) {
          var index = -1,
              length = array.length,
              resIndex = -1,
              result = [];
    
          while (++index < length) {
            var value = array[index];
            if (isObjectLike(value) && isArrayLike(value) &&
                (isStrict || isArray(value) || isArguments(value))) {
              if (isDeep) {
                // Recursively flatten arrays (susceptible to call stack limits).
                value = baseFlatten(value, isDeep, isStrict);
              }
              var valIndex = -1,
                  valLength = value.length;
    
              while (++valIndex < valLength) {
                result[++resIndex] = value[valIndex];
              }
            } else if (!isStrict) {
              result[++resIndex] = value;
            }
          }
          return result;
        }
    
        /**
         * The base implementation of `baseForIn` and `baseForOwn` which iterates
         * over `object` properties returned by `keysFunc` invoking `iteratee` for
         * each property. Iteratee functions may exit iteration early by explicitly
         * returning `false`.
         *
         * @private
         * @param {Object} object The object to iterate over.
         * @param {Function} iteratee The function invoked per iteration.
         * @param {Function} keysFunc The function to get the keys of `object`.
         * @returns {Object} Returns `object`.
         */
        var baseFor = createBaseFor();
    
        /**
         * This function is like `baseFor` except that it iterates over properties
         * in the opposite order.
         *
         * @private
         * @param {Object} object The object to iterate over.
         * @param {Function} iteratee The function invoked per iteration.
         * @param {Function} keysFunc The function to get the keys of `object`.
         * @returns {Object} Returns `object`.
         */
        var baseForRight = createBaseFor(true);
    
        /**
         * The base implementation of `_.forIn` without support for callback
         * shorthands and `this` binding.
         *
         * @private
         * @param {Object} object The object to iterate over.
         * @param {Function} iteratee The function invoked per iteration.
         * @returns {Object} Returns `object`.
         */
        function baseForIn(object, iteratee) {
          return baseFor(object, iteratee, keysIn);
        }
    
        /**
         * The base implementation of `_.forOwn` without support for callback
         * shorthands and `this` binding.
         *
         * @private
         * @param {Object} object The object to iterate over.
         * @param {Function} iteratee The function invoked per iteration.
         * @returns {Object} Returns `object`.
         */
        function baseForOwn(object, iteratee) {
          return baseFor(object, iteratee, keys);
        }
    
        /**
         * The base implementation of `_.forOwnRight` without support for callback
         * shorthands and `this` binding.
         *
         * @private
         * @param {Object} object The object to iterate over.
         * @param {Function} iteratee The function invoked per iteration.
         * @returns {Object} Returns `object`.
         */
        function baseForOwnRight(object, iteratee) {
          return baseForRight(object, iteratee, keys);
        }
    
        /**
         * The base implementation of `_.functions` which creates an array of
         * `object` function property names filtered from those provided.
         *
         * @private
         * @param {Object} object The object to inspect.
         * @param {Array} props The property names to filter.
         * @returns {Array} Returns the new array of filtered property names.
         */
        function baseFunctions(object, props) {
          var index = -1,
              length = props.length,
              resIndex = -1,
              result = [];
    
          while (++index < length) {
            var key = props[index];
            if (isFunction(object[key])) {
              result[++resIndex] = key;
            }
          }
          return result;
        }
    
        /**
         * The base implementation of `get` without support for string paths
         * and default values.
         *
         * @private
         * @param {Object} object The object to query.
         * @param {Array} path The path of the property to get.
         * @param {string} [pathKey] The key representation of path.
         * @returns {*} Returns the resolved value.
         */
        function baseGet(object, path, pathKey) {
          if (object == null) {
            return;
          }
          if (pathKey !== undefined && pathKey in toObject(object)) {
            path = [pathKey];
          }
          var index = 0,
              length = path.length;
    
          while (object != null && index < length) {
            object = object[path[index++]];
          }
          return (index && index == length) ? object : undefined;
        }
    
        /**
         * The base implementation of `_.isEqual` without support for `this` binding
         * `customizer` functions.
         *
         * @private
         * @param {*} value The value to compare.
         * @param {*} other The other value to compare.
         * @param {Function} [customizer] The function to customize comparing values.
         * @param {boolean} [isLoose] Specify performing partial comparisons.
         * @param {Array} [stackA] Tracks traversed `value` objects.
         * @param {Array} [stackB] Tracks traversed `other` objects.
         * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
         */
        function baseIsEqual(value, other, customizer, isLoose, stackA, stackB) {
          if (value === other) {
            return true;
          }
          if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
            return value !== value && other !== other;
          }
          return baseIsEqualDeep(value, other, baseIsEqual, customizer, isLoose, stackA, stackB);
        }
    
        /**
         * A specialized version of `baseIsEqual` for arrays and objects which performs
         * deep comparisons and tracks traversed objects enabling objects with circular
         * references to be compared.
         *
         * @private
         * @param {Object} object The object to compare.
         * @param {Object} other The other object to compare.
         * @param {Function} equalFunc The function to determine equivalents of values.
         * @param {Function} [customizer] The function to customize comparing objects.
         * @param {boolean} [isLoose] Specify performing partial comparisons.
         * @param {Array} [stackA=[]] Tracks traversed `value` objects.
         * @param {Array} [stackB=[]] Tracks traversed `other` objects.
         * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
         */
        function baseIsEqualDeep(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
          var objIsArr = isArray(object),
              othIsArr = isArray(other),
              objTag = arrayTag,
              othTag = arrayTag;
    
          if (!objIsArr) {
            objTag = objToString.call(object);
            if (objTag == argsTag) {
              objTag = objectTag;
            } else if (objTag != objectTag) {
              objIsArr = isTypedArray(object);
            }
          }
          if (!othIsArr) {
            othTag = objToString.call(other);
            if (othTag == argsTag) {
              othTag = objectTag;
            } else if (othTag != objectTag) {
              othIsArr = isTypedArray(other);
            }
          }
          var objIsObj = objTag == objectTag,
              othIsObj = othTag == objectTag,
              isSameTag = objTag == othTag;
    
          if (isSameTag && !(objIsArr || objIsObj)) {
            return equalByTag(object, other, objTag);
          }
          if (!isLoose) {
            var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
                othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');
    
            if (objIsWrapped || othIsWrapped) {
              return equalFunc(objIsWrapped ? object.value() : object, othIsWrapped ? other.value() : other, customizer, isLoose, stackA, stackB);
            }
          }
          if (!isSameTag) {
            return false;
          }
          // Assume cyclic values are equal.
          // For more information on detecting circular references see https://es5.github.io/#JO.
          stackA || (stackA = []);
          stackB || (stackB = []);
    
          var length = stackA.length;
          while (length--) {
            if (stackA[length] == object) {
              return stackB[length] == other;
            }
          }
          // Add `object` and `other` to the stack of traversed objects.
          stackA.push(object);
          stackB.push(other);
    
          var result = (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, customizer, isLoose, stackA, stackB);
    
          stackA.pop();
          stackB.pop();
    
          return result;
        }
    
        /**
         * The base implementation of `_.isMatch` without support for callback
         * shorthands and `this` binding.
         *
         * @private
         * @param {Object} object The object to inspect.
         * @param {Array} matchData The propery names, values, and compare flags to match.
         * @param {Function} [customizer] The function to customize comparing objects.
         * @returns {boolean} Returns `true` if `object` is a match, else `false`.
         */
        function baseIsMatch(object, matchData, customizer) {
          var index = matchData.length,
              length = index,
              noCustomizer = !customizer;
    
          if (object == null) {
            return !length;
          }
          object = toObject(object);
          while (index--) {
            var data = matchData[index];
            if ((noCustomizer && data[2])
                  ? data[1] !== object[data[0]]
                  : !(data[0] in object)
                ) {
              return false;
            }
          }
          while (++index < length) {
            data = matchData[index];
            var key = data[0],
                objValue = object[key],
                srcValue = data[1];
    
            if (noCustomizer && data[2]) {
              if (objValue === undefined && !(key in object)) {
                return false;
              }
            } else {
              var result = customizer ? customizer(objValue, srcValue, key) : undefined;
              if (!(result === undefined ? baseIsEqual(srcValue, objValue, customizer, true) : result)) {
                return false;
              }
            }
          }
          return true;
        }
    
        /**
         * The base implementation of `_.map` without support for callback shorthands
         * and `this` binding.
         *
         * @private
         * @param {Array|Object|string} collection The collection to iterate over.
         * @param {Function} iteratee The function invoked per iteration.
         * @returns {Array} Returns the new mapped array.
         */
        function baseMap(collection, iteratee) {
          var index = -1,
              result = isArrayLike(collection) ? Array(collection.length) : [];
    
          baseEach(collection, function(value, key, collection) {
            result[++index] = iteratee(value, key, collection);
          });
          return result;
        }
    
        /**
         * The base implementation of `_.matches` which does not clone `source`.
         *
         * @private
         * @param {Object} source The object of property values to match.
         * @returns {Function} Returns the new function.
         */
        function baseMatches(source) {
          var matchData = getMatchData(source);
          if (matchData.length == 1 && matchData[0][2]) {
            var key = matchData[0][0],
                value = matchData[0][1];
    
            return function(object) {
              if (object == null) {
                return false;
              }
              return object[key] === value && (value !== undefined || (key in toObject(object)));
            };
          }
          return function(object) {
            return baseIsMatch(object, matchData);
          };
        }
    
        /**
         * The base implementation of `_.matchesProperty` which does not clone `srcValue`.
         *
         * @private
         * @param {string} path The path of the property to get.
         * @param {*} srcValue The value to compare.
         * @returns {Function} Returns the new function.
         */
        function baseMatchesProperty(path, srcValue) {
          var isArr = isArray(path),
              isCommon = isKey(path) && isStrictComparable(srcValue),
              pathKey = (path + '');
    
          path = toPath(path);
          return function(object) {
            if (object == null) {
              return false;
            }
            var key = pathKey;
            object = toObject(object);
            if ((isArr || !isCommon) && !(key in object)) {
              object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
              if (object == null) {
                return false;
              }
              key = last(path);
              object = toObject(object);
            }
            return object[key] === srcValue
              ? (srcValue !== undefined || (key in object))
              : baseIsEqual(srcValue, object[key], undefined, true);
          };
        }
    
        /**
         * The base implementation of `_.merge` without support for argument juggling,
         * multiple sources, and `this` binding `customizer` functions.
         *
         * @private
         * @param {Object} object The destination object.
         * @param {Object} source The source object.
         * @param {Function} [customizer] The function to customize merging properties.
         * @param {Array} [stackA=[]] Tracks traversed source objects.
         * @param {Array} [stackB=[]] Associates values with source counterparts.
         * @returns {Object} Returns `object`.
         */
        function baseMerge(object, source, customizer, stackA, stackB) {
          if (!isObject(object)) {
            return object;
          }
          var isSrcArr = isArrayLike(source) && (isArray(source) || isTypedArray(source)),
              props = isSrcArr ? null : keys(source);
    
          arrayEach(props || source, function(srcValue, key) {
            if (props) {
              key = srcValue;
              srcValue = source[key];
            }
            if (isObjectLike(srcValue)) {
              stackA || (stackA = []);
              stackB || (stackB = []);
              baseMergeDeep(object, source, key, baseMerge, customizer, stackA, stackB);
            }
            else {
              var value = object[key],
                  result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
                  isCommon = result === undefined;
    
              if (isCommon) {
                result = srcValue;
              }
              if ((result !== undefined || (isSrcArr && !(key in object))) &&
                  (isCommon || (result === result ? (result !== value) : (value === value)))) {
                object[key] = result;
              }
            }
          });
          return object;
        }
    
        /**
         * A specialized version of `baseMerge` for arrays and objects which performs
         * deep merges and tracks traversed objects enabling objects with circular
         * references to be merged.
         *
         * @private
         * @param {Object} object The destination object.
         * @param {Object} source The source object.
         * @param {string} key The key of the value to merge.
         * @param {Function} mergeFunc The function to merge values.
         * @param {Function} [customizer] The function to customize merging properties.
         * @param {Array} [stackA=[]] Tracks traversed source objects.
         * @param {Array} [stackB=[]] Associates values with source counterparts.
         * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
         */
        function baseMergeDeep(object, source, key, mergeFunc, customizer, stackA, stackB) {
          var length = stackA.length,
              srcValue = source[key];
    
          while (length--) {
            if (stackA[length] == srcValue) {
              object[key] = stackB[length];
              return;
            }
          }
          var value = object[key],
              result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
              isCommon = result === undefined;
    
          if (isCommon) {
            result = srcValue;
            if (isArrayLike(srcValue) && (isArray(srcValue) || isTypedArray(srcValue))) {
              result = isArray(value)
                ? value
                : (isArrayLike(value) ? arrayCopy(value) : []);
            }
            else if (isPlainObject(srcValue) || isArguments(srcValue)) {
              result = isArguments(value)
                ? toPlainObject(value)
                : (isPlainObject(value) ? value : {});
            }
            else {
              isCommon = false;
            }
          }
          // Add the source value to the stack of traversed objects and associate
          // it with its merged value.
          stackA.push(srcValue);
          stackB.push(result);
    
          if (isCommon) {
            // Recursively merge objects and arrays (susceptible to call stack limits).
            object[key] = mergeFunc(result, srcValue, customizer, stackA, stackB);
          } else if (result === result ? (result !== value) : (value === value)) {
            object[key] = result;
          }
        }
    
        /**
         * The base implementation of `_.property` without support for deep paths.
         *
         * @private
         * @param {string} key The key of the property to get.
         * @returns {Function} Returns the new function.
         */
        function baseProperty(key) {
          return function(object) {
            return object == null ? undefined : object[key];
          };
        }
    
        /**
         * A specialized version of `baseProperty` which supports deep paths.
         *
         * @private
         * @param {Array|string} path The path of the property to get.
         * @returns {Function} Returns the new function.
         */
        function basePropertyDeep(path) {
          var pathKey = (path + '');
          path = toPath(path);
          return function(object) {
            return baseGet(object, path, pathKey);
          };
        }
    
        /**
         * The base implementation of `_.pullAt` without support for individual
         * index arguments and capturing the removed elements.
         *
         * @private
         * @param {Array} array The array to modify.
         * @param {number[]} indexes The indexes of elements to remove.
         * @returns {Array} Returns `array`.
         */
        function basePullAt(array, indexes) {
          var length = array ? indexes.length : 0;
          while (length--) {
            var index = indexes[length];
            if (index != previous && isIndex(index)) {
              var previous = index;
              splice.call(array, index, 1);
            }
          }
          return array;
        }
    
        /**
         * The base implementation of `_.random` without support for argument juggling
         * and returning floating-point numbers.
         *
         * @private
         * @param {number} min The minimum possible value.
         * @param {number} max The maximum possible value.
         * @returns {number} Returns the random number.
         */
        function baseRandom(min, max) {
          return min + floor(nativeRandom() * (max - min + 1));
        }
    
        /**
         * The base implementation of `_.reduce` and `_.reduceRight` without support
         * for callback shorthands and `this` binding, which iterates over `collection`
         * using the provided `eachFunc`.
         *
         * @private
         * @param {Array|Object|string} collection The collection to iterate over.
         * @param {Function} iteratee The function invoked per iteration.
         * @param {*} accumulator The initial value.
         * @param {boolean} initFromCollection Specify using the first or last element
         *  of `collection` as the initial value.
         * @param {Function} eachFunc The function to iterate over `collection`.
         * @returns {*} Returns the accumulated value.
         */
        function baseReduce(collection, iteratee, accumulator, initFromCollection, eachFunc) {
          eachFunc(collection, function(value, index, collection) {
            accumulator = initFromCollection
              ? (initFromCollection = false, value)
              : iteratee(accumulator, value, index, collection);
          });
          return accumulator;
        }
    
        /**
         * The base implementation of `setData` without support for hot loop detection.
         *
         * @private
         * @param {Function} func The function to associate metadata with.
         * @param {*} data The metadata.
         * @returns {Function} Returns `func`.
         */
        var baseSetData = !metaMap ? identity : function(func, data) {
          metaMap.set(func, data);
          return func;
        };
    
        /**
         * The base implementation of `_.slice` without an iteratee call guard.
         *
         * @private
         * @param {Array} array The array to slice.
         * @param {number} [start=0] The start position.
         * @param {number} [end=array.length] The end position.
         * @returns {Array} Returns the slice of `array`.
         */
        function baseSlice(array, start, end) {
          var index = -1,
              length = array.length;
    
          start = start == null ? 0 : (+start || 0);
          if (start < 0) {
            start = -start > length ? 0 : (length + start);
          }
          end = (end === undefined || end > length) ? length : (+end || 0);
          if (end < 0) {
            end += length;
          }
          length = start > end ? 0 : ((end - start) >>> 0);
          start >>>= 0;
    
          var result = Array(length);
          while (++index < length) {
            result[index] = array[index + start];
          }
          return result;
        }
    
        /**
         * The base implementation of `_.some` without support for callback shorthands
         * and `this` binding.
         *
         * @private
         * @param {Array|Object|string} collection The collection to iterate over.
         * @param {Function} predicate The function invoked per iteration.
         * @returns {boolean} Returns `true` if any element passes the predicate check,
         *  else `false`.
         */
        function baseSome(collection, predicate) {
          var result;
    
          baseEach(collection, function(value, index, collection) {
            result = predicate(value, index, collection);
            return !result;
          });
          return !!result;
        }
    
        /**
         * The base implementation of `_.sortBy` which uses `comparer` to define
         * the sort order of `array` and replaces criteria objects with their
         * corresponding values.
         *
         * @private
         * @param {Array} array The array to sort.
         * @param {Function} comparer The function to define sort order.
         * @returns {Array} Returns `array`.
         */
        function baseSortBy(array, comparer) {
          var length = array.length;
    
          array.sort(comparer);
          while (length--) {
            array[length] = array[length].value;
          }
          return array;
        }
    
        /**
         * The base implementation of `_.sortByOrder` without param guards.
         *
         * @private
         * @param {Array|Object|string} collection The collection to iterate over.
         * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
         * @param {boolean[]} orders The sort orders of `iteratees`.
         * @returns {Array} Returns the new sorted array.
         */
        function baseSortByOrder(collection, iteratees, orders) {
          var callback = getCallback(),
              index = -1;
    
          iteratees = arrayMap(iteratees, function(iteratee) { return callback(iteratee); });
    
          var result = baseMap(collection, function(value) {
            var criteria = arrayMap(iteratees, function(iteratee) { return iteratee(value); });
            return { 'criteria': criteria, 'index': ++index, 'value': value };
          });
    
          return baseSortBy(result, function(object, other) {
            return compareMultiple(object, other, orders);
          });
        }
    
        /**
         * The base implementation of `_.sum` without support for callback shorthands
         * and `this` binding.
         *
         * @private
         * @param {Array|Object|string} collection The collection to iterate over.
         * @param {Function} iteratee The function invoked per iteration.
         * @returns {number} Returns the sum.
         */
        function baseSum(collection, iteratee) {
          var result = 0;
          baseEach(collection, function(value, index, collection) {
            result += +iteratee(value, index, collection) || 0;
          });
          return result;
        }
    
        /**
         * The base implementation of `_.uniq` without support for callback shorthands
         * and `this` binding.
         *
         * @private
         * @param {Array} array The array to inspect.
         * @param {Function} [iteratee] The function invoked per iteration.
         * @returns {Array} Returns the new duplicate-value-free array.
         */
        function baseUniq(array, iteratee) {
          var index = -1,
              indexOf = getIndexOf(),
              length = array.length,
              isCommon = indexOf == baseIndexOf,
              isLarge = isCommon && length >= 200,
              seen = isLarge ? createCache() : null,
              result = [];
    
          if (seen) {
            indexOf = cacheIndexOf;
            isCommon = false;
          } else {
            isLarge = false;
            seen = iteratee ? [] : result;
          }
          outer:
          while (++index < length) {
            var value = array[index],
                computed = iteratee ? iteratee(value, index, array) : value;
    
            if (isCommon && value === value) {
              var seenIndex = seen.length;
              while (seenIndex--) {
                if (seen[seenIndex] === computed) {
                  continue outer;
                }
              }
              if (iteratee) {
                seen.push(computed);
              }
              result.push(value);
            }
            else if (indexOf(seen, computed, 0) < 0) {
              if (iteratee || isLarge) {
                seen.push(computed);
              }
              result.push(value);
            }
          }
          return result;
        }
    
        /**
         * The base implementation of `_.values` and `_.valuesIn` which creates an
         * array of `object` property values corresponding to the property names
         * of `props`.
         *
         * @private
         * @param {Object} object The object to query.
         * @param {Array} props The property names to get values for.
         * @returns {Object} Returns the array of property values.
         */
        function baseValues(object, props) {
          var index = -1,
              length = props.length,
              result = Array(length);
    
          while (++index < length) {
            result[index] = object[props[index]];
          }
          return result;
        }
    
        /**
         * The base implementation of `_.dropRightWhile`, `_.dropWhile`, `_.takeRightWhile`,
         * and `_.takeWhile` without support for callback shorthands and `this` binding.
         *
         * @private
         * @param {Array} array The array to query.
         * @param {Function} predicate The function invoked per iteration.
         * @param {boolean} [isDrop] Specify dropping elements instead of taking them.
         * @param {boolean} [fromRight] Specify iterating from right to left.
         * @returns {Array} Returns the slice of `array`.
         */
        function baseWhile(array, predicate, isDrop, fromRight) {
          var length = array.length,
              index = fromRight ? length : -1;
    
          while ((fromRight ? index-- : ++index < length) && predicate(array[index], index, array)) {}
          return isDrop
            ? baseSlice(array, (fromRight ? 0 : index), (fromRight ? index + 1 : length))
            : baseSlice(array, (fromRight ? index + 1 : 0), (fromRight ? length : index));
        }
    
        /**
         * The base implementation of `wrapperValue` which returns the result of
         * performing a sequence of actions on the unwrapped `value`, where each
         * successive action is supplied the return value of the previous.
         *
         * @private
         * @param {*} value The unwrapped value.
         * @param {Array} actions Actions to peform to resolve the unwrapped value.
         * @returns {*} Returns the resolved value.
         */
        function baseWrapperValue(value, actions) {
          var result = value;
          if (result instanceof LazyWrapper) {
            result = result.value();
          }
          var index = -1,
              length = actions.length;
    
          while (++index < length) {
            var args = [result],
                action = actions[index];
    
            push.apply(args, action.args);
            result = action.func.apply(action.thisArg, args);
          }
          return result;
        }
    
        /**
         * Performs a binary search of `array` to determine the index at which `value`
         * should be inserted into `array` in order to maintain its sort order.
         *
         * @private
         * @param {Array} array The sorted array to inspect.
         * @param {*} value The value to evaluate.
         * @param {boolean} [retHighest] Specify returning the highest qualified index.
         * @returns {number} Returns the index at which `value` should be inserted
         *  into `array`.
         */
        function binaryIndex(array, value, retHighest) {
          var low = 0,
              high = array ? array.length : low;
    
          if (typeof value == 'number' && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
            while (low < high) {
              var mid = (low + high) >>> 1,
                  computed = array[mid];
    
              if ((retHighest ? (computed <= value) : (computed < value)) && computed !== null) {
                low = mid + 1;
              } else {
                high = mid;
              }
            }
            return high;
          }
          return binaryIndexBy(array, value, identity, retHighest);
        }
    
        /**
         * This function is like `binaryIndex` except that it invokes `iteratee` for
         * `value` and each element of `array` to compute their sort ranking. The
         * iteratee is invoked with one argument; (value).
         *
         * @private
         * @param {Array} array The sorted array to inspect.
         * @param {*} value The value to evaluate.
         * @param {Function} iteratee The function invoked per iteration.
         * @param {boolean} [retHighest] Specify returning the highest qualified index.
         * @returns {number} Returns the index at which `value` should be inserted
         *  into `array`.
         */
        function binaryIndexBy(array, value, iteratee, retHighest) {
          value = iteratee(value);
    
          var low = 0,
              high = array ? array.length : 0,
              valIsNaN = value !== value,
              valIsNull = value === null,
              valIsUndef = value === undefined;
    
          while (low < high) {
            var mid = floor((low + high) / 2),
                computed = iteratee(array[mid]),
                isDef = computed !== undefined,
                isReflexive = computed === computed;
    
            if (valIsNaN) {
              var setLow = isReflexive || retHighest;
            } else if (valIsNull) {
              setLow = isReflexive && isDef && (retHighest || computed != null);
            } else if (valIsUndef) {
              setLow = isReflexive && (retHighest || isDef);
            } else if (computed == null) {
              setLow = false;
            } else {
              setLow = retHighest ? (computed <= value) : (computed < value);
            }
            if (setLow) {
              low = mid + 1;
            } else {
              high = mid;
            }
          }
          return nativeMin(high, MAX_ARRAY_INDEX);
        }
    
        /**
         * A specialized version of `baseCallback` which only supports `this` binding
         * and specifying the number of arguments to provide to `func`.
         *
         * @private
         * @param {Function} func The function to bind.
         * @param {*} thisArg The `this` binding of `func`.
         * @param {number} [argCount] The number of arguments to provide to `func`.
         * @returns {Function} Returns the callback.
         */
        function bindCallback(func, thisArg, argCount) {
          if (typeof func != 'function') {
            return identity;
          }
          if (thisArg === undefined) {
            return func;
          }
          switch (argCount) {
            case 1: return function(value) {
              return func.call(thisArg, value);
            };
            case 3: return function(value, index, collection) {
              return func.call(thisArg, value, index, collection);
            };
            case 4: return function(accumulator, value, index, collection) {
              return func.call(thisArg, accumulator, value, index, collection);
            };
            case 5: return function(value, other, key, object, source) {
              return func.call(thisArg, value, other, key, object, source);
            };
          }
          return function() {
            return func.apply(thisArg, arguments);
          };
        }
    
        /**
         * Creates a clone of the given array buffer.
         *
         * @private
         * @param {ArrayBuffer} buffer The array buffer to clone.
         * @returns {ArrayBuffer} Returns the cloned array buffer.
         */
        function bufferClone(buffer) {
          return bufferSlice.call(buffer, 0);
        }
        if (!bufferSlice) {
          // PhantomJS has `ArrayBuffer` and `Uint8Array` but not `Float64Array`.
          bufferClone = !(ArrayBuffer && Uint8Array) ? constant(null) : function(buffer) {
            var byteLength = buffer.byteLength,
                floatLength = Float64Array ? floor(byteLength / FLOAT64_BYTES_PER_ELEMENT) : 0,
                offset = floatLength * FLOAT64_BYTES_PER_ELEMENT,
                result = new ArrayBuffer(byteLength);
    
            if (floatLength) {
              var view = new Float64Array(result, 0, floatLength);
              view.set(new Float64Array(buffer, 0, floatLength));
            }
            if (byteLength != offset) {
              view = new Uint8Array(result, offset);
              view.set(new Uint8Array(buffer, offset));
            }
            return result;
          };
        }
    
        /**
         * Creates an array that is the composition of partially applied arguments,
         * placeholders, and provided arguments into a single array of arguments.
         *
         * @private
         * @param {Array|Object} args The provided arguments.
         * @param {Array} partials The arguments to prepend to those provided.
         * @param {Array} holders The `partials` placeholder indexes.
         * @returns {Array} Returns the new array of composed arguments.
         */
        function composeArgs(args, partials, holders) {
          var holdersLength = holders.length,
              argsIndex = -1,
              argsLength = nativeMax(args.length - holdersLength, 0),
              leftIndex = -1,
              leftLength = partials.length,
              result = Array(argsLength + leftLength);
    
          while (++leftIndex < leftLength) {
            result[leftIndex] = partials[leftIndex];
          }
          while (++argsIndex < holdersLength) {
            result[holders[argsIndex]] = args[argsIndex];
          }
          while (argsLength--) {
            result[leftIndex++] = args[argsIndex++];
          }
          return result;
        }
    
        /**
         * This function is like `composeArgs` except that the arguments composition
         * is tailored for `_.partialRight`.
         *
         * @private
         * @param {Array|Object} args The provided arguments.
         * @param {Array} partials The arguments to append to those provided.
         * @param {Array} holders The `partials` placeholder indexes.
         * @returns {Array} Returns the new array of composed arguments.
         */
        function composeArgsRight(args, partials, holders) {
          var holdersIndex = -1,
              holdersLength = holders.length,
              argsIndex = -1,
              argsLength = nativeMax(args.length - holdersLength, 0),
              rightIndex = -1,
              rightLength = partials.length,
              result = Array(argsLength + rightLength);
    
          while (++argsIndex < argsLength) {
            result[argsIndex] = args[argsIndex];
          }
          var offset = argsIndex;
          while (++rightIndex < rightLength) {
            result[offset + rightIndex] = partials[rightIndex];
          }
          while (++holdersIndex < holdersLength) {
            result[offset + holders[holdersIndex]] = args[argsIndex++];
          }
          return result;
        }
    
        /**
         * Creates a function that aggregates a collection, creating an accumulator
         * object composed from the results of running each element in the collection
         * through an iteratee.
         *
         * **Note:** This function is used to create `_.countBy`, `_.groupBy`, `_.indexBy`,
         * and `_.partition`.
         *
         * @private
         * @param {Function} setter The function to set keys and values of the accumulator object.
         * @param {Function} [initializer] The function to initialize the accumulator object.
         * @returns {Function} Returns the new aggregator function.
         */
        function createAggregator(setter, initializer) {
          return function(collection, iteratee, thisArg) {
            var result = initializer ? initializer() : {};
            iteratee = getCallback(iteratee, thisArg, 3);
    
            if (isArray(collection)) {
              var index = -1,
                  length = collection.length;
    
              while (++index < length) {
                var value = collection[index];
                setter(result, value, iteratee(value, index, collection), collection);
              }
            } else {
              baseEach(collection, function(value, key, collection) {
                setter(result, value, iteratee(value, key, collection), collection);
              });
            }
            return result;
          };
        }
    
        /**
         * Creates a function that assigns properties of source object(s) to a given
         * destination object.
         *
         * **Note:** This function is used to create `_.assign`, `_.defaults`, and `_.merge`.
         *
         * @private
         * @param {Function} assigner The function to assign values.
         * @returns {Function} Returns the new assigner function.
         */
        function createAssigner(assigner) {
          return restParam(function(object, sources) {
            var index = -1,
                length = object == null ? 0 : sources.length,
                customizer = length > 2 ? sources[length - 2] : undefined,
                guard = length > 2 ? sources[2] : undefined,
                thisArg = length > 1 ? sources[length - 1] : undefined;
    
            if (typeof customizer == 'function') {
              customizer = bindCallback(customizer, thisArg, 5);
              length -= 2;
            } else {
              customizer = typeof thisArg == 'function' ? thisArg : undefined;
              length -= (customizer ? 1 : 0);
            }
            if (guard && isIterateeCall(sources[0], sources[1], guard)) {
              customizer = length < 3 ? undefined : customizer;
              length = 1;
            }
            while (++index < length) {
              var source = sources[index];
              if (source) {
                assigner(object, source, customizer);
              }
            }
            return object;
          });
        }
    
        /**
         * Creates a `baseEach` or `baseEachRight` function.
         *
         * @private
         * @param {Function} eachFunc The function to iterate over a collection.
         * @param {boolean} [fromRight] Specify iterating from right to left.
         * @returns {Function} Returns the new base function.
         */
        function createBaseEach(eachFunc, fromRight) {
          return function(collection, iteratee) {
            var length = collection ? getLength(collection) : 0;
            if (!isLength(length)) {
              return eachFunc(collection, iteratee);
            }
            var index = fromRight ? length : -1,
                iterable = toObject(collection);
    
            while ((fromRight ? index-- : ++index < length)) {
              if (iteratee(iterable[index], index, iterable) === false) {
                break;
              }
            }
            return collection;
          };
        }
    
        /**
         * Creates a base function for `_.forIn` or `_.forInRight`.
         *
         * @private
         * @param {boolean} [fromRight] Specify iterating from right to left.
         * @returns {Function} Returns the new base function.
         */
        function createBaseFor(fromRight) {
          return function(object, iteratee, keysFunc) {
            var iterable = toObject(object),
                props = keysFunc(object),
                length = props.length,
                index = fromRight ? length : -1;
    
            while ((fromRight ? index-- : ++index < length)) {
              var key = props[index];
              if (iteratee(iterable[key], key, iterable) === false) {
                break;
              }
            }
            return object;
          };
        }
    
        /**
         * Creates a function that wraps `func` and invokes it with the `this`
         * binding of `thisArg`.
         *
         * @private
         * @param {Function} func The function to bind.
         * @param {*} [thisArg] The `this` binding of `func`.
         * @returns {Function} Returns the new bound function.
         */
        function createBindWrapper(func, thisArg) {
          var Ctor = createCtorWrapper(func);
    
          function wrapper() {
            var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
            return fn.apply(thisArg, arguments);
          }
          return wrapper;
        }
    
        /**
         * Creates a `Set` cache object to optimize linear searches of large arrays.
         *
         * @private
         * @param {Array} [values] The values to cache.
         * @returns {null|Object} Returns the new cache object if `Set` is supported, else `null`.
         */
        var createCache = !(nativeCreate && Set) ? constant(null) : function(values) {
          return new SetCache(values);
        };
    
        /**
         * Creates a function that produces compound words out of the words in a
         * given string.
         *
         * @private
         * @param {Function} callback The function to combine each word.
         * @returns {Function} Returns the new compounder function.
         */
        function createCompounder(callback) {
          return function(string) {
            var index = -1,
                array = words(deburr(string)),
                length = array.length,
                result = '';
    
            while (++index < length) {
              result = callback(result, array[index], index);
            }
            return result;
          };
        }
    
        /**
         * Creates a function that produces an instance of `Ctor` regardless of
         * whether it was invoked as part of a `new` expression or by `call` or `apply`.
         *
         * @private
         * @param {Function} Ctor The constructor to wrap.
         * @returns {Function} Returns the new wrapped function.
         */
        function createCtorWrapper(Ctor) {
          return function() {
            // Use a `switch` statement to work with class constructors.
            // See https://people.mozilla.org/~jorendorff/es6-draft.html#sec-ecmascript-function-objects-call-thisargument-argumentslist
            // for more details.
            var args = arguments;
            switch (args.length) {
              case 0: return new Ctor;
              case 1: return new Ctor(args[0]);
              case 2: return new Ctor(args[0], args[1]);
              case 3: return new Ctor(args[0], args[1], args[2]);
              case 4: return new Ctor(args[0], args[1], args[2], args[3]);
              case 5: return new Ctor(args[0], args[1], args[2], args[3], args[4]);
            }
            var thisBinding = baseCreate(Ctor.prototype),
                result = Ctor.apply(thisBinding, args);
    
            // Mimic the constructor's `return` behavior.
            // See https://es5.github.io/#x13.2.2 for more details.
            return isObject(result) ? result : thisBinding;
          };
        }
    
        /**
         * Creates a `_.curry` or `_.curryRight` function.
         *
         * @private
         * @param {boolean} flag The curry bit flag.
         * @returns {Function} Returns the new curry function.
         */
        function createCurry(flag) {
          function curryFunc(func, arity, guard) {
            if (guard && isIterateeCall(func, arity, guard)) {
              arity = null;
            }
            var result = createWrapper(func, flag, null, null, null, null, null, arity);
            result.placeholder = curryFunc.placeholder;
            return result;
          }
          return curryFunc;
        }
    
        /**
         * Creates a `_.max` or `_.min` function.
         *
         * @private
         * @param {Function} comparator The function used to compare values.
         * @param {*} exValue The initial extremum value.
         * @returns {Function} Returns the new extremum function.
         */
        function createExtremum(comparator, exValue) {
          return function(collection, iteratee, thisArg) {
            if (thisArg && isIterateeCall(collection, iteratee, thisArg)) {
              iteratee = null;
            }
            iteratee = getCallback(iteratee, thisArg, 3);
            if (iteratee.length == 1) {
              collection = toIterable(collection);
              var result = arrayExtremum(collection, iteratee, comparator, exValue);
              if (!(collection.length && result === exValue)) {
                return result;
              }
            }
            return baseExtremum(collection, iteratee, comparator, exValue);
          };
        }
    
        /**
         * Creates a `_.find` or `_.findLast` function.
         *
         * @private
         * @param {Function} eachFunc The function to iterate over a collection.
         * @param {boolean} [fromRight] Specify iterating from right to left.
         * @returns {Function} Returns the new find function.
         */
        function createFind(eachFunc, fromRight) {
          return function(collection, predicate, thisArg) {
            predicate = getCallback(predicate, thisArg, 3);
            if (isArray(collection)) {
              var index = baseFindIndex(collection, predicate, fromRight);
              return index > -1 ? collection[index] : undefined;
            }
            return baseFind(collection, predicate, eachFunc);
          };
        }
    
        /**
         * Creates a `_.findIndex` or `_.findLastIndex` function.
         *
         * @private
         * @param {boolean} [fromRight] Specify iterating from right to left.
         * @returns {Function} Returns the new find function.
         */
        function createFindIndex(fromRight) {
          return function(array, predicate, thisArg) {
            if (!(array && array.length)) {
              return -1;
            }
            predicate = getCallback(predicate, thisArg, 3);
            return baseFindIndex(array, predicate, fromRight);
          };
        }
    
        /**
         * Creates a `_.findKey` or `_.findLastKey` function.
         *
         * @private
         * @param {Function} objectFunc The function to iterate over an object.
         * @returns {Function} Returns the new find function.
         */
        function createFindKey(objectFunc) {
          return function(object, predicate, thisArg) {
            predicate = getCallback(predicate, thisArg, 3);
            return baseFind(object, predicate, objectFunc, true);
          };
        }
    
        /**
         * Creates a `_.flow` or `_.flowRight` function.
         *
         * @private
         * @param {boolean} [fromRight] Specify iterating from right to left.
         * @returns {Function} Returns the new flow function.
         */
        function createFlow(fromRight) {
          return function() {
            var wrapper,
                length = arguments.length,
                index = fromRight ? length : -1,
                leftIndex = 0,
                funcs = Array(length);
    
            while ((fromRight ? index-- : ++index < length)) {
              var func = funcs[leftIndex++] = arguments[index];
              if (typeof func != 'function') {
                throw new TypeError(FUNC_ERROR_TEXT);
              }
              if (!wrapper && LodashWrapper.prototype.thru && getFuncName(func) == 'wrapper') {
                wrapper = new LodashWrapper([]);
              }
            }
            index = wrapper ? -1 : length;
            while (++index < length) {
              func = funcs[index];
    
              var funcName = getFuncName(func),
                  data = funcName == 'wrapper' ? getData(func) : null;
    
              if (data && isLaziable(data[0]) && data[1] == (ARY_FLAG | CURRY_FLAG | PARTIAL_FLAG | REARG_FLAG) && !data[4].length && data[9] == 1) {
                wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
              } else {
                wrapper = (func.length == 1 && isLaziable(func)) ? wrapper[funcName]() : wrapper.thru(func);
              }
            }
            return function() {
              var args = arguments;
              if (wrapper && args.length == 1 && isArray(args[0])) {
                return wrapper.plant(args[0]).value();
              }
              var index = 0,
                  result = length ? funcs[index].apply(this, args) : args[0];
    
              while (++index < length) {
                result = funcs[index].call(this, result);
              }
              return result;
            };
          };
        }
    
        /**
         * Creates a function for `_.forEach` or `_.forEachRight`.
         *
         * @private
         * @param {Function} arrayFunc The function to iterate over an array.
         * @param {Function} eachFunc The function to iterate over a collection.
         * @returns {Function} Returns the new each function.
         */
        function createForEach(arrayFunc, eachFunc) {
          return function(collection, iteratee, thisArg) {
            return (typeof iteratee == 'function' && thisArg === undefined && isArray(collection))
              ? arrayFunc(collection, iteratee)
              : eachFunc(collection, bindCallback(iteratee, thisArg, 3));
          };
        }
    
        /**
         * Creates a function for `_.forIn` or `_.forInRight`.
         *
         * @private
         * @param {Function} objectFunc The function to iterate over an object.
         * @returns {Function} Returns the new each function.
         */
        function createForIn(objectFunc) {
          return function(object, iteratee, thisArg) {
            if (typeof iteratee != 'function' || thisArg !== undefined) {
              iteratee = bindCallback(iteratee, thisArg, 3);
            }
            return objectFunc(object, iteratee, keysIn);
          };
        }
    
        /**
         * Creates a function for `_.forOwn` or `_.forOwnRight`.
         *
         * @private
         * @param {Function} objectFunc The function to iterate over an object.
         * @returns {Function} Returns the new each function.
         */
        function createForOwn(objectFunc) {
          return function(object, iteratee, thisArg) {
            if (typeof iteratee != 'function' || thisArg !== undefined) {
              iteratee = bindCallback(iteratee, thisArg, 3);
            }
            return objectFunc(object, iteratee);
          };
        }
    
        /**
         * Creates a function for `_.mapKeys` or `_.mapValues`.
         *
         * @private
         * @param {boolean} [isMapKeys] Specify mapping keys instead of values.
         * @returns {Function} Returns the new map function.
         */
        function createObjectMapper(isMapKeys) {
          return function(object, iteratee, thisArg) {
            var result = {};
            iteratee = getCallback(iteratee, thisArg, 3);
    
            baseForOwn(object, function(value, key, object) {
              var mapped = iteratee(value, key, object);
              key = isMapKeys ? mapped : key;
              value = isMapKeys ? value : mapped;
              result[key] = value;
            });
            return result;
          };
        }
    
        /**
         * Creates a function for `_.padLeft` or `_.padRight`.
         *
         * @private
         * @param {boolean} [fromRight] Specify padding from the right.
         * @returns {Function} Returns the new pad function.
         */
        function createPadDir(fromRight) {
          return function(string, length, chars) {
            string = baseToString(string);
            return (fromRight ? string : '') + createPadding(string, length, chars) + (fromRight ? '' : string);
          };
        }
    
        /**
         * Creates a `_.partial` or `_.partialRight` function.
         *
         * @private
         * @param {boolean} flag The partial bit flag.
         * @returns {Function} Returns the new partial function.
         */
        function createPartial(flag) {
          var partialFunc = restParam(function(func, partials) {
            var holders = replaceHolders(partials, partialFunc.placeholder);
            return createWrapper(func, flag, null, partials, holders);
          });
          return partialFunc;
        }
    
        /**
         * Creates a function for `_.reduce` or `_.reduceRight`.
         *
         * @private
         * @param {Function} arrayFunc The function to iterate over an array.
         * @param {Function} eachFunc The function to iterate over a collection.
         * @returns {Function} Returns the new each function.
         */
        function createReduce(arrayFunc, eachFunc) {
          return function(collection, iteratee, accumulator, thisArg) {
            var initFromArray = arguments.length < 3;
            return (typeof iteratee == 'function' && thisArg === undefined && isArray(collection))
              ? arrayFunc(collection, iteratee, accumulator, initFromArray)
              : baseReduce(collection, getCallback(iteratee, thisArg, 4), accumulator, initFromArray, eachFunc);
          };
        }
    
        /**
         * Creates a function that wraps `func` and invokes it with optional `this`
         * binding of, partial application, and currying.
         *
         * @private
         * @param {Function|string} func The function or method name to reference.
         * @param {number} bitmask The bitmask of flags. See `createWrapper` for more details.
         * @param {*} [thisArg] The `this` binding of `func`.
         * @param {Array} [partials] The arguments to prepend to those provided to the new function.
         * @param {Array} [holders] The `partials` placeholder indexes.
         * @param {Array} [partialsRight] The arguments to append to those provided to the new function.
         * @param {Array} [holdersRight] The `partialsRight` placeholder indexes.
         * @param {Array} [argPos] The argument positions of the new function.
         * @param {number} [ary] The arity cap of `func`.
         * @param {number} [arity] The arity of `func`.
         * @returns {Function} Returns the new wrapped function.
         */
        function createHybridWrapper(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
          var isAry = bitmask & ARY_FLAG,
              isBind = bitmask & BIND_FLAG,
              isBindKey = bitmask & BIND_KEY_FLAG,
              isCurry = bitmask & CURRY_FLAG,
              isCurryBound = bitmask & CURRY_BOUND_FLAG,
              isCurryRight = bitmask & CURRY_RIGHT_FLAG,
              Ctor = isBindKey ? null : createCtorWrapper(func);
    
          function wrapper() {
            // Avoid `arguments` object use disqualifying optimizations by
            // converting it to an array before providing it to other functions.
            var length = arguments.length,
                index = length,
                args = Array(length);
    
            while (index--) {
              args[index] = arguments[index];
            }
            if (partials) {
              args = composeArgs(args, partials, holders);
            }
            if (partialsRight) {
              args = composeArgsRight(args, partialsRight, holdersRight);
            }
            if (isCurry || isCurryRight) {
              var placeholder = wrapper.placeholder,
                  argsHolders = replaceHolders(args, placeholder);
    
              length -= argsHolders.length;
              if (length < arity) {
                var newArgPos = argPos ? arrayCopy(argPos) : null,
                    newArity = nativeMax(arity - length, 0),
                    newsHolders = isCurry ? argsHolders : null,
                    newHoldersRight = isCurry ? null : argsHolders,
                    newPartials = isCurry ? args : null,
                    newPartialsRight = isCurry ? null : args;
    
                bitmask |= (isCurry ? PARTIAL_FLAG : PARTIAL_RIGHT_FLAG);
                bitmask &= ~(isCurry ? PARTIAL_RIGHT_FLAG : PARTIAL_FLAG);
    
                if (!isCurryBound) {
                  bitmask &= ~(BIND_FLAG | BIND_KEY_FLAG);
                }
                var newData = [func, bitmask, thisArg, newPartials, newsHolders, newPartialsRight, newHoldersRight, newArgPos, ary, newArity],
                    result = createHybridWrapper.apply(undefined, newData);
    
                if (isLaziable(func)) {
                  setData(result, newData);
                }
                result.placeholder = placeholder;
                return result;
              }
            }
            var thisBinding = isBind ? thisArg : this,
                fn = isBindKey ? thisBinding[func] : func;
    
            if (argPos) {
              args = reorder(args, argPos);
            }
            if (isAry && ary < args.length) {
              args.length = ary;
            }
            if (this && this !== root && this instanceof wrapper) {
              fn = Ctor || createCtorWrapper(func);
            }
            return fn.apply(thisBinding, args);
          }
          return wrapper;
        }
    
        /**
         * Creates the padding required for `string` based on the given `length`.
         * The `chars` string is truncated if the number of characters exceeds `length`.
         *
         * @private
         * @param {string} string The string to create padding for.
         * @param {number} [length=0] The padding length.
         * @param {string} [chars=' '] The string used as padding.
         * @returns {string} Returns the pad for `string`.
         */
        function createPadding(string, length, chars) {
          var strLength = string.length;
          length = +length;
    
          if (strLength >= length || !nativeIsFinite(length)) {
            return '';
          }
          var padLength = length - strLength;
          chars = chars == null ? ' ' : (chars + '');
          return repeat(chars, ceil(padLength / chars.length)).slice(0, padLength);
        }
    
        /**
         * Creates a function that wraps `func` and invokes it with the optional `this`
         * binding of `thisArg` and the `partials` prepended to those provided to
         * the wrapper.
         *
         * @private
         * @param {Function} func The function to partially apply arguments to.
         * @param {number} bitmask The bitmask of flags. See `createWrapper` for more details.
         * @param {*} thisArg The `this` binding of `func`.
         * @param {Array} partials The arguments to prepend to those provided to the new function.
         * @returns {Function} Returns the new bound function.
         */
        function createPartialWrapper(func, bitmask, thisArg, partials) {
          var isBind = bitmask & BIND_FLAG,
              Ctor = createCtorWrapper(func);
    
          function wrapper() {
            // Avoid `arguments` object use disqualifying optimizations by
            // converting it to an array before providing it `func`.
            var argsIndex = -1,
                argsLength = arguments.length,
                leftIndex = -1,
                leftLength = partials.length,
                args = Array(argsLength + leftLength);
    
            while (++leftIndex < leftLength) {
              args[leftIndex] = partials[leftIndex];
            }
            while (argsLength--) {
              args[leftIndex++] = arguments[++argsIndex];
            }
            var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
            return fn.apply(isBind ? thisArg : this, args);
          }
          return wrapper;
        }
    
        /**
         * Creates a `_.sortedIndex` or `_.sortedLastIndex` function.
         *
         * @private
         * @param {boolean} [retHighest] Specify returning the highest qualified index.
         * @returns {Function} Returns the new index function.
         */
        function createSortedIndex(retHighest) {
          return function(array, value, iteratee, thisArg) {
            var callback = getCallback(iteratee);
            return (iteratee == null && callback === baseCallback)
              ? binaryIndex(array, value, retHighest)
              : binaryIndexBy(array, value, callback(iteratee, thisArg, 1), retHighest);
          };
        }
    
        /**
         * Creates a function that either curries or invokes `func` with optional
         * `this` binding and partially applied arguments.
         *
         * @private
         * @param {Function|string} func The function or method name to reference.
         * @param {number} bitmask The bitmask of flags.
         *  The bitmask may be composed of the following flags:
         *     1 - `_.bind`
         *     2 - `_.bindKey`
         *     4 - `_.curry` or `_.curryRight` of a bound function
         *     8 - `_.curry`
         *    16 - `_.curryRight`
         *    32 - `_.partial`
         *    64 - `_.partialRight`
         *   128 - `_.rearg`
         *   256 - `_.ary`
         * @param {*} [thisArg] The `this` binding of `func`.
         * @param {Array} [partials] The arguments to be partially applied.
         * @param {Array} [holders] The `partials` placeholder indexes.
         * @param {Array} [argPos] The argument positions of the new function.
         * @param {number} [ary] The arity cap of `func`.
         * @param {number} [arity] The arity of `func`.
         * @returns {Function} Returns the new wrapped function.
         */
        function createWrapper(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
          var isBindKey = bitmask & BIND_KEY_FLAG;
          if (!isBindKey && typeof func != 'function') {
            throw new TypeError(FUNC_ERROR_TEXT);
          }
          var length = partials ? partials.length : 0;
          if (!length) {
            bitmask &= ~(PARTIAL_FLAG | PARTIAL_RIGHT_FLAG);
            partials = holders = null;
          }
          length -= (holders ? holders.length : 0);
          if (bitmask & PARTIAL_RIGHT_FLAG) {
            var partialsRight = partials,
                holdersRight = holders;
    
            partials = holders = null;
          }
          var data = isBindKey ? null : getData(func),
              newData = [func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity];
    
          if (data) {
            mergeData(newData, data);
            bitmask = newData[1];
            arity = newData[9];
          }
          newData[9] = arity == null
            ? (isBindKey ? 0 : func.length)
            : (nativeMax(arity - length, 0) || 0);
    
          if (bitmask == BIND_FLAG) {
            var result = createBindWrapper(newData[0], newData[2]);
          } else if ((bitmask == PARTIAL_FLAG || bitmask == (BIND_FLAG | PARTIAL_FLAG)) && !newData[4].length) {
            result = createPartialWrapper.apply(undefined, newData);
          } else {
            result = createHybridWrapper.apply(undefined, newData);
          }
          var setter = data ? baseSetData : setData;
          return setter(result, newData);
        }
    
        /**
         * A specialized version of `baseIsEqualDeep` for arrays with support for
         * partial deep comparisons.
         *
         * @private
         * @param {Array} array The array to compare.
         * @param {Array} other The other array to compare.
         * @param {Function} equalFunc The function to determine equivalents of values.
         * @param {Function} [customizer] The function to customize comparing arrays.
         * @param {boolean} [isLoose] Specify performing partial comparisons.
         * @param {Array} [stackA] Tracks traversed `value` objects.
         * @param {Array} [stackB] Tracks traversed `other` objects.
         * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
         */
        function equalArrays(array, other, equalFunc, customizer, isLoose, stackA, stackB) {
          var index = -1,
              arrLength = array.length,
              othLength = other.length;
    
          if (arrLength != othLength && !(isLoose && othLength > arrLength)) {
            return false;
          }
          // Ignore non-index properties.
          while (++index < arrLength) {
            var arrValue = array[index],
                othValue = other[index],
                result = customizer ? customizer(isLoose ? othValue : arrValue, isLoose ? arrValue : othValue, index) : undefined;
    
            if (result !== undefined) {
              if (result) {
                continue;
              }
              return false;
            }
            // Recursively compare arrays (susceptible to call stack limits).
            if (isLoose) {
              if (!arraySome(other, function(othValue) {
                    return arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB);
                  })) {
                return false;
              }
            } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB))) {
              return false;
            }
          }
          return true;
        }
    
        /**
         * A specialized version of `baseIsEqualDeep` for comparing objects of
         * the same `toStringTag`.
         *
         * **Note:** This function only supports comparing values with tags of
         * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
         *
         * @private
         * @param {Object} value The object to compare.
         * @param {Object} other The other object to compare.
         * @param {string} tag The `toStringTag` of the objects to compare.
         * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
         */
        function equalByTag(object, other, tag) {
          switch (tag) {
            case boolTag:
            case dateTag:
              // Coerce dates and booleans to numbers, dates to milliseconds and booleans
              // to `1` or `0` treating invalid dates coerced to `NaN` as not equal.
              return +object == +other;
    
            case errorTag:
              return object.name == other.name && object.message == other.message;
    
            case numberTag:
              // Treat `NaN` vs. `NaN` as equal.
              return (object != +object)
                ? other != +other
                : object == +other;
    
            case regexpTag:
            case stringTag:
              // Coerce regexes to strings and treat strings primitives and string
              // objects as equal. See https://es5.github.io/#x15.10.6.4 for more details.
              return object == (other + '');
          }
          return false;
        }
    
        /**
         * A specialized version of `baseIsEqualDeep` for objects with support for
         * partial deep comparisons.
         *
         * @private
         * @param {Object} object The object to compare.
         * @param {Object} other The other object to compare.
         * @param {Function} equalFunc The function to determine equivalents of values.
         * @param {Function} [customizer] The function to customize comparing values.
         * @param {boolean} [isLoose] Specify performing partial comparisons.
         * @param {Array} [stackA] Tracks traversed `value` objects.
         * @param {Array} [stackB] Tracks traversed `other` objects.
         * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
         */
        function equalObjects(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
          var objProps = keys(object),
              objLength = objProps.length,
              othProps = keys(other),
              othLength = othProps.length;
    
          if (objLength != othLength && !isLoose) {
            return false;
          }
          var index = objLength;
          while (index--) {
            var key = objProps[index];
            if (!(isLoose ? key in other : hasOwnProperty.call(other, key))) {
              return false;
            }
          }
          var skipCtor = isLoose;
          while (++index < objLength) {
            key = objProps[index];
            var objValue = object[key],
                othValue = other[key],
                result = customizer ? customizer(isLoose ? othValue : objValue, isLoose? objValue : othValue, key) : undefined;
    
            // Recursively compare objects (susceptible to call stack limits).
            if (!(result === undefined ? equalFunc(objValue, othValue, customizer, isLoose, stackA, stackB) : result)) {
              return false;
            }
            skipCtor || (skipCtor = key == 'constructor');
          }
          if (!skipCtor) {
            var objCtor = object.constructor,
                othCtor = other.constructor;
    
            // Non `Object` object instances with different constructors are not equal.
            if (objCtor != othCtor &&
                ('constructor' in object && 'constructor' in other) &&
                !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
                  typeof othCtor == 'function' && othCtor instanceof othCtor)) {
              return false;
            }
          }
          return true;
        }
    
        /**
         * Gets the appropriate "callback" function. If the `_.callback` method is
         * customized this function returns the custom method, otherwise it returns
         * the `baseCallback` function. If arguments are provided the chosen function
         * is invoked with them and its result is returned.
         *
         * @private
         * @returns {Function} Returns the chosen function or its result.
         */
        function getCallback(func, thisArg, argCount) {
          var result = lodash.callback || callback;
          result = result === callback ? baseCallback : result;
          return argCount ? result(func, thisArg, argCount) : result;
        }
    
        /**
         * Gets metadata for `func`.
         *
         * @private
         * @param {Function} func The function to query.
         * @returns {*} Returns the metadata for `func`.
         */
        var getData = !metaMap ? noop : function(func) {
          return metaMap.get(func);
        };
    
        /**
         * Gets the name of `func`.
         *
         * @private
         * @param {Function} func The function to query.
         * @returns {string} Returns the function name.
         */
        function getFuncName(func) {
          var result = func.name,
              array = realNames[result],
              length = array ? array.length : 0;
    
          while (length--) {
            var data = array[length],
                otherFunc = data.func;
            if (otherFunc == null || otherFunc == func) {
              return data.name;
            }
          }
          return result;
        }
    
        /**
         * Gets the appropriate "indexOf" function. If the `_.indexOf` method is
         * customized this function returns the custom method, otherwise it returns
         * the `baseIndexOf` function. If arguments are provided the chosen function
         * is invoked with them and its result is returned.
         *
         * @private
         * @returns {Function|number} Returns the chosen function or its result.
         */
        function getIndexOf(collection, target, fromIndex) {
          var result = lodash.indexOf || indexOf;
          result = result === indexOf ? baseIndexOf : result;
          return collection ? result(collection, target, fromIndex) : result;
        }
    
        /**
         * Gets the "length" property value of `object`.
         *
         * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
         * that affects Safari on at least iOS 8.1-8.3 ARM64.
         *
         * @private
         * @param {Object} object The object to query.
         * @returns {*} Returns the "length" value.
         */
        var getLength = baseProperty('length');
    
        /**
         * Gets the propery names, values, and compare flags of `object`.
         *
         * @private
         * @param {Object} object The object to query.
         * @returns {Array} Returns the match data of `object`.
         */
        function getMatchData(object) {
          var result = pairs(object),
              length = result.length;
    
          while (length--) {
            result[length][2] = isStrictComparable(result[length][1]);
          }
          return result;
        }
    
        /**
         * Gets the native function at `key` of `object`.
         *
         * @private
         * @param {Object} object The object to query.
         * @param {string} key The key of the method to get.
         * @returns {*} Returns the function if it's native, else `undefined`.
         */
        function getNative(object, key) {
          var value = object == null ? undefined : object[key];
          return isNative(value) ? value : undefined;
        }
    
        /**
         * Gets the view, applying any `transforms` to the `start` and `end` positions.
         *
         * @private
         * @param {number} start The start of the view.
         * @param {number} end The end of the view.
         * @param {Array} [transforms] The transformations to apply to the view.
         * @returns {Object} Returns an object containing the `start` and `end`
         *  positions of the view.
         */
        function getView(start, end, transforms) {
          var index = -1,
              length = transforms ? transforms.length : 0;
    
          while (++index < length) {
            var data = transforms[index],
                size = data.size;
    
            switch (data.type) {
              case 'drop':      start += size; break;
              case 'dropRight': end -= size; break;
              case 'take':      end = nativeMin(end, start + size); break;
              case 'takeRight': start = nativeMax(start, end - size); break;
            }
          }
          return { 'start': start, 'end': end };
        }
    
        /**
         * Initializes an array clone.
         *
         * @private
         * @param {Array} array The array to clone.
         * @returns {Array} Returns the initialized clone.
         */
        function initCloneArray(array) {
          var length = array.length,
              result = new array.constructor(length);
    
          // Add array properties assigned by `RegExp#exec`.
          if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
            result.index = array.index;
            result.input = array.input;
          }
          return result;
        }
    
        /**
         * Initializes an object clone.
         *
         * @private
         * @param {Object} object The object to clone.
         * @returns {Object} Returns the initialized clone.
         */
        function initCloneObject(object) {
          var Ctor = object.constructor;
          if (!(typeof Ctor == 'function' && Ctor instanceof Ctor)) {
            Ctor = Object;
          }
          return new Ctor;
        }
    
        /**
         * Initializes an object clone based on its `toStringTag`.
         *
         * **Note:** This function only supports cloning values with tags of
         * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
         *
         * @private
         * @param {Object} object The object to clone.
         * @param {string} tag The `toStringTag` of the object to clone.
         * @param {boolean} [isDeep] Specify a deep clone.
         * @returns {Object} Returns the initialized clone.
         */
        function initCloneByTag(object, tag, isDeep) {
          var Ctor = object.constructor;
          switch (tag) {
            case arrayBufferTag:
              return bufferClone(object);
    
            case boolTag:
            case dateTag:
              return new Ctor(+object);
    
            case float32Tag: case float64Tag:
            case int8Tag: case int16Tag: case int32Tag:
            case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
              var buffer = object.buffer;
              return new Ctor(isDeep ? bufferClone(buffer) : buffer, object.byteOffset, object.length);
    
            case numberTag:
            case stringTag:
              return new Ctor(object);
    
            case regexpTag:
              var result = new Ctor(object.source, reFlags.exec(object));
              result.lastIndex = object.lastIndex;
          }
          return result;
        }
    
        /**
         * Invokes the method at `path` on `object`.
         *
         * @private
         * @param {Object} object The object to query.
         * @param {Array|string} path The path of the method to invoke.
         * @param {Array} args The arguments to invoke the method with.
         * @returns {*} Returns the result of the invoked method.
         */
        function invokePath(object, path, args) {
          if (object != null && !isKey(path, object)) {
            path = toPath(path);
            object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
            path = last(path);
          }
          var func = object == null ? object : object[path];
          return func == null ? undefined : func.apply(object, args);
        }
    
        /**
         * Checks if `value` is array-like.
         *
         * @private
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
         */
        function isArrayLike(value) {
          return value != null && isLength(getLength(value));
        }
    
        /**
         * Checks if `value` is a valid array-like index.
         *
         * @private
         * @param {*} value The value to check.
         * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
         * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
         */
        function isIndex(value, length) {
          value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
          length = length == null ? MAX_SAFE_INTEGER : length;
          return value > -1 && value % 1 == 0 && value < length;
        }
    
        /**
         * Checks if the provided arguments are from an iteratee call.
         *
         * @private
         * @param {*} value The potential iteratee value argument.
         * @param {*} index The potential iteratee index or key argument.
         * @param {*} object The potential iteratee object argument.
         * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
         */
        function isIterateeCall(value, index, object) {
          if (!isObject(object)) {
            return false;
          }
          var type = typeof index;
          if (type == 'number'
              ? (isArrayLike(object) && isIndex(index, object.length))
              : (type == 'string' && index in object)) {
            var other = object[index];
            return value === value ? (value === other) : (other !== other);
          }
          return false;
        }
    
        /**
         * Checks if `value` is a property name and not a property path.
         *
         * @private
         * @param {*} value The value to check.
         * @param {Object} [object] The object to query keys on.
         * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
         */
        function isKey(value, object) {
          var type = typeof value;
          if ((type == 'string' && reIsPlainProp.test(value)) || type == 'number') {
            return true;
          }
          if (isArray(value)) {
            return false;
          }
          var result = !reIsDeepProp.test(value);
          return result || (object != null && value in toObject(object));
        }
    
        /**
         * Checks if `func` has a lazy counterpart.
         *
         * @private
         * @param {Function} func The function to check.
         * @returns {boolean} Returns `true` if `func` has a lazy counterpart, else `false`.
         */
        function isLaziable(func) {
          var funcName = getFuncName(func);
          if (!(funcName in LazyWrapper.prototype)) {
            return false;
          }
          var other = lodash[funcName];
          if (func === other) {
            return true;
          }
          var data = getData(other);
          return !!data && func === data[0];
        }
    
        /**
         * Checks if `value` is a valid array-like length.
         *
         * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
         *
         * @private
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
         */
        function isLength(value) {
          return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
        }
    
        /**
         * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
         *
         * @private
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` if suitable for strict
         *  equality comparisons, else `false`.
         */
        function isStrictComparable(value) {
          return value === value && !isObject(value);
        }
    
        /**
         * Merges the function metadata of `source` into `data`.
         *
         * Merging metadata reduces the number of wrappers required to invoke a function.
         * This is possible because methods like `_.bind`, `_.curry`, and `_.partial`
         * may be applied regardless of execution order. Methods like `_.ary` and `_.rearg`
         * augment function arguments, making the order in which they are executed important,
         * preventing the merging of metadata. However, we make an exception for a safe
         * common case where curried functions have `_.ary` and or `_.rearg` applied.
         *
         * @private
         * @param {Array} data The destination metadata.
         * @param {Array} source The source metadata.
         * @returns {Array} Returns `data`.
         */
        function mergeData(data, source) {
          var bitmask = data[1],
              srcBitmask = source[1],
              newBitmask = bitmask | srcBitmask,
              isCommon = newBitmask < ARY_FLAG;
    
          var isCombo =
            (srcBitmask == ARY_FLAG && bitmask == CURRY_FLAG) ||
            (srcBitmask == ARY_FLAG && bitmask == REARG_FLAG && data[7].length <= source[8]) ||
            (srcBitmask == (ARY_FLAG | REARG_FLAG) && bitmask == CURRY_FLAG);
    
          // Exit early if metadata can't be merged.
          if (!(isCommon || isCombo)) {
            return data;
          }
          // Use source `thisArg` if available.
          if (srcBitmask & BIND_FLAG) {
            data[2] = source[2];
            // Set when currying a bound function.
            newBitmask |= (bitmask & BIND_FLAG) ? 0 : CURRY_BOUND_FLAG;
          }
          // Compose partial arguments.
          var value = source[3];
          if (value) {
            var partials = data[3];
            data[3] = partials ? composeArgs(partials, value, source[4]) : arrayCopy(value);
            data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : arrayCopy(source[4]);
          }
          // Compose partial right arguments.
          value = source[5];
          if (value) {
            partials = data[5];
            data[5] = partials ? composeArgsRight(partials, value, source[6]) : arrayCopy(value);
            data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : arrayCopy(source[6]);
          }
          // Use source `argPos` if available.
          value = source[7];
          if (value) {
            data[7] = arrayCopy(value);
          }
          // Use source `ary` if it's smaller.
          if (srcBitmask & ARY_FLAG) {
            data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
          }
          // Use source `arity` if one is not provided.
          if (data[9] == null) {
            data[9] = source[9];
          }
          // Use source `func` and merge bitmasks.
          data[0] = source[0];
          data[1] = newBitmask;
    
          return data;
        }
    
        /**
         * A specialized version of `_.pick` which picks `object` properties specified
         * by `props`.
         *
         * @private
         * @param {Object} object The source object.
         * @param {string[]} props The property names to pick.
         * @returns {Object} Returns the new object.
         */
        function pickByArray(object, props) {
          object = toObject(object);
    
          var index = -1,
              length = props.length,
              result = {};
    
          while (++index < length) {
            var key = props[index];
            if (key in object) {
              result[key] = object[key];
            }
          }
          return result;
        }
    
        /**
         * A specialized version of `_.pick` which picks `object` properties `predicate`
         * returns truthy for.
         *
         * @private
         * @param {Object} object The source object.
         * @param {Function} predicate The function invoked per iteration.
         * @returns {Object} Returns the new object.
         */
        function pickByCallback(object, predicate) {
          var result = {};
          baseForIn(object, function(value, key, object) {
            if (predicate(value, key, object)) {
              result[key] = value;
            }
          });
          return result;
        }
    
        /**
         * Reorder `array` according to the specified indexes where the element at
         * the first index is assigned as the first element, the element at
         * the second index is assigned as the second element, and so on.
         *
         * @private
         * @param {Array} array The array to reorder.
         * @param {Array} indexes The arranged array indexes.
         * @returns {Array} Returns `array`.
         */
        function reorder(array, indexes) {
          var arrLength = array.length,
              length = nativeMin(indexes.length, arrLength),
              oldArray = arrayCopy(array);
    
          while (length--) {
            var index = indexes[length];
            array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined;
          }
          return array;
        }
    
        /**
         * Sets metadata for `func`.
         *
         * **Note:** If this function becomes hot, i.e. is invoked a lot in a short
         * period of time, it will trip its breaker and transition to an identity function
         * to avoid garbage collection pauses in V8. See [V8 issue 2070](https://code.google.com/p/v8/issues/detail?id=2070)
         * for more details.
         *
         * @private
         * @param {Function} func The function to associate metadata with.
         * @param {*} data The metadata.
         * @returns {Function} Returns `func`.
         */
        var setData = (function() {
          var count = 0,
              lastCalled = 0;
    
          return function(key, value) {
            var stamp = now(),
                remaining = HOT_SPAN - (stamp - lastCalled);
    
            lastCalled = stamp;
            if (remaining > 0) {
              if (++count >= HOT_COUNT) {
                return key;
              }
            } else {
              count = 0;
            }
            return baseSetData(key, value);
          };
        }());
    
        /**
         * A fallback implementation of `_.isPlainObject` which checks if `value`
         * is an object created by the `Object` constructor or has a `[[Prototype]]`
         * of `null`.
         *
         * @private
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
         */
        function shimIsPlainObject(value) {
          var Ctor,
              support = lodash.support;
    
          // Exit early for non `Object` objects.
          if (!(isObjectLike(value) && objToString.call(value) == objectTag) ||
              (!hasOwnProperty.call(value, 'constructor') &&
                (Ctor = value.constructor, typeof Ctor == 'function' && !(Ctor instanceof Ctor)))) {
            return false;
          }
          // IE < 9 iterates inherited properties before own properties. If the first
          // iterated property is an object's own property then there are no inherited
          // enumerable properties.
          var result;
          // In most environments an object's own properties are iterated before
          // its inherited properties. If the last iterated property is an object's
          // own property then there are no inherited enumerable properties.
          baseForIn(value, function(subValue, key) {
            result = key;
          });
          return result === undefined || hasOwnProperty.call(value, result);
        }
    
        /**
         * A fallback implementation of `Object.keys` which creates an array of the
         * own enumerable property names of `object`.
         *
         * @private
         * @param {Object} object The object to query.
         * @returns {Array} Returns the array of property names.
         */
        function shimKeys(object) {
          var props = keysIn(object),
              propsLength = props.length,
              length = propsLength && object.length;
    
          var allowIndexes = !!length && isLength(length) &&
            (isArray(object) || isArguments(object));
    
          var index = -1,
              result = [];
    
          while (++index < propsLength) {
            var key = props[index];
            if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
              result.push(key);
            }
          }
          return result;
        }
    
        /**
         * Converts `value` to an array-like object if it's not one.
         *
         * @private
         * @param {*} value The value to process.
         * @returns {Array|Object} Returns the array-like object.
         */
        function toIterable(value) {
          if (value == null) {
            return [];
          }
          if (!isArrayLike(value)) {
            return values(value);
          }
          return isObject(value) ? value : Object(value);
        }
    
        /**
         * Converts `value` to an object if it's not one.
         *
         * @private
         * @param {*} value The value to process.
         * @returns {Object} Returns the object.
         */
        function toObject(value) {
          return isObject(value) ? value : Object(value);
        }
    
        /**
         * Converts `value` to property path array if it's not one.
         *
         * @private
         * @param {*} value The value to process.
         * @returns {Array} Returns the property path array.
         */
        function toPath(value) {
          if (isArray(value)) {
            return value;
          }
          var result = [];
          baseToString(value).replace(rePropName, function(match, number, quote, string) {
            result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
          });
          return result;
        }
    
        /**
         * Creates a clone of `wrapper`.
         *
         * @private
         * @param {Object} wrapper The wrapper to clone.
         * @returns {Object} Returns the cloned wrapper.
         */
        function wrapperClone(wrapper) {
          return wrapper instanceof LazyWrapper
            ? wrapper.clone()
            : new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__, arrayCopy(wrapper.__actions__));
        }
    
        /*------------------------------------------------------------------------*/
    
        /**
         * Creates an array of elements split into groups the length of `size`.
         * If `collection` can't be split evenly, the final chunk will be the remaining
         * elements.
         *
         * @static
         * @memberOf _
         * @category Array
         * @param {Array} array The array to process.
         * @param {number} [size=1] The length of each chunk.
         * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
         * @returns {Array} Returns the new array containing chunks.
         * @example
         *
         * _.chunk(['a', 'b', 'c', 'd'], 2);
         * // => [['a', 'b'], ['c', 'd']]
         *
         * _.chunk(['a', 'b', 'c', 'd'], 3);
         * // => [['a', 'b', 'c'], ['d']]
         */
        function chunk(array, size, guard) {
          if (guard ? isIterateeCall(array, size, guard) : size == null) {
            size = 1;
          } else {
            size = nativeMax(+size || 1, 1);
          }
          var index = 0,
              length = array ? array.length : 0,
              resIndex = -1,
              result = Array(ceil(length / size));
    
          while (index < length) {
            result[++resIndex] = baseSlice(array, index, (index += size));
          }
          return result;
        }
    
        /**
         * Creates an array with all falsey values removed. The values `false`, `null`,
         * `0`, `""`, `undefined`, and `NaN` are falsey.
         *
         * @static
         * @memberOf _
         * @category Array
         * @param {Array} array The array to compact.
         * @returns {Array} Returns the new array of filtered values.
         * @example
         *
         * _.compact([0, 1, false, 2, '', 3]);
         * // => [1, 2, 3]
         */
        function compact(array) {
          var index = -1,
              length = array ? array.length : 0,
              resIndex = -1,
              result = [];
    
          while (++index < length) {
            var value = array[index];
            if (value) {
              result[++resIndex] = value;
            }
          }
          return result;
        }
    
        /**
         * Creates an array of unique `array` values not included in the other
         * provided arrays using [`SameValueZero`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
         * for equality comparisons.
         *
         * @static
         * @memberOf _
         * @category Array
         * @param {Array} array The array to inspect.
         * @param {...Array} [values] The arrays of values to exclude.
         * @returns {Array} Returns the new array of filtered values.
         * @example
         *
         * _.difference([1, 2, 3], [4, 2]);
         * // => [1, 3]
         */
        var difference = restParam(function(array, values) {
          return isArrayLike(array)
            ? baseDifference(array, baseFlatten(values, false, true))
            : [];
        });
    
        /**
         * Creates a slice of `array` with `n` elements dropped from the beginning.
         *
         * @static
         * @memberOf _
         * @category Array
         * @param {Array} array The array to query.
         * @param {number} [n=1] The number of elements to drop.
         * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
         * @returns {Array} Returns the slice of `array`.
         * @example
         *
         * _.drop([1, 2, 3]);
         * // => [2, 3]
         *
         * _.drop([1, 2, 3], 2);
         * // => [3]
         *
         * _.drop([1, 2, 3], 5);
         * // => []
         *
         * _.drop([1, 2, 3], 0);
         * // => [1, 2, 3]
         */
        function drop(array, n, guard) {
          var length = array ? array.length : 0;
          if (!length) {
            return [];
          }
          if (guard ? isIterateeCall(array, n, guard) : n == null) {
            n = 1;
          }
          return baseSlice(array, n < 0 ? 0 : n);
        }
    
        /**
         * Creates a slice of `array` with `n` elements dropped from the end.
         *
         * @static
         * @memberOf _
         * @category Array
         * @param {Array} array The array to query.
         * @param {number} [n=1] The number of elements to drop.
         * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
         * @returns {Array} Returns the slice of `array`.
         * @example
         *
         * _.dropRight([1, 2, 3]);
         * // => [1, 2]
         *
         * _.dropRight([1, 2, 3], 2);
         * // => [1]
         *
         * _.dropRight([1, 2, 3], 5);
         * // => []
         *
         * _.dropRight([1, 2, 3], 0);
         * // => [1, 2, 3]
         */
        function dropRight(array, n, guard) {
          var length = array ? array.length : 0;
          if (!length) {
            return [];
          }
          if (guard ? isIterateeCall(array, n, guard) : n == null) {
            n = 1;
          }
          n = length - (+n || 0);
          return baseSlice(array, 0, n < 0 ? 0 : n);
        }
    
        /**
         * Creates a slice of `array` excluding elements dropped from the end.
         * Elements are dropped until `predicate` returns falsey. The predicate is
         * bound to `thisArg` and invoked with three arguments: (value, index, array).
         *
         * If a property name is provided for `predicate` the created `_.property`
         * style callback returns the property value of the given element.
         *
         * If a value is also provided for `thisArg` the created `_.matchesProperty`
         * style callback returns `true` for elements that have a matching property
         * value, else `false`.
         *
         * If an object is provided for `predicate` the created `_.matches` style
         * callback returns `true` for elements that match the properties of the given
         * object, else `false`.
         *
         * @static
         * @memberOf _
         * @category Array
         * @param {Array} array The array to query.
         * @param {Function|Object|string} [predicate=_.identity] The function invoked
         *  per iteration.
         * @param {*} [thisArg] The `this` binding of `predicate`.
         * @returns {Array} Returns the slice of `array`.
         * @example
         *
         * _.dropRightWhile([1, 2, 3], function(n) {
         *   return n > 1;
         * });
         * // => [1]
         *
         * var users = [
         *   { 'user': 'barney',  'active': true },
         *   { 'user': 'fred',    'active': false },
         *   { 'user': 'pebbles', 'active': false }
         * ];
         *
         * // using the `_.matches` callback shorthand
         * _.pluck(_.dropRightWhile(users, { 'user': 'pebbles', 'active': false }), 'user');
         * // => ['barney', 'fred']
         *
         * // using the `_.matchesProperty` callback shorthand
         * _.pluck(_.dropRightWhile(users, 'active', false), 'user');
         * // => ['barney']
         *
         * // using the `_.property` callback shorthand
         * _.pluck(_.dropRightWhile(users, 'active'), 'user');
         * // => ['barney', 'fred', 'pebbles']
         */
        function dropRightWhile(array, predicate, thisArg) {
          return (array && array.length)
            ? baseWhile(array, getCallback(predicate, thisArg, 3), true, true)
            : [];
        }
    
        /**
         * Creates a slice of `array` excluding elements dropped from the beginning.
         * Elements are dropped until `predicate` returns falsey. The predicate is
         * bound to `thisArg` and invoked with three arguments: (value, index, array).
         *
         * If a property name is provided for `predicate` the created `_.property`
         * style callback returns the property value of the given element.
         *
         * If a value is also provided for `thisArg` the created `_.matchesProperty`
         * style callback returns `true` for elements that have a matching property
         * value, else `false`.
         *
         * If an object is provided for `predicate` the created `_.matches` style
         * callback returns `true` for elements that have the properties of the given
         * object, else `false`.
         *
         * @static
         * @memberOf _
         * @category Array
         * @param {Array} array The array to query.
         * @param {Function|Object|string} [predicate=_.identity] The function invoked
         *  per iteration.
         * @param {*} [thisArg] The `this` binding of `predicate`.
         * @returns {Array} Returns the slice of `array`.
         * @example
         *
         * _.dropWhile([1, 2, 3], function(n) {
         *   return n < 3;
         * });
         * // => [3]
         *
         * var users = [
         *   { 'user': 'barney',  'active': false },
         *   { 'user': 'fred',    'active': false },
         *   { 'user': 'pebbles', 'active': true }
         * ];
         *
         * // using the `_.matches` callback shorthand
         * _.pluck(_.dropWhile(users, { 'user': 'barney', 'active': false }), 'user');
         * // => ['fred', 'pebbles']
         *
         * // using the `_.matchesProperty` callback shorthand
         * _.pluck(_.dropWhile(users, 'active', false), 'user');
         * // => ['pebbles']
         *
         * // using the `_.property` callback shorthand
         * _.pluck(_.dropWhile(users, 'active'), 'user');
         * // => ['barney', 'fred', 'pebbles']
         */
        function dropWhile(array, predicate, thisArg) {
          return (array && array.length)
            ? baseWhile(array, getCallback(predicate, thisArg, 3), true)
            : [];
        }
    
        /**
         * Fills elements of `array` with `value` from `start` up to, but not
         * including, `end`.
         *
         * **Note:** This method mutates `array`.
         *
         * @static
         * @memberOf _
         * @category Array
         * @param {Array} array The array to fill.
         * @param {*} value The value to fill `array` with.
         * @param {number} [start=0] The start position.
         * @param {number} [end=array.length] The end position.
         * @returns {Array} Returns `array`.
         * @example
         *
         * var array = [1, 2, 3];
         *
         * _.fill(array, 'a');
         * console.log(array);
         * // => ['a', 'a', 'a']
         *
         * _.fill(Array(3), 2);
         * // => [2, 2, 2]
         *
         * _.fill([4, 6, 8], '*', 1, 2);
         * // => [4, '*', 8]
         */
        function fill(array, value, start, end) {
          var length = array ? array.length : 0;
          if (!length) {
            return [];
          }
          if (start && typeof start != 'number' && isIterateeCall(array, value, start)) {
            start = 0;
            end = length;
          }
          return baseFill(array, value, start, end);
        }
    
        /**
         * This method is like `_.find` except that it returns the index of the first
         * element `predicate` returns truthy for instead of the element itself.
         *
         * If a property name is provided for `predicate` the created `_.property`
         * style callback returns the property value of the given element.
         *
         * If a value is also provided for `thisArg` the created `_.matchesProperty`
         * style callback returns `true` for elements that have a matching property
         * value, else `false`.
         *
         * If an object is provided for `predicate` the created `_.matches` style
         * callback returns `true` for elements that have the properties of the given
         * object, else `false`.
         *
         * @static
         * @memberOf _
         * @category Array
         * @param {Array} array The array to search.
         * @param {Function|Object|string} [predicate=_.identity] The function invoked
         *  per iteration.
         * @param {*} [thisArg] The `this` binding of `predicate`.
         * @returns {number} Returns the index of the found element, else `-1`.
         * @example
         *
         * var users = [
         *   { 'user': 'barney',  'active': false },
         *   { 'user': 'fred',    'active': false },
         *   { 'user': 'pebbles', 'active': true }
         * ];
         *
         * _.findIndex(users, function(chr) {
         *   return chr.user == 'barney';
         * });
         * // => 0
         *
         * // using the `_.matches` callback shorthand
         * _.findIndex(users, { 'user': 'fred', 'active': false });
         * // => 1
         *
         * // using the `_.matchesProperty` callback shorthand
         * _.findIndex(users, 'active', false);
         * // => 0
         *
         * // using the `_.property` callback shorthand
         * _.findIndex(users, 'active');
         * // => 2
         */
        var findIndex = createFindIndex();
    
        /**
         * This method is like `_.findIndex` except that it iterates over elements
         * of `collection` from right to left.
         *
         * If a property name is provided for `predicate` the created `_.property`
         * style callback returns the property value of the given element.
         *
         * If a value is also provided for `thisArg` the created `_.matchesProperty`
         * style callback returns `true` for elements that have a matching property
         * value, else `false`.
         *
         * If an object is provided for `predicate` the created `_.matches` style
         * callback returns `true` for elements that have the properties of the given
         * object, else `false`.
         *
         * @static
         * @memberOf _
         * @category Array
         * @param {Array} array The array to search.
         * @param {Function|Object|string} [predicate=_.identity] The function invoked
         *  per iteration.
         * @param {*} [thisArg] The `this` binding of `predicate`.
         * @returns {number} Returns the index of the found element, else `-1`.
         * @example
         *
         * var users = [
         *   { 'user': 'barney',  'active': true },
         *   { 'user': 'fred',    'active': false },
         *   { 'user': 'pebbles', 'active': false }
         * ];
         *
         * _.findLastIndex(users, function(chr) {
         *   return chr.user == 'pebbles';
         * });
         * // => 2
         *
         * // using the `_.matches` callback shorthand
         * _.findLastIndex(users, { 'user': 'barney', 'active': true });
         * // => 0
         *
         * // using the `_.matchesProperty` callback shorthand
         * _.findLastIndex(users, 'active', false);
         * // => 2
         *
         * // using the `_.property` callback shorthand
         * _.findLastIndex(users, 'active');
         * // => 0
         */
        var findLastIndex = createFindIndex(true);
    
        /**
         * Gets the first element of `array`.
         *
         * @static
         * @memberOf _
         * @alias head
         * @category Array
         * @param {Array} array The array to query.
         * @returns {*} Returns the first element of `array`.
         * @example
         *
         * _.first([1, 2, 3]);
         * // => 1
         *
         * _.first([]);
         * // => undefined
         */
        function first(array) {
          return array ? array[0] : undefined;
        }
    
        /**
         * Flattens a nested array. If `isDeep` is `true` the array is recursively
         * flattened, otherwise it is only flattened a single level.
         *
         * @static
         * @memberOf _
         * @category Array
         * @param {Array} array The array to flatten.
         * @param {boolean} [isDeep] Specify a deep flatten.
         * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
         * @returns {Array} Returns the new flattened array.
         * @example
         *
         * _.flatten([1, [2, 3, [4]]]);
         * // => [1, 2, 3, [4]]
         *
         * // using `isDeep`
         * _.flatten([1, [2, 3, [4]]], true);
         * // => [1, 2, 3, 4]
         */
        function flatten(array, isDeep, guard) {
          var length = array ? array.length : 0;
          if (guard && isIterateeCall(array, isDeep, guard)) {
            isDeep = false;
          }
          return length ? baseFlatten(array, isDeep) : [];
        }
    
        /**
         * Recursively flattens a nested array.
         *
         * @static
         * @memberOf _
         * @category Array
         * @param {Array} array The array to recursively flatten.
         * @returns {Array} Returns the new flattened array.
         * @example
         *
         * _.flattenDeep([1, [2, 3, [4]]]);
         * // => [1, 2, 3, 4]
         */
        function flattenDeep(array) {
          var length = array ? array.length : 0;
          return length ? baseFlatten(array, true) : [];
        }
    
        /**
         * Gets the index at which the first occurrence of `value` is found in `array`
         * using [`SameValueZero`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
         * for equality comparisons. If `fromIndex` is negative, it is used as the offset
         * from the end of `array`. If `array` is sorted providing `true` for `fromIndex`
         * performs a faster binary search.
         *
         * @static
         * @memberOf _
         * @category Array
         * @param {Array} array The array to search.
         * @param {*} value The value to search for.
         * @param {boolean|number} [fromIndex=0] The index to search from or `true`
         *  to perform a binary search on a sorted array.
         * @returns {number} Returns the index of the matched value, else `-1`.
         * @example
         *
         * _.indexOf([1, 2, 1, 2], 2);
         * // => 1
         *
         * // using `fromIndex`
         * _.indexOf([1, 2, 1, 2], 2, 2);
         * // => 3
         *
         * // performing a binary search
         * _.indexOf([1, 1, 2, 2], 2, true);
         * // => 2
         */
        function indexOf(array, value, fromIndex) {
          var length = array ? array.length : 0;
          if (!length) {
            return -1;
          }
          if (typeof fromIndex == 'number') {
            fromIndex = fromIndex < 0 ? nativeMax(length + fromIndex, 0) : fromIndex;
          } else if (fromIndex) {
            var index = binaryIndex(array, value),
                other = array[index];
    
            if (value === value ? (value === other) : (other !== other)) {
              return index;
            }
            return -1;
          }
          return baseIndexOf(array, value, fromIndex || 0);
        }
    
        /**
         * Gets all but the last element of `array`.
         *
         * @static
         * @memberOf _
         * @category Array
         * @param {Array} array The array to query.
         * @returns {Array} Returns the slice of `array`.
         * @example
         *
         * _.initial([1, 2, 3]);
         * // => [1, 2]
         */
        function initial(array) {
          return dropRight(array, 1);
        }
    
        /**
         * Creates an array of unique values that are included in all of the provided
         * arrays using [`SameValueZero`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
         * for equality comparisons.
         *
         * @static
         * @memberOf _
         * @category Array
         * @param {...Array} [arrays] The arrays to inspect.
         * @returns {Array} Returns the new array of shared values.
         * @example
         * _.intersection([1, 2], [4, 2], [2, 1]);
         * // => [2]
         */
        var intersection = restParam(function(arrays) {
          var othLength = arrays.length,
              othIndex = othLength,
              caches = Array(length),
              indexOf = getIndexOf(),
              isCommon = indexOf == baseIndexOf,
              result = [];
    
          while (othIndex--) {
            var value = arrays[othIndex] = isArrayLike(value = arrays[othIndex]) ? value : [];
            caches[othIndex] = (isCommon && value.length >= 120) ? createCache(othIndex && value) : null;
          }
          var array = arrays[0],
              index = -1,
              length = array ? array.length : 0,
              seen = caches[0];
    
          outer:
          while (++index < length) {
            value = array[index];
            if ((seen ? cacheIndexOf(seen, value) : indexOf(result, value, 0)) < 0) {
              var othIndex = othLength;
              while (--othIndex) {
                var cache = caches[othIndex];
                if ((cache ? cacheIndexOf(cache, value) : indexOf(arrays[othIndex], value, 0)) < 0) {
                  continue outer;
                }
              }
              if (seen) {
                seen.push(value);
              }
              result.push(value);
            }
          }
          return result;
        });
    
        /**
         * Gets the last element of `array`.
         *
         * @static
         * @memberOf _
         * @category Array
         * @param {Array} array The array to query.
         * @returns {*} Returns the last element of `array`.
         * @example
         *
         * _.last([1, 2, 3]);
         * // => 3
         */
        function last(array) {
          var length = array ? array.length : 0;
          return length ? array[length - 1] : undefined;
        }
    
        /**
         * This method is like `_.indexOf` except that it iterates over elements of
         * `array` from right to left.
         *
         * @static
         * @memberOf _
         * @category Array
         * @param {Array} array The array to search.
         * @param {*} value The value to search for.
         * @param {boolean|number} [fromIndex=array.length-1] The index to search from
         *  or `true` to perform a binary search on a sorted array.
         * @returns {number} Returns the index of the matched value, else `-1`.
         * @example
         *
         * _.lastIndexOf([1, 2, 1, 2], 2);
         * // => 3
         *
         * // using `fromIndex`
         * _.lastIndexOf([1, 2, 1, 2], 2, 2);
         * // => 1
         *
         * // performing a binary search
         * _.lastIndexOf([1, 1, 2, 2], 2, true);
         * // => 3
         */
        function lastIndexOf(array, value, fromIndex) {
          var length = array ? array.length : 0;
          if (!length) {
            return -1;
          }
          var index = length;
          if (typeof fromIndex == 'number') {
            index = (fromIndex < 0 ? nativeMax(length + fromIndex, 0) : nativeMin(fromIndex || 0, length - 1)) + 1;
          } else if (fromIndex) {
            index = binaryIndex(array, value, true) - 1;
            var other = array[index];
            if (value === value ? (value === other) : (other !== other)) {
              return index;
            }
            return -1;
          }
          if (value !== value) {
            return indexOfNaN(array, index, true);
          }
          while (index--) {
            if (array[index] === value) {
              return index;
            }
          }
          return -1;
        }
    
        /**
         * Removes all provided values from `array` using
         * [`SameValueZero`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
         * for equality comparisons.
         *
         * **Note:** Unlike `_.without`, this method mutates `array`.
         *
         * @static
         * @memberOf _
         * @category Array
         * @param {Array} array The array to modify.
         * @param {...*} [values] The values to remove.
         * @returns {Array} Returns `array`.
         * @example
         *
         * var array = [1, 2, 3, 1, 2, 3];
         *
         * _.pull(array, 2, 3);
         * console.log(array);
         * // => [1, 1]
         */
        function pull() {
          var args = arguments,
              array = args[0];
    
          if (!(array && array.length)) {
            return array;
          }
          var index = 0,
              indexOf = getIndexOf(),
              length = args.length;
    
          while (++index < length) {
            var fromIndex = 0,
                value = args[index];
    
            while ((fromIndex = indexOf(array, value, fromIndex)) > -1) {
              splice.call(array, fromIndex, 1);
            }
          }
          return array;
        }
    
        /**
         * Removes elements from `array` corresponding to the given indexes and returns
         * an array of the removed elements. Indexes may be specified as an array of
         * indexes or as individual arguments.
         *
         * **Note:** Unlike `_.at`, this method mutates `array`.
         *
         * @static
         * @memberOf _
         * @category Array
         * @param {Array} array The array to modify.
         * @param {...(number|number[])} [indexes] The indexes of elements to remove,
         *  specified as individual indexes or arrays of indexes.
         * @returns {Array} Returns the new array of removed elements.
         * @example
         *
         * var array = [5, 10, 15, 20];
         * var evens = _.pullAt(array, 1, 3);
         *
         * console.log(array);
         * // => [5, 15]
         *
         * console.log(evens);
         * // => [10, 20]
         */
        var pullAt = restParam(function(array, indexes) {
          indexes = baseFlatten(indexes);
    
          var result = baseAt(array, indexes);
          basePullAt(array, indexes.sort(baseCompareAscending));
          return result;
        });
    
        /**
         * Removes all elements from `array` that `predicate` returns truthy for
         * and returns an array of the removed elements. The predicate is bound to
         * `thisArg` and invoked with three arguments: (value, index, array).
         *
         * If a property name is provided for `predicate` the created `_.property`
         * style callback returns the property value of the given element.
         *
         * If a value is also provided for `thisArg` the created `_.matchesProperty`
         * style callback returns `true` for elements that have a matching property
         * value, else `false`.
         *
         * If an object is provided for `predicate` the created `_.matches` style
         * callback returns `true` for elements that have the properties of the given
         * object, else `false`.
         *
         * **Note:** Unlike `_.filter`, this method mutates `array`.
         *
         * @static
         * @memberOf _
         * @category Array
         * @param {Array} array The array to modify.
         * @param {Function|Object|string} [predicate=_.identity] The function invoked
         *  per iteration.
         * @param {*} [thisArg] The `this` binding of `predicate`.
         * @returns {Array} Returns the new array of removed elements.
         * @example
         *
         * var array = [1, 2, 3, 4];
         * var evens = _.remove(array, function(n) {
         *   return n % 2 == 0;
         * });
         *
         * console.log(array);
         * // => [1, 3]
         *
         * console.log(evens);
         * // => [2, 4]
         */
        function remove(array, predicate, thisArg) {
          var result = [];
          if (!(array && array.length)) {
            return result;
          }
          var index = -1,
              indexes = [],
              length = array.length;
    
          predicate = getCallback(predicate, thisArg, 3);
          while (++index < length) {
            var value = array[index];
            if (predicate(value, index, array)) {
              result.push(value);
              indexes.push(index);
            }
          }
          basePullAt(array, indexes);
          return result;
        }
    
        /**
         * Gets all but the first element of `array`.
         *
         * @static
         * @memberOf _
         * @alias tail
         * @category Array
         * @param {Array} array The array to query.
         * @returns {Array} Returns the slice of `array`.
         * @example
         *
         * _.rest([1, 2, 3]);
         * // => [2, 3]
         */
        function rest(array) {
          return drop(array, 1);
        }
    
        /**
         * Creates a slice of `array` from `start` up to, but not including, `end`.
         *
         * **Note:** This method is used instead of `Array#slice` to support node
         * lists in IE < 9 and to ensure dense arrays are returned.
         *
         * @static
         * @memberOf _
         * @category Array
         * @param {Array} array The array to slice.
         * @param {number} [start=0] The start position.
         * @param {number} [end=array.length] The end position.
         * @returns {Array} Returns the slice of `array`.
         */
        function slice(array, start, end) {
          var length = array ? array.length : 0;
          if (!length) {
            return [];
          }
          if (end && typeof end != 'number' && isIterateeCall(array, start, end)) {
            start = 0;
            end = length;
          }
          return baseSlice(array, start, end);
        }
    
        /**
         * Uses a binary search to determine the lowest index at which `value` should
         * be inserted into `array` in order to maintain its sort order. If an iteratee
         * function is provided it is invoked for `value` and each element of `array`
         * to compute their sort ranking. The iteratee is bound to `thisArg` and
         * invoked with one argument; (value).
         *
         * If a property name is provided for `iteratee` the created `_.property`
         * style callback returns the property value of the given element.
         *
         * If a value is also provided for `thisArg` the created `_.matchesProperty`
         * style callback returns `true` for elements that have a matching property
         * value, else `false`.
         *
         * If an object is provided for `iteratee` the created `_.matches` style
         * callback returns `true` for elements that have the properties of the given
         * object, else `false`.
         *
         * @static
         * @memberOf _
         * @category Array
         * @param {Array} array The sorted array to inspect.
         * @param {*} value The value to evaluate.
         * @param {Function|Object|string} [iteratee=_.identity] The function invoked
         *  per iteration.
         * @param {*} [thisArg] The `this` binding of `iteratee`.
         * @returns {number} Returns the index at which `value` should be inserted
         *  into `array`.
         * @example
         *
         * _.sortedIndex([30, 50], 40);
         * // => 1
         *
         * _.sortedIndex([4, 4, 5, 5], 5);
         * // => 2
         *
         * var dict = { 'data': { 'thirty': 30, 'forty': 40, 'fifty': 50 } };
         *
         * // using an iteratee function
         * _.sortedIndex(['thirty', 'fifty'], 'forty', function(word) {
         *   return this.data[word];
         * }, dict);
         * // => 1
         *
         * // using the `_.property` callback shorthand
         * _.sortedIndex([{ 'x': 30 }, { 'x': 50 }], { 'x': 40 }, 'x');
         * // => 1
         */
        var sortedIndex = createSortedIndex();
    
        /**
         * This method is like `_.sortedIndex` except that it returns the highest
         * index at which `value` should be inserted into `array` in order to
         * maintain its sort order.
         *
         * @static
         * @memberOf _
         * @category Array
         * @param {Array} array The sorted array to inspect.
         * @param {*} value The value to evaluate.
         * @param {Function|Object|string} [iteratee=_.identity] The function invoked
         *  per iteration.
         * @param {*} [thisArg] The `this` binding of `iteratee`.
         * @returns {number} Returns the index at which `value` should be inserted
         *  into `array`.
         * @example
         *
         * _.sortedLastIndex([4, 4, 5, 5], 5);
         * // => 4
         */
        var sortedLastIndex = createSortedIndex(true);
    
        /**
         * Creates a slice of `array` with `n` elements taken from the beginning.
         *
         * @static
         * @memberOf _
         * @category Array
         * @param {Array} array The array to query.
         * @param {number} [n=1] The number of elements to take.
         * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
         * @returns {Array} Returns the slice of `array`.
         * @example
         *
         * _.take([1, 2, 3]);
         * // => [1]
         *
         * _.take([1, 2, 3], 2);
         * // => [1, 2]
         *
         * _.take([1, 2, 3], 5);
         * // => [1, 2, 3]
         *
         * _.take([1, 2, 3], 0);
         * // => []
         */
        function take(array, n, guard) {
          var length = array ? array.length : 0;
          if (!length) {
            return [];
          }
          if (guard ? isIterateeCall(array, n, guard) : n == null) {
            n = 1;
          }
          return baseSlice(array, 0, n < 0 ? 0 : n);
        }
    
        /**
         * Creates a slice of `array` with `n` elements taken from the end.
         *
         * @static
         * @memberOf _
         * @category Array
         * @param {Array} array The array to query.
         * @param {number} [n=1] The number of elements to take.
         * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
         * @returns {Array} Returns the slice of `array`.
         * @example
         *
         * _.takeRight([1, 2, 3]);
         * // => [3]
         *
         * _.takeRight([1, 2, 3], 2);
         * // => [2, 3]
         *
         * _.takeRight([1, 2, 3], 5);
         * // => [1, 2, 3]
         *
         * _.takeRight([1, 2, 3], 0);
         * // => []
         */
        function takeRight(array, n, guard) {
          var length = array ? array.length : 0;
          if (!length) {
            return [];
          }
          if (guard ? isIterateeCall(array, n, guard) : n == null) {
            n = 1;
          }
          n = length - (+n || 0);
          return baseSlice(array, n < 0 ? 0 : n);
        }
    
        /**
         * Creates a slice of `array` with elements taken from the end. Elements are
         * taken until `predicate` returns falsey. The predicate is bound to `thisArg`
         * and invoked with three arguments: (value, index, array).
         *
         * If a property name is provided for `predicate` the created `_.property`
         * style callback returns the property value of the given element.
         *
         * If a value is also provided for `thisArg` the created `_.matchesProperty`
         * style callback returns `true` for elements that have a matching property
         * value, else `false`.
         *
         * If an object is provided for `predicate` the created `_.matches` style
         * callback returns `true` for elements that have the properties of the given
         * object, else `false`.
         *
         * @static
         * @memberOf _
         * @category Array
         * @param {Array} array The array to query.
         * @param {Function|Object|string} [predicate=_.identity] The function invoked
         *  per iteration.
         * @param {*} [thisArg] The `this` binding of `predicate`.
         * @returns {Array} Returns the slice of `array`.
         * @example
         *
         * _.takeRightWhile([1, 2, 3], function(n) {
         *   return n > 1;
         * });
         * // => [2, 3]
         *
         * var users = [
         *   { 'user': 'barney',  'active': true },
         *   { 'user': 'fred',    'active': false },
         *   { 'user': 'pebbles', 'active': false }
         * ];
         *
         * // using the `_.matches` callback shorthand
         * _.pluck(_.takeRightWhile(users, { 'user': 'pebbles', 'active': false }), 'user');
         * // => ['pebbles']
         *
         * // using the `_.matchesProperty` callback shorthand
         * _.pluck(_.takeRightWhile(users, 'active', false), 'user');
         * // => ['fred', 'pebbles']
         *
         * // using the `_.property` callback shorthand
         * _.pluck(_.takeRightWhile(users, 'active'), 'user');
         * // => []
         */
        function takeRightWhile(array, predicate, thisArg) {
          return (array && array.length)
            ? baseWhile(array, getCallback(predicate, thisArg, 3), false, true)
            : [];
        }
    
        /**
         * Creates a slice of `array` with elements taken from the beginning. Elements
         * are taken until `predicate` returns falsey. The predicate is bound to
         * `thisArg` and invoked with three arguments: (value, index, array).
         *
         * If a property name is provided for `predicate` the created `_.property`
         * style callback returns the property value of the given element.
         *
         * If a value is also provided for `thisArg` the created `_.matchesProperty`
         * style callback returns `true` for elements that have a matching property
         * value, else `false`.
         *
         * If an object is provided for `predicate` the created `_.matches` style
         * callback returns `true` for elements that have the properties of the given
         * object, else `false`.
         *
         * @static
         * @memberOf _
         * @category Array
         * @param {Array} array The array to query.
         * @param {Function|Object|string} [predicate=_.identity] The function invoked
         *  per iteration.
         * @param {*} [thisArg] The `this` binding of `predicate`.
         * @returns {Array} Returns the slice of `array`.
         * @example
         *
         * _.takeWhile([1, 2, 3], function(n) {
         *   return n < 3;
         * });
         * // => [1, 2]
         *
         * var users = [
         *   { 'user': 'barney',  'active': false },
         *   { 'user': 'fred',    'active': false},
         *   { 'user': 'pebbles', 'active': true }
         * ];
         *
         * // using the `_.matches` callback shorthand
         * _.pluck(_.takeWhile(users, { 'user': 'barney', 'active': false }), 'user');
         * // => ['barney']
         *
         * // using the `_.matchesProperty` callback shorthand
         * _.pluck(_.takeWhile(users, 'active', false), 'user');
         * // => ['barney', 'fred']
         *
         * // using the `_.property` callback shorthand
         * _.pluck(_.takeWhile(users, 'active'), 'user');
         * // => []
         */
        function takeWhile(array, predicate, thisArg) {
          return (array && array.length)
            ? baseWhile(array, getCallback(predicate, thisArg, 3))
            : [];
        }
    
        /**
         * Creates an array of unique values, in order, from all of the provided arrays
         * using [`SameValueZero`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
         * for equality comparisons.
         *
         * @static
         * @memberOf _
         * @category Array
         * @param {...Array} [arrays] The arrays to inspect.
         * @returns {Array} Returns the new array of combined values.
         * @example
         *
         * _.union([1, 2], [4, 2], [2, 1]);
         * // => [1, 2, 4]
         */
        var union = restParam(function(arrays) {
          return baseUniq(baseFlatten(arrays, false, true));
        });
    
        /**
         * Creates a duplicate-free version of an array, using
         * [`SameValueZero`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
         * for equality comparisons, in which only the first occurence of each element
         * is kept. Providing `true` for `isSorted` performs a faster search algorithm
         * for sorted arrays. If an iteratee function is provided it is invoked for
         * each element in the array to generate the criterion by which uniqueness
         * is computed. The `iteratee` is bound to `thisArg` and invoked with three
         * arguments: (value, index, array).
         *
         * If a property name is provided for `iteratee` the created `_.property`
         * style callback returns the property value of the given element.
         *
         * If a value is also provided for `thisArg` the created `_.matchesProperty`
         * style callback returns `true` for elements that have a matching property
         * value, else `false`.
         *
         * If an object is provided for `iteratee` the created `_.matches` style
         * callback returns `true` for elements that have the properties of the given
         * object, else `false`.
         *
         * @static
         * @memberOf _
         * @alias unique
         * @category Array
         * @param {Array} array The array to inspect.
         * @param {boolean} [isSorted] Specify the array is sorted.
         * @param {Function|Object|string} [iteratee] The function invoked per iteration.
         * @param {*} [thisArg] The `this` binding of `iteratee`.
         * @returns {Array} Returns the new duplicate-value-free array.
         * @example
         *
         * _.uniq([2, 1, 2]);
         * // => [2, 1]
         *
         * // using `isSorted`
         * _.uniq([1, 1, 2], true);
         * // => [1, 2]
         *
         * // using an iteratee function
         * _.uniq([1, 2.5, 1.5, 2], function(n) {
         *   return this.floor(n);
         * }, Math);
         * // => [1, 2.5]
         *
         * // using the `_.property` callback shorthand
         * _.uniq([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
         * // => [{ 'x': 1 }, { 'x': 2 }]
         */
        function uniq(array, isSorted, iteratee, thisArg) {
          var length = array ? array.length : 0;
          if (!length) {
            return [];
          }
          if (isSorted != null && typeof isSorted != 'boolean') {
            thisArg = iteratee;
            iteratee = isIterateeCall(array, isSorted, thisArg) ? null : isSorted;
            isSorted = false;
          }
          var callback = getCallback();
          if (!(iteratee == null && callback === baseCallback)) {
            iteratee = callback(iteratee, thisArg, 3);
          }
          return (isSorted && getIndexOf() == baseIndexOf)
            ? sortedUniq(array, iteratee)
            : baseUniq(array, iteratee);
        }
    
        /**
         * This method is like `_.zip` except that it accepts an array of grouped
         * elements and creates an array regrouping the elements to their pre-zip
         * configuration.
         *
         * @static
         * @memberOf _
         * @category Array
         * @param {Array} array The array of grouped elements to process.
         * @returns {Array} Returns the new array of regrouped elements.
         * @example
         *
         * var zipped = _.zip(['fred', 'barney'], [30, 40], [true, false]);
         * // => [['fred', 30, true], ['barney', 40, false]]
         *
         * _.unzip(zipped);
         * // => [['fred', 'barney'], [30, 40], [true, false]]
         */
        function unzip(array) {
          if (!(array && array.length)) {
            return [];
          }
          var index = -1,
              length = 0;
    
          array = arrayFilter(array, function(group) {
            if (isArrayLike(group)) {
              length = nativeMax(group.length, length);
              return true;
            }
          });
          var result = Array(length);
          while (++index < length) {
            result[index] = arrayMap(array, baseProperty(index));
          }
          return result;
        }
    
        /**
         * This method is like `_.unzip` except that it accepts an iteratee to specify
         * how regrouped values should be combined. The `iteratee` is bound to `thisArg`
         * and invoked with four arguments: (accumulator, value, index, group).
         *
         * @static
         * @memberOf _
         * @category Array
         * @param {Array} array The array of grouped elements to process.
         * @param {Function} [iteratee] The function to combine regrouped values.
         * @param {*} [thisArg] The `this` binding of `iteratee`.
         * @returns {Array} Returns the new array of regrouped elements.
         * @example
         *
         * var zipped = _.zip([1, 2], [10, 20], [100, 200]);
         * // => [[1, 10, 100], [2, 20, 200]]
         *
         * _.unzipWith(zipped, _.add);
         * // => [3, 30, 300]
         */
        function unzipWith(array, iteratee, thisArg) {
          var length = array ? array.length : 0;
          if (!length) {
            return [];
          }
          var result = unzip(array);
          if (iteratee == null) {
            return result;
          }
          iteratee = bindCallback(iteratee, thisArg, 4);
          return arrayMap(result, function(group) {
            return arrayReduce(group, iteratee, undefined, true);
          });
        }
    
        /**
         * Creates an array excluding all provided values using
         * [`SameValueZero`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
         * for equality comparisons.
         *
         * @static
         * @memberOf _
         * @category Array
         * @param {Array} array The array to filter.
         * @param {...*} [values] The values to exclude.
         * @returns {Array} Returns the new array of filtered values.
         * @example
         *
         * _.without([1, 2, 1, 3], 1, 2);
         * // => [3]
         */
        var without = restParam(function(array, values) {
          return isArrayLike(array)
            ? baseDifference(array, values)
            : [];
        });
    
        /**
         * Creates an array of unique values that is the [symmetric difference](https://en.wikipedia.org/wiki/Symmetric_difference)
         * of the provided arrays.
         *
         * @static
         * @memberOf _
         * @category Array
         * @param {...Array} [arrays] The arrays to inspect.
         * @returns {Array} Returns the new array of values.
         * @example
         *
         * _.xor([1, 2], [4, 2]);
         * // => [1, 4]
         */
        function xor() {
          var index = -1,
              length = arguments.length;
    
          while (++index < length) {
            var array = arguments[index];
            if (isArrayLike(array)) {
              var result = result
                ? baseDifference(result, array).concat(baseDifference(array, result))
                : array;
            }
          }
          return result ? baseUniq(result) : [];
        }
    
        /**
         * Creates an array of grouped elements, the first of which contains the first
         * elements of the given arrays, the second of which contains the second elements
         * of the given arrays, and so on.
         *
         * @static
         * @memberOf _
         * @category Array
         * @param {...Array} [arrays] The arrays to process.
         * @returns {Array} Returns the new array of grouped elements.
         * @example
         *
         * _.zip(['fred', 'barney'], [30, 40], [true, false]);
         * // => [['fred', 30, true], ['barney', 40, false]]
         */
        var zip = restParam(unzip);
    
        /**
         * The inverse of `_.pairs`; this method returns an object composed from arrays
         * of property names and values. Provide either a single two dimensional array,
         * e.g. `[[key1, value1], [key2, value2]]` or two arrays, one of property names
         * and one of corresponding values.
         *
         * @static
         * @memberOf _
         * @alias object
         * @category Array
         * @param {Array} props The property names.
         * @param {Array} [values=[]] The property values.
         * @returns {Object} Returns the new object.
         * @example
         *
         * _.zipObject([['fred', 30], ['barney', 40]]);
         * // => { 'fred': 30, 'barney': 40 }
         *
         * _.zipObject(['fred', 'barney'], [30, 40]);
         * // => { 'fred': 30, 'barney': 40 }
         */
        function zipObject(props, values) {
          var index = -1,
              length = props ? props.length : 0,
              result = {};
    
          if (length && !values && !isArray(props[0])) {
            values = [];
          }
          while (++index < length) {
            var key = props[index];
            if (values) {
              result[key] = values[index];
            } else if (key) {
              result[key[0]] = key[1];
            }
          }
          return result;
        }
    
        /**
         * This method is like `_.zip` except that it accepts an iteratee to specify
         * how grouped values should be combined. The `iteratee` is bound to `thisArg`
         * and invoked with four arguments: (accumulator, value, index, group).
         *
         * @static
         * @memberOf _
         * @category Array
         * @param {...Array} [arrays] The arrays to process.
         * @param {Function} [iteratee] The function to combine grouped values.
         * @param {*} [thisArg] The `this` binding of `iteratee`.
         * @returns {Array} Returns the new array of grouped elements.
         * @example
         *
         * _.zipWith([1, 2], [10, 20], [100, 200], _.add);
         * // => [111, 222]
         */
        var zipWith = restParam(function(arrays) {
          var length = arrays.length,
              iteratee = length > 2 ? arrays[length - 2] : undefined,
              thisArg = length > 1 ? arrays[length - 1] : undefined;
    
          if (length > 2 && typeof iteratee == 'function') {
            length -= 2;
          } else {
            iteratee = (length > 1 && typeof thisArg == 'function') ? (--length, thisArg) : undefined;
            thisArg = undefined;
          }
          arrays.length = length;
          return unzipWith(arrays, iteratee, thisArg);
        });
    
        /*------------------------------------------------------------------------*/
    
        /**
         * Creates a `lodash` object that wraps `value` with explicit method
         * chaining enabled.
         *
         * @static
         * @memberOf _
         * @category Chain
         * @param {*} value The value to wrap.
         * @returns {Object} Returns the new `lodash` wrapper instance.
         * @example
         *
         * var users = [
         *   { 'user': 'barney',  'age': 36 },
         *   { 'user': 'fred',    'age': 40 },
         *   { 'user': 'pebbles', 'age': 1 }
         * ];
         *
         * var youngest = _.chain(users)
         *   .sortBy('age')
         *   .map(function(chr) {
         *     return chr.user + ' is ' + chr.age;
         *   })
         *   .first()
         *   .value();
         * // => 'pebbles is 1'
         */
        function chain(value) {
          var result = lodash(value);
          result.__chain__ = true;
          return result;
        }
    
        /**
         * This method invokes `interceptor` and returns `value`. The interceptor is
         * bound to `thisArg` and invoked with one argument; (value). The purpose of
         * this method is to "tap into" a method chain in order to perform operations
         * on intermediate results within the chain.
         *
         * @static
         * @memberOf _
         * @category Chain
         * @param {*} value The value to provide to `interceptor`.
         * @param {Function} interceptor The function to invoke.
         * @param {*} [thisArg] The `this` binding of `interceptor`.
         * @returns {*} Returns `value`.
         * @example
         *
         * _([1, 2, 3])
         *  .tap(function(array) {
         *    array.pop();
         *  })
         *  .reverse()
         *  .value();
         * // => [2, 1]
         */
        function tap(value, interceptor, thisArg) {
          interceptor.call(thisArg, value);
          return value;
        }
    
        /**
         * This method is like `_.tap` except that it returns the result of `interceptor`.
         *
         * @static
         * @memberOf _
         * @category Chain
         * @param {*} value The value to provide to `interceptor`.
         * @param {Function} interceptor The function to invoke.
         * @param {*} [thisArg] The `this` binding of `interceptor`.
         * @returns {*} Returns the result of `interceptor`.
         * @example
         *
         * _('  abc  ')
         *  .chain()
         *  .trim()
         *  .thru(function(value) {
         *    return [value];
         *  })
         *  .value();
         * // => ['abc']
         */
        function thru(value, interceptor, thisArg) {
          return interceptor.call(thisArg, value);
        }
    
        /**
         * Enables explicit method chaining on the wrapper object.
         *
         * @name chain
         * @memberOf _
         * @category Chain
         * @returns {Object} Returns the new `lodash` wrapper instance.
         * @example
         *
         * var users = [
         *   { 'user': 'barney', 'age': 36 },
         *   { 'user': 'fred',   'age': 40 }
         * ];
         *
         * // without explicit chaining
         * _(users).first();
         * // => { 'user': 'barney', 'age': 36 }
         *
         * // with explicit chaining
         * _(users).chain()
         *   .first()
         *   .pick('user')
         *   .value();
         * // => { 'user': 'barney' }
         */
        function wrapperChain() {
          return chain(this);
        }
    
        /**
         * Executes the chained sequence and returns the wrapped result.
         *
         * @name commit
         * @memberOf _
         * @category Chain
         * @returns {Object} Returns the new `lodash` wrapper instance.
         * @example
         *
         * var array = [1, 2];
         * var wrapper = _(array).push(3);
         *
         * console.log(array);
         * // => [1, 2]
         *
         * wrapper = wrapper.commit();
         * console.log(array);
         * // => [1, 2, 3]
         *
         * wrapper.last();
         * // => 3
         *
         * console.log(array);
         * // => [1, 2, 3]
         */
        function wrapperCommit() {
          return new LodashWrapper(this.value(), this.__chain__);
        }
    
        /**
         * Creates a clone of the chained sequence planting `value` as the wrapped value.
         *
         * @name plant
         * @memberOf _
         * @category Chain
         * @returns {Object} Returns the new `lodash` wrapper instance.
         * @example
         *
         * var array = [1, 2];
         * var wrapper = _(array).map(function(value) {
         *   return Math.pow(value, 2);
         * });
         *
         * var other = [3, 4];
         * var otherWrapper = wrapper.plant(other);
         *
         * otherWrapper.value();
         * // => [9, 16]
         *
         * wrapper.value();
         * // => [1, 4]
         */
        function wrapperPlant(value) {
          var result,
              parent = this;
    
          while (parent instanceof baseLodash) {
            var clone = wrapperClone(parent);
            if (result) {
              previous.__wrapped__ = clone;
            } else {
              result = clone;
            }
            var previous = clone;
            parent = parent.__wrapped__;
          }
          previous.__wrapped__ = value;
          return result;
        }
    
        /**
         * Reverses the wrapped array so the first element becomes the last, the
         * second element becomes the second to last, and so on.
         *
         * **Note:** This method mutates the wrapped array.
         *
         * @name reverse
         * @memberOf _
         * @category Chain
         * @returns {Object} Returns the new reversed `lodash` wrapper instance.
         * @example
         *
         * var array = [1, 2, 3];
         *
         * _(array).reverse().value()
         * // => [3, 2, 1]
         *
         * console.log(array);
         * // => [3, 2, 1]
         */
        function wrapperReverse() {
          var value = this.__wrapped__;
          if (value instanceof LazyWrapper) {
            if (this.__actions__.length) {
              value = new LazyWrapper(this);
            }
            return new LodashWrapper(value.reverse(), this.__chain__);
          }
          return this.thru(function(value) {
            return value.reverse();
          });
        }
    
        /**
         * Produces the result of coercing the unwrapped value to a string.
         *
         * @name toString
         * @memberOf _
         * @category Chain
         * @returns {string} Returns the coerced string value.
         * @example
         *
         * _([1, 2, 3]).toString();
         * // => '1,2,3'
         */
        function wrapperToString() {
          return (this.value() + '');
        }
    
        /**
         * Executes the chained sequence to extract the unwrapped value.
         *
         * @name value
         * @memberOf _
         * @alias run, toJSON, valueOf
         * @category Chain
         * @returns {*} Returns the resolved unwrapped value.
         * @example
         *
         * _([1, 2, 3]).value();
         * // => [1, 2, 3]
         */
        function wrapperValue() {
          return baseWrapperValue(this.__wrapped__, this.__actions__);
        }
    
        /*------------------------------------------------------------------------*/
    
        /**
         * Creates an array of elements corresponding to the given keys, or indexes,
         * of `collection`. Keys may be specified as individual arguments or as arrays
         * of keys.
         *
         * @static
         * @memberOf _
         * @category Collection
         * @param {Array|Object|string} collection The collection to iterate over.
         * @param {...(number|number[]|string|string[])} [props] The property names
         *  or indexes of elements to pick, specified individually or in arrays.
         * @returns {Array} Returns the new array of picked elements.
         * @example
         *
         * _.at(['a', 'b', 'c'], [0, 2]);
         * // => ['a', 'c']
         *
         * _.at(['barney', 'fred', 'pebbles'], 0, 2);
         * // => ['barney', 'pebbles']
         */
        var at = restParam(function(collection, props) {
          return baseAt(collection, baseFlatten(props));
        });
    
        /**
         * Creates an object composed of keys generated from the results of running
         * each element of `collection` through `iteratee`. The corresponding value
         * of each key is the number of times the key was returned by `iteratee`.
         * The `iteratee` is bound to `thisArg` and invoked with three arguments:
         * (value, index|key, collection).
         *
         * If a property name is provided for `iteratee` the created `_.property`
         * style callback returns the property value of the given element.
         *
         * If a value is also provided for `thisArg` the created `_.matchesProperty`
         * style callback returns `true` for elements that have a matching property
         * value, else `false`.
         *
         * If an object is provided for `iteratee` the created `_.matches` style
         * callback returns `true` for elements that have the properties of the given
         * object, else `false`.
         *
         * @static
         * @memberOf _
         * @category Collection
         * @param {Array|Object|string} collection The collection to iterate over.
         * @param {Function|Object|string} [iteratee=_.identity] The function invoked
         *  per iteration.
         * @param {*} [thisArg] The `this` binding of `iteratee`.
         * @returns {Object} Returns the composed aggregate object.
         * @example
         *
         * _.countBy([4.3, 6.1, 6.4], function(n) {
         *   return Math.floor(n);
         * });
         * // => { '4': 1, '6': 2 }
         *
         * _.countBy([4.3, 6.1, 6.4], function(n) {
         *   return this.floor(n);
         * }, Math);
         * // => { '4': 1, '6': 2 }
         *
         * _.countBy(['one', 'two', 'three'], 'length');
         * // => { '3': 2, '5': 1 }
         */
        var countBy = createAggregator(function(result, value, key) {
          hasOwnProperty.call(result, key) ? ++result[key] : (result[key] = 1);
        });
    
        /**
         * Checks if `predicate` returns truthy for **all** elements of `collection`.
         * The predicate is bound to `thisArg` and invoked with three arguments:
         * (value, index|key, collection).
         *
         * If a property name is provided for `predicate` the created `_.property`
         * style callback returns the property value of the given element.
         *
         * If a value is also provided for `thisArg` the created `_.matchesProperty`
         * style callback returns `true` for elements that have a matching property
         * value, else `false`.
         *
         * If an object is provided for `predicate` the created `_.matches` style
         * callback returns `true` for elements that have the properties of the given
         * object, else `false`.
         *
         * @static
         * @memberOf _
         * @alias all
         * @category Collection
         * @param {Array|Object|string} collection The collection to iterate over.
         * @param {Function|Object|string} [predicate=_.identity] The function invoked
         *  per iteration.
         * @param {*} [thisArg] The `this` binding of `predicate`.
         * @returns {boolean} Returns `true` if all elements pass the predicate check,
         *  else `false`.
         * @example
         *
         * _.every([true, 1, null, 'yes'], Boolean);
         * // => false
         *
         * var users = [
         *   { 'user': 'barney', 'active': false },
         *   { 'user': 'fred',   'active': false }
         * ];
         *
         * // using the `_.matches` callback shorthand
         * _.every(users, { 'user': 'barney', 'active': false });
         * // => false
         *
         * // using the `_.matchesProperty` callback shorthand
         * _.every(users, 'active', false);
         * // => true
         *
         * // using the `_.property` callback shorthand
         * _.every(users, 'active');
         * // => false
         */
        function every(collection, predicate, thisArg) {
          var func = isArray(collection) ? arrayEvery : baseEvery;
          if (thisArg && isIterateeCall(collection, predicate, thisArg)) {
            predicate = null;
          }
          if (typeof predicate != 'function' || thisArg !== undefined) {
            predicate = getCallback(predicate, thisArg, 3);
          }
          return func(collection, predicate);
        }
    
        /**
         * Iterates over elements of `collection`, returning an array of all elements
         * `predicate` returns truthy for. The predicate is bound to `thisArg` and
         * invoked with three arguments: (value, index|key, collection).
         *
         * If a property name is provided for `predicate` the created `_.property`
         * style callback returns the property value of the given element.
         *
         * If a value is also provided for `thisArg` the created `_.matchesProperty`
         * style callback returns `true` for elements that have a matching property
         * value, else `false`.
         *
         * If an object is provided for `predicate` the created `_.matches` style
         * callback returns `true` for elements that have the properties of the given
         * object, else `false`.
         *
         * @static
         * @memberOf _
         * @alias select
         * @category Collection
         * @param {Array|Object|string} collection The collection to iterate over.
         * @param {Function|Object|string} [predicate=_.identity] The function invoked
         *  per iteration.
         * @param {*} [thisArg] The `this` binding of `predicate`.
         * @returns {Array} Returns the new filtered array.
         * @example
         *
         * _.filter([4, 5, 6], function(n) {
         *   return n % 2 == 0;
         * });
         * // => [4, 6]
         *
         * var users = [
         *   { 'user': 'barney', 'age': 36, 'active': true },
         *   { 'user': 'fred',   'age': 40, 'active': false }
         * ];
         *
         * // using the `_.matches` callback shorthand
         * _.pluck(_.filter(users, { 'age': 36, 'active': true }), 'user');
         * // => ['barney']
         *
         * // using the `_.matchesProperty` callback shorthand
         * _.pluck(_.filter(users, 'active', false), 'user');
         * // => ['fred']
         *
         * // using the `_.property` callback shorthand
         * _.pluck(_.filter(users, 'active'), 'user');
         * // => ['barney']
         */
        function filter(collection, predicate, thisArg) {
          var func = isArray(collection) ? arrayFilter : baseFilter;
          predicate = getCallback(predicate, thisArg, 3);
          return func(collection, predicate);
        }
    
        /**
         * Iterates over elements of `collection`, returning the first element
         * `predicate` returns truthy for. The predicate is bound to `thisArg` and
         * invoked with three arguments: (value, index|key, collection).
         *
         * If a property name is provided for `predicate` the created `_.property`
         * style callback returns the property value of the given element.
         *
         * If a value is also provided for `thisArg` the created `_.matchesProperty`
         * style callback returns `true` for elements that have a matching property
         * value, else `false`.
         *
         * If an object is provided for `predicate` the created `_.matches` style
         * callback returns `true` for elements that have the properties of the given
         * object, else `false`.
         *
         * @static
         * @memberOf _
         * @alias detect
         * @category Collection
         * @param {Array|Object|string} collection The collection to search.
         * @param {Function|Object|string} [predicate=_.identity] The function invoked
         *  per iteration.
         * @param {*} [thisArg] The `this` binding of `predicate`.
         * @returns {*} Returns the matched element, else `undefined`.
         * @example
         *
         * var users = [
         *   { 'user': 'barney',  'age': 36, 'active': true },
         *   { 'user': 'fred',    'age': 40, 'active': false },
         *   { 'user': 'pebbles', 'age': 1,  'active': true }
         * ];
         *
         * _.result(_.find(users, function(chr) {
         *   return chr.age < 40;
         * }), 'user');
         * // => 'barney'
         *
         * // using the `_.matches` callback shorthand
         * _.result(_.find(users, { 'age': 1, 'active': true }), 'user');
         * // => 'pebbles'
         *
         * // using the `_.matchesProperty` callback shorthand
         * _.result(_.find(users, 'active', false), 'user');
         * // => 'fred'
         *
         * // using the `_.property` callback shorthand
         * _.result(_.find(users, 'active'), 'user');
         * // => 'barney'
         */
        var find = createFind(baseEach);
    
        /**
         * This method is like `_.find` except that it iterates over elements of
         * `collection` from right to left.
         *
         * @static
         * @memberOf _
         * @category Collection
         * @param {Array|Object|string} collection The collection to search.
         * @param {Function|Object|string} [predicate=_.identity] The function invoked
         *  per iteration.
         * @param {*} [thisArg] The `this` binding of `predicate`.
         * @returns {*} Returns the matched element, else `undefined`.
         * @example
         *
         * _.findLast([1, 2, 3, 4], function(n) {
         *   return n % 2 == 1;
         * });
         * // => 3
         */
        var findLast = createFind(baseEachRight, true);
    
        /**
         * Performs a deep comparison between each element in `collection` and the
         * source object, returning the first element that has equivalent property
         * values.
         *
         * **Note:** This method supports comparing arrays, booleans, `Date` objects,
         * numbers, `Object` objects, regexes, and strings. Objects are compared by
         * their own, not inherited, enumerable properties. For comparing a single
         * own or inherited property value see `_.matchesProperty`.
         *
         * @static
         * @memberOf _
         * @category Collection
         * @param {Array|Object|string} collection The collection to search.
         * @param {Object} source The object of property values to match.
         * @returns {*} Returns the matched element, else `undefined`.
         * @example
         *
         * var users = [
         *   { 'user': 'barney', 'age': 36, 'active': true },
         *   { 'user': 'fred',   'age': 40, 'active': false }
         * ];
         *
         * _.result(_.findWhere(users, { 'age': 36, 'active': true }), 'user');
         * // => 'barney'
         *
         * _.result(_.findWhere(users, { 'age': 40, 'active': false }), 'user');
         * // => 'fred'
         */
        function findWhere(collection, source) {
          return find(collection, baseMatches(source));
        }
    
        /**
         * Iterates over elements of `collection` invoking `iteratee` for each element.
         * The `iteratee` is bound to `thisArg` and invoked with three arguments:
         * (value, index|key, collection). Iteratee functions may exit iteration early
         * by explicitly returning `false`.
         *
         * **Note:** As with other "Collections" methods, objects with a "length" property
         * are iterated like arrays. To avoid this behavior `_.forIn` or `_.forOwn`
         * may be used for object iteration.
         *
         * @static
         * @memberOf _
         * @alias each
         * @category Collection
         * @param {Array|Object|string} collection The collection to iterate over.
         * @param {Function} [iteratee=_.identity] The function invoked per iteration.
         * @param {*} [thisArg] The `this` binding of `iteratee`.
         * @returns {Array|Object|string} Returns `collection`.
         * @example
         *
         * _([1, 2]).forEach(function(n) {
         *   console.log(n);
         * }).value();
         * // => logs each value from left to right and returns the array
         *
         * _.forEach({ 'a': 1, 'b': 2 }, function(n, key) {
         *   console.log(n, key);
         * });
         * // => logs each value-key pair and returns the object (iteration order is not guaranteed)
         */
        var forEach = createForEach(arrayEach, baseEach);
    
        /**
         * This method is like `_.forEach` except that it iterates over elements of
         * `collection` from right to left.
         *
         * @static
         * @memberOf _
         * @alias eachRight
         * @category Collection
         * @param {Array|Object|string} collection The collection to iterate over.
         * @param {Function} [iteratee=_.identity] The function invoked per iteration.
         * @param {*} [thisArg] The `this` binding of `iteratee`.
         * @returns {Array|Object|string} Returns `collection`.
         * @example
         *
         * _([1, 2]).forEachRight(function(n) {
         *   console.log(n);
         * }).value();
         * // => logs each value from right to left and returns the array
         */
        var forEachRight = createForEach(arrayEachRight, baseEachRight);
    
        /**
         * Creates an object composed of keys generated from the results of running
         * each element of `collection` through `iteratee`. The corresponding value
         * of each key is an array of the elements responsible for generating the key.
         * The `iteratee` is bound to `thisArg` and invoked with three arguments:
         * (value, index|key, collection).
         *
         * If a property name is provided for `iteratee` the created `_.property`
         * style callback returns the property value of the given element.
         *
         * If a value is also provided for `thisArg` the created `_.matchesProperty`
         * style callback returns `true` for elements that have a matching property
         * value, else `false`.
         *
         * If an object is provided for `iteratee` the created `_.matches` style
         * callback returns `true` for elements that have the properties of the given
         * object, else `false`.
         *
         * @static
         * @memberOf _
         * @category Collection
         * @param {Array|Object|string} collection The collection to iterate over.
         * @param {Function|Object|string} [iteratee=_.identity] The function invoked
         *  per iteration.
         * @param {*} [thisArg] The `this` binding of `iteratee`.
         * @returns {Object} Returns the composed aggregate object.
         * @example
         *
         * _.groupBy([4.2, 6.1, 6.4], function(n) {
         *   return Math.floor(n);
         * });
         * // => { '4': [4.2], '6': [6.1, 6.4] }
         *
         * _.groupBy([4.2, 6.1, 6.4], function(n) {
         *   return this.floor(n);
         * }, Math);
         * // => { '4': [4.2], '6': [6.1, 6.4] }
         *
         * // using the `_.property` callback shorthand
         * _.groupBy(['one', 'two', 'three'], 'length');
         * // => { '3': ['one', 'two'], '5': ['three'] }
         */
        var groupBy = createAggregator(function(result, value, key) {
          if (hasOwnProperty.call(result, key)) {
            result[key].push(value);
          } else {
            result[key] = [value];
          }
        });
    
        /**
         * Checks if `value` is in `collection` using
         * [`SameValueZero`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
         * for equality comparisons. If `fromIndex` is negative, it is used as the offset
         * from the end of `collection`.
         *
         * @static
         * @memberOf _
         * @alias contains, include
         * @category Collection
         * @param {Array|Object|string} collection The collection to search.
         * @param {*} target The value to search for.
         * @param {number} [fromIndex=0] The index to search from.
         * @param- {Object} [guard] Enables use as a callback for functions like `_.reduce`.
         * @returns {boolean} Returns `true` if a matching element is found, else `false`.
         * @example
         *
         * _.includes([1, 2, 3], 1);
         * // => true
         *
         * _.includes([1, 2, 3], 1, 2);
         * // => false
         *
         * _.includes({ 'user': 'fred', 'age': 40 }, 'fred');
         * // => true
         *
         * _.includes('pebbles', 'eb');
         * // => true
         */
        function includes(collection, target, fromIndex, guard) {
          var length = collection ? getLength(collection) : 0;
          if (!isLength(length)) {
            collection = values(collection);
            length = collection.length;
          }
          if (!length) {
            return false;
          }
          if (typeof fromIndex != 'number' || (guard && isIterateeCall(target, fromIndex, guard))) {
            fromIndex = 0;
          } else {
            fromIndex = fromIndex < 0 ? nativeMax(length + fromIndex, 0) : (fromIndex || 0);
          }
          return (typeof collection == 'string' || !isArray(collection) && isString(collection))
            ? (fromIndex < length && collection.indexOf(target, fromIndex) > -1)
            : (getIndexOf(collection, target, fromIndex) > -1);
        }
    
        /**
         * Creates an object composed of keys generated from the results of running
         * each element of `collection` through `iteratee`. The corresponding value
         * of each key is the last element responsible for generating the key. The
         * iteratee function is bound to `thisArg` and invoked with three arguments:
         * (value, index|key, collection).
         *
         * If a property name is provided for `iteratee` the created `_.property`
         * style callback returns the property value of the given element.
         *
         * If a value is also provided for `thisArg` the created `_.matchesProperty`
         * style callback returns `true` for elements that have a matching property
         * value, else `false`.
         *
         * If an object is provided for `iteratee` the created `_.matches` style
         * callback returns `true` for elements that have the properties of the given
         * object, else `false`.
         *
         * @static
         * @memberOf _
         * @category Collection
         * @param {Array|Object|string} collection The collection to iterate over.
         * @param {Function|Object|string} [iteratee=_.identity] The function invoked
         *  per iteration.
         * @param {*} [thisArg] The `this` binding of `iteratee`.
         * @returns {Object} Returns the composed aggregate object.
         * @example
         *
         * var keyData = [
         *   { 'dir': 'left', 'code': 97 },
         *   { 'dir': 'right', 'code': 100 }
         * ];
         *
         * _.indexBy(keyData, 'dir');
         * // => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }
         *
         * _.indexBy(keyData, function(object) {
         *   return String.fromCharCode(object.code);
         * });
         * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
         *
         * _.indexBy(keyData, function(object) {
         *   return this.fromCharCode(object.code);
         * }, String);
         * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
         */
        var indexBy = createAggregator(function(result, value, key) {
          result[key] = value;
        });
    
        /**
         * Invokes the method at `path` of each element in `collection`, returning
         * an array of the results of each invoked method. Any additional arguments
         * are provided to each invoked method. If `methodName` is a function it is
         * invoked for, and `this` bound to, each element in `collection`.
         *
         * @static
         * @memberOf _
         * @category Collection
         * @param {Array|Object|string} collection The collection to iterate over.
         * @param {Array|Function|string} path The path of the method to invoke or
         *  the function invoked per iteration.
         * @param {...*} [args] The arguments to invoke the method with.
         * @returns {Array} Returns the array of results.
         * @example
         *
         * _.invoke([[5, 1, 7], [3, 2, 1]], 'sort');
         * // => [[1, 5, 7], [1, 2, 3]]
         *
         * _.invoke([123, 456], String.prototype.split, '');
         * // => [['1', '2', '3'], ['4', '5', '6']]
         */
        var invoke = restParam(function(collection, path, args) {
          var index = -1,
              isFunc = typeof path == 'function',
              isProp = isKey(path),
              result = isArrayLike(collection) ? Array(collection.length) : [];
    
          baseEach(collection, function(value) {
            var func = isFunc ? path : ((isProp && value != null) ? value[path] : null);
            result[++index] = func ? func.apply(value, args) : invokePath(value, path, args);
          });
          return result;
        });
    
        /**
         * Creates an array of values by running each element in `collection` through
         * `iteratee`. The `iteratee` is bound to `thisArg` and invoked with three
         * arguments: (value, index|key, collection).
         *
         * If a property name is provided for `iteratee` the created `_.property`
         * style callback returns the property value of the given element.
         *
         * If a value is also provided for `thisArg` the created `_.matchesProperty`
         * style callback returns `true` for elements that have a matching property
         * value, else `false`.
         *
         * If an object is provided for `iteratee` the created `_.matches` style
         * callback returns `true` for elements that have the properties of the given
         * object, else `false`.
         *
         * Many lodash methods are guarded to work as iteratees for methods like
         * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
         *
         * The guarded methods are:
         * `ary`, `callback`, `chunk`, `clone`, `create`, `curry`, `curryRight`,
         * `drop`, `dropRight`, `every`, `fill`, `flatten`, `invert`, `max`, `min`,
         * `parseInt`, `slice`, `sortBy`, `take`, `takeRight`, `template`, `trim`,
         * `trimLeft`, `trimRight`, `trunc`, `random`, `range`, `sample`, `some`,
         * `sum`, `uniq`, and `words`
         *
         * @static
         * @memberOf _
         * @alias collect
         * @category Collection
         * @param {Array|Object|string} collection The collection to iterate over.
         * @param {Function|Object|string} [iteratee=_.identity] The function invoked
         *  per iteration.
         * @param {*} [thisArg] The `this` binding of `iteratee`.
         * @returns {Array} Returns the new mapped array.
         * @example
         *
         * function timesThree(n) {
         *   return n * 3;
         * }
         *
         * _.map([1, 2], timesThree);
         * // => [3, 6]
         *
         * _.map({ 'a': 1, 'b': 2 }, timesThree);
         * // => [3, 6] (iteration order is not guaranteed)
         *
         * var users = [
         *   { 'user': 'barney' },
         *   { 'user': 'fred' }
         * ];
         *
         * // using the `_.property` callback shorthand
         * _.map(users, 'user');
         * // => ['barney', 'fred']
         */
        function map(collection, iteratee, thisArg) {
          var func = isArray(collection) ? arrayMap : baseMap;
          iteratee = getCallback(iteratee, thisArg, 3);
          return func(collection, iteratee);
        }
    
        /**
         * Creates an array of elements split into two groups, the first of which
         * contains elements `predicate` returns truthy for, while the second of which
         * contains elements `predicate` returns falsey for. The predicate is bound
         * to `thisArg` and invoked with three arguments: (value, index|key, collection).
         *
         * If a property name is provided for `predicate` the created `_.property`
         * style callback returns the property value of the given element.
         *
         * If a value is also provided for `thisArg` the created `_.matchesProperty`
         * style callback returns `true` for elements that have a matching property
         * value, else `false`.
         *
         * If an object is provided for `predicate` the created `_.matches` style
         * callback returns `true` for elements that have the properties of the given
         * object, else `false`.
         *
         * @static
         * @memberOf _
         * @category Collection
         * @param {Array|Object|string} collection The collection to iterate over.
         * @param {Function|Object|string} [predicate=_.identity] The function invoked
         *  per iteration.
         * @param {*} [thisArg] The `this` binding of `predicate`.
         * @returns {Array} Returns the array of grouped elements.
         * @example
         *
         * _.partition([1, 2, 3], function(n) {
         *   return n % 2;
         * });
         * // => [[1, 3], [2]]
         *
         * _.partition([1.2, 2.3, 3.4], function(n) {
         *   return this.floor(n) % 2;
         * }, Math);
         * // => [[1.2, 3.4], [2.3]]
         *
         * var users = [
         *   { 'user': 'barney',  'age': 36, 'active': false },
         *   { 'user': 'fred',    'age': 40, 'active': true },
         *   { 'user': 'pebbles', 'age': 1,  'active': false }
         * ];
         *
         * var mapper = function(array) {
         *   return _.pluck(array, 'user');
         * };
         *
         * // using the `_.matches` callback shorthand
         * _.map(_.partition(users, { 'age': 1, 'active': false }), mapper);
         * // => [['pebbles'], ['barney', 'fred']]
         *
         * // using the `_.matchesProperty` callback shorthand
         * _.map(_.partition(users, 'active', false), mapper);
         * // => [['barney', 'pebbles'], ['fred']]
         *
         * // using the `_.property` callback shorthand
         * _.map(_.partition(users, 'active'), mapper);
         * // => [['fred'], ['barney', 'pebbles']]
         */
        var partition = createAggregator(function(result, value, key) {
          result[key ? 0 : 1].push(value);
        }, function() { return [[], []]; });
    
        /**
         * Gets the property value of `path` from all elements in `collection`.
         *
         * @static
         * @memberOf _
         * @category Collection
         * @param {Array|Object|string} collection The collection to iterate over.
         * @param {Array|string} path The path of the property to pluck.
         * @returns {Array} Returns the property values.
         * @example
         *
         * var users = [
         *   { 'user': 'barney', 'age': 36 },
         *   { 'user': 'fred',   'age': 40 }
         * ];
         *
         * _.pluck(users, 'user');
         * // => ['barney', 'fred']
         *
         * var userIndex = _.indexBy(users, 'user');
         * _.pluck(userIndex, 'age');
         * // => [36, 40] (iteration order is not guaranteed)
         */
        function pluck(collection, path) {
          return map(collection, property(path));
        }
    
        /**
         * Reduces `collection` to a value which is the accumulated result of running
         * each element in `collection` through `iteratee`, where each successive
         * invocation is supplied the return value of the previous. If `accumulator`
         * is not provided the first element of `collection` is used as the initial
         * value. The `iteratee` is bound to `thisArg` and invoked with four arguments:
         * (accumulator, value, index|key, collection).
         *
         * Many lodash methods are guarded to work as iteratees for methods like
         * `_.reduce`, `_.reduceRight`, and `_.transform`.
         *
         * The guarded methods are:
         * `assign`, `defaults`, `includes`, `merge`, `sortByAll`, and `sortByOrder`
         *
         * @static
         * @memberOf _
         * @alias foldl, inject
         * @category Collection
         * @param {Array|Object|string} collection The collection to iterate over.
         * @param {Function} [iteratee=_.identity] The function invoked per iteration.
         * @param {*} [accumulator] The initial value.
         * @param {*} [thisArg] The `this` binding of `iteratee`.
         * @returns {*} Returns the accumulated value.
         * @example
         *
         * _.reduce([1, 2], function(total, n) {
         *   return total + n;
         * });
         * // => 3
         *
         * _.reduce({ 'a': 1, 'b': 2 }, function(result, n, key) {
         *   result[key] = n * 3;
         *   return result;
         * }, {});
         * // => { 'a': 3, 'b': 6 } (iteration order is not guaranteed)
         */
        var reduce = createReduce(arrayReduce, baseEach);
    
        /**
         * This method is like `_.reduce` except that it iterates over elements of
         * `collection` from right to left.
         *
         * @static
         * @memberOf _
         * @alias foldr
         * @category Collection
         * @param {Array|Object|string} collection The collection to iterate over.
         * @param {Function} [iteratee=_.identity] The function invoked per iteration.
         * @param {*} [accumulator] The initial value.
         * @param {*} [thisArg] The `this` binding of `iteratee`.
         * @returns {*} Returns the accumulated value.
         * @example
         *
         * var array = [[0, 1], [2, 3], [4, 5]];
         *
         * _.reduceRight(array, function(flattened, other) {
         *   return flattened.concat(other);
         * }, []);
         * // => [4, 5, 2, 3, 0, 1]
         */
        var reduceRight = createReduce(arrayReduceRight, baseEachRight);
    
        /**
         * The opposite of `_.filter`; this method returns the elements of `collection`
         * that `predicate` does **not** return truthy for.
         *
         * @static
         * @memberOf _
         * @category Collection
         * @param {Array|Object|string} collection The collection to iterate over.
         * @param {Function|Object|string} [predicate=_.identity] The function invoked
         *  per iteration.
         * @param {*} [thisArg] The `this` binding of `predicate`.
         * @returns {Array} Returns the new filtered array.
         * @example
         *
         * _.reject([1, 2, 3, 4], function(n) {
         *   return n % 2 == 0;
         * });
         * // => [1, 3]
         *
         * var users = [
         *   { 'user': 'barney', 'age': 36, 'active': false },
         *   { 'user': 'fred',   'age': 40, 'active': true }
         * ];
         *
         * // using the `_.matches` callback shorthand
         * _.pluck(_.reject(users, { 'age': 40, 'active': true }), 'user');
         * // => ['barney']
         *
         * // using the `_.matchesProperty` callback shorthand
         * _.pluck(_.reject(users, 'active', false), 'user');
         * // => ['fred']
         *
         * // using the `_.property` callback shorthand
         * _.pluck(_.reject(users, 'active'), 'user');
         * // => ['barney']
         */
        function reject(collection, predicate, thisArg) {
          var func = isArray(collection) ? arrayFilter : baseFilter;
          predicate = getCallback(predicate, thisArg, 3);
          return func(collection, function(value, index, collection) {
            return !predicate(value, index, collection);
          });
        }
    
        /**
         * Gets a random element or `n` random elements from a collection.
         *
         * @static
         * @memberOf _
         * @category Collection
         * @param {Array|Object|string} collection The collection to sample.
         * @param {number} [n] The number of elements to sample.
         * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
         * @returns {*} Returns the random sample(s).
         * @example
         *
         * _.sample([1, 2, 3, 4]);
         * // => 2
         *
         * _.sample([1, 2, 3, 4], 2);
         * // => [3, 1]
         */
        function sample(collection, n, guard) {
          if (guard ? isIterateeCall(collection, n, guard) : n == null) {
            collection = toIterable(collection);
            var length = collection.length;
            return length > 0 ? collection[baseRandom(0, length - 1)] : undefined;
          }
          var index = -1,
              result = toArray(collection),
              length = result.length,
              lastIndex = length - 1;
    
          n = nativeMin(n < 0 ? 0 : (+n || 0), length);
          while (++index < n) {
            var rand = baseRandom(index, lastIndex),
                value = result[rand];
    
            result[rand] = result[index];
            result[index] = value;
          }
          result.length = n;
          return result;
        }
    
        /**
         * Creates an array of shuffled values, using a version of the
         * [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle).
         *
         * @static
         * @memberOf _
         * @category Collection
         * @param {Array|Object|string} collection The collection to shuffle.
         * @returns {Array} Returns the new shuffled array.
         * @example
         *
         * _.shuffle([1, 2, 3, 4]);
         * // => [4, 1, 3, 2]
         */
        function shuffle(collection) {
          return sample(collection, POSITIVE_INFINITY);
        }
    
        /**
         * Gets the size of `collection` by returning its length for array-like
         * values or the number of own enumerable properties for objects.
         *
         * @static
         * @memberOf _
         * @category Collection
         * @param {Array|Object|string} collection The collection to inspect.
         * @returns {number} Returns the size of `collection`.
         * @example
         *
         * _.size([1, 2, 3]);
         * // => 3
         *
         * _.size({ 'a': 1, 'b': 2 });
         * // => 2
         *
         * _.size('pebbles');
         * // => 7
         */
        function size(collection) {
          var length = collection ? getLength(collection) : 0;
          return isLength(length) ? length : keys(collection).length;
        }
    
        /**
         * Checks if `predicate` returns truthy for **any** element of `collection`.
         * The function returns as soon as it finds a passing value and does not iterate
         * over the entire collection. The predicate is bound to `thisArg` and invoked
         * with three arguments: (value, index|key, collection).
         *
         * If a property name is provided for `predicate` the created `_.property`
         * style callback returns the property value of the given element.
         *
         * If a value is also provided for `thisArg` the created `_.matchesProperty`
         * style callback returns `true` for elements that have a matching property
         * value, else `false`.
         *
         * If an object is provided for `predicate` the created `_.matches` style
         * callback returns `true` for elements that have the properties of the given
         * object, else `false`.
         *
         * @static
         * @memberOf _
         * @alias any
         * @category Collection
         * @param {Array|Object|string} collection The collection to iterate over.
         * @param {Function|Object|string} [predicate=_.identity] The function invoked
         *  per iteration.
         * @param {*} [thisArg] The `this` binding of `predicate`.
         * @returns {boolean} Returns `true` if any element passes the predicate check,
         *  else `false`.
         * @example
         *
         * _.some([null, 0, 'yes', false], Boolean);
         * // => true
         *
         * var users = [
         *   { 'user': 'barney', 'active': true },
         *   { 'user': 'fred',   'active': false }
         * ];
         *
         * // using the `_.matches` callback shorthand
         * _.some(users, { 'user': 'barney', 'active': false });
         * // => false
         *
         * // using the `_.matchesProperty` callback shorthand
         * _.some(users, 'active', false);
         * // => true
         *
         * // using the `_.property` callback shorthand
         * _.some(users, 'active');
         * // => true
         */
        function some(collection, predicate, thisArg) {
          var func = isArray(collection) ? arraySome : baseSome;
          if (thisArg && isIterateeCall(collection, predicate, thisArg)) {
            predicate = null;
          }
          if (typeof predicate != 'function' || thisArg !== undefined) {
            predicate = getCallback(predicate, thisArg, 3);
          }
          return func(collection, predicate);
        }
    
        /**
         * Creates an array of elements, sorted in ascending order by the results of
         * running each element in a collection through `iteratee`. This method performs
         * a stable sort, that is, it preserves the original sort order of equal elements.
         * The `iteratee` is bound to `thisArg` and invoked with three arguments:
         * (value, index|key, collection).
         *
         * If a property name is provided for `iteratee` the created `_.property`
         * style callback returns the property value of the given element.
         *
         * If a value is also provided for `thisArg` the created `_.matchesProperty`
         * style callback returns `true` for elements that have a matching property
         * value, else `false`.
         *
         * If an object is provided for `iteratee` the created `_.matches` style
         * callback returns `true` for elements that have the properties of the given
         * object, else `false`.
         *
         * @static
         * @memberOf _
         * @category Collection
         * @param {Array|Object|string} collection The collection to iterate over.
         * @param {Function|Object|string} [iteratee=_.identity] The function invoked
         *  per iteration.
         * @param {*} [thisArg] The `this` binding of `iteratee`.
         * @returns {Array} Returns the new sorted array.
         * @example
         *
         * _.sortBy([1, 2, 3], function(n) {
         *   return Math.sin(n);
         * });
         * // => [3, 1, 2]
         *
         * _.sortBy([1, 2, 3], function(n) {
         *   return this.sin(n);
         * }, Math);
         * // => [3, 1, 2]
         *
         * var users = [
         *   { 'user': 'fred' },
         *   { 'user': 'pebbles' },
         *   { 'user': 'barney' }
         * ];
         *
         * // using the `_.property` callback shorthand
         * _.pluck(_.sortBy(users, 'user'), 'user');
         * // => ['barney', 'fred', 'pebbles']
         */
        function sortBy(collection, iteratee, thisArg) {
          if (collection == null) {
            return [];
          }
          if (thisArg && isIterateeCall(collection, iteratee, thisArg)) {
            iteratee = null;
          }
          var index = -1;
          iteratee = getCallback(iteratee, thisArg, 3);
    
          var result = baseMap(collection, function(value, key, collection) {
            return { 'criteria': iteratee(value, key, collection), 'index': ++index, 'value': value };
          });
          return baseSortBy(result, compareAscending);
        }
    
        /**
         * This method is like `_.sortBy` except that it can sort by multiple iteratees
         * or property names.
         *
         * If a property name is provided for an iteratee the created `_.property`
         * style callback returns the property value of the given element.
         *
         * If an object is provided for an iteratee the created `_.matches` style
         * callback returns `true` for elements that have the properties of the given
         * object, else `false`.
         *
         * @static
         * @memberOf _
         * @category Collection
         * @param {Array|Object|string} collection The collection to iterate over.
         * @param {...(Function|Function[]|Object|Object[]|string|string[])} iteratees
         *  The iteratees to sort by, specified as individual values or arrays of values.
         * @returns {Array} Returns the new sorted array.
         * @example
         *
         * var users = [
         *   { 'user': 'fred',   'age': 48 },
         *   { 'user': 'barney', 'age': 36 },
         *   { 'user': 'fred',   'age': 42 },
         *   { 'user': 'barney', 'age': 34 }
         * ];
         *
         * _.map(_.sortByAll(users, ['user', 'age']), _.values);
         * // => [['barney', 34], ['barney', 36], ['fred', 42], ['fred', 48]]
         *
         * _.map(_.sortByAll(users, 'user', function(chr) {
         *   return Math.floor(chr.age / 10);
         * }), _.values);
         * // => [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 42]]
         */
        var sortByAll = restParam(function(collection, iteratees) {
          if (collection == null) {
            return [];
          }
          var guard = iteratees[2];
          if (guard && isIterateeCall(iteratees[0], iteratees[1], guard)) {
            iteratees.length = 1;
          }
          return baseSortByOrder(collection, baseFlatten(iteratees), []);
        });
    
        /**
         * This method is like `_.sortByAll` except that it allows specifying the
         * sort orders of the iteratees to sort by. A truthy value in `orders` will
         * sort the corresponding property name in ascending order while a falsey
         * value will sort it in descending order.
         *
         * If a property name is provided for an iteratee the created `_.property`
         * style callback returns the property value of the given element.
         *
         * If an object is provided for an iteratee the created `_.matches` style
         * callback returns `true` for elements that have the properties of the given
         * object, else `false`.
         *
         * @static
         * @memberOf _
         * @category Collection
         * @param {Array|Object|string} collection The collection to iterate over.
         * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
         * @param {boolean[]} orders The sort orders of `iteratees`.
         * @param- {Object} [guard] Enables use as a callback for functions like `_.reduce`.
         * @returns {Array} Returns the new sorted array.
         * @example
         *
         * var users = [
         *   { 'user': 'fred',   'age': 48 },
         *   { 'user': 'barney', 'age': 34 },
         *   { 'user': 'fred',   'age': 42 },
         *   { 'user': 'barney', 'age': 36 }
         * ];
         *
         * // sort by `user` in ascending order and by `age` in descending order
         * _.map(_.sortByOrder(users, ['user', 'age'], [true, false]), _.values);
         * // => [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 42]]
         */
        function sortByOrder(collection, iteratees, orders, guard) {
          if (collection == null) {
            return [];
          }
          if (guard && isIterateeCall(iteratees, orders, guard)) {
            orders = null;
          }
          if (!isArray(iteratees)) {
            iteratees = iteratees == null ? [] : [iteratees];
          }
          if (!isArray(orders)) {
            orders = orders == null ? [] : [orders];
          }
          return baseSortByOrder(collection, iteratees, orders);
        }
    
        /**
         * Performs a deep comparison between each element in `collection` and the
         * source object, returning an array of all elements that have equivalent
         * property values.
         *
         * **Note:** This method supports comparing arrays, booleans, `Date` objects,
         * numbers, `Object` objects, regexes, and strings. Objects are compared by
         * their own, not inherited, enumerable properties. For comparing a single
         * own or inherited property value see `_.matchesProperty`.
         *
         * @static
         * @memberOf _
         * @category Collection
         * @param {Array|Object|string} collection The collection to search.
         * @param {Object} source The object of property values to match.
         * @returns {Array} Returns the new filtered array.
         * @example
         *
         * var users = [
         *   { 'user': 'barney', 'age': 36, 'active': false, 'pets': ['hoppy'] },
         *   { 'user': 'fred',   'age': 40, 'active': true, 'pets': ['baby puss', 'dino'] }
         * ];
         *
         * _.pluck(_.where(users, { 'age': 36, 'active': false }), 'user');
         * // => ['barney']
         *
         * _.pluck(_.where(users, { 'pets': ['dino'] }), 'user');
         * // => ['fred']
         */
        function where(collection, source) {
          return filter(collection, baseMatches(source));
        }
    
        /*------------------------------------------------------------------------*/
    
        /**
         * Gets the number of milliseconds that have elapsed since the Unix epoch
         * (1 January 1970 00:00:00 UTC).
         *
         * @static
         * @memberOf _
         * @category Date
         * @example
         *
         * _.defer(function(stamp) {
         *   console.log(_.now() - stamp);
         * }, _.now());
         * // => logs the number of milliseconds it took for the deferred function to be invoked
         */
        var now = nativeNow || function() {
          return new Date().getTime();
        };
    
        /*------------------------------------------------------------------------*/
    
        /**
         * The opposite of `_.before`; this method creates a function that invokes
         * `func` once it is called `n` or more times.
         *
         * @static
         * @memberOf _
         * @category Function
         * @param {number} n The number of calls before `func` is invoked.
         * @param {Function} func The function to restrict.
         * @returns {Function} Returns the new restricted function.
         * @example
         *
         * var saves = ['profile', 'settings'];
         *
         * var done = _.after(saves.length, function() {
         *   console.log('done saving!');
         * });
         *
         * _.forEach(saves, function(type) {
         *   asyncSave({ 'type': type, 'complete': done });
         * });
         * // => logs 'done saving!' after the two async saves have completed
         */
        function after(n, func) {
          if (typeof func != 'function') {
            if (typeof n == 'function') {
              var temp = n;
              n = func;
              func = temp;
            } else {
              throw new TypeError(FUNC_ERROR_TEXT);
            }
          }
          n = nativeIsFinite(n = +n) ? n : 0;
          return function() {
            if (--n < 1) {
              return func.apply(this, arguments);
            }
          };
        }
    
        /**
         * Creates a function that accepts up to `n` arguments ignoring any
         * additional arguments.
         *
         * @static
         * @memberOf _
         * @category Function
         * @param {Function} func The function to cap arguments for.
         * @param {number} [n=func.length] The arity cap.
         * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
         * @returns {Function} Returns the new function.
         * @example
         *
         * _.map(['6', '8', '10'], _.ary(parseInt, 1));
         * // => [6, 8, 10]
         */
        function ary(func, n, guard) {
          if (guard && isIterateeCall(func, n, guard)) {
            n = null;
          }
          n = (func && n == null) ? func.length : nativeMax(+n || 0, 0);
          return createWrapper(func, ARY_FLAG, null, null, null, null, n);
        }
    
        /**
         * Creates a function that invokes `func`, with the `this` binding and arguments
         * of the created function, while it is called less than `n` times. Subsequent
         * calls to the created function return the result of the last `func` invocation.
         *
         * @static
         * @memberOf _
         * @category Function
         * @param {number} n The number of calls at which `func` is no longer invoked.
         * @param {Function} func The function to restrict.
         * @returns {Function} Returns the new restricted function.
         * @example
         *
         * jQuery('#add').on('click', _.before(5, addContactToList));
         * // => allows adding up to 4 contacts to the list
         */
        function before(n, func) {
          var result;
          if (typeof func != 'function') {
            if (typeof n == 'function') {
              var temp = n;
              n = func;
              func = temp;
            } else {
              throw new TypeError(FUNC_ERROR_TEXT);
            }
          }
          return function() {
            if (--n > 0) {
              result = func.apply(this, arguments);
            }
            if (n <= 1) {
              func = null;
            }
            return result;
          };
        }
    
        /**
         * Creates a function that invokes `func` with the `this` binding of `thisArg`
         * and prepends any additional `_.bind` arguments to those provided to the
         * bound function.
         *
         * The `_.bind.placeholder` value, which defaults to `_` in monolithic builds,
         * may be used as a placeholder for partially applied arguments.
         *
         * **Note:** Unlike native `Function#bind` this method does not set the "length"
         * property of bound functions.
         *
         * @static
         * @memberOf _
         * @category Function
         * @param {Function} func The function to bind.
         * @param {*} thisArg The `this` binding of `func`.
         * @param {...*} [partials] The arguments to be partially applied.
         * @returns {Function} Returns the new bound function.
         * @example
         *
         * var greet = function(greeting, punctuation) {
         *   return greeting + ' ' + this.user + punctuation;
         * };
         *
         * var object = { 'user': 'fred' };
         *
         * var bound = _.bind(greet, object, 'hi');
         * bound('!');
         * // => 'hi fred!'
         *
         * // using placeholders
         * var bound = _.bind(greet, object, _, '!');
         * bound('hi');
         * // => 'hi fred!'
         */
        var bind = restParam(function(func, thisArg, partials) {
          var bitmask = BIND_FLAG;
          if (partials.length) {
            var holders = replaceHolders(partials, bind.placeholder);
            bitmask |= PARTIAL_FLAG;
          }
          return createWrapper(func, bitmask, thisArg, partials, holders);
        });
    
        /**
         * Binds methods of an object to the object itself, overwriting the existing
         * method. Method names may be specified as individual arguments or as arrays
         * of method names. If no method names are provided all enumerable function
         * properties, own and inherited, of `object` are bound.
         *
         * **Note:** This method does not set the "length" property of bound functions.
         *
         * @static
         * @memberOf _
         * @category Function
         * @param {Object} object The object to bind and assign the bound methods to.
         * @param {...(string|string[])} [methodNames] The object method names to bind,
         *  specified as individual method names or arrays of method names.
         * @returns {Object} Returns `object`.
         * @example
         *
         * var view = {
         *   'label': 'docs',
         *   'onClick': function() {
         *     console.log('clicked ' + this.label);
         *   }
         * };
         *
         * _.bindAll(view);
         * jQuery('#docs').on('click', view.onClick);
         * // => logs 'clicked docs' when the element is clicked
         */
        var bindAll = restParam(function(object, methodNames) {
          methodNames = methodNames.length ? baseFlatten(methodNames) : functions(object);
    
          var index = -1,
              length = methodNames.length;
    
          while (++index < length) {
            var key = methodNames[index];
            object[key] = createWrapper(object[key], BIND_FLAG, object);
          }
          return object;
        });
    
        /**
         * Creates a function that invokes the method at `object[key]` and prepends
         * any additional `_.bindKey` arguments to those provided to the bound function.
         *
         * This method differs from `_.bind` by allowing bound functions to reference
         * methods that may be redefined or don't yet exist.
         * See [Peter Michaux's article](http://peter.michaux.ca/articles/lazy-function-definition-pattern)
         * for more details.
         *
         * The `_.bindKey.placeholder` value, which defaults to `_` in monolithic
         * builds, may be used as a placeholder for partially applied arguments.
         *
         * @static
         * @memberOf _
         * @category Function
         * @param {Object} object The object the method belongs to.
         * @param {string} key The key of the method.
         * @param {...*} [partials] The arguments to be partially applied.
         * @returns {Function} Returns the new bound function.
         * @example
         *
         * var object = {
         *   'user': 'fred',
         *   'greet': function(greeting, punctuation) {
         *     return greeting + ' ' + this.user + punctuation;
         *   }
         * };
         *
         * var bound = _.bindKey(object, 'greet', 'hi');
         * bound('!');
         * // => 'hi fred!'
         *
         * object.greet = function(greeting, punctuation) {
         *   return greeting + 'ya ' + this.user + punctuation;
         * };
         *
         * bound('!');
         * // => 'hiya fred!'
         *
         * // using placeholders
         * var bound = _.bindKey(object, 'greet', _, '!');
         * bound('hi');
         * // => 'hiya fred!'
         */
        var bindKey = restParam(function(object, key, partials) {
          var bitmask = BIND_FLAG | BIND_KEY_FLAG;
          if (partials.length) {
            var holders = replaceHolders(partials, bindKey.placeholder);
            bitmask |= PARTIAL_FLAG;
          }
          return createWrapper(key, bitmask, object, partials, holders);
        });
    
        /**
         * Creates a function that accepts one or more arguments of `func` that when
         * called either invokes `func` returning its result, if all `func` arguments
         * have been provided, or returns a function that accepts one or more of the
         * remaining `func` arguments, and so on. The arity of `func` may be specified
         * if `func.length` is not sufficient.
         *
         * The `_.curry.placeholder` value, which defaults to `_` in monolithic builds,
         * may be used as a placeholder for provided arguments.
         *
         * **Note:** This method does not set the "length" property of curried functions.
         *
         * @static
         * @memberOf _
         * @category Function
         * @param {Function} func The function to curry.
         * @param {number} [arity=func.length] The arity of `func`.
         * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
         * @returns {Function} Returns the new curried function.
         * @example
         *
         * var abc = function(a, b, c) {
         *   return [a, b, c];
         * };
         *
         * var curried = _.curry(abc);
         *
         * curried(1)(2)(3);
         * // => [1, 2, 3]
         *
         * curried(1, 2)(3);
         * // => [1, 2, 3]
         *
         * curried(1, 2, 3);
         * // => [1, 2, 3]
         *
         * // using placeholders
         * curried(1)(_, 3)(2);
         * // => [1, 2, 3]
         */
        var curry = createCurry(CURRY_FLAG);
    
        /**
         * This method is like `_.curry` except that arguments are applied to `func`
         * in the manner of `_.partialRight` instead of `_.partial`.
         *
         * The `_.curryRight.placeholder` value, which defaults to `_` in monolithic
         * builds, may be used as a placeholder for provided arguments.
         *
         * **Note:** This method does not set the "length" property of curried functions.
         *
         * @static
         * @memberOf _
         * @category Function
         * @param {Function} func The function to curry.
         * @param {number} [arity=func.length] The arity of `func`.
         * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
         * @returns {Function} Returns the new curried function.
         * @example
         *
         * var abc = function(a, b, c) {
         *   return [a, b, c];
         * };
         *
         * var curried = _.curryRight(abc);
         *
         * curried(3)(2)(1);
         * // => [1, 2, 3]
         *
         * curried(2, 3)(1);
         * // => [1, 2, 3]
         *
         * curried(1, 2, 3);
         * // => [1, 2, 3]
         *
         * // using placeholders
         * curried(3)(1, _)(2);
         * // => [1, 2, 3]
         */
        var curryRight = createCurry(CURRY_RIGHT_FLAG);
    
        /**
         * Creates a debounced function that delays invoking `func` until after `wait`
         * milliseconds have elapsed since the last time the debounced function was
         * invoked. The debounced function comes with a `cancel` method to cancel
         * delayed invocations. Provide an options object to indicate that `func`
         * should be invoked on the leading and/or trailing edge of the `wait` timeout.
         * Subsequent calls to the debounced function return the result of the last
         * `func` invocation.
         *
         * **Note:** If `leading` and `trailing` options are `true`, `func` is invoked
         * on the trailing edge of the timeout only if the the debounced function is
         * invoked more than once during the `wait` timeout.
         *
         * See [David Corbacho's article](http://drupalmotion.com/article/debounce-and-throttle-visual-explanation)
         * for details over the differences between `_.debounce` and `_.throttle`.
         *
         * @static
         * @memberOf _
         * @category Function
         * @param {Function} func The function to debounce.
         * @param {number} [wait=0] The number of milliseconds to delay.
         * @param {Object} [options] The options object.
         * @param {boolean} [options.leading=false] Specify invoking on the leading
         *  edge of the timeout.
         * @param {number} [options.maxWait] The maximum time `func` is allowed to be
         *  delayed before it is invoked.
         * @param {boolean} [options.trailing=true] Specify invoking on the trailing
         *  edge of the timeout.
         * @returns {Function} Returns the new debounced function.
         * @example
         *
         * // avoid costly calculations while the window size is in flux
         * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
         *
         * // invoke `sendMail` when the click event is fired, debouncing subsequent calls
         * jQuery('#postbox').on('click', _.debounce(sendMail, 300, {
         *   'leading': true,
         *   'trailing': false
         * }));
         *
         * // ensure `batchLog` is invoked once after 1 second of debounced calls
         * var source = new EventSource('/stream');
         * jQuery(source).on('message', _.debounce(batchLog, 250, {
         *   'maxWait': 1000
         * }));
         *
         * // cancel a debounced call
         * var todoChanges = _.debounce(batchLog, 1000);
         * Object.observe(models.todo, todoChanges);
         *
         * Object.observe(models, function(changes) {
         *   if (_.find(changes, { 'user': 'todo', 'type': 'delete'})) {
         *     todoChanges.cancel();
         *   }
         * }, ['delete']);
         *
         * // ...at some point `models.todo` is changed
         * models.todo.completed = true;
         *
         * // ...before 1 second has passed `models.todo` is deleted
         * // which cancels the debounced `todoChanges` call
         * delete models.todo;
         */
        function debounce(func, wait, options) {
          var args,
              maxTimeoutId,
              result,
              stamp,
              thisArg,
              timeoutId,
              trailingCall,
              lastCalled = 0,
              maxWait = false,
              trailing = true;
    
          if (typeof func != 'function') {
            throw new TypeError(FUNC_ERROR_TEXT);
          }
          wait = wait < 0 ? 0 : (+wait || 0);
          if (options === true) {
            var leading = true;
            trailing = false;
          } else if (isObject(options)) {
            leading = options.leading;
            maxWait = 'maxWait' in options && nativeMax(+options.maxWait || 0, wait);
            trailing = 'trailing' in options ? options.trailing : trailing;
          }
    
          function cancel() {
            if (timeoutId) {
              clearTimeout(timeoutId);
            }
            if (maxTimeoutId) {
              clearTimeout(maxTimeoutId);
            }
            maxTimeoutId = timeoutId = trailingCall = undefined;
          }
    
          function delayed() {
            var remaining = wait - (now() - stamp);
            if (remaining <= 0 || remaining > wait) {
              if (maxTimeoutId) {
                clearTimeout(maxTimeoutId);
              }
              var isCalled = trailingCall;
              maxTimeoutId = timeoutId = trailingCall = undefined;
              if (isCalled) {
                lastCalled = now();
                result = func.apply(thisArg, args);
                if (!timeoutId && !maxTimeoutId) {
                  args = thisArg = null;
                }
              }
            } else {
              timeoutId = setTimeout(delayed, remaining);
            }
          }
    
          function maxDelayed() {
            if (timeoutId) {
              clearTimeout(timeoutId);
            }
            maxTimeoutId = timeoutId = trailingCall = undefined;
            if (trailing || (maxWait !== wait)) {
              lastCalled = now();
              result = func.apply(thisArg, args);
              if (!timeoutId && !maxTimeoutId) {
                args = thisArg = null;
              }
            }
          }
    
          function debounced() {
            args = arguments;
            stamp = now();
            thisArg = this;
            trailingCall = trailing && (timeoutId || !leading);
    
            if (maxWait === false) {
              var leadingCall = leading && !timeoutId;
            } else {
              if (!maxTimeoutId && !leading) {
                lastCalled = stamp;
              }
              var remaining = maxWait - (stamp - lastCalled),
                  isCalled = remaining <= 0 || remaining > maxWait;
    
              if (isCalled) {
                if (maxTimeoutId) {
                  maxTimeoutId = clearTimeout(maxTimeoutId);
                }
                lastCalled = stamp;
                result = func.apply(thisArg, args);
              }
              else if (!maxTimeoutId) {
                maxTimeoutId = setTimeout(maxDelayed, remaining);
              }
            }
            if (isCalled && timeoutId) {
              timeoutId = clearTimeout(timeoutId);
            }
            else if (!timeoutId && wait !== maxWait) {
              timeoutId = setTimeout(delayed, wait);
            }
            if (leadingCall) {
              isCalled = true;
              result = func.apply(thisArg, args);
            }
            if (isCalled && !timeoutId && !maxTimeoutId) {
              args = thisArg = null;
            }
            return result;
          }
          debounced.cancel = cancel;
          return debounced;
        }
    
        /**
         * Defers invoking the `func` until the current call stack has cleared. Any
         * additional arguments are provided to `func` when it is invoked.
         *
         * @static
         * @memberOf _
         * @category Function
         * @param {Function} func The function to defer.
         * @param {...*} [args] The arguments to invoke the function with.
         * @returns {number} Returns the timer id.
         * @example
         *
         * _.defer(function(text) {
         *   console.log(text);
         * }, 'deferred');
         * // logs 'deferred' after one or more milliseconds
         */
        var defer = restParam(function(func, args) {
          return baseDelay(func, 1, args);
        });
    
        /**
         * Invokes `func` after `wait` milliseconds. Any additional arguments are
         * provided to `func` when it is invoked.
         *
         * @static
         * @memberOf _
         * @category Function
         * @param {Function} func The function to delay.
         * @param {number} wait The number of milliseconds to delay invocation.
         * @param {...*} [args] The arguments to invoke the function with.
         * @returns {number} Returns the timer id.
         * @example
         *
         * _.delay(function(text) {
         *   console.log(text);
         * }, 1000, 'later');
         * // => logs 'later' after one second
         */
        var delay = restParam(function(func, wait, args) {
          return baseDelay(func, wait, args);
        });
    
        /**
         * Creates a function that returns the result of invoking the provided
         * functions with the `this` binding of the created function, where each
         * successive invocation is supplied the return value of the previous.
         *
         * @static
         * @memberOf _
         * @category Function
         * @param {...Function} [funcs] Functions to invoke.
         * @returns {Function} Returns the new function.
         * @example
         *
         * function square(n) {
         *   return n * n;
         * }
         *
         * var addSquare = _.flow(_.add, square);
         * addSquare(1, 2);
         * // => 9
         */
        var flow = createFlow();
    
        /**
         * This method is like `_.flow` except that it creates a function that
         * invokes the provided functions from right to left.
         *
         * @static
         * @memberOf _
         * @alias backflow, compose
         * @category Function
         * @param {...Function} [funcs] Functions to invoke.
         * @returns {Function} Returns the new function.
         * @example
         *
         * function square(n) {
         *   return n * n;
         * }
         *
         * var addSquare = _.flowRight(square, _.add);
         * addSquare(1, 2);
         * // => 9
         */
        var flowRight = createFlow(true);
    
        /**
         * Creates a function that memoizes the result of `func`. If `resolver` is
         * provided it determines the cache key for storing the result based on the
         * arguments provided to the memoized function. By default, the first argument
         * provided to the memoized function is coerced to a string and used as the
         * cache key. The `func` is invoked with the `this` binding of the memoized
         * function.
         *
         * **Note:** The cache is exposed as the `cache` property on the memoized
         * function. Its creation may be customized by replacing the `_.memoize.Cache`
         * constructor with one whose instances implement the [`Map`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-properties-of-the-map-prototype-object)
         * method interface of `get`, `has`, and `set`.
         *
         * @static
         * @memberOf _
         * @category Function
         * @param {Function} func The function to have its output memoized.
         * @param {Function} [resolver] The function to resolve the cache key.
         * @returns {Function} Returns the new memoizing function.
         * @example
         *
         * var upperCase = _.memoize(function(string) {
         *   return string.toUpperCase();
         * });
         *
         * upperCase('fred');
         * // => 'FRED'
         *
         * // modifying the result cache
         * upperCase.cache.set('fred', 'BARNEY');
         * upperCase('fred');
         * // => 'BARNEY'
         *
         * // replacing `_.memoize.Cache`
         * var object = { 'user': 'fred' };
         * var other = { 'user': 'barney' };
         * var identity = _.memoize(_.identity);
         *
         * identity(object);
         * // => { 'user': 'fred' }
         * identity(other);
         * // => { 'user': 'fred' }
         *
         * _.memoize.Cache = WeakMap;
         * var identity = _.memoize(_.identity);
         *
         * identity(object);
         * // => { 'user': 'fred' }
         * identity(other);
         * // => { 'user': 'barney' }
         */
        function memoize(func, resolver) {
          if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
            throw new TypeError(FUNC_ERROR_TEXT);
          }
          var memoized = function() {
            var args = arguments,
                key = resolver ? resolver.apply(this, args) : args[0],
                cache = memoized.cache;
    
            if (cache.has(key)) {
              return cache.get(key);
            }
            var result = func.apply(this, args);
            memoized.cache = cache.set(key, result);
            return result;
          };
          memoized.cache = new memoize.Cache;
          return memoized;
        }
    
        /**
         * Creates a function that negates the result of the predicate `func`. The
         * `func` predicate is invoked with the `this` binding and arguments of the
         * created function.
         *
         * @static
         * @memberOf _
         * @category Function
         * @param {Function} predicate The predicate to negate.
         * @returns {Function} Returns the new function.
         * @example
         *
         * function isEven(n) {
         *   return n % 2 == 0;
         * }
         *
         * _.filter([1, 2, 3, 4, 5, 6], _.negate(isEven));
         * // => [1, 3, 5]
         */
        function negate(predicate) {
          if (typeof predicate != 'function') {
            throw new TypeError(FUNC_ERROR_TEXT);
          }
          return function() {
            return !predicate.apply(this, arguments);
          };
        }
    
        /**
         * Creates a function that is restricted to invoking `func` once. Repeat calls
         * to the function return the value of the first call. The `func` is invoked
         * with the `this` binding and arguments of the created function.
         *
         * @static
         * @memberOf _
         * @category Function
         * @param {Function} func The function to restrict.
         * @returns {Function} Returns the new restricted function.
         * @example
         *
         * var initialize = _.once(createApplication);
         * initialize();
         * initialize();
         * // `initialize` invokes `createApplication` once
         */
        function once(func) {
          return before(2, func);
        }
    
        /**
         * Creates a function that invokes `func` with `partial` arguments prepended
         * to those provided to the new function. This method is like `_.bind` except
         * it does **not** alter the `this` binding.
         *
         * The `_.partial.placeholder` value, which defaults to `_` in monolithic
         * builds, may be used as a placeholder for partially applied arguments.
         *
         * **Note:** This method does not set the "length" property of partially
         * applied functions.
         *
         * @static
         * @memberOf _
         * @category Function
         * @param {Function} func The function to partially apply arguments to.
         * @param {...*} [partials] The arguments to be partially applied.
         * @returns {Function} Returns the new partially applied function.
         * @example
         *
         * var greet = function(greeting, name) {
         *   return greeting + ' ' + name;
         * };
         *
         * var sayHelloTo = _.partial(greet, 'hello');
         * sayHelloTo('fred');
         * // => 'hello fred'
         *
         * // using placeholders
         * var greetFred = _.partial(greet, _, 'fred');
         * greetFred('hi');
         * // => 'hi fred'
         */
        var partial = createPartial(PARTIAL_FLAG);
    
        /**
         * This method is like `_.partial` except that partially applied arguments
         * are appended to those provided to the new function.
         *
         * The `_.partialRight.placeholder` value, which defaults to `_` in monolithic
         * builds, may be used as a placeholder for partially applied arguments.
         *
         * **Note:** This method does not set the "length" property of partially
         * applied functions.
         *
         * @static
         * @memberOf _
         * @category Function
         * @param {Function} func The function to partially apply arguments to.
         * @param {...*} [partials] The arguments to be partially applied.
         * @returns {Function} Returns the new partially applied function.
         * @example
         *
         * var greet = function(greeting, name) {
         *   return greeting + ' ' + name;
         * };
         *
         * var greetFred = _.partialRight(greet, 'fred');
         * greetFred('hi');
         * // => 'hi fred'
         *
         * // using placeholders
         * var sayHelloTo = _.partialRight(greet, 'hello', _);
         * sayHelloTo('fred');
         * // => 'hello fred'
         */
        var partialRight = createPartial(PARTIAL_RIGHT_FLAG);
    
        /**
         * Creates a function that invokes `func` with arguments arranged according
         * to the specified indexes where the argument value at the first index is
         * provided as the first argument, the argument value at the second index is
         * provided as the second argument, and so on.
         *
         * @static
         * @memberOf _
         * @category Function
         * @param {Function} func The function to rearrange arguments for.
         * @param {...(number|number[])} indexes The arranged argument indexes,
         *  specified as individual indexes or arrays of indexes.
         * @returns {Function} Returns the new function.
         * @example
         *
         * var rearged = _.rearg(function(a, b, c) {
         *   return [a, b, c];
         * }, 2, 0, 1);
         *
         * rearged('b', 'c', 'a')
         * // => ['a', 'b', 'c']
         *
         * var map = _.rearg(_.map, [1, 0]);
         * map(function(n) {
         *   return n * 3;
         * }, [1, 2, 3]);
         * // => [3, 6, 9]
         */
        var rearg = restParam(function(func, indexes) {
          return createWrapper(func, REARG_FLAG, null, null, null, baseFlatten(indexes));
        });
    
        /**
         * Creates a function that invokes `func` with the `this` binding of the
         * created function and arguments from `start` and beyond provided as an array.
         *
         * **Note:** This method is based on the [rest parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters).
         *
         * @static
         * @memberOf _
         * @category Function
         * @param {Function} func The function to apply a rest parameter to.
         * @param {number} [start=func.length-1] The start position of the rest parameter.
         * @returns {Function} Returns the new function.
         * @example
         *
         * var say = _.restParam(function(what, names) {
         *   return what + ' ' + _.initial(names).join(', ') +
         *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
         * });
         *
         * say('hello', 'fred', 'barney', 'pebbles');
         * // => 'hello fred, barney, & pebbles'
         */
        function restParam(func, start) {
          if (typeof func != 'function') {
            throw new TypeError(FUNC_ERROR_TEXT);
          }
          start = nativeMax(start === undefined ? (func.length - 1) : (+start || 0), 0);
          return function() {
            var args = arguments,
                index = -1,
                length = nativeMax(args.length - start, 0),
                rest = Array(length);
    
            while (++index < length) {
              rest[index] = args[start + index];
            }
            switch (start) {
              case 0: return func.call(this, rest);
              case 1: return func.call(this, args[0], rest);
              case 2: return func.call(this, args[0], args[1], rest);
            }
            var otherArgs = Array(start + 1);
            index = -1;
            while (++index < start) {
              otherArgs[index] = args[index];
            }
            otherArgs[start] = rest;
            return func.apply(this, otherArgs);
          };
        }
    
        /**
         * Creates a function that invokes `func` with the `this` binding of the created
         * function and an array of arguments much like [`Function#apply`](https://es5.github.io/#x15.3.4.3).
         *
         * **Note:** This method is based on the [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator).
         *
         * @static
         * @memberOf _
         * @category Function
         * @param {Function} func The function to spread arguments over.
         * @returns {Function} Returns the new function.
         * @example
         *
         * var say = _.spread(function(who, what) {
         *   return who + ' says ' + what;
         * });
         *
         * say(['fred', 'hello']);
         * // => 'fred says hello'
         *
         * // with a Promise
         * var numbers = Promise.all([
         *   Promise.resolve(40),
         *   Promise.resolve(36)
         * ]);
         *
         * numbers.then(_.spread(function(x, y) {
         *   return x + y;
         * }));
         * // => a Promise of 76
         */
        function spread(func) {
          if (typeof func != 'function') {
            throw new TypeError(FUNC_ERROR_TEXT);
          }
          return function(array) {
            return func.apply(this, array);
          };
        }
    
        /**
         * Creates a throttled function that only invokes `func` at most once per
         * every `wait` milliseconds. The throttled function comes with a `cancel`
         * method to cancel delayed invocations. Provide an options object to indicate
         * that `func` should be invoked on the leading and/or trailing edge of the
         * `wait` timeout. Subsequent calls to the throttled function return the
         * result of the last `func` call.
         *
         * **Note:** If `leading` and `trailing` options are `true`, `func` is invoked
         * on the trailing edge of the timeout only if the the throttled function is
         * invoked more than once during the `wait` timeout.
         *
         * See [David Corbacho's article](http://drupalmotion.com/article/debounce-and-throttle-visual-explanation)
         * for details over the differences between `_.throttle` and `_.debounce`.
         *
         * @static
         * @memberOf _
         * @category Function
         * @param {Function} func The function to throttle.
         * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
         * @param {Object} [options] The options object.
         * @param {boolean} [options.leading=true] Specify invoking on the leading
         *  edge of the timeout.
         * @param {boolean} [options.trailing=true] Specify invoking on the trailing
         *  edge of the timeout.
         * @returns {Function} Returns the new throttled function.
         * @example
         *
         * // avoid excessively updating the position while scrolling
         * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
         *
         * // invoke `renewToken` when the click event is fired, but not more than once every 5 minutes
         * jQuery('.interactive').on('click', _.throttle(renewToken, 300000, {
         *   'trailing': false
         * }));
         *
         * // cancel a trailing throttled call
         * jQuery(window).on('popstate', throttled.cancel);
         */
        function throttle(func, wait, options) {
          var leading = true,
              trailing = true;
    
          if (typeof func != 'function') {
            throw new TypeError(FUNC_ERROR_TEXT);
          }
          if (options === false) {
            leading = false;
          } else if (isObject(options)) {
            leading = 'leading' in options ? !!options.leading : leading;
            trailing = 'trailing' in options ? !!options.trailing : trailing;
          }
          debounceOptions.leading = leading;
          debounceOptions.maxWait = +wait;
          debounceOptions.trailing = trailing;
          return debounce(func, wait, debounceOptions);
        }
    
        /**
         * Creates a function that provides `value` to the wrapper function as its
         * first argument. Any additional arguments provided to the function are
         * appended to those provided to the wrapper function. The wrapper is invoked
         * with the `this` binding of the created function.
         *
         * @static
         * @memberOf _
         * @category Function
         * @param {*} value The value to wrap.
         * @param {Function} wrapper The wrapper function.
         * @returns {Function} Returns the new function.
         * @example
         *
         * var p = _.wrap(_.escape, function(func, text) {
         *   return '<p>' + func(text) + '</p>';
         * });
         *
         * p('fred, barney, & pebbles');
         * // => '<p>fred, barney, &amp; pebbles</p>'
         */
        function wrap(value, wrapper) {
          wrapper = wrapper == null ? identity : wrapper;
          return createWrapper(wrapper, PARTIAL_FLAG, null, [value], []);
        }
    
        /*------------------------------------------------------------------------*/
    
        /**
         * Creates a clone of `value`. If `isDeep` is `true` nested objects are cloned,
         * otherwise they are assigned by reference. If `customizer` is provided it is
         * invoked to produce the cloned values. If `customizer` returns `undefined`
         * cloning is handled by the method instead. The `customizer` is bound to
         * `thisArg` and invoked with two argument; (value [, index|key, object]).
         *
         * **Note:** This method is loosely based on the
         * [structured clone algorithm](http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm).
         * The enumerable properties of `arguments` objects and objects created by
         * constructors other than `Object` are cloned to plain `Object` objects. An
         * empty object is returned for uncloneable values such as functions, DOM nodes,
         * Maps, Sets, and WeakMaps.
         *
         * @static
         * @memberOf _
         * @category Lang
         * @param {*} value The value to clone.
         * @param {boolean} [isDeep] Specify a deep clone.
         * @param {Function} [customizer] The function to customize cloning values.
         * @param {*} [thisArg] The `this` binding of `customizer`.
         * @returns {*} Returns the cloned value.
         * @example
         *
         * var users = [
         *   { 'user': 'barney' },
         *   { 'user': 'fred' }
         * ];
         *
         * var shallow = _.clone(users);
         * shallow[0] === users[0];
         * // => true
         *
         * var deep = _.clone(users, true);
         * deep[0] === users[0];
         * // => false
         *
         * // using a customizer callback
         * var el = _.clone(document.body, function(value) {
         *   if (_.isElement(value)) {
         *     return value.cloneNode(false);
         *   }
         * });
         *
         * el === document.body
         * // => false
         * el.nodeName
         * // => BODY
         * el.childNodes.length;
         * // => 0
         */
        function clone(value, isDeep, customizer, thisArg) {
          if (isDeep && typeof isDeep != 'boolean' && isIterateeCall(value, isDeep, customizer)) {
            isDeep = false;
          }
          else if (typeof isDeep == 'function') {
            thisArg = customizer;
            customizer = isDeep;
            isDeep = false;
          }
          return typeof customizer == 'function'
            ? baseClone(value, isDeep, bindCallback(customizer, thisArg, 1))
            : baseClone(value, isDeep);
        }
    
        /**
         * Creates a deep clone of `value`. If `customizer` is provided it is invoked
         * to produce the cloned values. If `customizer` returns `undefined` cloning
         * is handled by the method instead. The `customizer` is bound to `thisArg`
         * and invoked with two argument; (value [, index|key, object]).
         *
         * **Note:** This method is loosely based on the
         * [structured clone algorithm](http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm).
         * The enumerable properties of `arguments` objects and objects created by
         * constructors other than `Object` are cloned to plain `Object` objects. An
         * empty object is returned for uncloneable values such as functions, DOM nodes,
         * Maps, Sets, and WeakMaps.
         *
         * @static
         * @memberOf _
         * @category Lang
         * @param {*} value The value to deep clone.
         * @param {Function} [customizer] The function to customize cloning values.
         * @param {*} [thisArg] The `this` binding of `customizer`.
         * @returns {*} Returns the deep cloned value.
         * @example
         *
         * var users = [
         *   { 'user': 'barney' },
         *   { 'user': 'fred' }
         * ];
         *
         * var deep = _.cloneDeep(users);
         * deep[0] === users[0];
         * // => false
         *
         * // using a customizer callback
         * var el = _.cloneDeep(document.body, function(value) {
         *   if (_.isElement(value)) {
         *     return value.cloneNode(true);
         *   }
         * });
         *
         * el === document.body
         * // => false
         * el.nodeName
         * // => BODY
         * el.childNodes.length;
         * // => 20
         */
        function cloneDeep(value, customizer, thisArg) {
          return typeof customizer == 'function'
            ? baseClone(value, true, bindCallback(customizer, thisArg, 1))
            : baseClone(value, true);
        }
    
        /**
         * Checks if `value` is greater than `other`.
         *
         * @static
         * @memberOf _
         * @category Lang
         * @param {*} value The value to compare.
         * @param {*} other The other value to compare.
         * @returns {boolean} Returns `true` if `value` is greater than `other`, else `false`.
         * @example
         *
         * _.gt(3, 1);
         * // => true
         *
         * _.gt(3, 3);
         * // => false
         *
         * _.gt(1, 3);
         * // => false
         */
        function gt(value, other) {
          return value > other;
        }
    
        /**
         * Checks if `value` is greater than or equal to `other`.
         *
         * @static
         * @memberOf _
         * @category Lang
         * @param {*} value The value to compare.
         * @param {*} other The other value to compare.
         * @returns {boolean} Returns `true` if `value` is greater than or equal to `other`, else `false`.
         * @example
         *
         * _.gte(3, 1);
         * // => true
         *
         * _.gte(3, 3);
         * // => true
         *
         * _.gte(1, 3);
         * // => false
         */
        function gte(value, other) {
          return value >= other;
        }
    
        /**
         * Checks if `value` is classified as an `arguments` object.
         *
         * @static
         * @memberOf _
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
         * @example
         *
         * _.isArguments(function() { return arguments; }());
         * // => true
         *
         * _.isArguments([1, 2, 3]);
         * // => false
         */
        function isArguments(value) {
          return isObjectLike(value) && isArrayLike(value) && objToString.call(value) == argsTag;
        }
    
        /**
         * Checks if `value` is classified as an `Array` object.
         *
         * @static
         * @memberOf _
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
         * @example
         *
         * _.isArray([1, 2, 3]);
         * // => true
         *
         * _.isArray(function() { return arguments; }());
         * // => false
         */
        var isArray = nativeIsArray || function(value) {
          return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
        };
    
        /**
         * Checks if `value` is classified as a boolean primitive or object.
         *
         * @static
         * @memberOf _
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
         * @example
         *
         * _.isBoolean(false);
         * // => true
         *
         * _.isBoolean(null);
         * // => false
         */
        function isBoolean(value) {
          return value === true || value === false || (isObjectLike(value) && objToString.call(value) == boolTag);
        }
    
        /**
         * Checks if `value` is classified as a `Date` object.
         *
         * @static
         * @memberOf _
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
         * @example
         *
         * _.isDate(new Date);
         * // => true
         *
         * _.isDate('Mon April 23 2012');
         * // => false
         */
        function isDate(value) {
          return isObjectLike(value) && objToString.call(value) == dateTag;
        }
    
        /**
         * Checks if `value` is a DOM element.
         *
         * @static
         * @memberOf _
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is a DOM element, else `false`.
         * @example
         *
         * _.isElement(document.body);
         * // => true
         *
         * _.isElement('<body>');
         * // => false
         */
        function isElement(value) {
          return !!value && value.nodeType === 1 && isObjectLike(value) &&
            (objToString.call(value).indexOf('Element') > -1);
        }
        // Fallback for environments without DOM support.
        if (!support.dom) {
          isElement = function(value) {
            return !!value && value.nodeType === 1 && isObjectLike(value) && !isPlainObject(value);
          };
        }
    
        /**
         * Checks if `value` is empty. A value is considered empty unless it is an
         * `arguments` object, array, string, or jQuery-like collection with a length
         * greater than `0` or an object with own enumerable properties.
         *
         * @static
         * @memberOf _
         * @category Lang
         * @param {Array|Object|string} value The value to inspect.
         * @returns {boolean} Returns `true` if `value` is empty, else `false`.
         * @example
         *
         * _.isEmpty(null);
         * // => true
         *
         * _.isEmpty(true);
         * // => true
         *
         * _.isEmpty(1);
         * // => true
         *
         * _.isEmpty([1, 2, 3]);
         * // => false
         *
         * _.isEmpty({ 'a': 1 });
         * // => false
         */
        function isEmpty(value) {
          if (value == null) {
            return true;
          }
          if (isArrayLike(value) && (isArray(value) || isString(value) || isArguments(value) ||
              (isObjectLike(value) && isFunction(value.splice)))) {
            return !value.length;
          }
          return !keys(value).length;
        }
    
        /**
         * Performs a deep comparison between two values to determine if they are
         * equivalent. If `customizer` is provided it is invoked to compare values.
         * If `customizer` returns `undefined` comparisons are handled by the method
         * instead. The `customizer` is bound to `thisArg` and invoked with three
         * arguments: (value, other [, index|key]).
         *
         * **Note:** This method supports comparing arrays, booleans, `Date` objects,
         * numbers, `Object` objects, regexes, and strings. Objects are compared by
         * their own, not inherited, enumerable properties. Functions and DOM nodes
         * are **not** supported. Provide a customizer function to extend support
         * for comparing other values.
         *
         * @static
         * @memberOf _
         * @alias eq
         * @category Lang
         * @param {*} value The value to compare.
         * @param {*} other The other value to compare.
         * @param {Function} [customizer] The function to customize value comparisons.
         * @param {*} [thisArg] The `this` binding of `customizer`.
         * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
         * @example
         *
         * var object = { 'user': 'fred' };
         * var other = { 'user': 'fred' };
         *
         * object == other;
         * // => false
         *
         * _.isEqual(object, other);
         * // => true
         *
         * // using a customizer callback
         * var array = ['hello', 'goodbye'];
         * var other = ['hi', 'goodbye'];
         *
         * _.isEqual(array, other, function(value, other) {
         *   if (_.every([value, other], RegExp.prototype.test, /^h(?:i|ello)$/)) {
         *     return true;
         *   }
         * });
         * // => true
         */
        function isEqual(value, other, customizer, thisArg) {
          customizer = typeof customizer == 'function' ? bindCallback(customizer, thisArg, 3) : undefined;
          var result = customizer ? customizer(value, other) : undefined;
          return  result === undefined ? baseIsEqual(value, other, customizer) : !!result;
        }
    
        /**
         * Checks if `value` is an `Error`, `EvalError`, `RangeError`, `ReferenceError`,
         * `SyntaxError`, `TypeError`, or `URIError` object.
         *
         * @static
         * @memberOf _
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is an error object, else `false`.
         * @example
         *
         * _.isError(new Error);
         * // => true
         *
         * _.isError(Error);
         * // => false
         */
        function isError(value) {
          return isObjectLike(value) && typeof value.message == 'string' && objToString.call(value) == errorTag;
        }
    
        /**
         * Checks if `value` is a finite primitive number.
         *
         * **Note:** This method is based on [`Number.isFinite`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.isfinite).
         *
         * @static
         * @memberOf _
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is a finite number, else `false`.
         * @example
         *
         * _.isFinite(10);
         * // => true
         *
         * _.isFinite('10');
         * // => false
         *
         * _.isFinite(true);
         * // => false
         *
         * _.isFinite(Object(10));
         * // => false
         *
         * _.isFinite(Infinity);
         * // => false
         */
        var isFinite = nativeNumIsFinite || function(value) {
          return typeof value == 'number' && nativeIsFinite(value);
        };
    
        /**
         * Checks if `value` is classified as a `Function` object.
         *
         * @static
         * @memberOf _
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
         * @example
         *
         * _.isFunction(_);
         * // => true
         *
         * _.isFunction(/abc/);
         * // => false
         */
        var isFunction = !(baseIsFunction(/x/) || (Uint8Array && !baseIsFunction(Uint8Array))) ? baseIsFunction : function(value) {
          // The use of `Object#toString` avoids issues with the `typeof` operator
          // in older versions of Chrome and Safari which return 'function' for regexes
          // and Safari 8 equivalents which return 'object' for typed array constructors.
          return objToString.call(value) == funcTag;
        };
    
        /**
         * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
         * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
         *
         * @static
         * @memberOf _
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is an object, else `false`.
         * @example
         *
         * _.isObject({});
         * // => true
         *
         * _.isObject([1, 2, 3]);
         * // => true
         *
         * _.isObject(1);
         * // => false
         */
        function isObject(value) {
          // Avoid a V8 JIT bug in Chrome 19-20.
          // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
          var type = typeof value;
          return !!value && (type == 'object' || type == 'function');
        }
    
        /**
         * Performs a deep comparison between `object` and `source` to determine if
         * `object` contains equivalent property values. If `customizer` is provided
         * it is invoked to compare values. If `customizer` returns `undefined`
         * comparisons are handled by the method instead. The `customizer` is bound
         * to `thisArg` and invoked with three arguments: (value, other, index|key).
         *
         * **Note:** This method supports comparing properties of arrays, booleans,
         * `Date` objects, numbers, `Object` objects, regexes, and strings. Functions
         * and DOM nodes are **not** supported. Provide a customizer function to extend
         * support for comparing other values.
         *
         * @static
         * @memberOf _
         * @category Lang
         * @param {Object} object The object to inspect.
         * @param {Object} source The object of property values to match.
         * @param {Function} [customizer] The function to customize value comparisons.
         * @param {*} [thisArg] The `this` binding of `customizer`.
         * @returns {boolean} Returns `true` if `object` is a match, else `false`.
         * @example
         *
         * var object = { 'user': 'fred', 'age': 40 };
         *
         * _.isMatch(object, { 'age': 40 });
         * // => true
         *
         * _.isMatch(object, { 'age': 36 });
         * // => false
         *
         * // using a customizer callback
         * var object = { 'greeting': 'hello' };
         * var source = { 'greeting': 'hi' };
         *
         * _.isMatch(object, source, function(value, other) {
         *   return _.every([value, other], RegExp.prototype.test, /^h(?:i|ello)$/) || undefined;
         * });
         * // => true
         */
        function isMatch(object, source, customizer, thisArg) {
          customizer = typeof customizer == 'function' ? bindCallback(customizer, thisArg, 3) : undefined;
          return baseIsMatch(object, getMatchData(source), customizer);
        }
    
        /**
         * Checks if `value` is `NaN`.
         *
         * **Note:** This method is not the same as [`isNaN`](https://es5.github.io/#x15.1.2.4)
         * which returns `true` for `undefined` and other non-numeric values.
         *
         * @static
         * @memberOf _
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
         * @example
         *
         * _.isNaN(NaN);
         * // => true
         *
         * _.isNaN(new Number(NaN));
         * // => true
         *
         * isNaN(undefined);
         * // => true
         *
         * _.isNaN(undefined);
         * // => false
         */
        function isNaN(value) {
          // An `NaN` primitive is the only value that is not equal to itself.
          // Perform the `toStringTag` check first to avoid errors with some host objects in IE.
          return isNumber(value) && value != +value;
        }
    
        /**
         * Checks if `value` is a native function.
         *
         * @static
         * @memberOf _
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
         * @example
         *
         * _.isNative(Array.prototype.push);
         * // => true
         *
         * _.isNative(_);
         * // => false
         */
        function isNative(value) {
          if (value == null) {
            return false;
          }
          if (objToString.call(value) == funcTag) {
            return reIsNative.test(fnToString.call(value));
          }
          return isObjectLike(value) && reIsHostCtor.test(value);
        }
    
        /**
         * Checks if `value` is `null`.
         *
         * @static
         * @memberOf _
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is `null`, else `false`.
         * @example
         *
         * _.isNull(null);
         * // => true
         *
         * _.isNull(void 0);
         * // => false
         */
        function isNull(value) {
          return value === null;
        }
    
        /**
         * Checks if `value` is classified as a `Number` primitive or object.
         *
         * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are classified
         * as numbers, use the `_.isFinite` method.
         *
         * @static
         * @memberOf _
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
         * @example
         *
         * _.isNumber(8.4);
         * // => true
         *
         * _.isNumber(NaN);
         * // => true
         *
         * _.isNumber('8.4');
         * // => false
         */
        function isNumber(value) {
          return typeof value == 'number' || (isObjectLike(value) && objToString.call(value) == numberTag);
        }
    
        /**
         * Checks if `value` is a plain object, that is, an object created by the
         * `Object` constructor or one with a `[[Prototype]]` of `null`.
         *
         * **Note:** This method assumes objects created by the `Object` constructor
         * have no inherited enumerable properties.
         *
         * @static
         * @memberOf _
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
         * @example
         *
         * function Foo() {
         *   this.a = 1;
         * }
         *
         * _.isPlainObject(new Foo);
         * // => false
         *
         * _.isPlainObject([1, 2, 3]);
         * // => false
         *
         * _.isPlainObject({ 'x': 0, 'y': 0 });
         * // => true
         *
         * _.isPlainObject(Object.create(null));
         * // => true
         */
        var isPlainObject = !getPrototypeOf ? shimIsPlainObject : function(value) {
          if (!(value && objToString.call(value) == objectTag)) {
            return false;
          }
          var valueOf = getNative(value, 'valueOf'),
              objProto = valueOf && (objProto = getPrototypeOf(valueOf)) && getPrototypeOf(objProto);
    
          return objProto
            ? (value == objProto || getPrototypeOf(value) == objProto)
            : shimIsPlainObject(value);
        };
    
        /**
         * Checks if `value` is classified as a `RegExp` object.
         *
         * @static
         * @memberOf _
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
         * @example
         *
         * _.isRegExp(/abc/);
         * // => true
         *
         * _.isRegExp('/abc/');
         * // => false
         */
        function isRegExp(value) {
          return isObjectLike(value) && objToString.call(value) == regexpTag;
        }
    
        /**
         * Checks if `value` is classified as a `String` primitive or object.
         *
         * @static
         * @memberOf _
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
         * @example
         *
         * _.isString('abc');
         * // => true
         *
         * _.isString(1);
         * // => false
         */
        function isString(value) {
          return typeof value == 'string' || (isObjectLike(value) && objToString.call(value) == stringTag);
        }
    
        /**
         * Checks if `value` is classified as a typed array.
         *
         * @static
         * @memberOf _
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
         * @example
         *
         * _.isTypedArray(new Uint8Array);
         * // => true
         *
         * _.isTypedArray([]);
         * // => false
         */
        function isTypedArray(value) {
          return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objToString.call(value)];
        }
    
        /**
         * Checks if `value` is `undefined`.
         *
         * @static
         * @memberOf _
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
         * @example
         *
         * _.isUndefined(void 0);
         * // => true
         *
         * _.isUndefined(null);
         * // => false
         */
        function isUndefined(value) {
          return value === undefined;
        }
    
        /**
         * Checks if `value` is less than `other`.
         *
         * @static
         * @memberOf _
         * @category Lang
         * @param {*} value The value to compare.
         * @param {*} other The other value to compare.
         * @returns {boolean} Returns `true` if `value` is less than `other`, else `false`.
         * @example
         *
         * _.lt(1, 3);
         * // => true
         *
         * _.lt(3, 3);
         * // => false
         *
         * _.lt(3, 1);
         * // => false
         */
        function lt(value, other) {
          return value < other;
        }
    
        /**
         * Checks if `value` is less than or equal to `other`.
         *
         * @static
         * @memberOf _
         * @category Lang
         * @param {*} value The value to compare.
         * @param {*} other The other value to compare.
         * @returns {boolean} Returns `true` if `value` is less than or equal to `other`, else `false`.
         * @example
         *
         * _.lte(1, 3);
         * // => true
         *
         * _.lte(3, 3);
         * // => true
         *
         * _.lte(3, 1);
         * // => false
         */
        function lte(value, other) {
          return value <= other;
        }
    
        /**
         * Converts `value` to an array.
         *
         * @static
         * @memberOf _
         * @category Lang
         * @param {*} value The value to convert.
         * @returns {Array} Returns the converted array.
         * @example
         *
         * (function() {
         *   return _.toArray(arguments).slice(1);
         * }(1, 2, 3));
         * // => [2, 3]
         */
        function toArray(value) {
          var length = value ? getLength(value) : 0;
          if (!isLength(length)) {
            return values(value);
          }
          if (!length) {
            return [];
          }
          return arrayCopy(value);
        }
    
        /**
         * Converts `value` to a plain object flattening inherited enumerable
         * properties of `value` to own properties of the plain object.
         *
         * @static
         * @memberOf _
         * @category Lang
         * @param {*} value The value to convert.
         * @returns {Object} Returns the converted plain object.
         * @example
         *
         * function Foo() {
         *   this.b = 2;
         * }
         *
         * Foo.prototype.c = 3;
         *
         * _.assign({ 'a': 1 }, new Foo);
         * // => { 'a': 1, 'b': 2 }
         *
         * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
         * // => { 'a': 1, 'b': 2, 'c': 3 }
         */
        function toPlainObject(value) {
          return baseCopy(value, keysIn(value));
        }
    
        /*------------------------------------------------------------------------*/
    
        /**
         * Assigns own enumerable properties of source object(s) to the destination
         * object. Subsequent sources overwrite property assignments of previous sources.
         * If `customizer` is provided it is invoked to produce the assigned values.
         * The `customizer` is bound to `thisArg` and invoked with five arguments:
         * (objectValue, sourceValue, key, object, source).
         *
         * **Note:** This method mutates `object` and is based on
         * [`Object.assign`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.assign).
         *
         * @static
         * @memberOf _
         * @alias extend
         * @category Object
         * @param {Object} object The destination object.
         * @param {...Object} [sources] The source objects.
         * @param {Function} [customizer] The function to customize assigned values.
         * @param {*} [thisArg] The `this` binding of `customizer`.
         * @returns {Object} Returns `object`.
         * @example
         *
         * _.assign({ 'user': 'barney' }, { 'age': 40 }, { 'user': 'fred' });
         * // => { 'user': 'fred', 'age': 40 }
         *
         * // using a customizer callback
         * var defaults = _.partialRight(_.assign, function(value, other) {
         *   return _.isUndefined(value) ? other : value;
         * });
         *
         * defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
         * // => { 'user': 'barney', 'age': 36 }
         */
        var assign = createAssigner(function(object, source, customizer) {
          return customizer
            ? assignWith(object, source, customizer)
            : baseAssign(object, source);
        });
    
        /**
         * Creates an object that inherits from the given `prototype` object. If a
         * `properties` object is provided its own enumerable properties are assigned
         * to the created object.
         *
         * @static
         * @memberOf _
         * @category Object
         * @param {Object} prototype The object to inherit from.
         * @param {Object} [properties] The properties to assign to the object.
         * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
         * @returns {Object} Returns the new object.
         * @example
         *
         * function Shape() {
         *   this.x = 0;
         *   this.y = 0;
         * }
         *
         * function Circle() {
         *   Shape.call(this);
         * }
         *
         * Circle.prototype = _.create(Shape.prototype, {
         *   'constructor': Circle
         * });
         *
         * var circle = new Circle;
         * circle instanceof Circle;
         * // => true
         *
         * circle instanceof Shape;
         * // => true
         */
        function create(prototype, properties, guard) {
          var result = baseCreate(prototype);
          if (guard && isIterateeCall(prototype, properties, guard)) {
            properties = null;
          }
          return properties ? baseAssign(result, properties) : result;
        }
    
        /**
         * Assigns own enumerable properties of source object(s) to the destination
         * object for all destination properties that resolve to `undefined`. Once a
         * property is set, additional values of the same property are ignored.
         *
         * **Note:** This method mutates `object`.
         *
         * @static
         * @memberOf _
         * @category Object
         * @param {Object} object The destination object.
         * @param {...Object} [sources] The source objects.
         * @returns {Object} Returns `object`.
         * @example
         *
         * _.defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
         * // => { 'user': 'barney', 'age': 36 }
         */
        var defaults = restParam(function(args) {
          var object = args[0];
          if (object == null) {
            return object;
          }
          args.push(assignDefaults);
          return assign.apply(undefined, args);
        });
    
        /**
         * This method is like `_.find` except that it returns the key of the first
         * element `predicate` returns truthy for instead of the element itself.
         *
         * If a property name is provided for `predicate` the created `_.property`
         * style callback returns the property value of the given element.
         *
         * If a value is also provided for `thisArg` the created `_.matchesProperty`
         * style callback returns `true` for elements that have a matching property
         * value, else `false`.
         *
         * If an object is provided for `predicate` the created `_.matches` style
         * callback returns `true` for elements that have the properties of the given
         * object, else `false`.
         *
         * @static
         * @memberOf _
         * @category Object
         * @param {Object} object The object to search.
         * @param {Function|Object|string} [predicate=_.identity] The function invoked
         *  per iteration.
         * @param {*} [thisArg] The `this` binding of `predicate`.
         * @returns {string|undefined} Returns the key of the matched element, else `undefined`.
         * @example
         *
         * var users = {
         *   'barney':  { 'age': 36, 'active': true },
         *   'fred':    { 'age': 40, 'active': false },
         *   'pebbles': { 'age': 1,  'active': true }
         * };
         *
         * _.findKey(users, function(chr) {
         *   return chr.age < 40;
         * });
         * // => 'barney' (iteration order is not guaranteed)
         *
         * // using the `_.matches` callback shorthand
         * _.findKey(users, { 'age': 1, 'active': true });
         * // => 'pebbles'
         *
         * // using the `_.matchesProperty` callback shorthand
         * _.findKey(users, 'active', false);
         * // => 'fred'
         *
         * // using the `_.property` callback shorthand
         * _.findKey(users, 'active');
         * // => 'barney'
         */
        var findKey = createFindKey(baseForOwn);
    
        /**
         * This method is like `_.findKey` except that it iterates over elements of
         * a collection in the opposite order.
         *
         * If a property name is provided for `predicate` the created `_.property`
         * style callback returns the property value of the given element.
         *
         * If a value is also provided for `thisArg` the created `_.matchesProperty`
         * style callback returns `true` for elements that have a matching property
         * value, else `false`.
         *
         * If an object is provided for `predicate` the created `_.matches` style
         * callback returns `true` for elements that have the properties of the given
         * object, else `false`.
         *
         * @static
         * @memberOf _
         * @category Object
         * @param {Object} object The object to search.
         * @param {Function|Object|string} [predicate=_.identity] The function invoked
         *  per iteration.
         * @param {*} [thisArg] The `this` binding of `predicate`.
         * @returns {string|undefined} Returns the key of the matched element, else `undefined`.
         * @example
         *
         * var users = {
         *   'barney':  { 'age': 36, 'active': true },
         *   'fred':    { 'age': 40, 'active': false },
         *   'pebbles': { 'age': 1,  'active': true }
         * };
         *
         * _.findLastKey(users, function(chr) {
         *   return chr.age < 40;
         * });
         * // => returns `pebbles` assuming `_.findKey` returns `barney`
         *
         * // using the `_.matches` callback shorthand
         * _.findLastKey(users, { 'age': 36, 'active': true });
         * // => 'barney'
         *
         * // using the `_.matchesProperty` callback shorthand
         * _.findLastKey(users, 'active', false);
         * // => 'fred'
         *
         * // using the `_.property` callback shorthand
         * _.findLastKey(users, 'active');
         * // => 'pebbles'
         */
        var findLastKey = createFindKey(baseForOwnRight);
    
        /**
         * Iterates over own and inherited enumerable properties of an object invoking
         * `iteratee` for each property. The `iteratee` is bound to `thisArg` and invoked
         * with three arguments: (value, key, object). Iteratee functions may exit
         * iteration early by explicitly returning `false`.
         *
         * @static
         * @memberOf _
         * @category Object
         * @param {Object} object The object to iterate over.
         * @param {Function} [iteratee=_.identity] The function invoked per iteration.
         * @param {*} [thisArg] The `this` binding of `iteratee`.
         * @returns {Object} Returns `object`.
         * @example
         *
         * function Foo() {
         *   this.a = 1;
         *   this.b = 2;
         * }
         *
         * Foo.prototype.c = 3;
         *
         * _.forIn(new Foo, function(value, key) {
         *   console.log(key);
         * });
         * // => logs 'a', 'b', and 'c' (iteration order is not guaranteed)
         */
        var forIn = createForIn(baseFor);
    
        /**
         * This method is like `_.forIn` except that it iterates over properties of
         * `object` in the opposite order.
         *
         * @static
         * @memberOf _
         * @category Object
         * @param {Object} object The object to iterate over.
         * @param {Function} [iteratee=_.identity] The function invoked per iteration.
         * @param {*} [thisArg] The `this` binding of `iteratee`.
         * @returns {Object} Returns `object`.
         * @example
         *
         * function Foo() {
         *   this.a = 1;
         *   this.b = 2;
         * }
         *
         * Foo.prototype.c = 3;
         *
         * _.forInRight(new Foo, function(value, key) {
         *   console.log(key);
         * });
         * // => logs 'c', 'b', and 'a' assuming `_.forIn ` logs 'a', 'b', and 'c'
         */
        var forInRight = createForIn(baseForRight);
    
        /**
         * Iterates over own enumerable properties of an object invoking `iteratee`
         * for each property. The `iteratee` is bound to `thisArg` and invoked with
         * three arguments: (value, key, object). Iteratee functions may exit iteration
         * early by explicitly returning `false`.
         *
         * @static
         * @memberOf _
         * @category Object
         * @param {Object} object The object to iterate over.
         * @param {Function} [iteratee=_.identity] The function invoked per iteration.
         * @param {*} [thisArg] The `this` binding of `iteratee`.
         * @returns {Object} Returns `object`.
         * @example
         *
         * function Foo() {
         *   this.a = 1;
         *   this.b = 2;
         * }
         *
         * Foo.prototype.c = 3;
         *
         * _.forOwn(new Foo, function(value, key) {
         *   console.log(key);
         * });
         * // => logs 'a' and 'b' (iteration order is not guaranteed)
         */
        var forOwn = createForOwn(baseForOwn);
    
        /**
         * This method is like `_.forOwn` except that it iterates over properties of
         * `object` in the opposite order.
         *
         * @static
         * @memberOf _
         * @category Object
         * @param {Object} object The object to iterate over.
         * @param {Function} [iteratee=_.identity] The function invoked per iteration.
         * @param {*} [thisArg] The `this` binding of `iteratee`.
         * @returns {Object} Returns `object`.
         * @example
         *
         * function Foo() {
         *   this.a = 1;
         *   this.b = 2;
         * }
         *
         * Foo.prototype.c = 3;
         *
         * _.forOwnRight(new Foo, function(value, key) {
         *   console.log(key);
         * });
         * // => logs 'b' and 'a' assuming `_.forOwn` logs 'a' and 'b'
         */
        var forOwnRight = createForOwn(baseForOwnRight);
    
        /**
         * Creates an array of function property names from all enumerable properties,
         * own and inherited, of `object`.
         *
         * @static
         * @memberOf _
         * @alias methods
         * @category Object
         * @param {Object} object The object to inspect.
         * @returns {Array} Returns the new array of property names.
         * @example
         *
         * _.functions(_);
         * // => ['after', 'ary', 'assign', ...]
         */
        function functions(object) {
          return baseFunctions(object, keysIn(object));
        }
    
        /**
         * Gets the property value at `path` of `object`. If the resolved value is
         * `undefined` the `defaultValue` is used in its place.
         *
         * @static
         * @memberOf _
         * @category Object
         * @param {Object} object The object to query.
         * @param {Array|string} path The path of the property to get.
         * @param {*} [defaultValue] The value returned if the resolved value is `undefined`.
         * @returns {*} Returns the resolved value.
         * @example
         *
         * var object = { 'a': [{ 'b': { 'c': 3 } }] };
         *
         * _.get(object, 'a[0].b.c');
         * // => 3
         *
         * _.get(object, ['a', '0', 'b', 'c']);
         * // => 3
         *
         * _.get(object, 'a.b.c', 'default');
         * // => 'default'
         */
        function get(object, path, defaultValue) {
          var result = object == null ? undefined : baseGet(object, toPath(path), path + '');
          return result === undefined ? defaultValue : result;
        }
    
        /**
         * Checks if `path` is a direct property.
         *
         * @static
         * @memberOf _
         * @category Object
         * @param {Object} object The object to query.
         * @param {Array|string} path The path to check.
         * @returns {boolean} Returns `true` if `path` is a direct property, else `false`.
         * @example
         *
         * var object = { 'a': { 'b': { 'c': 3 } } };
         *
         * _.has(object, 'a');
         * // => true
         *
         * _.has(object, 'a.b.c');
         * // => true
         *
         * _.has(object, ['a', 'b', 'c']);
         * // => true
         */
        function has(object, path) {
          if (object == null) {
            return false;
          }
          var result = hasOwnProperty.call(object, path);
          if (!result && !isKey(path)) {
            path = toPath(path);
            object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
            if (object == null) {
              return false;
            }
            path = last(path);
            result = hasOwnProperty.call(object, path);
          }
          return result || (isLength(object.length) && isIndex(path, object.length) &&
            (isArray(object) || isArguments(object)));
        }
    
        /**
         * Creates an object composed of the inverted keys and values of `object`.
         * If `object` contains duplicate values, subsequent values overwrite property
         * assignments of previous values unless `multiValue` is `true`.
         *
         * @static
         * @memberOf _
         * @category Object
         * @param {Object} object The object to invert.
         * @param {boolean} [multiValue] Allow multiple values per key.
         * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
         * @returns {Object} Returns the new inverted object.
         * @example
         *
         * var object = { 'a': 1, 'b': 2, 'c': 1 };
         *
         * _.invert(object);
         * // => { '1': 'c', '2': 'b' }
         *
         * // with `multiValue`
         * _.invert(object, true);
         * // => { '1': ['a', 'c'], '2': ['b'] }
         */
        function invert(object, multiValue, guard) {
          if (guard && isIterateeCall(object, multiValue, guard)) {
            multiValue = null;
          }
          var index = -1,
              props = keys(object),
              length = props.length,
              result = {};
    
          while (++index < length) {
            var key = props[index],
                value = object[key];
    
            if (multiValue) {
              if (hasOwnProperty.call(result, value)) {
                result[value].push(key);
              } else {
                result[value] = [key];
              }
            }
            else {
              result[value] = key;
            }
          }
          return result;
        }
    
        /**
         * Creates an array of the own enumerable property names of `object`.
         *
         * **Note:** Non-object values are coerced to objects. See the
         * [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.keys)
         * for more details.
         *
         * @static
         * @memberOf _
         * @category Object
         * @param {Object} object The object to query.
         * @returns {Array} Returns the array of property names.
         * @example
         *
         * function Foo() {
         *   this.a = 1;
         *   this.b = 2;
         * }
         *
         * Foo.prototype.c = 3;
         *
         * _.keys(new Foo);
         * // => ['a', 'b'] (iteration order is not guaranteed)
         *
         * _.keys('hi');
         * // => ['0', '1']
         */
        var keys = !nativeKeys ? shimKeys : function(object) {
          var Ctor = object == null ? null : object.constructor;
          if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
              (typeof object != 'function' && isArrayLike(object))) {
            return shimKeys(object);
          }
          return isObject(object) ? nativeKeys(object) : [];
        };
    
        /**
         * Creates an array of the own and inherited enumerable property names of `object`.
         *
         * **Note:** Non-object values are coerced to objects.
         *
         * @static
         * @memberOf _
         * @category Object
         * @param {Object} object The object to query.
         * @returns {Array} Returns the array of property names.
         * @example
         *
         * function Foo() {
         *   this.a = 1;
         *   this.b = 2;
         * }
         *
         * Foo.prototype.c = 3;
         *
         * _.keysIn(new Foo);
         * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
         */
        function keysIn(object) {
          if (object == null) {
            return [];
          }
          if (!isObject(object)) {
            object = Object(object);
          }
          var length = object.length;
          length = (length && isLength(length) &&
            (isArray(object) || isArguments(object)) && length) || 0;
    
          var Ctor = object.constructor,
              index = -1,
              isProto = typeof Ctor == 'function' && Ctor.prototype === object,
              result = Array(length),
              skipIndexes = length > 0;
    
          while (++index < length) {
            result[index] = (index + '');
          }
          for (var key in object) {
            if (!(skipIndexes && isIndex(key, length)) &&
                !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
              result.push(key);
            }
          }
          return result;
        }
    
        /**
         * The opposite of `_.mapValues`; this method creates an object with the
         * same values as `object` and keys generated by running each own enumerable
         * property of `object` through `iteratee`.
         *
         * @static
         * @memberOf _
         * @category Object
         * @param {Object} object The object to iterate over.
         * @param {Function|Object|string} [iteratee=_.identity] The function invoked
         *  per iteration.
         * @param {*} [thisArg] The `this` binding of `iteratee`.
         * @returns {Object} Returns the new mapped object.
         * @example
         *
         * _.mapKeys({ 'a': 1, 'b': 2 }, function(value, key) {
         *   return key + value;
         * });
         * // => { 'a1': 1, 'b2': 2 }
         */
        var mapKeys = createObjectMapper(true);
    
        /**
         * Creates an object with the same keys as `object` and values generated by
         * running each own enumerable property of `object` through `iteratee`. The
         * iteratee function is bound to `thisArg` and invoked with three arguments:
         * (value, key, object).
         *
         * If a property name is provided for `iteratee` the created `_.property`
         * style callback returns the property value of the given element.
         *
         * If a value is also provided for `thisArg` the created `_.matchesProperty`
         * style callback returns `true` for elements that have a matching property
         * value, else `false`.
         *
         * If an object is provided for `iteratee` the created `_.matches` style
         * callback returns `true` for elements that have the properties of the given
         * object, else `false`.
         *
         * @static
         * @memberOf _
         * @category Object
         * @param {Object} object The object to iterate over.
         * @param {Function|Object|string} [iteratee=_.identity] The function invoked
         *  per iteration.
         * @param {*} [thisArg] The `this` binding of `iteratee`.
         * @returns {Object} Returns the new mapped object.
         * @example
         *
         * _.mapValues({ 'a': 1, 'b': 2 }, function(n) {
         *   return n * 3;
         * });
         * // => { 'a': 3, 'b': 6 }
         *
         * var users = {
         *   'fred':    { 'user': 'fred',    'age': 40 },
         *   'pebbles': { 'user': 'pebbles', 'age': 1 }
         * };
         *
         * // using the `_.property` callback shorthand
         * _.mapValues(users, 'age');
         * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
         */
        var mapValues = createObjectMapper();
    
        /**
         * Recursively merges own enumerable properties of the source object(s), that
         * don't resolve to `undefined` into the destination object. Subsequent sources
         * overwrite property assignments of previous sources. If `customizer` is
         * provided it is invoked to produce the merged values of the destination and
         * source properties. If `customizer` returns `undefined` merging is handled
         * by the method instead. The `customizer` is bound to `thisArg` and invoked
         * with five arguments: (objectValue, sourceValue, key, object, source).
         *
         * @static
         * @memberOf _
         * @category Object
         * @param {Object} object The destination object.
         * @param {...Object} [sources] The source objects.
         * @param {Function} [customizer] The function to customize assigned values.
         * @param {*} [thisArg] The `this` binding of `customizer`.
         * @returns {Object} Returns `object`.
         * @example
         *
         * var users = {
         *   'data': [{ 'user': 'barney' }, { 'user': 'fred' }]
         * };
         *
         * var ages = {
         *   'data': [{ 'age': 36 }, { 'age': 40 }]
         * };
         *
         * _.merge(users, ages);
         * // => { 'data': [{ 'user': 'barney', 'age': 36 }, { 'user': 'fred', 'age': 40 }] }
         *
         * // using a customizer callback
         * var object = {
         *   'fruits': ['apple'],
         *   'vegetables': ['beet']
         * };
         *
         * var other = {
         *   'fruits': ['banana'],
         *   'vegetables': ['carrot']
         * };
         *
         * _.merge(object, other, function(a, b) {
         *   if (_.isArray(a)) {
         *     return a.concat(b);
         *   }
         * });
         * // => { 'fruits': ['apple', 'banana'], 'vegetables': ['beet', 'carrot'] }
         */
        var merge = createAssigner(baseMerge);
    
        /**
         * The opposite of `_.pick`; this method creates an object composed of the
         * own and inherited enumerable properties of `object` that are not omitted.
         *
         * @static
         * @memberOf _
         * @category Object
         * @param {Object} object The source object.
         * @param {Function|...(string|string[])} [predicate] The function invoked per
         *  iteration or property names to omit, specified as individual property
         *  names or arrays of property names.
         * @param {*} [thisArg] The `this` binding of `predicate`.
         * @returns {Object} Returns the new object.
         * @example
         *
         * var object = { 'user': 'fred', 'age': 40 };
         *
         * _.omit(object, 'age');
         * // => { 'user': 'fred' }
         *
         * _.omit(object, _.isNumber);
         * // => { 'user': 'fred' }
         */
        var omit = restParam(function(object, props) {
          if (object == null) {
            return {};
          }
          if (typeof props[0] != 'function') {
            var props = arrayMap(baseFlatten(props), String);
            return pickByArray(object, baseDifference(keysIn(object), props));
          }
          var predicate = bindCallback(props[0], props[1], 3);
          return pickByCallback(object, function(value, key, object) {
            return !predicate(value, key, object);
          });
        });
    
        /**
         * Creates a two dimensional array of the key-value pairs for `object`,
         * e.g. `[[key1, value1], [key2, value2]]`.
         *
         * @static
         * @memberOf _
         * @category Object
         * @param {Object} object The object to query.
         * @returns {Array} Returns the new array of key-value pairs.
         * @example
         *
         * _.pairs({ 'barney': 36, 'fred': 40 });
         * // => [['barney', 36], ['fred', 40]] (iteration order is not guaranteed)
         */
        function pairs(object) {
          object = toObject(object);
    
          var index = -1,
              props = keys(object),
              length = props.length,
              result = Array(length);
    
          while (++index < length) {
            var key = props[index];
            result[index] = [key, object[key]];
          }
          return result;
        }
    
        /**
         * Creates an object composed of the picked `object` properties. Property
         * names may be specified as individual arguments or as arrays of property
         * names. If `predicate` is provided it is invoked for each property of `object`
         * picking the properties `predicate` returns truthy for. The predicate is
         * bound to `thisArg` and invoked with three arguments: (value, key, object).
         *
         * @static
         * @memberOf _
         * @category Object
         * @param {Object} object The source object.
         * @param {Function|...(string|string[])} [predicate] The function invoked per
         *  iteration or property names to pick, specified as individual property
         *  names or arrays of property names.
         * @param {*} [thisArg] The `this` binding of `predicate`.
         * @returns {Object} Returns the new object.
         * @example
         *
         * var object = { 'user': 'fred', 'age': 40 };
         *
         * _.pick(object, 'user');
         * // => { 'user': 'fred' }
         *
         * _.pick(object, _.isString);
         * // => { 'user': 'fred' }
         */
        var pick = restParam(function(object, props) {
          if (object == null) {
            return {};
          }
          return typeof props[0] == 'function'
            ? pickByCallback(object, bindCallback(props[0], props[1], 3))
            : pickByArray(object, baseFlatten(props));
        });
    
        /**
         * This method is like `_.get` except that if the resolved value is a function
         * it is invoked with the `this` binding of its parent object and its result
         * is returned.
         *
         * @static
         * @memberOf _
         * @category Object
         * @param {Object} object The object to query.
         * @param {Array|string} path The path of the property to resolve.
         * @param {*} [defaultValue] The value returned if the resolved value is `undefined`.
         * @returns {*} Returns the resolved value.
         * @example
         *
         * var object = { 'a': [{ 'b': { 'c1': 3, 'c2': _.constant(4) } }] };
         *
         * _.result(object, 'a[0].b.c1');
         * // => 3
         *
         * _.result(object, 'a[0].b.c2');
         * // => 4
         *
         * _.result(object, 'a.b.c', 'default');
         * // => 'default'
         *
         * _.result(object, 'a.b.c', _.constant('default'));
         * // => 'default'
         */
        function result(object, path, defaultValue) {
          var result = object == null ? undefined : object[path];
          if (result === undefined) {
            if (object != null && !isKey(path, object)) {
              path = toPath(path);
              object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
              result = object == null ? undefined : object[last(path)];
            }
            result = result === undefined ? defaultValue : result;
          }
          return isFunction(result) ? result.call(object) : result;
        }
    
        /**
         * Sets the property value of `path` on `object`. If a portion of `path`
         * does not exist it is created.
         *
         * @static
         * @memberOf _
         * @category Object
         * @param {Object} object The object to augment.
         * @param {Array|string} path The path of the property to set.
         * @param {*} value The value to set.
         * @returns {Object} Returns `object`.
         * @example
         *
         * var object = { 'a': [{ 'b': { 'c': 3 } }] };
         *
         * _.set(object, 'a[0].b.c', 4);
         * console.log(object.a[0].b.c);
         * // => 4
         *
         * _.set(object, 'x[0].y.z', 5);
         * console.log(object.x[0].y.z);
         * // => 5
         */
        function set(object, path, value) {
          if (object == null) {
            return object;
          }
          var pathKey = (path + '');
          path = (object[pathKey] != null || isKey(path, object)) ? [pathKey] : toPath(path);
    
          var index = -1,
              length = path.length,
              lastIndex = length - 1,
              nested = object;
    
          while (nested != null && ++index < length) {
            var key = path[index];
            if (isObject(nested)) {
              if (index == lastIndex) {
                nested[key] = value;
              } else if (nested[key] == null) {
                nested[key] = isIndex(path[index + 1]) ? [] : {};
              }
            }
            nested = nested[key];
          }
          return object;
        }
    
        /**
         * An alternative to `_.reduce`; this method transforms `object` to a new
         * `accumulator` object which is the result of running each of its own enumerable
         * properties through `iteratee`, with each invocation potentially mutating
         * the `accumulator` object. The `iteratee` is bound to `thisArg` and invoked
         * with four arguments: (accumulator, value, key, object). Iteratee functions
         * may exit iteration early by explicitly returning `false`.
         *
         * @static
         * @memberOf _
         * @category Object
         * @param {Array|Object} object The object to iterate over.
         * @param {Function} [iteratee=_.identity] The function invoked per iteration.
         * @param {*} [accumulator] The custom accumulator value.
         * @param {*} [thisArg] The `this` binding of `iteratee`.
         * @returns {*} Returns the accumulated value.
         * @example
         *
         * _.transform([2, 3, 4], function(result, n) {
         *   result.push(n *= n);
         *   return n % 2 == 0;
         * });
         * // => [4, 9]
         *
         * _.transform({ 'a': 1, 'b': 2 }, function(result, n, key) {
         *   result[key] = n * 3;
         * });
         * // => { 'a': 3, 'b': 6 }
         */
        function transform(object, iteratee, accumulator, thisArg) {
          var isArr = isArray(object) || isTypedArray(object);
          iteratee = getCallback(iteratee, thisArg, 4);
    
          if (accumulator == null) {
            if (isArr || isObject(object)) {
              var Ctor = object.constructor;
              if (isArr) {
                accumulator = isArray(object) ? new Ctor : [];
              } else {
                accumulator = baseCreate(isFunction(Ctor) ? Ctor.prototype : null);
              }
            } else {
              accumulator = {};
            }
          }
          (isArr ? arrayEach : baseForOwn)(object, function(value, index, object) {
            return iteratee(accumulator, value, index, object);
          });
          return accumulator;
        }
    
        /**
         * Creates an array of the own enumerable property values of `object`.
         *
         * **Note:** Non-object values are coerced to objects.
         *
         * @static
         * @memberOf _
         * @category Object
         * @param {Object} object The object to query.
         * @returns {Array} Returns the array of property values.
         * @example
         *
         * function Foo() {
         *   this.a = 1;
         *   this.b = 2;
         * }
         *
         * Foo.prototype.c = 3;
         *
         * _.values(new Foo);
         * // => [1, 2] (iteration order is not guaranteed)
         *
         * _.values('hi');
         * // => ['h', 'i']
         */
        function values(object) {
          return baseValues(object, keys(object));
        }
    
        /**
         * Creates an array of the own and inherited enumerable property values
         * of `object`.
         *
         * **Note:** Non-object values are coerced to objects.
         *
         * @static
         * @memberOf _
         * @category Object
         * @param {Object} object The object to query.
         * @returns {Array} Returns the array of property values.
         * @example
         *
         * function Foo() {
         *   this.a = 1;
         *   this.b = 2;
         * }
         *
         * Foo.prototype.c = 3;
         *
         * _.valuesIn(new Foo);
         * // => [1, 2, 3] (iteration order is not guaranteed)
         */
        function valuesIn(object) {
          return baseValues(object, keysIn(object));
        }
    
        /*------------------------------------------------------------------------*/
    
        /**
         * Checks if `n` is between `start` and up to but not including, `end`. If
         * `end` is not specified it is set to `start` with `start` then set to `0`.
         *
         * @static
         * @memberOf _
         * @category Number
         * @param {number} n The number to check.
         * @param {number} [start=0] The start of the range.
         * @param {number} end The end of the range.
         * @returns {boolean} Returns `true` if `n` is in the range, else `false`.
         * @example
         *
         * _.inRange(3, 2, 4);
         * // => true
         *
         * _.inRange(4, 8);
         * // => true
         *
         * _.inRange(4, 2);
         * // => false
         *
         * _.inRange(2, 2);
         * // => false
         *
         * _.inRange(1.2, 2);
         * // => true
         *
         * _.inRange(5.2, 4);
         * // => false
         */
        function inRange(value, start, end) {
          start = +start || 0;
          if (typeof end === 'undefined') {
            end = start;
            start = 0;
          } else {
            end = +end || 0;
          }
          return value >= nativeMin(start, end) && value < nativeMax(start, end);
        }
    
        /**
         * Produces a random number between `min` and `max` (inclusive). If only one
         * argument is provided a number between `0` and the given number is returned.
         * If `floating` is `true`, or either `min` or `max` are floats, a floating-point
         * number is returned instead of an integer.
         *
         * @static
         * @memberOf _
         * @category Number
         * @param {number} [min=0] The minimum possible value.
         * @param {number} [max=1] The maximum possible value.
         * @param {boolean} [floating] Specify returning a floating-point number.
         * @returns {number} Returns the random number.
         * @example
         *
         * _.random(0, 5);
         * // => an integer between 0 and 5
         *
         * _.random(5);
         * // => also an integer between 0 and 5
         *
         * _.random(5, true);
         * // => a floating-point number between 0 and 5
         *
         * _.random(1.2, 5.2);
         * // => a floating-point number between 1.2 and 5.2
         */
        function random(min, max, floating) {
          if (floating && isIterateeCall(min, max, floating)) {
            max = floating = null;
          }
          var noMin = min == null,
              noMax = max == null;
    
          if (floating == null) {
            if (noMax && typeof min == 'boolean') {
              floating = min;
              min = 1;
            }
            else if (typeof max == 'boolean') {
              floating = max;
              noMax = true;
            }
          }
          if (noMin && noMax) {
            max = 1;
            noMax = false;
          }
          min = +min || 0;
          if (noMax) {
            max = min;
            min = 0;
          } else {
            max = +max || 0;
          }
          if (floating || min % 1 || max % 1) {
            var rand = nativeRandom();
            return nativeMin(min + (rand * (max - min + parseFloat('1e-' + ((rand + '').length - 1)))), max);
          }
          return baseRandom(min, max);
        }
    
        /*------------------------------------------------------------------------*/
    
        /**
         * Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
         *
         * @static
         * @memberOf _
         * @category String
         * @param {string} [string=''] The string to convert.
         * @returns {string} Returns the camel cased string.
         * @example
         *
         * _.camelCase('Foo Bar');
         * // => 'fooBar'
         *
         * _.camelCase('--foo-bar');
         * // => 'fooBar'
         *
         * _.camelCase('__foo_bar__');
         * // => 'fooBar'
         */
        var camelCase = createCompounder(function(result, word, index) {
          word = word.toLowerCase();
          return result + (index ? (word.charAt(0).toUpperCase() + word.slice(1)) : word);
        });
    
        /**
         * Capitalizes the first character of `string`.
         *
         * @static
         * @memberOf _
         * @category String
         * @param {string} [string=''] The string to capitalize.
         * @returns {string} Returns the capitalized string.
         * @example
         *
         * _.capitalize('fred');
         * // => 'Fred'
         */
        function capitalize(string) {
          string = baseToString(string);
          return string && (string.charAt(0).toUpperCase() + string.slice(1));
        }
    
        /**
         * Deburrs `string` by converting [latin-1 supplementary letters](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
         * to basic latin letters and removing [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
         *
         * @static
         * @memberOf _
         * @category String
         * @param {string} [string=''] The string to deburr.
         * @returns {string} Returns the deburred string.
         * @example
         *
         * _.deburr('déjà vu');
         * // => 'deja vu'
         */
        function deburr(string) {
          string = baseToString(string);
          return string && string.replace(reLatin1, deburrLetter).replace(reComboMark, '');
        }
    
        /**
         * Checks if `string` ends with the given target string.
         *
         * @static
         * @memberOf _
         * @category String
         * @param {string} [string=''] The string to search.
         * @param {string} [target] The string to search for.
         * @param {number} [position=string.length] The position to search from.
         * @returns {boolean} Returns `true` if `string` ends with `target`, else `false`.
         * @example
         *
         * _.endsWith('abc', 'c');
         * // => true
         *
         * _.endsWith('abc', 'b');
         * // => false
         *
         * _.endsWith('abc', 'b', 2);
         * // => true
         */
        function endsWith(string, target, position) {
          string = baseToString(string);
          target = (target + '');
    
          var length = string.length;
          position = position === undefined
            ? length
            : nativeMin(position < 0 ? 0 : (+position || 0), length);
    
          position -= target.length;
          return position >= 0 && string.indexOf(target, position) == position;
        }
    
        /**
         * Converts the characters "&", "<", ">", '"', "'", and "\`", in `string` to
         * their corresponding HTML entities.
         *
         * **Note:** No other characters are escaped. To escape additional characters
         * use a third-party library like [_he_](https://mths.be/he).
         *
         * Though the ">" character is escaped for symmetry, characters like
         * ">" and "/" don't need escaping in HTML and have no special meaning
         * unless they're part of a tag or unquoted attribute value.
         * See [Mathias Bynens's article](https://mathiasbynens.be/notes/ambiguous-ampersands)
         * (under "semi-related fun fact") for more details.
         *
         * Backticks are escaped because in Internet Explorer < 9, they can break out
         * of attribute values or HTML comments. See [#59](https://html5sec.org/#59),
         * [#102](https://html5sec.org/#102), [#108](https://html5sec.org/#108), and
         * [#133](https://html5sec.org/#133) of the [HTML5 Security Cheatsheet](https://html5sec.org/)
         * for more details.
         *
         * When working with HTML you should always [quote attribute values](http://wonko.com/post/html-escaping)
         * to reduce XSS vectors.
         *
         * @static
         * @memberOf _
         * @category String
         * @param {string} [string=''] The string to escape.
         * @returns {string} Returns the escaped string.
         * @example
         *
         * _.escape('fred, barney, & pebbles');
         * // => 'fred, barney, &amp; pebbles'
         */
        function escape(string) {
          // Reset `lastIndex` because in IE < 9 `String#replace` does not.
          string = baseToString(string);
          return (string && reHasUnescapedHtml.test(string))
            ? string.replace(reUnescapedHtml, escapeHtmlChar)
            : string;
        }
    
        /**
         * Escapes the `RegExp` special characters "\", "/", "^", "$", ".", "|", "?",
         * "*", "+", "(", ")", "[", "]", "{" and "}" in `string`.
         *
         * @static
         * @memberOf _
         * @category String
         * @param {string} [string=''] The string to escape.
         * @returns {string} Returns the escaped string.
         * @example
         *
         * _.escapeRegExp('[lodash](https://lodash.com/)');
         * // => '\[lodash\]\(https:\/\/lodash\.com\/\)'
         */
        function escapeRegExp(string) {
          string = baseToString(string);
          return (string && reHasRegExpChars.test(string))
            ? string.replace(reRegExpChars, '\\$&')
            : string;
        }
    
        /**
         * Converts `string` to [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
         *
         * @static
         * @memberOf _
         * @category String
         * @param {string} [string=''] The string to convert.
         * @returns {string} Returns the kebab cased string.
         * @example
         *
         * _.kebabCase('Foo Bar');
         * // => 'foo-bar'
         *
         * _.kebabCase('fooBar');
         * // => 'foo-bar'
         *
         * _.kebabCase('__foo_bar__');
         * // => 'foo-bar'
         */
        var kebabCase = createCompounder(function(result, word, index) {
          return result + (index ? '-' : '') + word.toLowerCase();
        });
    
        /**
         * Pads `string` on the left and right sides if it's shorter than `length`.
         * Padding characters are truncated if they can't be evenly divided by `length`.
         *
         * @static
         * @memberOf _
         * @category String
         * @param {string} [string=''] The string to pad.
         * @param {number} [length=0] The padding length.
         * @param {string} [chars=' '] The string used as padding.
         * @returns {string} Returns the padded string.
         * @example
         *
         * _.pad('abc', 8);
         * // => '  abc   '
         *
         * _.pad('abc', 8, '_-');
         * // => '_-abc_-_'
         *
         * _.pad('abc', 3);
         * // => 'abc'
         */
        function pad(string, length, chars) {
          string = baseToString(string);
          length = +length;
    
          var strLength = string.length;
          if (strLength >= length || !nativeIsFinite(length)) {
            return string;
          }
          var mid = (length - strLength) / 2,
              leftLength = floor(mid),
              rightLength = ceil(mid);
    
          chars = createPadding('', rightLength, chars);
          return chars.slice(0, leftLength) + string + chars;
        }
    
        /**
         * Pads `string` on the left side if it's shorter than `length`. Padding
         * characters are truncated if they exceed `length`.
         *
         * @static
         * @memberOf _
         * @category String
         * @param {string} [string=''] The string to pad.
         * @param {number} [length=0] The padding length.
         * @param {string} [chars=' '] The string used as padding.
         * @returns {string} Returns the padded string.
         * @example
         *
         * _.padLeft('abc', 6);
         * // => '   abc'
         *
         * _.padLeft('abc', 6, '_-');
         * // => '_-_abc'
         *
         * _.padLeft('abc', 3);
         * // => 'abc'
         */
        var padLeft = createPadDir();
    
        /**
         * Pads `string` on the right side if it's shorter than `length`. Padding
         * characters are truncated if they exceed `length`.
         *
         * @static
         * @memberOf _
         * @category String
         * @param {string} [string=''] The string to pad.
         * @param {number} [length=0] The padding length.
         * @param {string} [chars=' '] The string used as padding.
         * @returns {string} Returns the padded string.
         * @example
         *
         * _.padRight('abc', 6);
         * // => 'abc   '
         *
         * _.padRight('abc', 6, '_-');
         * // => 'abc_-_'
         *
         * _.padRight('abc', 3);
         * // => 'abc'
         */
        var padRight = createPadDir(true);
    
        /**
         * Converts `string` to an integer of the specified radix. If `radix` is
         * `undefined` or `0`, a `radix` of `10` is used unless `value` is a hexadecimal,
         * in which case a `radix` of `16` is used.
         *
         * **Note:** This method aligns with the [ES5 implementation](https://es5.github.io/#E)
         * of `parseInt`.
         *
         * @static
         * @memberOf _
         * @category String
         * @param {string} string The string to convert.
         * @param {number} [radix] The radix to interpret `value` by.
         * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
         * @returns {number} Returns the converted integer.
         * @example
         *
         * _.parseInt('08');
         * // => 8
         *
         * _.map(['6', '08', '10'], _.parseInt);
         * // => [6, 8, 10]
         */
        function parseInt(string, radix, guard) {
          if (guard && isIterateeCall(string, radix, guard)) {
            radix = 0;
          }
          return nativeParseInt(string, radix);
        }
        // Fallback for environments with pre-ES5 implementations.
        if (nativeParseInt(whitespace + '08') != 8) {
          parseInt = function(string, radix, guard) {
            // Firefox < 21 and Opera < 15 follow ES3 for `parseInt`.
            // Chrome fails to trim leading <BOM> whitespace characters.
            // See https://code.google.com/p/v8/issues/detail?id=3109 for more details.
            if (guard ? isIterateeCall(string, radix, guard) : radix == null) {
              radix = 0;
            } else if (radix) {
              radix = +radix;
            }
            string = trim(string);
            return nativeParseInt(string, radix || (reHasHexPrefix.test(string) ? 16 : 10));
          };
        }
    
        /**
         * Repeats the given string `n` times.
         *
         * @static
         * @memberOf _
         * @category String
         * @param {string} [string=''] The string to repeat.
         * @param {number} [n=0] The number of times to repeat the string.
         * @returns {string} Returns the repeated string.
         * @example
         *
         * _.repeat('*', 3);
         * // => '***'
         *
         * _.repeat('abc', 2);
         * // => 'abcabc'
         *
         * _.repeat('abc', 0);
         * // => ''
         */
        function repeat(string, n) {
          var result = '';
          string = baseToString(string);
          n = +n;
          if (n < 1 || !string || !nativeIsFinite(n)) {
            return result;
          }
          // Leverage the exponentiation by squaring algorithm for a faster repeat.
          // See https://en.wikipedia.org/wiki/Exponentiation_by_squaring for more details.
          do {
            if (n % 2) {
              result += string;
            }
            n = floor(n / 2);
            string += string;
          } while (n);
    
          return result;
        }
    
        /**
         * Converts `string` to [snake case](https://en.wikipedia.org/wiki/Snake_case).
         *
         * @static
         * @memberOf _
         * @category String
         * @param {string} [string=''] The string to convert.
         * @returns {string} Returns the snake cased string.
         * @example
         *
         * _.snakeCase('Foo Bar');
         * // => 'foo_bar'
         *
         * _.snakeCase('fooBar');
         * // => 'foo_bar'
         *
         * _.snakeCase('--foo-bar');
         * // => 'foo_bar'
         */
        var snakeCase = createCompounder(function(result, word, index) {
          return result + (index ? '_' : '') + word.toLowerCase();
        });
    
        /**
         * Converts `string` to [start case](https://en.wikipedia.org/wiki/Letter_case#Stylistic_or_specialised_usage).
         *
         * @static
         * @memberOf _
         * @category String
         * @param {string} [string=''] The string to convert.
         * @returns {string} Returns the start cased string.
         * @example
         *
         * _.startCase('--foo-bar');
         * // => 'Foo Bar'
         *
         * _.startCase('fooBar');
         * // => 'Foo Bar'
         *
         * _.startCase('__foo_bar__');
         * // => 'Foo Bar'
         */
        var startCase = createCompounder(function(result, word, index) {
          return result + (index ? ' ' : '') + (word.charAt(0).toUpperCase() + word.slice(1));
        });
    
        /**
         * Checks if `string` starts with the given target string.
         *
         * @static
         * @memberOf _
         * @category String
         * @param {string} [string=''] The string to search.
         * @param {string} [target] The string to search for.
         * @param {number} [position=0] The position to search from.
         * @returns {boolean} Returns `true` if `string` starts with `target`, else `false`.
         * @example
         *
         * _.startsWith('abc', 'a');
         * // => true
         *
         * _.startsWith('abc', 'b');
         * // => false
         *
         * _.startsWith('abc', 'b', 1);
         * // => true
         */
        function startsWith(string, target, position) {
          string = baseToString(string);
          position = position == null
            ? 0
            : nativeMin(position < 0 ? 0 : (+position || 0), string.length);
    
          return string.lastIndexOf(target, position) == position;
        }
    
        /**
         * Creates a compiled template function that can interpolate data properties
         * in "interpolate" delimiters, HTML-escape interpolated data properties in
         * "escape" delimiters, and execute JavaScript in "evaluate" delimiters. Data
         * properties may be accessed as free variables in the template. If a setting
         * object is provided it takes precedence over `_.templateSettings` values.
         *
         * **Note:** In the development build `_.template` utilizes
         * [sourceURLs](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl)
         * for easier debugging.
         *
         * For more information on precompiling templates see
         * [lodash's custom builds documentation](https://lodash.com/custom-builds).
         *
         * For more information on Chrome extension sandboxes see
         * [Chrome's extensions documentation](https://developer.chrome.com/extensions/sandboxingEval).
         *
         * @static
         * @memberOf _
         * @category String
         * @param {string} [string=''] The template string.
         * @param {Object} [options] The options object.
         * @param {RegExp} [options.escape] The HTML "escape" delimiter.
         * @param {RegExp} [options.evaluate] The "evaluate" delimiter.
         * @param {Object} [options.imports] An object to import into the template as free variables.
         * @param {RegExp} [options.interpolate] The "interpolate" delimiter.
         * @param {string} [options.sourceURL] The sourceURL of the template's compiled source.
         * @param {string} [options.variable] The data object variable name.
         * @param- {Object} [otherOptions] Enables the legacy `options` param signature.
         * @returns {Function} Returns the compiled template function.
         * @example
         *
         * // using the "interpolate" delimiter to create a compiled template
         * var compiled = _.template('hello <%= user %>!');
         * compiled({ 'user': 'fred' });
         * // => 'hello fred!'
         *
         * // using the HTML "escape" delimiter to escape data property values
         * var compiled = _.template('<b><%- value %></b>');
         * compiled({ 'value': '<script>' });
         * // => '<b>&lt;script&gt;</b>'
         *
         * // using the "evaluate" delimiter to execute JavaScript and generate HTML
         * var compiled = _.template('<% _.forEach(users, function(user) { %><li><%- user %></li><% }); %>');
         * compiled({ 'users': ['fred', 'barney'] });
         * // => '<li>fred</li><li>barney</li>'
         *
         * // using the internal `print` function in "evaluate" delimiters
         * var compiled = _.template('<% print("hello " + user); %>!');
         * compiled({ 'user': 'barney' });
         * // => 'hello barney!'
         *
         * // using the ES delimiter as an alternative to the default "interpolate" delimiter
         * var compiled = _.template('hello ${ user }!');
         * compiled({ 'user': 'pebbles' });
         * // => 'hello pebbles!'
         *
         * // using custom template delimiters
         * _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
         * var compiled = _.template('hello {{ user }}!');
         * compiled({ 'user': 'mustache' });
         * // => 'hello mustache!'
         *
         * // using backslashes to treat delimiters as plain text
         * var compiled = _.template('<%= "\\<%- value %\\>" %>');
         * compiled({ 'value': 'ignored' });
         * // => '<%- value %>'
         *
         * // using the `imports` option to import `jQuery` as `jq`
         * var text = '<% jq.each(users, function(user) { %><li><%- user %></li><% }); %>';
         * var compiled = _.template(text, { 'imports': { 'jq': jQuery } });
         * compiled({ 'users': ['fred', 'barney'] });
         * // => '<li>fred</li><li>barney</li>'
         *
         * // using the `sourceURL` option to specify a custom sourceURL for the template
         * var compiled = _.template('hello <%= user %>!', { 'sourceURL': '/basic/greeting.jst' });
         * compiled(data);
         * // => find the source of "greeting.jst" under the Sources tab or Resources panel of the web inspector
         *
         * // using the `variable` option to ensure a with-statement isn't used in the compiled template
         * var compiled = _.template('hi <%= data.user %>!', { 'variable': 'data' });
         * compiled.source;
         * // => function(data) {
         * //   var __t, __p = '';
         * //   __p += 'hi ' + ((__t = ( data.user )) == null ? '' : __t) + '!';
         * //   return __p;
         * // }
         *
         * // using the `source` property to inline compiled templates for meaningful
         * // line numbers in error messages and a stack trace
         * fs.writeFileSync(path.join(cwd, 'jst.js'), '\
         *   var JST = {\
         *     "main": ' + _.template(mainText).source + '\
         *   };\
         * ');
         */
        function template(string, options, otherOptions) {
          // Based on John Resig's `tmpl` implementation (http://ejohn.org/blog/javascript-micro-templating/)
          // and Laura Doktorova's doT.js (https://github.com/olado/doT).
          var settings = lodash.templateSettings;
    
          if (otherOptions && isIterateeCall(string, options, otherOptions)) {
            options = otherOptions = null;
          }
          string = baseToString(string);
          options = assignWith(baseAssign({}, otherOptions || options), settings, assignOwnDefaults);
    
          var imports = assignWith(baseAssign({}, options.imports), settings.imports, assignOwnDefaults),
              importsKeys = keys(imports),
              importsValues = baseValues(imports, importsKeys);
    
          var isEscaping,
              isEvaluating,
              index = 0,
              interpolate = options.interpolate || reNoMatch,
              source = "__p += '";
    
          // Compile the regexp to match each delimiter.
          var reDelimiters = RegExp(
            (options.escape || reNoMatch).source + '|' +
            interpolate.source + '|' +
            (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + '|' +
            (options.evaluate || reNoMatch).source + '|$'
          , 'g');
    
          // Use a sourceURL for easier debugging.
          var sourceURL = '//# sourceURL=' +
            ('sourceURL' in options
              ? options.sourceURL
              : ('lodash.templateSources[' + (++templateCounter) + ']')
            ) + '\n';
    
          string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
            interpolateValue || (interpolateValue = esTemplateValue);
    
            // Escape characters that can't be included in string literals.
            source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);
    
            // Replace delimiters with snippets.
            if (escapeValue) {
              isEscaping = true;
              source += "' +\n__e(" + escapeValue + ") +\n'";
            }
            if (evaluateValue) {
              isEvaluating = true;
              source += "';\n" + evaluateValue + ";\n__p += '";
            }
            if (interpolateValue) {
              source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
            }
            index = offset + match.length;
    
            // The JS engine embedded in Adobe products requires returning the `match`
            // string in order to produce the correct `offset` value.
            return match;
          });
    
          source += "';\n";
    
          // If `variable` is not specified wrap a with-statement around the generated
          // code to add the data object to the top of the scope chain.
          var variable = options.variable;
          if (!variable) {
            source = 'with (obj) {\n' + source + '\n}\n';
          }
          // Cleanup code by stripping empty strings.
          source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source)
            .replace(reEmptyStringMiddle, '$1')
            .replace(reEmptyStringTrailing, '$1;');
    
          // Frame code as the function body.
          source = 'function(' + (variable || 'obj') + ') {\n' +
            (variable
              ? ''
              : 'obj || (obj = {});\n'
            ) +
            "var __t, __p = ''" +
            (isEscaping
               ? ', __e = _.escape'
               : ''
            ) +
            (isEvaluating
              ? ', __j = Array.prototype.join;\n' +
                "function print() { __p += __j.call(arguments, '') }\n"
              : ';\n'
            ) +
            source +
            'return __p\n}';
    
          var result = attempt(function() {
            return Function(importsKeys, sourceURL + 'return ' + source).apply(undefined, importsValues);
          });
    
          // Provide the compiled function's source by its `toString` method or
          // the `source` property as a convenience for inlining compiled templates.
          result.source = source;
          if (isError(result)) {
            throw result;
          }
          return result;
        }
    
        /**
         * Removes leading and trailing whitespace or specified characters from `string`.
         *
         * @static
         * @memberOf _
         * @category String
         * @param {string} [string=''] The string to trim.
         * @param {string} [chars=whitespace] The characters to trim.
         * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
         * @returns {string} Returns the trimmed string.
         * @example
         *
         * _.trim('  abc  ');
         * // => 'abc'
         *
         * _.trim('-_-abc-_-', '_-');
         * // => 'abc'
         *
         * _.map(['  foo  ', '  bar  '], _.trim);
         * // => ['foo', 'bar']
         */
        function trim(string, chars, guard) {
          var value = string;
          string = baseToString(string);
          if (!string) {
            return string;
          }
          if (guard ? isIterateeCall(value, chars, guard) : chars == null) {
            return string.slice(trimmedLeftIndex(string), trimmedRightIndex(string) + 1);
          }
          chars = (chars + '');
          return string.slice(charsLeftIndex(string, chars), charsRightIndex(string, chars) + 1);
        }
    
        /**
         * Removes leading whitespace or specified characters from `string`.
         *
         * @static
         * @memberOf _
         * @category String
         * @param {string} [string=''] The string to trim.
         * @param {string} [chars=whitespace] The characters to trim.
         * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
         * @returns {string} Returns the trimmed string.
         * @example
         *
         * _.trimLeft('  abc  ');
         * // => 'abc  '
         *
         * _.trimLeft('-_-abc-_-', '_-');
         * // => 'abc-_-'
         */
        function trimLeft(string, chars, guard) {
          var value = string;
          string = baseToString(string);
          if (!string) {
            return string;
          }
          if (guard ? isIterateeCall(value, chars, guard) : chars == null) {
            return string.slice(trimmedLeftIndex(string));
          }
          return string.slice(charsLeftIndex(string, (chars + '')));
        }
    
        /**
         * Removes trailing whitespace or specified characters from `string`.
         *
         * @static
         * @memberOf _
         * @category String
         * @param {string} [string=''] The string to trim.
         * @param {string} [chars=whitespace] The characters to trim.
         * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
         * @returns {string} Returns the trimmed string.
         * @example
         *
         * _.trimRight('  abc  ');
         * // => '  abc'
         *
         * _.trimRight('-_-abc-_-', '_-');
         * // => '-_-abc'
         */
        function trimRight(string, chars, guard) {
          var value = string;
          string = baseToString(string);
          if (!string) {
            return string;
          }
          if (guard ? isIterateeCall(value, chars, guard) : chars == null) {
            return string.slice(0, trimmedRightIndex(string) + 1);
          }
          return string.slice(0, charsRightIndex(string, (chars + '')) + 1);
        }
    
        /**
         * Truncates `string` if it's longer than the given maximum string length.
         * The last characters of the truncated string are replaced with the omission
         * string which defaults to "...".
         *
         * @static
         * @memberOf _
         * @category String
         * @param {string} [string=''] The string to truncate.
         * @param {Object|number} [options] The options object or maximum string length.
         * @param {number} [options.length=30] The maximum string length.
         * @param {string} [options.omission='...'] The string to indicate text is omitted.
         * @param {RegExp|string} [options.separator] The separator pattern to truncate to.
         * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
         * @returns {string} Returns the truncated string.
         * @example
         *
         * _.trunc('hi-diddly-ho there, neighborino');
         * // => 'hi-diddly-ho there, neighbo...'
         *
         * _.trunc('hi-diddly-ho there, neighborino', 24);
         * // => 'hi-diddly-ho there, n...'
         *
         * _.trunc('hi-diddly-ho there, neighborino', {
         *   'length': 24,
         *   'separator': ' '
         * });
         * // => 'hi-diddly-ho there,...'
         *
         * _.trunc('hi-diddly-ho there, neighborino', {
         *   'length': 24,
         *   'separator': /,? +/
         * });
         * // => 'hi-diddly-ho there...'
         *
         * _.trunc('hi-diddly-ho there, neighborino', {
         *   'omission': ' [...]'
         * });
         * // => 'hi-diddly-ho there, neig [...]'
         */
        function trunc(string, options, guard) {
          if (guard && isIterateeCall(string, options, guard)) {
            options = null;
          }
          var length = DEFAULT_TRUNC_LENGTH,
              omission = DEFAULT_TRUNC_OMISSION;
    
          if (options != null) {
            if (isObject(options)) {
              var separator = 'separator' in options ? options.separator : separator;
              length = 'length' in options ? (+options.length || 0) : length;
              omission = 'omission' in options ? baseToString(options.omission) : omission;
            } else {
              length = +options || 0;
            }
          }
          string = baseToString(string);
          if (length >= string.length) {
            return string;
          }
          var end = length - omission.length;
          if (end < 1) {
            return omission;
          }
          var result = string.slice(0, end);
          if (separator == null) {
            return result + omission;
          }
          if (isRegExp(separator)) {
            if (string.slice(end).search(separator)) {
              var match,
                  newEnd,
                  substring = string.slice(0, end);
    
              if (!separator.global) {
                separator = RegExp(separator.source, (reFlags.exec(separator) || '') + 'g');
              }
              separator.lastIndex = 0;
              while ((match = separator.exec(substring))) {
                newEnd = match.index;
              }
              result = result.slice(0, newEnd == null ? end : newEnd);
            }
          } else if (string.indexOf(separator, end) != end) {
            var index = result.lastIndexOf(separator);
            if (index > -1) {
              result = result.slice(0, index);
            }
          }
          return result + omission;
        }
    
        /**
         * The inverse of `_.escape`; this method converts the HTML entities
         * `&amp;`, `&lt;`, `&gt;`, `&quot;`, `&#39;`, and `&#96;` in `string` to their
         * corresponding characters.
         *
         * **Note:** No other HTML entities are unescaped. To unescape additional HTML
         * entities use a third-party library like [_he_](https://mths.be/he).
         *
         * @static
         * @memberOf _
         * @category String
         * @param {string} [string=''] The string to unescape.
         * @returns {string} Returns the unescaped string.
         * @example
         *
         * _.unescape('fred, barney, &amp; pebbles');
         * // => 'fred, barney, & pebbles'
         */
        function unescape(string) {
          string = baseToString(string);
          return (string && reHasEscapedHtml.test(string))
            ? string.replace(reEscapedHtml, unescapeHtmlChar)
            : string;
        }
    
        /**
         * Splits `string` into an array of its words.
         *
         * @static
         * @memberOf _
         * @category String
         * @param {string} [string=''] The string to inspect.
         * @param {RegExp|string} [pattern] The pattern to match words.
         * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
         * @returns {Array} Returns the words of `string`.
         * @example
         *
         * _.words('fred, barney, & pebbles');
         * // => ['fred', 'barney', 'pebbles']
         *
         * _.words('fred, barney, & pebbles', /[^, ]+/g);
         * // => ['fred', 'barney', '&', 'pebbles']
         */
        function words(string, pattern, guard) {
          if (guard && isIterateeCall(string, pattern, guard)) {
            pattern = null;
          }
          string = baseToString(string);
          return string.match(pattern || reWords) || [];
        }
    
        /*------------------------------------------------------------------------*/
    
        /**
         * Attempts to invoke `func`, returning either the result or the caught error
         * object. Any additional arguments are provided to `func` when it is invoked.
         *
         * @static
         * @memberOf _
         * @category Utility
         * @param {Function} func The function to attempt.
         * @returns {*} Returns the `func` result or error object.
         * @example
         *
         * // avoid throwing errors for invalid selectors
         * var elements = _.attempt(function(selector) {
         *   return document.querySelectorAll(selector);
         * }, '>_>');
         *
         * if (_.isError(elements)) {
         *   elements = [];
         * }
         */
        var attempt = restParam(function(func, args) {
          try {
            return func.apply(undefined, args);
          } catch(e) {
            return isError(e) ? e : new Error(e);
          }
        });
    
        /**
         * Creates a function that invokes `func` with the `this` binding of `thisArg`
         * and arguments of the created function. If `func` is a property name the
         * created callback returns the property value for a given element. If `func`
         * is an object the created callback returns `true` for elements that contain
         * the equivalent object properties, otherwise it returns `false`.
         *
         * @static
         * @memberOf _
         * @alias iteratee
         * @category Utility
         * @param {*} [func=_.identity] The value to convert to a callback.
         * @param {*} [thisArg] The `this` binding of `func`.
         * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
         * @returns {Function} Returns the callback.
         * @example
         *
         * var users = [
         *   { 'user': 'barney', 'age': 36 },
         *   { 'user': 'fred',   'age': 40 }
         * ];
         *
         * // wrap to create custom callback shorthands
         * _.callback = _.wrap(_.callback, function(callback, func, thisArg) {
         *   var match = /^(.+?)__([gl]t)(.+)$/.exec(func);
         *   if (!match) {
         *     return callback(func, thisArg);
         *   }
         *   return function(object) {
         *     return match[2] == 'gt'
         *       ? object[match[1]] > match[3]
         *       : object[match[1]] < match[3];
         *   };
         * });
         *
         * _.filter(users, 'age__gt36');
         * // => [{ 'user': 'fred', 'age': 40 }]
         */
        function callback(func, thisArg, guard) {
          if (guard && isIterateeCall(func, thisArg, guard)) {
            thisArg = null;
          }
          return isObjectLike(func)
            ? matches(func)
            : baseCallback(func, thisArg);
        }
    
        /**
         * Creates a function that returns `value`.
         *
         * @static
         * @memberOf _
         * @category Utility
         * @param {*} value The value to return from the new function.
         * @returns {Function} Returns the new function.
         * @example
         *
         * var object = { 'user': 'fred' };
         * var getter = _.constant(object);
         *
         * getter() === object;
         * // => true
         */
        function constant(value) {
          return function() {
            return value;
          };
        }
    
        /**
         * This method returns the first argument provided to it.
         *
         * @static
         * @memberOf _
         * @category Utility
         * @param {*} value Any value.
         * @returns {*} Returns `value`.
         * @example
         *
         * var object = { 'user': 'fred' };
         *
         * _.identity(object) === object;
         * // => true
         */
        function identity(value) {
          return value;
        }
    
        /**
         * Creates a function that performs a deep comparison between a given object
         * and `source`, returning `true` if the given object has equivalent property
         * values, else `false`.
         *
         * **Note:** This method supports comparing arrays, booleans, `Date` objects,
         * numbers, `Object` objects, regexes, and strings. Objects are compared by
         * their own, not inherited, enumerable properties. For comparing a single
         * own or inherited property value see `_.matchesProperty`.
         *
         * @static
         * @memberOf _
         * @category Utility
         * @param {Object} source The object of property values to match.
         * @returns {Function} Returns the new function.
         * @example
         *
         * var users = [
         *   { 'user': 'barney', 'age': 36, 'active': true },
         *   { 'user': 'fred',   'age': 40, 'active': false }
         * ];
         *
         * _.filter(users, _.matches({ 'age': 40, 'active': false }));
         * // => [{ 'user': 'fred', 'age': 40, 'active': false }]
         */
        function matches(source) {
          return baseMatches(baseClone(source, true));
        }
    
        /**
         * Creates a function that compares the property value of `path` on a given
         * object to `value`.
         *
         * **Note:** This method supports comparing arrays, booleans, `Date` objects,
         * numbers, `Object` objects, regexes, and strings. Objects are compared by
         * their own, not inherited, enumerable properties.
         *
         * @static
         * @memberOf _
         * @category Utility
         * @param {Array|string} path The path of the property to get.
         * @param {*} srcValue The value to match.
         * @returns {Function} Returns the new function.
         * @example
         *
         * var users = [
         *   { 'user': 'barney' },
         *   { 'user': 'fred' }
         * ];
         *
         * _.find(users, _.matchesProperty('user', 'fred'));
         * // => { 'user': 'fred' }
         */
        function matchesProperty(path, srcValue) {
          return baseMatchesProperty(path, baseClone(srcValue, true));
        }
    
        /**
         * Creates a function that invokes the method at `path` on a given object.
         * Any additional arguments are provided to the invoked method.
         *
         * @static
         * @memberOf _
         * @category Utility
         * @param {Array|string} path The path of the method to invoke.
         * @param {...*} [args] The arguments to invoke the method with.
         * @returns {Function} Returns the new function.
         * @example
         *
         * var objects = [
         *   { 'a': { 'b': { 'c': _.constant(2) } } },
         *   { 'a': { 'b': { 'c': _.constant(1) } } }
         * ];
         *
         * _.map(objects, _.method('a.b.c'));
         * // => [2, 1]
         *
         * _.invoke(_.sortBy(objects, _.method(['a', 'b', 'c'])), 'a.b.c');
         * // => [1, 2]
         */
        var method = restParam(function(path, args) {
          return function(object) {
            return invokePath(object, path, args);
          };
        });
    
        /**
         * The opposite of `_.method`; this method creates a function that invokes
         * the method at a given path on `object`. Any additional arguments are
         * provided to the invoked method.
         *
         * @static
         * @memberOf _
         * @category Utility
         * @param {Object} object The object to query.
         * @param {...*} [args] The arguments to invoke the method with.
         * @returns {Function} Returns the new function.
         * @example
         *
         * var array = _.times(3, _.constant),
         *     object = { 'a': array, 'b': array, 'c': array };
         *
         * _.map(['a[2]', 'c[0]'], _.methodOf(object));
         * // => [2, 0]
         *
         * _.map([['a', '2'], ['c', '0']], _.methodOf(object));
         * // => [2, 0]
         */
        var methodOf = restParam(function(object, args) {
          return function(path) {
            return invokePath(object, path, args);
          };
        });
    
        /**
         * Adds all own enumerable function properties of a source object to the
         * destination object. If `object` is a function then methods are added to
         * its prototype as well.
         *
         * **Note:** Use `_.runInContext` to create a pristine `lodash` function to
         * avoid conflicts caused by modifying the original.
         *
         * @static
         * @memberOf _
         * @category Utility
         * @param {Function|Object} [object=lodash] The destination object.
         * @param {Object} source The object of functions to add.
         * @param {Object} [options] The options object.
         * @param {boolean} [options.chain=true] Specify whether the functions added
         *  are chainable.
         * @returns {Function|Object} Returns `object`.
         * @example
         *
         * function vowels(string) {
         *   return _.filter(string, function(v) {
         *     return /[aeiou]/i.test(v);
         *   });
         * }
         *
         * _.mixin({ 'vowels': vowels });
         * _.vowels('fred');
         * // => ['e']
         *
         * _('fred').vowels().value();
         * // => ['e']
         *
         * _.mixin({ 'vowels': vowels }, { 'chain': false });
         * _('fred').vowels();
         * // => ['e']
         */
        function mixin(object, source, options) {
          if (options == null) {
            var isObj = isObject(source),
                props = isObj ? keys(source) : null,
                methodNames = (props && props.length) ? baseFunctions(source, props) : null;
    
            if (!(methodNames ? methodNames.length : isObj)) {
              methodNames = false;
              options = source;
              source = object;
              object = this;
            }
          }
          if (!methodNames) {
            methodNames = baseFunctions(source, keys(source));
          }
          var chain = true,
              index = -1,
              isFunc = isFunction(object),
              length = methodNames.length;
    
          if (options === false) {
            chain = false;
          } else if (isObject(options) && 'chain' in options) {
            chain = options.chain;
          }
          while (++index < length) {
            var methodName = methodNames[index],
                func = source[methodName];
    
            object[methodName] = func;
            if (isFunc) {
              object.prototype[methodName] = (function(func) {
                return function() {
                  var chainAll = this.__chain__;
                  if (chain || chainAll) {
                    var result = object(this.__wrapped__),
                        actions = result.__actions__ = arrayCopy(this.__actions__);
    
                    actions.push({ 'func': func, 'args': arguments, 'thisArg': object });
                    result.__chain__ = chainAll;
                    return result;
                  }
                  var args = [this.value()];
                  push.apply(args, arguments);
                  return func.apply(object, args);
                };
              }(func));
            }
          }
          return object;
        }
    
        /**
         * Reverts the `_` variable to its previous value and returns a reference to
         * the `lodash` function.
         *
         * @static
         * @memberOf _
         * @category Utility
         * @returns {Function} Returns the `lodash` function.
         * @example
         *
         * var lodash = _.noConflict();
         */
        function noConflict() {
          context._ = oldDash;
          return this;
        }
    
        /**
         * A no-operation function that returns `undefined` regardless of the
         * arguments it receives.
         *
         * @static
         * @memberOf _
         * @category Utility
         * @example
         *
         * var object = { 'user': 'fred' };
         *
         * _.noop(object) === undefined;
         * // => true
         */
        function noop() {
          // No operation performed.
        }
    
        /**
         * Creates a function that returns the property value at `path` on a
         * given object.
         *
         * @static
         * @memberOf _
         * @category Utility
         * @param {Array|string} path The path of the property to get.
         * @returns {Function} Returns the new function.
         * @example
         *
         * var objects = [
         *   { 'a': { 'b': { 'c': 2 } } },
         *   { 'a': { 'b': { 'c': 1 } } }
         * ];
         *
         * _.map(objects, _.property('a.b.c'));
         * // => [2, 1]
         *
         * _.pluck(_.sortBy(objects, _.property(['a', 'b', 'c'])), 'a.b.c');
         * // => [1, 2]
         */
        function property(path) {
          return isKey(path) ? baseProperty(path) : basePropertyDeep(path);
        }
    
        /**
         * The opposite of `_.property`; this method creates a function that returns
         * the property value at a given path on `object`.
         *
         * @static
         * @memberOf _
         * @category Utility
         * @param {Object} object The object to query.
         * @returns {Function} Returns the new function.
         * @example
         *
         * var array = [0, 1, 2],
         *     object = { 'a': array, 'b': array, 'c': array };
         *
         * _.map(['a[2]', 'c[0]'], _.propertyOf(object));
         * // => [2, 0]
         *
         * _.map([['a', '2'], ['c', '0']], _.propertyOf(object));
         * // => [2, 0]
         */
        function propertyOf(object) {
          return function(path) {
            return baseGet(object, toPath(path), path + '');
          };
        }
    
        /**
         * Creates an array of numbers (positive and/or negative) progressing from
         * `start` up to, but not including, `end`. If `end` is not specified it is
         * set to `start` with `start` then set to `0`. If `end` is less than `start`
         * a zero-length range is created unless a negative `step` is specified.
         *
         * @static
         * @memberOf _
         * @category Utility
         * @param {number} [start=0] The start of the range.
         * @param {number} end The end of the range.
         * @param {number} [step=1] The value to increment or decrement by.
         * @returns {Array} Returns the new array of numbers.
         * @example
         *
         * _.range(4);
         * // => [0, 1, 2, 3]
         *
         * _.range(1, 5);
         * // => [1, 2, 3, 4]
         *
         * _.range(0, 20, 5);
         * // => [0, 5, 10, 15]
         *
         * _.range(0, -4, -1);
         * // => [0, -1, -2, -3]
         *
         * _.range(1, 4, 0);
         * // => [1, 1, 1]
         *
         * _.range(0);
         * // => []
         */
        function range(start, end, step) {
          if (step && isIterateeCall(start, end, step)) {
            end = step = null;
          }
          start = +start || 0;
          step = step == null ? 1 : (+step || 0);
    
          if (end == null) {
            end = start;
            start = 0;
          } else {
            end = +end || 0;
          }
          // Use `Array(length)` so engines like Chakra and V8 avoid slower modes.
          // See https://youtu.be/XAqIpGU8ZZk#t=17m25s for more details.
          var index = -1,
              length = nativeMax(ceil((end - start) / (step || 1)), 0),
              result = Array(length);
    
          while (++index < length) {
            result[index] = start;
            start += step;
          }
          return result;
        }
    
        /**
         * Invokes the iteratee function `n` times, returning an array of the results
         * of each invocation. The `iteratee` is bound to `thisArg` and invoked with
         * one argument; (index).
         *
         * @static
         * @memberOf _
         * @category Utility
         * @param {number} n The number of times to invoke `iteratee`.
         * @param {Function} [iteratee=_.identity] The function invoked per iteration.
         * @param {*} [thisArg] The `this` binding of `iteratee`.
         * @returns {Array} Returns the array of results.
         * @example
         *
         * var diceRolls = _.times(3, _.partial(_.random, 1, 6, false));
         * // => [3, 6, 4]
         *
         * _.times(3, function(n) {
         *   mage.castSpell(n);
         * });
         * // => invokes `mage.castSpell(n)` three times with `n` of `0`, `1`, and `2`
         *
         * _.times(3, function(n) {
         *   this.cast(n);
         * }, mage);
         * // => also invokes `mage.castSpell(n)` three times
         */
        function times(n, iteratee, thisArg) {
          n = floor(n);
    
          // Exit early to avoid a JSC JIT bug in Safari 8
          // where `Array(0)` is treated as `Array(1)`.
          if (n < 1 || !nativeIsFinite(n)) {
            return [];
          }
          var index = -1,
              result = Array(nativeMin(n, MAX_ARRAY_LENGTH));
    
          iteratee = bindCallback(iteratee, thisArg, 1);
          while (++index < n) {
            if (index < MAX_ARRAY_LENGTH) {
              result[index] = iteratee(index);
            } else {
              iteratee(index);
            }
          }
          return result;
        }
    
        /**
         * Generates a unique ID. If `prefix` is provided the ID is appended to it.
         *
         * @static
         * @memberOf _
         * @category Utility
         * @param {string} [prefix] The value to prefix the ID with.
         * @returns {string} Returns the unique ID.
         * @example
         *
         * _.uniqueId('contact_');
         * // => 'contact_104'
         *
         * _.uniqueId();
         * // => '105'
         */
        function uniqueId(prefix) {
          var id = ++idCounter;
          return baseToString(prefix) + id;
        }
    
        /*------------------------------------------------------------------------*/
    
        /**
         * Adds two numbers.
         *
         * @static
         * @memberOf _
         * @category Math
         * @param {number} augend The first number to add.
         * @param {number} addend The second number to add.
         * @returns {number} Returns the sum.
         * @example
         *
         * _.add(6, 4);
         * // => 10
         */
        function add(augend, addend) {
          return (+augend || 0) + (+addend || 0);
        }
    
        /**
         * Gets the maximum value of `collection`. If `collection` is empty or falsey
         * `-Infinity` is returned. If an iteratee function is provided it is invoked
         * for each value in `collection` to generate the criterion by which the value
         * is ranked. The `iteratee` is bound to `thisArg` and invoked with three
         * arguments: (value, index, collection).
         *
         * If a property name is provided for `iteratee` the created `_.property`
         * style callback returns the property value of the given element.
         *
         * If a value is also provided for `thisArg` the created `_.matchesProperty`
         * style callback returns `true` for elements that have a matching property
         * value, else `false`.
         *
         * If an object is provided for `iteratee` the created `_.matches` style
         * callback returns `true` for elements that have the properties of the given
         * object, else `false`.
         *
         * @static
         * @memberOf _
         * @category Math
         * @param {Array|Object|string} collection The collection to iterate over.
         * @param {Function|Object|string} [iteratee] The function invoked per iteration.
         * @param {*} [thisArg] The `this` binding of `iteratee`.
         * @returns {*} Returns the maximum value.
         * @example
         *
         * _.max([4, 2, 8, 6]);
         * // => 8
         *
         * _.max([]);
         * // => -Infinity
         *
         * var users = [
         *   { 'user': 'barney', 'age': 36 },
         *   { 'user': 'fred',   'age': 40 }
         * ];
         *
         * _.max(users, function(chr) {
         *   return chr.age;
         * });
         * // => { 'user': 'fred', 'age': 40 }
         *
         * // using the `_.property` callback shorthand
         * _.max(users, 'age');
         * // => { 'user': 'fred', 'age': 40 }
         */
        var max = createExtremum(gt, NEGATIVE_INFINITY);
    
        /**
         * Gets the minimum value of `collection`. If `collection` is empty or falsey
         * `Infinity` is returned. If an iteratee function is provided it is invoked
         * for each value in `collection` to generate the criterion by which the value
         * is ranked. The `iteratee` is bound to `thisArg` and invoked with three
         * arguments: (value, index, collection).
         *
         * If a property name is provided for `iteratee` the created `_.property`
         * style callback returns the property value of the given element.
         *
         * If a value is also provided for `thisArg` the created `_.matchesProperty`
         * style callback returns `true` for elements that have a matching property
         * value, else `false`.
         *
         * If an object is provided for `iteratee` the created `_.matches` style
         * callback returns `true` for elements that have the properties of the given
         * object, else `false`.
         *
         * @static
         * @memberOf _
         * @category Math
         * @param {Array|Object|string} collection The collection to iterate over.
         * @param {Function|Object|string} [iteratee] The function invoked per iteration.
         * @param {*} [thisArg] The `this` binding of `iteratee`.
         * @returns {*} Returns the minimum value.
         * @example
         *
         * _.min([4, 2, 8, 6]);
         * // => 2
         *
         * _.min([]);
         * // => Infinity
         *
         * var users = [
         *   { 'user': 'barney', 'age': 36 },
         *   { 'user': 'fred',   'age': 40 }
         * ];
         *
         * _.min(users, function(chr) {
         *   return chr.age;
         * });
         * // => { 'user': 'barney', 'age': 36 }
         *
         * // using the `_.property` callback shorthand
         * _.min(users, 'age');
         * // => { 'user': 'barney', 'age': 36 }
         */
        var min = createExtremum(lt, POSITIVE_INFINITY);
    
        /**
         * Gets the sum of the values in `collection`.
         *
         * @static
         * @memberOf _
         * @category Math
         * @param {Array|Object|string} collection The collection to iterate over.
         * @param {Function|Object|string} [iteratee] The function invoked per iteration.
         * @param {*} [thisArg] The `this` binding of `iteratee`.
         * @returns {number} Returns the sum.
         * @example
         *
         * _.sum([4, 6]);
         * // => 10
         *
         * _.sum({ 'a': 4, 'b': 6 });
         * // => 10
         *
         * var objects = [
         *   { 'n': 4 },
         *   { 'n': 6 }
         * ];
         *
         * _.sum(objects, function(object) {
         *   return object.n;
         * });
         * // => 10
         *
         * // using the `_.property` callback shorthand
         * _.sum(objects, 'n');
         * // => 10
         */
        function sum(collection, iteratee, thisArg) {
          if (thisArg && isIterateeCall(collection, iteratee, thisArg)) {
            iteratee = null;
          }
          var callback = getCallback(),
              noIteratee = iteratee == null;
    
          if (!(noIteratee && callback === baseCallback)) {
            noIteratee = false;
            iteratee = callback(iteratee, thisArg, 3);
          }
          return noIteratee
            ? arraySum(isArray(collection) ? collection : toIterable(collection))
            : baseSum(collection, iteratee);
        }
    
        /*------------------------------------------------------------------------*/
    
        // Ensure wrappers are instances of `baseLodash`.
        lodash.prototype = baseLodash.prototype;
    
        LodashWrapper.prototype = baseCreate(baseLodash.prototype);
        LodashWrapper.prototype.constructor = LodashWrapper;
    
        LazyWrapper.prototype = baseCreate(baseLodash.prototype);
        LazyWrapper.prototype.constructor = LazyWrapper;
    
        // Add functions to the `Map` cache.
        MapCache.prototype['delete'] = mapDelete;
        MapCache.prototype.get = mapGet;
        MapCache.prototype.has = mapHas;
        MapCache.prototype.set = mapSet;
    
        // Add functions to the `Set` cache.
        SetCache.prototype.push = cachePush;
    
        // Assign cache to `_.memoize`.
        memoize.Cache = MapCache;
    
        // Add functions that return wrapped values when chaining.
        lodash.after = after;
        lodash.ary = ary;
        lodash.assign = assign;
        lodash.at = at;
        lodash.before = before;
        lodash.bind = bind;
        lodash.bindAll = bindAll;
        lodash.bindKey = bindKey;
        lodash.callback = callback;
        lodash.chain = chain;
        lodash.chunk = chunk;
        lodash.compact = compact;
        lodash.constant = constant;
        lodash.countBy = countBy;
        lodash.create = create;
        lodash.curry = curry;
        lodash.curryRight = curryRight;
        lodash.debounce = debounce;
        lodash.defaults = defaults;
        lodash.defer = defer;
        lodash.delay = delay;
        lodash.difference = difference;
        lodash.drop = drop;
        lodash.dropRight = dropRight;
        lodash.dropRightWhile = dropRightWhile;
        lodash.dropWhile = dropWhile;
        lodash.fill = fill;
        lodash.filter = filter;
        lodash.flatten = flatten;
        lodash.flattenDeep = flattenDeep;
        lodash.flow = flow;
        lodash.flowRight = flowRight;
        lodash.forEach = forEach;
        lodash.forEachRight = forEachRight;
        lodash.forIn = forIn;
        lodash.forInRight = forInRight;
        lodash.forOwn = forOwn;
        lodash.forOwnRight = forOwnRight;
        lodash.functions = functions;
        lodash.groupBy = groupBy;
        lodash.indexBy = indexBy;
        lodash.initial = initial;
        lodash.intersection = intersection;
        lodash.invert = invert;
        lodash.invoke = invoke;
        lodash.keys = keys;
        lodash.keysIn = keysIn;
        lodash.map = map;
        lodash.mapKeys = mapKeys;
        lodash.mapValues = mapValues;
        lodash.matches = matches;
        lodash.matchesProperty = matchesProperty;
        lodash.memoize = memoize;
        lodash.merge = merge;
        lodash.method = method;
        lodash.methodOf = methodOf;
        lodash.mixin = mixin;
        lodash.negate = negate;
        lodash.omit = omit;
        lodash.once = once;
        lodash.pairs = pairs;
        lodash.partial = partial;
        lodash.partialRight = partialRight;
        lodash.partition = partition;
        lodash.pick = pick;
        lodash.pluck = pluck;
        lodash.property = property;
        lodash.propertyOf = propertyOf;
        lodash.pull = pull;
        lodash.pullAt = pullAt;
        lodash.range = range;
        lodash.rearg = rearg;
        lodash.reject = reject;
        lodash.remove = remove;
        lodash.rest = rest;
        lodash.restParam = restParam;
        lodash.set = set;
        lodash.shuffle = shuffle;
        lodash.slice = slice;
        lodash.sortBy = sortBy;
        lodash.sortByAll = sortByAll;
        lodash.sortByOrder = sortByOrder;
        lodash.spread = spread;
        lodash.take = take;
        lodash.takeRight = takeRight;
        lodash.takeRightWhile = takeRightWhile;
        lodash.takeWhile = takeWhile;
        lodash.tap = tap;
        lodash.throttle = throttle;
        lodash.thru = thru;
        lodash.times = times;
        lodash.toArray = toArray;
        lodash.toPlainObject = toPlainObject;
        lodash.transform = transform;
        lodash.union = union;
        lodash.uniq = uniq;
        lodash.unzip = unzip;
        lodash.unzipWith = unzipWith;
        lodash.values = values;
        lodash.valuesIn = valuesIn;
        lodash.where = where;
        lodash.without = without;
        lodash.wrap = wrap;
        lodash.xor = xor;
        lodash.zip = zip;
        lodash.zipObject = zipObject;
        lodash.zipWith = zipWith;
    
        // Add aliases.
        lodash.backflow = flowRight;
        lodash.collect = map;
        lodash.compose = flowRight;
        lodash.each = forEach;
        lodash.eachRight = forEachRight;
        lodash.extend = assign;
        lodash.iteratee = callback;
        lodash.methods = functions;
        lodash.object = zipObject;
        lodash.select = filter;
        lodash.tail = rest;
        lodash.unique = uniq;
    
        // Add functions to `lodash.prototype`.
        mixin(lodash, lodash);
    
        /*------------------------------------------------------------------------*/
    
        // Add functions that return unwrapped values when chaining.
        lodash.add = add;
        lodash.attempt = attempt;
        lodash.camelCase = camelCase;
        lodash.capitalize = capitalize;
        lodash.clone = clone;
        lodash.cloneDeep = cloneDeep;
        lodash.deburr = deburr;
        lodash.endsWith = endsWith;
        lodash.escape = escape;
        lodash.escapeRegExp = escapeRegExp;
        lodash.every = every;
        lodash.find = find;
        lodash.findIndex = findIndex;
        lodash.findKey = findKey;
        lodash.findLast = findLast;
        lodash.findLastIndex = findLastIndex;
        lodash.findLastKey = findLastKey;
        lodash.findWhere = findWhere;
        lodash.first = first;
        lodash.get = get;
        lodash.gt = gt;
        lodash.gte = gte;
        lodash.has = has;
        lodash.identity = identity;
        lodash.includes = includes;
        lodash.indexOf = indexOf;
        lodash.inRange = inRange;
        lodash.isArguments = isArguments;
        lodash.isArray = isArray;
        lodash.isBoolean = isBoolean;
        lodash.isDate = isDate;
        lodash.isElement = isElement;
        lodash.isEmpty = isEmpty;
        lodash.isEqual = isEqual;
        lodash.isError = isError;
        lodash.isFinite = isFinite;
        lodash.isFunction = isFunction;
        lodash.isMatch = isMatch;
        lodash.isNaN = isNaN;
        lodash.isNative = isNative;
        lodash.isNull = isNull;
        lodash.isNumber = isNumber;
        lodash.isObject = isObject;
        lodash.isPlainObject = isPlainObject;
        lodash.isRegExp = isRegExp;
        lodash.isString = isString;
        lodash.isTypedArray = isTypedArray;
        lodash.isUndefined = isUndefined;
        lodash.kebabCase = kebabCase;
        lodash.last = last;
        lodash.lastIndexOf = lastIndexOf;
        lodash.lt = lt;
        lodash.lte = lte;
        lodash.max = max;
        lodash.min = min;
        lodash.noConflict = noConflict;
        lodash.noop = noop;
        lodash.now = now;
        lodash.pad = pad;
        lodash.padLeft = padLeft;
        lodash.padRight = padRight;
        lodash.parseInt = parseInt;
        lodash.random = random;
        lodash.reduce = reduce;
        lodash.reduceRight = reduceRight;
        lodash.repeat = repeat;
        lodash.result = result;
        lodash.runInContext = runInContext;
        lodash.size = size;
        lodash.snakeCase = snakeCase;
        lodash.some = some;
        lodash.sortedIndex = sortedIndex;
        lodash.sortedLastIndex = sortedLastIndex;
        lodash.startCase = startCase;
        lodash.startsWith = startsWith;
        lodash.sum = sum;
        lodash.template = template;
        lodash.trim = trim;
        lodash.trimLeft = trimLeft;
        lodash.trimRight = trimRight;
        lodash.trunc = trunc;
        lodash.unescape = unescape;
        lodash.uniqueId = uniqueId;
        lodash.words = words;
    
        // Add aliases.
        lodash.all = every;
        lodash.any = some;
        lodash.contains = includes;
        lodash.eq = isEqual;
        lodash.detect = find;
        lodash.foldl = reduce;
        lodash.foldr = reduceRight;
        lodash.head = first;
        lodash.include = includes;
        lodash.inject = reduce;
    
        mixin(lodash, (function() {
          var source = {};
          baseForOwn(lodash, function(func, methodName) {
            if (!lodash.prototype[methodName]) {
              source[methodName] = func;
            }
          });
          return source;
        }()), false);
    
        /*------------------------------------------------------------------------*/
    
        // Add functions capable of returning wrapped and unwrapped values when chaining.
        lodash.sample = sample;
    
        lodash.prototype.sample = function(n) {
          if (!this.__chain__ && n == null) {
            return sample(this.value());
          }
          return this.thru(function(value) {
            return sample(value, n);
          });
        };
    
        /*------------------------------------------------------------------------*/
    
        /**
         * The semantic version number.
         *
         * @static
         * @memberOf _
         * @type string
         */
        lodash.VERSION = VERSION;
    
        // Assign default placeholders.
        arrayEach(['bind', 'bindKey', 'curry', 'curryRight', 'partial', 'partialRight'], function(methodName) {
          lodash[methodName].placeholder = lodash;
        });
    
        // Add `LazyWrapper` methods that accept an `iteratee` value.
        arrayEach(['dropWhile', 'filter', 'map', 'takeWhile'], function(methodName, type) {
          var isFilter = type != LAZY_MAP_FLAG,
              isDropWhile = type == LAZY_DROP_WHILE_FLAG;
    
          LazyWrapper.prototype[methodName] = function(iteratee, thisArg) {
            var filtered = this.__filtered__,
                result = (filtered && isDropWhile) ? new LazyWrapper(this) : this.clone(),
                iteratees = result.__iteratees__ || (result.__iteratees__ = []);
    
            iteratees.push({
              'done': false,
              'count': 0,
              'index': 0,
              'iteratee': getCallback(iteratee, thisArg, 1),
              'limit': -1,
              'type': type
            });
    
            result.__filtered__ = filtered || isFilter;
            return result;
          };
        });
    
        // Add `LazyWrapper` methods for `_.drop` and `_.take` variants.
        arrayEach(['drop', 'take'], function(methodName, index) {
          var whileName = methodName + 'While';
    
          LazyWrapper.prototype[methodName] = function(n) {
            var filtered = this.__filtered__,
                result = (filtered && !index) ? this.dropWhile() : this.clone();
    
            n = n == null ? 1 : nativeMax(floor(n) || 0, 0);
            if (filtered) {
              if (index) {
                result.__takeCount__ = nativeMin(result.__takeCount__, n);
              } else {
                last(result.__iteratees__).limit = n;
              }
            } else {
              var views = result.__views__ || (result.__views__ = []);
              views.push({ 'size': n, 'type': methodName + (result.__dir__ < 0 ? 'Right' : '') });
            }
            return result;
          };
    
          LazyWrapper.prototype[methodName + 'Right'] = function(n) {
            return this.reverse()[methodName](n).reverse();
          };
    
          LazyWrapper.prototype[methodName + 'RightWhile'] = function(predicate, thisArg) {
            return this.reverse()[whileName](predicate, thisArg).reverse();
          };
        });
    
        // Add `LazyWrapper` methods for `_.first` and `_.last`.
        arrayEach(['first', 'last'], function(methodName, index) {
          var takeName = 'take' + (index ? 'Right' : '');
    
          LazyWrapper.prototype[methodName] = function() {
            return this[takeName](1).value()[0];
          };
        });
    
        // Add `LazyWrapper` methods for `_.initial` and `_.rest`.
        arrayEach(['initial', 'rest'], function(methodName, index) {
          var dropName = 'drop' + (index ? '' : 'Right');
    
          LazyWrapper.prototype[methodName] = function() {
            return this[dropName](1);
          };
        });
    
        // Add `LazyWrapper` methods for `_.pluck` and `_.where`.
        arrayEach(['pluck', 'where'], function(methodName, index) {
          var operationName = index ? 'filter' : 'map',
              createCallback = index ? baseMatches : property;
    
          LazyWrapper.prototype[methodName] = function(value) {
            return this[operationName](createCallback(value));
          };
        });
    
        LazyWrapper.prototype.compact = function() {
          return this.filter(identity);
        };
    
        LazyWrapper.prototype.reject = function(predicate, thisArg) {
          predicate = getCallback(predicate, thisArg, 1);
          return this.filter(function(value) {
            return !predicate(value);
          });
        };
    
        LazyWrapper.prototype.slice = function(start, end) {
          start = start == null ? 0 : (+start || 0);
    
          var result = this;
          if (start < 0) {
            result = this.takeRight(-start);
          } else if (start) {
            result = this.drop(start);
          }
          if (end !== undefined) {
            end = (+end || 0);
            result = end < 0 ? result.dropRight(-end) : result.take(end - start);
          }
          return result;
        };
    
        LazyWrapper.prototype.toArray = function() {
          return this.drop(0);
        };
    
        // Add `LazyWrapper` methods to `lodash.prototype`.
        baseForOwn(LazyWrapper.prototype, function(func, methodName) {
          var lodashFunc = lodash[methodName];
          if (!lodashFunc) {
            return;
          }
          var checkIteratee = /^(?:filter|map|reject)|While$/.test(methodName),
              retUnwrapped = /^(?:first|last)$/.test(methodName);
    
          lodash.prototype[methodName] = function() {
            var args = arguments,
                chainAll = this.__chain__,
                value = this.__wrapped__,
                isHybrid = !!this.__actions__.length,
                isLazy = value instanceof LazyWrapper,
                iteratee = args[0],
                useLazy = isLazy || isArray(value);
    
            if (useLazy && checkIteratee && typeof iteratee == 'function' && iteratee.length != 1) {
              // avoid lazy use if the iteratee has a "length" value other than `1`
              isLazy = useLazy = false;
            }
            var onlyLazy = isLazy && !isHybrid;
            if (retUnwrapped && !chainAll) {
              return onlyLazy
                ? func.call(value)
                : lodashFunc.call(lodash, this.value());
            }
            var interceptor = function(value) {
              var otherArgs = [value];
              push.apply(otherArgs, args);
              return lodashFunc.apply(lodash, otherArgs);
            };
            if (useLazy) {
              var wrapper = onlyLazy ? value : new LazyWrapper(this),
                  result = func.apply(wrapper, args);
    
              if (!retUnwrapped && (isHybrid || result.__actions__)) {
                var actions = result.__actions__ || (result.__actions__ = []);
                actions.push({ 'func': thru, 'args': [interceptor], 'thisArg': lodash });
              }
              return new LodashWrapper(result, chainAll);
            }
            return this.thru(interceptor);
          };
        });
    
        // Add `Array` and `String` methods to `lodash.prototype`.
        arrayEach(['concat', 'join', 'pop', 'push', 'replace', 'shift', 'sort', 'splice', 'split', 'unshift'], function(methodName) {
          var func = (/^(?:replace|split)$/.test(methodName) ? stringProto : arrayProto)[methodName],
              chainName = /^(?:push|sort|unshift)$/.test(methodName) ? 'tap' : 'thru',
              retUnwrapped = /^(?:join|pop|replace|shift)$/.test(methodName);
    
          lodash.prototype[methodName] = function() {
            var args = arguments;
            if (retUnwrapped && !this.__chain__) {
              return func.apply(this.value(), args);
            }
            return this[chainName](function(value) {
              return func.apply(value, args);
            });
          };
        });
    
        // Map minified function names to their real names.
        baseForOwn(LazyWrapper.prototype, function(func, methodName) {
          var lodashFunc = lodash[methodName];
          if (lodashFunc) {
            var key = lodashFunc.name,
                names = realNames[key] || (realNames[key] = []);
    
            names.push({ 'name': methodName, 'func': lodashFunc });
          }
        });
    
        realNames[createHybridWrapper(null, BIND_KEY_FLAG).name] = [{ 'name': 'wrapper', 'func': null }];
    
        // Add functions to the lazy wrapper.
        LazyWrapper.prototype.clone = lazyClone;
        LazyWrapper.prototype.reverse = lazyReverse;
        LazyWrapper.prototype.value = lazyValue;
    
        // Add chaining functions to the `lodash` wrapper.
        lodash.prototype.chain = wrapperChain;
        lodash.prototype.commit = wrapperCommit;
        lodash.prototype.plant = wrapperPlant;
        lodash.prototype.reverse = wrapperReverse;
        lodash.prototype.toString = wrapperToString;
        lodash.prototype.run = lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue;
    
        // Add function aliases to the `lodash` wrapper.
        lodash.prototype.collect = lodash.prototype.map;
        lodash.prototype.head = lodash.prototype.first;
        lodash.prototype.select = lodash.prototype.filter;
        lodash.prototype.tail = lodash.prototype.rest;
    
        return lodash;
      }
    
      /*--------------------------------------------------------------------------*/
    
      // Export lodash.
      var _ = runInContext();
    
      // Some AMD build optimizers like r.js check for condition patterns like the following:
      if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
        // Expose lodash to the global object when an AMD loader is present to avoid
        // errors in cases where lodash is loaded by a script tag and not intended
        // as an AMD module. See http://requirejs.org/docs/errors.html#mismatch for
        // more details.
        root._ = _;
    
        // Define as an anonymous module so, through path mapping, it can be
        // referenced as the "underscore" module.
        define(function() {
          return _;
        });
      }
      // Check for `exports` after `define` in case a build optimizer adds an `exports` object.
      else if (freeExports && freeModule) {
        // Export for Node.js or RingoJS.
        if (moduleExports) {
          (freeModule.exports = _)._ = _;
        }
        // Export for Rhino with CommonJS support.
        else {
          freeExports._ = _;
        }
      }
      else {
        // Export for a browser or Rhino.
        root._ = _;
      }
    }.call(this));
    
  provide("lodash", module.exports);
}(global));

// pakmanager:glob/common.js
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  exports.alphasort = alphasort
    exports.alphasorti = alphasorti
    exports.setopts = setopts
    exports.ownProp = ownProp
    exports.makeAbs = makeAbs
    exports.finish = finish
    exports.mark = mark
    exports.isIgnored = isIgnored
    exports.childrenIgnored = childrenIgnored
    
    function ownProp (obj, field) {
      return Object.prototype.hasOwnProperty.call(obj, field)
    }
    
    var path = require("path")
    var minimatch = require("minimatch")
    var isAbsolute = require("path-is-absolute")
    var Minimatch = minimatch.Minimatch
    
    function alphasorti (a, b) {
      return a.toLowerCase().localeCompare(b.toLowerCase())
    }
    
    function alphasort (a, b) {
      return a.localeCompare(b)
    }
    
    function setupIgnores (self, options) {
      self.ignore = options.ignore || []
    
      if (!Array.isArray(self.ignore))
        self.ignore = [self.ignore]
    
      if (self.ignore.length) {
        self.ignore = self.ignore.map(ignoreMap)
      }
    }
    
    function ignoreMap (pattern) {
      var gmatcher = null
      if (pattern.slice(-3) === '/**') {
        var gpattern = pattern.replace(/(\/\*\*)+$/, '')
        gmatcher = new Minimatch(gpattern)
      }
    
      return {
        matcher: new Minimatch(pattern),
        gmatcher: gmatcher
      }
    }
    
    function setopts (self, pattern, options) {
      if (!options)
        options = {}
    
      // base-matching: just use globstar for that.
      if (options.matchBase && -1 === pattern.indexOf("/")) {
        if (options.noglobstar) {
          throw new Error("base matching requires globstar")
        }
        pattern = "**/" + pattern
      }
    
      self.silent = !!options.silent
      self.pattern = pattern
      self.strict = options.strict !== false
      self.realpath = !!options.realpath
      self.realpathCache = options.realpathCache || Object.create(null)
      self.follow = !!options.follow
      self.dot = !!options.dot
      self.mark = !!options.mark
      self.nodir = !!options.nodir
      if (self.nodir)
        self.mark = true
      self.sync = !!options.sync
      self.nounique = !!options.nounique
      self.nonull = !!options.nonull
      self.nosort = !!options.nosort
      self.nocase = !!options.nocase
      self.stat = !!options.stat
      self.noprocess = !!options.noprocess
    
      self.maxLength = options.maxLength || Infinity
      self.cache = options.cache || Object.create(null)
      self.statCache = options.statCache || Object.create(null)
      self.symlinks = options.symlinks || Object.create(null)
    
      setupIgnores(self, options)
    
      self.changedCwd = false
      var cwd = process.cwd()
      if (!ownProp(options, "cwd"))
        self.cwd = cwd
      else {
        self.cwd = options.cwd
        self.changedCwd = path.resolve(options.cwd) !== cwd
      }
    
      self.root = options.root || path.resolve(self.cwd, "/")
      self.root = path.resolve(self.root)
      if (process.platform === "win32")
        self.root = self.root.replace(/\\/g, "/")
    
      self.nomount = !!options.nomount
    
      // disable comments and negation unless the user explicitly
      // passes in false as the option.
      options.nonegate = options.nonegate === false ? false : true
      options.nocomment = options.nocomment === false ? false : true
      deprecationWarning(options)
    
      self.minimatch = new Minimatch(pattern, options)
      self.options = self.minimatch.options
    }
    
    // TODO(isaacs): remove entirely in v6
    // exported to reset in tests
    exports.deprecationWarned
    function deprecationWarning(options) {
      if (!options.nonegate || !options.nocomment) {
        if (process.noDeprecation !== true && !exports.deprecationWarned) {
          var msg = 'glob WARNING: comments and negation will be disabled in v6'
          if (process.throwDeprecation)
            throw new Error(msg)
          else if (process.traceDeprecation)
            console.trace(msg)
          else
            console.error(msg)
    
          exports.deprecationWarned = true
        }
      }
    }
    
    function finish (self) {
      var nou = self.nounique
      var all = nou ? [] : Object.create(null)
    
      for (var i = 0, l = self.matches.length; i < l; i ++) {
        var matches = self.matches[i]
        if (!matches || Object.keys(matches).length === 0) {
          if (self.nonull) {
            // do like the shell, and spit out the literal glob
            var literal = self.minimatch.globSet[i]
            if (nou)
              all.push(literal)
            else
              all[literal] = true
          }
        } else {
          // had matches
          var m = Object.keys(matches)
          if (nou)
            all.push.apply(all, m)
          else
            m.forEach(function (m) {
              all[m] = true
            })
        }
      }
    
      if (!nou)
        all = Object.keys(all)
    
      if (!self.nosort)
        all = all.sort(self.nocase ? alphasorti : alphasort)
    
      // at *some* point we statted all of these
      if (self.mark) {
        for (var i = 0; i < all.length; i++) {
          all[i] = self._mark(all[i])
        }
        if (self.nodir) {
          all = all.filter(function (e) {
            return !(/\/$/.test(e))
          })
        }
      }
    
      if (self.ignore.length)
        all = all.filter(function(m) {
          return !isIgnored(self, m)
        })
    
      self.found = all
    }
    
    function mark (self, p) {
      var abs = makeAbs(self, p)
      var c = self.cache[abs]
      var m = p
      if (c) {
        var isDir = c === 'DIR' || Array.isArray(c)
        var slash = p.slice(-1) === '/'
    
        if (isDir && !slash)
          m += '/'
        else if (!isDir && slash)
          m = m.slice(0, -1)
    
        if (m !== p) {
          var mabs = makeAbs(self, m)
          self.statCache[mabs] = self.statCache[abs]
          self.cache[mabs] = self.cache[abs]
        }
      }
    
      return m
    }
    
    // lotta situps...
    function makeAbs (self, f) {
      var abs = f
      if (f.charAt(0) === '/') {
        abs = path.join(self.root, f)
      } else if (isAbsolute(f) || f === '') {
        abs = f
      } else if (self.changedCwd) {
        abs = path.resolve(self.cwd, f)
      } else {
        abs = path.resolve(f)
      }
      return abs
    }
    
    
    // Return true, if pattern ends with globstar '**', for the accompanying parent directory.
    // Ex:- If node_modules/** is the pattern, add 'node_modules' to ignore list along with it's contents
    function isIgnored (self, path) {
      if (!self.ignore.length)
        return false
    
      return self.ignore.some(function(item) {
        return item.matcher.match(path) || !!(item.gmatcher && item.gmatcher.match(path))
      })
    }
    
    function childrenIgnored (self, path) {
      if (!self.ignore.length)
        return false
    
      return self.ignore.some(function(item) {
        return !!(item.gmatcher && item.gmatcher.match(path))
      })
    }
    
  provide("glob/common.js", module.exports);
}(global));

// pakmanager:glob/glob.js
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  // Approach:
    //
    // 1. Get the minimatch set
    // 2. For each pattern in the set, PROCESS(pattern, false)
    // 3. Store matches per-set, then uniq them
    //
    // PROCESS(pattern, inGlobStar)
    // Get the first [n] items from pattern that are all strings
    // Join these together.  This is PREFIX.
    //   If there is no more remaining, then stat(PREFIX) and
    //   add to matches if it succeeds.  END.
    //
    // If inGlobStar and PREFIX is symlink and points to dir
    //   set ENTRIES = []
    // else readdir(PREFIX) as ENTRIES
    //   If fail, END
    //
    // with ENTRIES
    //   If pattern[n] is GLOBSTAR
    //     // handle the case where the globstar match is empty
    //     // by pruning it out, and testing the resulting pattern
    //     PROCESS(pattern[0..n] + pattern[n+1 .. $], false)
    //     // handle other cases.
    //     for ENTRY in ENTRIES (not dotfiles)
    //       // attach globstar + tail onto the entry
    //       // Mark that this entry is a globstar match
    //       PROCESS(pattern[0..n] + ENTRY + pattern[n .. $], true)
    //
    //   else // not globstar
    //     for ENTRY in ENTRIES (not dotfiles, unless pattern[n] is dot)
    //       Test ENTRY against pattern[n]
    //       If fails, continue
    //       If passes, PROCESS(pattern[0..n] + item + pattern[n+1 .. $])
    //
    // Caveat:
    //   Cache all stats and readdirs results to minimize syscall.  Since all
    //   we ever care about is existence and directory-ness, we can just keep
    //   `true` for files, and [children,...] for directories, or `false` for
    //   things that don't exist.
    
    module.exports = glob
    
    var fs = require('fs')
    var minimatch = require('minimatch')
    var Minimatch = minimatch.Minimatch
    var inherits = require('inherits')
    var EE = require('events').EventEmitter
    var path = require('path')
    var assert = require('assert')
    var isAbsolute = require('path-is-absolute')
    var globSync =  require('glob/sync.js')
    var common =  require('glob/common.js')
    var alphasort = common.alphasort
    var alphasorti = common.alphasorti
    var setopts = common.setopts
    var ownProp = common.ownProp
    var inflight = require('inflight')
    var util = require('util')
    var childrenIgnored = common.childrenIgnored
    
    var once = require('once')
    
    function glob (pattern, options, cb) {
      if (typeof options === 'function') cb = options, options = {}
      if (!options) options = {}
    
      if (options.sync) {
        if (cb)
          throw new TypeError('callback provided to sync glob')
        return globSync(pattern, options)
      }
    
      return new Glob(pattern, options, cb)
    }
    
    glob.sync = globSync
    var GlobSync = glob.GlobSync = globSync.GlobSync
    
    // old api surface
    glob.glob = glob
    
    glob.hasMagic = function (pattern, options_) {
      var options = util._extend({}, options_)
      options.noprocess = true
    
      var g = new Glob(pattern, options)
      var set = g.minimatch.set
      if (set.length > 1)
        return true
    
      for (var j = 0; j < set[0].length; j++) {
        if (typeof set[0][j] !== 'string')
          return true
      }
    
      return false
    }
    
    glob.Glob = Glob
    inherits(Glob, EE)
    function Glob (pattern, options, cb) {
      if (typeof options === 'function') {
        cb = options
        options = null
      }
    
      if (options && options.sync) {
        if (cb)
          throw new TypeError('callback provided to sync glob')
        return new GlobSync(pattern, options)
      }
    
      if (!(this instanceof Glob))
        return new Glob(pattern, options, cb)
    
      setopts(this, pattern, options)
      this._didRealPath = false
    
      // process each pattern in the minimatch set
      var n = this.minimatch.set.length
    
      // The matches are stored as {<filename>: true,...} so that
      // duplicates are automagically pruned.
      // Later, we do an Object.keys() on these.
      // Keep them as a list so we can fill in when nonull is set.
      this.matches = new Array(n)
    
      if (typeof cb === 'function') {
        cb = once(cb)
        this.on('error', cb)
        this.on('end', function (matches) {
          cb(null, matches)
        })
      }
    
      var self = this
      var n = this.minimatch.set.length
      this._processing = 0
      this.matches = new Array(n)
    
      this._emitQueue = []
      this._processQueue = []
      this.paused = false
    
      if (this.noprocess)
        return this
    
      if (n === 0)
        return done()
    
      for (var i = 0; i < n; i ++) {
        this._process(this.minimatch.set[i], i, false, done)
      }
    
      function done () {
        --self._processing
        if (self._processing <= 0)
          self._finish()
      }
    }
    
    Glob.prototype._finish = function () {
      assert(this instanceof Glob)
      if (this.aborted)
        return
    
      if (this.realpath && !this._didRealpath)
        return this._realpath()
    
      common.finish(this)
      this.emit('end', this.found)
    }
    
    Glob.prototype._realpath = function () {
      if (this._didRealpath)
        return
    
      this._didRealpath = true
    
      var n = this.matches.length
      if (n === 0)
        return this._finish()
    
      var self = this
      for (var i = 0; i < this.matches.length; i++)
        this._realpathSet(i, next)
    
      function next () {
        if (--n === 0)
          self._finish()
      }
    }
    
    Glob.prototype._realpathSet = function (index, cb) {
      var matchset = this.matches[index]
      if (!matchset)
        return cb()
    
      var found = Object.keys(matchset)
      var self = this
      var n = found.length
    
      if (n === 0)
        return cb()
    
      var set = this.matches[index] = Object.create(null)
      found.forEach(function (p, i) {
        // If there's a problem with the stat, then it means that
        // one or more of the links in the realpath couldn't be
        // resolved.  just return the abs value in that case.
        p = self._makeAbs(p)
        fs.realpath(p, self.realpathCache, function (er, real) {
          if (!er)
            set[real] = true
          else if (er.syscall === 'stat')
            set[p] = true
          else
            self.emit('error', er) // srsly wtf right here
    
          if (--n === 0) {
            self.matches[index] = set
            cb()
          }
        })
      })
    }
    
    Glob.prototype._mark = function (p) {
      return common.mark(this, p)
    }
    
    Glob.prototype._makeAbs = function (f) {
      return common.makeAbs(this, f)
    }
    
    Glob.prototype.abort = function () {
      this.aborted = true
      this.emit('abort')
    }
    
    Glob.prototype.pause = function () {
      if (!this.paused) {
        this.paused = true
        this.emit('pause')
      }
    }
    
    Glob.prototype.resume = function () {
      if (this.paused) {
        this.emit('resume')
        this.paused = false
        if (this._emitQueue.length) {
          var eq = this._emitQueue.slice(0)
          this._emitQueue.length = 0
          for (var i = 0; i < eq.length; i ++) {
            var e = eq[i]
            this._emitMatch(e[0], e[1])
          }
        }
        if (this._processQueue.length) {
          var pq = this._processQueue.slice(0)
          this._processQueue.length = 0
          for (var i = 0; i < pq.length; i ++) {
            var p = pq[i]
            this._processing--
            this._process(p[0], p[1], p[2], p[3])
          }
        }
      }
    }
    
    Glob.prototype._process = function (pattern, index, inGlobStar, cb) {
      assert(this instanceof Glob)
      assert(typeof cb === 'function')
    
      if (this.aborted)
        return
    
      this._processing++
      if (this.paused) {
        this._processQueue.push([pattern, index, inGlobStar, cb])
        return
      }
    
      //console.error('PROCESS %d', this._processing, pattern)
    
      // Get the first [n] parts of pattern that are all strings.
      var n = 0
      while (typeof pattern[n] === 'string') {
        n ++
      }
      // now n is the index of the first one that is *not* a string.
    
      // see if there's anything else
      var prefix
      switch (n) {
        // if not, then this is rather simple
        case pattern.length:
          this._processSimple(pattern.join('/'), index, cb)
          return
    
        case 0:
          // pattern *starts* with some non-trivial item.
          // going to readdir(cwd), but not include the prefix in matches.
          prefix = null
          break
    
        default:
          // pattern has some string bits in the front.
          // whatever it starts with, whether that's 'absolute' like /foo/bar,
          // or 'relative' like '../baz'
          prefix = pattern.slice(0, n).join('/')
          break
      }
    
      var remain = pattern.slice(n)
    
      // get the list of entries.
      var read
      if (prefix === null)
        read = '.'
      else if (isAbsolute(prefix) || isAbsolute(pattern.join('/'))) {
        if (!prefix || !isAbsolute(prefix))
          prefix = '/' + prefix
        read = prefix
      } else
        read = prefix
    
      var abs = this._makeAbs(read)
    
      //if ignored, skip _processing
      if (childrenIgnored(this, read))
        return cb()
    
      var isGlobStar = remain[0] === minimatch.GLOBSTAR
      if (isGlobStar)
        this._processGlobStar(prefix, read, abs, remain, index, inGlobStar, cb)
      else
        this._processReaddir(prefix, read, abs, remain, index, inGlobStar, cb)
    }
    
    Glob.prototype._processReaddir = function (prefix, read, abs, remain, index, inGlobStar, cb) {
      var self = this
      this._readdir(abs, inGlobStar, function (er, entries) {
        return self._processReaddir2(prefix, read, abs, remain, index, inGlobStar, entries, cb)
      })
    }
    
    Glob.prototype._processReaddir2 = function (prefix, read, abs, remain, index, inGlobStar, entries, cb) {
    
      // if the abs isn't a dir, then nothing can match!
      if (!entries)
        return cb()
    
      // It will only match dot entries if it starts with a dot, or if
      // dot is set.  Stuff like @(.foo|.bar) isn't allowed.
      var pn = remain[0]
      var negate = !!this.minimatch.negate
      var rawGlob = pn._glob
      var dotOk = this.dot || rawGlob.charAt(0) === '.'
    
      var matchedEntries = []
      for (var i = 0; i < entries.length; i++) {
        var e = entries[i]
        if (e.charAt(0) !== '.' || dotOk) {
          var m
          if (negate && !prefix) {
            m = !e.match(pn)
          } else {
            m = e.match(pn)
          }
          if (m)
            matchedEntries.push(e)
        }
      }
    
      //console.error('prd2', prefix, entries, remain[0]._glob, matchedEntries)
    
      var len = matchedEntries.length
      // If there are no matched entries, then nothing matches.
      if (len === 0)
        return cb()
    
      // if this is the last remaining pattern bit, then no need for
      // an additional stat *unless* the user has specified mark or
      // stat explicitly.  We know they exist, since readdir returned
      // them.
    
      if (remain.length === 1 && !this.mark && !this.stat) {
        if (!this.matches[index])
          this.matches[index] = Object.create(null)
    
        for (var i = 0; i < len; i ++) {
          var e = matchedEntries[i]
          if (prefix) {
            if (prefix !== '/')
              e = prefix + '/' + e
            else
              e = prefix + e
          }
    
          if (e.charAt(0) === '/' && !this.nomount) {
            e = path.join(this.root, e)
          }
          this._emitMatch(index, e)
        }
        // This was the last one, and no stats were needed
        return cb()
      }
    
      // now test all matched entries as stand-ins for that part
      // of the pattern.
      remain.shift()
      for (var i = 0; i < len; i ++) {
        var e = matchedEntries[i]
        var newPattern
        if (prefix) {
          if (prefix !== '/')
            e = prefix + '/' + e
          else
            e = prefix + e
        }
        this._process([e].concat(remain), index, inGlobStar, cb)
      }
      cb()
    }
    
    Glob.prototype._emitMatch = function (index, e) {
      if (this.aborted)
        return
    
      if (this.matches[index][e])
        return
    
      if (this.paused) {
        this._emitQueue.push([index, e])
        return
      }
    
      var abs = this._makeAbs(e)
    
      if (this.nodir) {
        var c = this.cache[abs]
        if (c === 'DIR' || Array.isArray(c))
          return
      }
    
      if (this.mark)
        e = this._mark(e)
    
      this.matches[index][e] = true
    
      var st = this.statCache[abs]
      if (st)
        this.emit('stat', e, st)
    
      this.emit('match', e)
    }
    
    Glob.prototype._readdirInGlobStar = function (abs, cb) {
      if (this.aborted)
        return
    
      // follow all symlinked directories forever
      // just proceed as if this is a non-globstar situation
      if (this.follow)
        return this._readdir(abs, false, cb)
    
      var lstatkey = 'lstat\0' + abs
      var self = this
      var lstatcb = inflight(lstatkey, lstatcb_)
    
      if (lstatcb)
        fs.lstat(abs, lstatcb)
    
      function lstatcb_ (er, lstat) {
        if (er)
          return cb()
    
        var isSym = lstat.isSymbolicLink()
        self.symlinks[abs] = isSym
    
        // If it's not a symlink or a dir, then it's definitely a regular file.
        // don't bother doing a readdir in that case.
        if (!isSym && !lstat.isDirectory()) {
          self.cache[abs] = 'FILE'
          cb()
        } else
          self._readdir(abs, false, cb)
      }
    }
    
    Glob.prototype._readdir = function (abs, inGlobStar, cb) {
      if (this.aborted)
        return
    
      cb = inflight('readdir\0'+abs+'\0'+inGlobStar, cb)
      if (!cb)
        return
    
      //console.error('RD %j %j', +inGlobStar, abs)
      if (inGlobStar && !ownProp(this.symlinks, abs))
        return this._readdirInGlobStar(abs, cb)
    
      if (ownProp(this.cache, abs)) {
        var c = this.cache[abs]
        if (!c || c === 'FILE')
          return cb()
    
        if (Array.isArray(c))
          return cb(null, c)
      }
    
      var self = this
      fs.readdir(abs, readdirCb(this, abs, cb))
    }
    
    function readdirCb (self, abs, cb) {
      return function (er, entries) {
        if (er)
          self._readdirError(abs, er, cb)
        else
          self._readdirEntries(abs, entries, cb)
      }
    }
    
    Glob.prototype._readdirEntries = function (abs, entries, cb) {
      if (this.aborted)
        return
    
      // if we haven't asked to stat everything, then just
      // assume that everything in there exists, so we can avoid
      // having to stat it a second time.
      if (!this.mark && !this.stat) {
        for (var i = 0; i < entries.length; i ++) {
          var e = entries[i]
          if (abs === '/')
            e = abs + e
          else
            e = abs + '/' + e
          this.cache[e] = true
        }
      }
    
      this.cache[abs] = entries
      return cb(null, entries)
    }
    
    Glob.prototype._readdirError = function (f, er, cb) {
      if (this.aborted)
        return
    
      // handle errors, and cache the information
      switch (er.code) {
        case 'ENOTDIR': // totally normal. means it *does* exist.
          this.cache[this._makeAbs(f)] = 'FILE'
          break
    
        case 'ENOENT': // not terribly unusual
        case 'ELOOP':
        case 'ENAMETOOLONG':
        case 'UNKNOWN':
          this.cache[this._makeAbs(f)] = false
          break
    
        default: // some unusual error.  Treat as failure.
          this.cache[this._makeAbs(f)] = false
          if (this.strict) {
            this.emit('error', er)
            // If the error is handled, then we abort
            // if not, we threw out of here
            this.abort()
          }
          if (!this.silent)
            console.error('glob error', er)
          break
      }
    
      return cb()
    }
    
    Glob.prototype._processGlobStar = function (prefix, read, abs, remain, index, inGlobStar, cb) {
      var self = this
      this._readdir(abs, inGlobStar, function (er, entries) {
        self._processGlobStar2(prefix, read, abs, remain, index, inGlobStar, entries, cb)
      })
    }
    
    
    Glob.prototype._processGlobStar2 = function (prefix, read, abs, remain, index, inGlobStar, entries, cb) {
      //console.error('pgs2', prefix, remain[0], entries)
    
      // no entries means not a dir, so it can never have matches
      // foo.txt/** doesn't match foo.txt
      if (!entries)
        return cb()
    
      // test without the globstar, and with every child both below
      // and replacing the globstar.
      var remainWithoutGlobStar = remain.slice(1)
      var gspref = prefix ? [ prefix ] : []
      var noGlobStar = gspref.concat(remainWithoutGlobStar)
    
      // the noGlobStar pattern exits the inGlobStar state
      this._process(noGlobStar, index, false, cb)
    
      var isSym = this.symlinks[abs]
      var len = entries.length
    
      // If it's a symlink, and we're in a globstar, then stop
      if (isSym && inGlobStar)
        return cb()
    
      for (var i = 0; i < len; i++) {
        var e = entries[i]
        if (e.charAt(0) === '.' && !this.dot)
          continue
    
        // these two cases enter the inGlobStar state
        var instead = gspref.concat(entries[i], remainWithoutGlobStar)
        this._process(instead, index, true, cb)
    
        var below = gspref.concat(entries[i], remain)
        this._process(below, index, true, cb)
      }
    
      cb()
    }
    
    Glob.prototype._processSimple = function (prefix, index, cb) {
      // XXX review this.  Shouldn't it be doing the mounting etc
      // before doing stat?  kinda weird?
      var self = this
      this._stat(prefix, function (er, exists) {
        self._processSimple2(prefix, index, er, exists, cb)
      })
    }
    Glob.prototype._processSimple2 = function (prefix, index, er, exists, cb) {
    
      //console.error('ps2', prefix, exists)
    
      if (!this.matches[index])
        this.matches[index] = Object.create(null)
    
      // If it doesn't exist, then just mark the lack of results
      if (!exists)
        return cb()
    
      if (prefix && isAbsolute(prefix) && !this.nomount) {
        var trail = /[\/\\]$/.test(prefix)
        if (prefix.charAt(0) === '/') {
          prefix = path.join(this.root, prefix)
        } else {
          prefix = path.resolve(this.root, prefix)
          if (trail)
            prefix += '/'
        }
      }
    
      if (process.platform === 'win32')
        prefix = prefix.replace(/\\/g, '/')
    
      // Mark this as a match
      this._emitMatch(index, prefix)
      cb()
    }
    
    // Returns either 'DIR', 'FILE', or false
    Glob.prototype._stat = function (f, cb) {
      var abs = this._makeAbs(f)
      var needDir = f.slice(-1) === '/'
    
      if (f.length > this.maxLength)
        return cb()
    
      if (!this.stat && ownProp(this.cache, abs)) {
        var c = this.cache[abs]
    
        if (Array.isArray(c))
          c = 'DIR'
    
        // It exists, but maybe not how we need it
        if (!needDir || c === 'DIR')
          return cb(null, c)
    
        if (needDir && c === 'FILE')
          return cb()
    
        // otherwise we have to stat, because maybe c=true
        // if we know it exists, but not what it is.
      }
    
      var exists
      var stat = this.statCache[abs]
      if (stat !== undefined) {
        if (stat === false)
          return cb(null, stat)
        else {
          var type = stat.isDirectory() ? 'DIR' : 'FILE'
          if (needDir && type === 'FILE')
            return cb()
          else
            return cb(null, type, stat)
        }
      }
    
      var self = this
      var statcb = inflight('stat\0' + abs, lstatcb_)
      if (statcb)
        fs.lstat(abs, statcb)
    
      function lstatcb_ (er, lstat) {
        if (lstat && lstat.isSymbolicLink()) {
          // If it's a symlink, then treat it as the target, unless
          // the target does not exist, then treat it as a file.
          return fs.stat(abs, function (er, stat) {
            if (er)
              self._stat2(f, abs, null, lstat, cb)
            else
              self._stat2(f, abs, er, stat, cb)
          })
        } else {
          self._stat2(f, abs, er, lstat, cb)
        }
      }
    }
    
    Glob.prototype._stat2 = function (f, abs, er, stat, cb) {
      if (er) {
        this.statCache[abs] = false
        return cb()
      }
    
      var needDir = f.slice(-1) === '/'
      this.statCache[abs] = stat
    
      if (abs.slice(-1) === '/' && !stat.isDirectory())
        return cb(null, false, stat)
    
      var c = stat.isDirectory() ? 'DIR' : 'FILE'
      this.cache[abs] = this.cache[abs] || c
    
      if (needDir && c !== 'DIR')
        return cb()
    
      return cb(null, c, stat)
    }
    
  provide("glob/glob.js", module.exports);
}(global));

// pakmanager:glob/sync.js
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  module.exports = globSync
    globSync.GlobSync = GlobSync
    
    var fs = require('fs')
    var minimatch = require('minimatch')
    var Minimatch = minimatch.Minimatch
    var Glob =  require('glob/glob.js').Glob
    var util = require('util')
    var path = require('path')
    var assert = require('assert')
    var isAbsolute = require('path-is-absolute')
    var common =  require('glob/common.js')
    var alphasort = common.alphasort
    var alphasorti = common.alphasorti
    var setopts = common.setopts
    var ownProp = common.ownProp
    var childrenIgnored = common.childrenIgnored
    
    function globSync (pattern, options) {
      if (typeof options === 'function' || arguments.length === 3)
        throw new TypeError('callback provided to sync glob\n'+
                            'See: https://github.com/isaacs/node-glob/issues/167')
    
      return new GlobSync(pattern, options).found
    }
    
    function GlobSync (pattern, options) {
      if (!pattern)
        throw new Error('must provide pattern')
    
      if (typeof options === 'function' || arguments.length === 3)
        throw new TypeError('callback provided to sync glob\n'+
                            'See: https://github.com/isaacs/node-glob/issues/167')
    
      if (!(this instanceof GlobSync))
        return new GlobSync(pattern, options)
    
      setopts(this, pattern, options)
    
      if (this.noprocess)
        return this
    
      var n = this.minimatch.set.length
      this.matches = new Array(n)
      for (var i = 0; i < n; i ++) {
        this._process(this.minimatch.set[i], i, false)
      }
      this._finish()
    }
    
    GlobSync.prototype._finish = function () {
      assert(this instanceof GlobSync)
      if (this.realpath) {
        var self = this
        this.matches.forEach(function (matchset, index) {
          var set = self.matches[index] = Object.create(null)
          for (var p in matchset) {
            try {
              p = self._makeAbs(p)
              var real = fs.realpathSync(p, this.realpathCache)
              set[real] = true
            } catch (er) {
              if (er.syscall === 'stat')
                set[self._makeAbs(p)] = true
              else
                throw er
            }
          }
        })
      }
      common.finish(this)
    }
    
    
    GlobSync.prototype._process = function (pattern, index, inGlobStar) {
      assert(this instanceof GlobSync)
    
      // Get the first [n] parts of pattern that are all strings.
      var n = 0
      while (typeof pattern[n] === 'string') {
        n ++
      }
      // now n is the index of the first one that is *not* a string.
    
      // See if there's anything else
      var prefix
      switch (n) {
        // if not, then this is rather simple
        case pattern.length:
          this._processSimple(pattern.join('/'), index)
          return
    
        case 0:
          // pattern *starts* with some non-trivial item.
          // going to readdir(cwd), but not include the prefix in matches.
          prefix = null
          break
    
        default:
          // pattern has some string bits in the front.
          // whatever it starts with, whether that's 'absolute' like /foo/bar,
          // or 'relative' like '../baz'
          prefix = pattern.slice(0, n).join('/')
          break
      }
    
      var remain = pattern.slice(n)
    
      // get the list of entries.
      var read
      if (prefix === null)
        read = '.'
      else if (isAbsolute(prefix) || isAbsolute(pattern.join('/'))) {
        if (!prefix || !isAbsolute(prefix))
          prefix = '/' + prefix
        read = prefix
      } else
        read = prefix
    
      var abs = this._makeAbs(read)
    
      //if ignored, skip processing
      if (childrenIgnored(this, read))
        return
    
      var isGlobStar = remain[0] === minimatch.GLOBSTAR
      if (isGlobStar)
        this._processGlobStar(prefix, read, abs, remain, index, inGlobStar)
      else
        this._processReaddir(prefix, read, abs, remain, index, inGlobStar)
    }
    
    
    GlobSync.prototype._processReaddir = function (prefix, read, abs, remain, index, inGlobStar) {
      var entries = this._readdir(abs, inGlobStar)
    
      // if the abs isn't a dir, then nothing can match!
      if (!entries)
        return
    
      // It will only match dot entries if it starts with a dot, or if
      // dot is set.  Stuff like @(.foo|.bar) isn't allowed.
      var pn = remain[0]
      var negate = !!this.minimatch.negate
      var rawGlob = pn._glob
      var dotOk = this.dot || rawGlob.charAt(0) === '.'
    
      var matchedEntries = []
      for (var i = 0; i < entries.length; i++) {
        var e = entries[i]
        if (e.charAt(0) !== '.' || dotOk) {
          var m
          if (negate && !prefix) {
            m = !e.match(pn)
          } else {
            m = e.match(pn)
          }
          if (m)
            matchedEntries.push(e)
        }
      }
    
      var len = matchedEntries.length
      // If there are no matched entries, then nothing matches.
      if (len === 0)
        return
    
      // if this is the last remaining pattern bit, then no need for
      // an additional stat *unless* the user has specified mark or
      // stat explicitly.  We know they exist, since readdir returned
      // them.
    
      if (remain.length === 1 && !this.mark && !this.stat) {
        if (!this.matches[index])
          this.matches[index] = Object.create(null)
    
        for (var i = 0; i < len; i ++) {
          var e = matchedEntries[i]
          if (prefix) {
            if (prefix.slice(-1) !== '/')
              e = prefix + '/' + e
            else
              e = prefix + e
          }
    
          if (e.charAt(0) === '/' && !this.nomount) {
            e = path.join(this.root, e)
          }
          this.matches[index][e] = true
        }
        // This was the last one, and no stats were needed
        return
      }
    
      // now test all matched entries as stand-ins for that part
      // of the pattern.
      remain.shift()
      for (var i = 0; i < len; i ++) {
        var e = matchedEntries[i]
        var newPattern
        if (prefix)
          newPattern = [prefix, e]
        else
          newPattern = [e]
        this._process(newPattern.concat(remain), index, inGlobStar)
      }
    }
    
    
    GlobSync.prototype._emitMatch = function (index, e) {
      var abs = this._makeAbs(e)
      if (this.mark)
        e = this._mark(e)
    
      if (this.matches[index][e])
        return
    
      if (this.nodir) {
        var c = this.cache[this._makeAbs(e)]
        if (c === 'DIR' || Array.isArray(c))
          return
      }
    
      this.matches[index][e] = true
      if (this.stat)
        this._stat(e)
    }
    
    
    GlobSync.prototype._readdirInGlobStar = function (abs) {
      // follow all symlinked directories forever
      // just proceed as if this is a non-globstar situation
      if (this.follow)
        return this._readdir(abs, false)
    
      var entries
      var lstat
      var stat
      try {
        lstat = fs.lstatSync(abs)
      } catch (er) {
        // lstat failed, doesn't exist
        return null
      }
    
      var isSym = lstat.isSymbolicLink()
      this.symlinks[abs] = isSym
    
      // If it's not a symlink or a dir, then it's definitely a regular file.
      // don't bother doing a readdir in that case.
      if (!isSym && !lstat.isDirectory())
        this.cache[abs] = 'FILE'
      else
        entries = this._readdir(abs, false)
    
      return entries
    }
    
    GlobSync.prototype._readdir = function (abs, inGlobStar) {
      var entries
    
      if (inGlobStar && !ownProp(this.symlinks, abs))
        return this._readdirInGlobStar(abs)
    
      if (ownProp(this.cache, abs)) {
        var c = this.cache[abs]
        if (!c || c === 'FILE')
          return null
    
        if (Array.isArray(c))
          return c
      }
    
      try {
        return this._readdirEntries(abs, fs.readdirSync(abs))
      } catch (er) {
        this._readdirError(abs, er)
        return null
      }
    }
    
    GlobSync.prototype._readdirEntries = function (abs, entries) {
      // if we haven't asked to stat everything, then just
      // assume that everything in there exists, so we can avoid
      // having to stat it a second time.
      if (!this.mark && !this.stat) {
        for (var i = 0; i < entries.length; i ++) {
          var e = entries[i]
          if (abs === '/')
            e = abs + e
          else
            e = abs + '/' + e
          this.cache[e] = true
        }
      }
    
      this.cache[abs] = entries
    
      // mark and cache dir-ness
      return entries
    }
    
    GlobSync.prototype._readdirError = function (f, er) {
      // handle errors, and cache the information
      switch (er.code) {
        case 'ENOTDIR': // totally normal. means it *does* exist.
          this.cache[this._makeAbs(f)] = 'FILE'
          break
    
        case 'ENOENT': // not terribly unusual
        case 'ELOOP':
        case 'ENAMETOOLONG':
        case 'UNKNOWN':
          this.cache[this._makeAbs(f)] = false
          break
    
        default: // some unusual error.  Treat as failure.
          this.cache[this._makeAbs(f)] = false
          if (this.strict)
            throw er
          if (!this.silent)
            console.error('glob error', er)
          break
      }
    }
    
    GlobSync.prototype._processGlobStar = function (prefix, read, abs, remain, index, inGlobStar) {
    
      var entries = this._readdir(abs, inGlobStar)
    
      // no entries means not a dir, so it can never have matches
      // foo.txt/** doesn't match foo.txt
      if (!entries)
        return
    
      // test without the globstar, and with every child both below
      // and replacing the globstar.
      var remainWithoutGlobStar = remain.slice(1)
      var gspref = prefix ? [ prefix ] : []
      var noGlobStar = gspref.concat(remainWithoutGlobStar)
    
      // the noGlobStar pattern exits the inGlobStar state
      this._process(noGlobStar, index, false)
    
      var len = entries.length
      var isSym = this.symlinks[abs]
    
      // If it's a symlink, and we're in a globstar, then stop
      if (isSym && inGlobStar)
        return
    
      for (var i = 0; i < len; i++) {
        var e = entries[i]
        if (e.charAt(0) === '.' && !this.dot)
          continue
    
        // these two cases enter the inGlobStar state
        var instead = gspref.concat(entries[i], remainWithoutGlobStar)
        this._process(instead, index, true)
    
        var below = gspref.concat(entries[i], remain)
        this._process(below, index, true)
      }
    }
    
    GlobSync.prototype._processSimple = function (prefix, index) {
      // XXX review this.  Shouldn't it be doing the mounting etc
      // before doing stat?  kinda weird?
      var exists = this._stat(prefix)
    
      if (!this.matches[index])
        this.matches[index] = Object.create(null)
    
      // If it doesn't exist, then just mark the lack of results
      if (!exists)
        return
    
      if (prefix && isAbsolute(prefix) && !this.nomount) {
        var trail = /[\/\\]$/.test(prefix)
        if (prefix.charAt(0) === '/') {
          prefix = path.join(this.root, prefix)
        } else {
          prefix = path.resolve(this.root, prefix)
          if (trail)
            prefix += '/'
        }
      }
    
      if (process.platform === 'win32')
        prefix = prefix.replace(/\\/g, '/')
    
      // Mark this as a match
      this.matches[index][prefix] = true
    }
    
    // Returns either 'DIR', 'FILE', or false
    GlobSync.prototype._stat = function (f) {
      var abs = this._makeAbs(f)
      var needDir = f.slice(-1) === '/'
    
      if (f.length > this.maxLength)
        return false
    
      if (!this.stat && ownProp(this.cache, abs)) {
        var c = this.cache[abs]
    
        if (Array.isArray(c))
          c = 'DIR'
    
        // It exists, but maybe not how we need it
        if (!needDir || c === 'DIR')
          return c
    
        if (needDir && c === 'FILE')
          return false
    
        // otherwise we have to stat, because maybe c=true
        // if we know it exists, but not what it is.
      }
    
      var exists
      var stat = this.statCache[abs]
      if (!stat) {
        var lstat
        try {
          lstat = fs.lstatSync(abs)
        } catch (er) {
          return false
        }
    
        if (lstat.isSymbolicLink()) {
          try {
            stat = fs.statSync(abs)
          } catch (er) {
            stat = lstat
          }
        } else {
          stat = lstat
        }
      }
    
      this.statCache[abs] = stat
    
      var c = stat.isDirectory() ? 'DIR' : 'FILE'
      this.cache[abs] = this.cache[abs] || c
    
      if (needDir && c !== 'DIR')
        return false
    
      return c
    }
    
    GlobSync.prototype._mark = function (p) {
      return common.mark(this, p)
    }
    
    GlobSync.prototype._makeAbs = function (f) {
      return common.makeAbs(this, f)
    }
    
  provide("glob/sync.js", module.exports);
}(global));

// pakmanager:glob
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  // Approach:
    //
    // 1. Get the minimatch set
    // 2. For each pattern in the set, PROCESS(pattern, false)
    // 3. Store matches per-set, then uniq them
    //
    // PROCESS(pattern, inGlobStar)
    // Get the first [n] items from pattern that are all strings
    // Join these together.  This is PREFIX.
    //   If there is no more remaining, then stat(PREFIX) and
    //   add to matches if it succeeds.  END.
    //
    // If inGlobStar and PREFIX is symlink and points to dir
    //   set ENTRIES = []
    // else readdir(PREFIX) as ENTRIES
    //   If fail, END
    //
    // with ENTRIES
    //   If pattern[n] is GLOBSTAR
    //     // handle the case where the globstar match is empty
    //     // by pruning it out, and testing the resulting pattern
    //     PROCESS(pattern[0..n] + pattern[n+1 .. $], false)
    //     // handle other cases.
    //     for ENTRY in ENTRIES (not dotfiles)
    //       // attach globstar + tail onto the entry
    //       // Mark that this entry is a globstar match
    //       PROCESS(pattern[0..n] + ENTRY + pattern[n .. $], true)
    //
    //   else // not globstar
    //     for ENTRY in ENTRIES (not dotfiles, unless pattern[n] is dot)
    //       Test ENTRY against pattern[n]
    //       If fails, continue
    //       If passes, PROCESS(pattern[0..n] + item + pattern[n+1 .. $])
    //
    // Caveat:
    //   Cache all stats and readdirs results to minimize syscall.  Since all
    //   we ever care about is existence and directory-ness, we can just keep
    //   `true` for files, and [children,...] for directories, or `false` for
    //   things that don't exist.
    
    module.exports = glob
    
    var fs = require('fs')
    var minimatch = require('minimatch')
    var Minimatch = minimatch.Minimatch
    var inherits = require('inherits')
    var EE = require('events').EventEmitter
    var path = require('path')
    var assert = require('assert')
    var isAbsolute = require('path-is-absolute')
    var globSync =  require('glob/sync.js')
    var common =  require('glob/common.js')
    var alphasort = common.alphasort
    var alphasorti = common.alphasorti
    var setopts = common.setopts
    var ownProp = common.ownProp
    var inflight = require('inflight')
    var util = require('util')
    var childrenIgnored = common.childrenIgnored
    
    var once = require('once')
    
    function glob (pattern, options, cb) {
      if (typeof options === 'function') cb = options, options = {}
      if (!options) options = {}
    
      if (options.sync) {
        if (cb)
          throw new TypeError('callback provided to sync glob')
        return globSync(pattern, options)
      }
    
      return new Glob(pattern, options, cb)
    }
    
    glob.sync = globSync
    var GlobSync = glob.GlobSync = globSync.GlobSync
    
    // old api surface
    glob.glob = glob
    
    glob.hasMagic = function (pattern, options_) {
      var options = util._extend({}, options_)
      options.noprocess = true
    
      var g = new Glob(pattern, options)
      var set = g.minimatch.set
      if (set.length > 1)
        return true
    
      for (var j = 0; j < set[0].length; j++) {
        if (typeof set[0][j] !== 'string')
          return true
      }
    
      return false
    }
    
    glob.Glob = Glob
    inherits(Glob, EE)
    function Glob (pattern, options, cb) {
      if (typeof options === 'function') {
        cb = options
        options = null
      }
    
      if (options && options.sync) {
        if (cb)
          throw new TypeError('callback provided to sync glob')
        return new GlobSync(pattern, options)
      }
    
      if (!(this instanceof Glob))
        return new Glob(pattern, options, cb)
    
      setopts(this, pattern, options)
      this._didRealPath = false
    
      // process each pattern in the minimatch set
      var n = this.minimatch.set.length
    
      // The matches are stored as {<filename>: true,...} so that
      // duplicates are automagically pruned.
      // Later, we do an Object.keys() on these.
      // Keep them as a list so we can fill in when nonull is set.
      this.matches = new Array(n)
    
      if (typeof cb === 'function') {
        cb = once(cb)
        this.on('error', cb)
        this.on('end', function (matches) {
          cb(null, matches)
        })
      }
    
      var self = this
      var n = this.minimatch.set.length
      this._processing = 0
      this.matches = new Array(n)
    
      this._emitQueue = []
      this._processQueue = []
      this.paused = false
    
      if (this.noprocess)
        return this
    
      if (n === 0)
        return done()
    
      for (var i = 0; i < n; i ++) {
        this._process(this.minimatch.set[i], i, false, done)
      }
    
      function done () {
        --self._processing
        if (self._processing <= 0)
          self._finish()
      }
    }
    
    Glob.prototype._finish = function () {
      assert(this instanceof Glob)
      if (this.aborted)
        return
    
      if (this.realpath && !this._didRealpath)
        return this._realpath()
    
      common.finish(this)
      this.emit('end', this.found)
    }
    
    Glob.prototype._realpath = function () {
      if (this._didRealpath)
        return
    
      this._didRealpath = true
    
      var n = this.matches.length
      if (n === 0)
        return this._finish()
    
      var self = this
      for (var i = 0; i < this.matches.length; i++)
        this._realpathSet(i, next)
    
      function next () {
        if (--n === 0)
          self._finish()
      }
    }
    
    Glob.prototype._realpathSet = function (index, cb) {
      var matchset = this.matches[index]
      if (!matchset)
        return cb()
    
      var found = Object.keys(matchset)
      var self = this
      var n = found.length
    
      if (n === 0)
        return cb()
    
      var set = this.matches[index] = Object.create(null)
      found.forEach(function (p, i) {
        // If there's a problem with the stat, then it means that
        // one or more of the links in the realpath couldn't be
        // resolved.  just return the abs value in that case.
        p = self._makeAbs(p)
        fs.realpath(p, self.realpathCache, function (er, real) {
          if (!er)
            set[real] = true
          else if (er.syscall === 'stat')
            set[p] = true
          else
            self.emit('error', er) // srsly wtf right here
    
          if (--n === 0) {
            self.matches[index] = set
            cb()
          }
        })
      })
    }
    
    Glob.prototype._mark = function (p) {
      return common.mark(this, p)
    }
    
    Glob.prototype._makeAbs = function (f) {
      return common.makeAbs(this, f)
    }
    
    Glob.prototype.abort = function () {
      this.aborted = true
      this.emit('abort')
    }
    
    Glob.prototype.pause = function () {
      if (!this.paused) {
        this.paused = true
        this.emit('pause')
      }
    }
    
    Glob.prototype.resume = function () {
      if (this.paused) {
        this.emit('resume')
        this.paused = false
        if (this._emitQueue.length) {
          var eq = this._emitQueue.slice(0)
          this._emitQueue.length = 0
          for (var i = 0; i < eq.length; i ++) {
            var e = eq[i]
            this._emitMatch(e[0], e[1])
          }
        }
        if (this._processQueue.length) {
          var pq = this._processQueue.slice(0)
          this._processQueue.length = 0
          for (var i = 0; i < pq.length; i ++) {
            var p = pq[i]
            this._processing--
            this._process(p[0], p[1], p[2], p[3])
          }
        }
      }
    }
    
    Glob.prototype._process = function (pattern, index, inGlobStar, cb) {
      assert(this instanceof Glob)
      assert(typeof cb === 'function')
    
      if (this.aborted)
        return
    
      this._processing++
      if (this.paused) {
        this._processQueue.push([pattern, index, inGlobStar, cb])
        return
      }
    
      //console.error('PROCESS %d', this._processing, pattern)
    
      // Get the first [n] parts of pattern that are all strings.
      var n = 0
      while (typeof pattern[n] === 'string') {
        n ++
      }
      // now n is the index of the first one that is *not* a string.
    
      // see if there's anything else
      var prefix
      switch (n) {
        // if not, then this is rather simple
        case pattern.length:
          this._processSimple(pattern.join('/'), index, cb)
          return
    
        case 0:
          // pattern *starts* with some non-trivial item.
          // going to readdir(cwd), but not include the prefix in matches.
          prefix = null
          break
    
        default:
          // pattern has some string bits in the front.
          // whatever it starts with, whether that's 'absolute' like /foo/bar,
          // or 'relative' like '../baz'
          prefix = pattern.slice(0, n).join('/')
          break
      }
    
      var remain = pattern.slice(n)
    
      // get the list of entries.
      var read
      if (prefix === null)
        read = '.'
      else if (isAbsolute(prefix) || isAbsolute(pattern.join('/'))) {
        if (!prefix || !isAbsolute(prefix))
          prefix = '/' + prefix
        read = prefix
      } else
        read = prefix
    
      var abs = this._makeAbs(read)
    
      //if ignored, skip _processing
      if (childrenIgnored(this, read))
        return cb()
    
      var isGlobStar = remain[0] === minimatch.GLOBSTAR
      if (isGlobStar)
        this._processGlobStar(prefix, read, abs, remain, index, inGlobStar, cb)
      else
        this._processReaddir(prefix, read, abs, remain, index, inGlobStar, cb)
    }
    
    Glob.prototype._processReaddir = function (prefix, read, abs, remain, index, inGlobStar, cb) {
      var self = this
      this._readdir(abs, inGlobStar, function (er, entries) {
        return self._processReaddir2(prefix, read, abs, remain, index, inGlobStar, entries, cb)
      })
    }
    
    Glob.prototype._processReaddir2 = function (prefix, read, abs, remain, index, inGlobStar, entries, cb) {
    
      // if the abs isn't a dir, then nothing can match!
      if (!entries)
        return cb()
    
      // It will only match dot entries if it starts with a dot, or if
      // dot is set.  Stuff like @(.foo|.bar) isn't allowed.
      var pn = remain[0]
      var negate = !!this.minimatch.negate
      var rawGlob = pn._glob
      var dotOk = this.dot || rawGlob.charAt(0) === '.'
    
      var matchedEntries = []
      for (var i = 0; i < entries.length; i++) {
        var e = entries[i]
        if (e.charAt(0) !== '.' || dotOk) {
          var m
          if (negate && !prefix) {
            m = !e.match(pn)
          } else {
            m = e.match(pn)
          }
          if (m)
            matchedEntries.push(e)
        }
      }
    
      //console.error('prd2', prefix, entries, remain[0]._glob, matchedEntries)
    
      var len = matchedEntries.length
      // If there are no matched entries, then nothing matches.
      if (len === 0)
        return cb()
    
      // if this is the last remaining pattern bit, then no need for
      // an additional stat *unless* the user has specified mark or
      // stat explicitly.  We know they exist, since readdir returned
      // them.
    
      if (remain.length === 1 && !this.mark && !this.stat) {
        if (!this.matches[index])
          this.matches[index] = Object.create(null)
    
        for (var i = 0; i < len; i ++) {
          var e = matchedEntries[i]
          if (prefix) {
            if (prefix !== '/')
              e = prefix + '/' + e
            else
              e = prefix + e
          }
    
          if (e.charAt(0) === '/' && !this.nomount) {
            e = path.join(this.root, e)
          }
          this._emitMatch(index, e)
        }
        // This was the last one, and no stats were needed
        return cb()
      }
    
      // now test all matched entries as stand-ins for that part
      // of the pattern.
      remain.shift()
      for (var i = 0; i < len; i ++) {
        var e = matchedEntries[i]
        var newPattern
        if (prefix) {
          if (prefix !== '/')
            e = prefix + '/' + e
          else
            e = prefix + e
        }
        this._process([e].concat(remain), index, inGlobStar, cb)
      }
      cb()
    }
    
    Glob.prototype._emitMatch = function (index, e) {
      if (this.aborted)
        return
    
      if (this.matches[index][e])
        return
    
      if (this.paused) {
        this._emitQueue.push([index, e])
        return
      }
    
      var abs = this._makeAbs(e)
    
      if (this.nodir) {
        var c = this.cache[abs]
        if (c === 'DIR' || Array.isArray(c))
          return
      }
    
      if (this.mark)
        e = this._mark(e)
    
      this.matches[index][e] = true
    
      var st = this.statCache[abs]
      if (st)
        this.emit('stat', e, st)
    
      this.emit('match', e)
    }
    
    Glob.prototype._readdirInGlobStar = function (abs, cb) {
      if (this.aborted)
        return
    
      // follow all symlinked directories forever
      // just proceed as if this is a non-globstar situation
      if (this.follow)
        return this._readdir(abs, false, cb)
    
      var lstatkey = 'lstat\0' + abs
      var self = this
      var lstatcb = inflight(lstatkey, lstatcb_)
    
      if (lstatcb)
        fs.lstat(abs, lstatcb)
    
      function lstatcb_ (er, lstat) {
        if (er)
          return cb()
    
        var isSym = lstat.isSymbolicLink()
        self.symlinks[abs] = isSym
    
        // If it's not a symlink or a dir, then it's definitely a regular file.
        // don't bother doing a readdir in that case.
        if (!isSym && !lstat.isDirectory()) {
          self.cache[abs] = 'FILE'
          cb()
        } else
          self._readdir(abs, false, cb)
      }
    }
    
    Glob.prototype._readdir = function (abs, inGlobStar, cb) {
      if (this.aborted)
        return
    
      cb = inflight('readdir\0'+abs+'\0'+inGlobStar, cb)
      if (!cb)
        return
    
      //console.error('RD %j %j', +inGlobStar, abs)
      if (inGlobStar && !ownProp(this.symlinks, abs))
        return this._readdirInGlobStar(abs, cb)
    
      if (ownProp(this.cache, abs)) {
        var c = this.cache[abs]
        if (!c || c === 'FILE')
          return cb()
    
        if (Array.isArray(c))
          return cb(null, c)
      }
    
      var self = this
      fs.readdir(abs, readdirCb(this, abs, cb))
    }
    
    function readdirCb (self, abs, cb) {
      return function (er, entries) {
        if (er)
          self._readdirError(abs, er, cb)
        else
          self._readdirEntries(abs, entries, cb)
      }
    }
    
    Glob.prototype._readdirEntries = function (abs, entries, cb) {
      if (this.aborted)
        return
    
      // if we haven't asked to stat everything, then just
      // assume that everything in there exists, so we can avoid
      // having to stat it a second time.
      if (!this.mark && !this.stat) {
        for (var i = 0; i < entries.length; i ++) {
          var e = entries[i]
          if (abs === '/')
            e = abs + e
          else
            e = abs + '/' + e
          this.cache[e] = true
        }
      }
    
      this.cache[abs] = entries
      return cb(null, entries)
    }
    
    Glob.prototype._readdirError = function (f, er, cb) {
      if (this.aborted)
        return
    
      // handle errors, and cache the information
      switch (er.code) {
        case 'ENOTDIR': // totally normal. means it *does* exist.
          this.cache[this._makeAbs(f)] = 'FILE'
          break
    
        case 'ENOENT': // not terribly unusual
        case 'ELOOP':
        case 'ENAMETOOLONG':
        case 'UNKNOWN':
          this.cache[this._makeAbs(f)] = false
          break
    
        default: // some unusual error.  Treat as failure.
          this.cache[this._makeAbs(f)] = false
          if (this.strict) {
            this.emit('error', er)
            // If the error is handled, then we abort
            // if not, we threw out of here
            this.abort()
          }
          if (!this.silent)
            console.error('glob error', er)
          break
      }
    
      return cb()
    }
    
    Glob.prototype._processGlobStar = function (prefix, read, abs, remain, index, inGlobStar, cb) {
      var self = this
      this._readdir(abs, inGlobStar, function (er, entries) {
        self._processGlobStar2(prefix, read, abs, remain, index, inGlobStar, entries, cb)
      })
    }
    
    
    Glob.prototype._processGlobStar2 = function (prefix, read, abs, remain, index, inGlobStar, entries, cb) {
      //console.error('pgs2', prefix, remain[0], entries)
    
      // no entries means not a dir, so it can never have matches
      // foo.txt/** doesn't match foo.txt
      if (!entries)
        return cb()
    
      // test without the globstar, and with every child both below
      // and replacing the globstar.
      var remainWithoutGlobStar = remain.slice(1)
      var gspref = prefix ? [ prefix ] : []
      var noGlobStar = gspref.concat(remainWithoutGlobStar)
    
      // the noGlobStar pattern exits the inGlobStar state
      this._process(noGlobStar, index, false, cb)
    
      var isSym = this.symlinks[abs]
      var len = entries.length
    
      // If it's a symlink, and we're in a globstar, then stop
      if (isSym && inGlobStar)
        return cb()
    
      for (var i = 0; i < len; i++) {
        var e = entries[i]
        if (e.charAt(0) === '.' && !this.dot)
          continue
    
        // these two cases enter the inGlobStar state
        var instead = gspref.concat(entries[i], remainWithoutGlobStar)
        this._process(instead, index, true, cb)
    
        var below = gspref.concat(entries[i], remain)
        this._process(below, index, true, cb)
      }
    
      cb()
    }
    
    Glob.prototype._processSimple = function (prefix, index, cb) {
      // XXX review this.  Shouldn't it be doing the mounting etc
      // before doing stat?  kinda weird?
      var self = this
      this._stat(prefix, function (er, exists) {
        self._processSimple2(prefix, index, er, exists, cb)
      })
    }
    Glob.prototype._processSimple2 = function (prefix, index, er, exists, cb) {
    
      //console.error('ps2', prefix, exists)
    
      if (!this.matches[index])
        this.matches[index] = Object.create(null)
    
      // If it doesn't exist, then just mark the lack of results
      if (!exists)
        return cb()
    
      if (prefix && isAbsolute(prefix) && !this.nomount) {
        var trail = /[\/\\]$/.test(prefix)
        if (prefix.charAt(0) === '/') {
          prefix = path.join(this.root, prefix)
        } else {
          prefix = path.resolve(this.root, prefix)
          if (trail)
            prefix += '/'
        }
      }
    
      if (process.platform === 'win32')
        prefix = prefix.replace(/\\/g, '/')
    
      // Mark this as a match
      this._emitMatch(index, prefix)
      cb()
    }
    
    // Returns either 'DIR', 'FILE', or false
    Glob.prototype._stat = function (f, cb) {
      var abs = this._makeAbs(f)
      var needDir = f.slice(-1) === '/'
    
      if (f.length > this.maxLength)
        return cb()
    
      if (!this.stat && ownProp(this.cache, abs)) {
        var c = this.cache[abs]
    
        if (Array.isArray(c))
          c = 'DIR'
    
        // It exists, but maybe not how we need it
        if (!needDir || c === 'DIR')
          return cb(null, c)
    
        if (needDir && c === 'FILE')
          return cb()
    
        // otherwise we have to stat, because maybe c=true
        // if we know it exists, but not what it is.
      }
    
      var exists
      var stat = this.statCache[abs]
      if (stat !== undefined) {
        if (stat === false)
          return cb(null, stat)
        else {
          var type = stat.isDirectory() ? 'DIR' : 'FILE'
          if (needDir && type === 'FILE')
            return cb()
          else
            return cb(null, type, stat)
        }
      }
    
      var self = this
      var statcb = inflight('stat\0' + abs, lstatcb_)
      if (statcb)
        fs.lstat(abs, statcb)
    
      function lstatcb_ (er, lstat) {
        if (lstat && lstat.isSymbolicLink()) {
          // If it's a symlink, then treat it as the target, unless
          // the target does not exist, then treat it as a file.
          return fs.stat(abs, function (er, stat) {
            if (er)
              self._stat2(f, abs, null, lstat, cb)
            else
              self._stat2(f, abs, er, stat, cb)
          })
        } else {
          self._stat2(f, abs, er, lstat, cb)
        }
      }
    }
    
    Glob.prototype._stat2 = function (f, abs, er, stat, cb) {
      if (er) {
        this.statCache[abs] = false
        return cb()
      }
    
      var needDir = f.slice(-1) === '/'
      this.statCache[abs] = stat
    
      if (abs.slice(-1) === '/' && !stat.isDirectory())
        return cb(null, false, stat)
    
      var c = stat.isDirectory() ? 'DIR' : 'FILE'
      this.cache[abs] = this.cache[abs] || c
    
      if (needDir && c !== 'DIR')
        return cb()
    
      return cb(null, c, stat)
    }
    
  provide("glob", module.exports);
}(global));

// pakmanager:ansi-regex
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  'use strict';
    module.exports = function () {
    	return /(?:(?:\u001b\[)|\u009b)(?:(?:[0-9]{1,3})?(?:(?:;[0-9]{0,3})*)?[A-M|f-m])|\u001b[A-M]/g;
    };
    
  provide("ansi-regex", module.exports);
}(global));

// pakmanager:camelcase-keys
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  'use strict';
    var mapObj = require('map-obj');
    var camelCase = require('camelcase');
    
    module.exports = function (obj) {
    	return mapObj(obj, function (key, val) {
    		return [camelCase(key), val];
    	});
    };
    
  provide("camelcase-keys", module.exports);
}(global));

// pakmanager:indent-string
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  'use strict';
    var repeating = require('repeating');
    
    module.exports = function (str, indent, count) {
    	if (typeof str !== 'string' || typeof indent !== 'string') {
    		throw new TypeError('`string` and `indent` should be strings');
    	}
    
    	if (count != null && typeof count !== 'number') {
    		throw new TypeError('`count` should be a number');
    	}
    
    	indent = count > 1 ? repeating(indent, count) : indent;
    
    	return str.replace(/^(?!\s*$)/mg, indent);
    };
    
  provide("indent-string", module.exports);
}(global));

// pakmanager:object-assign
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  'use strict';
    var propIsEnumerable = Object.prototype.propertyIsEnumerable;
    
    function ToObject(val) {
    	if (val == null) {
    		throw new TypeError('Object.assign cannot be called with null or undefined');
    	}
    
    	return Object(val);
    }
    
    function ownEnumerableKeys(obj) {
    	var keys = Object.getOwnPropertyNames(obj);
    
    	if (Object.getOwnPropertySymbols) {
    		keys = keys.concat(Object.getOwnPropertySymbols(obj));
    	}
    
    	return keys.filter(function (key) {
    		return propIsEnumerable.call(obj, key);
    	});
    }
    
    module.exports = Object.assign || function (target, source) {
    	var from;
    	var keys;
    	var to = ToObject(target);
    
    	for (var s = 1; s < arguments.length; s++) {
    		from = arguments[s];
    		keys = ownEnumerableKeys(Object(from));
    
    		for (var i = 0; i < keys.length; i++) {
    			to[keys[i]] = from[keys[i]];
    		}
    	}
    
    	return to;
    };
    
  provide("object-assign", module.exports);
}(global));

// pakmanager:lodash._getnative
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  /**
     * lodash 3.9.0 (Custom Build) <https://lodash.com/>
     * Build: `lodash modern modularize exports="npm" -o ./`
     * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
     * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
     * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
     * Available under MIT license <https://lodash.com/license>
     */
    
    /** `Object#toString` result references. */
    var funcTag = '[object Function]';
    
    /**
     * Used to match `RegExp` [special characters](http://www.regular-expressions.info/characters.html#special).
     * In addition to special characters the forward slash is escaped to allow for
     * easier `eval` use and `Function` compilation.
     */
    var reRegExpChars = /[.*+?^${}()|[\]\/\\]/g,
        reHasRegExpChars = RegExp(reRegExpChars.source);
    
    /** Used to detect host constructors (Safari > 5). */
    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    
    /**
     * Converts `value` to a string if it's not one. An empty string is returned
     * for `null` or `undefined` values.
     *
     * @private
     * @param {*} value The value to process.
     * @returns {string} Returns the string.
     */
    function baseToString(value) {
      if (typeof value == 'string') {
        return value;
      }
      return value == null ? '' : (value + '');
    }
    
    /**
     * Checks if `value` is object-like.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
     */
    function isObjectLike(value) {
      return !!value && typeof value == 'object';
    }
    
    /** Used for native method references. */
    var objectProto = Object.prototype;
    
    /** Used to resolve the decompiled source of functions. */
    var fnToString = Function.prototype.toString;
    
    /** Used to check objects for own properties. */
    var hasOwnProperty = objectProto.hasOwnProperty;
    
    /**
     * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
     * of values.
     */
    var objToString = objectProto.toString;
    
    /** Used to detect if a method is native. */
    var reIsNative = RegExp('^' +
      escapeRegExp(fnToString.call(hasOwnProperty))
      .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
    );
    
    /**
     * Gets the native function at `key` of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {string} key The key of the method to get.
     * @returns {*} Returns the function if it's native, else `undefined`.
     */
    function getNative(object, key) {
      var value = object == null ? undefined : object[key];
      return isNative(value) ? value : undefined;
    }
    
    /**
     * Checks if `value` is a native function.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
     * @example
     *
     * _.isNative(Array.prototype.push);
     * // => true
     *
     * _.isNative(_);
     * // => false
     */
    function isNative(value) {
      if (value == null) {
        return false;
      }
      if (objToString.call(value) == funcTag) {
        return reIsNative.test(fnToString.call(value));
      }
      return isObjectLike(value) && reIsHostCtor.test(value);
    }
    
    /**
     * Escapes the `RegExp` special characters "\", "/", "^", "$", ".", "|", "?",
     * "*", "+", "(", ")", "[", "]", "{" and "}" in `string`.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to escape.
     * @returns {string} Returns the escaped string.
     * @example
     *
     * _.escapeRegExp('[lodash](https://lodash.com/)');
     * // => '\[lodash\]\(https:\/\/lodash\.com\/\)'
     */
    function escapeRegExp(string) {
      string = baseToString(string);
      return (string && reHasRegExpChars.test(string))
        ? string.replace(reRegExpChars, '\\$&')
        : string;
    }
    
    module.exports = getNative;
    
  provide("lodash._getnative", module.exports);
}(global));

// pakmanager:lodash.isarguments
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  /**
     * lodash 3.0.3 (Custom Build) <https://lodash.com/>
     * Build: `lodash modern modularize exports="npm" -o ./`
     * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
     * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
     * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
     * Available under MIT license <https://lodash.com/license>
     */
    
    /** `Object#toString` result references. */
    var argsTag = '[object Arguments]';
    
    /**
     * Checks if `value` is object-like.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
     */
    function isObjectLike(value) {
      return !!value && typeof value == 'object';
    }
    
    /** Used for native method references. */
    var objectProto = Object.prototype;
    
    /**
     * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
     * of values.
     */
    var objToString = objectProto.toString;
    
    /**
     * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
     * of an array-like value.
     */
    var MAX_SAFE_INTEGER = 9007199254740991;
    
    /**
     * The base implementation of `_.property` without support for deep paths.
     *
     * @private
     * @param {string} key The key of the property to get.
     * @returns {Function} Returns the new function.
     */
    function baseProperty(key) {
      return function(object) {
        return object == null ? undefined : object[key];
      };
    }
    
    /**
     * Gets the "length" property value of `object`.
     *
     * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
     * that affects Safari on at least iOS 8.1-8.3 ARM64.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {*} Returns the "length" value.
     */
    var getLength = baseProperty('length');
    
    /**
     * Checks if `value` is array-like.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
     */
    function isArrayLike(value) {
      return value != null && isLength(getLength(value));
    }
    
    /**
     * Checks if `value` is a valid array-like length.
     *
     * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
     */
    function isLength(value) {
      return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    
    /**
     * Checks if `value` is classified as an `arguments` object.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
     * @example
     *
     * _.isArguments(function() { return arguments; }());
     * // => true
     *
     * _.isArguments([1, 2, 3]);
     * // => false
     */
    function isArguments(value) {
      return isObjectLike(value) && isArrayLike(value) && objToString.call(value) == argsTag;
    }
    
    module.exports = isArguments;
    
  provide("lodash.isarguments", module.exports);
}(global));

// pakmanager:lodash.isarray
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  /**
     * lodash 3.0.3 (Custom Build) <https://lodash.com/>
     * Build: `lodash modern modularize exports="npm" -o ./`
     * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
     * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
     * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
     * Available under MIT license <https://lodash.com/license>
     */
    
    /** `Object#toString` result references. */
    var arrayTag = '[object Array]',
        funcTag = '[object Function]';
    
    /**
     * Used to match `RegExp` [special characters](http://www.regular-expressions.info/characters.html#special).
     * In addition to special characters the forward slash is escaped to allow for
     * easier `eval` use and `Function` compilation.
     */
    var reRegExpChars = /[.*+?^${}()|[\]\/\\]/g,
        reHasRegExpChars = RegExp(reRegExpChars.source);
    
    /** Used to detect host constructors (Safari > 5). */
    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    
    /**
     * Converts `value` to a string if it's not one. An empty string is returned
     * for `null` or `undefined` values.
     *
     * @private
     * @param {*} value The value to process.
     * @returns {string} Returns the string.
     */
    function baseToString(value) {
      if (typeof value == 'string') {
        return value;
      }
      return value == null ? '' : (value + '');
    }
    
    /**
     * Checks if `value` is object-like.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
     */
    function isObjectLike(value) {
      return !!value && typeof value == 'object';
    }
    
    /** Used for native method references. */
    var objectProto = Object.prototype;
    
    /** Used to resolve the decompiled source of functions. */
    var fnToString = Function.prototype.toString;
    
    /** Used to check objects for own properties. */
    var hasOwnProperty = objectProto.hasOwnProperty;
    
    /**
     * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
     * of values.
     */
    var objToString = objectProto.toString;
    
    /** Used to detect if a method is native. */
    var reIsNative = RegExp('^' +
      escapeRegExp(fnToString.call(hasOwnProperty))
      .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
    );
    
    /* Native method references for those with the same name as other `lodash` methods. */
    var nativeIsArray = getNative(Array, 'isArray');
    
    /**
     * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
     * of an array-like value.
     */
    var MAX_SAFE_INTEGER = 9007199254740991;
    
    /**
     * Gets the native function at `key` of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {string} key The key of the method to get.
     * @returns {*} Returns the function if it's native, else `undefined`.
     */
    function getNative(object, key) {
      var value = object == null ? undefined : object[key];
      return isNative(value) ? value : undefined;
    }
    
    /**
     * Checks if `value` is a valid array-like length.
     *
     * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
     */
    function isLength(value) {
      return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    
    /**
     * Checks if `value` is classified as an `Array` object.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
     * @example
     *
     * _.isArray([1, 2, 3]);
     * // => true
     *
     * _.isArray(function() { return arguments; }());
     * // => false
     */
    var isArray = nativeIsArray || function(value) {
      return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
    };
    
    /**
     * Checks if `value` is a native function.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
     * @example
     *
     * _.isNative(Array.prototype.push);
     * // => true
     *
     * _.isNative(_);
     * // => false
     */
    function isNative(value) {
      if (value == null) {
        return false;
      }
      if (objToString.call(value) == funcTag) {
        return reIsNative.test(fnToString.call(value));
      }
      return isObjectLike(value) && reIsHostCtor.test(value);
    }
    
    /**
     * Escapes the `RegExp` special characters "\", "/", "^", "$", ".", "|", "?",
     * "*", "+", "(", ")", "[", "]", "{" and "}" in `string`.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to escape.
     * @returns {string} Returns the escaped string.
     * @example
     *
     * _.escapeRegExp('[lodash](https://lodash.com/)');
     * // => '\[lodash\]\(https:\/\/lodash\.com\/\)'
     */
    function escapeRegExp(string) {
      string = baseToString(string);
      return (string && reHasRegExpChars.test(string))
        ? string.replace(reRegExpChars, '\\$&')
        : string;
    }
    
    module.exports = isArray;
    
  provide("lodash.isarray", module.exports);
}(global));

// pakmanager:lodash._reinterpolate
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  /**
     * lodash 3.0.0 (Custom Build) <https://lodash.com/>
     * Build: `lodash modern modularize exports="npm" -o ./`
     * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
     * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
     * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
     * Available under MIT license <https://lodash.com/license>
     */
    
    /** Used to match template delimiters. */
    var reInterpolate = /<%=([\s\S]+?)%>/g;
    
    module.exports = reInterpolate;
    
  provide("lodash._reinterpolate", module.exports);
}(global));

// pakmanager:lodash.escape
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  /**
     * lodash 3.0.0 (Custom Build) <https://lodash.com/>
     * Build: `lodash modern modularize exports="npm" -o ./`
     * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
     * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
     * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
     * Available under MIT license <https://lodash.com/license>
     */
    var baseToString = require('lodash._basetostring');
    
    /** Used to match HTML entities and HTML characters. */
    var reUnescapedHtml = /[&<>"'`]/g,
        reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
    
    /** Used to map characters to HTML entities. */
    var htmlEscapes = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
      '`': '&#96;'
    };
    
    /**
     * Used by `_.escape` to convert characters to HTML entities.
     *
     * @private
     * @param {string} chr The matched character to escape.
     * @returns {string} Returns the escaped character.
     */
    function escapeHtmlChar(chr) {
      return htmlEscapes[chr];
    }
    
    /**
     * Converts the characters "&", "<", ">", '"', "'", and '`', in `string` to
     * their corresponding HTML entities.
     *
     * **Note:** No other characters are escaped. To escape additional characters
     * use a third-party library like [_he_](https://mths.be/he).
     *
     * Though the ">" character is escaped for symmetry, characters like
     * ">" and "/" don't require escaping in HTML and have no special meaning
     * unless they're part of a tag or unquoted attribute value.
     * See [Mathias Bynens's article](https://mathiasbynens.be/notes/ambiguous-ampersands)
     * (under "semi-related fun fact") for more details.
     *
     * Backticks are escaped because in Internet Explorer < 9, they can break out
     * of attribute values or HTML comments. See [#102](https://html5sec.org/#102),
     * [#108](https://html5sec.org/#108), and [#133](https://html5sec.org/#133) of
     * the [HTML5 Security Cheatsheet](https://html5sec.org/) for more details.
     *
     * When working with HTML you should always quote attribute values to reduce
     * XSS vectors. See [Ryan Grove's article](http://wonko.com/post/html-escaping)
     * for more details.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to escape.
     * @returns {string} Returns the escaped string.
     * @example
     *
     * _.escape('fred, barney, & pebbles');
     * // => 'fred, barney, &amp; pebbles'
     */
    function escape(string) {
      // Reset `lastIndex` because in IE < 9 `String#replace` does not.
      string = baseToString(string);
      return (string && reHasUnescapedHtml.test(string))
        ? string.replace(reUnescapedHtml, escapeHtmlChar)
        : string;
    }
    
    module.exports = escape;
    
  provide("lodash.escape", module.exports);
}(global));

// pakmanager:isstream
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  var stream = require('stream')
    
    
    function isStream (obj) {
      return obj instanceof stream.Stream
    }
    
    
    function isReadable (obj) {
      return isStream(obj) && typeof obj._read == 'function' && typeof obj._readableState == 'object'
    }
    
    
    function isWritable (obj) {
      return isStream(obj) && typeof obj._write == 'function' && typeof obj._writableState == 'object'
    }
    
    
    function isDuplex (obj) {
      return isReadable(obj) && isWritable(obj)
    }
    
    
    module.exports            = isStream
    module.exports.isReadable = isReadable
    module.exports.isWritable = isWritable
    module.exports.isDuplex   = isDuplex
    
  provide("isstream", module.exports);
}(global));

// pakmanager:find-index/findIndex
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  function findIndex(array, predicate, self) {
      var len = array.length;
      var i;
      if (len === 0) return -1;
      if (typeof predicate !== 'function') {
        throw new TypeError(predicate + ' must be a function');
      }
    
      if (self) {
        for (i = 0; i < len; i++) {
          if (predicate.call(self, array[i], i, array)) {
            return i;
          }
        }
      } else {
        for (i = 0; i < len; i++) {
          if (predicate(array[i], i, array)) {
            return i;
          }
        }
      }
    
      return -1;
    }
    
    module.exports = findIndex;
    
  provide("find-index/findIndex", module.exports);
}(global));

// pakmanager:find-index
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  module.exports =  require('find-index/findIndex');
    
  provide("find-index", module.exports);
}(global));

// pakmanager:through2-filter
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  "use strict";
    
    module.exports = make
    module.exports.ctor = ctor
    module.exports.objCtor = objCtor
    module.exports.obj = obj
    
    var through2 = require("through2")
    var xtend = require("xtend")
    
    function ctor(options, fn) {
      if (typeof options == "function") {
        fn = options
        options = {}
      }
    
      var Filter = through2.ctor(options, function (chunk, encoding, callback) {
        if (this.options.wantStrings) chunk = chunk.toString()
        if (fn.call(this, chunk, this._index++)) this.push(chunk)
        return callback()
      })
      Filter.prototype._index = 0
      return Filter
    }
    
    function objCtor(options, fn) {
      if (typeof options === "function") {
        fn = options
        options = {}
      }
      options = xtend({objectMode: true, highWaterMark: 16}, options)
      return ctor(options, fn)
    }
    
    function make(options, fn) {
      return ctor(options, fn)()
    }
    
    function obj(options, fn) {
      if (typeof options === "function") {
        fn = options
        options = {}
      }
      options = xtend({objectMode: true, highWaterMark: 16}, options)
      return make(options, fn)
    }
    
  provide("through2-filter", module.exports);
}(global));

// pakmanager:globule
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  /*
     * globule
     * https://github.com/cowboy/node-globule
     *
     * Copyright (c) 2014 "Cowboy" Ben Alman
     * Licensed under the MIT license.
     */
    
    'use strict';
    
    var fs = require('fs');
    var path = require('path');
    
    var _ = require('lodash');
    var glob = require('glob');
    var minimatch = require('minimatch');
    
    // The module.
    var globule = exports;
    
    // Process specified wildcard glob patterns or filenames against a
    // callback, excluding and uniquing files in the result set.
    function processPatterns(patterns, options, fn) {
      var result = [];
      _.each(patterns, function(pattern) {
        // The first character is not ! (inclusion). Add all matching filepaths
        // to the result set.
        if (pattern.indexOf('!') !== 0) {
          result = _.union(result, fn(pattern));
          return;
        }
        // The first character is ! (exclusion). Remove any filepaths from the
        // result set that match this pattern, sans leading !.
        var filterFn = minimatch.filter(pattern.slice(1), options);
        result = _.filter(result, function(filepath) {
          return !filterFn(filepath);
        });
      });
      return result;
    }
    
    // Match a filepath or filepaths against one or more wildcard patterns. Returns
    // all matching filepaths. This behaves just like minimatch.match, but supports
    // any number of patterns.
    globule.match = function(patterns, filepaths, options) {
      // Return empty set if either patterns or filepaths was omitted.
      if (patterns == null || filepaths == null) { return []; }
      // Normalize patterns and filepaths to flattened arrays.
      patterns = _.isArray(patterns) ? _.flatten(patterns) : [patterns];
      filepaths = _.isArray(filepaths) ? _.flatten(filepaths) : [filepaths];
      // Return empty set if there are no patterns or filepaths.
      if (patterns.length === 0 || filepaths.length === 0) { return []; }
      // Return all matching filepaths.
      return processPatterns(patterns, options, function(pattern) {
        return minimatch.match(filepaths, pattern, options || {});
      });
    };
    
    // Match a filepath or filepaths against one or more wildcard patterns. Returns
    // true if any of the patterns match.
    globule.isMatch = function() {
      return globule.match.apply(null, arguments).length > 0;
    };
    
    // Return an array of all file paths that match the given wildcard patterns.
    globule.find = function() {
      var args = _.toArray(arguments);
      // If the last argument is an options object, remove it from args.
      var options = _.isPlainObject(args[args.length - 1]) ? args.pop() : {};
      // If options.src was specified, use it. Otherwise, use all non-options
      // arguments. Flatten nested arrays.
      var patterns;
      if (options.src) {
        patterns = _.isArray(options.src) ? _.flatten(options.src) : [options.src];
      } else {
        patterns = _.flatten(args);
      }
      // Return empty set if there are no patterns.
      if (patterns.length === 0) { return []; }
      var srcBase = options.srcBase || options.cwd;
      // Create glob-specific options object.
      var globOptions = _.extend({}, options);
      if (srcBase) {
        globOptions.cwd = srcBase;
      }
      // Get all matching filepaths.
      var matches = processPatterns(patterns, options, function(pattern) {
        return glob.sync(pattern, globOptions);
      });
      // If srcBase and prefixBase were specified, prefix srcBase to matched paths.
      if (srcBase && options.prefixBase) {
        matches = matches.map(function(filepath) {
          return path.join(srcBase, filepath);
        });
      }
      // Filter result set?
      if (options.filter) {
        matches = matches.filter(function(filepath) {
          // If srcBase was specified but prefixBase was NOT, prefix srcBase
          // temporarily, for filtering.
          if (srcBase && !options.prefixBase) {
            filepath = path.join(srcBase, filepath);
          }
          try {
            if (_.isFunction(options.filter)) {
              return options.filter(filepath, options);
            } else {
              // If the file is of the right type and exists, this should work.
              return fs.statSync(filepath)[options.filter]();
            }
          } catch(err) {
            // Otherwise, it's probably not the right type.
            return false;
          }
        });
      }
      return matches;
    };
    
    var pathSeparatorRe = /[\/\\]/g;
    var extDotRe = {
      first: /(\.[^\/]*)?$/,
      last: /(\.[^\/\.]*)?$/,
    };
    function rename(dest, options) {
      // Flatten path?
      if (options.flatten) {
        dest = path.basename(dest);
      }
      // Change the extension?
      if (options.ext) {
        dest = dest.replace(extDotRe[options.extDot], options.ext);
      }
      // Join dest and destBase?
      if (options.destBase) {
        dest = path.join(options.destBase, dest);
      }
      return dest;
    }
    
    // Build a mapping of src-dest filepaths from the given set of filepaths.
    globule.mapping = function(filepaths, options) {
      // Return empty set if filepaths was omitted.
      if (filepaths == null) { return []; }
      options = _.defaults({}, options, {
        extDot: 'first',
        rename: rename,
      });
      var files = [];
      var fileByDest = {};
      // Find all files matching pattern, using passed-in options.
      filepaths.forEach(function(src) {
        // Generate destination filename.
        var dest = options.rename(src, options);
        // Prepend srcBase to all src paths.
        if (options.srcBase) {
          src = path.join(options.srcBase, src);
        }
        // Normalize filepaths to be unix-style.
        dest = dest.replace(pathSeparatorRe, '/');
        src = src.replace(pathSeparatorRe, '/');
        // Map correct src path to dest path.
        if (fileByDest[dest]) {
          // If dest already exists, push this src onto that dest's src array.
          fileByDest[dest].src.push(src);
        } else {
          // Otherwise create a new src-dest file mapping object.
          files.push({
            src: [src],
            dest: dest,
          });
          // And store a reference for later use.
          fileByDest[dest] = files[files.length - 1];
        }
      });
      return files;
    };
    
    // Return a mapping of src-dest filepaths from files matching the given
    // wildcard patterns.
    globule.findMapping = function() {
      var args = _.toArray(arguments);
      // If the last argument is an options object, remove it from args.
      var options = _.isPlainObject(args[args.length - 1]) ? args.pop() : {};
      // Generate mapping from found filepaths.
      return globule.mapping(globule.find(args, options), options);
    };
    
  provide("globule", module.exports);
}(global));

// pakmanager:has-color
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  'use strict';
    module.exports = (function () {
    	if (process.argv.indexOf('--no-color') !== -1) {
    		return false;
    	}
    
    	if (process.argv.indexOf('--color') !== -1) {
    		return true;
    	}
    
    	if (process.stdout && !process.stdout.isTTY) {
    		return false;
    	}
    
    	if (process.platform === 'win32') {
    		return true;
    	}
    
    	if ('COLORTERM' in process.env) {
    		return true;
    	}
    
    	if (process.env.TERM === 'dumb') {
    		return false;
    	}
    
    	if (/^screen|^xterm|^vt100|color|ansi|cygwin|linux/i.test(process.env.TERM)) {
    		return true;
    	}
    
    	return false;
    })();
    
  provide("has-color", module.exports);
}(global));

// pakmanager:ansi-styles
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  'use strict';
    
    var styles = module.exports = {
    	modifiers: {
    		reset: [0, 0],
    		bold: [1, 22], // 21 isn't widely supported and 22 does the same thing
    		dim: [2, 22],
    		italic: [3, 23],
    		underline: [4, 24],
    		inverse: [7, 27],
    		hidden: [8, 28],
    		strikethrough: [9, 29]
    	},
    	colors: {
    		black: [30, 39],
    		red: [31, 39],
    		green: [32, 39],
    		yellow: [33, 39],
    		blue: [34, 39],
    		magenta: [35, 39],
    		cyan: [36, 39],
    		white: [37, 39],
    		gray: [90, 39]
    	},
    	bgColors: {
    		bgBlack: [40, 49],
    		bgRed: [41, 49],
    		bgGreen: [42, 49],
    		bgYellow: [43, 49],
    		bgBlue: [44, 49],
    		bgMagenta: [45, 49],
    		bgCyan: [46, 49],
    		bgWhite: [47, 49]
    	}
    };
    
    // fix humans
    styles.colors.grey = styles.colors.gray;
    
    Object.keys(styles).forEach(function (groupName) {
    	var group = styles[groupName];
    
    	Object.keys(group).forEach(function (styleName) {
    		var style = group[styleName];
    
    		styles[styleName] = group[styleName] = {
    			open: '\u001b[' + style[0] + 'm',
    			close: '\u001b[' + style[1] + 'm'
    		};
    	});
    
    	Object.defineProperty(styles, groupName, {
    		value: group,
    		enumerable: false
    	});
    });
    
  provide("ansi-styles", module.exports);
}(global));

// pakmanager:strip-ansi
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  'use strict';
    var ansiRegex = require('ansi-regex')();
    
    module.exports = function (str) {
    	return typeof str === 'string' ? str.replace(ansiRegex, '') : str;
    };
    
  provide("strip-ansi", module.exports);
}(global));

// pakmanager:meow
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  'use strict';
    var path = require('path');
    var minimist = require('minimist');
    var indentString = require('indent-string');
    var objectAssign = require('object-assign');
    var camelcaseKeys = require('camelcase-keys');
    
    // needed to get the uncached parent
    delete require.cache[__filename];
    var parentDir = path.dirname(module.parent.filename);
    
    module.exports = function (opts, minimistOpts) {
    	opts = objectAssign({
    		pkg: './package.json',
    		argv: process.argv.slice(2)
    	}, opts);
    
    	if (Array.isArray(opts.help)) {
    		opts.help = opts.help.join('\n');
    	}
    
    	var pkg = typeof opts.pkg === 'string' ? require(path.join(parentDir, opts.pkg)) : opts.pkg;
    	var argv = minimist(opts.argv, minimistOpts);
    	var help = '\n' + indentString(pkg.description + (opts.help ? '\n\n' + opts.help : '\n'), '  ');
    	var showHelp = function () {
    		console.log(help);
    		process.exit();
    	};
    
    	if (argv.version && opts.version !== false) {
    		console.log(typeof opts.version === 'string' ? opts.version : pkg.version);
    		process.exit();
    	}
    
    	if (argv.help && opts.help !== false) {
    		showHelp();
    	}
    
    	var _ = argv._;
    	delete argv._;
    
    	return {
    		input: _,
    		flags: camelcaseKeys(argv),
    		pkg: pkg,
    		help: help,
    		showHelp: showHelp
    	};
    };
    
  provide("meow", module.exports);
}(global));

// pakmanager:lodash._basecopy
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  /**
     * lodash 3.0.1 (Custom Build) <https://lodash.com/>
     * Build: `lodash modern modularize exports="npm" -o ./`
     * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
     * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
     * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
     * Available under MIT license <https://lodash.com/license>
     */
    
    /**
     * Copies properties of `source` to `object`.
     *
     * @private
     * @param {Object} source The object to copy properties from.
     * @param {Array} props The property names to copy.
     * @param {Object} [object={}] The object to copy properties to.
     * @returns {Object} Returns `object`.
     */
    function baseCopy(source, props, object) {
      object || (object = {});
    
      var index = -1,
          length = props.length;
    
      while (++index < length) {
        var key = props[index];
        object[key] = source[key];
      }
      return object;
    }
    
    module.exports = baseCopy;
    
  provide("lodash._basecopy", module.exports);
}(global));

// pakmanager:lodash._basevalues
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  /**
     * lodash 3.0.0 (Custom Build) <https://lodash.com/>
     * Build: `lodash modern modularize exports="npm" -o ./`
     * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
     * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
     * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
     * Available under MIT license <https://lodash.com/license>
     */
    
    /**
     * The base implementation of `_.values` and `_.valuesIn` which creates an
     * array of `object` property values corresponding to the property names
     * returned by `keysFunc`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array} props The property names to get values for.
     * @returns {Object} Returns the array of property values.
     */
    function baseValues(object, props) {
      var index = -1,
          length = props.length,
          result = Array(length);
    
      while (++index < length) {
        result[index] = object[props[index]];
      }
      return result;
    }
    
    module.exports = baseValues;
    
  provide("lodash._basevalues", module.exports);
}(global));

// pakmanager:lodash._isiterateecall
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  /**
     * lodash 3.0.9 (Custom Build) <https://lodash.com/>
     * Build: `lodash modern modularize exports="npm" -o ./`
     * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
     * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
     * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
     * Available under MIT license <https://lodash.com/license>
     */
    
    /** Used to detect unsigned integer values. */
    var reIsUint = /^\d+$/;
    
    /**
     * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
     * of an array-like value.
     */
    var MAX_SAFE_INTEGER = 9007199254740991;
    
    /**
     * The base implementation of `_.property` without support for deep paths.
     *
     * @private
     * @param {string} key The key of the property to get.
     * @returns {Function} Returns the new function.
     */
    function baseProperty(key) {
      return function(object) {
        return object == null ? undefined : object[key];
      };
    }
    
    /**
     * Gets the "length" property value of `object`.
     *
     * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
     * that affects Safari on at least iOS 8.1-8.3 ARM64.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {*} Returns the "length" value.
     */
    var getLength = baseProperty('length');
    
    /**
     * Checks if `value` is array-like.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
     */
    function isArrayLike(value) {
      return value != null && isLength(getLength(value));
    }
    
    /**
     * Checks if `value` is a valid array-like index.
     *
     * @private
     * @param {*} value The value to check.
     * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
     * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
     */
    function isIndex(value, length) {
      value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
      length = length == null ? MAX_SAFE_INTEGER : length;
      return value > -1 && value % 1 == 0 && value < length;
    }
    
    /**
     * Checks if the provided arguments are from an iteratee call.
     *
     * @private
     * @param {*} value The potential iteratee value argument.
     * @param {*} index The potential iteratee index or key argument.
     * @param {*} object The potential iteratee object argument.
     * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
     */
    function isIterateeCall(value, index, object) {
      if (!isObject(object)) {
        return false;
      }
      var type = typeof index;
      if (type == 'number'
          ? (isArrayLike(object) && isIndex(index, object.length))
          : (type == 'string' && index in object)) {
        var other = object[index];
        return value === value ? (value === other) : (other !== other);
      }
      return false;
    }
    
    /**
     * Checks if `value` is a valid array-like length.
     *
     * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
     */
    function isLength(value) {
      return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    
    /**
     * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
     * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an object, else `false`.
     * @example
     *
     * _.isObject({});
     * // => true
     *
     * _.isObject([1, 2, 3]);
     * // => true
     *
     * _.isObject(1);
     * // => false
     */
    function isObject(value) {
      // Avoid a V8 JIT bug in Chrome 19-20.
      // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
      var type = typeof value;
      return !!value && (type == 'object' || type == 'function');
    }
    
    module.exports = isIterateeCall;
    
  provide("lodash._isiterateecall", module.exports);
}(global));

// pakmanager:lodash.keys
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  /**
     * lodash 3.1.1 (Custom Build) <https://lodash.com/>
     * Build: `lodash modern modularize exports="npm" -o ./`
     * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
     * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
     * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
     * Available under MIT license <https://lodash.com/license>
     */
    var getNative = require('lodash._getnative'),
        isArguments = require('lodash.isarguments'),
        isArray = require('lodash.isarray');
    
    /** Used to detect unsigned integer values. */
    var reIsUint = /^\d+$/;
    
    /** Used for native method references. */
    var objectProto = Object.prototype;
    
    /** Used to check objects for own properties. */
    var hasOwnProperty = objectProto.hasOwnProperty;
    
    /* Native method references for those with the same name as other `lodash` methods. */
    var nativeKeys = getNative(Object, 'keys');
    
    /**
     * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
     * of an array-like value.
     */
    var MAX_SAFE_INTEGER = 9007199254740991;
    
    /**
     * The base implementation of `_.property` without support for deep paths.
     *
     * @private
     * @param {string} key The key of the property to get.
     * @returns {Function} Returns the new function.
     */
    function baseProperty(key) {
      return function(object) {
        return object == null ? undefined : object[key];
      };
    }
    
    /**
     * Gets the "length" property value of `object`.
     *
     * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
     * that affects Safari on at least iOS 8.1-8.3 ARM64.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {*} Returns the "length" value.
     */
    var getLength = baseProperty('length');
    
    /**
     * Checks if `value` is array-like.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
     */
    function isArrayLike(value) {
      return value != null && isLength(getLength(value));
    }
    
    /**
     * Checks if `value` is a valid array-like index.
     *
     * @private
     * @param {*} value The value to check.
     * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
     * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
     */
    function isIndex(value, length) {
      value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
      length = length == null ? MAX_SAFE_INTEGER : length;
      return value > -1 && value % 1 == 0 && value < length;
    }
    
    /**
     * Checks if `value` is a valid array-like length.
     *
     * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
     */
    function isLength(value) {
      return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    
    /**
     * A fallback implementation of `Object.keys` which creates an array of the
     * own enumerable property names of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */
    function shimKeys(object) {
      var props = keysIn(object),
          propsLength = props.length,
          length = propsLength && object.length;
    
      var allowIndexes = !!length && isLength(length) &&
        (isArray(object) || isArguments(object));
    
      var index = -1,
          result = [];
    
      while (++index < propsLength) {
        var key = props[index];
        if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
          result.push(key);
        }
      }
      return result;
    }
    
    /**
     * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
     * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an object, else `false`.
     * @example
     *
     * _.isObject({});
     * // => true
     *
     * _.isObject([1, 2, 3]);
     * // => true
     *
     * _.isObject(1);
     * // => false
     */
    function isObject(value) {
      // Avoid a V8 JIT bug in Chrome 19-20.
      // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
      var type = typeof value;
      return !!value && (type == 'object' || type == 'function');
    }
    
    /**
     * Creates an array of the own enumerable property names of `object`.
     *
     * **Note:** Non-object values are coerced to objects. See the
     * [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.keys)
     * for more details.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.keys(new Foo);
     * // => ['a', 'b'] (iteration order is not guaranteed)
     *
     * _.keys('hi');
     * // => ['0', '1']
     */
    var keys = !nativeKeys ? shimKeys : function(object) {
      var Ctor = object == null ? null : object.constructor;
      if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
          (typeof object != 'function' && isArrayLike(object))) {
        return shimKeys(object);
      }
      return isObject(object) ? nativeKeys(object) : [];
    };
    
    /**
     * Creates an array of the own and inherited enumerable property names of `object`.
     *
     * **Note:** Non-object values are coerced to objects.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.keysIn(new Foo);
     * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
     */
    function keysIn(object) {
      if (object == null) {
        return [];
      }
      if (!isObject(object)) {
        object = Object(object);
      }
      var length = object.length;
      length = (length && isLength(length) &&
        (isArray(object) || isArguments(object)) && length) || 0;
    
      var Ctor = object.constructor,
          index = -1,
          isProto = typeof Ctor == 'function' && Ctor.prototype === object,
          result = Array(length),
          skipIndexes = length > 0;
    
      while (++index < length) {
        result[index] = (index + '');
      }
      for (var key in object) {
        if (!(skipIndexes && isIndex(key, length)) &&
            !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
          result.push(key);
        }
      }
      return result;
    }
    
    module.exports = keys;
    
  provide("lodash.keys", module.exports);
}(global));

// pakmanager:lodash.restparam
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  /**
     * lodash 3.6.1 (Custom Build) <https://lodash.com/>
     * Build: `lodash modern modularize exports="npm" -o ./`
     * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
     * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
     * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
     * Available under MIT license <https://lodash.com/license>
     */
    
    /** Used as the `TypeError` message for "Functions" methods. */
    var FUNC_ERROR_TEXT = 'Expected a function';
    
    /* Native method references for those with the same name as other `lodash` methods. */
    var nativeMax = Math.max;
    
    /**
     * Creates a function that invokes `func` with the `this` binding of the
     * created function and arguments from `start` and beyond provided as an array.
     *
     * **Note:** This method is based on the [rest parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters).
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to apply a rest parameter to.
     * @param {number} [start=func.length-1] The start position of the rest parameter.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var say = _.restParam(function(what, names) {
     *   return what + ' ' + _.initial(names).join(', ') +
     *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
     * });
     *
     * say('hello', 'fred', 'barney', 'pebbles');
     * // => 'hello fred, barney, & pebbles'
     */
    function restParam(func, start) {
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      start = nativeMax(start === undefined ? (func.length - 1) : (+start || 0), 0);
      return function() {
        var args = arguments,
            index = -1,
            length = nativeMax(args.length - start, 0),
            rest = Array(length);
    
        while (++index < length) {
          rest[index] = args[start + index];
        }
        switch (start) {
          case 0: return func.call(this, rest);
          case 1: return func.call(this, args[0], rest);
          case 2: return func.call(this, args[0], args[1], rest);
        }
        var otherArgs = Array(start + 1);
        index = -1;
        while (++index < start) {
          otherArgs[index] = args[index];
        }
        otherArgs[start] = rest;
        return func.apply(this, otherArgs);
      };
    }
    
    module.exports = restParam;
    
  provide("lodash.restparam", module.exports);
}(global));

// pakmanager:lodash.templatesettings
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  /**
     * lodash 3.1.0 (Custom Build) <https://lodash.com/>
     * Build: `lodash modern modularize exports="npm" -o ./`
     * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
     * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
     * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
     * Available under MIT license <https://lodash.com/license>
     */
    var reInterpolate = require('lodash._reinterpolate'),
        escape = require('lodash.escape');
    
    /** Used to match template delimiters. */
    var reEscape = /<%-([\s\S]+?)%>/g,
        reEvaluate = /<%([\s\S]+?)%>/g;
    
    /**
     * By default, the template delimiters used by lodash are like those in
     * embedded Ruby (ERB). Change the following template settings to use
     * alternative delimiters.
     *
     * @static
     * @memberOf _
     * @type Object
     */
    var templateSettings = {
    
      /**
       * Used to detect `data` property values to be HTML-escaped.
       *
       * @memberOf _.templateSettings
       * @type RegExp
       */
      'escape': reEscape,
    
      /**
       * Used to detect code to be evaluated.
       *
       * @memberOf _.templateSettings
       * @type RegExp
       */
      'evaluate': reEvaluate,
    
      /**
       * Used to detect `data` property values to inject.
       *
       * @memberOf _.templateSettings
       * @type RegExp
       */
      'interpolate': reInterpolate,
    
      /**
       * Used to reference the data object in the template text.
       *
       * @memberOf _.templateSettings
       * @type string
       */
      'variable': '',
    
      /**
       * Used to import variables into the compiled template.
       *
       * @memberOf _.templateSettings
       * @type Object
       */
      'imports': {
    
        /**
         * A reference to the `lodash` function.
         *
         * @memberOf _.templateSettings.imports
         * @type Function
         */
        '_': { 'escape': escape }
      }
    };
    
    module.exports = templateSettings;
    
  provide("lodash.templatesettings", module.exports);
}(global));

// pakmanager:duplexer2
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  var stream = require("readable-stream");
    
    var duplex2 = module.exports = function duplex2(options, writable, readable) {
      return new DuplexWrapper(options, writable, readable);
    };
    
    var DuplexWrapper = exports.DuplexWrapper = function DuplexWrapper(options, writable, readable) {
      if (typeof readable === "undefined") {
        readable = writable;
        writable = options;
        options = null;
      }
    
      options = options || {};
      options.objectMode = true;
    
      stream.Duplex.call(this, options);
    
      this._bubbleErrors = (typeof options.bubbleErrors === "undefined") || !!options.bubbleErrors;
    
      this._writable = writable;
      this._readable = readable;
    
      var self = this;
    
      writable.once("finish", function() {
        self.end();
      });
    
      this.once("finish", function() {
        writable.end();
      });
    
      readable.on("data", function(e) {
        if (!self.push(e)) {
          readable.pause();
        }
      });
    
      readable.once("end", function() {
        return self.push(null);
      });
    
      if (this._bubbleErrors) {
        writable.on("error", function(err) {
          return self.emit("error", err);
        });
    
        readable.on("error", function(err) {
          return self.emit("error", err);
        });
      }
    };
    DuplexWrapper.prototype = Object.create(stream.Duplex.prototype, {constructor: {value: DuplexWrapper}});
    
    DuplexWrapper.prototype._write = function _write(input, encoding, done) {
      this._writable.write(input, encoding, done);
    };
    
    DuplexWrapper.prototype._read = function _read(n) {
      this._readable.resume();
    };
    
  provide("duplexer2", module.exports);
}(global));

// pakmanager:clone
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  var clone = (function() {
    'use strict';
    
    /**
     * Clones (copies) an Object using deep copying.
     *
     * This function supports circular references by default, but if you are certain
     * there are no circular references in your object, you can save some CPU time
     * by calling clone(obj, false).
     *
     * Caution: if `circular` is false and `parent` contains circular references,
     * your program may enter an infinite loop and crash.
     *
     * @param `parent` - the object to be cloned
     * @param `circular` - set to true if the object to be cloned may contain
     *    circular references. (optional - true by default)
     * @param `depth` - set to a number if the object is only to be cloned to
     *    a particular depth. (optional - defaults to Infinity)
     * @param `prototype` - sets the prototype to be used when cloning an object.
     *    (optional - defaults to parent prototype).
    */
    function clone(parent, circular, depth, prototype) {
      var filter;
      if (typeof circular === 'object') {
        depth = circular.depth;
        prototype = circular.prototype;
        filter = circular.filter;
        circular = circular.circular
      }
      // maintain two arrays for circular references, where corresponding parents
      // and children have the same index
      var allParents = [];
      var allChildren = [];
    
      var useBuffer = typeof Buffer != 'undefined';
    
      if (typeof circular == 'undefined')
        circular = true;
    
      if (typeof depth == 'undefined')
        depth = Infinity;
    
      // recurse this function so we don't reset allParents and allChildren
      function _clone(parent, depth) {
        // cloning null always returns null
        if (parent === null)
          return null;
    
        if (depth == 0)
          return parent;
    
        var child;
        var proto;
        if (typeof parent != 'object') {
          return parent;
        }
    
        if (clone.__isArray(parent)) {
          child = [];
        } else if (clone.__isRegExp(parent)) {
          child = new RegExp(parent.source, __getRegExpFlags(parent));
          if (parent.lastIndex) child.lastIndex = parent.lastIndex;
        } else if (clone.__isDate(parent)) {
          child = new Date(parent.getTime());
        } else if (useBuffer && Buffer.isBuffer(parent)) {
          child = new Buffer(parent.length);
          parent.copy(child);
          return child;
        } else {
          if (typeof prototype == 'undefined') {
            proto = Object.getPrototypeOf(parent);
            child = Object.create(proto);
          }
          else {
            child = Object.create(prototype);
            proto = prototype;
          }
        }
    
        if (circular) {
          var index = allParents.indexOf(parent);
    
          if (index != -1) {
            return allChildren[index];
          }
          allParents.push(parent);
          allChildren.push(child);
        }
    
        for (var i in parent) {
          var attrs;
          if (proto) {
            attrs = Object.getOwnPropertyDescriptor(proto, i);
          }
    
          if (attrs && attrs.set == null) {
            continue;
          }
          child[i] = _clone(parent[i], depth - 1);
        }
    
        return child;
      }
    
      return _clone(parent, depth);
    }
    
    /**
     * Simple flat clone using prototype, accepts only objects, usefull for property
     * override on FLAT configuration object (no nested props).
     *
     * USE WITH CAUTION! This may not behave as you wish if you do not know how this
     * works.
     */
    clone.clonePrototype = function clonePrototype(parent) {
      if (parent === null)
        return null;
    
      var c = function () {};
      c.prototype = parent;
      return new c();
    };
    
    // private utility functions
    
    function __objToStr(o) {
      return Object.prototype.toString.call(o);
    };
    clone.__objToStr = __objToStr;
    
    function __isDate(o) {
      return typeof o === 'object' && __objToStr(o) === '[object Date]';
    };
    clone.__isDate = __isDate;
    
    function __isArray(o) {
      return typeof o === 'object' && __objToStr(o) === '[object Array]';
    };
    clone.__isArray = __isArray;
    
    function __isRegExp(o) {
      return typeof o === 'object' && __objToStr(o) === '[object RegExp]';
    };
    clone.__isRegExp = __isRegExp;
    
    function __getRegExpFlags(re) {
      var flags = '';
      if (re.global) flags += 'g';
      if (re.ignoreCase) flags += 'i';
      if (re.multiline) flags += 'm';
      return flags;
    };
    clone.__getRegExpFlags = __getRegExpFlags;
    
    return clone;
    })();
    
    if (typeof module === 'object' && module.exports) {
      module.exports = clone;
    }
    
  provide("clone", module.exports);
}(global));

// pakmanager:clone-stats
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  var Stat = require('fs').Stats
    
    module.exports = cloneStats
    
    function cloneStats(stats) {
      var replacement = new Stat
    
      Object.keys(stats).forEach(function(key) {
        replacement[key] = stats[key]
      })
    
      return replacement
    }
    
  provide("clone-stats", module.exports);
}(global));

// pakmanager:replace-ext
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  var path = require('path');
    
    module.exports = function(npath, ext) {
      if (typeof npath !== 'string') return npath;
      if (npath.length === 0) return npath;
    
      var nFileName = path.basename(npath, path.extname(npath))+ext;
      return path.join(path.dirname(npath), nFileName);
    };
  provide("replace-ext", module.exports);
}(global));

// pakmanager:resolve/lib/core
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  module.exports = require('./core.json').reduce(function (acc, x) {
        acc[x] = true;
        return acc;
    }, {});
    
  provide("resolve/lib/core", module.exports);
}(global));

// pakmanager:resolve/lib/caller.js
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  module.exports = function () {
        // see https://code.google.com/p/v8/wiki/JavaScriptStackTraceApi
        var origPrepareStackTrace = Error.prepareStackTrace;
        Error.prepareStackTrace = function (_, stack) { return stack };
        var stack = (new Error()).stack;
        Error.prepareStackTrace = origPrepareStackTrace;
        return stack[2].getFileName();
    };
    
  provide("resolve/lib/caller.js", module.exports);
}(global));

// pakmanager:resolve/lib/node-modules-paths.js
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  var path = require('path');
    
    module.exports = function (start, opts) {
        var modules = opts.moduleDirectory
            ? [].concat(opts.moduleDirectory)
            : ['node_modules']
        ;
        var prefix = '/';
        if (/^([A-Za-z]:)/.test(start)) {
            prefix = '';
        } else if (/^\\\\/.test(start)) {
            prefix = '\\\\';
        }
        var splitRe = process.platform === 'win32' ? /[\/\\]/ : /\/+/;
    
        // ensure that `start` is an absolute path at this point,
        // resolving againt the process' current working directory
        start = path.resolve(start);
    
        var parts = start.split(splitRe);
    
        var dirs = [];
        for (var i = parts.length - 1; i >= 0; i--) {
            if (modules.indexOf(parts[i]) !== -1) continue;
            dirs = dirs.concat(modules.map(function(module_dir) {
                return prefix + path.join(
                    path.join.apply(path, parts.slice(0, i + 1)),
                    module_dir
                );
            }));
        }
        if (process.platform === 'win32'){
            dirs[dirs.length-1] = dirs[dirs.length-1].replace(":", ":\\");
        }
        return dirs.concat(opts.paths);
    }
    
  provide("resolve/lib/node-modules-paths.js", module.exports);
}(global));

// pakmanager:resolve/lib/async
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  var core =  require('resolve/lib/core');
    var fs = require('fs');
    var path = require('path');
    var caller =  require('resolve/lib/caller.js');
    var nodeModulesPaths =  require('resolve/lib/node-modules-paths.js');
    var splitRe = process.platform === 'win32' ? /[\/\\]/ : /\//;
    
    module.exports = function resolve (x, opts, cb) {
        if (typeof opts === 'function') {
            cb = opts;
            opts = {};
        }
        if (!opts) opts = {};
        if (typeof x !== 'string') {
            return process.nextTick(function () {
                cb(new Error('path must be a string'));
            });
        }
        
        var isFile = opts.isFile || function (file, cb) {
            fs.stat(file, function (err, stat) {
                if (err && err.code === 'ENOENT') cb(null, false)
                else if (err) cb(err)
                else cb(null, stat.isFile() || stat.isFIFO())
            });
        };
        var readFile = opts.readFile || fs.readFile;
        
        var extensions = opts.extensions || [ '.js' ];
        var y = opts.basedir || path.dirname(caller());
        
        opts.paths = opts.paths || [];
        
        if (/^(?:\.\.?(?:\/|$)|\/|([A-Za-z]:)?[\\\/])/.test(x)) {
            var res = path.resolve(y, x);
            if (x === '..') res += '/';
            if (/\/$/.test(x) && res === y) {
                loadAsDirectory(res, opts.package, onfile);
            }
            else loadAsFile(res, opts.package, onfile);
        }
        else loadNodeModules(x, y, function (err, n, pkg) {
            if (err) cb(err)
            else if (n) cb(null, n, pkg)
            else if (core[x]) return cb(null, x);
            else cb(new Error("Cannot find module '" + x + "' from '" + y + "'"))
        });
        
        function onfile (err, m, pkg) {
            if (err) cb(err)
            else if (m) cb(null, m, pkg)
            else loadAsDirectory(res, function (err, d, pkg) {
                if (err) cb(err)
                else if (d) cb(null, d, pkg)
                else cb(new Error("Cannot find module '" + x + "' from '" + y + "'"))
            })
        }
        
        function loadAsFile (x, pkg, cb) {
            if (typeof pkg === 'function') {
                cb = pkg;
                pkg = undefined;
            }
            
            var exts = [''].concat(extensions);
            load(exts, x, pkg)
    		
    		function load (exts, x, pkg) {
                if (exts.length === 0) return cb(null, undefined, pkg);
                var file = x + exts[0];
                
                if (pkg) onpkg(null, pkg)
                else loadpkg(path.dirname(file), onpkg);
                
                function onpkg (err, pkg_, dir) {
                    pkg = pkg_;
                    if (err) return cb(err)
                    if (dir && pkg && opts.pathFilter) {
                        var rfile = path.relative(dir, file);
                        var rel = rfile.slice(0, rfile.length - exts[0].length);
                        var r = opts.pathFilter(pkg, x, rel);
                        if (r) return load(
                            [''].concat(extensions.slice()),
                            path.resolve(dir, r),
                            pkg
                        );
                    }
                    isFile(file, onex);
                }
                function onex (err, ex) {
                    if (err) cb(err)
                    else if (!ex) load(exts.slice(1), x, pkg)
                    else cb(null, file, pkg)
                }
            }
        }
        
        function loadpkg (dir, cb) {
            if (dir === '' || dir === '/') return cb(null);
            if (process.platform === 'win32' && /^\w:[\\\/]*$/.test(dir)) {
                return cb(null);
            }
            if (/[\\\/]node_modules[\\\/]*$/.test(dir)) return cb(null);
            
            var pkgfile = path.join(dir, 'package.json');
            isFile(pkgfile, function (err, ex) {
                // on err, ex is false
                if (!ex) return loadpkg(
                    path.dirname(dir), cb
                );
                
                readFile(pkgfile, function (err, body) {
                    if (err) cb(err);
                    try { var pkg = JSON.parse(body) }
                    catch (err) {}
                    
                    if (pkg && opts.packageFilter) {
                        pkg = opts.packageFilter(pkg, pkgfile);
                    }
                    cb(null, pkg, dir);
                });
            });
        }
        
        function loadAsDirectory (x, fpkg, cb) {
            if (typeof fpkg === 'function') {
                cb = fpkg;
                fpkg = opts.package;
            }
            
            var pkgfile = path.join(x, '/package.json');
            isFile(pkgfile, function (err, ex) {
                if (err) return cb(err);
                if (!ex) return loadAsFile(path.join(x, '/index'), fpkg, cb);
                
                readFile(pkgfile, function (err, body) {
                    if (err) return cb(err);
                    try {
                        var pkg = JSON.parse(body);
                    }
                    catch (err) {}
                    
                    if (opts.packageFilter) {
                        pkg = opts.packageFilter(pkg, pkgfile);
                    }
                    
                    if (pkg.main) {
                        if (pkg.main === '.' || pkg.main === './'){
                            pkg.main = 'index'
                        }
                        loadAsFile(path.resolve(x, pkg.main), pkg, function (err, m, pkg) {
                            if (err) return cb(err);
                            if (m) return cb(null, m, pkg);
                            if (!pkg) return loadAsFile(path.join(x, '/index'), pkg, cb);
    
                            var dir = path.resolve(x, pkg.main);
                            loadAsDirectory(dir, pkg, function (err, n, pkg) {
                                if (err) return cb(err);
                                if (n) return cb(null, n, pkg);
                                loadAsFile(path.join(x, '/index'), pkg, cb);
                            });
                        });
                        return;
                    }
                    
                    loadAsFile(path.join(x, '/index'), pkg, cb);
                });
            });
        }
        
        function loadNodeModules (x, start, cb) {
            (function process (dirs) {
                if (dirs.length === 0) return cb(null, undefined);
                var dir = dirs[0];
                
                var file = path.join(dir, '/', x);
                loadAsFile(file, undefined, onfile);
                
                function onfile (err, m, pkg) {
                    if (err) return cb(err);
                    if (m) return cb(null, m, pkg);
                    loadAsDirectory(path.join(dir, '/', x), undefined, ondir);
                }
                
                function ondir (err, n, pkg) {
                    if (err) return cb(err);
                    if (n) return cb(null, n, pkg);
                    process(dirs.slice(1));
                }
            })(nodeModulesPaths(start, opts));
        }
    };
    
  provide("resolve/lib/async", module.exports);
}(global));

// pakmanager:resolve/lib/sync
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  var core =  require('resolve/lib/core');
    var fs = require('fs');
    var path = require('path');
    var caller =  require('resolve/lib/caller.js');
    var nodeModulesPaths =  require('resolve/lib/node-modules-paths.js');
    
    module.exports = function (x, opts) {
        if (!opts) opts = {};
        var isFile = opts.isFile || function (file) {
            try { var stat = fs.statSync(file) }
            catch (err) { if (err && err.code === 'ENOENT') return false }
            return stat.isFile() || stat.isFIFO();
        };
        var readFileSync = opts.readFileSync || fs.readFileSync;
        
        var extensions = opts.extensions || [ '.js' ];
        var y = opts.basedir || path.dirname(caller());
    
        opts.paths = opts.paths || [];
    
        if (/^(?:\.\.?(?:\/|$)|\/|([A-Za-z]:)?[\\\/])/.test(x)) {
            var res = path.resolve(y, x);
            if (x === '..') res += '/';
            var m = loadAsFileSync(res) || loadAsDirectorySync(res);
            if (m) return m;
        } else {
            var n = loadNodeModulesSync(x, y);
            if (n) return n;
        }
        
        if (core[x]) return x;
        
        throw new Error("Cannot find module '" + x + "' from '" + y + "'");
        
        function loadAsFileSync (x) {
            if (isFile(x)) {
                return x;
            }
            
            for (var i = 0; i < extensions.length; i++) {
                var file = x + extensions[i];
                if (isFile(file)) {
                    return file;
                }
            }
        }
        
        function loadAsDirectorySync (x) {
            var pkgfile = path.join(x, '/package.json');
            if (isFile(pkgfile)) {
                var body = readFileSync(pkgfile, 'utf8');
                try {
                    var pkg = JSON.parse(body);
                    if (opts.packageFilter) {
                        pkg = opts.packageFilter(pkg, x);
                    }
                    
                    if (pkg.main) {
                        var m = loadAsFileSync(path.resolve(x, pkg.main));
                        if (m) return m;
                        var n = loadAsDirectorySync(path.resolve(x, pkg.main));
                        if (n) return n;
                    }
                }
                catch (err) {}
            }
            
            return loadAsFileSync(path.join( x, '/index'));
        }
        
        function loadNodeModulesSync (x, start) {
            var dirs = nodeModulesPaths(start, opts);
            for (var i = 0; i < dirs.length; i++) {
                var dir = dirs[i];
                var m = loadAsFileSync(path.join( dir, '/', x));
                if (m) return m;
                var n = loadAsDirectorySync(path.join( dir, '/', x ));
                if (n) return n;
            }
        }
    };
    
  provide("resolve/lib/sync", module.exports);
}(global));

// pakmanager:resolve
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  var core =  require('resolve/lib/core');
    exports = module.exports =  require('resolve/lib/async');
    exports.core = core;
    exports.isCore = function (x) { return core[x] };
    exports.sync =  require('resolve/lib/sync');
    
  provide("resolve", module.exports);
}(global));

// pakmanager:os-homedir
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  'use strict';
    var os = require('os');
    
    function homedir() {
    	var env = process.env;
    	var home = env.HOME;
    	var user = env.LOGNAME || env.USER || env.LNAME || env.USERNAME;
    
    	if (process.platform === 'win32') {
    		return env.USERPROFILE || env.HOMEDRIVE + env.HOMEPATH || home || null;
    	}
    
    	if (process.platform === 'darwin') {
    		return home || (user ? '/Users/' + user : null);
    	}
    
    	if (process.platform === 'linux') {
    		return home || (user ? (process.getuid() === 0 ? '/root' : '/home/' + user) : null);
    	}
    
    	return home || null;
    }
    
    module.exports = typeof os.homedir === 'function' ? os.homedir : homedir;
    
  provide("os-homedir", module.exports);
}(global));

// pakmanager:end-of-stream
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  var once = require('once');
    
    var noop = function() {};
    
    var isRequest = function(stream) {
    	return stream.setHeader && typeof stream.abort === 'function';
    };
    
    var isChildProcess = function(stream) {
    	return stream.stdio && Array.isArray(stream.stdio) && stream.stdio.length === 3
    };
    
    var eos = function(stream, opts, callback) {
    	if (typeof opts === 'function') return eos(stream, null, opts);
    	if (!opts) opts = {};
    
    	callback = once(callback || noop);
    
    	var ws = stream._writableState;
    	var rs = stream._readableState;
    	var readable = opts.readable || (opts.readable !== false && stream.readable);
    	var writable = opts.writable || (opts.writable !== false && stream.writable);
    
    	var onlegacyfinish = function() {
    		if (!stream.writable) onfinish();
    	};
    
    	var onfinish = function() {
    		writable = false;
    		if (!readable) callback();
    	};
    
    	var onend = function() {
    		readable = false;
    		if (!writable) callback();
    	};
    
    	var onexit = function(exitCode) {
    		callback(exitCode ? new Error('exited with error code: ' + exitCode) : null);
    	};
    
    	var onclose = function() {
    		if (readable && !(rs && rs.ended)) return callback(new Error('premature close'));
    		if (writable && !(ws && ws.ended)) return callback(new Error('premature close'));
    	};
    
    	var onrequest = function() {
    		stream.req.on('finish', onfinish);
    	};
    
    	if (isRequest(stream)) {
    		stream.on('complete', onfinish);
    		stream.on('abort', onclose);
    		if (stream.req) onrequest();
    		else stream.on('request', onrequest);
    	} else if (writable && !ws) { // legacy streams
    		stream.on('end', onlegacyfinish);
    		stream.on('close', onlegacyfinish);
    	}
    
    	if (isChildProcess(stream)) stream.on('exit', onexit);
    
    	stream.on('end', onend);
    	stream.on('finish', onfinish);
    	if (opts.error !== false) stream.on('error', callback);
    	stream.on('close', onclose);
    
    	return function() {
    		stream.removeListener('complete', onfinish);
    		stream.removeListener('abort', onclose);
    		stream.removeListener('request', onrequest);
    		if (stream.req) stream.req.removeListener('finish', onfinish);
    		stream.removeListener('end', onlegacyfinish);
    		stream.removeListener('close', onlegacyfinish);
    		stream.removeListener('finish', onfinish);
    		stream.removeListener('exit', onexit);
    		stream.removeListener('end', onend);
    		stream.removeListener('error', callback);
    		stream.removeListener('close', onclose);
    	};
    };
    
    module.exports = eos;
  provide("end-of-stream", module.exports);
}(global));

// pakmanager:ordered-read-streams
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  var Readable = require('readable-stream').Readable;
    var isReadable = require('isstream').isReadable;
    var util = require('util');
    
    
    function addStream(streams, stream)
    {
      if(!isReadable(stream)) throw new Error('All input streams must be readable');
    
      var self = this;
    
      stream._buffer = [];
    
      stream.on('readable', function()
      {
        var chunk = stream.read();
        if (chunk === null)
          return;
    
        if(this === streams[0])
          self.push(chunk);
    
        else
          this._buffer.push(chunk);
      });
    
      stream.on('end', function()
      {
        for(var stream = streams[0];
            stream && stream._readableState.ended;
            stream = streams[0])
        {
          while(stream._buffer.length)
            self.push(stream._buffer.shift());
    
          streams.shift();
        }
    
        if(!streams.length) self.push(null);
      });
    
      stream.on('error', this.emit.bind(this, 'error'));
    
      streams.push(stream);
    }
    
    
    function OrderedStreams(streams, options) {
      if (!(this instanceof(OrderedStreams))) {
        return new OrderedStreams(streams, options);
      }
    
      streams = streams || [];
      options = options || {};
    
      options.objectMode = true;
    
      Readable.call(this, options);
    
    
      if(!Array.isArray(streams)) streams = [streams];
      if(!streams.length) return this.push(null);  // no streams, close
    
    
      var addStream_bind = addStream.bind(this, []);
    
    
      streams.forEach(function(item)
      {
        if(Array.isArray(item))
          item.forEach(addStream_bind);
    
        else
          addStream_bind(item);
      });
    }
    util.inherits(OrderedStreams, Readable);
    
    OrderedStreams.prototype._read = function () {};
    
    
    module.exports = OrderedStreams;
    
  provide("ordered-read-streams", module.exports);
}(global));

// pakmanager:glob2base
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  'use strict';
    
    var path = require('path');
    var findIndex = require('find-index');
    
    var flattenGlob = function(arr){
      var out = [];
      var flat = true;
      for(var i = 0; i < arr.length; i++) {
        if (typeof arr[i] !== 'string') {
          flat = false;
          break;
        }
        out.push(arr[i]);
      }
    
      // last one is a file or specific dir
      // so we pop it off
      if (flat) {
        out.pop();
      }
      return out;
    };
    
    var flattenExpansion = function(set) {
      var first = set[0];
      var toCompare = set.slice(1);
    
      // find index where the diff is
      var idx = findIndex(first, function(v, idx){
        if (typeof v !== 'string') {
          return true;
        }
    
        var matched = toCompare.every(function(arr){
          return v === arr[idx];
        });
    
        return !matched;
      });
    
      return first.slice(0, idx);
    };
    
    var setToBase = function(set) {
      // normal something/*.js
      if (set.length <= 1) {
        return flattenGlob(set[0]);
      }
      // has expansion
      return flattenExpansion(set);
    };
    
    module.exports = function(glob) {
      var set = glob.minimatch.set;
      var baseParts = setToBase(set);
      var basePath = path.normalize(baseParts.join(path.sep))+path.sep;
      return basePath;
    };
    
  provide("glob2base", module.exports);
}(global));

// pakmanager:unique-stream
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  'use strict';
    
    var filter = require('through2-filter').obj;
    var ES6Set;
    if (typeof global.Set === 'function') {
      ES6Set = global.Set;
    } else {
      ES6Set = function() {
        this.keys = [];
        this.has = function(val) {
          return this.keys.indexOf(val) !== -1;
        },
        this.add = function(val) {
          this.keys.push(val);
        }
      }
    }
    
    function prop(propName) {
      return function (data) {
        return data[propName];
      };
    }
    
    module.exports = unique;
    function unique(propName, keyStore) {
      keyStore = keyStore || new ES6Set();
    
      var keyfn = JSON.stringify;
      if (typeof propName === 'string') {
        keyfn = prop(propName);
      } else if (typeof propName === 'function') {
        keyfn = propName;
      }
    
      return filter(function (data) {
        var key = keyfn(data);
    
        if (keyStore.has(key)) {
          return false;
        }
    
        keyStore.add(key);
        return true;
      });
    }
    
  provide("unique-stream", module.exports);
}(global));

// pakmanager:gaze/lib/helper
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  'use strict';
    
    var path = require('path');
    var helper = module.exports = {};
    
    // Returns boolean whether filepath is dir terminated
    helper.isDir = function isDir(dir) {
      if (typeof dir !== 'string') { return false; }
      return (dir.slice(-(path.sep.length)) === path.sep);
    };
    
    // Create a `key:[]` if doesnt exist on `obj` then push or concat the `val`
    helper.objectPush = function objectPush(obj, key, val) {
      if (obj[key] == null) { obj[key] = []; }
      if (Array.isArray(val)) { obj[key] = obj[key].concat(val); }
      else if (val) { obj[key].push(val); }
      return obj[key] = helper.unique(obj[key]);
    };
    
    // Ensures the dir is marked with path.sep
    helper.markDir = function markDir(dir) {
      if (typeof dir === 'string' &&
        dir.slice(-(path.sep.length)) !== path.sep &&
        dir !== '.') {
        dir += path.sep;
      }
      return dir;
    };
    
    // Changes path.sep to unix ones for testing
    helper.unixifyPathSep = function unixifyPathSep(filepath) {
      return (process.platform === 'win32') ? String(filepath).replace(/\\/g, '/') : filepath;
    };
    
    /**
     * Lo-Dash 1.0.1 <http://lodash.com/>
     * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
     * Based on Underscore.js 1.4.4 <http://underscorejs.org/>
     * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud Inc.
     * Available under MIT license <http://lodash.com/license>
     */
    helper.unique = function unique() { var array = Array.prototype.concat.apply(Array.prototype, arguments); var result = []; for (var i = 0; i < array.length; i++) { if (result.indexOf(array[i]) === -1) { result.push(array[i]); } } return result; };
    
    /**
     * Copyright (c) 2010 Caolan McMahon
     * Available under MIT license <https://raw.github.com/caolan/async/master/LICENSE>
     */
    helper.forEachSeries = function forEachSeries(arr, iterator, callback) {
      if (!arr.length) { return callback(); }
      var completed = 0;
      var iterate = function() {
        iterator(arr[completed], function (err) {
          if (err) {
            callback(err);
            callback = function() {};
          } else {
            completed += 1;
            if (completed === arr.length) {
              callback(null);
            } else {
              iterate();
            }
          }
        });
      };
      iterate();
    };
    
  provide("gaze/lib/helper", module.exports);
}(global));

// pakmanager:gaze
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  /*
     * gaze
     * https://github.com/shama/gaze
     *
     * Copyright (c) 2013 Kyle Robinson Young
     * Licensed under the MIT license.
     */
    
    'use strict';
    
    // libs
    var util = require('util');
    var EE = require('events').EventEmitter;
    var fs = require('fs');
    var path = require('path');
    var globule = require('globule');
    var helper =  require('gaze/lib/helper');
    
    // shim setImmediate for node v0.8
    var setImmediate = require('timers').setImmediate;
    if (typeof setImmediate !== 'function') {
      setImmediate = process.nextTick;
    }
    
    // globals
    var delay = 10;
    
    // `Gaze` EventEmitter object to return in the callback
    function Gaze(patterns, opts, done) {
      var self = this;
      EE.call(self);
    
      // If second arg is the callback
      if (typeof opts === 'function') {
        done = opts;
        opts = {};
      }
    
      // Default options
      opts = opts || {};
      opts.mark = true;
      opts.interval = opts.interval || 100;
      opts.debounceDelay = opts.debounceDelay || 500;
      opts.cwd = opts.cwd || process.cwd();
      this.options = opts;
    
      // Default done callback
      done = done || function() {};
    
      // Remember our watched dir:files
      this._watched = Object.create(null);
    
      // Store watchers
      this._watchers = Object.create(null);
    
      // Store watchFile listeners
      this._pollers = Object.create(null);
    
      // Store patterns
      this._patterns = [];
    
      // Cached events for debouncing
      this._cached = Object.create(null);
    
      // Set maxListeners
      if (this.options.maxListeners) {
        this.setMaxListeners(this.options.maxListeners);
        Gaze.super_.prototype.setMaxListeners(this.options.maxListeners);
        delete this.options.maxListeners;
      }
    
      // Initialize the watch on files
      if (patterns) {
        this.add(patterns, done);
      }
    
      // keep the process alive
      this._keepalive = setInterval(function() {}, 200);
    
      return this;
    }
    util.inherits(Gaze, EE);
    
    // Main entry point. Start watching and call done when setup
    module.exports = function gaze(patterns, opts, done) {
      return new Gaze(patterns, opts, done);
    };
    module.exports.Gaze = Gaze;
    
    // Override the emit function to emit `all` events
    // and debounce on duplicate events per file
    Gaze.prototype.emit = function() {
      var self = this;
      var args = arguments;
    
      var e = args[0];
      var filepath = args[1];
      var timeoutId;
    
      // If not added/deleted/changed/renamed then just emit the event
      if (e.slice(-2) !== 'ed') {
        Gaze.super_.prototype.emit.apply(self, args);
        return this;
      }
    
      // Detect rename event, if added and previous deleted is in the cache
      if (e === 'added') {
        Object.keys(this._cached).forEach(function(oldFile) {
          if (self._cached[oldFile].indexOf('deleted') !== -1) {
            args[0] = e = 'renamed';
            [].push.call(args, oldFile);
            delete self._cached[oldFile];
            return false;
          }
        });
      }
    
      // If cached doesnt exist, create a delay before running the next
      // then emit the event
      var cache = this._cached[filepath] || [];
      if (cache.indexOf(e) === -1) {
        helper.objectPush(self._cached, filepath, e);
        clearTimeout(timeoutId);
        timeoutId = setTimeout(function() {
          delete self._cached[filepath];
        }, this.options.debounceDelay);
        // Emit the event and `all` event
        Gaze.super_.prototype.emit.apply(self, args);
        Gaze.super_.prototype.emit.apply(self, ['all', e].concat([].slice.call(args, 1)));
      }
    
      // Detect if new folder added to trigger for matching files within folder
      if (e === 'added') {
        if (helper.isDir(filepath)) {
          fs.readdirSync(filepath).map(function(file) {
            return path.join(filepath, file);
          }).filter(function(file) {
            return globule.isMatch(self._patterns, file, self.options);
          }).forEach(function(file) {
            self.emit('added', file);
          });
        }
      }
    
      return this;
    };
    
    // Close watchers
    Gaze.prototype.close = function(_reset) {
      var self = this;
      _reset = _reset === false ? false : true;
      Object.keys(self._watchers).forEach(function(file) {
        self._watchers[file].close();
      });
      self._watchers = Object.create(null);
      Object.keys(this._watched).forEach(function(dir) {
        self._unpollDir(dir);
      });
      if (_reset) {
        self._watched = Object.create(null);
        setTimeout(function() {
          self.emit('end');
          self.removeAllListeners();
          clearInterval(self._keepalive);
        }, delay + 100);
      }
      return self;
    };
    
    // Add file patterns to be watched
    Gaze.prototype.add = function(files, done) {
      if (typeof files === 'string') { files = [files]; }
      this._patterns = helper.unique.apply(null, [this._patterns, files]);
      files = globule.find(this._patterns, this.options);
      this._addToWatched(files);
      this.close(false);
      this._initWatched(done);
    };
    
    // Dont increment patterns and dont call done if nothing added
    Gaze.prototype._internalAdd = function(file, done) {
      var files = [];
      if (helper.isDir(file)) {
        files = [helper.markDir(file)].concat(globule.find(this._patterns, this.options));
      } else {
        if (globule.isMatch(this._patterns, file, this.options)) {
          files = [file];
        }
      }
      if (files.length > 0) {
        this._addToWatched(files);
        this.close(false);
        this._initWatched(done);
      }
    };
    
    // Remove file/dir from `watched`
    Gaze.prototype.remove = function(file) {
      var self = this;
      if (this._watched[file]) {
        // is dir, remove all files
        this._unpollDir(file);
        delete this._watched[file];
      } else {
        // is a file, find and remove
        Object.keys(this._watched).forEach(function(dir) {
          var index = self._watched[dir].indexOf(file);
          if (index !== -1) {
            self._unpollFile(file);
            self._watched[dir].splice(index, 1);
            return false;
          }
        });
      }
      if (this._watchers[file]) {
        this._watchers[file].close();
      }
      return this;
    };
    
    // Return watched files
    Gaze.prototype.watched = function() {
      return this._watched;
    };
    
    // Returns `watched` files with relative paths to process.cwd()
    Gaze.prototype.relative = function(dir, unixify) {
      var self = this;
      var relative = Object.create(null);
      var relDir, relFile, unixRelDir;
      var cwd = this.options.cwd || process.cwd();
      if (dir === '') { dir = '.'; }
      dir = helper.markDir(dir);
      unixify = unixify || false;
      Object.keys(this._watched).forEach(function(dir) {
        relDir = path.relative(cwd, dir) + path.sep;
        if (relDir === path.sep) { relDir = '.'; }
        unixRelDir = unixify ? helper.unixifyPathSep(relDir) : relDir;
        relative[unixRelDir] = self._watched[dir].map(function(file) {
          relFile = path.relative(path.join(cwd, relDir) || '', file || '');
          if (helper.isDir(file)) {
            relFile = helper.markDir(relFile);
          }
          if (unixify) {
            relFile = helper.unixifyPathSep(relFile);
          }
          return relFile;
        });
      });
      if (dir && unixify) {
        dir = helper.unixifyPathSep(dir);
      }
      return dir ? relative[dir] || [] : relative;
    };
    
    // Adds files and dirs to watched
    Gaze.prototype._addToWatched = function(files) {
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var filepath = path.resolve(this.options.cwd, file);
    
        var dirname = (helper.isDir(file)) ? filepath : path.dirname(filepath);
        dirname = helper.markDir(dirname);
    
        // If a new dir is added
        if (helper.isDir(file) && !(filepath in this._watched)) {
          helper.objectPush(this._watched, filepath, []);
        }
    
        if (file.slice(-1) === '/') { filepath += path.sep; }
        helper.objectPush(this._watched, path.dirname(filepath) + path.sep, filepath);
    
        // add folders into the mix
        var readdir = fs.readdirSync(dirname);
        for (var j = 0; j < readdir.length; j++) {
          var dirfile = path.join(dirname, readdir[j]);
          if (fs.statSync(dirfile).isDirectory()) {
            helper.objectPush(this._watched, dirname, dirfile + path.sep);
          }
        }
      }
      return this;
    };
    
    Gaze.prototype._watchDir = function(dir, done) {
      var self = this;
      var timeoutId;
      try {
        this._watchers[dir] = fs.watch(dir, function(event) {
          // race condition. Let's give the fs a little time to settle down. so we
          // don't fire events on non existent files.
          clearTimeout(timeoutId);
          timeoutId = setTimeout(function() {
            // race condition. Ensure that this directory is still being watched
            // before continuing.
            if ((dir in self._watchers) && fs.existsSync(dir)) {
              done(null, dir);
            }
          }, delay + 100);
        });
      } catch (err) {
        return this._handleError(err);
      }
      return this;
    };
    
    Gaze.prototype._unpollFile = function(file) {
      if (this._pollers[file]) {
        fs.unwatchFile(file, this._pollers[file] );
        delete this._pollers[file];
      }
      return this;
    };
    
    Gaze.prototype._unpollDir = function(dir) {
      this._unpollFile(dir);
      for (var i = 0; i < this._watched[dir].length; i++) {
        this._unpollFile(this._watched[dir][i]);
      }
    };
    
    Gaze.prototype._pollFile = function(file, done) {
      var opts = { persistent: true, interval: this.options.interval };
      if (!this._pollers[file]) {
        this._pollers[file] = function(curr, prev) {
          done(null, file);
        };
        try {
          fs.watchFile(file, opts, this._pollers[file]);
        } catch (err) {
          return this._handleError(err);
        }
      }
      return this;
    };
    
    // Initialize the actual watch on `watched` files
    Gaze.prototype._initWatched = function(done) {
      var self = this;
      var cwd = this.options.cwd || process.cwd();
      var curWatched = Object.keys(self._watched);
    
      // if no matching files
      if (curWatched.length < 1) {
        // Defer to emitting to give a chance to attach event handlers.
        setImmediate(function () {
          self.emit('ready', self);
          if (done) { done.call(self, null, self); }
          self.emit('nomatch');
        });
        return;
      }
    
      helper.forEachSeries(curWatched, function(dir, next) {
        dir = dir || '';
        var files = self._watched[dir];
        // Triggered when a watched dir has an event
        self._watchDir(dir, function(event, dirpath) {
          var relDir = cwd === dir ? '.' : path.relative(cwd, dir);
          relDir = relDir || '';
    
          fs.readdir(dirpath, function(err, current) {
            if (err) { return self.emit('error', err); }
            if (!current) { return; }
    
            try {
              // append path.sep to directories so they match previous.
              current = current.map(function(curPath) {
                if (fs.existsSync(path.join(dir, curPath)) && fs.statSync(path.join(dir, curPath)).isDirectory()) {
                  return curPath + path.sep;
                } else {
                  return curPath;
                }
              });
            } catch (err) {
              // race condition-- sometimes the file no longer exists
            }
    
            // Get watched files for this dir
            var previous = self.relative(relDir);
    
            // If file was deleted
            previous.filter(function(file) {
              return current.indexOf(file) < 0;
            }).forEach(function(file) {
              if (!helper.isDir(file)) {
                var filepath = path.join(dir, file);
                self.remove(filepath);
                self.emit('deleted', filepath);
              }
            });
    
            // If file was added
            current.filter(function(file) {
              return previous.indexOf(file) < 0;
            }).forEach(function(file) {
              // Is it a matching pattern?
              var relFile = path.join(relDir, file);
              // Add to watch then emit event
              self._internalAdd(relFile, function() {
                self.emit('added', path.join(dir, file));
              });
            });
    
          });
        });
    
        // Watch for change/rename events on files
        files.forEach(function(file) {
          if (helper.isDir(file)) { return; }
          self._pollFile(file, function(err, filepath) {
            // Only emit changed if the file still exists
            // Prevents changed/deleted duplicate events
            if (fs.existsSync(filepath)) {
              self.emit('changed', filepath);
            }
          });
        });
    
        next();
      }, function() {
    
        // Return this instance of Gaze
        // delay before ready solves a lot of issues
        setTimeout(function() {
          self.emit('ready', self);
          if (done) { done.call(self, null, self); }
        }, delay + 100);
    
      });
    };
    
    // If an error, handle it here
    Gaze.prototype._handleError = function(err) {
      if (err.code === 'EMFILE') {
        return this.emit('error', new Error('EMFILE: Too many opened files.'));
      }
      return this.emit('error', err);
    };
    
  provide("gaze", module.exports);
}(global));

// pakmanager:first-chunk-stream
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  'use strict';
    var util = require('util');
    var Transform = require('stream').Transform;
    
    function ctor(options, transform) {
    	util.inherits(FirstChunk, Transform);
    
    	if (typeof options === 'function') {
    		transform = options;
    		options = {};
    	}
    
    	if (typeof transform !== 'function') {
    		throw new Error('transform function required');
    	}
    
    	function FirstChunk(options2) {
    		if (!(this instanceof FirstChunk)) {
    			return new FirstChunk(options2);
    		}
    
    		Transform.call(this, options2);
    
    		this._firstChunk = true;
    		this._transformCalled = false;
    		this._minSize = options.minSize;
    	}
    
    	FirstChunk.prototype._transform = function (chunk, enc, cb) {
    		this._enc = enc;
    
    		if (this._firstChunk) {
    			this._firstChunk = false;
    
    			if (this._minSize == null) {
    				transform.call(this, chunk, enc, cb);
    				this._transformCalled = true;
    				return;
    			}
    
    			this._buffer = chunk;
    			cb();
    			return;
    		}
    
    		if (this._minSize == null) {
    			this.push(chunk);
    			cb();
    			return;
    		}
    
    		if (this._buffer.length < this._minSize) {
    			this._buffer = Buffer.concat([this._buffer, chunk]);
    			cb();
    			return;
    		}
    
    		if (this._buffer.length >= this._minSize) {
    			transform.call(this, this._buffer.slice(), enc, function () {
    				this.push(chunk);
    				cb();
    			}.bind(this));
    			this._transformCalled = true;
    			this._buffer = false;
    			return;
    		}
    
    		this.push(chunk);
    		cb();
    	};
    
    	FirstChunk.prototype._flush = function (cb) {
    		if (!this._buffer) {
    			cb();
    			return;
    		}
    
    		if (this._transformCalled) {
    			this.push(this._buffer);
    			cb();
    		} else {
    			transform.call(this, this._buffer.slice(), this._enc, cb);
    		}
    	};
    
    	return FirstChunk;
    }
    
    module.exports = function () {
    	return ctor.apply(ctor, arguments)();
    };
    
    module.exports.ctor = ctor;
    
  provide("first-chunk-stream", module.exports);
}(global));

// pakmanager:is-utf8
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  
    exports = module.exports = function(bytes)
    {
        var i = 0;
        while(i < bytes.length)
        {
            if(     (// ASCII
                        bytes[i] == 0x09 ||
                        bytes[i] == 0x0A ||
                        bytes[i] == 0x0D ||
                        (0x20 <= bytes[i] && bytes[i] <= 0x7E)
                    )
              ) {
                  i += 1;
                  continue;
              }
    
            if(     (// non-overlong 2-byte
                        (0xC2 <= bytes[i] && bytes[i] <= 0xDF) &&
                        (0x80 <= bytes[i+1] && bytes[i+1] <= 0xBF)
                    )
              ) {
                  i += 2;
                  continue;
              }
    
            if(     (// excluding overlongs
                        bytes[i] == 0xE0 &&
                        (0xA0 <= bytes[i + 1] && bytes[i + 1] <= 0xBF) &&
                        (0x80 <= bytes[i + 2] && bytes[i + 2] <= 0xBF)
                    ) ||
                    (// straight 3-byte
                     ((0xE1 <= bytes[i] && bytes[i] <= 0xEC) ||
                      bytes[i] == 0xEE ||
                      bytes[i] == 0xEF) &&
                     (0x80 <= bytes[i + 1] && bytes[i+1] <= 0xBF) &&
                     (0x80 <= bytes[i+2] && bytes[i+2] <= 0xBF)
                    ) ||
                    (// excluding surrogates
                     bytes[i] == 0xED &&
                     (0x80 <= bytes[i+1] && bytes[i+1] <= 0x9F) &&
                     (0x80 <= bytes[i+2] && bytes[i+2] <= 0xBF)
                    )
              ) {
                  i += 3;
                  continue;
              }
    
            if(     (// planes 1-3
                        bytes[i] == 0xF0 &&
                        (0x90 <= bytes[i + 1] && bytes[i + 1] <= 0xBF) &&
                        (0x80 <= bytes[i + 2] && bytes[i + 2] <= 0xBF) &&
                        (0x80 <= bytes[i + 3] && bytes[i + 3] <= 0xBF)
                    ) ||
                    (// planes 4-15
                     (0xF1 <= bytes[i] && bytes[i] <= 0xF3) &&
                     (0x80 <= bytes[i + 1] && bytes[i + 1] <= 0xBF) &&
                     (0x80 <= bytes[i + 2] && bytes[i + 2] <= 0xBF) &&
                     (0x80 <= bytes[i + 3] && bytes[i + 3] <= 0xBF)
                    ) ||
                    (// plane 16
                     bytes[i] == 0xF4 &&
                     (0x80 <= bytes[i + 1] && bytes[i + 1] <= 0x8F) &&
                     (0x80 <= bytes[i + 2] && bytes[i + 2] <= 0xBF) &&
                     (0x80 <= bytes[i + 3] && bytes[i + 3] <= 0xBF)
                    )
              ) {
                  i += 4;
                  continue;
              }
    
            return false;
        }
    
        return true;
    }
    
  provide("is-utf8", module.exports);
}(global));

// pakmanager:array-differ
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  'use strict';
    module.exports = function (arr) {
    	var rest = [].concat.apply([], [].slice.call(arguments, 1));
    	return arr.filter(function (el) {
    		return rest.indexOf(el) === -1;
    	});
    };
    
  provide("array-differ", module.exports);
}(global));

// pakmanager:array-uniq
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  'use strict';
    
    // there's 3 implementations written in increasing order of efficiency
    
    // 1 - no Set type is defined
    function uniqNoSet(arr) {
    	var ret = [];
    
    	for (var i = 0; i < arr.length; i++) {
    		if (ret.indexOf(arr[i]) === -1) {
    			ret.push(arr[i]);
    		}
    	}
    
    	return ret;
    }
    
    // 2 - a simple Set type is defined
    function uniqSet(arr) {
    	var seen = new Set();
    	return arr.filter(function (el) {
    		if (!seen.has(el)) {
    			seen.add(el);
    			return true;
    		}
    	});
    }
    
    // 3 - a standard Set type is defined and it has a forEach method
    function uniqSetWithForEach(arr) {
    	var ret = [];
    
    	(new Set(arr)).forEach(function (el) {
    		ret.push(el);
    	});
    
    	return ret;
    }
    
    // V8 currently has a broken implementation
    // https://github.com/joyent/node/issues/8449
    function doesForEachActuallyWork() {
    	var ret = false;
    
    	(new Set([true])).forEach(function (el) {
    		ret = el;
    	});
    
    	return ret === true;
    }
    
    if ('Set' in global) {
    	if (typeof Set.prototype.forEach === 'function' && doesForEachActuallyWork()) {
    		module.exports = uniqSetWithForEach;
    	} else {
    		module.exports = uniqSet;
    	}
    } else {
    	module.exports = uniqNoSet;
    }
    
  provide("array-uniq", module.exports);
}(global));

// pakmanager:beeper
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  'use strict';
    
    var BEEP_DELAY = 500;
    
    if (!process.stdout.isTTY ||
    	process.argv.indexOf('--no-beep') !== -1 ||
    	process.argv.indexOf('--beep=false') !== -1) {
    	module.exports = function () {};
    	return;
    }
    
    function beep() {
    	process.stdout.write('\u0007');
    }
    
    function melodicalBeep(val, cb) {
    	if (val.length === 0) {
    		cb();
    		return;
    	}
    
    	setTimeout(function () {
    		if (val.shift() === '*') {
    			beep();
    		}
    
    		melodicalBeep(val, cb);
    	}, BEEP_DELAY);
    }
    
    module.exports = function (val, cb) {
    	cb = cb || function () {};
    
    	if (val === parseInt(val)) {
    		if (val < 0) {
    			throw new TypeError('Negative numbers are not accepted');
    		}
    
    		if (val === 0) {
    			cb();
    			return;
    		}
    
    		for (var i = 0; i < val; i++) {
    			setTimeout(function (i) {
    				beep();
    
    				if (i === val - 1) {
    					cb();
    				}
    			}, BEEP_DELAY * i, i);
    		}
    	} else if (!val) {
    		beep();
    		cb();
    	} else if (typeof val === 'string') {
    		melodicalBeep(val.split(''), cb);
    	} else {
    		throw new TypeError('Not an accepted type');
    	}
    };
    
  provide("beeper", module.exports);
}(global));

// pakmanager:chalk
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  'use strict';
    var ansi = require('ansi-styles');
    var stripAnsi = require('strip-ansi');
    var hasColor = require('has-color');
    var defineProps = Object.defineProperties;
    var chalk = module.exports;
    
    var styles = (function () {
    	var ret = {};
    
    	ansi.grey = ansi.gray;
    
    	Object.keys(ansi).forEach(function (key) {
    		ret[key] = {
    			get: function () {
    				this._styles.push(key);
    				return this;
    			}
    		};
    	});
    
    	return ret;
    })();
    
    function init() {
    	var ret = {};
    
    	Object.keys(styles).forEach(function (name) {
    		ret[name] = {
    			get: function () {
    				var obj = defineProps(function self() {
    					var str = [].slice.call(arguments).join(' ');
    
    					if (!chalk.enabled) {
    						return str;
    					}
    
    					return self._styles.reduce(function (str, name) {
    						var code = ansi[name];
    						return str ? code.open + str + code.close : '';
    					}, str);
    				}, styles);
    
    				obj._styles = [];
    
    				return obj[name];
    			}
    		}
    	});
    
    	return ret;
    }
    
    defineProps(chalk, init());
    
    chalk.styles = ansi;
    chalk.stripColor = stripAnsi;
    chalk.supportsColor = hasColor;
    
    // detect mode if not set manually
    if (chalk.enabled === undefined) {
    	chalk.enabled = chalk.supportsColor;
    }
    
  provide("chalk", module.exports);
}(global));

// pakmanager:dateformat
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  /*
     * Date Format 1.2.3
     * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
     * MIT license
     *
     * Includes enhancements by Scott Trenda <scott.trenda.net>
     * and Kris Kowal <cixar.com/~kris.kowal/>
     *
     * Accepts a date, a mask, or a date and a mask.
     * Returns a formatted version of the given date.
     * The date defaults to the current date/time.
     * The mask defaults to dateFormat.masks.default.
     */
    
    (function(global) {
      'use strict';
    
      var dateFormat = (function() {
          var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZWN]|'[^']*'|'[^']*'/g;
          var timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g;
          var timezoneClip = /[^-+\dA-Z]/g;
      
          // Regexes and supporting functions are cached through closure
          return function (date, mask, utc, gmt) {
      
            // You can't provide utc if you skip other args (use the 'UTC:' mask prefix)
            if (arguments.length === 1 && kindOf(date) === 'string' && !/\d/.test(date)) {
              mask = date;
              date = undefined;
            }
      
            date = date || new Date;
      
            if(!(date instanceof Date)) {
              date = new Date(date);
            }
      
            if (isNaN(date)) {
              throw TypeError('Invalid date');
            }
      
            mask = String(dateFormat.masks[mask] || mask || dateFormat.masks['default']);
      
            // Allow setting the utc/gmt argument via the mask
            var maskSlice = mask.slice(0, 4);
            if (maskSlice === 'UTC:' || maskSlice === 'GMT:') {
              mask = mask.slice(4);
              utc = true;
              if (maskSlice === 'GMT:') {
                gmt = true;
              }
            }
      
            var _ = utc ? 'getUTC' : 'get';
            var d = date[_ + 'Date']();
            var D = date[_ + 'Day']();
            var m = date[_ + 'Month']();
            var y = date[_ + 'FullYear']();
            var H = date[_ + 'Hours']();
            var M = date[_ + 'Minutes']();
            var s = date[_ + 'Seconds']();
            var L = date[_ + 'Milliseconds']();
            var o = utc ? 0 : date.getTimezoneOffset();
            var W = getWeek(date);
            var N = getDayOfWeek(date);
            var flags = {
              d:    d,
              dd:   pad(d),
              ddd:  dateFormat.i18n.dayNames[D],
              dddd: dateFormat.i18n.dayNames[D + 7],
              m:    m + 1,
              mm:   pad(m + 1),
              mmm:  dateFormat.i18n.monthNames[m],
              mmmm: dateFormat.i18n.monthNames[m + 12],
              yy:   String(y).slice(2),
              yyyy: y,
              h:    H % 12 || 12,
              hh:   pad(H % 12 || 12),
              H:    H,
              HH:   pad(H),
              M:    M,
              MM:   pad(M),
              s:    s,
              ss:   pad(s),
              l:    pad(L, 3),
              L:    pad(Math.round(L / 10)),
              t:    H < 12 ? 'a'  : 'p',
              tt:   H < 12 ? 'am' : 'pm',
              T:    H < 12 ? 'A'  : 'P',
              TT:   H < 12 ? 'AM' : 'PM',
              Z:    gmt ? 'GMT' : utc ? 'UTC' : (String(date).match(timezone) || ['']).pop().replace(timezoneClip, ''),
              o:    (o > 0 ? '-' : '+') + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
              S:    ['th', 'st', 'nd', 'rd'][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10],
              W:    W,
              N:    N
            };
      
            return mask.replace(token, function (match) {
              if (match in flags) {
                return flags[match];
              }
              return match.slice(1, match.length - 1);
            });
          };
        })();
    
      dateFormat.masks = {
        'default':               'ddd mmm dd yyyy HH:MM:ss',
        'shortDate':             'm/d/yy',
        'mediumDate':            'mmm d, yyyy',
        'longDate':              'mmmm d, yyyy',
        'fullDate':              'dddd, mmmm d, yyyy',
        'shortTime':             'h:MM TT',
        'mediumTime':            'h:MM:ss TT',
        'longTime':              'h:MM:ss TT Z',
        'isoDate':               'yyyy-mm-dd',
        'isoTime':               'HH:MM:ss',
        'isoDateTime':           'yyyy-mm-dd\'T\'HH:MM:sso',
        'isoUtcDateTime':        'UTC:yyyy-mm-dd\'T\'HH:MM:ss\'Z\'',
        'expiresHeaderFormat':   'ddd, dd mmm yyyy HH:MM:ss Z'
      };
    
      // Internationalization strings
      dateFormat.i18n = {
        dayNames: [
          'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
          'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
        ],
        monthNames: [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
          'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
        ]
      };
    
    function pad(val, len) {
      val = String(val);
      len = len || 2;
      while (val.length < len) {
        val = '0' + val;
      }
      return val;
    }
    
    /**
     * Get the ISO 8601 week number
     * Based on comments from
     * http://techblog.procurios.nl/k/n618/news/view/33796/14863/Calculate-ISO-8601-week-and-year-in-javascript.html
     *
     * @param  {Object} `date`
     * @return {Number}
     */
    function getWeek(date) {
      // Remove time components of date
      var targetThursday = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    
      // Change date to Thursday same week
      targetThursday.setDate(targetThursday.getDate() - ((targetThursday.getDay() + 6) % 7) + 3);
    
      // Take January 4th as it is always in week 1 (see ISO 8601)
      var firstThursday = new Date(targetThursday.getFullYear(), 0, 4);
    
      // Change date to Thursday same week
      firstThursday.setDate(firstThursday.getDate() - ((firstThursday.getDay() + 6) % 7) + 3);
    
      // Check if daylight-saving-time-switch occured and correct for it
      var ds = targetThursday.getTimezoneOffset() - firstThursday.getTimezoneOffset();
      targetThursday.setHours(targetThursday.getHours() - ds);
    
      // Number of weeks between target Thursday and first Thursday
      var weekDiff = (targetThursday - firstThursday) / (86400000*7);
      return 1 + Math.floor(weekDiff);
    }
    
    /**
     * Get ISO-8601 numeric representation of the day of the week
     * 1 (for Monday) through 7 (for Sunday)
     * 
     * @param  {Object} `date`
     * @return {Number}
     */
    function getDayOfWeek(date) {
      var dow = date.getDay();
      if(dow === 0) {
        dow = 7;
      }
      return dow;
    }
    
    /**
     * kind-of shortcut
     * @param  {*} val
     * @return {String}
     */
    function kindOf(val) {
      if (val === null) {
        return 'null';
      }
    
      if (val === undefined) {
        return 'undefined';
      }
    
      if (typeof val !== 'object') {
        return typeof val;
      }
    
      if (Array.isArray(val)) {
        return 'array';
      }
    
      return {}.toString.call(val)
        .slice(8, -1).toLowerCase();
    };
    
    
    
      if (typeof define === 'function' && define.amd) {
        define(dateFormat);
      } else if (typeof exports === 'object') {
        module.exports = dateFormat;
      } else {
        global.dateFormat = dateFormat;
      }
    })(this);
    
  provide("dateformat", module.exports);
}(global));

// pakmanager:lodash._reescape
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  /**
     * lodash 3.0.0 (Custom Build) <https://lodash.com/>
     * Build: `lodash modern modularize exports="npm" -o ./`
     * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
     * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
     * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
     * Available under MIT license <https://lodash.com/license>
     */
    
    /** Used to match template delimiters. */
    var reEscape = /<%-([\s\S]+?)%>/g;
    
    module.exports = reEscape;
    
  provide("lodash._reescape", module.exports);
}(global));

// pakmanager:lodash._reevaluate
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  /**
     * lodash 3.0.0 (Custom Build) <https://lodash.com/>
     * Build: `lodash modern modularize exports="npm" -o ./`
     * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
     * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
     * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
     * Available under MIT license <https://lodash.com/license>
     */
    
    /** Used to match template delimiters. */
    var reEvaluate = /<%([\s\S]+?)%>/g;
    
    module.exports = reEvaluate;
    
  provide("lodash._reevaluate", module.exports);
}(global));

// pakmanager:lodash.template
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  /**
     * lodash 3.6.1 (Custom Build) <https://lodash.com/>
     * Build: `lodash modern modularize exports="npm" -o ./`
     * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
     * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
     * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
     * Available under MIT license <https://lodash.com/license>
     */
    var baseCopy = require('lodash._basecopy'),
        baseToString = require('lodash._basetostring'),
        baseValues = require('lodash._basevalues'),
        isIterateeCall = require('lodash._isiterateecall'),
        reInterpolate = require('lodash._reinterpolate'),
        keys = require('lodash.keys'),
        restParam = require('lodash.restparam'),
        templateSettings = require('lodash.templatesettings');
    
    /** `Object#toString` result references. */
    var errorTag = '[object Error]';
    
    /** Used to match empty string literals in compiled template source. */
    var reEmptyStringLeading = /\b__p \+= '';/g,
        reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
        reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;
    
    /** Used to match [ES template delimiters](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-template-literal-lexical-components). */
    var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
    
    /** Used to ensure capturing order of template delimiters. */
    var reNoMatch = /($^)/;
    
    /** Used to match unescaped characters in compiled string literals. */
    var reUnescapedString = /['\n\r\u2028\u2029\\]/g;
    
    /** Used to escape characters for inclusion in compiled string literals. */
    var stringEscapes = {
      '\\': '\\',
      "'": "'",
      '\n': 'n',
      '\r': 'r',
      '\u2028': 'u2028',
      '\u2029': 'u2029'
    };
    
    /**
     * Used by `_.template` to escape characters for inclusion in compiled
     * string literals.
     *
     * @private
     * @param {string} chr The matched character to escape.
     * @returns {string} Returns the escaped character.
     */
    function escapeStringChar(chr) {
      return '\\' + stringEscapes[chr];
    }
    
    /**
     * Checks if `value` is object-like.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
     */
    function isObjectLike(value) {
      return !!value && typeof value == 'object';
    }
    
    /** Used for native method references. */
    var objectProto = Object.prototype;
    
    /** Used to check objects for own properties. */
    var hasOwnProperty = objectProto.hasOwnProperty;
    
    /**
     * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
     * of values.
     */
    var objToString = objectProto.toString;
    
    /**
     * Used by `_.template` to customize its `_.assign` use.
     *
     * **Note:** This function is like `assignDefaults` except that it ignores
     * inherited property values when checking if a property is `undefined`.
     *
     * @private
     * @param {*} objectValue The destination object property value.
     * @param {*} sourceValue The source object property value.
     * @param {string} key The key associated with the object and source values.
     * @param {Object} object The destination object.
     * @returns {*} Returns the value to assign to the destination object.
     */
    function assignOwnDefaults(objectValue, sourceValue, key, object) {
      return (objectValue === undefined || !hasOwnProperty.call(object, key))
        ? sourceValue
        : objectValue;
    }
    
    /**
     * A specialized version of `_.assign` for customizing assigned values without
     * support for argument juggling, multiple sources, and `this` binding `customizer`
     * functions.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @param {Function} customizer The function to customize assigned values.
     * @returns {Object} Returns `object`.
     */
    function assignWith(object, source, customizer) {
      var index = -1,
          props = keys(source),
          length = props.length;
    
      while (++index < length) {
        var key = props[index],
            value = object[key],
            result = customizer(value, source[key], key, object, source);
    
        if ((result === result ? (result !== value) : (value === value)) ||
            (value === undefined && !(key in object))) {
          object[key] = result;
        }
      }
      return object;
    }
    
    /**
     * The base implementation of `_.assign` without support for argument juggling,
     * multiple sources, and `customizer` functions.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @returns {Object} Returns `object`.
     */
    function baseAssign(object, source) {
      return source == null
        ? object
        : baseCopy(source, keys(source), object);
    }
    
    /**
     * Checks if `value` is an `Error`, `EvalError`, `RangeError`, `ReferenceError`,
     * `SyntaxError`, `TypeError`, or `URIError` object.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an error object, else `false`.
     * @example
     *
     * _.isError(new Error);
     * // => true
     *
     * _.isError(Error);
     * // => false
     */
    function isError(value) {
      return isObjectLike(value) && typeof value.message == 'string' && objToString.call(value) == errorTag;
    }
    
    /**
     * Creates a compiled template function that can interpolate data properties
     * in "interpolate" delimiters, HTML-escape interpolated data properties in
     * "escape" delimiters, and execute JavaScript in "evaluate" delimiters. Data
     * properties may be accessed as free variables in the template. If a setting
     * object is provided it takes precedence over `_.templateSettings` values.
     *
     * **Note:** In the development build `_.template` utilizes
     * [sourceURLs](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl)
     * for easier debugging.
     *
     * For more information on precompiling templates see
     * [lodash's custom builds documentation](https://lodash.com/custom-builds).
     *
     * For more information on Chrome extension sandboxes see
     * [Chrome's extensions documentation](https://developer.chrome.com/extensions/sandboxingEval).
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The template string.
     * @param {Object} [options] The options object.
     * @param {RegExp} [options.escape] The HTML "escape" delimiter.
     * @param {RegExp} [options.evaluate] The "evaluate" delimiter.
     * @param {Object} [options.imports] An object to import into the template as free variables.
     * @param {RegExp} [options.interpolate] The "interpolate" delimiter.
     * @param {string} [options.sourceURL] The sourceURL of the template's compiled source.
     * @param {string} [options.variable] The data object variable name.
     * @param- {Object} [otherOptions] Enables the legacy `options` param signature.
     * @returns {Function} Returns the compiled template function.
     * @example
     *
     * // using the "interpolate" delimiter to create a compiled template
     * var compiled = _.template('hello <%= user %>!');
     * compiled({ 'user': 'fred' });
     * // => 'hello fred!'
     *
     * // using the HTML "escape" delimiter to escape data property values
     * var compiled = _.template('<b><%- value %></b>');
     * compiled({ 'value': '<script>' });
     * // => '<b>&lt;script&gt;</b>'
     *
     * // using the "evaluate" delimiter to execute JavaScript and generate HTML
     * var compiled = _.template('<% _.forEach(users, function(user) { %><li><%- user %></li><% }); %>');
     * compiled({ 'users': ['fred', 'barney'] });
     * // => '<li>fred</li><li>barney</li>'
     *
     * // using the internal `print` function in "evaluate" delimiters
     * var compiled = _.template('<% print("hello " + user); %>!');
     * compiled({ 'user': 'barney' });
     * // => 'hello barney!'
     *
     * // using the ES delimiter as an alternative to the default "interpolate" delimiter
     * var compiled = _.template('hello ${ user }!');
     * compiled({ 'user': 'pebbles' });
     * // => 'hello pebbles!'
     *
     * // using custom template delimiters
     * _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
     * var compiled = _.template('hello {{ user }}!');
     * compiled({ 'user': 'mustache' });
     * // => 'hello mustache!'
     *
     * // using backslashes to treat delimiters as plain text
     * var compiled = _.template('<%= "\\<%- value %\\>" %>');
     * compiled({ 'value': 'ignored' });
     * // => '<%- value %>'
     *
     * // using the `imports` option to import `jQuery` as `jq`
     * var text = '<% jq.each(users, function(user) { %><li><%- user %></li><% }); %>';
     * var compiled = _.template(text, { 'imports': { 'jq': jQuery } });
     * compiled({ 'users': ['fred', 'barney'] });
     * // => '<li>fred</li><li>barney</li>'
     *
     * // using the `sourceURL` option to specify a custom sourceURL for the template
     * var compiled = _.template('hello <%= user %>!', { 'sourceURL': '/basic/greeting.jst' });
     * compiled(data);
     * // => find the source of "greeting.jst" under the Sources tab or Resources panel of the web inspector
     *
     * // using the `variable` option to ensure a with-statement isn't used in the compiled template
     * var compiled = _.template('hi <%= data.user %>!', { 'variable': 'data' });
     * compiled.source;
     * // => function(data) {
     * //   var __t, __p = '';
     * //   __p += 'hi ' + ((__t = ( data.user )) == null ? '' : __t) + '!';
     * //   return __p;
     * // }
     *
     * // using the `source` property to inline compiled templates for meaningful
     * // line numbers in error messages and a stack trace
     * fs.writeFileSync(path.join(cwd, 'jst.js'), '\
     *   var JST = {\
     *     "main": ' + _.template(mainText).source + '\
     *   };\
     * ');
     */
    function template(string, options, otherOptions) {
      // Based on John Resig's `tmpl` implementation (http://ejohn.org/blog/javascript-micro-templating/)
      // and Laura Doktorova's doT.js (https://github.com/olado/doT).
      var settings = templateSettings.imports._.templateSettings || templateSettings;
    
      if (otherOptions && isIterateeCall(string, options, otherOptions)) {
        options = otherOptions = null;
      }
      string = baseToString(string);
      options = assignWith(baseAssign({}, otherOptions || options), settings, assignOwnDefaults);
    
      var imports = assignWith(baseAssign({}, options.imports), settings.imports, assignOwnDefaults),
          importsKeys = keys(imports),
          importsValues = baseValues(imports, importsKeys);
    
      var isEscaping,
          isEvaluating,
          index = 0,
          interpolate = options.interpolate || reNoMatch,
          source = "__p += '";
    
      // Compile the regexp to match each delimiter.
      var reDelimiters = RegExp(
        (options.escape || reNoMatch).source + '|' +
        interpolate.source + '|' +
        (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + '|' +
        (options.evaluate || reNoMatch).source + '|$'
      , 'g');
    
      // Use a sourceURL for easier debugging.
      var sourceURL = 'sourceURL' in options ? '//# sourceURL=' + options.sourceURL + '\n' : '';
    
      string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
        interpolateValue || (interpolateValue = esTemplateValue);
    
        // Escape characters that can't be included in string literals.
        source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);
    
        // Replace delimiters with snippets.
        if (escapeValue) {
          isEscaping = true;
          source += "' +\n__e(" + escapeValue + ") +\n'";
        }
        if (evaluateValue) {
          isEvaluating = true;
          source += "';\n" + evaluateValue + ";\n__p += '";
        }
        if (interpolateValue) {
          source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
        }
        index = offset + match.length;
    
        // The JS engine embedded in Adobe products requires returning the `match`
        // string in order to produce the correct `offset` value.
        return match;
      });
    
      source += "';\n";
    
      // If `variable` is not specified wrap a with-statement around the generated
      // code to add the data object to the top of the scope chain.
      var variable = options.variable;
      if (!variable) {
        source = 'with (obj) {\n' + source + '\n}\n';
      }
      // Cleanup code by stripping empty strings.
      source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source)
        .replace(reEmptyStringMiddle, '$1')
        .replace(reEmptyStringTrailing, '$1;');
    
      // Frame code as the function body.
      source = 'function(' + (variable || 'obj') + ') {\n' +
        (variable
          ? ''
          : 'obj || (obj = {});\n'
        ) +
        "var __t, __p = ''" +
        (isEscaping
           ? ', __e = _.escape'
           : ''
        ) +
        (isEvaluating
          ? ', __j = Array.prototype.join;\n' +
            "function print() { __p += __j.call(arguments, '') }\n"
          : ';\n'
        ) +
        source +
        'return __p\n}';
    
      var result = attempt(function() {
        return Function(importsKeys, sourceURL + 'return ' + source).apply(undefined, importsValues);
      });
    
      // Provide the compiled function's source by its `toString` method or
      // the `source` property as a convenience for inlining compiled templates.
      result.source = source;
      if (isError(result)) {
        throw result;
      }
      return result;
    }
    
    /**
     * Attempts to invoke `func`, returning either the result or the caught error
     * object. Any additional arguments are provided to `func` when it is invoked.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {Function} func The function to attempt.
     * @returns {*} Returns the `func` result or error object.
     * @example
     *
     * // avoid throwing errors for invalid selectors
     * var elements = _.attempt(function(selector) {
     *   return document.querySelectorAll(selector);
     * }, '>_>');
     *
     * if (_.isError(elements)) {
     *   elements = [];
     * }
     */
    var attempt = restParam(function(func, args) {
      try {
        return func.apply(undefined, args);
      } catch(e) {
        return isError(e) ? e : new Error(e);
      }
    });
    
    module.exports = template;
    
  provide("lodash.template", module.exports);
}(global));

// pakmanager:multipipe
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  
    /**
     * Module dependencies.
     */
    
    var duplexer = require('duplexer2');
    var Stream = require('stream');
    
    /**
     * Slice reference.
     */
    
    var slice = [].slice;
    
    /**
     * Duplexer options.
     */
    
    var opts = {
      bubbleErrors: false
    };
    
    /**
     * Expose `pipe`.
     */
    
    module.exports = pipe;
    
    /**
     * Pipe.
     *
     * @param {Stream,...,[Function]}
     * @return {Stream}
     * @api public
     */
    
    function pipe(){
      if (arguments.length == 1) return arguments[0];
      var streams = slice.call(arguments);
      var cb;
      if ('function' == typeof streams[streams.length - 1]) {
        cb = streams.splice(-1)[0];
      }
      var first = streams[0];
      var last = streams[streams.length - 1];
      var ret;
      
      if (first.writable && last.readable) ret = duplexer(opts, first, last);
      else if (first.writable) ret = first;
      else if (last.readable) ret = last;
      else ret = new Stream;
      
      streams.forEach(function(stream, i){
        var next = streams[i+1];
        if (next) stream.pipe(next);
        if (stream != ret) stream.on('error', ret.emit.bind(ret, 'error'));
      });
    
      if (cb) {
        var ended = false;
        ret.on('error', end);
        last.on('finish', end);
        function end(err){
          if (ended) return;
          ended = true;
          cb(err);
        }
      }
    
      return ret;
    }
    
    
  provide("multipipe", module.exports);
}(global));

// pakmanager:vinyl/lib/isStream
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  var Stream = require('stream').Stream;
    
    module.exports = function(o) {
      return !!o && o instanceof Stream;
    };
  provide("vinyl/lib/isStream", module.exports);
}(global));

// pakmanager:vinyl/lib/cloneBuffer
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  var Buffer = require('buffer').Buffer;
    
    module.exports = function(buf) {
      var out = new Buffer(buf.length);
      buf.copy(out);
      return out;
    };
    
  provide("vinyl/lib/cloneBuffer", module.exports);
}(global));

// pakmanager:vinyl/lib/isBuffer
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  var buf = require('buffer');
    var Buffer = buf.Buffer;
    
    // could use Buffer.isBuffer but this is the same exact thing...
    module.exports = function(o) {
      return typeof o === 'object' && o instanceof Buffer;
    };
  provide("vinyl/lib/isBuffer", module.exports);
}(global));

// pakmanager:vinyl/lib/isNull
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  module.exports = function(v) {
      return v === null;
    };
    
  provide("vinyl/lib/isNull", module.exports);
}(global));

// pakmanager:vinyl/lib/inspectStream
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  var isStream =  require('vinyl/lib/isStream');
    
    module.exports = function(stream) {
      if (!isStream(stream)) return;
    
      var streamType = stream.constructor.name;
      // avoid StreamStream
      if (streamType === 'Stream') streamType = '';
    
      return '<'+streamType+'Stream>';
    };
    
  provide("vinyl/lib/inspectStream", module.exports);
}(global));

// pakmanager:vinyl
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  var path = require('path');
    var clone = require('clone');
    var cloneStats = require('clone-stats');
    var cloneBuffer =  require('vinyl/lib/cloneBuffer');
    var isBuffer =  require('vinyl/lib/isBuffer');
    var isStream =  require('vinyl/lib/isStream');
    var isNull =  require('vinyl/lib/isNull');
    var inspectStream =  require('vinyl/lib/inspectStream');
    var Stream = require('stream');
    var replaceExt = require('replace-ext');
    
    function File(file) {
      if (!file) file = {};
    
      // record path change
      var history = file.path ? [file.path] : file.history;
      this.history = history || [];
    
      // TODO: should this be moved to vinyl-fs?
      this.cwd = file.cwd || process.cwd();
      this.base = file.base || this.cwd;
    
      // stat = fs stats object
      // TODO: should this be moved to vinyl-fs?
      this.stat = file.stat || null;
    
      // contents = stream, buffer, or null if not read
      this.contents = file.contents || null;
    }
    
    File.prototype.isBuffer = function() {
      return isBuffer(this.contents);
    };
    
    File.prototype.isStream = function() {
      return isStream(this.contents);
    };
    
    File.prototype.isNull = function() {
      return isNull(this.contents);
    };
    
    // TODO: should this be moved to vinyl-fs?
    File.prototype.isDirectory = function() {
      return this.isNull() && this.stat && this.stat.isDirectory();
    };
    
    File.prototype.clone = function(opt) {
      if (typeof opt === 'boolean') {
        opt = {
          deep: opt,
          contents: true
        };
      } else if (!opt) {
        opt = {
          deep: false,
          contents: true
        };
      } else {
        opt.deep = opt.deep === true;
        opt.contents = opt.contents !== false;
      }
    
      // clone our file contents
      var contents;
      if (this.isStream()) {
        contents = this.contents.pipe(new Stream.PassThrough());
        this.contents = this.contents.pipe(new Stream.PassThrough());
      } else if (this.isBuffer()) {
        contents = opt.contents ? cloneBuffer(this.contents) : this.contents;
      }
    
      var file = new File({
        cwd: this.cwd,
        base: this.base,
        stat: (this.stat ? cloneStats(this.stat) : null),
        history: this.history.slice(),
        contents: contents
      });
    
      // clone our custom properties
      Object.keys(this).forEach(function(key) {
        // ignore built-in fields
        if (key === '_contents' || key === 'stat' ||
          key === 'history' || key === 'path' ||
          key === 'base' || key === 'cwd') {
          return;
        }
        file[key] = opt.deep ? clone(this[key], true) : this[key];
      }, this);
      return file;
    };
    
    File.prototype.pipe = function(stream, opt) {
      if (!opt) opt = {};
      if (typeof opt.end === 'undefined') opt.end = true;
    
      if (this.isStream()) {
        return this.contents.pipe(stream, opt);
      }
      if (this.isBuffer()) {
        if (opt.end) {
          stream.end(this.contents);
        } else {
          stream.write(this.contents);
        }
        return stream;
      }
    
      // isNull
      if (opt.end) stream.end();
      return stream;
    };
    
    File.prototype.inspect = function() {
      var inspect = [];
    
      // use relative path if possible
      var filePath = (this.base && this.path) ? this.relative : this.path;
    
      if (filePath) {
        inspect.push('"'+filePath+'"');
      }
    
      if (this.isBuffer()) {
        inspect.push(this.contents.inspect());
      }
    
      if (this.isStream()) {
        inspect.push(inspectStream(this.contents));
      }
    
      return '<File '+inspect.join(' ')+'>';
    };
    
    // virtual attributes
    // or stuff with extra logic
    Object.defineProperty(File.prototype, 'contents', {
      get: function() {
        return this._contents;
      },
      set: function(val) {
        if (!isBuffer(val) && !isStream(val) && !isNull(val)) {
          throw new Error('File.contents can only be a Buffer, a Stream, or null.');
        }
        this._contents = val;
      }
    });
    
    // TODO: should this be moved to vinyl-fs?
    Object.defineProperty(File.prototype, 'relative', {
      get: function() {
        if (!this.base) throw new Error('No base specified! Can not get relative.');
        if (!this.path) throw new Error('No path specified! Can not get relative.');
        return path.relative(this.base, this.path);
      },
      set: function() {
        throw new Error('File.relative is generated from the base and path attributes. Do not modify it.');
      }
    });
    
    Object.defineProperty(File.prototype, 'dirname', {
      get: function() {
        if (!this.path) throw new Error('No path specified! Can not get dirname.');
        return path.dirname(this.path);
      },
      set: function(dirname) {
        if (!this.path) throw new Error('No path specified! Can not set dirname.');
        this.path = path.join(dirname, path.basename(this.path));
      }
    });
    
    Object.defineProperty(File.prototype, 'basename', {
      get: function() {
        if (!this.path) throw new Error('No path specified! Can not get basename.');
        return path.basename(this.path);
      },
      set: function(basename) {
        if (!this.path) throw new Error('No path specified! Can not set basename.');
        this.path = path.join(path.dirname(this.path), basename);
      }
    });
    
    Object.defineProperty(File.prototype, 'extname', {
      get: function() {
        if (!this.path) throw new Error('No path specified! Can not get extname.');
        return path.extname(this.path);
      },
      set: function(extname) {
        if (!this.path) throw new Error('No path specified! Can not set extname.');
        this.path = replaceExt(this.path, extname);
      }
    });
    
    Object.defineProperty(File.prototype, 'path', {
      get: function() {
        return this.history[this.history.length - 1];
      },
      set: function(path) {
        if (typeof path !== 'string') throw new Error('path should be string');
    
        // record history only when path changed
        if (path && path !== this.path) {
          this.history.push(path);
        }
      }
    });
    
    module.exports = File;
    
  provide("vinyl", module.exports);
}(global));

// pakmanager:extend
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  var hasOwn = Object.prototype.hasOwnProperty;
    var toStr = Object.prototype.toString;
    var undefined;
    
    var isArray = function isArray(arr) {
    	if (typeof Array.isArray === 'function') {
    		return Array.isArray(arr);
    	}
    
    	return toStr.call(arr) === '[object Array]';
    };
    
    var isPlainObject = function isPlainObject(obj) {
    	'use strict';
    	if (!obj || toStr.call(obj) !== '[object Object]') {
    		return false;
    	}
    
    	var has_own_constructor = hasOwn.call(obj, 'constructor');
    	var has_is_property_of_method = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
    	// Not own constructor property must be Object
    	if (obj.constructor && !has_own_constructor && !has_is_property_of_method) {
    		return false;
    	}
    
    	// Own properties are enumerated firstly, so to speed up,
    	// if last one is own, then all properties are own.
    	var key;
    	for (key in obj) {}
    
    	return key === undefined || hasOwn.call(obj, key);
    };
    
    module.exports = function extend() {
    	'use strict';
    	var options, name, src, copy, copyIsArray, clone,
    		target = arguments[0],
    		i = 1,
    		length = arguments.length,
    		deep = false;
    
    	// Handle a deep copy situation
    	if (typeof target === 'boolean') {
    		deep = target;
    		target = arguments[1] || {};
    		// skip the boolean and the target
    		i = 2;
    	} else if ((typeof target !== 'object' && typeof target !== 'function') || target == null) {
    		target = {};
    	}
    
    	for (; i < length; ++i) {
    		options = arguments[i];
    		// Only deal with non-null/undefined values
    		if (options != null) {
    			// Extend the base object
    			for (name in options) {
    				src = target[name];
    				copy = options[name];
    
    				// Prevent never-ending loop
    				if (target === copy) {
    					continue;
    				}
    
    				// Recurse if we're merging plain objects or arrays
    				if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
    					if (copyIsArray) {
    						copyIsArray = false;
    						clone = src && isArray(src) ? src : [];
    					} else {
    						clone = src && isPlainObject(src) ? src : {};
    					}
    
    					// Never move original objects, clone them
    					target[name] = extend(deep, clone, copy);
    
    				// Don't bring in undefined values
    				} else if (copy !== undefined) {
    					target[name] = copy;
    				}
    			}
    		}
    	}
    
    	// Return the modified object
    	return target;
    };
    
    
  provide("extend", module.exports);
}(global));

// pakmanager:findup-sync
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  /*
     * findup-sync
     * https://github.com/cowboy/node-findup-sync
     *
     * Copyright (c) 2013 "Cowboy" Ben Alman
     * Licensed under the MIT license.
     */
    
    'use strict';
    
    // Nodejs libs.
    var path = require('path');
    
    // External libs.
    var glob = require('glob');
    
    // Search for a filename in the given directory or all parent directories.
    module.exports = function(patterns, options) {
      // Normalize patterns to an array.
      if (!Array.isArray(patterns)) { patterns = [patterns]; }
      // Create globOptions so that it can be modified without mutating the
      // original object.
      var globOptions = Object.create(options || {});
      globOptions.maxDepth = 1;
      globOptions.cwd = path.resolve(globOptions.cwd || '.');
    
      var files, lastpath;
      do {
        // Search for files matching patterns.
        files = patterns.map(function(pattern) {
          return glob.sync(pattern, globOptions);
        }).reduce(function(a, b) {
          return a.concat(b);
        }).filter(function(entry, index, arr) {
          return index === arr.indexOf(entry);
        });
        // Return file if found.
        if (files.length > 0) {
          return path.resolve(path.join(globOptions.cwd, files[0]));
        }
        // Go up a directory.
        lastpath = globOptions.cwd;
        globOptions.cwd = path.resolve(globOptions.cwd, '..');
      // If parentpath is the same as basedir, we can't go any higher.
      } while (globOptions.cwd !== lastpath);
    
      // No files were found!
      return null;
    };
    
  provide("findup-sync", module.exports);
}(global));

// pakmanager:flagged-respawn/lib/reorder
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  module.exports = function (flags, argv) {
      if (!argv) {
        argv = process.argv;
      }
      var args = [argv[1]];
      argv.slice(2).forEach(function (arg) {
        var flag = arg.split('=')[0];
        if (flags.indexOf(flag) !== -1) {
          args.unshift(flag);
        } else {
          args.push(arg);
        }
      });
      args.unshift(argv[0]);
      return args;
    };
    
  provide("flagged-respawn/lib/reorder", module.exports);
}(global));

// pakmanager:flagged-respawn/lib/respawn
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  const spawn = require('child_process').spawn;
    
    module.exports = function (argv) {
      var child = spawn(argv[0], argv.slice(1), { stdio: 'inherit' });
      child.on('exit', function (code, signal) {
        process.on('exit', function () {
          if (signal) {
            process.kill(process.pid, signal);
          } else {
            process.exit(code);
          }
        });
      });
      return child;
    };
    
  provide("flagged-respawn/lib/respawn", module.exports);
}(global));

// pakmanager:flagged-respawn
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  const reorder =  require('flagged-respawn/lib/reorder');
    const respawn =  require('flagged-respawn/lib/respawn');
    
    module.exports = function (flags, argv, execute) {
      if (!flags) {
        throw new Error('You must specify flags to respawn with.');
      }
      if (!argv) {
        throw new Error('You must specify an argv array.');
      }
      var proc = process;
      var reordered = reorder(flags, argv);
      var ready = JSON.stringify(argv) === JSON.stringify(reordered);
      if (!ready) {
        proc = respawn(reordered);
      }
      execute(ready, proc);
    };
    
  provide("flagged-respawn", module.exports);
}(global));

// pakmanager:rechoir/lib/extension
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  const path = require('path');
    
    const EXTRE = /^[.]?[^.]+([.].*)$/;
    
    module.exports = function (input) {
      var extension = EXTRE.exec(path.basename(input));
      if (!extension) {
        return;
      }
      return extension[1];
    };
    
  provide("rechoir/lib/extension", module.exports);
}(global));

// pakmanager:rechoir/lib/normalize
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  function normalizer (config) {
      if (typeof config === 'string') {
        return {
          module: config
        }
      }
      return config;
    };
    
    module.exports = function (config) {
      if (Array.isArray(config)) {
        return config.map(normalizer);
      }
      return normalizer(config);
    };
    
  provide("rechoir/lib/normalize", module.exports);
}(global));

// pakmanager:rechoir/lib/register
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  const path = require('path');
    const resolve = require('resolve');
    
    module.exports = function (cwd, moduleName, register) {
      try {
        var modulePath = resolve.sync(moduleName, {basedir: cwd});
        var result = require(modulePath);
        if (typeof register === 'function') {
          register(result);
        }
      } catch (e) {
        result = e;
      }
      return result;
    };
    
  provide("rechoir/lib/register", module.exports);
}(global));

// pakmanager:rechoir
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  const path = require('path');
    
    const extension =  require('rechoir/lib/extension');
    const normalize =  require('rechoir/lib/normalize');
    const register =  require('rechoir/lib/register');
    
    exports.prepare = function (extensions, filepath, cwd, nothrow) {
      var option, attempt;
      var attempts = [];
      var err;
      var onlyErrors = false;
      var ext = extension(filepath);
      if (Object.keys(require.extensions).indexOf(ext) !== -1) {
        return true;
      }
      var config = normalize(extensions[ext]);
      if (!config) {
        throw new Error('No module loader found for "'+ext+'".');
      }
      if (!cwd) {
        cwd = path.dirname(path.resolve(filepath));
      }
      if (!Array.isArray(config)) {
        config = [config];
      }
      for (var i in config) {
        option = config[i];
        attempt = register(cwd, option.module, option.register);
        error = (attempt instanceof Error) ? attempt : null;
        if (error) {
          attempt = null;
        }
        attempts.push({
          moduleName: option.module,
          module: attempt,
          error: error
        });
        if (!error) {
          onlyErrors = false;
          break;
        } else {
          onlyErrors = true;
        }
      }
      if (onlyErrors) {
        err = new Error('Unable to use specified module loaders for "'+ext+'".');
        err.failures = attempts;
        if (nothrow) {
          return err;
        } else {
          throw err;
        }
      }
      return attempts;
    };
    
  provide("rechoir", module.exports);
}(global));

// pakmanager:sequencify
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  /*jshint node:true */
    
    "use strict";
    
    var sequence = function (tasks, names, results, nest) {
    	var i, name, node, e, j;
    	nest = nest || [];
    	for (i = 0; i < names.length; i++) {
    		name = names[i];
    		// de-dup results
    		if (results.indexOf(name) === -1) {
    			node = tasks[name];
    			if (!node) {
    				e = new Error('task "'+name+'" is not defined');
    				e.missingTask = name;
    				e.taskList = [];
    				for (j in tasks) {
    					if (tasks.hasOwnProperty(j)) {
    						e.taskList.push(tasks[j].name);
    					}
    				}
    				throw e;
    			}
    			if (nest.indexOf(name) > -1) {
    				nest.push(name);
    				e = new Error('Recursive dependencies detected: '+nest.join(' -> '));
    				e.recursiveTasks = nest;
    				e.taskList = [];
    				for (j in tasks) {
    					if (tasks.hasOwnProperty(j)) {
    						e.taskList.push(tasks[j].name);
    					}
    				}
    				throw e;
    			}
    			if (node.dep.length) {
    				nest.push(name);
    				sequence(tasks, node.dep, results, nest); // recurse
    				nest.pop(name);
    			}
    			results.push(name);
    		}
    	}
    };
    
    module.exports = sequence;
    
  provide("sequencify", module.exports);
}(global));

// pakmanager:stream-consume
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  module.exports = function(stream) {
        if (stream.readable && typeof stream.resume === 'function') {
            var state = stream._readableState;
            if (!state || state.pipesCount === 0) {
                // Either a classic stream or streams2 that's not piped to another destination
                try {
                    stream.resume();
                } catch (err) {
                    console.error("Got error: " + err);
                    // If we can't, it's not worth dying over
                }
            }
        }
    };
    
  provide("stream-consume", module.exports);
}(global));

// pakmanager:user-home
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  'use strict';
    module.exports = require('os-homedir')();
    
  provide("user-home", module.exports);
}(global));

// pakmanager:duplexify
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  var stream = require('readable-stream')
    var eos = require('end-of-stream')
    var util = require('util')
    
    var SIGNAL_FLUSH = new Buffer([0])
    
    var onuncork = function(self, fn) {
      if (self._corked) self.once('uncork', fn)
      else fn()
    }
    
    var destroyer = function(self, end) {
      return function(err) {
        if (err) self.destroy(err.message === 'premature close' ? null : err)
        else if (end && !self._ended) self.end()
      }
    }
    
    var end = function(ws, fn) {
      if (!ws) return fn()
      if (ws._writableState && ws._writableState.finished) return fn()
      if (ws._writableState) return ws.end(fn)
      ws.end()
      fn()
    }
    
    var toStreams2 = function(rs) {
      return new (stream.Readable)({objectMode:true, highWaterMark:16}).wrap(rs)
    }
    
    var Duplexify = function(writable, readable, opts) {
      if (!(this instanceof Duplexify)) return new Duplexify(writable, readable, opts)
      stream.Duplex.call(this, opts)
    
      this._writable = null
      this._readable = null
      this._readable2 = null
    
      this._forwardDestroy = !opts || opts.destroy !== false
      this._forwardEnd = !opts || opts.end !== false
      this._corked = 1 // start corked
      this._ondrain = null
      this._drained = false
      this._forwarding = false
      this._unwrite = null
      this._unread = null
      this._ended = false
    
      this.destroyed = false
    
      if (writable) this.setWritable(writable)
      if (readable) this.setReadable(readable)
    }
    
    util.inherits(Duplexify, stream.Duplex)
    
    Duplexify.obj = function(writable, readable, opts) {
      if (!opts) opts = {}
      opts.objectMode = true
      opts.highWaterMark = 16
      return new Duplexify(writable, readable, opts)
    }
    
    Duplexify.prototype.cork = function() {
      if (++this._corked === 1) this.emit('cork')
    }
    
    Duplexify.prototype.uncork = function() {
      if (this._corked && --this._corked === 0) this.emit('uncork')
    }
    
    Duplexify.prototype.setWritable = function(writable) {
      if (this._unwrite) this._unwrite()
    
      if (this.destroyed) {
        if (writable && writable.destroy) writable.destroy()
        return
      }
    
      if (writable === null || writable === false) {
        this.end()
        return
      }
    
      var self = this
      var unend = eos(writable, {writable:true, readable:false}, destroyer(this, this._forwardEnd))
    
      var ondrain = function() {
        var ondrain = self._ondrain
        self._ondrain = null
        if (ondrain) ondrain()
      }
    
      var clear = function() {
        self._writable.removeListener('drain', ondrain)
        unend()
      }
    
      if (this._unwrite) process.nextTick(ondrain) // force a drain on stream reset to avoid livelocks
    
      this._writable = writable
      this._writable.on('drain', ondrain)
      this._unwrite = clear
    
      this.uncork() // always uncork setWritable
    }
    
    Duplexify.prototype.setReadable = function(readable) {
      if (this._unread) this._unread()
    
      if (this.destroyed) {
        if (readable && readable.destroy) readable.destroy()
        return
      }
    
      if (readable === null || readable === false) {
        this.push(null)
        this.resume()
        return
      }
    
      var self = this
      var unend = eos(readable, {writable:false, readable:true}, destroyer(this))
    
      var onreadable = function() {
        self._forward()
      }
    
      var onend = function() {
        self.push(null)
      }
    
      var clear = function() {
        self._readable2.removeListener('readable', onreadable)
        self._readable2.removeListener('end', onend)
        unend()
      }
    
      this._drained = true
      this._readable = readable
      this._readable2 = readable._readableState ? readable : toStreams2(readable)
      this._readable2.on('readable', onreadable)
      this._readable2.on('end', onend)
      this._unread = clear
    
      this._forward()
    }
    
    Duplexify.prototype._read = function() {
      this._drained = true
      this._forward()
    }
    
    Duplexify.prototype._forward = function() {
      if (this._forwarding || !this._readable2 || !this._drained) return
      this._forwarding = true
    
      var data
      var state = this._readable2._readableState
    
      while ((data = this._readable2.read(state.buffer.length ? state.buffer[0].length : state.length)) !== null) {
        this._drained = this.push(data)
      }
    
      this._forwarding = false
    }
    
    Duplexify.prototype.destroy = function(err) {
      if (this.destroyed) return
      this.destroyed = true
    
      var self = this
      process.nextTick(function() {
        self._destroy(err)
      })
    }
    
    Duplexify.prototype._destroy = function(err) {
      if (err) {
        var ondrain = this._ondrain
        this._ondrain = null
        if (ondrain) ondrain(err)
        else this.emit('error', err)
      }
    
      if (this._forwardDestroy) {
        if (this._readable && this._readable.destroy) this._readable.destroy()
        if (this._writable && this._writable.destroy) this._writable.destroy()
      }
    
      this.emit('close')
    }
    
    Duplexify.prototype._write = function(data, enc, cb) {
      if (this.destroyed) return cb()
      if (this._corked) return onuncork(this, this._write.bind(this, data, enc, cb))
      if (data === SIGNAL_FLUSH) return this._finish(cb)
      if (!this._writable) return cb()
    
      if (this._writable.write(data) === false) this._ondrain = cb
      else cb()
    }
    
    
    Duplexify.prototype._finish = function(cb) {
      var self = this
      this.emit('preend')
      onuncork(this, function() {
        end(self._forwardEnd && self._writable, function() {
          // haxx to not emit prefinish twice
          if (self._writableState.prefinished === false) self._writableState.prefinished = true
          self.emit('prefinish')
          onuncork(self, cb)
        })
      })
    }
    
    Duplexify.prototype.end = function(data, enc, cb) {
      if (typeof data === 'function') return this.end(null, null, data)
      if (typeof enc === 'function') return this.end(data, null, enc)
      this._ended = true
      if (data) this.write(data)
      if (!this._writableState.ending) this.write(SIGNAL_FLUSH)
      return stream.Writable.prototype.end.call(this, cb)
    }
    
    module.exports = Duplexify
  provide("duplexify", module.exports);
}(global));

// pakmanager:glob-stream
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  /*jslint node: true */
    
    'use strict';
    
    var through2 = require('through2');
    var Combine = require('ordered-read-streams');
    var unique = require('unique-stream');
    
    var glob = require('glob');
    var Minimatch = require('minimatch').Minimatch;
    var glob2base = require('glob2base');
    var path = require('path');
    
    var gs = {
      // creates a stream for a single glob or filter
      createStream: function(ourGlob, negatives, opt) {
        // remove path relativity to make globs make sense
        ourGlob = unrelative(opt.cwd, ourGlob);
    
        // create globbing stuff
        var globber = new glob.Glob(ourGlob, opt);
    
        // extract base path from glob
        var basePath = opt.base || glob2base(globber);
    
        // create stream and map events from globber to it
        var stream = through2.obj(negatives.length ? filterNegatives : undefined);
    
        var found = false;
    
        globber.on('error', stream.emit.bind(stream, 'error'));
        globber.on('end', function(){
          if (opt.allowEmpty !== true && !found && globIsSingular(globber)) {
            stream.emit('error', new Error('File not found with singular glob'));
          }
    
          stream.end();
        });
        globber.on('match', function(filename) {
          found = true;
    
          stream.write({
            cwd: opt.cwd,
            base: basePath,
            path: path.resolve(opt.cwd, filename)
          });
        });
    
        return stream;
    
        function filterNegatives(filename, enc, cb) {
          var matcha = isMatch.bind(null, filename);
          if (negatives.every(matcha)) {
            cb(null, filename); // pass
          } else {
            cb(); // ignore
          }
        }
      },
    
      // creates a stream for multiple globs or filters
      create: function(globs, opt) {
        if (!opt) opt = {};
        if (typeof opt.cwd !== 'string') opt.cwd = process.cwd();
        if (typeof opt.dot !== 'boolean') opt.dot = false;
        if (typeof opt.silent !== 'boolean') opt.silent = true;
        if (typeof opt.nonull !== 'boolean') opt.nonull = false;
        if (typeof opt.cwdbase !== 'boolean') opt.cwdbase = false;
        if (opt.cwdbase) opt.base = opt.cwd;
    
        // only one glob no need to aggregate
        if (!Array.isArray(globs)) globs = [globs];
    
        var positives = [];
        var negatives = [];
    
        globs.forEach(function(glob, index) {
          if (typeof glob !== 'string' && !(glob instanceof RegExp)) {
            throw new Error('Invalid glob at index ' + index);
          }
    
          var globArray = isNegative(glob) ? negatives : positives;
    
          // create Minimatch instances for negative glob patterns
          if (globArray === negatives && typeof glob === 'string') {
            glob = new Minimatch(unrelative(opt.cwd, glob), opt);
          }
    
          globArray.push({
            index: index,
            glob: glob
          });
        });
    
        if (positives.length === 0) throw new Error('Missing positive glob');
    
        // only one positive glob no need to aggregate
        if (positives.length === 1) return streamFromPositive(positives[0]);
    
        // create all individual streams
        var streams = positives.map(streamFromPositive);
    
        // then just pipe them to a single unique stream and return it
        var aggregate = new Combine(streams);
        var uniqueStream = unique('path');
        var returnStream = aggregate.pipe(uniqueStream);
    
        aggregate.on('error', function (err) {
          returnStream.emit('error', err);
        });
    
        return returnStream;
    
        function streamFromPositive(positive) {
          var negativeGlobs = negatives.filter(indexGreaterThan(positive.index)).map(toGlob);
          return gs.createStream(positive.glob, negativeGlobs, opt);
        }
      }
    };
    
    function isMatch(file, matcher) {
      if (matcher instanceof Minimatch) return matcher.match(file.path);
      if (matcher instanceof RegExp) return matcher.test(file.path);
    }
    
    function isNegative(pattern) {
      if (typeof pattern === 'string') return pattern[0] === '!';
      if (pattern instanceof RegExp) return true;
    }
    
    function unrelative(cwd, glob) {
      var mod = '';
      if (glob[0] === '!') {
        mod = glob[0];
        glob = glob.slice(1);
      }
      return mod+path.resolve(cwd, glob);
    }
    
    function indexGreaterThan(index) {
      return function(obj) {
        return obj.index > index;
      };
    }
    
    function toGlob(obj) {
      return obj.glob;
    }
    
    function globIsSingular(glob) {
      var globSet = glob.minimatch.set;
    
      if (globSet.length !== 1) {
        return false;
      }
    
      return globSet[0].every(function isString(value) {
        return typeof value === 'string';
      });
    }
    
    module.exports = gs;
    
  provide("glob-stream", module.exports);
}(global));

// pakmanager:glob-watcher
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  var gaze = require('gaze');
    var EventEmitter = require('events').EventEmitter;
    
    function onWatch(out, cb){
      return function(err, rwatcher){
        if (err) out.emit('error', err);
        rwatcher.on('all', function(evt, path, old){
          var outEvt = {type: evt, path: path};
          if(old) outEvt.old = old;
          out.emit('change', outEvt);
          if(cb) cb();
        });
      }
    }
    
    module.exports = function(glob, opts, cb) {
      var out = new EventEmitter();
    
      if (typeof opts === 'function') {
        cb = opts;
        opts = {};
      }
    
      var watcher = gaze(glob, opts, onWatch(out, cb));
    
      watcher.on('end', out.emit.bind(out, 'end'));
      watcher.on('error', out.emit.bind(out, 'error'));
      watcher.on('ready', out.emit.bind(out, 'ready'));
      watcher.on('nomatch', out.emit.bind(out, 'nomatch'));
    
      out.end = function(){
        return watcher.close();
      };
      out.add = function(glob, cb){
        return watcher.add(glob, onWatch(out, cb));
      };
      out.remove = function(glob){
        return watcher.remove(glob);
      };
      out._watcher = watcher;
    
      return out;
    };
    
  provide("glob-watcher", module.exports);
}(global));

// pakmanager:graceful-fs/fs.js
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  // eeeeeevvvvviiiiiiillllll
    // more evil than monkey-patching the native builtin?
    // Not sure.
    
    var mod = require("module")
    var pre = '(function (exports, require, module, __filename, __dirname) { '
    var post = '});'
    var src = pre + process.binding('natives').fs + post
    var vm = require('vm')
    var fn = vm.runInThisContext(src)
    fn(exports, require, module, __filename, __dirname)
    
  provide("graceful-fs/fs.js", module.exports);
}(global));

// pakmanager:graceful-fs/polyfills.js
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  var fs =  require('graceful-fs/fs.js')
    var constants = require('constants')
    
    var origCwd = process.cwd
    var cwd = null
    process.cwd = function() {
      if (!cwd)
        cwd = origCwd.call(process)
      return cwd
    }
    var chdir = process.chdir
    process.chdir = function(d) {
      cwd = null
      chdir.call(process, d)
    }
    
    // (re-)implement some things that are known busted or missing.
    
    // lchmod, broken prior to 0.6.2
    // back-port the fix here.
    if (constants.hasOwnProperty('O_SYMLINK') &&
        process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)) {
      fs.lchmod = function (path, mode, callback) {
        callback = callback || noop
        fs.open( path
               , constants.O_WRONLY | constants.O_SYMLINK
               , mode
               , function (err, fd) {
          if (err) {
            callback(err)
            return
          }
          // prefer to return the chmod error, if one occurs,
          // but still try to close, and report closing errors if they occur.
          fs.fchmod(fd, mode, function (err) {
            fs.close(fd, function(err2) {
              callback(err || err2)
            })
          })
        })
      }
    
      fs.lchmodSync = function (path, mode) {
        var fd = fs.openSync(path, constants.O_WRONLY | constants.O_SYMLINK, mode)
    
        // prefer to return the chmod error, if one occurs,
        // but still try to close, and report closing errors if they occur.
        var err, err2
        try {
          var ret = fs.fchmodSync(fd, mode)
        } catch (er) {
          err = er
        }
        try {
          fs.closeSync(fd)
        } catch (er) {
          err2 = er
        }
        if (err || err2) throw (err || err2)
        return ret
      }
    }
    
    
    // lutimes implementation, or no-op
    if (!fs.lutimes) {
      if (constants.hasOwnProperty("O_SYMLINK")) {
        fs.lutimes = function (path, at, mt, cb) {
          fs.open(path, constants.O_SYMLINK, function (er, fd) {
            cb = cb || noop
            if (er) return cb(er)
            fs.futimes(fd, at, mt, function (er) {
              fs.close(fd, function (er2) {
                return cb(er || er2)
              })
            })
          })
        }
    
        fs.lutimesSync = function (path, at, mt) {
          var fd = fs.openSync(path, constants.O_SYMLINK)
            , err
            , err2
            , ret
    
          try {
            var ret = fs.futimesSync(fd, at, mt)
          } catch (er) {
            err = er
          }
          try {
            fs.closeSync(fd)
          } catch (er) {
            err2 = er
          }
          if (err || err2) throw (err || err2)
          return ret
        }
    
      } else if (fs.utimensat && constants.hasOwnProperty("AT_SYMLINK_NOFOLLOW")) {
        // maybe utimensat will be bound soonish?
        fs.lutimes = function (path, at, mt, cb) {
          fs.utimensat(path, at, mt, constants.AT_SYMLINK_NOFOLLOW, cb)
        }
    
        fs.lutimesSync = function (path, at, mt) {
          return fs.utimensatSync(path, at, mt, constants.AT_SYMLINK_NOFOLLOW)
        }
    
      } else {
        fs.lutimes = function (_a, _b, _c, cb) { process.nextTick(cb) }
        fs.lutimesSync = function () {}
      }
    }
    
    
    // https://github.com/isaacs/node-graceful-fs/issues/4
    // Chown should not fail on einval or eperm if non-root.
    // It should not fail on enosys ever, as this just indicates
    // that a fs doesn't support the intended operation.
    
    fs.chown = chownFix(fs.chown)
    fs.fchown = chownFix(fs.fchown)
    fs.lchown = chownFix(fs.lchown)
    
    fs.chmod = chownFix(fs.chmod)
    fs.fchmod = chownFix(fs.fchmod)
    fs.lchmod = chownFix(fs.lchmod)
    
    fs.chownSync = chownFixSync(fs.chownSync)
    fs.fchownSync = chownFixSync(fs.fchownSync)
    fs.lchownSync = chownFixSync(fs.lchownSync)
    
    fs.chmodSync = chownFix(fs.chmodSync)
    fs.fchmodSync = chownFix(fs.fchmodSync)
    fs.lchmodSync = chownFix(fs.lchmodSync)
    
    function chownFix (orig) {
      if (!orig) return orig
      return function (target, uid, gid, cb) {
        return orig.call(fs, target, uid, gid, function (er, res) {
          if (chownErOk(er)) er = null
          cb(er, res)
        })
      }
    }
    
    function chownFixSync (orig) {
      if (!orig) return orig
      return function (target, uid, gid) {
        try {
          return orig.call(fs, target, uid, gid)
        } catch (er) {
          if (!chownErOk(er)) throw er
        }
      }
    }
    
    // ENOSYS means that the fs doesn't support the op. Just ignore
    // that, because it doesn't matter.
    //
    // if there's no getuid, or if getuid() is something other
    // than 0, and the error is EINVAL or EPERM, then just ignore
    // it.
    //
    // This specific case is a silent failure in cp, install, tar,
    // and most other unix tools that manage permissions.
    //
    // When running as root, or if other types of errors are
    // encountered, then it's strict.
    function chownErOk (er) {
      if (!er)
        return true
    
      if (er.code === "ENOSYS")
        return true
    
      var nonroot = !process.getuid || process.getuid() !== 0
      if (nonroot) {
        if (er.code === "EINVAL" || er.code === "EPERM")
          return true
      }
    
      return false
    }
    
    
    // if lchmod/lchown do not exist, then make them no-ops
    if (!fs.lchmod) {
      fs.lchmod = function (path, mode, cb) {
        process.nextTick(cb)
      }
      fs.lchmodSync = function () {}
    }
    if (!fs.lchown) {
      fs.lchown = function (path, uid, gid, cb) {
        process.nextTick(cb)
      }
      fs.lchownSync = function () {}
    }
    
    
    
    // on Windows, A/V software can lock the directory, causing this
    // to fail with an EACCES or EPERM if the directory contains newly
    // created files.  Try again on failure, for up to 1 second.
    if (process.platform === "win32") {
      var rename_ = fs.rename
      fs.rename = function rename (from, to, cb) {
        var start = Date.now()
        rename_(from, to, function CB (er) {
          if (er
              && (er.code === "EACCES" || er.code === "EPERM")
              && Date.now() - start < 1000) {
            return rename_(from, to, CB)
          }
          if(cb) cb(er)
        })
      }
    }
    
    
    // if read() returns EAGAIN, then just try it again.
    var read = fs.read
    fs.read = function (fd, buffer, offset, length, position, callback_) {
      var callback
      if (callback_ && typeof callback_ === 'function') {
        var eagCounter = 0
        callback = function (er, _, __) {
          if (er && er.code === 'EAGAIN' && eagCounter < 10) {
            eagCounter ++
            return read.call(fs, fd, buffer, offset, length, position, callback)
          }
          callback_.apply(this, arguments)
        }
      }
      return read.call(fs, fd, buffer, offset, length, position, callback)
    }
    
    var readSync = fs.readSync
    fs.readSync = function (fd, buffer, offset, length, position) {
      var eagCounter = 0
      while (true) {
        try {
          return readSync.call(fs, fd, buffer, offset, length, position)
        } catch (er) {
          if (er.code === 'EAGAIN' && eagCounter < 10) {
            eagCounter ++
            continue
          }
          throw er
        }
      }
    }
    
    
  provide("graceful-fs/polyfills.js", module.exports);
}(global));

// pakmanager:graceful-fs
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  // Monkey-patching the fs module.
    // It's ugly, but there is simply no other way to do this.
    var fs = module.exports =  require('graceful-fs/fs.js')
    
    var assert = require('assert')
    
    // fix up some busted stuff, mostly on windows and old nodes
     require('graceful-fs/polyfills.js')
    
    var util = require('util')
    
    function noop () {}
    
    var debug = noop
    if (util.debuglog)
      debug = util.debuglog('gfs')
    else if (/\bgfs\b/i.test(process.env.NODE_DEBUG || ''))
      debug = function() {
        var m = util.format.apply(util, arguments)
        m = 'GFS: ' + m.split(/\n/).join('\nGFS: ')
        console.error(m)
      }
    
    if (/\bgfs\b/i.test(process.env.NODE_DEBUG || '')) {
      process.on('exit', function() {
        debug('fds', fds)
        debug(queue)
        assert.equal(queue.length, 0)
      })
    }
    
    
    var originalOpen = fs.open
    fs.open = open
    
    function open(path, flags, mode, cb) {
      if (typeof mode === "function") cb = mode, mode = null
      if (typeof cb !== "function") cb = noop
      new OpenReq(path, flags, mode, cb)
    }
    
    function OpenReq(path, flags, mode, cb) {
      this.path = path
      this.flags = flags
      this.mode = mode
      this.cb = cb
      Req.call(this)
    }
    
    util.inherits(OpenReq, Req)
    
    OpenReq.prototype.process = function() {
      originalOpen.call(fs, this.path, this.flags, this.mode, this.done)
    }
    
    var fds = {}
    OpenReq.prototype.done = function(er, fd) {
      debug('open done', er, fd)
      if (fd)
        fds['fd' + fd] = this.path
      Req.prototype.done.call(this, er, fd)
    }
    
    
    var originalReaddir = fs.readdir
    fs.readdir = readdir
    
    function readdir(path, cb) {
      if (typeof cb !== "function") cb = noop
      new ReaddirReq(path, cb)
    }
    
    function ReaddirReq(path, cb) {
      this.path = path
      this.cb = cb
      Req.call(this)
    }
    
    util.inherits(ReaddirReq, Req)
    
    ReaddirReq.prototype.process = function() {
      originalReaddir.call(fs, this.path, this.done)
    }
    
    ReaddirReq.prototype.done = function(er, files) {
      if (files && files.sort)
        files = files.sort()
      Req.prototype.done.call(this, er, files)
      onclose()
    }
    
    
    var originalClose = fs.close
    fs.close = close
    
    function close (fd, cb) {
      debug('close', fd)
      if (typeof cb !== "function") cb = noop
      delete fds['fd' + fd]
      originalClose.call(fs, fd, function(er) {
        onclose()
        cb(er)
      })
    }
    
    
    var originalCloseSync = fs.closeSync
    fs.closeSync = closeSync
    
    function closeSync (fd) {
      try {
        return originalCloseSync(fd)
      } finally {
        onclose()
      }
    }
    
    
    // Req class
    function Req () {
      // start processing
      this.done = this.done.bind(this)
      this.failures = 0
      this.process()
    }
    
    Req.prototype.done = function (er, result) {
      var tryAgain = false
      if (er) {
        var code = er.code
        var tryAgain = code === "EMFILE" || code === "ENFILE"
        if (process.platform === "win32")
          tryAgain = tryAgain || code === "OK"
      }
    
      if (tryAgain) {
        this.failures ++
        enqueue(this)
      } else {
        var cb = this.cb
        cb(er, result)
      }
    }
    
    var queue = []
    
    function enqueue(req) {
      queue.push(req)
      debug('enqueue %d %s', queue.length, req.constructor.name, req)
    }
    
    function onclose() {
      var req = queue.shift()
      if (req) {
        debug('process', req.constructor.name, req)
        req.process()
      }
    }
    
  provide("graceful-fs", module.exports);
}(global));

// pakmanager:merge-stream
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  'use strict';
    
    var through = require('through2')
    
    module.exports = function (/*streams...*/) {
      var sources = []
      var output  = through.obj()
    
      output.setMaxListeners(0)
    
      output.add = add
    
      output.on('unpipe', remove)
    
      Array.prototype.slice.call(arguments).forEach(add)
    
      return output
    
      function add (source) {
        if (Array.isArray(source)) {
          source.forEach(add)
          return this
        }
    
        sources.push(source);
        source.once('end', remove.bind(null, source))
        source.pipe(output, {end: false})
        return this
      }
    
      function remove (source) {
        sources = sources.filter(function (it) { return it !== source })
        if (!sources.length && output.readable) { output.end() }
      }
    }
    
  provide("merge-stream", module.exports);
}(global));

// pakmanager:mkdirp
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  var path = require('path');
    var fs = require('fs');
    var _0777 = parseInt('0777', 8);
    
    module.exports = mkdirP.mkdirp = mkdirP.mkdirP = mkdirP;
    
    function mkdirP (p, opts, f, made) {
        if (typeof opts === 'function') {
            f = opts;
            opts = {};
        }
        else if (!opts || typeof opts !== 'object') {
            opts = { mode: opts };
        }
        
        var mode = opts.mode;
        var xfs = opts.fs || fs;
        
        if (mode === undefined) {
            mode = _0777 & (~process.umask());
        }
        if (!made) made = null;
        
        var cb = f || function () {};
        p = path.resolve(p);
        
        xfs.mkdir(p, mode, function (er) {
            if (!er) {
                made = made || p;
                return cb(null, made);
            }
            switch (er.code) {
                case 'ENOENT':
                    mkdirP(path.dirname(p), opts, function (er, made) {
                        if (er) cb(er, made);
                        else mkdirP(p, opts, cb, made);
                    });
                    break;
    
                // In the case of any other error, just see if there's a dir
                // there already.  If so, then hooray!  If not, then something
                // is borked.
                default:
                    xfs.stat(p, function (er2, stat) {
                        // if the stat fails, then that's super weird.
                        // let the original error be the failure reason.
                        if (er2 || !stat.isDirectory()) cb(er, made)
                        else cb(null, made);
                    });
                    break;
            }
        });
    }
    
    mkdirP.sync = function sync (p, opts, made) {
        if (!opts || typeof opts !== 'object') {
            opts = { mode: opts };
        }
        
        var mode = opts.mode;
        var xfs = opts.fs || fs;
        
        if (mode === undefined) {
            mode = _0777 & (~process.umask());
        }
        if (!made) made = null;
    
        p = path.resolve(p);
    
        try {
            xfs.mkdirSync(p, mode);
            made = made || p;
        }
        catch (err0) {
            switch (err0.code) {
                case 'ENOENT' :
                    made = sync(path.dirname(p), opts, made);
                    sync(p, opts, made);
                    break;
    
                // In the case of any other error, just see if there's a dir
                // there already.  If so, then hooray!  If not, then something
                // is borked.
                default:
                    var stat;
                    try {
                        stat = xfs.statSync(p);
                    }
                    catch (err1) {
                        throw err0;
                    }
                    if (!stat.isDirectory()) throw err0;
                    break;
            }
        }
    
        return made;
    };
    
  provide("mkdirp", module.exports);
}(global));

// pakmanager:strip-bom
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  'use strict';
    var isUtf8 = require('is-utf8');
    
    var stripBom = module.exports = function (arg) {
    	if (typeof arg === 'string') {
    		return arg.replace(/^\ufeff/g, '');
    	}
    
    	if (Buffer.isBuffer(arg) && isUtf8(arg) &&
    		arg[0] === 0xef && arg[1] === 0xbb && arg[2] === 0xbf) {
    		return arg.slice(3);
    	}
    
    	return arg;
    };
    
    stripBom.stream = function () {
    	var firstChunk = require('first-chunk-stream');
    
    	return firstChunk({minSize: 3}, function (chunk, enc, cb) {
    		this.push(stripBom(chunk));
    		cb();
    	});
    };
    
  provide("strip-bom", module.exports);
}(global));

// pakmanager:archy
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  module.exports = function archy (obj, prefix, opts) {
        if (prefix === undefined) prefix = '';
        if (!opts) opts = {};
        var chr = function (s) {
            var chars = {
                '│' : '|',
                '└' : '`',
                '├' : '+',
                '─' : '-',
                '┬' : '-'
            };
            return opts.unicode === false ? chars[s] : s;
        };
        
        if (typeof obj === 'string') obj = { label : obj };
        
        var nodes = obj.nodes || [];
        var lines = (obj.label || '').split('\n');
        var splitter = '\n' + prefix + (nodes.length ? chr('│') : ' ') + ' ';
        
        return prefix
            + lines.join(splitter) + '\n'
            + nodes.map(function (node, ix) {
                var last = ix === nodes.length - 1;
                var more = node.nodes && node.nodes.length;
                var prefix_ = prefix + (last ? ' ' : chr('│')) + ' ';
                
                return prefix
                    + (last ? chr('└') : chr('├')) + chr('─')
                    + (more ? chr('┬') : chr('─')) + ' '
                    + archy(node, prefix_, opts).slice(prefix.length + 2)
                ;
            }).join('')
        ;
    };
    
  provide("archy", module.exports);
}(global));

// pakmanager:deprecated
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  var deprecated = {
      method: function(msg, log, fn) {
        var called = false;
        return function(){
          if (!called) {
            called = true;
            log(msg);
          }
          return fn.apply(this, arguments);
        };
      },
    
      field: function(msg, log, parent, field, val) {
        var called = false;
        var getter = function(){
          if (!called) {
            called = true;
            log(msg);
          }
          return val;
        };
        var setter = function(v) {
          if (!called) {
            called = true;
            log(msg);
          }
          val = v;
          return v;
        };
        Object.defineProperty(parent, field, {
          get: getter,
          set: setter,
          enumerable: true
        });
        return;
      }
    };
    
    module.exports = deprecated;
  provide("deprecated", module.exports);
}(global));

// pakmanager:gulp-util/lib/log
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  var chalk = require('chalk');
    var dateformat = require('dateformat');
    
    module.exports = function(){
      var time = '['+chalk.grey(dateformat(new Date(), 'HH:MM:ss'))+']';
      process.stdout.write(time + ' ');
      console.log.apply(console, arguments);
      return this;
    };
    
  provide("gulp-util/lib/log", module.exports);
}(global));

// pakmanager:gulp-util/lib/template
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  var template = require('lodash.template');
    var reEscape = require('lodash._reescape');
    var reEvaluate = require('lodash._reevaluate');
    var reInterpolate = require('lodash._reinterpolate');
    
    var forcedSettings = {
      escape: reEscape,
      evaluate: reEvaluate,
      interpolate: reInterpolate
    };
    
    module.exports = function(tmpl, data){
      var fn = template(tmpl, forcedSettings);
    
      var wrapped = function(o) {
        if (typeof o === 'undefined' || typeof o.file === 'undefined') throw new Error('Failed to provide the current file as "file" to the template');
        return fn(o);
      };
    
      return (data ? wrapped(data) : wrapped);
    };
    
  provide("gulp-util/lib/template", module.exports);
}(global));

// pakmanager:gulp-util/lib/env
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  var parseArgs = require('minimist');
    var argv = parseArgs(process.argv.slice(2));
    
    module.exports = argv;
    
  provide("gulp-util/lib/env", module.exports);
}(global));

// pakmanager:gulp-util/lib/noop
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  var through = require('through2');
    
    module.exports = function () {
      return through.obj();
    };
    
  provide("gulp-util/lib/noop", module.exports);
}(global));

// pakmanager:gulp-util/lib/isStream
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  var Stream = require('stream').Stream;
    
    module.exports = function(o) {
      return !!o && o instanceof Stream;
    };
    
  provide("gulp-util/lib/isStream", module.exports);
}(global));

// pakmanager:gulp-util/lib/isBuffer
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  var buf = require('buffer');
    var Buffer = buf.Buffer;
    
    // could use Buffer.isBuffer but this is the same exact thing...
    module.exports = function(o) {
      return typeof o === 'object' && o instanceof Buffer;
    };
    
  provide("gulp-util/lib/isBuffer", module.exports);
}(global));

// pakmanager:gulp-util/lib/isNull
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  module.exports = function(v) {
      return v === null;
    };
    
  provide("gulp-util/lib/isNull", module.exports);
}(global));

// pakmanager:gulp-util/lib/combine
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  var pipeline = require('multipipe');
    
    module.exports = function(){
      var args = arguments;
      if (args.length === 1 && Array.isArray(args[0])) {
        args = args[0];
      }
      return function(){
        return pipeline.apply(pipeline, args);
      };
    };
    
  provide("gulp-util/lib/combine", module.exports);
}(global));

// pakmanager:gulp-util/lib/buffer
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  var through = require('through2');
    
    module.exports = function(fn) {
      var buf = [];
      var end = function(cb) {
        this.push(buf);
        cb();
        if(fn) fn(null, buf);
      };
      var push = function(data, enc, cb) {
        buf.push(data);
        cb();
      };
      return through.obj(push, end);
    };
    
  provide("gulp-util/lib/buffer", module.exports);
}(global));

// pakmanager:gulp-util/lib/PluginError
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  var util = require('util');
    var arrayDiffer = require('array-differ');
    var arrayUniq = require('array-uniq');
    var chalk = require('chalk');
    var objectAssign = require('object-assign');
    
    var nonEnumberableProperties = ['name', 'message', 'stack'];
    var propertiesNotToDisplay = nonEnumberableProperties.concat(['plugin', 'showStack', 'showProperties', '__safety', '_stack']);
    
    // wow what a clusterfuck
    var parseOptions = function(plugin, message, opt) {
      opt = opt || {};
      if (typeof plugin === 'object') {
        opt = plugin;
      } else {
        if (message instanceof Error) {
          opt.error = message;
        } else if (typeof message === 'object') {
          opt = message;
        } else {
          opt.message = message;
        }
        opt.plugin = plugin;
      }
    
      return objectAssign({
        showStack: false,
        showProperties: true
      }, opt);
    };
    
    function PluginError(plugin, message, opt) {
      if (!(this instanceof PluginError)) throw new Error('Call PluginError using new');
    
      Error.call(this);
    
      var options = parseOptions(plugin, message, opt);
      var self = this;
    
      // if options has an error, grab details from it
      if (options.error) {
        // These properties are not enumerable, so we have to add them explicitly.
        arrayUniq(Object.keys(options.error).concat(nonEnumberableProperties))
          .forEach(function(prop) {
            self[prop] = options.error[prop];
          });
      }
    
      var properties = ['name', 'message', 'fileName', 'lineNumber', 'stack', 'showStack', 'showProperties', 'plugin'];
    
      // options object can override
      properties.forEach(function(prop) {
        if (prop in options) this[prop] = options[prop];
      }, this);
    
      // defaults
      if (!this.name) this.name = 'Error';
    
      if (!this.stack) {
        // Error.captureStackTrace appends a stack property which relies on the toString method of the object it is applied to.
        // Since we are using our own toString method which controls when to display the stack trace if we don't go through this
        // safety object, then we'll get stack overflow problems.
        var safety = {
          toString: function() {
            return this._messageWithDetails() + '\nStack:';
          }.bind(this)
        };
        Error.captureStackTrace(safety, arguments.callee || this.constructor);
        this.__safety = safety;
      }
    
      if (!this.plugin) throw new Error('Missing plugin name');
      if (!this.message) throw new Error('Missing error message');
    }
    
    util.inherits(PluginError, Error);
    
    PluginError.prototype._messageWithDetails = function() {
      var messageWithDetails = 'Message:\n    ' + this.message;
      var details = this._messageDetails();
    
      if (details !== '') {
        messageWithDetails += '\n' + details;
      }
    
      return messageWithDetails;
    };
    
    PluginError.prototype._messageDetails = function() {
      if (!this.showProperties) {
        return '';
      }
    
      var properties = arrayDiffer(Object.keys(this), propertiesNotToDisplay);
    
      if (properties.length === 0) {
        return '';
      }
    
      var self = this;
      properties = properties.map(function stringifyProperty(prop) {
        return '    ' + prop + ': ' + self[prop];
      });
    
      return 'Details:\n' + properties.join('\n');
    };
    
    PluginError.prototype.toString = function () {
      var sig = chalk.red(this.name) + ' in plugin \'' + chalk.cyan(this.plugin) + '\'';
      var detailsWithStack = function(stack) {
        return this._messageWithDetails() + '\nStack:\n' + stack;
      }.bind(this);
    
      var msg;
      if (this.showStack) {
        if (this.__safety) { // There is no wrapped error, use the stack captured in the PluginError ctor
          msg = this.__safety.stack;
        } else if (this._stack) {
          msg = detailsWithStack(this._stack);
        } else { // Stack from wrapped error
          msg = detailsWithStack(this.stack);
        }
      } else {
        msg = this._messageWithDetails();
      }
    
      return sig + '\n' + msg;
    };
    
    module.exports = PluginError;
    
  provide("gulp-util/lib/PluginError", module.exports);
}(global));

// pakmanager:gulp-util
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  module.exports = {
      File: require('vinyl'),
      replaceExtension: require('replace-ext'),
      colors: require('chalk'),
      date: require('dateformat'),
      log:  require('gulp-util/lib/log'),
      template:  require('gulp-util/lib/template'),
      env:  require('gulp-util/lib/env'),
      beep: require('beeper'),
      noop:  require('gulp-util/lib/noop'),
      isStream:  require('gulp-util/lib/isStream'),
      isBuffer:  require('gulp-util/lib/isBuffer'),
      isNull:  require('gulp-util/lib/isNull'),
      linefeed: '\n',
      combine:  require('gulp-util/lib/combine'),
      buffer:  require('gulp-util/lib/buffer'),
      PluginError:  require('gulp-util/lib/PluginError')
    };
    
  provide("gulp-util", module.exports);
}(global));

// pakmanager:interpret
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  const extensions = {
      '.babel.js': {
        module: 'babel/register',
        register: function (module) {
          module({
            // register on .js extension due to https://github.com/joyent/node/blob/v0.12.0/lib/module.js#L353
            // which only captures the final extension (.babel.js -> .js)
            extensions: '.js'
          })
        }
      },
      '.cirru': 'cirru-script/lib/register',
      '.cjsx': 'node-cjsx/register',
      '.co': 'coco',
      '.coffee': ['coffee-script/register', 'coffee-script'],
      '.coffee.md': ['coffee-script/register', 'coffee-script'],
      '.csv': 'require-csv',
      '.iced': ['iced-coffee-script/register', 'iced-coffee-script'],
      '.iced.md': 'iced-coffee-script/register',
      '.ini': 'require-ini',
      '.js': null,
      '.json': null,
      '.json5': 'json5/lib/require',
      '.jsx': [
        {
          module: 'babel/register',
          register: function (module) {
            module({
              extensions: '.jsx'
            });
          },
        },
        {
          module: 'node-jsx',
          register: function (module) {
            module.install({
              extension: '.jsx',
              harmony: true
            });
          }
        }
      ],
      '.litcoffee': ['coffee-script/register', 'coffee-script'],
      '.liticed': 'iced-coffee-script/register',
      '.ls': ['livescript', 'LiveScript'],
      '.node': null,
      '.toml': {
        module: 'toml-require',
        register: function (module) {
          module.install();
        }
      },
      '.ts': ['typescript-register', 'typescript-require'],
      '.wisp': 'wisp/engine/node',
      '.xml': 'require-xml',
      '.yaml': 'require-yaml',
      '.yml': 'require-yaml'
    };
    
    const jsVariantExtensions = [
      '.js',
      '.babel.js',
      '.cirru',
      '.cjsx',
      '.co',
      '.coffee',
      '.coffee.md',
      '.iced',
      '.iced.md',
      '.jsx',
      '.litcoffee',
      '.liticed',
      '.ls',
      '.ts',
      '.wisp'
    ];
    
    module.exports = {
      extensions: extensions,
      jsVariants: jsVariantExtensions.reduce(function (result, ext) {
        result[ext] = extensions[ext];
        return result;
      }, {})
    };
    
  provide("interpret", module.exports);
}(global));

// pakmanager:liftoff/lib/file_search
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  const findup = require('findup-sync');
    
    module.exports = function (search, paths) {
      var path;
      var len = paths.length;
      for (var i = 0; i < len; i++) {
        if (path) {
          break;
        } else {
          path = findup(search, {cwd: paths[i], nocase: true});
        }
      }
      return path;
    };
    
  provide("liftoff/lib/file_search", module.exports);
}(global));

// pakmanager:liftoff/lib/find_cwd
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  const path = require('path');
    
    module.exports = function (opts) {
      if (!opts) {
        opts = {};
      }
      var cwd = opts.cwd;
      var configPath = opts.configPath;
      // if a path to the desired config was specified
      // but no cwd was provided, use configPath dir
      if (typeof configPath === 'string' && !cwd) {
        cwd = path.dirname(path.resolve(configPath));
      }
      if (typeof cwd === 'string') {
        return path.resolve(cwd);
      }
      return process.cwd();
    };
    
  provide("liftoff/lib/find_cwd", module.exports);
}(global));

// pakmanager:liftoff/lib/find_config
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  const fs = require('fs');
    const path = require('path');
    const fileSearch =  require('liftoff/lib/file_search');
    
    module.exports = function (opts) {
      opts = opts || {};
      var configNameSearch = opts.configNameSearch;
      var configPath = opts.configPath;
      var searchPaths = opts.searchPaths;
      // only search for a config if a path to one wasn't explicitly provided
      if (!configPath) {
        if (!Array.isArray(searchPaths)) {
          throw new Error('Please provide an array of paths to search for config in.');
        }
        if (!configNameSearch) {
          throw new Error('Please provide a configNameSearch.');
        }
        configPath = fileSearch(configNameSearch, searchPaths);
      }
      // confirm the configPath exists and return an absolute path to it
      if (fs.existsSync(configPath)) {
        return path.resolve(configPath);
      }
      return null;
    };
    
  provide("liftoff/lib/find_config", module.exports);
}(global));

// pakmanager:liftoff/lib/parse_options
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  const extend = require('extend');
    
    module.exports = function (opts) {
      var defaults = {
        extensions: {
          '.js': null,
          '.json': null
        },
        searchPaths: []
      };
      if (!opts) {
        opts = {};
      }
      if (opts.name) {
        if (!opts.processTitle) {
          opts.processTitle = opts.name;
        }
        if (!opts.configName) {
          opts.configName = opts.name + 'file';
        }
        if (!opts.moduleName) {
          opts.moduleName = opts.name;
        }
      }
      if (!opts.processTitle) {
        throw new Error('You must specify a processTitle.');
      }
      if (!opts.configName) {
        throw new Error('You must specify a configName.');
      }
      if (!opts.moduleName) {
        throw new Error('You must specify a moduleName.');
      }
      return extend(defaults, opts);
    };
    
  provide("liftoff/lib/parse_options", module.exports);
}(global));

// pakmanager:liftoff/lib/silent_require
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  module.exports = function (path) {
      try {
        return require(path);
      } catch (e) {}
    };
    
  provide("liftoff/lib/silent_require", module.exports);
}(global));

// pakmanager:liftoff/lib/build_config_name
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  module.exports = function (opts) {
      opts = opts || {};
      var configName = opts.configName;
      var extensions = opts.extensions;
      if (!configName) {
        throw new Error('Please specify a configName.');
      }
      if (configName instanceof RegExp) {
        return [configName];
      }
      if (!Array.isArray(extensions)) {
        throw new Error('Please provide an array of valid extensions.');
      }
      return extensions.map(function (ext) {
        return configName + ext;
      });
    };
    
  provide("liftoff/lib/build_config_name", module.exports);
}(global));

// pakmanager:liftoff
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  const fs = require('fs');
    const util = require('util');
    const path = require('path');
    const EE = require('events').EventEmitter;
    
    const extend = require('extend');
    const resolve = require('resolve');
    const flaggedRespawn = require('flagged-respawn');
    const rechoir = require('rechoir');
    
    const findCwd =  require('liftoff/lib/find_cwd');
    const findConfig =  require('liftoff/lib/find_config');
    const fileSearch =  require('liftoff/lib/file_search');
    const parseOptions =  require('liftoff/lib/parse_options');
    const silentRequire =  require('liftoff/lib/silent_require');
    const buildConfigName =  require('liftoff/lib/build_config_name');
    
    
    function Liftoff (opts) {
      EE.call(this);
      extend(this, parseOptions(opts));
    }
    util.inherits(Liftoff, EE);
    
    Liftoff.prototype.requireLocal = function (module, basedir) {
      try {
        var result = require(resolve.sync(module, {basedir: basedir}));
        this.emit('require', module, result);
        return result;
      } catch (e) {
        this.emit('requireFail', module, e);
      }
    };
    
    Liftoff.prototype.buildEnvironment = function (opts) {
      opts = opts || {};
    
      // get modules we want to preload
      var preload = opts.require || [];
    
      // ensure items to preload is an array
      if (!Array.isArray(preload)) {
        preload = [preload];
      }
    
      // make a copy of search paths that can be mutated for this run
      var searchPaths = this.searchPaths.slice();
    
      // calculate current cwd
      var cwd = findCwd(opts);
    
      // if cwd was provided explicitly, only use it for searching config
      if (opts.cwd) {
        searchPaths = [cwd];
      } else {
        // otherwise just search in cwd first
        searchPaths.unshift(cwd);
      }
    
      // calculate the regex to use for finding the config file
      var configNameSearch = buildConfigName({
        configName: this.configName,
        extensions: Object.keys(this.extensions)
      });
    
      // calculate configPath
      var configPath = findConfig({
        configNameSearch: configNameSearch,
        searchPaths: searchPaths,
        configPath: opts.configPath
      });
    
      // if we have a config path, save the directory it resides in.
      var configBase;
      if (configPath) {
        configBase = path.dirname(configPath);
        // if cwd wasn't provided explicitly, it should match configBase
        if (!opts.cwd) {
          cwd = configBase;
        }
        // resolve symlink if needed
        if (fs.lstatSync(configPath).isSymbolicLink()) {
          configPath = fs.realpathSync(configPath);
        }
      }
    
      // TODO: break this out into lib/
      // locate local module and package next to config or explicitly provided cwd
      var modulePath, modulePackage;
      try {
        var delim = (process.platform === 'win32' ? ';' : ':'),
            paths = (process.env.NODE_PATH ? process.env.NODE_PATH.split(delim) : []);
        modulePath = resolve.sync(this.moduleName, {basedir: configBase || cwd, paths: paths});
        modulePackage = silentRequire(fileSearch('package.json', [modulePath]));
      } catch (e) {}
    
      // if we have a configuration but we failed to find a local module, maybe
      // we are developing against ourselves?
      if (!modulePath && configPath) {
        // check the package.json sibling to our config to see if its `name`
        // matches the module we're looking for
        var modulePackagePath = fileSearch('package.json', [configBase]);
        modulePackage = silentRequire(modulePackagePath);
        if (modulePackage && modulePackage.name === this.moduleName) {
          // if it does, our module path is `main` inside package.json
          modulePath = path.join(path.dirname(modulePackagePath), modulePackage.main || 'index.js');
          cwd = configBase;
        } else {
          // clear if we just required a package for some other project
          modulePackage = {};
        }
      }
    
      // load any modules which were requested to be required
      if (preload.length) {
        // unique results first
        preload.filter(function (value, index, self) {
          return self.indexOf(value) === index;
        }).forEach(function (dep) {
          this.requireLocal(dep, findCwd(opts));
        }, this);
      }
    
      // use rechoir to autoload any required modules
      var autoloads;
      if (configPath) {
        autoloads = rechoir.prepare(this.extensions, configPath, cwd, true);
        if (autoloads instanceof Error) {
          autoloads = autoloads.failures;
        }
        if (Array.isArray(autoloads)) {
          autoloads.forEach(function (attempt) {
            if (attempt.error) {
              this.emit('requireFail', attempt.moduleName, attempt.error);
            } else {
              this.emit('require', attempt.moduleName, attempt.module);
            }
          }, this);
        }
      }
    
      return {
        cwd: cwd,
        require: preload,
        configNameSearch: configNameSearch,
        configPath: configPath,
        configBase: configBase,
        modulePath: modulePath,
        modulePackage: modulePackage || {}
      };
    };
    
    Liftoff.prototype.handleFlags = function (cb) {
      if (typeof this.v8flags === 'function') {
        this.v8flags(function (err, flags) {
          if (err) {
            cb(err);
          } else {
            cb(null, flags);
          }
        });
      } else {
        process.nextTick(function () {
          cb(null, this.v8flags);
        }.bind(this));
      }
    };
    
    Liftoff.prototype.launch = function (opts, fn) {
      if (typeof fn !== 'function') {
        throw new Error('You must provide a callback function.');
      }
      process.title = this.processTitle;
    
      var completion = opts.completion;
      if (completion && this.completions) {
        return this.completions(completion);
      }
    
      this.handleFlags(function (err, flags) {
        if (err) {
          throw err;
        } else {
          if (flags) {
            flaggedRespawn(flags, process.argv, function (ready, child) {
              if (child !== process) {
                this.emit('respawn', process.argv.filter(function (flag) {
                  return flags.indexOf(flag) !== -1;
                }.bind(this)), child);
              }
              if (ready) {
                fn.call(this, this.buildEnvironment(opts));
              }
            }.bind(this));
          } else {
            fn.call(this, this.buildEnvironment(opts));
          }
        }
      }.bind(this));
    };
    
    
    
    module.exports = Liftoff;
    
  provide("liftoff", module.exports);
}(global));

// pakmanager:orchestrator/lib/runTask
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  /*jshint node:true */
    
    "use strict";
    
    var eos = require('end-of-stream');
    var consume = require('stream-consume');
    
    module.exports = function (task, done) {
    	var that = this, finish, cb, isDone = false, start, r;
    
    	finish = function (err, runMethod) {
    		var hrDuration = process.hrtime(start);
    
    		if (isDone && !err) {
    			err = new Error('task completion callback called too many times');
    		}
    		isDone = true;
    
    		var duration = hrDuration[0] + (hrDuration[1] / 1e9); // seconds
    
    		done.call(that, err, {
    			duration: duration, // seconds
    			hrDuration: hrDuration, // [seconds,nanoseconds]
    			runMethod: runMethod
    		});
    	};
    
    	cb = function (err) {
    		finish(err, 'callback');
    	};
    
    	try {
    		start = process.hrtime();
    		r = task(cb);
    	} catch (err) {
    		return finish(err, 'catch');
    	}
    
    	if (r && typeof r.then === 'function') {
    		// wait for promise to resolve
    		// FRAGILE: ASSUME: Promises/A+, see http://promises-aplus.github.io/promises-spec/
    		r.then(function () {
    			finish(null, 'promise');
    		}, function(err) {
    			finish(err, 'promise');
    		});
    
    	} else if (r && typeof r.pipe === 'function') {
    		// wait for stream to end
    
    		eos(r, { error: true, readable: r.readable, writable: r.writable && !r.readable }, function(err){
    			finish(err, 'stream');
    		});
    
    		// Ensure that the stream completes
            consume(r);
    
    	} else if (task.length === 0) {
    		// synchronous, function took in args.length parameters, and the callback was extra
    		finish(null, 'sync');
    
    	//} else {
    		// FRAGILE: ASSUME: callback
    
    	}
    };
    
  provide("orchestrator/lib/runTask", module.exports);
}(global));

// pakmanager:orchestrator
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  /*jshint node:true */
    
    "use strict";
    
    var util = require('util');
    var events = require('events');
    var EventEmitter = events.EventEmitter;
    var runTask =  require('orchestrator/lib/runTask');
    
    var Orchestrator = function () {
    	EventEmitter.call(this);
    	this.doneCallback = undefined; // call this when all tasks in the queue are done
    	this.seq = []; // the order to run the tasks
    	this.tasks = {}; // task objects: name, dep (list of names of dependencies), fn (the task to run)
    	this.isRunning = false; // is the orchestrator running tasks? .start() to start, .stop() to stop
    };
    util.inherits(Orchestrator, EventEmitter);
    
    	Orchestrator.prototype.reset = function () {
    		if (this.isRunning) {
    			this.stop(null);
    		}
    		this.tasks = {};
    		this.seq = [];
    		this.isRunning = false;
    		this.doneCallback = undefined;
    		return this;
    	};
    	Orchestrator.prototype.add = function (name, dep, fn) {
    		if (!fn && typeof dep === 'function') {
    			fn = dep;
    			dep = undefined;
    		}
    		dep = dep || [];
    		fn = fn || function () {}; // no-op
    		if (!name) {
    			throw new Error('Task requires a name');
    		}
    		// validate name is a string, dep is an array of strings, and fn is a function
    		if (typeof name !== 'string') {
    			throw new Error('Task requires a name that is a string');
    		}
    		if (typeof fn !== 'function') {
    			throw new Error('Task '+name+' requires a function that is a function');
    		}
    		if (!Array.isArray(dep)) {
    			throw new Error('Task '+name+' can\'t support dependencies that is not an array of strings');
    		}
    		dep.forEach(function (item) {
    			if (typeof item !== 'string') {
    				throw new Error('Task '+name+' dependency '+item+' is not a string');
    			}
    		});
    		this.tasks[name] = {
    			fn: fn,
    			dep: dep,
    			name: name
    		};
    		return this;
    	};
    	Orchestrator.prototype.task = function (name, dep, fn) {
    		if (dep || fn) {
    			// alias for add, return nothing rather than this
    			this.add(name, dep, fn);
    		} else {
    			return this.tasks[name];
    		}
    	};
    	Orchestrator.prototype.hasTask = function (name) {
    		return !!this.tasks[name];
    	};
    	// tasks and optionally a callback
    	Orchestrator.prototype.start = function() {
    		var args, arg, names = [], lastTask, i, seq = [];
    		args = Array.prototype.slice.call(arguments, 0);
    		if (args.length) {
    			lastTask = args[args.length-1];
    			if (typeof lastTask === 'function') {
    				this.doneCallback = lastTask;
    				args.pop();
    			}
    			for (i = 0; i < args.length; i++) {
    				arg = args[i];
    				if (typeof arg === 'string') {
    					names.push(arg);
    				} else if (Array.isArray(arg)) {
    					names = names.concat(arg); // FRAGILE: ASSUME: it's an array of strings
    				} else {
    					throw new Error('pass strings or arrays of strings');
    				}
    			}
    		}
    		if (this.isRunning) {
    			// reset specified tasks (and dependencies) as not run
    			this._resetSpecificTasks(names);
    		} else {
    			// reset all tasks as not run
    			this._resetAllTasks();
    		}
    		if (this.isRunning) {
    			// if you call start() again while a previous run is still in play
    			// prepend the new tasks to the existing task queue
    			names = names.concat(this.seq);
    		}
    		if (names.length < 1) {
    			// run all tasks
    			for (i in this.tasks) {
    				if (this.tasks.hasOwnProperty(i)) {
    					names.push(this.tasks[i].name);
    				}
    			}
    		}
    		seq = [];
    		try {
    			this.sequence(this.tasks, names, seq, []);
    		} catch (err) {
    			// Is this a known error?
    			if (err) {
    				if (err.missingTask) {
    					this.emit('task_not_found', {message: err.message, task:err.missingTask, err: err});
    				}
    				if (err.recursiveTasks) {
    					this.emit('task_recursion', {message: err.message, recursiveTasks:err.recursiveTasks, err: err});
    				}
    			}
    			this.stop(err);
    			return this;
    		}
    		this.seq = seq;
    		this.emit('start', {message:'seq: '+this.seq.join(',')});
    		if (!this.isRunning) {
    			this.isRunning = true;
    		}
    		this._runStep();
    		return this;
    	};
    	Orchestrator.prototype.stop = function (err, successfulFinish) {
    		this.isRunning = false;
    		if (err) {
    			this.emit('err', {message:'orchestration failed', err:err});
    		} else if (successfulFinish) {
    			this.emit('stop', {message:'orchestration succeeded'});
    		} else {
    			// ASSUME
    			err = 'orchestration aborted';
    			this.emit('err', {message:'orchestration aborted', err: err});
    		}
    		if (this.doneCallback) {
    			// Avoid calling it multiple times
    			this.doneCallback(err);
    		} else if (err && !this.listeners('err').length) {
    			// No one is listening for the error so speak louder
    			throw err;
    		}
    	};
    	Orchestrator.prototype.sequence = require('sequencify');
    	Orchestrator.prototype.allDone = function () {
    		var i, task, allDone = true; // nothing disputed it yet
    		for (i = 0; i < this.seq.length; i++) {
    			task = this.tasks[this.seq[i]];
    			if (!task.done) {
    				allDone = false;
    				break;
    			}
    		}
    		return allDone;
    	};
    	Orchestrator.prototype._resetTask = function(task) {
    		if (task) {
    			if (task.done) {
    				task.done = false;
    			}
    			delete task.start;
    			delete task.stop;
    			delete task.duration;
    			delete task.hrDuration;
    			delete task.args;
    		}
    	};
    	Orchestrator.prototype._resetAllTasks = function() {
    		var task;
    		for (task in this.tasks) {
    			if (this.tasks.hasOwnProperty(task)) {
    				this._resetTask(this.tasks[task]);
    			}
    		}
    	};
    	Orchestrator.prototype._resetSpecificTasks = function (names) {
    		var i, name, t;
    
    		if (names && names.length) {
    			for (i = 0; i < names.length; i++) {
    				name = names[i];
    				t = this.tasks[name];
    				if (t) {
    					this._resetTask(t);
    					if (t.dep && t.dep.length) {
    						this._resetSpecificTasks(t.dep); // recurse
    					}
    				//} else {
    					// FRAGILE: ignore that the task doesn't exist
    				}
    			}
    		}
    	};
    	Orchestrator.prototype._runStep = function () {
    		var i, task;
    		if (!this.isRunning) {
    			return; // user aborted, ASSUME: stop called previously
    		}
    		for (i = 0; i < this.seq.length; i++) {
    			task = this.tasks[this.seq[i]];
    			if (!task.done && !task.running && this._readyToRunTask(task)) {
    				this._runTask(task);
    			}
    			if (!this.isRunning) {
    				return; // task failed or user aborted, ASSUME: stop called previously
    			}
    		}
    		if (this.allDone()) {
    			this.stop(null, true);
    		}
    	};
    	Orchestrator.prototype._readyToRunTask = function (task) {
    		var ready = true, // no one disproved it yet
    			i, name, t;
    		if (task.dep.length) {
    			for (i = 0; i < task.dep.length; i++) {
    				name = task.dep[i];
    				t = this.tasks[name];
    				if (!t) {
    					// FRAGILE: this should never happen
    					this.stop("can't run "+task.name+" because it depends on "+name+" which doesn't exist");
    					ready = false;
    					break;
    				}
    				if (!t.done) {
    					ready = false;
    					break;
    				}
    			}
    		}
    		return ready;
    	};
    	Orchestrator.prototype._stopTask = function (task, meta) {
    		task.duration = meta.duration;
    		task.hrDuration = meta.hrDuration;
    		task.running = false;
    		task.done = true;
    	};
    	Orchestrator.prototype._emitTaskDone = function (task, message, err) {
    		if (!task.args) {
    			task.args = {task:task.name};
    		}
    		task.args.duration = task.duration;
    		task.args.hrDuration = task.hrDuration;
    		task.args.message = task.name+' '+message;
    		var evt = 'stop';
    		if (err) {
    			task.args.err = err;
    			evt = 'err';
    		}
    		// 'task_stop' or 'task_err'
    		this.emit('task_'+evt, task.args);
    	};
    	Orchestrator.prototype._runTask = function (task) {
    		var that = this;
    
    		task.args = {task:task.name, message:task.name+' started'};
    		this.emit('task_start', task.args);
    		task.running = true;
    
    		runTask(task.fn.bind(this), function (err, meta) {
    			that._stopTask.call(that, task, meta);
    			that._emitTaskDone.call(that, task, meta.runMethod, err);
    			if (err) {
    				return that.stop.call(that, err);
    			}
    			that._runStep.call(that);
    		});
    	};
    
    // FRAGILE: ASSUME: this list is an exhaustive list of events emitted
    var events = ['start','stop','err','task_start','task_stop','task_err','task_not_found','task_recursion'];
    
    var listenToEvent = function (target, event, callback) {
    	target.on(event, function (e) {
    		e.src = event;
    		callback(e);
    	});
    };
    
    	Orchestrator.prototype.onAll = function (callback) {
    		var i;
    		if (typeof callback !== 'function') {
    			throw new Error('No callback specified');
    		}
    
    		for (i = 0; i < events.length; i++) {
    			listenToEvent(this, events[i], callback);
    		}
    	};
    
    module.exports = Orchestrator;
    
  provide("orchestrator", module.exports);
}(global));

// pakmanager:pretty-hrtime
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  /*jshint node:true */
    
    "use strict";
    
    var minimalDesc = ['h', 'min', 's', 'ms', 'μs', 'ns'];
    var verboseDesc = ['hour', 'minute', 'second', 'millisecond', 'microsecond', 'nanosecond'];
    var convert = [60*60, 60, 1, 1e6, 1e3, 1];
    
    module.exports = function (source, opts) {
    	var verbose, precise, i, spot, sourceAtStep, valAtStep, decimals, strAtStep, results;
    
    	verbose = false;
    	precise = false;
    	if (opts) {
    		verbose = opts.verbose || false;
    		precise = opts.precise || false;
    	}
    
    	if (!Array.isArray(source) || source.length !== 2) {
    		return '';
    	}
    	if (typeof source[0] !== 'number' || typeof source[1] !== 'number') {
    		return '';
    	}
    
    	results = '';
    
    	// foreach unit
    	for (i = 0; i < 6; i++) {
    		spot = i < 3 ? 0 : 1; // grabbing first or second spot in source array
    		sourceAtStep = source[spot];
    		if (i !== 3 && i !== 0) {
    			sourceAtStep = sourceAtStep % convert[i-1]; // trim off previous portions
    		}
    		if (i === 2) {
    			sourceAtStep += source[1]/1e9; // get partial seconds from other portion of the array
    		}
    		valAtStep = sourceAtStep / convert[i]; // val at this unit
    		if (valAtStep >= 1) {
    			if (verbose) {
    				valAtStep = Math.floor(valAtStep); // deal in whole units, subsequent laps will get the decimal portion
    			}
    			if (!precise) {
    				// don't fling too many decimals
    				decimals = valAtStep >= 10 ? 0 : 2;
    				strAtStep = valAtStep.toFixed(decimals);
    			} else {
    				strAtStep = valAtStep.toString();
    			}
    			if (strAtStep.indexOf('.') > -1 && strAtStep[strAtStep.length-1] === '0') {
    				strAtStep = strAtStep.replace(/\.?0+$/,''); // remove trailing zeros
    			}
    			if (results) {
    				results += ' '; // append space if we have a previous value
    			}
    			results += strAtStep; // append the value
    			// append units
    			if (verbose) {
    				results += ' '+verboseDesc[i];
    				if (strAtStep !== '1') {
    					results += 's';
    				}
    			} else {
    				results += ' '+minimalDesc[i];
    			}
    			if (!verbose) {
    				break; // verbose gets as many groups as necessary, the rest get only one
    			}
    		}
    	}
    
    	return results;
    };
    
  provide("pretty-hrtime", module.exports);
}(global));

// pakmanager:semver
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  // export the class if we are in a Node-like system.
    if (typeof module === 'object' && module.exports === exports)
      exports = module.exports = SemVer;
    
    // The debug function is excluded entirely from the minified version.
    /* nomin */ var debug;
    /* nomin */ if (typeof process === 'object' &&
        /* nomin */ process.env &&
        /* nomin */ process.env.NODE_DEBUG &&
        /* nomin */ /\bsemver\b/i.test(process.env.NODE_DEBUG))
      /* nomin */ debug = function() {
        /* nomin */ var args = Array.prototype.slice.call(arguments, 0);
        /* nomin */ args.unshift('SEMVER');
        /* nomin */ console.log.apply(console, args);
        /* nomin */ };
    /* nomin */ else
      /* nomin */ debug = function() {};
    
    // Note: this is the semver.org version of the spec that it implements
    // Not necessarily the package version of this code.
    exports.SEMVER_SPEC_VERSION = '2.0.0';
    
    var MAX_LENGTH = 256;
    var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;
    
    // The actual regexps go on exports.re
    var re = exports.re = [];
    var src = exports.src = [];
    var R = 0;
    
    // The following Regular Expressions can be used for tokenizing,
    // validating, and parsing SemVer version strings.
    
    // ## Numeric Identifier
    // A single `0`, or a non-zero digit followed by zero or more digits.
    
    var NUMERICIDENTIFIER = R++;
    src[NUMERICIDENTIFIER] = '0|[1-9]\\d*';
    var NUMERICIDENTIFIERLOOSE = R++;
    src[NUMERICIDENTIFIERLOOSE] = '[0-9]+';
    
    
    // ## Non-numeric Identifier
    // Zero or more digits, followed by a letter or hyphen, and then zero or
    // more letters, digits, or hyphens.
    
    var NONNUMERICIDENTIFIER = R++;
    src[NONNUMERICIDENTIFIER] = '\\d*[a-zA-Z-][a-zA-Z0-9-]*';
    
    
    // ## Main Version
    // Three dot-separated numeric identifiers.
    
    var MAINVERSION = R++;
    src[MAINVERSION] = '(' + src[NUMERICIDENTIFIER] + ')\\.' +
                       '(' + src[NUMERICIDENTIFIER] + ')\\.' +
                       '(' + src[NUMERICIDENTIFIER] + ')';
    
    var MAINVERSIONLOOSE = R++;
    src[MAINVERSIONLOOSE] = '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' +
                            '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' +
                            '(' + src[NUMERICIDENTIFIERLOOSE] + ')';
    
    // ## Pre-release Version Identifier
    // A numeric identifier, or a non-numeric identifier.
    
    var PRERELEASEIDENTIFIER = R++;
    src[PRERELEASEIDENTIFIER] = '(?:' + src[NUMERICIDENTIFIER] +
                                '|' + src[NONNUMERICIDENTIFIER] + ')';
    
    var PRERELEASEIDENTIFIERLOOSE = R++;
    src[PRERELEASEIDENTIFIERLOOSE] = '(?:' + src[NUMERICIDENTIFIERLOOSE] +
                                     '|' + src[NONNUMERICIDENTIFIER] + ')';
    
    
    // ## Pre-release Version
    // Hyphen, followed by one or more dot-separated pre-release version
    // identifiers.
    
    var PRERELEASE = R++;
    src[PRERELEASE] = '(?:-(' + src[PRERELEASEIDENTIFIER] +
                      '(?:\\.' + src[PRERELEASEIDENTIFIER] + ')*))';
    
    var PRERELEASELOOSE = R++;
    src[PRERELEASELOOSE] = '(?:-?(' + src[PRERELEASEIDENTIFIERLOOSE] +
                           '(?:\\.' + src[PRERELEASEIDENTIFIERLOOSE] + ')*))';
    
    // ## Build Metadata Identifier
    // Any combination of digits, letters, or hyphens.
    
    var BUILDIDENTIFIER = R++;
    src[BUILDIDENTIFIER] = '[0-9A-Za-z-]+';
    
    // ## Build Metadata
    // Plus sign, followed by one or more period-separated build metadata
    // identifiers.
    
    var BUILD = R++;
    src[BUILD] = '(?:\\+(' + src[BUILDIDENTIFIER] +
                 '(?:\\.' + src[BUILDIDENTIFIER] + ')*))';
    
    
    // ## Full Version String
    // A main version, followed optionally by a pre-release version and
    // build metadata.
    
    // Note that the only major, minor, patch, and pre-release sections of
    // the version string are capturing groups.  The build metadata is not a
    // capturing group, because it should not ever be used in version
    // comparison.
    
    var FULL = R++;
    var FULLPLAIN = 'v?' + src[MAINVERSION] +
                    src[PRERELEASE] + '?' +
                    src[BUILD] + '?';
    
    src[FULL] = '^' + FULLPLAIN + '$';
    
    // like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
    // also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
    // common in the npm registry.
    var LOOSEPLAIN = '[v=\\s]*' + src[MAINVERSIONLOOSE] +
                     src[PRERELEASELOOSE] + '?' +
                     src[BUILD] + '?';
    
    var LOOSE = R++;
    src[LOOSE] = '^' + LOOSEPLAIN + '$';
    
    var GTLT = R++;
    src[GTLT] = '((?:<|>)?=?)';
    
    // Something like "2.*" or "1.2.x".
    // Note that "x.x" is a valid xRange identifer, meaning "any version"
    // Only the first item is strictly required.
    var XRANGEIDENTIFIERLOOSE = R++;
    src[XRANGEIDENTIFIERLOOSE] = src[NUMERICIDENTIFIERLOOSE] + '|x|X|\\*';
    var XRANGEIDENTIFIER = R++;
    src[XRANGEIDENTIFIER] = src[NUMERICIDENTIFIER] + '|x|X|\\*';
    
    var XRANGEPLAIN = R++;
    src[XRANGEPLAIN] = '[v=\\s]*(' + src[XRANGEIDENTIFIER] + ')' +
                       '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' +
                       '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' +
                       '(?:' + src[PRERELEASE] + ')?' +
                       src[BUILD] + '?' +
                       ')?)?';
    
    var XRANGEPLAINLOOSE = R++;
    src[XRANGEPLAINLOOSE] = '[v=\\s]*(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
                            '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
                            '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
                            '(?:' + src[PRERELEASELOOSE] + ')?' +
                            src[BUILD] + '?' +
                            ')?)?';
    
    var XRANGE = R++;
    src[XRANGE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAIN] + '$';
    var XRANGELOOSE = R++;
    src[XRANGELOOSE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAINLOOSE] + '$';
    
    // Tilde ranges.
    // Meaning is "reasonably at or greater than"
    var LONETILDE = R++;
    src[LONETILDE] = '(?:~>?)';
    
    var TILDETRIM = R++;
    src[TILDETRIM] = '(\\s*)' + src[LONETILDE] + '\\s+';
    re[TILDETRIM] = new RegExp(src[TILDETRIM], 'g');
    var tildeTrimReplace = '$1~';
    
    var TILDE = R++;
    src[TILDE] = '^' + src[LONETILDE] + src[XRANGEPLAIN] + '$';
    var TILDELOOSE = R++;
    src[TILDELOOSE] = '^' + src[LONETILDE] + src[XRANGEPLAINLOOSE] + '$';
    
    // Caret ranges.
    // Meaning is "at least and backwards compatible with"
    var LONECARET = R++;
    src[LONECARET] = '(?:\\^)';
    
    var CARETTRIM = R++;
    src[CARETTRIM] = '(\\s*)' + src[LONECARET] + '\\s+';
    re[CARETTRIM] = new RegExp(src[CARETTRIM], 'g');
    var caretTrimReplace = '$1^';
    
    var CARET = R++;
    src[CARET] = '^' + src[LONECARET] + src[XRANGEPLAIN] + '$';
    var CARETLOOSE = R++;
    src[CARETLOOSE] = '^' + src[LONECARET] + src[XRANGEPLAINLOOSE] + '$';
    
    // A simple gt/lt/eq thing, or just "" to indicate "any version"
    var COMPARATORLOOSE = R++;
    src[COMPARATORLOOSE] = '^' + src[GTLT] + '\\s*(' + LOOSEPLAIN + ')$|^$';
    var COMPARATOR = R++;
    src[COMPARATOR] = '^' + src[GTLT] + '\\s*(' + FULLPLAIN + ')$|^$';
    
    
    // An expression to strip any whitespace between the gtlt and the thing
    // it modifies, so that `> 1.2.3` ==> `>1.2.3`
    var COMPARATORTRIM = R++;
    src[COMPARATORTRIM] = '(\\s*)' + src[GTLT] +
                          '\\s*(' + LOOSEPLAIN + '|' + src[XRANGEPLAIN] + ')';
    
    // this one has to use the /g flag
    re[COMPARATORTRIM] = new RegExp(src[COMPARATORTRIM], 'g');
    var comparatorTrimReplace = '$1$2$3';
    
    
    // Something like `1.2.3 - 1.2.4`
    // Note that these all use the loose form, because they'll be
    // checked against either the strict or loose comparator form
    // later.
    var HYPHENRANGE = R++;
    src[HYPHENRANGE] = '^\\s*(' + src[XRANGEPLAIN] + ')' +
                       '\\s+-\\s+' +
                       '(' + src[XRANGEPLAIN] + ')' +
                       '\\s*$';
    
    var HYPHENRANGELOOSE = R++;
    src[HYPHENRANGELOOSE] = '^\\s*(' + src[XRANGEPLAINLOOSE] + ')' +
                            '\\s+-\\s+' +
                            '(' + src[XRANGEPLAINLOOSE] + ')' +
                            '\\s*$';
    
    // Star ranges basically just allow anything at all.
    var STAR = R++;
    src[STAR] = '(<|>)?=?\\s*\\*';
    
    // Compile to actual regexp objects.
    // All are flag-free, unless they were created above with a flag.
    for (var i = 0; i < R; i++) {
      debug(i, src[i]);
      if (!re[i])
        re[i] = new RegExp(src[i]);
    }
    
    exports.parse = parse;
    function parse(version, loose) {
      if (version instanceof SemVer)
        return version;
    
      if (typeof version !== 'string')
        return null;
    
      if (version.length > MAX_LENGTH)
        return null;
    
      var r = loose ? re[LOOSE] : re[FULL];
      if (!r.test(version))
        return null;
    
      try {
        return new SemVer(version, loose);
      } catch (er) {
        return null;
      }
    }
    
    exports.valid = valid;
    function valid(version, loose) {
      var v = parse(version, loose);
      return v ? v.version : null;
    }
    
    
    exports.clean = clean;
    function clean(version, loose) {
      var s = parse(version.trim().replace(/^[=v]+/, ''), loose);
      return s ? s.version : null;
    }
    
    exports.SemVer = SemVer;
    
    function SemVer(version, loose) {
      if (version instanceof SemVer) {
        if (version.loose === loose)
          return version;
        else
          version = version.version;
      } else if (typeof version !== 'string') {
        throw new TypeError('Invalid Version: ' + version);
      }
    
      if (version.length > MAX_LENGTH)
        throw new TypeError('version is longer than ' + MAX_LENGTH + ' characters')
    
      if (!(this instanceof SemVer))
        return new SemVer(version, loose);
    
      debug('SemVer', version, loose);
      this.loose = loose;
      var m = version.trim().match(loose ? re[LOOSE] : re[FULL]);
    
      if (!m)
        throw new TypeError('Invalid Version: ' + version);
    
      this.raw = version;
    
      // these are actually numbers
      this.major = +m[1];
      this.minor = +m[2];
      this.patch = +m[3];
    
      if (this.major > MAX_SAFE_INTEGER || this.major < 0)
        throw new TypeError('Invalid major version')
    
      if (this.minor > MAX_SAFE_INTEGER || this.minor < 0)
        throw new TypeError('Invalid minor version')
    
      if (this.patch > MAX_SAFE_INTEGER || this.patch < 0)
        throw new TypeError('Invalid patch version')
    
      // numberify any prerelease numeric ids
      if (!m[4])
        this.prerelease = [];
      else
        this.prerelease = m[4].split('.').map(function(id) {
          if (/^[0-9]+$/.test(id)) {
            var num = +id
            if (num >= 0 && num < MAX_SAFE_INTEGER)
              return num
          }
          return id;
        });
    
      this.build = m[5] ? m[5].split('.') : [];
      this.format();
    }
    
    SemVer.prototype.format = function() {
      this.version = this.major + '.' + this.minor + '.' + this.patch;
      if (this.prerelease.length)
        this.version += '-' + this.prerelease.join('.');
      return this.version;
    };
    
    SemVer.prototype.inspect = function() {
      return '<SemVer "' + this + '">';
    };
    
    SemVer.prototype.toString = function() {
      return this.version;
    };
    
    SemVer.prototype.compare = function(other) {
      debug('SemVer.compare', this.version, this.loose, other);
      if (!(other instanceof SemVer))
        other = new SemVer(other, this.loose);
    
      return this.compareMain(other) || this.comparePre(other);
    };
    
    SemVer.prototype.compareMain = function(other) {
      if (!(other instanceof SemVer))
        other = new SemVer(other, this.loose);
    
      return compareIdentifiers(this.major, other.major) ||
             compareIdentifiers(this.minor, other.minor) ||
             compareIdentifiers(this.patch, other.patch);
    };
    
    SemVer.prototype.comparePre = function(other) {
      if (!(other instanceof SemVer))
        other = new SemVer(other, this.loose);
    
      // NOT having a prerelease is > having one
      if (this.prerelease.length && !other.prerelease.length)
        return -1;
      else if (!this.prerelease.length && other.prerelease.length)
        return 1;
      else if (!this.prerelease.length && !other.prerelease.length)
        return 0;
    
      var i = 0;
      do {
        var a = this.prerelease[i];
        var b = other.prerelease[i];
        debug('prerelease compare', i, a, b);
        if (a === undefined && b === undefined)
          return 0;
        else if (b === undefined)
          return 1;
        else if (a === undefined)
          return -1;
        else if (a === b)
          continue;
        else
          return compareIdentifiers(a, b);
      } while (++i);
    };
    
    // preminor will bump the version up to the next minor release, and immediately
    // down to pre-release. premajor and prepatch work the same way.
    SemVer.prototype.inc = function(release, identifier) {
      switch (release) {
        case 'premajor':
          this.prerelease.length = 0;
          this.patch = 0;
          this.minor = 0;
          this.major++;
          this.inc('pre', identifier);
          break;
        case 'preminor':
          this.prerelease.length = 0;
          this.patch = 0;
          this.minor++;
          this.inc('pre', identifier);
          break;
        case 'prepatch':
          // If this is already a prerelease, it will bump to the next version
          // drop any prereleases that might already exist, since they are not
          // relevant at this point.
          this.prerelease.length = 0;
          this.inc('patch', identifier);
          this.inc('pre', identifier);
          break;
        // If the input is a non-prerelease version, this acts the same as
        // prepatch.
        case 'prerelease':
          if (this.prerelease.length === 0)
            this.inc('patch', identifier);
          this.inc('pre', identifier);
          break;
    
        case 'major':
          // If this is a pre-major version, bump up to the same major version.
          // Otherwise increment major.
          // 1.0.0-5 bumps to 1.0.0
          // 1.1.0 bumps to 2.0.0
          if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0)
            this.major++;
          this.minor = 0;
          this.patch = 0;
          this.prerelease = [];
          break;
        case 'minor':
          // If this is a pre-minor version, bump up to the same minor version.
          // Otherwise increment minor.
          // 1.2.0-5 bumps to 1.2.0
          // 1.2.1 bumps to 1.3.0
          if (this.patch !== 0 || this.prerelease.length === 0)
            this.minor++;
          this.patch = 0;
          this.prerelease = [];
          break;
        case 'patch':
          // If this is not a pre-release version, it will increment the patch.
          // If it is a pre-release it will bump up to the same patch version.
          // 1.2.0-5 patches to 1.2.0
          // 1.2.0 patches to 1.2.1
          if (this.prerelease.length === 0)
            this.patch++;
          this.prerelease = [];
          break;
        // This probably shouldn't be used publicly.
        // 1.0.0 "pre" would become 1.0.0-0 which is the wrong direction.
        case 'pre':
          if (this.prerelease.length === 0)
            this.prerelease = [0];
          else {
            var i = this.prerelease.length;
            while (--i >= 0) {
              if (typeof this.prerelease[i] === 'number') {
                this.prerelease[i]++;
                i = -2;
              }
            }
            if (i === -1) // didn't increment anything
              this.prerelease.push(0);
          }
          if (identifier) {
            // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
            // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
            if (this.prerelease[0] === identifier) {
              if (isNaN(this.prerelease[1]))
                this.prerelease = [identifier, 0];
            } else
              this.prerelease = [identifier, 0];
          }
          break;
    
        default:
          throw new Error('invalid increment argument: ' + release);
      }
      this.format();
      return this;
    };
    
    exports.inc = inc;
    function inc(version, release, loose, identifier) {
      if (typeof(loose) === 'string') {
        identifier = loose;
        loose = undefined;
      }
    
      try {
        return new SemVer(version, loose).inc(release, identifier).version;
      } catch (er) {
        return null;
      }
    }
    
    exports.diff = diff;
    function diff(version1, version2) {
      if (eq(version1, version2)) {
        return null;
      } else {
        var v1 = parse(version1);
        var v2 = parse(version2);
        if (v1.prerelease.length || v2.prerelease.length) {
          for (var key in v1) {
            if (key === 'major' || key === 'minor' || key === 'patch') {
              if (v1[key] !== v2[key]) {
                return 'pre'+key;
              }
            }
          }
          return 'prerelease';
        }
        for (var key in v1) {
          if (key === 'major' || key === 'minor' || key === 'patch') {
            if (v1[key] !== v2[key]) {
              return key;
            }
          }
        }
      }
    }
    
    exports.compareIdentifiers = compareIdentifiers;
    
    var numeric = /^[0-9]+$/;
    function compareIdentifiers(a, b) {
      var anum = numeric.test(a);
      var bnum = numeric.test(b);
    
      if (anum && bnum) {
        a = +a;
        b = +b;
      }
    
      return (anum && !bnum) ? -1 :
             (bnum && !anum) ? 1 :
             a < b ? -1 :
             a > b ? 1 :
             0;
    }
    
    exports.rcompareIdentifiers = rcompareIdentifiers;
    function rcompareIdentifiers(a, b) {
      return compareIdentifiers(b, a);
    }
    
    exports.major = major;
    function major(a, loose) {
      return new SemVer(a, loose).major;
    }
    
    exports.minor = minor;
    function minor(a, loose) {
      return new SemVer(a, loose).minor;
    }
    
    exports.patch = patch;
    function patch(a, loose) {
      return new SemVer(a, loose).patch;
    }
    
    exports.compare = compare;
    function compare(a, b, loose) {
      return new SemVer(a, loose).compare(b);
    }
    
    exports.compareLoose = compareLoose;
    function compareLoose(a, b) {
      return compare(a, b, true);
    }
    
    exports.rcompare = rcompare;
    function rcompare(a, b, loose) {
      return compare(b, a, loose);
    }
    
    exports.sort = sort;
    function sort(list, loose) {
      return list.sort(function(a, b) {
        return exports.compare(a, b, loose);
      });
    }
    
    exports.rsort = rsort;
    function rsort(list, loose) {
      return list.sort(function(a, b) {
        return exports.rcompare(a, b, loose);
      });
    }
    
    exports.gt = gt;
    function gt(a, b, loose) {
      return compare(a, b, loose) > 0;
    }
    
    exports.lt = lt;
    function lt(a, b, loose) {
      return compare(a, b, loose) < 0;
    }
    
    exports.eq = eq;
    function eq(a, b, loose) {
      return compare(a, b, loose) === 0;
    }
    
    exports.neq = neq;
    function neq(a, b, loose) {
      return compare(a, b, loose) !== 0;
    }
    
    exports.gte = gte;
    function gte(a, b, loose) {
      return compare(a, b, loose) >= 0;
    }
    
    exports.lte = lte;
    function lte(a, b, loose) {
      return compare(a, b, loose) <= 0;
    }
    
    exports.cmp = cmp;
    function cmp(a, op, b, loose) {
      var ret;
      switch (op) {
        case '===':
          if (typeof a === 'object') a = a.version;
          if (typeof b === 'object') b = b.version;
          ret = a === b;
          break;
        case '!==':
          if (typeof a === 'object') a = a.version;
          if (typeof b === 'object') b = b.version;
          ret = a !== b;
          break;
        case '': case '=': case '==': ret = eq(a, b, loose); break;
        case '!=': ret = neq(a, b, loose); break;
        case '>': ret = gt(a, b, loose); break;
        case '>=': ret = gte(a, b, loose); break;
        case '<': ret = lt(a, b, loose); break;
        case '<=': ret = lte(a, b, loose); break;
        default: throw new TypeError('Invalid operator: ' + op);
      }
      return ret;
    }
    
    exports.Comparator = Comparator;
    function Comparator(comp, loose) {
      if (comp instanceof Comparator) {
        if (comp.loose === loose)
          return comp;
        else
          comp = comp.value;
      }
    
      if (!(this instanceof Comparator))
        return new Comparator(comp, loose);
    
      debug('comparator', comp, loose);
      this.loose = loose;
      this.parse(comp);
    
      if (this.semver === ANY)
        this.value = '';
      else
        this.value = this.operator + this.semver.version;
    
      debug('comp', this);
    }
    
    var ANY = {};
    Comparator.prototype.parse = function(comp) {
      var r = this.loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
      var m = comp.match(r);
    
      if (!m)
        throw new TypeError('Invalid comparator: ' + comp);
    
      this.operator = m[1];
      if (this.operator === '=')
        this.operator = '';
    
      // if it literally is just '>' or '' then allow anything.
      if (!m[2])
        this.semver = ANY;
      else
        this.semver = new SemVer(m[2], this.loose);
    };
    
    Comparator.prototype.inspect = function() {
      return '<SemVer Comparator "' + this + '">';
    };
    
    Comparator.prototype.toString = function() {
      return this.value;
    };
    
    Comparator.prototype.test = function(version) {
      debug('Comparator.test', version, this.loose);
    
      if (this.semver === ANY)
        return true;
    
      if (typeof version === 'string')
        version = new SemVer(version, this.loose);
    
      return cmp(version, this.operator, this.semver, this.loose);
    };
    
    
    exports.Range = Range;
    function Range(range, loose) {
      if ((range instanceof Range) && range.loose === loose)
        return range;
    
      if (!(this instanceof Range))
        return new Range(range, loose);
    
      this.loose = loose;
    
      // First, split based on boolean or ||
      this.raw = range;
      this.set = range.split(/\s*\|\|\s*/).map(function(range) {
        return this.parseRange(range.trim());
      }, this).filter(function(c) {
        // throw out any that are not relevant for whatever reason
        return c.length;
      });
    
      if (!this.set.length) {
        throw new TypeError('Invalid SemVer Range: ' + range);
      }
    
      this.format();
    }
    
    Range.prototype.inspect = function() {
      return '<SemVer Range "' + this.range + '">';
    };
    
    Range.prototype.format = function() {
      this.range = this.set.map(function(comps) {
        return comps.join(' ').trim();
      }).join('||').trim();
      return this.range;
    };
    
    Range.prototype.toString = function() {
      return this.range;
    };
    
    Range.prototype.parseRange = function(range) {
      var loose = this.loose;
      range = range.trim();
      debug('range', range, loose);
      // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
      var hr = loose ? re[HYPHENRANGELOOSE] : re[HYPHENRANGE];
      range = range.replace(hr, hyphenReplace);
      debug('hyphen replace', range);
      // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
      range = range.replace(re[COMPARATORTRIM], comparatorTrimReplace);
      debug('comparator trim', range, re[COMPARATORTRIM]);
    
      // `~ 1.2.3` => `~1.2.3`
      range = range.replace(re[TILDETRIM], tildeTrimReplace);
    
      // `^ 1.2.3` => `^1.2.3`
      range = range.replace(re[CARETTRIM], caretTrimReplace);
    
      // normalize spaces
      range = range.split(/\s+/).join(' ');
    
      // At this point, the range is completely trimmed and
      // ready to be split into comparators.
    
      var compRe = loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
      var set = range.split(' ').map(function(comp) {
        return parseComparator(comp, loose);
      }).join(' ').split(/\s+/);
      if (this.loose) {
        // in loose mode, throw out any that are not valid comparators
        set = set.filter(function(comp) {
          return !!comp.match(compRe);
        });
      }
      set = set.map(function(comp) {
        return new Comparator(comp, loose);
      });
    
      return set;
    };
    
    // Mostly just for testing and legacy API reasons
    exports.toComparators = toComparators;
    function toComparators(range, loose) {
      return new Range(range, loose).set.map(function(comp) {
        return comp.map(function(c) {
          return c.value;
        }).join(' ').trim().split(' ');
      });
    }
    
    // comprised of xranges, tildes, stars, and gtlt's at this point.
    // already replaced the hyphen ranges
    // turn into a set of JUST comparators.
    function parseComparator(comp, loose) {
      debug('comp', comp);
      comp = replaceCarets(comp, loose);
      debug('caret', comp);
      comp = replaceTildes(comp, loose);
      debug('tildes', comp);
      comp = replaceXRanges(comp, loose);
      debug('xrange', comp);
      comp = replaceStars(comp, loose);
      debug('stars', comp);
      return comp;
    }
    
    function isX(id) {
      return !id || id.toLowerCase() === 'x' || id === '*';
    }
    
    // ~, ~> --> * (any, kinda silly)
    // ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0
    // ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0
    // ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0
    // ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0
    // ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0
    function replaceTildes(comp, loose) {
      return comp.trim().split(/\s+/).map(function(comp) {
        return replaceTilde(comp, loose);
      }).join(' ');
    }
    
    function replaceTilde(comp, loose) {
      var r = loose ? re[TILDELOOSE] : re[TILDE];
      return comp.replace(r, function(_, M, m, p, pr) {
        debug('tilde', comp, _, M, m, p, pr);
        var ret;
    
        if (isX(M))
          ret = '';
        else if (isX(m))
          ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
        else if (isX(p))
          // ~1.2 == >=1.2.0- <1.3.0-
          ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
        else if (pr) {
          debug('replaceTilde pr', pr);
          if (pr.charAt(0) !== '-')
            pr = '-' + pr;
          ret = '>=' + M + '.' + m + '.' + p + pr +
                ' <' + M + '.' + (+m + 1) + '.0';
        } else
          // ~1.2.3 == >=1.2.3 <1.3.0
          ret = '>=' + M + '.' + m + '.' + p +
                ' <' + M + '.' + (+m + 1) + '.0';
    
        debug('tilde return', ret);
        return ret;
      });
    }
    
    // ^ --> * (any, kinda silly)
    // ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0
    // ^2.0, ^2.0.x --> >=2.0.0 <3.0.0
    // ^1.2, ^1.2.x --> >=1.2.0 <2.0.0
    // ^1.2.3 --> >=1.2.3 <2.0.0
    // ^1.2.0 --> >=1.2.0 <2.0.0
    function replaceCarets(comp, loose) {
      return comp.trim().split(/\s+/).map(function(comp) {
        return replaceCaret(comp, loose);
      }).join(' ');
    }
    
    function replaceCaret(comp, loose) {
      debug('caret', comp, loose);
      var r = loose ? re[CARETLOOSE] : re[CARET];
      return comp.replace(r, function(_, M, m, p, pr) {
        debug('caret', comp, _, M, m, p, pr);
        var ret;
    
        if (isX(M))
          ret = '';
        else if (isX(m))
          ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
        else if (isX(p)) {
          if (M === '0')
            ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
          else
            ret = '>=' + M + '.' + m + '.0 <' + (+M + 1) + '.0.0';
        } else if (pr) {
          debug('replaceCaret pr', pr);
          if (pr.charAt(0) !== '-')
            pr = '-' + pr;
          if (M === '0') {
            if (m === '0')
              ret = '>=' + M + '.' + m + '.' + p + pr +
                    ' <' + M + '.' + m + '.' + (+p + 1);
            else
              ret = '>=' + M + '.' + m + '.' + p + pr +
                    ' <' + M + '.' + (+m + 1) + '.0';
          } else
            ret = '>=' + M + '.' + m + '.' + p + pr +
                  ' <' + (+M + 1) + '.0.0';
        } else {
          debug('no pr');
          if (M === '0') {
            if (m === '0')
              ret = '>=' + M + '.' + m + '.' + p +
                    ' <' + M + '.' + m + '.' + (+p + 1);
            else
              ret = '>=' + M + '.' + m + '.' + p +
                    ' <' + M + '.' + (+m + 1) + '.0';
          } else
            ret = '>=' + M + '.' + m + '.' + p +
                  ' <' + (+M + 1) + '.0.0';
        }
    
        debug('caret return', ret);
        return ret;
      });
    }
    
    function replaceXRanges(comp, loose) {
      debug('replaceXRanges', comp, loose);
      return comp.split(/\s+/).map(function(comp) {
        return replaceXRange(comp, loose);
      }).join(' ');
    }
    
    function replaceXRange(comp, loose) {
      comp = comp.trim();
      var r = loose ? re[XRANGELOOSE] : re[XRANGE];
      return comp.replace(r, function(ret, gtlt, M, m, p, pr) {
        debug('xRange', comp, ret, gtlt, M, m, p, pr);
        var xM = isX(M);
        var xm = xM || isX(m);
        var xp = xm || isX(p);
        var anyX = xp;
    
        if (gtlt === '=' && anyX)
          gtlt = '';
    
        if (xM) {
          if (gtlt === '>' || gtlt === '<') {
            // nothing is allowed
            ret = '<0.0.0';
          } else {
            // nothing is forbidden
            ret = '*';
          }
        } else if (gtlt && anyX) {
          // replace X with 0
          if (xm)
            m = 0;
          if (xp)
            p = 0;
    
          if (gtlt === '>') {
            // >1 => >=2.0.0
            // >1.2 => >=1.3.0
            // >1.2.3 => >= 1.2.4
            gtlt = '>=';
            if (xm) {
              M = +M + 1;
              m = 0;
              p = 0;
            } else if (xp) {
              m = +m + 1;
              p = 0;
            }
          } else if (gtlt === '<=') {
            // <=0.7.x is actually <0.8.0, since any 0.7.x should
            // pass.  Similarly, <=7.x is actually <8.0.0, etc.
            gtlt = '<'
            if (xm)
              M = +M + 1
            else
              m = +m + 1
          }
    
          ret = gtlt + M + '.' + m + '.' + p;
        } else if (xm) {
          ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
        } else if (xp) {
          ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
        }
    
        debug('xRange return', ret);
    
        return ret;
      });
    }
    
    // Because * is AND-ed with everything else in the comparator,
    // and '' means "any version", just remove the *s entirely.
    function replaceStars(comp, loose) {
      debug('replaceStars', comp, loose);
      // Looseness is ignored here.  star is always as loose as it gets!
      return comp.trim().replace(re[STAR], '');
    }
    
    // This function is passed to string.replace(re[HYPHENRANGE])
    // M, m, patch, prerelease, build
    // 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
    // 1.2.3 - 3.4 => >=1.2.0 <3.5.0 Any 3.4.x will do
    // 1.2 - 3.4 => >=1.2.0 <3.5.0
    function hyphenReplace($0,
                           from, fM, fm, fp, fpr, fb,
                           to, tM, tm, tp, tpr, tb) {
    
      if (isX(fM))
        from = '';
      else if (isX(fm))
        from = '>=' + fM + '.0.0';
      else if (isX(fp))
        from = '>=' + fM + '.' + fm + '.0';
      else
        from = '>=' + from;
    
      if (isX(tM))
        to = '';
      else if (isX(tm))
        to = '<' + (+tM + 1) + '.0.0';
      else if (isX(tp))
        to = '<' + tM + '.' + (+tm + 1) + '.0';
      else if (tpr)
        to = '<=' + tM + '.' + tm + '.' + tp + '-' + tpr;
      else
        to = '<=' + to;
    
      return (from + ' ' + to).trim();
    }
    
    
    // if ANY of the sets match ALL of its comparators, then pass
    Range.prototype.test = function(version) {
      if (!version)
        return false;
    
      if (typeof version === 'string')
        version = new SemVer(version, this.loose);
    
      for (var i = 0; i < this.set.length; i++) {
        if (testSet(this.set[i], version))
          return true;
      }
      return false;
    };
    
    function testSet(set, version) {
      for (var i = 0; i < set.length; i++) {
        if (!set[i].test(version))
          return false;
      }
    
      if (version.prerelease.length) {
        // Find the set of versions that are allowed to have prereleases
        // For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
        // That should allow `1.2.3-pr.2` to pass.
        // However, `1.2.4-alpha.notready` should NOT be allowed,
        // even though it's within the range set by the comparators.
        for (var i = 0; i < set.length; i++) {
          debug(set[i].semver);
          if (set[i].semver === ANY)
            continue;
    
          if (set[i].semver.prerelease.length > 0) {
            var allowed = set[i].semver;
            if (allowed.major === version.major &&
                allowed.minor === version.minor &&
                allowed.patch === version.patch)
              return true;
          }
        }
    
        // Version has a -pre, but it's not one of the ones we like.
        return false;
      }
    
      return true;
    }
    
    exports.satisfies = satisfies;
    function satisfies(version, range, loose) {
      try {
        range = new Range(range, loose);
      } catch (er) {
        return false;
      }
      return range.test(version);
    }
    
    exports.maxSatisfying = maxSatisfying;
    function maxSatisfying(versions, range, loose) {
      return versions.filter(function(version) {
        return satisfies(version, range, loose);
      }).sort(function(a, b) {
        return rcompare(a, b, loose);
      })[0] || null;
    }
    
    exports.validRange = validRange;
    function validRange(range, loose) {
      try {
        // Return '*' instead of '' so that truthiness works.
        // This will throw if it's invalid anyway
        return new Range(range, loose).range || '*';
      } catch (er) {
        return null;
      }
    }
    
    // Determine if version is less than all the versions possible in the range
    exports.ltr = ltr;
    function ltr(version, range, loose) {
      return outside(version, range, '<', loose);
    }
    
    // Determine if version is greater than all the versions possible in the range.
    exports.gtr = gtr;
    function gtr(version, range, loose) {
      return outside(version, range, '>', loose);
    }
    
    exports.outside = outside;
    function outside(version, range, hilo, loose) {
      version = new SemVer(version, loose);
      range = new Range(range, loose);
    
      var gtfn, ltefn, ltfn, comp, ecomp;
      switch (hilo) {
        case '>':
          gtfn = gt;
          ltefn = lte;
          ltfn = lt;
          comp = '>';
          ecomp = '>=';
          break;
        case '<':
          gtfn = lt;
          ltefn = gte;
          ltfn = gt;
          comp = '<';
          ecomp = '<=';
          break;
        default:
          throw new TypeError('Must provide a hilo val of "<" or ">"');
      }
    
      // If it satisifes the range it is not outside
      if (satisfies(version, range, loose)) {
        return false;
      }
    
      // From now on, variable terms are as if we're in "gtr" mode.
      // but note that everything is flipped for the "ltr" function.
    
      for (var i = 0; i < range.set.length; ++i) {
        var comparators = range.set[i];
    
        var high = null;
        var low = null;
    
        comparators.forEach(function(comparator) {
          if (comparator.semver === ANY) {
            comparator = new Comparator('>=0.0.0')
          }
          high = high || comparator;
          low = low || comparator;
          if (gtfn(comparator.semver, high.semver, loose)) {
            high = comparator;
          } else if (ltfn(comparator.semver, low.semver, loose)) {
            low = comparator;
          }
        });
    
        // If the edge version comparator has a operator then our version
        // isn't outside it
        if (high.operator === comp || high.operator === ecomp) {
          return false;
        }
    
        // If the lowest version comparator has an operator and our version
        // is less than it then it isn't higher than the range
        if ((!low.operator || low.operator === comp) &&
            ltefn(version, low.semver)) {
          return false;
        } else if (low.operator === ecomp && ltfn(version, low.semver)) {
          return false;
        }
      }
      return true;
    }
    
    // Use the define() function if we're in AMD land
    if (typeof define === 'function' && define.amd)
      define(exports);
    
  provide("semver", module.exports);
}(global));

// pakmanager:tildify
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  'use strict';
    var osHomedir = require('os-homedir');
    var home = osHomedir();
    
    module.exports = function (str) {
    	return str.replace(home, '~');
    };
    
  provide("tildify", module.exports);
}(global));

// pakmanager:v8flags
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  // this entire module is depressing. i should have spent my time learning
    // how to patch v8 so that these options would just be available on the
    // process object.
    
    const os = require('os');
    const fs = require('fs');
    const path = require('path');
    const execFile = require('child_process').execFile;
    const env = process.env;
    const user = env.LOGNAME || env.USER || env.LNAME || env.USERNAME;
    const configfile = '.v8flags.'+process.versions.v8+'.'+user+'.json';
    const exclusions = ['--help'];
    
    const failureMessage = [
      'Unable to cache a config file for v8flags to a your home directory',
      'or a temporary folder. To fix this problem, please correct your',
      'environment by setting HOME=/path/to/home or TEMP=/path/to/temp.',
      'NOTE: the user running this must be able to access provided path.',
      'If all else fails, please open an issue here:',
      'http://github.com/tkellen/js-v8flags'
    ].join('\n');
    
    function fail (err) {
      err.message += '\n\n' + failureMessage;
      return err;
    }
    
    function openConfig (cb) {
      var userHome = require('user-home');
      var configpath = path.join(userHome || os.tmpdir(), configfile);
      var content;
      try {
        content = require(configpath);
        process.nextTick(function () {
          cb(null, content);
        });
      } catch (e) {
        fs.open(configpath, 'w+', function (err, fd) {
          if (err) {
            return cb(fail(err));
          }
          return cb(null, fd);
        });
      }
    }
    
    function writeConfig (fd, cb) {
      execFile(process.execPath, ['--v8-options'], function (execErr, result) {
        var flags;
        if (execErr) {
          return cb(execErr);
        }
        flags = result.match(/\s\s--(\w+)/gm).map(function (match) {
          return match.substring(2);
        }).filter(function (name) {
          return exclusions.indexOf(name) === -1;
        });
        var buf = new Buffer(JSON.stringify(flags));
        fs.write(fd, buf, 0, buf.length, 0, function (writeErr, bytesWritten, buffer) {
          fs.close(fd, function (closeErr) {
            var err = writeErr || closeErr;
            if (err) {
              return cb(fail(err));
            }
            return cb(null, JSON.parse(buffer.toString()));
          });
        });
      });
    }
    
    module.exports = function (cb) {
      openConfig(function (err, result) {
        if (err) {
          return cb(fail(err));
        }
        if (typeof result === 'number') {
          return writeConfig(result, cb);
        }
        return cb(null, result);
      });
    };
    
    module.exports.configfile = configfile;
    
  provide("v8flags", module.exports);
}(global));

// pakmanager:vinyl-fs/lib/src/getContents/streamFile
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  'use strict';
    
    var fs = require('graceful-fs');
    var stripBom = require('strip-bom');
    
    function streamFile(file, cb) {
      file.contents = fs.createReadStream(file.path)
        .pipe(stripBom.stream());
    
      cb(null, file);
    }
    
    module.exports = streamFile;
    
  provide("vinyl-fs/lib/src/getContents/streamFile", module.exports);
}(global));

// pakmanager:vinyl-fs/lib/src/getContents/readDir
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  'use strict';
    
    function readDir(file, cb) {
      // do nothing for now
      cb(null, file);
    }
    
    module.exports = readDir;
    
  provide("vinyl-fs/lib/src/getContents/readDir", module.exports);
}(global));

// pakmanager:vinyl-fs/lib/src/getContents/bufferFile
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  'use strict';
    
    var fs = require('graceful-fs');
    var stripBom = require('strip-bom');
    
    function bufferFile(file, cb) {
      fs.readFile(file.path, function(err, data) {
        if (err) {
          return cb(err);
        }
        file.contents = stripBom(data);
        cb(null, file);
      });
    }
    
    module.exports = bufferFile;
    
  provide("vinyl-fs/lib/src/getContents/bufferFile", module.exports);
}(global));

// pakmanager:vinyl-fs/lib/dest/writeContents/writeDir
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  'use strict';
    
    var mkdirp = require('mkdirp');
    
    function writeDir(writePath, file, cb) {
      mkdirp(writePath, file.stat.mode, cb);
    }
    
    module.exports = writeDir;
    
  provide("vinyl-fs/lib/dest/writeContents/writeDir", module.exports);
}(global));

// pakmanager:vinyl-fs/lib/dest/writeContents/writeStream
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  'use strict';
    
    var streamFile =  require('vinyl-fs/lib/src/getContents/streamFile');
    var fs = require('graceful-fs');
    
    function writeStream(writePath, file, cb) {
      var opt = {
        mode: file.stat.mode,
        flag: file.flag
      };
    
      var outStream = fs.createWriteStream(writePath, opt);
    
      file.contents.once('error', complete);
      outStream.once('error', complete);
      outStream.once('finish', success);
    
      file.contents.pipe(outStream);
    
      function success() {
        streamFile(file, complete);
      }
    
      // cleanup
      function complete(err) {
        file.contents.removeListener('error', cb);
        outStream.removeListener('error', cb);
        outStream.removeListener('finish', success);
        cb(err);
      }
    }
    
    module.exports = writeStream;
    
  provide("vinyl-fs/lib/dest/writeContents/writeStream", module.exports);
}(global));

// pakmanager:vinyl-fs/lib/dest/writeContents/writeBuffer
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  'use strict';
    
    var fs = require('graceful-fs');
    
    function writeBuffer(writePath, file, cb) {
      var opt = {
        mode: file.stat.mode,
        flag: file.flag
      };
    
      fs.writeFile(writePath, file.contents, opt, cb);
    }
    
    module.exports = writeBuffer;
    
  provide("vinyl-fs/lib/dest/writeContents/writeBuffer", module.exports);
}(global));

// pakmanager:vinyl-fs/lib/src/filterSince
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  'use strict';
    
    var through2 = require('through2');
    
    function filterSince(since) {
      return through2.obj(filter(since));
    }
    
    function filter(since) {
      return function(file, enc, cb) {
        if (since < file.stat.mtime) {
          return cb(null, file);
        }
        cb();
      };
    }
    
    module.exports = filterSince;
    
  provide("vinyl-fs/lib/src/filterSince", module.exports);
}(global));

// pakmanager:vinyl-fs/lib/src/getContents
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  'use strict';
    
    var through2 = require('through2');
    var readDir =  require('vinyl-fs/lib/src/getContents/readDir');
    var bufferFile =  require('vinyl-fs/lib/src/getContents/bufferFile');
    var streamFile =  require('vinyl-fs/lib/src/getContents/streamFile');
    
    function getContents(opt) {
      return through2.obj(function(file, enc, cb) {
        // don't fail to read a directory
        if (file.isDirectory()) {
          return readDir(file, cb);
        }
    
        // read and pass full contents
        if (opt.buffer !== false) {
          return bufferFile(file, cb);
        }
    
        // dont buffer anything - just pass streams
        return streamFile(file, cb);
      });
    }
    
    module.exports = getContents;
    
  provide("vinyl-fs/lib/src/getContents", module.exports);
}(global));

// pakmanager:vinyl-fs/lib/src/resolveSymlinks
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  'use strict';
    
    var through2 = require('through2');
    var fs = require('graceful-fs');
    var path = require('path');
    
    function resolveSymlinks() {
      return through2.obj(resolveFile);
    }
    
    // a stat property is exposed on file objects as a (wanted) side effect
    function resolveFile(globFile, enc, cb) {
      fs.lstat(globFile.path, function (err, stat) {
        if (err) {
          return cb(err);
        }
    
        globFile.stat = stat;
    
        if (!stat.isSymbolicLink()) {
          return cb(null, globFile);
        }
    
        fs.realpath(globFile.path, function (err, filePath) {
          if (err) {
            return cb(err);
          }
    
          globFile.base = path.dirname(filePath);
          globFile.path = filePath;
    
          // recurse to get real file stat
          resolveFile(globFile, enc, cb);
        });
      });
    }
    
    module.exports = resolveSymlinks;
    
  provide("vinyl-fs/lib/src/resolveSymlinks", module.exports);
}(global));

// pakmanager:vinyl-fs/lib/prepareWrite
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  'use strict';
    
    var assign = require('object-assign');
    var path = require('path');
    var mkdirp = require('mkdirp');
    var fs = require('graceful-fs');
    
    function prepareWrite(outFolder, file, opt, cb) {
      var options = assign({
        cwd: process.cwd(),
        mode: (file.stat ? file.stat.mode : null),
        dirMode: null,
        overwrite: true
      }, opt);
      options.flag = (options.overwrite ? 'w' : 'wx');
    
      var cwd = path.resolve(options.cwd);
    
      if (typeof outFolder !== 'string' && typeof outFolder !== 'function') {
        throw new Error('Invalid output folder');
      }
    
      var outFolderPath = (
        typeof outFolder === 'string' ? outFolder : outFolder(file)
      );
      var basePath = path.resolve(cwd, outFolderPath);
      var writePath = path.resolve(basePath, file.relative);
      var writeFolder = path.dirname(writePath);
    
      // wire up new properties
      file.stat = (file.stat || new fs.Stats());
      file.stat.mode = options.mode;
      file.flag = options.flag;
      file.cwd = cwd;
      file.base = basePath;
      file.path = writePath;
    
      // mkdirp the folder the file is going in
      mkdirp(writeFolder, options.dirMode, function(err){
        if (err) {
          return cb(err);
        }
        cb(null, writePath);
      });
    }
    
    module.exports = prepareWrite;
    
  provide("vinyl-fs/lib/prepareWrite", module.exports);
}(global));

// pakmanager:vinyl-fs/lib/dest/writeContents
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  'use strict';
    
    var fs = require('fs');
    var writeDir =  require('vinyl-fs/lib/dest/writeContents/writeDir');
    var writeStream =  require('vinyl-fs/lib/dest/writeContents/writeStream');
    var writeBuffer =  require('vinyl-fs/lib/dest/writeContents/writeBuffer');
    
    function writeContents(writePath, file, cb) {
      // if directory then mkdirp it
      if (file.isDirectory()) {
        return writeDir(writePath, file, written);
      }
    
      // stream it to disk yo
      if (file.isStream()) {
        return writeStream(writePath, file, written);
      }
    
      // write it like normal
      if (file.isBuffer()) {
        return writeBuffer(writePath, file, written);
      }
    
      // if no contents then do nothing
      if (file.isNull()) {
        return complete();
      }
    
      function complete(err) {
        cb(err, file);
      }
    
      function written(err) {
    
        if (isErrorFatal(err)) {
          return complete(err);
        }
    
        if (!file.stat || typeof file.stat.mode !== 'number') {
          return complete();
        }
    
        fs.stat(writePath, function(err, st) {
          if (err) {
            return complete(err);
          }
          // octal 7777 = decimal 4095
          var currentMode = (st.mode & 4095);
          if (currentMode === file.stat.mode) {
            return complete();
          }
          fs.chmod(writePath, file.stat.mode, complete);
        });
      }
    
      function isErrorFatal(err) {
        if (!err) {
          return false;
        }
    
        // Handle scenario for file overwrite failures.
        else if (err.code === 'EEXIST' && file.flag === 'wx') {
          return false;   // "These aren't the droids you're looking for"
        }
    
        // Otherwise, this is a fatal error
        return true;
      }
    }
    
    module.exports = writeContents;
    
  provide("vinyl-fs/lib/dest/writeContents", module.exports);
}(global));

// pakmanager:vinyl-fs/lib/src
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  'use strict';
    
    var assign = require('object-assign');
    var through = require('through2');
    var gs = require('glob-stream');
    var File = require('vinyl');
    var duplexify = require('duplexify');
    var merge = require('merge-stream');
    
    var filterSince =  require('vinyl-fs/lib/src/filterSince');
    var getContents =  require('vinyl-fs/lib/src/getContents');
    var resolveSymlinks =  require('vinyl-fs/lib/src/resolveSymlinks');
    
    function createFile(globFile, enc, cb) {
      cb(null, new File(globFile));
    }
    
    function src(glob, opt) {
      var options = assign({
        read: true,
        buffer: true
      }, opt);
      var pass, inputPass;
    
      if (!isValidGlob(glob)) {
        throw new Error('Invalid glob argument: ' + glob);
      }
      // return dead stream if empty array
      if (Array.isArray(glob) && glob.length === 0) {
        pass = through.obj();
        if (!options.passthrough) {
          process.nextTick(pass.end.bind(pass));
        }
        return pass;
      }
    
      var globStream = gs.create(glob, options);
    
      var outputStream = globStream
        .pipe(resolveSymlinks())
        .pipe(through.obj(createFile));
    
      if (options.since) {
        outputStream = outputStream
          .pipe(filterSince(options.since));
      }
    
      if (options.read !== false) {
        outputStream = outputStream
          .pipe(getContents(options));
      }
    
      if (options.passthrough) {
        inputPass = through.obj();
        outputStream = duplexify.obj(inputPass, merge(outputStream, inputPass));
      }
    
      return outputStream;
    }
    
    function isValidGlob(glob) {
      if (typeof glob === 'string') {
        return true;
      }
      if (!Array.isArray(glob)) {
        return false;
      }
      if (glob.length !== 0) {
        return glob.every(isValidGlob);
      }
      return true;
    }
    
    module.exports = src;
    
  provide("vinyl-fs/lib/src", module.exports);
}(global));

// pakmanager:vinyl-fs/lib/dest
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  'use strict';
    
    var through2 = require('through2');
    var prepareWrite =  require('vinyl-fs/lib/prepareWrite');
    var writeContents =  require('vinyl-fs/lib/dest/writeContents');
    
    function dest(outFolder, opt) {
      function saveFile(file, enc, cb) {
        prepareWrite(outFolder, file, opt, function(err, writePath) {
          if (err) {
            return cb(err);
          }
          writeContents(writePath, file, cb);
        });
      }
    
      var stream = through2.obj(saveFile);
      // TODO: option for either backpressure or lossy
      stream.resume();
      return stream;
    }
    
    module.exports = dest;
    
  provide("vinyl-fs/lib/dest", module.exports);
}(global));

// pakmanager:vinyl-fs/lib/symlink
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  'use strict';
    
    var through2 = require('through2');
    var fs = require('graceful-fs');
    var prepareWrite =  require('vinyl-fs/lib/prepareWrite');
    
    function symlink(outFolder, opt) {
      function linkFile(file, enc, cb) {
        var srcPath = file.path;
    
        prepareWrite(outFolder, file, opt, function(err, writePath) {
          if (err) {
            return cb(err);
          }
          fs.symlink(srcPath, writePath, function(err) {
            if (err && err.code !== 'EEXIST') {
              return cb(err);
            }
            cb(null, file);
          });
        });
      }
    
      var stream = through2.obj(linkFile);
      // TODO: option for either backpressure or lossy
      stream.resume();
      return stream;
    }
    
    module.exports = symlink;
    
  provide("vinyl-fs/lib/symlink", module.exports);
}(global));

// pakmanager:vinyl-fs
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  'use strict';
    
    module.exports = {
      src:  require('vinyl-fs/lib/src'),
      dest:  require('vinyl-fs/lib/dest'),
      symlink:  require('vinyl-fs/lib/symlink'),
      watch: require('glob-watcher')
    };
    
  provide("vinyl-fs", module.exports);
}(global));

// pakmanager:gulp
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  'use strict';
    
    var util = require('util');
    var Orchestrator = require('orchestrator');
    var gutil = require('gulp-util');
    var deprecated = require('deprecated');
    var vfs = require('vinyl-fs');
    
    function Gulp() {
      Orchestrator.call(this);
    }
    util.inherits(Gulp, Orchestrator);
    
    Gulp.prototype.task = Gulp.prototype.add;
    Gulp.prototype.run = function() {
      // `run()` is deprecated as of 3.5 and will be removed in 4.0
      // Use task dependencies instead
    
      // Impose our opinion of "default" tasks onto orchestrator
      var tasks = arguments.length ? arguments : ['default'];
    
      this.start.apply(this, tasks);
    };
    
    Gulp.prototype.src = vfs.src;
    Gulp.prototype.dest = vfs.dest;
    Gulp.prototype.watch = function(glob, opt, fn) {
      if (typeof opt === 'function' || Array.isArray(opt)) {
        fn = opt;
        opt = null;
      }
    
      // Array of tasks given
      if (Array.isArray(fn)) {
        return vfs.watch(glob, opt, function() {
          this.start.apply(this, fn);
        }.bind(this));
      }
    
      return vfs.watch(glob, opt, fn);
    };
    
    // Let people use this class from our instance
    Gulp.prototype.Gulp = Gulp;
    
    // Deprecations
    deprecated.field('gulp.env has been deprecated. ' +
      'Use your own CLI parser instead. ' +
      'We recommend using yargs or minimist.',
      console.warn,
      Gulp.prototype,
      'env',
      gutil.env
    );
    
    Gulp.prototype.run = deprecated.method('gulp.run() has been deprecated. ' +
      'Use task dependencies or gulp.watch task triggering instead.',
      console.warn,
      Gulp.prototype.run
    );
    
    var inst = new Gulp();
    module.exports = inst;
    
  provide("gulp", module.exports);
}(global));

// pakmanager:word-wrap
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  /*!
     * word-wrap <https://github.com/jonschlinkert/word-wrap>
     *
     * Copyright (c) 2014-2015, Jon Schlinkert.
     * Licensed under the MIT License.
     *
     * Adapted from http://james.padolsey.com/javascript/wordwrap-for-javascript/
     * @attribution
     */
    
    module.exports = function(str, options) {
      options = options || {};
      if (str == null) {
        return str;
      }
    
      var width = options.width || 50;
      var indent = (typeof options.indent === 'string')
        ? options.indent
        : '  ';
    
      var newline = options.newline || '\n' + indent;
    
      var re = new RegExp('.{1,' + width + '}(\\s+|$)|\\S+?(\\s+|$)', 'g');
      var lines = str.match(re) || [];
      var res = indent + lines.join(newline);
    
      if (options.trim === true) {
        res = res.replace(/[ \t]*$/gm, '');
      }
      return res;
    };
    
  provide("word-wrap", module.exports);
}(global));

// pakmanager:gulp-display-help
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  "use strict";
    
    var chalk = require('chalk');
    var wordWrap = require('word-wrap');
    var gulp = require('gulp');
    
    
    module.exports = function (taskList, descriptions, excludes, flagDescriptions, styles) {
    
    	//private functions - local
    	var __isDefObj,
    		__rmPrivate,
    		__validateFixFlagDescriptions,
    		__formatDefName,
    		__calculateIndent,
    		__initDisplay,
    		__displayUsage, 
    		__displayFlag,
    		__displayTask,
    		__displayNoDescriptionTask,
    		__displayFlagDescriptions;
    
    	//Formatting for the task's help text title
    	__formatDefName = function(name){
    		return chalk.bold((name + wrapSettings.indent)
    				.substr(0, wrapSettings.indent.length));
    	}
    	__formatDefName
    
    
    	//wordWrap settings
    	var wrapSettings = {
    			indent: '                             ', 
    			width: '60',
    	};
    
    //	Styles to implement
    //	mainTitleColor: 
    //	minorTitleColor: 
    //	defColor: 
    //	mainTextColor: 
    
    	
    /***************************** UTILITY FUNCTIONS *****************************/
    	/**
    	 * @private
    	 * Remove tasks on the 'exclude' list from the 'tasks' object, preventing
    	 * them from being displayed in the outputted help file.
    	 */
    	__rmPrivate = function(excludes, tasks) {
    		excludes.forEach(function(item, index){
    			if (tasks.hasOwnProperty(item)){
    				delete tasks[item];
    			}
    		});
    		return tasks;
    	}
    
    	/**
    	 * @private
    	 * Check if an object passed to this module is valid
    	 */
    	__isDefObj = function(item){
    	    if (typeof item !== "undefined" && 
    	    	item !== null && 
    	    	typeof item !== 'string' && 
    	    	(!(Object.keys(item).length <= 0)) &&
    	    	typeof item === 'object')
    	    {
    
    	    	return (Object.keys(item)).every(function(key, index){
    	            if (typeof key !== 'string' || 
    	            	typeof item[key] !== 'string'){
    	                	return false;
    	            }
    	            return true;
    	        });
    	    }
    
    	    return false;
    	}
    
    
    	/**
    	 * @private
    	 * List of flags (e.g. --production) & descriptions of each
    	 * 
    	 * @param flagDescriptions {Object}
    	 * @param indentString {Object}
    	 * @param indent {Object}
    	 */
    	__validateFixFlagDescriptions = function(flagDescriptions, indentString, indent){
    		var origFlag;
    		
    		if (__isDefObj(flagDescriptions)){
    
    			Object.keys(flagDescriptions).forEach(function (flag) {
    				
    				if (flag.toString().slice(0, 2) !== "--"){
    					if (flag.toString().slice(0,1) !== "-") {
    						origFlag = flag;
    						flag = "--" + flag;
    						flagDescriptions[flag] = flagDescriptions[origFlag];
    						delete flagDescriptions[origFlag];
    					} else {
    						origFlag = flag;
    						flag = "-" + flag;
    						flagDescriptions[flag] = flagDescriptions[origFlag];
    						delete flagDescriptions[origFlag];
    					}
    				}
    			});
    			return flagDescriptions;
    		}
    		return false;
    	};
    
    
    	/**
    	 * Returns the appropriate indent size given the flags and task names 
    	 * provided (with those excluded already eliminated).
    	 */
    	__calculateIndent = function(tasks, flagDescriptions){
    		var flags, allNames = [];
    		
    		//create array of all task & flag names (for determining longest item, to get for indent size)
    		tasks.forEach(function(item, index){
    			allNames.push(item);
    		});	
    		if (__isDefObj(flagDescriptions)){
    			flags = Object.keys(flagDescriptions);
    			flags.forEach(function(item, index){
    				allNames.push(item);
    			});		
    		}
    		
    		//Determine length of indent & set up an indent string
    		return allNames.reduce(function (winner, current) {
    			return Math.max(current.length, winner);
    		}, 0);
    	}
    	
    
    	/**
    	 * Formats/styles the title of the task or flag
    	 */
    	__formatDefName = function(name){
    		return chalk.bold((name + wrapSettings.indent)
    				.substr(0, wrapSettings.indent.length));
    	}
    	/*****************************************************************************/
    
    
    
    	/***************************** DISPLAY FUNCTIONS *****************************/
    	/**
    	 * @private
    	 * Display Gulpfile usage section
    	 * @param taskList {Object}
    	 */
    	__displayUsage = function(taskList) {
    		var isDefault, isFlags, isTasks;
    		
    		//Main title
    		console.log("\n\n" + chalk.bold("***************************************"));
    		console.log(chalk.bold("  GULP COMMANDS AVAILABLE FOR PROJECT"));
    		console.log(chalk.bold("***************************************"));
    		console.log("\n" + chalk.bold.underline("SYNOPSIS"));
    		
    		if (flagDescriptions !== "undefined" && 
    				flagDescriptions !== null) isFlags = true;
    		else isFlags = false;
    		
    		isDefault = (Object.keys(taskList)).some(function(key, index){
    			if (key === "default") return true;
    			else isTasks = true;
    			return false;
    		});
    
    		if (isDefault) console.log("gulp");
    		if (isFlags) console.log("gulp [OPTIONS]");
    		if (isTasks) console.log("gulp [TASK]");
    		if (isFlags && isTasks) console.log("gulp [TASK] [OPTIONS]");
    		return true;
    	}
    
    
    	/**
    	 * @private
    	 * Handle display of tasks & flags with descriptions provided
    	 * (Still needs a bit of fixup)
    	 * 
    	 * @param item {String} Name of task or flag
    	 * @param prettyDefName {Chalk} Name of task or flag, formatted for display
    	 */
    	__displayFlag = function(item, prettyDefName, defs){
    		var defStr, firstLn, rest;
    
    		defStr = defs[item];
    		firstLn = (defStr.slice(0, wrapSettings.width));
    		rest = (defStr.slice(wrapSettings.width, defStr.length));
    		
    		//Display the definition (both title and description)
    		console.log(prettyDefName + ' - ' + firstLn);
    		console.log(wordWrap(rest + "\n", {indent: wrapSettings.indent + "   ",
    										   width: wrapSettings.width}));
    	}
    
    	/**
    	 * @private
    	 * Taskrunner tasks with no description: log name, list of tasks it runs
    	 */
    	__displayNoDescriptionTask = function(prettyTaskName, dep, depStr){
    
    		//display tasks with task lists & no description
    		if (dep.length) {
    			//Single line task list
    			if (depStr.length <= wrapSettings.width){
    				console.log(prettyTaskName + ' - ' + depStr + '\n');
    
    			//Multiline tasklist
    			} else {
    				__displayTask(depStr, prettyTaskName);
    			}
    
    		//Output task name only, if no description or task list
    		} else {
    			console.log(prettyTaskName + '\n');
    		}
    	}
    
    
    	/**
    	 * @private
    	 * Handle display of help text for tasks with tasklists spanning multiple lines
    	 */ 
    	__displayTask = function(depStr, prettyTaskName){
    		var rest, firstLn, partialEndWord;
    		
    		//Display single-line definitions
    		if (depStr.length < wrapSettings.width) {
    			console.log(prettyTaskName + ' - ' + depStr);
    
    		//Display multiline definitions
    		} else {
    			firstLn = depStr.toString().slice(0, wrapSettings.width);
    			
    			if (firstLn.slice(-1).match(/[a-zA-Z0-9_]$/g) !== null) {  //determines if partial word at end
    				partialEndWord = (firstLn.match(/\s[^s]*$/))[0]; 		//gets partial word at end
    				firstLn = firstLn.slice(0, firstLn.length - partialEndWord.length);
    				rest = partialEndWord.slice(1) + depStr.slice(wrapSettings.width,
    						depStr.length) + '\n';
    				
    			} else {
    				rest = depStr.slice(wrapSettings.width, depStr.length) + '\n';
    			}
    			
    			console.log(prettyTaskName + ' - ' + firstLn);
    			console.log(wordWrap(rest, { indent: wrapSettings.indent + "   ", width: wrapSettings.width }));
    		}
    
    	}
    
    
    	/**
    	 * Kickstart the sequence of displaying all items - figure out how each
    	 * item should be displayed and what function to handle it
    	 * 
    	 * @param taskList {Array}
    	 * @param descriptions {Object}
    	 * @param flags {Object}
    	 */
    	__initDisplay = function(taskList, descriptions, flags, flagDescriptions){
    		var prettyDefName, dep, depStr;
    
    		//Show main synopsis of command structure
    		__displayUsage(taskList);
    		
    		//Show registered tasks title:
    		console.log('\n' + chalk.bold.underline('\nREGISTERED TASKS'));
    		
    		//Display the taskname and its description
    		Object.keys(taskList).forEach(function (task) {
    			prettyDefName = __formatDefName(task);
    
    			//tasks with descriptions: Output of name & task description to log
    			if (task in descriptions) {
    				__displayTask(descriptions[task], prettyDefName);
    
    			//tasks with no descriptions
    			} else {
    				dep = taskList[task].dep;
    				depStr = 'Runs ' + dep.join(', ');
    				__displayNoDescriptionTask(prettyDefName, dep, depStr);				
    			}
    			
    		});
    
    		//Display options (aka flags) title
    		console.log('\n' + chalk.bold.underline('\nOPTIONS'));
    
    		//Display the flags and their descriptions
    		Object.keys(flagDescriptions).forEach(function(flag) {
    			prettyDefName = __formatDefName(flag);
    	
    			__displayFlag(flag, prettyDefName, flagDescriptions);
    			return true;
    		});
    	}
    	/*****************************************************************************/
    	
    	
    	
    
    
    /***************************************** EXPORT *****************************************/
    /**
     * @public
     * exported gulp help object
     */
    return function () {
    	var tasks, indentLength, flags;
    	descriptions = descriptions || {};
    
    	//Remove excluded tasks from the task list
    	if ((typeof excludes !== "undefined") && 
    			(excludes !== null) && (Array.isArray(excludes))) {
    		taskList = __rmPrivate(excludes, taskList);
    	}
    
    	//prefixes flag names with '--' (if -- not present already)
    	flagDescriptions = __validateFixFlagDescriptions(flagDescriptions);
    	
    	indentLength = __calculateIndent(Object.keys(taskList), flagDescriptions);
    	wrapSettings.indent = (new Array(indentLength+1)).join(' ');
    
    	__initDisplay(taskList, descriptions, flags, flagDescriptions);
    	
      };
    
    
    };
  provide("gulp-display-help", module.exports);
}(global));