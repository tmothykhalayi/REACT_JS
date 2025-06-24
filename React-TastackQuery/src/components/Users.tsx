// PostUsers.tsx
import React, { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import Albums from './Album';
import type { Album } from './Album';

// --- User Interfaces ---
export interface Geo {
  lat: string;
  lng: string;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

// --- Fetch Users ---
const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
};

// --- Fetch Albums ---
const fetchAlbums = async (): Promise<Album[]> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/albums');
  if (!response.ok) {
    throw new Error('Failed to fetch albums');
  }
  return response.json();
};

const PostUsers: React.FC = () => {
  const { data: users } = useSuspenseQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const [userAlbums, setUserAlbums] = useState<{ [userId: number]: Album[] }>({});
  const [loadingUserId, setLoadingUserId] = useState<number | null>(null);

  const handleLoadAlbums = async (userId: number) => {
    if (userAlbums[userId]) return;

    setLoadingUserId(userId);
    try {
      const allAlbums = await fetchAlbums();
      const filtered = allAlbums.filter(album => album.userId === userId);
      setUserAlbums(prev => ({ ...prev, [userId]: filtered }));
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingUserId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">User List</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map(user => (
          <div
            key={user.id}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-1">
              {user.name} <span className="text-gray-500 text-sm">({user.username})</span>
            </h2>
            <p className="text-sm text-gray-600 mb-1">Email: {user.email}</p>
            <p className="text-sm text-gray-600 mb-1">Telephone: {user.phone}</p>
            <p className="text-sm text-gray-600 mb-3">
              Website <a href={`http://${user.website}`} className="text-blue-500 hover:underline" target="_blank" rel="noreferrer">{user.website}</a>
            </p>

            <div className="mb-3">
              <h3 className="text-sm font-semibold text-gray-800"> Address</h3>
              <p className="text-sm text-gray-600">
                {user.address.street}, {user.address.suite}, {user.address.city}
              </p>
              <p className="text-sm text-gray-600">ZIP: {user.address.zipcode}</p>
              <p className="text-xs text-gray-500">Geo: {user.address.geo.lat}, {user.address.geo.lng}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-800"> Company</h3>
              <p className="text-sm text-gray-600">{user.company.name}</p>
              <p className="text-sm italic text-gray-500">"{user.company.catchPhrase}"</p>
              <p className="text-sm text-gray-600">{user.company.bs}</p>
            </div>

            <button
              onClick={() => handleLoadAlbums(user.id)}
              disabled={loadingUserId === user.id}
              className="mt-4 bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              {loadingUserId === user.id ? 'Loading Albums...' : 'Show Albums'}
            </button>

            {userAlbums[user.id] && <Albums albums={userAlbums[user.id]} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostUsers;
