!function(e){var t={};function s(o){if(t[o])return t[o].exports;var n=t[o]={i:o,l:!1,exports:{}};return e[o].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=t,s.d=function(e,t,o){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(s.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)s.d(o,n,function(t){return e[t]}.bind(null,n));return o},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s=0)}([function(e,t,s){"use strict";s.r(t);const o={clicked:"clicked",cell:"cell",closed:"closed",bomb:"bomb",flagged:"flagged"};class n{static cellCheck(e){return e.classList.contains(o.cell)}static clickedCheck(e){return e.classList.contains(o.clicked)}static closedCheck(e){return e.classList.contains(o.closed)}static bombCheck(e){return e.classList.contains(o.bomb)}static flaggedCheck(e){return e.classList.contains(o.flagged)}static removeClass(e,t){e.classList.remove(t)}static addClass(e,t){e.classList.add(t)}}const l={bomb:"red",clearCell:"teal",flag:"#e5e04a",one:"lime",twoOrThree:"orange",moreThanThree:"skyblue"};class i{getBombs(e,t,s){const o=[];for(let n=0;n<e;n++){const e=this._getRandomPosition(t*s);this._isNewPosition(e,o)?o.push(e):n--}return o}_getRandomPosition(e){let t=0;return t=Math.random()*e,t=Math.floor(t)}_isNewPosition(e,t){return-1==t.indexOf(e)}getPositions(e,t,s){const o=[],n={index:0};for(let l=0;l<t;l++){const t=this._createPositionsRow(e,s,n);o.push(t)}return o}_createPositionsRow(e,t,s){const o=[];for(let n=0;n<t;n++){const t=this._createCell(e,s);o.push(t),s.index++}return o}_createCell(e,t){const s=document.createElement("div");return~e.indexOf(t.index)&&n.addClass(s,o.bomb),n.addClass(s,o.cell),n.addClass(s,o.closed),s}getNumberColor(e){return 1==e?l.one:2==e||3==e?l.twoOrThree:l.moreThanThree}getBombsNumber(e,t,s,n,l){let i=0;function r(e){return e.classList.contains(o.bomb)}return e+1<n&&r(s[e+1][t])&&i++,e-1>=0&&r(s[e-1][t])&&i++,t+1<l&&r(s[e][t+1])&&i++,t-1>=0&&r(s[e][t-1])&&i++,e+1<n&&t+1<l&&r(s[e+1][t+1])&&i++,e+1<n&&t-1>=0&&r(s[e+1][t-1])&&i++,e-1>=0&&t+1<l&&r(s[e-1][t+1])&&i++,e-1>=0&&t-1>=0&&r(s[e-1][t-1])&&i++,i}}class r{openCells({rows:e,columns:t,positions:s}){for(let o=0;o<e;o++)this._goThroughTheRow(o,e,t,s)}_goThroughTheRow(e,t,s,l){for(let i=0;i<s;i++){const r=l[e][i];n.clickedCheck(r)&&(n.removeClass(r,o.clicked),n.removeClass(r,o.closed),this._setBombsNumber(e,i,l,t,s),this._openLeftCell(e,i-1,l,t,s),this._openRightCell(e,i+1,l,t,s),this._openUpperCell(e-1,i,l,t,s),this._openLowerCell(e+1,i,l,t,s))}}_setBombsNumber(e,t,s,o,n){const l=new i,r=l.getBombsNumber(e,t,s,o,n);return r>0&&(s[e][t].style.color=l.getNumberColor(r),s[e][t].innerHTML=`<p>${r}</p>`),r}_openLeftCell(e,t,s,l,i){if(this._isIndexInRow(e,l)&&this._isIndexInColumn(t,i)){const r=s[e][t],c=s[e][t+1];n.closedCheck(r)&&(n.removeClass(c,o.closed),n.removeClass(r,o.closed),n.bombCheck(r)||n.flaggedCheck(r)?(n.addClass(r,o.closed),this._setBombsNumber(e,t+1,s,l,i)):(s[e][t].style.backgroundColor="teal",this._openUpperCell(e-1,t,s,l,i),this._openLowerCell(e+1,t,s,l,i),0==this._setBombsNumber(e,t,s,l,i)&&this._openLeftCell(e,t-1,s,l,i)))}}_isIndexInRow(e,t){return e>=0&&e<t}_isIndexInColumn(e,t){return e>=0&&e<t}_openRightCell(e,t,s,l,i){if(this._isIndexInRow(e,l)&&this._isIndexInColumn(t,i)){const r=s[e][t],c=s[e][t-1];n.closedCheck(r)&&(n.removeClass(c,o.closed),n.removeClass(r,o.closed),n.bombCheck(r)||n.flaggedCheck(r)?(n.addClass(r,o.closed),this._setBombsNumber(e,t-1,s,l,i)):(s[e][t].style.backgroundColor="teal",this._openUpperCell(e-1,t,s,l,i),this._openLowerCell(e+1,t,s,l,i),0==this._setBombsNumber(e,t,s,l,i)&&this._openRightCell(e,t+1,s,l,i)))}}_openUpperCell(e,t,s,l,i){if(this._isIndexInRow(e,l)&&this._isIndexInColumn(t,i)){const r=s[e][t],c=s[e+1][t];n.closedCheck(r)&&(n.removeClass(c,o.closed),n.removeClass(r,o.closed),n.bombCheck(r)||n.flaggedCheck(r)?(n.addClass(r,o.closed),this._setBombsNumber(e+1,t,s,l,i)):(s[e][t].style.backgroundColor="teal",this._openLeftCell(e,t-1,s,l,i),this._openRightCell(e,t+1,s,l,i),0==this._setBombsNumber(e,t,s,l,i)&&this._openUpperCell(e-1,t,s,l,i)))}}_openLowerCell(e,t,s,l,i){if(this._isIndexInRow(e,l)&&this._isIndexInColumn(t,i)){const r=s[e][t],c=s[e-1][t];n.closedCheck(r)&&(n.removeClass(c,o.closed),n.removeClass(r,o.closed),n.bombCheck(r)||n.flaggedCheck(r)?(n.addClass(r,o.closed),this._setBombsNumber(e-1,t,s,l,i)):(s[e][t].style.backgroundColor="teal",this._openLeftCell(e,t-1,s,l,i),this._openRightCell(e,t+1,s,l,i),0==this._setBombsNumber(e,t,s,l,i)&&this._openLowerCell(e+1,t,s,l,i)))}}}class c{static setFlags(e,t){const s=document.querySelector(".flags-left");t?e>=0&&e<=t&&(s.innerHTML=e):s.innerHTML=e}static getFlags(){return document.querySelector(".flags-left").innerHTML}}const a={backdrop:".backdrop",modal:".modal",header:".modal__header",close:".modal__close",content:".modal__content",buttons:".modal__buttons"},m={width:"500px",height:"400px",header:{images:["./img/smiling.png","./img/smiling.png"],text:"Модальное окно"},content:{inputs:null,text:"Текст модального окна"},buttons:['<div class="ok btn">Ок</div>','<div class="close btn">Закрыть</div>'],showClose:!0},d={visible:"block",hidden:"none",flex:"flex"};class h{constructor(){this._backdrop=document.querySelector(a.backdrop),this._modal=document.querySelector(a.modal),this._modalHeader=document.querySelector(a.header),this._modalContent=document.querySelector(a.content),this._modalButtons=document.querySelector(a.buttons)}setSettings(e){this._modalSettings=e||m}tune(){this._modal.style.width=this._modalSettings.width,this._modal.style.height=this._modalSettings.height,this._modal.style.top=this._countTopOffset(),this._modal.style.left=this._countLeftOffset(),this._modalHeader.innerHTML=this._formHeader(),this._modalContent.innerHTML=this._formContent(),this._modalButtons.innerHTML=this._formButtons()}_countTopOffset(){const e=document.documentElement.clientHeight,t=this._modalSettings.height;return e/3-parseInt(t)/3+"px"}_countLeftOffset(){const e=document.documentElement.clientWidth,t=this._modalSettings.width;return e/2-parseInt(t)/2+"px"}_formHeader(){let e="";const t=this._modalSettings.header.images,s=this._modalSettings.header.text;return e+=`<img src=${t[0]}>`,e+=`<h1>${s}</h1>`,e+=`<img src=${t[1]}>`}_formContent(){let e="";if(this._modalSettings.content.inputs){const t=this._modalSettings.content.inputs;for(let s=0;s<t.length;s++)e+=this._addInput(t[s]);return e}const t=this._modalSettings.content.text;return e+=this._formText(t)}_formText(e){let t='<div class="text">';for(let s=0;s<e.length;s++)t+=`<p class="text-line">${e[s]}</p>`;return t+="</div>"}_addInput(e){let t="";const s=e.wrapper,o=e.hint,n=e.type,l=e.classes,i=e.value;return o&&(t+=`<p>${o}</p>`),s&&(t+="<div>"),t+="<input",t+=` type=${n}`,t+=` class=${l}`,t+=` value=${i}>`,s||(t+="</div>"),t}_formButtons(){let e="";const t=this._modalSettings.buttons;for(let s=0;s<t.length;s++)e+=t[s];return e}show(){this._backdrop.style.display=d.visible,this._modal.style.display=d.visible}hide(){this._backdrop.style.display=d.hidden,this._modal.style.display=d.hidden}}const u={smiling:"img/smiling.png",withTongue:"img/with_tongue.png",demon:"img/demon.png"},g={smileImg:".sapper__header-smile img"};class _{static set(){const e=document.querySelector(g.smileImg);e.addEventListener("mousedown",()=>{~e.src.indexOf("demon")||(e.src=u.withTongue)}),e.addEventListener("click",()=>{~e.src.indexOf("demon")||(e.src=u.smiling)}),e.addEventListener("mouseout",()=>{~e.src.indexOf("demon")||(e.src=u.smiling)})}static showDemon(){document.querySelector(g.smileImg).src=u.demon}static showSmile(){document.querySelector(g.smileImg).src=u.smiling}}class p{constructor(){p.timerMinutes=document.querySelector(".timer .timer__minutes"),p.timerSeconds=document.querySelector(".timer .timer__seconds"),p.timerId=null}static start(){let e=0,t="00";p.timerId=setInterval(()=>{60==++e&&(++t<10&&(t="0"+t),e=0);e<10&&(e="0"+e),p.timerSeconds.innerHTML=e,p.timerMinutes.innerHTML=t},1e3)}static stop(){p.timerId&&clearInterval(p.timerId)}static clear(){p.timerSeconds.innerHTML="00",p.timerMinutes.innerHTML="00"}}const b={restart:".modal__buttons .restart",save:".modal__buttons .save"},w={bomb:"<img src='img/bomb.png'>",flag:"<img src='img/flag.png'>"},y={width:"500px",height:"280px",header:{images:["./img/demon.png","./img/demon.png"],text:"Буууум!"},content:{inputs:null,text:["Ничего :)","В следующий раз все получится!"]},buttons:['<div class="restart btn">Переиграть!</div>']},f={width:"500px",height:"280px",header:{images:["./img/with_tongue.png","./img/with_tongue.png"],text:"Победа!"},content:{inputs:null,text:["Молодец! :)","Это было нелегко, но ты справился!"]},buttons:['<div class="restart btn">Новая игра!</div>','<div class="save btn">Сохранить результат</div>']};class C{constructor(){this.algorithm=new r,this.modal=new h}cellLeftClick(e){e.field.onclick=(t=>{const s=t.target;n.cellCheck(s)&&this._workWithCell(s,e)})}_workWithCell(e,t){n.bombCheck(e)?(this._putBomb(e),t.open(),this._gameOver(t)):(this._openCurrentCell(e),this.algorithm.openCells(t),this._checkForWin(t))}_putBomb(e){e.style.backgroundColor=l.bomb,e.innerHTML=w.bomb}_gameOver(e){p.stop(),_.showDemon(),this._showLossModal();const t=document.querySelector(b.restart);(new H).restartGame(t,this.modal,e)}_showLossModal(){this.modal.setSettings(y),this.modal.tune(),this.modal.show()}_openCurrentCell(e){e.style.backgroundColor=l.clearCell,n.addClass(e,o.clicked)}_checkForWin(e){let t=0,s=0;for(let o=0;o<e.rows;o++){const n=this._goThroughTheRow(o,e);t+=n.tempRightFlagsSet,s+=n.tempOpenedCells}const o=e.bombs.length,n=this._countClearCellsAmount(e);o==t&&n==s&&this._win(e)}_goThroughTheRow(e,t){let s=0,o=0;for(let l=0;l<t.columns;l++){const i=t.positions[e][l];n.bombCheck(i)&&n.flaggedCheck(i)&&s++,this._openedCellCheck(i)&&o++}return{tempRightFlagsSet:s,tempOpenedCells:o}}_openedCellCheck(e){switch(!0){case n.closedCheck(e):case n.bombCheck(e):case n.flaggedCheck(e):return!1}return!0}_countClearCellsAmount(e){const t=e.bombs.length;return e.rows*e.columns-t}cellRightClick(e){e.field.oncontextmenu=(t=>{t.preventDefault();const s=t.target;n.closedCheck(s)&&this._putFlag(s,e),n.flaggedCheck(s.parentNode)&&this._removeFlag(s.parentNode,e)})}_putFlag(e,t){c.getFlags()>0&&(n.addClass(e,o.flagged),e.innerHTML=w.flag,e.style.backgroundColor=l.flag,this._updateFlagsCount(-1,t),this._checkForWin(t))}_removeFlag(e,t){n.removeClass(e,o.flagged),e.style.backgroundColor="",e.innerHTML="",this._updateFlagsCount(1,t)}_updateFlagsCount(e,t){const s=+c.getFlags()+e;c.setFlags(s,t.bombs.length)}_win(e){p.stop(),this._showWinModal();const t=document.querySelector(b.restart),s=document.querySelector(b.save),o=new H;o.restartGame(t,this.modal,e),o.saveResults(s,this.modal,e)}_showWinModal(){this.modal.setSettings(f),this.modal.tune(),this.modal.show()}}const k={table:".records-table",backdrop:".backdrop",recordsList:".records-table .records__list",currentRecords:".records-table .records"};class S{constructor(){S.table=document.querySelector(k.table),S.backdrop=document.querySelector(k.backdrop)}static show(){S.table.style.display=d.visible,S.backdrop.style.display=d.visible}static hide(){S.table.style.display=d.hidden,S.backdrop.style.display=d.hidden}static update(){const e=localStorage;let t="";for(let s in e)if("string"==typeof e[s]){t+=S._createNewRecord(s,e[s])}S._setRecords(t)}static _createNewRecord(e,t){let s="";const o=t.split(" ");s+=`<div>${e}</div>`;for(let e=0;e<o.length;e++)s+=`<div>${o[e]}</div>`;return s=`<div class="records__item">${s}</div>`}static _setRecords(e){document.querySelector(k.recordsList).innerHTML=e||'<div class="empty">Список пуст.</div>'}static clear(){const e=document.querySelector(k.currentRecords);for(;e.children.length>0;)e.parentNode.removeChild(e.children[0])}}const v={width:"300px",height:"150px",headline:"Оповещение",message:"Что-то произошло",type:"alert"},x={alert:".alert",headline:".alert__headline",message:".alert__message p"},T={ok:'<img src="./img/ok.png" />',error:'<img src="./img/error.png" />'};class I{constructor(){this._timerId=null,this._alert=document.querySelector(x.alert)}setSettings(e){this._alertSettings=e||v}show(){this._killTimer(),this._tune(),this._alert.style.display=d.visible,this._timerId=setTimeout(()=>{this._hide()},3e3)}_killTimer(){this._timerId&&clearTimeout(this._timerId)}_tune(){this._alert.style.width=this._alertSettings.width,this._alert.style.height=this._alertSettings.height;const e=this._getAlertImageByType(),t=this._alert.querySelector(x.headline),s=this._alert.querySelector(x.message);t.innerHTML=this._formHeadline(e),s.innerHTML=this._alertSettings.message}_getAlertImageByType(){return this._checkAlert()?T.ok:T.error}_checkAlert(){return"alert"==this._alertSettings.type}_formHeadline(e){let t=e;return t+=`<p>${this._alertSettings.headline}</p>`}_hide(){this._alert.style.display=d.hidden}setMessage(e){this.message=e}}const M={nickName:".modal__content .nick-name",bombsAmount:".modal__content .bombs-amount",rows:".modal__content .rows",columns:".modal__content .columns"},R={width:"290px",height:"120px",headline:"Ошибка!",message:"Какая-то ошибка",type:"error"},L={noName:"Не заполнено имя!",bigName:"Максимальный размер имени 20 симоволов.",noFieldSize:"Не заполнен размер поля!",smallField:"Минимальный размер поля 5х5!",bigField:"Максимальный размер поля 20х20!",noBombsAmount:"Не заполнено количество бомб!",tooFewBombs:"Должна быть хотя бы одна бомба!",maxBombs:"Максимальное количество бомб: "};class q{static checkForGameStarting(){const e=document.querySelector(M.nickName),t=document.querySelector(M.bombsAmount),s=document.querySelector(M.rows),o=document.querySelector(M.columns);return!!(q._checkNickName(e)&&q._checkFieldSize(s,o)&&q._checkBombsAmount(t,s,o))}static _checkNickName(e){return e.value.length<1?(q._setAlertMessage(L.noName),q._showAlert(),!1):!(e.value.length>20)||(q._setAlertMessage(L.bigName),q._showAlert(),!1)}static _setAlertMessage(e){R.message=e}static _showAlert(){const e=new I;e.setSettings(R),e.show()}static _checkFieldSize(e,t){switch(!0){case e.value.length<1||t.value.length<1:return q._setAlertMessage(L.noFieldSize),q._showAlert(),!1;case e.value<5||t.value<5:return q._setAlertMessage(L.smallField),q._showAlert(),!1;case e.value>20||t.value>20:return q._setAlertMessage(L.bigField),q._showAlert(),!1}return!0}static _checkBombsAmount(e,t,s){if(e.value.length<1)return q._setAlertMessage(L.noBombsAmount),q._showAlert(),!1;if(e.value<1)return q._setAlertMessage(L.tooFewBombs),q._showAlert(),!1;const o=Math.round(t.value*s.value*.7);return!(e.value>o)||(q._setAlertMessage(L.maxBombs+o),q._showAlert(),!1)}static checkNumberInput(e){e.onkeydown=(e=>{const t=e.keyCode;190!=t&&110!=t&&188!=t||e.preventDefault()})}}const N={width:"250px",height:"100px",headline:"Оповещение",message:"Новая игра.",type:"alert"},A={width:"250px",height:"100px",headline:"Оповещение",message:"Рекорды были очищены!",type:"alert"},F={menuItems:".menu-list",start:".modal__buttons .start",close:".modal__buttons .close",nickName:".modal__content .nick-name",bombsAmount:".modal__content .bombs-amount",rows:".modal__content .rows",columns:".modal__content .columns",timerMinutes:".timer .timer__minutes",timerSeconds:".timer .timer__seconds"},B={width:"500px",height:"440px",header:{images:["./img/smiling.png","./img/with_tongue.png"],text:"Настройки"},content:{inputs:[{hint:"Имя:",type:"text",classes:"nick-name",value:"Player"},{wrapper:!0,hint:"Размер поля:",type:"number",classes:"rows",value:12},{wrapper:!1,hint:null,type:"number",classes:"columns",value:12},{hint:"Количество бомб:",type:"number",classes:"bombs-amount",value:50}],text:null},buttons:['<div class="start btn">Сохранить</div>','<div class="close btn">Закрыть</div>']};class H{constructor(){this.modal=new h,this.alert=new I,this.gameController=new C}menuToggle(e){const t=document.querySelector(F.menuItems);t.style.display=d.hidden,e.onclick=(()=>{t.style.display=t.style.display==d.hidden?d.visible:d.hidden})}resetGame(e,t){e.onclick=(()=>{this._setNewDefaultSettings(),this._showResetModal();const e=document.querySelector(F.start),s=document.querySelector(F.close);this.startGame(e,this.modal,t),this._setCloseButton(s)})}_setNewDefaultSettings(){const e=this._getGameSettings();B.content.inputs[0].value=e.nickName,B.content.inputs[1].value=e.rows,B.content.inputs[2].value=e.columns,B.content.inputs[3].value=e.bombsAmount}_showResetModal(){this.modal.setSettings(B),this.modal.tune(),this.modal.show()}_setCloseButton(e){e.onclick=(()=>{this.modal.hide(),this._hideMenuItems()})}_hideMenuItems(){document.querySelector(F.menuItems).style.display=d.hidden}startGame(e,t,s){e.onclick=(()=>{q.checkForGameStarting()&&(this._prepareGameScreen(t,s),this.alert.setSettings(N),this.alert.show())})}_prepareGameScreen(e,t){e&&e.hide(),_.showSmile(),this._hideMenuItems(),this._redrawPlayField(t),this._restartTimer(),c.setFlags(t.bombs.length),this.gameController.cellLeftClick(t),this.gameController.cellRightClick(t)}_redrawPlayField(e){const t=this._getGameSettings();e.hide(),e.clear(),e.setSettings(t),e.draw()}_getGameSettings(){let e={};if(document.querySelector(F.nickName)){const t=document.querySelector(F.nickName),s=document.querySelector(F.bombsAmount),o=document.querySelector(F.rows),n=document.querySelector(F.columns);e={nickName:t.value,bombsAmount:s.value,rows:o.value,columns:n.value},this._setToSessionStorage(e)}else{const t=sessionStorage.getItem("data").split(" ");e={nickName:t[0],bombsAmount:+t[1],rows:+t[2],columns:+t[3]}}return e}_setToSessionStorage(e){let t="";t+=`${e.nickName}`,t+=` ${e.bombsAmount}`,t+=` ${e.rows}`,t+=` ${e.columns}`,sessionStorage.setItem("data",t)}_restartTimer(){p.stop(),p.clear(),p.start()}restartGame(e,t,s){e.onclick=(()=>{this._prepareGameScreen(t,s),this.alert.setSettings(N),this.alert.show()})}showRecordsTable(e){e.onclick=(()=>{this._hideMenuItems(),S.update(),S.show()})}hideRecordsTable(e){e.onclick=(()=>{S.hide()})}clearRecords(e){e.onclick=(()=>{localStorage.clear(),this._hideMenuItems(),this.alert.setSettings(A),this.alert.show()})}saveResults(e){e.onclick=(()=>{const e=this._getGameSettings(),t=this._getResultRecord(e);localStorage.setItem(e.nickName,t),this._configurateSaveResultsAlert(e),this.alert.show()})}_getResultRecord(e){const t=document.querySelector(F.timerMinutes),s=document.querySelector(F.timerSeconds);return`${`${t.innerHTML}:${s.innerHTML}`} ${`${e.rows}x${e.columns}`} ${e.bombsAmount}`}_configurateSaveResultsAlert(e){const t={width:"310px",height:"130px",headline:"Оповещение",message:`Результат для игрока ${e.nickName} сохранен.`,type:"alert"};this.alert.setSettings(t)}}const $={playField:".play-field"},O={bomb:"<img src='img/bomb.png'>"};class G{constructor(){this.field=document.querySelector($.playField),this.bombs=[],this.positions=[],this._isTuned=!1,this.otherFunctions=new i}setSettings({rows:e,columns:t,bombsAmount:s}){this.rows=e,this.columns=t,this.bombsAmount=s,this.bombs=this.otherFunctions.getBombs(this.bombsAmount,this.rows,this.columns),this.positions=this.otherFunctions.getPositions(this.bombs,this.rows,this.columns),this.field.style.width=this._countFieldWidth(),this._isTuned=!0}_countFieldWidth(){return 27*this.columns+"px"}draw(){if(this._isTuned){for(let e=0;e<this.rows;e++)this._goThroughTheRow(t=>{this.field.appendChild(this.positions[e][t])});this.field.style.display=d.flex}}_goThroughTheRow(e){for(let t=0;t<this.columns;t++)e(t)}open(){for(let e=0;e<this.rows;e++)this._goThroughTheRow(t=>{const s=this.positions[e][t];s.classList.contains(o.bomb)?(s.innerHTML=O.bomb,s.style.backgroundColor=l.bomb):s.style.backgroundColor=l.clearCell})}hide(){return!!this._isTuned&&(this.field.style.display=d.hidden,!0)}clear(){if(this._isTuned){for(;this.field.children.length>0;)this.field.removeChild(this.field.children[0]);return!0}return!1}}const P={start:".modal__buttons .start",menu:".menu",restart:".menu-list .restart",reset:".menu-list .reset",showRecords:".menu-list .show-records",clearRecords:".menu-list .clear-records",closeTable:".close-table",rows:".modal__content .rows",columns:".modal__content .columns",bombsAmount:".modal__content .bombs-amount"},W={width:"500px",height:"440px",header:{images:["./img/smiling.png","./img/with_tongue.png"],text:"Начало игры!"},content:{inputs:[{hint:"Имя:",type:"text",classes:"nick-name",value:"Player"},{wrapper:!0,hint:"Размер поля:",type:"number",classes:"rows",value:12},{wrapper:!1,hint:null,type:"number",classes:"columns",value:12},{hint:"Количество бомб:",type:"number",classes:"bombs-amount",value:50}],text:null},buttons:['<div class="start btn">Поехали!</div>']};!function(){const e=new H,t=(new S,new G),s=new h;new p,function(e){e.setSettings(W),e.tune(),e.show()}(s),function(){const e=document.querySelector(P.rows),t=document.querySelector(P.columns),s=document.querySelector(P.bombsAmount);q.checkNumberInput(e),q.checkNumberInput(t),q.checkNumberInput(s)}();const o=document.querySelector(P.start),n=document.querySelector(P.menu);e.startGame(o,s,t),e.menuToggle(n),_.set(),function(e,t){const s=document.querySelector(P.restart),o=document.querySelector(P.reset),n=document.querySelector(P.showRecords),l=document.querySelector(P.closeTable),i=document.querySelector(P.clearRecords);t.restartGame(s,null,e),t.resetGame(o,e),t.showRecordsTable(n),t.hideRecordsTable(l),t.clearRecords(i)}(t,e)}()}]);