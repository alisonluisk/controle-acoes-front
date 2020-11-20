import React, { Component } from "react";
import { Formik } from 'formik';
import * as yup from 'yup';
import CustomModal from "src/App/components/Modals/CustomModal.js"
import ContaInvestimentoForm from "./ContaInvestimentoForm";
import contaInvestimentoService from "src/App/services/ContaInvestimento/ContaInvestimentoService"
import messageService from "src/App/services/MessageService.js";

const validationSchema = yup.object({
  parcelas: yup.number().nullable().when('integralizacao', {
    is: 'AINTEGRALIZAR',
    then: yup.number().required('Parcela é obrigatória').typeError("Parcela é obrigatória").moreThan(0,
      'Parcela deve ser maior que zero'),
  }),
  parcelaAdesao: yup.number().nullable().when('valorAdesao', {
    is: (val) => val > 0,
    then: yup.number().required('Parcela é obrigatória').typeError("Parcela é obrigatória").moreThan(0,
      'Parcela deve ser maior que zero'),
  }),
  qtdLotes: yup.number().required("Qtd. é obrigatória"),
  valorAcao: yup.number().typeError("Valor é obrigatória").moreThan(0,
    'Valor deve ser maior que zero').required("Valor da ação é obrigatória")
});

class ContaInvestimentoModal extends Component {

  salvarModel = (service, model) => {
    return new Promise((resolve, reject) => {
      
    });
  }

  salvar = async(conta) => {
    contaInvestimentoService.salvar(conta).then((data) => {
        messageService.successMessage("Sucesso", "Conta de investimento gerada com sucesso!");
        this.props.closeModal();
    })
    .catch((error) => {
      if(error && error.data){
        if(error.data.errors)
          messageService.errorMessage(error.data.error, error.data.errors[0].message);
        else messageService.errorMessage(error.data.error, error.data.message);
      }
    });
  }

  render() {
    const { contaInvestimento } = this.props;

    return (
      <CustomModal
        animation="fadeIn"
        title="Cadastro de conta de investimento"
        open={this.props.showModal}
        width="1000px"
        height="500px"
        onClose={(e) => {
          this.props.closeModal();
        }}
      >
        <Formik
          initialValues={contaInvestimento}
          validationSchema={validationSchema}
          onSubmit={values => {
            this.salvar(values);
          }}
        >
          {(props) => <ContaInvestimentoForm {...props} />}
        </Formik>
      </CustomModal>
    );
  }


};

export default ContaInvestimentoModal;
