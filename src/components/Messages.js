import React, { useRef, useEffect } from 'react';
import random from 'random';

/* funkcija pomocu kojih generiramo nasumicni broj i za to koristimo npm paket random koji se koristi u li elementu za key={randomId()} */
function randomId() {
  const id = random.float();
  return id;
}

function Messages(props) {
  // u komponenti Messages primamo dva propsa - korisnik i poruke
  const { korisnik, poruke } = props;

  // Koristimo hookove useRef i useEffect da bismo mogli dodati funkcionalnost 
  // automatskog pomicanja na vrh kada se doda nova poruka. useRef hook koristimo 
  // za referencu na element liste, a useEffect hook koristimo da bi se funkcija koja 
  // pomiče na vrh pokrenula nakon svake promjene u nizu poruka.
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [poruke]);

  const ispisiPoruke = (message) => {
    // definiramo funkciju ispisiPoruke koja prima jednu poruku iz niza poruka 
    // i vraća HTML elemente koji prikazuju tu poruku. Uzimamo podatke o korisniku i poruci te ih prikazujemo u HTML-u.
    const { member, text } = message;
    const stil = member.id === korisnik.id ? "poruka-trenutni-korisnik" : "poruka";
    const stilPoruka = member.id === korisnik.id ? "boja-poruke-trenutni" : "boja-poruke";
    const sadrzajStil = member.id === korisnik.id ? "poruka-sadrzaj-trenutni" : "poruka-sadrzaj";
    return(
      <li className={stil} key={randomId()}>
        <div className={sadrzajStil}>
          <div className="username">
            {member.clientData.username}
          </div>
          <div className={stilPoruka}> 
            <p>{text}</p>
          </div>
        </div>
      </li>
    )
  };
  
  /* uzimamo props poruke iz App komponente i sa map() metodom prolazimo kroz sve clanove niza poruke i saljemo ih u gore definiranu funkciju */
  // obrnuli redoslijed poruka da bi prikazali pozivom funkcije ispisiPoruke za svaki element. 
  // Vraćamo HTML elemente s porukama.
        return(
    <div className="lista-div">
      <ul className="lista-poruka">
        {poruke.slice(0).reverse().map((el, i) => (
          ispisiPoruke(el, i)
        ))}
      </ul>
    </div>
  );
}  

export default Messages;
