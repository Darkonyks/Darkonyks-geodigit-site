!(function (t) {
    t.fn.twentytwenty = function (e) {
        var e = t.extend(
            { default_offset_pct: 0.5, orientation: "horizontal" },
            e,
        );
        return this.each(function () {
            var n = e.default_offset_pct,
                i = t(this),
                a = e.orientation,
                s = "vertical" === a ? "down" : "left",
                d = "vertical" === a ? "up" : "right";
            i.wrap(
                "<div class='twentytwenty-wrapper twentytwenty-" +
                    a +
                    "'></div>",
            ),
                i.append("<div class='twentytwenty-overlay'></div>");
            var r = i.find("img:first"),
                w = i.find("img:last");
            i.append("<div class='twentytwenty-handle'></div>");
            var c = i.find(".twentytwenty-handle");
            c.append("<span class='twentytwenty-" + s + "-arrow'></span>"),
                c.append("<span class='twentytwenty-" + d + "-arrow'></span>"),
                i.addClass("twentytwenty-container"),
                r.addClass("twentytwenty-before"),
                w.addClass("twentytwenty-after");
            var o = i.find(".twentytwenty-overlay");
            o.append("<div class='twentytwenty-before-label'></div>"),
                o.append("<div class='twentytwenty-after-label'></div>");
            var f = function (t) {
                    var e = r.width(),
                        n = r.height();
                    return {
                        w: e + "px",
                        h: n + "px",
                        cw: t * e + "px",
                        ch: t * n + "px",
                    };
                },
                l = function (t) {
                    "vertical" === a
                        ? r.css("clip", "rect(0," + t.w + "," + t.ch + ",0)")
                        : r.css("clip", "rect(0," + t.cw + "," + t.h + ",0)"),
                        i.css("height", t.h);
                },
                v = function (t) {
                    var e = f(t);
                    c.css(
                        "vertical" === a ? "top" : "left",
                        "vertical" === a ? e.ch : e.cw,
                    ),
                        l(e);
                };
            t(window).on("resize.twentytwenty", function () {
                v(n);
            });
            var p = 0,
                y = 0;
            c.on("movestart", function (t) {
                ((t.distX > t.distY && t.distX < -t.distY) ||
                    (t.distX < t.distY && t.distX > -t.distY)) &&
                "vertical" !== a
                    ? t.preventDefault()
                    : ((t.distX < t.distY && t.distX < -t.distY) ||
                          (t.distX > t.distY && t.distX > -t.distY)) &&
                      "vertical" === a &&
                      t.preventDefault(),
                    i.addClass("active"),
                    (p = i.offset().left),
                    (offsetY = i.offset().top),
                    (y = r.width()),
                    (imgHeight = r.height());
            }),
                c.on("moveend", function () {
                    i.removeClass("active");
                }),
                c.on("move", function (t) {
                    i.hasClass("active") &&
                        ((n =
                            "vertical" === a
                                ? (t.pageY - offsetY) / imgHeight
                                : (t.pageX - p) / y),
                        0 > n && (n = 0),
                        n > 1 && (n = 1),
                        v(n));
                }),
                i.find("img").on("mousedown", function (t) {
                    t.preventDefault();
                }),
                t(window).trigger("resize.twentytwenty");
        });
    };
})(jQuery);

!(function (t) {
    "function" == typeof define && define.amd
        ? define(["jquery"], t)
        : t(jQuery);
})(function (t, e) {
    function n(t) {
        function e() {
            a ? (n(), O(e), (i = !0), (a = !1)) : (i = !1);
        }
        var n = t,
            a = !1,
            i = !1;
        (this.kick = function () {
            (a = !0), i || e();
        }),
            (this.end = function (t) {
                var e = n;
                t &&
                    (i
                        ? ((n = a
                              ? function () {
                                    e(), t();
                                }
                              : t),
                          (a = !0))
                        : t());
            });
    }
    function a() {
        return !0;
    }
    function i() {
        return !1;
    }
    function o(t) {
        t.preventDefault();
    }
    function r(t) {
        z[t.target.tagName.toLowerCase()] || t.preventDefault();
    }
    function u(t) {
        return 1 === t.which && !t.ctrlKey && !t.altKey;
    }
    function c(t, e) {
        var n, a;
        if (t.identifiedTouch) return t.identifiedTouch(e);
        for (n = -1, a = t.length; ++n < a; )
            if (t[n].identifier === e) return t[n];
    }
    function d(t, e) {
        var n = c(t.changedTouches, e.identifier);
        if (n && (n.pageX !== e.pageX || n.pageY !== e.pageY)) return n;
    }
    function m(t) {
        var e;
        u(t) &&
            ((e = {
                target: t.target,
                startX: t.pageX,
                startY: t.pageY,
                timeStamp: t.timeStamp,
            }),
            K(document, Q.move, f, e),
            K(document, Q.cancel, s, e));
    }
    function f(t) {
        var e = t.data;
        X(t, e, t, v);
    }
    function s() {
        v();
    }
    function v() {
        L(document, Q.move, f), L(document, Q.cancel, s);
    }
    function p(t) {
        var e, n;
        z[t.target.tagName.toLowerCase()] ||
            ((e = t.changedTouches[0]),
            (n = {
                target: e.target,
                startX: e.pageX,
                startY: e.pageY,
                timeStamp: t.timeStamp,
                identifier: e.identifier,
            }),
            K(document, B.move + "." + e.identifier, g, n),
            K(document, B.cancel + "." + e.identifier, h, n));
    }
    function g(t) {
        var e = t.data,
            n = d(t, e);
        n && X(t, e, n, l);
    }
    function h(t) {
        var e = t.data,
            n = c(t.changedTouches, e.identifier);
        n && l(e.identifier);
    }
    function l(t) {
        L(document, "." + t, g), L(document, "." + t, h);
    }
    function X(t, e, n, a) {
        var i = n.pageX - e.startX,
            o = n.pageY - e.startY;
        C * C > i * i + o * o || y(t, e, n, i, o, a);
    }
    function Y() {
        return (this._handled = a), !1;
    }
    function w(t) {
        t._handled();
    }
    function y(t, e, n, a, i, o) {
        {
            var r, u;
            e.target;
        }
        (r = t.targetTouches),
            (u = t.timeStamp - e.timeStamp),
            (e.type = "movestart"),
            (e.distX = a),
            (e.distY = i),
            (e.deltaX = a),
            (e.deltaY = i),
            (e.pageX = n.pageX),
            (e.pageY = n.pageY),
            (e.velocityX = a / u),
            (e.velocityY = i / u),
            (e.targetTouches = r),
            (e.finger = r ? r.length : 1),
            (e._handled = Y),
            (e._preventTouchmoveDefault = function () {
                t.preventDefault();
            }),
            N(e.target, e),
            o(e.identifier);
    }
    function T(t) {
        var e = t.data.timer;
        (t.data.touch = t), (t.data.timeStamp = t.timeStamp), e.kick();
    }
    function S(t) {
        var e = t.data.event,
            n = t.data.timer;
        k(),
            F(e, n, function () {
                setTimeout(function () {
                    L(e.target, "click", i);
                }, 0);
            });
    }
    function k() {
        L(document, Q.move, T), L(document, Q.end, S);
    }
    function _(t) {
        var e = t.data.event,
            n = t.data.timer,
            a = d(t, e);
        a &&
            (t.preventDefault(),
            (e.targetTouches = t.targetTouches),
            (t.data.touch = a),
            (t.data.timeStamp = t.timeStamp),
            n.kick());
    }
    function q(t) {
        var e = t.data.event,
            n = t.data.timer,
            a = c(t.changedTouches, e.identifier);
        a && (A(e), F(e, n));
    }
    function A(t) {
        L(document, "." + t.identifier, _), L(document, "." + t.identifier, q);
    }
    function D(t, e, n) {
        var a = n - t.timeStamp;
        (t.type = "move"),
            (t.distX = e.pageX - t.startX),
            (t.distY = e.pageY - t.startY),
            (t.deltaX = e.pageX - t.pageX),
            (t.deltaY = e.pageY - t.pageY),
            (t.velocityX = 0.3 * t.velocityX + (0.7 * t.deltaX) / a),
            (t.velocityY = 0.3 * t.velocityY + (0.7 * t.deltaY) / a),
            (t.pageX = e.pageX),
            (t.pageY = e.pageY);
    }
    function F(t, e, n) {
        e.end(function () {
            return (t.type = "moveend"), N(t.target, t), n && n();
        });
    }
    function R() {
        return K(this, "movestart.move", w), !0;
    }
    function x() {
        return (
            L(this, "dragstart drag", o),
            L(this, "mousedown touchstart", r),
            L(this, "movestart", w),
            !0
        );
    }
    function b(t) {
        "move" !== t.namespace &&
            "moveend" !== t.namespace &&
            (K(
                this,
                "dragstart." + t.guid + " drag." + t.guid,
                o,
                e,
                t.selector,
            ),
            K(this, "mousedown." + t.guid, r, e, t.selector));
    }
    function j(t) {
        "move" !== t.namespace &&
            "moveend" !== t.namespace &&
            (L(this, "dragstart." + t.guid + " drag." + t.guid),
            L(this, "mousedown." + t.guid));
    }
    var C = 6,
        K = t.event.add,
        L = t.event.remove,
        N = function (e, n, a) {
            t.event.trigger(n, a, e);
        },
        O = (function () {
            return (
                window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function (t) {
                    return window.setTimeout(function () {
                        t();
                    }, 25);
                }
            );
        })(),
        z = { textarea: !0, input: !0, select: !0, button: !0 },
        Q = { move: "mousemove", cancel: "mouseup dragstart", end: "mouseup" },
        B = { move: "touchmove", cancel: "touchend", end: "touchend" };
    (t.event.special.movestart = {
        setup: R,
        teardown: x,
        add: b,
        remove: j,
        _default: function (t) {
            function a() {
                D(o, r.touch, r.timeStamp), N(t.target, o);
            }
            var o, r;
            t._handled() &&
                ((o = {
                    target: t.target,
                    startX: t.startX,
                    startY: t.startY,
                    pageX: t.pageX,
                    pageY: t.pageY,
                    distX: t.distX,
                    distY: t.distY,
                    deltaX: t.deltaX,
                    deltaY: t.deltaY,
                    velocityX: t.velocityX,
                    velocityY: t.velocityY,
                    timeStamp: t.timeStamp,
                    identifier: t.identifier,
                    targetTouches: t.targetTouches,
                    finger: t.finger,
                }),
                (r = { event: o, timer: new n(a), touch: e, timeStamp: e }),
                t.identifier === e
                    ? (K(t.target, "click", i),
                      K(document, Q.move, T, r),
                      K(document, Q.end, S, r))
                    : (t._preventTouchmoveDefault(),
                      K(document, B.move + "." + t.identifier, _, r),
                      K(document, B.end + "." + t.identifier, q, r)));
        },
    }),
        (t.event.special.move = {
            setup: function () {
                K(this, "movestart.move", t.noop);
            },
            teardown: function () {
                L(this, "movestart.move", t.noop);
            },
        }),
        (t.event.special.moveend = {
            setup: function () {
                K(this, "movestart.moveend", t.noop);
            },
            teardown: function () {
                L(this, "movestart.moveend", t.noop);
            },
        }),
        K(document, "mousedown.move", m),
        K(document, "touchstart.move", p),
        "function" == typeof Array.prototype.indexOf &&
            !(function (t) {
                for (
                    var e = ["changedTouches", "targetTouches"], n = e.length;
                    n--;

                )
                    -1 === t.event.props.indexOf(e[n]) &&
                        t.event.props.push(e[n]);
            })(t);
});
