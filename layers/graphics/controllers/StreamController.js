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

define(["../../../core/declare","dojo/Deferred","../../../core/Accessor","../../../core/Promise","../../../core/Collection","../../../core/Handles","../../../core/Evented","../../../core/promiseUtils","../../../core/Error","../../support/StreamPurger","../../../Graphic","../../../geometry/support/jsonUtils","../../../tasks/support/Query"],function(e,t,r,i,n,s,o,a,l,u,h,c,d){return e([r,i,o],{declaredClass:"esri.layers.graphics.controllers.StreamController",constructor:function(){this._addFeatures=this._addFeatures.bind(this),this._handleMessage=this._handleMessage.bind(this),this._handles=new s,this._nextId=0},initialize:function(){var e=this.layer.when(function(){var e=n.ofType(h);return this.source=this.layer.source,this.graphics=this.graphics||new e,this._initializeFilter(),new u(this).when()}.bind(this)).then(function(e){return this.purger=e,this._makeConnection()}.bind(this)).catch(function(e){throw new l("stream-controller:initialize","Error during initialization process",e.message)}.bind(this));this.addResolvingPromise(e)},destroy:function(){this.connection&&(this.connection.disconnect(),this._set("connection",null)),this.purger&&(this.purger.destroy(),this.purger=null),this.graphics=null,this._handles&&(this._handles.destroy(),this._handles=null)},properties:{connection:{readOnly:!0,value:null},graphics:{type:n.ofType(h),set:function(e){this._get("graphics")!==e&&(this._handles.remove("graphics"),e&&(this._collectionChanged({added:e.toArray()}),this._handles.add(e.on("change",this._collectionChanged.bind(this)),"graphics")),this._set("graphics",e))}},filter:{value:{geometry:null,where:null},readOnly:!0},definitionExpression:{value:null,get:function(){return console.warn("StreamController.definitionExpression is deprecated. Access the filter.where property"),this.filter.where},set:function(e){console.warn("StreamController.definitionExpression is deprecated. Use the updateFilter method to change the attribute filter");var t={where:e};this.updateFilter(t)}},geometryDefinition:{value:null,get:function(){return console.warn("StreamController.geometryDefinition is deprecated. Access the filter.geometry property"),this.filter.geometry},set:function(e){console.warn("StreamController.geometryDefinition is deprecated. Use the updateFilter method to change the spatial filter");var t={geometry:e};this.updateFilter(t)}},layer:{value:{}},purger:{set:function(e){this._get("purger")!==e&&this._set("purger",e)}},updating:{value:!1,readOnly:!0,dependsOn:["connection","connection.connectionStatus"],get:function(){return!this.connection||"connected"===this.connection.connectionStatus}}},updateFilter:function(e){return this._filterValid(e)?this._filterChanged(e)?this._setFilter(e):a.resolve({filter:this.filter}):a.reject(new Error("Invalid properties in filter. geometry must be an extent and where must be a string"))},_makeConnection:function(){return this._handles.remove("websocket"),this._addBuddiedServiceFeatures(!0).then(function(){return this._addBuddiedServiceFeatures(!1)}.bind(this),function(e){return a.reject(new Error("Error fetching related features. Layer cannot be created"))}.bind(this)).then(function(e){var t=this.layerView.view.spatialReference;return this.source.createWebSocketConnector(t)}.bind(this)).then(function(e){return this._set("connection",e),this._handles.add(e.on("data-received",function(e){this._handleMessage(e)}.bind(this)),"websocket"),e.connect()}.bind(this))},_handleMessage:function(e){var t,r=JSON.parse(e);this.emit("data-received",r),r.filter||(t=r instanceof Array?r:[r],this._addFeatures(t))},_addFeatures:function(e){if(e){for(var t=this.layer.objectIdField,r=[],i=0,n=e.length;i<n;i++){var s,o=e[i];!o.geometry||o.geometry.hasOwnProperty("x")&&!o.geometry.x||(o.attributes&&(o.attributes[t]||0===o.attributes[t])||(o.attributes=o.attributes||{},o.attributes[t]=this._nextId++),s=o.declaredClass?o:h.fromJSON(o),r.push(s))}this.purger.addMany(r)}},_collectionChanged:function(e){var t,r,i;if(i=e.added)for(t=0;r=i[t];t++)r.layer=this.layer,r.sourceLayer=this.layer;if(i=e.removed)for(t=0;r=i[t];t++)r.layer=null,r.sourceLayer=null},_initializeFilter:function(){var e=this.layer;e&&e.filter&&this._set("filter",{where:e.filter.where||null,geometry:e.filter.geometry||null}),this._handles.add(this.watch("layer.filter",function(e){this._setFilter(e)}.bind(this)))},_filterChanged:function(e){var t,r=!1,i=!1;return t=e?this.source.makeFilter(e):{geometry:null,where:null},t.hasOwnProperty("geometry")&&(r=t.geometry?!t.geometry.equals(this.filter.geometry):t.geometry!==this.filter.geometry),t.hasOwnProperty("where")&&(i=t.where!==this.filter.where),r||i},_filterValid:function(e){var t=!0;return e&&(e.hasOwnProperty("geometry")&&e.geometry&&(e.geometry.type&&"extent"===e.geometry.type||(t=!1)),t&&e.hasOwnProperty("where")&&e.where&&"string"!=typeof e.where&&(t=!1)),t},_setFilter:function(e){var r=null,i=new t;e&&(r=this.source.makeFilter(e),r.geometry&&"string"!=typeof r.geometry&&(r.geometry=r.geometry.toJSON?JSON.stringify(r.geometry.toJSON()):JSON.stringify(r.geometry)));var n={filter:r},s=this.connection.on("data-received",function(e){if(e=JSON.parse(e),e.hasOwnProperty("filter")){s.remove();var t=this._processFilterMessage(e);t.error?i.reject(t.error):i.resolve({filter:this.filter})}}.bind(this));return this.connection.send(n),i.promise},_processFilterMessage:function(e){var t,r,i={};return e.error?(i.error=new Error(e.error.join(",")),i.filter={where:this.filter.where,geometry:this.filter.geometry}):(e.filter=e.filter||{},t=e.filter.geometry,t&&("string"==typeof t&&(t=JSON.parse(t)),t=c.fromJSON(t)),r={where:e.filter.where||null,geometry:t||null},this._set("filter",r),this.notifyChange("geometryDefinition"),this.notifyChange("definitionExpression"),i.filter=r),i},_addBuddiedServiceFeatures:function(e){var t,r,i;if(e){if(!this.source.relatedFeaturesInfo)return a.resolve();t=this.source.relatedFeaturesQueryTask,r=this.source.relatedLayerDefinition,i=this._createQuery(r,!0)}else{if(!this.source.latestUrl)return a.resolve();t=this.source.latestQueryTask,r=this.source.archivedLayerDefinition,i=this._createQuery(r,!1)}return!!(r.advancedQueryCapabilities||{}).supportsPagination&&(i.num=r.maxRecordCount),this._query({query:i,queryTask:t}).then(function(e){if(e){var t=this._fixFieldNameCasing(this.source.layer,e);e.features=t,this._addFeatures(e.features)}return a.resolve()}.bind(this),function(e){return a.reject(e)},function(e){e&&this._addFeatures(e.features)}.bind(this))},_query:function(e){var r=e.query,i=e.queryTask,n=new t;r.num&&(r.start=0);var s=function(e){(e||0===e)&&(r.start=e),i.execute(r).then(o,function(e){n.reject(e)})},o=function(e){e.exceededTransferLimit&&r.num?(s(r.start+r.num),n.progress(e)):n.resolve(e)};return s(r.start),n.promise},_createQuery:function(e,t){var r=this.layer,i=this.layerView,n={where:"1=1",returnGeometry:!0,outFields:["*"]};if(!e)return new d(n);var s;s=t?this.source.relatedFeaturesInfo&&this.source.relatedFeaturesInfo.outFields:r.outFields,s=s?s.slice(0):["*"];var o=this.filter.where||"1=1";if(t){var a=this._getFieldsNotShared(e,this.layer.fields);s=this._removeInvalidOutfields(a,s),"1=1"!==o&&this._checkForInvalidFieldInWhere(a,o)&&(o="1=1")}return s=this._addObjectIdFieldToOutfields(e,s),new d({where:o,geometry:this.filter.geometry,outFields:s,outSpatialReference:i.view.spatialReference,returnGeometry:!0})},_addObjectIdFieldToOutfields:function(e,t){if(t=t||["*"],"*"!==t[0]){var r=this._getObjectIdFieldName(e);if(r){t.some(function(e){return e.toLowerCase()===r.toLowerCase()})||t.push(r)}}return t},_removeInvalidOutfields:function(e,t){t=t||["*"];var r;return"*"!==t[0]&&(r=t.filter(function(t){if(-1===e.indexOf(t))return t})),r&&0!==r.length?r:["*"]},_checkForInvalidFieldInWhere:function(e,t){return!(!t||"1=1"===t)&&e.some(function(e){return new RegExp("\\s*"+e+"\\b","i").test(t)})},_getObjectIdFieldName:function(e){var t=null;return e.fields.some(function(e){return"esriFieldTypeOID"===e.type&&(t=e.name,!0)}),t},_getFieldsNotShared:function(e,t){var r=e.fields.map(function(e){return e.name.toLowerCase()}),i=[];return t.forEach(function(e){var t=e.name;-1===r.indexOf(t.toLowerCase())&&i.push(t)}),i},_fixFieldNameCasing:function(e,t){var r,i,n=[];if(!e)throw new Error("streamLayer is a required argument for _fixFieldNameCasingmethod");if(e&&(r=e.fields),t&&(n=t.features||[],i=t.fields),!i||!n.length||!r)return n;for(var s,o,a=this._mapFieldNameDifferences(r,i),l=[],u=0,h=t.features.length;u<h;u++)s=n[u],o=this._swizzleResponseAttributes(s.attributes,a),s.attributes=o,l.push(s);return l},_mapFieldNameDifferences:function(e,t){var r,i,n=[],s={};for(e=e||[],t=t||[],r=0,i=t.length;r<i;r++)n.push(t[r].name);for(r=0,i=e.length;r<i;r++){var o=e[r].name,a=this._checkForStreamFieldName(o,n);a&&(s[a]=o)}return s},_checkForStreamFieldName:function(e,t){var r,i,n;if(t&&t.length){if(e&&e.toLowerCase){r=e.toLowerCase();for(var s=0,o=t.length;s<o;s++)if(i=t[s],i.toLowerCase&&i.toLowerCase()===r){n=i;break}}return n}},_swizzleResponseAttributes:function(e,t){var r={};for(var i in e)if(e.hasOwnProperty(i)){var n=e[i];t.hasOwnProperty(i)?r[t[i]]=n:r[i]=n}return r}})});