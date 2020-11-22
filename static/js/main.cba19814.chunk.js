(this["webpackJsonpint-ipa"]=this["webpackJsonpint-ipa"]||[]).push([[0],{126:function(e,t,a){"use strict";a.r(t);var r=a(3),n=a(0),c=a.n(n),s=a(14),o=a.n(s),i=a(15),l=a(37),d=a(46),p=a.n(d);const j="".concat("","/manifest.yaml"),b=(e,t)=>"".concat("","/").concat(e,"/").concat(t),u=c.a.createContext(null),h=async()=>{const e=await fetch(j),t=await e.text();return p.a.parse(t,{prettyErrors:!0})},m=()=>{const e=Object(n.useContext)(u);if(!e)throw new Error("Error: you must create an initial manifest object");return e};let x=!1;var O=({children:e})=>{const t=Object(l.a)(h,[]);return t.error&&!x&&(x=!0,console.log(t.error.message),console.log(t.error),t.error.name.match(/^YAML/)?alert("Error: Your manifest.yaml contains invalid syntax. Please check the console for more info."):alert("There was an error loading your manifest.yaml")),Object(r.jsx)(u.Provider,{value:t,children:e})},g=a(41),v=window.AudioContext||window.webkitAudioContext,f=a(173),y=a(172),k=a(174),w=a(175),C=a(176),S=a(177),N=a(178),R=a(158),M=a(193),E=a(171),D=a(194),A=a(162),L=a(192),P=a(164),z=a(92),B=a.n(z),T=a(91),I=a.n(T);const W=Object(R.a)((e=>({label:{"&:not(.MuiInputLabel-shrink)":{[e.breakpoints.up("lg")]:{fontSize:"2rem"},fontSize:"1.5rem"}},input:{[e.breakpoints.up("lg")]:{fontSize:"2rem"},fontSize:"1.5rem","&> fieldset > legend > span":{fontSize:"0.75rem"}},noRightMargin:{marginRight:0},helpTextSize:{fontSize:"1rem",[e.breakpoints.up("lg")]:{fontSize:"1.5rem"}}})));var H=e=>{const t=W(),{placeholder:a="Type IPA",value:c,onType:s,onDelete:o,inputRef:i,header:l,onCheck:d,checkDescription:p,error:j,helpText:b}=e,u=Object(n.useCallback)((()=>{var e;d&&d((null===(e=i.current)||void 0===e?void 0:e.value)||"")}),[d,i]),h=Object(n.useCallback)((e=>{"Enter"===e.key&&u()}),[u]),m=Object(n.useCallback)((e=>e.preventDefault()),[]),x=d&&Object(r.jsx)(D.a,{title:p||"Submit IPA Symbol or End Word",enterDelay:500,children:Object(r.jsx)(A.a,{"aria-label":"check",onMouseDown:m,onClick:u,children:Object(r.jsx)(I.a,{})})}),O=b&&Object(r.jsx)(g.a,{variant:"body2",component:"span",className:t.helpTextSize,children:b});return Object(r.jsx)(L.a,{InputLabelProps:{className:t.label},id:"ipa-typer",fullWidth:!0,inputRef:i,value:c,onChange:s,variant:"outlined",inputProps:{spellCheck:"false",autoCorrect:"off",autoComplete:"off",style:{lineHeight:2}},label:a,InputProps:{className:t.input,endAdornment:Object(r.jsxs)(P.a,{position:"end",children:[Object(r.jsx)(D.a,{title:"Delete",enterDelay:500,children:Object(r.jsx)(A.a,{"aria-label":"delete",onMouseDown:m,onClick:o,children:Object(r.jsx)(B.a,{})})}),x]}),startAdornment:l&&Object(r.jsx)(P.a,{disablePointerEvents:!0,disableTypography:!0,position:"start",classes:{positionStart:t.noRightMargin},children:l})},onKeyPress:h,error:j,helperText:O})},F=a(100),U=a(5),V=a(13);const K=e=>"light"===e.palette.type?Object(V.e)(Object(V.c)(e.palette.divider,1),.88):Object(V.a)(Object(V.c)(e.palette.divider,1),.68);var Y=a(165),G=a(166),_=a(167),q=a(168),J=a(169),$=a(170);const Q=["Bilabial","Labiodental","Dental","Alveolar","Postalveolar","Retroflex","Palatal","Velar","Uvular","Pharyngeal","Glottal"],Z=["Plosive","Nasal","Trill","Tap","Fricative","Lateral fricative","Approximant","Lateral approximant"],X="_",ee="",te=[["p","b",ee,ee,ee,ee,"t","d",ee,ee,"\u0288","\u0256","c","\u025f","k","g","q","\u0262",ee,X,"\u0294",X],[ee,"m",ee,"\u0271",ee,ee,ee,"n",ee,ee,ee,"\u0273",ee,"\u0272",ee,"\u014b",ee,"\u0274",X,X,X,X],[ee,"\u0299",ee,ee,ee,ee,ee,"r",ee,ee,ee,ee,ee,ee,X,X,ee,"\u0280",ee,ee,X,X],[ee,ee,ee,"\u2c71",ee,ee,ee,"\u027e",ee,ee,ee,"\u027d",ee,ee,X,X,ee,ee,ee,ee,X,X],["\u0278","\u03b2","f","v","\u03b8","\xf0","s","z","\u0283","\u0292","\u0282","\u0290","\xe7","\u029d","x","\u0263","\u03c7","\u0281","\u0127","\u0295","h","\u0266"],[X,X,X,X,ee,ee,"\u026c","\u026e",ee,ee,ee,ee,ee,ee,ee,ee,ee,ee,X,X,X,X],[ee,ee,ee,"\u028b",ee,ee,ee,"\u0279",ee,ee,ee,"\u027b",ee,"j",ee,"\u0270",ee,ee,ee,ee,X,X],[X,X,X,X,ee,ee,ee,"l",ee,ee,ee,"\u026d",ee,"\u028e",ee,"\u029f",ee,ee,X,X,X,X]],ae=[["\u0298","Bilabial"],["\u01c0","Dental"],["\u01c3","(Post)alveolar"],["\u01c2","Palatoalveolar"],["\u01c1","Alveolar lateral"]],re=[["\u0253","Bilabial"],["\u0257","Dental/alveolar"],["\u0284","Palatal"],["\u0260","Velar"],["\u029b","Uvular"]],ne=[["\u02bc","Examples:"],["p\u02bc","Bilabial"],["t\u02bc","Dental/alveolar"],["k\u02bc","Velar"],["s\u02bc","Alveolar fricative"]],ce=["Close","Close-mid","Open-mid","Open"],se=["Front","Central","Back"],oe=[[["i","y"],[0,0]],[["\u0268","\u0289"],[.5,0]],[["\u026f","u"],[1,0]],[["\u026a","\u028f"],[.2,1/6]],[["","\u028a"],[.75,1/6]],[["e","\xf8"],[0,1/3]],[["\u0258","\u0275"],[.5,1/3]],[["\u0264","o"],[1,1/3]],["\u0259",[.5,.5]],[["\u025b","\u0153"],[0,2/3]],[["\u025c","\u025e"],[.5,2/3]],[["\u028c","\u0254"],[1,2/3]],[["\xe6",""],[0,5/6]],["\u0250",[.5,5/6]],[["a","\u0276"],[0,1]],[["\u0251","\u0252"],[1,1]]],ie=[{ipa:"\u0325",description:"Voiceless",examples:["n","d"]},{ipa:"\u032c",description:"Voiced",examples:["s","t"]},{ipa:"\u02b0",description:"Aspirated",examples:["t","d"]},{ipa:"\u0339",description:"More rounded",examples:["\u0254"]},{ipa:"\u031c",description:"Less rounded",examples:["\u0254"]},{ipa:"\u031f",description:"Advanced",examples:["u"]},{ipa:"\u0320",description:"Retracted",examples:["e"]},{ipa:"\u0308",description:"Centralized",examples:["e"]},{ipa:"\u033d",description:"Mid-centralized",examples:["e"]},{ipa:"\u0329",description:"Syllabic",examples:["n"]},{ipa:"\u032f",description:"Non-syllabic",examples:["n"]},{ipa:"\u02de",description:"Rhoticity",examples:["\u0259","a"]},{ipa:"\u0324",description:"Breathy voiced",examples:["b","a"]},{ipa:"\u0330",description:"Creaky voiced",examples:["b","a"]},{ipa:"\u033c",description:"Linguolabial",examples:["t","d"]},{ipa:"\u02b7",description:"Labialized",examples:["t","d"]},{ipa:"\u02b2",description:"Palatalized",examples:["t","d"]},{ipa:"\u02e0",description:"Velarized",examples:["t","d"]},{ipa:"\u02e4",description:"Pharyngealized",examples:["t","d"]},{ipa:"\u032a",description:"Dental",examples:["t","d"]},{ipa:"\u033a",description:"Apical",examples:["t","d"]},{ipa:"\u033b",description:"Laminal",examples:["t","d"]},{ipa:"\u0303",description:"Nasalized",examples:["e"]},{ipa:"\u207f",description:"Nasal release",examples:["d"]},{ipa:"\u02e1",description:"Lateral release",examples:["d"]},{ipa:"\u031a",description:"No audible release",examples:["d"]},{ipa:"\u0334",description:"Velarized or pharyngealized",examples:["l"],width:2},{ipa:"\u031d",description:"Raised",examples:["e"]},{ipa:"\u031e",description:"Lowered",examples:["e"]},{ipa:"\u0318",description:"Advanced tongue root",examples:["e"]},{ipa:"\u0319",description:"Retracted tongue root",examples:["e"]}],le=Object(R.a)((e=>({voiceless:{cursor:"pointer",width:"50%",float:"left","&:hover":{backgroundColor:e.palette.action.hover}},voiced:{height:"100%",cursor:"pointer",width:"50%",float:"right","&:hover":{backgroundColor:e.palette.action.hover}},impossible:{backgroundColor:e.palette.action.disabledBackground,color:"transparent",cursor:"default","&:hover":{backgroundColor:e.palette.action.disabledBackground}},symbol:{userSelect:"none",fontSize:"1.5rem"},sideBorder:{borderLeft:"1px solid ".concat(K(e)),borderRight:"1px solid ".concat(K(e))},caps:{padding:"6px 5.5px"},header:{borderLeft:"1px solid ".concat(K(e)),borderRight:"1px solid ".concat(K(e))}}))),de=e=>{const t=le(),{onClick:a}=e,s=Object(n.useCallback)((e=>e!==X&&""!==e&&a&&(()=>a(e))||void 0),[a]),o=Object(n.useCallback)((e=>e.preventDefault()),[]),i=c.a.useCallback((({x:e,y:a})=>{var n,c;const i=null===(n=te[a])||void 0===n?void 0:n[2*e],l=null===(c=te[a])||void 0===c?void 0:c[2*e+1],d=e<2||e>4||4===a;return Object(r.jsxs)(Y.a,{align:"center",className:Object(U.a)(t.symbol,d&&t.sideBorder),padding:"none",children:[Object(r.jsx)("span",{className:Object(U.a)(t.voiceless,i===X&&t.impossible),onClick:s(i),onMouseDown:o,children:i}),Object(r.jsx)("span",{className:Object(U.a)(t.voiced,l===X&&t.impossible),onClick:s(l),onMouseDown:o,children:l})]})}),[t,s,o]);return Object(r.jsx)(G.a,{children:Object(r.jsxs)(_.a,{size:"small","aria-label":"Consonants (Pulmonics)",children:[Object(r.jsx)(q.a,{children:Object(r.jsxs)(J.a,{children:[Object(r.jsx)(Y.a,{}),Q.map((e=>Object(r.jsx)(Y.a,{align:"center",className:Object(U.a)(t.header,t.caps),children:e},"keyboard-place-".concat(e))))]})}),Object(r.jsx)($.a,{children:Z.map(((e,a)=>Object(r.jsxs)(J.a,{children:[Object(r.jsx)(Y.a,{className:t.caps,children:e}),Q.map(((t,n)=>Object(r.jsx)(i,{x:n,y:a},"keyboard-l-".concat(e,"-").concat(t))))]},"keyboard-manner-".concat(e))))})]})})};var pe=c.a.memo(de);const je=Object(R.a)((e=>({symbol:{padding:e.spacing(.75,1),textAlign:"center",userSelect:"none",fontSize:"1.5rem",cursor:"pointer","&:hover":{backgroundColor:e.palette.action.hover},borderLeft:"1px solid ".concat(K(e))},descr:{fontSize:"0.8rem",verticalAlign:"middle",padding:e.spacing(0,.5),borderRight:"1px solid ".concat(K(e))},header:{padding:e.spacing(.75,1.5),borderLeft:"1px solid ".concat(K(e)),borderRight:"1px solid ".concat(K(e))}}))),be=e=>{const t=je(),{onClick:a=(()=>{})}=e,c=Object(n.useMemo)((()=>ae.map(((e,t)=>[e,re[t],ne[t]]))),[]),s=Object(n.useCallback)((e=>e.preventDefault()),[]),o=Object(n.useCallback)((({symbol:e,name:n})=>Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)(Y.a,{className:t.symbol,onClick:()=>a(e),onMouseDown:s,children:e}),Object(r.jsx)(Y.a,{className:t.descr,children:n})]})),[t,a,s]);return Object(r.jsx)(G.a,{children:Object(r.jsxs)(_.a,{size:"small","aria-label":"Consonants (Pulmonics)",children:[Object(r.jsx)("colgroup",{span:2}),Object(r.jsx)("colgroup",{span:2}),Object(r.jsx)("colgroup",{span:2}),Object(r.jsx)(q.a,{children:Object(r.jsxs)(J.a,{children:[Object(r.jsx)(Y.a,{align:"center",className:t.header,colSpan:2,children:"Clicks"}),Object(r.jsx)(Y.a,{align:"center",className:t.header,colSpan:2,children:"Voiced implosives"}),Object(r.jsx)(Y.a,{align:"center",className:t.header,colSpan:2,children:"Ejectives"})]})}),Object(r.jsx)($.a,{children:c.map(((e,t)=>Object(r.jsx)(J.a,{children:e.map((([e,a],n)=>Object(r.jsx)(o,{symbol:e,name:a},"keyboard-nonpulmonic-".concat(t,"-").concat(n))))},"keyboard-nonpulmonic-".concat(t))))})]})})};var ue=c.a.memo(be);function he(){return(he=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e}).apply(this,arguments)}var me=n.createElement("g",{strokeWidth:4,fill:"none",strokeLinecap:"butt",strokeLinejoin:"miter"},n.createElement("path",{d:"M24 17.74l950.68-.94L976 683.2l-477.16-1.23L24 17.74zM499.85 17.74l235.9 664.23M183.29 239.78l791.4-.94"}),n.createElement("path",{d:"M343.58 461.81l629.09-1.88h1V459"}));function xe({title:e,titleId:t,...a},r){return n.createElement("svg",he({viewBox:"0 0 1000 700",preserveAspectRatio:"none",fillRule:"evenodd",clipRule:"evenodd",strokeLinecap:"round",strokeLinejoin:"round",ref:r,"aria-labelledby":t},a),e?n.createElement("title",{id:t},e):null,me)}const Oe=n.forwardRef(xe);a.p;const ge=Object(R.a)((e=>({root:{width:"100%",height:"100%"},outerQuad:{padding:e.spacing(1,3),fontSize:"1.5rem",position:"relative",height:"100%",minHeight:"275px",minWidth:"270px"},fullRel:{height:"100%",width:"100%",position:"relative"},trapezium:{position:"absolute",height:"100%",width:"100%",stroke:e.palette.text.primary},quad:{position:"absolute",height:"95%",width:"95%",left:"2.5%",top:"2.75%"},element:{userSelect:"none",cursor:"default",position:"absolute",transform:"translate(-50%, -50%)",overflow:"visible",width:"1.2em",textAlign:"center"},rounded:{position:"absolute",width:"1.2em",left:"0.75em"},unrounded:{position:"absolute",width:"1.2em",right:"0.75em"},mid:{width:"100%"},symbol:{display:"inline-block",cursor:"pointer","&:hover":{borderRadius:"3px",backgroundColor:e.palette.action.hover}},paperBack:{"&::before":{zIndex:"-1",left:"0",content:"''",borderRadius:"3px",position:"absolute",display:"inline-block",width:"1.2em",height:"100%",backgroundColor:e.palette.background.paper}},fullHeight:{height:"100%"},vowelPos:{padding:e.spacing(0,2)},vowelHeight:{padding:e.spacing(.5,0)}}))),ve=([e,t])=>{const a=.5*t;return{left:"".concat(100*(a+(1-a)*e),"%"),top:"".concat(100*t,"%")}},fe=e=>{const t=ge(),{onClick:a=(()=>{})}=e,c=Object(n.useCallback)((e=>e.preventDefault()),[]),s=Object(n.useCallback)((({vowels:e,coords:n})=>{if("string"===typeof e)return Object(r.jsx)(M.a,{className:Object(U.a)(t.element,t.paperBack),style:ve(n),children:Object(r.jsx)("div",{className:Object(U.a)(t.mid,t.symbol),onClick:()=>a(e),onMouseDown:c,children:e})});{const s=e.join("").length<2,o=s?"\xa0":"\u2022";return Object(r.jsxs)(M.a,{className:Object(U.a)(t.element,{[t.paperBack]:!s}),style:ve(n),children:[o,Object(r.jsx)("div",{className:Object(U.a)(t.unrounded,t.symbol,t.paperBack),onClick:()=>a(e[0]),onMouseDown:c,children:e[0]}),Object(r.jsx)("div",{className:Object(U.a)(t.rounded,t.symbol,t.paperBack),onClick:()=>a(e[1]),onMouseDown:c,children:e[1]})]})}}),[t,a,c]),o=Object(n.useMemo)((()=>Object(r.jsx)(M.a,{className:t.outerQuad,children:Object(r.jsxs)("div",{className:t.fullRel,children:[Object(r.jsx)(Oe,{className:t.trapezium}),Object(r.jsx)("div",{className:t.quad,children:oe.map((([e,t])=>Object(r.jsx)(s,{vowels:e,coords:t},"vowelbox-".concat(e))))})]})})),[t,s]);return Object(r.jsx)(M.a,{id:"vowelQuad",className:t.root,children:Object(r.jsxs)(E.a,{container:!0,className:t.fullHeight,wrap:"nowrap",children:[Object(r.jsx)(E.a,{item:!0,children:Object(r.jsxs)(E.a,{container:!0,direction:"column",className:Object(U.a)(t.fullHeight),children:[Object(r.jsx)(g.a,{variant:"body1",component:"p",children:"\u200b"}),Object(r.jsx)(E.a,{item:!0,xs:!0,children:Object(r.jsx)(E.a,{container:!0,direction:"column",justify:"space-between",className:Object(U.a)(t.fullHeight,t.vowelHeight),children:ce.map((e=>Object(r.jsx)(g.a,{variant:"body1",component:"p",children:e},e)))})})]})}),Object(r.jsx)(E.a,{item:!0,xs:!0,children:Object(r.jsxs)(E.a,{container:!0,direction:"column",className:t.fullHeight,children:[Object(r.jsx)(E.a,{item:!0,children:Object(r.jsx)(E.a,{container:!0,justify:"space-between",className:t.vowelPos,children:se.map((e=>Object(r.jsx)(g.a,{variant:"body1",component:"p",children:e},e)))})}),Object(r.jsx)(E.a,{item:!0,xs:!0,children:o})]})})]})})};var ye=c.a.memo(fe);const ke=Object(R.a)((e=>{return{root:{width:"100%",height:"100%"},symbol:{userSelect:"none",textAlign:"center",cursor:"pointer",fontSize:"1.5rem","&:hover":{backgroundColor:e.palette.action.hover}},description:{padding:"2px",fontSize:"0.8rem"},descriptionParent:{display:"flex",justifyContent:"center",flexDirection:"column",height:"100%"},bordered:{boxShadow:(t="1px",a=K(e),"".concat(t," 0 0 0 ").concat(a,", 0 ").concat(t," 0 0 ").concat(a,", ").concat(t," ").concat(t," 0 0 ").concat(a,", ").concat(t," 0 0 0 ").concat(a," inset, 0 ").concat(t," 0 0 ").concat(a," inset"))}};var t,a})),we=e=>{const t=ke(),{onClick:a=(()=>{})}=e,c=Object(n.useCallback)((e=>e.preventDefault()),[]);return Object(r.jsx)(E.a,{container:!0,spacing:0,children:ie.map((({ipa:e,description:n,examples:s})=>Object(r.jsx)(E.a,{item:!0,xs:6,sm:4,className:t.bordered,children:Object(r.jsxs)(E.a,{container:!0,children:[Object(r.jsx)(E.a,{item:!0,xs:2,className:t.symbol,onClick:()=>a(e),children:"".concat("\u25cc").concat(e)}),Object(r.jsx)(E.a,{item:!0,xs:!0,children:Object(r.jsx)("div",{className:t.descriptionParent,children:Object(r.jsx)("div",{className:t.description,children:n})})}),s.map((n=>{const s="".concat(n).concat(e);return Object(r.jsx)(E.a,{item:!0,xs:2,className:t.symbol,onClick:()=>a(s),onMouseDown:c,children:s},s)}))]})},"diacritics-".concat(n))))})};var Ce=c.a.memo(we);const Se=Object(R.a)((e=>({paper:{padding:e.spacing(1),height:"100%"},childOrder:{...Ne(1,3,2,4),[e.breakpoints.up("lg")]:Ne(1,2,3,4)}}))),Ne=(...e)=>{let t={"& > *":{order:100}};return e.forEach(((e,a)=>{t["& > :nth-child(".concat(a+1,")")]={order:e}})),t},Re=e=>{const t=Se(),{onClick:a}=e;return Object(r.jsxs)(E.a,{container:!0,spacing:2,className:t.childOrder,children:[Object(r.jsx)(E.a,{item:!0,xs:12,children:Object(r.jsxs)(F.a,{className:t.paper,children:[Object(r.jsx)(g.a,{variant:"h6",component:"p",gutterBottom:!0,children:"Consonants (Pulmonics)"}),Object(r.jsx)(pe,{onClick:a}),Object(r.jsx)(g.a,{variant:"caption",align:"center",component:"p",children:"Symbols to the right in a cell are voiced, to the left are voiceless. Shaded areas denote articulations judged impossible."})]})}),Object(r.jsx)(E.a,{item:!0,xs:12,md:6,children:Object(r.jsxs)(F.a,{className:t.paper,children:[Object(r.jsx)(g.a,{variant:"h6",component:"p",gutterBottom:!0,children:"Consonants (Non-pulmonics)"}),Object(r.jsx)(ue,{onClick:a})]})}),Object(r.jsx)(E.a,{item:!0,xs:12,md:6,children:Object(r.jsx)(F.a,{className:t.paper,children:Object(r.jsx)(ye,{onClick:a})})}),Object(r.jsx)(E.a,{item:!0,xs:12,md:8,children:Object(r.jsxs)(F.a,{className:t.paper,children:[Object(r.jsx)(g.a,{variant:"h6",component:"p",gutterBottom:!0,children:"Diacritics"}),Object(r.jsx)(Ce,{onClick:a})]})})]})};var Me,Ee=c.a.memo(Re);function De(e,t){var a,r,n,c;const{value:s}=e,o=(null===(a=e.ref)||void 0===a||null===(r=a.current)||void 0===r?void 0:r.selectionStart)||0,i=(null===(n=e.ref)||void 0===n||null===(c=n.current)||void 0===c?void 0:c.selectionEnd)||o;switch(t.type){case Me.Delete:return o!==i?{...e,cursor:o,value:s.slice(0,o)+s.slice(i,s.length)}:0===o?e:{...e,cursor:o-1,value:s.slice(0,o-1)+s.slice(o,s.length)};case Me.Append:return{...e,cursor:o+t.value.length,value:s.slice(0,o)+t.value+s.slice(i,s.length)};case Me.Set:return{...e,value:t.value,cursor:t.value.length};case Me.Type:return{...e,value:t.value}}}!function(e){e[e.Delete=0]="Delete",e[e.Append=1]="Append",e[e.Set=2]="Set",e[e.Type=3]="Type"}(Me||(Me={}));var Ae=()=>{const e=Object(n.useRef)(null),[{cursor:t,value:a},r]=Object(n.useReducer)(De,{cursor:0,value:"",ref:e}),c=Object(n.useCallback)((e=>r({type:Me.Append,value:e})),[]),s=Object(n.useCallback)((e=>r({type:Me.Type,value:e.target.value})),[]),o=Object(n.useCallback)((()=>r({type:Me.Delete})),[]),i=Object(n.useCallback)((e=>r({type:Me.Set,value:e})),[]);return Object(n.useLayoutEffect)((()=>{var a,r,n;const c=document.activeElement;null===(a=e.current)||void 0===a||a.focus(),null===(r=e.current)||void 0===r||r.setSelectionRange(t,t),null===(n=e.current)||void 0===n||n.blur(),null===c||void 0===c||c.focus()}),[t]),Object(n.useDebugValue)({cursor:t,value:a}),{handleKeyboard:c,handleDelete:o,handleType:s,setValue:i,value:a,ref:e}},Le=a(73),Pe=a.n(Le);const ze=new Map([["\u02a7","t\u0361\u0283"],["\u02a4","d\u0361\u0292"],["\u025a","\u0259\u02de"],["\u025d","\u025c\u02de"],["!","\u01c3"],["'","\u02c8"]]),Be=new RegExp(Array.from(ze.keys()).join("|"),"gu");var Te=e=>e.normalize("NFKD").replaceAll(Be,(e=>ze.get(e)||"\u2370"));const Ie="Hmmm... Are you sure there's more sounds here?",We=Pe()("..."),He=(e,t)=>{if(!t)return{correct:!1,message:Ie};const a=Te(e);let r;if(t.correct.includes(a))return{correct:!0};if(r=t.explanations.get(a))return{correct:!1,message:r};if(t.wildcards){const e=t.wildcards.find((({matcher:e})=>(e=>{const t=Pe()(e);return new RegExp("^".concat(t.replaceAll(We,".*"),"$"),"u")})(e).test(a)));if(e)return{correct:!1,message:e.message}}return{correct:!1,message:0===t.correct.length?Ie:"Whoops, that's not right. Try again!"}},Fe=(e,t,a=[])=>{if(t.hasOwnProperty(e)){const r=[...a,e];let n=[];return t[e].forEach((e=>{if(t.hasOwnProperty(e)&&!r.includes(e)){const a=Fe(e,t,r);n=n.concat(a)}else n.push(e)})),n}return[e]},Ue=(e,t)=>{let a={};for(const r in t){if(t[r]&&!e.hasOwnProperty(r))throw new Error("Missing required property ".concat(r));a[r]=e[r]}return a},Ve=e=>{const t=p.a.parse(e,{prettyErrors:!0}),a=Ue(t,{author:!0,title:!0,salt:!1,instructions:!1,answer:!1}),r=(e=>{if(e){let t={};for(const a in e)t[Te(a)]=e[a].map(Te);return t}return{}})(t.macros),n=t.words.map((e=>({...Ue(e,{display:!0,audio:!1}),segments:((e,t)=>{if(e&&Array.isArray(e)){const a=e.map(((a,r)=>{let n=[],c=[];const s=new Map;for(const e in a){const r=Te(e),o=a[e];!0===o?n=n.concat(Fe(r,t)):r.includes("...")?c.push({matcher:r,message:o}):Fe(r,t).forEach((e=>{s.set(e,o)}))}if(r<e.length-1&&n.includes(""))throw new Error("You can only have the empty string as a key in the last segment");return{correct:n,explanations:s,wildcards:c}})),r=a[a.length-1];return 0===r.correct.length?(r.correct.push(""),r.final=!0):r.correct.includes("")?r.final=!0:a.push({correct:[""],explanations:new Map,final:!0}),a}throw new Error("Segments must be an array")})(e.segments,r)})));return{...a,macros:r,words:n}},Ke=(e,t,a=!1)=>{const r=Object(n.useRef)(!1),[c,s]=Object(n.useState)((()=>{const a=localStorage.getItem(e);return null===a?t:JSON.parse(a)})),o=Object(n.useCallback)((e=>{s(e)}),[]);return Object(n.useEffect)((()=>{r.current||a?localStorage.setItem(e,JSON.stringify(c)):r.current=!0}),[e,c,a]),[c,o]},Ye=c.a.createContext(!1),Ge=()=>c.a.useContext(Ye);var _e=e=>{const[t,a]=Ke("debug_mode",!1);return c.a.useEffect((()=>{document.addEventListener("keydown",(e=>{"."===e.key&&e.metaKey&&e.shiftKey&&a((e=>!e))}))}),[a]),Object(r.jsx)(Ye.Provider,{value:t,children:e.children})};const qe=Object(R.a)((e=>({sticky:{zIndex:10,position:"sticky",top:"".concat(e.spacing(-1),"px")},search:{backgroundColor:e.palette.background.default,borderRadius:"8px"},correct:{color:e.palette.success.dark}})));var Je;!function(e){e[e.Reset=0]="Reset",e[e.SoftReset=1]="SoftReset",e[e.SetHeader=2]="SetHeader",e[e.NextSegment=3]="NextSegment",e[e.ErrorMessage=4]="ErrorMessage",e[e.ClearError=5]="ClearError"}(Je||(Je={}));const $e=e=>({word:e,segment:0,header:"",error:!1}),Qe=(e,t)=>{switch(t.type){case Je.SoftReset:return Object.is(t.value,e.word)?e:$e(t.value);case Je.Reset:return $e(t.value);case Je.SetHeader:return{...e,header:t.value};case Je.NextSegment:return{...e,segment:e.segment+1,header:e.header+t.value};case Je.ClearError:return e.error?{...e,error:!1,errorMessage:void 0}:e;case Je.ErrorMessage:return{...e,error:!0,errorMessage:t.value}}};var Ze=e=>{const t=qe(),a=Ge(),{word:c,onSubmit:s}=e,{handleKeyboard:o,handleDelete:i,handleType:l,setValue:d,value:p,ref:j}=Ae(),[b,u]=Object(n.useReducer)(Qe,c,$e);Object(n.useEffect)((()=>u({type:Je.SoftReset,value:c})),[c]),Object(n.useEffect)((()=>u({type:Je.ClearError})),[p]);const h=Object(n.useCallback)((e=>{if(a&&"winston"===e)return d(""),u({type:Je.SetHeader,value:e}),void s();const t=c.segments[b.segment],r=He(e,t);r.correct?(u({type:Je.NextSegment,value:e}),d(""),t.final&&s()):u({type:Je.ErrorMessage,value:r.message})}),[c,b.segment,d,s,a]),{header:m,error:x,errorMessage:O}=b,g=m&&Object(r.jsx)("span",{className:t.correct,children:m});return Object(r.jsxs)("div",{children:[Object(r.jsx)(M.a,{paddingY:2,className:t.sticky,children:Object(r.jsx)(E.a,{container:!0,alignItems:"center",justify:"center",spacing:2,children:Object(r.jsx)(E.a,{item:!0,xs:!0,md:8,className:t.search,children:Object(r.jsx)(H,{placeholder:'Transcribe "'.concat(c.display,'"'),value:p,onDelete:i,onType:l,inputRef:j,onCheck:h,header:g,error:x,helpText:O})})})}),Object(r.jsx)(Ee,{onClick:o})]})},Xe=a(94),et=a.n(Xe),tt=a(93),at=a.n(tt);const rt=new Date("2020-02-02"),nt=async(e,t,a=!0,r)=>{if("undefined"===typeof e||!a)return;const n="".concat((e=>e.toLowerCase().replace(/[\s-]+/g,"-").replace(/[^a-zA-Z0-9-]/g,""))(e),"_").concat(r||(()=>{const e=new Date;return Math.floor((e.getTime()-rt.getTime())/1e3/60)})().toString(36)),c=[n,t].join("_");return[n,(await async function(e){const t=await crypto.subtle.digest("SHA-256",e);return at.a.fromByteArray(new Uint8Array(t))}((new TextEncoder).encode(c))).replace(/[+/=]/g,"").toLowerCase().slice(0,16)].join("_")},ct={prompt:"Name",salt:"R167",debug:!1};var st,ot=e=>{const{salt:t,debug:a,prompt:c}={...ct,...e},[s,o]=Object(n.useState)(),[i,d]=Object(n.useState)(!1),[p,j]=Object(n.useState)(!1),b=Object(n.useRef)(),u=Object(n.useRef)(),{result:h}=Object(l.a)(nt,[s,t,i]),m=h||s,x=Object(n.useCallback)((()=>{if(b.current){const e=b.current;e.select(),e.setSelectionRange(0,e.value.length),document.execCommand("copy"),j(!0),window.clearTimeout(u.current),u.current=window.setTimeout((()=>j(!1)),2e3)}}),[]),O=i?Object(r.jsx)(y.a,{variant:"contained",color:"primary",onClick:x,children:"Copy"}):Object(r.jsx)(y.a,{type:"submit",variant:"contained",color:"primary",children:"Submit"}),v=Object(n.useCallback)((e=>{e.preventDefault(),d(!0)}),[]);return Object(n.useEffect)((()=>{i&&h&&x()}),[h,i,x]),Object(r.jsx)("form",{onSubmit:v,children:Object(r.jsxs)(E.a,{container:!0,spacing:2,alignItems:"center",justify:"center",children:[Object(r.jsx)(E.a,{item:!0,xs:12,sm:10,md:8,lg:6,children:Object(r.jsx)(L.a,{label:c,variant:"outlined",InputProps:{readOnly:!!h},inputRef:b,fullWidth:!0,onChange:e=>o(e.target.value),value:m})}),Object(r.jsx)(E.a,{item:!0,md:8,children:Object(r.jsxs)(E.a,{container:!0,justify:"center",children:[Object(r.jsx)(D.a,{PopperProps:{disablePortal:!0},open:p,disableFocusListener:!0,disableHoverListener:!0,disableTouchListener:!0,arrow:!0,title:Object(r.jsx)(g.a,{variant:"subtitle2",children:"Copied!"}),children:O}),a&&Object(r.jsx)(y.a,{variant:"contained",color:"primary",onClick:()=>d(!1),children:"Reset"})]})})]})})};!function(e){e[e.DismissModal=0]="DismissModal",e[e.Submit=1]="Submit",e[e.ModalExit=2]="ModalExit"}(st||(st={}));const it=(e,t)=>{const{currWord:a,wordCount:r}=e;switch(t){case st.DismissModal:return a+1<r?{...e,showModal:!1,currWord:a+1}:{...e,showModal:!1,showWord:!1};case st.Submit:return{...e,showModal:!0};case st.ModalExit:return{...e,modalWord:a}}},lt=(e,t)=>Object(n.useCallback)((()=>e(t)),[t,e]);var dt=c.a.memo((e=>{const{task:t,baseUrl:a}=e,{title:c,words:s,instructions:o}=t,[{currWord:i,modalWord:l,showModal:d,showWord:p},j]=Object(n.useReducer)(it,{modalWord:0,currWord:0,wordCount:s.length,showModal:!1,showWord:!0}),b=Ge(),u=s[i],h=lt(j,st.Submit),m=lt(j,st.DismissModal),x=lt(j,st.ModalExit),O=s.length-1,R=(Object(n.useMemo)((()=>new v({latencyHint:"interactive"})),[]),Object(n.useMemo)((()=>{if(u.audio){const e=new URL(u.audio,a).toString();return new Audio(e)}}),[u.audio,a])),M=Object(n.useCallback)((()=>{if(R)try{R.currentTime=0,R.play()}catch{console.error({message:"unable to play url",src:R.src})}}),[R]);return Object(r.jsxs)("div",{children:[Object(r.jsx)(g.a,{variant:"h3",component:"h2",gutterBottom:!0,align:"center",children:c}),Object(r.jsxs)(f.a,{in:p,children:[Object(r.jsx)(g.a,{variant:"body1",gutterBottom:!0,children:o}),Object(r.jsxs)(g.a,{variant:"h4",component:"p",align:"center",children:[i+1,"/",s.length,': Transcribe "',u.display,'"'," ",Object(r.jsx)(y.a,{variant:"contained",color:"secondary",startIcon:Object(r.jsx)(et.a,{}),onClick:M,disabled:!R,children:"Play"})]}),Object(r.jsx)(Ze,{word:u,onSubmit:h})]}),Object(r.jsx)(f.a,{in:!p,children:Object(r.jsx)(ot,{salt:t.salt,debug:b})}),Object(r.jsxs)(k.a,{open:d,onClose:m,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",disableRestoreFocus:!b,onExited:x,children:[Object(r.jsx)(w.a,{id:"alert-dialog-title",children:"Congrats! You got it correct"}),Object(r.jsx)(C.a,{children:Object(r.jsx)(S.a,{id:"alert-dialog-description",children:"You did a good job of getting the word correct!"})}),Object(r.jsx)(N.a,{children:Object(r.jsx)(y.a,{onClick:m,variant:"contained",color:"primary",disabled:!d,autoFocus:!0,disableFocusRipple:!0,children:l<O?"Next word":"Finish"})})]})]})}));const pt=async e=>{if(!e)return void console.log("empty task");const t=await fetch(e),a=await t.text();return Ve(a)},jt=({msg:e,error:t})=>Object(r.jsxs)(g.a,{variant:"h3",component:"h1",gutterBottom:!0,align:"center",children:[t&&"Error: ",e]});var bt=e=>{const{taskFileUrl:t}=e,a=Object(l.a)(pt,[t]),n=new URL(t,new URL("",window.origin)).toString();return a.result?Object(r.jsx)(dt,{task:a.result,baseUrl:n}):a.loading?Object(r.jsx)("div",{children:Object(r.jsx)(g.a,{variant:"h4",component:"h1",gutterBottom:!0,align:"center",children:"Loading..."})}):a.error?(console.error(a.error),Object(r.jsx)(jt,{error:!0,msg:"Cannot load task file"})):Object(r.jsx)(jt,{error:!0,msg:"Unreachable state???"})};var ut=()=>{const{klass:e,assignment:t}=Object(i.g)();return Object(r.jsx)(bt,{taskFileUrl:b(e,"".concat(t,".yaml"))})},ht=a(31);const mt=(e,t)=>"".concat(e,"/").concat(t.replace(".yaml",""));var xt=e=>{const{tasks:t,path:a}=e;return 0===t.length?Object(r.jsx)(g.a,{children:"No tasks to do"}):Object(r.jsx)(E.a,{container:!0,spacing:4,children:t.map(((e,t)=>!e.hidden&&Object(r.jsx)(E.a,{item:!0,lg:6,xs:12,children:Object(r.jsxs)(M.a,{component:F.a,p:2,height:"100%",display:"flex",alignContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",children:[Object(r.jsxs)(M.a,{children:[Object(r.jsx)(g.a,{color:"primary",gutterBottom:!0,children:e.name}),Object(r.jsx)(g.a,{variant:"body2",gutterBottom:!0,children:e.description})]}),Object(r.jsx)(M.a,{display:"flex",justifyContent:"flex-end",alignItems:"flex-end",width:"100%",children:Object(r.jsx)(y.a,{component:ht.b,color:"secondary",variant:"contained",to:mt(a,e.file),children:"Work on task"})})]})},"tasklist-".concat(t))))})};const Ot=async e=>{if(!e)return void console.log("empty class");const t=b(e,"tasks.yaml"),a=await fetch(t),r=await a.text();return p.a.parse(r,{prettyErrors:!0})},gt=({msg:e,error:t})=>Object(r.jsxs)(g.a,{variant:"h3",component:"h1",gutterBottom:!0,align:"center",children:[t&&"Error: ",e]});var vt=e=>{var t,a;const n=e.match.params.klass,c=m(),s=null===c||void 0===c||null===(t=c.result)||void 0===t||null===(a=t.classes)||void 0===a?void 0:a.find((({folder:e})=>n===e)),o=Object(l.a)(Ot,[n]);if(o.result){const{title:t,description:a,tasks:n}=o.result;return Object(r.jsxs)("div",{children:[Object(r.jsxs)("div",{children:[Object(r.jsx)(g.a,{variant:"h3",component:"h1",gutterBottom:!0,align:"center",children:t}),Object(r.jsx)(g.a,{variant:"subtitle1",gutterBottom:!0,align:"center",children:a})]}),Object(r.jsx)(g.a,{variant:"h5",gutterBottom:!0,children:"Assignments:"}),Object(r.jsx)(xt,{tasks:n,path:e.location.pathname})]})}return o.loading&&s?Object(r.jsx)("div",{children:Object(r.jsxs)(g.a,{variant:"h4",component:"h1",gutterBottom:!0,align:"center",children:["Loading ",s.name,"..."]})}):c.loading||o.loading?Object(r.jsx)(g.a,{variant:"h4",component:"h1",gutterBottom:!0,align:"center",children:"Loading..."}):o.error?s?Object(r.jsx)(gt,{error:!0,msg:"Cannot load class task file"}):Object(r.jsx)(gt,{error:!0,msg:"No such class exists"}):Object(r.jsx)(gt,{error:!0,msg:"Unreachable state???"})},ft=a(179);var yt=()=>Object(r.jsxs)(M.a,{paddingY:2,children:[Object(r.jsx)(g.a,{align:"center",variant:"h3",component:"h1",gutterBottom:!0,children:"Welcome to Int IPA"}),Object(r.jsxs)(g.a,{variant:"h5",component:"p",children:["This is just some place holder text right now. I'm not really sure what you want on this page. One possible option is a self description, etc. I don't really know. Here's a link to the"," ",Object(r.jsx)(ft.a,{component:ht.b,to:"/type",color:"primary",children:"the IPA keyboard"}),"."]})]});const kt=Object(R.a)((e=>({sticky:{zIndex:10,position:"sticky",top:"".concat(e.spacing(-1),"px")},search:{backgroundColor:e.palette.background.default,borderRadius:"8px"}})));var wt=()=>{const{handleKeyboard:e,handleDelete:t,handleType:a,value:n,ref:c}=Ae(),s=kt();return Object(r.jsxs)("div",{children:[Object(r.jsx)(M.a,{paddingY:2,className:s.sticky,children:Object(r.jsx)(E.a,{container:!0,alignItems:"center",justify:"center",spacing:2,children:Object(r.jsx)(E.a,{item:!0,xs:!0,md:8,className:s.search,children:Object(r.jsx)(H,{value:n,inputRef:c,onType:a,onDelete:t})})})}),Object(r.jsx)(Ee,{onClick:e})]})};var Ct=()=>Object(r.jsxs)(i.c,{children:[Object(r.jsx)(i.a,{path:"/type",exact:!0,component:wt}),Object(r.jsx)(i.a,{path:"/",exact:!0,component:yt}),Object(r.jsx)(i.a,{path:"/class/:klass",exact:!0,component:vt}),Object(r.jsx)(i.a,{path:"/class/:klass/:assignment",exact:!0,component:ut})]}),St=a(190),Nt=a(191),Rt=a(195),Mt=a(180),Et=a(181),Dt=a(183),At=a(7),Lt=a(196),Pt=a(163),zt=a(184),Bt=a(185),Tt=a(197),It=a(186),Wt=a(187),Ht=a(97),Ft=a.n(Ht),Ut=a(95),Vt=a.n(Ut),Kt=a(96),Yt=a.n(Kt),Gt=a(182),_t=a(68);const qt=e=>({paddingLeft:"max(env(safe-area-inset-left, 0px), ".concat(e.spacing(2),"px)"),paddingRight:"max(env(safe-area-inset-right, 0px), ".concat(e.spacing(2),"px)"),[e.breakpoints.up("sm")]:{paddingLeft:"max(env(safe-area-inset-left, 0px), ".concat(e.spacing(3),"px)"),paddingRight:"max(env(safe-area-inset-right, 0px), ".concat(e.spacing(3),"px)")}}),Jt=Object(R.a)((e=>({itemGutters:{paddingLeft:"max(env(safe-area-inset-left, 0px), ".concat(e.spacing(2),"px)")},gutters:qt(e)}))),$t=({error:e})=>Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)(Mt.a,{children:Object(r.jsx)(Et.a,{primary:e?"Error loading classes.":"Loading classes..."})}),Object(r.jsx)(Gt.a,{})]}),Qt=e=>{const{pathname:t}=Object(i.f)(),{to:a,text:n,icon:c,exact:s,gutters:o}=e,l=!!Object(i.e)(t,{path:a,exact:s});return Object(r.jsxs)(Mt.a,{button:!0,component:ht.b,to:a,selected:l,classes:{gutters:o},children:[c&&Object(r.jsx)(Dt.a,{children:c}),Object(r.jsx)(Et.a,{primary:n})]})},Zt=Object(At.a)({switchBase:{color:_t.a[100],"&$checked":{color:"black"},"&$checked + $track":{backgroundColor:_t.a[500]}},checked:{},track:{}})(Lt.a);var Xt=e=>{const[t,a]=Object(n.useState)(!1),c=Jt(),{changeDarkMode:s}=e,{result:o,loading:i,error:l}=m(),d=Object(n.useCallback)((()=>{a(!0)}),[]),p=Object(n.useCallback)((()=>{a(!1)}),[]),j=Object(n.useCallback)((e=>{s(e.target.checked)}),[s]),b=Object(r.jsxs)(M.a,{width:"100%",children:[Object(r.jsx)(Pt.a,{children:Object(r.jsx)(Qt,{to:"/",text:"Home",icon:Object(r.jsx)(Vt.a,{}),exact:!0,gutters:c.itemGutters})}),Object(r.jsx)(zt.a,{}),Object(r.jsxs)(Pt.a,{children:[Object(r.jsx)(Bt.a,{classes:{gutters:c.itemGutters},children:"Classes"}),l&&Object(r.jsx)($t,{error:!0}),i&&Object(r.jsx)($t,{}),o&&o.classes.map((({name:e,folder:t,hidden:a},n)=>!a&&Object(r.jsx)(Qt,{to:"/class/".concat(t),text:e,gutters:c.itemGutters},"class-list-".concat(n))))]}),Object(r.jsx)(zt.a,{}),Object(r.jsxs)(Pt.a,{children:[Object(r.jsx)(Bt.a,{classes:{gutters:c.itemGutters},children:"Tools"}),Object(r.jsx)(Qt,{to:"/type",text:"IPA Keyboard",icon:Object(r.jsx)(Yt.a,{}),exact:!0,gutters:c.itemGutters})]})]});return Object(r.jsxs)("div",{children:[Object(r.jsx)(Tt.a,{anchor:"left",open:t,onClose:p,children:Object(r.jsxs)(M.a,{display:"flex",flexWrap:"wrap",width:275,alignContent:"space-between",alignItems:"flex-start",height:"100%",overflow:"hidden",role:"presentation",children:[b,Object(r.jsx)(M.a,{width:"100%",mb:2,children:Object(r.jsx)(g.a,{component:"div",children:Object(r.jsxs)(E.a,{component:"label",container:!0,justify:"center",alignItems:"center",spacing:1,children:[Object(r.jsx)(E.a,{item:!0,children:"Light"}),Object(r.jsx)(E.a,{item:!0,children:Object(r.jsx)(Zt,{color:"default",checked:e.darkMode,onChange:j})}),Object(r.jsx)(E.a,{item:!0,children:"Dark"})]})})})]})}),Object(r.jsx)(It.a,{position:"static",color:"secondary",children:Object(r.jsxs)(Wt.a,{classes:{gutters:c.gutters},children:[Object(r.jsx)(A.a,{onClick:d,edge:"start",color:"inherit","aria-label":"menu",children:Object(r.jsx)(Ft.a,{})}),Object(r.jsx)(g.a,{variant:"h6",children:"Int IPA"})]})})]})},ea=a(189),ta=a(98),aa=a(70),ra=a(69),na=a(188);const ca=Object(ta.a)({palette:{type:"light",primary:{main:aa.a[900]},secondary:{main:ra.a[700]}}}),sa=Object(ta.a)({palette:{type:"dark",primary:{main:aa.a[500]},secondary:{main:ra.a[700]}}}),oa=Object(R.a)((e=>({containerRoot:{width:"100%",boxSizing:"border-box",display:"block",margin:e.spacing(1,"auto","env(safe-area-inset-bottom, 0px)"),...qt(e)},debug:{pointerEvents:"none"}})));function ia(){const e=oa(),t=Ge(),a=Object(na.a)("(prefers-color-scheme: dark)"),[s,o]=Ke("useDarkMode",null);Object(n.useEffect)((()=>{0}),[]);const i=null===s?a:s,l=c.a.useMemo((()=>Object(ta.a)(i?sa:ca)),[i]);return Object(r.jsxs)(ea.a,{theme:l,children:[Object(r.jsx)(St.a,{}),Object(r.jsx)(Xt,{darkMode:i,changeDarkMode:o}),Object(r.jsx)(Nt.a,{maxWidth:"lg",classes:{root:e.containerRoot},children:Object(r.jsx)(Ct,{})}),Object(r.jsx)(Rt.a,{anchorOrigin:{vertical:"bottom",horizontal:"right"},open:t,message:"Debug mode",className:e.debug,ContentProps:{style:{minWidth:0,background:"rgba(240, 240, 240, 0.5)"}}})]})}o.a.render(Object(r.jsx)(c.a.StrictMode,{children:Object(r.jsx)(_e,{children:Object(r.jsx)(O,{children:Object(r.jsx)(ht.a,{children:Object(r.jsx)(ia,{})})})})}),document.getElementById("root"))}},[[126,1,2]]]);
//# sourceMappingURL=main.cba19814.chunk.js.map