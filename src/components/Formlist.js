import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { uid } from "uid";
import Contact from "./Contact";
import axios from "axios";

const Formlist = () => {
  const [contacts, setContact] = useState([]);

  const endpoint = "http://localhost:3000/contacts";
  useEffect(() => {
    // ---fetch data
    fetch(endpoint).then((data) => {
      data.json().then((result) => {
        console.log(result);
        setContact(result);
      });
    });
    //// ---Axios
    // axios.get(endpoint).then((result) => {
    //   console.log(result.data);
    //   setContact(result?.data ?? []);
    // });
  }, []);
  // function handlerChange(event) {
  //   console.log(event.target);
  //   let formData = contacts;
  //   formData[event.target.name] = event.target.value;
  //   setContact(formData);
  // }

  // function handlerSubmit() {
  //   console.log("adasda");
  // }

  // UPDATE DATA
  const [isUpdate, setIsUpdate] = useState({
    id: null,
    status: false,
  });

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
  });

  function handleChange(e) {
    let data = { ...formData };
    data[e.target.name] = e.target.value;
    setFormData(data);
    // console.log(formData)
  }

  function handleSubmit(e) {
    // const error = alert("isi semua form");
    e.preventDefault();
    let data = [...contacts];

    if (formData.name === "") {
      return false;
    }
    if (formData.address === "") {
      return false;
    }
    if (formData.email === "") {
      return false;
    }
    if (isUpdate.status) {
      data.forEach((contact) => {
        if (contact.id === isUpdate.id) {
          contact.name = formData.name;
          contact.address = formData.address;
          contact.email = formData.email;
        }
      });
      axios
        .put(`${endpoint}/${isUpdate.id}`, {
          name: formData.name,
          address: formData.address,
          email: formData.email,
        })
        .then((result) => {
          alert("Berhasil Edit Data");
        });
    } else {
      let newData = { id: uid(), name: formData.name, address: formData.address, email: formData.email };
      data.push(newData);
      axios.post(endpoint, newData).then((result) => {
        alert("Data Berhasil Disimpan");
      });
    }
    // menambahkan contact
    // setIsUpdate({ id: null, status: false });
    setContact(data);
    setFormData({ name: "", address: "", email: "" });
    setIsUpdate({ id: null, status: false });
  }

  function handleDelete(id) {
    let data = [...contacts];
    let filterData = data.filter((contact) => contact.id !== id);
    axios.delete(`${endpoint}/${id}`).then((result) => {
      alert("Berhasil Menghapus Data");
    });
    setContact(filterData);
  }

  function handleEdit(id) {
    let data = [...contacts];
    let cariData = data.find((contact) => contact.id === id);
    setFormData({ name: cariData.name, address: cariData.address, email: cariData.email });
    setIsUpdate({ id: id, status: true });
  }
  return (
    <Container>
      <div>
        <h1 className="mb-3 ">CRUD</h1>
        <Form>
          <Form.Group className="mb-3 " controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            {/* <Form.Control type="text" placeholder="Enter Name" name="name" onChange={(e) => handlerChange(e)} /> */}
            <Form.Control type="text" placeholder="Enter Name" name="name" value={formData.name} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" placeholder="Enter Address" name="address" value={formData.address} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" placeholder="Enter email" name="email" value={formData.email} onChange={handleChange} />
          </Form.Group>

          <Button className="mb-3" variant="primary" type="button" onClick={(e) => handleSubmit(e)}>
            Submit
          </Button>
        </Form>
        <Contact handleDelete={handleDelete} handleEdit={handleEdit} list={contacts}></Contact>
      </div>
    </Container>
  );
};

export default Formlist;
