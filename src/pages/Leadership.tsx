import { Calendar, Mail, Phone } from 'lucide-react';

const Leadership = () => {
  return (
    <div className='space-y-12 py-12'>
      {/* Hero Section */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='bg-white rounded-lg shadow-lg overflow-hidden'>
          <div className='md:flex'>
            <div className='md:flex-shrink-0'>
              <img
                className='h-96 w-full object-cover md:w-96'
                src='/images/pastor2.jpeg'
                alt='Director'
              />
            </div>
            <div className='p-8'>
              <div className='uppercase tracking-wide text-purple-600 font-semibold'>
                Director
              </div>
              <h1 className='mt-2 text-4xl font-bold text-gray-900'>
                Nelson Boateng Frimpong
              </h1>
              <div className='mt-4 space-y-4'>
                <div className='flex items-center text-gray-600'>
                  <Calendar className='h-5 w-5 mr-2' />
                  <span>Leading since 2011</span>
                </div>
                <div className='flex items-center text-gray-600'>
                  <Mail className='h-5 w-5 mr-2' />
                  <a
                    href='mailto:info@templeofpraiseministries.nl'
                    className='hover:text-purple-600'
                  >
                    info@templeofpraiseministries.nl
                  </a>
                </div>
                <div className='flex items-center text-gray-600'>
                  <Phone className='h-5 w-5 mr-2' />
                  <a href='tel:+31612585216' className='hover:text-purple-600'>
                    +31 61 258 5216
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Biography */}
      <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='bg-white rounded-lg shadow-lg p-8'>
          <h2 className='text-3xl font-bold text-gray-900 mb-6'>About Our Director</h2>
          <div className='prose max-w-none text-gray-600'>
            <p className='text-lg mb-4'>
              Nelson Boateng Frimpong has been leading Temple of Praise Ministries
              since 2011. With over 20 years of experience in community development
              and social services, he brings a wealth of knowledge and dedication
              to our organization.
            </p>
            <p className='text-lg mb-4'>
              Originally from Ghana, Nelson has worked with various community
              organizations across Africa and Europe. His experience in immigrant
              integration, youth development, and charitable work has been
              invaluable in shaping our programs and services.
            </p>
            <p className='text-lg'>
              His passion for multicultural community building and commitment to
              helping those in need has been instrumental in developing Temple of
              Praise Ministries into the impactful organization it is today.
              Nelson's leadership style combines practical guidance with genuine
              care, making our services accessible and effective for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Leadership */}
      <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='bg-white rounded-lg shadow-lg p-8'>
          <h2 className='text-3xl font-bold text-gray-900 mb-6'>
            Our Vision
          </h2>
          <div className='prose max-w-none text-gray-600'>
            <p className='text-lg mb-4'>
              "My vision for Temple of Praise Ministries is to create a
              welcoming community where people from all backgrounds can find
              support, develop their potential, and contribute to society. We
              are committed to:
            </p>
            <ul className='list-disc pl-6 space-y-2 mb-4'>
              <li>Building a strong, united multicultural community</li>
              <li>Supporting immigrants and refugees in their integration journey</li>
              <li>Providing quality music education for youth and children</li>
              <li>Helping those in vulnerable situations through charity work</li>
              <li>Making a positive impact in Eindhoven and beyond</li>
            </ul>
            <p className='text-lg italic'>
              Together, we can create positive change in our lives and our
              community."
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Leadership;
