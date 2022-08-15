import { useState } from "react";

function NewDeck({ user }) {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState([]);
  useEffect(() => {
    let starterFormData = {
      use_id: user.id,
      name: "",
      format: "Freeform",
      description: "",
    };
    setFormData(starterFormData);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/decks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    }).then((r) => {
      if (r.ok) {
        r.json().then((deck) => {
          console.log(deck);
          //navigate
        });
      } else {
        r.json().then((json) => setErrors(Object.entries(json.errors)));
      }
    });
  }

  function handleChange(e) {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  return (
    <div>
      {errors ? errors.map((e) => <div key={e[0]}>{e[1]}</div>) : null}
      <form onSubmit={handleSubmit}>
        <label>Deck Name:</label>
        <input
          type="text"
          name="name"
          placeholder={"Deck Name..."}
          onChange={handleChange}
        />
        <label>Format:</label>
        <select type="text" name="format" onChange={handleChange}>
          <option value="Freeform">Freeform</option>
          <option value="Eternal">Eternal</option>
          <option value="Progression">Progression</option>
        </select>
        <label>Description:</label>
        <textarea
          name="description"
          onChange={handleChange}/>
      </form>
    </div>
  );
}

export default NewDeck;
