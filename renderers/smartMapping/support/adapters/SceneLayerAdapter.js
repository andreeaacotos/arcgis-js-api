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

define(["require","exports","../../../../core/tsSupport/declareExtendsHelper","../../../../core/tsSupport/decorateHelper","dojo/_base/lang","../../../../Graphic","../../../../core/Error","../../../../core/Handles","../../../../core/promiseUtils","../../../../core/accessorSupport/decorators","../../../../layers/support/fieldUtils","../../statistics/support/utils","./FeatureLayerAdapter","./LayerAdapter","./support/utils","../../../../tasks/support/FeatureSet"],function(e,t,r,a,i,s,n,o,u,l,c,p,m,d,f,h){return function(e){function t(t){var r=e.call(this)||this;return r._handles=new o,r._layer=t.layer,r}return r(t,e),t.prototype._hasCachedStatistics=function(e){return this._layer.hasCachedStatistics(e)},t.prototype._fetchFeaturesFromMemory=function(e){var t=this;return e?e.whenLayerView(this._layer).then(function(e){var r=u.create(function(r,a){var i=e.watch("updating",function(){t._handles.remove("layerViewUpdate"),e.queryFeatures().then(function(e){r(e.features)}).catch(function(e){a(e)})});t._handles.add(i,"layerViewUpdate")});return u.timeout(r,1e4,null),r}):u.reject(new n("scene-layer-adapter:insufficient-data","view is required to fetch the features from layerView"))},t.prototype._generateFeatureSetForCachedHistogram=function(e,t,r,a){void 0===t&&(t=e.minimum),void 0===r&&(r=e.maximum);for(var i=[],n=0;n<a;n++)i[n]=0;for(var o=e.counts.length,u=e.minimum,l=e.maximum,n=0;n<o;n++){var c=(n+.5)/o,p=(1-c)*u+c*l,m=(p-t)/(r-t)*a;m>=0&&m<=a&&(i[m===a?a-1:Math.floor(m)]+=e.counts[n])}var d=[];i.forEach(function(e,t){var r=new s({attributes:{}});r.attributes.EXPR_1=t+1,r.attributes.countOFExpr=e,d.push(r)});var f=new h;return f.features=d,f},t.prototype._getCachedStatistics=function(e,t){var r=this._layer;return e.valueExpression||e.sqlExpression||e.sqlWhere||e.minValue||e.maxValue?u.reject(new n("scene-layer-adapter:not-supported","This Layer does not support calculating statistics when 'valueExpression', 'sqlExpression', 'sqlWhere', 'minValue' or 'maxValue' is specified")):r.queryCachedStatistics(t&&t.name).then(function(e){var t=e.stats,r=t.min,a=t.max,i=t.avg,s=t.stddev,n=t.sum,o=t.variance,u=t.count;return 0===r&&0===a||(i=0===i?null:i,n=0===n?null:n,s=0===s?null:s,o=0===o?null:o,u=0===u?null:u),null==u&&null!=n&&null!=i&&(u=Math.round(n/i)),{avg:i,count:u,max:a,min:r,stddev:s,sum:n,variance:o}})},t.prototype._getSummaryStatisticsFromMemory=function(e,t){return(e.features?u.resolve(e.features):this._fetchFeaturesFromMemory(e.view)).then(function(r){if(!r||!r.length)return u.reject(new n("scene-layer-adapter:insufficient-data","No features are available to calculate statistics"));var a=c.isDateField(t),s=i.mixin({},e);if("percent-of-total"===s.normalizationType){var o=f.calculateStatsFromMemory({field:s.field},r).sum;if(null==o)return u.reject(new n("scene-layer-adapter:invalid","invalid normalizationTotal"));s.normalizationTotal=o}var l=f.calculateStatsFromMemory(s,r,a);return f.processSummaryStatisticsResult(l)})},t.prototype._getCachedStatisticsForUniqueValues=function(e,t){var r=this,a=this._layer,i=t&&t.name,o=t&&this.getFieldDomain(e.field);return e.valueExpression||e.sqlExpression||e.sqlWhere?u.reject(new n("scene-layer-adapter:not-supported","This Layer does not support calculating statistics when 'valueExpression', 'sqlExpression' or 'sqlWhere' is specified")):a.queryCachedStatistics(i).then(function(n){var o=n.stats,u=n.labels&&n.labels.labels,l={},p=[];if(o.mostFrequentValues){var m="countOF"+i;o.mostFrequentValues.forEach(function(e){var r=new s({attributes:{}});r.attributes[i]=c.isNumericField(t,a)||c.isDateField(t)?Number(e.value):e.value,r.attributes[m]=e.count,p.push(r)}),u&&u.forEach(function(e){l[e.value]=e.label})}var d=new h;return d.features=p,f.getUniqueValuesFromFeatureSet(d,r,e.field,l)}).then(function(t){return f.createUVResult(t,"service-cached-query",o,e.returnAllCodedValues)})},t.prototype._getUniqueValuesFromMemory=function(e,t){var r=t&&this.getFieldDomain(e.field);return(e.features?u.resolve(e.features):this._fetchFeaturesFromMemory(e.view)).then(function(t){return f.calculateUniqueValuesFromMemory(e,t,r)})},t.prototype._getCachedStatisticsForHistogram=function(e,t){var r=this,a=this._layer;return e.valueExpression||e.sqlExpression||e.sqlWhere||e.normalizationType?u.reject(new n("scene-layer-adapter:not-supported","This Layer does not support calculating statistics when 'valueExpression' or 'sqlExpression' or 'sqlWhere' or 'normalizationType' is specified")):a.queryCachedStatistics(t&&t.name).then(function(t){var a=t.stats,i=e.minValue,s=e.maxValue,n=null!=i?i:a.min,o=null!=s?s:a.max,u=e.numBins||10,l=r._generateFeatureSetForCachedHistogram(a.histogram,n,o,u);return f.getHistogramFromFeatureSet(l,n,o,u)})},t.prototype._getClassBreaksFromMemory=function(e){return(e.features?u.resolve(e.features):this._fetchFeaturesFromMemory(e.view)).then(function(t){if(!t||!t.length)return u.reject(new n("scene-layer-adapter:insufficient-data","No features are available to calculate statistics"));var r=i.mixin({},e);if("percent-of-total"===r.normalizationType){var a=f.calculateStatsFromMemory({field:r.field},t).sum;if(null==a)return u.reject(new n("scene-layer-adapter:invalid","invalid normalizationTotal"));r.normalizationTotal=a}return f.calculateClassBreaksFromMemory(r,t)})},t.prototype._getHistogramFromMemory=function(e){var t=this;return(e.features?u.resolve(e.features):this._fetchFeaturesFromMemory(e.view)).then(function(r){if(!r||!r.length)return u.reject(new n("scene-layer-adapter:insufficient-data","No features are available to calculate histogram"));var a=e.field,s=e.normalizationType,o=e.valueExpression,l=e.classificationMethod,c=e.minValue,p=e.maxValue,m=e.view,d=!l||"equal-interval"===l,h=null!=c&&null!=p,y=null;if(d&&!s)y=h?u.resolve({min:c,max:p}):t.summaryStatistics({field:a,valueExpression:o,features:r,view:m}).then(function(e){return e.count?{min:e.min,max:e.max}:u.reject(new n("feature-layer-adapter:insufficient-data","No features are available to calculate histogram"))});else{var v=i.mixin({},e);v.features=r,y=t._getBinParamsFromMemory(v)}return y.then(function(t){return f.calculateHistogramFromMemory(e,t,r)})})},t.prototype._getBinParamsFromMemory=function(e){var t=e.field,r=e.valueExpression,a=e.classificationMethod,i=e.standardDeviationInterval,s=e.normalizationType,n=e.normalizationField,o=e.minValue,u=e.maxValue,l=e.features,c=e.view;return this._getClassBreaksFromMemory({field:t,valueExpression:r,normalizationType:s,normalizationField:n,classificationMethod:a,standardDeviationInterval:i,minValue:o,maxValue:u,numClasses:e.numBins,features:l,view:c}).then(function(e){var r=e.normalizationTotal,a=e.classBreakInfos,i=p.getSQLFilterForNormalization({field:t,normalizationType:s,normalizationField:n});return f.generateBinParams({field:t,normalizationType:s,normalizationField:n,normalizationTotal:r,classBreaks:a,where:i})})},t.prototype.getField=function(e){return void 0===e&&(e=""),this._layer.getField(e)},t.prototype.getFieldUsageInfo=function(e){var t=this.getField(e);if(!t)return null;var r=this._layer.getFieldUsageInfo(t.name);return{supportsLabelingInfo:r.supportsLabelingInfo,supportsPopupTemplate:r.supportsPopupTemplate,supportsRenderer:r.supportsRenderer,supportsLayerQuery:r.supportsLayerQuery,supportsStatistics:!0}},t.prototype.getFieldDomain=function(e,t){return this._featureLayerAdapter?this._featureLayerAdapter.getFieldDomain(e,t):null},t.prototype.summaryStatistics=function(e){var t=this,r=this.getField(e.field);return this._featureLayerAdapter?this._featureLayerAdapter.summaryStatistics(e):this._hasCachedStatistics(r&&r.name)?this._getCachedStatistics(e,r).catch(function(a){return t._getSummaryStatisticsFromMemory(e,r)}):this._getSummaryStatisticsFromMemory(e,r)},t.prototype.uniqueValues=function(e){var t=this,r=this.getField(e.field);return this._featureLayerAdapter?this._featureLayerAdapter.uniqueValues(e):this._hasCachedStatistics(r&&r.name)?this._getCachedStatisticsForUniqueValues(e,r).catch(function(a){return t._getUniqueValuesFromMemory(e,r)}):this._getUniqueValuesFromMemory(e,r)},t.prototype.histogram=function(e){var t=this,r=this.getField(e.field);return this._featureLayerAdapter?this._featureLayerAdapter.histogram(e):this._hasCachedStatistics(r&&r.name)?this._getCachedStatisticsForHistogram(e,r).catch(function(r){return t._getHistogramFromMemory(e)}):this._getHistogramFromMemory(e)},t.prototype.classBreaks=function(e){var t=this.getField(e.field);return this._featureLayerAdapter?this._featureLayerAdapter.classBreaks(e):this._hasCachedStatistics(t&&t.name)?u.reject(new n("scene-layer-adapter:not-supported","Cached stats not supported")):this._getClassBreaksFromMemory(e)},t.prototype.queryFeatureCount=function(e){return this._featureLayerAdapter?this._featureLayerAdapter.queryFeatureCount(e):u.reject(new n("scene-layer-adapter:not-supported","SceneLayer without associated FeatureLayer does not support count query"))},t.prototype.generateRenderer=function(e){return this._featureLayerAdapter?this._featureLayerAdapter.generateRenderer(e):u.reject(new n("scene-layer-adapter:not-supported","SceneLayer without associated FeatureLayer does not support generateRenderer operation"))},t.prototype.load=function(){var e=this,t=this._layer,r=t.load().then(function(){var r=t.associatedLayer;if(e.geometryType=t.geometryType,r){e._featureLayerAdapter=new m({layer:r});return e._featureLayerAdapter.load().then(function(){e.objectIdField=e._featureLayerAdapter.objectIdField,e.supportsSQLExpression=e._featureLayerAdapter.supportsSQLExpression})}e.objectIdField=t.objectIdField,e.supportsSQLExpression=!1});return this.addResolvingPromise(r),this.when()},t=a([l.subclass()],t)}(l.declared(d))});