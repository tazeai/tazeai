"use client";

import { Button } from "@tazeai/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@tazeai/ui/components/dialog";
import type { ReactNode } from "react";
import { Loader2 } from "@tazeai/ui/components/icons";

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
  submitLabel = "提交",
  cancelLabel = "取消",
  isSubmitting = false,
  isSubmitDisabled = false,
  onSubmit,
}: FormDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (isSubmitting) return;
        onOpenChange(open);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="py-4">{children}</div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            {cancelLabel}
          </Button>
          <Button
            onClick={onSubmit}
            disabled={isSubmitDisabled || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
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
