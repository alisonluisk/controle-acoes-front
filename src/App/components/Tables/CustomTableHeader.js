import React from "react";
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@material-ui/core";

class CustomTableHeader extends React.Component {

  createSortHandler = (property) => (event) => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy, headCells } = this.props;
    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              style={ headCell.width ? {width: headCell.width, fontWeight: 'bold', color: '#424242'} : {fontWeight: 'bold', color: '#424242'}}
              key={headCell.id}
              align={headCell.numeric ? "right" : "left"}
              padding={headCell.disablePadding ? "none" : "default"}
              sortDirection={orderBy === (headCell.fieldSort ? headCell.fieldSort : headCell.id) ? order : false}
            >
              <TableSortLabel
                active={orderBy === (headCell.fieldSort ? headCell.fieldSort : headCell.id)}
                direction={orderBy === (headCell.fieldSort ? headCell.fieldSort : headCell.id) ? order : "asc"}
                onClick={this.createSortHandler((headCell.fieldSort ? headCell.fieldSort : headCell.id))}
              >
                {headCell.label}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
}

export default CustomTableHeader;