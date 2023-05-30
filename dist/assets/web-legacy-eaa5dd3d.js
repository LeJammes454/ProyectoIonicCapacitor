System.register(["./index-legacy-ec89bbe3.js"],(function(i,t){"use strict";var e;return{setters:[i=>{e=i.W}],execute:function(){i("LocalNotificationsWeb",class extends e{constructor(){super(...arguments),this.pending=[],this.deliveredNotifications=[],this.hasNotificationSupport=()=>{if(!("Notification"in window)||!Notification.requestPermission)return!1;if("granted"!==Notification.permission)try{new Notification("")}catch(i){if("TypeError"==i.name)return!1}return!0}}async getDeliveredNotifications(){const i=[];for(const t of this.deliveredNotifications){const e={title:t.title,id:parseInt(t.tag),body:t.body};i.push(e)}return{notifications:i}}async removeDeliveredNotifications(i){for(const t of i.notifications){const i=this.deliveredNotifications.find((i=>i.tag===String(t.id)));null==i||i.close(),this.deliveredNotifications=this.deliveredNotifications.filter((()=>!i))}}async removeAllDeliveredNotifications(){for(const i of this.deliveredNotifications)i.close();this.deliveredNotifications=[]}async createChannel(){throw this.unimplemented("Not implemented on web.")}async deleteChannel(){throw this.unimplemented("Not implemented on web.")}async listChannels(){throw this.unimplemented("Not implemented on web.")}async schedule(i){if(!this.hasNotificationSupport())throw this.unavailable("Notifications not supported in this browser.");for(const t of i.notifications)this.sendNotification(t);return{notifications:i.notifications.map((i=>({id:i.id})))}}async getPending(){return{notifications:this.pending}}async registerActionTypes(){throw this.unimplemented("Not implemented on web.")}async cancel(i){this.pending=this.pending.filter((t=>!i.notifications.find((i=>i.id===t.id))))}async areEnabled(){const{display:i}=await this.checkPermissions();return{value:"granted"===i}}async requestPermissions(){if(!this.hasNotificationSupport())throw this.unavailable("Notifications not supported in this browser.");return{display:this.transformNotificationPermission(await Notification.requestPermission())}}async checkPermissions(){if(!this.hasNotificationSupport())throw this.unavailable("Notifications not supported in this browser.");return{display:this.transformNotificationPermission(Notification.permission)}}transformNotificationPermission(i){switch(i){case"granted":return"granted";case"denied":return"denied";default:return"prompt"}}sendPending(){var i;const t=[],e=(new Date).getTime();for(const n of this.pending)(null===(i=n.schedule)||void 0===i?void 0:i.at)&&n.schedule.at.getTime()<=e&&(this.buildNotification(n),t.push(n));this.pending=this.pending.filter((i=>!t.find((t=>t===i))))}sendNotification(i){var t;if(null===(t=i.schedule)||void 0===t?void 0:t.at){const t=i.schedule.at.getTime()-(new Date).getTime();return this.pending.push(i),void setTimeout((()=>{this.sendPending()}),t)}this.buildNotification(i)}buildNotification(i){const t=new Notification(i.title,{body:i.body,tag:String(i.id)});return t.addEventListener("click",this.onClick.bind(this,i),!1),t.addEventListener("show",this.onShow.bind(this,i),!1),t.addEventListener("close",(()=>{this.deliveredNotifications=this.deliveredNotifications.filter((()=>!this))}),!1),this.deliveredNotifications.push(t),t}onClick(i){const t={actionId:"tap",notification:i};this.notifyListeners("localNotificationActionPerformed",t)}onShow(i){this.notifyListeners("localNotificationReceived",i)}})}}}));
