export default function ConfirmPopUp({
  title,
  message,
  onCancel,
  onConfirm,
  isLoading,
}: {
  title: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}) {
  return (
    <>
        <div className="fixed z-[90] inset-0 bg-black/70" onClick={onCancel}/>
        <div 
          className="fixed flex flex-col gap-5 md:gap-8 justify-between z-[100] w-2/3 md:w-120 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-[#1a1a2e] border border-[#2d2d44] text-white p-5 font-michroma"
          onClick={(e) => e.stopPropagation()}
        >
            <h2 className="text-center text-2xl md:text-3xl">
                {title}
            </h2>
            <p className="text-xs text-center md:text-start text-slate-300">
                {message}
            </p>

            {/* buttons */}
            <div className="flex justify-center md:justify-end gap-3 text-xs md:text-sm">
                <button
                    disabled={isLoading}
                    className="cursor-pointer hover:bg-gray-700 bg-black px-6 py-2.5 rounded-md transition duration-300 disabled:opacity-50"
                    onClick={onCancel}
                >
                    Cancel
                </button>
                <button
                    disabled={isLoading}
                    className="cursor-pointer hover:bg-red-700 bg-red-600 px-6 py-2.5 rounded-md transition duration-300 flex items-center gap-2 min-w-[100px] justify-center disabled:opacity-50"
                    onClick={onConfirm}
                >
                    {isLoading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"/>
                        <span>Processing...</span>
                      </>
                    ) : "Confirm"}
                </button>
            </div>
        </div>
    </>
    );
}
