(() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a3, b2) => {
    for (var prop in b2 || (b2 = {}))
      if (__hasOwnProp.call(b2, prop))
        __defNormalProp(a3, prop, b2[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b2)) {
        if (__propIsEnum.call(b2, prop))
          __defNormalProp(a3, prop, b2[prop]);
      }
    return a3;
  };
  var __spreadProps = (a3, b2) => __defProps(a3, __getOwnPropDescs(b2));
  var __decorateClass = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
    for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
      if (decorator = decorators[i5])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result)
      __defProp(target, key, result);
    return result;
  };
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };

  // node_modules/@lit/reactive-element/css-tag.js
  var t = window;
  var e = t.ShadowRoot && (t.ShadyCSS === void 0 || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
  var s = Symbol();
  var n = /* @__PURE__ */ new WeakMap();
  var o = class {
    constructor(t4, e7, n6) {
      if (this._$cssResult$ = true, n6 !== s)
        throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
      this.cssText = t4, this.t = e7;
    }
    get styleSheet() {
      let t4 = this.o;
      const s5 = this.t;
      if (e && t4 === void 0) {
        const e7 = s5 !== void 0 && s5.length === 1;
        e7 && (t4 = n.get(s5)), t4 === void 0 && ((this.o = t4 = new CSSStyleSheet()).replaceSync(this.cssText), e7 && n.set(s5, t4));
      }
      return t4;
    }
    toString() {
      return this.cssText;
    }
  };
  var r = (t4) => new o(typeof t4 == "string" ? t4 : t4 + "", void 0, s);
  var S = (s5, n6) => {
    e ? s5.adoptedStyleSheets = n6.map((t4) => t4 instanceof CSSStyleSheet ? t4 : t4.styleSheet) : n6.forEach((e7) => {
      const n7 = document.createElement("style"), o6 = t.litNonce;
      o6 !== void 0 && n7.setAttribute("nonce", o6), n7.textContent = e7.cssText, s5.appendChild(n7);
    });
  };
  var c = e ? (t4) => t4 : (t4) => t4 instanceof CSSStyleSheet ? ((t5) => {
    let e7 = "";
    for (const s5 of t5.cssRules)
      e7 += s5.cssText;
    return r(e7);
  })(t4) : t4;

  // node_modules/@lit/reactive-element/reactive-element.js
  var s2;
  var e2 = window;
  var r2 = e2.trustedTypes;
  var h = r2 ? r2.emptyScript : "";
  var o2 = e2.reactiveElementPolyfillSupport;
  var n2 = { toAttribute(t4, i5) {
    switch (i5) {
      case Boolean:
        t4 = t4 ? h : null;
        break;
      case Object:
      case Array:
        t4 = t4 == null ? t4 : JSON.stringify(t4);
    }
    return t4;
  }, fromAttribute(t4, i5) {
    let s5 = t4;
    switch (i5) {
      case Boolean:
        s5 = t4 !== null;
        break;
      case Number:
        s5 = t4 === null ? null : Number(t4);
        break;
      case Object:
      case Array:
        try {
          s5 = JSON.parse(t4);
        } catch (t5) {
          s5 = null;
        }
    }
    return s5;
  } };
  var a = (t4, i5) => i5 !== t4 && (i5 == i5 || t4 == t4);
  var l = { attribute: true, type: String, converter: n2, reflect: false, hasChanged: a };
  var d = class extends HTMLElement {
    constructor() {
      super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = false, this.hasUpdated = false, this._$El = null, this.u();
    }
    static addInitializer(t4) {
      var i5;
      (i5 = this.h) !== null && i5 !== void 0 || (this.h = []), this.h.push(t4);
    }
    static get observedAttributes() {
      this.finalize();
      const t4 = [];
      return this.elementProperties.forEach((i5, s5) => {
        const e7 = this._$Ep(s5, i5);
        e7 !== void 0 && (this._$Ev.set(e7, s5), t4.push(e7));
      }), t4;
    }
    static createProperty(t4, i5 = l) {
      if (i5.state && (i5.attribute = false), this.finalize(), this.elementProperties.set(t4, i5), !i5.noAccessor && !this.prototype.hasOwnProperty(t4)) {
        const s5 = typeof t4 == "symbol" ? Symbol() : "__" + t4, e7 = this.getPropertyDescriptor(t4, s5, i5);
        e7 !== void 0 && Object.defineProperty(this.prototype, t4, e7);
      }
    }
    static getPropertyDescriptor(t4, i5, s5) {
      return { get() {
        return this[i5];
      }, set(e7) {
        const r5 = this[t4];
        this[i5] = e7, this.requestUpdate(t4, r5, s5);
      }, configurable: true, enumerable: true };
    }
    static getPropertyOptions(t4) {
      return this.elementProperties.get(t4) || l;
    }
    static finalize() {
      if (this.hasOwnProperty("finalized"))
        return false;
      this.finalized = true;
      const t4 = Object.getPrototypeOf(this);
      if (t4.finalize(), this.elementProperties = new Map(t4.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
        const t5 = this.properties, i5 = [...Object.getOwnPropertyNames(t5), ...Object.getOwnPropertySymbols(t5)];
        for (const s5 of i5)
          this.createProperty(s5, t5[s5]);
      }
      return this.elementStyles = this.finalizeStyles(this.styles), true;
    }
    static finalizeStyles(i5) {
      const s5 = [];
      if (Array.isArray(i5)) {
        const e7 = new Set(i5.flat(1 / 0).reverse());
        for (const i6 of e7)
          s5.unshift(c(i6));
      } else
        i5 !== void 0 && s5.push(c(i5));
      return s5;
    }
    static _$Ep(t4, i5) {
      const s5 = i5.attribute;
      return s5 === false ? void 0 : typeof s5 == "string" ? s5 : typeof t4 == "string" ? t4.toLowerCase() : void 0;
    }
    u() {
      var t4;
      this._$E_ = new Promise((t5) => this.enableUpdating = t5), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), (t4 = this.constructor.h) === null || t4 === void 0 || t4.forEach((t5) => t5(this));
    }
    addController(t4) {
      var i5, s5;
      ((i5 = this._$ES) !== null && i5 !== void 0 ? i5 : this._$ES = []).push(t4), this.renderRoot !== void 0 && this.isConnected && ((s5 = t4.hostConnected) === null || s5 === void 0 || s5.call(t4));
    }
    removeController(t4) {
      var i5;
      (i5 = this._$ES) === null || i5 === void 0 || i5.splice(this._$ES.indexOf(t4) >>> 0, 1);
    }
    _$Eg() {
      this.constructor.elementProperties.forEach((t4, i5) => {
        this.hasOwnProperty(i5) && (this._$Ei.set(i5, this[i5]), delete this[i5]);
      });
    }
    createRenderRoot() {
      var t4;
      const s5 = (t4 = this.shadowRoot) !== null && t4 !== void 0 ? t4 : this.attachShadow(this.constructor.shadowRootOptions);
      return S(s5, this.constructor.elementStyles), s5;
    }
    connectedCallback() {
      var t4;
      this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), (t4 = this._$ES) === null || t4 === void 0 || t4.forEach((t5) => {
        var i5;
        return (i5 = t5.hostConnected) === null || i5 === void 0 ? void 0 : i5.call(t5);
      });
    }
    enableUpdating(t4) {
    }
    disconnectedCallback() {
      var t4;
      (t4 = this._$ES) === null || t4 === void 0 || t4.forEach((t5) => {
        var i5;
        return (i5 = t5.hostDisconnected) === null || i5 === void 0 ? void 0 : i5.call(t5);
      });
    }
    attributeChangedCallback(t4, i5, s5) {
      this._$AK(t4, s5);
    }
    _$EO(t4, i5, s5 = l) {
      var e7;
      const r5 = this.constructor._$Ep(t4, s5);
      if (r5 !== void 0 && s5.reflect === true) {
        const h3 = (((e7 = s5.converter) === null || e7 === void 0 ? void 0 : e7.toAttribute) !== void 0 ? s5.converter : n2).toAttribute(i5, s5.type);
        this._$El = t4, h3 == null ? this.removeAttribute(r5) : this.setAttribute(r5, h3), this._$El = null;
      }
    }
    _$AK(t4, i5) {
      var s5;
      const e7 = this.constructor, r5 = e7._$Ev.get(t4);
      if (r5 !== void 0 && this._$El !== r5) {
        const t5 = e7.getPropertyOptions(r5), h3 = typeof t5.converter == "function" ? { fromAttribute: t5.converter } : ((s5 = t5.converter) === null || s5 === void 0 ? void 0 : s5.fromAttribute) !== void 0 ? t5.converter : n2;
        this._$El = r5, this[r5] = h3.fromAttribute(i5, t5.type), this._$El = null;
      }
    }
    requestUpdate(t4, i5, s5) {
      let e7 = true;
      t4 !== void 0 && (((s5 = s5 || this.constructor.getPropertyOptions(t4)).hasChanged || a)(this[t4], i5) ? (this._$AL.has(t4) || this._$AL.set(t4, i5), s5.reflect === true && this._$El !== t4 && (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t4, s5))) : e7 = false), !this.isUpdatePending && e7 && (this._$E_ = this._$Ej());
    }
    async _$Ej() {
      this.isUpdatePending = true;
      try {
        await this._$E_;
      } catch (t5) {
        Promise.reject(t5);
      }
      const t4 = this.scheduleUpdate();
      return t4 != null && await t4, !this.isUpdatePending;
    }
    scheduleUpdate() {
      return this.performUpdate();
    }
    performUpdate() {
      var t4;
      if (!this.isUpdatePending)
        return;
      this.hasUpdated, this._$Ei && (this._$Ei.forEach((t5, i6) => this[i6] = t5), this._$Ei = void 0);
      let i5 = false;
      const s5 = this._$AL;
      try {
        i5 = this.shouldUpdate(s5), i5 ? (this.willUpdate(s5), (t4 = this._$ES) === null || t4 === void 0 || t4.forEach((t5) => {
          var i6;
          return (i6 = t5.hostUpdate) === null || i6 === void 0 ? void 0 : i6.call(t5);
        }), this.update(s5)) : this._$Ek();
      } catch (t5) {
        throw i5 = false, this._$Ek(), t5;
      }
      i5 && this._$AE(s5);
    }
    willUpdate(t4) {
    }
    _$AE(t4) {
      var i5;
      (i5 = this._$ES) === null || i5 === void 0 || i5.forEach((t5) => {
        var i6;
        return (i6 = t5.hostUpdated) === null || i6 === void 0 ? void 0 : i6.call(t5);
      }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t4)), this.updated(t4);
    }
    _$Ek() {
      this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
    }
    get updateComplete() {
      return this.getUpdateComplete();
    }
    getUpdateComplete() {
      return this._$E_;
    }
    shouldUpdate(t4) {
      return true;
    }
    update(t4) {
      this._$EC !== void 0 && (this._$EC.forEach((t5, i5) => this._$EO(i5, this[i5], t5)), this._$EC = void 0), this._$Ek();
    }
    updated(t4) {
    }
    firstUpdated(t4) {
    }
  };
  d.finalized = true, d.elementProperties = /* @__PURE__ */ new Map(), d.elementStyles = [], d.shadowRootOptions = { mode: "open" }, o2 == null || o2({ ReactiveElement: d }), ((s2 = e2.reactiveElementVersions) !== null && s2 !== void 0 ? s2 : e2.reactiveElementVersions = []).push("1.4.1");

  // node_modules/lit-html/lit-html.js
  var t2;
  var i2 = window;
  var s3 = i2.trustedTypes;
  var e3 = s3 ? s3.createPolicy("lit-html", { createHTML: (t4) => t4 }) : void 0;
  var o3 = `lit$${(Math.random() + "").slice(9)}$`;
  var n3 = "?" + o3;
  var l2 = `<${n3}>`;
  var h2 = document;
  var r3 = (t4 = "") => h2.createComment(t4);
  var d2 = (t4) => t4 === null || typeof t4 != "object" && typeof t4 != "function";
  var u = Array.isArray;
  var c2 = (t4) => u(t4) || typeof (t4 == null ? void 0 : t4[Symbol.iterator]) == "function";
  var v = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
  var a2 = /-->/g;
  var f = />/g;
  var _ = RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
  var m = /'/g;
  var p = /"/g;
  var $ = /^(?:script|style|textarea|title)$/i;
  var g = (t4) => (i5, ...s5) => ({ _$litType$: t4, strings: i5, values: s5 });
  var y = g(1);
  var w = g(2);
  var x = Symbol.for("lit-noChange");
  var b = Symbol.for("lit-nothing");
  var T = /* @__PURE__ */ new WeakMap();
  var A = h2.createTreeWalker(h2, 129, null, false);
  var E = (t4, i5) => {
    const s5 = t4.length - 1, n6 = [];
    let h3, r5 = i5 === 2 ? "<svg>" : "", d3 = v;
    for (let i6 = 0; i6 < s5; i6++) {
      const s6 = t4[i6];
      let e7, u3, c3 = -1, g2 = 0;
      for (; g2 < s6.length && (d3.lastIndex = g2, u3 = d3.exec(s6), u3 !== null); )
        g2 = d3.lastIndex, d3 === v ? u3[1] === "!--" ? d3 = a2 : u3[1] !== void 0 ? d3 = f : u3[2] !== void 0 ? ($.test(u3[2]) && (h3 = RegExp("</" + u3[2], "g")), d3 = _) : u3[3] !== void 0 && (d3 = _) : d3 === _ ? u3[0] === ">" ? (d3 = h3 != null ? h3 : v, c3 = -1) : u3[1] === void 0 ? c3 = -2 : (c3 = d3.lastIndex - u3[2].length, e7 = u3[1], d3 = u3[3] === void 0 ? _ : u3[3] === '"' ? p : m) : d3 === p || d3 === m ? d3 = _ : d3 === a2 || d3 === f ? d3 = v : (d3 = _, h3 = void 0);
      const y2 = d3 === _ && t4[i6 + 1].startsWith("/>") ? " " : "";
      r5 += d3 === v ? s6 + l2 : c3 >= 0 ? (n6.push(e7), s6.slice(0, c3) + "$lit$" + s6.slice(c3) + o3 + y2) : s6 + o3 + (c3 === -2 ? (n6.push(void 0), i6) : y2);
    }
    const u2 = r5 + (t4[s5] || "<?>") + (i5 === 2 ? "</svg>" : "");
    if (!Array.isArray(t4) || !t4.hasOwnProperty("raw"))
      throw Error("invalid template strings array");
    return [e3 !== void 0 ? e3.createHTML(u2) : u2, n6];
  };
  var C = class {
    constructor({ strings: t4, _$litType$: i5 }, e7) {
      let l5;
      this.parts = [];
      let h3 = 0, d3 = 0;
      const u2 = t4.length - 1, c3 = this.parts, [v2, a3] = E(t4, i5);
      if (this.el = C.createElement(v2, e7), A.currentNode = this.el.content, i5 === 2) {
        const t5 = this.el.content, i6 = t5.firstChild;
        i6.remove(), t5.append(...i6.childNodes);
      }
      for (; (l5 = A.nextNode()) !== null && c3.length < u2; ) {
        if (l5.nodeType === 1) {
          if (l5.hasAttributes()) {
            const t5 = [];
            for (const i6 of l5.getAttributeNames())
              if (i6.endsWith("$lit$") || i6.startsWith(o3)) {
                const s5 = a3[d3++];
                if (t5.push(i6), s5 !== void 0) {
                  const t6 = l5.getAttribute(s5.toLowerCase() + "$lit$").split(o3), i7 = /([.?@])?(.*)/.exec(s5);
                  c3.push({ type: 1, index: h3, name: i7[2], strings: t6, ctor: i7[1] === "." ? M : i7[1] === "?" ? k : i7[1] === "@" ? H : S2 });
                } else
                  c3.push({ type: 6, index: h3 });
              }
            for (const i6 of t5)
              l5.removeAttribute(i6);
          }
          if ($.test(l5.tagName)) {
            const t5 = l5.textContent.split(o3), i6 = t5.length - 1;
            if (i6 > 0) {
              l5.textContent = s3 ? s3.emptyScript : "";
              for (let s5 = 0; s5 < i6; s5++)
                l5.append(t5[s5], r3()), A.nextNode(), c3.push({ type: 2, index: ++h3 });
              l5.append(t5[i6], r3());
            }
          }
        } else if (l5.nodeType === 8)
          if (l5.data === n3)
            c3.push({ type: 2, index: h3 });
          else {
            let t5 = -1;
            for (; (t5 = l5.data.indexOf(o3, t5 + 1)) !== -1; )
              c3.push({ type: 7, index: h3 }), t5 += o3.length - 1;
          }
        h3++;
      }
    }
    static createElement(t4, i5) {
      const s5 = h2.createElement("template");
      return s5.innerHTML = t4, s5;
    }
  };
  function P(t4, i5, s5 = t4, e7) {
    var o6, n6, l5, h3;
    if (i5 === x)
      return i5;
    let r5 = e7 !== void 0 ? (o6 = s5._$Co) === null || o6 === void 0 ? void 0 : o6[e7] : s5._$Cl;
    const u2 = d2(i5) ? void 0 : i5._$litDirective$;
    return (r5 == null ? void 0 : r5.constructor) !== u2 && ((n6 = r5 == null ? void 0 : r5._$AO) === null || n6 === void 0 || n6.call(r5, false), u2 === void 0 ? r5 = void 0 : (r5 = new u2(t4), r5._$AT(t4, s5, e7)), e7 !== void 0 ? ((l5 = (h3 = s5)._$Co) !== null && l5 !== void 0 ? l5 : h3._$Co = [])[e7] = r5 : s5._$Cl = r5), r5 !== void 0 && (i5 = P(t4, r5._$AS(t4, i5.values), r5, e7)), i5;
  }
  var V = class {
    constructor(t4, i5) {
      this.u = [], this._$AN = void 0, this._$AD = t4, this._$AM = i5;
    }
    get parentNode() {
      return this._$AM.parentNode;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    v(t4) {
      var i5;
      const { el: { content: s5 }, parts: e7 } = this._$AD, o6 = ((i5 = t4 == null ? void 0 : t4.creationScope) !== null && i5 !== void 0 ? i5 : h2).importNode(s5, true);
      A.currentNode = o6;
      let n6 = A.nextNode(), l5 = 0, r5 = 0, d3 = e7[0];
      for (; d3 !== void 0; ) {
        if (l5 === d3.index) {
          let i6;
          d3.type === 2 ? i6 = new N(n6, n6.nextSibling, this, t4) : d3.type === 1 ? i6 = new d3.ctor(n6, d3.name, d3.strings, this, t4) : d3.type === 6 && (i6 = new I(n6, this, t4)), this.u.push(i6), d3 = e7[++r5];
        }
        l5 !== (d3 == null ? void 0 : d3.index) && (n6 = A.nextNode(), l5++);
      }
      return o6;
    }
    p(t4) {
      let i5 = 0;
      for (const s5 of this.u)
        s5 !== void 0 && (s5.strings !== void 0 ? (s5._$AI(t4, s5, i5), i5 += s5.strings.length - 2) : s5._$AI(t4[i5])), i5++;
    }
  };
  var N = class {
    constructor(t4, i5, s5, e7) {
      var o6;
      this.type = 2, this._$AH = b, this._$AN = void 0, this._$AA = t4, this._$AB = i5, this._$AM = s5, this.options = e7, this._$Cm = (o6 = e7 == null ? void 0 : e7.isConnected) === null || o6 === void 0 || o6;
    }
    get _$AU() {
      var t4, i5;
      return (i5 = (t4 = this._$AM) === null || t4 === void 0 ? void 0 : t4._$AU) !== null && i5 !== void 0 ? i5 : this._$Cm;
    }
    get parentNode() {
      let t4 = this._$AA.parentNode;
      const i5 = this._$AM;
      return i5 !== void 0 && t4.nodeType === 11 && (t4 = i5.parentNode), t4;
    }
    get startNode() {
      return this._$AA;
    }
    get endNode() {
      return this._$AB;
    }
    _$AI(t4, i5 = this) {
      t4 = P(this, t4, i5), d2(t4) ? t4 === b || t4 == null || t4 === "" ? (this._$AH !== b && this._$AR(), this._$AH = b) : t4 !== this._$AH && t4 !== x && this.g(t4) : t4._$litType$ !== void 0 ? this.$(t4) : t4.nodeType !== void 0 ? this.T(t4) : c2(t4) ? this.k(t4) : this.g(t4);
    }
    O(t4, i5 = this._$AB) {
      return this._$AA.parentNode.insertBefore(t4, i5);
    }
    T(t4) {
      this._$AH !== t4 && (this._$AR(), this._$AH = this.O(t4));
    }
    g(t4) {
      this._$AH !== b && d2(this._$AH) ? this._$AA.nextSibling.data = t4 : this.T(h2.createTextNode(t4)), this._$AH = t4;
    }
    $(t4) {
      var i5;
      const { values: s5, _$litType$: e7 } = t4, o6 = typeof e7 == "number" ? this._$AC(t4) : (e7.el === void 0 && (e7.el = C.createElement(e7.h, this.options)), e7);
      if (((i5 = this._$AH) === null || i5 === void 0 ? void 0 : i5._$AD) === o6)
        this._$AH.p(s5);
      else {
        const t5 = new V(o6, this), i6 = t5.v(this.options);
        t5.p(s5), this.T(i6), this._$AH = t5;
      }
    }
    _$AC(t4) {
      let i5 = T.get(t4.strings);
      return i5 === void 0 && T.set(t4.strings, i5 = new C(t4)), i5;
    }
    k(t4) {
      u(this._$AH) || (this._$AH = [], this._$AR());
      const i5 = this._$AH;
      let s5, e7 = 0;
      for (const o6 of t4)
        e7 === i5.length ? i5.push(s5 = new N(this.O(r3()), this.O(r3()), this, this.options)) : s5 = i5[e7], s5._$AI(o6), e7++;
      e7 < i5.length && (this._$AR(s5 && s5._$AB.nextSibling, e7), i5.length = e7);
    }
    _$AR(t4 = this._$AA.nextSibling, i5) {
      var s5;
      for ((s5 = this._$AP) === null || s5 === void 0 || s5.call(this, false, true, i5); t4 && t4 !== this._$AB; ) {
        const i6 = t4.nextSibling;
        t4.remove(), t4 = i6;
      }
    }
    setConnected(t4) {
      var i5;
      this._$AM === void 0 && (this._$Cm = t4, (i5 = this._$AP) === null || i5 === void 0 || i5.call(this, t4));
    }
  };
  var S2 = class {
    constructor(t4, i5, s5, e7, o6) {
      this.type = 1, this._$AH = b, this._$AN = void 0, this.element = t4, this.name = i5, this._$AM = e7, this.options = o6, s5.length > 2 || s5[0] !== "" || s5[1] !== "" ? (this._$AH = Array(s5.length - 1).fill(new String()), this.strings = s5) : this._$AH = b;
    }
    get tagName() {
      return this.element.tagName;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t4, i5 = this, s5, e7) {
      const o6 = this.strings;
      let n6 = false;
      if (o6 === void 0)
        t4 = P(this, t4, i5, 0), n6 = !d2(t4) || t4 !== this._$AH && t4 !== x, n6 && (this._$AH = t4);
      else {
        const e8 = t4;
        let l5, h3;
        for (t4 = o6[0], l5 = 0; l5 < o6.length - 1; l5++)
          h3 = P(this, e8[s5 + l5], i5, l5), h3 === x && (h3 = this._$AH[l5]), n6 || (n6 = !d2(h3) || h3 !== this._$AH[l5]), h3 === b ? t4 = b : t4 !== b && (t4 += (h3 != null ? h3 : "") + o6[l5 + 1]), this._$AH[l5] = h3;
      }
      n6 && !e7 && this.j(t4);
    }
    j(t4) {
      t4 === b ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t4 != null ? t4 : "");
    }
  };
  var M = class extends S2 {
    constructor() {
      super(...arguments), this.type = 3;
    }
    j(t4) {
      this.element[this.name] = t4 === b ? void 0 : t4;
    }
  };
  var R = s3 ? s3.emptyScript : "";
  var k = class extends S2 {
    constructor() {
      super(...arguments), this.type = 4;
    }
    j(t4) {
      t4 && t4 !== b ? this.element.setAttribute(this.name, R) : this.element.removeAttribute(this.name);
    }
  };
  var H = class extends S2 {
    constructor(t4, i5, s5, e7, o6) {
      super(t4, i5, s5, e7, o6), this.type = 5;
    }
    _$AI(t4, i5 = this) {
      var s5;
      if ((t4 = (s5 = P(this, t4, i5, 0)) !== null && s5 !== void 0 ? s5 : b) === x)
        return;
      const e7 = this._$AH, o6 = t4 === b && e7 !== b || t4.capture !== e7.capture || t4.once !== e7.once || t4.passive !== e7.passive, n6 = t4 !== b && (e7 === b || o6);
      o6 && this.element.removeEventListener(this.name, this, e7), n6 && this.element.addEventListener(this.name, this, t4), this._$AH = t4;
    }
    handleEvent(t4) {
      var i5, s5;
      typeof this._$AH == "function" ? this._$AH.call((s5 = (i5 = this.options) === null || i5 === void 0 ? void 0 : i5.host) !== null && s5 !== void 0 ? s5 : this.element, t4) : this._$AH.handleEvent(t4);
    }
  };
  var I = class {
    constructor(t4, i5, s5) {
      this.element = t4, this.type = 6, this._$AN = void 0, this._$AM = i5, this.options = s5;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t4) {
      P(this, t4);
    }
  };
  var z = i2.litHtmlPolyfillSupport;
  z == null || z(C, N), ((t2 = i2.litHtmlVersions) !== null && t2 !== void 0 ? t2 : i2.litHtmlVersions = []).push("2.4.0");
  var Z = (t4, i5, s5) => {
    var e7, o6;
    const n6 = (e7 = s5 == null ? void 0 : s5.renderBefore) !== null && e7 !== void 0 ? e7 : i5;
    let l5 = n6._$litPart$;
    if (l5 === void 0) {
      const t5 = (o6 = s5 == null ? void 0 : s5.renderBefore) !== null && o6 !== void 0 ? o6 : null;
      n6._$litPart$ = l5 = new N(i5.insertBefore(r3(), t5), t5, void 0, s5 != null ? s5 : {});
    }
    return l5._$AI(t4), l5;
  };

  // node_modules/lit-element/lit-element.js
  var l3;
  var o4;
  var s4 = class extends d {
    constructor() {
      super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
    }
    createRenderRoot() {
      var t4, e7;
      const i5 = super.createRenderRoot();
      return (t4 = (e7 = this.renderOptions).renderBefore) !== null && t4 !== void 0 || (e7.renderBefore = i5.firstChild), i5;
    }
    update(t4) {
      const i5 = this.render();
      this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t4), this._$Do = Z(i5, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
      var t4;
      super.connectedCallback(), (t4 = this._$Do) === null || t4 === void 0 || t4.setConnected(true);
    }
    disconnectedCallback() {
      var t4;
      super.disconnectedCallback(), (t4 = this._$Do) === null || t4 === void 0 || t4.setConnected(false);
    }
    render() {
      return x;
    }
  };
  s4.finalized = true, s4._$litElement$ = true, (l3 = globalThis.litElementHydrateSupport) === null || l3 === void 0 || l3.call(globalThis, { LitElement: s4 });
  var n4 = globalThis.litElementPolyfillSupport;
  n4 == null || n4({ LitElement: s4 });
  ((o4 = globalThis.litElementVersions) !== null && o4 !== void 0 ? o4 : globalThis.litElementVersions = []).push("3.2.2");

  // node_modules/@lit/reactive-element/decorators/custom-element.js
  var e4 = (e7) => (n6) => typeof n6 == "function" ? ((e8, n7) => (customElements.define(e8, n7), n7))(e7, n6) : ((e8, n7) => {
    const { kind: t4, elements: s5 } = n7;
    return { kind: t4, elements: s5, finisher(n8) {
      customElements.define(e8, n8);
    } };
  })(e7, n6);

  // node_modules/@lit/reactive-element/decorators/property.js
  var i3 = (i5, e7) => e7.kind === "method" && e7.descriptor && !("value" in e7.descriptor) ? __spreadProps(__spreadValues({}, e7), { finisher(n6) {
    n6.createProperty(e7.key, i5);
  } }) : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: e7.key, initializer() {
    typeof e7.initializer == "function" && (this[e7.key] = e7.initializer.call(this));
  }, finisher(n6) {
    n6.createProperty(e7.key, i5);
  } };
  function e5(e7) {
    return (n6, t4) => t4 !== void 0 ? ((i5, e8, n7) => {
      e8.constructor.createProperty(n7, i5);
    })(e7, n6, t4) : i3(e7, n6);
  }

  // node_modules/@lit/reactive-element/decorators/state.js
  function t3(t4) {
    return e5(__spreadProps(__spreadValues({}, t4), { state: true }));
  }

  // node_modules/@lit/reactive-element/decorators/base.js
  var o5 = ({ finisher: e7, descriptor: t4 }) => (o6, n6) => {
    var r5;
    if (n6 === void 0) {
      const n7 = (r5 = o6.originalKey) !== null && r5 !== void 0 ? r5 : o6.key, i5 = t4 != null ? { kind: "method", placement: "prototype", key: n7, descriptor: t4(o6.key) } : __spreadProps(__spreadValues({}, o6), { key: n7 });
      return e7 != null && (i5.finisher = function(t5) {
        e7(t5, n7);
      }), i5;
    }
    {
      const r6 = o6.constructor;
      t4 !== void 0 && Object.defineProperty(o6, n6, t4(n6)), e7 == null || e7(r6, n6);
    }
  };

  // node_modules/@lit/reactive-element/decorators/query.js
  function i4(i5, n6) {
    return o5({ descriptor: (o6) => {
      const t4 = { get() {
        var o7, n7;
        return (n7 = (o7 = this.renderRoot) === null || o7 === void 0 ? void 0 : o7.querySelector(i5)) !== null && n7 !== void 0 ? n7 : null;
      }, enumerable: true, configurable: true };
      if (n6) {
        const n7 = typeof o6 == "symbol" ? Symbol() : "__" + o6;
        t4.get = function() {
          var o7, t5;
          return this[n7] === void 0 && (this[n7] = (t5 = (o7 = this.renderRoot) === null || o7 === void 0 ? void 0 : o7.querySelector(i5)) !== null && t5 !== void 0 ? t5 : null), this[n7];
        };
      }
      return t4;
    } });
  }

  // node_modules/@lit/reactive-element/decorators/query-assigned-elements.js
  var n5;
  var e6 = ((n5 = window.HTMLSlotElement) === null || n5 === void 0 ? void 0 : n5.prototype.assignedElements) != null ? (o6, n6) => o6.assignedElements(n6) : (o6, n6) => o6.assignedNodes(n6).filter((o7) => o7.nodeType === Node.ELEMENT_NODE);

  // node_modules/json-joy/esm/json-clone/clone.js
  var { isArray } = Array;
  var objectKeys = Object.keys;
  var clone = (obj) => {
    if (!obj)
      return obj;
    if (isArray(obj)) {
      const arr = [];
      const length = obj.length;
      for (let i5 = 0; i5 < length; i5++)
        arr.push(clone(obj[i5]));
      return arr;
    } else if (typeof obj === "object") {
      const keys = objectKeys(obj);
      const length = keys.length;
      const newObject = {};
      for (let i5 = 0; i5 < length; i5++) {
        const key = keys[i5];
        newObject[key] = clone(obj[key]);
      }
      return newObject;
    }
    return obj;
  };

  // node_modules/json-joy/esm/json-patch/op/AbstractOp.js
  var AbstractOp = class {
    constructor(path) {
      __publicField(this, "path");
      __publicField(this, "from");
      this.path = path;
    }
  };

  // node_modules/json-joy/esm/json-pointer/util.js
  var r1 = /~1/g;
  var r22 = /~0/g;
  var r32 = /~/g;
  var r4 = /\//g;
  function unescapeComponent(component) {
    if (component.indexOf("~") === -1)
      return component;
    return component.replace(r1, "/").replace(r22, "~");
  }
  function escapeComponent(component) {
    if (component.indexOf("/") === -1 && component.indexOf("~") === -1)
      return component;
    return component.replace(r32, "~0").replace(r4, "~1");
  }
  function parseJsonPointer(pointer) {
    if (!pointer)
      return [];
    return pointer.slice(1).split("/").map(unescapeComponent);
  }
  function formatJsonPointer(path) {
    if (isRoot(path))
      return "";
    return "/" + path.map((component) => escapeComponent(String(component))).join("/");
  }
  var toPath = (pointer) => typeof pointer === "string" ? parseJsonPointer(pointer) : pointer;
  var isRoot = (path) => !path.length;

  // node_modules/json-joy/esm/json-pointer/validate.js
  var { isArray: isArray2 } = Array;

  // node_modules/json-joy/esm/util/hasOwnProperty.js
  var has = Object.prototype.hasOwnProperty;
  function hasOwnProperty(obj, key) {
    return has.call(obj, key);
  }

  // node_modules/json-joy/esm/json-pointer/find.js
  var { isArray: isArray3 } = Array;
  var find = (val, path) => {
    const pathLength = path.length;
    if (!pathLength)
      return { val };
    let obj;
    let key;
    for (let i5 = 0; i5 < pathLength; i5++) {
      obj = val;
      key = path[i5];
      if (isArray3(obj)) {
        const length = obj.length;
        if (key === "-")
          key = length;
        else {
          if (typeof key === "string") {
            const key2 = ~~key;
            if ("" + key2 !== key)
              throw new Error("INVALID_INDEX");
            key = key2;
            if (key < 0)
              throw new Error("INVALID_INDEX");
          }
        }
        val = obj[key];
      } else if (typeof obj === "object" && !!obj) {
        val = hasOwnProperty(obj, key) ? obj[key] : void 0;
      } else
        throw new Error("NOT_FOUND");
    }
    const ref = { val, obj, key };
    return ref;
  };
  var isArrayReference = (ref) => isArray3(ref.obj) && typeof ref.key === "number";
  var isObjectReference = (ref) => typeof ref.obj === "object" && typeof ref.key === "string";

  // node_modules/json-joy/esm/json-pointer/findByPointer/v5.js
  var { isArray: isArray4 } = Array;

  // node_modules/json-joy/esm/json-patch/op/OpAdd.js
  var OpAdd = class extends AbstractOp {
    constructor(path, value) {
      super(path);
      __publicField(this, "value");
      this.value = value;
    }
    op() {
      return "add";
    }
    code() {
      return 0;
    }
    apply(doc) {
      const { val, key, obj } = find(doc, this.path);
      const value = clone(this.value);
      if (!obj)
        doc = value;
      else if (typeof key === "string")
        obj[key] = value;
      else {
        const length = obj.length;
        if (key < length)
          obj.splice(key, 0, value);
        else if (key > length)
          throw new Error("INVALID_INDEX");
        else
          obj.push(value);
      }
      return { doc, old: val };
    }
    toJson(parent) {
      return {
        op: "add",
        path: formatJsonPointer(this.path),
        value: this.value
      };
    }
    toCompact(parent, verbose) {
      const opcode = verbose ? "add" : 0;
      return [opcode, this.path, this.value];
    }
    encode(encoder) {
      encoder.encodeArrayHeader(3);
      encoder.writer.u8(0);
      encoder.encodeArray(this.path);
      encoder.encodeAny(this.value);
    }
  };

  // node_modules/json-joy/esm/json-patch/op/OpRemove.js
  var OpRemove = class extends AbstractOp {
    constructor(path, oldValue) {
      super(path);
      __publicField(this, "oldValue");
      this.oldValue = oldValue;
    }
    op() {
      return "remove";
    }
    code() {
      return 1;
    }
    apply(doc) {
      const ref = find(doc, this.path);
      if (ref.val === void 0)
        throw new Error("NOT_FOUND");
      if (isObjectReference(ref))
        delete ref.obj[ref.key];
      else if (isArrayReference(ref)) {
        if (ref.val !== void 0)
          ref.obj.splice(ref.key, 1);
      } else
        doc = null;
      return { doc, old: ref.val };
    }
    toJson(parent) {
      const json = {
        op: "remove",
        path: formatJsonPointer(this.path)
      };
      if (this.oldValue !== void 0)
        json.oldValue = this.oldValue;
      return json;
    }
    toCompact(parent, verbose) {
      const opcode = verbose ? "remove" : 1;
      return this.oldValue === void 0 ? [opcode, this.path] : [opcode, this.path, this.oldValue];
    }
    encode(encoder, parent) {
      const hasOldValue = this.oldValue !== void 0;
      encoder.encodeArrayHeader(hasOldValue ? 3 : 2);
      encoder.writer.u8(1);
      encoder.encodeArray(this.path);
      if (hasOldValue)
        encoder.encodeAny(this.oldValue);
    }
  };

  // node_modules/json-joy/esm/json-patch/op/OpReplace.js
  var OpReplace = class extends AbstractOp {
    constructor(path, value, oldValue) {
      super(path);
      __publicField(this, "value");
      __publicField(this, "oldValue");
      this.value = value;
      this.oldValue = oldValue;
    }
    op() {
      return "replace";
    }
    code() {
      return 2;
    }
    apply(doc) {
      const ref = find(doc, this.path);
      if (ref.val === void 0)
        throw new Error("NOT_FOUND");
      if (isObjectReference(ref))
        ref.obj[ref.key] = this.value;
      else if (isArrayReference(ref))
        ref.obj[ref.key] = this.value;
      else
        doc = this.value;
      return { doc, old: ref.val };
    }
    toJson(parent) {
      const json = {
        op: "replace",
        path: formatJsonPointer(this.path),
        value: this.value
      };
      if (this.oldValue !== void 0)
        json.oldValue = this.oldValue;
      return json;
    }
    toCompact(parent, verbose) {
      const opcode = verbose ? "replace" : 2;
      return this.oldValue === void 0 ? [opcode, this.path, this.value] : [opcode, this.path, this.value, this.oldValue];
    }
    encode(encoder, parent) {
      const hasOldValue = this.oldValue !== void 0;
      encoder.encodeArrayHeader(hasOldValue ? 4 : 3);
      encoder.writer.u8(2);
      encoder.encodeArray(this.path);
      encoder.encodeAny(this.value);
      if (hasOldValue)
        encoder.encodeAny(this.oldValue);
    }
  };

  // node_modules/json-joy/esm/json-patch/op/OpMove.js
  var OpMove = class extends AbstractOp {
    constructor(path, from) {
      super(path);
      __publicField(this, "from");
      this.from = from;
    }
    op() {
      return "move";
    }
    code() {
      return 4;
    }
    apply(doc) {
      const remove = new OpRemove(toPath(this.from), void 0).apply(doc);
      const add = new OpAdd(this.path, remove.old).apply(remove.doc);
      return add;
    }
    toJson(parent) {
      return {
        op: "move",
        path: formatJsonPointer(this.path),
        from: formatJsonPointer(this.from)
      };
    }
    toCompact(parent, verbose) {
      const opcode = verbose ? "move" : 4;
      return [opcode, this.path, this.from];
    }
    encode(encoder, parent) {
      encoder.encodeArrayHeader(3);
      encoder.writer.u8(4);
      encoder.encodeArray(this.path);
      encoder.encodeArray(this.from);
    }
  };

  // node_modules/json-joy/esm/json-patch/op/OpCopy.js
  var OpCopy = class extends AbstractOp {
    constructor(path, from) {
      super(path);
      __publicField(this, "from");
      this.from = from;
    }
    op() {
      return "copy";
    }
    code() {
      return 3;
    }
    apply(doc) {
      const { val } = find(doc, this.from);
      if (val === void 0)
        throw new Error("NOT_FOUND");
      const add = new OpAdd(this.path, clone(val)).apply(doc);
      return add;
    }
    toJson(parent) {
      return {
        op: "copy",
        path: formatJsonPointer(this.path),
        from: formatJsonPointer(this.from)
      };
    }
    toCompact(parent, verbose) {
      const opcode = verbose ? "copy" : 3;
      return [opcode, this.path, this.from];
    }
    encode(encoder, parent) {
      encoder.encodeArrayHeader(3);
      encoder.writer.u8(3);
      encoder.encodeArray(this.path);
      encoder.encodeArray(this.from);
    }
  };

  // node_modules/json-joy/esm/json-patch/op/AbstractPredicateOp.js
  var AbstractPredicateOp = class extends AbstractOp {
    apply(doc) {
      const test = this.test(doc);
      if (!test)
        throw new Error("TEST");
      return { doc };
    }
  };

  // node_modules/json-joy/esm/json-equal/deepEqual/v1.js
  var deepEqual = (a3, b2) => {
    if (a3 === b2)
      return true;
    if (a3 && b2 && typeof a3 === "object" && typeof b2 === "object") {
      if (a3.constructor !== b2.constructor)
        return false;
      let length, i5, keys;
      if (Array.isArray(a3)) {
        length = a3.length;
        if (length !== b2.length)
          return false;
        for (i5 = length; i5-- !== 0; )
          if (!deepEqual(a3[i5], b2[i5]))
            return false;
        return true;
      }
      keys = Object.keys(a3);
      length = keys.length;
      if (length !== Object.keys(b2).length)
        return false;
      for (i5 = length; i5-- !== 0; ) {
        const key = keys[i5];
        if (!deepEqual(a3[key], b2[key]))
          return false;
      }
      return true;
    }
    return false;
  };

  // node_modules/json-joy/esm/json-patch/op/OpTest.js
  var OpTest = class extends AbstractPredicateOp {
    constructor(path, value, not) {
      super(path);
      __publicField(this, "value");
      __publicField(this, "not");
      this.value = value;
      this.not = not;
    }
    op() {
      return "test";
    }
    code() {
      return 5;
    }
    test(doc) {
      const { val } = find(doc, this.path);
      if (val === void 0)
        return !!this.not;
      const test = deepEqual(val, this.value);
      return this.not ? !test : test;
    }
    toJson(parent) {
      const op = {
        op: "test",
        path: formatJsonPointer(parent ? this.path.slice(parent.path.length) : this.path),
        value: this.value
      };
      if (this.not)
        op.not = this.not;
      return op;
    }
    toCompact(parent, verbose) {
      const path = parent ? this.path.slice(parent.path.length) : this.path;
      const opcode = verbose ? "test" : 5;
      return this.not ? [opcode, path, this.value, 1] : [opcode, path, this.value];
    }
    encode(encoder, parent) {
      encoder.encodeArrayHeader(this.not ? 4 : 3);
      encoder.writer.u8(5);
      encoder.encodeArray(parent ? this.path.slice(parent.path.length) : this.path);
      encoder.encodeAny(this.value);
      if (this.not)
        encoder.writer.u8(1);
    }
  };

  // node_modules/json-joy/esm/json-patch/op/OpFlip.js
  var OpFlip = class extends AbstractOp {
    constructor(path) {
      super(path);
    }
    op() {
      return "flip";
    }
    code() {
      return 8;
    }
    apply(doc) {
      const ref = find(doc, this.path);
      if (ref.obj)
        ref.obj[ref.key] = !ref.val;
      else
        doc = !ref.val;
      return { doc, old: ref.val };
    }
    toJson(parent) {
      const op = {
        op: "flip",
        path: formatJsonPointer(this.path)
      };
      return op;
    }
    toCompact(parent, verbose) {
      const opcode = verbose ? "flip" : 8;
      return [opcode, this.path];
    }
    encode(encoder, parent) {
      encoder.encodeArrayHeader(2);
      encoder.writer.u8(8);
      encoder.encodeArray(this.path);
    }
  };

  // node_modules/json-joy/esm/json-patch/op/OpInc.js
  var OpInc = class extends AbstractOp {
    constructor(path, inc) {
      super(path);
      __publicField(this, "inc");
      this.inc = inc;
    }
    op() {
      return "inc";
    }
    code() {
      return 9;
    }
    apply(doc) {
      const ref = find(doc, this.path);
      const result = this.inc + Number(ref.val);
      if (ref.obj)
        ref.obj[ref.key] = result;
      else
        doc = result;
      return { doc, old: ref.val };
    }
    toJson(parent) {
      const op = {
        op: "inc",
        path: formatJsonPointer(this.path),
        inc: this.inc
      };
      return op;
    }
    toCompact(parent, verbose) {
      const opcode = verbose ? "inc" : 9;
      return [opcode, this.path, this.inc];
    }
    encode(encoder, parent) {
      encoder.encodeArrayHeader(3);
      encoder.writer.u8(9);
      encoder.encodeArray(this.path);
      encoder.encodeNumber(this.inc);
    }
  };

  // node_modules/json-joy/esm/json-patch/op/OpStrIns.js
  var OpStrIns = class extends AbstractOp {
    constructor(path, pos, str) {
      super(path);
      __publicField(this, "pos");
      __publicField(this, "str");
      this.pos = pos;
      this.str = str;
    }
    op() {
      return "str_ins";
    }
    code() {
      return 6;
    }
    apply(doc) {
      const { val, key, obj } = find(doc, this.path);
      if (typeof val !== "string") {
        if (val !== void 0)
          throw new Error("NOT_A_STRING");
        if (this.pos !== 0)
          throw new Error("POS");
      }
      const str = typeof val === "string" ? val : "";
      const pos = Math.min(this.pos, str.length);
      const before = str.slice(0, pos);
      const after = str.slice(pos);
      const result = before + this.str + after;
      if (obj)
        obj[key] = result;
      else
        doc = result;
      return { doc, old: val };
    }
    toJson(parent) {
      const op = {
        op: "str_ins",
        path: formatJsonPointer(this.path),
        pos: this.pos,
        str: this.str
      };
      return op;
    }
    toCompact(parent, verbose) {
      const opcode = verbose ? "str_ins" : 6;
      return [opcode, this.path, this.pos, this.str];
    }
    encode(encoder, parent) {
      encoder.encodeArrayHeader(4);
      encoder.writer.u8(6);
      encoder.encodeArray(this.path);
      encoder.encodeNumber(this.pos);
      encoder.encodeString(this.str);
    }
  };

  // node_modules/json-joy/esm/json-patch/op/OpStrDel.js
  var OpStrDel = class extends AbstractOp {
    constructor(path, pos, str, len) {
      super(path);
      __publicField(this, "pos");
      __publicField(this, "str");
      __publicField(this, "len");
      this.pos = pos;
      this.str = str;
      this.len = len;
    }
    op() {
      return "str_del";
    }
    code() {
      return 7;
    }
    deleteLength() {
      return typeof this.str === "string" ? this.str.length : this.len;
    }
    apply(doc) {
      const { val, key, obj } = find(doc, this.path);
      if (typeof val !== "string")
        throw new Error("NOT_A_STRING");
      const length = val.length;
      const pos = Math.min(this.pos, val.length);
      const start = Math.min(pos, length);
      const deletionLength = this.str !== void 0 ? this.str.length : this.len;
      const end = Math.min(pos + deletionLength, length);
      const before = val.slice(0, start);
      const after = val.substr(end);
      const result = before + after;
      if (obj)
        obj[key] = result;
      else
        doc = result;
      return { doc, old: val };
    }
    toJson(parent) {
      if (typeof this.str === "string") {
        return {
          op: "str_del",
          path: formatJsonPointer(this.path),
          pos: this.pos,
          str: this.str
        };
      }
      return {
        op: "str_del",
        path: formatJsonPointer(this.path),
        pos: this.pos,
        len: this.len
      };
    }
    toCompact(parent, verbose) {
      const opcode = verbose ? "str_del" : 7;
      return typeof this.str === "string" ? [opcode, this.path, this.pos, this.str] : [opcode, this.path, this.pos, 0, this.len];
    }
    encode(encoder, parent) {
      const hasStr = typeof this.str === "string";
      encoder.encodeArrayHeader(hasStr ? 4 : 5);
      encoder.writer.u8(7);
      encoder.encodeArray(this.path);
      encoder.encodeNumber(this.pos);
      if (hasStr) {
        encoder.encodeString(this.str);
      } else {
        encoder.writer.u8(0);
        encoder.encodeNumber(this.len);
      }
    }
  };

  // node_modules/json-joy/esm/json-patch/util.js
  var { isArray: isArray5 } = Array;
  var isTextNode = (node) => !!node && typeof node === "object" && typeof node.text === "string";
  var isElementNode = (node) => !!node && typeof node === "object" && isArray5(node.children);
  var createMatcherDefault = (pattern, ignoreCase) => {
    const reg = new RegExp(pattern, ignoreCase ? "i" : void 0);
    return (value) => reg.test(value);
  };

  // node_modules/json-joy/esm/json-patch/op/OpSplit.js
  var OpSplit = class extends AbstractOp {
    constructor(path, pos, props) {
      super(path);
      __publicField(this, "pos");
      __publicField(this, "props");
      this.pos = pos;
      this.props = props;
    }
    op() {
      return "split";
    }
    code() {
      return 10;
    }
    apply(doc) {
      const ref = find(doc, this.path);
      if (ref.val === void 0)
        throw new Error("NOT_FOUND");
      const tuple = this.split(ref.val);
      if (isObjectReference(ref))
        ref.obj[ref.key] = tuple;
      else if (isArrayReference(ref)) {
        ref.obj[ref.key] = tuple[0];
        ref.obj.splice(ref.key + 1, 0, tuple[1]);
      } else
        doc = tuple;
      return { doc, old: ref.val };
    }
    split(node) {
      if (typeof node === "string") {
        const { pos, props } = this;
        const before = node.slice(0, pos);
        const after = node.slice(pos);
        if (!props)
          return [before, after];
        const textNodes = [
          __spreadProps(__spreadValues({}, props), {
            text: before
          }),
          __spreadProps(__spreadValues({}, props), {
            text: after
          })
        ];
        return textNodes;
      } else if (isTextNode(node)) {
        const { pos, props } = this;
        const before = node.text.slice(0, pos);
        const after = node.text.slice(pos);
        const textNodes = [
          __spreadProps(__spreadValues(__spreadValues({}, node), props), {
            text: before
          }),
          __spreadProps(__spreadValues(__spreadValues({}, node), props), {
            text: after
          })
        ];
        return textNodes;
      } else if (isElementNode(node)) {
        const { pos, props } = this;
        const before = node.children.slice(0, pos);
        const after = node.children.slice(pos);
        const elementNodes = [
          __spreadProps(__spreadValues(__spreadValues({}, node), props), {
            children: before
          }),
          __spreadProps(__spreadValues(__spreadValues({}, node), props), {
            children: after
          })
        ];
        return elementNodes;
      } else if (typeof node === "number") {
        const { pos } = this;
        return [pos, node - pos];
      } else
        return [node, node];
    }
    toJson(parent) {
      const op = {
        op: "split",
        path: formatJsonPointer(this.path),
        pos: this.pos
      };
      if (this.props)
        op.props = this.props;
      return op;
    }
    toCompact(parent, verbose) {
      const opcode = verbose ? "split" : 10;
      return this.props ? [opcode, this.path, this.pos, this.props] : [opcode, this.path, this.pos];
    }
    encode(encoder, parent) {
      encoder.encodeArrayHeader(this.props ? 4 : 3);
      encoder.writer.u8(10);
      encoder.encodeArray(this.path);
      encoder.encodeNumber(this.pos);
      if (this.props)
        encoder.encodeObject(this.props);
    }
  };

  // node_modules/json-joy/esm/json-patch/op/OpMerge.js
  var OpMerge = class extends AbstractOp {
    constructor(path, pos, props) {
      super(path);
      __publicField(this, "pos");
      __publicField(this, "props");
      this.pos = pos;
      this.props = props;
    }
    op() {
      return "merge";
    }
    code() {
      return 11;
    }
    apply(doc) {
      const ref = find(doc, this.path);
      if (!isArrayReference(ref))
        throw new Error("INVALID_TARGET");
      if (ref.key <= 0)
        throw new Error("INVALID_KEY");
      const one = ref.obj[ref.key - 1];
      const two = ref.obj[ref.key];
      const merged = this.merge(one, two);
      ref.obj[ref.key - 1] = merged;
      ref.obj.splice(ref.key, 1);
      return { doc, old: [one, two] };
    }
    merge(one, two) {
      if (typeof one === "string" && typeof two === "string")
        return one + two;
      if (typeof one === "number" && typeof two === "number")
        return one + two;
      if (isTextNode(one) && isTextNode(two))
        return __spreadProps(__spreadValues(__spreadValues({}, one), two), { text: one.text + two.text });
      if (isElementNode(one) && isElementNode(two))
        return __spreadProps(__spreadValues(__spreadValues({}, one), two), { children: [...one.children, ...two.children] });
      return [one, two];
    }
    toJson(parent) {
      const op = {
        op: "merge",
        path: formatJsonPointer(this.path),
        pos: this.pos
      };
      if (this.props)
        op.props = this.props;
      return op;
    }
    toCompact(parent, verbose) {
      const opcode = verbose ? "merge" : 11;
      return this.props ? [opcode, this.path, this.pos, this.props] : [opcode, this.path, this.pos];
    }
    encode(encoder, parent) {
      encoder.encodeArrayHeader(this.props ? 4 : 3);
      encoder.writer.u8(11);
      encoder.encodeArray(this.path);
      encoder.encodeNumber(this.pos);
      if (this.props)
        encoder.encodeAny(this.props);
    }
  };

  // node_modules/json-joy/esm/json-patch/op/OpExtend.js
  var { isArray: isArray6 } = Array;
  var OpExtend = class extends AbstractOp {
    constructor(path, props, deleteNull) {
      super(path);
      __publicField(this, "props");
      __publicField(this, "deleteNull");
      this.props = props;
      this.deleteNull = deleteNull;
    }
    op() {
      return "extend";
    }
    code() {
      return 12;
    }
    apply(doc) {
      const ref = find(doc, this.path);
      if (isArrayReference(ref)) {
        if (ref.val !== void 0) {
          ref.obj[ref.key] = this.extend(ref.val);
        }
      } else if (isObjectReference(ref)) {
        ref.obj[ref.key] = this.extend(ref.val);
      } else {
        doc = this.extend(doc);
      }
      return { doc };
    }
    extend(value) {
      if (isArray6(value))
        return value;
      if (typeof value !== "object")
        return value;
      if (!value)
        return value;
      for (const [key, v2] of Object.entries(this.props)) {
        if (key === "__proto__")
          throw new Error("NO_PROTO");
        if (v2 === null && this.deleteNull) {
          delete value[key];
          continue;
        }
        value[key] = v2;
      }
      return value;
    }
    toJson(parent) {
      const op = {
        op: "extend",
        path: formatJsonPointer(this.path),
        props: this.props
      };
      if (this.deleteNull)
        op.deleteNull = this.deleteNull;
      return op;
    }
    toCompact(parent, verbose) {
      const opcode = verbose ? "extend" : 12;
      return this.deleteNull ? [opcode, this.path, this.props, 1] : [opcode, this.path, this.props];
    }
    encode(encoder, parent) {
      const { deleteNull } = this;
      encoder.encodeArrayHeader(deleteNull ? 4 : 3);
      encoder.writer.u8(12);
      encoder.encodeArray(this.path);
      encoder.encodeObject(this.props);
      if (deleteNull)
        encoder.writer.u8(1);
    }
  };

  // node_modules/json-joy/esm/json-patch/op/OpDefined.js
  var OpDefined = class extends AbstractPredicateOp {
    constructor(path) {
      super(path);
    }
    op() {
      return "defined";
    }
    code() {
      return 31;
    }
    test(doc) {
      const { val } = find(doc, this.path);
      const test = val !== void 0;
      return test;
    }
    toJson(parent) {
      const op = {
        op: "defined",
        path: formatJsonPointer(parent ? this.path.slice(parent.path.length) : this.path)
      };
      return op;
    }
    toCompact(parent, verbose) {
      const opcode = verbose ? "defined" : 31;
      return [opcode, parent ? this.path.slice(parent.path.length) : this.path];
    }
    encode(encoder, parent) {
      encoder.encodeArrayHeader(2);
      encoder.writer.u8(31);
      encoder.encodeArray(parent ? this.path.slice(parent.path.length) : this.path);
    }
  };

  // node_modules/json-joy/esm/json-patch/op/OpUndefined.js
  var OpUndefined = class extends AbstractPredicateOp {
    constructor(path) {
      super(path);
    }
    op() {
      return "undefined";
    }
    code() {
      return 38;
    }
    test(doc) {
      try {
        const { val } = find(doc, this.path);
        const test = val === void 0;
        return test;
      } catch (error) {
        if (error.message === "NOT_FOUND")
          return true;
        throw error;
      }
    }
    toJson(parent) {
      const op = {
        op: "undefined",
        path: formatJsonPointer(parent ? this.path.slice(parent.path.length) : this.path)
      };
      return op;
    }
    toCompact(parent, verbose) {
      const opcode = verbose ? "undefined" : 38;
      return [opcode, parent ? this.path.slice(parent.path.length) : this.path];
    }
    encode(encoder, parent) {
      encoder.encodeArrayHeader(2);
      encoder.writer.u8(38);
      encoder.encodeArray(parent ? this.path.slice(parent.path.length) : this.path);
    }
  };

  // node_modules/json-joy/esm/json-patch/op/OpTestType.js
  var { isArray: isArray7 } = Array;
  var OpTestType = class extends AbstractPredicateOp {
    constructor(path, type) {
      super(path);
      __publicField(this, "type");
      this.type = type;
    }
    op() {
      return "test_type";
    }
    code() {
      return 39;
    }
    test(doc) {
      const { val } = find(doc, this.path);
      if (val === null)
        return this.type.indexOf("null") > -1;
      if (isArray7(val))
        return this.type.indexOf("array") > -1;
      if (this.type.indexOf(typeof val) > -1)
        return true;
      if (typeof val === "number" && val === Math.round(val) && this.type.indexOf("integer") > -1)
        return true;
      return false;
    }
    toJson(parent) {
      const op = {
        op: "test_type",
        path: formatJsonPointer(parent ? this.path.slice(parent.path.length) : this.path),
        type: this.type
      };
      return op;
    }
    toCompact(parent, verbose) {
      const opcode = verbose ? "test_type" : 39;
      return [opcode, parent ? this.path.slice(parent.path.length) : this.path, this.type];
    }
    encode(encoder, parent) {
      encoder.encodeArrayHeader(3);
      encoder.writer.u8(39);
      encoder.encodeArray(parent ? this.path.slice(parent.path.length) : this.path);
      encoder.encodeArray(this.type);
    }
  };

  // node_modules/json-joy/esm/json-patch/op/OpTestString.js
  var OpTestString = class extends AbstractPredicateOp {
    constructor(path, pos, str, not) {
      super(path);
      __publicField(this, "pos");
      __publicField(this, "str");
      __publicField(this, "not");
      this.pos = pos;
      this.str = str;
      this.not = not;
    }
    op() {
      return "test_string";
    }
    code() {
      return 40;
    }
    test(doc) {
      const { val } = find(doc, this.path);
      if (typeof val !== "string")
        return false;
      const length = val.length;
      const start = Math.min(this.pos, length);
      const end = Math.min(this.pos + this.str.length, length);
      const test = val.substring(start, end) === this.str;
      return this.not ? !test : test;
    }
    toJson(parent) {
      const op = {
        op: "test_string",
        path: formatJsonPointer(parent ? this.path.slice(parent.path.length) : this.path),
        pos: this.pos,
        str: this.str
      };
      if (this.not)
        op.not = this.not;
      return op;
    }
    toCompact(parent, verbose) {
      const opcode = verbose ? "test_string" : 40;
      const path = parent ? this.path.slice(parent.path.length) : this.path;
      return this.not ? [opcode, path, this.pos, this.str, 1] : [opcode, path, this.pos, this.str];
    }
    encode(encoder, parent) {
      encoder.encodeArrayHeader(this.not ? 5 : 4);
      encoder.writer.u8(40);
      encoder.encodeArray(parent ? this.path.slice(parent.path.length) : this.path);
      encoder.encodeNumber(this.pos);
      encoder.encodeString(this.str);
      if (this.not)
        encoder.writer.u8(1);
    }
  };

  // node_modules/json-joy/esm/json-patch/op/OpTestStringLen.js
  var OpTestStringLen = class extends AbstractPredicateOp {
    constructor(path, len, not) {
      super(path);
      __publicField(this, "len");
      __publicField(this, "not");
      this.len = len;
      this.not = not;
    }
    op() {
      return "test_string_len";
    }
    code() {
      return 41;
    }
    test(doc) {
      const { val } = find(doc, this.path);
      if (typeof val !== "string")
        return false;
      const length = val.length;
      const test = length >= this.len;
      return this.not ? !test : test;
    }
    toJson(parent) {
      const op = {
        op: "test_string_len",
        path: formatJsonPointer(parent ? this.path.slice(parent.path.length) : this.path),
        len: this.len
      };
      if (this.not)
        op.not = this.not;
      return op;
    }
    toCompact(parent, verbose) {
      const opcode = verbose ? "test_string_len" : 41;
      const path = parent ? this.path.slice(parent.path.length) : this.path;
      return this.not ? [opcode, path, this.len, 1] : [opcode, path, this.len];
    }
    encode(encoder, parent) {
      encoder.encodeArrayHeader(this.not ? 4 : 3);
      encoder.writer.u8(41);
      encoder.encodeArray(parent ? this.path.slice(parent.path.length) : this.path);
      encoder.encodeNumber(this.len);
      if (this.not)
        encoder.writer.u8(1);
    }
  };

  // node_modules/json-joy/esm/json-patch/op/OpContains.js
  var OpContains = class extends AbstractPredicateOp {
    constructor(path, value, ignore_case) {
      super(path);
      __publicField(this, "value");
      __publicField(this, "ignore_case");
      this.value = value;
      this.ignore_case = ignore_case;
    }
    op() {
      return "contains";
    }
    code() {
      return 30;
    }
    test(doc) {
      const { val } = find(doc, this.path);
      if (typeof val !== "string")
        return false;
      const testValue = this.ignore_case ? val.toLowerCase() : val;
      const testString = this.ignore_case ? this.value.toLowerCase() : this.value;
      const test = testValue.indexOf(testString) > -1;
      return test;
    }
    toJson(parent) {
      const op = {
        op: "contains",
        path: formatJsonPointer(parent ? this.path.slice(parent.path.length) : this.path),
        value: this.value
      };
      if (this.ignore_case)
        op.ignore_case = this.ignore_case;
      return op;
    }
    toCompact(parent, verbose) {
      const opcode = verbose ? "contains" : 30;
      return this.ignore_case ? [opcode, parent ? this.path.slice(parent.path.length) : this.path, this.value, 1] : [opcode, parent ? this.path.slice(parent.path.length) : this.path, this.value];
    }
    encode(encoder, parent) {
      const ignoreCase = this.ignore_case;
      encoder.encodeArrayHeader(ignoreCase ? 4 : 3);
      encoder.writer.u8(30);
      encoder.encodeArray(parent ? this.path.slice(parent.path.length) : this.path);
      encoder.encodeString(this.value);
      if (ignoreCase)
        encoder.writer.u8(1);
    }
  };

  // node_modules/json-joy/esm/json-patch/op/OpEnds.js
  var OpEnds = class extends AbstractPredicateOp {
    constructor(path, value, ignore_case) {
      super(path);
      __publicField(this, "value");
      __publicField(this, "ignore_case");
      this.value = value;
      this.ignore_case = ignore_case;
    }
    op() {
      return "ends";
    }
    code() {
      return 32;
    }
    test(doc) {
      const { val } = find(doc, this.path);
      if (typeof val !== "string")
        return false;
      const outer = this.ignore_case ? val.toLowerCase() : val;
      const inner = this.ignore_case ? this.value.toLowerCase() : this.value;
      const test = outer.endsWith(inner);
      return test;
    }
    toJson(parent) {
      const op = {
        op: "ends",
        path: formatJsonPointer(parent ? this.path.slice(parent.path.length) : this.path),
        value: this.value
      };
      if (this.ignore_case)
        op.ignore_case = this.ignore_case;
      return op;
    }
    toCompact(parent, verbose) {
      const opcode = verbose ? "ends" : 32;
      return this.ignore_case ? [opcode, parent ? this.path.slice(parent.path.length) : this.path, this.value, 1] : [opcode, parent ? this.path.slice(parent.path.length) : this.path, this.value];
    }
    encode(encoder, parent) {
      const ignoreCase = this.ignore_case;
      encoder.encodeArrayHeader(ignoreCase ? 4 : 3);
      encoder.writer.u8(32);
      encoder.encodeArray(parent ? this.path.slice(parent.path.length) : this.path);
      encoder.encodeString(this.value);
      if (ignoreCase)
        encoder.writer.u8(1);
    }
  };

  // node_modules/json-joy/esm/json-patch/op/OpStarts.js
  var OpStarts = class extends AbstractPredicateOp {
    constructor(path, value, ignore_case) {
      super(path);
      __publicField(this, "value");
      __publicField(this, "ignore_case");
      this.value = value;
      this.ignore_case = ignore_case;
    }
    op() {
      return "starts";
    }
    code() {
      return 37;
    }
    test(doc) {
      const { val } = find(doc, this.path);
      if (typeof val !== "string")
        return false;
      const outer = this.ignore_case ? val.toLowerCase() : val;
      const inner = this.ignore_case ? this.value.toLowerCase() : this.value;
      const test = outer.startsWith(inner);
      return test;
    }
    toJson(parent) {
      const op = {
        op: "starts",
        path: formatJsonPointer(parent ? this.path.slice(parent.path.length) : this.path),
        value: this.value
      };
      if (this.ignore_case)
        op.ignore_case = this.ignore_case;
      return op;
    }
    toCompact(parent, verbose) {
      const opcode = verbose ? "starts" : 37;
      return this.ignore_case ? [opcode, parent ? this.path.slice(parent.path.length) : this.path, this.value, 1] : [opcode, parent ? this.path.slice(parent.path.length) : this.path, this.value];
    }
    encode(encoder, parent) {
      const ignoreCase = this.ignore_case;
      encoder.encodeArrayHeader(ignoreCase ? 4 : 3);
      encoder.writer.u8(37);
      encoder.encodeArray(parent ? this.path.slice(parent.path.length) : this.path);
      encoder.encodeString(this.value);
      if (ignoreCase)
        encoder.writer.u8(1);
    }
  };

  // node_modules/json-joy/esm/json-patch/op/OpIn.js
  var OpIn = class extends AbstractPredicateOp {
    constructor(path, value) {
      super(path);
      __publicField(this, "value");
      this.value = value;
    }
    op() {
      return "in";
    }
    code() {
      return 33;
    }
    test(doc) {
      const { val } = find(doc, this.path);
      for (const x2 of this.value)
        if (deepEqual(val, x2))
          return true;
      return false;
    }
    toJson(parent) {
      const op = {
        op: "in",
        path: formatJsonPointer(parent ? this.path.slice(parent.path.length) : this.path),
        value: this.value
      };
      return op;
    }
    toCompact(parent, verbose) {
      const opcode = verbose ? "in" : 33;
      return [opcode, parent ? this.path.slice(parent.path.length) : this.path, this.value];
    }
    encode(encoder, parent) {
      encoder.encodeArrayHeader(3);
      encoder.writer.u8(33);
      encoder.encodeArray(parent ? this.path.slice(parent.path.length) : this.path);
      encoder.encodeArray(this.value);
    }
  };

  // node_modules/json-joy/esm/json-patch/op/OpLess.js
  var OpLess = class extends AbstractPredicateOp {
    constructor(path, value) {
      super(path);
      __publicField(this, "value");
      this.value = value;
    }
    op() {
      return "less";
    }
    code() {
      return 34;
    }
    test(doc) {
      const { val } = find(doc, this.path);
      if (typeof val !== "number")
        return false;
      const test = val < this.value;
      return test;
    }
    toJson(parent) {
      const op = {
        op: "less",
        path: formatJsonPointer(parent ? this.path.slice(parent.path.length) : this.path),
        value: this.value
      };
      return op;
    }
    toCompact(parent, verbose) {
      const opcode = verbose ? "less" : 34;
      return [opcode, parent ? this.path.slice(parent.path.length) : this.path, this.value];
    }
    encode(encoder, parent) {
      encoder.encodeArrayHeader(3);
      encoder.writer.u8(34);
      encoder.encodeArray(parent ? this.path.slice(parent.path.length) : this.path);
      encoder.encodeNumber(this.value);
    }
  };

  // node_modules/json-joy/esm/json-patch/op/OpMore.js
  var OpMore = class extends AbstractPredicateOp {
    constructor(path, value) {
      super(path);
      __publicField(this, "value");
      this.value = value;
    }
    op() {
      return "more";
    }
    code() {
      return 36;
    }
    test(doc) {
      const { val } = find(doc, this.path);
      if (typeof val !== "number")
        return false;
      const test = val > this.value;
      return test;
    }
    toJson(parent) {
      const op = {
        op: "more",
        path: formatJsonPointer(parent ? this.path.slice(parent.path.length) : this.path),
        value: this.value
      };
      return op;
    }
    toCompact(parent, verbose) {
      const opcode = verbose ? "more" : 36;
      return [opcode, parent ? this.path.slice(parent.path.length) : this.path, this.value];
    }
    encode(encoder, parent) {
      encoder.encodeArrayHeader(3);
      encoder.writer.u8(36);
      encoder.encodeArray(parent ? this.path.slice(parent.path.length) : this.path);
      encoder.encodeNumber(this.value);
    }
  };

  // node_modules/json-joy/esm/json-patch/op/AbstractSecondOrderPredicateOp.js
  var AbstractSecondOrderPredicateOp = class extends AbstractPredicateOp {
    constructor(path, ops) {
      super(path);
      __publicField(this, "ops");
      this.ops = ops;
    }
  };

  // node_modules/json-joy/esm/json-patch/op/OpAnd.js
  var OpAnd = class extends AbstractSecondOrderPredicateOp {
    constructor(path, ops) {
      super(path, ops);
      __publicField(this, "ops");
      this.ops = ops;
    }
    op() {
      return "and";
    }
    code() {
      return 43;
    }
    test(doc) {
      for (const op of this.ops)
        if (!op.test(doc))
          return false;
      return true;
    }
    toJson(parent) {
      const op = {
        op: "and",
        path: formatJsonPointer(parent ? this.path.slice(parent.path.length) : this.path),
        apply: this.ops.map((op2) => op2.toJson(this))
      };
      return op;
    }
    toCompact(parent, verbose) {
      const opcode = verbose ? "and" : 43;
      return [
        opcode,
        parent ? this.path.slice(parent.path.length) : this.path,
        this.ops.map((op) => op.toCompact(this, verbose))
      ];
    }
    encode(encoder, parent) {
      const path = parent ? this.path.slice(parent.path.length) : this.path;
      encoder.encodeArrayHeader(3);
      encoder.writer.u8(43);
      encoder.encodeArray(path);
      const length = this.ops.length;
      encoder.encodeArrayHeader(length);
      for (let i5 = 0; i5 < length; i5++)
        this.ops[i5].encode(encoder, this);
    }
  };

  // node_modules/json-joy/esm/json-patch/op/OpOr.js
  var OpOr = class extends AbstractSecondOrderPredicateOp {
    constructor(path, ops) {
      super(path, ops);
      __publicField(this, "ops");
      this.ops = ops;
    }
    op() {
      return "or";
    }
    code() {
      return 45;
    }
    test(doc) {
      for (const op of this.ops)
        if (op.test(doc))
          return true;
      return false;
    }
    toJson(parent) {
      const op = {
        op: "or",
        path: formatJsonPointer(parent ? this.path.slice(parent.path.length) : this.path),
        apply: this.ops.map((op2) => op2.toJson(this))
      };
      return op;
    }
    toCompact(parent, verbose) {
      const opcode = verbose ? "or" : 45;
      return [
        opcode,
        parent ? this.path.slice(parent.path.length) : this.path,
        this.ops.map((op) => op.toCompact(this, verbose))
      ];
    }
    encode(encoder, parent) {
      encoder.encodeArrayHeader(3);
      encoder.writer.u8(45);
      encoder.encodeArray(parent ? this.path.slice(parent.path.length) : this.path);
      const length = this.ops.length;
      encoder.encodeArrayHeader(length);
      for (let i5 = 0; i5 < length; i5++)
        this.ops[i5].encode(encoder, this);
    }
  };

  // node_modules/json-joy/esm/json-patch/op/OpNot.js
  var OpNot = class extends AbstractSecondOrderPredicateOp {
    constructor(path, ops) {
      super(path, ops);
      __publicField(this, "ops");
      this.ops = ops;
    }
    op() {
      return "not";
    }
    code() {
      return 44;
    }
    test(doc) {
      for (const op of this.ops)
        if (op.test(doc))
          return false;
      return true;
    }
    toJson(parent) {
      const op = {
        op: "not",
        path: formatJsonPointer(parent ? this.path.slice(parent.path.length) : this.path),
        apply: this.ops.map((op2) => op2.toJson(this))
      };
      return op;
    }
    toCompact(parent, verbose) {
      const opcode = verbose ? "not" : 44;
      return [
        opcode,
        parent ? this.path.slice(parent.path.length) : this.path,
        this.ops.map((op) => op.toCompact(this, verbose))
      ];
    }
    encode(encoder, parent) {
      encoder.encodeArrayHeader(3);
      encoder.writer.u8(44);
      encoder.encodeArray(parent ? this.path.slice(parent.path.length) : this.path);
      const length = this.ops.length;
      encoder.encodeArrayHeader(length);
      for (let i5 = 0; i5 < length; i5++)
        this.ops[i5].encode(encoder, this);
    }
  };

  // node_modules/json-joy/esm/json-patch/op/OpMatches.js
  var OpMatches = class extends AbstractPredicateOp {
    constructor(path, value, ignore_case, createMatcher) {
      super(path);
      __publicField(this, "value");
      __publicField(this, "ignore_case");
      __publicField(this, "matcher");
      this.value = value;
      this.ignore_case = ignore_case;
      this.matcher = createMatcher(value, ignore_case);
    }
    op() {
      return "matches";
    }
    code() {
      return 35;
    }
    test(doc) {
      const { val } = find(doc, this.path);
      if (typeof val !== "string")
        return false;
      const test = this.matcher(val);
      return test;
    }
    toJson(parent) {
      const op = {
        op: "matches",
        path: formatJsonPointer(parent ? this.path.slice(parent.path.length) : this.path),
        value: this.value
      };
      if (this.ignore_case)
        op.ignore_case = this.ignore_case;
      return op;
    }
    toCompact(parent, verbose) {
      const opcode = verbose ? "matches" : 35;
      return this.ignore_case ? [opcode, parent ? this.path.slice(parent.path.length) : this.path, this.value, 1] : [opcode, parent ? this.path.slice(parent.path.length) : this.path, this.value];
    }
    encode(encoder, parent) {
      const ignoreCase = this.ignore_case;
      encoder.encodeArrayHeader(ignoreCase ? 4 : 3);
      encoder.writer.u8(35);
      encoder.encodeArray(parent ? this.path.slice(parent.path.length) : this.path);
      encoder.encodeString(this.value);
      if (ignoreCase)
        encoder.writer.u8(1);
    }
  };

  // node_modules/json-joy/esm/json-patch/op/OpType.js
  var { isArray: isArray8 } = Array;
  var OpType = class extends AbstractPredicateOp {
    constructor(path, value) {
      super(path);
      __publicField(this, "value");
      this.value = value;
    }
    op() {
      return "type";
    }
    code() {
      return 42;
    }
    test(doc) {
      const { val } = find(doc, this.path);
      if (val === null)
        return this.value === "null";
      if (isArray8(val))
        return this.value === "array";
      if (typeof val === this.value)
        return true;
      if (typeof val === "number" && val === Math.round(val) && this.value === "integer")
        return true;
      return false;
    }
    toJson(parent) {
      const op = {
        op: "type",
        path: formatJsonPointer(parent ? this.path.slice(parent.path.length) : this.path),
        value: this.value
      };
      return op;
    }
    toCompact(parent, verbose) {
      const opcode = verbose ? "type" : 42;
      return [opcode, parent ? this.path.slice(parent.path.length) : this.path, this.value];
    }
    encode(encoder, parent) {
      encoder.encodeArrayHeader(3);
      encoder.writer.u8(42);
      encoder.encodeArray(parent ? this.path.slice(parent.path.length) : this.path);
      encoder.encodeString(this.value);
    }
  };

  // node_modules/json-joy/esm/json-patch/codec/json/decode.js
  var operationToOp = (op, options) => {
    switch (op.op) {
      case "add":
        return new OpAdd(toPath(op.path), op.value);
      case "remove":
        return new OpRemove(toPath(op.path), op.oldValue);
      case "replace":
        return new OpReplace(toPath(op.path), op.value, op.oldValue);
      case "move":
        return new OpMove(toPath(op.path), toPath(op.from));
      case "copy":
        return new OpCopy(toPath(op.path), toPath(op.from));
      case "flip":
        return new OpFlip(toPath(op.path));
      case "inc":
        return new OpInc(toPath(op.path), op.inc);
      case "str_ins":
        return new OpStrIns(toPath(op.path), op.pos, op.str);
      case "str_del":
        return new OpStrDel(toPath(op.path), op.pos, op.str, op.len);
      case "split":
        return new OpSplit(toPath(op.path), op.pos, op.props || null);
      case "merge":
        return new OpMerge(toPath(op.path), op.pos, op.props || null);
      case "extend":
        return new OpExtend(toPath(op.path), op.props, !!op.deleteNull);
      default:
        return operationToPredicateOp(op, options);
    }
  };
  var operationToPredicateOp = (op, options) => {
    switch (op.op) {
      case "test":
        return new OpTest(toPath(op.path), op.value, !!op.not);
      case "defined":
        return new OpDefined(toPath(op.path));
      case "undefined":
        return new OpUndefined(toPath(op.path));
      case "type":
        return new OpType(toPath(op.path), op.value);
      case "test_type":
        return new OpTestType(toPath(op.path), op.type);
      case "test_string":
        return new OpTestString(toPath(op.path), op.pos, op.str, !!op.not);
      case "test_string_len":
        return new OpTestStringLen(toPath(op.path), op.len, !!op.not);
      case "contains":
        return new OpContains(toPath(op.path), op.value, !!op.ignore_case);
      case "ends":
        return new OpEnds(toPath(op.path), op.value, !!op.ignore_case);
      case "starts":
        return new OpStarts(toPath(op.path), op.value, !!op.ignore_case);
      case "matches":
        return new OpMatches(toPath(op.path), op.value, !!op.ignore_case, options.createMatcher || createMatcherDefault);
      case "in":
        return new OpIn(toPath(op.path), op.value);
      case "less":
        return new OpLess(toPath(op.path), op.value);
      case "more":
        return new OpMore(toPath(op.path), op.value);
      case "and": {
        const path = toPath(op.path);
        return new OpAnd(path, op.apply.map((x2) => operationToPredicateOp(__spreadProps(__spreadValues({}, x2), { path: [...path, ...toPath(x2.path)] }), options)));
      }
      case "or": {
        const path = toPath(op.path);
        return new OpOr(path, op.apply.map((x2) => operationToPredicateOp(__spreadProps(__spreadValues({}, x2), { path: [...path, ...toPath(x2.path)] }), options)));
      }
      case "not": {
        const path = toPath(op.path);
        return new OpNot(path, op.apply.map((x2) => operationToPredicateOp(__spreadProps(__spreadValues({}, x2), { path: [...path, ...toPath(x2.path)] }), options)));
      }
      default:
        throw new Error("OP_UNKNOWN");
    }
  };

  // node_modules/json-joy/esm/json-patch/applyPatch/v4.js
  function applyPatch(doc, patch, options) {
    if (!options.mutate)
      doc = clone(doc);
    const res = [];
    const length = patch.length;
    for (let i5 = 0; i5 < length; i5++) {
      const op = operationToOp(patch[i5], options);
      const opResult = op.apply(doc);
      doc = opResult.doc;
      res.push(opResult);
    }
    return { doc, res };
  }

  // node_modules/phoenix/priv/static/phoenix.mjs
  var closure = (value) => {
    if (typeof value === "function") {
      return value;
    } else {
      let closure2 = function() {
        return value;
      };
      return closure2;
    }
  };
  var globalSelf = typeof self !== "undefined" ? self : null;
  var phxWindow = typeof window !== "undefined" ? window : null;
  var global2 = globalSelf || phxWindow || global2;
  var DEFAULT_VSN = "2.0.0";
  var SOCKET_STATES = { connecting: 0, open: 1, closing: 2, closed: 3 };
  var DEFAULT_TIMEOUT = 1e4;
  var WS_CLOSE_NORMAL = 1e3;
  var CHANNEL_STATES = {
    closed: "closed",
    errored: "errored",
    joined: "joined",
    joining: "joining",
    leaving: "leaving"
  };
  var CHANNEL_EVENTS = {
    close: "phx_close",
    error: "phx_error",
    join: "phx_join",
    reply: "phx_reply",
    leave: "phx_leave"
  };
  var TRANSPORTS = {
    longpoll: "longpoll",
    websocket: "websocket"
  };
  var XHR_STATES = {
    complete: 4
  };
  var Push = class {
    constructor(channel, event, payload, timeout) {
      this.channel = channel;
      this.event = event;
      this.payload = payload || function() {
        return {};
      };
      this.receivedResp = null;
      this.timeout = timeout;
      this.timeoutTimer = null;
      this.recHooks = [];
      this.sent = false;
    }
    resend(timeout) {
      this.timeout = timeout;
      this.reset();
      this.send();
    }
    send() {
      if (this.hasReceived("timeout")) {
        return;
      }
      this.startTimeout();
      this.sent = true;
      this.channel.socket.push({
        topic: this.channel.topic,
        event: this.event,
        payload: this.payload(),
        ref: this.ref,
        join_ref: this.channel.joinRef()
      });
    }
    receive(status, callback) {
      if (this.hasReceived(status)) {
        callback(this.receivedResp.response);
      }
      this.recHooks.push({ status, callback });
      return this;
    }
    reset() {
      this.cancelRefEvent();
      this.ref = null;
      this.refEvent = null;
      this.receivedResp = null;
      this.sent = false;
    }
    matchReceive({ status, response, _ref }) {
      this.recHooks.filter((h3) => h3.status === status).forEach((h3) => h3.callback(response));
    }
    cancelRefEvent() {
      if (!this.refEvent) {
        return;
      }
      this.channel.off(this.refEvent);
    }
    cancelTimeout() {
      clearTimeout(this.timeoutTimer);
      this.timeoutTimer = null;
    }
    startTimeout() {
      if (this.timeoutTimer) {
        this.cancelTimeout();
      }
      this.ref = this.channel.socket.makeRef();
      this.refEvent = this.channel.replyEventName(this.ref);
      this.channel.on(this.refEvent, (payload) => {
        this.cancelRefEvent();
        this.cancelTimeout();
        this.receivedResp = payload;
        this.matchReceive(payload);
      });
      this.timeoutTimer = setTimeout(() => {
        this.trigger("timeout", {});
      }, this.timeout);
    }
    hasReceived(status) {
      return this.receivedResp && this.receivedResp.status === status;
    }
    trigger(status, response) {
      this.channel.trigger(this.refEvent, { status, response });
    }
  };
  var Timer = class {
    constructor(callback, timerCalc) {
      this.callback = callback;
      this.timerCalc = timerCalc;
      this.timer = null;
      this.tries = 0;
    }
    reset() {
      this.tries = 0;
      clearTimeout(this.timer);
    }
    scheduleTimeout() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.tries = this.tries + 1;
        this.callback();
      }, this.timerCalc(this.tries + 1));
    }
  };
  var Channel = class {
    constructor(topic, params, socket) {
      this.state = CHANNEL_STATES.closed;
      this.topic = topic;
      this.params = closure(params || {});
      this.socket = socket;
      this.bindings = [];
      this.bindingRef = 0;
      this.timeout = this.socket.timeout;
      this.joinedOnce = false;
      this.joinPush = new Push(this, CHANNEL_EVENTS.join, this.params, this.timeout);
      this.pushBuffer = [];
      this.stateChangeRefs = [];
      this.rejoinTimer = new Timer(() => {
        if (this.socket.isConnected()) {
          this.rejoin();
        }
      }, this.socket.rejoinAfterMs);
      this.stateChangeRefs.push(this.socket.onError(() => this.rejoinTimer.reset()));
      this.stateChangeRefs.push(this.socket.onOpen(() => {
        this.rejoinTimer.reset();
        if (this.isErrored()) {
          this.rejoin();
        }
      }));
      this.joinPush.receive("ok", () => {
        this.state = CHANNEL_STATES.joined;
        this.rejoinTimer.reset();
        this.pushBuffer.forEach((pushEvent) => pushEvent.send());
        this.pushBuffer = [];
      });
      this.joinPush.receive("error", () => {
        this.state = CHANNEL_STATES.errored;
        if (this.socket.isConnected()) {
          this.rejoinTimer.scheduleTimeout();
        }
      });
      this.onClose(() => {
        this.rejoinTimer.reset();
        if (this.socket.hasLogger())
          this.socket.log("channel", `close ${this.topic} ${this.joinRef()}`);
        this.state = CHANNEL_STATES.closed;
        this.socket.remove(this);
      });
      this.onError((reason) => {
        if (this.socket.hasLogger())
          this.socket.log("channel", `error ${this.topic}`, reason);
        if (this.isJoining()) {
          this.joinPush.reset();
        }
        this.state = CHANNEL_STATES.errored;
        if (this.socket.isConnected()) {
          this.rejoinTimer.scheduleTimeout();
        }
      });
      this.joinPush.receive("timeout", () => {
        if (this.socket.hasLogger())
          this.socket.log("channel", `timeout ${this.topic} (${this.joinRef()})`, this.joinPush.timeout);
        let leavePush = new Push(this, CHANNEL_EVENTS.leave, closure({}), this.timeout);
        leavePush.send();
        this.state = CHANNEL_STATES.errored;
        this.joinPush.reset();
        if (this.socket.isConnected()) {
          this.rejoinTimer.scheduleTimeout();
        }
      });
      this.on(CHANNEL_EVENTS.reply, (payload, ref) => {
        this.trigger(this.replyEventName(ref), payload);
      });
    }
    join(timeout = this.timeout) {
      if (this.joinedOnce) {
        throw new Error("tried to join multiple times. 'join' can only be called a single time per channel instance");
      } else {
        this.timeout = timeout;
        this.joinedOnce = true;
        this.rejoin();
        return this.joinPush;
      }
    }
    onClose(callback) {
      this.on(CHANNEL_EVENTS.close, callback);
    }
    onError(callback) {
      return this.on(CHANNEL_EVENTS.error, (reason) => callback(reason));
    }
    on(event, callback) {
      let ref = this.bindingRef++;
      this.bindings.push({ event, ref, callback });
      return ref;
    }
    off(event, ref) {
      this.bindings = this.bindings.filter((bind) => {
        return !(bind.event === event && (typeof ref === "undefined" || ref === bind.ref));
      });
    }
    canPush() {
      return this.socket.isConnected() && this.isJoined();
    }
    push(event, payload, timeout = this.timeout) {
      payload = payload || {};
      if (!this.joinedOnce) {
        throw new Error(`tried to push '${event}' to '${this.topic}' before joining. Use channel.join() before pushing events`);
      }
      let pushEvent = new Push(this, event, function() {
        return payload;
      }, timeout);
      if (this.canPush()) {
        pushEvent.send();
      } else {
        pushEvent.startTimeout();
        this.pushBuffer.push(pushEvent);
      }
      return pushEvent;
    }
    leave(timeout = this.timeout) {
      this.rejoinTimer.reset();
      this.joinPush.cancelTimeout();
      this.state = CHANNEL_STATES.leaving;
      let onClose = () => {
        if (this.socket.hasLogger())
          this.socket.log("channel", `leave ${this.topic}`);
        this.trigger(CHANNEL_EVENTS.close, "leave");
      };
      let leavePush = new Push(this, CHANNEL_EVENTS.leave, closure({}), timeout);
      leavePush.receive("ok", () => onClose()).receive("timeout", () => onClose());
      leavePush.send();
      if (!this.canPush()) {
        leavePush.trigger("ok", {});
      }
      return leavePush;
    }
    onMessage(_event, payload, _ref) {
      return payload;
    }
    isMember(topic, event, payload, joinRef) {
      if (this.topic !== topic) {
        return false;
      }
      if (joinRef && joinRef !== this.joinRef()) {
        if (this.socket.hasLogger())
          this.socket.log("channel", "dropping outdated message", { topic, event, payload, joinRef });
        return false;
      } else {
        return true;
      }
    }
    joinRef() {
      return this.joinPush.ref;
    }
    rejoin(timeout = this.timeout) {
      if (this.isLeaving()) {
        return;
      }
      this.socket.leaveOpenTopic(this.topic);
      this.state = CHANNEL_STATES.joining;
      this.joinPush.resend(timeout);
    }
    trigger(event, payload, ref, joinRef) {
      let handledPayload = this.onMessage(event, payload, ref, joinRef);
      if (payload && !handledPayload) {
        throw new Error("channel onMessage callbacks must return the payload, modified or unmodified");
      }
      let eventBindings = this.bindings.filter((bind) => bind.event === event);
      for (let i5 = 0; i5 < eventBindings.length; i5++) {
        let bind = eventBindings[i5];
        bind.callback(handledPayload, ref, joinRef || this.joinRef());
      }
    }
    replyEventName(ref) {
      return `chan_reply_${ref}`;
    }
    isClosed() {
      return this.state === CHANNEL_STATES.closed;
    }
    isErrored() {
      return this.state === CHANNEL_STATES.errored;
    }
    isJoined() {
      return this.state === CHANNEL_STATES.joined;
    }
    isJoining() {
      return this.state === CHANNEL_STATES.joining;
    }
    isLeaving() {
      return this.state === CHANNEL_STATES.leaving;
    }
  };
  var Ajax = class {
    static request(method, endPoint, accept, body, timeout, ontimeout, callback) {
      if (global2.XDomainRequest) {
        let req = new global2.XDomainRequest();
        return this.xdomainRequest(req, method, endPoint, body, timeout, ontimeout, callback);
      } else {
        let req = new global2.XMLHttpRequest();
        return this.xhrRequest(req, method, endPoint, accept, body, timeout, ontimeout, callback);
      }
    }
    static xdomainRequest(req, method, endPoint, body, timeout, ontimeout, callback) {
      req.timeout = timeout;
      req.open(method, endPoint);
      req.onload = () => {
        let response = this.parseJSON(req.responseText);
        callback && callback(response);
      };
      if (ontimeout) {
        req.ontimeout = ontimeout;
      }
      req.onprogress = () => {
      };
      req.send(body);
      return req;
    }
    static xhrRequest(req, method, endPoint, accept, body, timeout, ontimeout, callback) {
      req.open(method, endPoint, true);
      req.timeout = timeout;
      req.setRequestHeader("Content-Type", accept);
      req.onerror = () => callback && callback(null);
      req.onreadystatechange = () => {
        if (req.readyState === XHR_STATES.complete && callback) {
          let response = this.parseJSON(req.responseText);
          callback(response);
        }
      };
      if (ontimeout) {
        req.ontimeout = ontimeout;
      }
      req.send(body);
      return req;
    }
    static parseJSON(resp) {
      if (!resp || resp === "") {
        return null;
      }
      try {
        return JSON.parse(resp);
      } catch (e7) {
        console && console.log("failed to parse JSON response", resp);
        return null;
      }
    }
    static serialize(obj, parentKey) {
      let queryStr = [];
      for (var key in obj) {
        if (!Object.prototype.hasOwnProperty.call(obj, key)) {
          continue;
        }
        let paramKey = parentKey ? `${parentKey}[${key}]` : key;
        let paramVal = obj[key];
        if (typeof paramVal === "object") {
          queryStr.push(this.serialize(paramVal, paramKey));
        } else {
          queryStr.push(encodeURIComponent(paramKey) + "=" + encodeURIComponent(paramVal));
        }
      }
      return queryStr.join("&");
    }
    static appendParams(url, params) {
      if (Object.keys(params).length === 0) {
        return url;
      }
      let prefix = url.match(/\?/) ? "&" : "?";
      return `${url}${prefix}${this.serialize(params)}`;
    }
  };
  var LongPoll = class {
    constructor(endPoint) {
      this.endPoint = null;
      this.token = null;
      this.skipHeartbeat = true;
      this.reqs = /* @__PURE__ */ new Set();
      this.onopen = function() {
      };
      this.onerror = function() {
      };
      this.onmessage = function() {
      };
      this.onclose = function() {
      };
      this.pollEndpoint = this.normalizeEndpoint(endPoint);
      this.readyState = SOCKET_STATES.connecting;
      this.poll();
    }
    normalizeEndpoint(endPoint) {
      return endPoint.replace("ws://", "http://").replace("wss://", "https://").replace(new RegExp("(.*)/" + TRANSPORTS.websocket), "$1/" + TRANSPORTS.longpoll);
    }
    endpointURL() {
      return Ajax.appendParams(this.pollEndpoint, { token: this.token });
    }
    closeAndRetry(code, reason, wasClean) {
      this.close(code, reason, wasClean);
      this.readyState = SOCKET_STATES.connecting;
    }
    ontimeout() {
      this.onerror("timeout");
      this.closeAndRetry(1005, "timeout", false);
    }
    isActive() {
      return this.readyState === SOCKET_STATES.open || this.readyState === SOCKET_STATES.connecting;
    }
    poll() {
      this.ajax("GET", null, () => this.ontimeout(), (resp) => {
        if (resp) {
          var { status, token, messages } = resp;
          this.token = token;
        } else {
          status = 0;
        }
        switch (status) {
          case 200:
            messages.forEach((msg) => {
              setTimeout(() => this.onmessage({ data: msg }), 0);
            });
            this.poll();
            break;
          case 204:
            this.poll();
            break;
          case 410:
            this.readyState = SOCKET_STATES.open;
            this.onopen({});
            this.poll();
            break;
          case 403:
            this.onerror(403);
            this.close(1008, "forbidden", false);
            break;
          case 0:
          case 500:
            this.onerror(500);
            this.closeAndRetry(1011, "internal server error", 500);
            break;
          default:
            throw new Error(`unhandled poll status ${status}`);
        }
      });
    }
    send(body) {
      this.ajax("POST", body, () => this.onerror("timeout"), (resp) => {
        if (!resp || resp.status !== 200) {
          this.onerror(resp && resp.status);
          this.closeAndRetry(1011, "internal server error", false);
        }
      });
    }
    close(code, reason, wasClean) {
      for (let req of this.reqs) {
        req.abort();
      }
      this.readyState = SOCKET_STATES.closed;
      let opts = Object.assign({ code: 1e3, reason: void 0, wasClean: true }, { code, reason, wasClean });
      if (typeof CloseEvent !== "undefined") {
        this.onclose(new CloseEvent("close", opts));
      } else {
        this.onclose(opts);
      }
    }
    ajax(method, body, onCallerTimeout, callback) {
      let req;
      let ontimeout = () => {
        this.reqs.delete(req);
        onCallerTimeout();
      };
      req = Ajax.request(method, this.endpointURL(), "application/json", body, this.timeout, ontimeout, (resp) => {
        this.reqs.delete(req);
        if (this.isActive()) {
          callback(resp);
        }
      });
      this.reqs.add(req);
    }
  };
  var serializer_default = {
    HEADER_LENGTH: 1,
    META_LENGTH: 4,
    KINDS: { push: 0, reply: 1, broadcast: 2 },
    encode(msg, callback) {
      if (msg.payload.constructor === ArrayBuffer) {
        return callback(this.binaryEncode(msg));
      } else {
        let payload = [msg.join_ref, msg.ref, msg.topic, msg.event, msg.payload];
        return callback(JSON.stringify(payload));
      }
    },
    decode(rawPayload, callback) {
      if (rawPayload.constructor === ArrayBuffer) {
        return callback(this.binaryDecode(rawPayload));
      } else {
        let [join_ref, ref, topic, event, payload] = JSON.parse(rawPayload);
        return callback({ join_ref, ref, topic, event, payload });
      }
    },
    binaryEncode(message) {
      let { join_ref, ref, event, topic, payload } = message;
      let metaLength = this.META_LENGTH + join_ref.length + ref.length + topic.length + event.length;
      let header = new ArrayBuffer(this.HEADER_LENGTH + metaLength);
      let view = new DataView(header);
      let offset = 0;
      view.setUint8(offset++, this.KINDS.push);
      view.setUint8(offset++, join_ref.length);
      view.setUint8(offset++, ref.length);
      view.setUint8(offset++, topic.length);
      view.setUint8(offset++, event.length);
      Array.from(join_ref, (char) => view.setUint8(offset++, char.charCodeAt(0)));
      Array.from(ref, (char) => view.setUint8(offset++, char.charCodeAt(0)));
      Array.from(topic, (char) => view.setUint8(offset++, char.charCodeAt(0)));
      Array.from(event, (char) => view.setUint8(offset++, char.charCodeAt(0)));
      var combined = new Uint8Array(header.byteLength + payload.byteLength);
      combined.set(new Uint8Array(header), 0);
      combined.set(new Uint8Array(payload), header.byteLength);
      return combined.buffer;
    },
    binaryDecode(buffer) {
      let view = new DataView(buffer);
      let kind = view.getUint8(0);
      let decoder = new TextDecoder();
      switch (kind) {
        case this.KINDS.push:
          return this.decodePush(buffer, view, decoder);
        case this.KINDS.reply:
          return this.decodeReply(buffer, view, decoder);
        case this.KINDS.broadcast:
          return this.decodeBroadcast(buffer, view, decoder);
      }
    },
    decodePush(buffer, view, decoder) {
      let joinRefSize = view.getUint8(1);
      let topicSize = view.getUint8(2);
      let eventSize = view.getUint8(3);
      let offset = this.HEADER_LENGTH + this.META_LENGTH - 1;
      let joinRef = decoder.decode(buffer.slice(offset, offset + joinRefSize));
      offset = offset + joinRefSize;
      let topic = decoder.decode(buffer.slice(offset, offset + topicSize));
      offset = offset + topicSize;
      let event = decoder.decode(buffer.slice(offset, offset + eventSize));
      offset = offset + eventSize;
      let data = buffer.slice(offset, buffer.byteLength);
      return { join_ref: joinRef, ref: null, topic, event, payload: data };
    },
    decodeReply(buffer, view, decoder) {
      let joinRefSize = view.getUint8(1);
      let refSize = view.getUint8(2);
      let topicSize = view.getUint8(3);
      let eventSize = view.getUint8(4);
      let offset = this.HEADER_LENGTH + this.META_LENGTH;
      let joinRef = decoder.decode(buffer.slice(offset, offset + joinRefSize));
      offset = offset + joinRefSize;
      let ref = decoder.decode(buffer.slice(offset, offset + refSize));
      offset = offset + refSize;
      let topic = decoder.decode(buffer.slice(offset, offset + topicSize));
      offset = offset + topicSize;
      let event = decoder.decode(buffer.slice(offset, offset + eventSize));
      offset = offset + eventSize;
      let data = buffer.slice(offset, buffer.byteLength);
      let payload = { status: event, response: data };
      return { join_ref: joinRef, ref, topic, event: CHANNEL_EVENTS.reply, payload };
    },
    decodeBroadcast(buffer, view, decoder) {
      let topicSize = view.getUint8(1);
      let eventSize = view.getUint8(2);
      let offset = this.HEADER_LENGTH + 2;
      let topic = decoder.decode(buffer.slice(offset, offset + topicSize));
      offset = offset + topicSize;
      let event = decoder.decode(buffer.slice(offset, offset + eventSize));
      offset = offset + eventSize;
      let data = buffer.slice(offset, buffer.byteLength);
      return { join_ref: null, ref: null, topic, event, payload: data };
    }
  };
  var Socket = class {
    constructor(endPoint, opts = {}) {
      this.stateChangeCallbacks = { open: [], close: [], error: [], message: [] };
      this.channels = [];
      this.sendBuffer = [];
      this.ref = 0;
      this.timeout = opts.timeout || DEFAULT_TIMEOUT;
      this.transport = opts.transport || global2.WebSocket || LongPoll;
      this.establishedConnections = 0;
      this.defaultEncoder = serializer_default.encode.bind(serializer_default);
      this.defaultDecoder = serializer_default.decode.bind(serializer_default);
      this.closeWasClean = false;
      this.binaryType = opts.binaryType || "arraybuffer";
      this.connectClock = 1;
      if (this.transport !== LongPoll) {
        this.encode = opts.encode || this.defaultEncoder;
        this.decode = opts.decode || this.defaultDecoder;
      } else {
        this.encode = this.defaultEncoder;
        this.decode = this.defaultDecoder;
      }
      let awaitingConnectionOnPageShow = null;
      if (phxWindow && phxWindow.addEventListener) {
        phxWindow.addEventListener("pagehide", (_e) => {
          if (this.conn) {
            this.disconnect();
            awaitingConnectionOnPageShow = this.connectClock;
          }
        });
        phxWindow.addEventListener("pageshow", (_e) => {
          if (awaitingConnectionOnPageShow === this.connectClock) {
            awaitingConnectionOnPageShow = null;
            this.connect();
          }
        });
      }
      this.heartbeatIntervalMs = opts.heartbeatIntervalMs || 3e4;
      this.rejoinAfterMs = (tries) => {
        if (opts.rejoinAfterMs) {
          return opts.rejoinAfterMs(tries);
        } else {
          return [1e3, 2e3, 5e3][tries - 1] || 1e4;
        }
      };
      this.reconnectAfterMs = (tries) => {
        if (opts.reconnectAfterMs) {
          return opts.reconnectAfterMs(tries);
        } else {
          return [10, 50, 100, 150, 200, 250, 500, 1e3, 2e3][tries - 1] || 5e3;
        }
      };
      this.logger = opts.logger || null;
      this.longpollerTimeout = opts.longpollerTimeout || 2e4;
      this.params = closure(opts.params || {});
      this.endPoint = `${endPoint}/${TRANSPORTS.websocket}`;
      this.vsn = opts.vsn || DEFAULT_VSN;
      this.heartbeatTimer = null;
      this.pendingHeartbeatRef = null;
      this.reconnectTimer = new Timer(() => {
        this.teardown(() => this.connect());
      }, this.reconnectAfterMs);
    }
    getLongPollTransport() {
      return LongPoll;
    }
    replaceTransport(newTransport) {
      this.connectClock++;
      this.closeWasClean = true;
      this.reconnectTimer.reset();
      this.sendBuffer = [];
      if (this.conn) {
        this.conn.close();
        this.conn = null;
      }
      this.transport = newTransport;
    }
    protocol() {
      return location.protocol.match(/^https/) ? "wss" : "ws";
    }
    endPointURL() {
      let uri = Ajax.appendParams(Ajax.appendParams(this.endPoint, this.params()), { vsn: this.vsn });
      if (uri.charAt(0) !== "/") {
        return uri;
      }
      if (uri.charAt(1) === "/") {
        return `${this.protocol()}:${uri}`;
      }
      return `${this.protocol()}://${location.host}${uri}`;
    }
    disconnect(callback, code, reason) {
      this.connectClock++;
      this.closeWasClean = true;
      this.reconnectTimer.reset();
      this.teardown(callback, code, reason);
    }
    connect(params) {
      if (params) {
        console && console.log("passing params to connect is deprecated. Instead pass :params to the Socket constructor");
        this.params = closure(params);
      }
      if (this.conn) {
        return;
      }
      this.connectClock++;
      this.closeWasClean = false;
      this.conn = new this.transport(this.endPointURL());
      this.conn.binaryType = this.binaryType;
      this.conn.timeout = this.longpollerTimeout;
      this.conn.onopen = () => this.onConnOpen();
      this.conn.onerror = (error) => this.onConnError(error);
      this.conn.onmessage = (event) => this.onConnMessage(event);
      this.conn.onclose = (event) => this.onConnClose(event);
    }
    log(kind, msg, data) {
      this.logger(kind, msg, data);
    }
    hasLogger() {
      return this.logger !== null;
    }
    onOpen(callback) {
      let ref = this.makeRef();
      this.stateChangeCallbacks.open.push([ref, callback]);
      return ref;
    }
    onClose(callback) {
      let ref = this.makeRef();
      this.stateChangeCallbacks.close.push([ref, callback]);
      return ref;
    }
    onError(callback) {
      let ref = this.makeRef();
      this.stateChangeCallbacks.error.push([ref, callback]);
      return ref;
    }
    onMessage(callback) {
      let ref = this.makeRef();
      this.stateChangeCallbacks.message.push([ref, callback]);
      return ref;
    }
    ping(callback) {
      if (!this.isConnected()) {
        return false;
      }
      let ref = this.makeRef();
      let startTime = Date.now();
      this.push({ topic: "phoenix", event: "heartbeat", payload: {}, ref });
      let onMsgRef = this.onMessage((msg) => {
        if (msg.ref === ref) {
          this.off([onMsgRef]);
          callback(Date.now() - startTime);
        }
      });
      return true;
    }
    onConnOpen() {
      if (this.hasLogger())
        this.log("transport", `connected to ${this.endPointURL()}`);
      this.closeWasClean = false;
      this.establishedConnections++;
      this.flushSendBuffer();
      this.reconnectTimer.reset();
      this.resetHeartbeat();
      this.stateChangeCallbacks.open.forEach(([, callback]) => callback());
    }
    heartbeatTimeout() {
      if (this.pendingHeartbeatRef) {
        this.pendingHeartbeatRef = null;
        if (this.hasLogger()) {
          this.log("transport", "heartbeat timeout. Attempting to re-establish connection");
        }
        this.abnormalClose("heartbeat timeout");
      }
    }
    resetHeartbeat() {
      if (this.conn && this.conn.skipHeartbeat) {
        return;
      }
      this.pendingHeartbeatRef = null;
      clearTimeout(this.heartbeatTimer);
      setTimeout(() => this.sendHeartbeat(), this.heartbeatIntervalMs);
    }
    teardown(callback, code, reason) {
      if (!this.conn) {
        return callback && callback();
      }
      this.waitForBufferDone(() => {
        if (this.conn) {
          if (code) {
            this.conn.close(code, reason || "");
          } else {
            this.conn.close();
          }
        }
        this.waitForSocketClosed(() => {
          if (this.conn) {
            this.conn.onclose = function() {
            };
            this.conn = null;
          }
          callback && callback();
        });
      });
    }
    waitForBufferDone(callback, tries = 1) {
      if (tries === 5 || !this.conn || !this.conn.bufferedAmount) {
        callback();
        return;
      }
      setTimeout(() => {
        this.waitForBufferDone(callback, tries + 1);
      }, 150 * tries);
    }
    waitForSocketClosed(callback, tries = 1) {
      if (tries === 5 || !this.conn || this.conn.readyState === SOCKET_STATES.closed) {
        callback();
        return;
      }
      setTimeout(() => {
        this.waitForSocketClosed(callback, tries + 1);
      }, 150 * tries);
    }
    onConnClose(event) {
      let closeCode = event && event.code;
      if (this.hasLogger())
        this.log("transport", "close", event);
      this.triggerChanError();
      clearTimeout(this.heartbeatTimer);
      if (!this.closeWasClean && closeCode !== 1e3) {
        this.reconnectTimer.scheduleTimeout();
      }
      this.stateChangeCallbacks.close.forEach(([, callback]) => callback(event));
    }
    onConnError(error) {
      if (this.hasLogger())
        this.log("transport", error);
      let transportBefore = this.transport;
      let establishedBefore = this.establishedConnections;
      this.stateChangeCallbacks.error.forEach(([, callback]) => {
        callback(error, transportBefore, establishedBefore);
      });
      if (transportBefore === this.transport || establishedBefore > 0) {
        this.triggerChanError();
      }
    }
    triggerChanError() {
      this.channels.forEach((channel) => {
        if (!(channel.isErrored() || channel.isLeaving() || channel.isClosed())) {
          channel.trigger(CHANNEL_EVENTS.error);
        }
      });
    }
    connectionState() {
      switch (this.conn && this.conn.readyState) {
        case SOCKET_STATES.connecting:
          return "connecting";
        case SOCKET_STATES.open:
          return "open";
        case SOCKET_STATES.closing:
          return "closing";
        default:
          return "closed";
      }
    }
    isConnected() {
      return this.connectionState() === "open";
    }
    remove(channel) {
      this.off(channel.stateChangeRefs);
      this.channels = this.channels.filter((c3) => c3.joinRef() !== channel.joinRef());
    }
    off(refs) {
      for (let key in this.stateChangeCallbacks) {
        this.stateChangeCallbacks[key] = this.stateChangeCallbacks[key].filter(([ref]) => {
          return refs.indexOf(ref) === -1;
        });
      }
    }
    channel(topic, chanParams = {}) {
      let chan = new Channel(topic, chanParams, this);
      this.channels.push(chan);
      return chan;
    }
    push(data) {
      if (this.hasLogger()) {
        let { topic, event, payload, ref, join_ref } = data;
        this.log("push", `${topic} ${event} (${join_ref}, ${ref})`, payload);
      }
      if (this.isConnected()) {
        this.encode(data, (result) => this.conn.send(result));
      } else {
        this.sendBuffer.push(() => this.encode(data, (result) => this.conn.send(result)));
      }
    }
    makeRef() {
      let newRef = this.ref + 1;
      if (newRef === this.ref) {
        this.ref = 0;
      } else {
        this.ref = newRef;
      }
      return this.ref.toString();
    }
    sendHeartbeat() {
      if (this.pendingHeartbeatRef && !this.isConnected()) {
        return;
      }
      this.pendingHeartbeatRef = this.makeRef();
      this.push({ topic: "phoenix", event: "heartbeat", payload: {}, ref: this.pendingHeartbeatRef });
      this.heartbeatTimer = setTimeout(() => this.heartbeatTimeout(), this.heartbeatIntervalMs);
    }
    abnormalClose(reason) {
      this.closeWasClean = false;
      if (this.isConnected()) {
        this.conn.close(WS_CLOSE_NORMAL, reason);
      }
    }
    flushSendBuffer() {
      if (this.isConnected() && this.sendBuffer.length > 0) {
        this.sendBuffer.forEach((callback) => callback());
        this.sendBuffer = [];
      }
    }
    onConnMessage(rawMessage) {
      this.decode(rawMessage.data, (msg) => {
        let { topic, event, payload, ref, join_ref } = msg;
        if (ref && ref === this.pendingHeartbeatRef) {
          clearTimeout(this.heartbeatTimer);
          this.pendingHeartbeatRef = null;
          setTimeout(() => this.sendHeartbeat(), this.heartbeatIntervalMs);
        }
        if (this.hasLogger())
          this.log("receive", `${payload.status || ""} ${topic} ${event} ${ref && "(" + ref + ")" || ""}`, payload);
        for (let i5 = 0; i5 < this.channels.length; i5++) {
          const channel = this.channels[i5];
          if (!channel.isMember(topic, event, payload, join_ref)) {
            continue;
          }
          channel.trigger(event, payload, ref, join_ref);
        }
        for (let i5 = 0; i5 < this.stateChangeCallbacks.message.length; i5++) {
          let [, callback] = this.stateChangeCallbacks.message[i5];
          callback(msg);
        }
      });
    }
    leaveOpenTopic(topic) {
      let dupChannel = this.channels.find((c3) => c3.topic === topic && (c3.isJoined() || c3.isJoining()));
      if (dupChannel) {
        if (this.hasLogger())
          this.log("transport", `leaving duplicate topic "${topic}"`);
        dupChannel.leave();
      }
    }
  };

  // node_modules/phx-live-state/build/src/live-state.js
  var LiveState = class {
    constructor(config) {
      this.subscribers = [];
      this.connected = false;
      this.config = config;
      console.log(`connecting liveState to ${this.config.url} from ${this.constructor.name}`);
      this.socket = new Socket(this.config.url, { logger: (kind, msg, data) => {
        console.log(`${kind}: ${msg}`, data);
      } });
    }
    connect(params) {
      if (!this.connected) {
        this.socket.connect();
        this.channel = this.socket.channel(this.config.topic, params || this.config.params);
        this.channel.join().receive("ok", () => {
          console.log("joined");
        });
        this.channel.on("state:change", (state) => this.handleChange(state));
        this.channel.on("state:patch", (patch) => this.handlePatch(patch));
        this.connected = true;
      }
    }
    disconnect() {
      this.channel && this.channel.leave();
      this.socket.disconnect();
    }
    subscribe(subscriber) {
      this.subscribers.push(subscriber);
    }
    unsubscribe(subscriber) {
      this.subscribers = this.subscribers.filter((s5) => s5 !== subscriber);
    }
    handleChange({ state, version }) {
      this.state = state;
      this.stateVersion = version;
      this.notifySubscribers(this.state);
    }
    handlePatch({ patch, version }) {
      if (version === this.stateVersion + 1) {
        const { doc, res } = applyPatch(this.state, patch, { mutate: false });
        this.state = doc;
        this.stateVersion = version;
        this.notifySubscribers(this.state);
      } else {
        this.channel.push("lvs_refresh");
      }
    }
    notifySubscribers(state) {
      this.subscribers.forEach((subscriber) => subscriber(state));
    }
    pushEvent(eventName, payload) {
      this.channel.push(`lvs_evt:${eventName}`, payload);
    }
    pushCustomEvent(event) {
      this.channel.push(`lvs_evt:${event.type}`, event.detail);
    }
  };
  var live_state_default = LiveState;

  // node_modules/phx-live-state/build/src/connectElement.js
  var connectElement = (liveState2, el, { properties, attributes, events }) => {
    var _a, _b;
    if (el["liveState"] !== liveState2) {
      liveState2.connect();
      liveState2.subscribe((state) => {
        properties == null ? void 0 : properties.forEach((prop) => {
          el[prop] = state[prop];
        });
        attributes == null ? void 0 : attributes.forEach((attr) => {
          el.setAttribute(attr, state[attr]);
        });
      });
      (_a = events == null ? void 0 : events.send) == null ? void 0 : _a.forEach((eventName) => {
        el.addEventListener(eventName, (customEvent) => {
          console.log(el);
          console.log(`sending ${eventName}`);
          liveState2.pushCustomEvent(customEvent);
        });
      });
      (_b = events == null ? void 0 : events.receive) == null ? void 0 : _b.forEach((eventName) => {
        liveState2.channel.on(eventName, (event) => {
          el.dispatchEvent(new CustomEvent(eventName, { detail: event }));
        });
      });
      el["liveState"] = liveState2;
    }
  };
  var connectElement_default = connectElement;

  // node_modules/wc-context/core.js
  var orphanMap = {};
  var resolved = Promise.resolve();
  var orphanResolveQueue = {
    contexts: /* @__PURE__ */ new Set(),
    running: false,
    add(context) {
      this.contexts.add(context);
      if (!this.running) {
        this.running = true;
        resolved.then(() => {
          this.contexts.forEach((context2) => {
            const orphans = orphanMap[context2];
            orphans.forEach(({ setter, payload }, orphan) => {
              const event = sendContextEvent(orphan, context2, payload, setter);
              const provider = event.detail.provider;
              if (provider) {
                orphans.delete(orphan);
                registerProvider(orphan, context2, provider);
              }
            });
          });
          this.contexts.clear();
          this.running = false;
        });
      }
    }
  };
  function addOrphan(el, name, payload, setter) {
    const orphans = orphanMap[name] || (orphanMap[name] = /* @__PURE__ */ new Map());
    orphans.set(el, { setter, payload });
  }
  function sendContextEvent(consumer, context, payload, setter) {
    const event = new CustomEvent(`context-request-${context}`, {
      detail: { setter, payload, consumer },
      bubbles: true,
      cancelable: true,
      composed: true
    });
    consumer.dispatchEvent(event);
    return event;
  }
  function getProviderValue(provider, { getter, payload }) {
    return getter(provider, payload);
  }
  function providerGetter(provider, payload) {
    return payload;
  }
  function registerContext(provider, context, payload, getter = providerGetter) {
    const observerMap = provider.__wcContextObserverMap || (provider.__wcContextObserverMap = {});
    const providedContexts = provider.__wcContextProvided || (provider.__wcContextProvided = {});
    providedContexts[context] = { getter, payload };
    const observers = observerMap[context] || (observerMap[context] = []);
    const orphans = orphanMap[context];
    provider.addEventListener(`context-request-${context}`, (event) => {
      event.stopPropagation();
      const value = getProviderValue(provider, providedContexts[context]);
      const { setter, payload: payload2, consumer } = event.detail;
      setter(consumer, value, payload2);
      observers.push({ consumer, setter, payload: payload2 });
      runListeners(provider, context, "observe", observers.length);
      event.detail.provider = provider;
    });
    if (orphans && orphans.size) {
      orphanResolveQueue.add(context);
    }
  }
  function getProvidedContext(provider, context, caller) {
    const providedContexts = provider.__wcContextProvided;
    const providedContext = providedContexts && providedContexts[context];
    if (!providedContext) {
      throw new Error(`${caller}: "${context.name || context}" is not registered`);
    }
    return providedContext;
  }
  function consumerSetter(consumer, value, name) {
    const oldValue = consumer[name];
    if (oldValue !== value) {
      consumer[name] = value;
      if (typeof consumer.contextChangedCallback === "function") {
        consumer.contextChangedCallback(name, oldValue, value);
      }
    }
  }
  function runListeners(provider, context, type, count) {
    const providedContext = getProvidedContext(provider, context, "runListeners");
    const listeners = providedContext.listeners;
    if (listeners) {
      for (const listener of listeners) {
        if (listener.type === type) {
          listener.callback.call(provider, { count });
        }
      }
    }
  }
  function registerProvider(consumer, context, provider) {
    const providerMap = consumer.__wcContextProviderMap || (consumer.__wcContextProviderMap = {});
    providerMap[context] = provider;
  }
  function observeContext(consumer, context, payload = context, setter = consumerSetter) {
    const event = sendContextEvent(consumer, context, payload, setter);
    const provider = event.detail.provider;
    if (provider) {
      registerProvider(consumer, context, provider);
    } else {
      addOrphan(consumer, context, payload, setter);
    }
  }

  // node_modules/reflect-metadata/Reflect.js
  var Reflect2;
  (function(Reflect3) {
    (function(factory) {
      var root = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : Function("return this;")();
      var exporter = makeExporter(Reflect3);
      if (typeof root.Reflect === "undefined") {
        root.Reflect = Reflect3;
      } else {
        exporter = makeExporter(root.Reflect, exporter);
      }
      factory(exporter);
      function makeExporter(target, previous) {
        return function(key, value) {
          if (typeof target[key] !== "function") {
            Object.defineProperty(target, key, { configurable: true, writable: true, value });
          }
          if (previous)
            previous(key, value);
        };
      }
    })(function(exporter) {
      var hasOwn = Object.prototype.hasOwnProperty;
      var supportsSymbol = typeof Symbol === "function";
      var toPrimitiveSymbol = supportsSymbol && typeof Symbol.toPrimitive !== "undefined" ? Symbol.toPrimitive : "@@toPrimitive";
      var iteratorSymbol = supportsSymbol && typeof Symbol.iterator !== "undefined" ? Symbol.iterator : "@@iterator";
      var supportsCreate = typeof Object.create === "function";
      var supportsProto = { __proto__: [] } instanceof Array;
      var downLevel = !supportsCreate && !supportsProto;
      var HashMap = {
        create: supportsCreate ? function() {
          return MakeDictionary(/* @__PURE__ */ Object.create(null));
        } : supportsProto ? function() {
          return MakeDictionary({ __proto__: null });
        } : function() {
          return MakeDictionary({});
        },
        has: downLevel ? function(map, key) {
          return hasOwn.call(map, key);
        } : function(map, key) {
          return key in map;
        },
        get: downLevel ? function(map, key) {
          return hasOwn.call(map, key) ? map[key] : void 0;
        } : function(map, key) {
          return map[key];
        }
      };
      var functionPrototype = Object.getPrototypeOf(Function);
      var usePolyfill = typeof process === "object" && process.env && process.env["REFLECT_METADATA_USE_MAP_POLYFILL"] === "true";
      var _Map = !usePolyfill && typeof Map === "function" && typeof Map.prototype.entries === "function" ? Map : CreateMapPolyfill();
      var _Set = !usePolyfill && typeof Set === "function" && typeof Set.prototype.entries === "function" ? Set : CreateSetPolyfill();
      var _WeakMap = !usePolyfill && typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill();
      var Metadata = new _WeakMap();
      function decorate(decorators, target, propertyKey, attributes) {
        if (!IsUndefined(propertyKey)) {
          if (!IsArray(decorators))
            throw new TypeError();
          if (!IsObject(target))
            throw new TypeError();
          if (!IsObject(attributes) && !IsUndefined(attributes) && !IsNull(attributes))
            throw new TypeError();
          if (IsNull(attributes))
            attributes = void 0;
          propertyKey = ToPropertyKey(propertyKey);
          return DecorateProperty(decorators, target, propertyKey, attributes);
        } else {
          if (!IsArray(decorators))
            throw new TypeError();
          if (!IsConstructor(target))
            throw new TypeError();
          return DecorateConstructor(decorators, target);
        }
      }
      exporter("decorate", decorate);
      function metadata(metadataKey, metadataValue) {
        function decorator(target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey) && !IsPropertyKey(propertyKey))
            throw new TypeError();
          OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
        }
        return decorator;
      }
      exporter("metadata", metadata);
      function defineMetadata(metadataKey, metadataValue, target, propertyKey) {
        if (!IsObject(target))
          throw new TypeError();
        if (!IsUndefined(propertyKey))
          propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
      }
      exporter("defineMetadata", defineMetadata);
      function hasMetadata(metadataKey, target, propertyKey) {
        if (!IsObject(target))
          throw new TypeError();
        if (!IsUndefined(propertyKey))
          propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryHasMetadata(metadataKey, target, propertyKey);
      }
      exporter("hasMetadata", hasMetadata);
      function hasOwnMetadata(metadataKey, target, propertyKey) {
        if (!IsObject(target))
          throw new TypeError();
        if (!IsUndefined(propertyKey))
          propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryHasOwnMetadata(metadataKey, target, propertyKey);
      }
      exporter("hasOwnMetadata", hasOwnMetadata);
      function getMetadata(metadataKey, target, propertyKey) {
        if (!IsObject(target))
          throw new TypeError();
        if (!IsUndefined(propertyKey))
          propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryGetMetadata(metadataKey, target, propertyKey);
      }
      exporter("getMetadata", getMetadata);
      function getOwnMetadata(metadataKey, target, propertyKey) {
        if (!IsObject(target))
          throw new TypeError();
        if (!IsUndefined(propertyKey))
          propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryGetOwnMetadata(metadataKey, target, propertyKey);
      }
      exporter("getOwnMetadata", getOwnMetadata);
      function getMetadataKeys(target, propertyKey) {
        if (!IsObject(target))
          throw new TypeError();
        if (!IsUndefined(propertyKey))
          propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryMetadataKeys(target, propertyKey);
      }
      exporter("getMetadataKeys", getMetadataKeys);
      function getOwnMetadataKeys(target, propertyKey) {
        if (!IsObject(target))
          throw new TypeError();
        if (!IsUndefined(propertyKey))
          propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryOwnMetadataKeys(target, propertyKey);
      }
      exporter("getOwnMetadataKeys", getOwnMetadataKeys);
      function deleteMetadata(metadataKey, target, propertyKey) {
        if (!IsObject(target))
          throw new TypeError();
        if (!IsUndefined(propertyKey))
          propertyKey = ToPropertyKey(propertyKey);
        var metadataMap = GetOrCreateMetadataMap(target, propertyKey, false);
        if (IsUndefined(metadataMap))
          return false;
        if (!metadataMap.delete(metadataKey))
          return false;
        if (metadataMap.size > 0)
          return true;
        var targetMetadata = Metadata.get(target);
        targetMetadata.delete(propertyKey);
        if (targetMetadata.size > 0)
          return true;
        Metadata.delete(target);
        return true;
      }
      exporter("deleteMetadata", deleteMetadata);
      function DecorateConstructor(decorators, target) {
        for (var i5 = decorators.length - 1; i5 >= 0; --i5) {
          var decorator = decorators[i5];
          var decorated = decorator(target);
          if (!IsUndefined(decorated) && !IsNull(decorated)) {
            if (!IsConstructor(decorated))
              throw new TypeError();
            target = decorated;
          }
        }
        return target;
      }
      function DecorateProperty(decorators, target, propertyKey, descriptor) {
        for (var i5 = decorators.length - 1; i5 >= 0; --i5) {
          var decorator = decorators[i5];
          var decorated = decorator(target, propertyKey, descriptor);
          if (!IsUndefined(decorated) && !IsNull(decorated)) {
            if (!IsObject(decorated))
              throw new TypeError();
            descriptor = decorated;
          }
        }
        return descriptor;
      }
      function GetOrCreateMetadataMap(O, P2, Create) {
        var targetMetadata = Metadata.get(O);
        if (IsUndefined(targetMetadata)) {
          if (!Create)
            return void 0;
          targetMetadata = new _Map();
          Metadata.set(O, targetMetadata);
        }
        var metadataMap = targetMetadata.get(P2);
        if (IsUndefined(metadataMap)) {
          if (!Create)
            return void 0;
          metadataMap = new _Map();
          targetMetadata.set(P2, metadataMap);
        }
        return metadataMap;
      }
      function OrdinaryHasMetadata(MetadataKey, O, P2) {
        var hasOwn2 = OrdinaryHasOwnMetadata(MetadataKey, O, P2);
        if (hasOwn2)
          return true;
        var parent = OrdinaryGetPrototypeOf(O);
        if (!IsNull(parent))
          return OrdinaryHasMetadata(MetadataKey, parent, P2);
        return false;
      }
      function OrdinaryHasOwnMetadata(MetadataKey, O, P2) {
        var metadataMap = GetOrCreateMetadataMap(O, P2, false);
        if (IsUndefined(metadataMap))
          return false;
        return ToBoolean(metadataMap.has(MetadataKey));
      }
      function OrdinaryGetMetadata(MetadataKey, O, P2) {
        var hasOwn2 = OrdinaryHasOwnMetadata(MetadataKey, O, P2);
        if (hasOwn2)
          return OrdinaryGetOwnMetadata(MetadataKey, O, P2);
        var parent = OrdinaryGetPrototypeOf(O);
        if (!IsNull(parent))
          return OrdinaryGetMetadata(MetadataKey, parent, P2);
        return void 0;
      }
      function OrdinaryGetOwnMetadata(MetadataKey, O, P2) {
        var metadataMap = GetOrCreateMetadataMap(O, P2, false);
        if (IsUndefined(metadataMap))
          return void 0;
        return metadataMap.get(MetadataKey);
      }
      function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P2) {
        var metadataMap = GetOrCreateMetadataMap(O, P2, true);
        metadataMap.set(MetadataKey, MetadataValue);
      }
      function OrdinaryMetadataKeys(O, P2) {
        var ownKeys = OrdinaryOwnMetadataKeys(O, P2);
        var parent = OrdinaryGetPrototypeOf(O);
        if (parent === null)
          return ownKeys;
        var parentKeys = OrdinaryMetadataKeys(parent, P2);
        if (parentKeys.length <= 0)
          return ownKeys;
        if (ownKeys.length <= 0)
          return parentKeys;
        var set = new _Set();
        var keys = [];
        for (var _i = 0, ownKeys_1 = ownKeys; _i < ownKeys_1.length; _i++) {
          var key = ownKeys_1[_i];
          var hasKey = set.has(key);
          if (!hasKey) {
            set.add(key);
            keys.push(key);
          }
        }
        for (var _a = 0, parentKeys_1 = parentKeys; _a < parentKeys_1.length; _a++) {
          var key = parentKeys_1[_a];
          var hasKey = set.has(key);
          if (!hasKey) {
            set.add(key);
            keys.push(key);
          }
        }
        return keys;
      }
      function OrdinaryOwnMetadataKeys(O, P2) {
        var keys = [];
        var metadataMap = GetOrCreateMetadataMap(O, P2, false);
        if (IsUndefined(metadataMap))
          return keys;
        var keysObj = metadataMap.keys();
        var iterator = GetIterator(keysObj);
        var k2 = 0;
        while (true) {
          var next = IteratorStep(iterator);
          if (!next) {
            keys.length = k2;
            return keys;
          }
          var nextValue = IteratorValue(next);
          try {
            keys[k2] = nextValue;
          } catch (e7) {
            try {
              IteratorClose(iterator);
            } finally {
              throw e7;
            }
          }
          k2++;
        }
      }
      function Type(x2) {
        if (x2 === null)
          return 1;
        switch (typeof x2) {
          case "undefined":
            return 0;
          case "boolean":
            return 2;
          case "string":
            return 3;
          case "symbol":
            return 4;
          case "number":
            return 5;
          case "object":
            return x2 === null ? 1 : 6;
          default:
            return 6;
        }
      }
      function IsUndefined(x2) {
        return x2 === void 0;
      }
      function IsNull(x2) {
        return x2 === null;
      }
      function IsSymbol(x2) {
        return typeof x2 === "symbol";
      }
      function IsObject(x2) {
        return typeof x2 === "object" ? x2 !== null : typeof x2 === "function";
      }
      function ToPrimitive(input, PreferredType) {
        switch (Type(input)) {
          case 0:
            return input;
          case 1:
            return input;
          case 2:
            return input;
          case 3:
            return input;
          case 4:
            return input;
          case 5:
            return input;
        }
        var hint = PreferredType === 3 ? "string" : PreferredType === 5 ? "number" : "default";
        var exoticToPrim = GetMethod(input, toPrimitiveSymbol);
        if (exoticToPrim !== void 0) {
          var result = exoticToPrim.call(input, hint);
          if (IsObject(result))
            throw new TypeError();
          return result;
        }
        return OrdinaryToPrimitive(input, hint === "default" ? "number" : hint);
      }
      function OrdinaryToPrimitive(O, hint) {
        if (hint === "string") {
          var toString_1 = O.toString;
          if (IsCallable(toString_1)) {
            var result = toString_1.call(O);
            if (!IsObject(result))
              return result;
          }
          var valueOf = O.valueOf;
          if (IsCallable(valueOf)) {
            var result = valueOf.call(O);
            if (!IsObject(result))
              return result;
          }
        } else {
          var valueOf = O.valueOf;
          if (IsCallable(valueOf)) {
            var result = valueOf.call(O);
            if (!IsObject(result))
              return result;
          }
          var toString_2 = O.toString;
          if (IsCallable(toString_2)) {
            var result = toString_2.call(O);
            if (!IsObject(result))
              return result;
          }
        }
        throw new TypeError();
      }
      function ToBoolean(argument) {
        return !!argument;
      }
      function ToString(argument) {
        return "" + argument;
      }
      function ToPropertyKey(argument) {
        var key = ToPrimitive(argument, 3);
        if (IsSymbol(key))
          return key;
        return ToString(key);
      }
      function IsArray(argument) {
        return Array.isArray ? Array.isArray(argument) : argument instanceof Object ? argument instanceof Array : Object.prototype.toString.call(argument) === "[object Array]";
      }
      function IsCallable(argument) {
        return typeof argument === "function";
      }
      function IsConstructor(argument) {
        return typeof argument === "function";
      }
      function IsPropertyKey(argument) {
        switch (Type(argument)) {
          case 3:
            return true;
          case 4:
            return true;
          default:
            return false;
        }
      }
      function GetMethod(V2, P2) {
        var func = V2[P2];
        if (func === void 0 || func === null)
          return void 0;
        if (!IsCallable(func))
          throw new TypeError();
        return func;
      }
      function GetIterator(obj) {
        var method = GetMethod(obj, iteratorSymbol);
        if (!IsCallable(method))
          throw new TypeError();
        var iterator = method.call(obj);
        if (!IsObject(iterator))
          throw new TypeError();
        return iterator;
      }
      function IteratorValue(iterResult) {
        return iterResult.value;
      }
      function IteratorStep(iterator) {
        var result = iterator.next();
        return result.done ? false : result;
      }
      function IteratorClose(iterator) {
        var f2 = iterator["return"];
        if (f2)
          f2.call(iterator);
      }
      function OrdinaryGetPrototypeOf(O) {
        var proto = Object.getPrototypeOf(O);
        if (typeof O !== "function" || O === functionPrototype)
          return proto;
        if (proto !== functionPrototype)
          return proto;
        var prototype = O.prototype;
        var prototypeProto = prototype && Object.getPrototypeOf(prototype);
        if (prototypeProto == null || prototypeProto === Object.prototype)
          return proto;
        var constructor = prototypeProto.constructor;
        if (typeof constructor !== "function")
          return proto;
        if (constructor === O)
          return proto;
        return constructor;
      }
      function CreateMapPolyfill() {
        var cacheSentinel = {};
        var arraySentinel = [];
        var MapIterator = function() {
          function MapIterator2(keys, values, selector) {
            this._index = 0;
            this._keys = keys;
            this._values = values;
            this._selector = selector;
          }
          MapIterator2.prototype["@@iterator"] = function() {
            return this;
          };
          MapIterator2.prototype[iteratorSymbol] = function() {
            return this;
          };
          MapIterator2.prototype.next = function() {
            var index = this._index;
            if (index >= 0 && index < this._keys.length) {
              var result = this._selector(this._keys[index], this._values[index]);
              if (index + 1 >= this._keys.length) {
                this._index = -1;
                this._keys = arraySentinel;
                this._values = arraySentinel;
              } else {
                this._index++;
              }
              return { value: result, done: false };
            }
            return { value: void 0, done: true };
          };
          MapIterator2.prototype.throw = function(error) {
            if (this._index >= 0) {
              this._index = -1;
              this._keys = arraySentinel;
              this._values = arraySentinel;
            }
            throw error;
          };
          MapIterator2.prototype.return = function(value) {
            if (this._index >= 0) {
              this._index = -1;
              this._keys = arraySentinel;
              this._values = arraySentinel;
            }
            return { value, done: true };
          };
          return MapIterator2;
        }();
        return function() {
          function Map2() {
            this._keys = [];
            this._values = [];
            this._cacheKey = cacheSentinel;
            this._cacheIndex = -2;
          }
          Object.defineProperty(Map2.prototype, "size", {
            get: function() {
              return this._keys.length;
            },
            enumerable: true,
            configurable: true
          });
          Map2.prototype.has = function(key) {
            return this._find(key, false) >= 0;
          };
          Map2.prototype.get = function(key) {
            var index = this._find(key, false);
            return index >= 0 ? this._values[index] : void 0;
          };
          Map2.prototype.set = function(key, value) {
            var index = this._find(key, true);
            this._values[index] = value;
            return this;
          };
          Map2.prototype.delete = function(key) {
            var index = this._find(key, false);
            if (index >= 0) {
              var size = this._keys.length;
              for (var i5 = index + 1; i5 < size; i5++) {
                this._keys[i5 - 1] = this._keys[i5];
                this._values[i5 - 1] = this._values[i5];
              }
              this._keys.length--;
              this._values.length--;
              if (key === this._cacheKey) {
                this._cacheKey = cacheSentinel;
                this._cacheIndex = -2;
              }
              return true;
            }
            return false;
          };
          Map2.prototype.clear = function() {
            this._keys.length = 0;
            this._values.length = 0;
            this._cacheKey = cacheSentinel;
            this._cacheIndex = -2;
          };
          Map2.prototype.keys = function() {
            return new MapIterator(this._keys, this._values, getKey);
          };
          Map2.prototype.values = function() {
            return new MapIterator(this._keys, this._values, getValue);
          };
          Map2.prototype.entries = function() {
            return new MapIterator(this._keys, this._values, getEntry);
          };
          Map2.prototype["@@iterator"] = function() {
            return this.entries();
          };
          Map2.prototype[iteratorSymbol] = function() {
            return this.entries();
          };
          Map2.prototype._find = function(key, insert) {
            if (this._cacheKey !== key) {
              this._cacheIndex = this._keys.indexOf(this._cacheKey = key);
            }
            if (this._cacheIndex < 0 && insert) {
              this._cacheIndex = this._keys.length;
              this._keys.push(key);
              this._values.push(void 0);
            }
            return this._cacheIndex;
          };
          return Map2;
        }();
        function getKey(key, _2) {
          return key;
        }
        function getValue(_2, value) {
          return value;
        }
        function getEntry(key, value) {
          return [key, value];
        }
      }
      function CreateSetPolyfill() {
        return function() {
          function Set2() {
            this._map = new _Map();
          }
          Object.defineProperty(Set2.prototype, "size", {
            get: function() {
              return this._map.size;
            },
            enumerable: true,
            configurable: true
          });
          Set2.prototype.has = function(value) {
            return this._map.has(value);
          };
          Set2.prototype.add = function(value) {
            return this._map.set(value, value), this;
          };
          Set2.prototype.delete = function(value) {
            return this._map.delete(value);
          };
          Set2.prototype.clear = function() {
            this._map.clear();
          };
          Set2.prototype.keys = function() {
            return this._map.keys();
          };
          Set2.prototype.values = function() {
            return this._map.values();
          };
          Set2.prototype.entries = function() {
            return this._map.entries();
          };
          Set2.prototype["@@iterator"] = function() {
            return this.keys();
          };
          Set2.prototype[iteratorSymbol] = function() {
            return this.keys();
          };
          return Set2;
        }();
      }
      function CreateWeakMapPolyfill() {
        var UUID_SIZE = 16;
        var keys = HashMap.create();
        var rootKey = CreateUniqueKey();
        return function() {
          function WeakMap2() {
            this._key = CreateUniqueKey();
          }
          WeakMap2.prototype.has = function(target) {
            var table = GetOrCreateWeakMapTable(target, false);
            return table !== void 0 ? HashMap.has(table, this._key) : false;
          };
          WeakMap2.prototype.get = function(target) {
            var table = GetOrCreateWeakMapTable(target, false);
            return table !== void 0 ? HashMap.get(table, this._key) : void 0;
          };
          WeakMap2.prototype.set = function(target, value) {
            var table = GetOrCreateWeakMapTable(target, true);
            table[this._key] = value;
            return this;
          };
          WeakMap2.prototype.delete = function(target) {
            var table = GetOrCreateWeakMapTable(target, false);
            return table !== void 0 ? delete table[this._key] : false;
          };
          WeakMap2.prototype.clear = function() {
            this._key = CreateUniqueKey();
          };
          return WeakMap2;
        }();
        function CreateUniqueKey() {
          var key;
          do
            key = "@@WeakMap@@" + CreateUUID();
          while (HashMap.has(keys, key));
          keys[key] = true;
          return key;
        }
        function GetOrCreateWeakMapTable(target, create) {
          if (!hasOwn.call(target, rootKey)) {
            if (!create)
              return void 0;
            Object.defineProperty(target, rootKey, { value: HashMap.create() });
          }
          return target[rootKey];
        }
        function FillRandomBytes(buffer, size) {
          for (var i5 = 0; i5 < size; ++i5)
            buffer[i5] = Math.random() * 255 | 0;
          return buffer;
        }
        function GenRandomBytes(size) {
          if (typeof Uint8Array === "function") {
            if (typeof crypto !== "undefined")
              return crypto.getRandomValues(new Uint8Array(size));
            if (typeof msCrypto !== "undefined")
              return msCrypto.getRandomValues(new Uint8Array(size));
            return FillRandomBytes(new Uint8Array(size), size);
          }
          return FillRandomBytes(new Array(size), size);
        }
        function CreateUUID() {
          var data = GenRandomBytes(UUID_SIZE);
          data[6] = data[6] & 79 | 64;
          data[8] = data[8] & 191 | 128;
          var result = "";
          for (var offset = 0; offset < UUID_SIZE; ++offset) {
            var byte = data[offset];
            if (offset === 4 || offset === 6 || offset === 8)
              result += "-";
            if (byte < 16)
              result += "0";
            result += byte.toString(16).toLowerCase();
          }
          return result;
        }
      }
      function MakeDictionary(obj) {
        obj.__ = void 0;
        delete obj.__;
        return obj;
      }
    });
  })(Reflect2 || (Reflect2 = {}));

  // node_modules/phx-live-state/build/src/liveStateDecorator.js
  var connectToLiveState = (element, options) => {
    if (options.provide) {
      const { scope, name } = options.provide;
      const liveState2 = scope[name] ? scope[name] : scope[name] = buildLiveState(element, options);
      registerContext(scope, name, liveState2);
      connectElement_default(liveState2, element, options);
    } else if (options.context) {
      observeContext(element, options.context, element, (element2, liveState2) => {
        connectElement_default(liveState2, element2, options);
      });
    } else {
      const liveState2 = buildLiveState(element, options);
      connectElement_default(liveState2, element, options);
    }
    return element.liveState;
  };
  var extractConfig = (element) => {
    const elementConfig = element._liveStateConfig ? Object.keys(element._liveStateConfig).reduce((config, key) => {
      if (element._liveStateConfig[key] instanceof Function) {
        const configFn = element._liveStateConfig[key];
        config[key] = configFn.apply(element);
      } else {
        config[key] = element._liveStateConfig[key];
      }
      return config;
    }, {}) : {};
    flattenParams(elementConfig);
    return elementConfig;
  };
  var flattenParams = (object) => {
    const params = Object.keys(object).filter((key) => key.startsWith("params.")).reduce((params2, key) => {
      params2[key.replace("params.", "")] = object[key];
      return params2;
    }, {});
    object.params = params;
  };
  var buildLiveState = (element, { url, topic, params }) => {
    const elementConfig = extractConfig(element);
    const config = Object.assign({ url, topic, params }, elementConfig);
    return new live_state_default(config);
  };
  var liveState = (options) => {
    return (targetClass) => {
      Reflect.defineMetadata("liveStateConfig", options, targetClass);
      const superConnected = targetClass.prototype.connectedCallback;
      targetClass.prototype.connectedCallback = function() {
        superConnected == null ? void 0 : superConnected.apply(this);
        connectToLiveState(this, options);
      };
      const superDisconnected = targetClass.prototype.disconnectedCallback;
      targetClass.prototype.disconnectedCallback = function() {
        superDisconnected == null ? void 0 : superDisconnected.apply(this);
        this.liveState && this.liveState.disconnect();
      };
    };
  };
  var liveStateConfig = (configProperty) => {
    return (proto, propertyName) => {
      proto._liveStateConfig = proto._liveStateConfig || {};
      proto._liveStateConfig[configProperty] = function() {
        return this[propertyName];
      };
    };
  };
  var liveStateDecorator_default = liveState;

  // js/stripe-cart.ts
  var StripeCartElement = class extends s4 {
    get channelName() {
      const cartId = window.localStorage.getItem("cart_id");
      return cartId ? `stripe_cart:${cartId}` : "stripe_cart:new";
    }
    constructor() {
      super();
      this.addEventListener("checkout_redirect", (e7) => {
        window.location.href = e7.detail.checkout_url;
      });
      this.addEventListener("checkout_complete", (e7) => {
        console.log("got the checkout complete event");
        this.showThanks();
        window.localStorage.removeItem("cart_id");
      });
      this.addEventListener("cart_created", (e7) => {
        console.log("cart created");
        window.localStorage.setItem("cart_id", e7.detail.cart_id);
      });
    }
    itemCount() {
      return this.cart && this.cart.items && this.cart.items.length > 0 ? y`
      <sl-badge pill>${this.cart.items.length}</sl-badge>
    ` : ``;
    }
    expandCart() {
      this.cartDetails && this.cartDetails.show();
    }
    showThanks() {
      this.thanks && this.thanks.show();
    }
    render() {
      var _a;
      return y`
    <sl-dialog id="thank-you">
      Thanks for purchasing!
    </sl-dialog>
    <sl-dialog id="cart-details">
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          ${(_a = this.cart) == null ? void 0 : _a.items.map((item) => y`
          <tr>
            <td>${item.product.description}</td>
            <td>${item.quantity}</td>
            <td>${item.price}</td>
          </tr>
          `)}
        </tbody>
      </table>
      <button @click=${this.checkout}>Check out</button>
    </sl-dialog>
    <sl-button @click=${this.expandCart}>
      <sl-icon name="cart" style="font-size: 2em;"></sl-icon>
      ${this.itemCount()}
    </sl-button>
    `;
    }
    checkout(_e) {
      this.dispatchEvent(new CustomEvent("checkout", { detail: { return_url: window.location.href } }));
    }
  };
  __decorateClass([
    e5(),
    liveStateConfig("url")
  ], StripeCartElement.prototype, "url", 2);
  __decorateClass([
    e5({ attribute: "store-id" }),
    liveStateConfig("params.store_id")
  ], StripeCartElement.prototype, "storeId", 2);
  __decorateClass([
    t3()
  ], StripeCartElement.prototype, "cart", 2);
  __decorateClass([
    i4("sl-dialog#cart-details")
  ], StripeCartElement.prototype, "cartDetails", 2);
  __decorateClass([
    i4("sl-dialog#thank-you")
  ], StripeCartElement.prototype, "thanks", 2);
  __decorateClass([
    liveStateConfig("topic")
  ], StripeCartElement.prototype, "channelName", 1);
  StripeCartElement = __decorateClass([
    e4("stripe-cart"),
    liveStateDecorator_default({
      properties: ["cart"],
      provide: {
        scope: window,
        name: "cartState"
      },
      events: {
        send: ["checkout"],
        receive: ["checkout_redirect", "cart_created", "checkout_complete"]
      }
    })
  ], StripeCartElement);

  // js/stripe-cart-additem.ts
  var StripeCartAddItemElement = class extends s4 {
    constructor() {
      super();
      this.priceId = "";
      this.addEventListener("click", (event) => {
        console.log(event);
        this.dispatchEvent(new CustomEvent("add_cart_item", { detail: { stripe_price: this.priceId } }));
      });
    }
    render() {
      return y`<slot></slot>`;
    }
  };
  __decorateClass([
    e5({ attribute: "price-id" })
  ], StripeCartAddItemElement.prototype, "priceId", 2);
  StripeCartAddItemElement = __decorateClass([
    e4("stripe-cart-additem"),
    liveStateDecorator_default({
      events: {
        send: ["add_cart_item"]
      },
      context: "cartState"
    })
  ], StripeCartAddItemElement);
})();
/*! *****************************************************************************
Copyright (C) Microsoft. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
