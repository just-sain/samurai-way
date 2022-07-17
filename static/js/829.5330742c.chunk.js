"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[829],{7829:function(e,n,r){r.r(n),r.d(n,{default:function(){return z}});var s=r(885),t=r(2791),a=r(3504),l=r(8687),i=r(3260),c=r(1573),o=r(5600),u=function(e){return e.usersPage.users},d=function(e){return e.usersPage.pageSize},f=function(e){return e.usersPage.totalUsersCount},h=function(e){return e.usersPage.currentPage},g=function(e){return e.usersPage.isFetching},m=function(e){return e.usersPage.followingInProgress},x=r(4667),p=r(7899),j="User_user__Lrek9",_="User_name__t4uOK",v="User_desc__HyjJk",P="User_photo__DcfJ7",w=r(184),S=function(e){return(0,w.jsxs)("div",{className:j,children:[(0,w.jsxs)("div",{className:_,children:[(0,w.jsxs)("div",{className:P,children:[(0,w.jsx)(a.OL,{to:"/profile/".concat(e.userID),children:(0,w.jsx)("img",{src:null!=e.smallPhoto?e.smallPhoto:p,alt:""})}),(0,w.jsx)("h3",{children:e.name})]}),e.userID===e.selfID?(0,w.jsx)("button",{disabled:!0,children:"you"}):(0,w.jsx)("button",{disabled:e.followingInProgress.some((function(n){return n===e.userID})),onClick:function(){return e.changeFollow(!e.followed,e.userID)},children:e.followed?"unfollow":"follow"})]}),(0,w.jsx)("div",{className:v,children:e.status})]})},b=r(1413),N=r(9195),I="Search_form__7nD9N",C="Search_search__jtXau",D="Search_filter__1BZ8i",y="Search_btn__9YyMW",Z=function(e){var n=(0,N.cI)({defaultValues:{search:e.searchTerm,friend:"true"===e.searchFriend?"only":"false"===e.searchFriend?"not":"all"}}),r=n.handleSubmit,s=n.register;return(0,w.jsxs)("form",{onSubmit:r((function(n){var r=n.search,s=n.friend,t={term:"",friend:"",page:""},a=null;null!==(a="only"===s||"not"!==s&&null)&&(t.friend=a.toString()),r&&(t.term=r),e.setSearchParams(t),e.onSearchUsers(r,a)})),className:I,placeholder:"Search...",children:[(0,w.jsx)("input",(0,b.Z)((0,b.Z)({},s("search")),{},{type:"text",className:C,placeholder:"name..."})),(0,w.jsxs)("div",{className:D,children:[(0,w.jsxs)("label",{children:[(0,w.jsx)("input",(0,b.Z)((0,b.Z)({},s("friend")),{},{type:"radio",name:"friend",value:"all"}))," ",(0,w.jsx)("span",{children:"All"})]}),(0,w.jsxs)("label",{children:[(0,w.jsx)("input",(0,b.Z)((0,b.Z)({},s("friend")),{},{type:"radio",name:"friend",value:"only"}))," ",(0,w.jsx)("span",{children:"Friends"})]}),(0,w.jsxs)("label",{children:[(0,w.jsx)("input",(0,b.Z)((0,b.Z)({},s("friend")),{},{type:"radio",name:"friend",value:"not"}))," ",(0,w.jsx)("span",{children:"Strangers"})]})]}),(0,w.jsx)("button",{type:"submit",className:y,children:"search"})]})},F=function(e){for(var n=e.onChangePage,r=e.totalItemsCount,s=e.pageSize,t=e.currentPage,a=Math.ceil(r/s),l=[],i=1;i<=a;i++)l.push(i);var c=l.map((function(e){var r=function(r){var s=r.text;return(0,w.jsx)("span",{title:"page",className:"navItem ".concat(t===e&&"selectedPage"),onClick:function(){t!==e&&n(e)},children:s})};return e===l[0]||e===l[l.length-1]?l[0]<t-3?(0,w.jsx)(r,{text:"".concat(e," ...")},e):l[l.length-1]>t+3?(0,w.jsx)(r,{text:"... ".concat(e)},e):(0,w.jsx)(r,{text:"".concat(e)},e):t===e||t===e-1||t===e-2||t===e-3||t===e+1||t===e+2||t===e+3?(0,w.jsx)(r,{text:"".concat(e)},e):void 0}));return(0,w.jsx)(w.Fragment,{children:c})},U="Users_users__VwipU",k="Users_nav__tcKg2",z=function(){var e=(0,a.lr)(),n=(0,s.Z)(e,2),r=n[0],p=n[1],j=r.get("page"),_=r.get("term")||"",v=r.get("friend")||"",P=null;P="true"===v||"false"!==v&&null;var b=(0,c.i)(o.$B),N=(0,c.i)(f),I=(0,c.i)(h),C=(0,c.i)(d),D=(0,c.i)(m),y=(0,c.i)(u),z=(0,c.i)(g),B=(0,l.I0)(),J=function(e,n){B(i.Nw.toggleFollowingInProgress(e,n))},K=function(e,n){B((0,i.n8)(e,n))};(0,t.useEffect)((function(){var e=I;e!==(null!==j?j:e)&&(B(i.Nw.setCurrentPage(Number(j))),e=Number(j));var n={page:String(e)};""!==_&&(n.term=_),null!==P&&(n.friend=String(P)),p(n),B((0,i.D7)(I,C,!0,_,P))}),[]);var L=y.map((function(e){return(0,w.jsx)(S,{selfID:b,userID:e.id,smallPhoto:e.photos.small,name:e.name,followed:e.followed,status:e.status,followingInProgress:D,changeFollow:K,toggleFollowingInProgress:J},e.id)}));return z?(0,w.jsx)(x.Z,{}):(0,w.jsxs)("section",{className:U,children:[(0,w.jsx)(Z,{onSearchUsers:function(e,n){var r={page:"1"};""!==_&&(r.term=_),null!==P&&(r.friend=String(P)),B(i.Nw.setCurrentPage(1)),p(r),B((0,i.D7)(1,C,!0,e,n))},setSearchParams:p,searchFriend:v,searchTerm:_}),(0,w.jsx)("div",{className:k,children:(0,w.jsx)(F,{onChangePage:function(e){B(i.Nw.setCurrentPage(e));var n={page:String(e)};""!==_&&(n.term=_),null!==P&&(n.friend=String(P)),p(n),B((0,i.D7)(e,C,!1,_,P))},totalItemsCount:N,pageSize:C,currentPage:I})}),(0,w.jsx)("div",{children:L})]})}},1573:function(e,n,r){r.d(n,{i:function(){return s}});var s=r(8687).v9},7899:function(e,n,r){e.exports=r.p+"static/media/blank-profile-picture.4a33880eba1cfcca5feb.webp"}}]);
//# sourceMappingURL=829.5330742c.chunk.js.map