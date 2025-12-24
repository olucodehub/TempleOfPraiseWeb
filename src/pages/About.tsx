import { Users, Heart, Globe, HandHeart, Music, GraduationCap } from 'lucide-react';

const About = () => {
  return (
    <div className="space-y-12 py-12">
      {/* Hero Section */}
      <div
        className="relative h-[400px] bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">About Us</h1>
            <p className="text-xl md:text-2xl max-w-2xl">
              A vibrant, multicultural community organization in Eindhoven
            </p>
          </div>
        </div>
      </div>

      {/* Vision & Mission */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
            <p className="text-gray-600 text-lg">
              To be a beacon of hope and support in Eindhoven, transforming lives through compassion, education, and community service — creating a place where every person can find purpose and belonging.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 text-lg">
              To support immigrants and refugees in their integration journey, provide music education for youth, offer charitable services to those in need, and create a welcoming community for people of all nations and backgrounds.
            </p>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Community Relationships</h2>
            <p className="text-gray-600 text-lg">
              At Temple of Praise Ministries, we believe that strong relationships form the foundation of a thriving community. In a world of disconnection and isolation, we desire to demonstrate the power of unity by our care for one another.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Education and Growth</h2>
            <p className="text-gray-600 text-lg">
              We are committed to personal development and education. Through our music academy, counseling services, and integration programs, we help individuals develop skills, build confidence, and achieve their potential.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Core Values</h2>
        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <HandHeart className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Service</h3>
            <p className="text-gray-600">Dedicated to helping those in need through practical support and guidance</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Users className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Community</h3>
            <p className="text-gray-600">Building strong relationships and supporting one another</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Heart className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Compassion</h3>
            <p className="text-gray-600">Demonstrating care through service and understanding</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Globe className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Diversity</h3>
            <p className="text-gray-600">Embracing and celebrating our multicultural community</p>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What We Offer</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Globe className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Immigrant Services</h3>
            <p className="text-gray-600">
              We provide guidance and support for immigrants and refugees settling in the Netherlands, including integration assistance, counseling, and community connections.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Music className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Music Academy</h3>
            <p className="text-gray-600">
              Our music education program offers training for children and youth, nurturing talent and providing a creative outlet for self-expression.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <HandHeart className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Charity & Outreach</h3>
            <p className="text-gray-600">
              We support homeless individuals, those struggling with addiction, and others in vulnerable situations through practical assistance and compassionate care.
            </p>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Who We Are</h2>
          <p className="text-gray-600 text-lg mb-4">
            Temple of Praise Ministries is a community-focused organization dedicated to making a positive impact in Eindhoven and beyond. We are a diverse group of individuals united by our commitment to service, compassion, and community building.
          </p>
          <p className="text-gray-600 text-lg mb-4">
            Our organization brings together people from various backgrounds, cultures, and walks of life. We believe in the power of community to transform lives and create positive change. Through our programs and services, we aim to support individuals in their personal growth journey.
          </p>
          <p className="text-gray-600 text-lg">
            Whether you're seeking support, looking to volunteer, or wanting to be part of a welcoming community, there's a place for you at Temple of Praise Ministries.
          </p>
        </div>
      </section>

      {/* History */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
          <p className="text-gray-600 text-lg mb-4">
            Temple of Praise Ministries began as a small community group in Eindhoven, driven by a vision to create a supportive environment for international residents. Over the years, we have grown into a vibrant, multicultural organization, serving the community through various programs and initiatives.
          </p>
          <p className="text-gray-600 text-lg">
            Today, we continue to grow and evolve, maintaining our commitment to excellence in service, community support, and creating an inclusive environment where people from all walks of life can find help, hope, and belonging.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
