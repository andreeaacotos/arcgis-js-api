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

define(["require","exports"],function(n,t){function r(n){return n&&"upperLeft"===n.originPosition}function e(n){return{originPosition:"upperLeft",scale:[n.tolerance,n.tolerance],translate:[n.extent.xmin,n.extent.ymax]}}function u(n,t){if(n===t||null==n&&null==t)return!0;if(null==n||null==t)return!1;var e,u,a,i,o,l;return r(n)?(e=n.translate[0],u=n.translate[1],a=n.scale[0]):(e=n.extent.xmin,u=n.extent.ymax,a=n.tolerance),r(t)?(i=t.translate[0],o=t.translate[1],l=t.scale[0]):(i=t.extent.xmin,o=t.extent.ymax,l=t.tolerance),e===i&&u===o&&a===l}function a(n){if(!n)return V;var t,e;return r(n)?(t=n.translate[0],e=n.scale[0]):(t=n.extent.xmin,e=n.tolerance),function(n){return Math.round((n-t)/e)}}function i(n){if(!n)return V;var t,e;return r(n)?(t=n.translate[1],e=n.scale[1]):(t=n.extent.ymax,e=n.tolerance),function(n){return Math.round((t-n)/e)}}function o(n,t,r,e){for(var u,a,i,o,l=[],m=0;m<n.length;m++){var f=n[m];m>0?(i=t(f[0]),o=r(f[1]),i===u&&o===a||(l.push(e(f,i-u,o-a)),u=i,a=o)):(u=t(f[0]),a=r(f[1]),l.push(e(f,u,a)))}return l.length>0?l:null}function l(n,t,r,e){return n[0]=r(t[0]),n[3]=e(t[1]),n[2]=r(t[2]),n[1]=e(t[3]),n}function m(n,t,r,e,u){return o(n,t,r,e?u?G:O:u?O:C)}function f(n,t,r,e,u){for(var a=[],i=e?u?G:O:u?O:C,l=0;l<n.length;l++){var m=o(n[l],t,r,i);m&&m.length>=3&&a.push(m)}return a.length?a:null}function c(n,t,r,e,u){for(var a=[],i=e?u?G:O:u?O:C,l=0;l<n.length;l++){var m=o(n[l],t,r,i);m&&m.length>=2&&a.push(m)}return a.length?a:null}function s(n){if(!n)return V;var t,e;return r(n)?(t=n.translate[0],e=n.scale[0]):(t=n.extent.xmin,e=n.tolerance),function(n){return n*e+t}}function x(n){if(!n)return V;var t,e;return r(n)?(t=n.translate[1],e=n.scale[1]):(t=n.extent.ymax,e=n.tolerance),function(n){return t-n*e}}function h(n,t,r,e){for(var u,a,i=new Array(n.length),o=0;o<n.length;o++){var l=n[o];o>0?(u+=l[0],a+=l[1]):(u=l[0],a=l[1]),i[o]=e(l,t(u),r(a))}return i}function y(n,t,r,e){for(var u=new Array(n.length),a=0;a<n.length;a++)u[a]=h(n[a],t,r,e);return u}function g(n,t,r,e){return n?e?(n[0]=r(t[0]),n[1]=e(t[3]),n[2]=r(t[2]),n[3]=e(t[1]),n):[t(n[0]),r(n[3]),t(n[2]),r(n[1])]:n}function d(n,t,r,e,u){return h(n,t,r,e?u?G:O:u?O:C)}function z(n,t,r,e,u){return y(n,t,r,e?u?G:O:u?O:C)}function I(n,t,r,e,u){return y(n,t,r,e?u?G:O:u?O:C)}function v(n,t,r){for(var e=r[0],u=e[0],a=e[1],i=Math.min(u,t[0]),o=Math.min(a,t[1]),l=Math.max(u,t[2]),m=Math.max(a,t[3]),f=1;f<r.length;f++){var c=r[f],s=c[0],x=c[1];u+=s,a+=x,s<0&&(i=Math.min(i,u)),s>0&&(l=Math.max(l,u)),x<0?o=Math.min(o,a):x>0&&(m=Math.max(m,a))}return n[0]=i,n[1]=o,n[2]=l,n[3]=m,n}function N(n,t){if(!t.length)return null;n[0]=n[1]=Number.POSITIVE_INFINITY,n[2]=n[3]=Number.NEGATIVE_INFINITY;for(var r=0;r<t.length;r++)v(n,n,t[r]);return n}function p(n){var t=[Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY];return v(t,t,n)}function P(n){return N([0,0,0,0],n)}function M(n){return N([0,0,0,0],n)}function T(n,t,r,e,u,a){return n.xmin=r(t.xmin),n.ymin=e(t.ymin),n.xmax=r(t.xmax),n.ymax=e(t.ymax),n!==t&&(u&&(n.zmin=t.zmin,n.zmax=t.zmax),a&&(n.mmin=t.mmin,n.mmax=t.mmax)),n}function q(n,t,r,e,u,a){return n.points=m(t.points,r,e,u,a),n}function A(n,t,r,e,u,a){return n.x=r(t.x),n.y=e(t.y),n!==t&&(u&&(n.z=t.z),a&&(n.m=t.m)),n}function E(n,t,r,e,u,a){var i=f(t.rings,r,e,u,a);return i?(n.rings=i,n):null}function Y(n,t,r,e,u,a){var i=c(t.paths,r,e,u,a);return i?(n.paths=i,n):null}function _(n,t,r,e,u,a){return n.xmin=r(t.xmin),n.ymin=e(t.ymin),n.xmax=r(t.xmax),n.ymax=e(t.ymax),n!==t&&(u&&(n.zmin=t.zmin,n.zmax=t.zmax),a&&(n.mmin=t.mmin,n.mmax=t.mmax)),n}function b(n,t,r,e,u,a){return n.points=d(t.points,r,e,u,a),n}function B(n,t,r,e,u,a){return n.x=r(t.x),n.y=e(t.y),n!==t&&(u&&(n.z=t.z),a&&(n.m=t.m)),n}function Q(n,t,r,e,u,a){return n.rings=I(t.rings,r,e,u,a),n}function F(n,t,r,e,u,a){return n.paths=z(t.paths,r,e,u,a),n}Object.defineProperty(t,"__esModule",{value:!0});var V=function(n){return n},C=function(n,t,r){return[t,r]},O=function(n,t,r){return[t,r,n[2]]},G=function(n,t,r){return[t,r,n[2],n[3]]};t.toTransform=e,t.equals=u,t.getQuantizeX=a,t.getQuantizeY=i,t.quantizeBounds=l,t.quantizePoints=m,t.quantizeRings=f,t.quantizePaths=c,t.getHydrateX=s,t.getHydrateY=x,t.hydrateCoordsArray=h,t.hydrateCoordsArrayArray=y,t.hydrateBounds=g,t.hydratePoints=d,t.hydratePaths=z,t.hydrateRings=I,t.getQuantizedBoundsCoordsArray=v,t.getQuantizedBoundsCoordsArrayArray=N,t.getQuantizedBoundsPoints=p,t.getQuantizedBoundsPaths=P,t.getQuantizedBoundsRings=M,t.quantizeExtent=T,t.quantizeMultipoint=q,t.quantizePoint=A,t.quantizePolygon=E,t.quantizePolyline=Y,t.hydrateExtent=_,t.hydrateMultipoint=b,t.hydratePoint=B,t.hydratePolygon=Q,t.hydratePolyline=F});