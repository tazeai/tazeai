"use client";

import { Button } from "@tazeai/ui/components/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@tazeai/ui/components/dialog";
import { Input } from "@tazeai/ui/components/input";
import { Label } from "@tazeai/ui/components/label";
import { CircleAlertIcon } from "lucide-react";
import { Loader2Icon } from "lucide-react";
import { useId, useState } from "react";

export type DeleteConfirmProps = {
  name: string;
  onSubmit: (projectName: string) => Promise<void>;
};

export default function DeleteConfirm(props: DeleteConfirmProps) {
  const id = useId();
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      await props.onSubmit(inputValue);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Delete project</Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col items-center gap-2">
          <div
            aria-hidden="true"
            className="flex size-9 shrink-0 items-center justify-center rounded-full border"
          >
            <CircleAlertIcon className="opacity-80" size={16} />
          </div>
          <DialogHeader>
            <DialogTitle className="sm:text-center">
              Final confirmation
            </DialogTitle>
            <DialogDescription className="sm:text-center">
              This action cannot be undone. To confirm, please enter the project
              name <span className="text-foreground">{props.name}</span>.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form className="space-y-5">
          <div className="*:not-first:mt-2">
            <Label htmlFor={id}>Project name</Label>
            <Input
              id={id}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={`Type ${props.name} to confirm`}
              type="text"
              value={inputValue}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button className="flex-1" type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button
              className="flex-1"
              disabled={inputValue !== props.name}
              onClick={() => {
                setIsLoading(true);
                onSubmit?.().finally(() => setIsLoading(false));
              }}
              type="button"
            >
              {isLoading ? <Loader2Icon className="animate-spin" /> : "Delete"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
