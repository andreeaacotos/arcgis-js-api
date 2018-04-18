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

define(["require","exports","../../../../core/promiseUtils","../../../../geometry/support/webMercatorUtils","../../../../portal/support/geometryServiceUtils"],function(e,t,r,l,o){function n(e){var t=e.view.spatialReference,n=e.layer.fullExtent&&e.layer.fullExtent.spatialReference;return!n||n.equals(t)||"local"!==e.view.viewingMode?r.resolve(null):l.canProject(n,t)?r.resolve(l.project(e.layer.fullExtent,t)):o.projectGeometry(e.layer.fullExtent,t,e.layer.portalItem).then(function(t){if(!e.destroyed&&t)return t}).catch(function(){return null})}Object.defineProperty(t,"__esModule",{value:!0}),t.toView=n});