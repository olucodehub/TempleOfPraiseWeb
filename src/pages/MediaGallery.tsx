import React from 'react';
import { useQuery } from 'react-query';
import { Play, Image as ImageIcon, Calendar } from 'lucide-react';
import { getMedia } from '../api';
import { format } from 'date-fns';

const MediaGallery = () => {
  const { data: mediaItems, isLoading, error } = useQuery('media', getMedia);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">Error loading media content</div>
      </div>
    );
  }

  const videos = mediaItems?.filter(item => item.type === 'video') || [];
  const images = mediaItems?.filter(item => item.type === 'image') || [];

  return (
    <div className="space-y-12 py-12">
      {/* Hero Section */}
      <div
        className="relative h-[400px] bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Media Gallery</h1>
            <p className="text-xl md:text-2xl max-w-2xl">
              Experience our services and events through photos and videos
            </p>
          </div>
        </div>
      </div>

      {/* Videos Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-8">
          <Play className="h-6 w-6 text-purple-600 mr-2" />
          <h2 className="text-3xl font-bold text-gray-900">Latest Videos</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <div key={video.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={video.url}
                  title={video.title}
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{video.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{video.description}</p>
                <div className="flex items-center text-gray-500 text-sm">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{format(new Date(video.uploadDate), 'MMMM d, yyyy')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Photos Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-8">
          <ImageIcon className="h-6 w-6 text-purple-600 mr-2" />
          <h2 className="text-3xl font-bold text-gray-900">Photo Gallery</h2>
        </div>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <div key={image.id} className="relative group">
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-64 object-cover rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
                  <h3 className="text-lg font-semibold mb-2">{image.title}</h3>
                  <p className="text-sm">{image.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MediaGallery;