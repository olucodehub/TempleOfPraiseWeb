import React from 'react';
import { Calendar, Mail, Phone } from 'lucide-react';

const Pastor = () => {
  return (
    <div className="space-y-12 py-12">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img
                className="h-96 w-full object-cover md:w-96"
                src="/images/pastor2.jpeg"
                alt="Pastor"
              />
              {/* <img
              className="h-96 w-full md:w-96 object-contain bg-white"
              src="/images/pastor2.jpeg"
              alt="Pastor"
            /> */}
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-purple-600 font-semibold">Lead Pastor</div>
              <h1 className="mt-2 text-4xl font-bold text-gray-900">Pastor Nelson Boateng Frimpong</h1>
              <div className="mt-4 space-y-4">
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>Serving since 20XX</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail className="h-5 w-5 mr-2" />
                  <a href="mailto:pastor@templeofpraise.nl" className="hover:text-purple-600">
                    pastor@templeofpraise.nl
                  </a>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="h-5 w-5 mr-2" />
                  <a href="tel:+31XXXXXXXXX" className="hover:text-purple-600">
                    +31 62 362 5365
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Biography */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Biography</h2>
          <div className="prose max-w-none text-gray-600">
            <p className="text-lg mb-4">
              Pastor Nelson Boateng Frimpong has been serving as the lead pastor of Temple of Praise Ministries since 20XX. With over 20 years of ministry experience, he brings a wealth of knowledge and spiritual insight to our congregation.
            </p>
            <p className="text-lg mb-4">
              Born and raised in Nigeria, Pastor John received his theological education from prestigious institutions and has served in various ministerial capacities across Africa and Europe before being called to lead our church in Eindhoven.
            </p>
            <p className="text-lg">
              His passion for multicultural ministry and commitment to building a diverse, inclusive community has been instrumental in shaping Temple of Praise Ministries into the vibrant church it is today. Pastor John's teaching style combines deep biblical insight with practical life application, making the Word of God accessible and relevant to everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Leadership */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Pastoral Vision</h2>
          <div className="prose max-w-none text-gray-600">
            <p className="text-lg mb-4">
              "My vision for Temple of Praise Ministries is to create a spiritual home where people from all nations can encounter God's presence, experience His love, and grow in their faith journey. We are committed to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Building a strong, united community of believers</li>
              <li>Equipping saints for the work of ministry</li>
              <li>Reaching out to the lost with the message of hope</li>
              <li>Raising the next generation of leaders</li>
              <li>Making a positive impact in Eindhoven and beyond</li>
            </ul>
            <p className="text-lg italic">
              Together, we can fulfill God's purpose for our lives and our community."
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pastor;