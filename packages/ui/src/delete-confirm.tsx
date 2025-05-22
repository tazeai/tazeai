'use client';

import { useId, useState } from 'react';
import { CircleAlertIcon } from 'lucide-react';
import { Button } from '@tazeai/ui/components/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@tazeai/ui/components/dialog';
import { Input } from '@tazeai/ui/components/input';
import { Label } from '@tazeai/ui/components/label';
import { Loader2Icon } from 'lucide-react';

export type DeleteConfirmProps = {
  name: string;
  onSubmit: (projectName: string) => Promise<void>;
};

export default function DeleteConfirm(props: DeleteConfirmProps) {
  const id = useId();
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

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
            className="flex size-9 shrink-0 items-center justify-center rounded-full border"
            aria-hidden="true"
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
              type="text"
              placeholder={`Type ${props.name} to confirm`}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" className="flex-1">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="button"
              className="flex-1"
              disabled={inputValue !== props.name}
              onClick={() => {
                setIsLoading(true);
                onSubmit?.().finally(() => setIsLoading(false));
              }}
            >
              {isLoading ? <Loader2Icon className="animate-spin" /> : 'Delete'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
