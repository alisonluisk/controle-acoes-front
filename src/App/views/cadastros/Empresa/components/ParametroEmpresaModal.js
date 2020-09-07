import React from "react";
import { Formik } from 'formik';
import * as yup from 'yup';
import ParametroEmpresaForm from './ParametroEmpresaForm.js'
import CustomModal from "src/App/components/Modals/CustomModal.js"

const validationSchema = yup.object({
  cotasOn: yup.number().required("Cotas On é obrigatória"),
  cotasPn: yup.number().required("Cotas Pn é obrigatória")});

const ParametroEmpresaModal = (props) => {
  const {parametroEmpresa, empresa } = props;

  return (
      <CustomModal
        animation="fadeIn"
        title="Parâmetro empresa"
        open={props.showModal}
        width="600px"
        onClose={(e) => {
          props.closeModal();
        }}
      >
          <Formik
             initialValues={parametroEmpresa}
             validationSchema={validationSchema}
             onSubmit={values => {
              props.salvar(values);
            }}
           >
           {(props) => <ParametroEmpresaForm {...props} empresa={empresa}/>}
           </Formik>
      </CustomModal>
  );
};

export default ParametroEmpresaModal;
