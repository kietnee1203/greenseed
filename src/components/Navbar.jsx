import {Search,ShoppingCart} from 'lucide-react'
export const Logo=({s})=>(<div className="flex items-center gap-2">
{s.logo?<img src={s.logo} className="h-9" alt="logo"/>:<svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="#E3F0AF" strokeWidth="2" strokeLinecap="round"><path d="M12 22V10M12 10C12 5 8 3 4 4c0 4 3 6 8 6zM12 13c0-4 3-6 8-6 0 4-3 7-8 6z"/></svg>}
<span className="font-bold text-lg">{s.name}</span></div>)
export default function Navbar({settings,q,setQ,cartCount,role,setRole,goShop,goCart,menu,onMenu}){
const roles=[['Customer','Khách hàng'],['Seller','Người bán'],['Admin','Quản trị']]
return(<header className="glass-dark text-white sticky top-0 z-40">
<div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center gap-3 justify-between">
<button onClick={goShop}><Logo s={settings}/></button>
{role==='Customer'&&<div className="relative flex-1 min-w-[180px] max-w-md"><Search className="absolute left-3 top-2.5 h-4 w-4 text-lime-400"/>
<input value={q} onChange={e=>{setQ(e.target.value);goShop()}} placeholder="Tìm hạt giống..." className="w-full rounded-full py-2 pl-9 pr-3 bg-slate-900 border border-emerald-800 text-slate-100 text-sm placeholder:text-slate-500"/></div>}
<div className="flex items-center gap-2">
{role==='Customer'&&<button onClick={goCart} className="relative p-2"><ShoppingCart/>{cartCount>0&&<span className="absolute -top-1 -right-1 bg-lime-400 text-slate-950 text-xs rounded-full h-5 w-5 grid place-items-center">{cartCount}</span>}</button>}
<div className="flex bg-slate-950/60 rounded-full p-1 text-xs">{roles.map(([k,l])=><button key={k} onClick={()=>setRole(k)} className={`px-3 py-1 rounded-full ${role===k?'bg-lime-400 text-slate-950 font-medium':''}`}>{l}</button>)}</div>
</div></div>
<nav className="bg-slate-950/40 text-sm"><div className="max-w-6xl mx-auto px-4 py-1 flex gap-1 overflow-x-auto">{menu.map(([k,l])=><button key={k} onClick={()=>onMenu(k)} className="px-3 py-1 rounded hover:bg-emerald-900/60 whitespace-nowrap">{l}</button>)}</div></nav></header>)}
