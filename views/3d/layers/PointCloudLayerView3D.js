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

define(["require","exports","../../../core/tsSupport/extendsHelper","../../../core/tsSupport/decorateHelper","dojo/errors/CancelError","dojo/promise/all","../../../request","../../../core/arrayUtils","../../../core/Handles","../../../core/Logger","../../../core/promiseUtils","../../../core/requireUtils","../../../core/screenUtils","../../../core/watchUtils","../../../core/workers","../../../core/accessorSupport/decorators","../../../geometry/support/scaleUtils","../../../symbols/support/unitConversionUtils","./LayerView3D","./PointCloudWorker","./i3s/I3SUtil","./i3s/IdleQueue","./i3s/LoDUtil","./i3s/PagedNodeIndex","./i3s/PointCloudRendererUtil","./i3s/PointRenderer","./support/LayerViewUpdatingPercentage","../lib/glMatrix","../support/orientedBoundingBox","../support/projectionUtils","../webgl-engine/lib/RenderSlot","module"],function(e,t,r,i,n,o,d,s,a,u,l,h,p,c,_,f,g,y,v,m,b,w,x,N,k,P,S,C,Q,W,L,O){var R=u.getLogger("esri.views.3d.layers.PointCloudLayerView3D"),I=C.vec4d.create();return function(t){function u(){var e=null!==t&&t.apply(this,arguments)||this;return e.maximumPointCount=4e6,e._renderer=null,e._rendererAdded=!1,e._renderedNodes=new Set,e._updateViewNeeded=!0,e._idleUpdatesEnabled=!0,e._lodFactor=1,e._worker=new m,e._workerThread=null,e._processLambda=null,e._maxLoggedBoxWarnings=5,e._pageMultiplier=1,e._handles=new a,e._indexQueue=[],e._workQueue=[],e._idleQueue=new w.IdleQueue,e._indexPagesLoading=new Map,e._loadingNodes=new Map,e._layerIsVisible=!1,e._totalWork=0,e._index=null,e._loadingInitNodePage=!1,e._nodeIdArray=[],e}return r(u,t),Object.defineProperty(u.prototype,"pointScale",{get:function(){var e=k.getSplatSizeAlgorithm(this.layer.renderer);return e&&null!=e.scaleFactor?e.scaleFactor:1},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"pointMinSize",{get:function(){return k.getMinSize(this.layer.renderer)},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"useRealWorldSymbolSizes",{get:function(){var e=k.getFixedSizeAlgorithm(this.layer.renderer);return!(!e||null==e.useRealWorldSymbolSizes)&&e.useRealWorldSymbolSizes},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"pointSize",{get:function(){var e=k.getFixedSizeAlgorithm(this.layer.renderer);return e&&null!=e.size?e.size:0},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"inverseDensity",{get:function(){return this.layer.renderer?96/this.layer.renderer.pointsPerInch:5},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"_clippingBox",{get:function(){var e=[],t=this.view.renderSpatialReference;return W.extentToBoundingBox(this.view.clippingArea,e,t)?e:null},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"_elevationOffset",{get:function(){var e=this.layer.elevationInfo;if(e&&"absolute-height"===e.mode){var t=g.getMetersPerVerticalUnitForSR(this.layer.spatialReference),r=y.getMetersPerUnit(e.unit);return(e.offset||0)*r/t}return 0},enumerable:!0,configurable:!0}),u.prototype.initialize=function(){var t=this;b.checkPointCloudLayerValid(this.layer),b.checkPointCloudLayerCompatibleWithView(this.layer,this.view),this._initRenderer();var r=this._initNodePages(),i={idleBegin:function(){return t._idleBegin()},idleEnd:function(){return t._idleEnd()},needsUpdate:function(){return!0},idleFrame:function(e){return t._process(e)}},n={idleBegin:function(){return t._idleBegin()},idleEnd:function(){return t._idleEnd()},needsUpdate:function(){return t._updateViewNeeded||t._workQueue.length>0},idleFrame:function(e){return t._processWhileSuspended(e)}};_.open(h.getAbsMid("./PointCloudWorker",e,O),{client:this}).then(function(e){t.destroyed?e.close():t._workerThread=e}),this._handles.add(c.init(this,"_clippingBox",function(){return t._updateViewNeeded=!0})),this._handles.add(c.init(this.layer,"elevationInfo",function(){return t._elevationInfoChanged()})),this._handles.add(c.init(this,"_elevationOffset",function(){return t._elevationOffsetChanged()})),this._handles.add(c.init(this.layer,"renderer",function(){return t._rendererChanged()})),this._handles.add(c.init(this,"clippingArea",function(){t._updateViewNeeded=!0})),this._handles.add(this.view.state.watch("camera",function(){t._updateViewNeeded=!0})),this.view.resourceController.getMemoryEvents().on("quality-changed",function(){return t._updateViewNeeded=!0}),this.addResolvingPromise(r),this.when(function(){t._processLambda=t._frame.bind(t),t.view.resourceController.registerFrameWorker(t._processLambda),t._handles.add(c.init(t,"suspended",function(e){e?(t.view.resourceController.deregisterIdleFrameWorker(t),t.view.resourceController.registerIdleFrameWorker(t,n)):(t.view.resourceController.deregisterIdleFrameWorker(t),t.view.resourceController.registerIdleFrameWorker(t,i))}))})},u.prototype.destroy=function(){this._cancelNodeLoading(),this._workerThread&&(this._workerThread.close(),this._workerThread=null),this.view.resourceController.deregisterIdleFrameWorker(this),this.view.resourceController.deregisterFrameWorker(this._processLambda),this._handles.destroy(),this._destroyRenderer()},u.prototype._initRenderer=function(){var e=this;this._renderer=new P,this._renderer.layerUid=this.layer.uid,this._handles.add(c.init(this,"_clippingBox",function(t){e._renderer.clippingBox=t})),this._handles.add(c.init(this,"_clippingBox",function(t){e._renderer.clippingBox=t})),this._handles.add(c.init(this,"suspended",function(t){e._setPointsVisible(!t)})),this._handles.add(c.init(this,"pointScale",function(t){e._renderer.scaleFactor=t})),this._handles.add(c.init(this,"pointMinSize",function(t){var r=p.pt2px(t);e._renderer.minSizePx=r})),this._handles.add(c.init(this,"useRealWorldSymbolSizes",function(t){e._renderer.useRealWorldSymbolSizes=t})),this._handles.add(c.init(this,"pointSize",function(t){var r=p.pt2px(t);e._renderer.size=t,e._renderer.sizePx=r})),this._handles.add(c.init(this,["inverseDensity","maximumPointCount"],function(){e._updateViewNeeded=!0})),this._handles.add(c.init(this.view,"qualitySettings.sceneService.pointCloud.lodFactor",function(t){e._lodFactor=t,e._updateViewNeeded=!0}))},u.prototype._destroyRenderer=function(){this._setPointsVisible(!1)},u.prototype._setPointsVisible=function(e){e&&!this._rendererAdded?(this.view._stage.addExternalRenderer([L.OPAQUE_EXTERNAL],this._renderer),this._rendererAdded=!0):!e&&this._rendererAdded&&(this.view._stage.removeExternalRenderer(this._renderer),this._rendererAdded=!1)},u.prototype._rendererChanged=function(){this._clearNodeState(),this._renderer.useFixedSizes=k.rendererUsesFixedSizes(this.layer.renderer),this._updateViewNeeded=!0},u.prototype._elevationInfoChanged=function(){var e=this.layer.elevationInfo&&this.layer.elevationInfo.unit;e&&!y.supportsUnit(e)&&R.warn("elevationInfo.unit","'"+e+"' is not a valid unit")},u.prototype._elevationOffsetChanged=function(){var e=this;this._clearNodeState(),this._initNodePages().then(function(){e._updateViewNeeded=!0})},u.prototype.displayNodes=function(e){this._workQueue=x.nodeDiff(b.setToKeys(this._renderedNodes),e,this._index),x.sortFrontToBack(this._workQueue,this.view.state.camera.viewForward,this._index),x.splitWorkEntries(this._workQueue,8,this._index),this._updateQueues(),this._totalWork=this._computeWork(),this._updateLoading(),this._layerIsVisible=e.length>0,this.notifyChange("suspended")},u.prototype.cancelLoading=function(){this._cancelNodeLoading(),this._cancelIndexLoading()},u.prototype._cancelNodeLoading=function(){var e=[];this._loadingNodes.forEach(function(t){return e.push(t)}),this._loadingNodes.clear();for(var t=0,r=e;t<r.length;t++){r[t].cancel()}this._workQueue=[],this._idleQueue.cancelAll(),this._totalWork=this._computeWork(),this._updateLoading()},u.prototype._updateQueues=function(){var e=this,t=new Set;this._workQueue.forEach(function(e){e.load.forEach(function(e){t.add(e)})});var r=[],i=new Map;this._loadingNodes.forEach(function(e,n){t.has(n)?i.set(n,e):r.push(e)}),this._loadingNodes=i;for(var n=0,o=r;n<o.length;n++){o[n].cancel()}this._workQueue=this._workQueue.filter(function(t){for(var r=0,i=t.load;r<i.length;r++){var n=i[r];if(e._loadingNodes.has(n))return!1}return!0}),this._totalWork=this._computeWork(),this._updateLoading()},u.prototype._cancelIndexLoading=function(){this._indexQueue=[],this._indexPagesLoading.forEach(function(e){return e.cancel()}),this._indexPagesLoading.clear(),this._totalWork=this._computeWork(),this._updateLoading()},u.prototype._clearNodeState=function(){var e=this;this._renderedNodes.forEach(function(t){return e._removeFromRenderer(t)}),this._cancelNodeLoading()},u.prototype._idleBegin=function(){this._updateViewNeeded=!0},u.prototype._idleEnd=function(){this._updateViewNeeded=!0},u.prototype._frame=function(e){this.suspended?this._processWhileSuspended(e):this._process(e)},u.prototype._process=function(e){if(this._idleUpdatesEnabled){for(this._updateViewNeeded&&!e.done()&&this._updateWorkQueues();this._indexQueue.length>0&&!e.done();)this._processIndexQueue();for(this._processWorkQueue(e);this._idleQueue.length()>0&&!e.done();)this._idleQueue.process()}},u.prototype._processWhileSuspended=function(e){if(this._idleUpdatesEnabled)for(this._cancelNodeLoading(),this._updateViewNeeded&&!e.done()&&this._updateWorkQueues();this._workQueue.length>0&&!e.done();)this._processWorkQueueRemoveOnly()},u.prototype._processIndexQueue=function(){var e=this,t=this._indexQueue.shift();this._indexPagesLoading.set(t,this._loadNodePage(t)),this._indexPagesLoading.get(t).then(function(r){e._index.addPage(t,r,e._elevationOffset),e._updateViewNeeded=!0}).always(function(){e._indexPagesLoading.delete(t)})},u.prototype._processWorkQueue=function(e){for(;!e.done();){var t=this._scheduleWorkEntry();if(!t)return;this._processWorkEntry(t)}},u.prototype._scheduleWorkEntry=function(){var e=this;if(this._loadingNodes.size>=8)return null;for(var t=0;t<this._workQueue.length;++t){var r=this._workQueue[t];if(!s.find(r.remove,function(t){return!e._renderedNodes.has(t)})){for(var i=t;i>0;--i)this._workQueue[i]=this._workQueue[i-1];return this._workQueue.shift(),r}}return null},u.prototype._processWorkEntry=function(e){var t=this;if(0!==e.load.length)o(e.load.map(function(e){return t._loadingNodes.has(e)||t._loadingNodes.set(e,t.loadNode(e)),t._loadingNodes.get(e)})).then(function(r){for(var i=0;i<e.load.length;i++)t._addToRenderer(e.load[i],r[i]);for(var i=0;i<e.remove.length;i++)t._removeFromRenderer(e.remove[i])}).always(function(){for(var r=0;r<e.load.length;r++)t._loadingNodes.delete(e.load[r]);t._updateLoading()}),this._updateLoading();else for(var r=0;r<e.remove.length;r++)this._removeFromRenderer(e.remove[r])},u.prototype._processWorkQueueRemoveOnly=function(){for(var e=this._workQueue.shift(),t=0;t<e.remove.length;t++)this._removeFromRenderer(e.remove[t]);this._updateLoading()},u.prototype._computeWork=function(){var e=0;if(!this.suspended){for(var t=0;t<this._workQueue.length;t++)e+=this._workQueue[t].load.length;e+=this._loadingNodes.size,e+=(this._indexQueue.length+this._indexPagesLoading.size)*this._index.pageSize,e+=this._loadingInitNodePage?100:0}return e+=this._updateViewNeeded?100:0},Object.defineProperty(u.prototype,"updating",{get:function(){return this._computeWork()>0},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"updatingPercentageValue",{get:function(){var e=this._computeWork();return 100*Math.min(this._totalWork,e)/this._totalWork},enumerable:!0,configurable:!0}),u.prototype._updateLoading=function(){this.notifyChange("updating"),this.notifyChange("updatingPercentageValue")},u.prototype.canResume=function(){return this.inherited(arguments)&&this._layerIsVisible},u.prototype._initNodePages=function(){var e=this,t=this.layer.store.index,r=t.nodesPerPage||t.nodePerIndexBlock;return this._index=new N(this.layer.spatialReference,this.view.renderCoordsHelper.spatialReference,r),this._cancelIndexLoading(),this._traverseVisible=this._index.createVisibilityTraverse(),this._loadingInitNodePage=!0,this._updateLoading(),this._pageMultiplier=null!=t.nodesPerPage?1:t.nodePerIndexBlock,this._loadNodePage(0).then(function(t){e._index.addPage(0,t,e._elevationOffset),e._loadingInitNodePage=!1,e._updateLoading()})},u.prototype._loadNodePage=function(e){var t=this,r=this.baseUrl+"/nodepages/"+e*this._pageMultiplier;return this._requestJSON(r).then(function(r){return r.data.nodes.map(function(r,i){return{resourceId:null!=r.resourceId?r.resourceId:e*t._index.pageSize+i,obb:r.obb,firstChild:r.firstChild,childCount:r.childCount,vertexCount:null!=r.vertexCount?r.vertexCount:r.pointCount,lodThreshold:null!=r.lodThreshold?r.lodThreshold:r.effectiveArea}})})},u.prototype._updateWorkQueues=function(){for(var e=this.inverseDensity/this._lodFactor*this._getLodMemoryFactor(),t=this.maximumPointCount*this._lodFactor*this._getLodMemoryFactor(),r=this._computeNodesForMinimumDensity(e),i=this._computePointCount(r),n=Math.sqrt(i/(.75*t));i>t;)e*=n,r=this._computeNodesForMinimumDensity(e),i=this._computePointCount(r),n=Math.sqrt(2);this.displayNodes(r),this._updateViewNeeded=!1},u.prototype._computePointCount=function(e){for(var t=0,r=0;r<e.length;r++){var i=this._index.getNode(e[r]);i&&(t+=i.vertexCount)}return t},u.prototype._getLodMemoryFactor=function(){return this.view.resourceController.getMemoryFactor()},u.prototype._computeNodesForMinimumDensity=function(e){var t=this,r=this.view.state.camera,i=r.frustumPlanes,n=this._clippingBox,o=r.viewForward,d=C.vec3d.dot(o,r.eye),s=C.vec4d.set4(o[0],o[1],o[2],-d,I),a=r.perPixelRatio,u=e*e,l=this._nodeIdArray;return l.length=0,this._traverseVisible({frustumPlanes:i,clippingBox:n},{predicate:function(e,r,i){if(!i)return!1;if(0===r.childCount)return l.push(e),!1;var n=t._index.getRenderObb(e);return!(t._computeAveragePixelArea(n,r.lodThreshold,r.vertexCount,s,a)<=u&&(l.push(e),1))},pageMiss:function(e,r){l.push(e),t._indexQueue.indexOf(r)<0&&t._indexQueue.push(r)}}),l},u.prototype._computeAveragePixelArea=function(e,t,r,i,n){var o=Math.max(1e-7,Q.minimumDistancePlane(e,i));return t/(o*o)/(4*n*n)/r},u.prototype.loadNode=function(e){var t=this,r=this._index.getNode(e),i=k.getRendererInfo(this.layer),d=[];return this._idleQueue.push().then(function(){var e=r.resourceId,n=t.loadGeometry(e),s=t.loadAttribute(e,i.primaryAttribute),a=t.loadAttribute(e,i.modulationAttribute);return d=[n,s,a],o(d)}).then(function(r){var n=r[0],o=r[1],d=r[2],s=[n];o&&s.push(o),d&&s.push(d);var a={geometryBuffer:n,primaryAttribute:o,modulationAttribute:d,schema:t.layer.store.defaultGeometrySchema,rendererInfo:i,obb:t._index.getRenderObb(e),elevationOffset:t._elevationOffset,inSR:t.layer.spatialReference.toJSON(),outSR:t.view.renderCoordsHelper.spatialReference.toJSON()};return t._workerThread?t._workerThread.invoke("process",a,s):l.resolve(t._worker.transform(a))}).catch(function(e){if(e instanceof n)for(var t=0,r=d;t<r.length;t++){var i=r[t];i.cancel()}else console.error(e);return l.reject(e)})},u.prototype.loadGeometry=function(e){var t=this.baseUrl+"/nodes/"+e+"/geometries/0";return this._requestBinary(t).then(function(e){return e.data})},u.prototype.loadAttribute=function(e,t){if(!t||!t.storageInfo)return l.resolve(null);var r=t.storageInfo.key,i=this.baseUrl+"/nodes/"+e+"/attributes/"+r;return this._requestBinary(i).then(function(e){return e.data})},u.prototype._requestJSON=function(e){return d(e,{query:{f:"json"},responseType:"json"})},u.prototype._requestBinary=function(e){return d(e,{responseType:"array-buffer"})},u.prototype._removeFromRenderer=function(e){this._renderedNodes.has(e)&&(this._renderer.removeNode(""+e),this._renderedNodes.delete(e))},u.prototype._addToRenderer=function(e,t){if(!this._renderedNodes.has(e)){this._renderedNodes.add(e);var r=this._index.getNode(e),i=this._index.getRenderObb(e);(t.obb.halfSize[0]>i.halfSize[0]||t.obb.halfSize[1]>i.halfSize[1]||t.obb.halfSize[2]>i.halfSize[2])&&(this._maxLoggedBoxWarnings>0&&(R.warn("Node",e,"reported bounding box too small, got",i,"but points cover",t.obb),0==--this._maxLoggedBoxWarnings&&R.warn("  Too many bounding box errors, stopping reporting for this layer.")),this._index.setRenderObb(e,t.obb));var n=Math.sqrt(r.lodThreshold/r.vertexCount);this._renderer.addNode({id:""+e,coordinates:t.points,origin:i.center,rgb:t.rgb,splatSize:n,obb:i,isLeaf:0===r.childCount})}},u.prototype.removeCachedData=function(){var e=this;this._renderedNodes.forEach(function(t){return e._removeFromRenderer(t)})},u.prototype.getUsedMemory=function(){var e=this;return b.setToKeys(this._renderedNodes).reduce(function(t,r){return t+15*e._index.getNode(r).vertexCount+128},0)/1024/1024},u.prototype.getUnloadedMemory=function(){var e=this,t=this._renderedNodes.size;if(t<4)return 0;for(var r=b.setToKeys(this._renderedNodes).reduce(function(t,r){return t+e._index.getNode(r).vertexCount}),i=this._loadingNodes.size,n=0;n<this._workQueue.length;n++)i+=this._workQueue[n].load.length,i-=this._workQueue[n].remove.length;return i<0?0:(i*r/t*15+128*i)/1024/1024},u.prototype.getStats=function(){var e=this;return{"Rendered Nodes":this._renderedNodes.size,"Rendered Points":b.setToKeys(this._renderedNodes).reduce(function(t,r){return t+e._index.getNode(r).vertexCount},0),"Loading Nodes":this._loadingNodes.size,"Index Queue":this._indexQueue.length,"Work Queue":this._workQueue.length,"Idle Queue":this._idleQueue.length()}},i([f.property()],u.prototype,"layer",void 0),i([f.property({readOnly:!0,aliasOf:"layer.parsedUrl.path"})],u.prototype,"baseUrl",void 0),i([f.property({readOnly:!0,dependsOn:["layer.renderer"]})],u.prototype,"pointScale",null),i([f.property({readOnly:!0,dependsOn:["layer.renderer"]})],u.prototype,"pointMinSize",null),i([f.property({readOnly:!0,dependsOn:["layer.renderer"]})],u.prototype,"useRealWorldSymbolSizes",null),i([f.property({readOnly:!0,dependsOn:["layer.renderer"]})],u.prototype,"pointSize",null),i([f.property({readOnly:!0,dependsOn:["layer.renderer"]})],u.prototype,"inverseDensity",null),i([f.property()],u.prototype,"maximumPointCount",void 0),i([f.property({readOnly:!0,dependsOn:["view.clippingArea"]})],u.prototype,"_clippingBox",null),i([f.property({readOnly:!0,dependsOn:["layer.elevationInfo"]})],u.prototype,"_elevationOffset",null),i([f.property()],u.prototype,"updating",null),i([f.property()],u.prototype,"updatingPercentageValue",null),u=i([f.subclass("esri.views.3d.layers.PointCloudLayerView3D")],u)}(f.declared(v,S))});