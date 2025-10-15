import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center p-4 md:p-6">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
        Outside-In POV Builder
      </h1>
      <p className="mt-2 text-md sm:text-lg text-slate-400 max-w-2xl mx-auto">
        Build a powerful, customer-centric point of view for your sales outreach.
      </p>
    </header>
  );
};

export default Header;