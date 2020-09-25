import React, { useState, useEffect } from "react";
import axios from "axios";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";
import "./styles.css";

function debounce(func, wait) {
  let timeout;
  return function(...args) {
    const context = this;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      func.apply(context, args);
    }, wait);
  };
}

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [inputSearch, setInputSearch] = useState("");
  const [options, setOptions] = useState([]);

  const debounceOnChange = React.useCallback(
    debounce(value => {
      setInputSearch(value);
    }, 400),
    []
  );

  const [open, setOpen] = React.useState(false);
  const loading = open && options.length === 0;

  function handleChange(value) {
    setInputValue(value);
    debounceOnChange(value);
  }

  useEffect(() => {
    let active = true;

    (async () => {
      const response = await axios.get(
        "https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&polygon_svg=1&namedetails=1&q=:inputValue".replace(
          /:inputValue/gi,
          inputValue
        )
      );

      if (active) {
        console.log(response.data);
        setOptions(response.data);
      }
    })();
  }, [inputSearch]);

  return (
    <div className="App">
      <Autocomplete
        options={options}
        getOptionLabel={option => option.display_name}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        autoComplete
        loading={loading}
        inputValue={inputValue}
        includeInputInList
        disableOpenOnFocus
        onChange={(event, newValue) => console.log(newValue)}
        renderInput={params => (
          <TextField
            {...params}
            label="Search a location"
            variant="outlined"
            onChange={event => handleChange(event.target.value)}
            fullWidth
          />
        )}
        renderOption={option => {
          return <div>{option.display_name}</div>;
        }}
      />
    </div>
  );
}
