import React from 'react';
import { CheckCircle, X } from 'lucide-react';

export default function MixingProSubmissionDetails() {
  return (
    <div className="bg-[#1B1B1D] text-white p-6 rounded-xl shadow-xl max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 17l4-4-4-4v8zm14-8l-4 4 4 4V9z" fill="currentColor"/>
          </svg>
          Mixing Pro Submission Details
        </h2>
        <button className="text-sm text-[#74f9e0] flex items-center gap-1">
          <X className="w-4 h-4" /> Close
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#273142] p-6 rounded-lg space-y-3">
          <div className="flex items-center gap-3">
            <img
              src="https://via.placeholder.com/40"
              alt="avatar"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="text-lg font-semibold text-[#e7625f]">Ravi Shrestha</p>
              <p className="text-sm text-gray-300">ravi@email.com</p>
            </div>
          </div>

          <p className="text-sm text-gray-400">
            <span className="font-medium text-white">🎧 Music Genre:</span> Hip-Hop
          </p>
          <p className="text-sm text-gray-400">
            <span className="font-medium text-white">🛠 Preferred Mixing Style:</span> Crisp
          </p>
          <p className="text-sm text-gray-400">
            <span className="font-medium text-white">🎤 Music Needs:</span> I want something like Travis Scott’s style.
          </p>
          <p className="text-sm text-gray-400">
            <span className="font-medium text-white">🔗 File Upload:</span>{' '}
            <a href="#" className="text-[#74f9e0] underline">Open File</a>
          </p>
          <p className="text-sm text-gray-400">
            <span className="font-medium text-white">🔍 Additional Instructions:</span> Add some echo in the second verse.
          </p>
        </div>

        <div className="bg-[#273142] p-6 rounded-lg">
          <div className="flex justify-between mb-4">
            <h3 className="text-lg font-semibold">Mixing Package</h3>
            <p className="text-sm text-gray-400">
              Base Package: <span className="font-semibold text-white">$149.99</span>
            </p>
          </div>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex justify-between">
              <span>✔️ Professional Mastering</span>
              <span>$25</span>
            </li>
            <li className="flex justify-between">
              <span>✔️ Custom Beat Pro</span>
              <span>$199.99</span>
            </li>
            <li className="flex justify-between">
              <span>✔️ Cute Boka Feature</span>
              <span className="text-white">TBD</span>
            </li>
            <li className="flex justify-between">
              <span>✔️ Promo Campaign</span>
              <span>$50</span>
            </li>
          </ul>
          <div className="mt-4 border-t border-gray-600 pt-3 flex justify-between font-semibold text-white">
            <span>Total:</span>
            <span>$424.98</span>
          </div>
        </div>
      </div>

      <div>
        <button className="bg-[#00e08f] hover:bg-[#00c97e] text-black px-6 py-2 rounded-md font-semibold text-sm">
          ✔ Mark as Completed
        </button>
      </div>
    </div>
  );
}
