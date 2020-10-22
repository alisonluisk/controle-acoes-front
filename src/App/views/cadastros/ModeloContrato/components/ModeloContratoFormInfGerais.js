import React from "react";
import { Card } from "react-bootstrap";
import TextField from "src/App/components/TextFields/TextField";
import Box from "@material-ui/core/Box";
import FormikComponent from "src/App/components/Views/FormikComponent";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import { Editor } from "@tinymce/tinymce-react";

class ModeloContratoFormInfGerais extends FormikComponent {
  state = {};

  componentDidMount() {}

  handleEditorChange = (content, editor) => {
    this.props.setFieldValue("modelo", content, true);
  }

  render() {
    const {
      values: { versao, nomeModelo, modelo, tipoContrato, formaPagamento },
      errors,
      touched,
    } = this.props;

    return (
      <React.Fragment>
        <Card.Body>
        <Box width="100%" display="flex" flexDirection="column">
            <Grid container spacing={1}>
              <Grid item xs={12} sm={5} lg={2}>
                <TextField
                  autoFocus
                  select
                  id="tipoContrato"
                  name="tipoContrato"
                  helperText={touched.tipoContrato ? errors.tipoContrato : ""}
                  error={touched.tipoContrato && Boolean(errors.tipoContrato)}
                  value={tipoContrato || "FLEX"}
                  onBlur={this.blur.bind(null, "tipoContrato")}
                  onChange={this.change.bind(null, "tipoContrato")}
                  label="Tipo contrato"
                  fullWidth
                  disabled={true}
                >
                  <MenuItem selected value="FLEX">
                    <em>Flex</em>
                  </MenuItem>
                  <MenuItem value="PRIME">
                    <em>Prime</em>
                  </MenuItem>
                  <MenuItem value="LIS_MONEY">
                    <em>Lis Money</em>
                  </MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={5} lg={2}>
                <TextField
                  select
                  id="formaPagamento"
                  name="formaPagamento"
                  helperText={
                    touched.formaPagamento ? errors.formaPagamento : ""
                  }
                  error={
                    touched.formaPagamento && Boolean(errors.formaPagamento)
                  }
                  value={formaPagamento || "FLEX"}
                  onBlur={this.blur.bind(null, "formaPagamento")}
                  onChange={this.change.bind(null, "formaPagamento")}
                  label="Forma de pagamento"
                  fullWidth
                  disabled={true}
                >
                  <MenuItem selected value="AVISTA">
                    <em>À vista</em>
                  </MenuItem>
                  <MenuItem value="AINTEGRALIZAR">
                    <em>À integralizar</em>
                  </MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <TextField
                  id="nomeModelo"
                  name="nomeModelo"
                  helperText={touched.nomeModelo ? errors.nomeModelo : ""}
                  error={touched.nomeModelo && Boolean(errors.nomeModelo)}
                  value={nomeModelo || ""}
                  onChange={this.change.bind(null, "nomeModelo")}
                  onBlur={this.blur.bind(null, "nomeModelo")}
                  label="Nome do modelo"
                  fullWidth
                  disabled={true}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={2}>
                <TextField
                  id="versao"
                  name="versao"
                  value={versao ? versao.toFixed(1) : ""}
                  label="Versão"
                  fullWidth
                  disabled={true}
                />
              </Grid>
            </Grid>

            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Editor
                  initialValue={modelo}
                  init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                      "advlist autolink lists link image charmap print preview anchor",
                      "searchreplace visualblocks code fullscreen",
                      "insertdatetime media table paste code help wordcount",
                    ],
                    toolbar:
                      "undo redo | formatselect | bold italic backcolor | \
                      alignleft aligncenter alignright alignjustify | \
                      bullist numlist outdent indent | removeformat | help",
                  }}
                  onEditorChange={this.handleEditorChange}
                  disabled={true}
                />
              </Grid>
            </Grid>
          </Box>
        </Card.Body>
      </React.Fragment>
    );
  }
}

export default ModeloContratoFormInfGerais;
