import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { format } from 'date-fns';
import {
  Calendar,
  Users,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Heart,
  Music,
  HandHeart,
} from 'lucide-react';
import { getMedia } from '../api';
//import { getEvents } from '../api';                     <-----  Uncokmment this line when ready to load events from backend
import { dummyEvents } from '../data/dummyEvents';

const carouselImages = [
  {
    url: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    title: 'Community Support',
    description: 'Standing together to help those in need',
    position: 'center',
  },
  {
    url: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    title: 'Music Academy',
    description: 'Nurturing musical talent in youth and children',
    position: 'center',
  },
  {
    url: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    title: 'Immigrant Services',
    description: 'Helping newcomers settle and thrive in the Netherlands',
    position: 'center',
  },
  {
    url: '/images/home/friend.jpg',
    title: 'Diverse Community',
    description: 'A multicultural family united in purpose',
    position: 'center 30%',
    size: 'contain',
  },
  {
    url: '/images/home/youth.jpg',
    title: 'Youth Programs',
    description: 'Empowering the next generation',
    position: 'center',
  },
  {
    url: '/images/home/choirpic.jpg',
    title: 'TOP Voices',
    description: 'Our music group bringing joy through harmonious performance',
    position: 'center',
  },
];

const Home = () => {
  //const { data: events } = useQuery('events', getEvents);        <-----  Uncokmment this line when ready to load events from backend
  const { data: media } = useQuery('media', getMedia);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const featuredMedia = media?.[0];
  //const upcomingEvents = events?.slice(0, 3);    <------  Uncomment this line when i have events coming from backend, for now we are using dummy data as below

  const upcomingEvents = dummyEvents
    .filter((event) => new Date(event.date) >= new Date())
    .slice(0, 3); // remove this upcomingEvents and replace with line 58. this is just a test with dummy data

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
    goToSlide(
      (currentSlide - 1 + carouselImages.length) % carouselImages.length
    );
  };

  return (
    <div className='space-y-12'>
      {/* Carousel Section */}
      <div className='relative h-[600px] group'>
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className='absolute inset-0'
              style={{
                backgroundImage: `url(${image.url})`,
                backgroundPosition: image.position || 'center',
                backgroundSize: image.size || 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundColor: '#1a1a2e'
              }}
            >
              <div className='absolute inset-0 bg-black bg-opacity-50' />
            </div>
            <div className='relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center'>
              <div className='text-white'>
                <h1 className='text-4xl md:text-6xl font-bold mb-4'>
                  {image.title}
                </h1>
                <p className='text-xl md:text-2xl max-w-2xl'>
                  {image.description}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className='absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity'
        >
          <ChevronLeft className='h-6 w-6' />
        </button>
        <button
          onClick={nextSlide}
          className='absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity'
        >
          <ChevronRight className='h-6 w-6' />
        </button>

        {/* Dots Navigation */}
        <div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2'>
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
      <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome Message</h2>
          <p className="text-gray-600 text-lg mb-6">{homeContent?.welcomeMessage}</p>
          <blockquote className="border-l-4 border-purple-500 pl-4 italic">
            {homeContent?.scripture}
          </blockquote>
        </div> */}

        <div className='bg-white rounded-lg shadow-lg p-8'>
          <h2 className='text-3xl font-bold text-gray-900 mb-4'>
            Welcome to Temple of Praise Ministries
          </h2>
          <p className='text-gray-600 text-lg mb-6'>
            A Community Organization Dedicated to Making a Difference
          </p>
          <blockquote className='border-l-4 border-purple-500 pl-4 italic'>
            Welcome to Temple of Praise (TOP) Ministries — a thriving community
            organization in Eindhoven. We're so glad you're here! At TOP Ministries,
            we are a vibrant, multicultural community rooted in compassion, unity,
            and service. Located in the heart of Eindhoven, our family is made up
            of people from all walks of life, cultures, and backgrounds — just
            like you. Whether you're new to the Netherlands, looking for community
            support, interested in music education, or seeking to volunteer and
            make a difference, there's a place for you here. We believe in doing
            life together, growing as individuals, and serving with purpose.
            Join us as we support, connect, and impact our community together.
            You are welcome here. You are valued here. You belong here.
          </blockquote>
        </div>
      </section>

      {/* Our Programs */}
      <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='bg-purple-50 rounded-lg shadow-lg p-8'>
          <h2 className='text-3xl font-bold text-gray-900 mb-8 text-center'>
            Our Programs
          </h2>
          <div className='grid md:grid-cols-3 gap-8'>
            <div className='bg-white rounded-lg p-6 text-center shadow-md'>
              <Music className='h-12 w-12 text-purple-600 mx-auto mb-4' />
              <h3 className='text-xl font-semibold mb-2'>Music Academy</h3>
              <p className='text-gray-600'>Saturdays 10:00 AM</p>
              <p className='text-sm text-gray-500 mt-2'>Music lessons for youth & children</p>
            </div>
            <div className='bg-white rounded-lg p-6 text-center shadow-md'>
              <HandHeart className='h-12 w-12 text-purple-600 mx-auto mb-4' />
              <h3 className='text-xl font-semibold mb-2'>Community Support</h3>
              <p className='text-gray-600'>Weekdays 9:00 AM - 5:00 PM</p>
              <p className='text-sm text-gray-500 mt-2'>
                Counseling & integration services
              </p>
            </div>
            <div className='bg-white rounded-lg p-6 text-center shadow-md'>
              <Heart className='h-12 w-12 text-purple-600 mx-auto mb-4' />
              <h3 className='text-xl font-semibold mb-2'>Charity Outreach</h3>
              <p className='text-gray-600'>Ongoing Programs</p>
              <p className='text-sm text-gray-500 mt-2'>Supporting those in need</p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Director */}
      <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='bg-white rounded-lg shadow-lg overflow-hidden'>
          <div className='md:flex'>
            <div className='md:flex-1'>
              <img
                src='/images/pastor.jpg'
                alt='Our Director'
                className='w-full h-64 md:h-full object-cover'
              />
            </div>

            <div className='md:flex-1 p-8'>
              <h2 className='text-3xl font-bold text-gray-900 mb-4'>
                Meet Our Director
              </h2>
              <div className='flex items-center mb-4'>
                <Users className='h-5 w-5 text-purple-600 mr-2' />
                <span className='text-gray-600'>Community Leadership</span>
              </div>
              <p className='text-gray-600 mb-6'>
                Our director brings years of experience in community development,
                immigrant integration, and social services. Dedicated to making
                a positive impact in Eindhoven and beyond.
              </p>
              <button
                className='bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors'
                onClick={() => window.location.href = '/leadership'}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Get Connected */}
      <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='bg-gradient-to-r from-purple-500 to-purple-700 rounded-lg shadow-lg p-8 text-white'>
          <h2 className='text-3xl font-bold mb-8 text-center'>Get Connected</h2>
          <div className='grid md:grid-cols-4 gap-8'>
            <div className='text-center'>
              <Users className='h-12 w-12 mx-auto mb-4' />
              <h3 className='text-xl font-semibold mb-2'>Join Our Community</h3>
              <p>Connect with people in your area</p>
            </div>
            <div className='text-center'>
              <Music className='h-12 w-12 mx-auto mb-4' />
              <h3 className='text-xl font-semibold mb-2'>Music Programs</h3>
              <p>Learn and share your musical gifts</p>
            </div>
            <div className='text-center'>
              <Heart className='h-12 w-12 mx-auto mb-4' />
              <h3 className='text-xl font-semibold mb-2'>Volunteer</h3>
              <p>Help make a difference</p>
            </div>
            <div className='text-center'>
              <MapPin className='h-12 w-12 mx-auto mb-4' />
              <h3 className='text-xl font-semibold mb-2'>Find Us</h3>
              <p>Get directions to our center</p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12'>
        <h2 className='text-3xl font-bold text-gray-900 mb-8'>
          Upcoming Events
        </h2>
        <div className='grid md:grid-cols-3 gap-8'>
          {upcomingEvents?.map((event) => (
            <div
              key={event.id}
              className='bg-white rounded-lg shadow-lg overflow-hidden'
            >
              {event.imageUrl && (
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className='w-full h-64 object-cover'
                />
              )}
              <div className='p-6'>
                <h3 className='text-xl font-semibold mb-2'>{event.title}</h3>
                <p className='text-gray-600 mb-4'>{event.description}</p>
                <div className='space-y-2'>
                  <div className='flex items-center text-gray-500'>
                    <Calendar className='h-5 w-5 mr-2' />
                    <span>{format(new Date(event.date), 'MMMM d, yyyy')}</span>
                  </div>
                  <div className='flex items-center text-gray-500'>
                    <Clock className='h-5 w-5 mr-2' />
                    <span>{event.time}</span>
                  </div>
                  <div className='flex items-center text-gray-500'>
                    <MapPin className='h-5 w-5 mr-2' />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Media */}
      {featuredMedia && (
        <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h2 className='text-3xl font-bold text-gray-900 mb-8'>
            Featured Media
          </h2>
          <div className='bg-white rounded-lg shadow-lg overflow-hidden'>
            {featuredMedia.type === 'video' ? (
              <div className='aspect-w-16 aspect-h-9'>
                <iframe
                  src={featuredMedia.url}
                  title={featuredMedia.title}
                  className='w-full h-full'
                  allowFullScreen
                />
              </div>
            ) : (
              <img
                src={featuredMedia.url}
                alt={featuredMedia.title}
                className='w-full h-96 object-cover'
              />
            )}
            <div className='p-6'>
              <h3 className='text-xl font-semibold mb-2'>
                {featuredMedia.title}
              </h3>
              <p className='text-gray-600'>{featuredMedia.description}</p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
