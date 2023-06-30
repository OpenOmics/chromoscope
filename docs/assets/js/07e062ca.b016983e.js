"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[2776],{3905:(e,t,a)=>{a.d(t,{Zo:()=>c,kt:()=>h});var n=a(7294);function o(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){o(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,n,o=function(e,t){if(null==e)return{};var a,n,o={},r=Object.keys(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||(o[a]=e[a]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(o[a]=e[a])}return o}var i=n.createContext({}),p=function(e){var t=n.useContext(i),a=t;return e&&(a="function"==typeof e?e(t):l(l({},t),e)),a},c=function(e){var t=p(e.components);return n.createElement(i.Provider,{value:t},e.children)},d="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var a=e.components,o=e.mdxType,r=e.originalType,i=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),d=p(a),u=o,h=d["".concat(i,".").concat(u)]||d[u]||m[u]||r;return a?n.createElement(h,l(l({ref:t},c),{},{components:a})):n.createElement(h,l({ref:t},c))}));function h(e,t){var a=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=a.length,l=new Array(r);l[0]=u;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s[d]="string"==typeof e?e:o,l[1]=s;for(var p=2;p<r;p++)l[p]=a[p];return n.createElement.apply(null,l)}return n.createElement.apply(null,a)}u.displayName="MDXCreateElement"},6144:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>i,contentTitle:()=>l,default:()=>m,frontMatter:()=>r,metadata:()=>s,toc:()=>p});var n=a(7462),o=(a(7294),a(3905));const r={sidebar_position:6},l="Loading Local Data",s={unversionedId:"loading-data/local-data",id:"loading-data/local-data",title:"Loading Local Data",description:"You may also want to see the Chromoscope Python package, which allows you to load local files on computational notebooks.",source:"@site/docs/loading-data/local-data.md",sourceDirName:"loading-data",slug:"/loading-data/local-data",permalink:"/docs/loading-data/local-data",draft:!1,editUrl:"https://github.com/hms-dbmi/chromoscope/tree/main/docs/docs/loading-data/local-data.md",tags:[],version:"current",sidebarPosition:6,frontMatter:{sidebar_position:6},sidebar:"docsSidebar",previous:{title:"URL Parameters",permalink:"/docs/loading-data/url-parameters"},next:{title:"Loading Private Data",permalink:"/docs/loading-data/loading-private-data"}},i={},p=[{value:"Run Local File Server",id:"run-local-file-server",level:2},{value:"Make Data Config",id:"make-data-config",level:2},{value:"Open Browser",id:"open-browser",level:2}],c={toc:p},d="wrapper";function m(e){let{components:t,...r}=e;return(0,o.kt)(d,(0,n.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"loading-local-data"},"Loading Local Data"),(0,o.kt)("admonition",{type:"tip"},(0,o.kt)("p",{parentName:"admonition"},"You may also want to see the ",(0,o.kt)("a",{parentName:"p",href:"./python-package"},"Chromoscope Python package"),", which allows you to load local files on computational notebooks.")),(0,o.kt)("p",null,"You can run a local file server to display local files on Chromoscope. This enables you to safely visualize your private files. There are multiple light and easy-to-install file servers. In this page, we will use ",(0,o.kt)("a",{parentName:"p",href:"https://www.npmjs.com/package/http-server"},"http-server")," for the demonstration."),(0,o.kt)("h2",{id:"run-local-file-server"},"Run Local File Server"),(0,o.kt)("p",null,"You first need to install the file server called ",(0,o.kt)("a",{parentName:"p",href:"https://www.npmjs.com/package/http-server"},"http-server"),". To install it, you need to first install a package manager, ",(0,o.kt)("a",{parentName:"p",href:"https://docs.npmjs.com/downloading-and-installing-node-js-and-npm#using-a-node-installer-to-install-node-js-and-npm"},"npm"),"."),(0,o.kt)("p",null,"After installing the ",(0,o.kt)("a",{parentName:"p",href:"https://docs.npmjs.com/downloading-and-installing-node-js-and-npm#using-a-node-installer-to-install-node-js-and-npm"},"npm"),", you can use it to install ",(0,o.kt)("a",{parentName:"p",href:"https://www.npmjs.com/package/http-server"},"http-server"),". For example, run the following command on your terminal."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"npm install http-server -g\n")),(0,o.kt)("p",null,"Now you can run the server on the designated folder."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"http-server ./path-to-your-folder --cors\n")),(0,o.kt)("p",null,"Note that the ",(0,o.kt)("inlineCode",{parentName:"p"},"--cors")," option allows the browser to access your files."),(0,o.kt)("p",null,"Now, you can browse files that are located under the selected folder using your browser. For example, open ",(0,o.kt)("a",{parentName:"p",href:"http://127.0.0.1:8080/"},"http://127.0.0.1:8080/")," on the browser."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"server",src:a(5800).Z,title:":class=image-small",width:"1304",height:"372"})),(0,o.kt)("admonition",{type:"info"},(0,o.kt)("p",{parentName:"admonition"},"Also see ",(0,o.kt)("a",{parentName:"p",href:"https://stackoverflow.com/a/16350826"},"https://stackoverflow.com/a/16350826"))),(0,o.kt)("h2",{id:"make-data-config"},"Make Data Config"),(0,o.kt)("p",null,"Using the URL of the local files, you can make a ",(0,o.kt)("a",{parentName:"p",href:"./through-data-config"},"data config"),". For example, the following example uses two files (i.e., SV and CNV) based on the local files."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json"},'{\n    "id": "SRR7890905",\n    "cancer": "breast",\n    "assembly": "hg38",\n    "sv":  "http://127.0.0.1:8080/SVTYPE_SV_test_tumor_normal_with_panel.bedpe",\n    "cnv": "http://127.0.0.1:8080/SRR7890943.ascat.v3.cnv.tsv"\n}\n')),(0,o.kt)("admonition",{type:"tip"},(0,o.kt)("p",{parentName:"admonition"},"You can download the following files to test this."),(0,o.kt)("ul",{parentName:"admonition"},(0,o.kt)("li",{parentName:"ul"},"SV: ",(0,o.kt)("a",{parentName:"li",href:"https://somatic-browser-test.s3.amazonaws.com/SVTYPE_SV_test_tumor_normal_with_panel.bedpe"},"https://somatic-browser-test.s3.amazonaws.com/SVTYPE_SV_test_tumor_normal_with_panel.bedpe")),(0,o.kt)("li",{parentName:"ul"},"CNV: ",(0,o.kt)("a",{parentName:"li",href:"https://gist.githubusercontent.com/sehilyi/6fbceae35756b13472332d6b81b10803/raw/596428a8b0ebc00e7f8cbc52b050db0fbd6e19a5/SRR7890943.ascat.v3.cnv.tsv"},"https://gist.githubusercontent.com/sehilyi/6fbceae35756b13472332d6b81b10803/raw/596428a8b0ebc00e7f8cbc52b050db0fbd6e19a5/SRR7890943.ascat.v3.cnv.tsv")))),(0,o.kt)("p",null,"Optionally, put this data config file (say, ",(0,o.kt)("inlineCode",{parentName:"p"},"first-config.json"),") under the folder hosted by your ",(0,o.kt)("a",{parentName:"p",href:"https://www.npmjs.com/package/http-server"},"http-server"),". You should be able to open the data config file on the browser using ",(0,o.kt)("a",{parentName:"p",href:"http://127.0.0.1:8080/first-config.json"},"http://127.0.0.1:8080/first-config.json"),"."),(0,o.kt)("h2",{id:"open-browser"},"Open Browser"),(0,o.kt)("p",null,"As a last step, use the data config to browse your local files."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"https://chromoscope.bio/?external=http://127.0.0.1:8080/first-config.json\n")),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"browser",src:a(871).Z,title:":class=image-medium",width:"1582",height:"1706"})))}m.isMDXComponent=!0},871:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/private-data-browser-a3be6cb2e6dda4ff53d0041f56e1f984.png"},5800:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/private-data-local-server-148d59265b7d8f30981e58f917f4319a.png"}}]);