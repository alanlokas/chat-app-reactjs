import React, { useState } from "react";

function Input(props){
    const { onPoruka } = props;

    /* definiramo stanje unutar komponente kako bi mogli spremiti vrjednost koju korisnik upise u polje za unos */
    const [text, setText] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    
    /* mjenjamo stanje u vrijednost koju korisnik unese */
    const handleValueChange = (e) => {
        const value = e.target.value;
        setText(e.target.value);

        // Provjeravamo da li je unesen tekst u polje input, ako nije setIsButtonDisabled(false), tj. tipka ostane u disable modu
        if (value.length > 0) {
            setIsButtonDisabled(false);
          } else {
            setIsButtonDisabled(true);
          }
    }

    /* sa ovom funkcijom prekidamo uobičajnu radnju form elementa tako sto ne saljemo podatke */
    /* praznimo stanje komponente za buduce unose */
    /* stavljamo funckiju uz propsa unutar ove funkcije da bi poslali poruku u stanje komponente */
    /* setIsButtonDisabled dodijeljujemo true */
    const onFormSubmit = (e) => {
        e.preventDefault();
        setText("");
        setIsButtonDisabled(true);
        onPoruka(text);
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


