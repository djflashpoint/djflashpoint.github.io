var rl = Object.defineProperty;
var ol = (n,t,e)=>t in n ? rl(n, t, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: e
}) : n[t] = e;
var c = (n,t,e)=>ol(n, typeof t != "symbol" ? t + "" : t, e);
(function() {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload"))
        return;
    for (const s of document.querySelectorAll('link[rel="modulepreload"]'))
        i(s);
    new MutationObserver(s=>{
        for (const r of s)
            if (r.type === "childList")
                for (const o of r.addedNodes)
                    o.tagName === "LINK" && o.rel === "modulepreload" && i(o)
    }
    ).observe(document, {
        childList: !0,
        subtree: !0
    });
    function e(s) {
        const r = {};
        return s.integrity && (r.integrity = s.integrity),
        s.referrerPolicy && (r.referrerPolicy = s.referrerPolicy),
        s.crossOrigin === "use-credentials" ? r.credentials = "include" : s.crossOrigin === "anonymous" ? r.credentials = "omit" : r.credentials = "same-origin",
        r
    }
    function i(s) {
        if (s.ep)
            return;
        s.ep = !0;
        const r = e(s);
        fetch(s.href, r)
    }
}
)();
function y(n) {
    return n == null
}
function gi(n) {
    return n !== null && typeof n == "object"
}
function si(n) {
    return n !== null && typeof n == "object"
}
function al(n, t) {
    if (n.length !== t.length)
        return !1;
    for (let e = 0; e < n.length; e++)
        if (n[e] !== t[e])
            return !1;
    return !0
}
function Ut(n, t) {
    return Array.from(new Set([...Object.keys(n), ...Object.keys(t)])).reduce((i,s)=>{
        const r = n[s]
          , o = t[s];
        return si(r) && si(o) ? Object.assign(Object.assign({}, i), {
            [s]: Ut(r, o)
        }) : Object.assign(Object.assign({}, i), {
            [s]: s in t ? o : r
        })
    }
    , {})
}
function ll(n) {
    return gi(n) ? "target"in n : !1
}
const pl = {
    alreadydisposed: ()=>"View has been already disposed",
    invalidparams: n=>`Invalid parameters for '${n.name}'`,
    nomatchingcontroller: n=>`No matching controller for '${n.key}'`,
    nomatchingview: n=>`No matching view for '${JSON.stringify(n.params)}'`,
    notbindable: ()=>"Value is not bindable",
    notcompatible: n=>`Not compatible with  plugin '${n.id}'`,
    propertynotfound: n=>`Property '${n.name}' not found`,
    shouldneverhappen: ()=>"This error should never happen"
};
let ft = class ae {
    static alreadyDisposed() {
        return new ae({
            type: "alreadydisposed"
        })
    }
    static notBindable() {
        return new ae({
            type: "notbindable"
        })
    }
    static notCompatible(t, e) {
        return new ae({
            type: "notcompatible",
            context: {
                id: `${t}.${e}`
            }
        })
    }
    static propertyNotFound(t) {
        return new ae({
            type: "propertynotfound",
            context: {
                name: t
            }
        })
    }
    static shouldNeverHappen() {
        return new ae({
            type: "shouldneverhappen"
        })
    }
    constructor(t) {
        var e;
        this.message = (e = pl[t.type](t.context)) !== null && e !== void 0 ? e : "Unexpected error",
        this.name = this.constructor.name,
        this.stack = new Error(this.message).stack,
        this.type = t.type
    }
    toString() {
        return this.message
    }
}
  , Ls = class Rr {
    constructor(t, e) {
        this.obj_ = t,
        this.key = e
    }
    static isBindable(t) {
        return !(t === null || typeof t != "object" && typeof t != "function")
    }
    read() {
        return this.obj_[this.key]
    }
    write(t) {
        this.obj_[this.key] = t
    }
    writeProperty(t, e) {
        const i = this.read();
        if (!Rr.isBindable(i))
            throw ft.notBindable();
        if (!(t in i))
            throw ft.propertyNotFound(t);
        i[t] = e
    }
}
  , j = class {
    constructor() {
        this.observers_ = {}
    }
    on(t, e) {
        let i = this.observers_[t];
        return i || (i = this.observers_[t] = []),
        i.push({
            handler: e
        }),
        this
    }
    off(t, e) {
        const i = this.observers_[t];
        return i && (this.observers_[t] = i.filter(s=>s.handler !== e)),
        this
    }
    emit(t, e) {
        const i = this.observers_[t];
        i && i.forEach(s=>{
            s.handler(e)
        }
        )
    }
}
  , cl = class {
    constructor(t, e) {
        var i;
        this.constraint_ = e == null ? void 0 : e.constraint,
        this.equals_ = (i = e == null ? void 0 : e.equals) !== null && i !== void 0 ? i : (s,r)=>s === r,
        this.emitter = new j,
        this.rawValue_ = t
    }
    get constraint() {
        return this.constraint_
    }
    get rawValue() {
        return this.rawValue_
    }
    set rawValue(t) {
        this.setRawValue(t, {
            forceEmit: !1,
            last: !0
        })
    }
    setRawValue(t, e) {
        const i = e ?? {
            forceEmit: !1,
            last: !0
        }
          , s = this.constraint_ ? this.constraint_.constrain(t) : t
          , r = this.rawValue_;
        this.equals_(r, s) && !i.forceEmit || (this.emitter.emit("beforechange", {
            sender: this
        }),
        this.rawValue_ = s,
        this.emitter.emit("change", {
            options: i,
            previousRawValue: r,
            rawValue: s,
            sender: this
        }))
    }
}
  , hl = class {
    constructor(t) {
        this.emitter = new j,
        this.value_ = t
    }
    get rawValue() {
        return this.value_
    }
    set rawValue(t) {
        this.setRawValue(t, {
            forceEmit: !1,
            last: !0
        })
    }
    setRawValue(t, e) {
        const i = e ?? {
            forceEmit: !1,
            last: !0
        }
          , s = this.value_;
        s === t && !i.forceEmit || (this.emitter.emit("beforechange", {
            sender: this
        }),
        this.value_ = t,
        this.emitter.emit("change", {
            options: i,
            previousRawValue: s,
            rawValue: this.value_,
            sender: this
        }))
    }
}
  , ul = class {
    constructor(t) {
        this.emitter = new j,
        this.onValueBeforeChange_ = this.onValueBeforeChange_.bind(this),
        this.onValueChange_ = this.onValueChange_.bind(this),
        this.value_ = t,
        this.value_.emitter.on("beforechange", this.onValueBeforeChange_),
        this.value_.emitter.on("change", this.onValueChange_)
    }
    get rawValue() {
        return this.value_.rawValue
    }
    onValueBeforeChange_(t) {
        this.emitter.emit("beforechange", Object.assign(Object.assign({}, t), {
            sender: this
        }))
    }
    onValueChange_(t) {
        this.emitter.emit("change", Object.assign(Object.assign({}, t), {
            sender: this
        }))
    }
}
;
function $(n, t) {
    const e = t == null ? void 0 : t.constraint
      , i = t == null ? void 0 : t.equals;
    return !e && !i ? new hl(n) : new cl(n,t)
}
function dl(n) {
    return [new ul(n), (t,e)=>{
        n.setRawValue(t, e)
    }
    ]
}
let m = class Br {
    constructor(t) {
        this.emitter = new j,
        this.valMap_ = t;
        for (const e in this.valMap_)
            this.valMap_[e].emitter.on("change", ()=>{
                this.emitter.emit("change", {
                    key: e,
                    sender: this
                })
            }
            )
    }
    static createCore(t) {
        return Object.keys(t).reduce((i,s)=>Object.assign(i, {
            [s]: $(t[s])
        }), {})
    }
    static fromObject(t) {
        const e = this.createCore(t);
        return new Br(e)
    }
    get(t) {
        return this.valMap_[t].rawValue
    }
    set(t, e) {
        this.valMap_[t].rawValue = e
    }
    value(t) {
        return this.valMap_[t]
    }
}
  , Ue = class {
    constructor(t) {
        this.values = m.fromObject({
            max: t.max,
            min: t.min
        })
    }
    constrain(t) {
        const e = this.values.get("max")
          , i = this.values.get("min");
        return Math.min(Math.max(t, i), e)
    }
}
  , Ci = class {
    constructor(t) {
        this.values = m.fromObject({
            max: t.max,
            min: t.min
        })
    }
    constrain(t) {
        const e = this.values.get("max")
          , i = this.values.get("min");
        let s = t;
        return y(i) || (s = Math.max(s, i)),
        y(e) || (s = Math.min(s, e)),
        s
    }
}
  , ml = class {
    constructor(t, e=0) {
        this.step = t,
        this.origin = e
    }
    constrain(t) {
        const e = this.origin % this.step
          , i = Math.round((t - e) / this.step);
        return e + i * this.step
    }
}
  , vl = class {
    constructor(t) {
        this.text = t
    }
    evaluate() {
        return Number(this.text)
    }
    toString() {
        return this.text
    }
}
;
const bl = {
    "**": (n,t)=>Math.pow(n, t),
    "*": (n,t)=>n * t,
    "/": (n,t)=>n / t,
    "%": (n,t)=>n % t,
    "+": (n,t)=>n + t,
    "-": (n,t)=>n - t,
    "<<": (n,t)=>n << t,
    ">>": (n,t)=>n >> t,
    ">>>": (n,t)=>n >>> t,
    "&": (n,t)=>n & t,
    "^": (n,t)=>n ^ t,
    "|": (n,t)=>n | t
};
let fl = class {
    constructor(t, e, i) {
        this.left = e,
        this.operator = t,
        this.right = i
    }
    evaluate() {
        const t = bl[this.operator];
        if (!t)
            throw new Error(`unexpected binary operator: '${this.operator}`);
        return t(this.left.evaluate(), this.right.evaluate())
    }
    toString() {
        return ["b(", this.left.toString(), this.operator, this.right.toString(), ")"].join(" ")
    }
}
;
const wl = {
    "+": n=>n,
    "-": n=>-n,
    "~": n=>~n
};
let _l = class {
    constructor(t, e) {
        this.operator = t,
        this.expression = e
    }
    evaluate() {
        const t = wl[this.operator];
        if (!t)
            throw new Error(`unexpected unary operator: '${this.operator}`);
        return t(this.expression.evaluate())
    }
    toString() {
        return ["u(", this.operator, this.expression.toString(), ")"].join(" ")
    }
}
;
function xi(n) {
    return (t,e)=>{
        for (let i = 0; i < n.length; i++) {
            const s = n[i](t, e);
            if (s !== "")
                return s
        }
        return ""
    }
}
function Ae(n, t) {
    var e;
    const i = n.substr(t).match(/^\s+/);
    return (e = i && i[0]) !== null && e !== void 0 ? e : ""
}
function gl(n, t) {
    const e = n.substr(t, 1);
    return e.match(/^[1-9]$/) ? e : ""
}
function Oe(n, t) {
    var e;
    const i = n.substr(t).match(/^[0-9]+/);
    return (e = i && i[0]) !== null && e !== void 0 ? e : ""
}
function Cl(n, t) {
    const e = Oe(n, t);
    if (e !== "")
        return e;
    const i = n.substr(t, 1);
    if (t += 1,
    i !== "-" && i !== "+")
        return "";
    const s = Oe(n, t);
    return s === "" ? "" : i + s
}
function Pi(n, t) {
    const e = n.substr(t, 1);
    if (t += 1,
    e.toLowerCase() !== "e")
        return "";
    const i = Cl(n, t);
    return i === "" ? "" : e + i
}
function jr(n, t) {
    const e = n.substr(t, 1);
    if (e === "0")
        return e;
    const i = gl(n, t);
    return t += i.length,
    i === "" ? "" : i + Oe(n, t)
}
function xl(n, t) {
    const e = jr(n, t);
    if (t += e.length,
    e === "")
        return "";
    const i = n.substr(t, 1);
    if (t += i.length,
    i !== ".")
        return "";
    const s = Oe(n, t);
    return t += s.length,
    e + i + s + Pi(n, t)
}
function Pl(n, t) {
    const e = n.substr(t, 1);
    if (t += e.length,
    e !== ".")
        return "";
    const i = Oe(n, t);
    return t += i.length,
    i === "" ? "" : e + i + Pi(n, t)
}
function yl(n, t) {
    const e = jr(n, t);
    return t += e.length,
    e === "" ? "" : e + Pi(n, t)
}
const El = xi([xl, Pl, yl]);
function kl(n, t) {
    var e;
    const i = n.substr(t).match(/^[01]+/);
    return (e = i && i[0]) !== null && e !== void 0 ? e : ""
}
function Vl(n, t) {
    const e = n.substr(t, 2);
    if (t += e.length,
    e.toLowerCase() !== "0b")
        return "";
    const i = kl(n, t);
    return i === "" ? "" : e + i
}
function Sl(n, t) {
    var e;
    const i = n.substr(t).match(/^[0-7]+/);
    return (e = i && i[0]) !== null && e !== void 0 ? e : ""
}
function $l(n, t) {
    const e = n.substr(t, 2);
    if (t += e.length,
    e.toLowerCase() !== "0o")
        return "";
    const i = Sl(n, t);
    return i === "" ? "" : e + i
}
function Ll(n, t) {
    var e;
    const i = n.substr(t).match(/^[0-9a-f]+/i);
    return (e = i && i[0]) !== null && e !== void 0 ? e : ""
}
function Ml(n, t) {
    const e = n.substr(t, 2);
    if (t += e.length,
    e.toLowerCase() !== "0x")
        return "";
    const i = Ll(n, t);
    return i === "" ? "" : e + i
}
const Tl = xi([Vl, $l, Ml])
  , Al = xi([Tl, El]);
function Ol(n, t) {
    const e = Al(n, t);
    return t += e.length,
    e === "" ? null : {
        evaluable: new vl(e),
        cursor: t
    }
}
function Dl(n, t) {
    const e = n.substr(t, 1);
    if (t += e.length,
    e !== "(")
        return null;
    const i = Ir(n, t);
    if (!i)
        return null;
    t = i.cursor,
    t += Ae(n, t).length;
    const s = n.substr(t, 1);
    return t += s.length,
    s !== ")" ? null : {
        evaluable: i.evaluable,
        cursor: t
    }
}
function Rl(n, t) {
    var e;
    return (e = Ol(n, t)) !== null && e !== void 0 ? e : Dl(n, t)
}
function Nr(n, t) {
    const e = Rl(n, t);
    if (e)
        return e;
    const i = n.substr(t, 1);
    if (t += i.length,
    i !== "+" && i !== "-" && i !== "~")
        return null;
    const s = Nr(n, t);
    return s ? (t = s.cursor,
    {
        cursor: t,
        evaluable: new _l(i,s.evaluable)
    }) : null
}
function Bl(n, t, e) {
    e += Ae(t, e).length;
    const i = n.filter(s=>t.startsWith(s, e))[0];
    return i ? (e += i.length,
    e += Ae(t, e).length,
    {
        cursor: e,
        operator: i
    }) : null
}
function jl(n, t) {
    return (e,i)=>{
        const s = n(e, i);
        if (!s)
            return null;
        i = s.cursor;
        let r = s.evaluable;
        for (; ; ) {
            const o = Bl(t, e, i);
            if (!o)
                break;
            i = o.cursor;
            const a = n(e, i);
            if (!a)
                return null;
            i = a.cursor,
            r = new fl(o.operator,r,a.evaluable)
        }
        return r ? {
            cursor: i,
            evaluable: r
        } : null
    }
}
const Nl = [["**"], ["*", "/", "%"], ["+", "-"], ["<<", ">>>", ">>"], ["&"], ["^"], ["|"]].reduce((n,t)=>jl(n, t), Nr);
function Ir(n, t) {
    return t += Ae(n, t).length,
    Nl(n, t)
}
function Il(n) {
    const t = Ir(n, 0);
    return !t || t.cursor + Ae(n, t.cursor).length !== n.length ? null : t.evaluable
}
function et(n) {
    var t;
    const e = Il(n);
    return (t = e == null ? void 0 : e.evaluate()) !== null && t !== void 0 ? t : null
}
function yi(n) {
    if (typeof n == "number")
        return n;
    if (typeof n == "string") {
        const t = et(n);
        if (!y(t))
            return t
    }
    return 0
}
function R(n) {
    return t=>t.toFixed(Math.max(Math.min(n, 20), 0))
}
function d(n, t, e, i, s) {
    const r = (n - t) / (e - t);
    return i + r * (s - i)
}
function Ms(n) {
    return String(n.toFixed(10)).split(".")[1].replace(/0+$/, "").length
}
function k(n, t, e) {
    return Math.min(Math.max(n, t), e)
}
function Fr(n, t) {
    return (n % t + t) % t
}
function Fl(n, t) {
    return y(n.step) ? Math.max(Ms(t), 2) : Ms(n.step)
}
function zr(n) {
    var t;
    return (t = n.step) !== null && t !== void 0 ? t : 1
}
function zl(n, t) {
    var e;
    const i = Math.abs((e = n.step) !== null && e !== void 0 ? e : t);
    return i === 0 ? .1 : Math.pow(10, Math.floor(Math.log10(i)) - 1)
}
function Ei(n, t) {
    return y(n.step) ? null : new ml(n.step,t)
}
function ki(n) {
    return !y(n.max) && !y(n.min) ? new Ue({
        max: n.max,
        min: n.min
    }) : !y(n.max) || !y(n.min) ? new Ci({
        max: n.max,
        min: n.min
    }) : null
}
function Vi(n, t) {
    var e, i, s;
    return {
        formatter: (e = n.format) !== null && e !== void 0 ? e : R(Fl(n, t)),
        keyScale: (i = n.keyScale) !== null && i !== void 0 ? i : zr(n),
        pointerScale: (s = n.pointerScale) !== null && s !== void 0 ? s : zl(n, t)
    }
}
function Si(n) {
    return {
        format: n.optional.function,
        keyScale: n.optional.number,
        max: n.optional.number,
        min: n.optional.number,
        pointerScale: n.optional.number,
        step: n.optional.number
    }
}
function $i(n) {
    return {
        constraint: n.constraint,
        textProps: m.fromObject(Vi(n.params, n.initialValue))
    }
}
let Zt = class {
    constructor(t) {
        this.controller = t
    }
    get element() {
        return this.controller.view.element
    }
    get disabled() {
        return this.controller.viewProps.get("disabled")
    }
    set disabled(t) {
        this.controller.viewProps.set("disabled", t)
    }
    get hidden() {
        return this.controller.viewProps.get("hidden")
    }
    set hidden(t) {
        this.controller.viewProps.set("hidden", t)
    }
    dispose() {
        this.controller.viewProps.set("disposed", !0)
    }
    importState(t) {
        return this.controller.importState(t)
    }
    exportState() {
        return this.controller.exportState()
    }
}
  , Jt = class {
    constructor(t) {
        this.target = t
    }
}
  , Pn = class extends Jt {
    constructor(t, e, i) {
        super(t),
        this.value = e,
        this.last = i ?? !0
    }
}
  , Kl = class extends Jt {
    constructor(t, e) {
        super(t),
        this.expanded = e
    }
}
  , Ul = class extends Jt {
    constructor(t, e) {
        super(t),
        this.index = e
    }
}
  , Li = class extends Zt {
    constructor(t) {
        super(t),
        this.onValueChange_ = this.onValueChange_.bind(this),
        this.emitter_ = new j,
        this.controller.value.emitter.on("change", this.onValueChange_)
    }
    get label() {
        return this.controller.labelController.props.get("label")
    }
    set label(t) {
        this.controller.labelController.props.set("label", t)
    }
    get key() {
        return this.controller.value.binding.target.key
    }
    get tag() {
        return this.controller.tag
    }
    set tag(t) {
        this.controller.tag = t
    }
    on(t, e) {
        const i = e.bind(this);
        return this.emitter_.on(t, s=>{
            i(s)
        }
        ),
        this
    }
    refresh() {
        this.controller.value.fetch()
    }
    onValueChange_(t) {
        const e = this.controller.value;
        this.emitter_.emit("change", new Pn(this,e.binding.target.read(),t.options.last))
    }
}
;
function Hl(n, t) {
    const i = Object.keys(t).reduce((s,r)=>{
        if (s === void 0)
            return;
        const o = t[r]
          , a = o(n[r]);
        return a.succeeded ? Object.assign(Object.assign({}, s), {
            [r]: a.value
        }) : void 0
    }
    , {});
    return i
}
function ql(n, t) {
    return n.reduce((e,i)=>{
        if (e === void 0)
            return;
        const s = t(i);
        if (!(!s.succeeded || s.value === void 0))
            return [...e, s.value]
    }
    , [])
}
function Gl(n) {
    return n === null ? !1 : typeof n == "object"
}
function ut(n) {
    return t=>e=>{
        if (!t && e === void 0)
            return {
                succeeded: !1,
                value: void 0
            };
        if (t && e === void 0)
            return {
                succeeded: !0,
                value: void 0
            };
        const i = n(e);
        return i !== void 0 ? {
            succeeded: !0,
            value: i
        } : {
            succeeded: !1,
            value: void 0
        }
    }
}
function Ts(n) {
    return {
        custom: t=>ut(t)(n),
        boolean: ut(t=>typeof t == "boolean" ? t : void 0)(n),
        number: ut(t=>typeof t == "number" ? t : void 0)(n),
        string: ut(t=>typeof t == "string" ? t : void 0)(n),
        function: ut(t=>typeof t == "function" ? t : void 0)(n),
        constant: t=>ut(e=>e === t ? t : void 0)(n),
        raw: ut(t=>t)(n),
        object: t=>ut(e=>{
            if (Gl(e))
                return Hl(e, t)
        }
        )(n),
        array: t=>ut(e=>{
            if (Array.isArray(e))
                return ql(e, t)
        }
        )(n)
    }
}
const ri = {
    optional: Ts(!0),
    required: Ts(!1)
};
function L(n, t) {
    const e = t(ri)
      , i = ri.required.object(e)(n);
    return i.succeeded ? i.value : void 0
}
function it(n, t, e, i) {
    if (t && !t(n))
        return !1;
    const s = L(n, e);
    return s ? i(s) : !1
}
function st(n, t) {
    var e;
    return Ut((e = n == null ? void 0 : n()) !== null && e !== void 0 ? e : {}, t)
}
function ln(n) {
    return "value"in n
}
function Wl(n) {
    if (!gi(n) || !("binding"in n))
        return !1;
    const t = n.binding;
    return ll(t)
}
const O = "http://www.w3.org/2000/svg";
function dn(n) {
    n.offsetHeight
}
function Yl(n, t) {
    const e = n.style.transition;
    n.style.transition = "none",
    t(),
    n.style.transition = e
}
function yn(n) {
    return n.ontouchstart !== void 0
}
function Xl(n) {
    const t = n.ownerDocument.defaultView;
    return t && "document"in t ? n.getContext("2d", {
        willReadFrequently: !0
    }) : null
}
const Zl = {
    check: '<path d="M2 8l4 4l8 -8"/>',
    dropdown: '<path d="M5 7h6l-3 3 z"/>',
    p2dpad: '<path d="M8 4v8"/><path d="M4 8h8"/><circle cx="12" cy="12" r="1.2"/>'
};
function En(n, t) {
    const e = n.createElementNS(O, "svg");
    return e.innerHTML = Zl[t],
    e
}
function Kr(n, t, e) {
    n.insertBefore(t, n.children[e])
}
function Mi(n) {
    n.parentElement && n.parentElement.removeChild(n)
}
function Ur(n) {
    for (; n.children.length > 0; )
        n.removeChild(n.children[0])
}
function Jl(n) {
    for (; n.childNodes.length > 0; )
        n.removeChild(n.childNodes[0])
}
function Ti(n) {
    return n.relatedTarget ? n.relatedTarget : "explicitOriginalTarget"in n ? n.explicitOriginalTarget : null
}
function Q(n, t) {
    n.emitter.on("change", e=>{
        t(e.rawValue)
    }
    ),
    t(n.rawValue)
}
function tt(n, t, e) {
    Q(n.value(t), e)
}
const Ql = "tp";
function v(n) {
    return (e,i)=>[Ql, "-", n, "v", e ? `_${e}` : "", i ? `-${i}` : ""].join("")
}
const Pe = v("lbl");
function tp(n, t) {
    const e = n.createDocumentFragment();
    return t.split(`
`).map(s=>n.createTextNode(s)).forEach((s,r)=>{
        r > 0 && e.appendChild(n.createElement("br")),
        e.appendChild(s)
    }
    ),
    e
}
let Hr = class {
    constructor(t, e) {
        this.element = t.createElement("div"),
        this.element.classList.add(Pe()),
        e.viewProps.bindClassModifiers(this.element);
        const i = t.createElement("div");
        i.classList.add(Pe("l")),
        tt(e.props, "label", r=>{
            y(r) ? this.element.classList.add(Pe(void 0, "nol")) : (this.element.classList.remove(Pe(void 0, "nol")),
            Jl(i),
            i.appendChild(tp(t, r)))
        }
        ),
        this.element.appendChild(i),
        this.labelElement = i;
        const s = t.createElement("div");
        s.classList.add(Pe("v")),
        this.element.appendChild(s),
        this.valueElement = s
    }
}
  , kn = class {
    constructor(t, e) {
        this.props = e.props,
        this.valueController = e.valueController,
        this.viewProps = e.valueController.viewProps,
        this.view = new Hr(t,{
            props: e.props,
            viewProps: this.viewProps
        }),
        this.view.valueElement.appendChild(this.valueController.view.element)
    }
    importProps(t) {
        return it(t, null, e=>({
            label: e.optional.string
        }), e=>(this.props.set("label", e.label),
        !0))
    }
    exportProps() {
        return st(null, {
            label: this.props.get("label")
        })
    }
}
;
function ep() {
    return ["veryfirst", "first", "last", "verylast"]
}
const As = v("")
  , Os = {
    veryfirst: "vfst",
    first: "fst",
    last: "lst",
    verylast: "vlst"
};
let He = class {
    constructor(t) {
        this.parent_ = null,
        this.blade = t.blade,
        this.view = t.view,
        this.viewProps = t.viewProps;
        const e = this.view.element;
        this.blade.value("positions").emitter.on("change", ()=>{
            ep().forEach(i=>{
                e.classList.remove(As(void 0, Os[i]))
            }
            ),
            this.blade.get("positions").forEach(i=>{
                e.classList.add(As(void 0, Os[i]))
            }
            )
        }
        ),
        this.viewProps.handleDispose(()=>{
            Mi(e)
        }
        )
    }
    get parent() {
        return this.parent_
    }
    set parent(t) {
        this.parent_ = t,
        this.viewProps.set("parent", this.parent_ ? this.parent_.viewProps : null)
    }
    importState(t) {
        return it(t, null, e=>({
            disabled: e.required.boolean,
            hidden: e.required.boolean
        }), e=>(this.viewProps.importState(e),
        !0))
    }
    exportState() {
        return st(null, Object.assign({}, this.viewProps.exportState()))
    }
}
  , mn = class extends He {
    constructor(t, e) {
        if (e.value !== e.valueController.value)
            throw ft.shouldNeverHappen();
        const i = e.valueController.viewProps
          , s = new kn(t,{
            blade: e.blade,
            props: e.props,
            valueController: e.valueController
        });
        super(Object.assign(Object.assign({}, e), {
            view: new Hr(t,{
                props: e.props,
                viewProps: i
            }),
            viewProps: i
        })),
        this.labelController = s,
        this.value = e.value,
        this.valueController = e.valueController,
        this.view.valueElement.appendChild(this.valueController.view.element)
    }
    importState(t) {
        return it(t, e=>{
            var i, s, r;
            return super.importState(e) && this.labelController.importProps(e) && ((r = (s = (i = this.valueController).importProps) === null || s === void 0 ? void 0 : s.call(i, t)) !== null && r !== void 0 ? r : !0)
        }
        , e=>({
            value: e.optional.raw
        }), e=>(e.value && (this.value.rawValue = e.value),
        !0))
    }
    exportState() {
        var t, e, i;
        return st(()=>super.exportState(), Object.assign(Object.assign({
            value: this.value.rawValue
        }, this.labelController.exportProps()), (i = (e = (t = this.valueController).exportProps) === null || e === void 0 ? void 0 : e.call(t)) !== null && i !== void 0 ? i : {}))
    }
}
;
function qr(n, t) {
    for (; n.length < t; )
        n.push(void 0)
}
function np(n) {
    const t = [];
    return qr(t, n),
    t
}
function ip(n) {
    const t = n.indexOf(void 0);
    return t < 0 ? n : n.slice(0, t)
}
function sp(n, t) {
    const e = [...ip(n), t];
    return e.length > n.length ? e.splice(0, e.length - n.length) : qr(e, n.length),
    e
}
let rp = class extends Zt {
    get label() {
        return this.controller.labelController.props.get("label")
    }
    set label(t) {
        this.controller.labelController.props.set("label", t)
    }
    get title() {
        var t;
        return (t = this.controller.buttonController.props.get("title")) !== null && t !== void 0 ? t : ""
    }
    set title(t) {
        this.controller.buttonController.props.set("title", t)
    }
    on(t, e) {
        const i = e.bind(this);
        return this.controller.buttonController.emitter.on(t, ()=>{
            i(new Jt(this))
        }
        ),
        this
    }
}
;
function op(n, t, e) {
    e ? n.classList.add(t) : n.classList.remove(t)
}
function Dt(n, t) {
    return e=>{
        op(n, t, e)
    }
}
function Ai(n, t) {
    Q(n, e=>{
        t.textContent = e ?? ""
    }
    )
}
const jn = v("btn");
let ap = class {
    constructor(t, e) {
        this.element = t.createElement("div"),
        this.element.classList.add(jn()),
        e.viewProps.bindClassModifiers(this.element);
        const i = t.createElement("button");
        i.classList.add(jn("b")),
        e.viewProps.bindDisabled(i),
        this.element.appendChild(i),
        this.buttonElement = i;
        const s = t.createElement("div");
        s.classList.add(jn("t")),
        Ai(e.props.value("title"), s),
        this.buttonElement.appendChild(s)
    }
}
  , Gr = class {
    constructor(t, e) {
        this.emitter = new j,
        this.onClick_ = this.onClick_.bind(this),
        this.props = e.props,
        this.viewProps = e.viewProps,
        this.view = new ap(t,{
            props: this.props,
            viewProps: this.viewProps
        }),
        this.view.buttonElement.addEventListener("click", this.onClick_)
    }
    importProps(t) {
        return it(t, null, e=>({
            title: e.optional.string
        }), e=>(this.props.set("title", e.title),
        !0))
    }
    exportProps() {
        return st(null, {
            title: this.props.get("title")
        })
    }
    onClick_() {
        this.emitter.emit("click", {
            sender: this
        })
    }
}
  , Ds = class extends He {
    constructor(t, e) {
        const i = new Gr(t,{
            props: e.buttonProps,
            viewProps: e.viewProps
        })
          , s = new kn(t,{
            blade: e.blade,
            props: e.labelProps,
            valueController: i
        });
        super({
            blade: e.blade,
            view: s.view,
            viewProps: e.viewProps
        }),
        this.buttonController = i,
        this.labelController = s
    }
    importState(t) {
        return it(t, e=>super.importState(e) && this.buttonController.importProps(e) && this.labelController.importProps(e), ()=>({}), ()=>!0)
    }
    exportState() {
        return st(()=>super.exportState(), Object.assign(Object.assign({}, this.buttonController.exportProps()), this.labelController.exportProps()))
    }
}
  , lp = class {
    constructor(t) {
        const [e,i] = t.split("-")
          , s = e.split(".");
        this.major = parseInt(s[0], 10),
        this.minor = parseInt(s[1], 10),
        this.patch = parseInt(s[2], 10),
        this.prerelease = i ?? null
    }
    toString() {
        const t = [this.major, this.minor, this.patch].join(".");
        return this.prerelease !== null ? [t, this.prerelease].join("-") : t
    }
}
;
const pp = new lp("2.0.0-beta.2");
function M(n) {
    return Object.assign({
        core: pp
    }, n)
}
M({
    id: "button",
    type: "blade",
    accept(n) {
        const t = L(n, e=>({
            title: e.required.string,
            view: e.required.constant("button"),
            label: e.optional.string
        }));
        return t ? {
            params: t
        } : null
    },
    controller(n) {
        return new Ds(n.document,{
            blade: n.blade,
            buttonProps: m.fromObject({
                title: n.params.title
            }),
            labelProps: m.fromObject({
                label: n.params.label
            }),
            viewProps: n.viewProps
        })
    },
    api(n) {
        return n.controller instanceof Ds ? new rp(n.controller) : null
    }
});
function cp(n, t) {
    return n.addBlade(Object.assign(Object.assign({}, t), {
        view: "button"
    }))
}
function hp(n, t) {
    return n.addBlade(Object.assign(Object.assign({}, t), {
        view: "folder"
    }))
}
function up(n, t) {
    return n.addBlade(Object.assign(Object.assign({}, t), {
        view: "tab"
    }))
}
function dp(n) {
    return gi(n) ? "refresh"in n && typeof n.refresh == "function" : !1
}
function mp(n, t) {
    if (!Ls.isBindable(n))
        throw ft.notBindable();
    return new Ls(n,t)
}
let vp = class {
    constructor(t, e) {
        this.onRackValueChange_ = this.onRackValueChange_.bind(this),
        this.controller_ = t,
        this.emitter_ = new j,
        this.pool_ = e,
        this.controller_.rack.emitter.on("valuechange", this.onRackValueChange_)
    }
    get children() {
        return this.controller_.rack.children.map(t=>this.pool_.createApi(t))
    }
    addBinding(t, e, i) {
        const s = i ?? {}
          , r = this.controller_.element.ownerDocument
          , o = this.pool_.createBinding(r, mp(t, e), s)
          , a = this.pool_.createBindingApi(o);
        return this.add(a, s.index)
    }
    addFolder(t) {
        return hp(this, t)
    }
    addButton(t) {
        return cp(this, t)
    }
    addTab(t) {
        return up(this, t)
    }
    add(t, e) {
        const i = t.controller;
        return this.controller_.rack.add(i, e),
        t
    }
    remove(t) {
        this.controller_.rack.remove(t.controller)
    }
    addBlade(t) {
        const e = this.controller_.element.ownerDocument
          , i = this.pool_.createBlade(e, t)
          , s = this.pool_.createApi(i);
        return this.add(s, t.index)
    }
    on(t, e) {
        const i = e.bind(this);
        return this.emitter_.on(t, s=>{
            i(s)
        }
        ),
        this
    }
    refresh() {
        this.children.forEach(t=>{
            dp(t) && t.refresh()
        }
        )
    }
    onRackValueChange_(t) {
        const e = t.bladeController
          , i = this.pool_.createApi(e)
          , s = Wl(e.value) ? e.value.binding : null;
        this.emitter_.emit("change", new Pn(i,s ? s.target.read() : e.value.rawValue,t.options.last))
    }
}
  , Oi = class extends Zt {
    constructor(t, e) {
        super(t),
        this.rackApi_ = new vp(t.rackController,e)
    }
}
  , Di = class extends He {
    constructor(t) {
        super({
            blade: t.blade,
            view: t.view,
            viewProps: t.rackController.viewProps
        }),
        this.rackController = t.rackController
    }
    importState(t) {
        return it(t, e=>super.importState(e), e=>({
            children: e.required.array(e.required.raw)
        }), e=>this.rackController.rack.children.every((i,s)=>i.importState(e.children[s])))
    }
    exportState() {
        return st(()=>super.exportState(), {
            children: this.rackController.rack.children.map(t=>t.exportState())
        })
    }
}
;
function oi(n) {
    return "rackController"in n
}
let bp = class {
    constructor(t) {
        this.emitter = new j,
        this.items_ = [],
        this.cache_ = new Set,
        this.onSubListAdd_ = this.onSubListAdd_.bind(this),
        this.onSubListRemove_ = this.onSubListRemove_.bind(this),
        this.extract_ = t
    }
    get items() {
        return this.items_
    }
    allItems() {
        return Array.from(this.cache_)
    }
    find(t) {
        for (const e of this.allItems())
            if (t(e))
                return e;
        return null
    }
    includes(t) {
        return this.cache_.has(t)
    }
    add(t, e) {
        if (this.includes(t))
            throw ft.shouldNeverHappen();
        const i = e !== void 0 ? e : this.items_.length;
        this.items_.splice(i, 0, t),
        this.cache_.add(t);
        const s = this.extract_(t);
        s && (s.emitter.on("add", this.onSubListAdd_),
        s.emitter.on("remove", this.onSubListRemove_),
        s.allItems().forEach(r=>{
            this.cache_.add(r)
        }
        )),
        this.emitter.emit("add", {
            index: i,
            item: t,
            root: this,
            target: this
        })
    }
    remove(t) {
        const e = this.items_.indexOf(t);
        if (e < 0)
            return;
        this.items_.splice(e, 1),
        this.cache_.delete(t);
        const i = this.extract_(t);
        i && (i.allItems().forEach(s=>{
            this.cache_.delete(s)
        }
        ),
        i.emitter.off("add", this.onSubListAdd_),
        i.emitter.off("remove", this.onSubListRemove_)),
        this.emitter.emit("remove", {
            index: e,
            item: t,
            root: this,
            target: this
        })
    }
    onSubListAdd_(t) {
        this.cache_.add(t.item),
        this.emitter.emit("add", {
            index: t.index,
            item: t.item,
            root: this,
            target: t.target
        })
    }
    onSubListRemove_(t) {
        this.cache_.delete(t.item),
        this.emitter.emit("remove", {
            index: t.index,
            item: t.item,
            root: this,
            target: t.target
        })
    }
}
;
function fp(n, t) {
    for (let e = 0; e < n.length; e++) {
        const i = n[e];
        if (ln(i) && i.value === t)
            return i
    }
    return null
}
function wp(n) {
    return oi(n) ? n.rackController.rack.bcSet_ : null
}
let _p = class {
    constructor(t) {
        var e, i;
        this.emitter = new j,
        this.onBladePositionsChange_ = this.onBladePositionsChange_.bind(this),
        this.onSetAdd_ = this.onSetAdd_.bind(this),
        this.onSetRemove_ = this.onSetRemove_.bind(this),
        this.onChildDispose_ = this.onChildDispose_.bind(this),
        this.onChildPositionsChange_ = this.onChildPositionsChange_.bind(this),
        this.onChildValueChange_ = this.onChildValueChange_.bind(this),
        this.onChildViewPropsChange_ = this.onChildViewPropsChange_.bind(this),
        this.onRackLayout_ = this.onRackLayout_.bind(this),
        this.onRackValueChange_ = this.onRackValueChange_.bind(this),
        this.blade_ = (e = t.blade) !== null && e !== void 0 ? e : null,
        (i = this.blade_) === null || i === void 0 || i.value("positions").emitter.on("change", this.onBladePositionsChange_),
        this.viewProps = t.viewProps,
        this.bcSet_ = new bp(wp),
        this.bcSet_.emitter.on("add", this.onSetAdd_),
        this.bcSet_.emitter.on("remove", this.onSetRemove_)
    }
    get children() {
        return this.bcSet_.items
    }
    add(t, e) {
        var i;
        (i = t.parent) === null || i === void 0 || i.remove(t),
        t.parent = this,
        this.bcSet_.add(t, e)
    }
    remove(t) {
        t.parent = null,
        this.bcSet_.remove(t)
    }
    find(t) {
        return this.bcSet_.allItems().filter(t)
    }
    onSetAdd_(t) {
        this.updatePositions_();
        const e = t.target === t.root;
        if (this.emitter.emit("add", {
            bladeController: t.item,
            index: t.index,
            root: e,
            sender: this
        }),
        !e)
            return;
        const i = t.item;
        if (i.viewProps.emitter.on("change", this.onChildViewPropsChange_),
        i.blade.value("positions").emitter.on("change", this.onChildPositionsChange_),
        i.viewProps.handleDispose(this.onChildDispose_),
        ln(i))
            i.value.emitter.on("change", this.onChildValueChange_);
        else if (oi(i)) {
            const s = i.rackController.rack;
            if (s) {
                const r = s.emitter;
                r.on("layout", this.onRackLayout_),
                r.on("valuechange", this.onRackValueChange_)
            }
        }
    }
    onSetRemove_(t) {
        this.updatePositions_();
        const e = t.target === t.root;
        if (this.emitter.emit("remove", {
            bladeController: t.item,
            root: e,
            sender: this
        }),
        !e)
            return;
        const i = t.item;
        if (ln(i))
            i.value.emitter.off("change", this.onChildValueChange_);
        else if (oi(i)) {
            const s = i.rackController.rack;
            if (s) {
                const r = s.emitter;
                r.off("layout", this.onRackLayout_),
                r.off("valuechange", this.onRackValueChange_)
            }
        }
    }
    updatePositions_() {
        const t = this.bcSet_.items.filter(s=>!s.viewProps.get("hidden"))
          , e = t[0]
          , i = t[t.length - 1];
        this.bcSet_.items.forEach(s=>{
            const r = [];
            s === e && (r.push("first"),
            (!this.blade_ || this.blade_.get("positions").includes("veryfirst")) && r.push("veryfirst")),
            s === i && (r.push("last"),
            (!this.blade_ || this.blade_.get("positions").includes("verylast")) && r.push("verylast")),
            s.blade.set("positions", r)
        }
        )
    }
    onChildPositionsChange_() {
        this.updatePositions_(),
        this.emitter.emit("layout", {
            sender: this
        })
    }
    onChildViewPropsChange_(t) {
        this.updatePositions_(),
        this.emitter.emit("layout", {
            sender: this
        })
    }
    onChildDispose_() {
        this.bcSet_.items.filter(e=>e.viewProps.get("disposed")).forEach(e=>{
            this.bcSet_.remove(e)
        }
        )
    }
    onChildValueChange_(t) {
        const e = fp(this.find(ln), t.sender);
        if (!e)
            throw ft.alreadyDisposed();
        this.emitter.emit("valuechange", {
            bladeController: e,
            options: t.options,
            sender: this
        })
    }
    onRackLayout_(t) {
        this.updatePositions_(),
        this.emitter.emit("layout", {
            sender: this
        })
    }
    onRackValueChange_(t) {
        this.emitter.emit("valuechange", {
            bladeController: t.bladeController,
            options: t.options,
            sender: this
        })
    }
    onBladePositionsChange_() {
        this.updatePositions_()
    }
}
  , Ri = class {
    constructor(t) {
        this.onRackAdd_ = this.onRackAdd_.bind(this),
        this.onRackRemove_ = this.onRackRemove_.bind(this),
        this.element = t.element,
        this.viewProps = t.viewProps;
        const e = new _p({
            blade: t.root ? void 0 : t.blade,
            viewProps: t.viewProps
        });
        e.emitter.on("add", this.onRackAdd_),
        e.emitter.on("remove", this.onRackRemove_),
        this.rack = e,
        this.viewProps.handleDispose(()=>{
            for (let i = this.rack.children.length - 1; i >= 0; i--)
                this.rack.children[i].viewProps.set("disposed", !0)
        }
        )
    }
    onRackAdd_(t) {
        t.root && Kr(this.element, t.bladeController.view.element, t.index)
    }
    onRackRemove_(t) {
        t.root && Mi(t.bladeController.view.element)
    }
}
;
function Wr() {
    return new m({
        positions: $([], {
            equals: al
        })
    })
}
let Vn = class Yr extends m {
    constructor(t) {
        super(t)
    }
    static create(t) {
        const e = {
            completed: !0,
            expanded: t,
            expandedHeight: null,
            shouldFixHeight: !1,
            temporaryExpanded: null
        }
          , i = m.createCore(e);
        return new Yr(i)
    }
    get styleExpanded() {
        var t;
        return (t = this.get("temporaryExpanded")) !== null && t !== void 0 ? t : this.get("expanded")
    }
    get styleHeight() {
        if (!this.styleExpanded)
            return "0";
        const t = this.get("expandedHeight");
        return this.get("shouldFixHeight") && !y(t) ? `${t}px` : "auto"
    }
    bindExpandedClass(t, e) {
        const i = ()=>{
            this.styleExpanded ? t.classList.add(e) : t.classList.remove(e)
        }
        ;
        tt(this, "expanded", i),
        tt(this, "temporaryExpanded", i)
    }
    cleanUpTransition() {
        this.set("shouldFixHeight", !1),
        this.set("expandedHeight", null),
        this.set("completed", !0)
    }
}
;
function gp(n, t) {
    let e = 0;
    return Yl(t, ()=>{
        n.set("expandedHeight", null),
        n.set("temporaryExpanded", !0),
        dn(t),
        e = t.clientHeight,
        n.set("temporaryExpanded", null),
        dn(t)
    }
    ),
    e
}
function Rs(n, t) {
    t.style.height = n.styleHeight
}
function Sn(n, t) {
    n.value("expanded").emitter.on("beforechange", ()=>{
        if (n.set("completed", !1),
        y(n.get("expandedHeight"))) {
            const e = gp(n, t);
            e > 0 && n.set("expandedHeight", e)
        }
        n.set("shouldFixHeight", !0),
        dn(t)
    }
    ),
    n.emitter.on("change", ()=>{
        Rs(n, t)
    }
    ),
    Rs(n, t),
    t.addEventListener("transitionend", e=>{
        e.propertyName === "height" && n.cleanUpTransition()
    }
    )
}
let Cp = class extends Oi {
    constructor(t, e) {
        super(t, e),
        this.emitter_ = new j,
        this.controller.foldable.value("expanded").emitter.on("change", i=>{
            this.emitter_.emit("fold", new Kl(this,i.sender.rawValue))
        }
        ),
        this.rackApi_.on("change", i=>{
            this.emitter_.emit("change", i)
        }
        )
    }
    get expanded() {
        return this.controller.foldable.get("expanded")
    }
    set expanded(t) {
        this.controller.foldable.set("expanded", t)
    }
    get title() {
        return this.controller.props.get("title")
    }
    set title(t) {
        this.controller.props.set("title", t)
    }
    get children() {
        return this.rackApi_.children
    }
    addBinding(t, e, i) {
        return this.rackApi_.addBinding(t, e, i)
    }
    addFolder(t) {
        return this.rackApi_.addFolder(t)
    }
    addButton(t) {
        return this.rackApi_.addButton(t)
    }
    addTab(t) {
        return this.rackApi_.addTab(t)
    }
    add(t, e) {
        return this.rackApi_.add(t, e)
    }
    remove(t) {
        this.rackApi_.remove(t)
    }
    addBlade(t) {
        return this.rackApi_.addBlade(t)
    }
    on(t, e) {
        const i = e.bind(this);
        return this.emitter_.on(t, s=>{
            i(s)
        }
        ),
        this
    }
    refresh() {
        this.rackApi_.refresh()
    }
}
;
const Xr = v("cnt");
let xp = class {
    constructor(t, e) {
        var i;
        this.className_ = v((i = e.viewName) !== null && i !== void 0 ? i : "fld"),
        this.element = t.createElement("div"),
        this.element.classList.add(this.className_(), Xr()),
        e.viewProps.bindClassModifiers(this.element),
        this.foldable_ = e.foldable,
        this.foldable_.bindExpandedClass(this.element, this.className_(void 0, "expanded")),
        tt(this.foldable_, "completed", Dt(this.element, this.className_(void 0, "cpl")));
        const s = t.createElement("button");
        s.classList.add(this.className_("b")),
        tt(e.props, "title", p=>{
            y(p) ? this.element.classList.add(this.className_(void 0, "not")) : this.element.classList.remove(this.className_(void 0, "not"))
        }
        ),
        e.viewProps.bindDisabled(s),
        this.element.appendChild(s),
        this.buttonElement = s;
        const r = t.createElement("div");
        r.classList.add(this.className_("i")),
        this.element.appendChild(r);
        const o = t.createElement("div");
        o.classList.add(this.className_("t")),
        Ai(e.props.value("title"), o),
        this.buttonElement.appendChild(o),
        this.titleElement = o;
        const a = t.createElement("div");
        a.classList.add(this.className_("m")),
        this.buttonElement.appendChild(a);
        const l = t.createElement("div");
        l.classList.add(this.className_("c")),
        this.element.appendChild(l),
        this.containerElement = l
    }
}
  , Bs = class extends Di {
    constructor(t, e) {
        var i;
        const s = Vn.create((i = e.expanded) !== null && i !== void 0 ? i : !0)
          , r = new xp(t,{
            foldable: s,
            props: e.props,
            viewName: e.root ? "rot" : void 0,
            viewProps: e.viewProps
        });
        super(Object.assign(Object.assign({}, e), {
            rackController: new Ri({
                blade: e.blade,
                element: r.containerElement,
                root: e.root,
                viewProps: e.viewProps
            }),
            view: r
        })),
        this.onTitleClick_ = this.onTitleClick_.bind(this),
        this.props = e.props,
        this.foldable = s,
        Sn(this.foldable, this.view.containerElement),
        this.rackController.rack.emitter.on("add", ()=>{
            this.foldable.cleanUpTransition()
        }
        ),
        this.rackController.rack.emitter.on("remove", ()=>{
            this.foldable.cleanUpTransition()
        }
        ),
        this.view.buttonElement.addEventListener("click", this.onTitleClick_)
    }
    get document() {
        return this.view.element.ownerDocument
    }
    importState(t) {
        return it(t, e=>super.importState(e), e=>({
            expanded: e.required.boolean,
            title: e.optional.string
        }), e=>(this.foldable.set("expanded", e.expanded),
        this.props.set("title", e.title),
        !0))
    }
    exportState() {
        return st(()=>super.exportState(), {
            expanded: this.foldable.get("expanded"),
            title: this.props.get("title")
        })
    }
    onTitleClick_() {
        this.foldable.set("expanded", !this.foldable.get("expanded"))
    }
}
;
M({
    id: "folder",
    type: "blade",
    accept(n) {
        const t = L(n, e=>({
            title: e.required.string,
            view: e.required.constant("folder"),
            expanded: e.optional.boolean
        }));
        return t ? {
            params: t
        } : null
    },
    controller(n) {
        return new Bs(n.document,{
            blade: n.blade,
            expanded: n.params.expanded,
            props: m.fromObject({
                title: n.params.title
            }),
            viewProps: n.viewProps
        })
    },
    api(n) {
        return n.controller instanceof Bs ? new Cp(n.controller,n.pool) : null
    }
});
const Pp = v("");
function js(n, t) {
    return Dt(n, Pp(void 0, t))
}
let Ht = class Zr extends m {
    constructor(t) {
        var e;
        super(t),
        this.onDisabledChange_ = this.onDisabledChange_.bind(this),
        this.onParentChange_ = this.onParentChange_.bind(this),
        this.onParentGlobalDisabledChange_ = this.onParentGlobalDisabledChange_.bind(this),
        [this.globalDisabled_,this.setGlobalDisabled_] = dl($(this.getGlobalDisabled_())),
        this.value("disabled").emitter.on("change", this.onDisabledChange_),
        this.value("parent").emitter.on("change", this.onParentChange_),
        (e = this.get("parent")) === null || e === void 0 || e.globalDisabled.emitter.on("change", this.onParentGlobalDisabledChange_)
    }
    static create(t) {
        var e, i, s;
        const r = t ?? {};
        return new Zr(m.createCore({
            disabled: (e = r.disabled) !== null && e !== void 0 ? e : !1,
            disposed: !1,
            hidden: (i = r.hidden) !== null && i !== void 0 ? i : !1,
            parent: (s = r.parent) !== null && s !== void 0 ? s : null
        }))
    }
    get globalDisabled() {
        return this.globalDisabled_
    }
    bindClassModifiers(t) {
        Q(this.globalDisabled_, js(t, "disabled")),
        tt(this, "hidden", js(t, "hidden"))
    }
    bindDisabled(t) {
        Q(this.globalDisabled_, e=>{
            t.disabled = e
        }
        )
    }
    bindTabIndex(t) {
        Q(this.globalDisabled_, e=>{
            t.tabIndex = e ? -1 : 0
        }
        )
    }
    handleDispose(t) {
        this.value("disposed").emitter.on("change", e=>{
            e && t()
        }
        )
    }
    importState(t) {
        this.set("disabled", t.disabled),
        this.set("hidden", t.hidden)
    }
    exportState() {
        return {
            disabled: this.get("disabled"),
            hidden: this.get("hidden")
        }
    }
    getGlobalDisabled_() {
        const t = this.get("parent");
        return (t ? t.globalDisabled.rawValue : !1) || this.get("disabled")
    }
    updateGlobalDisabled_() {
        this.setGlobalDisabled_(this.getGlobalDisabled_())
    }
    onDisabledChange_() {
        this.updateGlobalDisabled_()
    }
    onParentGlobalDisabledChange_() {
        this.updateGlobalDisabled_()
    }
    onParentChange_(t) {
        var e;
        const i = t.previousRawValue;
        i == null || i.globalDisabled.emitter.off("change", this.onParentGlobalDisabledChange_),
        (e = this.get("parent")) === null || e === void 0 || e.globalDisabled.emitter.on("change", this.onParentGlobalDisabledChange_),
        this.updateGlobalDisabled_()
    }
}
;
const Ns = v("tbp");
let yp = class {
    constructor(t, e) {
        this.element = t.createElement("div"),
        this.element.classList.add(Ns()),
        e.viewProps.bindClassModifiers(this.element);
        const i = t.createElement("div");
        i.classList.add(Ns("c")),
        this.element.appendChild(i),
        this.containerElement = i
    }
}
;
const ye = v("tbi");
let Ep = class {
    constructor(t, e) {
        this.element = t.createElement("div"),
        this.element.classList.add(ye()),
        e.viewProps.bindClassModifiers(this.element),
        tt(e.props, "selected", r=>{
            r ? this.element.classList.add(ye(void 0, "sel")) : this.element.classList.remove(ye(void 0, "sel"))
        }
        );
        const i = t.createElement("button");
        i.classList.add(ye("b")),
        e.viewProps.bindDisabled(i),
        this.element.appendChild(i),
        this.buttonElement = i;
        const s = t.createElement("div");
        s.classList.add(ye("t")),
        Ai(e.props.value("title"), s),
        this.buttonElement.appendChild(s),
        this.titleElement = s
    }
}
  , kp = class {
    constructor(t, e) {
        this.emitter = new j,
        this.onClick_ = this.onClick_.bind(this),
        this.props = e.props,
        this.viewProps = e.viewProps,
        this.view = new Ep(t,{
            props: e.props,
            viewProps: e.viewProps
        }),
        this.view.buttonElement.addEventListener("click", this.onClick_)
    }
    onClick_() {
        this.emitter.emit("click", {
            sender: this
        })
    }
}
  , ai = class extends Di {
    constructor(t, e) {
        const i = new yp(t,{
            viewProps: e.viewProps
        });
        super(Object.assign(Object.assign({}, e), {
            rackController: new Ri({
                blade: e.blade,
                element: i.containerElement,
                viewProps: e.viewProps
            }),
            view: i
        })),
        this.onItemClick_ = this.onItemClick_.bind(this),
        this.ic_ = new kp(t,{
            props: e.itemProps,
            viewProps: Ht.create()
        }),
        this.ic_.emitter.on("click", this.onItemClick_),
        this.props = e.props,
        tt(this.props, "selected", s=>{
            this.itemController.props.set("selected", s),
            this.viewProps.set("hidden", !s)
        }
        )
    }
    get itemController() {
        return this.ic_
    }
    importState(t) {
        return it(t, e=>super.importState(e), e=>({
            selected: e.required.boolean,
            title: e.required.string
        }), e=>(this.ic_.props.set("selected", e.selected),
        this.ic_.props.set("title", e.title),
        !0))
    }
    exportState() {
        return st(()=>super.exportState(), {
            selected: this.ic_.props.get("selected"),
            title: this.ic_.props.get("title")
        })
    }
    onItemClick_() {
        this.props.set("selected", !0)
    }
}
  , Vp = class extends Oi {
    constructor(t, e) {
        super(t, e),
        this.emitter_ = new j,
        this.onSelect_ = this.onSelect_.bind(this),
        this.pool_ = e,
        this.rackApi_.on("change", i=>{
            this.emitter_.emit("change", i)
        }
        ),
        this.controller.tab.selectedIndex.emitter.on("change", this.onSelect_)
    }
    get pages() {
        return this.rackApi_.children
    }
    addPage(t) {
        const e = this.controller.view.element.ownerDocument
          , i = new ai(e,{
            blade: Wr(),
            itemProps: m.fromObject({
                selected: !1,
                title: t.title
            }),
            props: m.fromObject({
                selected: !1
            }),
            viewProps: Ht.create()
        })
          , s = this.pool_.createApi(i);
        return this.rackApi_.add(s, t.index)
    }
    removePage(t) {
        this.rackApi_.remove(this.rackApi_.children[t])
    }
    on(t, e) {
        const i = e.bind(this);
        return this.emitter_.on(t, s=>{
            i(s)
        }
        ),
        this
    }
    onSelect_(t) {
        this.emitter_.emit("select", new Ul(this,t.rawValue))
    }
}
  , Sp = class extends Oi {
    get title() {
        var t;
        return (t = this.controller.itemController.props.get("title")) !== null && t !== void 0 ? t : ""
    }
    set title(t) {
        this.controller.itemController.props.set("title", t)
    }
    get selected() {
        return this.controller.props.get("selected")
    }
    set selected(t) {
        this.controller.props.set("selected", t)
    }
    get children() {
        return this.rackApi_.children
    }
    addButton(t) {
        return this.rackApi_.addButton(t)
    }
    addFolder(t) {
        return this.rackApi_.addFolder(t)
    }
    addTab(t) {
        return this.rackApi_.addTab(t)
    }
    add(t, e) {
        this.rackApi_.add(t, e)
    }
    remove(t) {
        this.rackApi_.remove(t)
    }
    addBinding(t, e, i) {
        return this.rackApi_.addBinding(t, e, i)
    }
    addBlade(t) {
        return this.rackApi_.addBlade(t)
    }
    refresh() {
        this.rackApi_.refresh()
    }
}
;
const Is = -1;
let $p = class {
    constructor() {
        this.onItemSelectedChange_ = this.onItemSelectedChange_.bind(this),
        this.empty = $(!0),
        this.selectedIndex = $(Is),
        this.items_ = []
    }
    add(t, e) {
        const i = e ?? this.items_.length;
        this.items_.splice(i, 0, t),
        t.emitter.on("change", this.onItemSelectedChange_),
        this.keepSelection_()
    }
    remove(t) {
        const e = this.items_.indexOf(t);
        e < 0 || (this.items_.splice(e, 1),
        t.emitter.off("change", this.onItemSelectedChange_),
        this.keepSelection_())
    }
    keepSelection_() {
        if (this.items_.length === 0) {
            this.selectedIndex.rawValue = Is,
            this.empty.rawValue = !0;
            return
        }
        const t = this.items_.findIndex(e=>e.rawValue);
        t < 0 ? (this.items_.forEach((e,i)=>{
            e.rawValue = i === 0
        }
        ),
        this.selectedIndex.rawValue = 0) : (this.items_.forEach((e,i)=>{
            e.rawValue = i === t
        }
        ),
        this.selectedIndex.rawValue = t),
        this.empty.rawValue = !1
    }
    onItemSelectedChange_(t) {
        if (t.rawValue) {
            const e = this.items_.findIndex(i=>i === t.sender);
            this.items_.forEach((i,s)=>{
                i.rawValue = s === e
            }
            ),
            this.selectedIndex.rawValue = e
        } else
            this.keepSelection_()
    }
}
;
const Ee = v("tab");
let Lp = class {
    constructor(t, e) {
        this.element = t.createElement("div"),
        this.element.classList.add(Ee(), Xr()),
        e.viewProps.bindClassModifiers(this.element),
        Q(e.empty, Dt(this.element, Ee(void 0, "nop")));
        const i = t.createElement("div");
        i.classList.add(Ee("t")),
        this.element.appendChild(i),
        this.itemsElement = i;
        const s = t.createElement("div");
        s.classList.add(Ee("i")),
        this.element.appendChild(s);
        const r = t.createElement("div");
        r.classList.add(Ee("c")),
        this.element.appendChild(r),
        this.contentsElement = r
    }
}
  , Fs = class extends Di {
    constructor(t, e) {
        const i = new $p
          , s = new Lp(t,{
            empty: i.empty,
            viewProps: e.viewProps
        });
        super({
            blade: e.blade,
            rackController: new Ri({
                blade: e.blade,
                element: s.contentsElement,
                viewProps: e.viewProps
            }),
            view: s
        }),
        this.onRackAdd_ = this.onRackAdd_.bind(this),
        this.onRackRemove_ = this.onRackRemove_.bind(this);
        const r = this.rackController.rack;
        r.emitter.on("add", this.onRackAdd_),
        r.emitter.on("remove", this.onRackRemove_),
        this.tab = i
    }
    add(t, e) {
        this.rackController.rack.add(t, e)
    }
    remove(t) {
        this.rackController.rack.remove(this.rackController.rack.children[t])
    }
    onRackAdd_(t) {
        if (!t.root)
            return;
        const e = t.bladeController;
        Kr(this.view.itemsElement, e.itemController.view.element, t.index),
        e.itemController.viewProps.set("parent", this.viewProps),
        this.tab.add(e.props.value("selected"))
    }
    onRackRemove_(t) {
        if (!t.root)
            return;
        const e = t.bladeController;
        Mi(e.itemController.view.element),
        e.itemController.viewProps.set("parent", null),
        this.tab.remove(e.props.value("selected"))
    }
}
;
M({
    id: "tab",
    type: "blade",
    accept(n) {
        const t = L(n, e=>({
            pages: e.required.array(e.required.object({
                title: e.required.string
            })),
            view: e.required.constant("tab")
        }));
        return !t || t.pages.length === 0 ? null : {
            params: t
        }
    },
    controller(n) {
        const t = new Fs(n.document,{
            blade: n.blade,
            viewProps: n.viewProps
        });
        return n.params.pages.forEach(e=>{
            const i = new ai(n.document,{
                blade: Wr(),
                itemProps: m.fromObject({
                    selected: !1,
                    title: e.title
                }),
                props: m.fromObject({
                    selected: !1
                }),
                viewProps: Ht.create()
            });
            t.add(i)
        }
        ),
        t
    },
    api(n) {
        return n.controller instanceof Fs ? new Vp(n.controller,n.pool) : n.controller instanceof ai ? new Sp(n.controller,n.pool) : null
    }
});
let Bi = class extends Li {
    get options() {
        return this.controller.valueController.props.get("options")
    }
    set options(t) {
        this.controller.valueController.props.set("options", t)
    }
}
  , Mp = class {
    constructor() {
        this.disabled = !1,
        this.emitter = new j
    }
    dispose() {}
    tick() {
        this.disabled || this.emitter.emit("tick", {
            sender: this
        })
    }
}
  , Tp = class {
    constructor(t, e) {
        this.disabled_ = !1,
        this.timerId_ = null,
        this.onTick_ = this.onTick_.bind(this),
        this.doc_ = t,
        this.emitter = new j,
        this.interval_ = e,
        this.setTimer_()
    }
    get disabled() {
        return this.disabled_
    }
    set disabled(t) {
        this.disabled_ = t,
        this.disabled_ ? this.clearTimer_() : this.setTimer_()
    }
    dispose() {
        this.clearTimer_()
    }
    clearTimer_() {
        if (this.timerId_ === null)
            return;
        const t = this.doc_.defaultView;
        t && t.clearInterval(this.timerId_),
        this.timerId_ = null
    }
    setTimer_() {
        if (this.clearTimer_(),
        this.interval_ <= 0)
            return;
        const t = this.doc_.defaultView;
        t && (this.timerId_ = t.setInterval(this.onTick_, this.interval_))
    }
    onTick_() {
        this.disabled_ || this.emitter.emit("tick", {
            sender: this
        })
    }
}
  , ve = class {
    constructor(t) {
        this.constraints = t
    }
    constrain(t) {
        return this.constraints.reduce((e,i)=>i.constrain(e), t)
    }
}
;
function De(n, t) {
    if (n instanceof t)
        return n;
    if (n instanceof ve) {
        const e = n.constraints.reduce((i,s)=>i || (s instanceof t ? s : null), null);
        if (e)
            return e
    }
    return null
}
let $n = class {
    constructor(t) {
        this.values = m.fromObject({
            options: t
        })
    }
    constrain(t) {
        const e = this.values.get("options");
        return e.length === 0 || e.filter(s=>s.value === t).length > 0 ? t : e[0].value
    }
}
;
function Ln(n) {
    var t;
    const e = ri;
    if (Array.isArray(n))
        return (t = L({
            items: n
        }, i=>({
            items: i.required.array(i.required.object({
                text: i.required.string,
                value: i.required.raw
            }))
        }))) === null || t === void 0 ? void 0 : t.items;
    if (typeof n == "object")
        return e.required.raw(n).value
}
function Jr(n) {
    if (Array.isArray(n))
        return n;
    const t = [];
    return Object.keys(n).forEach(e=>{
        t.push({
            text: e,
            value: n[e]
        })
    }
    ),
    t
}
function ji(n) {
    return y(n) ? null : new $n(Jr(n))
}
const Nn = v("lst");
let Ap = class {
    constructor(t, e) {
        this.onValueChange_ = this.onValueChange_.bind(this),
        this.props_ = e.props,
        this.element = t.createElement("div"),
        this.element.classList.add(Nn()),
        e.viewProps.bindClassModifiers(this.element);
        const i = t.createElement("select");
        i.classList.add(Nn("s")),
        e.viewProps.bindDisabled(i),
        this.element.appendChild(i),
        this.selectElement = i;
        const s = t.createElement("div");
        s.classList.add(Nn("m")),
        s.appendChild(En(t, "dropdown")),
        this.element.appendChild(s),
        e.value.emitter.on("change", this.onValueChange_),
        this.value_ = e.value,
        tt(this.props_, "options", r=>{
            Ur(this.selectElement),
            r.forEach(o=>{
                const a = t.createElement("option");
                a.textContent = o.text,
                this.selectElement.appendChild(a)
            }
            ),
            this.update_()
        }
        )
    }
    update_() {
        const t = this.props_.get("options").map(e=>e.value);
        this.selectElement.selectedIndex = t.indexOf(this.value_.rawValue)
    }
    onValueChange_() {
        this.update_()
    }
}
  , ue = class {
    constructor(t, e) {
        this.onSelectChange_ = this.onSelectChange_.bind(this),
        this.props = e.props,
        this.value = e.value,
        this.viewProps = e.viewProps,
        this.view = new Ap(t,{
            props: this.props,
            value: this.value,
            viewProps: this.viewProps
        }),
        this.view.selectElement.addEventListener("change", this.onSelectChange_)
    }
    onSelectChange_(t) {
        const e = t.currentTarget;
        this.value.rawValue = this.props.get("options")[e.selectedIndex].value
    }
    importProps(t) {
        return it(t, null, e=>({
            options: e.required.custom(Ln)
        }), e=>(this.props.set("options", Jr(e.options)),
        !0))
    }
    exportProps() {
        return st(null, {
            options: this.props.get("options")
        })
    }
}
;
const zs = v("pop");
let Op = class {
    constructor(t, e) {
        this.element = t.createElement("div"),
        this.element.classList.add(zs()),
        e.viewProps.bindClassModifiers(this.element),
        Q(e.shows, Dt(this.element, zs(void 0, "v")))
    }
}
  , Ni = class {
    constructor(t, e) {
        this.shows = $(!1),
        this.viewProps = e.viewProps,
        this.view = new Op(t,{
            shows: this.shows,
            viewProps: this.viewProps
        })
    }
}
;
const Ks = v("txt");
let Dp = class {
    constructor(t, e) {
        this.onChange_ = this.onChange_.bind(this),
        this.element = t.createElement("div"),
        this.element.classList.add(Ks()),
        e.viewProps.bindClassModifiers(this.element),
        this.props_ = e.props,
        this.props_.emitter.on("change", this.onChange_);
        const i = t.createElement("input");
        i.classList.add(Ks("i")),
        i.type = "text",
        e.viewProps.bindDisabled(i),
        this.element.appendChild(i),
        this.inputElement = i,
        e.value.emitter.on("change", this.onChange_),
        this.value_ = e.value,
        this.refresh()
    }
    refresh() {
        const t = this.props_.get("formatter");
        this.inputElement.value = t(this.value_.rawValue)
    }
    onChange_() {
        this.refresh()
    }
}
  , Mn = class {
    constructor(t, e) {
        this.onInputChange_ = this.onInputChange_.bind(this),
        this.parser_ = e.parser,
        this.props = e.props,
        this.value = e.value,
        this.viewProps = e.viewProps,
        this.view = new Dp(t,{
            props: e.props,
            value: this.value,
            viewProps: this.viewProps
        }),
        this.view.inputElement.addEventListener("change", this.onInputChange_)
    }
    onInputChange_(t) {
        const i = t.currentTarget.value
          , s = this.parser_(i);
        y(s) || (this.value.rawValue = s),
        this.view.refresh()
    }
}
;
function Rp(n) {
    return String(n)
}
function Ii(n) {
    return n === "false" ? !1 : !!n
}
function Us(n) {
    return Rp(n)
}
function Bp(n) {
    return t=>n.reduce((e,i)=>e !== null ? e : i(t), null)
}
const jp = R(0);
function vn(n) {
    return jp(n) + "%"
}
function Fi(n) {
    return String(n)
}
function li(n) {
    return n
}
function Qt({primary: n, secondary: t, forward: e, backward: i}) {
    let s = !1;
    function r(o) {
        s || (s = !0,
        o(),
        s = !1)
    }
    n.emitter.on("change", o=>{
        r(()=>{
            t.setRawValue(e(n.rawValue, t.rawValue), o.options)
        }
        )
    }
    ),
    t.emitter.on("change", o=>{
        r(()=>{
            n.setRawValue(i(n.rawValue, t.rawValue), o.options)
        }
        ),
        r(()=>{
            t.setRawValue(e(n.rawValue, t.rawValue), o.options)
        }
        )
    }
    ),
    r(()=>{
        t.setRawValue(e(n.rawValue, t.rawValue), {
            forceEmit: !1,
            last: !0
        })
    }
    )
}
function D(n, t) {
    const e = n * (t.altKey ? .1 : 1) * (t.shiftKey ? 10 : 1);
    return t.upKey ? +e : t.downKey ? -e : 0
}
function qt(n) {
    return {
        altKey: n.altKey,
        downKey: n.key === "ArrowDown",
        shiftKey: n.shiftKey,
        upKey: n.key === "ArrowUp"
    }
}
function nt(n) {
    return {
        altKey: n.altKey,
        downKey: n.key === "ArrowLeft",
        shiftKey: n.shiftKey,
        upKey: n.key === "ArrowRight"
    }
}
function Np(n) {
    return n === "ArrowUp" || n === "ArrowDown"
}
function bn(n) {
    return Np(n) || n === "ArrowLeft" || n === "ArrowRight"
}
function In(n, t) {
    var e, i;
    const s = t.ownerDocument.defaultView
      , r = t.getBoundingClientRect();
    return {
        x: n.pageX - (((e = s && s.scrollX) !== null && e !== void 0 ? e : 0) + r.left),
        y: n.pageY - (((i = s && s.scrollY) !== null && i !== void 0 ? i : 0) + r.top)
    }
}
let gt = class {
    constructor(t) {
        this.lastTouch_ = null,
        this.onDocumentMouseMove_ = this.onDocumentMouseMove_.bind(this),
        this.onDocumentMouseUp_ = this.onDocumentMouseUp_.bind(this),
        this.onMouseDown_ = this.onMouseDown_.bind(this),
        this.onTouchEnd_ = this.onTouchEnd_.bind(this),
        this.onTouchMove_ = this.onTouchMove_.bind(this),
        this.onTouchStart_ = this.onTouchStart_.bind(this),
        this.elem_ = t,
        this.emitter = new j,
        t.addEventListener("touchstart", this.onTouchStart_, {
            passive: !1
        }),
        t.addEventListener("touchmove", this.onTouchMove_, {
            passive: !0
        }),
        t.addEventListener("touchend", this.onTouchEnd_),
        t.addEventListener("mousedown", this.onMouseDown_)
    }
    computePosition_(t) {
        const e = this.elem_.getBoundingClientRect();
        return {
            bounds: {
                width: e.width,
                height: e.height
            },
            point: t ? {
                x: t.x,
                y: t.y
            } : null
        }
    }
    onMouseDown_(t) {
        var e;
        t.preventDefault(),
        (e = t.currentTarget) === null || e === void 0 || e.focus();
        const i = this.elem_.ownerDocument;
        i.addEventListener("mousemove", this.onDocumentMouseMove_),
        i.addEventListener("mouseup", this.onDocumentMouseUp_),
        this.emitter.emit("down", {
            altKey: t.altKey,
            data: this.computePosition_(In(t, this.elem_)),
            sender: this,
            shiftKey: t.shiftKey
        })
    }
    onDocumentMouseMove_(t) {
        this.emitter.emit("move", {
            altKey: t.altKey,
            data: this.computePosition_(In(t, this.elem_)),
            sender: this,
            shiftKey: t.shiftKey
        })
    }
    onDocumentMouseUp_(t) {
        const e = this.elem_.ownerDocument;
        e.removeEventListener("mousemove", this.onDocumentMouseMove_),
        e.removeEventListener("mouseup", this.onDocumentMouseUp_),
        this.emitter.emit("up", {
            altKey: t.altKey,
            data: this.computePosition_(In(t, this.elem_)),
            sender: this,
            shiftKey: t.shiftKey
        })
    }
    onTouchStart_(t) {
        t.preventDefault();
        const e = t.targetTouches.item(0)
          , i = this.elem_.getBoundingClientRect();
        this.emitter.emit("down", {
            altKey: t.altKey,
            data: this.computePosition_(e ? {
                x: e.clientX - i.left,
                y: e.clientY - i.top
            } : void 0),
            sender: this,
            shiftKey: t.shiftKey
        }),
        this.lastTouch_ = e
    }
    onTouchMove_(t) {
        const e = t.targetTouches.item(0)
          , i = this.elem_.getBoundingClientRect();
        this.emitter.emit("move", {
            altKey: t.altKey,
            data: this.computePosition_(e ? {
                x: e.clientX - i.left,
                y: e.clientY - i.top
            } : void 0),
            sender: this,
            shiftKey: t.shiftKey
        }),
        this.lastTouch_ = e
    }
    onTouchEnd_(t) {
        var e;
        const i = (e = t.targetTouches.item(0)) !== null && e !== void 0 ? e : this.lastTouch_
          , s = this.elem_.getBoundingClientRect();
        this.emitter.emit("up", {
            altKey: t.altKey,
            data: this.computePosition_(i ? {
                x: i.clientX - s.left,
                y: i.clientY - s.top
            } : void 0),
            sender: this,
            shiftKey: t.shiftKey
        })
    }
}
;
const W = v("txt");
let Ip = class {
    constructor(t, e) {
        this.onChange_ = this.onChange_.bind(this),
        this.props_ = e.props,
        this.props_.emitter.on("change", this.onChange_),
        this.element = t.createElement("div"),
        this.element.classList.add(W(), W(void 0, "num")),
        e.arrayPosition && this.element.classList.add(W(void 0, e.arrayPosition)),
        e.viewProps.bindClassModifiers(this.element);
        const i = t.createElement("input");
        i.classList.add(W("i")),
        i.type = "text",
        e.viewProps.bindDisabled(i),
        this.element.appendChild(i),
        this.inputElement = i,
        this.onDraggingChange_ = this.onDraggingChange_.bind(this),
        this.dragging_ = e.dragging,
        this.dragging_.emitter.on("change", this.onDraggingChange_),
        this.element.classList.add(W()),
        this.inputElement.classList.add(W("i"));
        const s = t.createElement("div");
        s.classList.add(W("k")),
        this.element.appendChild(s),
        this.knobElement = s;
        const r = t.createElementNS(O, "svg");
        r.classList.add(W("g")),
        this.knobElement.appendChild(r);
        const o = t.createElementNS(O, "path");
        o.classList.add(W("gb")),
        r.appendChild(o),
        this.guideBodyElem_ = o;
        const a = t.createElementNS(O, "path");
        a.classList.add(W("gh")),
        r.appendChild(a),
        this.guideHeadElem_ = a;
        const l = t.createElement("div");
        l.classList.add(v("tt")()),
        this.knobElement.appendChild(l),
        this.tooltipElem_ = l,
        e.value.emitter.on("change", this.onChange_),
        this.value = e.value,
        this.refresh()
    }
    onDraggingChange_(t) {
        if (t.rawValue === null) {
            this.element.classList.remove(W(void 0, "drg"));
            return
        }
        this.element.classList.add(W(void 0, "drg"));
        const e = t.rawValue / this.props_.get("pointerScale")
          , i = e + (e > 0 ? -1 : e < 0 ? 1 : 0)
          , s = k(-i, -4, 4);
        this.guideHeadElem_.setAttributeNS(null, "d", [`M ${i + s},0 L${i},4 L${i + s},8`, `M ${e},-1 L${e},9`].join(" ")),
        this.guideBodyElem_.setAttributeNS(null, "d", `M 0,4 L${e},4`);
        const r = this.props_.get("formatter");
        this.tooltipElem_.textContent = r(this.value.rawValue),
        this.tooltipElem_.style.left = `${e}px`
    }
    refresh() {
        const t = this.props_.get("formatter");
        this.inputElement.value = t(this.value.rawValue)
    }
    onChange_() {
        this.refresh()
    }
}
  , qe = class {
    constructor(t, e) {
        var i;
        this.originRawValue_ = 0,
        this.onInputChange_ = this.onInputChange_.bind(this),
        this.onInputKeyDown_ = this.onInputKeyDown_.bind(this),
        this.onInputKeyUp_ = this.onInputKeyUp_.bind(this),
        this.onPointerDown_ = this.onPointerDown_.bind(this),
        this.onPointerMove_ = this.onPointerMove_.bind(this),
        this.onPointerUp_ = this.onPointerUp_.bind(this),
        this.parser_ = e.parser,
        this.props = e.props,
        this.sliderProps_ = (i = e.sliderProps) !== null && i !== void 0 ? i : null,
        this.value = e.value,
        this.viewProps = e.viewProps,
        this.dragging_ = $(null),
        this.view = new Ip(t,{
            arrayPosition: e.arrayPosition,
            dragging: this.dragging_,
            props: this.props,
            value: this.value,
            viewProps: this.viewProps
        }),
        this.view.inputElement.addEventListener("change", this.onInputChange_),
        this.view.inputElement.addEventListener("keydown", this.onInputKeyDown_),
        this.view.inputElement.addEventListener("keyup", this.onInputKeyUp_);
        const s = new gt(this.view.knobElement);
        s.emitter.on("down", this.onPointerDown_),
        s.emitter.on("move", this.onPointerMove_),
        s.emitter.on("up", this.onPointerUp_)
    }
    constrainValue_(t) {
        var e, i;
        const s = (e = this.sliderProps_) === null || e === void 0 ? void 0 : e.get("min")
          , r = (i = this.sliderProps_) === null || i === void 0 ? void 0 : i.get("max");
        let o = t;
        return s !== void 0 && (o = Math.max(o, s)),
        r !== void 0 && (o = Math.min(o, r)),
        o
    }
    onInputChange_(t) {
        const i = t.currentTarget.value
          , s = this.parser_(i);
        y(s) || (this.value.rawValue = this.constrainValue_(s)),
        this.view.refresh()
    }
    onInputKeyDown_(t) {
        const e = D(this.props.get("keyScale"), qt(t));
        e !== 0 && this.value.setRawValue(this.constrainValue_(this.value.rawValue + e), {
            forceEmit: !1,
            last: !1
        })
    }
    onInputKeyUp_(t) {
        D(this.props.get("keyScale"), qt(t)) !== 0 && this.value.setRawValue(this.value.rawValue, {
            forceEmit: !0,
            last: !0
        })
    }
    onPointerDown_() {
        this.originRawValue_ = this.value.rawValue,
        this.dragging_.rawValue = 0
    }
    computeDraggingValue_(t) {
        if (!t.point)
            return null;
        const e = t.point.x - t.bounds.width / 2;
        return this.constrainValue_(this.originRawValue_ + e * this.props.get("pointerScale"))
    }
    onPointerMove_(t) {
        const e = this.computeDraggingValue_(t.data);
        e !== null && (this.value.setRawValue(e, {
            forceEmit: !1,
            last: !1
        }),
        this.dragging_.rawValue = this.value.rawValue - this.originRawValue_)
    }
    onPointerUp_(t) {
        const e = this.computeDraggingValue_(t.data);
        e !== null && (this.value.setRawValue(e, {
            forceEmit: !0,
            last: !0
        }),
        this.dragging_.rawValue = null)
    }
}
;
const Fn = v("sld");
let Fp = class {
    constructor(t, e) {
        this.onChange_ = this.onChange_.bind(this),
        this.props_ = e.props,
        this.props_.emitter.on("change", this.onChange_),
        this.element = t.createElement("div"),
        this.element.classList.add(Fn()),
        e.viewProps.bindClassModifiers(this.element);
        const i = t.createElement("div");
        i.classList.add(Fn("t")),
        e.viewProps.bindTabIndex(i),
        this.element.appendChild(i),
        this.trackElement = i;
        const s = t.createElement("div");
        s.classList.add(Fn("k")),
        this.trackElement.appendChild(s),
        this.knobElement = s,
        e.value.emitter.on("change", this.onChange_),
        this.value = e.value,
        this.update_()
    }
    update_() {
        const t = k(d(this.value.rawValue, this.props_.get("min"), this.props_.get("max"), 0, 100), 0, 100);
        this.knobElement.style.width = `${t}%`
    }
    onChange_() {
        this.update_()
    }
}
  , zp = class {
    constructor(t, e) {
        this.onKeyDown_ = this.onKeyDown_.bind(this),
        this.onKeyUp_ = this.onKeyUp_.bind(this),
        this.onPointerDownOrMove_ = this.onPointerDownOrMove_.bind(this),
        this.onPointerUp_ = this.onPointerUp_.bind(this),
        this.value = e.value,
        this.viewProps = e.viewProps,
        this.props = e.props,
        this.view = new Fp(t,{
            props: this.props,
            value: this.value,
            viewProps: this.viewProps
        }),
        this.ptHandler_ = new gt(this.view.trackElement),
        this.ptHandler_.emitter.on("down", this.onPointerDownOrMove_),
        this.ptHandler_.emitter.on("move", this.onPointerDownOrMove_),
        this.ptHandler_.emitter.on("up", this.onPointerUp_),
        this.view.trackElement.addEventListener("keydown", this.onKeyDown_),
        this.view.trackElement.addEventListener("keyup", this.onKeyUp_)
    }
    handlePointerEvent_(t, e) {
        t.point && this.value.setRawValue(d(k(t.point.x, 0, t.bounds.width), 0, t.bounds.width, this.props.get("min"), this.props.get("max")), e)
    }
    onPointerDownOrMove_(t) {
        this.handlePointerEvent_(t.data, {
            forceEmit: !1,
            last: !1
        })
    }
    onPointerUp_(t) {
        this.handlePointerEvent_(t.data, {
            forceEmit: !0,
            last: !0
        })
    }
    onKeyDown_(t) {
        const e = D(this.props.get("keyScale"), nt(t));
        e !== 0 && this.value.setRawValue(this.value.rawValue + e, {
            forceEmit: !1,
            last: !1
        })
    }
    onKeyUp_(t) {
        D(this.props.get("keyScale"), nt(t)) !== 0 && this.value.setRawValue(this.value.rawValue, {
            forceEmit: !0,
            last: !0
        })
    }
}
;
const zn = v("sldtxt");
let Kp = class {
    constructor(t, e) {
        this.element = t.createElement("div"),
        this.element.classList.add(zn());
        const i = t.createElement("div");
        i.classList.add(zn("s")),
        this.sliderView_ = e.sliderView,
        i.appendChild(this.sliderView_.element),
        this.element.appendChild(i);
        const s = t.createElement("div");
        s.classList.add(zn("t")),
        this.textView_ = e.textView,
        s.appendChild(this.textView_.element),
        this.element.appendChild(s)
    }
}
  , Hs = class {
    constructor(t, e) {
        this.value = e.value,
        this.viewProps = e.viewProps,
        this.sliderC_ = new zp(t,{
            props: e.sliderProps,
            value: e.value,
            viewProps: this.viewProps
        }),
        this.textC_ = new qe(t,{
            parser: e.parser,
            props: e.textProps,
            sliderProps: e.sliderProps,
            value: e.value,
            viewProps: e.viewProps
        }),
        this.view = new Kp(t,{
            sliderView: this.sliderC_.view,
            textView: this.textC_.view
        })
    }
    get sliderController() {
        return this.sliderC_
    }
    get textController() {
        return this.textC_
    }
    importProps(t) {
        return it(t, null, e=>({
            max: e.required.number,
            min: e.required.number
        }), e=>{
            const i = this.sliderC_.props;
            return i.set("max", e.max),
            i.set("min", e.min),
            !0
        }
        )
    }
    exportProps() {
        const t = this.sliderC_.props;
        return st(null, {
            max: t.get("max"),
            min: t.get("min")
        })
    }
}
;
function Up(n) {
    return {
        sliderProps: new m({
            keyScale: n.keyScale,
            max: n.max,
            min: n.min
        }),
        textProps: new m({
            formatter: $(n.formatter),
            keyScale: n.keyScale,
            pointerScale: $(n.pointerScale)
        })
    }
}
const Hp = {
    containerUnitSize: "cnt-usz"
};
function Qr(n) {
    return `--${Hp[n]}`
}
class to {
    constructor(t, e) {
        const i = v(e.viewName);
        this.element = t.createElement("div"),
        this.element.classList.add(i()),
        e.viewProps.bindClassModifiers(this.element)
    }
}
function Re(n) {
    return Si(n)
}
function $t(n) {
    if (si(n))
        return L(n, Re)
}
function mt(n, t) {
    if (!n)
        return;
    const e = []
      , i = Ei(n, t);
    i && e.push(i);
    const s = ki(n);
    return s && e.push(s),
    new ve(e)
}
function eo(n) {
    if (n === "inline" || n === "popup")
        return n
}
function Rt(n, t) {
    n.write(t)
}
const on = v("ckb");
let qp = class {
    constructor(t, e) {
        this.onValueChange_ = this.onValueChange_.bind(this),
        this.element = t.createElement("div"),
        this.element.classList.add(on()),
        e.viewProps.bindClassModifiers(this.element);
        const i = t.createElement("label");
        i.classList.add(on("l")),
        this.element.appendChild(i);
        const s = t.createElement("input");
        s.classList.add(on("i")),
        s.type = "checkbox",
        i.appendChild(s),
        this.inputElement = s,
        e.viewProps.bindDisabled(this.inputElement);
        const r = t.createElement("div");
        r.classList.add(on("w")),
        i.appendChild(r);
        const o = En(t, "check");
        r.appendChild(o),
        e.value.emitter.on("change", this.onValueChange_),
        this.value = e.value,
        this.update_()
    }
    update_() {
        this.inputElement.checked = this.value.rawValue
    }
    onValueChange_() {
        this.update_()
    }
}
  , Gp = class {
    constructor(t, e) {
        this.onInputChange_ = this.onInputChange_.bind(this),
        this.value = e.value,
        this.viewProps = e.viewProps,
        this.view = new qp(t,{
            value: this.value,
            viewProps: this.viewProps
        }),
        this.view.inputElement.addEventListener("change", this.onInputChange_)
    }
    onInputChange_(t) {
        const e = t.currentTarget;
        this.value.rawValue = e.checked
    }
}
;
function Wp(n) {
    const t = []
      , e = ji(n.options);
    return e && t.push(e),
    new ve(t)
}
M({
    id: "input-bool",
    type: "input",
    accept: (n,t)=>{
        if (typeof n != "boolean")
            return null;
        const e = L(t, i=>({
            options: i.optional.custom(Ln),
            readonly: i.optional.constant(!1)
        }));
        return e ? {
            initialValue: n,
            params: e
        } : null
    }
    ,
    binding: {
        reader: n=>Ii,
        constraint: n=>Wp(n.params),
        writer: n=>Rt
    },
    controller: n=>{
        const t = n.document
          , e = n.value
          , i = n.constraint
          , s = i && De(i, $n);
        return s ? new ue(t,{
            props: new m({
                options: s.values.value("options")
            }),
            value: e,
            viewProps: n.viewProps
        }) : new Gp(t,{
            value: e,
            viewProps: n.viewProps
        })
    }
    ,
    api(n) {
        return typeof n.controller.value.rawValue != "boolean" ? null : n.controller.valueController instanceof ue ? new Bi(n.controller) : null
    }
});
const jt = v("col");
let Yp = class {
    constructor(t, e) {
        this.element = t.createElement("div"),
        this.element.classList.add(jt()),
        e.foldable.bindExpandedClass(this.element, jt(void 0, "expanded")),
        tt(e.foldable, "completed", Dt(this.element, jt(void 0, "cpl")));
        const i = t.createElement("div");
        i.classList.add(jt("h")),
        this.element.appendChild(i);
        const s = t.createElement("div");
        s.classList.add(jt("s")),
        i.appendChild(s),
        this.swatchElement = s;
        const r = t.createElement("div");
        if (r.classList.add(jt("t")),
        i.appendChild(r),
        this.textElement = r,
        e.pickerLayout === "inline") {
            const o = t.createElement("div");
            o.classList.add(jt("p")),
            this.element.appendChild(o),
            this.pickerElement = o
        } else
            this.pickerElement = null
    }
}
;
function Xp(n, t, e) {
    const i = k(n / 255, 0, 1)
      , s = k(t / 255, 0, 1)
      , r = k(e / 255, 0, 1)
      , o = Math.max(i, s, r)
      , a = Math.min(i, s, r)
      , l = o - a;
    let p = 0
      , h = 0;
    const u = (a + o) / 2;
    return l !== 0 && (h = l / (1 - Math.abs(o + a - 1)),
    i === o ? p = (s - r) / l : s === o ? p = 2 + (r - i) / l : p = 4 + (i - s) / l,
    p = p / 6 + (p < 0 ? 1 : 0)),
    [p * 360, h * 100, u * 100]
}
function Zp(n, t, e) {
    const i = (n % 360 + 360) % 360
      , s = k(t / 100, 0, 1)
      , r = k(e / 100, 0, 1)
      , o = (1 - Math.abs(2 * r - 1)) * s
      , a = o * (1 - Math.abs(i / 60 % 2 - 1))
      , l = r - o / 2;
    let p, h, u;
    return i >= 0 && i < 60 ? [p,h,u] = [o, a, 0] : i >= 60 && i < 120 ? [p,h,u] = [a, o, 0] : i >= 120 && i < 180 ? [p,h,u] = [0, o, a] : i >= 180 && i < 240 ? [p,h,u] = [0, a, o] : i >= 240 && i < 300 ? [p,h,u] = [a, 0, o] : [p,h,u] = [o, 0, a],
    [(p + l) * 255, (h + l) * 255, (u + l) * 255]
}
function Jp(n, t, e) {
    const i = k(n / 255, 0, 1)
      , s = k(t / 255, 0, 1)
      , r = k(e / 255, 0, 1)
      , o = Math.max(i, s, r)
      , a = Math.min(i, s, r)
      , l = o - a;
    let p;
    l === 0 ? p = 0 : o === i ? p = 60 * (((s - r) / l % 6 + 6) % 6) : o === s ? p = 60 * ((r - i) / l + 2) : p = 60 * ((i - s) / l + 4);
    const h = o === 0 ? 0 : l / o
      , u = o;
    return [p, h * 100, u * 100]
}
function no(n, t, e) {
    const i = Fr(n, 360)
      , s = k(t / 100, 0, 1)
      , r = k(e / 100, 0, 1)
      , o = r * s
      , a = o * (1 - Math.abs(i / 60 % 2 - 1))
      , l = r - o;
    let p, h, u;
    return i >= 0 && i < 60 ? [p,h,u] = [o, a, 0] : i >= 60 && i < 120 ? [p,h,u] = [a, o, 0] : i >= 120 && i < 180 ? [p,h,u] = [0, o, a] : i >= 180 && i < 240 ? [p,h,u] = [0, a, o] : i >= 240 && i < 300 ? [p,h,u] = [a, 0, o] : [p,h,u] = [o, 0, a],
    [(p + l) * 255, (h + l) * 255, (u + l) * 255]
}
function Qp(n, t, e) {
    const i = e + t * (100 - Math.abs(2 * e - 100)) / 200;
    return [n, i !== 0 ? t * (100 - Math.abs(2 * e - 100)) / i : 0, e + t * (100 - Math.abs(2 * e - 100)) / (2 * 100)]
}
function tc(n, t, e) {
    const i = 100 - Math.abs(e * (200 - t) / 100 - 100);
    return [n, i !== 0 ? t * e / i : 0, e * (200 - t) / (2 * 100)]
}
function at(n) {
    return [n[0], n[1], n[2]]
}
function Tn(n, t) {
    return [n[0], n[1], n[2], t]
}
const ec = {
    hsl: {
        hsl: (n,t,e)=>[n, t, e],
        hsv: Qp,
        rgb: Zp
    },
    hsv: {
        hsl: tc,
        hsv: (n,t,e)=>[n, t, e],
        rgb: no
    },
    rgb: {
        hsl: Xp,
        hsv: Jp,
        rgb: (n,t,e)=>[n, t, e]
    }
};
function de(n, t) {
    return [t === "float" ? 1 : n === "rgb" ? 255 : 360, t === "float" ? 1 : n === "rgb" ? 255 : 100, t === "float" ? 1 : n === "rgb" ? 255 : 100]
}
function nc(n, t) {
    return n === t ? t : Fr(n, t)
}
function io(n, t, e) {
    var i;
    const s = de(t, e);
    return [t === "rgb" ? k(n[0], 0, s[0]) : nc(n[0], s[0]), k(n[1], 0, s[1]), k(n[2], 0, s[2]), k((i = n[3]) !== null && i !== void 0 ? i : 1, 0, 1)]
}
function qs(n, t, e, i) {
    const s = de(t, e)
      , r = de(t, i);
    return n.map((o,a)=>o / s[a] * r[a])
}
function so(n, t, e) {
    const i = qs(n, t.mode, t.type, "int")
      , s = ec[t.mode][e.mode](...i);
    return qs(s, e.mode, "int", e.type)
}
let g = class ro {
    static black() {
        return new ro([0, 0, 0],"rgb")
    }
    constructor(t, e) {
        this.type = "int",
        this.mode = e,
        this.comps_ = io(t, e, this.type)
    }
    getComponents(t) {
        return Tn(so(at(this.comps_), {
            mode: this.mode,
            type: this.type
        }, {
            mode: t ?? this.mode,
            type: this.type
        }), this.comps_[3])
    }
    toRgbaObject() {
        const t = this.getComponents("rgb");
        return {
            r: t[0],
            g: t[1],
            b: t[2],
            a: t[3]
        }
    }
}
;
const xt = v("colp");
let ic = class {
    constructor(t, e) {
        this.alphaViews_ = null,
        this.element = t.createElement("div"),
        this.element.classList.add(xt()),
        e.viewProps.bindClassModifiers(this.element);
        const i = t.createElement("div");
        i.classList.add(xt("hsv"));
        const s = t.createElement("div");
        s.classList.add(xt("sv")),
        this.svPaletteView_ = e.svPaletteView,
        s.appendChild(this.svPaletteView_.element),
        i.appendChild(s);
        const r = t.createElement("div");
        r.classList.add(xt("h")),
        this.hPaletteView_ = e.hPaletteView,
        r.appendChild(this.hPaletteView_.element),
        i.appendChild(r),
        this.element.appendChild(i);
        const o = t.createElement("div");
        if (o.classList.add(xt("rgb")),
        this.textsView_ = e.textsView,
        o.appendChild(this.textsView_.element),
        this.element.appendChild(o),
        e.alphaViews) {
            this.alphaViews_ = {
                palette: e.alphaViews.palette,
                text: e.alphaViews.text
            };
            const a = t.createElement("div");
            a.classList.add(xt("a"));
            const l = t.createElement("div");
            l.classList.add(xt("ap")),
            l.appendChild(this.alphaViews_.palette.element),
            a.appendChild(l);
            const p = t.createElement("div");
            p.classList.add(xt("at")),
            p.appendChild(this.alphaViews_.text.element),
            a.appendChild(p),
            this.element.appendChild(a)
        }
    }
    get allFocusableElements() {
        const t = [this.svPaletteView_.element, this.hPaletteView_.element, this.textsView_.modeSelectElement, ...this.textsView_.inputViews.map(e=>e.inputElement)];
        return this.alphaViews_ && t.push(this.alphaViews_.palette.element, this.alphaViews_.text.inputElement),
        t
    }
}
;
function sc(n) {
    return n === "int" ? "int" : n === "float" ? "float" : void 0
}
function zi(n) {
    return L(n, t=>({
        color: t.optional.object({
            alpha: t.optional.boolean,
            type: t.optional.custom(sc)
        }),
        expanded: t.optional.boolean,
        picker: t.optional.custom(eo),
        readonly: t.optional.constant(!1)
    }))
}
function Gt(n) {
    return n ? .1 : 1
}
function oo(n) {
    var t;
    return (t = n.color) === null || t === void 0 ? void 0 : t.type
}
let Ki = class {
    constructor(t, e) {
        this.type = "float",
        this.mode = e,
        this.comps_ = io(t, e, this.type)
    }
    getComponents(t) {
        return Tn(so(at(this.comps_), {
            mode: this.mode,
            type: this.type
        }, {
            mode: t ?? this.mode,
            type: this.type
        }), this.comps_[3])
    }
    toRgbaObject() {
        const t = this.getComponents("rgb");
        return {
            r: t[0],
            g: t[1],
            b: t[2],
            a: t[3]
        }
    }
}
;
const rc = {
    int: (n,t)=>new g(n,t),
    float: (n,t)=>new Ki(n,t)
};
function Ui(n, t, e) {
    return rc[e](n, t)
}
function oc(n) {
    return n.type === "float"
}
function ac(n) {
    return n.type === "int"
}
function lc(n) {
    const t = n.getComponents()
      , e = de(n.mode, "int");
    return new g([Math.round(d(t[0], 0, 1, 0, e[0])), Math.round(d(t[1], 0, 1, 0, e[1])), Math.round(d(t[2], 0, 1, 0, e[2])), t[3]],n.mode)
}
function pc(n) {
    const t = n.getComponents()
      , e = de(n.mode, "int");
    return new Ki([d(t[0], 0, e[0], 0, 1), d(t[1], 0, e[1], 0, 1), d(t[2], 0, e[2], 0, 1), t[3]],n.mode)
}
function I(n, t) {
    if (n.type === t)
        return n;
    if (ac(n) && t === "float")
        return pc(n);
    if (oc(n) && t === "int")
        return lc(n);
    throw ft.shouldNeverHappen()
}
function cc(n, t) {
    return n.alpha === t.alpha && n.mode === t.mode && n.notation === t.notation && n.type === t.type
}
function Z(n, t) {
    const e = n.match(/^(.+)%$/);
    return Math.min(e ? parseFloat(e[1]) * .01 * t : parseFloat(n), t)
}
const hc = {
    deg: n=>n,
    grad: n=>n * 360 / 400,
    rad: n=>n * 360 / (2 * Math.PI),
    turn: n=>n * 360
};
function ao(n) {
    const t = n.match(/^([0-9.]+?)(deg|grad|rad|turn)$/);
    if (!t)
        return parseFloat(n);
    const e = parseFloat(t[1])
      , i = t[2];
    return hc[i](e)
}
function lo(n) {
    const t = n.match(/^rgb\(\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
    if (!t)
        return null;
    const e = [Z(t[1], 255), Z(t[2], 255), Z(t[3], 255)];
    return isNaN(e[0]) || isNaN(e[1]) || isNaN(e[2]) ? null : e
}
function uc(n) {
    const t = lo(n);
    return t ? new g(t,"rgb") : null
}
function po(n) {
    const t = n.match(/^rgba\(\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
    if (!t)
        return null;
    const e = [Z(t[1], 255), Z(t[2], 255), Z(t[3], 255), Z(t[4], 1)];
    return isNaN(e[0]) || isNaN(e[1]) || isNaN(e[2]) || isNaN(e[3]) ? null : e
}
function dc(n) {
    const t = po(n);
    return t ? new g(t,"rgb") : null
}
function co(n) {
    const t = n.match(/^hsl\(\s*([0-9A-Fa-f.]+(?:deg|grad|rad|turn)?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
    if (!t)
        return null;
    const e = [ao(t[1]), Z(t[2], 100), Z(t[3], 100)];
    return isNaN(e[0]) || isNaN(e[1]) || isNaN(e[2]) ? null : e
}
function mc(n) {
    const t = co(n);
    return t ? new g(t,"hsl") : null
}
function ho(n) {
    const t = n.match(/^hsla\(\s*([0-9A-Fa-f.]+(?:deg|grad|rad|turn)?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
    if (!t)
        return null;
    const e = [ao(t[1]), Z(t[2], 100), Z(t[3], 100), Z(t[4], 1)];
    return isNaN(e[0]) || isNaN(e[1]) || isNaN(e[2]) || isNaN(e[3]) ? null : e
}
function vc(n) {
    const t = ho(n);
    return t ? new g(t,"hsl") : null
}
function uo(n) {
    const t = n.match(/^#([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])$/);
    if (t)
        return [parseInt(t[1] + t[1], 16), parseInt(t[2] + t[2], 16), parseInt(t[3] + t[3], 16)];
    const e = n.match(/^(?:#|0x)([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/);
    return e ? [parseInt(e[1], 16), parseInt(e[2], 16), parseInt(e[3], 16)] : null
}
function bc(n) {
    const t = uo(n);
    return t ? new g(t,"rgb") : null
}
function mo(n) {
    const t = n.match(/^#?([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])$/);
    if (t)
        return [parseInt(t[1] + t[1], 16), parseInt(t[2] + t[2], 16), parseInt(t[3] + t[3], 16), d(parseInt(t[4] + t[4], 16), 0, 255, 0, 1)];
    const e = n.match(/^(?:#|0x)?([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/);
    return e ? [parseInt(e[1], 16), parseInt(e[2], 16), parseInt(e[3], 16), d(parseInt(e[4], 16), 0, 255, 0, 1)] : null
}
function fc(n) {
    const t = mo(n);
    return t ? new g(t,"rgb") : null
}
function vo(n) {
    const t = n.match(/^\{\s*r\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*g\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*b\s*:\s*([0-9A-Fa-f.]+%?)\s*\}$/);
    if (!t)
        return null;
    const e = [parseFloat(t[1]), parseFloat(t[2]), parseFloat(t[3])];
    return isNaN(e[0]) || isNaN(e[1]) || isNaN(e[2]) ? null : e
}
function wc(n) {
    return t=>{
        const e = vo(t);
        return e ? Ui(e, "rgb", n) : null
    }
}
function bo(n) {
    const t = n.match(/^\{\s*r\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*g\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*b\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*a\s*:\s*([0-9A-Fa-f.]+%?)\s*\}$/);
    if (!t)
        return null;
    const e = [parseFloat(t[1]), parseFloat(t[2]), parseFloat(t[3]), parseFloat(t[4])];
    return isNaN(e[0]) || isNaN(e[1]) || isNaN(e[2]) || isNaN(e[3]) ? null : e
}
function _c(n) {
    return t=>{
        const e = bo(t);
        return e ? Ui(e, "rgb", n) : null
    }
}
const gc = [{
    parser: uo,
    result: {
        alpha: !1,
        mode: "rgb",
        notation: "hex"
    }
}, {
    parser: mo,
    result: {
        alpha: !0,
        mode: "rgb",
        notation: "hex"
    }
}, {
    parser: lo,
    result: {
        alpha: !1,
        mode: "rgb",
        notation: "func"
    }
}, {
    parser: po,
    result: {
        alpha: !0,
        mode: "rgb",
        notation: "func"
    }
}, {
    parser: co,
    result: {
        alpha: !1,
        mode: "hsl",
        notation: "func"
    }
}, {
    parser: ho,
    result: {
        alpha: !0,
        mode: "hsl",
        notation: "func"
    }
}, {
    parser: vo,
    result: {
        alpha: !1,
        mode: "rgb",
        notation: "object"
    }
}, {
    parser: bo,
    result: {
        alpha: !0,
        mode: "rgb",
        notation: "object"
    }
}];
function Cc(n) {
    return gc.reduce((t,{parser: e, result: i})=>t || (e(n) ? i : null), null)
}
function xc(n, t="int") {
    const e = Cc(n);
    return e ? e.notation === "hex" && t !== "float" ? Object.assign(Object.assign({}, e), {
        type: "int"
    }) : e.notation === "func" ? Object.assign(Object.assign({}, e), {
        type: t
    }) : null : null
}
function Ge(n) {
    const t = [bc, fc, uc, dc, mc, vc];
    t.push(wc("int"), _c("int"));
    const e = Bp(t);
    return i=>{
        const s = e(i);
        return s ? I(s, n) : null
    }
}
function Pc(n) {
    const t = Ge("int");
    if (typeof n != "string")
        return g.black();
    const e = t(n);
    return e ?? g.black()
}
function fo(n) {
    const t = k(Math.floor(n), 0, 255).toString(16);
    return t.length === 1 ? `0${t}` : t
}
function Hi(n, t="#") {
    const e = at(n.getComponents("rgb")).map(fo).join("");
    return `${t}${e}`
}
function qi(n, t="#") {
    const e = n.getComponents("rgb")
      , i = [e[0], e[1], e[2], e[3] * 255].map(fo).join("");
    return `${t}${i}`
}
function wo(n) {
    const t = R(0)
      , e = I(n, "int");
    return `rgb(${at(e.getComponents("rgb")).map(s=>t(s)).join(", ")})`
}
function pn(n) {
    const t = R(2)
      , e = R(0);
    return `rgba(${I(n, "int").getComponents("rgb").map((r,o)=>(o === 3 ? t : e)(r)).join(", ")})`
}
function yc(n) {
    const t = [R(0), vn, vn]
      , e = I(n, "int");
    return `hsl(${at(e.getComponents("hsl")).map((s,r)=>t[r](s)).join(", ")})`
}
function Ec(n) {
    const t = [R(0), vn, vn, R(2)];
    return `hsla(${I(n, "int").getComponents("hsl").map((s,r)=>t[r](s)).join(", ")})`
}
function _o(n, t) {
    const e = R(t === "float" ? 2 : 0)
      , i = ["r", "g", "b"]
      , s = I(n, t);
    return `{${at(s.getComponents("rgb")).map((o,a)=>`${i[a]}: ${e(o)}`).join(", ")}}`
}
function kc(n) {
    return t=>_o(t, n)
}
function go(n, t) {
    const e = R(2)
      , i = R(t === "float" ? 2 : 0)
      , s = ["r", "g", "b", "a"];
    return `{${I(n, t).getComponents("rgb").map((a,l)=>{
        const p = l === 3 ? e : i;
        return `${s[l]}: ${p(a)}`
    }
    ).join(", ")}}`
}
function Vc(n) {
    return t=>go(t, n)
}
const Sc = [{
    format: {
        alpha: !1,
        mode: "rgb",
        notation: "hex",
        type: "int"
    },
    stringifier: Hi
}, {
    format: {
        alpha: !0,
        mode: "rgb",
        notation: "hex",
        type: "int"
    },
    stringifier: qi
}, {
    format: {
        alpha: !1,
        mode: "rgb",
        notation: "func",
        type: "int"
    },
    stringifier: wo
}, {
    format: {
        alpha: !0,
        mode: "rgb",
        notation: "func",
        type: "int"
    },
    stringifier: pn
}, {
    format: {
        alpha: !1,
        mode: "hsl",
        notation: "func",
        type: "int"
    },
    stringifier: yc
}, {
    format: {
        alpha: !0,
        mode: "hsl",
        notation: "func",
        type: "int"
    },
    stringifier: Ec
}, ...["int", "float"].reduce((n,t)=>[...n, {
    format: {
        alpha: !1,
        mode: "rgb",
        notation: "object",
        type: t
    },
    stringifier: kc(t)
}, {
    format: {
        alpha: !0,
        mode: "rgb",
        notation: "object",
        type: t
    },
    stringifier: Vc(t)
}], [])];
function Co(n) {
    return Sc.reduce((t,e)=>t || (cc(e.format, n) ? e.stringifier : null), null)
}
const ke = v("apl");
let $c = class {
    constructor(t, e) {
        this.onValueChange_ = this.onValueChange_.bind(this),
        this.value = e.value,
        this.value.emitter.on("change", this.onValueChange_),
        this.element = t.createElement("div"),
        this.element.classList.add(ke()),
        e.viewProps.bindClassModifiers(this.element),
        e.viewProps.bindTabIndex(this.element);
        const i = t.createElement("div");
        i.classList.add(ke("b")),
        this.element.appendChild(i);
        const s = t.createElement("div");
        s.classList.add(ke("c")),
        i.appendChild(s),
        this.colorElem_ = s;
        const r = t.createElement("div");
        r.classList.add(ke("m")),
        this.element.appendChild(r),
        this.markerElem_ = r;
        const o = t.createElement("div");
        o.classList.add(ke("p")),
        this.markerElem_.appendChild(o),
        this.previewElem_ = o,
        this.update_()
    }
    update_() {
        const t = this.value.rawValue
          , e = t.getComponents("rgb")
          , i = new g([e[0], e[1], e[2], 0],"rgb")
          , s = new g([e[0], e[1], e[2], 255],"rgb")
          , r = ["to right", pn(i), pn(s)];
        this.colorElem_.style.background = `linear-gradient(${r.join(",")})`,
        this.previewElem_.style.backgroundColor = pn(t);
        const o = d(e[3], 0, 1, 0, 100);
        this.markerElem_.style.left = `${o}%`
    }
    onValueChange_() {
        this.update_()
    }
}
  , Lc = class {
    constructor(t, e) {
        this.onKeyDown_ = this.onKeyDown_.bind(this),
        this.onKeyUp_ = this.onKeyUp_.bind(this),
        this.onPointerDown_ = this.onPointerDown_.bind(this),
        this.onPointerMove_ = this.onPointerMove_.bind(this),
        this.onPointerUp_ = this.onPointerUp_.bind(this),
        this.value = e.value,
        this.viewProps = e.viewProps,
        this.view = new $c(t,{
            value: this.value,
            viewProps: this.viewProps
        }),
        this.ptHandler_ = new gt(this.view.element),
        this.ptHandler_.emitter.on("down", this.onPointerDown_),
        this.ptHandler_.emitter.on("move", this.onPointerMove_),
        this.ptHandler_.emitter.on("up", this.onPointerUp_),
        this.view.element.addEventListener("keydown", this.onKeyDown_),
        this.view.element.addEventListener("keyup", this.onKeyUp_)
    }
    handlePointerEvent_(t, e) {
        if (!t.point)
            return;
        const i = t.point.x / t.bounds.width
          , s = this.value.rawValue
          , [r,o,a] = s.getComponents("hsv");
        this.value.setRawValue(new g([r, o, a, i],"hsv"), e)
    }
    onPointerDown_(t) {
        this.handlePointerEvent_(t.data, {
            forceEmit: !1,
            last: !1
        })
    }
    onPointerMove_(t) {
        this.handlePointerEvent_(t.data, {
            forceEmit: !1,
            last: !1
        })
    }
    onPointerUp_(t) {
        this.handlePointerEvent_(t.data, {
            forceEmit: !0,
            last: !0
        })
    }
    onKeyDown_(t) {
        const e = D(Gt(!0), nt(t));
        if (e === 0)
            return;
        const i = this.value.rawValue
          , [s,r,o,a] = i.getComponents("hsv");
        this.value.setRawValue(new g([s, r, o, a + e],"hsv"), {
            forceEmit: !1,
            last: !1
        })
    }
    onKeyUp_(t) {
        D(Gt(!0), nt(t)) !== 0 && this.value.setRawValue(this.value.rawValue, {
            forceEmit: !0,
            last: !0
        })
    }
}
;
const ne = v("coltxt");
function Mc(n) {
    const t = n.createElement("select")
      , e = [{
        text: "RGB",
        value: "rgb"
    }, {
        text: "HSL",
        value: "hsl"
    }, {
        text: "HSV",
        value: "hsv"
    }, {
        text: "HEX",
        value: "hex"
    }];
    return t.appendChild(e.reduce((i,s)=>{
        const r = n.createElement("option");
        return r.textContent = s.text,
        r.value = s.value,
        i.appendChild(r),
        i
    }
    , n.createDocumentFragment())),
    t
}
let Tc = class {
    constructor(t, e) {
        this.element = t.createElement("div"),
        this.element.classList.add(ne()),
        e.viewProps.bindClassModifiers(this.element);
        const i = t.createElement("div");
        i.classList.add(ne("m")),
        this.modeElem_ = Mc(t),
        this.modeElem_.classList.add(ne("ms")),
        i.appendChild(this.modeSelectElement),
        e.viewProps.bindDisabled(this.modeElem_);
        const s = t.createElement("div");
        s.classList.add(ne("mm")),
        s.appendChild(En(t, "dropdown")),
        i.appendChild(s),
        this.element.appendChild(i);
        const r = t.createElement("div");
        r.classList.add(ne("w")),
        this.element.appendChild(r),
        this.inputsElem_ = r,
        this.inputViews_ = e.inputViews,
        this.applyInputViews_(),
        Q(e.mode, o=>{
            this.modeElem_.value = o
        }
        )
    }
    get modeSelectElement() {
        return this.modeElem_
    }
    get inputViews() {
        return this.inputViews_
    }
    set inputViews(t) {
        this.inputViews_ = t,
        this.applyInputViews_()
    }
    applyInputViews_() {
        Ur(this.inputsElem_);
        const t = this.element.ownerDocument;
        this.inputViews_.forEach(e=>{
            const i = t.createElement("div");
            i.classList.add(ne("c")),
            i.appendChild(e.element),
            this.inputsElem_.appendChild(i)
        }
        )
    }
}
;
function Ac(n) {
    return R(n === "float" ? 2 : 0)
}
function Oc(n, t, e) {
    const i = de(n, t)[e];
    return new Ue({
        min: 0,
        max: i
    })
}
function Dc(n, t, e) {
    return new qe(n,{
        arrayPosition: e === 0 ? "fst" : e === 2 ? "lst" : "mid",
        parser: t.parser,
        props: m.fromObject({
            formatter: Ac(t.colorType),
            keyScale: Gt(!1),
            pointerScale: t.colorType === "float" ? .01 : 1
        }),
        value: $(0, {
            constraint: Oc(t.colorMode, t.colorType, e)
        }),
        viewProps: t.viewProps
    })
}
function Rc(n, t) {
    const e = {
        colorMode: t.colorMode,
        colorType: t.colorType,
        parser: et,
        viewProps: t.viewProps
    };
    return [0, 1, 2].map(i=>{
        const s = Dc(n, e, i);
        return Qt({
            primary: t.value,
            secondary: s.value,
            forward(r) {
                return I(r, t.colorType).getComponents(t.colorMode)[i]
            },
            backward(r, o) {
                const a = t.colorMode
                  , p = I(r, t.colorType).getComponents(a);
                p[i] = o;
                const h = Ui(Tn(at(p), p[3]), a, t.colorType);
                return I(h, "int")
            }
        }),
        s
    }
    )
}
function Bc(n, t) {
    const e = new Mn(n,{
        parser: Ge("int"),
        props: m.fromObject({
            formatter: Hi
        }),
        value: $(g.black()),
        viewProps: t.viewProps
    });
    return Qt({
        primary: t.value,
        secondary: e.value,
        forward: i=>new g(at(i.getComponents()),i.mode),
        backward: (i,s)=>new g(Tn(at(s.getComponents(i.mode)), i.getComponents()[3]),i.mode)
    }),
    [e]
}
function jc(n) {
    return n !== "hex"
}
let Nc = class {
    constructor(t, e) {
        this.onModeSelectChange_ = this.onModeSelectChange_.bind(this),
        this.colorType_ = e.colorType,
        this.value = e.value,
        this.viewProps = e.viewProps,
        this.colorMode = $(this.value.rawValue.mode),
        this.ccs_ = this.createComponentControllers_(t),
        this.view = new Tc(t,{
            mode: this.colorMode,
            inputViews: [this.ccs_[0].view, this.ccs_[1].view, this.ccs_[2].view],
            viewProps: this.viewProps
        }),
        this.view.modeSelectElement.addEventListener("change", this.onModeSelectChange_)
    }
    createComponentControllers_(t) {
        const e = this.colorMode.rawValue;
        return jc(e) ? Rc(t, {
            colorMode: e,
            colorType: this.colorType_,
            value: this.value,
            viewProps: this.viewProps
        }) : Bc(t, {
            value: this.value,
            viewProps: this.viewProps
        })
    }
    onModeSelectChange_(t) {
        const e = t.currentTarget;
        this.colorMode.rawValue = e.value,
        this.ccs_ = this.createComponentControllers_(this.view.element.ownerDocument),
        this.view.inputViews = this.ccs_.map(i=>i.view)
    }
}
;
const Kn = v("hpl");
let Ic = class {
    constructor(t, e) {
        this.onValueChange_ = this.onValueChange_.bind(this),
        this.value = e.value,
        this.value.emitter.on("change", this.onValueChange_),
        this.element = t.createElement("div"),
        this.element.classList.add(Kn()),
        e.viewProps.bindClassModifiers(this.element),
        e.viewProps.bindTabIndex(this.element);
        const i = t.createElement("div");
        i.classList.add(Kn("c")),
        this.element.appendChild(i);
        const s = t.createElement("div");
        s.classList.add(Kn("m")),
        this.element.appendChild(s),
        this.markerElem_ = s,
        this.update_()
    }
    update_() {
        const t = this.value.rawValue
          , [e] = t.getComponents("hsv");
        this.markerElem_.style.backgroundColor = wo(new g([e, 100, 100],"hsv"));
        const i = d(e, 0, 360, 0, 100);
        this.markerElem_.style.left = `${i}%`
    }
    onValueChange_() {
        this.update_()
    }
}
  , Fc = class {
    constructor(t, e) {
        this.onKeyDown_ = this.onKeyDown_.bind(this),
        this.onKeyUp_ = this.onKeyUp_.bind(this),
        this.onPointerDown_ = this.onPointerDown_.bind(this),
        this.onPointerMove_ = this.onPointerMove_.bind(this),
        this.onPointerUp_ = this.onPointerUp_.bind(this),
        this.value = e.value,
        this.viewProps = e.viewProps,
        this.view = new Ic(t,{
            value: this.value,
            viewProps: this.viewProps
        }),
        this.ptHandler_ = new gt(this.view.element),
        this.ptHandler_.emitter.on("down", this.onPointerDown_),
        this.ptHandler_.emitter.on("move", this.onPointerMove_),
        this.ptHandler_.emitter.on("up", this.onPointerUp_),
        this.view.element.addEventListener("keydown", this.onKeyDown_),
        this.view.element.addEventListener("keyup", this.onKeyUp_)
    }
    handlePointerEvent_(t, e) {
        if (!t.point)
            return;
        const i = d(k(t.point.x, 0, t.bounds.width), 0, t.bounds.width, 0, 360)
          , s = this.value.rawValue
          , [,r,o,a] = s.getComponents("hsv");
        this.value.setRawValue(new g([i, r, o, a],"hsv"), e)
    }
    onPointerDown_(t) {
        this.handlePointerEvent_(t.data, {
            forceEmit: !1,
            last: !1
        })
    }
    onPointerMove_(t) {
        this.handlePointerEvent_(t.data, {
            forceEmit: !1,
            last: !1
        })
    }
    onPointerUp_(t) {
        this.handlePointerEvent_(t.data, {
            forceEmit: !0,
            last: !0
        })
    }
    onKeyDown_(t) {
        const e = D(Gt(!1), nt(t));
        if (e === 0)
            return;
        const i = this.value.rawValue
          , [s,r,o,a] = i.getComponents("hsv");
        this.value.setRawValue(new g([s + e, r, o, a],"hsv"), {
            forceEmit: !1,
            last: !1
        })
    }
    onKeyUp_(t) {
        D(Gt(!1), nt(t)) !== 0 && this.value.setRawValue(this.value.rawValue, {
            forceEmit: !0,
            last: !0
        })
    }
}
;
const Un = v("svp")
  , Gs = 64;
let zc = class {
    constructor(t, e) {
        this.onValueChange_ = this.onValueChange_.bind(this),
        this.value = e.value,
        this.value.emitter.on("change", this.onValueChange_),
        this.element = t.createElement("div"),
        this.element.classList.add(Un()),
        e.viewProps.bindClassModifiers(this.element),
        e.viewProps.bindTabIndex(this.element);
        const i = t.createElement("canvas");
        i.height = Gs,
        i.width = Gs,
        i.classList.add(Un("c")),
        this.element.appendChild(i),
        this.canvasElement = i;
        const s = t.createElement("div");
        s.classList.add(Un("m")),
        this.element.appendChild(s),
        this.markerElem_ = s,
        this.update_()
    }
    update_() {
        const t = Xl(this.canvasElement);
        if (!t)
            return;
        const i = this.value.rawValue.getComponents("hsv")
          , s = this.canvasElement.width
          , r = this.canvasElement.height
          , o = t.getImageData(0, 0, s, r)
          , a = o.data;
        for (let h = 0; h < r; h++)
            for (let u = 0; u < s; u++) {
                const N = d(u, 0, s, 0, 100)
                  , Bt = d(h, 0, r, 100, 0)
                  , ct = no(i[0], N, Bt)
                  , ht = (h * s + u) * 4;
                a[ht] = ct[0],
                a[ht + 1] = ct[1],
                a[ht + 2] = ct[2],
                a[ht + 3] = 255
            }
        t.putImageData(o, 0, 0);
        const l = d(i[1], 0, 100, 0, 100);
        this.markerElem_.style.left = `${l}%`;
        const p = d(i[2], 0, 100, 100, 0);
        this.markerElem_.style.top = `${p}%`
    }
    onValueChange_() {
        this.update_()
    }
}
  , Kc = class {
    constructor(t, e) {
        this.onKeyDown_ = this.onKeyDown_.bind(this),
        this.onKeyUp_ = this.onKeyUp_.bind(this),
        this.onPointerDown_ = this.onPointerDown_.bind(this),
        this.onPointerMove_ = this.onPointerMove_.bind(this),
        this.onPointerUp_ = this.onPointerUp_.bind(this),
        this.value = e.value,
        this.viewProps = e.viewProps,
        this.view = new zc(t,{
            value: this.value,
            viewProps: this.viewProps
        }),
        this.ptHandler_ = new gt(this.view.element),
        this.ptHandler_.emitter.on("down", this.onPointerDown_),
        this.ptHandler_.emitter.on("move", this.onPointerMove_),
        this.ptHandler_.emitter.on("up", this.onPointerUp_),
        this.view.element.addEventListener("keydown", this.onKeyDown_),
        this.view.element.addEventListener("keyup", this.onKeyUp_)
    }
    handlePointerEvent_(t, e) {
        if (!t.point)
            return;
        const i = d(t.point.x, 0, t.bounds.width, 0, 100)
          , s = d(t.point.y, 0, t.bounds.height, 100, 0)
          , [r,,,o] = this.value.rawValue.getComponents("hsv");
        this.value.setRawValue(new g([r, i, s, o],"hsv"), e)
    }
    onPointerDown_(t) {
        this.handlePointerEvent_(t.data, {
            forceEmit: !1,
            last: !1
        })
    }
    onPointerMove_(t) {
        this.handlePointerEvent_(t.data, {
            forceEmit: !1,
            last: !1
        })
    }
    onPointerUp_(t) {
        this.handlePointerEvent_(t.data, {
            forceEmit: !0,
            last: !0
        })
    }
    onKeyDown_(t) {
        bn(t.key) && t.preventDefault();
        const [e,i,s,r] = this.value.rawValue.getComponents("hsv")
          , o = Gt(!1)
          , a = D(o, nt(t))
          , l = D(o, qt(t));
        a === 0 && l === 0 || this.value.setRawValue(new g([e, i + a, s + l, r],"hsv"), {
            forceEmit: !1,
            last: !1
        })
    }
    onKeyUp_(t) {
        const e = Gt(!1)
          , i = D(e, nt(t))
          , s = D(e, qt(t));
        i === 0 && s === 0 || this.value.setRawValue(this.value.rawValue, {
            forceEmit: !0,
            last: !0
        })
    }
}
  , Uc = class {
    constructor(t, e) {
        this.value = e.value,
        this.viewProps = e.viewProps,
        this.hPaletteC_ = new Fc(t,{
            value: this.value,
            viewProps: this.viewProps
        }),
        this.svPaletteC_ = new Kc(t,{
            value: this.value,
            viewProps: this.viewProps
        }),
        this.alphaIcs_ = e.supportsAlpha ? {
            palette: new Lc(t,{
                value: this.value,
                viewProps: this.viewProps
            }),
            text: new qe(t,{
                parser: et,
                props: m.fromObject({
                    pointerScale: .01,
                    keyScale: .1,
                    formatter: R(2)
                }),
                value: $(0, {
                    constraint: new Ue({
                        min: 0,
                        max: 1
                    })
                }),
                viewProps: this.viewProps
            })
        } : null,
        this.alphaIcs_ && Qt({
            primary: this.value,
            secondary: this.alphaIcs_.text.value,
            forward: i=>i.getComponents()[3],
            backward: (i,s)=>{
                const r = i.getComponents();
                return r[3] = s,
                new g(r,i.mode)
            }
        }),
        this.textsC_ = new Nc(t,{
            colorType: e.colorType,
            value: this.value,
            viewProps: this.viewProps
        }),
        this.view = new ic(t,{
            alphaViews: this.alphaIcs_ ? {
                palette: this.alphaIcs_.palette.view,
                text: this.alphaIcs_.text.view
            } : null,
            hPaletteView: this.hPaletteC_.view,
            supportsAlpha: e.supportsAlpha,
            svPaletteView: this.svPaletteC_.view,
            textsView: this.textsC_.view,
            viewProps: this.viewProps
        })
    }
    get textsController() {
        return this.textsC_
    }
}
;
const Hn = v("colsw");
let Hc = class {
    constructor(t, e) {
        this.onValueChange_ = this.onValueChange_.bind(this),
        e.value.emitter.on("change", this.onValueChange_),
        this.value = e.value,
        this.element = t.createElement("div"),
        this.element.classList.add(Hn()),
        e.viewProps.bindClassModifiers(this.element);
        const i = t.createElement("div");
        i.classList.add(Hn("sw")),
        this.element.appendChild(i),
        this.swatchElem_ = i;
        const s = t.createElement("button");
        s.classList.add(Hn("b")),
        e.viewProps.bindDisabled(s),
        this.element.appendChild(s),
        this.buttonElement = s,
        this.update_()
    }
    update_() {
        const t = this.value.rawValue;
        this.swatchElem_.style.backgroundColor = qi(t)
    }
    onValueChange_() {
        this.update_()
    }
}
  , qc = class {
    constructor(t, e) {
        this.value = e.value,
        this.viewProps = e.viewProps,
        this.view = new Hc(t,{
            value: this.value,
            viewProps: this.viewProps
        })
    }
}
  , Gi = class {
    constructor(t, e) {
        this.onButtonBlur_ = this.onButtonBlur_.bind(this),
        this.onButtonClick_ = this.onButtonClick_.bind(this),
        this.onPopupChildBlur_ = this.onPopupChildBlur_.bind(this),
        this.onPopupChildKeydown_ = this.onPopupChildKeydown_.bind(this),
        this.value = e.value,
        this.viewProps = e.viewProps,
        this.foldable_ = Vn.create(e.expanded),
        this.swatchC_ = new qc(t,{
            value: this.value,
            viewProps: this.viewProps
        });
        const i = this.swatchC_.view.buttonElement;
        i.addEventListener("blur", this.onButtonBlur_),
        i.addEventListener("click", this.onButtonClick_),
        this.textC_ = new Mn(t,{
            parser: e.parser,
            props: m.fromObject({
                formatter: e.formatter
            }),
            value: this.value,
            viewProps: this.viewProps
        }),
        this.view = new Yp(t,{
            foldable: this.foldable_,
            pickerLayout: e.pickerLayout
        }),
        this.view.swatchElement.appendChild(this.swatchC_.view.element),
        this.view.textElement.appendChild(this.textC_.view.element),
        this.popC_ = e.pickerLayout === "popup" ? new Ni(t,{
            viewProps: this.viewProps
        }) : null;
        const s = new Uc(t,{
            colorType: e.colorType,
            supportsAlpha: e.supportsAlpha,
            value: this.value,
            viewProps: this.viewProps
        });
        s.view.allFocusableElements.forEach(r=>{
            r.addEventListener("blur", this.onPopupChildBlur_),
            r.addEventListener("keydown", this.onPopupChildKeydown_)
        }
        ),
        this.pickerC_ = s,
        this.popC_ ? (this.view.element.appendChild(this.popC_.view.element),
        this.popC_.view.element.appendChild(s.view.element),
        Qt({
            primary: this.foldable_.value("expanded"),
            secondary: this.popC_.shows,
            forward: r=>r,
            backward: (r,o)=>o
        })) : this.view.pickerElement && (this.view.pickerElement.appendChild(this.pickerC_.view.element),
        Sn(this.foldable_, this.view.pickerElement))
    }
    get textController() {
        return this.textC_
    }
    onButtonBlur_(t) {
        if (!this.popC_)
            return;
        const e = this.view.element
          , i = t.relatedTarget;
        (!i || !e.contains(i)) && (this.popC_.shows.rawValue = !1)
    }
    onButtonClick_() {
        this.foldable_.set("expanded", !this.foldable_.get("expanded")),
        this.foldable_.get("expanded") && this.pickerC_.view.allFocusableElements[0].focus()
    }
    onPopupChildBlur_(t) {
        if (!this.popC_)
            return;
        const e = this.popC_.view.element
          , i = Ti(t);
        i && e.contains(i) || i && i === this.swatchC_.view.buttonElement && !yn(e.ownerDocument) || (this.popC_.shows.rawValue = !1)
    }
    onPopupChildKeydown_(t) {
        this.popC_ ? t.key === "Escape" && (this.popC_.shows.rawValue = !1) : this.view.pickerElement && t.key === "Escape" && this.swatchC_.view.buttonElement.focus()
    }
}
;
function Gc(n) {
    return at(n.getComponents("rgb")).reduce((t,e)=>t << 8 | Math.floor(e) & 255, 0)
}
function Wc(n) {
    return n.getComponents("rgb").reduce((t,e,i)=>{
        const s = Math.floor(i === 3 ? e * 255 : e) & 255;
        return t << 8 | s
    }
    , 0) >>> 0
}
function Yc(n) {
    return new g([n >> 16 & 255, n >> 8 & 255, n & 255],"rgb")
}
function Xc(n) {
    return new g([n >> 24 & 255, n >> 16 & 255, n >> 8 & 255, d(n & 255, 0, 255, 0, 1)],"rgb")
}
function Zc(n) {
    return typeof n != "number" ? g.black() : Yc(n)
}
function Jc(n) {
    return typeof n != "number" ? g.black() : Xc(n)
}
function cn(n, t) {
    return typeof n != "object" || y(n) ? !1 : t in n && typeof n[t] == "number"
}
function xo(n) {
    return cn(n, "r") && cn(n, "g") && cn(n, "b")
}
function Po(n) {
    return xo(n) && cn(n, "a")
}
function yo(n) {
    return xo(n)
}
function Wi(n, t) {
    if (n.mode !== t.mode || n.type !== t.type)
        return !1;
    const e = n.getComponents()
      , i = t.getComponents();
    for (let s = 0; s < e.length; s++)
        if (e[s] !== i[s])
            return !1;
    return !0
}
function Ws(n) {
    return "a"in n ? [n.r, n.g, n.b, n.a] : [n.r, n.g, n.b]
}
function Qc(n) {
    const t = Co(n);
    return t ? (e,i)=>{
        Rt(e, t(i))
    }
    : null
}
function th(n) {
    const t = n ? Wc : Gc;
    return (e,i)=>{
        Rt(e, t(i))
    }
}
function eh(n, t, e) {
    const s = I(t, e).toRgbaObject();
    n.writeProperty("r", s.r),
    n.writeProperty("g", s.g),
    n.writeProperty("b", s.b),
    n.writeProperty("a", s.a)
}
function nh(n, t, e) {
    const s = I(t, e).toRgbaObject();
    n.writeProperty("r", s.r),
    n.writeProperty("g", s.g),
    n.writeProperty("b", s.b)
}
function ih(n, t) {
    return (e,i)=>{
        n ? eh(e, i, t) : nh(e, i, t)
    }
}
function sh(n) {
    var t;
    return !!(!((t = n == null ? void 0 : n.color) === null || t === void 0) && t.alpha)
}
function rh(n) {
    return n ? t=>qi(t, "0x") : t=>Hi(t, "0x")
}
function oh(n) {
    return "color"in n || n.view === "color"
}
M({
    id: "input-color-number",
    type: "input",
    accept: (n,t)=>{
        if (typeof n != "number" || !oh(t))
            return null;
        const e = zi(t);
        return e ? {
            initialValue: n,
            params: Object.assign(Object.assign({}, e), {
                supportsAlpha: sh(t)
            })
        } : null
    }
    ,
    binding: {
        reader: n=>n.params.supportsAlpha ? Jc : Zc,
        equals: Wi,
        writer: n=>th(n.params.supportsAlpha)
    },
    controller: n=>{
        var t, e;
        return new Gi(n.document,{
            colorType: "int",
            expanded: (t = n.params.expanded) !== null && t !== void 0 ? t : !1,
            formatter: rh(n.params.supportsAlpha),
            parser: Ge("int"),
            pickerLayout: (e = n.params.picker) !== null && e !== void 0 ? e : "popup",
            supportsAlpha: n.params.supportsAlpha,
            value: n.value,
            viewProps: n.viewProps
        })
    }
});
function ah(n, t) {
    if (!yo(n))
        return I(g.black(), t);
    if (t === "int") {
        const e = Ws(n);
        return new g(e,"rgb")
    }
    if (t === "float") {
        const e = Ws(n);
        return new Ki(e,"rgb")
    }
    return I(g.black(), "int")
}
function lh(n) {
    return Po(n)
}
function ph(n) {
    return t=>{
        const e = ah(t, n);
        return I(e, "int")
    }
}
function ch(n, t) {
    return e=>n ? go(e, t) : _o(e, t)
}
M({
    id: "input-color-object",
    type: "input",
    accept: (n,t)=>{
        var e;
        if (!yo(n))
            return null;
        const i = zi(t);
        return i ? {
            initialValue: n,
            params: Object.assign(Object.assign({}, i), {
                colorType: (e = oo(t)) !== null && e !== void 0 ? e : "int"
            })
        } : null
    }
    ,
    binding: {
        reader: n=>ph(n.params.colorType),
        equals: Wi,
        writer: n=>ih(lh(n.initialValue), n.params.colorType)
    },
    controller: n=>{
        var t, e;
        const i = Po(n.initialValue);
        return new Gi(n.document,{
            colorType: n.params.colorType,
            expanded: (t = n.params.expanded) !== null && t !== void 0 ? t : !1,
            formatter: ch(i, n.params.colorType),
            parser: Ge("int"),
            pickerLayout: (e = n.params.picker) !== null && e !== void 0 ? e : "popup",
            supportsAlpha: i,
            value: n.value,
            viewProps: n.viewProps
        })
    }
});
M({
    id: "input-color-string",
    type: "input",
    accept: (n,t)=>{
        if (typeof n != "string" || t.view === "text")
            return null;
        const e = xc(n, oo(t));
        if (!e)
            return null;
        const i = Co(e);
        if (!i)
            return null;
        const s = zi(t);
        return s ? {
            initialValue: n,
            params: Object.assign(Object.assign({}, s), {
                format: e,
                stringifier: i
            })
        } : null
    }
    ,
    binding: {
        reader: ()=>Pc,
        equals: Wi,
        writer: n=>{
            const t = Qc(n.params.format);
            if (!t)
                throw ft.notBindable();
            return t
        }
    },
    controller: n=>{
        var t, e;
        return new Gi(n.document,{
            colorType: n.params.format.type,
            expanded: (t = n.params.expanded) !== null && t !== void 0 ? t : !1,
            formatter: n.params.stringifier,
            parser: Ge("int"),
            pickerLayout: (e = n.params.picker) !== null && e !== void 0 ? e : "popup",
            supportsAlpha: n.params.format.alpha,
            value: n.value,
            viewProps: n.viewProps
        })
    }
});
let An = class {
    constructor(t) {
        this.components = t.components,
        this.asm_ = t.assembly
    }
    constrain(t) {
        const e = this.asm_.toComponents(t).map((i,s)=>{
            var r, o;
            return (o = (r = this.components[s]) === null || r === void 0 ? void 0 : r.constrain(i)) !== null && o !== void 0 ? o : i
        }
        );
        return this.asm_.fromComponents(e)
    }
}
;
const Ys = v("pndtxt");
let hh = class {
    constructor(t, e) {
        this.textViews = e.textViews,
        this.element = t.createElement("div"),
        this.element.classList.add(Ys()),
        this.textViews.forEach(i=>{
            const s = t.createElement("div");
            s.classList.add(Ys("a")),
            s.appendChild(i.element),
            this.element.appendChild(s)
        }
        )
    }
}
;
function uh(n, t, e) {
    return new qe(n,{
        arrayPosition: e === 0 ? "fst" : e === t.axes.length - 1 ? "lst" : "mid",
        parser: t.parser,
        props: t.axes[e].textProps,
        value: $(0, {
            constraint: t.axes[e].constraint
        }),
        viewProps: t.viewProps
    })
}
let be = class {
    constructor(t, e) {
        this.value = e.value,
        this.viewProps = e.viewProps,
        this.acs_ = e.axes.map((i,s)=>uh(t, e, s)),
        this.acs_.forEach((i,s)=>{
            Qt({
                primary: this.value,
                secondary: i.value,
                forward: r=>e.assembly.toComponents(r)[s],
                backward: (r,o)=>{
                    const a = e.assembly.toComponents(r);
                    return a[s] = o,
                    e.assembly.fromComponents(a)
                }
            })
        }
        ),
        this.view = new hh(t,{
            textViews: this.acs_.map(i=>i.view)
        })
    }
    get textControllers() {
        return this.acs_
    }
}
  , dh = class extends Li {
    get max() {
        return this.controller.valueController.sliderController.props.get("max")
    }
    set max(t) {
        this.controller.valueController.sliderController.props.set("max", t)
    }
    get min() {
        return this.controller.valueController.sliderController.props.get("min")
    }
    set min(t) {
        this.controller.valueController.sliderController.props.set("min", t)
    }
}
;
function mh(n, t) {
    const e = []
      , i = Ei(n, t);
    i && e.push(i);
    const s = ki(n);
    s && e.push(s);
    const r = ji(n.options);
    return r && e.push(r),
    new ve(e)
}
M({
    id: "input-number",
    type: "input",
    accept: (n,t)=>{
        if (typeof n != "number")
            return null;
        const e = L(t, i=>Object.assign(Object.assign({}, Si(i)), {
            options: i.optional.custom(Ln),
            readonly: i.optional.constant(!1)
        }));
        return e ? {
            initialValue: n,
            params: e
        } : null
    }
    ,
    binding: {
        reader: n=>yi,
        constraint: n=>mh(n.params, n.initialValue),
        writer: n=>Rt
    },
    controller: n=>{
        const t = n.value
          , e = n.constraint
          , i = e && De(e, $n);
        if (i)
            return new ue(n.document,{
                props: new m({
                    options: i.values.value("options")
                }),
                value: t,
                viewProps: n.viewProps
            });
        const s = Vi(n.params, t.rawValue)
          , r = e && De(e, Ue);
        return r ? new Hs(n.document,Object.assign(Object.assign({}, Up(Object.assign(Object.assign({}, s), {
            keyScale: $(s.keyScale),
            max: r.values.value("max"),
            min: r.values.value("min")
        }))), {
            parser: et,
            value: t,
            viewProps: n.viewProps
        })) : new qe(n.document,{
            parser: et,
            props: m.fromObject(s),
            value: t,
            viewProps: n.viewProps
        })
    }
    ,
    api(n) {
        return typeof n.controller.value.rawValue != "number" ? null : n.controller.valueController instanceof Hs ? new dh(n.controller) : n.controller.valueController instanceof ue ? new Bi(n.controller) : null
    }
});
let Mt = class {
    constructor(t=0, e=0) {
        this.x = t,
        this.y = e
    }
    getComponents() {
        return [this.x, this.y]
    }
    static isObject(t) {
        if (y(t))
            return !1;
        const e = t.x
          , i = t.y;
        return !(typeof e != "number" || typeof i != "number")
    }
    static equals(t, e) {
        return t.x === e.x && t.y === e.y
    }
    toObject() {
        return {
            x: this.x,
            y: this.y
        }
    }
}
;
const Eo = {
    toComponents: n=>n.getComponents(),
    fromComponents: n=>new Mt(...n)
}
  , ie = v("p2d");
let vh = class {
    constructor(t, e) {
        this.element = t.createElement("div"),
        this.element.classList.add(ie()),
        e.viewProps.bindClassModifiers(this.element),
        Q(e.expanded, Dt(this.element, ie(void 0, "expanded")));
        const i = t.createElement("div");
        i.classList.add(ie("h")),
        this.element.appendChild(i);
        const s = t.createElement("button");
        s.classList.add(ie("b")),
        s.appendChild(En(t, "p2dpad")),
        e.viewProps.bindDisabled(s),
        i.appendChild(s),
        this.buttonElement = s;
        const r = t.createElement("div");
        if (r.classList.add(ie("t")),
        i.appendChild(r),
        this.textElement = r,
        e.pickerLayout === "inline") {
            const o = t.createElement("div");
            o.classList.add(ie("p")),
            this.element.appendChild(o),
            this.pickerElement = o
        } else
            this.pickerElement = null
    }
}
;
const Pt = v("p2dp");
let bh = class {
    constructor(t, e) {
        this.onFoldableChange_ = this.onFoldableChange_.bind(this),
        this.onPropsChange_ = this.onPropsChange_.bind(this),
        this.onValueChange_ = this.onValueChange_.bind(this),
        this.props_ = e.props,
        this.props_.emitter.on("change", this.onPropsChange_),
        this.element = t.createElement("div"),
        this.element.classList.add(Pt()),
        e.layout === "popup" && this.element.classList.add(Pt(void 0, "p")),
        e.viewProps.bindClassModifiers(this.element);
        const i = t.createElement("div");
        i.classList.add(Pt("p")),
        e.viewProps.bindTabIndex(i),
        this.element.appendChild(i),
        this.padElement = i;
        const s = t.createElementNS(O, "svg");
        s.classList.add(Pt("g")),
        this.padElement.appendChild(s),
        this.svgElem_ = s;
        const r = t.createElementNS(O, "line");
        r.classList.add(Pt("ax")),
        r.setAttributeNS(null, "x1", "0"),
        r.setAttributeNS(null, "y1", "50%"),
        r.setAttributeNS(null, "x2", "100%"),
        r.setAttributeNS(null, "y2", "50%"),
        this.svgElem_.appendChild(r);
        const o = t.createElementNS(O, "line");
        o.classList.add(Pt("ax")),
        o.setAttributeNS(null, "x1", "50%"),
        o.setAttributeNS(null, "y1", "0"),
        o.setAttributeNS(null, "x2", "50%"),
        o.setAttributeNS(null, "y2", "100%"),
        this.svgElem_.appendChild(o);
        const a = t.createElementNS(O, "line");
        a.classList.add(Pt("l")),
        a.setAttributeNS(null, "x1", "50%"),
        a.setAttributeNS(null, "y1", "50%"),
        this.svgElem_.appendChild(a),
        this.lineElem_ = a;
        const l = t.createElement("div");
        l.classList.add(Pt("m")),
        this.padElement.appendChild(l),
        this.markerElem_ = l,
        e.value.emitter.on("change", this.onValueChange_),
        this.value = e.value,
        this.update_()
    }
    get allFocusableElements() {
        return [this.padElement]
    }
    update_() {
        const [t,e] = this.value.rawValue.getComponents()
          , i = this.props_.get("max")
          , s = d(t, -i, +i, 0, 100)
          , r = d(e, -i, +i, 0, 100)
          , o = this.props_.get("invertsY") ? 100 - r : r;
        this.lineElem_.setAttributeNS(null, "x2", `${s}%`),
        this.lineElem_.setAttributeNS(null, "y2", `${o}%`),
        this.markerElem_.style.left = `${s}%`,
        this.markerElem_.style.top = `${o}%`
    }
    onValueChange_() {
        this.update_()
    }
    onPropsChange_() {
        this.update_()
    }
    onFoldableChange_() {
        this.update_()
    }
}
;
function Xs(n, t, e) {
    return [D(t[0], nt(n)), D(t[1], qt(n)) * (e ? 1 : -1)]
}
let fh = class {
    constructor(t, e) {
        this.onPadKeyDown_ = this.onPadKeyDown_.bind(this),
        this.onPadKeyUp_ = this.onPadKeyUp_.bind(this),
        this.onPointerDown_ = this.onPointerDown_.bind(this),
        this.onPointerMove_ = this.onPointerMove_.bind(this),
        this.onPointerUp_ = this.onPointerUp_.bind(this),
        this.props = e.props,
        this.value = e.value,
        this.viewProps = e.viewProps,
        this.view = new bh(t,{
            layout: e.layout,
            props: this.props,
            value: this.value,
            viewProps: this.viewProps
        }),
        this.ptHandler_ = new gt(this.view.padElement),
        this.ptHandler_.emitter.on("down", this.onPointerDown_),
        this.ptHandler_.emitter.on("move", this.onPointerMove_),
        this.ptHandler_.emitter.on("up", this.onPointerUp_),
        this.view.padElement.addEventListener("keydown", this.onPadKeyDown_),
        this.view.padElement.addEventListener("keyup", this.onPadKeyUp_)
    }
    handlePointerEvent_(t, e) {
        if (!t.point)
            return;
        const i = this.props.get("max")
          , s = d(t.point.x, 0, t.bounds.width, -i, +i)
          , r = d(this.props.get("invertsY") ? t.bounds.height - t.point.y : t.point.y, 0, t.bounds.height, -i, +i);
        this.value.setRawValue(new Mt(s,r), e)
    }
    onPointerDown_(t) {
        this.handlePointerEvent_(t.data, {
            forceEmit: !1,
            last: !1
        })
    }
    onPointerMove_(t) {
        this.handlePointerEvent_(t.data, {
            forceEmit: !1,
            last: !1
        })
    }
    onPointerUp_(t) {
        this.handlePointerEvent_(t.data, {
            forceEmit: !0,
            last: !0
        })
    }
    onPadKeyDown_(t) {
        bn(t.key) && t.preventDefault();
        const [e,i] = Xs(t, [this.props.get("xKeyScale"), this.props.get("yKeyScale")], this.props.get("invertsY"));
        e === 0 && i === 0 || this.value.setRawValue(new Mt(this.value.rawValue.x + e,this.value.rawValue.y + i), {
            forceEmit: !1,
            last: !1
        })
    }
    onPadKeyUp_(t) {
        const [e,i] = Xs(t, [this.props.get("xKeyScale"), this.props.get("yKeyScale")], this.props.get("invertsY"));
        e === 0 && i === 0 || this.value.setRawValue(this.value.rawValue, {
            forceEmit: !0,
            last: !0
        })
    }
}
  , wh = class {
    constructor(t, e) {
        var i, s;
        this.onPopupChildBlur_ = this.onPopupChildBlur_.bind(this),
        this.onPopupChildKeydown_ = this.onPopupChildKeydown_.bind(this),
        this.onPadButtonBlur_ = this.onPadButtonBlur_.bind(this),
        this.onPadButtonClick_ = this.onPadButtonClick_.bind(this),
        this.value = e.value,
        this.viewProps = e.viewProps,
        this.foldable_ = Vn.create(e.expanded),
        this.popC_ = e.pickerLayout === "popup" ? new Ni(t,{
            viewProps: this.viewProps
        }) : null;
        const r = new fh(t,{
            layout: e.pickerLayout,
            props: new m({
                invertsY: $(e.invertsY),
                max: $(e.max),
                xKeyScale: e.axes[0].textProps.value("keyScale"),
                yKeyScale: e.axes[1].textProps.value("keyScale")
            }),
            value: this.value,
            viewProps: this.viewProps
        });
        r.view.allFocusableElements.forEach(o=>{
            o.addEventListener("blur", this.onPopupChildBlur_),
            o.addEventListener("keydown", this.onPopupChildKeydown_)
        }
        ),
        this.pickerC_ = r,
        this.textC_ = new be(t,{
            assembly: Eo,
            axes: e.axes,
            parser: e.parser,
            value: this.value,
            viewProps: this.viewProps
        }),
        this.view = new vh(t,{
            expanded: this.foldable_.value("expanded"),
            pickerLayout: e.pickerLayout,
            viewProps: this.viewProps
        }),
        this.view.textElement.appendChild(this.textC_.view.element),
        (i = this.view.buttonElement) === null || i === void 0 || i.addEventListener("blur", this.onPadButtonBlur_),
        (s = this.view.buttonElement) === null || s === void 0 || s.addEventListener("click", this.onPadButtonClick_),
        this.popC_ ? (this.view.element.appendChild(this.popC_.view.element),
        this.popC_.view.element.appendChild(this.pickerC_.view.element),
        Qt({
            primary: this.foldable_.value("expanded"),
            secondary: this.popC_.shows,
            forward: o=>o,
            backward: (o,a)=>a
        })) : this.view.pickerElement && (this.view.pickerElement.appendChild(this.pickerC_.view.element),
        Sn(this.foldable_, this.view.pickerElement))
    }
    get textController() {
        return this.textC_
    }
    onPadButtonBlur_(t) {
        if (!this.popC_)
            return;
        const e = this.view.element
          , i = t.relatedTarget;
        (!i || !e.contains(i)) && (this.popC_.shows.rawValue = !1)
    }
    onPadButtonClick_() {
        this.foldable_.set("expanded", !this.foldable_.get("expanded")),
        this.foldable_.get("expanded") && this.pickerC_.view.allFocusableElements[0].focus()
    }
    onPopupChildBlur_(t) {
        if (!this.popC_)
            return;
        const e = this.popC_.view.element
          , i = Ti(t);
        i && e.contains(i) || i && i === this.view.buttonElement && !yn(e.ownerDocument) || (this.popC_.shows.rawValue = !1)
    }
    onPopupChildKeydown_(t) {
        this.popC_ ? t.key === "Escape" && (this.popC_.shows.rawValue = !1) : this.view.pickerElement && t.key === "Escape" && this.view.buttonElement.focus()
    }
}
;
function _h(n) {
    return Mt.isObject(n) ? new Mt(n.x,n.y) : new Mt
}
function gh(n, t) {
    n.writeProperty("x", t.x),
    n.writeProperty("y", t.y)
}
function Ch(n, t) {
    return new An({
        assembly: Eo,
        components: [mt(Object.assign(Object.assign({}, n), n.x), t.x), mt(Object.assign(Object.assign({}, n), n.y), t.y)]
    })
}
function Zs(n, t) {
    var e, i;
    if (!y(n.min) || !y(n.max))
        return Math.max(Math.abs((e = n.min) !== null && e !== void 0 ? e : 0), Math.abs((i = n.max) !== null && i !== void 0 ? i : 0));
    const s = zr(n);
    return Math.max(Math.abs(s) * 10, Math.abs(t) * 10)
}
function xh(n, t) {
    var e, i;
    const s = Zs(Ut(n, (e = n.x) !== null && e !== void 0 ? e : {}), t.x)
      , r = Zs(Ut(n, (i = n.y) !== null && i !== void 0 ? i : {}), t.y);
    return Math.max(s, r)
}
function Ph(n) {
    if (!("y"in n))
        return !1;
    const t = n.y;
    return t && "inverted"in t ? !!t.inverted : !1
}
M({
    id: "input-point2d",
    type: "input",
    accept: (n,t)=>{
        if (!Mt.isObject(n))
            return null;
        const e = L(t, i=>Object.assign(Object.assign({}, Re(i)), {
            expanded: i.optional.boolean,
            picker: i.optional.custom(eo),
            readonly: i.optional.constant(!1),
            x: i.optional.custom($t),
            y: i.optional.object(Object.assign(Object.assign({}, Re(i)), {
                inverted: i.optional.boolean
            }))
        }));
        return e ? {
            initialValue: n,
            params: e
        } : null
    }
    ,
    binding: {
        reader: ()=>_h,
        constraint: n=>Ch(n.params, n.initialValue),
        equals: Mt.equals,
        writer: ()=>gh
    },
    controller: n=>{
        var t, e;
        const i = n.document
          , s = n.value
          , r = n.constraint
          , o = [n.params.x, n.params.y];
        return new wh(i,{
            axes: s.rawValue.getComponents().map((a,l)=>{
                var p;
                return $i({
                    constraint: r.components[l],
                    initialValue: a,
                    params: Ut(n.params, (p = o[l]) !== null && p !== void 0 ? p : {})
                })
            }
            ),
            expanded: (t = n.params.expanded) !== null && t !== void 0 ? t : !1,
            invertsY: Ph(n.params),
            max: xh(n.params, s.rawValue),
            parser: et,
            pickerLayout: (e = n.params.picker) !== null && e !== void 0 ? e : "popup",
            value: s,
            viewProps: n.viewProps
        })
    }
});
let le = class {
    constructor(t=0, e=0, i=0) {
        this.x = t,
        this.y = e,
        this.z = i
    }
    getComponents() {
        return [this.x, this.y, this.z]
    }
    static isObject(t) {
        if (y(t))
            return !1;
        const e = t.x
          , i = t.y
          , s = t.z;
        return !(typeof e != "number" || typeof i != "number" || typeof s != "number")
    }
    static equals(t, e) {
        return t.x === e.x && t.y === e.y && t.z === e.z
    }
    toObject() {
        return {
            x: this.x,
            y: this.y,
            z: this.z
        }
    }
}
;
const ko = {
    toComponents: n=>n.getComponents(),
    fromComponents: n=>new le(...n)
};
function yh(n) {
    return le.isObject(n) ? new le(n.x,n.y,n.z) : new le
}
function Eh(n, t) {
    n.writeProperty("x", t.x),
    n.writeProperty("y", t.y),
    n.writeProperty("z", t.z)
}
function kh(n, t) {
    return new An({
        assembly: ko,
        components: [mt(Object.assign(Object.assign({}, n), n.x), t.x), mt(Object.assign(Object.assign({}, n), n.y), t.y), mt(Object.assign(Object.assign({}, n), n.z), t.z)]
    })
}
M({
    id: "input-point3d",
    type: "input",
    accept: (n,t)=>{
        if (!le.isObject(n))
            return null;
        const e = L(t, i=>Object.assign(Object.assign({}, Re(i)), {
            readonly: i.optional.constant(!1),
            x: i.optional.custom($t),
            y: i.optional.custom($t),
            z: i.optional.custom($t)
        }));
        return e ? {
            initialValue: n,
            params: e
        } : null
    }
    ,
    binding: {
        reader: n=>yh,
        constraint: n=>kh(n.params, n.initialValue),
        equals: le.equals,
        writer: n=>Eh
    },
    controller: n=>{
        const t = n.value
          , e = n.constraint
          , i = [n.params.x, n.params.y, n.params.z];
        return new be(n.document,{
            assembly: ko,
            axes: t.rawValue.getComponents().map((s,r)=>{
                var o;
                return $i({
                    constraint: e.components[r],
                    initialValue: s,
                    params: Ut(n.params, (o = i[r]) !== null && o !== void 0 ? o : {})
                })
            }
            ),
            parser: et,
            value: t,
            viewProps: n.viewProps
        })
    }
});
let pe = class {
    constructor(t=0, e=0, i=0, s=0) {
        this.x = t,
        this.y = e,
        this.z = i,
        this.w = s
    }
    getComponents() {
        return [this.x, this.y, this.z, this.w]
    }
    static isObject(t) {
        if (y(t))
            return !1;
        const e = t.x
          , i = t.y
          , s = t.z
          , r = t.w;
        return !(typeof e != "number" || typeof i != "number" || typeof s != "number" || typeof r != "number")
    }
    static equals(t, e) {
        return t.x === e.x && t.y === e.y && t.z === e.z && t.w === e.w
    }
    toObject() {
        return {
            x: this.x,
            y: this.y,
            z: this.z,
            w: this.w
        }
    }
}
;
const Vo = {
    toComponents: n=>n.getComponents(),
    fromComponents: n=>new pe(...n)
};
function Vh(n) {
    return pe.isObject(n) ? new pe(n.x,n.y,n.z,n.w) : new pe
}
function Sh(n, t) {
    n.writeProperty("x", t.x),
    n.writeProperty("y", t.y),
    n.writeProperty("z", t.z),
    n.writeProperty("w", t.w)
}
function $h(n, t) {
    return new An({
        assembly: Vo,
        components: [mt(Object.assign(Object.assign({}, n), n.x), t.x), mt(Object.assign(Object.assign({}, n), n.y), t.y), mt(Object.assign(Object.assign({}, n), n.z), t.z), mt(Object.assign(Object.assign({}, n), n.w), t.w)]
    })
}
M({
    id: "input-point4d",
    type: "input",
    accept: (n,t)=>{
        if (!pe.isObject(n))
            return null;
        const e = L(t, i=>Object.assign(Object.assign({}, Re(i)), {
            readonly: i.optional.constant(!1),
            w: i.optional.custom($t),
            x: i.optional.custom($t),
            y: i.optional.custom($t),
            z: i.optional.custom($t)
        }));
        return e ? {
            initialValue: n,
            params: e
        } : null
    }
    ,
    binding: {
        reader: n=>Vh,
        constraint: n=>$h(n.params, n.initialValue),
        equals: pe.equals,
        writer: n=>Sh
    },
    controller: n=>{
        const t = n.value
          , e = n.constraint
          , i = [n.params.x, n.params.y, n.params.z, n.params.w];
        return new be(n.document,{
            assembly: Vo,
            axes: t.rawValue.getComponents().map((s,r)=>{
                var o;
                return $i({
                    constraint: e.components[r],
                    initialValue: s,
                    params: Ut(n.params, (o = i[r]) !== null && o !== void 0 ? o : {})
                })
            }
            ),
            parser: et,
            value: t,
            viewProps: n.viewProps
        })
    }
});
function Lh(n) {
    const t = []
      , e = ji(n.options);
    return e && t.push(e),
    new ve(t)
}
M({
    id: "input-string",
    type: "input",
    accept: (n,t)=>{
        if (typeof n != "string")
            return null;
        const e = L(t, i=>({
            readonly: i.optional.constant(!1),
            options: i.optional.custom(Ln)
        }));
        return e ? {
            initialValue: n,
            params: e
        } : null
    }
    ,
    binding: {
        reader: n=>Fi,
        constraint: n=>Lh(n.params),
        writer: n=>Rt
    },
    controller: n=>{
        const t = n.document
          , e = n.value
          , i = n.constraint
          , s = i && De(i, $n);
        return s ? new ue(t,{
            props: new m({
                options: s.values.value("options")
            }),
            value: e,
            viewProps: n.viewProps
        }) : new Mn(t,{
            parser: r=>r,
            props: m.fromObject({
                formatter: li
            }),
            value: e,
            viewProps: n.viewProps
        })
    }
    ,
    api(n) {
        return typeof n.controller.value.rawValue != "string" ? null : n.controller.valueController instanceof ue ? new Bi(n.controller) : null
    }
});
const We = {
    monitor: {
        defaultInterval: 200,
        defaultRows: 3
    }
}
  , Js = v("mll");
let Mh = class {
    constructor(t, e) {
        this.onValueUpdate_ = this.onValueUpdate_.bind(this),
        this.formatter_ = e.formatter,
        this.element = t.createElement("div"),
        this.element.classList.add(Js()),
        e.viewProps.bindClassModifiers(this.element);
        const i = t.createElement("textarea");
        i.classList.add(Js("i")),
        i.style.height = `calc(var(${Qr("containerUnitSize")}) * ${e.rows})`,
        i.readOnly = !0,
        e.viewProps.bindDisabled(i),
        this.element.appendChild(i),
        this.textareaElem_ = i,
        e.value.emitter.on("change", this.onValueUpdate_),
        this.value = e.value,
        this.update_()
    }
    update_() {
        const t = this.textareaElem_
          , e = t.scrollTop === t.scrollHeight - t.clientHeight
          , i = [];
        this.value.rawValue.forEach(s=>{
            s !== void 0 && i.push(this.formatter_(s))
        }
        ),
        t.textContent = i.join(`
`),
        e && (t.scrollTop = t.scrollHeight)
    }
    onValueUpdate_() {
        this.update_()
    }
}
  , Yi = class {
    constructor(t, e) {
        this.value = e.value,
        this.viewProps = e.viewProps,
        this.view = new Mh(t,{
            formatter: e.formatter,
            rows: e.rows,
            value: this.value,
            viewProps: this.viewProps
        })
    }
}
;
const Qs = v("sgl");
let Th = class {
    constructor(t, e) {
        this.onValueUpdate_ = this.onValueUpdate_.bind(this),
        this.formatter_ = e.formatter,
        this.element = t.createElement("div"),
        this.element.classList.add(Qs()),
        e.viewProps.bindClassModifiers(this.element);
        const i = t.createElement("input");
        i.classList.add(Qs("i")),
        i.readOnly = !0,
        i.type = "text",
        e.viewProps.bindDisabled(i),
        this.element.appendChild(i),
        this.inputElement = i,
        e.value.emitter.on("change", this.onValueUpdate_),
        this.value = e.value,
        this.update_()
    }
    update_() {
        const t = this.value.rawValue
          , e = t[t.length - 1];
        this.inputElement.value = e !== void 0 ? this.formatter_(e) : ""
    }
    onValueUpdate_() {
        this.update_()
    }
}
  , Xi = class {
    constructor(t, e) {
        this.value = e.value,
        this.viewProps = e.viewProps,
        this.view = new Th(t,{
            formatter: e.formatter,
            value: this.value,
            viewProps: this.viewProps
        })
    }
}
;
M({
    id: "monitor-bool",
    type: "monitor",
    accept: (n,t)=>{
        if (typeof n != "boolean")
            return null;
        const e = L(t, i=>({
            readonly: i.required.constant(!0),
            rows: i.optional.number
        }));
        return e ? {
            initialValue: n,
            params: e
        } : null
    }
    ,
    binding: {
        reader: n=>Ii
    },
    controller: n=>{
        var t;
        return n.value.rawValue.length === 1 ? new Xi(n.document,{
            formatter: Us,
            value: n.value,
            viewProps: n.viewProps
        }) : new Yi(n.document,{
            formatter: Us,
            rows: (t = n.params.rows) !== null && t !== void 0 ? t : We.monitor.defaultRows,
            value: n.value,
            viewProps: n.viewProps
        })
    }
});
let Ah = class extends Li {
    get max() {
        return this.controller.valueController.props.get("max")
    }
    set max(t) {
        this.controller.valueController.props.set("max", t)
    }
    get min() {
        return this.controller.valueController.props.get("min")
    }
    set min(t) {
        this.controller.valueController.props.set("min", t)
    }
}
;
const yt = v("grl");
let Oh = class {
    constructor(t, e) {
        this.onCursorChange_ = this.onCursorChange_.bind(this),
        this.onValueUpdate_ = this.onValueUpdate_.bind(this),
        this.element = t.createElement("div"),
        this.element.classList.add(yt()),
        e.viewProps.bindClassModifiers(this.element),
        this.formatter_ = e.formatter,
        this.props_ = e.props,
        this.cursor_ = e.cursor,
        this.cursor_.emitter.on("change", this.onCursorChange_);
        const i = t.createElementNS(O, "svg");
        i.classList.add(yt("g")),
        i.style.height = `calc(var(${Qr("containerUnitSize")}) * ${e.rows})`,
        this.element.appendChild(i),
        this.svgElem_ = i;
        const s = t.createElementNS(O, "polyline");
        this.svgElem_.appendChild(s),
        this.lineElem_ = s;
        const r = t.createElement("div");
        r.classList.add(yt("t"), v("tt")()),
        this.element.appendChild(r),
        this.tooltipElem_ = r,
        e.value.emitter.on("change", this.onValueUpdate_),
        this.value = e.value,
        this.update_()
    }
    get graphElement() {
        return this.svgElem_
    }
    update_() {
        const t = this.svgElem_.getBoundingClientRect()
          , e = this.value.rawValue.length - 1
          , i = this.props_.get("min")
          , s = this.props_.get("max")
          , r = [];
        this.value.rawValue.forEach((h,u)=>{
            if (h === void 0)
                return;
            const N = d(u, 0, e, 0, t.width)
              , Bt = d(h, i, s, t.height, 0);
            r.push([N, Bt].join(","))
        }
        ),
        this.lineElem_.setAttributeNS(null, "points", r.join(" "));
        const o = this.tooltipElem_
          , a = this.value.rawValue[this.cursor_.rawValue];
        if (a === void 0) {
            o.classList.remove(yt("t", "a"));
            return
        }
        const l = d(this.cursor_.rawValue, 0, e, 0, t.width)
          , p = d(a, i, s, t.height, 0);
        o.style.left = `${l}px`,
        o.style.top = `${p}px`,
        o.textContent = `${this.formatter_(a)}`,
        o.classList.contains(yt("t", "a")) || (o.classList.add(yt("t", "a"), yt("t", "in")),
        dn(o),
        o.classList.remove(yt("t", "in")))
    }
    onValueUpdate_() {
        this.update_()
    }
    onCursorChange_() {
        this.update_()
    }
}
  , Zi = class {
    constructor(t, e) {
        if (this.onGraphMouseMove_ = this.onGraphMouseMove_.bind(this),
        this.onGraphMouseLeave_ = this.onGraphMouseLeave_.bind(this),
        this.onGraphPointerDown_ = this.onGraphPointerDown_.bind(this),
        this.onGraphPointerMove_ = this.onGraphPointerMove_.bind(this),
        this.onGraphPointerUp_ = this.onGraphPointerUp_.bind(this),
        this.props = e.props,
        this.value = e.value,
        this.viewProps = e.viewProps,
        this.cursor_ = $(-1),
        this.view = new Oh(t,{
            cursor: this.cursor_,
            formatter: e.formatter,
            rows: e.rows,
            props: this.props,
            value: this.value,
            viewProps: this.viewProps
        }),
        !yn(t))
            this.view.element.addEventListener("mousemove", this.onGraphMouseMove_),
            this.view.element.addEventListener("mouseleave", this.onGraphMouseLeave_);
        else {
            const i = new gt(this.view.element);
            i.emitter.on("down", this.onGraphPointerDown_),
            i.emitter.on("move", this.onGraphPointerMove_),
            i.emitter.on("up", this.onGraphPointerUp_)
        }
    }
    importProps(t) {
        return it(t, null, e=>({
            max: e.required.number,
            min: e.required.number
        }), e=>(this.props.set("max", e.max),
        this.props.set("min", e.min),
        !0))
    }
    exportProps() {
        return st(null, {
            max: this.props.get("max"),
            min: this.props.get("min")
        })
    }
    onGraphMouseLeave_() {
        this.cursor_.rawValue = -1
    }
    onGraphMouseMove_(t) {
        const e = this.view.element.getBoundingClientRect();
        this.cursor_.rawValue = Math.floor(d(t.offsetX, 0, e.width, 0, this.value.rawValue.length))
    }
    onGraphPointerDown_(t) {
        this.onGraphPointerMove_(t)
    }
    onGraphPointerMove_(t) {
        if (!t.data.point) {
            this.cursor_.rawValue = -1;
            return
        }
        this.cursor_.rawValue = Math.floor(d(t.data.point.x, 0, t.data.bounds.width, 0, this.value.rawValue.length))
    }
    onGraphPointerUp_() {
        this.cursor_.rawValue = -1
    }
}
;
function pi(n) {
    return y(n.format) ? R(2) : n.format
}
function Dh(n) {
    var t;
    return n.value.rawValue.length === 1 ? new Xi(n.document,{
        formatter: pi(n.params),
        value: n.value,
        viewProps: n.viewProps
    }) : new Yi(n.document,{
        formatter: pi(n.params),
        rows: (t = n.params.rows) !== null && t !== void 0 ? t : We.monitor.defaultRows,
        value: n.value,
        viewProps: n.viewProps
    })
}
function Rh(n) {
    var t, e, i;
    return new Zi(n.document,{
        formatter: pi(n.params),
        rows: (t = n.params.rows) !== null && t !== void 0 ? t : We.monitor.defaultRows,
        props: m.fromObject({
            max: (e = n.params.max) !== null && e !== void 0 ? e : 100,
            min: (i = n.params.min) !== null && i !== void 0 ? i : 0
        }),
        value: n.value,
        viewProps: n.viewProps
    })
}
function tr(n) {
    return n.view === "graph"
}
M({
    id: "monitor-number",
    type: "monitor",
    accept: (n,t)=>{
        if (typeof n != "number")
            return null;
        const e = L(t, i=>({
            format: i.optional.function,
            max: i.optional.number,
            min: i.optional.number,
            readonly: i.required.constant(!0),
            rows: i.optional.number,
            view: i.optional.string
        }));
        return e ? {
            initialValue: n,
            params: e
        } : null
    }
    ,
    binding: {
        defaultBufferSize: n=>tr(n) ? 64 : 1,
        reader: n=>yi
    },
    controller: n=>tr(n.params) ? Rh(n) : Dh(n),
    api: n=>n.controller.valueController instanceof Zi ? new Ah(n.controller) : null
});
M({
    id: "monitor-string",
    type: "monitor",
    accept: (n,t)=>{
        if (typeof n != "string")
            return null;
        const e = L(t, i=>({
            multiline: i.optional.boolean,
            readonly: i.required.constant(!0),
            rows: i.optional.number
        }));
        return e ? {
            initialValue: n,
            params: e
        } : null
    }
    ,
    binding: {
        reader: n=>Fi
    },
    controller: n=>{
        var t;
        const e = n.value;
        return e.rawValue.length > 1 || n.params.multiline ? new Yi(n.document,{
            formatter: li,
            rows: (t = n.params.rows) !== null && t !== void 0 ? t : We.monitor.defaultRows,
            value: e,
            viewProps: n.viewProps
        }) : new Xi(n.document,{
            formatter: li,
            value: e,
            viewProps: n.viewProps
        })
    }
});
class So {
    constructor(t) {
        this.controller_ = t
    }
    get disabled() {
        return this.controller_.viewProps.get("disabled")
    }
    set disabled(t) {
        this.controller_.viewProps.set("disabled", t)
    }
    get title() {
        var t;
        return (t = this.controller_.props.get("title")) !== null && t !== void 0 ? t : ""
    }
    set title(t) {
        this.controller_.props.set("title", t)
    }
    on(t, e) {
        const i = e.bind(this);
        return this.controller_.emitter.on(t, ()=>{
            i(new Jt(this))
        }
        ),
        this
    }
}
class Bh extends Jt {
    constructor(t, e, i) {
        super(t),
        this.cell = e,
        this.index = i
    }
}
class $o extends Zt {
    constructor(t) {
        super(t),
        this.cellToApiMap_ = new Map,
        this.emitter_ = new j;
        const e = this.controller.valueController;
        e.cellControllers.forEach((i,s)=>{
            const r = new So(i);
            this.cellToApiMap_.set(i, r),
            i.emitter.on("click", ()=>{
                const o = s % e.size[0]
                  , a = Math.floor(s / e.size[0]);
                this.emitter_.emit("click", {
                    event: new Bh(this,r,[o, a])
                })
            }
            )
        }
        )
    }
    cell(t, e) {
        const i = this.controller.valueController
          , s = i.cellControllers[e * i.size[0] + t];
        return this.cellToApiMap_.get(s)
    }
    on(t, e) {
        const i = e.bind(this);
        return this.emitter_.on(t, s=>{
            i(s.event)
        }
        ),
        this
    }
}
class Lo {
    constructor(t, e) {
        this.size = e.size;
        const [i,s] = this.size
          , r = [];
        for (let o = 0; o < s; o++)
            for (let a = 0; a < i; a++) {
                const l = new Gr(t,{
                    props: m.fromObject(Object.assign({}, e.cellConfig(a, o))),
                    viewProps: Ht.create()
                });
                r.push(l)
            }
        this.cellCs_ = r,
        this.viewProps = Ht.create(),
        this.viewProps.handleDispose(()=>{
            this.cellCs_.forEach(o=>{
                o.viewProps.set("disposed", !0)
            }
            )
        }
        ),
        this.view = new to(t,{
            viewProps: this.viewProps,
            viewName: "btngrid"
        }),
        this.view.element.style.gridTemplateColumns = `repeat(${i}, 1fr)`,
        this.cellCs_.forEach(o=>{
            this.view.element.appendChild(o.view.element)
        }
        )
    }
    get cellControllers() {
        return this.cellCs_
    }
}
class er extends He {
    constructor(t, e) {
        const i = e.valueController
          , s = new kn(t,{
            blade: e.blade,
            props: e.labelProps,
            valueController: i
        });
        super({
            blade: e.blade,
            view: s.view,
            viewProps: i.viewProps
        }),
        this.valueController = i,
        this.labelController = s
    }
}
const jh = M({
    id: "buttongrid",
    type: "blade",
    accept(n) {
        const t = L(n, e=>({
            cells: e.required.function,
            size: e.required.array(e.required.number),
            view: e.required.constant("buttongrid"),
            label: e.optional.string
        }));
        return t ? {
            params: t
        } : null
    },
    controller(n) {
        return new er(n.document,{
            blade: n.blade,
            labelProps: m.fromObject({
                label: n.params.label
            }),
            valueController: new Lo(n.document,{
                cellConfig: n.params.cells,
                size: n.params.size
            })
        })
    },
    api(n) {
        return n.controller instanceof er ? new $o(n.controller) : null
    }
});
class Mo extends Zt {
    get label() {
        return this.controller.labelController.props.get("label")
    }
    set label(t) {
        this.controller.labelController.props.set("label", t)
    }
    get value() {
        return this.controller.valueController.value.rawValue
    }
    set value(t) {
        this.controller.valueController.value.rawValue = t
    }
    on(t, e) {
        const i = e.bind(this);
        return this.controller.valueController.value.emitter.on(t, s=>{
            i(new Pn(this,s.rawValue,s.options.last))
        }
        ),
        this
    }
}
function Y(n, t, e) {
    return n * (1 - e) + t * e
}
const Nh = 20
  , Ih = .001
  , qn = 100;
function Fh(n, t) {
    let e = .25
      , i = .5
      , s = -1;
    for (let r = 0; r < Nh; r++) {
        const [o,a] = n.curve(i);
        if (i += e * (o < t ? 1 : -1),
        s = a,
        e *= .5,
        Math.abs(t - o) < Ih)
            break
    }
    return s
}
class At {
    constructor(t=0, e=0, i=1, s=1) {
        this.cache_ = [],
        this.comps_ = [t, e, i, s]
    }
    get x1() {
        return this.comps_[0]
    }
    get y1() {
        return this.comps_[1]
    }
    get x2() {
        return this.comps_[2]
    }
    get y2() {
        return this.comps_[3]
    }
    static isObject(t) {
        return y(t) || !Array.isArray(t) ? !1 : typeof t[0] == "number" && typeof t[1] == "number" && typeof t[2] == "number" && typeof t[3] == "number"
    }
    static equals(t, e) {
        return t.x1 === e.x1 && t.y1 === e.y1 && t.x2 === e.x2 && t.y2 === e.y2
    }
    curve(t) {
        const e = Y(0, this.x1, t)
          , i = Y(0, this.y1, t)
          , s = Y(this.x1, this.x2, t)
          , r = Y(this.y1, this.y2, t)
          , o = Y(this.x2, 1, t)
          , a = Y(this.y2, 1, t)
          , l = Y(e, s, t)
          , p = Y(i, r, t)
          , h = Y(s, o, t)
          , u = Y(r, a, t);
        return [Y(l, h, t), Y(p, u, t)]
    }
    y(t) {
        if (this.cache_.length === 0) {
            const e = [];
            for (let i = 0; i < qn; i++)
                e.push(Fh(this, d(i, 0, qn - 1, 0, 1)));
            this.cache_ = e
        }
        return this.cache_[Math.round(d(k(t, 0, 1), 0, 1, 0, qn - 1))]
    }
    toObject() {
        return [this.comps_[0], this.comps_[1], this.comps_[2], this.comps_[3]]
    }
}
const Ji = {
    toComponents: n=>n.toObject(),
    fromComponents: n=>new At(...n)
};
function zh(n) {
    const t = R(2);
    return `cubic-bezier(${n.toObject().map(i=>t(i)).join(", ")})`
}
const nr = [0, .5, .5, 1];
function Kh(n) {
    const t = n.match(/^cubic-bezier\s*\(\s*([0-9.]+)\s*,\s*([0-9.]+)\s*,\s*([0-9.]+)\s*,\s*([0-9.]+)\s*\)$/);
    if (!t)
        return new At(...nr);
    const e = [t[1], t[2], t[3], t[4]].reduce((i,s)=>{
        if (!i)
            return null;
        const r = Number(s);
        return isNaN(r) ? null : [...i, r]
    }
    , []);
    return new At(...e ?? nr)
}
const Nt = v("cbz");
class To {
    constructor(t, e) {
        this.element = t.createElement("div"),
        this.element.classList.add(Nt()),
        e.viewProps.bindClassModifiers(this.element),
        e.foldable.bindExpandedClass(this.element, Nt(void 0, "expanded")),
        tt(e.foldable, "completed", Dt(this.element, Nt(void 0, "cpl")));
        const i = t.createElement("div");
        i.classList.add(Nt("h")),
        this.element.appendChild(i);
        const s = t.createElement("button");
        s.classList.add(Nt("b")),
        e.viewProps.bindDisabled(s);
        const r = t.createElementNS(O, "svg");
        r.innerHTML = '<path d="M2 13C8 13 8 3 14 3"/>',
        s.appendChild(r),
        i.appendChild(s),
        this.buttonElement = s;
        const o = t.createElement("div");
        if (o.classList.add(Nt("t")),
        i.appendChild(o),
        this.textElement = o,
        e.pickerLayout === "inline") {
            const a = t.createElement("div");
            a.classList.add(Nt("p")),
            this.element.appendChild(a),
            this.pickerElement = a
        } else
            this.pickerElement = null
    }
}
const Gn = v("cbzp");
class Ao {
    constructor(t, e) {
        this.element = t.createElement("div"),
        this.element.classList.add(Gn()),
        e.viewProps.bindClassModifiers(this.element);
        const i = t.createElement("div");
        i.classList.add(Gn("g")),
        this.element.appendChild(i),
        this.graphElement = i;
        const s = t.createElement("div");
        s.classList.add(Gn("t")),
        this.element.appendChild(s),
        this.textElement = s
    }
}
function Oo(n, t) {
    const e = new MutationObserver(s=>{
        for (const r of s)
            r.type === "childList" && r.addedNodes.forEach(o=>{
                o.contains(o) && (t(),
                e.disconnect())
            }
            )
    }
    )
      , i = n.ownerDocument;
    e.observe(i.body, {
        attributes: !0,
        childList: !0,
        subtree: !0
    })
}
const Et = v("cbzg");
function Uh(n, t) {
    return e=>t(n(e))
}
class Do {
    constructor(t, e) {
        this.element = t.createElement("div"),
        this.element.classList.add(Et()),
        e.viewProps.bindClassModifiers(this.element),
        e.viewProps.bindTabIndex(this.element);
        const i = t.createElement("div");
        i.classList.add(Et("p")),
        this.element.appendChild(i),
        this.previewElement = i;
        const s = t.createElementNS(O, "svg");
        s.classList.add(Et("g")),
        this.element.appendChild(s),
        this.svgElem_ = s;
        const r = t.createElementNS(O, "path");
        r.classList.add(Et("u")),
        this.svgElem_.appendChild(r),
        this.guideElem_ = r;
        const o = t.createElementNS(O, "polyline");
        o.classList.add(Et("l")),
        this.svgElem_.appendChild(o),
        this.lineElem_ = o,
        this.handleElems_ = [t.createElement("div"), t.createElement("div")],
        this.handleElems_.forEach(a=>{
            a.classList.add(Et("h")),
            this.element.appendChild(a)
        }
        ),
        this.vectorElems_ = [t.createElementNS(O, "line"), t.createElementNS(O, "line")],
        this.vectorElems_.forEach(a=>{
            a.classList.add(Et("v")),
            this.svgElem_.appendChild(a)
        }
        ),
        this.value_ = e.value,
        this.value_.emitter.on("change", this.onValueChange_.bind(this)),
        this.sel_ = e.selection,
        this.handleElems_.forEach((a,l)=>{
            Q(this.sel_, Uh(p=>p === l, Dt(a, Et("h", "sel"))))
        }
        ),
        Oo(this.element, ()=>{
            this.refresh()
        }
        )
    }
    getVertMargin_(t) {
        return t * .25
    }
    valueToPosition(t, e) {
        const {clientWidth: i, clientHeight: s} = this.element
          , r = this.getVertMargin_(s);
        return {
            x: d(t, 0, 1, 0, i),
            y: d(e, 0, 1, s - r, r)
        }
    }
    positionToValue(t, e) {
        const i = this.element.getBoundingClientRect()
          , s = i.width
          , r = i.height
          , o = this.getVertMargin_(r);
        return {
            x: k(d(t, 0, s, 0, 1), 0, 1),
            y: d(e, r - o, o, 0, 1)
        }
    }
    refresh() {
        this.guideElem_.setAttributeNS(null, "d", [0, 1].map(r=>{
            const o = this.valueToPosition(0, r)
              , a = this.valueToPosition(1, r);
            return [`M ${o.x},${o.y}`, `L ${a.x},${a.y}`].join(" ")
        }
        ).join(" "));
        const t = this.value_.rawValue
          , e = [];
        let i = 0;
        for (; ; ) {
            const r = this.valueToPosition(...t.curve(i));
            if (e.push([r.x, r.y].join(",")),
            i >= 1)
                break;
            i = Math.min(i + .05, 1)
        }
        this.lineElem_.setAttributeNS(null, "points", e.join(" "));
        const s = t.toObject();
        [0, 1].forEach(r=>{
            const o = this.valueToPosition(r, r)
              , a = this.valueToPosition(s[r * 2], s[r * 2 + 1])
              , l = this.vectorElems_[r];
            l.setAttributeNS(null, "x1", String(o.x)),
            l.setAttributeNS(null, "y1", String(o.y)),
            l.setAttributeNS(null, "x2", String(a.x)),
            l.setAttributeNS(null, "y2", String(a.y));
            const p = this.handleElems_[r];
            p.style.left = `${a.x}px`,
            p.style.top = `${a.y}px`
        }
        )
    }
    onValueChange_() {
        this.refresh()
    }
}
const ir = 24
  , sr = 400
  , rr = 1e3
  , se = v("cbzprv");
class Ro {
    constructor(t, e) {
        this.stopped_ = !0,
        this.startTime_ = -1,
        this.onDispose_ = this.onDispose_.bind(this),
        this.onTimer_ = this.onTimer_.bind(this),
        this.onValueChange_ = this.onValueChange_.bind(this),
        this.element = t.createElement("div"),
        this.element.classList.add(se()),
        e.viewProps.bindClassModifiers(this.element);
        const i = t.createElementNS(O, "svg");
        i.classList.add(se("g")),
        this.element.appendChild(i),
        this.svgElem_ = i;
        const s = t.createElementNS(O, "path");
        s.classList.add(se("t")),
        this.svgElem_.appendChild(s),
        this.ticksElem_ = s;
        const r = t.createElement("div");
        r.classList.add(se("m")),
        this.element.appendChild(r),
        this.markerElem_ = r,
        this.value_ = e.value,
        this.value_.emitter.on("change", this.onValueChange_),
        e.viewProps.handleDispose(this.onDispose_),
        Oo(this.element, ()=>{
            this.refresh()
        }
        )
    }
    play() {
        this.stop(),
        this.updateMarker_(0),
        this.markerElem_.classList.add(se("m", "a")),
        this.startTime_ = new Date().getTime() + sr,
        this.stopped_ = !1,
        requestAnimationFrame(this.onTimer_)
    }
    stop() {
        this.stopped_ = !0,
        this.markerElem_.classList.remove(se("m", "a"))
    }
    onDispose_() {
        this.stop()
    }
    updateMarker_(t) {
        const e = this.value_.rawValue.y(k(t, 0, 1));
        this.markerElem_.style.left = `${e * 100}%`
    }
    refresh() {
        const {clientWidth: t, clientHeight: e} = this.svgElem_
          , i = []
          , s = this.value_.rawValue;
        for (let r = 0; r < ir; r++) {
            const o = d(r, 0, ir - 1, 0, 1)
              , a = d(s.y(o), 0, 1, 0, t);
            i.push(`M ${a},0 v${e}`)
        }
        this.ticksElem_.setAttributeNS(null, "d", i.join(" "))
    }
    onTimer_() {
        if (this.startTime_ === null)
            return;
        const t = new Date().getTime() - this.startTime_
          , e = t / rr;
        this.updateMarker_(e),
        t > rr + sr && this.stop(),
        this.stopped_ || requestAnimationFrame(this.onTimer_)
    }
    onValueChange_() {
        this.refresh(),
        this.play()
    }
}
function ci(n, t, e, i) {
    const s = e - n
      , r = i - t;
    return Math.sqrt(s * s + r * r)
}
function Hh(n, t, e, i) {
    const s = ci(n, t, e, i)
      , r = Math.atan2(i - t, e - n)
      , o = Math.round(r / (Math.PI / 4)) * Math.PI / 4;
    return {
        x: n + Math.cos(o) * s,
        y: t + Math.sin(o) * s
    }
}
class Bo {
    constructor(t, e) {
        this.onKeyDown_ = this.onKeyDown_.bind(this),
        this.onKeyUp_ = this.onKeyUp_.bind(this),
        this.onPointerDown_ = this.onPointerDown_.bind(this),
        this.onPointerMove_ = this.onPointerMove_.bind(this),
        this.onPointerUp_ = this.onPointerUp_.bind(this),
        this.keyScale_ = e.keyScale,
        this.value = e.value,
        this.sel_ = $(0),
        this.viewProps = e.viewProps,
        this.view = new Do(t,{
            selection: this.sel_,
            value: this.value,
            viewProps: this.viewProps
        }),
        this.view.element.addEventListener("keydown", this.onKeyDown_),
        this.view.element.addEventListener("keyup", this.onKeyUp_),
        this.prevView_ = new Ro(t,{
            value: this.value,
            viewProps: this.viewProps
        }),
        this.prevView_.element.addEventListener("mousedown", s=>{
            s.stopImmediatePropagation(),
            s.preventDefault(),
            this.prevView_.play()
        }
        ),
        this.view.previewElement.appendChild(this.prevView_.element);
        const i = new gt(this.view.element);
        i.emitter.on("down", this.onPointerDown_),
        i.emitter.on("move", this.onPointerMove_),
        i.emitter.on("up", this.onPointerUp_)
    }
    refresh() {
        this.view.refresh(),
        this.prevView_.refresh(),
        this.prevView_.play()
    }
    updateValue_(t, e, i) {
        const s = this.sel_.rawValue
          , r = this.value.rawValue.toObject()
          , o = this.view.positionToValue(t.x, t.y)
          , a = e ? Hh(s, s, o.x, o.y) : o;
        r[s * 2] = a.x,
        r[s * 2 + 1] = a.y,
        this.value.setRawValue(new At(...r), i)
    }
    onPointerDown_(t) {
        const e = t.data;
        if (!e.point)
            return;
        const i = this.value.rawValue
          , s = this.view.valueToPosition(i.x1, i.y1)
          , r = ci(e.point.x, e.point.y, s.x, s.y)
          , o = this.view.valueToPosition(i.x2, i.y2)
          , a = ci(e.point.x, e.point.y, o.x, o.y);
        this.sel_.rawValue = r <= a ? 0 : 1,
        this.updateValue_(e.point, t.shiftKey, {
            forceEmit: !1,
            last: !1
        })
    }
    onPointerMove_(t) {
        const e = t.data;
        e.point && this.updateValue_(e.point, t.shiftKey, {
            forceEmit: !1,
            last: !1
        })
    }
    onPointerUp_(t) {
        const e = t.data;
        e.point && this.updateValue_(e.point, t.shiftKey, {
            forceEmit: !0,
            last: !0
        })
    }
    onKeyDown_(t) {
        bn(t.key) && t.preventDefault();
        const e = this.sel_.rawValue
          , i = this.value.rawValue.toObject()
          , s = this.keyScale_.rawValue;
        i[e * 2] += D(s, nt(t)),
        i[e * 2 + 1] += D(s, qt(t)),
        this.value.setRawValue(new At(...i), {
            forceEmit: !1,
            last: !1
        })
    }
    onKeyUp_(t) {
        bn(t.key) && t.preventDefault();
        const e = this.keyScale_.rawValue
          , i = D(e, nt(t))
          , s = D(e, qt(t));
        i === 0 && s === 0 || this.value.setRawValue(this.value.rawValue, {
            forceEmit: !0,
            last: !0
        })
    }
}
class jo {
    constructor(t, e) {
        this.value = e.value,
        this.viewProps = e.viewProps,
        this.view = new Ao(t,{
            viewProps: this.viewProps
        }),
        this.gc_ = new Bo(t,{
            keyScale: e.axis.textProps.value("keyScale"),
            value: this.value,
            viewProps: this.viewProps
        }),
        this.view.graphElement.appendChild(this.gc_.view.element);
        const i = Object.assign(Object.assign({}, e.axis), {
            constraint: new Ci({
                max: 1,
                min: 0
            })
        })
          , s = Object.assign(Object.assign({}, e.axis), {
            constraint: void 0
        });
        this.tc_ = new be(t,{
            assembly: Ji,
            axes: [i, s, i, s],
            parser: et,
            value: this.value,
            viewProps: this.viewProps
        }),
        this.view.textElement.appendChild(this.tc_.view.element)
    }
    get allFocusableElements() {
        return [this.gc_.view.element, ...this.tc_.view.textViews.map(t=>t.inputElement)]
    }
    refresh() {
        this.gc_.refresh()
    }
}
class hi {
    constructor(t, e) {
        this.onButtonBlur_ = this.onButtonBlur_.bind(this),
        this.onButtonClick_ = this.onButtonClick_.bind(this),
        this.onPopupChildBlur_ = this.onPopupChildBlur_.bind(this),
        this.onPopupChildKeydown_ = this.onPopupChildKeydown_.bind(this),
        this.value = e.value,
        this.viewProps = e.viewProps,
        this.foldable_ = Vn.create(e.expanded),
        this.view = new To(t,{
            foldable: this.foldable_,
            pickerLayout: e.pickerLayout,
            viewProps: this.viewProps
        }),
        this.view.buttonElement.addEventListener("blur", this.onButtonBlur_),
        this.view.buttonElement.addEventListener("click", this.onButtonClick_),
        this.tc_ = new Mn(t,{
            parser: Kh,
            props: m.fromObject({
                formatter: zh
            }),
            value: this.value,
            viewProps: this.viewProps
        }),
        this.view.textElement.appendChild(this.tc_.view.element),
        this.popC_ = e.pickerLayout === "popup" ? new Ni(t,{
            viewProps: this.viewProps
        }) : null;
        const i = new jo(t,{
            axis: e.axis,
            value: this.value,
            viewProps: this.viewProps
        });
        i.allFocusableElements.forEach(s=>{
            s.addEventListener("blur", this.onPopupChildBlur_),
            s.addEventListener("keydown", this.onPopupChildKeydown_)
        }
        ),
        this.pickerC_ = i,
        this.popC_ ? (this.view.element.appendChild(this.popC_.view.element),
        this.popC_.view.element.appendChild(this.pickerC_.view.element),
        Q(this.popC_.shows, s=>{
            s && i.refresh()
        }
        ),
        Qt({
            primary: this.foldable_.value("expanded"),
            secondary: this.popC_.shows,
            forward: s=>s,
            backward: (s,r)=>r
        })) : this.view.pickerElement && (this.view.pickerElement.appendChild(this.pickerC_.view.element),
        Sn(this.foldable_, this.view.pickerElement))
    }
    onButtonBlur_(t) {
        if (!this.popC_)
            return;
        const e = t.relatedTarget;
        (!e || !this.popC_.view.element.contains(e)) && (this.popC_.shows.rawValue = !1)
    }
    onButtonClick_() {
        this.foldable_.set("expanded", !this.foldable_.get("expanded")),
        this.foldable_.get("expanded") && this.pickerC_.allFocusableElements[0].focus()
    }
    onPopupChildBlur_(t) {
        if (!this.popC_)
            return;
        const e = this.popC_.view.element
          , i = Ti(t);
        i && e.contains(i) || i && i === this.view.buttonElement && !yn(e.ownerDocument) || (this.popC_.shows.rawValue = !1)
    }
    onPopupChildKeydown_(t) {
        this.popC_ && t.key === "Escape" && (this.popC_.shows.rawValue = !1)
    }
}
function qh() {
    return new An({
        assembly: Ji,
        components: [0, 1, 2, 3].map(n=>n % 2 === 0 ? new Ci({
            min: 0,
            max: 1
        }) : void 0)
    })
}
const Gh = M({
    id: "cubicbezier",
    type: "blade",
    accept(n) {
        const t = L(n, e=>({
            value: e.required.array(e.required.number),
            view: e.required.constant("cubicbezier"),
            expanded: e.optional.boolean,
            label: e.optional.string,
            picker: e.optional.custom(i=>i === "inline" || i === "popup" ? i : void 0)
        }));
        return t ? {
            params: t
        } : null
    },
    controller(n) {
        var t, e;
        const i = new At(...n.params.value)
          , s = $(i, {
            constraint: qh(),
            equals: At.equals
        })
          , r = new hi(n.document,{
            axis: {
                textProps: m.fromObject({
                    keyScale: .1,
                    pointerScale: .01,
                    formatter: R(2)
                })
            },
            expanded: (t = n.params.expanded) !== null && t !== void 0 ? t : !1,
            pickerLayout: (e = n.params.picker) !== null && e !== void 0 ? e : "popup",
            value: s,
            viewProps: n.viewProps
        });
        return new mn(n.document,{
            blade: n.blade,
            props: m.fromObject({
                label: n.params.label
            }),
            value: s,
            valueController: r
        })
    },
    api(n) {
        return !(n.controller instanceof mn) || !(n.controller.valueController instanceof hi) ? null : new Mo(n.controller)
    }
});
class No extends Zt {
    get fps() {
        return this.controller.valueController.fps
    }
    get max() {
        return this.controller.valueController.props.get("max")
    }
    set max(t) {
        this.controller.valueController.props.set("max", t)
    }
    get min() {
        return this.controller.valueController.props.get("min")
    }
    set min(t) {
        this.controller.valueController.props.set("min", t)
    }
    begin() {
        this.controller.valueController.begin()
    }
    end() {
        this.controller.valueController.end()
    }
    on(t, e) {
        const i = e.bind(this);
        return this.controller.valueController.ticker.emitter.on(t, ()=>{
            i(new Jt(this))
        }
        ),
        this
    }
}
const or = 20;
class Io {
    constructor() {
        this.start_ = null,
        this.duration_ = 0,
        this.fps_ = null,
        this.frameCount_ = 0,
        this.timestamps_ = []
    }
    get duration() {
        return this.duration_
    }
    get fps() {
        return this.fps_
    }
    begin(t) {
        this.start_ = t.getTime()
    }
    calculateFps_(t) {
        if (this.timestamps_.length === 0)
            return null;
        const e = this.timestamps_[0];
        return 1e3 * (this.frameCount_ - e.frameCount) / (t - e.time)
    }
    compactTimestamps_() {
        if (this.timestamps_.length <= or)
            return;
        const t = this.timestamps_.length - or;
        this.timestamps_.splice(0, t);
        const e = this.timestamps_[0].frameCount;
        this.timestamps_.forEach(i=>{
            i.frameCount -= e
        }
        ),
        this.frameCount_ -= e
    }
    end(t) {
        if (this.start_ === null)
            return;
        const e = t.getTime();
        this.duration_ = e - this.start_,
        this.start_ = null,
        this.fps_ = this.calculateFps_(e),
        this.timestamps_.push({
            frameCount: this.frameCount_,
            time: e
        }),
        ++this.frameCount_,
        this.compactTimestamps_()
    }
}
const Ve = v("fps");
class Fo {
    constructor(t, e) {
        this.element = t.createElement("div"),
        this.element.classList.add(Ve()),
        e.viewProps.bindClassModifiers(this.element),
        this.graphElement = t.createElement("div"),
        this.graphElement.classList.add(Ve("g")),
        this.element.appendChild(this.graphElement);
        const i = t.createElement("div");
        i.classList.add(Ve("l")),
        this.element.appendChild(i);
        const s = t.createElement("span");
        s.classList.add(Ve("v")),
        s.textContent = "--",
        i.appendChild(s),
        this.valueElement = s;
        const r = t.createElement("span");
        r.classList.add(Ve("u")),
        r.textContent = "FPS",
        i.appendChild(r)
    }
}
class zo {
    constructor(t, e) {
        this.stopwatch_ = new Io,
        this.onTick_ = this.onTick_.bind(this),
        this.ticker = e.ticker,
        this.ticker.emitter.on("tick", this.onTick_),
        this.props = e.props,
        this.value_ = e.value,
        this.viewProps = e.viewProps,
        this.view = new Fo(t,{
            viewProps: this.viewProps
        }),
        this.graphC_ = new Zi(t,{
            formatter: R(0),
            props: this.props,
            rows: e.rows,
            value: this.value_,
            viewProps: this.viewProps
        }),
        this.view.graphElement.appendChild(this.graphC_.view.element),
        this.viewProps.handleDispose(()=>{
            this.graphC_.viewProps.set("disposed", !0),
            this.ticker.dispose()
        }
        )
    }
    get fps() {
        return this.stopwatch_.fps
    }
    begin() {
        this.stopwatch_.begin(new Date)
    }
    end() {
        this.stopwatch_.end(new Date)
    }
    onTick_() {
        const t = this.fps;
        if (t !== null) {
            const e = this.value_.rawValue;
            this.value_.rawValue = sp(e, t),
            this.view.valueElement.textContent = t.toFixed(0)
        }
    }
}
class ar extends He {
    constructor(t, e) {
        const i = e.valueController
          , s = new kn(t,{
            blade: e.blade,
            props: e.labelProps,
            valueController: i
        });
        super({
            blade: e.blade,
            view: s.view,
            viewProps: i.viewProps
        }),
        this.valueController = i,
        this.labelController = s
    }
}
function Wh(n, t) {
    return t === 0 ? new Mp : new Tp(n,t ?? We.monitor.defaultInterval)
}
const Yh = M({
    id: "fpsgraph",
    type: "blade",
    accept(n) {
        const t = L(n, e=>({
            view: e.required.constant("fpsgraph"),
            interval: e.optional.number,
            label: e.optional.string,
            rows: e.optional.number,
            max: e.optional.number,
            min: e.optional.number
        }));
        return t ? {
            params: t
        } : null
    },
    controller(n) {
        var t, e, i, s;
        const r = (t = n.params.interval) !== null && t !== void 0 ? t : 500;
        return new ar(n.document,{
            blade: n.blade,
            labelProps: m.fromObject({
                label: n.params.label
            }),
            valueController: new zo(n.document,{
                props: m.fromObject({
                    max: (e = n.params.max) !== null && e !== void 0 ? e : 90,
                    min: (i = n.params.min) !== null && i !== void 0 ? i : 0
                }),
                rows: (s = n.params.rows) !== null && s !== void 0 ? s : 2,
                ticker: Wh(n.document, r),
                value: $(np(80)),
                viewProps: n.viewProps
            })
        })
    },
    api(n) {
        return n.controller instanceof ar ? new No(n.controller) : null
    }
});
class H {
    constructor(t, e) {
        this.min = t,
        this.max = e
    }
    static isObject(t) {
        if (typeof t != "object" || t === null)
            return !1;
        const e = t.min
          , i = t.max;
        return !(typeof e != "number" || typeof i != "number")
    }
    static equals(t, e) {
        return t.min === e.min && t.max === e.max
    }
    get length() {
        return this.max - this.min
    }
    toObject() {
        return {
            min: this.min,
            max: this.max
        }
    }
}
const Qi = {
    fromComponents: n=>new H(n[0],n[1]),
    toComponents: n=>[n.min, n.max]
};
class ts {
    constructor(t) {
        this.edge = t
    }
    constrain(t) {
        var e, i, s, r, o, a, l, p;
        if (t.min <= t.max)
            return new H((i = (e = this.edge) === null || e === void 0 ? void 0 : e.constrain(t.min)) !== null && i !== void 0 ? i : t.min,(r = (s = this.edge) === null || s === void 0 ? void 0 : s.constrain(t.max)) !== null && r !== void 0 ? r : t.max);
        const h = (t.min + t.max) / 2;
        return new H((a = (o = this.edge) === null || o === void 0 ? void 0 : o.constrain(h)) !== null && a !== void 0 ? a : h,(p = (l = this.edge) === null || l === void 0 ? void 0 : l.constrain(h)) !== null && p !== void 0 ? p : h)
    }
}
const Wn = v("rsltxt");
class Ko {
    constructor(t, e) {
        this.sliderView_ = e.sliderView,
        this.textView_ = e.textView,
        this.element = t.createElement("div"),
        this.element.classList.add(Wn());
        const i = t.createElement("div");
        i.classList.add(Wn("s")),
        i.appendChild(this.sliderView_.element),
        this.element.appendChild(i);
        const s = t.createElement("div");
        s.classList.add(Wn("t")),
        s.appendChild(this.textView_.element),
        this.element.appendChild(s)
    }
}
const It = v("rsl");
class Uo {
    constructor(t, e) {
        this.onSliderPropsChange_ = this.onSliderPropsChange_.bind(this),
        this.onValueChange_ = this.onValueChange_.bind(this),
        this.sliderProps_ = e.sliderProps,
        this.sliderProps_.emitter.on("change", this.onSliderPropsChange_),
        this.element = t.createElement("div"),
        this.element.classList.add(It()),
        e.viewProps.bindClassModifiers(this.element),
        this.value_ = e.value,
        this.value_.emitter.on("change", this.onValueChange_);
        const i = t.createElement("div");
        i.classList.add(It("t")),
        this.element.appendChild(i),
        this.trackElement = i;
        const s = t.createElement("div");
        s.classList.add(It("b")),
        i.appendChild(s),
        this.barElement = s;
        const r = ["min", "max"].map(o=>{
            const a = t.createElement("div");
            return a.classList.add(It("k"), It("k", o)),
            i.appendChild(a),
            a
        }
        );
        this.knobElements = [r[0], r[1]],
        this.update_()
    }
    valueToX_(t) {
        const e = this.sliderProps_.get("min")
          , i = this.sliderProps_.get("max");
        return k(d(t, e, i, 0, 1), 0, 1) * 100
    }
    update_() {
        const t = this.value_.rawValue;
        t.length === 0 ? this.element.classList.add(It(void 0, "zero")) : this.element.classList.remove(It(void 0, "zero"));
        const e = [this.valueToX_(t.min), this.valueToX_(t.max)];
        this.barElement.style.left = `${e[0]}%`,
        this.barElement.style.right = `${100 - e[1]}%`,
        this.knobElements.forEach((i,s)=>{
            i.style.left = `${e[s]}%`
        }
        )
    }
    onSliderPropsChange_() {
        this.update_()
    }
    onValueChange_() {
        this.update_()
    }
}
class Ho {
    constructor(t, e) {
        this.grabbing_ = null,
        this.grabOffset_ = 0,
        this.onPointerDown_ = this.onPointerDown_.bind(this),
        this.onPointerMove_ = this.onPointerMove_.bind(this),
        this.onPointerUp_ = this.onPointerUp_.bind(this),
        this.sliderProps = e.sliderProps,
        this.viewProps = e.viewProps,
        this.value = e.value,
        this.view = new Uo(t,{
            sliderProps: this.sliderProps,
            value: this.value,
            viewProps: e.viewProps
        });
        const i = new gt(this.view.trackElement);
        i.emitter.on("down", this.onPointerDown_),
        i.emitter.on("move", this.onPointerMove_),
        i.emitter.on("up", this.onPointerUp_)
    }
    ofs_() {
        return this.grabbing_ === "min" ? this.view.knobElements[0].getBoundingClientRect().width / 2 : this.grabbing_ === "max" ? -this.view.knobElements[1].getBoundingClientRect().width / 2 : 0
    }
    valueFromData_(t) {
        if (!t.point)
            return null;
        const e = (t.point.x + this.ofs_()) / t.bounds.width
          , i = this.sliderProps.get("min")
          , s = this.sliderProps.get("max");
        return d(e, 0, 1, i, s)
    }
    onPointerDown_(t) {
        if (!t.data.point)
            return;
        const e = t.data.point.x / t.data.bounds.width
          , i = this.value.rawValue
          , s = this.sliderProps.get("min")
          , r = this.sliderProps.get("max")
          , o = d(i.min, s, r, 0, 1)
          , a = d(i.max, s, r, 0, 1);
        Math.abs(a - e) <= .025 ? this.grabbing_ = "max" : Math.abs(o - e) <= .025 ? this.grabbing_ = "min" : e >= o && e <= a ? (this.grabbing_ = "length",
        this.grabOffset_ = d(e - o, 0, 1, 0, r - s)) : e < o ? (this.grabbing_ = "min",
        this.onPointerMove_(t)) : e > a && (this.grabbing_ = "max",
        this.onPointerMove_(t))
    }
    applyPointToValue_(t, e) {
        const i = this.valueFromData_(t);
        if (i === null)
            return;
        const s = this.sliderProps.get("min")
          , r = this.sliderProps.get("max");
        if (this.grabbing_ === "min")
            this.value.setRawValue(new H(i,this.value.rawValue.max), e);
        else if (this.grabbing_ === "max")
            this.value.setRawValue(new H(this.value.rawValue.min,i), e);
        else if (this.grabbing_ === "length") {
            const o = this.value.rawValue.length;
            let a = i - this.grabOffset_
              , l = a + o;
            a < s ? (a = s,
            l = s + o) : l > r && (a = r - o,
            l = r),
            this.value.setRawValue(new H(a,l), e)
        }
    }
    onPointerMove_(t) {
        this.applyPointToValue_(t.data, {
            forceEmit: !1,
            last: !1
        })
    }
    onPointerUp_(t) {
        this.applyPointToValue_(t.data, {
            forceEmit: !0,
            last: !0
        }),
        this.grabbing_ = null
    }
}
class qo {
    constructor(t, e) {
        this.value = e.value,
        this.viewProps = e.viewProps,
        this.sc_ = new Ho(t,e);
        const i = {
            constraint: e.constraint,
            textProps: e.textProps
        };
        this.tc_ = new be(t,{
            assembly: Qi,
            axes: [i, i],
            parser: e.parser,
            value: this.value,
            viewProps: e.viewProps
        }),
        this.view = new Ko(t,{
            sliderView: this.sc_.view,
            textView: this.tc_.view
        })
    }
    get textController() {
        return this.tc_
    }
}
function Xh(n) {
    return H.isObject(n) ? new H(n.min,n.max) : new H(0,0)
}
function Zh(n, t) {
    n.writeProperty("max", t.max),
    n.writeProperty("min", t.min)
}
function Jh(n) {
    const t = []
      , e = ki(n);
    e && t.push(e);
    const i = Ei(n);
    return i && t.push(i),
    new ts(new ve(t))
}
const Qh = M({
    id: "input-interval",
    type: "input",
    accept: (n,t)=>{
        if (!H.isObject(n))
            return null;
        const e = L(t, i=>Object.assign(Object.assign({}, Si(i)), {
            readonly: i.optional.constant(!1)
        }));
        return e ? {
            initialValue: new H(n.min,n.max),
            params: e
        } : null
    }
    ,
    binding: {
        reader: n=>Xh,
        constraint: n=>Jh(n.params),
        equals: H.equals,
        writer: n=>Zh
    },
    controller(n) {
        const t = n.value
          , e = n.constraint;
        if (!(e instanceof ts))
            throw ft.shouldNeverHappen();
        const i = (t.rawValue.min + t.rawValue.max) / 2
          , s = m.fromObject(Vi(n.params, i))
          , r = e.edge && De(e.edge, Ue);
        if (r)
            return new qo(n.document,{
                constraint: e.edge,
                parser: et,
                sliderProps: new m({
                    keyScale: s.value("keyScale"),
                    max: r.values.value("max"),
                    min: r.values.value("min")
                }),
                textProps: s,
                value: t,
                viewProps: n.viewProps
            });
        const o = {
            constraint: e.edge,
            textProps: s
        };
        return new be(n.document,{
            assembly: Qi,
            axes: [o, o],
            parser: et,
            value: t,
            viewProps: n.viewProps
        })
    }
});
class Go {
    constructor(t) {
        this.controller_ = t
    }
    get disabled() {
        return this.controller_.viewProps.get("disabled")
    }
    set disabled(t) {
        this.controller_.viewProps.set("disabled", t)
    }
    get title() {
        var t;
        return (t = this.controller_.props.get("title")) !== null && t !== void 0 ? t : ""
    }
    set title(t) {
        this.controller_.props.set("title", t)
    }
}
class Wo extends Pn {
    constructor(t, e, i, s, r) {
        super(t, s, r),
        this.cell = e,
        this.index = i
    }
}
class Yo extends Zt {
    constructor(t) {
        super(t),
        this.cellToApiMap_ = new Map,
        this.controller.valueController.cellControllers.forEach(i=>{
            const s = new Go(i);
            this.cellToApiMap_.set(i, s)
        }
        )
    }
    get value() {
        return this.controller.value
    }
    cell(t, e) {
        const i = this.controller.valueController
          , s = i.cellControllers[e * i.size[0] + t];
        return this.cellToApiMap_.get(s)
    }
    on(t, e) {
        const i = e.bind(this);
        this.controller.value.emitter.on(t, s=>{
            const r = this.controller.valueController
              , o = r.findCellByValue(s.rawValue);
            if (!o)
                return;
            const a = this.cellToApiMap_.get(o);
            if (!a)
                return;
            const l = r.cellControllers.indexOf(o);
            i(new Wo(this,a,[l % r.size[0], Math.floor(l / r.size[0])],s.rawValue))
        }
        )
    }
}
const Se = v("rad");
class Xo {
    constructor(t, e) {
        this.element = t.createElement("div"),
        this.element.classList.add(Se()),
        e.viewProps.bindClassModifiers(this.element);
        const i = t.createElement("label");
        i.classList.add(Se("l")),
        this.element.appendChild(i);
        const s = t.createElement("input");
        s.classList.add(Se("i")),
        s.name = e.name,
        s.type = "radio",
        e.viewProps.bindDisabled(s),
        i.appendChild(s),
        this.inputElement = s;
        const r = t.createElement("div");
        r.classList.add(Se("b")),
        i.appendChild(r);
        const o = t.createElement("div");
        o.classList.add(Se("t")),
        r.appendChild(o),
        tt(e.props, "title", a=>{
            o.textContent = a
        }
        )
    }
}
class Zo {
    constructor(t, e) {
        this.props = e.props,
        this.viewProps = e.viewProps,
        this.view = new Xo(t,{
            name: e.name,
            props: this.props,
            viewProps: this.viewProps
        })
    }
}
class fn {
    constructor(t, e) {
        this.cellCs_ = [],
        this.cellValues_ = [],
        this.onCellInputChange_ = this.onCellInputChange_.bind(this),
        this.size = e.size;
        const [i,s] = this.size;
        for (let r = 0; r < s; r++)
            for (let o = 0; o < i; o++) {
                const a = new Zo(t,{
                    name: e.groupName,
                    props: m.fromObject(Object.assign({}, e.cellConfig(o, r))),
                    viewProps: Ht.create()
                });
                this.cellCs_.push(a),
                this.cellValues_.push(e.cellConfig(o, r).value)
            }
        this.value = e.value,
        Q(this.value, r=>{
            const o = this.findCellByValue(r);
            o && (o.view.inputElement.checked = !0)
        }
        ),
        this.viewProps = Ht.create(),
        this.view = new to(t,{
            viewProps: this.viewProps,
            viewName: "radgrid"
        }),
        this.view.element.style.gridTemplateColumns = `repeat(${i}, 1fr)`,
        this.cellCs_.forEach(r=>{
            r.view.inputElement.addEventListener("change", this.onCellInputChange_),
            this.view.element.appendChild(r.view.element)
        }
        )
    }
    get cellControllers() {
        return this.cellCs_
    }
    findCellByValue(t) {
        const e = this.cellValues_.findIndex(i=>i === t);
        return e < 0 ? null : this.cellCs_[e]
    }
    onCellInputChange_(t) {
        const e = t.currentTarget
          , i = this.cellCs_.findIndex(s=>s.view.inputElement === e);
        i < 0 || (this.value.rawValue = this.cellValues_[i])
    }
}
const tu = function() {
    return M({
        id: "radiogrid",
        type: "blade",
        accept(n) {
            const t = L(n, e=>({
                cells: e.required.function,
                groupName: e.required.string,
                size: e.required.array(e.required.number),
                value: e.required.raw,
                view: e.required.constant("radiogrid"),
                label: e.optional.string
            }));
            return t ? {
                params: t
            } : null
        },
        controller(n) {
            const t = $(n.params.value);
            return new mn(n.document,{
                blade: n.blade,
                props: m.fromObject({
                    label: n.params.label
                }),
                value: t,
                valueController: new fn(n.document,{
                    groupName: n.params.groupName,
                    cellConfig: n.params.cells,
                    size: n.params.size,
                    value: t
                })
            })
        },
        api(n) {
            return !(n.controller instanceof mn) || !(n.controller.valueController instanceof fn) ? null : new Yo(n.controller)
        }
    })
}();
function es(n) {
    return M({
        id: "input-radiogrid",
        type: "input",
        accept(t, e) {
            if (!n.isType(t))
                return null;
            const i = L(e, s=>({
                cells: s.required.function,
                groupName: s.required.string,
                size: s.required.array(s.required.number),
                view: s.required.constant("radiogrid")
            }));
            return i ? {
                initialValue: t,
                params: i
            } : null
        },
        binding: n.binding,
        controller: t=>new fn(t.document,{
            cellConfig: t.params.cells,
            groupName: t.params.groupName,
            size: t.params.size,
            value: t.value
        })
    })
}
const eu = es({
    isType: n=>typeof n == "number",
    binding: {
        reader: n=>yi,
        writer: n=>Rt
    }
})
  , nu = es({
    isType: n=>typeof n == "string",
    binding: {
        reader: n=>Fi,
        writer: n=>Rt
    }
})
  , iu = es({
    isType: n=>typeof n == "boolean",
    binding: {
        reader: n=>Ii,
        writer: n=>Rt
    }
})
  , su = "essentials"
  , ru = '.tp-cbzgv,.tp-radv_b,.tp-rslv_k,.tp-cbzv_b{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:rgba(0,0,0,0);border-width:0;font-family:inherit;font-size:inherit;font-weight:inherit;margin:0;outline:none;padding:0}.tp-radv_b,.tp-rslv_k,.tp-cbzv_b{background-color:var(--btn-bg);border-radius:var(--bld-br);color:var(--btn-fg);cursor:pointer;display:block;font-weight:bold;height:var(--cnt-usz);line-height:var(--cnt-usz);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.tp-radv_b:hover,.tp-rslv_k:hover,.tp-cbzv_b:hover{background-color:var(--btn-bg-h)}.tp-radv_b:focus,.tp-rslv_k:focus,.tp-cbzv_b:focus{background-color:var(--btn-bg-f)}.tp-radv_b:active,.tp-rslv_k:active,.tp-cbzv_b:active{background-color:var(--btn-bg-a)}.tp-radv_b:disabled,.tp-rslv_k:disabled,.tp-cbzv_b:disabled{opacity:.5}.tp-cbzgv{background-color:var(--in-bg);border-radius:var(--bld-br);box-sizing:border-box;color:var(--in-fg);font-family:inherit;height:var(--cnt-usz);line-height:var(--cnt-usz);min-width:0;width:100%}.tp-cbzgv:hover{background-color:var(--in-bg-h)}.tp-cbzgv:focus{background-color:var(--in-bg-f)}.tp-cbzgv:active{background-color:var(--in-bg-a)}.tp-cbzgv:disabled{opacity:.5}.tp-btngridv{border-radius:var(--bld-br);display:grid;overflow:hidden;gap:2px}.tp-btngridv.tp-v-disabled{opacity:.5}.tp-btngridv .tp-btnv_b:disabled{opacity:1}.tp-btngridv .tp-btnv_b:disabled .tp-btnv_t{opacity:.5}.tp-btngridv .tp-btnv_b{border-radius:0}.tp-cbzv{position:relative}.tp-cbzv_h{display:flex}.tp-cbzv_b{margin-right:4px;position:relative;width:var(--cnt-usz)}.tp-cbzv_b svg{display:block;height:16px;left:50%;margin-left:-8px;margin-top:-8px;position:absolute;top:50%;width:16px}.tp-cbzv_b svg path{stroke:var(--bs-bg);stroke-width:2}.tp-cbzv_t{flex:1}.tp-cbzv_p{height:0;margin-top:0;opacity:0;overflow:hidden;transition:height .2s ease-in-out,opacity .2s linear,margin .2s ease-in-out}.tp-cbzv.tp-cbzv-expanded .tp-cbzv_p{margin-top:var(--cnt-usp);opacity:1}.tp-cbzv.tp-cbzv-cpl .tp-cbzv_p{overflow:visible}.tp-cbzv .tp-popv{left:calc(-1 * var(--cnt-hp));position:absolute;right:calc(-1 * var(--cnt-hp));top:var(--cnt-usz)}.tp-cbzpv_t{margin-top:var(--cnt-usp)}.tp-cbzgv{height:auto;overflow:hidden;position:relative}.tp-cbzgv.tp-v-disabled{opacity:.5}.tp-cbzgv_p{left:16px;position:absolute;right:16px;top:0}.tp-cbzgv_g{cursor:pointer;display:block;height:calc(var(--cnt-usz) * 5);width:100%}.tp-cbzgv_u{opacity:.1;stroke:var(--in-fg);stroke-dasharray:1}.tp-cbzgv_l{fill:rgba(0,0,0,0);stroke:var(--in-fg)}.tp-cbzgv_v{opacity:.5;stroke:var(--in-fg);stroke-dasharray:1}.tp-cbzgv_h{border:var(--in-fg) solid 1px;border-radius:50%;box-sizing:border-box;height:4px;margin-left:-2px;margin-top:-2px;pointer-events:none;position:absolute;width:4px}.tp-cbzgv:focus .tp-cbzgv_h-sel{background-color:var(--in-fg);border-width:0}.tp-cbzprvv{cursor:pointer;height:4px;padding:4px 0;position:relative}.tp-cbzprvv_g{display:block;height:100%;overflow:visible;width:100%}.tp-cbzprvv_t{opacity:.5;stroke:var(--mo-fg)}.tp-cbzprvv_m{background-color:var(--mo-fg);border-radius:50%;height:4px;margin-left:-2px;margin-top:-2px;opacity:0;position:absolute;top:50%;transition:opacity .2s ease-out;width:4px}.tp-cbzprvv_m.tp-cbzprvv_m-a{opacity:1}.tp-fpsv{position:relative}.tp-fpsv_l{bottom:4px;color:var(--mo-fg);line-height:1;right:4px;pointer-events:none;position:absolute}.tp-fpsv_u{margin-left:.2em;opacity:.7}.tp-rslv{cursor:pointer;padding-left:8px;padding-right:8px}.tp-rslv.tp-v-disabled{opacity:.5}.tp-rslv_t{height:calc(var(--cnt-usz));position:relative}.tp-rslv_t::before{background-color:var(--in-bg);border-radius:1px;content:"";height:2px;margin-top:-1px;position:absolute;top:50%;left:-4px;right:-4px}.tp-rslv_b{bottom:0;top:0;position:absolute}.tp-rslv_b::before{background-color:var(--in-fg);content:"";height:2px;margin-top:-1px;position:absolute;top:50%;left:0;right:0}.tp-rslv_k{height:calc(var(--cnt-usz) - 8px);margin-top:calc((var(--cnt-usz) - 8px)/-2);position:absolute;top:50%;width:8px}.tp-rslv_k.tp-rslv_k-min{margin-left:-8px}.tp-rslv_k.tp-rslv_k-max{margin-left:0}.tp-rslv.tp-rslv-zero .tp-rslv_k.tp-rslv_k-min{border-bottom-right-radius:0;border-top-right-radius:0}.tp-rslv.tp-rslv-zero .tp-rslv_k.tp-rslv_k-max{border-bottom-left-radius:0;border-top-left-radius:0}.tp-rsltxtv{display:flex}.tp-rsltxtv_s{flex:1}.tp-rsltxtv_t{flex:1;margin-left:4px}.tp-radv_l{display:block;position:relative}.tp-radv_i{left:0;opacity:0;position:absolute;top:0}.tp-radv_b{opacity:.5}.tp-radv_i:hover+.tp-radv_b{background-color:var(--btn-bg-h)}.tp-radv_i:focus+.tp-radv_b{background-color:var(--btn-bg-f)}.tp-radv_i:active+.tp-radv_b{background-color:var(--btn-bg-a)}.tp-radv_i:checked+.tp-radv_b{opacity:1}.tp-radv_t{bottom:0;color:inherit;left:0;overflow:hidden;position:absolute;right:0;text-align:center;text-overflow:ellipsis;top:0}.tp-radv_i:disabled+.tp-radv_b>.tp-radv_t{opacity:.5}.tp-radgridv{border-radius:var(--bld-br);display:grid;overflow:hidden;gap:2px}.tp-radgridv.tp-v-disabled{opacity:.5}.tp-radgridv .tp-radv_b{border-radius:0}'
  , ou = [jh, Gh, Yh, Qh, tu, iu, eu, nu]
  , au = Object.freeze(Object.defineProperty({
    __proto__: null,
    ButtonCellApi: So,
    ButtonGridApi: $o,
    ButtonGridController: Lo,
    CubicBezier: At,
    CubicBezierApi: Mo,
    CubicBezierAssembly: Ji,
    CubicBezierController: hi,
    CubicBezierGraphController: Bo,
    CubicBezierGraphView: Do,
    CubicBezierPickerController: jo,
    CubicBezierPickerView: Ao,
    CubicBezierPreviewView: Ro,
    CubicBezierView: To,
    FpsGraphBladeApi: No,
    FpsGraphController: zo,
    FpsView: Fo,
    Fpswatch: Io,
    Interval: H,
    IntervalAssembly: Qi,
    IntervalConstraint: ts,
    RadioCellApi: Go,
    RadioController: Zo,
    RadioGridApi: Yo,
    RadioGridController: fn,
    RadioView: Xo,
    RangeSliderController: Ho,
    RangeSliderTextController: qo,
    RangeSliderTextView: Ko,
    RangeSliderView: Uo,
    TpRadioGridChangeEvent: Wo,
    css: ru,
    id: su,
    plugins: ou
}, Symbol.toStringTag, {
    value: "Module"
}));
function Yn(n) {
    return Math.abs(Math.floor(n))
}
function zt(n, t) {
    return Math.random() * (t - n) + n
}
function rt(n, t) {
    return Math.floor(zt(n, t + 1))
}
function lr(n, t, e, i) {
    const s = Math.pow;
    return Math.sqrt(s(n - e, 2) + s(t - i, 2))
}
function ui(n, t, e=1) {
    if (n > 360 || n < 0)
        throw new Error(`Expected hue 0-360 range, got \`${n}\``);
    if (t > 100 || t < 0)
        throw new Error(`Expected lightness 0-100 range, got \`${t}\``);
    if (e > 1 || e < 0)
        throw new Error(`Expected alpha 0-1 range, got \`${e}\``);
    return `hsla(${n}, 100%, ${t}%, ${e})`
}
const pr = n=>{
    if (typeof n == "object" && n !== null) {
        if (typeof Object.getPrototypeOf == "function") {
            const t = Object.getPrototypeOf(n);
            return t === Object.prototype || t === null
        }
        return Object.prototype.toString.call(n) === "[object Object]"
    }
    return !1
}
  , lu = ["__proto__", "constructor", "prototype"]
  , Jo = (...n)=>n.reduce((t,e)=>(Object.keys(e).forEach(i=>{
    lu.includes(i) || (Array.isArray(t[i]) && Array.isArray(e[i]) ? t[i] = e[i] : pr(t[i]) && pr(e[i]) ? t[i] = Jo(t[i], e[i]) : t[i] = e[i])
}
),
t), {});
function pu(n, t) {
    let e;
    return (...i)=>{
        e && clearTimeout(e),
        e = setTimeout(()=>n(...i), t)
    }
}
class cu {
    constructor({x: t, y: e, ctx: i, hue: s, decay: r, gravity: o, friction: a, brightness: l, flickering: p, lineWidth: h, explosionLength: u}) {
        c(this, "x");
        c(this, "y");
        c(this, "ctx");
        c(this, "hue");
        c(this, "friction");
        c(this, "gravity");
        c(this, "flickering");
        c(this, "lineWidth");
        c(this, "explosionLength");
        c(this, "angle");
        c(this, "speed");
        c(this, "brightness");
        c(this, "coordinates", []);
        c(this, "decay");
        c(this, "alpha", 1);
        for (this.x = t,
        this.y = e,
        this.ctx = i,
        this.hue = s,
        this.gravity = o,
        this.friction = a,
        this.flickering = p,
        this.lineWidth = h,
        this.explosionLength = u,
        this.angle = zt(0, Math.PI * 2),
        this.speed = rt(1, 10),
        this.brightness = rt(l.min, l.max),
        this.decay = zt(r.min, r.max); this.explosionLength--; )
            this.coordinates.push([t, e])
    }
    update(t) {
        this.coordinates.pop(),
        this.coordinates.unshift([this.x, this.y]),
        this.speed *= this.friction,
        this.x += Math.cos(this.angle) * this.speed,
        this.y += Math.sin(this.angle) * this.speed + this.gravity,
        this.alpha -= this.decay,
        this.alpha <= this.decay && t()
    }
    draw() {
        const t = this.coordinates.length - 1;
        this.ctx.beginPath(),
        this.ctx.lineWidth = this.lineWidth,
        this.ctx.fillStyle = ui(this.hue, this.brightness, this.alpha),
        this.ctx.moveTo(this.coordinates[t][0], this.coordinates[t][1]),
        this.ctx.lineTo(this.x, this.y),
        this.ctx.strokeStyle = ui(this.hue, this.flickering ? zt(0, this.brightness) : this.brightness, this.alpha),
        this.ctx.stroke()
    }
}
class hu {
    constructor(t, e) {
        c(this, "active", !1);
        c(this, "x");
        c(this, "y");
        this.options = t,
        this.canvas = e,
        this.pointerDown = this.pointerDown.bind(this),
        this.pointerUp = this.pointerUp.bind(this),
        this.pointerMove = this.pointerMove.bind(this)
    }
    get mouseOptions() {
        return this.options.mouse
    }
    mount() {
        this.canvas.addEventListener("pointerdown", this.pointerDown),
        this.canvas.addEventListener("pointerup", this.pointerUp),
        this.canvas.addEventListener("pointermove", this.pointerMove)
    }
    unmount() {
        this.canvas.removeEventListener("pointerdown", this.pointerDown),
        this.canvas.removeEventListener("pointerup", this.pointerUp),
        this.canvas.removeEventListener("pointermove", this.pointerMove)
    }
    usePointer(t, e) {
        const {click: i, move: s} = this.mouseOptions;
        (i || s) && (this.x = t.pageX - this.canvas.offsetLeft,
        this.y = t.pageY - this.canvas.offsetTop,
        this.active = e)
    }
    pointerDown(t) {
        this.usePointer(t, this.mouseOptions.click)
    }
    pointerUp(t) {
        this.usePointer(t, !1)
    }
    pointerMove(t) {
        this.usePointer(t, this.active)
    }
}
class uu {
    constructor() {
        c(this, "hue");
        c(this, "rocketsPoint");
        c(this, "opacity");
        c(this, "acceleration");
        c(this, "friction");
        c(this, "gravity");
        c(this, "particles");
        c(this, "explosion");
        c(this, "mouse");
        c(this, "boundaries");
        c(this, "sound");
        c(this, "delay");
        c(this, "brightness");
        c(this, "decay");
        c(this, "flickering");
        c(this, "intensity");
        c(this, "traceLength");
        c(this, "traceSpeed");
        c(this, "lineWidth");
        c(this, "lineStyle");
        c(this, "autoresize");
        this.autoresize = !0,
        this.lineStyle = "round",
        this.flickering = 50,
        this.traceLength = 3,
        this.traceSpeed = 10,
        this.intensity = 30,
        this.explosion = 5,
        this.gravity = 1.5,
        this.opacity = .5,
        this.particles = 50,
        this.friction = .95,
        this.acceleration = 1.05,
        this.hue = {
            min: 0,
            max: 360
        },
        this.rocketsPoint = {
            min: 50,
            max: 50
        },
        this.lineWidth = {
            explosion: {
                min: 1,
                max: 3
            },
            trace: {
                min: 1,
                max: 2
            }
        },
        this.mouse = {
            click: !1,
            move: !1,
            max: 1
        },
        this.delay = {
            min: 30,
            max: 60
        },
        this.brightness = {
            min: 50,
            max: 80
        },
        this.decay = {
            min: .015,
            max: .03
        },
        this.sound = {
            enabled: !1,
            files: ["explosion0.mp3", "explosion1.mp3", "explosion2.mp3"],
            volume: {
                min: 4,
                max: 8
            }
        },
        this.boundaries = {
            debug: !1,
            height: 0,
            width: 0,
            x: 50,
            y: 50
        }
    }
    update(t) {
        Object.assign(this, Jo(this, t))
    }
}
class du {
    constructor(t, e) {
        c(this, "tick", 0);
        c(this, "rafId", 0);
        c(this, "fps", 60);
        c(this, "tolerance", .1);
        c(this, "now");
        this.options = t,
        this.render = e
    }
    mount() {
        this.now = performance.now();
        const t = 1e3 / this.fps
          , e = i=>{
            this.rafId = requestAnimationFrame(e);
            const s = i - this.now;
            s >= t - this.tolerance && (this.render(),
            this.now = i - s % t,
            this.tick += s * (this.options.intensity * Math.PI) / 1e3)
        }
        ;
        this.rafId = requestAnimationFrame(e)
    }
    unmount() {
        cancelAnimationFrame(this.rafId)
    }
}
class mu {
    constructor(t, e, i) {
        c(this, "resizer");
        this.options = t,
        this.updateSize = e,
        this.container = i
    }
    mount() {
        if (!this.resizer) {
            const t = pu(()=>this.updateSize(), 100);
            this.resizer = new ResizeObserver(t)
        }
        this.options.autoresize && this.resizer.observe(this.container)
    }
    unmount() {
        this.resizer && this.resizer.unobserve(this.container)
    }
}
class vu {
    constructor(t) {
        c(this, "buffers", []);
        c(this, "audioContext");
        c(this, "onInit", !1);
        this.options = t,
        this.init()
    }
    get isEnabled() {
        return this.options.sound.enabled
    }
    get soundOptions() {
        return this.options.sound
    }
    init() {
        !this.onInit && this.isEnabled && (this.onInit = !0,
        this.audioContext = new (window.AudioContext || window.webkitAudioContext),
        this.loadSounds())
    }
    async loadSounds() {
        for (const t of this.soundOptions.files) {
            const e = await (await fetch(t)).arrayBuffer();
            this.audioContext.decodeAudioData(e).then(i=>{
                this.buffers.push(i)
            }
            ).catch(i=>{
                throw i
            }
            )
        }
    }
    play() {
        if (this.isEnabled && this.buffers.length) {
            const t = this.audioContext.createBufferSource()
              , e = this.buffers[rt(0, this.buffers.length - 1)]
              , i = this.audioContext.createGain();
            t.buffer = e,
            i.gain.value = zt(this.soundOptions.volume.min / 100, this.soundOptions.volume.max / 100),
            i.connect(this.audioContext.destination),
            t.connect(i),
            t.start(0)
        } else
            this.init()
    }
}
class bu {
    constructor({x: t, y: e, dx: i, dy: s, ctx: r, hue: o, speed: a, traceLength: l, acceleration: p}) {
        c(this, "x");
        c(this, "y");
        c(this, "sx");
        c(this, "sy");
        c(this, "dx");
        c(this, "dy");
        c(this, "ctx");
        c(this, "hue");
        c(this, "speed");
        c(this, "acceleration");
        c(this, "traceLength");
        c(this, "totalDistance");
        c(this, "angle");
        c(this, "brightness");
        c(this, "coordinates", []);
        c(this, "currentDistance", 0);
        for (this.x = t,
        this.y = e,
        this.sx = t,
        this.sy = e,
        this.dx = i,
        this.dy = s,
        this.ctx = r,
        this.hue = o,
        this.speed = a,
        this.traceLength = l,
        this.acceleration = p,
        this.totalDistance = lr(t, e, i, s),
        this.angle = Math.atan2(s - e, i - t),
        this.brightness = rt(50, 70); this.traceLength--; )
            this.coordinates.push([t, e])
    }
    update(t) {
        this.coordinates.pop(),
        this.coordinates.unshift([this.x, this.y]),
        this.speed *= this.acceleration;
        const e = Math.cos(this.angle) * this.speed
          , i = Math.sin(this.angle) * this.speed;
        this.currentDistance = lr(this.sx, this.sy, this.x + e, this.y + i),
        this.currentDistance >= this.totalDistance ? t(this.dx, this.dy, this.hue) : (this.x += e,
        this.y += i)
    }
    draw() {
        const t = this.coordinates.length - 1;
        this.ctx.beginPath(),
        this.ctx.moveTo(this.coordinates[t][0], this.coordinates[t][1]),
        this.ctx.lineTo(this.x, this.y),
        this.ctx.strokeStyle = ui(this.hue, this.brightness),
        this.ctx.stroke()
    }
}
class fu {
    constructor(t, e={}) {
        c(this, "target");
        c(this, "container");
        c(this, "canvas");
        c(this, "ctx");
        c(this, "width");
        c(this, "height");
        c(this, "traces", []);
        c(this, "explosions", []);
        c(this, "waitStopRaf");
        c(this, "running", !1);
        c(this, "opts");
        c(this, "sound");
        c(this, "resize");
        c(this, "mouse");
        c(this, "raf");
        this.target = t,
        this.container = t,
        this.opts = new uu,
        this.createCanvas(this.target),
        this.updateOptions(e),
        this.sound = new vu(this.opts),
        this.resize = new mu(this.opts,this.updateSize.bind(this),this.container),
        this.mouse = new hu(this.opts,this.canvas),
        this.raf = new du(this.opts,this.render.bind(this))
    }
    get isRunning() {
        return this.running
    }
    get version() {
        return "2.10.8"
    }
    get currentOptions() {
        return this.opts
    }
    start() {
        this.running || (this.canvas.isConnected || this.createCanvas(this.target),
        this.running = !0,
        this.resize.mount(),
        this.mouse.mount(),
        this.raf.mount())
    }
    stop(t=!1) {
        this.running && (this.running = !1,
        this.resize.unmount(),
        this.mouse.unmount(),
        this.raf.unmount(),
        this.clear(),
        t && this.canvas.remove())
    }
    async waitStop(t) {
        if (this.running)
            return new Promise(e=>{
                this.waitStopRaf = ()=>{
                    this.waitStopRaf && (requestAnimationFrame(this.waitStopRaf),
                    !this.traces.length && !this.explosions.length && (this.waitStopRaf = null,
                    this.stop(t),
                    e()))
                }
                ,
                this.waitStopRaf()
            }
            )
    }
    pause() {
        this.running = !this.running,
        this.running ? this.raf.mount() : this.raf.unmount()
    }
    clear() {
        this.ctx && (this.traces = [],
        this.explosions = [],
        this.ctx.clearRect(0, 0, this.width, this.height))
    }
    launch(t=1) {
        for (let e = 0; e < t; e++)
            this.createTrace();
        this.waitStopRaf || (this.start(),
        this.waitStop())
    }
    updateOptions(t) {
        this.opts.update(t)
    }
    updateSize({width: t=this.container.clientWidth, height: e=this.container.clientHeight}={}) {
        this.width = t,
        this.height = e,
        this.canvas.width = t,
        this.canvas.height = e,
        this.updateBoundaries({
            ...this.opts.boundaries,
            width: t,
            height: e
        })
    }
    updateBoundaries(t) {
        this.updateOptions({
            boundaries: t
        })
    }
    createCanvas(t) {
        t instanceof HTMLCanvasElement ? (t.isConnected || document.body.append(t),
        this.canvas = t) : (this.canvas = document.createElement("canvas"),
        this.container.append(this.canvas)),
        this.ctx = this.canvas.getContext("2d"),
        this.updateSize()
    }
    render() {
        if (!this.ctx || !this.running)
            return;
        const {opacity: t, lineStyle: e, lineWidth: i} = this.opts;
        this.ctx.globalCompositeOperation = "destination-out",
        this.ctx.fillStyle = `rgba(0, 0, 0, ${t})`,
        this.ctx.fillRect(0, 0, this.width, this.height),
        this.ctx.globalCompositeOperation = "lighter",
        this.ctx.lineCap = e,
        this.ctx.lineJoin = "round",
        this.ctx.lineWidth = zt(i.trace.min, i.trace.max),
        this.initTrace(),
        this.drawTrace(),
        this.drawExplosion()
    }
    createTrace() {
        const {hue: t, rocketsPoint: e, boundaries: i, traceLength: s, traceSpeed: r, acceleration: o, mouse: a} = this.opts;
        this.traces.push(new bu({
            x: this.width * rt(e.min, e.max) / 100,
            y: this.height,
            dx: this.mouse.x && a.move || this.mouse.active ? this.mouse.x : rt(i.x, i.width - i.x * 2),
            dy: this.mouse.y && a.move || this.mouse.active ? this.mouse.y : rt(i.y, i.height * .5),
            ctx: this.ctx,
            hue: rt(t.min, t.max),
            speed: r,
            acceleration: o,
            traceLength: Yn(s)
        }))
    }
    initTrace() {
        if (this.waitStopRaf)
            return;
        const {delay: t, mouse: e} = this.opts;
        (this.raf.tick > rt(t.min, t.max) || this.mouse.active && e.max > this.traces.length) && (this.createTrace(),
        this.raf.tick = 0)
    }
    drawTrace() {
        let t = this.traces.length;
        for (; t--; )
            this.traces[t].draw(),
            this.traces[t].update((e,i,s)=>{
                this.initExplosion(e, i, s),
                this.sound.play(),
                this.traces.splice(t, 1)
            }
            )
    }
    initExplosion(t, e, i) {
        const {particles: s, flickering: r, lineWidth: o, explosion: a, brightness: l, friction: p, gravity: h, decay: u} = this.opts;
        let N = Yn(s);
        for (; N--; )
            this.explosions.push(new cu({
                x: t,
                y: e,
                ctx: this.ctx,
                hue: i,
                friction: p,
                gravity: h,
                flickering: rt(0, 100) <= r,
                lineWidth: zt(o.explosion.min, o.explosion.max),
                explosionLength: Yn(a),
                brightness: l,
                decay: u
            }))
    }
    drawExplosion() {
        let t = this.explosions.length;
        for (; t--; )
            this.explosions[t].draw(),
            this.explosions[t].update(()=>{
                this.explosions.splice(t, 1)
            }
            )
    }
}
/*! Tweakpane 4.0.4 (c) 2016 cocopon, licensed under the MIT license. */
function C(n) {
    return n == null
}
function ns(n) {
    return n !== null && typeof n == "object"
}
function di(n) {
    return n !== null && typeof n == "object"
}
function wu(n, t) {
    if (n.length !== t.length)
        return !1;
    for (let e = 0; e < n.length; e++)
        if (n[e] !== t[e])
            return !1;
    return !0
}
function Wt(n, t) {
    return Array.from(new Set([...Object.keys(n), ...Object.keys(t)])).reduce((i,s)=>{
        const r = n[s]
          , o = t[s];
        return di(r) && di(o) ? Object.assign(Object.assign({}, i), {
            [s]: Wt(r, o)
        }) : Object.assign(Object.assign({}, i), {
            [s]: s in t ? o : r
        })
    }
    , {})
}
function is(n) {
    return ns(n) ? "target"in n : !1
}
const _u = {
    alreadydisposed: ()=>"View has been already disposed",
    invalidparams: n=>`Invalid parameters for '${n.name}'`,
    nomatchingcontroller: n=>`No matching controller for '${n.key}'`,
    nomatchingview: n=>`No matching view for '${JSON.stringify(n.params)}'`,
    notbindable: ()=>"Value is not bindable",
    notcompatible: n=>`Not compatible with  plugin '${n.id}'`,
    propertynotfound: n=>`Property '${n.name}' not found`,
    shouldneverhappen: ()=>"This error should never happen"
};
class S {
    static alreadyDisposed() {
        return new S({
            type: "alreadydisposed"
        })
    }
    static notBindable() {
        return new S({
            type: "notbindable"
        })
    }
    static notCompatible(t, e) {
        return new S({
            type: "notcompatible",
            context: {
                id: `${t}.${e}`
            }
        })
    }
    static propertyNotFound(t) {
        return new S({
            type: "propertynotfound",
            context: {
                name: t
            }
        })
    }
    static shouldNeverHappen() {
        return new S({
            type: "shouldneverhappen"
        })
    }
    constructor(t) {
        var e;
        this.message = (e = _u[t.type](t.context)) !== null && e !== void 0 ? e : "Unexpected error",
        this.name = this.constructor.name,
        this.stack = new Error(this.message).stack,
        this.type = t.type
    }
    toString() {
        return this.message
    }
}
class wn {
    constructor(t, e) {
        this.obj_ = t,
        this.key = e
    }
    static isBindable(t) {
        return !(t === null || typeof t != "object" && typeof t != "function")
    }
    read() {
        return this.obj_[this.key]
    }
    write(t) {
        this.obj_[this.key] = t
    }
    writeProperty(t, e) {
        const i = this.read();
        if (!wn.isBindable(i))
            throw S.notBindable();
        if (!(t in i))
            throw S.propertyNotFound(t);
        i[t] = e
    }
}
class T {
    constructor() {
        this.observers_ = {}
    }
    on(t, e, i) {
        var s;
        let r = this.observers_[t];
        return r || (r = this.observers_[t] = []),
        r.push({
            handler: e,
            key: (s = i == null ? void 0 : i.key) !== null && s !== void 0 ? s : e
        }),
        this
    }
    off(t, e) {
        const i = this.observers_[t];
        return i && (this.observers_[t] = i.filter(s=>s.key !== e)),
        this
    }
    emit(t, e) {
        const i = this.observers_[t];
        i && i.forEach(s=>{
            s.handler(e)
        }
        )
    }
}
class gu {
    constructor(t, e) {
        var i;
        this.constraint_ = e == null ? void 0 : e.constraint,
        this.equals_ = (i = e == null ? void 0 : e.equals) !== null && i !== void 0 ? i : (s,r)=>s === r,
        this.emitter = new T,
        this.rawValue_ = t
    }
    get constraint() {
        return this.constraint_
    }
    get rawValue() {
        return this.rawValue_
    }
    set rawValue(t) {
        this.setRawValue(t, {
            forceEmit: !1,
            last: !0
        })
    }
    setRawValue(t, e) {
        const i = e ?? {
            forceEmit: !1,
            last: !0
        }
          , s = this.constraint_ ? this.constraint_.constrain(t) : t
          , r = this.rawValue_;
        this.equals_(r, s) && !i.forceEmit || (this.emitter.emit("beforechange", {
            sender: this
        }),
        this.rawValue_ = s,
        this.emitter.emit("change", {
            options: i,
            previousRawValue: r,
            rawValue: s,
            sender: this
        }))
    }
}
class Cu {
    constructor(t) {
        this.emitter = new T,
        this.value_ = t
    }
    get rawValue() {
        return this.value_
    }
    set rawValue(t) {
        this.setRawValue(t, {
            forceEmit: !1,
            last: !0
        })
    }
    setRawValue(t, e) {
        const i = e ?? {
            forceEmit: !1,
            last: !0
        }
          , s = this.value_;
        s === t && !i.forceEmit || (this.emitter.emit("beforechange", {
            sender: this
        }),
        this.value_ = t,
        this.emitter.emit("change", {
            options: i,
            previousRawValue: s,
            rawValue: this.value_,
            sender: this
        }))
    }
}
class xu {
    constructor(t) {
        this.emitter = new T,
        this.onValueBeforeChange_ = this.onValueBeforeChange_.bind(this),
        this.onValueChange_ = this.onValueChange_.bind(this),
        this.value_ = t,
        this.value_.emitter.on("beforechange", this.onValueBeforeChange_),
        this.value_.emitter.on("change", this.onValueChange_)
    }
    get rawValue() {
        return this.value_.rawValue
    }
    onValueBeforeChange_(t) {
        this.emitter.emit("beforechange", Object.assign(Object.assign({}, t), {
            sender: this
        }))
    }
    onValueChange_(t) {
        this.emitter.emit("change", Object.assign(Object.assign({}, t), {
            sender: this
        }))
    }
}
function E(n, t) {
    const e = t == null ? void 0 : t.constraint
      , i = t == null ? void 0 : t.equals;
    return !e && !i ? new Cu(n) : new gu(n,t)
}
function Pu(n) {
    return [new xu(n), (t,e)=>{
        n.setRawValue(t, e)
    }
    ]
}
class b {
    constructor(t) {
        this.emitter = new T,
        this.valMap_ = t;
        for (const e in this.valMap_)
            this.valMap_[e].emitter.on("change", ()=>{
                this.emitter.emit("change", {
                    key: e,
                    sender: this
                })
            }
            )
    }
    static createCore(t) {
        return Object.keys(t).reduce((i,s)=>Object.assign(i, {
            [s]: E(t[s])
        }), {})
    }
    static fromObject(t) {
        const e = this.createCore(t);
        return new b(e)
    }
    get(t) {
        return this.valMap_[t].rawValue
    }
    set(t, e) {
        this.valMap_[t].rawValue = e
    }
    value(t) {
        return this.valMap_[t]
    }
}
class Ye {
    constructor(t) {
        this.values = b.fromObject({
            max: t.max,
            min: t.min
        })
    }
    constrain(t) {
        const e = this.values.get("max")
          , i = this.values.get("min");
        return Math.min(Math.max(t, i), e)
    }
}
class yu {
    constructor(t) {
        this.values = b.fromObject({
            max: t.max,
            min: t.min
        })
    }
    constrain(t) {
        const e = this.values.get("max")
          , i = this.values.get("min");
        let s = t;
        return C(i) || (s = Math.max(s, i)),
        C(e) || (s = Math.min(s, e)),
        s
    }
}
class Eu {
    constructor(t, e=0) {
        this.step = t,
        this.origin = e
    }
    constrain(t) {
        const e = this.origin % this.step
          , i = Math.round((t - e) / this.step);
        return e + i * this.step
    }
}
class ku {
    constructor(t) {
        this.text = t
    }
    evaluate() {
        return Number(this.text)
    }
    toString() {
        return this.text
    }
}
const Vu = {
    "**": (n,t)=>Math.pow(n, t),
    "*": (n,t)=>n * t,
    "/": (n,t)=>n / t,
    "%": (n,t)=>n % t,
    "+": (n,t)=>n + t,
    "-": (n,t)=>n - t,
    "<<": (n,t)=>n << t,
    ">>": (n,t)=>n >> t,
    ">>>": (n,t)=>n >>> t,
    "&": (n,t)=>n & t,
    "^": (n,t)=>n ^ t,
    "|": (n,t)=>n | t
};
class Su {
    constructor(t, e, i) {
        this.left = e,
        this.operator = t,
        this.right = i
    }
    evaluate() {
        const t = Vu[this.operator];
        if (!t)
            throw new Error(`unexpected binary operator: '${this.operator}`);
        return t(this.left.evaluate(), this.right.evaluate())
    }
    toString() {
        return ["b(", this.left.toString(), this.operator, this.right.toString(), ")"].join(" ")
    }
}
const $u = {
    "+": n=>n,
    "-": n=>-n,
    "~": n=>~n
};
class Lu {
    constructor(t, e) {
        this.operator = t,
        this.expression = e
    }
    evaluate() {
        const t = $u[this.operator];
        if (!t)
            throw new Error(`unexpected unary operator: '${this.operator}`);
        return t(this.expression.evaluate())
    }
    toString() {
        return ["u(", this.operator, this.expression.toString(), ")"].join(" ")
    }
}
function ss(n) {
    return (t,e)=>{
        for (let i = 0; i < n.length; i++) {
            const s = n[i](t, e);
            if (s !== "")
                return s
        }
        return ""
    }
}
function Be(n, t) {
    var e;
    const i = n.substr(t).match(/^\s+/);
    return (e = i && i[0]) !== null && e !== void 0 ? e : ""
}
function Mu(n, t) {
    const e = n.substr(t, 1);
    return e.match(/^[1-9]$/) ? e : ""
}
function je(n, t) {
    var e;
    const i = n.substr(t).match(/^[0-9]+/);
    return (e = i && i[0]) !== null && e !== void 0 ? e : ""
}
function Tu(n, t) {
    const e = je(n, t);
    if (e !== "")
        return e;
    const i = n.substr(t, 1);
    if (t += 1,
    i !== "-" && i !== "+")
        return "";
    const s = je(n, t);
    return s === "" ? "" : i + s
}
function rs(n, t) {
    const e = n.substr(t, 1);
    if (t += 1,
    e.toLowerCase() !== "e")
        return "";
    const i = Tu(n, t);
    return i === "" ? "" : e + i
}
function Qo(n, t) {
    const e = n.substr(t, 1);
    if (e === "0")
        return e;
    const i = Mu(n, t);
    return t += i.length,
    i === "" ? "" : i + je(n, t)
}
function Au(n, t) {
    const e = Qo(n, t);
    if (t += e.length,
    e === "")
        return "";
    const i = n.substr(t, 1);
    if (t += i.length,
    i !== ".")
        return "";
    const s = je(n, t);
    return t += s.length,
    e + i + s + rs(n, t)
}
function Ou(n, t) {
    const e = n.substr(t, 1);
    if (t += e.length,
    e !== ".")
        return "";
    const i = je(n, t);
    return t += i.length,
    i === "" ? "" : e + i + rs(n, t)
}
function Du(n, t) {
    const e = Qo(n, t);
    return t += e.length,
    e === "" ? "" : e + rs(n, t)
}
const Ru = ss([Au, Ou, Du]);
function Bu(n, t) {
    var e;
    const i = n.substr(t).match(/^[01]+/);
    return (e = i && i[0]) !== null && e !== void 0 ? e : ""
}
function ju(n, t) {
    const e = n.substr(t, 2);
    if (t += e.length,
    e.toLowerCase() !== "0b")
        return "";
    const i = Bu(n, t);
    return i === "" ? "" : e + i
}
function Nu(n, t) {
    var e;
    const i = n.substr(t).match(/^[0-7]+/);
    return (e = i && i[0]) !== null && e !== void 0 ? e : ""
}
function Iu(n, t) {
    const e = n.substr(t, 2);
    if (t += e.length,
    e.toLowerCase() !== "0o")
        return "";
    const i = Nu(n, t);
    return i === "" ? "" : e + i
}
function Fu(n, t) {
    var e;
    const i = n.substr(t).match(/^[0-9a-f]+/i);
    return (e = i && i[0]) !== null && e !== void 0 ? e : ""
}
function zu(n, t) {
    const e = n.substr(t, 2);
    if (t += e.length,
    e.toLowerCase() !== "0x")
        return "";
    const i = Fu(n, t);
    return i === "" ? "" : e + i
}
const Ku = ss([ju, Iu, zu])
  , Uu = ss([Ku, Ru]);
function Hu(n, t) {
    const e = Uu(n, t);
    return t += e.length,
    e === "" ? null : {
        evaluable: new ku(e),
        cursor: t
    }
}
function qu(n, t) {
    const e = n.substr(t, 1);
    if (t += e.length,
    e !== "(")
        return null;
    const i = ea(n, t);
    if (!i)
        return null;
    t = i.cursor,
    t += Be(n, t).length;
    const s = n.substr(t, 1);
    return t += s.length,
    s !== ")" ? null : {
        evaluable: i.evaluable,
        cursor: t
    }
}
function Gu(n, t) {
    var e;
    return (e = Hu(n, t)) !== null && e !== void 0 ? e : qu(n, t)
}
function ta(n, t) {
    const e = Gu(n, t);
    if (e)
        return e;
    const i = n.substr(t, 1);
    if (t += i.length,
    i !== "+" && i !== "-" && i !== "~")
        return null;
    const s = ta(n, t);
    return s ? (t = s.cursor,
    {
        cursor: t,
        evaluable: new Lu(i,s.evaluable)
    }) : null
}
function Wu(n, t, e) {
    e += Be(t, e).length;
    const i = n.filter(s=>t.startsWith(s, e))[0];
    return i ? (e += i.length,
    e += Be(t, e).length,
    {
        cursor: e,
        operator: i
    }) : null
}
function Yu(n, t) {
    return (e,i)=>{
        const s = n(e, i);
        if (!s)
            return null;
        i = s.cursor;
        let r = s.evaluable;
        for (; ; ) {
            const o = Wu(t, e, i);
            if (!o)
                break;
            i = o.cursor;
            const a = n(e, i);
            if (!a)
                return null;
            i = a.cursor,
            r = new Su(o.operator,r,a.evaluable)
        }
        return r ? {
            cursor: i,
            evaluable: r
        } : null
    }
}
const Xu = [["**"], ["*", "/", "%"], ["+", "-"], ["<<", ">>>", ">>"], ["&"], ["^"], ["|"]].reduce((n,t)=>Yu(n, t), ta);
function ea(n, t) {
    return t += Be(n, t).length,
    Xu(n, t)
}
function Zu(n) {
    const t = ea(n, 0);
    return !t || t.cursor + Be(n, t.cursor).length !== n.length ? null : t.evaluable
}
function wt(n) {
    var t;
    const e = Zu(n);
    return (t = e == null ? void 0 : e.evaluate()) !== null && t !== void 0 ? t : null
}
function na(n) {
    if (typeof n == "number")
        return n;
    if (typeof n == "string") {
        const t = wt(n);
        if (!C(t))
            return t
    }
    return 0
}
function Ju(n) {
    return String(n)
}
function U(n) {
    return t=>t.toFixed(Math.max(Math.min(n, 20), 0))
}
function _(n, t, e, i, s) {
    const r = (n - t) / (e - t);
    return i + r * (s - i)
}
function cr(n) {
    return String(n.toFixed(10)).split(".")[1].replace(/0+$/, "").length
}
function A(n, t, e) {
    return Math.min(Math.max(n, t), e)
}
function ia(n, t) {
    return (n % t + t) % t
}
function Qu(n, t) {
    return C(n.step) ? Math.max(cr(t), 2) : cr(n.step)
}
function sa(n) {
    var t;
    return (t = n.step) !== null && t !== void 0 ? t : 1
}
function ra(n, t) {
    var e;
    const i = Math.abs((e = n.step) !== null && e !== void 0 ? e : t);
    return i === 0 ? .1 : Math.pow(10, Math.floor(Math.log10(i)) - 1)
}
function oa(n, t) {
    return C(n.step) ? null : new Eu(n.step,t)
}
function aa(n) {
    return !C(n.max) && !C(n.min) ? new Ye({
        max: n.max,
        min: n.min
    }) : !C(n.max) || !C(n.min) ? new yu({
        max: n.max,
        min: n.min
    }) : null
}
function la(n, t) {
    var e, i, s;
    return {
        formatter: (e = n.format) !== null && e !== void 0 ? e : U(Qu(n, t)),
        keyScale: (i = n.keyScale) !== null && i !== void 0 ? i : sa(n),
        pointerScale: (s = n.pointerScale) !== null && s !== void 0 ? s : ra(n, t)
    }
}
function pa(n) {
    return {
        format: n.optional.function,
        keyScale: n.optional.number,
        max: n.optional.number,
        min: n.optional.number,
        pointerScale: n.optional.number,
        step: n.optional.number
    }
}
function os(n) {
    return {
        constraint: n.constraint,
        textProps: b.fromObject(la(n.params, n.initialValue))
    }
}
class te {
    constructor(t) {
        this.controller = t
    }
    get element() {
        return this.controller.view.element
    }
    get disabled() {
        return this.controller.viewProps.get("disabled")
    }
    set disabled(t) {
        this.controller.viewProps.set("disabled", t)
    }
    get hidden() {
        return this.controller.viewProps.get("hidden")
    }
    set hidden(t) {
        this.controller.viewProps.set("hidden", t)
    }
    dispose() {
        this.controller.viewProps.set("disposed", !0)
    }
    importState(t) {
        return this.controller.importState(t)
    }
    exportState() {
        return this.controller.exportState()
    }
}
class On {
    constructor(t) {
        this.target = t
    }
}
class Xe extends On {
    constructor(t, e, i) {
        super(t),
        this.value = e,
        this.last = i ?? !0
    }
}
class td extends On {
    constructor(t, e) {
        super(t),
        this.expanded = e
    }
}
class ed extends On {
    constructor(t, e) {
        super(t),
        this.index = e
    }
}
class nd extends On {
    constructor(t, e) {
        super(t),
        this.native = e
    }
}
class Ne extends te {
    constructor(t) {
        super(t),
        this.onValueChange_ = this.onValueChange_.bind(this),
        this.emitter_ = new T,
        this.controller.value.emitter.on("change", this.onValueChange_)
    }
    get label() {
        return this.controller.labelController.props.get("label")
    }
    set label(t) {
        this.controller.labelController.props.set("label", t)
    }
    get key() {
        return this.controller.value.binding.target.key
    }
    get tag() {
        return this.controller.tag
    }
    set tag(t) {
        this.controller.tag = t
    }
    on(t, e) {
        const i = e.bind(this);
        return this.emitter_.on(t, s=>{
            i(s)
        }
        , {
            key: e
        }),
        this
    }
    off(t, e) {
        return this.emitter_.off(t, e),
        this
    }
    refresh() {
        this.controller.value.fetch()
    }
    onValueChange_(t) {
        const e = this.controller.value;
        this.emitter_.emit("change", new Xe(this,e.binding.target.read(),t.options.last))
    }
}
class id {
    constructor(t, e) {
        this.onValueBeforeChange_ = this.onValueBeforeChange_.bind(this),
        this.onValueChange_ = this.onValueChange_.bind(this),
        this.binding = e,
        this.value_ = t,
        this.value_.emitter.on("beforechange", this.onValueBeforeChange_),
        this.value_.emitter.on("change", this.onValueChange_),
        this.emitter = new T
    }
    get rawValue() {
        return this.value_.rawValue
    }
    set rawValue(t) {
        this.value_.rawValue = t
    }
    setRawValue(t, e) {
        this.value_.setRawValue(t, e)
    }
    fetch() {
        this.value_.rawValue = this.binding.read()
    }
    push() {
        this.binding.write(this.value_.rawValue)
    }
    onValueBeforeChange_(t) {
        this.emitter.emit("beforechange", Object.assign(Object.assign({}, t), {
            sender: this
        }))
    }
    onValueChange_(t) {
        this.push(),
        this.emitter.emit("change", Object.assign(Object.assign({}, t), {
            sender: this
        }))
    }
}
function sd(n) {
    if (!("binding"in n))
        return !1;
    const t = n.binding;
    return is(t) && "read"in t && "write"in t
}
function rd(n, t) {
    const i = Object.keys(t).reduce((s,r)=>{
        if (s === void 0)
            return;
        const o = t[r]
          , a = o(n[r]);
        return a.succeeded ? Object.assign(Object.assign({}, s), {
            [r]: a.value
        }) : void 0
    }
    , {});
    return i
}
function od(n, t) {
    return n.reduce((e,i)=>{
        if (e === void 0)
            return;
        const s = t(i);
        if (!(!s.succeeded || s.value === void 0))
            return [...e, s.value]
    }
    , [])
}
function ad(n) {
    return n === null ? !1 : typeof n == "object"
}
function dt(n) {
    return t=>e=>{
        if (!t && e === void 0)
            return {
                succeeded: !1,
                value: void 0
            };
        if (t && e === void 0)
            return {
                succeeded: !0,
                value: void 0
            };
        const i = n(e);
        return i !== void 0 ? {
            succeeded: !0,
            value: i
        } : {
            succeeded: !1,
            value: void 0
        }
    }
}
function hr(n) {
    return {
        custom: t=>dt(t)(n),
        boolean: dt(t=>typeof t == "boolean" ? t : void 0)(n),
        number: dt(t=>typeof t == "number" ? t : void 0)(n),
        string: dt(t=>typeof t == "string" ? t : void 0)(n),
        function: dt(t=>typeof t == "function" ? t : void 0)(n),
        constant: t=>dt(e=>e === t ? t : void 0)(n),
        raw: dt(t=>t)(n),
        object: t=>dt(e=>{
            if (ad(e))
                return rd(e, t)
        }
        )(n),
        array: t=>dt(e=>{
            if (Array.isArray(e))
                return od(e, t)
        }
        )(n)
    }
}
const mi = {
    optional: hr(!0),
    required: hr(!1)
};
function V(n, t) {
    const e = t(mi)
      , i = mi.required.object(e)(n);
    return i.succeeded ? i.value : void 0
}
function q(n, t, e, i) {
    if (t && !t(n))
        return !1;
    const s = V(n, e);
    return s ? i(s) : !1
}
function G(n, t) {
    var e;
    return Wt((e = n == null ? void 0 : n()) !== null && e !== void 0 ? e : {}, t)
}
function Kt(n) {
    return "value"in n
}
function ca(n) {
    if (!ns(n) || !("binding"in n))
        return !1;
    const t = n.binding;
    return is(t)
}
const ot = "http://www.w3.org/2000/svg";
function _n(n) {
    n.offsetHeight
}
function ld(n, t) {
    const e = n.style.transition;
    n.style.transition = "none",
    t(),
    n.style.transition = e
}
function as(n) {
    return n.ontouchstart !== void 0
}
function pd() {
    return globalThis
}
function cd() {
    return pd().document
}
function hd(n) {
    const t = n.ownerDocument.defaultView;
    return t && "document"in t ? n.getContext("2d", {
        willReadFrequently: !0
    }) : null
}
const ud = {
    check: '<path d="M2 8l4 4l8 -8"/>',
    dropdown: '<path d="M5 7h6l-3 3 z"/>',
    p2dpad: '<path d="M8 4v8"/><path d="M4 8h8"/><circle cx="12" cy="12" r="1.2"/>'
};
function Dn(n, t) {
    const e = n.createElementNS(ot, "svg");
    return e.innerHTML = ud[t],
    e
}
function ha(n, t, e) {
    n.insertBefore(t, n.children[e])
}
function ls(n) {
    n.parentElement && n.parentElement.removeChild(n)
}
function ua(n) {
    for (; n.children.length > 0; )
        n.removeChild(n.children[0])
}
function dd(n) {
    for (; n.childNodes.length > 0; )
        n.removeChild(n.childNodes[0])
}
function da(n) {
    return n.relatedTarget ? n.relatedTarget : "explicitOriginalTarget"in n ? n.explicitOriginalTarget : null
}
function bt(n, t) {
    n.emitter.on("change", e=>{
        t(e.rawValue)
    }
    ),
    t(n.rawValue)
}
function lt(n, t, e) {
    bt(n.value(t), e)
}
const md = "tp";
function f(n) {
    return (e,i)=>[md, "-", n, "v", e ? `_${e}` : "", i ? `-${i}` : ""].join("")
}
const $e = f("lbl");
function vd(n, t) {
    const e = n.createDocumentFragment();
    return t.split(`
`).map(s=>n.createTextNode(s)).forEach((s,r)=>{
        r > 0 && e.appendChild(n.createElement("br")),
        e.appendChild(s)
    }
    ),
    e
}
class ma {
    constructor(t, e) {
        this.element = t.createElement("div"),
        this.element.classList.add($e()),
        e.viewProps.bindClassModifiers(this.element);
        const i = t.createElement("div");
        i.classList.add($e("l")),
        lt(e.props, "label", r=>{
            C(r) ? this.element.classList.add($e(void 0, "nol")) : (this.element.classList.remove($e(void 0, "nol")),
            dd(i),
            i.appendChild(vd(t, r)))
        }
        ),
        this.element.appendChild(i),
        this.labelElement = i;
        const s = t.createElement("div");
        s.classList.add($e("v")),
        this.element.appendChild(s),
        this.valueElement = s
    }
}
class va {
    constructor(t, e) {
        this.props = e.props,
        this.valueController = e.valueController,
        this.viewProps = e.valueController.viewProps,
        this.view = new ma(t,{
            props: e.props,
            viewProps: this.viewProps
        }),
        this.view.valueElement.appendChild(this.valueController.view.element)
    }
    importProps(t) {
        return q(t, null, e=>({
            label: e.optional.string
        }), e=>(this.props.set("label", e.label),
        !0))
    }
    exportProps() {
        return G(null, {
            label: this.props.get("label")
        })
    }
}
function bd() {
    return ["veryfirst", "first", "last", "verylast"]
}
const ur = f("")
  , dr = {
    veryfirst: "vfst",
    first: "fst",
    last: "lst",
    verylast: "vlst"
};
class Rn {
    constructor(t) {
        this.parent_ = null,
        this.blade = t.blade,
        this.view = t.view,
        this.viewProps = t.viewProps;
        const e = this.view.element;
        this.blade.value("positions").emitter.on("change", ()=>{
            bd().forEach(i=>{
                e.classList.remove(ur(void 0, dr[i]))
            }
            ),
            this.blade.get("positions").forEach(i=>{
                e.classList.add(ur(void 0, dr[i]))
            }
            )
        }
        ),
        this.viewProps.handleDispose(()=>{
            ls(e)
        }
        )
    }
    get parent() {
        return this.parent_
    }
    set parent(t) {
        this.parent_ = t,
        this.viewProps.set("parent", this.parent_ ? this.parent_.viewProps : null)
    }
    importState(t) {
        return q(t, null, e=>({
            disabled: e.required.boolean,
            hidden: e.required.boolean
        }), e=>(this.viewProps.importState(e),
        !0))
    }
    exportState() {
        return G(null, Object.assign({}, this.viewProps.exportState()))
    }
}
class Yt extends Rn {
    constructor(t, e) {
        if (e.value !== e.valueController.value)
            throw S.shouldNeverHappen();
        const i = e.valueController.viewProps
          , s = new va(t,{
            blade: e.blade,
            props: e.props,
            valueController: e.valueController
        });
        super(Object.assign(Object.assign({}, e), {
            view: new ma(t,{
                props: e.props,
                viewProps: i
            }),
            viewProps: i
        })),
        this.labelController = s,
        this.value = e.value,
        this.valueController = e.valueController,
        this.view.valueElement.appendChild(this.valueController.view.element)
    }
    importState(t) {
        return q(t, e=>{
            var i, s, r;
            return super.importState(e) && this.labelController.importProps(e) && ((r = (s = (i = this.valueController).importProps) === null || s === void 0 ? void 0 : s.call(i, t)) !== null && r !== void 0 ? r : !0)
        }
        , e=>({
            value: e.optional.raw
        }), e=>(e.value && (this.value.rawValue = e.value),
        !0))
    }
    exportState() {
        var t, e, i;
        return G(()=>super.exportState(), Object.assign(Object.assign({
            value: this.value.rawValue
        }, this.labelController.exportProps()), (i = (e = (t = this.valueController).exportProps) === null || e === void 0 ? void 0 : e.call(t)) !== null && i !== void 0 ? i : {}))
    }
}
function mr(n) {
    const t = Object.assign({}, n);
    return delete t.value,
    t
}
class ba extends Yt {
    constructor(t, e) {
        super(t, e),
        this.tag = e.tag
    }
    importState(t) {
        return q(t, e=>super.importState(mr(t)), e=>({
            tag: e.optional.string
        }), e=>(this.tag = e.tag,
        !0))
    }
    exportState() {
        return G(()=>mr(super.exportState()), {
            binding: {
                key: this.value.binding.target.key,
                value: this.value.binding.target.read()
            },
            tag: this.tag
        })
    }
}
function fd(n) {
    return Kt(n) && ca(n.value)
}
class wd extends ba {
    importState(t) {
        return q(t, e=>super.importState(e), e=>({
            binding: e.required.object({
                value: e.required.raw
            })
        }), e=>(this.value.binding.inject(e.binding.value),
        this.value.fetch(),
        !0))
    }
}
function _d(n) {
    return Kt(n) && sd(n.value)
}
function fa(n, t) {
    for (; n.length < t; )
        n.push(void 0)
}
function gd(n) {
    const t = [];
    return fa(t, n),
    t
}
function Cd(n) {
    const t = n.indexOf(void 0);
    return t < 0 ? n : n.slice(0, t)
}
function xd(n, t) {
    const e = [...Cd(n), t];
    return e.length > n.length ? e.splice(0, e.length - n.length) : fa(e, n.length),
    e
}
class Pd {
    constructor(t) {
        this.emitter = new T,
        this.onTick_ = this.onTick_.bind(this),
        this.onValueBeforeChange_ = this.onValueBeforeChange_.bind(this),
        this.onValueChange_ = this.onValueChange_.bind(this),
        this.binding = t.binding,
        this.value_ = E(gd(t.bufferSize)),
        this.value_.emitter.on("beforechange", this.onValueBeforeChange_),
        this.value_.emitter.on("change", this.onValueChange_),
        this.ticker = t.ticker,
        this.ticker.emitter.on("tick", this.onTick_),
        this.fetch()
    }
    get rawValue() {
        return this.value_.rawValue
    }
    set rawValue(t) {
        this.value_.rawValue = t
    }
    setRawValue(t, e) {
        this.value_.setRawValue(t, e)
    }
    fetch() {
        this.value_.rawValue = xd(this.value_.rawValue, this.binding.read())
    }
    onTick_() {
        this.fetch()
    }
    onValueBeforeChange_(t) {
        this.emitter.emit("beforechange", Object.assign(Object.assign({}, t), {
            sender: this
        }))
    }
    onValueChange_(t) {
        this.emitter.emit("change", Object.assign(Object.assign({}, t), {
            sender: this
        }))
    }
}
function yd(n) {
    if (!("binding"in n))
        return !1;
    const t = n.binding;
    return is(t) && "read"in t && !("write"in t)
}
class Ed extends ba {
    exportState() {
        return G(()=>super.exportState(), {
            binding: {
                readonly: !0
            }
        })
    }
}
function kd(n) {
    return Kt(n) && yd(n.value)
}
class Vd extends te {
    get label() {
        return this.controller.labelController.props.get("label")
    }
    set label(t) {
        this.controller.labelController.props.set("label", t)
    }
    get title() {
        var t;
        return (t = this.controller.buttonController.props.get("title")) !== null && t !== void 0 ? t : ""
    }
    set title(t) {
        this.controller.buttonController.props.set("title", t)
    }
    on(t, e) {
        const i = e.bind(this);
        return this.controller.buttonController.emitter.on(t, r=>{
            i(new nd(this,r.nativeEvent))
        }
        ),
        this
    }
    off(t, e) {
        return this.controller.buttonController.emitter.off(t, e),
        this
    }
}
function Sd(n, t, e) {
    e ? n.classList.add(t) : n.classList.remove(t)
}
function fe(n, t) {
    return e=>{
        Sd(n, t, e)
    }
}
function ps(n, t) {
    bt(n, e=>{
        t.textContent = e ?? ""
    }
    )
}
const Xn = f("btn");
class $d {
    constructor(t, e) {
        this.element = t.createElement("div"),
        this.element.classList.add(Xn()),
        e.viewProps.bindClassModifiers(this.element);
        const i = t.createElement("button");
        i.classList.add(Xn("b")),
        e.viewProps.bindDisabled(i),
        this.element.appendChild(i),
        this.buttonElement = i;
        const s = t.createElement("div");
        s.classList.add(Xn("t")),
        ps(e.props.value("title"), s),
        this.buttonElement.appendChild(s)
    }
}
class Ld {
    constructor(t, e) {
        this.emitter = new T,
        this.onClick_ = this.onClick_.bind(this),
        this.props = e.props,
        this.viewProps = e.viewProps,
        this.view = new $d(t,{
            props: this.props,
            viewProps: this.viewProps
        }),
        this.view.buttonElement.addEventListener("click", this.onClick_)
    }
    importProps(t) {
        return q(t, null, e=>({
            title: e.optional.string
        }), e=>(this.props.set("title", e.title),
        !0))
    }
    exportProps() {
        return G(null, {
            title: this.props.get("title")
        })
    }
    onClick_(t) {
        this.emitter.emit("click", {
            nativeEvent: t,
            sender: this
        })
    }
}
class vr extends Rn {
    constructor(t, e) {
        const i = new Ld(t,{
            props: e.buttonProps,
            viewProps: e.viewProps
        })
          , s = new va(t,{
            blade: e.blade,
            props: e.labelProps,
            valueController: i
        });
        super({
            blade: e.blade,
            view: s.view,
            viewProps: e.viewProps
        }),
        this.buttonController = i,
        this.labelController = s
    }
    importState(t) {
        return q(t, e=>super.importState(e) && this.buttonController.importProps(e) && this.labelController.importProps(e), ()=>({}), ()=>!0)
    }
    exportState() {
        return G(()=>super.exportState(), Object.assign(Object.assign({}, this.buttonController.exportProps()), this.labelController.exportProps()))
    }
}
class wa {
    constructor(t) {
        const [e,i] = t.split("-")
          , s = e.split(".");
        this.major = parseInt(s[0], 10),
        this.minor = parseInt(s[1], 10),
        this.patch = parseInt(s[2], 10),
        this.prerelease = i ?? null
    }
    toString() {
        const t = [this.major, this.minor, this.patch].join(".");
        return this.prerelease !== null ? [t, this.prerelease].join("-") : t
    }
}
const we = new wa("2.0.4");
function z(n) {
    return Object.assign({
        core: we
    }, n)
}
const Md = z({
    id: "button",
    type: "blade",
    accept(n) {
        const t = V(n, e=>({
            title: e.required.string,
            view: e.required.constant("button"),
            label: e.optional.string
        }));
        return t ? {
            params: t
        } : null
    },
    controller(n) {
        return new vr(n.document,{
            blade: n.blade,
            buttonProps: b.fromObject({
                title: n.params.title
            }),
            labelProps: b.fromObject({
                label: n.params.label
            }),
            viewProps: n.viewProps
        })
    },
    api(n) {
        return n.controller instanceof vr ? new Vd(n.controller) : null
    }
});
function Td(n, t) {
    return n.addBlade(Object.assign(Object.assign({}, t), {
        view: "button"
    }))
}
function Ad(n, t) {
    return n.addBlade(Object.assign(Object.assign({}, t), {
        view: "folder"
    }))
}
function Od(n, t) {
    return n.addBlade(Object.assign(Object.assign({}, t), {
        view: "tab"
    }))
}
function Dd(n) {
    return ns(n) ? "refresh"in n && typeof n.refresh == "function" : !1
}
function Rd(n, t) {
    if (!wn.isBindable(n))
        throw S.notBindable();
    return new wn(n,t)
}
class Bd {
    constructor(t, e) {
        this.onRackValueChange_ = this.onRackValueChange_.bind(this),
        this.controller_ = t,
        this.emitter_ = new T,
        this.pool_ = e,
        this.controller_.rack.emitter.on("valuechange", this.onRackValueChange_)
    }
    get children() {
        return this.controller_.rack.children.map(t=>this.pool_.createApi(t))
    }
    addBinding(t, e, i) {
        const s = i ?? {}
          , r = this.controller_.element.ownerDocument
          , o = this.pool_.createBinding(r, Rd(t, e), s)
          , a = this.pool_.createBindingApi(o);
        return this.add(a, s.index)
    }
    addFolder(t) {
        return Ad(this, t)
    }
    addButton(t) {
        return Td(this, t)
    }
    addTab(t) {
        return Od(this, t)
    }
    add(t, e) {
        const i = t.controller;
        return this.controller_.rack.add(i, e),
        t
    }
    remove(t) {
        this.controller_.rack.remove(t.controller)
    }
    addBlade(t) {
        const e = this.controller_.element.ownerDocument
          , i = this.pool_.createBlade(e, t)
          , s = this.pool_.createApi(i);
        return this.add(s, t.index)
    }
    on(t, e) {
        const i = e.bind(this);
        return this.emitter_.on(t, s=>{
            i(s)
        }
        , {
            key: e
        }),
        this
    }
    off(t, e) {
        return this.emitter_.off(t, e),
        this
    }
    refresh() {
        this.children.forEach(t=>{
            Dd(t) && t.refresh()
        }
        )
    }
    onRackValueChange_(t) {
        const e = t.bladeController
          , i = this.pool_.createApi(e)
          , s = ca(e.value) ? e.value.binding : null;
        this.emitter_.emit("change", new Xe(i,s ? s.target.read() : e.value.rawValue,t.options.last))
    }
}
class cs extends te {
    constructor(t, e) {
        super(t),
        this.rackApi_ = new Bd(t.rackController,e)
    }
    refresh() {
        this.rackApi_.refresh()
    }
}
class hs extends Rn {
    constructor(t) {
        super({
            blade: t.blade,
            view: t.view,
            viewProps: t.rackController.viewProps
        }),
        this.rackController = t.rackController
    }
    importState(t) {
        return q(t, e=>super.importState(e), e=>({
            children: e.required.array(e.required.raw)
        }), e=>this.rackController.rack.children.every((i,s)=>i.importState(e.children[s])))
    }
    exportState() {
        return G(()=>super.exportState(), {
            children: this.rackController.rack.children.map(t=>t.exportState())
        })
    }
}
function vi(n) {
    return "rackController"in n
}
class jd {
    constructor(t) {
        this.emitter = new T,
        this.items_ = [],
        this.cache_ = new Set,
        this.onSubListAdd_ = this.onSubListAdd_.bind(this),
        this.onSubListRemove_ = this.onSubListRemove_.bind(this),
        this.extract_ = t
    }
    get items() {
        return this.items_
    }
    allItems() {
        return Array.from(this.cache_)
    }
    find(t) {
        for (const e of this.allItems())
            if (t(e))
                return e;
        return null
    }
    includes(t) {
        return this.cache_.has(t)
    }
    add(t, e) {
        if (this.includes(t))
            throw S.shouldNeverHappen();
        const i = e !== void 0 ? e : this.items_.length;
        this.items_.splice(i, 0, t),
        this.cache_.add(t);
        const s = this.extract_(t);
        s && (s.emitter.on("add", this.onSubListAdd_),
        s.emitter.on("remove", this.onSubListRemove_),
        s.allItems().forEach(r=>{
            this.cache_.add(r)
        }
        )),
        this.emitter.emit("add", {
            index: i,
            item: t,
            root: this,
            target: this
        })
    }
    remove(t) {
        const e = this.items_.indexOf(t);
        if (e < 0)
            return;
        this.items_.splice(e, 1),
        this.cache_.delete(t);
        const i = this.extract_(t);
        i && (i.allItems().forEach(s=>{
            this.cache_.delete(s)
        }
        ),
        i.emitter.off("add", this.onSubListAdd_),
        i.emitter.off("remove", this.onSubListRemove_)),
        this.emitter.emit("remove", {
            index: e,
            item: t,
            root: this,
            target: this
        })
    }
    onSubListAdd_(t) {
        this.cache_.add(t.item),
        this.emitter.emit("add", {
            index: t.index,
            item: t.item,
            root: this,
            target: t.target
        })
    }
    onSubListRemove_(t) {
        this.cache_.delete(t.item),
        this.emitter.emit("remove", {
            index: t.index,
            item: t.item,
            root: this,
            target: t.target
        })
    }
}
function Nd(n, t) {
    for (let e = 0; e < n.length; e++) {
        const i = n[e];
        if (Kt(i) && i.value === t)
            return i
    }
    return null
}
function Id(n) {
    return vi(n) ? n.rackController.rack.bcSet_ : null
}
class Fd {
    constructor(t) {
        var e, i;
        this.emitter = new T,
        this.onBladePositionsChange_ = this.onBladePositionsChange_.bind(this),
        this.onSetAdd_ = this.onSetAdd_.bind(this),
        this.onSetRemove_ = this.onSetRemove_.bind(this),
        this.onChildDispose_ = this.onChildDispose_.bind(this),
        this.onChildPositionsChange_ = this.onChildPositionsChange_.bind(this),
        this.onChildValueChange_ = this.onChildValueChange_.bind(this),
        this.onChildViewPropsChange_ = this.onChildViewPropsChange_.bind(this),
        this.onRackLayout_ = this.onRackLayout_.bind(this),
        this.onRackValueChange_ = this.onRackValueChange_.bind(this),
        this.blade_ = (e = t.blade) !== null && e !== void 0 ? e : null,
        (i = this.blade_) === null || i === void 0 || i.value("positions").emitter.on("change", this.onBladePositionsChange_),
        this.viewProps = t.viewProps,
        this.bcSet_ = new jd(Id),
        this.bcSet_.emitter.on("add", this.onSetAdd_),
        this.bcSet_.emitter.on("remove", this.onSetRemove_)
    }
    get children() {
        return this.bcSet_.items
    }
    add(t, e) {
        var i;
        (i = t.parent) === null || i === void 0 || i.remove(t),
        t.parent = this,
        this.bcSet_.add(t, e)
    }
    remove(t) {
        t.parent = null,
        this.bcSet_.remove(t)
    }
    find(t) {
        return this.bcSet_.allItems().filter(t)
    }
    onSetAdd_(t) {
        this.updatePositions_();
        const e = t.target === t.root;
        if (this.emitter.emit("add", {
            bladeController: t.item,
            index: t.index,
            root: e,
            sender: this
        }),
        !e)
            return;
        const i = t.item;
        if (i.viewProps.emitter.on("change", this.onChildViewPropsChange_),
        i.blade.value("positions").emitter.on("change", this.onChildPositionsChange_),
        i.viewProps.handleDispose(this.onChildDispose_),
        Kt(i))
            i.value.emitter.on("change", this.onChildValueChange_);
        else if (vi(i)) {
            const s = i.rackController.rack;
            if (s) {
                const r = s.emitter;
                r.on("layout", this.onRackLayout_),
                r.on("valuechange", this.onRackValueChange_)
            }
        }
    }
    onSetRemove_(t) {
        this.updatePositions_();
        const e = t.target === t.root;
        if (this.emitter.emit("remove", {
            bladeController: t.item,
            root: e,
            sender: this
        }),
        !e)
            return;
        const i = t.item;
        if (Kt(i))
            i.value.emitter.off("change", this.onChildValueChange_);
        else if (vi(i)) {
            const s = i.rackController.rack;
            if (s) {
                const r = s.emitter;
                r.off("layout", this.onRackLayout_),
                r.off("valuechange", this.onRackValueChange_)
            }
        }
    }
    updatePositions_() {
        const t = this.bcSet_.items.filter(s=>!s.viewProps.get("hidden"))
          , e = t[0]
          , i = t[t.length - 1];
        this.bcSet_.items.forEach(s=>{
            const r = [];
            s === e && (r.push("first"),
            (!this.blade_ || this.blade_.get("positions").includes("veryfirst")) && r.push("veryfirst")),
            s === i && (r.push("last"),
            (!this.blade_ || this.blade_.get("positions").includes("verylast")) && r.push("verylast")),
            s.blade.set("positions", r)
        }
        )
    }
    onChildPositionsChange_() {
        this.updatePositions_(),
        this.emitter.emit("layout", {
            sender: this
        })
    }
    onChildViewPropsChange_(t) {
        this.updatePositions_(),
        this.emitter.emit("layout", {
            sender: this
        })
    }
    onChildDispose_() {
        this.bcSet_.items.filter(e=>e.viewProps.get("disposed")).forEach(e=>{
            this.bcSet_.remove(e)
        }
        )
    }
    onChildValueChange_(t) {
        const e = Nd(this.find(Kt), t.sender);
        if (!e)
            throw S.alreadyDisposed();
        this.emitter.emit("valuechange", {
            bladeController: e,
            options: t.options,
            sender: this
        })
    }
    onRackLayout_(t) {
        this.updatePositions_(),
        this.emitter.emit("layout", {
            sender: this
        })
    }
    onRackValueChange_(t) {
        this.emitter.emit("valuechange", {
            bladeController: t.bladeController,
            options: t.options,
            sender: this
        })
    }
    onBladePositionsChange_() {
        this.updatePositions_()
    }
}
class us {
    constructor(t) {
        this.onRackAdd_ = this.onRackAdd_.bind(this),
        this.onRackRemove_ = this.onRackRemove_.bind(this),
        this.element = t.element,
        this.viewProps = t.viewProps;
        const e = new Fd({
            blade: t.root ? void 0 : t.blade,
            viewProps: t.viewProps
        });
        e.emitter.on("add", this.onRackAdd_),
        e.emitter.on("remove", this.onRackRemove_),
        this.rack = e,
        this.viewProps.handleDispose(()=>{
            for (let i = this.rack.children.length - 1; i >= 0; i--)
                this.rack.children[i].viewProps.set("disposed", !0)
        }
        )
    }
    onRackAdd_(t) {
        t.root && ha(this.element, t.bladeController.view.element, t.index)
    }
    onRackRemove_(t) {
        t.root && ls(t.bladeController.view.element)
    }
}
function _e() {
    return new b({
        positions: E([], {
            equals: wu
        })
    })
}
class Ze extends b {
    constructor(t) {
        super(t)
    }
    static create(t) {
        const e = {
            completed: !0,
            expanded: t,
            expandedHeight: null,
            shouldFixHeight: !1,
            temporaryExpanded: null
        }
          , i = b.createCore(e);
        return new Ze(i)
    }
    get styleExpanded() {
        var t;
        return (t = this.get("temporaryExpanded")) !== null && t !== void 0 ? t : this.get("expanded")
    }
    get styleHeight() {
        if (!this.styleExpanded)
            return "0";
        const t = this.get("expandedHeight");
        return this.get("shouldFixHeight") && !C(t) ? `${t}px` : "auto"
    }
    bindExpandedClass(t, e) {
        const i = ()=>{
            this.styleExpanded ? t.classList.add(e) : t.classList.remove(e)
        }
        ;
        lt(this, "expanded", i),
        lt(this, "temporaryExpanded", i)
    }
    cleanUpTransition() {
        this.set("shouldFixHeight", !1),
        this.set("expandedHeight", null),
        this.set("completed", !0)
    }
}
function zd(n, t) {
    let e = 0;
    return ld(t, ()=>{
        n.set("expandedHeight", null),
        n.set("temporaryExpanded", !0),
        _n(t),
        e = t.clientHeight,
        n.set("temporaryExpanded", null),
        _n(t)
    }
    ),
    e
}
function br(n, t) {
    t.style.height = n.styleHeight
}
function ds(n, t) {
    n.value("expanded").emitter.on("beforechange", ()=>{
        if (n.set("completed", !1),
        C(n.get("expandedHeight"))) {
            const e = zd(n, t);
            e > 0 && n.set("expandedHeight", e)
        }
        n.set("shouldFixHeight", !0),
        _n(t)
    }
    ),
    n.emitter.on("change", ()=>{
        br(n, t)
    }
    ),
    br(n, t),
    t.addEventListener("transitionend", e=>{
        e.propertyName === "height" && n.cleanUpTransition()
    }
    )
}
class _a extends cs {
    constructor(t, e) {
        super(t, e),
        this.emitter_ = new T,
        this.controller.foldable.value("expanded").emitter.on("change", i=>{
            this.emitter_.emit("fold", new td(this,i.sender.rawValue))
        }
        ),
        this.rackApi_.on("change", i=>{
            this.emitter_.emit("change", i)
        }
        )
    }
    get expanded() {
        return this.controller.foldable.get("expanded")
    }
    set expanded(t) {
        this.controller.foldable.set("expanded", t)
    }
    get title() {
        return this.controller.props.get("title")
    }
    set title(t) {
        this.controller.props.set("title", t)
    }
    get children() {
        return this.rackApi_.children
    }
    addBinding(t, e, i) {
        return this.rackApi_.addBinding(t, e, i)
    }
    addFolder(t) {
        return this.rackApi_.addFolder(t)
    }
    addButton(t) {
        return this.rackApi_.addButton(t)
    }
    addTab(t) {
        return this.rackApi_.addTab(t)
    }
    add(t, e) {
        return this.rackApi_.add(t, e)
    }
    remove(t) {
        this.rackApi_.remove(t)
    }
    addBlade(t) {
        return this.rackApi_.addBlade(t)
    }
    on(t, e) {
        const i = e.bind(this);
        return this.emitter_.on(t, s=>{
            i(s)
        }
        , {
            key: e
        }),
        this
    }
    off(t, e) {
        return this.emitter_.off(t, e),
        this
    }
}
const ga = f("cnt");
class Kd {
    constructor(t, e) {
        var i;
        this.className_ = f((i = e.viewName) !== null && i !== void 0 ? i : "fld"),
        this.element = t.createElement("div"),
        this.element.classList.add(this.className_(), ga()),
        e.viewProps.bindClassModifiers(this.element),
        this.foldable_ = e.foldable,
        this.foldable_.bindExpandedClass(this.element, this.className_(void 0, "expanded")),
        lt(this.foldable_, "completed", fe(this.element, this.className_(void 0, "cpl")));
        const s = t.createElement("button");
        s.classList.add(this.className_("b")),
        lt(e.props, "title", p=>{
            C(p) ? this.element.classList.add(this.className_(void 0, "not")) : this.element.classList.remove(this.className_(void 0, "not"))
        }
        ),
        e.viewProps.bindDisabled(s),
        this.element.appendChild(s),
        this.buttonElement = s;
        const r = t.createElement("div");
        r.classList.add(this.className_("i")),
        this.element.appendChild(r);
        const o = t.createElement("div");
        o.classList.add(this.className_("t")),
        ps(e.props.value("title"), o),
        this.buttonElement.appendChild(o),
        this.titleElement = o;
        const a = t.createElement("div");
        a.classList.add(this.className_("m")),
        this.buttonElement.appendChild(a);
        const l = t.createElement("div");
        l.classList.add(this.className_("c")),
        this.element.appendChild(l),
        this.containerElement = l
    }
}
class bi extends hs {
    constructor(t, e) {
        var i;
        const s = Ze.create((i = e.expanded) !== null && i !== void 0 ? i : !0)
          , r = new Kd(t,{
            foldable: s,
            props: e.props,
            viewName: e.root ? "rot" : void 0,
            viewProps: e.viewProps
        });
        super(Object.assign(Object.assign({}, e), {
            rackController: new us({
                blade: e.blade,
                element: r.containerElement,
                root: e.root,
                viewProps: e.viewProps
            }),
            view: r
        })),
        this.onTitleClick_ = this.onTitleClick_.bind(this),
        this.props = e.props,
        this.foldable = s,
        ds(this.foldable, this.view.containerElement),
        this.rackController.rack.emitter.on("add", ()=>{
            this.foldable.cleanUpTransition()
        }
        ),
        this.rackController.rack.emitter.on("remove", ()=>{
            this.foldable.cleanUpTransition()
        }
        ),
        this.view.buttonElement.addEventListener("click", this.onTitleClick_)
    }
    get document() {
        return this.view.element.ownerDocument
    }
    importState(t) {
        return q(t, e=>super.importState(e), e=>({
            expanded: e.required.boolean,
            title: e.optional.string
        }), e=>(this.foldable.set("expanded", e.expanded),
        this.props.set("title", e.title),
        !0))
    }
    exportState() {
        return G(()=>super.exportState(), {
            expanded: this.foldable.get("expanded"),
            title: this.props.get("title")
        })
    }
    onTitleClick_() {
        this.foldable.set("expanded", !this.foldable.get("expanded"))
    }
}
const Ud = z({
    id: "folder",
    type: "blade",
    accept(n) {
        const t = V(n, e=>({
            title: e.required.string,
            view: e.required.constant("folder"),
            expanded: e.optional.boolean
        }));
        return t ? {
            params: t
        } : null
    },
    controller(n) {
        return new bi(n.document,{
            blade: n.blade,
            expanded: n.params.expanded,
            props: b.fromObject({
                title: n.params.title
            }),
            viewProps: n.viewProps
        })
    },
    api(n) {
        return n.controller instanceof bi ? new _a(n.controller,n.pool) : null
    }
})
  , Hd = f("");
function fr(n, t) {
    return fe(n, Hd(void 0, t))
}
class Ct extends b {
    constructor(t) {
        var e;
        super(t),
        this.onDisabledChange_ = this.onDisabledChange_.bind(this),
        this.onParentChange_ = this.onParentChange_.bind(this),
        this.onParentGlobalDisabledChange_ = this.onParentGlobalDisabledChange_.bind(this),
        [this.globalDisabled_,this.setGlobalDisabled_] = Pu(E(this.getGlobalDisabled_())),
        this.value("disabled").emitter.on("change", this.onDisabledChange_),
        this.value("parent").emitter.on("change", this.onParentChange_),
        (e = this.get("parent")) === null || e === void 0 || e.globalDisabled.emitter.on("change", this.onParentGlobalDisabledChange_)
    }
    static create(t) {
        var e, i, s;
        const r = t ?? {};
        return new Ct(b.createCore({
            disabled: (e = r.disabled) !== null && e !== void 0 ? e : !1,
            disposed: !1,
            hidden: (i = r.hidden) !== null && i !== void 0 ? i : !1,
            parent: (s = r.parent) !== null && s !== void 0 ? s : null
        }))
    }
    get globalDisabled() {
        return this.globalDisabled_
    }
    bindClassModifiers(t) {
        bt(this.globalDisabled_, fr(t, "disabled")),
        lt(this, "hidden", fr(t, "hidden"))
    }
    bindDisabled(t) {
        bt(this.globalDisabled_, e=>{
            t.disabled = e
        }
        )
    }
    bindTabIndex(t) {
        bt(this.globalDisabled_, e=>{
            t.tabIndex = e ? -1 : 0
        }
        )
    }
    handleDispose(t) {
        this.value("disposed").emitter.on("change", e=>{
            e && t()
        }
        )
    }
    importState(t) {
        this.set("disabled", t.disabled),
        this.set("hidden", t.hidden)
    }
    exportState() {
        return {
            disabled: this.get("disabled"),
            hidden: this.get("hidden")
        }
    }
    getGlobalDisabled_() {
        const t = this.get("parent");
        return (t ? t.globalDisabled.rawValue : !1) || this.get("disabled")
    }
    updateGlobalDisabled_() {
        this.setGlobalDisabled_(this.getGlobalDisabled_())
    }
    onDisabledChange_() {
        this.updateGlobalDisabled_()
    }
    onParentGlobalDisabledChange_() {
        this.updateGlobalDisabled_()
    }
    onParentChange_(t) {
        var e;
        const i = t.previousRawValue;
        i == null || i.globalDisabled.emitter.off("change", this.onParentGlobalDisabledChange_),
        (e = this.get("parent")) === null || e === void 0 || e.globalDisabled.emitter.on("change", this.onParentGlobalDisabledChange_),
        this.updateGlobalDisabled_()
    }
}
const wr = f("tbp");
class qd {
    constructor(t, e) {
        this.element = t.createElement("div"),
        this.element.classList.add(wr()),
        e.viewProps.bindClassModifiers(this.element);
        const i = t.createElement("div");
        i.classList.add(wr("c")),
        this.element.appendChild(i),
        this.containerElement = i
    }
}
const Le = f("tbi");
class Gd {
    constructor(t, e) {
        this.element = t.createElement("div"),
        this.element.classList.add(Le()),
        e.viewProps.bindClassModifiers(this.element),
        lt(e.props, "selected", r=>{
            r ? this.element.classList.add(Le(void 0, "sel")) : this.element.classList.remove(Le(void 0, "sel"))
        }
        );
        const i = t.createElement("button");
        i.classList.add(Le("b")),
        e.viewProps.bindDisabled(i),
        this.element.appendChild(i),
        this.buttonElement = i;
        const s = t.createElement("div");
        s.classList.add(Le("t")),
        ps(e.props.value("title"), s),
        this.buttonElement.appendChild(s),
        this.titleElement = s
    }
}
class Wd {
    constructor(t, e) {
        this.emitter = new T,
        this.onClick_ = this.onClick_.bind(this),
        this.props = e.props,
        this.viewProps = e.viewProps,
        this.view = new Gd(t,{
            props: e.props,
            viewProps: e.viewProps
        }),
        this.view.buttonElement.addEventListener("click", this.onClick_)
    }
    onClick_() {
        this.emitter.emit("click", {
            sender: this
        })
    }
}
class fi extends hs {
    constructor(t, e) {
        const i = new qd(t,{
            viewProps: e.viewProps
        });
        super(Object.assign(Object.assign({}, e), {
            rackController: new us({
                blade: e.blade,
                element: i.containerElement,
                viewProps: e.viewProps
            }),
            view: i
        })),
        this.onItemClick_ = this.onItemClick_.bind(this),
        this.ic_ = new Wd(t,{
            props: e.itemProps,
            viewProps: Ct.create()
        }),
        this.ic_.emitter.on("click", this.onItemClick_),
        this.props = e.props,
        lt(this.props, "selected", s=>{
            this.itemController.props.set("selected", s),
            this.viewProps.set("hidden", !s)
        }
        )
    }
    get itemController() {
        return this.ic_
    }
    importState(t) {
        return q(t, e=>super.importState(e), e=>({
            selected: e.required.boolean,
            title: e.required.string
        }), e=>(this.ic_.props.set("selected", e.selected),
        this.ic_.props.set("title", e.title),
        !0))
    }
    exportState() {
        return G(()=>super.exportState(), {
            selected: this.ic_.props.get("selected"),
            title: this.ic_.props.get("title")
        })
    }
    onItemClick_() {
        this.props.set("selected", !0)
    }
}
class Yd extends cs {
    constructor(t, e) {
        super(t, e),
        this.emitter_ = new T,
        this.onSelect_ = this.onSelect_.bind(this),
        this.pool_ = e,
        this.rackApi_.on("change", i=>{
            this.emitter_.emit("change", i)
        }
        ),
        this.controller.tab.selectedIndex.emitter.on("change", this.onSelect_)
    }
    get pages() {
        return this.rackApi_.children
    }
    addPage(t) {
        const e = this.controller.view.element.ownerDocument
          , i = new fi(e,{
            blade: _e(),
            itemProps: b.fromObject({
                selected: !1,
                title: t.title
            }),
            props: b.fromObject({
                selected: !1
            }),
            viewProps: Ct.create()
        })
          , s = this.pool_.createApi(i);
        return this.rackApi_.add(s, t.index)
    }
    removePage(t) {
        this.rackApi_.remove(this.rackApi_.children[t])
    }
    on(t, e) {
        const i = e.bind(this);
        return this.emitter_.on(t, s=>{
            i(s)
        }
        , {
            key: e
        }),
        this
    }
    off(t, e) {
        return this.emitter_.off(t, e),
        this
    }
    onSelect_(t) {
        this.emitter_.emit("select", new ed(this,t.rawValue))
    }
}
class Xd extends cs {
    get title() {
        var t;
        return (t = this.controller.itemController.props.get("title")) !== null && t !== void 0 ? t : ""
    }
    set title(t) {
        this.controller.itemController.props.set("title", t)
    }
    get selected() {
        return this.controller.props.get("selected")
    }
    set selected(t) {
        this.controller.props.set("selected", t)
    }
    get children() {
        return this.rackApi_.children
    }
    addButton(t) {
        return this.rackApi_.addButton(t)
    }
    addFolder(t) {
        return this.rackApi_.addFolder(t)
    }
    addTab(t) {
        return this.rackApi_.addTab(t)
    }
    add(t, e) {
        this.rackApi_.add(t, e)
    }
    remove(t) {
        this.rackApi_.remove(t)
    }
    addBinding(t, e, i) {
        return this.rackApi_.addBinding(t, e, i)
    }
    addBlade(t) {
        return this.rackApi_.addBlade(t)
    }
}
const _r = -1;
class Zd {
    constructor() {
        this.onItemSelectedChange_ = this.onItemSelectedChange_.bind(this),
        this.empty = E(!0),
        this.selectedIndex = E(_r),
        this.items_ = []
    }
    add(t, e) {
        const i = e ?? this.items_.length;
        this.items_.splice(i, 0, t),
        t.emitter.on("change", this.onItemSelectedChange_),
        this.keepSelection_()
    }
    remove(t) {
        const e = this.items_.indexOf(t);
        e < 0 || (this.items_.splice(e, 1),
        t.emitter.off("change", this.onItemSelectedChange_),
        this.keepSelection_())
    }
    keepSelection_() {
        if (this.items_.length === 0) {
            this.selectedIndex.rawValue = _r,
            this.empty.rawValue = !0;
            return
        }
        const t = this.items_.findIndex(e=>e.rawValue);
        t < 0 ? (this.items_.forEach((e,i)=>{
            e.rawValue = i === 0
        }
        ),
        this.selectedIndex.rawValue = 0) : (this.items_.forEach((e,i)=>{
            e.rawValue = i === t
        }
        ),
        this.selectedIndex.rawValue = t),
        this.empty.rawValue = !1
    }
    onItemSelectedChange_(t) {
        if (t.rawValue) {
            const e = this.items_.findIndex(i=>i === t.sender);
            this.items_.forEach((i,s)=>{
                i.rawValue = s === e
            }
            ),
            this.selectedIndex.rawValue = e
        } else
            this.keepSelection_()
    }
}
const Me = f("tab");
class Jd {
    constructor(t, e) {
        this.element = t.createElement("div"),
        this.element.classList.add(Me(), ga()),
        e.viewProps.bindClassModifiers(this.element),
        bt(e.empty, fe(this.element, Me(void 0, "nop")));
        const i = t.createElement("div");
        i.classList.add(Me("t")),
        this.element.appendChild(i),
        this.itemsElement = i;
        const s = t.createElement("div");
        s.classList.add(Me("i")),
        this.element.appendChild(s);
        const r = t.createElement("div");
        r.classList.add(Me("c")),
        this.element.appendChild(r),
        this.contentsElement = r
    }
}
class gr extends hs {
    constructor(t, e) {
        const i = new Zd
          , s = new Jd(t,{
            empty: i.empty,
            viewProps: e.viewProps
        });
        super({
            blade: e.blade,
            rackController: new us({
                blade: e.blade,
                element: s.contentsElement,
                viewProps: e.viewProps
            }),
            view: s
        }),
        this.onRackAdd_ = this.onRackAdd_.bind(this),
        this.onRackRemove_ = this.onRackRemove_.bind(this);
        const r = this.rackController.rack;
        r.emitter.on("add", this.onRackAdd_),
        r.emitter.on("remove", this.onRackRemove_),
        this.tab = i
    }
    add(t, e) {
        this.rackController.rack.add(t, e)
    }
    remove(t) {
        this.rackController.rack.remove(this.rackController.rack.children[t])
    }
    onRackAdd_(t) {
        if (!t.root)
            return;
        const e = t.bladeController;
        ha(this.view.itemsElement, e.itemController.view.element, t.index),
        e.itemController.viewProps.set("parent", this.viewProps),
        this.tab.add(e.props.value("selected"))
    }
    onRackRemove_(t) {
        if (!t.root)
            return;
        const e = t.bladeController;
        ls(e.itemController.view.element),
        e.itemController.viewProps.set("parent", null),
        this.tab.remove(e.props.value("selected"))
    }
}
const Ca = z({
    id: "tab",
    type: "blade",
    accept(n) {
        const t = V(n, e=>({
            pages: e.required.array(e.required.object({
                title: e.required.string
            })),
            view: e.required.constant("tab")
        }));
        return !t || t.pages.length === 0 ? null : {
            params: t
        }
    },
    controller(n) {
        const t = new gr(n.document,{
            blade: n.blade,
            viewProps: n.viewProps
        });
        return n.params.pages.forEach(e=>{
            const i = new fi(n.document,{
                blade: _e(),
                itemProps: b.fromObject({
                    selected: !1,
                    title: e.title
                }),
                props: b.fromObject({
                    selected: !1
                }),
                viewProps: Ct.create()
            });
            t.add(i)
        }
        ),
        t
    },
    api(n) {
        return n.controller instanceof gr ? new Yd(n.controller,n.pool) : n.controller instanceof fi ? new Xd(n.controller,n.pool) : null
    }
});
function Qd(n, t) {
    const e = n.accept(t.params);
    if (!e)
        return null;
    const i = V(t.params, s=>({
        disabled: s.optional.boolean,
        hidden: s.optional.boolean
    }));
    return n.controller({
        blade: _e(),
        document: t.document,
        params: Object.assign(Object.assign({}, e.params), {
            disabled: i == null ? void 0 : i.disabled,
            hidden: i == null ? void 0 : i.hidden
        }),
        viewProps: Ct.create({
            disabled: i == null ? void 0 : i.disabled,
            hidden: i == null ? void 0 : i.hidden
        })
    })
}
class ms extends Ne {
    get options() {
        return this.controller.valueController.props.get("options")
    }
    set options(t) {
        this.controller.valueController.props.set("options", t)
    }
}
class tm {
    constructor() {
        this.disabled = !1,
        this.emitter = new T
    }
    dispose() {}
    tick() {
        this.disabled || this.emitter.emit("tick", {
            sender: this
        })
    }
}
class em {
    constructor(t, e) {
        this.disabled_ = !1,
        this.timerId_ = null,
        this.onTick_ = this.onTick_.bind(this),
        this.doc_ = t,
        this.emitter = new T,
        this.interval_ = e,
        this.setTimer_()
    }
    get disabled() {
        return this.disabled_
    }
    set disabled(t) {
        this.disabled_ = t,
        this.disabled_ ? this.clearTimer_() : this.setTimer_()
    }
    dispose() {
        this.clearTimer_()
    }
    clearTimer_() {
        if (this.timerId_ === null)
            return;
        const t = this.doc_.defaultView;
        t && t.clearInterval(this.timerId_),
        this.timerId_ = null
    }
    setTimer_() {
        if (this.clearTimer_(),
        this.interval_ <= 0)
            return;
        const t = this.doc_.defaultView;
        t && (this.timerId_ = t.setInterval(this.onTick_, this.interval_))
    }
    onTick_() {
        this.disabled_ || this.emitter.emit("tick", {
            sender: this
        })
    }
}
class Je {
    constructor(t) {
        this.constraints = t
    }
    constrain(t) {
        return this.constraints.reduce((e,i)=>i.constrain(e), t)
    }
}
function gn(n, t) {
    if (n instanceof t)
        return n;
    if (n instanceof Je) {
        const e = n.constraints.reduce((i,s)=>i || (s instanceof t ? s : null), null);
        if (e)
            return e
    }
    return null
}
class Qe {
    constructor(t) {
        this.values = b.fromObject({
            options: t
        })
    }
    constrain(t) {
        const e = this.values.get("options");
        return e.length === 0 || e.filter(s=>s.value === t).length > 0 ? t : e[0].value
    }
}
function tn(n) {
    var t;
    const e = mi;
    if (Array.isArray(n))
        return (t = V({
            items: n
        }, i=>({
            items: i.required.array(i.required.object({
                text: i.required.string,
                value: i.required.raw
            }))
        }))) === null || t === void 0 ? void 0 : t.items;
    if (typeof n == "object")
        return e.required.raw(n).value
}
function vs(n) {
    if (Array.isArray(n))
        return n;
    const t = [];
    return Object.keys(n).forEach(e=>{
        t.push({
            text: e,
            value: n[e]
        })
    }
    ),
    t
}
function bs(n) {
    return C(n) ? null : new Qe(vs(n))
}
const Zn = f("lst");
class nm {
    constructor(t, e) {
        this.onValueChange_ = this.onValueChange_.bind(this),
        this.props_ = e.props,
        this.element = t.createElement("div"),
        this.element.classList.add(Zn()),
        e.viewProps.bindClassModifiers(this.element);
        const i = t.createElement("select");
        i.classList.add(Zn("s")),
        e.viewProps.bindDisabled(i),
        this.element.appendChild(i),
        this.selectElement = i;
        const s = t.createElement("div");
        s.classList.add(Zn("m")),
        s.appendChild(Dn(t, "dropdown")),
        this.element.appendChild(s),
        e.value.emitter.on("change", this.onValueChange_),
        this.value_ = e.value,
        lt(this.props_, "options", r=>{
            ua(this.selectElement),
            r.forEach(o=>{
                const a = t.createElement("option");
                a.textContent = o.text,
                this.selectElement.appendChild(a)
            }
            ),
            this.update_()
        }
        )
    }
    update_() {
        const t = this.props_.get("options").map(e=>e.value);
        this.selectElement.selectedIndex = t.indexOf(this.value_.rawValue)
    }
    onValueChange_() {
        this.update_()
    }
}
class Ot {
    constructor(t, e) {
        this.onSelectChange_ = this.onSelectChange_.bind(this),
        this.props = e.props,
        this.value = e.value,
        this.viewProps = e.viewProps,
        this.view = new nm(t,{
            props: this.props,
            value: this.value,
            viewProps: this.viewProps
        }),
        this.view.selectElement.addEventListener("change", this.onSelectChange_)
    }
    onSelectChange_(t) {
        const e = t.currentTarget;
        this.value.rawValue = this.props.get("options")[e.selectedIndex].value
    }
    importProps(t) {
        return q(t, null, e=>({
            options: e.required.custom(tn)
        }), e=>(this.props.set("options", vs(e.options)),
        !0))
    }
    exportProps() {
        return G(null, {
            options: this.props.get("options")
        })
    }
}
const Cr = f("pop");
class im {
    constructor(t, e) {
        this.element = t.createElement("div"),
        this.element.classList.add(Cr()),
        e.viewProps.bindClassModifiers(this.element),
        bt(e.shows, fe(this.element, Cr(void 0, "v")))
    }
}
class xa {
    constructor(t, e) {
        this.shows = E(!1),
        this.viewProps = e.viewProps,
        this.view = new im(t,{
            shows: this.shows,
            viewProps: this.viewProps
        })
    }
}
const xr = f("txt");
class sm {
    constructor(t, e) {
        this.onChange_ = this.onChange_.bind(this),
        this.element = t.createElement("div"),
        this.element.classList.add(xr()),
        e.viewProps.bindClassModifiers(this.element),
        this.props_ = e.props,
        this.props_.emitter.on("change", this.onChange_);
        const i = t.createElement("input");
        i.classList.add(xr("i")),
        i.type = "text",
        e.viewProps.bindDisabled(i),
        this.element.appendChild(i),
        this.inputElement = i,
        e.value.emitter.on("change", this.onChange_),
        this.value_ = e.value,
        this.refresh()
    }
    refresh() {
        const t = this.props_.get("formatter");
        this.inputElement.value = t(this.value_.rawValue)
    }
    onChange_() {
        this.refresh()
    }
}
class Ie {
    constructor(t, e) {
        this.onInputChange_ = this.onInputChange_.bind(this),
        this.parser_ = e.parser,
        this.props = e.props,
        this.value = e.value,
        this.viewProps = e.viewProps,
        this.view = new sm(t,{
            props: e.props,
            value: this.value,
            viewProps: this.viewProps
        }),
        this.view.inputElement.addEventListener("change", this.onInputChange_)
    }
    onInputChange_(t) {
        const i = t.currentTarget.value
          , s = this.parser_(i);
        C(s) || (this.value.rawValue = s),
        this.view.refresh()
    }
}
function rm(n) {
    return String(n)
}
function Pa(n) {
    return n === "false" ? !1 : !!n
}
function Pr(n) {
    return rm(n)
}
function om(n) {
    return t=>n.reduce((e,i)=>e !== null ? e : i(t), null)
}
const am = U(0);
function Cn(n) {
    return am(n) + "%"
}
function ya(n) {
    return String(n)
}
function wi(n) {
    return n
}
function ge({primary: n, secondary: t, forward: e, backward: i}) {
    let s = !1;
    function r(o) {
        s || (s = !0,
        o(),
        s = !1)
    }
    n.emitter.on("change", o=>{
        r(()=>{
            t.setRawValue(e(n.rawValue, t.rawValue), o.options)
        }
        )
    }
    ),
    t.emitter.on("change", o=>{
        r(()=>{
            n.setRawValue(i(n.rawValue, t.rawValue), o.options)
        }
        ),
        r(()=>{
            t.setRawValue(e(n.rawValue, t.rawValue), o.options)
        }
        )
    }
    ),
    r(()=>{
        t.setRawValue(e(n.rawValue, t.rawValue), {
            forceEmit: !1,
            last: !0
        })
    }
    )
}
function K(n, t) {
    const e = n * (t.altKey ? .1 : 1) * (t.shiftKey ? 10 : 1);
    return t.upKey ? +e : t.downKey ? -e : 0
}
function Fe(n) {
    return {
        altKey: n.altKey,
        downKey: n.key === "ArrowDown",
        shiftKey: n.shiftKey,
        upKey: n.key === "ArrowUp"
    }
}
function _t(n) {
    return {
        altKey: n.altKey,
        downKey: n.key === "ArrowLeft",
        shiftKey: n.shiftKey,
        upKey: n.key === "ArrowRight"
    }
}
function lm(n) {
    return n === "ArrowUp" || n === "ArrowDown"
}
function Ea(n) {
    return lm(n) || n === "ArrowLeft" || n === "ArrowRight"
}
function Jn(n, t) {
    var e, i;
    const s = t.ownerDocument.defaultView
      , r = t.getBoundingClientRect();
    return {
        x: n.pageX - (((e = s && s.scrollX) !== null && e !== void 0 ? e : 0) + r.left),
        y: n.pageY - (((i = s && s.scrollY) !== null && i !== void 0 ? i : 0) + r.top)
    }
}
class ee {
    constructor(t) {
        this.lastTouch_ = null,
        this.onDocumentMouseMove_ = this.onDocumentMouseMove_.bind(this),
        this.onDocumentMouseUp_ = this.onDocumentMouseUp_.bind(this),
        this.onMouseDown_ = this.onMouseDown_.bind(this),
        this.onTouchEnd_ = this.onTouchEnd_.bind(this),
        this.onTouchMove_ = this.onTouchMove_.bind(this),
        this.onTouchStart_ = this.onTouchStart_.bind(this),
        this.elem_ = t,
        this.emitter = new T,
        t.addEventListener("touchstart", this.onTouchStart_, {
            passive: !1
        }),
        t.addEventListener("touchmove", this.onTouchMove_, {
            passive: !0
        }),
        t.addEventListener("touchend", this.onTouchEnd_),
        t.addEventListener("mousedown", this.onMouseDown_)
    }
    computePosition_(t) {
        const e = this.elem_.getBoundingClientRect();
        return {
            bounds: {
                width: e.width,
                height: e.height
            },
            point: t ? {
                x: t.x,
                y: t.y
            } : null
        }
    }
    onMouseDown_(t) {
        var e;
        t.preventDefault(),
        (e = t.currentTarget) === null || e === void 0 || e.focus();
        const i = this.elem_.ownerDocument;
        i.addEventListener("mousemove", this.onDocumentMouseMove_),
        i.addEventListener("mouseup", this.onDocumentMouseUp_),
        this.emitter.emit("down", {
            altKey: t.altKey,
            data: this.computePosition_(Jn(t, this.elem_)),
            sender: this,
            shiftKey: t.shiftKey
        })
    }
    onDocumentMouseMove_(t) {
        this.emitter.emit("move", {
            altKey: t.altKey,
            data: this.computePosition_(Jn(t, this.elem_)),
            sender: this,
            shiftKey: t.shiftKey
        })
    }
    onDocumentMouseUp_(t) {
        const e = this.elem_.ownerDocument;
        e.removeEventListener("mousemove", this.onDocumentMouseMove_),
        e.removeEventListener("mouseup", this.onDocumentMouseUp_),
        this.emitter.emit("up", {
            altKey: t.altKey,
            data: this.computePosition_(Jn(t, this.elem_)),
            sender: this,
            shiftKey: t.shiftKey
        })
    }
    onTouchStart_(t) {
        t.preventDefault();
        const e = t.targetTouches.item(0)
          , i = this.elem_.getBoundingClientRect();
        this.emitter.emit("down", {
            altKey: t.altKey,
            data: this.computePosition_(e ? {
                x: e.clientX - i.left,
                y: e.clientY - i.top
            } : void 0),
            sender: this,
            shiftKey: t.shiftKey
        }),
        this.lastTouch_ = e
    }
    onTouchMove_(t) {
        const e = t.targetTouches.item(0)
          , i = this.elem_.getBoundingClientRect();
        this.emitter.emit("move", {
            altKey: t.altKey,
            data: this.computePosition_(e ? {
                x: e.clientX - i.left,
                y: e.clientY - i.top
            } : void 0),
            sender: this,
            shiftKey: t.shiftKey
        }),
        this.lastTouch_ = e
    }
    onTouchEnd_(t) {
        var e;
        const i = (e = t.targetTouches.item(0)) !== null && e !== void 0 ? e : this.lastTouch_
          , s = this.elem_.getBoundingClientRect();
        this.emitter.emit("up", {
            altKey: t.altKey,
            data: this.computePosition_(i ? {
                x: i.clientX - s.left,
                y: i.clientY - s.top
            } : void 0),
            sender: this,
            shiftKey: t.shiftKey
        })
    }
}
const X = f("txt");
class pm {
    constructor(t, e) {
        this.onChange_ = this.onChange_.bind(this),
        this.props_ = e.props,
        this.props_.emitter.on("change", this.onChange_),
        this.element = t.createElement("div"),
        this.element.classList.add(X(), X(void 0, "num")),
        e.arrayPosition && this.element.classList.add(X(void 0, e.arrayPosition)),
        e.viewProps.bindClassModifiers(this.element);
        const i = t.createElement("input");
        i.classList.add(X("i")),
        i.type = "text",
        e.viewProps.bindDisabled(i),
        this.element.appendChild(i),
        this.inputElement = i,
        this.onDraggingChange_ = this.onDraggingChange_.bind(this),
        this.dragging_ = e.dragging,
        this.dragging_.emitter.on("change", this.onDraggingChange_),
        this.element.classList.add(X()),
        this.inputElement.classList.add(X("i"));
        const s = t.createElement("div");
        s.classList.add(X("k")),
        this.element.appendChild(s),
        this.knobElement = s;
        const r = t.createElementNS(ot, "svg");
        r.classList.add(X("g")),
        this.knobElement.appendChild(r);
        const o = t.createElementNS(ot, "path");
        o.classList.add(X("gb")),
        r.appendChild(o),
        this.guideBodyElem_ = o;
        const a = t.createElementNS(ot, "path");
        a.classList.add(X("gh")),
        r.appendChild(a),
        this.guideHeadElem_ = a;
        const l = t.createElement("div");
        l.classList.add(f("tt")()),
        this.knobElement.appendChild(l),
        this.tooltipElem_ = l,
        e.value.emitter.on("change", this.onChange_),
        this.value = e.value,
        this.refresh()
    }
    onDraggingChange_(t) {
        if (t.rawValue === null) {
            this.element.classList.remove(X(void 0, "drg"));
            return
        }
        this.element.classList.add(X(void 0, "drg"));
        const e = t.rawValue / this.props_.get("pointerScale")
          , i = e + (e > 0 ? -1 : e < 0 ? 1 : 0)
          , s = A(-i, -4, 4);
        this.guideHeadElem_.setAttributeNS(null, "d", [`M ${i + s},0 L${i},4 L${i + s},8`, `M ${e},-1 L${e},9`].join(" ")),
        this.guideBodyElem_.setAttributeNS(null, "d", `M 0,4 L${e},4`);
        const r = this.props_.get("formatter");
        this.tooltipElem_.textContent = r(this.value.rawValue),
        this.tooltipElem_.style.left = `${e}px`
    }
    refresh() {
        const t = this.props_.get("formatter");
        this.inputElement.value = t(this.value.rawValue)
    }
    onChange_() {
        this.refresh()
    }
}
class en {
    constructor(t, e) {
        var i;
        this.originRawValue_ = 0,
        this.onInputChange_ = this.onInputChange_.bind(this),
        this.onInputKeyDown_ = this.onInputKeyDown_.bind(this),
        this.onInputKeyUp_ = this.onInputKeyUp_.bind(this),
        this.onPointerDown_ = this.onPointerDown_.bind(this),
        this.onPointerMove_ = this.onPointerMove_.bind(this),
        this.onPointerUp_ = this.onPointerUp_.bind(this),
        this.parser_ = e.parser,
        this.props = e.props,
        this.sliderProps_ = (i = e.sliderProps) !== null && i !== void 0 ? i : null,
        this.value = e.value,
        this.viewProps = e.viewProps,
        this.dragging_ = E(null),
        this.view = new pm(t,{
            arrayPosition: e.arrayPosition,
            dragging: this.dragging_,
            props: this.props,
            value: this.value,
            viewProps: this.viewProps
        }),
        this.view.inputElement.addEventListener("change", this.onInputChange_),
        this.view.inputElement.addEventListener("keydown", this.onInputKeyDown_),
        this.view.inputElement.addEventListener("keyup", this.onInputKeyUp_);
        const s = new ee(this.view.knobElement);
        s.emitter.on("down", this.onPointerDown_),
        s.emitter.on("move", this.onPointerMove_),
        s.emitter.on("up", this.onPointerUp_)
    }
    constrainValue_(t) {
        var e, i;
        const s = (e = this.sliderProps_) === null || e === void 0 ? void 0 : e.get("min")
          , r = (i = this.sliderProps_) === null || i === void 0 ? void 0 : i.get("max");
        let o = t;
        return s !== void 0 && (o = Math.max(o, s)),
        r !== void 0 && (o = Math.min(o, r)),
        o
    }
    onInputChange_(t) {
        const i = t.currentTarget.value
          , s = this.parser_(i);
        C(s) || (this.value.rawValue = this.constrainValue_(s)),
        this.view.refresh()
    }
    onInputKeyDown_(t) {
        const e = K(this.props.get("keyScale"), Fe(t));
        e !== 0 && this.value.setRawValue(this.constrainValue_(this.value.rawValue + e), {
            forceEmit: !1,
            last: !1
        })
    }
    onInputKeyUp_(t) {
        K(this.props.get("keyScale"), Fe(t)) !== 0 && this.value.setRawValue(this.value.rawValue, {
            forceEmit: !0,
            last: !0
        })
    }
    onPointerDown_() {
        this.originRawValue_ = this.value.rawValue,
        this.dragging_.rawValue = 0
    }
    computeDraggingValue_(t) {
        if (!t.point)
            return null;
        const e = t.point.x - t.bounds.width / 2;
        return this.constrainValue_(this.originRawValue_ + e * this.props.get("pointerScale"))
    }
    onPointerMove_(t) {
        const e = this.computeDraggingValue_(t.data);
        e !== null && (this.value.setRawValue(e, {
            forceEmit: !1,
            last: !1
        }),
        this.dragging_.rawValue = this.value.rawValue - this.originRawValue_)
    }
    onPointerUp_(t) {
        const e = this.computeDraggingValue_(t.data);
        e !== null && (this.value.setRawValue(e, {
            forceEmit: !0,
            last: !0
        }),
        this.dragging_.rawValue = null)
    }
}
const Qn = f("sld");
class cm {
    constructor(t, e) {
        this.onChange_ = this.onChange_.bind(this),
        this.props_ = e.props,
        this.props_.emitter.on("change", this.onChange_),
        this.element = t.createElement("div"),
        this.element.classList.add(Qn()),
        e.viewProps.bindClassModifiers(this.element);
        const i = t.createElement("div");
        i.classList.add(Qn("t")),
        e.viewProps.bindTabIndex(i),
        this.element.appendChild(i),
        this.trackElement = i;
        const s = t.createElement("div");
        s.classList.add(Qn("k")),
        this.trackElement.appendChild(s),
        this.knobElement = s,
        e.value.emitter.on("change", this.onChange_),
        this.value = e.value,
        this.update_()
    }
    update_() {
        const t = A(_(this.value.rawValue, this.props_.get("min"), this.props_.get("max"), 0, 100), 0, 100);
        this.knobElement.style.width = `${t}%`
    }
    onChange_() {
        this.update_()
    }
}
class hm {
    constructor(t, e) {
        this.onKeyDown_ = this.onKeyDown_.bind(this),
        this.onKeyUp_ = this.onKeyUp_.bind(this),
        this.onPointerDownOrMove_ = this.onPointerDownOrMove_.bind(this),
        this.onPointerUp_ = this.onPointerUp_.bind(this),
        this.value = e.value,
        this.viewProps = e.viewProps,
        this.props = e.props,
        this.view = new cm(t,{
            props: this.props,
            value: this.value,
            viewProps: this.viewProps
        }),
        this.ptHandler_ = new ee(this.view.trackElement),
        this.ptHandler_.emitter.on("down", this.onPointerDownOrMove_),
        this.ptHandler_.emitter.on("move", this.onPointerDownOrMove_),
        this.ptHandler_.emitter.on("up", this.onPointerUp_),
        this.view.trackElement.addEventListener("keydown", this.onKeyDown_),
        this.view.trackElement.addEventListener("keyup", this.onKeyUp_)
    }
    handlePointerEvent_(t, e) {
        t.point && this.value.setRawValue(_(A(t.point.x, 0, t.bounds.width), 0, t.bounds.width, this.props.get("min"), this.props.get("max")), e)
    }
    onPointerDownOrMove_(t) {
        this.handlePointerEvent_(t.data, {
            forceEmit: !1,
            last: !1
        })
    }
    onPointerUp_(t) {
        this.handlePointerEvent_(t.data, {
            forceEmit: !0,
            last: !0
        })
    }
    onKeyDown_(t) {
        const e = K(this.props.get("keyScale"), _t(t));
        e !== 0 && this.value.setRawValue(this.value.rawValue + e, {
            forceEmit: !1,
            last: !1
        })
    }
    onKeyUp_(t) {
        K(this.props.get("keyScale"), _t(t)) !== 0 && this.value.setRawValue(this.value.rawValue, {
            forceEmit: !0,
            last: !0
        })
    }
}
const ti = f("sldtxt");
class um {
    constructor(t, e) {
        this.element = t.createElement("div"),
        this.element.classList.add(ti());
        const i = t.createElement("div");
        i.classList.add(ti("s")),
        this.sliderView_ = e.sliderView,
        i.appendChild(this.sliderView_.element),
        this.element.appendChild(i);
        const s = t.createElement("div");
        s.classList.add(ti("t")),
        this.textView_ = e.textView,
        s.appendChild(this.textView_.element),
        this.element.appendChild(s)
    }
}
class xn {
    constructor(t, e) {
        this.value = e.value,
        this.viewProps = e.viewProps,
        this.sliderC_ = new hm(t,{
            props: e.sliderProps,
            value: e.value,
            viewProps: this.viewProps
        }),
        this.textC_ = new en(t,{
            parser: e.parser,
            props: e.textProps,
            sliderProps: e.sliderProps,
            value: e.value,
            viewProps: e.viewProps
        }),
        this.view = new um(t,{
            sliderView: this.sliderC_.view,
            textView: this.textC_.view
        })
    }
    get sliderController() {
        return this.sliderC_
    }
    get textController() {
        return this.textC_
    }
    importProps(t) {
        return q(t, null, e=>({
            max: e.required.number,
            min: e.required.number
        }), e=>{
            const i = this.sliderC_.props;
            return i.set("max", e.max),
            i.set("min", e.min),
            !0
        }
        )
    }
    exportProps() {
        const t = this.sliderC_.props;
        return G(null, {
            max: t.get("max"),
            min: t.get("min")
        })
    }
}
function ka(n) {
    return {
        sliderProps: new b({
            keyScale: n.keyScale,
            max: n.max,
            min: n.min
        }),
        textProps: new b({
            formatter: E(n.formatter),
            keyScale: n.keyScale,
            pointerScale: E(n.pointerScale)
        })
    }
}
const dm = {
    containerUnitSize: "cnt-usz"
};
function Va(n) {
    return `--${dm[n]}`
}
function ze(n) {
    return pa(n)
}
function Lt(n) {
    if (di(n))
        return V(n, ze)
}
function vt(n, t) {
    if (!n)
        return;
    const e = []
      , i = oa(n, t);
    i && e.push(i);
    const s = aa(n);
    return s && e.push(s),
    new Je(e)
}
function mm(n) {
    return n ? n.major === we.major : !1
}
function Sa(n) {
    if (n === "inline" || n === "popup")
        return n
}
function nn(n, t) {
    n.write(t)
}
const an = f("ckb");
class vm {
    constructor(t, e) {
        this.onValueChange_ = this.onValueChange_.bind(this),
        this.element = t.createElement("div"),
        this.element.classList.add(an()),
        e.viewProps.bindClassModifiers(this.element);
        const i = t.createElement("label");
        i.classList.add(an("l")),
        this.element.appendChild(i),
        this.labelElement = i;
        const s = t.createElement("input");
        s.classList.add(an("i")),
        s.type = "checkbox",
        this.labelElement.appendChild(s),
        this.inputElement = s,
        e.viewProps.bindDisabled(this.inputElement);
        const r = t.createElement("div");
        r.classList.add(an("w")),
        this.labelElement.appendChild(r);
        const o = Dn(t, "check");
        r.appendChild(o),
        e.value.emitter.on("change", this.onValueChange_),
        this.value = e.value,
        this.update_()
    }
    update_() {
        this.inputElement.checked = this.value.rawValue
    }
    onValueChange_() {
        this.update_()
    }
}
class bm {
    constructor(t, e) {
        this.onInputChange_ = this.onInputChange_.bind(this),
        this.onLabelMouseDown_ = this.onLabelMouseDown_.bind(this),
        this.value = e.value,
        this.viewProps = e.viewProps,
        this.view = new vm(t,{
            value: this.value,
            viewProps: this.viewProps
        }),
        this.view.inputElement.addEventListener("change", this.onInputChange_),
        this.view.labelElement.addEventListener("mousedown", this.onLabelMouseDown_)
    }
    onInputChange_(t) {
        const e = t.currentTarget;
        this.value.rawValue = e.checked,
        t.preventDefault(),
        t.stopPropagation()
    }
    onLabelMouseDown_(t) {
        t.preventDefault()
    }
}
function fm(n) {
    const t = []
      , e = bs(n.options);
    return e && t.push(e),
    new Je(t)
}
const wm = z({
    id: "input-bool",
    type: "input",
    accept: (n,t)=>{
        if (typeof n != "boolean")
            return null;
        const e = V(t, i=>({
            options: i.optional.custom(tn),
            readonly: i.optional.constant(!1)
        }));
        return e ? {
            initialValue: n,
            params: e
        } : null
    }
    ,
    binding: {
        reader: n=>Pa,
        constraint: n=>fm(n.params),
        writer: n=>nn
    },
    controller: n=>{
        const t = n.document
          , e = n.value
          , i = n.constraint
          , s = i && gn(i, Qe);
        return s ? new Ot(t,{
            props: new b({
                options: s.values.value("options")
            }),
            value: e,
            viewProps: n.viewProps
        }) : new bm(t,{
            value: e,
            viewProps: n.viewProps
        })
    }
    ,
    api(n) {
        return typeof n.controller.value.rawValue != "boolean" ? null : n.controller.valueController instanceof Ot ? new ms(n.controller) : null
    }
})
  , Ft = f("col");
class _m {
    constructor(t, e) {
        this.element = t.createElement("div"),
        this.element.classList.add(Ft()),
        e.foldable.bindExpandedClass(this.element, Ft(void 0, "expanded")),
        lt(e.foldable, "completed", fe(this.element, Ft(void 0, "cpl")));
        const i = t.createElement("div");
        i.classList.add(Ft("h")),
        this.element.appendChild(i);
        const s = t.createElement("div");
        s.classList.add(Ft("s")),
        i.appendChild(s),
        this.swatchElement = s;
        const r = t.createElement("div");
        if (r.classList.add(Ft("t")),
        i.appendChild(r),
        this.textElement = r,
        e.pickerLayout === "inline") {
            const o = t.createElement("div");
            o.classList.add(Ft("p")),
            this.element.appendChild(o),
            this.pickerElement = o
        } else
            this.pickerElement = null
    }
}
function gm(n, t, e) {
    const i = A(n / 255, 0, 1)
      , s = A(t / 255, 0, 1)
      , r = A(e / 255, 0, 1)
      , o = Math.max(i, s, r)
      , a = Math.min(i, s, r)
      , l = o - a;
    let p = 0
      , h = 0;
    const u = (a + o) / 2;
    return l !== 0 && (h = l / (1 - Math.abs(o + a - 1)),
    i === o ? p = (s - r) / l : s === o ? p = 2 + (r - i) / l : p = 4 + (i - s) / l,
    p = p / 6 + (p < 0 ? 1 : 0)),
    [p * 360, h * 100, u * 100]
}
function Cm(n, t, e) {
    const i = (n % 360 + 360) % 360
      , s = A(t / 100, 0, 1)
      , r = A(e / 100, 0, 1)
      , o = (1 - Math.abs(2 * r - 1)) * s
      , a = o * (1 - Math.abs(i / 60 % 2 - 1))
      , l = r - o / 2;
    let p, h, u;
    return i >= 0 && i < 60 ? [p,h,u] = [o, a, 0] : i >= 60 && i < 120 ? [p,h,u] = [a, o, 0] : i >= 120 && i < 180 ? [p,h,u] = [0, o, a] : i >= 180 && i < 240 ? [p,h,u] = [0, a, o] : i >= 240 && i < 300 ? [p,h,u] = [a, 0, o] : [p,h,u] = [o, 0, a],
    [(p + l) * 255, (h + l) * 255, (u + l) * 255]
}
function xm(n, t, e) {
    const i = A(n / 255, 0, 1)
      , s = A(t / 255, 0, 1)
      , r = A(e / 255, 0, 1)
      , o = Math.max(i, s, r)
      , a = Math.min(i, s, r)
      , l = o - a;
    let p;
    l === 0 ? p = 0 : o === i ? p = 60 * (((s - r) / l % 6 + 6) % 6) : o === s ? p = 60 * ((r - i) / l + 2) : p = 60 * ((i - s) / l + 4);
    const h = o === 0 ? 0 : l / o
      , u = o;
    return [p, h * 100, u * 100]
}
function $a(n, t, e) {
    const i = ia(n, 360)
      , s = A(t / 100, 0, 1)
      , r = A(e / 100, 0, 1)
      , o = r * s
      , a = o * (1 - Math.abs(i / 60 % 2 - 1))
      , l = r - o;
    let p, h, u;
    return i >= 0 && i < 60 ? [p,h,u] = [o, a, 0] : i >= 60 && i < 120 ? [p,h,u] = [a, o, 0] : i >= 120 && i < 180 ? [p,h,u] = [0, o, a] : i >= 180 && i < 240 ? [p,h,u] = [0, a, o] : i >= 240 && i < 300 ? [p,h,u] = [a, 0, o] : [p,h,u] = [o, 0, a],
    [(p + l) * 255, (h + l) * 255, (u + l) * 255]
}
function Pm(n, t, e) {
    const i = e + t * (100 - Math.abs(2 * e - 100)) / 200;
    return [n, i !== 0 ? t * (100 - Math.abs(2 * e - 100)) / i : 0, e + t * (100 - Math.abs(2 * e - 100)) / (2 * 100)]
}
function ym(n, t, e) {
    const i = 100 - Math.abs(e * (200 - t) / 100 - 100);
    return [n, i !== 0 ? t * e / i : 0, e * (200 - t) / (2 * 100)]
}
function pt(n) {
    return [n[0], n[1], n[2]]
}
function Bn(n, t) {
    return [n[0], n[1], n[2], t]
}
const Em = {
    hsl: {
        hsl: (n,t,e)=>[n, t, e],
        hsv: Pm,
        rgb: Cm
    },
    hsv: {
        hsl: ym,
        hsv: (n,t,e)=>[n, t, e],
        rgb: $a
    },
    rgb: {
        hsl: gm,
        hsv: xm,
        rgb: (n,t,e)=>[n, t, e]
    }
};
function me(n, t) {
    return [t === "float" ? 1 : n === "rgb" ? 255 : 360, t === "float" ? 1 : n === "rgb" ? 255 : 100, t === "float" ? 1 : n === "rgb" ? 255 : 100]
}
function km(n, t) {
    return n === t ? t : ia(n, t)
}
function La(n, t, e) {
    var i;
    const s = me(t, e);
    return [t === "rgb" ? A(n[0], 0, s[0]) : km(n[0], s[0]), A(n[1], 0, s[1]), A(n[2], 0, s[2]), A((i = n[3]) !== null && i !== void 0 ? i : 1, 0, 1)]
}
function yr(n, t, e, i) {
    const s = me(t, e)
      , r = me(t, i);
    return n.map((o,a)=>o / s[a] * r[a])
}
function Ma(n, t, e) {
    const i = yr(n, t.mode, t.type, "int")
      , s = Em[t.mode][e.mode](...i);
    return yr(s, e.mode, "int", e.type)
}
class w {
    static black() {
        return new w([0, 0, 0],"rgb")
    }
    constructor(t, e) {
        this.type = "int",
        this.mode = e,
        this.comps_ = La(t, e, this.type)
    }
    getComponents(t) {
        return Bn(Ma(pt(this.comps_), {
            mode: this.mode,
            type: this.type
        }, {
            mode: t ?? this.mode,
            type: this.type
        }), this.comps_[3])
    }
    toRgbaObject() {
        const t = this.getComponents("rgb");
        return {
            r: t[0],
            g: t[1],
            b: t[2],
            a: t[3]
        }
    }
}
const kt = f("colp");
class Vm {
    constructor(t, e) {
        this.alphaViews_ = null,
        this.element = t.createElement("div"),
        this.element.classList.add(kt()),
        e.viewProps.bindClassModifiers(this.element);
        const i = t.createElement("div");
        i.classList.add(kt("hsv"));
        const s = t.createElement("div");
        s.classList.add(kt("sv")),
        this.svPaletteView_ = e.svPaletteView,
        s.appendChild(this.svPaletteView_.element),
        i.appendChild(s);
        const r = t.createElement("div");
        r.classList.add(kt("h")),
        this.hPaletteView_ = e.hPaletteView,
        r.appendChild(this.hPaletteView_.element),
        i.appendChild(r),
        this.element.appendChild(i);
        const o = t.createElement("div");
        if (o.classList.add(kt("rgb")),
        this.textsView_ = e.textsView,
        o.appendChild(this.textsView_.element),
        this.element.appendChild(o),
        e.alphaViews) {
            this.alphaViews_ = {
                palette: e.alphaViews.palette,
                text: e.alphaViews.text
            };
            const a = t.createElement("div");
            a.classList.add(kt("a"));
            const l = t.createElement("div");
            l.classList.add(kt("ap")),
            l.appendChild(this.alphaViews_.palette.element),
            a.appendChild(l);
            const p = t.createElement("div");
            p.classList.add(kt("at")),
            p.appendChild(this.alphaViews_.text.element),
            a.appendChild(p),
            this.element.appendChild(a)
        }
    }
    get allFocusableElements() {
        const t = [this.svPaletteView_.element, this.hPaletteView_.element, this.textsView_.modeSelectElement, ...this.textsView_.inputViews.map(e=>e.inputElement)];
        return this.alphaViews_ && t.push(this.alphaViews_.palette.element, this.alphaViews_.text.inputElement),
        t
    }
}
function Sm(n) {
    return n === "int" ? "int" : n === "float" ? "float" : void 0
}
function fs(n) {
    return V(n, t=>({
        color: t.optional.object({
            alpha: t.optional.boolean,
            type: t.optional.custom(Sm)
        }),
        expanded: t.optional.boolean,
        picker: t.optional.custom(Sa),
        readonly: t.optional.constant(!1)
    }))
}
function Xt(n) {
    return n ? .1 : 1
}
function Ta(n) {
    var t;
    return (t = n.color) === null || t === void 0 ? void 0 : t.type
}
class ws {
    constructor(t, e) {
        this.type = "float",
        this.mode = e,
        this.comps_ = La(t, e, this.type)
    }
    getComponents(t) {
        return Bn(Ma(pt(this.comps_), {
            mode: this.mode,
            type: this.type
        }, {
            mode: t ?? this.mode,
            type: this.type
        }), this.comps_[3])
    }
    toRgbaObject() {
        const t = this.getComponents("rgb");
        return {
            r: t[0],
            g: t[1],
            b: t[2],
            a: t[3]
        }
    }
}
const $m = {
    int: (n,t)=>new w(n,t),
    float: (n,t)=>new ws(n,t)
};
function _s(n, t, e) {
    return $m[e](n, t)
}
function Lm(n) {
    return n.type === "float"
}
function Mm(n) {
    return n.type === "int"
}
function Tm(n) {
    const t = n.getComponents()
      , e = me(n.mode, "int");
    return new w([Math.round(_(t[0], 0, 1, 0, e[0])), Math.round(_(t[1], 0, 1, 0, e[1])), Math.round(_(t[2], 0, 1, 0, e[2])), t[3]],n.mode)
}
function Am(n) {
    const t = n.getComponents()
      , e = me(n.mode, "int");
    return new ws([_(t[0], 0, e[0], 0, 1), _(t[1], 0, e[1], 0, 1), _(t[2], 0, e[2], 0, 1), t[3]],n.mode)
}
function F(n, t) {
    if (n.type === t)
        return n;
    if (Mm(n) && t === "float")
        return Am(n);
    if (Lm(n) && t === "int")
        return Tm(n);
    throw S.shouldNeverHappen()
}
function Om(n, t) {
    return n.alpha === t.alpha && n.mode === t.mode && n.notation === t.notation && n.type === t.type
}
function J(n, t) {
    const e = n.match(/^(.+)%$/);
    return Math.min(e ? parseFloat(e[1]) * .01 * t : parseFloat(n), t)
}
const Dm = {
    deg: n=>n,
    grad: n=>n * 360 / 400,
    rad: n=>n * 360 / (2 * Math.PI),
    turn: n=>n * 360
};
function Aa(n) {
    const t = n.match(/^([0-9.]+?)(deg|grad|rad|turn)$/);
    if (!t)
        return parseFloat(n);
    const e = parseFloat(t[1])
      , i = t[2];
    return Dm[i](e)
}
function Oa(n) {
    const t = n.match(/^rgb\(\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
    if (!t)
        return null;
    const e = [J(t[1], 255), J(t[2], 255), J(t[3], 255)];
    return isNaN(e[0]) || isNaN(e[1]) || isNaN(e[2]) ? null : e
}
function Rm(n) {
    const t = Oa(n);
    return t ? new w(t,"rgb") : null
}
function Da(n) {
    const t = n.match(/^rgba\(\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
    if (!t)
        return null;
    const e = [J(t[1], 255), J(t[2], 255), J(t[3], 255), J(t[4], 1)];
    return isNaN(e[0]) || isNaN(e[1]) || isNaN(e[2]) || isNaN(e[3]) ? null : e
}
function Bm(n) {
    const t = Da(n);
    return t ? new w(t,"rgb") : null
}
function Ra(n) {
    const t = n.match(/^hsl\(\s*([0-9A-Fa-f.]+(?:deg|grad|rad|turn)?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
    if (!t)
        return null;
    const e = [Aa(t[1]), J(t[2], 100), J(t[3], 100)];
    return isNaN(e[0]) || isNaN(e[1]) || isNaN(e[2]) ? null : e
}
function jm(n) {
    const t = Ra(n);
    return t ? new w(t,"hsl") : null
}
function Ba(n) {
    const t = n.match(/^hsla\(\s*([0-9A-Fa-f.]+(?:deg|grad|rad|turn)?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
    if (!t)
        return null;
    const e = [Aa(t[1]), J(t[2], 100), J(t[3], 100), J(t[4], 1)];
    return isNaN(e[0]) || isNaN(e[1]) || isNaN(e[2]) || isNaN(e[3]) ? null : e
}
function Nm(n) {
    const t = Ba(n);
    return t ? new w(t,"hsl") : null
}
function ja(n) {
    const t = n.match(/^#([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])$/);
    if (t)
        return [parseInt(t[1] + t[1], 16), parseInt(t[2] + t[2], 16), parseInt(t[3] + t[3], 16)];
    const e = n.match(/^(?:#|0x)([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/);
    return e ? [parseInt(e[1], 16), parseInt(e[2], 16), parseInt(e[3], 16)] : null
}
function Im(n) {
    const t = ja(n);
    return t ? new w(t,"rgb") : null
}
function Na(n) {
    const t = n.match(/^#([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])$/);
    if (t)
        return [parseInt(t[1] + t[1], 16), parseInt(t[2] + t[2], 16), parseInt(t[3] + t[3], 16), _(parseInt(t[4] + t[4], 16), 0, 255, 0, 1)];
    const e = n.match(/^(?:#|0x)?([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/);
    return e ? [parseInt(e[1], 16), parseInt(e[2], 16), parseInt(e[3], 16), _(parseInt(e[4], 16), 0, 255, 0, 1)] : null
}
function Fm(n) {
    const t = Na(n);
    return t ? new w(t,"rgb") : null
}
function Ia(n) {
    const t = n.match(/^\{\s*r\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*g\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*b\s*:\s*([0-9A-Fa-f.]+%?)\s*\}$/);
    if (!t)
        return null;
    const e = [parseFloat(t[1]), parseFloat(t[2]), parseFloat(t[3])];
    return isNaN(e[0]) || isNaN(e[1]) || isNaN(e[2]) ? null : e
}
function zm(n) {
    return t=>{
        const e = Ia(t);
        return e ? _s(e, "rgb", n) : null
    }
}
function Fa(n) {
    const t = n.match(/^\{\s*r\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*g\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*b\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*a\s*:\s*([0-9A-Fa-f.]+%?)\s*\}$/);
    if (!t)
        return null;
    const e = [parseFloat(t[1]), parseFloat(t[2]), parseFloat(t[3]), parseFloat(t[4])];
    return isNaN(e[0]) || isNaN(e[1]) || isNaN(e[2]) || isNaN(e[3]) ? null : e
}
function Km(n) {
    return t=>{
        const e = Fa(t);
        return e ? _s(e, "rgb", n) : null
    }
}
const Um = [{
    parser: ja,
    result: {
        alpha: !1,
        mode: "rgb",
        notation: "hex"
    }
}, {
    parser: Na,
    result: {
        alpha: !0,
        mode: "rgb",
        notation: "hex"
    }
}, {
    parser: Oa,
    result: {
        alpha: !1,
        mode: "rgb",
        notation: "func"
    }
}, {
    parser: Da,
    result: {
        alpha: !0,
        mode: "rgb",
        notation: "func"
    }
}, {
    parser: Ra,
    result: {
        alpha: !1,
        mode: "hsl",
        notation: "func"
    }
}, {
    parser: Ba,
    result: {
        alpha: !0,
        mode: "hsl",
        notation: "func"
    }
}, {
    parser: Ia,
    result: {
        alpha: !1,
        mode: "rgb",
        notation: "object"
    }
}, {
    parser: Fa,
    result: {
        alpha: !0,
        mode: "rgb",
        notation: "object"
    }
}];
function Hm(n) {
    return Um.reduce((t,{parser: e, result: i})=>t || (e(n) ? i : null), null)
}
function qm(n, t="int") {
    const e = Hm(n);
    return e ? e.notation === "hex" && t !== "float" ? Object.assign(Object.assign({}, e), {
        type: "int"
    }) : e.notation === "func" ? Object.assign(Object.assign({}, e), {
        type: t
    }) : null : null
}
function sn(n) {
    const t = [Im, Fm, Rm, Bm, jm, Nm];
    t.push(zm("int"), Km("int"));
    const e = om(t);
    return i=>{
        const s = e(i);
        return s ? F(s, n) : null
    }
}
function Gm(n) {
    const t = sn("int");
    if (typeof n != "string")
        return w.black();
    const e = t(n);
    return e ?? w.black()
}
function za(n) {
    const t = A(Math.floor(n), 0, 255).toString(16);
    return t.length === 1 ? `0${t}` : t
}
function gs(n, t="#") {
    const e = pt(n.getComponents("rgb")).map(za).join("");
    return `${t}${e}`
}
function Cs(n, t="#") {
    const e = n.getComponents("rgb")
      , i = [e[0], e[1], e[2], e[3] * 255].map(za).join("");
    return `${t}${i}`
}
function Ka(n) {
    const t = U(0)
      , e = F(n, "int");
    return `rgb(${pt(e.getComponents("rgb")).map(s=>t(s)).join(", ")})`
}
function hn(n) {
    const t = U(2)
      , e = U(0);
    return `rgba(${F(n, "int").getComponents("rgb").map((r,o)=>(o === 3 ? t : e)(r)).join(", ")})`
}
function Wm(n) {
    const t = [U(0), Cn, Cn]
      , e = F(n, "int");
    return `hsl(${pt(e.getComponents("hsl")).map((s,r)=>t[r](s)).join(", ")})`
}
function Ym(n) {
    const t = [U(0), Cn, Cn, U(2)];
    return `hsla(${F(n, "int").getComponents("hsl").map((s,r)=>t[r](s)).join(", ")})`
}
function Ua(n, t) {
    const e = U(t === "float" ? 2 : 0)
      , i = ["r", "g", "b"]
      , s = F(n, t);
    return `{${pt(s.getComponents("rgb")).map((o,a)=>`${i[a]}: ${e(o)}`).join(", ")}}`
}
function Xm(n) {
    return t=>Ua(t, n)
}
function Ha(n, t) {
    const e = U(2)
      , i = U(t === "float" ? 2 : 0)
      , s = ["r", "g", "b", "a"];
    return `{${F(n, t).getComponents("rgb").map((a,l)=>{
        const p = l === 3 ? e : i;
        return `${s[l]}: ${p(a)}`
    }
    ).join(", ")}}`
}
function Zm(n) {
    return t=>Ha(t, n)
}
const Jm = [{
    format: {
        alpha: !1,
        mode: "rgb",
        notation: "hex",
        type: "int"
    },
    stringifier: gs
}, {
    format: {
        alpha: !0,
        mode: "rgb",
        notation: "hex",
        type: "int"
    },
    stringifier: Cs
}, {
    format: {
        alpha: !1,
        mode: "rgb",
        notation: "func",
        type: "int"
    },
    stringifier: Ka
}, {
    format: {
        alpha: !0,
        mode: "rgb",
        notation: "func",
        type: "int"
    },
    stringifier: hn
}, {
    format: {
        alpha: !1,
        mode: "hsl",
        notation: "func",
        type: "int"
    },
    stringifier: Wm
}, {
    format: {
        alpha: !0,
        mode: "hsl",
        notation: "func",
        type: "int"
    },
    stringifier: Ym
}, ...["int", "float"].reduce((n,t)=>[...n, {
    format: {
        alpha: !1,
        mode: "rgb",
        notation: "object",
        type: t
    },
    stringifier: Xm(t)
}, {
    format: {
        alpha: !0,
        mode: "rgb",
        notation: "object",
        type: t
    },
    stringifier: Zm(t)
}], [])];
function qa(n) {
    return Jm.reduce((t,e)=>t || (Om(e.format, n) ? e.stringifier : null), null)
}
const Te = f("apl");
class Qm {
    constructor(t, e) {
        this.onValueChange_ = this.onValueChange_.bind(this),
        this.value = e.value,
        this.value.emitter.on("change", this.onValueChange_),
        this.element = t.createElement("div"),
        this.element.classList.add(Te()),
        e.viewProps.bindClassModifiers(this.element),
        e.viewProps.bindTabIndex(this.element);
        const i = t.createElement("div");
        i.classList.add(Te("b")),
        this.element.appendChild(i);
        const s = t.createElement("div");
        s.classList.add(Te("c")),
        i.appendChild(s),
        this.colorElem_ = s;
        const r = t.createElement("div");
        r.classList.add(Te("m")),
        this.element.appendChild(r),
        this.markerElem_ = r;
        const o = t.createElement("div");
        o.classList.add(Te("p")),
        this.markerElem_.appendChild(o),
        this.previewElem_ = o,
        this.update_()
    }
    update_() {
        const t = this.value.rawValue
          , e = t.getComponents("rgb")
          , i = new w([e[0], e[1], e[2], 0],"rgb")
          , s = new w([e[0], e[1], e[2], 255],"rgb")
          , r = ["to right", hn(i), hn(s)];
        this.colorElem_.style.background = `linear-gradient(${r.join(",")})`,
        this.previewElem_.style.backgroundColor = hn(t);
        const o = _(e[3], 0, 1, 0, 100);
        this.markerElem_.style.left = `${o}%`
    }
    onValueChange_() {
        this.update_()
    }
}
class tv {
    constructor(t, e) {
        this.onKeyDown_ = this.onKeyDown_.bind(this),
        this.onKeyUp_ = this.onKeyUp_.bind(this),
        this.onPointerDown_ = this.onPointerDown_.bind(this),
        this.onPointerMove_ = this.onPointerMove_.bind(this),
        this.onPointerUp_ = this.onPointerUp_.bind(this),
        this.value = e.value,
        this.viewProps = e.viewProps,
        this.view = new Qm(t,{
            value: this.value,
            viewProps: this.viewProps
        }),
        this.ptHandler_ = new ee(this.view.element),
        this.ptHandler_.emitter.on("down", this.onPointerDown_),
        this.ptHandler_.emitter.on("move", this.onPointerMove_),
        this.ptHandler_.emitter.on("up", this.onPointerUp_),
        this.view.element.addEventListener("keydown", this.onKeyDown_),
        this.view.element.addEventListener("keyup", this.onKeyUp_)
    }
    handlePointerEvent_(t, e) {
        if (!t.point)
            return;
        const i = t.point.x / t.bounds.width
          , s = this.value.rawValue
          , [r,o,a] = s.getComponents("hsv");
        this.value.setRawValue(new w([r, o, a, i],"hsv"), e)
    }
    onPointerDown_(t) {
        this.handlePointerEvent_(t.data, {
            forceEmit: !1,
            last: !1
        })
    }
    onPointerMove_(t) {
        this.handlePointerEvent_(t.data, {
            forceEmit: !1,
            last: !1
        })
    }
    onPointerUp_(t) {
        this.handlePointerEvent_(t.data, {
            forceEmit: !0,
            last: !0
        })
    }
    onKeyDown_(t) {
        const e = K(Xt(!0), _t(t));
        if (e === 0)
            return;
        const i = this.value.rawValue
          , [s,r,o,a] = i.getComponents("hsv");
        this.value.setRawValue(new w([s, r, o, a + e],"hsv"), {
            forceEmit: !1,
            last: !1
        })
    }
    onKeyUp_(t) {
        K(Xt(!0), _t(t)) !== 0 && this.value.setRawValue(this.value.rawValue, {
            forceEmit: !0,
            last: !0
        })
    }
}
const re = f("coltxt");
function ev(n) {
    const t = n.createElement("select")
      , e = [{
        text: "RGB",
        value: "rgb"
    }, {
        text: "HSL",
        value: "hsl"
    }, {
        text: "HSV",
        value: "hsv"
    }, {
        text: "HEX",
        value: "hex"
    }];
    return t.appendChild(e.reduce((i,s)=>{
        const r = n.createElement("option");
        return r.textContent = s.text,
        r.value = s.value,
        i.appendChild(r),
        i
    }
    , n.createDocumentFragment())),
    t
}
class nv {
    constructor(t, e) {
        this.element = t.createElement("div"),
        this.element.classList.add(re()),
        e.viewProps.bindClassModifiers(this.element);
        const i = t.createElement("div");
        i.classList.add(re("m")),
        this.modeElem_ = ev(t),
        this.modeElem_.classList.add(re("ms")),
        i.appendChild(this.modeSelectElement),
        e.viewProps.bindDisabled(this.modeElem_);
        const s = t.createElement("div");
        s.classList.add(re("mm")),
        s.appendChild(Dn(t, "dropdown")),
        i.appendChild(s),
        this.element.appendChild(i);
        const r = t.createElement("div");
        r.classList.add(re("w")),
        this.element.appendChild(r),
        this.inputsElem_ = r,
        this.inputViews_ = e.inputViews,
        this.applyInputViews_(),
        bt(e.mode, o=>{
            this.modeElem_.value = o
        }
        )
    }
    get modeSelectElement() {
        return this.modeElem_
    }
    get inputViews() {
        return this.inputViews_
    }
    set inputViews(t) {
        this.inputViews_ = t,
        this.applyInputViews_()
    }
    applyInputViews_() {
        ua(this.inputsElem_);
        const t = this.element.ownerDocument;
        this.inputViews_.forEach(e=>{
            const i = t.createElement("div");
            i.classList.add(re("c")),
            i.appendChild(e.element),
            this.inputsElem_.appendChild(i)
        }
        )
    }
}
function iv(n) {
    return U(n === "float" ? 2 : 0)
}
function sv(n, t, e) {
    const i = me(n, t)[e];
    return new Ye({
        min: 0,
        max: i
    })
}
function rv(n, t, e) {
    return new en(n,{
        arrayPosition: e === 0 ? "fst" : e === 2 ? "lst" : "mid",
        parser: t.parser,
        props: b.fromObject({
            formatter: iv(t.colorType),
            keyScale: Xt(!1),
            pointerScale: t.colorType === "float" ? .01 : 1
        }),
        value: E(0, {
            constraint: sv(t.colorMode, t.colorType, e)
        }),
        viewProps: t.viewProps
    })
}
function ov(n, t) {
    const e = {
        colorMode: t.colorMode,
        colorType: t.colorType,
        parser: wt,
        viewProps: t.viewProps
    };
    return [0, 1, 2].map(i=>{
        const s = rv(n, e, i);
        return ge({
            primary: t.value,
            secondary: s.value,
            forward(r) {
                return F(r, t.colorType).getComponents(t.colorMode)[i]
            },
            backward(r, o) {
                const a = t.colorMode
                  , p = F(r, t.colorType).getComponents(a);
                p[i] = o;
                const h = _s(Bn(pt(p), p[3]), a, t.colorType);
                return F(h, "int")
            }
        }),
        s
    }
    )
}
function av(n, t) {
    const e = new Ie(n,{
        parser: sn("int"),
        props: b.fromObject({
            formatter: gs
        }),
        value: E(w.black()),
        viewProps: t.viewProps
    });
    return ge({
        primary: t.value,
        secondary: e.value,
        forward: i=>new w(pt(i.getComponents()),i.mode),
        backward: (i,s)=>new w(Bn(pt(s.getComponents(i.mode)), i.getComponents()[3]),i.mode)
    }),
    [e]
}
function lv(n) {
    return n !== "hex"
}
class pv {
    constructor(t, e) {
        this.onModeSelectChange_ = this.onModeSelectChange_.bind(this),
        this.colorType_ = e.colorType,
        this.value = e.value,
        this.viewProps = e.viewProps,
        this.colorMode = E(this.value.rawValue.mode),
        this.ccs_ = this.createComponentControllers_(t),
        this.view = new nv(t,{
            mode: this.colorMode,
            inputViews: [this.ccs_[0].view, this.ccs_[1].view, this.ccs_[2].view],
            viewProps: this.viewProps
        }),
        this.view.modeSelectElement.addEventListener("change", this.onModeSelectChange_)
    }
    createComponentControllers_(t) {
        const e = this.colorMode.rawValue;
        return lv(e) ? ov(t, {
            colorMode: e,
            colorType: this.colorType_,
            value: this.value,
            viewProps: this.viewProps
        }) : av(t, {
            value: this.value,
            viewProps: this.viewProps
        })
    }
    onModeSelectChange_(t) {
        const e = t.currentTarget;
        this.colorMode.rawValue = e.value,
        this.ccs_ = this.createComponentControllers_(this.view.element.ownerDocument),
        this.view.inputViews = this.ccs_.map(i=>i.view)
    }
}
const ei = f("hpl");
class cv {
    constructor(t, e) {
        this.onValueChange_ = this.onValueChange_.bind(this),
        this.value = e.value,
        this.value.emitter.on("change", this.onValueChange_),
        this.element = t.createElement("div"),
        this.element.classList.add(ei()),
        e.viewProps.bindClassModifiers(this.element),
        e.viewProps.bindTabIndex(this.element);
        const i = t.createElement("div");
        i.classList.add(ei("c")),
        this.element.appendChild(i);
        const s = t.createElement("div");
        s.classList.add(ei("m")),
        this.element.appendChild(s),
        this.markerElem_ = s,
        this.update_()
    }
    update_() {
        const t = this.value.rawValue
          , [e] = t.getComponents("hsv");
        this.markerElem_.style.backgroundColor = Ka(new w([e, 100, 100],"hsv"));
        const i = _(e, 0, 360, 0, 100);
        this.markerElem_.style.left = `${i}%`
    }
    onValueChange_() {
        this.update_()
    }
}
class hv {
    constructor(t, e) {
        this.onKeyDown_ = this.onKeyDown_.bind(this),
        this.onKeyUp_ = this.onKeyUp_.bind(this),
        this.onPointerDown_ = this.onPointerDown_.bind(this),
        this.onPointerMove_ = this.onPointerMove_.bind(this),
        this.onPointerUp_ = this.onPointerUp_.bind(this),
        this.value = e.value,
        this.viewProps = e.viewProps,
        this.view = new cv(t,{
            value: this.value,
            viewProps: this.viewProps
        }),
        this.ptHandler_ = new ee(this.view.element),
        this.ptHandler_.emitter.on("down", this.onPointerDown_),
        this.ptHandler_.emitter.on("move", this.onPointerMove_),
        this.ptHandler_.emitter.on("up", this.onPointerUp_),
        this.view.element.addEventListener("keydown", this.onKeyDown_),
        this.view.element.addEventListener("keyup", this.onKeyUp_)
    }
    handlePointerEvent_(t, e) {
        if (!t.point)
            return;
        const i = _(A(t.point.x, 0, t.bounds.width), 0, t.bounds.width, 0, 360)
          , s = this.value.rawValue
          , [,r,o,a] = s.getComponents("hsv");
        this.value.setRawValue(new w([i, r, o, a],"hsv"), e)
    }
    onPointerDown_(t) {
        this.handlePointerEvent_(t.data, {
            forceEmit: !1,
            last: !1
        })
    }
    onPointerMove_(t) {
        this.handlePointerEvent_(t.data, {
            forceEmit: !1,
            last: !1
        })
    }
    onPointerUp_(t) {
        this.handlePointerEvent_(t.data, {
            forceEmit: !0,
            last: !0
        })
    }
    onKeyDown_(t) {
        const e = K(Xt(!1), _t(t));
        if (e === 0)
            return;
        const i = this.value.rawValue
          , [s,r,o,a] = i.getComponents("hsv");
        this.value.setRawValue(new w([s + e, r, o, a],"hsv"), {
            forceEmit: !1,
            last: !1
        })
    }
    onKeyUp_(t) {
        K(Xt(!1), _t(t)) !== 0 && this.value.setRawValue(this.value.rawValue, {
            forceEmit: !0,
            last: !0
        })
    }
}
const ni = f("svp")
  , Er = 64;
class uv {
    constructor(t, e) {
        this.onValueChange_ = this.onValueChange_.bind(this),
        this.value = e.value,
        this.value.emitter.on("change", this.onValueChange_),
        this.element = t.createElement("div"),
        this.element.classList.add(ni()),
        e.viewProps.bindClassModifiers(this.element),
        e.viewProps.bindTabIndex(this.element);
        const i = t.createElement("canvas");
        i.height = Er,
        i.width = Er,
        i.classList.add(ni("c")),
        this.element.appendChild(i),
        this.canvasElement = i;
        const s = t.createElement("div");
        s.classList.add(ni("m")),
        this.element.appendChild(s),
        this.markerElem_ = s,
        this.update_()
    }
    update_() {
        const t = hd(this.canvasElement);
        if (!t)
            return;
        const i = this.value.rawValue.getComponents("hsv")
          , s = this.canvasElement.width
          , r = this.canvasElement.height
          , o = t.getImageData(0, 0, s, r)
          , a = o.data;
        for (let h = 0; h < r; h++)
            for (let u = 0; u < s; u++) {
                const N = _(u, 0, s, 0, 100)
                  , Bt = _(h, 0, r, 100, 0)
                  , ct = $a(i[0], N, Bt)
                  , ht = (h * s + u) * 4;
                a[ht] = ct[0],
                a[ht + 1] = ct[1],
                a[ht + 2] = ct[2],
                a[ht + 3] = 255
            }
        t.putImageData(o, 0, 0);
        const l = _(i[1], 0, 100, 0, 100);
        this.markerElem_.style.left = `${l}%`;
        const p = _(i[2], 0, 100, 100, 0);
        this.markerElem_.style.top = `${p}%`
    }
    onValueChange_() {
        this.update_()
    }
}
class dv {
    constructor(t, e) {
        this.onKeyDown_ = this.onKeyDown_.bind(this),
        this.onKeyUp_ = this.onKeyUp_.bind(this),
        this.onPointerDown_ = this.onPointerDown_.bind(this),
        this.onPointerMove_ = this.onPointerMove_.bind(this),
        this.onPointerUp_ = this.onPointerUp_.bind(this),
        this.value = e.value,
        this.viewProps = e.viewProps,
        this.view = new uv(t,{
            value: this.value,
            viewProps: this.viewProps
        }),
        this.ptHandler_ = new ee(this.view.element),
        this.ptHandler_.emitter.on("down", this.onPointerDown_),
        this.ptHandler_.emitter.on("move", this.onPointerMove_),
        this.ptHandler_.emitter.on("up", this.onPointerUp_),
        this.view.element.addEventListener("keydown", this.onKeyDown_),
        this.view.element.addEventListener("keyup", this.onKeyUp_)
    }
    handlePointerEvent_(t, e) {
        if (!t.point)
            return;
        const i = _(t.point.x, 0, t.bounds.width, 0, 100)
          , s = _(t.point.y, 0, t.bounds.height, 100, 0)
          , [r,,,o] = this.value.rawValue.getComponents("hsv");
        this.value.setRawValue(new w([r, i, s, o],"hsv"), e)
    }
    onPointerDown_(t) {
        this.handlePointerEvent_(t.data, {
            forceEmit: !1,
            last: !1
        })
    }
    onPointerMove_(t) {
        this.handlePointerEvent_(t.data, {
            forceEmit: !1,
            last: !1
        })
    }
    onPointerUp_(t) {
        this.handlePointerEvent_(t.data, {
            forceEmit: !0,
            last: !0
        })
    }
    onKeyDown_(t) {
        Ea(t.key) && t.preventDefault();
        const [e,i,s,r] = this.value.rawValue.getComponents("hsv")
          , o = Xt(!1)
          , a = K(o, _t(t))
          , l = K(o, Fe(t));
        a === 0 && l === 0 || this.value.setRawValue(new w([e, i + a, s + l, r],"hsv"), {
            forceEmit: !1,
            last: !1
        })
    }
    onKeyUp_(t) {
        const e = Xt(!1)
          , i = K(e, _t(t))
          , s = K(e, Fe(t));
        i === 0 && s === 0 || this.value.setRawValue(this.value.rawValue, {
            forceEmit: !0,
            last: !0
        })
    }
}
class mv {
    constructor(t, e) {
        this.value = e.value,
        this.viewProps = e.viewProps,
        this.hPaletteC_ = new hv(t,{
            value: this.value,
            viewProps: this.viewProps
        }),
        this.svPaletteC_ = new dv(t,{
            value: this.value,
            viewProps: this.viewProps
        }),
        this.alphaIcs_ = e.supportsAlpha ? {
            palette: new tv(t,{
                value: this.value,
                viewProps: this.viewProps
            }),
            text: new en(t,{
                parser: wt,
                props: b.fromObject({
                    pointerScale: .01,
                    keyScale: .1,
                    formatter: U(2)
                }),
                value: E(0, {
                    constraint: new Ye({
                        min: 0,
                        max: 1
                    })
                }),
                viewProps: this.viewProps
            })
        } : null,
        this.alphaIcs_ && ge({
            primary: this.value,
            secondary: this.alphaIcs_.text.value,
            forward: i=>i.getComponents()[3],
            backward: (i,s)=>{
                const r = i.getComponents();
                return r[3] = s,
                new w(r,i.mode)
            }
        }),
        this.textsC_ = new pv(t,{
            colorType: e.colorType,
            value: this.value,
            viewProps: this.viewProps
        }),
        this.view = new Vm(t,{
            alphaViews: this.alphaIcs_ ? {
                palette: this.alphaIcs_.palette.view,
                text: this.alphaIcs_.text.view
            } : null,
            hPaletteView: this.hPaletteC_.view,
            supportsAlpha: e.supportsAlpha,
            svPaletteView: this.svPaletteC_.view,
            textsView: this.textsC_.view,
            viewProps: this.viewProps
        })
    }
    get textsController() {
        return this.textsC_
    }
}
const ii = f("colsw");
class vv {
    constructor(t, e) {
        this.onValueChange_ = this.onValueChange_.bind(this),
        e.value.emitter.on("change", this.onValueChange_),
        this.value = e.value,
        this.element = t.createElement("div"),
        this.element.classList.add(ii()),
        e.viewProps.bindClassModifiers(this.element);
        const i = t.createElement("div");
        i.classList.add(ii("sw")),
        this.element.appendChild(i),
        this.swatchElem_ = i;
        const s = t.createElement("button");
        s.classList.add(ii("b")),
        e.viewProps.bindDisabled(s),
        this.element.appendChild(s),
        this.buttonElement = s,
        this.update_()
    }
    update_() {
        const t = this.value.rawValue;
        this.swatchElem_.style.backgroundColor = Cs(t)
    }
    onValueChange_() {
        this.update_()
    }
}
class bv {
    constructor(t, e) {
        this.value = e.value,
        this.viewProps = e.viewProps,
        this.view = new vv(t,{
            value: this.value,
            viewProps: this.viewProps
        })
    }
}
class xs {
    constructor(t, e) {
        this.onButtonBlur_ = this.onButtonBlur_.bind(this),
        this.onButtonClick_ = this.onButtonClick_.bind(this),
        this.onPopupChildBlur_ = this.onPopupChildBlur_.bind(this),
        this.onPopupChildKeydown_ = this.onPopupChildKeydown_.bind(this),
        this.value = e.value,
        this.viewProps = e.viewProps,
        this.foldable_ = Ze.create(e.expanded),
        this.swatchC_ = new bv(t,{
            value: this.value,
            viewProps: this.viewProps
        });
        const i = this.swatchC_.view.buttonElement;
        i.addEventListener("blur", this.onButtonBlur_),
        i.addEventListener("click", this.onButtonClick_),
        this.textC_ = new Ie(t,{
            parser: e.parser,
            props: b.fromObject({
                formatter: e.formatter
            }),
            value: this.value,
            viewProps: this.viewProps
        }),
        this.view = new _m(t,{
            foldable: this.foldable_,
            pickerLayout: e.pickerLayout
        }),
        this.view.swatchElement.appendChild(this.swatchC_.view.element),
        this.view.textElement.appendChild(this.textC_.view.element),
        this.popC_ = e.pickerLayout === "popup" ? new xa(t,{
            viewProps: this.viewProps
        }) : null;
        const s = new mv(t,{
            colorType: e.colorType,
            supportsAlpha: e.supportsAlpha,
            value: this.value,
            viewProps: this.viewProps
        });
        s.view.allFocusableElements.forEach(r=>{
            r.addEventListener("blur", this.onPopupChildBlur_),
            r.addEventListener("keydown", this.onPopupChildKeydown_)
        }
        ),
        this.pickerC_ = s,
        this.popC_ ? (this.view.element.appendChild(this.popC_.view.element),
        this.popC_.view.element.appendChild(s.view.element),
        ge({
            primary: this.foldable_.value("expanded"),
            secondary: this.popC_.shows,
            forward: r=>r,
            backward: (r,o)=>o
        })) : this.view.pickerElement && (this.view.pickerElement.appendChild(this.pickerC_.view.element),
        ds(this.foldable_, this.view.pickerElement))
    }
    get textController() {
        return this.textC_
    }
    onButtonBlur_(t) {
        if (!this.popC_)
            return;
        const e = this.view.element
          , i = t.relatedTarget;
        (!i || !e.contains(i)) && (this.popC_.shows.rawValue = !1)
    }
    onButtonClick_() {
        this.foldable_.set("expanded", !this.foldable_.get("expanded")),
        this.foldable_.get("expanded") && this.pickerC_.view.allFocusableElements[0].focus()
    }
    onPopupChildBlur_(t) {
        if (!this.popC_)
            return;
        const e = this.popC_.view.element
          , i = da(t);
        i && e.contains(i) || i && i === this.swatchC_.view.buttonElement && !as(e.ownerDocument) || (this.popC_.shows.rawValue = !1)
    }
    onPopupChildKeydown_(t) {
        this.popC_ ? t.key === "Escape" && (this.popC_.shows.rawValue = !1) : this.view.pickerElement && t.key === "Escape" && this.swatchC_.view.buttonElement.focus()
    }
}
function fv(n) {
    return pt(n.getComponents("rgb")).reduce((t,e)=>t << 8 | Math.floor(e) & 255, 0)
}
function wv(n) {
    return n.getComponents("rgb").reduce((t,e,i)=>{
        const s = Math.floor(i === 3 ? e * 255 : e) & 255;
        return t << 8 | s
    }
    , 0) >>> 0
}
function _v(n) {
    return new w([n >> 16 & 255, n >> 8 & 255, n & 255],"rgb")
}
function gv(n) {
    return new w([n >> 24 & 255, n >> 16 & 255, n >> 8 & 255, _(n & 255, 0, 255, 0, 1)],"rgb")
}
function Cv(n) {
    return typeof n != "number" ? w.black() : _v(n)
}
function xv(n) {
    return typeof n != "number" ? w.black() : gv(n)
}
function un(n, t) {
    return typeof n != "object" || C(n) ? !1 : t in n && typeof n[t] == "number"
}
function Ga(n) {
    return un(n, "r") && un(n, "g") && un(n, "b")
}
function Wa(n) {
    return Ga(n) && un(n, "a")
}
function Ya(n) {
    return Ga(n)
}
function Ps(n, t) {
    if (n.mode !== t.mode || n.type !== t.type)
        return !1;
    const e = n.getComponents()
      , i = t.getComponents();
    for (let s = 0; s < e.length; s++)
        if (e[s] !== i[s])
            return !1;
    return !0
}
function kr(n) {
    return "a"in n ? [n.r, n.g, n.b, n.a] : [n.r, n.g, n.b]
}
function Pv(n) {
    const t = qa(n);
    return t ? (e,i)=>{
        nn(e, t(i))
    }
    : null
}
function yv(n) {
    const t = n ? wv : fv;
    return (e,i)=>{
        nn(e, t(i))
    }
}
function Ev(n, t, e) {
    const s = F(t, e).toRgbaObject();
    n.writeProperty("r", s.r),
    n.writeProperty("g", s.g),
    n.writeProperty("b", s.b),
    n.writeProperty("a", s.a)
}
function kv(n, t, e) {
    const s = F(t, e).toRgbaObject();
    n.writeProperty("r", s.r),
    n.writeProperty("g", s.g),
    n.writeProperty("b", s.b)
}
function Vv(n, t) {
    return (e,i)=>{
        n ? Ev(e, i, t) : kv(e, i, t)
    }
}
function Sv(n) {
    var t;
    return !!(!((t = n == null ? void 0 : n.color) === null || t === void 0) && t.alpha)
}
function $v(n) {
    return n ? t=>Cs(t, "0x") : t=>gs(t, "0x")
}
function Lv(n) {
    return "color"in n || n.view === "color"
}
const Mv = z({
    id: "input-color-number",
    type: "input",
    accept: (n,t)=>{
        if (typeof n != "number" || !Lv(t))
            return null;
        const e = fs(t);
        return e ? {
            initialValue: n,
            params: Object.assign(Object.assign({}, e), {
                supportsAlpha: Sv(t)
            })
        } : null
    }
    ,
    binding: {
        reader: n=>n.params.supportsAlpha ? xv : Cv,
        equals: Ps,
        writer: n=>yv(n.params.supportsAlpha)
    },
    controller: n=>{
        var t, e;
        return new xs(n.document,{
            colorType: "int",
            expanded: (t = n.params.expanded) !== null && t !== void 0 ? t : !1,
            formatter: $v(n.params.supportsAlpha),
            parser: sn("int"),
            pickerLayout: (e = n.params.picker) !== null && e !== void 0 ? e : "popup",
            supportsAlpha: n.params.supportsAlpha,
            value: n.value,
            viewProps: n.viewProps
        })
    }
});
function Tv(n, t) {
    if (!Ya(n))
        return F(w.black(), t);
    if (t === "int") {
        const e = kr(n);
        return new w(e,"rgb")
    }
    if (t === "float") {
        const e = kr(n);
        return new ws(e,"rgb")
    }
    return F(w.black(), "int")
}
function Av(n) {
    return Wa(n)
}
function Ov(n) {
    return t=>{
        const e = Tv(t, n);
        return F(e, "int")
    }
}
function Dv(n, t) {
    return e=>n ? Ha(e, t) : Ua(e, t)
}
const Rv = z({
    id: "input-color-object",
    type: "input",
    accept: (n,t)=>{
        var e;
        if (!Ya(n))
            return null;
        const i = fs(t);
        return i ? {
            initialValue: n,
            params: Object.assign(Object.assign({}, i), {
                colorType: (e = Ta(t)) !== null && e !== void 0 ? e : "int"
            })
        } : null
    }
    ,
    binding: {
        reader: n=>Ov(n.params.colorType),
        equals: Ps,
        writer: n=>Vv(Av(n.initialValue), n.params.colorType)
    },
    controller: n=>{
        var t, e;
        const i = Wa(n.initialValue);
        return new xs(n.document,{
            colorType: n.params.colorType,
            expanded: (t = n.params.expanded) !== null && t !== void 0 ? t : !1,
            formatter: Dv(i, n.params.colorType),
            parser: sn("int"),
            pickerLayout: (e = n.params.picker) !== null && e !== void 0 ? e : "popup",
            supportsAlpha: i,
            value: n.value,
            viewProps: n.viewProps
        })
    }
})
  , Bv = z({
    id: "input-color-string",
    type: "input",
    accept: (n,t)=>{
        if (typeof n != "string" || t.view === "text")
            return null;
        const e = qm(n, Ta(t));
        if (!e)
            return null;
        const i = qa(e);
        if (!i)
            return null;
        const s = fs(t);
        return s ? {
            initialValue: n,
            params: Object.assign(Object.assign({}, s), {
                format: e,
                stringifier: i
            })
        } : null
    }
    ,
    binding: {
        reader: ()=>Gm,
        equals: Ps,
        writer: n=>{
            const t = Pv(n.params.format);
            if (!t)
                throw S.notBindable();
            return t
        }
    },
    controller: n=>{
        var t, e;
        return new xs(n.document,{
            colorType: n.params.format.type,
            expanded: (t = n.params.expanded) !== null && t !== void 0 ? t : !1,
            formatter: n.params.stringifier,
            parser: sn("int"),
            pickerLayout: (e = n.params.picker) !== null && e !== void 0 ? e : "popup",
            supportsAlpha: n.params.format.alpha,
            value: n.value,
            viewProps: n.viewProps
        })
    }
});
class ys {
    constructor(t) {
        this.components = t.components,
        this.asm_ = t.assembly
    }
    constrain(t) {
        const e = this.asm_.toComponents(t).map((i,s)=>{
            var r, o;
            return (o = (r = this.components[s]) === null || r === void 0 ? void 0 : r.constrain(i)) !== null && o !== void 0 ? o : i
        }
        );
        return this.asm_.fromComponents(e)
    }
}
const Vr = f("pndtxt");
class jv {
    constructor(t, e) {
        this.textViews = e.textViews,
        this.element = t.createElement("div"),
        this.element.classList.add(Vr()),
        this.textViews.forEach(i=>{
            const s = t.createElement("div");
            s.classList.add(Vr("a")),
            s.appendChild(i.element),
            this.element.appendChild(s)
        }
        )
    }
}
function Nv(n, t, e) {
    return new en(n,{
        arrayPosition: e === 0 ? "fst" : e === t.axes.length - 1 ? "lst" : "mid",
        parser: t.parser,
        props: t.axes[e].textProps,
        value: E(0, {
            constraint: t.axes[e].constraint
        }),
        viewProps: t.viewProps
    })
}
class Es {
    constructor(t, e) {
        this.value = e.value,
        this.viewProps = e.viewProps,
        this.acs_ = e.axes.map((i,s)=>Nv(t, e, s)),
        this.acs_.forEach((i,s)=>{
            ge({
                primary: this.value,
                secondary: i.value,
                forward: r=>e.assembly.toComponents(r)[s],
                backward: (r,o)=>{
                    const a = e.assembly.toComponents(r);
                    return a[s] = o,
                    e.assembly.fromComponents(a)
                }
            })
        }
        ),
        this.view = new jv(t,{
            textViews: this.acs_.map(i=>i.view)
        })
    }
    get textControllers() {
        return this.acs_
    }
}
class Iv extends Ne {
    get max() {
        return this.controller.valueController.sliderController.props.get("max")
    }
    set max(t) {
        this.controller.valueController.sliderController.props.set("max", t)
    }
    get min() {
        return this.controller.valueController.sliderController.props.get("min")
    }
    set min(t) {
        this.controller.valueController.sliderController.props.set("min", t)
    }
}
function Fv(n, t) {
    const e = []
      , i = oa(n, t);
    i && e.push(i);
    const s = aa(n);
    s && e.push(s);
    const r = bs(n.options);
    return r && e.push(r),
    new Je(e)
}
const zv = z({
    id: "input-number",
    type: "input",
    accept: (n,t)=>{
        if (typeof n != "number")
            return null;
        const e = V(t, i=>Object.assign(Object.assign({}, pa(i)), {
            options: i.optional.custom(tn),
            readonly: i.optional.constant(!1)
        }));
        return e ? {
            initialValue: n,
            params: e
        } : null
    }
    ,
    binding: {
        reader: n=>na,
        constraint: n=>Fv(n.params, n.initialValue),
        writer: n=>nn
    },
    controller: n=>{
        const t = n.value
          , e = n.constraint
          , i = e && gn(e, Qe);
        if (i)
            return new Ot(n.document,{
                props: new b({
                    options: i.values.value("options")
                }),
                value: t,
                viewProps: n.viewProps
            });
        const s = la(n.params, t.rawValue)
          , r = e && gn(e, Ye);
        return r ? new xn(n.document,Object.assign(Object.assign({}, ka(Object.assign(Object.assign({}, s), {
            keyScale: E(s.keyScale),
            max: r.values.value("max"),
            min: r.values.value("min")
        }))), {
            parser: wt,
            value: t,
            viewProps: n.viewProps
        })) : new en(n.document,{
            parser: wt,
            props: b.fromObject(s),
            value: t,
            viewProps: n.viewProps
        })
    }
    ,
    api(n) {
        return typeof n.controller.value.rawValue != "number" ? null : n.controller.valueController instanceof xn ? new Iv(n.controller) : n.controller.valueController instanceof Ot ? new ms(n.controller) : null
    }
});
class Tt {
    constructor(t=0, e=0) {
        this.x = t,
        this.y = e
    }
    getComponents() {
        return [this.x, this.y]
    }
    static isObject(t) {
        if (C(t))
            return !1;
        const e = t.x
          , i = t.y;
        return !(typeof e != "number" || typeof i != "number")
    }
    static equals(t, e) {
        return t.x === e.x && t.y === e.y
    }
    toObject() {
        return {
            x: this.x,
            y: this.y
        }
    }
}
const Xa = {
    toComponents: n=>n.getComponents(),
    fromComponents: n=>new Tt(...n)
}
  , oe = f("p2d");
class Kv {
    constructor(t, e) {
        this.element = t.createElement("div"),
        this.element.classList.add(oe()),
        e.viewProps.bindClassModifiers(this.element),
        bt(e.expanded, fe(this.element, oe(void 0, "expanded")));
        const i = t.createElement("div");
        i.classList.add(oe("h")),
        this.element.appendChild(i);
        const s = t.createElement("button");
        s.classList.add(oe("b")),
        s.appendChild(Dn(t, "p2dpad")),
        e.viewProps.bindDisabled(s),
        i.appendChild(s),
        this.buttonElement = s;
        const r = t.createElement("div");
        if (r.classList.add(oe("t")),
        i.appendChild(r),
        this.textElement = r,
        e.pickerLayout === "inline") {
            const o = t.createElement("div");
            o.classList.add(oe("p")),
            this.element.appendChild(o),
            this.pickerElement = o
        } else
            this.pickerElement = null
    }
}
const Vt = f("p2dp");
class Uv {
    constructor(t, e) {
        this.onFoldableChange_ = this.onFoldableChange_.bind(this),
        this.onPropsChange_ = this.onPropsChange_.bind(this),
        this.onValueChange_ = this.onValueChange_.bind(this),
        this.props_ = e.props,
        this.props_.emitter.on("change", this.onPropsChange_),
        this.element = t.createElement("div"),
        this.element.classList.add(Vt()),
        e.layout === "popup" && this.element.classList.add(Vt(void 0, "p")),
        e.viewProps.bindClassModifiers(this.element);
        const i = t.createElement("div");
        i.classList.add(Vt("p")),
        e.viewProps.bindTabIndex(i),
        this.element.appendChild(i),
        this.padElement = i;
        const s = t.createElementNS(ot, "svg");
        s.classList.add(Vt("g")),
        this.padElement.appendChild(s),
        this.svgElem_ = s;
        const r = t.createElementNS(ot, "line");
        r.classList.add(Vt("ax")),
        r.setAttributeNS(null, "x1", "0"),
        r.setAttributeNS(null, "y1", "50%"),
        r.setAttributeNS(null, "x2", "100%"),
        r.setAttributeNS(null, "y2", "50%"),
        this.svgElem_.appendChild(r);
        const o = t.createElementNS(ot, "line");
        o.classList.add(Vt("ax")),
        o.setAttributeNS(null, "x1", "50%"),
        o.setAttributeNS(null, "y1", "0"),
        o.setAttributeNS(null, "x2", "50%"),
        o.setAttributeNS(null, "y2", "100%"),
        this.svgElem_.appendChild(o);
        const a = t.createElementNS(ot, "line");
        a.classList.add(Vt("l")),
        a.setAttributeNS(null, "x1", "50%"),
        a.setAttributeNS(null, "y1", "50%"),
        this.svgElem_.appendChild(a),
        this.lineElem_ = a;
        const l = t.createElement("div");
        l.classList.add(Vt("m")),
        this.padElement.appendChild(l),
        this.markerElem_ = l,
        e.value.emitter.on("change", this.onValueChange_),
        this.value = e.value,
        this.update_()
    }
    get allFocusableElements() {
        return [this.padElement]
    }
    update_() {
        const [t,e] = this.value.rawValue.getComponents()
          , i = this.props_.get("max")
          , s = _(t, -i, +i, 0, 100)
          , r = _(e, -i, +i, 0, 100)
          , o = this.props_.get("invertsY") ? 100 - r : r;
        this.lineElem_.setAttributeNS(null, "x2", `${s}%`),
        this.lineElem_.setAttributeNS(null, "y2", `${o}%`),
        this.markerElem_.style.left = `${s}%`,
        this.markerElem_.style.top = `${o}%`
    }
    onValueChange_() {
        this.update_()
    }
    onPropsChange_() {
        this.update_()
    }
    onFoldableChange_() {
        this.update_()
    }
}
function Sr(n, t, e) {
    return [K(t[0], _t(n)), K(t[1], Fe(n)) * (e ? 1 : -1)]
}
class Hv {
    constructor(t, e) {
        this.onPadKeyDown_ = this.onPadKeyDown_.bind(this),
        this.onPadKeyUp_ = this.onPadKeyUp_.bind(this),
        this.onPointerDown_ = this.onPointerDown_.bind(this),
        this.onPointerMove_ = this.onPointerMove_.bind(this),
        this.onPointerUp_ = this.onPointerUp_.bind(this),
        this.props = e.props,
        this.value = e.value,
        this.viewProps = e.viewProps,
        this.view = new Uv(t,{
            layout: e.layout,
            props: this.props,
            value: this.value,
            viewProps: this.viewProps
        }),
        this.ptHandler_ = new ee(this.view.padElement),
        this.ptHandler_.emitter.on("down", this.onPointerDown_),
        this.ptHandler_.emitter.on("move", this.onPointerMove_),
        this.ptHandler_.emitter.on("up", this.onPointerUp_),
        this.view.padElement.addEventListener("keydown", this.onPadKeyDown_),
        this.view.padElement.addEventListener("keyup", this.onPadKeyUp_)
    }
    handlePointerEvent_(t, e) {
        if (!t.point)
            return;
        const i = this.props.get("max")
          , s = _(t.point.x, 0, t.bounds.width, -i, +i)
          , r = _(this.props.get("invertsY") ? t.bounds.height - t.point.y : t.point.y, 0, t.bounds.height, -i, +i);
        this.value.setRawValue(new Tt(s,r), e)
    }
    onPointerDown_(t) {
        this.handlePointerEvent_(t.data, {
            forceEmit: !1,
            last: !1
        })
    }
    onPointerMove_(t) {
        this.handlePointerEvent_(t.data, {
            forceEmit: !1,
            last: !1
        })
    }
    onPointerUp_(t) {
        this.handlePointerEvent_(t.data, {
            forceEmit: !0,
            last: !0
        })
    }
    onPadKeyDown_(t) {
        Ea(t.key) && t.preventDefault();
        const [e,i] = Sr(t, [this.props.get("xKeyScale"), this.props.get("yKeyScale")], this.props.get("invertsY"));
        e === 0 && i === 0 || this.value.setRawValue(new Tt(this.value.rawValue.x + e,this.value.rawValue.y + i), {
            forceEmit: !1,
            last: !1
        })
    }
    onPadKeyUp_(t) {
        const [e,i] = Sr(t, [this.props.get("xKeyScale"), this.props.get("yKeyScale")], this.props.get("invertsY"));
        e === 0 && i === 0 || this.value.setRawValue(this.value.rawValue, {
            forceEmit: !0,
            last: !0
        })
    }
}
class qv {
    constructor(t, e) {
        var i, s;
        this.onPopupChildBlur_ = this.onPopupChildBlur_.bind(this),
        this.onPopupChildKeydown_ = this.onPopupChildKeydown_.bind(this),
        this.onPadButtonBlur_ = this.onPadButtonBlur_.bind(this),
        this.onPadButtonClick_ = this.onPadButtonClick_.bind(this),
        this.value = e.value,
        this.viewProps = e.viewProps,
        this.foldable_ = Ze.create(e.expanded),
        this.popC_ = e.pickerLayout === "popup" ? new xa(t,{
            viewProps: this.viewProps
        }) : null;
        const r = new Hv(t,{
            layout: e.pickerLayout,
            props: new b({
                invertsY: E(e.invertsY),
                max: E(e.max),
                xKeyScale: e.axes[0].textProps.value("keyScale"),
                yKeyScale: e.axes[1].textProps.value("keyScale")
            }),
            value: this.value,
            viewProps: this.viewProps
        });
        r.view.allFocusableElements.forEach(o=>{
            o.addEventListener("blur", this.onPopupChildBlur_),
            o.addEventListener("keydown", this.onPopupChildKeydown_)
        }
        ),
        this.pickerC_ = r,
        this.textC_ = new Es(t,{
            assembly: Xa,
            axes: e.axes,
            parser: e.parser,
            value: this.value,
            viewProps: this.viewProps
        }),
        this.view = new Kv(t,{
            expanded: this.foldable_.value("expanded"),
            pickerLayout: e.pickerLayout,
            viewProps: this.viewProps
        }),
        this.view.textElement.appendChild(this.textC_.view.element),
        (i = this.view.buttonElement) === null || i === void 0 || i.addEventListener("blur", this.onPadButtonBlur_),
        (s = this.view.buttonElement) === null || s === void 0 || s.addEventListener("click", this.onPadButtonClick_),
        this.popC_ ? (this.view.element.appendChild(this.popC_.view.element),
        this.popC_.view.element.appendChild(this.pickerC_.view.element),
        ge({
            primary: this.foldable_.value("expanded"),
            secondary: this.popC_.shows,
            forward: o=>o,
            backward: (o,a)=>a
        })) : this.view.pickerElement && (this.view.pickerElement.appendChild(this.pickerC_.view.element),
        ds(this.foldable_, this.view.pickerElement))
    }
    get textController() {
        return this.textC_
    }
    onPadButtonBlur_(t) {
        if (!this.popC_)
            return;
        const e = this.view.element
          , i = t.relatedTarget;
        (!i || !e.contains(i)) && (this.popC_.shows.rawValue = !1)
    }
    onPadButtonClick_() {
        this.foldable_.set("expanded", !this.foldable_.get("expanded")),
        this.foldable_.get("expanded") && this.pickerC_.view.allFocusableElements[0].focus()
    }
    onPopupChildBlur_(t) {
        if (!this.popC_)
            return;
        const e = this.popC_.view.element
          , i = da(t);
        i && e.contains(i) || i && i === this.view.buttonElement && !as(e.ownerDocument) || (this.popC_.shows.rawValue = !1)
    }
    onPopupChildKeydown_(t) {
        this.popC_ ? t.key === "Escape" && (this.popC_.shows.rawValue = !1) : this.view.pickerElement && t.key === "Escape" && this.view.buttonElement.focus()
    }
}
function Gv(n) {
    return Tt.isObject(n) ? new Tt(n.x,n.y) : new Tt
}
function Wv(n, t) {
    n.writeProperty("x", t.x),
    n.writeProperty("y", t.y)
}
function Yv(n, t) {
    return new ys({
        assembly: Xa,
        components: [vt(Object.assign(Object.assign({}, n), n.x), t.x), vt(Object.assign(Object.assign({}, n), n.y), t.y)]
    })
}
function $r(n, t) {
    var e, i;
    if (!C(n.min) || !C(n.max))
        return Math.max(Math.abs((e = n.min) !== null && e !== void 0 ? e : 0), Math.abs((i = n.max) !== null && i !== void 0 ? i : 0));
    const s = sa(n);
    return Math.max(Math.abs(s) * 10, Math.abs(t) * 10)
}
function Xv(n, t) {
    var e, i;
    const s = $r(Wt(n, (e = n.x) !== null && e !== void 0 ? e : {}), t.x)
      , r = $r(Wt(n, (i = n.y) !== null && i !== void 0 ? i : {}), t.y);
    return Math.max(s, r)
}
function Zv(n) {
    if (!("y"in n))
        return !1;
    const t = n.y;
    return t && "inverted"in t ? !!t.inverted : !1
}
const Jv = z({
    id: "input-point2d",
    type: "input",
    accept: (n,t)=>{
        if (!Tt.isObject(n))
            return null;
        const e = V(t, i=>Object.assign(Object.assign({}, ze(i)), {
            expanded: i.optional.boolean,
            picker: i.optional.custom(Sa),
            readonly: i.optional.constant(!1),
            x: i.optional.custom(Lt),
            y: i.optional.object(Object.assign(Object.assign({}, ze(i)), {
                inverted: i.optional.boolean
            }))
        }));
        return e ? {
            initialValue: n,
            params: e
        } : null
    }
    ,
    binding: {
        reader: ()=>Gv,
        constraint: n=>Yv(n.params, n.initialValue),
        equals: Tt.equals,
        writer: ()=>Wv
    },
    controller: n=>{
        var t, e;
        const i = n.document
          , s = n.value
          , r = n.constraint
          , o = [n.params.x, n.params.y];
        return new qv(i,{
            axes: s.rawValue.getComponents().map((a,l)=>{
                var p;
                return os({
                    constraint: r.components[l],
                    initialValue: a,
                    params: Wt(n.params, (p = o[l]) !== null && p !== void 0 ? p : {})
                })
            }
            ),
            expanded: (t = n.params.expanded) !== null && t !== void 0 ? t : !1,
            invertsY: Zv(n.params),
            max: Xv(n.params, s.rawValue),
            parser: wt,
            pickerLayout: (e = n.params.picker) !== null && e !== void 0 ? e : "popup",
            value: s,
            viewProps: n.viewProps
        })
    }
});
class ce {
    constructor(t=0, e=0, i=0) {
        this.x = t,
        this.y = e,
        this.z = i
    }
    getComponents() {
        return [this.x, this.y, this.z]
    }
    static isObject(t) {
        if (C(t))
            return !1;
        const e = t.x
          , i = t.y
          , s = t.z;
        return !(typeof e != "number" || typeof i != "number" || typeof s != "number")
    }
    static equals(t, e) {
        return t.x === e.x && t.y === e.y && t.z === e.z
    }
    toObject() {
        return {
            x: this.x,
            y: this.y,
            z: this.z
        }
    }
}
const Za = {
    toComponents: n=>n.getComponents(),
    fromComponents: n=>new ce(...n)
};
function Qv(n) {
    return ce.isObject(n) ? new ce(n.x,n.y,n.z) : new ce
}
function tb(n, t) {
    n.writeProperty("x", t.x),
    n.writeProperty("y", t.y),
    n.writeProperty("z", t.z)
}
function eb(n, t) {
    return new ys({
        assembly: Za,
        components: [vt(Object.assign(Object.assign({}, n), n.x), t.x), vt(Object.assign(Object.assign({}, n), n.y), t.y), vt(Object.assign(Object.assign({}, n), n.z), t.z)]
    })
}
const nb = z({
    id: "input-point3d",
    type: "input",
    accept: (n,t)=>{
        if (!ce.isObject(n))
            return null;
        const e = V(t, i=>Object.assign(Object.assign({}, ze(i)), {
            readonly: i.optional.constant(!1),
            x: i.optional.custom(Lt),
            y: i.optional.custom(Lt),
            z: i.optional.custom(Lt)
        }));
        return e ? {
            initialValue: n,
            params: e
        } : null
    }
    ,
    binding: {
        reader: n=>Qv,
        constraint: n=>eb(n.params, n.initialValue),
        equals: ce.equals,
        writer: n=>tb
    },
    controller: n=>{
        const t = n.value
          , e = n.constraint
          , i = [n.params.x, n.params.y, n.params.z];
        return new Es(n.document,{
            assembly: Za,
            axes: t.rawValue.getComponents().map((s,r)=>{
                var o;
                return os({
                    constraint: e.components[r],
                    initialValue: s,
                    params: Wt(n.params, (o = i[r]) !== null && o !== void 0 ? o : {})
                })
            }
            ),
            parser: wt,
            value: t,
            viewProps: n.viewProps
        })
    }
});
class he {
    constructor(t=0, e=0, i=0, s=0) {
        this.x = t,
        this.y = e,
        this.z = i,
        this.w = s
    }
    getComponents() {
        return [this.x, this.y, this.z, this.w]
    }
    static isObject(t) {
        if (C(t))
            return !1;
        const e = t.x
          , i = t.y
          , s = t.z
          , r = t.w;
        return !(typeof e != "number" || typeof i != "number" || typeof s != "number" || typeof r != "number")
    }
    static equals(t, e) {
        return t.x === e.x && t.y === e.y && t.z === e.z && t.w === e.w
    }
    toObject() {
        return {
            x: this.x,
            y: this.y,
            z: this.z,
            w: this.w
        }
    }
}
const Ja = {
    toComponents: n=>n.getComponents(),
    fromComponents: n=>new he(...n)
};
function ib(n) {
    return he.isObject(n) ? new he(n.x,n.y,n.z,n.w) : new he
}
function sb(n, t) {
    n.writeProperty("x", t.x),
    n.writeProperty("y", t.y),
    n.writeProperty("z", t.z),
    n.writeProperty("w", t.w)
}
function rb(n, t) {
    return new ys({
        assembly: Ja,
        components: [vt(Object.assign(Object.assign({}, n), n.x), t.x), vt(Object.assign(Object.assign({}, n), n.y), t.y), vt(Object.assign(Object.assign({}, n), n.z), t.z), vt(Object.assign(Object.assign({}, n), n.w), t.w)]
    })
}
const ob = z({
    id: "input-point4d",
    type: "input",
    accept: (n,t)=>{
        if (!he.isObject(n))
            return null;
        const e = V(t, i=>Object.assign(Object.assign({}, ze(i)), {
            readonly: i.optional.constant(!1),
            w: i.optional.custom(Lt),
            x: i.optional.custom(Lt),
            y: i.optional.custom(Lt),
            z: i.optional.custom(Lt)
        }));
        return e ? {
            initialValue: n,
            params: e
        } : null
    }
    ,
    binding: {
        reader: n=>ib,
        constraint: n=>rb(n.params, n.initialValue),
        equals: he.equals,
        writer: n=>sb
    },
    controller: n=>{
        const t = n.value
          , e = n.constraint
          , i = [n.params.x, n.params.y, n.params.z, n.params.w];
        return new Es(n.document,{
            assembly: Ja,
            axes: t.rawValue.getComponents().map((s,r)=>{
                var o;
                return os({
                    constraint: e.components[r],
                    initialValue: s,
                    params: Wt(n.params, (o = i[r]) !== null && o !== void 0 ? o : {})
                })
            }
            ),
            parser: wt,
            value: t,
            viewProps: n.viewProps
        })
    }
});
function ab(n) {
    const t = []
      , e = bs(n.options);
    return e && t.push(e),
    new Je(t)
}
const lb = z({
    id: "input-string",
    type: "input",
    accept: (n,t)=>{
        if (typeof n != "string")
            return null;
        const e = V(t, i=>({
            readonly: i.optional.constant(!1),
            options: i.optional.custom(tn)
        }));
        return e ? {
            initialValue: n,
            params: e
        } : null
    }
    ,
    binding: {
        reader: n=>ya,
        constraint: n=>ab(n.params),
        writer: n=>nn
    },
    controller: n=>{
        const t = n.document
          , e = n.value
          , i = n.constraint
          , s = i && gn(i, Qe);
        return s ? new Ot(t,{
            props: new b({
                options: s.values.value("options")
            }),
            value: e,
            viewProps: n.viewProps
        }) : new Ie(t,{
            parser: r=>r,
            props: b.fromObject({
                formatter: wi
            }),
            value: e,
            viewProps: n.viewProps
        })
    }
    ,
    api(n) {
        return typeof n.controller.value.rawValue != "string" ? null : n.controller.valueController instanceof Ot ? new ms(n.controller) : null
    }
})
  , rn = {
    monitor: {
        defaultInterval: 200,
        defaultRows: 3
    }
}
  , Lr = f("mll");
class pb {
    constructor(t, e) {
        this.onValueUpdate_ = this.onValueUpdate_.bind(this),
        this.formatter_ = e.formatter,
        this.element = t.createElement("div"),
        this.element.classList.add(Lr()),
        e.viewProps.bindClassModifiers(this.element);
        const i = t.createElement("textarea");
        i.classList.add(Lr("i")),
        i.style.height = `calc(var(${Va("containerUnitSize")}) * ${e.rows})`,
        i.readOnly = !0,
        e.viewProps.bindDisabled(i),
        this.element.appendChild(i),
        this.textareaElem_ = i,
        e.value.emitter.on("change", this.onValueUpdate_),
        this.value = e.value,
        this.update_()
    }
    update_() {
        const t = this.textareaElem_
          , e = t.scrollTop === t.scrollHeight - t.clientHeight
          , i = [];
        this.value.rawValue.forEach(s=>{
            s !== void 0 && i.push(this.formatter_(s))
        }
        ),
        t.textContent = i.join(`
`),
        e && (t.scrollTop = t.scrollHeight)
    }
    onValueUpdate_() {
        this.update_()
    }
}
class ks {
    constructor(t, e) {
        this.value = e.value,
        this.viewProps = e.viewProps,
        this.view = new pb(t,{
            formatter: e.formatter,
            rows: e.rows,
            value: this.value,
            viewProps: this.viewProps
        })
    }
}
const Mr = f("sgl");
class cb {
    constructor(t, e) {
        this.onValueUpdate_ = this.onValueUpdate_.bind(this),
        this.formatter_ = e.formatter,
        this.element = t.createElement("div"),
        this.element.classList.add(Mr()),
        e.viewProps.bindClassModifiers(this.element);
        const i = t.createElement("input");
        i.classList.add(Mr("i")),
        i.readOnly = !0,
        i.type = "text",
        e.viewProps.bindDisabled(i),
        this.element.appendChild(i),
        this.inputElement = i,
        e.value.emitter.on("change", this.onValueUpdate_),
        this.value = e.value,
        this.update_()
    }
    update_() {
        const t = this.value.rawValue
          , e = t[t.length - 1];
        this.inputElement.value = e !== void 0 ? this.formatter_(e) : ""
    }
    onValueUpdate_() {
        this.update_()
    }
}
class Vs {
    constructor(t, e) {
        this.value = e.value,
        this.viewProps = e.viewProps,
        this.view = new cb(t,{
            formatter: e.formatter,
            value: this.value,
            viewProps: this.viewProps
        })
    }
}
const hb = z({
    id: "monitor-bool",
    type: "monitor",
    accept: (n,t)=>{
        if (typeof n != "boolean")
            return null;
        const e = V(t, i=>({
            readonly: i.required.constant(!0),
            rows: i.optional.number
        }));
        return e ? {
            initialValue: n,
            params: e
        } : null
    }
    ,
    binding: {
        reader: n=>Pa
    },
    controller: n=>{
        var t;
        return n.value.rawValue.length === 1 ? new Vs(n.document,{
            formatter: Pr,
            value: n.value,
            viewProps: n.viewProps
        }) : new ks(n.document,{
            formatter: Pr,
            rows: (t = n.params.rows) !== null && t !== void 0 ? t : rn.monitor.defaultRows,
            value: n.value,
            viewProps: n.viewProps
        })
    }
});
class ub extends Ne {
    get max() {
        return this.controller.valueController.props.get("max")
    }
    set max(t) {
        this.controller.valueController.props.set("max", t)
    }
    get min() {
        return this.controller.valueController.props.get("min")
    }
    set min(t) {
        this.controller.valueController.props.set("min", t)
    }
}
const St = f("grl");
class db {
    constructor(t, e) {
        this.onCursorChange_ = this.onCursorChange_.bind(this),
        this.onValueUpdate_ = this.onValueUpdate_.bind(this),
        this.element = t.createElement("div"),
        this.element.classList.add(St()),
        e.viewProps.bindClassModifiers(this.element),
        this.formatter_ = e.formatter,
        this.props_ = e.props,
        this.cursor_ = e.cursor,
        this.cursor_.emitter.on("change", this.onCursorChange_);
        const i = t.createElementNS(ot, "svg");
        i.classList.add(St("g")),
        i.style.height = `calc(var(${Va("containerUnitSize")}) * ${e.rows})`,
        this.element.appendChild(i),
        this.svgElem_ = i;
        const s = t.createElementNS(ot, "polyline");
        this.svgElem_.appendChild(s),
        this.lineElem_ = s;
        const r = t.createElement("div");
        r.classList.add(St("t"), f("tt")()),
        this.element.appendChild(r),
        this.tooltipElem_ = r,
        e.value.emitter.on("change", this.onValueUpdate_),
        this.value = e.value,
        this.update_()
    }
    get graphElement() {
        return this.svgElem_
    }
    update_() {
        const {clientWidth: t, clientHeight: e} = this.element
          , i = this.value.rawValue.length - 1
          , s = this.props_.get("min")
          , r = this.props_.get("max")
          , o = [];
        this.value.rawValue.forEach((u,N)=>{
            if (u === void 0)
                return;
            const Bt = _(N, 0, i, 0, t)
              , ct = _(u, s, r, e, 0);
            o.push([Bt, ct].join(","))
        }
        ),
        this.lineElem_.setAttributeNS(null, "points", o.join(" "));
        const a = this.tooltipElem_
          , l = this.value.rawValue[this.cursor_.rawValue];
        if (l === void 0) {
            a.classList.remove(St("t", "a"));
            return
        }
        const p = _(this.cursor_.rawValue, 0, i, 0, t)
          , h = _(l, s, r, e, 0);
        a.style.left = `${p}px`,
        a.style.top = `${h}px`,
        a.textContent = `${this.formatter_(l)}`,
        a.classList.contains(St("t", "a")) || (a.classList.add(St("t", "a"), St("t", "in")),
        _n(a),
        a.classList.remove(St("t", "in")))
    }
    onValueUpdate_() {
        this.update_()
    }
    onCursorChange_() {
        this.update_()
    }
}
class Qa {
    constructor(t, e) {
        if (this.onGraphMouseMove_ = this.onGraphMouseMove_.bind(this),
        this.onGraphMouseLeave_ = this.onGraphMouseLeave_.bind(this),
        this.onGraphPointerDown_ = this.onGraphPointerDown_.bind(this),
        this.onGraphPointerMove_ = this.onGraphPointerMove_.bind(this),
        this.onGraphPointerUp_ = this.onGraphPointerUp_.bind(this),
        this.props = e.props,
        this.value = e.value,
        this.viewProps = e.viewProps,
        this.cursor_ = E(-1),
        this.view = new db(t,{
            cursor: this.cursor_,
            formatter: e.formatter,
            rows: e.rows,
            props: this.props,
            value: this.value,
            viewProps: this.viewProps
        }),
        !as(t))
            this.view.element.addEventListener("mousemove", this.onGraphMouseMove_),
            this.view.element.addEventListener("mouseleave", this.onGraphMouseLeave_);
        else {
            const i = new ee(this.view.element);
            i.emitter.on("down", this.onGraphPointerDown_),
            i.emitter.on("move", this.onGraphPointerMove_),
            i.emitter.on("up", this.onGraphPointerUp_)
        }
    }
    importProps(t) {
        return q(t, null, e=>({
            max: e.required.number,
            min: e.required.number
        }), e=>(this.props.set("max", e.max),
        this.props.set("min", e.min),
        !0))
    }
    exportProps() {
        return G(null, {
            max: this.props.get("max"),
            min: this.props.get("min")
        })
    }
    onGraphMouseLeave_() {
        this.cursor_.rawValue = -1
    }
    onGraphMouseMove_(t) {
        const {clientWidth: e} = this.view.element;
        this.cursor_.rawValue = Math.floor(_(t.offsetX, 0, e, 0, this.value.rawValue.length))
    }
    onGraphPointerDown_(t) {
        this.onGraphPointerMove_(t)
    }
    onGraphPointerMove_(t) {
        if (!t.data.point) {
            this.cursor_.rawValue = -1;
            return
        }
        this.cursor_.rawValue = Math.floor(_(t.data.point.x, 0, t.data.bounds.width, 0, this.value.rawValue.length))
    }
    onGraphPointerUp_() {
        this.cursor_.rawValue = -1
    }
}
function _i(n) {
    return C(n.format) ? U(2) : n.format
}
function mb(n) {
    var t;
    return n.value.rawValue.length === 1 ? new Vs(n.document,{
        formatter: _i(n.params),
        value: n.value,
        viewProps: n.viewProps
    }) : new ks(n.document,{
        formatter: _i(n.params),
        rows: (t = n.params.rows) !== null && t !== void 0 ? t : rn.monitor.defaultRows,
        value: n.value,
        viewProps: n.viewProps
    })
}
function vb(n) {
    var t, e, i;
    return new Qa(n.document,{
        formatter: _i(n.params),
        rows: (t = n.params.rows) !== null && t !== void 0 ? t : rn.monitor.defaultRows,
        props: b.fromObject({
            max: (e = n.params.max) !== null && e !== void 0 ? e : 100,
            min: (i = n.params.min) !== null && i !== void 0 ? i : 0
        }),
        value: n.value,
        viewProps: n.viewProps
    })
}
function Tr(n) {
    return n.view === "graph"
}
const bb = z({
    id: "monitor-number",
    type: "monitor",
    accept: (n,t)=>{
        if (typeof n != "number")
            return null;
        const e = V(t, i=>({
            format: i.optional.function,
            max: i.optional.number,
            min: i.optional.number,
            readonly: i.required.constant(!0),
            rows: i.optional.number,
            view: i.optional.string
        }));
        return e ? {
            initialValue: n,
            params: e
        } : null
    }
    ,
    binding: {
        defaultBufferSize: n=>Tr(n) ? 64 : 1,
        reader: n=>na
    },
    controller: n=>Tr(n.params) ? vb(n) : mb(n),
    api: n=>n.controller.valueController instanceof Qa ? new ub(n.controller) : null
})
  , fb = z({
    id: "monitor-string",
    type: "monitor",
    accept: (n,t)=>{
        if (typeof n != "string")
            return null;
        const e = V(t, i=>({
            multiline: i.optional.boolean,
            readonly: i.required.constant(!0),
            rows: i.optional.number
        }));
        return e ? {
            initialValue: n,
            params: e
        } : null
    }
    ,
    binding: {
        reader: n=>ya
    },
    controller: n=>{
        var t;
        const e = n.value;
        return e.rawValue.length > 1 || n.params.multiline ? new ks(n.document,{
            formatter: wi,
            rows: (t = n.params.rows) !== null && t !== void 0 ? t : rn.monitor.defaultRows,
            value: e,
            viewProps: n.viewProps
        }) : new Vs(n.document,{
            formatter: wi,
            value: e,
            viewProps: n.viewProps
        })
    }
});
class wb {
    constructor() {
        this.map_ = new Map
    }
    get(t) {
        var e;
        return (e = this.map_.get(t)) !== null && e !== void 0 ? e : null
    }
    has(t) {
        return this.map_.has(t)
    }
    add(t, e) {
        return this.map_.set(t, e),
        t.viewProps.handleDispose(()=>{
            this.map_.delete(t)
        }
        ),
        e
    }
}
class _b {
    constructor(t) {
        this.target = t.target,
        this.reader_ = t.reader,
        this.writer_ = t.writer
    }
    read() {
        return this.reader_(this.target.read())
    }
    write(t) {
        this.writer_(this.target, t)
    }
    inject(t) {
        this.write(this.reader_(t))
    }
}
function gb(n, t) {
    var e;
    const i = n.accept(t.target.read(), t.params);
    if (C(i))
        return null;
    const s = {
        target: t.target,
        initialValue: i.initialValue,
        params: i.params
    }
      , r = V(t.params, u=>({
        disabled: u.optional.boolean,
        hidden: u.optional.boolean,
        label: u.optional.string,
        tag: u.optional.string
    }))
      , o = n.binding.reader(s)
      , a = n.binding.constraint ? n.binding.constraint(s) : void 0
      , l = new _b({
        reader: o,
        target: t.target,
        writer: n.binding.writer(s)
    })
      , p = new id(E(o(i.initialValue), {
        constraint: a,
        equals: n.binding.equals
    }),l)
      , h = n.controller({
        constraint: a,
        document: t.document,
        initialValue: i.initialValue,
        params: i.params,
        value: p,
        viewProps: Ct.create({
            disabled: r == null ? void 0 : r.disabled,
            hidden: r == null ? void 0 : r.hidden
        })
    });
    return new wd(t.document,{
        blade: _e(),
        props: b.fromObject({
            label: "label"in t.params ? (e = r == null ? void 0 : r.label) !== null && e !== void 0 ? e : null : t.target.key
        }),
        tag: r == null ? void 0 : r.tag,
        value: p,
        valueController: h
    })
}
class Cb {
    constructor(t) {
        this.target = t.target,
        this.reader_ = t.reader
    }
    read() {
        return this.reader_(this.target.read())
    }
}
function xb(n, t) {
    return t === 0 ? new tm : new em(n,t ?? rn.monitor.defaultInterval)
}
function Pb(n, t) {
    var e, i, s;
    const r = n.accept(t.target.read(), t.params);
    if (C(r))
        return null;
    const o = {
        target: t.target,
        initialValue: r.initialValue,
        params: r.params
    }
      , a = V(t.params, N=>({
        bufferSize: N.optional.number,
        disabled: N.optional.boolean,
        hidden: N.optional.boolean,
        interval: N.optional.number,
        label: N.optional.string
    }))
      , l = n.binding.reader(o)
      , p = (i = (e = a == null ? void 0 : a.bufferSize) !== null && e !== void 0 ? e : n.binding.defaultBufferSize && n.binding.defaultBufferSize(r.params)) !== null && i !== void 0 ? i : 1
      , h = new Pd({
        binding: new Cb({
            reader: l,
            target: t.target
        }),
        bufferSize: p,
        ticker: xb(t.document, a == null ? void 0 : a.interval)
    })
      , u = n.controller({
        document: t.document,
        params: r.params,
        value: h,
        viewProps: Ct.create({
            disabled: a == null ? void 0 : a.disabled,
            hidden: a == null ? void 0 : a.hidden
        })
    });
    return u.viewProps.bindDisabled(h.ticker),
    u.viewProps.handleDispose(()=>{
        h.ticker.dispose()
    }
    ),
    new Ed(t.document,{
        blade: _e(),
        props: b.fromObject({
            label: "label"in t.params ? (s = a == null ? void 0 : a.label) !== null && s !== void 0 ? s : null : t.target.key
        }),
        value: h,
        valueController: u
    })
}
class yb {
    constructor(t) {
        this.pluginsMap_ = {
            blades: [],
            inputs: [],
            monitors: []
        },
        this.apiCache_ = t
    }
    getAll() {
        return [...this.pluginsMap_.blades, ...this.pluginsMap_.inputs, ...this.pluginsMap_.monitors]
    }
    register(t, e) {
        if (!mm(e.core))
            throw S.notCompatible(t, e.id);
        e.type === "blade" ? this.pluginsMap_.blades.unshift(e) : e.type === "input" ? this.pluginsMap_.inputs.unshift(e) : e.type === "monitor" && this.pluginsMap_.monitors.unshift(e)
    }
    createInput_(t, e, i) {
        return this.pluginsMap_.inputs.reduce((s,r)=>s ?? gb(r, {
            document: t,
            target: e,
            params: i
        }), null)
    }
    createMonitor_(t, e, i) {
        return this.pluginsMap_.monitors.reduce((s,r)=>s ?? Pb(r, {
            document: t,
            params: i,
            target: e
        }), null)
    }
    createBinding(t, e, i) {
        const s = e.read();
        if (C(s))
            throw new S({
                context: {
                    key: e.key
                },
                type: "nomatchingcontroller"
            });
        const r = this.createInput_(t, e, i);
        if (r)
            return r;
        const o = this.createMonitor_(t, e, i);
        if (o)
            return o;
        throw new S({
            context: {
                key: e.key
            },
            type: "nomatchingcontroller"
        })
    }
    createBlade(t, e) {
        const i = this.pluginsMap_.blades.reduce((s,r)=>s ?? Qd(r, {
            document: t,
            params: e
        }), null);
        if (!i)
            throw new S({
                type: "nomatchingview",
                context: {
                    params: e
                }
            });
        return i
    }
    createInputBindingApi_(t) {
        const e = this.pluginsMap_.inputs.reduce((i,s)=>{
            var r, o;
            return i || ((o = (r = s.api) === null || r === void 0 ? void 0 : r.call(s, {
                controller: t
            })) !== null && o !== void 0 ? o : null)
        }
        , null);
        return this.apiCache_.add(t, e ?? new Ne(t))
    }
    createMonitorBindingApi_(t) {
        const e = this.pluginsMap_.monitors.reduce((i,s)=>{
            var r, o;
            return i || ((o = (r = s.api) === null || r === void 0 ? void 0 : r.call(s, {
                controller: t
            })) !== null && o !== void 0 ? o : null)
        }
        , null);
        return this.apiCache_.add(t, e ?? new Ne(t))
    }
    createBindingApi(t) {
        if (this.apiCache_.has(t))
            return this.apiCache_.get(t);
        if (_d(t))
            return this.createInputBindingApi_(t);
        if (kd(t))
            return this.createMonitorBindingApi_(t);
        throw S.shouldNeverHappen()
    }
    createApi(t) {
        if (this.apiCache_.has(t))
            return this.apiCache_.get(t);
        if (fd(t))
            return this.createBindingApi(t);
        const e = this.pluginsMap_.blades.reduce((i,s)=>i ?? s.api({
            controller: t,
            pool: this
        }), null);
        if (!e)
            throw S.shouldNeverHappen();
        return this.apiCache_.add(t, e)
    }
}
const Eb = new wb;
function kb() {
    const n = new yb(Eb);
    return [Jv, nb, ob, lb, zv, Bv, Rv, Mv, wm, hb, fb, bb, Md, Ud, Ca].forEach(t=>{
        n.register("core", t)
    }
    ),
    n
}
class Vb extends te {
    constructor(t) {
        super(t),
        this.emitter_ = new T,
        this.controller.value.emitter.on("change", e=>{
            this.emitter_.emit("change", new Xe(this,e.rawValue))
        }
        )
    }
    get label() {
        return this.controller.labelController.props.get("label")
    }
    set label(t) {
        this.controller.labelController.props.set("label", t)
    }
    get options() {
        return this.controller.valueController.props.get("options")
    }
    set options(t) {
        this.controller.valueController.props.set("options", t)
    }
    get value() {
        return this.controller.value.rawValue
    }
    set value(t) {
        this.controller.value.rawValue = t
    }
    on(t, e) {
        const i = e.bind(this);
        return this.emitter_.on(t, s=>{
            i(s)
        }
        , {
            key: e
        }),
        this
    }
    off(t, e) {
        return this.emitter_.off(t, e),
        this
    }
}
class Sb extends te {
}
class $b extends te {
    constructor(t) {
        super(t),
        this.emitter_ = new T,
        this.controller.value.emitter.on("change", e=>{
            this.emitter_.emit("change", new Xe(this,e.rawValue))
        }
        )
    }
    get label() {
        return this.controller.labelController.props.get("label")
    }
    set label(t) {
        this.controller.labelController.props.set("label", t)
    }
    get max() {
        return this.controller.valueController.sliderController.props.get("max")
    }
    set max(t) {
        this.controller.valueController.sliderController.props.set("max", t)
    }
    get min() {
        return this.controller.valueController.sliderController.props.get("min")
    }
    set min(t) {
        this.controller.valueController.sliderController.props.set("min", t)
    }
    get value() {
        return this.controller.value.rawValue
    }
    set value(t) {
        this.controller.value.rawValue = t
    }
    on(t, e) {
        const i = e.bind(this);
        return this.emitter_.on(t, s=>{
            i(s)
        }
        , {
            key: e
        }),
        this
    }
    off(t, e) {
        return this.emitter_.off(t, e),
        this
    }
}
class Lb extends te {
    constructor(t) {
        super(t),
        this.emitter_ = new T,
        this.controller.value.emitter.on("change", e=>{
            this.emitter_.emit("change", new Xe(this,e.rawValue))
        }
        )
    }
    get label() {
        return this.controller.labelController.props.get("label")
    }
    set label(t) {
        this.controller.labelController.props.set("label", t)
    }
    get formatter() {
        return this.controller.valueController.props.get("formatter")
    }
    set formatter(t) {
        this.controller.valueController.props.set("formatter", t)
    }
    get value() {
        return this.controller.value.rawValue
    }
    set value(t) {
        this.controller.value.rawValue = t
    }
    on(t, e) {
        const i = e.bind(this);
        return this.emitter_.on(t, s=>{
            i(s)
        }
        , {
            key: e
        }),
        this
    }
    off(t, e) {
        return this.emitter_.off(t, e),
        this
    }
}
const Mb = function() {
    return {
        id: "list",
        type: "blade",
        core: we,
        accept(n) {
            const t = V(n, e=>({
                options: e.required.custom(tn),
                value: e.required.raw,
                view: e.required.constant("list"),
                label: e.optional.string
            }));
            return t ? {
                params: t
            } : null
        },
        controller(n) {
            const t = new Qe(vs(n.params.options))
              , e = E(n.params.value, {
                constraint: t
            })
              , i = new Ot(n.document,{
                props: new b({
                    options: t.values.value("options")
                }),
                value: e,
                viewProps: n.viewProps
            });
            return new Yt(n.document,{
                blade: n.blade,
                props: b.fromObject({
                    label: n.params.label
                }),
                value: e,
                valueController: i
            })
        },
        api(n) {
            return !(n.controller instanceof Yt) || !(n.controller.valueController instanceof Ot) ? null : new Vb(n.controller)
        }
    }
}();
class Tb extends _a {
    constructor(t, e) {
        super(t, e)
    }
    get element() {
        return this.controller.view.element
    }
}
class Ab extends bi {
    constructor(t, e) {
        super(t, {
            expanded: e.expanded,
            blade: e.blade,
            props: e.props,
            root: !0,
            viewProps: e.viewProps
        })
    }
}
const Ar = f("spr");
class Ob {
    constructor(t, e) {
        this.element = t.createElement("div"),
        this.element.classList.add(Ar()),
        e.viewProps.bindClassModifiers(this.element);
        const i = t.createElement("hr");
        i.classList.add(Ar("r")),
        this.element.appendChild(i)
    }
}
class Or extends Rn {
    constructor(t, e) {
        super(Object.assign(Object.assign({}, e), {
            view: new Ob(t,{
                viewProps: e.viewProps
            })
        }))
    }
}
const Db = {
    id: "separator",
    type: "blade",
    core: we,
    accept(n) {
        const t = V(n, e=>({
            view: e.required.constant("separator")
        }));
        return t ? {
            params: t
        } : null
    },
    controller(n) {
        return new Or(n.document,{
            blade: n.blade,
            viewProps: n.viewProps
        })
    },
    api(n) {
        return n.controller instanceof Or ? new Sb(n.controller) : null
    }
}
  , Rb = {
    id: "slider",
    type: "blade",
    core: we,
    accept(n) {
        const t = V(n, e=>({
            max: e.required.number,
            min: e.required.number,
            view: e.required.constant("slider"),
            format: e.optional.function,
            label: e.optional.string,
            value: e.optional.number
        }));
        return t ? {
            params: t
        } : null
    },
    controller(n) {
        var t, e;
        const i = (t = n.params.value) !== null && t !== void 0 ? t : 0
          , s = new Ye({
            max: n.params.max,
            min: n.params.min
        })
          , r = E(i, {
            constraint: s
        })
          , o = new xn(n.document,Object.assign(Object.assign({}, ka({
            formatter: (e = n.params.format) !== null && e !== void 0 ? e : Ju,
            keyScale: E(1),
            max: s.values.value("max"),
            min: s.values.value("min"),
            pointerScale: ra(n.params, i)
        })), {
            parser: wt,
            value: r,
            viewProps: n.viewProps
        }));
        return new Yt(n.document,{
            blade: n.blade,
            props: b.fromObject({
                label: n.params.label
            }),
            value: r,
            valueController: o
        })
    },
    api(n) {
        return !(n.controller instanceof Yt) || !(n.controller.valueController instanceof xn) ? null : new $b(n.controller)
    }
}
  , Bb = function() {
    return {
        id: "text",
        type: "blade",
        core: we,
        accept(n) {
            const t = V(n, e=>({
                parse: e.required.function,
                value: e.required.raw,
                view: e.required.constant("text"),
                format: e.optional.function,
                label: e.optional.string
            }));
            return t ? {
                params: t
            } : null
        },
        controller(n) {
            var t;
            const e = E(n.params.value)
              , i = new Ie(n.document,{
                parser: n.params.parse,
                props: b.fromObject({
                    formatter: (t = n.params.format) !== null && t !== void 0 ? t : s=>String(s)
                }),
                value: e,
                viewProps: n.viewProps
            });
            return new Yt(n.document,{
                blade: n.blade,
                props: b.fromObject({
                    label: n.params.label
                }),
                value: e,
                valueController: i
            })
        },
        api(n) {
            return !(n.controller instanceof Yt) || !(n.controller.valueController instanceof Ie) ? null : new Lb(n.controller)
        }
    }
}();
function jb(n) {
    const t = n.createElement("div");
    return t.classList.add(f("dfw")()),
    n.body && n.body.appendChild(t),
    t
}
function Nb(n, t, e) {
    if (n.querySelector(`style[data-tp-style=${t}]`))
        return;
    const i = n.createElement("style");
    i.dataset.tpStyle = t,
    i.textContent = e,
    n.head.appendChild(i)
}
class Ib extends Tb {
    constructor(t) {
        var e, i;
        const s = t ?? {}
          , r = (e = s.document) !== null && e !== void 0 ? e : cd()
          , o = kb()
          , a = new Ab(r,{
            expanded: s.expanded,
            blade: _e(),
            props: b.fromObject({
                title: s.title
            }),
            viewProps: Ct.create()
        });
        super(a, o),
        this.pool_ = o,
        this.containerElem_ = (i = s.container) !== null && i !== void 0 ? i : jb(r),
        this.containerElem_.appendChild(this.element),
        this.doc_ = r,
        this.usesDefaultWrapper_ = !s.container,
        this.setUpDefaultPlugins_()
    }
    get document() {
        if (!this.doc_)
            throw S.alreadyDisposed();
        return this.doc_
    }
    dispose() {
        const t = this.containerElem_;
        if (!t)
            throw S.alreadyDisposed();
        if (this.usesDefaultWrapper_) {
            const e = t.parentElement;
            e && e.removeChild(t)
        }
        this.containerElem_ = null,
        this.doc_ = null,
        super.dispose()
    }
    registerPlugin(t) {
        t.css && Nb(this.document, `plugin-${t.id}`, t.css),
        ("plugin"in t ? [t.plugin] : "plugins"in t ? t.plugins : []).forEach(i=>{
            this.pool_.register(t.id, i)
        }
        )
    }
    setUpDefaultPlugins_() {
        this.registerPlugin({
            id: "default",
            css: '.tp-tbiv_b,.tp-coltxtv_ms,.tp-colswv_b,.tp-ckbv_i,.tp-sglv_i,.tp-mllv_i,.tp-grlv_g,.tp-txtv_i,.tp-p2dpv_p,.tp-colswv_sw,.tp-rotv_b,.tp-fldv_b,.tp-p2dv_b,.tp-btnv_b,.tp-lstv_s{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:rgba(0,0,0,0);border-width:0;font-family:inherit;font-size:inherit;font-weight:inherit;margin:0;outline:none;padding:0}.tp-p2dv_b,.tp-btnv_b,.tp-lstv_s{background-color:var(--btn-bg);border-radius:var(--bld-br);color:var(--btn-fg);cursor:pointer;display:block;font-weight:bold;height:var(--cnt-usz);line-height:var(--cnt-usz);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.tp-p2dv_b:hover,.tp-btnv_b:hover,.tp-lstv_s:hover{background-color:var(--btn-bg-h)}.tp-p2dv_b:focus,.tp-btnv_b:focus,.tp-lstv_s:focus{background-color:var(--btn-bg-f)}.tp-p2dv_b:active,.tp-btnv_b:active,.tp-lstv_s:active{background-color:var(--btn-bg-a)}.tp-p2dv_b:disabled,.tp-btnv_b:disabled,.tp-lstv_s:disabled{opacity:.5}.tp-rotv_c>.tp-cntv.tp-v-lst,.tp-tbpv_c>.tp-cntv.tp-v-lst,.tp-fldv_c>.tp-cntv.tp-v-lst{margin-bottom:calc(-1*var(--cnt-vp))}.tp-rotv_c>.tp-fldv.tp-v-lst .tp-fldv_c,.tp-tbpv_c>.tp-fldv.tp-v-lst .tp-fldv_c,.tp-fldv_c>.tp-fldv.tp-v-lst .tp-fldv_c{border-bottom-left-radius:0}.tp-rotv_c>.tp-fldv.tp-v-lst .tp-fldv_b,.tp-tbpv_c>.tp-fldv.tp-v-lst .tp-fldv_b,.tp-fldv_c>.tp-fldv.tp-v-lst .tp-fldv_b{border-bottom-left-radius:0}.tp-rotv_c>*:not(.tp-v-fst),.tp-tbpv_c>*:not(.tp-v-fst),.tp-fldv_c>*:not(.tp-v-fst){margin-top:var(--cnt-usp)}.tp-rotv_c>.tp-sprv:not(.tp-v-fst),.tp-tbpv_c>.tp-sprv:not(.tp-v-fst),.tp-fldv_c>.tp-sprv:not(.tp-v-fst),.tp-rotv_c>.tp-cntv:not(.tp-v-fst),.tp-tbpv_c>.tp-cntv:not(.tp-v-fst),.tp-fldv_c>.tp-cntv:not(.tp-v-fst){margin-top:var(--cnt-vp)}.tp-rotv_c>.tp-sprv+*:not(.tp-v-hidden),.tp-tbpv_c>.tp-sprv+*:not(.tp-v-hidden),.tp-fldv_c>.tp-sprv+*:not(.tp-v-hidden),.tp-rotv_c>.tp-cntv+*:not(.tp-v-hidden),.tp-tbpv_c>.tp-cntv+*:not(.tp-v-hidden),.tp-fldv_c>.tp-cntv+*:not(.tp-v-hidden){margin-top:var(--cnt-vp)}.tp-rotv_c>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-tbpv_c>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-fldv_c>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-rotv_c>.tp-cntv:not(.tp-v-hidden)+.tp-cntv,.tp-tbpv_c>.tp-cntv:not(.tp-v-hidden)+.tp-cntv,.tp-fldv_c>.tp-cntv:not(.tp-v-hidden)+.tp-cntv{margin-top:0}.tp-tbpv_c>.tp-cntv,.tp-fldv_c>.tp-cntv{margin-left:4px}.tp-tbpv_c>.tp-fldv>.tp-fldv_b,.tp-fldv_c>.tp-fldv>.tp-fldv_b{border-top-left-radius:var(--bld-br);border-bottom-left-radius:var(--bld-br)}.tp-tbpv_c>.tp-fldv.tp-fldv-expanded>.tp-fldv_b,.tp-fldv_c>.tp-fldv.tp-fldv-expanded>.tp-fldv_b{border-bottom-left-radius:0}.tp-tbpv_c .tp-fldv>.tp-fldv_c,.tp-fldv_c .tp-fldv>.tp-fldv_c{border-bottom-left-radius:var(--bld-br)}.tp-tbpv_c>.tp-cntv+.tp-fldv>.tp-fldv_b,.tp-fldv_c>.tp-cntv+.tp-fldv>.tp-fldv_b{border-top-left-radius:0}.tp-tbpv_c>.tp-cntv+.tp-tabv>.tp-tabv_t,.tp-fldv_c>.tp-cntv+.tp-tabv>.tp-tabv_t{border-top-left-radius:0}.tp-tbpv_c>.tp-tabv>.tp-tabv_t,.tp-fldv_c>.tp-tabv>.tp-tabv_t{border-top-left-radius:var(--bld-br)}.tp-tbpv_c .tp-tabv>.tp-tabv_c,.tp-fldv_c .tp-tabv>.tp-tabv_c{border-bottom-left-radius:var(--bld-br)}.tp-rotv_b,.tp-fldv_b{background-color:var(--cnt-bg);color:var(--cnt-fg);cursor:pointer;display:block;height:calc(var(--cnt-usz) + 4px);line-height:calc(var(--cnt-usz) + 4px);overflow:hidden;padding-left:var(--cnt-hp);padding-right:calc(4px + var(--cnt-usz) + var(--cnt-hp));position:relative;text-align:left;text-overflow:ellipsis;white-space:nowrap;width:100%;transition:border-radius .2s ease-in-out .2s}.tp-rotv_b:hover,.tp-fldv_b:hover{background-color:var(--cnt-bg-h)}.tp-rotv_b:focus,.tp-fldv_b:focus{background-color:var(--cnt-bg-f)}.tp-rotv_b:active,.tp-fldv_b:active{background-color:var(--cnt-bg-a)}.tp-rotv_b:disabled,.tp-fldv_b:disabled{opacity:.5}.tp-rotv_m,.tp-fldv_m{background:linear-gradient(to left, var(--cnt-fg), var(--cnt-fg) 2px, transparent 2px, transparent 4px, var(--cnt-fg) 4px);border-radius:2px;bottom:0;content:"";display:block;height:6px;right:calc(var(--cnt-hp) + (var(--cnt-usz) + 4px - 6px)/2 - 2px);margin:auto;opacity:.5;position:absolute;top:0;transform:rotate(90deg);transition:transform .2s ease-in-out;width:6px}.tp-rotv.tp-rotv-expanded .tp-rotv_m,.tp-fldv.tp-fldv-expanded>.tp-fldv_b>.tp-fldv_m{transform:none}.tp-rotv_c,.tp-fldv_c{box-sizing:border-box;height:0;opacity:0;overflow:hidden;padding-bottom:0;padding-top:0;position:relative;transition:height .2s ease-in-out,opacity .2s linear,padding .2s ease-in-out}.tp-rotv.tp-rotv-cpl:not(.tp-rotv-expanded) .tp-rotv_c,.tp-fldv.tp-fldv-cpl:not(.tp-fldv-expanded)>.tp-fldv_c{display:none}.tp-rotv.tp-rotv-expanded .tp-rotv_c,.tp-fldv.tp-fldv-expanded>.tp-fldv_c{opacity:1;padding-bottom:var(--cnt-vp);padding-top:var(--cnt-vp);transform:none;overflow:visible;transition:height .2s ease-in-out,opacity .2s linear .2s,padding .2s ease-in-out}.tp-txtv_i,.tp-p2dpv_p,.tp-colswv_sw{background-color:var(--in-bg);border-radius:var(--bld-br);box-sizing:border-box;color:var(--in-fg);font-family:inherit;height:var(--cnt-usz);line-height:var(--cnt-usz);min-width:0;width:100%}.tp-txtv_i:hover,.tp-p2dpv_p:hover,.tp-colswv_sw:hover{background-color:var(--in-bg-h)}.tp-txtv_i:focus,.tp-p2dpv_p:focus,.tp-colswv_sw:focus{background-color:var(--in-bg-f)}.tp-txtv_i:active,.tp-p2dpv_p:active,.tp-colswv_sw:active{background-color:var(--in-bg-a)}.tp-txtv_i:disabled,.tp-p2dpv_p:disabled,.tp-colswv_sw:disabled{opacity:.5}.tp-lstv,.tp-coltxtv_m{position:relative}.tp-lstv_s{padding:0 20px 0 4px;width:100%}.tp-lstv_m,.tp-coltxtv_mm{bottom:0;margin:auto;pointer-events:none;position:absolute;right:2px;top:0}.tp-lstv_m svg,.tp-coltxtv_mm svg{bottom:0;height:16px;margin:auto;position:absolute;right:0;top:0;width:16px}.tp-lstv_m svg path,.tp-coltxtv_mm svg path{fill:currentColor}.tp-sglv_i,.tp-mllv_i,.tp-grlv_g{background-color:var(--mo-bg);border-radius:var(--bld-br);box-sizing:border-box;color:var(--mo-fg);height:var(--cnt-usz);scrollbar-color:currentColor rgba(0,0,0,0);scrollbar-width:thin;width:100%}.tp-sglv_i::-webkit-scrollbar,.tp-mllv_i::-webkit-scrollbar,.tp-grlv_g::-webkit-scrollbar{height:8px;width:8px}.tp-sglv_i::-webkit-scrollbar-corner,.tp-mllv_i::-webkit-scrollbar-corner,.tp-grlv_g::-webkit-scrollbar-corner{background-color:rgba(0,0,0,0)}.tp-sglv_i::-webkit-scrollbar-thumb,.tp-mllv_i::-webkit-scrollbar-thumb,.tp-grlv_g::-webkit-scrollbar-thumb{background-clip:padding-box;background-color:currentColor;border:rgba(0,0,0,0) solid 2px;border-radius:4px}.tp-pndtxtv,.tp-coltxtv_w{display:flex}.tp-pndtxtv_a,.tp-coltxtv_c{width:100%}.tp-pndtxtv_a+.tp-pndtxtv_a,.tp-coltxtv_c+.tp-pndtxtv_a,.tp-pndtxtv_a+.tp-coltxtv_c,.tp-coltxtv_c+.tp-coltxtv_c{margin-left:2px}.tp-rotv{--bs-bg: var(--tp-base-background-color, hsl(230, 7%, 17%));--bs-br: var(--tp-base-border-radius, 6px);--bs-ff: var(--tp-base-font-family, Roboto Mono, Source Code Pro, Menlo, Courier, monospace);--bs-sh: var(--tp-base-shadow-color, rgba(0, 0, 0, 0.2));--bld-br: var(--tp-blade-border-radius, 2px);--bld-hp: var(--tp-blade-horizontal-padding, 4px);--bld-vw: var(--tp-blade-value-width, 160px);--btn-bg: var(--tp-button-background-color, hsl(230, 7%, 70%));--btn-bg-a: var(--tp-button-background-color-active, #d6d7db);--btn-bg-f: var(--tp-button-background-color-focus, #c8cad0);--btn-bg-h: var(--tp-button-background-color-hover, #bbbcc4);--btn-fg: var(--tp-button-foreground-color, hsl(230, 7%, 17%));--cnt-bg: var(--tp-container-background-color, rgba(187, 188, 196, 0.1));--cnt-bg-a: var(--tp-container-background-color-active, rgba(187, 188, 196, 0.25));--cnt-bg-f: var(--tp-container-background-color-focus, rgba(187, 188, 196, 0.2));--cnt-bg-h: var(--tp-container-background-color-hover, rgba(187, 188, 196, 0.15));--cnt-fg: var(--tp-container-foreground-color, hsl(230, 7%, 75%));--cnt-hp: var(--tp-container-horizontal-padding, 4px);--cnt-vp: var(--tp-container-vertical-padding, 4px);--cnt-usp: var(--tp-container-unit-spacing, 4px);--cnt-usz: var(--tp-container-unit-size, 20px);--in-bg: var(--tp-input-background-color, rgba(187, 188, 196, 0.1));--in-bg-a: var(--tp-input-background-color-active, rgba(187, 188, 196, 0.25));--in-bg-f: var(--tp-input-background-color-focus, rgba(187, 188, 196, 0.2));--in-bg-h: var(--tp-input-background-color-hover, rgba(187, 188, 196, 0.15));--in-fg: var(--tp-input-foreground-color, hsl(230, 7%, 75%));--lbl-fg: var(--tp-label-foreground-color, rgba(187, 188, 196, 0.7));--mo-bg: var(--tp-monitor-background-color, rgba(0, 0, 0, 0.2));--mo-fg: var(--tp-monitor-foreground-color, rgba(187, 188, 196, 0.7));--grv-fg: var(--tp-groove-foreground-color, rgba(187, 188, 196, 0.1))}.tp-btnv_b{width:100%}.tp-btnv_t{text-align:center}.tp-ckbv_l{display:block;position:relative}.tp-ckbv_i{left:0;opacity:0;position:absolute;top:0}.tp-ckbv_w{background-color:var(--in-bg);border-radius:var(--bld-br);cursor:pointer;display:block;height:var(--cnt-usz);position:relative;width:var(--cnt-usz)}.tp-ckbv_w svg{display:block;height:16px;inset:0;margin:auto;opacity:0;position:absolute;width:16px}.tp-ckbv_w svg path{fill:none;stroke:var(--in-fg);stroke-width:2}.tp-ckbv_i:hover+.tp-ckbv_w{background-color:var(--in-bg-h)}.tp-ckbv_i:focus+.tp-ckbv_w{background-color:var(--in-bg-f)}.tp-ckbv_i:active+.tp-ckbv_w{background-color:var(--in-bg-a)}.tp-ckbv_i:checked+.tp-ckbv_w svg{opacity:1}.tp-ckbv.tp-v-disabled .tp-ckbv_w{opacity:.5}.tp-colv{position:relative}.tp-colv_h{display:flex}.tp-colv_s{flex-grow:0;flex-shrink:0;width:var(--cnt-usz)}.tp-colv_t{flex:1;margin-left:4px}.tp-colv_p{height:0;margin-top:0;opacity:0;overflow:hidden;transition:height .2s ease-in-out,opacity .2s linear,margin .2s ease-in-out}.tp-colv.tp-colv-expanded.tp-colv-cpl .tp-colv_p{overflow:visible}.tp-colv.tp-colv-expanded .tp-colv_p{margin-top:var(--cnt-usp);opacity:1}.tp-colv .tp-popv{left:calc(-1*var(--cnt-hp));right:calc(-1*var(--cnt-hp));top:var(--cnt-usz)}.tp-colpv_h,.tp-colpv_ap{margin-left:6px;margin-right:6px}.tp-colpv_h{margin-top:var(--cnt-usp)}.tp-colpv_rgb{display:flex;margin-top:var(--cnt-usp);width:100%}.tp-colpv_a{display:flex;margin-top:var(--cnt-vp);padding-top:calc(var(--cnt-vp) + 2px);position:relative}.tp-colpv_a::before{background-color:var(--grv-fg);content:"";height:2px;left:calc(-1*var(--cnt-hp));position:absolute;right:calc(-1*var(--cnt-hp));top:0}.tp-colpv.tp-v-disabled .tp-colpv_a::before{opacity:.5}.tp-colpv_ap{align-items:center;display:flex;flex:3}.tp-colpv_at{flex:1;margin-left:4px}.tp-svpv{border-radius:var(--bld-br);outline:none;overflow:hidden;position:relative}.tp-svpv.tp-v-disabled{opacity:.5}.tp-svpv_c{cursor:crosshair;display:block;height:calc(var(--cnt-usz)*4);width:100%}.tp-svpv_m{border-radius:100%;border:rgba(255,255,255,.75) solid 2px;box-sizing:border-box;filter:drop-shadow(0 0 1px rgba(0, 0, 0, 0.3));height:12px;margin-left:-6px;margin-top:-6px;pointer-events:none;position:absolute;width:12px}.tp-svpv:focus .tp-svpv_m{border-color:#fff}.tp-hplv{cursor:pointer;height:var(--cnt-usz);outline:none;position:relative}.tp-hplv.tp-v-disabled{opacity:.5}.tp-hplv_c{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAABCAYAAABubagXAAAAQ0lEQVQoU2P8z8Dwn0GCgQEDi2OK/RBgYHjBgIpfovFh8j8YBIgzFGQxuqEgPhaDOT5gOhPkdCxOZeBg+IDFZZiGAgCaSSMYtcRHLgAAAABJRU5ErkJggg==);background-position:left top;background-repeat:no-repeat;background-size:100% 100%;border-radius:2px;display:block;height:4px;left:0;margin-top:-2px;position:absolute;top:50%;width:100%}.tp-hplv_m{border-radius:var(--bld-br);border:rgba(255,255,255,.75) solid 2px;box-shadow:0 0 2px rgba(0,0,0,.1);box-sizing:border-box;height:12px;left:50%;margin-left:-6px;margin-top:-6px;pointer-events:none;position:absolute;top:50%;width:12px}.tp-hplv:focus .tp-hplv_m{border-color:#fff}.tp-aplv{cursor:pointer;height:var(--cnt-usz);outline:none;position:relative;width:100%}.tp-aplv.tp-v-disabled{opacity:.5}.tp-aplv_b{background-color:#fff;background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:4px 4px;background-position:0 0,2px 2px;border-radius:2px;display:block;height:4px;left:0;margin-top:-2px;overflow:hidden;position:absolute;top:50%;width:100%}.tp-aplv_c{inset:0;position:absolute}.tp-aplv_m{background-color:#fff;background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:12px 12px;background-position:0 0,6px 6px;border-radius:var(--bld-br);box-shadow:0 0 2px rgba(0,0,0,.1);height:12px;left:50%;margin-left:-6px;margin-top:-6px;overflow:hidden;pointer-events:none;position:absolute;top:50%;width:12px}.tp-aplv_p{border-radius:var(--bld-br);border:rgba(255,255,255,.75) solid 2px;box-sizing:border-box;inset:0;position:absolute}.tp-aplv:focus .tp-aplv_p{border-color:#fff}.tp-colswv{background-color:#fff;background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:10px 10px;background-position:0 0,5px 5px;border-radius:var(--bld-br);overflow:hidden}.tp-colswv.tp-v-disabled{opacity:.5}.tp-colswv_sw{border-radius:0}.tp-colswv_b{cursor:pointer;display:block;height:var(--cnt-usz);left:0;position:absolute;top:0;width:var(--cnt-usz)}.tp-colswv_b:focus::after{border:rgba(255,255,255,.75) solid 2px;border-radius:var(--bld-br);content:"";display:block;inset:0;position:absolute}.tp-coltxtv{display:flex;width:100%}.tp-coltxtv_m{margin-right:4px}.tp-coltxtv_ms{border-radius:var(--bld-br);color:var(--lbl-fg);cursor:pointer;height:var(--cnt-usz);line-height:var(--cnt-usz);padding:0 18px 0 4px}.tp-coltxtv_ms:hover{background-color:var(--in-bg-h)}.tp-coltxtv_ms:focus{background-color:var(--in-bg-f)}.tp-coltxtv_ms:active{background-color:var(--in-bg-a)}.tp-coltxtv_mm{color:var(--lbl-fg)}.tp-coltxtv.tp-v-disabled .tp-coltxtv_mm{opacity:.5}.tp-coltxtv_w{flex:1}.tp-dfwv{position:absolute;top:8px;right:8px;width:256px}.tp-fldv{position:relative}.tp-fldv_t{padding-left:4px}.tp-fldv_b:disabled .tp-fldv_m{display:none}.tp-fldv_c{padding-left:4px}.tp-fldv_i{bottom:0;color:var(--cnt-bg);left:0;overflow:hidden;position:absolute;top:calc(var(--cnt-usz) + 4px);width:max(var(--bs-br),4px)}.tp-fldv_i::before{background-color:currentColor;bottom:0;content:"";left:0;position:absolute;top:0;width:4px}.tp-fldv_b:hover+.tp-fldv_i{color:var(--cnt-bg-h)}.tp-fldv_b:focus+.tp-fldv_i{color:var(--cnt-bg-f)}.tp-fldv_b:active+.tp-fldv_i{color:var(--cnt-bg-a)}.tp-fldv.tp-v-disabled>.tp-fldv_i{opacity:.5}.tp-grlv{position:relative}.tp-grlv_g{display:block;height:calc(var(--cnt-usz)*3)}.tp-grlv_g polyline{fill:none;stroke:var(--mo-fg);stroke-linejoin:round}.tp-grlv_t{margin-top:-4px;transition:left .05s,top .05s;visibility:hidden}.tp-grlv_t.tp-grlv_t-a{visibility:visible}.tp-grlv_t.tp-grlv_t-in{transition:none}.tp-grlv.tp-v-disabled .tp-grlv_g{opacity:.5}.tp-grlv .tp-ttv{background-color:var(--mo-fg)}.tp-grlv .tp-ttv::before{border-top-color:var(--mo-fg)}.tp-lblv{align-items:center;display:flex;line-height:1.3;padding-left:var(--cnt-hp);padding-right:var(--cnt-hp)}.tp-lblv.tp-lblv-nol{display:block}.tp-lblv_l{color:var(--lbl-fg);flex:1;-webkit-hyphens:auto;hyphens:auto;overflow:hidden;padding-left:4px;padding-right:16px}.tp-lblv.tp-v-disabled .tp-lblv_l{opacity:.5}.tp-lblv.tp-lblv-nol .tp-lblv_l{display:none}.tp-lblv_v{align-self:flex-start;flex-grow:0;flex-shrink:0;width:var(--bld-vw)}.tp-lblv.tp-lblv-nol .tp-lblv_v{width:100%}.tp-lstv_s{padding:0 20px 0 var(--bld-hp);width:100%}.tp-lstv_m{color:var(--btn-fg)}.tp-sglv_i{padding-left:var(--bld-hp);padding-right:var(--bld-hp)}.tp-sglv.tp-v-disabled .tp-sglv_i{opacity:.5}.tp-mllv_i{display:block;height:calc(var(--cnt-usz)*3);line-height:var(--cnt-usz);padding-left:var(--bld-hp);padding-right:var(--bld-hp);resize:none;white-space:pre}.tp-mllv.tp-v-disabled .tp-mllv_i{opacity:.5}.tp-p2dv{position:relative}.tp-p2dv_h{display:flex}.tp-p2dv_b{height:var(--cnt-usz);margin-right:4px;position:relative;width:var(--cnt-usz)}.tp-p2dv_b svg{display:block;height:16px;left:50%;margin-left:-8px;margin-top:-8px;position:absolute;top:50%;width:16px}.tp-p2dv_b svg path{stroke:currentColor;stroke-width:2}.tp-p2dv_b svg circle{fill:currentColor}.tp-p2dv_t{flex:1}.tp-p2dv_p{height:0;margin-top:0;opacity:0;overflow:hidden;transition:height .2s ease-in-out,opacity .2s linear,margin .2s ease-in-out}.tp-p2dv.tp-p2dv-expanded .tp-p2dv_p{margin-top:var(--cnt-usp);opacity:1}.tp-p2dv .tp-popv{left:calc(-1*var(--cnt-hp));right:calc(-1*var(--cnt-hp));top:var(--cnt-usz)}.tp-p2dpv{padding-left:calc(var(--cnt-usz) + 4px)}.tp-p2dpv_p{cursor:crosshair;height:0;overflow:hidden;padding-bottom:100%;position:relative}.tp-p2dpv.tp-v-disabled .tp-p2dpv_p{opacity:.5}.tp-p2dpv_g{display:block;height:100%;left:0;pointer-events:none;position:absolute;top:0;width:100%}.tp-p2dpv_ax{opacity:.1;stroke:var(--in-fg);stroke-dasharray:1}.tp-p2dpv_l{opacity:.5;stroke:var(--in-fg);stroke-dasharray:1}.tp-p2dpv_m{border:var(--in-fg) solid 1px;border-radius:50%;box-sizing:border-box;height:4px;margin-left:-2px;margin-top:-2px;position:absolute;width:4px}.tp-p2dpv_p:focus .tp-p2dpv_m{background-color:var(--in-fg);border-width:0}.tp-popv{background-color:var(--bs-bg);border-radius:var(--bs-br);box-shadow:0 2px 4px var(--bs-sh);display:none;max-width:var(--bld-vw);padding:var(--cnt-vp) var(--cnt-hp);position:absolute;visibility:hidden;z-index:1000}.tp-popv.tp-popv-v{display:block;visibility:visible}.tp-sldv.tp-v-disabled{opacity:.5}.tp-sldv_t{box-sizing:border-box;cursor:pointer;height:var(--cnt-usz);margin:0 6px;outline:none;position:relative}.tp-sldv_t::before{background-color:var(--in-bg);border-radius:1px;content:"";display:block;height:2px;inset:0;margin:auto;position:absolute}.tp-sldv_k{height:100%;left:0;position:absolute;top:0}.tp-sldv_k::before{background-color:var(--in-fg);border-radius:1px;content:"";display:block;height:2px;inset:0;margin-bottom:auto;margin-top:auto;position:absolute}.tp-sldv_k::after{background-color:var(--btn-bg);border-radius:var(--bld-br);bottom:0;content:"";display:block;height:12px;margin-bottom:auto;margin-top:auto;position:absolute;right:-6px;top:0;width:12px}.tp-sldv_t:hover .tp-sldv_k::after{background-color:var(--btn-bg-h)}.tp-sldv_t:focus .tp-sldv_k::after{background-color:var(--btn-bg-f)}.tp-sldv_t:active .tp-sldv_k::after{background-color:var(--btn-bg-a)}.tp-sldtxtv{display:flex}.tp-sldtxtv_s{flex:2}.tp-sldtxtv_t{flex:1;margin-left:4px}.tp-tabv{position:relative}.tp-tabv_t{align-items:flex-end;color:var(--cnt-bg);display:flex;overflow:hidden;position:relative}.tp-tabv_t:hover{color:var(--cnt-bg-h)}.tp-tabv_t:has(*:focus){color:var(--cnt-bg-f)}.tp-tabv_t:has(*:active){color:var(--cnt-bg-a)}.tp-tabv_t::before{background-color:currentColor;bottom:0;content:"";height:2px;left:0;pointer-events:none;position:absolute;right:0}.tp-tabv.tp-v-disabled .tp-tabv_t::before{opacity:.5}.tp-tabv.tp-tabv-nop .tp-tabv_t{height:calc(var(--cnt-usz) + 4px);position:relative}.tp-tabv.tp-tabv-nop .tp-tabv_t::before{background-color:var(--cnt-bg);bottom:0;content:"";height:2px;left:0;position:absolute;right:0}.tp-tabv_i{bottom:0;color:var(--cnt-bg);left:0;overflow:hidden;position:absolute;top:calc(var(--cnt-usz) + 4px);width:max(var(--bs-br),4px)}.tp-tabv_i::before{background-color:currentColor;bottom:0;content:"";left:0;position:absolute;top:0;width:4px}.tp-tabv_t:hover+.tp-tabv_i{color:var(--cnt-bg-h)}.tp-tabv_t:has(*:focus)+.tp-tabv_i{color:var(--cnt-bg-f)}.tp-tabv_t:has(*:active)+.tp-tabv_i{color:var(--cnt-bg-a)}.tp-tabv.tp-v-disabled>.tp-tabv_i{opacity:.5}.tp-tbiv{flex:1;min-width:0;position:relative}.tp-tbiv+.tp-tbiv{margin-left:2px}.tp-tbiv+.tp-tbiv.tp-v-disabled::before{opacity:.5}.tp-tbiv_b{display:block;padding-left:calc(var(--cnt-hp) + 4px);padding-right:calc(var(--cnt-hp) + 4px);position:relative;width:100%}.tp-tbiv_b:disabled{opacity:.5}.tp-tbiv_b::before{background-color:var(--cnt-bg);content:"";inset:0 0 2px;pointer-events:none;position:absolute}.tp-tbiv_b:hover::before{background-color:var(--cnt-bg-h)}.tp-tbiv_b:focus::before{background-color:var(--cnt-bg-f)}.tp-tbiv_b:active::before{background-color:var(--cnt-bg-a)}.tp-tbiv_t{color:var(--cnt-fg);height:calc(var(--cnt-usz) + 4px);line-height:calc(var(--cnt-usz) + 4px);opacity:.5;overflow:hidden;position:relative;text-overflow:ellipsis}.tp-tbiv.tp-tbiv-sel .tp-tbiv_t{opacity:1}.tp-tbpv_c{padding-bottom:var(--cnt-vp);padding-left:4px;padding-top:var(--cnt-vp)}.tp-txtv{position:relative}.tp-txtv_i{padding-left:var(--bld-hp);padding-right:var(--bld-hp)}.tp-txtv.tp-txtv-fst .tp-txtv_i{border-bottom-right-radius:0;border-top-right-radius:0}.tp-txtv.tp-txtv-mid .tp-txtv_i{border-radius:0}.tp-txtv.tp-txtv-lst .tp-txtv_i{border-bottom-left-radius:0;border-top-left-radius:0}.tp-txtv.tp-txtv-num .tp-txtv_i{text-align:right}.tp-txtv.tp-txtv-drg .tp-txtv_i{opacity:.3}.tp-txtv_k{cursor:pointer;height:100%;left:calc(var(--bld-hp) - 5px);position:absolute;top:0;width:12px}.tp-txtv_k::before{background-color:var(--in-fg);border-radius:1px;bottom:0;content:"";height:calc(var(--cnt-usz) - 4px);left:50%;margin-bottom:auto;margin-left:-1px;margin-top:auto;opacity:.1;position:absolute;top:0;transition:border-radius .1s,height .1s,transform .1s,width .1s;width:2px}.tp-txtv_k:hover::before,.tp-txtv.tp-txtv-drg .tp-txtv_k::before{opacity:1}.tp-txtv.tp-txtv-drg .tp-txtv_k::before{border-radius:50%;height:4px;transform:translateX(-1px);width:4px}.tp-txtv_g{bottom:0;display:block;height:8px;left:50%;margin:auto;overflow:visible;pointer-events:none;position:absolute;top:0;visibility:hidden;width:100%}.tp-txtv.tp-txtv-drg .tp-txtv_g{visibility:visible}.tp-txtv_gb{fill:none;stroke:var(--in-fg);stroke-dasharray:1}.tp-txtv_gh{fill:none;stroke:var(--in-fg)}.tp-txtv .tp-ttv{margin-left:6px;visibility:hidden}.tp-txtv.tp-txtv-drg .tp-ttv{visibility:visible}.tp-ttv{background-color:var(--in-fg);border-radius:var(--bld-br);color:var(--bs-bg);padding:2px 4px;pointer-events:none;position:absolute;transform:translate(-50%, -100%)}.tp-ttv::before{border-color:var(--in-fg) rgba(0,0,0,0) rgba(0,0,0,0) rgba(0,0,0,0);border-style:solid;border-width:2px;box-sizing:border-box;content:"";font-size:.9em;height:4px;left:50%;margin-left:-2px;position:absolute;top:100%;width:4px}.tp-rotv{background-color:var(--bs-bg);border-radius:var(--bs-br);box-shadow:0 2px 4px var(--bs-sh);font-family:var(--bs-ff);font-size:11px;font-weight:500;line-height:1;text-align:left}.tp-rotv_b{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br);border-top-left-radius:var(--bs-br);border-top-right-radius:var(--bs-br);padding-left:calc(4px + var(--cnt-usz) + var(--cnt-hp));text-align:center}.tp-rotv.tp-rotv-expanded .tp-rotv_b{border-bottom-left-radius:0;border-bottom-right-radius:0;transition-delay:0s;transition-duration:0s}.tp-rotv.tp-rotv-not>.tp-rotv_b{display:none}.tp-rotv_b:disabled .tp-rotv_m{display:none}.tp-rotv_c>.tp-fldv.tp-v-lst>.tp-fldv_c{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br)}.tp-rotv_c>.tp-fldv.tp-v-lst>.tp-fldv_i{border-bottom-left-radius:var(--bs-br)}.tp-rotv_c>.tp-fldv.tp-v-lst:not(.tp-fldv-expanded)>.tp-fldv_b{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br)}.tp-rotv_c>.tp-fldv.tp-v-lst.tp-fldv-expanded>.tp-fldv_b{transition-delay:0s;transition-duration:0s}.tp-rotv_c .tp-fldv.tp-v-vlst:not(.tp-fldv-expanded)>.tp-fldv_b{border-bottom-right-radius:var(--bs-br)}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-fldv.tp-v-fst{margin-top:calc(-1*var(--cnt-vp))}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-fldv.tp-v-fst>.tp-fldv_b{border-top-left-radius:var(--bs-br);border-top-right-radius:var(--bs-br)}.tp-rotv_c>.tp-tabv.tp-v-lst>.tp-tabv_c{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br)}.tp-rotv_c>.tp-tabv.tp-v-lst>.tp-tabv_i{border-bottom-left-radius:var(--bs-br)}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-tabv.tp-v-fst{margin-top:calc(-1*var(--cnt-vp))}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-tabv.tp-v-fst>.tp-tabv_t{border-top-left-radius:var(--bs-br);border-top-right-radius:var(--bs-br)}.tp-rotv.tp-v-disabled,.tp-rotv .tp-v-disabled{pointer-events:none}.tp-rotv.tp-v-hidden,.tp-rotv .tp-v-hidden{display:none}.tp-sprv_r{background-color:var(--grv-fg);border-width:0;display:block;height:2px;margin:0;width:100%}.tp-sprv.tp-v-disabled .tp-sprv_r{opacity:.5}',
            plugins: [Mb, Db, Rb, Ca, Bb]
        })
    }
}
new wa("4.0.4");
const tl = document.querySelector(".container")
  , B = document.querySelector(".fireworks-container")
  , x = {
    hue: {
        min: 0,
        max: 345
    },
    delay: {
        min: 30,
        max: 60
    },
    rocketsPoint: {
        min: 50,
        max: 50
    },
    opacity: .5,
    acceleration: 1.02,
    friction: .97,
    gravity: 1.5,
    particles: 60,
    traceLength: 3,
    traceSpeed: 10,
    explosion: 5,
    intensity: 30,
    flickering: 50,
    lineStyle: "round",
    lineWidth: {
        explosion: {
            min: 1,
            max: 4
        },
        trace: {
            min: .1,
            max: 1
        }
    },
    brightness: {
        min: 50,
        max: 80
    },
    decay: {
        min: .015,
        max: .03
    },
    boundaries: {
        x: 50,
        y: 50,
        width: B.clientWidth,
        height: B.clientHeight
    },
    sound: {
        enabled: !1,
        files: [location.href + "sounds/explosion0.mp3", location.href + "sounds/explosion1.mp3", location.href + "sounds/explosion2.mp3"],
        volume: {
            min: 2,
            max: 4
        }
    },
    mouse: {
        click: !0,
        move: !1,
        max: 1
    }
}
  , Ce = {
    color: "#000000",
    image: "",
    size: "cover",
    position: "50% 50%",
    repeat: "no-repeat",
    container: !1,
    fps: !1
}
  , Fb = `<svg xmlns="http://www.w3.org/2000/svg" width="107" height="35" fill="none">
  <path fill="var(--bg-badge)" d="M.5 13.768v8.4a8 8 0 0 0 8 8h70.592l-.492-.24a8 8 0 0 1-4.5-7.193V12.094a8 8 0 0 1 3.102-6.326H8.5a8 8 0 0 0-8 8Z"/>
  <path fill="var(--bg-logo)" d="M106.5 22.735V12.094a8 8 0 0 0-4.79-7.328l-8.2-3.592a8 8 0 0 0-6.42 0l-8.2 3.592a7.995 7.995 0 0 0-4.79 7.328v10.641a8 8 0 0 0 4.5 7.194l.492.24 7.708 3.75a8 8 0 0 0 7 0l8.2-3.99a8 8 0 0 0 4.5-7.194Z"/>
  <path fill="var(--text-logo)" d="M83.914 19.587a.41.41 0 0 0-.614.354v3.876a.41.41 0 0 0 .205.354l2.046 1.182a.41.41 0 0 0 .614-.355v-3.875a.41.41 0 0 0-.204-.355l-2.047-1.181ZM90.86 8.25l-.034.007c-.166.033-.339.067-.486.151l-6.835 3.947a.41.41 0 0 0-.205.354v3.167a.41.41 0 0 0 .205.355l2.046 1.181a.41.41 0 0 0 .614-.354v-2.789a.41.41 0 0 1 .205-.354l5.034-2.907a.378.378 0 0 1 .151-.05 1.434 1.434 0 0 1 1.462.882c.018.043.025.09.025.136v4.184a.41.41 0 0 1-.205.354l-3.806 2.198a.41.41 0 0 0 0 .71l5.28 3.048a.41.41 0 0 1 .205.354v2.647a.41.41 0 0 0 .204.355l1.883 1.087a.41.41 0 0 0 .614-.355v-5.483a.41.41 0 0 0-.204-.354l-2.252-1.3a.41.41 0 0 1 0-.709l.942-.543a.41.41 0 0 0 .204-.355v-5.39a4.227 4.227 0 0 0-.536-2.1 4.237 4.237 0 0 0-2.329-1.935 4.25 4.25 0 0 0-2.182-.14Z"/>
  <path fill="var(--text-badge)" d="M19.805 13.634v8.934h-1.792v-5.811l-2.393 5.811h-1.357l-2.406-5.811v5.811h-1.792v-8.934H12.1l2.841 6.643 2.842-6.643h2.022Zm1.311 5.363c0-.717.141-1.353.423-1.907.29-.555.678-.982 1.164-1.28a3.134 3.134 0 0 1 1.652-.448c.529 0 .99.106 1.382.32.401.213.721.482.96.806v-1.011h1.805v7.091h-1.805v-1.037a2.7 2.7 0 0 1-.96.832c-.401.214-.866.32-1.395.32a3.045 3.045 0 0 1-1.639-.46 3.298 3.298 0 0 1-1.164-1.293c-.282-.564-.423-1.208-.423-1.933Zm5.581.026c0-.436-.085-.807-.256-1.114a1.751 1.751 0 0 0-.691-.717 1.812 1.812 0 0 0-.935-.256c-.332 0-.64.081-.921.243a1.864 1.864 0 0 0-.691.717c-.171.307-.256.674-.256 1.1 0 .428.085.803.256 1.127.179.316.41.56.69.73.29.17.598.256.922.256.333 0 .645-.081.935-.243.29-.171.52-.41.691-.717.17-.316.256-.691.256-1.127Zm3.094-.026c0-.717.141-1.353.423-1.907a3.17 3.17 0 0 1 1.177-1.28 3.134 3.134 0 0 1 1.651-.448c.461 0 .9.102 1.319.307.418.196.75.46.998.793v-3.366h1.818v9.472h-1.818v-1.05a2.43 2.43 0 0 1-.934.845c-.401.214-.866.32-1.395.32a3.045 3.045 0 0 1-1.639-.46 3.263 3.263 0 0 1-1.177-1.293c-.282-.564-.423-1.208-.423-1.933Zm5.581.026c0-.436-.085-.807-.256-1.114a1.751 1.751 0 0 0-.691-.717 1.812 1.812 0 0 0-.935-.256c-.332 0-.64.081-.921.243a1.864 1.864 0 0 0-.691.717c-.171.307-.256.674-.256 1.1 0 .428.085.803.256 1.127.179.316.41.56.69.73.29.17.598.256.922.256.333 0 .645-.081.935-.243.29-.171.52-.41.691-.717.17-.316.256-.691.256-1.127Zm10.147-.154c0 .256-.017.486-.051.691h-5.184c.042.512.222.913.537 1.203.316.29.704.435 1.165.435.666 0 1.14-.285 1.421-.857h1.933a3.264 3.264 0 0 1-1.178 1.69c-.58.435-1.293.652-2.137.652a3.79 3.79 0 0 1-1.844-.448 3.298 3.298 0 0 1-1.267-1.293c-.299-.554-.448-1.194-.448-1.92 0-.733.15-1.378.448-1.932a3.125 3.125 0 0 1 1.255-1.28c.537-.299 1.156-.448 1.856-.448.674 0 1.275.145 1.804.435.538.29.952.704 1.242 1.241.299.53.448 1.14.448 1.83Zm-1.856-.512c-.009-.46-.175-.828-.5-1.1-.323-.283-.72-.423-1.19-.423-.443 0-.819.136-1.126.41-.299.264-.482.635-.55 1.113h3.366Zm8.006-1.843c.23-.342.546-.619.947-.832a2.97 2.97 0 0 1 1.395-.32 3.068 3.068 0 0 1 2.804 1.728c.29.546.435 1.181.435 1.907 0 .725-.145 1.37-.435 1.933-.282.554-.67.985-1.165 1.293a3.004 3.004 0 0 1-1.639.46c-.529 0-.994-.102-1.395-.307a2.773 2.773 0 0 1-.947-.82v1.012h-1.792v-9.472h1.792v3.418Zm3.75 2.483c0-.427-.09-.794-.268-1.1a1.814 1.814 0 0 0-1.613-.96c-.325 0-.632.084-.922.255a1.864 1.864 0 0 0-.691.717c-.17.316-.256.687-.256 1.114 0 .426.085.797.256 1.113.18.316.41.559.691.73.29.162.598.243.922.243a1.84 1.84 0 0 0 1.613-.986c.179-.316.268-.69.268-1.126Zm9.917-3.52-4.39 10.445h-1.908l1.536-3.533-2.841-6.912h2.01l1.83 4.953 1.856-4.953h1.907Z"/>
</svg>`
  , zb = `:host {
  --bg-logo: #00a621;
  --text-logo: #fff;
  transition: transform 0.2s ease-in-out;
}

a:not(.visible) {
  display: none;
}

:host(:hover) {
  transform: scale(1.1);
}

@media (prefers-color-scheme: dark) {
  :host {
    --bg-badge: #fff;
    --text-badge: #000;
  }
}

@media (prefers-color-scheme: light) {
  :host {
    --bg-badge: #000;
    --text-badge: #fff;
  }
}
`;
class Kb extends HTMLElement {
    constructor() {
        super(),
        this.attachShadow({
            mode: "open"
        }),
        this.shadowRoot.innerHTML = `
      <style>${zb}</style>
      <a target="_blank">${Fb}</a>
    `
    }
    connectedCallback() {
        if (!this.isShowBadge())
            return;
        const t = this.shadowRoot.querySelector("a");
        t.href = this.getAttribute("href") ?? "#",
        t.classList.add("visible")
    }
    isShowBadge() {
        const t = new URLSearchParams(location.search)
          , e = this.getAttribute("key") ?? "utm_source"
          , i = this.getAttribute("value") ?? "upwork"
          , s = t.get(e);
        return !s || !i ? !1 : s === i
    }
}
customElements.define("r3-badge", Kb);
const Ke = new fu(B,x);
window.fireworks = Ke;
Ke.start();
const el = {
    get traces() {
        return Ke.traces.length
    },
    get particles() {
        return Ke.explosions.length
    }
}
  , nl = window.innerWidth > 1e3
  , P = new Ib({
    document,
    expanded: nl,
    title: document.title
});
P.registerPlugin(au);
P.on("fold", ({expanded: n})=>{
    nl || (tl.style.display = n ? "none" : "block")
}
);
P.addBinding(x, "hue", {
    min: 0,
    max: 360,
    step: 1
});
P.addBinding(x, "acceleration", {
    min: 1,
    max: 2
});
P.addBinding(x, "brightness", {
    min: 1,
    max: 100,
    step: 1
});
P.addBinding(x, "decay", {
    min: .001,
    max: .05
});
P.addBinding(x, "delay", {
    min: 10,
    max: 100
});
P.addBinding(x, "explosion", {
    min: 1,
    max: 10,
    step: 1
});
P.addBinding(x, "flickering", {
    min: 0,
    max: 100
});
P.addBinding(x, "intensity", {
    min: 1,
    max: 60
});
P.addBinding(x, "friction", {
    min: .5,
    max: 3
});
P.addBinding(x, "gravity", {
    min: 0,
    max: 10
});
P.addBinding(x, "opacity", {
    min: 0,
    max: 1,
    step: .1
});
P.addBinding(x, "particles", {
    step: 1,
    min: 1,
    max: 200
});
P.addBinding(x, "traceLength", {
    min: 1,
    max: 10
});
P.addBinding(x, "traceSpeed", {
    min: 1,
    max: 100,
    step: 1
});
P.addBinding(x, "rocketsPoint", {
    min: 0,
    max: 100,
    step: 1
});
P.addBinding(x.lineWidth, "explosion", {
    label: "lineWidth (explosion)",
    min: 0,
    max: 10
});
P.addBinding(x.lineWidth, "trace", {
    label: "lineWidth (trace)",
    min: 0,
    max: 10
});
P.addBinding(x, "lineStyle", {
    options: {
        round: "round",
        square: "square"
    }
});
const Ss = P.addFolder({
    title: "mouse",
    expanded: !1
});
Ss.addBinding(x.mouse, "click", {
    label: "mouse click"
});
Ss.addBinding(x.mouse, "max", {
    label: "maximum rockets",
    min: 1,
    max: 15,
    step: 1
});
Ss.addBinding(x.mouse, "move", {
    label: "follow mouse"
});
const il = P.addFolder({
    title: "sound",
    expanded: !1
});
il.addBinding(x.sound, "enabled");
il.addBinding(x.sound, "volume", {
    min: 0,
    max: 100,
    step: 1
});
P.on("change", ()=>{
    Ke.updateOptions(x)
}
);
const xe = P.addFolder({
    title: "background",
    expanded: !1
});
xe.addBinding(Ce, "container").on("change", ({value: n})=>{
    tl.style.display = n ? "none" : "block"
}
);
xe.addBinding(Ce, "color").on("change", ({value: n})=>{
    B.style.backgroundColor = n
}
);
xe.addBinding(Ce, "image").on("change", ({value: n})=>{
    B.style.backgroundImage = `url(${n})`
}
);
xe.addBinding(Ce, "size").on("change", ({value: n})=>{
    B.style.backgroundSize = n
}
);
xe.addBinding(Ce, "position").on("change", ({value: n})=>{
    B.style.backgroundPosition = n
}
);
xe.addBinding(Ce, "repeat").on("change", ({value: n})=>{
    B.style.backgroundRepeat = n
}
);
const $s = P.addFolder({
    title: "monitors",
    expanded: !1
})
  , Dr = $s.addBlade({
    view: "fpsgraph",
    label: "fps"
});
$s.addBinding(el, "particles", {
    view: "graph",
    label: "particles",
    min: 0,
    max: 5e3,
    readonly: !0
});
$s.addBinding(el, "traces", {
    view: "graph",
    label: "traces",
    min: 0,
    max: 50,
    readonly: !0
});
const sl = ()=>{
    Dr.begin(),
    Dr.end(),
    requestAnimationFrame(sl)
}
;
requestAnimationFrame(sl);
document.addEventListener("keydown", n=>{
    n.code === "F11" && (n.preventDefault(),
    B.requestFullscreen ? B.requestFullscreen() : B.webkitRequestFullscreen ? B.webkitRequestFullscreen() : B.mozRequestFullScreen ? B.mozRequestFullScreen() : B.msRequestFullscreen && B.msRequestFullscreen())
}
);
