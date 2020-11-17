import React, {useEffect, useState} from "react";
import TextField from "src/App/components/TextFields/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import acionistaService from "src/App/services/Acionista/AcionistaService.js";

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

const AcionistaAutoComplete = (props) => {
  const [options, setOptions] = useState([]);
  const [inputSearch, setInputSearch] = useState("");

  const debounceOnChange = React.useCallback(
    debounce(value => {
      setInputSearch(value);
    }, 400),
    []
  );

  const {
    values: { acionista, acionistaInformado },
    errors,
    touched,
    setFieldTouched,
    setFieldValue,
  } = props;
  
  useEffect(() => {
    if (inputSearch === '' || inputSearch.length <= 2) {
      setOptions(acionista ? [acionista] : []);
      return undefined;
    }
    let params = [{chave: 'ativo', valor: true}, {chave: 'search', valor: inputSearch}, {chave: 'size', valor: 5}];
    acionistaService.getAllByParamsPageable(params).then((data) => {
      setOptions(data.content)
    })
  }, [inputSearch, acionista]);

  const handleChangeAcionista = (value) => {
    debounceOnChange(value);
  }

  const change = (name, value, e) => {
    setFieldValue(name, value?.id || "");
    setFieldTouched(name, true, true);
    setFieldValue("acionista", value? value : "")
  };

  const onBlur = (name, e) => {
    setFieldTouched(name, true, true);
  };

  return (
    <React.Fragment>
      <Autocomplete
        id="acionista-autocomplete"
        options={options}
        noOptionsText={'Digite para filtrar'}
        getOptionLabel={(option) => `${option ? option.nome : ""}`}
        value={acionista || ""}
        disabled={acionistaInformado}
        onBlur={() => {
          onBlur("codigoAcionista", null);
        }}
        onChange={(e, value) => {
          change("codigoAcionista", value, e);
        }}
        onInputChange={(event, newInputValue) => {
          handleChangeAcionista(newInputValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            name="codigoAcionista"
            id="codigoAcionista"
            helperText={touched.codigoAcionista ? errors.codigoAcionista : ""}
            error={touched.codigoAcionista && Boolean(errors.codigoAcionista)}
            label="Acionista"
            variant="outlined"
            fullWidth
          />
        )}
      />
    </React.Fragment>
  );
};

export default AcionistaAutoComplete;
