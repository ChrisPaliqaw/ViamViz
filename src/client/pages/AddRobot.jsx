import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAction } from '@wasp/actions';
import createRobot from '@wasp/actions/createRobot';

export function AddRobot() {
  const history = useHistory();
  const createRobotFn = useAction(createRobot);
  const [name, setName] = useState('');
  const [secret, setSecret] = useState('');
  const [url, setUrl] = useState('');

  const handleCreateRobot = () => {
    createRobotFn({ name, secret, url });
    setName('');
    setSecret('');
    setUrl('');
    history.push('/');
  };

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold'>Add Robot Connection</h1>
      <div className='flex flex-col gap-y-4 mt-4'>
        <input
          type='text'
          placeholder='Robot nickname'
          className='px-1 py-2 border rounded text-lg'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type='password'
          placeholder='Secret'
          className='px-1 py-2 border rounded text-lg'
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
        />
        <input
          type='password'
          placeholder='Address'
          className='px-1 py-2 border rounded text-lg'
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          onClick={handleCreateRobot}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Add
        </button>
        <Link
          to='/'
          className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'
        >
          Cancel
        </Link>
      </div>
    </div>
  );
}
