import React from 'react';
// Ova linija koda uvozi React biblioteku koja nam omogućava korištenje React funkcionalnosti
import ReactDOM from 'react-dom/client';
// Ovdje uvozimo ReactDOM biblioteku koja omogućava manipulaciju DOM-om (Document Object Model) na klijentskoj strani.
import './App.css';
// Uvozimo CSS stilove za našu glavnu komponentu App.
import App from './App';
// Ovdje uvozimo glavnu App komponentu koja se nalazi u datoteci App.js.

const root = ReactDOM.createRoot(document.getElementById('root'));
// Kreiramo korijenski element (root) za našu React aplikaciju. Koristimo funkciju createRoot 
// iz ReactDOM biblioteke i ciljamo element s ID-em 'root' u našem HTML dokumentu.

// Ovom linijom počinjemo proces renderiranja naše aplikacije unutar korijenskog elementa.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
// Koristimo StrictMode komponentu kako bismo uključili strožu provjeru našeg koda. 
// Ovo nam pomaže otkriti potencijalne probleme u našoj aplikaciji tijekom razvoja.

// App - Ovo je naša glavna App komponenta koju smo uvezli ranije. Ona će biti renderirana unutar korijenskog elementa.

