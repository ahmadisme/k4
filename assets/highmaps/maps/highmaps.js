/*
 Highmaps JS v8.0.0 (2019-12-10)

 (c) 2011-2018 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (R, M) {
	"object" === typeof module && module.exports ? (M["default"] = M, module.exports = R.document ? M(R) : M) : "function" === typeof define && define.amd ? define("highcharts/highmaps", function () {
		return M(R)
	}) : (R.Highcharts && R.Highcharts.error(16, !0), R.Highcharts = M(R))
})("undefined" !== typeof window ? window : this, function (R) {
	function M(d, f, L, F) {
		d.hasOwnProperty(f) || (d[f] = F.apply(null, L))
	}
	var w = {};
	M(w, "parts/Globals.js", [], function () {
		var d = "undefined" !== typeof R ? R : "undefined" !== typeof window ? window : {},
			f = d.document,
			L = d.navigator && d.navigator.userAgent || "",
			F = f && f.createElementNS && !!f.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect,
			A = /(edge|msie|trident)/i.test(L) && !d.opera,
			D = -1 !== L.indexOf("Firefox"),
			x = -1 !== L.indexOf("Chrome"),
			p = D && 4 > parseInt(L.split("Firefox/")[1], 10);
		return {
			product: "Highcharts",
			version: "8.0.0",
			deg2rad: 2 * Math.PI / 360,
			doc: f,
			hasBidiBug: p,
			hasTouch: !!d.TouchEvent,
			isMS: A,
			isWebKit: -1 !== L.indexOf("AppleWebKit"),
			isFirefox: D,
			isChrome: x,
			isSafari: !x && -1 !== L.indexOf("Safari"),
			isTouchDevice: /(Mobile|Android|Windows Phone)/.test(L),
			SVG_NS: "http://www.w3.org/2000/svg",
			chartCount: 0,
			seriesTypes: {},
			symbolSizes: {},
			svg: F,
			win: d,
			marginNames: ["plotTop", "marginRight", "marginBottom", "plotLeft"],
			noop: function () {},
			charts: [],
			dateFormats: {}
		}
	});
	M(w, "parts/Utilities.js", [w["parts/Globals.js"]], function (d) {
		function f(b, a) {
			return parseInt(b, a || 10)
		}

		function L(b) {
			return "string" === typeof b
		}

		function F(b) {
			b = Object.prototype.toString.call(b);
			return "[object Array]" === b || "[object Array Iterator]" === b
		}

		function A(b, a) {
			return !!b && "object" === typeof b && (!a ||
				!F(b))
		}

		function D(b) {
			return A(b) && "number" === typeof b.nodeType
		}

		function x(b) {
			var a = b && b.constructor;
			return !(!A(b, !0) || D(b) || !a || !a.name || "Object" === a.name)
		}

		function p(b) {
			return "number" === typeof b && !isNaN(b) && Infinity > b && -Infinity < b
		}

		function H(b) {
			return "undefined" !== typeof b && null !== b
		}

		function u(b, a, c) {
			var g;
			L(a) ? H(c) ? b.setAttribute(a, c) : b && b.getAttribute && ((g = b.getAttribute(a)) || "class" !== a || (g = b.getAttribute(a + "Name"))) : h(a, function (a, c) {
				b.setAttribute(c, a)
			});
			return g
		}

		function t(b, a) {
			var c;
			b || (b = {});
			for (c in a) b[c] = a[c];
			return b
		}

		function y() {
			for (var b = arguments, a = b.length, c = 0; c < a; c++) {
				var e = b[c];
				if ("undefined" !== typeof e && null !== e) return e
			}
		}

		function k(b, a) {
			var c = function () {};
			c.prototype = new b;
			t(c.prototype, a);
			return c
		}

		function n(b, a) {
			return parseFloat(b.toPrecision(a || 14))
		}

		function E(b, a, c, e) {
			b = +b || 0;
			a = +a;
			var g = d.defaultOptions.lang,
				q = (b.toString().split(".")[1] || "").split("e")[0].length,
				l = b.toString().split("e");
			if (-1 === a) a = Math.min(q, 20);
			else if (!p(a)) a = 2;
			else if (a && l[1] && 0 > l[1]) {
				var m =
					a + +l[1];
				0 <= m ? (l[0] = (+l[0]).toExponential(m).split("e")[0], a = m) : (l[0] = l[0].split(".")[0] || 0, b = 20 > a ? (l[0] * Math.pow(10, l[1])).toFixed(a) : 0, l[1] = 0)
			}
			var B = (Math.abs(l[1] ? l[0] : b) + Math.pow(10, -Math.max(a, q) - 1)).toFixed(a);
			q = String(f(B));
			m = 3 < q.length ? q.length % 3 : 0;
			c = y(c, g.decimalPoint);
			e = y(e, g.thousandsSep);
			b = (0 > b ? "-" : "") + (m ? q.substr(0, m) + e : "");
			b += q.substr(m).replace(/(\d{3})(?=\d)/g, "$1" + e);
			a && (b += c + B.slice(-a));
			l[1] && 0 !== +b && (b += "e" + l[1]);
			return b
		}

		function h(b, a, c) {
			for (var g in b) Object.hasOwnProperty.call(b,
				g) && a.call(c || b[g], b[g], g, b)
		}
		d.timers = [];
		var e = d.charts,
			c = d.doc,
			a = d.win;
		d.error = function (b, c, e, m) {
			var g = p(b),
				q = g ? "Highcharts error #" + b + ": www.highcharts.com/errors/" + b + "/" : b.toString(),
				l = function () {
					if (c) throw Error(q);
					a.console && console.log(q)
				};
			if ("undefined" !== typeof m) {
				var v = "";
				g && (q += "?");
				d.objectEach(m, function (b, a) {
					v += "\n" + a + ": " + b;
					g && (q += encodeURI(a) + "=" + encodeURI(b))
				});
				q += v
			}
			e ? d.fireEvent(e, "displayError", {
				code: b,
				message: q,
				params: m
			}, l) : l()
		};
		d.Fx = function (b, a, c) {
			this.options = a;
			this.elem = b;
			this.prop =
				c
		};
		d.Fx.prototype = {
			dSetter: function () {
				var b = this.paths[0],
					a = this.paths[1],
					c = [],
					e = this.now,
					d = b.length;
				if (1 === e) c = this.toD;
				else if (d === a.length && 1 > e)
					for (; d--;) {
						var z = parseFloat(b[d]);
						c[d] = isNaN(z) || "A" === a[d - 4] || "A" === a[d - 5] ? a[d] : e * parseFloat("" + (a[d] - z)) + z
					} else c = a;
				this.elem.attr("d", c, null, !0)
			},
			update: function () {
				var b = this.elem,
					a = this.prop,
					c = this.now,
					e = this.options.step;
				if (this[a + "Setter"]) this[a + "Setter"]();
				else b.attr ? b.element && b.attr(a, c, null, !0) : b.style[a] = c + this.unit;
				e && e.call(b, c, this)
			},
			run: function (b,
				c, e) {
				var g = this,
					q = g.options,
					z = function (b) {
						return z.stopped ? !1 : g.step(b)
					},
					l = a.requestAnimationFrame || function (b) {
						setTimeout(b, 13)
					},
					v = function () {
						for (var b = 0; b < d.timers.length; b++) d.timers[b]() || d.timers.splice(b--, 1);
						d.timers.length && l(v)
					};
				b !== c || this.elem["forceAnimate:" + this.prop] ? (this.startTime = +new Date, this.start = b, this.end = c, this.unit = e, this.now = this.start, this.pos = 0, z.elem = this.elem, z.prop = this.prop, z() && 1 === d.timers.push(z) && l(v)) : (delete q.curAnim[this.prop], q.complete && 0 === Object.keys(q.curAnim).length &&
					q.complete.call(this.elem))
			},
			step: function (b) {
				var a = +new Date,
					c = this.options,
					e = this.elem,
					d = c.complete,
					z = c.duration,
					l = c.curAnim;
				if (e.attr && !e.element) b = !1;
				else if (b || a >= z + this.startTime) {
					this.now = this.end;
					this.pos = 1;
					this.update();
					var v = l[this.prop] = !0;
					h(l, function (b) {
						!0 !== b && (v = !1)
					});
					v && d && d.call(e);
					b = !1
				} else this.pos = c.easing((a - this.startTime) / z), this.now = this.start + (this.end - this.start) * this.pos, this.update(), b = !0;
				return b
			},
			initPath: function (b, a, c) {
				function g(b) {
					for (r = b.length; r--;) {
						var a = "M" ===
							b[r] || "L" === b[r];
						var c = /[a-zA-Z]/.test(b[r + 3]);
						a && c && b.splice(r + 1, 0, b[r + 1], b[r + 2], b[r + 1], b[r + 2])
					}
				}

				function e(b, a) {
					for (; b.length < f;) {
						b[0] = a[f - b.length];
						var c = b.slice(0, h);
						[].splice.apply(b, [0, 0].concat(c));
						G && (c = b.slice(b.length - h), [].splice.apply(b, [b.length, 0].concat(c)), r--)
					}
					b[0] = "M"
				}

				function q(b, a) {
					for (var c = (f - b.length) / h; 0 < c && c--;) k = b.slice().splice(b.length / N - h, h * N), k[0] = a[f - h - c * h], d && (k[h - 6] = k[h - 2], k[h - 5] = k[h - 1]), [].splice.apply(b, [b.length / N, 0].concat(k)), G && c--
				}
				a = a || "";
				var l = b.startX,
					v = b.endX,
					d = -1 < a.indexOf("C"),
					h = d ? 7 : 3,
					k, r;
				a = a.split(" ");
				c = c.slice();
				var G = b.isArea,
					N = G ? 2 : 1;
				d && (g(a), g(c));
				if (l && v) {
					for (r = 0; r < l.length; r++)
						if (l[r] === v[0]) {
							var n = r;
							break
						} else if (l[0] === v[v.length - l.length + r]) {
						n = r;
						var E = !0;
						break
					} else if (l[l.length - 1] === v[v.length - l.length + r]) {
						n = l.length - r;
						break
					}
					"undefined" === typeof n && (a = [])
				}
				if (a.length && p(n)) {
					var f = c.length + n * N * h;
					E ? (e(a, c), q(c, a)) : (e(c, a), q(a, c))
				}
				return [a, c]
			},
			fillSetter: function () {
				d.Fx.prototype.strokeSetter.apply(this, arguments)
			},
			strokeSetter: function () {
				this.elem.attr(this.prop,
					d.color(this.start).tweenTo(d.color(this.end), this.pos), null, !0)
			}
		};
		d.merge = function () {
			var b, a = arguments,
				c = {},
				e = function (b, a) {
					"object" !== typeof b && (b = {});
					h(a, function (c, g) {
						!A(c, !0) || x(c) || D(c) ? b[g] = a[g] : b[g] = e(b[g] || {}, c)
					});
					return b
				};
			!0 === a[0] && (c = a[1], a = Array.prototype.slice.call(a, 2));
			var d = a.length;
			for (b = 0; b < d; b++) c = e(c, a[b]);
			return c
		};
		d.clearTimeout = function (b) {
			H(b) && clearTimeout(b)
		};
		d.css = function (b, a) {
			d.isMS && !d.svg && a && "undefined" !== typeof a.opacity && (a.filter = "alpha(opacity=" + 100 * a.opacity +
				")");
			t(b.style, a)
		};
		d.createElement = function (b, a, e, m, h) {
			b = c.createElement(b);
			var g = d.css;
			a && t(b, a);
			h && g(b, {
				padding: "0",
				border: "none",
				margin: "0"
			});
			e && g(b, e);
			m && m.appendChild(b);
			return b
		};
		d.datePropsToTimestamps = function (b) {
			h(b, function (a, c) {
				A(a) && "function" === typeof a.getTime ? b[c] = a.getTime() : (A(a) || F(a)) && d.datePropsToTimestamps(a)
			})
		};
		d.formatSingle = function (b, a, c) {
			var g = /\.([0-9])/,
				e = d.defaultOptions.lang,
				q = c && c.time || d.time;
			c = c && c.numberFormatter || E;
			/f$/.test(b) ? (g = (g = b.match(g)) ? g[1] : -1, null !==
				a && (a = c(a, g, e.decimalPoint, -1 < b.indexOf(",") ? e.thousandsSep : ""))) : a = q.dateFormat(b, a);
			return a
		};
		d.format = function (b, a, c) {
			for (var g = "{", e = !1, q, l, v, h, k = [], n; b;) {
				g = b.indexOf(g);
				if (-1 === g) break;
				q = b.slice(0, g);
				if (e) {
					q = q.split(":");
					l = q.shift().split(".");
					h = l.length;
					n = a;
					for (v = 0; v < h; v++) n && (n = n[l[v]]);
					q.length && (n = d.formatSingle(q.join(":"), n, c));
					k.push(n)
				} else k.push(q);
				b = b.slice(g + 1);
				g = (e = !e) ? "}" : "{"
			}
			k.push(b);
			return k.join("")
		};
		d.getMagnitude = function (b) {
			return Math.pow(10, Math.floor(Math.log(b) / Math.LN10))
		};
		d.normalizeTickInterval = function (b, a, c, e, d) {
			var g = b;
			c = y(c, 1);
			var l = b / c;
			a || (a = d ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10], !1 === e && (1 === c ? a = a.filter(function (b) {
				return 0 === b % 1
			}) : .1 >= c && (a = [1 / c])));
			for (e = 0; e < a.length && !(g = a[e], d && g * c >= b || !d && l <= (a[e] + (a[e + 1] || a[e])) / 2); e++);
			return g = n(g * c, -Math.round(Math.log(.001) / Math.LN10))
		};
		d.stableSort = function (b, a) {
			var c = b.length,
				e, g;
			for (g = 0; g < c; g++) b[g].safeI = g;
			b.sort(function (b, c) {
				e = a(b, c);
				return 0 === e ? b.safeI - c.safeI : e
			});
			for (g = 0; g < c; g++) delete b[g].safeI
		};
		d.timeUnits = {
			millisecond: 1,
			second: 1E3,
			minute: 6E4,
			hour: 36E5,
			day: 864E5,
			week: 6048E5,
			month: 24192E5,
			year: 314496E5
		};
		Math.easeInOutSine = function (b) {
			return -.5 * (Math.cos(Math.PI * b) - 1)
		};
		d.getStyle = function (b, c, e) {
			if ("width" === c) return c = Math.min(b.offsetWidth, b.scrollWidth), e = b.getBoundingClientRect && b.getBoundingClientRect().width, e < c && e >= c - 1 && (c = Math.floor(e)), Math.max(0, c - d.getStyle(b, "padding-left") - d.getStyle(b, "padding-right"));
			if ("height" === c) return Math.max(0, Math.min(b.offsetHeight, b.scrollHeight) -
				d.getStyle(b, "padding-top") - d.getStyle(b, "padding-bottom"));
			a.getComputedStyle || d.error(27, !0);
			if (b = a.getComputedStyle(b, void 0)) b = b.getPropertyValue(c), y(e, "opacity" !== c) && (b = f(b));
			return b
		};
		d.inArray = function (b, a, c) {
			return a.indexOf(b, c)
		};
		d.find = Array.prototype.find ? function (b, a) {
			return b.find(a)
		} : function (b, a) {
			var c, e = b.length;
			for (c = 0; c < e; c++)
				if (a(b[c], c)) return b[c]
		};
		d.keys = Object.keys;
		d.stop = function (b, a) {
			for (var c = d.timers.length; c--;) d.timers[c].elem !== b || a && a !== d.timers[c].prop || (d.timers[c].stopped = !0)
		};
		h({
			map: "map",
			each: "forEach",
			grep: "filter",
			reduce: "reduce",
			some: "some"
		}, function (b, a) {
			d[a] = function (a) {
				return Array.prototype[b].apply(a, [].slice.call(arguments, 1))
			}
		});
		d.addEvent = function (b, a, c, e) {
			void 0 === e && (e = {});
			var g = b.addEventListener || d.addEventListenerPolyfill;
			var m = "function" === typeof b && b.prototype ? b.prototype.protoEvents = b.prototype.protoEvents || {} : b.hcEvents = b.hcEvents || {};
			d.Point && b instanceof d.Point && b.series && b.series.chart && (b.series.chart.runTrackerClick = !0);
			g && g.call(b, a, c,
				!1);
			m[a] || (m[a] = []);
			m[a].push({
				fn: c,
				order: "number" === typeof e.order ? e.order : Infinity
			});
			m[a].sort(function (b, a) {
				return b.order - a.order
			});
			return function () {
				d.removeEvent(b, a, c)
			}
		};
		d.removeEvent = function (b, a, c) {
			function e(a, c) {
				var e = b.removeEventListener || d.removeEventListenerPolyfill;
				e && e.call(b, a, c, !1)
			}

			function g(c) {
				var g;
				if (b.nodeName) {
					if (a) {
						var l = {};
						l[a] = !0
					} else l = c;
					h(l, function (b, a) {
						if (c[a])
							for (g = c[a].length; g--;) e(a, c[a][g].fn)
					})
				}
			}
			var q;
			["protoEvents", "hcEvents"].forEach(function (l, m) {
				var v = (m =
					m ? b : b.prototype) && m[l];
				v && (a ? (q = v[a] || [], c ? (v[a] = q.filter(function (b) {
					return c !== b.fn
				}), e(a, c)) : (g(v), v[a] = [])) : (g(v), m[l] = {}))
			})
		};
		d.fireEvent = function (b, a, e, m) {
			var g;
			e = e || {};
			if (c.createEvent && (b.dispatchEvent || b.fireEvent)) {
				var q = c.createEvent("Events");
				q.initEvent(a, !0, !0);
				t(q, e);
				b.dispatchEvent ? b.dispatchEvent(q) : b.fireEvent(a, q)
			} else e.target || t(e, {
					preventDefault: function () {
						e.defaultPrevented = !0
					},
					target: b,
					type: a
				}),
				function (a, c) {
					void 0 === a && (a = []);
					void 0 === c && (c = []);
					var l = 0,
						m = 0,
						q = a.length + c.length;
					for (g = 0; g < q; g++) !1 === (a[l] ? c[m] ? a[l].order <= c[m].order ? a[l++] : c[m++] : a[l++] : c[m++]).fn.call(b, e) && e.preventDefault()
				}(b.protoEvents && b.protoEvents[a], b.hcEvents && b.hcEvents[a]);
			m && !e.defaultPrevented && m.call(b, e)
		};
		d.animate = function (a, c, e) {
			var b, g = "",
				q, l;
			if (!A(e)) {
				var v = arguments;
				e = {
					duration: v[2],
					easing: v[3],
					complete: v[4]
				}
			}
			p(e.duration) || (e.duration = 400);
			e.easing = "function" === typeof e.easing ? e.easing : Math[e.easing] || Math.easeInOutSine;
			e.curAnim = d.merge(c);
			h(c, function (m, v) {
				d.stop(a, v);
				l = new d.Fx(a,
					e, v);
				q = null;
				"d" === v ? (l.paths = l.initPath(a, a.d, c.d), l.toD = c.d, b = 0, q = 1) : a.attr ? b = a.attr(v) : (b = parseFloat(d.getStyle(a, v)) || 0, "opacity" !== v && (g = "px"));
				q || (q = m);
				q && q.match && q.match("px") && (q = q.replace(/px/g, ""));
				l.run(b, q, g)
			})
		};
		d.seriesType = function (a, c, e, m, h) {
			var b = d.getOptions(),
				g = d.seriesTypes;
			b.plotOptions[a] = d.merge(b.plotOptions[c], e);
			g[a] = k(g[c] || function () {}, m);
			g[a].prototype.type = a;
			h && (g[a].prototype.pointClass = k(d.Point, h));
			return g[a]
		};
		d.uniqueKey = function () {
			var a = Math.random().toString(36).substring(2,
					9),
				c = 0;
			return function () {
				return "highcharts-" + a + "-" + c++
			}
		}();
		d.isFunction = function (a) {
			return "function" === typeof a
		};
		a.jQuery && (a.jQuery.fn.highcharts = function () {
			var a = [].slice.call(arguments);
			if (this[0]) return a[0] ? (new(d[L(a[0]) ? a.shift() : "Chart"])(this[0], a[0], a[1]), this) : e[u(this[0], "data-highcharts-chart")]
		});
		return {
			animObject: function (a) {
				return A(a) ? d.merge(a) : {
					duration: a ? 500 : 0
				}
			},
			arrayMax: function (a) {
				for (var b = a.length, c = a[0]; b--;) a[b] > c && (c = a[b]);
				return c
			},
			arrayMin: function (a) {
				for (var b = a.length,
						c = a[0]; b--;) a[b] < c && (c = a[b]);
				return c
			},
			attr: u,
			clamp: function (a, c, e) {
				return a > c ? a < e ? a : e : c
			},
			correctFloat: n,
			defined: H,
			destroyObjectProperties: function (a, c) {
				h(a, function (b, e) {
					b && b !== c && b.destroy && b.destroy();
					delete a[e]
				})
			},
			discardElement: function (a) {
				var b = d.garbageBin;
				b || (b = d.createElement("div"));
				a && b.appendChild(a);
				b.innerHTML = ""
			},
			erase: function (a, c) {
				for (var b = a.length; b--;)
					if (a[b] === c) {
						a.splice(b, 1);
						break
					}
			},
			extend: t,
			extendClass: k,
			isArray: F,
			isClass: x,
			isDOMElement: D,
			isNumber: p,
			isObject: A,
			isString: L,
			numberFormat: E,
			objectEach: h,
			offset: function (b) {
				var e = c.documentElement;
				b = b.parentElement || b.parentNode ? b.getBoundingClientRect() : {
					top: 0,
					left: 0
				};
				return {
					top: b.top + (a.pageYOffset || e.scrollTop) - (e.clientTop || 0),
					left: b.left + (a.pageXOffset || e.scrollLeft) - (e.clientLeft || 0)
				}
			},
			pad: function (a, c, e) {
				return Array((c || 2) + 1 - String(a).replace("-", "").length).join(e || "0") + a
			},
			pick: y,
			pInt: f,
			relativeLength: function (a, c, e) {
				return /%$/.test(a) ? c * parseFloat(a) / 100 + (e || 0) : parseFloat(a)
			},
			setAnimation: function (a, c) {
				c.renderer.globalAnimation =
					y(a, c.options.chart.animation, !0)
			},
			splat: function (a) {
				return F(a) ? a : [a]
			},
			syncTimeout: function (a, c, e) {
				if (0 < c) return setTimeout(a, c, e);
				a.call(0, e);
				return -1
			},
			wrap: function (a, c, e) {
				var b = a[c];
				a[c] = function () {
					var a = Array.prototype.slice.call(arguments),
						c = arguments,
						g = this;
					g.proceed = function () {
						b.apply(g, arguments.length ? arguments : c)
					};
					a.unshift(b);
					a = e.apply(this, a);
					g.proceed = null;
					return a
				}
			}
		}
	});
	M(w, "parts/Color.js", [w["parts/Globals.js"], w["parts/Utilities.js"]], function (d, f) {
		var L = f.isNumber,
			F = f.pInt,
			A = d.merge;
		d.Color = function (f) {
			if (!(this instanceof d.Color)) return new d.Color(f);
			this.init(f)
		};
		d.Color.prototype = {
			parsers: [{
				regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
				parse: function (d) {
					return [F(d[1]), F(d[2]), F(d[3]), parseFloat(d[4], 10)]
				}
			}, {
				regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
				parse: function (d) {
					return [F(d[1]), F(d[2]), F(d[3]), 1]
				}
			}],
			names: {
				white: "#ffffff",
				black: "#000000"
			},
			init: function (f) {
				var x, p;
				if ((this.input = f = this.names[f &&
						f.toLowerCase ? f.toLowerCase() : ""] || f) && f.stops) this.stops = f.stops.map(function (f) {
					return new d.Color(f[1])
				});
				else {
					if (f && f.charAt && "#" === f.charAt()) {
						var H = f.length;
						f = parseInt(f.substr(1), 16);
						7 === H ? x = [(f & 16711680) >> 16, (f & 65280) >> 8, f & 255, 1] : 4 === H && (x = [(f & 3840) >> 4 | (f & 3840) >> 8, (f & 240) >> 4 | f & 240, (f & 15) << 4 | f & 15, 1])
					}
					if (!x)
						for (p = this.parsers.length; p-- && !x;) {
							var u = this.parsers[p];
							(H = u.regex.exec(f)) && (x = u.parse(H))
						}
				}
				this.rgba = x || []
			},
			get: function (d) {
				var f = this.input,
					p = this.rgba;
				if (this.stops) {
					var H = A(f);
					H.stops = [].concat(H.stops);
					this.stops.forEach(function (f, t) {
						H.stops[t] = [H.stops[t][0], f.get(d)]
					})
				} else H = p && L(p[0]) ? "rgb" === d || !d && 1 === p[3] ? "rgb(" + p[0] + "," + p[1] + "," + p[2] + ")" : "a" === d ? p[3] : "rgba(" + p.join(",") + ")" : f;
				return H
			},
			brighten: function (d) {
				var f, p = this.rgba;
				if (this.stops) this.stops.forEach(function (f) {
					f.brighten(d)
				});
				else if (L(d) && 0 !== d)
					for (f = 0; 3 > f; f++) p[f] += F(255 * d), 0 > p[f] && (p[f] = 0), 255 < p[f] && (p[f] = 255);
				return this
			},
			setOpacity: function (d) {
				this.rgba[3] = d;
				return this
			},
			tweenTo: function (d, f) {
				var p = this.rgba,
					x = d.rgba;
				x.length && p && p.length ? (d = 1 !== x[3] || 1 !== p[3], f = (d ? "rgba(" : "rgb(") + Math.round(x[0] + (p[0] - x[0]) * (1 - f)) + "," + Math.round(x[1] + (p[1] - x[1]) * (1 - f)) + "," + Math.round(x[2] + (p[2] - x[2]) * (1 - f)) + (d ? "," + (x[3] + (p[3] - x[3]) * (1 - f)) : "") + ")") : f = d.input || "none";
				return f
			}
		};
		d.color = function (f) {
			return new d.Color(f)
		}
	});
	M(w, "parts/SvgRenderer.js", [w["parts/Globals.js"], w["parts/Utilities.js"]], function (d, f) {
		var L = f.animObject,
			F = f.attr,
			A = f.defined,
			D = f.destroyObjectProperties,
			x = f.erase,
			p = f.extend,
			H = f.isArray,
			u = f.isNumber,
			t = f.isObject,
			y = f.isString,
			k = f.objectEach,
			n = f.pick,
			E = f.pInt,
			h = f.splat,
			e = d.addEvent,
			c = d.animate,
			a = d.charts,
			b = d.color,
			g = d.css,
			q = d.createElement,
			m = d.deg2rad,
			C = d.doc,
			z = d.hasTouch,
			l = d.isFirefox,
			v = d.isMS,
			B = d.isWebKit,
			I = d.merge,
			J = d.noop,
			r = d.removeEvent,
			G = d.stop,
			N = d.svg,
			U = d.SVG_NS,
			S = d.symbolSizes,
			W = d.win;
		var O = d.SVGElement = function () {
			return this
		};
		p(O.prototype, {
			opacity: 1,
			SVG_NS: U,
			textProps: "direction fontSize fontWeight fontFamily fontStyle color lineHeight width textAlign textDecoration textOverflow textOutline cursor".split(" "),
			init: function (a, b) {
				this.element = "span" === b ? q(b) : C.createElementNS(this.SVG_NS, b);
				this.renderer = a;
				d.fireEvent(this, "afterInit")
			},
			animate: function (a, b, e) {
				var r = L(n(b, this.renderer.globalAnimation, !0));
				n(C.hidden, C.msHidden, C.webkitHidden, !1) && (r.duration = 0);
				0 !== r.duration ? (e && (r.complete = e), c(this, a, r)) : (this.attr(a, void 0, e), k(a, function (a, b) {
					r.step && r.step.call(this, a, {
						prop: b,
						pos: 1
					})
				}, this));
				return this
			},
			complexColor: function (a, b, c) {
				var e = this.renderer,
					r, g, l, G, K, m, P, v, q, h, Q, B = [],
					z;
				d.fireEvent(this.renderer,
					"complexColor", {
						args: arguments
					},
					function () {
						a.radialGradient ? g = "radialGradient" : a.linearGradient && (g = "linearGradient");
						g && (l = a[g], K = e.gradients, P = a.stops, h = c.radialReference, H(l) && (a[g] = l = {
							x1: l[0],
							y1: l[1],
							x2: l[2],
							y2: l[3],
							gradientUnits: "userSpaceOnUse"
						}), "radialGradient" === g && h && !A(l.gradientUnits) && (G = l, l = I(l, e.getRadialAttr(h, G), {
							gradientUnits: "userSpaceOnUse"
						})), k(l, function (a, b) {
							"id" !== b && B.push(b, a)
						}), k(P, function (a) {
							B.push(a)
						}), B = B.join(","), K[B] ? Q = K[B].attr("id") : (l.id = Q = d.uniqueKey(), K[B] = m =
							e.createElement(g).attr(l).add(e.defs), m.radAttr = G, m.stops = [], P.forEach(function (a) {
								0 === a[1].indexOf("rgba") ? (r = d.color(a[1]), v = r.get("rgb"), q = r.get("a")) : (v = a[1], q = 1);
								a = e.createElement("stop").attr({
									offset: a[0],
									"stop-color": v,
									"stop-opacity": q
								}).add(m);
								m.stops.push(a)
							})), z = "url(" + e.url + "#" + Q + ")", c.setAttribute(b, z), c.gradient = B, a.toString = function () {
							return z
						})
					})
			},
			applyTextOutline: function (a) {
				var b = this.element,
					c; - 1 !== a.indexOf("contrast") && (a = a.replace(/contrast/g, this.renderer.getContrast(b.style.fill)));
				a = a.split(" ");
				var e = a[a.length - 1];
				if ((c = a[0]) && "none" !== c && d.svg) {
					this.fakeTS = !0;
					a = [].slice.call(b.getElementsByTagName("tspan"));
					this.ySetter = this.xSetter;
					c = c.replace(/(^[\d\.]+)(.*?)$/g, function (a, b, c) {
						return 2 * b + c
					});
					this.removeTextOutline(a);
					var r = b.firstChild;
					a.forEach(function (a, g) {
						0 === g && (a.setAttribute("x", b.getAttribute("x")), g = b.getAttribute("y"), a.setAttribute("y", g || 0), null === g && b.setAttribute("y", 0));
						a = a.cloneNode(1);
						F(a, {
							"class": "highcharts-text-outline",
							fill: e,
							stroke: e,
							"stroke-width": c,
							"stroke-linejoin": "round"
						});
						b.insertBefore(a, r)
					})
				}
			},
			removeTextOutline: function (a) {
				for (var b = a.length, c; b--;) c = a[b], "highcharts-text-outline" === c.getAttribute("class") && x(a, this.element.removeChild(c))
			},
			symbolCustomAttribs: "x y width height r start end innerR anchorX anchorY rounded".split(" "),
			attr: function (a, b, c, e) {
				var r = this.element,
					g, l = this,
					m, K, P = this.symbolCustomAttribs;
				if ("string" === typeof a && "undefined" !== typeof b) {
					var v = a;
					a = {};
					a[v] = b
				}
				"string" === typeof a ? l = (this[a + "Getter"] || this._defaultGetter).call(this,
					a, r) : (k(a, function (b, c) {
					m = !1;
					e || G(this, c);
					this.symbolName && -1 !== d.inArray(c, P) && (g || (this.symbolAttr(a), g = !0), m = !0);
					!this.rotation || "x" !== c && "y" !== c || (this.doTransform = !0);
					m || (K = this[c + "Setter"] || this._defaultSetter, K.call(this, b, c, r), !this.styledMode && this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(c) && this.updateShadows(c, b, K))
				}, this), this.afterSetters());
				c && c.call(this);
				return l
			},
			afterSetters: function () {
				this.doTransform && (this.updateTransform(), this.doTransform = !1)
			},
			updateShadows: function (a,
				b, c) {
				for (var e = this.shadows, r = e.length; r--;) c.call(e[r], "height" === a ? Math.max(b - (e[r].cutHeight || 0), 0) : "d" === a ? this.d : b, a, e[r])
			},
			addClass: function (a, b) {
				var c = b ? "" : this.attr("class") || "";
				a = (a || "").split(/ /g).reduce(function (a, b) {
					-1 === c.indexOf(b) && a.push(b);
					return a
				}, c ? [c] : []).join(" ");
				a !== c && this.attr("class", a);
				return this
			},
			hasClass: function (a) {
				return -1 !== (this.attr("class") || "").split(" ").indexOf(a)
			},
			removeClass: function (a) {
				return this.attr("class", (this.attr("class") || "").replace(y(a) ? new RegExp(" ?" +
					a + " ?") : a, ""))
			},
			symbolAttr: function (a) {
				var b = this;
				"x y r start end width height innerR anchorX anchorY clockwise".split(" ").forEach(function (c) {
					b[c] = n(a[c], b[c])
				});
				b.attr({
					d: b.renderer.symbols[b.symbolName](b.x, b.y, b.width, b.height, b)
				})
			},
			clip: function (a) {
				return this.attr("clip-path", a ? "url(" + this.renderer.url + "#" + a.id + ")" : "none")
			},
			crisp: function (a, b) {
				b = b || a.strokeWidth || 0;
				var c = Math.round(b) % 2 / 2;
				a.x = Math.floor(a.x || this.x || 0) + c;
				a.y = Math.floor(a.y || this.y || 0) + c;
				a.width = Math.floor((a.width || this.width ||
					0) - 2 * c);
				a.height = Math.floor((a.height || this.height || 0) - 2 * c);
				A(a.strokeWidth) && (a.strokeWidth = b);
				return a
			},
			css: function (a) {
				var b = this.styles,
					c = {},
					e = this.element,
					r = "",
					l = !b,
					G = ["textOutline", "textOverflow", "width"];
				a && a.color && (a.fill = a.color);
				b && k(a, function (a, e) {
					a !== b[e] && (c[e] = a, l = !0)
				});
				if (l) {
					b && (a = p(b, c));
					if (a)
						if (null === a.width || "auto" === a.width) delete this.textWidth;
						else if ("text" === e.nodeName.toLowerCase() && a.width) var m = this.textWidth = E(a.width);
					this.styles = a;
					m && !N && this.renderer.forExport && delete a.width;
					if (e.namespaceURI === this.SVG_NS) {
						var d = function (a, b) {
							return "-" + b.toLowerCase()
						};
						k(a, function (a, b) {
							-1 === G.indexOf(b) && (r += b.replace(/([A-Z])/g, d) + ":" + a + ";")
						});
						r && F(e, "style", r)
					} else g(e, a);
					this.added && ("text" === this.element.nodeName && this.renderer.buildText(this), a && a.textOutline && this.applyTextOutline(a.textOutline))
				}
				return this
			},
			getStyle: function (a) {
				return W.getComputedStyle(this.element || this, "").getPropertyValue(a)
			},
			strokeWidth: function () {
				if (!this.renderer.styledMode) return this["stroke-width"] ||
					0;
				var a = this.getStyle("stroke-width"),
					b = 0;
				if (a.indexOf("px") === a.length - 2) b = E(a);
				else if ("" !== a) {
					var c = C.createElementNS(U, "rect");
					F(c, {
						width: a,
						"stroke-width": 0
					});
					this.element.parentNode.appendChild(c);
					b = c.getBBox().width;
					c.parentNode.removeChild(c)
				}
				return b
			},
			on: function (a, b) {
				var c = this,
					e = c.element;
				z && "click" === a ? (e.ontouchstart = function (a) {
					c.touchEventFired = Date.now();
					a.preventDefault();
					b.call(e, a)
				}, e.onclick = function (a) {
					(-1 === W.navigator.userAgent.indexOf("Android") || 1100 < Date.now() - (c.touchEventFired ||
						0)) && b.call(e, a)
				}) : e["on" + a] = b;
				return this
			},
			setRadialReference: function (a) {
				var b = this.renderer.gradients[this.element.gradient];
				this.element.radialReference = a;
				b && b.radAttr && b.animate(this.renderer.getRadialAttr(a, b.radAttr));
				return this
			},
			translate: function (a, b) {
				return this.attr({
					translateX: a,
					translateY: b
				})
			},
			invert: function (a) {
				this.inverted = a;
				this.updateTransform();
				return this
			},
			updateTransform: function () {
				var a = this.translateX || 0,
					b = this.translateY || 0,
					c = this.scaleX,
					e = this.scaleY,
					r = this.inverted,
					g = this.rotation,
					l = this.matrix,
					G = this.element;
				r && (a += this.width, b += this.height);
				a = ["translate(" + a + "," + b + ")"];
				A(l) && a.push("matrix(" + l.join(",") + ")");
				r ? a.push("rotate(90) scale(-1,1)") : g && a.push("rotate(" + g + " " + n(this.rotationOriginX, G.getAttribute("x"), 0) + " " + n(this.rotationOriginY, G.getAttribute("y") || 0) + ")");
				(A(c) || A(e)) && a.push("scale(" + n(c, 1) + " " + n(e, 1) + ")");
				a.length && G.setAttribute("transform", a.join(" "))
			},
			toFront: function () {
				var a = this.element;
				a.parentNode.appendChild(a);
				return this
			},
			align: function (a, b, c) {
				var e,
					r = {};
				var g = this.renderer;
				var l = g.alignedObjects;
				var G, m;
				if (a) {
					if (this.alignOptions = a, this.alignByTranslate = b, !c || y(c)) this.alignTo = e = c || "renderer", x(l, this), l.push(this), c = null
				} else a = this.alignOptions, b = this.alignByTranslate, e = this.alignTo;
				c = n(c, g[e], g);
				e = a.align;
				g = a.verticalAlign;
				l = (c.x || 0) + (a.x || 0);
				var d = (c.y || 0) + (a.y || 0);
				"right" === e ? G = 1 : "center" === e && (G = 2);
				G && (l += (c.width - (a.width || 0)) / G);
				r[b ? "translateX" : "x"] = Math.round(l);
				"bottom" === g ? m = 1 : "middle" === g && (m = 2);
				m && (d += (c.height - (a.height || 0)) /
					m);
				r[b ? "translateY" : "y"] = Math.round(d);
				this[this.placed ? "animate" : "attr"](r);
				this.placed = !0;
				this.alignAttr = r;
				return this
			},
			getBBox: function (a, b) {
				var c, e = this.renderer,
					r = this.element,
					g = this.styles,
					l = this.textStr,
					G, d = e.cache,
					v = e.cacheKeys,
					q = r.namespaceURI === this.SVG_NS;
				b = n(b, this.rotation, 0);
				var K = e.styledMode ? r && O.prototype.getStyle.call(r, "font-size") : g && g.fontSize;
				if (A(l)) {
					var h = l.toString(); - 1 === h.indexOf("<") && (h = h.replace(/[0-9]/g, "0"));
					h += ["", b, K, this.textWidth, g && g.textOverflow].join()
				}
				h && !a &&
					(c = d[h]);
				if (!c) {
					if (q || e.forExport) {
						try {
							(G = this.fakeTS && function (a) {
								[].forEach.call(r.querySelectorAll(".highcharts-text-outline"), function (b) {
									b.style.display = a
								})
							}) && G("none"), c = r.getBBox ? p({}, r.getBBox()) : {
								width: r.offsetWidth,
								height: r.offsetHeight
							}, G && G("")
						} catch (da) {
							""
						}
						if (!c || 0 > c.width) c = {
							width: 0,
							height: 0
						}
					} else c = this.htmlGetBBox();
					e.isSVG && (a = c.width, e = c.height, q && (c.height = e = {
						"11px,17": 14,
						"13px,20": 16
					} [g && g.fontSize + "," + Math.round(e)] || e), b && (g = b * m, c.width = Math.abs(e * Math.sin(g)) + Math.abs(a * Math.cos(g)),
						c.height = Math.abs(e * Math.cos(g)) + Math.abs(a * Math.sin(g))));
					if (h && 0 < c.height) {
						for (; 250 < v.length;) delete d[v.shift()];
						d[h] || v.push(h);
						d[h] = c
					}
				}
				return c
			},
			show: function (a) {
				return this.attr({
					visibility: a ? "inherit" : "visible"
				})
			},
			hide: function (a) {
				a ? this.attr({
					y: -9999
				}) : this.attr({
					visibility: "hidden"
				});
				return this
			},
			fadeOut: function (a) {
				var b = this;
				b.animate({
					opacity: 0
				}, {
					duration: a || 150,
					complete: function () {
						b.attr({
							y: -9999
						})
					}
				})
			},
			add: function (a) {
				var b = this.renderer,
					c = this.element;
				a && (this.parentGroup = a);
				this.parentInverted =
					a && a.inverted;
				"undefined" !== typeof this.textStr && b.buildText(this);
				this.added = !0;
				if (!a || a.handleZ || this.zIndex) var e = this.zIndexSetter();
				e || (a ? a.element : b.box).appendChild(c);
				if (this.onAdd) this.onAdd();
				return this
			},
			safeRemoveChild: function (a) {
				var b = a.parentNode;
				b && b.removeChild(a)
			},
			destroy: function () {
				var a = this,
					b = a.element || {},
					c = a.renderer,
					e = c.isSVG && "SPAN" === b.nodeName && a.parentGroup,
					r = b.ownerSVGElement,
					g = a.clipPath;
				b.onclick = b.onmouseout = b.onmouseover = b.onmousemove = b.point = null;
				G(a);
				g && r && ([].forEach.call(r.querySelectorAll("[clip-path],[CLIP-PATH]"),
					function (a) {
						-1 < a.getAttribute("clip-path").indexOf(g.element.id) && a.removeAttribute("clip-path")
					}), a.clipPath = g.destroy());
				if (a.stops) {
					for (r = 0; r < a.stops.length; r++) a.stops[r] = a.stops[r].destroy();
					a.stops = null
				}
				a.safeRemoveChild(b);
				for (c.styledMode || a.destroyShadows(); e && e.div && 0 === e.div.childNodes.length;) b = e.parentGroup, a.safeRemoveChild(e.div), delete e.div, e = b;
				a.alignTo && x(c.alignedObjects, a);
				k(a, function (b, c) {
					a[c] && a[c].parentGroup === a && a[c].destroy && a[c].destroy();
					delete a[c]
				})
			},
			shadow: function (a,
				b, c) {
				var e = [],
					r, g = this.element;
				if (!a) this.destroyShadows();
				else if (!this.shadows) {
					var l = n(a.width, 3);
					var G = (a.opacity || .15) / l;
					var m = this.parentInverted ? "(-1,-1)" : "(" + n(a.offsetX, 1) + ", " + n(a.offsetY, 1) + ")";
					for (r = 1; r <= l; r++) {
						var d = g.cloneNode(0);
						var v = 2 * l + 1 - 2 * r;
						F(d, {
							stroke: a.color || "#000000",
							"stroke-opacity": G * r,
							"stroke-width": v,
							transform: "translate" + m,
							fill: "none"
						});
						d.setAttribute("class", (d.getAttribute("class") || "") + " highcharts-shadow");
						c && (F(d, "height", Math.max(F(d, "height") - v, 0)), d.cutHeight = v);
						b ? b.element.appendChild(d) : g.parentNode && g.parentNode.insertBefore(d, g);
						e.push(d)
					}
					this.shadows = e
				}
				return this
			},
			destroyShadows: function () {
				(this.shadows || []).forEach(function (a) {
					this.safeRemoveChild(a)
				}, this);
				this.shadows = void 0
			},
			xGetter: function (a) {
				"circle" === this.element.nodeName && ("x" === a ? a = "cx" : "y" === a && (a = "cy"));
				return this._defaultGetter(a)
			},
			_defaultGetter: function (a) {
				a = n(this[a + "Value"], this[a], this.element ? this.element.getAttribute(a) : null, 0);
				/^[\-0-9\.]+$/.test(a) && (a = parseFloat(a));
				return a
			},
			dSetter: function (a, b, c) {
				a && a.join && (a = a.join(" "));
				/(NaN| {2}|^$)/.test(a) && (a = "M 0 0");
				this[b] !== a && (c.setAttribute(b, a), this[b] = a)
			},
			dashstyleSetter: function (a) {
				var b, c = this["stroke-width"];
				"inherit" === c && (c = 1);
				if (a = a && a.toLowerCase()) {
					a = a.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",");
					for (b = a.length; b--;) a[b] = E(a[b]) *
						c;
					a = a.join(",").replace(/NaN/g, "none");
					this.element.setAttribute("stroke-dasharray", a)
				}
			},
			alignSetter: function (a) {
				var b = {
					left: "start",
					center: "middle",
					right: "end"
				};
				b[a] && (this.alignValue = a, this.element.setAttribute("text-anchor", b[a]))
			},
			opacitySetter: function (a, b, c) {
				this[b] = a;
				c.setAttribute(b, a)
			},
			titleSetter: function (a) {
				var b = this.element.getElementsByTagName("title")[0];
				b || (b = C.createElementNS(this.SVG_NS, "title"), this.element.appendChild(b));
				b.firstChild && b.removeChild(b.firstChild);
				b.appendChild(C.createTextNode(String(n(a,
					"")).replace(/<[^>]*>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">")))
			},
			textSetter: function (a) {
				a !== this.textStr && (delete this.bBox, delete this.textPxLength, this.textStr = a, this.added && this.renderer.buildText(this))
			},
			setTextPath: function (a, b) {
				var c = this.element,
					e = {
						textAnchor: "text-anchor"
					},
					r = !1,
					g = this.textPathWrapper,
					l = !g;
				b = I(!0, {
					enabled: !0,
					attributes: {
						dy: -5,
						startOffset: "50%",
						textAnchor: "middle"
					}
				}, b);
				var G = b.attributes;
				if (a && b && b.enabled) {
					g && null === g.element.parentNode ? (l = !0, g = g.destroy()) : g && this.removeTextOutline.call(g.parentGroup,
						[].slice.call(c.getElementsByTagName("tspan")));
					this.options && this.options.padding && (G.dx = -this.options.padding);
					g || (this.textPathWrapper = g = this.renderer.createElement("textPath"), r = !0);
					var m = g.element;
					(b = a.element.getAttribute("id")) || a.element.setAttribute("id", b = d.uniqueKey());
					if (l)
						for (a = c.getElementsByTagName("tspan"); a.length;) a[0].setAttribute("y", 0), u(G.dx) && a[0].setAttribute("x", -G.dx), m.appendChild(a[0]);
					r && g.add({
						element: this.text ? this.text.element : c
					});
					m.setAttributeNS("http://www.w3.org/1999/xlink",
						"href", this.renderer.url + "#" + b);
					A(G.dy) && (m.parentNode.setAttribute("dy", G.dy), delete G.dy);
					A(G.dx) && (m.parentNode.setAttribute("dx", G.dx), delete G.dx);
					k(G, function (a, b) {
						m.setAttribute(e[b] || b, a)
					});
					c.removeAttribute("transform");
					this.removeTextOutline.call(g, [].slice.call(c.getElementsByTagName("tspan")));
					this.text && !this.renderer.styledMode && this.attr({
						fill: "none",
						"stroke-width": 0
					});
					this.applyTextOutline = this.updateTransform = J
				} else g && (delete this.updateTransform, delete this.applyTextOutline, this.destroyTextPath(c,
					a), this.updateTransform(), this.options.rotation && this.applyTextOutline(this.options.style.textOutline));
				return this
			},
			destroyTextPath: function (a, b) {
				var c = a.getElementsByTagName("text")[0];
				if (c) {
					if (c.removeAttribute("dx"), c.removeAttribute("dy"), b.element.setAttribute("id", ""), c.getElementsByTagName("textPath").length) {
						for (a = this.textPathWrapper.element.childNodes; a.length;) c.appendChild(a[0]);
						c.removeChild(this.textPathWrapper.element)
					}
				} else if (a.getAttribute("dx") || a.getAttribute("dy")) a.removeAttribute("dx"),
					a.removeAttribute("dy");
				this.textPathWrapper = this.textPathWrapper.destroy()
			},
			fillSetter: function (a, b, c) {
				"string" === typeof a ? c.setAttribute(b, a) : a && this.complexColor(a, b, c)
			},
			visibilitySetter: function (a, b, c) {
				"inherit" === a ? c.removeAttribute(b) : this[b] !== a && c.setAttribute(b, a);
				this[b] = a
			},
			zIndexSetter: function (a, b) {
				var c = this.renderer,
					e = this.parentGroup,
					r = (e || c).element || c.box,
					g = this.element,
					l = !1;
				c = r === c.box;
				var G = this.added;
				var m;
				A(a) ? (g.setAttribute("data-z-index", a), a = +a, this[b] === a && (G = !1)) : A(this[b]) &&
					g.removeAttribute("data-z-index");
				this[b] = a;
				if (G) {
					(a = this.zIndex) && e && (e.handleZ = !0);
					b = r.childNodes;
					for (m = b.length - 1; 0 <= m && !l; m--) {
						e = b[m];
						G = e.getAttribute("data-z-index");
						var d = !A(G);
						if (e !== g)
							if (0 > a && d && !c && !m) r.insertBefore(g, b[m]), l = !0;
							else if (E(G) <= a || d && (!A(a) || 0 <= a)) r.insertBefore(g, b[m + 1] || null), l = !0
					}
					l || (r.insertBefore(g, b[c ? 3 : 0] || null), l = !0)
				}
				return l
			},
			_defaultSetter: function (a, b, c) {
				c.setAttribute(b, a)
			}
		});
		O.prototype.yGetter = O.prototype.xGetter;
		O.prototype.translateXSetter = O.prototype.translateYSetter =
			O.prototype.rotationSetter = O.prototype.verticalAlignSetter = O.prototype.rotationOriginXSetter = O.prototype.rotationOriginYSetter = O.prototype.scaleXSetter = O.prototype.scaleYSetter = O.prototype.matrixSetter = function (a, b) {
				this[b] = a;
				this.doTransform = !0
			};
		O.prototype["stroke-widthSetter"] = O.prototype.strokeSetter = function (a, b, c) {
			this[b] = a;
			this.stroke && this["stroke-width"] ? (O.prototype.fillSetter.call(this, this.stroke, "stroke", c), c.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0) : "stroke-width" ===
				b && 0 === a && this.hasStroke ? (c.removeAttribute("stroke"), this.hasStroke = !1) : this.renderer.styledMode && this["stroke-width"] && (c.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0)
		};
		f = d.SVGRenderer = function () {
			this.init.apply(this, arguments)
		};
		p(f.prototype, {
			Element: O,
			SVG_NS: U,
			init: function (a, b, c, r, G, m, d) {
				var v = this.createElement("svg").attr({
					version: "1.1",
					"class": "highcharts-root"
				});
				d || v.css(this.getStyle(r));
				r = v.element;
				a.appendChild(r);
				F(a, "dir", "ltr"); - 1 === a.innerHTML.indexOf("xmlns") &&
					F(r, "xmlns", this.SVG_NS);
				this.isSVG = !0;
				this.box = r;
				this.boxWrapper = v;
				this.alignedObjects = [];
				this.url = (l || B) && C.getElementsByTagName("base").length ? W.location.href.split("#")[0].replace(/<[^>]*>/g, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : "";
				this.createElement("desc").add().element.appendChild(C.createTextNode("Created with Highcharts 8.0.0"));
				this.defs = this.createElement("defs").add();
				this.allowHTML = m;
				this.forExport = G;
				this.styledMode = d;
				this.gradients = {};
				this.cache = {};
				this.cacheKeys = [];
				this.imgCount =
					0;
				this.setSize(b, c, !1);
				var q;
				l && a.getBoundingClientRect && (b = function () {
					g(a, {
						left: 0,
						top: 0
					});
					q = a.getBoundingClientRect();
					g(a, {
						left: Math.ceil(q.left) - q.left + "px",
						top: Math.ceil(q.top) - q.top + "px"
					})
				}, b(), this.unSubPixelFix = e(W, "resize", b))
			},
			definition: function (a) {
				function b(a, e) {
					var r;
					h(a).forEach(function (a) {
						var g = c.createElement(a.tagName),
							l = {};
						k(a, function (a, b) {
							"tagName" !== b && "children" !== b && "textContent" !== b && (l[b] = a)
						});
						g.attr(l);
						g.add(e || c.defs);
						a.textContent && g.element.appendChild(C.createTextNode(a.textContent));
						b(a.children || [], g);
						r = g
					});
					return r
				}
				var c = this;
				return b(a)
			},
			getStyle: function (a) {
				return this.style = p({
					fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
					fontSize: "12px"
				}, a)
			},
			setStyle: function (a) {
				this.boxWrapper.css(this.getStyle(a))
			},
			isHidden: function () {
				return !this.boxWrapper.getBBox().width
			},
			destroy: function () {
				var a = this.defs;
				this.box = null;
				this.boxWrapper = this.boxWrapper.destroy();
				D(this.gradients || {});
				this.gradients = null;
				a && (this.defs = a.destroy());
				this.unSubPixelFix &&
					this.unSubPixelFix();
				return this.alignedObjects = null
			},
			createElement: function (a) {
				var b = new this.Element;
				b.init(this, a);
				return b
			},
			draw: J,
			getRadialAttr: function (a, b) {
				return {
					cx: a[0] - a[2] / 2 + b.cx * a[2],
					cy: a[1] - a[2] / 2 + b.cy * a[2],
					r: b.r * a[2]
				}
			},
			truncate: function (a, b, c, e, r, g, l) {
				var G = this,
					m = a.rotation,
					d, v = e ? 1 : 0,
					q = (c || e).length,
					h = q,
					B = [],
					K = function (a) {
						b.firstChild && b.removeChild(b.firstChild);
						a && b.appendChild(C.createTextNode(a))
					},
					z = function (g, m) {
						m = m || g;
						if ("undefined" === typeof B[m])
							if (b.getSubStringLength) try {
								B[m] =
									r + b.getSubStringLength(0, e ? m + 1 : m)
							} catch (ea) {
								""
							} else G.getSpanWidth && (K(l(c || e, g)), B[m] = r + G.getSpanWidth(a, b));
						return B[m]
					},
					N;
				a.rotation = 0;
				var k = z(b.textContent.length);
				if (N = r + k > g) {
					for (; v <= q;) h = Math.ceil((v + q) / 2), e && (d = l(e, h)), k = z(h, d && d.length - 1), v === q ? v = q + 1 : k > g ? q = h - 1 : v = h;
					0 === q ? K("") : c && q === c.length - 1 || K(d || l(c || e, h))
				}
				e && e.splice(0, h);
				a.actualWidth = k;
				a.rotation = m;
				return N
			},
			escapes: {
				"&": "&amp;",
				"<": "&lt;",
				">": "&gt;",
				"'": "&#39;",
				'"': "&quot;"
			},
			buildText: function (a) {
				var b = a.element,
					c = this,
					e = c.forExport,
					r = n(a.textStr, "").toString(),
					l = -1 !== r.indexOf("<"),
					G = b.childNodes,
					m, d = F(b, "x"),
					v = a.styles,
					q = a.textWidth,
					h = v && v.lineHeight,
					B = v && v.textOutline,
					z = v && "ellipsis" === v.textOverflow,
					f = v && "nowrap" === v.whiteSpace,
					I = v && v.fontSize,
					J, P = G.length;
				v = q && !a.added && this.box;
				var t = function (a) {
						var e;
						c.styledMode || (e = /(px|em)$/.test(a && a.style.fontSize) ? a.style.fontSize : I || c.style.fontSize || 12);
						return h ? E(h) : c.fontMetrics(e, a.getAttribute("style") ? a : b).h
					},
					p = function (a, b) {
						k(c.escapes, function (c, e) {
							b && -1 !== b.indexOf(c) ||
								(a = a.toString().replace(new RegExp(c, "g"), e))
						});
						return a
					},
					y = function (a, b) {
						var c = a.indexOf("<");
						a = a.substring(c, a.indexOf(">") - c);
						c = a.indexOf(b + "=");
						if (-1 !== c && (c = c + b.length + 1, b = a.charAt(c), '"' === b || "'" === b)) return a = a.substring(c + 1), a.substring(0, a.indexOf(b))
					},
					S = /<br.*?>/g;
				var x = [r, z, f, h, B, I, q].join();
				if (x !== a.textCache) {
					for (a.textCache = x; P--;) b.removeChild(G[P]);
					l || B || z || q || -1 !== r.indexOf(" ") && (!f || S.test(r)) ? (v && v.appendChild(b), l ? (r = c.styledMode ? r.replace(/<(b|strong)>/g, '<span class="highcharts-strong">').replace(/<(i|em)>/g,
							'<span class="highcharts-emphasized">') : r.replace(/<(b|strong)>/g, '<span style="font-weight:bold">').replace(/<(i|em)>/g, '<span style="font-style:italic">'), r = r.replace(/<a/g, "<span").replace(/<\/(b|strong|i|em|a)>/g, "</span>").split(S)) : r = [r], r = r.filter(function (a) {
							return "" !== a
						}), r.forEach(function (r, l) {
							var G = 0,
								v = 0;
							r = r.replace(/^\s+|\s+$/g, "").replace(/<span/g, "|||<span").replace(/<\/span>/g, "</span>|||");
							var h = r.split("|||");
							h.forEach(function (r) {
								if ("" !== r || 1 === h.length) {
									var B = {},
										K = C.createElementNS(c.SVG_NS,
											"tspan"),
										k, n;
									(k = y(r, "class")) && F(K, "class", k);
									if (k = y(r, "style")) k = k.replace(/(;| |^)color([ :])/, "$1fill$2"), F(K, "style", k);
									(n = y(r, "href")) && !e && (F(K, "onclick", 'location.href="' + n + '"'), F(K, "class", "highcharts-anchor"), c.styledMode || g(K, {
										cursor: "pointer"
									}));
									r = p(r.replace(/<[a-zA-Z\/](.|\n)*?>/g, "") || " ");
									if (" " !== r) {
										K.appendChild(C.createTextNode(r));
										G ? B.dx = 0 : l && null !== d && (B.x = d);
										F(K, B);
										b.appendChild(K);
										!G && J && (!N && e && g(K, {
											display: "block"
										}), F(K, "dy", t(K)));
										if (q) {
											var Q = r.replace(/([^\^])-/g, "$1- ").split(" ");
											B = !f && (1 < h.length || l || 1 < Q.length);
											n = 0;
											var E = t(K);
											if (z) m = c.truncate(a, K, r, void 0, 0, Math.max(0, q - parseInt(I || 12, 10)), function (a, b) {
												return a.substring(0, b) + "\u2026"
											});
											else if (B)
												for (; Q.length;) Q.length && !f && 0 < n && (K = C.createElementNS(U, "tspan"), F(K, {
													dy: E,
													x: d
												}), k && F(K, "style", k), K.appendChild(C.createTextNode(Q.join(" ").replace(/- /g, "-"))), b.appendChild(K)), c.truncate(a, K, null, Q, 0 === n ? v : 0, q, function (a, b) {
													return Q.slice(0, b).join(" ").replace(/- /g, "-")
												}), v = a.actualWidth, n++
										}
										G++
									}
								}
							});
							J = J || b.childNodes.length
						}),
						z && m && a.attr("title", p(a.textStr, ["&lt;", "&gt;"])), v && v.removeChild(b), B && a.applyTextOutline && a.applyTextOutline(B)) : b.appendChild(C.createTextNode(p(r)))
				}
			},
			getContrast: function (a) {
				a = b(a).rgba;
				a[0] *= 1;
				a[1] *= 1.2;
				a[2] *= .5;
				return 459 < a[0] + a[1] + a[2] ? "#000000" : "#FFFFFF"
			},
			button: function (a, b, c, r, g, l, G, m, d, q) {
				var h = this.label(a, b, c, d, null, null, q, null, "button"),
					B = 0,
					K = this.styledMode;
				h.attr(I({
					padding: 8,
					r: 2
				}, g));
				if (!K) {
					g = I({
						fill: "#f7f7f7",
						stroke: "#cccccc",
						"stroke-width": 1,
						style: {
							color: "#333333",
							cursor: "pointer",
							fontWeight: "normal"
						}
					}, g);
					var z = g.style;
					delete g.style;
					l = I(g, {
						fill: "#e6e6e6"
					}, l);
					var N = l.style;
					delete l.style;
					G = I(g, {
						fill: "#e6ebf5",
						style: {
							color: "#000000",
							fontWeight: "bold"
						}
					}, G);
					var k = G.style;
					delete G.style;
					m = I(g, {
						style: {
							color: "#cccccc"
						}
					}, m);
					var C = m.style;
					delete m.style
				}
				e(h.element, v ? "mouseover" : "mouseenter", function () {
					3 !== B && h.setState(1)
				});
				e(h.element, v ? "mouseout" : "mouseleave", function () {
					3 !== B && h.setState(B)
				});
				h.setState = function (a) {
					1 !== a && (h.state = B = a);
					h.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed", "disabled"][a || 0]);
					K || h.attr([g, l, G, m][a || 0]).css([z, N, k, C][a || 0])
				};
				K || h.attr(g).css(p({
					cursor: "default"
				}, z));
				return h.on("click", function (a) {
					3 !== B && r.call(h, a)
				})
			},
			crispLine: function (a, b) {
				a[1] === a[4] && (a[1] = a[4] = Math.round(a[1]) - b % 2 / 2);
				a[2] === a[5] && (a[2] = a[5] = Math.round(a[2]) + b % 2 / 2);
				return a
			},
			path: function (a) {
				var b = this.styledMode ? {} : {
					fill: "none"
				};
				H(a) ? b.d = a : t(a) && p(b, a);
				return this.createElement("path").attr(b)
			},
			circle: function (a, b, c) {
				a = t(a) ? a : "undefined" === typeof a ? {} : {
					x: a,
					y: b,
					r: c
				};
				b = this.createElement("circle");
				b.xSetter = b.ySetter = function (a, b, c) {
					c.setAttribute("c" + b, a)
				};
				return b.attr(a)
			},
			arc: function (a, b, c, e, r, g) {
				t(a) ? (e = a, b = e.y, c = e.r, a = e.x) : e = {
					innerR: e,
					start: r,
					end: g
				};
				a = this.symbol("arc", a, b, c, c, e);
				a.r = c;
				return a
			},
			rect: function (a, b, c, e, r, g) {
				r = t(a) ? a.r : r;
				var l = this.createElement("rect");
				a = t(a) ? a : "undefined" === typeof a ? {} : {
					x: a,
					y: b,
					width: Math.max(c, 0),
					height: Math.max(e, 0)
				};
				this.styledMode || ("undefined" !== typeof g && (a.strokeWidth = g, a = l.crisp(a)), a.fill = "none");
				r &&
					(a.r = r);
				l.rSetter = function (a, b, c) {
					l.r = a;
					F(c, {
						rx: a,
						ry: a
					})
				};
				l.rGetter = function () {
					return l.r
				};
				return l.attr(a)
			},
			setSize: function (a, b, c) {
				var e = this.alignedObjects,
					r = e.length;
				this.width = a;
				this.height = b;
				for (this.boxWrapper.animate({
						width: a,
						height: b
					}, {
						step: function () {
							this.attr({
								viewBox: "0 0 " + this.attr("width") + " " + this.attr("height")
							})
						},
						duration: n(c, !0) ? void 0 : 0
					}); r--;) e[r].align()
			},
			g: function (a) {
				var b = this.createElement("g");
				return a ? b.attr({
					"class": "highcharts-" + a
				}) : b
			},
			image: function (a, b, c, r, g, l) {
				var G = {
						preserveAspectRatio: "none"
					},
					m = function (a, b) {
						a.setAttributeNS ? a.setAttributeNS("http://www.w3.org/1999/xlink", "href", b) : a.setAttribute("hc-svg-href", b)
					},
					d = function (b) {
						m(v.element, a);
						l.call(v, b)
					};
				1 < arguments.length && p(G, {
					x: b,
					y: c,
					width: r,
					height: g
				});
				var v = this.createElement("image").attr(G);
				l ? (m(v.element, "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="), G = new W.Image, e(G, "load", d), G.src = a, G.complete && d({})) : m(v.element, a);
				return v
			},
			symbol: function (b, c, e, r, l, G) {
				var m = this,
					v = /^url\((.*?)\)$/,
					d = v.test(b),
					h = !d && (this.symbols[b] ? b : "circle"),
					B = h && this.symbols[h],
					z = A(c) && B && B.call(this.symbols, Math.round(c), Math.round(e), r, l, G);
				if (B) {
					var K = this.path(z);
					m.styledMode || K.attr("fill", "none");
					p(K, {
						symbolName: h,
						x: c,
						y: e,
						width: r,
						height: l
					});
					G && p(K, G)
				} else if (d) {
					var N = b.match(v)[1];
					K = this.image(N);
					K.imgwidth = n(S[N] && S[N].width, G && G.width);
					K.imgheight = n(S[N] && S[N].height, G && G.height);
					var k = function () {
						K.attr({
							width: K.width,
							height: K.height
						})
					};
					["width", "height"].forEach(function (a) {
						K[a +
							"Setter"] = function (a, b) {
							var c = {},
								e = this["img" + b],
								r = "width" === b ? "translateX" : "translateY";
							this[b] = a;
							A(e) && (G && "within" === G.backgroundSize && this.width && this.height && (e = Math.round(e * Math.min(this.width / this.imgwidth, this.height / this.imgheight))), this.element && this.element.setAttribute(b, e), this.alignByTranslate || (c[r] = ((this[b] || 0) - e) / 2, this.attr(c)))
						}
					});
					A(c) && K.attr({
						x: c,
						y: e
					});
					K.isImg = !0;
					A(K.imgwidth) && A(K.imgheight) ? k() : (K.attr({
						width: 0,
						height: 0
					}), q("img", {
						onload: function () {
							var b = a[m.chartIndex];
							0 ===
								this.width && (g(this, {
									position: "absolute",
									top: "-999em"
								}), C.body.appendChild(this));
							S[N] = {
								width: this.width,
								height: this.height
							};
							K.imgwidth = this.width;
							K.imgheight = this.height;
							K.element && k();
							this.parentNode && this.parentNode.removeChild(this);
							m.imgCount--;
							if (!m.imgCount && b && b.onload) b.onload()
						},
						src: N
					}), this.imgCount++)
				}
				return K
			},
			symbols: {
				circle: function (a, b, c, e) {
					return this.arc(a + c / 2, b + e / 2, c / 2, e / 2, {
						start: .5 * Math.PI,
						end: 2.5 * Math.PI,
						open: !1
					})
				},
				square: function (a, b, c, e) {
					return ["M", a, b, "L", a + c, b, a + c, b + e, a, b +
						e, "Z"
					]
				},
				triangle: function (a, b, c, e) {
					return ["M", a + c / 2, b, "L", a + c, b + e, a, b + e, "Z"]
				},
				"triangle-down": function (a, b, c, e) {
					return ["M", a, b, "L", a + c, b, a + c / 2, b + e, "Z"]
				},
				diamond: function (a, b, c, e) {
					return ["M", a + c / 2, b, "L", a + c, b + e / 2, a + c / 2, b + e, a, b + e / 2, "Z"]
				},
				arc: function (a, b, c, e, r) {
					var g = r.start,
						l = r.r || c,
						G = r.r || e || c,
						m = r.end - .001;
					c = r.innerR;
					e = n(r.open, .001 > Math.abs(r.end - r.start - 2 * Math.PI));
					var v = Math.cos(g),
						d = Math.sin(g),
						q = Math.cos(m);
					m = Math.sin(m);
					g = n(r.longArc, .001 > r.end - g - Math.PI ? 0 : 1);
					l = ["M", a + l * v, b + G * d, "A", l, G, 0, g,
						n(r.clockwise, 1), a + l * q, b + G * m
					];
					A(c) && l.push(e ? "M" : "L", a + c * q, b + c * m, "A", c, c, 0, g, A(r.clockwise) ? 1 - r.clockwise : 0, a + c * v, b + c * d);
					l.push(e ? "" : "Z");
					return l
				},
				callout: function (a, b, c, e, r) {
					var g = Math.min(r && r.r || 0, c, e),
						l = g + 6,
						G = r && r.anchorX;
					r = r && r.anchorY;
					var m = ["M", a + g, b, "L", a + c - g, b, "C", a + c, b, a + c, b, a + c, b + g, "L", a + c, b + e - g, "C", a + c, b + e, a + c, b + e, a + c - g, b + e, "L", a + g, b + e, "C", a, b + e, a, b + e, a, b + e - g, "L", a, b + g, "C", a, b, a, b, a + g, b];
					G && G > c ? r > b + l && r < b + e - l ? m.splice(13, 3, "L", a + c, r - 6, a + c + 6, r, a + c, r + 6, a + c, b + e - g) : m.splice(13, 3, "L", a + c,
						e / 2, G, r, a + c, e / 2, a + c, b + e - g) : G && 0 > G ? r > b + l && r < b + e - l ? m.splice(33, 3, "L", a, r + 6, a - 6, r, a, r - 6, a, b + g) : m.splice(33, 3, "L", a, e / 2, G, r, a, e / 2, a, b + g) : r && r > e && G > a + l && G < a + c - l ? m.splice(23, 3, "L", G + 6, b + e, G, b + e + 6, G - 6, b + e, a + g, b + e) : r && 0 > r && G > a + l && G < a + c - l && m.splice(3, 3, "L", G - 6, b, G, b - 6, G + 6, b, c - g, b);
					return m
				}
			},
			clipRect: function (a, b, c, e) {
				var r = d.uniqueKey() + "-",
					g = this.createElement("clipPath").attr({
						id: r
					}).add(this.defs);
				a = this.rect(a, b, c, e, 0).add(g);
				a.id = r;
				a.clipPath = g;
				a.count = 0;
				return a
			},
			text: function (a, b, c, e) {
				var r = {};
				if (e &&
					(this.allowHTML || !this.forExport)) return this.html(a, b, c);
				r.x = Math.round(b || 0);
				c && (r.y = Math.round(c));
				A(a) && (r.text = a);
				a = this.createElement("text").attr(r);
				e || (a.xSetter = function (a, b, c) {
					var e = c.getElementsByTagName("tspan"),
						r = c.getAttribute(b),
						g;
					for (g = 0; g < e.length; g++) {
						var l = e[g];
						l.getAttribute(b) === r && l.setAttribute(b, a)
					}
					c.setAttribute(b, a)
				});
				return a
			},
			fontMetrics: function (a, b) {
				a = !this.styledMode && /px/.test(a) || !W.getComputedStyle ? a || b && b.style && b.style.fontSize || this.style && this.style.fontSize :
					b && O.prototype.getStyle.call(b, "font-size");
				a = /px/.test(a) ? E(a) : 12;
				b = 24 > a ? a + 3 : Math.round(1.2 * a);
				return {
					h: b,
					b: Math.round(.8 * b),
					f: a
				}
			},
			rotCorr: function (a, b, c) {
				var e = a;
				b && c && (e = Math.max(e * Math.cos(b * m), 4));
				return {
					x: -a / 3 * Math.sin(b * m),
					y: e
				}
			},
			label: function (a, b, c, e, g, l, G, m, v) {
				var d = this,
					q = d.styledMode,
					h = d.g("button" !== v && "label"),
					B = h.text = d.text("", 0, 0, G).attr({
						zIndex: 1
					}),
					z, N, k = 0,
					C = 3,
					n = 0,
					K, f, U, J, E, Q = {},
					t, y, S = /^url\((.*?)\)$/.test(e),
					x = q || S,
					W = function () {
						return q ? z.strokeWidth() % 2 / 2 : (t ? parseInt(t, 10) : 0) % 2 /
							2
					};
				v && h.addClass("highcharts-" + v);
				var H = function () {
					var a = B.element.style,
						b = {};
					N = ("undefined" === typeof K || "undefined" === typeof f || E) && A(B.textStr) && B.getBBox();
					h.width = (K || N.width || 0) + 2 * C + n;
					h.height = (f || N.height || 0) + 2 * C;
					y = C + Math.min(d.fontMetrics(a && a.fontSize, B).b, N ? N.height : Infinity);
					x && (z || (h.box = z = d.symbols[e] || S ? d.symbol(e) : d.rect(), z.addClass(("button" === v ? "" : "highcharts-label-box") + (v ? " highcharts-" + v + "-box" : "")), z.add(h), a = W(), b.x = a, b.y = (m ? -y : 0) + a), b.width = Math.round(h.width), b.height = Math.round(h.height),
						z.attr(p(b, Q)), Q = {})
				};
				var Y = function () {
					var a = n + C;
					var b = m ? 0 : y;
					A(K) && N && ("center" === E || "right" === E) && (a += {
						center: .5,
						right: 1
					} [E] * (K - N.width));
					if (a !== B.x || b !== B.y) B.attr("x", a), B.hasBoxWidthChanged && (N = B.getBBox(!0), H()), "undefined" !== typeof b && B.attr("y", b);
					B.x = a;
					B.y = b
				};
				var D = function (a, b) {
					z ? z.attr(a, b) : Q[a] = b
				};
				h.onAdd = function () {
					B.add(h);
					h.attr({
						text: a || 0 === a ? a : "",
						x: b,
						y: c
					});
					z && A(g) && h.attr({
						anchorX: g,
						anchorY: l
					})
				};
				h.widthSetter = function (a) {
					K = u(a) ? a : null
				};
				h.heightSetter = function (a) {
					f = a
				};
				h["text-alignSetter"] =
					function (a) {
						E = a
					};
				h.paddingSetter = function (a) {
					A(a) && a !== C && (C = h.padding = a, Y())
				};
				h.paddingLeftSetter = function (a) {
					A(a) && a !== n && (n = a, Y())
				};
				h.alignSetter = function (a) {
					a = {
						left: 0,
						center: .5,
						right: 1
					} [a];
					a !== k && (k = a, N && h.attr({
						x: U
					}))
				};
				h.textSetter = function (a) {
					"undefined" !== typeof a && B.attr({
						text: a
					});
					H();
					Y()
				};
				h["stroke-widthSetter"] = function (a, b) {
					a && (x = !0);
					t = this["stroke-width"] = a;
					D(b, a)
				};
				q ? h.rSetter = function (a, b) {
					D(b, a)
				} : h.strokeSetter = h.fillSetter = h.rSetter = function (a, b) {
					"r" !== b && ("fill" === b && a && (x = !0), h[b] =
						a);
					D(b, a)
				};
				h.anchorXSetter = function (a, b) {
					g = h.anchorX = a;
					D(b, Math.round(a) - W() - U)
				};
				h.anchorYSetter = function (a, b) {
					l = h.anchorY = a;
					D(b, a - J)
				};
				h.xSetter = function (a) {
					h.x = a;
					k && (a -= k * ((K || N.width) + 2 * C), h["forceAnimate:x"] = !0);
					U = Math.round(a);
					h.attr("translateX", U)
				};
				h.ySetter = function (a) {
					J = h.y = Math.round(a);
					h.attr("translateY", J)
				};
				var P = h.css;
				G = {
					css: function (a) {
						if (a) {
							var b = {};
							a = I(a);
							h.textProps.forEach(function (c) {
								"undefined" !== typeof a[c] && (b[c] = a[c], delete a[c])
							});
							B.css(b);
							"width" in b && H();
							"fontSize" in b &&
								(H(), Y())
						}
						return P.call(h, a)
					},
					getBBox: function () {
						return {
							width: N.width + 2 * C,
							height: N.height + 2 * C,
							x: N.x - C,
							y: N.y - C
						}
					},
					destroy: function () {
						r(h.element, "mouseenter");
						r(h.element, "mouseleave");
						B && (B = B.destroy());
						z && (z = z.destroy());
						O.prototype.destroy.call(h);
						h = d = H = Y = D = null
					}
				};
				q || (G.shadow = function (a) {
					a && (H(), z && z.shadow(a));
					return h
				});
				return p(h, G)
			}
		});
		d.Renderer = f
	});
	M(w, "parts/Html.js", [w["parts/Globals.js"], w["parts/Utilities.js"]], function (d, f) {
		var L = f.attr,
			F = f.defined,
			A = f.extend,
			D = f.pick,
			x = f.pInt,
			p = d.createElement,
			H = d.css,
			u = d.isFirefox,
			t = d.isMS,
			y = d.isWebKit,
			k = d.SVGElement;
		f = d.SVGRenderer;
		var n = d.win;
		A(k.prototype, {
			htmlCss: function (d) {
				var h = "SPAN" === this.element.tagName && d && "width" in d,
					e = D(h && d.width, void 0);
				if (h) {
					delete d.width;
					this.textWidth = e;
					var c = !0
				}
				d && "ellipsis" === d.textOverflow && (d.whiteSpace = "nowrap", d.overflow = "hidden");
				this.styles = A(this.styles, d);
				H(this.element, d);
				c && this.htmlUpdateTransform();
				return this
			},
			htmlGetBBox: function () {
				var d = this.element;
				return {
					x: d.offsetLeft,
					y: d.offsetTop,
					width: d.offsetWidth,
					height: d.offsetHeight
				}
			},
			htmlUpdateTransform: function () {
				if (this.added) {
					var d = this.renderer,
						h = this.element,
						e = this.translateX || 0,
						c = this.translateY || 0,
						a = this.x || 0,
						b = this.y || 0,
						g = this.textAlign || "left",
						q = {
							left: 0,
							center: .5,
							right: 1
						} [g],
						m = this.styles,
						k = m && m.whiteSpace;
					H(h, {
						marginLeft: e,
						marginTop: c
					});
					!d.styledMode && this.shadows && this.shadows.forEach(function (a) {
						H(a, {
							marginLeft: e + 1,
							marginTop: c + 1
						})
					});
					this.inverted && [].forEach.call(h.childNodes, function (a) {
						d.invertChild(a, h)
					});
					if ("SPAN" === h.tagName) {
						m = this.rotation;
						var z = this.textWidth && x(this.textWidth),
							l = [m, g, h.innerHTML, this.textWidth, this.textAlign].join(),
							v;
						(v = z !== this.oldTextWidth) && !(v = z > this.oldTextWidth) && ((v = this.textPxLength) || (H(h, {
							width: "",
							whiteSpace: k || "nowrap"
						}), v = h.offsetWidth), v = v > z);
						v && (/[ \-]/.test(h.textContent || h.innerText) || "ellipsis" === h.style.textOverflow) ? (H(h, {
							width: z + "px",
							display: "block",
							whiteSpace: k || "normal"
						}), this.oldTextWidth = z, this.hasBoxWidthChanged = !0) : this.hasBoxWidthChanged = !1;
						l !== this.cTT && (k = d.fontMetrics(h.style.fontSize,
							h).b, !F(m) || m === (this.oldRotation || 0) && g === this.oldAlign || this.setSpanRotation(m, q, k), this.getSpanCorrection(!F(m) && this.textPxLength || h.offsetWidth, k, q, m, g));
						H(h, {
							left: a + (this.xCorr || 0) + "px",
							top: b + (this.yCorr || 0) + "px"
						});
						this.cTT = l;
						this.oldRotation = m;
						this.oldAlign = g
					}
				} else this.alignOnAdd = !0
			},
			setSpanRotation: function (d, h, e) {
				var c = {},
					a = this.renderer.getTransformKey();
				c[a] = c.transform = "rotate(" + d + "deg)";
				c[a + (u ? "Origin" : "-origin")] = c.transformOrigin = 100 * h + "% " + e + "px";
				H(this.element, c)
			},
			getSpanCorrection: function (d,
				h, e) {
				this.xCorr = -d * e;
				this.yCorr = -h
			}
		});
		A(f.prototype, {
			getTransformKey: function () {
				return t && !/Edge/.test(n.navigator.userAgent) ? "-ms-transform" : y ? "-webkit-transform" : u ? "MozTransform" : n.opera ? "-o-transform" : ""
			},
			html: function (d, h, e) {
				var c = this.createElement("span"),
					a = c.element,
					b = c.renderer,
					g = b.isSVG,
					q = function (a, b) {
						["opacity", "visibility"].forEach(function (c) {
							a[c + "Setter"] = function (e, g, m) {
								var l = a.div ? a.div.style : b;
								k.prototype[c + "Setter"].call(this, e, g, m);
								l && (l[g] = e)
							}
						});
						a.addedSetters = !0
					};
				c.textSetter =
					function (b) {
						b !== a.innerHTML && (delete this.bBox, delete this.oldTextWidth);
						this.textStr = b;
						a.innerHTML = D(b, "");
						c.doTransform = !0
					};
				g && q(c, c.element.style);
				c.xSetter = c.ySetter = c.alignSetter = c.rotationSetter = function (a, b) {
					"align" === b && (b = "textAlign");
					c[b] = a;
					c.doTransform = !0
				};
				c.afterSetters = function () {
					this.doTransform && (this.htmlUpdateTransform(), this.doTransform = !1)
				};
				c.attr({
					text: d,
					x: Math.round(h),
					y: Math.round(e)
				}).css({
					position: "absolute"
				});
				b.styledMode || c.css({
					fontFamily: this.style.fontFamily,
					fontSize: this.style.fontSize
				});
				a.style.whiteSpace = "nowrap";
				c.css = c.htmlCss;
				g && (c.add = function (e) {
					var g = b.box.parentNode,
						m = [];
					if (this.parentGroup = e) {
						var l = e.div;
						if (!l) {
							for (; e;) m.push(e), e = e.parentGroup;
							m.reverse().forEach(function (a) {
								function b(b, c) {
									a[c] = b;
									"translateX" === c ? d.left = b + "px" : d.top = b + "px";
									a.doTransform = !0
								}
								var e = L(a.element, "class");
								l = a.div = a.div || p("div", e ? {
										className: e
									} : void 0, {
										position: "absolute",
										left: (a.translateX || 0) + "px",
										top: (a.translateY || 0) + "px",
										display: a.display,
										opacity: a.opacity,
										pointerEvents: a.styles && a.styles.pointerEvents
									},
									l || g);
								var d = l.style;
								A(a, {
									classSetter: function (a) {
										return function (b) {
											this.element.setAttribute("class", b);
											a.className = b
										}
									}(l),
									on: function () {
										m[0].div && c.on.apply({
											element: m[0].div
										}, arguments);
										return a
									},
									translateXSetter: b,
									translateYSetter: b
								});
								a.addedSetters || q(a)
							})
						}
					} else l = g;
					l.appendChild(a);
					c.added = !0;
					c.alignOnAdd && c.htmlUpdateTransform();
					return c
				});
				return c
			}
		})
	});
	M(w, "parts/Time.js", [w["parts/Globals.js"], w["parts/Utilities.js"]], function (d, f) {
		var L = f.defined,
			F = f.extend,
			A = f.isObject,
			D = f.objectEach,
			x =
			f.pad,
			p = f.pick,
			H = f.splat,
			u = d.merge,
			t = d.timeUnits,
			y = d.win;
		d.Time = function (d) {
			this.update(d, !1)
		};
		d.Time.prototype = {
			defaultOptions: {
				Date: void 0,
				getTimezoneOffset: void 0,
				timezone: void 0,
				timezoneOffset: 0,
				useUTC: !0
			},
			update: function (d) {
				var k = p(d && d.useUTC, !0),
					f = this;
				this.options = d = u(!0, this.options || {}, d);
				this.Date = d.Date || y.Date || Date;
				this.timezoneOffset = (this.useUTC = k) && d.timezoneOffset;
				this.getTimezoneOffset = this.timezoneOffsetFunction();
				(this.variableTimezone = !(k && !d.getTimezoneOffset && !d.timezone)) ||
				this.timezoneOffset ? (this.get = function (d, e) {
						var c = e.getTime(),
							a = c - f.getTimezoneOffset(e);
						e.setTime(a);
						d = e["getUTC" + d]();
						e.setTime(c);
						return d
					}, this.set = function (d, e, c) {
						if ("Milliseconds" === d || "Seconds" === d || "Minutes" === d && 0 === e.getTimezoneOffset() % 60) e["set" + d](c);
						else {
							var a = f.getTimezoneOffset(e);
							a = e.getTime() - a;
							e.setTime(a);
							e["setUTC" + d](c);
							d = f.getTimezoneOffset(e);
							a = e.getTime() + d;
							e.setTime(a)
						}
					}) : k ? (this.get = function (d, e) {
						return e["getUTC" + d]()
					}, this.set = function (d, e, c) {
						return e["setUTC" + d](c)
					}) :
					(this.get = function (d, e) {
						return e["get" + d]()
					}, this.set = function (d, e, c) {
						return e["set" + d](c)
					})
			},
			makeTime: function (k, n, f, h, e, c) {
				if (this.useUTC) {
					var a = this.Date.UTC.apply(0, arguments);
					var b = this.getTimezoneOffset(a);
					a += b;
					var g = this.getTimezoneOffset(a);
					b !== g ? a += g - b : b - 36E5 !== this.getTimezoneOffset(a - 36E5) || d.isSafari || (a -= 36E5)
				} else a = (new this.Date(k, n, p(f, 1), p(h, 0), p(e, 0), p(c, 0))).getTime();
				return a
			},
			timezoneOffsetFunction: function () {
				var k = this,
					n = this.options,
					f = y.moment;
				if (!this.useUTC) return function (d) {
					return 6E4 *
						(new Date(d)).getTimezoneOffset()
				};
				if (n.timezone) {
					if (f) return function (d) {
						return 6E4 * -f.tz(d, n.timezone).utcOffset()
					};
					d.error(25)
				}
				return this.useUTC && n.getTimezoneOffset ? function (d) {
					return 6E4 * n.getTimezoneOffset(d)
				} : function () {
					return 6E4 * (k.timezoneOffset || 0)
				}
			},
			dateFormat: function (k, n, f) {
				if (!L(n) || isNaN(n)) return d.defaultOptions.lang.invalidDate || "";
				k = p(k, "%Y-%m-%d %H:%M:%S");
				var h = this,
					e = new this.Date(n),
					c = this.get("Hours", e),
					a = this.get("Day", e),
					b = this.get("Date", e),
					g = this.get("Month", e),
					q = this.get("FullYear",
						e),
					m = d.defaultOptions.lang,
					C = m.weekdays,
					z = m.shortWeekdays;
				e = F({
					a: z ? z[a] : C[a].substr(0, 3),
					A: C[a],
					d: x(b),
					e: x(b, 2, " "),
					w: a,
					b: m.shortMonths[g],
					B: m.months[g],
					m: x(g + 1),
					o: g + 1,
					y: q.toString().substr(2, 2),
					Y: q,
					H: x(c),
					k: c,
					I: x(c % 12 || 12),
					l: c % 12 || 12,
					M: x(h.get("Minutes", e)),
					p: 12 > c ? "AM" : "PM",
					P: 12 > c ? "am" : "pm",
					S: x(e.getSeconds()),
					L: x(Math.floor(n % 1E3), 3)
				}, d.dateFormats);
				D(e, function (a, b) {
					for (; - 1 !== k.indexOf("%" + b);) k = k.replace("%" + b, "function" === typeof a ? a.call(h, n) : a)
				});
				return f ? k.substr(0, 1).toUpperCase() + k.substr(1) :
					k
			},
			resolveDTLFormat: function (d) {
				return A(d, !0) ? d : (d = H(d), {
					main: d[0],
					from: d[1],
					to: d[2]
				})
			},
			getTimeTicks: function (d, n, f, h) {
				var e = this,
					c = [],
					a = {};
				var b = new e.Date(n);
				var g = d.unitRange,
					q = d.count || 1,
					m;
				h = p(h, 1);
				if (L(n)) {
					e.set("Milliseconds", b, g >= t.second ? 0 : q * Math.floor(e.get("Milliseconds", b) / q));
					g >= t.second && e.set("Seconds", b, g >= t.minute ? 0 : q * Math.floor(e.get("Seconds", b) / q));
					g >= t.minute && e.set("Minutes", b, g >= t.hour ? 0 : q * Math.floor(e.get("Minutes", b) / q));
					g >= t.hour && e.set("Hours", b, g >= t.day ? 0 : q * Math.floor(e.get("Hours",
						b) / q));
					g >= t.day && e.set("Date", b, g >= t.month ? 1 : Math.max(1, q * Math.floor(e.get("Date", b) / q)));
					if (g >= t.month) {
						e.set("Month", b, g >= t.year ? 0 : q * Math.floor(e.get("Month", b) / q));
						var k = e.get("FullYear", b)
					}
					g >= t.year && e.set("FullYear", b, k - k % q);
					g === t.week && (k = e.get("Day", b), e.set("Date", b, e.get("Date", b) - k + h + (k < h ? -7 : 0)));
					k = e.get("FullYear", b);
					h = e.get("Month", b);
					var z = e.get("Date", b),
						l = e.get("Hours", b);
					n = b.getTime();
					e.variableTimezone && (m = f - n > 4 * t.month || e.getTimezoneOffset(n) !== e.getTimezoneOffset(f));
					n = b.getTime();
					for (b = 1; n < f;) c.push(n), n = g === t.year ? e.makeTime(k + b * q, 0) : g === t.month ? e.makeTime(k, h + b * q) : !m || g !== t.day && g !== t.week ? m && g === t.hour && 1 < q ? e.makeTime(k, h, z, l + b * q) : n + g * q : e.makeTime(k, h, z + b * q * (g === t.day ? 1 : 7)), b++;
					c.push(n);
					g <= t.hour && 1E4 > c.length && c.forEach(function (b) {
						0 === b % 18E5 && "000000000" === e.dateFormat("%H%M%S%L", b) && (a[b] = "day")
					})
				}
				c.info = F(d, {
					higherRanks: a,
					totalRange: g * q
				});
				return c
			}
		}
	});
	M(w, "parts/Options.js", [w["parts/Globals.js"]], function (d) {
		var f = d.color,
			L = d.merge;
		d.defaultOptions = {
			colors: "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),
			symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
			lang: {
				loading: "Loading...",
				months: "January February March April May June July August September October November December".split(" "),
				shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
				weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
				decimalPoint: ".",
				numericSymbols: "kMGTPE".split(""),
				resetZoom: "Reset zoom",
				resetZoomTitle: "Reset zoom level 1:1",
				thousandsSep: " "
			},
			global: {},
			time: d.Time.prototype.defaultOptions,
			chart: {
				styledMode: !1,
				borderRadius: 0,
				colorCount: 10,
				defaultSeriesType: "line",
				ignoreHiddenSeries: !0,
				spacing: [10, 10, 15, 10],
				resetZoomButton: {
					theme: {
						zIndex: 6
					},
					position: {
						align: "right",
						x: -10,
						y: 10
					}
				},
				width: null,
				height: null,
				borderColor: "#335cad",
				backgroundColor: "#ffffff",
				plotBorderColor: "#cccccc"
			},
			title: {
				text: "Chart title",
				align: "center",
				margin: 15,
				widthAdjust: -44
			},
			subtitle: {
				text: "",
				align: "center",
				widthAdjust: -44
			},
			caption: {
				margin: 15,
				text: "",
				align: "left",
				verticalAlign: "bottom"
			},
			plotOptions: {},
			labels: {
				style: {
					position: "absolute",
					color: "#333333"
				}
			},
			legend: {
				enabled: !0,
				align: "center",
				alignColumns: !0,
				layout: "horizontal",
				labelFormatter: function () {
					return this.name
				},
				borderColor: "#999999",
				borderRadius: 0,
				navigation: {
					activeColor: "#003399",
					inactiveColor: "#cccccc"
				},
				itemStyle: {
					color: "#333333",
					cursor: "pointer",
					fontSize: "12px",
					fontWeight: "bold",
					textOverflow: "ellipsis"
				},
				itemHoverStyle: {
					color: "#000000"
				},
				itemHiddenStyle: {
					color: "#cccccc"
				},
				shadow: !1,
				itemCheckboxStyle: {
					position: "absolute",
					width: "13px",
					height: "13px"
				},
				squareSymbol: !0,
				symbolPadding: 5,
				verticalAlign: "bottom",
				x: 0,
				y: 0,
				title: {
					style: {
						fontWeight: "bold"
					}
				}
			},
			loading: {
				labelStyle: {
					fontWeight: "bold",
					position: "relative",
					top: "45%"
				},
				style: {
					position: "absolute",
					backgroundColor: "#ffffff",
					opacity: .5,
					textAlign: "center"
				}
			},
			tooltip: {
				enabled: !0,
				animation: d.svg,
				borderRadius: 3,
				dateTimeLabelFormats: {
					millisecond: "%A, %b %e, %H:%M:%S.%L",
					second: "%A, %b %e, %H:%M:%S",
					minute: "%A, %b %e, %H:%M",
					hour: "%A, %b %e, %H:%M",
					day: "%A, %b %e, %Y",
					week: "Week from %A, %b %e, %Y",
					month: "%B %Y",
					year: "%Y"
				},
				footerFormat: "",
				padding: 8,
				snap: d.isTouchDevice ? 25 : 10,
				headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>',
				pointFormat: '<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.y}</b><br/>',
				backgroundColor: f("#f7f7f7").setOpacity(.85).get(),
				borderWidth: 1,
				shadow: !0,
				style: {
					color: "#333333",
					cursor: "default",
					fontSize: "12px",
					pointerEvents: "none",
					whiteSpace: "nowrap"
				}
			},
			credits: {
				enabled: !0,
				href: "https://www.highcharts.com?credits",
				position: {
					align: "right",
					x: -10,
					verticalAlign: "bottom",
					y: -5
				},
				style: {
					cursor: "pointer",
					color: "#999999",
					fontSize: "9px"
				},
				text: "Highcharts.com"
			}
		};
		d.setOptions = function (f) {
			d.defaultOptions = L(!0, d.defaultOptions, f);
			(f.time || f.global) && d.time.update(L(d.defaultOptions.global, d.defaultOptions.time, f.global, f.time));
			return d.defaultOptions
		};
		d.getOptions = function () {
			return d.defaultOptions
		};
		d.defaultPlotOptions = d.defaultOptions.plotOptions;
		d.time = new d.Time(L(d.defaultOptions.global, d.defaultOptions.time));
		d.dateFormat = function (f, A, D) {
			return d.time.dateFormat(f, A, D)
		};
		""
	});
	M(w, "parts/Tick.js",
		[w["parts/Globals.js"], w["parts/Utilities.js"]],
		function (d, f) {
			var L = f.clamp,
				F = f.correctFloat,
				A = f.defined,
				D = f.destroyObjectProperties,
				x = f.extend,
				p = f.isNumber,
				H = f.objectEach,
				u = f.pick,
				t = d.fireEvent,
				y = d.merge,
				k = d.deg2rad;
			d.Tick = function (d, k, h, e, c) {
				this.axis = d;
				this.pos = k;
				this.type = h || "";
				this.isNewLabel = this.isNew = !0;
				this.parameters = c || {};
				this.tickmarkOffset = this.parameters.tickmarkOffset;
				this.options = this.parameters.options;
				h || e || this.addLabel()
			};
			d.Tick.prototype = {
				addLabel: function () {
					var d = this,
						k = d.axis,
						h = k.options,
						e = k.chart,
						c = k.categories,
						a = k.names,
						b = d.pos,
						g = u(d.options && d.options.labels, h.labels),
						q = k.tickPositions,
						m = b === q[0],
						f = b === q[q.length - 1];
					a = this.parameters.category || (c ? u(c[b], a[b], b) : b);
					var z = d.label;
					c = (!g.step || 1 === g.step) && 1 === k.tickInterval;
					q = q.info;
					var l, v;
					if (k.isDatetimeAxis && q) {
						var B = e.time.resolveDTLFormat(h.dateTimeLabelFormats[!h.grid && q.higherRanks[b] || q.unitName]);
						var I = B.main
					}
					d.isFirst = m;
					d.isLast = f;
					d.formatCtx = {
						axis: k,
						chart: e,
						isFirst: m,
						isLast: f,
						dateTimeLabelFormat: I,
						tickPositionInfo: q,
						value: k.isLog ? F(k.lin2log(a)) : a,
						pos: b
					};
					h = k.labelFormatter.call(d.formatCtx, this.formatCtx);
					if (v = B && B.list) d.shortenLabel = function () {
						for (l = 0; l < v.length; l++)
							if (z.attr({
									text: k.labelFormatter.call(x(d.formatCtx, {
										dateTimeLabelFormat: v[l]
									}))
								}), z.getBBox().width < k.getSlotWidth(d) - 2 * u(g.padding, 5)) return;
						z.attr({
							text: ""
						})
					};
					c && k._addedPlotLB && k.isXAxis && d.moveLabel(h, g);
					A(z) || d.movedLabel ? z && z.textStr !== h && !c && (!z.textWidth || g.style && g.style.width || z.styles.width || z.css({
							width: null
						}), z.attr({
							text: h
						}), z.textPxLength =
						z.getBBox().width) : (d.label = z = d.createLabel({
						x: 0,
						y: 0
					}, h, g), d.rotation = 0)
				},
				moveLabel: function (d, k) {
					var h = this,
						e = h.label,
						c = !1,
						a = h.axis,
						b = a.reversed,
						g = a.chart.inverted;
					e && e.textStr === d ? (h.movedLabel = e, c = !0, delete h.label) : H(a.ticks, function (a) {
						c || a.isNew || a === h || !a.label || a.label.textStr !== d || (h.movedLabel = a.label, c = !0, a.labelPos = h.movedLabel.xy, delete a.label)
					});
					if (!c && (h.labelPos || e)) {
						var q = h.labelPos || e.xy;
						e = g ? q.x : b ? 0 : a.width + a.left;
						a = g ? b ? a.width + a.left : 0 : q.y;
						h.movedLabel = h.createLabel({
								x: e,
								y: a
							},
							d, k);
						h.movedLabel && h.movedLabel.attr({
							opacity: 0
						})
					}
				},
				createLabel: function (d, k, h) {
					var e = this.axis,
						c = e.chart;
					if (d = A(k) && h.enabled ? c.renderer.text(k, d.x, d.y, h.useHTML).add(e.labelGroup) : null) c.styledMode || d.css(y(h.style)), d.textPxLength = d.getBBox().width;
					return d
				},
				replaceMovedLabel: function () {
					var d = this.label,
						k = this.axis,
						h = k.reversed,
						e = this.axis.chart.inverted;
					if (d && !this.isNew) {
						var c = e ? d.xy.x : h ? k.left : k.width + k.left;
						h = e ? h ? k.width + k.top : k.top : d.xy.y;
						d.animate({
							x: c,
							y: h,
							opacity: 0
						}, void 0, d.destroy);
						delete this.label
					}
					k.isDirty = !0;
					this.label = this.movedLabel;
					delete this.movedLabel
				},
				getLabelSize: function () {
					return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0
				},
				handleOverflow: function (d) {
					var f = this.axis,
						h = f.options.labels,
						e = d.x,
						c = f.chart.chartWidth,
						a = f.chart.spacing,
						b = u(f.labelLeft, Math.min(f.pos, a[3]));
					a = u(f.labelRight, Math.max(f.isRadial ? 0 : f.pos + f.len, c - a[1]));
					var g = this.label,
						q = this.rotation,
						m = {
							left: 0,
							center: .5,
							right: 1
						} [f.labelAlign || g.attr("align")],
						C = g.getBBox().width,
						z = f.getSlotWidth(this),
						l = z,
						v =
						1,
						B, I = {};
					if (q || "justify" !== u(h.overflow, "justify")) 0 > q && e - m * C < b ? B = Math.round(e / Math.cos(q * k) - b) : 0 < q && e + m * C > a && (B = Math.round((c - e) / Math.cos(q * k)));
					else if (c = e + (1 - m) * C, e - m * C < b ? l = d.x + l * (1 - m) - b : c > a && (l = a - d.x + l * m, v = -1), l = Math.min(z, l), l < z && "center" === f.labelAlign && (d.x += v * (z - l - m * (z - Math.min(C, l)))), C > l || f.autoRotation && (g.styles || {}).width) B = l;
					B && (this.shortenLabel ? this.shortenLabel() : (I.width = Math.floor(B), (h.style || {}).textOverflow || (I.textOverflow = "ellipsis"), g.css(I)))
				},
				getPosition: function (d, k, h,
					e) {
					var c = this.axis,
						a = c.chart,
						b = e && a.oldChartHeight || a.chartHeight;
					d = {
						x: d ? F(c.translate(k + h, null, null, e) + c.transB) : c.left + c.offset + (c.opposite ? (e && a.oldChartWidth || a.chartWidth) - c.right - c.left : 0),
						y: d ? b - c.bottom + c.offset - (c.opposite ? c.height : 0) : F(b - c.translate(k + h, null, null, e) - c.transB)
					};
					d.y = L(d.y, -1E5, 1E5);
					t(this, "afterGetPosition", {
						pos: d
					});
					return d
				},
				getLabelPosition: function (d, f, h, e, c, a, b, g) {
					var q = this.axis,
						m = q.transA,
						C = q.isLinked && q.linkedParent ? q.linkedParent.reversed : q.reversed,
						z = q.staggerLines,
						l = q.tickRotCorr || {
							x: 0,
							y: 0
						},
						v = c.y,
						B = e || q.reserveSpaceDefault ? 0 : -q.labelOffset * ("center" === q.labelAlign ? .5 : 1),
						I = {};
					A(v) || (v = 0 === q.side ? h.rotation ? -8 : -h.getBBox().height : 2 === q.side ? l.y + 8 : Math.cos(h.rotation * k) * (l.y - h.getBBox(!1, 0).height / 2));
					d = d + c.x + B + l.x - (a && e ? a * m * (C ? -1 : 1) : 0);
					f = f + v - (a && !e ? a * m * (C ? 1 : -1) : 0);
					z && (h = b / (g || 1) % z, q.opposite && (h = z - h - 1), f += q.labelOffset / z * h);
					I.x = d;
					I.y = Math.round(f);
					t(this, "afterGetLabelPosition", {
						pos: I,
						tickmarkOffset: a,
						index: b
					});
					return I
				},
				getMarkPath: function (d, k, h, e, c, a) {
					return a.crispLine(["M",
						d, k, "L", d + (c ? 0 : -h), k + (c ? h : 0)
					], e)
				},
				renderGridLine: function (d, k, h) {
					var e = this.axis,
						c = e.options,
						a = this.gridLine,
						b = {},
						g = this.pos,
						q = this.type,
						m = u(this.tickmarkOffset, e.tickmarkOffset),
						f = e.chart.renderer,
						z = q ? q + "Grid" : "grid",
						l = c[z + "LineWidth"],
						v = c[z + "LineColor"];
					c = c[z + "LineDashStyle"];
					a || (e.chart.styledMode || (b.stroke = v, b["stroke-width"] = l, c && (b.dashstyle = c)), q || (b.zIndex = 1), d && (k = 0), this.gridLine = a = f.path().attr(b).addClass("highcharts-" + (q ? q + "-" : "") + "grid-line").add(e.gridGroup));
					if (a && (h = e.getPlotLinePath({
							value: g +
								m,
							lineWidth: a.strokeWidth() * h,
							force: "pass",
							old: d
						}))) a[d || this.isNew ? "attr" : "animate"]({
						d: h,
						opacity: k
					})
				},
				renderMark: function (d, k, h) {
					var e = this.axis,
						c = e.options,
						a = e.chart.renderer,
						b = this.type,
						g = b ? b + "Tick" : "tick",
						q = e.tickSize(g),
						m = this.mark,
						f = !m,
						z = d.x;
					d = d.y;
					var l = u(c[g + "Width"], !b && e.isXAxis ? 1 : 0);
					c = c[g + "Color"];
					q && (e.opposite && (q[0] = -q[0]), f && (this.mark = m = a.path().addClass("highcharts-" + (b ? b + "-" : "") + "tick").add(e.axisGroup), e.chart.styledMode || m.attr({
						stroke: c,
						"stroke-width": l
					})), m[f ? "attr" : "animate"]({
						d: this.getMarkPath(z,
							d, q[0], m.strokeWidth() * h, e.horiz, a),
						opacity: k
					}))
				},
				renderLabel: function (d, k, h, e) {
					var c = this.axis,
						a = c.horiz,
						b = c.options,
						g = this.label,
						q = b.labels,
						m = q.step;
					c = u(this.tickmarkOffset, c.tickmarkOffset);
					var f = !0,
						z = d.x;
					d = d.y;
					g && p(z) && (g.xy = d = this.getLabelPosition(z, d, g, a, q, c, e, m), this.isFirst && !this.isLast && !u(b.showFirstLabel, 1) || this.isLast && !this.isFirst && !u(b.showLastLabel, 1) ? f = !1 : !a || q.step || q.rotation || k || 0 === h || this.handleOverflow(d), m && e % m && (f = !1), f && p(d.y) ? (d.opacity = h, g[this.isNewLabel ? "attr" : "animate"](d),
						this.isNewLabel = !1) : (g.attr("y", -9999), this.isNewLabel = !0))
				},
				render: function (k, f, h) {
					var e = this.axis,
						c = e.horiz,
						a = this.pos,
						b = u(this.tickmarkOffset, e.tickmarkOffset);
					a = this.getPosition(c, a, b, f);
					b = a.x;
					var g = a.y;
					e = c && b === e.pos + e.len || !c && g === e.pos ? -1 : 1;
					h = u(h, 1);
					this.isActive = !0;
					this.renderGridLine(f, h, e);
					this.renderMark(a, h, e);
					this.renderLabel(a, f, h, k);
					this.isNew = !1;
					d.fireEvent(this, "afterRender")
				},
				destroy: function () {
					D(this, this.axis)
				}
			}
		});
	M(w, "parts/Axis.js", [w["parts/Globals.js"], w["parts/Utilities.js"]],
		function (d, f) {
			var L = f.animObject,
				F = f.arrayMax,
				A = f.arrayMin,
				D = f.clamp,
				x = f.correctFloat,
				p = f.defined,
				H = f.destroyObjectProperties,
				u = f.extend,
				t = f.isArray,
				y = f.isNumber,
				k = f.isString,
				n = f.objectEach,
				E = f.pick,
				h = f.relativeLength,
				e = f.splat,
				c = f.syncTimeout,
				a = d.addEvent,
				b = d.color,
				g = d.defaultOptions,
				q = d.deg2rad,
				m = d.fireEvent,
				C = d.format,
				z = d.getMagnitude,
				l = d.merge,
				v = d.normalizeTickInterval,
				B = d.removeEvent,
				I = d.seriesTypes,
				J = d.Tick;
			f = function () {
				this.init.apply(this, arguments)
			};
			u(f.prototype, {
				defaultOptions: {
					dateTimeLabelFormats: {
						millisecond: {
							main: "%H:%M:%S.%L",
							range: !1
						},
						second: {
							main: "%H:%M:%S",
							range: !1
						},
						minute: {
							main: "%H:%M",
							range: !1
						},
						hour: {
							main: "%H:%M",
							range: !1
						},
						day: {
							main: "%e. %b"
						},
						week: {
							main: "%e. %b"
						},
						month: {
							main: "%b '%y"
						},
						year: {
							main: "%Y"
						}
					},
					endOnTick: !1,
					labels: {
						enabled: !0,
						indentation: 10,
						x: 0,
						style: {
							color: "#666666",
							cursor: "default",
							fontSize: "11px"
						}
					},
					maxPadding: .01,
					minorTickLength: 2,
					minorTickPosition: "outside",
					minPadding: .01,
					showEmpty: !0,
					startOfWeek: 1,
					startOnTick: !1,
					tickLength: 10,
					tickPixelInterval: 100,
					tickmarkPlacement: "between",
					tickPosition: "outside",
					title: {
						align: "middle",
						style: {
							color: "#666666"
						}
					},
					type: "linear",
					minorGridLineColor: "#f2f2f2",
					minorGridLineWidth: 1,
					minorTickColor: "#999999",
					lineColor: "#ccd6eb",
					lineWidth: 1,
					gridLineColor: "#e6e6e6",
					tickColor: "#ccd6eb"
				},
				defaultYAxisOptions: {
					endOnTick: !0,
					maxPadding: .05,
					minPadding: .05,
					tickPixelInterval: 72,
					showLastLabel: !0,
					labels: {
						x: -8
					},
					startOnTick: !0,
					title: {
						rotation: 270,
						text: "Values"
					},
					stackLabels: {
						allowOverlap: !1,
						enabled: !1,
						crop: !0,
						overflow: "justify",
						formatter: function () {
							var a = this.axis.chart.numberFormatter;
							return a(this.total,
								-1)
						},
						style: {
							color: "#000000",
							fontSize: "11px",
							fontWeight: "bold",
							textOutline: "1px contrast"
						}
					},
					gridLineWidth: 1,
					lineWidth: 0
				},
				defaultLeftAxisOptions: {
					labels: {
						x: -15
					},
					title: {
						rotation: 270
					}
				},
				defaultRightAxisOptions: {
					labels: {
						x: 15
					},
					title: {
						rotation: 90
					}
				},
				defaultBottomAxisOptions: {
					labels: {
						autoRotation: [-45],
						x: 0
					},
					margin: 15,
					title: {
						rotation: 0
					}
				},
				defaultTopAxisOptions: {
					labels: {
						autoRotation: [-45],
						x: 0
					},
					margin: 15,
					title: {
						rotation: 0
					}
				},
				init: function (b, c) {
					var r = c.isX,
						g = this;
					g.chart = b;
					g.horiz = b.inverted && !g.isZAxis ? !r : r;
					g.isXAxis =
						r;
					g.coll = g.coll || (r ? "xAxis" : "yAxis");
					m(this, "init", {
						userOptions: c
					});
					g.opposite = c.opposite;
					g.side = c.side || (g.horiz ? g.opposite ? 0 : 2 : g.opposite ? 1 : 3);
					g.setOptions(c);
					var l = this.options,
						G = l.type;
					g.labelFormatter = l.labels.formatter || g.defaultLabelFormatter;
					g.userOptions = c;
					g.minPixelPadding = 0;
					g.reversed = l.reversed;
					g.visible = !1 !== l.visible;
					g.zoomEnabled = !1 !== l.zoomEnabled;
					g.hasNames = "category" === G || !0 === l.categories;
					g.categories = l.categories || g.hasNames;
					g.names || (g.names = [], g.names.keys = {});
					g.plotLinesAndBandsGroups = {};
					g.isLog = "logarithmic" === G;
					g.isDatetimeAxis = "datetime" === G;
					g.positiveValuesOnly = g.isLog && !g.allowNegativeLog;
					g.isLinked = p(l.linkedTo);
					g.ticks = {};
					g.labelEdge = [];
					g.minorTicks = {};
					g.plotLinesAndBands = [];
					g.alternateBands = {};
					g.len = 0;
					g.minRange = g.userMinRange = l.minRange || l.maxZoom;
					g.range = l.range;
					g.offset = l.offset || 0;
					g.stacks = {};
					g.oldStacks = {};
					g.stacksTouched = 0;
					g.max = null;
					g.min = null;
					g.crosshair = E(l.crosshair, e(b.options.tooltip.crosshairs)[r ? 0 : 1], !1);
					c = g.options.events; - 1 === b.axes.indexOf(g) && (r ? b.axes.splice(b.xAxis.length,
						0, g) : b.axes.push(g), b[g.coll].push(g));
					g.series = g.series || [];
					b.inverted && !g.isZAxis && r && "undefined" === typeof g.reversed && (g.reversed = !0);
					n(c, function (b, c) {
						d.isFunction(b) && a(g, c, b)
					});
					g.lin2log = l.linearToLogConverter || g.lin2log;
					g.isLog && (g.val2lin = g.log2lin, g.lin2val = g.lin2log);
					m(this, "afterInit")
				},
				setOptions: function (a) {
					this.options = l(this.defaultOptions, "yAxis" === this.coll && this.defaultYAxisOptions, [this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side],
						l(g[this.coll], a));
					m(this, "afterSetOptions", {
						userOptions: a
					})
				},
				defaultLabelFormatter: function () {
					var a = this.axis,
						b = this.value,
						c = a.chart.time,
						e = a.categories,
						l = this.dateTimeLabelFormat,
						d = g.lang,
						m = d.numericSymbols;
					d = d.numericSymbolMagnitude || 1E3;
					var q = m && m.length,
						v = a.options.labels.format;
					a = a.isLog ? Math.abs(b) : a.tickInterval;
					var h = this.chart,
						B = h.numberFormatter;
					if (v) var k = C(v, this, h);
					else if (e) k = b;
					else if (l) k = c.dateFormat(l, b);
					else if (q && 1E3 <= a)
						for (; q-- && "undefined" === typeof k;) c = Math.pow(d, q + 1), a >= c &&
							0 === 10 * b % c && null !== m[q] && 0 !== b && (k = B(b / c, -1) + m[q]);
					"undefined" === typeof k && (k = 1E4 <= Math.abs(b) ? B(b, -1) : B(b, -1, void 0, ""));
					return k
				},
				getSeriesExtremes: function () {
					var a = this,
						b = a.chart,
						c;
					m(this, "getSeriesExtremes", null, function () {
						a.hasVisibleSeries = !1;
						a.dataMin = a.dataMax = a.threshold = null;
						a.softThreshold = !a.isXAxis;
						a.buildStacks && a.buildStacks();
						a.series.forEach(function (e) {
							if (e.visible || !b.options.chart.ignoreHiddenSeries) {
								var g = e.options,
									r = g.threshold;
								a.hasVisibleSeries = !0;
								a.positiveValuesOnly && 0 >=
									r && (r = null);
								if (a.isXAxis) {
									if (g = e.xData, g.length) {
										c = e.getXExtremes(g);
										var l = c.min;
										var d = c.max;
										y(l) || l instanceof Date || (g = g.filter(y), c = e.getXExtremes(g), l = c.min, d = c.max);
										g.length && (a.dataMin = Math.min(E(a.dataMin, l), l), a.dataMax = Math.max(E(a.dataMax, d), d))
									}
								} else if (e.getExtremes(), d = e.dataMax, l = e.dataMin, p(l) && p(d) && (a.dataMin = Math.min(E(a.dataMin, l), l), a.dataMax = Math.max(E(a.dataMax, d), d)), p(r) && (a.threshold = r), !g.softThreshold || a.positiveValuesOnly) a.softThreshold = !1
							}
						})
					});
					m(this, "afterGetSeriesExtremes")
				},
				translate: function (a, b, c, e, g, l) {
					var r = this.linkedParent || this,
						d = 1,
						G = 0,
						m = e ? r.oldTransA : r.transA;
					e = e ? r.oldMin : r.min;
					var q = r.minPixelPadding;
					g = (r.isOrdinal || r.isBroken || r.isLog && g) && r.lin2val;
					m || (m = r.transA);
					c && (d *= -1, G = r.len);
					r.reversed && (d *= -1, G -= d * (r.sector || r.len));
					b ? (a = (a * d + G - q) / m + e, g && (a = r.lin2val(a))) : (g && (a = r.val2lin(a)), a = y(e) ? d * (a - e) * m + G + d * q + (y(l) ? m * l : 0) : void 0);
					return a
				},
				toPixels: function (a, b) {
					return this.translate(a, !1, !this.horiz, null, !0) + (b ? 0 : this.pos)
				},
				toValue: function (a, b) {
					return this.translate(a -
						(b ? 0 : this.pos), !0, !this.horiz, null, !0)
				},
				getPlotLinePath: function (a) {
					var b = this,
						c = b.chart,
						e = b.left,
						g = b.top,
						r = a.old,
						l = a.value,
						d = a.translatedValue,
						q = a.lineWidth,
						v = a.force,
						h, B, k, z, f = r && c.oldChartHeight || c.chartHeight,
						C = r && c.oldChartWidth || c.chartWidth,
						I, J = b.transB,
						n = function (a, b, c) {
							if ("pass" !== v && a < b || a > c) v ? a = D(a, b, c) : I = !0;
							return a
						};
					a = {
						value: l,
						lineWidth: q,
						old: r,
						force: v,
						acrossPanes: a.acrossPanes,
						translatedValue: d
					};
					m(this, "getPlotLinePath", a, function (a) {
						d = E(d, b.translate(l, null, null, r));
						d = D(d, -1E5, 1E5);
						h = k = Math.round(d + J);
						B = z = Math.round(f - d - J);
						y(d) ? b.horiz ? (B = g, z = f - b.bottom, h = k = n(h, e, e + b.width)) : (h = e, k = C - b.right, B = z = n(B, g, g + b.height)) : (I = !0, v = !1);
						a.path = I && !v ? null : c.renderer.crispLine(["M", h, B, "L", k, z], q || 1)
					});
					return a.path
				},
				getLinearTickPositions: function (a, b, c) {
					var e = x(Math.floor(b / a) * a);
					c = x(Math.ceil(c / a) * a);
					var g = [],
						r;
					x(e + a) === e && (r = 20);
					if (this.single) return [b];
					for (b = e; b <= c;) {
						g.push(b);
						b = x(b + a, r);
						if (b === l) break;
						var l = b
					}
					return g
				},
				getMinorTickInterval: function () {
					var a = this.options;
					return !0 ===
						a.minorTicks ? E(a.minorTickInterval, "auto") : !1 === a.minorTicks ? null : a.minorTickInterval
				},
				getMinorTickPositions: function () {
					var a = this,
						b = a.options,
						c = a.tickPositions,
						e = a.minorTickInterval,
						g = [],
						l = a.pointRangePadding || 0,
						d = a.min - l;
					l = a.max + l;
					var m = l - d;
					if (m && m / e < a.len / 3)
						if (a.isLog) this.paddedTicks.forEach(function (b, c, r) {
							c && g.push.apply(g, a.getLogTickPositions(e, r[c - 1], r[c], !0))
						});
						else if (a.isDatetimeAxis && "auto" === this.getMinorTickInterval()) g = g.concat(a.getTimeTicks(a.normalizeTimeTickInterval(e), d, l, b.startOfWeek));
					else
						for (b = d + (c[0] - d) % e; b <= l && b !== g[0]; b += e) g.push(b);
					0 !== g.length && a.trimTicks(g);
					return g
				},
				adjustForMinRange: function () {
					var a = this.options,
						b = this.min,
						c = this.max,
						e, g, l, d, m;
					this.isXAxis && "undefined" === typeof this.minRange && !this.isLog && (p(a.min) || p(a.max) ? this.minRange = null : (this.series.forEach(function (a) {
						d = a.xData;
						for (g = m = a.xIncrement ? 1 : d.length - 1; 0 < g; g--)
							if (l = d[g] - d[g - 1], "undefined" === typeof e || l < e) e = l
					}), this.minRange = Math.min(5 * e, this.dataMax - this.dataMin)));
					if (c - b < this.minRange) {
						var q = this.dataMax -
							this.dataMin >= this.minRange;
						var v = this.minRange;
						var h = (v - c + b) / 2;
						h = [b - h, E(a.min, b - h)];
						q && (h[2] = this.isLog ? this.log2lin(this.dataMin) : this.dataMin);
						b = F(h);
						c = [b + v, E(a.max, b + v)];
						q && (c[2] = this.isLog ? this.log2lin(this.dataMax) : this.dataMax);
						c = A(c);
						c - b < v && (h[0] = c - v, h[1] = E(a.min, c - v), b = F(h))
					}
					this.min = b;
					this.max = c
				},
				getClosest: function () {
					var a;
					this.categories ? a = 1 : this.series.forEach(function (b) {
						var c = b.closestPointRange,
							e = b.visible || !b.chart.options.chart.ignoreHiddenSeries;
						!b.noSharedTooltip && p(c) && e && (a =
							p(a) ? Math.min(a, c) : c)
					});
					return a
				},
				nameToX: function (a) {
					var b = t(this.categories),
						c = b ? this.categories : this.names,
						e = a.options.x;
					a.series.requireSorting = !1;
					p(e) || (e = !1 === this.options.uniqueNames ? a.series.autoIncrement() : b ? c.indexOf(a.name) : E(c.keys[a.name], -1));
					if (-1 === e) {
						if (!b) var g = c.length
					} else g = e;
					"undefined" !== typeof g && (this.names[g] = a.name, this.names.keys[a.name] = g);
					return g
				},
				updateNames: function () {
					var a = this,
						b = this.names;
					0 < b.length && (Object.keys(b.keys).forEach(function (a) {
							delete b.keys[a]
						}), b.length =
						0, this.minRange = this.userMinRange, (this.series || []).forEach(function (b) {
							b.xIncrement = null;
							if (!b.points || b.isDirtyData) a.max = Math.max(a.max, b.xData.length - 1), b.processData(), b.generatePoints();
							b.data.forEach(function (c, e) {
								if (c && c.options && "undefined" !== typeof c.name) {
									var g = a.nameToX(c);
									"undefined" !== typeof g && g !== c.x && (c.x = g, b.xData[e] = g)
								}
							})
						}))
				},
				setAxisTranslation: function (a) {
					var b = this,
						c = b.max - b.min,
						e = b.axisPointRange || 0,
						g = 0,
						l = 0,
						d = b.linkedParent,
						r = !!b.categories,
						q = b.transA,
						v = b.isXAxis;
					if (v || r || e) {
						var h =
							b.getClosest();
						d ? (g = d.minPointOffset, l = d.pointRangePadding) : b.series.forEach(function (a) {
							var c = r ? 1 : v ? E(a.options.pointRange, h, 0) : b.axisPointRange || 0,
								d = a.options.pointPlacement;
							e = Math.max(e, c);
							if (!b.single || r) a = I.xrange && a instanceof I.xrange ? !v : v, g = Math.max(g, a && k(d) ? 0 : c / 2), l = Math.max(l, a && "on" === d ? 0 : c)
						});
						d = b.ordinalSlope && h ? b.ordinalSlope / h : 1;
						b.minPointOffset = g *= d;
						b.pointRangePadding = l *= d;
						b.pointRange = Math.min(e, b.single && r ? 1 : c);
						v && (b.closestPointRange = h)
					}
					a && (b.oldTransA = q);
					b.translationSlope = b.transA =
						q = b.staticScale || b.len / (c + l || 1);
					b.transB = b.horiz ? b.left : b.bottom;
					b.minPixelPadding = q * g;
					m(this, "afterSetAxisTranslation")
				},
				minFromRange: function () {
					return this.max - this.range
				},
				setTickInterval: function (a) {
					var b = this,
						c = b.chart,
						e = b.options,
						g = b.isLog,
						l = b.isDatetimeAxis,
						r = b.isXAxis,
						q = b.isLinked,
						h = e.maxPadding,
						B = e.minPadding,
						k = e.tickInterval,
						f = e.tickPixelInterval,
						C = b.categories,
						I = y(b.threshold) ? b.threshold : null,
						J = b.softThreshold;
					l || C || q || this.getTickAmount();
					var n = E(b.userMin, e.min);
					var t = E(b.userMax, e.max);
					if (q) {
						b.linkedParent = c[b.coll][e.linkedTo];
						var u = b.linkedParent.getExtremes();
						b.min = E(u.min, u.dataMin);
						b.max = E(u.max, u.dataMax);
						e.type !== b.linkedParent.options.type && d.error(11, 1, c)
					} else {
						if (!J && p(I))
							if (b.dataMin >= I) u = I, B = 0;
							else if (b.dataMax <= I) {
							var H = I;
							h = 0
						}
						b.min = E(n, u, b.dataMin);
						b.max = E(t, H, b.dataMax)
					}
					g && (b.positiveValuesOnly && !a && 0 >= Math.min(b.min, E(b.dataMin, b.min)) && d.error(10, 1, c), b.min = x(b.log2lin(b.min), 16), b.max = x(b.log2lin(b.max), 16));
					b.range && p(b.max) && (b.userMin = b.min = n = Math.max(b.dataMin,
						b.minFromRange()), b.userMax = t = b.max, b.range = null);
					m(b, "foundExtremes");
					b.beforePadding && b.beforePadding();
					b.adjustForMinRange();
					!(C || b.axisPointRange || b.usePercentage || q) && p(b.min) && p(b.max) && (c = b.max - b.min) && (!p(n) && B && (b.min -= c * B), !p(t) && h && (b.max += c * h));
					y(b.userMin) || (y(e.softMin) && e.softMin < b.min && (b.min = n = e.softMin), y(e.floor) && (b.min = Math.max(b.min, e.floor)));
					y(b.userMax) || (y(e.softMax) && e.softMax > b.max && (b.max = t = e.softMax), y(e.ceiling) && (b.max = Math.min(b.max, e.ceiling)));
					J && p(b.dataMin) && (I =
						I || 0, !p(n) && b.min < I && b.dataMin >= I ? b.min = b.options.minRange ? Math.min(I, b.max - b.minRange) : I : !p(t) && b.max > I && b.dataMax <= I && (b.max = b.options.minRange ? Math.max(I, b.min + b.minRange) : I));
					b.tickInterval = b.min === b.max || "undefined" === typeof b.min || "undefined" === typeof b.max ? 1 : q && !k && f === b.linkedParent.options.tickPixelInterval ? k = b.linkedParent.tickInterval : E(k, this.tickAmount ? (b.max - b.min) / Math.max(this.tickAmount - 1, 1) : void 0, C ? 1 : (b.max - b.min) * f / Math.max(b.len, f));
					r && !a && b.series.forEach(function (a) {
						a.processData(b.min !==
							b.oldMin || b.max !== b.oldMax)
					});
					b.setAxisTranslation(!0);
					b.beforeSetTickPositions && b.beforeSetTickPositions();
					b.postProcessTickInterval && (b.tickInterval = b.postProcessTickInterval(b.tickInterval));
					b.pointRange && !k && (b.tickInterval = Math.max(b.pointRange, b.tickInterval));
					a = E(e.minTickInterval, b.isDatetimeAxis && b.closestPointRange);
					!k && b.tickInterval < a && (b.tickInterval = a);
					l || g || k || (b.tickInterval = v(b.tickInterval, null, z(b.tickInterval), E(e.allowDecimals, !(.5 < b.tickInterval && 5 > b.tickInterval && 1E3 < b.max &&
						9999 > b.max)), !!this.tickAmount));
					this.tickAmount || (b.tickInterval = b.unsquish());
					this.setTickPositions()
				},
				setTickPositions: function () {
					var a = this.options,
						b = a.tickPositions;
					var c = this.getMinorTickInterval();
					var e = a.tickPositioner,
						g = a.startOnTick,
						l = a.endOnTick;
					this.tickmarkOffset = this.categories && "between" === a.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0;
					this.minorTickInterval = "auto" === c && this.tickInterval ? this.tickInterval / 5 : c;
					this.single = this.min === this.max && p(this.min) && !this.tickAmount && (parseInt(this.min,
						10) === this.min || !1 !== a.allowDecimals);
					this.tickPositions = c = b && b.slice();
					!c && (!this.ordinalPositions && (this.max - this.min) / this.tickInterval > Math.max(2 * this.len, 200) ? (c = [this.min, this.max], d.error(19, !1, this.chart)) : c = this.isDatetimeAxis ? this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval, a.units), this.min, this.max, a.startOfWeek, this.ordinalPositions, this.closestPointRange, !0) : this.isLog ? this.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval,
						this.min, this.max), c.length > this.len && (c = [c[0], c.pop()], c[0] === c[1] && (c.length = 1)), this.tickPositions = c, e && (e = e.apply(this, [this.min, this.max]))) && (this.tickPositions = c = e);
					this.paddedTicks = c.slice(0);
					this.trimTicks(c, g, l);
					this.isLinked || (this.single && 2 > c.length && !this.categories && (this.min -= .5, this.max += .5), b || e || this.adjustTickAmount());
					m(this, "afterSetTickPositions")
				},
				trimTicks: function (a, b, c) {
					var e = a[0],
						g = a[a.length - 1],
						l = this.minPointOffset || 0;
					m(this, "trimTicks");
					if (!this.isLinked) {
						if (b && -Infinity !==
							e) this.min = e;
						else
							for (; this.min - l > a[0];) a.shift();
						if (c) this.max = g;
						else
							for (; this.max + l < a[a.length - 1];) a.pop();
						0 === a.length && p(e) && !this.options.tickPositions && a.push((g + e) / 2)
					}
				},
				alignToOthers: function () {
					var a = {},
						b, c = this.options;
					!1 === this.chart.options.chart.alignTicks || !1 === c.alignTicks || !1 === c.startOnTick || !1 === c.endOnTick || this.isLog || this.chart[this.coll].forEach(function (c) {
						var e = c.options;
						e = [c.horiz ? e.left : e.top, e.width, e.height, e.pane].join();
						c.series.length && (a[e] ? b = !0 : a[e] = 1)
					});
					return b
				},
				getTickAmount: function () {
					var a = this.options,
						b = a.tickAmount,
						c = a.tickPixelInterval;
					!p(a.tickInterval) && this.len < c && !this.isRadial && !this.isLog && a.startOnTick && a.endOnTick && (b = 2);
					!b && this.alignToOthers() && (b = Math.ceil(this.len / c) + 1);
					4 > b && (this.finalTickAmt = b, b = 5);
					this.tickAmount = b
				},
				adjustTickAmount: function () {
					var a = this.options,
						b = this.tickInterval,
						c = this.tickPositions,
						e = this.tickAmount,
						g = this.finalTickAmt,
						l = c && c.length,
						d = E(this.threshold, this.softThreshold ? 0 : null),
						m;
					if (this.hasData()) {
						if (l < e) {
							for (m =
								this.min; c.length < e;) c.length % 2 || m === d ? c.push(x(c[c.length - 1] + b)) : c.unshift(x(c[0] - b));
							this.transA *= (l - 1) / (e - 1);
							this.min = a.startOnTick ? c[0] : Math.min(this.min, c[0]);
							this.max = a.endOnTick ? c[c.length - 1] : Math.max(this.max, c[c.length - 1])
						} else l > e && (this.tickInterval *= 2, this.setTickPositions());
						if (p(g)) {
							for (b = a = c.length; b--;)(3 === g && 1 === b % 2 || 2 >= g && 0 < b && b < a - 1) && c.splice(b, 1);
							this.finalTickAmt = void 0
						}
					}
				},
				setScale: function () {
					var a = this.series.some(function (a) {
							return a.isDirtyData || a.isDirty || a.xAxis && a.xAxis.isDirty
						}),
						b;
					this.oldMin = this.min;
					this.oldMax = this.max;
					this.oldAxisLength = this.len;
					this.setAxisSize();
					(b = this.len !== this.oldAxisLength) || a || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax || this.alignToOthers() ? (this.resetStacks && this.resetStacks(), this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickInterval(), this.oldUserMin = this.userMin, this.oldUserMax = this.userMax, this.isDirty || (this.isDirty = b || this.min !== this.oldMin || this.max !== this.oldMax)) : this.cleanStacks &&
						this.cleanStacks();
					m(this, "afterSetScale")
				},
				setExtremes: function (a, b, c, e, g) {
					var l = this,
						d = l.chart;
					c = E(c, !0);
					l.series.forEach(function (a) {
						delete a.kdTree
					});
					g = u(g, {
						min: a,
						max: b
					});
					m(l, "setExtremes", g, function () {
						l.userMin = a;
						l.userMax = b;
						l.eventArgs = g;
						c && d.redraw(e)
					})
				},
				zoom: function (a, b) {
					var c = this.dataMin,
						e = this.dataMax,
						g = this.options,
						l = Math.min(c, E(g.min, c)),
						d = Math.max(e, E(g.max, e));
					a = {
						newMin: a,
						newMax: b
					};
					m(this, "zoom", a, function (a) {
						var b = a.newMin,
							g = a.newMax;
						if (b !== this.min || g !== this.max) this.allowZoomOutside ||
							(p(c) && (b < l && (b = l), b > d && (b = d)), p(e) && (g < l && (g = l), g > d && (g = d))), this.displayBtn = "undefined" !== typeof b || "undefined" !== typeof g, this.setExtremes(b, g, !1, void 0, {
								trigger: "zoom"
							});
						a.zoomed = !0
					});
					return a.zoomed
				},
				setAxisSize: function () {
					var a = this.chart,
						b = this.options,
						c = b.offsets || [0, 0, 0, 0],
						e = this.horiz,
						g = this.width = Math.round(h(E(b.width, a.plotWidth - c[3] + c[1]), a.plotWidth)),
						l = this.height = Math.round(h(E(b.height, a.plotHeight - c[0] + c[2]), a.plotHeight)),
						d = this.top = Math.round(h(E(b.top, a.plotTop + c[0]), a.plotHeight,
							a.plotTop));
					b = this.left = Math.round(h(E(b.left, a.plotLeft + c[3]), a.plotWidth, a.plotLeft));
					this.bottom = a.chartHeight - l - d;
					this.right = a.chartWidth - g - b;
					this.len = Math.max(e ? g : l, 0);
					this.pos = e ? b : d
				},
				getExtremes: function () {
					var a = this.isLog;
					return {
						min: a ? x(this.lin2log(this.min)) : this.min,
						max: a ? x(this.lin2log(this.max)) : this.max,
						dataMin: this.dataMin,
						dataMax: this.dataMax,
						userMin: this.userMin,
						userMax: this.userMax
					}
				},
				getThreshold: function (a) {
					var b = this.isLog,
						c = b ? this.lin2log(this.min) : this.min;
					b = b ? this.lin2log(this.max) :
						this.max;
					null === a || -Infinity === a ? a = c : Infinity === a ? a = b : c > a ? a = c : b < a && (a = b);
					return this.translate(a, 0, 1, 0, 1)
				},
				autoLabelAlign: function (a) {
					var b = (E(a, 0) - 90 * this.side + 720) % 360;
					a = {
						align: "center"
					};
					m(this, "autoLabelAlign", a, function (a) {
						15 < b && 165 > b ? a.align = "right" : 195 < b && 345 > b && (a.align = "left")
					});
					return a.align
				},
				tickSize: function (a) {
					var b = this.options,
						c = b[a + "Length"],
						e = E(b[a + "Width"], "tick" === a && this.isXAxis && !this.categories ? 1 : 0);
					if (e && c) {
						"inside" === b[a + "Position"] && (c = -c);
						var g = [c, e]
					}
					a = {
						tickSize: g
					};
					m(this,
						"afterTickSize", a);
					return a.tickSize
				},
				labelMetrics: function () {
					var a = this.tickPositions && this.tickPositions[0] || 0;
					return this.chart.renderer.fontMetrics(this.options.labels.style && this.options.labels.style.fontSize, this.ticks[a] && this.ticks[a].label)
				},
				unsquish: function () {
					var a = this.options.labels,
						b = this.horiz,
						c = this.tickInterval,
						e = c,
						g = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / c),
						l, d = a.rotation,
						m = this.labelMetrics(),
						v, h = Number.MAX_VALUE,
						B, k = this.max - this.min,
						z = function (a) {
							var b = a / (g || 1);
							b =
								1 < b ? Math.ceil(b) : 1;
							b * c > k && Infinity !== a && Infinity !== g && k && (b = Math.ceil(k / c));
							return x(b * c)
						};
					b ? (B = !a.staggerLines && !a.step && (p(d) ? [d] : g < E(a.autoRotationLimit, 80) && a.autoRotation)) && B.forEach(function (a) {
						if (a === d || a && -90 <= a && 90 >= a) {
							v = z(Math.abs(m.h / Math.sin(q * a)));
							var b = v + Math.abs(a / 360);
							b < h && (h = b, l = a, e = v)
						}
					}) : a.step || (e = z(m.h));
					this.autoRotation = B;
					this.labelRotation = E(l, d);
					return e
				},
				getSlotWidth: function (a) {
					var b = this.chart,
						c = this.horiz,
						e = this.options.labels,
						g = Math.max(this.tickPositions.length - (this.categories ?
							0 : 1), 1),
						l = b.margin[3];
					return a && a.slotWidth || c && 2 > (e.step || 0) && !e.rotation && (this.staggerLines || 1) * this.len / g || !c && (e.style && parseInt(e.style.width, 10) || l && l - b.spacing[3] || .33 * b.chartWidth)
				},
				renderUnsquish: function () {
					var a = this.chart,
						b = a.renderer,
						c = this.tickPositions,
						e = this.ticks,
						g = this.options.labels,
						l = g && g.style || {},
						d = this.horiz,
						m = this.getSlotWidth(),
						q = Math.max(1, Math.round(m - 2 * (g.padding || 5))),
						v = {},
						h = this.labelMetrics(),
						B = g.style && g.style.textOverflow,
						z = 0;
					k(g.rotation) || (v.rotation = g.rotation ||
						0);
					c.forEach(function (a) {
						a = e[a];
						a.movedLabel && a.replaceMovedLabel();
						a && a.label && a.label.textPxLength > z && (z = a.label.textPxLength)
					});
					this.maxLabelLength = z;
					if (this.autoRotation) z > q && z > h.h ? v.rotation = this.labelRotation : this.labelRotation = 0;
					else if (m) {
						var f = q;
						if (!B) {
							var C = "clip";
							for (q = c.length; !d && q--;) {
								var I = c[q];
								if (I = e[I].label) I.styles && "ellipsis" === I.styles.textOverflow ? I.css({
									textOverflow: "clip"
								}) : I.textPxLength > m && I.css({
									width: m + "px"
								}), I.getBBox().height > this.len / c.length - (h.h - h.f) && (I.specificTextOverflow =
									"ellipsis")
							}
						}
					}
					v.rotation && (f = z > .5 * a.chartHeight ? .33 * a.chartHeight : z, B || (C = "ellipsis"));
					if (this.labelAlign = g.align || this.autoLabelAlign(this.labelRotation)) v.align = this.labelAlign;
					c.forEach(function (a) {
						var b = (a = e[a]) && a.label,
							c = l.width,
							g = {};
						b && (b.attr(v), a.shortenLabel ? a.shortenLabel() : f && !c && "nowrap" !== l.whiteSpace && (f < b.textPxLength || "SPAN" === b.element.tagName) ? (g.width = f, B || (g.textOverflow = b.specificTextOverflow || C), b.css(g)) : b.styles && b.styles.width && !g.width && !c && b.css({
								width: null
							}), delete b.specificTextOverflow,
							a.rotation = v.rotation)
					}, this);
					this.tickRotCorr = b.rotCorr(h.b, this.labelRotation || 0, 0 !== this.side)
				},
				hasData: function () {
					return this.series.some(function (a) {
						return a.hasData()
					}) || this.options.showEmpty && p(this.min) && p(this.max)
				},
				addTitle: function (a) {
					var b = this.chart.renderer,
						c = this.horiz,
						e = this.opposite,
						g = this.options.title,
						d, r = this.chart.styledMode;
					this.axisTitle || ((d = g.textAlign) || (d = (c ? {
							low: "left",
							middle: "center",
							high: "right"
						} : {
							low: e ? "right" : "left",
							middle: "center",
							high: e ? "left" : "right"
						})[g.align]),
						this.axisTitle = b.text(g.text, 0, 0, g.useHTML).attr({
							zIndex: 7,
							rotation: g.rotation || 0,
							align: d
						}).addClass("highcharts-axis-title"), r || this.axisTitle.css(l(g.style)), this.axisTitle.add(this.axisGroup), this.axisTitle.isNew = !0);
					r || g.style.width || this.isRadial || this.axisTitle.css({
						width: this.len
					});
					this.axisTitle[a ? "show" : "hide"](a)
				},
				generateTick: function (a) {
					var b = this.ticks;
					b[a] ? b[a].addLabel() : b[a] = new J(this, a)
				},
				getOffset: function () {
					var a = this,
						b = a.chart,
						c = b.renderer,
						e = a.options,
						g = a.tickPositions,
						l = a.ticks,
						d = a.horiz,
						v = a.side,
						q = b.inverted && !a.isZAxis ? [1, 0, 3, 2][v] : v,
						h, B = 0,
						k = 0,
						z = e.title,
						f = e.labels,
						C = 0,
						I = b.axisOffset;
					b = b.clipOffset;
					var J = [-1, 1, 1, -1][v],
						t = e.className,
						y = a.axisParent;
					var x = a.hasData();
					a.showAxis = h = x || E(e.showEmpty, !0);
					a.staggerLines = a.horiz && f.staggerLines;
					a.axisGroup || (a.gridGroup = c.g("grid").attr({
						zIndex: e.gridZIndex || 1
					}).addClass("highcharts-" + this.coll.toLowerCase() + "-grid " + (t || "")).add(y), a.axisGroup = c.g("axis").attr({
						zIndex: e.zIndex || 2
					}).addClass("highcharts-" + this.coll.toLowerCase() +
						" " + (t || "")).add(y), a.labelGroup = c.g("axis-labels").attr({
						zIndex: f.zIndex || 7
					}).addClass("highcharts-" + a.coll.toLowerCase() + "-labels " + (t || "")).add(y));
					x || a.isLinked ? (g.forEach(function (b, c) {
						a.generateTick(b, c)
					}), a.renderUnsquish(), a.reserveSpaceDefault = 0 === v || 2 === v || {
						1: "left",
						3: "right"
					} [v] === a.labelAlign, E(f.reserveSpace, "center" === a.labelAlign ? !0 : null, a.reserveSpaceDefault) && g.forEach(function (a) {
						C = Math.max(l[a].getLabelSize(), C)
					}), a.staggerLines && (C *= a.staggerLines), a.labelOffset = C * (a.opposite ?
						-1 : 1)) : n(l, function (a, b) {
						a.destroy();
						delete l[b]
					});
					if (z && z.text && !1 !== z.enabled && (a.addTitle(h), h && !1 !== z.reserveSpace)) {
						a.titleOffset = B = a.axisTitle.getBBox()[d ? "height" : "width"];
						var u = z.offset;
						k = p(u) ? 0 : E(z.margin, d ? 5 : 10)
					}
					a.renderLine();
					a.offset = J * E(e.offset, I[v] ? I[v] + (e.margin || 0) : 0);
					a.tickRotCorr = a.tickRotCorr || {
						x: 0,
						y: 0
					};
					c = 0 === v ? -a.labelMetrics().h : 2 === v ? a.tickRotCorr.y : 0;
					k = Math.abs(C) + k;
					C && (k = k - c + J * (d ? E(f.y, a.tickRotCorr.y + 8 * J) : f.x));
					a.axisTitleMargin = E(u, k);
					a.getMaxLabelDimensions && (a.maxLabelDimensions =
						a.getMaxLabelDimensions(l, g));
					d = this.tickSize("tick");
					I[v] = Math.max(I[v], a.axisTitleMargin + B + J * a.offset, k, g && g.length && d ? d[0] + J * a.offset : 0);
					e = e.offset ? 0 : 2 * Math.floor(a.axisLine.strokeWidth() / 2);
					b[q] = Math.max(b[q], e);
					m(this, "afterGetOffset")
				},
				getLinePath: function (a) {
					var b = this.chart,
						c = this.opposite,
						e = this.offset,
						g = this.horiz,
						l = this.left + (c ? this.width : 0) + e;
					e = b.chartHeight - this.bottom - (c ? this.height : 0) + e;
					c && (a *= -1);
					return b.renderer.crispLine(["M", g ? this.left : l, g ? e : this.top, "L", g ? b.chartWidth - this.right :
						l, g ? e : b.chartHeight - this.bottom
					], a)
				},
				renderLine: function () {
					this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup), this.chart.styledMode || this.axisLine.attr({
						stroke: this.options.lineColor,
						"stroke-width": this.options.lineWidth,
						zIndex: 7
					}))
				},
				getTitlePosition: function () {
					var a = this.horiz,
						b = this.left,
						c = this.top,
						e = this.len,
						g = this.options.title,
						l = a ? b : c,
						d = this.opposite,
						v = this.offset,
						q = g.x || 0,
						h = g.y || 0,
						B = this.axisTitle,
						k = this.chart.renderer.fontMetrics(g.style &&
							g.style.fontSize, B);
					B = Math.max(B.getBBox(null, 0).height - k.h - 1, 0);
					e = {
						low: l + (a ? 0 : e),
						middle: l + e / 2,
						high: l + (a ? e : 0)
					} [g.align];
					b = (a ? c + this.height : b) + (a ? 1 : -1) * (d ? -1 : 1) * this.axisTitleMargin + [-B, B, k.f, -B][this.side];
					a = {
						x: a ? e + q : b + (d ? this.width : 0) + v + q,
						y: a ? b + h - (d ? this.height : 0) + v : e + h
					};
					m(this, "afterGetTitlePosition", {
						titlePosition: a
					});
					return a
				},
				renderMinorTick: function (a) {
					var b = this.chart.hasRendered && y(this.oldMin),
						c = this.minorTicks;
					c[a] || (c[a] = new J(this, a, "minor"));
					b && c[a].isNew && c[a].render(null, !0);
					c[a].render(null,
						!1, 1)
				},
				renderTick: function (a, b) {
					var c = this.isLinked,
						e = this.ticks,
						g = this.chart.hasRendered && y(this.oldMin);
					if (!c || a >= this.min && a <= this.max) e[a] || (e[a] = new J(this, a)), g && e[a].isNew && e[a].render(b, !0, -1), e[a].render(b)
				},
				render: function () {
					var a = this,
						b = a.chart,
						e = a.options,
						g = a.isLog,
						l = a.isLinked,
						v = a.tickPositions,
						q = a.axisTitle,
						h = a.ticks,
						B = a.minorTicks,
						k = a.alternateBands,
						z = e.stackLabels,
						f = e.alternateGridColor,
						C = a.tickmarkOffset,
						I = a.axisLine,
						t = a.showAxis,
						p = L(b.renderer.globalAnimation),
						E, x;
					a.labelEdge.length =
						0;
					a.overlap = !1;
					[h, B, k].forEach(function (a) {
						n(a, function (a) {
							a.isActive = !1
						})
					});
					if (a.hasData() || l) a.minorTickInterval && !a.categories && a.getMinorTickPositions().forEach(function (b) {
						a.renderMinorTick(b)
					}), v.length && (v.forEach(function (b, c) {
						a.renderTick(b, c)
					}), C && (0 === a.min || a.single) && (h[-1] || (h[-1] = new J(a, -1, null, !0)), h[-1].render(-1))), f && v.forEach(function (c, e) {
						x = "undefined" !== typeof v[e + 1] ? v[e + 1] + C : a.max - C;
						0 === e % 2 && c < a.max && x <= a.max + (b.polar ? -C : C) && (k[c] || (k[c] = new d.PlotLineOrBand(a)), E = c + C, k[c].options = {
							from: g ? a.lin2log(E) : E,
							to: g ? a.lin2log(x) : x,
							color: f
						}, k[c].render(), k[c].isActive = !0)
					}), a._addedPlotLB || ((e.plotLines || []).concat(e.plotBands || []).forEach(function (b) {
						a.addPlotBandOrLine(b)
					}), a._addedPlotLB = !0);
					[h, B, k].forEach(function (a) {
						var e, g = [],
							l = p.duration;
						n(a, function (a, b) {
							a.isActive || (a.render(b, !1, 0), a.isActive = !1, g.push(b))
						});
						c(function () {
							for (e = g.length; e--;) a[g[e]] && !a[g[e]].isActive && (a[g[e]].destroy(), delete a[g[e]])
						}, a !== k && b.hasRendered && l ? l : 0)
					});
					I && (I[I.isPlaced ? "animate" : "attr"]({
							d: this.getLinePath(I.strokeWidth())
						}),
						I.isPlaced = !0, I[t ? "show" : "hide"](t));
					q && t && (e = a.getTitlePosition(), y(e.y) ? (q[q.isNew ? "attr" : "animate"](e), q.isNew = !1) : (q.attr("y", -9999), q.isNew = !0));
					z && z.enabled && a.renderStackTotals();
					a.isDirty = !1;
					m(this, "afterRender")
				},
				redraw: function () {
					this.visible && (this.render(), this.plotLinesAndBands.forEach(function (a) {
						a.render()
					}));
					this.series.forEach(function (a) {
						a.isDirty = !0
					})
				},
				keepProps: "extKey hcEvents names series userMax userMin".split(" "),
				destroy: function (a) {
					var b = this,
						c = b.stacks,
						e = b.plotLinesAndBands,
						g;
					m(this, "destroy", {
						keepEvents: a
					});
					a || B(b);
					n(c, function (a, b) {
						H(a);
						c[b] = null
					});
					[b.ticks, b.minorTicks, b.alternateBands].forEach(function (a) {
						H(a)
					});
					if (e)
						for (a = e.length; a--;) e[a].destroy();
					"stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross scrollbar".split(" ").forEach(function (a) {
						b[a] && (b[a] = b[a].destroy())
					});
					for (g in b.plotLinesAndBandsGroups) b.plotLinesAndBandsGroups[g] = b.plotLinesAndBandsGroups[g].destroy();
					n(b, function (a, c) {
						-1 === b.keepProps.indexOf(c) && delete b[c]
					})
				},
				drawCrosshair: function (a,
					c) {
					var e = this.crosshair,
						g = E(e.snap, !0),
						l, d = this.cross;
					m(this, "drawCrosshair", {
						e: a,
						point: c
					});
					a || (a = this.cross && this.cross.e);
					if (this.crosshair && !1 !== (p(c) || !g)) {
						g ? p(c) && (l = E("colorAxis" !== this.coll ? c.crosshairPos : null, this.isXAxis ? c.plotX : this.len - c.plotY)) : l = a && (this.horiz ? a.chartX - this.pos : this.len - a.chartY + this.pos);
						if (p(l)) {
							var v = {
								value: c && (this.isXAxis ? c.x : E(c.stackY, c.y)),
								translatedValue: l
							};
							this.chart.polar && u(v, {
								isCrosshair: !0,
								chartX: a && a.chartX,
								chartY: a && a.chartY,
								point: c
							});
							v = this.getPlotLinePath(v) ||
								null
						}
						if (!p(v)) {
							this.hideCrosshair();
							return
						}
						g = this.categories && !this.isRadial;
						d || (this.cross = d = this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" + (g ? "category " : "thin ") + e.className).attr({
							zIndex: E(e.zIndex, 2)
						}).add(), this.chart.styledMode || (d.attr({
							stroke: e.color || (g ? b("#ccd6eb").setOpacity(.25).get() : "#cccccc"),
							"stroke-width": E(e.width, 1)
						}).css({
							"pointer-events": "none"
						}), e.dashStyle && d.attr({
							dashstyle: e.dashStyle
						})));
						d.show().attr({
							d: v
						});
						g && !e.width && d.attr({
							"stroke-width": this.transA
						});
						this.cross.e = a
					} else this.hideCrosshair();
					m(this, "afterDrawCrosshair", {
						e: a,
						point: c
					})
				},
				hideCrosshair: function () {
					this.cross && this.cross.hide();
					m(this, "afterHideCrosshair")
				}
			});
			return d.Axis = f
		});
	M(w, "parts/DateTimeAxis.js", [w["parts/Globals.js"]], function (d) {
		var f = d.Axis,
			L = d.getMagnitude,
			F = d.normalizeTickInterval,
			A = d.timeUnits;
		f.prototype.getTimeTicks = function () {
			return this.chart.time.getTimeTicks.apply(this.chart.time, arguments)
		};
		f.prototype.normalizeTimeTickInterval = function (d, f) {
			var p = f || [
				["millisecond",
					[1, 2, 5, 10, 20, 25, 50, 100, 200, 500]
				],
				["second", [1, 2, 5, 10, 15, 30]],
				["minute", [1, 2, 5, 10, 15, 30]],
				["hour", [1, 2, 3, 4, 6, 8, 12]],
				["day", [1, 2]],
				["week", [1, 2]],
				["month", [1, 2, 3, 4, 6]],
				["year", null]
			];
			f = p[p.length - 1];
			var x = A[f[0]],
				u = f[1],
				t;
			for (t = 0; t < p.length && !(f = p[t], x = A[f[0]], u = f[1], p[t + 1] && d <= (x * u[u.length - 1] + A[p[t + 1][0]]) / 2); t++);
			x === A.year && d < 5 * x && (u = [1, 2, 5]);
			d = F(d / x, u, "year" === f[0] ? Math.max(L(d / x), 1) : 1);
			return {
				unitRange: x,
				count: d,
				unitName: f[0]
			}
		}
	});
	M(w, "parts/LogarithmicAxis.js", [w["parts/Globals.js"], w["parts/Utilities.js"]],
		function (d, f) {
			var L = f.pick;
			f = d.Axis;
			var F = d.getMagnitude,
				A = d.normalizeTickInterval;
			f.prototype.getLogTickPositions = function (d, f, p, H) {
				var x = this.options,
					t = this.len,
					y = [];
				H || (this._minorAutoInterval = null);
				if (.5 <= d) d = Math.round(d), y = this.getLinearTickPositions(d, f, p);
				else if (.08 <= d) {
					t = Math.floor(f);
					var k, n;
					for (x = .3 < d ? [1, 2, 4] : .15 < d ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; t < p + 1 && !n; t++) {
						var E = x.length;
						for (k = 0; k < E && !n; k++) {
							var h = this.log2lin(this.lin2log(t) * x[k]);
							h > f && (!H || e <= p) && "undefined" !== typeof e && y.push(e);
							e > p && (n = !0);
							var e = h
						}
					}
				} else f = this.lin2log(f), p = this.lin2log(p), d = H ? this.getMinorTickInterval() : x.tickInterval, d = L("auto" === d ? null : d, this._minorAutoInterval, x.tickPixelInterval / (H ? 5 : 1) * (p - f) / ((H ? t / this.tickPositions.length : t) || 1)), d = A(d, null, F(d)), y = this.getLinearTickPositions(d, f, p).map(this.log2lin), H || (this._minorAutoInterval = d / 5);
				H || (this.tickInterval = d);
				return y
			};
			f.prototype.log2lin = function (d) {
				return Math.log(d) / Math.LN10
			};
			f.prototype.lin2log = function (d) {
				return Math.pow(10, d)
			}
		});
	M(w, "parts/PlotLineOrBand.js",
		[w["parts/Globals.js"], w["parts/Axis.js"], w["parts/Utilities.js"]],
		function (d, f, L) {
			var F = L.arrayMax,
				A = L.arrayMin,
				D = L.defined,
				x = L.destroyObjectProperties,
				p = L.erase,
				H = L.extend,
				u = L.objectEach,
				t = L.pick,
				y = d.merge;
			d.PlotLineOrBand = function (d, f) {
				this.axis = d;
				f && (this.options = f, this.id = f.id)
			};
			d.PlotLineOrBand.prototype = {
				render: function () {
					d.fireEvent(this, "render");
					var k = this,
						f = k.axis,
						p = f.horiz,
						h = k.options,
						e = h.label,
						c = k.label,
						a = h.to,
						b = h.from,
						g = h.value,
						q = D(b) && D(a),
						m = D(g),
						C = k.svgElem,
						z = !C,
						l = [],
						v = h.color,
						B = t(h.zIndex,
							0),
						I = h.events;
					l = {
						"class": "highcharts-plot-" + (q ? "band " : "line ") + (h.className || "")
					};
					var J = {},
						r = f.chart.renderer,
						G = q ? "bands" : "lines";
					f.isLog && (b = f.log2lin(b), a = f.log2lin(a), g = f.log2lin(g));
					f.chart.styledMode || (m ? (l.stroke = v || "#999999", l["stroke-width"] = t(h.width, 1), h.dashStyle && (l.dashstyle = h.dashStyle)) : q && (l.fill = v || "#e6ebf5", h.borderWidth && (l.stroke = h.borderColor, l["stroke-width"] = h.borderWidth)));
					J.zIndex = B;
					G += "-" + B;
					(v = f.plotLinesAndBandsGroups[G]) || (f.plotLinesAndBandsGroups[G] = v = r.g("plot-" + G).attr(J).add());
					z && (k.svgElem = C = r.path().attr(l).add(v));
					if (m) l = f.getPlotLinePath({
						value: g,
						lineWidth: C.strokeWidth(),
						acrossPanes: h.acrossPanes
					});
					else if (q) l = f.getPlotBandPath(b, a, h);
					else return;
					(z || !C.d) && l && l.length ? (C.attr({
						d: l
					}), I && u(I, function (a, b) {
						C.on(b, function (a) {
							I[b].apply(k, [a])
						})
					})) : C && (l ? (C.show(!0), C.animate({
						d: l
					})) : C.d && (C.hide(), c && (k.label = c = c.destroy())));
					e && (D(e.text) || D(e.formatter)) && l && l.length && 0 < f.width && 0 < f.height && !l.isFlat ? (e = y({
						align: p && q && "center",
						x: p ? !q && 4 : 10,
						verticalAlign: !p && q && "middle",
						y: p ? q ? 16 : 10 : q ? 6 : -4,
						rotation: p && !q && 90
					}, e), this.renderLabel(e, l, q, B)) : c && c.hide();
					return k
				},
				renderLabel: function (d, f, t, h) {
					var e = this.label,
						c = this.axis.chart.renderer;
					e || (e = {
						align: d.textAlign || d.align,
						rotation: d.rotation,
						"class": "highcharts-plot-" + (t ? "band" : "line") + "-label " + (d.className || "")
					}, e.zIndex = h, h = this.getLabelText(d), this.label = e = c.text(h, 0, 0, d.useHTML).attr(e).add(), this.axis.chart.styledMode || e.css(d.style));
					c = f.xBounds || [f[1], f[4], t ? f[6] : f[1]];
					f = f.yBounds || [f[2], f[5], t ? f[7] : f[2]];
					t = A(c);
					h = A(f);
					e.align(d, !1, {
						x: t,
						y: h,
						width: F(c) - t,
						height: F(f) - h
					});
					e.show(!0)
				},
				getLabelText: function (d) {
					return D(d.formatter) ? d.formatter.call(this) : d.text
				},
				destroy: function () {
					p(this.axis.plotLinesAndBands, this);
					delete this.axis;
					x(this)
				}
			};
			H(f.prototype, {
				getPlotBandPath: function (d, f) {
					var k = this.getPlotLinePath({
							value: f,
							force: !0,
							acrossPanes: this.options.acrossPanes
						}),
						h = this.getPlotLinePath({
							value: d,
							force: !0,
							acrossPanes: this.options.acrossPanes
						}),
						e = [],
						c = this.horiz,
						a = 1;
					d = d < this.min && f < this.min || d > this.max && f >
						this.max;
					if (h && k) {
						if (d) {
							var b = h.toString() === k.toString();
							a = 0
						}
						for (d = 0; d < h.length; d += 6) c && k[d + 1] === h[d + 1] ? (k[d + 1] += a, k[d + 4] += a) : c || k[d + 2] !== h[d + 2] || (k[d + 2] += a, k[d + 5] += a), e.push("M", h[d + 1], h[d + 2], "L", h[d + 4], h[d + 5], k[d + 4], k[d + 5], k[d + 1], k[d + 2], "z"), e.isFlat = b
					}
					return e
				},
				addPlotBand: function (d) {
					return this.addPlotBandOrLine(d, "plotBands")
				},
				addPlotLine: function (d) {
					return this.addPlotBandOrLine(d, "plotLines")
				},
				addPlotBandOrLine: function (f, t) {
					var k = (new d.PlotLineOrBand(this, f)).render(),
						h = this.userOptions;
					if (k) {
						if (t) {
							var e = h[t] || [];
							e.push(f);
							h[t] = e
						}
						this.plotLinesAndBands.push(k)
					}
					return k
				},
				removePlotBandOrLine: function (d) {
					for (var f = this.plotLinesAndBands, k = this.options, h = this.userOptions, e = f.length; e--;) f[e].id === d && f[e].destroy();
					[k.plotLines || [], h.plotLines || [], k.plotBands || [], h.plotBands || []].forEach(function (c) {
						for (e = c.length; e--;) c[e].id === d && p(c, c[e])
					})
				},
				removePlotBand: function (d) {
					this.removePlotBandOrLine(d)
				},
				removePlotLine: function (d) {
					this.removePlotBandOrLine(d)
				}
			})
		});
	M(w, "parts/Tooltip.js",
		[w["parts/Globals.js"], w["parts/Utilities.js"]],
		function (d, f) {
			var L = f.clamp,
				F = f.defined,
				A = f.discardElement,
				D = f.extend,
				x = f.isNumber,
				p = f.isString,
				H = f.pick,
				u = f.splat,
				t = f.syncTimeout;
			"";
			var y = d.doc,
				k = d.format,
				n = d.merge,
				E = d.timeUnits;
			d.Tooltip = function () {
				this.init.apply(this, arguments)
			};
			d.Tooltip.prototype = {
				init: function (d, e) {
					this.chart = d;
					this.options = e;
					this.crosshairs = [];
					this.now = {
						x: 0,
						y: 0
					};
					this.isHidden = !0;
					this.split = e.split && !d.inverted && !d.polar;
					this.shared = e.shared || this.split;
					this.outside = H(e.outside,
						!(!d.scrollablePixelsX && !d.scrollablePixelsY))
				},
				cleanSplit: function (d) {
					this.chart.series.forEach(function (e) {
						var c = e && e.tt;
						c && (!c.isActive || d ? e.tt = c.destroy() : c.isActive = !1)
					})
				},
				applyFilter: function () {
					var d = this.chart;
					d.renderer.definition({
						tagName: "filter",
						id: "drop-shadow-" + d.index,
						opacity: .5,
						children: [{
							tagName: "feGaussianBlur",
							"in": "SourceAlpha",
							stdDeviation: 1
						}, {
							tagName: "feOffset",
							dx: 1,
							dy: 1
						}, {
							tagName: "feComponentTransfer",
							children: [{
								tagName: "feFuncA",
								type: "linear",
								slope: .3
							}]
						}, {
							tagName: "feMerge",
							children: [{
								tagName: "feMergeNode"
							}, {
								tagName: "feMergeNode",
								"in": "SourceGraphic"
							}]
						}]
					});
					d.renderer.definition({
						tagName: "style",
						textContent: ".highcharts-tooltip-" + d.index + "{filter:url(#drop-shadow-" + d.index + ")}"
					})
				},
				getLabel: function () {
					var h = this,
						e = this.chart.renderer,
						c = this.chart.styledMode,
						a = this.options,
						b = "tooltip" + (F(a.className) ? " " + a.className : ""),
						g;
					if (!this.label) {
						this.outside && (this.container = g = d.doc.createElement("div"), g.className = "highcharts-tooltip-container", d.css(g, {
							position: "absolute",
							top: "1px",
							pointerEvents: a.style && a.style.pointerEvents,
							zIndex: 3
						}), d.doc.body.appendChild(g), this.renderer = e = new d.Renderer(g, 0, 0, {}, void 0, void 0, e.styledMode));
						this.split ? this.label = e.g(b) : (this.label = e.label("", 0, 0, a.shape || "callout", null, null, a.useHTML, null, b).attr({
							padding: a.padding,
							r: a.borderRadius
						}), c || this.label.attr({
							fill: a.backgroundColor,
							"stroke-width": a.borderWidth
						}).css(a.style).shadow(a.shadow));
						c && (this.applyFilter(), this.label.addClass("highcharts-tooltip-" + this.chart.index));
						if (h.outside && !h.split) {
							var q = {
								x: this.label.xSetter,
								y: this.label.ySetter
							};
							this.label.xSetter = function (a, b) {
								q[b].call(this.label, h.distance);
								g.style.left = a + "px"
							};
							this.label.ySetter = function (a, b) {
								q[b].call(this.label, h.distance);
								g.style.top = a + "px"
							}
						}
						this.label.attr({
							zIndex: 8
						}).add()
					}
					return this.label
				},
				update: function (d) {
					this.destroy();
					n(!0, this.chart.options.tooltip.userOptions, d);
					this.init(this.chart, n(!0, this.options, d))
				},
				destroy: function () {
					this.label && (this.label = this.label.destroy());
					this.split && this.tt && (this.cleanSplit(this.chart,
						!0), this.tt = this.tt.destroy());
					this.renderer && (this.renderer = this.renderer.destroy(), A(this.container));
					d.clearTimeout(this.hideTimer);
					d.clearTimeout(this.tooltipTimeout)
				},
				move: function (h, e, c, a) {
					var b = this,
						g = b.now,
						q = !1 !== b.options.animation && !b.isHidden && (1 < Math.abs(h - g.x) || 1 < Math.abs(e - g.y)),
						m = b.followPointer || 1 < b.len;
					D(g, {
						x: q ? (2 * g.x + h) / 3 : h,
						y: q ? (g.y + e) / 2 : e,
						anchorX: m ? void 0 : q ? (2 * g.anchorX + c) / 3 : c,
						anchorY: m ? void 0 : q ? (g.anchorY + a) / 2 : a
					});
					b.getLabel().attr(g);
					q && (d.clearTimeout(this.tooltipTimeout), this.tooltipTimeout =
						setTimeout(function () {
							b && b.move(h, e, c, a)
						}, 32))
				},
				hide: function (h) {
					var e = this;
					d.clearTimeout(this.hideTimer);
					h = H(h, this.options.hideDelay, 500);
					this.isHidden || (this.hideTimer = t(function () {
						e.getLabel()[h ? "fadeOut" : "hide"]();
						e.isHidden = !0
					}, h))
				},
				getAnchor: function (d, e) {
					var c = this.chart,
						a = c.pointer,
						b = c.inverted,
						g = c.plotTop,
						q = c.plotLeft,
						m = 0,
						h = 0,
						f, l;
					d = u(d);
					this.followPointer && e ? ("undefined" === typeof e.chartX && (e = a.normalize(e)), d = [e.chartX - c.plotLeft, e.chartY - g]) : d[0].tooltipPos ? d = d[0].tooltipPos : (d.forEach(function (a) {
						f =
							a.series.yAxis;
						l = a.series.xAxis;
						m += a.plotX + (!b && l ? l.left - q : 0);
						h += (a.plotLow ? (a.plotLow + a.plotHigh) / 2 : a.plotY) + (!b && f ? f.top - g : 0)
					}), m /= d.length, h /= d.length, d = [b ? c.plotWidth - h : m, this.shared && !b && 1 < d.length && e ? e.chartY - g : b ? c.plotHeight - m : h]);
					return d.map(Math.round)
				},
				getPosition: function (d, e, c) {
					var a = this.chart,
						b = this.distance,
						g = {},
						q = a.inverted && c.h || 0,
						m, h = this.outside,
						f = h ? y.documentElement.clientWidth - 2 * b : a.chartWidth,
						l = h ? Math.max(y.body.scrollHeight, y.documentElement.scrollHeight, y.body.offsetHeight,
							y.documentElement.offsetHeight, y.documentElement.clientHeight) : a.chartHeight,
						v = a.pointer.getChartPosition(),
						B = a.containerScaling,
						k = function (a) {
							return B ? a * B.scaleX : a
						},
						J = function (a) {
							return B ? a * B.scaleY : a
						},
						r = function (g) {
							var m = "x" === g;
							return [g, m ? f : l, m ? d : e].concat(h ? [m ? k(d) : J(e), m ? v.left - b + k(c.plotX + a.plotLeft) : v.top - b + J(c.plotY + a.plotTop), 0, m ? f : l] : [m ? d : e, m ? c.plotX + a.plotLeft : c.plotY + a.plotTop, m ? a.plotLeft : a.plotTop, m ? a.plotLeft + a.plotWidth : a.plotTop + a.plotHeight])
						},
						G = r("y"),
						t = r("x"),
						n = !this.followPointer &&
						H(c.ttBelow, !a.inverted === !!c.negative),
						p = function (a, c, e, d, l, m, v) {
							var h = "y" === a ? J(b) : k(b),
								r = (e - d) / 2,
								B = d < l - b,
								f = l + b + d < c,
								z = l - h - e + r;
							l = l + h - r;
							if (n && f) g[a] = l;
							else if (!n && B) g[a] = z;
							else if (B) g[a] = Math.min(v - d, 0 > z - q ? z : z - q);
							else if (f) g[a] = Math.max(m, l + q + e > c ? l : l + q);
							else return !1
						},
						x = function (a, c, e, d, l) {
							var m;
							l < b || l > c - b ? m = !1 : g[a] = l < e / 2 ? 1 : l > c - d / 2 ? c - d - 2 : l - e / 2;
							return m
						},
						u = function (a) {
							var b = G;
							G = t;
							t = b;
							m = a
						},
						E = function () {
							!1 !== p.apply(0, G) ? !1 !== x.apply(0, t) || m || (u(!0), E()) : m ? g.x = g.y = 0 : (u(!0), E())
						};
					(a.inverted || 1 < this.len) &&
					u();
					E();
					return g
				},
				defaultFormatter: function (d) {
					var e = this.points || u(this);
					var c = [d.tooltipFooterHeaderFormatter(e[0])];
					c = c.concat(d.bodyFormatter(e));
					c.push(d.tooltipFooterHeaderFormatter(e[0], !0));
					return c
				},
				refresh: function (h, e) {
					var c = this.chart,
						a = this.options,
						b = h,
						g = {},
						q = [],
						m = a.formatter || this.defaultFormatter;
					g = this.shared;
					var f = c.styledMode;
					if (a.enabled) {
						d.clearTimeout(this.hideTimer);
						this.followPointer = u(b)[0].series.tooltipOptions.followPointer;
						var k = this.getAnchor(b, e);
						e = k[0];
						var l = k[1];
						!g ||
							b.series && b.series.noSharedTooltip ? g = b.getLabelConfig() : (c.pointer.applyInactiveState(b), b.forEach(function (a) {
								a.setState("hover");
								q.push(a.getLabelConfig())
							}), g = {
								x: b[0].category,
								y: b[0].y
							}, g.points = q, b = b[0]);
						this.len = q.length;
						c = m.call(g, this);
						m = b.series;
						this.distance = H(m.tooltipOptions.distance, 16);
						!1 === c ? this.hide() : (this.split ? this.renderSplit(c, u(h)) : (h = this.getLabel(), a.style.width && !f || h.css({
							width: this.chart.spacingBox.width
						}), h.attr({
							text: c && c.join ? c.join("") : c
						}), h.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-" +
							H(b.colorIndex, m.colorIndex)), f || h.attr({
							stroke: a.borderColor || b.color || m.color || "#666666"
						}), this.updatePosition({
							plotX: e,
							plotY: l,
							negative: b.negative,
							ttBelow: b.ttBelow,
							h: k[2] || 0
						})), this.isHidden && this.label && this.label.attr({
							opacity: 1
						}).show(), this.isHidden = !1);
						d.fireEvent(this, "refresh")
					}
				},
				renderSplit: function (h, e) {
					function c(a, b, c, e, g) {
						void 0 === g && (g = !0);
						c ? (b = A ? 0 : X, a = L(a - e / 2, K.left, K.right - e)) : (b -= F, a = g ? a - e - x : a + x, a = L(a, g ? a : K.left, K.right));
						return {
							x: a,
							y: b
						}
					}
					var a = this,
						b = a.chart,
						g = a.chart,
						q = g.chartWidth,
						m = g.chartHeight,
						f = g.plotHeight,
						k = g.plotLeft,
						l = g.plotTop,
						v = g.plotWidth,
						B = g.pointer,
						I = g.renderer,
						J = g.scrollablePixelsX;
					J = void 0 === J ? 0 : J;
					var r = g.scrollablePixelsY,
						G = void 0 === r ? 0 : r;
					r = g.scrollingContainer;
					r = void 0 === r ? {
						scrollLeft: 0,
						scrollTop: 0
					} : r;
					var t = r.scrollLeft,
						n = r.scrollTop,
						y = g.styledMode,
						x = a.distance,
						u = a.options,
						E = a.options.positioner,
						K = {
							left: J ? k : 0,
							right: J ? k + v - J : q,
							top: G ? l : 0,
							bottom: G ? l + f - G : m
						},
						Q = a.getLabel(),
						A = !(!b.xAxis[0] || !b.xAxis[0].opposite),
						F = l,
						w = 0,
						X = f - G;
					p(h) && (h = [!1, h]);
					h = h.slice(0, e.length +
						1).reduce(function (b, g, d) {
						if (!1 !== g && "" !== g) {
							d = e[d - 1] || {
								isHeader: !0,
								plotX: e[0].plotX,
								plotY: f,
								series: {}
							};
							var m = d.isHeader,
								v = m ? a : d.series,
								q = v.tt,
								h = d.isHeader;
							var r = d.series;
							var B = "highcharts-color-" + H(d.colorIndex, r.colorIndex, "none");
							q || (q = {
								padding: u.padding,
								r: u.borderRadius
							}, y || (q.fill = u.backgroundColor, q["stroke-width"] = u.borderWidth), q = I.label(null, null, null, u[h ? "headerShape" : "shape"] || "callout", null, null, u.useHTML).addClass(h ? "highcharts-tooltip-header " : "highcharts-tooltip-box " + B).attr(q).add(Q));
							q.isActive = !0;
							q.attr({
								text: g
							});
							y || q.css(u.style).shadow(u.shadow).attr({
								stroke: u.borderColor || d.color || r.color || "#333333"
							});
							g = v.tt = q;
							h = g.getBBox();
							v = h.width + g.strokeWidth();
							m && (w = h.height, X += w, A && (F -= w));
							r = d.plotX;
							r = void 0 === r ? 0 : r;
							B = d.plotY;
							B = void 0 === B ? 0 : B;
							var z = d.series;
							d.isHeader ? (r = k + r - t, B = l + (f - G) / 2) : (q = z.xAxis, z = z.yAxis, r = q.pos + L(r, -x, q.len + x) - t, B = z.pos + L(B, 0, z.len) - n);
							r = L(r, K.left - x, K.right + x);
							B = L(B, K.top, K.bottom);
							h = h.height + 1;
							q = E ? E.call(a, v, h, d) : c(r, B, m, v);
							b.push({
								align: E ? 0 : void 0,
								anchorX: r,
								anchorY: B,
								boxWidth: v,
								point: d,
								rank: H(q.rank, m ? 1 : 0),
								size: h,
								target: q.y,
								tt: g,
								x: q.x
							})
						}
						return b
					}, []);
					!E && h.some(function (a) {
						return 0 > a.x
					}) && (h = h.map(function (a) {
						var b = c(a.anchorX, a.anchorY, a.point.isHeader, a.boxWidth, !1);
						return D(a, {
							target: b.y,
							x: b.x
						})
					}));
					a.cleanSplit();
					d.distribute(h, X, void 0);
					h.forEach(function (a) {
						var b = a.pos;
						a.tt.attr({
							visibility: "undefined" === typeof b ? "hidden" : "inherit",
							x: a.x,
							y: b + F,
							anchorX: a.anchorX,
							anchorY: a.anchorY
						})
					});
					h = a.container;
					b = a.renderer;
					a.outside && h && b && (g = Q.getBBox(), b.setSize(g.width +
						g.x, g.height + g.y, !1), B = B.getChartPosition(), h.style.left = B.left + "px", h.style.top = B.top + "px")
				},
				updatePosition: function (h) {
					var e = this.chart,
						c = e.pointer,
						a = this.getLabel(),
						b = h.plotX + e.plotLeft,
						g = h.plotY + e.plotTop;
					c = c.getChartPosition();
					h = (this.options.positioner || this.getPosition).call(this, a.width, a.height, h);
					if (this.outside) {
						var q = (this.options.borderWidth || 0) + 2 * this.distance;
						this.renderer.setSize(a.width + q, a.height + q, !1);
						if (e = e.containerScaling) d.css(this.container, {
							transform: "scale(" + e.scaleX + ", " +
								e.scaleY + ")"
						}), b *= e.scaleX, g *= e.scaleY;
						b += c.left - h.x;
						g += c.top - h.y
					}
					this.move(Math.round(h.x), Math.round(h.y || 0), b, g)
				},
				getDateFormat: function (d, e, c, a) {
					var b = this.chart.time,
						g = b.dateFormat("%m-%d %H:%M:%S.%L", e),
						q = {
							millisecond: 15,
							second: 12,
							minute: 9,
							hour: 6,
							day: 3
						},
						m = "millisecond";
					for (h in E) {
						if (d === E.week && +b.dateFormat("%w", e) === c && "00:00:00.000" === g.substr(6)) {
							var h = "week";
							break
						}
						if (E[h] > d) {
							h = m;
							break
						}
						if (q[h] && g.substr(q[h]) !== "01-01 00:00:00.000".substr(q[h])) break;
						"week" !== h && (m = h)
					}
					if (h) var f = b.resolveDTLFormat(a[h]).main;
					return f
				},
				getXDateFormat: function (d, e, c) {
					e = e.dateTimeLabelFormats;
					var a = c && c.closestPointRange;
					return (a ? this.getDateFormat(a, d.x, c.options.startOfWeek, e) : e.day) || e.year
				},
				tooltipFooterHeaderFormatter: function (h, e) {
					var c = e ? "footer" : "header",
						a = h.series,
						b = a.tooltipOptions,
						g = b.xDateFormat,
						q = a.xAxis,
						m = q && "datetime" === q.options.type && x(h.key),
						f = b[c + "Format"];
					e = {
						isFooter: e,
						labelConfig: h
					};
					d.fireEvent(this, "headerFormatter", e, function (c) {
						m && !g && (g = this.getXDateFormat(h, b, q));
						m && g && (h.point && h.point.tooltipDateKeys || ["key"]).forEach(function (a) {
							f = f.replace("{point." + a + "}", "{point." + a + ":" + g + "}")
						});
						a.chart.styledMode && (f = this.styledModeFormat(f));
						c.text = k(f, {
							point: h,
							series: a
						}, this.chart)
					});
					return e.text
				},
				bodyFormatter: function (d) {
					return d.map(function (e) {
						var c = e.series.tooltipOptions;
						return (c[(e.point.formatPrefix || "point") + "Formatter"] || e.point.tooltipFormatter).call(e.point, c[(e.point.formatPrefix || "point") + "Format"] || "")
					})
				},
				styledModeFormat: function (d) {
					return d.replace('style="font-size: 10px"', 'class="highcharts-header"').replace(/style="color:{(point|series)\.color}"/g,
						'class="highcharts-color-{$1.colorIndex}"')
				}
			}
		});
	M(w, "parts/Pointer.js", [w["parts/Globals.js"], w["parts/Utilities.js"]], function (d, f) {
		var L = f.attr,
			F = f.defined,
			A = f.extend,
			D = f.isNumber,
			x = f.isObject,
			p = f.objectEach,
			H = f.offset,
			u = f.pick,
			t = f.splat,
			y = d.addEvent,
			k = d.charts,
			n = d.color,
			E = d.css,
			h = d.find,
			e = d.fireEvent,
			c = d.Tooltip;
		d.Pointer = function (a, b) {
			this.init(a, b)
		};
		d.Pointer.prototype = {
			init: function (a, b) {
				this.options = b;
				this.chart = a;
				this.runChartClick = b.chart.events && !!b.chart.events.click;
				this.pinchDown = [];
				this.lastValidTouch = {};
				c && (a.tooltip = new c(a, b.tooltip), this.followTouchMove = u(b.tooltip.followTouchMove, !0));
				this.setDOMEvents()
			},
			zoomOption: function (a) {
				var b = this.chart,
					c = b.options.chart,
					e = c.zoomType || "";
				b = b.inverted;
				/touch/.test(a.type) && (e = u(c.pinchType, e));
				this.zoomX = a = /x/.test(e);
				this.zoomY = e = /y/.test(e);
				this.zoomHor = a && !b || e && b;
				this.zoomVert = e && !b || a && b;
				this.hasZoom = a || e
			},
			getChartPosition: function () {
				var a = this.chart;
				a = a.scrollingContainer || a.container;
				return this.chartPosition || (this.chartPosition =
					H(a))
			},
			normalize: function (a, b) {
				var c = a.touches ? a.touches.length ? a.touches.item(0) : a.changedTouches[0] : a;
				b || (b = this.getChartPosition());
				var e = c.pageX - b.left;
				b = c.pageY - b.top;
				if (c = this.chart.containerScaling) e /= c.scaleX, b /= c.scaleY;
				return A(a, {
					chartX: Math.round(e),
					chartY: Math.round(b)
				})
			},
			getCoordinates: function (a) {
				var b = {
					xAxis: [],
					yAxis: []
				};
				this.chart.axes.forEach(function (c) {
					b[c.isXAxis ? "xAxis" : "yAxis"].push({
						axis: c,
						value: c.toValue(a[c.horiz ? "chartX" : "chartY"])
					})
				});
				return b
			},
			findNearestKDPoint: function (a,
				b, c) {
				var e;
				a.forEach(function (a) {
					var g = !(a.noSharedTooltip && b) && 0 > a.options.findNearestPointBy.indexOf("y");
					a = a.searchPoint(c, g);
					if ((g = x(a, !0)) && !(g = !x(e, !0))) {
						g = e.distX - a.distX;
						var d = e.dist - a.dist,
							l = (a.series.group && a.series.group.zIndex) - (e.series.group && e.series.group.zIndex);
						g = 0 < (0 !== g && b ? g : 0 !== d ? d : 0 !== l ? l : e.series.index > a.series.index ? -1 : 1)
					}
					g && (e = a)
				});
				return e
			},
			getPointFromEvent: function (a) {
				a = a.target;
				for (var b; a && !b;) b = a.point, a = a.parentNode;
				return b
			},
			getChartCoordinatesFromPoint: function (a,
				b) {
				var c = a.series,
					e = c.xAxis;
				c = c.yAxis;
				var d = u(a.clientX, a.plotX),
					h = a.shapeArgs;
				if (e && c) return b ? {
					chartX: e.len + e.pos - d,
					chartY: c.len + c.pos - a.plotY
				} : {
					chartX: d + e.pos,
					chartY: a.plotY + c.pos
				};
				if (h && h.x && h.y) return {
					chartX: h.x,
					chartY: h.y
				}
			},
			getHoverData: function (a, b, c, e, d, f) {
				var g, l = [];
				e = !(!e || !a);
				var m = b && !b.stickyTracking ? [b] : c.filter(function (a) {
					return a.visible && !(!d && a.directTouch) && u(a.options.enableMouseTracking, !0) && a.stickyTracking
				});
				b = (g = e || !f ? a : this.findNearestKDPoint(m, d, f)) && g.series;
				g && (d && !b.noSharedTooltip ?
					(m = c.filter(function (a) {
						return a.visible && !(!d && a.directTouch) && u(a.options.enableMouseTracking, !0) && !a.noSharedTooltip
					}), m.forEach(function (a) {
						var b = h(a.points, function (a) {
							return a.x === g.x && !a.isNull
						});
						x(b) && (a.chart.isBoosting && (b = a.getPoint(b)), l.push(b))
					})) : l.push(g));
				return {
					hoverPoint: g,
					hoverSeries: b,
					hoverPoints: l
				}
			},
			runPointActions: function (a, b) {
				var c = this.chart,
					e = c.tooltip && c.tooltip.options.enabled ? c.tooltip : void 0,
					m = e ? e.shared : !1,
					h = b || c.hoverPoint,
					f = h && h.series || c.hoverSeries;
				f = this.getHoverData(h,
					f, c.series, (!a || "touchmove" !== a.type) && (!!b || f && f.directTouch && this.isDirectTouch), m, a);
				h = f.hoverPoint;
				var l = f.hoverPoints;
				b = (f = f.hoverSeries) && f.tooltipOptions.followPointer;
				m = m && f && !f.noSharedTooltip;
				if (h && (h !== c.hoverPoint || e && e.isHidden)) {
					(c.hoverPoints || []).forEach(function (a) {
						-1 === l.indexOf(a) && a.setState()
					});
					if (c.hoverSeries !== f) f.onMouseOver();
					this.applyInactiveState(l);
					(l || []).forEach(function (a) {
						a.setState("hover")
					});
					c.hoverPoint && c.hoverPoint.firePointEvent("mouseOut");
					if (!h.series) return;
					h.firePointEvent("mouseOver");
					c.hoverPoints = l;
					c.hoverPoint = h;
					e && e.refresh(m ? l : h, a)
				} else b && e && !e.isHidden && (h = e.getAnchor([{}], a), e.updatePosition({
					plotX: h[0],
					plotY: h[1]
				}));
				this.unDocMouseMove || (this.unDocMouseMove = y(c.container.ownerDocument, "mousemove", function (a) {
					var b = k[d.hoverChartIndex];
					if (b) b.pointer.onDocumentMouseMove(a)
				}));
				c.axes.forEach(function (b) {
					var c = u(b.crosshair.snap, !0),
						e = c ? d.find(l, function (a) {
							return a.series[b.coll] === b
						}) : void 0;
					e || !c ? b.drawCrosshair(a, e) : b.hideCrosshair()
				})
			},
			applyInactiveState: function (a) {
				var b = [],
					c;
				(a || []).forEach(function (a) {
					c = a.series;
					b.push(c);
					c.linkedParent && b.push(c.linkedParent);
					c.linkedSeries && (b = b.concat(c.linkedSeries));
					c.navigatorSeries && b.push(c.navigatorSeries)
				});
				this.chart.series.forEach(function (a) {
					-1 === b.indexOf(a) ? a.setState("inactive", !0) : a.options.inactiveOtherPoints && a.setAllPointsToState("inactive")
				})
			},
			reset: function (a, b) {
				var c = this.chart,
					e = c.hoverSeries,
					d = c.hoverPoint,
					h = c.hoverPoints,
					f = c.tooltip,
					l = f && f.shared ? h : d;
				a && l && t(l).forEach(function (b) {
					b.series.isCartesian &&
						"undefined" === typeof b.plotX && (a = !1)
				});
				if (a) f && l && t(l).length && (f.refresh(l), f.shared && h ? h.forEach(function (a) {
					a.setState(a.state, !0);
					a.series.isCartesian && (a.series.xAxis.crosshair && a.series.xAxis.drawCrosshair(null, a), a.series.yAxis.crosshair && a.series.yAxis.drawCrosshair(null, a))
				}) : d && (d.setState(d.state, !0), c.axes.forEach(function (a) {
					a.crosshair && d.series[a.coll] === a && a.drawCrosshair(null, d)
				})));
				else {
					if (d) d.onMouseOut();
					h && h.forEach(function (a) {
						a.setState()
					});
					if (e) e.onMouseOut();
					f && f.hide(b);
					this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove());
					c.axes.forEach(function (a) {
						a.hideCrosshair()
					});
					this.hoverX = c.hoverPoints = c.hoverPoint = null
				}
			},
			scaleGroups: function (a, b) {
				var c = this.chart,
					e;
				c.series.forEach(function (d) {
					e = a || d.getPlotBox();
					d.xAxis && d.xAxis.zoomEnabled && d.group && (d.group.attr(e), d.markerGroup && (d.markerGroup.attr(e), d.markerGroup.clip(b ? c.clipRect : null)), d.dataLabelsGroup && d.dataLabelsGroup.attr(e))
				});
				c.clipRect.attr(b || c.clipBox)
			},
			dragStart: function (a) {
				var b = this.chart;
				b.mouseIsDown = a.type;
				b.cancelClick = !1;
				b.mouseDownX = this.mouseDownX = a.chartX;
				b.mouseDownY = this.mouseDownY = a.chartY
			},
			drag: function (a) {
				var b = this.chart,
					c = b.options.chart,
					e = a.chartX,
					d = a.chartY,
					h = this.zoomHor,
					f = this.zoomVert,
					l = b.plotLeft,
					v = b.plotTop,
					B = b.plotWidth,
					k = b.plotHeight,
					J = this.selectionMarker,
					r = this.mouseDownX,
					G = this.mouseDownY,
					t = x(c.panning) ? c.panning && c.panning.enabled : c.panning,
					p = c.panKey && a[c.panKey + "Key"];
				if (!J || !J.touch)
					if (e < l ? e = l : e > l + B && (e = l + B), d < v ? d = v : d > v + k && (d = v + k), this.hasDragged = Math.sqrt(Math.pow(r -
							e, 2) + Math.pow(G - d, 2)), 10 < this.hasDragged) {
						var y = b.isInsidePlot(r - l, G - v);
						b.hasCartesianSeries && (this.zoomX || this.zoomY) && y && !p && !J && (this.selectionMarker = J = b.renderer.rect(l, v, h ? 1 : B, f ? 1 : k, 0).attr({
							"class": "highcharts-selection-marker",
							zIndex: 7
						}).add(), b.styledMode || J.attr({
							fill: c.selectionMarkerFill || n("#335cad").setOpacity(.25).get()
						}));
						J && h && (e -= r, J.attr({
							width: Math.abs(e),
							x: (0 < e ? 0 : e) + r
						}));
						J && f && (e = d - G, J.attr({
							height: Math.abs(e),
							y: (0 < e ? 0 : e) + G
						}));
						y && !J && t && b.pan(a, c.panning)
					}
			},
			drop: function (a) {
				var b =
					this,
					c = this.chart,
					d = this.hasPinched;
				if (this.selectionMarker) {
					var m = {
							originalEvent: a,
							xAxis: [],
							yAxis: []
						},
						h = this.selectionMarker,
						f = h.attr ? h.attr("x") : h.x,
						l = h.attr ? h.attr("y") : h.y,
						v = h.attr ? h.attr("width") : h.width,
						B = h.attr ? h.attr("height") : h.height,
						k;
					if (this.hasDragged || d) c.axes.forEach(function (c) {
						if (c.zoomEnabled && F(c.min) && (d || b[{
								xAxis: "zoomX",
								yAxis: "zoomY"
							} [c.coll]])) {
							var e = c.horiz,
								g = "touchend" === a.type ? c.minPixelPadding : 0,
								h = c.toValue((e ? f : l) + g);
							e = c.toValue((e ? f + v : l + B) - g);
							m[c.coll].push({
								axis: c,
								min: Math.min(h,
									e),
								max: Math.max(h, e)
							});
							k = !0
						}
					}), k && e(c, "selection", m, function (a) {
						c.zoom(A(a, d ? {
							animation: !1
						} : null))
					});
					D(c.index) && (this.selectionMarker = this.selectionMarker.destroy());
					d && this.scaleGroups()
				}
				c && D(c.index) && (E(c.container, {
					cursor: c._cursor
				}), c.cancelClick = 10 < this.hasDragged, c.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = [])
			},
			onContainerMouseDown: function (a) {
				a = this.normalize(a);
				2 !== a.button && (this.zoomOption(a), a.preventDefault && a.preventDefault(), this.dragStart(a))
			},
			onDocumentMouseUp: function (a) {
				k[d.hoverChartIndex] &&
					k[d.hoverChartIndex].pointer.drop(a)
			},
			onDocumentMouseMove: function (a) {
				var b = this.chart,
					c = this.chartPosition;
				a = this.normalize(a, c);
				!c || this.inClass(a.target, "highcharts-tracker") || b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) || this.reset()
			},
			onContainerMouseLeave: function (a) {
				var b = k[d.hoverChartIndex];
				b && (a.relatedTarget || a.toElement) && (b.pointer.reset(), b.pointer.chartPosition = void 0)
			},
			onContainerMouseMove: function (a) {
				var b = this.chart;
				F(d.hoverChartIndex) && k[d.hoverChartIndex] && k[d.hoverChartIndex].mouseIsDown ||
					(d.hoverChartIndex = b.index);
				a = this.normalize(a);
				a.preventDefault || (a.returnValue = !1);
				"mousedown" === b.mouseIsDown && this.drag(a);
				!this.inClass(a.target, "highcharts-tracker") && !b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) || b.openMenu || this.runPointActions(a)
			},
			inClass: function (a, b) {
				for (var c; a;) {
					if (c = L(a, "class")) {
						if (-1 !== c.indexOf(b)) return !0;
						if (-1 !== c.indexOf("highcharts-container")) return !1
					}
					a = a.parentNode
				}
			},
			onTrackerMouseOut: function (a) {
				var b = this.chart.hoverSeries;
				a = a.relatedTarget || a.toElement;
				this.isDirectTouch = !1;
				if (!(!b || !a || b.stickyTracking || this.inClass(a, "highcharts-tooltip") || this.inClass(a, "highcharts-series-" + b.index) && this.inClass(a, "highcharts-tracker"))) b.onMouseOut()
			},
			onContainerClick: function (a) {
				var b = this.chart,
					c = b.hoverPoint,
					d = b.plotLeft,
					m = b.plotTop;
				a = this.normalize(a);
				b.cancelClick || (c && this.inClass(a.target, "highcharts-tracker") ? (e(c.series, "click", A(a, {
					point: c
				})), b.hoverPoint && c.firePointEvent("click", a)) : (A(a, this.getCoordinates(a)), b.isInsidePlot(a.chartX - d, a.chartY -
					m) && e(b, "click", a)))
			},
			setDOMEvents: function () {
				var a = this,
					b = a.chart.container,
					c = b.ownerDocument;
				b.onmousedown = function (b) {
					a.onContainerMouseDown(b)
				};
				b.onmousemove = function (b) {
					a.onContainerMouseMove(b)
				};
				b.onclick = function (b) {
					a.onContainerClick(b)
				};
				this.unbindContainerMouseLeave = y(b, "mouseleave", a.onContainerMouseLeave);
				d.unbindDocumentMouseUp || (d.unbindDocumentMouseUp = y(c, "mouseup", a.onDocumentMouseUp));
				d.hasTouch && (y(b, "touchstart", function (b) {
						a.onContainerTouchStart(b)
					}), y(b, "touchmove", function (b) {
						a.onContainerTouchMove(b)
					}),
					d.unbindDocumentTouchEnd || (d.unbindDocumentTouchEnd = y(c, "touchend", a.onDocumentTouchEnd)))
			},
			destroy: function () {
				var a = this;
				a.unDocMouseMove && a.unDocMouseMove();
				this.unbindContainerMouseLeave();
				d.chartCount || (d.unbindDocumentMouseUp && (d.unbindDocumentMouseUp = d.unbindDocumentMouseUp()), d.unbindDocumentTouchEnd && (d.unbindDocumentTouchEnd = d.unbindDocumentTouchEnd()));
				clearInterval(a.tooltipTimeout);
				p(a, function (b, c) {
					a[c] = null
				})
			}
		}
	});
	M(w, "parts/TouchPointer.js", [w["parts/Globals.js"], w["parts/Utilities.js"]],
		function (d, f) {
			var L = f.extend,
				F = f.pick,
				A = d.charts,
				D = d.noop;
			L(d.Pointer.prototype, {
				pinchTranslate: function (d, f, A, u, t, y) {
					this.zoomHor && this.pinchTranslateDirection(!0, d, f, A, u, t, y);
					this.zoomVert && this.pinchTranslateDirection(!1, d, f, A, u, t, y)
				},
				pinchTranslateDirection: function (d, f, A, u, t, y, k, n) {
					var p = this.chart,
						h = d ? "x" : "y",
						e = d ? "X" : "Y",
						c = "chart" + e,
						a = d ? "width" : "height",
						b = p["plot" + (d ? "Left" : "Top")],
						g, q, m = n || 1,
						C = p.inverted,
						z = p.bounds[d ? "h" : "v"],
						l = 1 === f.length,
						v = f[0][c],
						B = A[0][c],
						I = !l && f[1][c],
						J = !l && A[1][c];
					A =
						function () {
							!l && 20 < Math.abs(v - I) && (m = n || Math.abs(B - J) / Math.abs(v - I));
							q = (b - B) / m + v;
							g = p["plot" + (d ? "Width" : "Height")] / m
						};
					A();
					f = q;
					if (f < z.min) {
						f = z.min;
						var r = !0
					} else f + g > z.max && (f = z.max - g, r = !0);
					r ? (B -= .8 * (B - k[h][0]), l || (J -= .8 * (J - k[h][1])), A()) : k[h] = [B, J];
					C || (y[h] = q - b, y[a] = g);
					y = C ? 1 / m : m;
					t[a] = g;
					t[h] = f;
					u[C ? d ? "scaleY" : "scaleX" : "scale" + e] = m;
					u["translate" + e] = y * b + (B - y * v)
				},
				pinch: function (d) {
					var f = this,
						x = f.chart,
						u = f.pinchDown,
						t = d.touches,
						y = t.length,
						k = f.lastValidTouch,
						n = f.hasZoom,
						E = f.selectionMarker,
						h = {},
						e = 1 === y && (f.inClass(d.target,
							"highcharts-tracker") && x.runTrackerClick || f.runChartClick),
						c = {};
					1 < y && (f.initiated = !0);
					n && f.initiated && !e && d.preventDefault();
					[].map.call(t, function (a) {
						return f.normalize(a)
					});
					"touchstart" === d.type ? ([].forEach.call(t, function (a, b) {
						u[b] = {
							chartX: a.chartX,
							chartY: a.chartY
						}
					}), k.x = [u[0].chartX, u[1] && u[1].chartX], k.y = [u[0].chartY, u[1] && u[1].chartY], x.axes.forEach(function (a) {
						if (a.zoomEnabled) {
							var b = x.bounds[a.horiz ? "h" : "v"],
								c = a.minPixelPadding,
								e = a.toPixels(Math.min(F(a.options.min, a.dataMin), a.dataMin)),
								d = a.toPixels(Math.max(F(a.options.max, a.dataMax), a.dataMax)),
								h = Math.max(e, d);
							b.min = Math.min(a.pos, Math.min(e, d) - c);
							b.max = Math.max(a.pos + a.len, h + c)
						}
					}), f.res = !0) : f.followTouchMove && 1 === y ? this.runPointActions(f.normalize(d)) : u.length && (E || (f.selectionMarker = E = L({
						destroy: D,
						touch: !0
					}, x.plotBox)), f.pinchTranslate(u, t, h, E, c, k), f.hasPinched = n, f.scaleGroups(h, c), f.res && (f.res = !1, this.reset(!1, 0)))
				},
				touch: function (f, p) {
					var x = this.chart,
						u;
					if (x.index !== d.hoverChartIndex) this.onContainerMouseLeave({
						relatedTarget: !0
					});
					d.hoverChartIndex = x.index;
					if (1 === f.touches.length)
						if (f = this.normalize(f), (u = x.isInsidePlot(f.chartX - x.plotLeft, f.chartY - x.plotTop)) && !x.openMenu) {
							p && this.runPointActions(f);
							if ("touchmove" === f.type) {
								p = this.pinchDown;
								var t = p[0] ? 4 <= Math.sqrt(Math.pow(p[0].chartX - f.chartX, 2) + Math.pow(p[0].chartY - f.chartY, 2)) : !1
							}
							F(t, !0) && this.pinch(f)
						} else p && this.reset();
					else 2 === f.touches.length && this.pinch(f)
				},
				onContainerTouchStart: function (d) {
					this.zoomOption(d);
					this.touch(d, !0)
				},
				onContainerTouchMove: function (d) {
					this.touch(d)
				},
				onDocumentTouchEnd: function (f) {
					A[d.hoverChartIndex] && A[d.hoverChartIndex].pointer.drop(f)
				}
			})
		});
	M(w, "parts/MSPointer.js", [w["parts/Globals.js"], w["parts/Utilities.js"]], function (d, f) {
		var L = f.extend,
			F = f.objectEach;
		f = f.wrap;
		var A = d.addEvent,
			D = d.charts,
			x = d.css,
			p = d.doc,
			H = d.noop,
			u = d.Pointer,
			t = d.removeEvent,
			y = d.win;
		if (!d.hasTouch && (y.PointerEvent || y.MSPointerEvent)) {
			var k = {},
				n = !!y.PointerEvent,
				E = function () {
					var e = [];
					e.item = function (c) {
						return this[c]
					};
					F(k, function (c) {
						e.push({
							pageX: c.pageX,
							pageY: c.pageY,
							target: c.target
						})
					});
					return e
				},
				h = function (e, c, a, b) {
					"touch" !== e.pointerType && e.pointerType !== e.MSPOINTER_TYPE_TOUCH || !D[d.hoverChartIndex] || (b(e), b = D[d.hoverChartIndex].pointer, b[c]({
						type: a,
						target: e.currentTarget,
						preventDefault: H,
						touches: E()
					}))
				};
			L(u.prototype, {
				onContainerPointerDown: function (e) {
					h(e, "onContainerTouchStart", "touchstart", function (c) {
						k[c.pointerId] = {
							pageX: c.pageX,
							pageY: c.pageY,
							target: c.currentTarget
						}
					})
				},
				onContainerPointerMove: function (e) {
					h(e, "onContainerTouchMove", "touchmove", function (c) {
						k[c.pointerId] = {
							pageX: c.pageX,
							pageY: c.pageY
						};
						k[c.pointerId].target || (k[c.pointerId].target = c.currentTarget)
					})
				},
				onDocumentPointerUp: function (e) {
					h(e, "onDocumentTouchEnd", "touchend", function (c) {
						delete k[c.pointerId]
					})
				},
				batchMSEvents: function (e) {
					e(this.chart.container, n ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown);
					e(this.chart.container, n ? "pointermove" : "MSPointerMove", this.onContainerPointerMove);
					e(p, n ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp)
				}
			});
			f(u.prototype, "init", function (e, c, a) {
				e.call(this, c, a);
				this.hasZoom &&
					x(c.container, {
						"-ms-touch-action": "none",
						"touch-action": "none"
					})
			});
			f(u.prototype, "setDOMEvents", function (e) {
				e.apply(this);
				(this.hasZoom || this.followTouchMove) && this.batchMSEvents(A)
			});
			f(u.prototype, "destroy", function (e) {
				this.batchMSEvents(t);
				e.call(this)
			})
		}
	});
	M(w, "parts/Legend.js", [w["parts/Globals.js"], w["parts/Utilities.js"]], function (d, f) {
		var L = f.defined,
			F = f.discardElement,
			A = f.isNumber,
			D = f.pick,
			x = f.relativeLength,
			p = f.setAnimation,
			H = f.syncTimeout;
		f = f.wrap;
		var u = d.addEvent,
			t = d.css,
			y = d.fireEvent,
			k = d.isFirefox,
			n = d.marginNames,
			E = d.merge,
			h = d.stableSort,
			e = d.win;
		d.Legend = function (c, a) {
			this.init(c, a)
		};
		d.Legend.prototype = {
			init: function (c, a) {
				this.chart = c;
				this.setOptions(a);
				a.enabled && (this.render(), u(this.chart, "endResize", function () {
					this.legend.positionCheckboxes()
				}), this.proximate ? this.unchartrender = u(this.chart, "render", function () {
					this.legend.proximatePositions();
					this.legend.positionItems()
				}) : this.unchartrender && this.unchartrender())
			},
			setOptions: function (c) {
				var a = D(c.padding, 8);
				this.options = c;
				this.chart.styledMode || (this.itemStyle = c.itemStyle, this.itemHiddenStyle = E(this.itemStyle, c.itemHiddenStyle));
				this.itemMarginTop = c.itemMarginTop || 0;
				this.itemMarginBottom = c.itemMarginBottom || 0;
				this.padding = a;
				this.initialItemY = a - 5;
				this.symbolWidth = D(c.symbolWidth, 16);
				this.pages = [];
				this.proximate = "proximate" === c.layout && !this.chart.inverted
			},
			update: function (c, a) {
				var b = this.chart;
				this.setOptions(E(!0, this.options, c));
				this.destroy();
				b.isDirtyLegend = b.isDirtyBox = !0;
				D(a, !0) && b.redraw();
				y(this, "afterUpdate")
			},
			colorizeItem: function (c, a) {
				c.legendGroup[a ? "removeClass" : "addClass"]("highcharts-legend-item-hidden");
				if (!this.chart.styledMode) {
					var b = this.options,
						e = c.legendItem,
						d = c.legendLine,
						h = c.legendSymbol,
						f = this.itemHiddenStyle.color;
					b = a ? b.itemStyle.color : f;
					var k = a ? c.color || f : f,
						l = c.options && c.options.marker,
						v = {
							fill: k
						};
					e && e.css({
						fill: b,
						color: b
					});
					d && d.attr({
						stroke: k
					});
					h && (l && h.isMarker && (v = c.pointAttribs(), a || (v.stroke = v.fill = f)), h.attr(v))
				}
				y(this, "afterColorizeItem", {
					item: c,
					visible: a
				})
			},
			positionItems: function () {
				this.allItems.forEach(this.positionItem,
					this);
				this.chart.isResizing || this.positionCheckboxes()
			},
			positionItem: function (c) {
				var a = this.options,
					b = a.symbolPadding;
				a = !a.rtl;
				var e = c._legendItemPos,
					d = e[0];
				e = e[1];
				var h = c.checkbox;
				if ((c = c.legendGroup) && c.element) c[L(c.translateY) ? "animate" : "attr"]({
					translateX: a ? d : this.legendWidth - d - 2 * b - 4,
					translateY: e
				});
				h && (h.x = d, h.y = e)
			},
			destroyItem: function (c) {
				var a = c.checkbox;
				["legendItem", "legendLine", "legendSymbol", "legendGroup"].forEach(function (a) {
					c[a] && (c[a] = c[a].destroy())
				});
				a && F(c.checkbox)
			},
			destroy: function () {
				function c(a) {
					this[a] &&
						(this[a] = this[a].destroy())
				}
				this.getAllItems().forEach(function (a) {
					["legendItem", "legendGroup"].forEach(c, a)
				});
				"clipRect up down pager nav box title group".split(" ").forEach(c, this);
				this.display = null
			},
			positionCheckboxes: function () {
				var c = this.group && this.group.alignAttr,
					a = this.clipHeight || this.legendHeight,
					b = this.titleHeight;
				if (c) {
					var e = c.translateY;
					this.allItems.forEach(function (d) {
						var g = d.checkbox;
						if (g) {
							var h = e + b + g.y + (this.scrollOffset || 0) + 3;
							t(g, {
								left: c.translateX + d.checkboxOffset + g.x - 20 + "px",
								top: h +
									"px",
								display: this.proximate || h > e - 6 && h < e + a - 6 ? "" : "none"
							})
						}
					}, this)
				}
			},
			renderTitle: function () {
				var c = this.options,
					a = this.padding,
					b = c.title,
					e = 0;
				b.text && (this.title || (this.title = this.chart.renderer.label(b.text, a - 3, a - 4, null, null, null, c.useHTML, null, "legend-title").attr({
					zIndex: 1
				}), this.chart.styledMode || this.title.css(b.style), this.title.add(this.group)), b.width || this.title.css({
					width: this.maxLegendWidth + "px"
				}), c = this.title.getBBox(), e = c.height, this.offsetWidth = c.width, this.contentGroup.attr({
					translateY: e
				}));
				this.titleHeight = e
			},
			setText: function (c) {
				var a = this.options;
				c.legendItem.attr({
					text: a.labelFormat ? d.format(a.labelFormat, c, this.chart) : a.labelFormatter.call(c)
				})
			},
			renderItem: function (c) {
				var a = this.chart,
					b = a.renderer,
					e = this.options,
					d = this.symbolWidth,
					h = e.symbolPadding,
					f = this.itemStyle,
					k = this.itemHiddenStyle,
					l = "horizontal" === e.layout ? D(e.itemDistance, 20) : 0,
					v = !e.rtl,
					B = c.legendItem,
					I = !c.series,
					J = !I && c.series.drawLegendSymbol ? c.series : c,
					r = J.options;
				r = this.createCheckboxForItem && r && r.showCheckbox;
				l = d + h +
					l + (r ? 20 : 0);
				var G = e.useHTML,
					t = c.options.className;
				B || (c.legendGroup = b.g("legend-item").addClass("highcharts-" + J.type + "-series highcharts-color-" + c.colorIndex + (t ? " " + t : "") + (I ? " highcharts-series-" + c.index : "")).attr({
					zIndex: 1
				}).add(this.scrollGroup), c.legendItem = B = b.text("", v ? d + h : -h, this.baseline || 0, G), a.styledMode || B.css(E(c.visible ? f : k)), B.attr({
					align: v ? "left" : "right",
					zIndex: 2
				}).add(c.legendGroup), this.baseline || (this.fontMetrics = b.fontMetrics(a.styledMode ? 12 : f.fontSize, B), this.baseline = this.fontMetrics.f +
					3 + this.itemMarginTop, B.attr("y", this.baseline)), this.symbolHeight = e.symbolHeight || this.fontMetrics.f, J.drawLegendSymbol(this, c), this.setItemEvents && this.setItemEvents(c, B, G));
				r && !c.checkbox && this.createCheckboxForItem(c);
				this.colorizeItem(c, c.visible);
				!a.styledMode && f.width || B.css({
					width: (e.itemWidth || this.widthOption || a.spacingBox.width) - l
				});
				this.setText(c);
				a = B.getBBox();
				c.itemWidth = c.checkboxOffset = e.itemWidth || c.legendItemWidth || a.width + l;
				this.maxItemWidth = Math.max(this.maxItemWidth, c.itemWidth);
				this.totalItemWidth += c.itemWidth;
				this.itemHeight = c.itemHeight = Math.round(c.legendItemHeight || a.height || this.symbolHeight)
			},
			layoutItem: function (c) {
				var a = this.options,
					b = this.padding,
					e = "horizontal" === a.layout,
					d = c.itemHeight,
					h = this.itemMarginBottom,
					f = this.itemMarginTop,
					k = e ? D(a.itemDistance, 20) : 0,
					l = this.maxLegendWidth;
				a = a.alignColumns && this.totalItemWidth > l ? this.maxItemWidth : c.itemWidth;
				e && this.itemX - b + a > l && (this.itemX = b, this.lastLineHeight && (this.itemY += f + this.lastLineHeight + h), this.lastLineHeight = 0);
				this.lastItemY = f + this.itemY + h;
				this.lastLineHeight = Math.max(d, this.lastLineHeight);
				c._legendItemPos = [this.itemX, this.itemY];
				e ? this.itemX += a : (this.itemY += f + d + h, this.lastLineHeight = d);
				this.offsetWidth = this.widthOption || Math.max((e ? this.itemX - b - (c.checkbox ? 0 : k) : a) + b, this.offsetWidth)
			},
			getAllItems: function () {
				var c = [];
				this.chart.series.forEach(function (a) {
					var b = a && a.options;
					a && D(b.showInLegend, L(b.linkedTo) ? !1 : void 0, !0) && (c = c.concat(a.legendItems || ("point" === b.legendType ? a.data : a)))
				});
				y(this, "afterGetAllItems", {
					allItems: c
				});
				return c
			},
			getAlignment: function () {
				var c = this.options;
				return this.proximate ? c.align.charAt(0) + "tv" : c.floating ? "" : c.align.charAt(0) + c.verticalAlign.charAt(0) + c.layout.charAt(0)
			},
			adjustMargins: function (c, a) {
				var b = this.chart,
					e = this.options,
					d = this.getAlignment();
				d && [/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/].forEach(function (g, h) {
					g.test(d) && !L(c[h]) && (b[n[h]] = Math.max(b[n[h]], b.legend[(h + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][h] * e[h % 2 ? "x" : "y"] + D(e.margin, 12) + a[h] +
						(b.titleOffset[h] || 0)))
				})
			},
			proximatePositions: function () {
				var c = this.chart,
					a = [],
					b = "left" === this.options.align;
				this.allItems.forEach(function (e) {
					var g = b;
					if (e.yAxis && e.points) {
						e.xAxis.options.reversed && (g = !g);
						var h = d.find(g ? e.points : e.points.slice(0).reverse(), function (a) {
							return A(a.plotY)
						});
						g = this.itemMarginTop + e.legendItem.getBBox().height + this.itemMarginBottom;
						var f = e.yAxis.top - c.plotTop;
						e.visible ? (h = h ? h.plotY : e.yAxis.height, h += f - .3 * g) : h = f + e.yAxis.height;
						a.push({
							target: h,
							size: g,
							item: e
						})
					}
				}, this);
				d.distribute(a,
					c.plotHeight);
				a.forEach(function (a) {
					a.item._legendItemPos[1] = c.plotTop - c.spacing[0] + a.pos
				})
			},
			render: function () {
				var c = this.chart,
					a = c.renderer,
					b = this.group,
					e, d = this.box,
					f = this.options,
					k = this.padding;
				this.itemX = k;
				this.itemY = this.initialItemY;
				this.lastItemY = this.offsetWidth = 0;
				this.widthOption = x(f.width, c.spacingBox.width - k);
				var z = c.spacingBox.width - 2 * k - f.x; - 1 < ["rm", "lm"].indexOf(this.getAlignment().substring(0, 2)) && (z /= 2);
				this.maxLegendWidth = this.widthOption || z;
				b || (this.group = b = a.g("legend").attr({
						zIndex: 7
					}).add(),
					this.contentGroup = a.g().attr({
						zIndex: 1
					}).add(b), this.scrollGroup = a.g().add(this.contentGroup));
				this.renderTitle();
				z = this.getAllItems();
				h(z, function (a, b) {
					return (a.options && a.options.legendIndex || 0) - (b.options && b.options.legendIndex || 0)
				});
				f.reversed && z.reverse();
				this.allItems = z;
				this.display = e = !!z.length;
				this.itemHeight = this.totalItemWidth = this.maxItemWidth = this.lastLineHeight = 0;
				z.forEach(this.renderItem, this);
				z.forEach(this.layoutItem, this);
				z = (this.widthOption || this.offsetWidth) + k;
				var l = this.lastItemY +
					this.lastLineHeight + this.titleHeight;
				l = this.handleOverflow(l);
				l += k;
				d || (this.box = d = a.rect().addClass("highcharts-legend-box").attr({
					r: f.borderRadius
				}).add(b), d.isNew = !0);
				c.styledMode || d.attr({
					stroke: f.borderColor,
					"stroke-width": f.borderWidth || 0,
					fill: f.backgroundColor || "none"
				}).shadow(f.shadow);
				0 < z && 0 < l && (d[d.isNew ? "attr" : "animate"](d.crisp.call({}, {
					x: 0,
					y: 0,
					width: z,
					height: l
				}, d.strokeWidth())), d.isNew = !1);
				d[e ? "show" : "hide"]();
				c.styledMode && "none" === b.getStyle("display") && (z = l = 0);
				this.legendWidth = z;
				this.legendHeight =
					l;
				e && (a = c.spacingBox, d = a.y, /(lth|ct|rth)/.test(this.getAlignment()) && 0 < c.titleOffset[0] ? d += c.titleOffset[0] : /(lbh|cb|rbh)/.test(this.getAlignment()) && 0 < c.titleOffset[2] && (d -= c.titleOffset[2]), d !== a.y && (a = E(a, {
					y: d
				})), b.align(E(f, {
					width: z,
					height: l,
					verticalAlign: this.proximate ? "top" : f.verticalAlign
				}), !0, a));
				this.proximate || this.positionItems();
				y(this, "afterRender")
			},
			handleOverflow: function (c) {
				var a = this,
					b = this.chart,
					e = b.renderer,
					d = this.options,
					h = d.y,
					f = this.padding;
				h = b.spacingBox.height + ("top" === d.verticalAlign ?
					-h : h) - f;
				var k = d.maxHeight,
					l, v = this.clipRect,
					B = d.navigation,
					I = D(B.animation, !0),
					J = B.arrowSize || 12,
					r = this.nav,
					G = this.pages,
					t, n = this.allItems,
					y = function (b) {
						"number" === typeof b ? v.attr({
							height: b
						}) : v && (a.clipRect = v.destroy(), a.contentGroup.clip());
						a.contentGroup.div && (a.contentGroup.div.style.clip = b ? "rect(" + f + "px,9999px," + (f + b) + "px,0)" : "auto")
					},
					p = function (c) {
						a[c] = e.circle(0, 0, 1.3 * J).translate(J / 2, J / 2).add(r);
						b.styledMode || a[c].attr("fill", "rgba(0,0,0,0.0001)");
						return a[c]
					};
				"horizontal" !== d.layout || "middle" ===
					d.verticalAlign || d.floating || (h /= 2);
				k && (h = Math.min(h, k));
				G.length = 0;
				c > h && !1 !== B.enabled ? (this.clipHeight = l = Math.max(h - 20 - this.titleHeight - f, 0), this.currentPage = D(this.currentPage, 1), this.fullHeight = c, n.forEach(function (a, b) {
					var c = a._legendItemPos[1],
						e = Math.round(a.legendItem.getBBox().height),
						d = G.length;
					if (!d || c - G[d - 1] > l && (t || c) !== G[d - 1]) G.push(t || c), d++;
					a.pageIx = d - 1;
					t && (n[b - 1].pageIx = d - 1);
					b === n.length - 1 && c + e - G[d - 1] > l && c !== t && (G.push(c), a.pageIx = d);
					c !== t && (t = c)
				}), v || (v = a.clipRect = e.clipRect(0, f, 9999,
					0), a.contentGroup.clip(v)), y(l), r || (this.nav = r = e.g().attr({
					zIndex: 1
				}).add(this.group), this.up = e.symbol("triangle", 0, 0, J, J).add(r), p("upTracker").on("click", function () {
					a.scroll(-1, I)
				}), this.pager = e.text("", 15, 10).addClass("highcharts-legend-navigation"), b.styledMode || this.pager.css(B.style), this.pager.add(r), this.down = e.symbol("triangle-down", 0, 0, J, J).add(r), p("downTracker").on("click", function () {
					a.scroll(1, I)
				})), a.scroll(0), c = h) : r && (y(), this.nav = r.destroy(), this.scrollGroup.attr({
						translateY: 1
					}), this.clipHeight =
					0);
				return c
			},
			scroll: function (c, a) {
				var b = this,
					e = this.chart,
					h = this.pages,
					f = h.length,
					k = this.currentPage + c;
				c = this.clipHeight;
				var z = this.options.navigation,
					l = this.pager,
					v = this.padding;
				k > f && (k = f);
				0 < k && ("undefined" !== typeof a && p(a, e), this.nav.attr({
						translateX: v,
						translateY: c + this.padding + 7 + this.titleHeight,
						visibility: "visible"
					}), [this.up, this.upTracker].forEach(function (a) {
						a.attr({
							"class": 1 === k ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
						})
					}), l.attr({
						text: k + "/" + f
					}), [this.down, this.downTracker].forEach(function (a) {
						a.attr({
							x: 18 +
								this.pager.getBBox().width,
							"class": k === f ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
						})
					}, this), e.styledMode || (this.up.attr({
						fill: 1 === k ? z.inactiveColor : z.activeColor
					}), this.upTracker.css({
						cursor: 1 === k ? "default" : "pointer"
					}), this.down.attr({
						fill: k === f ? z.inactiveColor : z.activeColor
					}), this.downTracker.css({
						cursor: k === f ? "default" : "pointer"
					})), this.scrollOffset = -h[k - 1] + this.initialItemY, this.scrollGroup.animate({
						translateY: this.scrollOffset
					}), this.currentPage = k, this.positionCheckboxes(),
					a = d.animObject(D(a, e.renderer.globalAnimation, !0)), H(function () {
						y(b, "afterScroll", {
							currentPage: k
						})
					}, a.duration || 0))
			}
		};
		d.LegendSymbolMixin = {
			drawRectangle: function (c, a) {
				var b = c.symbolHeight,
					e = c.options.squareSymbol;
				a.legendSymbol = this.chart.renderer.rect(e ? (c.symbolWidth - b) / 2 : 0, c.baseline - b + 1, e ? b : c.symbolWidth, b, D(c.options.symbolRadius, b / 2)).addClass("highcharts-point").attr({
					zIndex: 3
				}).add(a.legendGroup)
			},
			drawLineMarker: function (c) {
				var a = this.options,
					b = a.marker,
					e = c.symbolWidth,
					d = c.symbolHeight,
					h =
					d / 2,
					f = this.chart.renderer,
					k = this.legendGroup;
				c = c.baseline - Math.round(.3 * c.fontMetrics.b);
				var l = {};
				this.chart.styledMode || (l = {
					"stroke-width": a.lineWidth || 0
				}, a.dashStyle && (l.dashstyle = a.dashStyle));
				this.legendLine = f.path(["M", 0, c, "L", e, c]).addClass("highcharts-graph").attr(l).add(k);
				b && !1 !== b.enabled && e && (a = Math.min(D(b.radius, h), h), 0 === this.symbol.indexOf("url") && (b = E(b, {
					width: d,
					height: d
				}), a = 0), this.legendSymbol = b = f.symbol(this.symbol, e / 2 - a, c - a, 2 * a, 2 * a, b).addClass("highcharts-point").add(k), b.isMarker = !0)
			}
		};
		(/Trident\/7\.0/.test(e.navigator && e.navigator.userAgent) || k) && f(d.Legend.prototype, "positionItem", function (c, a) {
			var b = this,
				e = function () {
					a._legendItemPos && c.call(b, a)
				};
			e();
			b.bubbleLegend || setTimeout(e)
		})
	});
	M(w, "parts/Chart.js", [w["parts/Globals.js"], w["parts/Utilities.js"]], function (d, f) {
		var L = f.animObject,
			F = f.attr,
			A = f.defined,
			D = f.discardElement,
			x = f.erase,
			p = f.extend,
			H = f.isArray,
			u = f.isNumber,
			t = f.isObject,
			y = f.isString,
			k = f.numberFormat,
			n = f.objectEach,
			E = f.pick,
			h = f.pInt,
			e = f.relativeLength,
			c = f.setAnimation,
			a = f.splat,
			b = f.syncTimeout,
			g = d.addEvent,
			q = d.animate,
			m = d.doc,
			C = d.Axis,
			z = d.createElement,
			l = d.defaultOptions,
			v = d.charts,
			B = d.css,
			I = d.find,
			J = d.fireEvent,
			r = d.Legend,
			G = d.marginNames,
			N = d.merge,
			U = d.Pointer,
			S = d.removeEvent,
			w = d.seriesTypes,
			O = d.win,
			P = d.Chart = function () {
				this.getArgs.apply(this, arguments)
			};
		d.chart = function (a, b, c) {
			return new P(a, b, c)
		};
		p(P.prototype, {
			callbacks: [],
			getArgs: function () {
				var a = [].slice.call(arguments);
				if (y(a[0]) || a[0].nodeName) this.renderTo = a.shift();
				this.init(a[0], a[1])
			},
			init: function (a,
				b) {
				var c, e = a.series,
					h = a.plotOptions || {};
				J(this, "init", {
					args: arguments
				}, function () {
					a.series = null;
					c = N(l, a);
					n(c.plotOptions, function (a, b) {
						t(a) && (a.tooltip = h[b] && N(h[b].tooltip) || void 0)
					});
					c.tooltip.userOptions = a.chart && a.chart.forExport && a.tooltip.userOptions || a.tooltip;
					c.series = a.series = e;
					this.userOptions = a;
					var f = c.chart,
						m = f.events;
					this.margin = [];
					this.spacing = [];
					this.bounds = {
						h: {},
						v: {}
					};
					this.labelCollectors = [];
					this.callback = b;
					this.isResizing = 0;
					this.options = c;
					this.axes = [];
					this.series = [];
					this.time = a.time &&
						Object.keys(a.time).length ? new d.Time(a.time) : d.time;
					this.numberFormatter = f.numberFormatter || k;
					this.styledMode = f.styledMode;
					this.hasCartesianSeries = f.showAxes;
					var r = this;
					r.index = v.length;
					v.push(r);
					d.chartCount++;
					m && n(m, function (a, b) {
						d.isFunction(a) && g(r, b, a)
					});
					r.xAxis = [];
					r.yAxis = [];
					r.pointCount = r.colorCounter = r.symbolCounter = 0;
					J(r, "afterInit");
					r.firstRender()
				})
			},
			initSeries: function (a) {
				var b = this.options.chart;
				b = a.type || b.type || b.defaultSeriesType;
				var c = w[b];
				c || d.error(17, !0, this, {
					missingModuleFor: b
				});
				b = new c;
				b.init(this, a);
				return b
			},
			setSeriesData: function () {
				this.getSeriesOrderByLinks().forEach(function (a) {
					a.points || a.data || !a.enabledDataSorting || a.setData(a.options.data, !1)
				})
			},
			getSeriesOrderByLinks: function () {
				return this.series.concat().sort(function (a, b) {
					return a.linkedSeries.length || b.linkedSeries.length ? b.linkedSeries.length - a.linkedSeries.length : 0
				})
			},
			orderSeries: function (a) {
				var b = this.series;
				for (a = a || 0; a < b.length; a++) b[a] && (b[a].index = a, b[a].name = b[a].getName())
			},
			isInsidePlot: function (a, b,
				c) {
				var e = c ? b : a;
				a = c ? a : b;
				return 0 <= e && e <= this.plotWidth && 0 <= a && a <= this.plotHeight
			},
			redraw: function (a) {
				J(this, "beforeRedraw");
				var b = this.axes,
					e = this.series,
					d = this.pointer,
					g = this.legend,
					l = this.userOptions.legend,
					h = this.isDirtyLegend,
					f = this.hasCartesianSeries,
					v = this.isDirtyBox,
					m = this.renderer,
					r = m.isHidden(),
					B = [];
				this.setResponsive && this.setResponsive(!1);
				c(a, this);
				r && this.temporaryDisplay();
				this.layOutTitles();
				for (a = e.length; a--;) {
					var k = e[a];
					if (k.options.stacking) {
						var q = !0;
						if (k.isDirty) {
							var z = !0;
							break
						}
					}
				}
				if (z)
					for (a =
						e.length; a--;) k = e[a], k.options.stacking && (k.isDirty = !0);
				e.forEach(function (a) {
					a.isDirty && ("point" === a.options.legendType ? (a.updateTotals && a.updateTotals(), h = !0) : l && (l.labelFormatter || l.labelFormat) && (h = !0));
					a.isDirtyData && J(a, "updatedData")
				});
				h && g && g.options.enabled && (g.render(), this.isDirtyLegend = !1);
				q && this.getStacks();
				f && b.forEach(function (a) {
					a.updateNames();
					a.setScale()
				});
				this.getMargins();
				f && (b.forEach(function (a) {
					a.isDirty && (v = !0)
				}), b.forEach(function (a) {
					var b = a.min + "," + a.max;
					a.extKey !== b &&
						(a.extKey = b, B.push(function () {
							J(a, "afterSetExtremes", p(a.eventArgs, a.getExtremes()));
							delete a.eventArgs
						}));
					(v || q) && a.redraw()
				}));
				v && this.drawChartBox();
				J(this, "predraw");
				e.forEach(function (a) {
					(v || a.isDirty) && a.visible && a.redraw();
					a.isDirtyData = !1
				});
				d && d.reset(!0);
				m.draw();
				J(this, "redraw");
				J(this, "render");
				r && this.temporaryDisplay(!0);
				B.forEach(function (a) {
					a.call()
				})
			},
			get: function (a) {
				function b(b) {
					return b.id === a || b.options && b.options.id === a
				}
				var c = this.series,
					e;
				var d = I(this.axes, b) || I(this.series,
					b);
				for (e = 0; !d && e < c.length; e++) d = I(c[e].points || [], b);
				return d
			},
			getAxes: function () {
				var b = this,
					c = this.options,
					e = c.xAxis = a(c.xAxis || {});
				c = c.yAxis = a(c.yAxis || {});
				J(this, "getAxes");
				e.forEach(function (a, b) {
					a.index = b;
					a.isX = !0
				});
				c.forEach(function (a, b) {
					a.index = b
				});
				e.concat(c).forEach(function (a) {
					new C(b, a)
				});
				J(this, "afterGetAxes")
			},
			getSelectedPoints: function () {
				var a = [];
				this.series.forEach(function (b) {
					a = a.concat((b[b.hasGroupedData ? "points" : "data"] || []).filter(function (a) {
						return E(a.selectedStaging, a.selected)
					}))
				});
				return a
			},
			getSelectedSeries: function () {
				return this.series.filter(function (a) {
					return a.selected
				})
			},
			setTitle: function (a, b, c) {
				this.applyDescription("title", a);
				this.applyDescription("subtitle", b);
				this.applyDescription("caption", void 0);
				this.layOutTitles(c)
			},
			applyDescription: function (a, b) {
				var c = this,
					e = "title" === a ? {
						color: "#333333",
						fontSize: this.options.isStock ? "16px" : "18px"
					} : {
						color: "#666666"
					};
				e = this.options[a] = N(!this.styledMode && {
					style: e
				}, this.options[a], b);
				var d = this[a];
				d && b && (this[a] = d = d.destroy());
				e && !d && (d = this.renderer.text(e.text, 0, 0, e.useHTML).attr({
					align: e.align,
					"class": "highcharts-" + a,
					zIndex: e.zIndex || 4
				}).add(), d.update = function (b) {
					c[{
						title: "setTitle",
						subtitle: "setSubtitle",
						caption: "setCaption"
					} [a]](b)
				}, this.styledMode || d.css(e.style), this[a] = d)
			},
			layOutTitles: function (a) {
				var b = [0, 0, 0],
					c = this.renderer,
					e = this.spacingBox;
				["title", "subtitle", "caption"].forEach(function (a) {
					var d = this[a],
						g = this.options[a],
						l = g.verticalAlign || "top";
					a = "title" === a ? -3 : "top" === l ? b[0] + 2 : 0;
					if (d) {
						if (!this.styledMode) var h =
							g.style.fontSize;
						h = c.fontMetrics(h, d).b;
						d.css({
							width: (g.width || e.width + (g.widthAdjust || 0)) + "px"
						});
						var f = Math.round(d.getBBox(g.useHTML).height);
						d.align(p({
							y: "bottom" === l ? h : a + h,
							height: f
						}, g), !1, "spacingBox");
						g.floating || ("top" === l ? b[0] = Math.ceil(b[0] + f) : "bottom" === l && (b[2] = Math.ceil(b[2] + f)))
					}
				}, this);
				b[0] && "top" === (this.options.title.verticalAlign || "top") && (b[0] += this.options.title.margin);
				b[2] && "bottom" === this.options.caption.verticalAlign && (b[2] += this.options.caption.margin);
				var d = !this.titleOffset ||
					this.titleOffset.join(",") !== b.join(",");
				this.titleOffset = b;
				J(this, "afterLayOutTitles");
				!this.isDirtyBox && d && (this.isDirtyBox = this.isDirtyLegend = d, this.hasRendered && E(a, !0) && this.isDirtyBox && this.redraw())
			},
			getChartSize: function () {
				var a = this.options.chart,
					b = a.width;
				a = a.height;
				var c = this.renderTo;
				A(b) || (this.containerWidth = d.getStyle(c, "width"));
				A(a) || (this.containerHeight = d.getStyle(c, "height"));
				this.chartWidth = Math.max(0, b || this.containerWidth || 600);
				this.chartHeight = Math.max(0, e(a, this.chartWidth) ||
					(1 < this.containerHeight ? this.containerHeight : 400))
			},
			temporaryDisplay: function (a) {
				var b = this.renderTo;
				if (a)
					for (; b && b.style;) b.hcOrigStyle && (d.css(b, b.hcOrigStyle), delete b.hcOrigStyle), b.hcOrigDetached && (m.body.removeChild(b), b.hcOrigDetached = !1), b = b.parentNode;
				else
					for (; b && b.style;) {
						m.body.contains(b) || b.parentNode || (b.hcOrigDetached = !0, m.body.appendChild(b));
						if ("none" === d.getStyle(b, "display", !1) || b.hcOricDetached) b.hcOrigStyle = {
								display: b.style.display,
								height: b.style.height,
								overflow: b.style.overflow
							},
							a = {
								display: "block",
								overflow: "hidden"
							}, b !== this.renderTo && (a.height = 0), d.css(b, a), b.offsetWidth || b.style.setProperty("display", "block", "important");
						b = b.parentNode;
						if (b === m.body) break
					}
			},
			setClassName: function (a) {
				this.container.className = "highcharts-container " + (a || "")
			},
			getContainer: function () {
				var a = this.options,
					b = a.chart;
				var c = this.renderTo;
				var e = d.uniqueKey(),
					g, l;
				c || (this.renderTo = c = b.renderTo);
				y(c) && (this.renderTo = c = m.getElementById(c));
				c || d.error(13, !0, this);
				var f = h(F(c, "data-highcharts-chart"));
				u(f) && v[f] && v[f].hasRendered && v[f].destroy();
				F(c, "data-highcharts-chart", this.index);
				c.innerHTML = "";
				b.skipClone || c.offsetWidth || this.temporaryDisplay();
				this.getChartSize();
				f = this.chartWidth;
				var r = this.chartHeight;
				B(c, {
					overflow: "hidden"
				});
				this.styledMode || (g = p({
					position: "relative",
					overflow: "hidden",
					width: f + "px",
					height: r + "px",
					textAlign: "left",
					lineHeight: "normal",
					zIndex: 0,
					"-webkit-tap-highlight-color": "rgba(0,0,0,0)"
				}, b.style));
				this.container = c = z("div", {
					id: e
				}, g, c);
				this._cursor = c.style.cursor;
				this.renderer =
					new(d[b.renderer] || d.Renderer)(c, f, r, null, b.forExport, a.exporting && a.exporting.allowHTML, this.styledMode);
				this.setClassName(b.className);
				if (this.styledMode)
					for (l in a.defs) this.renderer.definition(a.defs[l]);
				else this.renderer.setStyle(b.style);
				this.renderer.chartIndex = this.index;
				J(this, "afterGetContainer")
			},
			getMargins: function (a) {
				var b = this.spacing,
					c = this.margin,
					e = this.titleOffset;
				this.resetMargins();
				e[0] && !A(c[0]) && (this.plotTop = Math.max(this.plotTop, e[0] + b[0]));
				e[2] && !A(c[2]) && (this.marginBottom =
					Math.max(this.marginBottom, e[2] + b[2]));
				this.legend && this.legend.display && this.legend.adjustMargins(c, b);
				J(this, "getMargins");
				a || this.getAxisMargins()
			},
			getAxisMargins: function () {
				var a = this,
					b = a.axisOffset = [0, 0, 0, 0],
					c = a.colorAxis,
					e = a.margin,
					d = function (a) {
						a.forEach(function (a) {
							a.visible && a.getOffset()
						})
					};
				a.hasCartesianSeries ? d(a.axes) : c && c.length && d(c);
				G.forEach(function (c, d) {
					A(e[d]) || (a[c] += b[d])
				});
				a.setChartSize()
			},
			reflow: function (a) {
				var c = this,
					e = c.options.chart,
					g = c.renderTo,
					l = A(e.width) && A(e.height),
					h = e.width || d.getStyle(g, "width");
				e = e.height || d.getStyle(g, "height");
				g = a ? a.target : O;
				if (!l && !c.isPrinting && h && e && (g === O || g === m)) {
					if (h !== c.containerWidth || e !== c.containerHeight) d.clearTimeout(c.reflowTimeout), c.reflowTimeout = b(function () {
						c.container && c.setSize(void 0, void 0, !1)
					}, a ? 100 : 0);
					c.containerWidth = h;
					c.containerHeight = e
				}
			},
			setReflow: function (a) {
				var b = this;
				!1 === a || this.unbindReflow ? !1 === a && this.unbindReflow && (this.unbindReflow = this.unbindReflow()) : (this.unbindReflow = g(O, "resize", function (a) {
					b.options &&
						b.reflow(a)
				}), g(this, "destroy", this.unbindReflow))
			},
			setSize: function (a, e, d) {
				var g = this,
					l = g.renderer;
				g.isResizing += 1;
				c(d, g);
				g.oldChartHeight = g.chartHeight;
				g.oldChartWidth = g.chartWidth;
				"undefined" !== typeof a && (g.options.chart.width = a);
				"undefined" !== typeof e && (g.options.chart.height = e);
				g.getChartSize();
				if (!g.styledMode) {
					var h = l.globalAnimation;
					(h ? q : B)(g.container, {
						width: g.chartWidth + "px",
						height: g.chartHeight + "px"
					}, h)
				}
				g.setChartSize(!0);
				l.setSize(g.chartWidth, g.chartHeight, d);
				g.axes.forEach(function (a) {
					a.isDirty = !0;
					a.setScale()
				});
				g.isDirtyLegend = !0;
				g.isDirtyBox = !0;
				g.layOutTitles();
				g.getMargins();
				g.redraw(d);
				g.oldChartHeight = null;
				J(g, "resize");
				b(function () {
					g && J(g, "endResize", null, function () {
						--g.isResizing
					})
				}, L(h).duration || 0)
			},
			setChartSize: function (a) {
				var b = this.inverted,
					c = this.renderer,
					e = this.chartWidth,
					d = this.chartHeight,
					g = this.options.chart,
					l = this.spacing,
					h = this.clipOffset,
					f, v, m, r;
				this.plotLeft = f = Math.round(this.plotLeft);
				this.plotTop = v = Math.round(this.plotTop);
				this.plotWidth = m = Math.max(0, Math.round(e -
					f - this.marginRight));
				this.plotHeight = r = Math.max(0, Math.round(d - v - this.marginBottom));
				this.plotSizeX = b ? r : m;
				this.plotSizeY = b ? m : r;
				this.plotBorderWidth = g.plotBorderWidth || 0;
				this.spacingBox = c.spacingBox = {
					x: l[3],
					y: l[0],
					width: e - l[3] - l[1],
					height: d - l[0] - l[2]
				};
				this.plotBox = c.plotBox = {
					x: f,
					y: v,
					width: m,
					height: r
				};
				e = 2 * Math.floor(this.plotBorderWidth / 2);
				b = Math.ceil(Math.max(e, h[3]) / 2);
				c = Math.ceil(Math.max(e, h[0]) / 2);
				this.clipBox = {
					x: b,
					y: c,
					width: Math.floor(this.plotSizeX - Math.max(e, h[1]) / 2 - b),
					height: Math.max(0, Math.floor(this.plotSizeY -
						Math.max(e, h[2]) / 2 - c))
				};
				a || this.axes.forEach(function (a) {
					a.setAxisSize();
					a.setAxisTranslation()
				});
				J(this, "afterSetChartSize", {
					skipAxes: a
				})
			},
			resetMargins: function () {
				J(this, "resetMargins");
				var a = this,
					b = a.options.chart;
				["margin", "spacing"].forEach(function (c) {
					var e = b[c],
						d = t(e) ? e : [e, e, e, e];
					["Top", "Right", "Bottom", "Left"].forEach(function (e, g) {
						a[c][g] = E(b[c + e], d[g])
					})
				});
				G.forEach(function (b, c) {
					a[b] = E(a.margin[c], a.spacing[c])
				});
				a.axisOffset = [0, 0, 0, 0];
				a.clipOffset = [0, 0, 0, 0]
			},
			drawChartBox: function () {
				var a =
					this.options.chart,
					b = this.renderer,
					c = this.chartWidth,
					e = this.chartHeight,
					d = this.chartBackground,
					g = this.plotBackground,
					l = this.plotBorder,
					h = this.styledMode,
					f = this.plotBGImage,
					v = a.backgroundColor,
					m = a.plotBackgroundColor,
					r = a.plotBackgroundImage,
					k, B = this.plotLeft,
					q = this.plotTop,
					z = this.plotWidth,
					I = this.plotHeight,
					G = this.plotBox,
					t = this.clipRect,
					n = this.clipBox,
					y = "animate";
				d || (this.chartBackground = d = b.rect().addClass("highcharts-background").add(), y = "attr");
				if (h) var C = k = d.strokeWidth();
				else {
					C = a.borderWidth ||
						0;
					k = C + (a.shadow ? 8 : 0);
					v = {
						fill: v || "none"
					};
					if (C || d["stroke-width"]) v.stroke = a.borderColor, v["stroke-width"] = C;
					d.attr(v).shadow(a.shadow)
				}
				d[y]({
					x: k / 2,
					y: k / 2,
					width: c - k - C % 2,
					height: e - k - C % 2,
					r: a.borderRadius
				});
				y = "animate";
				g || (y = "attr", this.plotBackground = g = b.rect().addClass("highcharts-plot-background").add());
				g[y](G);
				h || (g.attr({
					fill: m || "none"
				}).shadow(a.plotShadow), r && (f ? (r !== f.attr("href") && f.attr("href", r), f.animate(G)) : this.plotBGImage = b.image(r, B, q, z, I).add()));
				t ? t.animate({
						width: n.width,
						height: n.height
					}) :
					this.clipRect = b.clipRect(n);
				y = "animate";
				l || (y = "attr", this.plotBorder = l = b.rect().addClass("highcharts-plot-border").attr({
					zIndex: 1
				}).add());
				h || l.attr({
					stroke: a.plotBorderColor,
					"stroke-width": a.plotBorderWidth || 0,
					fill: "none"
				});
				l[y](l.crisp({
					x: B,
					y: q,
					width: z,
					height: I
				}, -l.strokeWidth()));
				this.isDirtyBox = !1;
				J(this, "afterDrawChartBox")
			},
			propFromSeries: function () {
				var a = this,
					b = a.options.chart,
					c, e = a.options.series,
					d, g;
				["inverted", "angular", "polar"].forEach(function (l) {
					c = w[b.type || b.defaultSeriesType];
					g = b[l] ||
						c && c.prototype[l];
					for (d = e && e.length; !g && d--;)(c = w[e[d].type]) && c.prototype[l] && (g = !0);
					a[l] = g
				})
			},
			linkSeries: function () {
				var a = this,
					b = a.series;
				b.forEach(function (a) {
					a.linkedSeries.length = 0
				});
				b.forEach(function (b) {
					var c = b.options.linkedTo;
					y(c) && (c = ":previous" === c ? a.series[b.index - 1] : a.get(c)) && c.linkedParent !== b && (c.linkedSeries.push(b), b.linkedParent = c, c.enabledDataSorting && b.setDataSortingOptions(), b.visible = E(b.options.visible, c.options.visible, b.visible))
				});
				J(this, "afterLinkSeries")
			},
			renderSeries: function () {
				this.series.forEach(function (a) {
					a.translate();
					a.render()
				})
			},
			renderLabels: function () {
				var a = this,
					b = a.options.labels;
				b.items && b.items.forEach(function (c) {
					var e = p(b.style, c.style),
						d = h(e.left) + a.plotLeft,
						g = h(e.top) + a.plotTop + 12;
					delete e.left;
					delete e.top;
					a.renderer.text(c.html, d, g).attr({
						zIndex: 2
					}).css(e).add()
				})
			},
			render: function () {
				var a = this.axes,
					b = this.colorAxis,
					c = this.renderer,
					e = this.options,
					d = 0,
					g = function (a) {
						a.forEach(function (a) {
							a.visible && a.render()
						})
					};
				this.setTitle();
				this.legend = new r(this, e.legend);
				this.getStacks && this.getStacks();
				this.getMargins(!0);
				this.setChartSize();
				e = this.plotWidth;
				a.some(function (a) {
					if (a.horiz && a.visible && a.options.labels.enabled && a.series.length) return d = 21, !0
				});
				var l = this.plotHeight = Math.max(this.plotHeight - d, 0);
				a.forEach(function (a) {
					a.setScale()
				});
				this.getAxisMargins();
				var h = 1.1 < e / this.plotWidth;
				var f = 1.05 < l / this.plotHeight;
				if (h || f) a.forEach(function (a) {
					(a.horiz && h || !a.horiz && f) && a.setTickInterval(!0)
				}), this.getMargins();
				this.drawChartBox();
				this.hasCartesianSeries ? g(a) : b && b.length && g(b);
				this.seriesGroup || (this.seriesGroup =
					c.g("series-group").attr({
						zIndex: 3
					}).add());
				this.renderSeries();
				this.renderLabels();
				this.addCredits();
				this.setResponsive && this.setResponsive();
				this.updateContainerScaling();
				this.hasRendered = !0
			},
			addCredits: function (a) {
				var b = this;
				a = N(!0, this.options.credits, a);
				a.enabled && !this.credits && (this.credits = this.renderer.text(a.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function () {
						a.href && (O.location.href = a.href)
					}).attr({
						align: a.position.align,
						zIndex: 8
					}), b.styledMode || this.credits.css(a.style),
					this.credits.add().align(a.position), this.credits.update = function (a) {
						b.credits = b.credits.destroy();
						b.addCredits(a)
					})
			},
			updateContainerScaling: function () {
				var a = this.container;
				if (a.offsetWidth && a.offsetHeight && a.getBoundingClientRect) {
					var b = a.getBoundingClientRect(),
						c = b.width / a.offsetWidth;
					a = b.height / a.offsetHeight;
					1 !== c || 1 !== a ? this.containerScaling = {
						scaleX: c,
						scaleY: a
					} : delete this.containerScaling
				}
			},
			destroy: function () {
				var a = this,
					b = a.axes,
					c = a.series,
					e = a.container,
					g, l = e && e.parentNode;
				J(a, "destroy");
				a.renderer.forExport ?
					x(v, a) : v[a.index] = void 0;
				d.chartCount--;
				a.renderTo.removeAttribute("data-highcharts-chart");
				S(a);
				for (g = b.length; g--;) b[g] = b[g].destroy();
				this.scroller && this.scroller.destroy && this.scroller.destroy();
				for (g = c.length; g--;) c[g] = c[g].destroy();
				"title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" ").forEach(function (b) {
					var c = a[b];
					c && c.destroy && (a[b] = c.destroy())
				});
				e && (e.innerHTML = "", S(e),
					l && D(e));
				n(a, function (b, c) {
					delete a[c]
				})
			},
			firstRender: function () {
				var a = this,
					b = a.options;
				if (!a.isReadyToRender || a.isReadyToRender()) {
					a.getContainer();
					a.resetMargins();
					a.setChartSize();
					a.propFromSeries();
					a.getAxes();
					(H(b.series) ? b.series : []).forEach(function (b) {
						a.initSeries(b)
					});
					a.linkSeries();
					a.setSeriesData();
					J(a, "beforeRender");
					U && (a.pointer = new U(a, b));
					a.render();
					if (!a.renderer.imgCount && a.onload) a.onload();
					a.temporaryDisplay(!0)
				}
			},
			onload: function () {
				this.callbacks.concat([this.callback]).forEach(function (a) {
					a &&
						"undefined" !== typeof this.index && a.apply(this, [this])
				}, this);
				J(this, "load");
				J(this, "render");
				A(this.index) && this.setReflow(this.options.chart.reflow);
				this.onload = null
			}
		})
	});
	M(w, "parts/ScrollablePlotArea.js", [w["parts/Globals.js"], w["parts/Utilities.js"]], function (d, f) {
		var w = f.pick,
			F = d.addEvent;
		f = d.Chart;
		"";
		F(f, "afterSetChartSize", function (f) {
			var A = this.options.chart.scrollablePlotArea,
				x = A && A.minWidth;
			A = A && A.minHeight;
			if (!this.renderer.forExport) {
				if (x) {
					if (this.scrollablePixelsX = x = Math.max(0, x - this.chartWidth)) {
						this.plotWidth +=
							x;
						this.inverted ? (this.clipBox.height += x, this.plotBox.height += x) : (this.clipBox.width += x, this.plotBox.width += x);
						var p = {
							1: {
								name: "right",
								value: x
							}
						}
					}
				} else A && (this.scrollablePixelsY = x = Math.max(0, A - this.chartHeight)) && (this.plotHeight += x, this.inverted ? (this.clipBox.width += x, this.plotBox.width += x) : (this.clipBox.height += x, this.plotBox.height += x), p = {
					2: {
						name: "bottom",
						value: x
					}
				});
				p && !f.skipAxes && this.axes.forEach(function (f) {
					p[f.side] ? f.getPlotLinePath = function () {
						var u = p[f.side].name,
							t = this[u];
						this[u] = t - p[f.side].value;
						var y = d.Axis.prototype.getPlotLinePath.apply(this, arguments);
						this[u] = t;
						return y
					} : (f.setAxisSize(), f.setAxisTranslation())
				})
			}
		});
		F(f, "render", function () {
			this.scrollablePixelsX || this.scrollablePixelsY ? (this.setUpScrolling && this.setUpScrolling(), this.applyFixed()) : this.fixedDiv && this.applyFixed()
		});
		f.prototype.setUpScrolling = function () {
			var f = {
				WebkitOverflowScrolling: "touch",
				overflowX: "hidden",
				overflowY: "hidden"
			};
			this.scrollablePixelsX && (f.overflowX = "auto");
			this.scrollablePixelsY && (f.overflowY = "auto");
			this.scrollingContainer = d.createElement("div", {
				className: "highcharts-scrolling"
			}, f, this.renderTo);
			this.innerContainer = d.createElement("div", {
				className: "highcharts-inner-container"
			}, null, this.scrollingContainer);
			this.innerContainer.appendChild(this.container);
			this.setUpScrolling = null
		};
		f.prototype.moveFixedElements = function () {
			var d = this.container,
				f = this.fixedRenderer,
				x = ".highcharts-contextbutton .highcharts-credits .highcharts-legend .highcharts-legend-checkbox .highcharts-navigator-series .highcharts-navigator-xaxis .highcharts-navigator-yaxis .highcharts-navigator .highcharts-reset-zoom .highcharts-scrollbar .highcharts-subtitle .highcharts-title".split(" "),
				p;
			this.scrollablePixelsX && !this.inverted ? p = ".highcharts-yaxis" : this.scrollablePixelsX && this.inverted ? p = ".highcharts-xaxis" : this.scrollablePixelsY && !this.inverted ? p = ".highcharts-xaxis" : this.scrollablePixelsY && this.inverted && (p = ".highcharts-yaxis");
			x.push(p, p + "-labels");
			x.forEach(function (p) {
				[].forEach.call(d.querySelectorAll(p), function (d) {
					(d.namespaceURI === f.SVG_NS ? f.box : f.box.parentNode).appendChild(d);
					d.style.pointerEvents = "auto"
				})
			})
		};
		f.prototype.applyFixed = function () {
			var f, D = !this.fixedDiv,
				x = this.options.chart.scrollablePlotArea;
			D ? (this.fixedDiv = d.createElement("div", {
					className: "highcharts-fixed"
				}, {
					position: "absolute",
					overflow: "hidden",
					pointerEvents: "none",
					zIndex: 2
				}, null, !0), this.renderTo.insertBefore(this.fixedDiv, this.renderTo.firstChild), this.renderTo.style.overflow = "visible", this.fixedRenderer = f = new d.Renderer(this.fixedDiv, this.chartWidth, this.chartHeight), this.scrollableMask = f.path().attr({
					fill: this.options.chart.backgroundColor || "#fff",
					"fill-opacity": w(x.opacity, .85),
					zIndex: -1
				}).addClass("highcharts-scrollable-mask").add(),
				this.moveFixedElements(), F(this, "afterShowResetZoom", this.moveFixedElements), F(this, "afterLayOutTitles", this.moveFixedElements)) : this.fixedRenderer.setSize(this.chartWidth, this.chartHeight);
			f = this.chartWidth + (this.scrollablePixelsX || 0);
			var p = this.chartHeight + (this.scrollablePixelsY || 0);
			d.stop(this.container);
			this.container.style.width = f + "px";
			this.container.style.height = p + "px";
			this.renderer.boxWrapper.attr({
				width: f,
				height: p,
				viewBox: [0, 0, f, p].join(" ")
			});
			this.chartBackground.attr({
				width: f,
				height: p
			});
			this.scrollablePixelsY && (this.scrollingContainer.style.height = this.chartHeight + "px");
			D && (x.scrollPositionX && (this.scrollingContainer.scrollLeft = this.scrollablePixelsX * x.scrollPositionX), x.scrollPositionY && (this.scrollingContainer.scrollTop = this.scrollablePixelsY * x.scrollPositionY));
			p = this.axisOffset;
			D = this.plotTop - p[0] - 1;
			x = this.plotLeft - p[3] - 1;
			f = this.plotTop + this.plotHeight + p[2] + 1;
			p = this.plotLeft + this.plotWidth + p[1] + 1;
			var H = this.plotLeft + this.plotWidth - (this.scrollablePixelsX || 0),
				u = this.plotTop + this.plotHeight -
				(this.scrollablePixelsY || 0);
			D = this.scrollablePixelsX ? ["M", 0, D, "L", this.plotLeft - 1, D, "L", this.plotLeft - 1, f, "L", 0, f, "Z", "M", H, D, "L", this.chartWidth, D, "L", this.chartWidth, f, "L", H, f, "Z"] : this.scrollablePixelsY ? ["M", x, 0, "L", x, this.plotTop - 1, "L", p, this.plotTop - 1, "L", p, 0, "Z", "M", x, u, "L", x, this.chartHeight, "L", p, this.chartHeight, "L", p, u, "Z"] : ["M", 0, 0];
			"adjustHeight" !== this.redrawTrigger && this.scrollableMask.attr({
				d: D
			})
		}
	});
	M(w, "parts/Point.js", [w["parts/Globals.js"], w["parts/Utilities.js"]], function (d, f) {
		var w =
			f.animObject,
			F = f.defined,
			A = f.erase,
			D = f.extend,
			x = f.isArray,
			p = f.isNumber,
			H = f.isObject,
			u = f.syncTimeout,
			t = f.pick,
			y, k = d.fireEvent,
			n = d.format,
			E = d.uniqueKey,
			h = d.removeEvent;
		d.Point = y = function () {};
		d.Point.prototype = {
			init: function (e, c, a) {
				this.series = e;
				this.applyOptions(c, a);
				this.id = F(this.id) ? this.id : E();
				this.resolveColor();
				e.chart.pointCount++;
				k(this, "afterInit");
				return this
			},
			resolveColor: function () {
				var e = this.series;
				var c = e.chart.options.chart.colorCount;
				var a = e.chart.styledMode;
				a || this.options.color || (this.color =
					e.color);
				e.options.colorByPoint ? (a || (c = e.options.colors || e.chart.options.colors, this.color = this.color || c[e.colorCounter], c = c.length), a = e.colorCounter, e.colorCounter++, e.colorCounter === c && (e.colorCounter = 0)) : a = e.colorIndex;
				this.colorIndex = t(this.colorIndex, a)
			},
			applyOptions: function (e, c) {
				var a = this.series,
					b = a.options.pointValKey || a.pointValKey;
				e = y.prototype.optionsToObject.call(this, e);
				D(this, e);
				this.options = this.options ? D(this.options, e) : e;
				e.group && delete this.group;
				e.dataLabels && delete this.dataLabels;
				b && (this.y = this[b]);
				this.formatPrefix = (this.isNull = t(this.isValid && !this.isValid(), null === this.x || !p(this.y))) ? "null" : "point";
				this.selected && (this.state = "select");
				"name" in this && "undefined" === typeof c && a.xAxis && a.xAxis.hasNames && (this.x = a.xAxis.nameToX(this));
				"undefined" === typeof this.x && a && (this.x = "undefined" === typeof c ? a.autoIncrement(this) : c);
				return this
			},
			setNestedProperty: function (e, c, a) {
				a.split(".").reduce(function (a, e, d, h) {
					a[e] = h.length - 1 === d ? c : H(a[e], !0) ? a[e] : {};
					return a[e]
				}, e);
				return e
			},
			optionsToObject: function (e) {
				var c = {},
					a = this.series,
					b = a.options.keys,
					g = b || a.pointArrayMap || ["y"],
					h = g.length,
					f = 0,
					k = 0;
				if (p(e) || null === e) c[g[0]] = e;
				else if (x(e))
					for (!b && e.length > h && (a = typeof e[0], "string" === a ? c.name = e[0] : "number" === a && (c.x = e[0]), f++); k < h;) b && "undefined" === typeof e[f] || (0 < g[k].indexOf(".") ? d.Point.prototype.setNestedProperty(c, e[f], g[k]) : c[g[k]] = e[f]), f++, k++;
				else "object" === typeof e && (c = e, e.dataLabels && (a._hasPointLabels = !0), e.marker && (a._hasPointMarkers = !0));
				return c
			},
			getClassName: function () {
				return "highcharts-point" + (this.selected ?
					" highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" : "") + ("undefined" !== typeof this.colorIndex ? " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className : "") + (this.zone && this.zone.className ? " " + this.zone.className.replace("highcharts-negative", "") : "")
			},
			getZone: function () {
				var e = this.series,
					c = e.zones;
				e = e.zoneAxis || "y";
				var a = 0,
					b;
				for (b = c[a]; this[e] >= b.value;) b = c[++a];
				this.nonZonedColor || (this.nonZonedColor = this.color);
				this.color = b && b.color && !this.options.color ? b.color : this.nonZonedColor;
				return b
			},
			hasNewShapeType: function () {
				return (this.graphic && (this.graphic.symbolName || this.graphic.element.nodeName)) !== this.shapeType
			},
			destroy: function () {
				function e() {
					d && (c.setState(), A(d, c), d.length || (b.hoverPoints = null));
					if (c === b.hoverPoint) c.onMouseOut();
					if (c.graphic || c.dataLabel || c.dataLabels) h(c), c.destroyElements();
					for (m in c) c[m] = null
				}
				var c = this,
					a = c.series,
					b = a.chart;
				a = a.options.dataSorting;
				var d = b.hoverPoints,
					f = w(c.series.chart.renderer.globalAnimation),
					m;
				a && a.enabled ? (this.animateBeforeDestroy(), u(e, f.duration)) : e();
				b.pointCount--;
				c.legendItem && b.legend.destroyItem(c)
			},
			animateBeforeDestroy: function () {
				var e = this,
					c = {
						x: e.startXPos,
						opacity: 0
					},
					a, b = e.getGraphicalProps();
				b.singular.forEach(function (b) {
					a = "dataLabel" === b;
					e[b] = e[b].animate(a ? {
						x: e[b].startXPos,
						y: e[b].startYPos,
						opacity: 0
					} : c)
				});
				b.plural.forEach(function (a) {
					e[a].forEach(function (a) {
						a.element && a.animate(D({
							x: e.startXPos
						}, a.startYPos ? {
							x: a.startXPos,
							y: a.startYPos
						} : {}))
					})
				})
			},
			destroyElements: function (e) {
				var c =
					this;
				e = c.getGraphicalProps(e);
				e.singular.forEach(function (a) {
					c[a] = c[a].destroy()
				});
				e.plural.forEach(function (a) {
					c[a].forEach(function (a) {
						a.element && a.destroy()
					});
					delete c[a]
				})
			},
			getGraphicalProps: function (e) {
				var c = this,
					a = [],
					b, d = {
						singular: [],
						plural: []
					};
				e = e || {
					graphic: 1,
					dataLabel: 1
				};
				e.graphic && a.push("graphic", "shadowGroup");
				e.dataLabel && a.push("dataLabel", "dataLabelUpper", "connector");
				for (b = a.length; b--;) {
					var h = a[b];
					c[h] && d.singular.push(h)
				} ["dataLabel", "connector"].forEach(function (a) {
					var b = a + "s";
					e[a] &&
						c[b] && d.plural.push(b)
				});
				return d
			},
			getLabelConfig: function () {
				return {
					x: this.category,
					y: this.y,
					color: this.color,
					colorIndex: this.colorIndex,
					key: this.name || this.category,
					series: this.series,
					point: this,
					percentage: this.percentage,
					total: this.total || this.stackTotal
				}
			},
			tooltipFormatter: function (e) {
				var c = this.series,
					a = c.tooltipOptions,
					b = t(a.valueDecimals, ""),
					d = a.valuePrefix || "",
					h = a.valueSuffix || "";
				c.chart.styledMode && (e = c.chart.tooltip.styledModeFormat(e));
				(c.pointArrayMap || ["y"]).forEach(function (a) {
					a = "{point." +
						a;
					if (d || h) e = e.replace(RegExp(a + "}", "g"), d + a + "}" + h);
					e = e.replace(RegExp(a + "}", "g"), a + ":,." + b + "f}")
				});
				return n(e, {
					point: this,
					series: this.series
				}, c.chart)
			},
			firePointEvent: function (e, c, a) {
				var b = this,
					d = this.series.options;
				(d.point.events[e] || b.options && b.options.events && b.options.events[e]) && this.importEvents();
				"click" === e && d.allowPointSelect && (a = function (a) {
					b.select && b.select(null, a.ctrlKey || a.metaKey || a.shiftKey)
				});
				k(this, e, c, a)
			},
			visible: !0
		}
	});
	M(w, "parts/Series.js", [w["parts/Globals.js"], w["parts/Utilities.js"]],
		function (d, f) {
			var w = f.animObject,
				F = f.arrayMax,
				A = f.arrayMin,
				D = f.clamp,
				x = f.correctFloat,
				p = f.defined,
				H = f.erase,
				u = f.extend,
				t = f.isArray,
				y = f.isNumber,
				k = f.isString,
				n = f.objectEach,
				E = f.pick,
				h = f.splat,
				e = f.syncTimeout,
				c = d.addEvent,
				a = d.defaultOptions,
				b = d.defaultPlotOptions,
				g = d.fireEvent,
				q = d.merge,
				m = d.removeEvent,
				C = d.SVGElement,
				z = d.win;
			d.Series = d.seriesType("line", null, {
				lineWidth: 2,
				allowPointSelect: !1,
				showCheckbox: !1,
				animation: {
					duration: 1E3
				},
				events: {},
				marker: {
					enabledThreshold: 2,
					lineColor: "#ffffff",
					lineWidth: 0,
					radius: 4,
					states: {
						normal: {
							animation: !0
						},
						hover: {
							animation: {
								duration: 50
							},
							enabled: !0,
							radiusPlus: 2,
							lineWidthPlus: 1
						},
						select: {
							fillColor: "#cccccc",
							lineColor: "#000000",
							lineWidth: 2
						}
					}
				},
				point: {
					events: {}
				},
				dataLabels: {
					align: "center",
					formatter: function () {
						var a = this.series.chart.numberFormatter;
						return null === this.y ? "" : a(this.y, -1)
					},
					padding: 5,
					style: {
						fontSize: "11px",
						fontWeight: "bold",
						color: "contrast",
						textOutline: "1px contrast"
					},
					verticalAlign: "bottom",
					x: 0,
					y: 0
				},
				cropThreshold: 300,
				opacity: 1,
				pointRange: 0,
				softThreshold: !0,
				states: {
					normal: {
						animation: !0
					},
					hover: {
						animation: {
							duration: 50
						},
						lineWidthPlus: 1,
						marker: {},
						halo: {
							size: 10,
							opacity: .25
						}
					},
					select: {
						animation: {
							duration: 0
						}
					},
					inactive: {
						animation: {
							duration: 50
						},
						opacity: .2
					}
				},
				stickyTracking: !0,
				turboThreshold: 1E3,
				findNearestPointBy: "x"
			}, {
				axisTypes: ["xAxis", "yAxis"],
				coll: "series",
				colorCounter: 0,
				cropShoulder: 1,
				directTouch: !1,
				eventsToUnbind: [],
				isCartesian: !0,
				parallelArrays: ["x", "y"],
				pointClass: d.Point,
				requireSorting: !0,
				sorted: !0,
				init: function (a, b) {
					g(this, "init", {
						options: b
					});
					var e = this,
						l = a.series,
						h;
					this.eventOptions = this.eventOptions || {};
					e.chart = a;
					e.options = b = e.setOptions(b);
					e.linkedSeries = [];
					e.bindAxes();
					u(e, {
						name: b.name,
						state: "",
						visible: !1 !== b.visible,
						selected: !0 === b.selected
					});
					var f = b.events;
					n(f, function (a, b) {
						d.isFunction(a) && e.eventOptions[b] !== a && (d.isFunction(e.eventOptions[b]) && m(e, b, e.eventOptions[b]), e.eventOptions[b] = a, c(e, b, a))
					});
					if (f && f.click || b.point && b.point.events && b.point.events.click || b.allowPointSelect) a.runTrackerClick = !0;
					e.getColor();
					e.getSymbol();
					e.parallelArrays.forEach(function (a) {
						e[a +
							"Data"] || (e[a + "Data"] = [])
					});
					e.isCartesian && (a.hasCartesianSeries = !0);
					l.length && (h = l[l.length - 1]);
					e._i = E(h && h._i, -1) + 1;
					a.orderSeries(this.insert(l));
					b.dataSorting && b.dataSorting.enabled ? e.setDataSortingOptions() : e.points || e.data || e.setData(b.data, !1);
					g(this, "afterInit")
				},
				insert: function (a) {
					var b = this.options.index,
						c;
					if (y(b)) {
						for (c = a.length; c--;)
							if (b >= E(a[c].options.index, a[c]._i)) {
								a.splice(c + 1, 0, this);
								break
							} - 1 === c && a.unshift(this);
						c += 1
					} else a.push(this);
					return E(c, a.length - 1)
				},
				bindAxes: function () {
					var a =
						this,
						b = a.options,
						c = a.chart,
						e;
					g(this, "bindAxes", null, function () {
						(a.axisTypes || []).forEach(function (g) {
							c[g].forEach(function (c) {
								e = c.options;
								if (b[g] === e.index || "undefined" !== typeof b[g] && b[g] === e.id || "undefined" === typeof b[g] && 0 === e.index) a.insert(c.series), a[g] = c, c.isDirty = !0
							});
							a[g] || a.optionalAxis === g || d.error(18, !0, c)
						})
					})
				},
				updateParallelArrays: function (a, b) {
					var c = a.series,
						e = arguments,
						d = y(b) ? function (e) {
							var d = "y" === e && c.toYData ? c.toYData(a) : a[e];
							c[e + "Data"][b] = d
						} : function (a) {
							Array.prototype[b].apply(c[a +
								"Data"], Array.prototype.slice.call(e, 2))
						};
					c.parallelArrays.forEach(d)
				},
				hasData: function () {
					return this.visible && "undefined" !== typeof this.dataMax && "undefined" !== typeof this.dataMin || this.visible && this.yData && 0 < this.yData.length
				},
				autoIncrement: function () {
					var a = this.options,
						b = this.xIncrement,
						c, e = a.pointIntervalUnit,
						d = this.chart.time;
					b = E(b, a.pointStart, 0);
					this.pointInterval = c = E(this.pointInterval, a.pointInterval, 1);
					e && (a = new d.Date(b), "day" === e ? d.set("Date", a, d.get("Date", a) + c) : "month" === e ? d.set("Month",
						a, d.get("Month", a) + c) : "year" === e && d.set("FullYear", a, d.get("FullYear", a) + c), c = a.getTime() - b);
					this.xIncrement = b + c;
					return b
				},
				setDataSortingOptions: function () {
					var a = this.options;
					u(this, {
						requireSorting: !1,
						sorted: !1,
						enabledDataSorting: !0,
						allowDG: !1
					});
					p(a.pointRange) || (a.pointRange = 1)
				},
				setOptions: function (b) {
					var c = this.chart,
						e = c.options,
						d = e.plotOptions,
						l = c.userOptions || {};
					b = q(b);
					c = c.styledMode;
					var h = {
						plotOptions: d,
						userOptions: b
					};
					g(this, "setOptions", h);
					var f = h.plotOptions[this.type],
						m = l.plotOptions || {};
					this.userOptions = h.userOptions;
					l = q(f, d.series, l.plotOptions && l.plotOptions[this.type], b);
					this.tooltipOptions = q(a.tooltip, a.plotOptions.series && a.plotOptions.series.tooltip, a.plotOptions[this.type].tooltip, e.tooltip.userOptions, d.series && d.series.tooltip, d[this.type].tooltip, b.tooltip);
					this.stickyTracking = E(b.stickyTracking, m[this.type] && m[this.type].stickyTracking, m.series && m.series.stickyTracking, this.tooltipOptions.shared && !this.noSharedTooltip ? !0 : l.stickyTracking);
					null === f.marker && delete l.marker;
					this.zoneAxis = l.zoneAxis;
					e = this.zones = (l.zones || []).slice();
					!l.negativeColor && !l.negativeFillColor || l.zones || (d = {
						value: l[this.zoneAxis + "Threshold"] || l.threshold || 0,
						className: "highcharts-negative"
					}, c || (d.color = l.negativeColor, d.fillColor = l.negativeFillColor), e.push(d));
					e.length && p(e[e.length - 1].value) && e.push(c ? {} : {
						color: this.color,
						fillColor: this.fillColor
					});
					g(this, "afterSetOptions", {
						options: l
					});
					return l
				},
				getName: function () {
					return E(this.options.name, "Series " + (this.index + 1))
				},
				getCyclic: function (a,
					b, c) {
					var e = this.chart,
						d = this.userOptions,
						g = a + "Index",
						l = a + "Counter",
						h = c ? c.length : E(e.options.chart[a + "Count"], e[a + "Count"]);
					if (!b) {
						var f = E(d[g], d["_" + g]);
						p(f) || (e.series.length || (e[l] = 0), d["_" + g] = f = e[l] % h, e[l] += 1);
						c && (b = c[f])
					}
					"undefined" !== typeof f && (this[g] = f);
					this[a] = b
				},
				getColor: function () {
					this.chart.styledMode ? this.getCyclic("color") : this.options.colorByPoint ? this.options.color = null : this.getCyclic("color", this.options.color || b[this.type].color, this.chart.options.colors)
				},
				getSymbol: function () {
					this.getCyclic("symbol",
						this.options.marker.symbol, this.chart.options.symbols)
				},
				findPointIndex: function (a, b) {
					var c = a.id,
						e = a.x,
						g = this.points,
						l, h = this.options.dataSorting;
					if (c) var f = this.chart.get(c);
					else if (this.linkedParent || this.enabledDataSorting) {
						var m = h && h.matchByName ? "name" : "index";
						f = d.find(g, function (b) {
							return !b.touched && b[m] === a[m]
						});
						if (!f) return
					}
					if (f) {
						var v = f && f.index;
						"undefined" !== typeof v && (l = !0)
					}
					"undefined" === typeof v && y(e) && (v = this.xData.indexOf(e, b)); - 1 !== v && "undefined" !== typeof v && this.cropped && (v = v >= this.cropStart ?
						v - this.cropStart : v);
					!l && g[v] && g[v].touched && (v = void 0);
					return v
				},
				drawLegendSymbol: d.LegendSymbolMixin.drawLineMarker,
				updateData: function (a, b) {
					var c = this.options,
						e = c.dataSorting,
						d = this.points,
						g = [],
						l, h, f, m = this.requireSorting,
						v = a.length === d.length,
						k = !0;
					this.xIncrement = null;
					a.forEach(function (a, b) {
						var h = p(a) && this.pointClass.prototype.optionsToObject.call({
							series: this
						}, a) || {};
						var k = h.x;
						if (h.id || y(k)) {
							if (k = this.findPointIndex(h, f), -1 === k || "undefined" === typeof k ? g.push(a) : d[k] && a !== c.data[k] ? (d[k].update(a,
									!1, null, !1), d[k].touched = !0, m && (f = k + 1)) : d[k] && (d[k].touched = !0), !v || b !== k || e && e.enabled || this.hasDerivedData) l = !0
						} else g.push(a)
					}, this);
					if (l)
						for (a = d.length; a--;)(h = d[a]) && !h.touched && h.remove && h.remove(!1, b);
					else !v || e && e.enabled ? k = !1 : (a.forEach(function (a, b) {
						d[b].update && a !== d[b].y && d[b].update(a, !1, null, !1)
					}), g.length = 0);
					d.forEach(function (a) {
						a && (a.touched = !1)
					});
					if (!k) return !1;
					g.forEach(function (a) {
						this.addPoint(a, !1, null, null, !1)
					}, this);
					null === this.xIncrement && this.xData && this.xData.length && (this.xIncrement =
						F(this.xData), this.autoIncrement());
					return !0
				},
				setData: function (a, b, c, e) {
					var g = this,
						l = g.points,
						h = l && l.length || 0,
						f, m = g.options,
						v = g.chart,
						q = m.dataSorting,
						B = null,
						z = g.xAxis;
					B = m.turboThreshold;
					var I = this.xData,
						n = this.yData,
						C = (f = g.pointArrayMap) && f.length,
						p = m.keys,
						u = 0,
						x = 1,
						A;
					a = a || [];
					f = a.length;
					b = E(b, !0);
					q && q.enabled && (a = this.sortData(a));
					!1 !== e && f && h && !g.cropped && !g.hasGroupedData && g.visible && !g.isSeriesBoosting && (A = this.updateData(a, c));
					if (!A) {
						g.xIncrement = null;
						g.colorCounter = 0;
						this.parallelArrays.forEach(function (a) {
							g[a +
								"Data"].length = 0
						});
						if (B && f > B)
							if (B = g.getFirstValidPoint(a), y(B))
								for (c = 0; c < f; c++) I[c] = this.autoIncrement(), n[c] = a[c];
							else if (t(B))
							if (C)
								for (c = 0; c < f; c++) e = a[c], I[c] = e[0], n[c] = e.slice(1, C + 1);
							else
								for (p && (u = p.indexOf("x"), x = p.indexOf("y"), u = 0 <= u ? u : 0, x = 0 <= x ? x : 1), c = 0; c < f; c++) e = a[c], I[c] = e[u], n[c] = e[x];
						else d.error(12, !1, v);
						else
							for (c = 0; c < f; c++) "undefined" !== typeof a[c] && (e = {
								series: g
							}, g.pointClass.prototype.applyOptions.apply(e, [a[c]]), g.updateParallelArrays(e, c));
						n && k(n[0]) && d.error(14, !0, v);
						g.data = [];
						g.options.data =
							g.userOptions.data = a;
						for (c = h; c--;) l[c] && l[c].destroy && l[c].destroy();
						z && (z.minRange = z.userMinRange);
						g.isDirty = v.isDirtyBox = !0;
						g.isDirtyData = !!l;
						c = !1
					}
					"point" === m.legendType && (this.processData(), this.generatePoints());
					b && v.redraw(c)
				},
				sortData: function (a) {
					var b = this,
						c = b.options.dataSorting.sortKey || "y",
						e = function (a, b) {
							return p(b) && a.pointClass.prototype.optionsToObject.call({
								series: a
							}, b) || {}
						};
					a.forEach(function (c, d) {
						a[d] = e(b, c);
						a[d].index = d
					}, this);
					a.concat().sort(function (a, b) {
						return y(b[c]) ? b[c] - a[c] :
							-1
					}).forEach(function (a, b) {
						a.x = b
					}, this);
					b.linkedSeries && b.linkedSeries.forEach(function (b) {
						var c = b.options,
							d = c.data;
						c.dataSorting && c.dataSorting.enabled || !d || (d.forEach(function (c, g) {
							d[g] = e(b, c);
							a[g] && (d[g].x = a[g].x, d[g].index = g)
						}), b.setData(d, !1))
					});
					return a
				},
				processData: function (a) {
					var b = this.xData,
						c = this.yData,
						e = b.length;
					var g = 0;
					var l = this.xAxis,
						h = this.options;
					var f = h.cropThreshold;
					var m = this.getExtremesFromAll || h.getExtremesFromAll,
						k = this.isCartesian;
					h = l && l.val2lin;
					var q = l && l.isLog,
						z = this.requireSorting;
					if (k && !this.isDirty && !l.isDirty && !this.yAxis.isDirty && !a) return !1;
					if (l) {
						a = l.getExtremes();
						var t = a.min;
						var n = a.max
					}
					if (k && this.sorted && !m && (!f || e > f || this.forceCrop))
						if (b[e - 1] < t || b[0] > n) b = [], c = [];
						else if (this.yData && (b[0] < t || b[e - 1] > n)) {
						g = this.cropData(this.xData, this.yData, t, n);
						b = g.xData;
						c = g.yData;
						g = g.start;
						var y = !0
					}
					for (f = b.length || 1; --f;)
						if (e = q ? h(b[f]) - h(b[f - 1]) : b[f] - b[f - 1], 0 < e && ("undefined" === typeof C || e < C)) var C = e;
						else 0 > e && z && (d.error(15, !1, this.chart), z = !1);
					this.cropped = y;
					this.cropStart = g;
					this.processedXData =
						b;
					this.processedYData = c;
					this.closestPointRange = this.basePointRange = C
				},
				cropData: function (a, b, c, e, d) {
					var g = a.length,
						l = 0,
						h = g,
						f;
					d = E(d, this.cropShoulder);
					for (f = 0; f < g; f++)
						if (a[f] >= c) {
							l = Math.max(0, f - d);
							break
						} for (c = f; c < g; c++)
						if (a[c] > e) {
							h = c + d;
							break
						} return {
						xData: a.slice(l, h),
						yData: b.slice(l, h),
						start: l,
						end: h
					}
				},
				generatePoints: function () {
					var a = this.options,
						b = a.data,
						c = this.data,
						e, d = this.processedXData,
						f = this.processedYData,
						m = this.pointClass,
						k = d.length,
						q = this.cropStart || 0,
						z = this.hasGroupedData;
					a = a.keys;
					var t = [],
						n;
					c || z || (c = [], c.length = b.length, c = this.data = c);
					a && z && (this.options.keys = !1);
					for (n = 0; n < k; n++) {
						var y = q + n;
						if (z) {
							var C = (new m).init(this, [d[n]].concat(h(f[n])));
							C.dataGroup = this.groupMap[n];
							C.dataGroup.options && (C.options = C.dataGroup.options, u(C, C.dataGroup.options), delete C.dataLabels)
						} else(C = c[y]) || "undefined" === typeof b[y] || (c[y] = C = (new m).init(this, b[y], d[n]));
						C && (C.index = y, t[n] = C)
					}
					this.options.keys = a;
					if (c && (k !== (e = c.length) || z))
						for (n = 0; n < e; n++) n !== q || z || (n += k), c[n] && (c[n].destroyElements(), c[n].plotX =
							void 0);
					this.data = c;
					this.points = t;
					g(this, "afterGeneratePoints")
				},
				getXExtremes: function (a) {
					return {
						min: A(a),
						max: F(a)
					}
				},
				getExtremes: function (a) {
					var b = this.xAxis,
						c = this.yAxis,
						e = this.processedXData || this.xData,
						d = [],
						l = 0,
						h = 0;
					var f = 0;
					var m = this.requireSorting ? this.cropShoulder : 0,
						k = c ? c.positiveValuesOnly : !1,
						q;
					a = a || this.stackedYData || this.processedYData || [];
					c = a.length;
					b && (f = b.getExtremes(), h = f.min, f = f.max);
					for (q = 0; q < c; q++) {
						var z = e[q];
						var n = a[q];
						var C = (y(n) || t(n)) && (n.length || 0 < n || !k);
						z = this.getExtremesFromAll ||
							this.options.getExtremesFromAll || this.cropped || !b || (e[q + m] || z) >= h && (e[q - m] || z) <= f;
						if (C && z)
							if (C = n.length)
								for (; C--;) y(n[C]) && (d[l++] = n[C]);
							else d[l++] = n
					}
					this.dataMin = A(d);
					this.dataMax = F(d);
					g(this, "afterGetExtremes")
				},
				getFirstValidPoint: function (a) {
					for (var b = null, c = a.length, e = 0; null === b && e < c;) b = a[e], e++;
					return b
				},
				translate: function () {
					this.processedXData || this.processData();
					this.generatePoints();
					var a = this.options,
						b = a.stacking,
						c = this.xAxis,
						e = c.categories,
						d = this.enabledDataSorting,
						h = this.yAxis,
						f = this.points,
						m = f.length,
						k = !!this.modifyValue,
						q, z = this.pointPlacementToXValue(),
						n = y(z),
						C = a.threshold,
						u = a.startFromThreshold ? C : 0,
						A, H = this.zoneAxis || "y",
						F = Number.MAX_VALUE;
					for (q = 0; q < m; q++) {
						var w = f[q],
							L = w.x;
						var T = w.y;
						var M = w.low,
							ba = b && h.stacks[(this.negStacks && T < (u ? 0 : C) ? "-" : "") + this.stackKey];
						h.positiveValuesOnly && null !== T && 0 >= T && (w.isNull = !0);
						w.plotX = A = x(D(c.translate(L, 0, 0, 0, 1, z, "flags" === this.type), -1E5, 1E5));
						if (b && this.visible && ba && ba[L]) {
							var R = this.getStackIndicator(R, L, this.index);
							if (!w.isNull) {
								var aa = ba[L];
								var ca = aa.points[R.key]
							}
						}
						t(ca) && (M = ca[0], T = ca[1], M === u && R.key === ba[L].base && (M = E(y(C) && C, h.min)), h.positiveValuesOnly && 0 >= M && (M = null), w.total = w.stackTotal = aa.total, w.percentage = aa.total && w.y / aa.total * 100, w.stackY = T, this.irregularWidths || aa.setOffset(this.pointXOffset || 0, this.barW || 0));
						w.yBottom = p(M) ? D(h.translate(M, 0, 1, 0, 1), -1E5, 1E5) : null;
						k && (T = this.modifyValue(T, w));
						w.plotY = T = "number" === typeof T && Infinity !== T ? D(h.translate(T, 0, 1, 0, 1), -1E5, 1E5) : void 0;
						w.isInside = "undefined" !== typeof T && 0 <= T && T <= h.len &&
							0 <= A && A <= c.len;
						w.clientX = n ? x(c.translate(L, 0, 0, 0, 1, z)) : A;
						w.negative = w[H] < (a[H + "Threshold"] || C || 0);
						w.category = e && "undefined" !== typeof e[w.x] ? e[w.x] : w.x;
						if (!w.isNull && !1 !== w.visible) {
							"undefined" !== typeof da && (F = Math.min(F, Math.abs(A - da)));
							var da = A
						}
						w.zone = this.zones.length && w.getZone();
						!w.graphic && this.group && d && (w.isNew = !0)
					}
					this.closestPointRangePx = F;
					g(this, "afterTranslate")
				},
				getValidPoints: function (a, b, c) {
					var e = this.chart;
					return (a || this.points || []).filter(function (a) {
						return b && !e.isInsidePlot(a.plotX,
							a.plotY, e.inverted) ? !1 : !1 !== a.visible && (c || !a.isNull)
					})
				},
				getClipBox: function (a, b) {
					var c = this.options,
						e = this.chart,
						d = e.inverted,
						g = this.xAxis,
						l = g && this.yAxis;
					a && !1 === c.clip && l ? a = d ? {
						y: -e.chartWidth + l.len + l.pos,
						height: e.chartWidth,
						width: e.chartHeight,
						x: -e.chartHeight + g.len + g.pos
					} : {
						y: -l.pos,
						height: e.chartHeight,
						width: e.chartWidth,
						x: -g.pos
					} : (a = this.clipBox || e.clipBox, b && (a.width = e.plotSizeX, a.x = 0));
					return b ? {
						width: a.width,
						x: a.x
					} : a
				},
				setClip: function (a) {
					var b = this.chart,
						c = this.options,
						e = b.renderer,
						d = b.inverted,
						g = this.clipBox,
						l = this.getClipBox(a),
						h = this.sharedClipKey || ["_sharedClip", a && a.duration, a && a.easing, l.height, c.xAxis, c.yAxis].join(),
						f = b[h],
						m = b[h + "m"];
					f || (a && (l.width = 0, d && (l.x = b.plotSizeX + (!1 !== c.clip ? 0 : b.plotTop)), b[h + "m"] = m = e.clipRect(d ? b.plotSizeX + 99 : -99, d ? -b.plotLeft : -b.plotTop, 99, d ? b.chartWidth : b.chartHeight)), b[h] = f = e.clipRect(l), f.count = {
						length: 0
					});
					a && !f.count[this.index] && (f.count[this.index] = !0, f.count.length += 1);
					if (!1 !== c.clip || a) this.group.clip(a || g ? f : b.clipRect), this.markerGroup.clip(m),
						this.sharedClipKey = h;
					a || (f.count[this.index] && (delete f.count[this.index], --f.count.length), 0 === f.count.length && h && b[h] && (g || (b[h] = b[h].destroy()), b[h + "m"] && (b[h + "m"] = b[h + "m"].destroy())))
				},
				animate: function (a) {
					var b = this.chart,
						c = w(this.options.animation);
					if (a) this.setClip(c);
					else {
						var e = this.sharedClipKey;
						a = b[e];
						var d = this.getClipBox(c, !0);
						a && a.animate(d, c);
						b[e + "m"] && b[e + "m"].animate({
							width: d.width + 99,
							x: d.x - (b.inverted ? 0 : 99)
						}, c);
						this.animate = null
					}
				},
				afterAnimate: function () {
					this.setClip();
					g(this, "afterAnimate");
					this.finishedAnimating = !0
				},
				drawPoints: function () {
					var a = this.points,
						b = this.chart,
						c, e, d = this.options.marker,
						g = this[this.specialGroup] || this.markerGroup,
						h = this.xAxis,
						f = E(d.enabled, !h || h.isRadial ? !0 : null, this.closestPointRangePx >= d.enabledThreshold * d.radius);
					if (!1 !== d.enabled || this._hasPointMarkers)
						for (c = 0; c < a.length; c++) {
							var m = a[c];
							var k = (e = m.graphic) ? "animate" : "attr";
							var q = m.marker || {};
							var z = !!m.marker;
							if ((f && "undefined" === typeof q.enabled || q.enabled) && !m.isNull && !1 !== m.visible) {
								var t = E(q.symbol, this.symbol);
								var n = this.markerAttribs(m, m.selected && "select");
								this.enabledDataSorting && (m.startXPos = h.reversed ? -n.width : h.width);
								var C = !1 !== m.isInside;
								e ? e[C ? "show" : "hide"](C).animate(n) : C && (0 < n.width || m.hasImage) && (m.graphic = e = b.renderer.symbol(t, n.x, n.y, n.width, n.height, z ? q : d).add(g), this.enabledDataSorting && b.hasRendered && (e.attr({
									x: m.startXPos
								}), k = "animate"));
								e && "animate" === k && e[C ? "show" : "hide"](C).animate(n);
								if (e && !b.styledMode) e[k](this.pointAttribs(m, m.selected && "select"));
								e && e.addClass(m.getClassName(),
									!0)
							} else e && (m.graphic = e.destroy())
						}
				},
				markerAttribs: function (a, b) {
					var c = this.options.marker,
						e = a.marker || {},
						d = e.symbol || c.symbol,
						g = E(e.radius, c.radius);
					b && (c = c.states[b], b = e.states && e.states[b], g = E(b && b.radius, c && c.radius, g + (c && c.radiusPlus || 0)));
					a.hasImage = d && 0 === d.indexOf("url");
					a.hasImage && (g = 0);
					a = {
						x: Math.floor(a.plotX) - g,
						y: a.plotY - g
					};
					g && (a.width = a.height = 2 * g);
					return a
				},
				pointAttribs: function (a, b) {
					var c = this.options.marker,
						e = a && a.options,
						d = e && e.marker || {},
						g = this.color,
						l = e && e.color,
						h = a && a.color;
					e =
						E(d.lineWidth, c.lineWidth);
					var f = a && a.zone && a.zone.color;
					a = 1;
					g = l || f || h || g;
					l = d.fillColor || c.fillColor || g;
					g = d.lineColor || c.lineColor || g;
					b = b || "normal";
					c = c.states[b];
					b = d.states && d.states[b] || {};
					e = E(b.lineWidth, c.lineWidth, e + E(b.lineWidthPlus, c.lineWidthPlus, 0));
					l = b.fillColor || c.fillColor || l;
					g = b.lineColor || c.lineColor || g;
					a = E(b.opacity, c.opacity, a);
					return {
						stroke: g,
						"stroke-width": e,
						fill: l,
						opacity: a
					}
				},
				destroy: function (a) {
					var b = this,
						c = b.chart,
						e = /AppleWebKit\/533/.test(z.navigator.userAgent),
						l, h, f = b.data || [],
						m, k;
					g(b, "destroy");
					this.removeEvents(a);
					(b.axisTypes || []).forEach(function (a) {
						(k = b[a]) && k.series && (H(k.series, b), k.isDirty = k.forceRedraw = !0)
					});
					b.legendItem && b.chart.legend.destroyItem(b);
					for (h = f.length; h--;)(m = f[h]) && m.destroy && m.destroy();
					b.points = null;
					d.clearTimeout(b.animationTimeout);
					n(b, function (a, b) {
						a instanceof C && !a.survive && (l = e && "group" === b ? "hide" : "destroy", a[l]())
					});
					c.hoverSeries === b && (c.hoverSeries = null);
					H(c.series, b);
					c.orderSeries();
					n(b, function (c, e) {
						a && "hcEvents" === e || delete b[e]
					})
				},
				getGraphPath: function (a, b, c) {
					var e = this,
						d = e.options,
						g = d.step,
						h, l = [],
						f = [],
						m;
					a = a || e.points;
					(h = a.reversed) && a.reverse();
					(g = {
						right: 1,
						center: 2
					} [g] || g && 3) && h && (g = 4 - g);
					a = this.getValidPoints(a, !1, !(d.connectNulls && !b && !c));
					a.forEach(function (h, k) {
						var q = h.plotX,
							v = h.plotY,
							r = a[k - 1];
						(h.leftCliff || r && r.rightCliff) && !c && (m = !0);
						h.isNull && !p(b) && 0 < k ? m = !d.connectNulls : h.isNull && !b ? m = !0 : (0 === k || m ? k = ["M", h.plotX, h.plotY] : e.getPointSpline ? k = e.getPointSpline(a, h, k) : g ? (k = 1 === g ? ["L", r.plotX, v] : 2 === g ? ["L", (r.plotX + q) / 2,
							r.plotY, "L", (r.plotX + q) / 2, v
						] : ["L", q, r.plotY], k.push("L", q, v)) : k = ["L", q, v], f.push(h.x), g && (f.push(h.x), 2 === g && f.push(h.x)), l.push.apply(l, k), m = !1)
					});
					l.xMap = f;
					return e.graphPath = l
				},
				drawGraph: function () {
					var a = this,
						b = this.options,
						c = (this.gappedPath || this.getGraphPath).call(this),
						e = this.chart.styledMode,
						d = [
							["graph", "highcharts-graph"]
						];
					e || d[0].push(b.lineColor || this.color || "#cccccc", b.dashStyle);
					d = a.getZonesGraphs(d);
					d.forEach(function (d, g) {
						var h = d[0],
							l = a[h],
							f = l ? "animate" : "attr";
						l ? (l.endX = a.preventGraphAnimation ?
							null : c.xMap, l.animate({
								d: c
							})) : c.length && (a[h] = l = a.chart.renderer.path(c).addClass(d[1]).attr({
							zIndex: 1
						}).add(a.group));
						l && !e && (h = {
							stroke: d[2],
							"stroke-width": b.lineWidth,
							fill: a.fillGraph && a.color || "none"
						}, d[3] ? h.dashstyle = d[3] : "square" !== b.linecap && (h["stroke-linecap"] = h["stroke-linejoin"] = "round"), l[f](h).shadow(2 > g && b.shadow));
						l && (l.startX = c.xMap, l.isArea = c.isArea)
					})
				},
				getZonesGraphs: function (a) {
					this.zones.forEach(function (b, c) {
						c = ["zone-graph-" + c, "highcharts-graph highcharts-zone-graph-" + c + " " + (b.className ||
							"")];
						this.chart.styledMode || c.push(b.color || this.color, b.dashStyle || this.options.dashStyle);
						a.push(c)
					}, this);
					return a
				},
				applyZones: function () {
					var a = this,
						b = this.chart,
						c = b.renderer,
						e = this.zones,
						d, g, h = this.clips || [],
						f, m = this.graph,
						k = this.area,
						q = Math.max(b.chartWidth, b.chartHeight),
						z = this[(this.zoneAxis || "y") + "Axis"],
						n = b.inverted,
						t, C, y, p = !1;
					if (e.length && (m || k) && z && "undefined" !== typeof z.min) {
						var u = z.reversed;
						var x = z.horiz;
						m && !this.showLine && m.hide();
						k && k.hide();
						var A = z.getExtremes();
						e.forEach(function (e,
							l) {
							d = u ? x ? b.plotWidth : 0 : x ? 0 : z.toPixels(A.min) || 0;
							d = D(E(g, d), 0, q);
							g = D(Math.round(z.toPixels(E(e.value, A.max), !0) || 0), 0, q);
							p && (d = g = z.toPixels(A.max));
							t = Math.abs(d - g);
							C = Math.min(d, g);
							y = Math.max(d, g);
							z.isXAxis ? (f = {
								x: n ? y : C,
								y: 0,
								width: t,
								height: q
							}, x || (f.x = b.plotHeight - f.x)) : (f = {
								x: 0,
								y: n ? y : C,
								width: q,
								height: t
							}, x && (f.y = b.plotWidth - f.y));
							n && c.isVML && (f = z.isXAxis ? {
								x: 0,
								y: u ? C : y,
								height: f.width,
								width: b.chartWidth
							} : {
								x: f.y - b.plotLeft - b.spacingBox.x,
								y: 0,
								width: f.height,
								height: b.chartHeight
							});
							h[l] ? h[l].animate(f) : h[l] = c.clipRect(f);
							m && a["zone-graph-" + l].clip(h[l]);
							k && a["zone-area-" + l].clip(h[l]);
							p = e.value > A.max;
							a.resetZones && 0 === g && (g = void 0)
						});
						this.clips = h
					} else a.visible && (m && m.show(!0), k && k.show(!0))
				},
				invertGroups: function (a) {
					function b() {
						["group", "markerGroup"].forEach(function (b) {
							e[b] && (d.renderer.isVML && e[b].attr({
								width: e.yAxis.len,
								height: e.xAxis.len
							}), e[b].width = e.yAxis.len, e[b].height = e.xAxis.len, e[b].invert(e.isRadialSeries ? !1 : a))
						})
					}
					var e = this,
						d = e.chart;
					e.xAxis && (e.eventsToUnbind.push(c(d, "resize", b)), b(), e.invertGroups =
						b)
				},
				plotGroup: function (a, b, c, e, d) {
					var g = this[a],
						h = !g;
					h && (this[a] = g = this.chart.renderer.g().attr({
						zIndex: e || .1
					}).add(d));
					g.addClass("highcharts-" + b + " highcharts-series-" + this.index + " highcharts-" + this.type + "-series " + (p(this.colorIndex) ? "highcharts-color-" + this.colorIndex + " " : "") + (this.options.className || "") + (g.hasClass("highcharts-tracker") ? " highcharts-tracker" : ""), !0);
					g.attr({
						visibility: c
					})[h ? "attr" : "animate"](this.getPlotBox());
					return g
				},
				getPlotBox: function () {
					var a = this.chart,
						b = this.xAxis,
						c = this.yAxis;
					a.inverted && (b = c, c = this.xAxis);
					return {
						translateX: b ? b.left : a.plotLeft,
						translateY: c ? c.top : a.plotTop,
						scaleX: 1,
						scaleY: 1
					}
				},
				removeEvents: function (a) {
					a ? this.eventsToUnbind.length && (this.eventsToUnbind.forEach(function (a) {
						a()
					}), this.eventsToUnbind.length = 0) : m(this)
				},
				render: function () {
					var a = this,
						b = a.chart,
						c = a.options,
						d = !!a.animate && b.renderer.isSVG && w(c.animation).duration,
						h = a.visible ? "inherit" : "hidden",
						f = c.zIndex,
						m = a.hasRendered,
						k = b.seriesGroup,
						q = b.inverted;
					g(this, "render");
					var z = a.plotGroup("group", "series",
						h, f, k);
					a.markerGroup = a.plotGroup("markerGroup", "markers", h, f, k);
					d && a.animate(!0);
					z.inverted = a.isCartesian || a.invertable ? q : !1;
					a.drawGraph && (a.drawGraph(), a.applyZones());
					a.visible && a.drawPoints();
					a.drawDataLabels && a.drawDataLabels();
					a.redrawPoints && a.redrawPoints();
					a.drawTracker && !1 !== a.options.enableMouseTracking && a.drawTracker();
					a.invertGroups(q);
					!1 === c.clip || a.sharedClipKey || m || z.clip(b.clipRect);
					d && a.animate();
					m || (a.animationTimeout = e(function () {
						a.afterAnimate()
					}, d || 0));
					a.isDirty = !1;
					a.hasRendered = !0;
					g(a, "afterRender")
				},
				redraw: function () {
					var a = this.chart,
						b = this.isDirty || this.isDirtyData,
						c = this.group,
						e = this.xAxis,
						d = this.yAxis;
					c && (a.inverted && c.attr({
						width: a.plotWidth,
						height: a.plotHeight
					}), c.animate({
						translateX: E(e && e.left, a.plotLeft),
						translateY: E(d && d.top, a.plotTop)
					}));
					this.translate();
					this.render();
					b && delete this.kdTree
				},
				kdAxisArray: ["clientX", "plotY"],
				searchPoint: function (a, b) {
					var c = this.xAxis,
						e = this.yAxis,
						d = this.chart.inverted;
					return this.searchKDTree({
						clientX: d ? c.len - a.chartY + c.pos : a.chartX -
							c.pos,
						plotY: d ? e.len - a.chartX + e.pos : a.chartY - e.pos
					}, b, a)
				},
				buildKDTree: function (a) {
					function b(a, e, d) {
						var g;
						if (g = a && a.length) {
							var h = c.kdAxisArray[e % d];
							a.sort(function (a, b) {
								return a[h] - b[h]
							});
							g = Math.floor(g / 2);
							return {
								point: a[g],
								left: b(a.slice(0, g), e + 1, d),
								right: b(a.slice(g + 1), e + 1, d)
							}
						}
					}
					this.buildingKdTree = !0;
					var c = this,
						d = -1 < c.options.findNearestPointBy.indexOf("y") ? 2 : 1;
					delete c.kdTree;
					e(function () {
							c.kdTree = b(c.getValidPoints(null, !c.directTouch), d, d);
							c.buildingKdTree = !1
						}, c.options.kdNow || a && "touchstart" ===
						a.type ? 0 : 1)
				},
				searchKDTree: function (a, b, c) {
					function e(a, b, c, l) {
						var m = b.point,
							k = d.kdAxisArray[c % l],
							q = m;
						var z = p(a[g]) && p(m[g]) ? Math.pow(a[g] - m[g], 2) : null;
						var r = p(a[h]) && p(m[h]) ? Math.pow(a[h] - m[h], 2) : null;
						r = (z || 0) + (r || 0);
						m.dist = p(r) ? Math.sqrt(r) : Number.MAX_VALUE;
						m.distX = p(z) ? Math.sqrt(z) : Number.MAX_VALUE;
						k = a[k] - m[k];
						r = 0 > k ? "left" : "right";
						z = 0 > k ? "right" : "left";
						b[r] && (r = e(a, b[r], c + 1, l), q = r[f] < q[f] ? r : m);
						b[z] && Math.sqrt(k * k) < q[f] && (a = e(a, b[z], c + 1, l), q = a[f] < q[f] ? a : q);
						return q
					}
					var d = this,
						g = this.kdAxisArray[0],
						h = this.kdAxisArray[1],
						f = b ? "distX" : "dist";
					b = -1 < d.options.findNearestPointBy.indexOf("y") ? 2 : 1;
					this.kdTree || this.buildingKdTree || this.buildKDTree(c);
					if (this.kdTree) return e(a, this.kdTree, b, b)
				},
				pointPlacementToXValue: function () {
					var a = this.xAxis,
						b = this.options.pointPlacement;
					"between" === b && (b = a.reversed ? -.5 : .5);
					y(b) && (b *= E(this.options.pointRange || a.pointRange));
					return b
				}
			});
			""
		});
	M(w, "parts/Stacking.js", [w["parts/Globals.js"], w["parts/Utilities.js"]], function (d, f) {
		var w = f.correctFloat,
			F = f.defined,
			A = f.destroyObjectProperties,
			D = f.objectEach,
			x = f.pick;
		f = d.Axis;
		var p = d.Chart,
			H = d.format,
			u = d.Series;
		d.StackItem = function (d, f, k, n, p) {
			var h = d.chart.inverted;
			this.axis = d;
			this.isNegative = k;
			this.options = f = f || {};
			this.x = n;
			this.total = null;
			this.points = {};
			this.stack = p;
			this.rightCliff = this.leftCliff = 0;
			this.alignOptions = {
				align: f.align || (h ? k ? "left" : "right" : "center"),
				verticalAlign: f.verticalAlign || (h ? "middle" : k ? "bottom" : "top"),
				y: f.y,
				x: f.x
			};
			this.textAlign = f.textAlign || (h ? k ? "right" : "left" : "center")
		};
		d.StackItem.prototype = {
			destroy: function () {
				A(this,
					this.axis)
			},
			render: function (d) {
				var f = this.axis.chart,
					k = this.options,
					n = k.format;
				n = n ? H(n, this, f) : k.formatter.call(this);
				this.label ? this.label.attr({
					text: n,
					visibility: "hidden"
				}) : (this.label = f.renderer.label(n, null, null, k.shape, null, null, k.useHTML, !1, "stack-labels"), n = {
					text: n,
					align: this.textAlign,
					rotation: k.rotation,
					padding: x(k.padding, 0),
					visibility: "hidden"
				}, this.label.attr(n), f.styledMode || this.label.css(k.style), this.label.added || this.label.add(d));
				this.label.labelrank = f.plotHeight
			},
			setOffset: function (d,
				f, k, n, p) {
				var h = this.axis,
					e = h.chart;
				n = h.translate(h.usePercentage ? 100 : n ? n : this.total, 0, 0, 0, 1);
				k = h.translate(k ? k : 0);
				k = F(n) && Math.abs(n - k);
				d = x(p, e.xAxis[0].translate(this.x)) + d;
				h = F(n) && this.getStackBox(e, this, d, n, f, k, h);
				f = this.label;
				d = this.isNegative;
				p = "justify" === x(this.options.overflow, "justify");
				if (f && h) {
					k = f.getBBox();
					var c = e.inverted ? d ? k.width : 0 : k.width / 2,
						a = e.inverted ? k.height / 2 : d ? -4 : k.height + 4;
					this.alignOptions.x = x(this.options.x, 0);
					f.align(this.alignOptions, null, h);
					n = f.alignAttr;
					f.show();
					n.y -=
						a;
					p && (n.x -= c, u.prototype.justifyDataLabel.call(this.axis, f, this.alignOptions, n, k, h), n.x += c);
					n.x = f.alignAttr.x;
					f.attr({
						x: n.x,
						y: n.y
					});
					x(!p && this.options.crop, !0) && ((e = e.isInsidePlot(f.x + (e.inverted ? 0 : -k.width / 2), f.y) && e.isInsidePlot(f.x + (e.inverted ? d ? -k.width : k.width : k.width / 2), f.y + k.height)) || f.hide())
				}
			},
			getStackBox: function (d, f, k, n, p, h, e) {
				var c = f.axis.reversed,
					a = d.inverted;
				d = e.height + e.pos - (a ? d.plotLeft : d.plotTop);
				f = f.isNegative && !c || !f.isNegative && c;
				return {
					x: a ? f ? n : n - h : k,
					y: a ? d - k - p : f ? d - n - h : d - n,
					width: a ?
						h : p,
					height: a ? p : h
				}
			}
		};
		p.prototype.getStacks = function () {
			var d = this,
				f = d.inverted;
			d.yAxis.forEach(function (d) {
				d.stacks && d.hasVisibleSeries && (d.oldStacks = d.stacks)
			});
			d.series.forEach(function (k) {
				var n = k.xAxis && k.xAxis.options || {};
				!k.options.stacking || !0 !== k.visible && !1 !== d.options.chart.ignoreHiddenSeries || (k.stackKey = [k.type, x(k.options.stack, ""), f ? n.top : n.left, f ? n.height : n.width].join())
			})
		};
		f.prototype.buildStacks = function () {
			var f = this.series,
				p = x(this.options.reversedStacks, !0),
				k = f.length,
				n;
			if (!this.isXAxis) {
				this.usePercentage = !1;
				for (n = k; n--;) {
					var u = f[p ? n : k - n - 1];
					u.setStackedPoints()
				}
				for (n = 0; n < k; n++) f[n].modifyStacks();
				d.fireEvent(this, "afterBuildStacks")
			}
		};
		f.prototype.renderStackTotals = function () {
			var d = this.chart,
				f = d.renderer,
				k = this.stacks,
				n = this.stackTotalGroup;
			n || (this.stackTotalGroup = n = f.g("stack-labels").attr({
				visibility: "visible",
				zIndex: 6
			}).add());
			n.translate(d.plotLeft, d.plotTop);
			D(k, function (d) {
				D(d, function (d) {
					d.render(n)
				})
			})
		};
		f.prototype.resetStacks = function () {
			var d = this,
				f = d.stacks;
			d.isXAxis || D(f, function (f) {
				D(f,
					function (k, t) {
						k.touched < d.stacksTouched ? (k.destroy(), delete f[t]) : (k.total = null, k.cumulative = null)
					})
			})
		};
		f.prototype.cleanStacks = function () {
			if (!this.isXAxis) {
				if (this.oldStacks) var d = this.stacks = this.oldStacks;
				D(d, function (d) {
					D(d, function (d) {
						d.cumulative = d.total
					})
				})
			}
		};
		u.prototype.setStackedPoints = function () {
			if (this.options.stacking && (!0 === this.visible || !1 === this.chart.options.chart.ignoreHiddenSeries)) {
				var f = this.processedXData,
					p = this.processedYData,
					k = [],
					n = p.length,
					u = this.options,
					h = u.threshold,
					e = x(u.startFromThreshold &&
						h, 0),
					c = u.stack;
				u = u.stacking;
				var a = this.stackKey,
					b = "-" + a,
					g = this.negStacks,
					q = this.yAxis,
					m = q.stacks,
					C = q.oldStacks,
					z, l;
				q.stacksTouched += 1;
				for (l = 0; l < n; l++) {
					var v = f[l];
					var B = p[l];
					var I = this.getStackIndicator(I, v, this.index);
					var A = I.key;
					var r = (z = g && B < (e ? 0 : h)) ? b : a;
					m[r] || (m[r] = {});
					m[r][v] || (C[r] && C[r][v] ? (m[r][v] = C[r][v], m[r][v].total = null) : m[r][v] = new d.StackItem(q, q.options.stackLabels, z, v, c));
					r = m[r][v];
					null !== B ? (r.points[A] = r.points[this.index] = [x(r.cumulative, e)], F(r.cumulative) || (r.base = A), r.touched =
						q.stacksTouched, 0 < I.index && !1 === this.singleStacks && (r.points[A][0] = r.points[this.index + "," + v + ",0"][0])) : r.points[A] = r.points[this.index] = null;
					"percent" === u ? (z = z ? a : b, g && m[z] && m[z][v] ? (z = m[z][v], r.total = z.total = Math.max(z.total, r.total) + Math.abs(B) || 0) : r.total = w(r.total + (Math.abs(B) || 0))) : r.total = w(r.total + (B || 0));
					r.cumulative = x(r.cumulative, e) + (B || 0);
					null !== B && (r.points[A].push(r.cumulative), k[l] = r.cumulative)
				}
				"percent" === u && (q.usePercentage = !0);
				this.stackedYData = k;
				q.oldStacks = {}
			}
		};
		u.prototype.modifyStacks =
			function () {
				var d = this,
					f = d.stackKey,
					k = d.yAxis.stacks,
					n = d.processedXData,
					p, h = d.options.stacking;
				d[h + "Stacker"] && [f, "-" + f].forEach(function (e) {
					for (var c = n.length, a, b; c--;)
						if (a = n[c], p = d.getStackIndicator(p, a, d.index, e), b = (a = k[e] && k[e][a]) && a.points[p.key]) d[h + "Stacker"](b, a, c)
				})
			};
		u.prototype.percentStacker = function (d, f, k) {
			f = f.total ? 100 / f.total : 0;
			d[0] = w(d[0] * f);
			d[1] = w(d[1] * f);
			this.stackedYData[k] = d[1]
		};
		u.prototype.getStackIndicator = function (d, f, k, n) {
			!F(d) || d.x !== f || n && d.key !== n ? d = {
				x: f,
				index: 0,
				key: n
			} : d.index++;
			d.key = [k, f, d.index].join();
			return d
		}
	});
	M(w, "parts/Dynamics.js", [w["parts/Globals.js"], w["parts/Utilities.js"]], function (d, f) {
		var w = f.defined,
			F = f.erase,
			A = f.extend,
			D = f.isArray,
			x = f.isNumber,
			p = f.isObject,
			H = f.isString,
			u = f.objectEach,
			t = f.pick,
			y = f.relativeLength,
			k = f.setAnimation,
			n = f.splat,
			E = d.addEvent,
			h = d.animate,
			e = d.Axis;
		f = d.Chart;
		var c = d.createElement,
			a = d.css,
			b = d.fireEvent,
			g = d.merge,
			q = d.Point,
			m = d.Series,
			C = d.seriesTypes;
		d.cleanRecursively = function (a, b) {
			var c = {};
			u(a, function (e, g) {
				if (p(a[g], !0) && !a.nodeType &&
					b[g]) e = d.cleanRecursively(a[g], b[g]), Object.keys(e).length && (c[g] = e);
				else if (p(a[g]) || a[g] !== b[g]) c[g] = a[g]
			});
			return c
		};
		A(f.prototype, {
			addSeries: function (a, c, e) {
				var d, g = this;
				a && (c = t(c, !0), b(g, "addSeries", {
					options: a
				}, function () {
					d = g.initSeries(a);
					g.isDirtyLegend = !0;
					g.linkSeries();
					d.enabledDataSorting && d.setData(a.data, !1);
					b(g, "afterAddSeries", {
						series: d
					});
					c && g.redraw(e)
				}));
				return d
			},
			addAxis: function (a, b, c, e) {
				return this.createAxis(b ? "xAxis" : "yAxis", {
					axis: a,
					redraw: c,
					animation: e
				})
			},
			addColorAxis: function (a,
				b, c) {
				return this.createAxis("colorAxis", {
					axis: a,
					redraw: b,
					animation: c
				})
			},
			createAxis: function (a, b) {
				var c = this.options,
					f = "colorAxis" === a,
					h = b.redraw,
					l = b.animation;
				b = g(b.axis, {
					index: this[a].length,
					isX: "xAxis" === a
				});
				var m = f ? new d.ColorAxis(this, b) : new e(this, b);
				c[a] = n(c[a] || {});
				c[a].push(b);
				f && (this.isDirtyLegend = !0, this.axes.forEach(function (a) {
					a.series = []
				}), this.series.forEach(function (a) {
					a.bindAxes();
					a.isDirtyData = !0
				}));
				t(h, !0) && this.redraw(l);
				return m
			},
			showLoading: function (b) {
				var e = this,
					d = e.options,
					g = e.loadingDiv,
					f = d.loading,
					m = function () {
						g && a(g, {
							left: e.plotLeft + "px",
							top: e.plotTop + "px",
							width: e.plotWidth + "px",
							height: e.plotHeight + "px"
						})
					};
				g || (e.loadingDiv = g = c("div", {
					className: "highcharts-loading highcharts-loading-hidden"
				}, null, e.container), e.loadingSpan = c("span", {
					className: "highcharts-loading-inner"
				}, null, g), E(e, "redraw", m));
				g.className = "highcharts-loading";
				e.loadingSpan.innerHTML = t(b, d.lang.loading, "");
				e.styledMode || (a(g, A(f.style, {
					zIndex: 10
				})), a(e.loadingSpan, f.labelStyle), e.loadingShown || (a(g, {
					opacity: 0,
					display: ""
				}), h(g, {
					opacity: f.style.opacity || .5
				}, {
					duration: f.showDuration || 0
				})));
				e.loadingShown = !0;
				m()
			},
			hideLoading: function () {
				var b = this.options,
					c = this.loadingDiv;
				c && (c.className = "highcharts-loading highcharts-loading-hidden", this.styledMode || h(c, {
					opacity: 0
				}, {
					duration: b.loading.hideDuration || 100,
					complete: function () {
						a(c, {
							display: "none"
						})
					}
				}));
				this.loadingShown = !1
			},
			propsRequireDirtyBox: "backgroundColor borderColor borderWidth borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
			propsRequireReflow: "margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft".split(" "),
			propsRequireUpdateSeries: "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip".split(" "),
			collectionsWithUpdate: ["xAxis", "yAxis", "zAxis", "series"],
			update: function (a, c, e, f) {
				var h = this,
					l = {
						credits: "addCredits",
						title: "setTitle",
						subtitle: "setSubtitle",
						caption: "setCaption"
					},
					m, k, q, z = a.isResponsiveOptions,
					v = [];
				b(h, "update", {
					options: a
				});
				z || h.setResponsive(!1, !0);
				a = d.cleanRecursively(a, h.options);
				g(!0, h.userOptions, a);
				if (m = a.chart) {
					g(!0, h.options.chart, m);
					"className" in m && h.setClassName(m.className);
					"reflow" in m && h.setReflow(m.reflow);
					if ("inverted" in m || "polar" in m || "type" in m) {
						h.propFromSeries();
						var C = !0
					}
					"alignTicks" in m && (C = !0);
					u(m, function (a, b) {
						-1 !== h.propsRequireUpdateSeries.indexOf("chart." + b) && (k = !0); - 1 !== h.propsRequireDirtyBox.indexOf(b) && (h.isDirtyBox = !0);
						z || -1 === h.propsRequireReflow.indexOf(b) || (q = !0)
					});
					!h.styledMode &&
						"style" in m && h.renderer.setStyle(m.style)
				}!h.styledMode && a.colors && (this.options.colors = a.colors);
				a.plotOptions && g(!0, this.options.plotOptions, a.plotOptions);
				a.time && this.time === d.time && (this.time = new d.Time(a.time));
				u(a, function (a, b) {
					if (h[b] && "function" === typeof h[b].update) h[b].update(a, !1);
					else if ("function" === typeof h[l[b]]) h[l[b]](a);
					"chart" !== b && -1 !== h.propsRequireUpdateSeries.indexOf(b) && (k = !0)
				});
				this.collectionsWithUpdate.forEach(function (b) {
					if (a[b]) {
						if ("series" === b) {
							var c = [];
							h[b].forEach(function (a,
								b) {
								a.options.isInternal || c.push(t(a.options.index, b))
							})
						}
						n(a[b]).forEach(function (a, d) {
							(d = w(a.id) && h.get(a.id) || h[b][c ? c[d] : d]) && d.coll === b && (d.update(a, !1), e && (d.touched = !0));
							!d && e && h.collectionsWithInit[b] && (h.collectionsWithInit[b][0].apply(h, [a].concat(h.collectionsWithInit[b][1] || []).concat([!1])).touched = !0)
						});
						e && h[b].forEach(function (a) {
							a.touched || a.options.isInternal ? delete a.touched : v.push(a)
						})
					}
				});
				v.forEach(function (a) {
					a.remove && a.remove(!1)
				});
				C && h.axes.forEach(function (a) {
					a.update({}, !1)
				});
				k && h.getSeriesOrderByLinks().forEach(function (a) {
					a.chart && a.update({}, !1)
				}, this);
				a.loading && g(!0, h.options.loading, a.loading);
				C = m && m.width;
				m = m && m.height;
				H(m) && (m = y(m, C || h.chartWidth));
				q || x(C) && C !== h.chartWidth || x(m) && m !== h.chartHeight ? h.setSize(C, m, f) : t(c, !0) && h.redraw(f);
				b(h, "afterUpdate", {
					options: a,
					redraw: c,
					animation: f
				})
			},
			setSubtitle: function (a, b) {
				this.applyDescription("subtitle", a);
				this.layOutTitles(b)
			},
			setCaption: function (a, b) {
				this.applyDescription("caption", a);
				this.layOutTitles(b)
			}
		});
		f.prototype.collectionsWithInit = {
			xAxis: [f.prototype.addAxis, [!0]],
			yAxis: [f.prototype.addAxis, [!1]],
			series: [f.prototype.addSeries]
		};
		A(q.prototype, {
			update: function (a, b, c, e) {
				function d() {
					g.applyOptions(a);
					null === g.y && h && (g.graphic = h.destroy());
					p(a, !0) && (h && h.element && a && a.marker && "undefined" !== typeof a.marker.symbol && (g.graphic = h.destroy()), a && a.dataLabels && g.dataLabel && (g.dataLabel = g.dataLabel.destroy()), g.connector && (g.connector = g.connector.destroy()));
					l = g.index;
					f.updateParallelArrays(g, l);
					k.data[l] = p(k.data[l], !0) || p(a, !0) ? g.options :
						t(a, k.data[l]);
					f.isDirty = f.isDirtyData = !0;
					!f.fixedBox && f.hasCartesianSeries && (m.isDirtyBox = !0);
					"point" === k.legendType && (m.isDirtyLegend = !0);
					b && m.redraw(c)
				}
				var g = this,
					f = g.series,
					h = g.graphic,
					l, m = f.chart,
					k = f.options;
				b = t(b, !0);
				!1 === e ? d() : g.firePointEvent("update", {
					options: a
				}, d)
			},
			remove: function (a, b) {
				this.series.removePoint(this.series.data.indexOf(this), a, b)
			}
		});
		A(m.prototype, {
			addPoint: function (a, c, e, d, g) {
				var f = this.options,
					h = this.data,
					l = this.chart,
					m = this.xAxis;
				m = m && m.hasNames && m.names;
				var k = f.data,
					q =
					this.xData,
					v;
				c = t(c, !0);
				var z = {
					series: this
				};
				this.pointClass.prototype.applyOptions.apply(z, [a]);
				var n = z.x;
				var C = q.length;
				if (this.requireSorting && n < q[C - 1])
					for (v = !0; C && q[C - 1] > n;) C--;
				this.updateParallelArrays(z, "splice", C, 0, 0);
				this.updateParallelArrays(z, C);
				m && z.name && (m[n] = z.name);
				k.splice(C, 0, a);
				v && (this.data.splice(C, 0, null), this.processData());
				"point" === f.legendType && this.generatePoints();
				e && (h[0] && h[0].remove ? h[0].remove(!1) : (h.shift(), this.updateParallelArrays(z, "shift"), k.shift()));
				!1 !== g && b(this,
					"addPoint", {
						point: z
					});
				this.isDirtyData = this.isDirty = !0;
				c && l.redraw(d)
			},
			removePoint: function (a, b, c) {
				var e = this,
					d = e.data,
					g = d[a],
					f = e.points,
					h = e.chart,
					l = function () {
						f && f.length === d.length && f.splice(a, 1);
						d.splice(a, 1);
						e.options.data.splice(a, 1);
						e.updateParallelArrays(g || {
							series: e
						}, "splice", a, 1);
						g && g.destroy();
						e.isDirty = !0;
						e.isDirtyData = !0;
						b && h.redraw()
					};
				k(c, h);
				b = t(b, !0);
				g ? g.firePointEvent("remove", null, l) : l()
			},
			remove: function (a, c, e, d) {
				function g() {
					f.destroy(d);
					f.remove = null;
					h.isDirtyLegend = h.isDirtyBox = !0;
					h.linkSeries();
					t(a, !0) && h.redraw(c)
				}
				var f = this,
					h = f.chart;
				!1 !== e ? b(f, "remove", null, g) : g()
			},
			update: function (a, c) {
				a = d.cleanRecursively(a, this.userOptions);
				b(this, "update", {
					options: a
				});
				var e = this,
					f = e.chart,
					h = e.userOptions,
					l = e.initialType || e.type,
					m = a.type || h.type || f.options.chart.type,
					k = !(this.hasDerivedData || a.dataGrouping || m && m !== this.type || "undefined" !== typeof a.pointStart || a.pointInterval || a.pointIntervalUnit || a.keys),
					q = C[l].prototype,
					z, n = ["group", "markerGroup", "dataLabelsGroup", "transformGroup"],
					p = ["eventOptions", "navigatorSeries", "baseSeries"],
					y = e.finishedAnimating && {
						animation: !1
					},
					u = {};
				k && (p.push("data", "isDirtyData", "points", "processedXData", "processedYData", "xIncrement", "_hasPointMarkers", "_hasPointLabels", "mapMap", "mapData", "minY", "maxY", "minX", "maxX"), !1 !== a.visible && p.push("area", "graph"), e.parallelArrays.forEach(function (a) {
					p.push(a + "Data")
				}), a.data && (a.dataSorting && A(e.options.dataSorting, a.dataSorting), this.setData(a.data, !1)));
				a = g(h, y, {
					index: "undefined" === typeof h.index ? e.index : h.index,
					pointStart: t(h.pointStart, e.xData[0])
				}, !k && {
					data: e.options.data
				}, a);
				k && a.data && (a.data = e.options.data);
				p = n.concat(p);
				p.forEach(function (a) {
					p[a] = e[a];
					delete e[a]
				});
				e.remove(!1, null, !1, !0);
				for (z in q) e[z] = void 0;
				C[m || l] ? A(e, C[m || l].prototype) : d.error(17, !0, f, {
					missingModuleFor: m || l
				});
				p.forEach(function (a) {
					e[a] = p[a]
				});
				e.init(f, a);
				if (k && this.points) {
					var x = e.options;
					!1 === x.visible ? (u.graphic = 1, u.dataLabel = 1) : e._hasPointLabels || (m = x.marker, q = x.dataLabels, m && (!1 === m.enabled || "symbol" in m) && (u.graphic =
						1), q && !1 === q.enabled && (u.dataLabel = 1));
					this.points.forEach(function (a) {
						a && a.series && (a.resolveColor(), Object.keys(u).length && a.destroyElements(u), !1 === x.showInLegend && a.legendItem && f.legend.destroyItem(a))
					}, this)
				}
				a.zIndex !== h.zIndex && n.forEach(function (b) {
					e[b] && e[b].attr({
						zIndex: a.zIndex
					})
				});
				e.initialType = l;
				f.linkSeries();
				b(this, "afterUpdate");
				t(c, !0) && f.redraw(k ? void 0 : !1)
			},
			setName: function (a) {
				this.name = this.options.name = this.userOptions.name = a;
				this.chart.isDirtyLegend = !0
			}
		});
		A(e.prototype, {
			update: function (a,
				b) {
				var c = this.chart,
					e = a && a.events || {};
				a = g(this.userOptions, a);
				c.options[this.coll].indexOf && (c.options[this.coll][c.options[this.coll].indexOf(this.userOptions)] = a);
				u(c.options[this.coll].events, function (a, b) {
					"undefined" === typeof e[b] && (e[b] = void 0)
				});
				this.destroy(!0);
				this.init(c, A(a, {
					events: e
				}));
				c.isDirtyBox = !0;
				t(b, !0) && c.redraw()
			},
			remove: function (a) {
				for (var b = this.chart, c = this.coll, e = this.series, d = e.length; d--;) e[d] && e[d].remove(!1);
				F(b.axes, this);
				F(b[c], this);
				D(b.options[c]) ? b.options[c].splice(this.options.index,
					1) : delete b.options[c];
				b[c].forEach(function (a, b) {
					a.options.index = a.userOptions.index = b
				});
				this.destroy();
				b.isDirtyBox = !0;
				t(a, !0) && b.redraw()
			},
			setTitle: function (a, b) {
				this.update({
					title: a
				}, b)
			},
			setCategories: function (a, b) {
				this.update({
					categories: a
				}, b)
			}
		})
	});
	M(w, "parts/AreaSeries.js", [w["parts/Globals.js"], w["parts/Utilities.js"]], function (d, f) {
		var w = f.objectEach,
			F = f.pick,
			A = d.color,
			D = d.Series;
		f = d.seriesType;
		f("area", "line", {
			softThreshold: !1,
			threshold: 0
		}, {
			singleStacks: !1,
			getStackPoints: function (d) {
				var f = [],
					x = [],
					u = this.xAxis,
					t = this.yAxis,
					y = t.stacks[this.stackKey],
					k = {},
					n = this.index,
					A = t.series,
					h = A.length,
					e = F(t.options.reversedStacks, !0) ? 1 : -1,
					c;
				d = d || this.points;
				if (this.options.stacking) {
					for (c = 0; c < d.length; c++) d[c].leftNull = d[c].rightNull = void 0, k[d[c].x] = d[c];
					w(y, function (a, c) {
						null !== a.total && x.push(c)
					});
					x.sort(function (a, c) {
						return a - c
					});
					var a = A.map(function (a) {
						return a.visible
					});
					x.forEach(function (b, d) {
						var g = 0,
							m, C;
						if (k[b] && !k[b].isNull) f.push(k[b]), [-1, 1].forEach(function (g) {
							var f = 1 === g ? "rightNull" :
								"leftNull",
								q = 0,
								z = y[x[d + g]];
							if (z)
								for (c = n; 0 <= c && c < h;) m = z.points[c], m || (c === n ? k[b][f] = !0 : a[c] && (C = y[b].points[c]) && (q -= C[1] - C[0])), c += e;
							k[b][1 === g ? "rightCliff" : "leftCliff"] = q
						});
						else {
							for (c = n; 0 <= c && c < h;) {
								if (m = y[b].points[c]) {
									g = m[1];
									break
								}
								c += e
							}
							g = t.translate(g, 0, 1, 0, 1);
							f.push({
								isNull: !0,
								plotX: u.translate(b, 0, 0, 0, 1),
								x: b,
								plotY: g,
								yBottom: g
							})
						}
					})
				}
				return f
			},
			getGraphPath: function (d) {
				var f = D.prototype.getGraphPath,
					x = this.options,
					u = x.stacking,
					t = this.yAxis,
					y, k = [],
					n = [],
					A = this.index,
					h = t.stacks[this.stackKey],
					e = x.threshold,
					c = Math.round(t.getThreshold(x.threshold));
				x = F(x.connectNulls, "percent" === u);
				var a = function (a, b, f) {
					var m = d[a];
					a = u && h[m.x].points[A];
					var q = m[f + "Null"] || 0;
					f = m[f + "Cliff"] || 0;
					m = !0;
					if (f || q) {
						var z = (q ? a[0] : a[1]) + f;
						var C = a[0] + f;
						m = !!q
					} else !u && d[b] && d[b].isNull && (z = C = e);
					"undefined" !== typeof z && (n.push({
						plotX: g,
						plotY: null === z ? c : t.getThreshold(z),
						isNull: m,
						isCliff: !0
					}), k.push({
						plotX: g,
						plotY: null === C ? c : t.getThreshold(C),
						doCurve: !1
					}))
				};
				d = d || this.points;
				u && (d = this.getStackPoints(d));
				for (y = 0; y < d.length; y++) {
					u || (d[y].leftCliff =
						d[y].rightCliff = d[y].leftNull = d[y].rightNull = void 0);
					var b = d[y].isNull;
					var g = F(d[y].rectPlotX, d[y].plotX);
					var q = F(d[y].yBottom, c);
					if (!b || x) x || a(y, y - 1, "left"), b && !u && x || (n.push(d[y]), k.push({
						x: y,
						plotX: g,
						plotY: q
					})), x || a(y, y + 1, "right")
				}
				y = f.call(this, n, !0, !0);
				k.reversed = !0;
				b = f.call(this, k, !0, !0);
				b.length && (b[0] = "L");
				b = y.concat(b);
				f = f.call(this, n, !1, x);
				b.xMap = y.xMap;
				this.areaPath = b;
				return f
			},
			drawGraph: function () {
				this.areaPath = [];
				D.prototype.drawGraph.apply(this);
				var d = this,
					f = this.areaPath,
					H = this.options,
					u = [
						["area", "highcharts-area", this.color, H.fillColor]
					];
				this.zones.forEach(function (f, p) {
					u.push(["zone-area-" + p, "highcharts-area highcharts-zone-area-" + p + " " + f.className, f.color || d.color, f.fillColor || H.fillColor])
				});
				u.forEach(function (p) {
					var t = p[0],
						k = d[t],
						n = k ? "animate" : "attr",
						u = {};
					k ? (k.endX = d.preventGraphAnimation ? null : f.xMap, k.animate({
						d: f
					})) : (u.zIndex = 0, k = d[t] = d.chart.renderer.path(f).addClass(p[1]).add(d.group), k.isArea = !0);
					d.chart.styledMode || (u.fill = F(p[3], A(p[2]).setOpacity(F(H.fillOpacity, .75)).get()));
					k[n](u);
					k.startX = f.xMap;
					k.shiftUnit = H.step ? 2 : 1
				})
			},
			drawLegendSymbol: d.LegendSymbolMixin.drawRectangle
		});
		""
	});
	M(w, "parts/SplineSeries.js", [w["parts/Globals.js"], w["parts/Utilities.js"]], function (d, f) {
		var w = f.pick;
		d = d.seriesType;
		d("spline", "line", {}, {
			getPointSpline: function (d, f, D) {
				var x = f.plotX,
					p = f.plotY,
					A = d[D - 1];
				D = d[D + 1];
				if (A && !A.isNull && !1 !== A.doCurve && !f.isCliff && D && !D.isNull && !1 !== D.doCurve && !f.isCliff) {
					d = A.plotY;
					var u = D.plotX;
					D = D.plotY;
					var t = 0;
					var y = (1.5 * x + A.plotX) / 2.5;
					var k = (1.5 * p + d) / 2.5;
					u = (1.5 *
						x + u) / 2.5;
					var n = (1.5 * p + D) / 2.5;
					u !== y && (t = (n - k) * (u - x) / (u - y) + p - n);
					k += t;
					n += t;
					k > d && k > p ? (k = Math.max(d, p), n = 2 * p - k) : k < d && k < p && (k = Math.min(d, p), n = 2 * p - k);
					n > D && n > p ? (n = Math.max(D, p), k = 2 * p - n) : n < D && n < p && (n = Math.min(D, p), k = 2 * p - n);
					f.rightContX = u;
					f.rightContY = n
				}
				f = ["C", w(A.rightContX, A.plotX), w(A.rightContY, A.plotY), w(y, x), w(k, p), x, p];
				A.rightContX = A.rightContY = null;
				return f
			}
		});
		""
	});
	M(w, "parts/AreaSplineSeries.js", [w["parts/Globals.js"]], function (d) {
		var f = d.seriesTypes.area.prototype,
			w = d.seriesType;
		w("areaspline", "spline",
			d.defaultPlotOptions.area, {
				getStackPoints: f.getStackPoints,
				getGraphPath: f.getGraphPath,
				drawGraph: f.drawGraph,
				drawLegendSymbol: d.LegendSymbolMixin.drawRectangle
			});
		""
	});
	M(w, "parts/ColumnSeries.js", [w["parts/Globals.js"], w["parts/Utilities.js"]], function (d, f) {
		var w = f.animObject,
			F = f.clamp,
			A = f.defined,
			D = f.extend,
			x = f.isNumber,
			p = f.pick,
			H = d.color,
			u = d.merge,
			t = d.Series;
		f = d.seriesType;
		var y = d.svg;
		f("column", "line", {
			borderRadius: 0,
			crisp: !0,
			groupPadding: .2,
			marker: null,
			pointPadding: .1,
			minPointLength: 0,
			cropThreshold: 50,
			pointRange: null,
			states: {
				hover: {
					halo: !1,
					brightness: .1
				},
				select: {
					color: "#cccccc",
					borderColor: "#000000"
				}
			},
			dataLabels: {
				align: null,
				verticalAlign: null,
				y: null
			},
			softThreshold: !1,
			startFromThreshold: !0,
			stickyTracking: !1,
			tooltip: {
				distance: 6
			},
			threshold: 0,
			borderColor: "#ffffff"
		}, {
			cropShoulder: 0,
			directTouch: !0,
			trackerGroups: ["group", "dataLabelsGroup"],
			negStacks: !0,
			init: function () {
				t.prototype.init.apply(this, arguments);
				var d = this,
					f = d.chart;
				f.hasRendered && f.series.forEach(function (f) {
					f.type === d.type && (f.isDirty = !0)
				})
			},
			getColumnMetrics: function () {
				var d = this,
					f = d.options,
					t = d.xAxis,
					h = d.yAxis,
					e = t.options.reversedStacks;
				e = t.reversed && !e || !t.reversed && e;
				var c, a = {},
					b = 0;
				!1 === f.grouping ? b = 1 : d.chart.series.forEach(function (e) {
					var g = e.yAxis,
						f = e.options;
					if (e.type === d.type && (e.visible || !d.chart.options.chart.ignoreHiddenSeries) && h.len === g.len && h.pos === g.pos) {
						if (f.stacking) {
							c = e.stackKey;
							"undefined" === typeof a[c] && (a[c] = b++);
							var m = a[c]
						} else !1 !== f.grouping && (m = b++);
						e.columnIndex = m
					}
				});
				var g = Math.min(Math.abs(t.transA) * (t.ordinalSlope ||
						f.pointRange || t.closestPointRange || t.tickInterval || 1), t.len),
					q = g * f.groupPadding,
					m = (g - 2 * q) / (b || 1);
				f = Math.min(f.maxPointWidth || t.len, p(f.pointWidth, m * (1 - 2 * f.pointPadding)));
				d.columnMetrics = {
					width: f,
					offset: (m - f) / 2 + (q + ((d.columnIndex || 0) + (e ? 1 : 0)) * m - g / 2) * (e ? -1 : 1)
				};
				return d.columnMetrics
			},
			crispCol: function (d, f, t, h) {
				var e = this.chart,
					c = this.borderWidth,
					a = -(c % 2 ? .5 : 0);
				c = c % 2 ? .5 : 1;
				e.inverted && e.renderer.isVML && (c += 1);
				this.options.crisp && (t = Math.round(d + t) + a, d = Math.round(d) + a, t -= d);
				h = Math.round(f + h) + c;
				a = .5 >= Math.abs(f) &&
					.5 < h;
				f = Math.round(f) + c;
				h -= f;
				a && h && (--f, h += 1);
				return {
					x: d,
					y: f,
					width: t,
					height: h
				}
			},
			translate: function () {
				var d = this,
					f = d.chart,
					u = d.options,
					h = d.dense = 2 > d.closestPointRange * d.xAxis.transA;
				h = d.borderWidth = p(u.borderWidth, h ? 0 : 1);
				var e = d.yAxis,
					c = u.threshold,
					a = d.translatedThreshold = e.getThreshold(c),
					b = p(u.minPointLength, 5),
					g = d.getColumnMetrics(),
					q = g.width,
					m = d.barW = Math.max(q, 1 + 2 * h),
					C = d.pointXOffset = g.offset,
					z = d.dataMin,
					l = d.dataMax;
				f.inverted && (a -= .5);
				u.pointPadding && (m = Math.ceil(m));
				t.prototype.translate.apply(d);
				d.points.forEach(function (g) {
					var h = p(g.yBottom, a),
						k = 999 + Math.abs(h),
						v = q;
					k = F(g.plotY, -k, e.len + k);
					var r = g.plotX + C,
						n = m,
						t = Math.min(k, h),
						u = Math.max(k, h) - t;
					if (b && Math.abs(u) < b) {
						u = b;
						var y = !e.reversed && !g.negative || e.reversed && g.negative;
						g.y === c && d.dataMax <= c && e.min < c && z !== l && (y = !y);
						t = Math.abs(t - a) > b ? h - b : a - (y ? b : 0)
					}
					A(g.options.pointWidth) && (v = n = Math.ceil(g.options.pointWidth), r -= Math.round((v - q) / 2));
					g.barX = r;
					g.pointWidth = v;
					g.tooltipPos = f.inverted ? [e.len + e.pos - f.plotLeft - k, d.xAxis.len - r - n / 2, u] : [r + n / 2, k + e.pos -
						f.plotTop, u
					];
					g.shapeType = d.pointClass.prototype.shapeType || "rect";
					g.shapeArgs = d.crispCol.apply(d, g.isNull ? [r, a, n, 0] : [r, t, n, u])
				})
			},
			getSymbol: d.noop,
			drawLegendSymbol: d.LegendSymbolMixin.drawRectangle,
			drawGraph: function () {
				this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data")
			},
			pointAttribs: function (d, f) {
				var k = this.options,
					h = this.pointAttrToOptions || {};
				var e = h.stroke || "borderColor";
				var c = h["stroke-width"] || "borderWidth",
					a = d && d.color || this.color,
					b = d && d[e] || k[e] || this.color || a,
					g = d && d[c] ||
					k[c] || this[c] || 0;
				h = d && d.options.dashStyle || k.dashStyle;
				var q = p(d && d.opacity, k.opacity, 1);
				if (d && this.zones.length) {
					var m = d.getZone();
					a = d.options.color || m && (m.color || d.nonZonedColor) || this.color;
					m && (b = m.borderColor || b, h = m.dashStyle || h, g = m.borderWidth || g)
				}
				f && d && (d = u(k.states[f], d.options.states && d.options.states[f] || {}), f = d.brightness, a = d.color || "undefined" !== typeof f && H(a).brighten(d.brightness).get() || a, b = d[e] || b, g = d[c] || g, h = d.dashStyle || h, q = p(d.opacity, q));
				e = {
					fill: a,
					stroke: b,
					"stroke-width": g,
					opacity: q
				};
				h && (e.dashstyle = h);
				return e
			},
			drawPoints: function () {
				var d = this,
					f = this.chart,
					t = d.options,
					h = f.renderer,
					e = t.animationLimit || 250,
					c;
				d.points.forEach(function (a) {
					var b = a.graphic,
						g = !!b,
						k = b && f.pointCount < e ? "animate" : "attr";
					if (x(a.plotY) && null !== a.y) {
						c = a.shapeArgs;
						b && a.hasNewShapeType() && (b = b.destroy());
						d.enabledDataSorting && (a.startXPos = d.xAxis.reversed ? -(c ? c.width : 0) : d.xAxis.width);
						b || (a.graphic = b = h[a.shapeType](c).add(a.group || d.group)) && d.enabledDataSorting && f.hasRendered && f.pointCount < e && (b.attr({
								x: a.startXPos
							}),
							g = !0, k = "animate");
						if (b && g) b[k](u(c));
						if (t.borderRadius) b[k]({
							r: t.borderRadius
						});
						f.styledMode || b[k](d.pointAttribs(a, a.selected && "select")).shadow(!1 !== a.allowShadow && t.shadow, null, t.stacking && !t.borderRadius);
						b.addClass(a.getClassName(), !0)
					} else b && (a.graphic = b.destroy())
				})
			},
			animate: function (d) {
				var f = this,
					k = this.yAxis,
					h = f.options,
					e = this.chart.inverted,
					c = {},
					a = e ? "translateX" : "translateY";
				if (y)
					if (d) c.scaleY = .001, d = F(k.toPixels(h.threshold), k.pos, k.pos + k.len), e ? c.translateX = d - k.len : c.translateY = d, f.clipBox &&
						f.setClip(), f.group.attr(c);
					else {
						var b = f.group.attr(a);
						f.group.animate({
							scaleY: 1
						}, D(w(f.options.animation), {
							step: function (e, d) {
								c[a] = b + d.pos * (k.pos - b);
								f.group.attr(c)
							}
						}));
						f.animate = null
					}
			},
			remove: function () {
				var d = this,
					f = d.chart;
				f.hasRendered && f.series.forEach(function (f) {
					f.type === d.type && (f.isDirty = !0)
				});
				t.prototype.remove.apply(d, arguments)
			}
		});
		""
	});
	M(w, "parts/BarSeries.js", [w["parts/Globals.js"]], function (d) {
		d = d.seriesType;
		d("bar", "column", null, {
			inverted: !0
		});
		""
	});
	M(w, "parts/ScatterSeries.js", [w["parts/Globals.js"]],
		function (d) {
			var f = d.Series,
				w = d.seriesType;
			w("scatter", "line", {
				lineWidth: 0,
				findNearestPointBy: "xy",
				jitter: {
					x: 0,
					y: 0
				},
				marker: {
					enabled: !0
				},
				tooltip: {
					headerFormat: '<span style="color:{point.color}">\u25cf</span> <span style="font-size: 10px"> {series.name}</span><br/>',
					pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>"
				}
			}, {
				sorted: !1,
				requireSorting: !1,
				noSharedTooltip: !0,
				trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
				takeOrdinalPosition: !1,
				drawGraph: function () {
					this.options.lineWidth &&
						f.prototype.drawGraph.call(this)
				},
				applyJitter: function () {
					var d = this,
						f = this.options.jitter,
						D = this.points.length;
					f && this.points.forEach(function (x, p) {
						["x", "y"].forEach(function (A, u) {
							var t = "plot" + A.toUpperCase();
							if (f[A] && !x.isNull) {
								var y = d[A + "Axis"];
								var k = f[A] * y.transA;
								if (y && !y.isLog) {
									var n = Math.max(0, x[t] - k);
									y = Math.min(y.len, x[t] + k);
									u = 1E4 * Math.sin(p + u * D);
									x[t] = n + (y - n) * (u - Math.floor(u));
									"x" === A && (x.clientX = x.plotX)
								}
							}
						})
					})
				}
			});
			d.addEvent(f, "afterTranslate", function () {
				this.applyJitter && this.applyJitter()
			});
			""
		});
	M(w, "mixins/centered-series.js", [w["parts/Globals.js"], w["parts/Utilities.js"]], function (d, f) {
		var w = f.isNumber,
			F = f.pick,
			A = f.relativeLength,
			D = d.deg2rad;
		d.CenteredSeriesMixin = {
			getCenter: function () {
				var d = this.options,
					f = this.chart,
					w = 2 * (d.slicedOffset || 0),
					u = f.plotWidth - 2 * w;
				f = f.plotHeight - 2 * w;
				var t = d.center;
				t = [F(t[0], "50%"), F(t[1], "50%"), d.size || "100%", d.innerSize || 0];
				var y = Math.min(u, f),
					k;
				for (k = 0; 4 > k; ++k) {
					var n = t[k];
					d = 2 > k || 2 === k && /%$/.test(n);
					t[k] = A(n, [u, f, y, t[2]][k]) + (d ? w : 0)
				}
				t[3] > t[2] && (t[3] = t[2]);
				return t
			},
			getStartAndEndRadians: function (d, f) {
				d = w(d) ? d : 0;
				f = w(f) && f > d && 360 > f - d ? f : d + 360;
				return {
					start: D * (d + -90),
					end: D * (f + -90)
				}
			}
		}
	});
	M(w, "parts/PieSeries.js", [w["parts/Globals.js"], w["parts/Utilities.js"]], function (d, f) {
		var w = f.clamp,
			F = f.defined,
			A = f.isNumber,
			D = f.pick,
			x = f.relativeLength,
			p = f.setAnimation,
			H = d.addEvent;
		f = d.CenteredSeriesMixin;
		var u = f.getStartAndEndRadians,
			t = d.merge,
			y = d.noop,
			k = d.Point,
			n = d.Series,
			E = d.seriesType,
			h = d.fireEvent;
		E("pie", "line", {
			center: [null, null],
			clip: !1,
			colorByPoint: !0,
			dataLabels: {
				allowOverlap: !0,
				connectorPadding: 5,
				connectorShape: "fixedOffset",
				crookDistance: "70%",
				distance: 30,
				enabled: !0,
				formatter: function () {
					return this.point.isNull ? void 0 : this.point.name
				},
				softConnector: !0,
				x: 0
			},
			fillColor: void 0,
			ignoreHiddenPoint: !0,
			inactiveOtherPoints: !0,
			legendType: "point",
			marker: null,
			size: null,
			showInLegend: !1,
			slicedOffset: 10,
			stickyTracking: !1,
			tooltip: {
				followPointer: !0
			},
			borderColor: "#ffffff",
			borderWidth: 1,
			lineWidth: void 0,
			states: {
				hover: {
					brightness: .1
				}
			}
		}, {
			isCartesian: !1,
			requireSorting: !1,
			directTouch: !0,
			noSharedTooltip: !0,
			trackerGroups: ["group", "dataLabelsGroup"],
			axisTypes: [],
			pointAttribs: d.seriesTypes.column.prototype.pointAttribs,
			animate: function (e) {
				var c = this,
					a = c.points,
					b = c.startAngleRad;
				e || (a.forEach(function (a) {
					var e = a.graphic,
						d = a.shapeArgs;
					e && d && (e.attr({
						r: D(a.startR, c.center && c.center[3] / 2),
						start: b,
						end: b
					}), e.animate({
						r: d.r,
						start: d.start,
						end: d.end
					}, c.options.animation))
				}), c.animate = null)
			},
			hasData: function () {
				return !!this.processedXData.length
			},
			updateTotals: function () {
				var e, c = 0,
					a = this.points,
					b = a.length,
					d = this.options.ignoreHiddenPoint;
				for (e = 0; e < b; e++) {
					var f = a[e];
					c += d && !f.visible ? 0 : f.isNull ? 0 : f.y
				}
				this.total = c;
				for (e = 0; e < b; e++) f = a[e], f.percentage = 0 < c && (f.visible || !d) ? f.y / c * 100 : 0, f.total = c
			},
			generatePoints: function () {
				n.prototype.generatePoints.call(this);
				this.updateTotals()
			},
			getX: function (e, c, a) {
				var b = this.center,
					d = this.radii ? this.radii[a.index] : b[2] / 2;
				e = Math.asin(w((e - b[1]) / (d + a.labelDistance), -1, 1));
				return b[0] + (c ? -1 : 1) * Math.cos(e) * (d + a.labelDistance) + (0 < a.labelDistance ? (c ? -1 : 1) * this.options.dataLabels.padding : 0)
			},
			translate: function (e) {
				this.generatePoints();
				var c = 0,
					a = this.options,
					b = a.slicedOffset,
					d = b + (a.borderWidth || 0),
					f = u(a.startAngle, a.endAngle),
					m = this.startAngleRad = f.start;
				f = (this.endAngleRad = f.end) - m;
				var k = this.points,
					z = a.dataLabels.distance;
				a = a.ignoreHiddenPoint;
				var l, v = k.length;
				e || (this.center = e = this.getCenter());
				for (l = 0; l < v; l++) {
					var n = k[l];
					var t = m + c * f;
					if (!a || n.visible) c += n.percentage / 100;
					var p = m + c * f;
					n.shapeType = "arc";
					n.shapeArgs = {
						x: e[0],
						y: e[1],
						r: e[2] / 2,
						innerR: e[3] / 2,
						start: Math.round(1E3 * t) / 1E3,
						end: Math.round(1E3 * p) / 1E3
					};
					n.labelDistance = D(n.options.dataLabels &&
						n.options.dataLabels.distance, z);
					n.labelDistance = x(n.labelDistance, n.shapeArgs.r);
					this.maxLabelDistance = Math.max(this.maxLabelDistance || 0, n.labelDistance);
					p = (p + t) / 2;
					p > 1.5 * Math.PI ? p -= 2 * Math.PI : p < -Math.PI / 2 && (p += 2 * Math.PI);
					n.slicedTranslation = {
						translateX: Math.round(Math.cos(p) * b),
						translateY: Math.round(Math.sin(p) * b)
					};
					var r = Math.cos(p) * e[2] / 2;
					var y = Math.sin(p) * e[2] / 2;
					n.tooltipPos = [e[0] + .7 * r, e[1] + .7 * y];
					n.half = p < -Math.PI / 2 || p > Math.PI / 2 ? 1 : 0;
					n.angle = p;
					t = Math.min(d, n.labelDistance / 5);
					n.labelPosition = {
						natural: {
							x: e[0] +
								r + Math.cos(p) * n.labelDistance,
							y: e[1] + y + Math.sin(p) * n.labelDistance
						},
						"final": {},
						alignment: 0 > n.labelDistance ? "center" : n.half ? "right" : "left",
						connectorPosition: {
							breakAt: {
								x: e[0] + r + Math.cos(p) * t,
								y: e[1] + y + Math.sin(p) * t
							},
							touchingSliceAt: {
								x: e[0] + r,
								y: e[1] + y
							}
						}
					}
				}
				h(this, "afterTranslate")
			},
			drawEmpty: function () {
				var e = this.options;
				if (0 === this.total) {
					var c = this.center[0];
					var a = this.center[1];
					this.graph || (this.graph = this.chart.renderer.circle(c, a, 0).addClass("highcharts-graph").add(this.group));
					this.graph.animate({
						"stroke-width": e.borderWidth,
						cx: c,
						cy: a,
						r: this.center[2] / 2,
						fill: e.fillColor || "none",
						stroke: e.color || "#cccccc"
					})
				} else this.graph && (this.graph = this.graph.destroy())
			},
			redrawPoints: function () {
				var e = this,
					c = e.chart,
					a = c.renderer,
					b, d, f, h, k = e.options.shadow;
				this.drawEmpty();
				!k || e.shadowGroup || c.styledMode || (e.shadowGroup = a.g("shadow").attr({
					zIndex: -1
				}).add(e.group));
				e.points.forEach(function (g) {
					var m = {};
					d = g.graphic;
					if (!g.isNull && d) {
						h = g.shapeArgs;
						b = g.getTranslate();
						if (!c.styledMode) {
							var q = g.shadowGroup;
							k && !q && (q = g.shadowGroup = a.g("shadow").add(e.shadowGroup));
							q && q.attr(b);
							f = e.pointAttribs(g, g.selected && "select")
						}
						g.delayedRendering ? (d.setRadialReference(e.center).attr(h).attr(b), c.styledMode || d.attr(f).attr({
							"stroke-linejoin": "round"
						}).shadow(k, q), g.delayedRendering = !1) : (d.setRadialReference(e.center), c.styledMode || t(!0, m, f), t(!0, m, h, b), d.animate(m));
						d.attr({
							visibility: g.visible ? "inherit" : "hidden"
						});
						d.addClass(g.getClassName())
					} else d && (g.graphic = d.destroy())
				})
			},
			drawPoints: function () {
				var e = this.chart.renderer;
				this.points.forEach(function (c) {
					c.graphic ||
						(c.graphic = e[c.shapeType](c.shapeArgs).add(c.series.group), c.delayedRendering = !0)
				})
			},
			searchPoint: y,
			sortByAngle: function (e, c) {
				e.sort(function (a, b) {
					return "undefined" !== typeof a.angle && (b.angle - a.angle) * c
				})
			},
			drawLegendSymbol: d.LegendSymbolMixin.drawRectangle,
			getCenter: f.getCenter,
			getSymbol: y,
			drawGraph: null
		}, {
			init: function () {
				k.prototype.init.apply(this, arguments);
				var e = this;
				e.name = D(e.name, "Slice");
				var c = function (a) {
					e.slice("select" === a.type)
				};
				H(e, "select", c);
				H(e, "unselect", c);
				return e
			},
			isValid: function () {
				return A(this.y) &&
					0 <= this.y
			},
			setVisible: function (e, c) {
				var a = this,
					b = a.series,
					d = b.chart,
					f = b.options.ignoreHiddenPoint;
				c = D(c, f);
				e !== a.visible && (a.visible = a.options.visible = e = "undefined" === typeof e ? !a.visible : e, b.options.data[b.data.indexOf(a)] = a.options, ["graphic", "dataLabel", "connector", "shadowGroup"].forEach(function (b) {
					if (a[b]) a[b][e ? "show" : "hide"](!0)
				}), a.legendItem && d.legend.colorizeItem(a, e), e || "hover" !== a.state || a.setState(""), f && (b.isDirty = !0), c && d.redraw())
			},
			slice: function (e, c, a) {
				var b = this.series;
				p(a, b.chart);
				D(c, !0);
				this.sliced = this.options.sliced = F(e) ? e : !this.sliced;
				b.options.data[b.data.indexOf(this)] = this.options;
				this.graphic.animate(this.getTranslate());
				this.shadowGroup && this.shadowGroup.animate(this.getTranslate())
			},
			getTranslate: function () {
				return this.sliced ? this.slicedTranslation : {
					translateX: 0,
					translateY: 0
				}
			},
			haloPath: function (e) {
				var c = this.shapeArgs;
				return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(c.x, c.y, c.r + e, c.r + e, {
					innerR: c.r - 1,
					start: c.start,
					end: c.end
				})
			},
			connectorShapes: {
				fixedOffset: function (e,
					c, a) {
					var b = c.breakAt;
					c = c.touchingSliceAt;
					return ["M", e.x, e.y].concat(a.softConnector ? ["C", e.x + ("left" === e.alignment ? -5 : 5), e.y, 2 * b.x - c.x, 2 * b.y - c.y, b.x, b.y] : ["L", b.x, b.y]).concat(["L", c.x, c.y])
				},
				straight: function (e, c) {
					c = c.touchingSliceAt;
					return ["M", e.x, e.y, "L", c.x, c.y]
				},
				crookedLine: function (e, c, a) {
					c = c.touchingSliceAt;
					var b = this.series,
						d = b.center[0],
						f = b.chart.plotWidth,
						h = b.chart.plotLeft;
					b = e.alignment;
					var k = this.shapeArgs.r;
					a = x(a.crookDistance, 1);
					a = "left" === b ? d + k + (f + h - d - k) * (1 - a) : h + (d - k) * a;
					d = ["L", a, e.y];
					if ("left" === b ? a > e.x || a < c.x : a < e.x || a > c.x) d = [];
					return ["M", e.x, e.y].concat(d).concat(["L", c.x, c.y])
				}
			},
			getConnectorPath: function () {
				var e = this.labelPosition,
					c = this.series.options.dataLabels,
					a = c.connectorShape,
					b = this.connectorShapes;
				b[a] && (a = b[a]);
				return a.call(this, {
					x: e.final.x,
					y: e.final.y,
					alignment: e.alignment
				}, e.connectorPosition, c)
			}
		});
		""
	});
	M(w, "parts/DataLabels.js", [w["parts/Globals.js"], w["parts/Utilities.js"]], function (d, f) {
		var w = f.animObject,
			F = f.arrayMax,
			A = f.clamp,
			D = f.defined,
			x = f.extend,
			p = f.isArray,
			H = f.objectEach,
			u = f.pick,
			t = f.relativeLength,
			y = f.splat,
			k = d.format,
			n = d.merge;
		f = d.noop;
		var E = d.Series,
			h = d.seriesTypes,
			e = d.stableSort;
		d.distribute = function (c, a, b) {
			function g(a, b) {
				return a.target - b.target
			}
			var f, h = !0,
				k = c,
				z = [];
			var l = 0;
			var v = k.reducedLen || a;
			for (f = c.length; f--;) l += c[f].size;
			if (l > v) {
				e(c, function (a, b) {
					return (b.rank || 0) - (a.rank || 0)
				});
				for (l = f = 0; l <= v;) l += c[f].size, f++;
				z = c.splice(f - 1, c.length)
			}
			e(c, g);
			for (c = c.map(function (a) {
					return {
						size: a.size,
						targets: [a.target],
						align: u(a.align, .5)
					}
				}); h;) {
				for (f = c.length; f--;) h =
					c[f], l = (Math.min.apply(0, h.targets) + Math.max.apply(0, h.targets)) / 2, h.pos = A(l - h.size * h.align, 0, a - h.size);
				f = c.length;
				for (h = !1; f--;) 0 < f && c[f - 1].pos + c[f - 1].size > c[f].pos && (c[f - 1].size += c[f].size, c[f - 1].targets = c[f - 1].targets.concat(c[f].targets), c[f - 1].align = .5, c[f - 1].pos + c[f - 1].size > a && (c[f - 1].pos = a - c[f - 1].size), c.splice(f, 1), h = !0)
			}
			k.push.apply(k, z);
			f = 0;
			c.some(function (c) {
				var e = 0;
				if (c.targets.some(function () {
						k[f].pos = c.pos + e;
						if (Math.abs(k[f].pos - k[f].target) > b) return k.slice(0, f + 1).forEach(function (a) {
								delete a.pos
							}),
							k.reducedLen = (k.reducedLen || a) - .1 * a, k.reducedLen > .1 * a && d.distribute(k, a, b), !0;
						e += k[f].size;
						f++
					})) return !0
			});
			e(k, g)
		};
		E.prototype.drawDataLabels = function () {
			function c(a, b) {
				var c = b.filter;
				return c ? (b = c.operator, a = a[c.property], c = c.value, ">" === b && a > c || "<" === b && a < c || ">=" === b && a >= c || "<=" === b && a <= c || "==" === b && a == c || "===" === b && a === c ? !0 : !1) : !0
			}

			function a(a, b) {
				var c = [],
					e;
				if (p(a) && !p(b)) c = a.map(function (a) {
					return n(a, b)
				});
				else if (p(b) && !p(a)) c = b.map(function (b) {
					return n(a, b)
				});
				else if (p(a) || p(b))
					for (e = Math.max(a.length,
							b.length); e--;) c[e] = n(a[e], b[e]);
				else c = n(a, b);
				return c
			}
			var b = this,
				e = b.chart,
				f = b.options,
				h = f.dataLabels,
				t = b.points,
				z, l = b.hasRendered || 0,
				v = w(f.animation).duration,
				B = Math.min(v, 200),
				A = !e.renderer.forExport && u(h.defer, 0 < B),
				x = e.renderer;
			h = a(a(e.options.plotOptions && e.options.plotOptions.series && e.options.plotOptions.series.dataLabels, e.options.plotOptions && e.options.plotOptions[b.type] && e.options.plotOptions[b.type].dataLabels), h);
			d.fireEvent(this, "drawDataLabels");
			if (p(h) || h.enabled || b._hasPointLabels) {
				var r =
					b.plotGroup("dataLabelsGroup", "data-labels", A && !l ? "hidden" : "inherit", h.zIndex || 6);
				A && (r.attr({
					opacity: +l
				}), l || setTimeout(function () {
					var a = b.dataLabelsGroup;
					a && (b.visible && r.show(!0), a[f.animation ? "animate" : "attr"]({
						opacity: 1
					}, {
						duration: B
					}))
				}, v - B));
				t.forEach(function (d) {
					z = y(a(h, d.dlOptions || d.options && d.options.dataLabels));
					z.forEach(function (a, g) {
						var h = a.enabled && (!d.isNull || d.dataLabelOnNull) && c(d, a),
							l = d.dataLabels ? d.dataLabels[g] : d.dataLabel,
							m = d.connectors ? d.connectors[g] : d.connector,
							q = u(a.distance,
								d.labelDistance),
							z = !l;
						if (h) {
							var v = d.getLabelConfig();
							var n = u(a[d.formatPrefix + "Format"], a.format);
							v = D(n) ? k(n, v, e) : (a[d.formatPrefix + "Formatter"] || a.formatter).call(v, a);
							n = a.style;
							var t = a.rotation;
							e.styledMode || (n.color = u(a.color, n.color, b.color, "#000000"), "contrast" === n.color ? (d.contrastColor = x.getContrast(d.color || b.color), n.color = !D(q) && a.inside || 0 > q || f.stacking ? d.contrastColor : "#000000") : delete d.contrastColor, f.cursor && (n.cursor = f.cursor));
							var C = {
								r: a.borderRadius || 0,
								rotation: t,
								padding: a.padding,
								zIndex: 1
							};
							e.styledMode || (C.fill = a.backgroundColor, C.stroke = a.borderColor, C["stroke-width"] = a.borderWidth);
							H(C, function (a, b) {
								"undefined" === typeof a && delete C[b]
							})
						}!l || h && D(v) ? h && D(v) && (l ? C.text = v : (d.dataLabels = d.dataLabels || [], l = d.dataLabels[g] = t ? x.text(v, 0, -9999).addClass("highcharts-data-label") : x.label(v, 0, -9999, a.shape, null, null, a.useHTML, null, "data-label"), g || (d.dataLabel = l), l.addClass(" highcharts-data-label-color-" + d.colorIndex + " " + (a.className || "") + (a.useHTML ? " highcharts-tracker" : ""))), l.options =
							a, l.attr(C), e.styledMode || l.css(n).shadow(a.shadow), l.added || l.add(r), a.textPath && !a.useHTML && (l.setTextPath(d.getDataLabelPath && d.getDataLabelPath(l) || d.graphic, a.textPath), d.dataLabelPath && !a.textPath.enabled && (d.dataLabelPath = d.dataLabelPath.destroy())), b.alignDataLabel(d, l, a, null, z)) : (d.dataLabel = d.dataLabel && d.dataLabel.destroy(), d.dataLabels && (1 === d.dataLabels.length ? delete d.dataLabels : delete d.dataLabels[g]), g || delete d.dataLabel, m && (d.connector = d.connector.destroy(), d.connectors && (1 === d.connectors.length ?
							delete d.connectors : delete d.connectors[g])))
					})
				})
			}
			d.fireEvent(this, "afterDrawDataLabels")
		};
		E.prototype.alignDataLabel = function (c, a, b, e, d) {
			var g = this,
				f = this.chart,
				h = this.isCartesian && f.inverted,
				l = this.enabledDataSorting,
				k = u(c.dlBox && c.dlBox.centerX, c.plotX, -9999),
				q = u(c.plotY, -9999),
				n = a.getBBox(),
				t = b.rotation,
				r = b.align,
				p = f.isInsidePlot(k, Math.round(q), h),
				y = "justify" === u(b.overflow, l ? "none" : "justify"),
				A = this.visible && (c.series.forceDL || l && !y || p || e && f.isInsidePlot(k, h ? e.x + 1 : e.y + e.height - 1, h));
			var w = function (b) {
				l &&
					g.xAxis && !y && g.setDataLabelStartPos(c, a, d, p, b)
			};
			if (A) {
				var D = f.renderer.fontMetrics(f.styledMode ? void 0 : b.style.fontSize, a).b;
				e = x({
					x: h ? this.yAxis.len - q : k,
					y: Math.round(h ? this.xAxis.len - k : q),
					width: 0,
					height: 0
				}, e);
				x(b, {
					width: n.width,
					height: n.height
				});
				t ? (y = !1, k = f.renderer.rotCorr(D, t), k = {
					x: e.x + b.x + e.width / 2 + k.x,
					y: e.y + b.y + {
						top: 0,
						middle: .5,
						bottom: 1
					} [b.verticalAlign] * e.height
				}, w(k), a[d ? "attr" : "animate"](k).attr({
					align: r
				}), w = (t + 720) % 360, w = 180 < w && 360 > w, "left" === r ? k.y -= w ? n.height : 0 : "center" === r ? (k.x -= n.width /
					2, k.y -= n.height / 2) : "right" === r && (k.x -= n.width, k.y -= w ? 0 : n.height), a.placed = !0, a.alignAttr = k) : (w(e), a.align(b, null, e), k = a.alignAttr);
				y && 0 <= e.height ? this.justifyDataLabel(a, b, k, n, e, d) : u(b.crop, !0) && (A = f.isInsidePlot(k.x, k.y) && f.isInsidePlot(k.x + n.width, k.y + n.height));
				if (b.shape && !t) a[d ? "attr" : "animate"]({
					anchorX: h ? f.plotWidth - c.plotY : c.plotX,
					anchorY: h ? f.plotHeight - c.plotX : c.plotY
				})
			}
			d && l && (a.placed = !1);
			A || l && !y || (a.hide(!0), a.placed = !1)
		};
		E.prototype.setDataLabelStartPos = function (c, a, b, e, d) {
			var g = this.chart,
				f = g.inverted,
				h = this.xAxis,
				l = h.reversed,
				k = f ? a.height / 2 : a.width / 2;
			c = (c = c.pointWidth) ? c / 2 : 0;
			h = f ? d.x : l ? -k - c : h.width - k + c;
			d = f ? l ? this.yAxis.height - k + c : -k - c : d.y;
			a.startXPos = h;
			a.startYPos = d;
			e ? "hidden" === a.visibility && (a.show(), a.attr({
				opacity: 0
			}).animate({
				opacity: 1
			})) : a.attr({
				opacity: 1
			}).animate({
				opacity: 0
			}, void 0, a.hide);
			g.hasRendered && (b && a.attr({
				x: a.startXPos,
				y: a.startYPos
			}), a.placed = !0)
		};
		E.prototype.justifyDataLabel = function (c, a, b, e, d, f) {
			var g = this.chart,
				h = a.align,
				l = a.verticalAlign,
				m = c.box ? 0 : c.padding ||
				0;
			var k = b.x + m;
			if (0 > k) {
				"right" === h ? (a.align = "left", a.inside = !0) : a.x = -k;
				var q = !0
			}
			k = b.x + e.width - m;
			k > g.plotWidth && ("left" === h ? (a.align = "right", a.inside = !0) : a.x = g.plotWidth - k, q = !0);
			k = b.y + m;
			0 > k && ("bottom" === l ? (a.verticalAlign = "top", a.inside = !0) : a.y = -k, q = !0);
			k = b.y + e.height - m;
			k > g.plotHeight && ("top" === l ? (a.verticalAlign = "bottom", a.inside = !0) : a.y = g.plotHeight - k, q = !0);
			q && (c.placed = !f, c.align(a, null, d));
			return q
		};
		h.pie && (h.pie.prototype.dataLabelPositioners = {
			radialDistributionY: function (c) {
				return c.top + c.distributeBox.pos
			},
			radialDistributionX: function (c, a, b, e) {
				return c.getX(b < a.top + 2 || b > a.bottom - 2 ? e : b, a.half, a)
			},
			justify: function (c, a, b) {
				return b[0] + (c.half ? -1 : 1) * (a + c.labelDistance)
			},
			alignToPlotEdges: function (c, a, b, e) {
				c = c.getBBox().width;
				return a ? c + e : b - c - e
			},
			alignToConnectors: function (c, a, b, e) {
				var d = 0,
					f;
				c.forEach(function (a) {
					f = a.dataLabel.getBBox().width;
					f > d && (d = f)
				});
				return a ? d + e : b - d - e
			}
		}, h.pie.prototype.drawDataLabels = function () {
			var c = this,
				a = c.data,
				b, e = c.chart,
				f = c.options.dataLabels,
				h = f.connectorPadding,
				k, z = e.plotWidth,
				l = e.plotHeight,
				v = e.plotLeft,
				t = Math.round(e.chartWidth / 3),
				p, y = c.center,
				r = y[2] / 2,
				A = y[1],
				x, w, H, L, M = [
					[],
					[]
				],
				P, K, Q, R, V = [0, 0, 0, 0],
				Z = c.dataLabelPositioners,
				X;
			c.visible && (f.enabled || c._hasPointLabels) && (a.forEach(function (a) {
				a.dataLabel && a.visible && a.dataLabel.shortened && (a.dataLabel.attr({
					width: "auto"
				}).css({
					width: "auto",
					textOverflow: "clip"
				}), a.dataLabel.shortened = !1)
			}), E.prototype.drawDataLabels.apply(c), a.forEach(function (a) {
				a.dataLabel && (a.visible ? (M[a.half].push(a), a.dataLabel._pos = null, !D(f.style.width) &&
					!D(a.options.dataLabels && a.options.dataLabels.style && a.options.dataLabels.style.width) && a.dataLabel.getBBox().width > t && (a.dataLabel.css({
						width: .7 * t
					}), a.dataLabel.shortened = !0)) : (a.dataLabel = a.dataLabel.destroy(), a.dataLabels && 1 === a.dataLabels.length && delete a.dataLabels))
			}), M.forEach(function (a, g) {
				var m = a.length,
					k = [],
					q;
				if (m) {
					c.sortByAngle(a, g - .5);
					if (0 < c.maxLabelDistance) {
						var n = Math.max(0, A - r - c.maxLabelDistance);
						var t = Math.min(A + r + c.maxLabelDistance, e.plotHeight);
						a.forEach(function (a) {
							0 < a.labelDistance &&
								a.dataLabel && (a.top = Math.max(0, A - r - a.labelDistance), a.bottom = Math.min(A + r + a.labelDistance, e.plotHeight), q = a.dataLabel.getBBox().height || 21, a.distributeBox = {
									target: a.labelPosition.natural.y - a.top + q / 2,
									size: q,
									rank: a.y
								}, k.push(a.distributeBox))
						});
						n = t + q - n;
						d.distribute(k, n, n / 5)
					}
					for (R = 0; R < m; R++) {
						b = a[R];
						H = b.labelPosition;
						x = b.dataLabel;
						Q = !1 === b.visible ? "hidden" : "inherit";
						K = n = H.natural.y;
						k && D(b.distributeBox) && ("undefined" === typeof b.distributeBox.pos ? Q = "hidden" : (L = b.distributeBox.size, K = Z.radialDistributionY(b)));
						delete b.positionIndex;
						if (f.justify) P = Z.justify(b, r, y);
						else switch (f.alignTo) {
							case "connectors":
								P = Z.alignToConnectors(a, g, z, v);
								break;
							case "plotEdges":
								P = Z.alignToPlotEdges(x, g, z, v);
								break;
							default:
								P = Z.radialDistributionX(c, b, K, n)
						}
						x._attr = {
							visibility: Q,
							align: H.alignment
						};
						x._pos = {
							x: P + f.x + ({
								left: h,
								right: -h
							} [H.alignment] || 0),
							y: K + f.y - 10
						};
						H.final.x = P;
						H.final.y = K;
						u(f.crop, !0) && (w = x.getBBox().width, n = null, P - w < h && 1 === g ? (n = Math.round(w - P + h), V[3] = Math.max(n, V[3])) : P + w > z - h && 0 === g && (n = Math.round(P + w - z + h), V[1] = Math.max(n,
							V[1])), 0 > K - L / 2 ? V[0] = Math.max(Math.round(-K + L / 2), V[0]) : K + L / 2 > l && (V[2] = Math.max(Math.round(K + L / 2 - l), V[2])), x.sideOverflow = n)
					}
				}
			}), 0 === F(V) || this.verifyDataLabelOverflow(V)) && (this.placeDataLabels(), this.points.forEach(function (a) {
				X = n(f, a.options.dataLabels);
				if (k = u(X.connectorWidth, 1)) {
					var b;
					p = a.connector;
					if ((x = a.dataLabel) && x._pos && a.visible && 0 < a.labelDistance) {
						Q = x._attr.visibility;
						if (b = !p) a.connector = p = e.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-" + a.colorIndex + (a.className ?
							" " + a.className : "")).add(c.dataLabelsGroup), e.styledMode || p.attr({
							"stroke-width": k,
							stroke: X.connectorColor || a.color || "#666666"
						});
						p[b ? "attr" : "animate"]({
							d: a.getConnectorPath()
						});
						p.attr("visibility", Q)
					} else p && (a.connector = p.destroy())
				}
			}))
		}, h.pie.prototype.placeDataLabels = function () {
			this.points.forEach(function (c) {
				var a = c.dataLabel,
					b;
				a && c.visible && ((b = a._pos) ? (a.sideOverflow && (a._attr.width = Math.max(a.getBBox().width - a.sideOverflow, 0), a.css({
					width: a._attr.width + "px",
					textOverflow: (this.options.dataLabels.style || {}).textOverflow || "ellipsis"
				}), a.shortened = !0), a.attr(a._attr), a[a.moved ? "animate" : "attr"](b), a.moved = !0) : a && a.attr({
					y: -9999
				}));
				delete c.distributeBox
			}, this)
		}, h.pie.prototype.alignDataLabel = f, h.pie.prototype.verifyDataLabelOverflow = function (c) {
			var a = this.center,
				b = this.options,
				e = b.center,
				d = b.minSize || 80,
				f = null !== b.size;
			if (!f) {
				if (null !== e[0]) var h = Math.max(a[2] - Math.max(c[1], c[3]), d);
				else h = Math.max(a[2] - c[1] - c[3], d), a[0] += (c[3] - c[1]) / 2;
				null !== e[1] ? h = A(h, d, a[2] - Math.max(c[0], c[2])) : (h = A(h, d, a[2] - c[0] -
					c[2]), a[1] += (c[0] - c[2]) / 2);
				h < a[2] ? (a[2] = h, a[3] = Math.min(t(b.innerSize || 0, h), h), this.translate(a), this.drawDataLabels && this.drawDataLabels()) : f = !0
			}
			return f
		});
		h.column && (h.column.prototype.alignDataLabel = function (c, a, b, e, d) {
			var f = this.chart.inverted,
				g = c.series,
				h = c.dlBox || c.shapeArgs,
				l = u(c.below, c.plotY > u(this.translatedThreshold, g.yAxis.len)),
				k = u(b.inside, !!this.options.stacking);
			h && (e = n(h), 0 > e.y && (e.height += e.y, e.y = 0), h = e.y + e.height - g.yAxis.len, 0 < h && (e.height -= h), f && (e = {
				x: g.yAxis.len - e.y - e.height,
				y: g.xAxis.len - e.x - e.width,
				width: e.height,
				height: e.width
			}), k || (f ? (e.x += l ? 0 : e.width, e.width = 0) : (e.y += l ? e.height : 0, e.height = 0)));
			b.align = u(b.align, !f || k ? "center" : l ? "right" : "left");
			b.verticalAlign = u(b.verticalAlign, f || k ? "middle" : l ? "top" : "bottom");
			E.prototype.alignDataLabel.call(this, c, a, b, e, d);
			e && (0 >= e.height && e.y === this.chart.plotHeight || 0 >= e.width && 0 === e.x) && (a.hide(!0), a.placed = !1);
			b.inside && c.contrastColor && a.css({
				color: c.contrastColor
			})
		})
	});
	M(w, "modules/overlapping-datalabels.src.js", [w["parts/Globals.js"],
		w["parts/Utilities.js"]
	], function (d, f) {
		var w = f.isArray,
			F = f.objectEach,
			A = f.pick;
		f = d.Chart;
		var D = d.addEvent,
			x = d.fireEvent;
		D(f, "render", function () {
			var d = [];
			(this.labelCollectors || []).forEach(function (f) {
				d = d.concat(f())
			});
			(this.yAxis || []).forEach(function (f) {
				f.options.stackLabels && !f.options.stackLabels.allowOverlap && F(f.stacks, function (f) {
					F(f, function (f) {
						d.push(f.label)
					})
				})
			});
			(this.series || []).forEach(function (f) {
				var p = f.options.dataLabels;
				f.visible && (!1 !== p.enabled || f._hasPointLabels) && f.points.forEach(function (f) {
					f.visible &&
						(w(f.dataLabels) ? f.dataLabels : f.dataLabel ? [f.dataLabel] : []).forEach(function (t) {
							var k = t.options;
							t.labelrank = A(k.labelrank, f.labelrank, f.shapeArgs && f.shapeArgs.height);
							k.allowOverlap || d.push(t)
						})
				})
			});
			this.hideOverlappingLabels(d)
		});
		f.prototype.hideOverlappingLabels = function (d) {
			var f = this,
				p = d.length,
				t = f.renderer,
				y, k, n, A = !1;
			var h = function (a) {
				var b = a.box ? 0 : a.padding || 0;
				var c = 0;
				if (a && (!a.alignAttr || a.placed)) {
					var e = a.alignAttr || {
						x: a.attr("x"),
						y: a.attr("y")
					};
					var d = a.parentGroup;
					a.width || (c = a.getBBox(),
						a.width = c.width, a.height = c.height, c = t.fontMetrics(null, a.element).h);
					return {
						x: e.x + (d.translateX || 0) + b,
						y: e.y + (d.translateY || 0) + b - c,
						width: a.width - 2 * b,
						height: a.height - 2 * b
					}
				}
			};
			for (k = 0; k < p; k++)
				if (y = d[k]) y.oldOpacity = y.opacity, y.newOpacity = 1, y.absoluteBox = h(y);
			d.sort(function (a, b) {
				return (b.labelrank || 0) - (a.labelrank || 0)
			});
			for (k = 0; k < p; k++) {
				var e = (h = d[k]) && h.absoluteBox;
				for (y = k + 1; y < p; ++y) {
					var c = (n = d[y]) && n.absoluteBox;
					!e || !c || h === n || 0 === h.newOpacity || 0 === n.newOpacity || c.x > e.x + e.width || c.x + c.width < e.x || c.y >
						e.y + e.height || c.y + c.height < e.y || ((h.labelrank < n.labelrank ? h : n).newOpacity = 0)
				}
			}
			d.forEach(function (a) {
				var b;
				if (a) {
					var c = a.newOpacity;
					a.oldOpacity !== c && (a.alignAttr && a.placed ? (c ? a.show(!0) : b = function () {
						a.hide(!0);
						a.placed = !1
					}, A = !0, a.alignAttr.opacity = c, a[a.isOld ? "animate" : "attr"](a.alignAttr, null, b), x(f, "afterHideOverlappingLabel")) : a.attr({
						opacity: c
					}));
					a.isOld = !0
				}
			});
			A && x(f, "afterHideAllOverlappingLabels")
		}
	});
	M(w, "parts/Interaction.js", [w["parts/Globals.js"], w["parts/Utilities.js"]], function (d, f) {
		var w =
			f.defined,
			F = f.extend,
			A = f.isArray,
			D = f.isObject,
			x = f.objectEach,
			p = f.pick,
			H = d.addEvent;
		f = d.Chart;
		var u = d.createElement,
			t = d.css,
			y = d.defaultOptions,
			k = d.defaultPlotOptions,
			n = d.fireEvent,
			E = d.hasTouch,
			h = d.Legend,
			e = d.merge,
			c = d.Point,
			a = d.Series,
			b = d.seriesTypes,
			g = d.svg;
		var q = d.TrackerMixin = {
			drawTrackerPoint: function () {
				var a = this,
					b = a.chart,
					c = b.pointer,
					e = function (a) {
						var b = c.getPointFromEvent(a);
						"undefined" !== typeof b && (c.isDirectTouch = !0, b.onMouseOver(a))
					},
					d;
				a.points.forEach(function (a) {
					d = A(a.dataLabels) ? a.dataLabels :
						a.dataLabel ? [a.dataLabel] : [];
					a.graphic && (a.graphic.element.point = a);
					d.forEach(function (b) {
						b.div ? b.div.point = a : b.element.point = a
					})
				});
				a._hasTracking || (a.trackerGroups.forEach(function (d) {
					if (a[d]) {
						a[d].addClass("highcharts-tracker").on("mouseover", e).on("mouseout", function (a) {
							c.onTrackerMouseOut(a)
						});
						if (E) a[d].on("touchstart", e);
						!b.styledMode && a.options.cursor && a[d].css(t).css({
							cursor: a.options.cursor
						})
					}
				}), a._hasTracking = !0);
				n(this, "afterDrawTracker")
			},
			drawTrackerGraph: function () {
				var a = this,
					b = a.options,
					c = b.trackByArea,
					e = [].concat(c ? a.areaPath : a.graphPath),
					d = e.length,
					f = a.chart,
					h = f.pointer,
					k = f.renderer,
					q = f.options.tooltip.snap,
					t = a.tracker,
					p, y = function () {
						if (f.hoverSeries !== a) a.onMouseOver()
					},
					u = "rgba(192,192,192," + (g ? .0001 : .002) + ")";
				if (d && !c)
					for (p = d + 1; p--;) "M" === e[p] && e.splice(p + 1, 0, e[p + 1] - q, e[p + 2], "L"), (p && "M" === e[p] || p === d) && e.splice(p, 0, "L", e[p - 2] + q, e[p - 1]);
				t ? t.attr({
					d: e
				}) : a.graph && (a.tracker = k.path(e).attr({
					visibility: a.visible ? "visible" : "hidden",
					zIndex: 2
				}).addClass(c ? "highcharts-tracker-area" :
					"highcharts-tracker-line").add(a.group), f.styledMode || a.tracker.attr({
					"stroke-linejoin": "round",
					stroke: u,
					fill: c ? u : "none",
					"stroke-width": a.graph.strokeWidth() + (c ? 0 : 2 * q)
				}), [a.tracker, a.markerGroup].forEach(function (a) {
					a.addClass("highcharts-tracker").on("mouseover", y).on("mouseout", function (a) {
						h.onTrackerMouseOut(a)
					});
					b.cursor && !f.styledMode && a.css({
						cursor: b.cursor
					});
					if (E) a.on("touchstart", y)
				}));
				n(this, "afterDrawTracker")
			}
		};
		b.column && (b.column.prototype.drawTracker = q.drawTrackerPoint);
		b.pie && (b.pie.prototype.drawTracker =
			q.drawTrackerPoint);
		b.scatter && (b.scatter.prototype.drawTracker = q.drawTrackerPoint);
		F(h.prototype, {
			setItemEvents: function (a, b, d) {
				var f = this,
					g = f.chart.renderer.boxWrapper,
					h = a instanceof c,
					k = "highcharts-legend-" + (h ? "point" : "series") + "-active",
					m = f.chart.styledMode;
				(d ? b : a.legendGroup).on("mouseover", function () {
					a.visible && f.allItems.forEach(function (b) {
						a !== b && b.setState("inactive", !h)
					});
					a.setState("hover");
					a.visible && g.addClass(k);
					m || b.css(f.options.itemHoverStyle)
				}).on("mouseout", function () {
					f.chart.styledMode ||
						b.css(e(a.visible ? f.itemStyle : f.itemHiddenStyle));
					f.allItems.forEach(function (b) {
						a !== b && b.setState("", !h)
					});
					g.removeClass(k);
					a.setState()
				}).on("click", function (b) {
					var c = function () {
						a.setVisible && a.setVisible();
						f.allItems.forEach(function (b) {
							a !== b && b.setState(a.visible ? "inactive" : "", !h)
						})
					};
					g.removeClass(k);
					b = {
						browserEvent: b
					};
					a.firePointEvent ? a.firePointEvent("legendItemClick", b, c) : n(a, "legendItemClick", b, c)
				})
			},
			createCheckboxForItem: function (a) {
				a.checkbox = u("input", {
					type: "checkbox",
					className: "highcharts-legend-checkbox",
					checked: a.selected,
					defaultChecked: a.selected
				}, this.options.itemCheckboxStyle, this.chart.container);
				H(a.checkbox, "click", function (b) {
					n(a.series || a, "checkboxClick", {
						checked: b.target.checked,
						item: a
					}, function () {
						a.select()
					})
				})
			}
		});
		F(f.prototype, {
			showResetZoom: function () {
				function a() {
					b.zoomOut()
				}
				var b = this,
					c = y.lang,
					e = b.options.chart.resetZoomButton,
					d = e.theme,
					f = d.states,
					g = "chart" === e.relativeTo || "spaceBox" === e.relativeTo ? null : "plotBox";
				n(this, "beforeShowResetZoom", null, function () {
					b.resetZoomButton = b.renderer.button(c.resetZoom,
						null, null, a, d, f && f.hover).attr({
						align: e.position.align,
						title: c.resetZoomTitle
					}).addClass("highcharts-reset-zoom").add().align(e.position, !1, g)
				});
				n(this, "afterShowResetZoom")
			},
			zoomOut: function () {
				n(this, "selection", {
					resetSelection: !0
				}, this.zoom)
			},
			zoom: function (a) {
				var b = this,
					c, e = b.pointer,
					d = !1,
					f = b.inverted ? e.mouseDownX : e.mouseDownY;
				!a || a.resetSelection ? (b.axes.forEach(function (a) {
					c = a.zoom()
				}), e.initiated = !1) : a.xAxis.concat(a.yAxis).forEach(function (a) {
					var g = a.axis,
						h = b.inverted ? g.left : g.top,
						l = b.inverted ?
						h + g.width : h + g.height,
						k = g.isXAxis,
						m = !1;
					if (!k && f >= h && f <= l || k || !w(f)) m = !0;
					e[k ? "zoomX" : "zoomY"] && m && (c = g.zoom(a.min, a.max), g.displayBtn && (d = !0))
				});
				var g = b.resetZoomButton;
				d && !g ? b.showResetZoom() : !d && D(g) && (b.resetZoomButton = g.destroy());
				c && b.redraw(p(b.options.chart.animation, a && a.animation, 100 > b.pointCount))
			},
			pan: function (a, b) {
				var c = this,
					e = c.hoverPoints,
					d = c.options.chart,
					f;
				b = "object" === typeof b ? b : {
					enabled: b,
					type: "x"
				};
				d && d.panning && (d.panning = b);
				var g = b.type;
				n(this, "pan", {
					originalEvent: a
				}, function () {
					e &&
						e.forEach(function (a) {
							a.setState()
						});
					var b = [1];
					"xy" === g ? b = [1, 0] : "y" === g && (b = [0]);
					b.forEach(function (b) {
						var e = c[b ? "xAxis" : "yAxis"][0],
							d = e.options,
							g = e.horiz,
							h = a[g ? "chartX" : "chartY"];
						g = g ? "mouseDownX" : "mouseDownY";
						var l = c[g],
							k = (e.pointRange || 0) / 2,
							m = e.reversed && !c.inverted || !e.reversed && c.inverted ? -1 : 1,
							q = e.getExtremes(),
							r = e.toValue(l - h, !0) + k * m;
						m = e.toValue(l + e.len - h, !0) - k * m;
						var n = m < r;
						l = n ? m : r;
						r = n ? r : m;
						m = Math.min(q.dataMin, k ? q.min : e.toValue(e.toPixels(q.min) - e.minPixelPadding));
						k = Math.max(q.dataMax, k ? q.max :
							e.toValue(e.toPixels(q.max) + e.minPixelPadding));
						if (!d.ordinal) {
							b && (d = m - l, 0 < d && (r += d, l = m), d = r - k, 0 < d && (r = k, l -= d));
							if (e.series.length && l !== q.min && r !== q.max && b || e.panningState && l >= e.panningState.startMin && r <= e.panningState.startMax) e.setExtremes(l, r, !1, !1, {
								trigger: "pan"
							}), f = !0;
							c[g] = h
						}
					});
					f && c.redraw(!1);
					t(c.container, {
						cursor: "move"
					})
				})
			}
		});
		F(c.prototype, {
			select: function (a, b) {
				var c = this,
					e = c.series,
					d = e.chart;
				this.selectedStaging = a = p(a, !c.selected);
				c.firePointEvent(a ? "select" : "unselect", {
					accumulate: b
				}, function () {
					c.selected =
						c.options.selected = a;
					e.options.data[e.data.indexOf(c)] = c.options;
					c.setState(a && "select");
					b || d.getSelectedPoints().forEach(function (a) {
						var b = a.series;
						a.selected && a !== c && (a.selected = a.options.selected = !1, b.options.data[b.data.indexOf(a)] = a.options, a.setState(d.hoverPoints && b.options.inactiveOtherPoints ? "inactive" : ""), a.firePointEvent("unselect"))
					})
				});
				delete this.selectedStaging
			},
			onMouseOver: function (a) {
				var b = this.series.chart,
					c = b.pointer;
				a = a ? c.normalize(a) : c.getChartCoordinatesFromPoint(this, b.inverted);
				c.runPointActions(a, this)
			},
			onMouseOut: function () {
				var a = this.series.chart;
				this.firePointEvent("mouseOut");
				this.series.options.inactiveOtherPoints || (a.hoverPoints || []).forEach(function (a) {
					a.setState()
				});
				a.hoverPoints = a.hoverPoint = null
			},
			importEvents: function () {
				if (!this.hasImportedEvents) {
					var a = this,
						b = e(a.series.options.point, a.options).events;
					a.events = b;
					x(b, function (b, c) {
						d.isFunction(b) && H(a, c, b)
					});
					this.hasImportedEvents = !0
				}
			},
			setState: function (a, b) {
				var c = this.series,
					e = this.state,
					d = c.options.states[a ||
						"normal"] || {},
					f = k[c.type].marker && c.options.marker,
					g = f && !1 === f.enabled,
					h = f && f.states && f.states[a || "normal"] || {},
					m = !1 === h.enabled,
					q = c.stateMarkerGraphic,
					t = this.marker || {},
					y = c.chart,
					u = c.halo,
					A, C = f && c.markerAttribs;
				a = a || "";
				if (!(a === this.state && !b || this.selected && "select" !== a || !1 === d.enabled || a && (m || g && !1 === h.enabled) || a && t.states && t.states[a] && !1 === t.states[a].enabled)) {
					this.state = a;
					C && (A = c.markerAttribs(this, a));
					if (this.graphic) {
						e && this.graphic.removeClass("highcharts-point-" + e);
						a && this.graphic.addClass("highcharts-point-" +
							a);
						if (!y.styledMode) {
							var x = c.pointAttribs(this, a);
							var w = p(y.options.chart.animation, d.animation);
							c.options.inactiveOtherPoints && ((this.dataLabels || []).forEach(function (a) {
								a && a.animate({
									opacity: x.opacity
								}, w)
							}), this.connector && this.connector.animate({
								opacity: x.opacity
							}, w));
							this.graphic.animate(x, w)
						}
						A && this.graphic.animate(A, p(y.options.chart.animation, h.animation, f.animation));
						q && q.hide()
					} else {
						if (a && h) {
							e = t.symbol || c.symbol;
							q && q.currentSymbol !== e && (q = q.destroy());
							if (A)
								if (q) q[b ? "animate" : "attr"]({
									x: A.x,
									y: A.y
								});
								else e && (c.stateMarkerGraphic = q = y.renderer.symbol(e, A.x, A.y, A.width, A.height).add(c.markerGroup), q.currentSymbol = e);
							!y.styledMode && q && q.attr(c.pointAttribs(this, a))
						}
						q && (q[a && this.isInside ? "show" : "hide"](), q.element.point = this)
					}
					a = d.halo;
					d = (q = this.graphic || q) && q.visibility || "inherit";
					a && a.size && q && "hidden" !== d && !this.isCluster ? (u || (c.halo = u = y.renderer.path().add(q.parentGroup)), u.show()[b ? "animate" : "attr"]({
						d: this.haloPath(a.size)
					}), u.attr({
						"class": "highcharts-halo highcharts-color-" + p(this.colorIndex,
							c.colorIndex) + (this.className ? " " + this.className : ""),
						visibility: d,
						zIndex: -1
					}), u.point = this, y.styledMode || u.attr(F({
						fill: this.color || c.color,
						"fill-opacity": a.opacity
					}, a.attributes))) : u && u.point && u.point.haloPath && u.animate({
						d: u.point.haloPath(0)
					}, null, u.hide);
					n(this, "afterSetState")
				}
			},
			haloPath: function (a) {
				return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX) - a, this.plotY - a, 2 * a, 2 * a)
			}
		});
		F(a.prototype, {
			onMouseOver: function () {
				var a = this.chart,
					b = a.hoverSeries;
				if (b && b !== this) b.onMouseOut();
				this.options.events.mouseOver && n(this, "mouseOver");
				this.setState("hover");
				a.hoverSeries = this
			},
			onMouseOut: function () {
				var a = this.options,
					b = this.chart,
					c = b.tooltip,
					e = b.hoverPoint;
				b.hoverSeries = null;
				if (e) e.onMouseOut();
				this && a.events.mouseOut && n(this, "mouseOut");
				!c || this.stickyTracking || c.shared && !this.noSharedTooltip || c.hide();
				b.series.forEach(function (a) {
					a.setState("", !0)
				})
			},
			setState: function (a, b) {
				var c = this,
					e = c.options,
					d = c.graph,
					f = e.inactiveOtherPoints,
					g = e.states,
					h = e.lineWidth,
					k = e.opacity,
					m = p(g[a ||
						"normal"] && g[a || "normal"].animation, c.chart.options.chart.animation);
				e = 0;
				a = a || "";
				if (c.state !== a && ([c.group, c.markerGroup, c.dataLabelsGroup].forEach(function (b) {
						b && (c.state && b.removeClass("highcharts-series-" + c.state), a && b.addClass("highcharts-series-" + a))
					}), c.state = a, !c.chart.styledMode)) {
					if (g[a] && !1 === g[a].enabled) return;
					a && (h = g[a].lineWidth || h + (g[a].lineWidthPlus || 0), k = p(g[a].opacity, k));
					if (d && !d.dashstyle)
						for (g = {
								"stroke-width": h
							}, d.animate(g, m); c["zone-graph-" + e];) c["zone-graph-" + e].attr(g), e +=
							1;
					f || [c.group, c.markerGroup, c.dataLabelsGroup, c.labelBySeries].forEach(function (a) {
						a && a.animate({
							opacity: k
						}, m)
					})
				}
				b && f && c.points && c.setAllPointsToState(a)
			},
			setAllPointsToState: function (a) {
				this.points.forEach(function (b) {
					b.setState && b.setState(a)
				})
			},
			setVisible: function (a, b) {
				var c = this,
					e = c.chart,
					d = c.legendItem,
					f = e.options.chart.ignoreHiddenSeries,
					g = c.visible;
				var h = (c.visible = a = c.options.visible = c.userOptions.visible = "undefined" === typeof a ? !g : a) ? "show" : "hide";
				["group", "dataLabelsGroup", "markerGroup",
					"tracker", "tt"
				].forEach(function (a) {
					if (c[a]) c[a][h]()
				});
				if (e.hoverSeries === c || (e.hoverPoint && e.hoverPoint.series) === c) c.onMouseOut();
				d && e.legend.colorizeItem(c, a);
				c.isDirty = !0;
				c.options.stacking && e.series.forEach(function (a) {
					a.options.stacking && a.visible && (a.isDirty = !0)
				});
				c.linkedSeries.forEach(function (b) {
					b.setVisible(a, !1)
				});
				f && (e.isDirtyBox = !0);
				n(c, h);
				!1 !== b && e.redraw()
			},
			show: function () {
				this.setVisible(!0)
			},
			hide: function () {
				this.setVisible(!1)
			},
			select: function (a) {
				this.selected = a = this.options.selected =
					"undefined" === typeof a ? !this.selected : a;
				this.checkbox && (this.checkbox.checked = a);
				n(this, a ? "select" : "unselect")
			},
			drawTracker: q.drawTrackerGraph
		})
	});
	M(w, "parts/Responsive.js", [w["parts/Globals.js"], w["parts/Utilities.js"]], function (d, f) {
		var w = f.isArray,
			F = f.isObject,
			A = f.objectEach,
			D = f.pick,
			x = f.splat;
		f = d.Chart;
		f.prototype.setResponsive = function (f, A) {
			var p = this.options.responsive,
				t = [],
				y = this.currentResponsive;
			!A && p && p.rules && p.rules.forEach(function (f) {
				"undefined" === typeof f._id && (f._id = d.uniqueKey());
				this.matchResponsiveRule(f, t)
			}, this);
			A = d.merge.apply(0, t.map(function (f) {
				return d.find(p.rules, function (d) {
					return d._id === f
				}).chartOptions
			}));
			A.isResponsiveOptions = !0;
			t = t.toString() || void 0;
			t !== (y && y.ruleIds) && (y && this.update(y.undoOptions, f, !0), t ? (y = this.currentOptions(A), y.isResponsiveOptions = !0, this.currentResponsive = {
				ruleIds: t,
				mergedOptions: A,
				undoOptions: y
			}, this.update(A, f, !0)) : this.currentResponsive = void 0)
		};
		f.prototype.matchResponsiveRule = function (d, f) {
			var p = d.condition;
			(p.callback || function () {
				return this.chartWidth <=
					D(p.maxWidth, Number.MAX_VALUE) && this.chartHeight <= D(p.maxHeight, Number.MAX_VALUE) && this.chartWidth >= D(p.minWidth, 0) && this.chartHeight >= D(p.minHeight, 0)
			}).call(this) && f.push(d._id)
		};
		f.prototype.currentOptions = function (d) {
			function f(d, k, n, t) {
				var h;
				A(d, function (e, c) {
					if (!t && -1 < p.collectionsWithUpdate.indexOf(c))
						for (e = x(e), n[c] = [], h = 0; h < e.length; h++) k[c][h] && (n[c][h] = {}, f(e[h], k[c][h], n[c][h], t + 1));
					else F(e) ? (n[c] = w(e) ? [] : {}, f(e, k[c] || {}, n[c], t + 1)) : n[c] = "undefined" === typeof k[c] ? null : k[c]
				})
			}
			var p = this,
				t = {};
			f(d, this.options, t, 0);
			return t
		}
	});
	M(w, "masters/highcharts.src.js", [w["parts/Globals.js"], w["parts/Utilities.js"]], function (d, f) {
		var w = f.extend;
		w(d, {
			animObject: f.animObject,
			arrayMax: f.arrayMax,
			arrayMin: f.arrayMin,
			attr: f.attr,
			correctFloat: f.correctFloat,
			defined: f.defined,
			destroyObjectProperties: f.destroyObjectProperties,
			discardElement: f.discardElement,
			erase: f.erase,
			extend: f.extend,
			extendClass: f.extendClass,
			isArray: f.isArray,
			isClass: f.isClass,
			isDOMElement: f.isDOMElement,
			isNumber: f.isNumber,
			isObject: f.isObject,
			isString: f.isString,
			numberFormat: f.numberFormat,
			objectEach: f.objectEach,
			offset: f.offset,
			pad: f.pad,
			pick: f.pick,
			pInt: f.pInt,
			relativeLength: f.relativeLength,
			setAnimation: f.setAnimation,
			splat: f.splat,
			syncTimeout: f.syncTimeout,
			wrap: f.wrap
		});
		return d
	});
	M(w, "parts-map/MapAxis.js", [w["parts/Globals.js"], w["parts/Utilities.js"]], function (d, f) {
		var w = f.pick;
		f = d.addEvent;
		d = d.Axis;
		f(d, "getSeriesExtremes", function () {
			var d = [];
			this.isXAxis && (this.series.forEach(function (f, w) {
				f.useMapGeometry && (d[w] = f.xData, f.xData = [])
			}), this.seriesXData = d)
		});
		f(d, "afterGetSeriesExtremes", function () {
			var d = this.seriesXData,
				f;
			if (this.isXAxis) {
				var D = w(this.dataMin, Number.MAX_VALUE);
				var x = w(this.dataMax, -Number.MAX_VALUE);
				this.series.forEach(function (p, A) {
					p.useMapGeometry && (D = Math.min(D, w(p.minX, D)), x = Math.max(x, w(p.maxX, x)), p.xData = d[A], f = !0)
				});
				f && (this.dataMin = D, this.dataMax = x);
				delete this.seriesXData
			}
		});
		f(d, "afterSetAxisTranslation", function () {
			var d = this.chart;
			var f = d.plotWidth / d.plotHeight;
			d = d.xAxis[0];
			var w;
			"yAxis" === this.coll &&
				"undefined" !== typeof d.transA && this.series.forEach(function (d) {
					d.preserveAspectRatio && (w = !0)
				});
			if (w && (this.transA = d.transA = Math.min(this.transA, d.transA), f /= (d.max - d.min) / (this.max - this.min), f = 1 > f ? this : d, d = (f.max - f.min) * f.transA, f.pixelPadding = f.len - d, f.minPixelPadding = f.pixelPadding / 2, d = f.fixTo)) {
				d = d[1] - f.toValue(d[0], !0);
				d *= f.transA;
				if (Math.abs(d) > f.minPixelPadding || f.min === f.dataMin && f.max === f.dataMax) d = 0;
				f.minPixelPadding -= d
			}
		});
		f(d, "render", function () {
			this.fixTo = null
		})
	});
	M(w, "parts-map/ColorSeriesMixin.js",
		[w["parts/Globals.js"]],
		function (d) {
			d.colorPointMixin = {
				setVisible: function (d) {
					var f = this,
						w = d ? "show" : "hide";
					f.visible = f.options.visible = !!d;
					["graphic", "dataLabel"].forEach(function (d) {
						if (f[d]) f[d][w]()
					})
				}
			};
			d.colorSeriesMixin = {
				optionalAxis: "colorAxis",
				colorAxis: 0,
				translateColors: function () {
					var d = this,
						w = this.options.nullColor,
						F = this.colorAxis,
						A = this.colorKey;
					(this.data.length ? this.data : this.points).forEach(function (f) {
						var x = f[A];
						if (x = f.options.color || (f.isNull ? w : F && "undefined" !== typeof x ? F.toColor(x,
								f) : f.color || d.color)) f.color = x
					})
				}
			}
		});
	M(w, "parts-map/ColorAxis.js", [w["parts/Globals.js"], w["parts/Utilities.js"]], function (d, f) {
		var w = f.erase,
			F = f.extend,
			A = f.isNumber,
			D = f.pick,
			x = f.splat;
		f = d.addEvent;
		var p = d.Axis,
			H = d.Chart,
			u = d.Series,
			t = d.Point,
			y = d.color,
			k = d.Legend,
			n = d.LegendSymbolMixin,
			E = d.colorPointMixin,
			h = d.noop,
			e = d.merge;
		F(u.prototype, d.colorSeriesMixin);
		F(t.prototype, E);
		H.prototype.collectionsWithUpdate.push("colorAxis");
		H.prototype.collectionsWithInit.colorAxis = [H.prototype.addColorAxis];
		var c =
			d.ColorAxis = function () {
				this.init.apply(this, arguments)
			};
		F(c.prototype, p.prototype);
		F(c.prototype, {
			defaultColorAxisOptions: {
				lineWidth: 0,
				minPadding: 0,
				maxPadding: 0,
				gridLineWidth: 1,
				tickPixelInterval: 72,
				startOnTick: !0,
				endOnTick: !0,
				offset: 0,
				marker: {
					animation: {
						duration: 50
					},
					width: .01,
					color: "#999999"
				},
				labels: {
					overflow: "justify",
					rotation: 0
				},
				minColor: "#e6ebf5",
				maxColor: "#003399",
				tickLength: 5,
				showInLegend: !0
			},
			keepProps: ["legendGroup", "legendItemHeight", "legendItemWidth", "legendItem", "legendSymbol"].concat(p.prototype.keepProps),
			init: function (a, b) {
				this.coll = "colorAxis";
				var c = this.buildOptions.call(a, this.defaultColorAxisOptions, b);
				p.prototype.init.call(this, a, c);
				b.dataClasses && this.initDataClasses(b);
				this.initStops();
				this.horiz = !c.opposite;
				this.zoomEnabled = !1;
				this.defaultLegendLength = 200
			},
			initDataClasses: function (a) {
				var b = this.chart,
					c, d = 0,
					f = b.options.chart.colorCount,
					h = this.options,
					k = a.dataClasses.length;
				this.dataClasses = c = [];
				this.legendItems = [];
				a.dataClasses.forEach(function (a, g) {
					a = e(a);
					c.push(a);
					if (b.styledMode || !a.color) "category" ===
						h.dataClassColor ? (b.styledMode || (g = b.options.colors, f = g.length, a.color = g[d]), a.colorIndex = d, d++, d === f && (d = 0)) : a.color = y(h.minColor).tweenTo(y(h.maxColor), 2 > k ? .5 : g / (k - 1))
				})
			},
			hasData: function () {
				return !(!this.tickPositions || !this.tickPositions.length)
			},
			setTickPositions: function () {
				if (!this.dataClasses) return p.prototype.setTickPositions.call(this)
			},
			initStops: function () {
				this.stops = this.options.stops || [
					[0, this.options.minColor],
					[1, this.options.maxColor]
				];
				this.stops.forEach(function (a) {
					a.color = y(a[1])
				})
			},
			buildOptions: function (a, b) {
				var c = this.options.legend,
					d = b.layout ? "vertical" !== b.layout : "vertical" !== c.layout;
				return e(a, {
					side: d ? 2 : 1,
					reversed: !d
				}, b, {
					opposite: !d,
					showEmpty: !1,
					title: null,
					visible: c.enabled && (b ? !1 !== b.visible : !0)
				})
			},
			setOptions: function (a) {
				p.prototype.setOptions.call(this, a);
				this.options.crosshair = this.options.marker
			},
			setAxisSize: function () {
				var a = this.legendSymbol,
					b = this.chart,
					c = b.options.legend || {},
					e, d;
				a ? (this.left = c = a.attr("x"), this.top = e = a.attr("y"), this.width = d = a.attr("width"), this.height =
					a = a.attr("height"), this.right = b.chartWidth - c - d, this.bottom = b.chartHeight - e - a, this.len = this.horiz ? d : a, this.pos = this.horiz ? c : e) : this.len = (this.horiz ? c.symbolWidth : c.symbolHeight) || this.defaultLegendLength
			},
			normalizedValue: function (a) {
				this.isLog && (a = this.val2lin(a));
				return 1 - (this.max - a) / (this.max - this.min || 1)
			},
			toColor: function (a, b) {
				var c = this.stops,
					e = this.dataClasses,
					d;
				if (e)
					for (d = e.length; d--;) {
						var f = e[d];
						var h = f.from;
						c = f.to;
						if (("undefined" === typeof h || a >= h) && ("undefined" === typeof c || a <= c)) {
							var k = f.color;
							b && (b.dataClass = d, b.colorIndex = f.colorIndex);
							break
						}
					} else {
						a = this.normalizedValue(a);
						for (d = c.length; d-- && !(a > c[d][0]););
						h = c[d] || c[d + 1];
						c = c[d + 1] || h;
						a = 1 - (c[0] - a) / (c[0] - h[0] || 1);
						k = h.color.tweenTo(c.color, a)
					}
				return k
			},
			getOffset: function () {
				var a = this.legendGroup,
					b = this.chart.axisOffset[this.side];
				a && (this.axisParent = a, p.prototype.getOffset.call(this), this.added || (this.added = !0, this.labelLeft = 0, this.labelRight = this.width), this.chart.axisOffset[this.side] = b)
			},
			setLegendColor: function () {
				var a = this.reversed;
				var b = a ? 1 : 0;
				a = a ? 0 : 1;
				b = this.horiz ? [b, 0, a, 0] : [0, a, 0, b];
				this.legendColor = {
					linearGradient: {
						x1: b[0],
						y1: b[1],
						x2: b[2],
						y2: b[3]
					},
					stops: this.stops
				}
			},
			drawLegendSymbol: function (a, b) {
				var c = a.padding,
					e = a.options,
					d = this.horiz,
					f = D(e.symbolWidth, d ? this.defaultLegendLength : 12),
					h = D(e.symbolHeight, d ? 12 : this.defaultLegendLength),
					k = D(e.labelPadding, d ? 16 : 30);
				e = D(e.itemDistance, 10);
				this.setLegendColor();
				b.legendSymbol = this.chart.renderer.rect(0, a.baseline - 11, f, h).attr({
					zIndex: 1
				}).add(b.legendGroup);
				this.legendItemWidth =
					f + c + (d ? e : k);
				this.legendItemHeight = h + c + (d ? k : 0)
			},
			setState: function (a) {
				this.series.forEach(function (b) {
					b.setState(a)
				})
			},
			visible: !0,
			setVisible: h,
			getSeriesExtremes: function () {
				var a = this.series,
					b = a.length,
					c;
				this.dataMin = Infinity;
				for (this.dataMax = -Infinity; b--;) {
					var e = a[b];
					var d = e.colorKey = D(e.options.colorKey, e.colorKey, e.pointValKey, e.zoneAxis, "y");
					var f = e.pointArrayMap;
					var h = e[d + "Min"] && e[d + "Max"];
					if (e[d + "Data"]) var k = e[d + "Data"];
					else if (f) {
						k = [];
						f = f.indexOf(d);
						var n = e.yData;
						if (0 <= f && n)
							for (c = 0; c < n.length; c++) k.push(D(n[c][f],
								n[c]))
					} else k = e.yData;
					h ? (e.minColorValue = e[d + "Min"], e.maxColorValue = e[d + "Max"]) : (u.prototype.getExtremes.call(e, k), e.minColorValue = e.dataMin, e.maxColorValue = e.dataMax);
					"undefined" !== typeof e.minColorValue && (this.dataMin = Math.min(this.dataMin, e.minColorValue), this.dataMax = Math.max(this.dataMax, e.maxColorValue));
					h || u.prototype.getExtremes.call(e)
				}
			},
			drawCrosshair: function (a, b) {
				var c = b && b.plotX,
					e = b && b.plotY,
					d = this.pos,
					f = this.len;
				if (b) {
					var h = this.toPixels(b[b.series.colorKey]);
					h < d ? h = d - 2 : h > d + f && (h = d + f +
						2);
					b.plotX = h;
					b.plotY = this.len - h;
					p.prototype.drawCrosshair.call(this, a, b);
					b.plotX = c;
					b.plotY = e;
					this.cross && !this.cross.addedToColorAxis && this.legendGroup && (this.cross.addClass("highcharts-coloraxis-marker").add(this.legendGroup), this.cross.addedToColorAxis = !0, this.chart.styledMode || this.cross.attr({
						fill: this.crosshair.color
					}))
				}
			},
			getPlotLinePath: function (a) {
				var b = a.translatedValue;
				return A(b) ? this.horiz ? ["M", b - 4, this.top - 6, "L", b + 4, this.top - 6, b, this.top, "Z"] : ["M", this.left, b, "L", this.left - 6, b + 6, this.left -
					6, b - 6, "Z"
				] : p.prototype.getPlotLinePath.apply(this, arguments)
			},
			update: function (a, b) {
				var c = this.chart,
					d = c.legend,
					f = this.buildOptions.call(c, {}, a);
				this.series.forEach(function (a) {
					a.isDirtyData = !0
				});
				(a.dataClasses && d.allItems || this.dataClasses) && this.destroyItems();
				c.options[this.coll] = e(this.userOptions, f);
				p.prototype.update.call(this, f, b);
				this.legendItem && (this.setLegendColor(), d.colorizeItem(this, !0))
			},
			destroyItems: function () {
				var a = this.chart;
				this.legendItem ? a.legend.destroyItem(this) : this.legendItems &&
					this.legendItems.forEach(function (b) {
						a.legend.destroyItem(b)
					});
				a.isDirtyLegend = !0
			},
			remove: function (a) {
				this.destroyItems();
				p.prototype.remove.call(this, a)
			},
			getDataClassLegendSymbols: function () {
				var a = this,
					b = this.chart,
					c = this.legendItems,
					e = b.options.legend,
					d = e.valueDecimals,
					f = e.valueSuffix || "",
					k;
				c.length || this.dataClasses.forEach(function (e, g) {
					var l = !0,
						m = e.from,
						q = e.to,
						r = b.numberFormatter;
					k = "";
					"undefined" === typeof m ? k = "< " : "undefined" === typeof q && (k = "> ");
					"undefined" !== typeof m && (k += r(m, d) + f);
					"undefined" !==
					typeof m && "undefined" !== typeof q && (k += " - ");
					"undefined" !== typeof q && (k += r(q, d) + f);
					c.push(F({
						chart: b,
						name: k,
						options: {},
						drawLegendSymbol: n.drawRectangle,
						visible: !0,
						setState: h,
						isDataClass: !0,
						setVisible: function () {
							l = this.visible = !l;
							a.series.forEach(function (a) {
								a.points.forEach(function (a) {
									a.dataClass === g && a.setVisible(l)
								})
							});
							b.legend.colorizeItem(this, l)
						}
					}, e))
				});
				return c
			},
			beforePadding: !1,
			name: ""
		});
		["fill", "stroke"].forEach(function (a) {
			d.Fx.prototype[a + "Setter"] = function () {
				this.elem.attr(a, y(this.start).tweenTo(y(this.end),
					this.pos), null, !0)
			}
		});
		f(H, "afterGetAxes", function () {
			var a = this,
				b = a.options;
			this.colorAxis = [];
			b.colorAxis && (b.colorAxis = x(b.colorAxis), b.colorAxis.forEach(function (b, e) {
				b.index = e;
				new c(a, b)
			}))
		});
		f(u, "bindAxes", function () {
			var a = this.axisTypes;
			a ? -1 === a.indexOf("colorAxis") && a.push("colorAxis") : this.axisTypes = ["colorAxis"]
		});
		f(k, "afterGetAllItems", function (a) {
			var b = [],
				c, e;
			(this.chart.colorAxis || []).forEach(function (e) {
				(c = e.options) && c.showInLegend && (c.dataClasses && c.visible ? b = b.concat(e.getDataClassLegendSymbols()) :
					c.visible && b.push(e), e.series.forEach(function (b) {
						if (!b.options.showInLegend || c.dataClasses) "point" === b.options.legendType ? b.points.forEach(function (b) {
							w(a.allItems, b)
						}) : w(a.allItems, b)
					}))
			});
			for (e = b.length; e--;) a.allItems.unshift(b[e])
		});
		f(k, "afterColorizeItem", function (a) {
			a.visible && a.item.legendColor && a.item.legendSymbol.attr({
				fill: a.item.legendColor
			})
		});
		f(k, "afterUpdate", function () {
			var a = this.chart.colorAxis;
			a && a.forEach(function (a, c, e) {
				a.update({}, e)
			})
		});
		f(u, "afterTranslate", function () {
			(this.chart.colorAxis &&
				this.chart.colorAxis.length || this.colorAttribs) && this.translateColors()
		})
	});
	M(w, "parts-map/ColorMapSeriesMixin.js", [w["parts/Globals.js"], w["parts/Utilities.js"]], function (d, f) {
		var w = f.defined;
		f = d.noop;
		var F = d.seriesTypes;
		d.colorMapPointMixin = {
			dataLabelOnNull: !0,
			isValid: function () {
				return null !== this.value && Infinity !== this.value && -Infinity !== this.value
			},
			setState: function (f) {
				d.Point.prototype.setState.call(this, f);
				this.graphic && this.graphic.attr({
					zIndex: "hover" === f ? 1 : 0
				})
			}
		};
		d.colorMapSeriesMixin = {
			pointArrayMap: ["value"],
			axisTypes: ["xAxis", "yAxis", "colorAxis"],
			trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
			getSymbol: f,
			parallelArrays: ["x", "y", "value"],
			colorKey: "value",
			pointAttribs: F.column.prototype.pointAttribs,
			colorAttribs: function (d) {
				var f = {};
				w(d.color) && (f[this.colorProp || "fill"] = d.color);
				return f
			}
		}
	});
	M(w, "parts-map/MapNavigation.js", [w["parts/Globals.js"], w["parts/Utilities.js"]], function (d, f) {
		function w(d) {
			d && (d.preventDefault && d.preventDefault(), d.stopPropagation && d.stopPropagation(), d.cancelBubble = !0)
		}

		function F(d) {
			this.init(d)
		}
		var A = f.extend,
			D = f.objectEach,
			x = f.pick,
			p = d.addEvent;
		f = d.Chart;
		var H = d.doc,
			u = d.merge;
		F.prototype.init = function (d) {
			this.chart = d;
			d.mapNavButtons = []
		};
		F.prototype.update = function (d) {
			var f = this.chart,
				k = f.options.mapNavigation,
				n, t, h, e, c, a = function (a) {
					this.handler.call(f, a);
					w(a)
				},
				b = f.mapNavButtons;
			d && (k = f.options.mapNavigation = u(f.options.mapNavigation, d));
			for (; b.length;) b.pop().destroy();
			x(k.enableButtons, k.enabled) && !f.renderer.forExport && D(k.buttons, function (d, q) {
				n = u(k.buttonOptions,
					d);
				f.styledMode || (t = n.theme, t.style = u(n.theme.style, n.style), e = (h = t.states) && h.hover, c = h && h.select);
				d = f.renderer.button(n.text, 0, 0, a, t, e, c, 0, "zoomIn" === q ? "topbutton" : "bottombutton").addClass("highcharts-map-navigation highcharts-" + {
					zoomIn: "zoom-in",
					zoomOut: "zoom-out"
				} [q]).attr({
					width: n.width,
					height: n.height,
					title: f.options.lang[q],
					padding: n.padding,
					zIndex: 5
				}).add();
				d.handler = n.onclick;
				d.align(A(n, {
					width: d.width,
					height: 2 * d.height
				}), null, n.alignTo);
				p(d.element, "dblclick", w);
				b.push(d)
			});
			this.updateEvents(k)
		};
		F.prototype.updateEvents = function (d) {
			var f = this.chart;
			x(d.enableDoubleClickZoom, d.enabled) || d.enableDoubleClickZoomTo ? this.unbindDblClick = this.unbindDblClick || p(f.container, "dblclick", function (d) {
				f.pointer.onContainerDblClick(d)
			}) : this.unbindDblClick && (this.unbindDblClick = this.unbindDblClick());
			x(d.enableMouseWheelZoom, d.enabled) ? this.unbindMouseWheel = this.unbindMouseWheel || p(f.container, "undefined" === typeof H.onmousewheel ? "DOMMouseScroll" : "mousewheel", function (d) {
				f.pointer.onContainerMouseWheel(d);
				w(d);
				return !1
			}) : this.unbindMouseWheel && (this.unbindMouseWheel = this.unbindMouseWheel())
		};
		A(f.prototype, {
			fitToBox: function (d, f) {
				[
					["x", "width"],
					["y", "height"]
				].forEach(function (k) {
					var n = k[0];
					k = k[1];
					d[n] + d[k] > f[n] + f[k] && (d[k] > f[k] ? (d[k] = f[k], d[n] = f[n]) : d[n] = f[n] + f[k] - d[k]);
					d[k] > f[k] && (d[k] = f[k]);
					d[n] < f[n] && (d[n] = f[n])
				});
				return d
			},
			mapZoom: function (d, f, k, n, p) {
				var h = this.xAxis[0],
					e = h.max - h.min,
					c = x(f, h.min + e / 2),
					a = e * d;
				e = this.yAxis[0];
				var b = e.max - e.min,
					g = x(k, e.min + b / 2);
				b *= d;
				c = this.fitToBox({
					x: c - a * (n ? (n - h.pos) /
						h.len : .5),
					y: g - b * (p ? (p - e.pos) / e.len : .5),
					width: a,
					height: b
				}, {
					x: h.dataMin,
					y: e.dataMin,
					width: h.dataMax - h.dataMin,
					height: e.dataMax - e.dataMin
				});
				a = c.x <= h.dataMin && c.width >= h.dataMax - h.dataMin && c.y <= e.dataMin && c.height >= e.dataMax - e.dataMin;
				n && (h.fixTo = [n - h.pos, f]);
				p && (e.fixTo = [p - e.pos, k]);
				"undefined" === typeof d || a ? (h.setExtremes(void 0, void 0, !1), e.setExtremes(void 0, void 0, !1)) : (h.setExtremes(c.x, c.x + c.width, !1), e.setExtremes(c.y, c.y + c.height, !1));
				this.redraw()
			}
		});
		p(f, "beforeRender", function () {
			this.mapNavigation =
				new F(this);
			this.mapNavigation.update()
		});
		d.MapNavigation = F
	});
	M(w, "parts-map/MapPointer.js", [w["parts/Globals.js"], w["parts/Utilities.js"]], function (d, f) {
		var w = f.extend,
			F = f.pick;
		f = f.wrap;
		d = d.Pointer;
		w(d.prototype, {
			onContainerDblClick: function (d) {
				var f = this.chart;
				d = this.normalize(d);
				f.options.mapNavigation.enableDoubleClickZoomTo ? f.pointer.inClass(d.target, "highcharts-tracker") && f.hoverPoint && f.hoverPoint.zoomTo() : f.isInsidePlot(d.chartX - f.plotLeft, d.chartY - f.plotTop) && f.mapZoom(.5, f.xAxis[0].toValue(d.chartX),
					f.yAxis[0].toValue(d.chartY), d.chartX, d.chartY)
			},
			onContainerMouseWheel: function (d) {
				var f = this.chart;
				d = this.normalize(d);
				var x = d.detail || -(d.wheelDelta / 120);
				f.isInsidePlot(d.chartX - f.plotLeft, d.chartY - f.plotTop) && f.mapZoom(Math.pow(f.options.mapNavigation.mouseWheelSensitivity, x), f.xAxis[0].toValue(d.chartX), f.yAxis[0].toValue(d.chartY), d.chartX, d.chartY)
			}
		});
		f(d.prototype, "zoomOption", function (d) {
			var f = this.chart.options.mapNavigation;
			F(f.enableTouchZoom, f.enabled) && (this.chart.options.chart.pinchType =
				"xy");
			d.apply(this, [].slice.call(arguments, 1))
		});
		f(d.prototype, "pinchTranslate", function (d, f, x, p, w, u, t) {
			d.call(this, f, x, p, w, u, t);
			"map" === this.chart.options.chart.type && this.hasZoom && (d = p.scaleX > p.scaleY, this.pinchTranslateDirection(!d, f, x, p, w, u, t, d ? p.scaleX : p.scaleY))
		})
	});
	M(w, "parts-map/MapSeries.js", [w["parts/Globals.js"], w["parts/Utilities.js"]], function (d, f) {
		var w = f.extend,
			F = f.isArray,
			A = f.isNumber,
			D = f.objectEach,
			x = f.pick,
			p = f.splat;
		f = d.colorMapPointMixin;
		var H = d.merge,
			u = d.noop,
			t = d.fireEvent,
			y = d.Point,
			k = d.Series,
			n = d.seriesType,
			E = d.seriesTypes;
		n("map", "scatter", {
				animation: !1,
				dataLabels: {
					crop: !1,
					formatter: function () {
						return this.point.value
					},
					inside: !0,
					overflow: !1,
					padding: 0,
					verticalAlign: "middle"
				},
				marker: null,
				nullColor: "#f7f7f7",
				stickyTracking: !1,
				tooltip: {
					followPointer: !0,
					pointFormat: "{point.name}: {point.value}<br/>"
				},
				turboThreshold: 0,
				allAreas: !0,
				borderColor: "#cccccc",
				borderWidth: 1,
				joinBy: "hc-key",
				states: {
					hover: {
						halo: null,
						brightness: .2
					},
					normal: {
						animation: !0
					},
					select: {
						color: "#cccccc"
					},
					inactive: {
						opacity: 1
					}
				}
			},
			H(d.colorMapSeriesMixin, {
				type: "map",
				getExtremesFromAll: !0,
				useMapGeometry: !0,
				forceDL: !0,
				searchPoint: u,
				directTouch: !0,
				preserveAspectRatio: !0,
				pointArrayMap: ["value"],
				setOptions: function (d) {
					d = k.prototype.setOptions.call(this, d);
					var e = d.joinBy;
					null === e && (e = "_i");
					e = this.joinBy = p(e);
					e[1] || (e[1] = e[0]);
					return d
				},
				getBox: function (f) {
					var e = Number.MAX_VALUE,
						c = -e,
						a = e,
						b = -e,
						g = e,
						h = e,
						k = this.xAxis,
						n = this.yAxis,
						p;
					(f || []).forEach(function (f) {
						if (f.path) {
							"string" === typeof f.path && (f.path = d.splitPath(f.path));
							var k = f.path || [],
								l = k.length,
								m = !1,
								q = -e,
								n = e,
								t = -e,
								u = e,
								y = f.properties;
							if (!f._foundBox) {
								for (; l--;) A(k[l]) && (m ? (q = Math.max(q, k[l]), n = Math.min(n, k[l])) : (t = Math.max(t, k[l]), u = Math.min(u, k[l])), m = !m);
								f._midX = n + (q - n) * x(f.middleX, y && y["hc-middle-x"], .5);
								f._midY = u + (t - u) * x(f.middleY, y && y["hc-middle-y"], .5);
								f._maxX = q;
								f._minX = n;
								f._maxY = t;
								f._minY = u;
								f.labelrank = x(f.labelrank, (q - n) * (t - u));
								f._foundBox = !0
							}
							c = Math.max(c, f._maxX);
							a = Math.min(a, f._minX);
							b = Math.max(b, f._maxY);
							g = Math.min(g, f._minY);
							h = Math.min(f._maxX - f._minX, f._maxY - f._minY,
								h);
							p = !0
						}
					});
					p && (this.minY = Math.min(g, x(this.minY, e)), this.maxY = Math.max(b, x(this.maxY, -e)), this.minX = Math.min(a, x(this.minX, e)), this.maxX = Math.max(c, x(this.maxX, -e)), k && "undefined" === typeof k.options.minRange && (k.minRange = Math.min(5 * h, (this.maxX - this.minX) / 5, k.minRange || e)), n && "undefined" === typeof n.options.minRange && (n.minRange = Math.min(5 * h, (this.maxY - this.minY) / 5, n.minRange || e)))
				},
				hasData: function () {
					return !!this.processedXData.length
				},
				getExtremes: function () {
					k.prototype.getExtremes.call(this, this.valueData);
					this.chart.hasRendered && this.isDirtyData && this.getBox(this.options.data);
					this.valueMin = this.dataMin;
					this.valueMax = this.dataMax;
					this.dataMin = this.minY;
					this.dataMax = this.maxY
				},
				translatePath: function (d) {
					var e = !1,
						c = this.xAxis,
						a = this.yAxis,
						b = c.min,
						f = c.transA;
					c = c.minPixelPadding;
					var h = a.min,
						k = a.transA;
					a = a.minPixelPadding;
					var n, p = [];
					if (d)
						for (n = d.length; n--;) A(d[n]) ? (p[n] = e ? (d[n] - b) * f + c : (d[n] - h) * k + a, e = !e) : p[n] = d[n];
					return p
				},
				setData: function (f, e, c, a) {
					var b = this.options,
						g = this.chart.options.chart,
						h = g && g.map,
						m = b.mapData,
						n = this.joinBy,
						p = b.keys || this.pointArrayMap,
						l = [],
						t = {},
						u = this.chart.mapTransforms;
					!m && h && (m = "string" === typeof h ? d.maps[h] : h);
					f && f.forEach(function (a, c) {
						var e = 0;
						if (A(a)) f[c] = {
							value: a
						};
						else if (F(a)) {
							f[c] = {};
							!b.keys && a.length > p.length && "string" === typeof a[0] && (f[c]["hc-key"] = a[0], ++e);
							for (var g = 0; g < p.length; ++g, ++e) p[g] && "undefined" !== typeof a[e] && (0 < p[g].indexOf(".") ? d.Point.prototype.setNestedProperty(f[c], a[e], p[g]) : f[c][p[g]] = a[e])
						}
						n && "_i" === n[0] && (f[c]._i = c)
					});
					this.getBox(f);
					(this.chart.mapTransforms =
						u = g && g.mapTransforms || m && m["hc-transform"] || u) && D(u, function (a) {
						a.rotation && (a.cosAngle = Math.cos(a.rotation), a.sinAngle = Math.sin(a.rotation))
					});
					if (m) {
						"FeatureCollection" === m.type && (this.mapTitle = m.title, m = d.geojson(m, this.type, this));
						this.mapData = m;
						this.mapMap = {};
						for (u = 0; u < m.length; u++) g = m[u], h = g.properties, g._i = u, n[0] && h && h[n[0]] && (g[n[0]] = h[n[0]]), t[g[n[0]]] = g;
						this.mapMap = t;
						f && n[1] && f.forEach(function (a) {
							t[a[n[1]]] && l.push(t[a[n[1]]])
						});
						b.allAreas ? (this.getBox(m), f = f || [], n[1] && f.forEach(function (a) {
								l.push(a[n[1]])
							}),
							l = "|" + l.map(function (a) {
								return a && a[n[0]]
							}).join("|") + "|", m.forEach(function (b) {
								n[0] && -1 !== l.indexOf("|" + b[n[0]] + "|") || (f.push(H(b, {
									value: null
								})), a = !1)
							})) : this.getBox(l)
					}
					k.prototype.setData.call(this, f, e, c, a)
				},
				drawGraph: u,
				drawDataLabels: u,
				doFullTranslate: function () {
					return this.isDirtyData || this.chart.isResizing || this.chart.renderer.isVML || !this.baseTrans
				},
				translate: function () {
					var d = this,
						e = d.xAxis,
						c = d.yAxis,
						a = d.doFullTranslate();
					d.generatePoints();
					d.data.forEach(function (b) {
						A(b._midX) && A(b._midY) &&
							(b.plotX = e.toPixels(b._midX, !0), b.plotY = c.toPixels(b._midY, !0));
						a && (b.shapeType = "path", b.shapeArgs = {
							d: d.translatePath(b.path)
						})
					});
					t(d, "afterTranslate")
				},
				pointAttribs: function (d, e) {
					e = d.series.chart.styledMode ? this.colorAttribs(d) : E.column.prototype.pointAttribs.call(this, d, e);
					e["stroke-width"] = x(d.options[this.pointAttrToOptions && this.pointAttrToOptions["stroke-width"] || "borderWidth"], "inherit");
					return e
				},
				drawPoints: function () {
					var d = this,
						e = d.xAxis,
						c = d.yAxis,
						a = d.group,
						b = d.chart,
						f = b.renderer,
						k = this.baseTrans;
					d.transformGroup || (d.transformGroup = f.g().attr({
						scaleX: 1,
						scaleY: 1
					}).add(a), d.transformGroup.survive = !0);
					if (d.doFullTranslate()) b.hasRendered && !b.styledMode && d.points.forEach(function (a) {
						a.shapeArgs && (a.shapeArgs.fill = d.pointAttribs(a, a.state).fill)
					}), d.group = d.transformGroup, E.column.prototype.drawPoints.apply(d), d.group = a, d.points.forEach(function (a) {
						if (a.graphic) {
							var c = "";
							a.name && (c += "highcharts-name-" + a.name.replace(/ /g, "-").toLowerCase());
							a.properties && a.properties["hc-key"] && (c += " highcharts-key-" +
								a.properties["hc-key"].toLowerCase());
							c && a.graphic.addClass(c);
							b.styledMode && a.graphic.css(d.pointAttribs(a, a.selected && "select" || void 0))
						}
					}), this.baseTrans = {
						originX: e.min - e.minPixelPadding / e.transA,
						originY: c.min - c.minPixelPadding / c.transA + (c.reversed ? 0 : c.len / c.transA),
						transAX: e.transA,
						transAY: c.transA
					}, this.transformGroup.animate({
						translateX: 0,
						translateY: 0,
						scaleX: 1,
						scaleY: 1
					});
					else {
						var m = e.transA / k.transAX;
						var n = c.transA / k.transAY;
						var p = e.toPixels(k.originX, !0);
						var l = c.toPixels(k.originY, !0);
						.99 <
							m && 1.01 > m && .99 < n && 1.01 > n && (n = m = 1, p = Math.round(p), l = Math.round(l));
						var t = this.transformGroup;
						if (b.renderer.globalAnimation) {
							var u = t.attr("translateX");
							var y = t.attr("translateY");
							var w = t.attr("scaleX");
							var r = t.attr("scaleY");
							t.attr({
								animator: 0
							}).animate({
								animator: 1
							}, {
								step: function (a, b) {
									t.attr({
										translateX: u + (p - u) * b.pos,
										translateY: y + (l - y) * b.pos,
										scaleX: w + (m - w) * b.pos,
										scaleY: r + (n - r) * b.pos
									})
								}
							})
						} else t.attr({
							translateX: p,
							translateY: l,
							scaleX: m,
							scaleY: n
						})
					}
					b.styledMode || a.element.setAttribute("stroke-width",
						x(d.options[d.pointAttrToOptions && d.pointAttrToOptions["stroke-width"] || "borderWidth"], 1) / (m || 1));
					this.drawMapDataLabels()
				},
				drawMapDataLabels: function () {
					k.prototype.drawDataLabels.call(this);
					this.dataLabelsGroup && this.dataLabelsGroup.clip(this.chart.clipRect)
				},
				render: function () {
					var d = this,
						e = k.prototype.render;
					d.chart.renderer.isVML && 3E3 < d.data.length ? setTimeout(function () {
						e.call(d)
					}) : e.call(d)
				},
				animate: function (d) {
					var e = this.options.animation,
						c = this.group,
						a = this.xAxis,
						b = this.yAxis,
						f = a.pos,
						h = b.pos;
					this.chart.renderer.isSVG && (!0 === e && (e = {
						duration: 1E3
					}), d ? c.attr({
						translateX: f + a.len / 2,
						translateY: h + b.len / 2,
						scaleX: .001,
						scaleY: .001
					}) : (c.animate({
						translateX: f,
						translateY: h,
						scaleX: 1,
						scaleY: 1
					}, e), this.animate = null))
				},
				animateDrilldown: function (d) {
					var e = this.chart.plotBox,
						c = this.chart.drilldownLevels[this.chart.drilldownLevels.length - 1],
						a = c.bBox,
						b = this.chart.options.drilldown.animation;
					d || (d = Math.min(a.width / e.width, a.height / e.height), c.shapeArgs = {
						scaleX: d,
						scaleY: d,
						translateX: a.x,
						translateY: a.y
					}, this.points.forEach(function (a) {
						a.graphic &&
							a.graphic.attr(c.shapeArgs).animate({
								scaleX: 1,
								scaleY: 1,
								translateX: 0,
								translateY: 0
							}, b)
					}), this.animate = null)
				},
				drawLegendSymbol: d.LegendSymbolMixin.drawRectangle,
				animateDrillupFrom: function (d) {
					E.column.prototype.animateDrillupFrom.call(this, d)
				},
				animateDrillupTo: function (d) {
					E.column.prototype.animateDrillupTo.call(this, d)
				}
			}), w({
				applyOptions: function (d, e) {
					var c = this.series;
					d = y.prototype.applyOptions.call(this, d, e);
					e = c.joinBy;
					c.mapData && ((e = "undefined" !== typeof d[e[1]] && c.mapMap[d[e[1]]]) ? (c.xyFromShape &&
						(d.x = e._midX, d.y = e._midY), w(d, e)) : d.value = d.value || null);
					return d
				},
				onMouseOver: function (f) {
					d.clearTimeout(this.colorInterval);
					if (null !== this.value || this.series.options.nullInteraction) y.prototype.onMouseOver.call(this, f);
					else this.series.onMouseOut(f)
				},
				zoomTo: function () {
					var d = this.series;
					d.xAxis.setExtremes(this._minX, this._maxX, !1);
					d.yAxis.setExtremes(this._minY, this._maxY, !1);
					d.chart.redraw()
				}
			}, f));
		""
	});
	M(w, "parts-map/MapLineSeries.js", [w["parts/Globals.js"]], function (d) {
		var f = d.seriesType,
			w = d.seriesTypes;
		f("mapline", "map", {
			lineWidth: 1,
			fillColor: "none"
		}, {
			type: "mapline",
			colorProp: "stroke",
			pointAttrToOptions: {
				stroke: "color",
				"stroke-width": "lineWidth"
			},
			pointAttribs: function (d, f) {
				d = w.map.prototype.pointAttribs.call(this, d, f);
				d.fill = this.options.fillColor;
				return d
			},
			drawLegendSymbol: w.line.prototype.drawLegendSymbol
		});
		""
	});
	M(w, "parts-map/MapPointSeries.js", [w["parts/Globals.js"]], function (d) {
		var f = d.merge,
			w = d.Point,
			F = d.Series;
		d = d.seriesType;
		d("mappoint", "scatter", {
			dataLabels: {
				crop: !1,
				defer: !1,
				enabled: !0,
				formatter: function () {
					return this.point.name
				},
				overflow: !1,
				style: {
					color: "#000000"
				}
			}
		}, {
			type: "mappoint",
			forceDL: !0,
			drawDataLabels: function () {
				F.prototype.drawDataLabels.call(this);
				this.dataLabelsGroup && this.dataLabelsGroup.clip(this.chart.clipRect)
			}
		}, {
			applyOptions: function (d, D) {
				d = "undefined" !== typeof d.lat && "undefined" !== typeof d.lon ? f(d, this.series.chart.fromLatLonToPoint(d)) : d;
				return w.prototype.applyOptions.call(this, d, D)
			}
		});
		""
	});
	M(w, "parts-more/BubbleLegend.js", [w["parts/Globals.js"], w["parts/Utilities.js"]],
		function (d, f) {
			var w = f.arrayMax,
				F = f.arrayMin,
				A = f.isNumber,
				D = f.objectEach,
				x = f.pick;
			f = f.wrap;
			var p = d.Series,
				H = d.Legend,
				u = d.Chart,
				t = d.addEvent,
				y = d.color,
				k = d.merge,
				n = d.noop,
				E = d.stableSort,
				h = d.setOptions;
			h({
				legend: {
					bubbleLegend: {
						borderColor: void 0,
						borderWidth: 2,
						className: void 0,
						color: void 0,
						connectorClassName: void 0,
						connectorColor: void 0,
						connectorDistance: 60,
						connectorWidth: 1,
						enabled: !1,
						labels: {
							className: void 0,
							allowOverlap: !1,
							format: "",
							formatter: void 0,
							align: "right",
							style: {
								fontSize: 10,
								color: void 0
							},
							x: 0,
							y: 0
						},
						maxSize: 60,
						minSize: 10,
						legendIndex: 0,
						ranges: {
							value: void 0,
							borderColor: void 0,
							color: void 0,
							connectorColor: void 0
						},
						sizeBy: "area",
						sizeByAbsoluteValue: !1,
						zIndex: 1,
						zThreshold: 0
					}
				}
			});
			d.BubbleLegend = function (d, c) {
				this.init(d, c)
			};
			d.BubbleLegend.prototype = {
				init: function (d, c) {
					this.options = d;
					this.visible = !0;
					this.chart = c.chart;
					this.legend = c
				},
				setState: n,
				addToLegend: function (d) {
					d.splice(this.options.legendIndex, 0, this)
				},
				drawLegendSymbol: function (d) {
					var c = this.chart,
						a = this.options,
						b = x(d.options.itemDistance,
							20),
						e = a.ranges;
					var f = a.connectorDistance;
					this.fontMetrics = c.renderer.fontMetrics(a.labels.style.fontSize.toString() + "px");
					e && e.length && A(e[0].value) ? (E(e, function (a, b) {
						return b.value - a.value
					}), this.ranges = e, this.setOptions(), this.render(), c = this.getMaxLabelSize(), e = this.ranges[0].radius, d = 2 * e, f = f - e + c.width, f = 0 < f ? f : 0, this.maxLabel = c, this.movementX = "left" === a.labels.align ? f : 0, this.legendItemWidth = d + f + b, this.legendItemHeight = d + this.fontMetrics.h / 2) : d.options.bubbleLegend.autoRanges = !0
				},
				setOptions: function () {
					var d =
						this.ranges,
						c = this.options,
						a = this.chart.series[c.seriesIndex],
						b = this.legend.baseline,
						f = {
							"z-index": c.zIndex,
							"stroke-width": c.borderWidth
						},
						h = {
							"z-index": c.zIndex,
							"stroke-width": c.connectorWidth
						},
						m = this.getLabelStyles(),
						n = a.options.marker.fillOpacity,
						p = this.chart.styledMode;
					d.forEach(function (e, g) {
						p || (f.stroke = x(e.borderColor, c.borderColor, a.color), f.fill = x(e.color, c.color, 1 !== n ? y(a.color).setOpacity(n).get("rgba") : a.color), h.stroke = x(e.connectorColor, c.connectorColor, a.color));
						d[g].radius = this.getRangeRadius(e.value);
						d[g] = k(d[g], {
							center: d[0].radius - d[g].radius + b
						});
						p || k(!0, d[g], {
							bubbleStyle: k(!1, f),
							connectorStyle: k(!1, h),
							labelStyle: m
						})
					}, this)
				},
				getLabelStyles: function () {
					var d = this.options,
						c = {},
						a = "left" === d.labels.align,
						b = this.legend.options.rtl;
					D(d.labels.style, function (a, b) {
						"color" !== b && "fontSize" !== b && "z-index" !== b && (c[b] = a)
					});
					return k(!1, c, {
						"font-size": d.labels.style.fontSize,
						fill: x(d.labels.style.color, "#000000"),
						"z-index": d.zIndex,
						align: b || a ? "right" : "left"
					})
				},
				getRangeRadius: function (d) {
					var c = this.options;
					return this.chart.series[this.options.seriesIndex].getRadius.call(this,
						c.ranges[c.ranges.length - 1].value, c.ranges[0].value, c.minSize, c.maxSize, d)
				},
				render: function () {
					var d = this.chart.renderer,
						c = this.options.zThreshold;
					this.symbols || (this.symbols = {
						connectors: [],
						bubbleItems: [],
						labels: []
					});
					this.legendSymbol = d.g("bubble-legend");
					this.legendItem = d.g("bubble-legend-item");
					this.legendSymbol.translateX = 0;
					this.legendSymbol.translateY = 0;
					this.ranges.forEach(function (a) {
						a.value >= c && this.renderRange(a)
					}, this);
					this.legendSymbol.add(this.legendItem);
					this.legendItem.add(this.legendGroup);
					this.hideOverlappingLabels()
				},
				renderRange: function (d) {
					var c = this.options,
						a = c.labels,
						b = this.chart.renderer,
						e = this.symbols,
						f = e.labels,
						h = d.center,
						k = Math.abs(d.radius),
						n = c.connectorDistance,
						l = a.align,
						p = a.style.fontSize;
					n = this.legend.options.rtl || "left" === l ? -n : n;
					a = c.connectorWidth;
					var t = this.ranges[0].radius,
						u = h - k - c.borderWidth / 2 + a / 2;
					p = p / 2 - (this.fontMetrics.h - p) / 2;
					var y = b.styledMode;
					"center" === l && (n = 0, c.connectorDistance = 0, d.labelStyle.align = "center");
					l = u + c.labels.y;
					var r = t + n + c.labels.x;
					e.bubbleItems.push(b.circle(t,
						h + ((u % 1 ? 1 : .5) - (a % 2 ? 0 : .5)), k).attr(y ? {} : d.bubbleStyle).addClass((y ? "highcharts-color-" + this.options.seriesIndex + " " : "") + "highcharts-bubble-legend-symbol " + (c.className || "")).add(this.legendSymbol));
					e.connectors.push(b.path(b.crispLine(["M", t, u, "L", t + n, u], c.connectorWidth)).attr(y ? {} : d.connectorStyle).addClass((y ? "highcharts-color-" + this.options.seriesIndex + " " : "") + "highcharts-bubble-legend-connectors " + (c.connectorClassName || "")).add(this.legendSymbol));
					d = b.text(this.formatLabel(d), r, l + p).attr(y ? {} :
						d.labelStyle).addClass("highcharts-bubble-legend-labels " + (c.labels.className || "")).add(this.legendSymbol);
					f.push(d);
					d.placed = !0;
					d.alignAttr = {
						x: r,
						y: l + p
					}
				},
				getMaxLabelSize: function () {
					var d, c;
					this.symbols.labels.forEach(function (a) {
						c = a.getBBox(!0);
						d = d ? c.width > d.width ? c : d : c
					});
					return d || {}
				},
				formatLabel: function (e) {
					var c = this.options,
						a = c.labels.formatter;
					c = c.labels.format;
					var b = this.chart.numberFormatter;
					return c ? d.format(c, e) : a ? a.call(e) : b(e.value, 1)
				},
				hideOverlappingLabels: function () {
					var d = this.chart,
						c = this.symbols;
					!this.options.labels.allowOverlap && c && (d.hideOverlappingLabels(c.labels), c.labels.forEach(function (a, b) {
						a.newOpacity ? a.newOpacity !== a.oldOpacity && c.connectors[b].show() : c.connectors[b].hide()
					}))
				},
				getRanges: function () {
					var d = this.legend.bubbleLegend,
						c = d.options.ranges,
						a, b = Number.MAX_VALUE,
						f = -Number.MAX_VALUE;
					d.chart.series.forEach(function (c) {
						c.isBubble && !c.ignoreSeries && (a = c.zData.filter(A), a.length && (b = x(c.options.zMin, Math.min(b, Math.max(F(a), !1 === c.options.displayNegative ? c.options.zThreshold :
							-Number.MAX_VALUE))), f = x(c.options.zMax, Math.max(f, w(a)))))
					});
					var h = b === f ? [{
						value: f
					}] : [{
						value: b
					}, {
						value: (b + f) / 2
					}, {
						value: f,
						autoRanges: !0
					}];
					c.length && c[0].radius && h.reverse();
					h.forEach(function (a, b) {
						c && c[b] && (h[b] = k(!1, c[b], a))
					});
					return h
				},
				predictBubbleSizes: function () {
					var d = this.chart,
						c = this.fontMetrics,
						a = d.legend.options,
						b = "horizontal" === a.layout,
						f = b ? d.legend.lastLineHeight : 0,
						h = d.plotSizeX,
						k = d.plotSizeY,
						n = d.series[this.options.seriesIndex];
					d = Math.ceil(n.minPxSize);
					var p = Math.ceil(n.maxPxSize);
					n = n.options.maxSize;
					var l = Math.min(k, h);
					if (a.floating || !/%$/.test(n)) c = p;
					else if (n = parseFloat(n), c = (l + f - c.h / 2) * n / 100 / (n / 100 + 1), b && k - c >= h || !b && h - c >= k) c = p;
					return [d, Math.ceil(c)]
				},
				updateRanges: function (d, c) {
					var a = this.legend.options.bubbleLegend;
					a.minSize = d;
					a.maxSize = c;
					a.ranges = this.getRanges()
				},
				correctSizes: function () {
					var d = this.legend,
						c = this.chart.series[this.options.seriesIndex];
					1 < Math.abs(Math.ceil(c.maxPxSize) - this.options.maxSize) && (this.updateRanges(this.options.minSize, c.maxPxSize), d.render())
				}
			};
			t(d.Legend, "afterGetAllItems",
				function (e) {
					var c = this.bubbleLegend,
						a = this.options,
						b = a.bubbleLegend,
						f = this.chart.getVisibleBubbleSeriesIndex();
					c && c.ranges && c.ranges.length && (b.ranges.length && (b.autoRanges = !!b.ranges[0].autoRanges), this.destroyItem(c));
					0 <= f && a.enabled && b.enabled && (b.seriesIndex = f, this.bubbleLegend = new d.BubbleLegend(b, this), this.bubbleLegend.addToLegend(e.allItems))
				});
			u.prototype.getVisibleBubbleSeriesIndex = function () {
				for (var d = this.series, c = 0; c < d.length;) {
					if (d[c] && d[c].isBubble && d[c].visible && d[c].zData.length) return c;
					c++
				}
				return -1
			};
			H.prototype.getLinesHeights = function () {
				var d = this.allItems,
					c = [],
					a = d.length,
					b, f = 0;
				for (b = 0; b < a; b++)
					if (d[b].legendItemHeight && (d[b].itemHeight = d[b].legendItemHeight), d[b] === d[a - 1] || d[b + 1] && d[b]._legendItemPos[1] !== d[b + 1]._legendItemPos[1]) {
						c.push({
							height: 0
						});
						var h = c[c.length - 1];
						for (f; f <= b; f++) d[f].itemHeight > h.height && (h.height = d[f].itemHeight);
						h.step = b
					} return c
			};
			H.prototype.retranslateItems = function (d) {
				var c, a, b, e = this.options.rtl,
					f = 0;
				this.allItems.forEach(function (g, h) {
					c = g.legendGroup.translateX;
					a = g._legendItemPos[1];
					if ((b = g.movementX) || e && g.ranges) b = e ? c - g.options.maxSize / 2 : c + b, g.legendGroup.attr({
						translateX: b
					});
					h > d[f].step && f++;
					g.legendGroup.attr({
						translateY: Math.round(a + d[f].height / 2)
					});
					g._legendItemPos[1] = a + d[f].height / 2
				})
			};
			t(p, "legendItemClick", function () {
				var d = this.chart,
					c = this.visible,
					a = this.chart.legend;
				a && a.bubbleLegend && (this.visible = !c, this.ignoreSeries = c, d = 0 <= d.getVisibleBubbleSeriesIndex(), a.bubbleLegend.visible !== d && (a.update({
						bubbleLegend: {
							enabled: d
						}
					}), a.bubbleLegend.visible =
					d), this.visible = c)
			});
			f(u.prototype, "drawChartBox", function (d, c, a) {
				var b = this.legend,
					e = 0 <= this.getVisibleBubbleSeriesIndex();
				if (b && b.options.enabled && b.bubbleLegend && b.options.bubbleLegend.autoRanges && e) {
					var f = b.bubbleLegend.options;
					e = b.bubbleLegend.predictBubbleSizes();
					b.bubbleLegend.updateRanges(e[0], e[1]);
					f.placed || (b.group.placed = !1, b.allItems.forEach(function (a) {
						a.legendGroup.translateY = null
					}));
					b.render();
					this.getMargins();
					this.axes.forEach(function (a) {
						a.visible && a.render();
						f.placed || (a.setScale(),
							a.updateNames(), D(a.ticks, function (a) {
								a.isNew = !0;
								a.isNewLabel = !0
							}))
					});
					f.placed = !0;
					this.getMargins();
					d.call(this, c, a);
					b.bubbleLegend.correctSizes();
					b.retranslateItems(b.getLinesHeights())
				} else d.call(this, c, a), b && b.options.enabled && b.bubbleLegend && (b.render(), b.retranslateItems(b.getLinesHeights()))
			})
		});
	M(w, "parts-more/BubbleSeries.js", [w["parts/Globals.js"], w["parts/Utilities.js"]], function (d, f) {
		var w = f.arrayMax,
			F = f.arrayMin,
			A = f.clamp,
			D = f.extend,
			x = f.isNumber,
			p = f.pick,
			H = f.pInt;
		f = d.Axis;
		var u = d.color,
			t = d.noop,
			y = d.Point,
			k = d.Series,
			n = d.seriesType,
			E = d.seriesTypes;
		n("bubble", "scatter", {
			dataLabels: {
				formatter: function () {
					return this.point.z
				},
				inside: !0,
				verticalAlign: "middle"
			},
			animationLimit: 250,
			marker: {
				lineColor: null,
				lineWidth: 1,
				fillOpacity: .5,
				radius: null,
				states: {
					hover: {
						radiusPlus: 0
					}
				},
				symbol: "circle"
			},
			minSize: 8,
			maxSize: "20%",
			softThreshold: !1,
			states: {
				hover: {
					halo: {
						size: 5
					}
				}
			},
			tooltip: {
				pointFormat: "({point.x}, {point.y}), Size: {point.z}"
			},
			turboThreshold: 0,
			zThreshold: 0,
			zoneAxis: "z"
		}, {
			pointArrayMap: ["y", "z"],
			parallelArrays: ["x", "y", "z"],
			trackerGroups: ["group", "dataLabelsGroup"],
			specialGroup: "group",
			bubblePadding: !0,
			zoneAxis: "z",
			directTouch: !0,
			isBubble: !0,
			pointAttribs: function (d, e) {
				var c = this.options.marker.fillOpacity;
				d = k.prototype.pointAttribs.call(this, d, e);
				1 !== c && (d.fill = u(d.fill).setOpacity(c).get("rgba"));
				return d
			},
			getRadii: function (d, e, c) {
				var a = this.zData,
					b = this.yData,
					f = c.minPxSize,
					h = c.maxPxSize,
					k = [];
				var n = 0;
				for (c = a.length; n < c; n++) {
					var p = a[n];
					k.push(this.getRadius(d, e, f, h, p, b[n]))
				}
				this.radii = k
			},
			getRadius: function (d, e, c, a, b, f) {
				var g = this.options,
					h = "width" !== g.sizeBy,
					k = g.zThreshold,
					n = e - d,
					l = .5;
				if (null === f || null === b) return null;
				if (x(b)) {
					g.sizeByAbsoluteValue && (b = Math.abs(b - k), n = Math.max(e - k, Math.abs(d - k)), d = 0);
					if (b < d) return c / 2 - 1;
					0 < n && (l = (b - d) / n)
				}
				h && 0 <= l && (l = Math.sqrt(l));
				return Math.ceil(c + l * (a - c)) / 2
			},
			animate: function (d) {
				!d && this.points.length < this.options.animationLimit && (this.points.forEach(function (d) {
					var c = d.graphic;
					if (c && c.width) {
						var a = {
							x: c.x,
							y: c.y,
							width: c.width,
							height: c.height
						};
						c.attr({
							x: d.plotX,
							y: d.plotY,
							width: 1,
							height: 1
						});
						c.animate(a, this.options.animation)
					}
				}, this), this.animate = null)
			},
			hasData: function () {
				return !!this.processedXData.length
			},
			translate: function () {
				var d, e = this.data,
					c = this.radii;
				E.scatter.prototype.translate.call(this);
				for (d = e.length; d--;) {
					var a = e[d];
					var b = c ? c[d] : 0;
					x(b) && b >= this.minPxSize / 2 ? (a.marker = D(a.marker, {
						radius: b,
						width: 2 * b,
						height: 2 * b
					}), a.dlBox = {
						x: a.plotX - b,
						y: a.plotY - b,
						width: 2 * b,
						height: 2 * b
					}) : a.shapeArgs = a.plotY = a.dlBox = void 0
				}
			},
			alignDataLabel: E.column.prototype.alignDataLabel,
			buildKDTree: t,
			applyZones: t
		}, {
			haloPath: function (d) {
				return y.prototype.haloPath.call(this, 0 === d ? 0 : (this.marker ? this.marker.radius || 0 : 0) + d)
			},
			ttBelow: !1
		});
		f.prototype.beforePadding = function () {
			var d = this,
				e = this.len,
				c = this.chart,
				a = 0,
				b = e,
				f = this.isXAxis,
				k = f ? "xData" : "yData",
				m = this.min,
				n = {},
				t = Math.min(c.plotWidth, c.plotHeight),
				l = Number.MAX_VALUE,
				u = -Number.MAX_VALUE,
				y = this.max - m,
				E = e / y,
				D = [];
			this.series.forEach(function (a) {
				var b = a.options;
				!a.bubblePadding || !a.visible && c.options.chart.ignoreHiddenSeries || (d.allowZoomOutside = !0, D.push(a), f && (["minSize", "maxSize"].forEach(function (a) {
					var c = b[a],
						d = /%$/.test(c);
					c = H(c);
					n[a] = d ? t * c / 100 : c
				}), a.minPxSize = n.minSize, a.maxPxSize = Math.max(n.maxSize, n.minSize), a = a.zData.filter(x), a.length && (l = p(b.zMin, A(F(a), !1 === b.displayNegative ? b.zThreshold : -Number.MAX_VALUE, l)), u = p(b.zMax, Math.max(u, w(a))))))
			});
			D.forEach(function (c) {
				var e = c[k],
					g = e.length;
				f && c.getRadii(l, u, c);
				if (0 < y)
					for (; g--;)
						if (x(e[g]) && d.dataMin <= e[g] && e[g] <= d.max) {
							var h = c.radii ? c.radii[g] : 0;
							a = Math.min((e[g] - m) * E - h, a);
							b = Math.max((e[g] -
								m) * E + h, b)
						}
			});
			D.length && 0 < y && !this.isLog && (b -= e, E *= (e + Math.max(0, a) - Math.min(b, e)) / e, [
				["min", "userMin", a],
				["max", "userMax", b]
			].forEach(function (a) {
				"undefined" === typeof p(d.options[a[0]], d[a[1]]) && (d[a[0]] += a[2] / E)
			}))
		};
		""
	});
	M(w, "parts-map/MapBubbleSeries.js", [w["parts/Globals.js"]], function (d) {
		var f = d.merge,
			w = d.Point,
			F = d.seriesType,
			A = d.seriesTypes;
		A.bubble && F("mapbubble", "bubble", {
			animationLimit: 500,
			tooltip: {
				pointFormat: "{point.name}: {point.z}"
			}
		}, {
			xyFromShape: !0,
			type: "mapbubble",
			pointArrayMap: ["z"],
			getMapData: A.map.prototype.getMapData,
			getBox: A.map.prototype.getBox,
			setData: A.map.prototype.setData,
			setOptions: A.map.prototype.setOptions
		}, {
			applyOptions: function (d, x) {
				return d && "undefined" !== typeof d.lat && "undefined" !== typeof d.lon ? w.prototype.applyOptions.call(this, f(d, this.series.chart.fromLatLonToPoint(d)), x) : A.map.prototype.pointClass.prototype.applyOptions.call(this, d, x)
			},
			isValid: function () {
				return "number" === typeof this.z
			},
			ttBelow: !1
		});
		""
	});
	M(w, "parts-map/HeatmapSeries.js", [w["parts/Globals.js"],
		w["parts/Utilities.js"]
	], function (d, f) {
		var w = f.clamp,
			F = f.extend,
			A = f.pick;
		f = d.colorMapPointMixin;
		var D = d.merge,
			x = d.noop,
			p = d.fireEvent,
			H = d.Series,
			u = d.seriesType,
			t = d.seriesTypes;
		u("heatmap", "scatter", {
			animation: !1,
			borderWidth: 0,
			nullColor: "#f7f7f7",
			dataLabels: {
				formatter: function () {
					return this.point.value
				},
				inside: !0,
				verticalAlign: "middle",
				crop: !1,
				overflow: !1,
				padding: 0
			},
			marker: null,
			pointRange: null,
			tooltip: {
				pointFormat: "{point.x}, {point.y}: {point.value}<br/>"
			},
			states: {
				hover: {
					halo: !1,
					brightness: .2
				}
			}
		}, D(d.colorMapSeriesMixin, {
			pointArrayMap: ["y", "value"],
			hasPointSpecificOptions: !0,
			getExtremesFromAll: !0,
			directTouch: !0,
			init: function () {
				t.scatter.prototype.init.apply(this, arguments);
				var d = this.options;
				d.pointRange = A(d.pointRange, d.colsize || 1);
				this.yAxis.axisPointRange = d.rowsize || 1
			},
			translate: function () {
				var d = this.options,
					f = this.xAxis,
					n = this.yAxis,
					t = d.pointPadding || 0,
					h = this.pointPlacementToXValue();
				this.generatePoints();
				this.points.forEach(function (e) {
					var c = (d.colsize || 1) / 2,
						a = (d.rowsize || 1) / 2,
						b = w(Math.round(f.len - f.translate(e.x -
							c, 0, 1, 0, 1, -h)), -f.len, 2 * f.len);
					c = w(Math.round(f.len - f.translate(e.x + c, 0, 1, 0, 1, -h)), -f.len, 2 * f.len);
					var g = w(Math.round(n.translate(e.y - a, 0, 1, 0, 1)), -n.len, 2 * n.len);
					a = w(Math.round(n.translate(e.y + a, 0, 1, 0, 1)), -n.len, 2 * n.len);
					var k = A(e.pointPadding, t);
					e.plotX = e.clientX = (b + c) / 2;
					e.plotY = (g + a) / 2;
					e.shapeType = "rect";
					e.shapeArgs = {
						x: Math.min(b, c) + k,
						y: Math.min(g, a) + k,
						width: Math.max(Math.abs(c - b) - 2 * k, 0),
						height: Math.max(Math.abs(a - g) - 2 * k, 0)
					}
				});
				p(this, "afterTranslate")
			},
			drawPoints: function () {
				var d = this.chart.styledMode ?
					"css" : "animate";
				t.column.prototype.drawPoints.call(this);
				this.points.forEach(function (f) {
					f.graphic[d](this.colorAttribs(f))
				}, this)
			},
			hasData: function () {
				return !!this.processedXData.length
			},
			getValidPoints: function (d, f) {
				return H.prototype.getValidPoints.call(this, d, f, !0)
			},
			animate: x,
			getBox: x,
			drawLegendSymbol: d.LegendSymbolMixin.drawRectangle,
			alignDataLabel: t.column.prototype.alignDataLabel,
			getExtremes: function () {
				H.prototype.getExtremes.call(this, this.valueData);
				this.valueMin = this.dataMin;
				this.valueMax =
					this.dataMax;
				H.prototype.getExtremes.call(this)
			}
		}), F({
			haloPath: function (d) {
				if (!d) return [];
				var f = this.shapeArgs;
				return ["M", f.x - d, f.y - d, "L", f.x - d, f.y + f.height + d, f.x + f.width + d, f.y + f.height + d, f.x + f.width + d, f.y - d, "Z"]
			}
		}, f));
		""
	});
	M(w, "parts-map/GeoJSON.js", [w["parts/Globals.js"], w["parts/Utilities.js"]], function (d, f) {
		function w(d, f) {
			var p, u = !1,
				k = d.x,
				n = d.y;
			d = 0;
			for (p = f.length - 1; d < f.length; p = d++) {
				var w = f[d][1] > n;
				var h = f[p][1] > n;
				w !== h && k < (f[p][0] - f[d][0]) * (n - f[d][1]) / (f[p][1] - f[d][1]) + f[d][0] && (u = !u)
			}
			return u
		}
		var F = f.extend;
		f = f.wrap;
		var A = d.Chart,
			D = d.format,
			x = d.merge,
			p = d.win;
		A.prototype.transformFromLatLon = function (f, u) {
			if ("undefined" === typeof p.proj4) return d.error(21, !1, this), {
				x: 0,
				y: null
			};
			f = p.proj4(u.crs, [f.lon, f.lat]);
			var t = u.cosAngle || u.rotation && Math.cos(u.rotation),
				y = u.sinAngle || u.rotation && Math.sin(u.rotation);
			f = u.rotation ? [f[0] * t + f[1] * y, -f[0] * y + f[1] * t] : f;
			return {
				x: ((f[0] - (u.xoffset || 0)) * (u.scale || 1) + (u.xpan || 0)) * (u.jsonres || 1) + (u.jsonmarginX || 0),
				y: (((u.yoffset || 0) - f[1]) * (u.scale || 1) + (u.ypan || 0)) *
					(u.jsonres || 1) - (u.jsonmarginY || 0)
			}
		};
		A.prototype.transformToLatLon = function (f, u) {
			if ("undefined" === typeof p.proj4) d.error(21, !1, this);
			else {
				f = {
					x: ((f.x - (u.jsonmarginX || 0)) / (u.jsonres || 1) - (u.xpan || 0)) / (u.scale || 1) + (u.xoffset || 0),
					y: ((-f.y - (u.jsonmarginY || 0)) / (u.jsonres || 1) + (u.ypan || 0)) / (u.scale || 1) + (u.yoffset || 0)
				};
				var t = u.cosAngle || u.rotation && Math.cos(u.rotation),
					y = u.sinAngle || u.rotation && Math.sin(u.rotation);
				u = p.proj4(u.crs, "WGS84", u.rotation ? {
					x: f.x * t + f.y * -y,
					y: f.x * y + f.y * t
				} : f);
				return {
					lat: u.y,
					lon: u.x
				}
			}
		};
		A.prototype.fromPointToLatLon = function (f) {
			var p = this.mapTransforms,
				t;
			if (p) {
				for (t in p)
					if (Object.hasOwnProperty.call(p, t) && p[t].hitZone && w({
							x: f.x,
							y: -f.y
						}, p[t].hitZone.coordinates[0])) return this.transformToLatLon(f, p[t]);
				return this.transformToLatLon(f, p["default"])
			}
			d.error(22, !1, this)
		};
		A.prototype.fromLatLonToPoint = function (f) {
			var p = this.mapTransforms,
				t;
			if (!p) return d.error(22, !1, this), {
				x: 0,
				y: null
			};
			for (t in p)
				if (Object.hasOwnProperty.call(p, t) && p[t].hitZone) {
					var y = this.transformFromLatLon(f, p[t]);
					if (w({
							x: y.x,
							y: -y.y
						}, p[t].hitZone.coordinates[0])) return y
				} return this.transformFromLatLon(f, p["default"])
		};
		d.geojson = function (d, f, p) {
			var t = [],
				k = [],
				n = function (d) {
					var f, e = d.length;
					k.push("M");
					for (f = 0; f < e; f++) 1 === f && k.push("L"), k.push(d[f][0], -d[f][1])
				};
			f = f || "map";
			d.features.forEach(function (d) {
				var h = d.geometry,
					e = h.type;
				h = h.coordinates;
				d = d.properties;
				var c;
				k = [];
				"map" === f || "mapbubble" === f ? ("Polygon" === e ? (h.forEach(n), k.push("Z")) : "MultiPolygon" === e && (h.forEach(function (a) {
						a.forEach(n)
					}), k.push("Z")),
					k.length && (c = {
						path: k
					})) : "mapline" === f ? ("LineString" === e ? n(h) : "MultiLineString" === e && h.forEach(n), k.length && (c = {
					path: k
				})) : "mappoint" === f && "Point" === e && (c = {
					x: h[0],
					y: -h[1]
				});
				c && t.push(F(c, {
					name: d.name || d.NAME,
					properties: d
				}))
			});
			p && d.copyrightShort && (p.chart.mapCredits = D(p.chart.options.credits.mapText, {
				geojson: d
			}), p.chart.mapCreditsFull = D(p.chart.options.credits.mapTextFull, {
				geojson: d
			}));
			return t
		};
		f(A.prototype, "addCredits", function (d, f) {
			f = x(!0, this.options.credits, f);
			this.mapCredits && (f.href = null);
			d.call(this,
				f);
			this.credits && this.mapCreditsFull && this.credits.attr({
				title: this.mapCreditsFull
			})
		})
	});
	M(w, "parts-map/Map.js", [w["parts/Globals.js"], w["parts/Utilities.js"]], function (d, f) {
		function w(d, f, k, n, p, h, e, c) {
			return ["M", d + p, f, "L", d + k - h, f, "C", d + k - h / 2, f, d + k, f + h / 2, d + k, f + h, "L", d + k, f + n - e, "C", d + k, f + n - e / 2, d + k - e / 2, f + n, d + k - e, f + n, "L", d + c, f + n, "C", d + c / 2, f + n, d, f + n - c / 2, d, f + n - c, "L", d, f + p, "C", d, f + p / 2, d + p / 2, f, d + p, f, "Z"]
		}
		var F = f.extend,
			A = f.pick,
			D = d.Chart;
		f = d.defaultOptions;
		var x = d.merge,
			p = d.Renderer,
			H = d.SVGRenderer,
			u = d.VMLRenderer;
		F(f.lang, {
			zoomIn: "Zoom in",
			zoomOut: "Zoom out"
		});
		f.mapNavigation = {
			buttonOptions: {
				alignTo: "plotBox",
				align: "left",
				verticalAlign: "top",
				x: 0,
				width: 18,
				height: 18,
				padding: 5,
				style: {
					fontSize: "15px",
					fontWeight: "bold"
				},
				theme: {
					"stroke-width": 1,
					"text-align": "center"
				}
			},
			buttons: {
				zoomIn: {
					onclick: function () {
						this.mapZoom(.5)
					},
					text: "+",
					y: 0
				},
				zoomOut: {
					onclick: function () {
						this.mapZoom(2)
					},
					text: "-",
					y: 28
				}
			},
			mouseWheelSensitivity: 1.1
		};
		d.splitPath = function (d) {
			var f;
			d = d.replace(/([A-Za-z])/g, " $1 ");
			d = d.replace(/^\s*/, "").replace(/\s*$/,
				"");
			d = d.split(/[ ,]+/);
			for (f = 0; f < d.length; f++) /[a-zA-Z]/.test(d[f]) || (d[f] = parseFloat(d[f]));
			return d
		};
		d.maps = {};
		H.prototype.symbols.topbutton = function (d, f, k, n, p) {
			return w(d - 1, f - 1, k, n, p.r, p.r, 0, 0)
		};
		H.prototype.symbols.bottombutton = function (d, f, k, n, p) {
			return w(d - 1, f - 1, k, n, 0, 0, p.r, p.r)
		};
		p === u && ["topbutton", "bottombutton"].forEach(function (d) {
			u.prototype.symbols[d] = H.prototype.symbols[d]
		});
		d.Map = d.mapChart = function (f, p, k) {
			var n = "string" === typeof f || f.nodeName,
				t = arguments[n ? 1 : 0],
				h = t,
				e = {
					endOnTick: !1,
					visible: !1,
					minPadding: 0,
					maxPadding: 0,
					startOnTick: !1
				},
				c = d.getOptions().credits;
			var a = t.series;
			t.series = null;
			t = x({
				chart: {
					panning: "xy",
					type: "map"
				},
				credits: {
					mapText: A(c.mapText, ' \u00a9 <a href="{geojson.copyrightUrl}">{geojson.copyrightShort}</a>'),
					mapTextFull: A(c.mapTextFull, "{geojson.copyright}")
				},
				tooltip: {
					followTouchMove: !1
				},
				xAxis: e,
				yAxis: x(e, {
					reversed: !0
				})
			}, t, {
				chart: {
					inverted: !1,
					alignTicks: !1
				}
			});
			t.series = h.series = a;
			return n ? new D(f, t, k) : new D(t, p)
		}
	});
	M(w, "masters/modules/map.src.js", [], function () {});
	M(w, "masters/highmaps.src.js",
		[w["masters/highcharts.src.js"]],
		function (d) {
			d.product = "Highmaps";
			return d
		});
	w["masters/highmaps.src.js"]._modules = w;
	return w["masters/highmaps.src.js"]
});
//# sourceMappingURL=highmaps.js.map
