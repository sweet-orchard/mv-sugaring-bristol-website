import React from 'react';
import { renderToString } from 'react-dom/server';
import ServicesSection from './src/components/ServicesSection.jsx';
import { LangProvider } from './src/context/LangContext.jsx';

try {
  const html = renderToString(
    <LangProvider>
      <ServicesSection />
    </LangProvider>
  );
  console.log("SUCCESS");
} catch (e) {
  console.error("ERROR:", e);
}
