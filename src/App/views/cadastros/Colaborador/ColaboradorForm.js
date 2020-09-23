import React from "react";
import { Formik } from 'formik';
import * as yup from 'yup';
import { Row, Col, Tabs, Tab } from "react-bootstrap";
import Colaborador from 'src/App/models/Colaborador/Colaborador';
import BreadcrumbForm from 'src/App/components/Views/BreadcrumbForm';
import FormComponent from 'src/App/components/Views/FormComponent';
import colaboradorService from "src/App/services/Colaborador/ColaboradorService.js";
import ColaboradorFormInfGerais from './ColaboradorFormInfGerais';
import { validarCPF } from "src/App/utils/validatorHelper";

const validationSchema = yup.object({

  nome: yup.string().required("Nome é obrigatório"),
  logradouro: yup.string().required("Endereço é obrigatório"),
  email: yup.string().nullable().email("E-mail inválido"),
  bairro: yup.string().required("Bairro é obrigatório"),
  numero: yup.number().typeError("Número é obrigatório").required("Número é obrigatório"),
  // municipio: yup.object().required("Municipio é obrigatório"),
  // cep: yup.string().required("Cep é obrigatório"),
  cpf: yup.string().required("CPF é obrigatório").test('CPF is Valid', 'CPF é invalido',  value=> validarCPF(value)),
  dataNascimento: yup.object().nullable().test('Data inválida', 'Data é inválida', value=> 
    value ? value.isValid() && !value.isAfter() : true 
  ),
});

class ColaboradorForm extends FormComponent {

  state = {
    idx: '',
    colaborador: undefined,
  }

  componentDidMount() {
    if(this.props.match.params && this.props.match.params.id) {
      if(this.props.match.params.id === 'novo') {
        this.setState({
          idx: 'Novo',
          colaborador: new Colaborador({})
        })
      } else if (Number(this.props.match.params.id)) {
        this.getByCodigo(colaboradorService, this.props.match.params.id).then(data => {
          this.setState({
            idx: data.codigo,
            colaborador: new Colaborador(data)
          })
        });
      }
    }
  }

  salvar = async(colaborador) => {
    await this.salvarModel(colaboradorService, colaborador);
    this.props.history.goBack();
  }

  render() {
    if(this.state.colaborador)
      return (
        <Formik
          initialValues={this.state.colaborador}
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
                title={'Novo Colaborador'} 
                viewPath={{title: 'Colaboradores', url: '/cadastros/colaboradores'}}
                saveResource={props.handleSubmit} 
                disabled={!props.dirty || !props.isValid} 
              />
              <Row>
                <Col>
                  <Tabs defaultActiveKey="inf-gerais">
                    <Tab eventKey="inf-gerais" title={`Informações gerais`}>
                      <ColaboradorFormInfGerais {...props}/>
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

export default ColaboradorForm;
