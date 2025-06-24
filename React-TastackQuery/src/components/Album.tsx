// Album.tsx
import React from 'react';

export interface Album {
  userId: number;
  id: number;
  title: string;
}

interface AlbumsProps {
  albums: Album[];
}

const Albums: React.FC<AlbumsProps> = ({ albums }) => {
  if (!albums || albums.length === 0) {
    return (
      <div className="mt-4 text-sm text-gray-500">
        No albums found for this user.
      </div>
    );
  }

  return (
    <div className="mt-4 border-t pt-4">
      <h3 className="text-md font-bold text-gray-800 mb-2">Albums</h3>
      <ul className="space-y-1">
        {albums.map((album) => (
          <li key={album.id} className="text-sm text-gray-700">
            🎵 {album.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Albums;
