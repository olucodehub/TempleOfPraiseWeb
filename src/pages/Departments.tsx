import React from 'react';
import { Music, Users, Heart, Book, Shield as Child, Mic, SprayCan as Pray, Camera } from 'lucide-react';

const departments = [
  {
    name: 'Worship Ministry',
    icon: Music,
    description: 'Leading the congregation in praise and worship, including choir and musical instruments.',
    leader: 'Sister Mary Johnson',
  },
  {
    name: 'Children\'s Ministry',
    icon: Child,
    description: 'Nurturing young minds in the ways of the Lord through age-appropriate teaching and activities.',
    leader: 'Brother David Smith',
  },
  {
    name: 'Prayer Ministry',
    icon: Pray,
    description: 'Coordinating prayer meetings and maintaining the spiritual atmosphere of the church.',
    leader: 'Sister Grace Williams',
  },
  {
    name: 'Media & Technical',
    icon: Camera,
    description: 'Managing sound, video, and online presence of the church.',
    leader: 'Brother Michael Brown',
  },
  {
    name: 'Ushering',
    icon: Users,
    description: 'Ensuring a warm welcome and maintaining order during services.',
    leader: 'Sister Sarah Anderson',
  },
  {
    name: 'Welfare',
    icon: Heart,
    description: 'Supporting members in need and coordinating community outreach programs.',
    leader: 'Brother James Wilson',
  },
  {
    name: 'Bible Study',
    icon: Book,
    description: 'Organizing and leading weekly Bible study sessions and discipleship programs.',
    leader: 'Brother Peter Thompson',
  },
  {
    name: 'Evangelism',
    icon: Mic,
    description: 'Coordinating outreach activities and spreading the gospel in our community.',
    leader: 'Sister Rachel Davis',
  },
];

const Departments = () => {
  return (
    <div className="space-y-12 py-12">
      {/* Hero Section */}
      <div
        className="relative h-[400px] bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1511818966892-d7d671e672a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Church Departments</h1>
            <p className="text-xl md:text-2xl max-w-2xl">
              Serving God and our community through various ministries
            </p>
          </div>
        </div>
      </div>

      {/* Departments Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {departments.map((dept) => {
            const Icon = dept.icon;
            return (
              <div key={dept.name} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-100 rounded-full p-3">
                    <Icon className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="ml-3 text-xl font-semibold text-gray-900">{dept.name}</h3>
                </div>
                <p className="text-gray-600 mb-4">{dept.description}</p>
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-500">
                    Department Leader: <span className="font-medium text-gray-900">{dept.leader}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Join a Department */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-purple-50 rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Get Involved</h2>
          <p className="text-lg text-gray-600 mb-6">
            We believe every member has a unique gift to contribute to the body of Christ. 
            Would you like to serve in any of our departments?
          </p>
          <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
            Join a Department
          </button>
        </div>
      </section>
    </div>
  );
};

export default Departments;