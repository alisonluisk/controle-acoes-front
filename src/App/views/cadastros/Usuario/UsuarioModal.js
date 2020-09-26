import React from "react";
import { Formik } from 'formik';
import * as yup from 'yup';
import CustomModal from "src/App/components/Modals/CustomModal.js"
import UsuarioForm from "./UsuarioForm";

const validationSchema = yup.object({
  codigoPerfilUsuario: yup.number().required("Perfil é obrigatório")
});

const UsuarioModal = (props) => {
  const { usuario, perfis } = props;

  return (
      <CustomModal
        animation="fadeIn"
        title="Usuário"
        open={props.showModal}
        width="600px"
        onClose={(e) => {
          props.closeModal();
        }}
      >
          <Formik
             initialValues={usuario}
             validationSchema={validationSchema}
             onSubmit={values => {
              props.salvar(values);
            }}
           >
           {(props) => <UsuarioForm {...props} perfis={perfis} />}
           </Formik>
      </CustomModal>
  );
};

export default UsuarioModal;
