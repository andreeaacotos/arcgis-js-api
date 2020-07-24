// COPYRIGHT © 2020 Esri
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
// See http://js.arcgis.com/4.16/esri/copyright.txt for details.

define(["require","exports","tslib","../../core/jsonMap","../../core/JSONSupport","../../core/accessorSupport/decorators","./imageryRendererUtils","./MosaicRule"],(function(e,r,o,t,i,n,a,p){Object.defineProperty(r,"__esModule",{value:!0});var l=new t.default({RSP_NearestNeighbor:"nearest",RSP_BilinearInterpolation:"bilinear",RSP_CubicConvolution:"cubic",RSP_Majority:"majority"}),s=new t.default({esriNoDataMatchAny:"any",esriNoDataMatchAll:"all"}),d=function(e){function r(){var r=null!==e&&e.apply(this,arguments)||this;return r.layer=null,r.adjustAspectRatio=void 0,r.bandIds=void 0,r.compression=void 0,r.compressionQuality=void 0,r.compressionTolerance=.01,r.format=null,r.interpolation=null,r.noData=null,r.noDataInterpretation=void 0,r.pixelType=void 0,r.lercVersion=2,r}return o.__extends(r,e),r.prototype.writeAdjustAspectRatio=function(e,r,o){this.layer.version<10.3||(r[o]=e)},r.prototype.writeCompressionQuality=function(e,r,o){this.format&&this.format.toLowerCase().indexOf("jpg")>-1&&null!=e&&(r[o]=e)},r.prototype.writeCompressionTolerance=function(e,r,o){"lerc"===this.format&&null!=e&&(r[o]=e)},r.prototype.writeLercVersion=function(e,r,o){"lerc"===this.format&&this.layer.version>=10.5&&(r[o]=e)},Object.defineProperty(r.prototype,"version",{get:function(){var e=this.layer;return e.bandIds,e.format,e.compressionQuality,e.compressionTolerance,e.interpolation,e.noData,e.noDataInterpretation,e.mosaicRule,e.renderingRule,e.adjustAspectRatio,e.pixelFilter,e.renderer,e.definitionExpression,(this._get("version")||0)+1},set:function(e){this._set("version",e)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"mosaicRule",{get:function(){var e=this.layer,r=e.mosaicRule,o=e.definitionExpression;return r?o&&o!==r.where&&((r=r.clone()).where=o):o&&(r=new p({where:o})),r},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"renderingRule",{get:function(){var e=this.layer,r=e.renderingRule,o=e.pixelFilter;return(!e.format||e.format.indexOf("jpg")>-1||e.format.indexOf("png")>-1)&&!o&&(r=this.combineRendererWithRenderingRule()),r},enumerable:!0,configurable:!0}),r.prototype.combineRendererWithRenderingRule=function(){var e=this.layer,r=e.rasterInfo,o=e.renderingRule,t=e.renderer;return t&&a.isSupportedRendererType(t)?a.combineRenderingRules(a.convertRendererToRenderingRule(t,{rasterAttributeTable:r.attributeTable,pixelType:r.pixelType,convertColorRampToColormap:e.version<10.6,dataType:r.dataType}),o):o},o.__decorate([n.property()],r.prototype,"layer",void 0),o.__decorate([n.property({json:{write:!0}})],r.prototype,"adjustAspectRatio",void 0),o.__decorate([n.writer("adjustAspectRatio")],r.prototype,"writeAdjustAspectRatio",null),o.__decorate([n.property({json:{write:!0}}),n.aliasOf("layer.bandIds")],r.prototype,"bandIds",void 0),o.__decorate([n.property({json:{write:!0}})],r.prototype,"compression",void 0),o.__decorate([n.property({json:{write:!0}}),n.aliasOf("layer.compressionQuality")],r.prototype,"compressionQuality",void 0),o.__decorate([n.writer("compressionQuality")],r.prototype,"writeCompressionQuality",null),o.__decorate([n.property({json:{write:!0}}),n.aliasOf("layer.compressionTolerance")],r.prototype,"compressionTolerance",void 0),o.__decorate([n.writer("compressionTolerance")],r.prototype,"writeCompressionTolerance",null),o.__decorate([n.property({json:{write:!0}}),n.aliasOf("layer.format")],r.prototype,"format",void 0),o.__decorate([n.property({type:String,json:{read:{reader:l.read},write:{writer:l.write}}}),n.aliasOf("layer.interpolation")],r.prototype,"interpolation",void 0),o.__decorate([n.property({json:{write:!0}}),n.aliasOf("layer.noData")],r.prototype,"noData",void 0),o.__decorate([n.property({type:String,json:{read:{reader:s.read},write:{writer:s.write}}}),n.aliasOf("layer.noDataInterpretation")],r.prototype,"noDataInterpretation",void 0),o.__decorate([n.property({json:{write:!0}})],r.prototype,"pixelType",void 0),o.__decorate([n.property({json:{write:!0}})],r.prototype,"lercVersion",void 0),o.__decorate([n.writer("lercVersion")],r.prototype,"writeLercVersion",null),o.__decorate([n.property({type:Number,dependsOn:["layer.adjustAspectRatio","layer.bandIds","layer.format","layer.compressionQuality","layer.compressionTolerance","layer.definitionExpression","layer.interpolation","layer.noData","layer.noDataInterpretation","layer.mosaicRule","layer.renderingRule","layer.pixelFilter","layer.renderer","lercVersion","pixelType"]})],r.prototype,"version",null),o.__decorate([n.property({dependsOn:["layer.mosaicRule","layer.definitionExpression"],json:{write:!0}})],r.prototype,"mosaicRule",null),o.__decorate([n.property({dependsOn:["layer.renderingRule","layer.renderer","layer.rasterInfo","layer.format"],json:{write:!0}})],r.prototype,"renderingRule",null),r=o.__decorate([n.subclass("esri.layers.mixins.ExportImageServiceParameters")],r)}(i.JSONSupport);r.ExportImageServiceParameters=d}));