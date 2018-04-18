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

define(["require","exports","../../core/tsSupport/declareExtendsHelper","../../core/tsSupport/decorateHelper","dojo/has","dojo/_base/config","../../Graphic","../../core/Accessor","../../core/Collection","../../core/Error","../../core/Evented","../../core/Handles","../../core/Logger","../../core/promiseUtils","../../core/watchUtils","../../core/accessorSupport/decorators","../../geometry/coordinateFormatter","../../geometry/Point","../../geometry/SpatialReference","../../geometry/support/webMercatorUtils","../../portal/support/geometryServiceUtils","../../symbols/PictureMarkerSymbol","./support/Conversion","./support/coordinateConversionUtils"],function(e,t,o,r,n,i,a,s,c,l,p,d,u,h,v,f,m,g,_,y,w,C,b,S){var P={default:"default",crosshair:"crosshair"},L=new g([0,0,500]),M=window.location.pathname+"__coordinateConversionWidgetState",W=u.getLogger("esri.widgets.CoordinateConversion.CoordinateConversionViewModel"),j={conversions:"conversions",formats:"formats",view:"view",viewChange:"view-change"},G=0,U=[];return function(t){function s(o){var r=t.call(this,o)||this;return r._conversionPromise=null,r._formatterAvailable=!1,r._handles=new d,r._locationGraphic=null,r._geometryServicePromise=null,r._locale=i.locale,r._pointerCount=0,r.conversions=new c([]),r.formats=new c(S.generateDefaultFormats()),r.requestDelay=300,r.locationSymbol=new C({url:e.toUrl(n("trident")?"../../images/search/search-symbol-32.png":"../../images/search/search-symbol-32.svg"),size:12,width:12,height:12}),r.view=null,r._instanceNumber=G,G++,r._saveWidgetState=r._saveWidgetState.bind(r),r._handleFormatChange=r._handleFormatChange.bind(r),r._handleConversionChange=r._handleConversionChange.bind(r),r._handleViewChange=r._handleViewChange.bind(r),r._onClick=r._onClick.bind(r),r._onPointerMove=r._onPointerMove.bind(r),r._onPointerDown=r._onPointerDown.bind(r),r._onPointerUp=r._onPointerUp.bind(r),r}return o(s,t),s.prototype.initialize=function(){var e=this;if(this._loadWidgetState(),this.formats.forEach(function(t){e._handles.add(t.watch("currentPattern",e._saveWidgetState),t.name)}),this._handles.add(this.conversions.on("change",this._handleConversionChange),j.conversions),this._handles.add(this.formats.on("change",this._handleFormatChange),j.formats),this._handles.add(v.init(this,"view.map",function(t){e._geometryServicePromise=w.create(e.get("view.map.portalItem"))}),j.viewChange),m.isSupported()?m.load().then(function(){e._formatterAvailable=!0}).catch(function(t){W.error(new l("coordinate-conversion:formatter-load-failed","Failed to load the coordinateFormatter.",{error:t})),e._formatterAvailable=!1}).always(function(){return e._handles.add(v.init(e,"view",e._handleViewChange),j.viewChange)}):(this._formatterAvailable=!1,this._handles.add(v.init(this,"view",this._handleViewChange),j.viewChange)),0===this.conversions.length){var t=this.formats.find(function(e){return"xy"===e.name})||this.formats.getItemAt(0);this.conversions.add(new b({format:t}))}},s.prototype.destroy=function(){this._handles.removeAll(),this._cleanUpView(this.view),this.view=null},Object.defineProperty(s.prototype,"currentLocation",{get:function(){return this._get("currentLocation")||null},set:function(e){this._set("currentLocation",e),this._updateConversions()},enumerable:!0,configurable:!0}),Object.defineProperty(s.prototype,"mode",{get:function(){return this._get("mode")||"live"},set:function(e){switch(e){case"capture":this.currentLocation=null,this._startCaptureMode(),this._set("mode",e);break;case"live":this._startLiveMode(),this._set("mode",e)}},enumerable:!0,configurable:!0}),Object.defineProperty(s.prototype,"state",{get:function(){var e=this.get("view");return this.get("view.ready")?"ready":e?"loading":"disabled"},enumerable:!0,configurable:!0}),Object.defineProperty(s.prototype,"waitingForConversions",{get:function(){var e=this._conversionPromise;return!!e&&!e.isFulfilled()},enumerable:!0,configurable:!0}),Object.defineProperty(s.prototype,"_debouncedConvert",{get:function(){var e=this;return S.debounceDeferred(function(t,o){return h.eachAlways(t.map(function(t){return e._convertServer(t,o)}))},this,this.requestDelay)},enumerable:!0,configurable:!0}),s.prototype.setLocation=function(e){if(this.view.graphics.remove(this._locationGraphic),e){var t=e.clone();t.hasZ&&(t.z=void 0),this._locationGraphic=new a({geometry:t,symbol:this.get("locationSymbol")}),this.view.graphics.add(this._locationGraphic)}},s.prototype.convert=function(e,t){return S.isValidPoint(t)?"client"===this._determineConversionStrategy(e,t.spatialReference)?this._convertClient(e,t):this._convertServer(e,t):h.reject(new l("coordinate-conversion:invalid-point","Invalid point cannot be converted.",{point:t}))},s.prototype.goToLocation=function(e){if(this.get("view.clippingArea")||this.get("view.map.basemap.baseLayers.length")>0){var t=this.get("view.clippingArea")||this.view.map.basemap.baseLayers.getItemAt(0).fullExtent;return t?t.contains(e)?this.view.goTo({target:e}):h.reject(new l("coordinate-conversion:go-to-failed","Point outside basemap extent.",{point:e})):this.view.goTo({target:e})}return this.view.goTo({target:e})},s.prototype.isSupportedNotation=function(e){return"dd"===e||"dms"===e||"ddm"===e||"mgrs"===e||"usng"===e||"utm"===e},s.prototype.pause=function(){this.currentLocation=null,this._handles.remove(j.view),this.view&&(this.view.cursor=P.default,this.view.graphics.remove(this._locationGraphic))},s.prototype.previewConversion=function(e,t){return void 0===t&&(t=this.currentLocation||L),this._convertMany([e],t).then(function(t){return e.displayCoordinate})},s.prototype.resume=function(){"capture"===this.mode?this._startCaptureMode():this._startLiveMode()},s.prototype.reverseConvert=function(e,t,o){void 0===o&&(o=this.get("view.spatialReference")||_.WGS84);var r,n=t.name,i=t.parseUserInput(e),a=t.get("conversionInfo.reverseConvert");if(a)r=a(e,n);else if("xy"===n)r=S.fromXY(i);else if("basemap"===n)r=S.fromXY(i,o);else if(this.isSupportedNotation(n)&&this._formatterAvailable)r=this._reverseConvert(t,i);else if(this.isSupportedNotation(n))return S.fromGeoCoordinateString({formatName:n,coordinate:i,spatialReference:o,geometryServicePromise:this._geometryServicePromise});return r?S.project({location:r,spatialReference:o,geometryServicePromise:this._geometryServicePromise}).then(function(e){return e.location.normalize()}):h.reject(new l("coordinate-conversion:input-parse-failed","Failed to parse input.",{input:e}))},s.prototype.updateConversions=function(e,t){return t&&t.type&&"point"===t.type?this._convertMany(e,t).then(function(e){return e.client.concat(e.server)}):(this._clearConversions(this.conversions),h.reject(new l("coordinate-conversion:invalid-input-point","Point is invalid, conversions cannot be updated.",{point:t})))},s.prototype._cleanUpView=function(e){e&&(e.graphics.remove(this._locationGraphic),this._handles.remove(j.view),this.view.cursor=P.default)},s.prototype._clearConversions=function(e){e.forEach(function(e){e.position={location:null,coordinate:null}})},s.prototype._convertClient=function(e,t){var o=e.name,r=t.spatialReference.isWebMercator?y.webMercatorToGeographic(t):t,n=S.getDegreePrecision(this.get("view.scale")),i={location:t,coordinate:null};if(e.get("conversionInfo.convert"))return i=e.convert(t),i?h.resolve(i):h.reject(new l("coordinate-conversion:could-not-convert-client","Custom convert method failed.",{format:e}));switch(o){case"basemap":i.coordinate=S.pointToCoordinate(i.location,this.get("view.scale"));break;case"xy":i.location=r,i.coordinate=S.pointToCoordinate(r,this.get("view.scale"));break;case"dd":case"ddm":case"dms":i.coordinate=m.toLatitudeLongitude(r,o,n);break;case"mgrs":i.coordinate=m.toMgrs(r,"automatic",5,!1);break;case"usng":i.coordinate=m.toUsng(r,5,!1);break;case"utm":i.coordinate=m.toUtm(r,"latitude-band-indicators",!0);break;default:i=null}return i?h.resolve(i):h.reject(new l("coordinate-conversion:could-not-convert-client","Unsupported format in client mode.",{format:e}))},s.prototype._convertMany=function(e,t){var o=this,r=this._sortConversions(e,t.spatialReference),n=r.client,i=r.server,a=h.all(n.map(function(e){var r=e.format;return o._convertClient(r,t).then(function(t){return e.position=t,e}).catch(function(t){return W.error(t),e})}));return this._conversionPromise=i.length>0?this._debouncedConvert(i.map(function(e){return e.format}),t).always(function(e){return e?(o.notifyChange("waitingForConversions"),e.map(function(e,t){var o=i[t];return e.error?(W.error(e.error),o):(o.position=e.value,o)})):[]}):h.resolve([]),this.waitingForConversions||this.notifyChange("waitingForConversions"),h.all([a,this._conversionPromise]).then(function(e){return{client:e[0],server:e[1]}})},s.prototype._convertServer=function(e,t){var o,r=this,n=e.name;if(e.get("conversionInfo.convertDeferred"))o=e.convertDeferred(t);else if("basemap"===n)o=S.project({location:t,spatialReference:this.get("view.spatialReference"),geometryServicePromise:this._geometryServicePromise,scale:this.get("view.scale")});else if("xy"===n)o=S.project({location:t,spatialReference:_.WGS84,geometryServicePromise:this._geometryServicePromise,scale:this.get("view.scale")});else if(this.isSupportedNotation(n)&&!this._formatterAvailable)o=S.toGeoCoordinateString({location:t,formatName:n,geometryServicePromise:this._geometryServicePromise});else if(this.isSupportedNotation(n)&&this._formatterAvailable)o=S.project({location:t,spatialReference:_.WGS84,geometryServicePromise:this._geometryServicePromise,scale:this.get("view.scale")}).then(function(t){return r._convertClient(e,t.location)});else{if(!e.get("conversionInfo.spatialReference"))return h.reject(new l("coordinate-conversion:could-not-convert-server","Unsupported format in server mode.",{format:e}));o=S.project({location:t,spatialReference:e.conversionInfo.spatialReference,geometryServicePromise:this._geometryServicePromise,scale:this.get("view.scale")})}return o},s.prototype._determineConversionStrategy=function(e,t){var o=e.name,r=this.get("view.spatialReference.isWebMercator")||this.get("view.spatialReference.isWGS84"),n=this._formatterAvailable,i=this.isSupportedNotation(o);return e.get("conversionInfo.convert")?"client":e.get("conversionInfo.convertDeferred")?"server":t.isGeographic&&t.wkt&&n&&i?"client":"xy"===o?r?"client":"server":"basemap"===o?t.wkid===this.get("view.spatialReference.wkid")||(t.isWebMercator||t.isWGS84)&&r?"client":"server":n&&i&&r?"client":"server"},s.prototype._handleConversionChange=function(e){var t=this;e.added.forEach(function(e){var o=e.format;t.currentLocation&&t.convert(o,t.currentLocation).then(function(t){e.position=t})}),this._saveWidgetState()},s.prototype._handleFormatChange=function(e){var t=this;e.added.forEach(function(e){t._handles.add(e.watch("currentPattern",t._saveWidgetState),e.name)}),e.removed.forEach(function(e){t._handles.remove(e.name)})},s.prototype._loadWidgetState=function(){if(0===this._instanceNumber)try{var e=JSON.parse(localStorage.getItem(M));e&&(U=e)}catch(e){W.error(new l("coordinate-conversion:invalid-local-storage-json","Could not read from localStorge.",{error:e}))}this._setWidgetState()},s.prototype._reverseConvert=function(e,t){switch(e.name){case"dd":case"dms":case"ddm":return m.fromLatitudeLongitude(t);case"mgrs":return m.fromMgrs(t,_.WGS84,"automatic");case"usng":return m.fromUsng(t,_.WGS84);case"utm":return t=t.replace(/\ /g,""),m.fromUtm(t,_.WGS84,"latitude-band-indicators");default:return null}},s.prototype._startCaptureMode=function(){this._handles.remove(j.view),this.view&&(this.view.cursor=P.crosshair,this.currentLocation&&this.setLocation(this.currentLocation),this._handles.add(this.view.on("click",this._onClick),j.view))},s.prototype._startLiveMode=function(){this._pointerCount=0,this._handles.remove(j.view),this.view&&(this.view.cursor=P.default,this.view.graphics.remove(this._locationGraphic),this._handles.add([this.view.on("pointer-down",this._onPointerDown),this.view.on("pointer-up",this._onPointerUp),this.view.on("pointer-move",this._onPointerMove)],j.view))},s.prototype._handleViewChange=function(e,t){t&&t!==e&&this._cleanUpView(t),e&&("capture"===this.mode&&this._startCaptureMode(),this._startLiveMode())},s.prototype._onClick=function(e){if(0===e.button){var t=this.view.toMap(e),o=t&&t.normalize();this.setLocation(o),this.currentLocation=o}},s.prototype._onPointerDown=function(e){var t=e.pointerType;if(this._pointerCount++,("touch"===t||"pen"===t)&&1===this._pointerCount){var o=this.view.toMap(e);this.currentLocation=o&&o.normalize()}},s.prototype._onPointerMove=function(e){if("mouse"===e.pointerType||1===this._pointerCount){var t=this.view.toMap(e);this.currentLocation=t&&t.normalize()}},s.prototype._onPointerUp=function(e){this._pointerCount--},s.prototype._setWidgetState=function(){var e=this,t=U[this._instanceNumber];try{t.formats.forEach(function(o){var r=e.formats.find(function(e){return e.name===o.name});t.locale===e._locale&&o.currentPattern&&(r.currentPattern=o.currentPattern),o.index>=0&&e.conversions.add(new b({format:e.formats.find(function(e){return e.name===o.name})}))})}catch(e){W.warn(new l("coordinate-conversion:local-storage-read-error","Could not get widget state from stored JSON.",{error:e})),U[this._instanceNumber]={formats:[],locale:this._locale}}},s.prototype._sortConversions=function(e,t){var o=this;return e.reduce(function(e,r){return"client"===o._determineConversionStrategy(r.format,t)?e.client.push(r):e.server.push(r),e},{server:[],client:[]})},s.prototype._saveWidgetState=function(){var e=this._toJSON();U[this._instanceNumber]={formats:e,locale:this._locale};try{localStorage.setItem(M,JSON.stringify(U))}catch(e){W.error(new l("coordinate-conversion:local-storage-write-error","Could not write to localStorage.",{error:e}))}},s.prototype._updateConversions=function(){var e=this.conversions.toArray();return this.updateConversions(e,this.currentLocation)},s.prototype._toJSON=function(){var e=this;return this.formats.filter(function(t){var o=t.name;return"xy"===o||"basemap"===o||e.isSupportedNotation(o)}).map(function(t){return{name:t.name,currentPattern:t.currentPattern,index:e.conversions.findIndex(function(e){return e.format===t})}}).sort(function(e,t){return e.index-t.index}).toArray()},r([f.property()],s.prototype,"conversions",void 0),r([f.property({type:g})],s.prototype,"currentLocation",null),r([f.property()],s.prototype,"formats",void 0),r([f.property()],s.prototype,"mode",null),r([f.property()],s.prototype,"requestDelay",void 0),r([f.property({dependsOn:["view.ready"],readOnly:!0})],s.prototype,"state",null),r([f.property()],s.prototype,"locationSymbol",void 0),r([f.property({readOnly:!0})],s.prototype,"waitingForConversions",null),r([f.property()],s.prototype,"view",void 0),r([f.property({readOnly:!0,dependsOn:["requestDelay"]})],s.prototype,"_debouncedConvert",null),s=r([f.subclass("esri.widgets.CoordinateConversion.CoordinateConversionViewModel")],s)}(f.declared(s,p))});