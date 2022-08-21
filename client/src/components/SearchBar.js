

function SearchBar(){

    /////refactor
  function handleSearchByName(e){
    e.preventDefault()
    let toSet = condensedCollection.filter(card => card.printing.info.name.toLowerCase().includes(e.target.value.toLowerCase()))
    setDisplayedCards(toSet)
  }
  function handleSearchByText(e){
    e.preventDefault()
    let toSet = condensedCollection.filter(card => {
      if('text' in card.printing.info) {
      return card.printing.info.text.toLowerCase().includes(e.target.value.toLowerCase())
      }
      else return false
    })
    setDisplayedCards(toSet)
  };
  function handleSearchByType(e){
    console.log(e.target.value)
    e.preventDefault()
    let toSet = condensedCollection.filter(card => card.printing.info.type.toLowerCase().includes(e.target.value.toLowerCase()))
    setDisplayedCards(toSet)
  }
  function handleSearchByManaCost(e){
    console.log(e.target.value)
    e.preventDefault()
    let toSet = condensedCollection.filter(card => card.printing.info.manaCost.toLowerCase().includes(e.target.value.toLowerCase()))
    setDisplayedCards(toSet)
  }
////refactor

    return(<div>
        <FormControl>
        <InputLabel
        >Search by card name</InputLabel>
        <Input name ="name" onChange={handleSearchByName}/>
      </FormControl>
      {/* <FormControl>
        <InputLabel
        >Search by color </InputLabel>
        <Input onChange={handleSearchByManaCost}/>
      </FormControl> */}
      <FormControl>
        <InputLabel
        >Search by card/creature type</InputLabel>
        <Input name = "type" onChange={handleSearchByType}/>
      </FormControl>
      {/* <FormControl>
        <InputLabel
        >Search by card text</InputLabel>
        <Input name = "text" onChange={handleSearchByText}/>
      </FormControl> */}
    </div>)
}

export default SearchBar;