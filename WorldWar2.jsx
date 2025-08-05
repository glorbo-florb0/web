import NavigationMenu from '../components/NavigationMenu';
import CommentSection from '../components/CommentSection';

export default function WorldWar2() {
  const tanks = [
    {
      name: "German Tiger I",
      year: "1942",
      country: "Germany",
      description: "The Tiger I was one of the most feared tanks of WWII, known for its thick armor and powerful 88mm gun. It was heavily armored but mechanically complex and expensive to produce.",
      image: "/pictures/300.webp",
      specs: {
        weight: "57 tons",
        crew: "5 men",
        armor: "25-100mm",
        speed: "38 km/h"
      }
    },
    {
      name: "Soviet T-34",
      year: "1940",
      country: "Soviet Union",
      description: "The T-34 was a revolutionary tank that combined firepower, armor, and mobility. Its sloped armor design influenced tank design for decades to come.",
      image: "/pictures/301.webp",
      specs: {
        weight: "26.5 tons",
        crew: "4 men",
        armor: "45-90mm",
        speed: "55 km/h"
      }
    },
    {
      name: "American M4 Sherman",
      year: "1942",
      country: "United States",
      description: "The Sherman was the most produced tank of WWII. While not the most powerful, it was reliable, easy to maintain, and could be produced in large numbers.",
      image: "/pictures/302.webp",
      specs: {
        weight: "30.3 tons",
        crew: "5 men",
        armor: "51-76mm",
        speed: "48 km/h"
      }
    },
    {
      name: "British Churchill",
      year: "1941",
      country: "United Kingdom",
      description: "The Churchill was a heavy infantry tank designed to support infantry attacks. It was slow but heavily armored and could cross difficult terrain.",
      image: "/pictures/303.webp",
      specs: {
        weight: "40.7 tons",
        crew: "5 men",
        armor: "16-152mm",
        speed: "24 km/h"
      }
    },
    {
      name: "German Panther",
      year: "1943",
      country: "Germany",
      description: "The Panther was Germany's attempt to match the T-34's success. It featured excellent firepower and mobility but suffered from mechanical reliability issues.",
      image: "/pictures/304.webp",
      specs: {
        weight: "44.8 tons",
        crew: "5 men",
        armor: "16-100mm",
        speed: "55 km/h"
      }
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <NavigationMenu />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-800 to-gray-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">World War II Tanks</h1>
          <p className="text-xl text-gray-300">
            The evolution of armored warfare and the rise of modern tank design
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">The Golden Age of Tanks</h2>
          <p className="text-gray-700 leading-relaxed">
            World War II saw the tank come into its own as the dominant weapon of land warfare. 
            The conflict drove rapid technological advancement in armor, firepower, and mobility. 
            Nations developed their own doctrines and designs, leading to some of the most iconic 
            tanks in military history.
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
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Technological Revolution</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Armor Development</h4>
              <p>
                WWII saw the introduction of sloped armor, composite armor, and better metallurgy. 
                The race between armor and anti-tank weapons drove constant innovation in protection.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Firepower Evolution</h4>
              <p>
                Tank guns grew from 37mm to 88mm and beyond. The development of high-velocity 
                anti-tank guns and shaped charge warheads changed tank warfare forever.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <CommentSection page="worldwar2" />

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p>&copy; 2024 Equinox Tanks. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
} 