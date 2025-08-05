import NavigationMenu from '../components/NavigationMenu';
import CommentSection from '../components/CommentSection';

export default function WorldWar1() {
  const tanks = [
    {
      name: "British Mark I Tank",
      year: "1916",
      country: "United Kingdom",
      description: "The first tank to see combat, the Mark I was developed to break the deadlock of trench warfare. It had a distinctive rhomboid shape and was armed with either 6-pounder guns or machine guns.",
      image: "/pictures/2.png",
      specs: {
        weight: "28 tons",
        crew: "8 men",
        armor: "6-12mm",
        speed: "6 km/h"
      }
    },
    {
      name: "French Renault FT",
      year: "1917",
      country: "France",
      description: "The Renault FT was the first tank with a fully rotating turret, setting the standard for modern tank design. It was small, agile, and highly successful.",
      image: "/pictures/1.png",
      specs: {
        weight: "6.5 tons",
        crew: "2 men",
        armor: "6-22mm",
        speed: "7 km/h"
      }
    },
    {
      name: "German A7V Sturmpanzerwagen",
      year: "1918",
      country: "Germany",
      description: "Germany's only operational tank of WWI, the A7V was a large, boxy vehicle with multiple machine guns and a 57mm cannon. Only 20 were built.",
      image: "/pictures/3.png",
      specs: {
        weight: "30 tons",
        crew: "18 men",
        armor: "10-30mm",
        speed: "15 km/h"
      }
    },
    {
      name: "British Mark IV Tank",
      year: "1917",
      country: "United Kingdom",
      description: "An improved version of the Mark I, the Mark IV featured better armor and reliability. It was the most numerous British tank of the war.",
      image: "/pictures/4.png",
      specs: {
        weight: "28 tons",
        crew: "8 men",
        armor: "6-12mm",
        speed: "6 km/h"
      }
    },
    {
      name: "French Schneider CA1",
      year: "1916",
      country: "France",
      description: "France's first operational tank, the Schneider CA1 was based on a Holt tractor chassis. It was armed with a 75mm howitzer and machine guns.",
      image: "/pictures/5.png",
      specs: {
        weight: "13.5 tons",
        crew: "6 men",
        armor: "11-24mm",
        speed: "8 km/h"
      }
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <NavigationMenu />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-800 to-gray-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">World War I Tanks</h1>
          <p className="text-xl text-gray-300">
            The birth of armored warfare and the first tanks to see combat
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">The First Tanks</h2>
          <p className="text-gray-700 leading-relaxed">
            World War I marked the introduction of tanks to the battlefield. These early armored vehicles 
            were designed to break the deadlock of trench warfare by crossing no-man's land and destroying 
            enemy machine gun positions. Though primitive by today's standards, they revolutionized warfare 
            and set the foundation for modern armored combat.
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
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Historical Impact</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Tactical Innovation</h4>
              <p>
                The introduction of tanks in WWI marked a fundamental shift in warfare. These armored vehicles 
                could cross trenches, barbed wire, and other obstacles that had previously stopped infantry advances.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Technological Development</h4>
              <p>
                The early tanks were mechanically unreliable and slow, but they demonstrated the potential of 
                armored warfare and influenced all future tank development throughout the 20th century.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <CommentSection page="worldwar1" />

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p>&copy; 2024 Equinox Tanks. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
} 