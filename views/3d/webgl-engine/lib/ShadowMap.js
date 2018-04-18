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

define(["./Camera","./Util","./gl-matrix","./glUtil3D","../../../../core/Logger","../../../webgl/Texture","../../../webgl/FramebufferObject","../../../webgl/VertexArrayObject","../../../webgl/BufferObject","./DefaultVertexAttributeLocations","./DefaultVertexBufferLayouts","../../../webgl/Util"],function(e,t,a,r,i,o,n,s,c,d,l,f){var h=a.vec2d,u=a.vec3d,v=a.vec4d,p=a.mat3d,b=a.mat4d,m=a.mat4,g=i.getLogger("esri.views.3d.webgl-engine.lib.ShadowMap");return function(a,i){function w(e,a,r,i,o,n,s,c){h.set2(0,0,ae);var d;for(d=0;d<4;++d)h.add(ae,e[d],ae);for(h.scale(ae,.25),h.set2(0,0,re),d=4;d<8;++d)h.add(re,e[d],re);h.scale(re,.25),h.lerp(e[4],e[5],.5,ie[0]),h.lerp(e[5],e[6],.5,ie[1]),h.lerp(e[6],e[7],.5,ie[2]),h.lerp(e[7],e[4],.5,ie[3]);var l=0,f=h.dist2(ie[0],ae);for(d=1;d<4;++d){var u=h.dist2(ie[d],ae);u<f&&(f=u,l=d)}h.subtract(ie[l],e[l+4],oe);var v=oe[0];oe[0]=-oe[1],oe[1]=v,h.subtract(re,ae,ne),h.lerp(oe,ne,r),h.normalize(oe);var p,b;for(p=b=h.dot(h.subtract(e[0],ae,se),oe),d=1;d<8;++d){var m=h.dot(h.subtract(e[d],ae,se),oe);m<p?p=m:m>b&&(b=m)}h.set(ae,i),h.scale(oe,p-a,se),h.add(i,se,i);var g=-1,w=1,M=0,x=0;for(d=0;d<8;++d){h.subtract(e[d],i,ce),h.normalize(ce);var y=oe[0]*ce[1]-oe[1]*ce[0];y>0?y>g&&(g=y,M=d):y<w&&(w=y,x=d)}t.verify(g>0,"leftArea"),t.verify(w<0,"rightArea"),h.scale(oe,p,de),h.add(de,ae,de),h.scale(oe,b,le),h.add(le,ae,le),fe[0]=-oe[1],fe[1]=oe[0];var T=t.rayRay2D(i,e[x],le,h.add(le,fe,se),1,o),E=t.rayRay2D(i,e[M],le,se,1,n),D=t.rayRay2D(i,e[M],de,h.add(de,fe,se),1,s),A=t.rayRay2D(i,e[x],de,se,1,c);t.verify(T,"rayRay"),t.verify(E,"rayRay"),t.verify(D,"rayRay"),t.verify(A,"rayRay")}function M(e,t){return 3*t+e}function x(e,t){return u.set3(e[t],e[t+3],e[t+6],he),he}function y(e,t,a,r,i){h.scale(h.subtract(a,r,ue),.5),ve[0]=ue[0],ve[1]=ue[1],ve[2]=0,ve[3]=ue[1],ve[4]=-ue[0],ve[5]=0,ve[6]=ue[0]*ue[0]+ue[1]*ue[1],ve[7]=ue[0]*ue[1]-ue[1]*ue[0],ve[8]=1,ve[M(0,2)]=-h.dot(x(ve,0),e),ve[M(1,2)]=-h.dot(x(ve,1),e);var o=h.dot(x(ve,0),a)+ve[M(0,2)],n=h.dot(x(ve,1),a)+ve[M(1,2)],s=h.dot(x(ve,0),r)+ve[M(0,2)],c=h.dot(x(ve,1),r)+ve[M(1,2)];o=-(o+s)/(n+c),ve[M(0,0)]+=ve[M(1,0)]*o,ve[M(0,1)]+=ve[M(1,1)]*o,ve[M(0,2)]+=ve[M(1,2)]*o,o=1/(h.dot(x(ve,0),a)+ve[M(0,2)]),n=1/(h.dot(x(ve,1),a)+ve[M(1,2)]),ve[M(0,0)]*=o,ve[M(0,1)]*=o,ve[M(0,2)]*=o,ve[M(1,0)]*=n,ve[M(1,1)]*=n,ve[M(1,2)]*=n,ve[M(2,0)]=ve[M(1,0)],ve[M(2,1)]=ve[M(1,1)],ve[M(2,2)]=ve[M(1,2)],ve[M(1,2)]+=1,o=h.dot(x(ve,1),t)+ve[M(1,2)],n=h.dot(x(ve,2),t)+ve[M(2,2)],s=h.dot(x(ve,1),a)+ve[M(1,2)],c=h.dot(x(ve,2),a)+ve[M(2,2)],o=-.5*(o/n+s/c),ve[M(1,0)]+=ve[M(2,0)]*o,ve[M(1,1)]+=ve[M(2,1)]*o,ve[M(1,2)]+=ve[M(2,2)]*o,o=h.dot(x(ve,1),t)+ve[M(1,2)],n=h.dot(x(ve,2),t)+ve[M(2,2)],s=-n/o,ve[M(1,0)]*=s,ve[M(1,1)]*=s,ve[M(1,2)]*=s,i[0]=ve[0],i[1]=ve[1],i[2]=0,i[3]=ve[2],i[4]=ve[3],i[5]=ve[4],i[6]=0,i[7]=ve[5],i[8]=0,i[9]=0,i[10]=1,i[11]=0,i[12]=ve[6],i[13]=ve[7],i[14]=0,i[15]=ve[8]}var T,E,D=i,A=i.gl,R=4096,S=r.createEmptyTexture(i),U=1,C=2,j=[0,0,0,0,0];this.dispose=function(){S.dispose(),S=null};var B,F,_,V=function(){this.camera=new e,this.lightMat=b.create()},I=[];for(B=0;B<4;++B)I[B]=new V;this.getIsSupported=function(){return D.capabilities.standardDerivatives},this.setTextureResolution=function(e){R=e},this.getTextureResolution=function(){return R},this.setMaxNumCascades=function(e){C=t.clamp(Math.floor(e),1,4)},this.getMaxNumCascades=function(){return C},this.setEnableState=function(e){e?this.enable():this.disable()},this.getEnableState=function(){return void 0!==T},this.getDepthTexture=function(){return T},this.enable=function(){if(!this.getEnableState()){if(!this.getIsSupported())return void g.warn("Shadow maps are not supported for this browser or hardware");var e={target:A.TEXTURE_2D,pixelFormat:A.RGBA,dataType:A.UNSIGNED_BYTE,wrapMode:A.CLAMP_TO_EDGE,samplingMode:A.NEAREST,flipped:!0,width:R,height:R};T=new o(D,e),E=n.createWithAttachments(D,T,{colorTarget:0,depthStencilTarget:1,width:R,height:R})}},this.disable=function(){this.getEnableState()&&E&&(E.dispose(),E=void 0,T=void 0)};var L=b.create(),P=b.create(),N=v.create(),O=new Array(8);for(B=0;B<8;++B)O[B]=v.create();var G=u.create(),z=u.create(),W=h.create(),H=h.create(),k=h.create(),q=h.create(),Q=h.create(),X=b.create(),Y=u.create();this.prepare=function(e,a,r,o){t.assert(this.getEnableState()),b.multiply(e.projectionMatrix,e.viewMatrix,L);var n=o[0],s=o[1];n<2&&(n=2),s<2&&(s=2),n>=s&&(n=2,s=4),U=Math.min(1+Math.floor(t.logWithBase(s/n,4)),C);for(var c=Math.pow(s/n,1/U),d=0;d<U+1;++d)j[d]=n*Math.pow(c,d);b.inverse(L,P),b.lookAt([0,0,0],[-a[0],-a[1],-a[2]],[0,1,0],X);var l=e.viewMatrix,f=e.projectionMatrix;for(d=0;d<U;++d){var h=I[d],p=-j[d],m=-j[d+1],g=(f[10]*p+f[14])/Math.abs(f[11]*p+f[15]),M=(f[10]*m+f[14])/Math.abs(f[11]*m+f[15]);for(t.assert(g<M),F=0;F<8;++F){var x=F%4==0||F%4==3?-1:1,T=F%4==0||F%4==1?-1:1,S=F<4?g:M;for(v.set4(x,T,S,1,N),b.multiplyVec4(P,N,O[F]),_=0;_<3;++_)O[F][_]/=O[F][3]}for(u.negate(O[0],Y),b.translate(X,Y,h.camera.viewMatrix),F=0;F<8;++F)b.multiplyVec3(h.camera.viewMatrix,O[F]);for(u.set(O[0],G),u.set(O[0],z),F=1;F<8;++F)for(_=0;_<3;++_)G[_]=Math.min(G[_],O[F][_]),z[_]=Math.max(z[_],O[F][_]);G[2]-=200,z[2]+=200,h.camera.near=-z[2],h.camera.far=-G[2];n=1/O[0][3],s=1/O[4][3],t.assert(n<s);var B=n+Math.sqrt(n*s),V=Math.sin(Math.acos(l[2]*a[0]+l[6]*a[1]+l[10]*a[2]));B/=V,w(O,B,V,W,H,k,q,Q),y(W,H,q,Q,h.camera.projectionMatrix),h.camera.projectionMatrix[10]=2/(G[2]-z[2]),h.camera.projectionMatrix[14]=-(G[2]+z[2])/(G[2]-z[2]),b.multiply(h.camera.projectionMatrix,h.camera.viewMatrix,h.lightMat);var J=R/2;h.camera.viewport[0]=d%2==0?0:J,h.camera.viewport[1]=0===Math.floor(d/2)?0:J,h.camera.viewport[2]=J,h.camera.viewport[3]=J}K=void 0,j[U]=100*s,D.bindFramebuffer(E),i.bindTexture(null,7),i.setClearColor(1,1,1,1),i.clear(A.COLOR_BUFFER_BIT|A.DEPTH_BUFFER_BIT),i.setBlendingEnabled(!1)};var J=[];this.getCascades=function(){for(var e=0;e<U;++e)J[e]=I[e];return J.length=U,J},this.finish=function(e){t.assert(this.getEnableState()),D.bindFramebuffer(e)},this.bind=function(e){var t=this.getEnableState();i.bindTexture(t?T:S,7),i.bindProgram(e),e.setUniform1i("depthTex",7),e.setUniform1f("depthHalfPixelSz",t?.5/R:-1),e.setUniform1i("shadowMapNum",U),e.setUniform4f("shadowMapDistance",j[0],j[1],j[2],j[3])},this.bindAll=function(e){for(var t=e.getProgramsUsingUniform("shadowMapDistance"),a=0;a<t.length;a++)this.bind(t[a])};var K,Z=m.create(),$=new Float32Array(64);this.bindView=function(e,t){if(this.getEnableState()){if(!(K&&K[0]===t[0]&&K[1]===t[1]&&K[2]===t[2])){var a;for(K=K||u.create(),u.set(t,K),F=0;F<U;++F)for(m.translate(I[F].lightMat,t,Z),a=0;a<16;++a)$[16*F+a]=Z[a]}e.setUniformMatrix4fv("shadowMapMatrix",$)}};var ee=new Float32Array(16);ee[0]=0,ee[1]=0,ee[2]=0,ee[3]=0,ee[4]=256,ee[5]=0,ee[6]=1,ee[7]=0,ee[8]=0,ee[9]=256,ee[10]=0,ee[11]=1,ee[12]=256,ee[13]=256,ee[14]=1,ee[15]=1;var te=new s(i,d.Default3D,{geometry:l.Pos2Tex},{geometry:c.createVertex(i,A.STATIC_DRAW,ee)});this.drawDebugQuad=function(e){t.assert(this.getEnableState());var r=a.get("showDepth");i.setDepthTestEnabled(!1),i.bindProgram(r),r.setUniformMatrix4fv("proj",e),r.setUniform1i("depthTex",0),i.bindTexture(T,0),i.bindVAO(te),f.assertCompatibleVertexAttributeLocations(te,r),i.drawArrays(A.TRIANGLE_STRIP,0,f.vertexCount(te,"geometry")),i.setDepthTestEnabled(!0)};var ae=h.create(),re=h.create(),ie=[h.create(),h.create(),h.create(),h.create()],oe=h.create(),ne=h.create(),se=h.create(),ce=h.create(),de=h.create(),le=h.create(),fe=h.create(),he=u.create(),ue=h.create(),ve=p.create()}});