export default function ConfirmPopUp({
  title,
  message,
  onCancel,
  onConfirm,
}: {
  title: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <>
        {/* overlay */}
        <div className="fixed z-90 inset-0 bg-black/70"/>
        <div className="fixed flex flex-col gap-5 md:gap-8 justify-between z-100 w-2/3 md:w-120 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-[#1a1a2e] border border-[#2d2d44] text-white p-5 font-michroma">
            <h2 className="text-center text-2xl md:text-3xl">
                {title}
            </h2>
            <p className="text-xs text-center md:text-start">
                {message}
            </p>

            {/* buttons */}
            <div className="flex justify-center md:justify-end gap-2 text-xs md:text-sm">
                <button
                    className="cursor-pointer hover:bg-gray-700 bg-black px-4 py-2 rounded-md transition duration-300"
                    onClick={onCancel}
                >
                    Cancel
                </button>
                <button
                    className="cursor-pointer hover:bg-red-700 bg-red-500 px-4 py-2 rounded-md transition duration-300"
                    onClick={onConfirm}
                >
                    Confirm
                </button>
            </div>
        </div>
    </>
    );
}
