import BeatForm from "@/src/components/form/BeatForm";
import React from "react";

export default function UploadBeat({
  genres,
}: {
  genres: { id: number; name: string }[];
}) {
  return <BeatForm genres={genres} />;
}
