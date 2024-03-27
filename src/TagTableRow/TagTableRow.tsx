import React from 'react';
import { TableRow, TableCell } from '@mui/material';
import TagTableRowProps from '../types/TagTableRowProps';

const TagTableRow: React.FC<TagTableRowProps> = ({ tag }) => {
  return (
    <TableRow>
      <TableCell align="center">{tag.name}</TableCell>
      <TableCell align="center">{tag.count}</TableCell>
    </TableRow>
  );
};

export default TagTableRow;