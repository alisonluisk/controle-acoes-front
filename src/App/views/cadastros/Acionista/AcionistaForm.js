import React from "react";
import { Formik } from 'formik';
import * as yup from 'yup';
import { Row, Col, Tabs, Tab } from "react-bootstrap";
import BreadcrumbForm from 'src/App/components/Views/BreadcrumbForm';
import FormComponent from 'src/App/components/Views/FormComponent';
import acionistaService from "src/App/services/Acionista/AcionistaService.js";
import AcionistaFormInfGerais from './AcionistaFormInfGerais';
import { validarCPF, validarCpfCnpj } from "src/App/utils/validatorHelper";
import Acionista from "src/App/models/Acionista/Acionista";

const validationSchema = yup.object({
  cpfCnpj: yup.string().required("CPF/CNPJ é obrigatório").test('CPF/CNPJ is Valid', 'CPF/CNPJ é invalido',  value=> validarCpfCnpj(value)),
  nome: yup.string().required("Nome é obrigatório"),
  logradouro: yup.string().required("Endereço é obrigatório"),
  email: yup.string().nullable().email("E-mail inválido"),
  bairro: yup.string().required("Bairro é obrigatório"),
  numero: yup.number().typeError("Número é obrigatório").required("Número é obrigatório"),
  codigoMunicipio: yup.number().required("Município é obrigatório"),
  dataNascimento: yup.object().nullable().test('Data inválida', 'Data é inválida', value=> 
    value ? value.isValid() && !value.isAfter() : true 
  ),
  cpfRepresentante: yup.string().nullable().test('CPF is Valid', 'CPF é invalido',  value=> validarCPF(value)),
  cpfContaBanco: yup.string().nullable().test('CPF is Valid', 'CPF é invalido',  value=> validarCPF(value)),
});

class AcionistaForm extends FormComponent {

  state = {
    idx: '',
    acionista: undefined,
  }

  componentDidMount() {
    if(this.props.match.params && this.props.match.params.id) {
      if(this.props.match.params.id === 'novo') {
        this.setState({
          idx: 'Novo',
          acionista: new Acionista({})
        })
      } else if (Number(this.props.match.params.id)) {
        this.getByCodigo(acionistaService, this.props.match.params.id).then(data => {
          this.setState({
            idx: data.codigo,
            acionista: new Acionista(data)
          })
        });
      }
    }
  }

  salvar = async(acionista) => {
    await this.salvarModel(acionistaService, acionista);
    this.props.history.goBack();
  }

  render() {
    if(this.state.acionista)
      return (
        <Formik
          initialValues={this.state.acionista}
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
                title={'Novo Acionista'} 
                viewPath={{title: 'Acionistas', url: '/cadastros/acionistas'}}
                saveResource={props.handleSubmit} 
                disabled={!props.dirty || !props.isValid} 
              />
              <Row>
                <Col>
                  <Tabs defaultActiveKey="inf-gerais">
                    <Tab eventKey="inf-gerais" title={`Informações gerais`}>
                      <AcionistaFormInfGerais {...props}/>
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

export default AcionistaForm;
