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

define(["dojo/_base/lang","dojo/_base/array","dojo/date/locale","../../Color","../../core/numberUtils","dojo/i18n!dojo/cldr/nls/gregorian"],function(e,t,a,n,o,i){function r(e){return e&&t.map(e,function(e){return new n(e)})}function l(e,t,a){var n="";return 0===t?n=m.lt+" ":t===a&&(n=m.gt+" "),n+e}var s={},m={lte:"<=",gte:">=",lt:"<",gt:">",pct:"%",ld:"–"},u={millisecond:0,second:1,minute:2,hour:3,day:4,month:5,year:6},c={millisecond:{dateOptions:{formatLength:"long"},timeOptions:{formatLength:"medium"}},second:{dateOptions:{formatLength:"long"},timeOptions:{formatLength:"medium"}},minute:{dateOptions:{formatLength:"long"},timeOptions:{formatLength:"short"}},hour:{dateOptions:{formatLength:"long"},timeOptions:{formatLength:"short"}},day:{selector:"date",dateOptions:{formatLength:"long"}},month:{selector:"date",dateOptions:{formatLength:"long"}},year:{selector:"date",dateOptions:{selector:"year"}}},d={dateOptions:{formatLength:"short",fullYear:!0},timeOptions:{formatLength:"short"}};return e.mixin(s,{meterIn:{inches:1/.0254,feet:1/.3048,"us-feet":3.28084,yards:1/.9144,miles:1/1609.344,"nautical-miles":1/1852,millimeters:1e3,centimeters:100,decimeters:10,meters:1,kilometers:.001,"decimal-degrees":180/20015077},timelineDateFormatOptions:{selector:"date",dateOptions:{formatLength:"short",fullYear:!0}},formatDate:function(n,o){var r,l=[];null==n||n instanceof Date||(n=new Date(n)),o=o||{},o=e.mixin({},o);var s=o.selector?o.selector.toLowerCase():null,m=!s||s.indexOf("time")>-1,u=!s||s.indexOf("date")>-1;return m&&(o.timeOptions=o.timeOptions||d.timeOptions,o.timeOptions&&(o.timeOptions=e.mixin({},o.timeOptions),o.timeOptions.selector=o.timeOptions.selector||"time",l.push(o.timeOptions))),u&&(o.dateOptions=o.dateOptions||d.dateOptions,o.dateOptions&&(o.dateOptions=e.mixin({},o.dateOptions),o.dateOptions.selector=o.dateOptions.selector||"date",l.push(o.dateOptions))),l&&l.length?(l=t.map(l,function(e){return a.format(n,e)}),r=1==l.length?l[0]:i["dateTimeFormat-medium"].replace(/\'/g,"").replace(/\{(\d+)\}/g,function(e,t){return l[t]})):r=a.format(n),r},createColorStops:function(e){var a=e.values,n=e.colors,i=e.labelIndexes,r=e.isDate,m=e.dateFormatOptions;return t.map(a,function(e,u){var c=!i||t.indexOf(i,u)>-1,d=null;if(c){var p;p=r?s.formatDate(e,m):o.format(e),p&&(d=l(p,u,a.length-1))}return{value:e,color:n[u],label:d}})},updateColorStops:function(e){var a,n=e.stops,i=e.changes,r=e.isDate,m=e.dateFormatOptions,u=[],c=t.map(n,function(e){return e.value});t.forEach(i,function(e){u.push(e.index),c[e.index]=e.value}),a=o.round(c,{indexes:u}),t.forEach(n,function(e,t){if(e.value=c[t],null!=e.label){var i,u=null;i=r?s.formatDate(a[t],m):o.format(a[t]),i&&(u=l(i,t,n.length-1)),e.label=u}})},createClassBreakLabel:function(e){var t=e.minValue,a=e.maxValue,n=e.isFirstBreak,i=e.normalizationType,r=n?"":m.gt+" ",l="percent-of-total"===i?m.pct:"";return t=null==t?"":o.format(t),a=null==a?"":o.format(a),r+t+l+" "+m.ld+" "+a+l},setLabelsForClassBreaks:function(e){var a=e.classBreakInfos,n=e.classificationMethod,i=e.normalizationType,r=[];a&&a.length&&("standard-deviation"===n?console.log("setLabelsForClassBreaks: cannot set labels for class breaks generated using 'standard-deviation' method."):e.round?(r.push(a[0].minValue),t.forEach(a,function(e){r.push(e.maxValue)}),r=o.round(r),t.forEach(a,function(e,t){e.label=s.createClassBreakLabel({minValue:0===t?r[0]:r[t],maxValue:r[t+1],isFirstBreak:0===t,normalizationType:i})})):t.forEach(a,function(e,t){e.label=s.createClassBreakLabel({minValue:e.minValue,maxValue:e.maxValue,isFirstBreak:0===t,normalizationType:i})}))},updateClassBreak:function(e){var t,a=e.classBreaks,n=e.classificationMethod,o=e.normalizationType,i=e.change,r=i.index,l=i.value,m=-1,u=-1,c=a.length;if("standard-deviation"===n)return void console.log("updateClassBreak: cannot update labels for class breaks generated using 'standard-deviation' method.");0===r?m=r:r===c?u=r-1:(u=r-1,m=r),m>-1&&m<c&&(t=a[m],t.minValue=l,t.label=s.createClassBreakLabel({minValue:t.minValue,maxValue:t.maxValue,isFirstBreak:0===m,normalizationType:o})),u>-1&&u<c&&(t=a[u],t.maxValue=l,t.label=s.createClassBreakLabel({minValue:t.minValue,maxValue:t.maxValue,isFirstBreak:0===u,normalizationType:o}))},calculateDateFormatInterval:function(e){var a,n,o,i,r,l,s,m,c,d,p=e.length,f=1/0;for(e=t.map(e,function(e){return new Date(e)}),a=0;a<p-1;a++){for(o=e[a],r=[],m=1/0,c="",n=a+1;n<p;n++)i=e[n],l=o.getFullYear()!==i.getFullYear()&&"year"||o.getMonth()!==i.getMonth()&&"month"||o.getDate()!==i.getDate()&&"day"||o.getHours()!==i.getHours()&&"hour"||o.getMinutes()!==i.getMinutes()&&"minute"||o.getSeconds()!==i.getSeconds()&&"second"||"millisecond",s=u[l],s<m&&(m=s,c=l),r.push(l);m<f&&(f=m,d=c)}return d},createUniqueValueLabel:function(e){var t=e.value,a=e.fieldInfo,n=e.domain,i=e.dateFormatInterval,r=String(t),l=n&&n.codedValues?n.getName(t):null;return l?r=l:"number"==typeof t&&(r=a&&"date"===a.type?s.formatDate(t,i&&c[i]):o.format(t)),r},cloneColorVariable:function(a){var o;return a&&(o=e.mixin({},a),o.colors=r(o.colors),o.stops=o.stops&&t.map(o.stops,function(t){return t=e.mixin({},t),t.color&&(t.color=new n(t.color)),t}),o.legendOptions&&(o.legendOptions=e.mixin({},o.legendOptions))),o},cloneOpacityVariable:function(a){var n;if(a){n=e.mixin({},a);var o=n.opacityValues;o&&(n.opacityValues=o.slice(0)),o=n.stops,o&&(n.stops=t.map(o,function(t){return e.mixin({},t)})),o=n.legendOptions,o&&(n.legendOptions=e.mixin({},o))}return n},cloneSizeVariable:function(a){var n;if(a){n=e.mixin({},a),n.stops&&(n.stops=t.map(n.stops,function(t){return e.mixin({},t)}));var o=n.minSize;o&&"object"==typeof o&&(n.minSize=s.cloneSizeVariable(o)),o=n.maxSize,o&&"object"==typeof o&&(n.maxSize=s.cloneSizeVariable(o)),o=n.legendOptions,o&&(n.legendOptions=e.mixin({},o),(o=o.customValues)&&(n.legendOptions.customValues=o.slice(0)))}return n}}),s});