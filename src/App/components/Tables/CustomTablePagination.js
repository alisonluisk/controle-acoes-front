import React from "react";
import { TablePagination } from "@material-ui/core";

class CustomTablePagination extends React.Component {

  handleChangePage = (event, newPage) => {
    this.props.onRequestChangePage(newPage);
  };

  handleChangeRowsPerPage = (event) =>{
    this.props.onRequestChangeRowsPerPage(event.target.value);
  }

  render() {
    const { rowCount, rowsPerPage, page } = this.props;
    return (
      <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rowCount}
          rowsPerPage={rowsPerPage}
          page={page}
          labelRowsPerPage="Resultados por página"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} de ${count}`
          }
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
    );
  }
}

export default CustomTablePagination;