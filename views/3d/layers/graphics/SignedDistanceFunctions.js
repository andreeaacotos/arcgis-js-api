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

define(["require","exports","../../support/mathUtils"],function(a,r,t){function n(a){return a-Math.floor(a)}function e(a,r,e){a=t.clamp(a,0,.9999991);var i=n(a*c[0]),o=n(a*c[1]),f=n(a*c[2]),u=n(a*c[3]);r[e+0]=256*(i-i*v[0]),r[e+1]=256*(o-i*v[1]),r[e+2]=256*(f-o*v[2]),r[e+3]=256*(u-f*v[3])}function i(a,r){var t=a[r+0]/256,n=a[r+1]/256,e=a[r+2]/256,i=a[r+3]/256,o=0;return o+=t*h[0],o+=n*h[1],o+=e*h[2],o+=i*h[3]}function o(a,r){for(var t=a,n=new Uint8Array(4*t*t),i=t/2-.5,o=r/2,f=0;f<t;f++)for(var u=0;u<t;u++){var c=u+t*f,v=u-i,h=f-i,s=Math.sqrt(v*v+h*h)-o;s=s/a+.5,e(s,n,4*c)}return n}function f(a,r,t){t&&(r/=Math.SQRT2);for(var n=new Uint8Array(4*a*a),i=0;i<a;i++)for(var o=0;o<a;o++){var f=o-.5*(a-.5),u=i-.5*(a-.5),c=i*a+o;if(t){var v=(f+u)/Math.SQRT2;u=(u-f)/Math.SQRT2,f=v}var h=Math.max(Math.abs(f),Math.abs(u))-.5*r;h=h/a+.5,e(h,n,4*c)}return n}function u(a,r,t){t&&(r*=Math.SQRT2);for(var n=.5*r,i=new Uint8Array(4*a*a),o=0;o<a;o++)for(var f=0;f<a;f++){var u=f-.5*a+.5-.5,c=o-.5*a+.5-.5,v=o*a+f;if(t){var h=(u+c)/Math.SQRT2;c=(c-u)/Math.SQRT2,u=h}u=Math.abs(u),c=Math.abs(c);var s=void 0;s=u>c?u>n?Math.sqrt((u-n)*(u-n)+c*c):c:c>n?Math.sqrt(u*u+(c-n)*(c-n)):u,s=s/a+.5,e(s,i,4*v)}return i}Object.defineProperty(r,"__esModule",{value:!0});var c=[16777216,65536,256,1],v=[0,1/256,1/256,1/256],h=[1/16777216,1/65536,1/256,1];r.packFloat=e,r.unpackFloat=i,r.computeSignedDistancefieldCicle=o,r.computeSignedDistancefieldSquare=f,r.computeSignedDistancefieldCrossAndX=u});