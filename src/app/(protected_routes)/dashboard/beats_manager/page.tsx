import React from "react";
import _Client from "./_client";
import { getBeats, getGenre } from "./action";
import { Beat, Genre } from "@/src/types";

export default async function BeatsManager() {
  let genres: Genre[] = [];
  let beats: Beat[] = [];
  try {
    genres = await getGenre("music");
    beats = await getBeats();
  } catch (error) {
    console.error("Failed to parse genres:", error);
  }
  return <_Client genres={genres} beatData={beats} />;
}
