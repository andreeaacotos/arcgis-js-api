/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.18/esri/copyright.txt for details.
*/
define(["exports","../../../geometry/support/aaBoundingRect","./OverlayRenderTarget","../webgl-engine/lib/localOrigin"],(function(e,r,t,a){"use strict";let s=function(){function e(e,s){this.extent=r.create(),this.resolution=0,this.renderLocalOrigin=a.fromValues(0,0,0,"O"),this.pixelRatio=1,this.renderTargets={color:{fbo:new t.OverlayRenderTarget(e,"overlay",s,!0),valid:!1,lastUsed:1/0},colorWithoutRasterImage:{fbo:new t.OverlayRenderTarget(e,"overlayWithoutRasterImage",s,!0),valid:!1,lastUsed:1/0},highlight:{fbo:new t.OverlayRenderTarget(e,"overlayHighlight",s,!1),valid:!1,lastUsed:1/0},water:{fbo:new t.OverlayRenderTarget(e,"overlayWaterMask",s,!0),valid:!1,lastUsed:1/0},occluded:{fbo:new t.OverlayRenderTarget(e,"overlayOccluded",s,!0),valid:!1,lastUsed:1/0}}}var s=e.prototype;return s.dispose=function(){this.renderTargets.color.fbo.dispose(),this.renderTargets.colorWithoutRasterImage.fbo.dispose(),this.renderTargets.highlight.fbo.dispose(),this.renderTargets.water.fbo.dispose(),this.renderTargets.occluded.fbo.dispose()},s.drawRenderTargets=function(e,r,t){const a=this.renderTargets;a.color.valid=e.drawPass(0,a.color.fbo,r),a.highlight.valid=e.drawPass(5,a.highlight.fbo,r),a.water.valid=e.drawPass(3,a.water.fbo,r),a.occluded.valid=e.drawPass(0,a.occluded.fbo,r,1),a.colorWithoutRasterImage.valid=t&&e.drawPass(0,a.colorWithoutRasterImage.fbo,r,2)},s.computeRenderTargetValidityBitfield=function(){const e=this.renderTargets;return+e.color.valid|+e.colorWithoutRasterImage.valid<<1|+e.highlight.valid<<2|+e.water.valid<<3|+e.occluded.valid<<4},s.validateUsage=function(e,r){if(e.valid)e.lastUsed=r;else if(r-e.lastUsed>o)e.fbo.disposeRenderTargetMemory(),e.lastUsed=1/0;else if(e.lastUsed<1/0)return!0;return!1},s.collectUnusedMemory=function(e){let r=!1;return r=this.validateUsage(this.renderTargets.color,e)||r,r=this.validateUsage(this.renderTargets.colorWithoutRasterImage,e)||r,r=this.validateUsage(this.renderTargets.highlight,e)||r,r=this.validateUsage(this.renderTargets.occluded,e)||r,r=this.validateUsage(this.renderTargets.water,e)||r,r},s.getGpuMemoryUsage=function(){return this.renderTargets.color.fbo.getGpuMemoryUsage()+this.renderTargets.colorWithoutRasterImage.fbo.getGpuMemoryUsage()+this.renderTargets.highlight.fbo.getGpuMemoryUsage()+this.renderTargets.water.fbo.getGpuMemoryUsage()+this.renderTargets.occluded.fbo.getGpuMemoryUsage()},e}();const o=1e3;e.Overlay=s,Object.defineProperty(e,"__esModule",{value:!0})}));