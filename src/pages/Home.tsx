import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { format } from 'date-fns';
import { Calendar, Video, Users, ChevronLeft, ChevronRight, Clock, MapPin, Heart, BookOpen, Music, Mic } from 'lucide-react';
import { getHomeContent, getMedia } from '../api';
//import { getEvents } from '../api';                     <-----  Uncokmment this line when ready to load events from backend             
import { dummyEvents } from '../data/dummyEvents';

const carouselImages = [
  {
    url: "https://images.unsplash.com/photo-1545987796-200677ee1011?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    title: "Prayer & Intercession",
    description: "Standing together in faith and prayer"
  },
  {
    url: "/images/choir1.png",
    title: "Worship Experience",
    description: "Join us in praising the Lord with joy and thanksgiving"
  },
  {
    url: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    title: "Spirit-Filled Worship",
    description: "Experience the power of pentecostal praise"
  },
  {
    url: "https://images.unsplash.com/photo-1601455763557-db1bea8a9a5a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    title: "Diverse Community",
    description: "A multicultural family united in Christ"
  },
  {
    url: "/images/home/youth.jpg", // or a suitable worship photo
    title: "Youth Ministry",
    description: "Empowering the next generation"
  },
  {
    url: "/images/home/choirpurple.jpg",
    title: "TOP Voices",
    description: "Our choir lifting hearts through harmonious worship"
  }
];

const Home = () => {
  const { data: homeContent } = useQuery('homeContent', getHomeContent);
  //const { data: events } = useQuery('events', getEvents);        <-----  Uncokmment this line when ready to load events from backend 
  const { data: media } = useQuery('media', getMedia);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const featuredMedia = media?.[0];
  //const upcomingEvents = events?.slice(0, 3);    <------  Uncomment this line when i have events coming from backend, for now we are using dummy data as below

  const upcomingEvents = dummyEvents
  .filter(event => new Date(event.date) >= new Date())
  .slice(0, 3);  // remove this upcomingEvents and replace with line 58. this is just a test with dummy data

  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    goToSlide((currentSlide - 1 + carouselImages.length) % carouselImages.length);
  };

  return (
    <div className="space-y-12">
      {/* Carousel Section */}
      <div className="relative h-[600px] group">
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${image.url})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50" />
            </div>
            <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
              <div className="text-white">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">{image.title}</h1>
                <p className="text-xl md:text-2xl max-w-2xl">{image.description}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Dots Navigation */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide
                  ? 'bg-white scale-110'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Welcome Message */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome Message</h2>
          <p className="text-gray-600 text-lg mb-6">{homeContent?.welcomeMessage}</p>
          <blockquote className="border-l-4 border-purple-500 pl-4 italic">
            {homeContent?.scripture}
          </blockquote>
        </div> */}

      <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome Message</h2>
          <p className="text-gray-600 text-lg mb-6">{homeContent?.welcomeMessage}</p>
          <blockquote className="border-l-4 border-purple-500 pl-4 italic">
          Welcome to Temple of praise (TOP) ministries — A Thriving Community of Faith in Eindhoven. 
          We’re so glad you’re here!
          At TOP ministries, we are a vibrant, Christ-centered community rooted in love, faith, and unity. Located in the heart of Eindhoven, our family is made up of people from all walks of life, cultures, and backgrounds — just like you.

          Whether you’re new to the city, searching for a place to worship, or simply curious about faith, we want you to know there’s a place for you here. We believe in doing life together, growing spiritually, and serving with purpose.

          Join us as we worship, grow, and impact our world together.
          You are welcome here. You are loved here. You belong here.
          </blockquote>
        </div>
      </section>

            {/* Service Times */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-purple-50 rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Join Us in Worship</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <Clock className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Sunday Service</h3>
              <p className="text-gray-600">10:00 AM</p>
              <p className="text-sm text-gray-500 mt-2">Main Worship Service</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <BookOpen className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Bible Study</h3>
              <p className="text-gray-600">Wednesday 7:00 PM</p>
              <p className="text-sm text-gray-500 mt-2">In-depth Scripture Study</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <Heart className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Prayer Meeting</h3>
              <p className="text-gray-600">Friday 7:00 PM</p>
              <p className="text-sm text-gray-500 mt-2">Intercessory Prayer</p>
            </div>
          </div>
        </div>
      </section>

            {/* Featured Sermon */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-1">
              <img
                src="/images/pastor.jpg"
                alt="Latest Sermon"
                className="w-full h-64 md:h-full object-cover"
              />
            </div>

            <div className="md:flex-1 p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Sermon</h2>
              <div className="flex items-center mb-4">
                <Mic className="h-5 w-5 text-purple-600 mr-2" />
                <span className="text-gray-600">The Power of Faith</span>
              </div>
              <p className="text-gray-600 mb-6">
                Discover how faith can move mountains and transform lives in this powerful message from our latest Sunday service.
              </p>
              <button
                className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                onClick={() => window.open('https://rhemacloud.com', '_blank')}
              >
                Listen Now
              </button>
            </div>
          </div>
        </div>
      </section>

            {/* Get Connected */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-purple-500 to-purple-700 rounded-lg shadow-lg p-8 text-white">
          <h2 className="text-3xl font-bold mb-8 text-center">Get Connected</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <Users className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Join a Group</h3>
              <p>Connect with believers in your area</p>
            </div>
            <div className="text-center">
              <Music className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Worship Team</h3>
              <p>Use your musical gifts</p>
            </div>
            <div className="text-center">
              <Heart className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Volunteer</h3>
              <p>Serve in our ministries</p>
            </div>
            <div className="text-center">
              <MapPin className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Find Us</h3>
              <p>Get directions to our church</p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Upcoming Events</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {upcomingEvents?.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              {event.imageUrl && (
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-4">{event.description}</p>
                <div className="flex items-center text-gray-500">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>{format(new Date(event.date), 'MMMM d, yyyy')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Media */}
      {featuredMedia && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Media</h2>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {featuredMedia.type === 'video' ? (
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={featuredMedia.url}
                  title={featuredMedia.title}
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
            ) : (
              <img
                src={featuredMedia.url}
                alt={featuredMedia.title}
                className="w-full h-96 object-cover"
              />
            )}
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{featuredMedia.title}</h3>
              <p className="text-gray-600">{featuredMedia.description}</p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;