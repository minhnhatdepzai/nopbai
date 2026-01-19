import React, { useState } from 'react';
import { ArrowLeft, Star, Send, CheckCircle2, Download, Users, Loader2, Mail } from 'lucide-react';
import { GroupData } from '../types';

interface DocumentViewerProps {
  group: GroupData;
  onBack: () => void;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({ group, onBack }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate sending email to the specific group address
    // In a real backend, we would use the App Password (mwwvcfvubbzckncw) here via SMTP
    setTimeout(() => {
      console.log(`[Mock System] Sending email to: ${group.email}`);
      console.log(`[Mock System] Subject: Đánh giá dự án ${group.name}`);
      console.log(`[Mock System] Content: Rating ${rating}/5, Comment: ${comment}`);
      
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const handleDownload = () => {
    // Create a readable text file content instead of a fake PDF
    const content = `BÁO CÁO DỰ ÁN - MD20302\n-----------------------\n\nTên Nhóm: ${group.name}\nChủ đề: ${group.topic}\nThành viên: ${group.members}\nEmail liên hệ: ${group.email}\n\nMô tả dự án:\n${group.description}\n\n-----------------------\nĐây là tài liệu tóm tắt dự án phục vụ cho việc đánh giá.\nHọc kỳ Spring 2026.`;
    
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `BaoCao_${group.name.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleOpenMailClient = () => {
    const subject = encodeURIComponent(`Đánh giá dự án: ${group.name}`);
    const body = encodeURIComponent(`Chào nhóm ${group.name},\n\nTôi đã xem tài liệu dự án "${group.topic}" và có đánh giá như sau:\n\nĐiểm: ${rating}/5\nNhận xét: ${comment}\n\nTrân trọng.`);
    window.location.href = `mailto:${group.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header - Minimal Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 px-4 h-16 flex items-center justify-between shadow-sm">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Quay lại</span>
        </button>

        <button 
          onClick={handleDownload}
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium shadow-sm"
        >
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">Tải tài liệu gốc</span>
        </button>
      </div>

      {/* Main Content - Centered Evaluation Form */}
      <main className="flex-grow container mx-auto px-4 py-8 pb-24 flex justify-center items-start">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          
          {/* Project Info Header */}
          <div className={`p-8 text-center bg-gradient-to-b from-gray-50 to-white border-b border-gray-100`}>
            <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 text-blue-600 mb-4 shadow-sm">
              <Users className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{group.name}</h1>
            <p className="text-lg font-medium text-blue-600 uppercase tracking-wide">{group.topic}</p>
            <div className="mt-2 text-sm text-gray-500 flex items-center justify-center gap-1">
               <Mail className="w-3 h-3" />
               <span>{group.email}</span>
            </div>
          </div>

          {/* Evaluation Section */}
          <div className="p-8 md:p-10">
            {isSubmitted ? (
              <div className="text-center py-8 animate-fade-in">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-3">Đánh giá thành công!</h4>
                <p className="text-gray-500 text-lg mb-6">
                  Hệ thống đã ghi nhận và gửi thông báo đến<br/>
                  <span className="font-semibold text-blue-600">{group.email}</span>
                </p>
                
                <div className="flex flex-col gap-3 justify-center items-center">
                  <button 
                    onClick={handleOpenMailClient}
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-50"
                  >
                    <Mail className="w-4 h-4" />
                    Mở trong ứng dụng Email của bạn
                  </button>
                  
                  <button 
                    onClick={() => {
                      setIsSubmitted(false);
                      setRating(0);
                      setComment('');
                    }}
                    className="mt-4 px-6 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Gửi đánh giá khác
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Bạn đánh giá dự án này thế nào?</h3>
                  <div className="flex justify-center gap-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className={`p-2 transition-all duration-200 transform hover:scale-110 ${
                          rating >= star ? 'text-yellow-400' : 'text-gray-200 hover:text-gray-300'
                        }`}
                      >
                        <Star className={`w-10 h-10 ${rating >= star ? 'fill-current' : ''}`} />
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-gray-400 mt-2 font-medium">
                    {rating === 0 ? 'Chạm để đánh giá' : `${rating} sao`}
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl">
                  <label className="block text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider text-xs">Tiêu chí đạt được</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {['Nội dung đầy đủ', 'Trình bày đẹp mắt', 'Ý tưởng sáng tạo', 'Tính khả thi cao'].map((criteria) => (
                      <label key={criteria} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 cursor-pointer hover:border-blue-300 transition-colors shadow-sm">
                        <input type="checkbox" className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300" />
                        <span className="text-gray-700 font-medium">{criteria}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider text-xs">Nhận xét chi tiết</label>
                  <textarea
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                    placeholder="Hãy chia sẻ suy nghĩ của bạn về dự án này..."
                    className="w-full rounded-xl border-gray-300 border p-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none bg-white shadow-sm text-gray-700 placeholder-gray-400"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={rating === 0 || isSubmitting}
                  className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-gray-900/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Đang gửi báo cáo...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Gửi Đánh Giá
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};