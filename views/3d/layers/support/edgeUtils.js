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

define(["require","exports","../../../../Color","../../../../core/screenUtils"],function(e,t,r,n){function o(e,t,o){var i=t&&t.enabled&&t.edges;if(!i||0===i.color.a||0===o)return null;var s=r.toUnitRGBA(i.color);switch(s[3]*=o,i.type){case"solid":return e.createSolidEdgeMaterial({color:s,size:n.pt2px(i.size),extensionLength:n.pt2px(i.extensionLength)});case"sketch":return e.createSketchEdgeMaterial({color:s,size:n.pt2px(i.size),extensionLength:n.pt2px(i.extensionLength)})}}Object.defineProperty(t,"__esModule",{value:!0}),t.createMaterial=o});