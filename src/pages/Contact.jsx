import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }
    setSubmitted(true);
    // Sau khi gửi có thể reset form hoặc xử lý logic gửi ở đây
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Tiêu đề trang */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-emerald-800">Liên hệ với GreenSeed</h1>
        <p className="text-gray-600 text-sm">Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn về các sản phẩm mầm xanh.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow-md border border-emerald-100">
        
        {/* Cột 1: Thông tin liên hệ */}
        <div className="space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-emerald-700 border-b pb-2">Thông tin liên lạc</h2>
            
            <div className="flex items-start space-x-3 text-gray-700">
              <span className="text-xl">📍</span>
              <div>
                <p className="font-medium">Địa chỉ:</p>
                <p className="text-sm text-gray-500">227 Nguyễn Văn Cừ, Quận 5, TP. Hồ Chí Minh</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 text-gray-700">
              <span className="text-xl">📞</span>
              <div>
                <p className="font-medium">Hotline / Zalo:</p>
                <p className="text-sm text-gray-500">0123 456 789</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 text-gray-700">
              <span className="text-xl">✉️</span>
              <div>
                <p className="font-medium">Email hỗ trợ:</p>
                <p className="text-sm text-gray-500">support@greenseed.vn</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 text-gray-700">
              <span className="text-xl">⏰</span>
              <div>
                <p className="font-medium">Giờ làm việc:</p>
                <p className="text-sm text-gray-500">Thứ Hai - Chủ Nhật: 8:00 - 21:00</p>
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 p-4 rounded-lg text-xs text-emerald-800">
            💡 Mẹo: Bạn cũng có thể nhắn trực tiếp qua Zalo hoặc Hotline để được hỗ trợ nhanh nhất trong giờ hành chính.
          </div>
        </div>

        {/* Cột 2: Form gửi tin nhắn nhanh */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-emerald-700 border-b pb-2">Gửi tin nhắn cho chúng tôi</h2>
          
          {submitted ? (
            <div className="bg-emerald-100 text-emerald-800 p-6 rounded-lg text-center space-y-3">
              <p className="font-bold text-lg">Cảm ơn bạn đã liên hệ! 🎉</p>
              <p className="text-sm">Chúng tôi đã nhận được thông tin và sẽ phản hồi cho bạn trong thời gian sớm nhất.</p>
              <button 
                onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', message: '' }); }}
                className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition"
              >
                Gửi tin nhắn khác
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nhập tên của bạn..." 
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email của bạn</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="nhapemail@gmail.com..." 
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nội dung cần hỗ trợ</label>
                <textarea 
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Nhập nội dung tin nhắn hoặc thắc mắc của bạn..." 
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm resize-none"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full py-2.5 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition shadow-sm text-sm"
              >
                Gửi thông tin
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}