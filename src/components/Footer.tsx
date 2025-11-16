const Footer = () => {
  const footerLinks = [
    {
      title: 'Company',
      links: ['About', 'Careers', 'Contact'],
    },
    {
      title: 'Support',
      links: ['Help Center', 'Safety', 'Privacy'],
    },
    {
      title: 'Legal',
      links: ['Terms', 'Privacy', 'Cookie Policy'],
    },
  ];

  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <h3 className="text-2xl font-bold mb-4">BikeMarket</h3>
            <p className="text-gray-400">
              Your trusted marketplace for buying and selling used bikes.
            </p>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; 2024 BikeMarket. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;