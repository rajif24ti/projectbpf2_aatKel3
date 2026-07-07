import React from 'react';

function PageHeader({
  title,
  description,
  badge = 'MBG',
  sidebarOpen,
  setSidebarOpen,
}) {
  const now = new Date();
  const dateStr = now.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="sticky top-0 z-30 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/60 dark:border-gray-700/30 px-4 sm:px-6 lg:px-8 py-3">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Hamburger + Title */}
        <div className="flex items-center gap-4 min-w-0">
          <button
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-xl text-gray-500 hover:text-gray-800 hover:bg-gray-200/60 dark:hover:bg-gray-700/60 dark:hover:text-gray-200 transition-all duration-150"
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
          >
            <span className="sr-only">Open sidebar</span>
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <rect x="4" y="5" width="16" height="2" rx="1"/>
              <rect x="4" y="11" width="10" height="2" rx="1"/>
              <rect x="4" y="17" width="13" height="2" rx="1"/>
            </svg>
          </button>

          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-violet-100 text-violet-600 dark:bg-violet-500/20 dark:text-violet-300 uppercase tracking-wider">
                {badge}
              </span>
              <span className="hidden sm:block text-xs text-gray-400 dark:text-gray-500">
                {dateStr}
              </span>
            </div>
            <h1 className="text-base font-semibold text-gray-800 dark:text-gray-100 truncate tracking-tight">
              {title}
            </h1>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Notification bell */}
          <button className="relative w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 text-gray-500 hover:text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-500/10 dark:hover:text-violet-400 transition-all duration-150 flex items-center justify-center">
            <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
            </svg>
            {/* Notification dot */}
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-800"/>
          </button>

          {/* Avatar */}
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-sm shadow-violet-500/25 cursor-pointer hover:shadow-violet-500/40 hover:scale-105 transition-all duration-150">
            <svg className="w-4.5 h-4.5 fill-white" viewBox="0 0 24 24">
              <path d="M12 12a4 4 0 100-8 4 4 0 000 8zm0 2c-4.42 0-8 1.79-8 4v1h16v-1c0-2.21-3.58-4-8-4z"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageHeader;