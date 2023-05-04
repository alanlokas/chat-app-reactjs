import React, { useState } from "react";

function Input(props){
    const { onPoruka } = props;
    //  Destrukcija "onPoruka" iz "props" kako bismo ga koristili unutar komponente.

    // Deklariramo stanje "text" i funkciju za ažuriranje stanja "setText" s početnom vrijednošću praznog stringa.
    const [text, setText] = useState("");

    // Deklariramo stanje "isButtonDisabled" i funkciju za ažuriranje stanja "setIsButtonDisabled" s početnom vrijednošću "true".
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    
    /* mjenjamo stanje u vrijednost koju korisnik unese */
    const handleValueChange = (e) => {
        const value = e.target.value;
        setText(e.target.value);

        // Provjeravamo da li je unesen tekst u polje input, ako nije setIsButtonDisabled(false), tj. ovo će omogućiti ili onemogućiti gumb za slanje poruke.
        if (value.length > 0) {
            setIsButtonDisabled(false);
          } else {
            setIsButtonDisabled(true);
          }
    }

    /* Ova funkcija se poziva kada se forma "submita" (pošalje) */
    const onFormSubmit = (e) => {
        e.preventDefault(); // Poništavamo uobičajeno ponašanje forme kako ne bismo slali podatke.
        setText(""); // Postavljamo stanje "text" na prazan string za buduće unose.
        setIsButtonDisabled(true); // Postavljamo "isButtonDisabled" na "true" kako bi gumb bio onemogućen nakon slanja poruke.
        onPoruka(text); //  Pozivamo funkciju "onPoruka" s trenutnim tekstom kako bismo poslali poruku u stanje komponente.
    }
    
    /* stavljamo u form element da bi korisnik mogao pritiskom na tipku enter poslati poruku */
    /* disablamo tipku ako nije unesen tekst */
    return(
        <div className="input-div">
            <form onSubmit={e => onFormSubmit(e)} className="form">
                <input type="text" onChange={handleValueChange} placeholder="Write your message and press enter" autoFocus={true} value={text} className="inp"/>
                <button className="btn" disabled={isButtonDisabled} >Send!</button>
            </form>
        </div>
    )
}

export default Input;


