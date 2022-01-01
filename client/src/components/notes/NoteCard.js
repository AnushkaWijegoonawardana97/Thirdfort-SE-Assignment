import React from "react";

const NoteCard = () => {
  return (
    <div className='col-sm-6 col-lg-4 mb-4'>
      <div className='card'>
        <div className='card-body'>
          <h5 className='card-title'>Note Title</h5>
          <p className='card-text'>Note Content</p>
          <p className='card-text text-muted'>Created at</p>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
