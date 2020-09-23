import React from "react";
import CustomTable from "src/App/components/Tables/CustomTable.js";

const UsuarioList = (props) => {
  
  const columns = [
    {
      id: 'usuario',
      label: 'Usuário',
      width: '25%',
      sort: true,
      filter: true,
      disablePadding: false,
      align: 'left',
    },
    {
      id: 'colaborador.nome',
      label: 'Colaborador',
      width: '25%',
      sort: true,
      filter: true,
      disablePadding: false,
      align: 'left',
    },
    {
      id: 'acionista.nome',
      label: 'Acionista',
      width: '25%',
      sort: true,
      filter: true,
      disablePadding: false,
      align: 'left',
    },

    {
      id: 'perfil.nome',
      label: 'Perfil',
      width: '15%',
      sort: true,
      filter: true,
      disablePadding: false,
      align: 'left',
    },
    {
      id: 'acoes',
      label: 'Ações',
      width: '10%',
      sort: false,
      filter: false,
      disablePadding: false,
      align: 'left',
      isAction: true
    }
  ]

  return (
    <React.Fragment>
      <CustomTable
        columns={columns}
        {...props}
      />
    </React.Fragment>
  );
};

export default UsuarioList;