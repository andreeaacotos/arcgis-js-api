// COPYRIGHT © 2017 Esri
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
// See http://js.arcgis.com/4.5/esri/copyright.txt for details.

define(["./Camera","./Util","./gl-matrix","../../../../core/Logger","../../../webgl/Texture","../../../webgl/FramebufferObject","../../../webgl/VertexArrayObject","../../../webgl/BufferObject","./DefaultVertexAttributeLocations","./DefaultVertexBufferLayouts","../../../webgl/Util"],function(e,t,a,r,i,o,n,s,c,d,f){var l=a.vec2d,h=a.vec3d,u=a.vec4d,v=a.mat3d,p=a.mat4d,m=a.mat4,g=r.getLogger("esri.views.3d.webgl-engine.lib.ShadowMap"),b=function(a,r){function b(e,a,r,i,o,n,s,c){l.set2(0,0,ne);var d;for(d=0;4>d;++d)l.add(ne,e[d],ne);for(l.scale(ne,.25),l.set2(0,0,se),d=4;8>d;++d)l.add(se,e[d],se);l.scale(se,.25),l.lerp(e[4],e[5],.5,ce[0]),l.lerp(e[5],e[6],.5,ce[1]),l.lerp(e[6],e[7],.5,ce[2]),l.lerp(e[7],e[4],.5,ce[3]);var f=0,h=l.dist2(ce[0],ne);for(d=1;4>d;++d){var u=l.dist2(ce[d],ne);h>u&&(h=u,f=d)}l.subtract(ce[f],e[f+4],de);var v=de[0];de[0]=-de[1],de[1]=v,l.subtract(se,ne,fe),l.lerp(de,fe,r),l.normalize(de);var p,m;for(p=m=l.dot(l.subtract(e[0],ne,le),de),d=1;8>d;++d){var g=l.dot(l.subtract(e[d],ne,le),de);p>g?p=g:g>m&&(m=g)}l.set(ne,i),l.scale(de,p-a,le),l.add(i,le,i);var b=-1,w=1,M=0,x=0;for(d=0;8>d;++d){l.subtract(e[d],i,he),l.normalize(he);var y=de[0]*he[1]-de[1]*he[0];y>0?y>b&&(b=y,M=d):w>y&&(w=y,x=d)}t.verify(b>0,"leftArea"),t.verify(0>w,"rightArea"),l.scale(de,p,ue),l.add(ue,ne,ue),l.scale(de,m,ve),l.add(ve,ne,ve),pe[0]=-de[1],pe[1]=de[0];var T=t.rayRay2D(i,e[x],ve,l.add(ve,pe,le),1,o),E=t.rayRay2D(i,e[M],ve,le,1,n),D=t.rayRay2D(i,e[M],ue,l.add(ue,pe,le),1,s),R=t.rayRay2D(i,e[x],ue,le,1,c);t.verify(T,"rayRay"),t.verify(E,"rayRay"),t.verify(D,"rayRay"),t.verify(R,"rayRay")}function w(e,t){return 3*t+e}function M(e,t){return h.set3(e[t],e[t+3],e[t+6],me),me}function x(e,t,a,r,i){l.scale(l.subtract(a,r,ge),.5),be[0]=ge[0],be[1]=ge[1],be[2]=0,be[3]=ge[1],be[4]=-ge[0],be[5]=0,be[6]=ge[0]*ge[0]+ge[1]*ge[1],be[7]=ge[0]*ge[1]-ge[1]*ge[0],be[8]=1,be[w(0,2)]=-l.dot(M(be,0),e),be[w(1,2)]=-l.dot(M(be,1),e);var o=l.dot(M(be,0),a)+be[w(0,2)],n=l.dot(M(be,1),a)+be[w(1,2)],s=l.dot(M(be,0),r)+be[w(0,2)],c=l.dot(M(be,1),r)+be[w(1,2)];o=-(o+s)/(n+c),be[w(0,0)]+=be[w(1,0)]*o,be[w(0,1)]+=be[w(1,1)]*o,be[w(0,2)]+=be[w(1,2)]*o,o=1/(l.dot(M(be,0),a)+be[w(0,2)]),n=1/(l.dot(M(be,1),a)+be[w(1,2)]),be[w(0,0)]*=o,be[w(0,1)]*=o,be[w(0,2)]*=o,be[w(1,0)]*=n,be[w(1,1)]*=n,be[w(1,2)]*=n,be[w(2,0)]=be[w(1,0)],be[w(2,1)]=be[w(1,1)],be[w(2,2)]=be[w(1,2)],be[w(1,2)]+=1,o=l.dot(M(be,1),t)+be[w(1,2)],n=l.dot(M(be,2),t)+be[w(2,2)],s=l.dot(M(be,1),a)+be[w(1,2)],c=l.dot(M(be,2),a)+be[w(2,2)],o=-.5*(o/n+s/c),be[w(1,0)]+=be[w(2,0)]*o,be[w(1,1)]+=be[w(2,1)]*o,be[w(1,2)]+=be[w(2,2)]*o,o=l.dot(M(be,1),t)+be[w(1,2)],n=l.dot(M(be,2),t)+be[w(2,2)],s=-n/o,be[w(1,0)]*=s,be[w(1,1)]*=s,be[w(1,2)]*=s,i[0]=be[0],i[1]=be[1],i[2]=0,i[3]=be[2],i[4]=be[3],i[5]=be[4],i[6]=0,i[7]=be[5],i[8]=0,i[9]=0,i[10]=1,i[11]=0,i[12]=be[6],i[13]=be[7],i[14]=0,i[15]=be[8]}var y,T,E=r,D=r.gl,R=!1,A=4096,S=new i(E,{target:D.TEXTURE_2D,pixelFormat:D.RGBA,dataType:D.UNSIGNED_BYTE,samplingMode:D.NEAREST,width:4,height:4}),U=1,B=2,_=[0,0,0,0,0];this.dispose=function(){S.dispose(),S=null};var j,C,F,N=function(){this.camera=new e,this.lightMat=p.create()},I=[];for(j=0;4>j;++j)I[j]=new N;this.getIsSupported=function(){return E.extensions.standardDerivatives},this.setTextureResolution=function(e){A=e},this.getTextureResolution=function(){return A},this.setMaxNumCascades=function(e){B=t.clamp(Math.floor(e),1,4)},this.getMaxNumCascades=function(){return B},this.setEnableState=function(e){e?this.enable():this.disable()},this.getEnableState=function(){return void 0!==y},this.getDepthTexture=function(){return y},this.enable=function(){if(!this.getEnableState()){if(!this.getIsSupported())return void g.warn("Shadow maps are not supported for this browser or hardware");var e={target:D.TEXTURE_2D,pixelFormat:D.RGBA,dataType:D.UNSIGNED_BYTE,wrapMode:D.CLAMP_TO_EDGE,samplingMode:D.NEAREST,flipped:!0,width:A,height:A};y=new i(E,e),T=o.createWithAttachments(E,y,{colorTarget:0,depthStencilTarget:1,width:A,height:A})}},this.disable=function(){this.getEnableState()&&T&&(T.dispose(),T=void 0,y=void 0)};var V=p.create(),L=p.create(),P=u.create(),O=new Array(8);for(j=0;8>j;++j)O[j]=u.create();var G=h.create(),z=h.create(),W=l.create(),H=l.create(),X=l.create(),Y=l.create(),k=l.create(),q=p.create(),Q=h.create();this.prepare=function(e,a,i,o){t.assert(this.getEnableState()),p.multiply(e.projectionMatrix,e.viewMatrix,V);var n=o[0],s=o[1];2>n&&(n=2),2>s&&(s=2),n>=s&&(n=2,s=4),U=Math.min(1+Math.floor(t.logWithBase(s/n,4)),B);for(var c=Math.pow(s/n,1/U),d=0;U+1>d;++d)_[d]=n*Math.pow(c,d);p.inverse(V,L),p.lookAt([0,0,0],[-a[0],-a[1],-a[2]],[0,1,0],q);var f=e.viewMatrix,l=e.projectionMatrix;for(d=0;U>d;++d){var v=I[d],m=-_[d],g=-_[d+1],w=(l[10]*m+l[14])/Math.abs(l[11]*m+l[15]),M=(l[10]*g+l[14])/Math.abs(l[11]*g+l[15]);for(t.assert(M>w),C=0;8>C;++C){var y=C%4===0||C%4==3?-1:1,R=C%4===0||C%4==1?-1:1,S=4>C?w:M;for(u.set4(y,R,S,1,P),p.multiplyVec4(L,P,O[C]),F=0;3>F;++F)O[C][F]/=O[C][3]}for(h.negate(O[0],Q),p.translate(q,Q,v.camera.viewMatrix),C=0;8>C;++C)p.multiplyVec3(v.camera.viewMatrix,O[C]);for(h.set(O[0],G),h.set(O[0],z),C=1;8>C;++C)for(F=0;3>F;++F)G[F]=Math.min(G[F],O[C][F]),z[F]=Math.max(z[F],O[C][F]);G[2]-=200,z[2]+=200,v.camera.near=-z[2],v.camera.far=-G[2];var j=!0;if(j){n=1/O[0][3],s=1/O[4][3],t.assert(s>n);var N=n+Math.sqrt(n*s),J=Math.sin(Math.acos(f[2]*a[0]+f[6]*a[1]+f[10]*a[2]));N/=J,b(O,N,J,W,H,X,Y,k),x(W,H,Y,k,v.camera.projectionMatrix),v.camera.projectionMatrix[10]=2/(G[2]-z[2]),v.camera.projectionMatrix[14]=-(G[2]+z[2])/(G[2]-z[2])}else p.ortho(G[0],z[0],G[1],z[1],v.camera.near,v.camera.far,v.camera.projectionMatrix);p.multiply(v.camera.projectionMatrix,v.camera.viewMatrix,v.lightMat);var Z=A/2;v.camera.viewport[0]=d%2===0?0:Z,v.camera.viewport[1]=0===Math.floor(d/2)?0:Z,v.camera.viewport[2]=Z,v.camera.viewport[3]=Z}K=void 0,_[U]=100*s,E.bindFramebuffer(T),r.bindTexture(null,7),r.setClearColor(1,1,1,1),r.clear(D.COLOR_BUFFER_BIT|D.DEPTH_BUFFER_BIT),r.setBlendingEnabled(!1)};var J=[];this.getCascades=function(){for(var e=0;U>e;++e)J[e]=I[e];return J.length=U,J},this.finish=function(e){t.assert(this.getEnableState()),E.bindFramebuffer(e),R&&y.generateMipmap()},this.bind=function(e){var t=this.getEnableState();r.bindTexture(t?y:S,7),r.bindProgram(e),e.setUniform1i("depthTex",7),e.setUniform1f("depthHalfPixelSz",t?.5/A:-1),e.setUniform1i("shadowMapNum",U),e.setUniform4f("shadowMapDistance",_[0],_[1],_[2],_[3])},this.bindAll=function(e){for(var t=e.getProgramsUsingUniform("shadowMapDistance"),a=0;a<t.length;a++)this.bind(t[a])};var K,Z=m.create(),$=new Float32Array(64);this.bindView=function(e,t){if(this.getEnableState()){var a=K&&K[0]===t[0]&&K[1]===t[1]&&K[2]===t[2];if(!a){var r;for(K=K||h.create(),h.set(t,K),C=0;U>C;++C)for(m.translate(I[C].lightMat,t,Z),r=0;16>r;++r)$[16*C+r]=Z[r]}e.setUniformMatrix4fv("shadowMapMatrix",$)}};var ee=0,te=0,ae=256,re=256,ie=new Float32Array(16);ie[0]=ee,ie[1]=te,ie[2]=0,ie[3]=0,ie[4]=ee+ae,ie[5]=te,ie[6]=1,ie[7]=0,ie[8]=ee,ie[9]=te+re,ie[10]=0,ie[11]=1,ie[12]=ee+ae,ie[13]=te+re,ie[14]=1,ie[15]=1;var oe=new n(r,c.Default3D,{geometry:d.Pos2Tex},{geometry:s.createVertex(r,D.STATIC_DRAW,ie)});this.drawDebugQuad=function(e){t.assert(this.getEnableState());var i=a.get("showDepth");r.setDepthTestEnabled(!1),r.bindProgram(i),i.setUniformMatrix4fv("proj",e),i.setUniform1i("depthTex",0),r.bindTexture(y,0),r.bindVAO(oe),f.assertCompatibleVertexAttributeLocations(oe,i),r.drawArrays(D.TRIANGLE_STRIP,0,f.vertexCount(oe,"geometry")),r.setDepthTestEnabled(!0)};var ne=l.create(),se=l.create(),ce=[l.create(),l.create(),l.create(),l.create()],de=l.create(),fe=l.create(),le=l.create(),he=l.create(),ue=l.create(),ve=l.create(),pe=l.create(),me=h.create(),ge=l.create(),be=v.create()};return b});