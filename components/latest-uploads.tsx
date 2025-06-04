import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UploadCard } from "./upload-card"

const latestUploads = [
 {
    id: 1,
    title: "Midnight Dreams",
    artist: "Luna Eclipse",
    price: "$20",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=60&h=60", // night sky image
  },
  {
    id: 2,
    title: "Sunkiss Bliss",
    artist: "Hailey Rivera",
    price: "$10",
    image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=60&h=60", // sunrise/sunset image
  },
  {
    id: 3,
    title: "Midnight Dreams",
    artist: "Luna Eclipse",
    price: "$20",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=60&h=60", // same night sky image
  },
  {
    id: 4,
    title: "Midnight Dreams",
    artist: "Luna Eclipse",
    price: "$20",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=60&h=60", // same night sky image
  },
]

export function LatestUploads() {
  return (
    <Card className="bg-[#1a1a2e] border-[#2d2d44]">
      <CardHeader>
        <CardTitle className="text-white">Latest Uploads</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {latestUploads.map((upload) => (
            <UploadCard
              key={upload.id}
              title={upload.title}
              artist={upload.artist}
              price={upload.price}
              image={upload.image}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
