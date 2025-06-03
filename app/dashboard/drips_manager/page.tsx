"use client"
import React, { useState } from 'react';
import { DripsTable } from '../../../components/table/DripsTable';
import { Upload } from 'lucide-react';
import { useRouter } from "next/navigation";

interface Drip {
  id: string;
  title: string;
  price: number;
  size: string;
  uploadDate: string;
  selected: boolean;
}

const DripManager = () => {
  const router = useRouter();

  const [drips, setDrips] = useState<Drip[]>([
    {
      id: '241',
      title: 'Summer Sweat',
      price: 34,
      size: 'M',
      uploadDate: '2024-06-01',
      selected: false
    },
    {
      id: '844',
      title: 'Velvet Pulse',
      price: 29,
      size: 'XL',
      uploadDate: '2024-05-25',
      selected: false
    },
    {
      id: '258',
      title: 'Sunset Mirage',
      price: 45,
      size: 'L',
      uploadDate: '2024-05-21',
      selected: false
    },
    {
      id: '369',
      title: 'Glass Waves',
      price: 38,
      size: 'XS',
      uploadDate: '2024-05-19',
      selected: false
    },
    {
      id: '987',
      title: 'Midnight Dreams',
      price: 34,
      size: 'XXL',
      uploadDate: '2024-06-01',
      selected: false
    },
    {
      id: '785',
      title: 'Velvet Pulse',
      price: 29,
      size: 'L',
      uploadDate: '2024-05-25',
      selected: false
    },
    {
      id: '987',
      title: 'Sunset Mirage',
      price: 45,
      size: 'M',
      uploadDate: '2024-05-21',
      selected: false
    },
    {
      id: '332',
      title: 'Glass Waves',
      price: 38,
      size: 'XXS',
      uploadDate: '2024-05-19',
      selected: false
    }
  ]);

  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAllDrips = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setDrips(drips.map(drip => ({ ...drip, selected: newSelectAll })));
  };

  const handleSelectDrip = (id: string) => {
    setDrips(drips.map(drip => 
      drip.id === id ? { ...drip, selected: !drip.selected } : drip
    ));
  };

  const handleDeleteDrip = (id: string) => {
    setDrips(drips.filter(drip => drip.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-900 flex">
      <div className="flex-1 flex flex-col">
        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Button aligned right */}
          <div className="flex justify-end mb-4">
            <button onClick={() => router.push("/dashboard/drips_manager/add_drips")} className="bg-gradient-to-r w-40 from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-4 rounded-lg flex items-center gap-2 transition-all duration-200 transform hover:scale-105">
              <Upload size={24} />
              Upload
            </button>
          </div>

          {/* Drips Table */}
          <DripsTable 
            drips={drips}
            selectAll={selectAll}
            onSelectAll={handleSelectAllDrips}
            onSelectDrip={handleSelectDrip}
            onDeleteDrip={handleDeleteDrip}
          />
        </div>
      </div>
    </div>
  );
};

export default DripManager;