import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import CustomModal from "src/App/components/Modals/CustomModal.js";
import DefinirSenhaForm from "./DefinirSenhaForm";

const validationSchema = yup.object({
  // só valida as senhas se for um cadastro novo, ou seja não possuir um código
  senha: yup
    .string("Informe uma senha")
    .min(8, "Senha deve conter no mínimo 8 caracteres.")
    .matches(/[a-zA-Z]/, "Senha deve conter letras e número")
    .when("senhaConfigurada", {
      is: (senhaConfigurada) => !senhaConfigurada,
      then: yup.string().required("Senha é obrigatória"),
    }),
  confirmSenha: yup.string("Confirme a senha").when("senhaConfigurada", {
    is: (senhaConfigurada) => !senhaConfigurada,
    then: yup
      .string()
      .required("Senha é obrigatória")
      .oneOf([yup.ref("senha"), null], "As senhas devem ser iguais"),
  }),
});

const DefinirSenhaModal = (props) => {
  const { usuario } = props;

  return (
    <CustomModal
      animation="fadeIn"
      title="Definir senha"
      open={props.showModal}
      width="600px"
      onClose={(e) => {
        props.closeModal();
      }}
    >
      <Formik
        initialValues={usuario}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          props.salvar(values);
        }}
      >
        {(props) => <DefinirSenhaForm {...props} />}
      </Formik>
    </CustomModal>
  );
};

export default DefinirSenhaModal;
