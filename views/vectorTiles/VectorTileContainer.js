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

define(["require","exports","../../core/tsSupport/extendsHelper","dojo/has","../../core/promiseUtils","../../core/libs/gl-matrix/mat4","../../core/libs/gl-matrix/vec3","../2d/engine/Container","./GeometryUtils","./renderers/Renderer"],function(e,t,i,r,s,a,l,n,o,h){return function(e){function t(){var t=e.call(this)||this;return t.isInitialized=!1,t._displayWidth=0,t._displayHeight=0,t._pointToCallbacks=new Map,t._tileCoordinateScale=l.create(),t._orientationVec=l.create(),t._displayScale=l.create(),t._orientationVec.set([0,0,1]),t._defaultTransform=a.create(),t}return i(t,e),t.prototype.initialize=function(e,t,i,r){this._renderer=new h,this._renderer.initialize(e,t),this._tileInfoView=r,this._tileInfo=i,this.isInitialized=!0},t.prototype.destroy=function(){this._renderer&&(this._renderer.dispose(),this._renderer=null)},t.prototype.hittest=function(e,t){var i=this,r=[e,t];return s.create(function(e,t){i._pointToCallbacks.set(r,{resolve:e,reject:t}),i.requestRender()},function(){i._pointToCallbacks.has(r)&&i._pointToCallbacks.delete(r)})},t.prototype.prepareChildrenRenderParameters=function(e){var t=e.state;if(!t||!this._tileInfo||!this.isInitialized)return e;var i=e;return i.displayLevel=this._tileInfo.scaleToZoom(t.scale),i.requiredLevel=this._tileInfoView.getClosestInfoForScale(t.scale).level,i.renderer=this._renderer,i},t.prototype.renderChildren=function(t){var i=this;if(0!==this.children.length&&this.isInitialized&&t&&t.state){this.sortChildren(function(e,t){return e.key.level-t.key.level});for(var s=this.children.length,a=1;a<=s;a++){var l=this.children[a-1];l.attached&&(l.stencilData.reference=a,l.stencilData.mask=255)}this._updateTilesTransform(t.state,this._tileInfoView.getClosestInfoForScale(t.state.scale).level,this.children);var n=t.context;if(n.setDepthWriteEnabled(!0),this._renderer.setStateParams(t.state,t.pixelRatio,t.displayLevel),this._renderer.drawClippingMasks(n,this.children),n.setStencilWriteMask(0),n.setBlendFunctionSeparate(1,771,1,771),n.setStencilOp(7680,7680,7681),n.setDepthFunction(515),n.setBlendingEnabled(!1),n.setStencilTestEnabled(!0),n.setDepthTestEnabled(!0),n.setDepthWriteEnabled(!0),t.drawphase=0,e.prototype.renderChildren.call(this,t),n.setDepthWriteEnabled(!1),n.setBlendingEnabled(!0),t.drawphase=1,e.prototype.renderChildren.call(this,t),t.drawphase=2,e.prototype.renderChildren.call(this,t),n.setStencilTestEnabled(!1),n.setDepthTestEnabled(!1),r("esri-vector-tiles-debug"))for(var o=0,h=this.children;o<h.length;o++){var d=h[o];d.attached&&d.visible&&this._renderer.renderTileInfo(n,d)}this._pointToCallbacks.size>0&&(this._pointToCallbacks.forEach(function(e,r){e.resolve(i._hitTest(t,r[0],r[1]))}),this._pointToCallbacks.clear()),this._renderer.needsRedraw()&&this.requestRender()}},t.prototype.removeAllChildren=function(){for(var t=0;t<this.children.length;t++){this.children[t].dispose()}e.prototype.removeAllChildren.call(this)},t.prototype._hitTest=function(e,t,i){var r=this._tileInfoView.getClosestInfoForScale(e.state.scale).level,s=[0,0];e.state.toMap(s,[t,i]);var a=e.state.clone(),l=a.viewpoint.clone(),n=l.targetGeometry;n.x=s[0],n.y=s[1],l.targetGeometry=n,a.viewpoint=l,a.size=[3,3],this._renderer.setStateParams(a,e.pixelRatio,e.displayLevel);var o={pixelRatio:e.pixelRatio,stationary:e.stationary,opacity:e.opacity,context:e.context,displayLevel:e.displayLevel,requiredLevel:e.requiredLevel,renderer:e.renderer,layerOpacity:e.layerOpacity,state:a,drawphase:3,painter:null},h=this._renderer.hitTest(o,t,i,this.children,r,3,this._updateTilesTransform.bind(this));return h&&0!==h.length?h[0]:null},t.prototype._updateTilesTransform=function(e,t,i){var r=1/e.width,s=1/e.height,a=[0,0];this._calculateRelativeViewProjMat(this._tileInfo.lodAt(t).resolution,e.resolution,e.rotation,this._tileInfo.size[1],4096,e.width,e.height,this._defaultTransform);for(var l=0,n=i;l<n.length;l++){var o=n[l];e.toScreen(a,o.coords),a[1]=e.height-a[1],o.tileTransform.displayCoord[0]=2*a[0]*r-1,o.tileTransform.displayCoord[1]=2*a[1]*s-1,o.key.level===t&&4096===o.coordRange?o.tileTransform.transform.set(this._defaultTransform):this._calculateRelativeViewProjMat(this._tileInfo.lodAt(o.key.level).resolution,e.resolution,e.rotation,this._tileInfo.size[1],o.coordRange,e.width,e.height,o.tileTransform.transform)}},t.prototype._calculateRelativeViewProjMat=function(e,t,i,r,s,l,n,h){var d=e/t,c=.125;512!==r&&4096!==s&&(c=r/s);var p=c*d;this._tileCoordinateScale.set([p,p,1]),l===this._displayWidth&&n===this._displayHeight||(this._displayScale.set([2/l,-2/n,1]),this._displayWidth=l,this._displayHeight=n),a.identity(h),a.scale(h,h,this._tileCoordinateScale),a.rotate(h,h,-i*o.C_DEG_TO_RAD,this._orientationVec),a.scale(h,h,this._displayScale),a.transpose(h,h)},t}(n)});