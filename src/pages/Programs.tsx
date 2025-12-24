import { Music, Users, Heart, Globe, GraduationCap, HandHeart, Home, Briefcase } from 'lucide-react';

const programs = [
  {
    name: 'Music Academy',
    icon: Music,
    description: 'Music education for children and youth, including vocal training, instruments, and performance skills.',
    coordinator: 'Program Coordinator',
  },
  {
    name: 'Youth Development',
    icon: GraduationCap,
    description: 'Programs for young people focusing on personal development, mentorship, and skill building.',
    coordinator: 'Youth Coordinator',
  },
  {
    name: 'Immigrant Integration',
    icon: Globe,
    description: 'Supporting newcomers to the Netherlands with guidance, resources, and community connections.',
    coordinator: 'Integration Advisor',
  },
  {
    name: 'Community Counseling',
    icon: Users,
    description: 'Confidential support and guidance for individuals and families facing challenges.',
    coordinator: 'Counseling Team',
  },
  {
    name: 'Charity & Outreach',
    icon: HandHeart,
    description: 'Supporting homeless individuals, refugees, and those struggling with addiction through practical assistance.',
    coordinator: 'Outreach Coordinator',
  },
  {
    name: 'Housing Support',
    icon: Home,
    description: 'Assistance finding accommodation and navigating the Dutch housing system.',
    coordinator: 'Housing Advisor',
  },
  {
    name: 'Employment Guidance',
    icon: Briefcase,
    description: 'Help with job searching, CV writing, and understanding the Dutch job market.',
    coordinator: 'Employment Advisor',
  },
  {
    name: 'Welfare Support',
    icon: Heart,
    description: 'Connecting people with social services, benefits, and other resources they may be entitled to.',
    coordinator: 'Welfare Coordinator',
  },
];

const Programs = () => {
  return (
    <div className="space-y-12 py-12">
      {/* Hero Section */}
      <div
        className="relative h-[400px] bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Our Programs</h1>
            <p className="text-xl md:text-2xl max-w-2xl">
              Serving our community through various services and initiatives
            </p>
          </div>
        </div>
      </div>

      {/* Programs Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program) => {
            const Icon = program.icon;
            return (
              <div key={program.name} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-100 rounded-full p-3">
                    <Icon className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="ml-3 text-xl font-semibold text-gray-900">{program.name}</h3>
                </div>
                <p className="text-gray-600 mb-4">{program.description}</p>
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-500">
                    Contact: <span className="font-medium text-gray-900">{program.coordinator}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Get Involved */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-purple-50 rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Get Involved</h2>
          <p className="text-lg text-gray-600 mb-6">
            We believe everyone has something valuable to contribute.
            Would you like to volunteer or participate in any of our programs?
          </p>
          <button
            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            onClick={() => window.location.href = '/new-member'}
          >
            Join Our Community
          </button>
        </div>
      </section>
    </div>
  );
};

export default Programs;
