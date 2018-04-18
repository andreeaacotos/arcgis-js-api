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

define(["require","../core/promiseUtils","dojo/_base/array","dojo/on","dojo/Deferred","dojo/promise/all","../layers/support/layerUtils","../geometry/support/scaleUtils","../geometry/Extent","../tasks/support/Query","../layers/GroupLayer","../core/Accessor"],function(e,t,r,a,n,i,s,o,l,u,p,c){var f;return c.createSubclass({declaredClass:"esri.views.PopupManager",properties:{map:{dependsOn:["view.map"],readOnly:!0}},constructor:function(){this._featureLayersCache={}},destroy:function(){this._featureLayersCache={},this.view=null},_clickHandle:null,_featureLayersCache:null,enabled:!1,_enabledSetter:function(e){this._clickHandle&&(e?this._clickHandle.resume():this._clickHandle.pause()),this._set("enabled",e)},_mapGetter:function(){return this.get("view.map")||null},view:null,_viewSetter:function(e){this._clickHandle&&(this._clickHandle.remove(),this._clickHandle=null),e&&(this._clickHandle=a.pausable(e,"click",this._clickHandler.bind(this)),this.enabled||this._clickHandle.pause()),this._set("view",e)},getMapLayer:function(e){var t;if(e&&(t=e.findLayerById())){var r=t.id;if(this._featureLayersCache[r]){var a=r.lastIndexOf("_");a>-1&&(r=r.substring(0,a),t=this.map.findLayerById(r))}}return t},_closePopup:function(){var e=this.get("view.popup");e&&(e.clear(),e.close())},_showPopup:function(e,a,i){function s(e){return y.allLayerViews.find(function(t){return t.layer===e})}function c(e){if(null==e)return!1;var t=s(e);return null!=t&&(e.loaded&&!t.suspended&&(e.popupEnabled&&e.popupTemplate||"graphics"===e.type||"geo-rss"===e.type||"map-notes"===e.type||"kml"===e.type||t.getPopupData))}function f(e){var t=s(e);return t&&t.hasDraped}var h=this.map,y=this.view,d=y.popup,v=this,m=[],g="3d"===y.type;if(r.forEach(h.layers.toArray(),function(e){e.isInstanceOf(p)?r.forEach(e.layers.toArray(),function(e){!c(e)||g&&!f(e)||m.push(e)}):!c(e)||g&&!f(e)||m.push(e)}),y.graphics.length>0&&m.push(y.graphics),(i&&y.graphics.includes(i)?!i.popupTemplate:i&&!c(i.layer))&&(i=null),!m.length&&!i)return void v._closePopup();var _=[],b=!!i,w=v._calculateClickTolerance(m);if(!a)return void v._closePopup();var L=1;"2d"===y.type&&(L=y.state.resolution);var x=y.basemapTerrain;x&&x.overlayManager&&(L=x.overlayManager.overlayPixelSizeInMapUnits(a));var M=w*L;x&&!x.spatialReference.equals(y.spatialReference)&&(M*=o.getMetersPerUnitForSR(x.spatialReference)/o.getMetersPerUnitForSR(y.spatialReference));var I=a.clone().offset(-M,-M),P=a.clone().offset(M,M),O=new l(Math.min(I.x,P.x),Math.min(I.y,P.y),Math.max(I.x,P.x),Math.max(I.y,P.y),y.spatialReference),T=function(e){var r;if("imagery"===e.type){var n=new u;n.geometry=a;var o=s(e),l={};l.rasterAttributeTableFieldPrefix="Raster.",l.returnDomainValues=!0,l.layerView=o,r=e.queryVisibleRasters(n,l).then(function(e){return b=b||e.length>0,e})}else if("csv"===e.type||"scene"===e.type||!v._featureLayersCache[e.id]&&"function"!=typeof e.queryFeatures){if("map-image"===e.type||"wms"===e.type)return o=s(e),o.getPopupData(O);var p,c,f=[];"esri.core.Collection<esri.Graphic>"===e.declaredClass?(p=e,c=!0):"graphics"===e.type?(p=e.graphics,c=!0):(o=s(e),p=o&&o.loadedGraphics,c=!1),p&&(f=p.filter(function(e){return e&&(!c||e.popupTemplate)&&e.visible&&O.intersects(e.geometry)}).toArray()),f.length>0&&(b=!0,r="scene"===e.type?v._fetchSceneAttributes(e,f):t.resolve(f))}else{var h=e.createQuery();h.geometry=O,r=e.queryFeatures(h).then(function(t){var r=t.features;if(i&&i.layer===e&&e.objectIdField){var a=e.objectIdField,n=i.attributes[a];r=r.filter(function(e){return e.attributes[a]!==n})}if(!i&&"function"==typeof s(e).getGraphics3DGraphics){var o=[],l=s(e).getGraphics3DGraphics();for(var u in l)o.push(l[u].graphic.attributes[e.objectIdField]);r=r.filter(function(t){return-1!==o.indexOf(t.attributes[e.objectIdField])})}return b=b||r.length>0,r})}return r};if(g&&!i||!g){_=m.map(T).filter(function(e){return!!e});var k=function(e){return e.reduce(function(e,t){return e.concat(t.items?k(t.items):t)},[])};_=k(_)}if(i)if(i.layer&&"scene"===i.layer.type)_.unshift(this._fetchSceneAttributes(i.layer,[i]));else if(i.popupTemplate){var D=new n;_.unshift(D.resolve([i]))}if(!r.some(_,function(e){return!e.isFulfilled()})&&!b)return void v._closePopup();_.length&&d.open({promises:_,location:a})},_fetchSceneAttributes:function(e,r){return this.view.whenLayerView(e).then(function(a){var n=this._getOutFields(e.popupTemplate),i=r.map(function(e){return a.whenGraphicAttributes(e,n).catch(function(){return e})});return t.eachAlways(i)}.bind(this)).then(function(e){return e.map(function(e){return e.value})})},_getSubLayerFeatureLayers:function(t,o){var l=o||new n,u=[],p=t.length,c=Math.floor(this.view.extent.width/this.view.width),h=this.view.scale,y=!1,d=this;e:for(var v=0;v<p;v++){var m=t[v],g=m.dynamicLayerInfos||m.layerInfos;if(g){var _=null;m._params&&(m._params.layers||m._params.dynamicLayers)&&(_=m.visibleLayers),_=s._getVisibleLayers(g,_);for(var b=s._getLayersForScale(h,g),w=g.length,L=0;L<w;L++){var x=g[L],M=x.id,I=m.popupTemplates[M];if(!x.subLayerIds&&I&&I.popupTemplate&&r.indexOf(_,M)>-1&&r.indexOf(b,M)>-1){if(!f){y=!0;break e}var P=m.id+"_"+M,O=this._featureLayersCache[P];if(O&&O.loadError)continue;if(!O){var T=I.layerUrl;T||(T=x.source?this._getLayerUrl(m.url,"/dynamicLayer"):this._getLayerUrl(m.url,M)),O=new f(T,{id:P,drawMode:!1,mode:f.MODE_SELECTION,outFields:this._getOutFields(I.popupTemplate),resourceInfo:I.resourceInfo,source:x.source}),this._featureLayersCache[P]=O}O.setDefinitionExpression(m.layerDefinitions&&m.layerDefinitions[M]),O.setGDBVersion(m.gdbVersion),O.popupTemplate=I.popupTemplate,O.setMaxAllowableOffset(c),O.setUseMapTime(!!m.useMapTime),m.layerDrawingOptions&&m.layerDrawingOptions[M]&&m.layerDrawingOptions[M].renderer&&O.setRenderer(m.layerDrawingOptions[M].renderer),u.push(O)}}}}if(y){var k=new n;e(["../layers/FeatureLayer"],function(e){f=e,k.resolve()}),k.then(function(){d._getSubLayerFeatureLayers(t,l)})}else{var D=[];r.forEach(u,function(e){if(!e.loaded){var t=new n;a.once(e,"load, error",function(){t.resolve()}),D.push(t.promise)}}),D.length?i(D).then(function(){u=r.filter(u,function(e){return!e.loadError&&e.isVisibleAtScale(h)}),l.resolve(u)}):(u=r.filter(u,function(e){return e.isVisibleAtScale(h)}),l.resolve(u))}return l.promise},_getLayerUrl:function(e,t){var r=e.indexOf("?");return-1===r?e+"/"+t:e.substring(0,r)+"/"+t+e.substring(r)},_getOutFields:function(e){var t=["*"];if("esri.PopupTemplate"===e.declaredClass){var a=null==e.content||Array.isArray(e.content)&&e.content.every(function(e){return"attachments"===e.type||"fields"===e.type&&null==e.fieldInfos||"text"===e.type&&-1===e.text.indexOf("{")});e.fieldInfos&&!e.expressionInfos&&a&&(t=[],r.forEach(e.fieldInfos,function(e){var r=e.fieldName&&e.fieldName.toLowerCase();r&&"shape"!==r&&0!==r.indexOf("relationships/")&&t.push(e.fieldName)}))}return t},_calculateClickTolerance:function(e){var t=6;return r.forEach(e,function(e){var a=e.renderer;if(a)if("simple"===a.type){var n=a.symbol;n&&n.xoffset&&(t=Math.max(t,Math.abs(n.xoffset))),n&&n.yoffset&&(t=Math.max(t,Math.abs(n.yoffset)))}else"unique-value"!==a.type&&"class-breaks"!==a.type||r.forEach(a.uniqueValueInfos||a.classBreakInfos,function(e){var r=e.symbol;r&&r.xoffset&&(t=Math.max(t,Math.abs(r.xoffset))),r&&r.yoffset&&(t=Math.max(t,Math.abs(r.yoffset)))})}),t},_clickHandler:function(e){function t(e){return n.allLayerViews.find(function(t){return t.layer===e})}function r(e){if(null==e)return!1;var r=t(e);return null!=r&&(e.loaded&&!r.suspended&&(e.popupEnabled&&e.popupTemplate||"graphics"===e.type||r.getPopupData))}function a(e){var r=t(e);return r&&r.hasDraped}var n=this.view,i=n.popup,s=n.map,o=e.screenPoint,l=this;if(0===e.button&&i&&n.ready){var u="3d"===n.type,c=s.allLayers.some(function(e){return!e.isInstanceOf(p)&&!(!r(e)||u&&!a(e))});if(null!=o)return void this.view.hitTest(o.x,o.y).then(function(t){if(c||t.results.length>0)if(t.results.length>0){var r=t.results[0];l._showPopup(e,r.mapPoint,r.graphic)}else l._showPopup(e,e.mapPoint,null);else l._closePopup()});l._showPopup(e,e.mapPoint)}}})});