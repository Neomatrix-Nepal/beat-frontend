"use client"
import React, { useState } from 'react';

import { BeatsTable } from '../../../components/BeatsTable';
import { Upload } from 'lucide-react';
import { useRouter } from "next/navigation";
interface Beat {
  id: string;
  title: string;
  genre: string;
  price: number;
  producer: string;
  uploadDate: string;
  selected: boolean;
}

const DripManager = () => {
  const router = useRouter();

  const [beats, setBeats] = useState<Beat[]>([
    {
      id: '1',
      title: 'Midnight Dreams',
      genre: 'Trap',
      price: 34,
      producer: 'Suraj Raj',
      uploadDate: '2024-06-01',
      selected: false
    },
    {
      id: '2',
      title: 'Velvet Pulse',
      genre: 'R&B',
      price: 29,
      producer: 'Irfan Aktar',
      uploadDate: '2024-05-25',
      selected: false
    },
    {
      id: '3',
      title: 'Sunset Mirage',
      genre: 'Hip Hop',
      price: 45,
      producer: 'Hina Khan',
      uploadDate: '2024-05-21',
      selected: false
    },
    {
      id: '4',
      title: 'Glass Waves',
      genre: 'Pop',
      price: 38,
      producer: 'Chris Shift',
      uploadDate: '2024-05-19',
      selected: false
    },
    {
      id: '5',
      title: 'Midnight Dreams',
      genre: 'Trap',
      price: 34,
      producer: 'Suraj Raj',
      uploadDate: '2024-06-01',
      selected: false
    },
    {
      id: '6',
      title: 'Velvet Pulse',
      genre: 'R&B',
      price: 29,
      producer: 'Irfan Aktar',
      uploadDate: '2024-05-25',
      selected: false
    },
    {
      id: '7',
      title: 'Sunset Mirage',
      genre: 'Hip Hop',
      price: 45,
      producer: 'Hina Khan',
      uploadDate: '2024-05-21',
      selected: false
    },
    {
      id: '8',
      title: 'Glass Waves',
      genre: 'Pop',
      price: 38,
      producer: 'Chris Shift',
      uploadDate: '2024-05-19',
      selected: false
    }
  ]);

  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setBeats(beats.map(beat => ({ ...beat, selected: newSelectAll })));
  };

  const handleSelectBeat = (id: string) => {
    setBeats(beats.map(beat => 
      beat.id === id ? { ...beat, selected: !beat.selected } : beat
    ));
  };

  const handleDeleteBeat = (id: string) => {
    setBeats(beats.filter(beat => beat.id !== id));
  };

  return (
  <div className="min-h-screen bg-slate-900 flex">
  <div className="flex-1 flex flex-col">
    
    {/* Main Content */}
    <div className="flex-1 p-6">
      
      {/* Button aligned right */}
      <div className="flex justify-end mb-4">
        <button  onClick={() => router.push("/dashboard/beats_manager/add_beats")} className="bg-gradient-to-r w-40 from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-4 rounded-lg flex items-center gap-2 transition-all duration-200 transform hover:scale-105">
          <Upload size={24} />
          Upload
        </button>
      </div>

      {/* Beats Table */}
      <BeatsTable 
        beats={beats}
        selectAll={selectAll}
        onSelectAll={handleSelectAll}
        onSelectBeat={handleSelectBeat}
        onDeleteBeat={handleDeleteBeat}
      />
    </div>
  </div>
</div>

  );
};

export default DripManager;