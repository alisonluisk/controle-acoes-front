import React from "react";
import { Formik } from 'formik';
import * as yup from 'yup';
import { Row, Col, Tabs, Tab } from "react-bootstrap";
import Empresa from 'src/App/models/Empresa/Empresa';
import BreadcrumbForm from 'src/App/components/Views/BreadcrumbForm';
import FormComponent from 'src/App/components/Views/FormComponent';
import empresaService from "src/App/services/Empresa/EmpresaService.js";
import EmpresaFormInfGerais from './components/EmpresaFormInfGerais';
import { validarCNPJ } from "src/App/utils/validatorHelper";

const validationSchema = yup.object({
  tipoEmpresa: yup.string().required('Tipo empresa é obrigatório'),
  razaoSocial: yup.string().required("Razão social é obrigatória"),
  cnpj: yup.string().required("Cnpj é obrigatório").test('Cnpj is Valid',
  'Cnpj é invalido',
  value=> validarCNPJ(value)
),
  email: yup.string().nullable().email("E-mail inválido"),
  cep: yup.string().required("Cep é obrigatório"),
  logradouro: yup.string().required("Endereço é obrigatório"),
  numero: yup.number().typeError("Número é obrigatório").required("Número é obrigatório"),
  bairro: yup.string().required("Bairro é obrigatório"),
  municipio: yup.object().required("Municipio é obrigatório"),
  dataAbertura: yup.object().nullable().test('Data inválida', 'Data é inválida', value=> 
    value ? value.isValid() && !value.isAfter() : true 
  ),
  codigoMatriz: yup.string().nullable().when('tipoEmpresa', {
    is: 'FILIAL',
    then: yup.string().required('Matriz é obrigatória'),
  }),
});

class EmpresaForm extends FormComponent {

  state = {
    idx: '',
    empresa: undefined,
  }

  componentDidMount() {
    if(this.props.match.params && this.props.match.params.id) {
      if(this.props.match.params.id === 'novo') {
        this.setState({
          idx: 'Novo',
          empresa: new Empresa({})
        })
      } else if (Number(this.props.match.params.id)) {
        this.getByCodigo(empresaService, this.props.match.params.id).then(data => {
          this.setState({
            idx: data.codigo,
            empresa: new Empresa(data)
          })
        });
      }
    }
  }

  salvar = async(empresa) => {
    await this.salvarModel(empresaService, empresa);
    this.props.history.goBack();
  }

  render() {
    if(this.state.empresa)
      return (
        <Formik
          initialValues={this.state.empresa}
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
                title={'Nova Empresa'} 
                viewPath={{title: 'Empresas', url: '/cadastros/empresas'}}
                saveResource={props.handleSubmit} 
                disabled={!props.dirty || !props.isValid} 
              />
              <Row>
                <Col>
                  <Tabs defaultActiveKey="inf-gerais">
                    <Tab eventKey="inf-gerais" title={`Informações gerais`}>
                      <EmpresaFormInfGerais {...props}/>
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

export default EmpresaForm;
