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

//  copyright

/**
             * The copyright text as defined by the map service.
             *
             * @name copyright
             * @instance
             * @type {string}
             */

define(["require","exports","../core/tsSupport/assignHelper","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","../core/tsSupport/paramHelper","dojo/_base/lang","../Graphic","../PopupTemplate","../request","../core/Collection","../core/Error","../core/Handles","../core/kebabDictionary","../core/lang","../core/Logger","../core/MultiOriginJSONSupport","../core/promiseUtils","../core/urlUtils","../core/accessorSupport/decorators","../geometry/Extent","../geometry/HeightModelInfo","../geometry/SpatialReference","../geometry/support/normalizeUtils","./Layer","./graphics/sources/MemorySource","./mixins/ArcGISService","./mixins/OperationalLayer","./mixins/PortalLayer","./mixins/RefreshableLayer","./mixins/ScaleRangeLayer","./support/arcgisLayerUrl","./support/commonProperties","./support/FeatureProcessing","./support/FeatureReduction","./support/FeatureReductionSelection","./support/FeatureTemplate","./support/FeatureType","./support/Field","./support/fieldUtils","./support/LabelClass","./support/labelingInfo","./support/Relationship","../renderers/SimpleRenderer","../renderers/UniqueValueRenderer","../renderers/support/jsonUtils","../renderers/support/styleUtils","../renderers/support/typeUtils","../symbols/SimpleFillSymbol","../symbols/SimpleLineSymbol","../symbols/SimpleMarkerSymbol","../symbols/support/ElevationInfo","../symbols/support/jsonUtils","../tasks/support/FeatureSet","../tasks/support/Query"],function(e,t,r,i,o,n,s,a,p,l,u,d,y,c,f,h,m,v,g,b,F,I,w,S,D,O,T,j,x,M,E,_,q,A,R,P,C,L,U,Q,V,G,k,B,z,W,Z,N,H,J,$,K,X,Y,ee){function te(e){return e&&null!=e.applyEdits}function re(e){return e&&e.isInstanceOf&&e.isInstanceOf(O)}function ie(e){return e&&e.isInstanceOf&&e.isInstanceOf(u)}function oe(e,t,r){return!!(e&&e.hasOwnProperty(t)?e[t]:r)}var ne=c({esriGeometryPoint:"point",esriGeometryMultipoint:"multipoint",esriGeometryPolyline:"polyline",esriGeometryPolygon:"polygon",esriGeometryMultiPatch:"multipatch"}),se="FeatureLayer",ae=h.getLogger("esri.layers.FeatureLayer");return function(t){function c(e){var r=t.call(this)||this;return r._handles=new y,r.featureReduction=null,r.copyright=null,r.displayField=null,r.definitionExpression=null,r.dynamicDataSource=null,r.editFieldsInfo=null,r.elevationInfo=null,r.fields=null,r.fullExtent=null,r.gdbVersion=null,r.geometryType=null,r.hasM=!1,r.hasZ=!1,r.heightModelInfo=null,r.historicMoment=null,r.isTable=!1,r.labelsVisible=!1,r.labelingInfo=null,r.layerId=void 0,r.legendEnabled=!0,r.maxRecordCount=void 0,r.minScale=0,r.maxScale=0,r.objectIdField=null,r.operationalLayerType="ArcGISFeatureLayer",r.popupEnabled=!0,r.popupTemplate=null,r.relationships=null,r.returnM=!1,r.returnZ=!1,r.screenSizePerspectiveEnabled=!0,r.serviceDefinitionExpression=null,r.spatialReference=w.WGS84,r.templates=null,r.timeInfo=null,r.title=null,r.sublayerTitleMode="item-title",r.trackIdField=null,r.type="feature",r.typeIdField=null,r.types=null,r.userIsAdmin=!1,r.version=void 0,r.visible=!0,r}return i(c,t),c.prototype.normalizeCtorArgs=function(e,t){return"string"==typeof e?s.mixin({},{url:e},t):e},c.prototype.load=function(){var e=this,t=this.source&&(Array.isArray(this.source)||re(this.source));if(this.portalItem&&t)return void this.addResolvingPromise(v.resolve());var r=this.loadFromPortal({supportedTypes:["Feature Service","Feature Collection"]}).always(function(){if(e.url&&null==e.layerId&&/FeatureServer\/*$/i.test(e.url))return e._fetchFirstLayerId().then(function(t){null!=t&&(e.layerId=t)})}).then(function(){if(!e.url&&!e._hasMemorySource())throw new d("feature-layer:missing-url-or-source","Feature layer must be created with either a url or a source");return e.createGraphicsSource().then(e._initLayerProperties.bind(e))});return this.addResolvingPromise(r),this.when()},Object.defineProperty(c.prototype,"allRenderers",{get:function(){return this._getAllRenderers(this.renderer)},enumerable:!0,configurable:!0}),Object.defineProperty(c.prototype,"capabilities",{get:function(){var e=this._get("capabilities");return e||!this.loaded||this.hasService?e:{data:{supportsAttachment:!1,supportsM:!1,supportsZ:!1},operations:{supportsCalculate:!1,supportsTruncate:!1,supportsValidateSql:!1,supportsAdd:!0,supportsDelete:!0,supportsEditing:!0,supportsQuery:!0,supportsResizeAttachments:!1,supportsUpdate:!0},query:{supportsStatistics:!1,supportsCentroid:!1,supportsDistance:!1,supportsDistinct:!1,supportsExtent:!0,supportsGeometryProperties:!1,supportsOrderBy:!1,supportsPagination:!1,supportsQuantization:!1,supportsResultType:!1,supportsSqlExpression:!1,supportsStandardizedQueriesOnly:!1,supportsQueryByOthers:!1,supportsHistoricMoment:!1},queryRelated:{supportsPagination:!1,supportsCount:!1,supportsOrderBy:!1},editing:{supportsGeometryUpdate:!0,supportsGlobalId:!1,supportsRollbackOnFailure:!1,supportsUpdateWithoutM:!1,supportsUploadWithItemId:!1,supportsDeleteByAnonymous:!1,supportsDeleteByOthers:!1,supportsUpdateByAnonymous:!1,supportsUpdateByOthers:!1}}},enumerable:!0,configurable:!0}),c.prototype.readCapabilities=function(e,t){return t=t.layerDefinition||t,{data:this._readDataCapabilities(t),operations:this._readOperationsCapabilities(t.capabilities||e,t),query:this._readQueryCapabilities(t),queryRelated:this._readQueryRelatedCapabilities(t),editing:this._readEditingCapabilities(t)}},Object.defineProperty(c.prototype,"hasAttachments",{get:function(){return this.hasService&&this._get("hasAttachments")||!1},enumerable:!0,configurable:!0}),c.prototype.readIsTable=function(e,t){return t=t&&t.layerDefinition||t,"Table"===t.type},Object.defineProperty(c.prototype,"hasService",{get:function(){return!this._hasMemorySource()},enumerable:!0,configurable:!0}),c.prototype.readMinScale=function(e,t){return t.effectiveMinScale||e||0},c.prototype.readMaxScale=function(e,t){return t.effectiveMaxScale||e||0},c.prototype.readObjectIdFieldFromService=function(e,t){if(t=t.layerDefinition||t,t.objectIdField)return t.objectIdField;if(t.fields)for(var r=0,i=t.fields;r<i.length;r++){var o=i[r];if("esriFieldTypeOID"===o.type)return o.name}},Object.defineProperty(c.prototype,"outFields",{get:function(){var e=this,t=this._userOutFields,r=this.requiredFields;return t=t&&t.slice(0),r=r&&r.slice(0),t?-1===t.indexOf("*")&&r.forEach(function(e){-1===t.indexOf(e)&&t.push(e)}):t=r,-1!==t.indexOf("*")?t=["*"]:this.loaded&&(t=t.filter(function(t){var r=!!e.getField(t,e.fields);return t&&!r&&ae.error("[outFields] Invalid field: ",t),r},this),t=t.map(function(t){return e.getField(t,e.fields).name},this),t=t.filter(function(e,t,r){return r.indexOf(e)===t})),t},set:function(e){var t=this,r=this.requiredFields&&this.requiredFields.slice(0);e?-1===e.indexOf("*")&&r.forEach(function(t){-1===e.indexOf(t)&&e.push(t)}):e=r,this.loaded&&(e=e.filter(function(e){var r="*"===e||!!t.getField(e,t.fields);return e&&!r&&ae.error("[outFields] Invalid field: ",e),r},this),e=e.map(function(e){return"*"===e?e:t.getField(e,t.fields).name},this)),this._userOutFields=e},enumerable:!0,configurable:!0}),Object.defineProperty(c.prototype,"parsedUrl",{get:function(){var e=this.url?g.urlToObject(this.url):null;return null!=this.layerId&&null!=e&&(e.path=g.join(e.path,this.layerId.toString())),e},enumerable:!0,configurable:!0}),Object.defineProperty(c.prototype,"renderer",{set:function(e){var t=this._getAllRenderers(e);Q.fixRendererFields(t,this.fields),this._set("renderer",e)},enumerable:!0,configurable:!0}),c.prototype.readRenderer=function(e,t,r){t=t.layerDefinition||t;var i,o,n=t.drawingInfo&&t.drawingInfo.renderer||void 0;if(n)(i=W.read(n,t,r)||void 0)||ae.error("Failed to create renderer",{rendererDefinition:t.drawingInfo.renderer,layer:this,context:r});else if(t.defaultSymbol)X.read(t.defaultSymbol,t,r),t.types&&t.types.length?(i=new z({defaultSymbol:o,field:t.typeIdField}),t.types.forEach(function(e){n.addUniqueValueInfo(e.id,X.read(e.symbol,e,r))})):i=new B({symbol:o});else if("Table"!==t.type){switch(t.geometryType){case"esriGeometryPoint":case"esriGeometryMultipoint":o=new $;break;case"esriGeometryPolyline":o=new J;break;case"esriGeometryPolygon":o=new H}i=o&&new B({symbol:o})}return i},Object.defineProperty(c.prototype,"requiredFields",{get:function(){var e=this.timeInfo,t=[],r=[],i=[this.objectIdField,this.typeIdField,this.editFieldsInfo&&this.editFieldsInfo.creatorField,e&&e.startTimeField,e&&e.endTimeField,this.trackIdField];this.allRenderers.forEach(function(e){t=t.concat(e.requiredFields)}),this.labelingInfo&&this.labelingInfo.length&&this.labelingInfo.forEach(function(e){r=r.concat(e.requiredFields)}),r=r.map(function(e){return e.replace(/['"]+/g,"")}),i=i.concat(t),i=i.concat(r);var o=this.elevationInfo&&this.elevationInfo.featureExpressionInfo;return o&&(i=i.concat(o.requiredFields)),this.popupTemplate&&(i=i.concat(this.popupTemplate.requiredFields)),i.filter(function(e,t,r){return!!e&&r.indexOf(e)===t&&"function"!=typeof e})},enumerable:!0,configurable:!0}),Object.defineProperty(c.prototype,"source",{set:function(e){var t=this._get("source");t!==e&&(re(t)&&this._resetMemorySource(t),re(e)&&this._initMemorySource(e),this._set("source",e))},enumerable:!0,configurable:!0}),c.prototype.castSource=function(e){return e?Array.isArray(e)||ie(e)?new O({layer:this,items:e}):e:null},c.prototype.readSource=function(e,t){var r=Y.fromJSON(t.featureSet);return new O({layer:this,items:r&&r.features||[]})},c.prototype.readTemplates=function(e,t){var r=t.editFieldsInfo,i=r&&r.creatorField,o=r&&r.editorField;return e=e&&e.map(function(e){return C.fromJSON(e)}),this._fixTemplates(e,i),this._fixTemplates(e,o),e},c.prototype.readTitle=function(e,t){var r=t.layerDefinition&&t.layerDefinition.name||t.name,i=t.title||t.layerDefinition&&t.layerDefinition.title;if(r){var o=this.portalItem&&this.portalItem.title;if("item-title"===this.sublayerTitleMode)return this.url?_.titleFromUrlAndName(this.url,r):r;var n=r||this.url&&_.parse(this.url).title;if(!n)return;return"item-title-and-service-name"===this.sublayerTitleMode&&o&&(n=o+" - "+n),_.cleanTitle(n)}if("item-title"===this.sublayerTitleMode&&i)return i},c.prototype.readTitleFromWebMap=function(e,t){var r=t.layerDefinition&&t.layerDefinition.name;return r||t.title},c.prototype.readTypeIdField=function(e,t){if(t=t.layerDefinition||t,e=t.typeIdField){var r=this.getField(e,t.fields);r&&(e=r.name)}return e},c.prototype.readTypes=function(e,t){var r=this;t=t.layerDefinition||t,e=t.types;var i=t.editFieldsInfo,o=i&&i.creatorField,n=i&&i.editorField;return e&&e.map(function(e){return e=L.fromJSON(e),r._fixTemplates(e.templates,o),r._fixTemplates(e.templates,n),e})},Object.defineProperty(c.prototype,"url",{set:function(e){var t=_.sanitizeUrlWithLayerId(this,e,ae);this._set("url",t.url),null!=t.layerId&&this._set("layerId",t.layerId)},enumerable:!0,configurable:!0}),c.prototype.writeUrl=function(e,t,r,i){_.writeUrlWithLayerId(this,e,t)},c.prototype.readVersion=function(e,t){return t=t.layerDefinition||t,t.currentVersion?t.currentVersion:t.hasOwnProperty("capabilities")||t.hasOwnProperty("drawingInfo")||t.hasOwnProperty("hasAttachments")||t.hasOwnProperty("htmlPopupType")||t.hasOwnProperty("relationships")||t.hasOwnProperty("timeInfo")||t.hasOwnProperty("typeIdField")||t.hasOwnProperty("types")?10:9.3},c.prototype.readVisible=function(e,t){return t.layerDefinition&&null!=t.layerDefinition.defaultVisibility?!!t.layerDefinition.defaultVisibility:null!=t.visibility?!!t.visibility:void 0},c.prototype.applyEdits=function(e){var t=this;return this.load().then(function(){return te(t.source)?t._processApplyEditsParams(e):v.reject(new d(se,"Layer source does not support applyEdits capability"))}).then(function(e){if(te(t.source))return t.source.applyEdits(e).then(function(e){var r=function(e){return e.filter(function(e){return!e.error}).map(f.clone)},i={addedFeatures:r(e.addFeatureResults),updatedFeatures:r(e.updateFeatureResults),deletedFeatures:r(e.deleteFeatureResults)};return(i.addedFeatures.length||i.updatedFeatures.length||i.deletedFeatures.length)&&t.emit("edits",i),e})})},c.prototype.createGraphicsSource=function(){var t=this;return this._hasMemorySource()?(this.emit("graphics-source-create",{graphicsSource:this.source}),this.source.when()):v.create(function(t){return e(["./graphics/sources/FeatureLayerSource"],t)}).then(function(e){return new e({layer:t})}).then(function(e){return e.when()}).then(function(e){return t.emit("graphics-source-create",{graphicsSource:e}),e})},c.prototype.createGraphicsController=function(t){var r,i=this,o=t.layerView,n=u.ofType(a),p=this.source,l=re(p),d=s.mixin(t.options||{},{layer:this,layerView:o,graphics:l?p:new n});return r=l?v.create(function(t){return e(["./graphics/controllers/MemoryController"],t)}):"2d"===o.view.type?v.create(function(t){return e(["./graphics/controllers/AutoController2D"],t)}):v.create(function(t){return e(["./graphics/controllers/SnapshotController"],t)}),r.then(function(e){return new e(d)}).then(function(e){return i.emit("graphics-controller-create",{graphicsController:e}),e.when()})},c.prototype.createQuery=function(){var e=new ee,t=this.get("capabilities.data");return e.gdbVersion=this.gdbVersion,e.historicMoment=this.historicMoment,e.returnGeometry=!0,e.returnZ=t&&t.supportsZ&&this.returnZ||null,e.returnM=t&&t.supportsM&&this.returnM||null,e.outFields=this.outFields,e.where=this.definitionExpression||"1=1",e.multipatchOption="multipatch"===this.geometryType?"xyFootprint":null,e},c.prototype.getFeatureType=function(e){var t=this,r=t.typeIdField,i=t.types;if(!r||!e)return null;var o=e.attributes?e.attributes[r]:void 0;if(void 0===o)return null;var n=null;return i.some(function(e){return e.id.toString()===o.toString()&&(n=e),!!n}),n},c.prototype.getFieldDomain=function(e,t){var r,i=this,o=!1,n=t&&t.feature,s=n&&n.attributes,a=this.typeIdField&&s&&s[this.typeIdField];return null!=a&&this.types&&(o=this.types.some(function(t){return t.id==a&&(r=t.domains&&t.domains[e],r&&"inherited"===r.type&&(r=i._getLayerDomain(e)),!0)})),o||r||(r=this._getLayerDomain(e)),r},c.prototype.getField=function(e,t){var r=this.processing?this.fields.concat(this.processing.fields):this.fields;return Q.getField(e,t||r)},c.prototype.graphicChanged=function(e){this.emit("graphic-update",e)},c.prototype.queryFeatureAttachments=function(e){var t=this;return this.load().then(function(){if(!e)return v.reject(new d(se,"A feature is required to query attachments"));var i=t,o=i.layerId,n=i.objectIdField,s=i.token,a=i.url;if(!t.get("capabilities.data.supportsAttachment"))return v.reject(new d(se,"this layer doesn't support attachments"));var p=e.attributes;if(!p)return v.reject(new d(se,"'attributes' are required on a feature to query attachments"));var u=p[n];if(!u)return v.reject(new d(se,"feature is missing the identifying attribute "+n));var y=a+"/"+o+"/"+u+"/attachments";return l(y,{query:{f:"json",token:s},callbackParamName:"callback",responseType:"json"}).then(function(e){return e.data.attachmentInfos.map(function(e){var t=e.id;return r({},e,{url:g.addProxy(y+"/"+t+(s?"?token="+s:""))})})})})},c.prototype.queryFeatures=function(e){var t=this;return this.load().then(function(){if(!t.source.queryFeatures)return v.reject(new d(se,"Layer source does not support queryFeatures capability"))}).then(function(){return t.source.queryFeatures(e||t.createQuery())}).then(function(e){if(e&&e.features){var r=t.popupTemplate;e.features.forEach(function(e){e.popupTemplate=r,e.layer=t,e.sourceLayer=t})}return e})},c.prototype.queryObjectIds=function(e){var t=this;return this.load().then(function(){return t.source.queryObjectIds?t.source.queryObjectIds(e||t.createQuery()):v.reject(new d(se,"Layer source does not support queryObjectIds capability"))})},c.prototype.queryFeatureCount=function(e){var t=this;return this.load().then(function(){return t.source.queryFeatureCount?t.source.queryFeatureCount(e||t.createQuery()):v.reject(new d(se,"Layer source does not support queryFeatureCount capability"))})},c.prototype.queryExtent=function(e){var t=this;return this.load().then(function(){return t.source.queryExtent?t.source.queryExtent(e||t.createQuery()):v.reject(new d(se,"Layer source does not support queryExtent capability"))})},c.prototype.read=function(e,t){switch(t&&t.origin){case"web-scene":this.inherited(arguments,[{returnZ:!0},t])}var r=e.featureCollection;if(r){var i=r.layers;i&&1===i.length&&(this.inherited(arguments,[i[0],t]),null!=r.showLegend&&this.inherited(arguments,[{showLegend:r.showLegend},t]))}return this.inherited(arguments,[e,t]),this},c.prototype.write=function(e,t){if(t&&"web-scene"===t.origin&&t.messages){if(!this.url)return t.messages.push(new d("layer:unsupported","Layers ("+this.title+", "+this.id+") of type '"+this.declaredClass+"' require a url to a service to be written to web scenes",{layer:this})),null;if(this.isTable)return t.messages.push(new d("layer:unsupported","Layers ("+this.title+", "+this.id+") of type '"+this.declaredClass+"' using a Table source cannot written to web scenes",{layer:this})),null}return this.inherited(arguments)},c.prototype.importLayerViewModule=function(t){switch(t.type){case"2d":return v.create(function(t){return e(["../views/2d/layers/FeatureLayerView2D"],t)});case"3d":return v.create(function(t){return e(["../views/3d/layers/FeatureLayerView3D"],t)})}},c.prototype._getLayerDomain=function(e){if(!this.fields)return null;var t=null;return this.fields.some(function(r){return r.name===e&&(t=r.domain),!!t}),t},c.prototype._fetchFirstLayerId=function(){return l(this.url,{query:{f:"json"},callbackParamName:"callback",responseType:"json"}).then(function(e){var t=e.data;if(t&&Array.isArray(t.layers)&&t.layers.length>0)return t.layers[0].id})},c.prototype._initLayerProperties=function(e){var t=this;return this.source||(this.source=e),e.url&&(this.url=e.url),e.layerDefinition&&this.read(e.layerDefinition,{origin:"service",url:this.parsedUrl}),this._verifySource(),this._verifyFields(),this._addSymbolUrlTokens(),Q.fixRendererFields(this._getAllRenderers(this.renderer),this.fields),this.watch("token",function(){t._addSymbolUrlTokens()}),Z.loadStyleRenderer(this,{origin:"service"})},c.prototype._findUrlBasedSymbols=function(){var e=this.renderer;if(!e)return[];var t=[];e.symbol&&t.push(e.symbol),e.defaultSymbol&&t.push(e.defaultSymbol);var r=e.classBreakInfos||e.uniqueValueInfos;return r&&r.forEach(function(e){e.symbol&&t.push(e.symbol)}),t.filter(function(e){return!!e.url})},c.prototype._addSymbolUrlTokens=function(){var e=this.token;if(!this._hasMemorySource()&&e){this._findUrlBasedSymbols().forEach(function(t){var r=t.url;if(r&&-1!==r.search(/https?\:/i)&&!/[?&]token=/.test(r)){var i=-1===r.indexOf("?")?"?":"&";t.url=r+i+"token="+e}})}},c.prototype._getAllRenderers=function(e){if(!e)return[];var t=[];return[e,e.trackRenderer,e.observationRenderer,e.latestObservationRenderer].forEach(function(e){e&&(t.push(e),e.rendererInfos&&e.rendererInfos.forEach(function(e){e.renderer&&t.push(e.renderer)}))}),t},c.prototype._verifyFields=function(){var e=this.parsedUrl&&this.parsedUrl.path||"undefined";this.objectIdField||console.log("FeatureLayer: 'objectIdField' property is not defined (url: "+e+")"),this.isTable||this._hasMemorySource()||-1!==e.search(/\/FeatureServer\//i)||this.fields&&this.fields.some(function(e){return"geometry"===e.type})||console.log("FeatureLayer: unable to find field of type 'geometry' in the layer 'fields' list. If you are using a map service layer, features will not have geometry (url: "+e+")")},c.prototype._fixTemplates=function(e,t){e&&e.forEach(function(e){var r=e.prototype&&e.prototype.attributes;r&&t&&delete r[t]})},c.prototype._verifySource=function(){var e=this;if(this._hasMemorySource()){if(this.url)throw new d("feature-layer:mixed-source-and-url","FeatureLayer cannot be created with both an in-memory source and a url");var t=["geometryType","fields","objectIdField"];if(!t.every(function(t){return null!=e[t]}))throw new d("feature-layer:missing-property","FeatureLayer created as feature collection requires properties: "+t.join(),{requiredProperties:t})}else{if(this.isTable)throw new d("feature-layer:source-type-not-supported","The table feature service type is not yet supported",{sourceType:"Table"});if(!this.url)throw new d("feature-layer:source-or-url-required","FeatureLayer requires either a url, a valid portal item or a source")}},c.prototype._initMemorySource=function(e){var t=this;e.forEach(function(e){e.layer=t,e.sourceLayer=t}),this._handles.add([e.on("after-add",function(e){e.item.layer=t,e.item.sourceLayer=t}),e.on("after-remove",function(e){e.item.layer=null,e.item.sourceLayer=null})],"fl-source")},c.prototype._resetMemorySource=function(e){e.forEach(function(e){e.layer=null,e.sourceLayer=null}),this._handles.remove("fl-source")},c.prototype._hasMemorySource=function(){return!(this.url||!this.source)},c.prototype._readDataCapabilities=function(e){return{supportsAttachment:oe(e,"hasAttachments",!1),supportsM:oe(e,"hasM",!1),supportsZ:oe(e,"hasZ",!1)}},c.prototype._readOperationsCapabilities=function(e,t){var r=e?e.toLowerCase().split(",").map(function(e){return e.trim()}):[],i=-1!==r.indexOf("editing"),o=i&&-1!==r.indexOf("create"),n=i&&-1!==r.indexOf("delete"),s=i&&-1!==r.indexOf("update");return i&&!(o||n||s)&&(o=n=s=!0),{supportsCalculate:oe(t,"supportsCalculate",!1),supportsTruncate:oe(t,"supportsTruncate",!1),supportsValidateSql:oe(t,"supportsValidateSql",!1),supportsAdd:o,supportsDelete:n,supportsEditing:i,supportsQuery:-1!==r.indexOf("query"),supportsResizeAttachments:oe(t,"supportsAttachmentsResizing",!1),supportsUpdate:s}},c.prototype._readQueryCapabilities=function(e){var t=e.advancedQueryCapabilities,r=e.ownershipBasedAccessControlForFeatures,i=e.archivingInfo;return{supportsStatistics:oe(t,"supportsStatistics",e.supportsStatistics),supportsCentroid:oe(t,"supportsReturningGeometryCentroid",!1),supportsDistance:oe(t,"supportsQueryWithDistance",!1),supportsDistinct:oe(t,"supportsDistinct",e.supportsAdvancedQueries),supportsExtent:oe(t,"supportsReturningQueryExtent",!1),supportsGeometryProperties:oe(t,"supportsReturningGeometryProperties",!1),supportsOrderBy:oe(t,"supportsOrderBy",e.supportsAdvancedQueries),supportsPagination:oe(t,"supportsPagination",!1),supportsQuantization:oe(e,"supportsCoordinatesQuantization",!1),supportsResultType:oe(t,"supportsQueryWithResultType",!1),supportsSqlExpression:oe(t,"supportsSqlExpression",!1),supportsStandardizedQueriesOnly:oe(e,"useStandardizedQueries",!1),supportsQueryByOthers:oe(r,"allowOthersToQuery",!0),supportsHistoricMoment:oe(i,"supportsQueryWithHistoricMoment",!1)}},c.prototype._readQueryRelatedCapabilities=function(e){var t=e.advancedQueryCapabilities,r=oe(t,"supportsAdvancedQueryRelated",!1);return{supportsPagination:oe(t,"supportsQueryRelatedPagination",!1),supportsCount:r,supportsOrderBy:r}},c.prototype._readEditingCapabilities=function(e){var t=e.ownershipBasedAccessControlForFeatures;return{supportsGeometryUpdate:oe(e,"allowGeometryUpdates",!0),supportsGlobalId:oe(e,"supportsApplyEditsWithGlobalIds",!1),supportsRollbackOnFailure:oe(e,"supportsRollbackOnFailureParameter",!1),supportsUpdateWithoutM:oe(e,"allowUpdateWithoutMValues",!1),supportsUploadWithItemId:oe(e,"supportsAttachmentsByUploadId",!1),supportsDeleteByAnonymous:oe(t,"allowAnonymousToDelete",!0),supportsDeleteByOthers:oe(t,"allowOthersToDelete",!0),supportsUpdateByAnonymous:oe(t,"allowAnonymousToUpdate",!0),supportsUpdateByOthers:oe(t,"allowOthersToUpdate",!0)}},c.prototype._processApplyEditsParams=function(e){var t="'addFeatures', 'updateFeatures' or 'deleteFeatures' parameter is required",r="feature-layer:missing-parameters";if(!e)return v.reject(new d(r,t));if(e=s.mixin({},e),e.addFeatures=e.addFeatures||[],e.updateFeatures=e.updateFeatures||[],e.deleteFeatures=e.deleteFeatures||[],e.addFeatures.length||e.updateFeatures.length||e.deleteFeatures.length){var i=function(e){var t=new a;return t.geometry=e.geometry,t.attributes=e.attributes,t};return e.addFeatures=e.addFeatures.map(i),e.updateFeatures=e.updateFeatures.map(i),this._normalizeGeometries(e)}return v.reject(new d(r,t))},c.prototype._normalizeGeometries=function(e){var t=e.addFeatures,r=e.updateFeatures,i=t.concat(r).map(function(e){return e.geometry});return S.normalizeCentralMeridian(i).then(function(i){var o=t.length,n=r.length;return i.slice(0,o).forEach(function(t,r){e.addFeatures[r].geometry=t}),i.slice(o,o+n).forEach(function(t,r){e.updateFeatures[r].geometry=t}),e})},o([b.property({types:{key:"type",base:R.default,typeMap:{selection:P.default}},json:{origins:{"web-scene":{read:{source:"layerDefinition.featureReduction"},write:{target:"layerDefinition.featureReduction"}}}}})],c.prototype,"featureReduction",void 0),o([b.property({readOnly:!0,dependsOn:["loaded","renderer","fields"]})],c.prototype,"allRenderers",null),o([b.property({readOnly:!0,dependsOn:["loaded"]})],c.prototype,"capabilities",null),o([b.reader("capabilities",["layerDefinition.capabilities","layerDefinition.advancedQueryCapabilities","layerDefinition.archivingInfo","layerDefinition.supportsStatistics","layerDefinition.supportsAdvancedQueries","layerDefinition.hasAttachments","layerDefinition.hasM","layerDefinition.hasZ","layerDefinition.supportsCalculate","layerDefinition.supportsTruncate","layerDefinition.supportsValidateSql","layerDefinition.supportsCoordinatesQuantization","layerDefinition.useStandardizedQueries","layerDefinition.ownershipBasedAccessControlForFeatures","layerDefinition.allowGeometryUpdates","layerDefinition.supportsApplyEditsWithGlobalIds","layerDefinition.supportsRollbackOnFailureParameter","layerDefinition.allowUpdateWithoutMValues","layerDefinition.supportsAttachmentsByUploadId"]),b.reader("service","capabilities",["advancedQueryCapabilities","archivingInfo","supportsStatistics","supportsAdvancedQueries","hasAttachments","hasM","hasZ","supportsAttachmentsResizing","supportsCalculate","supportsTruncate","supportsValidateSql","supportsCoordinatesQuantization","useStandardizedQueries","ownershipBasedAccessControlForFeatures","allowGeometryUpdates","supportsApplyEditsWithGlobalIds","supportsRollbackOnFailureParameter","allowUpdateWithoutMValues","supportsAttachmentsByUploadId","capabilities"])],c.prototype,"readCapabilities",null),o([b.property({type:String,json:{read:{source:"layerDefinition.copyrightText"},origins:{service:{read:{source:"copyrightText"}}}}})],c.prototype,"copyright",void 0),o([b.property({type:String,json:{read:{source:"layerDefinition.displayField"},origins:{service:{read:{source:"displayField"}}}}})],c.prototype,"displayField",void 0),o([b.property({type:String,json:{origins:{service:{read:!1,write:!1}},read:{source:"layerDefinition.definitionExpression"},write:{target:"layerDefinition.definitionExpression"}}})],c.prototype,"definitionExpression",void 0),o([b.property({readOnly:!0,json:{read:X.read}})],c.prototype,"defaultSymbol",void 0),o([b.property()],c.prototype,"dynamicDataSource",void 0),o([b.property({readOnly:!0})],c.prototype,"editFieldsInfo",void 0),o([b.property({type:K,json:{origins:{service:{read:{source:"elevationInfo"},write:{target:"elevationInfo",enabled:!1}}},read:{source:"layerDefinition.elevationInfo"},write:{target:"layerDefinition.elevationInfo"}}})],c.prototype,"elevationInfo",void 0),o([b.property({type:[U],json:{origins:{service:{read:!0}},read:{source:"layerDefinition.fields"}}})],c.prototype,"fields",void 0),o([b.property({type:F,json:{origins:{service:{read:{source:"extent"}}},read:{source:"layerDefinition.extent"}}})],c.prototype,"fullExtent",void 0),o([b.property()],c.prototype,"gdbVersion",void 0),o([b.property({json:{origins:{service:{read:ne.read}},read:{source:"layerDefinition.geometryType",reader:ne.read}}})],c.prototype,"geometryType",void 0),o([b.property({readOnly:!0,dependsOn:["loaded"],json:{origins:{service:{read:!0}},read:{source:"layerDefinition.hasAttachments"}}})],c.prototype,"hasAttachments",null),o([b.property({type:Boolean,json:{origins:{service:{read:!0}},read:{source:"layerDefinition.hasM"}}})],c.prototype,"hasM",void 0),o([b.property({type:Boolean,json:{origins:{service:{read:!0}},read:{source:"layerDefinition.hasZ"}}})],c.prototype,"hasZ",void 0),o([b.property({readOnly:!0,type:I})],c.prototype,"heightModelInfo",void 0),o([b.property({type:Date})],c.prototype,"historicMoment",void 0),o([b.property({json:{origins:{service:{read:!1},"portal-item":{read:!1}}}})],c.prototype,"id",void 0),o([b.property({readOnly:!0})],c.prototype,"isTable",void 0),o([b.reader("service","isTable",["type"]),b.reader("isTable",["layerDefinition.type"])],c.prototype,"readIsTable",null),o([b.property({dependsOn:["loaded","url","source"],readOnly:!0})],c.prototype,"hasService",null),o([b.property(q.labelsVisible)],c.prototype,"labelsVisible",void 0),o([b.property({type:[V],json:{origins:{service:{read:{source:"drawingInfo.labelingInfo",reader:G.reader},write:{target:"drawingInfo.labelingInfo",enabled:!1}}},read:{source:"layerDefinition.drawingInfo.labelingInfo",reader:G.reader},write:{target:"layerDefinition.drawingInfo.labelingInfo"}}})],c.prototype,"labelingInfo",void 0),o([b.property({type:Number,json:{origins:{service:{read:{source:"id"}}},read:!1}})],c.prototype,"layerId",void 0),o([b.property({type:Boolean,json:{read:{source:"showLegend"},write:{target:"showLegend"}}})],c.prototype,"legendEnabled",void 0),o([b.property({type:Number,json:{origins:{service:{read:!0}},read:{source:"layerDefinition.maxRecordCount"}}})],c.prototype,"maxRecordCount",void 0),o([b.property({type:Number,json:{origins:{service:{write:{enabled:!1}}},read:{source:"layerDefinition.minScale"},write:{target:"layerDefinition.minScale"}}})],c.prototype,"minScale",void 0),o([b.reader("service","minScale",["minScale","effectiveMinScale"])],c.prototype,"readMinScale",null),o([b.property({type:Number,json:{origins:{service:{write:{enabled:!1}}},read:{source:"layerDefinition.maxScale"},write:{target:"layerDefinition.maxScale"}}})],c.prototype,"maxScale",void 0),o([b.reader("service","maxScale",["maxScale","effectiveMaxScale"])],c.prototype,"readMaxScale",null),o([b.property({type:String})],c.prototype,"objectIdField",void 0),o([b.reader("objectIdField",["layerDefinition.objectIdField","layerDefinition.fields"]),b.reader("service","objectIdField",["objectIdField","fields"])],c.prototype,"readObjectIdFieldFromService",null),o([b.property()],c.prototype,"operationalLayerType",void 0),o([b.property({dependsOn:["requiredFields"]})],c.prototype,"outFields",null),o([b.property({readOnly:!0,dependsOn:["layerId"]})],c.prototype,"parsedUrl",null),o([b.property(q.popupEnabled)],c.prototype,"popupEnabled",void 0),o([b.property({type:p,json:{read:{source:"popupInfo"},write:{target:"popupInfo"}}})],c.prototype,"popupTemplate",void 0),o([b.property({type:A})],c.prototype,"processing",void 0),o([b.property({type:[k],readOnly:!0})],c.prototype,"relationships",void 0),o([b.property({types:N.types,json:{origins:{service:{write:{target:"drawingInfo.renderer",enabled:!1}}},write:{target:"layerDefinition.drawingInfo.renderer"}}})],c.prototype,"renderer",null),o([b.reader("service","renderer",["drawingInfo.renderer","defaultSymbol","type"]),b.reader("renderer",["layerDefinition.drawingInfo.renderer","layerDefinition.defaultSymbol","layerDefinition.type"])],c.prototype,"readRenderer",null),o([b.property({readOnly:!0,dependsOn:["allRenderers","labelingInfo","elevationInfo.featureExpressionInfo","popupTemplate.requiredFields"]})],c.prototype,"requiredFields",null),o([b.property({type:Boolean})],c.prototype,"returnM",void 0),o([b.property({type:Boolean})],c.prototype,"returnZ",void 0),o([b.property(q.screenSizePerspectiveEnabled)],c.prototype,"screenSizePerspectiveEnabled",void 0),o([b.property()],c.prototype,"source",null),o([b.cast("source")],c.prototype,"castSource",null),o([b.reader("portal-item","source",["featureSet"]),b.reader("web-map","source",["featureSet"])],c.prototype,"readSource",null),o([b.property({readOnly:!0,json:{origins:{service:{read:{source:"definitionExpression"}}}}})],c.prototype,"serviceDefinitionExpression",void 0),
o([b.property({type:w,json:{origins:{service:{read:{source:"extent.spatialReference"}}},read:{source:"layerDefinition.extent.spatialReference"}}})],c.prototype,"spatialReference",void 0),o([b.property({type:[C]})],c.prototype,"templates",void 0),o([b.reader("templates",["editFieldsInfo","creatorField","editorField","templates"])],c.prototype,"readTemplates",null),o([b.property()],c.prototype,"timeInfo",void 0),o([b.property()],c.prototype,"title",void 0),o([b.reader("service","title",["name"]),b.reader("portal-item","title",["layerDefinition.title","layerDefinition.name","title"])],c.prototype,"readTitle",null),o([b.reader("web-map","title",["layerDefinition.name","title"])],c.prototype,"readTitleFromWebMap",null),o([b.property({type:String})],c.prototype,"sublayerTitleMode",void 0),o([b.property({type:String,readOnly:!0,json:{read:{source:"timeInfo.trackIdField"}}})],c.prototype,"trackIdField",void 0),o([b.property({json:{read:!1}})],c.prototype,"type",void 0),o([b.property({type:String,readOnly:!0})],c.prototype,"typeIdField",void 0),o([b.reader("service","typeIdField"),b.reader("typeIdField",["layerDefinition.typeIdField"])],c.prototype,"readTypeIdField",null),o([b.property({type:[L]})],c.prototype,"types",void 0),o([b.reader("service","types",["types"]),b.reader("types",["layerDefinition.types"])],c.prototype,"readTypes",null),o([b.property({type:String})],c.prototype,"url",null),o([b.writer("url")],c.prototype,"writeUrl",null),o([b.property({readOnly:!0})],c.prototype,"userIsAdmin",void 0),o([b.property({json:{origins:{"portal-item":{read:!1}}}})],c.prototype,"version",void 0),o([b.reader("service","version",["currentVersion","capabilities","drawingInfo","hasAttachments","htmlPopupType","relationships","timeInfo","typeIdField","types"]),b.reader("version",["layerDefinition.currentVersion","layerDefinition.capabilities","layerDefinition.drawingInfo","layerDefinition.hasAttachments","layerDefinition.htmlPopupType","layerDefinition.typeIdField","layerDefinition.types"])],c.prototype,"readVersion",null),o([b.property({type:Boolean,json:{origins:{"portal-item":{write:{target:"layerDefinition.defaultVisibility"}}}}})],c.prototype,"visible",void 0),o([b.reader("portal-item","visible",["visibility","layerDefinition.defaultVisibility"])],c.prototype,"readVisible",null),o([n(0,b.cast(ee))],c.prototype,"queryFeatures",null),o([n(0,b.cast(ee))],c.prototype,"queryObjectIds",null),o([n(0,b.cast(ee))],c.prototype,"queryFeatureCount",null),o([n(0,b.cast(ee))],c.prototype,"queryExtent",null),c=o([b.subclass("esri.layers.FeatureLayer")],c)}(b.declared(D,j,x,E,M,T,m))});