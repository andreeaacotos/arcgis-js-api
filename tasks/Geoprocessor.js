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

define(["dojo/_base/lang","dojo/Deferred","dojo/io-query","../request","../geometry/support/normalizeUtils","../geometry/SpatialReference","../layers/MapImageLayer","../layers/support/MapImage","./Task","./support/DataFile","./support/Date","./support/FeatureSet","./support/GPMessage","./support/JobInfo","./support/LinearUnit","./support/ParameterValue","./support/RasterData"],function(e,t,a,s,r,n,i,o,l,u,c,p,h,d,f,m,b){return l.createSubclass({declaredClass:"esri.tasks.Geoprocessor",constructor:function(){this._updateTimers=[],this._handleExecuteResponse=this._handleExecuteResponse.bind(this),this._handleGetResultImageResponse=this._handleGetResultImageResponse.bind(this),this._handleGetResultDataResponse=this._handleGetResultDataResponse.bind(this)},properties:{outSpatialReference:{value:null,type:n},processSpatialReference:{value:null,type:n},updateDelay:{value:1e3,type:Number},url:{}},cancelJob:function(t,a){var r={query:e.mixin({},this.parsedUrl.query,{f:"json"}),callbackParamName:"callback"};return(this.requestOptions||a)&&(r=e.mixin({},this.requestOptions,a,r)),s(this.parsedUrl.path+"/jobs/"+t+"/cancel",r).then(function(e){return e.data})},cancelJobStatusUpdates:function(e){clearTimeout(this._updateTimers[e]),this._updateTimers[e]=null},checkJobStatus:function(t,a){var r={query:e.mixin({},this.parsedUrl.query,{f:"json"}),callbackParamName:"callback"};return(this.requestOptions||a)&&(r=e.mixin({},this.requestOptions,a,r)),s(this.parsedUrl.path+"/jobs/"+t,r).then(this._handleCheckJobStatusResponse)},getResultImage:function(t,a,r,n){var i=this._gpEncode(e.mixin({},this.parsedUrl.query,{f:"json"},r.toJSON())),o={query:i,callbackParamName:"callback"};return(this.requestOptions||n)&&(o=e.mixin({},this.requestOptions,n,o)),s(this.parsedUrl.path+"/jobs/"+t+"/results/"+a,o).then(this._handleGetResultImageResponse)},getResultData:function(t,a,r){var n={query:e.mixin({},this.parsedUrl.query,{f:"json",returnType:"data"}),callbackParamName:"callback"};return(this.requestOptions||r)&&(n=e.mixin({},this.requestOptions,r,n)),s(this.parsedUrl.path+"/jobs/"+t+"/results/"+a,n).then(this._handleGetResultDataResponse)},getResultMapImageLayer:function(e){var t,s,r=this.parsedUrl;return s=r.path.indexOf("/GPServer/"),t=r.path.substring(0,s)+"/MapServer/jobs/"+e,r.query&&(t+="?"+a.objectToQuery(r.query)),new i(t)},execute:function(t,a){var n={},i={},o=[];return this._collectGeometries(t,o,n),r.normalizeCentralMeridian(o).then(function(r){for(var o in n){var l=this.outSpatialReference,u=n[o];i[o]=r.slice(u[0],u[1])}var c=this._gpEncode(e.mixin({},this.parsedUrl.query,{f:"json","env:outSR":l?l.wkid||JSON.stringify(l.toJSON()):null,"env:processSR":this.processSpatialReference?this.processSpatialReference.wkid||JSON.stringify(this.processSpatialReference.toJSON()):null},t),null,i),p={query:c,callbackParamName:"callback"};return(this.requestOptions||a)&&(p=e.mixin({},this.requestOptions,a,p)),s(this.parsedUrl.path+"/execute",p)}.bind(this)).then(this._handleExecuteResponse)},submitJob:function(a,n){var i={},o={},l=[],u=new t;return this._collectGeometries(a,l,i),r.normalizeCentralMeridian(l).then(function(t){for(var r in i){var l=this.outSpatialReference,u=i[r];o[r]=t.slice(u[0],u[1])}var c=this._gpEncode(e.mixin({},this.parsedUrl.query,{f:"json","env:outSR":l?l.wkid||JSON.stringify(l.toJSON()):null,"env:processSR":this.processSpatialReference?this.processSpatialReference.wkid||JSON.stringify(this.processSpatialReference.toJSON()):null},a),null,o),p={query:c,callbackParamName:"callback"};return(this.requestOptions||n)&&(p=e.mixin({},this.requestOptions,n,p)),s(this.parsedUrl.path+"/submitJob",p)}.bind(this)).then(function(e){this._jobUpdateHandler(e.data,u)}.bind(this)).then(null,function(e){u.reject(e)}),u.promise},_collectGeometries:function(e,t,a){for(var s in e){var r=e[s];if("object"==typeof r&&null!=r){var n;if(Array.isArray(r)&&r.length)n=r[0]&&r[0].declaredClass,n&&n.indexOf("Graphic")>-1?(a[s]=[t.length,t.length+r.length],r.forEach(function(e){t.push(e.geometry)})):n&&n.indexOf("esri.geometry.")>-1&&(a[s]=[t.length,t.length+r.length],r.forEach(function(e){t.push(e)}));else if((n=r.declaredClass)&&n.indexOf("FeatureSet")>-1){var i=r.features;a[s]=[t.length,t.length+i.length],i.forEach(function(e){t.push(e.geometry)})}}}},_gpEncode:function(t,a,s){var r;for(r in t){var n=t[r];e.isArray(n)?t[r]=JSON.stringify(n.map(function(e){return this._gpEncode({item:e},!0).item},this)):n instanceof Date&&(t[r]=n.getTime())}return this._encode(t,a,s)},_decode:function(t){var a,s=t.dataType,r=m.fromJSON(t);if(-1!==["GPBoolean","GPDouble","GPLong","GPString"].indexOf(s))return r;if("GPLinearUnit"===s)r.value=f.fromJSON(r.value);else if("GPFeatureRecordSetLayer"===s||"GPRecordSet"===s)r.value=p.fromJSON(r.value);else if("GPDataFile"===s)r.value=u.fromJSON(r.value);else if("GPDate"===s)a=r.value,e.isString(a)?r.value=c.fromJSON({date:a}):r.value=Date.fromJSON(a);else if("GPRasterData"===s||"GPRasterDataLayer"===s){var n=t.value.mapImage;r.value=n?o.fromJSON(n):b.fromJSON(r.value)}else if(-1!==s.indexOf("GPMultiValue:")){var i=s.split(":")[1];a=r.value,r.value=a.map(function(e){return this._decode({paramName:"_name",dataType:i,value:e}).value},this)}else console.log(this.declaredClass+" : GP Data type not handled. : "+r.dataType),r=null;return r},_jobUpdateHandler:function(e,t){var a,s,r=e.jobId,n=d.fromJSON(e);switch(clearTimeout(this._updateTimers[r]),this._updateTimers[r]=null,t.progress(n),n.jobStatus){case"job-submitted":case"job-executing":case"job-waiting":case"job-new":a=this._getJobStatus.bind(this),s=this._jobUpdateHandler.bind(this),this._updateTimers[r]=setTimeout(function(){a(r).then(function(e){s(e,t)})},this.updateDelay);break;default:t.resolve(n)}},_getJobStatus:function(t){return s(this.parsedUrl.path+"/jobs/"+t,{query:e.mixin({},this.parsedUrl.query,{f:"json"}),callbackParamName:"callback"}).then(function(e){return e.data})},_handleGetResultDataResponse:function(e){return this._decode(e.data)},_handleCheckJobStatusResponse:function(e){return d.fromJSON(e.data)},_handleExecuteResponse:function(e){var t=e.data,a=t.results||[],s=t.messages||[];return{results:a.map(this._decode,this),messages:s.map(h.fromJSON)}},_handleGetResultImageResponse:function(e){return this._decode(e.data)}})});