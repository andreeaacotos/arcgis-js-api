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

define(["require","exports","dojo/promise/all","../../../../core/Handles","../../../../core/watchUtils","../../../../layers/support/LabelClass","../../../../symbols/callouts/calloutUtils","./Graphics3DCalloutSymbolLayerFactory","./Graphics3DWebStyleSymbol","./labelPlacement","../../support/debugFlags","../../webgl-engine/lib/MaterialCollection","../../webgl-engine/lib/TextTextureAtlas"],function(e,t,i,l,a,s,r,n,o,h,c,u,p){function b(e){return e instanceof o?e.graphics3DSymbol:e}return function(){function e(){this.textTextureAtlas=null,this.hudMaterialCollection=null,this.calloutMaterialCollection=null,this.labelVisibilityDirty=!1,this.labelClasses=[],this.eventHandles=new l,this.layerView=null,this.layer=null,this.spatialIndex=null,this.graphicsCore=null}return e.prototype.initialize=function(e,t,i,l,s){var r=this;this.layerView=e,this.layer=t,this.spatialIndex=i,this.graphicsCore=l,this.scaleVisibility=s,this.eventHandles.add(a.whenNot(this.layerView,"suspended",function(){return r.resume()}))},e.prototype.destroy=function(){this.textTextureAtlas&&(this.textTextureAtlas.dispose(),this.textTextureAtlas=null),this.hudMaterialCollection&&(this.hudMaterialCollection.dispose(),this.hudMaterialCollection=null),this.calloutMaterialCollection&&(this.calloutMaterialCollection.dispose(),this.calloutMaterialCollection=null),this.labelClasses=null,this.eventHandles.destroy(),this.eventHandles=null,this.layerView=null,this.layer=null,this.graphicsCore=null},e.prototype.clear=function(){this.layerView.view.deconflictor.setDirty(),this.textTextureAtlas&&(this.textTextureAtlas.dispose(),this.textTextureAtlas=null),this.hudMaterialCollection&&(this.hudMaterialCollection.dispose(),this.hudMaterialCollection=null),this.calloutMaterialCollection&&(this.calloutMaterialCollection.dispose(),this.calloutMaterialCollection=null)},e.prototype.updateLabelingInfo=function(){var e=this;return this.removeLabels(),this.layer.when(function(){e.scaleVisibility&&e.scaleVisibility.updateScaleRangeActive();var t=e.layer.labelingInfo&&e.layer.labelingInfo.filter(function(e){return!!e.symbol});if(t&&t.length>0){var l=new Array(t.length),a=t.map(function(t,i){var a=t.symbol,s=b(e.graphicsCore.getOrCreateGraphics3DSymbol(a)),o=null;return r.isCalloutSupport(a)&&a.hasVisibleCallout()&&(o=n.make(a,e.graphicsCore.symbolCreationContext)),l[i]={labelClass:t,graphics3DSymbol:s,graphics3DCalloutSymbolLayer:o,options:t.getOptions()},s});return i(a).then(function(){return l})}return null}).then(function(t){e.labelClasses=t,e.labelVisibilityChanged()})},e.prototype.createLabelsForGraphic=function(e,t){var i=!1;if(this.labelClasses&&0!==this.labelClasses.length&&t._graphics[0]){for(var l=this.layerLabelsEnabled(),a=0;a<this.labelClasses.length;a++){var r=this.labelClasses[a],n=r.labelClass;if(s.evaluateWhere(n.where,e.attributes)){var o=n.getLabelExpression();if(o.expression){var b=s.buildLabelText(o.expression,e,this.layer.fields,r.options);if(b){var y=null;r.graphics3DSymbol&&r.graphics3DSymbol.symbol&&"label-3d"===r.graphics3DSymbol.symbol.type&&(y=r.graphics3DSymbol.symbol);var f=r.graphics3DSymbol.childGraphics3DSymbols[0],d=h.get({graphic:e,graphics3DGraphic:t,labelSymbol:y,labelClass:r.labelClass});if(f&&d.isValid){null==this.textTextureAtlas&&(this.textTextureAtlas=new p(this.layer.id,this.layerView.view._stage)),null==this.hudMaterialCollection&&(this.hudMaterialCollection=new u(this.layerView.view._stage));var g={text:b,centerOffset:d.centerOffset,translation:d.translation,elevationOffset:d.elevationOffset,screenOffset:d.screenOffset,anchor:d.anchor,needsOffsetAdjustment:d.needsOffsetAdjustment,centerOffsetUnits:d.centerOffsetUnits,verticalOffset:d.verticalOffset,debugDrawBorder:c.LABELS_SHOW_BORDER},C=f.createGraphics3DGraphic(e,g,this.hudMaterialCollection,this.textTextureAtlas);if(C&&(C._labelClass=r.labelClass,t.addLabelGraphic(C,this.graphicsCore.labelStageLayer,this.graphicsCore.stage),this.spatialIndex&&!t.addedToSpatialIndex&&this.spatialIndex.shouldAddToSpatialIndex(e,t,this.scaleVisibility.scaleRangeActive())&&this.spatialIndex.addGraphicToSpatialIndex(e,t),t.setVisibilityFlag(0,l,1),t.setVisibilityFlag(1,void 0,1),this.layerView.view.deconflictor.initializeLabelVisibility(t),i=!0,r.graphics3DCalloutSymbolLayer&&d.hasLabelVerticalOffset)){null==this.calloutMaterialCollection&&(this.calloutMaterialCollection=new u(this.layerView.view._stage));var v=r.graphics3DCalloutSymbolLayer.createGraphics3DGraphic(e,{symbol:y,needsOffsetAdjustment:d.needsOffsetAdjustment,translation:g.translation,elevationOffset:g.elevationOffset,screenOffset:g.screenOffset,centerOffset:g.centerOffset,centerOffsetUnits:g.centerOffsetUnits,materialCollection:this.calloutMaterialCollection});v&&t.addLabelGraphic(v,this.graphicsCore.labelStageLayer,this.graphicsCore.stage)}break}}}}}i&&this.scaleVisibility&&this.scaleVisibility.updateGraphicLabelScaleVisibility(e,t)}},e.prototype.layerLabelsEnabled=function(){return this.layer.labelsVisible},e.prototype.getGraphics3DGraphics=function(){return this.graphicsCore.getGraphics3DGraphics()},e.prototype.getGraphics3DGraphicsKeys=function(){return this.graphicsCore.getGraphics3DGraphicsKeys()},e.prototype.labelVisibilityChanged=function(){var e=this;if(this.layerView.suspended)return void(this.labelVisibilityDirty=!0);if(this.layerView.loadedGraphics){var t=this.layerLabelsEnabled();this.layerView.loadedGraphics.forEach(function(i){var l=e.graphicsCore.getGraphics3DGraphicById(i.uid);l&&(t&&0===l._labelGraphics.length&&e.createLabelsForGraphic(i,l),l.setVisibilityFlag(0,t,1))}),this.layerView.view.deconflictor.setDirty(),this.labelVisibilityDirty=!1}},e.prototype.elevationInfoChange=function(){this.labelClasses&&this.labelClasses.forEach(function(e){e.graphics3DSymbol.layerPropertyChanged("elevationInfo",{})})},e.prototype.resume=function(){this.labelVisibilityDirty&&this.labelVisibilityChanged()},e.prototype.removeLabels=function(){var e=this;this.layerView.loadedGraphics&&(this.layerView.loadedGraphics.forEach(function(t){var i=e.graphicsCore.getGraphics3DGraphicById(t.uid);i&&(i._labelGraphics&&i._labelGraphics.forEach(function(e){return e._labelClass=null}),i.clearLabelGraphics())}),this.labelClasses=null,this.layerView.view.deconflictor.setDirty())},e}()});