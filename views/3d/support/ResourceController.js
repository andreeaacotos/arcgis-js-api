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

define(["../../../core/declare","../../../core/Handles","../../../core/Logger","../../../core/scheduling","./MemoryController","./StreamDataSupplier","./StreamDataLoader","./PreallocArray","../webgl-engine/lib/Performance","../webgl-engine/lib/Util"],function(e,t,i,r,s,a,n,o,l,h){function d(e){this.begin=0,this.budget=0,this.performance=e,this.enabled=!0}var m=h.assert,c={TERRAIN:"terrain",SCENE:"scene",SYMBOLOGY:"symbols"},u=new o(20),g=i.getLogger("esri.views.support.ResourceController");d.prototype.now=function(){return this.performance.now()},d.prototype.reset=function(e){this.begin=this.now(),this.budget=this.enabled?e:Number.MAX_VALUE},d.prototype.done=function(){return this.enabled&&this.elapsed()>=this.budget},d.prototype.remaining=function(){return Math.max(this.budget-this.elapsed(),0)},d.prototype.elapsed=function(){return this.now()-this.begin};var _=e(null,{constructor:function(e,i,a){a=a||l,this._clients=[],this._frameWorkers=[],this._nextFrameWorker=0,this._budget=new d(a),this._idleFrameWorkers=[],this._idleFrameWorkerRobin=0,this._idleUpdatesStartFired=!1,this._lastTargetChangeTime=a.now(),this._memoryController=new s(e),this.navigationTimeout=300,this.animatingFrameTimeBudget=10,this.idleFrameWorkerBudget=30,this.idleFrameTimeBudget=50;var o={},h={};for(var m in c)o[c[m]]=0,h[c[m]]=0;o[c.TERRAIN]=409600,o[c.SCENE]=409600,o[c.SYMBOLOGY]=30720,h[c.TERRAIN]=15,h[c.SCENE]=20,h[c.SYMBOLOGY]=5,this.streamDataLoader=new n(h),this._cameraListeners=new t,this._cameraListeners.add([e.watch("state.camera",this._cameraChangedHandler.bind(this),!0)]),i||(i=r),this._frameTask=i.addFrameTask({update:this._frameUpdate.bind(this)}),this._view=e,this.stats={frameUpdateTime:new p,idleUpdateTime:new p},this.frameUpdateNavigation=null},destroy:function(){this._frameTask.remove(),this._frameTask=null,this._cameraListeners.remove(),this.streamDataLoader.destroy(),this.streamDataLoader=null},setEnableBudget:function(e){this._budget.enabled=!!e},isUpdating:function(){return this._memoryController.updating},registerClient:function(e,t,i){return this._clients.push({client:e,type:t}),this._memoryController.setDirty(),new a(t,this.streamDataLoader,i)},deregisterClient:function(e){for(var t=0;t<this._clients.length;t++)if(this._clients[t].client===e)return this._clients[t]=this._clients[this._clients.length-1],this._clients.pop(),void this._memoryController.setDirty();console.warn("deregistering an unregistered client.")},setMaxGpuMemory:function(e){this._memoryController.setMaxGpuMemory(e)},setMemoryDirty:function(){this._memoryController.setDirty()},getMemoryFactor:function(){return this._memoryController.getMemoryFactor()},getUsedMemory:function(){return this._memoryController.getUsedMemory()},getMemoryEvents:function(){return this._memoryController.events},registerIdleFrameWorker:function(e,t){var i=this._idleFrameWorkers.some(function(t){return t.client===e});m(!i,"Can only register idle frame workers once per client/layer"),m(!t.idleFrame||t.needsUpdate,"needsUpdate has to be specified if idleFrame is specified"),this._idleFrameWorkers.push({client:e,callbacks:t}),this._isIdle()&&this._idleUpdatesStartFired&&t.idleBegin&&t.idleBegin.call(e)},deregisterIdleFrameWorker:function(e){for(var t=this._idleFrameWorkers,i=0;i<t.length;i++){var r=t[i];if(r.client===e)return this._idleUpdatesStartFired&&r.callbacks.idleEnd&&r.callbacks.idleEnd.call(e),t[i]=t[t.length-1],void t.pop()}},registerFrameWorker:function(e){-1===this._frameWorkers.indexOf(e)&&this._frameWorkers.push(e)},deregisterFrameWorker:function(e){-1===this._frameWorkers.indexOf(e)?g.warn("Can't deregister unknown frame handler"):(this._frameWorkers.splice(this._frameWorkers.indexOf(e),1),this._nextFrameWorker=0)},_cameraChangedHandler:function(){this._lastTargetChangeTime=this._budget.now(),this._memoryController.setDirty(),this._idleUpdatesStartFired&&(this._idleUpdatesStartFired=!1,this._callWorkersNoScheduling("idleEnd"))},_frameUpdate:function(e){var t=this._isIdle()?this.idleFrameWorkerBudget:this.animatingFrameTimeBudget;this._budget.reset(t-e.elapsedFrameTime),this._view.stateManager&&this._view.stateManager.step(e.deltaTime/1e3),this._view.inputManager&&this._view.inputManager._pinchNavigation&&this._view.inputManager._pinchNavigation.momentum.doFrameUpdate(e.deltaTime),this._memoryController.update();for(var i=0;i<this._frameWorkers.length;++i){var r=(this._nextFrameWorker+i)%this._frameWorkers.length;if(this._frameWorkers[r](this._budget),this._budget.remaining()<3){this._nextFrameWorker=(r+1)%this._frameWorkers.length;break}}this.stats.frameUpdateTime.addSample(this._budget.elapsed()),this._isIdle()&&(this._idleUpdatesStartFired||(this._callWorkersNoScheduling("idleBegin"),this._idleUpdatesStartFired=!0),this._budget.reset(this.idleFrameTimeBudget-this._budget.elapsed()),this._budget.remaining()>3&&(this._callWorkersStrictScheduling("idleFrame",this._budget),this.stats.idleUpdateTime.addSample(this._budget.elapsed())))},_isIdle:function(){return this._budget.now()-this._lastTargetChangeTime>this.navigationTimeout},_callWorkersNoScheduling:function(e){for(var t=this._idleFrameWorkers,i=0;i<t.length;i++){var r=t[i];r.callbacks[e]&&r.callbacks[e].call(r.client)}},_callWorkersStrictScheduling:function(e,t){var i,r,s,a=this._idleFrameWorkers,n=a.length;for(u.clear(),r=0,s=this._idleFrameWorkerRobin;r<n;r++)i=a[s++%n],i.callbacks.needsUpdate&&i.callbacks.needsUpdate.call(i.client)&&(0===u.length&&(this._idleFrameWorkerRobin=s),u.push(i));for(var o=t.now(),l=o+t.remaining();u.length>0&&o<l;)t.reset((l-o)/u.length),i=u.pop(),i.callbacks[e].call(i.client,t),o=t.now()}});_.ClientType=c;var p=function(){this.addSample=function(e){this.min=Math.min(this.min,e),this.max=Math.max(this.max,e),this.total+=e,this.numSamples++},this.getAverage=function(){return this.total/this.numSamples},this.reset=function(){this.total=0,this.numSamples=0,this.min=Number.MAX_VALUE,this.max=-Number.MAX_VALUE},this.reset()};return _});