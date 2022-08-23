import { useState, useEffect } from "react";

function CollectionHeader({ collection, setShowHeader}) {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState([]);
  const {title, description, icon} = collection

  useEffect(() => {
    let starterFormData = {
        "title": title,
        "description": description,
        "icon": icon
    }
    console.log(starterFormData)
    setFormData(starterFormData);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    fetch(`/collections/${collection.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    }).then((r) => {
      if (r.ok) {
        r.json().then((collection) => {
          console.log(collection);
          setShowHeader(false)
        });
      } else {
        r.json().then((json) => setErrors(Object.entries(json.errors)));
      }
    });
  }

  function handleChange(e) {
    let { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  return (
    <div>
      {errors ? errors.map((e) => <div key={e[0]}>{e[1]}</div>) : null}
      <form onSubmit={handleSubmit}>
        <label>Collection Icon:</label>
        <input
          type="text"
          name="icon"
          placeholder={"Collection Icon..."}
          value={formData.icon}
          onChange={handleChange}
        />
        <label>Collection Title:</label>
        <input
          type="text"
          name="title"
          placeholder={"Collection Title..."}
          value={formData.title}
          onChange={handleChange}
        />
        <label>Description:</label>
        <textarea name="description" value={formData.description}onChange={handleChange} />
        <button>Update Collection Details</button>
      </form>
    </div>
  );
}

export default CollectionHeader;
