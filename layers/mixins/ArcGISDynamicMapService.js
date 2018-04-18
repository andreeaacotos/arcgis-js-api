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

define(["require","exports","../../core/tsSupport/declareExtendsHelper","../../core/tsSupport/decorateHelper","dojo/_base/lang","../../core/Collection","../../core/CollectionFlattener","../../core/accessorSupport/decorators","../../core/accessorSupport/PropertyOrigin","../../geometry/support/scaleUtils","./ArcGISMapService","./ScaleRangeLayer","../support/ExportImageParameters","../support/Sublayer","../support/sublayerUtils"],function(e,r,t,a,i,s,o,n,u,l,p,y,c,d,b){function f(e,r,t){var a=[],i={};return e.forEach(function(e){var s=new d;if(s.read(e,r),t&&(-1===t.indexOf(s.id)?s.visible=!1:s.visible=!0),i[s.id]=s,null!=e.parentLayerId&&-1!==e.parentLayerId){var o=i[e.parentLayerId];o.sublayers||(o.sublayers=[]),o.sublayers.unshift(s)}else a.unshift(s)}),a}function m(e){return e.__accessor__.store._values}function v(e,r){var t=r.get(e.id);return t?(i.mixin(m(e),m(t)),t.sublayers&&(e.sublayers=t.sublayers.map(function(e){return v(e,r)}))):e.sublayers&&e.sublayers.forEach(function(e){return v(e,r)}),e}return function(e){function r(){var r=e.call(this)||this;return r.allSublayers=new o({root:r,rootCollectionNames:["sublayers"],getChildrenFunction:function(e){return e.sublayers}}),r.dpi=96,r.gdbVersion=null,r.imageFormat="png24",r.imageMaxHeight=2048,r.imageMaxWidth=2048,r.imageTransparency=!0,r.loaded=!1,r.sublayers=null,r.watch("sublayers",function(e,t){t&&(t.forEach(function(e){e.parent=null,e.layer=null}),r._sublayersHandles.forEach(function(e){return e.remove()}),r._sublayersHandles=null),e&&(e.forEach(function(e){e.parent=r,e.layer=r}),r._sublayersHandles=[e.on("after-add",function(e){var t=e.item;t.parent=r,t.layer=r}),e.on("after-remove",function(e){var r=e.item;r.parent=null,r.layer=null})])},!0),r}return t(r,e),r.prototype.readCapabilities=function(e,r){var t=e&&e.split(",").map(function(e){return e.trim()});return t=t||[],r.supportsDynamicLayers&&t.push("DynamicLayers"),r.tileInfo&&!r.supportsDynamicLayers||t.push("supportsSublayerVisibility","supportsSublayerDefinitionExpression"),t},r.prototype.readImageFormat=function(e,r){var t=r.supportedImageFormatTypes;return t&&t.indexOf("PNG32")>-1?"png32":"png24"},r.prototype.readServiceSublayers=function(e,r,t){return f(r.layers,t)},r.prototype.readSublayersFromItemOrWebMap=function(e,r,t){return!r.layers&&r.visibleLayers?r.visibleLayers.map(function(e){return{id:e}}):f(r.layers,t,r.visibleLayers)},r.prototype.readSublayers=function(e,r,t){var a=f(r.layers,t);return this._updateSublayersForOrigin(u.OriginId.PORTAL_ITEM,a),this._updateSublayersForOrigin(u.OriginId.WEB_MAP,a),this._updateSublayersForOrigin(u.OriginId.WEB_SCENE,a),a},r.prototype.writeSublayers=function(e,r,t,a){var s=e.flatten(function(e){var r=e.sublayers;return r&&r.toArray().reverse()}).toArray().reverse(),o=this.serviceSublayers.flatten(function(e){var r=e.sublayers;return r&&r.toArray().reverse()}).toArray().reduce(function(e,r){return e.set(r.id,r),e},new Map),n=!1,u=!0;this.capabilities&&-1!==this.capabilities.indexOf("DynamicLayers")?(n=b.isExportDynamic(s,this.serviceSublayers,this),u=!n&&b.sameStructureAsService(s,this.serviceSublayers)):u=b.sameStructureAsService(s,this.serviceSublayers),r.layers=[],s.forEach(function(e){var t=o.get(e.id),s=i.mixin({writeAsDynamic:n,writeOverridesOnly:u,serviceSublayer:t},a),l=e.write({},s);(!u||u&&Object.keys(l).length>1)&&r.layers.push(l)}),r.visibleLayers=s.filter(function(e){return e.visible}).map(function(e){return e.id})},r.prototype.findSublayerById=function(e){return this.allSublayers.find(function(r){return r.id===e})},r.prototype.createServiceSublayers=function(){return this.serviceSublayers.map(function(e){return e.clone()})},r.prototype.createExportImageParameters=function(e,r,t,a){e&&this.version>=10&&(e=e.clone().shiftCentralMeridian());var s=new c({layer:this,scale:l.getScale({extent:e,width:r})}),o=s.toJSON();s.layer=null,s.destroy();var n=!a||!a.rotation||this.version<10.3?{}:{rotation:-a.rotation},u=e&&e.spatialReference,p=u.wkid||JSON.stringify(u.toJSON());return a&&null!=a.pixelRatio&&(o.dpi*=a.pixelRatio),i.mixin({bbox:e&&e.xmin+","+e.ymin+","+e.xmax+","+e.ymax,bboxSR:p,imageSR:p,size:r+","+t},o,n)},r.prototype._updateSublayersForOrigin=function(e,r){var t=this.__accessor__.store;if(t.has("sublayers",e)){var a=t.get("sublayers",e),i=a.flatten(function(e){return e.sublayers});if(i.every(function(e){return!m(e).hasOwnProperty("minScale")})){var o=i.reduce(function(e,r){return e.set(r.id,r),e},new Map),n=r.map(function(e){return v(e.clone(),o)});t.set("sublayers",new(s.ofType(d))(n),e)}}},a([n.property({readOnly:!0})],r.prototype,"allSublayers",void 0),a([n.property({readOnly:!0})],r.prototype,"capabilities",void 0),a([n.reader("service","capabilities",["capabilities","supportsDynamicLayers","tileInfo"])],r.prototype,"readCapabilities",null),a([n.property()],r.prototype,"dpi",void 0),a([n.property()],r.prototype,"gdbVersion",void 0),a([n.property()],r.prototype,"imageFormat",void 0),a([n.reader("imageFormat",["supportedImageFormatTypes"])],r.prototype,"readImageFormat",null),a([n.property({json:{origins:{service:{read:{source:"maxImageHeight"}}}}})],r.prototype,"imageMaxHeight",void 0),a([n.property({json:{origins:{service:{read:{source:"maxImageWidth"}}}}})],r.prototype,"imageMaxWidth",void 0),a([n.property()],r.prototype,"imageTransparency",void 0),a([n.property()],r.prototype,"loaded",void 0),a([n.property({readOnly:!0,type:s.ofType(d)})],r.prototype,"serviceSublayers",void 0),a([n.reader("service","serviceSublayers",["layers"])],r.prototype,"readServiceSublayers",null),a([n.property({type:s.ofType(d)})],r.prototype,"sublayers",void 0),a([n.reader(["web-map","web-scene","portal-item"],"sublayers",["layers","visibleLayers"])],r.prototype,"readSublayersFromItemOrWebMap",null),a([n.reader("service","sublayers",["layers"])],r.prototype,"readSublayers",null),a([n.writer(["web-map","web-scene","portal-item"],"sublayers")],r.prototype,"writeSublayers",null),r=a([n.subclass("esri.layers.mixins.ArcGISDynamicMapService")],r)}(n.declared(p,y))});