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

define(["require","exports","../../../../geometry/Point","../../../../geometry/support/coordsUtils","../../../../geometry/support/triangulationUtils","../../../../symbols/callouts/calloutUtils","./graphicUtils","../../lib/glMatrix","../../support/projectionUtils","../../webgl-engine/lib/Object3D"],function(e,t,n,r,o,a,i,l,u,s){function c(e,t,n,r,o,a,i,l,u,c,f){var v=t?t.length:0,d=this._context.clippingExtent;if(j(e,L,this._context.elevationProvider.spatialReference),d&&!_(L,d))return null;j(e,L,this._context.renderSpatialReference);for(var p=this._context.localOriginFactory.getOrigin(L),g=!!c,m=new s({castShadow:!1,metadata:{layerUid:l,graphicId:u,usesVerticalDistanceToGround:g},idHint:i}),x=0;x<v;x++){var E=r?r[x]:B;m.addGeometry(t[x],n[x],E,o,p,f)}return{object:m,terrainElevation:h(m,e,a,this._context.renderSpatialReference,this._context.elevationProvider,this._context.renderCoordsHelper).terrainElevation}}function f(e,t,r){var o=e.elevationContext,a=r.spatialReference;j(t,L,a),o.centerPointInElevationSR=new n({x:L[0],y:L[1],z:t.hasZ?L[2]:0,spatialReference:a})}function v(e){var t=e.paths[0];if(!t||0===t.length)return null;var o=r.getPointOnPath(t,r.getPathLength(t)/2);return new n({x:o[0],y:o[1],z:o[2],spatialReference:e.spatialReference})}function d(e){return i.computeCentroid(e)}function p(e,t,n,r,o){var a=0,i=t.z||0,l=0,u=n.mode,s=n.calculateOffsetRenderUnits(r),c=n.featureExpressionInfoContext;return"on-the-ground"===u?(l=e.getElevation(t,"ground")||0,a=l,o&&(o.verticalDistanceToGround=0,o.terrainElevation=l)):"relative-to-ground"===u?(l=e.getElevation(t,"ground")||0,a=s,null==c&&(a+=i),o&&(o.verticalDistanceToGround=a,o.terrainElevation=l),a+=l):"relative-to-scene"===u?(l=e.getElevation(t,"scene")||0,a=s,o&&(o.verticalDistanceToGround=a,o.terrainElevation=l),a+=l):"absolute-height"===u&&(a=s,null==c&&(a+=i),o&&(l=e.getElevation(t,"ground")||0,o.verticalDistanceToGround=a-l,o.terrainElevation=l)),a}function g(e,t,n,r,o,a,i,l){var u=l.mode,s=0,c=0,f=0,v=l.calculateOffsetRenderUnits(i),d=l.featureExpressionInfoContext;N.spatialReference=e.spatialReference,n*=3,o*=3;for(var p=0;p<a;++p)N.x=t[n+0],N.y=t[n+1],N.z=t[n+2],"on-the-ground"===u?(s=e.getElevation(N)||0,c=s,f+=s):"relative-to-ground"===u?(s=e.getElevation(N)||0,c=s+v,null==d&&(c+=N.z),f+=s):"relative-to-scene"===u?(s=e.getElevation(N,"scene")||0,c=s+v,f+=s):"absolute-height"===u&&(c=v,null==d&&(c+=N.z)),r[o+0]=t[n+0],r[o+1]=t[n+1],r[o+2]=c,n+=3,o+=3;return f/=a,{terrainElevation:f}}function h(e,t,n,r,o,a){var l,s=0;if(e.metadata.usesVerticalDistanceToGround)s=p(o,t,n,a,X),i.updateVertexAttributeAuxpos1w(e,X.verticalDistanceToGround),l=X.terrainElevation;else{var c="absolute-height"!==n.mode;s=p(o,t,n,a,c?X:null),c&&(l=X.terrainElevation)}var f=e.getObjectTransformation();return L[0]=t.x,L[1]=t.y,L[2]=s,u.computeLinearTransformation(t.spatialReference,L,f,r)?e.setObjectTransformation(f):console.warn("Could not locate symbol object properly, it might be misplaced"),{terrainElevation:l}}function m(e,t){return void 0===t&&(t=0),isFinite(e[t])?e[t]:null}function x(e,t){var n=o.pathsToTriangulationInfo(e,t);return{vertexData:n.position,polygons:n.polygons,outlines:n.outlines}}function E(e,t,n,r,o){t*=3,r*=3;for(var a=0;a<o;++a)n[r++]=e[t++],n[r++]=e[t++],n[r++]=e[t++]}function b(e,t,n,r){var o=Math.floor(t+(n-1)/2);r[0]=e[3*o+0],r[1]=e[3*o+1],r[2]=e[3*o+2]}function y(e,t,n,r){t*=3;for(var o=0;o<n;++o)e[t++]-=r[0],e[t++]-=r[1],e[t++]-=r[2]}function D(e,t,n,r){t*=3;for(var o=0;o<n;++o)e[t+2]=r,t+=3}function A(e,t,n,r){t*=3;for(var o=0;o<n;++o)e[t+2]+=r,t+=3}function O(e,t,n,r){t*=3;for(var o=0;o<n;++o)e[t+2]*=r,t+=3}function T(e,t,n){var r=[];t*=3;for(var o=0;o<n;++o)r.push([e[t++],e[t++],e[t++]]);return r}function U(e,t,n,r,o,a,i){return u.bufferToBuffer(e,n,t,r,a,o,i)}function j(e,t,n){u.pointToVector(e,t,n)}function P(e,t,n,r,o,a,i){var l=o.spatialReference,u=x(e,t),s=u.vertexData,c=s.length/3,f=new Float64Array(s.length),v=!0;n.equals(l)?E(s,0,f,0,s.length):v=U(s,0,n,f,0,l,c);var d=g(o,f,0,s,0,c,a,i);return l.equals(r)||U(s,0,l,s,0,r,c),{geometryData:u,vertexData:s,eleVertexData:f,terrainElevation:d.terrainElevation,projectionSuccess:v}}function V(e,t,n){var r=x(e,!1),o=r.vertexData,a=o.length/3,i=!0;return t.equals(n)||(i=u.bufferToBuffer(o,t,0,o,n,0,a)),{geometryData:r,vertexData:o,projectionSuccess:i}}function R(e,t,n,r){r[0]=Number.MAX_VALUE,r[1]=Number.MAX_VALUE,r[2]=Number.MAX_VALUE,r[3]=-Number.MAX_VALUE,r[4]=-Number.MAX_VALUE,r[5]=-Number.MAX_VALUE,t*=3;for(var o=0;o<n;++o){var a=e[t++],i=e[t++],l=e[t++];a<r[0]&&(r[0]=a),i<r[1]&&(r[1]=i),l<r[2]&&(r[2]=l),a>r[3]&&(r[3]=a),i>r[4]&&(r[4]=i),l>r[5]&&(r[5]=l)}return r}function _(e,t){return!(e[0]>t[3]||e[0]<t[0]||e[1]>t[4]||e[1]<t[1])}function G(e,t){return!(t[0]>e[3]||t[3]<e[0]||t[1]>e[4]||t[4]<e[1])}function C(e,t){return!!t&&!G(e,t)}function S(e){return"relative-to-ground"===e||"relative-to-scene"===e}function w(e){return"absolute-height"!==e}function M(e,t,n,r){if(!1===t.needsOffsetAdjustment||!1===t.supportsOffsetAdjustment)return!1;if("on-the-ground"===e.mode)return!1;if(0===e.meterUnitOffset){if(!0===t.needsOffsetAdjustment)return!0;if(a.isCalloutSupport(r)&&r.hasVisibleVerticalOffset())return!1;if("relative-to-ground"===e.mode&&(!n.hasZ||e.featureExpressionInfoContext))return!0;if("relative-to-scene"===e.mode)return!0}return!1}Object.defineProperty(t,"__esModule",{value:!0});var z=l.mat4d,I=l.vec3d,L=I.create(),B=z.identity(),N=new n({x:0,y:0,z:0,spatialReference:null});t.createStageObjectForPoint=c,t.extendPointGraphicElevationContext=f,t.placePointOnPolyline=v,t.placePointOnPolygon=d,t.computeElevation=p,t.getSingleSizeDriver=m,t.copyPathData=x,t.copyVertices=E,t.chooseOrigin=b,t.subtractCoordinates=y,t.setZ=D,t.offsetZ=A,t.scaleZ=O,t.flatArrayToArrayOfArrays=T,t.reproject=U,t.reprojectPoint=j,t.getGeometryVertexData3D=P,t.getGeometryVertexDataDraped=V,t.computeBoundingBox=R,t.pointInBox2D=_,t.boxesIntersect2D=G,t.boundingBoxClipped=C,t.needsElevationUpdates2D=S,t.needsElevationUpdates3D=w,t.needsOffsetAdjustment=M;var X={verticalDistanceToGround:0,terrainElevation:0}});