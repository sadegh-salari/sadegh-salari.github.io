import{A as j,C as B,D as F,I as E,c as C,d as h,e as x,i as s,j as g,k as p,l as k,n as d,o as b,p as f,q as v,r as a,s as c,t as _,u as T,v as u,w as l,y as m,z as w}from"./chunk-LILOUTOI.js";function S(e,i){e&1&&_(0,"div",10)}function $(e,i){e&1&&_(0,"div",12)}function D(e,i){if(e&1){let o=T();p(0,$,1,0,"div",12),a(1,"div",13),u("click",function(){let t=h(o).$index,r=l().$index,y=l();return x(y.makeMove(r,t))}),a(2,"span",14),m(3),c()()}if(e&2){let o=i.$implicit,n=i.$index,t=l().$index,r=l();d(0,n>0?0:-1),s(2),k("ngClass",r.board[t][n]===r.winner?"animate-bounce text-green-200":r.gameOver?"text-red-200":"text-gray-50"),s(),w(" ",o," ")}}function O(e,i){if(e&1&&(p(0,S,1,0,"div",10),a(1,"div",7),f(2,D,4,3,"div",11,b),c()),e&2){let o=i.$implicit,n=i.$index;d(0,n>0?0:-1),s(2),v(o)}}function P(e,i){if(e&1&&(a(0,"div",8)(1,"p",15),m(2),c()()),e&2){let o=l();s(2),w("",o.winner," wins!")}}function V(e,i){if(e&1){let o=T();a(0,"div",9)(1,"button",16),u("click",function(){h(o);let t=l();return x(t.newGame())}),m(2," New Game "),c()()}}var N=(()=>{let i=class i{constructor(n){this._router=n,this.board=[],this.gameOver=!1,this.newGame()}newGame(){this.board=this._createBoard(),this.currentPlayer="X",this.winner=""}_createBoard(){return[["","",""],["","",""],["","",""]]}makeMove(n,t){if(!this.gameOver&&this.board&&this.board[n][t]===""&&!this.winner)if(this.board[n][t]=this.currentPlayer||"",this.checkWinner())this.winner=this.currentPlayer||"";else{if(this._isDraw()){this.gameOver=!0;return}this.currentPlayer=this.currentPlayer==="X"?"O":"X"}}_isDraw(){return this.board.every(n=>n.every(t=>t!==""))}checkWinner(){return[[this.board[0][0],this.board[0][1],this.board[0][2]],[this.board[1][0],this.board[1][1],this.board[1][2]],[this.board[2][0],this.board[2][1],this.board[2][2]],[this.board[0][0],this.board[1][0],this.board[2][0]],[this.board[0][1],this.board[1][1],this.board[2][1]],[this.board[0][2],this.board[1][2],this.board[2][2]],[this.board[0][0],this.board[1][1],this.board[2][2]],[this.board[0][2],this.board[1][1],this.board[2][0]]].some(t=>t.every(r=>r===this.currentPlayer))}goBack(){this._router.navigate(["/"])}};i.\u0275fac=function(t){return new(t||i)(g(E))},i.\u0275cmp=C({type:i,selectors:[["app-tic-tac-toe"]],standalone:!0,features:[j],decls:12,vars:2,consts:[[1,"bg-[#2E3650]","flex","flex-wrap","justify-center","text-center","h-[100dvh]","content-between"],[1,"flex","w-full","items-center","justify-between","p-4","border-b-2","border-gray-400","border-opacity-20"],[1,"text-gray-100",3,"click"],[1,"icon","arrow-left","text-2xl"],[1,"text-3xl","text-gray-100","font-bold"],[1,"flex","flex-wrap","w-full","content-center","justify-center","h-[calc(100dvh-70px)]","relative"],[1,"inline-block"],[1,"flex"],[1,"flex","flex-wrap","w-full","items-center","justify-center","absolute","top-16"],[1,"w-full","flex","items-center","justify-center","absolute","bottom-16"],[1,"border-b-4","rounded-xl","opacity-40","shadow-sm","border-[#B1B9D8]"],[1,"w-16","h-16","flex","items-center","justify-center","cursor-pointer","text-2xl"],[1,"border-l-4","rounded-xl","opacity-30","border-[#B1B9D8]"],[1,"w-16","h-16","flex","items-center","justify-center","cursor-pointer","text-2xl",3,"click"],[1,"font-black","opacity-60","duration-300",3,"ngClass"],[1,"text-green-200","text-2xl","font-bold"],[1,"border-2","border-gray-400","px-4","py-2","rounded-md","text-white",3,"click"]],template:function(t,r){t&1&&(a(0,"div",0)(1,"div",1)(2,"button",2),u("click",function(){return r.goBack()}),_(3,"span",3),c(),a(4,"h1",4),m(5,"Tic-Tac-Toe"),c()(),a(6,"div",5)(7,"div",6),f(8,O,4,1,"div",7,b),c(),p(10,P,3,1,"div",8)(11,V,3,0,"div",9),c()()),t&2&&(s(8),v(r.board),s(2),d(10,r.winner?10:-1),s(),d(11,r.gameOver||r.winner?11:-1))},dependencies:[F,B]});let e=i;return e})();export{N as TicTacToeComponent};
