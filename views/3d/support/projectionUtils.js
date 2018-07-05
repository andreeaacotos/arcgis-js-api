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
// See http://js.arcgis.com/4.8/esri/copyright.txt for details.

define(["require","exports","../../../geometry/Point","../../../geometry/SpatialReference","../../../geometry/support/aaBoundingRect","../lib/glMatrix","./earthUtils","./mathUtils","../webgl-engine/lib/BufferVectorMath"],function(e,n,t,a,r,i,c,l,o){function u(e,n,t,a){return 2===e.length?(z[0]=e[0],z[1]=e[1],z[2]=0,e=z):e===t&&(i.vec3d.set(e,z),e=z),M(e,n,0,t,a,0,1)}function f(e,n,t){z[0]=e.x,z[1]=e.y;var a=e.z;return z[2]=void 0!==a?a:0,M(z,e.spatialReference,0,n,t,0,1)}function s(e,n,a,r){var i;return"esri.geometry.SpatialReference"===a.declaredClass?(r=a,i=new t({spatialReference:r})):(i=a,r=r||i.spatialReference),M(e,n,0,z,r,0,1)?(i.x=z[0],i.y=z[1],i.z=z[2],i.spatialReference=r,i):null}function E(e,n,t,a,r,i){return z[0]=e,z[1]=n,z[2]=t,M(z,a,0,r,i,0,1)}function M(e,n,t,a,r,i,c){void 0===c&&(c=1),P!==n&&(y=d(n),P=n),O!==r&&(U=d(r),O=r);var l=t+3*c;if(y!==U||y===A.UNKNOWN&&!n.equals(r)){if(!(y>A.UNKNOWN&&U>A.UNKNOWN))return!1;if(U!==A.WGS84){var o=H[U];if(y!==A.WGS84)for(var u=g[y],f=t,s=i;f<l;f+=3,s+=3)u(e,f,B,0),o(B,0,a,s);else for(var f=t,s=i;f<l;f+=3,s+=3)o(e,f,a,s)}else for(var u=g[y],f=t,s=i;f<l;f+=3,s+=3)u(e,f,a,s)}else if(a!==e||t!==i)for(var f=t,s=i;f<l;f++,s++)a[s]=e[f];return!0}function m(e,n,t,a){var r=d(e),c=d(a);if(r===c&&c!==A.SPHERICAL_ECEF&&(r!==A.UNKNOWN||e.equals(a)))return i.mat4d.identity(t),i.mat4d.translate(t,n),!0;if(c===A.SPHERICAL_ECEF){var l=g[r];if(l){l(n,0,B,0),I(B,0,q,0);var o=b*B[0],u=b*B[1],f=Math.sin(o),s=Math.cos(o),E=Math.sin(u),M=Math.cos(u),m=t;return m[0]=-f,m[4]=-E*s,m[8]=M*s,m[12]=q[0],m[1]=s,m[5]=-E*f,m[9]=M*f,m[13]=q[1],m[2]=0,m[6]=M,m[10]=E,m[14]=q[2],m[3]=0,m[7]=0,m[11]=0,m[15]=1,!0}}else if(c===A.WEBMERC&&(r===A.WGS84||r===A.SPHERICAL_ECEF)){g[r](n,0,B,0);var h=b*B[1];T(B,0,q,0),i.mat4d.identity(t),i.mat4d.translate(t,q);var S=1/Math.cos(h);return i.mat4d.scale(t,[S,S,1]),!0}return!1}function h(e,n,t,a,r){i.vec3d.set(e,L),i.vec3d.add(e,n,X),u(L,t,L,r),u(X,t,X,r),i.vec3d.subtract(X,L,a),i.vec3d.normalize(a)}function S(e,n,t,a){var r=d(n),i=d(a);if(r===i&&(r!==A.UNKNOWN||n.equals(a)))return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],!0;if(i===A.SPHERICAL_ECEF){var c=g[r];if(c)return c(e,0,B,0),I(B,0,t,0),t[3]=e[3],!0}else if(i===A.WEBMERC&&(r===A.WGS84||r===A.SPHERICAL_ECEF)){g[r](e,0,B,0);var l=Math.abs(b*B[1])+Math.asin(e[3]/(_+e[2]));if(T(B,0,t,0),l>.9999*Math.PI)t[3]=Number.MAX_VALUE;else{var o=1/Math.cos(l);t[3]=o*e[3]}return!0}return!1}function R(e,n,t){if(null==e)return!1;var a=!0;return z[0]=null!=e.xmin?e.xmin:0,z[1]=null!=e.ymin?e.ymin:0,z[2]=null!=e.zmin?e.zmin:0,a=a&&M(z,e.spatialReference,0,n,t,0,1),z[0]=null!=e.xmax?e.xmax:0,z[1]=null!=e.ymax?e.ymax:0,z[2]=null!=e.zmax?e.zmax:0,a=a&&M(z,e.spatialReference,0,n,t,3,1),null==e.xmin&&(n[0]=-1/0),null==e.ymin&&(n[1]=-1/0),null==e.zmin&&(n[2]=-1/0),null==e.xmax&&(n[3]=1/0),null==e.ymax&&(n[4]=1/0),null==e.zmax&&(n[5]=1/0),a}function v(e,n,t){if(null==e)return!1;var a=!0;return z[0]=null!=e.xmin?e.xmin:0,z[1]=null!=e.ymin?e.ymin:0,z[2]=null!=e.zmin?e.zmin:0,a=a&&M(z,e.spatialReference,0,z,t,0,1),n[0]=z[0],n[1]=z[1],z[0]=null!=e.xmax?e.xmax:0,z[1]=null!=e.ymax?e.ymax:0,z[2]=null!=e.zmax?e.zmax:0,a=a&&M(z,e.spatialReference,0,z,t,0,1),n[2]=z[0],n[3]=z[1],null==e.xmin&&(n[0]=-1/0),null==e.ymin&&(n[1]=-1/0),null==e.xmax&&(n[2]=1/0),null==e.ymax&&(n[3]=1/0),a}function x(e,n,t,a){if(null==e)return!1;if(n.equals(a))return r.set(t,e),!0;var i=!0;return z[0]=e[0],z[1]=e[1],z[2]=0,i=i&&M(z,n,0,z,a,0,1),t[0]=z[0],t[1]=z[1],z[0]=e[2],z[1]=e[3],z[2]=0,i=i&&M(z,n,0,z,a,0,1),t[2]=z[0],t[3]=z[1],i}function d(e){return e.wkt===n.SphericalECEFSpatialReference.wkt?A.SPHERICAL_ECEF:e.isWGS84?A.WGS84:e.isWebMercator?A.WEBMERC:e.wkt===n.WGS84ECEFSpatialReference.wkt?A.WGS84_ECEF:A.UNKNOWN}function C(e,n,t,a){t[a++]=e[n++],t[a++]=e[n++],t[a]=e[n]}function G(e,n,t,a){t[a++]=F*(e[n++]/_),t[a++]=F*(Math.PI/2-2*Math.atan(Math.exp(-1*e[n++]/_))),t[a]=e[n]}function T(e,n,t,a){var r=.4999999*Math.PI,i=l.clamp(b*e[n+1],-r,r),c=Math.sin(i);t[a++]=b*e[n]*_,t[a++]=_/2*Math.log((1+c)/(1-c)),t[a]=e[n+2]}function I(e,n,t,a){var r=_+e[n+2],i=b*e[n+1],c=b*e[n],l=Math.cos(i);t[a++]=Math.cos(c)*l*r,t[a++]=Math.sin(c)*l*r,t[a]=Math.sin(i)*r}function N(e,n,t,a){var r=o.Vec3Compact.length(e,n),i=l.asin(e[n+2]/r),c=Math.cos(i),u=(e[n+1]>0?1:-1)*l.acos(e[n]/(c*r));t[a++]=F*u,t[a++]=F*i,t[a]=r-_}function W(e,n,t,a){var r=w,i=b*e[n],c=b*e[n+1],l=e[n+2],o=Math.sin(c),u=Math.cos(c),f=r.a/Math.sqrt(1-r.e2*o*o);t[a++]=(f+l)*u*Math.cos(i),t[a++]=(f+l)*u*Math.sin(i),t[a++]=(f*(1-r.e2)+l)*o}function p(e,n,t,a){var r,i,c,l,o,u,f,s,E,M,m,h,S,R,v,x,d,C,G,T,I,N=w,W=e[n],p=e[n+1],A=e[n+2];r=Math.abs(A),i=W*W+p*p,c=Math.sqrt(i),l=i+A*A,o=Math.sqrt(l),T=Math.atan2(p,W),u=A*A/l,f=i/l,R=N.a2/o,v=N.a3-N.a4/o,f>.3?(s=r/o*(1+f*(N.a1+R+u*v)/o),G=Math.asin(s),M=s*s,E=Math.sqrt(1-M)):(E=c/o*(1-u*(N.a5-R-f*v)/o),G=Math.acos(E),M=1-E*E,s=Math.sqrt(M)),m=1-N.e2*M,h=N.a/Math.sqrt(m),S=N.a6*h,R=c-h*E,v=r-S*s,d=E*R+s*v,x=E*v-s*R,C=x/(S/m+d),G+=C,I=d+x*C/2,A<0&&(G=-G),t[a++]=F*T,t[a++]=F*G,t[a]=I}Object.defineProperty(n,"__esModule",{value:!0}),n.SphericalECEFSpatialReference=new a({wkt:'GEOCCS["Spherical geocentric",\n  DATUM["Not specified",\n    SPHEROID["Sphere",\' + earthUtils.earthRadius + \',0]],\n  PRIMEM["Greenwich",0.0,\n    AUTHORITY["EPSG","8901"]],\n  UNIT["m",1.0],\n  AXIS["Geocentric X",OTHER],\n  AXIS["Geocentric Y",EAST],\n  AXIS["Geocentric Z",NORTH]\n]'}),n.WGS84ECEFSpatialReference=new a({wkt:'GEOCCS["WGS 84",\n  DATUM["WGS_1984",\n    SPHEROID["WGS 84",6378137,298.257223563,\n      AUTHORITY["EPSG","7030"]],\n    AUTHORITY["EPSG","6326"]],\n  PRIMEM["Greenwich",0,\n    AUTHORITY["EPSG","8901"]],\n  UNIT["m",1.0,\n    AUTHORITY["EPSG","9001"]],\n  AXIS["Geocentric X",OTHER],\n  AXIS["Geocentric Y",OTHER],\n  AXIS["Geocentric Z",NORTH],\n  AUTHORITY["EPSG","4978"]\n]'});var A;!function(e){e[e.UNKNOWN=0]="UNKNOWN",e[e.SPHERICAL_ECEF=1]="SPHERICAL_ECEF",e[e.WGS84=2]="WGS84",e[e.WEBMERC=3]="WEBMERC",e[e.WGS84_ECEF=4]="WGS84_ECEF"}(A||(A={}));var P,y,O,U;n.vectorToVector=u,n.pointToVector=f,n.vectorToPoint=s,n.xyzToVector=E,n.bufferToBuffer=M,n.computeLinearTransformation=m,n.transformDirection=h,n.mbsToMbs=S,n.extentToBoundingBox=R,n.extentToBoundingRect=v,n.boundingRectToBoundingRect=x;!function(e){function n(e){return e/_}function t(e){return Math.PI/2-2*Math.atan(Math.exp(-1*e/_))}function a(e){return e*_}function r(e){var n=Math.sin(e);return _/2*Math.log((1+n)/(1-n))}e.x2lon=n,e.y2lat=t,e.lon2x=a,e.lat2y=r}(n.webMercator||(n.webMercator={}));var H=[void 0,I,C,T,W],g=[void 0,N,C,G,p],b=l.deg2rad(1),F=l.rad2deg(1),_=c.earthRadius,w={a:6378137,e2:.006694379990137799,a1:42697.67270715754,a2:1823091254.6075456,a3:142.91722289812412,a4:4557728136.518864,a5:42840.589930055656,a6:.9933056200098622},z=i.vec3d.create(),B=i.vec3d.create(),q=i.vec3d.create(),L=i.vec3d.create(),X=i.vec3d.create()});