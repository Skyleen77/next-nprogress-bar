'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var NProgress = require('nprogress');

/**
 * @param color Color of the progress bar. @default #0A2FFF
 * @param height Height of the progress bar. @default 2px
 * @param options NProgress options. @default undefined
 * @param appDirectory If your are in the app directory - @default false
 * @param shallowRouting If the progress bar is not displayed when you use shallow routing - @default false
 * @param delay When the page loads faster than the progress bar, it does not display - @default 0
 * @param style Custom css - @default undefined
 */
var ProgressBar = React.memo(function (_a) {
    var _b = _a.color, color = _b === void 0 ? '#0A2FFF' : _b, _c = _a.height, height = _c === void 0 ? '2px' : _c, options = _a.options, _d = _a.appDirectory, appDirectory = _d === void 0 ? false : _d, _e = _a.shallowRouting, shallowRouting = _e === void 0 ? false : _e, _f = _a.delay, delay = _f === void 0 ? 0 : _f, style = _a.style;
    var styles = (React.createElement("style", null, style ||
        "\n          #nprogress {\n            pointer-events: none;\n          }\n          \n          #nprogress .bar {\n            background: ".concat(color, ";\n          \n            position: fixed;\n            z-index: 1031;\n            top: 0;\n            left: 0;\n          \n            width: 100%;\n            height: ").concat(height, ";\n          }\n          \n          /* Fancy blur effect */\n          #nprogress .peg {\n            display: block;\n            position: absolute;\n            right: 0px;\n            width: 100px;\n            height: 100%;\n            box-shadow: 0 0 10px ").concat(color, ", 0 0 5px ").concat(color, ";\n            opacity: 1.0;\n          \n            -webkit-transform: rotate(3deg) translate(0px, -4px);\n                -ms-transform: rotate(3deg) translate(0px, -4px);\n                    transform: rotate(3deg) translate(0px, -4px);\n          }\n          \n          /* Remove these to get rid of the spinner */\n          #nprogress .spinner {\n            display: block;\n            position: fixed;\n            z-index: 1031;\n            top: 15px;\n            right: 15px;\n          }\n          \n          #nprogress .spinner-icon {\n            width: 18px;\n            height: 18px;\n            box-sizing: border-box;\n          \n            border: solid 2px transparent;\n            border-top-color: ").concat(color, ";\n            border-left-color: ").concat(color, ";\n            border-radius: 50%;\n          \n            -webkit-animation: nprogress-spinner 400ms linear infinite;\n                    animation: nprogress-spinner 400ms linear infinite;\n          }\n          \n          .nprogress-custom-parent {\n            overflow: hidden;\n            position: relative;\n          }\n          \n          .nprogress-custom-parent #nprogress .spinner,\n          .nprogress-custom-parent #nprogress .bar {\n            position: absolute;\n          }\n          \n          @-webkit-keyframes nprogress-spinner {\n            0%   { -webkit-transform: rotate(0deg); }\n            100% { -webkit-transform: rotate(360deg); }\n          }\n          @keyframes nprogress-spinner {\n            0%   { transform: rotate(0deg); }\n            100% { transform: rotate(360deg); }\n          }\n        ")));
    React.useEffect(function () {
        options && NProgress.configure(options);
        var timer;
        var startProgress = function () {
            timer = setTimeout(NProgress.start, delay);
        };
        var stopProgress = function () {
            clearTimeout(timer);
            NProgress.done();
        };
        if (appDirectory) {
            NProgress.configure({ showSpinner: false });
            var handleAnchorClick_1 = function (event) {
                var targetUrl = new URL(event.currentTarget.href);
                var currentUrl = new URL(location.href);
                if (!shallowRouting || !isSameURL(targetUrl, currentUrl)) {
                    startProgress();
                }
            };
            var handleMutation = function () {
                var anchorElements = document.querySelectorAll('a');
                anchorElements.forEach(function (anchor) {
                    return anchor.addEventListener('click', handleAnchorClick_1);
                });
            };
            var mutationObserver = new MutationObserver(handleMutation);
            mutationObserver.observe(document, { childList: true, subtree: true });
            window.history.pushState = new Proxy(window.history.pushState, {
                apply: function (target, thisArg, argArray) {
                    stopProgress();
                    return target.apply(thisArg, argArray);
                },
            });
        }
        else {
            import('next/router')
                .then(function (_a) {
                var Router = _a.default;
                var handleRouteStart = function (url) {
                    var targetUrl = new URL(url, location.href);
                    var currentUrl = new URL(Router.route, location.href);
                    if (!shallowRouting || !isSameURL(targetUrl, currentUrl)) {
                        startProgress();
                    }
                };
                var handleRouteDone = function () { return stopProgress(); };
                Router.events.on('routeChangeStart', handleRouteStart);
                Router.events.on('routeChangeComplete', handleRouteDone);
                Router.events.on('routeChangeError', handleRouteDone);
                return function () {
                    // Make sure to remove the event handler on unmount!
                    Router.events.off('routeChangeStart', handleRouteStart);
                    Router.events.off('routeChangeComplete', handleRouteDone);
                    Router.events.off('routeChangeError', handleRouteDone);
                };
            })
                .catch(function (err) { return console.error('Failed to load module', err); });
        }
    }, []);
    return styles;
}, function () { return true; });
function isSameURL(target, current) {
    var cleanTarget = target.protocol + '//' + target.host + target.pathname;
    var cleanCurrent = current.protocol + '//' + current.host + current.pathname;
    return cleanTarget === cleanCurrent;
}

exports.default = ProgressBar;
//# sourceMappingURL=index.js.map
