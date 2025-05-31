import React from 'react';
import { Users, Heart, Globe, HelpingHand as PrayingHands } from 'lucide-react';

const About = () => {
  return (
    <div className="space-y-12 py-12">
      {/* Hero Section */}
      <div
        className="relative h-[400px] bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/about/header.png')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">About Our Church</h1>
            <p className="text-xl md:text-2xl max-w-2xl">
              A vibrant, multicultural community of believers in Eindhoven
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
              To be a beacon of God's love in Eindhoven, transforming lives through the power of the Gospel and creating a community where every person can experience God's presence and purpose.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 text-lg">
              To spread the message of Jesus Christ, nurture spiritual growth, serve our community, and provide a welcoming home for people of all nations and backgrounds.
            </p>
          </div>
        </div>
      </section>

            {/* Relationships */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Relationships</h2>
            <p className="text-gray-600 text-lg">
              At Temple of Praise Ministries, we believe that relationship with God brings about new family relationships among Christian believers. In a world of broken relationships and fractured communities, we desire to demonstrate the truth of the Gospel by our care for one another.             </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Teaching and Learning</h2>
            <p className="text-gray-600 text-lg">
              As a church we want to see Jesus Christ exalted through biblical preaching that declares His Lordship over all aspects of life. Furthermore, we acknowledge our own need to grow in godliness, so we are committed to learning regularly from the Word of God as a community, in order that He would transform us by His Spirit.             </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Core Values</h2>
        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <PrayingHands className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Prayer</h3>
            <p className="text-gray-600">Maintaining constant communion with God through prayer and worship</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Users className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Community</h3>
            <p className="text-gray-600">Building strong relationships and supporting one another in faith</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Heart className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Love</h3>
            <p className="text-gray-600">Demonstrating God's love through service and compassion</p>
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

      
      {/* About Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">About Us</h2>
          <p className="text-gray-600 text-lg mb-4">
            We are a Bible believing Christian church Family. Jesus Christ forms the centrality of our faith. We are evangelical, and Pentecostal/Charismatic Christian Ministry.
          </p>
          <p className="text-gray-600 text-lg mb-4">
            Evangelical, in that, we emphasize the major tenets of Scripture; the fall of mankind, the inability of man to save him/herself apart from the saving grace of God through the finished work of Jesus Christ on the Cross, we also believe in the virgin birth of Jesus Christ, His ministry on earth backed by miracles; that He died , was buried and resurrected on the third day. We believe that He shall appear the second time to judge both the living and the dead. Jesus is fully man and fully God.
          </p>
          <p className="text-gray-600 text-lg mb-4">
            As Pentecostal/Charismatic church, we believe in the baptism of the Holy Spirit evidenced by speaking in tongues. We also believe that miracles are still happening in the Church today. We are fully aware that the Church is the mouthpiece of God in these end times. 
          </p>
          <p className="text-gray-600 text-lg">
            The Church must therefore stand out and stand tall in society, being light of the world and salt of the earth. Lastly, we believe that in all matters of faith and conduct, Scripture must be the ultimate authority as stated in 2Timothy 3:16.
          </p>

        </div>
      </section>

      {/* History */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our History</h2>
          <p className="text-gray-600 text-lg mb-4">
            Temple of Praise Ministries began as a small prayer group in Eindhoven, driven by a vision to create a spiritual home for international believers. Over the years, we have grown into a vibrant, multicultural congregation, serving the community and spreading God's love.
          </p>
          <p className="text-gray-600 text-lg">
            Today, we continue to grow and evolve, maintaining our commitment to spiritual excellence, community service, and creating an inclusive environment where people from all walks of life can worship and grow together in faith.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;