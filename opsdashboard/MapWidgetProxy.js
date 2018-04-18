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

define(["require","exports","../core/tsSupport/extendsHelper","../core/tsSupport/decorateHelper","../core/typescript","../geometry/SpatialReference","../geometry/support/jsonUtils","./GraphicsLayerProxy","./core/messageHandler","./core/MessageReceiver"],function(e,t,n,i,a,s,r,o,p,c){return function(e){function t(t){var n=e.call(this)||this;return n._listeningToMap=!1,n.id=null,n.name=null,n.spatialReference=null,n}return n(t,e),t.prototype._setConfig=function(e){this.inherited(arguments),this.spatialReference=new s(e.spatialReference)},t.prototype._messageReceived=function(e){if(void 0!==e.args&&void 0!==e.args.mapWidgetId&&this.id===e.args.mapWidgetId)switch(e.functionName.toLowerCase()){case"extentchanged":return this._mapExtentChanged(e.args)}},t.prototype._mapExtentChanged=function(e){var t=r.fromJSON(e.extent);this.mapExtentChanged(t),this.emit("map-extent-change",{extent:t})},t.prototype.subscribeToMapEvents=function(){this._listeningToMap||(this._listeningToMap=!0,p._sendMessage({functionName:"subscribeToMapEvents",args:{mapWidgetId:this.id}}))},t.prototype.unsubscribeFromMapEvents=function(){this._listeningToMap&&(this._listeningToMap=!1,p._sendMessage({functionName:"unsubscribeFromMapEvents",args:{mapWidgetId:this.id}}))},t.prototype.mapExtentChanged=function(e){},t.prototype.getMapExtent=function(){return p._sendMessageWithReply({functionName:"getExtent",args:{mapWidgetId:this.id}}).then(function(e){return r.fromJSON(e.extent)})},t.prototype.setExtent=function(e){e&&e.type&&"extent"===e.type&&p._sendMessage({functionName:"setExtent",args:{mapWidgetId:this.id,extent:e.toJSON()}})},t.prototype.panTo=function(e){e&&e.type&&"point"===e.type&&p._sendMessage({functionName:"panTo",proxyName:"MapWidgetProxy",args:{mapWidgetId:this.id,mapPoint:e.toJSON()}})},t.prototype.createGraphicsLayerProxy=function(e){var t=this,n={functionName:"createGraphicsLayer",args:{mapWidgetId:this.id,visible:!e||!e.visible||e.visible,opacity:e&&e.opacity?e.opacity:1,minScale:e&&e.minScale?e.minScale:0,maxScale:e&&e.maxScale?e.maxScale:0,renderer:e&&e.renderer?e.renderer.toJson():void 0}};return p._sendMessageWithReply(n).then(function(n){return new o(t,n.graphicsLayerId,e)})},t.prototype.destroyGraphicsLayerProxy=function(e){e&&p._sendMessage({functionName:"removeGraphicsLayer",args:{mapWidgetId:this.id,graphicsLayerId:e._id}})},i([a.shared("esri.opsdashboard.MapWidgetProxy")],t.prototype,"declaredClass",void 0),t=i([a.subclass()],t)}(c)});