import React from "react";
import { Formik } from 'formik';
import * as yup from 'yup';
import CustomModal from "src/App/components/Modals/CustomModal.js"
import ContaInvestimentoForm from "./ContaInvestimentoForm";

const validationSchema = yup.object({
  cotasOn: yup.number().required("Cotas On é obrigatória"),
  cotasPn: yup.number().required("Cotas Pn é obrigatória"),
  qtdLotes: yup.number().required("Quantidade de lotes é obrigatória"),
  valorAcao: yup.number().typeError("Valor da ação é obrigatória").moreThan(0,
  'Valor deve ser maior que zero').required("Valor da ação é obrigatória")});

const ContaInvestimentoModal = (props) => {
  const { contaInvestimento } = props;
  return (
      <CustomModal
        animation="fadeIn"
        title="Cadastro de conta de investimento"
        open={props.showModal}
        width="1000px"
        height="500px"
        onClose={(e) => {
          props.closeModal();
        }}
      >
          <Formik
             initialValues={contaInvestimento}
             validationSchema={validationSchema}
             onSubmit={values => {
              props.salvar(values);
            }}
           >
           {(props) => <ContaInvestimentoForm {...props} />}
           </Formik>
      </CustomModal>
  );
};

export default ContaInvestimentoModal;
