/* @preserve
 * gcoord 0.3.2, geographic coordinate library
 * Copyright (c) 2021 Jiulong Hu <me@hujiulong.com>
 */
!(function (e, t) {
    'object' == typeof exports && 'undefined' != typeof module ? (module.exports = t()) : 'function' == typeof define && define.amd ? define(t) : ((e = 'undefined' != typeof globalThis ? globalThis : e || self).gcoord = t())
})(this, function () {
    'use strict'
    /*! *****************************************************************************
        Copyright (c) Microsoft Corporation.

        Permission to use, copy, modify, and/or distribute this software for any
        purpose with or without fee is hereby granted.

        THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
        REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
        AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
        INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
        LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
        OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
        PERFORMANCE OF THIS SOFTWARE.
        ***************************************************************************** */ var e = function () {
            return (e =
                Object.assign ||
                function (e) {
                    for (var t, r = 1, n = arguments.length; r < n; r++) for (var o in (t = arguments[r])) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o])
                    return e
                }).apply(this, arguments)
        },
        t = Math.sin,
        r = Math.cos,
        n = Math.sqrt,
        o = Math.abs,
        a = Math.PI,
        i = 6378245,
        u = 0.006693421622965823
    function f(e, t) {
        return e >= 72.004 && e <= 137.8347 && t >= 0.8293 && t <= 55.8271
    }
    function c(e, f) {
        var c,
            l,
            s,
            h = ((s = 300 + (c = e - 105) + 2 * (l = f - 35) + 0.1 * c * c + 0.1 * c * l + 0.1 * n(o(c))), (s += (2 * (20 * t(6 * c * a) + 20 * t(2 * c * a))) / 3), (s += (2 * (20 * t(c * a) + 40 * t((c / 3) * a))) / 3) + (2 * (150 * t((c / 12) * a) + 300 * t((c / 30) * a))) / 3),
            g = (function (e, r) {
                var i = 2 * e - 100 + 3 * r + 0.2 * r * r + 0.1 * e * r + 0.2 * n(o(e))
                return (i += (2 * (20 * t(6 * e * a) + 20 * t(2 * e * a))) / 3), (i += (2 * (20 * t(r * a) + 40 * t((r / 3) * a))) / 3), i + (2 * (160 * t((r / 12) * a) + 320 * t((r * a) / 30))) / 3
            })(e - 105, f - 35),
            M = (f / 180) * a,
            d = t(M),
            v = n((d = 1 - u * d * d))
        return [(h = (180 * h) / ((i / v) * r(M) * a)), (g = (180 * g) / (((i * (1 - u)) / (d * v)) * a))]
    }
    function l(e) {
        var t = e[0],
            r = e[1]
        if (!f(t, r)) return [t, r]
        var n = c(t, r)
        return [t + n[0], r + n[1]]
    }
    function s(e) {
        var t = e[0],
            r = e[1]
        if (!f(t, r)) return [t, r]
        for (var n = [t, r], a = n[0], i = n[1], u = l([a, i]), c = u[0] - t, s = u[1] - r; o(c) > 1e-6 || o(s) > 1e-6; ) (c = (u = l([(a -= c), (i -= s)]))[0] - t), (s = u[1] - r)
        return [a, i]
    }
    var h = Math.sin,
        g = Math.cos,
        M = Math.atan2,
        d = Math.sqrt,
        v = (3e3 * Math.PI) / 180
    function p(e) {
        var t = e[0] - 0.0065,
            r = e[1] - 0.006,
            n = d(t * t + r * r) - 2e-5 * h(r * v),
            o = M(r, t) - 3e-6 * g(t * v)
        return [n * g(o), n * h(o)]
    }
    function G(e) {
        var t = e[0],
            r = e[1],
            n = d(t * t + r * r) + 2e-5 * h(r * v),
            o = M(r, t) + 3e-6 * g(t * v)
        return [n * g(o) + 0.0065, n * h(o) + 0.006]
    }
    var y = 180 / Math.PI,
        S = Math.PI / 180,
        P = 6378137,
        b = 20037508.342789244
    function B(e) {
        return [(e[0] * y) / P, (0.5 * Math.PI - 2 * Math.atan(Math.exp(-e[1] / P))) * y]
    }
    function m(e) {
        var t = Math.abs(e[0]) <= 180 ? e[0] : e[0] - 360 * (e[0] < 0 ? -1 : 1),
            r = [P * t * S, P * Math.log(Math.tan(0.25 * Math.PI + 0.5 * e[1] * S))]
        return r[0] > b && (r[0] = b), r[0] < -b && (r[0] = -b), r[1] > b && (r[1] = b), r[1] < -b && (r[1] = -b), r
    }
    var C,
        D,
        E,
        w,
        I,
        W,
        x = Math.abs,
        k = [12890594.86, 8362377.87, 5591021, 3481989.83, 1678043.12, 0],
        J = [75, 60, 45, 30, 15, 0],
        T = [
            [1.410526172116255e-8, 898305509648872e-20, -1.9939833816331, 200.9824383106796, -187.2403703815547, 91.6087516669843, -23.38765649603339, 2.57121317296198, -0.03801003308653, 17337981.2],
            [-7.435856389565537e-9, 8983055097726239e-21, -0.78625201886289, 96.32687599759846, -1.85204757529826, -59.36935905485877, 47.40033549296737, -16.50741931063887, 2.28786674699375, 10260144.86],
            [-3.030883460898826e-8, 898305509983578e-20, 0.30071316287616, 59.74293618442277, 7.357984074871, -25.38371002664745, 13.45380521110908, -3.29883767235584, 0.32710905363475, 6856817.37],
            [-1.981981304930552e-8, 8983055099779535e-21, 0.03278182852591, 40.31678527705744, 0.65659298677277, -4.44255534477492, 0.85341911805263, 0.12923347998204, -0.04625736007561, 4482777.06],
            [3.09191371068437e-9, 8983055096812155e-21, 6995724062e-14, 23.10934304144901, -0.00023663490511, -0.6321817810242, -0.00663494467273, 0.03430082397953, -0.00466043876332, 2555164.4],
            [2.890871144776878e-9, 8983055095805407e-21, -3.068298e-8, 7.47137025468032, -353937994e-14, -0.02145144861037, -1234426596e-14, 0.00010322952773, -323890364e-14, 826088.5]
        ],
        j = [
            [-0.0015702102444, 111320.7020616939, 0x60e374c3105a3, -0x24bb4115e2e164, 0x5cc55543bb0ae8, -0x7ce070193f3784, 0x5e7ca61ddf8150, -0x261a578d8b24d0, 0x665d60f3742ca, 82.5],
            [0.0008277824516172526, 111320.7020463578, 647795574.6671607, -4082003173.641316, 10774905663.51142, -15171875531.51559, 12053065338.62167, -5124939663.577472, 913311935.9512032, 67.5],
            [0.00337398766765, 111320.7020202162, 4481351.045890365, -23393751.19931662, 79682215.47186455, -115964993.2797253, 97236711.15602145, -43661946.33752821, 8477230.501135234, 52.5],
            [0.00220636496208, 111320.7020209128, 51751.86112841131, 3796837.749470245, 992013.7397791013, -1221952.21711287, 1340652.697009075, -620943.6990984312, 144416.9293806241, 37.5],
            [-0.0003441963504368392, 111320.7020576856, 278.2353980772752, 2485758.690035394, 6070.750963243378, 54821.18345352118, 9540.606633304236, -2710.55326746645, 1405.483844121726, 22.5],
            [-0.0003218135878613132, 111320.7020701615, 0.00369383431289, 823725.6402795718, 0.46104986909093, 2351.343141331292, 1.58060784298199, 8.77738589078284, 0.37238884252424, 7.45]
        ]
    function L(e, t, r) {
        var n = x(t) / r[9],
            o = r[0] + r[1] * x(e),
            a = r[2] + r[3] * n + r[4] * Math.pow(n, 2) + r[5] * Math.pow(n, 3) + r[6] * Math.pow(n, 4) + r[7] * Math.pow(n, 5) + r[8] * Math.pow(n, 6)
        return [(o *= e < 0 ? -1 : 1), (a *= t < 0 ? -1 : 1)]
    }
    function q(e) {
        for (var t = e[0], r = e[1], n = [], o = 0; o < J.length; o++)
            if (x(r) > J[o]) {
                n = j[o]
                break
            }
        return L(t, r, n)
    }
    function N(e) {
        for (var t = e[0], r = e[1], n = [], o = 0; o < k.length; o++)
            if (r >= k[o]) {
                n = T[o]
                break
            }
        return L(t, r, n)
    }
    function O(e, t) {
        if (!e) throw new Error(t)
    }
    function A(e) {
        return !!e && '[object Array]' === Object.prototype.toString.call(e)
    }
    function F(e) {
        return !isNaN(Number(e)) && null !== e && !A(e)
    }
    function R() {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t]
        var r = e.length - 1
        return function () {
            for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n]
            for (var o = r, a = e[r].apply(null, t); o--; ) a = e[o].call(null, a)
            return a
        }
    }
    function U(e, t, r) {
        if ((void 0 === r && (r = !1), null !== e))
            for (var n, o, a, i, u, f, c, l, s = 0, h = 0, g = e.type, M = 'FeatureCollection' === g, d = 'Feature' === g, v = M ? e.features.length : 1, p = 0; p < v; p++) {
                u = (l = !!(c = M ? e.features[p].geometry : d ? e.geometry : e) && 'GeometryCollection' === c.type) ? c.geometries.length : 1
                for (var G = 0; G < u; G++) {
                    var y = 0,
                        S = 0
                    if (null !== (i = l ? c.geometries[G] : c)) {
                        var P = i.type
                        switch (((s = !r || ('Polygon' !== P && 'MultiPolygon' !== P) ? 0 : 1), P)) {
                            case null:
                                break
                            case 'Point':
                                if (!1 === t((f = i.coordinates), h, p, y, S)) return !1
                                h++, y++
                                break
                            case 'LineString':
                            case 'MultiPoint':
                                for (f = i.coordinates, n = 0; n < f.length; n++) {
                                    if (!1 === t(f[n], h, p, y, S)) return !1
                                    h++, 'MultiPoint' === P && y++
                                }
                                'LineString' === P && y++
                                break
                            case 'Polygon':
                            case 'MultiLineString':
                                for (f = i.coordinates, n = 0; n < f.length; n++) {
                                    for (o = 0; o < f[n].length - s; o++) {
                                        if (!1 === t(f[n][o], h, p, y, S)) return !1
                                        h++
                                    }
                                    'MultiLineString' === P && y++, 'Polygon' === P && S++
                                }
                                'Polygon' === P && y++
                                break
                            case 'MultiPolygon':
                                for (f = i.coordinates, n = 0; n < f.length; n++) {
                                    for (S = 0, o = 0; o < f[n].length; o++) {
                                        for (a = 0; a < f[n][o].length - s; a++) {
                                            if (!1 === t(f[n][o][a], h, p, y, S)) return !1
                                            h++
                                        }
                                        S++
                                    }
                                    y++
                                }
                                break
                            case 'GeometryCollection':
                                for (n = 0; n < i.geometries.length; n++) if (!1 === U(i.geometries[n], t, r)) return !1
                                break
                            default:
                                throw new Error('Unknown Geometry Type')
                        }
                    }
                }
            }
    }
    !(function (e) {
        ;(e.WGS84 = 'WGS84'), (e.WGS1984 = 'WGS84'), (e.EPSG4326 = 'WGS84'), (e.GCJ02 = 'GCJ02'), (e.AMap = 'GCJ02'), (e.BD09 = 'BD09'), (e.BD09LL = 'BD09'), (e.Baidu = 'BD09'), (e.BMap = 'BD09'), (e.BD09MC = 'BD09MC'), (e.BD09Meter = 'BD09MC'), (e.EPSG3857 = 'EPSG3857'), (e.EPSG900913 = 'EPSG3857'), (e.EPSG102100 = 'EPSG3857'), (e.WebMercator = 'EPSG3857'), (e.WM = 'EPSG3857')
    })(W || (W = {}))
    var z = { WGS84: { to: ((C = {}), (C[W.GCJ02] = l), (C[W.BD09] = R(G, l)), (C[W.BD09MC] = R(q, G, l)), (C[W.EPSG3857] = m), C) }, GCJ02: { to: ((D = {}), (D[W.WGS84] = s), (D[W.BD09] = G), (D[W.BD09MC] = R(q, G)), (D[W.EPSG3857] = R(m, s)), D) }, BD09: { to: ((E = {}), (E[W.WGS84] = R(s, p)), (E[W.GCJ02] = p), (E[W.EPSG3857] = R(m, s, p)), (E[W.BD09MC] = q), E) }, EPSG3857: { to: ((w = {}), (w[W.WGS84] = B), (w[W.GCJ02] = R(l, B)), (w[W.BD09] = R(G, l, B)), (w[W.BD09MC] = R(q, G, l, B)), w) }, BD09MC: { to: ((I = {}), (I[W.WGS84] = R(s, p, N)), (I[W.GCJ02] = R(p, N)), (I[W.EPSG3857] = R(m, s, p, N)), (I[W.BD09] = N), I) } }
    return e(e({}, W), {
        CRSTypes: W,
        transform: function (e, t, r) {
            if ((O(!!e, 'The args[0] input coordinate is required'), O(!!t, 'The args[1] original coordinate system is required'), O(!!r, 'The args[2] target coordinate system is required'), t === r)) return e
            var n = z[t]
            O(!!n, 'Invalid original coordinate system: ' + t)
            var o = n.to[r]
            O(!!o, 'Invalid target coordinate system: ' + r)
            var a = typeof e
            if ((O('string' === a || 'object' === a, 'Invalid input coordinate type: ' + a), 'string' === a))
                try {
                    e = JSON.parse(e)
                } catch (t) {
                    throw new Error('Invalid input coordinate: ' + e)
                }
            var i = !1
            A(e) && (O(e.length >= 2, 'Invalid input coordinate: ' + e), O(F(e[0]) && F(e[1]), 'Invalid input coordinate: ' + e), (e = e.map(Number)), (i = !0))
            var u = o
            return i
                ? u(e)
                : (U(e, function (e) {
                      var t
                      ;(t = u(e)), (e[0] = t[0]), (e[1] = t[1])
                  }),
                  e)
        }
    })
})
//# sourceMappingURL=gcoord.js.map
