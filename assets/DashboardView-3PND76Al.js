import{a,S as l}from"./sweetalert2.all-sDImy6Vf.js";import{_ as u,c as _,a as c,b as t,w as s,d as o,F as m,r,o as p}from"./index-HrNhp23E.js";var h={VITE_URL:"https://ec-course-api.hexschool.io/v2",VITE_PATH:"celine510",BASE_URL:"/undefined/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_URL:f}=h,k={methods:{checkAdmin(){a.post(`${f}/api/user/check`).then(e=>{console.log(e)}).catch(e=>{console.dir(e),l.fire({title:"登入失敗",text:"將跳轉回登入頁",icon:"error"}).then(i=>{this.$router.push("/login")})})}},mounted(){const e=document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,"$1");a.defaults.headers.common.Authorization=e,this.checkAdmin()}},V=c("h1",null,"後台首頁",-1);function R(e,i,$,x,E,w){const n=r("RouterLink"),d=r("RouterView");return p(),_(m,null,[V,c("nav",null,[t(n,{to:"/admin/products"},{default:s(()=>[o("產品列表")]),_:1}),o(" | "),t(n,{to:"/admin/order"},{default:s(()=>[o("訂單")]),_:1}),o(" | "),t(n,{to:"/"},{default:s(()=>[o("回到前台")]),_:1})]),t(d)],64)}const A=u(k,[["render",R]]);export{A as default};