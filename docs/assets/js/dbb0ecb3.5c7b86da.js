"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[6089],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>v});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var c=r.createContext({}),l=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=l(e.components);return r.createElement(c.Provider,{value:t},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,a=e.originalType,c=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),p=l(n),m=i,v=p["".concat(c,".").concat(m)]||p[m]||d[m]||a;return n?r.createElement(v,o(o({ref:t},u),{},{components:n})):r.createElement(v,o({ref:t},u))}));function v(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=n.length,o=new Array(a);o[0]=m;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s[p]="string"==typeof e?e:i,o[1]=s;for(var l=2;l<a;l++)o[l]=n[l];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},829:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>d,frontMatter:()=>a,metadata:()=>s,toc:()=>l});var r=n(7462),i=(n(7294),n(3905));const a={sidebar_position:3},o="Variant View",s={unversionedId:"visualizations/variant-view",id:"visualizations/variant-view",title:"Variant View",description:"The variant view, focusing on a shorter genomic region, shows additional tracks on top of the tracks included in the genome view, including point mutations, indels, copy number variation, and genes.",source:"@site/docs/visualizations/variant-view.md",sourceDirName:"visualizations",slug:"/visualizations/variant-view",permalink:"/docs/visualizations/variant-view",draft:!1,editUrl:"https://github.com/hms-dbmi/chromoscope/tree/master/docs/docs/visualizations/variant-view.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"docsSidebar",previous:{title:"Genome View",permalink:"/docs/visualizations/genome-view"},next:{title:"Breakpoint View",permalink:"/docs/visualizations/breakpoint-view"}},c={},l=[{value:"Interactions",id:"interactions",level:2}],u={toc:l},p="wrapper";function d(e){let{components:t,...a}=e;return(0,i.kt)(p,(0,r.Z)({},u,a,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"variant-view"},"Variant View"),(0,i.kt)("p",null,"The variant view, focusing on a shorter genomic region, shows additional tracks on top of the tracks included in the genome view, including point mutations, indels, copy number variation, and genes."),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:null},(0,i.kt)("img",{alt:"Variant View",src:n(7257).Z,width:"1332",height:"587"})))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("strong",{parentName:"td"},"Figure.")," A linear view that shows the region that is selected by an interactive brush of the genome view.")))),(0,i.kt)("h2",{id:"interactions"},"Interactions"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"You can click on a structural variant of your interest using the mouse. Upon clicking, the browser instantly shows a ",(0,i.kt)("a",{parentName:"li",href:"./breakpoint-view"},"breakpoint view")," on the bottom that highlights read alignments around the breakpoints.")))}d.isMDXComponent=!0},7257:(e,t,n)=>{n.d(t,{Z:()=>r});const r=n.p+"assets/images/linear-view-48d12e778d73522757e47323d1bd3426.png"}}]);