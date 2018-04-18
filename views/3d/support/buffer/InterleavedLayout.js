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

define(["require","exports","./BufferView"],function(t,e,i){function s(){return new f}Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(t,e){this.layout=t,this.buffer="number"==typeof e?new ArrayBuffer(e*t.stride):e;for(var i=0,s=t.fieldNames;i<s.length;i++){var r=s[i],f=t.fields.get(r);this[r]=new f.constructor(this.buffer,f.offset,this.stride)}}return Object.defineProperty(t.prototype,"stride",{get:function(){return this.layout.stride},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"count",{get:function(){return this.buffer.byteLength/this.stride},enumerable:!0,configurable:!0}),t.prototype.slice=function(e,i){return new t(this.layout,this.buffer.slice(e*this.stride,i*this.stride))},t}(),f=function(){function t(){this.stride=0,this.fields=new Map,this.fieldNames=[]}return t.prototype.vec2f=function(t,e){return this.fields.set(t,{size:8,constructor:i.BufferViewVec2f,offset:this.stride,optional:e}),this.stride+=8,this.fieldNames.push(t),this},t.prototype.vec3f=function(t,e){return this.fields.set(t,{size:12,constructor:i.BufferViewVec3f,offset:this.stride,optional:e}),this.stride+=12,this.fieldNames.push(t),this},t.prototype.vec4f=function(t,e){return this.fields.set(t,{size:16,constructor:i.BufferViewVec4f,offset:this.stride,optional:e}),this.stride+=16,this.fieldNames.push(t),this},t.prototype.mat4f=function(t,e){return this.fields.set(t,{size:64,constructor:i.BufferViewMat4f,offset:this.stride,optional:e}),this.stride+=64,this.fieldNames.push(t),this},t.prototype.vec4u8=function(t,e){return this.fields.set(t,{offset:this.stride,size:4,optional:e,constructor:i.BufferViewVec4u8}),this.stride+=4,this.fieldNames.push(t),this},t.prototype.u8=function(t,e){return this.fields.set(t,{offset:this.stride,size:1,optional:e,constructor:i.BufferViewUint8}),this.stride+=1,this.fieldNames.push(t),this},t.prototype.u16=function(t,e){return this.fields.set(t,{offset:this.stride,size:2,optional:e,constructor:i.BufferViewUint16}),this.stride+=2,this.fieldNames.push(t),this},t.prototype.i8=function(t,e){return this.fields.set(t,{offset:this.stride,size:1,optional:e,constructor:i.BufferViewInt8}),this.stride+=1,this.fieldNames.push(t),this},t.prototype.vec2i8=function(t,e){return this.fields.set(t,{offset:this.stride,size:2,optional:e,constructor:i.BufferViewVec2i8}),this.stride+=2,this.fieldNames.push(t),this},t.prototype.vec2i16=function(t,e){return this.fields.set(t,{offset:this.stride,size:4,optional:e,constructor:i.BufferViewVec2i16}),this.stride+=4,this.fieldNames.push(t),this},t.prototype.vec2u8=function(t,e){return this.fields.set(t,{offset:this.stride,size:2,optional:e,constructor:i.BufferViewVec2u8}),this.stride+=2,this.fieldNames.push(t),this},t.prototype.vec4u16=function(t,e){return this.fields.set(t,{offset:this.stride,size:8,optional:e,constructor:i.BufferViewVec4u16}),this.stride+=8,this.fieldNames.push(t),this},t.prototype.u32=function(t,e){return this.fields.set(t,{offset:this.stride,size:4,optional:e,constructor:i.BufferViewUint32}),this.stride+=4,this.fieldNames.push(t),this},t.prototype.createBuffer=function(t){return new r(this,t)},t.prototype.createView=function(t){return new r(this,t)},t.prototype.clone=function(){var e=new t;return e.stride=this.stride,e.fields=new Map,this.fields.forEach(function(t,i){return e.fields.set(i,t)}),e.fieldNames=this.fieldNames.slice(),e.BufferType=this.BufferType,e},t}();e.InterleavedLayout=f,e.newLayout=s});