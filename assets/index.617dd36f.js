import{D as p,I as Z,t as m,c as b,o as C,a as r,i as a,b as E,d as _,S as v,m as y,s as P,L as j,u as A,e as B,f as M,g as O,h as V,M as w,F as X,j as Y,k as F,l as ee,n as te,p as R,R as T,q as ne,N as re,r as oe,v as se}from"./vendor.d323f37f.js";const ce=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function c(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerpolicy&&(s.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?s.credentials="include":o.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(o){if(o.ep)return;o.ep=!0;const s=c(o);fetch(o.href,s)}};ce();async function f(e){return await(await fetch(`//hacker-news.firebaseio.com/v0/${e}.json`)).json()}const ie=e=>f(`item/${e}`),ae=e=>f(`user/${e}`),le=()=>f("topstories"),ue=()=>f("newstories"),de=()=>f("beststories"),me=()=>f("jobstories"),he=()=>f("askstories"),ge=()=>f("showstories"),fe=()=>f("updates"),_e=()=>f("maxitem");var g=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",item:ie,user:ae,topStories:le,newStories:ue,bestStories:de,jobStories:me,askStories:he,showStories:ge,updates:fe,maxItem:_e,hnApi:g});function $e(e){return e.type==="comment"}function ve(e){return"descendants"in e||e.type==="job"}function we(e,t){return t=`${e} ${t}`,e>1?t:t.slice(0,-1)}function z(e){const t=p.now(),c=["months","days","hours","minutes","seconds"],n=Z.fromDateTimes(e,t).toDuration(c).toObject();for(const o of c)if(n[o])return we(n[o],o);return"0 seconds"}const be="_child_1204w_1",Se="_comment_1204w_9";var H={child:be,comment:Se};const Ne=m("<article><section><h5> <!> ago</h5><div></div></section></article>"),ke=m("<div></div>");function q(e){const[t,c]=b();return C(async()=>{const n=await g.item(e.id);if(!$e(n))throw new Error("Comment component tried to process an item that isn't a comment");n.deleted&&(n.by="[deleted]",n.text="-- removed --"),c(n)}),r(v,{get when(){return t()!==void 0},get children(){const n=Ne.cloneNode(!0),o=n.firstChild,s=o.firstChild,i=s.firstChild,u=i.nextSibling;u.nextSibling;const h=s.nextSibling;return a(s,()=>t().by,i),a(s,()=>z(p.fromSeconds(t().time)),u),a(n,r(E,{get each(){return t().kids},children:l=>(()=>{const d=ke.cloneNode(!0);return a(d,r(q,{get id(){return l()}})),_(()=>d.className=H.child),d})()}),null),_(l=>{const d=H.comment,$=t().text;return d!==l._v$&&(o.className=l._v$=d),$!==l._v$2&&(h.innerHTML=l._v$2=$),l},{_v$:void 0,_v$2:void 0}),n}})}const pe="_title_1uxrf_1";var ye={title:pe};const Te=m('<a target="_blank"></a>'),Ie=m("<h6></h6>"),Le=m("<article><div><h4></h4></div><p> points by <!> | <!> ago</p></article>");function D(e){return(()=>{const t=Le.cloneNode(!0),c=t.firstChild,n=c.firstChild,o=c.nextSibling,s=o.firstChild,i=s.nextSibling,u=i.nextSibling,h=u.nextSibling;return h.nextSibling,a(n,r(v,{get when(){return typeof e.index=="number"},get children(){return[y(()=>e.index),". "]}}),null),a(n,r(v,{get when(){return e.url},get fallback(){return()=>e.title},get children(){const l=Te.cloneNode(!0);return a(l,()=>e.title),_(d=>{const $=e.url,x=e.title;return $!==d._v$&&P(l,"href",d._v$=$),x!==d._v$2&&P(l,"title",d._v$2=x),d},{_v$:void 0,_v$2:void 0}),l}}),null),a(c,r(v,{get when(){return e.url},get children(){const l=Ie.cloneNode(!0);return a(l,()=>e.url&&`(${new URL(e.url).hostname})`),l}}),null),a(o,()=>e.score,s),a(o,()=>e.by,i),a(o,()=>z(p.fromSeconds(e.time)),h),a(o,r(v,{get when(){return e.descendants},get children(){return[" ","| ",r(j,{get href(){return`/item/${e.id}`},get children(){return[y(()=>e.descendants)," comments"]}})]}}),null),_(()=>c.className=ye.title),t})()}const xe=m("<article><h5>Loading...</h5></article>");function W(){return xe.cloneNode(!0)}const Ce="_page_1aejs_1";var Ee={page:Ce};const Pe=m("<section></section>");function K(e){return(()=>{const t=Pe.cloneNode(!0);return a(t,()=>e.children),_(()=>t.className=Ee.page),t})()}function je(){const e=A(),[t,c]=b();return C(async()=>{const n=await g.item(parseInt(e.id));if(n.descendants&&n.kids){const o=await Promise.all(n.kids.map(s=>g.item(s)));console.log(o)}console.log(n),c(n)}),r(K,{get children(){return r(v,{get when(){return t()!==void 0},fallback:()=>r(W,{}),get children(){return[r(D,B(()=>t())),r(E,{get each(){return t().kids},children:n=>r(q,{get id(){return n()}})})]}})}})}const Ae="/hn",Be=500,Me=200,S={BASE_PATH:Ae,LIMIT_JOB_ASK_SHOW:Me,LIMIT_TOP_NEW_BEST:Be},J=e=>{const t=parseInt(e.query.page);return isNaN(t)?0:t};function Oe(e){const t=e.pathname.replace(S.BASE_PATH,"");return t==="/"?"":t}const Fe="_container_1dqtz_1",Re="_control_1dqtz_9";var G={container:Fe,control:Re};const ze=m("<h4>load more</h4>"),He=m("<h4>go back</h4>"),N=m("<div></div>");function Q(e){const t=O(),c=V(),n=()=>J(t),o=()=>{const s=Oe(t);if(e.direction==="forward")c(`${s}/?page=${n()+1}`);else{const i=n()-1==0?s:`${s}/?page=${n()-1}`;c(i)}};return(()=>{const s=N.cloneNode(!0);return s.$$click=o,a(s,r(F,{get children(){return[r(w,{get when(){return e.direction==="forward"},get children(){return[ze.cloneNode(!0),r(X,{size:24})]}}),r(w,{get when(){return e.direction==="backward"},get children(){return[r(Y,{size:24}),He.cloneNode(!0)]}})]}})),_(()=>s.className=G.control),s})()}function qe(e){return(()=>{const t=N.cloneNode(!0);return a(t,r(v,{get when(){return e.showBackward},get fallback(){return N.cloneNode(!0)},get children(){return r(Q,{direction:"backward"})}}),null),a(t,r(v,{get when(){return e.showForward},get fallback(){return N.cloneNode(!0)},get children(){return r(Q,{direction:"forward"})}}),null),_(()=>t.className=G.container),t})()}M(["click"]);const De=m("<article><h5>No More Content</h5></article>");function We(){return De.cloneNode(!0)}const k=30;async function Ke({ids:e,page:t,pageSize:c}){const n=t*c,o=n+c,s=e.slice(n,o);return(await Promise.all(s.map(async u=>await g.item(u)))).filter(u=>ve(u))}function Je(e){switch(e){case"ask":return g.askStories();case"new":return g.newStories();case"best":return g.bestStories();case"jobs":return g.jobStories();case"show":return g.showStories();default:return g.topStories()}}function Ge(e){switch(e){case"ask":case"jobs":case"show":return S.LIMIT_JOB_ASK_SHOW;case"new":case"best":default:return S.LIMIT_TOP_NEW_BEST}}function U(){const e=O(),t=A(),c=()=>J(e),[n,o]=b([]),[s]=ee(()=>({ids:n(),page:c(),pageSize:k}),Ke);return te(async()=>{const i=await Je(t.contentType);o(i)}),r(K,{get children(){return r(F,{get children(){return[r(w,{get when(){return s.loading},get children(){return r(W,{})}}),r(w,{get when(){return c()*k>n().length},get children(){return r(We,{})}}),(()=>{const i=y(()=>!s.loading,!0);return r(w,{get when(){return i()&&n().length>0},get children(){return[r(R,{get each(){return s()},children:(u,h)=>r(D,B({get index(){return h()+1+c()*k},get url(){return"url"in u?u.url:void 0}},u))}),r(qe,{get showBackward(){return c()>0},get showForward(){return(c()+1)*k<Ge(t.contentType)}})]}})})()]}})}})}function Qe(){return r(ne,{get children(){return[r(T,{path:"/item/:id",get element(){return r(je,{})}}),r(T,{path:"/:contentType",get element(){return r(U,{})}}),r(T,{path:"/",get element(){return r(U,{})}})]}})}function Ue(){const[e,t]=b(document.documentElement.className);return[e,n=>{document.documentElement.className=n,t(document.documentElement.className),localStorage.setItem("theme",n)}]}const Ze="_footer_w6r6z_1",Ve="_clickable_w6r6z_10";var I={footer:Ze,clickable:Ve};const Xe=m('<footer><a target="_blank" href="https://github.com/ec965/hn">source code</a><p></p><p>scroll to top</p></footer>');function Ye(){const[e,t]=Ue(),c=()=>{t(e()==="dark"?"light":"dark")},n=()=>{window.scrollTo({top:0,behavior:"smooth"})};return(()=>{const o=Xe.cloneNode(!0),s=o.firstChild,i=s.nextSibling,u=i.nextSibling;return i.$$click=c,a(i,()=>e()==="dark"?"light mode":"dark mode"),u.$$click=n,_(h=>{const l=I.footer,d=I.clickable,$=I.clickable;return l!==h._v$&&(o.className=h._v$=l),d!==h._v$2&&(i.className=h._v$2=d),$!==h._v$3&&(u.className=h._v$3=$),h},{_v$:void 0,_v$2:void 0,_v$3:void 0}),o})()}M(["click"]);const et="_container_1stdd_1",tt="_nav_1stdd_5",nt="_active_1stdd_25";var L={container:et,nav:tt,active:nt};const rt=m("<h1>HN</h1>"),ot=m("<div><nav></nav></div>"),st=m("<h2></h2>");function ct(e){return(()=>{const t=ot.cloneNode(!0),c=t.firstChild;return a(c,r(j,{href:"/",get children(){return rt.cloneNode(!0)}}),null),a(c,r(R,{get each(){return e.links},children:n=>r(re,{get activeClass(){return L.active},get href(){return n.url},get children(){const o=st.cloneNode(!0);return a(o,()=>n.name),o}})}),null),_(n=>{const o=L.container,s=L.nav;return o!==n._v$&&(t.className=n._v$=o),s!==n._v$2&&(c.className=n._v$2=s),n},{_v$:void 0,_v$2:void 0}),t})()}const it=[{url:"/new",name:"new"},{url:"/best",name:"best"},{url:"/ask",name:"ask"},{url:"/show",name:"show"},{url:"/jobs",name:"jobs"}];function at(){return r(oe,{get base(){return S.BASE_PATH},get children(){return[r(ct,{links:it}),r(Qe,{}),r(Ye,{})]}})}document.documentElement.className=localStorage.getItem("theme")??"light";se(()=>r(at,{}),document.getElementById("root"));