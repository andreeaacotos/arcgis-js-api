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

define(["require","exports","./core/tsSupport/declareExtendsHelper","./core/tsSupport/decorateHelper","dojo/_base/lang","./core/Collection","./core/collectionUtils","./core/Evented","./core/JSONSupport","./core/Loadable","./core/Logger","./core/promiseUtils","./core/urlUtils","./core/accessorSupport/decorators","./layers/Layer","./portal/Portal","./portal/PortalItem","./support/basemapDefinitions"],function(e,r,t,o,a,n,i,s,p,l,u,c,f,y,d,h,m,b){var L=0,v=n.ofType(d),I=u.getLogger("esri.Basemap");return function(r){function n(e){var t=r.call(this)||this;t.id=null,t.portalItem=null,t.thumbnailUrl=null,t.title="Basemap",t.id=Date.now().toString(16)+"-basemap-"+L++,t.baseLayers=new v,t.referenceLayers=new v;var o=function(e){e.parent&&e.parent!==t&&"remove"in e.parent&&e.parent.remove(e),e.parent=t,"elevation"===e.type&&I.error("Layer '"+e.title+", id:"+e.id+"' of type '"+e.type+"' is not supported as a basemap layer and will therefore be ignored.")},a=function(e){e.parent=null};return t.baseLayers.on("after-add",function(e){return o(e.item)}),t.referenceLayers.on("after-add",function(e){return o(e.item)}),t.baseLayers.on("after-remove",function(e){return a(e.item)}),t.referenceLayers.on("after-remove",function(e){return a(e.item)}),t}return t(n,r),s=n,n.prototype.initialize=function(){var e=this;this.when().catch(function(r){I.error("#load()","Failed to load basemap (title: '"+e.title+"', id: '"+e.id+"')",r)}),this.resourceInfo&&this.read(this.resourceInfo.data,this.resourceInfo.context)},n.prototype.normalizeCtorArgs=function(e){return e&&"resourceInfo"in e&&(this._set("resourceInfo",e.resourceInfo),e=a.mixin({},e),delete e.resourceInfo),e},Object.defineProperty(n.prototype,"baseLayers",{set:function(e){this._set("baseLayers",i.referenceSetter(e,this._get("baseLayers"),v))},enumerable:!0,configurable:!0}),n.prototype.writeBaseLayers=function(e,r,t,o){var n=[];if(!e)return void(r[t]=n);o=a.mixin({},o,{layerContainerType:"basemap"}),this.baseLayers.forEach(function(e){if(e.write){var r={};e.write(r,o)&&n.push(r)}}),this.referenceLayers.forEach(function(e){if(e.write){var r={isReference:!0};e.write(r,o)&&n.push(r)}}),r[t]=n},Object.defineProperty(n.prototype,"referenceLayers",{set:function(e){this._set("referenceLayers",i.referenceSetter(e,this._get("referenceLayers"),v))},enumerable:!0,configurable:!0}),n.prototype.writeTitle=function(e,r){r.title=e||"Basemap"},n.prototype.load=function(){return this.addResolvingPromise(this._loadFromSource()),this.when()},n.prototype.clone=function(){var e={id:this.id,title:this.title,portalItem:this.portalItem,resourceInfo:this.resourceInfo,baseLayers:this.baseLayers.slice(),referenceLayers:this.referenceLayers.slice()};return this.loaded&&(e.loadStatus="loaded"),new s(e)},n.prototype.read=function(e,r){return this.resourceInfo||this._set("resourceInfo",{data:e,context:r}),this.inherited(arguments)},n.prototype.write=function(e,r){return e=e||{},r&&r.origin||(r=a.mixin({origin:"web-map"},r)),this.inherited(arguments,[e,r]),!this.loaded&&this.resourceInfo&&this.resourceInfo.data.baseMapLayers&&(e.baseMapLayers=this.resourceInfo.data.baseMapLayers.map(function(e){var r=a.clone(e);return r.url&&f.isProtocolRelative(r.url)&&(r.url="https:"+r.url),r.templateUrl&&f.isProtocolRelative(r.templateUrl)&&(r.templateUrl="https:"+r.templateUrl),r})),e},n.prototype._loadFromSource=function(){var e=this.resourceInfo,r=this.portalItem;return e?this._loadLayersFromJSON(e.data,e.context?e.context.url:null):r?this._loadFromItem(r):c.resolve(null)},n.prototype._loadLayersFromJSON=function(r,t){var o=this,a=this.resourceInfo&&this.resourceInfo.context,n=this.portalItem&&this.portalItem.portal||a&&a.portal||null,i=a&&"web-scene"===a.origin?"web-scene":"web-map";return c.create(function(r){return e(["./portal/support/layersCreator"],r)}).then(function(e){var a=[];if(r.baseMapLayers&&Array.isArray(r.baseMapLayers)){var s={context:{origin:i,url:t,portal:n,layerContainerType:"basemap"},defaultLayerType:"DefaultTileLayer"},p=e.populateOperationalLayers(o.baseLayers,r.baseMapLayers.filter(function(e){return!e.isReference}),s);a.push.apply(a,p);var l=e.populateOperationalLayers(o.referenceLayers,r.baseMapLayers.filter(function(e){return e.isReference}),s);a.push.apply(a,l)}return c.eachAlways(a)}).then(function(){})},n.prototype._loadFromItem=function(e){var r=this;return e.load().then(function(e){return e.fetchData()}).then(function(t){var o=f.urlToObject(e.itemUrl);return r._set("resourceInfo",{data:t.baseMap,context:{origin:"web-map",portal:e.portal||h.getDefault(),url:o}}),r.read(r.resourceInfo.data,r.resourceInfo.context),r.read({title:e.title,thumbnailUrl:e.thumbnailUrl},{origin:"portal-item",portal:e.portal||h.getDefault(),url:o}),r._loadLayersFromJSON(r.resourceInfo.data,o)})},n.fromId=function(e){var r=b[e];return r?s.fromJSON(r):null},o([y.property({type:v,json:{write:{ignoreOrigin:!0,target:"baseMapLayers"}}}),y.cast(i.castForReferenceSetter)],n.prototype,"baseLayers",null),o([y.writer("baseLayers")],n.prototype,"writeBaseLayers",null),o([y.property({type:String,json:{origins:{"web-scene":{write:!0}}}})],n.prototype,"id",void 0),o([y.property({type:m})],n.prototype,"portalItem",void 0),o([y.property({type:v}),y.cast(i.castForReferenceSetter)],n.prototype,"referenceLayers",null),o([y.property({readOnly:!0})],n.prototype,"resourceInfo",void 0),o([y.property()],n.prototype,"thumbnailUrl",void 0),o([y.property({type:String,json:{origins:{"web-scene":{write:{isRequired:!0}}}}})],n.prototype,"title",void 0),o([y.writer("title")],n.prototype,"writeTitle",null),n=s=o([y.subclass("esri.Basemap")],n);var s}(y.declared(p,s,l))});