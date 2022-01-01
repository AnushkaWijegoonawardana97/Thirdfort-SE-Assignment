import React from "react";
import NoteCard from "./NoteCard";

const NoteGrid = () => {
  return (
    <div className='row' data-masonry='{"percentPosition": true }'>
      <NoteCard />
      <NoteCard />
      <NoteCard />
      <NoteCard />
      <NoteCard />
      <NoteCard />
      <NoteCard />
      <NoteCard />
      <NoteCard />
    </div>
  );
};

export default NoteGrid;
