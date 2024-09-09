import { useEffect, useState, useContext } from "react";
import DataTable from "react-data-table-component";
import icon from "./images/delete.png";
import { GlobalContext } from "./GlobalState";
import { toast } from "react-hot-toast";

const Datatable = () => {
  const { globalData, newContact, setnewContact } = useContext(GlobalContext);
  const [contacts, setContacts] = useState([]);
  const [record, setRecord] = useState(contacts);

  const loadContacts = async () => {
    try {
      const response = await fetch("https://rubrica-server.vercel.app/contacts");

      const jsonData = await response.json();
      console.log(jsonData);
      setContacts(jsonData);
      setRecord(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const deleteContact = async (id) => {
    try {
      const response = await fetch(
        `https://rubrica-server.vercel.app/deletecontact/${id}`,
        {
          method: "DELETE",
        }
      );
      const jsonData = await response.json();
      toast.success(jsonData.message);
      loadContacts();
      setnewContact(true);
    } catch (err) {
      console.error("Failed to delete contact:", err);
    }
  };

  /*FILTRO PER LA RICERCA DI CONTACT*/
  useEffect(() => {
    const newData = contacts.filter((row) => {
      return (
        row.nome.toLowerCase().includes(globalData.toLowerCase()) ||
        row.cognome.toLowerCase().includes(globalData.toLowerCase())
      );
    });
    setRecord(newData);
  }, [globalData]);

  useEffect(() => {
    loadContacts();
  }, []);

  /*AGGIORNARE CONTACTS QUANDO VIENE AGGIUNTO UNO NUOVO*/
  useEffect(() => {
    if (newContact) {
      loadContacts();
      console.log(newContact);
      setnewContact(false);
    }
  }, [newContact, setnewContact]);

  const columns = [
    {
      name: "Name",
      selector: (row) => row.nome,
    },
    {
      name: "Surname",
      selector: (row) => row.cognome,
    },
    {
      name: "Number",
      selector: (row) => row.numero,
    },
    {
      name: "Action",
      cell: (row) => (
        <img
          id="delete"
          src={icon}
          alt=""
          onClick={() => deleteContact(row.contact_id)}
        />
      ),
    },
  ];
  return (
    <div className="datatable">
      <DataTable
        columns={columns}
        data={record}
        noDataComponent={<h4>No Contacts Stored</h4>}
        pagination
        paginationPerPage={7}
        paginationRowsPerPageOptions={[]}
      ></DataTable>
    </div>
  );
};

export default Datatable;
