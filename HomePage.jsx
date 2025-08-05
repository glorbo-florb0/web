import NavigationMenu from '../components/NavigationMenu';
import TableOfContents from '../components/TableOfContents';
import CommentForm from '../components/CommentForm';
import CorrectionPanel from '../components/CorrectionPanel';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <NavigationMenu />
      <CorrectionPanel />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-700 to-gray-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-8 text-yellow-300">Equinox Tanks</h1>

          {/* Hero Banner Image */}
          <div className="relative mb-8">
            <img
              src="/pictures/6.png"
              alt="Hero Banner"
              className="w-full max-w-2xl mx-auto rounded-lg shadow-lg"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-black bg-opacity-50 p-8 rounded-lg text-center">
                
              </div>
            </div>
          </div>

          {/* Privacy Notice */}
          <div className="text-right">
            <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded text-sm transition-colors">
              Privacy & Cookies Policy
            </button>
          </div>
        </div>
      </section>

      {/* Table of Contents Section */}
      <section className="max-w-4xl mx-auto px-6 py-8">
        <TableOfContents />

        {/* Main Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Equinox Tanks
        </h1>
      </section>

      {/* Article Section */}
      <article className="max-w-4xl mx-auto px-6 py-12">
        <header id="fiction" className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4"></h1>
        </header>

        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
          <p className="mb-6">
            Tanks have played a pivotal role in modern warfare since their first deployment during World War I. 
            Originally developed by the British in 1916 to break the deadlock of trench warfare, early tanks were 
            slow, cumbersome, and mechanically unreliable. However, they demonstrated the potential of armored 
            vehicles to traverse difficult terrain and provide mobile firepower. Over time, tank design evolved 
            rapidly, with improvements in armor, weaponry, and mobility. During World War II, tanks became central 
            to military strategy, particularly in the form of blitzkrieg tactics used by Germany. Iconic tanks like 
            the Soviet T-34, the German Tiger, and the American Sherman shaped battlefield outcomes. In the post-war 
            era, tanks adapted to new threats, incorporating composite armor, reactive armor, and advanced targeting 
            systems. The Cold War saw a massive proliferation of tanks, with both NATO and Warsaw Pact countries 
            developing increasingly sophisticated models. Today, tanks remain essential in many national armies, 
            valued for their firepower, protection, and ability to support infantry in combined arms operations. 
            Despite debates about their relevance in modern asymmetric warfare and drone-dominated conflicts, 
            tanks continue to evolve with technologies such as active protection systems and unmanned variants, 
            ensuring their place on future battlefields.
          </p>

          {/* Stock Image Attribution */}
          <div className="mt-6">
            <div className="w-32 h-16 bg-yellow-400 rounded mb-2"></div>
            <p className="text-xs text-gray-400">
              Stock footage and images from <a href="#" className="underline">depositphotos.com</a>
            </p>
          </div>
        </div>
      </article>

      {/* Comment Form (Optional) */}
      <section className="max-w-4xl mx-auto px-6 py-8">
        <CommentForm />
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo */}
            <div className="col-span-1 md:col-span-2">
              <div>
                <h3 className="text-lg font-bold">Equinox</h3>
                <h3 className="text-lg font-bold">Tanks</h3>
              </div>
              <p className="text-gray-400 mt-4">
                Exploring the fascinating world of tanks from history to fiction.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="font-semibold mb-4">Navigation</h4>
              <ul className="space-y-2 text-gray-400">
                <li>World War One ⌄</li>
                <li>World War Two ⌄</li>
                <li>Cold War ⌄</li>
                <li>Modern Era ⌄</li>
                <li className="text-yellow-400">Equinox Tanks ⌄</li>
                <li>Shop ⌄</li>
                <li>More ⌄</li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Contact</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p>&copy; 2024 Equinox Tanks. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
