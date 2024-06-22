import './Forma.css'
function Forma(){
    return(
        <div className="contact">
     
      <div className="center">
        <h1> Za dodatne informacije kontaktirajte nas </h1>

        <form>
          <label htmlFor="name">Ime</label>
          <input name="name" placeholder="Upišite svoje ime..." type="text" />
          <label htmlFor="email">Email </label>
          <input name="email" placeholder="Upišite email adresu..." type="email" />
          <label htmlFor="message">Poruka</label>
          <textarea
            rows="6"
            placeholder="Tekst poruke..."
            name="message"
            required
          ></textarea>
          <button onClick={()=>{ alert('Uspesno ste se poslali poruku!');}} type="submit"> Pošaljite poruku</button>
        </form>
      </div>
    </div>





    );





}

export default Forma;