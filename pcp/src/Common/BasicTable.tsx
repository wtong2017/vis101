import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { interpolateColors, Sequence, useCurrentFrame, useVideoConfig } from 'remotion';

export type Column = {
  field: string,
  headerName?: string,
  width?: number,
  align?: "left" | "center" | "right" | "inherit" | "justify" | undefined
  color?: string
}

type Props = {
  rows: any[], columns: Column[], animateRow: boolean, animateColumn: boolean,
}

export default function BasicTable(props: Props) {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  // Fade out the animation at the end
  const animationColor = (c: string, startFrame: number) => interpolateColors(
    frame,
    [startFrame, startFrame + 1 * fps, startFrame + 3 * fps],
    ["rgb(255, 255, 255)", c, "rgb(255, 255, 255)"],
  );

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {
              props.columns.map((col) => (
                <TableCell align={col.align}>{col.headerName ?? col.field}</TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row) => (
            <TableRow
              key={row.field}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {
                props.columns.map((col, i) => (
                  <TableCell sx={{ backgroundColor: props.animateColumn ? animationColor(col.color || "red", i * 1 * fps) : undefined }} align={col.align}>{row[col.field]}</TableCell>
                ))
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

BasicTable.defaultProps = {
  animateRow: false, animateColumn: false
}