"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[3731],{3905:(t,e,n)=>{n.d(e,{Zo:()=>m,kt:()=>N});var a=n(7294);function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function l(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function i(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?l(Object(n),!0).forEach((function(e){r(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function o(t,e){if(null==t)return{};var n,a,r=function(t,e){if(null==t)return{};var n,a,r={},l=Object.keys(t);for(a=0;a<l.length;a++)n=l[a],e.indexOf(n)>=0||(r[n]=t[n]);return r}(t,e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(t);for(a=0;a<l.length;a++)n=l[a],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(r[n]=t[n])}return r}var d=a.createContext({}),p=function(t){var e=a.useContext(d),n=e;return t&&(n="function"==typeof t?t(e):i(i({},e),t)),n},m=function(t){var e=p(t.components);return a.createElement(d.Provider,{value:e},t.children)},s="mdxType",u={inlineCode:"code",wrapper:function(t){var e=t.children;return a.createElement(a.Fragment,{},e)}},k=a.forwardRef((function(t,e){var n=t.components,r=t.mdxType,l=t.originalType,d=t.parentName,m=o(t,["components","mdxType","originalType","parentName"]),s=p(n),k=r,N=s["".concat(d,".").concat(k)]||s[k]||u[k]||l;return n?a.createElement(N,i(i({ref:e},m),{},{components:n})):a.createElement(N,i({ref:e},m))}));function N(t,e){var n=arguments,r=e&&e.mdxType;if("string"==typeof t||r){var l=n.length,i=new Array(l);i[0]=k;var o={};for(var d in e)hasOwnProperty.call(e,d)&&(o[d]=e[d]);o.originalType=t,o[s]="string"==typeof t?t:r,i[1]=o;for(var p=2;p<l;p++)i[p]=n[p];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}k.displayName="MDXCreateElement"},7768:(t,e,n)=>{n.r(e),n.d(e,{assets:()=>d,contentTitle:()=>i,default:()=>u,frontMatter:()=>l,metadata:()=>o,toc:()=>p});var a=n(7462),r=(n(7294),n(3905));const l={sidebar_position:3},i="Data Formats",o={unversionedId:"loading-data/data-formats",id:"loading-data/data-formats",title:"Data Formats",description:"This page describes file formats used in Chromoscope. To find a list of required and optional files, please refer to the Data Configuration section.",source:"@site/docs/loading-data/data-formats.md",sourceDirName:"loading-data",slug:"/loading-data/data-formats",permalink:"/docs/loading-data/data-formats",draft:!1,editUrl:"https://github.com/hms-dbmi/chromoscope/tree/main/docs/docs/loading-data/data-formats.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"docsSidebar",previous:{title:"Through Data Config",permalink:"/docs/loading-data/through-data-config"},next:{title:"Thumbnails",permalink:"/docs/loading-data/thumbnails"}},d={},p=[{value:"Structural Variants (BEDPE)",id:"structural-variants-bedpe",level:2},{value:"SV Type Mapping Table",id:"sv-type-mapping-table",level:3},{value:"CNV (TSV)",id:"cnv-tsv",level:2},{value:"Drivers (TSV or JSON)",id:"drivers-tsv-or-json",level:2},{value:"VCF &amp; TBI",id:"vcf--tbi",level:2},{value:"BAM &amp; BAI",id:"bam--bai",level:2},{value:"Data Sampling",id:"data-sampling",level:2}],m={toc:p},s="wrapper";function u(t){let{components:e,...l}=t;return(0,r.kt)(s,(0,a.Z)({},m,l,{components:e,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"data-formats"},"Data Formats"),(0,r.kt)("p",null,"This page describes file formats used in Chromoscope. To find a list of required and optional files, please refer to the ",(0,r.kt)("a",{parentName:"p",href:"./through-data-config"},"Data Configuration section"),"."),(0,r.kt)("h2",{id:"structural-variants-bedpe"},"Structural Variants (BEDPE)"),(0,r.kt)("p",null,"The structural variants are stored in a BEDPE file. The following columns are used in the browser:"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Property"),(0,r.kt)("th",{parentName:"tr",align:null},"Type"),(0,r.kt)("th",{parentName:"tr",align:null},"Note"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"chrom1")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"string")),(0,r.kt)("td",{parentName:"tr",align:null},"Required. The name of the chromosome of the first break point (BP).")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"start1")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"number")),(0,r.kt)("td",{parentName:"tr",align:null},"Required. The starting position of the first BP.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"end1")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"number")),(0,r.kt)("td",{parentName:"tr",align:null},"Required. The end position of the first BP.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"chrom2")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"string")),(0,r.kt)("td",{parentName:"tr",align:null},"Required. The name of the chromosome of the second BP.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"start2")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"number")),(0,r.kt)("td",{parentName:"tr",align:null},"Required. The starting position of the second BP.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"end2")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"number")),(0,r.kt)("td",{parentName:"tr",align:null},"Required. The end position of the second BP.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"sv_id")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"string")),(0,r.kt)("td",{parentName:"tr",align:null},"Required. The name of the SV.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"pe_support")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"string")),(0,r.kt)("td",{parentName:"tr",align:null},"Optional. The number of events that support SV shown in tooltips.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"strand1")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"string")),(0,r.kt)("td",{parentName:"tr",align:null},"Required. The strand for the first BP. Either ",(0,r.kt)("inlineCode",{parentName:"td"},"'+'")," or ",(0,r.kt)("inlineCode",{parentName:"td"},"'-'"),".")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"strand2")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"string")),(0,r.kt)("td",{parentName:"tr",align:null},"Required. The strand for the second BP. Either ",(0,r.kt)("inlineCode",{parentName:"td"},"'+'")," or ",(0,r.kt)("inlineCode",{parentName:"td"},"'-'"),".")))),(0,r.kt)("p",null,"Example file:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"https://somatic-browser-test.s3.amazonaws.com/SVTYPE_SV_test_tumor_normal_with_panel.bedpe\n")),(0,r.kt)("h3",{id:"sv-type-mapping-table"},"SV Type Mapping Table"),(0,r.kt)("p",null,"In Chromosope, strands are mapped with the following types of SVs."),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Inter-chromosomal SV types"),(0,r.kt)("th",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"th"},"strand1")),(0,r.kt)("th",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"th"},"strand2")))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Deletion"),(0,r.kt)("td",{parentName:"tr",align:null},"+"),(0,r.kt)("td",{parentName:"tr",align:null},"-")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Inversion (head-to-head)"),(0,r.kt)("td",{parentName:"tr",align:null},"+"),(0,r.kt)("td",{parentName:"tr",align:null},"+")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Inversion (tail-to-tail)"),(0,r.kt)("td",{parentName:"tr",align:null},"-"),(0,r.kt)("td",{parentName:"tr",align:null},"-")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Duplication"),(0,r.kt)("td",{parentName:"tr",align:null},"-"),(0,r.kt)("td",{parentName:"tr",align:null},"+")))),(0,r.kt)("h2",{id:"cnv-tsv"},"CNV (TSV)"),(0,r.kt)("p",null,"The CNV is stored in a tab-delimited file that is visualized as three tracks: CNV, Gain, and LOH."),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Property"),(0,r.kt)("th",{parentName:"tr",align:null},"Type"),(0,r.kt)("th",{parentName:"tr",align:null},"Note"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"chromosome")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"string")),(0,r.kt)("td",{parentName:"tr",align:null},"Required. The name of the chromosome.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"start")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"number")),(0,r.kt)("td",{parentName:"tr",align:null},"Required. The starting position.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"end")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"number")),(0,r.kt)("td",{parentName:"tr",align:null},"Required. The end position.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"total_cn")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"string")),(0,r.kt)("td",{parentName:"tr",align:null},"Required. The total number of copies.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"major_cn")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"number")),(0,r.kt)("td",{parentName:"tr",align:null},"Required. The major allele counts.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"minor_cn")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"number")),(0,r.kt)("td",{parentName:"tr",align:null},"Required. The minor allele counts.")))),(0,r.kt)("p",null,"Example file:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"https://s3.amazonaws.com/gosling-lang.org/data/SV/7a921087-8e62-4a93-a757-fd8cdbe1eb8f.consensus.20170119.somatic.cna.annotated.txt\n")),(0,r.kt)("h2",{id:"drivers-tsv-or-json"},"Drivers (TSV or JSON)"),(0,r.kt)("p",null,"The drivers are stored in a tab-delimited file. When this file is present, the browser will show drivers that are included in the file only."),(0,r.kt)("p",null,"The order of the columns does not need to be in the exact same order."),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Property"),(0,r.kt)("th",{parentName:"tr",align:null},"Type"),(0,r.kt)("th",{parentName:"tr",align:null},"Note"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"chr")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"string")),(0,r.kt)("td",{parentName:"tr",align:null},"Required. The name of the chromosome. ",(0,r.kt)("em",{parentName:"td"},"The names should contain ",(0,r.kt)("inlineCode",{parentName:"em"},"chr")," prefix"),", such as ",(0,r.kt)("inlineCode",{parentName:"td"},"chr2")," and ",(0,r.kt)("inlineCode",{parentName:"td"},"chrX"),".")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"pos")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"number")),(0,r.kt)("td",{parentName:"tr",align:null},"Required. The position of the driver.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"gene")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"string")),(0,r.kt)("td",{parentName:"tr",align:null},"Required. The name of the driver.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"ref")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"string")),(0,r.kt)("td",{parentName:"tr",align:null},"Optional. Information only shown on a tooltip.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"alt")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"string")),(0,r.kt)("td",{parentName:"tr",align:null},"Optional. Information only shown on a tooltip.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"category")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"string")),(0,r.kt)("td",{parentName:"tr",align:null},"Optional. Information only shown on a tooltip.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"top_category")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"string")),(0,r.kt)("td",{parentName:"tr",align:null},"Optional. Information only shown on a tooltip.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"transcript_consequence")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"string")),(0,r.kt)("td",{parentName:"tr",align:null},"Optional. Information only shown on a tooltip.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"protein_mutation")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"string")),(0,r.kt)("td",{parentName:"tr",align:null},"Optional. Information only shown on a tooltip.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"allele_fraction")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"string")),(0,r.kt)("td",{parentName:"tr",align:null},"Optional. Information only shown on a tooltip.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"mutation_type")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"string")),(0,r.kt)("td",{parentName:"tr",align:null},"Optional. Information only shown on a tooltip.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"biallelic")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"string")),(0,r.kt)("td",{parentName:"tr",align:null},"Required. Either ",(0,r.kt)("inlineCode",{parentName:"td"},"Yes")," or ",(0,r.kt)("inlineCode",{parentName:"td"},"No"),". Whether the mutation occurs on both alleles of a single gene.")))),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},(0,r.kt)("img",{alt:"biallelic",src:n(9495).Z,title:":class=image-small",width:"322",height:"320"})))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"An annotation representing a biallelic mutation.")))),(0,r.kt)("p",null,"Based on the ",(0,r.kt)("inlineCode",{parentName:"p"},"biallelic")," value, the browser shows annotations near the gene name: "),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"\u201c\u2299\u201d for biallelic when the ",(0,r.kt)("inlineCode",{parentName:"li"},"biallelic")," column is ",(0,r.kt)("inlineCode",{parentName:"li"},'"yes"')),(0,r.kt)("li",{parentName:"ul"},"\u201c.\u201d for not biallelic (i.e., mono-allelic) when ",(0,r.kt)("inlineCode",{parentName:"li"},'"no"')),(0,r.kt)("li",{parentName:"ul"},"no symbol when ",(0,r.kt)("inlineCode",{parentName:"li"},"undefined"))),(0,r.kt)("p",null,"Example file:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"https://gist.githubusercontent.com/sehilyi/350b9e633c52ad97df00a0fc13a8839a/raw/c47b9ba33f1c9e187c69d1dadd01838db44d3b29/driver.txt\n")),(0,r.kt)("h2",{id:"vcf--tbi"},"VCF & TBI"),(0,r.kt)("p",null,"For point mutations and indels, we use standard VCF files along with tabix files. To generate the tabix file, you can run the following command:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sh"},"tabix myfile.sorted.vcf.gz\n")),(0,r.kt)("p",null,"Refer to the documentation of Samtools for details (",(0,r.kt)("a",{parentName:"p",href:"https://www.htslib.org/doc/tabix.html"},"https://www.htslib.org/doc/tabix.html"),")."),(0,r.kt)("admonition",{type:"caution"},(0,r.kt)("p",{parentName:"admonition"},"The VCF files should be sorted and indexed to be able to make Chromoscope to properly show genomics features.")),(0,r.kt)("h2",{id:"bam--bai"},"BAM & BAI"),(0,r.kt)("p",null,"For read alignments, we use standard BAM files along with BAI files. To generate the index file, you can run the following command:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sh"},"samtools index myfile.sorted.bam.gz myfile.sorted.bam.bai\n")),(0,r.kt)("p",null,"Refer to the documentation of Samtools for details (",(0,r.kt)("a",{parentName:"p",href:"https://www.htslib.org/doc/samtools-index.html"},"https://www.htslib.org/doc/samtools-index.html"),")."),(0,r.kt)("admonition",{type:"caution"},(0,r.kt)("p",{parentName:"admonition"},"The BAM files should be sorted and indexed to be able to make Chromoscope to properly show genomics features.")),(0,r.kt)("h2",{id:"data-sampling"},"Data Sampling"),(0,r.kt)("p",null,"For the efficient rendering of visualizations, entire data is not shown in the whole genome scale for point mutations and indels."),(0,r.kt)("p",null,"Chromoscope selects ",(0,r.kt)("strong",{parentName:"p"},"500")," ",(0,r.kt)("a",{parentName:"p",href:"#vcf-amp-tbi"},"point mutations")," in each visible tile. Given that showing dense point mutations are important the corresponding tracks, Chromoscope keeps point mutations with relatively small ",(0,r.kt)("inlineCode",{parentName:"p"},"DISTPREV")," (i.e., distance to the previous mutation) and filter out mutations with relatively high ",(0,r.kt)("inlineCode",{parentName:"p"},"DISTPREV"),"."),(0,r.kt)("p",null,"Point mutations are selected dynamically based on the zoom level. Which means you can start to see more point mutations when you zoom in, allowing you to see all point mutations when you zoom in enough."))}u.isMDXComponent=!0},9495:(t,e,n)=>{n.d(e,{Z:()=>a});const a=n.p+"assets/images/biallelic-3183deabc8c393fc79b815bebe287853.png"}}]);