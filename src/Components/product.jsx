import Axios from "axios";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import { Form, Button, Row, Col } from "react-bootstrap";

export default function Product() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [username, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [id, setId] = useState(11);
  const [street, setStreet] = useState("");
  const [suite, setSuite] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [companyName, setCmpName] = useState("");
  const [catchPhrase, setCatchPhrase] = useState("");
  const [bs, setBs] = useState("");

  const [editingId, setEditingId] = useState(null);
  
  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      Axios.get("https://jsonplaceholder.typicode.com/users")
        .then((res) => setUsers(res.data))
        .catch((err) => console.log(err));
    }
  }, []);

  const saveUsersToLocalStorage = (users) => {
    localStorage.setItem("users", JSON.stringify(users));
  };
  const postUser = () => {
    const newUser = {
      id: id,
      name: name,
      username: username,
      email: email,
      phone: phone,
      website: website,
      address: {
        street: street,
        suite: suite,
        city: city,
        zipcode: zipcode,
        geo: {
          lat: lat,
          lng: lng,
        },
      },
      
      company: {
        name: companyName,
        catchPhrase: catchPhrase,
        bs: bs,
      },
    };

    Axios.post("https://jsonplaceholder.typicode.com/users", newUser)
      .then((res) => {
        const updatedUsers = [...users, res.data];
        setUsers(updatedUsers);
        saveUsersToLocalStorage(updatedUsers);
        setId(id + 1);
        clearInputFields();
      })
      .catch((err) => console.log(err));
  };

  const deleteUser = (id) => {
    Axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => {
        const updatedUsers = users.filter((user) => user.id !== id);
        setUsers(updatedUsers);
        saveUsersToLocalStorage(updatedUsers);
      })
      .catch((err) => console.log(err));
  };

  const editUser = (id) => {
    const updatedUserData = {
      id: id,
      name: name,
      username: username,
      email: email,
      phone: phone,
      website: website,
      address: {
        street: street,
        suite: suite,
        city: city,
        zipcode: zipcode,
        geo: {
          lat: lat,
          lng: lng,
        },
      },
      
      company: {
        name: companyName,
        catchPhrase: catchPhrase,
        bs: bs,
      },
    };

    Axios.patch(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      updatedUserData
    )
      .then((res) => {
        const updatedUsers = users.map((user) =>
          user.id === id ? { ...user, ...res.data } : user
        );
        setUsers(updatedUsers);
        saveUsersToLocalStorage(updatedUsers);
        clearInputFields();
        setEditingId(null);
      })
      .catch((error) => {
        console.error("There was an error updating the user!", error);
      });
  };

  const handleEditClick = (user) => {
    setEditingId(user.id);
    setName(user.name);
    setuserName(user.username);
    setEmail(user.email);
    setPhone(user.phone);
    setWebsite(user.website);
    setStreet(user.address.street);
    setSuite(user.address.suite);
    setCity(user.address.city);
    setZipcode(user.address.zipcode);
    setLat(user.address.geo.lat);
    setLng(user.address.geo.lng);
    setCmpName(user.company.name);
    setCatchPhrase(user.company.catchPhrase);
    setBs(user.company.bs);
  };

  const clearInputFields = () => {
    setName("");
    setuserName("");
    setEmail("");
    setPhone("");
    setWebsite("");
    setStreet("");
    setSuite("");
    setCity("");
    setZipcode("");
  };

  return (
    <>
      <Container className="ContainerClass">
        <div className="inputClass">
          <Form className="FormClass">
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setuserName(e.target.value)}
                  placeholder="Username"
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone"
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Website</Form.Label>
                <Form.Control
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="Website"
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Street</Form.Label>
                <Form.Control
                  type="text"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder="Street"
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Suite</Form.Label>
                <Form.Control
                  type="text"
                  value={suite}
                  onChange={(e) => setSuite(e.target.value)}
                  placeholder="Suite"
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City"
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Zipcode</Form.Label>
                <Form.Control
                  type="text"
                  value={zipcode}
                  onChange={(e) => setZipcode(e.target.value)}
                  placeholder="Zipcode"
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Geo Lat</Form.Label>
                <Form.Control
                  type="text"
                  value={lat}
                  onChange={(e) => setLat(e.target.value)}
                  placeholder="Lat"
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Geo Lng</Form.Label>
                <Form.Control
                  type="text"
                  value={lng}
                  onChange={(e) => setLng(e.target.value)}
                  placeholder="Lng"
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  type="text"
                  value={companyName}
                  onChange={(e) => setCmpName(e.target.value)}
                  placeholder="Company Name"
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>CatchPhrase</Form.Label>
                <Form.Control
                  type="text"
                  value={catchPhrase}
                  onChange={(e) => setCatchPhrase(e.target.value)}
                  placeholder="CatchPhrase"
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>BS</Form.Label>
                <Form.Control
                  type="text"
                  value={bs}
                  onChange={(e) => setBs(e.target.value)}
                  placeholder="BS"
                />
              </Form.Group>
            </Row>
            {editingId ? (
              <Button variant="primary" onClick={() => editUser(editingId)}>
                Update User
              </Button>
            ) : (
              <Button variant="primary" onClick={postUser}>
                Post User
              </Button>
            )}
          </Form>
        </div>
        <div className="TableClass">
          <Table striped bordered hover className="mt-5">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Address</th>
                <th>GEO</th>
                <th>Phone</th>
                <th>Website</th>
                <th>Company</th>
                <th>Action</th>
              </tr>
            </thead>
            {users.map((item, index) => (
              <tbody key={`${item.title}-${index}`}>
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>
                    {item &&
                      item.address &&
                      item.address.street &&
                      item.address.city && (
                        <p>
                          Street: {item.address.street} <br />
                          Suite : {item.address.suite} <br />
                          city : {item.address.city} <br />
                          Zipcode : {item.address.zipcode}{" "}
                        </p>
                      )}
                  </td>
                  <td>
                    {item &&
                      item.address &&
                      item.address.geo &&
                      item.address.geo.lat &&
                      item.address.geo.lng && (
                        <p>
                          LAT: {item.address.geo.lat} <br />
                          LNG : {item.address.geo.lng}{" "}
                        </p>
                      )}
                  </td>
                  <td>{item.phone}</td>
                  <td>{item.website}</td>
                  <td>
                    {item &&
                      item.company &&
                      item.company.name &&
                      item.company.catchPhrase &&
                      item.company.bs && (
                        <p>
                          Name: {item.company.name} <br />
                          catchPhrase : {item.company.catchPhrase} <br />
                          bs : {item.company.bs}{" "}
                        </p>
                      )}
                  </td>
                  <td className="Btn-class">
                    <Button
                      variant="secondary"
                      onClick={() => handleEditClick(item)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => deleteUser(item.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              </tbody>
            ))}
          </Table>
        </div>
      </Container>
    </>
  );
}
