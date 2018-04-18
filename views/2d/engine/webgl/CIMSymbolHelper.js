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

define(["require","exports","./CIMSymbolDrawHelper","./SDFHelper","../../../vectorTiles/GeometryUtils"],function(e,r,a,o,t){Object.defineProperty(r,"__esModule",{value:!0});var i=function(){function e(){}return e.getEnvelope=function(e){if("CIMPointSymbol"!==e.type)return null;var r=new a.EnvDrawHelper,o={type:"point",x:0,y:0};return r.drawSymbol(e,o),r.envelope()},e.rasterize=function(e,r){var o=this.getEnvelope(r);if(!o||o.width<=0||o.height<=0)return[null,0,0,0,0];var t=(o.x+.5*o.width)*(96/72),i=-(o.y+.5*o.height)*(96/72);e.width=o.width*(96/72)+2,e.height=o.height*(96/72)+2;var s=e.getContext("2d"),n=a.Transformation.createScale(96/72,-96/72);n.translate(.5*e.width-t,.5*e.height-i);var l=new a.CanvasDrawHelper(s,n),h={type:"point",x:0,y:0};l.drawSymbol(r,h);for(var S,c=s.getImageData(0,0,e.width,e.height),d=new Uint8Array(c.data),m=0;m<d.length;m+=4)S=d[m+3]/255,d[m]=d[m]*S,d[m+1]=d[m+1]*S,d[m+2]=d[m+2]*S;return[d,e.width,e.height,t/e.width,i/e.height]},e.fromSimpleMarker=function(e){var r,a,o=e.style;if("circle"===o||"esriSMSCircle"===o){var i=Math.acos(.995),s=Math.ceil(t.C_PI/i/4);0===s&&(s=1),i=t.C_PI_BY_2/s,s*=4;var n=[];n.push([50,0]);for(var l=1;l<s;l++)n.push([50*Math.cos(l*i),-50*Math.sin(l*i)]);n.push([50,0]),r={rings:[n]},a={xmin:-50,ymin:-50,xmax:50,ymax:50}}else if("cross"===o||"esriSMSCross"===o){var h=10;r={rings:[[[h,50],[h,h],[50,h],[50,-h],[h,-h],[h,-50],[-h,-50],[-h,-h],[-50,-h],[-50,h],[-h,h],[-h,50],[h,50]]]},a={xmin:-50,ymin:-50,xmax:50,ymax:50}}else if("diamond"===o||"esriSMSDiamond"===o)r={rings:[[[-50,0],[0,50],[50,0],[0,-50],[-50,0]]]},a={xmin:-50,ymin:-50,xmax:50,ymax:50};else if("square"===o||"esriSMSSquare"===o)r={rings:[[[-50,-50],[-50,50],[50,50],[50,-50],[-50,-50]]]},a={xmin:-50,ymin:-50,xmax:50,ymax:50};else if("x"===o||"esriSMSX"===o){var h=14.142135623730951;r={rings:[[[0,h],[50-h,50],[50,50-h],[h,0],[50,h-50],[50-h,-50],[0,-h],[h-50,-50],[-50,h-50],[-h,0],[-50,50-h],[h-50,50],[0,h]]]},a={xmin:-50,ymin:-50,xmax:50,ymax:50}}else if("triangle"===o||"esriSMSTriangle"===o){var S=57.735026918962575,c=-S,d=2/3*100-100;r={rings:[[[c,d],[0,2/3*100],[S,d],[c,d]]]},a={xmin:c,ymin:d,xmax:S,ymax:2/3*100}}var m;if(r&&a){var g=[{type:"CIMSolidFill",enable:!0,color:e.color}];e.outline&&g.push({type:"CIMSolidStroke",enable:!0,width:e.outline.width,color:e.outline.color});var y={type:"CIMPolygonSymbol",symbolLayers:g};m={type:"CIMPointSymbol",symbolLayers:[{type:"CIMVectorMarker",enable:!0,rotation:e.angle,size:e.size,offsetX:e.xoffset,offsetY:e.yoffset,frame:a,markerGraphics:[{type:"CIMMarkerGraphic",geometry:r,symbol:y}]}]}}return m},e}();r.CIMSymbolHelper=i;var s=function(){function e(){}return e.rasterizeSimpleFill=function(e,r){"solid"!==r&&"none"!==r&&"esriSFSSolid"!==r&&"esriSFSNull"!==r||console.error("Unexpected: style does not require rasterization"),e.width=8,e.height=8;var a=e.getContext("2d");a.strokeStyle="#FFFFFF",a.beginPath(),"vertical"!==r&&"cross"!==r&&"esriSFSCross"!==r&&"esriSFSVertical"!==r||(a.moveTo(0,0),a.lineTo(0,8)),"horizontal"!==r&&"cross"!==r&&"esriSFSCross"!==r&&"esriSFSHorizontal"!==r||(a.moveTo(0,0),a.lineTo(8,0)),"forward-diagonal"!==r&&"diagonal-cross"!==r&&"esriSFSDiagonalCross"!==r&&"esriSFSForwardDiagonal"!==r||(a.moveTo(0,0),a.lineTo(8,8)),"backward-diagonal"!==r&&"diagonal-cross"!==r&&"esriSFSBackwardDiagonal"!==r&&"esriSFSDiagonalCross"!==r||(a.moveTo(8,0),a.lineTo(0,8)),a.stroke();for(var o,t=a.getImageData(0,0,e.width,e.height),i=new Uint8Array(t.data),s=0;s<i.length;s+=4)o=i[s+3]/255,i[s]=i[s]*o,i[s+1]=i[s+1]*o,i[s+2]=i[s+2]*o;return[i,e.width,e.height]},e.rasterizeSimpleLine=function(e,r){var a;switch(r){case"dash":case"esriSLSDash":a=[3,2];break;case"dash-dot":case"esriSLSDashDot":a=[2,2,0,2];break;case"dot":case"esriSLSDot":a=[0,3];break;case"long-dash":case"esriSLSLongDash":a=[6,3];break;case"long-dash-dot":case"esriSLSLongDashDot":a=[6,3,0,3];break;case"long-dash-dot-dot":case"esriSLSLongDashDotDot":a=[2,2,0,2,0,2];break;case"short-dash":case"esriSLSShortDash":a=[2,2];break;case"short-dash-dot":case"esriSLSShortDashDot":a=[2,2,0,2];break;case"short-dash-dot-dot":case"esriSLSShortDashDotDot":a=[2,2,0,2,0,2];break;case"short-dot":case"esriSLSShortDot":a=[0,2];break;case"solid":case"esriSLSSolid":case"none":throw new Error("Unexpected: style does not require rasterization")}for(var t=0,i=0,s=a;i<s.length;i++){var n=s[i];t+=n}for(var l=16*t,h=31*l,S=new Float32Array(h),c=0;c<h;++c)S[c]=257;for(var d=.5,m=.5,g=!0,y=0,v=a;y<v.length;y++){var n=v[y];d=m,m+=16*n;for(var f=d;f<m;){for(var u=.5;u<31;){var c=(31-u+.5+1)*l+f-.5,p=(u-15.5)*(u-15.5);S[c]=g?p:Math.min((f-d)*(f-d)+p,(f-m)*(f-m)+p),u++}f++}g=!g}for(var x=S.length,w=new Uint8Array(4*x),c=0;c<x;++c){var D=Math.sqrt(S[c])/15;o.packFloat(D,w,4*c)}return[w,l,31]},e}();r.SymbolHelper=s});