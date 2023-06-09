import './App.css';
import React from "react";
import { Messages, Input, Footer, Header } from "./components";
// Uvozimo komponente Messages, Input, Footer i Header iz mape "components".

/* funkcija pomocu kojih generiramo nasumicno ime i za to koristimo npm paket sillyname */
function randomName(){
  const randomName = require("sillyname");
  const name = randomName();
  return name;
}

/* funkciju pomocu kojih generiramo nasumicno boju avatara i za to koristimo npm paket randomcolor */
function randomColor(){
  const randomColor = require("randomcolor");
  const color = randomColor();
  return color;
}

// Kreiramo klasu App koja nasljeđuje React.Component.
class App extends React.Component {
  // Definiramo početno stanje komponente s dva atributa: "poruke" (prazan niz) i "korisnik" (objekt s nasumičnim imenom i bojom).
  state = {
    poruke: [],
    korisnik : {
      username: randomName(),
      color: randomColor()
    }
  }

  /* unutar constructora definiramo drone-a koji dobivamo iz Scaledrone servisa */
  /* pomocu njega omogucujemo slanje podataka i poruka */
  /* u data spremamo podatke o trenutnom korisniku - ako otvorimo aplikaciju u vise tabova na internet pregledniku svaki tab ce simulirati jednog korisnika */
  /* open event - definiramo sto ce se dogoditi ako dodje do pogreske i sto ce se dogoditi ako uspjesno dode do konekcije */
  /* definiramo varijablu member koja prima objekt korisnik i stavljamo ju na pocetak obejkta kao novi dio objekta korisnik pomocu spread operatora onda memberu dodajemo id koji dobijemo od Scaledrone (clientId) */
  /* member ubacujemo u stanje odma kada se korisnik spoji da bi lakse dosli do podataka o korisniku */
  constructor() {
    super();
    this.drone = new window.Scaledrone("CMacwJ3ss7YIs0hJ", {
      data: this.state.korisnik
    });
    // "open" događaj provjerava postoji li pogreška u vezi s konekcijom i ažurira "korisnik" objekt s "id" atributom (clientId) koji dolazi iz Scaledrone-a.
    this.drone.on("open", error => {
      if(error)
      {
        return console.error(error);
      }
      const member = {...this.state.korisnik};
      member.id = this.drone.clientId;
      this.setState({korisnik: member})
    });
   // "room" objekt omogućava spajanje na sobu za komunikaciju s drugim korisnicima.
   // drone.subscribe omogucava instanciranje sobe - soba mora imati prefiks observable da bi mogla sadrzavati informacije o pošiljatelju
    const room = this.drone.subscribe("observable-chatroom");
    /* koristimo message event za emitiranje poruke u sobi */
    /* message event je objekt koji u sebi ima podatke data(poruka koja je poslana), id(unikatan index poruke), timestamp, clientId(id clienta koji je posalo poruku) i member(objekt - podaci o korisniku koji je poslao poruku) */
    /* u ovom slucaju trebaju nam data i member */
    /* data i member koje dobijemo iz eventa ubacujemo u stanje komponente */
    /* message event prima podatke od drone.publisha */
    // "message" događaj prima podatke o porukama i korisnicima te ih dodaje u stanje komponente.
    room.on("message", message => {
      const { data, member } = message;
      const poruke = this.state.poruke;
      poruke.push({member, text: data});
      this.setState({poruke: poruke});
    })
  }

  /* funkcija koja prima poruku iz Input komponente pomocu propsa */
  /* drone.publish omogucuje slanje poruke i unutar njega moramo navesti ime sobe i podatke koji se salju u ovom slucaju se salju podaci iz inputa */
  handlePoruka = (message) => {
    this.drone.publish({
      room: "observable-chatroom",
      message
    })
  }

  // Render metoda koja vraća JSX kod s uključenim komponentama Header, Messages, Input i Footer te proslijeđuje potrebne podatke.
  render(){
  return (
    <div className="App">
      <Header className="App-header" />
      <Messages korisnik={this.state.korisnik} poruke={this.state.poruke} />
      <Input onPoruka={this.handlePoruka} />
      <Footer />
    </div>
  );}
}

export default App;
