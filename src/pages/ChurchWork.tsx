import React from 'react';
import { Globe, Heart, Book, Users } from 'lucide-react';

const ChurchWork = () => {
  return (
    <div className="space-y-12 py-12">
      {/* Hero Section */}
      <div
        className="relative h-[400px] bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1504022462188-3f30e41d3892?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Our Church Work</h1>
            <p className="text-xl md:text-2xl max-w-2xl">
              Making a difference in our community and beyond
            </p>
          </div>
        </div>
      </div>

      {/* Main Ministries */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Community Outreach"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Community Outreach</h2>
              <p className="text-gray-600">
                We actively engage with the Eindhoven community through various programs including food banks, 
                homeless ministry, and support for international students and newcomers to the Netherlands.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1531171673193-d52fd89834de?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Missions"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Global Missions</h2>
              <p className="text-gray-600">
                Our church supports missionary work across the globe, partnering with local churches 
                and organizations to spread the gospel and provide humanitarian aid.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Impact */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Impact</h2>
        <div className="grid md:grid-cols-4 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Heart className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">1000+</h3>
            <p className="text-gray-600">People Helped</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Globe className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">10</h3>
            <p className="text-gray-600">Countries Reached</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Book className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">52</h3>
            <p className="text-gray-600">Weekly Programs</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Users className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">100+</h3>
            <p className="text-gray-600">Volunteers</p>
          </div>
        </div>
      </section>

      {/* Current Projects */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Current Projects</h2>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Food Bank Initiative</h3>
              <p className="text-gray-600">
                Weekly distribution of food packages to families in need across Eindhoven.
              </p>
              <div className="mt-4 bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full w-3/4"></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">75% of yearly goal reached</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Student Support Program</h3>
              <p className="text-gray-600">
                Providing assistance and community for international students in Eindhoven.
              </p>
              <div className="mt-4 bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full w-1/2"></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">50% of yearly goal reached</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Community Center Development</h3>
              <p className="text-gray-600">
                Establishing a new community center to serve as a hub for our outreach programs.
              </p>
              <div className="mt-4 bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full w-1/4"></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">25% of yearly goal reached</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChurchWork;