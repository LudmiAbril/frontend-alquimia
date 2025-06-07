"use client"

import { Button } from "@mui/material"
import { ReactNode } from "react"

interface CustomButtonProps {
  onClick?: () => void
  children: ReactNode
  variant?: "contained" | "outlined"
  color?: "primary" | "error"
  className?: string
}

export default function CustomButton({
  onClick,
  children,
  className,
  variant = "contained",
  color = "primary",
}: CustomButtonProps) {
  return (
    <Button
     className={className} 
      onClick={onClick}
      variant={variant}
      color={color}
      sx={{
        borderRadius: "12px",
        textTransform: "none",
        fontWeight: 600,
        px: 3,
        py: 1,
        minWidth: "110px",
        fontSize: "0.9rem",
      }}
    >
      {children}
    </Button>
  )
}
