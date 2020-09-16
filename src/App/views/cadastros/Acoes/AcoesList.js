import React from "react";
import CustomTable from "src/App/components/Tables/CustomTable.js";
import { maskCnpj, maskIntegerValue, statusAcoesToDesc } from "src/App/utils/formatterHelper";

const AcoesList = (props) => {
  
  const columns = [
    {
      id: 'cnpj',
      label: 'CNPJ',
      width: '15%',
      sort: true,
      filter: true,
      disablePadding: false,
      align: 'left',
      mask: maskCnpj
    },
    {
      id: 'razaoSocial',
      label: 'Razão Social',
      width: '30%',
      sort: true,
      filter: true,
      disablePadding: false,
      align: 'left',
    },
    {
      id: 'tipoEmpresa',
      label: 'Tipo',
      width: '10%',
      sort: true,
      filter: true,
      disablePadding: false,
      align: 'left',
    },
    {
      id: 'municipio.descricao',
      label: 'Municipio',
      width: '15%',
      sort: true,
      filter: true,
      disablePadding: false,
      align: 'left',
    },
    {
      id: 'statusAcoes',
      label: 'Status',
      width: '10%',
      sort: true,
      filter: true,
      disablePadding: false,
      align: 'left',
      mask: statusAcoesToDesc
    },
    {
      id: 'qtdAcoes',
      label: 'Ações',
      width: '5%',
      sort: true,
      filter: true,
      disablePadding: false,
      align: 'left',
      mask: maskIntegerValue
    },
    {
      id: 'acoes',
      label: '',
      width: '5%',
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

export default AcoesList;