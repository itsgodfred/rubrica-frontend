import { useEffect, useState, useContext } from "react";
import image from "./images/icon.png";
import Datatable from "./Datatable";
import { toast } from "react-hot-toast";
import { GlobalContext } from "./GlobalState";
import add from "./images/add.svg";
import right from "./images/right.svg";

const Main = () => {
  const [contacts, setContacts] = useState([]);
  const [currentImage, setCurrentImage] = useState(add);
  const { newContact, setnewContact } = useContext(GlobalContext);
  const [info, setInfo] = useState({
    nome: "",
    cognome: "",
    numero: "",
  });
  const loadContacts = async () => {
    try {
      const response = await fetch("https://rubrica-server.vercel.app/contacts");

      const jsonData = await response.json();
      setContacts(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    loadContacts();
  }, []);

  useEffect(() => {
    if (newContact) {
      loadContacts();
      console.log(newContact);
      //setnewContact(false);
    }
  }, [newContact, setnewContact]);

  const addContact = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://rubrica-server.vercel.app/addcontact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(info),
      });

      const jsonData = await response.json();
      if (jsonData.error) {
        toast.error(jsonData.error);
      } else {
        toast.success("Contact Added");
        setContacts((prevContacts) => [...prevContacts, jsonData]);
        console.log(jsonData);
        setInfo({
          nome: "",
          cognome: "",
          numero: "",
        });

        setnewContact(true);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const toggleImage = () => {
    const element = document.querySelector(".left");
    if (currentImage === add) {
      if (element.classList.contains("slideOut"))
        element.classList.remove("slideOut");
      element.classList.add("slideIn");
      setCurrentImage(right);
    } else {
      if (element.classList.contains("slideIn"))
        element.classList.remove("slideIn");
      element.classList.add("slideOut");
      setCurrentImage(add);
    }
  };

  return (
    <div className="Main">
      <div className="float">
        <div className="float-amount">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.9rem"
            height="1.9rem"
            viewBox="0 0 24 24"
            onClick={() => {
              setnewContact(true);
            }}
          >
            <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2h11A2.5 2.5 0 0 1 20 4.5v14.25a.75.75 0 0 1-.75.75H5.5a1 1 0 0 0 1 1h12.75a.75.75 0 0 1 0 1.5H6.5A2.5 2.5 0 0 1 4 19.5zM14 8a2 2 0 1 0-4 0a2 2 0 0 0 4 0m1.5 4.5A1.5 1.5 0 0 0 14 11h-4a1.5 1.5 0 0 0-1.5 1.5c0 1.25 1 2.5 3.5 2.5s3.5-1.255 3.5-2.5" />
          </svg>
          <h4>{contacts.length} contacts</h4>
        </div>
        <img onClick={toggleImage} id="arrow" src={currentImage} alt="" />
      </div>
      <div className="left">
        <div className="contact-amount">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.9rem"
            height="1.9rem"
            viewBox="0 0 24 24"
            onClick={() => {
              setnewContact(true);
            }}
          >
            <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2h11A2.5 2.5 0 0 1 20 4.5v14.25a.75.75 0 0 1-.75.75H5.5a1 1 0 0 0 1 1h12.75a.75.75 0 0 1 0 1.5H6.5A2.5 2.5 0 0 1 4 19.5zM14 8a2 2 0 1 0-4 0a2 2 0 0 0 4 0m1.5 4.5A1.5 1.5 0 0 0 14 11h-4a1.5 1.5 0 0 0-1.5 1.5c0 1.25 1 2.5 3.5 2.5s3.5-1.255 3.5-2.5" />
          </svg>
          <div className="amount">
            <h3>All contacts</h3>
            <h4>{contacts.length} contacts</h4>
          </div>
        </div>
        <img id="illustration" src={image} alt="" />
        <form className="add-contact" onSubmit={addContact}>
          <div className="inputs">
            <input
              type="text"
              placeholder="Nome"
              id="name-input"
              value={info.nome}
              onChange={(e) =>
                setInfo((prevInfo) => ({
                  ...prevInfo,
                  nome: e.target.value,
                }))
              }
            />
            <input
              type="text"
              placeholder="Cognome"
              id="name-input"
              value={info.cognome}
              onChange={(e) =>
                setInfo((prevInfo) => ({
                  ...prevInfo,
                  cognome: e.target.value,
                }))
              }
            />
            <input
              type="text"
              placeholder="1234567890"
              id="numero-cel"
              value={info.numero}
              onChange={(e) =>
                setInfo((prevInfo) => ({
                  ...prevInfo,
                  numero: e.target.value,
                }))
              }
            />
          </div>
          <button id="btn" type="submit">
            Add
          </button>
        </form>
      </div>
      <div className="right">
        <Datatable />
      </div>
    </div>
  );
};

export default Main;
