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

define(["require","exports","../../../../core/tsSupport/generatorHelper","../../../../core/Logger","./enums","./MaterialInfo","./Utils","./util/serializationUtils"],function(e,t,r,i,n,o,s,l){var a=i.getLogger("esri.views.2d.engine.webgl.WGLDisplayList"),y=function(){function e(){this.symbolLevels=[]}return Object.defineProperty(e.prototype,"empty",{get:function(){return!this.symbolLevels||0===this.symbolLevels.length},enumerable:!0,configurable:!0}),e.prototype.addToList=function(e){var t=this;if(!Array.isArray(e))return void this._addToList(e);e.forEach(function(e){t._addToList(e)})},e.prototype.removeFromList=function(e){var t=this;Array.isArray(e)||(e=[e]),e.forEach(function(e){t._removeFromList(e)})},e.prototype.ofType=function(e){var t,i,n,o,s,l,a,y,m,u,f;return r(this,function(r){switch(r.label){case 0:t=0,i=this.symbolLevels,r.label=1;case 1:if(!(t<i.length))return[3,8];n=i[t],o=0,s=n.zLevels,r.label=2;case 2:if(!(o<s.length))return[3,7];if(l=s[o],a=l.geometryDPInfo,y=this._getDPInfoType(e),!a[y])return[3,6];m=0,u=a[y],r.label=3;case 3:return m<u.length?(f=u[m],[4,f]):[3,6];case 4:r.sent(),r.label=5;case 5:return m++,[3,3];case 6:return o++,[3,2];case 7:return t++,[3,1];case 8:return[2]}})},e.prototype._addToList=function(e){var t=e.symbolLevel,r=e.zOrder,i=this._getDisplayList(t,r,e.geometryType),n=i.length>0?i[i.length-1]:null;if(null!==n&&s.isSameMaterialInfo(n.materialInfo,e.materialInfo)&&n.indexFrom+n.indexCount===e.indexFrom)n.indexCount+=e.indexCount;else{var o=new m;o.indexFrom=e.indexFrom,o.indexCount=e.indexCount,o.materialInfo=e.materialInfo,o.geometryType=e.geometryType,i.push(o)}},e.prototype._removeFromList=function(e){for(var t=e.symbolLevel,r=e.zOrder,i=this._getDisplayList(t,r,e.geometryType),n=i.length,s=void 0,l=0;l<n;++l){var a=i[l];e.indexFrom+e.indexCount>a.indexFrom&&e.indexFrom<a.indexFrom+a.indexCount&&(s=l)}if(void 0!==s){var a=i[s];if(e.indexFrom<a.indexFrom)a.indexCount-=e.indexCount,a.indexFrom+=e.indexCount;else if(e.indexFrom+e.indexCount>a.indexFrom+a.indexCount)a.indexCount-=e.indexCount;else{var y=a.indexFrom,u=e.indexFrom-a.indexFrom,f=e.indexCount,d=a.indexFrom+a.indexCount-(e.indexFrom+e.indexCount);a.indexCount=u;var L=new m;L.geometryType=a.geometryType,L.materialInfo=new o.default,L.materialInfo.copy(a.materialInfo),L.indexFrom=y+u+f,L.indexCount=d,i.splice(s+1,0,L)}}},e.prototype._getDisplayList=function(e,t,r){for(var i,o=this.symbolLevels.length,s=0;s<o;s++)if(this.symbolLevels[s].symbolLevel===e){i=this.symbolLevels[s];break}i||(i=new d,i.symbolLevel=e,this.symbolLevels.push(i));for(var l,a=i.zLevels.length,y=0;y<a;y++)if(i.zLevels[y].zLevel===t){l=i.zLevels[y];break}l||(l=new f,l.geometryDPInfo=new u,l.zLevel=t,i.zLevels.push(l));var m;switch(r){case n.WGLGeometryType.FILL:l.geometryDPInfo.fill||(l.geometryDPInfo.fill=[]),m=l.geometryDPInfo.fill;break;case n.WGLGeometryType.LINE:l.geometryDPInfo.line||(l.geometryDPInfo.line=[]),m=l.geometryDPInfo.line;break;case n.WGLGeometryType.MARKER:l.geometryDPInfo.marker||(l.geometryDPInfo.marker=[]),m=l.geometryDPInfo.marker;break;case n.WGLGeometryType.TEXT:l.geometryDPInfo.text||(l.geometryDPInfo.text=[]),m=l.geometryDPInfo.text;break;default:console.error("Trying to add a record with geometry type '"+r+"'.")}return m},e.prototype.serialize=function(e){return l.serializeList(e,this.symbolLevels),e},e.deserialize=function(t){var r=new e;return r.symbolLevels=l.deserializeList(t,d),r},e.prototype._getDPInfoType=function(e){switch(e){case n.WGLGeometryType.FILL:return"fill";case n.WGLGeometryType.LINE:return"line";case n.WGLGeometryType.MARKER:return"marker";case n.WGLGeometryType.TEXT:return"text";default:a.error("DisplayList: Tried to convert unknown geometryType: "+e)}},e}(),m=function(){function e(){this.materialInfo=null,this.indexFrom=0,this.indexCount=0}return e.prototype.serialize=function(e){return this.materialInfo.serialize(e),e.writeInt32(this.indexFrom),e.writeInt32(this.indexCount),e},e.deserialize=function(t,r){var i=new e;return i.geometryType=r.geometryType,i.materialInfo=o.default.deserialize(t),i.indexFrom=t.readInt32(),i.indexCount=t.readInt32(),i},e}(),u=function(){function e(){this.fill=null,this.line=null,this.marker=null,this.text=null}return e.prototype.serialize=function(e){return l.serializeList(e,this.fill),l.serializeList(e,this.line),l.serializeList(e,this.marker),l.serializeList(e,this.text),e},e.deserialize=function(t){var r=new e,i={geometryType:n.WGLGeometryType.FILL},o=l.deserializeList(t,m,i);o.length&&(r.fill=o),i.geometryType=n.WGLGeometryType.LINE;var s=l.deserializeList(t,m,i);s.length&&(r.line=s),i.geometryType=n.WGLGeometryType.MARKER;var a=l.deserializeList(t,m,i);a.length&&(r.marker=a),i.geometryType=n.WGLGeometryType.TEXT;var y=l.deserializeList(t,m,i);return y.length&&(r.text=y),r},e}(),f=function(){function e(){this.geometryDPInfo=new u}return e.prototype.serialize=function(e){return e.writeInt32(this.zLevel),this.geometryDPInfo.serialize(e),e},e.deserialize=function(t){var r=new e;return r.zLevel=t.readInt32(),r.geometryDPInfo=u.deserialize(t),r},e}(),d=function(){function e(){this.zLevels=[]}return e.prototype.serialize=function(e){return e.writeInt32(this.symbolLevel),l.serializeList(e,this.zLevels),e},e.deserialize=function(t){var r=new e;return r.symbolLevel=t.readInt32(),r.zLevels=l.deserializeList(t,f),r},e}();return y});