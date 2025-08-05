import NavigationMenu from '../components/NavigationMenu';
import CommentSection from '../components/CommentSection';

export default function WorldWar3() {
  const tanks = [
    {
      name: "Soviet T-72",
      year: "1973",
      country: "Soviet Union",
      description: "The T-72 was the most produced tank of the Cold War era. It featured a 125mm smoothbore gun and composite armor, becoming the standard for Warsaw Pact forces.",
      image: "/pictures/200.webp",
      specs: {
        weight: "41 tons",
        crew: "3 men",
        armor: "Composite",
        speed: "60 km/h"
      }
    },
    {
      name: "American M1 Abrams",
      year: "1980",
      country: "United States",
      description: "The M1 Abrams introduced revolutionary features including composite armor, a gas turbine engine, and advanced fire control systems. It set new standards for tank design.",
      image: "/pictures/201.webp",
      specs: {
        weight: "54 tons",
        crew: "4 men",
        armor: "Composite",
        speed: "67 km/h"
      }
    },
    {
      name: "British Challenger 1",
      year: "1983",
      country: "United Kingdom",
      description: "The Challenger 1 featured Chobham composite armor and a 120mm rifled gun. It was designed for NATO's European battlefield requirements.",
      image: "/pictures/202.webp",
      specs: {
        weight: "62 tons",
        crew: "4 men",
        armor: "Chobham",
        speed: "56 km/h"
      }
    },
    {
      name: "German Leopard 2",
      year: "1979",
      country: "West Germany",
      description: "The Leopard 2 combined excellent mobility, firepower, and protection. It became one of the most successful tank exports of the Cold War period.",
      image: "/pictures/203.webp",
      specs: {
        weight: "55 tons",
        crew: "4 men",
        armor: "Composite",
        speed: "68 km/h"
      }
    },
    {
      name: "French AMX-30",
      year: "1966",
      country: "France",
      description: "The AMX-30 emphasized mobility over heavy armor, featuring a 105mm gun and relatively light weight. It represented France's independent defense policy.",
      image: "/pictures/204.webp",
      specs: {
        weight: "36 tons",
        crew: "4 men",
        armor: "Steel",
        speed: "65 km/h"
      }
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <NavigationMenu />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-800 to-gray-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">Cold War Tanks</h1>
          <p className="text-xl text-gray-300">
            The technological arms race and the evolution of modern tank warfare
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">The Cold War Arms Race</h2>
          <p className="text-gray-700 leading-relaxed">
            The Cold War period saw unprecedented technological advancement in tank design. 
            NATO and Warsaw Pact nations engaged in a continuous arms race, developing 
            increasingly sophisticated tanks with advanced armor, firepower, and electronics. 
            This era produced some of the most capable tanks ever built.
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
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Technological Innovation</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Composite Armor</h4>
              <p>
                The Cold War saw the development of composite armor systems combining steel, 
                ceramics, and other materials. This provided superior protection against 
                shaped charge warheads and kinetic energy penetrators.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Fire Control Systems</h4>
              <p>
                Advanced fire control systems with laser rangefinders, thermal imaging, 
                and computerized ballistic solutions revolutionized tank accuracy and 
                first-hit probability.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <CommentSection page="worldwar3" />

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p>&copy; 2024 Equinox Tanks. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
} 