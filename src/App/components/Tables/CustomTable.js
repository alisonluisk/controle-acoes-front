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

class CustomTable extends Component {
  state = {
    order: "asc",
    orderBy: "codigo",
    rowsPerPage: 10,
    page: 0,
    filtro: "",
    data: [],
  };

  componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(this.state.data, prevState.data) || !_.isEqual(this.state.filtro, prevState.filtro)) {
      const data = this.getFilteredArray(this.props.data, this.state.filtro);
      this.setState({ data });
    }
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

  handleChange = (event) => {
    this.setState({ filtro: event.target.value });
  };

  getFilteredArray = (data, filtro) => {
    if (filtro.length === 0) {
      return data;
    }
    return _.filter(
      data,
      (item) => {
        for(let row of this.props.columns) {
          if(row.filter) {
            if(row.id.includes('.')) {
              let row2 = row.id.split('.');
              if(item[row2[0]][row2[1]] && item[row2[0]][row2[1]].toString().toLowerCase().includes(filtro.toLowerCase())) {
                return true;
              }
            } else {
              if(item[row.id] && item[row.id].toString().toLowerCase().includes(filtro.toLowerCase())) {
                return true;
              }
            }
          }
        }
        return false;
      }
    );
  };

  render() {
    const { order, orderBy, rowsPerPage, page, filtro, data } = this.state;
    return (
      <React.Fragment>
        <Row className="p-20">
          <Col md="12">
            <TextField
              value={filtro ? filtro : ""}
              onChange={this.handleChange}
              name="filtro"
              fullWidth={true}
              label="Digite para filtrar"
            />
          </Col>
        </Row>
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
                              if(row[row3[0]]){
                                return (
                                  <TableCell key={index2}>{
                                    row2.mask ? row2.mask(row[row3[0]][row3[1]]) : row[row3[0]][row3[1]]
                                  }</TableCell>
                                );
                              }
                              return (
                                <TableCell key={index2}>{
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

export default CustomTable;
