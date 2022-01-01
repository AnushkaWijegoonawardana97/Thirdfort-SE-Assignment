import React, { useState } from "react";

const CreateNote = () => {
  const [formData, setFormData] = useState({
    title: "",
    note: "",
    isarchived: false,
    createdat: new Date(),
  });

  const { title, note, isarchived, createdat } = formData;

  const onChange = (e) => {
    if (e.target.name === "isacrchived") {
      console.log(e.target.value);
      setFormData({ ...formData, isarchived: !isarchived });
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className='card w-50 mx-auto my-5'>
      <div className='card-header d-flex align-items-center justify-content-between'>
        <div className='card-title mb-0'>
          <strong>Take a Note</strong>
        </div>

        <button className='btn btn-primary me-2'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            fill='currentColor'
            className='bi bi-plus-circle-fill'
            viewBox='0 0 16 16'>
            <path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z' />
          </svg>
        </button>
      </div>
      <div className='card-body'>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className='mb-3'>
            <label htmlFor='title' className='form-label'>
              Note Title
            </label>
            <input
              type='text'
              name='title'
              id=''
              className='form-control'
              required
              value={title}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='note' className='form-label'>
              Note Content
            </label>
            <textarea
              name='note'
              id=''
              cols='30'
              rows='10'
              className='form-control'
              required
              value={note}
              onChange={(e) => onChange(e)}></textarea>
          </div>
          <div className='mb-3 form-check'>
            <input
              type='checkbox'
              name='isacrchived'
              id=''
              className='form-check-input'
              value={isarchived}
              onChange={(e) => onChange(e)}
            />
            <label htmlFor='isacrchived' className='form-check-label'>
              Archive this note
            </label>
          </div>
          <div className='mb-3'>
            <input
              type='submit'
              value='Create Note'
              className='btn btn-primary w-100'
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNote;
