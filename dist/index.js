'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var NProgress = require('nprogress');

/**
 * @param color Color of the progress bar.
 * @param height Height of the progress bar.
 * @param options NProgress options.
 * @param appDirectory If your are in the app directory - false by default
 * @param shallowRouting If the progress bar is not displayed when you use shallow routing - false by default
 */
var ProgressBar = React.memo(function (_a) {
    var _b = _a.color, color = _b === void 0 ? '#0A2FFF' : _b, _c = _a.height, height = _c === void 0 ? '2px' : _c, options = _a.options, _d = _a.appDirectory, appDirectory = _d === void 0 ? false : _d, _e = _a.shallowRouting, shallowRouting = _e === void 0 ? false : _e;
    var styles = (React.createElement("style", null, "\n      #nprogress {\n        pointer-events: none;\n      }\n      #nprogress .bar {\n        background: ".concat(color, ";\n        position: fixed;\n        z-index: 99999;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: ").concat(height, ";\n      }\n      #nprogress .peg {\n        display: block;\n        position: absolute;\n        right: 0px;\n        width: 100px;\n        height: 100%;\n        box-shadow: 0 0 10px ").concat(color, ", 0 0 5px ").concat(color, ";\n        opacity: 1;\n        transform: rotate(3deg) translate(0px, -4px);\n      }\n    ")));
    React.useEffect(function () {
        options && NProgress.configure(options);
        if (appDirectory) {
            NProgress.configure({ showSpinner: false });
            var handleAnchorClick_1 = function (event) {
                var targetUrl = event.currentTarget.href;
                var currentUrl = location.href;
                if (!shallowRouting || targetUrl !== currentUrl) {
                    NProgress.start();
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
                    NProgress.done();
                    return target.apply(thisArg, argArray);
                },
            });
        }
        else {
            import('next/router')
                .then(function (_a) {
                var Router = _a.default;
                var handleRouteStart = function (url) {
                    if (!shallowRouting || url !== Router.route) {
                        NProgress.start();
                    }
                };
                var handleRouteDone = function () { return NProgress.done(); };
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

exports.default = ProgressBar;
//# sourceMappingURL=index.js.map
