(()=>{"use strict";var e=document.querySelector(".profile__edit-button"),t=document.querySelector(".profile__add-button"),n=document.querySelector(".popup_function_edit"),o=document.querySelector(".popup_function_add"),r=document.querySelector(".popup__form_redact"),c=document.querySelector(".popup__form_add"),a=document.querySelector("#popup_name"),u=document.querySelector("#popup_job"),i=document.querySelector(".profile__name"),s=document.querySelector(".profile__subname"),l=o.querySelector(".popup__input_name"),d=o.querySelector(".popup__input_picture"),p=document.querySelector(".popup_function_zoom"),_=document.querySelector(".popup__image"),f=document.querySelector(".popup__image-name"),m=document.querySelector(".elements"),v=document.querySelector("#place-template").content,h=document.querySelectorAll(".popup"),y=document.querySelectorAll(".popup__close"),S=document.querySelector(".popup__submit_function_add"),b=document.querySelector(".popup__submit_function_edit"),q=document.querySelector("#popup_avatar"),E=document.querySelector(".profile__avatar"),L=document.querySelector(".profile__avatar_hover"),C=document.querySelector(".popup__form_avatar"),k=document.querySelector(".popup__submit_avatar"),j={baseUrl:"https://nomoreparties.co/v1/plus-cohort-26",headers:{authorization:"6bb49ea4-9d7a-4a97-8f53-ee02190921e9","Content-Type":"application/json"}};function g(e,t,n,o){t.textContent=e?n:o}var x,P,U,A,T,N,B,O,z,D,J,M=function(e,t,n,o){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n),r.classList.remove(o),r.textContent=""},H=function(e,t){e.classList.add(t),e.disabled=!0},V=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove(n),t.disabled=!1):H(t,n)};function w(e){e.classList.add("popup_opened"),document.body.addEventListener("keyup",G)}function F(e){e.classList.remove("popup_opened"),document.body.removeEventListener("keyup",G)}function G(e){var t=e.keyCode;h.forEach((function(e){27==t&&e.classList.contains("popup_opened")&&F(e)}))}function I(e,t,n){var o=v.querySelector(".elements__element").cloneNode(!0),r=o.querySelector(".elements__image");r.src=e.link,r.alt=e.name,o.querySelector(".elements__description").textContent=e.name;var c=o.querySelector(".elements__heart"),a=o.querySelector(".elements__heart-count");if(a.textContent=t,c.addEventListener("click",(function(){var n;c.classList.toggle("elements__heart_status_active"),c.classList.contains("elements__heart_status_active")?(++t,n=e._id,fetch("".concat(j.baseUrl,"/cards/likes/").concat(n),{headers:j.headers,method:"PUT"}).then((function(e){return e.json()})).then((function(e){return console.log(e)})).catch((function(e){return Promise.reject("Ошибка: ".concat(e.status))}))):(--t,function(e){fetch("".concat(j.baseUrl,"/cards/likes/").concat(e),{headers:j.headers,method:"DELETE"}).then((function(e){return e.json()})).then((function(e){return console.log(e)})).catch((function(e){return Promise.reject("Ошибка: ".concat(e.status))}))}(e._id)),a.textContent=t})),"26ba9d61f275b3dbc1475523"===n){var u=o.querySelector(".elements__delete");u.classList.add("elements__delete_active"),u.addEventListener("click",(function(){var t;t=e._id,fetch("".concat(j.baseUrl,"/cards/").concat(t),{headers:j.headers,method:"DELETE"}).then((function(e){return e.json()})).then((function(e){return console.log(e)})).catch((function(e){return Promise.reject("Ошибка: ".concat(e.status))})),o.remove()}))}else{var i=o.querySelector(".elements__delete");i.parentNode.removeChild(i)}return r.addEventListener("click",(function(){w(p),_.src=e.link,_.alt=e.name,f.textContent=e.name})),o}x=i,P=s,U=E,fetch("".concat(j.baseUrl,"/users/me"),{headers:j.headers}).then((function(e){if(e.ok)return e.json()})).then((function(e){x.textContent=e.name,P.textContent=e.about,U.src=e.avatar})).catch((function(e){return Promise.reject("Ошибка: ".concat(e.status))})),E.onmouseover=function(){L.classList.add("profile__avatar_hover_active")},E.onmouseout=function(){L.classList.remove("profile__avatar_hover_active")},E.addEventListener("click",(function(){w(document.querySelector(".popup_function_avatar"))})),e.addEventListener("click",(function(){w(n),a.value=i.textContent,u.value=s.textContent,n.querySelectorAll(".popup__input").forEach((function(e){M(r,e)}))})),t.addEventListener("click",(function(){w(o)})),y.forEach((function(e){e.addEventListener("click",(function(){return n=(t=e).closest(".popup"),void t.addEventListener("click",(function(){return F(n)}));var t,n}))})),h.forEach((function(e){e.addEventListener("click",(function(){return t=event,n=e,void(t.target===n?F(n):t.stopPropagation());var t,n}))})),r.addEventListener("submit",(function(){!function(e,t){g(!0,b,"Сохранение..","Сохранить"),fetch("".concat(j.baseUrl,"/users/me"),{method:"PATCH",headers:j.headers,body:JSON.stringify({name:e.value,about:t.value})}).then((function(e){return e.json()})).catch((function(e){return Promise.reject("Ошибка: ".concat(e.status))})).finally((function(){g(!1,b,"Сохранение..","Сохранить")}))}(a,u),i.textContent=a.value,s.textContent=u.value,F(n),H(b,"popup__submit_inactive")})),c.addEventListener("submit",(function(){var e={};e.name=l.value,e.link=d.value;var t,n,r=I(e);m.prepend(r),t=l,n=d,g(!0,S,"Создание...","Создать"),fetch("".concat(j.baseUrl,"/cards"),{method:"POST",headers:j.headers,body:JSON.stringify({name:t.value,link:n.value})}).then((function(e){return e.json()})).catch((function(e){return Promise.reject("Ошибка: ".concat(e.status))})).finally((function(){g(!1,S,"Создание...","Создать")})),F(o),c.reset(),H(S,"popup__submit_inactive")})),C.addEventListener("submit",(function(){var e;e=q,g(!0,k,"Сохранение..","Сохранить"),fetch("".concat(j.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:{authorization:"6bb49ea4-9d7a-4a97-8f53-ee02190921e9","Content-Type":"application/json"},body:JSON.stringify({avatar:e.value})}).then((function(e){return e.json()})).catch((function(e){return Promise.reject("Ошибка: ".concat(e.status))})).finally((function(){g(!1,k,"Сохранение..","Сохранить")})),F(document.querySelector(".popup_function_avatar"))})),T=(A={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__submit",inactiveButtonClass:"popup__submit_inactive",inputErrorClass:"popup__input_type_error",errorClass:"popup__input_error"}).formSelector,N=A.submitButtonSelector,B=A.inputSelector,O=A.inactiveButtonClass,z=A.inputErrorClass,D=A.errorClass,(J=Array.from(document.querySelectorAll(T))).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),J.forEach((function(e){!function(e,t,n,o,r,c){var a=Array.from(e.querySelectorAll(n)),u=e.querySelector(t);V(a,u,o),a.forEach((function(t){t.addEventListener("input",(function(){!function(e,t,n,o){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?M(e,t,n,o):function(e,t,n,o,r){var c=e.querySelector(".".concat(t.id,"-error"));t.classList.add(o),c.textContent=n,c.classList.add(r)}(e,t,t.validationMessage,n,o)}(e,t,r,c),V(a,u,o)}))}))}(e,N,B,O,z,D)}))})),fetch("".concat(j.baseUrl,"/cards"),{headers:j.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).then((function(e){e.forEach((function(e){var t=I(e,e.likes.length,e.owner._id);m.append(t)}))})).catch((function(e){console.log(e)}))})();