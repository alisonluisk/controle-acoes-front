import React from "react";
import { Formik } from 'formik';
import * as yup from 'yup';
import AcoesForm from './AcoesForm.js'
import CustomModal from "src/App/components/Modals/CustomModal.js"

const validationSchema = yup.object({
  cotasOn: yup.number().required("Cotas On é obrigatória"),
  cotasPn: yup.number().required("Cotas Pn é obrigatória"),
  qtdLotes: yup.number().required("Quantidade de lotes é obrigatória"),
  valorAcao: yup.number().typeError("Valor da ação é obrigatória").moreThan(0,
  'Valor deve ser maior que zero').required("Valor da ação é obrigatória")});

const AcoesModal = (props) => {
  const { acoes } = props;

  return (
      <CustomModal
        animation="fadeIn"
        title="Geração de ações e lotes"
        open={props.showModal}
        width="750px"
        onClose={(e) => {
          props.closeModal();
        }}
      >
          <Formik
             initialValues={acoes}
             validationSchema={validationSchema}
             onSubmit={values => {
              props.salvar(values);
            }}
           >
           {(props) => <AcoesForm {...props} />}
           </Formik>
      </CustomModal>
  );
};

export default AcoesModal;
