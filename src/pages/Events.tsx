// the commented below is the original that has to be uncommented when i want to load events from the backend. 
// the temporary implementation below is with dummy data for showcase


// import React from 'react';
// import { useQuery } from 'react-query';
// import { Calendar, Clock, MapPin } from 'lucide-react';
// import { getEvents } from '../api';
// import { format } from 'date-fns';

// const Events = () => {
//   const { data: events, isLoading, error } = useQuery('events', getEvents);

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-red-500">Error loading events</div>
//       </div>
//     );
//   }

//   const upcomingEvents = events?.filter(event => new Date(event.date) >= new Date()) || [];
//   const pastEvents = events?.filter(event => new Date(event.date) < new Date()) || [];

//   return (
//     <div className="space-y-12 py-12">
//       {/* Hero Section */}
//       <div
//         className="relative h-[400px] bg-cover bg-center"
//         style={{
//           backgroundImage: 'url("https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")',
//         }}
//       >
//         <div className="absolute inset-0 bg-black bg-opacity-60" />
//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
//           <div className="text-white">
//             <h1 className="text-4xl md:text-6xl font-bold mb-4">Church Events</h1>
//             <p className="text-xl md:text-2xl max-w-2xl">
//               Join us for our upcoming services and special events
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Upcoming Events */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h2 className="text-3xl font-bold text-gray-900 mb-8">Upcoming Events</h2>
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {upcomingEvents.map((event) => (
//             <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
//               {event.imageUrl && (
//                 <img
//                   src={event.imageUrl}
//                   alt={event.title}
//                   className="w-full h-48 object-cover"
//                 />
//               )}
//               <div className="p-6">
//                 <h3 className="text-xl font-semibold mb-4">{event.title}</h3>
//                 <p className="text-gray-600 mb-4">{event.description}</p>
//                 <div className="space-y-2">
//                   <div className="flex items-center text-gray-500">
//                     <Calendar className="h-5 w-5 mr-2" />
//                     <span>{format(new Date(event.date), 'MMMM d, yyyy')}</span>
//                   </div>
//                   <div className="flex items-center text-gray-500">
//                     <Clock className="h-5 w-5 mr-2" />
//                     <span>{event.time}</span>
//                   </div>
//                   <div className="flex items-center text-gray-500">
//                     <MapPin className="h-5 w-5 mr-2" />
//                     <span>{event.location}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Past Events */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h2 className="text-3xl font-bold text-gray-900 mb-8">Past Events</h2>
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {pastEvents.map((event) => (
//             <div key={event.id} className="bg-gray-50 rounded-lg shadow-lg overflow-hidden opacity-75">
//               {event.imageUrl && (
//                 <img
//                   src={event.imageUrl}
//                   alt={event.title}
//                   className="w-full h-48 object-cover filter grayscale"
//                 />
//               )}
//               <div className="p-6">
//                 <h3 className="text-xl font-semibold mb-4">{event.title}</h3>
//                 <p className="text-gray-600 mb-4">{event.description}</p>
//                 <div className="space-y-2">
//                   <div className="flex items-center text-gray-500">
//                     <Calendar className="h-5 w-5 mr-2" />
//                     <span>{format(new Date(event.date), 'MMMM d, yyyy')}</span>
//                   </div>
//                   <div className="flex items-center text-gray-500">
//                     <Clock className="h-5 w-5 mr-2" />
//                     <span>{event.time}</span>
//                   </div>
//                   <div className="flex items-center text-gray-500">
//                     <MapPin className="h-5 w-5 mr-2" />
//                     <span>{event.location}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Events;


import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { dummyEvents } from '../data/dummyEvents';

const Events = () => {
  const upcomingEvents = dummyEvents.filter(event => new Date(event.date) >= new Date());
  const pastEvents = dummyEvents.filter(event => new Date(event.date) < new Date());

  return (
    <div className="space-y-12 py-12">
      {/* Hero Section */}
      <div
        className="relative h-[400px] bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Church Events</h1>
            <p className="text-xl md:text-2xl max-w-2xl">
              Join us for our upcoming services and special events
            </p>
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Upcoming Events</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              {event.imageUrl && (
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">{event.title}</h3>
                <p className="text-gray-600 mb-4">{event.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-500">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span>{format(new Date(event.date), 'MMMM d, yyyy')}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Past Events */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Past Events</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pastEvents.map((event) => (
            <div key={event.id} className="bg-gray-50 rounded-lg shadow-lg overflow-hidden opacity-75">
              {event.imageUrl && (
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-48 object-cover filter grayscale"
                />
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">{event.title}</h3>
                <p className="text-gray-600 mb-4">{event.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-500">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span>{format(new Date(event.date), 'MMMM d, yyyy')}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Events;