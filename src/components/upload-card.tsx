import Image from "next/image"

interface UploadCardProps {
  title: string
  artist: string
  price: string
  image: string
}

export function UploadCard({ title, artist, price, image }: UploadCardProps) {
  return (
    <div className="flex items-center gap-3 p-3 bg-[#0f0f23] rounded-lg">
      <Image
        src={image || "/placeholder.svg"}
        alt={title}
        width={60}
        height={60}
        className="rounded-lg bg-gradient-to-br from-purple-500 to-pink-500"
      />
      <div className="flex-1 min-w-0">
        <h4 className="text-white font-medium text-sm truncate">{title}</h4>
        <p className="text-gray-400 text-xs truncate">{artist}</p>
        <p className="text-[#fdcb6e] font-bold text-sm">{price}</p>
      </div>
    </div>
  )
}
