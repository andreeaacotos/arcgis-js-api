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

define(["require","exports","../../../../core/Logger","../../../../core/scheduling","./Graphics3DWebStyleSymbol","../../lib/glMatrix","../../webgl-engine/materials/HUDMaterial"],function(e,t,r,a,n,l,c){function i(e){var t=e.labelClass.labelPlacement,r=L[t];r||(null!=t&&null==y&&(u.warn("labelPlacement","'"+t+"' is not a valid label placement"),y=a.schedule(function(){y.remove(),y=null})),r=L.default);var n=e.graphics3DGraphic._graphics[0],l=n.graphics3DSymbolLayer,c=l.getGraphicElevationContext(e.graphics3DGraphic.graphic),i={placement:r.placement,anchor:r.anchor,normalizedOffset:r.normalizedOffset,needsOffsetAdjustment:n.isDraped()?void 0:c.hasOffsetAdjustment,verticalOffset:null,screenOffset:[0,0],centerOffset:[0,0,0,-1],centerOffsetUnits:"world",translation:[0,0,0],elevationOffset:0,hasLabelVerticalOffset:!1,isValid:!0};return d(i,e),o(i,e),i}function o(e,t){switch(t.graphic.geometry.type){case"polyline":case"polygon":case"extent":case"multipoint":s(e,t);break;case"point":h(e,t);break;case"mesh":f(e,t);break;default:t.graphic.geometry}}function s(e,t){e.anchor="center"}function f(e,t){p(e,t)}function h(e,t){var r=t.graphics3DGraphic,a=r.graphics3DSymbol,n=v(a),c=n.symbol.symbolLayers.getItemAt(0),i=r.getCenterObjectSpace();switch(l.vec3d.set(i,e.translation),c.type){case"icon":case"text":m(e,t);break;case"object":p(e,t)}}function m(e,t){var r=t.graphics3DGraphic,a=r._graphics[0],n=a.getScreenSize();if(r.isDraped())e.hasLabelVerticalOffset||(e.anchor="center");else{var l=b(t);w[0]=n[0]/2*(e.normalizedOffset[0]-l[0]),w[1]=n[1]/2*(e.normalizedOffset[1]-l[1]),e.screenOffset[0]=w[0],e.hasLabelVerticalOffset?(e.centerOffset[1]=w[1],e.centerOffsetUnits="screen"):e.screenOffset[1]=w[1]}}function b(e,t){void 0===t&&(t=S);var r=e.graphics3DGraphic,a=r._graphics[0],n=a.stageObject.getGeometryRecords()[0].materials[0];if(n instanceof c){var l=n.getParams().anchorPos;t[0]=2*(l[0]-.5),t[1]=2*(l[1]-.5)}else t[0]=0,t[1]=0;return t}function p(e,t){var r=t.graphics3DGraphic._graphics[0],a=r.getBoundingBoxObjectSpace(),n=[a[3]-a[0],a[4]-a[1],a[5]-a[2]],c=Math.max(n[0],n[1]);e.centerOffset[0]=1.1*c/2*e.normalizedOffset[0];var i=n[2]/2*e.normalizedOffset[1]+e.translation[2];e.translation[2]=i*(1.1-1),e.elevationOffset=i;var o=l.vec3d.length(n);e.centerOffset[2]=1.1*o/2*e.normalizedOffset[2]}function g(e){switch(e){case"above-center":return!0;default:return!1}}function v(e){return e instanceof n?e.graphics3DSymbol:e}function d(e,t){var r=t.labelSymbol,a=t.graphics3DGraphic,n=v(a.graphics3DSymbol),l=n.symbol;"point-3d"===l.type&&l.supportsCallout()&&l.hasVisibleVerticalOffset()&&!a.isDraped()?e.verticalOffset=O(l.verticalOffset):!r||!r.hasVisibleVerticalOffset()||"point-3d"===l.type&&l.supportsCallout()&&l.verticalOffset&&!a.isDraped()||(g(e.placement)?(e.verticalOffset=O(r.verticalOffset),e.anchor="bottom",e.normalizedOffset=[0,e.normalizedOffset[1],0],e.hasLabelVerticalOffset=!0):(u.error("verticalOffset","Callouts and vertical offset on labels are currently only supported with above-center label placement (not with "+e.placement+" placement)"),e.isValid=!1))}function O(e){return{screenLength:e.screenLength,minWorldLength:e.minWorldLength,maxWorldLength:e.maxWorldLength}}Object.defineProperty(t,"__esModule",{value:!0});var u=r.getLogger("esri.views.3d.layers.graphics.labelPlacement"),y=null;t.get=i;var L={"above-center":{placement:"above-center",normalizedOffset:[0,1,0],anchor:"bottom"},"above-left":{placement:"above-left",normalizedOffset:[-1,1,0],anchor:"bottom-right"},"above-right":{placement:"above-right",normalizedOffset:[1,1,0],anchor:"bottom-left"},"below-center":{placement:"below-center",normalizedOffset:[0,-1,2],anchor:"top"},"below-left":{placement:"below-left",normalizedOffset:[-1,-1,0],anchor:"top-right"},"below-right":{placement:"below-right",normalizedOffset:[1,-1,0],anchor:"top-left"},"center-center":{placement:"center-center",normalizedOffset:[0,0,1],anchor:"center"},"center-left":{placement:"center-left",normalizedOffset:[-1,0,0],anchor:"right"},"center-right":{placement:"center-right",normalizedOffset:[1,0,0],anchor:"left"}},z={"above-center":["default","esriServerPointLabelPlacementAboveCenter"],"above-left":["esriServerPointLabelPlacementAboveLeft"],"above-right":["esriServerPointLabelPlacementAboveRight"],"below-center":["esriServerPointLabelPlacementBelowCenter"],"below-left":["esriServerPointLabelPlacementBelowLeft"],"below-right":["esriServerPointLabelPlacementBelowRight"],"center-center":["esriServerPointLabelPlacementCenterCenter"],"center-left":["esriServerPointLabelPlacementCenterLeft"],"center-right":["esriServerPointLabelPlacementCenterRight"]};for(var P in z)!function(e){var t=z[e],r=L[e];t.forEach(function(e){L[e]=r})}(P);Object.freeze&&(Object.freeze(L),Object.keys(L).forEach(function(e){Object.freeze(L[e]),Object.freeze(L[e].normalizedOffset)}));var w=[0,0],S=[0,0]});