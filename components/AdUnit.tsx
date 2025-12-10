import React from 'react';

interface Props {
  position: 'top' | 'bottom';
}

export const AdUnit: React.FC<Props> = ({ position }) => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="w-full bg-slate-100 border border-slate-200 rounded-lg p-4 flex flex-col items-center justify-center min-h-[100px] text-center">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
          Publicidade
        </span>
        {/* 
           This is where the Google Adsense script would typically be placed.
           Example: <ins class="adsbygoogle" ... ></ins> 
        */}
        <div className="text-slate-300 text-sm">
           Google Ads Slot ({position})
        </div>
      </div>
    </div>
  );
};