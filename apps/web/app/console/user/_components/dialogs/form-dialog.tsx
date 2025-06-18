'use client';

import { Button } from '@tazeai/ui/components/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@tazeai/ui/components/dialog';
import { Loader2 } from '@tazeai/ui/components/icons';
import type { ReactNode } from 'react';

interface FormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
  submitLabel?: string;
  cancelLabel?: string;
  isSubmitting?: boolean;
  isSubmitDisabled?: boolean;
  onSubmit: () => void;
}

export function FormDialog({
  open,
  onOpenChange,
  title,
  children,
  submitLabel = '提交',
  cancelLabel = '取消',
  isSubmitting = false,
  isSubmitDisabled = false,
  onSubmit,
}: FormDialogProps) {
  return (
    <Dialog
      onOpenChange={(open) => {
        if (isSubmitting) return;
        onOpenChange(open);
      }}
      open={open}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="py-4">{children}</div>
        <DialogFooter>
          <Button
            disabled={isSubmitting}
            onClick={() => onOpenChange(false)}
            variant="outline"
          >
            {cancelLabel}
          </Button>
          <Button
            disabled={isSubmitDisabled || isSubmitting}
            onClick={onSubmit}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                处理中...
              </>
            ) : (
              submitLabel
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
