'use client'

import React from 'react'
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogFooter } from './alert-dialog'
import { Button } from './button'

interface AlertProps {
  title: string
  description: string
  onClose: () => void
}

export const Alert: React.FC<AlertProps> = ({
  title,
  description,
  onClose,
}) => {
  return (
    <AlertDialog open={true} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button onClick={onClose} className="w-full">
            Close
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}