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

define(["require","exports","../../../core/tsSupport/declareExtendsHelper","../../../core/tsSupport/decorateHelper","../../../core/Accessor","../../../core/Evented","../../../core/Handles","../../../core/accessorSupport/decorators","../../../geometry/ScreenPoint","./DrawAction","./input/DrawEvents","./input/Keys"],function(e,t,r,o,i,n,s,d,c,p,v,u){return function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t._cursorMoved=!1,t._cursorScreenPoint=null,t._pointerDownEvent=null,t._viewHandles=new s,t.mode="hybrid",t.vertices=[],t.view=null,t}return r(t,e),t.prototype.initialize=function(){this._addViewHandles()},t.prototype.destroy=function(){this._removeViewHandles(),this._viewHandles.destroy(),this.emit("destroy")},Object.defineProperty(t.prototype,"_clickEnabled",{get:function(){return-1!==["hybrid","click"].indexOf(this.mode)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_dragEnabled",{get:function(){return-1!==["hybrid","freehand"].indexOf(this.mode)},enumerable:!0,configurable:!0}),t.prototype.addVertex=function(e,t){var r=this;this.vertices.splice(t,0,e);var o={vertex:e,vertexIndex:t,undo:function(){return r._undoVertexAdd(null,e,t)},redo:function(){return r._redoVertexAdd(null,e,t)}};this.history.push(o),this._set("redoHistory",[]);var i=new v.VertexAddEvent(this.view,null,t,this.vertices);this.emit("vertex-add",i),i.defaultPrevented&&(this._cursorMoved=!0,this.history.pop())},t.prototype.removeVertex=function(e){var t=this,r=this.vertices.splice(e,1)[0],o={vertex:r,vertexIndex:e,undo:function(){return t._undoVertexRemove(null,r,e)},redo:function(){return t._redoVertexRemove(null,r,e)}};this.history.push(o),this._set("redoHistory",[]),this.emit("vertex-remove",new v.VertexRemoveEvent(this.view,null,e,this.vertices))},t.prototype.updateVertex=function(e,t){var r=this;console.log("updateVertex");var o=this.vertices[t];this.vertices[t]=e;var i={vertex:e,vertexIndex:t,undo:function(){return r._undoVertexUpdate(null,o,t)},redo:function(){return r._redoVertexUpdate(null,e,t)}};this.history.push(i),this._set("redoHistory",[]),this.emit("vertex-update",new v.VertexUpdateEvent(this.view,null,t,this.vertices))},t.prototype.complete=function(){this._completeDrawing()},t.prototype._addViewHandles=function(){var e=this;this._removeViewHandles(),this._viewHandles.add([this.view.on("click",function(e){e.stopPropagation()}),this.view.on("pointer-down",function(t){e._pointerDownEvent=t,e._cursorScreenPoint=new c({x:t.x,y:t.y})}),this.view.on("pointer-move",function(t){e._cursorMoved&&e.vertices.pop(),e._dragEnabled||(e._pointerDownEvent=null),e._cursorScreenPoint=new c({x:t.x,y:t.y}),e._pointerDownEvent?(e._cursorMoved=!1,e._vertexAddHandler(t)):(e._cursorMoved=!0,e._cursorUpdateHandler(t))}),this.view.on("pointer-up",function(t){if(e._pointerDownEvent){if(!e._clickEnabled)return 1===e.vertices.length&&e.vertices.pop(),void e._drawCompleteHandler(t);e._cursorMoved&&(e.vertices.pop(),e._cursorMoved=!1),e._pointerDownEvent=null,e._vertexAddHandler(t)}}),this.view.on("drag",function(t){e._dragEnabled&&e._pointerDownEvent&&t.stopPropagation()}),this.view.on("double-click",function(t){t.stopPropagation(),e._drawCompleteHandler(t)}),this.view.on("double-click",["Control"],function(t){t.stopPropagation(),e._drawCompleteHandler(t)}),this.view.on("key-down",function(t){t.key===u.KEYS.vertexAddKey&&!t.repeat&&e._cursorScreenPoint?(e._cursorMoved&&(e.vertices.pop(),e._cursorMoved=!1),e._vertexAddHandler(t)):t.key===u.KEYS.drawCompleteKey&&!t.repeat&&e._cursorScreenPoint&&e.vertices.length>2?(e._cursorMoved&&(e.vertices.pop(),e._cursorMoved=!1),e._vertexAddHandler(t),e._drawCompleteHandler(t)):t.key!==u.KEYS.undoKey||t.repeat?t.key!==u.KEYS.redoKey||t.repeat||e.redo():e.undo()})])},t.prototype._removeViewHandles=function(){this._viewHandles.removeAll()},t.prototype._addVertex=function(e,t){var r=this;if(!this.isDuplicateVertex(this.vertices,e)){this.vertices.push(e);var o=this.vertices.indexOf(e),i={vertex:e,vertexIndex:o,undo:function(){return r._undoVertexAdd(t,e,o)},redo:function(){return r._redoVertexAdd(t,e,o)}};this.history.push(i),this._set("redoHistory",[]);var n=new v.VertexAddEvent(this.view,t,o,this.vertices);this.emit("vertex-add",n),n.defaultPrevented&&(this._cursorMoved=!0,this.history.pop())}},t.prototype._updateCursor=function(e,t){this.vertices.push(e);var r=this.vertices.indexOf(e),o=new v.CursorUpdateEvent(this.view,t,r,this.vertices);this.emit("cursor-update",o)},t.prototype._completeDrawing=function(e){if(this._cursorMoved=!1,this._pointerDownEvent=null,!(this.vertices.length<3)){var t=new v.DrawCompleteEvent(e,this.vertices);this.emit("draw-complete",t),t.defaultPrevented?this._cursorMoved=!0:this._removeViewHandles()}},t.prototype._undoVertexAdd=function(e,t,r){this.vertices.splice(r,1),this.emit("undo",new v.VertexRemoveEvent(this.view,e,r,this.vertices))},t.prototype._redoVertexAdd=function(e,t,r){this.vertices.splice(r,0,t),this.emit("redo",new v.VertexAddEvent(this.view,e,r,this.vertices))},t.prototype._undoVertexRemove=function(e,t,r){this.vertices.splice(r,0,t),this.emit("undo",new v.VertexAddEvent(this.view,e,r,this.vertices))},t.prototype._redoVertexRemove=function(e,t,r){this.vertices.splice(r,1),this.emit("redo",new v.VertexRemoveEvent(this.view,e,r,this.vertices))},t.prototype._undoVertexUpdate=function(e,t,r){this.vertices[r]=t,this.emit("undo",new v.VertexUpdateEvent(this.view,e,r,this.vertices))},t.prototype._redoVertexUpdate=function(e,t,r){this.vertices[r]=t,this.emit("redo",new v.VertexUpdateEvent(this.view,e,r,this.vertices))},t.prototype._vertexAddHandler=function(e){this._addVertex(this.getCoordsFromScreenPoint(this._cursorScreenPoint),e.native)},t.prototype._cursorUpdateHandler=function(e){this._updateCursor(this.getCoordsFromScreenPoint(this._cursorScreenPoint),e.native)},t.prototype._drawCompleteHandler=function(e){this._completeDrawing(e.native)},o([d.property({dependsOn:["mode"]})],t.prototype,"_clickEnabled",null),o([d.property({dependsOn:["mode"]})],t.prototype,"_dragEnabled",null),o([d.property({cast:function(e){return-1===["hybrid","freehand","click"].indexOf(e)?"hybrid":e}})],t.prototype,"mode",void 0),o([d.property({readOnly:!0})],t.prototype,"vertices",void 0),o([d.property()],t.prototype,"view",void 0),t=o([d.subclass("esri.views.2d.draw.PolygonDrawAction")],t)}(d.declared(p,i,n))});