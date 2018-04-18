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

define(["require","exports","../core/tsSupport/assignHelper","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","../core/tsSupport/paramHelper","dojo/_base/kernel","dojo/_base/lang","dojo/_base/url","dojo/promise/all","../config","../kernel","../request","../core/Error","../core/global","../core/JSONSupport","../core/Loadable","../core/promiseUtils","../core/urlUtils","../core/accessorSupport/decorators","../geometry/Extent","./PortalQueryParams","./PortalQueryResult","./PortalUser"],function(t,e,r,o,n,p,a,u,i,l,s,y,d,c,h,f,m,v,P,g,S,b,_,O){var U,G={Bookmark:function(){return v.create(function(e){return t(["./Bookmark"],e)})},Portal:function(){return v.create(function(e){return t(["./Portal"],e)})},PortalFolder:function(){return v.create(function(e){return t(["./PortalFolder"],e)})},PortalGroup:function(){return v.create(function(e){return t(["./PortalGroup"],e)})},PortalItem:function(){return v.create(function(e){return t(["./PortalItem"],e)})},PortalQueryParams:function(){return v.create(function(e){return t(["./PortalQueryParams"],e)})},PortalQueryResult:function(){return v.create(function(e){return t(["./PortalQueryResult"],e)})},PortalRating:function(){return v.create(function(e){return t(["./PortalRating"],e)})},PortalUser:function(){return v.create(function(e){return t(["./PortalUser"],e)})}};return function(e){function f(t){var r=e.call(this)||this;return r.access=null,r.allSSL=!1,r.authMode="auto",r.authorizedCrossOriginDomains=null,r.basemapGalleryGroupQuery=null,r.bingKey=null,r.canListApps=!1,r.canListData=!1,r.canListPreProvisionedItems=!1,r.canProvisionDirectPurchase=!1,r.canSearchPublic=!1,r.canShareBingPublic=!1,r.canSharePublic=!1,r.canSignInArcGIS=!1,r.canSignInIDP=!1,r.colorSetsGroupQuery=null,r.commentsEnabled=!1,r.created=null,r.culture=null,r.customBaseUrl=null,r.defaultBasemap=null,r.defaultExtent=null,r.defaultVectorBasemap=null,r.description=null,r.eueiEnabled=!1,r.featuredGroups=null,r.featuredItemsGroupQuery=null,r.galleryTemplatesGroupQuery=null,r.livingAtlasGroupQuery=null,r.helperServices=null,r.homePageFeaturedContent=null,r.homePageFeaturedContentCount=null,r.httpPort=null,r.httpsPort=null,r.id=null,r.ipCntryCode=null,r.isPortal=!1,r.layerTemplatesGroupQuery=null,r.maxTokenExpirationMinutes=null,r.modified=null,r.name=null,r.portalHostname=null,r.portalMode=null,r.portalProperties=null,r.region=null,r.rotatorPanels=null,r.showHomePageDescription=!1,r.supportsHostedServices=!1,r.symbolSetsGroupQuery=null,r.templatesGroupQuery=null,r.units=null,r.url=s.portalUrl,r.urlKey=null,r.user=null,r.useStandardizedQuery=!1,r.useVectorBasemaps=!1,r.vectorBasemapGalleryGroupQuery=null,r}return o(f,e),m=f,f.prototype.normalizeCtorArgs=function(t){return"string"==typeof t?{url:t}:t},f.prototype.destroy=function(){this._esriId_credentialCreateHandle&&(this._esriId_credentialCreateHandle.remove(),this._esriId_credentialCreateHandle=null)},f.prototype.readAuthorizedCrossOriginDomains=function(t){if(t)for(var e=0,r=t;e<r.length;e++){var o=r[e],n=o;P.hasProtocol(n)||(n=P.appUrl.scheme+"://"+n),P.canUseXhr(n)||s.request.corsEnabledServers.push({host:o,withCredentials:!0})}return t},f.prototype.readDefaultBasemap=function(t){if(t){var e=U.fromJSON(t);return e.portalItem={portal:this},e}return null},f.prototype.readDefaultVectorBasemap=function(t){if(t){var e=U.fromJSON(t);return e.portalItem={portal:this},e}return null},Object.defineProperty(f.prototype,"extraQuery",{get:function(){var t=this.user&&this.user.orgId,e=!t||this.canSearchPublic;return this.id&&!e?" AND orgid:"+this.id:null},enumerable:!0,configurable:!0}),Object.defineProperty(f.prototype,"isOrganization",{get:function(){return!!this.access},enumerable:!0,configurable:!0}),Object.defineProperty(f.prototype,"restUrl",{get:function(){var t=this.url;if(t){var e=t.indexOf("/sharing");t=e>0?t.substring(0,e):this.url.replace(/\/+$/,""),t+="/sharing/rest"}return t},enumerable:!0,configurable:!0}),Object.defineProperty(f.prototype,"thumbnailUrl",{get:function(){var t=this.restUrl,e=this.thumbnail;return t&&e?this._normalizeSSL(t+"/portals/self/resources/"+e):null},enumerable:!0,configurable:!0}),f.prototype.readUrlKey=function(t){return t?t.toLowerCase():t},f.prototype.readUser=function(t){var e=null;return t&&(e=O.fromJSON(t),e.portal=this),e},f.prototype.load=function(){var e=this,r=v.create(function(e){return t(["../Basemap"],e)}).then(function(t){U=t}).then(function(){return e._fetchSelf()}).then(function(t){if(y.id){var r=y.id;e.credential=r.findCredential(e.restUrl),e.credential||e.authMode!==m.AUTH_MODE_AUTO||(e._esriId_credentialCreateHandle=r.on("credential-create",function(){r.findCredential(e.restUrl)&&e._signIn()}))}e.read(t)});return this.addResolvingPromise(r),this.when()},f.prototype.fetchBasemaps=function(t){var e=new b;return e.query=t||(this.useVectorBasemaps?this.vectorBasemapGalleryGroupQuery:this.basemapGalleryGroupQuery),e.disableExtraQuery=!0,this.queryGroups(e).then(function(t){if(e.num=100,e.query='type:"Web Map" -type:"Web Application"',t.total){var r=t.results[0];return e.sortField=r.sortField||"name",e.sortOrder=r.sortOrder||"desc",r.queryItems(e)}return null}).then(function(t){return t&&t.total?t.results.filter(function(t){return"Web Map"===t.type}).map(function(t){return new U({portalItem:t})}):[]})},f.prototype.fetchFeaturedGroups=function(){var t=this.featuredGroups,e=new b;if(e.num=100,e.sortField="title",t&&t.length){for(var r=[],o=0,n=t;o<n.length;o++){var p=n[o];r.push('(title:"'+p.title+'" AND owner:'+p.owner+")")}return e.query=r.join(" OR "),this.queryGroups(e).then(function(t){return t.results})}return v.resolve([])},f.getDefault=function(){return m._default||(m._default=new m),m._default},f.prototype.queryGroups=function(t){return this._queryPortal("/community/groups",t,"PortalGroup")},f.prototype.queryItems=function(t){return this._queryPortal("/search",t,"PortalItem")},f.prototype.queryUsers=function(t){return t.sortField||(t.sortField="username"),this._queryPortal("/community/users",t,"PortalUser")},f.prototype.toJSON=function(){throw new c("internal:not-yet-implemented","Portal.toJSON is not yet implemented")},f.prototype._fetchSelf=function(t){void 0===t&&(t=this.authMode);var e=this.restUrl+"/portals/self",r={authMode:t,query:{culture:a.locale}};return"auto"===r.authMode&&(r.authMode="no-prompt"),this._request(e,r)},f.prototype._queryPortal=function(t,e,r){var o=this,n=function(r){return o._request(o.restUrl+t,e.toRequestOptions(o)).then(function(t){var n=e.clone();return n.start=t.nextStart,new _({nextQueryParams:n,queryParams:e,total:t.total,results:m._resultsToTypedArray(r,{portal:o},t)})}).then(function(t){return l(t.results.map(function(e){return"function"==typeof e.when?e.when():t})).always(function(){return t})})};return r&&G[r]?G[r]().then(function(t){return n(t)}):n()},f.prototype._signIn=function(){var t=this;if(this.authMode===m.AUTH_MODE_ANONYMOUS)return v.reject(new c("portal:invalid-auth-mode",'Current "authMode"\' is "'+this.authMode+'"'));if("failed"===this.loadStatus)return v.reject(this.loadError);var e=function(e){return v.resolve().then(function(){return"not-loaded"===t.loadStatus?(e||(t.authMode="immediate"),t.load().then(function(){return null})):"loading"===t.loadStatus?t.load().then(function(){return t.credential?null:(t.credential=e,t._fetchSelf("immediate"))}):t.user&&t.credential===e?null:(t.credential=e,t._fetchSelf("immediate"))}).then(function(e){e&&t.read(e)})};return y.id?y.id.getCredential(this.restUrl).then(function(t){return e(t)}):e(this.credential)},f.prototype._normalizeSSL=function(t){var e=this.allSSL;if(e||("isSecureContext"in h?e=h.isSecureContext:h.location&&h.location.origin&&(e=0===h.location.origin.indexOf("https:"))),this.isPortal){var r=new i(t);return this.portalHostname.toLowerCase().indexOf(r.host.toLowerCase())>-1&&r.port&&"80"!==r.port&&"443"!==r.port?e?"https://"+r.host+(this.httpsPort&&443!==this.httpsPort?":"+this.httpsPort:"")+r.path+"?"+r.query:"http://"+r.host+(this.httpPort&&80!==this.httpPort?":"+this.httpPort:"")+r.path+"?"+r.query:e?t.replace("http:","https:"):t}return e?t.replace("http:","https:"):t},f.prototype._normalizeUrl=function(t){var e=this.credential&&this.credential.token;return this._normalizeSSL(e?t+(t.indexOf("?")>-1?"&":"?")+"token="+e:t)},f.prototype._requestToTypedArray=function(e,r,o){var n=this,p=function(t){return n._request(e,r).then(function(e){var r=m._resultsToTypedArray(t,{portal:n},e);return l(r.map(function(t){return"function"==typeof t.when?t.when():e})).always(function(){return r})})};return o?v.create(function(e){return t(["./"+o],e)}).then(function(t){return p(t)}):p()},f.prototype._request=function(t,e){var o=this.authMode===m.AUTH_MODE_ANONYMOUS?"anonymous":"auto",n=null,p="auto",a={f:"json"},u="json";e&&(e.authMode&&(o=e.authMode),e.body&&(n=e.body),e.method&&(p=e.method),e.query&&(a=r({},a,e.query)),e.responseType&&(u=e.responseType));var i={authMode:o,body:n,callbackParamName:"callback",method:p,query:a,responseType:u,timeout:0};return d(this._normalizeSSL(t),i).then(function(t){return t.data})},f._resultsToTypedArray=function(t,e,r){var o;return r?(o=r.listings||r.notifications||r.userInvitations||r.tags||r.items||r.groups||r.comments||r.provisions||r.results||r.relatedItems||r,(t||e)&&(o=o.map(function(r){var o=u.mixin(t?t.fromJSON(r):r,e);return"function"==typeof o.load&&o.load(),o}))):o=[],o},f.AUTH_MODE_ANONYMOUS="anonymous",f.AUTH_MODE_AUTO="auto",f.AUTH_MODE_IMMEDIATE="immediate",n([g.property()],f.prototype,"access",void 0),n([g.property()],f.prototype,"allSSL",void 0),n([g.property()],f.prototype,"authMode",void 0),n([g.property()],f.prototype,"authorizedCrossOriginDomains",void 0),n([g.reader("authorizedCrossOriginDomains")],f.prototype,"readAuthorizedCrossOriginDomains",null),n([g.property()],f.prototype,"basemapGalleryGroupQuery",void 0),n([g.property()],f.prototype,"bingKey",void 0),n([g.property()],f.prototype,"canListApps",void 0),n([g.property()],f.prototype,"canListData",void 0),n([g.property()],f.prototype,"canListPreProvisionedItems",void 0),n([g.property()],f.prototype,"canProvisionDirectPurchase",void 0),n([g.property()],f.prototype,"canSearchPublic",void 0),n([g.property()],f.prototype,"canShareBingPublic",void 0),n([g.property()],f.prototype,"canSharePublic",void 0),n([g.property()],f.prototype,"canSignInArcGIS",void 0),n([g.property()],f.prototype,"canSignInIDP",void 0),n([g.property()],f.prototype,"colorSetsGroupQuery",void 0),n([g.property()],f.prototype,"commentsEnabled",void 0),n([g.property({type:Date})],f.prototype,"created",void 0),n([g.property()],f.prototype,"credential",void 0),n([g.property()],f.prototype,"culture",void 0),n([g.property()],f.prototype,"customBaseUrl",void 0),n([g.property()],f.prototype,"defaultBasemap",void 0),n([g.reader("defaultBasemap")],f.prototype,"readDefaultBasemap",null),n([g.property({type:S})],f.prototype,"defaultExtent",void 0),n([g.property()],f.prototype,"defaultVectorBasemap",void 0),n([g.reader("defaultVectorBasemap")],f.prototype,"readDefaultVectorBasemap",null),n([g.property()],f.prototype,"description",void 0),n([g.property()],f.prototype,"eueiEnabled",void 0),n([g.property({dependsOn:["user","id","canSearchPublic"],readOnly:!0})],f.prototype,"extraQuery",null),n([g.property()],f.prototype,"featuredGroups",void 0),n([g.property()],f.prototype,"featuredItemsGroupQuery",void 0),n([g.property()],f.prototype,"galleryTemplatesGroupQuery",void 0),n([g.property()],f.prototype,"livingAtlasGroupQuery",void 0),n([g.property()],f.prototype,"helpBase",void 0),n([g.property()],f.prototype,"helperServices",void 0),n([g.property()],f.prototype,"helpMap",void 0),n([g.property()],f.prototype,"homePageFeaturedContent",void 0),n([g.property()],f.prototype,"homePageFeaturedContentCount",void 0),n([g.property()],f.prototype,"httpPort",void 0),n([g.property()],f.prototype,"httpsPort",void 0),n([g.property()],f.prototype,"id",void 0),n([g.property()],f.prototype,"ipCntryCode",void 0),n([g.property({dependsOn:["access"],readOnly:!0})],f.prototype,"isOrganization",null),n([g.property()],f.prototype,"isPortal",void 0),n([g.property()],f.prototype,"layerTemplatesGroupQuery",void 0),n([g.property()],f.prototype,"maxTokenExpirationMinutes",void 0),n([g.property({type:Date})],f.prototype,"modified",void 0),n([g.property()],f.prototype,"name",void 0),n([g.property()],f.prototype,"portalHostname",void 0),n([g.property()],f.prototype,"portalMode",void 0),n([g.property()],f.prototype,"portalProperties",void 0),n([g.property()],f.prototype,"region",void 0),n([g.property({dependsOn:["url"],readOnly:!0})],f.prototype,"restUrl",null),n([g.property()],f.prototype,"rotatorPanels",void 0),n([g.property()],f.prototype,"showHomePageDescription",void 0),n([g.property()],f.prototype,"staticImagesUrl",void 0),n([g.property()],f.prototype,"stylesGroupQuery",void 0),n([g.property()],f.prototype,"supportsHostedServices",void 0),n([g.property()],f.prototype,"symbolSetsGroupQuery",void 0),n([g.property()],f.prototype,"templatesGroupQuery",void 0),n([g.property()],f.prototype,"thumbnail",void 0),n([g.property({dependsOn:["restUrl","thumbnail"],readOnly:!0})],f.prototype,"thumbnailUrl",null),n([g.property()],f.prototype,"units",void 0),n([g.property()],f.prototype,"url",void 0),n([g.property()],f.prototype,"urlKey",void 0),n([g.reader("urlKey")],f.prototype,"readUrlKey",null),n([g.property()],f.prototype,"user",void 0),n([g.reader("user")],f.prototype,"readUser",null),n([g.property()],f.prototype,"useStandardizedQuery",void 0),n([g.property()],f.prototype,"useVectorBasemaps",void 0),n([g.property()],f.prototype,"vectorBasemapGalleryGroupQuery",void 0),n([p(1,g.cast(b))],f.prototype,"_queryPortal",null),f=m=n([g.subclass("esri.portal.Portal")],f);var m}(g.declared(f,m))});