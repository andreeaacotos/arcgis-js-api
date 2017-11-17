// COPYRIGHT © 2017 Esri
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
// See http://js.arcgis.com/4.5/esri/copyright.txt for details.

define(["require","exports","./enums"],function(e,r,n){function t(e){for(var r={},n=0,t=e;n<t.length;n++){var i=t[n];r[i.name]=i.strideInBytes}return r}function i(e,t,i){switch(void 0===i&&(i=!1),e){case n.WGLGeometryType.MARKER:return t?r.C_ICON_STRIDE_SPEC_VV:i?r.C_ICON_STRIDE_SPEC_HEATMAP:r.C_ICON_STRIDE_SPEC;case n.WGLGeometryType.FILL:return t?r.C_FILL_STRIDE_SPEC_VV:r.C_FILL_STRIDE_SPEC;case n.WGLGeometryType.LINE:return t?r.C_LINE_STRIDE_SPEC_VV:r.C_LINE_STRIDE_SPEC;case n.WGLGeometryType.TEXT:return t?r.C_TEXT_STRIDE_SPEC_VV:r.C_TEXT_STRIDE_SPEC}return null}function _(e){return E(e)?n.WGLGeometryType.MARKER:u(e)?n.WGLGeometryType.LINE:a(e)?n.WGLGeometryType.FILL:s(e)?n.WGLGeometryType.TEXT:n.WGLGeometryType.UNKNOWN}function E(e){if(e.type){switch(e.type){case"simple-marker":case"picture-marker":return!0;case"CIMPointSymbol":return!0}return!1}}function a(e){if(e.type){switch(e.type){case"simple-fill":case"picture-fill":return!0;case"CIMPolygonSymbol":return!0}return!1}}function u(e){if(e.type){switch(e.type){case"simple-line":case"picture-line":return!0;case"CIMLineSymbol":return!0}return!1}}function o(e){if(e.type){switch(e.type){case"picture-marker":case"picture-line":case"picture-fill":return!0}return!1}return!1}function s(e){if(e.type){switch(e.type){case"text":return!0;case"CIMTextSymbol":return!0}return!1}}function I(e,r){return!1}function C(e){return e&&e.length||0}function T(e,r){if(e.materialKey!==r.materialKey)return!1;if(C(e.texBindingInfo)!==C(r.texBindingInfo))return!1;if(C(e.materialParams)!==C(r.materialParams))return!1;for(var n=e.texBindingInfo.length,t=0;n>t;++t){var i=e.texBindingInfo[t],_=r.texBindingInfo[t];if(i.unit!==_.unit||i.pageId!==_.pageId||i.semantic!==_.semantic)return!1}for(var E=e.materialParams.length,t=0;E>t;++t){var a=e.materialParams[t],u=r.materialParams[t];if(a.name!==u.name||!I(a.value,u.value))return!1}return!0}function V(e,r){return 65535&e|r<<16}function c(e,r,n,t){return 255&e|(255&r)<<8|(255&n)<<16|t<<24}function m(e,r,n){return 255&e|(255&r)<<8|n<<16}function f(e){return 0|e}function l(e,r,n){var t=0;do{var i=e%128;e-=i,e/=128,e>0&&(i+=128),r&&(r[n+t]=i),++t}while(e>0);return t}function y(e,r,n){for(var t=0,i=0,_=!0,E=1;_;){var a=r[n+t];++t,a>=128?(a-=128,_=!0):_=!1,i+=a*E,E*=128}return e.n=i,t}function S(e,r,n){for(var t=0,i=e.length,_=0;i>_;++_)r&&(r[n+t]=e.charCodeAt(_)),++t;return r&&(r[n+t]=0),++t,t}function R(e,r,n){var t=0;e.s="";for(var i=!0;i;){var _=r[n+t];++t,0!==_?e.s+=String.fromCharCode(_):i=!1}return t}function d(e,r,n){return l(e,r,n)}function L(e,r,n){return y(e,r,n)}function p(e,r,n){void 0===r&&(r=0),void 0===n&&(n=!1);var t=e[r+3];return e[r+0]*=t,e[r+1]*=t,e[r+2]*=t,n||(e[r+3]*=255),e}function O(e){var r;if(Array.isArray(e))r=[e[0],e[1],e[2],e[3]];else{var n=e;r=[n.r,n.g,n.b,n.a]}return p(r),r}function v(e){return e--,e|=e>>1,e|=e>>2,e|=e>>4,e|=e>>8,e|=e>>16,e++,e}function B(e){return null!==e&&void 0!==e}function D(e){return"number"==typeof e}function P(e){return"string"==typeof e}function N(e){return null==e||P(e)}function G(e,r,n){return e+(r-e)*n}Object.defineProperty(r,"__esModule",{value:!0}),r.C_HITTEST_SEARCH_SIZE=4,r.C_TILE_SIZE=512,r.C_VBO_GEOMETRY="geometry",r.C_VBO_PERINSTANCE="per_instance",r.C_VBO_PERINSTANCE_VV="per_instance_vv",r.C_VBO_VISIBILITY="visibility",r.C_ICON_VERTEX_DEF=[{name:r.C_VBO_GEOMETRY,strideInBytes:24,divisor:0}],r.C_ICON_VERTEX_DEF_VV=[{name:r.C_VBO_GEOMETRY,strideInBytes:40,divisor:0}],r.C_ICON_HEATMAP=[{name:r.C_VBO_GEOMETRY,strideInBytes:28,divisor:0}],r.C_FILL_VERTEX_DEF=[{name:r.C_VBO_GEOMETRY,strideInBytes:24,divisor:0}],r.C_FILL_VERTEX_DEF_VV=[{name:r.C_VBO_GEOMETRY,strideInBytes:32,divisor:0}],r.C_LINE_VERTEX_DEF=[{name:r.C_VBO_GEOMETRY,strideInBytes:32,divisor:0}],r.C_LINE_VERTEX_DEF_VV=[{name:r.C_VBO_GEOMETRY,strideInBytes:44,divisor:0}],r.C_TEXT_VERTEX_DEF=[{name:r.C_VBO_GEOMETRY,strideInBytes:24,divisor:0},{name:r.C_VBO_VISIBILITY,strideInBytes:1,divisor:0}],r.C_TEXT_VERTEX_DEF_VV=[{name:r.C_VBO_GEOMETRY,strideInBytes:40,divisor:0},{name:r.C_VBO_VISIBILITY,strideInBytes:1,divisor:0}],r.C_ICON_STRIDE_SPEC=t(r.C_ICON_VERTEX_DEF),r.C_ICON_STRIDE_SPEC_VV=t(r.C_ICON_VERTEX_DEF_VV),r.C_ICON_STRIDE_SPEC_HEATMAP=t(r.C_ICON_HEATMAP),r.C_FILL_STRIDE_SPEC=t(r.C_FILL_VERTEX_DEF),r.C_FILL_STRIDE_SPEC_VV=t(r.C_FILL_VERTEX_DEF_VV),r.C_LINE_STRIDE_SPEC=t(r.C_LINE_VERTEX_DEF),r.C_LINE_STRIDE_SPEC_VV=t(r.C_LINE_VERTEX_DEF_VV),r.C_TEXT_STRIDE_SPEC=t(r.C_TEXT_VERTEX_DEF),r.C_TEXT_STRIDE_SPEC_VV=t(r.C_TEXT_VERTEX_DEF_VV),r.getStrides=i,r.getSymbolGeometryType=_,r.isMarkerSymbol=E,r.isFillSymbol=a,r.isLineSymbol=u,r.isPictureSymbol=o,r.isTextSymbol=s,r.isSameUniformValue=I,r.isSameMaterialInfo=T,r.i1616to32=V,r.i8888to32=c,r.i8816to32=m,r.numTo32=f,r.serializeInteger=l,r.deserializeInteger=y,r.serializeString=S,r.deserializeString=R,r.serializeUniform=d,r.deserializeUniform=L,r.premultiplyAlpha=p,r.copyAndPremultiply=O,r.nextHighestPowerOfTwo=v,r.isDefined=B,r.isNumber=D,r.isString=P,r.isStringOrNull=N,r.lerp=G});