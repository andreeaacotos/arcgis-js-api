/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.18/esri/copyright.txt for details.
*/
define(["../../chunks/_rollupPluginBabelHelpers","../../chunks/tslib.es6","../../core/has","../../core/maybe","../../core/Logger","../../core/accessorSupport/ensureType","../../core/accessorSupport/decorators/property","../../core/accessorSupport/decorators/subclass","../../core/urlUtils","../../core/uuid","../../portal/support/resourceExtension","../../Color","../../core/unitUtils","../../support/elevationInfoUtils","./ElevationProfileLine","../../layers/support/ElevationQuery"],(function(e,o,r,t,n,i,s,a,l,c,u,p,f,h,v,y){"use strict";let d=function(o){function r(e){var r;return(r=o.call(this,e)||this).type="input",r.color=new p([255,127,0]),r.numSamplesForPreview=50,r.numSamplesPerChunk=1/0,r.showFill=!1,r}return e._inheritsLoose(r,o),r.prototype.queryElevation=async function(e,{noDataValue:o,signal:r}){const n=this._viewModel.input;if(t.isNone(n))throw new Error("no input");const i=this._viewModel.view.spatialReference,s=await y.GeometryDescriptor.fromGeometry(e).project(i,r),a=h.getGraphicEffectiveElevationInfo(n);if("absolute-height"===a.mode&&!h.hasGraphicFeatureExpressionInfo(n)){const e=t.unwrapOr(a.offset,0)/f.getMetersPerVerticalUnitForSR(i);for(const o of s.coordinates)o.z=t.unwrapOr(o.z,0)+e}else for(const e of s.coordinates)e.z=o;return{geometry:s.export(),noDataValue:o}},r}(v.ElevationProfileLine);return o.__decorate([s.property({type:p,nonNullable:!0})],d.prototype,"color",void 0),d=o.__decorate([a.subclass("esri.widgets.ElevationProfile.ElevationProfileLineInput")],d),d}));