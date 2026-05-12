import React from 'react';
import FilterButton from '../components/extract/DropdownFilter';
import Datepicker from '../components/extract/Datepicker';
import DashboardCard10 from '../partials/dashboard/DashboardCard10';
import DashboardCard12 from '../partials/dashboard/DashboardCard12';
import DashboardCard13 from '../partials/dashboard/DashboardCard13';

export default function Dashboard() {
  return (
    <>
      {/* Dashboard Actions */}
      <div className="sm:flex sm:justify-end sm:items-center mb-8">
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          {/* Filter button */}
          <FilterButton align="right" />
          {/* Datepicker built with flatpickr */}
          <Datepicker align="right" />
          {/* Add board button */}
          <button className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white">
            <svg className="fill-current shrink-0 xs:hidden" width="16" height="16" viewBox="0 0 16 16">
              <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
            </svg>
            <span className="max-xs:sr-only">Tambah Data</span>
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* 1. Total Produksi */}
        <div className="col-span-full sm:col-span-6 xl:col-span-3 bg-white dark:bg-gray-800 shadow-sm rounded-xl p-5 border border-gray-100 dark:border-gray-700">
          <h2 className="text-sm font-semibold text-gray-400 uppercase mb-2">Total Produksi Hari Ini</h2>
          <div className="flex items-center">
            <div className="text-3xl font-bold text-gray-800 dark:text-gray-100">1.250</div>
          </div>
          <div className="text-sm text-gray-500 mt-1">Porsi makanan</div>
        </div>

        {/* 2. Stok Bahan */}
        <div className="col-span-full sm:col-span-6 xl:col-span-3 bg-white dark:bg-gray-800 shadow-sm rounded-xl p-5 border border-gray-100 dark:border-gray-700">
          <h2 className="text-sm font-semibold text-gray-400 uppercase mb-2">Stok Bahan Tersedia</h2>
          <div className="flex items-center">
            <div className="text-3xl font-bold text-gray-800 dark:text-gray-100">38</div>
          </div>
          <div className="text-sm text-gray-500 mt-1">Jenis bahan baku</div>
        </div>

        {/* 3. Pegawai Hadir */}
        <div className="col-span-full sm:col-span-6 xl:col-span-3 bg-white dark:bg-gray-800 shadow-sm rounded-xl p-5 border border-gray-100 dark:border-gray-700">
          <h2 className="text-sm font-semibold text-gray-400 uppercase mb-2">Pegawai Hadir</h2>
          <div className="flex items-center">
            <div className="text-3xl font-bold text-gray-800 dark:text-gray-100">12</div>
            <div className="text-sm font-medium text-green-500 ml-2">/ 15</div>
          </div>
          <div className="text-sm text-gray-500 mt-1">Shift pagi</div>
        </div>

        {/* 4. Laporan */}
        <div className="col-span-full sm:col-span-6 xl:col-span-3 bg-white dark:bg-gray-800 shadow-sm rounded-xl p-5 border border-gray-100 dark:border-gray-700">
          <h2 className="text-sm font-semibold text-gray-400 uppercase mb-2">Laporan Bulan Ini</h2>
          <div className="flex items-center">
            <div className="text-3xl font-bold text-gray-800 dark:text-gray-100">24</div>
          </div>
          <div className="text-sm text-gray-500 mt-1">Dokumen terverifikasi</div>
        </div>

        {/* Bar Chart, Recent Activity, dll */}
        <DashboardCard10 />
        <DashboardCard12 />
        <DashboardCard13 />
        
      </div>
    </>
  );
}