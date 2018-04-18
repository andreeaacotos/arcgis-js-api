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

define(["dojo/text!./materials/RealisticAtmosphereMaterial.xml","../../../core/watchUtils","../../../core/Handles","../support/ExternalRenderer","../lib/glMatrix","../webgl-engine/lib/GeometryRenderer","../webgl-engine/lib/GeometryUtil","../webgl-engine/lib/RenderPass","../webgl-engine/lib/RenderSlot","../webgl-engine/lib/OffscreenRenderingHelper","../support/earthUtils","../../webgl/Program","../webgl-engine/lib/DefaultVertexBufferLayouts","../webgl-engine/lib/DefaultVertexAttributeLocations"],function(e,t,a,r,s,i,n,h,l,o,d,m,v,_){var f=d.earthRadius,u=s.vec3d,p=s.vec2d,c=s.vec4d,g=.02*Math.PI,P=.004*Math.PI,D=u.createFrom(1/Math.pow(.65,4),1/Math.pow(.57,4),1/Math.pow(.475,4)),S=u.create(D);u.scale(S,g),u.add(S,u.createFrom(P,P,P));var R=-.99999,C=r.createSubclass({declaredClass:"esri.views.3d.environment.RealisticAtmosphere",properties:{view:{},planar:{value:!1,set:function(e){e=!!e,e!==this.planar&&this._update(),this._set("planar",e)}},needsRender:{value:!1}},constructor:function(){this._handles=new a,this._lowerElevationBoundRadius=0,this._earthRadius=f,this._hazeProgram=null,this._hazePlanarProgram=null,this._skyProgram=null,this._skyPlanarProgram=null,this._renderer=null,this._renderData={texDepth:p.create(),v3CameraPos:u.create(),v3CameraUp:u.create(),v3CameraRight:u.create(),v3CameraDir:u.create(),halfSizeNearPlane:p.create(),v2CameraCenterOffset:p.create(),v4SphereComp:c.create(),v4AtmosParams1:c.create(),v4AtmosParams2:c.create(),v4AtmosParams3:c.create(),v3InvWavelength:D,v3InvWavelengthScaled:S,v4Radii:c.create(),fScale:0,fScaleDepth:.25,fLowerAlphaBlendBound:0,fScaleOverScaleDepth:0,fOneOverScaleDepth:0,fScaleDepthBlue:.05,fOneOverScaleDepthBlue:20,fScaleOverScaleDepthBlue:0,g:R,g2:R*R,fMiePhaseCoefficients:10000016666394795e-21,showTest:0,nearFar:p.create()},this._updateRadius(f),this._hazeSlot=l.POSTPROCESSING_ATMOSPHERE_TRANSPARENT,this._skySlot=l.POSTPROCESSING_ATMOSPHERE_OPAQUE},destroy:function(){this._handles&&(this._handles.destroy(),this._handles=null),this._hazeProgram&&(this._hazeProgram.dispose(),this._hazeProgram=null),this._hazePlanarProgram&&(this._hazePlanarProgram.dispose(),this._hazePlanarProgram=null),this._skyProgram&&(this._skyProgram.dispose(),this._skyProgram=null),this._skyPlanarProgram&&(this._skyPlanarProgram.dispose(),this._skyPlanarProgram=null)},setup:function(a){var r=[[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]],s=n.createSquareGeometry(r),h=s.toRenderData(),l=this.renderContext.rctx;this._renderer=new i(h,v.Pos3Tex,null,l);var o=this._update.bind(this);this._handles.add(t.init(this,"view.state.camera",o,!0));var d=this._updateElevation.bind(this),f=function(){this._updateElevation({tile:this.view.basemapTerrain.rootTiles[0]})}.bind(this),u=this._updateVisibleElevationBounds.bind(this);this._handles.add(t.on(this,"view.basemapTerrain","elevation-change",d,f)),this._handles.add(t.on(this,"view.basemapTerrain","elevation-bounds-change",u,u)),a.shaderSnippets.fsRealisticAtmosphere||a.shaderSnippets._parse(e),this._hazeProgram=new m(l,a.shaderSnippets.vsRealisticAtmosphere,a.shaderSnippets.fsRealisticAtmosphere,_.Default3D,["HAZE"]),this._skyProgram=new m(l,a.shaderSnippets.vsRealisticAtmosphere,a.shaderSnippets.fsRealisticAtmosphere,_.Default3D),this._hazePlanarProgram=new m(l,a.shaderSnippets.vsRealisticAtmosphere,a.shaderSnippets.fsRealisticAtmosphere,_.Default3D,["HAZE","PLANAR"]),this._skyPlanarProgram=new m(l,a.shaderSnippets.vsRealisticAtmosphere,a.shaderSnippets.fsRealisticAtmosphere,_.Default3D,["PLANAR"])},render:function(e){if(e.slot!==this._hazeSlot&&e.slot!==this._skySlot||e.pass!==h.MATERIAL)return!1;if(e.slot==this._hazeSlot&&e.options.earlyOcclusionPixelDraw)return!1;var t,a=this.renderContext.rctx,r=a.gl,s=e.offscreenRenderingHelper,i=!1;if(e.slot===this._hazeSlot){t=this.planar?this._hazePlanarProgram:this._hazeProgram,a.bindProgram(t),a.setBlendFunctionSeparate(r.ONE,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE),s.detachDepthTextureFromBuffer(),i=!0;var n=s.getDepthTexture();a.bindTexture(n,0),t.setUniform1i("tDepth",0),t.setUniform4fv("v4SphereComp",this._renderData.v4SphereComp)}return e.slot===this._skySlot&&(t=this.planar?this._skyPlanarProgram:this._skyProgram,a.bindProgram(t),a.setBlendFunctionSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA),a.setDepthFunction(r.LEQUAL),t.setUniform4fv("v4SphereComp",this._renderData.v4SphereComp),t.setUniform4fv("v4AtmosParams3",this._renderData.v4AtmosParams3)),t.setUniform3fv("v3InvWavelength",this._renderData.v3InvWavelength),t.setUniform3fv("v3InvWavelengthScaled",this._renderData.v3InvWavelengthScaled),t.setUniform3fv("v3LightDir",e.lightingData.direction),t.setUniform3fv("v3CameraPos",this._renderData.v3CameraPos),t.setUniform3fv("v3CameraUp",this._renderData.v3CameraUp),t.setUniform3fv("v3CameraRight",this._renderData.v3CameraRight),t.setUniform3fv("v3CameraDir",this._renderData.v3CameraDir),t.setUniform2fv("nearFar",this._renderData.nearFar),t.setUniform2fv("halfSizeNearPlane",this._renderData.halfSizeNearPlane),t.setUniform2fv("v2CameraCenterOffset",this._renderData.v2CameraCenterOffset),t.setUniform4fv("v4Radii",this._renderData.v4Radii),t.setUniform4fv("v4AtmosParams1",this._renderData.v4AtmosParams1),t.setUniform4fv("v4AtmosParams2",this._renderData.v4AtmosParams2),t.setUniform1f("showTest",this._renderData.showTest),i?a.setDepthTestEnabled(!1):a.setDepthTestEnabled(!0),a.setBlendingEnabled(!0),a.setDepthWriteEnabled(!1),this._renderer.render(t),a.setDepthFunction(r.LESS),a.setDepthWriteEnabled(!0),a.setBlendingEnabled(!1),a.setBlendFunctionSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA),i&&s.restoreDepthTextureToBuffer(),!0},_setEnableTestImage:function(e){this._renderData.showTest=e?1:0,this.needsRender=!0},_adjustRadiusForTesselation:function(e){var t=Math.PI/Math.pow(2,4)/16;return e*Math.cos(t)},_normalizeRadius:function(e){return e=this._adjustRadiusForTesselation(e),Math.max(f-1e4,Math.min(e,f))},_updateElevation:function(e){if(0===e.tile.lij[0]){var t=this._adjustRadiusForTesselation(f+e.tile.elevationBounds[0]);t!==this._lowerElevationBoundRadius&&(this._lowerElevationBoundRadius=t,this._earthRadius=-1,this._updateVisibleElevationBounds())}},_updateVisibleElevationBounds:function(){var e=this._adjustRadiusForTesselation(f+this.view.basemapTerrain.getElevationBounds()[0]);return(this._earthRadius<0||e<this._earthRadius)&&this._updateRadius(e)},_updateRadius:function(e){this._earthRadius=e;var t=e,a=t*t,r=t/10*10.25,s=r*r,i=1/(r-t),n=i/.25,h=i/.05,l=.3*(r-t)+t,o=1/(r-l),d=this._renderData;return c.set4(i,.25,n,4,d.v4AtmosParams1),c.set4(R,.05,h,20,d.v4AtmosParams2),c.set4(R*R,10000016666394795e-21,l,o,d.v4AtmosParams3),c.set4(t,a,r,s,d.v4Radii),d.fScale=i,d.fLowerAlphaBlendBound=l,d.fScaleOverScaleDepth=n,d.fScaleOverScaleDepthBlue=h,this._update(),!0},_update:function(e){if(e=e||this.get("view.state.camera")){if(u.negate(e.viewForward,this._renderData.v3CameraDir),u.set(e.viewUp,this._renderData.v3CameraUp),u.set(e.viewRight,this._renderData.v3CameraRight),this.planar){var t=this.view.renderCoordsHelper;this._renderData.fCameraHeight=t.getAltitude(e.eye)/t.unitInMeters+f}else this._renderData.fCameraHeight=u.length(e.eye);this._renderData.fCameraHeight2=this._renderData.fCameraHeight*this._renderData.fCameraHeight,this._renderData.fC=this._renderData.fCameraHeight2-this._renderData.v4Radii[3],this._renderData.fCSur=this._renderData.fCameraHeight2-this._renderData.v4Radii[1],this._renderData.v4SphereComp=c.createFrom(this._renderData.fCameraHeight,this._renderData.fCameraHeight2,this._renderData.fC,this._renderData.fCSur),u.set(e.eye,this._renderData.v3CameraPos),p.set2(Math.tan(e.fovX/2)/(e.width/e.fullWidth),Math.tan(e.fovY/2)/(e.height/e.fullHeight),this._renderData.halfSizeNearPlane);var a=(e.padding[3]+e.width/2)/e.fullWidth,r=(e.padding[2]+e.height/2)/e.fullHeight;p.set2(a-.5,r-.5,this._renderData.v2CameraCenterOffset),p.set2(e.near,e.far,this._renderData.nearFar),this.needsRender=!0}}});return C.isSupported=function(e){return o.supportsDepthTexture(e.rctx)},C});