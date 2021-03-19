/*!
 * @evecalm/message-hub v1.1.2
 * Copyright© 2021 Saiya https://github.com/oe/messagehub
 */
!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n((e="undefined"!=typeof globalThis?globalThis:e||self).MessageHub={})}(this,(function(e){"use strict";var n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,n){e.__proto__=n}||function(e,n){for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(e[t]=n[t])})(e,t)};function t(e,n,t,o){return new(t||(t=Promise))((function(r,s){function i(e){try{u(o.next(e))}catch(e){s(e)}}function a(e){try{u(o.throw(e))}catch(e){s(e)}}function u(e){var n;e.done?r(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(i,a)}u((o=o.apply(e,n||[])).next())}))}function o(e,n){var t,o,r,s,i={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return s={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function a(s){return function(a){return function(s){if(t)throw new TypeError("Generator is already executing.");for(;i;)try{if(t=1,o&&(r=2&s[0]?o.return:s[0]?o.throw||((r=o.return)&&r.call(o),0):o.next)&&!(r=r.call(o,s[1])).done)return r;switch(o=0,r&&(s=[2&s[0],r.value]),s[0]){case 0:case 1:r=s;break;case 4:return i.label++,{value:s[1],done:!1};case 5:i.label++,o=s[1],s=[0];continue;case 7:s=i.ops.pop(),i.trys.pop();continue;default:if(!(r=i.trys,(r=r.length>0&&r[r.length-1])||6!==s[0]&&2!==s[0])){i=0;continue}if(3===s[0]&&(!r||s[1]>r[0]&&s[1]<r[3])){i.label=s[1];break}if(6===s[0]&&i.label<r[1]){i.label=r[1],r=s;break}if(r&&i.label<r[2]){i.label=r[2],i.ops.push(s);break}r[2]&&i.ops.pop(),i.trys.pop();continue}s=n.call(e,i)}catch(e){s=[6,e],o=0}finally{t=r=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,a])}}}function r(){for(var e=0,n=0,t=arguments.length;n<t;n++)e+=arguments[n].length;var o=Array(e),r=0;for(n=0;n<t;n++)for(var s=arguments[n],i=0,a=s.length;i<a;i++,r++)o[r]=s[i];return o}var s=function(){function e(){this.instanceID=e.generateInstanceID(),this.eventHandlerMap=[["*",{}]],this.messageID=0}return e.generateInstanceID=function(){return Math.random().toString(36).slice(2)},e.prototype.on=function(e,n,t){var o,r,s=this.eventHandlerMap.find((function(n){return n[0]===e}));if("string"==typeof n?((o={})[n]=t,r=o):r=n,s){var i=s[1];s[1]="function"==typeof i||"function"==typeof r?r:Object.assign({},i,r)}else this.eventHandlerMap["*"===e?"unshift":"push"]([e,r])},e.prototype.off=function(e){var n=this.eventHandlerMap.findIndex((function(n){return n[0]===e}));-1!==n&&("*"===e?this.eventHandlerMap[n][1]={}:this.eventHandlerMap.splice(n,1))},e.prototype.onRequest=function(e,n){return t(this,void 0,void 0,(function(){var t,r,s,i,a,u,c;return o(this,(function(o){switch(o.label){case 0:if(o.trys.push([0,2,,3]),t=this.eventHandlerMap.find((function(n){return n[0]===e}))||this.eventHandlerMap[0],r=n.methodName,s=n.args,i=t&&t[1],a=void 0,"function"==typeof i?(a=i,s.unshift(r)):a=i&&i[r],"function"!=typeof a)throw console.warn("[MessageHub] no corresponding handler found for "+r+", message from",e),new Error("[MessageHub] no corresponding handler found for "+r);return[4,a.apply(null,s)];case 1:return u=o.sent(),[2,this.buildRespMessage(u,n,!0)];case 2:throw c=o.sent(),this.buildRespMessage(c,n,!1);case 3:return[2]}}))}))},e.prototype.emit=function(e,n){for(var t=this,o=[],r=2;r<arguments.length;r++)o[r-2]=arguments[r];var s=this.buildReqMessage(n,o);return this.sendMessage(e,s),new Promise((function(n,o){t.onResponse(e,s,(function(e){t.isResponse(s,e)&&(e.isSuccess?n(e.data):o(e.data))}))}))},e.prototype.sendMessage=function(e,n){throw new Error("you need to implements sendMessage in your own class")},e.prototype.onResponse=function(e,n,t){throw new Error("you need to implements onMessageReceived in your own class")},e.prototype.buildReqMessage=function(e,n){return function(e,n,t,o,r){return{fromInstance:e,toInstance:r,messageID:n,type:"request",methodName:t,args:o}}(this.instanceID,++this.messageID,e,n)},e.prototype.buildRespMessage=function(e,n,t){return function(e,n,t,o){return{fromInstance:e,toInstance:t.fromInstance,messageID:t.messageID,type:"response",isSuccess:o,data:n}}(this.instanceID,e,n,t)},e.prototype.isRequest=function(e){return Boolean(e&&e.fromInstance&&e.fromInstance!==this.instanceID&&e.toInstance&&e.toInstance!==this.instanceID&&e.messageID&&"request"===e.type)},e.prototype.isResponse=function(e,n){return e&&e&&n.toInstance===this.instanceID&&n.toInstance===e.fromInstance&&n.messageID===e.messageID&&"response"===n.type},e}();var i=self,a="undefined"==typeof document,u=[],c=new(function(e){function s(){var n=e.call(this)||this;return n.onMessageReceived=n.onMessageReceived.bind(n),n.proxyMessage=n.proxyMessage.bind(n),i.addEventListener("message",n.onMessageReceived),n}return function(e,t){function o(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(o.prototype=t.prototype,new o)}(s,e),s.prototype.on=function(n,t,o){e.prototype.on.call(this,n,t,o),n instanceof Worker&&!u.includes(n)&&(u.push(n),n.addEventListener("message",this.onMessageReceived))},s.prototype.off=function(n){if(e.prototype.off.call(this,n),n instanceof Worker){n.removeEventListener("message",this.onMessageReceived);var t=u.indexOf(n);t>-1&&u.splice(t,1)}},s.prototype.createDedicatedMessageHub=function(e){var n=this,t=e,o=function(){if(!t)throw new Error("peer is not set in dedicated message-hub")};return{setPeer:function(e){t=e},emit:function(e){for(var s=[],i=1;i<arguments.length;i++)s[i-1]=arguments[i];return o(),n.emit.apply(n,r([t,e],s))},on:function(e,r){var s;o();var i="string"==typeof e?((s={})[e]=r,s):e;n.on(t,i)},off:function(e){if(o(),!e)return n.off(t);var r=n.eventHandlerMap.find((function(e){return e[0]===t}));r&&delete r[e]}}},s.prototype.createProxy=function(e,n){if(a)throw new Error("[MessageHub] createProxy can only be used in a normal window context");if(i===e||i===n||e===n)throw new Error("[MessageHub] can not forward message to own");this.on(e,this.proxyMessage(n))},s.prototype.proxyMessage=function(e){var n=this;return function(){for(var t=[],o=0;o<arguments.length;o++)t[o]=arguments[o];return n.emit.apply(n,r([e],t))}},s.prototype.createProxyFor=function(e){this.createProxy(e,i.parent)},s.prototype.onMessageReceived=function(e){return t(this,void 0,void 0,(function(){var n,t,r,s;return o(this,(function(o){switch(o.label){case 0:if(n=e.data,!this.isRequest(n))return[2];t=e.source||e.currentTarget||i,o.label=1;case 1:return o.trys.push([1,3,,4]),[4,this.onRequest(t,n)];case 2:return r=o.sent(),[3,4];case 3:return s=o.sent(),r=s,[3,4];case 4:return this.sendMessage(t,r),[2]}}))}))},s.prototype.sendMessage=function(e,n){var t=[n];"function"==typeof Window&&e instanceof Window&&t.push("*"),e.postMessage.apply(e,t)},s.prototype.onResponse=function(e,n,t){var o=function(e){t(e.data),i.removeEventListener("message",o)};i.addEventListener("message",o)},s}(s));e.AbstractHub=s,e.postMessageHub=c,Object.defineProperty(e,"__esModule",{value:!0})}));
