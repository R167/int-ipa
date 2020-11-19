(this["webpackJsonpint-ipa"]=this["webpackJsonpint-ipa"]||[]).push([[0],{122:function(e,t,a){"use strict";a.r(t);var r=a(3),c=a(0),n=a.n(c),s=a(13),o=a.n(s),i=a(186),l=a(15),d=a(44),p=a(45),j=a.n(p);const b="".concat("","/manifest.yaml"),u=n.a.createContext(null),h=async()=>{const e=await fetch(b),t=await e.text();return j.a.parse(t,{prettyErrors:!0})},m=()=>{const e=Object(c.useContext)(u);if(!e)throw new Error("Error: you must create an initial manifest object");return e};let x=!1;var g=({children:e})=>{const t=Object(d.a)(h,[]);return t.error&&!x&&(x=!0,console.log(t.error.message),console.log(t.error),t.error.name.match(/^YAML/)?alert("Error: Your manifest.yaml contains invalid syntax. Please check the console for more info."):alert("There was an error loading your manifest.yaml")),Object(r.jsx)(u.Provider,{value:t,children:e})},O=a(38),v=a(156),f=a(188),y=a(96),k=a(157),w=a(33);const C=(e,t)=>"".concat(e.replace("class","ex"),"/").concat(t);var S=e=>{const{tasks:t,path:a}=e;return 0===t.length?Object(r.jsx)(O.a,{children:"No tasks to do"}):Object(r.jsx)(v.a,{container:!0,spacing:4,children:t.map(((e,t)=>!e.hidden&&Object(r.jsx)(v.a,{item:!0,lg:6,xs:12,children:Object(r.jsxs)(f.a,{component:y.a,p:2,height:"100%",display:"flex",alignContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",children:[Object(r.jsxs)(f.a,{children:[Object(r.jsx)(O.a,{color:"primary",gutterBottom:!0,children:e.name}),Object(r.jsx)(O.a,{variant:"body2",gutterBottom:!0,children:e.description})]}),Object(r.jsx)(f.a,{display:"flex",justifyContent:"flex-end",alignItems:"flex-end",width:"100%",children:Object(r.jsx)(k.a,{component:w.b,color:"secondary",variant:"contained",to:C(a,e.file),children:"Work on task"})})]})},"tasklist-".concat(t))))})};const N=async e=>{if(!e)return void console.log("empty class");const t=(a=e,r="tasks.yaml","".concat("","/").concat(a,"/").concat(r));var a,r;const c=await fetch(t),n=await c.text();return j.a.parse(n,{prettyErrors:!0})},R=({msg:e,error:t})=>Object(r.jsxs)(O.a,{variant:"h3",component:"h1",gutterBottom:!0,align:"center",children:[t&&"Error: ",e]});var E=e=>{var t,a;const c=e.match.params.klass,n=m(),s=null===n||void 0===n||null===(t=n.result)||void 0===t||null===(a=t.classes)||void 0===a?void 0:a.find((({folder:e})=>c===e)),o=Object(d.a)(N,[c]);if(o.result){const{title:t,description:a,tasks:c}=o.result;return Object(r.jsxs)("div",{children:[Object(r.jsxs)("div",{children:[Object(r.jsx)(O.a,{variant:"h3",component:"h1",gutterBottom:!0,align:"center",children:t}),Object(r.jsx)(O.a,{variant:"subtitle1",gutterBottom:!0,align:"center",children:a})]}),Object(r.jsx)(O.a,{variant:"h5",gutterBottom:!0,children:"Assignments:"}),Object(r.jsx)(S,{tasks:c,path:e.location.pathname})]})}return o.loading&&s?Object(r.jsx)("div",{children:Object(r.jsxs)(O.a,{variant:"h4",component:"h1",gutterBottom:!0,align:"center",children:["Loading ",s.name,"..."]})}):n.loading||o.loading?Object(r.jsx)(O.a,{variant:"h4",component:"h1",gutterBottom:!0,align:"center",children:"Loading..."}):o.error?s?Object(r.jsx)(R,{error:!0,msg:"Cannot load class task file"}):Object(r.jsx)(R,{error:!0,msg:"No such class exists"}):Object(r.jsx)(R,{error:!0,msg:"Unreachable state???"})},M=a(158);var D=()=>Object(r.jsxs)(f.a,{paddingY:2,children:[Object(r.jsx)(O.a,{align:"center",variant:"h3",component:"h1",gutterBottom:!0,children:"Welcome to Int IPA"}),Object(r.jsxs)(O.a,{variant:"h5",component:"p",children:["This is just some place holder text right now. I'm not really sure what you want on this page. One possible option is a self description, etc. I don't really know. Here's a link to the"," ",Object(r.jsx)(M.a,{component:w.b,to:"/type",color:"secondary",children:"the IPA keyboard"}),"."]})]}),z=a(74),A=a.n(z);const B=["Bilabial","Labiodental","Dental","Alveolar","Postalveolar","Retroflex","Palatal","Velar","Uvular","Pharyngeal","Glottal"],P=["Plosive","Nasal","Trill","Tap","Fricative","Lateral fricative","Approximant","Lateral approximant"],L="_",I="",T=[["p","b",I,I,I,I,"t","d",I,I,"\u0288","\u0256","c","\u025f","k","g","q","\u0262",I,L,"\u0294",L],[I,"m",I,"\u0271",I,I,I,"n",I,I,I,"\u0273",I,"\u0272",I,"\u014b",I,"\u0274",L,L,L,L],[I,"\u0299",I,I,I,I,I,"r",I,I,I,I,I,I,L,L,I,"\u0280",I,I,L,L],[I,I,I,"\u2c71",I,I,I,"\u027e",I,I,I,"\u027d",I,I,L,L,I,I,I,I,L,L],["\u0278","\u03b2","f","v","\u03b8","\xf0","s","z","\u0283","\u0292","\u0282","\u0290","\xe7","\u029d","x","\u0263","\u03c7","\u0281","\u0127","\u0295","h","\u0266"],[L,L,L,L,I,I,"\u026c","\u026e",I,I,I,I,I,I,I,I,I,I,L,L,L,L],[I,I,I,"\u028b",I,I,I,"\u0279",I,I,I,"\u027b",I,"j",I,"\u0270",I,I,I,I,L,L],[L,L,L,L,I,I,I,"l",I,I,I,"\u026d",I,"\u028e",I,"\u029f",I,I,L,L,L,L]],H=[["\u0298","Bilabial"],["\u01c0","Dental"],["\u01c3","(Post)alveolar"],["\u01c2","Palatoalveolar"],["\u01c1","Alveolar lateral"]],V=[["\u0253","Bilabial"],["\u0257","Dental/alveolar"],["\u0284","Palatal"],["\u0260","Velar"],["\u029b","Uvular"]],F=[["\u02bc","Examples:"],["p\u02bc","Bilabial"],["t\u02bc","Dental/alveolar"],["k\u02bc","Velar"],["s\u02bc","Alveolar fricative"]],W=["Close","Close-mid","Open-mid","Open"],Y=["Front","Central","Back"],G=[[["i","y"],[0,0]],[["\u0268","\u0289"],[.5,0]],[["\u026f","u"],[1,0]],[["\u026a","\u028f"],[.2,1/6]],[["","\u028a"],[.75,1/6]],[["e","\xf8"],[0,1/3]],[["\u0258","\u0275"],[.5,1/3]],[["\u0264","o"],[1,1/3]],["\u0259",[.5,.5]],[["\u025b","\u0153"],[0,2/3]],[["\u025c","\u025e"],[.5,2/3]],[["\u028c","\u0254"],[1,2/3]],[["\xe6",""],[0,5/6]],["\u0250",[.5,5/6]],[["a","\u0276"],[0,1]],[["\u0251","\u0252"],[1,1]]],K=[{ipa:"\u0325",description:"Voiceless",examples:["n","d"]},{ipa:"\u032c",description:"Voiced",examples:["s","t"]},{ipa:"\u02b0",description:"Aspirated",examples:["t","d"]},{ipa:"\u0339",description:"More rounded",examples:["\u0254"]},{ipa:"\u031c",description:"Less rounded",examples:["\u0254"]},{ipa:"\u031f",description:"Advanced",examples:["u"]},{ipa:"\u0320",description:"Retracted",examples:["e"]},{ipa:"\u0308",description:"Centralized",examples:["e"]},{ipa:"\u033d",description:"Mid-centralized",examples:["e"]},{ipa:"\u0329",description:"Syllabic",examples:["n"]},{ipa:"\u032f",description:"Non-syllabic",examples:["n"]},{ipa:"\u02de",description:"Rhoticity",examples:["\u0259","a"]},{ipa:"\u0324",description:"Breathy voiced",examples:["b","a"]},{ipa:"\u0330",description:"Creaky voiced",examples:["b","a"]},{ipa:"\u033c",description:"Linguolabial",examples:["t","d"]},{ipa:"\u02b7",description:"Labialized",examples:["t","d"]},{ipa:"\u02b2",description:"Palatalized",examples:["t","d"]},{ipa:"\u02e0",description:"Velarized",examples:["t","d"]},{ipa:"\u02e4",description:"Pharyngealized",examples:["t","d"]},{ipa:"\u032a",description:"Dental",examples:["t","d"]},{ipa:"\u033a",description:"Apical",examples:["t","d"]},{ipa:"\u033b",description:"Laminal",examples:["t","d"]},{ipa:"\u0303",description:"Nasalized",examples:["e"]},{ipa:"\u207f",description:"Nasal release",examples:["d"]},{ipa:"\u02e1",description:"Lateral release",examples:["d"]},{ipa:"\u031a",description:"No audible release",examples:["d"]},{ipa:"\u0334",description:"Velarized or pharyngealized",examples:["l"],width:2},{ipa:"\u031d",description:"Raised",examples:["e"]},{ipa:"\u031e",description:"Lowered",examples:["e"]},{ipa:"\u0318",description:"Advanced tongue root",examples:["e"]},{ipa:"\u0319",description:"Retracted tongue root",examples:["e"]}],U=new Map([["\u02a7","t\u0361\u0283"],["\u02a4","d\u0361\u0292"],["\u025a","\u0259\u02de"],["\u025d","\u025c\u02de"],["!","\u01c3"],["'","\u02c8"]]),q=new RegExp(Array.from(U.keys()).join("|"),"gu");var $=e=>e.normalize("NFKD").replaceAll(q,(e=>U.get(e)||"\u2370"));const Q="Hmmm... Are you sure there's more sounds here?",J=A()("..."),_=(e,t)=>{if(!t)return{correct:!1,message:Q};const a=$(e);let r;if(t.correct.includes(a))return{correct:!0};if(r=t.explanations.get(a))return{correct:!1,message:r};if(t.wildcards){const e=t.wildcards.find((({matcher:e})=>(e=>{const t=A()(e);return new RegExp("^".concat(t.replaceAll(J,".*"),"$"),"u")})(e).test(a)));if(e)return{correct:!1,message:e.message}}return{correct:!1,message:0===t.correct.length?Q:"Whoops, that's not right. Try again!"}},X=(e,t,a=[])=>{if(t.hasOwnProperty(e)){const r=[...a,e];let c=[];return t[e].forEach((e=>{if(t.hasOwnProperty(e)&&!r.includes(e)){const a=X(e,t,r);c=c.concat(a)}else c.push(e)})),c}return[e]},Z=(e,t)=>{let a={};for(const r in t){if(t[r]&&!e.hasOwnProperty(r))throw new Error("Missing required property ".concat(r));a[r]=e[r]}return a},ee=e=>{const t=j.a.parse(e,{prettyErrors:!0}),a=Z(t,{author:!0,title:!0,salt:!1,instructions:!1,answer:!1}),r=(e=>{if(e){let t={};for(const a in e)t[$(a)]=e[a].map($);return t}return{}})(t.macros),c=t.words.map((e=>({...Z(e,{display:!0,audio:!1}),segments:((e,t)=>{if(e&&Array.isArray(e)){const a=e.map(((a,r)=>{let c=[],n=[];const s=new Map;for(const e in a){const r=$(e),o=a[e];!0===o?c=c.concat(X(r,t)):r.includes("...")?n.push({matcher:r,message:o}):X(r,t).forEach((e=>{s.set(e,o)}))}if(r<e.length-1&&c.includes(""))throw new Error("You can only have the empty string as a key in the last segment");return{correct:c,explanations:s,wildcards:n}})),r=a[a.length-1];return 0===r.correct.length?(r.correct.push(""),r.final=!0):r.correct.includes("")?r.final=!0:a.push({correct:[""],explanations:new Map,final:!0}),a}throw new Error("Segments must be an array")})(e.segments,r)})));return{...a,macros:r,words:c}};var te=a(159),ae=a(169),re=a(170),ce=a(171),ne=a(172),se=a(173),oe=a(174),ie=a(160),le=a(187),de=a(162),pe=a(89),je=a.n(pe),be=a(88),ue=a.n(be);const he=Object(te.a)((e=>({label:{"&:not(.MuiInputLabel-shrink)":{[e.breakpoints.up("lg")]:{fontSize:"2rem"},fontSize:"1.5rem"}},input:{[e.breakpoints.up("lg")]:{fontSize:"2rem"},fontSize:"1.5rem","&> fieldset > legend > span":{fontSize:"0.75rem"}},noRightMargin:{marginRight:0},helpTextSize:{fontSize:"1rem",[e.breakpoints.up("lg")]:{fontSize:"1.5rem"}}})));var me=e=>{const t=he(),{placeholder:a="Type IPA",value:n,onType:s,onDelete:o,inputRef:i,header:l,onCheck:d,checkDescription:p,error:j,helpText:b}=e,u=Object(c.useCallback)((()=>{var e;d&&d((null===(e=i.current)||void 0===e?void 0:e.value)||"")}),[d,i]),h=Object(c.useCallback)((e=>{"Enter"===e.key&&u()}),[u]),m=Object(c.useCallback)((e=>e.preventDefault()),[]),x=d&&Object(r.jsx)(ie.a,{"aria-label":"check",title:p||"Submit IPA Symbol or End Word",onMouseDown:m,onClick:u,color:"primary",children:Object(r.jsx)(ue.a,{})}),g=b&&Object(r.jsx)("span",{className:t.helpTextSize,children:b});return Object(r.jsx)(le.a,{InputLabelProps:{className:t.label},id:"ipa-typer",fullWidth:!0,inputRef:i,value:n,onChange:s,variant:"outlined",inputProps:{spellCheck:"false",autoCorrect:"off",autoComplete:"off",style:{lineHeight:2}},label:a,InputProps:{className:t.input,endAdornment:Object(r.jsxs)(de.a,{position:"end",children:[Object(r.jsx)(ie.a,{"aria-label":"delete",title:"Delete",onMouseDown:m,onClick:o,color:"inherit",children:Object(r.jsx)(je.a,{})}),x]}),startAdornment:l&&Object(r.jsx)(de.a,{disablePointerEvents:!0,disableTypography:!0,position:"start",classes:{positionStart:t.noRightMargin},children:l})},onKeyPress:h,error:j,helperText:g})},xe=a(5),ge=a(12);const Oe=e=>"light"===e.palette.type?Object(ge.d)(Object(ge.b)(e.palette.divider,1),.88):Object(ge.a)(Object(ge.b)(e.palette.divider,1),.68);var ve=a(163),fe=a(164),ye=a(165),ke=a(166),we=a(167),Ce=a(168);const Se=Object(te.a)((e=>({voiceless:{cursor:"pointer",width:"50%",float:"left","&:hover":{backgroundColor:e.palette.action.hover}},voiced:{height:"100%",cursor:"pointer",width:"50%",float:"right","&:hover":{backgroundColor:e.palette.action.hover}},impossible:{backgroundColor:e.palette.action.disabledBackground,color:"transparent",cursor:"default","&:hover":{backgroundColor:e.palette.action.disabledBackground}},symbol:{userSelect:"none",fontSize:"1.5rem"},sideBorder:{borderLeft:"1px solid ".concat(Oe(e)),borderRight:"1px solid ".concat(Oe(e))},caps:{padding:"6px 5.5px"},header:{borderLeft:"1px solid ".concat(Oe(e)),borderRight:"1px solid ".concat(Oe(e))}}))),Ne=e=>{const t=Se(),{onClick:a}=e,s=Object(c.useCallback)((e=>e!==L&&""!==e&&a&&(()=>a(e))||void 0),[a]),o=Object(c.useCallback)((e=>e.preventDefault()),[]),i=n.a.useCallback((({x:e,y:a})=>{var c,n;const i=null===(c=T[a])||void 0===c?void 0:c[2*e],l=null===(n=T[a])||void 0===n?void 0:n[2*e+1],d=e<2||e>4||4===a;return Object(r.jsxs)(ve.a,{align:"center",className:Object(xe.a)(t.symbol,d&&t.sideBorder),padding:"none",children:[Object(r.jsx)("span",{className:Object(xe.a)(t.voiceless,i===L&&t.impossible),onClick:s(i),onMouseDown:o,children:i}),Object(r.jsx)("span",{className:Object(xe.a)(t.voiced,l===L&&t.impossible),onClick:s(l),onMouseDown:o,children:l})]})}),[t,s,o]);return Object(r.jsx)(fe.a,{children:Object(r.jsxs)(ye.a,{size:"small","aria-label":"Consonants (Pulmonics)",children:[Object(r.jsx)(ke.a,{children:Object(r.jsxs)(we.a,{children:[Object(r.jsx)(ve.a,{}),B.map((e=>Object(r.jsx)(ve.a,{align:"center",className:Object(xe.a)(t.header,t.caps),children:e},"keyboard-place-".concat(e))))]})}),Object(r.jsx)(Ce.a,{children:P.map(((e,a)=>Object(r.jsxs)(we.a,{children:[Object(r.jsx)(ve.a,{className:t.caps,children:e}),B.map(((t,c)=>Object(r.jsx)(i,{x:c,y:a},"keyboard-l-".concat(e,"-").concat(t))))]},"keyboard-manner-".concat(e))))})]})})};var Re=n.a.memo(Ne);const Ee=Object(te.a)((e=>({symbol:{padding:e.spacing(.75,1),textAlign:"center",userSelect:"none",fontSize:"1.5rem",cursor:"pointer","&:hover":{backgroundColor:e.palette.action.hover},borderLeft:"1px solid ".concat(Oe(e))},descr:{fontSize:"0.8rem",verticalAlign:"middle",padding:e.spacing(0,.5),borderRight:"1px solid ".concat(Oe(e))},header:{padding:e.spacing(.75,1.5),borderLeft:"1px solid ".concat(Oe(e)),borderRight:"1px solid ".concat(Oe(e))}}))),Me=e=>{const t=Ee(),{onClick:a=(()=>{})}=e,n=Object(c.useMemo)((()=>H.map(((e,t)=>[e,V[t],F[t]]))),[]),s=Object(c.useCallback)((e=>e.preventDefault()),[]),o=Object(c.useCallback)((({symbol:e,name:c})=>Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)(ve.a,{className:t.symbol,onClick:()=>a(e),onMouseDown:s,children:e}),Object(r.jsx)(ve.a,{className:t.descr,children:c})]})),[t,a,s]);return Object(r.jsx)(fe.a,{children:Object(r.jsxs)(ye.a,{size:"small","aria-label":"Consonants (Pulmonics)",children:[Object(r.jsx)("colgroup",{span:2}),Object(r.jsx)("colgroup",{span:2}),Object(r.jsx)("colgroup",{span:2}),Object(r.jsx)(ke.a,{children:Object(r.jsxs)(we.a,{children:[Object(r.jsx)(ve.a,{align:"center",className:t.header,colSpan:2,children:"Clicks"}),Object(r.jsx)(ve.a,{align:"center",className:t.header,colSpan:2,children:"Voiced implosives"}),Object(r.jsx)(ve.a,{align:"center",className:t.header,colSpan:2,children:"Ejectives"})]})}),Object(r.jsx)(Ce.a,{children:n.map(((e,t)=>Object(r.jsx)(we.a,{children:e.map((([e,a],c)=>Object(r.jsx)(o,{symbol:e,name:a},"keyboard-nonpulmonic-".concat(t,"-").concat(c))))},"keyboard-nonpulmonic-".concat(t))))})]})})};var De=n.a.memo(Me);function ze(){return(ze=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e}).apply(this,arguments)}var Ae=c.createElement("g",{strokeWidth:4,fill:"none",strokeLinecap:"butt",strokeLinejoin:"miter"},c.createElement("path",{d:"M24 17.74l950.68-.94L976 683.2l-477.16-1.23L24 17.74zM499.85 17.74l235.9 664.23M183.29 239.78l791.4-.94"}),c.createElement("path",{d:"M343.58 461.81l629.09-1.88h1V459"}));function Be({title:e,titleId:t,...a},r){return c.createElement("svg",ze({viewBox:"0 0 1000 700",preserveAspectRatio:"none",fillRule:"evenodd",clipRule:"evenodd",strokeLinecap:"round",strokeLinejoin:"round",ref:r,"aria-labelledby":t},a),e?c.createElement("title",{id:t},e):null,Ae)}const Pe=c.forwardRef(Be);a.p;const Le=Object(te.a)((e=>({root:{width:"100%",height:"100%"},outerQuad:{padding:e.spacing(1,3),fontSize:"1.5rem",position:"relative",height:"100%",minHeight:"275px",minWidth:"270px"},fullRel:{height:"100%",width:"100%",position:"relative"},trapezium:{position:"absolute",height:"100%",width:"100%",stroke:e.palette.text.primary},quad:{position:"absolute",height:"95%",width:"95%",left:"2.5%",top:"2.75%"},element:{userSelect:"none",cursor:"default",position:"absolute",transform:"translate(-50%, -50%)",overflow:"visible",width:"1.2em",textAlign:"center"},rounded:{position:"absolute",width:"1.2em",left:"0.75em"},unrounded:{position:"absolute",width:"1.2em",right:"0.75em"},mid:{width:"100%"},symbol:{display:"inline-block",cursor:"pointer","&:hover":{borderRadius:"3px",backgroundColor:e.palette.action.hover}},paperBack:{"&::before":{zIndex:"-1",left:"0",content:"''",borderRadius:"3px",position:"absolute",display:"inline-block",width:"1.2em",height:"100%",backgroundColor:e.palette.background.paper}},fullHeight:{height:"100%"},vowelPos:{padding:e.spacing(0,2)},vowelHeight:{padding:e.spacing(.5,0)}}))),Ie=([e,t])=>{const a=.5*t;return{left:"".concat(100*(a+(1-a)*e),"%"),top:"".concat(100*t,"%")}},Te=e=>{const t=Le(),{onClick:a=(()=>{})}=e,n=Object(c.useCallback)((e=>e.preventDefault()),[]),s=Object(c.useCallback)((({vowels:e,coords:c})=>{if("string"===typeof e)return Object(r.jsx)(f.a,{className:Object(xe.a)(t.element,t.paperBack),style:Ie(c),children:Object(r.jsx)("div",{className:Object(xe.a)(t.mid,t.symbol),onClick:()=>a(e),onMouseDown:n,children:e})});{const s=e.join("").length<2,o=s?"\xa0":"\u2022";return Object(r.jsxs)(f.a,{className:Object(xe.a)(t.element,{[t.paperBack]:!s}),style:Ie(c),children:[o,Object(r.jsx)("div",{className:Object(xe.a)(t.unrounded,t.symbol,t.paperBack),onClick:()=>a(e[0]),onMouseDown:n,children:e[0]}),Object(r.jsx)("div",{className:Object(xe.a)(t.rounded,t.symbol,t.paperBack),onClick:()=>a(e[1]),onMouseDown:n,children:e[1]})]})}}),[t,a,n]),o=Object(c.useMemo)((()=>Object(r.jsx)(f.a,{className:t.outerQuad,children:Object(r.jsxs)("div",{className:t.fullRel,children:[Object(r.jsx)(Pe,{className:t.trapezium}),Object(r.jsx)("div",{className:t.quad,children:G.map((([e,t])=>Object(r.jsx)(s,{vowels:e,coords:t},"vowelbox-".concat(e))))})]})})),[t,s]);return Object(r.jsx)(f.a,{id:"vowelQuad",className:t.root,children:Object(r.jsxs)(v.a,{container:!0,className:t.fullHeight,wrap:"nowrap",children:[Object(r.jsx)(v.a,{item:!0,children:Object(r.jsxs)(v.a,{container:!0,direction:"column",className:Object(xe.a)(t.fullHeight),children:[Object(r.jsx)(O.a,{variant:"body1",component:"p",children:"\u200b"}),Object(r.jsx)(v.a,{item:!0,xs:!0,children:Object(r.jsx)(v.a,{container:!0,direction:"column",justify:"space-between",className:Object(xe.a)(t.fullHeight,t.vowelHeight),children:W.map((e=>Object(r.jsx)(O.a,{variant:"body1",component:"p",children:e},e)))})})]})}),Object(r.jsx)(v.a,{item:!0,xs:!0,children:Object(r.jsxs)(v.a,{container:!0,direction:"column",className:t.fullHeight,children:[Object(r.jsx)(v.a,{item:!0,children:Object(r.jsx)(v.a,{container:!0,justify:"space-between",className:t.vowelPos,children:Y.map((e=>Object(r.jsx)(O.a,{variant:"body1",component:"p",children:e},e)))})}),Object(r.jsx)(v.a,{item:!0,xs:!0,children:o})]})})]})})};var He=n.a.memo(Te);const Ve=Object(te.a)((e=>{return{root:{width:"100%",height:"100%"},symbol:{userSelect:"none",textAlign:"center",cursor:"pointer",fontSize:"1.5rem","&:hover":{backgroundColor:e.palette.action.hover}},description:{padding:"2px",fontSize:"0.8rem"},descriptionParent:{display:"flex",justifyContent:"center",flexDirection:"column",height:"100%"},bordered:{boxShadow:(t="1px",a=Oe(e),"".concat(t," 0 0 0 ").concat(a,", 0 ").concat(t," 0 0 ").concat(a,", ").concat(t," ").concat(t," 0 0 ").concat(a,", ").concat(t," 0 0 0 ").concat(a," inset, 0 ").concat(t," 0 0 ").concat(a," inset"))}};var t,a})),Fe=e=>{const t=Ve(),{onClick:a=(()=>{})}=e,n=Object(c.useCallback)((e=>e.preventDefault()),[]);return Object(r.jsx)(v.a,{container:!0,spacing:0,children:K.map((({ipa:e,description:c,examples:s})=>Object(r.jsx)(v.a,{item:!0,xs:6,sm:4,className:t.bordered,children:Object(r.jsxs)(v.a,{container:!0,children:[Object(r.jsx)(v.a,{item:!0,xs:2,className:t.symbol,onClick:()=>a(e),children:"".concat("\u25cc").concat(e)}),Object(r.jsx)(v.a,{item:!0,xs:!0,children:Object(r.jsx)("div",{className:t.descriptionParent,children:Object(r.jsx)("div",{className:t.description,children:c})})}),s.map((c=>{const s="".concat(c).concat(e);return Object(r.jsx)(v.a,{item:!0,xs:2,className:t.symbol,onClick:()=>a(s),onMouseDown:n,children:s},s)}))]})},"diacritics-".concat(c))))})};var We=n.a.memo(Fe);const Ye=Object(te.a)((e=>({paper:{padding:e.spacing(1),height:"100%"},childOrder:{...Ge(1,3,2,4),[e.breakpoints.up("lg")]:Ge(1,2,3,4)}}))),Ge=(...e)=>{let t={"& > *":{order:100}};return e.forEach(((e,a)=>{t["& > :nth-child(".concat(a+1,")")]={order:e}})),t},Ke=e=>{const t=Ye(),{onClick:a}=e;return Object(r.jsxs)(v.a,{container:!0,spacing:2,className:t.childOrder,children:[Object(r.jsx)(v.a,{item:!0,xs:12,children:Object(r.jsxs)(y.a,{className:t.paper,children:[Object(r.jsx)(O.a,{variant:"h6",component:"p",gutterBottom:!0,children:"Consonants (Pulmonics)"}),Object(r.jsx)(Re,{onClick:a}),Object(r.jsx)(O.a,{variant:"caption",align:"center",component:"p",children:"Symbols to the right in a cell are voiced, to the left are voiceless. Shaded areas denote articulations judged impossible."})]})}),Object(r.jsx)(v.a,{item:!0,xs:12,md:6,children:Object(r.jsxs)(y.a,{className:t.paper,children:[Object(r.jsx)(O.a,{variant:"h6",component:"p",gutterBottom:!0,children:"Consonants (Non-pulmonics)"}),Object(r.jsx)(De,{onClick:a})]})}),Object(r.jsx)(v.a,{item:!0,xs:12,md:6,children:Object(r.jsx)(y.a,{className:t.paper,children:Object(r.jsx)(He,{onClick:a})})}),Object(r.jsx)(v.a,{item:!0,xs:12,md:8,children:Object(r.jsxs)(y.a,{className:t.paper,children:[Object(r.jsx)(O.a,{variant:"h6",component:"p",gutterBottom:!0,children:"Diacritics"}),Object(r.jsx)(We,{onClick:a})]})})]})};var Ue,qe=n.a.memo(Ke);function $e(e,t){var a,r,c,n;const{value:s}=e,o=(null===(a=e.ref)||void 0===a||null===(r=a.current)||void 0===r?void 0:r.selectionStart)||0,i=(null===(c=e.ref)||void 0===c||null===(n=c.current)||void 0===n?void 0:n.selectionEnd)||o;switch(t.type){case Ue.Delete:return o!==i?{...e,cursor:o,value:s.slice(0,o)+s.slice(i,s.length)}:0===o?e:{...e,cursor:o-1,value:s.slice(0,o-1)+s.slice(o,s.length)};case Ue.Append:return{...e,cursor:o+t.value.length,value:s.slice(0,o)+t.value+s.slice(i,s.length)};case Ue.Set:return{...e,value:t.value,cursor:t.value.length};case Ue.Type:return{...e,value:t.value}}}!function(e){e[e.Delete=0]="Delete",e[e.Append=1]="Append",e[e.Set=2]="Set",e[e.Type=3]="Type"}(Ue||(Ue={}));var Qe=()=>{const e=Object(c.useRef)(null),[{cursor:t,value:a},r]=Object(c.useReducer)($e,{cursor:0,value:"",ref:e}),n=Object(c.useCallback)((e=>r({type:Ue.Append,value:e})),[]),s=Object(c.useCallback)((e=>r({type:Ue.Type,value:e.target.value})),[]),o=Object(c.useCallback)((()=>r({type:Ue.Delete})),[]),i=Object(c.useCallback)((e=>r({type:Ue.Set,value:e})),[]);return Object(c.useLayoutEffect)((()=>{var a,r,c;const n=document.activeElement;null===(a=e.current)||void 0===a||a.focus(),null===(r=e.current)||void 0===r||r.setSelectionRange(t,t),null===(c=e.current)||void 0===c||c.blur(),null===n||void 0===n||n.focus()}),[t]),Object(c.useDebugValue)({cursor:t,value:a}),{handleKeyboard:n,handleDelete:o,handleType:s,setValue:i,value:a,ref:e}};const Je=Object(te.a)((e=>({sticky:{zIndex:10,position:"sticky",top:"".concat(e.spacing(-1),"px")},search:{backgroundColor:e.palette.background.default,borderRadius:"8px"},correct:{color:e.palette.success.dark}})));var _e;!function(e){e[e.Reset=0]="Reset",e[e.SoftReset=1]="SoftReset",e[e.SetHeader=2]="SetHeader",e[e.NextSegment=3]="NextSegment",e[e.ErrorMessage=4]="ErrorMessage",e[e.ClearError=5]="ClearError"}(_e||(_e={}));const Xe=e=>({word:e,segment:0,header:"",error:!1}),Ze=(e,t)=>{switch(t.type){case _e.SoftReset:return Object.is(t.value,e.word)?e:Xe(t.value);case _e.Reset:return Xe(t.value);case _e.SetHeader:return{...e,header:t.value};case _e.NextSegment:return{...e,segment:e.segment+1,header:e.header+t.value};case _e.ClearError:return e.error?{...e,error:!1,errorMessage:void 0}:e;case _e.ErrorMessage:return{...e,error:!0,errorMessage:t.value}}};var et=e=>{const t=Je(),{word:a,onSubmit:n}=e,{handleKeyboard:s,handleDelete:o,handleType:i,setValue:l,value:d,ref:p}=Qe(),[j,b]=Object(c.useReducer)(Ze,a,Xe);Object(c.useEffect)((()=>b({type:_e.SoftReset,value:a})),[a]),Object(c.useEffect)((()=>b({type:_e.ClearError})),[d]);const u=Object(c.useCallback)((e=>{const t=a.segments[j.segment],r=_(e,t);r.correct?(b({type:_e.NextSegment,value:e}),l(""),t.final&&n()):b({type:_e.ErrorMessage,value:r.message})}),[a,j.segment,l,n]),{header:h,error:m,errorMessage:x}=j,g=h&&Object(r.jsx)("span",{className:t.correct,children:h});return Object(r.jsxs)("div",{children:[Object(r.jsx)(f.a,{paddingY:2,className:t.sticky,children:Object(r.jsx)(v.a,{container:!0,alignItems:"center",justify:"center",spacing:2,children:Object(r.jsx)(v.a,{item:!0,xs:!0,md:8,className:t.search,children:Object(r.jsx)(me,{placeholder:'Transcribe "'.concat(a.display,'"'),value:d,onDelete:o,onType:i,inputRef:p,onCheck:u,header:g,error:m,helpText:x})})})}),Object(r.jsx)(qe,{onClick:s})]})},tt=a(90),at=a.n(tt);const rt=window.AudioContext||window.webkitAudioContext,ct=Object(te.a)((e=>({playButton:{color:e.palette.background.default,backgroundColor:e.palette.info.light,margin:"4px",padding:"4px 8px",boxSizing:"content-box",borderRadius:"4px"}}))),nt=async e=>{if(!e)return void console.log("empty task");const t=await fetch(e),a=await t.text();return ee(a)},st=({msg:e,error:t})=>Object(r.jsxs)(O.a,{variant:"h3",component:"h1",gutterBottom:!0,align:"center",children:[t&&"Error: ",e]}),ot=n.a.memo((e=>{const{task:t}=e,[a,n]=Object(c.useState)(0),[s,o]=Object(c.useState)(!1),[i,l]=Object(c.useState)(!0),[d,p]=Object(c.useState)(""),{title:j,words:b,instructions:u}=t,h=b[a],m=(ct(),Object(c.useCallback)((()=>{o(!0)}),[])),x=t.words.length-1,g=Object(c.useCallback)((()=>{a===x?l(!1):n((e=>e+1)),o(!1)}),[a,x]);Object(c.useMemo)((()=>new rt({latencyHint:"interactive",sampleRate:44100})),[]);const v=Object(c.useMemo)((()=>h.audio?new Audio("/ex-lign101/".concat(h.audio)):null),[h.audio]),f=Object(c.useCallback)((()=>{v&&(v.currentTime=0,v.play())}),[v]),y=a<x?"Next word":"Finish";return Object(r.jsxs)("div",{children:[Object(r.jsx)(O.a,{variant:"h3",component:"h2",gutterBottom:!0,align:"center",children:j}),Object(r.jsx)(O.a,{variant:"body1",gutterBottom:!0,children:u}),Object(r.jsxs)(O.a,{variant:"h4",component:"p",align:"center",children:['Transcribe "',h.display,'"'," ",Object(r.jsx)(k.a,{variant:"contained",color:"secondary",startIcon:Object(r.jsx)(at.a,{}),onClick:f,children:"Play"})]}),Object(r.jsx)(ae.a,{in:i,children:Object(r.jsx)(et,{word:h,onSubmit:m})}),i||Object(r.jsx)(r.Fragment,{children:Object(r.jsx)(O.a,{variant:"h3",component:"h3",gutterBottom:!0,align:"center",children:"You're done!"})}),Object(r.jsxs)(re.a,{open:s,onClose:g,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",disableRestoreFocus:!0,children:[Object(r.jsx)(ce.a,{id:"alert-dialog-title",children:"Congrats! You got it correct"}),Object(r.jsx)(ne.a,{children:Object(r.jsx)(se.a,{id:"alert-dialog-description",children:"You did a good job of getting the word correct!"})}),Object(r.jsx)(oe.a,{children:Object(r.jsx)(k.a,{onClick:g,color:"primary",children:y})})]})]})}));var it=e=>{const{taskFileUrl:t}=e,a=Object(d.a)(nt,[t]);return a.result?Object(r.jsx)(ot,{task:a.result}):a.loading?Object(r.jsx)("div",{children:Object(r.jsx)(O.a,{variant:"h4",component:"h1",gutterBottom:!0,align:"center",children:"Loading..."})}):a.error?(console.log(a.error),Object(r.jsx)(st,{error:!0,msg:"Cannot load task file"})):Object(r.jsx)(st,{error:!0,msg:"Unreachable state???"})};const lt=Object(te.a)((e=>({sticky:{zIndex:10,position:"sticky",top:"".concat(e.spacing(-1),"px")},search:{backgroundColor:e.palette.background.default,borderRadius:"8px"}})));var dt=()=>{const{handleKeyboard:e,handleDelete:t,handleType:a,value:c,ref:n}=Qe(),s=lt();return Object(r.jsxs)("div",{children:[Object(r.jsx)(f.a,{paddingY:2,className:s.sticky,children:Object(r.jsx)(v.a,{container:!0,alignItems:"center",justify:"center",spacing:2,children:Object(r.jsx)(v.a,{item:!0,xs:!0,md:8,className:s.search,children:Object(r.jsx)(me,{value:c,inputRef:n,onType:a,onDelete:t})})})}),Object(r.jsx)(qe,{onClick:e})]})};var pt=()=>Object(r.jsxs)(l.c,{children:[Object(r.jsx)(l.a,{path:"/type",exact:!0,component:dt}),Object(r.jsx)(l.a,{path:"/",exact:!0,component:D}),Object(r.jsx)(l.a,{path:"/class/:klass",component:E}),Object(r.jsx)(l.a,{path:"/ex/:file+",render:e=>Object(r.jsx)(it,{taskFileUrl:e.match.params.file})})]}),jt=a(185),bt=a(175),ut=a(176),ht=a(178),mt=a(7),xt=a(189),gt=a(161),Ot=a(179),vt=a(180),ft=a(190),yt=a(181),kt=a(182),wt=a(93),Ct=a.n(wt),St=a(91),Nt=a.n(St),Rt=a(92),Et=a.n(Rt),Mt=a(177),Dt=a(67);const zt=e=>({paddingLeft:"max(env(safe-area-inset-left, 0px), ".concat(e.spacing(2),"px)"),paddingRight:"max(env(safe-area-inset-right, 0px), ".concat(e.spacing(2),"px)"),[e.breakpoints.up("sm")]:{paddingLeft:"max(env(safe-area-inset-left, 0px), ".concat(e.spacing(3),"px)"),paddingRight:"max(env(safe-area-inset-right, 0px), ".concat(e.spacing(3),"px)")}}),At=Object(te.a)((e=>({itemGutters:{paddingLeft:"max(env(safe-area-inset-left, 0px), ".concat(e.spacing(2),"px)")},gutters:zt(e)}))),Bt=({error:e})=>Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)(bt.a,{children:Object(r.jsx)(ut.a,{primary:e?"Error loading classes.":"Loading classes..."})}),Object(r.jsx)(Mt.a,{})]}),Pt=e=>{const{pathname:t}=Object(l.f)(),{to:a,text:c,icon:n,exact:s,gutters:o}=e,i=!!Object(l.e)(t,{path:a,exact:s});return Object(r.jsxs)(bt.a,{button:!0,component:w.b,to:a,selected:i,classes:{gutters:o},children:[n&&Object(r.jsx)(ht.a,{children:n}),Object(r.jsx)(ut.a,{primary:c})]})},Lt=Object(mt.a)({switchBase:{color:Dt.a[100],"&$checked":{color:"black"},"&$checked + $track":{backgroundColor:Dt.a[500]}},checked:{},track:{}})(xt.a);var It=e=>{const[t,a]=Object(c.useState)(!1),n=At(),{changeDarkMode:s}=e,{result:o,loading:i,error:l}=m(),d=Object(c.useCallback)((()=>{a(!0)}),[]),p=Object(c.useCallback)((()=>{a(!1)}),[]),j=Object(c.useCallback)((e=>{s(e.target.checked)}),[s]),b=Object(r.jsxs)(f.a,{width:"100%",children:[Object(r.jsx)(gt.a,{children:Object(r.jsx)(Pt,{to:"/",text:"Home",icon:Object(r.jsx)(Nt.a,{}),exact:!0,gutters:n.itemGutters})}),Object(r.jsx)(Ot.a,{}),Object(r.jsxs)(gt.a,{children:[Object(r.jsx)(vt.a,{classes:{gutters:n.itemGutters},children:"Classes"}),l&&Object(r.jsx)(Bt,{error:!0}),i&&Object(r.jsx)(Bt,{}),o&&o.classes.map((({name:e,folder:t,hidden:a},c)=>!a&&Object(r.jsx)(Pt,{to:"/class/".concat(t),text:e,gutters:n.itemGutters},"class-list-".concat(c))))]}),Object(r.jsx)(Ot.a,{}),Object(r.jsxs)(gt.a,{children:[Object(r.jsx)(vt.a,{classes:{gutters:n.itemGutters},children:"Tools"}),Object(r.jsx)(Pt,{to:"/type",text:"IPA Keyboard",icon:Object(r.jsx)(Et.a,{}),exact:!0,gutters:n.itemGutters})]})]});return Object(r.jsxs)("div",{children:[Object(r.jsx)(ft.a,{anchor:"left",open:t,onClose:p,children:Object(r.jsxs)(f.a,{display:"flex",flexWrap:"wrap",width:275,alignContent:"space-between",alignItems:"flex-start",height:"100%",overflow:"hidden",role:"presentation",children:[b,Object(r.jsx)(f.a,{width:"100%",mb:2,children:Object(r.jsx)(O.a,{component:"div",children:Object(r.jsxs)(v.a,{component:"label",container:!0,justify:"center",alignItems:"center",spacing:1,children:[Object(r.jsx)(v.a,{item:!0,children:"Light"}),Object(r.jsx)(v.a,{item:!0,children:Object(r.jsx)(Lt,{color:"default",checked:e.darkMode,onChange:j})}),Object(r.jsx)(v.a,{item:!0,children:"Dark"})]})})})]})}),Object(r.jsx)(yt.a,{position:"static",color:"secondary",children:Object(r.jsxs)(kt.a,{classes:{gutters:n.gutters},children:[Object(r.jsx)(ie.a,{onClick:d,edge:"start",color:"inherit","aria-label":"menu",children:Object(r.jsx)(Ct.a,{})}),Object(r.jsx)(O.a,{variant:"h6",children:"Int IPA"})]})})]})},Tt=a(184),Ht=a(94),Vt=a(69),Ft=a(68),Wt=a(183);const Yt=Object(Ht.a)({palette:{type:"light",primary:{main:Vt.a[900]},secondary:{main:Ft.a[700]}}}),Gt=Object(Ht.a)({palette:{type:"dark",primary:{main:Vt.a[500]},secondary:{main:Ft.a[700]}}}),Kt=Object(te.a)((e=>({containerRoot:{width:"100%",boxSizing:"border-box",display:"block",margin:e.spacing(1,"auto","env(safe-area-inset-bottom, 0px)"),...zt(e)}}))),Ut="useDarkMode";function qt(){const e=Kt(),t=Object(Wt.a)("(prefers-color-scheme: dark)"),[a,c]=n.a.useState((()=>{const e=window.localStorage.getItem(Ut);return e?"true"===e:null})),s=n.a.useCallback((e=>{window.localStorage.setItem(Ut,e.toString()),c(e)}),[c]);n.a.useEffect((()=>{0}),[]);const o=null===a?t:a,l=n.a.useMemo((()=>Object(Ht.a)(o?Gt:Yt)),[o]);return Object(r.jsxs)(Tt.a,{theme:l,children:[Object(r.jsx)(jt.a,{}),Object(r.jsx)(It,{darkMode:o,changeDarkMode:s}),Object(r.jsx)(i.a,{maxWidth:"lg",classes:{root:e.containerRoot},children:Object(r.jsx)(pt,{})})]})}o.a.render(Object(r.jsx)(n.a.StrictMode,{children:Object(r.jsx)(g,{children:Object(r.jsx)(w.a,{children:Object(r.jsx)(qt,{})})})}),document.getElementById("root"))}},[[122,1,2]]]);
//# sourceMappingURL=main.501089b2.chunk.js.map