var e=Object.defineProperty,t=Object.defineProperties,a=Object.getOwnPropertyDescriptors,n=Object.getOwnPropertySymbols,i=Object.prototype.hasOwnProperty,l=Object.prototype.propertyIsEnumerable,o=(t,a,n)=>a in t?e(t,a,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[a]=n,r=(e,t)=>{for(var a in t||(t={}))i.call(t,a)&&o(e,a,t[a]);if(n)for(var a of n(t))l.call(t,a)&&o(e,a,t[a]);return e};import{r as s,l as d,R as c,g as m,a as g}from"./vendor.e946dadc.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const a of e)if("childList"===a.type)for(const e of a.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?t.credentials="include":"anonymous"===e.crossorigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();var p={color:{svclass:{domain:["DUP","TRA","DEL","t2tlNV","h2hlNV"],range:["#569C4D","#4C75A2","#DA5456","#EA8A2A","#ECC949"]}}};function u(e){const{svUrl:n,cnvUrl:i,showPutativeDriver:l,showOverview:o,width:s}=e,d=Math.min(s,600),c=s,m=s/2-10;return{layout:"linear",arrangement:"vertical",centerRadius:.5,assembly:"hg19",spacing:40,style:{outlineWidth:1,outline:"lightgray",enableSmoothPath:!1},views:[{arrangement:"vertical",views:[...h((g=r({},e),u={width:d},t(g,a(u)))),{linkingId:"mid-scale",xDomain:{chromosome:"1"},layout:"linear",tracks:[{id:"mid-view",style:{background:"#D7EBFF",outline:"#8DC1F2",outlineWidth:5},title:"Ideogram",alignment:"overlay",data:{url:"https://raw.githubusercontent.com/sehilyi/gemini-datasets/master/data/UCSC.HG38.Human.CytoBandIdeogram.csv",type:"csv",chromosomeField:"Chromosome",genomicFields:["chromStart","chromEnd"]},tracks:[{mark:"rect",dataTransform:[{type:"filter",field:"Stain",oneOf:["acen"],not:!0}]},{mark:"triangleRight",dataTransform:[{type:"filter",field:"Stain",oneOf:["acen"]},{type:"filter",field:"Name",include:"q"}]},{mark:"triangleLeft",dataTransform:[{type:"filter",field:"Stain",oneOf:["acen"]},{type:"filter",field:"Name",include:"p"}]},{mark:"text",dataTransform:[{type:"filter",field:"Stain",oneOf:["acen"],not:!0}],size:{value:12},color:{field:"Stain",type:"nominal",domain:["gneg","gpos25","gpos50","gpos75","gpos100","gvar"],range:["black","black","black","black","white","black"]},visibility:[{operation:"less-than",measure:"width",threshold:"|xe-x|",transitionPadding:10,target:"mark"}]}],color:{field:"Stain",type:"nominal",domain:["gneg","gpos25","gpos50","gpos75","gpos100","gvar","acen"],range:["white","lightgray","gray","gray","black","#7B9CC8","#DC4542"]},size:{value:18},x:{field:"chromStart",type:"genomic"},xe:{field:"chromEnd",type:"genomic"},text:{field:"Name",type:"nominal"},stroke:{value:"gray"},strokeWidth:{value:.3},width:c,height:30},...l?[{title:"Putative Driver",data:{url:"https://s3.amazonaws.com/gosling-lang.org/data/SV/driver.df.scanb.complete.csv",type:"csv",chromosomeField:"Chr",genomicFields:["ChrStart","ChrEnd"]},dataTransform:[{type:"filter",field:"Sample",oneOf:["PD35930a"]}],mark:"text",x:{field:"ChrStart",type:"genomic"},xe:{field:"ChrEnd",type:"genomic"},text:{field:"Gene",type:"nominal"},color:{value:"black"},style:{textFontWeight:"normal",dx:-10},width:c,height:20}]:[],{alignment:"overlay",title:"hg38 | Genes",template:"gene",data:{url:"https://server.gosling-lang.org/api/v1/tileset_info/?d=gene-annotation",type:"beddb",genomicFields:[{index:1,name:"start"},{index:2,name:"end"}],valueFields:[{index:5,name:"strand",type:"nominal"},{index:3,name:"name",type:"nominal"}],exonIntervalFields:[{index:12,name:"start"},{index:13,name:"end"}]},encoding:{startPosition:{field:"start"},endPosition:{field:"end"},strandColor:{field:"strand",range:["gray"]},strandRow:{field:"strand"},opacity:{value:.4},geneHeight:{value:20},geneLabel:{field:"name"},geneLabelFontSize:{value:20},geneLabelColor:{field:"strand",range:["gray"]},geneLabelStroke:{value:"white"},geneLabelStrokeThickness:{value:4},geneLabelOpacity:{value:1},type:{field:"type"}},width:c,height:100},{title:"Gain",style:{background:"lightgray",backgroundOpacity:.2},data:{separator:"\t",url:i,type:"csv",chromosomeField:"chromosome",genomicFields:["start","end"]},dataTransform:[{type:"filter",field:"aceseq_copy_number",inRange:[4.5,900]}],mark:"rect",x:{field:"start",type:"genomic"},xe:{field:"end",type:"genomic"},color:{value:"#73C475"},width:c,height:20},{title:"LOH",style:{background:"lightgray",backgroundOpacity:.2},data:{separator:"\t",url:i,type:"csv",chromosomeField:"chromosome",genomicFields:["start","end"]},dataTransform:[{type:"filter",field:"minor_cn",oneOf:["0"]}],mark:"rect",x:{field:"start",type:"genomic"},xe:{field:"end",type:"genomic"},color:{value:"#FB6A4B"},width:c,height:20},{title:"Structural Variant",data:{url:n,type:"csv",separator:"\t",genomicFieldsToConvert:[{chromosomeField:"chrom1",genomicFields:["start1","end1"]},{chromosomeField:"chrom2",genomicFields:["start2","end2"]}]},alignment:"overlay",tracks:[{mark:"withinLink",x:{field:"start1",type:"genomic"},xe:{field:"end2",type:"genomic"}},{mark:"point",x:{field:"start1",type:"genomic"},y:{value:400}},{mark:"point",x:{field:"end2",type:"genomic"},y:{value:400}}],color:{field:"svclass",type:"nominal",legend:!0,domain:p.color.svclass.domain,range:p.color.svclass.range},stroke:{field:"svclass",type:"nominal",domain:p.color.svclass.domain,range:p.color.svclass.range},strokeWidth:{value:1},opacity:{value:.6},size:{value:4},style:{legendTitle:"SV Class",bazierLink:!0},width:c,height:200}]}]},{arrangement:"horizontal",spacing:20,views:[{static:!1,layout:"linear",centerRadius:.05,xDomain:{chromosome:"1",interval:[205e3,207e3]},spacing:.01,tracks:[{title:"Coverage",data:{type:"bam",url:"https://aveit.s3.amazonaws.com/higlass/bam/example_higlass.bam"},dataTransform:[{type:"coverage",startField:"from",endField:"to"}],mark:"bar",x:{field:"from",type:"genomic"},xe:{field:"to",type:"genomic"},y:{field:"coverage",type:"quantitative",axis:"right",grid:!0},color:{value:"lightgray"},stroke:{value:"gray"},width:m,height:80},{alignment:"overlay",title:"hg38 | Genes",template:"gene",data:{url:"https://server.gosling-lang.org/api/v1/tileset_info/?d=gene-annotation",type:"beddb",genomicFields:[{index:1,name:"start"},{index:2,name:"end"}],valueFields:[{index:5,name:"strand",type:"nominal"},{index:3,name:"name",type:"nominal"}],exonIntervalFields:[{index:12,name:"start"},{index:13,name:"end"}]},encoding:{startPosition:{field:"start"},endPosition:{field:"end"},strandColor:{field:"strand",range:["gray"]},strandRow:{field:"strand"},opacity:{value:.4},geneHeight:{value:20},geneLabel:{field:"name"},geneLabelFontSize:{value:20},geneLabelColor:{field:"strand",range:["gray"]},geneLabelStroke:{value:"white"},geneLabelStrokeThickness:{value:4},geneLabelOpacity:{value:1},type:{field:"type"}},width:m,height:100},{title:"Sequence",alignment:"overlay",data:{url:"https://server.gosling-lang.org/api/v1/tileset_info/?d=sequence-multivec",type:"multivec",row:"base",column:"position",value:"count",categories:["A","T","G","C"],start:"start",end:"end"},tracks:[{mark:"bar",y:{field:"count",type:"quantitative",axis:"none"}},{dataTransform:[{type:"filter",field:"count",oneOf:[0],not:!0}],mark:"text",x:{field:"start",type:"genomic"},xe:{field:"end",type:"genomic"},size:{value:24},color:{value:"white"},visibility:[{operation:"less-than",measure:"width",threshold:"|xe-x|",transitionPadding:30,target:"mark"},{operation:"LT",measure:"zoomLevel",threshold:10,target:"track"}]}],x:{field:"position",type:"genomic"},color:{field:"base",type:"nominal",domain:["A","T","G","C"],legend:!0},text:{field:"base",type:"nominal"},style:{inlineLegend:!0,outline:"white"},width:m,height:40},{alignment:"overlay",title:"Reads",data:{type:"bam",url:"https://aveit.s3.amazonaws.com/higlass/bam/example_higlass.bam"},mark:"rect",tracks:[{dataTransform:[{type:"displace",method:"pile",boundingBox:{startField:"from",endField:"to",padding:5,isPaddingBP:!0},newField:"pileup-row"}],x:{field:"from",type:"genomic"},xe:{field:"to",type:"genomic"},stroke:{value:"white"},strokeWidth:{value:.5}},{dataTransform:[{type:"displace",method:"pile",boundingBox:{startField:"from",endField:"to",padding:5,isPaddingBP:!0},newField:"pileup-row"},{type:"subjson",field:"substitutions",genomicField:"pos",baseGenomicField:"from",genomicLengthField:"length"},{type:"filter",field:"type",oneOf:["sub"]}],x:{field:"pos_start",type:"genomic"},xe:{field:"pos_end",type:"genomic"},color:{field:"variant",type:"nominal",domain:["A","T","G","C","S","H","X","I","D"],legend:!0}}],y:{field:"pileup-row",type:"nominal",flip:!1},color:{value:"#97A8B2"},style:{outlineWidth:.5},width:m,height:310}]},{static:!1,layout:"linear",centerRadius:.05,xDomain:{chromosome:"1",interval:[49e4,496e3]},spacing:.01,tracks:[{title:"Coverage",data:{type:"bam",url:"https://aveit.s3.amazonaws.com/higlass/bam/example_higlass.bam"},dataTransform:[{type:"coverage",startField:"from",endField:"to"}],mark:"bar",x:{field:"from",type:"genomic"},xe:{field:"to",type:"genomic"},y:{field:"coverage",type:"quantitative",axis:"right",grid:!0},color:{value:"lightgray"},stroke:{value:"gray"},width:m,height:80},{alignment:"overlay",title:"hg38 | Genes",template:"gene",data:{url:"https://server.gosling-lang.org/api/v1/tileset_info/?d=gene-annotation",type:"beddb",genomicFields:[{index:1,name:"start"},{index:2,name:"end"}],valueFields:[{index:5,name:"strand",type:"nominal"},{index:3,name:"name",type:"nominal"}],exonIntervalFields:[{index:12,name:"start"},{index:13,name:"end"}]},encoding:{startPosition:{field:"start"},endPosition:{field:"end"},strandColor:{field:"strand",range:["gray"]},strandRow:{field:"strand"},opacity:{value:.4},geneHeight:{value:20},geneLabel:{field:"name"},geneLabelFontSize:{value:20},geneLabelColor:{field:"strand",range:["gray"]},geneLabelStroke:{value:"white"},geneLabelStrokeThickness:{value:4},geneLabelOpacity:{value:1},type:{field:"type"}},width:m,height:100},{title:"Sequence",alignment:"overlay",data:{url:"https://server.gosling-lang.org/api/v1/tileset_info/?d=sequence-multivec",type:"multivec",row:"base",column:"position",value:"count",categories:["A","T","G","C"],start:"start",end:"end"},tracks:[{mark:"bar",y:{field:"count",type:"quantitative",axis:"none"}},{dataTransform:[{type:"filter",field:"count",oneOf:[0],not:!0}],mark:"text",x:{field:"start",type:"genomic"},xe:{field:"end",type:"genomic"},size:{value:24},color:{value:"white"},visibility:[{operation:"less-than",measure:"width",threshold:"|xe-x|",transitionPadding:30,target:"mark"},{operation:"LT",measure:"zoomLevel",threshold:10,target:"track"}]}],x:{field:"position",type:"genomic"},color:{field:"base",type:"nominal",domain:["A","T","G","C"],legend:!0},text:{field:"base",type:"nominal"},style:{inlineLegend:!0,outline:"white"},width:m,height:40},{alignment:"overlay",title:"Reads",data:{type:"bam",url:"https://aveit.s3.amazonaws.com/higlass/bam/example_higlass.bam"},mark:"rect",tracks:[{dataTransform:[{type:"displace",method:"pile",boundingBox:{startField:"from",endField:"to",padding:5,isPaddingBP:!0},newField:"pileup-row"}],x:{field:"from",type:"genomic"},xe:{field:"to",type:"genomic"},stroke:{value:"white"},strokeWidth:{value:.5}},{dataTransform:[{type:"displace",method:"pile",boundingBox:{startField:"from",endField:"to",padding:5,isPaddingBP:!0},newField:"pileup-row"},{type:"subjson",field:"substitutions",genomicField:"pos",baseGenomicField:"from",genomicLengthField:"length"},{type:"filter",field:"type",oneOf:["sub"]}],x:{field:"pos_start",type:"genomic"},xe:{field:"pos_end",type:"genomic"},color:{field:"variant",type:"nominal",domain:["A","T","G","C","S","H","X","I","D"],legend:!0}}],y:{field:"pileup-row",type:"nominal",flip:!1},color:{value:"#97A8B2"},style:{outlineWidth:.5},width:m,height:310}]}]}]};var g,u}function h(e){const{cnvUrl:t,svUrl:a,width:n,showPutativeDriver:i,showOverview:l}=e;return l?[{layout:"circular",spacing:1,tracks:[{id:"top-view",title:"Ideogram",alignment:"overlay",data:{url:"https://raw.githubusercontent.com/sehilyi/gemini-datasets/master/data/UCSC.HG38.Human.CytoBandIdeogram.csv",type:"csv",chromosomeField:"Chromosome",genomicFields:["chromStart","chromEnd"]},tracks:[{mark:"rect"},{mark:"brush",x:{linkingId:"mid-scale"},strokeWidth:{value:1.5},stroke:{value:"#0070DC"},color:{value:"#AFD8FF"},opacity:{value:.5}}],color:{field:"Stain",type:"nominal",domain:["gneg","gpos25","gpos50","gpos75","gpos100","gvar","acen"],range:["white","lightgray","gray","gray","black","#7B9CC8","#DC4542"]},size:{value:18},x:{field:"chromStart",type:"genomic"},xe:{field:"chromEnd",type:"genomic"},stroke:{value:"gray"},strokeWidth:{value:.3},width:n,height:100},...i?[{title:"Putative Driver",alignment:"overlay",data:{url:"https://s3.amazonaws.com/gosling-lang.org/data/SV/driver.df.scanb.complete.csv",type:"csv",chromosomeField:"Chr",genomicFields:["ChrStart","ChrEnd"]},dataTransform:[{type:"filter",field:"Sample",oneOf:["PD35930a"]}],tracks:[{mark:"text"},{mark:"triangleBottom",size:{value:5}}],x:{field:"ChrStart",type:"genomic"},xe:{field:"ChrEnd",type:"genomic"},text:{field:"Gene",type:"nominal"},color:{value:"black"},style:{textFontWeight:"normal",dx:-10,outlineWidth:0},width:n,height:40}]:[],{title:"Gain",style:{background:"lightgray",backgroundOpacity:.2},alignment:"overlay",data:{separator:"\t",url:t,type:"csv",chromosomeField:"chromosome",genomicFields:["start","end"],quantitativeFields:["total_cn"]},dataTransform:[{type:"filter",field:"total_cn",inRange:[4.9999,999999999]}],tracks:[{mark:"rect"},{mark:"brush",x:{linkingId:"mid-scale"},strokeWidth:{value:0}}],x:{field:"start",type:"genomic"},xe:{field:"end",type:"genomic"},color:{value:"#73C475"},width:n,height:40},{title:"LOH",style:{background:"lightgray",backgroundOpacity:.2},alignment:"overlay",data:{separator:"\t",url:t,type:"csv",chromosomeField:"chromosome",genomicFields:["start","end"]},dataTransform:[{type:"filter",field:"minor_cn",oneOf:["0"]}],tracks:[{mark:"rect"},{mark:"brush",x:{linkingId:"mid-scale"},strokeWidth:{value:1},stroke:{value:"#94C2EF"},color:{value:"#AFD8FF"}}],x:{field:"start",type:"genomic"},xe:{field:"end",type:"genomic"},color:{value:"#FB6A4B"},width:n,height:40},{title:"Structural Variant",data:{url:a,type:"csv",separator:"\t",genomicFieldsToConvert:[{chromosomeField:"chrom1",genomicFields:["start1","end1"]},{chromosomeField:"chrom2",genomicFields:["start2","end2"]}]},mark:"withinLink",x:{field:"start1",type:"genomic"},xe:{field:"end2",type:"genomic"},color:{field:"svclass",type:"nominal",legend:!0,domain:p.color.svclass.domain,range:p.color.svclass.range},stroke:{field:"svclass",type:"nominal",domain:p.color.svclass.domain,range:p.color.svclass.range},strokeWidth:{value:1},opacity:{value:.6},style:{legendTitle:"SV Class"},width:n,height:80}]}]:[]}var v={"gosling.js":"0.9.3",lodash:"^4.17.21","pixi.js":"^6.0.4",react:"^17.0.0","react-dom":"^17.0.0"};const f=window.innerWidth,y=["chr1","chr2","chr3","chr4","chr5","chr6","chr7","chr8","chr9","chr10","chr11","chr12","chr13","chr14","chr15","chr16","chr17","chr18","chr19","chr20","chr21","chr22","chrX","chrY"];function x(){const e=s.exports.useRef(),[t,a]=s.exports.useState("https://s3.amazonaws.com/gosling-lang.org/data/SV/84ca6ab0-9edc-4636-9d27-55cdba334d7d.pcawg_consensus_1.6.161022.somatic.sv.bedpe"),[n,i]=s.exports.useState("https://s3.amazonaws.com/gosling-lang.org/data/SV/84ca6ab0-9edc-4636-9d27-55cdba334d7d.consensus.20170119.somatic.cna.annotated.txt"),[l,o]=s.exports.useState(!0),[r,g]=s.exports.useState(!0),[p,h]=s.exports.useState(f-400-120),[x,b]=s.exports.useState(""),[k,w]=s.exports.useState("");s.exports.useEffect((()=>{var t,a;x&&(x.includes("chr")?(null==(t=e.current)||t.api.zoomTo("top-view",x),w(x)):null==(a=e.current)||a.api.zoomToExtent("top-view"))}),[x]),s.exports.useEffect((()=>{var t,a;k&&(k.includes("chr")?null==(t=e.current)||t.api.zoomTo("mid-view",k):null==(a=e.current)||a.api.zoomToExtent("mid-view"))}),[k]),s.exports.useEffect((()=>{window.addEventListener("resize",d.exports.debounce((()=>{h(window.innerWidth-400-120)}),100))}),[]);const F=s.exports.useMemo((()=>c.createElement(m.exports.GoslingComponent,{ref:e,spec:JSON.parse(JSON.stringify(u({svUrl:t,cnvUrl:n,showOverview:l,showPutativeDriver:r,width:p}))),padding:0,margin:0,compiled:e=>{console.log(e)}})),[p,l,r,t,n]);return c.createElement(c.Fragment,null,c.createElement("div",{className:"config-panel",style:{width:360}},c.createElement("div",{className:"panel-title"},"Configuration"),c.createElement("div",{className:"config-panel-section-title"},"Data"),c.createElement("div",{className:"config-panel-input-container"},c.createElement("span",{className:"config-panel-label"},"SV",c.createElement("small",null)),c.createElement("span",{className:"config-panel-input"},c.createElement("input",{className:"config-panel-search-box",type:"text",value:t,disabled:!0}))),c.createElement("div",{className:"config-panel-input-container"},c.createElement("span",{className:"config-panel-label"},"CNV",c.createElement("small",null)),c.createElement("span",{className:"config-panel-input"},c.createElement("input",{className:"config-panel-search-box",type:"text",value:n,disabled:!0}))),c.createElement("div",{className:"config-panel-section-title"},"Navigation"),c.createElement("div",{className:"config-panel-input-container"},c.createElement("span",{className:"config-panel-label"},"Circular Overview"),c.createElement("span",{className:"config-panel-input"},c.createElement("select",{className:"config-panel-dropdown",onChange:e=>b(e.currentTarget.value),value:x,disabled:!l},["All",...y].map((e=>c.createElement("option",{key:e,value:e},e)))))),c.createElement("div",{className:"config-panel-input-container"},c.createElement("span",{className:"config-panel-label"},"Linear Genome View"),c.createElement("span",{className:"config-panel-input"},c.createElement("select",{className:"config-panel-dropdown",onChange:e=>w(e.currentTarget.value),value:k},y.map((e=>c.createElement("option",{key:e,value:e},e)))))),c.createElement("div",{className:"config-panel-section-title"},"Visibility"),c.createElement("div",{className:"config-panel-input-container"},c.createElement("span",{className:"config-panel-label"},"Circular Overview"),c.createElement("span",{className:"config-panel-input"},c.createElement("input",{type:"checkbox",checked:l,onChange:()=>{o(!l)}}))),c.createElement("div",{className:"config-panel-input-container"},c.createElement("span",{className:"config-panel-label"},"Putative Driver Track"),c.createElement("span",{className:"config-panel-input"},c.createElement("input",{type:"checkbox",checked:r,onChange:()=>{g(!r)}}))),c.createElement("div",{className:"config-panel-section-title"},"Export"),c.createElement("div",{className:"config-panel-button",onClick:()=>{var t;return null==(t=e.current)?void 0:t.api.exportPng()}},"PNG")),c.createElement("div",{className:"vis-panel",style:{height:"calc(100% - 120px)",padding:60}},F,c.createElement("div",{className:"vis-panel-title panel-title"},c.createElement("small",null,"v",v["gosling.js"]))))}g.render(c.createElement(x,null),document.getElementById("root"));
