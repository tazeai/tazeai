'use client';

import { Button } from '@tazeai/ui/components/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@tazeai/ui/components/dialog';
import { Label } from '@tazeai/ui/components/label';
import { RadioGroup, RadioGroupItem } from '@tazeai/ui/components/radio-group';
import { Textarea } from '@tazeai/ui/components/textarea';
import { useState } from 'react';

export type RatingProps = {
  title?: string;
  onSubmit?: (rating: number, feedback: string) => void | Promise<void>;
};

export default function Rating(props: RatingProps) {
  const { title = 'Rating', onSubmit: submit } = props;
  const [rating, setRating] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>('');

  const onSubmit = () => {
    submit?.(rating, feedback);
  };

  return (
    <Dialog>
      <DialogTrigger asChild={true}>
        <Button variant="outline">{title}</Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0 p-0 [&>button:last-child]:top-3.5">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b px-6 py-4 text-base">
            Help us improve
          </DialogTitle>
        </DialogHeader>
        <div className="px-6 py-4">
          <form className="space-y-5">
            <div className="space-y-4">
              <div>
                <fieldset className="space-y-4">
                  <legend className="font-semibold text-foreground text-lg leading-none">
                    How hard was it to set up your account?
                  </legend>
                  <RadioGroup
                    className="-space-x-px flex gap-0 rounded-md shadow-xs"
                    onValueChange={(value) => setRating(Number(value))}
                    value={rating.toString()}
                  >
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((number) => (
                      <label
                        className="relative flex size-9 flex-1 cursor-pointer flex-col items-center justify-center gap-3 border border-input text-center text-sm outline-none transition-[color,box-shadow] first:rounded-s-md last:rounded-e-md has-data-[state=checked]:z-10 has-data-disabled:cursor-not-allowed has-data-[state=checked]:border-primary/50 has-focus-visible:border-ring has-data-disabled:opacity-50 has-focus-visible:ring-[3px] has-focus-visible:ring-ring/50"
                        key={number}
                      >
                        <RadioGroupItem
                          className="sr-only after:absolute after:inset-0"
                          id={`radio-17-r${number}`}
                          value={number.toString()}
                        />
                        {number}
                      </label>
                    ))}
                  </RadioGroup>
                </fieldset>
                <div className="mt-2 flex justify-between text-muted-foreground text-xs">
                  <p>Very easy</p>
                  <p>Very dificult</p>
                </div>
              </div>

              <div className="*:not-first:mt-2">
                <Label>Why did you give this rating?</Label>
                <Textarea
                  aria-label="Send feedback"
                  id="feedback"
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="How can we improve Origin UI?"
                  value={feedback}
                />
              </div>
            </div>
            <Button className="w-full" onClick={onSubmit} type="button">
              Send feedback
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
