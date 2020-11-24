import _ from "lodash";
import React, { Component } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@material-ui/core";
import CustomTableHeader from "src/App/components/Tables/CustomTableHeader.js";
import CustomTablePagination from "src/App/components/Tables/CustomTablePagination.js";
import IconButton from '@material-ui/core/IconButton';
import { Row, Col } from "react-bootstrap";
import { TextField } from "@material-ui/core";

class CustomTableWithoutFilter extends Component {
  state = {
    order: "asc",
    orderBy: "codigo",
    rowsPerPage: 10,
    page: 0,
    data: [],
  };

  componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(this.props.data, prevProps.data)) {
      this.setState({data: this.props.data});
    }
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    const isAsc = this.state.orderBy === property && this.state.order === "asc";
    let order = isAsc ? "desc" : "asc";
    this.setState({ order, orderBy });
  };

  handleChangeRowsPerPage = (rowsPerPage) => {
    this.setState({
      rowsPerPage: parseInt(rowsPerPage, 10),
      page: 0,
    });
  };

  handleChangePage = (newPage) => {
    this.setState({
      page: newPage,
    });
  };

  botoes(props, row) {
    if (this.props.isDesativados) {
      if(props.ativarDesativar) {
        return(
          <IconButton color="secondary" aria-label="upload picture" title="Ativar" component="span" onClick={(e) => props.ativarDesativar(row, true)}>
            <i className="feather icon-refresh-cw" />
          </IconButton>
        );
      }
    } else {
      return (
        <React.Fragment>
          <IconButton color="primary" aria-label="upload picture" title="Editar" component="span" onClick={(e) => props.editar(row)}>
            <i className="feather icon-edit" style={{fontSize: 19}}/>
          </IconButton>
          { props.ativarDesativar ? (
            <IconButton color="secondary" aria-label="upload picture" title="Desativar" component="span" onClick={(e) => props.ativarDesativar(row, false)}>
              <i className="feather icon-trash-2" style={{fontSize: 19}}/>
            </IconButton>
            ) : [] 
          }
        </React.Fragment>
      );
    }
  }

  render() {
    const { order, orderBy, rowsPerPage, page, data } = this.state;

    return (
      <React.Fragment>
        <TableContainer className="p-20">
          <Table size="small" aria-label="a dense table">
            <CustomTableHeader
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              headCells={this.props.columns}
            />
            <TableBody>
              {_.orderBy(data, orderBy, order)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow key={index}>
                      {
                        this.props.columns.map((row2, index2) => {
                          if(!row2.isAction)
                            if(row2.id.includes('.')) {
                              let row3 = row2.id.split('.');
                              return (
                                <TableCell key={index2}>{
                                  row2.mask ? row2.mask(row[row3[0]][row3[1]]) : row[row3[0]][row3[1]]
                                }</TableCell>
                              );
                            } else {
                              return (
                                <TableCell key={index2}>{
                                  row2.mask ? row2.mask(row[row2.id]) : row[row2.id]
                                }</TableCell>
                              );
                            }
                          else
                           return [];
                        })
                      }
                      <TableCell>
                        {this.props.botoes ? this.props.botoes(row) : this.botoes(this.props, row)}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <CustomTablePagination
          rowCount={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onRequestChangeRowsPerPage={this.handleChangeRowsPerPage}
          onRequestChangePage={this.handleChangePage}
        />
      </React.Fragment>
    );
  }
}

export default CustomTableWithoutFilter;
