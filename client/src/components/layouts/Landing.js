import React from "react";
import CreateNote from "../notes/CreateNote";
import NoteGrid from "../notes/NoteGrid";
import { Navbar } from "./Navbar";

const Landing = () => {
  return (
    <div>
      <Navbar />
      <section className='container'>
        <CreateNote />
        <NoteGrid />
      </section>
    </div>
  );
};

export default Landing;
