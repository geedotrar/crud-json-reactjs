import { Table } from "react-bootstrap";

const Contact = ({ list, handleEdit, handleDelete }) => {
  return (
    <div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>Name</th>
            <th>Address</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* <tr>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr> */}
          {list.map((contact) => {
            return (
              <tr key={contact.id}>
                {/* <td>{contact.id}</td> */}
                <td>{contact.name}</td>
                <td>{contact.address}</td>
                <td>{contact.email}</td>
                <td>
                  <button onClick={() => handleEdit(contact.id)} type="button" className="btn btn-success">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(contact.id)} type="button" className="btn btn-danger ms-2">
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default Contact;
