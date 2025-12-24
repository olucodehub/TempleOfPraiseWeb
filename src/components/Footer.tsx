import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className='bg-gray-900 text-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          <div>
            <div className='flex items-center mb-4'>
              <Heart className='h-8 w-8 text-purple-400' />
              <span className='ml-2 text-xl font-bold'>Temple of Praise Ministries</span>
            </div>
            <p className='text-gray-400'>
              A community organization dedicated to support, education, and
              positive impact in Eindhoven, Netherlands.
            </p>
          </div>

          <div>
            <h3 className='text-lg font-semibold mb-4'>Quick Links</h3>
            <ul className='space-y-2'>
              <li>
                <Link to='/about' className='text-gray-400 hover:text-white'>
                  About Us
                </Link>
              </li>
              <li>
                <Link to='/media' className='text-gray-400 hover:text-white'>
                  Media Gallery
                </Link>
              </li>
              <li>
                <Link
                  to='/new-member'
                  className='text-gray-400 hover:text-white'
                >
                  Join Us
                </Link>
              </li>
              <li>
                <Link
                  to='/login'
                  className='text-gray-400 hover:text-white cursor-pointer'
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Member Login
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className='text-lg font-semibold mb-4'>Contact Us</h3>
            <ul className='space-y-2'>
              <li className='flex items-center'>
                <MapPin className='h-5 w-5 mr-2 text-purple-400' />
                <span className='text-gray-400'>Beemdstraat 21, Eindhoven</span>
              </li>
              <li className='flex items-center'>
                <Phone className='h-5 w-5 mr-2 text-purple-400' />
                <a
                  href='tel:+31612585216'
                  className='text-gray-400 hover:text-white'
                >
                  +31 61 258 5216
                </a>
              </li>
              <li className='flex items-center'>
                <Mail className='h-5 w-5 mr-2 text-purple-400' />
                <a
                  href='mailto:info@templeofpraiseministries.nl'
                  className='text-gray-400 hover:text-white'
                >
                  info@templeofpraiseministries.nl
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className='text-lg font-semibold mb-4'>Opening Hours</h3>
            <ul className='space-y-2 text-gray-400'>
              <li>Monday - Friday: 9:00 AM - 5:00 PM</li>
              <li>Saturday: Music Academy 10:00 AM</li>
              <li>Community Events: See Events page</li>
            </ul>
          </div>
        </div>

        <div className='border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm'>
          <p>
            &copy; {new Date().getFullYear()} Temple of Praise Ministries. All
            rights reserved.
          </p>
          <p className='text-xs mt-1'>
            Designed by{' '}
            <a
              href='https://api.whatsapp.com/send/?phone=31636041326&text&type=phone_number&app_absent=0'
              target='_blank'
              rel='noopener noreferrer'
              className='underline text-blue-400'
            >
              Tuyi Solutions
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
