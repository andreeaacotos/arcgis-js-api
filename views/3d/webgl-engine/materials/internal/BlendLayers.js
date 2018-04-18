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

define(["require","exports","dojo/text!./BlendLayers.xml","../../lib/DefaultVertexAttributeLocations","../../../../webgl/Program"],function(e,r,n,t,a){return function(){function e(){}return e.loadShaders=function(e,r,d){e._parse(n);var o=new a(d,e.vertexShaderBlendLayers,e.fragmentShaderBlendLayers,t.Default3D);r.add("blendLayers",o)},e}()});