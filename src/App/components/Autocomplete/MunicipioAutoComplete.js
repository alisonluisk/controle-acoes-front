import React, {useEffect, useState} from "react";
import TextField from "src/App/components/TextFields/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import municipioService from "src/App/services/Municipio/MunicipioService.js";

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

const MunicipioAutoComplete = (props) => {
  const [options, setOptions] = useState([]);
  const [inputSearch, setInputSearch] = useState("");

  const debounceOnChange = React.useCallback(
    debounce(value => {
      setInputSearch(value);
    }, 400),
    []
  );

  const {
    values: { municipio },
    errors,
    touched,
    setFieldTouched,
    setFieldValue,
  } = props;

  useEffect(() => {
    if (inputSearch === '' || inputSearch.length <= 2) {
      setOptions(municipio ? [municipio] : []);
      return undefined;
    }
    municipioService.findAllByNome(inputSearch).then((data) => {
      setOptions(data.slice(0,5))
    })
  }, [inputSearch, municipio]);

  const handleChangeMunicipio = (value) => {
    debounceOnChange(value);
  }

  const change = (name, value, e) => {
    setFieldValue(name, value?.id || "");
    setFieldTouched(name, true, true);
    setFieldValue("municipio", value? value : "")
  };

  const onBlur = (name, e) => {
    setFieldTouched(name, true, true);
  };

  return (
    <React.Fragment>
      <Autocomplete
        id="municipio-autocomplete"
        options={options}
        noOptionsText={'Digite para filtrar'}
        getOptionLabel={(option) => `${option ? option.descricao : ""}`}
        value={municipio || ""}
        onBlur={() => {
          onBlur("codigoMunicipio", null);
        }}
        onChange={(e, value) => {
          change("codigoMunicipio", value, e);
        }}
        onInputChange={(event, newInputValue) => {
          handleChangeMunicipio(newInputValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            name="codigoMunicipio"
            id="codigoMunicipio"
            helperText={touched.codigoMunicipio ? errors.codigoMunicipio : ""}
            error={touched.codigoMunicipio && Boolean(errors.codigoMunicipio)}
            label="Município"
            variant="outlined"
            fullWidth
          />
        )}
      />
    </React.Fragment>
  );
};

export default MunicipioAutoComplete;
