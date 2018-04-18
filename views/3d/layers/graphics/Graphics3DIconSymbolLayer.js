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

define(["require","exports","../../../../core/tsSupport/extendsHelper","dojo/when","dojo/_base/lang","dojo/errors/CancelError","../../../../Color","../../../../core/Error","../../../../core/screenUtils","../../../../core/sniff","../../../../core/urlUtils","../../../../geometry/Polygon","../../../../symbols/support/symbolUtils","./ElevationAligners","./Graphics3DDrapedGraphicLayer","./Graphics3DGraphicLayer","./Graphics3DSymbolCommonCode","./Graphics3DSymbolLayer","./graphicUtils","./SignedDistanceFunctions","../support/FastSymbolUpdates","../../lib/glMatrix","../../support/projectionUtils","../../webgl-engine/Stage","../../webgl-engine/lib/Geometry","../../webgl-engine/lib/GeometryUtil","../../webgl-engine/lib/RenderGeometry","../../webgl-engine/lib/Texture","../../webgl-engine/materials/HUDMaterial"],function(e,t,i,r,a,o,n,s,l,u,c,h,p,d,_,f,m,g,v,y,S,b,x,z,R,C,P,M,I){function O(e){return"cross"===e||"x"===e}function A(e){var t,i=j,r=i*q;switch("primitive:"===e.substring(0,10)&&(e=e.substring(10)),e){case W.PRIM_CIRCLE:t=y.computeSignedDistancefieldCicle(i,r);break;case W.PRIM_SQUARE:t=y.computeSignedDistancefieldSquare(i,r,!1);break;case W.PRIM_KITE:t=y.computeSignedDistancefieldSquare(i,r,!0);break;case W.PRIM_CROSS:t=y.computeSignedDistancefieldCrossAndX(i,r,!1);break;case W.PRIM_X:t=y.computeSignedDistancefieldCrossAndX(i,r,!0)}return new M(t,"sdf_"+e,{mipmap:!1,wrapClamp:!0,width:j,height:j,components:4})}var U=b.vec3d,V=b.vec4d,D=b.mat4d,E=D.identity(),T=[0,0,1],G=[0,0,0,0],w=[0,0,0],F=[1,1,1],L=["center","bottom","top","left","right","bottom-left","bottom-right","top-left","top-right"],j=128,q=.5,B=[q/2,q/2,1-q/2,1-q/2],W={PRIM_CIRCLE:"circle",PRIM_SQUARE:"square",PRIM_CROSS:"cross",PRIM_X:"x",PRIM_KITE:"kite"},k=[j*q,j*q],H=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t._elevationOptions={supportsOffsetAdjustment:!0,supportsOnTheGround:!0},t}return i(t,e),t.prototype._prepareResources=function(){var e=this.symbol,t=Math.round(null!=e.size?l.pt2px(e.size):16);this._size=null,this._symbolTextureRatio=1,this._primitive=null;var i=this._getStageIdHint();if(!this._isPropertyDriven("size")){var r=v.validateSymbolLayerSize(t);if(r)return this._logWarning(r),void this.reject()}this._isPropertyDriven("size")&&t<64&&(t=64);var a=e.resource||{primitive:"circle",href:void 0},o={anchorPos:this._getAnchorPos(e)},n=this.symbolContainer;if(this._hasVisibleVerticalOffset(n)){var s=n.verticalOffset,u=s.screenLength,c=s.minWorldLength,h=s.maxWorldLength;o.verticalOffset={screenLength:l.pt2px(u),minWorldLength:c||0,maxWorldLength:null!=h?h:1/0}}if(this._context.screenSizePerspectiveEnabled&&(o.screenSizePerspective=this._context.sharedResources.screenSizePerspectiveSettings),a.href)this._outlineSize=this._getOutlineSize(e,null),o.color=this._getFillColor(e,null),o.outlineColor=this._getOutlineColor(e),o.outlineSize=this._outlineSize,o.textureIsSignedDistanceField=!1,this._prepareImageResources(t,o,i);else{var p=a.primitive||"circle",d="primitive:"+p;if(this._primitive=p,this._outlineSize=this._getOutlineSize(e,p),o.color=this._getFillColor(e,p),o.outlineColor=this._getOutlineColor(e),o.outlineSize=this._outlineSize,O(p)&&0===o.outlineSize)return void this.reject();this.texture=this._context.sharedResources.textures.acquire(d,A),this._textureURI=d,o.textureIsSignedDistanceField=!0,o.distanceFieldBoundingBox=B,o.textureId=this.texture.id,this._size=[t,t],this._symbolTextureRatio=1/q,this._createMaterialsAndAddToStage(o,this._context.stage,i),this.resolve()}},t.prototype._getOutlineSize=function(e,t){var i=0;return i=e.outline&&null!=e.outline.size?l.pt2px(e.outline.size):O(t)?1.5:0,Math.max(i,0)},t.prototype._getOutlineColor=function(e){var t=this._getLayerOpacity();if(e.outline){if(null!=e.outline.color){var i=n.toUnitRGB(e.outline.color),r=e.outline.color.a*t;return[i[0],i[1],i[2],r]}return[0,0,0,t]}return[0,0,0,t]},t.prototype._getFillColor=function(e,t){return O(t)?G:this._getMaterialOpacityAndColor()},t.prototype._getAnchorPos=function(e){return L.indexOf(e.anchor)>-1?e.anchor:"center"},t.prototype._prepareImageResources=function(e,t,i){var a=this,n=function(r){if(!a.isRejected()){var o=r.params,n=o.width/o.height;a._size=e?n>1?[e,Math.round(e/n)]:[Math.round(e*n),e]:[o.width,o.height],t.textureId=r.id,a._createMaterialsAndAddToStage(t,a._context.stage,i),a.resolve()}},l=p.getIconHref(this.symbolContainer,this.symbol);if(!u("esri-canvas-svg-support")&&c.isSVG(l)){var h="IconSymbol3DLayer failed to load (SVG symbols are not supported in IE11)";return this._logWarning(h),void this.reject(new s("SVG Not Supported",h))}r(this._context.sharedResources.textures.acquire(l,null,e),n,function(e){if(e instanceof o)a.reject();else{var t="IconSymbol3DLayer failed to load (Request for icon resource failed: "+l+")";a._logWarning(t),a.reject(new s("Request Failed",t))}}),this._textureURI=l},t.prototype._createMaterialsAndAddToStage=function(e,t,i){this._fastUpdates=S.initFastSymbolUpdatesState(this._context.renderer,this._supportsShaderVisualVariables(),this._fastVisualVariableConvertOptions()),this._fastUpdates.enabled&&a.mixin(e,this._fastUpdates.materialParameters);var r=a.mixin({},e);r.verticalOffset=null,r.screenSizePerspective=null,r.occlusionTest=!1,r.shaderPolygonOffset=0,this._drapedMaterial=new I(r,i+"_iconDraped"),t.add(z.ModelContentType.MATERIAL,this._drapedMaterial),e.occlusionTest=!0,this._material=new I(e,i+"_icon"),t.add(z.ModelContentType.MATERIAL,this._material)},t.prototype.destroy=function(){e.prototype.destroy.call(this),this.isFulfilled()||this.reject(),this._material&&(this._context.stage.remove(z.ModelContentType.MATERIAL,this._material.id),this._material=null),this._drapedMaterial&&(this._context.stage.remove(z.ModelContentType.MATERIAL,this._drapedMaterial.id),this._drapedMaterial=null),this._textureURI&&(this._context.sharedResources.textures.release(this._textureURI),this._textureURI=null)},t.prototype._getGeometry=function(e){var t=this._validateGeometry(e.geometry);return"extent"===t.type?m.placePointOnPolygon(h.fromExtent(t)):"polyline"===t.type?m.placePointOnPolyline(t):"polygon"===t.type?m.placePointOnPolygon(t):"point"===t.type?t:(this._logWarning("unsupported geometry type for icon symbol: "+t.type),null)},t.prototype._getScaleFactor=function(e){if(this._isPropertyDriven("size")&&e.size){for(var t=0;t<3;t++){var i=e.size[t];i&&"symbolValue"!==i&&"proportional"!==i&&(e.size[t]=l.pt2px(i))}var r=this._size[0]>this._size[1]?this._size[0]:this._size[1];if("symbolValue"===e.size[0])return 1;if(isFinite(+e.size[0]))return+e.size[0]/r;if(isFinite(+e.size[2]))return+e.size[2]/r}return 1},t.prototype.createGraphics3DGraphic=function(e,t){var i=this._getGeometry(e);if(null===i)return null;var r="graphic"+e.uid,a=this._getVertexOpacityAndColor(t),o=1;this._fastUpdates.enabled&&this._fastUpdates.visualVariables.size||(o=this._getScaleFactor(t)),o*=this._symbolTextureRatio;var n=[this._size[0]*o,this._size[1]*o],s=this.getGraphicElevationContext(e);return"on-the-ground"===s.mode?this._createAsOverlay(e,i,a,n,s,r,e.uid):this._createAs3DShape(e,i,a,n,s,r,e.uid)},t.prototype.layerPropertyChanged=function(e,t,i){if("opacity"===e){var r=this._getFillColor(this.symbol,this._primitive);this._drapedMaterial.setParameterValues({color:r}),this._material.setParameterValues({color:r});var a=this._getOutlineColor(this.symbol);return this._drapedMaterial.setParameterValues({outlineColor:a}),this._material.setParameterValues({outlineColor:a}),!0}if("elevationInfo"===e){var o=this._elevationContext.mode;this._updateElevationContext();var n=this._elevationContext.mode;if("on-the-ground"===o&&"on-the-ground"===n)return!0;if(o!==n&&("on-the-ground"===o||"on-the-ground"===n))return!1;var s=m.needsElevationUpdates2D(n)||"absolute-height"===n;for(var l in t){var u=t[l],c=i(u);if(c&&!c.isDraped()){var h=u.graphic,p=this.getGraphicElevationContext(h);c.needsElevationUpdates=s,c.elevationContext.set(p)}}return!0}return!1},t.prototype.applyRendererDiff=function(e,t,i,r){for(var a in e.diff)switch(a){case"visualVariables":if(!S.updateFastSymbolUpdatesState(this._fastUpdates,t,this._fastVisualVariableConvertOptions()))return!1;this._material.setParameterValues(this._fastUpdates.materialParameters),this._drapedMaterial.setParameterValues(this._fastUpdates.materialParameters);break;default:return!1}return!0},t.prototype.setDrawOrder=function(e,t,i){this._drapedMaterial&&(this._drapedMaterial.renderPriority=e,i[this._drapedMaterial.id]=!0)},t.prototype._defaultElevationInfoNoZ=function(){return N},t.prototype._createAs3DShape=function(e,t,i,r,a,o,n){var s=this,l=this._getFastUpdateAttrValues(e),u=l?function(e){return S.evaluateModelTransform(s._fastUpdates.materialParameters,l,e)}:null,c=C.createPointGeometry(T,null,i,r,X,null,l),h=new R(c,o),p=[h],_=m.createStageObjectForPoint.call(this,t,p,[[this._material]],null,null,a,o,this._context.layer.uid,n,!0,u);if(null===_)return null;var g=d.perObjectElevationAligner,v=new f(this,_.object,p,null,null,g,a);return v.alignedTerrainElevation=_.terrainElevation,v.needsElevationUpdates=m.needsElevationUpdates2D(a.mode)||"absolute-height"===a.mode,v.getScreenSize=this._createScreenSizeGetter(r,u),v.calculateRelativeScreenBounds=function(e){return s._material.calculateRelativeScreenBounds(v.getScreenSize(),1,e)},m.extendPointGraphicElevationContext(v,t,this._context.elevationProvider),v},t.prototype._createAsOverlay=function(e,t,i,r,a,o,n){var s=this;this._drapedMaterial.renderPriority=this._symbolLayerOrder;var l=U.create();x.pointToVector(t,l,this._context.overlaySR),l[2]=this._getDrapedZ();var u=this._context.clippingExtent;if(u&&!m.pointInBox2D(l,u))return null;var c=this._getFastUpdateAttrValues(e),h=c?function(e){return S.evaluateModelTransform(s._fastUpdates.materialParameters,c,e)}:null,p=C.createPointGeometry(T,l,i,r,null,null,c),d=new P(p);d.material=this._drapedMaterial,d.center=l,d.bsRadius=0,d.transformation=E,d.name=o,d.uniqueName=o+"#"+p.id;var f=new _(this,[d],null,null,null,a);return f.getScreenSize=this._createScreenSizeGetter(r,h),f.calculateRelativeScreenBounds=function(e){return s._drapedMaterial.calculateRelativeScreenBounds(f.getScreenSize(),1,e)},f},t.prototype._createScreenSizeGetter=function(e,t){var i=this._outlineSize+2;if(this._fastUpdates.enabled){var r=e[0]/this._symbolTextureRatio,a=e[1]/this._symbolTextureRatio;return function(e){void 0===e&&(e=new Array(2));var o=t(E);return e[0]=o[0]*r+i,e[1]=o[5]*a+i,e}}var o=e[0]/this._symbolTextureRatio+i,n=e[1]/this._symbolTextureRatio+i;return function(e){return void 0===e&&(e=new Array(2)),e[0]=o,e[1]=n,e}},t.prototype._supportsShaderVisualVariables=function(){return!0},t.prototype._fastVisualVariableConvertOptions=function(){var e=this._size[0]>this._size[1]?this._size[0]:this._size[1],t=[e,e,e],i=l.px2pt(1),r=e*i;return{modelSize:t,symbolSize:[r,r,r],unitInMeters:i,transformation:{anchor:w,scale:F,rotation:w}}},t.prototype._hasVisibleVerticalOffset=function(e){return this.symbolContainer&&"point-3d"===this.symbolContainer.type&&this.symbolContainer.hasVisibleVerticalOffset()},t.PRIMITIVE_SIZE=k,t.VALID_ANCHOR_STRINGS=L,t}(g),N={mode:"relative-to-ground",offset:0},X=V.createFrom(0,0,0,1);return H});