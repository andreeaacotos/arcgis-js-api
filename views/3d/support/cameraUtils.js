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

define(["require","exports","dojo/_base/lang","../../../Camera","../../../config","../../../geometry/Point","../../../geometry/SpatialReference","../../../geometry/support/webMercatorUtils","../camera/intersectionUtils","../lib/glMatrix","./cameraUtilsPlanar","./cameraUtilsSpherical","./earthUtils","./mathUtils","./projectionUtils","../webgl-engine/lib/Camera"],function(e,t,n,r,a,i,o,c,l,s,d,f,u,v,m,p){function g(e){return e.spatialReference||o.WGS84}function h(e){return"global"===e.viewingMode?f:d}function T(e,t){var n=e.renderSpatialReference,r=h(e).headingTiltToDirectionUp,a=s.vec3d.create();if(m.pointToVector(t.position,a,n)){var i=r(a,t.heading,t.tilt);s.vec3d.add(i.direction,a);var o=l.cameraOnContentAlongViewDirection(e,a,i.direction,i.up);return o.fov=v.deg2rad(t.fov),o}return null}function x(e,t,n){var a=e.renderSpatialReference,c=s.vec3d.set(t.viewForward,_),l=C(e,t.eye,c,t.up,k),d=g(e);return m.vectorToVector(t.eye,a,q,d)||(d=o.WGS84,m.vectorToVector(t.eye,a,q,d)),n?(n.position.x=q[0],n.position.y=q[1],n.position.z=q[2],n.position.spatialReference=d,n.heading=l.heading,n.tilt=l.tilt,n.fov=v.rad2deg(t.fov),n):new r(new i(q,d),l.heading,l.tilt,v.rad2deg(t.fov))}function M(e,t,n){var r=e.state.camera,i=r.fovX,o=r.width/2;return"global"===e.viewingMode&&null!=n&&(t*=Math.cos(v.deg2rad(n))),t/=e.renderCoordsHelper.unitInMeters,o/(a.screenDPI*W/t)/Math.tan(i/2)}function y(e,t,n){var r=e.state.camera,i=r.fovX,o=t*Math.tan(i/2),c=r.width/2,l=c/o,s=a.screenDPI*W,d=s/l;return"global"===e.viewingMode&&(d/=Math.cos(v.deg2rad(n))),d*=e.renderCoordsHelper.unitInMeters}function w(e,t,n,r,a,i){return S(e,t,M(e,n,t.latitude),r,a,i)}function S(e,t,n,a,i,o){var c=e.renderSpatialReference,l=z(e,a.heading,a.tilt,t,n,i),s=g(e),d=m.vectorToPoint(l.eye,c,s);return d?o?(o.position=d,o.heading=l.heading,o.tilt=l.tilt,o.fov=a.fov,o):new r(d,l.heading,l.tilt,a.fov):null}function b(e,t,n){if(m.pointToVector(t,n,e.renderSpatialReference),null==t.z&&null!=e.basemapTerrain){var r=e.basemapTerrain.getElevation(t);null!=r&&e.renderCoordsHelper.setAltitude(r,n)}}function C(e,t,n,r,a){return h(e).directionToHeadingTilt(t,n,r,a)}function R(e,t,n){return!!e.renderCoordsHelper.fromRenderCoords(t,Y,e.spatialReference)&&(e.basemapTerrain&&(e.basemapTerrain.getElevation(Y)||0)>Y.z-1)}function z(e,t,r,a,o,c){var l=s.vec3d.create(),d=e.renderSpatialReference;if(a?a instanceof i?b(e,a,l):a&&s.vec3d.set(a,l):s.vec3d.set(e.state.camera.center,l),!(a&&a instanceof i)){var f=g(e);a=m.vectorToPoint(l,d,f)}o=Math.max(o,e.state.constraints.minimumPoiDistance);var u=A(e,t,r,l,a,o,c),v=h(e).eyeForCenterWithHeadingTilt,p=v(l,o,u.heading,u.tilt),T={eye:p.eye,up:p.up,center:l,heading:p.heading,tilt:p.tilt};if(!(c&&c.noReset||"global"!==e.viewingMode)&&R(e,T.eye,T.tilt)){return z(e,0,e.state.constraints.tilt(o).min,a,o,n.mixin({},c,{noReset:!0}))}return T}function P(e,t,n,a,l,s){var d;l instanceof r?(s=l,d={noReset:!1}):d=l;var f,v="global"===e.viewingMode,p=e.renderSpatialReference,h=g(e),T=o.WebMercator,x=t.spatialReference||T,M=0;null!=t.zmax&&null!=t.zmin&&(f=(t.zmax+t.zmin)/2,M=t.zmax-t.zmin);var y,w,S;if(v){var b=new i(t.xmin,t.ymin,x),C=new i(t.xmax,t.ymax,x);if(b=c.project(b,T),C=c.project(C,T),null===b||null===C)return;y=new i(N.center(b.x,C.x),(C.y+b.y)/2,T),null!=f&&(y.z=f);var R=u.getGreatCircleSpanAt(y,b,C);w=R.lon,S=R.lat,N.diff(b.x,C.x)>N.range/2&&(w+=u.halfEarthCircumference),w=Math.min(w,u.halfEarthCircumference),S=Math.min(S,u.halfEarthCircumference)}else c.canProject(t,h)&&(t=c.project(t,h)),w=t.xmax-t.xmin,S=t.ymax-t.ymin,y=new i({x:t.xmin+.5*w,y:t.ymin+.5*S,z:f,spatialReference:h});var P=e.state.camera,E=1/Math.tan(P.fovX/2),D=1/Math.tan(P.fovY/2),A=1/Math.tan(P.fov/2),H=Math.max(.5*w*E,.5*S*D,.5*M*A)/F,U=z(e,n,a,y,H,d),V=m.vectorToPoint(U.eye,p,h);return V?(s||(s=new r),s.position=V,s.heading=U.heading,s.tilt=U.tilt,s.fov=e.camera.fov,s):null}function E(e,t,n,r,a){var i,o,c=e.renderSpatialReference;if(t||(n||(n=e.state.camera),t=x(e,n,a)),n)o=m.vectorToPoint(n.center,c,g(e)),i=n.distance;else{if(!(o=e.toMap(e.screenCenter)))return null;i=u.computeCarthesianDistance(t.position,o)}n||(n=e.state.camera);var l=Math.tan(n.fovX/2),s=Math.tan(n.fovY/2),v=2*i*l*F,p=2*i*s*F;return"global"===e.viewingMode?f.toExtent(e,o,v,p,r):d.toExtent(e,o,v,p,r)}function D(e,t,n){var r=e.state.camera,a=e.engineToScreen(r.center),i=e.toScreen(t),o=a.x-i.x,c=a.y-i.y,l=Math.sqrt(o*o+c*c),s=Math.max(e.width,e.height),d=e.pointsOfInterest.centerOnSurfaceFrequent.distance,f=Math.log(Math.max(n,d)/Math.min(n,d))/Math.LN2;return l>G*s||f>O&&n>X}function A(e,t,n,r,a,i,o){if(o&&o.noReset||!D(e,a,i)){var c=U(e,r,i,n);c=e.state.constraints.clampTilt(i,c),n=H(e,r,i,c)}else t=0,n=e.state.constraints.tilt(i).min;return{heading:t,tilt:n}}function H(e,t,n,r){return h(e).lookAtTiltToEyeTilt(t,n,r)}function U(e,t,n,r){return h(e).eyeTiltToLookAtTilt(t,n,r)}function V(e,t){var n=e.basemapTerrain&&e.basemapTerrain.tilingScheme;return n?n.levelAtScale(t):void 0}function j(e,t){var n=e.basemapTerrain&&e.basemapTerrain.tilingScheme;return n?n.scaleAtLevel(t):void 0}function I(e,t,n){var r=e.renderSpatialReference;t||(t=e.state.camera);var a,i,c=o.WGS84;return t instanceof p?(m.vectorToVector(t.center,r,L,c),a=L[1],i=t.distance):(a=t.position.latitude,m.pointToVector(t.position,q,r),m.pointToVector(n,L,r),i=s.vec3d.dist(q,L)),y(e,i,a)}Object.defineProperty(t,"__esModule",{value:!0});var W=39.37,F=1,G=5,O=8,X=8e5,q=s.vec3d.create(),L=s.vec3d.create(),_=s.vec3d.create(),k={heading:0,tilt:0},Y=new i,N=new v.Cyclical(-20037508.342788905,20037508.342788905);t.externalToInternal=T,t.internalToExternal=x,t.scaleToDistance=M,t.distanceToScale=y,t.fromCenterScale=w,t.fromCenterDistance=S,t.directionToHeadingTilt=C,t.eyeHeadingTiltForCenterPointAtDistance=z,t.fromExtent=P,t.toExtent=E,t.scaleToZoom=V,t.zoomToScale=j,t.computeScale=I});