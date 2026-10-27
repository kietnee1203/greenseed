import {useState,useEffect} from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CustomerView from './pages/CustomerView'
import SellerDashboard from './pages/SellerDashboard'
import Contact from './pages/Contact';
import VendorDashboard from './pages/VendorDashboard';
import AdminDashboard from './pages/AdminDashboard'
import CartDrawer from './components/CartDrawer'
import BlogManager from './components/BlogManager'
import {PRODUCTS,POSTS,USERS,SETTINGS} from './data/mockData'
function useLS(k,i){const [v,s]=useState(()=>{try{return JSON.parse(localStorage.getItem(k))??i}catch{return i}})
useEffect(()=>{localStorage.setItem(k,JSON.stringify(v))},[k,v]);return [v,s]}
export default function App(){
const [role,setRole]=useLS('gs_role','Customer'),[products,setProducts]=useLS('gs_products4',PRODUCTS),[posts,setPosts]=useLS('gs_posts3',POSTS),[users,setUsers]=useLS('gs_users',USERS)
const [orders,setOrders]=useLS('gs_orders',[]),[cart,setCart]=useLS('gs_cart',[]),[settings,setSettings]=useLS('gs_settings',SETTINGS)
const [q,setQ]=useState(''),[tab,setTab]=useState(()=>typeof location!=='undefined'&&location.hash.includes('care=')?'care':'shop'),[view,setView]=useState('dash'),[drawer,setDrawer]=useState(false)
const c={products,setProducts,posts,setPosts,users,setUsers,orders,setOrders,cart,setCart,settings,setSettings,q,tab,setTab,setDrawer}
const menu=role==='Customer'?[['shop','Cửa hàng'],['scan','Quét bệnh AI'],['geo','Bản đồ thổ nhưỡng'],['garden','Setup vườn AI'],['blog','Blog']]:[['dash','Bảng điều khiển'],['blog','Quản lý Blog'],['contact','Liên hệ'],['vendor','Kênh người bán']]
const onMenu=k=>role==='Customer'?setTab(k):setView(k)
return(<div className="min-h-screen flex flex-col"><Navbar settings={settings} q={q} setQ={setQ} cartCount={cart.reduce((s,i)=>s+i.qty,0)} role={role} setRole={r=>{setRole(r);setView('dash')}} menu={menu} onMenu={onMenu} goShop={()=>setTab('shop')} goCart={()=>setDrawer(true)}/>
<main className="flex-1">{role==='Customer'?<CustomerView c={c}/>:view==='blog'?<BlogManager c={c}/>:view==='contact'?<Contact/>:role==='Seller'?<SellerDashboard c={c}/>:view==='vendor'?<VendorDashboard c={c}/>:<AdminDashboard c={c}/>}</main>{role==='Customer'&&<CartDrawer open={drawer} onClose={()=>setDrawer(false)} cart={cart} setCart={setCart} products={products} onCheckout={()=>{setDrawer(false);setTab('cart')}}/>}<Footer settings={settings}/></div>)}
