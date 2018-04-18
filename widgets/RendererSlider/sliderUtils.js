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

define(["require","../../core/numberUtils","dojo/i18n!./nls/RendererSlider","dojo/_base/array","dojo/_base/lang","dojo/dom-style","dojo/string","dijit/Tooltip","dojox/gfx"],function(e,t,o,i,a,n,r,s,l){return{histogramXAvgPadding:18,labelTopOffset:3,generateTransparentBackground:function(e,t,o,i){var a=e.createRect({width:t,height:o}).setFill(i?this.getTransparentFill():null);return a.moveToBack(),a},getTransparentFill:function(){return{type:"pattern",x:0,y:0,width:16,height:16,src:"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgaGVpZ2h0PSIxNiIgd2lkdGg9IjE2Ij48cGF0aCBkPSJNMCAwIEw4IDAgTDggOCBMMCA4IFoiIGZpbGw9IiNjY2MiIC8+PHBhdGggZD0iTTAgMCBMOCAwIEw4IDggTDAgOCBaIiBmaWxsPSIjZmZmIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLDgpIiAvPjxwYXRoIGQ9Ik0wIDAgTDggMCBMOCA4IEwwIDggWiIgZmlsbD0iI2NjYyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoOCw4KSIgLz48cGF0aCBkPSJNMCAwIEw4IDAgTDggOCBMMCA4IFoiIGZpbGw9IiNmZmYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDgsMCkiIC8+PC9zdmc+"}},generateHistogramSurface:function(e,t,o,i){var a=l.createSurface(e,t,o);return n.set(a.rawNode,{overflow:"visible",display:"inline-block",left:i+"px"}),a.rawNode.setAttribute("class","esri-histogram-surface"),a},generateCountTooltips:function(e,t){var n,l=[];return n=i.map(e.bins,function(e){return"object"==typeof e?e.count:e}),n.reverse(),i.forEach(n,a.hitch(this,function(e,i){l.push(new s({connectId:[t.children[i].rawNode],label:r.substitute(o.count,{count:e})}))})),l},generateHistogram:function(e,t,o,r,s){var c,d,g,p,u=e.createGroup();return u.rawNode.setAttribute("class","esri-histogram-group"),c=i.map(t.bins,function(e){return"object"==typeof e?e.count:e}),c.reverse(),d=e.getDimensions().height/c.length,i.forEach(c,a.hitch(this,function(e,t){g=e>0?(o-this.histogramXAvgPadding)*(e/Math.max.apply(Math,c)):0,p=u.createRect({width:g,height:d}).setFill("#aaa").setTransform(l.matrix.translate(0,d*t)),p.rawNode.setAttribute("class","esri-histogram-bar"),p.rawNode.setAttribute("shape-rendering","crispEdges")})),n.set(e.rawNode,{display:"inline-block",left:r+"px"}),s||u.setTransform({dx:o,dy:0,xx:-1,xy:0,yx:0,yy:1}),u},generateAvgLine:function(i,a,l,c,d,g,p){var u,h,b,f=i.rawNode.getAttribute("width"),m=i.rawNode.getAttribute("height"),x=Math.round(l);return u=i.createLine({x1:d?0:14,y1:x,x2:d?f-this.histogramXAvgPadding+4:f,y2:x}).setStroke({color:"#667"}).moveToBack(),u.rawNode.setAttribute("shape-rendering","crispEdges"),h=i.createImage({x:d?f-this.histogramXAvgPadding+4+2:0,y:x-8,width:14,height:18,src:e.toUrl("./xAvg.svg")}),g?a=a:p?a=t.format(parseFloat(a.toFixed(2))).toString()+"%":(c=c<2?2:c,a=t.format(parseFloat(a.toFixed(c))).toString()),b=new s({connectId:[h.rawNode],label:r.substitute(o.statsAvg,{avg:a})}),x>m||x<0?(n.set(u.rawNode,"display","none"),n.set(h.rawNode,"display","none")):(n.set(u.rawNode,"display","block"),n.set(h.rawNode,"display","block")),{avgHandleLine:u,avgHandleImage:h,avgHandleTooltip:b}},getCombinedPrecision:function(e,t){var o=this.getPrecision(e),i=this.getPrecision(t);return e>-10&&e<10&&t>-10&&t<10&&o<2&&i<2?2:o>i?o:i},getPrecision:function(e){if(isNaN(e))return 0;for(var t,o=1;Math.round(e*o)/o!==e;)o*=10;return t=Math.round(Math.log(o)/Math.LN10),t>20?20:t},_resetLabelPositions:function(e){i.forEach(e,function(e){e&&e.labelNode&&(n.set(e.labelNode,"top","3px"),e.labelNode._autoPositioned=!1)})},_autoPositionHandleLabels:function(e){var t=[];if(0!==e.length&&(this._resetLabelPositions(e),i.forEach(e,function(e,o){e&&e.labelNode&&t.push({index:o,handle:e,label:e.labelNode,rect:e.labelNode.getBoundingClientRect()})}),0!==t.length))switch(t.length){case 1:break;case 2:this._autoPositionTwoHandles(e,t);break;case 3:this._autoPositionThreeHandles(e,t);break;default:this._autoPositionManyHandles(e,t)}},_autoPositionTwoHandles:function(e,t){var o,i,a,r;this.collisionCheck(t[0].rect,t[1].rect)&&(o=t[0].rect.top-t[1].rect.top,i=(t[0].rect.height-o)/2,a=this.labelTopOffset+i,r=this.labelTopOffset-i,n.set(t[0].label,"top",a+"px"),n.set(t[1].label,"top",r+"px"),t[0].label._autoPositioned=!0,t[1].label._autoPositioned=!0)},_autoPositionThreeHandles:function(e,t){var o,r,s,l,c,d,g;if(i.forEach(t,a.hitch(this,function(e,i){(g=t[i-1])&&g.rect&&this.collisionCheck(e.rect,g.rect)&&(e.label._autoPositioned&&!g.label._autoPositioned?(o=g.rect.top-e.rect.top,s=e.rect.height,l=s-o+this.labelTopOffset,n.set(g.label,"top",l+"px"),g.label._autoPositioned=!0):!e.label._autoPositioned&&g.label._autoPositioned?(o=g.rect.top-e.rect.top,s=e.rect.height,l=-1*(s-o)+Number(g.label.style.top.replace("px","")),n.set(e.label,"top",l+"px"),e.label._autoPositioned=!0):(o=g.rect.top-e.rect.top,r=(e.rect.height-o)/2,c=this.labelTopOffset-r,d=this.labelTopOffset+r,n.set(g.label,"top",d+"px"),n.set(e.label,"top",c+"px"),g.label._autoPositioned=!0,e.label._autoPositioned=!0))})),t[2].handle&&t[2].handle.style.top.replace("px","")<10){var p,u,h,b,f=t[2].label,m=t[1].label,x=t[0].label,P=f.getBoundingClientRect(),w=m.getBoundingClientRect(),N=x.getBoundingClientRect();f._autoPositioned&&m._autoPositioned&&x._autoPositioned?(p=Number(f.style.top.replace("px",""))+8,u=Number(m.style.top.replace("px",""))+8,h=Number(x.style.top.replace("px",""))+8,n.set(f,"top",p+"px"),n.set(m,"top",u+"px"),n.set(x,"top",h+"px")):(f._autoPositioned&&(b=Number(f.style.top.replace("px",""))+4,n.set(f,"top",b+"px")),m._autoPositioned&&w.top-P.top<w.height&&(b=Number(m.style.top.replace("px",""))+4,n.set(m,"top",b+"px")),N.top-w.top<N.height&&(b=Number(x.style.top.replace("px",""))+4,n.set(x,"top",b+"px")))}},_autoPositionManyHandles:function(){},collisionCheck:function(e,t){return!(e.right<t.left||e.left>t.right||e.bottom<t.top||e.top>t.bottom)}}});