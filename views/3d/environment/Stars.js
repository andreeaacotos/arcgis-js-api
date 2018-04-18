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

define(["dojo/text!./materials/StarMaterial.xml","require","../../../request","../../../core/watchUtils","../../../core/promiseUtils","../../../core/Error","../../../core/Logger","../lib/glMatrix","../support/ExternalRenderer","../webgl-engine/lib/GeometryRenderer","../webgl-engine/lib/Util","../webgl-engine/materials/internal/MaterialUtil","../webgl-engine/lib/RenderPass","../webgl-engine/lib/RenderSlot","../../webgl/Program","../webgl-engine/lib/DefaultVertexAttributeLocations","../../webgl/Util"],function(t,e,r,a,i,n,s,o,f,l,d,u,h,c,m,_,g){var b=o.mat4d,v=o.mat3d,S=d.VertexAttrConstants,p=["9bb2ff","9eb5ff","aabfff","bbccff","ccd8ff ","dae2ff","e4e9ff","eeefff","f8f6ff","fff9fb","fff5ef","fff1e5","ffeddb","ffe9d2","ffe6ca","ffe3c3","ffe0bb","ffddb4","ffdaad","ffd6a5","ffd29c","ffcc8f","ffc178","ffa94b","ff7b00"],y=s.getLogger("esri.views.3d.environment.Stars"),w=v.toMat4(v.createFrom(1,0,0,0,.9174771405229186,.39778850739794974,0,-.39778850739794974,.9174771405229186)),D=v.toMat4(v.createFrom(1,0,0,0,.9174771405229186,-.39778850739794974,0,.39778850739794974,.9174771405229186)),A=null;return f.createSubclass({properties:{view:{},numBinaryFloats:{value:2},numBinaryUInt8:{value:1},bytesPerStar:{value:9},needsRender:{value:!1},slot:{value:c.BACKGROUND,set:function(t){this.needsRender=!0,this._set("slot",t)}}},constructor:function(){this._renderData={model:b.identity()},this.slot=c.BACKGROUND,this._vertexBufferLayout=[{name:"position",count:3,type:5126,offset:0,stride:20,normalized:!1},{name:"color",count:4,type:5121,offset:12,stride:20,normalized:!1},{name:"size",count:1,type:5126,offset:16,stride:20,normalized:!1}]},initialize:function(){this._loadDataPromise=this._loadBrightStarCatalogue(),this.addResolvingPromise(this._loadDataPromise)},destroy:function(){this._loadDataPromise.isFulfilled()||this._loadDataPromise.cancel("Atmosphere has been removed."),this._dateHandle&&(this._dateHandle.remove(),this._dateHandle=null),this._program&&(this._program.dispose(),this._program=null)},setup:function(e){this._numStars=this._starData.byteLength/this.bytesPerStar;var r=new Float32Array(this._starData,0,this._numStars*this.numBinaryFloats),i=new Uint8Array(this._starData,this._numStars*this.numBinaryFloats*4,this._numStars*this.numBinaryUInt8),n=this._createStarGeometryData(r,i);this._renderer=new l(n,this._vertexBufferLayout,this._fillInterleaved,e.rctx),this._renderer.enablePointRendering(!0),this._dateHandle=a.init(this,"view.environment.lighting.date",this._update.bind(this)),e.shaderSnippets.vertexShaderStar||e.shaderSnippets._parse(t),this._program=new m(e.rctx,e.shaderSnippets.vertexShaderStar,e.shaderSnippets.fragmentShaderStar,_.Default3D)},render:function(t){if(t.slot!==this.slot||t.pass!==h.MATERIAL)return!1;var e=this.renderContext.rctx,r=e.gl,a=this._program;return e.bindProgram(a),a.setUniformMatrix4fv("view",t.camera.viewMatrix),a.setUniformMatrix4fv("proj",t.camera.projectionMatrix),a.setUniform4fv("viewport",t.camera.fullViewport),a.setUniformMatrix4fv("model",this._renderData.model),e.setDepthTestEnabled(!0),e.setDepthFunction(r.LEQUAL),e.setBlendingEnabled(!0),e.setBlendFunctionSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA),e.setDepthWriteEnabled(!1),this._renderer.render(a),e.setBlendingEnabled(!1),e.setDepthWriteEnabled(!0),e.setDepthFunction(r.LESS),!0},_fillInterleaved:function(t,e,r,a,i,n,s){for(var o=g.getStride(i),f=o/4,l=u.fill,d=t.indices[S.POSITION],h=t.vertexAttr[S.POSITION].data,c=s+g.findAttribute(i,"position").offset/4,m=0;m<d.length;++m){var _=3*d[m];l(h,_,n,c,e,3),c+=f}var b=t.indices[S.COLOR],v=t.vertexAttr[S.COLOR].data;c=s+g.findAttribute(i,"color").offset;var p=new Uint8Array(n.buffer);for(m=0;m<b.length;++m)_=4*b[m],l(v,_,p,c,null,4),c+=o;var y=t.indices[S.SIZE],w=t.vertexAttr[S.SIZE].data;for(c=s+g.findAttribute(i,"size").offset/4,m=0;m<y.length;++m){var D=w[y[m]];n[c]=D,c+=f}},_computeDayDuration:function(t){var e=t,r=new Date(t.getFullYear(),0,1,11,58,56);return(e-r)/(new Date(t.getFullYear()+1,0,1,11,58,55)-r)},_update:function(t){if(t){var e=t.getHours()/12,r=t.getMinutes()/60*(2/24),a=t.getSeconds()/60*(2/1440),i=(e+r+a-.9972222)%2,n=2*this._computeDayDuration(t),s=b.create(D);b.rotateZ(s,-n*Math.PI),b.multiply(w,s,s),b.rotateZ(s,-i*Math.PI),this._renderData.model=s,this.needsRender=!0}},_hexToRGB:function(t){return[parseInt(t.substring(0,2),16),parseInt(t.substring(2,4),16),parseInt(t.substring(4,6),16)]},_unpackUint8Attributes:function(t){return t>=192?[2.9,t-192]:t>=160?[2.5,t-160]:t>=128?[2,t-128]:t>=96?[1.5,t-96]:t>=64?[1,t-64]:t>=32?[.7,t-32]:[.4,t]},_createStarGeometryData:function(t,e){for(var r=new Float32Array(3*this._numStars),a=new Uint8Array(4*this._numStars),i=new Float32Array(this._numStars),n=new Uint32Array(this._numStars),s=0;s<this._numStars;s++){var o=2*s,f=3*s,l=4*s,d=t[o+0],u=t[o+1];r[f+0]=-Math.cos(d)*Math.sin(u),r[f+1]=-Math.sin(d)*Math.sin(u),r[f+2]=-Math.cos(u);var h=this._unpackUint8Attributes(e[s]),c=this._hexToRGB(p[h[1]]);a[l+0]=255*c[0],a[l+1]=255*c[1],a[l+2]=255*c[2],a[l+3]=255,i[s]=h[0],n[s]=s}var m={};m[S.POSITION]=n,m[S.NORMAL]=n,m[S.UV0]=n,m[S.COLOR]=n,m[S.SIZE]=n;var _={};return _[S.POSITION]={size:3,data:r},_[S.COLOR]={size:4,data:a},_[S.SIZE]={size:1,data:i},{indices:m,vertexAttr:_}},_verifyStartData:function(t){if(!t)throw new n("stars:no-data-received","Failed to create stars because star catalogue is missing");var e=t.byteLength/this.bytesPerStar;if(e%1!=0||e>5e4||e<5e3)throw new n("stars:invalid-data","Failed to create stars because star catalogue data is invalid")},_loadBrightStarCatalogue:function(){return A?(this._starData=A,i.resolve()):r(e.toUrl("./resources/stars.wsv"),{responseType:"array-buffer",failOk:!0}).then(function(t){var e=t.data;this._verifyStartData(e),A=e,this._starData=e}.bind(this)).catch(function(t){throw y.error("loadBrightStarCatalogue",t.message),t})}})});