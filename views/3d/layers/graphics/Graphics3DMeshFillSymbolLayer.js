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

define(["require","exports","../../../../core/tsSupport/extendsHelper","../../../../Color","../../../../geometry/support/MeshComponent","../../../../geometry/support/webMercatorUtils","../../../../geometry/support/meshUtils/projection","./ElevationAligners","./Graphics3DGraphicLayer","./Graphics3DSymbolCommonCode","./Graphics3DSymbolLayer","../support/edgeUtils","../support/symbolColorUtils","../../lib/glMatrix","../../support/aaBoundingBox","../../support/debugFlags","../../support/projectionUtils","../../webgl-engine/Stage","../../webgl-engine/lib/Geometry","../../webgl-engine/lib/GeometryData","../../webgl-engine/lib/Object3D","../../webgl-engine/lib/Texture","../../webgl-engine/lib/Util","../../webgl-engine/materials/DefaultMaterial","../../webgl-engine/materials/NativeLineMaterial"],function(e,t,r,a,o,i,n,s,l,c,u,p,m,h,f,d,v,g,_,y,b,x,C,w,O){var A=C.VertexAttrConstants,M=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t._edgeStageObjects=new Set,t._materials={},t._textures={},t}return r(t,e),t.prototype._prepareResources=function(){d.DRAW_MESH_GEOMETRY_NORMALS&&(this._debugVertexNormalMaterial=new O({color:[1,0,1,1]},"debugVertexNormal"),this._debugFaceNormalMaterial=new O({color:[0,1,1,1]},"debugFAceNormal")),this.resolve()},t.prototype.destroy=function(){e.prototype.destroy.call(this),this.isFulfilled()||this.reject();for(var t in this._materials){var r=this._materials[t];this._context.stage.remove(g.ModelContentType.MATERIAL,r.material.id)}for(var t in this._textures){var a=this._textures[t];this._context.stage.remove(g.ModelContentType.TEXTURE,a.id)}this._materials={},this._textures={}},t.prototype.createGraphics3DGraphic=function(e,t){var r=this._validateGeometry(e.geometry);if("mesh"!==r.type)return this._logWarning("unsupported geometry type for fill on mesh-3d symbol: "+r.type),null;var a="graphic"+e.uid,o=this.getGraphicElevationContext(e);return this._createAs3DShape(e,t,o,a,e.uid)},t.prototype.layerPropertyChanged=function(e,t,r){if("opacity"===e){var a=this._getLayerOpacity();for(var o in this._materials){var i=this._materials[o];i.material.setParameterValues({layerOpacity:a});var n=i.material.getParameterValues();this._setMaterialTransparentParameter(n),i.material.setParameterValues({transparent:n.transparent})}if(this._edgeStageObjects.size>0){var s=this._context.stage.view.getEdgeView(),l=this._getLayerOpacity(),u=this.symbol.edges?this.symbol.edges.color.a:0;this._edgeStageObjects.forEach(function(e){s.updateComponentOpacity(e,0,u*l)})}return!0}if("elevationInfo"===e){this._updateElevationContext();for(var p in t){var m=t[p],h=r(m);if(h){var f=m.graphic,d=this.getGraphicElevationContext(f);h.needsElevationUpdates=c.needsElevationUpdates3D(d.mode),h.elevationContext.set(d)}}return!0}return!1},t.prototype._requiresVertexColors=function(){return this._isPropertyDriven("color")||this._isPropertyDriven("opacity")},t.prototype._colorUid=function(e){var t=e.material&&e.material.color;if(!t)return"-";if(t)switch(t.type){case"value":return t.value.toHex();case"image":return t.uid}},t.prototype._materialProperties=function(e,t){var r=this._requiresVertexColors();return{hasVertexColors:r,color:t.material&&t.material.color,uid:"vc:"+r+",cmuid:"+this._colorUid(t)}},t.prototype._setInternalColorValueParameters=function(e,t){t.diffuse=a.toUnitRGB(e.value),t.opacity=e.value.a},t.prototype._setInternalColorImageParameters=function(e,t,r){var a=e.url;if(a){var o=this._textures[e.uid];o||(o=new x(a,t+"_"+e.uid+"_tex",{mipmap:!0,wrapClamp:!1,noUnpackFlip:!0}),this._textures[e.uid]=o,this._context.stage.add(g.ModelContentType.TEXTURE,o)),r.textureId=o.id}},t.prototype._setInternalMaterialParameters=function(e,t,r){var a=e.material&&e.material.color;if(a)switch(a.type){case"value":this._setInternalColorValueParameters(a,r);break;case"image":this._setInternalColorImageParameters(a,t,r)}},t.prototype._setExternalMaterialParameters=function(e){if(this._isPropertyDriven("color"))e.externalColor=I;else{var t=this.symbol.material?a.toUnitRGBA(this.symbol.material.color):I;e.externalColor=t}var r=this.symbol.material&&this.symbol.material.colorMixMode;r&&(e.colorMixMode=r)},t.prototype._getOrCreateMaterial=function(e,t){var r=this._materialProperties(e,t),a=this._materials[r.uid];if(a)return a.material;var o=this._getStageIdHint(),i={specular:S,symbolColors:r.hasVertexColors,ambient:S,diffuse:N,opacity:1,doubleSided:!0,doubleSidedType:"winding-order",cullFace:"none",layerOpacity:this._getLayerOpacity()};this._setInternalMaterialParameters(t,o,i),this._setExternalMaterialParameters(i),this._setMaterialTransparentParameter(i);var n=new w(i,o+"_"+r.uid+"_mat"),s=t.material&&t.material.color&&"value"===t.material.color.type&&t.material.color.value,l=s?s.a:1;return this._materials[r.uid]={geometryOpacity:l,material:n},this._context.stage.add(g.ModelContentType.MATERIAL,n),n},t.prototype._setMaterialTransparentParameter=function(e){this._isPropertyDriven("opacity")&&(e.transparent=!0),e.transparent=e.layerOpacity<1||e.opacity<1||e.externalColor&&e.externalColor[3]<1},t.prototype._addDebugNormals=function(e,t,r,a){for(var o=t.length,i=e.spatialReference.isWGS84?20015077/180:1,n=.1*Math.max(e.extent.width*i,e.extent.height*i,e.extent.zmax-e.extent.zmin),s=[],l=[],c=[],u=[],p=0;p<o;p++)for(var m=t[p],f=m.data.getAttribute(A.POSITION),d=m.data.getAttribute(A.NORMAL),v=m.data.getIndices(A.POSITION),g=m.data.getIndices(A.NORMAL),b=f.data,x=d.data,C=0;C<v.length;C++){for(var w=3*v[C],O=3*g[C],M=0;M<3;M++)s.push(b[w+M]);for(var M=0;M<3;M++)s.push(b[w+M]+x[O+M]*n);if(l.push(l.length),l.push(l.length),C%3==0){this._calculateFaceNormal(b,v,C,R),this._getFaceVertices(b,v,C,P,E,T),h.vec3d.add(P,E),h.vec3d.add(P,T),h.vec3d.scale(P,1/3);for(var M=0;M<3;M++)c.push(P[M]);for(var M=0;M<3;M++)c.push(P[M]+R[M]*n);u.push(u.length),u.push(u.length)}}var N=(U={},U[A.POSITION]={data:new Float64Array(s),size:3},U),I=(V={},V[A.POSITION]=new Uint32Array(l),V),S=new y(N,I,void 0,"line"),F=new _(S,"debugVertexNormal");F.singleUse=!0,t.push(F),r.push([this._debugVertexNormalMaterial]),a.push(h.mat4d.create(a[0]));var N=(B={},B[A.POSITION]={data:new Float64Array(c),size:3},B),I=(L={},L[A.POSITION]=new Uint32Array(u),L),S=new y(N,I,void 0,"line"),F=new _(S,"debugFaceNormal");F.singleUse=!0,t.push(F),r.push([this._debugFaceNormalMaterial]),a.push(h.mat4d.create(a[0]));var U,V,B,L},t.prototype._createAs3DShape=function(e,t,r,a,o){var i=this,n=e.geometry;if("mesh"!==n.type)return null;var u=this._createGeometryInfo(n,t,a);if(!u)return null;var m=u.geometries,h=u.materials,f=u.transformations,v=u.objectTransformation;d.DRAW_MESH_GEOMETRY_NORMALS&&this._addDebugNormals(n,m,h,f);var g=new b({geometries:m,materials:h,transformations:f,castShadow:!0,metadata:{layerUid:this._context.layer.uid,graphicId:o},idHint:a});g.setObjectTransformation(v);var _=function(e){var t=i._context.stage.view.getEdgeView();if(t){t.removeObject(e),i._edgeStageObjects.delete(e);var r=p.createMaterial(t,i.symbol,i._getLayerOpacity());r&&(i._edgeStageObjects.add(e),t.addObject(e,[r],{mergeGeometries:!0}))}};_(g);var y=function(e,t,r,a,o){var i=s.perObjectElevationAligner(e,t,r,a,o);return _(e),i},x=new l(this,g,m,null,null,y,r);x.needsElevationUpdates=c.needsElevationUpdates3D(r.mode);var C=n.extent.center.clone();return C.z=0,x.elevationContext.centerPointInElevationSR=C,x.alignedTerrainElevation=y(g,x.elevationContext,this._context.elevationProvider,this._context.renderCoordsHelper,this._context.featureExpressionInfoContext),x},t.prototype._createComponentNormals=function(e,t,r,a){var o=r.shading||"flat";switch(o){case"source":return this._createComponentNormalsSource(e,t,r,a);case"flat":return this._createComponentNormalsFlat(e,r,a);case"smooth":return this._createComponentNormalsSmooth(e,r,a)}},t.prototype._createComponentNormalsSource=function(e,t,r,a){if(!t)return this._createComponentNormalsFlat(e,r,a);for(var o=!1,i=0;i<a.length;i+=3){this._calculateFaceNormal(e,a,i,R);for(var n=0;n<3;n++){var s=3*a[i+n];P[0]=t[s+0],P[1]=t[s+1],P[2]=t[s+2],h.vec3d.dot(R,P)<0&&(t[s+0]=-t[s+0],t[s+1]=-t[s+1],t[s+2]=-t[s+2],o=!0)}}return{normals:t,indices:a,didFlipNormals:o}},t.prototype._createComponentNormalsFlat=function(e,t,r){for(var a=new Float32Array(r.length),o=new Uint32Array(3*r.length),i=0;i<r.length;i+=3)for(var n=this._calculateFaceNormal(e,r,i,R),s=0;s<3;s++)a[i+s]=n[s],o[i+s]=i/3;return{normals:a,indices:o,didFlipNormals:!1}},t.prototype._createComponentNormalsSmooth=function(e,t,r){for(var a={},o=0;o<r.length;o+=3)for(var i=this._calculateFaceNormal(e,r,o,R),n=0;n<3;n++){var s=r[o+n],l=a[s];l||(l={normal:h.vec3d.create(),count:0},a[s]=l),h.vec3d.add(l.normal,i),l.count++}for(var c=new Float32Array(3*r.length),u=new Uint32Array(3*r.length),o=0;o<r.length;o++){var s=r[o],l=a[s];1!==l.count&&(h.vec3d.normalize(h.vec3d.scale(l.normal,1/l.count)),l.count=1);for(var n=0;n<3;n++)c[3*o+n]=l.normal[n];u[o]=o}return{normals:c,indices:u,didFlipNormals:!1}},t.prototype._getFaceVertices=function(e,t,r,a,o,i){var n=3*t[r+0],s=3*t[r+1],l=3*t[r+2];a[0]=e[n+0],a[1]=e[n+1],a[2]=e[n+2],o[0]=e[s+0],o[1]=e[s+1],o[2]=e[s+2],i[0]=e[l+0],i[1]=e[l+1],i[2]=e[l+2]},t.prototype._calculateFaceNormal=function(e,t,r,a){return this._getFaceVertices(e,t,r,P,E,T),h.vec3d.subtract(E,P),h.vec3d.subtract(T,P),h.vec3d.cross(E,T,P),h.vec3d.normalize(P,a),a},t.prototype._getOrCreateComponents=function(e){return e.components?e.components:L},t.prototype._createPositionBuffer=function(e){var t=e.vertexAttributes.position,r=new Float64Array(t.length),a=this._context.renderSpatialReference;return c.reproject(e.vertexAttributes.position,0,e.spatialReference,r,0,a,t.length/3),r},t.prototype._createNormalBuffer=function(e,t){var r=e.vertexAttributes.normal;if(!r)return null;if("local"===this._context.layerView.view.viewingMode)return r;var a=e.vertexAttributes.position,o=new Float32Array(r.length);return n.projectNormalToECEF(r,a,t,e.spatialReference,o)},t.prototype._createColorBuffer=function(e){if(this._requiresVertexColors()){var t=this._getVertexOpacityAndColor(e),r=this.symbol.material&&this.symbol.material.colorMixMode||null,a=new Uint8Array(4);return m.encodeSymbolColor(t,r,a),a}return null},t.prototype._createColorIndices=function(e,t){for(var r=new Uint32Array(t.length),a=0;a<r.length;a++)r[a]=0;return r},t.prototype._createBuffers=function(e,t){var r=e.vertexAttributes&&e.vertexAttributes.position;if(!r)return this._logWarning("Mesh geometry must contain position vertex attributes"),null;var a=e.vertexAttributes.normal,o=e.vertexAttributes.uv;if(a&&a.length!==r.length)return this._logWarning("Mesh normal vertex buffer must contain the same number of elements as the position buffer"),null;if(o&&o.length/2!=r.length/3)return this._logWarning("Mesh uv vertex buffer must contain the same number of elements as the position buffer"),null;var i=this._createPositionBuffer(e),n=this._createColorBuffer(t),s=this._createNormalBuffer(e,i);return{positionBuffer:i,normalBuffer:s,uvBuffer:o,colorBuffer:n,objectTransformation:this._transformCenterLocal(e,i,s)}},t.prototype._transformCenterLocal=function(e,t,r){var a=e.extent.center,o=this._context.renderSpatialReference;F[0]=a.x,F[1]=a.y,F[2]=0;var i=h.mat4d.create();v.computeLinearTransformation(e.spatialReference,F,i,o),h.mat4d.inverse(i,U);for(var n=0;n<t.length;n+=3)P[0]=t[n+0],P[1]=t[n+1],P[2]=t[n+2],h.mat4d.multiplyVec3(U,P),t[n+0]=P[0],t[n+1]=P[1],t[n+2]=P[2];if(r){h.mat4d.toMat3(i,V),h.mat3d.transpose(V,V);for(var n=0;n<r.length;n+=3)P[0]=r[n+0],P[1]=r[n+1],P[2]=r[n+2],h.mat3d.multiplyVec3(V,P),r[n+0]=P[0],r[n+1]=P[1],r[n+2]=P[2]}return i},t.prototype._validateFaces=function(e,t){var r=e.vertexAttributes.position.length/3,a=t.faces;if(a){for(var o=-1,i=0;i<a.length;i++){var n=a[i];n>o&&(o=n)}if(r<=o)return this._logWarning("Vertex index "+o+" is out of bounds of the mesh position buffer"),!1}else if(r%3!=0)return this._logWarning("Mesh position buffer length must be a multiple of 9 if no component faces are defined (3 values per vertex * 3 vertices per triangle)"),!1;return!0},t.prototype._getOrCreateFaces=function(e,t){if(t.faces)return t.faces;for(var r=new Uint32Array(e.vertexAttributes.position.length/3),a=0;a<r.length;a++)r[a]=a;return r},t.prototype._isOutsideClippingArea=function(e){if(!this._context.clippingExtent)return!1;var t=e.vertexAttributes&&e.vertexAttributes.position;if(!t)return!1;var r,a=this._context.elevationProvider.spatialReference,o=t.length/3;return e.spatialReference.equals(a)?r=t:(r=new Float64Array(t.length),c.reproject(e.vertexAttributes.position,0,e.spatialReference,r,0,a,o)),c.computeBoundingBox(r,0,o,B),c.boundingBoxClipped(B,this._context.clippingExtent)},t.prototype._createGeometryInfo=function(e,t,r){if(!i.canProject(e,this._context.layerView.view.spatialReference))return this._logWarning("Geometry spatial reference is not compatible with the view"),null;if(this._isOutsideClippingArea(e))return null;var a=this._createBuffers(e,t);if(!a)return null;for(var o=a.positionBuffer,n=a.uvBuffer,s=a.colorBuffer,l=a.normalBuffer,c=a.objectTransformation,u=this._getOrCreateComponents(e),p=[],m=[],f=[],d=!1,v=0,g=u;v<g.length;v++){var b=g[v];if(!this._validateFaces(e,b))return null;var x=this._getOrCreateFaces(e,b);if(0!==x.length){var C=this._createComponentNormals(o,l,b,x);C.didFlipNormals&&(d=!0);var w=(I={},I[A.POSITION]={size:3,data:o},I[A.NORMAL]={size:3,data:C.normals},I),O=(S={},S[A.POSITION]=x,S[A.NORMAL]=C.indices,S);s&&(w[A.SYMBOLCOLOR]={size:4,data:s},O[A.SYMBOLCOLOR]=this._createColorIndices(b,x)),e.vertexAttributes.uv&&(w[A.UV0]={size:2,data:n},O[A.UV0]=x);var M=new y(w,O),N=new _(M,r+"_mesh");N.singleUse=!0,p.push(N),m.push(h.mat4d.identity()),f.push([this._getOrCreateMaterial(e,b)])}}return d&&this._logWarning("Normals have been automatically flipped to be consistent with the counter clock wise face winding order. It is better to generate mesh geometries that have consistent normals."),{geometries:p,transformations:m,materials:f,objectTransformation:c};var I,S},t}(u),N=[1,1,1],I=[1,1,1,1],S=[0,0,0],F=h.vec3d.create(),P=h.vec3d.create(),E=h.vec3d.create(),T=h.vec3d.create(),R=h.vec3d.create(),U=h.mat4d.create(),V=h.mat3d.create(),B=f.create(),L=[new o];return M});