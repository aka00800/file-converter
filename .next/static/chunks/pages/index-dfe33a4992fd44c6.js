(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{5557:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(2285)}])},2285:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return a}});var o=n(5893),r=n(7294);function a(){let[e,t]=(0,r.useState)(null),[n,a]=(0,r.useState)("jpg");(0,r.useEffect)(()=>{let e=[];for(let t=1;t<=68;t++){let n=String(t).padStart(4,"0");e.push("/images/background_".concat(n,".jpg"))}document.body.style.backgroundImage="url('".concat(e[Math.floor(Math.random()*e.length)],"')"),document.body.style.backgroundSize="cover",document.body.style.backgroundRepeat="no-repeat",document.body.style.backgroundPosition="center"},[]);let i=async t=>{t.preventDefault();let o=new FormData;o.append("file",e),o.append("format",n);let r=await fetch("/api/convert",{method:"POST",body:o}),a=await r.blob(),i=window.URL.createObjectURL(a),c=document.createElement("a");c.href=i,c.download="converted.".concat(n),c.click()};return(0,o.jsx)("div",{style:{margin:0,padding:0,display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"},children:(0,o.jsxs)("div",{className:"form-container",style:{backgroundColor:"rgba(255, 255, 255, 0.8)",padding:"20px",borderRadius:"8px",textAlign:"center",width:"fit-content",boxSizing:"border-box"},children:[(0,o.jsx)("h1",{style:{fontFamily:'"Arial", sans-serif',fontSize:"22px",fontWeight:"bold",marginBottom:"20px",whiteSpace:"nowrap"},children:"Convert EPS/PSD/HEIC/TIFF to JPG/PNG"}),(0,o.jsxs)("form",{encType:"multipart/form-data",onSubmit:i,children:[(0,o.jsx)("input",{type:"file",onChange:e=>{t(e.target.files[0])}}),(0,o.jsxs)("select",{value:n,onChange:e=>{a(e.target.value)},children:[(0,o.jsx)("option",{value:"jpg",children:"JPG"}),(0,o.jsx)("option",{value:"png",children:"PNG"})]}),(0,o.jsx)("br",{}),(0,o.jsx)("br",{}),(0,o.jsx)("button",{type:"submit",style:{fontFamily:'"Arial", sans-serif',fontSize:"14px",fontWeight:"bold",padding:"8px 16px",border:"none",borderRadius:"4px",cursor:"pointer",background:"linear-gradient(45deg, #f3ec78, #af4261)",color:"white",marginTop:"10px",transition:"background 0.3s ease"},children:"Convert"})]}),(0,o.jsx)("div",{className:"footer",style:{marginTop:"20px",fontSize:"12px",color:"gray"},children:"ファイルコンバー太 1.0"})]})})}}},function(e){e.O(0,[888,774,179],function(){return e(e.s=5557)}),_N_E=e.O()}]);