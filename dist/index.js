var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var DEFAULT_OPTS = {
    log: true,
    timeout: 30000,
};
var DEFAULT_IFRAME_SELECTOR = 'iframe';
function sleep(timeout) {
    return new Promise(function (resolve) { return setTimeout(resolve, timeout); });
}
function timeout(cb, timeout) {
    return new Promise(function (resolve) {
        var done = false;
        var finish = function () { return done || resolve(); };
        cb().then(finish);
        sleep(timeout).then(finish);
    });
}
var frameLoaded = function (selector, opts) {
    if (selector === undefined) {
        selector = DEFAULT_IFRAME_SELECTOR;
    }
    else if (typeof selector === 'object') {
        opts = selector;
        selector = DEFAULT_IFRAME_SELECTOR;
    }
    var fullOpts = __assign(__assign({}, DEFAULT_OPTS), opts);
    var log = fullOpts.log ? Cypress.log({
        name: 'frame loaded',
        displayName: 'frame loaded',
        message: [selector],
    }).snapshot() : null;
    return cy.get(selector, { log: false }).then({ timeout: fullOpts.timeout }, function ($frame) { return __awaiter(_this, void 0, void 0, function () {
        var contentWindow, hasNavigated, loadLog;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    (_a = log) === null || _a === void 0 ? void 0 : _a.set('$el', $frame);
                    contentWindow = $frame.prop('contentWindow');
                    hasNavigated = fullOpts.url
                        ? function () {
                            var _a;
                            return typeof fullOpts.url === 'string'
                                ? contentWindow.location.toString().includes(fullOpts.url)
                                : (_a = fullOpts.url) === null || _a === void 0 ? void 0 : _a.test(contentWindow.location.toString());
                        }
                        : function () { return contentWindow.location.toString() !== 'about:blank'; };
                    _c.label = 1;
                case 1:
                    if (!!hasNavigated()) return [3, 3];
                    return [4, sleep(100)];
                case 2:
                    _c.sent();
                    return [3, 1];
                case 3:
                    if (contentWindow.document.readyState === 'complete') {
                        return [2, $frame];
                    }
                    loadLog = Cypress.log({
                        name: 'Frame Load',
                        message: [contentWindow.location.toString()],
                        event: true,
                    }).snapshot();
                    return [4, new Promise(function (resolve) {
                            Cypress.$(contentWindow).on('load', resolve);
                        })];
                case 4:
                    _c.sent();
                    loadLog.end();
                    (_b = log) === null || _b === void 0 ? void 0 : _b.finish();
                    return [2, $frame];
            }
        });
    }); });
};
Cypress.Commands.add('frameLoaded', frameLoaded);
var iframe = function (selector, opts) {
    if (selector === undefined) {
        selector = DEFAULT_IFRAME_SELECTOR;
    }
    else if (typeof selector === 'object') {
        opts = selector;
        selector = DEFAULT_IFRAME_SELECTOR;
    }
    var fullOpts = __assign(__assign({}, DEFAULT_OPTS), opts);
    var log = fullOpts.log ? Cypress.log({
        name: 'iframe',
        displayName: 'iframe',
        message: [selector],
    }).snapshot() : null;
    return cy.frameLoaded(selector, __assign(__assign({}, fullOpts), { log: false })).then(function ($frame) {
        var _a;
        (_a = log) === null || _a === void 0 ? void 0 : _a.set('$el', $frame).end();
        var contentWindow = $frame.prop('contentWindow');
        return Cypress.$(contentWindow.document.body);
    });
};
Cypress.Commands.add('iframe', iframe);
//# sourceMappingURL=index.js.map