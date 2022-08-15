import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function NewCollectionForm({ user }) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    let starterFormData = {
      user_id: (user ? user.id : 0),
      title: "",
      description: "",
    };
    setFormData(starterFormData);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/collections", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    }).then((r) => {
      if (r.ok) {
        r.json().then((collection) => {
          console.log(collection);
          navigate(`/user/collections`);
        });
      } else {
        r.json().then((json) => setErrors(Object.entries(json.errors)));
      }
    });
  }

  function goBack(e) {
    e.preventDefault();
    navigate(`/user/recipes`);
  }

  function handleChange(e) {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  return (
    <div className="card">
      {errors ? errors.map((e) => <div key={e[0]}>{e[1]}</div>) : null}
      { user ? <div>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          placeholder={"Collection Title"}
          onChange={handleChange}
        />
        <br />
        <label>Description</label>
        <textarea
          name="description"
          placeholder={"A description of this collection"}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Create!</button>
      </form>
      <br />
      <button onClick={(e) => goBack(e)}>Discard Collection</button>
      </div>
      : <div>Please login to create a collection</div>}
      
    </div>
  );
}

export default NewCollectionForm;
