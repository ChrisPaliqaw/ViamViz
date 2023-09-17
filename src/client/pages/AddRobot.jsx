import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getRobots from '@wasp/queries/getRobots';
import createRobot from '@wasp/actions/createRobot';

export function AddRobot() {
  const { data: robots, isLoading, error } = useQuery(getRobots);
  const createRobotFn = useAction(createRobot);
  const [name, setName] = useState('');
  const [secret, setSecret] = useState('');
  const [url, setUrl] = useState('');

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCreateRobot = () => {
    createRobotFn({ name, secret, url });
    setName('');
    setSecret('');
    setUrl('');
  };

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold'>Add Robot</h1>
      <div className='flex flex-col gap-y-4 mt-4'>
        <input
          type='text'
          placeholder='Name'
          className='px-1 py-2 border rounded text-lg'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type='text'
          placeholder='Secret'
          className='px-1 py-2 border rounded text-lg'
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
        />
        <input
          type='text'
          placeholder='URL'
          className='px-1 py-2 border rounded text-lg'
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          onClick={handleCreateRobot}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Create Robot
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
