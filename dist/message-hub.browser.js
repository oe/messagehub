/*!
 * @evecalm/message-hub v0.1.1
 * Copyright© 2019 Saiya https://github.com/oe/messagehub
 */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.MessageHub=t()}(this,function(){"use strict";
/*!
     * Composie v0.1.0
     * Copyright© 2019 Saiya https://github.com/oe/composie#readme
     */class e{constructor(){this.wildcard=Math.random().toString(36).slice(2)+Math.random().toString(36).slice(2),this.middlewares={},this.routers={}}use(e,t){let s;return"function"==typeof e?(t=e,s=this.wildcard):s=e,this.addMiddleware(s,t),this}route(e,...t){return"string"==typeof e&&(e={[e]:t}),Object.keys(e).forEach(t=>{let s=e[t];Array.isArray(s)||(s=[s]),s.length&&(this.routers[t]||(this.routers[t]=[]),this.routers[t].push(...s))}),this}run(e,t){let s;const i=(s="string"==typeof e?this.createContext(e,t):e).channel,r=this.getMiddlewares(i),n=this.routers[i]||[];return r.push(...n),new Promise((e,t)=>{if(r.length){this.composeMiddlewares(r)(s).then(()=>e(s.response)).catch(t)}else console.warn("no corresponding router for",i),e()})}addMiddleware(e,t){let s=this.middlewares;if(e===this.wildcard)return this.middlewares[e]||(this.middlewares={[e]:{mdlws:[],children:s}}),void this.middlewares[e].mdlws.push(t);for(this.middlewares[this.wildcard]&&(s=this.middlewares[this.wildcard].children);s;){const i=Object.keys(s);let r=i.length,n=0,o="";for(;r--;){if((o=i[r])===e){n=1;break}if(0===e.indexOf(o)){n=2;break}if(0===o.indexOf(e)){n=3;break}}if(!n)break;if(1===n)return void s[o].mdlws.push(t);if(2===n){if(s[o].children){s=s[o].children;continue}return void(s[o].children={[e]:{mdlws:[t]}})}if(3===n){const i=s[o];return delete s[o],void(s[e]={mdlws:[t],children:{[o]:i}})}}s[e]={mdlws:[t]}}composeMiddlewares(e){return function(t,s){let i=-1;return function r(n){if(n<=i)return Promise.reject(new Error("next() called multiple times"));i=n;let o=e[n];n===e.length&&(o=s);if(!o)return Promise.resolve();try{return Promise.resolve(o(t,r.bind(null,n+1)))}catch(e){return Promise.reject(e)}}(0)}}createContext(e,t){return{channel:e,request:t}}getMiddlewares(e){let t=this.middlewares;const s=[];for(t[this.wildcard]&&(s.push(...t[this.wildcard].mdlws),t=t[this.wildcard].children);t;){const i=Object.keys(t).find(t=>-1!==e.indexOf(t));if(void 0===i)break;s.push(...t[i].mdlws),t=t[i].children}return s}}var t={channel:"THIS_IS_MESSAGE_SECRET_CHANNEL",id:-1};return function(){function s(s){if(this.count=0,this.isWorker=!1,this.targetOrigin="*",this.evtsCbs={},this.promisePairs={},this.isReady=!1,this.composie=new e,this.context=self,this.type=s.type,"worker"===s.type)if(this.isReady=!0,this.isWorker="undefined"==typeof document,this.isWorker)this.peer=self;else{if(!s.peer)throw new Error("[@evecalm/message-hub]a worker instance is required");this.peer=s.peer,this.context=s.peer}else{if("frame"!==s.type)throw new Error("unsupported type "+s.type);if(!s.peer)throw new Error("[@evecalm/message-hub]a peer window instance is required");if(s.peer===self)throw new Error("[@evecalm/message-hub] peer is the same of current context(window), use node module `composie` instead for messaging in the same context");this.peer=s.peer,s.targetOrigin&&(this.targetOrigin=s.targetOrigin)}this.onMessage=this.onMessage.bind(this),this.context.addEventListener("message",this.onMessage),this.isReady||this.emit(t.channel)}return s.prototype.ready=function(){var e=this;return this.context?this.isReady?Promise.resolve(this):new Promise(function(s,i){e.fetch(t.channel).then(function(){e.isReady=!0,s(e)},i)}):Promise.reject(new Error("This MessageHub instance has been destroyed"))},s.prototype.use=function(e){return this.composie&&this.composie.use(e),this},s.prototype.route=function(e){for(var t,s=[],i=1;i<arguments.length;i++)s[i-1]=arguments[i];return this.composie?("string"==typeof e?(t=this.composie).route.apply(t,[e].concat(s)):this.composie.route(e),this):this},s.prototype.fetch=function(e,t,s){var i={type:"request",channel:e,data:t,transfers:s};return this.postMessage(i,!0)},s.prototype.on=function(e,t){this.evtsCbs[e]||(this.evtsCbs[e]=[]),this.evtsCbs[e].push(t)},s.prototype.off=function(e,t){if(this.evtsCbs[e]&&this.evtsCbs[e].length)if(t){for(var s=this.evtsCbs[e],i=s.length;i--;)if(s[i]===t){s.splice(i,1);break}}else this.evtsCbs[e]=[]},s.prototype.emit=function(e,t,s){var i={type:"request",channel:e,data:t,transfers:s};this.postMessage(i,!1)},s.prototype.destroy=function(){this.context&&(this.context.removeEventListener("message",this.onMessage),this.evtsCbs={},this.composie=null,"worker"===this.type&&(this.isWorker?this.context.close():this.context.terminate()),this.context=null,this.peer=null)},s.prototype.createContext=function(e){var t=e.data;return{id:t.id,type:"request",channel:t.channel,request:t.data,event:e}},s.prototype.onMessage=function(e){var t=this;if("frame"!==this.type||(!e.source||e.source===this.peer)&&this.isValidateOrigin(e.origin)){var s=e.data;if(s&&this.composie&&s.channel)if(s.id)if("response"===s.type)this.resolveFetch(s);else{var i=this.createContext(e);if(this.resolveFetch(s))return void this.respond(i,!0);this.composie.run(i).then(function(){t.respond(i,!0)},function(e){console.warn("run middleware failed",e),t.respond(i,!1)})}else{if(this.resolveFetch(s))return;var r=this.evtsCbs[s.channel];if(!r||!r.length)return void console.warn("no corresponed callback for",s.channel);for(var n=0;n<r.length;n++){if(!1===(0,r[n])(s.data))break}}}},s.prototype.respond=function(e,t){var s={resolved:t,id:e.id,channel:e.channel,type:"response",data:e.response};this.postMessage(s)},s.prototype.resolveFetch=function(e){if(e.id&&("request"!==e.type||e.id===t.id)){var s=e.id,i=this.promisePairs[s];return i?((0,i[!1!==e.resolved?0:1])(e.data),delete this.promisePairs[s],!0):e.id===t.id||void console.warn("unowned message with id",s,e)}},s.prototype.isValidateOrigin=function(e){return"*"===this.targetOrigin||e===this.targetOrigin},s.prototype.postMessage=function(e,s){var i,r=this,n=[e];if("frame"===this.type&&n.push(this.targetOrigin),"request"===e.type){e.id=e.channel===t.channel?t.id:s?++this.count:0;var o=e.transfers;delete e.transfers,o&&n.push(o)}if((i=this.peer).postMessage.apply(i,n),"response"!==e.type&&e.id)return new Promise(function(t,s){r.promisePairs[e.id]=[t,s]})},s}()});
