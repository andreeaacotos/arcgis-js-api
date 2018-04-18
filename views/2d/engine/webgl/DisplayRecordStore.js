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

define(["require","exports","dojo/has","./FreeList"],function(e,t,r,i){function o(e){var t=e.getStrides(),r={};for(var i in t)r[s[i]]=t[i];return r}Object.defineProperty(t,"__esModule",{value:!0});var s=["FILL","LINE","MARKER","TEXT"],n=function(){function e(e,t,r){this._strides=e,this._displayList=t,this._vertexAlignments={},this._freeListsAndStorage={};for(var o in e){var s=!1,n=!1;this._freeListsAndStorage[o]={vtxFreeList:r?new i.FreeList(r):null,idxFreeList:r?new i.FreeList(r):null,vertexBuffers:{},indexBuffer:r?new Uint32Array(r):null};for(var a in e[o])this._freeListsAndStorage[o].vertexBuffers[a]={data:r?new Uint32Array(Math.floor(r*e[o][a]/4)):null,stride:e[o][a]},e[o][a]%4==2?s=!0:e[o][a]%4!=0&&(n=!0);this._vertexAlignments[o]=n?4:s?2:1}}return e.fromTileData=function(t){var r=o(t),n=[0,0,0,0],a=[0,0,0,0],f=[],u=function(e){f.push(e)};t.tileDisplayData.displayObjectRegistry.forEach(u);for(var d=0,v=f;d<v.length;d++)for(var x=v[d],l=0,m=x.displayRecords;l<m.length;l++){var h=m[l];n[h.geometryType]=Math.max(n[h.geometryType],h.vertexFrom+h.vertexCount),a[h.geometryType]=Math.max(a[h.geometryType],h.indexFrom+h.indexCount)}for(var F=new e(r,t.tileDisplayData.displayList,null),c=0;c<t.tileBufferData.geometries.length;++c){var _=n[c],g=a[c],p=t.tileBufferData.geometries[c],y=s[c],L=F._storageFor(y),C=t.tileBufferData.geometries[c].indexBuffer;L.indexBuffer=C,L.idxFreeList=new i.FreeList(C.length),L.idxFreeList.allocate(g);var B=void 0;for(var D in p.vertexBuffer){var A=t.tileBufferData.geometries[c].vertexBuffer[D];L.vertexBuffers[D].data=A.data,L.vertexBuffers[D].stride=A.stride;B=4*A.data.length/A.stride}L.vtxFreeList=new i.FreeList(B),L.vtxFreeList.allocate(_)}return F},e.prototype.delete=function(e){var t=s[e.geometryType];this._freeVertices(t,e.vertexFrom,e.vertexCount),this._freeIndices(t,e.indexFrom,e.indexCount),this._displayList.removeFromList(e),e.vertexFrom=void 0,e.indexFrom=void 0},e.prototype.commit=function(e){var t=s[e.geometryType];if(!e.meshData)return!0;var r=e.meshData.vertexCount,i=e.meshData.indexData.length,o=e.vertexFrom,n=e.indexFrom,a=0,f=0,u=!1;if(void 0===e.vertexFrom?(a=this._align(t,r),o=this._allocateVertices(t,a),e.meshData.vertexCount=a,-1!==o&&(e.vertexFrom=o,e.vertexCount=a)):r>e.vertexCount?(this._freeVertices(t,e.vertexFrom,e.vertexCount),a=this._align(t,r),o=this._allocateVertices(t,a),e.meshData.vertexCount=a,-1!==o&&(e.vertexFrom=o,e.vertexCount=a)):r===e.vertexCount||(this._freeVertices(t,e.vertexFrom+r,e.vertexCount-r),e.vertexCount=r),void 0===e.indexFrom?(u=!0,f=i,-1!==(n=this._allocateIndices(t,f))&&(e.indexFrom=n,e.indexCount=f)):i>e.indexCount?(u=!0,this._displayList.removeFromList(e),this._freeIndices(t,e.indexFrom,e.indexCount),f=i,-1!==(n=this._allocateIndices(t,f))&&(e.indexFrom=n,e.indexCount=f)):i===e.indexCount||(u=!0,this._displayList.removeFromList(e),this._freeIndices(t,e.indexFrom+i,e.indexCount-i),e.indexCount=i),-1!==o&&-1!==n){var d=this._storageFor(t),v=d.vertexBuffers,x=d.indexBuffer;return e.writeMeshDataToBuffers(e.vertexFrom,v,e.indexFrom,x),e.meshData=null,u&&this._displayList.addToList(e),!0}return!1},e.prototype._allocateVertices=function(e,t){var r=this._storageFor(e),i=r.vtxFreeList.allocate(t);return-1===i?-1:r.vtxFreeList.fragmentation>.5?-1:i},e.prototype._freeVertices=function(e,t,i){var o=this._storageFor(e);if(o.vtxFreeList.free(t,i),r("esri-feature-tiles-debug"))for(var s in o.vertexBuffers)for(var n=o.vertexBuffers[s].data,a=this._stridesFor(e,s),f=t*a/4,u=i*a/4,d=f;d<f+u;++d)n[d]=0},e.prototype._freeIndices=function(e,t,i){var o=this._storageFor(e);if(o.idxFreeList.free(t,i),r("esri-feature-tiles-debug"))for(var s=o.indexBuffer,n=t;n<t+i;++n)s[n]=0},e.prototype._align=function(e,t){var r=t%this._vertexAlignments[e];return 0===r?t:t+(this._vertexAlignments[e]-r)},e.prototype._allocateIndices=function(e,t){var r=this._storageFor(e),i=r.idxFreeList.allocate(t);return-1===i?-1:r.idxFreeList.fragmentation>.5?-1:i},e.prototype._storageFor=function(e){return this._freeListsAndStorage[e]},e.prototype._stridesFor=function(e,t){return this._strides[e][t]},e}();t.default=n});