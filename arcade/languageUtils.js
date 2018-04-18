// COPYRIGHT © 2018 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/4.6/esri/copyright.txt for details.

define(["require","exports","dojo/number","dojo/_base/array","../kernel","../moment","./FunctionWrapper","./ImmutableArray","./ImmutablePathArray","./ImmutablePointArray","../geometry/Extent","../geometry/Geometry","../geometry/Multipoint","../geometry/Point","../geometry/Polygon","../geometry/Polyline"],function(n,e,r,t,i,u,o,a,f,l,c,s,d,m,g,y){function p(n,e,r){if(""===e)return n;if(null===e)return n;if(void 0===e)return n;if(e===r)return n;if(e===r)return n;do{n=n.replace(e,r)}while(-1!==n.indexOf(e));return n}function v(n){return n instanceof Y||n instanceof o||n instanceof $}function x(n){return!!N(n)||(!!O(n)||(!!I(n)||(!!S(n)||(null===n||(n===e.voidOperation||"number"==typeof n)))))}function h(n,e){return void 0===n?e:n}function N(n){return"string"==typeof n||n instanceof String}function S(n){return"boolean"==typeof n}function O(n){return"number"==typeof n}function T(n){return n instanceof Array}function b(n){return n&&void 0!==n.isFeatureCursor}function _(n){return n instanceof a}function I(n){return n instanceof Date}function C(n,e,r){if(n.length<e||n.length>r)throw new Error("Function called with wrong number of Parameters")}function j(){var n=(new Date).getTime();return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var r=(n+16*Math.random())%16|0;return n=Math.floor(n/16),("x"===e?r:3&r|8).toString(16)})}function R(n,e){return!1===isNaN(n)?void 0===e||null===e||""===e?n.toString():(e=p(e,"‰",""),e=p(e,"¤",""),r.format(n,{pattern:e})):n.toString()}function k(n,e){var r=u(n);return void 0===e||null===e||""===e?r.format():r.format(D(e))}function D(n){return n.replace(/(LTS)|L|l/g,function(n){return"["+n+"]"})}function F(n,e,r){switch(r){case">":return n>e;case"<":return n<e;case">=":return n>=e;case"<=":return n<=e}return!1}function w(n,r,t){if(null===n){if(null===r||r===e.voidOperation)return F(null,null,t);if(O(r))return F(0,r,t);if(N(r))return F(0,z(r),t);if(S(r))return F(0,z(r),t);if(I(r))return F(0,r.getTime(),t)}if(n===e.voidOperation){if(null===r||r===e.voidOperation)return F(null,null,t);if(O(r))return F(0,r,t);if(N(r))return F(0,z(r),t);if(S(r))return F(0,z(r),t);if(I(r))return F(0,r.getTime(),t)}else if(O(n)){if(O(r))return F(n,r,t);if(S(r))return F(n,z(r),t);if(null===r||r===e.voidOperation)return F(n,0,t);if(N(r))return F(n,z(r),t);if(I(r))return F(n,r.getTime(),t)}else if(N(n)){if(N(r))return F(V(n),V(r),t);if(I(r))return F(z(n),r.getTime(),t);if(O(r))return F(z(n),r,t);if(null===r||r===e.voidOperation)return F(z(n),0,t);if(S(r))return F(z(n),z(r),t)}else if(I(n)){if(I(r))return F(n,r,t);if(null===r||r===e.voidOperation)return F(n.getTime(),0,t);if(O(r))return F(n.getTime(),r,t);if(S(r))return F(n.getTime(),z(r),t);if(N(r))return F(n.getTime(),z(r),t)}else if(S(n)){if(S(r))return F(n,r,t);if(O(r))return F(z(n),z(r),t);if(I(r))return F(z(n),r.getTime(),t);if(null===r||r===e.voidOperation)return F(z(n),0,t);if(N(r))return F(z(n),z(r),t)}return!!J(n,r)&&("<="===t||">="===t)}function J(n,r){if(n===r)return!0;if(null===n&&r===e.voidOperation||null===r&&n===e.voidOperation)return!0;if(I(n)&&I(r))return n.getTime()===r.getTime();if(n instanceof f)return n.equalityTest(r);if(n instanceof l)return n.equalityTest(r);if(n instanceof m&&r instanceof m){var t=void 0,i=void 0;if(e.isVersion4?(t=n.cache._arcadeCacheId,i=r.cache._arcadeCacheId):(t=n.getCacheValue("_arcadeCacheId"),i=r.getCacheValue("_arcadeCacheId")),void 0!==t&&null!==t)return t===i}if(void 0!==n&&void 0!==r&&null!==n&&null!==r&&"object"==typeof n&&"object"==typeof r){if(n._arcadeCacheId===r._arcadeCacheId&&void 0!==n._arcadeCacheId&&null!==n._arcadeCacheId)return!0;if(n._underlyingGraphic===r._underlyingGraphic&&void 0!==n._underlyingGraphic&&null!==n._underlyingGraphic)return!0}return!1}function V(n,r){if(N(n))return n;if(null===n)return"";if(O(n))return R(n,r);if(S(n))return n.toString();if(I(n))return k(n,r);if(n instanceof s)return JSON.stringify(n.toJSON());if(T(n)){for(var t=[],i=0;i<n.length;i++)t[i]=M(n[i]);return"["+t.join(",")+"]"}if(n instanceof a){for(var t=[],i=0;i<n.length();i++)t[i]=M(n.get(i));return"["+t.join(",")+"]"}return null!==n&&"object"==typeof n&&void 0!==n.castToText?n.castToText():v(n)?"object, Function":(e.voidOperation,"")}function A(n){var e=[];if(!1===T(n))return null;if(n instanceof a){for(var r=0;r<n.length();r++)e[r]=z(n.get(r));return e}for(var r=0;r<n.length;r++)e[r]=z(n[r]);return e}function P(n,r){if(N(n))return n;if(null===n)return"";if(O(n))return R(n,r);if(S(n))return n.toString();if(I(n))return k(n,r);if(n instanceof s)return n instanceof c?'{"xmin":'+n.xmin.toString()+',"ymin":'+n.ymin.toString()+","+(n.hasZ?'"zmin":'+n.zmin.toString()+",":"")+(n.hasM?'"mmin":'+n.mmin.toString()+",":"")+'"xmax":'+n.xmax.toString()+',"ymax":'+n.ymax.toString()+","+(n.hasZ?'"zmax":'+n.zmax.toString()+",":"")+(n.hasM?'"mmax":'+n.mmax.toString()+",":"")+'"spatialReference":'+H(n.spatialReference)+"}":H(n.toJSON(),function(n,e){return n.key===e.key?0:"spatialReference"===n.key?1:"spatialReference"===e.key?-1:n.key<e.key?-1:n.key>e.key?1:0});if(T(n)){for(var t=[],i=0;i<n.length;i++)t[i]=M(n[i]);return"["+t.join(",")+"]"}if(n instanceof a){for(var t=[],i=0;i<n.length();i++)t[i]=M(n.get(i));return"["+t.join(",")+"]"}return null!==n&&"object"==typeof n&&void 0!==n.castToText?n.castToText():v(n)?"object, Function":(e.voidOperation,"")}function M(n){if(null===n)return"null";if(S(n)||O(n)||N(n))return JSON.stringify(n);if(n instanceof s)return P(n);if(n instanceof a)return P(n);if(n instanceof Array)return P(n);if(n instanceof Date)return JSON.stringify(k(n,""));if(null!==n&&"object"==typeof n){if(void 0!==n.castToText)return n.castToText()}else if(n===e.voidOperation)return"null";return"null"}function z(n,t){return O(n)?n:null===n?0:""===n?0:I(n)?NaN:S(n)?n?1:0:T(n)?NaN:""===n?NaN:void 0===n?NaN:void 0!==t&&N(n)?(t=p(t,"‰",""),t=p(t,"¤",""),r.parse(n,{pattern:t})):n===e.voidOperation?0:Number(n)}function E(n,e){if(I(n))return n;if(N(n)){var r=u(n,[void 0===e||null===e||""===e?u.ISO_8601:e]);if(r.isValid())return r.toDate()}return null}function G(n,e){if(I(n))return u(n);if(N(n)){var r=u(n,[void 0===e||null===e||""===e?u.ISO_8601:e]);if(r.isValid())return r}return null}function L(n){return S(n)?n:N(n)?"true"===(n=n.toLowerCase()):!!O(n)&&(0!==n&&!isNaN(n))}function q(n,e){return null===n||void 0===n?null:(null!==n.spatialReference&&void 0!==n.spatialReference||(n.spatialReference=e),n)}function U(n){return null===n?null:n instanceof m?"NaN"===n.x||null===n.x||isNaN(n.x)?null:n:n instanceof g?0===n.rings.length?null:n:n instanceof y?0===n.paths.length?null:n:n instanceof d?0===n.points.length?null:n:n instanceof c?"NaN"===n.xmin||null===n.xmin||isNaN(n.xmin)?null:n:null}function B(n,e){if(!n)return null;if(!n.domain)return null;var r=null;e="string"===n.field.type||"esriFieldTypeString"===n.field.type?V(e):z(e);for(var t=0;t<n.domain.codedValues.length;t++){var i=n.domain.codedValues[t];i.code===e&&(r=i)}return null===r?null:r.name}function Z(n,e){if(!n)return null;if(!n.domain)return null;var r=null;e=V(e);for(var t=0;t<n.domain.codedValues.length;t++){var i=n.domain.codedValues[t];i.name===e&&(r=i)}return null===r?null:r.code}function K(n,e,r,i){if(void 0===r&&(r=null),!e)return null;if(!e.fields)return null;for(var u=null,o=0;o<e.fields.length;o++){var a=e.fields[o];a.name.toLowerCase()===n.toString().toLowerCase()&&(u=a)}if(null===u)return null;var f,l;return i||(i=r&&e.typeIdField&&r._field(e.typeIdField)),null!=i&&t.some(e.types,function(n){return n.id===i&&(f=n.domains&&n.domains[u.name],f&&"inherited"===f.type&&(f=W(u.name,e),l=!0),!0)}),l||f||(f=W(n,e)),{field:u,domain:f}}function W(n,e){var r;return t.some(e.fields,function(e){return e.name===n&&(r=e.domain),!!r}),r}function H(n,e){e||(e={}),"function"==typeof e&&(e={cmp:e});var r="boolean"==typeof e.cycles&&e.cycles,t=e.cmp&&function(n){return function(e){return function(r,t){var i={key:r,value:e[r]},u={key:t,value:e[t]};return n(i,u)}}}(e.cmp),i=[];return function n(e){if(e&&e.toJSON&&"function"==typeof e.toJSON&&(e=e.toJSON()),void 0!==e){if("number"==typeof e)return isFinite(e)?""+e:"null";if("object"!=typeof e)return JSON.stringify(e);var u,o;if(Array.isArray(e)){for(o="[",u=0;u<e.length;u++)u&&(o+=","),o+=n(e[u])||"null";return o+"]"}if(null===e)return"null";if(-1!==i.indexOf(e)){if(r)return JSON.stringify("__cycle__");throw new TypeError("Converting circular structure to JSON")}var a=i.push(e)-1,f=Object.keys(e).sort(t&&t(e));for(o="",u=0;u<f.length;u++){var l=f[u],c=n(e[l]);c&&(o&&(o+=","),o+=JSON.stringify(l)+":"+c)}return i.splice(a,1),"{"+o+"}"}}(n)}Object.defineProperty(e,"__esModule",{value:!0});var Q=function(){function n(n){this.value=n}return n}(),X=function(){function n(n){this.value=n}return n}(),Y=function(){function n(n){this.fn=n}return n}(),$=function(){function n(n){this.fn=n}return n}();e.NativeFunction=Y,e.ImplicitResult=X,e.ReturnResult=Q,e.SizzleFunction=$,e.isVersion4=0===i.version.indexOf("4."),e.voidOperation={type:"VOID"},e.breakResult={type:"BREAK"},e.continueResult={type:"CONTINUE"},e.multiReplace=p,e.isFunctionParameter=v,e.isSimpleType=x,e.defaultUndefined=h,e.isString=N,e.isBoolean=S,e.isNumber=O,e.isArray=T,e.isFeatureCursor=b,e.isImmutableArray=_,e.isDate=I,e.pcCheck=C,e.generateUUID=j,e.formatNumber=R,e.formatDate=k,e.standardiseDateFormat=D,e.greaterThanLessThan=w,e.equalityTest=J,e.toString=V,e.toNumberArray=A,e.toStringExplicit=P,e.toNumber=z,e.toDate=E,e.toDateM=G,e.toBoolean=L,e.fixSpatialReference=q,e.fixNullGeometry=U,e.getDomainValue=B,e.getDomainCode=Z,e.getDomain=K,e.stableStringify=H});