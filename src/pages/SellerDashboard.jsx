import {useState} from 'react'
import {vnd,STATUSES} from '../data/mockData'
const E={name:'',price:0,stock:0,cat:'Rau củ',days:30,emoji:'🌱'}
export default function SellerDashboard({c}){
const {products,setProducts,orders,setOrders}=c
const [f,setF]=useState(null)
const save=()=>{if(!f.name)return alert('Vui lòng nhập tên sản phẩm.')
const d={...f,price:+f.price,stock:+f.stock,days:+f.days}
setProducts(f.id?products.map(p=>p.id===f.id?{...p,...d}:p):[...products,{diff:'Dễ',season:'Quanh năm',germ:85,ph:'6.0-7.0',temp:'20-30°C',light:'Nắng đầy đủ',...d,id:Date.now()}]);setF(null)}
const rev=orders.reduce((s,o)=>s+o.total,0),low=products.filter(p=>p.stock<=10)
const set=k=>e=>setF({...f,[k]:e.target.value})
return(<div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
<div className="grid grid-cols-2 md:grid-cols-4 gap-3">{[['Doanh số',vnd(rev)],['Đơn hàng',orders.length],['Sản phẩm',products.length],['Sắp hết kho',low.length]].map(([a,b])=><div key={a} className="card"><p className="text-sm">{a}</p><p className="text-xl font-bold text-lime-400">{b}</p></div>)}</div>
{low.length>0&&<p className="bg-emerald-800 p-3 rounded-lg text-sm">Sắp hết hàng: {low.map(p=>`${p.name} (${p.stock})`).join(', ')}</p>}
<section className="card"><div className="flex justify-between mb-3"><h3 className="font-bold">Quản lý sản phẩm</h3><button className="btn" onClick={()=>setF(E)}>Thêm sản phẩm</button></div>
<div className="overflow-x-auto"><table className="w-full text-sm"><tbody>{products.map(p=><tr key={p.id} className="border-t border-emerald-900/60"><td className="py-2">{p.emoji} {p.name}</td><td>{p.cat}</td><td>{vnd(p.price)}</td><td>Kho: {p.stock}</td>
<td className="text-right"><button className="btn2 mr-1" onClick={()=>setF(p)}>Sửa</button><button className="text-red-400" onClick={()=>confirm('Xóa sản phẩm này?')&&setProducts(products.filter(x=>x.id!==p.id))}>Xóa</button></td></tr>)}</tbody></table></div></section>
{f&&<section className="card grid md:grid-cols-3 gap-2"><h3 className="font-bold md:col-span-3">{f.id?'Sửa':'Thêm'} sản phẩm</h3>
<input className="inp" placeholder="Tên" value={f.name} onChange={set('name')}/><input className="inp" type="number" placeholder="Giá" value={f.price} onChange={set('price')}/><input className="inp" type="number" placeholder="Tồn kho" value={f.stock} onChange={set('stock')}/>
<select className="inp" value={f.cat} onChange={set('cat')}>{['Rau củ','Cây ăn trái','Hoa','Hạt giống hữu cơ'].map(x=><option key={x}>{x}</option>)}</select><input className="inp" type="number" placeholder="Ngày thu hoạch" value={f.days} onChange={set('days')}/><input className="inp" placeholder="Ảnh demo (emoji)" value={f.emoji} onChange={set('emoji')}/>
<div className="flex gap-2"><button className="btn" onClick={save}>Lưu</button><button className="btn2" onClick={()=>setF(null)}>Hủy</button></div></section>}
<section className="card"><h3 className="font-bold mb-3">Đơn hàng</h3>{!orders.length&&<p className="text-sm">Chưa có đơn hàng. Hãy đặt thử ở giao diện Khách hàng.</p>}
{orders.map(o=><div key={o.id} className="flex flex-wrap items-center justify-between gap-2 border-t border-emerald-900/60 py-2 text-sm"><span><b>{o.id}</b> • {o.customer} • {o.items.map(i=>`${i.name} x${i.qty}`).join(', ')}</span><span className="text-lime-400 font-bold">{vnd(o.total)}</span>
<select className="inp w-auto" value={o.status} onChange={e=>setOrders(orders.map(x=>x.id===o.id?{...x,status:e.target.value}:x))}>{STATUSES.map(s=><option key={s}>{s}</option>)}</select></div>)}</section></div>)}
