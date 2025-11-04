import React, { useState } from 'react';
import {
  Building2,
  Mail,
  MapPin,
  Users,
  Target,
  Eye,
  Heart,
  Shield,
  FileText,
  Globe,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

const Foundation = () => {
  const [language, setLanguage] = useState<'nl' | 'en'>('nl');
  const [expandedSections, setExpandedSections] = useState<string[]>([
    'mission',
  ]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const content = {
    nl: {
      title: 'De Stichting',
      subtitle: 'Stichting tot Steun van Temple of Praise',
      hero: {
        title: 'Transparantie & Verantwoording',
        description:
          'Informatie over missie, beleid, bestuur, financiën en contactgegevens',
      },
      nav: {
        overview: 'Overzicht',
        mission: 'Missie & Visie',
        policy: 'Beleid',
        board: 'Bestuur',
        finances: 'Financiën',
        contact: 'Contact',
      },
      nameAndSeat: {
        title: 'Naam en Zetel',
        content:
          'De stichting draagt de naam "Stichting tot Steun van Temple of Praise". De stichting is gevestigd in Nederland, in de gemeente waar Temple of Praise haar activiteiten ontplooit. De stichting mag, indien gewenst, haar statutaire zetel verplaatsen binnen Nederland na besluit van het bestuur.',
      },
      fiscalInfo: {
        title: 'Fiscaal Nummer en Kamer van Koophandel',
        rsin: 'RSIN / Fiscaal Nummer',
        rsinNumber: '851673934',
        kvk: 'KvK Nummer',
        kvkNumber: '55369669',
      },
      mission: {
        title: 'Missie',
        content:
          'Het ondersteunen van de geloofs-, sociale en maatschappelijke activiteiten van de Temple of Praise, met bijzondere aandacht voor mensen in kwetsbare posities.',
      },
      vision: {
        title: 'Visie',
        content:
          'Door praktische, financiële en organisatorische hulp te bieden, draagt de stichting bij aan een inclusieve, veerkrachtige en spiritueel geïnspireerde gemeenschap.',
      },
      policy: {
        title: 'Hoofdlijnen van het Beleidsplan (2025-2028)',
        section1: {
          title: 'Financiële en Materiële Ondersteuning',
          items: [
            'Ondersteuning van het dagelijks functioneren en onderhoud van Temple of Praise.',
            'Financiering van educatieve projecten, trainingen en workshops.',
            'Verstrekken van noodhulp aan leden van de gemeenschap in acute situaties.',
            'Ondersteuning van sociale en culturele activiteiten die bijdragen aan verbinding en welzijn.',
          ],
        },
        section2: {
          title: "Projecten en Programma's",
          items: [
            "Maaltijdprogramma's voor gezinnen en alleenstaanden met een lager inkomen.",
            'Jeugd- en jongerenactiviteiten gericht op persoonlijke ontwikkeling en burgerschap.',
            'Voorlichtingscampagnes over gezondheid, opvoeding en welzijn.',
            'Culturele en muzikale evenementen ter bevordering van integratie en gemeenschapszin.',
          ],
        },
        section3: {
          title: 'Netwerkvorming en Samenwerking',
          content:
            'Samenwerking met lokale overheden, organisaties, bedrijven, vrijwilligers en donateurs om de maatschappelijke impact te vergroten.',
        },
      },
      principles: {
        title: 'Beleidsprincipes',
        items: [
          {
            title: 'Inclusiviteit',
            description:
              'De stichting is er voor iedereen, ongeacht afkomst of geloofsovertuiging.',
          },
          {
            title: 'Transparantie',
            description:
              'Helder communiceren over beleid en financiële middelen.',
          },
          {
            title: 'Duurzaamheid',
            description: 'Gericht op blijvende maatschappelijke impact.',
          },
          {
            title: 'Verantwoording',
            description: 'Jaarlijkse rapportage over resultaten en financiën.',
          },
        ],
      },
      board: {
        title: 'Bestuur en Organisatie',
        note: 'Bestuursleden ontvangen geen beloning voor hun werkzaamheden, met uitzondering van gemaakte onkosten.',
        members: [
          {
            name: 'Dr. N. B. Frimpong',
            role: 'Voorzitter',
          },
          {
            name: 'Dhr. J. B. Erskine',
            role: 'Penningmeester',
          },
          {
            name: 'Mvr. S. Frimpong-Tackie',
            role: 'Algemeen Bestuurslid',
          },
          {
            name: 'Mvr. T. van Rooij',
            role: 'Secretaresse',
          },
        ],
      },
      volunteers: {
        title: 'Vrijwilligersbeleid',
        items: [
          'Duidelijke instructies en begeleiding.',
          'Waardering en erkenning.',
          'Ruimte voor persoonlijke ontwikkeling en training.',
          'Een veilige en respectvolle werkomgeving.',
        ],
      },
      finances: {
        title: 'Financiën en Besteding van Middelen',
        content:
          'De stichting ontvangt inkomsten uit giften, donaties, subsidies en benefietactiviteiten. Minimaal 90% van de inkomsten wordt besteed aan de doelstellingen, maximaal 10% aan beheer en administratie. Er wordt jaarlijks een financieel verslag opgesteld en gepubliceerd op de website.',
        spending: {
          title: 'Besteding',
          objectives: 'Doelstellingen: Minimaal 90%',
          management: 'Beheer & Administratie: Maximaal 10%',
        },
      },
      communication: {
        title: 'Communicatie en Verantwoording',
        content:
          'De stichting communiceert via nieuwsbrieven, sociale media en bijeenkomsten en publiceert jaarlijks verslagen over activiteiten en resultaten.',
      },
      evaluation: {
        title: 'Evaluatie',
        content:
          'Het beleidsplan wordt jaarlijks geëvalueerd op basis van de behaalde resultaten en waar nodig bijgesteld.',
      },
      contact: {
        title: 'Contactgegevens',
        address: 'Beemdstraat 21',
        city: '5653 MA Eindhoven',
        country: 'Nederland',
        email: 'Email: (nog toe te voegen)',
      },
      reports: {
        title: 'Rapporten',
        financial: 'Financieel Rapport',
        activities: 'Activiteitenverslag',
        comingSoon: 'Binnenkort beschikbaar',
      },
    },
    en: {
      title: 'The Foundation',
      subtitle: 'Foundation for the Support of Temple of Praise',
      hero: {
        title: 'Transparency & Accountability',
        description:
          'Information about mission, policies, board, finances, and contact details',
      },
      nav: {
        overview: 'Overview',
        mission: 'Mission & Vision',
        policy: 'Policy',
        board: 'Board',
        finances: 'Finances',
        contact: 'Contact',
      },
      nameAndSeat: {
        title: 'Name and Registered Office',
        content:
          'The foundation bears the name "Foundation for the Support of Temple of Praise". It is established in the Netherlands, in the municipality where the Temple of Praise carries out its activities. The foundation may, if decided by the board, relocate its registered office within the Netherlands.',
      },
      fiscalInfo: {
        title: 'Fiscal and Chamber of Commerce Details',
        rsin: 'RSIN / Fiscal Number',
        rsinNumber: '851673934',
        kvk: 'Chamber of Commerce (KvK) Number',
        kvkNumber: '55369669',
      },
      mission: {
        title: 'Mission',
        content:
          'To support the faith-based, social, and community activities of the Temple of Praise, with special attention to those in vulnerable situations.',
      },
      vision: {
        title: 'Vision',
        content:
          'By providing practical, financial, and organizational assistance, the foundation contributes to an inclusive, resilient, and spiritually inspired community.',
      },
      policy: {
        title: 'Main Policy Objectives (2025-2028)',
        section1: {
          title: 'Financial and Material Support',
          items: [
            'Support daily operations and maintenance of the Temple of Praise.',
            'Fund educational projects, training, and workshops.',
            'Provide emergency relief to community members in need.',
            'Support social and cultural activities that promote unity and well-being.',
          ],
        },
        section2: {
          title: 'Projects and Programs',
          items: [
            'Meal programs for families and individuals with low income.',
            'Youth and young adult activities focused on growth and citizenship.',
            'Campaigns on health, parenting, and welfare.',
            'Cultural and musical events promoting integration.',
          ],
        },
        section3: {
          title: 'Networking and Cooperation',
          content:
            'Partnerships with local governments, organizations, volunteers, and donors to increase community impact.',
        },
      },
      principles: {
        title: 'Core Principles',
        items: [
          {
            title: 'Inclusivity',
            description: 'Open to all, regardless of background or belief.',
          },
          {
            title: 'Transparency',
            description: 'Clear communication about policies and finances.',
          },
          {
            title: 'Sustainability',
            description: 'Long-term, meaningful impact.',
          },
          {
            title: 'Accountability',
            description:
              'Annual reporting on results and financial statements.',
          },
        ],
      },
      board: {
        title: 'Board and Governance',
        note: 'Board members receive no remuneration for their work. Only actual expenses incurred may be reimbursed.',
        members: [
          {
            name: 'Dr. N. B. Frimpong',
            role: 'Chairperson',
          },
          {
            name: 'Mr. J. B. Erskine',
            role: 'Treasurer',
          },
          {
            name: 'Mrs. S. Frimpong-Tackie',
            role: 'General Board Member',
          },
          {
            name: 'Mrs. T. van Rooij',
            role: 'Secretary',
          },
        ],
      },
      volunteers: {
        title: 'Volunteers',
        items: [
          'Clear guidance and supervision.',
          'Appreciation and recognition.',
          'Opportunities for development and training.',
          'A safe and respectful working environment.',
        ],
      },
      finances: {
        title: 'Finances and Use of Funds',
        content:
          'Income sources include gifts, donations, subsidies, and benefit events. At least 90% of income is used directly for objectives, and a maximum of 10% for management and administration. An annual financial report will be prepared and published on the website.',
        spending: {
          title: 'Fund Allocation',
          objectives: 'Direct Objectives: At least 90%',
          management: 'Management & Administration: Maximum 10%',
        },
      },
      communication: {
        title: 'Communication and Accountability',
        content:
          'The foundation communicates via newsletters, social media, and meetings, and publishes annual reports on activities and results.',
      },
      evaluation: {
        title: 'Evaluation',
        content:
          'The policy plan is reviewed annually based on outcomes and adjusted where necessary.',
      },
      contact: {
        title: 'Contact Information',
        address: 'Beemdstraat 21',
        city: '5653 MA Eindhoven',
        country: 'The Netherlands',
        email: 'Email: info@templeofpraiseministries.nl',
      },
      reports: {
        title: 'Reports',
        financial: 'Financial Report',
        activities: 'Activities Report',
        comingSoon: 'Coming Soon',
      },
    },
  };

  const t = content[language];

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Hero Section */}
      <div
        className='relative h-[400px] bg-cover bg-center'
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")',
        }}
      >
        <div className='absolute inset-0 bg-gradient-to-r from-purple-900/90 to-purple-700/90' />
        <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center'>
          <div className='text-white'>
            <div className='flex items-center mb-4'>
              <Building2 className='h-12 w-12 mr-4' />
              <div>
                <h1 className='text-4xl md:text-5xl font-bold'>{t.title}</h1>
                <p className='text-xl text-purple-100 mt-2'>{t.subtitle}</p>
              </div>
            </div>
            <p className='text-xl md:text-2xl max-w-3xl mt-6'>
              {t.hero.description}
            </p>

            {/* Language Toggle */}
            <div className='mt-6 flex space-x-2'>
              <button
                onClick={() => setLanguage('nl')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  language === 'nl'
                    ? 'bg-white text-purple-700'
                    : 'bg-purple-800 text-white hover:bg-purple-700'
                }`}
              >
                Nederlands
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  language === 'en'
                    ? 'bg-white text-purple-700'
                    : 'bg-purple-800 text-white hover:bg-purple-700'
                }`}
              >
                English
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        {/* Name and Seat */}
        <section className='bg-white rounded-lg shadow-lg p-8 mb-8'>
          <div className='flex items-start mb-4'>
            <Building2 className='h-8 w-8 text-purple-600 mr-3 mt-1' />
            <div>
              <h2 className='text-3xl font-bold text-gray-900 mb-4'>
                {t.nameAndSeat.title}
              </h2>
              <p className='text-gray-700 text-lg leading-relaxed'>
                {t.nameAndSeat.content}
              </p>
            </div>
          </div>
        </section>

        {/* Fiscal Information */}
        <section className='bg-white rounded-lg shadow-lg p-8 mb-8'>
          <h2 className='text-3xl font-bold text-gray-900 mb-6'>
            {t.fiscalInfo.title}
          </h2>
          <div className='grid md:grid-cols-2 gap-6'>
            <div className='bg-purple-50 rounded-lg p-6'>
              <p className='text-sm font-semibold text-purple-600 uppercase tracking-wide mb-2'>
                {t.fiscalInfo.rsin}
              </p>
              <p className='text-3xl font-bold text-gray-900'>
                {t.fiscalInfo.rsinNumber}
              </p>
            </div>
            <div className='bg-purple-50 rounded-lg p-6'>
              <p className='text-sm font-semibold text-purple-600 uppercase tracking-wide mb-2'>
                {t.fiscalInfo.kvk}
              </p>
              <p className='text-3xl font-bold text-gray-900'>
                {t.fiscalInfo.kvkNumber}
              </p>
            </div>
          </div>
        </section>

        {/* Mission and Vision */}
        <section className='bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg shadow-lg p-8 mb-8 text-white'>
          <div className='grid md:grid-cols-2 gap-8'>
            <div>
              <div className='flex items-center mb-4'>
                <Target className='h-8 w-8 mr-3' />
                <h2 className='text-3xl font-bold'>{t.mission.title}</h2>
              </div>
              <p className='text-lg leading-relaxed text-purple-50'>
                {t.mission.content}
              </p>
            </div>
            <div>
              <div className='flex items-center mb-4'>
                <Eye className='h-8 w-8 mr-3' />
                <h2 className='text-3xl font-bold'>{t.vision.title}</h2>
              </div>
              <p className='text-lg leading-relaxed text-purple-50'>
                {t.vision.content}
              </p>
            </div>
          </div>
        </section>

        {/* Policy Objectives */}
        <section className='bg-white rounded-lg shadow-lg p-8 mb-8'>
          <h2 className='text-3xl font-bold text-gray-900 mb-6'>
            {t.policy.title}
          </h2>

          {/* Section 1 */}
          <div className='mb-6'>
            <h3 className='text-2xl font-semibold text-purple-700 mb-4'>
              1. {t.policy.section1.title}
            </h3>
            <ul className='space-y-2'>
              {t.policy.section1.items.map((item, index) => (
                <li key={index} className='flex items-start'>
                  <span className='text-purple-600 mr-2'>•</span>
                  <span className='text-gray-700'>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 2 */}
          <div className='mb-6'>
            <h3 className='text-2xl font-semibold text-purple-700 mb-4'>
              2. {t.policy.section2.title}
            </h3>
            <ul className='space-y-2'>
              {t.policy.section2.items.map((item, index) => (
                <li key={index} className='flex items-start'>
                  <span className='text-purple-600 mr-2'>•</span>
                  <span className='text-gray-700'>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 3 */}
          <div>
            <h3 className='text-2xl font-semibold text-purple-700 mb-4'>
              3. {t.policy.section3.title}
            </h3>
            <p className='text-gray-700 leading-relaxed'>
              {t.policy.section3.content}
            </p>
          </div>
        </section>

        {/* Core Principles */}
        <section className='bg-white rounded-lg shadow-lg p-8 mb-8'>
          <h2 className='text-3xl font-bold text-gray-900 mb-6'>
            {t.principles.title}
          </h2>
          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {t.principles.items.map((principle, index) => {
              const icons = [Users, Shield, Globe, FileText];
              const Icon = icons[index];
              return (
                <div
                  key={index}
                  className='bg-purple-50 rounded-lg p-6 text-center'
                >
                  <Icon className='h-12 w-12 text-purple-600 mx-auto mb-4' />
                  <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                    {principle.title}
                  </h3>
                  <p className='text-gray-600 text-sm'>
                    {principle.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Board Members */}
        <section className='bg-white rounded-lg shadow-lg p-8 mb-8'>
          <h2 className='text-3xl font-bold text-gray-900 mb-6'>
            {t.board.title}
          </h2>
          <div className='grid md:grid-cols-2 gap-6 mb-6'>
            {t.board.members.map((member, index) => (
              <div
                key={index}
                className='flex items-center p-4 bg-gray-50 rounded-lg'
              >
                <div className='w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mr-4'>
                  <Users className='h-8 w-8 text-purple-600' />
                </div>
                <div>
                  <p className='font-semibold text-gray-900 text-lg'>
                    {member.name}
                  </p>
                  <p className='text-purple-600'>{member.role}</p>
                </div>
              </div>
            ))}
          </div>
          <div className='bg-purple-50 rounded-lg p-4'>
            <p className='text-gray-700 italic'>{t.board.note}</p>
          </div>
        </section>

        {/* Volunteers */}
        <section className='bg-white rounded-lg shadow-lg p-8 mb-8'>
          <div className='flex items-center mb-6'>
            <Heart className='h-8 w-8 text-purple-600 mr-3' />
            <h2 className='text-3xl font-bold text-gray-900'>
              {t.volunteers.title}
            </h2>
          </div>
          <ul className='grid md:grid-cols-2 gap-4'>
            {t.volunteers.items.map((item, index) => (
              <li key={index} className='flex items-start'>
                <span className='text-purple-600 mr-2 text-xl'>✓</span>
                <span className='text-gray-700'>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Finances */}
        <section className='bg-white rounded-lg shadow-lg p-8 mb-8'>
          <h2 className='text-3xl font-bold text-gray-900 mb-6'>
            {t.finances.title}
          </h2>
          <p className='text-gray-700 text-lg leading-relaxed mb-6'>
            {t.finances.content}
          </p>

          {/* Spending Chart */}
          <div className='bg-purple-50 rounded-lg p-6'>
            <h3 className='text-xl font-semibold text-gray-900 mb-4'>
              {t.finances.spending.title}
            </h3>
            <div className='space-y-4'>
              <div>
                <div className='flex justify-between mb-2'>
                  <span className='font-semibold text-gray-700'>
                    {t.finances.spending.objectives}
                  </span>
                  <span className='text-purple-600 font-bold'>≥ 90%</span>
                </div>
                <div className='w-full bg-gray-200 rounded-full h-4'>
                  <div className='bg-purple-600 h-4 rounded-full w-[90%]'></div>
                </div>
              </div>
              <div>
                <div className='flex justify-between mb-2'>
                  <span className='font-semibold text-gray-700'>
                    {t.finances.spending.management}
                  </span>
                  <span className='text-gray-600 font-bold'>≤ 10%</span>
                </div>
                <div className='w-full bg-gray-200 rounded-full h-4'>
                  <div className='bg-gray-400 h-4 rounded-full w-[10%]'></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Communication */}
        <section className='bg-white rounded-lg shadow-lg p-8 mb-8'>
          <h2 className='text-3xl font-bold text-gray-900 mb-4'>
            {t.communication.title}
          </h2>
          <p className='text-gray-700 text-lg leading-relaxed'>
            {t.communication.content}
          </p>
        </section>

        {/* Evaluation */}
        <section className='bg-white rounded-lg shadow-lg p-8 mb-8'>
          <h2 className='text-3xl font-bold text-gray-900 mb-4'>
            {t.evaluation.title}
          </h2>
          <p className='text-gray-700 text-lg leading-relaxed'>
            {t.evaluation.content}
          </p>
        </section>

        {/* Reports Section - Coming Soon */}
        <section className='bg-gradient-to-r from-purple-100 to-purple-50 rounded-lg shadow-lg p-8 mb-8'>
          <h2 className='text-3xl font-bold text-gray-900 mb-6'>
            {t.reports.title}
          </h2>
          <div className='grid md:grid-cols-2 gap-6'>
            <div className='bg-white rounded-lg p-6 border-2 border-dashed border-purple-300'>
              <FileText className='h-12 w-12 text-purple-400 mb-4' />
              <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                {t.reports.financial}
              </h3>
              <p className='text-purple-600 font-semibold'>
                {t.reports.comingSoon}
              </p>
            </div>
            <div className='bg-white rounded-lg p-6 border-2 border-dashed border-purple-300'>
              <FileText className='h-12 w-12 text-purple-400 mb-4' />
              <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                {t.reports.activities}
              </h3>
              <p className='text-purple-600 font-semibold'>
                {t.reports.comingSoon}
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className='bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg shadow-lg p-8 text-white'>
          <div className='flex items-center mb-6'>
            <Mail className='h-8 w-8 mr-3' />
            <h2 className='text-3xl font-bold'>{t.contact.title}</h2>
          </div>
          <div className='space-y-4 text-lg'>
            <div className='flex items-start'>
              <MapPin className='h-6 w-6 mr-3 mt-1 flex-shrink-0' />
              <div>
                <p>{t.contact.address}</p>
                <p>{t.contact.city}</p>
                <p>{t.contact.country}</p>
              </div>
            </div>
            <div className='flex items-center'>
              <Mail className='h-6 w-6 mr-3 flex-shrink-0' />
              <p className='italic text-purple-100'>{t.contact.email}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Foundation;
