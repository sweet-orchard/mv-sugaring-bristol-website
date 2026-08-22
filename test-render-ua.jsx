import React, { useEffect } from 'react';
import { renderToString } from 'react-dom/server';
import ServicesSection from './src/components/ServicesSection.jsx';
import { LangProvider, useLang } from './src/context/LangContext.jsx';

const TestComponent = () => {
  const { setLang } = useLang();
  // Simulate setting to UA
  setLang('ua');
  return <ServicesSection />;
}

try {
  const html = renderToString(
    <LangProvider>
      <TestComponent />
    </LangProvider>
  );
  console.log("SUCCESS");
} catch (e) {
  console.error("ERROR:", e);
}
