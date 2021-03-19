/*!
 * duplex-message
 * Copyright© 2021 Saiya https://github.com/oe/duplex-message
 */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).DuplexMessage={})}(this,(function(e){"use strict";var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])})(e,n)};function n(e,n){function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}function o(e,t,n,o){return new(n||(n=Promise))((function(r,s){function i(e){try{u(o.next(e))}catch(e){s(e)}}function a(e){try{u(o.throw(e))}catch(e){s(e)}}function u(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,a)}u((o=o.apply(e,t||[])).next())}))}function r(e,t){var n,o,r,s,i={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return s={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function a(s){return function(a){return function(s){if(n)throw new TypeError("Generator is already executing.");for(;i;)try{if(n=1,o&&(r=2&s[0]?o.return:s[0]?o.throw||((r=o.return)&&r.call(o),0):o.next)&&!(r=r.call(o,s[1])).done)return r;switch(o=0,r&&(s=[2&s[0],r.value]),s[0]){case 0:case 1:r=s;break;case 4:return i.label++,{value:s[1],done:!1};case 5:i.label++,o=s[1],s=[0];continue;case 7:s=i.ops.pop(),i.trys.pop();continue;default:if(!(r=i.trys,(r=r.length>0&&r[r.length-1])||6!==s[0]&&2!==s[0])){i=0;continue}if(3===s[0]&&(!r||s[1]>r[0]&&s[1]<r[3])){i.label=s[1];break}if(6===s[0]&&i.label<r[1]){i.label=r[1],r=s;break}if(r&&i.label<r[2]){i.label=r[2],i.ops.push(s);break}r[2]&&i.ops.pop(),i.trys.pop();continue}s=t.call(e,i)}catch(e){s=[6,e],o=0}finally{n=r=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,a])}}}function s(){for(var e=0,t=0,n=arguments.length;t<n;t++)e+=arguments[t].length;var o=Array(e),r=0;for(t=0;t<n;t++)for(var s=arguments[t],i=0,a=s.length;i<a;i++,r++)o[r]=s[i];return o}var i=function(){function e(){this.instanceID=e.generateInstanceID(),this.eventHandlerMap=[["*",{}]],this.messageID=0}return e.generateInstanceID=function(){return Math.random().toString(36).slice(2)},e.prototype.on=function(e,t,n){var o,r,s=this.eventHandlerMap.find((function(t){return t[0]===e}));if("string"==typeof t?((o={})[t]=n,r=o):r=t,s){var i=s[1];s[1]="function"==typeof i||"function"==typeof r?r:Object.assign({},i,r)}else this.eventHandlerMap["*"===e?"unshift":"push"]([e,r])},e.prototype.off=function(e){var t=this.eventHandlerMap.findIndex((function(t){return t[0]===e}));-1!==t&&("*"===e?this.eventHandlerMap[t][1]={}:this.eventHandlerMap.splice(t,1))},e.prototype.onRequest=function(e,t){return o(this,void 0,void 0,(function(){var n,o,s,i,a,u,c;return r(this,(function(r){switch(r.label){case 0:if(r.trys.push([0,2,,3]),n=this.eventHandlerMap.find((function(t){return t[0]===e}))||this.eventHandlerMap[0],o=t.methodName,s=t.args,i=n&&n[1],a=void 0,"function"==typeof i?(a=i,s.unshift(o)):a=i&&i[o],"function"!=typeof a)throw console.warn("[MessageHub] no corresponding handler found for "+o+", message from",e),new Error("[MessageHub] no corresponding handler found for "+o);return[4,a.apply(null,s)];case 1:return u=r.sent(),[2,this.buildRespMessage(u,t,!0)];case 2:throw c=r.sent(),this.buildRespMessage(c,t,!1);case 3:return[2]}}))}))},e.prototype._emit=function(e,t){for(var n=this,o=[],r=2;r<arguments.length;r++)o[r-2]=arguments[r];var s=this.buildReqMessage(t,o);return this.sendMessage(e,s),new Promise((function(t,o){n.listenResponse(e,s,(function(e){return!!n.isResponse(s,e)&&(e.isSuccess?t(e.data):o(e.data),!0)}))}))},e.prototype.sendMessage=function(e,t){throw new Error("you need to implements sendMessage in your own class")},e.prototype.listenResponse=function(e,t,n){throw new Error("you need to implements onMessageReceived in your own class")},e.prototype.buildReqMessage=function(e,t){return function(e,t,n,o,r){return{fromInstance:e,toInstance:r,messageID:t,type:"request",methodName:n,args:o}}(this.instanceID,++this.messageID,e,t)},e.prototype.buildRespMessage=function(e,t,n){return function(e,t,n,o){return{fromInstance:e,toInstance:n.fromInstance,messageID:n.messageID,type:"response",isSuccess:o,data:t}}(this.instanceID,e,t,n)},e.prototype.isRequest=function(e){return Boolean(e&&e.fromInstance&&e.fromInstance!==this.instanceID&&e.messageID&&"request"===e.type)},e.prototype.isResponse=function(e,t){return e&&e&&t.toInstance===this.instanceID&&t.toInstance===e.fromInstance&&t.messageID===e.messageID&&"response"===t.type},e}();var a=self,u="undefined"==typeof document,c=[],f=function(e){function t(){var t=e.call(this)||this;return t.onMessageReceived=t.onMessageReceived.bind(t),t.proxyMessage=t.proxyMessage.bind(t),a.addEventListener("message",t.onMessageReceived),t}return n(t,e),t.prototype.on=function(t,n,o){e.prototype.on.call(this,t,n,o),t instanceof Worker&&!c.includes(t)&&(c.push(t),t.addEventListener("message",this.onMessageReceived))},t.prototype.emit=function(e,t){for(var n=[],o=2;o<arguments.length;o++)n[o-2]=arguments[o];return this._emit(e,t,n)},t.prototype.off=function(t){if(e.prototype.off.call(this,t),t instanceof Worker){t.removeEventListener("message",this.onMessageReceived);var n=c.indexOf(t);n>-1&&c.splice(n,1)}},t.prototype.createDedicatedMessageHub=function(e){var t=this,n=e,o=function(){if(!n)throw new Error("peer is not set in dedicated message-hub")};return{setPeer:function(e){n=e},emit:function(e){for(var r=[],i=1;i<arguments.length;i++)r[i-1]=arguments[i];return o(),t.emit.apply(t,s([n,e],r))},on:function(e,r){var s;o();var i="string"==typeof e?((s={})[e]=r,s):e;t.on(n,i)},off:function(e){if(o(),!e)return t.off(n);var r=t.eventHandlerMap.find((function(e){return e[0]===n}));r&&delete r[e]}}},t.prototype.createProxy=function(e,t){if(u)throw new Error("[MessageHub] createProxy can only be used in a normal window context");if(a===e||a===t||e===t)throw new Error("[MessageHub] can not forward message to own");this.on(e,this.proxyMessage(t))},t.prototype.proxyMessage=function(e){var t=this;return function(){for(var n=[],o=0;o<arguments.length;o++)n[o]=arguments[o];return t.emit.apply(t,s([e],n))}},t.prototype.createProxyFor=function(e){this.createProxy(e,a.parent)},t.prototype.onMessageReceived=function(e){return o(this,void 0,void 0,(function(){var t,n,o,s;return r(this,(function(r){switch(r.label){case 0:if(t=e.data,!this.isRequest(t))return[2];n=e.source||e.currentTarget||a,r.label=1;case 1:return r.trys.push([1,3,,4]),[4,this.onRequest(n,t)];case 2:return o=r.sent(),[3,4];case 3:return s=r.sent(),o=s,[3,4];case 4:return this.sendMessage(n,o),[2]}}))}))},t.prototype.sendMessage=function(e,t){var n=[t];"function"==typeof Window&&e instanceof Window&&n.push("*"),e.postMessage.apply(e,n)},t.prototype.listenResponse=function(e,t,n){var o=!u&&e instanceof Worker?e:a,r=function(e){n(e.data)&&o.removeEventListener("message",r)};o.addEventListener("message",r)},t}(i),p=function(e){function t(){var t=this;if("undefined"==typeof window||"undefined"==typeof localStorage)throw new Error("StorageMessageHub only available in normal browser context, nodejs/worker are not supported");return(t=e.call(this)||this).responseCallbacks=[],t.onMessageReceived=t.onMessageReceived.bind(t),window.addEventListener("storage",t.onMessageReceived),t}return n(t,e),t.prototype.on=function(t,n){e.prototype.on.call(this,"*",t,n)},t.prototype.emit=function(t){for(var n=[],o=1;o<arguments.length;o++)n[o-1]=arguments[o];return e.prototype._emit.apply(this,s(["*",t],n))},t.prototype.off=function(){e.prototype.off.call(this,"*")},t.prototype.onMessageReceived=function(e){return o(this,void 0,void 0,(function(){var t,n,o,s;return r(this,(function(r){switch(r.label){case 0:if(!(t=this.getMsgFromEvent(e)))return[2];if(!this.isRequest(t))return(n=this.responseCallbacks.findIndex((function(e){return e(t)})))>=0&&this.responseCallbacks.splice(n,1),[2];setTimeout((function(){null!==localStorage.getItem(e.key)&&localStorage.removeItem(e.key)}),100+Math.floor(1e3*Math.random())),r.label=1;case 1:return r.trys.push([1,3,,4]),[4,this.onRequest("*",t)];case 2:return o=r.sent(),[3,4];case 3:return s=r.sent(),o=s,[3,4];case 4:return this.sendMessage("*",o),[2]}}))}))},t.prototype.sendMessage=function(e,t){var n=l(t);localStorage.setItem(n,JSON.stringify(t))},t.prototype.listenResponse=function(e,t,n){this.responseCallbacks.push((function(e){return!!n(e)&&(localStorage.removeItem(l(e)),!0)}))},t.prototype.getMsgFromEvent=function(e){if(e.key&&/^\$\$msghub\-/.test(e.key)&&e.newValue){var t;try{t=JSON.parse(e.newValue)}catch(e){return}return t}},t}(i);function l(e){return"$$msghub-"+e.type+"-"+e.fromInstance+"-"+(e.toInstance||"")+"-"+e.messageID}var d=function(e){function t(t){void 0===t&&(t="message-hub");var n=this;if("undefined"==typeof window||"undefined"==typeof localStorage)throw new Error("StorageMessageHub only available in normal browser context, nodejs/worker are not supported");return(n=e.call(this)||this).customEventName=t,n.responseCallbacks=[],n.onMessageReceived=n.onMessageReceived.bind(n),window.addEventListener(t,n.onMessageReceived),n}return n(t,e),t.prototype.on=function(t,n){e.prototype.on.call(this,"*",t,n)},t.prototype.emit=function(t){for(var n=[],o=1;o<arguments.length;o++)n[o-1]=arguments[o];return e.prototype._emit.apply(this,s(["*",t],n))},t.prototype.off=function(){e.prototype.off.call(this,"*")},t.prototype.onMessageReceived=function(e){return o(this,void 0,void 0,(function(){var t,n,o,s;return r(this,(function(r){switch(r.label){case 0:if(!(t=e.detail))return[2];if(!this.isRequest(t))return(n=this.responseCallbacks.findIndex((function(e){return e(t)})))>=0&&this.responseCallbacks.splice(n,1),[2];r.label=1;case 1:return r.trys.push([1,3,,4]),[4,this.onRequest("*",t)];case 2:return o=r.sent(),[3,4];case 3:return s=r.sent(),o=s,[3,4];case 4:return this.sendMessage("*",o),[2]}}))}))},t.prototype.sendMessage=function(e,t){var n=new CustomEvent(this.customEventName,{detail:t});window.dispatchEvent(n)},t.prototype.listenResponse=function(e,t,n){this.responseCallbacks.push(n)},t}(i);e.AbstractHub=i,e.PageScriptMessageHub=d,e.PostMessageHub=f,e.StorageMessageHub=p,Object.defineProperty(e,"__esModule",{value:!0})}));
