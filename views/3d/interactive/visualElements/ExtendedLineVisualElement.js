/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.18/esri/copyright.txt for details.
*/
define(["exports","../../../../chunks/_rollupPluginBabelHelpers","../../../../core/has","../../../../core/maybe","../../../../chunks/vec3f64","../../../../chunks/vec3","../../../../core/Handles","../../../../chunks/vec4","../../../../chunks/clipRay","../../support/geometryUtils","../../webgl-engine/lib/GeometryUtil","../../webgl-engine/lib/Geometry","../../webgl-engine/shaders/RibbonLineTechnique","../../webgl-engine/materials/RibbonLineMaterial","../../../../chunks/vec4f32","./LaserlineVisualElement","./Object3DVisualElement"],(function(e,t,i,n,s,r,a,o,l,h,c,u,d,p,_,f,y){"use strict";let m=function(e){function i(t){var i;return(i=e.call(this,t)||this)._ray=h.ray.create(),i._externalResources=null,i._handles=new a,i._isWorldDown=!1,i._start=s.create(),i._end=s.fromValues(1,0,0),i._width=1,i._color=_.fromValues(1,0,1,1),i._polygonOffset=!1,i._writeDepthEnabled=!0,i._innerWidth=0,i._innerColor=_.fromValues(1,1,1,1),i._stippleIntegerRepeats=!0,i._stipplePattern=null,i._stippleOffColor=null,i._falloff=0,i._extensionType=0,i._laserlineStyle=null,i._laserlineEnabled=!1,i._renderOccluded=4,i._fadedExtensions=E,i.applyProps(t),i}t._inheritsLoose(i,e);var y=i.prototype;return y.createExternalResources=function(){const e=new p.RibbonLineMaterial(this.materialParameters,"lineVisualElement");this._handles.add(this.view.state.watch("camera",(()=>{this.updateGeometry()})));const t=new f.LaserlineVisualElement({view:this.view,attached:this._laserlineEnabled});this._externalResources={material:e,laserline:t}},y.destroyExternalResources=function(){n.isSome(this._externalResources)&&this._externalResources.laserline.destroy(),this._externalResources=null,this._handles.removeAll()},y.forEachExternalResource=function(e){n.isSome(this._externalResources)&&e(this._externalResources.material)},y.createGeometries=function(e){const t=[s.create(),s.create()],i=3===this.extensionType;i&&t.push(s.create(),s.create());const r=new u(c.createPolylineGeometry(t),"lineVisualElement");i&&(r.data.vertexAttributes[d.RibbonVertexAttributeConstants.COLOR]={size:4,data:new Float32Array([1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0]),offsetIdx:0,strideIdx:4},r.data.indices[d.RibbonVertexAttributeConstants.COLOR]=new Uint32Array([0,1,2,3])),e.addGeometry(r,n.unwrap(this._externalResources).material),this.updateVertices(r)},y.updateVisibility=function(t){e.prototype.updateVisibility.call(this,t),n.isSome(this._externalResources)&&(this._externalResources.laserline.visible=t)},y.setStartEndFromWorldDownAtLocation=function(e){this._isWorldDown=!0,r.copy(this._start,e),this.view.renderCoordsHelper.worldUpAtPosition(e,this._end),r.subtract(this._end,e,this._end),h.ray.fromPoints(this._start,this._end,this._ray),this.updateGeometry()},y.updateMaterial=function(){if(n.isNone(this._externalResources))return;this._externalResources.material.setParameterValues(this.materialParameters)},y.updateGeometry=function(){n.isSome(this.object)&&this.updateVertices(this.object.geometries[0])},y.updateVertices=function(e){const t=3===this._extensionType?this.updateLineSegmentFinite(w):this.updateLineSegmentInfinite(this._extensionType,w);this.updateVertexAttributes(e,t),n.isSome(this._externalResources)&&(this._externalResources.laserline.intersectsLine=t)},y.updateLineSegmentFinite=function(e){return h.lineSegment.fromPoints(this._start,this._end,e)},y.updateLineSegmentInfinite=function(e,t){const i=this.view.state.camera;switch(l.fromRay(this._ray,g),e){case 0:g.c0=-Number.MAX_VALUE;break;case 1:case 2:{const e=this._ray.origin,t=this.view.elevationProvider.getElevation(e[0],e[1],e[2],this.view.renderCoordsHelper.spatialReference,"ground")||0,i=this.view.renderCoordsHelper.getAltitude(e);this._isWorldDown&&i<t&&r.negate(g.ray.direction,g.ray.direction),2===this._extensionType&&null!=t&&(g.c1=Math.abs(i-t));break}}if(!h.frustum.intersectClipRay(i.frustum.planes,g))return h.lineSegment.fromPoints(this._start,this._end,t);const n=l.getStart(g,x),s=l.getEnd(g,b);return h.lineSegment.fromPoints(n,s,t)},y.updateVertexAttributes=function(e,t){const i=e.data.getVertexAttr()[d.RibbonVertexAttributeConstants.POSITION].data;if(3===this.extensionType){{const e=h.lineSegment.pointAt(t,-this.fadedExtensions.start,x);i[0]=e[0],i[1]=e[1],i[2]=e[2]}{const e=h.lineSegment.pointAt(t,0,x);i[3]=e[0],i[4]=e[1],i[5]=e[2]}{const e=h.lineSegment.pointAt(t,1,x);i[6]=e[0],i[7]=e[1],i[8]=e[2]}{const e=h.lineSegment.pointAt(t,1+this.fadedExtensions.end,x);i[9]=e[0],i[10]=e[1],i[11]=e[2]}}else{{const e=h.lineSegment.pointAt(t,0,x);i[0]=e[0],i[1]=e[1],i[2]=e[2]}{const e=h.lineSegment.pointAt(t,1,x);i[3]=e[0],i[4]=e[1],i[5]=e[2]}}n.isSome(this.object)&&this.object.geometryVertexAttrsUpdated(0)},t._createClass(i,[{key:"start",get:function(){return this._start},set:function(e){this._isWorldDown=!1,r.exactEquals(this._start,e)||(r.copy(this._start,e),h.ray.fromPoints(this._start,this._end,this._ray),this.updateGeometry())}},{key:"end",get:function(){return this._end},set:function(e){this._isWorldDown=!1,r.exactEquals(this._end,e)||(r.copy(this._end,e),h.ray.fromPoints(this._start,this._end,this._ray),this.updateGeometry())}},{key:"width",get:function(){return this._width},set:function(e){e!==this._width&&(this._width=e,this.updateMaterial())}},{key:"color",get:function(){return this._color},set:function(e){o.exactEquals(e,this._color)||(o.copy(this._color,e),this.updateMaterial())}},{key:"polygonOffset",get:function(){return this._polygonOffset},set:function(e){e!==this._polygonOffset&&(this._polygonOffset=e,this.updateMaterial())}},{key:"writeDepthEnabled",get:function(){return this._writeDepthEnabled},set:function(e){this._writeDepthEnabled!==e&&(this._writeDepthEnabled=e,this.updateMaterial())}},{key:"innerWidth",get:function(){return this._innerWidth},set:function(e){e!==this._innerWidth&&(this._innerWidth=e,this.updateMaterial())}},{key:"innerColor",get:function(){return this._innerColor},set:function(e){o.exactEquals(e,this._innerColor)||(o.copy(this._innerColor,e),this.updateMaterial())}},{key:"stippleIntegerRepeats",get:function(){return this._stippleIntegerRepeats},set:function(e){e!==this._stippleIntegerRepeats&&(this._stippleIntegerRepeats=e,this.updateMaterial())}},{key:"stipplePattern",get:function(){return this._stipplePattern},set:function(e){const t=n.isSome(e)!==n.isSome(this._stipplePattern);this._stipplePattern=e,t?this.recreate():this.updateMaterial()}},{key:"stippleOffColor",get:function(){return this._stippleOffColor},set:function(e){(n.isNone(e)||n.isNone(this._stippleOffColor)||!o.exactEquals(e,this._stippleOffColor))&&(this._stippleOffColor=n.isSome(e)?_.clone(e):null,this.updateMaterial())}},{key:"falloff",get:function(){return this._falloff},set:function(e){e!==this._falloff&&(this._falloff=e,this.updateMaterial())}},{key:"extensionType",get:function(){return this._extensionType},set:function(e){e!==this._extensionType&&(this._extensionType=e,this.updateGeometry())}},{key:"_laserlineAttached",get:function(){return this._laserlineEnabled&&n.isSome(this._laserlineStyle)}},{key:"laserlineStyle",get:function(){return this._laserlineStyle},set:function(e){this._laserlineStyle=e,n.isSome(this._externalResources)&&(this._externalResources.laserline.attached=this._laserlineAttached,n.isSome(e)&&(this._externalResources.laserline.style=e))}},{key:"laserlineEnabled",get:function(){return this._laserlineEnabled},set:function(e){this._laserlineEnabled!==e&&(this._laserlineEnabled=e,n.isSome(this._externalResources)&&(this._externalResources.laserline.attached=this._laserlineAttached))}},{key:"renderOccluded",get:function(){return this._renderOccluded},set:function(e){e!==this._renderOccluded&&(this._renderOccluded=e,this.updateMaterial())}},{key:"fadedExtensions",get:function(){return this._fadedExtensions},set:function(e){this._fadedExtensions=n.unwrapOr(e,E),this.recreateGeometry()}},{key:"materialParameters",get:function(){return{width:this._width,color:this._color,stippleOffColor:this._stippleOffColor,stipplePattern:this._stipplePattern,stippleIntegerRepeats:this._stippleIntegerRepeats,innerWidth:this._innerWidth,innerColor:this._innerColor,falloff:this._falloff,polygonOffset:this._polygonOffset,renderOccluded:this._renderOccluded,writeDepth:this._writeDepthEnabled}}}]),i}(y.Object3DVisualElement);const g=l.create(),x=s.create(),b=s.create(),w=h.lineSegment.create(),R=1/3,E={start:R,end:R};e.ExtendedLineVisualElement=m,Object.defineProperty(e,"__esModule",{value:!0})}));