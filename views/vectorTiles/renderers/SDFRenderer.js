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

define(["require","exports","dojo/has","../../../core/libs/gl-matrix/mat4","../../../core/libs/gl-matrix/vec3","../../../core/libs/gl-matrix/vec4","../GeometryUtils","./rendererUtils","./vtShaderSnippets","../../webgl/ShaderVariations","../../webgl/VertexArrayObject"],function(e,t,r,i,a,o,s,n,f,l,_){return function(){function e(){this._attributeLocations={a_pos:0,a_vertexOffset:1,a_tex:2,a_levelInfo:3},this._attributeLocationsDD={a_pos:0,a_vertexOffset:1,a_tex:2,a_levelInfo:3,a_color:4,a_size:5},this._initialized=!1,this._viewProjMat=i.create(),this._offsetVector=a.create(),this._extrudeMat=i.create(),this._haloColor=o.create(),this._sdfColor=o.create(),this._scaleVec=a.create()}return e.prototype.dispose=function(){},e.prototype.render=function(e,t,a,o,f,l,_,u,d,h,c,m,x){var v=this;if(!r("esri-vector-tiles-avoid-text")){this._initialized||this._initialize(e);var y=u.getLayoutValue("text-size",a),p=s.degToByte(f),g=u.getLayoutValue("text-rotation-alignment",a);2===g&&(g=1===u.getLayoutValue("symbol-placement",a)?0:1);var D=0===g,V=u.getLayoutValue("text-keep-upright",a)&&D,b=3===o,U=.8*3/m,z=x*u.getPaintValue("text-opacity",a);this._glyphTextureSize||(this._glyphTextureSize=new Float32Array([d.width/4,d.height/4]));var A=_.tileTransform.transform,M=u.getPaintValue("text-translate",a);if(0!==M[0]||0!==M[1]){i.copy(this._viewProjMat,_.tileTransform.transform);var O=M[0],w=M[1],C=0,P=0,j=_.coordRange/512,L=(1<<_.key.level)/Math.pow(2,a)*j;if(1===u.getPaintValue("text-translate-anchor",a)){var S=-s.C_DEG_TO_RAD*f,I=Math.sin(S),T=Math.cos(S);C=L*(O*T-w*I),P=L*(O*I+w*T)}else C=L*O,P=L*w;this._offsetVector[0]=C,this._offsetVector[1]=P,this._offsetVector[2]=0,i.translate(this._viewProjMat,this._viewProjMat,this._offsetVector),A=this._viewProjMat}D?i.copy(this._extrudeMat,h):i.copy(this._extrudeMat,c),this._scaleVec[0]=1/24,this._scaleVec[1]=1/24,this._scaleVec[2]=1,i.scale(this._extrudeMat,this._extrudeMat,this._scaleVec);var B=u.hasDataDrivenText,E=this._getSDFVAO(e,_,B);if(E){e.bindVAO(E);var F=this._shaderVariations.getProgram([B,b],void 0,void 0,B?this._attributeLocationsDD:this._attributeLocations);if(e.bindProgram(F),F.setUniformMatrix4fv("u_transformMatrix",A),F.setUniformMatrix4fv("u_extrudeMatrix",this._extrudeMat),F.setUniform2fv("u_normalized_origin",_.tileTransform.displayCoord),F.setUniform1f("u_depth",u.z+1/65536),F.setUniform2fv("u_mosaicSize",this._glyphTextureSize),F.setUniform1f("u_mapRotation",p),F.setUniform1f("u_keepUpright",V?1:0),F.setUniform1f("u_level",10*a),F.setUniform1f("u_fadeSpeed",10*l.fadeSpeed),F.setUniform1f("u_minfadeLevel",10*l.minfadeLevel),F.setUniform1f("u_maxfadeLevel",10*l.maxfadeLevel),F.setUniform1f("u_fadeChange",10*(a+l.fadeChange)),F.setUniform1f("u_opacity",z),F.setUniform1i("u_texture",0),F.setUniform1f("u_size",y),F.setUniform1f("u_antialiasingWidth",U),b){var k=n.int32To4Bytes(t.layerID);F.setUniform4f("u_id",k[0],k[1],k[2],k[3])}t.glyphPerPageElementsMap.forEach(function(t,r){d.bind(e,9729,r,0);var i=u.getPaintValue("text-halo-color",a),o=u.getPaintValue("text-halo-width",a);if(i[3]>0&&o>0){var s=i[3]*z;v._haloColor[0]=s*i[0],v._haloColor[1]=s*i[1],v._haloColor[2]=s*i[2],v._haloColor[3]=s;var n=3*u.getPaintValue("text-halo-blur",a),f=3*o;F.setUniform4fv("u_color",v._haloColor),F.setUniform1f("u_halo",1),F.setUniform1f("u_edgeDistance",f),F.setUniform1f("u_edgeBlur",n),e.drawElements(4,t[1],5125,12*t[0])}var l=u.getPaintValue("text-color",a);if(l[3]>0){var _=l[3]*z;v._sdfColor[0]=_*l[0],v._sdfColor[1]=_*l[1],v._sdfColor[2]=_*l[2],v._sdfColor[3]=_,F.setUniform4fv("u_color",v._sdfColor),F.setUniform1f("u_halo",0),F.setUniform1f("u_edgeDistance",0),F.setUniform1f("u_edgeBlur",0),e.drawElements(4,t[1],5125,12*t[0])}}),e.bindVAO()}}},e.prototype._initialize=function(e){if(this._initialized)return!0;var t=new l("text",["textVS","textFS"],[],f,e);return t.addDefine("DD","DD",[!0,!1],"DD"),t.addDefine("ID","ID",[!0,!0],"ID"),this._shaderVariations=t,this._vertexAttributes={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:16,normalized:!1,divisor:0},{name:"a_vertexOffset",count:2,type:5122,offset:4,stride:16,normalized:!1,divisor:0},{name:"a_tex",count:4,type:5121,offset:8,stride:16,normalized:!1,divisor:0},{name:"a_levelInfo",count:4,type:5121,offset:12,stride:16,normalized:!1,divisor:0}]},this._vertexAttributesDD={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:24,normalized:!1,divisor:0},{name:"a_vertexOffset",count:2,type:5122,offset:4,stride:24,normalized:!1,divisor:0},{name:"a_tex",count:4,type:5121,offset:8,stride:24,normalized:!1,divisor:0},{name:"a_levelInfo",count:4,type:5121,offset:12,stride:24,normalized:!1,divisor:0},{name:"a_color",count:4,type:5121,offset:16,stride:24,normalized:!0,divisor:0},{name:"a_size",count:1,type:5126,offset:20,stride:24,normalized:!1,divisor:0}]},this._initialized=!0,!0},e.prototype._getSDFVAO=function(e,t,r){if(r){if(t.textDDVertexArrayObject)return t.textDDVertexArrayObject;var i=t.textDDVertexBuffer,a=t.textIndexBuffer;return i&&a?(t.textDDVertexArrayObject=new _(e,this._attributeLocationsDD,this._vertexAttributesDD,{geometry:i},a),t.textDDVertexArrayObject):null}if(t.textVertexArrayObject)return t.textVertexArrayObject;var i=t.textVertexBuffer,a=t.textIndexBuffer;return i&&a?(t.textVertexArrayObject=new _(e,this._attributeLocations,this._vertexAttributes,{geometry:i},a),t.textVertexArrayObject):null},e}()});