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

define(["require","exports","../../../../../core/tsSupport/extendsHelper","../../../camera/constraintUtils","../../../input/util","../../../lib/glMatrix","../InteractiveController","../momentum/PanPlanarMomentumController","../momentum/PanSphericalMomentumController","../momentum/RotationMomentumController","../momentum/ZoomPlanarMomentumController","../momentum/ZoomSphericalMomentumController","../../utils/navigationUtils","../../utils/navigationUtils","../../../webgl-engine/lib/Camera","../../../../navigation/PanPlanarMomentumEstimator","../../../../navigation/PanSphericalMomentumEstimator","../../../../navigation/RotationMomentumEstimator","../../../../navigation/ZoomMomentumEstimator"],function(t,i,n,e,a,o,r,s,h,c,m,p,l,u,P,d,v,g,S){Object.defineProperty(i,"__esModule",{value:!0});var M=function(t){function i(i,n){var e=t.call(this)||this;return e.view=i,e.pickingHelper=n,e.smoothRotation=new a.ExponentialFalloff(.05),e.rotationAxis=o.vec3d.create(),e.panningPlane={normal:o.vec3d.create(),d:0},e.smoothScaling=new a.ExponentialFalloff(.05),e.zoomCenterScreen=o.vec2d.create(),e.zoomMomentumEstimator=new S.ZoomMomentumEstimator,e.rotationMomentumEstimator=new g.RotationMomentumEstimator,e.panSphericalMomentumEstimator=new v.PanSphericalMomentumEstimator,e.panPlanarMomentumEstimator=new d.PanPlanarMomentumEstimator,e.adjustedSphere={center:o.vec3d.create(),radius:0},e.tmp2d=o.vec2d.create(),e.tmp3d=o.vec3d.create(),e.beginScreenPoint=o.vec2d.create(),e.beginScenePoint=o.vec3d.create(),e.screenPickPoint=o.vec2d.create(),e.panMode=u.PanMode.Horizontal,e.tmpInteractionDirection=o.vec3d.create(),e.constraintOptions={selection:15,interactionType:0,interactionFactor:0,interactionStartCamera:new P,interactionDirection:null},e}return n(i,t),i.prototype.begin=function(t){if(this.active){this.beginRadius=t.radius,this.pointerCount=t.pointers.size,this.beginAngle=t.angle,this.smoothRotation.reset(),l.navPointToScreenPoint(this.currentCamera,t.center,this.screenPickPoint),o.vec2d.set(this.screenPickPoint,this.beginScreenPoint);var i=l.pickPointAndInitSphere(this.pickingHelper,this.beginCamera,this.screenPickPoint,!0);if(this.scenePickPoint=i.scenePickPoint,this.sphere=i.sphere,o.vec3d.set(this.scenePickPoint,this.beginScenePoint),this.panMode=l.decidePanMode(this.beginCamera,this.sphere,this.scenePickPoint),this.panMode===u.PanMode.Vertical){o.vec3d.set(this.beginCamera.viewForward,this.panningPlane.normal),o.vec3d.normalize(this.panningPlane.normal),o.vec3d.negate(this.panningPlane.normal),l.setPlane(this.scenePickPoint,this.panningPlane.normal,this.panningPlane);var n=o.vec3d.create();o.vec3d.set3(this.screenPickPoint[0],this.currentCamera.fullHeight,0,n);var e=o.vec3d.create(),a=o.vec3d.length(this.beginCamera.eye);this.adjustedSphere.radius=a<this.sphere.radius?a-100:this.sphere.radius,l.sphereOrSilhouettePointFromScreenPoint(this.adjustedSphere,this.beginCamera,n,e),this.beginCamera.projectPoint(e,n);var r=.9*n[1];this.screenPickPoint[1]=Math.min(this.screenPickPoint[1],r),this.pickingHelper.pickPointInScreen(this.screenPickPoint,this.scenePickPoint)&&l.setPlane(this.scenePickPoint,this.panningPlane.normal,this.panningPlane),l.navPointToScreenPoint(this.currentCamera,t.center,this.tmp2d),l.intersectPlaneFromScreenPoint(this.panningPlane,this.beginCamera,this.tmp2d,this.beginScenePoint)}this.constraintOptions.interactionStartCamera.copyFrom(this.beginCamera)}},i.prototype.update=function(t){if(this.active){this.currentCamera.copyFrom(this.beginCamera);var i=t.pointers.size,n=i>1;this.panMode===u.PanMode.Horizontal?(n&&this.zoomSpherical(t),this.panningSpherical(t),n&&this.rotateSpherical(t)):(n&&this.zoomPlanar(t),this.panningPlanar(t),n&&this.rotatePlanar(t)),this.currentCamera.markViewDirty()}},i.prototype.end=function(t){t.pointers.size===this.pointerCount&&this.update(t),this.finishController();var i=this.zoomMomentumEstimator.evaluateMomentum();if(i)return this.panMode===u.PanMode.Horizontal?new p.ZoomSphericalMomentumController(this.view,i,this.zoomCenterScreen,this.beginScenePoint,this.sphere.radius):new m.ZoomPlanarMomentumController(this.view,i,this.beginScenePoint);var n=this.rotationMomentumEstimator.evaluateMomentum();if(n)return new c.RotationMomentumController(this.view,n,this.sphere.center,this.rotationAxis);if(this.panMode===u.PanMode.Horizontal){var e=this.panSphericalMomentumEstimator.evaluateMomentum();if(e)return new h.PanSphericalMomentumController(this.view,e)}else{var e=this.panPlanarMomentumEstimator.evaluateMomentum();if(e)return new s.PanPlanarMomentumController(this.view,e)}return null},i.prototype.zoomSpherical=function(t){var i=this.beginRadius/t.radius,n=.001875*Math.min(Math.max(t.radius,40),120);this.smoothScaling.gain=n,this.smoothScaling.update(i),l.applyZoomOnSphere(this.sphere,this.currentCamera,this.smoothScaling.value),l.navPointToScreenPoint(this.currentCamera,t.center,this.zoomCenterScreen),this.zoomMomentumEstimator.add(this.smoothScaling.value,.001*t.timestamp),this.constraintOptions.interactionType=1,this.constraintOptions.interactionFactor=e.pixelDistanceToInteractionFactor(t.radius-this.beginRadius),e.applyAll(this.view,this.currentCamera,this.constraintOptions)},i.prototype.panningSpherical=function(t){l.navPointToScreenPoint(this.currentCamera,t.center,this.tmp2d),l.sphereOrSilhouettePointFromScreenPoint(this.sphere,this.currentCamera,this.tmp2d,this.tmp3d),l.applyPanSpherical(this.sphere,this.currentCamera,this.beginScenePoint,this.tmp3d),this.panSphericalMomentumEstimator.add(this.tmp2d,this.tmp3d,.001*t.timestamp),this.constraintOptions.interactionType=4,this.constraintOptions.interactionFactor=e.pixelDistanceToInteractionFactor(this.screenPickPoint,this.tmp2d),e.applyAll(this.view,this.currentCamera,this.constraintOptions)},i.prototype.rotateSpherical=function(t){o.vec3d.normalize(this.scenePickPoint,this.rotationAxis);var i=this.smoothRotation.value,n=l.normalizeRotationDelta(t.angle-i),a=i+n,r=.00125*Math.min(Math.max(t.radius,40),120);this.smoothRotation.gain=r,this.smoothRotation.update(a);var s=this.smoothRotation.value-this.beginAngle;this.rotationMomentumEstimator.add(s,.001*t.timestamp),l.applyRotation(this.currentCamera,this.sphere.center,this.rotationAxis,s),this.constraintOptions.interactionType=2,this.constraintOptions.interactionFactor=e.pixelDistanceToInteractionFactor(t.radius*a),e.applyAll(this.view,this.currentCamera,this.constraintOptions)},i.prototype.panningPlanar=function(t){l.navPointToScreenPoint(this.currentCamera,t.center,this.tmp2d),l.intersectPlaneFromScreenPoint(this.panningPlane,this.currentCamera,this.tmp2d,this.tmp3d)&&(l.applyPanPlanar(this.currentCamera,this.beginScenePoint,this.tmp3d),this.panPlanarMomentumEstimator.add(this.tmp2d,this.tmp3d,.001*t.timestamp),this.constraintOptions.interactionType=4,this.constraintOptions.interactionFactor=e.pixelDistanceToInteractionFactor(this.beginScreenPoint,this.tmp2d),this.constraintOptions.interactionDirection=this.view.renderCoordsHelper.worldUpAtPosition(this.currentCamera.eye,this.tmpInteractionDirection),e.applyAll(this.view,this.currentCamera,this.constraintOptions),this.constraintOptions.interactionDirection=null)},i.prototype.zoomPlanar=function(t){var i=this.beginRadius/t.radius,n=.001875*Math.min(Math.max(t.radius,40),120);this.smoothScaling.gain=n,this.smoothScaling.update(i),this.zoomMomentumEstimator.add(this.smoothScaling.value,.001*t.timestamp),l.applyZoomToPoint(this.currentCamera,this.beginScenePoint,this.smoothScaling.value,this.view.state.constraints.minimumPoiDistance),this.constraintOptions.interactionType=1,this.constraintOptions.interactionFactor=e.pixelDistanceToInteractionFactor(t.radius-this.beginRadius),e.applyAll(this.view,this.currentCamera,this.constraintOptions)},i.prototype.rotatePlanar=function(t){o.vec3d.set(this.beginScenePoint,this.rotationAxis);var i=this.smoothRotation.value,n=t.angle-i;n=l.normalizeRotationDelta(n);var a=i+n,r=.00125*Math.min(Math.max(t.radius,40),120);this.smoothRotation.gain=r,this.smoothRotation.update(a);var s=this.smoothRotation.value-this.beginAngle;this.rotationMomentumEstimator.add(s,.001*t.timestamp),l.applyRotation(this.currentCamera,this.sphere.center,this.rotationAxis,s),this.constraintOptions.interactionType=2,this.constraintOptions.interactionFactor=e.pixelDistanceToInteractionFactor(t.radius*s),e.applyAll(this.view,this.currentCamera,this.constraintOptions)},i}(r.InteractiveController);i.PinchAndPanController=M});