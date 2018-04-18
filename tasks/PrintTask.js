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

define(["../core/kebabDictionary","../core/urlUtils","../core/promiseUtils","../geometry/Polygon","../kernel","../request","dojo/_base/lang","dojo/dom-construct","dojox/gfx/canvas","./Geoprocessor","./support/PrintTemplate","./support/printTaskUtils","./Task"],function(e,r,t,i,a,n,s,l,o,u,y,c,d){function p(e){return!(!e||!e.path)}var f={Feet:"ft",Kilometers:"km",Meters:"m",Miles:"mi"},m=e({esriFeet:"Feet",esriKilometers:"Kilometers",esriMeters:"Meters",esriMiles:"Miles"}),h=e({MAP_ONLY:"map-only","A3 Landscape":"a3-landscape","A3 Portrait":"a3-portrait","A4 Landscape":"a4-landscape","A4 Portrait":"a4-portrait","Letter ANSI A Landscape":"letter-ansi-a-landscape","Letter ANSI A Portrait":"letter-ansi-a-portrait","Tabloid ANSI B Landscape":"tabloid-ansi-b-landscape","Tabloid ANSI B Portrait":"tabloid-ansi-b-portrait"}),g=e({esriExecutionTypeSynchronous:"sync",esriExecutionTypeAsynchronous:"async"});return d.createSubclass({declaredClass:"esri.tasks.PrintTask",constructor:function(){this._handleExecuteResponse=this._handleExecuteResponse.bind(this)},_vtlExtent:null,_legendLayers:[],_legendLayerNameMap:{},_gpServerUrl:null,_cimVersion:null,_is11xService:!1,_data:null,properties:{mode:{readonly:!0,value:"sync"},_geoprocessor:{dependsOn:["url","updateDelay"],get:function(){return new u(this.url,{updateDelay:this.updateDelay})}},url:{value:null,type:String},updateDelay:{value:1e3,type:Number}},execute:function(e,r){var i=this.url,a=i.lastIndexOf("/GPServer/");return a>0&&(i=i.slice(0,a+9)),t.resolve().then(function(){return this._gpServerUrl===i?{data:this._data}:(this._gpServerUrl=i,n(i,{query:{f:"json"}}))}.bind(this)).then(function(t){this._data=t.data,this._cimVersion=this._data.cimVersion,this._is11xService=!!this._cimVersion;var i=this._setPrintParams(e);this._data.executionType&&(this.mode=g.fromJSON(this._data.executionType));var a="async"===this.mode?"submitJob":"execute";return this._geoprocessor[a](i,r).then(this._handleExecuteResponse)}.bind(this))},_createOperationalLayers:function(e,t){var i,n,l,o,u=e.map,y=[],c=u.allLayers.filter(function(e){return!(e.parent&&"group"===e.parent.type&&!e.parent.visible)}).items;for(i=0;i<c.length;i++)if(n=c[i],n.loaded&&n.visible)switch(o={id:n.id,title:this._legendLayerNameMap[n.id]||n.title,opacity:n.opacity,minScale:n.minScale||0,maxScale:n.maxScale||0,url:n.url&&r.normalize(n.url),token:n.token},l=n.declaredClass){case"esri.layers.ImageryLayer":var d={bandIds:n.bandIds,compressionQuality:n.compressionQuality,format:n.format,interpolation:n.interpolation};n.mosaicRule&&(d.mosaicRule=n.mosaicRule.toJSON()),n.renderingRule&&(d.renderingRule=n.renderingRule.toJSON()),y.push(s.mixin(o,d)),this._legendLayers&&this._legendLayers.push({id:n.id});break;case"esri.layers.OpenStreetMapLayer":s.mixin(o,{type:"OpenStreetMap"}),y.push(o);break;case"esri.layers.GraphicsLayer":s.mixin(o,this._createFeatureCollectionJSON(n)),y.push(o),this._legendLayers&&this._legendLayers.push({id:n.id});break;case"esri.layers.VectorTileLayer":if(delete o.url,this._is11xService&&n.serviceUrl&&n.styleUrl){var p=a.id&&a.id.findCredential(n.currentStyleInfo.styleUrl),f=a.id&&a.id.findCredential(n.currentStyleInfo.serviceUrl);if(!p&&!f){s.mixin(o,{type:"VectorTileLayer",styleUrl:r.normalize(n.styleUrl)}),y.push(o);break}}o.type="image";var m=t.exportOptions&&t.exportOptions.dpi||96,h=t.exportOptions&&t.exportOptions.width%2==e.width%2,g=t.exportOptions&&t.exportOptions.height%2==e.height%2,b={format:"png",pixelRatio:m/96,rotation:0},v=this._vtlExtent||e.extent.clone();if("MAP_ONLY"===t.layout&&t.preserveScale&&(!t.outScale||t.outScale===e.scale)&&96===m&&(!h||!g)&&(b.area={x:0,y:0,width:e.width,height:e.height},h||(b.area.width+=1),g||(b.area.height+=1),!this._vtlExtent)){var S=e.toMap({x:b.area.width,y:b.area.height});v.ymin=S.y,v.xmax=S.x,this._vtlExtent=v}o.extent=v.clone()._normalize(!0).toJSON();var x=e.whenLayerView(n);x.isResolved()&&x.then(function(r){var t=r.takeScreenshot(b,e);t.isResolved()?t.then(function(e){"data:image/png;base64,"===e.dataURL.substr(0,22)&&(o.imageData=e.dataURL.substr(22))}):console.error("PrintTask: VectorTileLayer.takeScreenshot() returned an unresolved Promise"),o.imageData&&y.push(o)});break;case"esri.layers.MapImageLayer":var _={id:n.id,subLayerIds:[]},L=[],w=e.scale,D=function(e){var r=0===w,t=0===e.minScale||w<=e.minScale,i=0===e.maxScale||w>=e.maxScale;if(e.visible&&(r||t&&i))if(e.sublayers)e.sublayers.forEach(D);else{var a=e.toExportImageJSON().drawingInfo,n=e.toJSON();n.layerDefinition.drawingInfo=a,L.unshift(n),_.subLayerIds.push(e.id)}};n.sublayers&&n.sublayers.forEach(D),L.length&&(s.mixin(o,{layers:L,visibleLayers:_.subLayerIds}),y.push(o),this._legendLayers.push(_));break;case"esri.layers.KMLLayer":if(this._is11xService){var o={};n.write(o,{origin:"web-map"}),o.showLabels=t.showLabels,y.push(o)}else e.whenLayerView(n).then(function(e){e.allVisibleMapImages.forEach(function(e,r){var t={id:n.id+"_image"+r,type:"image",title:n.id,minScale:n.minScale||0,maxScale:n.maxScale||0,opacity:n.opacity,extent:e.extent.toJSON()};"data:image/png;base64,"===e.href.substr(0,22)?t.imageData=e.href.substr(22):t.url=e.href,y.push(t)});var r=e.allVisiblePoints.concat(e.allVisiblePolylines).concat(e.allVisiblePolygons),t={id:n.id};s.mixin(t,this._createFeatureCollectionJSON(null,r)),y.push(t)}.bind(this));break;case"esri.layers.WMSLayer":var L=[],D=function(e){e.visible&&(e.sublayers?e.sublayers.forEach(D):e.name&&L.unshift(e.name))};n.sublayers&&n.sublayers.forEach(D),s.mixin(o,{type:"wms",transparentBackground:n.imageTransparency,visibleLayers:L,version:n.version}),y.push(o);break;case"esri.layers.WMTSLayer":var O=n.activeLayer;s.mixin(o,{type:"wmts",layer:O.id,style:O.styleId,format:O.imageFormat,tileMatrixSet:O.tileMatrixSetId}),y.push(o);break;case"esri.layers.WebTileLayer":var I=n.urlTemplate.replace(/\$\{/g,"{");s.mixin(o,{type:"WebTiledLayer",urlTemplate:I,credits:n.copyright}),n.subDomains&&n.subDomains.length>0&&(o.subDomains=n.subDomains),y.push(o);break;case"esri.layers.CSVLayer":if(this._is11xService){var o={};n.write(o,{origin:"web-map"}),y.push(o);break}case"esri.layers.StreamLayer":case"esri.layers.FeatureLayer":var T=n.renderer,F=T&&!T.hasVisualVariables()&&!n.featureReduction&&!T.valueExpression&&"esri.layers.CSVLayer"!==l,M="esri.layers.FeatureLayer"===l&&n.source&&n.source.length||"esri.layers.StreamLayer"===l;if((this._is11xService||F)&&!M&&T&&("esri.renderer.SimpleRenderer"===T.declaredClass||null==T.field||"string"==typeof T.field&&n.getField(T.field))){var o={};if(n.write(o,{origin:"web-map"}),o.layerDefinition&&o.layerDefinition.drawingInfo&&o.layerDefinition.drawingInfo.renderer&&(this._convertSvgRenderer(o.layerDefinition.drawingInfo.renderer),T.visualVariables&&T.visualVariables[0]&&T.visualVariables[0].maxSize&&"number"!=typeof T.visualVariables[0].maxSize&&T.visualVariables[0].minSize&&"number"!=typeof T.visualVariables[0].minSize)){var P=T.getSizeRangeAtScale(T.visualVariables[0],e.scale);o.layerDefinition.drawingInfo.renderer.visualVariables[0].minSize=P.minSize,o.layerDefinition.drawingInfo.renderer.visualVariables[0].maxSize=P.maxSize}}else{var N=this._getGraphics(e,n);s.mixin(o,this._createFeatureCollectionJSON(n,N))}y.push(o),this._legendLayers&&this._legendLayers.push({id:n.id});break;case"esri.layers.MapNotesLayer":var E=[];n.featureCollections.map(function(e){var r=e.source.toArray(),t=this._createFeatureCollectionJSON(e,r).featureCollection;E=E.concat(t.layers)}.bind(this)),s.mixin(o,{featureCollection:{layers:E}}),y.push(o);break;default:y.push(o)}if(e.graphics&&e.graphics.length){var o=this._createFeatureCollectionJSON({},e.graphics);o&&y.push(o)}return y},_createFeatureCollectionJSON:function(e,r){var t=e,a=c.createPolygonLayer(),n=c.createPolylineLayer(),l=c.createPointLayer(),o=c.createMultipointLayer(),u=c.createPointLayer();u.layerDefinition.name="textLayer",delete u.layerDefinition.drawingInfo,t&&("esri.layers.FeatureLayer"===t.declaredClass||"esri.layers.StreamLayer"===t.declaredClass?a.layerDefinition.name=n.layerDefinition.name=l.layerDefinition.name=o.layerDefinition.name=this._legendLayerNameMap[t.id]||t.get("arcgisProps.title")||t.title:"esri.layers.GraphicsLayer"===t.declaredClass&&(r=t.graphics.items));var y=t.renderer&&"esri.renderer.SimpleRenderer"===t.renderer.declaredClass;if(t&&t.renderer&&!s.isFunction(t.get("renderer.field"))){var d=t.renderer.toJSON();a.layerDefinition.drawingInfo.renderer=d,n.layerDefinition.drawingInfo.renderer=d,l.layerDefinition.drawingInfo.renderer=d,o.layerDefinition.drawingInfo.renderer=d}else delete a.layerDefinition.drawingInfo,delete n.layerDefinition.drawingInfo,delete l.layerDefinition.drawingInfo,delete o.layerDefinition.drawingInfo;var p=t&&t.fields,f=t&&t.renderer,m=[];f&&!s.isFunction(t.get("renderer.field"))&&("class-breaks"===f.type?(p||(p=[{name:f.field,type:"esriFieldTypeDouble"}],f.normalizationField&&p.push({name:f.normalizationField,type:"esriFieldTypeDouble"})),f.field&&m.push(f.field),f.normalizationField&&m.push(f.normalizationField)):"unique-value"===f.type&&(p||(p=[{name:f.field,type:"esriFieldTypeString"}],f.field2&&p.push({name:f.field2,type:"esriFieldTypeString"}),f.field3&&p.push({name:f.field3,type:"esriFieldTypeString"})),f.field&&m.push(f.field),f.field2&&m.push(f.field2),f.field3&&m.push(f.field3))),p&&(a.layerDefinition.fields=p,n.layerDefinition.fields=p,l.layerDefinition.fields=p,o.layerDefinition.fields=p);for(var h,g=r&&r.length,b=0;b<g;b++){var v=r[b]||r.getItemAt(b);if(!1!==v.visible&&v.geometry&&(h=v.toJSON(),h.hasOwnProperty("popupTemplate")&&delete h.popupTemplate,h.geometry&&h.geometry.z&&delete h.geometry.z,!h.symbol||!h.symbol.outline||"esriCLS"!==h.symbol.outline.type||this._is11xService)){if(h.symbol&&h.symbol.outline&&h.symbol.outline.color&&h.symbol.outline.color[3]&&!this._is11xService&&(h.symbol.outline.color[3]=255),t&&t.renderer&&!h.symbol&&(s.isFunction(t.renderer.field)||t.renderer.compiledFunc||t.renderer.hasVisualVariables()||t.renderer)){var f=t.renderer,S=f.getSymbol(v);if(!S)continue;h.symbol=S.toJSON(),f.hasVisualVariables()&&c.applyVisualVariables(h.symbol,{renderer:f,graphic:v,symbol:S})}if(h.symbol&&(h.symbol.angle||delete h.symbol.angle,h.symbol.path?h.symbol=this._convertSvgToPictureMarkerSymbolJson(h.symbol):h.symbol.text&&delete h.attributes),t&&t.renderer&&"simple"===t.renderer.type)delete h.attributes;else if(m.length){var x={};m.forEach(function(e){h.attributes&&h.attributes.hasOwnProperty(e)&&(x[e]=h.attributes[e])}),h.attributes=x}"polygon"===v.geometry.type?a.featureSet.features.push(h):"polyline"===v.geometry.type?n.featureSet.features.push(h):"point"===v.geometry.type?h.symbol&&h.symbol.text?u.featureSet.features.push(h):l.featureSet.features.push(h):"multipoint"===v.geometry.type?o.featureSet.features.push(h):"extent"===v.geometry.type&&(h.geometry=i.fromExtent(v.geometry).toJSON(),a.featureSet.features.push(h))}}var _=[a,n,o,l,u].filter(function(e){return e.featureSet.features.length>0});return _.forEach(function(e){var r=e.featureSet.features.every(function(e){return e.symbol});(r||y)&&e.featureSet.features.forEach(function(e){delete e.attributes}),r&&delete e.layerDefinition.drawingInfo,e.layerDefinition.drawingInfo&&e.layerDefinition.drawingInfo.renderer&&this._convertSvgRenderer(e.layerDefinition.drawingInfo.renderer)},this),_.length?{featureCollection:{layers:_}}:null},_convertSvgToPictureMarkerSymbolJson:function(e){this._canvasParent||(this._canvasParent=l.create("div"),this._canvasSurface=o.createSurface(this._canvasParent,200,200));var r=this._canvasSurface.createObject(o.Path,e.path).setFill(e.color).setStroke(e.outline);"pendingRender"in this._canvasSurface&&this._canvasSurface._render(!0);var t=this._canvasSurface.rawNode.getContext("2d"),i=r.getBoundingBox(),a=Math.ceil(i.width+i.x),n=Math.ceil(i.height+i.y),s=t.getImageData(i.x,i.y,a,n);t.canvas.width=a,t.canvas.height=n,t.putImageData(s,0,0);return{type:"esriPMS",imageData:t.canvas.toDataURL("image/png").substr(22),angle:-e.angle,contentType:"image/png",height:e.size?e.size:n-i.y,width:e.size?e.size:a-i.x,xoffset:e.xoffset,yoffset:e.yoffset}},_convertSvgRenderer:function(e){var r=e.type;if("simple"===r&&p(e.symbol))return void(e.symbol=this._convertSvgToPictureMarkerSymbolJson(e.symbol));if("unique-value"===r||"class-breaks"===r){var t="unique-value"===r?"uniqueValueInfos":"classBreakInfos",i=e[t];p(e.defaultSymbol)&&(e.defaultSymbol=this._convertSvgToPictureMarkerSymbolJson(e.defaultSymbol)),i&&i.forEach(function(e){p(e)&&(e.symbol=this._convertSvgToPictureMarkerSymbolJson(e.symbol))},this)}},_getGraphics:function(e,r){var t;return e.whenLayerView(r).then(function(e){return e.queryGraphics&&e.queryGraphics()||e.featuresView.graphics}).then(function(e){t=e}),t},_getPrintDefinition:function(e,r){var t=e.view,i=t.map,a=t.spatialReference,n={operationalLayers:this._createOperationalLayers(t,r)},s=this._vtlExtent||e.extent||t.extent;return a&&a.isWrappable&&(s=s.clone()._normalize(!0),a=s.spatialReference),n.mapOptions={extent:s&&s.toJSON(),spatialReference:a&&a.toJSON(),showAttribution:r.attributionVisible},this._vtlExtent=null,t.rotation&&(n.mapOptions.rotation=-t.rotation),r.preserveScale&&(n.mapOptions.scale=r.outScale||t.scale),i.timeExtent&&(n.mapOptions.time=[i.timeExtent.startTime.getTime(),i.timeExtent.endTime.getTime()]),n},_handleExecuteResponse:function(e){return"sync"===this.mode?e.results&&e.results[0]&&e.results[0].value:this._geoprocessor.getResultData(e.jobId,"Output_File").then(function(e){return e.value})},_setPrintParams:function(e){var r=e.template||new y;null==r.showLabels&&(r.showLabels=!0);var t,i=r.exportOptions;if(i){t={dpi:i.dpi};var a=h.toJSON(r.layout);if("map_only"===a.toLowerCase()||""===a){var n=i.width,l=i.height;t.outputSize=[n,l]}}var o,u=r.layoutOptions;if(u){var c,d;"Miles"===u.scalebarUnit||"Kilometers"===u.scalebarUnit?(c="Kilometers",d="Miles"):"Meters"!==u.scalebarUnit&&"Feet"!==u.scalebarUnit||(c="Meters",d="Feet"),o={titleText:u.titleText,authorText:u.authorText,copyrightText:u.copyrightText,customTextElements:u.customTextElements,scaleBarOptions:{metricUnit:m.toJSON(c),metricLabel:f[c],nonMetricUnit:m.toJSON(d),nonMetricLabel:f[d]}}}var p=null;u&&u.legendLayers&&(p=u.legendLayers.map(function(e){this._legendLayerNameMap[e.layerId]=e.title;var r={id:e.layerId};return e.subLayerIds&&(r.subLayerIds=e.subLayerIds),r},this));var g=this._getPrintDefinition(e,r);if(g.operationalLayers){var b,v=new RegExp("[\\u4E00-\\u9FFF\\u0E00-\\u0E7F\\u0900-\\u097F\\u3040-\\u309F\\u30A0-\\u30FF\\u31F0-\\u31FF]"),S=/[\u0600-\u06FF]/,x=function(e){var r=e.text,t=e.font,i=t&&t.family&&t.family.toLowerCase();r&&t&&("arial"===i||"arial unicode ms"===i)&&(t.family=v.test(r)?"Arial Unicode MS":"Arial","normal"!==t.style&&S.test(r)&&(t.family="Arial Unicode MS"))};g.operationalLayers.forEach(function(e){e.featureCollection&&e.featureCollection.layers&&e.featureCollection.layers.forEach(function(e){e.layerDefinition&&e.layerDefinition.drawingInfo&&e.layerDefinition.drawingInfo.renderer&&e.layerDefinition.drawingInfo.renderer.symbol&&(b=e.layerDefinition.drawingInfo.renderer,"esriTS"===b.symbol.type&&x(b.symbol)),e.featureSet&&e.featureSet.features&&e.featureSet.features.forEach(function(e){e.symbol&&"esriTS"===e.symbol.type&&x(e.symbol)})})})}e.outSpatialReference&&(g.mapOptions.spatialReference=e.outSpatialReference.toJSON()),s.mixin(g,{exportOptions:t,layoutOptions:o}),s.mixin(g.layoutOptions,{legendOptions:{operationalLayers:null!=p?p:this._legendLayers}});var _=JSON.stringify(g),L={Web_Map_as_JSON:_,Format:r.format,Layout_Template:a};return e.extraParameters&&s.mixin(L,e.extraParameters),L}})});