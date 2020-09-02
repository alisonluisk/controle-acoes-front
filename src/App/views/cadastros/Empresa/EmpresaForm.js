import React from "react";
import { Formik } from 'formik';
import * as yup from 'yup';
import { Row, Col, Tabs, Tab } from "react-bootstrap";
import Empresa from 'src/App/models/Empresa/Empresa';
import BreadcrumbForm from 'src/App/components/Views/BreadcrumbForm';
import FormComponent from 'src/App/components/Views/FormComponent';
import empresaService from "src/App/services/Empresa/EmpresaService.js";
import EmpresaFormInfGerais from './EmpresaFormInfGerais';
import messageService from "src/App/services/MessageService.js";
import cepService from "src/App/services/Cep/CepService.js";
import { validarCNPJ } from "src/App/utils/validatorHelper";

const validationSchema = yup.object({
  razaoSocial: yup.string().required("Razão social é obrigatória"),
  cnpj: yup.string().required("Cnpj é obrigatório").test('Cnpj is Valid',
  'Cnpj é invalido',
  value=> validarCNPJ(value)
),
  email: yup.string().email("E-mail inválido"),
  cep: yup.string().required("Cep é obrigatório"),
  logradouro: yup.string().required("Endereço é obrigatório"),
  numero: yup.string().required("Número é obrigatório"),
  bairro: yup.string().required("Bairro é obrigatório"),
  municipio: yup.object().required("Municipio é obrigatório"),
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

  salvar = async(produto) => {
    await this.salvarModel(empresaService, produto);
    this.props.history.goBack();
  }

  buscarCep = async(codigo) => {
    if(codigo.length === 9){
      cepService
      .getByCodigo(codigo.replace('-', ''))
      .then((data) => {
        var empresa = {...this.state.empresa}
        empresa.logradouro = data.logradouro;
        empresa.bairro = data.bairro;
        empresa.municipio = data.municipio;
        empresa.codigoMunicipio = data.ibge;
        empresa.cep = data.cep;
        this.setState({empresa})
      })
      .catch((error) => {
        if(error && error.data){
          messageService.errorMessage(error.data.error, error.data.message);
        }
      });
    }
  };
  
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
                      <EmpresaFormInfGerais {...props} buscarCep={this.buscarCep}/>
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
