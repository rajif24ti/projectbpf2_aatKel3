import React from 'react';

function PageHeader({
  title,
  description,
  badge = 'MBG',
  sidebarOpen,
  setSidebarOpen,
}) {
  return (
    <div className="sticky top-0 z-30 px-4 sm:px-6 lg:px-8 py-4 bg-gray-100/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700/60">
      <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700/60 p-6">

        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 via-transparent to-emerald-500/10"></div>
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-violet-500/20 rounded-full blur-2xl"></div>
        <div className="absolute right-20 -bottom-12 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl"></div>

        <div className="relative flex items-center justify-between gap-6">

          <div className="flex items-start gap-4">

            <button
              className="mt-1 text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 lg:hidden"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={(e) => {
                e.stopPropagation();
                setSidebarOpen(!sidebarOpen);
              }}
            >
              <span className="sr-only">Open sidebar</span>
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <rect x="4" y="5" width="16" height="2" />
                <rect x="4" y="11" width="16" height="2" />
                <rect x="4" y="17" width="16" height="2" />
              </svg>
            </button>

            <div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-violet-100 text-violet-600 dark:bg-violet-500/20 dark:text-violet-300 mb-4">
                {badge}
              </span>

              <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
                {title}
              </h1>

              <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-3xl">
                {description}
              </p>
            </div>

          </div>

          <div className="hidden md:flex w-14 h-14 rounded-2xl bg-violet-500 text-white items-center justify-center shadow-sm">
            <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
              <path d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z" />
            </svg>
          </div>

        </div>

      </div>
    </div>
  );
}

export default PageHeader;