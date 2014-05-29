/**
 * This code has been instrumented using Recognizer
 * https://github.com/equiet/recognizer
 */

var __recognizer4597791 = (function () {
    'use strict';

    var global = this;

    function Tracer() {
        this._calls = [];
        this._args = [];
        this.global = global;

        this._probeValues = {};
    }
    Tracer.prototype = {
        logEntry: function (location, args) {
            this._calls.push({
                index: this._calls.length,
                position: location,
                // args: Array.prototype.slice.call(args),
                argsCount: args.length,
                time: Date.now()
            });
            this._args.push(_.cloneDeep(args));
        },

        getCalls: function (since) {
            var calls = this._calls.filter(function(call) {
                return (since) ? call.time > since : true;
            });
            return stringify(calls);
        },

        getCallCount: function () {
            return this._calls.length;
        },

        logProbe: function (location, result) {
            this._probeValues[location.toString()] = _.cloneDeep(result);
            return result;
        },

        updateProbeValues: function () {
            var self = this;

            var probeIds = Object.keys(this._probeValues);
            var output = probeIds.map(function(probeId) {
               return {
                   id: probeId,
                   type: self.getType(self._probeValues[probeId])
               };
            });

            return stringify(output);
        },

        getType: function (value) {
            var type = typeof value;

            if (type === 'number' && isNaN(value)) {
                type = 'NaN';
            }
            if (type === null) {
                type = 'null';
            }

            return type;
        },

        test: function () {
            console.log('[recognizer tracer] test function run successfully');
        },

        connect: function () {
            return this;
        }
    };


    /**
     * JSON stringify with circular references
     * Copyright (c) Isaac Z. Schlueter ("Author")
     * The BSD License
     */
    function getSerialize(a,b){var c=[],d=[];return b=b||function(a,b){return"[Circular "+getPath(b,c,d)+"]"},function(e,f){var g=f;return"object"==typeof f&&f&&(-1!==c.indexOf(f)?g=b(e,f):(c.push(f),d.push(e))),a&&(g=a(e,g)),g}}
    function getPath(a,b,c){var d=b.indexOf(a),e=[c[d]];for(d--;d>=0;d--)b[d][e[0]]===a&&(a=b[d],e.unshift(c[d]));return"~"+e.join(".")}
    function stringify(a,b,c,d){return JSON.stringify(a,getSerialize(b,d),c)}stringify.getSerialize=getSerialize;


    /**
     * @license
     * Lo-Dash 2.4.1 (Custom Build) lodash.com/license | Underscore.js 1.5.2 underscorejs.org/LICENSE
     * Build: `lodash modern -o ./dist/lodash.js`
     */
    ;(function(){function n(n,t,e){e=(e||0)-1;for(var r=n?n.length:0;++e<r;)if(n[e]===t)return e;return-1}function t(t,e){var r=typeof e;if(t=t.l,"boolean"==r||null==e)return t[e]?0:-1;"number"!=r&&"string"!=r&&(r="object");var u="number"==r?e:m+e;return t=(t=t[r])&&t[u],"object"==r?t&&-1<n(t,e)?0:-1:t?0:-1}function e(n){var t=this.l,e=typeof n;if("boolean"==e||null==n)t[n]=true;else{"number"!=e&&"string"!=e&&(e="object");var r="number"==e?n:m+n,t=t[e]||(t[e]={});"object"==e?(t[r]||(t[r]=[])).push(n):t[r]=true
    }}function r(n){return n.charCodeAt(0)}function u(n,t){for(var e=n.m,r=t.m,u=-1,o=e.length;++u<o;){var i=e[u],a=r[u];if(i!==a){if(i>a||typeof i=="undefined")return 1;if(i<a||typeof a=="undefined")return-1}}return n.n-t.n}function o(n){var t=-1,r=n.length,u=n[0],o=n[r/2|0],i=n[r-1];if(u&&typeof u=="object"&&o&&typeof o=="object"&&i&&typeof i=="object")return false;for(u=f(),u["false"]=u["null"]=u["true"]=u.undefined=false,o=f(),o.k=n,o.l=u,o.push=e;++t<r;)o.push(n[t]);return o}function i(n){return"\\"+U[n]
    }function a(){return h.pop()||[]}function f(){return g.pop()||{k:null,l:null,m:null,"false":false,n:0,"null":false,number:null,object:null,push:null,string:null,"true":false,undefined:false,o:null}}function l(n){n.length=0,h.length<_&&h.push(n)}function c(n){var t=n.l;t&&c(t),n.k=n.l=n.m=n.object=n.number=n.string=n.o=null,g.length<_&&g.push(n)}function p(n,t,e){t||(t=0),typeof e=="undefined"&&(e=n?n.length:0);var r=-1;e=e-t||0;for(var u=Array(0>e?0:e);++r<e;)u[r]=n[t+r];return u}function s(e){function h(n,t,e){if(!n||!V[typeof n])return n;
        t=t&&typeof e=="undefined"?t:tt(t,e,3);for(var r=-1,u=V[typeof n]&&Fe(n),o=u?u.length:0;++r<o&&(e=u[r],false!==t(n[e],e,n)););return n}function g(n,t,e){var r;if(!n||!V[typeof n])return n;t=t&&typeof e=="undefined"?t:tt(t,e,3);for(r in n)if(false===t(n[r],r,n))break;return n}function _(n,t,e){var r,u=n,o=u;if(!u)return o;for(var i=arguments,a=0,f=typeof e=="number"?2:i.length;++a<f;)if((u=i[a])&&V[typeof u])for(var l=-1,c=V[typeof u]&&Fe(u),p=c?c.length:0;++l<p;)r=c[l],"undefined"==typeof o[r]&&(o[r]=u[r]);
        return o}function U(n,t,e){var r,u=n,o=u;if(!u)return o;var i=arguments,a=0,f=typeof e=="number"?2:i.length;if(3<f&&"function"==typeof i[f-2])var l=tt(i[--f-1],i[f--],2);else 2<f&&"function"==typeof i[f-1]&&(l=i[--f]);for(;++a<f;)if((u=i[a])&&V[typeof u])for(var c=-1,p=V[typeof u]&&Fe(u),s=p?p.length:0;++c<s;)r=p[c],o[r]=l?l(o[r],u[r]):u[r];return o}function H(n){var t,e=[];if(!n||!V[typeof n])return e;for(t in n)me.call(n,t)&&e.push(t);return e}function J(n){return n&&typeof n=="object"&&!Te(n)&&me.call(n,"__wrapped__")?n:new Q(n)
    }function Q(n,t){this.__chain__=!!t,this.__wrapped__=n}function X(n){function t(){if(r){var n=p(r);be.apply(n,arguments)}if(this instanceof t){var o=nt(e.prototype),n=e.apply(o,n||arguments);return wt(n)?n:o}return e.apply(u,n||arguments)}var e=n[0],r=n[2],u=n[4];return $e(t,n),t}function Z(n,t,e,r,u){if(e){var o=e(n);if(typeof o!="undefined")return o}if(!wt(n))return n;var i=ce.call(n);if(!K[i])return n;var f=Ae[i];switch(i){case T:case F:return new f(+n);case W:case P:return new f(n);case z:return o=f(n.source,C.exec(n)),o.lastIndex=n.lastIndex,o
    }if(i=Te(n),t){var c=!r;r||(r=a()),u||(u=a());for(var s=r.length;s--;)if(r[s]==n)return u[s];o=i?f(n.length):{}}else o=i?p(n):U({},n);return i&&(me.call(n,"index")&&(o.index=n.index),me.call(n,"input")&&(o.input=n.input)),t?(r.push(n),u.push(o),(i?St:h)(n,function(n,i){o[i]=Z(n,t,e,r,u)}),c&&(l(r),l(u)),o):o}function nt(n){return wt(n)?ke(n):{}}function tt(n,t,e){if(typeof n!="function")return Ut;if(typeof t=="undefined"||!("prototype"in n))return n;var r=n.__bindData__;if(typeof r=="undefined"&&(De.funcNames&&(r=!n.name),r=r||!De.funcDecomp,!r)){var u=ge.call(n);
        De.funcNames||(r=!O.test(u)),r||(r=E.test(u),$e(n,r))}if(false===r||true!==r&&1&r[1])return n;switch(e){case 1:return function(e){return n.call(t,e)};case 2:return function(e,r){return n.call(t,e,r)};case 3:return function(e,r,u){return n.call(t,e,r,u)};case 4:return function(e,r,u,o){return n.call(t,e,r,u,o)}}return Mt(n,t)}function et(n){function t(){var n=f?i:this;if(u){var h=p(u);be.apply(h,arguments)}return(o||c)&&(h||(h=p(arguments)),o&&be.apply(h,o),c&&h.length<a)?(r|=16,et([e,s?r:-4&r,h,null,i,a])):(h||(h=arguments),l&&(e=n[v]),this instanceof t?(n=nt(e.prototype),h=e.apply(n,h),wt(h)?h:n):e.apply(n,h))
    }var e=n[0],r=n[1],u=n[2],o=n[3],i=n[4],a=n[5],f=1&r,l=2&r,c=4&r,s=8&r,v=e;return $e(t,n),t}function rt(e,r){var u=-1,i=st(),a=e?e.length:0,f=a>=b&&i===n,l=[];if(f){var p=o(r);p?(i=t,r=p):f=false}for(;++u<a;)p=e[u],0>i(r,p)&&l.push(p);return f&&c(r),l}function ut(n,t,e,r){r=(r||0)-1;for(var u=n?n.length:0,o=[];++r<u;){var i=n[r];if(i&&typeof i=="object"&&typeof i.length=="number"&&(Te(i)||yt(i))){t||(i=ut(i,t,e));var a=-1,f=i.length,l=o.length;for(o.length+=f;++a<f;)o[l++]=i[a]}else e||o.push(i)}return o
    }function ot(n,t,e,r,u,o){if(e){var i=e(n,t);if(typeof i!="undefined")return!!i}if(n===t)return 0!==n||1/n==1/t;if(n===n&&!(n&&V[typeof n]||t&&V[typeof t]))return false;if(null==n||null==t)return n===t;var f=ce.call(n),c=ce.call(t);if(f==D&&(f=q),c==D&&(c=q),f!=c)return false;switch(f){case T:case F:return+n==+t;case W:return n!=+n?t!=+t:0==n?1/n==1/t:n==+t;case z:case P:return n==oe(t)}if(c=f==$,!c){var p=me.call(n,"__wrapped__"),s=me.call(t,"__wrapped__");if(p||s)return ot(p?n.__wrapped__:n,s?t.__wrapped__:t,e,r,u,o);
        if(f!=q)return false;if(f=n.constructor,p=t.constructor,f!=p&&!(dt(f)&&f instanceof f&&dt(p)&&p instanceof p)&&"constructor"in n&&"constructor"in t)return false}for(f=!u,u||(u=a()),o||(o=a()),p=u.length;p--;)if(u[p]==n)return o[p]==t;var v=0,i=true;if(u.push(n),o.push(t),c){if(p=n.length,v=t.length,(i=v==p)||r)for(;v--;)if(c=p,s=t[v],r)for(;c--&&!(i=ot(n[c],s,e,r,u,o)););else if(!(i=ot(n[v],s,e,r,u,o)))break}else g(t,function(t,a,f){return me.call(f,a)?(v++,i=me.call(n,a)&&ot(n[a],t,e,r,u,o)):void 0}),i&&!r&&g(n,function(n,t,e){return me.call(e,t)?i=-1<--v:void 0
    });return u.pop(),o.pop(),f&&(l(u),l(o)),i}function it(n,t,e,r,u){(Te(t)?St:h)(t,function(t,o){var i,a,f=t,l=n[o];if(t&&((a=Te(t))||Pe(t))){for(f=r.length;f--;)if(i=r[f]==t){l=u[f];break}if(!i){var c;e&&(f=e(l,t),c=typeof f!="undefined")&&(l=f),c||(l=a?Te(l)?l:[]:Pe(l)?l:{}),r.push(t),u.push(l),c||it(l,t,e,r,u)}}else e&&(f=e(l,t),typeof f=="undefined"&&(f=t)),typeof f!="undefined"&&(l=f);n[o]=l})}function at(n,t){return n+he(Re()*(t-n+1))}function ft(e,r,u){var i=-1,f=st(),p=e?e.length:0,s=[],v=!r&&p>=b&&f===n,h=u||v?a():s;
        for(v&&(h=o(h),f=t);++i<p;){var g=e[i],y=u?u(g,i,e):g;(r?!i||h[h.length-1]!==y:0>f(h,y))&&((u||v)&&h.push(y),s.push(g))}return v?(l(h.k),c(h)):u&&l(h),s}function lt(n){return function(t,e,r){var u={};e=J.createCallback(e,r,3),r=-1;var o=t?t.length:0;if(typeof o=="number")for(;++r<o;){var i=t[r];n(u,i,e(i,r,t),t)}else h(t,function(t,r,o){n(u,t,e(t,r,o),o)});return u}}function ct(n,t,e,r,u,o){var i=1&t,a=4&t,f=16&t,l=32&t;if(!(2&t||dt(n)))throw new ie;f&&!e.length&&(t&=-17,f=e=false),l&&!r.length&&(t&=-33,l=r=false);
        var c=n&&n.__bindData__;return c&&true!==c?(c=p(c),c[2]&&(c[2]=p(c[2])),c[3]&&(c[3]=p(c[3])),!i||1&c[1]||(c[4]=u),!i&&1&c[1]&&(t|=8),!a||4&c[1]||(c[5]=o),f&&be.apply(c[2]||(c[2]=[]),e),l&&we.apply(c[3]||(c[3]=[]),r),c[1]|=t,ct.apply(null,c)):(1==t||17===t?X:et)([n,t,e,r,u,o])}function pt(n){return Be[n]}function st(){var t=(t=J.indexOf)===Wt?n:t;return t}function vt(n){return typeof n=="function"&&pe.test(n)}function ht(n){var t,e;return n&&ce.call(n)==q&&(t=n.constructor,!dt(t)||t instanceof t)?(g(n,function(n,t){e=t
    }),typeof e=="undefined"||me.call(n,e)):false}function gt(n){return We[n]}function yt(n){return n&&typeof n=="object"&&typeof n.length=="number"&&ce.call(n)==D||false}function mt(n,t,e){var r=Fe(n),u=r.length;for(t=tt(t,e,3);u--&&(e=r[u],false!==t(n[e],e,n)););return n}function bt(n){var t=[];return g(n,function(n,e){dt(n)&&t.push(e)}),t.sort()}function _t(n){for(var t=-1,e=Fe(n),r=e.length,u={};++t<r;){var o=e[t];u[n[o]]=o}return u}function dt(n){return typeof n=="function"}function wt(n){return!(!n||!V[typeof n])
    }function jt(n){return typeof n=="number"||n&&typeof n=="object"&&ce.call(n)==W||false}function kt(n){return typeof n=="string"||n&&typeof n=="object"&&ce.call(n)==P||false}function xt(n){for(var t=-1,e=Fe(n),r=e.length,u=Xt(r);++t<r;)u[t]=n[e[t]];return u}function Ct(n,t,e){var r=-1,u=st(),o=n?n.length:0,i=false;return e=(0>e?Ie(0,o+e):e)||0,Te(n)?i=-1<u(n,t,e):typeof o=="number"?i=-1<(kt(n)?n.indexOf(t,e):u(n,t,e)):h(n,function(n){return++r<e?void 0:!(i=n===t)}),i}function Ot(n,t,e){var r=true;t=J.createCallback(t,e,3),e=-1;
        var u=n?n.length:0;if(typeof u=="number")for(;++e<u&&(r=!!t(n[e],e,n)););else h(n,function(n,e,u){return r=!!t(n,e,u)});return r}function Nt(n,t,e){var r=[];t=J.createCallback(t,e,3),e=-1;var u=n?n.length:0;if(typeof u=="number")for(;++e<u;){var o=n[e];t(o,e,n)&&r.push(o)}else h(n,function(n,e,u){t(n,e,u)&&r.push(n)});return r}function It(n,t,e){t=J.createCallback(t,e,3),e=-1;var r=n?n.length:0;if(typeof r!="number"){var u;return h(n,function(n,e,r){return t(n,e,r)?(u=n,false):void 0}),u}for(;++e<r;){var o=n[e];
        if(t(o,e,n))return o}}function St(n,t,e){var r=-1,u=n?n.length:0;if(t=t&&typeof e=="undefined"?t:tt(t,e,3),typeof u=="number")for(;++r<u&&false!==t(n[r],r,n););else h(n,t);return n}function Et(n,t,e){var r=n?n.length:0;if(t=t&&typeof e=="undefined"?t:tt(t,e,3),typeof r=="number")for(;r--&&false!==t(n[r],r,n););else{var u=Fe(n),r=u.length;h(n,function(n,e,o){return e=u?u[--r]:--r,t(o[e],e,o)})}return n}function Rt(n,t,e){var r=-1,u=n?n.length:0;if(t=J.createCallback(t,e,3),typeof u=="number")for(var o=Xt(u);++r<u;)o[r]=t(n[r],r,n);
    else o=[],h(n,function(n,e,u){o[++r]=t(n,e,u)});return o}function At(n,t,e){var u=-1/0,o=u;if(typeof t!="function"&&e&&e[t]===n&&(t=null),null==t&&Te(n)){e=-1;for(var i=n.length;++e<i;){var a=n[e];a>o&&(o=a)}}else t=null==t&&kt(n)?r:J.createCallback(t,e,3),St(n,function(n,e,r){e=t(n,e,r),e>u&&(u=e,o=n)});return o}function Dt(n,t,e,r){if(!n)return e;var u=3>arguments.length;t=J.createCallback(t,r,4);var o=-1,i=n.length;if(typeof i=="number")for(u&&(e=n[++o]);++o<i;)e=t(e,n[o],o,n);else h(n,function(n,r,o){e=u?(u=false,n):t(e,n,r,o)
    });return e}function $t(n,t,e,r){var u=3>arguments.length;return t=J.createCallback(t,r,4),Et(n,function(n,r,o){e=u?(u=false,n):t(e,n,r,o)}),e}function Tt(n){var t=-1,e=n?n.length:0,r=Xt(typeof e=="number"?e:0);return St(n,function(n){var e=at(0,++t);r[t]=r[e],r[e]=n}),r}function Ft(n,t,e){var r;t=J.createCallback(t,e,3),e=-1;var u=n?n.length:0;if(typeof u=="number")for(;++e<u&&!(r=t(n[e],e,n)););else h(n,function(n,e,u){return!(r=t(n,e,u))});return!!r}function Bt(n,t,e){var r=0,u=n?n.length:0;if(typeof t!="number"&&null!=t){var o=-1;
        for(t=J.createCallback(t,e,3);++o<u&&t(n[o],o,n);)r++}else if(r=t,null==r||e)return n?n[0]:v;return p(n,0,Se(Ie(0,r),u))}function Wt(t,e,r){if(typeof r=="number"){var u=t?t.length:0;r=0>r?Ie(0,u+r):r||0}else if(r)return r=zt(t,e),t[r]===e?r:-1;return n(t,e,r)}function qt(n,t,e){if(typeof t!="number"&&null!=t){var r=0,u=-1,o=n?n.length:0;for(t=J.createCallback(t,e,3);++u<o&&t(n[u],u,n);)r++}else r=null==t||e?1:Ie(0,t);return p(n,r)}function zt(n,t,e,r){var u=0,o=n?n.length:u;for(e=e?J.createCallback(e,r,1):Ut,t=e(t);u<o;)r=u+o>>>1,e(n[r])<t?u=r+1:o=r;
        return u}function Pt(n,t,e,r){return typeof t!="boolean"&&null!=t&&(r=e,e=typeof t!="function"&&r&&r[t]===n?null:t,t=false),null!=e&&(e=J.createCallback(e,r,3)),ft(n,t,e)}function Kt(){for(var n=1<arguments.length?arguments:arguments[0],t=-1,e=n?At(Ve(n,"length")):0,r=Xt(0>e?0:e);++t<e;)r[t]=Ve(n,t);return r}function Lt(n,t){var e=-1,r=n?n.length:0,u={};for(t||!r||Te(n[0])||(t=[]);++e<r;){var o=n[e];t?u[o]=t[e]:o&&(u[o[0]]=o[1])}return u}function Mt(n,t){return 2<arguments.length?ct(n,17,p(arguments,2),null,t):ct(n,1,null,null,t)
    }function Vt(n,t,e){function r(){c&&ve(c),i=c=p=v,(g||h!==t)&&(s=Ue(),a=n.apply(l,o),c||i||(o=l=null))}function u(){var e=t-(Ue()-f);0<e?c=_e(u,e):(i&&ve(i),e=p,i=c=p=v,e&&(s=Ue(),a=n.apply(l,o),c||i||(o=l=null)))}var o,i,a,f,l,c,p,s=0,h=false,g=true;if(!dt(n))throw new ie;if(t=Ie(0,t)||0,true===e)var y=true,g=false;else wt(e)&&(y=e.leading,h="maxWait"in e&&(Ie(t,e.maxWait)||0),g="trailing"in e?e.trailing:g);return function(){if(o=arguments,f=Ue(),l=this,p=g&&(c||!y),false===h)var e=y&&!c;else{i||y||(s=f);var v=h-(f-s),m=0>=v;
        m?(i&&(i=ve(i)),s=f,a=n.apply(l,o)):i||(i=_e(r,v))}return m&&c?c=ve(c):c||t===h||(c=_e(u,t)),e&&(m=true,a=n.apply(l,o)),!m||c||i||(o=l=null),a}}function Ut(n){return n}function Gt(n,t,e){var r=true,u=t&&bt(t);t&&(e||u.length)||(null==e&&(e=t),o=Q,t=n,n=J,u=bt(t)),false===e?r=false:wt(e)&&"chain"in e&&(r=e.chain);var o=n,i=dt(o);St(u,function(e){var u=n[e]=t[e];i&&(o.prototype[e]=function(){var t=this.__chain__,e=this.__wrapped__,i=[e];if(be.apply(i,arguments),i=u.apply(n,i),r||t){if(e===i&&wt(i))return this;
        i=new o(i),i.__chain__=t}return i})})}function Ht(){}function Jt(n){return function(t){return t[n]}}function Qt(){return this.__wrapped__}e=e?Y.defaults(G.Object(),e,Y.pick(G,A)):G;var Xt=e.Array,Yt=e.Boolean,Zt=e.Date,ne=e.Function,te=e.Math,ee=e.Number,re=e.Object,ue=e.RegExp,oe=e.String,ie=e.TypeError,ae=[],fe=re.prototype,le=e._,ce=fe.toString,pe=ue("^"+oe(ce).replace(/[.*+?^${}()|[\]\\]/g,"\\$&").replace(/toString| for [^\]]+/g,".*?")+"$"),se=te.ceil,ve=e.clearTimeout,he=te.floor,ge=ne.prototype.toString,ye=vt(ye=re.getPrototypeOf)&&ye,me=fe.hasOwnProperty,be=ae.push,_e=e.setTimeout,de=ae.splice,we=ae.unshift,je=function(){try{var n={},t=vt(t=re.defineProperty)&&t,e=t(n,n,n)&&t
    }catch(r){}return e}(),ke=vt(ke=re.create)&&ke,xe=vt(xe=Xt.isArray)&&xe,Ce=e.isFinite,Oe=e.isNaN,Ne=vt(Ne=re.keys)&&Ne,Ie=te.max,Se=te.min,Ee=e.parseInt,Re=te.random,Ae={};Ae[$]=Xt,Ae[T]=Yt,Ae[F]=Zt,Ae[B]=ne,Ae[q]=re,Ae[W]=ee,Ae[z]=ue,Ae[P]=oe,Q.prototype=J.prototype;var De=J.support={};De.funcDecomp=!vt(e.a)&&E.test(s),De.funcNames=typeof ne.name=="string",J.templateSettings={escape:/<%-([\s\S]+?)%>/g,evaluate:/<%([\s\S]+?)%>/g,interpolate:N,variable:"",imports:{_:J}},ke||(nt=function(){function n(){}return function(t){if(wt(t)){n.prototype=t;
        var r=new n;n.prototype=null}return r||e.Object()}}());var $e=je?function(n,t){M.value=t,je(n,"__bindData__",M)}:Ht,Te=xe||function(n){return n&&typeof n=="object"&&typeof n.length=="number"&&ce.call(n)==$||false},Fe=Ne?function(n){return wt(n)?Ne(n):[]}:H,Be={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},We=_t(Be),qe=ue("("+Fe(We).join("|")+")","g"),ze=ue("["+Fe(Be).join("")+"]","g"),Pe=ye?function(n){if(!n||ce.call(n)!=q)return false;var t=n.valueOf,e=vt(t)&&(e=ye(t))&&ye(e);return e?n==e||ye(n)==e:ht(n)
    }:ht,Ke=lt(function(n,t,e){me.call(n,e)?n[e]++:n[e]=1}),Le=lt(function(n,t,e){(me.call(n,e)?n[e]:n[e]=[]).push(t)}),Me=lt(function(n,t,e){n[e]=t}),Ve=Rt,Ue=vt(Ue=Zt.now)&&Ue||function(){return(new Zt).getTime()},Ge=8==Ee(d+"08")?Ee:function(n,t){return Ee(kt(n)?n.replace(I,""):n,t||0)};return J.after=function(n,t){if(!dt(t))throw new ie;return function(){return 1>--n?t.apply(this,arguments):void 0}},J.assign=U,J.at=function(n){for(var t=arguments,e=-1,r=ut(t,true,false,1),t=t[2]&&t[2][t[1]]===n?1:r.length,u=Xt(t);++e<t;)u[e]=n[r[e]];
        return u},J.bind=Mt,J.bindAll=function(n){for(var t=1<arguments.length?ut(arguments,true,false,1):bt(n),e=-1,r=t.length;++e<r;){var u=t[e];n[u]=ct(n[u],1,null,null,n)}return n},J.bindKey=function(n,t){return 2<arguments.length?ct(t,19,p(arguments,2),null,n):ct(t,3,null,null,n)},J.chain=function(n){return n=new Q(n),n.__chain__=true,n},J.compact=function(n){for(var t=-1,e=n?n.length:0,r=[];++t<e;){var u=n[t];u&&r.push(u)}return r},J.compose=function(){for(var n=arguments,t=n.length;t--;)if(!dt(n[t]))throw new ie;
        return function(){for(var t=arguments,e=n.length;e--;)t=[n[e].apply(this,t)];return t[0]}},J.constant=function(n){return function(){return n}},J.countBy=Ke,J.create=function(n,t){var e=nt(n);return t?U(e,t):e},J.createCallback=function(n,t,e){var r=typeof n;if(null==n||"function"==r)return tt(n,t,e);if("object"!=r)return Jt(n);var u=Fe(n),o=u[0],i=n[o];return 1!=u.length||i!==i||wt(i)?function(t){for(var e=u.length,r=false;e--&&(r=ot(t[u[e]],n[u[e]],null,true)););return r}:function(n){return n=n[o],i===n&&(0!==i||1/i==1/n)
    }},J.curry=function(n,t){return t=typeof t=="number"?t:+t||n.length,ct(n,4,null,null,null,t)},J.debounce=Vt,J.defaults=_,J.defer=function(n){if(!dt(n))throw new ie;var t=p(arguments,1);return _e(function(){n.apply(v,t)},1)},J.delay=function(n,t){if(!dt(n))throw new ie;var e=p(arguments,2);return _e(function(){n.apply(v,e)},t)},J.difference=function(n){return rt(n,ut(arguments,true,true,1))},J.filter=Nt,J.flatten=function(n,t,e,r){return typeof t!="boolean"&&null!=t&&(r=e,e=typeof t!="function"&&r&&r[t]===n?null:t,t=false),null!=e&&(n=Rt(n,e,r)),ut(n,t)
    },J.forEach=St,J.forEachRight=Et,J.forIn=g,J.forInRight=function(n,t,e){var r=[];g(n,function(n,t){r.push(t,n)});var u=r.length;for(t=tt(t,e,3);u--&&false!==t(r[u--],r[u],n););return n},J.forOwn=h,J.forOwnRight=mt,J.functions=bt,J.groupBy=Le,J.indexBy=Me,J.initial=function(n,t,e){var r=0,u=n?n.length:0;if(typeof t!="number"&&null!=t){var o=u;for(t=J.createCallback(t,e,3);o--&&t(n[o],o,n);)r++}else r=null==t||e?1:t||r;return p(n,0,Se(Ie(0,u-r),u))},J.intersection=function(){for(var e=[],r=-1,u=arguments.length,i=a(),f=st(),p=f===n,s=a();++r<u;){var v=arguments[r];
        (Te(v)||yt(v))&&(e.push(v),i.push(p&&v.length>=b&&o(r?e[r]:s)))}var p=e[0],h=-1,g=p?p.length:0,y=[];n:for(;++h<g;){var m=i[0],v=p[h];if(0>(m?t(m,v):f(s,v))){for(r=u,(m||s).push(v);--r;)if(m=i[r],0>(m?t(m,v):f(e[r],v)))continue n;y.push(v)}}for(;u--;)(m=i[u])&&c(m);return l(i),l(s),y},J.invert=_t,J.invoke=function(n,t){var e=p(arguments,2),r=-1,u=typeof t=="function",o=n?n.length:0,i=Xt(typeof o=="number"?o:0);return St(n,function(n){i[++r]=(u?t:n[t]).apply(n,e)}),i},J.keys=Fe,J.map=Rt,J.mapValues=function(n,t,e){var r={};
        return t=J.createCallback(t,e,3),h(n,function(n,e,u){r[e]=t(n,e,u)}),r},J.max=At,J.memoize=function(n,t){function e(){var r=e.cache,u=t?t.apply(this,arguments):m+arguments[0];return me.call(r,u)?r[u]:r[u]=n.apply(this,arguments)}if(!dt(n))throw new ie;return e.cache={},e},J.merge=function(n){var t=arguments,e=2;if(!wt(n))return n;if("number"!=typeof t[2]&&(e=t.length),3<e&&"function"==typeof t[e-2])var r=tt(t[--e-1],t[e--],2);else 2<e&&"function"==typeof t[e-1]&&(r=t[--e]);for(var t=p(arguments,1,e),u=-1,o=a(),i=a();++u<e;)it(n,t[u],r,o,i);
        return l(o),l(i),n},J.min=function(n,t,e){var u=1/0,o=u;if(typeof t!="function"&&e&&e[t]===n&&(t=null),null==t&&Te(n)){e=-1;for(var i=n.length;++e<i;){var a=n[e];a<o&&(o=a)}}else t=null==t&&kt(n)?r:J.createCallback(t,e,3),St(n,function(n,e,r){e=t(n,e,r),e<u&&(u=e,o=n)});return o},J.omit=function(n,t,e){var r={};if(typeof t!="function"){var u=[];g(n,function(n,t){u.push(t)});for(var u=rt(u,ut(arguments,true,false,1)),o=-1,i=u.length;++o<i;){var a=u[o];r[a]=n[a]}}else t=J.createCallback(t,e,3),g(n,function(n,e,u){t(n,e,u)||(r[e]=n)
    });return r},J.once=function(n){var t,e;if(!dt(n))throw new ie;return function(){return t?e:(t=true,e=n.apply(this,arguments),n=null,e)}},J.pairs=function(n){for(var t=-1,e=Fe(n),r=e.length,u=Xt(r);++t<r;){var o=e[t];u[t]=[o,n[o]]}return u},J.partial=function(n){return ct(n,16,p(arguments,1))},J.partialRight=function(n){return ct(n,32,null,p(arguments,1))},J.pick=function(n,t,e){var r={};if(typeof t!="function")for(var u=-1,o=ut(arguments,true,false,1),i=wt(n)?o.length:0;++u<i;){var a=o[u];a in n&&(r[a]=n[a])
    }else t=J.createCallback(t,e,3),g(n,function(n,e,u){t(n,e,u)&&(r[e]=n)});return r},J.pluck=Ve,J.property=Jt,J.pull=function(n){for(var t=arguments,e=0,r=t.length,u=n?n.length:0;++e<r;)for(var o=-1,i=t[e];++o<u;)n[o]===i&&(de.call(n,o--,1),u--);return n},J.range=function(n,t,e){n=+n||0,e=typeof e=="number"?e:+e||1,null==t&&(t=n,n=0);var r=-1;t=Ie(0,se((t-n)/(e||1)));for(var u=Xt(t);++r<t;)u[r]=n,n+=e;return u},J.reject=function(n,t,e){return t=J.createCallback(t,e,3),Nt(n,function(n,e,r){return!t(n,e,r)
    })},J.remove=function(n,t,e){var r=-1,u=n?n.length:0,o=[];for(t=J.createCallback(t,e,3);++r<u;)e=n[r],t(e,r,n)&&(o.push(e),de.call(n,r--,1),u--);return o},J.rest=qt,J.shuffle=Tt,J.sortBy=function(n,t,e){var r=-1,o=Te(t),i=n?n.length:0,p=Xt(typeof i=="number"?i:0);for(o||(t=J.createCallback(t,e,3)),St(n,function(n,e,u){var i=p[++r]=f();o?i.m=Rt(t,function(t){return n[t]}):(i.m=a())[0]=t(n,e,u),i.n=r,i.o=n}),i=p.length,p.sort(u);i--;)n=p[i],p[i]=n.o,o||l(n.m),c(n);return p},J.tap=function(n,t){return t(n),n
    },J.throttle=function(n,t,e){var r=true,u=true;if(!dt(n))throw new ie;return false===e?r=false:wt(e)&&(r="leading"in e?e.leading:r,u="trailing"in e?e.trailing:u),L.leading=r,L.maxWait=t,L.trailing=u,Vt(n,t,L)},J.times=function(n,t,e){n=-1<(n=+n)?n:0;var r=-1,u=Xt(n);for(t=tt(t,e,1);++r<n;)u[r]=t(r);return u},J.toArray=function(n){return n&&typeof n.length=="number"?p(n):xt(n)},J.transform=function(n,t,e,r){var u=Te(n);if(null==e)if(u)e=[];else{var o=n&&n.constructor;e=nt(o&&o.prototype)}return t&&(t=J.createCallback(t,r,4),(u?St:h)(n,function(n,r,u){return t(e,n,r,u)
    })),e},J.union=function(){return ft(ut(arguments,true,true))},J.uniq=Pt,J.values=xt,J.where=Nt,J.without=function(n){return rt(n,p(arguments,1))},J.wrap=function(n,t){return ct(t,16,[n])},J.xor=function(){for(var n=-1,t=arguments.length;++n<t;){var e=arguments[n];if(Te(e)||yt(e))var r=r?ft(rt(r,e).concat(rt(e,r))):e}return r||[]},J.zip=Kt,J.zipObject=Lt,J.collect=Rt,J.drop=qt,J.each=St,J.eachRight=Et,J.extend=U,J.methods=bt,J.object=Lt,J.select=Nt,J.tail=qt,J.unique=Pt,J.unzip=Kt,Gt(J),J.clone=function(n,t,e,r){return typeof t!="boolean"&&null!=t&&(r=e,e=t,t=false),Z(n,t,typeof e=="function"&&tt(e,r,1))
    },J.cloneDeep=function(n,t,e){return Z(n,true,typeof t=="function"&&tt(t,e,1))},J.contains=Ct,J.escape=function(n){return null==n?"":oe(n).replace(ze,pt)},J.every=Ot,J.find=It,J.findIndex=function(n,t,e){var r=-1,u=n?n.length:0;for(t=J.createCallback(t,e,3);++r<u;)if(t(n[r],r,n))return r;return-1},J.findKey=function(n,t,e){var r;return t=J.createCallback(t,e,3),h(n,function(n,e,u){return t(n,e,u)?(r=e,false):void 0}),r},J.findLast=function(n,t,e){var r;return t=J.createCallback(t,e,3),Et(n,function(n,e,u){return t(n,e,u)?(r=n,false):void 0
    }),r},J.findLastIndex=function(n,t,e){var r=n?n.length:0;for(t=J.createCallback(t,e,3);r--;)if(t(n[r],r,n))return r;return-1},J.findLastKey=function(n,t,e){var r;return t=J.createCallback(t,e,3),mt(n,function(n,e,u){return t(n,e,u)?(r=e,false):void 0}),r},J.has=function(n,t){return n?me.call(n,t):false},J.identity=Ut,J.indexOf=Wt,J.isArguments=yt,J.isArray=Te,J.isBoolean=function(n){return true===n||false===n||n&&typeof n=="object"&&ce.call(n)==T||false},J.isDate=function(n){return n&&typeof n=="object"&&ce.call(n)==F||false
    },J.isElement=function(n){return n&&1===n.nodeType||false},J.isEmpty=function(n){var t=true;if(!n)return t;var e=ce.call(n),r=n.length;return e==$||e==P||e==D||e==q&&typeof r=="number"&&dt(n.splice)?!r:(h(n,function(){return t=false}),t)},J.isEqual=function(n,t,e,r){return ot(n,t,typeof e=="function"&&tt(e,r,2))},J.isFinite=function(n){return Ce(n)&&!Oe(parseFloat(n))},J.isFunction=dt,J.isNaN=function(n){return jt(n)&&n!=+n},J.isNull=function(n){return null===n},J.isNumber=jt,J.isObject=wt,J.isPlainObject=Pe,J.isRegExp=function(n){return n&&typeof n=="object"&&ce.call(n)==z||false
    },J.isString=kt,J.isUndefined=function(n){return typeof n=="undefined"},J.lastIndexOf=function(n,t,e){var r=n?n.length:0;for(typeof e=="number"&&(r=(0>e?Ie(0,r+e):Se(e,r-1))+1);r--;)if(n[r]===t)return r;return-1},J.mixin=Gt,J.noConflict=function(){return e._=le,this},J.noop=Ht,J.now=Ue,J.parseInt=Ge,J.random=function(n,t,e){var r=null==n,u=null==t;return null==e&&(typeof n=="boolean"&&u?(e=n,n=1):u||typeof t!="boolean"||(e=t,u=true)),r&&u&&(t=1),n=+n||0,u?(t=n,n=0):t=+t||0,e||n%1||t%1?(e=Re(),Se(n+e*(t-n+parseFloat("1e-"+((e+"").length-1))),t)):at(n,t)
    },J.reduce=Dt,J.reduceRight=$t,J.result=function(n,t){if(n){var e=n[t];return dt(e)?n[t]():e}},J.runInContext=s,J.size=function(n){var t=n?n.length:0;return typeof t=="number"?t:Fe(n).length},J.some=Ft,J.sortedIndex=zt,J.template=function(n,t,e){var r=J.templateSettings;n=oe(n||""),e=_({},e,r);var u,o=_({},e.imports,r.imports),r=Fe(o),o=xt(o),a=0,f=e.interpolate||S,l="__p+='",f=ue((e.escape||S).source+"|"+f.source+"|"+(f===N?x:S).source+"|"+(e.evaluate||S).source+"|$","g");n.replace(f,function(t,e,r,o,f,c){return r||(r=o),l+=n.slice(a,c).replace(R,i),e&&(l+="'+__e("+e+")+'"),f&&(u=true,l+="';"+f+";\n__p+='"),r&&(l+="'+((__t=("+r+"))==null?'':__t)+'"),a=c+t.length,t
    }),l+="';",f=e=e.variable,f||(e="obj",l="with("+e+"){"+l+"}"),l=(u?l.replace(w,""):l).replace(j,"$1").replace(k,"$1;"),l="function("+e+"){"+(f?"":e+"||("+e+"={});")+"var __t,__p='',__e=_.escape"+(u?",__j=Array.prototype.join;function print(){__p+=__j.call(arguments,'')}":";")+l+"return __p}";try{var c=ne(r,"return "+l).apply(v,o)}catch(p){throw p.source=l,p}return t?c(t):(c.source=l,c)},J.unescape=function(n){return null==n?"":oe(n).replace(qe,gt)},J.uniqueId=function(n){var t=++y;return oe(null==n?"":n)+t
    },J.all=Ot,J.any=Ft,J.detect=It,J.findWhere=It,J.foldl=Dt,J.foldr=$t,J.include=Ct,J.inject=Dt,Gt(function(){var n={};return h(J,function(t,e){J.prototype[e]||(n[e]=t)}),n}(),false),J.first=Bt,J.last=function(n,t,e){var r=0,u=n?n.length:0;if(typeof t!="number"&&null!=t){var o=u;for(t=J.createCallback(t,e,3);o--&&t(n[o],o,n);)r++}else if(r=t,null==r||e)return n?n[u-1]:v;return p(n,Ie(0,u-r))},J.sample=function(n,t,e){return n&&typeof n.length!="number"&&(n=xt(n)),null==t||e?n?n[at(0,n.length-1)]:v:(n=Tt(n),n.length=Se(Ie(0,t),n.length),n)
    },J.take=Bt,J.head=Bt,h(J,function(n,t){var e="sample"!==t;J.prototype[t]||(J.prototype[t]=function(t,r){var u=this.__chain__,o=n(this.__wrapped__,t,r);return u||null!=t&&(!r||e&&typeof t=="function")?new Q(o,u):o})}),J.VERSION="2.4.1",J.prototype.chain=function(){return this.__chain__=true,this},J.prototype.toString=function(){return oe(this.__wrapped__)},J.prototype.value=Qt,J.prototype.valueOf=Qt,St(["join","pop","shift"],function(n){var t=ae[n];J.prototype[n]=function(){var n=this.__chain__,e=t.apply(this.__wrapped__,arguments);
        return n?new Q(e,n):e}}),St(["push","reverse","sort","unshift"],function(n){var t=ae[n];J.prototype[n]=function(){return t.apply(this.__wrapped__,arguments),this}}),St(["concat","slice","splice"],function(n){var t=ae[n];J.prototype[n]=function(){return new Q(t.apply(this.__wrapped__,arguments),this.__chain__)}}),J}var v,h=[],g=[],y=0,m=+new Date+"",b=75,_=40,d=" \t\x0B\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000",w=/\b__p\+='';/g,j=/\b(__p\+=)''\+/g,k=/(__e\(.*?\)|\b__t\))\+'';/g,x=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,C=/\w*$/,O=/^\s*function[ \n\r\t]+\w/,N=/<%=([\s\S]+?)%>/g,I=RegExp("^["+d+"]*0+(?=.$)"),S=/($^)/,E=/\bthis\b/,R=/['\n\r\t\u2028\u2029\\]/g,A="Array Boolean Date Function Math Number Object RegExp String _ attachEvent clearTimeout isFinite isNaN parseInt setTimeout".split(" "),D="[object Arguments]",$="[object Array]",T="[object Boolean]",F="[object Date]",B="[object Function]",W="[object Number]",q="[object Object]",z="[object RegExp]",P="[object String]",K={};
        K[B]=false,K[D]=K[$]=K[T]=K[F]=K[W]=K[q]=K[z]=K[P]=true;var L={leading:false,maxWait:0,trailing:false},M={configurable:false,enumerable:false,value:null,writable:false},V={"boolean":false,"function":true,object:true,number:false,string:false,undefined:false},U={"\\":"\\","'":"'","\n":"n","\r":"r","\t":"t","\u2028":"u2028","\u2029":"u2029"},G=V[typeof window]&&window||this,H=V[typeof exports]&&exports&&!exports.nodeType&&exports,J=V[typeof module]&&module&&!module.nodeType&&module,Q=J&&J.exports===H&&H,X=V[typeof global]&&global;!X||X.global!==X&&X.window!==X||(G=X);
        var Y=s();typeof define=="function"&&typeof define.amd=="object"&&define.amd?(G._=Y, define(function(){return Y})):H&&J?Q?(J.exports=Y)._=Y:H._=Y:G._=Y}).call(this);


    return new Tracer();

}());


/**
 * Instrumented code
 */

var TSObject = function () {
        __recognizer4597791.logEntry([
            1,
            16,
            1,
            24
        ], arguments);
        function TSObject() {
            __recognizer4597791.logEntry([
                2,
                13,
                2,
                21
            ], arguments);
        }
        TSObject.prototype.equals = function (obj) {
            __recognizer4597791.logEntry([
                4,
                32,
                4,
                40
            ], arguments);
            return __recognizer4597791.logProbe([
                5,
                15,
                5,
                19
            ], this) === __recognizer4597791.logProbe([
                5,
                24,
                5,
                27
            ], obj);
        };
        TSObject.exists = function (obj) {
            __recognizer4597791.logEntry([
                8,
                22,
                8,
                30
            ], arguments);
            return __recognizer4597791.logProbe([
                9,
                16,
                9,
                19
            ], obj) !== null && __recognizer4597791.logProbe([
                9,
                32,
                9,
                35
            ], obj) !== __recognizer4597791.logProbe([
                9,
                40,
                9,
                49
            ], undefined);
        };
        TSObject.prototype.toString = function () {
            __recognizer4597791.logEntry([
                12,
                34,
                12,
                42
            ], arguments);
            return '';
        };
        return __recognizer4597791.logProbe([
            15,
            11,
            15,
            19
        ], TSObject);
    }();
var NumberHelper = function () {
        __recognizer4597791.logEntry([
            17,
            20,
            17,
            28
        ], arguments);
        function NumberHelper() {
            __recognizer4597791.logEntry([
                18,
                13,
                18,
                25
            ], arguments);
        }
        NumberHelper.parseString = function (s) {
            __recognizer4597791.logEntry([
                20,
                31,
                20,
                39
            ], arguments);
            var n = +__recognizer4597791.logProbe([
                    21,
                    17,
                    21,
                    18
                ], s);
            return __recognizer4597791.logProbe([
                22,
                15,
                22,
                16
            ], n);
        };
        NumberHelper.toString = function (n) {
            __recognizer4597791.logEntry([
                25,
                28,
                25,
                36
            ], arguments);
            var o = n;
            return function () {
                var obj = __recognizer4597791.logProbe([
                        27,
                        15,
                        27,
                        16
                    ], o), fn = __recognizer4597791.logProbe([
                        27,
                        17,
                        27,
                        25
                    ], obj.toString);
                return fn.apply(obj, arguments);
            }.bind(this)();
        };
        return __recognizer4597791.logProbe([
            29,
            11,
            29,
            23
        ], NumberHelper);
    }();
var __extends = __recognizer4597791.logProbe([
        31,
        21,
        31,
        30
    ], __recognizer4597791.logProbe([
        31,
        16,
        31,
        20
    ], this).__extends) || function (d, b) {
        __recognizer4597791.logEntry([
            31,
            34,
            31,
            42
        ], arguments);
        for (var p in __recognizer4597791.logProbe([
                32,
                18,
                32,
                19
            ], b))
            if (function () {
                    var obj = __recognizer4597791.logProbe([
                            32,
                            25,
                            32,
                            26
                        ], b), fn = __recognizer4597791.logProbe([
                            32,
                            27,
                            32,
                            41
                        ], obj.hasOwnProperty);
                    return fn.apply(obj, arguments);
                }.bind(this)(__recognizer4597791.logProbe([
                    32,
                    42,
                    32,
                    43
                ], p)))
                d[p] = __recognizer4597791.logProbe([
                    32,
                    55,
                    32,
                    56
                ], __recognizer4597791.logProbe([
                    32,
                    53,
                    32,
                    54
                ], b)[p]);
        function __() {
            __recognizer4597791.logEntry([
                33,
                13,
                33,
                15
            ], arguments);
            this.constructor = __recognizer4597791.logProbe([
                33,
                39,
                33,
                40
            ], d);
        }
        __.prototype = __recognizer4597791.logProbe([
            34,
            21,
            34,
            30
        ], __recognizer4597791.logProbe([
            34,
            19,
            34,
            20
        ], b).prototype);
        d.prototype = new (__recognizer4597791.logProbe([
            35,
            22,
            35,
            24
        ], __))();
    };
var Timer = function (_super) {
        __recognizer4597791.logEntry([
            38,
            13,
            38,
            21
        ], arguments);
        __recognizer4597791.logProbe([
            39,
            4,
            39,
            28
        ], __recognizer4597791.logProbe([
            39,
            4,
            39,
            13
        ], __extends)(__recognizer4597791.logProbe([
            39,
            14,
            39,
            19
        ], Timer), __recognizer4597791.logProbe([
            39,
            21,
            39,
            27
        ], _super)));
        function Timer(handler, delay, argument, frequency) {
            __recognizer4597791.logEntry([
                40,
                13,
                40,
                18
            ], arguments);
            if (typeof __recognizer4597791.logProbe([
                    41,
                    19,
                    41,
                    27
                ], argument) === 'undefined') {
                argument = null;
            }
            if (typeof __recognizer4597791.logProbe([
                    42,
                    19,
                    42,
                    28
                ], frequency) === 'undefined') {
                frequency = -1;
            }
            var _this = __recognizer4597791.logProbe([
                    43,
                    20,
                    43,
                    24
                ], this);
            (function () {
                var obj = __recognizer4597791.logProbe([
                        44,
                        8,
                        44,
                        14
                    ], _super), fn = __recognizer4597791.logProbe([
                        44,
                        15,
                        44,
                        19
                    ], obj.call);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                44,
                20,
                44,
                24
            ], this)));
            if (__recognizer4597791.logProbe([
                    46,
                    12,
                    46,
                    21
                ], frequency) > 0) {
                this._hasIntervals = true;
                __recognizer4597791.logProbe([
                    48,
                    12,
                    52,
                    21
                ], __recognizer4597791.logProbe([
                    48,
                    12,
                    48,
                    22
                ], setTimeout)(function () {
                    __recognizer4597791.logEntry([
                        48,
                        23,
                        48,
                        31
                    ], arguments);
                    _this._timer = __recognizer4597791.logProbe([
                        49,
                        31,
                        51,
                        29
                    ], __recognizer4597791.logProbe([
                        49,
                        31,
                        49,
                        42
                    ], setInterval)(function () {
                        __recognizer4597791.logEntry([
                            49,
                            43,
                            49,
                            51
                        ], arguments);
                        __recognizer4597791.logProbe([
                            50,
                            20,
                            50,
                            37
                        ], __recognizer4597791.logProbe([
                            50,
                            20,
                            50,
                            27
                        ], handler)(__recognizer4597791.logProbe([
                            50,
                            28,
                            50,
                            36
                        ], argument)));
                    }, __recognizer4597791.logProbe([
                        51,
                        19,
                        51,
                        28
                    ], frequency)));
                }, __recognizer4597791.logProbe([
                    52,
                    15,
                    52,
                    20
                ], delay)));
            } else {
                this._hasIntervals = false;
                this._timer = __recognizer4597791.logProbe([
                    55,
                    26,
                    57,
                    21
                ], __recognizer4597791.logProbe([
                    55,
                    26,
                    55,
                    36
                ], setTimeout)(function () {
                    __recognizer4597791.logEntry([
                        55,
                        37,
                        55,
                        45
                    ], arguments);
                    __recognizer4597791.logProbe([
                        56,
                        16,
                        56,
                        33
                    ], __recognizer4597791.logProbe([
                        56,
                        16,
                        56,
                        23
                    ], handler)(__recognizer4597791.logProbe([
                        56,
                        24,
                        56,
                        32
                    ], argument)));
                }, __recognizer4597791.logProbe([
                    57,
                    15,
                    57,
                    20
                ], delay)));
            }
        }
        Timer.prototype.clear = function () {
            __recognizer4597791.logEntry([
                60,
                28,
                60,
                36
            ], arguments);
            if (__recognizer4597791.logProbe([
                    61,
                    17,
                    61,
                    30
                ], __recognizer4597791.logProbe([
                    61,
                    12,
                    61,
                    16
                ], this)._hasIntervals)) {
                __recognizer4597791.logProbe([
                    62,
                    12,
                    62,
                    38
                ], __recognizer4597791.logProbe([
                    62,
                    12,
                    62,
                    25
                ], clearInterval)(__recognizer4597791.logProbe([
                    62,
                    31,
                    62,
                    37
                ], __recognizer4597791.logProbe([
                    62,
                    26,
                    62,
                    30
                ], this)._timer)));
            } else {
                __recognizer4597791.logProbe([
                    64,
                    12,
                    64,
                    37
                ], __recognizer4597791.logProbe([
                    64,
                    12,
                    64,
                    24
                ], clearTimeout)(__recognizer4597791.logProbe([
                    64,
                    30,
                    64,
                    36
                ], __recognizer4597791.logProbe([
                    64,
                    25,
                    64,
                    29
                ], this)._timer)));
            }
        };
        return __recognizer4597791.logProbe([
            67,
            11,
            67,
            16
        ], Timer);
    }(__recognizer4597791.logProbe([
        68,
        3,
        68,
        11
    ], TSObject));
var Exception = function (_super) {
        __recognizer4597791.logEntry([
            69,
            17,
            69,
            25
        ], arguments);
        __recognizer4597791.logProbe([
            70,
            4,
            70,
            32
        ], __recognizer4597791.logProbe([
            70,
            4,
            70,
            13
        ], __extends)(__recognizer4597791.logProbe([
            70,
            14,
            70,
            23
        ], Exception), __recognizer4597791.logProbe([
            70,
            25,
            70,
            31
        ], _super)));
        function Exception(msg, name) {
            __recognizer4597791.logEntry([
                71,
                13,
                71,
                22
            ], arguments);
            if (typeof __recognizer4597791.logProbe([
                    72,
                    19,
                    72,
                    23
                ], name) === 'undefined') {
                name = 'Exception';
            }
            (function () {
                var obj = __recognizer4597791.logProbe([
                        73,
                        8,
                        73,
                        14
                    ], _super), fn = __recognizer4597791.logProbe([
                        73,
                        15,
                        73,
                        19
                    ], obj.call);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                73,
                20,
                73,
                24
            ], this)));
            this._error = new (__recognizer4597791.logProbe([
                75,
                26,
                75,
                31
            ], Error))(__recognizer4597791.logProbe([
                75,
                32,
                75,
                35
            ], msg));
            this._error.name = __recognizer4597791.logProbe([
                76,
                27,
                76,
                31
            ], name);
        }
        Exception.prototype.getMessage = function () {
            __recognizer4597791.logEntry([
                78,
                37,
                78,
                45
            ], arguments);
            return __recognizer4597791.logProbe([
                79,
                27,
                79,
                34
            ], __recognizer4597791.logProbe([
                79,
                20,
                79,
                26
            ], __recognizer4597791.logProbe([
                79,
                15,
                79,
                19
            ], this)._error).message);
        };
        Exception.prototype.getName = function () {
            __recognizer4597791.logEntry([
                82,
                34,
                82,
                42
            ], arguments);
            return __recognizer4597791.logProbe([
                83,
                27,
                83,
                31
            ], __recognizer4597791.logProbe([
                83,
                20,
                83,
                26
            ], __recognizer4597791.logProbe([
                83,
                15,
                83,
                19
            ], this)._error).name);
        };
        Exception.prototype.getStackTrace = function () {
            __recognizer4597791.logEntry([
                86,
                40,
                86,
                48
            ], arguments);
            return __recognizer4597791.logProbe([
                87,
                27,
                87,
                32
            ], __recognizer4597791.logProbe([
                87,
                20,
                87,
                26
            ], __recognizer4597791.logProbe([
                87,
                15,
                87,
                19
            ], this)._error).stack);
        };
        Exception.prototype.toString = function () {
            __recognizer4597791.logEntry([
                90,
                35,
                90,
                43
            ], arguments);
            return __recognizer4597791.logProbe([
                91,
                27,
                91,
                31
            ], __recognizer4597791.logProbe([
                91,
                20,
                91,
                26
            ], __recognizer4597791.logProbe([
                91,
                15,
                91,
                19
            ], this)._error).name) + ': ' + __recognizer4597791.logProbe([
                91,
                53,
                91,
                60
            ], __recognizer4597791.logProbe([
                91,
                46,
                91,
                52
            ], __recognizer4597791.logProbe([
                91,
                41,
                91,
                45
            ], this)._error).message);
        };
        return __recognizer4597791.logProbe([
            93,
            11,
            93,
            20
        ], Exception);
    }(__recognizer4597791.logProbe([
        94,
        3,
        94,
        11
    ], TSObject));
var DOMElementEvents = function () {
        __recognizer4597791.logEntry([
            95,
            24,
            95,
            32
        ], arguments);
        function DOMElementEvents() {
            __recognizer4597791.logEntry([
                96,
                13,
                96,
                29
            ], arguments);
        }
        DOMElementEvents.Blur = 'blur';
        DOMElementEvents.Click = 'click';
        DOMElementEvents.KeyDown = 'keydown';
        DOMElementEvents.Submit = 'submit';
        return __recognizer4597791.logProbe([
            102,
            11,
            102,
            27
        ], DOMElementEvents);
    }();
var DOMElementEventObject = function (_super) {
        __recognizer4597791.logEntry([
            105,
            29,
            105,
            37
        ], arguments);
        __recognizer4597791.logProbe([
            106,
            4,
            106,
            44
        ], __recognizer4597791.logProbe([
            106,
            4,
            106,
            13
        ], __extends)(__recognizer4597791.logProbe([
            106,
            14,
            106,
            35
        ], DOMElementEventObject), __recognizer4597791.logProbe([
            106,
            37,
            106,
            43
        ], _super)));
        function DOMElementEventObject(eventObject) {
            __recognizer4597791.logEntry([
                107,
                13,
                107,
                34
            ], arguments);
            (function () {
                var obj = __recognizer4597791.logProbe([
                        108,
                        8,
                        108,
                        14
                    ], _super), fn = __recognizer4597791.logProbe([
                        108,
                        15,
                        108,
                        19
                    ], obj.call);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                108,
                20,
                108,
                24
            ], this)));
            this._eventObject = __recognizer4597791.logProbe([
                110,
                28,
                110,
                39
            ], eventObject);
            this._target = function () {
                var obj = __recognizer4597791.logProbe([
                        111,
                        23,
                        111,
                        33
                    ], DOMElement), fn = __recognizer4597791.logProbe([
                        111,
                        34,
                        111,
                        40
                    ], obj.fromJS);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                111,
                53,
                111,
                59
            ], __recognizer4597791.logProbe([
                111,
                41,
                111,
                52
            ], eventObject).target));
            this._pageX = __recognizer4597791.logProbe([
                112,
                34,
                112,
                39
            ], __recognizer4597791.logProbe([
                112,
                22,
                112,
                33
            ], eventObject).pageX);
            this._pageY = __recognizer4597791.logProbe([
                113,
                34,
                113,
                39
            ], __recognizer4597791.logProbe([
                113,
                22,
                113,
                33
            ], eventObject).pageY);
            this._which = __recognizer4597791.logProbe([
                114,
                34,
                114,
                39
            ], __recognizer4597791.logProbe([
                114,
                22,
                114,
                33
            ], eventObject).which);
        }
        DOMElementEventObject.prototype.getTarget = function () {
            __recognizer4597791.logEntry([
                116,
                48,
                116,
                56
            ], arguments);
            return __recognizer4597791.logProbe([
                117,
                20,
                117,
                27
            ], __recognizer4597791.logProbe([
                117,
                15,
                117,
                19
            ], this)._target);
        };
        DOMElementEventObject.prototype.getPageX = function () {
            __recognizer4597791.logEntry([
                120,
                47,
                120,
                55
            ], arguments);
            return __recognizer4597791.logProbe([
                121,
                20,
                121,
                26
            ], __recognizer4597791.logProbe([
                121,
                15,
                121,
                19
            ], this)._pageX);
        };
        DOMElementEventObject.prototype.getPageY = function () {
            __recognizer4597791.logEntry([
                124,
                47,
                124,
                55
            ], arguments);
            return __recognizer4597791.logProbe([
                125,
                20,
                125,
                26
            ], __recognizer4597791.logProbe([
                125,
                15,
                125,
                19
            ], this)._pageY);
        };
        DOMElementEventObject.prototype.getWhich = function () {
            __recognizer4597791.logEntry([
                128,
                47,
                128,
                55
            ], arguments);
            return __recognizer4597791.logProbe([
                129,
                20,
                129,
                26
            ], __recognizer4597791.logProbe([
                129,
                15,
                129,
                19
            ], this)._which);
        };
        DOMElementEventObject.prototype.preventDefault = function () {
            __recognizer4597791.logEntry([
                132,
                53,
                132,
                61
            ], arguments);
            (function () {
                var obj = __recognizer4597791.logProbe([
                        133,
                        13,
                        133,
                        25
                    ], __recognizer4597791.logProbe([
                        133,
                        8,
                        133,
                        12
                    ], this)._eventObject), fn = __recognizer4597791.logProbe([
                        133,
                        26,
                        133,
                        40
                    ], obj.preventDefault);
                return fn.apply(obj, arguments);
            }.bind(this)());
        };
        return __recognizer4597791.logProbe([
            135,
            11,
            135,
            32
        ], DOMElementEventObject);
    }(__recognizer4597791.logProbe([
        136,
        3,
        136,
        11
    ], TSObject));
var DOMElementException = function (_super) {
        __recognizer4597791.logEntry([
            138,
            27,
            138,
            35
        ], arguments);
        __recognizer4597791.logProbe([
            139,
            4,
            139,
            42
        ], __recognizer4597791.logProbe([
            139,
            4,
            139,
            13
        ], __extends)(__recognizer4597791.logProbe([
            139,
            14,
            139,
            33
        ], DOMElementException), __recognizer4597791.logProbe([
            139,
            35,
            139,
            41
        ], _super)));
        function DOMElementException() {
            __recognizer4597791.logEntry([
                140,
                13,
                140,
                32
            ], arguments);
            (function () {
                var obj = __recognizer4597791.logProbe([
                        141,
                        8,
                        141,
                        14
                    ], _super), fn = __recognizer4597791.logProbe([
                        141,
                        15,
                        141,
                        20
                    ], obj.apply);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                141,
                21,
                141,
                25
            ], this), __recognizer4597791.logProbe([
                141,
                27,
                141,
                36
            ], arguments)));
        }
        return __recognizer4597791.logProbe([
            143,
            11,
            143,
            30
        ], DOMElementException);
    }(__recognizer4597791.logProbe([
        144,
        3,
        144,
        12
    ], Exception));
var DOMElement = function (_super) {
        __recognizer4597791.logEntry([
            146,
            18,
            146,
            26
        ], arguments);
        __recognizer4597791.logProbe([
            147,
            4,
            147,
            33
        ], __recognizer4597791.logProbe([
            147,
            4,
            147,
            13
        ], __extends)(__recognizer4597791.logProbe([
            147,
            14,
            147,
            24
        ], DOMElement), __recognizer4597791.logProbe([
            147,
            26,
            147,
            32
        ], _super)));
        function DOMElement(jQueryObject) {
            __recognizer4597791.logEntry([
                148,
                13,
                148,
                23
            ], arguments);
            (function () {
                var obj = __recognizer4597791.logProbe([
                        149,
                        8,
                        149,
                        14
                    ], _super), fn = __recognizer4597791.logProbe([
                        149,
                        15,
                        149,
                        19
                    ], obj.call);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                149,
                20,
                149,
                24
            ], this)));
            this._element = __recognizer4597791.logProbe([
                151,
                24,
                151,
                36
            ], jQueryObject);
        }
        DOMElement.prototype.addClass = function (value) {
            __recognizer4597791.logEntry([
                153,
                36,
                153,
                44
            ], arguments);
            (function () {
                var obj = __recognizer4597791.logProbe([
                        154,
                        13,
                        154,
                        21
                    ], __recognizer4597791.logProbe([
                        154,
                        8,
                        154,
                        12
                    ], this)._element), fn = __recognizer4597791.logProbe([
                        154,
                        22,
                        154,
                        30
                    ], obj.addClass);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                154,
                31,
                154,
                36
            ], value)));
        };
        DOMElement.prototype.animate = function (prop, duration, callback) {
            __recognizer4597791.logEntry([
                157,
                35,
                157,
                43
            ], arguments);
            var _this = __recognizer4597791.logProbe([
                    158,
                    20,
                    158,
                    24
                ], this);
            if (typeof __recognizer4597791.logProbe([
                    159,
                    19,
                    159,
                    27
                ], callback) === 'undefined') {
                callback = null;
            }
            (function () {
                var obj = __recognizer4597791.logProbe([
                        160,
                        13,
                        160,
                        21
                    ], __recognizer4597791.logProbe([
                        160,
                        8,
                        160,
                        12
                    ], this)._element), fn = __recognizer4597791.logProbe([
                        160,
                        22,
                        160,
                        29
                    ], obj.animate);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                160,
                30,
                160,
                34
            ], prop), __recognizer4597791.logProbe([
                160,
                36,
                160,
                44
            ], duration), function () {
                __recognizer4597791.logEntry([
                    160,
                    46,
                    160,
                    54
                ], arguments);
                if (__recognizer4597791.logProbe([
                        161,
                        16,
                        161,
                        24
                    ], callback) != null) {
                    __recognizer4597791.logProbe([
                        162,
                        16,
                        162,
                        31
                    ], __recognizer4597791.logProbe([
                        162,
                        16,
                        162,
                        24
                    ], callback)(__recognizer4597791.logProbe([
                        162,
                        25,
                        162,
                        30
                    ], _this)));
                }
            }));
        };
        DOMElement.prototype.append = function (e) {
            __recognizer4597791.logEntry([
                167,
                34,
                167,
                42
            ], arguments);
            (function () {
                var obj = __recognizer4597791.logProbe([
                        168,
                        13,
                        168,
                        21
                    ], __recognizer4597791.logProbe([
                        168,
                        8,
                        168,
                        12
                    ], this)._element), fn = __recognizer4597791.logProbe([
                        168,
                        22,
                        168,
                        28
                    ], obj.append);
                return fn.apply(obj, arguments);
            }.bind(this)(function () {
                var obj = __recognizer4597791.logProbe([
                        168,
                        29,
                        168,
                        30
                    ], e), fn = __recognizer4597791.logProbe([
                        168,
                        31,
                        168,
                        39
                    ], obj.toJQuery);
                return fn.apply(obj, arguments);
            }.bind(this)()));
            return __recognizer4597791.logProbe([
                169,
                15,
                169,
                19
            ], this);
        };
        DOMElement.prototype.centerize = function (reference) {
            __recognizer4597791.logEntry([
                172,
                37,
                172,
                45
            ], arguments);
            if (typeof __recognizer4597791.logProbe([
                    173,
                    19,
                    173,
                    28
                ], reference) === 'undefined') {
                reference = new (__recognizer4597791.logProbe([
                    173,
                    64,
                    173,
                    74
                ], DOMElement))(__recognizer4597791.logProbe([
                    173,
                    75,
                    173,
                    84
                ], __recognizer4597791.logProbe([
                    173,
                    75,
                    173,
                    76
                ], $)('body')));
            }
            (function () {
                var obj = __recognizer4597791.logProbe([
                        174,
                        8,
                        174,
                        12
                    ], this), fn = __recognizer4597791.logProbe([
                        174,
                        13,
                        174,
                        32
                    ], obj.horizontalCenterize);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                174,
                33,
                174,
                42
            ], reference)));
            (function () {
                var obj = __recognizer4597791.logProbe([
                        175,
                        8,
                        175,
                        12
                    ], this), fn = __recognizer4597791.logProbe([
                        175,
                        13,
                        175,
                        30
                    ], obj.verticalCenterize);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                175,
                31,
                175,
                40
            ], reference)));
        };
        DOMElement.prototype.centerizeWithMargin = function (reference) {
            __recognizer4597791.logEntry([
                178,
                47,
                178,
                55
            ], arguments);
            if (typeof __recognizer4597791.logProbe([
                    179,
                    19,
                    179,
                    28
                ], reference) === 'undefined') {
                reference = new (__recognizer4597791.logProbe([
                    179,
                    64,
                    179,
                    74
                ], DOMElement))(__recognizer4597791.logProbe([
                    179,
                    75,
                    179,
                    84
                ], __recognizer4597791.logProbe([
                    179,
                    75,
                    179,
                    76
                ], $)('body')));
            }
            (function () {
                var obj = __recognizer4597791.logProbe([
                        180,
                        8,
                        180,
                        12
                    ], this), fn = __recognizer4597791.logProbe([
                        180,
                        13,
                        180,
                        42
                    ], obj.horizontalCenterizeWithMargin);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                180,
                43,
                180,
                52
            ], reference)));
            (function () {
                var obj = __recognizer4597791.logProbe([
                        181,
                        8,
                        181,
                        12
                    ], this), fn = __recognizer4597791.logProbe([
                        181,
                        13,
                        181,
                        40
                    ], obj.verticalCenterizeWithMargin);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                181,
                41,
                181,
                50
            ], reference)));
        };
        DOMElement.prototype.find = function (criterion) {
            __recognizer4597791.logEntry([
                184,
                32,
                184,
                40
            ], arguments);
            var results = function () {
                    var obj = __recognizer4597791.logProbe([
                            185,
                            27,
                            185,
                            35
                        ], __recognizer4597791.logProbe([
                            185,
                            22,
                            185,
                            26
                        ], this)._element), fn = __recognizer4597791.logProbe([
                            185,
                            36,
                            185,
                            40
                        ], obj.find);
                    return fn.apply(obj, arguments);
                }.bind(this)(__recognizer4597791.logProbe([
                    185,
                    41,
                    185,
                    50
                ], criterion));
            var list = new (__recognizer4597791.logProbe([
                    186,
                    23,
                    186,
                    32
                ], ArrayList))();
            (function () {
                var obj = __recognizer4597791.logProbe([
                        188,
                        8,
                        188,
                        15
                    ], results), fn = __recognizer4597791.logProbe([
                        188,
                        16,
                        188,
                        20
                    ], obj.each);
                return fn.apply(obj, arguments);
            }.bind(this)(function (i, e) {
                __recognizer4597791.logEntry([
                    188,
                    21,
                    188,
                    29
                ], arguments);
                (function () {
                    var obj = __recognizer4597791.logProbe([
                            189,
                            12,
                            189,
                            16
                        ], list), fn = __recognizer4597791.logProbe([
                            189,
                            17,
                            189,
                            20
                        ], obj.add);
                    return fn.apply(obj, arguments);
                }.bind(this)(function () {
                    var obj = __recognizer4597791.logProbe([
                            189,
                            21,
                            189,
                            31
                        ], DOMElement), fn = __recognizer4597791.logProbe([
                            189,
                            32,
                            189,
                            38
                        ], obj.fromJS);
                    return fn.apply(obj, arguments);
                }.bind(this)(__recognizer4597791.logProbe([
                    189,
                    39,
                    189,
                    40
                ], e))));
            }));
            return __recognizer4597791.logProbe([
                192,
                15,
                192,
                19
            ], list);
        };
        DOMElement.prototype.findSingle = function (criterion) {
            __recognizer4597791.logEntry([
                195,
                38,
                195,
                46
            ], arguments);
            return new (__recognizer4597791.logProbe([
                196,
                19,
                196,
                29
            ], DOMElement))(function () {
                var obj = function () {
                        var obj = __recognizer4597791.logProbe([
                                196,
                                35,
                                196,
                                43
                            ], __recognizer4597791.logProbe([
                                196,
                                30,
                                196,
                                34
                            ], this)._element), fn = __recognizer4597791.logProbe([
                                196,
                                44,
                                196,
                                48
                            ], obj.find);
                        return fn.apply(obj, arguments);
                    }.bind(this)(__recognizer4597791.logProbe([
                        196,
                        49,
                        196,
                        58
                    ], criterion)), fn = __recognizer4597791.logProbe([
                        196,
                        60,
                        196,
                        65
                    ], obj.first);
                return fn.apply(obj, arguments);
            }.bind(this)());
        };
        DOMElement.fromJS = function (o) {
            __recognizer4597791.logEntry([
                199,
                24,
                199,
                32
            ], arguments);
            return new (__recognizer4597791.logProbe([
                200,
                19,
                200,
                29
            ], DOMElement))(__recognizer4597791.logProbe([
                200,
                30,
                200,
                39
            ], __recognizer4597791.logProbe([
                200,
                30,
                200,
                36
            ], jQuery)(__recognizer4597791.logProbe([
                200,
                37,
                200,
                38
            ], o))));
        };
        DOMElement.fromString = function (s) {
            __recognizer4597791.logEntry([
                203,
                28,
                203,
                36
            ], arguments);
            var parse = function () {
                    var obj = __recognizer4597791.logProbe([
                            204,
                            20,
                            204,
                            26
                        ], jQuery), fn = __recognizer4597791.logProbe([
                            204,
                            27,
                            204,
                            36
                        ], obj.parseHTML);
                    return fn.apply(obj, arguments);
                }.bind(this)(__recognizer4597791.logProbe([
                    204,
                    37,
                    204,
                    38
                ], s));
            var o;
            if (__recognizer4597791.logProbe([
                    207,
                    12,
                    207,
                    17
                ], parse) == null) {
                (function () {
                    var obj = __recognizer4597791.logProbe([
                            208,
                            12,
                            208,
                            28
                        ], ExceptionHandler), fn = __recognizer4597791.logProbe([
                            208,
                            29,
                            208,
                            34
                        ], obj.throw);
                    return fn.apply(obj, arguments);
                }.bind(this)(new (__recognizer4597791.logProbe([
                    208,
                    39,
                    208,
                    58
                ], DOMElementException))('Unable to create DOMElement from string: parse has failed')));
            }
            if (__recognizer4597791.logProbe([
                    211,
                    18,
                    211,
                    24
                ], __recognizer4597791.logProbe([
                    211,
                    12,
                    211,
                    17
                ], parse).length) > 1) {
                (function () {
                    var obj = __recognizer4597791.logProbe([
                            212,
                            12,
                            212,
                            28
                        ], ExceptionHandler), fn = __recognizer4597791.logProbe([
                            212,
                            29,
                            212,
                            34
                        ], obj.throw);
                    return fn.apply(obj, arguments);
                }.bind(this)(new (__recognizer4597791.logProbe([
                    212,
                    39,
                    212,
                    58
                ], DOMElementException))('Unable to create DOMElement from string: specified string contains more than a single element')));
            }
            o = __recognizer4597791.logProbe([
                215,
                18,
                215,
                19
            ], __recognizer4597791.logProbe([
                215,
                12,
                215,
                17
            ], parse)[0]);
            return function () {
                var obj = __recognizer4597791.logProbe([
                        217,
                        15,
                        217,
                        25
                    ], DOMElement), fn = __recognizer4597791.logProbe([
                        217,
                        26,
                        217,
                        32
                    ], obj.fromJS);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                217,
                33,
                217,
                34
            ], o));
        };
        DOMElement.prototype.getAttribute = function (key) {
            __recognizer4597791.logEntry([
                220,
                40,
                220,
                48
            ], arguments);
            return function () {
                var obj = __recognizer4597791.logProbe([
                        221,
                        20,
                        221,
                        28
                    ], __recognizer4597791.logProbe([
                        221,
                        15,
                        221,
                        19
                    ], this)._element), fn = __recognizer4597791.logProbe([
                        221,
                        29,
                        221,
                        33
                    ], obj.attr);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                221,
                34,
                221,
                37
            ], key));
        };
        DOMElement.prototype.getData = function (key) {
            __recognizer4597791.logEntry([
                224,
                35,
                224,
                43
            ], arguments);
            return function () {
                var obj = __recognizer4597791.logProbe([
                        225,
                        20,
                        225,
                        28
                    ], __recognizer4597791.logProbe([
                        225,
                        15,
                        225,
                        19
                    ], this)._element), fn = __recognizer4597791.logProbe([
                        225,
                        29,
                        225,
                        33
                    ], obj.attr);
                return fn.apply(obj, arguments);
            }.bind(this)('data-' + __recognizer4597791.logProbe([
                225,
                44,
                225,
                47
            ], key));
        };
        DOMElement.prototype.getHeight = function (actual) {
            __recognizer4597791.logEntry([
                228,
                37,
                228,
                45
            ], arguments);
            if (typeof __recognizer4597791.logProbe([
                    229,
                    19,
                    229,
                    25
                ], actual) === 'undefined') {
                actual = false;
            }
            return function () {
                var obj = __recognizer4597791.logProbe([
                        230,
                        20,
                        230,
                        28
                    ], __recognizer4597791.logProbe([
                        230,
                        15,
                        230,
                        19
                    ], this)._element), fn = __recognizer4597791.logProbe([
                        230,
                        29,
                        230,
                        40
                    ], obj.outerHeight);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                230,
                41,
                230,
                47
            ], actual));
        };
        DOMElement.prototype.getLeft = function (relative) {
            __recognizer4597791.logEntry([
                233,
                35,
                233,
                43
            ], arguments);
            if (typeof __recognizer4597791.logProbe([
                    234,
                    19,
                    234,
                    27
                ], relative) === 'undefined') {
                relative = false;
            }
            if (__recognizer4597791.logProbe([
                    235,
                    12,
                    235,
                    20
                ], relative)) {
                return __recognizer4597791.logProbe([
                    236,
                    44,
                    236,
                    48
                ], function () {
                    var obj = __recognizer4597791.logProbe([
                            236,
                            24,
                            236,
                            32
                        ], __recognizer4597791.logProbe([
                            236,
                            19,
                            236,
                            23
                        ], this)._element), fn = __recognizer4597791.logProbe([
                            236,
                            33,
                            236,
                            41
                        ], obj.position);
                    return fn.apply(obj, arguments);
                }.bind(this)().left);
            } else {
                return __recognizer4597791.logProbe([
                    238,
                    42,
                    238,
                    46
                ], function () {
                    var obj = __recognizer4597791.logProbe([
                            238,
                            24,
                            238,
                            32
                        ], __recognizer4597791.logProbe([
                            238,
                            19,
                            238,
                            23
                        ], this)._element), fn = __recognizer4597791.logProbe([
                            238,
                            33,
                            238,
                            39
                        ], obj.offset);
                    return fn.apply(obj, arguments);
                }.bind(this)().left);
            }
        };
        DOMElement.prototype.getTagName = function () {
            __recognizer4597791.logEntry([
                242,
                38,
                242,
                46
            ], arguments);
            return __recognizer4597791.logProbe([
                243,
                36,
                243,
                45
            ], function () {
                var obj = __recognizer4597791.logProbe([
                        243,
                        20,
                        243,
                        28
                    ], __recognizer4597791.logProbe([
                        243,
                        15,
                        243,
                        19
                    ], this)._element), fn = __recognizer4597791.logProbe([
                        243,
                        29,
                        243,
                        32
                    ], obj.get);
                return fn.apply(obj, arguments);
            }.bind(this)(0).localName);
        };
        DOMElement.prototype.getText = function () {
            __recognizer4597791.logEntry([
                246,
                35,
                246,
                43
            ], arguments);
            return function () {
                var obj = __recognizer4597791.logProbe([
                        247,
                        20,
                        247,
                        28
                    ], __recognizer4597791.logProbe([
                        247,
                        15,
                        247,
                        19
                    ], this)._element), fn = __recognizer4597791.logProbe([
                        247,
                        29,
                        247,
                        33
                    ], obj.text);
                return fn.apply(obj, arguments);
            }.bind(this)();
        };
        DOMElement.prototype.getTop = function (relative) {
            __recognizer4597791.logEntry([
                250,
                34,
                250,
                42
            ], arguments);
            if (typeof __recognizer4597791.logProbe([
                    251,
                    19,
                    251,
                    27
                ], relative) === 'undefined') {
                relative = false;
            }
            if (__recognizer4597791.logProbe([
                    252,
                    12,
                    252,
                    20
                ], relative)) {
                return __recognizer4597791.logProbe([
                    253,
                    44,
                    253,
                    47
                ], function () {
                    var obj = __recognizer4597791.logProbe([
                            253,
                            24,
                            253,
                            32
                        ], __recognizer4597791.logProbe([
                            253,
                            19,
                            253,
                            23
                        ], this)._element), fn = __recognizer4597791.logProbe([
                            253,
                            33,
                            253,
                            41
                        ], obj.position);
                    return fn.apply(obj, arguments);
                }.bind(this)().top);
            } else {
                return __recognizer4597791.logProbe([
                    255,
                    42,
                    255,
                    45
                ], function () {
                    var obj = __recognizer4597791.logProbe([
                            255,
                            24,
                            255,
                            32
                        ], __recognizer4597791.logProbe([
                            255,
                            19,
                            255,
                            23
                        ], this)._element), fn = __recognizer4597791.logProbe([
                            255,
                            33,
                            255,
                            39
                        ], obj.offset);
                    return fn.apply(obj, arguments);
                }.bind(this)().top);
            }
        };
        DOMElement.prototype.getValue = function () {
            __recognizer4597791.logEntry([
                259,
                36,
                259,
                44
            ], arguments);
            return function () {
                var obj = __recognizer4597791.logProbe([
                        260,
                        20,
                        260,
                        28
                    ], __recognizer4597791.logProbe([
                        260,
                        15,
                        260,
                        19
                    ], this)._element), fn = __recognizer4597791.logProbe([
                        260,
                        29,
                        260,
                        32
                    ], obj.val);
                return fn.apply(obj, arguments);
            }.bind(this)();
        };
        DOMElement.prototype.getWidth = function (actual) {
            __recognizer4597791.logEntry([
                263,
                36,
                263,
                44
            ], arguments);
            if (typeof __recognizer4597791.logProbe([
                    264,
                    19,
                    264,
                    25
                ], actual) === 'undefined') {
                actual = false;
            }
            return function () {
                var obj = __recognizer4597791.logProbe([
                        265,
                        20,
                        265,
                        28
                    ], __recognizer4597791.logProbe([
                        265,
                        15,
                        265,
                        19
                    ], this)._element), fn = __recognizer4597791.logProbe([
                        265,
                        29,
                        265,
                        39
                    ], obj.outerWidth);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                265,
                40,
                265,
                46
            ], actual));
        };
        DOMElement.prototype.horizontalCenterize = function (reference) {
            __recognizer4597791.logEntry([
                268,
                47,
                268,
                55
            ], arguments);
            if (typeof __recognizer4597791.logProbe([
                    269,
                    19,
                    269,
                    28
                ], reference) === 'undefined') {
                reference = new (__recognizer4597791.logProbe([
                    269,
                    64,
                    269,
                    74
                ], DOMElement))(__recognizer4597791.logProbe([
                    269,
                    75,
                    269,
                    84
                ], __recognizer4597791.logProbe([
                    269,
                    75,
                    269,
                    76
                ], $)('body')));
            }
            (function () {
                var obj = __recognizer4597791.logProbe([
                        270,
                        8,
                        270,
                        12
                    ], this), fn = __recognizer4597791.logProbe([
                        270,
                        13,
                        270,
                        19
                    ], obj.setCss);
                return fn.apply(obj, arguments);
            }.bind(this)({
                left: (function () {
                    var obj = __recognizer4597791.logProbe([
                            271,
                            19,
                            271,
                            28
                        ], reference), fn = __recognizer4597791.logProbe([
                            271,
                            29,
                            271,
                            37
                        ], obj.getWidth);
                    return fn.apply(obj, arguments);
                }.bind(this)() - function () {
                    var obj = __recognizer4597791.logProbe([
                            271,
                            42,
                            271,
                            46
                        ], this), fn = __recognizer4597791.logProbe([
                            271,
                            47,
                            271,
                            55
                        ], obj.getWidth);
                    return fn.apply(obj, arguments);
                }.bind(this)()) / 2
            }));
        };
        DOMElement.prototype.horizontalCenterizeWithMargin = function (reference) {
            __recognizer4597791.logEntry([
                275,
                57,
                275,
                65
            ], arguments);
            if (typeof __recognizer4597791.logProbe([
                    276,
                    19,
                    276,
                    28
                ], reference) === 'undefined') {
                reference = new (__recognizer4597791.logProbe([
                    276,
                    64,
                    276,
                    74
                ], DOMElement))(__recognizer4597791.logProbe([
                    276,
                    75,
                    276,
                    84
                ], __recognizer4597791.logProbe([
                    276,
                    75,
                    276,
                    76
                ], $)('body')));
            }
            (function () {
                var obj = __recognizer4597791.logProbe([
                        277,
                        8,
                        277,
                        12
                    ], this), fn = __recognizer4597791.logProbe([
                        277,
                        13,
                        277,
                        19
                    ], obj.setCss);
                return fn.apply(obj, arguments);
            }.bind(this)({
                marginLeft: (function () {
                    var obj = __recognizer4597791.logProbe([
                            278,
                            25,
                            278,
                            34
                        ], reference), fn = __recognizer4597791.logProbe([
                            278,
                            35,
                            278,
                            43
                        ], obj.getWidth);
                    return fn.apply(obj, arguments);
                }.bind(this)() - function () {
                    var obj = __recognizer4597791.logProbe([
                            278,
                            48,
                            278,
                            52
                        ], this), fn = __recognizer4597791.logProbe([
                            278,
                            53,
                            278,
                            61
                        ], obj.getWidth);
                    return fn.apply(obj, arguments);
                }.bind(this)()) / 2
            }));
        };
        DOMElement.prototype.off = function (event) {
            __recognizer4597791.logEntry([
                282,
                31,
                282,
                39
            ], arguments);
            (function () {
                var obj = __recognizer4597791.logProbe([
                        283,
                        13,
                        283,
                        21
                    ], __recognizer4597791.logProbe([
                        283,
                        8,
                        283,
                        12
                    ], this)._element), fn = __recognizer4597791.logProbe([
                        283,
                        22,
                        283,
                        25
                    ], obj.off);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                283,
                26,
                283,
                31
            ], event)));
        };
        DOMElement.prototype.on = function (event, handler) {
            __recognizer4597791.logEntry([
                286,
                30,
                286,
                38
            ], arguments);
            (function () {
                var obj = __recognizer4597791.logProbe([
                        287,
                        13,
                        287,
                        21
                    ], __recognizer4597791.logProbe([
                        287,
                        8,
                        287,
                        12
                    ], this)._element), fn = __recognizer4597791.logProbe([
                        287,
                        22,
                        287,
                        24
                    ], obj.on);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                287,
                25,
                287,
                30
            ], event), function (e) {
                __recognizer4597791.logEntry([
                    287,
                    32,
                    287,
                    40
                ], arguments);
                __recognizer4597791.logProbe([
                    288,
                    12,
                    288,
                    49
                ], __recognizer4597791.logProbe([
                    288,
                    12,
                    288,
                    19
                ], handler)(new (__recognizer4597791.logProbe([
                    288,
                    24,
                    288,
                    45
                ], DOMElementEventObject))(__recognizer4597791.logProbe([
                    288,
                    46,
                    288,
                    47
                ], e))));
            }));
        };
        DOMElement.prototype.parent = function (selector) {
            __recognizer4597791.logEntry([
                292,
                34,
                292,
                42
            ], arguments);
            if (typeof __recognizer4597791.logProbe([
                    293,
                    19,
                    293,
                    27
                ], selector) === 'undefined') {
                selector = null;
            }
            return new (__recognizer4597791.logProbe([
                294,
                19,
                294,
                29
            ], DOMElement))(function () {
                var obj = function () {
                        var obj = __recognizer4597791.logProbe([
                                294,
                                35,
                                294,
                                43
                            ], __recognizer4597791.logProbe([
                                294,
                                30,
                                294,
                                34
                            ], this)._element), fn = __recognizer4597791.logProbe([
                                294,
                                44,
                                294,
                                50
                            ], obj.parent);
                        return fn.apply(obj, arguments);
                    }.bind(this)(__recognizer4597791.logProbe([
                        294,
                        51,
                        294,
                        59
                    ], selector)), fn = __recognizer4597791.logProbe([
                        294,
                        61,
                        294,
                        66
                    ], obj.first);
                return fn.apply(obj, arguments);
            }.bind(this)());
        };
        DOMElement.prototype.remove = function () {
            __recognizer4597791.logEntry([
                297,
                34,
                297,
                42
            ], arguments);
            (function () {
                var obj = __recognizer4597791.logProbe([
                        298,
                        13,
                        298,
                        21
                    ], __recognizer4597791.logProbe([
                        298,
                        8,
                        298,
                        12
                    ], this)._element), fn = __recognizer4597791.logProbe([
                        298,
                        22,
                        298,
                        28
                    ], obj.remove);
                return fn.apply(obj, arguments);
            }.bind(this)());
        };
        DOMElement.prototype.removeClass = function (value) {
            __recognizer4597791.logEntry([
                301,
                39,
                301,
                47
            ], arguments);
            (function () {
                var obj = __recognizer4597791.logProbe([
                        302,
                        13,
                        302,
                        21
                    ], __recognizer4597791.logProbe([
                        302,
                        8,
                        302,
                        12
                    ], this)._element), fn = __recognizer4597791.logProbe([
                        302,
                        22,
                        302,
                        33
                    ], obj.removeClass);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                302,
                34,
                302,
                39
            ], value)));
        };
        DOMElement.prototype.setAttribute = function (key, value) {
            __recognizer4597791.logEntry([
                305,
                40,
                305,
                48
            ], arguments);
            (function () {
                var obj = __recognizer4597791.logProbe([
                        306,
                        13,
                        306,
                        21
                    ], __recognizer4597791.logProbe([
                        306,
                        8,
                        306,
                        12
                    ], this)._element), fn = __recognizer4597791.logProbe([
                        306,
                        22,
                        306,
                        26
                    ], obj.attr);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                306,
                27,
                306,
                30
            ], key), __recognizer4597791.logProbe([
                306,
                32,
                306,
                37
            ], value)));
        };
        DOMElement.prototype.setCss = function (properties) {
            __recognizer4597791.logEntry([
                309,
                34,
                309,
                42
            ], arguments);
            (function () {
                var obj = __recognizer4597791.logProbe([
                        310,
                        13,
                        310,
                        21
                    ], __recognizer4597791.logProbe([
                        310,
                        8,
                        310,
                        12
                    ], this)._element), fn = __recognizer4597791.logProbe([
                        310,
                        22,
                        310,
                        25
                    ], obj.css);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                310,
                26,
                310,
                36
            ], properties)));
            return __recognizer4597791.logProbe([
                311,
                15,
                311,
                19
            ], this);
        };
        DOMElement.prototype.setData = function (key, value) {
            __recognizer4597791.logEntry([
                314,
                35,
                314,
                43
            ], arguments);
            (function () {
                var obj = __recognizer4597791.logProbe([
                        315,
                        13,
                        315,
                        21
                    ], __recognizer4597791.logProbe([
                        315,
                        8,
                        315,
                        12
                    ], this)._element), fn = __recognizer4597791.logProbe([
                        315,
                        22,
                        315,
                        26
                    ], obj.attr);
                return fn.apply(obj, arguments);
            }.bind(this)('data-' + __recognizer4597791.logProbe([
                315,
                37,
                315,
                40
            ], key), __recognizer4597791.logProbe([
                315,
                42,
                315,
                47
            ], value)));
        };
        DOMElement.prototype.setText = function (text) {
            __recognizer4597791.logEntry([
                318,
                35,
                318,
                43
            ], arguments);
            (function () {
                var obj = __recognizer4597791.logProbe([
                        319,
                        13,
                        319,
                        21
                    ], __recognizer4597791.logProbe([
                        319,
                        8,
                        319,
                        12
                    ], this)._element), fn = __recognizer4597791.logProbe([
                        319,
                        22,
                        319,
                        26
                    ], obj.text);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                319,
                27,
                319,
                31
            ], text)));
        };
        DOMElement.prototype.setValue = function (value) {
            __recognizer4597791.logEntry([
                322,
                36,
                322,
                44
            ], arguments);
            (function () {
                var obj = __recognizer4597791.logProbe([
                        323,
                        13,
                        323,
                        21
                    ], __recognizer4597791.logProbe([
                        323,
                        8,
                        323,
                        12
                    ], this)._element), fn = __recognizer4597791.logProbe([
                        323,
                        22,
                        323,
                        25
                    ], obj.val);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                323,
                26,
                323,
                31
            ], value)));
        };
        DOMElement.prototype.toJQuery = function () {
            __recognizer4597791.logEntry([
                326,
                36,
                326,
                44
            ], arguments);
            return __recognizer4597791.logProbe([
                327,
                20,
                327,
                28
            ], __recognizer4597791.logProbe([
                327,
                15,
                327,
                19
            ], this)._element);
        };
        DOMElement.prototype.toString = function () {
            __recognizer4597791.logEntry([
                330,
                36,
                330,
                44
            ], arguments);
            return function () {
                var obj = __recognizer4597791.logProbe([
                        331,
                        20,
                        331,
                        28
                    ], __recognizer4597791.logProbe([
                        331,
                        15,
                        331,
                        19
                    ], this)._element), fn = __recognizer4597791.logProbe([
                        331,
                        29,
                        331,
                        33
                    ], obj.html);
                return fn.apply(obj, arguments);
            }.bind(this)();
        };
        DOMElement.prototype.verticalCenterize = function (reference) {
            __recognizer4597791.logEntry([
                334,
                45,
                334,
                53
            ], arguments);
            if (typeof __recognizer4597791.logProbe([
                    335,
                    19,
                    335,
                    28
                ], reference) === 'undefined') {
                reference = new (__recognizer4597791.logProbe([
                    335,
                    64,
                    335,
                    74
                ], DOMElement))(__recognizer4597791.logProbe([
                    335,
                    75,
                    335,
                    84
                ], __recognizer4597791.logProbe([
                    335,
                    75,
                    335,
                    76
                ], $)('body')));
            }
            (function () {
                var obj = __recognizer4597791.logProbe([
                        336,
                        8,
                        336,
                        12
                    ], this), fn = __recognizer4597791.logProbe([
                        336,
                        13,
                        336,
                        19
                    ], obj.setCss);
                return fn.apply(obj, arguments);
            }.bind(this)({
                top: (function () {
                    var obj = __recognizer4597791.logProbe([
                            337,
                            18,
                            337,
                            27
                        ], reference), fn = __recognizer4597791.logProbe([
                            337,
                            28,
                            337,
                            37
                        ], obj.getHeight);
                    return fn.apply(obj, arguments);
                }.bind(this)() - function () {
                    var obj = __recognizer4597791.logProbe([
                            337,
                            42,
                            337,
                            46
                        ], this), fn = __recognizer4597791.logProbe([
                            337,
                            47,
                            337,
                            56
                        ], obj.getHeight);
                    return fn.apply(obj, arguments);
                }.bind(this)()) / 2
            }));
        };
        DOMElement.prototype.verticalCenterizeWithMargin = function (reference) {
            __recognizer4597791.logEntry([
                341,
                55,
                341,
                63
            ], arguments);
            if (typeof __recognizer4597791.logProbe([
                    342,
                    19,
                    342,
                    28
                ], reference) === 'undefined') {
                reference = new (__recognizer4597791.logProbe([
                    342,
                    64,
                    342,
                    74
                ], DOMElement))(__recognizer4597791.logProbe([
                    342,
                    75,
                    342,
                    84
                ], __recognizer4597791.logProbe([
                    342,
                    75,
                    342,
                    76
                ], $)('body')));
            }
            (function () {
                var obj = __recognizer4597791.logProbe([
                        343,
                        8,
                        343,
                        12
                    ], this), fn = __recognizer4597791.logProbe([
                        343,
                        13,
                        343,
                        19
                    ], obj.setCss);
                return fn.apply(obj, arguments);
            }.bind(this)({
                marginTop: (function () {
                    var obj = __recognizer4597791.logProbe([
                            344,
                            24,
                            344,
                            33
                        ], reference), fn = __recognizer4597791.logProbe([
                            344,
                            34,
                            344,
                            43
                        ], obj.getHeight);
                    return fn.apply(obj, arguments);
                }.bind(this)() - function () {
                    var obj = __recognizer4597791.logProbe([
                            344,
                            48,
                            344,
                            52
                        ], this), fn = __recognizer4597791.logProbe([
                            344,
                            53,
                            344,
                            62
                        ], obj.getHeight);
                    return fn.apply(obj, arguments);
                }.bind(this)()) / 2
            }));
        };
        return __recognizer4597791.logProbe([
            347,
            11,
            347,
            21
        ], DOMElement);
    }(__recognizer4597791.logProbe([
        348,
        3,
        348,
        11
    ], TSObject));
var DOMTreeException = function (_super) {
        __recognizer4597791.logEntry([
            349,
            24,
            349,
            32
        ], arguments);
        __recognizer4597791.logProbe([
            350,
            4,
            350,
            39
        ], __recognizer4597791.logProbe([
            350,
            4,
            350,
            13
        ], __extends)(__recognizer4597791.logProbe([
            350,
            14,
            350,
            30
        ], DOMTreeException), __recognizer4597791.logProbe([
            350,
            32,
            350,
            38
        ], _super)));
        function DOMTreeException() {
            __recognizer4597791.logEntry([
                351,
                13,
                351,
                29
            ], arguments);
            (function () {
                var obj = __recognizer4597791.logProbe([
                        352,
                        8,
                        352,
                        14
                    ], _super), fn = __recognizer4597791.logProbe([
                        352,
                        15,
                        352,
                        20
                    ], obj.apply);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                352,
                21,
                352,
                25
            ], this), __recognizer4597791.logProbe([
                352,
                27,
                352,
                36
            ], arguments)));
        }
        return __recognizer4597791.logProbe([
            354,
            11,
            354,
            27
        ], DOMTreeException);
    }(__recognizer4597791.logProbe([
        355,
        3,
        355,
        12
    ], Exception));
var DOMTree = function (_super) {
        __recognizer4597791.logEntry([
            357,
            15,
            357,
            23
        ], arguments);
        __recognizer4597791.logProbe([
            358,
            4,
            358,
            30
        ], __recognizer4597791.logProbe([
            358,
            4,
            358,
            13
        ], __extends)(__recognizer4597791.logProbe([
            358,
            14,
            358,
            21
        ], DOMTree), __recognizer4597791.logProbe([
            358,
            23,
            358,
            29
        ], _super)));
        function DOMTree() {
            __recognizer4597791.logEntry([
                359,
                13,
                359,
                20
            ], arguments);
            (function () {
                var obj = __recognizer4597791.logProbe([
                        360,
                        8,
                        360,
                        14
                    ], _super), fn = __recognizer4597791.logProbe([
                        360,
                        15,
                        360,
                        20
                    ], obj.apply);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                360,
                21,
                360,
                25
            ], this), __recognizer4597791.logProbe([
                360,
                27,
                360,
                36
            ], arguments)));
        }
        DOMTree.find = function (criterion) {
            __recognizer4597791.logEntry([
                362,
                19,
                362,
                27
            ], arguments);
            var results = function () {
                    var obj = __recognizer4597791.logProbe([
                            363,
                            22,
                            363,
                            38
                        ], __recognizer4597791.logProbe([
                            363,
                            22,
                            363,
                            28
                        ], jQuery)(__recognizer4597791.logProbe([
                            363,
                            29,
                            363,
                            37
                        ], document))), fn = __recognizer4597791.logProbe([
                            363,
                            39,
                            363,
                            43
                        ], obj.find);
                    return fn.apply(obj, arguments);
                }.bind(this)(__recognizer4597791.logProbe([
                    363,
                    44,
                    363,
                    53
                ], criterion));
            var list = new (__recognizer4597791.logProbe([
                    364,
                    23,
                    364,
                    32
                ], ArrayList))();
            (function () {
                var obj = __recognizer4597791.logProbe([
                        366,
                        8,
                        366,
                        15
                    ], results), fn = __recognizer4597791.logProbe([
                        366,
                        16,
                        366,
                        20
                    ], obj.each);
                return fn.apply(obj, arguments);
            }.bind(this)(function (i, e) {
                __recognizer4597791.logEntry([
                    366,
                    21,
                    366,
                    29
                ], arguments);
                (function () {
                    var obj = __recognizer4597791.logProbe([
                            367,
                            12,
                            367,
                            16
                        ], list), fn = __recognizer4597791.logProbe([
                            367,
                            17,
                            367,
                            20
                        ], obj.add);
                    return fn.apply(obj, arguments);
                }.bind(this)(function () {
                    var obj = __recognizer4597791.logProbe([
                            367,
                            21,
                            367,
                            31
                        ], DOMElement), fn = __recognizer4597791.logProbe([
                            367,
                            32,
                            367,
                            38
                        ], obj.fromJS);
                    return fn.apply(obj, arguments);
                }.bind(this)(__recognizer4597791.logProbe([
                    367,
                    39,
                    367,
                    40
                ], e))));
            }));
            return __recognizer4597791.logProbe([
                370,
                15,
                370,
                19
            ], list);
        };
        DOMTree.findSingle = function (criterion) {
            __recognizer4597791.logEntry([
                373,
                25,
                373,
                33
            ], arguments);
            return new (__recognizer4597791.logProbe([
                374,
                19,
                374,
                29
            ], DOMElement))(function () {
                var obj = function () {
                        var obj = __recognizer4597791.logProbe([
                                374,
                                30,
                                374,
                                46
                            ], __recognizer4597791.logProbe([
                                374,
                                30,
                                374,
                                36
                            ], jQuery)(__recognizer4597791.logProbe([
                                374,
                                37,
                                374,
                                45
                            ], document))), fn = __recognizer4597791.logProbe([
                                374,
                                47,
                                374,
                                51
                            ], obj.find);
                        return fn.apply(obj, arguments);
                    }.bind(this)(__recognizer4597791.logProbe([
                        374,
                        52,
                        374,
                        61
                    ], criterion)), fn = __recognizer4597791.logProbe([
                        374,
                        63,
                        374,
                        68
                    ], obj.first);
                return fn.apply(obj, arguments);
            }.bind(this)());
        };
        DOMTree.fromString = function (s) {
            __recognizer4597791.logEntry([
                377,
                25,
                377,
                33
            ], arguments);
            var a;
            var l;
            a = function () {
                var obj = __recognizer4597791.logProbe([
                        381,
                        12,
                        381,
                        18
                    ], jQuery), fn = __recognizer4597791.logProbe([
                        381,
                        19,
                        381,
                        28
                    ], obj.parseHTML);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                381,
                29,
                381,
                30
            ], s));
            if (__recognizer4597791.logProbe([
                    383,
                    12,
                    383,
                    13
                ], a) === null) {
                return null;
            }
            l = new (__recognizer4597791.logProbe([
                387,
                16,
                387,
                25
            ], ArrayList))();
            for (var i = 0; __recognizer4597791.logProbe([
                    389,
                    24,
                    389,
                    25
                ], i) < __recognizer4597791.logProbe([
                    389,
                    30,
                    389,
                    36
                ], __recognizer4597791.logProbe([
                    389,
                    28,
                    389,
                    29
                ], a).length); __recognizer4597791.logProbe([
                    389,
                    38,
                    389,
                    39
                ], i)++) {
                var d = function () {
                        var obj = __recognizer4597791.logProbe([
                                390,
                                20,
                                390,
                                30
                            ], DOMElement), fn = __recognizer4597791.logProbe([
                                390,
                                31,
                                390,
                                37
                            ], obj.fromJS);
                        return fn.apply(obj, arguments);
                    }.bind(this)(__recognizer4597791.logProbe([
                        390,
                        40,
                        390,
                        41
                    ], __recognizer4597791.logProbe([
                        390,
                        38,
                        390,
                        39
                    ], a)[i]));
                (function () {
                    var obj = __recognizer4597791.logProbe([
                            391,
                            12,
                            391,
                            13
                        ], l), fn = __recognizer4597791.logProbe([
                            391,
                            14,
                            391,
                            17
                        ], obj.add);
                    return fn.apply(obj, arguments);
                }.bind(this)(__recognizer4597791.logProbe([
                    391,
                    18,
                    391,
                    19
                ], d)));
            }
            return __recognizer4597791.logProbe([
                394,
                15,
                394,
                16
            ], l);
        };
        return __recognizer4597791.logProbe([
            396,
            11,
            396,
            18
        ], DOMTree);
    }(__recognizer4597791.logProbe([
        397,
        3,
        397,
        11
    ], TSObject));
var StringBuffer = function (_super) {
        __recognizer4597791.logEntry([
            398,
            20,
            398,
            28
        ], arguments);
        __recognizer4597791.logProbe([
            399,
            4,
            399,
            35
        ], __recognizer4597791.logProbe([
            399,
            4,
            399,
            13
        ], __extends)(__recognizer4597791.logProbe([
            399,
            14,
            399,
            26
        ], StringBuffer), __recognizer4597791.logProbe([
            399,
            28,
            399,
            34
        ], _super)));
        function StringBuffer(first) {
            __recognizer4597791.logEntry([
                400,
                13,
                400,
                25
            ], arguments);
            if (typeof __recognizer4597791.logProbe([
                    401,
                    19,
                    401,
                    24
                ], first) === 'undefined') {
                first = '';
            }
            (function () {
                var obj = __recognizer4597791.logProbe([
                        402,
                        8,
                        402,
                        14
                    ], _super), fn = __recognizer4597791.logProbe([
                        402,
                        15,
                        402,
                        19
                    ], obj.call);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                402,
                20,
                402,
                24
            ], this)));
            this._content = new (__recognizer4597791.logProbe([
                404,
                28,
                404,
                33
            ], Array))();
            (function () {
                var obj = __recognizer4597791.logProbe([
                        405,
                        13,
                        405,
                        21
                    ], __recognizer4597791.logProbe([
                        405,
                        8,
                        405,
                        12
                    ], this)._content), fn = __recognizer4597791.logProbe([
                        405,
                        22,
                        405,
                        26
                    ], obj.push);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                405,
                27,
                405,
                32
            ], first)));
        }
        StringBuffer.prototype.append = function (s) {
            __recognizer4597791.logEntry([
                407,
                36,
                407,
                44
            ], arguments);
            (function () {
                var obj = __recognizer4597791.logProbe([
                        408,
                        13,
                        408,
                        21
                    ], __recognizer4597791.logProbe([
                        408,
                        8,
                        408,
                        12
                    ], this)._content), fn = __recognizer4597791.logProbe([
                        408,
                        22,
                        408,
                        26
                    ], obj.push);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                408,
                27,
                408,
                28
            ], s)));
            return __recognizer4597791.logProbe([
                409,
                15,
                409,
                19
            ], this);
        };
        StringBuffer.prototype.toString = function () {
            __recognizer4597791.logEntry([
                412,
                38,
                412,
                46
            ], arguments);
            var result = '';
            for (var i = 0; __recognizer4597791.logProbe([
                    415,
                    24,
                    415,
                    25
                ], i) < __recognizer4597791.logProbe([
                    415,
                    42,
                    415,
                    48
                ], __recognizer4597791.logProbe([
                    415,
                    33,
                    415,
                    41
                ], __recognizer4597791.logProbe([
                    415,
                    28,
                    415,
                    32
                ], this)._content).length); __recognizer4597791.logProbe([
                    415,
                    50,
                    415,
                    51
                ], i)++) {
                result += __recognizer4597791.logProbe([
                    416,
                    36,
                    416,
                    37
                ], __recognizer4597791.logProbe([
                    416,
                    27,
                    416,
                    35
                ], __recognizer4597791.logProbe([
                    416,
                    22,
                    416,
                    26
                ], this)._content)[i]);
            }
            return __recognizer4597791.logProbe([
                419,
                15,
                419,
                21
            ], result);
        };
        return __recognizer4597791.logProbe([
            421,
            11,
            421,
            23
        ], StringBuffer);
    }(__recognizer4597791.logProbe([
        422,
        3,
        422,
        11
    ], TSObject));
var NodeWindowEvents = function () {
        __recognizer4597791.logEntry([
            424,
            24,
            424,
            32
        ], arguments);
        function NodeWindowEvents() {
            __recognizer4597791.logEntry([
                425,
                13,
                425,
                29
            ], arguments);
        }
        NodeWindowEvents.Blur = 'blur';
        NodeWindowEvents.Focus = 'focus';
        NodeWindowEvents.Close = 'close';
        NodeWindowEvents.Move = 'move';
        return __recognizer4597791.logProbe([
            434,
            11,
            434,
            27
        ], NodeWindowEvents);
    }();
var NodeWindow = function () {
        __recognizer4597791.logEntry([
            437,
            18,
            437,
            26
        ], arguments);
        function NodeWindow() {
            __recognizer4597791.logEntry([
                438,
                13,
                438,
                23
            ], arguments);
            throw new (__recognizer4597791.logProbe([
                439,
                18,
                439,
                27
            ], Exception))('You cannot create a Window object');
        }
        NodeWindow.getInstance = function () {
            __recognizer4597791.logEntry([
                441,
                29,
                441,
                37
            ], arguments);
            return function () {
                var obj = __recognizer4597791.logProbe([
                        442,
                        19,
                        442,
                        25
                    ], __recognizer4597791.logProbe([
                        442,
                        15,
                        442,
                        18
                    ], gui).Window), fn = __recognizer4597791.logProbe([
                        442,
                        26,
                        442,
                        29
                    ], obj.get);
                return fn.apply(obj, arguments);
            }.bind(this)();
        };
        NodeWindow.on = function (event, callback) {
            __recognizer4597791.logEntry([
                445,
                20,
                445,
                28
            ], arguments);
            if (__recognizer4597791.logProbe([
                    446,
                    12,
                    446,
                    17
                ], event) != __recognizer4597791.logProbe([
                    446,
                    38,
                    446,
                    42
                ], __recognizer4597791.logProbe([
                    446,
                    21,
                    446,
                    37
                ], NodeWindowEvents).Move)) {
                (function () {
                    var obj = function () {
                            var obj = __recognizer4597791.logProbe([
                                    447,
                                    12,
                                    447,
                                    22
                                ], NodeWindow), fn = __recognizer4597791.logProbe([
                                    447,
                                    23,
                                    447,
                                    34
                                ], obj.getInstance);
                            return fn.apply(obj, arguments);
                        }.bind(this)(), fn = __recognizer4597791.logProbe([
                            447,
                            37,
                            447,
                            39
                        ], obj.on);
                    return fn.apply(obj, arguments);
                }.bind(this)(__recognizer4597791.logProbe([
                    447,
                    40,
                    447,
                    45
                ], event), __recognizer4597791.logProbe([
                    447,
                    47,
                    447,
                    55
                ], callback)));
            } else {
                if (__recognizer4597791.logProbe([
                        449,
                        27,
                        449,
                        41
                    ], __recognizer4597791.logProbe([
                        449,
                        16,
                        449,
                        26
                    ], NodeWindow)._moveListeners) == null) {
                    NodeWindow._moveListeners = new (__recognizer4597791.logProbe([
                        450,
                        48,
                        450,
                        57
                    ], ArrayList))();
                }
                (function () {
                    var obj = __recognizer4597791.logProbe([
                            452,
                            23,
                            452,
                            37
                        ], __recognizer4597791.logProbe([
                            452,
                            12,
                            452,
                            22
                        ], NodeWindow)._moveListeners), fn = __recognizer4597791.logProbe([
                            452,
                            38,
                            452,
                            41
                        ], obj.add);
                    return fn.apply(obj, arguments);
                }.bind(this)(__recognizer4597791.logProbe([
                    452,
                    42,
                    452,
                    50
                ], callback)));
            }
        };
        NodeWindow.moveTo = function (page) {
            __recognizer4597791.logEntry([
                456,
                24,
                456,
                32
            ], arguments);
            (function () {
                var obj = __recognizer4597791.logProbe([
                        457,
                        19,
                        457,
                        33
                    ], __recognizer4597791.logProbe([
                        457,
                        8,
                        457,
                        18
                    ], NodeWindow)._moveListeners), fn = __recognizer4597791.logProbe([
                        457,
                        34,
                        457,
                        37
                    ], obj.map);
                return fn.apply(obj, arguments);
            }.bind(this)(function (l) {
                __recognizer4597791.logEntry([
                    457,
                    38,
                    457,
                    46
                ], arguments);
                __recognizer4597791.logProbe([
                    458,
                    12,
                    458,
                    15
                ], __recognizer4597791.logProbe([
                    458,
                    12,
                    458,
                    13
                ], l)());
            }));
            NodeWindow.getInstance().window.location = __recognizer4597791.logProbe([
                460,
                51,
                460,
                55
            ], page);
        };
        return __recognizer4597791.logProbe([
            462,
            11,
            462,
            21
        ], NodeWindow);
    }();
var RegexFlags = function () {
        __recognizer4597791.logEntry([
            464,
            18,
            464,
            26
        ], arguments);
        function RegexFlags() {
            __recognizer4597791.logEntry([
                465,
                13,
                465,
                23
            ], arguments);
        }
        RegexFlags.Insensitive = 'i';
        RegexFlags.Global = 'g';
        RegexFlags.Multi = 'm';
        return __recognizer4597791.logProbe([
            470,
            11,
            470,
            21
        ], RegexFlags);
    }();
var Regex = function (_super) {
        __recognizer4597791.logEntry([
            473,
            13,
            473,
            21
        ], arguments);
        __recognizer4597791.logProbe([
            474,
            4,
            474,
            28
        ], __recognizer4597791.logProbe([
            474,
            4,
            474,
            13
        ], __extends)(__recognizer4597791.logProbe([
            474,
            14,
            474,
            19
        ], Regex), __recognizer4597791.logProbe([
            474,
            21,
            474,
            27
        ], _super)));
        function Regex(pattern, flags) {
            __recognizer4597791.logEntry([
                475,
                13,
                475,
                18
            ], arguments);
            if (typeof __recognizer4597791.logProbe([
                    476,
                    19,
                    476,
                    24
                ], flags) === 'undefined') {
                flags = null;
            }
            (function () {
                var obj = __recognizer4597791.logProbe([
                        477,
                        8,
                        477,
                        14
                    ], _super), fn = __recognizer4597791.logProbe([
                        477,
                        15,
                        477,
                        19
                    ], obj.call);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                477,
                20,
                477,
                24
            ], this)));
            this._regex = new (__recognizer4597791.logProbe([
                479,
                26,
                479,
                32
            ], RegExp))(__recognizer4597791.logProbe([
                479,
                33,
                479,
                40
            ], pattern), function () {
                var obj = __recognizer4597791.logProbe([
                        479,
                        42,
                        479,
                        46
                    ], this), fn = __recognizer4597791.logProbe([
                        479,
                        47,
                        479,
                        58
                    ], obj._buildFlags);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                479,
                59,
                479,
                64
            ], flags)));
        }
        Regex.prototype._buildFlags = function (flags) {
            __recognizer4597791.logEntry([
                481,
                34,
                481,
                42
            ], arguments);
            var s = '';
            if (__recognizer4597791.logProbe([
                    484,
                    12,
                    484,
                    17
                ], flags) !== null) {
                for (var i = 0; __recognizer4597791.logProbe([
                        485,
                        28,
                        485,
                        29
                    ], i) < __recognizer4597791.logProbe([
                        485,
                        38,
                        485,
                        44
                    ], __recognizer4597791.logProbe([
                        485,
                        32,
                        485,
                        37
                    ], flags).length); __recognizer4597791.logProbe([
                        485,
                        46,
                        485,
                        47
                    ], i)++) {
                    s += __recognizer4597791.logProbe([
                        486,
                        27,
                        486,
                        28
                    ], __recognizer4597791.logProbe([
                        486,
                        21,
                        486,
                        26
                    ], flags)[0]);
                }
            }
            return __recognizer4597791.logProbe([
                490,
                15,
                490,
                16
            ], s);
        };
        Regex.prototype.execute = function (s) {
            __recognizer4597791.logEntry([
                493,
                30,
                493,
                38
            ], arguments);
            var r = function () {
                    var obj = __recognizer4597791.logProbe([
                            494,
                            21,
                            494,
                            27
                        ], __recognizer4597791.logProbe([
                            494,
                            16,
                            494,
                            20
                        ], this)._regex), fn = __recognizer4597791.logProbe([
                            494,
                            28,
                            494,
                            32
                        ], obj.exec);
                    return fn.apply(obj, arguments);
                }.bind(this)(__recognizer4597791.logProbe([
                    494,
                    33,
                    494,
                    34
                ], s));
            if (__recognizer4597791.logProbe([
                    496,
                    12,
                    496,
                    13
                ], r) === null) {
                return null;
            } else {
                return __recognizer4597791.logProbe([
                    499,
                    21,
                    499,
                    22
                ], __recognizer4597791.logProbe([
                    499,
                    19,
                    499,
                    20
                ], r)[1]);
            }
        };
        Regex.prototype.test = function (s) {
            __recognizer4597791.logEntry([
                503,
                27,
                503,
                35
            ], arguments);
            return function () {
                var obj = __recognizer4597791.logProbe([
                        504,
                        20,
                        504,
                        26
                    ], __recognizer4597791.logProbe([
                        504,
                        15,
                        504,
                        19
                    ], this)._regex), fn = __recognizer4597791.logProbe([
                        504,
                        27,
                        504,
                        31
                    ], obj.test);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                504,
                32,
                504,
                33
            ], s));
        };
        return __recognizer4597791.logProbe([
            506,
            11,
            506,
            16
        ], Regex);
    }(__recognizer4597791.logProbe([
        507,
        3,
        507,
        11
    ], TSObject));
var ArrayList = function (_super) {
        __recognizer4597791.logEntry([
            508,
            17,
            508,
            25
        ], arguments);
        __recognizer4597791.logProbe([
            509,
            4,
            509,
            32
        ], __recognizer4597791.logProbe([
            509,
            4,
            509,
            13
        ], __extends)(__recognizer4597791.logProbe([
            509,
            14,
            509,
            23
        ], ArrayList), __recognizer4597791.logProbe([
            509,
            25,
            509,
            31
        ], _super)));
        function ArrayList() {
            __recognizer4597791.logEntry([
                510,
                13,
                510,
                22
            ], arguments);
            (function () {
                var obj = __recognizer4597791.logProbe([
                        511,
                        8,
                        511,
                        14
                    ], _super), fn = __recognizer4597791.logProbe([
                        511,
                        15,
                        511,
                        19
                    ], obj.call);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                511,
                20,
                511,
                24
            ], this)));
            this._content = new (__recognizer4597791.logProbe([
                513,
                28,
                513,
                33
            ], Array))();
        }
        ArrayList.prototype.add = function (t) {
            __recognizer4597791.logEntry([
                515,
                30,
                515,
                38
            ], arguments);
            (function () {
                var obj = __recognizer4597791.logProbe([
                        516,
                        13,
                        516,
                        21
                    ], __recognizer4597791.logProbe([
                        516,
                        8,
                        516,
                        12
                    ], this)._content), fn = __recognizer4597791.logProbe([
                        516,
                        22,
                        516,
                        26
                    ], obj.push);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                516,
                27,
                516,
                28
            ], t)));
        };
        ArrayList.prototype.clone = function () {
            __recognizer4597791.logEntry([
                519,
                32,
                519,
                40
            ], arguments);
            var l = new (__recognizer4597791.logProbe([
                    520,
                    20,
                    520,
                    29
                ], ArrayList))();
            for (var i = 0; __recognizer4597791.logProbe([
                    522,
                    24,
                    522,
                    25
                ], i) < function () {
                    var obj = __recognizer4597791.logProbe([
                            522,
                            28,
                            522,
                            32
                        ], this), fn = __recognizer4597791.logProbe([
                            522,
                            33,
                            522,
                            42
                        ], obj.getLength);
                    return fn.apply(obj, arguments);
                }.bind(this)(); __recognizer4597791.logProbe([
                    522,
                    46,
                    522,
                    47
                ], i)++) {
                (function () {
                    var obj = __recognizer4597791.logProbe([
                            523,
                            12,
                            523,
                            13
                        ], l), fn = __recognizer4597791.logProbe([
                            523,
                            14,
                            523,
                            17
                        ], obj.add);
                    return fn.apply(obj, arguments);
                }.bind(this)(function () {
                    var obj = __recognizer4597791.logProbe([
                            523,
                            18,
                            523,
                            22
                        ], this), fn = __recognizer4597791.logProbe([
                            523,
                            23,
                            523,
                            28
                        ], obj.getAt);
                    return fn.apply(obj, arguments);
                }.bind(this)(__recognizer4597791.logProbe([
                    523,
                    29,
                    523,
                    30
                ], i))));
            }
            return __recognizer4597791.logProbe([
                526,
                15,
                526,
                16
            ], l);
        };
        ArrayList.prototype.forEach = function (f) {
            __recognizer4597791.logEntry([
                529,
                34,
                529,
                42
            ], arguments);
            for (var i = 0; __recognizer4597791.logProbe([
                    530,
                    24,
                    530,
                    25
                ], i) < function () {
                    var obj = __recognizer4597791.logProbe([
                            530,
                            28,
                            530,
                            32
                        ], this), fn = __recognizer4597791.logProbe([
                            530,
                            33,
                            530,
                            42
                        ], obj.getLength);
                    return fn.apply(obj, arguments);
                }.bind(this)(); __recognizer4597791.logProbe([
                    530,
                    46,
                    530,
                    47
                ], i)++) {
                __recognizer4597791.logProbe([
                    531,
                    12,
                    531,
                    28
                ], __recognizer4597791.logProbe([
                    531,
                    12,
                    531,
                    13
                ], f)(function () {
                    var obj = __recognizer4597791.logProbe([
                            531,
                            14,
                            531,
                            18
                        ], this), fn = __recognizer4597791.logProbe([
                            531,
                            19,
                            531,
                            24
                        ], obj.getAt);
                    return fn.apply(obj, arguments);
                }.bind(this)(__recognizer4597791.logProbe([
                    531,
                    25,
                    531,
                    26
                ], i))));
            }
        };
        ArrayList.prototype.getAt = function (index) {
            __recognizer4597791.logEntry([
                535,
                32,
                535,
                40
            ], arguments);
            return __recognizer4597791.logProbe([
                536,
                29,
                536,
                34
            ], __recognizer4597791.logProbe([
                536,
                20,
                536,
                28
            ], __recognizer4597791.logProbe([
                536,
                15,
                536,
                19
            ], this)._content)[index]);
        };
        ArrayList.prototype.getLength = function () {
            __recognizer4597791.logEntry([
                539,
                36,
                539,
                44
            ], arguments);
            return __recognizer4597791.logProbe([
                540,
                29,
                540,
                35
            ], __recognizer4597791.logProbe([
                540,
                20,
                540,
                28
            ], __recognizer4597791.logProbe([
                540,
                15,
                540,
                19
            ], this)._content).length);
        };
        ArrayList.prototype.insertAt = function (index, t) {
            __recognizer4597791.logEntry([
                543,
                35,
                543,
                43
            ], arguments);
            if (__recognizer4597791.logProbe([
                    544,
                    12,
                    544,
                    17
                ], index) > function () {
                    var obj = __recognizer4597791.logProbe([
                            544,
                            20,
                            544,
                            24
                        ], this), fn = __recognizer4597791.logProbe([
                            544,
                            25,
                            544,
                            34
                        ], obj.getLength);
                    return fn.apply(obj, arguments);
                }.bind(this)() || __recognizer4597791.logProbe([
                    544,
                    40,
                    544,
                    45
                ], index) < 0) {
                throw new (__recognizer4597791.logProbe([
                    545,
                    22,
                    545,
                    31
                ], Exception))('Unbound index');
            }
            if (__recognizer4597791.logProbe([
                    548,
                    12,
                    548,
                    17
                ], index) === function () {
                    var obj = __recognizer4597791.logProbe([
                            548,
                            22,
                            548,
                            26
                        ], this), fn = __recognizer4597791.logProbe([
                            548,
                            27,
                            548,
                            36
                        ], obj.getLength);
                    return fn.apply(obj, arguments);
                }.bind(this)() || function () {
                    var obj = __recognizer4597791.logProbe([
                            548,
                            42,
                            548,
                            46
                        ], this), fn = __recognizer4597791.logProbe([
                            548,
                            47,
                            548,
                            56
                        ], obj.getLength);
                    return fn.apply(obj, arguments);
                }.bind(this)() === 0) {
                (function () {
                    var obj = __recognizer4597791.logProbe([
                            549,
                            12,
                            549,
                            16
                        ], this), fn = __recognizer4597791.logProbe([
                            549,
                            17,
                            549,
                            20
                        ], obj.add);
                    return fn.apply(obj, arguments);
                }.bind(this)(__recognizer4597791.logProbe([
                    549,
                    21,
                    549,
                    22
                ], t)));
                return;
            }
            (function () {
                var obj = __recognizer4597791.logProbe([
                        553,
                        13,
                        553,
                        21
                    ], __recognizer4597791.logProbe([
                        553,
                        8,
                        553,
                        12
                    ], this)._content), fn = __recognizer4597791.logProbe([
                        553,
                        22,
                        553,
                        28
                    ], obj.splice);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                553,
                29,
                553,
                34
            ], index), 0, __recognizer4597791.logProbe([
                553,
                39,
                553,
                40
            ], t)));
        };
        ArrayList.prototype.map = function (f) {
            __recognizer4597791.logEntry([
                556,
                30,
                556,
                38
            ], arguments);
            for (var i = 0; __recognizer4597791.logProbe([
                    557,
                    24,
                    557,
                    25
                ], i) < __recognizer4597791.logProbe([
                    557,
                    42,
                    557,
                    48
                ], __recognizer4597791.logProbe([
                    557,
                    33,
                    557,
                    41
                ], __recognizer4597791.logProbe([
                    557,
                    28,
                    557,
                    32
                ], this)._content).length); __recognizer4597791.logProbe([
                    557,
                    50,
                    557,
                    51
                ], i)++) {
                __recognizer4597791.logProbe([
                    558,
                    12,
                    558,
                    31
                ], __recognizer4597791.logProbe([
                    558,
                    12,
                    558,
                    13
                ], f)(__recognizer4597791.logProbe([
                    558,
                    28,
                    558,
                    29
                ], __recognizer4597791.logProbe([
                    558,
                    19,
                    558,
                    27
                ], __recognizer4597791.logProbe([
                    558,
                    14,
                    558,
                    18
                ], this)._content)[i])));
            }
        };
        ArrayList.prototype.toArray = function () {
            __recognizer4597791.logEntry([
                562,
                34,
                562,
                42
            ], arguments);
            return __recognizer4597791.logProbe([
                563,
                20,
                563,
                28
            ], __recognizer4597791.logProbe([
                563,
                15,
                563,
                19
            ], this)._content);
        };
        return __recognizer4597791.logProbe([
            565,
            11,
            565,
            20
        ], ArrayList);
    }(__recognizer4597791.logProbe([
        566,
        3,
        566,
        11
    ], TSObject));
var SQLError = function () {
        __recognizer4597791.logEntry([
            568,
            16,
            568,
            24
        ], arguments);
        function SQLError(error) {
            __recognizer4597791.logEntry([
                569,
                13,
                569,
                21
            ], arguments);
            this._error = __recognizer4597791.logProbe([
                570,
                22,
                570,
                27
            ], error);
        }
        SQLError.prototype.getCode = function () {
            __recognizer4597791.logEntry([
                572,
                33,
                572,
                41
            ], arguments);
            return __recognizer4597791.logProbe([
                573,
                27,
                573,
                31
            ], __recognizer4597791.logProbe([
                573,
                20,
                573,
                26
            ], __recognizer4597791.logProbe([
                573,
                15,
                573,
                19
            ], this)._error).code);
        };
        SQLError.prototype.getMessage = function () {
            __recognizer4597791.logEntry([
                576,
                36,
                576,
                44
            ], arguments);
            return __recognizer4597791.logProbe([
                577,
                27,
                577,
                34
            ], __recognizer4597791.logProbe([
                577,
                20,
                577,
                26
            ], __recognizer4597791.logProbe([
                577,
                15,
                577,
                19
            ], this)._error).message);
        };
        return __recognizer4597791.logProbe([
            579,
            11,
            579,
            19
        ], SQLError);
    }();
var SQLRowSet = function () {
        __recognizer4597791.logEntry([
            582,
            17,
            582,
            25
        ], arguments);
        function SQLRowSet(rowSet) {
            __recognizer4597791.logEntry([
                583,
                13,
                583,
                22
            ], arguments);
            this._rows = __recognizer4597791.logProbe([
                584,
                21,
                584,
                27
            ], rowSet);
        }
        SQLRowSet.prototype.getLength = function () {
            __recognizer4597791.logEntry([
                586,
                36,
                586,
                44
            ], arguments);
            return __recognizer4597791.logProbe([
                587,
                26,
                587,
                32
            ], __recognizer4597791.logProbe([
                587,
                20,
                587,
                25
            ], __recognizer4597791.logProbe([
                587,
                15,
                587,
                19
            ], this)._rows).length);
        };
        SQLRowSet.prototype.item = function (i) {
            __recognizer4597791.logEntry([
                590,
                31,
                590,
                39
            ], arguments);
            return function () {
                var obj = __recognizer4597791.logProbe([
                        591,
                        20,
                        591,
                        25
                    ], __recognizer4597791.logProbe([
                        591,
                        15,
                        591,
                        19
                    ], this)._rows), fn = __recognizer4597791.logProbe([
                        591,
                        26,
                        591,
                        30
                    ], obj.item);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                591,
                31,
                591,
                32
            ], i));
        };
        return __recognizer4597791.logProbe([
            593,
            11,
            593,
            20
        ], SQLRowSet);
    }();
var SQLResultSet = function () {
        __recognizer4597791.logEntry([
            596,
            20,
            596,
            28
        ], arguments);
        function SQLResultSet(set) {
            __recognizer4597791.logEntry([
                597,
                13,
                597,
                25
            ], arguments);
            this._set = __recognizer4597791.logProbe([
                598,
                20,
                598,
                23
            ], set);
        }
        SQLResultSet.prototype.getInsertId = function () {
            __recognizer4597791.logEntry([
                600,
                41,
                600,
                49
            ], arguments);
            return __recognizer4597791.logProbe([
                601,
                25,
                601,
                33
            ], __recognizer4597791.logProbe([
                601,
                20,
                601,
                24
            ], __recognizer4597791.logProbe([
                601,
                15,
                601,
                19
            ], this)._set).insertId);
        };
        SQLResultSet.prototype.getRowsAffected = function () {
            __recognizer4597791.logEntry([
                604,
                45,
                604,
                53
            ], arguments);
            return __recognizer4597791.logProbe([
                605,
                25,
                605,
                37
            ], __recognizer4597791.logProbe([
                605,
                20,
                605,
                24
            ], __recognizer4597791.logProbe([
                605,
                15,
                605,
                19
            ], this)._set).rowsAffected);
        };
        SQLResultSet.prototype.getRows = function () {
            __recognizer4597791.logEntry([
                608,
                37,
                608,
                45
            ], arguments);
            return new (__recognizer4597791.logProbe([
                609,
                19,
                609,
                28
            ], SQLRowSet))(__recognizer4597791.logProbe([
                609,
                39,
                609,
                43
            ], __recognizer4597791.logProbe([
                609,
                34,
                609,
                38
            ], __recognizer4597791.logProbe([
                609,
                29,
                609,
                33
            ], this)._set).rows));
        };
        return __recognizer4597791.logProbe([
            611,
            11,
            611,
            23
        ], SQLResultSet);
    }();
var SQLTransaction = function () {
        __recognizer4597791.logEntry([
            614,
            22,
            614,
            30
        ], arguments);
        function SQLTransaction(transaction) {
            __recognizer4597791.logEntry([
                615,
                13,
                615,
                27
            ], arguments);
            this._tx = __recognizer4597791.logProbe([
                616,
                19,
                616,
                30
            ], transaction);
        }
        SQLTransaction.prototype.execute = function (statement, arguments, success, error) {
            __recognizer4597791.logEntry([
                618,
                39,
                618,
                47
            ], arguments);
            (function () {
                var obj = __recognizer4597791.logProbe([
                        619,
                        13,
                        619,
                        16
                    ], __recognizer4597791.logProbe([
                        619,
                        8,
                        619,
                        12
                    ], this)._tx), fn = __recognizer4597791.logProbe([
                        619,
                        17,
                        619,
                        27
                    ], obj.executeSql);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                619,
                28,
                619,
                37
            ], statement), __recognizer4597791.logProbe([
                619,
                39,
                619,
                48
            ], arguments), function (o, results) {
                __recognizer4597791.logEntry([
                    619,
                    50,
                    619,
                    58
                ], arguments);
                __recognizer4597791.logProbe([
                    620,
                    12,
                    620,
                    69
                ], __recognizer4597791.logProbe([
                    620,
                    12,
                    620,
                    19
                ], success)(new (__recognizer4597791.logProbe([
                    620,
                    24,
                    620,
                    38
                ], SQLTransaction))(__recognizer4597791.logProbe([
                    620,
                    39,
                    620,
                    40
                ], o)), new (__recognizer4597791.logProbe([
                    620,
                    47,
                    620,
                    59
                ], SQLResultSet))(__recognizer4597791.logProbe([
                    620,
                    60,
                    620,
                    67
                ], results))));
            }, function (tx, e) {
                __recognizer4597791.logEntry([
                    621,
                    11,
                    621,
                    19
                ], arguments);
                __recognizer4597791.logProbe([
                    622,
                    12,
                    622,
                    58
                ], __recognizer4597791.logProbe([
                    622,
                    12,
                    622,
                    17
                ], error)(new (__recognizer4597791.logProbe([
                    622,
                    22,
                    622,
                    36
                ], SQLTransaction))(__recognizer4597791.logProbe([
                    622,
                    37,
                    622,
                    39
                ], tx)), new (__recognizer4597791.logProbe([
                    622,
                    46,
                    622,
                    54
                ], SQLError))(__recognizer4597791.logProbe([
                    622,
                    55,
                    622,
                    56
                ], e))));
            }));
        };
        return __recognizer4597791.logProbe([
            625,
            11,
            625,
            25
        ], SQLTransaction);
    }();
var SQLDatabase = function () {
        __recognizer4597791.logEntry([
            628,
            19,
            628,
            27
        ], arguments);
        function SQLDatabase(dbObj) {
            __recognizer4597791.logEntry([
                629,
                13,
                629,
                24
            ], arguments);
            this._db = __recognizer4597791.logProbe([
                630,
                19,
                630,
                24
            ], dbObj);
        }
        SQLDatabase.open = function (name, version, displayName, size, callback) {
            __recognizer4597791.logEntry([
                632,
                23,
                632,
                31
            ], arguments);
            if (typeof __recognizer4597791.logProbe([
                    633,
                    19,
                    633,
                    27
                ], callback) === 'undefined') {
                callback = null;
            }
            var db = function () {
                    var obj = __recognizer4597791.logProbe([
                            634,
                            17,
                            634,
                            23
                        ], window), fn = __recognizer4597791.logProbe([
                            634,
                            24,
                            634,
                            36
                        ], obj.openDatabase);
                    return fn.apply(obj, arguments);
                }.bind(this)(__recognizer4597791.logProbe([
                    634,
                    37,
                    634,
                    41
                ], name), __recognizer4597791.logProbe([
                    634,
                    43,
                    634,
                    50
                ], version), __recognizer4597791.logProbe([
                    634,
                    52,
                    634,
                    63
                ], displayName), __recognizer4597791.logProbe([
                    634,
                    65,
                    634,
                    69
                ], size), function (o) {
                    __recognizer4597791.logEntry([
                        634,
                        71,
                        634,
                        79
                    ], arguments);
                    __recognizer4597791.logProbe([
                        635,
                        12,
                        635,
                        40
                    ], __recognizer4597791.logProbe([
                        635,
                        12,
                        635,
                        20
                    ], callback)(new (__recognizer4597791.logProbe([
                        635,
                        25,
                        635,
                        36
                    ], SQLDatabase))(__recognizer4597791.logProbe([
                        635,
                        37,
                        635,
                        38
                    ], o))));
                });
            return new (__recognizer4597791.logProbe([
                638,
                19,
                638,
                30
            ], SQLDatabase))(__recognizer4597791.logProbe([
                638,
                31,
                638,
                33
            ], db));
        };
        SQLDatabase.prototype.transaction = function (success, error) {
            __recognizer4597791.logEntry([
                641,
                40,
                641,
                48
            ], arguments);
            if (typeof __recognizer4597791.logProbe([
                    642,
                    19,
                    642,
                    24
                ], error) === 'undefined') {
                error = null;
            }
            (function () {
                var obj = __recognizer4597791.logProbe([
                        643,
                        13,
                        643,
                        16
                    ], __recognizer4597791.logProbe([
                        643,
                        8,
                        643,
                        12
                    ], this)._db), fn = __recognizer4597791.logProbe([
                        643,
                        17,
                        643,
                        28
                    ], obj.transaction);
                return fn.apply(obj, arguments);
            }.bind(this)(function (o) {
                __recognizer4597791.logEntry([
                    643,
                    29,
                    643,
                    37
                ], arguments);
                __recognizer4597791.logProbe([
                    644,
                    12,
                    644,
                    42
                ], __recognizer4597791.logProbe([
                    644,
                    12,
                    644,
                    19
                ], success)(new (__recognizer4597791.logProbe([
                    644,
                    24,
                    644,
                    38
                ], SQLTransaction))(__recognizer4597791.logProbe([
                    644,
                    39,
                    644,
                    40
                ], o))));
            }, function (o) {
                __recognizer4597791.logEntry([
                    645,
                    11,
                    645,
                    19
                ], arguments);
                __recognizer4597791.logProbe([
                    646,
                    12,
                    646,
                    34
                ], __recognizer4597791.logProbe([
                    646,
                    12,
                    646,
                    17
                ], error)(new (__recognizer4597791.logProbe([
                    646,
                    22,
                    646,
                    30
                ], SQLError))(__recognizer4597791.logProbe([
                    646,
                    31,
                    646,
                    32
                ], o))));
            }));
        };
        return __recognizer4597791.logProbe([
            649,
            11,
            649,
            22
        ], SQLDatabase);
    }();
var ActiveRecordConfig = function (_super) {
        __recognizer4597791.logEntry([
            651,
            26,
            651,
            34
        ], arguments);
        __recognizer4597791.logProbe([
            652,
            4,
            652,
            41
        ], __recognizer4597791.logProbe([
            652,
            4,
            652,
            13
        ], __extends)(__recognizer4597791.logProbe([
            652,
            14,
            652,
            32
        ], ActiveRecordConfig), __recognizer4597791.logProbe([
            652,
            34,
            652,
            40
        ], _super)));
        function ActiveRecordConfig(databaseName, databaseVersion, databaseSize) {
            __recognizer4597791.logEntry([
                653,
                13,
                653,
                31
            ], arguments);
            if (typeof __recognizer4597791.logProbe([
                    654,
                    19,
                    654,
                    34
                ], databaseVersion) === 'undefined') {
                databaseVersion = '1.0';
            }
            if (typeof __recognizer4597791.logProbe([
                    655,
                    19,
                    655,
                    31
                ], databaseSize) === 'undefined') {
                databaseSize = 10 * 1024 * 1024;
            }
            (function () {
                var obj = __recognizer4597791.logProbe([
                        656,
                        8,
                        656,
                        14
                    ], _super), fn = __recognizer4597791.logProbe([
                        656,
                        15,
                        656,
                        19
                    ], obj.call);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                656,
                20,
                656,
                24
            ], this)));
            (function () {
                var obj = __recognizer4597791.logProbe([
                        658,
                        8,
                        658,
                        12
                    ], this), fn = __recognizer4597791.logProbe([
                        658,
                        13,
                        658,
                        28
                    ], obj.setDatabaseName);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                658,
                29,
                658,
                41
            ], databaseName)));
            (function () {
                var obj = __recognizer4597791.logProbe([
                        659,
                        8,
                        659,
                        12
                    ], this), fn = __recognizer4597791.logProbe([
                        659,
                        13,
                        659,
                        31
                    ], obj.setDatabaseVersion);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                659,
                32,
                659,
                47
            ], databaseVersion)));
            (function () {
                var obj = __recognizer4597791.logProbe([
                        660,
                        8,
                        660,
                        12
                    ], this), fn = __recognizer4597791.logProbe([
                        660,
                        13,
                        660,
                        28
                    ], obj.setDatabaseSize);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                660,
                29,
                660,
                41
            ], databaseSize)));
        }
        ActiveRecordConfig.prototype.getDatabaseName = function () {
            __recognizer4597791.logEntry([
                662,
                51,
                662,
                59
            ], arguments);
            return __recognizer4597791.logProbe([
                663,
                20,
                663,
                27
            ], __recognizer4597791.logProbe([
                663,
                15,
                663,
                19
            ], this)._dbName);
        };
        ActiveRecordConfig.prototype.setDatabaseName = function (name) {
            __recognizer4597791.logEntry([
                666,
                51,
                666,
                59
            ], arguments);
            this._dbName = __recognizer4597791.logProbe([
                667,
                23,
                667,
                27
            ], name);
        };
        ActiveRecordConfig.prototype.getDatabaseVersion = function () {
            __recognizer4597791.logEntry([
                670,
                54,
                670,
                62
            ], arguments);
            return __recognizer4597791.logProbe([
                671,
                20,
                671,
                30
            ], __recognizer4597791.logProbe([
                671,
                15,
                671,
                19
            ], this)._dbVersion);
        };
        ActiveRecordConfig.prototype.setDatabaseVersion = function (version) {
            __recognizer4597791.logEntry([
                674,
                54,
                674,
                62
            ], arguments);
            this._dbVersion = __recognizer4597791.logProbe([
                675,
                26,
                675,
                33
            ], version);
        };
        ActiveRecordConfig.prototype.getDatabaseSize = function () {
            __recognizer4597791.logEntry([
                678,
                51,
                678,
                59
            ], arguments);
            return __recognizer4597791.logProbe([
                679,
                20,
                679,
                27
            ], __recognizer4597791.logProbe([
                679,
                15,
                679,
                19
            ], this)._dbSize);
        };
        ActiveRecordConfig.prototype.setDatabaseSize = function (size) {
            __recognizer4597791.logEntry([
                682,
                51,
                682,
                59
            ], arguments);
            this._dbSize = __recognizer4597791.logProbe([
                683,
                23,
                683,
                27
            ], size);
        };
        return __recognizer4597791.logProbe([
            685,
            11,
            685,
            29
        ], ActiveRecordConfig);
    }(__recognizer4597791.logProbe([
        686,
        3,
        686,
        11
    ], TSObject));
var ActiveRecordException = function (_super) {
        __recognizer4597791.logEntry([
            687,
            29,
            687,
            37
        ], arguments);
        __recognizer4597791.logProbe([
            688,
            4,
            688,
            44
        ], __recognizer4597791.logProbe([
            688,
            4,
            688,
            13
        ], __extends)(__recognizer4597791.logProbe([
            688,
            14,
            688,
            35
        ], ActiveRecordException), __recognizer4597791.logProbe([
            688,
            37,
            688,
            43
        ], _super)));
        function ActiveRecordException(msg) {
            __recognizer4597791.logEntry([
                689,
                13,
                689,
                34
            ], arguments);
            (function () {
                var obj = __recognizer4597791.logProbe([
                        690,
                        8,
                        690,
                        14
                    ], _super), fn = __recognizer4597791.logProbe([
                        690,
                        15,
                        690,
                        19
                    ], obj.call);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                690,
                20,
                690,
                24
            ], this), __recognizer4597791.logProbe([
                690,
                26,
                690,
                29
            ], msg), 'ActiveRecordException'));
        }
        return __recognizer4597791.logProbe([
            692,
            11,
            692,
            32
        ], ActiveRecordException);
    }(__recognizer4597791.logProbe([
        693,
        3,
        693,
        12
    ], Exception));
var ActiveRecordHelper = function (_super) {
        __recognizer4597791.logEntry([
            694,
            26,
            694,
            34
        ], arguments);
        __recognizer4597791.logProbe([
            695,
            4,
            695,
            41
        ], __recognizer4597791.logProbe([
            695,
            4,
            695,
            13
        ], __extends)(__recognizer4597791.logProbe([
            695,
            14,
            695,
            32
        ], ActiveRecordHelper), __recognizer4597791.logProbe([
            695,
            34,
            695,
            40
        ], _super)));
        function ActiveRecordHelper() {
            __recognizer4597791.logEntry([
                696,
                13,
                696,
                31
            ], arguments);
            (function () {
                var obj = __recognizer4597791.logProbe([
                        697,
                        8,
                        697,
                        14
                    ], _super), fn = __recognizer4597791.logProbe([
                        697,
                        15,
                        697,
                        20
                    ], obj.apply);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                697,
                21,
                697,
                25
            ], this), __recognizer4597791.logProbe([
                697,
                27,
                697,
                36
            ], arguments)));
        }
        ActiveRecordHelper.transactionErrorHandler = function (e) {
            __recognizer4597791.logEntry([
                699,
                49,
                699,
                57
            ], arguments);
            (function () {
                var obj = __recognizer4597791.logProbe([
                        700,
                        8,
                        700,
                        11
                    ], Log), fn = __recognizer4597791.logProbe([
                        700,
                        12,
                        700,
                        17
                    ], obj.error);
                return fn.apply(obj, arguments);
            }.bind(this)(new (__recognizer4597791.logProbe([
                700,
                22,
                700,
                43
            ], ActiveRecordException))(function () {
                var obj = __recognizer4597791.logProbe([
                        700,
                        44,
                        700,
                        45
                    ], e), fn = __recognizer4597791.logProbe([
                        700,
                        46,
                        700,
                        56
                    ], obj.getMessage);
                return fn.apply(obj, arguments);
            }.bind(this)())));
        };
        ActiveRecordHelper.executeErrorHandler = function (tx, e) {
            __recognizer4597791.logEntry([
                703,
                45,
                703,
                53
            ], arguments);
            (function () {
                var obj = __recognizer4597791.logProbe([
                        704,
                        8,
                        704,
                        11
                    ], Log), fn = __recognizer4597791.logProbe([
                        704,
                        12,
                        704,
                        17
                    ], obj.error);
                return fn.apply(obj, arguments);
            }.bind(this)(new (__recognizer4597791.logProbe([
                704,
                22,
                704,
                43
            ], ActiveRecordException))(function () {
                var obj = __recognizer4597791.logProbe([
                        704,
                        44,
                        704,
                        45
                    ], e), fn = __recognizer4597791.logProbe([
                        704,
                        46,
                        704,
                        56
                    ], obj.getMessage);
                return fn.apply(obj, arguments);
            }.bind(this)())));
            return true;
        };
        ActiveRecordHelper.getListFromSQLResultSet = function (set, converter) {
            __recognizer4597791.logEntry([
                708,
                49,
                708,
                57
            ], arguments);
            if (typeof __recognizer4597791.logProbe([
                    709,
                    19,
                    709,
                    28
                ], converter) === 'undefined') {
                converter = null;
            }
            var s = function () {
                    var obj = __recognizer4597791.logProbe([
                            710,
                            16,
                            710,
                            19
                        ], set), fn = __recognizer4597791.logProbe([
                            710,
                            20,
                            710,
                            27
                        ], obj.getRows);
                    return fn.apply(obj, arguments);
                }.bind(this)();
            var outcome = new (__recognizer4597791.logProbe([
                    711,
                    26,
                    711,
                    35
                ], ArrayList))();
            for (var i = 0; __recognizer4597791.logProbe([
                    713,
                    24,
                    713,
                    25
                ], i) < function () {
                    var obj = __recognizer4597791.logProbe([
                            713,
                            28,
                            713,
                            29
                        ], s), fn = __recognizer4597791.logProbe([
                            713,
                            30,
                            713,
                            39
                        ], obj.getLength);
                    return fn.apply(obj, arguments);
                }.bind(this)(); __recognizer4597791.logProbe([
                    713,
                    43,
                    713,
                    44
                ], i)++) {
                if (__recognizer4597791.logProbe([
                        714,
                        16,
                        714,
                        25
                    ], converter) !== null) {
                    (function () {
                        var obj = __recognizer4597791.logProbe([
                                715,
                                16,
                                715,
                                23
                            ], outcome), fn = __recognizer4597791.logProbe([
                                715,
                                24,
                                715,
                                27
                            ], obj.add);
                        return fn.apply(obj, arguments);
                    }.bind(this)(__recognizer4597791.logProbe([
                        715,
                        28,
                        715,
                        48
                    ], __recognizer4597791.logProbe([
                        715,
                        28,
                        715,
                        37
                    ], converter)(function () {
                        var obj = __recognizer4597791.logProbe([
                                715,
                                38,
                                715,
                                39
                            ], s), fn = __recognizer4597791.logProbe([
                                715,
                                40,
                                715,
                                44
                            ], obj.item);
                        return fn.apply(obj, arguments);
                    }.bind(this)(__recognizer4597791.logProbe([
                        715,
                        45,
                        715,
                        46
                    ], i))))));
                } else {
                    (function () {
                        var obj = __recognizer4597791.logProbe([
                                717,
                                16,
                                717,
                                23
                            ], outcome), fn = __recognizer4597791.logProbe([
                                717,
                                24,
                                717,
                                27
                            ], obj.add);
                        return fn.apply(obj, arguments);
                    }.bind(this)(function () {
                        var obj = __recognizer4597791.logProbe([
                                717,
                                28,
                                717,
                                29
                            ], s), fn = __recognizer4597791.logProbe([
                                717,
                                30,
                                717,
                                34
                            ], obj.item);
                        return fn.apply(obj, arguments);
                    }.bind(this)(__recognizer4597791.logProbe([
                        717,
                        35,
                        717,
                        36
                    ], i))));
                }
            }
            return __recognizer4597791.logProbe([
                721,
                15,
                721,
                22
            ], outcome);
        };
        return __recognizer4597791.logProbe([
            723,
            11,
            723,
            29
        ], ActiveRecordHelper);
    }(__recognizer4597791.logProbe([
        724,
        3,
        724,
        11
    ], TSObject));
var ActiveRecordObject = function (_super) {
        __recognizer4597791.logEntry([
            725,
            26,
            725,
            34
        ], arguments);
        __recognizer4597791.logProbe([
            726,
            4,
            726,
            41
        ], __recognizer4597791.logProbe([
            726,
            4,
            726,
            13
        ], __extends)(__recognizer4597791.logProbe([
            726,
            14,
            726,
            32
        ], ActiveRecordObject), __recognizer4597791.logProbe([
            726,
            34,
            726,
            40
        ], _super)));
        function ActiveRecordObject() {
            __recognizer4597791.logEntry([
                727,
                13,
                727,
                31
            ], arguments);
            (function () {
                var obj = __recognizer4597791.logProbe([
                        728,
                        8,
                        728,
                        14
                    ], _super), fn = __recognizer4597791.logProbe([
                        728,
                        15,
                        728,
                        20
                    ], obj.apply);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                728,
                21,
                728,
                25
            ], this), __recognizer4597791.logProbe([
                728,
                27,
                728,
                36
            ], arguments)));
        }
        ActiveRecordObject._init = function () {
            __recognizer4597791.logEntry([
                730,
                31,
                730,
                39
            ], arguments);
            if (!function () {
                    var obj = __recognizer4597791.logProbe([
                            731,
                            13,
                            731,
                            21
                        ], TSObject), fn = __recognizer4597791.logProbe([
                            731,
                            22,
                            731,
                            28
                        ], obj.exists);
                    return fn.apply(obj, arguments);
                }.bind(this)(__recognizer4597791.logProbe([
                    731,
                    48,
                    731,
                    58
                ], __recognizer4597791.logProbe([
                    731,
                    29,
                    731,
                    47
                ], ActiveRecordObject)._currentDB))) {
                ActiveRecordObject._currentDB = function () {
                    var obj = __recognizer4597791.logProbe([
                            732,
                            44,
                            732,
                            55
                        ], SQLDatabase), fn = __recognizer4597791.logProbe([
                            732,
                            56,
                            732,
                            60
                        ], obj.open);
                    return fn.apply(obj, arguments);
                }.bind(this)(function () {
                    var obj = __recognizer4597791.logProbe([
                            732,
                            80,
                            732,
                            94
                        ], __recognizer4597791.logProbe([
                            732,
                            61,
                            732,
                            79
                        ], ActiveRecordObject)._currentConfig), fn = __recognizer4597791.logProbe([
                            732,
                            95,
                            732,
                            110
                        ], obj.getDatabaseName);
                    return fn.apply(obj, arguments);
                }.bind(this)(), function () {
                    var obj = __recognizer4597791.logProbe([
                            732,
                            133,
                            732,
                            147
                        ], __recognizer4597791.logProbe([
                            732,
                            114,
                            732,
                            132
                        ], ActiveRecordObject)._currentConfig), fn = __recognizer4597791.logProbe([
                            732,
                            148,
                            732,
                            166
                        ], obj.getDatabaseVersion);
                    return fn.apply(obj, arguments);
                }.bind(this)(), function () {
                    var obj = __recognizer4597791.logProbe([
                            732,
                            189,
                            732,
                            203
                        ], __recognizer4597791.logProbe([
                            732,
                            170,
                            732,
                            188
                        ], ActiveRecordObject)._currentConfig), fn = __recognizer4597791.logProbe([
                            732,
                            204,
                            732,
                            219
                        ], obj.getDatabaseName);
                    return fn.apply(obj, arguments);
                }.bind(this)(), function () {
                    var obj = __recognizer4597791.logProbe([
                            732,
                            242,
                            732,
                            256
                        ], __recognizer4597791.logProbe([
                            732,
                            223,
                            732,
                            241
                        ], ActiveRecordObject)._currentConfig), fn = __recognizer4597791.logProbe([
                            732,
                            257,
                            732,
                            272
                        ], obj.getDatabaseSize);
                    return fn.apply(obj, arguments);
                }.bind(this)());
            }
        };
        ActiveRecordObject.init = function (config) {
            __recognizer4597791.logEntry([
                736,
                30,
                736,
                38
            ], arguments);
            ActiveRecordObject._currentConfig = __recognizer4597791.logProbe([
                737,
                44,
                737,
                50
            ], config);
        };
        ActiveRecordObject.get = function (table, callback, converter) {
            __recognizer4597791.logEntry([
                740,
                29,
                740,
                37
            ], arguments);
            if (typeof __recognizer4597791.logProbe([
                    741,
                    19,
                    741,
                    28
                ], converter) === 'undefined') {
                converter = null;
            }
            (function () {
                var obj = __recognizer4597791.logProbe([
                        742,
                        8,
                        742,
                        26
                    ], ActiveRecordObject), fn = __recognizer4597791.logProbe([
                        742,
                        27,
                        742,
                        32
                    ], obj._init);
                return fn.apply(obj, arguments);
            }.bind(this)());
            (function () {
                var obj = __recognizer4597791.logProbe([
                        743,
                        27,
                        743,
                        37
                    ], __recognizer4597791.logProbe([
                        743,
                        8,
                        743,
                        26
                    ], ActiveRecordObject)._currentDB), fn = __recognizer4597791.logProbe([
                        743,
                        38,
                        743,
                        49
                    ], obj.transaction);
                return fn.apply(obj, arguments);
            }.bind(this)(function (tx) {
                __recognizer4597791.logEntry([
                    743,
                    50,
                    743,
                    58
                ], arguments);
                (function () {
                    var obj = __recognizer4597791.logProbe([
                            744,
                            12,
                            744,
                            14
                        ], tx), fn = __recognizer4597791.logProbe([
                            744,
                            15,
                            744,
                            22
                        ], obj.execute);
                    return fn.apply(obj, arguments);
                }.bind(this)('SELECT * FROM ?', [__recognizer4597791.logProbe([
                        744,
                        43,
                        744,
                        48
                    ], table)], function (tx, outcome) {
                    __recognizer4597791.logEntry([
                        744,
                        51,
                        744,
                        59
                    ], arguments);
                    __recognizer4597791.logProbe([
                        745,
                        16,
                        745,
                        88
                    ], __recognizer4597791.logProbe([
                        745,
                        16,
                        745,
                        24
                    ], callback)(function () {
                        var obj = __recognizer4597791.logProbe([
                                745,
                                25,
                                745,
                                43
                            ], ActiveRecordHelper), fn = __recognizer4597791.logProbe([
                                745,
                                44,
                                745,
                                67
                            ], obj.getListFromSQLResultSet);
                        return fn.apply(obj, arguments);
                    }.bind(this)(__recognizer4597791.logProbe([
                        745,
                        68,
                        745,
                        75
                    ], outcome), __recognizer4597791.logProbe([
                        745,
                        77,
                        745,
                        86
                    ], converter))));
                }, __recognizer4597791.logProbe([
                    746,
                    34,
                    746,
                    53
                ], __recognizer4597791.logProbe([
                    746,
                    15,
                    746,
                    33
                ], ActiveRecordHelper).executeErrorHandler)));
            }, __recognizer4597791.logProbe([
                747,
                30,
                747,
                53
            ], __recognizer4597791.logProbe([
                747,
                11,
                747,
                29
            ], ActiveRecordHelper).transactionErrorHandler)));
        };
        ActiveRecordObject.insert = function (table, data, callback) {
            __recognizer4597791.logEntry([
                750,
                32,
                750,
                40
            ], arguments);
            if (typeof __recognizer4597791.logProbe([
                    751,
                    19,
                    751,
                    27
                ], callback) === 'undefined') {
                callback = null;
            }
            if (!function () {
                    var obj = __recognizer4597791.logProbe([
                            752,
                            13,
                            752,
                            21
                        ], TSObject), fn = __recognizer4597791.logProbe([
                            752,
                            22,
                            752,
                            28
                        ], obj.exists);
                    return fn.apply(obj, arguments);
                }.bind(this)(__recognizer4597791.logProbe([
                    752,
                    29,
                    752,
                    33
                ], data))) {
                (function () {
                    var obj = __recognizer4597791.logProbe([
                            753,
                            12,
                            753,
                            15
                        ], Log), fn = __recognizer4597791.logProbe([
                            753,
                            16,
                            753,
                            21
                        ], obj.error);
                    return fn.apply(obj, arguments);
                }.bind(this)(new (__recognizer4597791.logProbe([
                    753,
                    26,
                    753,
                    47
                ], ActiveRecordException))('insert(): Provided data are undefined')));
                if (__recognizer4597791.logProbe([
                        754,
                        16,
                        754,
                        24
                    ], callback) !== null) {
                    __recognizer4597791.logProbe([
                        755,
                        16,
                        755,
                        31
                    ], __recognizer4597791.logProbe([
                        755,
                        16,
                        755,
                        24
                    ], callback)(false));
                }
                return;
            }
            (function () {
                var obj = __recognizer4597791.logProbe([
                        760,
                        8,
                        760,
                        26
                    ], ActiveRecordObject), fn = __recognizer4597791.logProbe([
                        760,
                        27,
                        760,
                        32
                    ], obj._init);
                return fn.apply(obj, arguments);
            }.bind(this)());
            (function () {
                var obj = __recognizer4597791.logProbe([
                        761,
                        27,
                        761,
                        37
                    ], __recognizer4597791.logProbe([
                        761,
                        8,
                        761,
                        26
                    ], ActiveRecordObject)._currentDB), fn = __recognizer4597791.logProbe([
                        761,
                        38,
                        761,
                        49
                    ], obj.transaction);
                return fn.apply(obj, arguments);
            }.bind(this)(function (tx) {
                __recognizer4597791.logEntry([
                    761,
                    50,
                    761,
                    58
                ], arguments);
                var args;
                var s = new (__recognizer4597791.logProbe([
                        763,
                        24,
                        763,
                        36
                    ], StringBuffer))();
                (function () {
                    var obj = __recognizer4597791.logProbe([
                            764,
                            12,
                            764,
                            13
                        ], s), fn = __recognizer4597791.logProbe([
                            764,
                            14,
                            764,
                            20
                        ], obj.append);
                    return fn.apply(obj, arguments);
                }.bind(this)('('));
                for (var i = 0; __recognizer4597791.logProbe([
                        766,
                        28,
                        766,
                        29
                    ], i) < function () {
                        var obj = __recognizer4597791.logProbe([
                                766,
                                32,
                                766,
                                36
                            ], data), fn = __recognizer4597791.logProbe([
                                766,
                                37,
                                766,
                                46
                            ], obj.getLength);
                        return fn.apply(obj, arguments);
                    }.bind(this)(); __recognizer4597791.logProbe([
                        766,
                        50,
                        766,
                        51
                    ], i)++) {
                    if (__recognizer4597791.logProbe([
                            767,
                            20,
                            767,
                            21
                        ], i) === 0) {
                        (function () {
                            var obj = __recognizer4597791.logProbe([
                                    768,
                                    20,
                                    768,
                                    21
                                ], s), fn = __recognizer4597791.logProbe([
                                    768,
                                    22,
                                    768,
                                    28
                                ], obj.append);
                            return fn.apply(obj, arguments);
                        }.bind(this)('?'));
                    } else {
                        (function () {
                            var obj = __recognizer4597791.logProbe([
                                    770,
                                    20,
                                    770,
                                    21
                                ], s), fn = __recognizer4597791.logProbe([
                                    770,
                                    22,
                                    770,
                                    28
                                ], obj.append);
                            return fn.apply(obj, arguments);
                        }.bind(this)(', ?'));
                    }
                }
                (function () {
                    var obj = __recognizer4597791.logProbe([
                            774,
                            12,
                            774,
                            13
                        ], s), fn = __recognizer4597791.logProbe([
                            774,
                            14,
                            774,
                            20
                        ], obj.append);
                    return fn.apply(obj, arguments);
                }.bind(this)(')'));
                args = function () {
                    var obj = __recognizer4597791.logProbe([
                            775,
                            19,
                            775,
                            23
                        ], data), fn = __recognizer4597791.logProbe([
                            775,
                            24,
                            775,
                            29
                        ], obj.clone);
                    return fn.apply(obj, arguments);
                }.bind(this)();
                (function () {
                    var obj = __recognizer4597791.logProbe([
                            776,
                            12,
                            776,
                            16
                        ], args), fn = __recognizer4597791.logProbe([
                            776,
                            17,
                            776,
                            25
                        ], obj.insertAt);
                    return fn.apply(obj, arguments);
                }.bind(this)(0, __recognizer4597791.logProbe([
                    776,
                    29,
                    776,
                    34
                ], table)));
                (function () {
                    var obj = __recognizer4597791.logProbe([
                            778,
                            12,
                            778,
                            14
                        ], tx), fn = __recognizer4597791.logProbe([
                            778,
                            15,
                            778,
                            22
                        ], obj.execute);
                    return fn.apply(obj, arguments);
                }.bind(this)('INSERT INTO ? VALUES ' + function () {
                    var obj = __recognizer4597791.logProbe([
                            778,
                            49,
                            778,
                            50
                        ], s), fn = __recognizer4597791.logProbe([
                            778,
                            51,
                            778,
                            59
                        ], obj.toString);
                    return fn.apply(obj, arguments);
                }.bind(this)(), function () {
                    var obj = __recognizer4597791.logProbe([
                            778,
                            63,
                            778,
                            67
                        ], args), fn = __recognizer4597791.logProbe([
                            778,
                            68,
                            778,
                            75
                        ], obj.toArray);
                    return fn.apply(obj, arguments);
                }.bind(this)(), function (tx, outcome) {
                    __recognizer4597791.logEntry([
                        778,
                        79,
                        778,
                        87
                    ], arguments);
                    if (__recognizer4597791.logProbe([
                            779,
                            20,
                            779,
                            28
                        ], callback) !== null) {
                        __recognizer4597791.logProbe([
                            780,
                            20,
                            780,
                            34
                        ], __recognizer4597791.logProbe([
                            780,
                            20,
                            780,
                            28
                        ], callback)(true));
                    }
                }, __recognizer4597791.logProbe([
                    782,
                    34,
                    782,
                    53
                ], __recognizer4597791.logProbe([
                    782,
                    15,
                    782,
                    33
                ], ActiveRecordHelper).executeErrorHandler)));
            }, __recognizer4597791.logProbe([
                783,
                30,
                783,
                53
            ], __recognizer4597791.logProbe([
                783,
                11,
                783,
                29
            ], ActiveRecordHelper).transactionErrorHandler)));
        };
        ActiveRecordObject.update = function (table, selector, data, callback) {
            __recognizer4597791.logEntry([
                786,
                32,
                786,
                40
            ], arguments);
            if (typeof __recognizer4597791.logProbe([
                    787,
                    19,
                    787,
                    27
                ], callback) === 'undefined') {
                callback = null;
            }
            if (!function () {
                    var obj = __recognizer4597791.logProbe([
                            788,
                            13,
                            788,
                            21
                        ], TSObject), fn = __recognizer4597791.logProbe([
                            788,
                            22,
                            788,
                            28
                        ], obj.exists);
                    return fn.apply(obj, arguments);
                }.bind(this)(__recognizer4597791.logProbe([
                    788,
                    29,
                    788,
                    33
                ], data))) {
                (function () {
                    var obj = __recognizer4597791.logProbe([
                            789,
                            12,
                            789,
                            15
                        ], Log), fn = __recognizer4597791.logProbe([
                            789,
                            16,
                            789,
                            21
                        ], obj.error);
                    return fn.apply(obj, arguments);
                }.bind(this)(new (__recognizer4597791.logProbe([
                    789,
                    26,
                    789,
                    47
                ], ActiveRecordException))('update(): Provided data are undefined')));
                if (__recognizer4597791.logProbe([
                        790,
                        16,
                        790,
                        24
                    ], callback) !== null) {
                    __recognizer4597791.logProbe([
                        791,
                        16,
                        791,
                        31
                    ], __recognizer4597791.logProbe([
                        791,
                        16,
                        791,
                        24
                    ], callback)(false));
                }
                return;
            }
            (function () {
                var obj = __recognizer4597791.logProbe([
                        796,
                        8,
                        796,
                        26
                    ], ActiveRecordObject), fn = __recognizer4597791.logProbe([
                        796,
                        27,
                        796,
                        32
                    ], obj._init);
                return fn.apply(obj, arguments);
            }.bind(this)());
            (function () {
                var obj = __recognizer4597791.logProbe([
                        797,
                        27,
                        797,
                        37
                    ], __recognizer4597791.logProbe([
                        797,
                        8,
                        797,
                        26
                    ], ActiveRecordObject)._currentDB), fn = __recognizer4597791.logProbe([
                        797,
                        38,
                        797,
                        49
                    ], obj.transaction);
                return fn.apply(obj, arguments);
            }.bind(this)(function (tx) {
                __recognizer4597791.logEntry([
                    797,
                    50,
                    797,
                    58
                ], arguments);
                var args;
                var marks = new (__recognizer4597791.logProbe([
                        799,
                        28,
                        799,
                        40
                    ], StringBuffer))();
                for (var i = 0; __recognizer4597791.logProbe([
                        801,
                        28,
                        801,
                        29
                    ], i) < function () {
                        var obj = __recognizer4597791.logProbe([
                                801,
                                32,
                                801,
                                36
                            ], data), fn = __recognizer4597791.logProbe([
                                801,
                                37,
                                801,
                                46
                            ], obj.getLength);
                        return fn.apply(obj, arguments);
                    }.bind(this)(); __recognizer4597791.logProbe([
                        801,
                        50,
                        801,
                        51
                    ], i)++) {
                    if (__recognizer4597791.logProbe([
                            802,
                            20,
                            802,
                            21
                        ], i) === 0) {
                        (function () {
                            var obj = __recognizer4597791.logProbe([
                                    803,
                                    20,
                                    803,
                                    25
                                ], marks), fn = __recognizer4597791.logProbe([
                                    803,
                                    26,
                                    803,
                                    32
                                ], obj.append);
                            return fn.apply(obj, arguments);
                        }.bind(this)('? = ?'));
                    } else {
                        (function () {
                            var obj = __recognizer4597791.logProbe([
                                    805,
                                    20,
                                    805,
                                    25
                                ], marks), fn = __recognizer4597791.logProbe([
                                    805,
                                    26,
                                    805,
                                    32
                                ], obj.append);
                            return fn.apply(obj, arguments);
                        }.bind(this)(', ? = ?'));
                    }
                }
                (function () {
                    var obj = __recognizer4597791.logProbe([
                            809,
                            12,
                            809,
                            16
                        ], data), fn = __recognizer4597791.logProbe([
                            809,
                            17,
                            809,
                            24
                        ], obj.forEach);
                    return fn.apply(obj, arguments);
                }.bind(this)(function (k, v) {
                    __recognizer4597791.logEntry([
                        809,
                        25,
                        809,
                        33
                    ], arguments);
                    (function () {
                        var obj = __recognizer4597791.logProbe([
                                810,
                                16,
                                810,
                                20
                            ], args), fn = __recognizer4597791.logProbe([
                                810,
                                21,
                                810,
                                24
                            ], obj.add);
                        return fn.apply(obj, arguments);
                    }.bind(this)(__recognizer4597791.logProbe([
                        810,
                        25,
                        810,
                        26
                    ], k)));
                    (function () {
                        var obj = __recognizer4597791.logProbe([
                                811,
                                16,
                                811,
                                20
                            ], args), fn = __recognizer4597791.logProbe([
                                811,
                                21,
                                811,
                                24
                            ], obj.add);
                        return fn.apply(obj, arguments);
                    }.bind(this)(__recognizer4597791.logProbe([
                        811,
                        25,
                        811,
                        26
                    ], v)));
                }));
                (function () {
                    var obj = __recognizer4597791.logProbe([
                            814,
                            12,
                            814,
                            16
                        ], args), fn = __recognizer4597791.logProbe([
                            814,
                            17,
                            814,
                            25
                        ], obj.insertAt);
                    return fn.apply(obj, arguments);
                }.bind(this)(0, __recognizer4597791.logProbe([
                    814,
                    29,
                    814,
                    34
                ], table)));
                (function () {
                    var obj = __recognizer4597791.logProbe([
                            815,
                            12,
                            815,
                            16
                        ], args), fn = __recognizer4597791.logProbe([
                            815,
                            17,
                            815,
                            20
                        ], obj.add);
                    return fn.apply(obj, arguments);
                }.bind(this)(function () {
                    var obj = __recognizer4597791.logProbe([
                            815,
                            21,
                            815,
                            29
                        ], selector), fn = __recognizer4597791.logProbe([
                            815,
                            30,
                            815,
                            38
                        ], obj.getFirst);
                    return fn.apply(obj, arguments);
                }.bind(this)()));
                (function () {
                    var obj = __recognizer4597791.logProbe([
                            816,
                            12,
                            816,
                            16
                        ], args), fn = __recognizer4597791.logProbe([
                            816,
                            17,
                            816,
                            20
                        ], obj.add);
                    return fn.apply(obj, arguments);
                }.bind(this)(function () {
                    var obj = __recognizer4597791.logProbe([
                            816,
                            21,
                            816,
                            29
                        ], selector), fn = __recognizer4597791.logProbe([
                            816,
                            30,
                            816,
                            39
                        ], obj.getSecond);
                    return fn.apply(obj, arguments);
                }.bind(this)()));
                (function () {
                    var obj = __recognizer4597791.logProbe([
                            818,
                            12,
                            818,
                            14
                        ], tx), fn = __recognizer4597791.logProbe([
                            818,
                            15,
                            818,
                            22
                        ], obj.execute);
                    return fn.apply(obj, arguments);
                }.bind(this)('UPDATE INTO ? SET ' + function () {
                    var obj = __recognizer4597791.logProbe([
                            818,
                            46,
                            818,
                            51
                        ], marks), fn = __recognizer4597791.logProbe([
                            818,
                            52,
                            818,
                            60
                        ], obj.toString);
                    return fn.apply(obj, arguments);
                }.bind(this)() + ' WHERE ? = ?', function () {
                    var obj = __recognizer4597791.logProbe([
                            818,
                            81,
                            818,
                            85
                        ], args), fn = __recognizer4597791.logProbe([
                            818,
                            86,
                            818,
                            93
                        ], obj.toArray);
                    return fn.apply(obj, arguments);
                }.bind(this)(), function (tx, outcome) {
                    __recognizer4597791.logEntry([
                        818,
                        97,
                        818,
                        105
                    ], arguments);
                    if (__recognizer4597791.logProbe([
                            819,
                            20,
                            819,
                            28
                        ], callback) !== null) {
                        __recognizer4597791.logProbe([
                            820,
                            20,
                            820,
                            34
                        ], __recognizer4597791.logProbe([
                            820,
                            20,
                            820,
                            28
                        ], callback)(true));
                    }
                }, __recognizer4597791.logProbe([
                    822,
                    34,
                    822,
                    53
                ], __recognizer4597791.logProbe([
                    822,
                    15,
                    822,
                    33
                ], ActiveRecordHelper).executeErrorHandler)));
            }, __recognizer4597791.logProbe([
                823,
                30,
                823,
                53
            ], __recognizer4597791.logProbe([
                823,
                11,
                823,
                29
            ], ActiveRecordHelper).transactionErrorHandler)));
        };
        ActiveRecordObject.couple = function (table, pairs, callback) {
            __recognizer4597791.logEntry([
                826,
                32,
                826,
                40
            ], arguments);
            if (typeof __recognizer4597791.logProbe([
                    827,
                    19,
                    827,
                    27
                ], callback) === 'undefined') {
                callback = null;
            }
            if (!function () {
                    var obj = __recognizer4597791.logProbe([
                            828,
                            13,
                            828,
                            21
                        ], TSObject), fn = __recognizer4597791.logProbe([
                            828,
                            22,
                            828,
                            28
                        ], obj.exists);
                    return fn.apply(obj, arguments);
                }.bind(this)(__recognizer4597791.logProbe([
                    828,
                    29,
                    828,
                    34
                ], pairs))) {
                (function () {
                    var obj = __recognizer4597791.logProbe([
                            829,
                            12,
                            829,
                            15
                        ], Log), fn = __recognizer4597791.logProbe([
                            829,
                            16,
                            829,
                            21
                        ], obj.error);
                    return fn.apply(obj, arguments);
                }.bind(this)(new (__recognizer4597791.logProbe([
                    829,
                    26,
                    829,
                    47
                ], ActiveRecordException))('couple(): Provided pairs are undefined')));
                if (__recognizer4597791.logProbe([
                        830,
                        16,
                        830,
                        24
                    ], callback) !== null) {
                    __recognizer4597791.logProbe([
                        831,
                        16,
                        831,
                        31
                    ], __recognizer4597791.logProbe([
                        831,
                        16,
                        831,
                        24
                    ], callback)(false));
                }
                return;
            }
            (function () {
                var obj = __recognizer4597791.logProbe([
                        836,
                        8,
                        836,
                        26
                    ], ActiveRecordObject), fn = __recognizer4597791.logProbe([
                        836,
                        27,
                        836,
                        32
                    ], obj._init);
                return fn.apply(obj, arguments);
            }.bind(this)());
            (function () {
                var obj = __recognizer4597791.logProbe([
                        837,
                        27,
                        837,
                        37
                    ], __recognizer4597791.logProbe([
                        837,
                        8,
                        837,
                        26
                    ], ActiveRecordObject)._currentDB), fn = __recognizer4597791.logProbe([
                        837,
                        38,
                        837,
                        49
                    ], obj.transaction);
                return fn.apply(obj, arguments);
            }.bind(this)(function (tx) {
                __recognizer4597791.logEntry([
                    837,
                    50,
                    837,
                    58
                ], arguments);
                for (var i = 0; __recognizer4597791.logProbe([
                        838,
                        28,
                        838,
                        29
                    ], i) < function () {
                        var obj = __recognizer4597791.logProbe([
                                838,
                                32,
                                838,
                                37
                            ], pairs), fn = __recognizer4597791.logProbe([
                                838,
                                38,
                                838,
                                47
                            ], obj.getLength);
                        return fn.apply(obj, arguments);
                    }.bind(this)(); __recognizer4597791.logProbe([
                        838,
                        51,
                        838,
                        52
                    ], i)++) {
                    var p = function () {
                            var obj = __recognizer4597791.logProbe([
                                    839,
                                    24,
                                    839,
                                    29
                                ], pairs), fn = __recognizer4597791.logProbe([
                                    839,
                                    30,
                                    839,
                                    35
                                ], obj.getAt);
                            return fn.apply(obj, arguments);
                        }.bind(this)(__recognizer4597791.logProbe([
                            839,
                            36,
                            839,
                            37
                        ], i));
                    var args = new (__recognizer4597791.logProbe([
                            840,
                            31,
                            840,
                            40
                        ], ArrayList))();
                    (function () {
                        var obj = __recognizer4597791.logProbe([
                                842,
                                16,
                                842,
                                20
                            ], args), fn = __recognizer4597791.logProbe([
                                842,
                                21,
                                842,
                                24
                            ], obj.add);
                        return fn.apply(obj, arguments);
                    }.bind(this)(__recognizer4597791.logProbe([
                        842,
                        25,
                        842,
                        30
                    ], table)));
                    (function () {
                        var obj = __recognizer4597791.logProbe([
                                843,
                                16,
                                843,
                                20
                            ], args), fn = __recognizer4597791.logProbe([
                                843,
                                21,
                                843,
                                24
                            ], obj.add);
                        return fn.apply(obj, arguments);
                    }.bind(this)(function () {
                        var obj = __recognizer4597791.logProbe([
                                843,
                                25,
                                843,
                                26
                            ], p), fn = __recognizer4597791.logProbe([
                                843,
                                27,
                                843,
                                35
                            ], obj.getFirst);
                        return fn.apply(obj, arguments);
                    }.bind(this)()));
                    (function () {
                        var obj = __recognizer4597791.logProbe([
                                844,
                                16,
                                844,
                                20
                            ], args), fn = __recognizer4597791.logProbe([
                                844,
                                21,
                                844,
                                24
                            ], obj.add);
                        return fn.apply(obj, arguments);
                    }.bind(this)(function () {
                        var obj = __recognizer4597791.logProbe([
                                844,
                                25,
                                844,
                                26
                            ], p), fn = __recognizer4597791.logProbe([
                                844,
                                27,
                                844,
                                36
                            ], obj.getSecond);
                        return fn.apply(obj, arguments);
                    }.bind(this)()));
                    (function () {
                        var obj = __recognizer4597791.logProbe([
                                846,
                                16,
                                846,
                                18
                            ], tx), fn = __recognizer4597791.logProbe([
                                846,
                                19,
                                846,
                                26
                            ], obj.execute);
                        return fn.apply(obj, arguments);
                    }.bind(this)('INSERT INTO ? VALUES (?, ?)', function () {
                        var obj = __recognizer4597791.logProbe([
                                846,
                                58,
                                846,
                                62
                            ], args), fn = __recognizer4597791.logProbe([
                                846,
                                63,
                                846,
                                70
                            ], obj.toArray);
                        return fn.apply(obj, arguments);
                    }.bind(this)(), function (tx, outcome) {
                        __recognizer4597791.logEntry([
                            846,
                            74,
                            846,
                            82
                        ], arguments);
                        if (__recognizer4597791.logProbe([
                                847,
                                24,
                                847,
                                32
                            ], callback) !== null) {
                            __recognizer4597791.logProbe([
                                848,
                                24,
                                848,
                                38
                            ], __recognizer4597791.logProbe([
                                848,
                                24,
                                848,
                                32
                            ], callback)(true));
                        }
                    }, __recognizer4597791.logProbe([
                        850,
                        38,
                        850,
                        57
                    ], __recognizer4597791.logProbe([
                        850,
                        19,
                        850,
                        37
                    ], ActiveRecordHelper).executeErrorHandler)));
                }
            }, __recognizer4597791.logProbe([
                852,
                30,
                852,
                53
            ], __recognizer4597791.logProbe([
                852,
                11,
                852,
                29
            ], ActiveRecordHelper).transactionErrorHandler)));
        };
        return __recognizer4597791.logProbe([
            854,
            11,
            854,
            29
        ], ActiveRecordObject);
    }(__recognizer4597791.logProbe([
        855,
        3,
        855,
        11
    ], TSObject));
var AjaxRequest = function (_super) {
        __recognizer4597791.logEntry([
            857,
            19,
            857,
            27
        ], arguments);
        __recognizer4597791.logProbe([
            858,
            4,
            858,
            34
        ], __recognizer4597791.logProbe([
            858,
            4,
            858,
            13
        ], __extends)(__recognizer4597791.logProbe([
            858,
            14,
            858,
            25
        ], AjaxRequest), __recognizer4597791.logProbe([
            858,
            27,
            858,
            33
        ], _super)));
        function AjaxRequest(url) {
            __recognizer4597791.logEntry([
                859,
                13,
                859,
                24
            ], arguments);
            (function () {
                var obj = __recognizer4597791.logProbe([
                        860,
                        8,
                        860,
                        14
                    ], _super), fn = __recognizer4597791.logProbe([
                        860,
                        15,
                        860,
                        19
                    ], obj.call);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                860,
                20,
                860,
                24
            ], this)));
            this._errorHandler = function (xhr, status, error) {
                __recognizer4597791.logEntry([
                    862,
                    29,
                    862,
                    37
                ], arguments);
                (function () {
                    var obj = __recognizer4597791.logProbe([
                            863,
                            12,
                            863,
                            28
                        ], ExceptionHandler), fn = __recognizer4597791.logProbe([
                            863,
                            29,
                            863,
                            34
                        ], obj.throw);
                    return fn.apply(obj, arguments);
                }.bind(this)(new (__recognizer4597791.logProbe([
                    863,
                    39,
                    863,
                    59
                ], AjaxRequestException))(__recognizer4597791.logProbe([
                    863,
                    60,
                    863,
                    65
                ], error))));
            };
            this._url = __recognizer4597791.logProbe([
                866,
                20,
                866,
                23
            ], url);
        }
        AjaxRequest.prototype.setURL = function (url) {
            __recognizer4597791.logEntry([
                868,
                35,
                868,
                43
            ], arguments);
            this._url = __recognizer4597791.logProbe([
                869,
                20,
                869,
                23
            ], url);
            return __recognizer4597791.logProbe([
                870,
                15,
                870,
                19
            ], this);
        };
        AjaxRequest.prototype.setType = function (type) {
            __recognizer4597791.logEntry([
                873,
                36,
                873,
                44
            ], arguments);
            this._type = __recognizer4597791.logProbe([
                874,
                21,
                874,
                25
            ], type);
            return __recognizer4597791.logProbe([
                875,
                15,
                875,
                19
            ], this);
        };
        AjaxRequest.prototype.setDataType = function (dataType) {
            __recognizer4597791.logEntry([
                878,
                40,
                878,
                48
            ], arguments);
            this._dataType = __recognizer4597791.logProbe([
                879,
                25,
                879,
                33
            ], dataType);
            return __recognizer4597791.logProbe([
                880,
                15,
                880,
                19
            ], this);
        };
        AjaxRequest.prototype.setData = function (obj) {
            __recognizer4597791.logEntry([
                883,
                36,
                883,
                44
            ], arguments);
            this._data = __recognizer4597791.logProbe([
                884,
                21,
                884,
                24
            ], obj);
            return __recognizer4597791.logProbe([
                885,
                15,
                885,
                19
            ], this);
        };
        AjaxRequest.prototype.setErrorHandler = function (h) {
            __recognizer4597791.logEntry([
                888,
                44,
                888,
                52
            ], arguments);
            this._errorHandler = __recognizer4597791.logProbe([
                889,
                29,
                889,
                30
            ], h);
            return __recognizer4597791.logProbe([
                890,
                15,
                890,
                19
            ], this);
        };
        AjaxRequest.prototype.execute = function (success) {
            __recognizer4597791.logEntry([
                893,
                36,
                893,
                44
            ], arguments);
            (function () {
                var obj = __recognizer4597791.logProbe([
                        894,
                        8,
                        894,
                        14
                    ], jQuery), fn = __recognizer4597791.logProbe([
                        894,
                        15,
                        894,
                        19
                    ], obj.ajax);
                return fn.apply(obj, arguments);
            }.bind(this)({
                type: __recognizer4597791.logProbe([
                    895,
                    23,
                    895,
                    28
                ], __recognizer4597791.logProbe([
                    895,
                    18,
                    895,
                    22
                ], this)._type),
                dataType: __recognizer4597791.logProbe([
                    896,
                    27,
                    896,
                    36
                ], __recognizer4597791.logProbe([
                    896,
                    22,
                    896,
                    26
                ], this)._dataType),
                url: __recognizer4597791.logProbe([
                    897,
                    22,
                    897,
                    26
                ], __recognizer4597791.logProbe([
                    897,
                    17,
                    897,
                    21
                ], this)._url),
                data: __recognizer4597791.logProbe([
                    898,
                    23,
                    898,
                    28
                ], __recognizer4597791.logProbe([
                    898,
                    18,
                    898,
                    22
                ], this)._data),
                success: success,
                error: __recognizer4597791.logProbe([
                    900,
                    24,
                    900,
                    37
                ], __recognizer4597791.logProbe([
                    900,
                    19,
                    900,
                    23
                ], this)._errorHandler)
            }));
        };
        return __recognizer4597791.logProbe([
            903,
            11,
            903,
            22
        ], AjaxRequest);
    }(__recognizer4597791.logProbe([
        904,
        3,
        904,
        11
    ], TSObject));
var AjaxRequestDataType = function () {
        __recognizer4597791.logEntry([
            905,
            27,
            905,
            35
        ], arguments);
        function AjaxRequestDataType() {
            __recognizer4597791.logEntry([
                906,
                13,
                906,
                32
            ], arguments);
        }
        AjaxRequestDataType.Xml = 'xml';
        AjaxRequestDataType.Html = 'html';
        AjaxRequestDataType.Json = 'json';
        AjaxRequestDataType.Text = 'text';
        return __recognizer4597791.logProbe([
            915,
            11,
            915,
            30
        ], AjaxRequestDataType);
    }();
var AjaxRequestException = function (_super) {
        __recognizer4597791.logEntry([
            917,
            28,
            917,
            36
        ], arguments);
        __recognizer4597791.logProbe([
            918,
            4,
            918,
            43
        ], __recognizer4597791.logProbe([
            918,
            4,
            918,
            13
        ], __extends)(__recognizer4597791.logProbe([
            918,
            14,
            918,
            34
        ], AjaxRequestException), __recognizer4597791.logProbe([
            918,
            36,
            918,
            42
        ], _super)));
        function AjaxRequestException() {
            __recognizer4597791.logEntry([
                919,
                13,
                919,
                33
            ], arguments);
            (function () {
                var obj = __recognizer4597791.logProbe([
                        920,
                        8,
                        920,
                        14
                    ], _super), fn = __recognizer4597791.logProbe([
                        920,
                        15,
                        920,
                        20
                    ], obj.apply);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                920,
                21,
                920,
                25
            ], this), __recognizer4597791.logProbe([
                920,
                27,
                920,
                36
            ], arguments)));
        }
        return __recognizer4597791.logProbe([
            922,
            11,
            922,
            31
        ], AjaxRequestException);
    }(__recognizer4597791.logProbe([
        923,
        3,
        923,
        12
    ], Exception));
var AjaxRequestType = function () {
        __recognizer4597791.logEntry([
            924,
            23,
            924,
            31
        ], arguments);
        function AjaxRequestType() {
            __recognizer4597791.logEntry([
                925,
                13,
                925,
                28
            ], arguments);
        }
        AjaxRequestType.Get = 'GET';
        AjaxRequestType.Post = 'POST';
        AjaxRequestType.Put = 'PUT';
        AjaxRequestType.Delete = 'DELETE';
        return __recognizer4597791.logProbe([
            934,
            11,
            934,
            26
        ], AjaxRequestType);
    }();
var GetRequest = function (_super) {
        __recognizer4597791.logEntry([
            936,
            18,
            936,
            26
        ], arguments);
        __recognizer4597791.logProbe([
            937,
            4,
            937,
            33
        ], __recognizer4597791.logProbe([
            937,
            4,
            937,
            13
        ], __extends)(__recognizer4597791.logProbe([
            937,
            14,
            937,
            24
        ], GetRequest), __recognizer4597791.logProbe([
            937,
            26,
            937,
            32
        ], _super)));
        function GetRequest(url) {
            __recognizer4597791.logEntry([
                938,
                13,
                938,
                23
            ], arguments);
            (function () {
                var obj = __recognizer4597791.logProbe([
                        939,
                        8,
                        939,
                        14
                    ], _super), fn = __recognizer4597791.logProbe([
                        939,
                        15,
                        939,
                        19
                    ], obj.call);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                939,
                20,
                939,
                24
            ], this), __recognizer4597791.logProbe([
                939,
                26,
                939,
                29
            ], url)));
            (function () {
                var obj = __recognizer4597791.logProbe([
                        941,
                        8,
                        941,
                        12
                    ], this), fn = __recognizer4597791.logProbe([
                        941,
                        13,
                        941,
                        20
                    ], obj.setType);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                941,
                37,
                941,
                40
            ], __recognizer4597791.logProbe([
                941,
                21,
                941,
                36
            ], AjaxRequestType).Get)));
        }
        return __recognizer4597791.logProbe([
            943,
            11,
            943,
            21
        ], GetRequest);
    }(__recognizer4597791.logProbe([
        944,
        3,
        944,
        14
    ], AjaxRequest));
var ExceptionHandler = function (_super) {
        __recognizer4597791.logEntry([
            945,
            24,
            945,
            32
        ], arguments);
        __recognizer4597791.logProbe([
            946,
            4,
            946,
            39
        ], __recognizer4597791.logProbe([
            946,
            4,
            946,
            13
        ], __extends)(__recognizer4597791.logProbe([
            946,
            14,
            946,
            30
        ], ExceptionHandler), __recognizer4597791.logProbe([
            946,
            32,
            946,
            38
        ], _super)));
        function ExceptionHandler() {
            __recognizer4597791.logEntry([
                947,
                13,
                947,
                29
            ], arguments);
            (function () {
                var obj = __recognizer4597791.logProbe([
                        948,
                        8,
                        948,
                        14
                    ], _super), fn = __recognizer4597791.logProbe([
                        948,
                        15,
                        948,
                        20
                    ], obj.apply);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                948,
                21,
                948,
                25
            ], this), __recognizer4597791.logProbe([
                948,
                27,
                948,
                36
            ], arguments)));
        }
        ExceptionHandler.throw = function (e) {
            __recognizer4597791.logEntry([
                950,
                29,
                950,
                37
            ], arguments);
            throw __recognizer4597791.logProbe([
                951,
                14,
                951,
                15
            ], e);
        };
        return __recognizer4597791.logProbe([
            953,
            11,
            953,
            27
        ], ExceptionHandler);
    }(__recognizer4597791.logProbe([
        954,
        3,
        954,
        11
    ], TSObject));
var URLHelper = function (_super) {
        __recognizer4597791.logEntry([
            955,
            17,
            955,
            25
        ], arguments);
        __recognizer4597791.logProbe([
            956,
            4,
            956,
            32
        ], __recognizer4597791.logProbe([
            956,
            4,
            956,
            13
        ], __extends)(__recognizer4597791.logProbe([
            956,
            14,
            956,
            23
        ], URLHelper), __recognizer4597791.logProbe([
            956,
            25,
            956,
            31
        ], _super)));
        function URLHelper() {
            __recognizer4597791.logEntry([
                957,
                13,
                957,
                22
            ], arguments);
            (function () {
                var obj = __recognizer4597791.logProbe([
                        958,
                        8,
                        958,
                        14
                    ], _super), fn = __recognizer4597791.logProbe([
                        958,
                        15,
                        958,
                        20
                    ], obj.apply);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                958,
                21,
                958,
                25
            ], this), __recognizer4597791.logProbe([
                958,
                27,
                958,
                36
            ], arguments)));
        }
        URLHelper.isValid = function (url) {
            __recognizer4597791.logEntry([
                960,
                24,
                960,
                32
            ], arguments);
            var e;
            e = new (__recognizer4597791.logProbe([
                963,
                16,
                963,
                21
            ], Regex))('http://.*..*', [__recognizer4597791.logProbe([
                    963,
                    54,
                    963,
                    65
                ], __recognizer4597791.logProbe([
                    963,
                    43,
                    963,
                    53
                ], RegexFlags).Insensitive)]);
            return function () {
                var obj = __recognizer4597791.logProbe([
                        965,
                        15,
                        965,
                        16
                    ], e), fn = __recognizer4597791.logProbe([
                        965,
                        17,
                        965,
                        21
                    ], obj.test);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                965,
                22,
                965,
                25
            ], url));
        };
        return __recognizer4597791.logProbe([
            967,
            11,
            967,
            20
        ], URLHelper);
    }(__recognizer4597791.logProbe([
        968,
        3,
        968,
        11
    ], TSObject));
var URLDetailsProviderError;
(function (URLDetailsProviderError) {
    __recognizer4597791.logEntry([
        970,
        1,
        970,
        9
    ], arguments);
    URLDetailsProviderError[URLDetailsProviderError['BadURL'] = 0] = 'BadURL';
    URLDetailsProviderError[URLDetailsProviderError['NoMedata'] = 1] = 'NoMedata';
    URLDetailsProviderError[URLDetailsProviderError['Ajax'] = 2] = 'Ajax';
}(__recognizer4597791.logProbe([
    974,
    3,
    974,
    26
], URLDetailsProviderError) || (URLDetailsProviderError = {})));
var URLDetailsProvider = function (_super) {
        __recognizer4597791.logEntry([
            976,
            26,
            976,
            34
        ], arguments);
        __recognizer4597791.logProbe([
            977,
            4,
            977,
            41
        ], __recognizer4597791.logProbe([
            977,
            4,
            977,
            13
        ], __extends)(__recognizer4597791.logProbe([
            977,
            14,
            977,
            32
        ], URLDetailsProvider), __recognizer4597791.logProbe([
            977,
            34,
            977,
            40
        ], _super)));
        function URLDetailsProvider() {
            __recognizer4597791.logEntry([
                978,
                13,
                978,
                31
            ], arguments);
            (function () {
                var obj = __recognizer4597791.logProbe([
                        979,
                        8,
                        979,
                        14
                    ], _super), fn = __recognizer4597791.logProbe([
                        979,
                        15,
                        979,
                        20
                    ], obj.apply);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                979,
                21,
                979,
                25
            ], this), __recognizer4597791.logProbe([
                979,
                27,
                979,
                36
            ], arguments)));
        }
        URLDetailsProvider.getDetails = function (url, success, errorHandler) {
            __recognizer4597791.logEntry([
                981,
                36,
                981,
                44
            ], arguments);
            if (function () {
                    var obj = __recognizer4597791.logProbe([
                            982,
                            12,
                            982,
                            21
                        ], URLHelper), fn = __recognizer4597791.logProbe([
                            982,
                            22,
                            982,
                            29
                        ], obj.isValid);
                    return fn.apply(obj, arguments);
                }.bind(this)(__recognizer4597791.logProbe([
                    982,
                    30,
                    982,
                    33
                ], url))) {
                var request;
                request = new (__recognizer4597791.logProbe([
                    985,
                    26,
                    985,
                    36
                ], GetRequest))(__recognizer4597791.logProbe([
                    985,
                    37,
                    985,
                    40
                ], url));
                (function () {
                    var obj = __recognizer4597791.logProbe([
                            986,
                            12,
                            986,
                            19
                        ], request), fn = __recognizer4597791.logProbe([
                            986,
                            20,
                            986,
                            31
                        ], obj.setDataType);
                    return fn.apply(obj, arguments);
                }.bind(this)(__recognizer4597791.logProbe([
                    986,
                    52,
                    986,
                    56
                ], __recognizer4597791.logProbe([
                    986,
                    32,
                    986,
                    51
                ], AjaxRequestDataType).Html)));
                (function () {
                    var obj = __recognizer4597791.logProbe([
                            987,
                            12,
                            987,
                            19
                        ], request), fn = __recognizer4597791.logProbe([
                            987,
                            20,
                            987,
                            35
                        ], obj.setErrorHandler);
                    return fn.apply(obj, arguments);
                }.bind(this)(function (xhr, status, error) {
                    __recognizer4597791.logEntry([
                        987,
                        36,
                        987,
                        44
                    ], arguments);
                    __recognizer4597791.logProbe([
                        988,
                        16,
                        988,
                        49
                    ], __recognizer4597791.logProbe([
                        988,
                        16,
                        988,
                        28
                    ], errorHandler)(2, __recognizer4597791.logProbe([
                        988,
                        43,
                        988,
                        48
                    ], error)));
                }));
                (function () {
                    var obj = __recognizer4597791.logProbe([
                            990,
                            12,
                            990,
                            19
                        ], request), fn = __recognizer4597791.logProbe([
                            990,
                            20,
                            990,
                            27
                        ], obj.execute);
                    return fn.apply(obj, arguments);
                }.bind(this)(function (data, status, xhr) {
                    __recognizer4597791.logEntry([
                        990,
                        28,
                        990,
                        36
                    ], arguments);
                    var title;
                    var description;
                    var r1, r2;
                    r1 = new (__recognizer4597791.logProbe([
                        995,
                        25,
                        995,
                        30
                    ], Regex))('<title>(.*)</title>', [__recognizer4597791.logProbe([
                            995,
                            71,
                            995,
                            82
                        ], __recognizer4597791.logProbe([
                            995,
                            60,
                            995,
                            70
                        ], RegexFlags).Insensitive)]);
                    title = function () {
                        var obj = __recognizer4597791.logProbe([
                                996,
                                24,
                                996,
                                26
                            ], r1), fn = __recognizer4597791.logProbe([
                                996,
                                27,
                                996,
                                34
                            ], obj.execute);
                        return fn.apply(obj, arguments);
                    }.bind(this)(__recognizer4597791.logProbe([
                        996,
                        35,
                        996,
                        39
                    ], data));
                    r2 = new (__recognizer4597791.logProbe([
                        998,
                        25,
                        998,
                        30
                    ], Regex))('<meta name="description" content="(.*)"', [__recognizer4597791.logProbe([
                            998,
                            93,
                            998,
                            104
                        ], __recognizer4597791.logProbe([
                            998,
                            82,
                            998,
                            92
                        ], RegexFlags).Insensitive)]);
                    description = function () {
                        var obj = __recognizer4597791.logProbe([
                                999,
                                30,
                                999,
                                32
                            ], r2), fn = __recognizer4597791.logProbe([
                                999,
                                33,
                                999,
                                40
                            ], obj.execute);
                        return fn.apply(obj, arguments);
                    }.bind(this)(__recognizer4597791.logProbe([
                        999,
                        41,
                        999,
                        45
                    ], data));
                    __recognizer4597791.logProbe([
                        1001,
                        16,
                        1001,
                        43
                    ], __recognizer4597791.logProbe([
                        1001,
                        16,
                        1001,
                        23
                    ], success)(__recognizer4597791.logProbe([
                        1001,
                        24,
                        1001,
                        29
                    ], title), __recognizer4597791.logProbe([
                        1001,
                        31,
                        1001,
                        42
                    ], description)));
                }));
            } else {
                __recognizer4597791.logProbe([
                    1004,
                    12,
                    1004,
                    64
                ], __recognizer4597791.logProbe([
                    1004,
                    12,
                    1004,
                    24
                ], errorHandler)(0, 'URL is bad formatted'));
            }
        };
        return __recognizer4597791.logProbe([
            1007,
            11,
            1007,
            29
        ], URLDetailsProvider);
    }(__recognizer4597791.logProbe([
        1008,
        3,
        1008,
        11
    ], TSObject));
var DataAccessObject = function (_super) {
        __recognizer4597791.logEntry([
            1009,
            24,
            1009,
            32
        ], arguments);
        __recognizer4597791.logProbe([
            1010,
            4,
            1010,
            39
        ], __recognizer4597791.logProbe([
            1010,
            4,
            1010,
            13
        ], __extends)(__recognizer4597791.logProbe([
            1010,
            14,
            1010,
            30
        ], DataAccessObject), __recognizer4597791.logProbe([
            1010,
            32,
            1010,
            38
        ], _super)));
        function DataAccessObject() {
            __recognizer4597791.logEntry([
                1011,
                13,
                1011,
                29
            ], arguments);
            (function () {
                var obj = __recognizer4597791.logProbe([
                        1012,
                        8,
                        1012,
                        14
                    ], _super), fn = __recognizer4597791.logProbe([
                        1012,
                        15,
                        1012,
                        19
                    ], obj.call);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                1012,
                20,
                1012,
                24
            ], this)));
            var config = new (__recognizer4597791.logProbe([
                    1014,
                    25,
                    1014,
                    43
                ], ActiveRecordConfig))('yimello');
            (function () {
                var obj = __recognizer4597791.logProbe([
                        1016,
                        8,
                        1016,
                        26
                    ], ActiveRecordObject), fn = __recognizer4597791.logProbe([
                        1016,
                        27,
                        1016,
                        31
                    ], obj.init);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                1016,
                32,
                1016,
                38
            ], config)));
        }
        DataAccessObject.prototype.getId = function () {
            __recognizer4597791.logEntry([
                1018,
                39,
                1018,
                47
            ], arguments);
            return __recognizer4597791.logProbe([
                1019,
                20,
                1019,
                23
            ], __recognizer4597791.logProbe([
                1019,
                15,
                1019,
                19
            ], this)._id);
        };
        DataAccessObject.prototype.setId = function (id) {
            __recognizer4597791.logEntry([
                1022,
                39,
                1022,
                47
            ], arguments);
            this._id = __recognizer4597791.logProbe([
                1023,
                19,
                1023,
                21
            ], id);
            return __recognizer4597791.logProbe([
                1024,
                15,
                1024,
                19
            ], this);
        };
        return __recognizer4597791.logProbe([
            1026,
            11,
            1026,
            27
        ], DataAccessObject);
    }(__recognizer4597791.logProbe([
        1027,
        3,
        1027,
        11
    ], TSObject));
var BookmarkDAO = function (_super) {
        __recognizer4597791.logEntry([
            1028,
            19,
            1028,
            27
        ], arguments);
        __recognizer4597791.logProbe([
            1029,
            4,
            1029,
            34
        ], __recognizer4597791.logProbe([
            1029,
            4,
            1029,
            13
        ], __extends)(__recognizer4597791.logProbe([
            1029,
            14,
            1029,
            25
        ], BookmarkDAO), __recognizer4597791.logProbe([
            1029,
            27,
            1029,
            33
        ], _super)));
        function BookmarkDAO() {
            __recognizer4597791.logEntry([
                1030,
                13,
                1030,
                24
            ], arguments);
            (function () {
                var obj = __recognizer4597791.logProbe([
                        1031,
                        8,
                        1031,
                        14
                    ], _super), fn = __recognizer4597791.logProbe([
                        1031,
                        15,
                        1031,
                        20
                    ], obj.apply);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                1031,
                21,
                1031,
                25
            ], this), __recognizer4597791.logProbe([
                1031,
                27,
                1031,
                36
            ], arguments)));
        }
        BookmarkDAO.prototype.getURL = function () {
            __recognizer4597791.logEntry([
                1033,
                35,
                1033,
                43
            ], arguments);
            return __recognizer4597791.logProbe([
                1034,
                20,
                1034,
                24
            ], __recognizer4597791.logProbe([
                1034,
                15,
                1034,
                19
            ], this)._url);
        };
        BookmarkDAO.prototype.setURL = function (u) {
            __recognizer4597791.logEntry([
                1037,
                35,
                1037,
                43
            ], arguments);
            this._url = __recognizer4597791.logProbe([
                1038,
                20,
                1038,
                21
            ], u);
            return __recognizer4597791.logProbe([
                1039,
                15,
                1039,
                19
            ], this);
        };
        BookmarkDAO.prototype.getTitle = function () {
            __recognizer4597791.logEntry([
                1042,
                37,
                1042,
                45
            ], arguments);
            return __recognizer4597791.logProbe([
                1043,
                20,
                1043,
                26
            ], __recognizer4597791.logProbe([
                1043,
                15,
                1043,
                19
            ], this)._title);
        };
        BookmarkDAO.prototype.setTitle = function (t) {
            __recognizer4597791.logEntry([
                1046,
                37,
                1046,
                45
            ], arguments);
            this._title = __recognizer4597791.logProbe([
                1047,
                22,
                1047,
                23
            ], t);
            return __recognizer4597791.logProbe([
                1048,
                15,
                1048,
                19
            ], this);
        };
        BookmarkDAO.prototype.getDescription = function () {
            __recognizer4597791.logEntry([
                1051,
                43,
                1051,
                51
            ], arguments);
            return __recognizer4597791.logProbe([
                1052,
                20,
                1052,
                32
            ], __recognizer4597791.logProbe([
                1052,
                15,
                1052,
                19
            ], this)._description);
        };
        BookmarkDAO.prototype.setDescription = function (d) {
            __recognizer4597791.logEntry([
                1055,
                43,
                1055,
                51
            ], arguments);
            this._description = __recognizer4597791.logProbe([
                1056,
                28,
                1056,
                29
            ], d);
            return __recognizer4597791.logProbe([
                1057,
                15,
                1057,
                19
            ], this);
        };
        BookmarkDAO.prototype.add = function (callback) {
            __recognizer4597791.logEntry([
                1060,
                32,
                1060,
                40
            ], arguments);
            if (typeof __recognizer4597791.logProbe([
                    1061,
                    19,
                    1061,
                    27
                ], callback) === 'undefined') {
                callback = null;
            }
            var l = new (__recognizer4597791.logProbe([
                    1062,
                    20,
                    1062,
                    29
                ], ArrayList))();
            (function () {
                var obj = __recognizer4597791.logProbe([
                        1064,
                        8,
                        1064,
                        9
                    ], l), fn = __recognizer4597791.logProbe([
                        1064,
                        10,
                        1064,
                        13
                    ], obj.add);
                return fn.apply(obj, arguments);
            }.bind(this)(function () {
                var obj = __recognizer4597791.logProbe([
                        1064,
                        14,
                        1064,
                        18
                    ], this), fn = __recognizer4597791.logProbe([
                        1064,
                        19,
                        1064,
                        24
                    ], obj.getId);
                return fn.apply(obj, arguments);
            }.bind(this)()));
            (function () {
                var obj = __recognizer4597791.logProbe([
                        1065,
                        8,
                        1065,
                        9
                    ], l), fn = __recognizer4597791.logProbe([
                        1065,
                        10,
                        1065,
                        13
                    ], obj.add);
                return fn.apply(obj, arguments);
            }.bind(this)(function () {
                var obj = __recognizer4597791.logProbe([
                        1065,
                        14,
                        1065,
                        18
                    ], this), fn = __recognizer4597791.logProbe([
                        1065,
                        19,
                        1065,
                        25
                    ], obj.getURL);
                return fn.apply(obj, arguments);
            }.bind(this)()));
            (function () {
                var obj = __recognizer4597791.logProbe([
                        1066,
                        8,
                        1066,
                        9
                    ], l), fn = __recognizer4597791.logProbe([
                        1066,
                        10,
                        1066,
                        13
                    ], obj.add);
                return fn.apply(obj, arguments);
            }.bind(this)(function () {
                var obj = __recognizer4597791.logProbe([
                        1066,
                        14,
                        1066,
                        18
                    ], this), fn = __recognizer4597791.logProbe([
                        1066,
                        19,
                        1066,
                        27
                    ], obj.getTitle);
                return fn.apply(obj, arguments);
            }.bind(this)()));
            (function () {
                var obj = __recognizer4597791.logProbe([
                        1067,
                        8,
                        1067,
                        9
                    ], l), fn = __recognizer4597791.logProbe([
                        1067,
                        10,
                        1067,
                        13
                    ], obj.add);
                return fn.apply(obj, arguments);
            }.bind(this)(function () {
                var obj = __recognizer4597791.logProbe([
                        1067,
                        14,
                        1067,
                        18
                    ], this), fn = __recognizer4597791.logProbe([
                        1067,
                        19,
                        1067,
                        33
                    ], obj.getDescription);
                return fn.apply(obj, arguments);
            }.bind(this)()));
            (function () {
                var obj = __recognizer4597791.logProbe([
                        1069,
                        8,
                        1069,
                        26
                    ], ActiveRecordObject), fn = __recognizer4597791.logProbe([
                        1069,
                        27,
                        1069,
                        33
                    ], obj.insert);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                1069,
                44,
                1069,
                53
            ], __recognizer4597791.logProbe([
                1069,
                34,
                1069,
                43
            ], DAOTables).Bookmarks), __recognizer4597791.logProbe([
                1069,
                55,
                1069,
                56
            ], l), __recognizer4597791.logProbe([
                1069,
                58,
                1069,
                66
            ], callback)));
        };
        BookmarkDAO.prototype.update = function (callback) {
            __recognizer4597791.logEntry([
                1072,
                35,
                1072,
                43
            ], arguments);
            if (typeof __recognizer4597791.logProbe([
                    1073,
                    19,
                    1073,
                    27
                ], callback) === 'undefined') {
                callback = null;
            }
            var dict;
            var selector;
            dict = new (__recognizer4597791.logProbe([
                1077,
                19,
                1077,
                29
            ], Dictionary))();
            selector = new (__recognizer4597791.logProbe([
                1078,
                23,
                1078,
                27
            ], Pair))('id', function () {
                var obj = __recognizer4597791.logProbe([
                        1078,
                        34,
                        1078,
                        38
                    ], this), fn = __recognizer4597791.logProbe([
                        1078,
                        39,
                        1078,
                        44
                    ], obj.getId);
                return fn.apply(obj, arguments);
            }.bind(this)());
            (function () {
                var obj = __recognizer4597791.logProbe([
                        1080,
                        8,
                        1080,
                        12
                    ], dict), fn = __recognizer4597791.logProbe([
                        1080,
                        13,
                        1080,
                        16
                    ], obj.add);
                return fn.apply(obj, arguments);
            }.bind(this)('title', function () {
                var obj = __recognizer4597791.logProbe([
                        1080,
                        26,
                        1080,
                        30
                    ], this), fn = __recognizer4597791.logProbe([
                        1080,
                        31,
                        1080,
                        39
                    ], obj.getTitle);
                return fn.apply(obj, arguments);
            }.bind(this)()));
            (function () {
                var obj = __recognizer4597791.logProbe([
                        1081,
                        8,
                        1081,
                        12
                    ], dict), fn = __recognizer4597791.logProbe([
                        1081,
                        13,
                        1081,
                        16
                    ], obj.add);
                return fn.apply(obj, arguments);
            }.bind(this)('url', function () {
                var obj = __recognizer4597791.logProbe([
                        1081,
                        24,
                        1081,
                        28
                    ], this), fn = __recognizer4597791.logProbe([
                        1081,
                        29,
                        1081,
                        35
                    ], obj.getURL);
                return fn.apply(obj, arguments);
            }.bind(this)()));
            (function () {
                var obj = __recognizer4597791.logProbe([
                        1082,
                        8,
                        1082,
                        12
                    ], dict), fn = __recognizer4597791.logProbe([
                        1082,
                        13,
                        1082,
                        16
                    ], obj.add);
                return fn.apply(obj, arguments);
            }.bind(this)('description', function () {
                var obj = __recognizer4597791.logProbe([
                        1082,
                        32,
                        1082,
                        36
                    ], this), fn = __recognizer4597791.logProbe([
                        1082,
                        37,
                        1082,
                        51
                    ], obj.getDescription);
                return fn.apply(obj, arguments);
            }.bind(this)()));
            (function () {
                var obj = __recognizer4597791.logProbe([
                        1084,
                        8,
                        1084,
                        26
                    ], ActiveRecordObject), fn = __recognizer4597791.logProbe([
                        1084,
                        27,
                        1084,
                        33
                    ], obj.update);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                1084,
                44,
                1084,
                53
            ], __recognizer4597791.logProbe([
                1084,
                34,
                1084,
                43
            ], DAOTables).Bookmarks), __recognizer4597791.logProbe([
                1084,
                55,
                1084,
                63
            ], selector), __recognizer4597791.logProbe([
                1084,
                65,
                1084,
                69
            ], dict), __recognizer4597791.logProbe([
                1084,
                71,
                1084,
                79
            ], callback)));
        };
        BookmarkDAO.prototype.bindToTags = function (tags) {
            __recognizer4597791.logEntry([
                1087,
                39,
                1087,
                47
            ], arguments);
            var _this = __recognizer4597791.logProbe([
                    1088,
                    20,
                    1088,
                    24
                ], this);
            var l = new (__recognizer4597791.logProbe([
                    1089,
                    20,
                    1089,
                    29
                ], ArrayList))();
            (function () {
                var obj = __recognizer4597791.logProbe([
                        1091,
                        8,
                        1091,
                        12
                    ], tags), fn = __recognizer4597791.logProbe([
                        1091,
                        13,
                        1091,
                        20
                    ], obj.forEach);
                return fn.apply(obj, arguments);
            }.bind(this)(function (t) {
                __recognizer4597791.logEntry([
                    1091,
                    21,
                    1091,
                    29
                ], arguments);
                var p;
                p = new (__recognizer4597791.logProbe([
                    1093,
                    20,
                    1093,
                    24
                ], Pair))(function () {
                    var obj = __recognizer4597791.logProbe([
                            1093,
                            25,
                            1093,
                            30
                        ], _this), fn = __recognizer4597791.logProbe([
                            1093,
                            31,
                            1093,
                            36
                        ], obj.getId);
                    return fn.apply(obj, arguments);
                }.bind(this)(), function () {
                    var obj = __recognizer4597791.logProbe([
                            1093,
                            40,
                            1093,
                            41
                        ], t), fn = __recognizer4597791.logProbe([
                            1093,
                            42,
                            1093,
                            47
                        ], obj.getId);
                    return fn.apply(obj, arguments);
                }.bind(this)());
                (function () {
                    var obj = __recognizer4597791.logProbe([
                            1094,
                            12,
                            1094,
                            13
                        ], l), fn = __recognizer4597791.logProbe([
                            1094,
                            14,
                            1094,
                            17
                        ], obj.add);
                    return fn.apply(obj, arguments);
                }.bind(this)(__recognizer4597791.logProbe([
                    1094,
                    18,
                    1094,
                    19
                ], p)));
            }));
            (function () {
                var obj = __recognizer4597791.logProbe([
                        1097,
                        8,
                        1097,
                        26
                    ], ActiveRecordObject), fn = __recognizer4597791.logProbe([
                        1097,
                        27,
                        1097,
                        33
                    ], obj.couple);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                1097,
                44,
                1097,
                53
            ], __recognizer4597791.logProbe([
                1097,
                34,
                1097,
                43
            ], DAOTables).Bookmarks), __recognizer4597791.logProbe([
                1097,
                55,
                1097,
                56
            ], l)));
        };
        return __recognizer4597791.logProbe([
            1099,
            11,
            1099,
            22
        ], BookmarkDAO);
    }(__recognizer4597791.logProbe([
        1100,
        3,
        1100,
        19
    ], DataAccessObject));
var TagDAO = function (_super) {
        __recognizer4597791.logEntry([
            1101,
            14,
            1101,
            22
        ], arguments);
        __recognizer4597791.logProbe([
            1102,
            4,
            1102,
            29
        ], __recognizer4597791.logProbe([
            1102,
            4,
            1102,
            13
        ], __extends)(__recognizer4597791.logProbe([
            1102,
            14,
            1102,
            20
        ], TagDAO), __recognizer4597791.logProbe([
            1102,
            22,
            1102,
            28
        ], _super)));
        function TagDAO() {
            __recognizer4597791.logEntry([
                1103,
                13,
                1103,
                19
            ], arguments);
            (function () {
                var obj = __recognizer4597791.logProbe([
                        1104,
                        8,
                        1104,
                        14
                    ], _super), fn = __recognizer4597791.logProbe([
                        1104,
                        15,
                        1104,
                        20
                    ], obj.apply);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                1104,
                21,
                1104,
                25
            ], this), __recognizer4597791.logProbe([
                1104,
                27,
                1104,
                36
            ], arguments)));
        }
        TagDAO._fromObject = function (obj) {
            __recognizer4597791.logEntry([
                1106,
                25,
                1106,
                33
            ], arguments);
            var t = new (__recognizer4597791.logProbe([
                    1107,
                    20,
                    1107,
                    26
                ], TagDAO))();
            (function () {
                var obj = __recognizer4597791.logProbe([
                        1108,
                        8,
                        1108,
                        9
                    ], t), fn = __recognizer4597791.logProbe([
                        1108,
                        10,
                        1108,
                        15
                    ], obj.setId);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                1108,
                20,
                1108,
                22
            ], __recognizer4597791.logProbe([
                1108,
                16,
                1108,
                19
            ], obj).id)));
            (function () {
                var obj = __recognizer4597791.logProbe([
                        1109,
                        8,
                        1109,
                        9
                    ], t), fn = __recognizer4597791.logProbe([
                        1109,
                        10,
                        1109,
                        18
                    ], obj.setLabel);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                1109,
                23,
                1109,
                28
            ], __recognizer4597791.logProbe([
                1109,
                19,
                1109,
                22
            ], obj).label)));
            return __recognizer4597791.logProbe([
                1111,
                15,
                1111,
                16
            ], t);
        };
        TagDAO.prototype.getLabel = function () {
            __recognizer4597791.logEntry([
                1114,
                32,
                1114,
                40
            ], arguments);
            return __recognizer4597791.logProbe([
                1115,
                20,
                1115,
                26
            ], __recognizer4597791.logProbe([
                1115,
                15,
                1115,
                19
            ], this)._label);
        };
        TagDAO.prototype.setLabel = function (l) {
            __recognizer4597791.logEntry([
                1118,
                32,
                1118,
                40
            ], arguments);
            this._label = __recognizer4597791.logProbe([
                1119,
                22,
                1119,
                23
            ], l);
            return __recognizer4597791.logProbe([
                1120,
                15,
                1120,
                19
            ], this);
        };
        TagDAO.get = function (callback) {
            __recognizer4597791.logEntry([
                1123,
                17,
                1123,
                25
            ], arguments);
            (function () {
                var obj = __recognizer4597791.logProbe([
                        1124,
                        8,
                        1124,
                        26
                    ], ActiveRecordObject), fn = __recognizer4597791.logProbe([
                        1124,
                        27,
                        1124,
                        30
                    ], obj.get);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                1124,
                41,
                1124,
                45
            ], __recognizer4597791.logProbe([
                1124,
                31,
                1124,
                40
            ], DAOTables).Tags), __recognizer4597791.logProbe([
                1124,
                47,
                1124,
                55
            ], callback), __recognizer4597791.logProbe([
                1124,
                64,
                1124,
                75
            ], __recognizer4597791.logProbe([
                1124,
                57,
                1124,
                63
            ], TagDAO)._fromObject)));
        };
        return __recognizer4597791.logProbe([
            1126,
            11,
            1126,
            17
        ], TagDAO);
    }(__recognizer4597791.logProbe([
        1127,
        3,
        1127,
        19
    ], DataAccessObject));
var Presenter = function (_super) {
        __recognizer4597791.logEntry([
            1128,
            17,
            1128,
            25
        ], arguments);
        __recognizer4597791.logProbe([
            1129,
            4,
            1129,
            32
        ], __recognizer4597791.logProbe([
            1129,
            4,
            1129,
            13
        ], __extends)(__recognizer4597791.logProbe([
            1129,
            14,
            1129,
            23
        ], Presenter), __recognizer4597791.logProbe([
            1129,
            25,
            1129,
            31
        ], _super)));
        function Presenter() {
            __recognizer4597791.logEntry([
                1130,
                13,
                1130,
                22
            ], arguments);
            (function () {
                var obj = __recognizer4597791.logProbe([
                        1131,
                        8,
                        1131,
                        14
                    ], _super), fn = __recognizer4597791.logProbe([
                        1131,
                        15,
                        1131,
                        19
                    ], obj.call);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                1131,
                20,
                1131,
                24
            ], this)));
            (function () {
                var obj = __recognizer4597791.logProbe([
                        1133,
                        8,
                        1133,
                        25
                    ], PresenterMediator), fn = __recognizer4597791.logProbe([
                        1133,
                        26,
                        1133,
                        37
                    ], obj.setInstance);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                1133,
                38,
                1133,
                42
            ], this)));
            (function () {
                var obj = __recognizer4597791.logProbe([
                        1135,
                        8,
                        1135,
                        12
                    ], this), fn = __recognizer4597791.logProbe([
                        1135,
                        13,
                        1135,
                        21
                    ], obj._onStart);
                return fn.apply(obj, arguments);
            }.bind(this)());
            (function () {
                var obj = __recognizer4597791.logProbe([
                        1137,
                        8,
                        1137,
                        18
                    ], NodeWindow), fn = __recognizer4597791.logProbe([
                        1137,
                        19,
                        1137,
                        21
                    ], obj.on);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                1137,
                39,
                1137,
                43
            ], __recognizer4597791.logProbe([
                1137,
                22,
                1137,
                38
            ], NodeWindowEvents).Blur), __recognizer4597791.logProbe([
                1137,
                50,
                1137,
                58
            ], __recognizer4597791.logProbe([
                1137,
                45,
                1137,
                49
            ], this)._onPause)));
            (function () {
                var obj = __recognizer4597791.logProbe([
                        1138,
                        8,
                        1138,
                        18
                    ], NodeWindow), fn = __recognizer4597791.logProbe([
                        1138,
                        19,
                        1138,
                        21
                    ], obj.on);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                1138,
                39,
                1138,
                44
            ], __recognizer4597791.logProbe([
                1138,
                22,
                1138,
                38
            ], NodeWindowEvents).Focus), __recognizer4597791.logProbe([
                1138,
                51,
                1138,
                60
            ], __recognizer4597791.logProbe([
                1138,
                46,
                1138,
                50
            ], this)._onResume)));
            (function () {
                var obj = __recognizer4597791.logProbe([
                        1139,
                        8,
                        1139,
                        18
                    ], NodeWindow), fn = __recognizer4597791.logProbe([
                        1139,
                        19,
                        1139,
                        21
                    ], obj.on);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                1139,
                39,
                1139,
                44
            ], __recognizer4597791.logProbe([
                1139,
                22,
                1139,
                38
            ], NodeWindowEvents).Close), __recognizer4597791.logProbe([
                1139,
                51,
                1139,
                61
            ], __recognizer4597791.logProbe([
                1139,
                46,
                1139,
                50
            ], this)._onDestroy)));
            (function () {
                var obj = __recognizer4597791.logProbe([
                        1140,
                        8,
                        1140,
                        18
                    ], NodeWindow), fn = __recognizer4597791.logProbe([
                        1140,
                        19,
                        1140,
                        21
                    ], obj.on);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                1140,
                39,
                1140,
                43
            ], __recognizer4597791.logProbe([
                1140,
                22,
                1140,
                38
            ], NodeWindowEvents).Move), function () {
                __recognizer4597791.logEntry([
                    1140,
                    45,
                    1140,
                    53
                ], arguments);
                (function () {
                    var obj = __recognizer4597791.logProbe([
                            1141,
                            44,
                            1141,
                            53
                        ], function () {
                            var obj = __recognizer4597791.logProbe([
                                    1141,
                                    12,
                                    1141,
                                    29
                                ], PresenterMediator), fn = __recognizer4597791.logProbe([
                                    1141,
                                    30,
                                    1141,
                                    41
                                ], obj.getInstance);
                            return fn.apply(obj, arguments);
                        }.bind(this)().onDestroy), fn = __recognizer4597791.logProbe([
                            1141,
                            54,
                            1141,
                            58
                        ], obj.call);
                    return fn.apply(obj, arguments);
                }.bind(this)(function () {
                    var obj = __recognizer4597791.logProbe([
                            1141,
                            59,
                            1141,
                            76
                        ], PresenterMediator), fn = __recognizer4597791.logProbe([
                            1141,
                            77,
                            1141,
                            88
                        ], obj.getInstance);
                    return fn.apply(obj, arguments);
                }.bind(this)()));
            }));
        }
        Presenter.prototype.onStart = function () {
            __recognizer4597791.logEntry([
                1144,
                34,
                1144,
                42
            ], arguments);
        };
        Presenter.prototype.onLoad = function () {
            __recognizer4597791.logEntry([
                1147,
                33,
                1147,
                41
            ], arguments);
            (function () {
                var obj = function () {
                        var obj = __recognizer4597791.logProbe([
                                1148,
                                8,
                                1148,
                                15
                            ], DOMTree), fn = __recognizer4597791.logProbe([
                                1148,
                                16,
                                1148,
                                26
                            ], obj.findSingle);
                        return fn.apply(obj, arguments);
                    }.bind(this)('body'), fn = __recognizer4597791.logProbe([
                        1148,
                        35,
                        1148,
                        42
                    ], obj.animate);
                return fn.apply(obj, arguments);
            }.bind(this)({ opacity: 1 }, 500));
        };
        Presenter.prototype.onResume = function () {
            __recognizer4597791.logEntry([
                1153,
                35,
                1153,
                43
            ], arguments);
        };
        Presenter.prototype.onPause = function () {
            __recognizer4597791.logEntry([
                1156,
                34,
                1156,
                42
            ], arguments);
        };
        Presenter.prototype.onDestroy = function () {
            __recognizer4597791.logEntry([
                1159,
                36,
                1159,
                44
            ], arguments);
        };
        Presenter.prototype._onStart = function () {
            __recognizer4597791.logEntry([
                1162,
                35,
                1162,
                43
            ], arguments);
            (function () {
                var obj = __recognizer4597791.logProbe([
                        1163,
                        8,
                        1163,
                        12
                    ], this), fn = __recognizer4597791.logProbe([
                        1163,
                        13,
                        1163,
                        20
                    ], obj.onStart);
                return fn.apply(obj, arguments);
            }.bind(this)());
            (function () {
                var obj = __recognizer4597791.logProbe([
                        1164,
                        8,
                        1164,
                        12
                    ], this), fn = __recognizer4597791.logProbe([
                        1164,
                        13,
                        1164,
                        19
                    ], obj.onLoad);
                return fn.apply(obj, arguments);
            }.bind(this)());
        };
        Presenter.prototype._onResume = function () {
            __recognizer4597791.logEntry([
                1167,
                36,
                1167,
                44
            ], arguments);
            if (!function () {
                    var obj = __recognizer4597791.logProbe([
                            1168,
                            13,
                            1168,
                            30
                        ], PresenterMediator), fn = __recognizer4597791.logProbe([
                            1168,
                            31,
                            1168,
                            41
                        ], obj.hasResumed);
                    return fn.apply(obj, arguments);
                }.bind(this)()) {
                (function () {
                    var obj = __recognizer4597791.logProbe([
                            1169,
                            12,
                            1169,
                            29
                        ], PresenterMediator), fn = __recognizer4597791.logProbe([
                            1169,
                            30,
                            1169,
                            40
                        ], obj.setResumed);
                    return fn.apply(obj, arguments);
                }.bind(this)(true));
                (function () {
                    var obj = __recognizer4597791.logProbe([
                            1170,
                            44,
                            1170,
                            52
                        ], function () {
                            var obj = __recognizer4597791.logProbe([
                                    1170,
                                    12,
                                    1170,
                                    29
                                ], PresenterMediator), fn = __recognizer4597791.logProbe([
                                    1170,
                                    30,
                                    1170,
                                    41
                                ], obj.getInstance);
                            return fn.apply(obj, arguments);
                        }.bind(this)().onResume), fn = __recognizer4597791.logProbe([
                            1170,
                            53,
                            1170,
                            57
                        ], obj.call);
                    return fn.apply(obj, arguments);
                }.bind(this)(function () {
                    var obj = __recognizer4597791.logProbe([
                            1170,
                            58,
                            1170,
                            75
                        ], PresenterMediator), fn = __recognizer4597791.logProbe([
                            1170,
                            76,
                            1170,
                            87
                        ], obj.getInstance);
                    return fn.apply(obj, arguments);
                }.bind(this)()));
            }
        };
        Presenter.prototype._onPause = function () {
            __recognizer4597791.logEntry([
                1174,
                35,
                1174,
                43
            ], arguments);
            (function () {
                var obj = __recognizer4597791.logProbe([
                        1175,
                        8,
                        1175,
                        25
                    ], PresenterMediator), fn = __recognizer4597791.logProbe([
                        1175,
                        26,
                        1175,
                        36
                    ], obj.setResumed);
                return fn.apply(obj, arguments);
            }.bind(this)(false));
            (function () {
                var obj = __recognizer4597791.logProbe([
                        1176,
                        40,
                        1176,
                        47
                    ], function () {
                        var obj = __recognizer4597791.logProbe([
                                1176,
                                8,
                                1176,
                                25
                            ], PresenterMediator), fn = __recognizer4597791.logProbe([
                                1176,
                                26,
                                1176,
                                37
                            ], obj.getInstance);
                        return fn.apply(obj, arguments);
                    }.bind(this)().onPause), fn = __recognizer4597791.logProbe([
                        1176,
                        48,
                        1176,
                        52
                    ], obj.call);
                return fn.apply(obj, arguments);
            }.bind(this)(function () {
                var obj = __recognizer4597791.logProbe([
                        1176,
                        53,
                        1176,
                        70
                    ], PresenterMediator), fn = __recognizer4597791.logProbe([
                        1176,
                        71,
                        1176,
                        82
                    ], obj.getInstance);
                return fn.apply(obj, arguments);
            }.bind(this)()));
        };
        Presenter.prototype._onDestroy = function () {
            __recognizer4597791.logEntry([
                1179,
                37,
                1179,
                45
            ], arguments);
            (function () {
                var obj = __recognizer4597791.logProbe([
                        1180,
                        40,
                        1180,
                        49
                    ], function () {
                        var obj = __recognizer4597791.logProbe([
                                1180,
                                8,
                                1180,
                                25
                            ], PresenterMediator), fn = __recognizer4597791.logProbe([
                                1180,
                                26,
                                1180,
                                37
                            ], obj.getInstance);
                        return fn.apply(obj, arguments);
                    }.bind(this)().onDestroy), fn = __recognizer4597791.logProbe([
                        1180,
                        50,
                        1180,
                        54
                    ], obj.call);
                return fn.apply(obj, arguments);
            }.bind(this)(function () {
                var obj = __recognizer4597791.logProbe([
                        1180,
                        55,
                        1180,
                        72
                    ], PresenterMediator), fn = __recognizer4597791.logProbe([
                        1180,
                        73,
                        1180,
                        84
                    ], obj.getInstance);
                return fn.apply(obj, arguments);
            }.bind(this)()));
            (function () {
                var obj = function () {
                        var obj = __recognizer4597791.logProbe([
                                1181,
                                12,
                                1181,
                                18
                            ], __recognizer4597791.logProbe([
                                1181,
                                8,
                                1181,
                                11
                            ], gui).Window), fn = __recognizer4597791.logProbe([
                                1181,
                                19,
                                1181,
                                22
                            ], obj.get);
                        return fn.apply(obj, arguments);
                    }.bind(this)(), fn = __recognizer4597791.logProbe([
                        1181,
                        25,
                        1181,
                        30
                    ], obj.close);
                return fn.apply(obj, arguments);
            }.bind(this)());
        };
        return __recognizer4597791.logProbe([
            1183,
            11,
            1183,
            20
        ], Presenter);
    }(__recognizer4597791.logProbe([
        1184,
        3,
        1184,
        11
    ], TSObject));
var PresenterMediator = function (_super) {
        __recognizer4597791.logEntry([
            1185,
            25,
            1185,
            33
        ], arguments);
        __recognizer4597791.logProbe([
            1186,
            4,
            1186,
            40
        ], __recognizer4597791.logProbe([
            1186,
            4,
            1186,
            13
        ], __extends)(__recognizer4597791.logProbe([
            1186,
            14,
            1186,
            31
        ], PresenterMediator), __recognizer4597791.logProbe([
            1186,
            33,
            1186,
            39
        ], _super)));
        function PresenterMediator() {
            __recognizer4597791.logEntry([
                1187,
                13,
                1187,
                30
            ], arguments);
            (function () {
                var obj = __recognizer4597791.logProbe([
                        1188,
                        8,
                        1188,
                        14
                    ], _super), fn = __recognizer4597791.logProbe([
                        1188,
                        15,
                        1188,
                        20
                    ], obj.apply);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                1188,
                21,
                1188,
                25
            ], this), __recognizer4597791.logProbe([
                1188,
                27,
                1188,
                36
            ], arguments)));
        }
        PresenterMediator.getInstance = function () {
            __recognizer4597791.logEntry([
                1190,
                36,
                1190,
                44
            ], arguments);
            return __recognizer4597791.logProbe([
                1191,
                33,
                1191,
                49
            ], __recognizer4597791.logProbe([
                1191,
                15,
                1191,
                32
            ], PresenterMediator)._currentInstance);
        };
        PresenterMediator.setInstance = function (p) {
            __recognizer4597791.logEntry([
                1194,
                36,
                1194,
                44
            ], arguments);
            PresenterMediator._currentInstance = __recognizer4597791.logProbe([
                1195,
                45,
                1195,
                46
            ], p);
            PresenterMediator._hasResumed = false;
        };
        PresenterMediator.hasResumed = function () {
            __recognizer4597791.logEntry([
                1199,
                35,
                1199,
                43
            ], arguments);
            return __recognizer4597791.logProbe([
                1200,
                33,
                1200,
                44
            ], __recognizer4597791.logProbe([
                1200,
                15,
                1200,
                32
            ], PresenterMediator)._hasResumed);
        };
        PresenterMediator.setResumed = function (b) {
            __recognizer4597791.logEntry([
                1203,
                35,
                1203,
                43
            ], arguments);
            PresenterMediator._hasResumed = __recognizer4597791.logProbe([
                1204,
                40,
                1204,
                41
            ], b);
        };
        return __recognizer4597791.logProbe([
            1206,
            11,
            1206,
            28
        ], PresenterMediator);
    }(__recognizer4597791.logProbe([
        1207,
        3,
        1207,
        11
    ], TSObject));
var IntroPresenter = function (_super) {
        __recognizer4597791.logEntry([
            1208,
            22,
            1208,
            30
        ], arguments);
        __recognizer4597791.logProbe([
            1209,
            4,
            1209,
            37
        ], __recognizer4597791.logProbe([
            1209,
            4,
            1209,
            13
        ], __extends)(__recognizer4597791.logProbe([
            1209,
            14,
            1209,
            28
        ], IntroPresenter), __recognizer4597791.logProbe([
            1209,
            30,
            1209,
            36
        ], _super)));
        function IntroPresenter() {
            __recognizer4597791.logEntry([
                1210,
                13,
                1210,
                27
            ], arguments);
            (function () {
                var obj = __recognizer4597791.logProbe([
                        1211,
                        8,
                        1211,
                        14
                    ], _super), fn = __recognizer4597791.logProbe([
                        1211,
                        15,
                        1211,
                        19
                    ], obj.call);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                1211,
                20,
                1211,
                24
            ], this)));
        }
        IntroPresenter.prototype.onStart = function () {
            __recognizer4597791.logEntry([
                1213,
                39,
                1213,
                47
            ], arguments);
            var t;
            (function () {
                var obj = function () {
                        var obj = __recognizer4597791.logProbe([
                                1216,
                                8,
                                1216,
                                15
                            ], DOMTree), fn = __recognizer4597791.logProbe([
                                1216,
                                16,
                                1216,
                                26
                            ], obj.findSingle);
                        return fn.apply(obj, arguments);
                    }.bind(this)('.intro-strap'), fn = __recognizer4597791.logProbe([
                        1216,
                        43,
                        1216,
                        52
                    ], obj.centerize);
                return fn.apply(obj, arguments);
            }.bind(this)());
            t = new (__recognizer4597791.logProbe([
                1218,
                16,
                1218,
                21
            ], Timer))(function (o) {
                __recognizer4597791.logEntry([
                    1218,
                    22,
                    1218,
                    30
                ], arguments);
                (function () {
                    var obj = __recognizer4597791.logProbe([
                            1219,
                            12,
                            1219,
                            22
                        ], NodeWindow), fn = __recognizer4597791.logProbe([
                            1219,
                            23,
                            1219,
                            29
                        ], obj.moveTo);
                    return fn.apply(obj, arguments);
                }.bind(this)('tour.html'));
            }, 3000);
        };
        return __recognizer4597791.logProbe([
            1222,
            11,
            1222,
            25
        ], IntroPresenter);
    }(__recognizer4597791.logProbe([
        1223,
        3,
        1223,
        12
    ], Presenter));
var TourPresenter = function (_super) {
        __recognizer4597791.logEntry([
            1224,
            21,
            1224,
            29
        ], arguments);
        __recognizer4597791.logProbe([
            1225,
            4,
            1225,
            36
        ], __recognizer4597791.logProbe([
            1225,
            4,
            1225,
            13
        ], __extends)(__recognizer4597791.logProbe([
            1225,
            14,
            1225,
            27
        ], TourPresenter), __recognizer4597791.logProbe([
            1225,
            29,
            1225,
            35
        ], _super)));
        function TourPresenter() {
            __recognizer4597791.logEntry([
                1226,
                13,
                1226,
                26
            ], arguments);
            (function () {
                var obj = __recognizer4597791.logProbe([
                        1227,
                        8,
                        1227,
                        14
                    ], _super), fn = __recognizer4597791.logProbe([
                        1227,
                        15,
                        1227,
                        19
                    ], obj.call);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                1227,
                20,
                1227,
                24
            ], this)));
        }
        TourPresenter.prototype.onStart = function () {
            __recognizer4597791.logEntry([
                1229,
                38,
                1229,
                46
            ], arguments);
            var _this = __recognizer4597791.logProbe([
                    1230,
                    20,
                    1230,
                    24
                ], this);
            var i = 0;
            this._slides = function () {
                var obj = __recognizer4597791.logProbe([
                        1232,
                        23,
                        1232,
                        30
                    ], DOMTree), fn = __recognizer4597791.logProbe([
                        1232,
                        31,
                        1232,
                        41
                    ], obj.findSingle);
                return fn.apply(obj, arguments);
            }.bind(this)('.slides');
            this._slideCursors = function () {
                var obj = __recognizer4597791.logProbe([
                        1233,
                        29,
                        1233,
                        36
                    ], DOMTree), fn = __recognizer4597791.logProbe([
                        1233,
                        37,
                        1233,
                        47
                    ], obj.findSingle);
                return fn.apply(obj, arguments);
            }.bind(this)('.slide-cursors');
            (function () {
                var obj = function () {
                        var obj = __recognizer4597791.logProbe([
                                1235,
                                13,
                                1235,
                                20
                            ], __recognizer4597791.logProbe([
                                1235,
                                8,
                                1235,
                                12
                            ], this)._slides), fn = __recognizer4597791.logProbe([
                                1235,
                                21,
                                1235,
                                25
                            ], obj.find);
                        return fn.apply(obj, arguments);
                    }.bind(this)('.slide'), fn = __recognizer4597791.logProbe([
                        1235,
                        36,
                        1235,
                        39
                    ], obj.map);
                return fn.apply(obj, arguments);
            }.bind(this)(function (e) {
                __recognizer4597791.logEntry([
                    1235,
                    40,
                    1235,
                    48
                ], arguments);
                (function () {
                    var obj = __recognizer4597791.logProbe([
                            1236,
                            12,
                            1236,
                            13
                        ], e), fn = __recognizer4597791.logProbe([
                            1236,
                            14,
                            1236,
                            41
                        ], obj.verticalCenterizeWithMargin);
                    return fn.apply(obj, arguments);
                }.bind(this)(__recognizer4597791.logProbe([
                    1236,
                    48,
                    1236,
                    55
                ], __recognizer4597791.logProbe([
                    1236,
                    42,
                    1236,
                    47
                ], _this)._slides)));
                (function () {
                    var obj = __recognizer4597791.logProbe([
                            1237,
                            12,
                            1237,
                            13
                        ], e), fn = __recognizer4597791.logProbe([
                            1237,
                            14,
                            1237,
                            21
                        ], obj.setData);
                    return fn.apply(obj, arguments);
                }.bind(this)('id', function () {
                    var obj = __recognizer4597791.logProbe([
                            1237,
                            28,
                            1237,
                            40
                        ], NumberHelper), fn = __recognizer4597791.logProbe([
                            1237,
                            41,
                            1237,
                            49
                        ], obj.toString);
                    return fn.apply(obj, arguments);
                }.bind(this)(__recognizer4597791.logProbe([
                    1237,
                    50,
                    1237,
                    51
                ], i))));
                if (__recognizer4597791.logProbe([
                        1239,
                        16,
                        1239,
                        17
                    ], i) != 0) {
                    (function () {
                        var obj = __recognizer4597791.logProbe([
                                1240,
                                16,
                                1240,
                                17
                            ], e), fn = __recognizer4597791.logProbe([
                                1240,
                                18,
                                1240,
                                24
                            ], obj.setCss);
                        return fn.apply(obj, arguments);
                    }.bind(this)({
                        left: function () {
                            var obj = __recognizer4597791.logProbe([
                                    1241,
                                    32,
                                    1241,
                                    39
                                ], __recognizer4597791.logProbe([
                                    1241,
                                    26,
                                    1241,
                                    31
                                ], _this)._slides), fn = __recognizer4597791.logProbe([
                                    1241,
                                    40,
                                    1241,
                                    48
                                ], obj.getWidth);
                            return fn.apply(obj, arguments);
                        }.bind(this)()
                    }));
                } else {
                    _this._currentSlide = __recognizer4597791.logProbe([
                        1244,
                        38,
                        1244,
                        39
                    ], e);
                }
                (function () {
                    var obj = function () {
                            var obj = __recognizer4597791.logProbe([
                                    1247,
                                    12,
                                    1247,
                                    13
                                ], e), fn = __recognizer4597791.logProbe([
                                    1247,
                                    14,
                                    1247,
                                    18
                                ], obj.find);
                            return fn.apply(obj, arguments);
                        }.bind(this)('form'), fn = __recognizer4597791.logProbe([
                            1247,
                            27,
                            1247,
                            30
                        ], obj.map);
                    return fn.apply(obj, arguments);
                }.bind(this)(function (e) {
                    __recognizer4597791.logEntry([
                        1247,
                        31,
                        1247,
                        39
                    ], arguments);
                    (function () {
                        var obj = __recognizer4597791.logProbe([
                                1248,
                                16,
                                1248,
                                17
                            ], e), fn = __recognizer4597791.logProbe([
                                1248,
                                18,
                                1248,
                                20
                            ], obj.on);
                        return fn.apply(obj, arguments);
                    }.bind(this)(__recognizer4597791.logProbe([
                        1248,
                        38,
                        1248,
                        44
                    ], __recognizer4597791.logProbe([
                        1248,
                        21,
                        1248,
                        37
                    ], DOMElementEvents).Submit), function (arg) {
                        __recognizer4597791.logEntry([
                            1248,
                            46,
                            1248,
                            54
                        ], arguments);
                        (function () {
                            var obj = __recognizer4597791.logProbe([
                                    1249,
                                    20,
                                    1249,
                                    23
                                ], arg), fn = __recognizer4597791.logProbe([
                                    1249,
                                    24,
                                    1249,
                                    38
                                ], obj.preventDefault);
                            return fn.apply(obj, arguments);
                        }.bind(this)());
                    }));
                }));
                __recognizer4597791.logProbe([
                    1253,
                    12,
                    1253,
                    13
                ], i)++;
            }));
            (function () {
                var obj = __recognizer4597791.logProbe([
                        1256,
                        13,
                        1256,
                        26
                    ], __recognizer4597791.logProbe([
                        1256,
                        8,
                        1256,
                        12
                    ], this)._slideCursors), fn = __recognizer4597791.logProbe([
                        1256,
                        27,
                        1256,
                        54
                    ], obj.verticalCenterizeWithMargin);
                return fn.apply(obj, arguments);
            }.bind(this)(function () {
                var obj = __recognizer4597791.logProbe([
                        1256,
                        60,
                        1256,
                        73
                    ], __recognizer4597791.logProbe([
                        1256,
                        55,
                        1256,
                        59
                    ], this)._slideCursors), fn = __recognizer4597791.logProbe([
                        1256,
                        74,
                        1256,
                        80
                    ], obj.parent);
                return fn.apply(obj, arguments);
            }.bind(this)()));
            for (var j = 0; __recognizer4597791.logProbe([
                    1258,
                    24,
                    1258,
                    25
                ], j) < __recognizer4597791.logProbe([
                    1258,
                    28,
                    1258,
                    29
                ], i); __recognizer4597791.logProbe([
                    1258,
                    31,
                    1258,
                    32
                ], j)++) {
                var d = function () {
                        var obj = __recognizer4597791.logProbe([
                                1259,
                                20,
                                1259,
                                30
                            ], DOMElement), fn = __recognizer4597791.logProbe([
                                1259,
                                31,
                                1259,
                                41
                            ], obj.fromString);
                        return fn.apply(obj, arguments);
                    }.bind(this)('<li></li>');
                (function () {
                    var obj = __recognizer4597791.logProbe([
                            1260,
                            12,
                            1260,
                            13
                        ], d), fn = __recognizer4597791.logProbe([
                            1260,
                            14,
                            1260,
                            22
                        ], obj.addClass);
                    return fn.apply(obj, arguments);
                }.bind(this)('slide-cursor'));
                if (__recognizer4597791.logProbe([
                        1262,
                        16,
                        1262,
                        17
                    ], j) == 0) {
                    (function () {
                        var obj = __recognizer4597791.logProbe([
                                1263,
                                16,
                                1263,
                                17
                            ], d), fn = __recognizer4597791.logProbe([
                                1263,
                                18,
                                1263,
                                26
                            ], obj.addClass);
                        return fn.apply(obj, arguments);
                    }.bind(this)('active-cursor'));
                }
                (function () {
                    var obj = __recognizer4597791.logProbe([
                            1266,
                            12,
                            1266,
                            13
                        ], d), fn = __recognizer4597791.logProbe([
                            1266,
                            14,
                            1266,
                            21
                        ], obj.setData);
                    return fn.apply(obj, arguments);
                }.bind(this)('slide-id', function () {
                    var obj = __recognizer4597791.logProbe([
                            1266,
                            34,
                            1266,
                            46
                        ], NumberHelper), fn = __recognizer4597791.logProbe([
                            1266,
                            47,
                            1266,
                            55
                        ], obj.toString);
                    return fn.apply(obj, arguments);
                }.bind(this)(__recognizer4597791.logProbe([
                    1266,
                    56,
                    1266,
                    57
                ], j))));
                (function () {
                    var obj = __recognizer4597791.logProbe([
                            1267,
                            12,
                            1267,
                            13
                        ], d), fn = __recognizer4597791.logProbe([
                            1267,
                            14,
                            1267,
                            16
                        ], obj.on);
                    return fn.apply(obj, arguments);
                }.bind(this)(__recognizer4597791.logProbe([
                    1267,
                    34,
                    1267,
                    39
                ], __recognizer4597791.logProbe([
                    1267,
                    17,
                    1267,
                    33
                ], DOMElementEvents).Click), function (e) {
                    __recognizer4597791.logEntry([
                        1267,
                        41,
                        1267,
                        49
                    ], arguments);
                    (function () {
                        var obj = __recognizer4597791.logProbe([
                                1268,
                                16,
                                1268,
                                21
                            ], _this), fn = __recognizer4597791.logProbe([
                                1268,
                                22,
                                1268,
                                32
                            ], obj._swapSlide);
                        return fn.apply(obj, arguments);
                    }.bind(this)(function () {
                        var obj = __recognizer4597791.logProbe([
                                1268,
                                33,
                                1268,
                                45
                            ], NumberHelper), fn = __recognizer4597791.logProbe([
                                1268,
                                46,
                                1268,
                                57
                            ], obj.parseString);
                        return fn.apply(obj, arguments);
                    }.bind(this)(function () {
                        var obj = function () {
                                var obj = __recognizer4597791.logProbe([
                                        1268,
                                        58,
                                        1268,
                                        59
                                    ], e), fn = __recognizer4597791.logProbe([
                                        1268,
                                        60,
                                        1268,
                                        69
                                    ], obj.getTarget);
                                return fn.apply(obj, arguments);
                            }.bind(this)(), fn = __recognizer4597791.logProbe([
                                1268,
                                72,
                                1268,
                                79
                            ], obj.getData);
                        return fn.apply(obj, arguments);
                    }.bind(this)('slide-id'))));
                }));
                (function () {
                    var obj = __recognizer4597791.logProbe([
                            1270,
                            17,
                            1270,
                            30
                        ], __recognizer4597791.logProbe([
                            1270,
                            12,
                            1270,
                            16
                        ], this)._slideCursors), fn = __recognizer4597791.logProbe([
                            1270,
                            31,
                            1270,
                            37
                        ], obj.append);
                    return fn.apply(obj, arguments);
                }.bind(this)(__recognizer4597791.logProbe([
                    1270,
                    38,
                    1270,
                    39
                ], d)));
            }
            (function () {
                var obj = function () {
                        var obj = __recognizer4597791.logProbe([
                                1273,
                                8,
                                1273,
                                15
                            ], DOMTree), fn = __recognizer4597791.logProbe([
                                1273,
                                16,
                                1273,
                                26
                            ], obj.findSingle);
                        return fn.apply(obj, arguments);
                    }.bind(this)('.slide form.tag-form input[name="tags"]'), fn = __recognizer4597791.logProbe([
                        1273,
                        70,
                        1273,
                        72
                    ], obj.on);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                1273,
                90,
                1273,
                97
            ], __recognizer4597791.logProbe([
                1273,
                73,
                1273,
                89
            ], DOMElementEvents).KeyDown), function (e) {
                __recognizer4597791.logEntry([
                    1273,
                    99,
                    1273,
                    107
                ], arguments);
                if (function () {
                        var obj = __recognizer4597791.logProbe([
                                1274,
                                16,
                                1274,
                                17
                            ], e), fn = __recognizer4597791.logProbe([
                                1274,
                                18,
                                1274,
                                26
                            ], obj.getWhich);
                        return fn.apply(obj, arguments);
                    }.bind(this)() === 13) {
                    (function () {
                        var obj = __recognizer4597791.logProbe([
                                1275,
                                16,
                                1275,
                                21
                            ], _this), fn = __recognizer4597791.logProbe([
                                1275,
                                22,
                                1275,
                                32
                            ], obj._createTag);
                        return fn.apply(obj, arguments);
                    }.bind(this)(function () {
                        var obj = function () {
                                var obj = __recognizer4597791.logProbe([
                                        1275,
                                        33,
                                        1275,
                                        34
                                    ], e), fn = __recognizer4597791.logProbe([
                                        1275,
                                        35,
                                        1275,
                                        44
                                    ], obj.getTarget);
                                return fn.apply(obj, arguments);
                            }.bind(this)(), fn = __recognizer4597791.logProbe([
                                1275,
                                47,
                                1275,
                                55
                            ], obj.getValue);
                        return fn.apply(obj, arguments);
                    }.bind(this)()));
                    (function () {
                        var obj = function () {
                                var obj = __recognizer4597791.logProbe([
                                        1276,
                                        16,
                                        1276,
                                        17
                                    ], e), fn = __recognizer4597791.logProbe([
                                        1276,
                                        18,
                                        1276,
                                        27
                                    ], obj.getTarget);
                                return fn.apply(obj, arguments);
                            }.bind(this)(), fn = __recognizer4597791.logProbe([
                                1276,
                                30,
                                1276,
                                38
                            ], obj.setValue);
                        return fn.apply(obj, arguments);
                    }.bind(this)(''));
                }
            }));
            (function () {
                var obj = function () {
                        var obj = __recognizer4597791.logProbe([
                                1280,
                                8,
                                1280,
                                15
                            ], DOMTree), fn = __recognizer4597791.logProbe([
                                1280,
                                16,
                                1280,
                                26
                            ], obj.findSingle);
                        return fn.apply(obj, arguments);
                    }.bind(this)('#go-button'), fn = __recognizer4597791.logProbe([
                        1280,
                        41,
                        1280,
                        43
                    ], obj.on);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                1280,
                61,
                1280,
                66
            ], __recognizer4597791.logProbe([
                1280,
                44,
                1280,
                60
            ], DOMElementEvents).Click), function (e) {
                __recognizer4597791.logEntry([
                    1280,
                    68,
                    1280,
                    76
                ], arguments);
                (function () {
                    var obj = function () {
                            var obj = __recognizer4597791.logProbe([
                                    1281,
                                    12,
                                    1281,
                                    13
                                ], e), fn = __recognizer4597791.logProbe([
                                    1281,
                                    14,
                                    1281,
                                    23
                                ], obj.getTarget);
                            return fn.apply(obj, arguments);
                        }.bind(this)(), fn = __recognizer4597791.logProbe([
                            1281,
                            26,
                            1281,
                            29
                        ], obj.off);
                    return fn.apply(obj, arguments);
                }.bind(this)(__recognizer4597791.logProbe([
                    1281,
                    47,
                    1281,
                    52
                ], __recognizer4597791.logProbe([
                    1281,
                    30,
                    1281,
                    46
                ], DOMElementEvents).Click)));
                (function () {
                    var obj = __recognizer4597791.logProbe([
                            1282,
                            12,
                            1282,
                            22
                        ], NodeWindow), fn = __recognizer4597791.logProbe([
                            1282,
                            23,
                            1282,
                            29
                        ], obj.moveTo);
                    return fn.apply(obj, arguments);
                }.bind(this)('main.html'));
            }));
        };
        TourPresenter.prototype.onDestroy = function () {
            __recognizer4597791.logEntry([
                1286,
                40,
                1286,
                48
            ], arguments);
            (function () {
                var obj = function () {
                        var obj = __recognizer4597791.logProbe([
                                1287,
                                13,
                                1287,
                                26
                            ], __recognizer4597791.logProbe([
                                1287,
                                8,
                                1287,
                                12
                            ], this)._slideCursors), fn = __recognizer4597791.logProbe([
                                1287,
                                27,
                                1287,
                                31
                            ], obj.find);
                        return fn.apply(obj, arguments);
                    }.bind(this)('.slide-cursor'), fn = __recognizer4597791.logProbe([
                        1287,
                        49,
                        1287,
                        52
                    ], obj.map);
                return fn.apply(obj, arguments);
            }.bind(this)(function (e) {
                __recognizer4597791.logEntry([
                    1287,
                    53,
                    1287,
                    61
                ], arguments);
                (function () {
                    var obj = __recognizer4597791.logProbe([
                            1288,
                            12,
                            1288,
                            13
                        ], e), fn = __recognizer4597791.logProbe([
                            1288,
                            14,
                            1288,
                            17
                        ], obj.off);
                    return fn.apply(obj, arguments);
                }.bind(this)(__recognizer4597791.logProbe([
                    1288,
                    35,
                    1288,
                    40
                ], __recognizer4597791.logProbe([
                    1288,
                    18,
                    1288,
                    34
                ], DOMElementEvents).Click)));
            }));
        };
        TourPresenter.prototype._swapSlide = function (id) {
            __recognizer4597791.logEntry([
                1292,
                41,
                1292,
                49
            ], arguments);
            var currentId = function () {
                    var obj = __recognizer4597791.logProbe([
                            1293,
                            24,
                            1293,
                            36
                        ], NumberHelper), fn = __recognizer4597791.logProbe([
                            1293,
                            37,
                            1293,
                            48
                        ], obj.parseString);
                    return fn.apply(obj, arguments);
                }.bind(this)(function () {
                    var obj = __recognizer4597791.logProbe([
                            1293,
                            54,
                            1293,
                            67
                        ], __recognizer4597791.logProbe([
                            1293,
                            49,
                            1293,
                            53
                        ], this)._currentSlide), fn = __recognizer4597791.logProbe([
                            1293,
                            68,
                            1293,
                            75
                        ], obj.getData);
                    return fn.apply(obj, arguments);
                }.bind(this)('id'));
            var newSlide;
            if (__recognizer4597791.logProbe([
                    1296,
                    12,
                    1296,
                    14
                ], id) == __recognizer4597791.logProbe([
                    1296,
                    18,
                    1296,
                    27
                ], currentId)) {
                return;
            }
            newSlide = function () {
                var obj = __recognizer4597791.logProbe([
                        1300,
                        24,
                        1300,
                        31
                    ], __recognizer4597791.logProbe([
                        1300,
                        19,
                        1300,
                        23
                    ], this)._slides), fn = __recognizer4597791.logProbe([
                        1300,
                        32,
                        1300,
                        42
                    ], obj.findSingle);
                return fn.apply(obj, arguments);
            }.bind(this)('.slide[data-id="' + __recognizer4597791.logProbe([
                1300,
                64,
                1300,
                66
            ], id) + '"]');
            if (__recognizer4597791.logProbe([
                    1302,
                    12,
                    1302,
                    14
                ], id) > __recognizer4597791.logProbe([
                    1302,
                    17,
                    1302,
                    26
                ], currentId)) {
                (function () {
                    var obj = function () {
                            var obj = __recognizer4597791.logProbe([
                                    1303,
                                    12,
                                    1303,
                                    20
                                ], newSlide), fn = __recognizer4597791.logProbe([
                                    1303,
                                    21,
                                    1303,
                                    27
                                ], obj.setCss);
                            return fn.apply(obj, arguments);
                        }.bind(this)({
                            left: function () {
                                var obj = __recognizer4597791.logProbe([
                                        1304,
                                        27,
                                        1304,
                                        34
                                    ], __recognizer4597791.logProbe([
                                        1304,
                                        22,
                                        1304,
                                        26
                                    ], this)._slides), fn = __recognizer4597791.logProbe([
                                        1304,
                                        35,
                                        1304,
                                        43
                                    ], obj.getWidth);
                                return fn.apply(obj, arguments);
                            }.bind(this)()
                        }), fn = __recognizer4597791.logProbe([
                            1305,
                            15,
                            1305,
                            22
                        ], obj.animate);
                    return fn.apply(obj, arguments);
                }.bind(this)({ left: 0 }, 500));
                (function () {
                    var obj = __recognizer4597791.logProbe([
                            1308,
                            17,
                            1308,
                            30
                        ], __recognizer4597791.logProbe([
                            1308,
                            12,
                            1308,
                            16
                        ], this)._currentSlide), fn = __recognizer4597791.logProbe([
                            1308,
                            31,
                            1308,
                            38
                        ], obj.animate);
                    return fn.apply(obj, arguments);
                }.bind(this)({
                    left: -function () {
                        var obj = __recognizer4597791.logProbe([
                                1309,
                                28,
                                1309,
                                35
                            ], __recognizer4597791.logProbe([
                                1309,
                                23,
                                1309,
                                27
                            ], this)._slides), fn = __recognizer4597791.logProbe([
                                1309,
                                36,
                                1309,
                                44
                            ], obj.getWidth);
                        return fn.apply(obj, arguments);
                    }.bind(this)()
                }, 500));
            } else {
                (function () {
                    var obj = function () {
                            var obj = __recognizer4597791.logProbe([
                                    1312,
                                    12,
                                    1312,
                                    20
                                ], newSlide), fn = __recognizer4597791.logProbe([
                                    1312,
                                    21,
                                    1312,
                                    27
                                ], obj.setCss);
                            return fn.apply(obj, arguments);
                        }.bind(this)({
                            left: -function () {
                                var obj = __recognizer4597791.logProbe([
                                        1313,
                                        28,
                                        1313,
                                        35
                                    ], __recognizer4597791.logProbe([
                                        1313,
                                        23,
                                        1313,
                                        27
                                    ], this)._slides), fn = __recognizer4597791.logProbe([
                                        1313,
                                        36,
                                        1313,
                                        44
                                    ], obj.getWidth);
                                return fn.apply(obj, arguments);
                            }.bind(this)()
                        }), fn = __recognizer4597791.logProbe([
                            1314,
                            15,
                            1314,
                            22
                        ], obj.animate);
                    return fn.apply(obj, arguments);
                }.bind(this)({ left: 0 }, 500));
                (function () {
                    var obj = __recognizer4597791.logProbe([
                            1317,
                            17,
                            1317,
                            30
                        ], __recognizer4597791.logProbe([
                            1317,
                            12,
                            1317,
                            16
                        ], this)._currentSlide), fn = __recognizer4597791.logProbe([
                            1317,
                            31,
                            1317,
                            38
                        ], obj.animate);
                    return fn.apply(obj, arguments);
                }.bind(this)({
                    left: function () {
                        var obj = __recognizer4597791.logProbe([
                                1318,
                                27,
                                1318,
                                34
                            ], __recognizer4597791.logProbe([
                                1318,
                                22,
                                1318,
                                26
                            ], this)._slides), fn = __recognizer4597791.logProbe([
                                1318,
                                35,
                                1318,
                                43
                            ], obj.getWidth);
                        return fn.apply(obj, arguments);
                    }.bind(this)()
                }, 500));
            }
            (function () {
                var obj = function () {
                        var obj = __recognizer4597791.logProbe([
                                1322,
                                13,
                                1322,
                                26
                            ], __recognizer4597791.logProbe([
                                1322,
                                8,
                                1322,
                                12
                            ], this)._slideCursors), fn = __recognizer4597791.logProbe([
                                1322,
                                27,
                                1322,
                                37
                            ], obj.findSingle);
                        return fn.apply(obj, arguments);
                    }.bind(this)('.slide-cursor[data-slide-id="' + __recognizer4597791.logProbe([
                        1322,
                        72,
                        1322,
                        74
                    ], id) + '"]'), fn = __recognizer4597791.logProbe([
                        1322,
                        83,
                        1322,
                        91
                    ], obj.addClass);
                return fn.apply(obj, arguments);
            }.bind(this)('active-cursor'));
            (function () {
                var obj = function () {
                        var obj = __recognizer4597791.logProbe([
                                1323,
                                13,
                                1323,
                                26
                            ], __recognizer4597791.logProbe([
                                1323,
                                8,
                                1323,
                                12
                            ], this)._slideCursors), fn = __recognizer4597791.logProbe([
                                1323,
                                27,
                                1323,
                                37
                            ], obj.findSingle);
                        return fn.apply(obj, arguments);
                    }.bind(this)('.slide-cursor[data-slide-id="' + __recognizer4597791.logProbe([
                        1323,
                        72,
                        1323,
                        81
                    ], currentId) + '"]'), fn = __recognizer4597791.logProbe([
                        1323,
                        90,
                        1323,
                        101
                    ], obj.removeClass);
                return fn.apply(obj, arguments);
            }.bind(this)('active-cursor'));
            this._currentSlide = __recognizer4597791.logProbe([
                1325,
                29,
                1325,
                37
            ], newSlide);
        };
        TourPresenter.prototype._createTag = function (value) {
            __recognizer4597791.logEntry([
                1328,
                41,
                1328,
                49
            ], arguments);
            var tag;
            var img;
            if (__recognizer4597791.logProbe([
                    1332,
                    17,
                    1332,
                    22
                ], __recognizer4597791.logProbe([
                    1332,
                    12,
                    1332,
                    16
                ], this)._tags) == null) {
                this._tags = function () {
                    var obj = __recognizer4597791.logProbe([
                            1333,
                            25,
                            1333,
                            32
                        ], DOMTree), fn = __recognizer4597791.logProbe([
                            1333,
                            33,
                            1333,
                            43
                        ], obj.findSingle);
                    return fn.apply(obj, arguments);
                }.bind(this)('.slide .tags');
                TourPresenter._tagIds = 0;
            }
            tag = function () {
                var obj = __recognizer4597791.logProbe([
                        1337,
                        14,
                        1337,
                        24
                    ], DOMElement), fn = __recognizer4597791.logProbe([
                        1337,
                        25,
                        1337,
                        35
                    ], obj.fromString);
                return fn.apply(obj, arguments);
            }.bind(this)('<li><p>' + __recognizer4597791.logProbe([
                1337,
                48,
                1337,
                53
            ], value) + '</p></li>');
            (function () {
                var obj = __recognizer4597791.logProbe([
                        1338,
                        8,
                        1338,
                        11
                    ], tag), fn = __recognizer4597791.logProbe([
                        1338,
                        12,
                        1338,
                        20
                    ], obj.addClass);
                return fn.apply(obj, arguments);
            }.bind(this)('tag'));
            img = function () {
                var obj = __recognizer4597791.logProbe([
                        1339,
                        14,
                        1339,
                        24
                    ], DOMElement), fn = __recognizer4597791.logProbe([
                        1339,
                        25,
                        1339,
                        35
                    ], obj.fromString);
                return fn.apply(obj, arguments);
            }.bind(this)('<img />');
            (function () {
                var obj = __recognizer4597791.logProbe([
                        1340,
                        8,
                        1340,
                        11
                    ], img), fn = __recognizer4597791.logProbe([
                        1340,
                        12,
                        1340,
                        24
                    ], obj.setAttribute);
                return fn.apply(obj, arguments);
            }.bind(this)('src', 'assets/img/x-mark-icon.png'));
            (function () {
                var obj = __recognizer4597791.logProbe([
                        1341,
                        8,
                        1341,
                        11
                    ], img), fn = __recognizer4597791.logProbe([
                        1341,
                        12,
                        1341,
                        20
                    ], obj.addClass);
                return fn.apply(obj, arguments);
            }.bind(this)('delete-tag'));
            (function () {
                var obj = __recognizer4597791.logProbe([
                        1342,
                        8,
                        1342,
                        11
                    ], img), fn = __recognizer4597791.logProbe([
                        1342,
                        12,
                        1342,
                        19
                    ], obj.setData);
                return fn.apply(obj, arguments);
            }.bind(this)('tag-id', function () {
                var obj = __recognizer4597791.logProbe([
                        1342,
                        30,
                        1342,
                        42
                    ], NumberHelper), fn = __recognizer4597791.logProbe([
                        1342,
                        43,
                        1342,
                        51
                    ], obj.toString);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                1342,
                66,
                1342,
                73
            ], __recognizer4597791.logProbe([
                1342,
                52,
                1342,
                65
            ], TourPresenter)._tagIds))));
            __recognizer4597791.logProbe([
                1343,
                22,
                1343,
                29
            ], __recognizer4597791.logProbe([
                1343,
                8,
                1343,
                21
            ], TourPresenter)._tagIds)++;
            (function () {
                var obj = __recognizer4597791.logProbe([
                        1345,
                        8,
                        1345,
                        11
                    ], tag), fn = __recognizer4597791.logProbe([
                        1345,
                        12,
                        1345,
                        18
                    ], obj.append);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                1345,
                19,
                1345,
                22
            ], img)));
            (function () {
                var obj = __recognizer4597791.logProbe([
                        1346,
                        13,
                        1346,
                        18
                    ], __recognizer4597791.logProbe([
                        1346,
                        8,
                        1346,
                        12
                    ], this)._tags), fn = __recognizer4597791.logProbe([
                        1346,
                        19,
                        1346,
                        25
                    ], obj.append);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                1346,
                26,
                1346,
                29
            ], tag)));
            (function () {
                var obj = __recognizer4597791.logProbe([
                        1348,
                        8,
                        1348,
                        11
                    ], img), fn = __recognizer4597791.logProbe([
                        1348,
                        12,
                        1348,
                        14
                    ], obj.on);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                1348,
                32,
                1348,
                37
            ], __recognizer4597791.logProbe([
                1348,
                15,
                1348,
                31
            ], DOMElementEvents).Click), function (e) {
                __recognizer4597791.logEntry([
                    1348,
                    39,
                    1348,
                    47
                ], arguments);
                (function () {
                    var obj = __recognizer4597791.logProbe([
                            1349,
                            12,
                            1349,
                            15
                        ], img), fn = __recognizer4597791.logProbe([
                            1349,
                            16,
                            1349,
                            19
                        ], obj.off);
                    return fn.apply(obj, arguments);
                }.bind(this)(__recognizer4597791.logProbe([
                    1349,
                    37,
                    1349,
                    42
                ], __recognizer4597791.logProbe([
                    1349,
                    20,
                    1349,
                    36
                ], DOMElementEvents).Click)));
                (function () {
                    var obj = __recognizer4597791.logProbe([
                            1350,
                            12,
                            1350,
                            15
                        ], tag), fn = __recognizer4597791.logProbe([
                            1350,
                            16,
                            1350,
                            22
                        ], obj.remove);
                    return fn.apply(obj, arguments);
                }.bind(this)());
            }));
        };
        return __recognizer4597791.logProbe([
            1353,
            11,
            1353,
            24
        ], TourPresenter);
    }(__recognizer4597791.logProbe([
        1354,
        3,
        1354,
        12
    ], Presenter));
var MainPresenter = function (_super) {
        __recognizer4597791.logEntry([
            1355,
            21,
            1355,
            29
        ], arguments);
        __recognizer4597791.logProbe([
            1356,
            4,
            1356,
            36
        ], __recognizer4597791.logProbe([
            1356,
            4,
            1356,
            13
        ], __extends)(__recognizer4597791.logProbe([
            1356,
            14,
            1356,
            27
        ], MainPresenter), __recognizer4597791.logProbe([
            1356,
            29,
            1356,
            35
        ], _super)));
        function MainPresenter() {
            __recognizer4597791.logEntry([
                1357,
                13,
                1357,
                26
            ], arguments);
            (function () {
                var obj = __recognizer4597791.logProbe([
                        1358,
                        8,
                        1358,
                        14
                    ], _super), fn = __recognizer4597791.logProbe([
                        1358,
                        15,
                        1358,
                        20
                    ], obj.apply);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                1358,
                21,
                1358,
                25
            ], this), __recognizer4597791.logProbe([
                1358,
                27,
                1358,
                36
            ], arguments)));
        }
        MainPresenter.prototype._switchToBookmarkForm = function () {
            __recognizer4597791.logEntry([
                1360,
                52,
                1360,
                60
            ], arguments);
            (function () {
                var obj = __recognizer4597791.logProbe([
                        1361,
                        13,
                        1361,
                        29
                    ], __recognizer4597791.logProbe([
                        1361,
                        8,
                        1361,
                        12
                    ], this)._mainViewWrapper), fn = __recognizer4597791.logProbe([
                        1361,
                        30,
                        1361,
                        37
                    ], obj.animate);
                return fn.apply(obj, arguments);
            }.bind(this)({ left: '-100%' }, 500));
            (function () {
                var obj = __recognizer4597791.logProbe([
                        1365,
                        13,
                        1365,
                        33
                    ], __recognizer4597791.logProbe([
                        1365,
                        8,
                        1365,
                        12
                    ], this)._bookmarkFormWrapper), fn = __recognizer4597791.logProbe([
                        1365,
                        34,
                        1365,
                        41
                    ], obj.animate);
                return fn.apply(obj, arguments);
            }.bind(this)({ left: 0 }, 500));
        };
        MainPresenter.prototype._addTag = function (value) {
            __recognizer4597791.logEntry([
                1370,
                38,
                1370,
                46
            ], arguments);
            var e;
            (function () {
                var obj = __recognizer4597791.logProbe([
                        1373,
                        8,
                        1373,
                        15
                    ], console), fn = __recognizer4597791.logProbe([
                        1373,
                        16,
                        1373,
                        19
                    ], obj.log);
                return fn.apply(obj, arguments);
            }.bind(this)('here :' + __recognizer4597791.logProbe([
                1373,
                31,
                1373,
                36
            ], value)));
            if (!function () {
                    var obj = __recognizer4597791.logProbe([
                            1375,
                            13,
                            1375,
                            21
                        ], TSObject), fn = __recognizer4597791.logProbe([
                            1375,
                            22,
                            1375,
                            28
                        ], obj.exists);
                    return fn.apply(obj, arguments);
                }.bind(this)(__recognizer4597791.logProbe([
                    1375,
                    34,
                    1375,
                    42
                ], __recognizer4597791.logProbe([
                    1375,
                    29,
                    1375,
                    33
                ], this)._tagList))) {
                this._tagList = function () {
                    var obj = __recognizer4597791.logProbe([
                            1376,
                            33,
                            1376,
                            53
                        ], __recognizer4597791.logProbe([
                            1376,
                            28,
                            1376,
                            32
                        ], this)._bookmarkFormWrapper), fn = __recognizer4597791.logProbe([
                            1376,
                            54,
                            1376,
                            64
                        ], obj.findSingle);
                    return fn.apply(obj, arguments);
                }.bind(this)('.tags');
            }
            e = function () {
                var obj = __recognizer4597791.logProbe([
                        1379,
                        12,
                        1379,
                        22
                    ], DOMElement), fn = __recognizer4597791.logProbe([
                        1379,
                        23,
                        1379,
                        33
                    ], obj.fromString);
                return fn.apply(obj, arguments);
            }.bind(this)('<li>' + __recognizer4597791.logProbe([
                1379,
                43,
                1379,
                48
            ], value) + '</li>');
            (function () {
                var obj = __recognizer4597791.logProbe([
                        1380,
                        13,
                        1380,
                        21
                    ], __recognizer4597791.logProbe([
                        1380,
                        8,
                        1380,
                        12
                    ], this)._tagList), fn = __recognizer4597791.logProbe([
                        1380,
                        22,
                        1380,
                        28
                    ], obj.append);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                1380,
                29,
                1380,
                30
            ], e)));
        };
        MainPresenter.prototype.onStart = function () {
            __recognizer4597791.logEntry([
                1383,
                38,
                1383,
                46
            ], arguments);
            var _this = __recognizer4597791.logProbe([
                    1384,
                    20,
                    1384,
                    24
                ], this);
            this._mainViewWrapper = function () {
                var obj = __recognizer4597791.logProbe([
                        1385,
                        32,
                        1385,
                        39
                    ], DOMTree), fn = __recognizer4597791.logProbe([
                        1385,
                        40,
                        1385,
                        50
                    ], obj.findSingle);
                return fn.apply(obj, arguments);
            }.bind(this)('#js-main-view-wrapper');
            this._bookmarkFormWrapper = function () {
                var obj = __recognizer4597791.logProbe([
                        1386,
                        36,
                        1386,
                        43
                    ], DOMTree), fn = __recognizer4597791.logProbe([
                        1386,
                        44,
                        1386,
                        54
                    ], obj.findSingle);
                return fn.apply(obj, arguments);
            }.bind(this)('#js-bookmark-form-wrapper');
            this._bookmarkAddTrigger = function () {
                var obj = __recognizer4597791.logProbe([
                        1387,
                        35,
                        1387,
                        42
                    ], DOMTree), fn = __recognizer4597791.logProbe([
                        1387,
                        43,
                        1387,
                        53
                    ], obj.findSingle);
                return fn.apply(obj, arguments);
            }.bind(this)('#js-bookmark-add-trigger');
            this._urlInput = function () {
                var obj = __recognizer4597791.logProbe([
                        1388,
                        30,
                        1388,
                        50
                    ], __recognizer4597791.logProbe([
                        1388,
                        25,
                        1388,
                        29
                    ], this)._bookmarkFormWrapper), fn = __recognizer4597791.logProbe([
                        1388,
                        51,
                        1388,
                        61
                    ], obj.findSingle);
                return fn.apply(obj, arguments);
            }.bind(this)('input[name="url"]');
            this._titleInput = function () {
                var obj = __recognizer4597791.logProbe([
                        1389,
                        32,
                        1389,
                        52
                    ], __recognizer4597791.logProbe([
                        1389,
                        27,
                        1389,
                        31
                    ], this)._bookmarkFormWrapper), fn = __recognizer4597791.logProbe([
                        1389,
                        53,
                        1389,
                        63
                    ], obj.findSingle);
                return fn.apply(obj, arguments);
            }.bind(this)('input[name="title"]');
            this._descriptionInput = function () {
                var obj = __recognizer4597791.logProbe([
                        1390,
                        38,
                        1390,
                        58
                    ], __recognizer4597791.logProbe([
                        1390,
                        33,
                        1390,
                        37
                    ], this)._bookmarkFormWrapper), fn = __recognizer4597791.logProbe([
                        1390,
                        59,
                        1390,
                        69
                    ], obj.findSingle);
                return fn.apply(obj, arguments);
            }.bind(this)('textarea[name="description"]');
            this._tagsInput = function () {
                var obj = __recognizer4597791.logProbe([
                        1391,
                        31,
                        1391,
                        51
                    ], __recognizer4597791.logProbe([
                        1391,
                        26,
                        1391,
                        30
                    ], this)._bookmarkFormWrapper), fn = __recognizer4597791.logProbe([
                        1391,
                        52,
                        1391,
                        62
                    ], obj.findSingle);
                return fn.apply(obj, arguments);
            }.bind(this)('input[name="tags"]');
            (function () {
                var obj = __recognizer4597791.logProbe([
                        1393,
                        13,
                        1393,
                        32
                    ], __recognizer4597791.logProbe([
                        1393,
                        8,
                        1393,
                        12
                    ], this)._bookmarkAddTrigger), fn = __recognizer4597791.logProbe([
                        1393,
                        33,
                        1393,
                        35
                    ], obj.on);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                1393,
                53,
                1393,
                58
            ], __recognizer4597791.logProbe([
                1393,
                36,
                1393,
                52
            ], DOMElementEvents).Click), function (arg) {
                __recognizer4597791.logEntry([
                    1393,
                    60,
                    1393,
                    68
                ], arguments);
                (function () {
                    var obj = __recognizer4597791.logProbe([
                            1394,
                            12,
                            1394,
                            17
                        ], _this), fn = __recognizer4597791.logProbe([
                            1394,
                            18,
                            1394,
                            39
                        ], obj._switchToBookmarkForm);
                    return fn.apply(obj, arguments);
                }.bind(this)());
            }));
            (function () {
                var obj = function () {
                        var obj = __recognizer4597791.logProbe([
                                1397,
                                13,
                                1397,
                                33
                            ], __recognizer4597791.logProbe([
                                1397,
                                8,
                                1397,
                                12
                            ], this)._bookmarkFormWrapper), fn = __recognizer4597791.logProbe([
                                1397,
                                34,
                                1397,
                                44
                            ], obj.findSingle);
                        return fn.apply(obj, arguments);
                    }.bind(this)('form'), fn = __recognizer4597791.logProbe([
                        1397,
                        53,
                        1397,
                        55
                    ], obj.on);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                1397,
                73,
                1397,
                79
            ], __recognizer4597791.logProbe([
                1397,
                56,
                1397,
                72
            ], DOMElementEvents).Submit), function (arg) {
                __recognizer4597791.logEntry([
                    1397,
                    81,
                    1397,
                    89
                ], arguments);
                (function () {
                    var obj = __recognizer4597791.logProbe([
                            1398,
                            12,
                            1398,
                            15
                        ], arg), fn = __recognizer4597791.logProbe([
                            1398,
                            16,
                            1398,
                            30
                        ], obj.preventDefault);
                    return fn.apply(obj, arguments);
                }.bind(this)());
            }));
            (function () {
                var obj = __recognizer4597791.logProbe([
                        1401,
                        13,
                        1401,
                        22
                    ], __recognizer4597791.logProbe([
                        1401,
                        8,
                        1401,
                        12
                    ], this)._urlInput), fn = __recognizer4597791.logProbe([
                        1401,
                        23,
                        1401,
                        25
                    ], obj.on);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                1401,
                43,
                1401,
                47
            ], __recognizer4597791.logProbe([
                1401,
                26,
                1401,
                42
            ], DOMElementEvents).Blur), function (arg) {
                __recognizer4597791.logEntry([
                    1401,
                    49,
                    1401,
                    57
                ], arguments);
                (function () {
                    var obj = __recognizer4597791.logProbe([
                            1402,
                            12,
                            1402,
                            30
                        ], URLDetailsProvider), fn = __recognizer4597791.logProbe([
                            1402,
                            31,
                            1402,
                            41
                        ], obj.getDetails);
                    return fn.apply(obj, arguments);
                }.bind(this)(function () {
                    var obj = __recognizer4597791.logProbe([
                            1402,
                            48,
                            1402,
                            57
                        ], __recognizer4597791.logProbe([
                            1402,
                            42,
                            1402,
                            47
                        ], _this)._urlInput), fn = __recognizer4597791.logProbe([
                            1402,
                            58,
                            1402,
                            66
                        ], obj.getValue);
                    return fn.apply(obj, arguments);
                }.bind(this)(), function (title, description) {
                    __recognizer4597791.logEntry([
                        1402,
                        70,
                        1402,
                        78
                    ], arguments);
                    if (function () {
                            var obj = __recognizer4597791.logProbe([
                                    1403,
                                    20,
                                    1403,
                                    28
                                ], TSObject), fn = __recognizer4597791.logProbe([
                                    1403,
                                    29,
                                    1403,
                                    35
                                ], obj.exists);
                            return fn.apply(obj, arguments);
                        }.bind(this)(__recognizer4597791.logProbe([
                            1403,
                            36,
                            1403,
                            41
                        ], title))) {
                        (function () {
                            var obj = __recognizer4597791.logProbe([
                                    1404,
                                    26,
                                    1404,
                                    37
                                ], __recognizer4597791.logProbe([
                                    1404,
                                    20,
                                    1404,
                                    25
                                ], _this)._titleInput), fn = __recognizer4597791.logProbe([
                                    1404,
                                    38,
                                    1404,
                                    46
                                ], obj.setValue);
                            return fn.apply(obj, arguments);
                        }.bind(this)(__recognizer4597791.logProbe([
                            1404,
                            47,
                            1404,
                            52
                        ], title)));
                    }
                    if (function () {
                            var obj = __recognizer4597791.logProbe([
                                    1407,
                                    20,
                                    1407,
                                    28
                                ], TSObject), fn = __recognizer4597791.logProbe([
                                    1407,
                                    29,
                                    1407,
                                    35
                                ], obj.exists);
                            return fn.apply(obj, arguments);
                        }.bind(this)(__recognizer4597791.logProbe([
                            1407,
                            36,
                            1407,
                            47
                        ], description))) {
                        (function () {
                            var obj = __recognizer4597791.logProbe([
                                    1408,
                                    26,
                                    1408,
                                    43
                                ], __recognizer4597791.logProbe([
                                    1408,
                                    20,
                                    1408,
                                    25
                                ], _this)._descriptionInput), fn = __recognizer4597791.logProbe([
                                    1408,
                                    44,
                                    1408,
                                    52
                                ], obj.setValue);
                            return fn.apply(obj, arguments);
                        }.bind(this)(__recognizer4597791.logProbe([
                            1408,
                            53,
                            1408,
                            64
                        ], description)));
                    }
                }, function (type, msg) {
                    __recognizer4597791.logEntry([
                        1410,
                        15,
                        1410,
                        23
                    ], arguments);
                    (function () {
                        var obj = __recognizer4597791.logProbe([
                                1411,
                                16,
                                1411,
                                32
                            ], ExceptionHandler), fn = __recognizer4597791.logProbe([
                                1411,
                                33,
                                1411,
                                38
                            ], obj.throw);
                        return fn.apply(obj, arguments);
                    }.bind(this)(new (__recognizer4597791.logProbe([
                        1411,
                        43,
                        1411,
                        52
                    ], Exception))('An error has occured with type ' + __recognizer4597791.logProbe([
                        1411,
                        89,
                        1411,
                        93
                    ], type) + ' and following message: ' + __recognizer4597791.logProbe([
                        1411,
                        125,
                        1411,
                        128
                    ], msg))));
                }));
            }));
            (function () {
                var obj = __recognizer4597791.logProbe([
                        1415,
                        13,
                        1415,
                        23
                    ], __recognizer4597791.logProbe([
                        1415,
                        8,
                        1415,
                        12
                    ], this)._tagsInput), fn = __recognizer4597791.logProbe([
                        1415,
                        24,
                        1415,
                        26
                    ], obj.on);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                1415,
                44,
                1415,
                51
            ], __recognizer4597791.logProbe([
                1415,
                27,
                1415,
                43
            ], DOMElementEvents).KeyDown), function (arg) {
                __recognizer4597791.logEntry([
                    1415,
                    53,
                    1415,
                    61
                ], arguments);
                if (function () {
                        var obj = __recognizer4597791.logProbe([
                                1416,
                                16,
                                1416,
                                19
                            ], arg), fn = __recognizer4597791.logProbe([
                                1416,
                                20,
                                1416,
                                28
                            ], obj.getWhich);
                        return fn.apply(obj, arguments);
                    }.bind(this)() === 13) {
                    (function () {
                        var obj = __recognizer4597791.logProbe([
                                1417,
                                16,
                                1417,
                                21
                            ], _this), fn = __recognizer4597791.logProbe([
                                1417,
                                22,
                                1417,
                                29
                            ], obj._addTag);
                        return fn.apply(obj, arguments);
                    }.bind(this)(function () {
                        var obj = function () {
                                var obj = __recognizer4597791.logProbe([
                                        1417,
                                        30,
                                        1417,
                                        33
                                    ], arg), fn = __recognizer4597791.logProbe([
                                        1417,
                                        34,
                                        1417,
                                        43
                                    ], obj.getTarget);
                                return fn.apply(obj, arguments);
                            }.bind(this)(), fn = __recognizer4597791.logProbe([
                                1417,
                                46,
                                1417,
                                54
                            ], obj.getValue);
                        return fn.apply(obj, arguments);
                    }.bind(this)()));
                    (function () {
                        var obj = __recognizer4597791.logProbe([
                                1418,
                                22,
                                1418,
                                32
                            ], __recognizer4597791.logProbe([
                                1418,
                                16,
                                1418,
                                21
                            ], _this)._tagsInput), fn = __recognizer4597791.logProbe([
                                1418,
                                33,
                                1418,
                                41
                            ], obj.setValue);
                        return fn.apply(obj, arguments);
                    }.bind(this)(''));
                }
            }));
        };
        MainPresenter.prototype.onDestroy = function () {
            __recognizer4597791.logEntry([
                1423,
                40,
                1423,
                48
            ], arguments);
            (function () {
                var obj = __recognizer4597791.logProbe([
                        1424,
                        13,
                        1424,
                        32
                    ], __recognizer4597791.logProbe([
                        1424,
                        8,
                        1424,
                        12
                    ], this)._bookmarkAddTrigger), fn = __recognizer4597791.logProbe([
                        1424,
                        33,
                        1424,
                        36
                    ], obj.off);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                1424,
                54,
                1424,
                59
            ], __recognizer4597791.logProbe([
                1424,
                37,
                1424,
                53
            ], DOMElementEvents).Click)));
        };
        return __recognizer4597791.logProbe([
            1426,
            11,
            1426,
            24
        ], MainPresenter);
    }(__recognizer4597791.logProbe([
        1427,
        3,
        1427,
        12
    ], Presenter));
var DAOTables = function () {
        __recognizer4597791.logEntry([
            1428,
            17,
            1428,
            25
        ], arguments);
        function DAOTables() {
            __recognizer4597791.logEntry([
                1429,
                13,
                1429,
                22
            ], arguments);
        }
        DAOTables.Tags = 'tags';
        DAOTables.Bookmarks = 'bookmarks';
        DAOTables.TagBookmark = 'tag_bookmark';
        return __recognizer4597791.logProbe([
            1435,
            11,
            1435,
            20
        ], DAOTables);
    }();
var LogLevel;
(function (LogLevel) {
    __recognizer4597791.logEntry([
        1438,
        1,
        1438,
        9
    ], arguments);
    LogLevel[LogLevel['Debug'] = 0] = 'Debug';
    LogLevel[LogLevel['Test'] = 1] = 'Test';
    LogLevel[LogLevel['Production'] = 2] = 'Production';
}(__recognizer4597791.logProbe([
    1442,
    3,
    1442,
    11
], LogLevel) || (LogLevel = {})));
var Log = function () {
        __recognizer4597791.logEntry([
            1444,
            11,
            1444,
            19
        ], arguments);
        function Log() {
            __recognizer4597791.logEntry([
                1445,
                13,
                1445,
                16
            ], arguments);
        }
        Log.setLevel = function (l) {
            __recognizer4597791.logEntry([
                1447,
                19,
                1447,
                27
            ], arguments);
            Log._currentLevel = __recognizer4597791.logProbe([
                1448,
                28,
                1448,
                29
            ], l);
        };
        Log.debug = function (msg) {
            __recognizer4597791.logEntry([
                1451,
                16,
                1451,
                24
            ], arguments);
            if (__recognizer4597791.logProbe([
                    1452,
                    17,
                    1452,
                    30
                ], __recognizer4597791.logProbe([
                    1452,
                    12,
                    1452,
                    16
                ], this)._currentLevel) <= 0) {
                (function () {
                    var obj = __recognizer4597791.logProbe([
                            1453,
                            12,
                            1453,
                            19
                        ], console), fn = __recognizer4597791.logProbe([
                            1453,
                            20,
                            1453,
                            23
                        ], obj.log);
                    return fn.apply(obj, arguments);
                }.bind(this)('DEBUG: ' + __recognizer4597791.logProbe([
                    1453,
                    36,
                    1453,
                    39
                ], msg)));
            }
        };
        Log.inform = function (msg) {
            __recognizer4597791.logEntry([
                1457,
                17,
                1457,
                25
            ], arguments);
            if (__recognizer4597791.logProbe([
                    1458,
                    17,
                    1458,
                    30
                ], __recognizer4597791.logProbe([
                    1458,
                    12,
                    1458,
                    16
                ], this)._currentLevel) <= 1) {
                (function () {
                    var obj = __recognizer4597791.logProbe([
                            1459,
                            12,
                            1459,
                            19
                        ], console), fn = __recognizer4597791.logProbe([
                            1459,
                            20,
                            1459,
                            23
                        ], obj.log);
                    return fn.apply(obj, arguments);
                }.bind(this)('%cINFORM: ' + __recognizer4597791.logProbe([
                    1459,
                    39,
                    1459,
                    42
                ], msg), 'color: LightSkyBlue;'));
            }
        };
        Log.warn = function (msg) {
            __recognizer4597791.logEntry([
                1463,
                15,
                1463,
                23
            ], arguments);
            if (__recognizer4597791.logProbe([
                    1464,
                    17,
                    1464,
                    30
                ], __recognizer4597791.logProbe([
                    1464,
                    12,
                    1464,
                    16
                ], this)._currentLevel) <= 2) {
                (function () {
                    var obj = __recognizer4597791.logProbe([
                            1465,
                            12,
                            1465,
                            19
                        ], console), fn = __recognizer4597791.logProbe([
                            1465,
                            20,
                            1465,
                            23
                        ], obj.log);
                    return fn.apply(obj, arguments);
                }.bind(this)('%cWARN: ' + __recognizer4597791.logProbe([
                    1465,
                    37,
                    1465,
                    40
                ], msg), 'color: orange;'));
            }
        };
        Log.error = function (e) {
            __recognizer4597791.logEntry([
                1469,
                16,
                1469,
                24
            ], arguments);
            (function () {
                var obj = __recognizer4597791.logProbe([
                        1470,
                        8,
                        1470,
                        15
                    ], console), fn = __recognizer4597791.logProbe([
                        1470,
                        16,
                        1470,
                        21
                    ], obj.error);
                return fn.apply(obj, arguments);
            }.bind(this)('Error: ' + function () {
                var obj = __recognizer4597791.logProbe([
                        1470,
                        34,
                        1470,
                        35
                    ], e), fn = __recognizer4597791.logProbe([
                        1470,
                        36,
                        1470,
                        44
                    ], obj.toString);
                return fn.apply(obj, arguments);
            }.bind(this)()));
        };
        Log._currentLevel = 0;
        return __recognizer4597791.logProbe([
            1473,
            11,
            1473,
            14
        ], Log);
    }();
var Pair = function (_super) {
        __recognizer4597791.logEntry([
            1475,
            12,
            1475,
            20
        ], arguments);
        __recognizer4597791.logProbe([
            1476,
            4,
            1476,
            27
        ], __recognizer4597791.logProbe([
            1476,
            4,
            1476,
            13
        ], __extends)(__recognizer4597791.logProbe([
            1476,
            14,
            1476,
            18
        ], Pair), __recognizer4597791.logProbe([
            1476,
            20,
            1476,
            26
        ], _super)));
        function Pair(first, second) {
            __recognizer4597791.logEntry([
                1477,
                13,
                1477,
                17
            ], arguments);
            if (typeof __recognizer4597791.logProbe([
                    1478,
                    19,
                    1478,
                    24
                ], first) === 'undefined') {
                first = null;
            }
            if (typeof __recognizer4597791.logProbe([
                    1479,
                    19,
                    1479,
                    25
                ], second) === 'undefined') {
                second = null;
            }
            (function () {
                var obj = __recognizer4597791.logProbe([
                        1480,
                        8,
                        1480,
                        14
                    ], _super), fn = __recognizer4597791.logProbe([
                        1480,
                        15,
                        1480,
                        19
                    ], obj.call);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                1480,
                20,
                1480,
                24
            ], this)));
            this._first = __recognizer4597791.logProbe([
                1482,
                22,
                1482,
                27
            ], first);
            this._second = __recognizer4597791.logProbe([
                1483,
                23,
                1483,
                29
            ], second);
        }
        Pair.prototype.getFirst = function () {
            __recognizer4597791.logEntry([
                1485,
                30,
                1485,
                38
            ], arguments);
            return __recognizer4597791.logProbe([
                1486,
                20,
                1486,
                26
            ], __recognizer4597791.logProbe([
                1486,
                15,
                1486,
                19
            ], this)._first);
        };
        Pair.prototype.setFirst = function (first) {
            __recognizer4597791.logEntry([
                1489,
                30,
                1489,
                38
            ], arguments);
            this._first = __recognizer4597791.logProbe([
                1490,
                22,
                1490,
                27
            ], first);
        };
        Pair.prototype.getSecond = function () {
            __recognizer4597791.logEntry([
                1493,
                31,
                1493,
                39
            ], arguments);
            return __recognizer4597791.logProbe([
                1494,
                20,
                1494,
                27
            ], __recognizer4597791.logProbe([
                1494,
                15,
                1494,
                19
            ], this)._second);
        };
        Pair.prototype.setSecond = function (second) {
            __recognizer4597791.logEntry([
                1497,
                31,
                1497,
                39
            ], arguments);
            this._second = __recognizer4597791.logProbe([
                1498,
                23,
                1498,
                29
            ], second);
        };
        return __recognizer4597791.logProbe([
            1500,
            11,
            1500,
            15
        ], Pair);
    }(__recognizer4597791.logProbe([
        1501,
        3,
        1501,
        11
    ], TSObject));
var DictionaryException = function (_super) {
        __recognizer4597791.logEntry([
            1502,
            27,
            1502,
            35
        ], arguments);
        __recognizer4597791.logProbe([
            1503,
            4,
            1503,
            42
        ], __recognizer4597791.logProbe([
            1503,
            4,
            1503,
            13
        ], __extends)(__recognizer4597791.logProbe([
            1503,
            14,
            1503,
            33
        ], DictionaryException), __recognizer4597791.logProbe([
            1503,
            35,
            1503,
            41
        ], _super)));
        function DictionaryException() {
            __recognizer4597791.logEntry([
                1504,
                13,
                1504,
                32
            ], arguments);
            (function () {
                var obj = __recognizer4597791.logProbe([
                        1505,
                        8,
                        1505,
                        14
                    ], _super), fn = __recognizer4597791.logProbe([
                        1505,
                        15,
                        1505,
                        20
                    ], obj.apply);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                1505,
                21,
                1505,
                25
            ], this), __recognizer4597791.logProbe([
                1505,
                27,
                1505,
                36
            ], arguments)));
        }
        return __recognizer4597791.logProbe([
            1507,
            11,
            1507,
            30
        ], DictionaryException);
    }(__recognizer4597791.logProbe([
        1508,
        3,
        1508,
        12
    ], Exception));
var Dictionary = function (_super) {
        __recognizer4597791.logEntry([
            1510,
            18,
            1510,
            26
        ], arguments);
        __recognizer4597791.logProbe([
            1511,
            4,
            1511,
            33
        ], __recognizer4597791.logProbe([
            1511,
            4,
            1511,
            13
        ], __extends)(__recognizer4597791.logProbe([
            1511,
            14,
            1511,
            24
        ], Dictionary), __recognizer4597791.logProbe([
            1511,
            26,
            1511,
            32
        ], _super)));
        function Dictionary() {
            __recognizer4597791.logEntry([
                1512,
                13,
                1512,
                23
            ], arguments);
            (function () {
                var obj = __recognizer4597791.logProbe([
                        1513,
                        8,
                        1513,
                        14
                    ], _super), fn = __recognizer4597791.logProbe([
                        1513,
                        15,
                        1513,
                        19
                    ], obj.call);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                1513,
                20,
                1513,
                24
            ], this)));
            this._keys = new (__recognizer4597791.logProbe([
                1515,
                25,
                1515,
                30
            ], Array))();
            this._values = new (__recognizer4597791.logProbe([
                1516,
                27,
                1516,
                32
            ], Array))();
        }
        Dictionary.prototype.add = function (key, value) {
            __recognizer4597791.logEntry([
                1518,
                31,
                1518,
                39
            ], arguments);
            if (function () {
                    var obj = __recognizer4597791.logProbe([
                            1519,
                            12,
                            1519,
                            16
                        ], this), fn = __recognizer4597791.logProbe([
                            1519,
                            17,
                            1519,
                            28
                        ], obj.containsKey);
                    return fn.apply(obj, arguments);
                }.bind(this)(__recognizer4597791.logProbe([
                    1519,
                    29,
                    1519,
                    32
                ], key))) {
                throw new (__recognizer4597791.logProbe([
                    1520,
                    22,
                    1520,
                    41
                ], DictionaryException))('Unable to add couple: key is already existing');
            }
            (function () {
                var obj = __recognizer4597791.logProbe([
                        1523,
                        13,
                        1523,
                        18
                    ], __recognizer4597791.logProbe([
                        1523,
                        8,
                        1523,
                        12
                    ], this)._keys), fn = __recognizer4597791.logProbe([
                        1523,
                        19,
                        1523,
                        23
                    ], obj.push);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                1523,
                24,
                1523,
                27
            ], key)));
            (function () {
                var obj = __recognizer4597791.logProbe([
                        1524,
                        13,
                        1524,
                        20
                    ], __recognizer4597791.logProbe([
                        1524,
                        8,
                        1524,
                        12
                    ], this)._values), fn = __recognizer4597791.logProbe([
                        1524,
                        21,
                        1524,
                        25
                    ], obj.push);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer4597791.logProbe([
                1524,
                26,
                1524,
                31
            ], value)));
        };
        Dictionary.prototype.clone = function () {
            __recognizer4597791.logEntry([
                1527,
                33,
                1527,
                41
            ], arguments);
            var d = new (__recognizer4597791.logProbe([
                    1528,
                    20,
                    1528,
                    30
                ], Dictionary))();
            (function () {
                var obj = __recognizer4597791.logProbe([
                        1530,
                        8,
                        1530,
                        12
                    ], this), fn = __recognizer4597791.logProbe([
                        1530,
                        13,
                        1530,
                        20
                    ], obj.forEach);
                return fn.apply(obj, arguments);
            }.bind(this)(function (k, v) {
                __recognizer4597791.logEntry([
                    1530,
                    21,
                    1530,
                    29
                ], arguments);
                (function () {
                    var obj = __recognizer4597791.logProbe([
                            1531,
                            12,
                            1531,
                            13
                        ], d), fn = __recognizer4597791.logProbe([
                            1531,
                            14,
                            1531,
                            17
                        ], obj.add);
                    return fn.apply(obj, arguments);
                }.bind(this)(__recognizer4597791.logProbe([
                    1531,
                    18,
                    1531,
                    19
                ], k), __recognizer4597791.logProbe([
                    1531,
                    21,
                    1531,
                    22
                ], v)));
            }));
            return __recognizer4597791.logProbe([
                1534,
                15,
                1534,
                16
            ], d);
        };
        Dictionary.prototype.containsKey = function (key) {
            __recognizer4597791.logEntry([
                1537,
                39,
                1537,
                47
            ], arguments);
            for (var i = 0; __recognizer4597791.logProbe([
                    1538,
                    24,
                    1538,
                    25
                ], i) < __recognizer4597791.logProbe([
                    1538,
                    39,
                    1538,
                    45
                ], __recognizer4597791.logProbe([
                    1538,
                    33,
                    1538,
                    38
                ], __recognizer4597791.logProbe([
                    1538,
                    28,
                    1538,
                    32
                ], this)._keys).length); __recognizer4597791.logProbe([
                    1538,
                    47,
                    1538,
                    48
                ], i)++) {
                if (__recognizer4597791.logProbe([
                        1539,
                        27,
                        1539,
                        28
                    ], __recognizer4597791.logProbe([
                        1539,
                        21,
                        1539,
                        26
                    ], __recognizer4597791.logProbe([
                        1539,
                        16,
                        1539,
                        20
                    ], this)._keys)[i]) === __recognizer4597791.logProbe([
                        1539,
                        34,
                        1539,
                        37
                    ], key)) {
                    return true;
                }
            }
            return false;
        };
        Dictionary.prototype.forEach = function (f) {
            __recognizer4597791.logEntry([
                1547,
                35,
                1547,
                43
            ], arguments);
            for (var i = 0; __recognizer4597791.logProbe([
                    1548,
                    24,
                    1548,
                    25
                ], i) < __recognizer4597791.logProbe([
                    1548,
                    39,
                    1548,
                    45
                ], __recognizer4597791.logProbe([
                    1548,
                    33,
                    1548,
                    38
                ], __recognizer4597791.logProbe([
                    1548,
                    28,
                    1548,
                    32
                ], this)._keys).length); __recognizer4597791.logProbe([
                    1548,
                    47,
                    1548,
                    48
                ], i)++) {
                __recognizer4597791.logProbe([
                    1549,
                    12,
                    1549,
                    45
                ], __recognizer4597791.logProbe([
                    1549,
                    12,
                    1549,
                    13
                ], f)(__recognizer4597791.logProbe([
                    1549,
                    25,
                    1549,
                    26
                ], __recognizer4597791.logProbe([
                    1549,
                    19,
                    1549,
                    24
                ], __recognizer4597791.logProbe([
                    1549,
                    14,
                    1549,
                    18
                ], this)._keys)[i]), __recognizer4597791.logProbe([
                    1549,
                    42,
                    1549,
                    43
                ], __recognizer4597791.logProbe([
                    1549,
                    34,
                    1549,
                    41
                ], __recognizer4597791.logProbe([
                    1549,
                    29,
                    1549,
                    33
                ], this)._values)[i])));
            }
        };
        Dictionary.prototype.get = function (key) {
            __recognizer4597791.logEntry([
                1553,
                31,
                1553,
                39
            ], arguments);
            for (var i = 0; __recognizer4597791.logProbe([
                    1554,
                    24,
                    1554,
                    25
                ], i) < __recognizer4597791.logProbe([
                    1554,
                    39,
                    1554,
                    45
                ], __recognizer4597791.logProbe([
                    1554,
                    33,
                    1554,
                    38
                ], __recognizer4597791.logProbe([
                    1554,
                    28,
                    1554,
                    32
                ], this)._keys).length); __recognizer4597791.logProbe([
                    1554,
                    47,
                    1554,
                    48
                ], i)++) {
                if (__recognizer4597791.logProbe([
                        1555,
                        27,
                        1555,
                        28
                    ], __recognizer4597791.logProbe([
                        1555,
                        21,
                        1555,
                        26
                    ], __recognizer4597791.logProbe([
                        1555,
                        16,
                        1555,
                        20
                    ], this)._keys)[i]) === __recognizer4597791.logProbe([
                        1555,
                        34,
                        1555,
                        37
                    ], key)) {
                    return __recognizer4597791.logProbe([
                        1556,
                        36,
                        1556,
                        37
                    ], __recognizer4597791.logProbe([
                        1556,
                        28,
                        1556,
                        35
                    ], __recognizer4597791.logProbe([
                        1556,
                        23,
                        1556,
                        27
                    ], this)._values)[i]);
                }
            }
            return null;
        };
        Dictionary.prototype.getLength = function () {
            __recognizer4597791.logEntry([
                1563,
                37,
                1563,
                45
            ], arguments);
            return __recognizer4597791.logProbe([
                1564,
                26,
                1564,
                32
            ], __recognizer4597791.logProbe([
                1564,
                20,
                1564,
                25
            ], __recognizer4597791.logProbe([
                1564,
                15,
                1564,
                19
            ], this)._keys).length);
        };
        return __recognizer4597791.logProbe([
            1566,
            11,
            1566,
            21
        ], Dictionary);
    }(__recognizer4597791.logProbe([
        1567,
        3,
        1567,
        11
    ], TSObject));