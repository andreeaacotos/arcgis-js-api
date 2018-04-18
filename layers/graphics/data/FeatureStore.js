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

define(["require","exports","@dojo/shim/array","@dojo/shim/iterator","@dojo/shim/Map","@dojo/shim/Set","../../../core/Error","../../../core/promiseUtils","../../../core/libs/rbush/rbush","../../../geometry/support/contains","../../../geometry/support/intersects","../../../geometry/support/normalizeUtils","../../../geometry/support/scaleUtils","../../../geometry/support/spatialReferenceUtils","../../../geometry/support/webMercatorUtils","./attributeSupport","./FeatureSetReader","./FeatureStoreCapabilities","./FeatureStoreItem","./FeatureStoreResult","./projectionSupport","./SpatialQueryCache","../../../tasks/support/Query"],function(e,t,r,i,n,o,s,u,a,c,l,h,p,y,f,m,d,g,x,_,S,v,Q){function b(e){return e?JSON.parse(JSON.stringify(e,["latestWkid","wkid","wkt"])):e}Object.defineProperty(t,"__esModule",{value:!0});var I="feature-store:unsupported-query",w=new o.default(["esriFieldTypeSmallInteger","esriFieldTypeInteger","esriFieldTypeSingle","esriFieldTypeDouble","esriFieldTypeLong"]),F={},R=function(){function e(e){var t=this;this._itemsMap=new n.default,this._itemsToIndex=new o.default,this._index=a(9,[".bounds[0]",".bounds[1]",".bounds[2]",".bounds[3]"]),this.capabilities={query:g.queryCapabilities},this.fieldsMap=new n.default,this.geometryType=e.geometryType,this.hasM=e.hasM,this.hasZ=e.hasZ,this.objectIdField=e.objectIdField,this.spatialReference=e.spatialReference,this.definitionExpression=e.definitionExpression,this.cacheSpatialQueries=e.cacheSpatialQueries||!1,this.gdbVersion=e.gdbVersion,this.historicMoment=e.historicMoment,this.cacheSpatialQueries&&(this._geometryQueryCache=new v.default),e.fields.forEach(function(e){t.fieldsMap.set(e.name.trim(),e),t.fieldsMap.set(e.name.trim().toLowerCase(),e)})}return e.prototype.destroy=function(){this.clear(),this.fieldsMap.clear()},e.prototype.clear=function(){this._itemsMap.clear(),this._itemsToIndex.clear(),this._index.clear(),this._geometryQueryCache&&this._geometryQueryCache.clear()},Object.defineProperty(e.prototype,"size",{get:function(){return this._itemsMap.size},enumerable:!0,configurable:!0}),e.prototype.load=function(e,t){var r="getBounds"in e?e:d.createFeatureSetReader(e),n=this._itemsMap,o=this._itemsToIndex;this._clearCache(),i.forOf(r.oids(),function(e){var i;n.has(e)?(i=n.get(e),i.count++,t&&t.update(e)):(i=new x.default(r,e),n.set(e,i),o.add(e),t&&t.add(e))})},e.prototype.unload=function(e,t){var r=this._index,n=this._itemsMap,o=this._itemsToIndex;this._clearCache(),i.forOf(e.oids(),function(e){var i;n.has(e)&&(i=n.get(e),0===--i.count&&(n.delete(e),i.bounds?(r.remove(i),i.bounds=null):o.delete(e),t&&t.remove(e)))})},e.prototype.keep=function(e,t){var r=this._index,n=this._itemsMap,o=this._itemsToIndex;this._clearCache(),i.forOf(n,function(i){var s=i[0],u=i[1];e.has(s)||(n.delete(s),u.bounds?(r.remove(u),u.bounds=null):o.delete(s),t&&t.remove(s))})},e.prototype.remove=function(e,t){var r=this._index,i=this._itemsMap,n=this._itemsToIndex;this._clearCache();for(var o=0,s=e;o<s.length;o++){var u=s[o];if(!i.has(u))return;var a=i.get(u);i.delete(u),a.bounds?(r.remove(a),a.bounds=null):n.delete(u),t&&t.remove(u)}},e.prototype.executeQuery=function(e){var t=this;void 0===e&&(e=new Q);var r=e.clone();return this._normalizeQuery(r).then(function(e){return t._checkQuerySupport(e)}).then(function(e){return t._executeGeometryQuery(e)}).then(function(e){return e.executeObjectIdsQuery(r)}).then(function(e){return e.executeAttributesQuery(r)}).catch(function(e){if(e===F)return new _.default([],t);throw e}).then(function(e){return e.createQueryResponse(r)})},e.prototype.executeQueryForCount=function(e){var t=this;void 0===e&&(e=new Q);var r=e.clone();return this._normalizeQuery(r).then(function(e){return t._checkQuerySupport(e)}).then(function(e){return t._executeGeometryQuery(e)}).then(function(e){return e.executeObjectIdsQuery(r)}).then(function(e){return e.executeAttributesQuery(r)}).then(function(e){return e.size}).catch(function(e){if(e===F)return 0;throw e})},e.prototype.executeQueryForExtent=function(e){var t=this;void 0===e&&(e=new Q);var r=e.clone();return this._normalizeQuery(r).then(function(e){return t._checkQuerySupport(e)}).then(function(e){return t._executeGeometryQuery(e)}).then(function(e){return e.executeObjectIdsQuery(r)}).then(function(e){return e.executeAttributesQuery(r)}).then(function(e){var i=e.items.length;if(!i)return{count:i,extent:null};for(var n={xmin:Number.POSITIVE_INFINITY,ymin:Number.POSITIVE_INFINITY,xmax:Number.NEGATIVE_INFINITY,ymax:Number.NEGATIVE_INFINITY,spatialReference:b(t.spatialReference)},o=0,s=e.items;o<s.length;o++){var u=s[o],a=u.getBounds();a&&(n.xmin=Math.min(a[0],n.xmin),n.ymin=Math.min(a[1],n.ymin),n.xmax=Math.max(a[2],n.xmax),n.ymax=Math.max(a[3],n.ymax))}var c=S.project(n,e.spatialReference,r.outSpatialReference);if(c.spatialReference=b(r.outSpatialReference&&r.outSpatialReference.toJSON()||t.spatialReference),c.xmax-c.xmin==0){var l=p.getMetersPerUnitForSR(c.spatialReference);c.xmin-=l,c.xmax+=l}if(c.ymax-c.ymin==0){var l=p.getMetersPerUnitForSR(c.spatialReference);c.ymin-=l,c.ymax+=l}return{count:i,extent:c}}).catch(function(e){if(e===F)return{count:0,extent:null};throw e})},e.prototype.executeQueryForIds=function(e){var t=this;void 0===e&&(e=new Q);var r=e.clone();return this._normalizeQuery(r).then(function(e){return t._checkQuerySupport(e)}).then(function(e){return t._executeGeometryQuery(e)}).then(function(e){return e.executeObjectIdsQuery(r)}).then(function(e){return e.executeAttributesQuery(r)}).then(function(e){for(var t=e.items,r=[],i=0;i<t.length;i++)r[i]=t[i].oid;return r}).catch(function(e){if(e===F)return[];throw e})},e.prototype._clearCache=function(){this._geometryQueryCache&&this._geometryQueryCache.clear(),this._allItems=null},e.prototype._getAll=function(){return this._allItems||(this._allItems=new _.default(r.from(this._itemsMap,function(e){e[0];return e[1]}),this)),this._allItems},e.prototype._normalizeQuery=function(e){var t=this,r=this.definitionExpression,i=e.where,n=e.geometry,o=e.outFields,s=e.orderByFields,a=e.groupByFieldsForStatistics,c=e.outStatistics;if(e.where=i=i&&i.trim(),(!i||/^1 *= *1$/.test(i)||r&&r===i)&&(e.where=null),o)for(var l=0;l<o.length;l++)o[l]=o[l].trim();if(s)for(var l=0;l<s.length;l++)s[l]=s[l].trim();if(a)for(var l=0;l<a.length;l++)a[l]=a[l].trim();if(c)for(var l=0;l<c.length;l++)c[l].onStatisticField=c[l].onStatisticField.trim();return n?(e.outSpatialReference||(e.outSpatialReference=n.spatialReference),S.checkProjectionSupport(e,n.spatialReference,this.spatialReference).then(function(){return h.normalizeCentralMeridian(n)}).then(function(e){return S.project(e[0].toJSON(),e[0].spatialReference,t.spatialReference)}).then(function(t){if(!t)throw F;return e.read({geometry:t})})):u.resolve(e)},e.prototype._executeGeometryQuery=function(e){var t=this,r=e.geometry,i=e.outSpatialReference,n=i&&!y.equals(this.spatialReference,i),o=n?JSON.stringify({geometry:r,outSpatialReference:i}):JSON.stringify(r);if(this.cacheSpatialQueries&&this._geometryQueryCache.size&&this._geometryQueryCache.has(o))return this._geometryQueryCache.get(o);var s;if(r){this._updateSpatialIndex();for(var u=[],a=0,c=this._getQueryBBoxes(r),l="esriGeometryPoint"===this.geometryType&&this._canQueryWithRBush(r),h=this._getSpatialOp("intersects",r,this.geometryType),p=0,f=c;p<f.length;p++){var m=f[p],d=this._index.search({minX:m[0],minY:m[1],maxX:m[2],maxY:m[3]});if(l)u=u.concat(d),a+=d.length;else if(h)for(var g=0,x=d;g<x.length;g++){var S=x[g];h(S.getGeometry())&&(u[a++]=S)}else u=u.concat(d),a+=d.length}s=new _.default(u,this)}else s=this._getAll();return n&&(e.returnGeometry||e.returnCentroid)?s.project(i).then(function(e){return t.cacheSpatialQueries&&t._geometryQueryCache.set(o,e),e}):(this.cacheSpatialQueries&&this._geometryQueryCache.set(o,s),s)},e.prototype._canQueryWithRBush=function(e){switch(e.type){case"extent":return!0;case"polygon":return e.rings.every(function(e){return 5===e.length&&(e[0][0]===e[1][0]&&e[0][0]===e[4][0]&&e[2][0]===e[3][0]&&e[0][1]===e[3][1]&&e[0][1]===e[4][1]&&e[1][1]===e[2][1])});default:return!1}},e.prototype._updateSpatialIndex=function(){var e=this;if(this._itemsToIndex.size){var t=[];i.forOf(this._itemsToIndex,function(r){var i=e._itemsMap.get(r);i.getBounds()&&t.push(i)}),this._index.load(t),this._itemsToIndex.clear()}},e.prototype._getQueryBBoxes=function(e){var t=this._canQueryWithRBush(e)?e:e.extent;switch(t.type){case"extent":return[[t.xmin,t.ymin,t.xmax,t.ymax]];case"polygon":return t.rings.map(function(e){return[e[0][0],e[0][1],e[2][0],e[2][1]]})}},e.prototype._getSpatialOp=function(e,t,r){switch(t.type){case"polygon":switch(r){case"esriGeometryPoint":return c.polygonContainsPoint.bind(null,t.toJSON());default:return null}case"extent":return l.getExtentIntersector(r).bind(null,t);default:return null}},e.prototype._checkQuerySupport=function(e){return null!=e.distance||null!=e.geometryPrecision||null!=e.maxAllowableOffset||e.multipatchOption||e.orderByFields&&e.orderByFields.length||e.pixelSize||e.relationParameter||e.text||e.timeExtent?u.reject(new s(I,"Unsupported query options",{query:e})):u.all([this._checkGeometryQuerySupport(e),this._checkAttributesQuerySupport(e),this._checkStatisticsQuerySupport(e),S.checkProjectionSupport(e,this.spatialReference,e.outSpatialReference)]).then(function(){return e})},e.prototype._checkAttributesQuerySupport=function(e){var t=e.outFields;if(t&&t.length>0){var r=m.getMissingFields(this.fieldsMap,t);if(r.length)throw new s(I,"outFields contains missing fields",{missingFields:r,query:e})}m.validateWhere(this.fieldsMap,e.where)},e.prototype._checkGeometryQuerySupport=function(e){var t,r=e.spatialRelationship,i=e.geometry;return i?("intersects"!==r?t=new s(I,"Unsupported query spatial relationship",{query:e}):"extent"!==i.type&&"polygon"!==i.type?t=new s(I,"Unsupported query geometry type",{query:e}):"polygon"!==i.type||"esriGeometryPoint"===this.geometryType||this._canQueryWithRBush(i)?f.canProject(i.spatialReference,this.spatialReference)?i.hasZ:t=new s(I,"Unsupported geometry spatialReference",{query:e}):t=new s(I,"Unsupported polygon intersection",{query:e}),t?u.reject(t):u.resolve()):null},e.prototype._checkStatisticsQuerySupport=function(e){if(e.returnDistinctValues)return u.reject(new s(I,"query with returnDistinctValues not supported",{query:e}));if(e.outStatistics&&e.outStatistics.length){var t=e.outStatistics.map(function(e){return e.onStatisticField.trim()}),r=m.getMissingFields(this.fieldsMap,t);if(r.length)return u.reject(new s(I,"outStatistics contains missing fields",{missingFields:r,query:e}));for(var i=0,n=t;i<n.length;i++){var o=n[i],a=this.fieldsMap.get(o);if(!(e.groupByFieldsForStatistics&&e.groupByFieldsForStatistics.length)&&!w.has(a.type))return u.reject(new s(I,"outStatistics contains non-numeric fields",{fieldName:o,query:e}))}}},e}();t.default=R});