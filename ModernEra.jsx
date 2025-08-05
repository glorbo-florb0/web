import NavigationMenu from '../components/NavigationMenu';

export default function ModernEra() {
  const tanks = [
    {
      name: "American M1A2 SEP v3 Abrams",
      year: "2017",
      country: "United States",
      description: "The latest variant of the Abrams features advanced electronics, improved armor, and enhanced lethality. It includes the Trophy active protection system and upgraded fire control.",
      image: "/pictures/201.webp",
      specs: {
        weight: "69.5 tons",
        crew: "4 men",
        armor: "Composite + ERA",
        speed: "67 km/h"
      }
    },
    {
      name: "German Leopard 2A7",
      year: "2014",
      country: "Germany",
      description: "The Leopard 2A7 represents the pinnacle of German tank design with enhanced protection, digital systems, and urban warfare capabilities. It's considered one of the world's most advanced tanks.",
      image: "/pictures/203.webp",
      specs: {
        weight: "67.5 tons",
        crew: "4 men",
        armor: "Composite + AMAP",
        speed: "68 km/h"
      }
    },
    {
      name: "British Challenger 3",
      year: "2021",
      country: "United Kingdom",
      description: "The Challenger 3 is a complete modernization of the Challenger 2, featuring a new 120mm smoothbore gun, digital architecture, and enhanced protection systems.",
      image: "/pictures/202.webp",
      specs: {
        weight: "66 tons",
        crew: "4 men",
        armor: "Chobham 3",
        speed: "59 km/h"
      }
    },
    {
      name: "Russian T-14 Armata",
      year: "2015",
      country: "Russia",
      description: "The T-14 Armata is Russia's first post-Soviet tank design, featuring an unmanned turret, active protection systems, and advanced electronics. It represents a new generation of Russian armor.",
      image: "/pictures/200.webp",
      specs: {
        weight: "48 tons",
        crew: "3 men",
        armor: "Composite + APS",
        speed: "80 km/h"
      }
    },
    {
      name: "South Korean K2 Black Panther",
      year: "2014",
      country: "South Korea",
      description: "The K2 Black Panther is one of the most advanced tanks in Asia, featuring indigenous design, advanced fire control, and composite armor. It's designed for Korean terrain and requirements.",
      image: "/pictures/6.png",
      specs: {
        weight: "55 tons",
        crew: "3 men",
        armor: "Composite + ERA",
        speed: "70 km/h"
      }
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <NavigationMenu />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-800 to-gray-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">Modern Era Tanks</h1>
          <p className="text-xl text-gray-300">
            The cutting edge of armored warfare technology in the 21st century
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">The Digital Battlefield</h2>
          <p className="text-gray-700 leading-relaxed">
            Modern tanks represent the convergence of advanced materials science, digital technology, 
            and precision engineering. Today's tanks feature sophisticated electronics, active protection 
            systems, and network-centric warfare capabilities that would have been science fiction just 
            decades ago.
          </p>
        </div>

        {/* Tanks Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {tanks.map((tank, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
              <div className="relative h-64">
                <img 
                  src={tank.image} 
                  alt={tank.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded text-sm font-semibold">
                  {tank.country}
                </div>
                <div className="absolute top-4 right-4 bg-gray-800 text-white px-3 py-1 rounded text-sm">
                  {tank.year}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{tank.name}</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {tank.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-semibold text-gray-900">Weight:</span>
                    <span className="text-gray-600 ml-2">{tank.specs.weight}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">Crew:</span>
                    <span className="text-gray-600 ml-2">{tank.specs.crew}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">Armor:</span>
                    <span className="text-gray-600 ml-2">{tank.specs.armor}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">Speed:</span>
                    <span className="text-gray-600 ml-2">{tank.specs.speed}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Historical Context */}
        <div className="mt-16 bg-gray-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">21st Century Innovations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Active Protection Systems</h4>
              <p>
                Modern tanks feature active protection systems that can detect and intercept incoming 
                threats before they reach the tank. These systems use radar, sensors, and countermeasures 
                to provide an additional layer of defense.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Network-Centric Warfare</h4>
              <p>
                Today's tanks are integrated into digital battlefield networks, sharing information 
                with other units in real-time. This enables coordinated operations and enhanced 
                situational awareness across the battlefield.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p>&copy; 2024 Equinox Tanks. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
} 