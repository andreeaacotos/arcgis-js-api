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

define(["require","exports","../../core/tsSupport/extendsHelper","../../core/ObjectPool","../../core/libs/gl-matrix/mat4","../../core/libs/gl-matrix/vec2","../../geometry/support/spatialReferenceUtils","../2d/engine/DisplayObject","../2d/tiling/TileKey","./RenderBucket","../webgl/BufferObject"],function(e,t,r,i,s,a,f,l,n,u,h){return function(e){function t(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];var i=e.call(this)||this;return i._renderBuckets=[],i._vectorTileData=null,i._symbolUpdateData=null,i.status=5,i.coords=[0,0],i.bounds=[0,0,0,0],i.tileTransform={transform:Float32Array[16],displayCoord:Float32Array[2]},i.stencilData={mask:0,reference:0},i.status=0,i.tileTransform.transform=s.create(),i.tileTransform.displayCoord=a.create(),t.length>0&&(f=i.acquire).call.apply(f,[i].concat(t)),i;var f}return r(t,e),t.prototype.reset=function(){n.pool.release(this.key),this.key=null,this.refKey=null,this.coords[0]=0,this.coords[1]=0,this.bounds[0]=0,this.bounds[1]=0,this.bounds[2]=0,this.bounds[3]=0,this.width=0,this.height=0,this.resolution=null,this.rotation=0,this._vectorTileData=null,this.styleLayers=null,this.client=null,this.id=null,this.tileTransform.transform.fill(0),this.tileTransform.displayCoord.fill(0),this.stencilData.mask=0,this.stencilData.reference=0,this._renderBuckets.length=0,this._symbolUpdateData=null,this.status=0},t.prototype.acquire=function(e,t,r,i,s){this.key=e,this.refKey=t;var a=r.lodAt(e.level).resolution,l=r.size[0]*a,n=r.origin,u=e.col*l,h=e.row*l,o=r.spatialReference,c=o&&(o._isWrappable?o._isWrappable():o.isWrappable),D=0;if(c){var x=f.getInfo(o);D=x.valid[1]-x.valid[0]}var d=e.world*D,B=n.x+u+d,V=n.y-h,b=B+l,p=V-l;this.coords[0]=B,this.coords[1]=V,this.bounds[0]=B,this.bounds[1]=V,this.bounds[2]=b,this.bounds[3]=p,this.widthInPixels=r.size[1],this.coordRange=4096,this.resolution=a,this.rotation=s,this.styleLayers=i,this.id=e.id,this.status=1},t.prototype.setData=function(e,t){this._vectorTileData=e,this.client=t,this.status=3},t.prototype.updateSymbolData=function(e){e&&(this._symbolUpdateData=e,this.requestRender())},t.prototype.dispose=function(){this.fillVertexArrayObject&&(this.fillVertexArrayObject.dispose(),this.fillVertexArrayObject=null),this.fillDDVertexArrayObject&&(this.fillDDVertexArrayObject.dispose(),this.fillDDVertexArrayObject=null),this.outlineVertexArrayObject&&(this.outlineVertexArrayObject.dispose(),this.outlineVertexArrayObject=null),this.outlineDDVertexArrayObject&&(this.outlineDDVertexArrayObject.dispose(),this.outlineDDVertexArrayObject=null),this.lineVertexArrayObject&&(this.lineVertexArrayObject.dispose(),this.lineVertexArrayObject=null),this.lineDDVertexArrayObject&&(this.lineDDVertexArrayObject.dispose(),this.lineDDVertexArrayObject=null),this.iconVertexArrayObject&&(this.iconVertexArrayObject.dispose(),this.iconVertexArrayObject=null),this.iconDDVertexArrayObject&&(this.iconDDVertexArrayObject.dispose(),this.iconDDVertexArrayObject=null),this.textVertexArrayObject&&(this.textVertexArrayObject.dispose(),this.textVertexArrayObject=null),this.textDDVertexArrayObject&&(this.textDDVertexArrayObject.dispose(),this.textDDVertexArrayObject=null),this.circleVertexArrayObject&&(this.circleVertexArrayObject.dispose(),this.circleVertexArrayObject=null),this.fillVertexBuffer&&(this.fillVertexBuffer.dispose(),this.fillVertexBuffer=null),this.fillDDVertexBuffer&&(this.fillDDVertexBuffer.dispose(),this.fillDDVertexBuffer=null),this.fillIndexBuffer&&(this.fillIndexBuffer.dispose(),this.fillIndexBuffer=null),this.outlineVertexBuffer&&(this.outlineVertexBuffer.dispose(),this.outlineVertexBuffer=null),this.outlineDDVertexBuffer&&(this.outlineDDVertexBuffer.dispose(),this.outlineDDVertexBuffer=null),this.outlineIndexBuffer&&(this.outlineIndexBuffer.dispose(),this.outlineIndexBuffer=null),this.lineVertexBuffer&&(this.lineVertexBuffer.dispose(),this.lineVertexBuffer=null),this.lineDDVertexBuffer&&(this.lineDDVertexBuffer.dispose(),this.lineDDVertexBuffer=null),this.lineIndexBuffer&&(this.lineIndexBuffer.dispose(),this.lineIndexBuffer=null),this.iconVertexBuffer&&(this.iconVertexBuffer.dispose(),this.iconVertexBuffer=null),this.iconDDVertexBuffer&&(this.iconDDVertexBuffer.dispose(),this.iconDDVertexBuffer=null),this.iconIndexBuffer&&(this.iconIndexBuffer.dispose(),this.iconIndexBuffer=null),this.textVertexBuffer&&(this.textVertexBuffer.dispose(),this.textVertexBuffer=null),this.textDDVertexBuffer&&(this.textDDVertexBuffer.dispose(),this.textDDVertexBuffer=null),this.textIndexBuffer&&(this.textIndexBuffer.dispose(),this.textIndexBuffer=null),this.circleVertexBuffer&&(this.circleVertexBuffer.dispose(),this.circleVertexBuffer=null),this.circleIndexBuffer&&(this.circleIndexBuffer.dispose(),this.circleIndexBuffer=null),this.texture&&(this.texture.dispose(),this.texture=null),this._renderBuckets.length=0,this.status=7},t.prototype.getCpuMemoryUsage=function(){return null!=this._vectorTileData&&this._vectorTileData.bufferData?this._vectorTileData.bufferData.reduce(function(e,t){return e+t.byteLength},0)+this._vectorTileData.bufferDataInfo.byteLength+this._vectorTileData.bucketDataInfo.byteLength:0},t.prototype.getGpuMemoryUsage=function(){var e=0;return this.fillVertexBuffer&&(e+=this.fillVertexBuffer.size),this.fillDDVertexBuffer&&(e+=this.fillDDVertexBuffer.size),this.fillIndexBuffer&&(e+=this.fillIndexBuffer.size),this.outlineVertexBuffer&&(e+=this.outlineVertexBuffer.size),this.outlineDDVertexBuffer&&(e+=this.outlineDDVertexBuffer.size),this.outlineIndexBuffer&&(e+=this.outlineIndexBuffer.size),this.lineVertexBuffer&&(e+=this.lineVertexBuffer.size),this.lineDDVertexBuffer&&(e+=this.lineDDVertexBuffer.size),this.lineIndexBuffer&&(e+=this.lineIndexBuffer.size),this.iconVertexBuffer&&(e+=this.iconVertexBuffer.size),this.iconDDVertexBuffer&&(e+=this.iconDDVertexBuffer.size),this.iconIndexBuffer&&(e+=this.iconIndexBuffer.size),this.textVertexBuffer&&(e+=this.textVertexBuffer.size),this.textDDVertexBuffer&&(e+=this.textDDVertexBuffer.size),this.textIndexBuffer&&(e+=this.textIndexBuffer.size),this.circleVertexBuffer&&(e+=this.circleVertexBuffer.size),this.circleIndexBuffer&&(e+=this.circleIndexBuffer.size),this.texture&&(e+=this.texture.descriptor.width*this.texture.descriptor.height*4),e},t.prototype.attach=function(e){if(4===this.status)return!0;if(this.status=3,!this._vectorTileData||!this._vectorTileData.bufferDataInfo)return this.status=4,!0;if(0===this._renderBuckets.length)for(var t=new Uint32Array(this._vectorTileData.bucketDataInfo),r=t.length,i=0;i<r;){var s=t[i],a=t[i+1];if(0===a){var f=new u.BackgroundRenderBucket;f.layerID=s,this._renderBuckets.push(f),i+=2}else if(1===a){var l=new u.FillRenderBucket;l.layerID=s,l.triangleElementStart=t[i+2],l.triangleElementCount=t[i+3],l.outlineElementStart=t[i+4],l.outlineElementCount=t[i+5],this._renderBuckets.push(l),i+=6}else if(2===a){var n=new u.LineRenderBucket;n.layerID=s,n.triangleElementStart=t[i+2],n.triangleElementCount=t[i+3],this._renderBuckets.push(n),i+=4}else if(3===a){var o=new u.SymbolRenderBucket;o.layerID=s,o.isSDF=0!==t[i+2];var c=i+3,D=t[c];if(c++,D>0)for(var x=void 0,d=void 0,B=void 0,V=0;V<D;V++)x=t[c],d=t[c+1],B=t[c+2],o.markerPerPageElementsMap.set(x,[d,B]),c+=3;var b=c,p=t[b];if(b++,p>0)for(var x=void 0,d=void 0,B=void 0,V=0;V<p;V++)x=t[b],d=t[b+1],B=t[b+2],o.glyphPerPageElementsMap.set(x,[d,B]),b+=3;this._renderBuckets.push(o),i+=5+3*D+3*p}else if(4===a){var y=new u.CircleRenderBucket;y.layerID=s,y.triangleElementStart=t[i+2],y.triangleElementCount=t[i+3],this._renderBuckets.push(y),i+=4}else console.error("Bad bucket type!")}for(var v=e.context,_=new Uint32Array(this._vectorTileData.bufferDataInfo),I=_.length,k=0,m=0;m<I;m+=2,k++){var T=_[m];if(!(_[m+1]<=0||0===this._vectorTileData.bufferData[k].byteLength))switch(T){case 1:this.fillVertexBuffer?this.fillVertexBuffer.setData(this._vectorTileData.bufferData[k]):this.fillVertexBuffer=h.createVertex(v,35044,this._vectorTileData.bufferData[k]);break;case 2:this.fillDDVertexBuffer?this.fillDDVertexBuffer.setData(this._vectorTileData.bufferData[k]):this.fillDDVertexBuffer=h.createVertex(v,35044,this._vectorTileData.bufferData[k]);break;case 3:this.fillIndexBuffer?this.fillIndexBuffer.setData(this._vectorTileData.bufferData[k]):this.fillIndexBuffer=h.createIndex(v,35044,this._vectorTileData.bufferData[k]);break;case 4:this.outlineVertexBuffer?this.outlineVertexBuffer.setData(this._vectorTileData.bufferData[k]):this.outlineVertexBuffer=h.createVertex(v,35044,this._vectorTileData.bufferData[k]);break;case 5:this.outlineDDVertexBuffer?this.outlineDDVertexBuffer.setData(this._vectorTileData.bufferData[k]):this.outlineDDVertexBuffer=h.createVertex(v,35044,this._vectorTileData.bufferData[k]);break;case 6:this.outlineIndexBuffer?this.outlineIndexBuffer.setData(this._vectorTileData.bufferData[k]):this.outlineIndexBuffer=h.createIndex(v,35044,this._vectorTileData.bufferData[k]);break;case 7:this.lineVertexBuffer?this.lineVertexBuffer.setData(this._vectorTileData.bufferData[k]):this.lineVertexBuffer=h.createVertex(v,35044,this._vectorTileData.bufferData[k]);break;case 8:this.lineDDVertexBuffer?this.lineDDVertexBuffer.setData(this._vectorTileData.bufferData[k]):this.lineDDVertexBuffer=h.createVertex(v,35044,this._vectorTileData.bufferData[k]);break;case 9:this.lineIndexBuffer?this.lineIndexBuffer.setData(this._vectorTileData.bufferData[k]):this.lineIndexBuffer=h.createIndex(v,35044,this._vectorTileData.bufferData[k]);break;case 10:this.iconVertexBuffer?this.iconVertexBuffer.setData(this._vectorTileData.bufferData[k]):this.iconVertexBuffer=h.createVertex(v,35044,this._vectorTileData.bufferData[k]);break;case 11:this.iconDDVertexBuffer?this.iconDDVertexBuffer.setData(this._vectorTileData.bufferData[k]):this.iconDDVertexBuffer=h.createVertex(v,35044,this._vectorTileData.bufferData[k]);break;case 12:this.iconIndexBuffer?this.iconIndexBuffer.setData(this._vectorTileData.bufferData[k]):this.iconIndexBuffer=h.createIndex(v,35044,this._vectorTileData.bufferData[k]);break;case 13:this.textVertexBuffer?this.textVertexBuffer.setData(this._vectorTileData.bufferData[k]):this.textVertexBuffer=h.createVertex(v,35044,this._vectorTileData.bufferData[k]);break;case 14:this.textDDVertexBuffer?this.textDDVertexBuffer.setData(this._vectorTileData.bufferData[k]):this.textDDVertexBuffer=h.createVertex(v,35044,this._vectorTileData.bufferData[k]);break;case 15:this.textIndexBuffer?this.textIndexBuffer.setData(this._vectorTileData.bufferData[k]):this.textIndexBuffer=h.createIndex(v,35044,this._vectorTileData.bufferData[k]);break;case 16:this.circleVertexBuffer?this.circleVertexBuffer.setData(this._vectorTileData.bufferData[k]):this.circleVertexBuffer=h.createVertex(v,35044,this._vectorTileData.bufferData[k]);break;case 17:this.circleIndexBuffer?this.circleIndexBuffer.setData(this._vectorTileData.bufferData[k]):this.circleIndexBuffer=h.createIndex(v,35044,this._vectorTileData.bufferData[k])}}return this._vectorTileData=null,this.status=4,!0},t.prototype.detach=function(t){this.client&&6!==this.status&&7!==this.status&&this.client.invoke("destructTileData",this.id),this.dispose(),e.prototype.detach.call(this,t)},t.prototype.doRender=function(e){if(this.visible&&4===this.status){var t=e.context,r=e.renderer;if(t&&r){var i=e.drawphase;this._symbolUpdateData&&this._updateSymbolData(e),t.setStencilFunction(514,this.stencilData.reference,this.stencilData.mask);var s=this.styleLayers,a=void 0!==e.layerOpacity?e.layerOpacity:1;if(0!==a){var f,l=this._renderBuckets.length,n=0;if(0===i)for(n=l-1;n>=0;n--)f=this._renderBuckets[n],3!==f.type&&f.hasData()&&r.renderBucket(t,f,e.displayLevel,e.requiredLevel,i,this,s.layers[f.layerID],a);else for(n=0;n<l;n++)f=this._renderBuckets[n],f.hasData()&&r.renderBucket(t,f,e.displayLevel,e.requiredLevel,i,this,s.layers[f.layerID],a)}}}},t.prototype._updateSymbolData=function(e){if(!this._symbolUpdateData.bucketDataInfo)return!0;var t=new Uint32Array(this._symbolUpdateData.bucketDataInfo),r=t.length;if(0===r)return this._symbolUpdateData=null,!0;if(4!==this.status)return this.requestRender(),!1;for(var i=e.context,s=new Uint32Array(this._symbolUpdateData.bufferDataInfo),a=s.length,f=0,l=0;l<a;l+=2,f++){switch(s[l]){case 10:this.iconVertexBuffer&&(this.iconVertexBuffer.dispose(),this.iconVertexBuffer=null),this.iconVertexBuffer=h.createVertex(i,35044,this._symbolUpdateData.bufferData[f]);break;case 11:this.iconDDVertexBuffer&&(this.iconDDVertexBuffer.dispose(),this.iconDDVertexBuffer=null),this.iconDDVertexBuffer=h.createVertex(i,35044,this._symbolUpdateData.bufferData[f]);break;case 12:this.iconIndexBuffer&&(this.iconIndexBuffer.dispose(),this.iconIndexBuffer=null),this.iconIndexBuffer=h.createIndex(i,35044,this._symbolUpdateData.bufferData[f]);break;case 13:this.textVertexBuffer&&(this.textVertexBuffer.dispose(),this.textVertexBuffer=null),this.textVertexBuffer=h.createVertex(i,35044,this._symbolUpdateData.bufferData[f]);break;case 14:this.textDDVertexBuffer&&(this.textDDVertexBuffer.dispose(),this.textDDVertexBuffer=null),this.textDDVertexBuffer=h.createVertex(i,35044,this._symbolUpdateData.bufferData[f]);break;case 15:this.textIndexBuffer&&(this.textIndexBuffer.dispose(),this.textIndexBuffer=null),this.textIndexBuffer=h.createIndex(i,35044,this._symbolUpdateData.bufferData[f])}}for(var n=this._renderBuckets.length,o=0;o<n;o++){if(this._renderBuckets[o]instanceof u.SymbolRenderBucket){var c=this._renderBuckets[o];c.markerPerPageElementsMap.clear(),c.glyphPerPageElementsMap.clear()}}for(var D,x,d=0;d<r;){var B=t[d];x=-1;for(var V=this._renderBuckets.length,o=0;o<V;o++)if(this._renderBuckets[o].layerID===B){x=o;break}D=this._renderBuckets[x],D||(D=new u.SymbolRenderBucket,D.layerID=B,D.isSDF=0!==t[d+2],this._renderBuckets.push(D));var b=d+3,p=t[b];if(b++,p>0)for(var y=void 0,v=void 0,_=void 0,I=0;I<p;I++)y=t[b],v=t[b+1],_=t[b+2],D.markerPerPageElementsMap.set(y,[v,_]),b+=3;var k=b,m=t[k];if(k++,m>0)for(var y=void 0,v=void 0,_=void 0,I=0;I<m;I++)y=t[k],v=t[k+1],_=t[k+2],D.glyphPerPageElementsMap.set(y,[v,_]),k+=3;d+=5+3*p+3*m}return this.iconVertexArrayObject&&(this.iconVertexArrayObject.dispose(),this.iconVertexArrayObject=null),this.iconDDVertexArrayObject&&(this.iconDDVertexArrayObject.dispose(),this.iconDDVertexArrayObject=null),this.textVertexArrayObject&&(this.textVertexArrayObject.dispose(),this.textVertexArrayObject=null),this.textDDVertexArrayObject&&(this.textDDVertexArrayObject.dispose(),this.textDDVertexArrayObject=null),this._symbolUpdateData=null,!0},t.pool=new i(t),t}(l)});