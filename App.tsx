import React, { useState } from 'react';
import { BookOpen, ShieldCheck, DownloadCloud } from 'lucide-react';
import { GROUPS } from './constants';
import { GroupCard } from './components/GroupCard';
import { DocumentViewer } from './components/DocumentViewer';
import { GroupData } from './types';

const App: React.FC = () => {
  const [activeGroup, setActiveGroup] = useState<GroupData | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const handleViewGroup = (group: GroupData) => {
    setActiveGroup(group);
    // Delay setting isViewerOpen to ensure the component mounts in the DOM 
    // (with translate-x-full) before switching to translate-x-0 to trigger the transition.
    setTimeout(() => {
      setIsViewerOpen(true);
    }, 50);
  };

  const handleBack = () => {
    setIsViewerOpen(false);
    // Wait for the transition to finish (500ms) before removing the data/unmounting
    setTimeout(() => {
      setActiveGroup(null);
    }, 500);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gray-50">
      
      {/* Main Content Layer */}
      <div 
        aria-hidden={isViewerOpen}
        className={`absolute inset-0 w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 overflow-y-auto transition-all duration-500 ease-in-out transform ${
          isViewerOpen ? 'scale-95 opacity-0 pointer-events-none' : 'scale-100 opacity-100'
        }`}
      >
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg shadow-lg shadow-blue-600/20">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 leading-none">MD20302</h1>
                <span className="text-xs font-medium text-gray-500 tracking-wide">QUẢN TRỊ DỰ ÁN</span>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                <span>Bảo mật</span>
              </div>
              <div className="flex items-center gap-2">
                <DownloadCloud className="w-4 h-4 text-blue-500" />
                <span>Tốc độ cao</span>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* Hero Section */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-xs font-bold tracking-wider mb-4 border border-blue-100">
              HỌC KỲ SPRING 2026
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
              Bài Báo Cáo Các Nhóm
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Truy cập và xem trực tuyến tài liệu báo cáo của 4 nhóm nghiên cứu. 
              Hệ thống hỗ trợ xem PDF và đánh giá trực tiếp.
            </p>
          </div>

          {/* Groups Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12">
            {GROUPS.map((group) => (
              <GroupCard 
                key={group.id} 
                group={group} 
                onView={handleViewGroup}
              />
            ))}
          </div>

        </main>
      </div>

      {/* Document Viewer Layer - Slide In Animation */}
      <div 
        aria-hidden={!isViewerOpen}
        className={`fixed inset-0 z-50 w-full h-full bg-white transition-transform duration-500 ease-in-out transform shadow-2xl overflow-y-auto ${
          isViewerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {activeGroup && (
          <DocumentViewer 
            group={activeGroup} 
            onBack={handleBack} 
          />
        )}
      </div>
    </div>
  );
};

export default App;