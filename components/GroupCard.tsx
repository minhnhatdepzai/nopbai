import React from 'react';
import { Eye, Users } from 'lucide-react';
import { GroupData } from '../types';

interface GroupCardProps {
  group: GroupData;
  onView: (group: GroupData) => void;
}

export const GroupCard: React.FC<GroupCardProps> = ({ group, onView }) => {
  return (
    <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full transform hover:-translate-y-1">
      {/* Image Header */}
      <div className="h-40 overflow-hidden relative">
        <div className={`absolute inset-0 opacity-20 ${group.color} mix-blend-multiply z-10`}></div>
        <img 
          src={group.imageUrl} 
          alt={group.name} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700 shadow-sm z-20 flex items-center gap-1">
          <Users className="w-3 h-3" />
          {group.members} thành viên
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-gray-800 mb-1">{group.name}</h3>
          <p className={`text-sm font-semibold uppercase tracking-wider ${group.color.replace('bg-', 'text-')}`}>
            {group.topic}
          </p>
        </div>
        
        <p className="text-gray-500 text-sm mb-6 line-clamp-3 flex-grow">
          {group.description}
        </p>

        {/* Action Button */}
        <button
          onClick={() => onView(group)}
          className="w-full py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-medium transition-all duration-300 bg-gray-900 text-white hover:bg-gray-800 shadow-lg hover:shadow-gray-900/20 active:scale-95"
        >
          <Eye className="w-5 h-5" />
          <span>Xem tài liệu</span>
        </button>
      </div>
    </div>
  );
};