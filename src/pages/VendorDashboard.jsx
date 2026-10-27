import React, { useState } from 'react';
import { vnd } from '../data/mockData';

export default function VendorDashboard({ c }) {
  const { products, setProducts, orders } = c;
  
  // State quản lý form sản phẩm
  const [formData, setFormData] = useState({ name: '', price: '', stock: '', cat: 'Rau củ' });
  const [editingId, setEditingId] = useState(null);

  // State quản lý Voucher shop
  const [vouchers, setVouchers] = useState([
    { id: 1, code: 'GREEN10', discount: '10%', minOrder: 100000 },
    { id: 2, code: 'FREESHIP', discount: '15k', minOrder: 50000 }
  ]);
  const [newVoucher, setNewVoucher] = useState({ code: '', discount: '', minOrder: '' });

  // 1. Thêm hoặc Sửa sản phẩm
  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.stock) {
      alert('Vui lòng điền đầy đủ thông tin sản phẩm!');
      return;
    }

    if (editingId) {
      setProducts(products.map(p => p.id === editingId ? { ...p, ...formData, price: Number(formData.price), stock: Number(formData.stock) } : p));
      setEditingId(null);
    } else {
      const newProduct = {
        id: Date.now(),
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        diff: 'Dễ',
        season: 'Quanh năm',
        emoji: '🌱'
      };
      setProducts([newProduct, ...products]);
    }
    setFormData({ name: '', price: '', stock: '', cat: 'Rau củ' });
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setFormData({ name: product.name, price: product.price, stock: product.stock, cat: product.cat });
  };

  const handleDelete = (id) => {
    if (confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  // 2. Tạo Voucher shop
  const handleCreateVoucher = (e) => {
    e.preventDefault();
    if (!newVoucher.code || !newVoucher.discount) {
      alert('Vui lòng nhập mã và mức giảm giá của voucher!');
      return;
    }
    setVouchers([...vouchers, { id: Date.now(), ...newVoucher, minOrder: Number(newVoucher.minOrder) || 0 }]);
    setNewVoucher({ code: '', discount: '', minOrder: '' });
  };

  const handleDeleteVoucher = (id) => {
    setVouchers(vouchers.filter(v => v.id !== id));
  };

  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const lowStockProducts = products.filter(p => p.stock <= 10);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Tiêu đề & Tổng quan */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-4 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-emerald-800">Kênh Quản Trị Người Bán (Vendor Dashboard)</h1>
          <p className="text-gray-600 text-sm">Đăng sản phẩm, quản lý tồn kho, in vận đơn và tạo voucher ưu đãi.</p>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-xl text-emerald-800 font-semibold text-sm">
          💰 Tổng doanh thu: {vnd(totalRevenue)}
        </div>
      </div>

      {/* Cảnh báo tồn kho */}
      {lowStockProducts.length > 0 && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl text-amber-800 text-sm flex items-center justify-between">
          <span>⚠️ <strong>Cảnh báo tồn kho:</strong> Có {lowStockProducts.length} sản phẩm sắp hết hàng (dưới hoặc bằng 10).</span>
        </div>
      )}

      {/* Grid: Đăng/Sửa sản phẩm & Quản lý tồn kho */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-emerald-100 space-y-4 md:col-span-1">
          <h2 className="text-lg font-semibold text-emerald-700">
            {editingId ? '✏️ Cập nhật sản phẩm' : '➕ Đăng sản phẩm mới'}
          </h2>
          <form onSubmit={handleSaveProduct} className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Tên sản phẩm</label>
              <input 
                type="text" 
                value={formData.name} 
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ví dụ: Hạt giống cải ngọt..." 
                className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Giá bán (VNĐ)</label>
              <input 
                type="number" 
                value={formData.price} 
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="Ví dụ: 25000" 
                className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Số lượng tồn kho</label>
              <input 
                type="number" 
                value={formData.stock} 
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                placeholder="Ví dụ: 50" 
                className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Danh mục</label>
              <select 
                value={formData.cat} 
                onChange={(e) => setFormData({ ...formData, cat: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Rau củ">Rau củ</option>
                <option value="Cây ăn trái">Cây ăn trái</option>
                <option value="Hoa">Hoa</option>
                <option value="Thảo mộc">Thảo mộc</option>
              </select>
            </div>
            <div className="flex gap-2 pt-2">
              <button 
                type="submit" 
                className="flex-1 bg-emerald-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition"
              >
                {editingId ? 'Lưu thay đổi' : 'Đăng sản phẩm'}
              </button>
              {editingId && (
                <button 
                  type="button" 
                  onClick={() => { setEditingId(null); setFormData({ name: '', price: '', stock: '', cat: 'Rau củ' }); }}
                  className="bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm hover:bg-gray-300 transition"
                >
                  Hủy
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Danh sách & Quản lý tồn kho */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-emerald-100 md:col-span-2 space-y-4 overflow-x-auto">
          <h2 className="text-lg font-semibold text-emerald-700">📦 Quản lý sản phẩm & Tồn kho</h2>
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b text-gray-500 bg-gray-50">
                <th className="p-2">Sản phẩm</th>
                <th className="p-2">Danh mục</th>
                <th className="p-2">Giá</th>
                <th className="p-2">Tồn kho</th>
                <th className="p-2 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b hover:bg-emerald-50/40 transition">
                  <td className="p-2 font-semibold text-emerald-900 flex items-center gap-2">
                    <span className="text-base">{p.emoji || '🌱'}</span> 
                    <span className="text-gray-900">{p.name}</span>
                  </td>
                  <td className="p-2 text-gray-600">{p.cat}</td>
                  <td className="p-2 text-emerald-600 font-semibold">{vnd(p.price)}</td>
                  <td className="p-2">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${p.stock <= 10 ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-700'}`}>
                      {p.stock} còn lại
                    </span>
                  </td>
                  <td className="p-2 text-right space-x-2">
                    <button onClick={() => handleEdit(p)} className="px-2.5 py-1 bg-amber-100 text-amber-700 rounded text-xs font-medium hover:bg-amber-200">Sửa</button>
                    <button onClick={() => handleDelete(p.id)} className="px-2.5 py-1 bg-red-100 text-red-600 rounded text-xs font-medium hover:bg-red-200">Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Grid: Tạo Voucher Shop & In vận đơn */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-emerald-100 space-y-4 md:col-span-1">
          <h2 className="text-lg font-semibold text-emerald-700">🎟️ Tạo Voucher Shop</h2>
          <form onSubmit={handleCreateVoucher} className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Mã Voucher</label>
              <input 
                type="text" 
                value={newVoucher.code} 
                onChange={(e) => setNewVoucher({ ...newVoucher, code: e.target.value.toUpperCase() })}
                placeholder="VD: SALE20K" 
                className="w-full px-3 py-2 border rounded-lg text-sm uppercase focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Mức giảm giá</label>
              <input 
                type="text" 
                value={newVoucher.discount} 
                onChange={(e) => setNewVoucher({ ...newVoucher, discount: e.target.value })}
                placeholder="VD: 10% hoặc 20k" 
                className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Đơn tối thiểu (VNĐ)</label>
              <input 
                type="number" 
                value={newVoucher.minOrder} 
                onChange={(e) => setNewVoucher({ ...newVoucher, minOrder: e.target.value })}
                placeholder="VD: 50000" 
                className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <button type="submit" className="w-full bg-emerald-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition">
              Thêm mã giảm giá
            </button>
          </form>

          <div className="mt-4 space-y-2">
            <p className="text-xs font-semibold text-gray-500">Mã đang hoạt động:</p>
            {vouchers.map(v => (
              <div key={v.id} className="flex items-center justify-between bg-emerald-50/60 p-2 rounded-lg text-xs border border-emerald-100">
                <div>
                  <span className="font-bold text-emerald-800">{v.code}</span> ({v.discount})
                  <p className="text-gray-500">Đơn tối thiểu: {vnd(v.minOrder)}</p>
                </div>
                <button onClick={() => handleDeleteVoucher(v.id)} className="text-red-500 hover:text-red-700 font-semibold px-2 py-1">✕</button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-emerald-100 md:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold text-emerald-700">📋 Quản lý đơn hàng & In vận đơn</h2>
          {orders.length === 0 ? (
            <p className="text-gray-500 text-sm py-4 text-center">Chưa có đơn hàng nào được đặt.</p>
          ) : (
            <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
              {orders.map((order, idx) => (
                <div key={order.id || idx} className="flex flex-col md:flex-row items-start md:items-center justify-between p-3 border rounded-xl bg-gray-50/50 gap-3">
                  <div className="space-y-1">
                    <p className="font-semibold text-sm text-emerald-900">Mã đơn: #{order.id || idx + 1}</p>
                    <p className="text-xs text-gray-600">Khách hàng: {order.customerName || 'Khách lẻ'} | Tổng tiền: <span className="text-emerald-600 font-bold">{vnd(order.total)}</span></p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                      {order.status || 'Chờ xử lý'}
                    </span>
                    <button onClick={() => window.print()} className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-medium hover:bg-emerald-700 transition flex items-center gap-1">
                      🖨️ In vận đơn
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}