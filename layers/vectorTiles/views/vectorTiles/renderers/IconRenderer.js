// COPYRIGHT © 201 Esri
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
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.

define(["require","exports","../../../core/libs/gl-matrix/mat4","../../../core/libs/gl-matrix/vec3","../GeometryUtils","./rendererUtils","./vtShaderSnippets","../../webgl/ShaderVariations","../../webgl/VertexArrayObject"],function(e,t,i,r,o,a,n,s,f){return function(){function e(){this._attributeLocations={a_pos:0,a_vertexOffset:1,a_tex:2,a_levelInfo:3},this._attributeLocationsDD={a_pos:0,a_vertexOffset:1,a_tex:2,a_levelInfo:3,a_color:4,a_size:5},this._spritesTextureSize=new Float32Array(2),this._initialized=!1,this._viewProjMat=i.create(),this._offsetVector=r.create(),this._extrudeMat=i.create()}return e.prototype.dispose=function(){},e.prototype.render=function(e,t,r,n,s,f,c,u,d,_,l,m){var v=this;this._initialized||this._initialize(e);var h=u.getLayoutValue("icon-size",r),p=m*u.getPaintValue("icon-opacity",r),x=u.getLayoutValue("icon-rotation-alignment",r);2===x&&(x=1===u.getLayoutValue("symbol-placement",r)?0:1);var y=0===x,D=t.isSDF,g=u.hasDataDrivenIcon,V=3===n,b=o.degToByte(s),z=c.tileTransform.transform,U=u.getPaintValue("icon-translate",r);if(0!==U[0]||0!==U[1]){i.copy(this._viewProjMat,c.tileTransform.transform);var A=U[0],O=U[1],M=0,S=0,P=c.coordRange/512,j=(1<<c.key.level)/Math.pow(2,r)*P;if(1===u.getPaintValue("icon-translate-anchor",r)){var w=-o.C_DEG_TO_RAD*s,I=Math.sin(w),L=Math.cos(w);M=j*(A*L-O*I),S=j*(A*I+O*L)}else M=j*A,S=j*O;this._offsetVector[0]=M,this._offsetVector[1]=S,this._offsetVector[2]=0,i.translate(this._viewProjMat,this._viewProjMat,this._offsetVector),z=this._viewProjMat}y?i.copy(this._extrudeMat,_):i.copy(this._extrudeMat,l);var T=this._getIconVAO(e,c,g);if(T){e.bindVAO(T);var B=this._shaderVariations.getProgram([D,g,V],void 0,void 0,g?this._attributeLocationsDD:this._attributeLocations);if(e.bindProgram(B),D){var F=u.getPaintValue("icon-color",r),C=u.getPaintValue("icon-halo-color",r),E=u.getPaintValue("icon-halo-width",r);B.setUniform4f("u_color",F[0],F[1],F[2],F[3]),B.setUniform4f("u_outlineColor",C[0],C[1],C[2],C[3]),B.setUniform1f("u_outlineSize",E)}if(B.setUniformMatrix4fv("u_transformMatrix",z),B.setUniformMatrix4fv("u_extrudeMatrix",this._extrudeMat),B.setUniform2fv("u_normalized_origin",c.tileTransform.displayCoord),B.setUniform1f("u_depth",u.z),B.setUniform1f("u_mapRotation",b),B.setUniform1f("u_keepUpright",0),B.setUniform1f("u_level",10*r),B.setUniform1f("u_fadeSpeed",10*f.fadeSpeed),B.setUniform1f("u_minfadeLevel",10*f.minfadeLevel),B.setUniform1f("u_maxfadeLevel",10*f.maxfadeLevel),B.setUniform1f("u_fadeChange",10*(r+f.fadeChange)),B.setUniform1i("u_texture",1),B.setUniform1f("u_size",h),B.setUniform1f("u_opacity",p),V){var k=a.int32To4Bytes(t.layerID);B.setUniform4f("u_id",k[0],k[1],k[2],k[3])}t.markerPerPageElementsMap.forEach(function(t,i){v._spritesTextureSize[0]=d.getWidth(i)/4,v._spritesTextureSize[1]=d.getHeight(i)/4,B.setUniform2fv("u_mosaicSize",v._spritesTextureSize),d.bind(e,9729,i,1),e.drawElements(4,t[1],5125,12*t[0])}),e.bindVAO()}},e.prototype._initialize=function(e){if(this._initialized)return!0;var t=new s("icon",["iconVS","iconFS"],[],n,e);return t.addDefine("SDF","SDF",[!0,!0],"SDF"),t.addDefine("DD","DD",[!0,!1],"DD"),t.addDefine("ID","ID",[!0,!0],"ID"),this._shaderVariations=t,this._vertexAttributes={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:16,normalized:!1,divisor:0},{name:"a_vertexOffset",count:2,type:5122,offset:4,stride:16,normalized:!1,divisor:0},{name:"a_tex",count:4,type:5121,offset:8,stride:16,normalized:!1,divisor:0},{name:"a_levelInfo",count:4,type:5121,offset:12,stride:16,normalized:!1,divisor:0}]},this._vertexAttributesDD={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:24,normalized:!1,divisor:0},{name:"a_vertexOffset",count:2,type:5122,offset:4,stride:24,normalized:!1,divisor:0},{name:"a_tex",count:4,type:5121,offset:8,stride:24,normalized:!1,divisor:0},{name:"a_levelInfo",count:4,type:5121,offset:12,stride:24,normalized:!1,divisor:0},{name:"a_color",count:4,type:5121,offset:16,stride:24,normalized:!0,divisor:0},{name:"a_size",count:1,type:5126,offset:20,stride:24,normalized:!1,divisor:0}]},this._initialized=!0,!0},e.prototype._getIconVAO=function(e,t,i){if(i){if(t.iconDDVertexArrayObject)return t.iconDDVertexArrayObject;var r=t.iconDDVertexBuffer,o=t.iconIndexBuffer;return r&&o?(t.iconDDVertexArrayObject=new f(e,this._attributeLocationsDD,this._vertexAttributesDD,{geometry:r},o),t.iconDDVertexArrayObject):null}if(t.iconVertexArrayObject)return t.iconVertexArrayObject;var r=t.iconVertexBuffer,o=t.iconIndexBuffer;return r&&o?(t.iconVertexArrayObject=new f(e,this._attributeLocations,this._vertexAttributes,{geometry:r},o),t.iconVertexArrayObject):null},e}()});