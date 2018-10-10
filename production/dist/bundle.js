!function(e){var t={};function s(o){if(t[o])return t[o].exports;var l=t[o]={i:o,l:!1,exports:{}};return e[o].call(l.exports,l,l.exports,s),l.l=!0,l.exports}s.m=e,s.c=t,s.d=function(e,t,o){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(s.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var l in e)s.d(o,l,function(t){return e[t]}.bind(null,l));return o},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s=0)}([function(e,t,s){"use strict";s.r(t);class o{getBombs(e,t,s){let o=[];for(let i=0;i<e;i++){let i=l(t*s);n(i,o)?o.push(i):e++}return o;function l(e){let t=0;return t=Math.random()*e,t=Math.floor(t)}function n(e,t){return-1==t.indexOf(e)}}getPositions(e,t,s){let o=0,l=[];for(let e=0;e<t;e++){let e=i();l.push(e)}return l;function n(){let t=document.createElement("div");return~e.indexOf(o)&&t.classList.add("bomb"),t.classList.add("cell"),t.classList.add("closed"),t}function i(){let e=[];for(let t=0;t<s;t++){let t=n();e.push(t),o++}return e}}getNumberColor(e){return 1==e?"lime":2==e||3==e?"orange":"skyblue"}getBombsNumber(e,t,s,o,l){let n=0;function i(e){return!!e.classList.contains("bomb")}return e+1<o&&i(s[e+1][t])&&n++,e-1>=0&&i(s[e-1][t])&&n++,t+1<l&&i(s[e][t+1])&&n++,t-1>=0&&i(s[e][t-1])&&n++,e+1<o&&t+1<l&&i(s[e+1][t+1])&&n++,e+1<o&&t-1>=0&&i(s[e+1][t-1])&&n++,e-1>=0&&t+1<l&&i(s[e-1][t+1])&&n++,e-1>=0&&t-1>=0&&i(s[e-1][t-1])&&n++,n}}const l={clicked:"clicked",cell:"cell",closed:"closed",bomb:"bomb",flagged:"flagged"};class n{static cellCheck(e){return e.classList.contains(l.cell)}static clickedCheck(e){return e.classList.contains(l.clicked)}static closedCheck(e){return e.classList.contains(l.closed)}static bombCheck(e){return e.classList.contains(l.bomb)}static flaggedCheck(e){return e.classList.contains(l.flagged)}static removeClass(e,t){e.classList.remove(t)}static addClass(e,t){e.classList.add(t)}}class i{openCells({rows:e,columns:t,positions:s}){for(let o=0;o<e;o++)this._goThroughTheRow(o,e,t,s)}_goThroughTheRow(e,t,s,o){for(let i=0;i<s;i++){const r=o[e][i];n.clickedCheck(r)&&(n.removeClass(r,l.clicked),n.removeClass(r,l.closed),this._setBombsNumber(e,i,o,t,s),this._openLeftCell(e,i-1,o,t,s),this._openRightCell(e,i+1,o,t,s),this._openUpperCell(e-1,i,o,t,s),this._openLowerCell(e+1,i,o,t,s))}}_setBombsNumber(e,t,s,l,n){const i=new o,r=i.getBombsNumber(e,t,s,l,n);return r>0&&(s[e][t].style.color=i.getNumberColor(r),s[e][t].innerHTML=`<p>${r}</p>`),r}_openLeftCell(e,t,s,o,i){if(this._isIndexInRow(e,o)&&this._isIndexInColumn(t,i)){const r=s[e][t],c=s[e][t+1];n.closedCheck(r)&&(n.removeClass(c,l.closed),n.removeClass(r,l.closed),n.bombCheck(r)||n.flaggedCheck(r)?(n.addClass(r,l.closed),this._setBombsNumber(e,t+1,s,o,i)):(s[e][t].style.backgroundColor="teal",this._openUpperCell(e-1,t,s,o,i),this._openLowerCell(e+1,t,s,o,i),0==this._setBombsNumber(e,t,s,o,i)&&this._openLeftCell(e,t-1,s,o,i)))}}_isIndexInRow(e,t){return e>=0&&e<t}_isIndexInColumn(e,t){return e>=0&&e<t}_openRightCell(e,t,s,o,i){if(this._isIndexInRow(e,o)&&this._isIndexInColumn(t,i)){const r=s[e][t],c=s[e][t-1];n.closedCheck(r)&&(n.removeClass(c,l.closed),n.removeClass(r,l.closed),n.bombCheck(r)||n.flaggedCheck(r)?(n.addClass(r,l.closed),this._setBombsNumber(e,t-1,s,o,i)):(s[e][t].style.backgroundColor="teal",this._openUpperCell(e-1,t,s,o,i),this._openLowerCell(e+1,t,s,o,i),0==this._setBombsNumber(e,t,s,o,i)&&this._openRightCell(e,t+1,s,o,i)))}}_openUpperCell(e,t,s,o,i){if(this._isIndexInRow(e,o)&&this._isIndexInColumn(t,i)){const r=s[e][t],c=s[e+1][t];n.closedCheck(r)&&(n.removeClass(c,l.closed),n.removeClass(r,l.closed),n.bombCheck(r)||n.flaggedCheck(r)?(n.addClass(r,l.closed),this._setBombsNumber(e+1,t,s,o,i)):(s[e][t].style.backgroundColor="teal",this._openLeftCell(e,t-1,s,o,i),this._openRightCell(e,t+1,s,o,i),0==this._setBombsNumber(e,t,s,o,i)&&this._openUpperCell(e-1,t,s,o,i)))}}_openLowerCell(e,t,s,o,i){if(this._isIndexInRow(e,o)&&this._isIndexInColumn(t,i)){const r=s[e][t],c=s[e-1][t];n.closedCheck(r)&&(n.removeClass(c,l.closed),n.removeClass(r,l.closed),n.bombCheck(r)||n.flaggedCheck(r)?(n.addClass(r,l.closed),this._setBombsNumber(e-1,t,s,o,i)):(s[e][t].style.backgroundColor="teal",this._openLeftCell(e,t-1,s,o,i),this._openRightCell(e,t+1,s,o,i),0==this._setBombsNumber(e,t,s,o,i)&&this._openLowerCell(e+1,t,s,o,i)))}}}class r{static setFlags(e,t){let s=document.querySelector(".flags-left");e>=0&&e<=t&&(s.innerHTML=e)}static getFlags(){return document.querySelector(".flags-left").innerHTML}}const c={backdrop:".backdrop",modal:".modal",header:".modal__header",close:".modal__close",content:".modal__content",buttons:".modal__buttons"},a={width:"500px",height:"400px",header:{images:["./img/smiling.png","./img/smiling.png"],text:"Модальное окно"},content:{inputs:null,text:"Текст модального окна"},buttons:['<div class="ok btn">Ок</div>','<div class="close btn">Закрыть</div>'],showClose:!0};class d{constructor(e){this.modalSettings=e||a,this.tuned=!1,this.showed=!1,this.backdrop=document.querySelector(c.backdrop),this.closeButton=document.querySelector(c.close),this.modal=document.querySelector(`.${this.modalSettings.className}`)}tune(){document.querySelector(`.${this.modalSettings.className}__header h1`).innerHTML=this.modalSettings.title,this.modal.style.width=this.modalSettings.width,this.modal.style.height=this.modalSettings.height;const e=document.documentElement.clientWidth/2-parseInt(this.modalSettings.width)/2+"px";this.modal.style.left=e,this.tuned=!0}show(){this.tuned&&(this.backdrop.style.display="block",this.modal.style.display="block",this.showed=!0)}hide(){this.showed&&(this.backdrop.style.display="none",this.modal.style.display="none",this.showed=!1)}showCloseButtons(){this.tuned&&(this.cross.style.display="block")}}class m{static set(){let e=document.querySelector(".sapper__header-smile img");e.addEventListener("mousedown",()=>{~e.src.indexOf("demon")||(e.src="img/with_tongue.png")}),e.addEventListener("click",()=>{~e.src.indexOf("demon")||(e.src="img/smiling.png")}),e.addEventListener("mouseout",()=>{~e.src.indexOf("demon")||(e.src="img/smiling.png")})}static showDemon(){document.querySelector(".sapper__header-smile img").src="img/demon.png"}static showSmile(){document.querySelector(".sapper__header-smile img").src="img/smiling.png"}}class h{constructor(){h.timerMinutes=document.querySelector(".timer .timer__minutes"),h.timerSeconds=document.querySelector(".timer .timer__seconds"),h.timerId=null}static start(){let e=0,t="00";h.timerId=setInterval(()=>{60==++e&&(++t<10&&(t="0"+t),e=0);e<10&&(e="0"+e),h.timerSeconds.innerHTML=e,h.timerMinutes.innerHTML=t},1e3)}static stop(){h.timerId&&clearInterval(h.timerId)}static clear(){h.timerSeconds.innerHTML="00",h.timerMinutes.innerHTML="00"}}class u{cellLeftClick(e){e.field.onclick=(t=>{const s=t.target;if(s.classList.contains("cell"))if(s.classList.contains("bomb"))s.innerHTML="<img src='img/bomb.png'>",s.style.backgroundColor="red",e.open(),this._gameOver(e);else{s.style.backgroundColor="teal",s.classList.add("clicked"),(new i).openCells(e),this._checkForWin(e)}})}_gameOver(e){m.showDemon(),h.stop();let t=new d({width:"450px",height:"300px",title:"Буууум!",className:"loss-modal"});t.tune(),t.show();let s=document.querySelector(".loss-modal__buttons .restart");(new I).restartGame(s,t,e)}_checkForWin(e){let t=0,s=0;for(let o=0;o<e.rows;o++)for(let l=0;l<e.columns;l++)e.positions[o][l].classList.contains("bomb")&&e.positions[o][l].classList.contains("flagged")&&t++,e.positions[o][l].classList.contains("closed")||e.positions[o][l].classList.contains("bomb")||e.positions[o][l].classList.contains("flagged")||s++;let o=e.bombs,l=e.rows*e.columns-o.length;o.length==t&&s==l&&this._win(e)}cellRightClick(e){e.field.oncontextmenu=(t=>{t.preventDefault();const s=t.target;if(s.classList.contains("cell")&&s.classList.contains("closed")&&r.getFlags()>0){s.classList.add("flagged"),s.innerHTML="<img src='img/flag.png'>",s.style.backgroundColor="#e5e04a";let t=r.getFlags();r.setFlags(--t,e.bombs.length),this._checkForWin(e)}if(s.parentNode.classList.contains("flagged")){s.parentNode.classList.remove("flagged"),s.parentNode.style.backgroundColor="",s.parentNode.innerHTML="";let t=r.getFlags();r.setFlags(++t,e.bombs.length)}})}_win(e){h.stop();const t=new d({width:"550px",height:"300px",title:"Победа!",className:"win-modal"});t.tune(),t.show();const s=document.querySelector(".win-modal__buttons .restart"),o=document.querySelector(".win-modal__buttons .save"),l=new I;l.restartGame(s,t,e),l.saveResults(o,t,e)}}class g{constructor(){g.table=document.querySelector(".records-table"),g.backdrop=document.querySelector(".backdrop")}static show(){g.table.style.display="block",g.backdrop.style.display="block"}static hide(){g.table.style.display="none",g.backdrop.style.display="none"}static update(){let e=localStorage,t="";for(let o in e)if("string"==typeof e[o]){t+=s(o,e[o])}function s(e,t){let s="",o=t.split(" ");s+=`<div>${e}</div>`;for(let e=0;e<o.length;e++)s+=`<div>${o[e]}</div>`;return s=`<div class="records__item">${s}</div>`}!function(e){let t=document.querySelector(".records-table .records__list");t.innerHTML=e||'<div class="empty">Список пуст.</div>'}(t)}static clear(){let e=document.querySelector(".records-table .records");for(;e.children.length>0;)e.parentNode.removeChild(e.children[0])}}const _={width:"300px",height:"150px",headline:"Оповещение",message:"Что-то произошло",type:"alert"},b={alert:".alert",headline:".alert__headline",message:".alert__message p"},p={ok:'<img src="./img/ok.png" />',error:'<img src="./img/error.png" />'},y={visible:"block",hidden:"none"};class w{constructor(){this._timerId=null,this._alert=document.querySelector(b.alert)}setSettings(e){this._alertSettings=e||_}show(){this._killTimer(),this._tune(),this._alert.style.display=y.visible,this._timerId=setTimeout(()=>{this._hide()},3e3)}_killTimer(){this._timerId&&clearTimeout(this._timerId)}_tune(){this._alert.style.width=this._alertSettings.width,this._alert.style.height=this._alertSettings.height;const e=this._getAlertImageByType(),t=this._alert.querySelector(b.headline),s=this._alert.querySelector(b.message);t.innerHTML=this._formHeadline(e),s.innerHTML=this._alertSettings.message}_getAlertImageByType(){return this._checkAlert()?p.ok:p.error}_checkAlert(){return"alert"==this._alertSettings.type}_formHeadline(e){let t=e;return t+=`<p>${this._alertSettings.headline}</p>`}_hide(){this._alert.style.display=y.hidden}setMessage(e){this.message=e}}const f={nickName:".modal__content .nick-name",bombsAmount:".modal__content .bombs-amount",rows:".modal__content .rows",columns:".modal__content .columns"},S={width:"280px",height:"120px",headline:"Ошибка!",message:"Какая-то ошибка",type:"error"},k={noName:"Не заполнено имя!",bigName:"Максимальный размер имени 20 симоволов.",noFieldSize:"Не заполнен размер поля!",smallField:"Минимальный размер поля 5х5!",bigField:"Максимальный размер поля 20х20!",noBombsAmount:"Не заполнено количество бомб!",tooFewBombs:"Должна быть хотя бы одна бомба!",maxBombs:"Максимальное количество бомб: "};class C{checkForGameStarting(){const e=document.querySelector(f.nickName),t=document.querySelector(f.bombsAmount),s=document.querySelector(f.rows),o=document.querySelector(f.columns);return!!(this._checkNickName(e)&&this._checkRowsAndColumns(s,o)&&this._checkBombsAmount(t,s,o))}_checkNickName(e){return e.value.length<1?(this._setMessageAndShowAlert(k.noName),!1):!(e.value.length>20)||(this._setMessageAndShowAlert(k.bigName),!1)}_setMessageAndShowAlert(e){S.message=e,new w(S).show()}_checkRowsAndColumns(e,t){return e.value.length<1||t.value.length<1?(this._setMessageAndShowAlert(k.noFieldSize),!1):e.value<5||t.value<5?(this._setMessageAndShowAlert(k.smallField),!1):!(e.value>20||t.value>20)||(this._setMessageAndShowAlert(k.bigField),!1)}_checkBombsAmount(e,t,s){if(e.value.length<1)return this._setMessageAndShowAlert(k.noBombsAmount),!1;if(e.value<1)return this._setMessageAndShowAlert(k.tooFewBombs),!1;let o=Math.round(t.value*s.value*.7);return!(e.value>o)||(this._setMessageAndShowAlert(k.maxBombs+o),!1)}checkNumberInput(e){e.onkeydown=(e=>{let t=e.keyCode;190!=t&&110!=t&&188!=t||e.preventDefault()})}}class v{constructor(){this._backdrop=document.querySelector(c.backdrop),this._modal=document.querySelector(c.modal),this._modalHeader=document.querySelector(c.header),this._modalContent=document.querySelector(c.content),this._modalButtons=document.querySelector(c.buttons)}setSettings(e){this._modalSettings=e||a}tune(){this._modal.style.width=this._modalSettings.width,this._modal.style.height=this._modalSettings.height,this._modal.style.left=this._countLeftOffset(),this._modalHeader.innerHTML=this._formHeader(),this._modalContent.innerHTML=this._formContent(),this._modalButtons.innerHTML=this._formButtons()}_countLeftOffset(){const e=document.documentElement.clientWidth,t=this._modalSettings.width;return e/2-parseInt(t)/2+"px"}_formHeader(){let e="";const t=this._modalSettings.header.images,s=this._modalSettings.header.text;return e+=`<img src=${t[0]}>`,e+=`<h1>${s}</h1>`,e+=`<img src=${t[1]}>`}_formContent(){let e="";if(this._modalSettings.content.inputs){const t=this._modalSettings.content.inputs;for(let s=0;s<t.length;s++)e+=this._addInput(t[s]);return e}return e=`<p>${this._modalSettings.content.text}</p>`}_addInput(e){let t="";const s=e.wrapper,o=e.hint,l=e.type,n=e.classes,i=e.value;return o&&(t+=`<p>${o}</p>`),s&&(t+="<div>"),t+="<input",t+=` type=${l}`,t+=` class=${n}`,t+=` value=${i}>`,s||(t+="</div>"),t}_formButtons(){let e="";const t=this._modalSettings.buttons;for(let s=0;s<t.length;s++)e+=t[s];return e}show(){this._backdrop.style.display=y.visible,this._modal.style.display=y.visible}hide(){this._backdrop.style.display=y.hidden,this._modal.style.display=y.hidden}}const L={width:"250px",height:"100px",headline:"Оповещение",message:"Новая игра.",type:"alert"},x={menuItems:".menu-list",start:".modal__buttons .start",close:".modal__buttons .close",nickName:".modal__content .nick-name",bombsAmount:".modal__content .bombs-amount",rows:".modal__content .rows",columns:".modal__content .columns"},q={width:"500px",height:"500px",header:{images:["./img/smiling.png","./img/with_tongue.png"],text:"Настройки!"},content:{inputs:[{hint:"Имя:",type:"text",classes:"nick-name",value:"Player"},{wrapper:!0,hint:"Размер поля:",type:"number",classes:"rows",value:12},{wrapper:!1,hint:null,type:"number",classes:"columns",value:12},{hint:"Количество бомб:",type:"number",classes:"bombs-amount",value:50}],text:null},buttons:['<div class="start btn">Сохранить</div>','<div class="close btn">Закрыть</div>']};class I{constructor(){this.modal=new v,this.alert=new w}menuToggle(e){const t=document.querySelector(x.menuItems);t.style.display=y.hidden,e.onclick=(()=>{t.style.display=t.style.display==y.hidden?y.visible:y.hidden})}resetGame(e,t){e.onclick=(()=>{this._showResetModal();const e=document.querySelector(x.start),s=document.querySelector(x.close);this.startGame(e,this.modal,t),this._setCloseButton(s)})}_showResetModal(){this.modal.setSettings(q),this.modal.tune(),this.modal.show()}_setCloseButton(e){e.onclick=(()=>{this.modal.hide(),this._hideMenuItems()})}startGame(e,t,s){this.alert.setSettings(L);const o=new C;e.onclick=(()=>{if(o.checkForGameStarting()){t&&t.hide(),this._hideMenuItems(),m.showSmile();let e=this._getGameSettings();s.hide(),s.clear(),s.setSettings(e.rows,e.columns,e.bombsAmount),s.draw(),h.stop(),h.clear(),h.start(),r.setFlags(s.bombs.length,s.bombs.length);let o=new u;o.cellLeftClick(s),o.cellRightClick(s),this.alert.show()}})}restartGame(e,t,s){this.alert.setSettings(L),e.onclick=(()=>{t&&t.hide(),this._hideMenuItems(),m.showSmile();let e=this._getGameSettings();s.hide(),s.clear(),s.setSettings(e.rows,e.columns,e.bombsAmount),s.draw(),h.stop(),h.clear(),h.start(),r.setFlags(s.bombs.length,s.bombs.length);let o=new u;o.cellLeftClick(s),o.cellRightClick(s),this.alert.show()})}showRecordsTable(e){e.onclick=(()=>{g.update(),g.show(),this._hideMenuItems()})}closeRecordsTable(e){e.onclick=(()=>{g.hide()})}clearRecords(e){let t=new w({width:"250px",height:"100px",headline:"Оповещение",message:"Рекорды были очищены!",type:"alert"});e.onclick=(()=>{localStorage.clear(),this._hideMenuItems(),t.show()})}saveResults(e){let t=this._getGameSettings(),s=`Результат для игрока ${t.nickName} сохранен.`,o=new w("310px","130px",Constants.alert,s,"alert");e.onclick=(()=>{let e=document.querySelector(".timer .timer__minutes"),s=document.querySelector(".timer .timer__seconds"),l=`${`${e.innerHTML}:${s.innerHTML}`} ${`${t.rows}x${t.columns}`} ${t.bombsAmount}`;localStorage.setItem(t.nickName,l),o.show()})}_hideMenuItems(){document.querySelector(".menu-list").style.display="none"}_getGameSettings(){const e=document.querySelector(x.nickName),t=document.querySelector(x.bombsAmount),s=document.querySelector(x.rows),o=document.querySelector(x.columns);return{nickName:e.value,bombsAmount:t.value,rows:s.value,columns:o.value}}}class M{constructor(){this.field=document.querySelector(".play-field"),this.positions=[],this.bombs=[],this.isTuned=!1}setSettings(e,t,s){this.rows=e,this.columns=t,this.bombsAmount=s;let l=new o;this.bombs=l.getBombs(this.bombsAmount,this.rows,this.columns),this.positions=l.getPositions(this.bombs,this.rows,this.columns),this.field.style.width=27*(this.columns-1)+30+"px",this.isTuned=!0}draw(){if(this.isTuned){for(let e=0;e<this.rows;e++)for(let t=0;t<this.columns;t++)this.field.appendChild(this.positions[e][t]);this.field.style.display="flex"}else;}open(){for(let e=0;e<this.rows;e++)for(let t=0;t<this.columns;t++)this.positions[e][t].classList.contains("bomb")?(this.positions[e][t].innerHTML="<img src='img/bomb.png'>",this.positions[e][t].style.backgroundColor="red"):this.positions[e][t].style.backgroundColor="teal"}hide(){return!!this.isTuned&&(this.field.style.display="none",!0)}clear(){if(this.isTuned){for(;this.field.children.length>0;)this.field.removeChild(this.field.children[0]);return!0}return!1}}const T={start:".modal__buttons .start",menu:".menu",restart:".menu-list .restart",reset:".menu-list .reset",showRecords:".menu-list .show-records",clearRecords:".menu-list .clear-records",closeTable:".close-table",rows:".modal__content .rows",columns:".modal__content .columns",bombs:".modal__content .bombs-amount"},N={width:"500px",height:"500px",header:{images:["./img/smiling.png","./img/with_tongue.png"],text:"Начало игры!"},content:{inputs:[{hint:"Имя:",type:"text",classes:"nick-name",value:"Player"},{wrapper:!0,hint:"Размер поля:",type:"number",classes:"rows",value:12},{wrapper:!1,hint:null,type:"number",classes:"columns",value:12},{hint:"Количество бомб:",type:"number",classes:"bombs-amount",value:50}],text:null},buttons:['<div class="start btn">Поехали!</div>']};!function(){const e=new I,t=(new g,new M),s=new v;new h,function(e){e.setSettings(N),e.tune(),e.show()}(s),function(){const e=new C,t=document.querySelector(T.rows),s=document.querySelector(T.columns),o=document.querySelector(T.bombs);e.checkNumberInput(t),e.checkNumberInput(s),e.checkNumberInput(o)}();const o=document.querySelector(T.start),l=document.querySelector(T.menu);e.startGame(o,s,t),e.menuToggle(l),m.set(),function(e,t){const s=document.querySelector(T.restart),o=document.querySelector(T.reset),l=document.querySelector(T.showRecords),n=document.querySelector(T.closeTable),i=document.querySelector(T.clearRecords);t.restartGame(s,null,e),t.resetGame(o,e),t.showRecordsTable(l),t.closeRecordsTable(n),t.clearRecords(i)}(t,e)}()}]);