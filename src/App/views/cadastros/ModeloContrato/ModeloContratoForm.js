import React from "react";
import { Formik } from 'formik';
import * as yup from 'yup';
import { Row, Col, Tabs, Tab } from "react-bootstrap";
import ModeloContrato from 'src/App/models/ModeloContrato/ModeloContrato';
import BreadcrumbForm from 'src/App/components/Views/BreadcrumbForm';
import FormComponent from 'src/App/components/Views/FormComponent';
import modeloService from "src/App/services/ModeloContrato/ModeloContratoService.js";
import ModeloContratoFormInfGerais from './components/ModeloContratoFormInfGerais';

const validationSchema = yup.object({
  formaPagamento: yup.string().required('Forma de pagamento é obrigatória'),
  tipoContrato: yup.string().required("Tipo de contrato é obrigatório"),
  modelo: yup.string().required("Modelo é obrigatório"),
  nomeModelo: yup.string().required("Nome do modelo é obrigatório")
});

class ModeloContratoForm extends FormComponent {

  state = {
    idx: '',
    modelo: undefined,
  }

  componentDidMount() {
    if(this.props.match.params && this.props.match.params.id) {
      if(this.props.match.params.id === 'novo') {
        this.props.history.goBack();
      } else if (Number(this.props.match.params.id)) {
        this.getByCodigo(modeloService, this.props.match.params.id).then(data => {
          this.setState({
            idx: data.codigo,
            modelo: new ModeloContrato(data)
          })
        });
      }
    }
  }

  salvar = async(modelo) => {
    await this.salvarModel(modeloService, modelo);
    this.props.history.goBack();
  }

  render() {
    if(this.state.modelo)
      return (
        <Formik
          initialValues={this.state.modelo}
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={values => {
            this.salvar(values);
          }}
        >
          { (props) =>
            <React.Fragment>
              <BreadcrumbForm 
                idx={this.state.idx} 
                title={'Modelo Contrato'} 
                viewPath={{title: 'Modelos', url: '/cadastros/modelos_contrato'}}
                // saveResource={props.handleSubmit} 
                disabled={!props.dirty || !props.isValid} 
              />
              <Row>
                <Col>
                  <Tabs defaultActiveKey="inf-gerais">
                    <Tab eventKey="inf-gerais" title={`Informações gerais`}>
                      <ModeloContratoFormInfGerais {...props}/>
                    </Tab>
                  </Tabs>
                </Col>
              </Row>
            </React.Fragment>
          }
        </Formik>
      );
    return(
      <React.Fragment>
      </React.Fragment>
    )
  }
};

export default ModeloContratoForm;
