import React from 'react';

function NotFound() {
  return (
    <main className="grow">
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6">
          <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
            404 Not Found
          </h1>

          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Halaman yang kamu cari tidak tersedia.
          </p>
        </div>

      </div>
    </main>
  );
}

export default NotFound;