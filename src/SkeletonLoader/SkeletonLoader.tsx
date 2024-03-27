import { Skeleton, TableCell, TableRow } from "@mui/material"
import React from "react"
import SkeletonLoaderProps from "../types/SkeletonLoader"

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ skeleton }) => {
  const { numberOfSkeletons, colSpan, width, height } = skeleton

  return (
    <>
      {[...Array(numberOfSkeletons)].map((_, index) => (
        <TableRow key={index}>
          <TableCell colSpan={colSpan} align="center">
            <Skeleton animation="wave" width={width} height={height} />
          </TableCell>
        </TableRow>
      ))}
    </>
  )
}

export default SkeletonLoader
