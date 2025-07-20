import React from "react";
import _client from "./_client";
import { getGenre } from "../action";

export default async function AddBeat() {
  let genres = [];
  try {
    const fetchedGenre = await getGenre("music");
    genres = fetchedGenre;
  } catch (error) {
    console.error("Failed to fetch packages:", error);
  }
  return <_client genres={genres} />;
}
