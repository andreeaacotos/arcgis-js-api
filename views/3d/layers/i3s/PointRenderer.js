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

define(["require","exports","dojo/text!./PointCloudPointRenderer.xml","../../support/aaBoundingBox","../../support/orientedBoundingBox","../../webgl-engine/lib/gl-matrix","../../webgl-engine/lib/RenderPass","../../../webgl/BufferObject","../../../webgl/Program","../../../webgl/VertexArrayObject"],function(e,t,i,r,n,o,s,a,d,c){function l(e){return e?256:64}function p(e,t,i,r,n){if(i.drawScreenSpace)return i.fixedSize*t*r;var o=l(n)*t*r;return i.drawFixedSize?Math.min(i.fixedSize/2,o):i.screenMinSize>0?Math.min(Math.max(i.screenMinSize*t*r,e/2),o):Math.min(e/2,o)}function u(e,t,i,r,n){return i.drawScreenSpace?0:p(e,t,i,r,n)}function h(e,t,i){return null==i&&(i=o.vec3d.create()),i[0]=e.origin[0]+e.coordinates[3*t],i[1]=e.origin[1]+e.coordinates[3*t+1],i[2]=e.origin[2]+e.coordinates[3*t+2],i}var f={aPosition:0,aColor:1},m={positions:[{name:"aPosition",count:3,type:5126,offset:0,stride:12,normalized:!1}],colors:[{name:"aColor",count:3,type:5121,offset:0,stride:3,normalized:!0}]};return function(){function e(){this.didRender=!1,this.needsRender=!0,this.layerUid="",this._useFixedSizes=!1,this._scaleFactor=1,this._minSizePx=0,this._useRealWorldSymbolSizes=!1,this._size=0,this._sizePx=0,this._clipBox=r.create(r.POSITIVE_INFINITY),this._programWorld=null,this._programScreen=null,this._programWorldDepth=null,this._programScreenDepth=null,this.tempMatrix4=o.mat4.create(),this.tempVec3=o.vec3.create(),this.nodes=[]}return e.prototype.initializeRenderContext=function(e){e.shaderSnippets.fsPointCloudPointRenderer||e.shaderSnippets._parse(i);var t=e.shaderSnippets.vsPointCloudPointRenderer,r=e.shaderSnippets.fsPointCloudPointRenderer;this._programWorld=new d(e.rctx,t,r,f,[]),this._programScreen=new d(e.rctx,t,r,f,["DRAW_SCREEN_SIZE"]),this._programWorldDepth=new d(e.rctx,t,r,f,["DEPTH_PASS"]),this._programScreenDepth=new d(e.rctx,t,r,f,["DRAW_SCREEN_SIZE","DEPTH_PASS"]),this.needsRender=!0},e.prototype.uninitializeRenderContext=function(e){this._programWorld&&this._programWorld.dispose(),this._programScreen&&this._programScreen.dispose(),this._programWorldDepth&&this._programWorldDepth.dispose(),this._programScreenDepth&&this._programScreenDepth.dispose(),this._programWorld=null,this._programScreen=null,this._programWorldDepth=null,this._programScreenDepth=null},e.prototype.intersect=function(e,t,i,s){var a=o.vec3d.create(),d=o.vec3d.create(),c=o.vec3d.create(),l=o.vec3d.create(),f=o.vec4d.create(),m=e.camera.perPixelRatio,_=e.camera.near,S=this._getSizeParams();o.vec3d.subtract(i,t,d);var g=1/o.vec3d.length(d);o.vec3d.scale(d,g,d),o.vec3d.negate(d,c),o.vec4d.set4(d[0],d[1],d[2],-o.vec3d.dot(d,t),f);var v={},x={},b=r.create(),z=r.create(this._clipBox);r.offset(z,-t[0],-t[1],-t[2],z);for(var P=0,y=this.nodes;P<y.length;P++){var R=y[P],M=R.splatSize*this._scaleFactor,I=n.minimumDistancePlane(R.obb,f),w=n.maximumDistancePlane(R.obb,f);I-=u(M,I+_,S,m,R.isLeaf),w-=u(M,w+_,S,m,R.isLeaf);var D=w<0,F=null!=v.dist&&null!=x.dist&&v.dist<I*g&&x.dist>w*g;if(!D&&!F){var U=p(M,w+_,S,m,R.isLeaf);if(n.intersectLine(R.obb,t,d,U)){var W=U*U;n.toAaBoundingBox(R.obb,b),r.offset(b,-t[0],-t[1],-t[2],b);var E=!r.contains(z,b);o.vec3d.subtract(R.origin,t,l);for(var C=0;C<R.pointCount;C++)if(a[0]=l[0]+R.coordinates[3*C],a[1]=l[1]+R.coordinates[3*C+1],a[2]=l[2]+R.coordinates[3*C+2],!E||r.containsPoint(z,a)){var V=o.vec3d.dot(a,d),A=V+_,T=u(M,A,S,m,R.isLeaf);if(!(V-T<0)){var O=o.vec3d.length2(a)-V*V;if(!(O>W)){A-=T;var j=p(M,A,S,m,R.isLeaf);if(!(O>j*j)){var q=this.layerUid+"/"+R.id+"/"+C,B=(V-T)*g;(null==v.dist||B<v.dist)&&(v.point=h(R,C,v.point),v.dist=B,v.normal=c,v.pointId=q,v.layerUid=this.layerUid),(null==x.dist||B>x.dist)&&(x.point=h(R,C,x.point),x.dist=B,x.normal=c,x.pointId=q,x.layerUid=this.layerUid)}}}}}}}if(null!=v.dist){var L=e.getMinResult();if(null==L.dist||v.dist<L.dist){var N={point:v.point,metadata:{pointId:v.pointId,layerUid:v.layerUid}};L.set(N,v.pointId,v.dist,v.normal,void 0),L.setIntersector("pointcloud")}}if(null!=x.dist){var H=e.getMaxResult();if(null==H.dist||x.dist>H.dist){var N={point:x.point,metadata:{pointId:x.pointId,layerUid:x.layerUid}};H.set(N,x.pointId,x.dist,x.normal,void 0),H.setIntersector("pointcloud")}}},e.prototype.render=function(e){if(e.pass!==s.MATERIAL&&e.pass!==s.MATERIAL_DEPTH)return!1;for(var t=e.pass===s.MATERIAL_DEPTH,i=e.rctx,n=0,a=this.nodes;n<a.length;n++){var d=a[n];null==d.vao&&this._initNode(e,d)}var c=this._getSizeParams(),p=t?c.drawScreenSpace?this._programScreenDepth:this._programWorldDepth:c.drawScreenSpace?this._programScreen:this._programWorld;if(null==p||0===this.nodes.length)return!0;var u=this._clipBox,h=!r.equals(u,r.POSITIVE_INFINITY,function(e,t){return e===t});h||(o.vec3.set3(-1/0,-1/0,-1/0,this.tempVec3),p.setUniform3fv("uClipMin",this.tempVec3),o.vec3.set3(1/0,1/0,1/0,this.tempVec3),p.setUniform3fv("uClipMax",this.tempVec3)),i.setDepthTestEnabled(!0),i.bindProgram(p);var f=e.camera.projectionMatrix;p.setUniformMatrix4fv("uProjectionMatrix",f),t&&p.setUniform2f("nearFar",e.camera.near,e.camera.far),c.drawFixedSize&&p.setUniform2f("uPointScale",c.fixedSize,e.camera.fullHeight);for(var m=0,_=this.nodes;m<_.length;m++){var d=_[m];if(p.setUniform2f("uScreenMinMaxSize",c.screenMinSize,l(d.isLeaf)),!c.drawFixedSize){var S=d.splatSize*this._scaleFactor;p.setUniform2f("uPointScale",S,e.camera.fullHeight)}var g=d.origin;h&&(o.vec3.set3(u[0]-g[0],u[1]-g[1],u[2]-g[2],this.tempVec3),p.setUniform3fv("uClipMin",this.tempVec3),o.vec3.set3(u[3]-g[0],u[4]-g[1],u[5]-g[2],this.tempVec3),p.setUniform3fv("uClipMax",this.tempVec3)),o.mat4.identity(this.tempMatrix4),o.mat4.translate(this.tempMatrix4,g,this.tempMatrix4),o.mat4.multiply(e.camera.viewMatrix,this.tempMatrix4,this.tempMatrix4),p.setUniformMatrix4fv("uModelViewMatrix",this.tempMatrix4),i.bindVAO(d.vao),i.drawArrays(0,0,d.pointCount)}return!0},Object.defineProperty(e.prototype,"useFixedSizes",{get:function(){return this._useFixedSizes},set:function(e){this._useFixedSizes!==e&&(this._useFixedSizes=e,this._requestRender())},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"scaleFactor",{get:function(){return this._scaleFactor},set:function(e){this._scaleFactor!==e&&(this._scaleFactor=e,this._requestRender())},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"minSizePx",{get:function(){return this._minSizePx},set:function(e){this._minSizePx!==e&&(this._minSizePx=e,this._requestRender())},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"useRealWorldSymbolSizes",{get:function(){return this._useRealWorldSymbolSizes},set:function(e){this._useRealWorldSymbolSizes!==e&&(this._useRealWorldSymbolSizes=e,this._requestRender())},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"size",{get:function(){return this._size},set:function(e){this._size!==e&&(this._size=e,this._requestRender())},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"sizePx",{get:function(){return this._sizePx},set:function(e){this._sizePx!==e&&(this._sizePx=e,this._requestRender())},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"clippingBox",{set:function(e){r.set(this._clipBox,e||r.POSITIVE_INFINITY)},enumerable:!0,configurable:!0}),e.prototype.addNode=function(e){this.nodes.push({id:e.id,splatSize:e.splatSize,obb:e.obb,origin:o.vec3.create(e.origin),coordinates:e.coordinates,pointCount:e.coordinates.length/3,rgb:e.rgb,vao:null,isLeaf:e.isLeaf}),this._requestRender()},e.prototype.removeNode=function(e){this.nodes=this.nodes.filter(function(t){return t.id===e&&t.vao&&(t.vao.dispose(!0),t.vao=null),t.id!==e}),this._requestRender()},e.prototype.removeAll=function(){this.nodes.forEach(function(e){e.vao&&(e.vao.dispose(!0),e.vao=null)}),this.nodes=[],this._requestRender()},e.prototype._initNode=function(e,t){var i=e.rctx;t.vao=new c(i,f,m,{positions:a.createVertex(i,35044,t.coordinates),colors:a.createVertex(i,35044,t.rgb)})},e.prototype._requestRender=function(){this.didRender=!1,this.needsRender=!0},e.prototype._getSizeParams=function(){var e=this._useFixedSizes,t=e&&!this._useRealWorldSymbolSizes,i=t?this._sizePx:this._size,r=this._minSizePx;return e&&(r=0),{drawScreenSpace:t,drawFixedSize:e,fixedSize:i,screenMinSize:r}},e}()});