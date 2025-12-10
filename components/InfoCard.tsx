import React from 'react';
import { LucideIcon } from 'lucide-react';

interface Props {
  title: string;
  content: string;
  icon: LucideIcon;
  colorClass: string;
}

export const InfoCard: React.FC<Props> = ({ title, content, icon: Icon, colorClass }) => {
  // Simple markdown-to-html conversion for lists
  const formatContent = (text: string) => {
    return text.split('\n').map((line, i) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        return <li key={i} className="ml-4 mb-1">{trimmed.substring(2)}</li>;
      }
      return <p key={i} className="mb-2 last:mb-0 leading-relaxed">{trimmed}</p>;
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className={`px-6 py-4 border-b border-slate-50 flex items-center space-x-3 ${colorClass} bg-opacity-10`}>
        <div className={`p-2 rounded-lg ${colorClass} text-white`}>
          <Icon size={20} />
        </div>
        <h3 className="font-bold text-lg text-slate-800">{title}</h3>
      </div>
      <div className="p-6 text-slate-600">
        {formatContent(content)}
      </div>
    </div>
  );
};