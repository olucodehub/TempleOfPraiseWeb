import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Play, Image as ImageIcon, Calendar, ChevronDown, ChevronUp, LogOut, User } from 'lucide-react';
import { format } from 'date-fns';
import { getAllMediaEvents, getMediaItemsByEvent } from '../services/azureStorage';
import { useAuth } from '../context/AuthContext';
import { MediaEvent, Media } from '../types';

interface MediaEventWithItems extends MediaEvent {
  items: Media[];
  isExpanded: boolean;
  isLoading: boolean;
}

const MediaGallery: React.FC = () => {
  const { member, logout } = useAuth();
  const [expandedEvents, setExpandedEvents] = useState<Record<string, MediaEventWithItems>>({});

  const { data: events, isLoading, error } = useQuery('mediaEvents', getAllMediaEvents);

  const toggleEvent = async (event: MediaEvent) => {
    const eventId = event.id;

    if (expandedEvents[eventId]?.isExpanded) {
      // Collapse
      setExpandedEvents(prev => ({
        ...prev,
        [eventId]: { ...prev[eventId], isExpanded: false }
      }));
    } else {
      // Expand and load items if not loaded
      if (!expandedEvents[eventId]?.items) {
        setExpandedEvents(prev => ({
          ...prev,
          [eventId]: { ...event, items: [], isExpanded: true, isLoading: true }
        }));

        try {
          const items = await getMediaItemsByEvent(eventId);
          setExpandedEvents(prev => ({
            ...prev,
            [eventId]: { ...event, items, isExpanded: true, isLoading: false }
          }));
        } catch (err) {
          console.error('Error loading media items:', err);
          setExpandedEvents(prev => ({
            ...prev,
            [eventId]: { ...event, items: [], isExpanded: true, isLoading: false }
          }));
        }
      } else {
        setExpandedEvents(prev => ({
          ...prev,
          [eventId]: { ...prev[eventId], isExpanded: true }
        }));
      }
    }
  };

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
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <div className="text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Media Gallery</h1>
            <p className="text-xl md:text-2xl max-w-2xl">
              Experience our services and events through photos and videos
            </p>
          </div>

          {/* User info and logout */}
          <div className="text-white text-right">
            <div className="flex items-center gap-2 mb-2">
              <User className="h-5 w-5" />
              <span className="font-medium">{member?.name}</span>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Events Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Church Events & Media</h2>

        {events && events.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No media events available yet. Check back soon!</p>
          </div>
        )}

        <div className="space-y-4">
          {events?.map((event) => {
            const expandedEvent = expandedEvents[event.id];
            const isExpanded = expandedEvent?.isExpanded || false;
            const isEventLoading = expandedEvent?.isLoading || false;
            const items = expandedEvent?.items || [];

            const videos = items.filter(item => item.type === 'video');
            const images = items.filter(item => item.type === 'image');

            return (
              <div
                key={event.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                {/* Event Header */}
                <button
                  onClick={() => toggleEvent(event)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-purple-100 rounded-lg p-3">
                      <Calendar className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
                      <p className="text-gray-500 text-sm">
                        {format(new Date(event.eventDate), 'EEEE, MMMM d, yyyy')}
                      </p>
                      {event.description && (
                        <p className="text-gray-600 text-sm mt-1">{event.description}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {isExpanded ? (
                      <ChevronUp className="h-6 w-6 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-gray-400" />
                    )}
                  </div>
                </button>

                {/* Event Content */}
                {isExpanded && (
                  <div className="border-t border-gray-200 p-6">
                    {isEventLoading ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-4 border-purple-500 border-t-transparent"></div>
                      </div>
                    ) : items.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        No media items for this event yet.
                      </div>
                    ) : (
                      <div className="space-y-8">
                        {/* Videos */}
                        {videos.length > 0 && (
                          <div>
                            <div className="flex items-center mb-4">
                              <Play className="h-5 w-5 text-purple-600 mr-2" />
                              <h4 className="text-lg font-semibold text-gray-900">Videos</h4>
                            </div>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {videos.map((video) => (
                                <div key={video.id} className="bg-gray-50 rounded-lg overflow-hidden">
                                  <div className="aspect-video">
                                    <video
                                      src={video.url}
                                      controls
                                      className="w-full h-full object-cover"
                                      poster={video.thumbnailUrl}
                                    >
                                      Your browser does not support the video tag.
                                    </video>
                                  </div>
                                  <div className="p-3">
                                    <h5 className="font-medium text-gray-900">{video.title}</h5>
                                    {video.description && (
                                      <p className="text-gray-600 text-sm mt-1">{video.description}</p>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Images */}
                        {images.length > 0 && (
                          <div>
                            <div className="flex items-center mb-4">
                              <ImageIcon className="h-5 w-5 text-purple-600 mr-2" />
                              <h4 className="text-lg font-semibold text-gray-900">Photos</h4>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                              {images.map((image) => (
                                <div key={image.id} className="relative group">
                                  <img
                                    src={image.url}
                                    alt={image.title}
                                    className="w-full h-48 object-cover rounded-lg shadow transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                                    onClick={() => window.open(image.url, '_blank')}
                                  />
                                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                                    <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2">
                                      <p className="text-sm font-medium">{image.title}</p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default MediaGallery;
