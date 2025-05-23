"use client";

import { Button } from "@tazeai/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@tazeai/ui/components/dialog";
import { Label } from "@tazeai/ui/components/label";
import { RadioGroup, RadioGroupItem } from "@tazeai/ui/components/radio-group";
import { Textarea } from "@tazeai/ui/components/textarea";
import { useState } from "react";

export type RatingProps = {
  title?: string;
  onSubmit?: (rating: number, feedback: string) => void | Promise<void>;
};

export default function Rating(props: RatingProps) {
  const { title = "Rating", onSubmit: submit } = props;
  const [rating, setRating] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("");

  const onSubmit = () => {
    submit?.(rating, feedback);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
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
                  <legend className="text-foreground text-lg leading-none font-semibold">
                    How hard was it to set up your account?
                  </legend>
                  <RadioGroup
                    value={rating.toString()}
                    onValueChange={(value) => setRating(Number(value))}
                    className="flex gap-0 -space-x-px rounded-md shadow-xs"
                  >
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((number) => (
                      <label
                        key={number}
                        className="border-input has-data-[state=checked]:border-primary/50 has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative flex size-9 flex-1 cursor-pointer flex-col items-center justify-center gap-3 border text-center text-sm transition-[color,box-shadow] outline-none first:rounded-s-md last:rounded-e-md has-focus-visible:ring-[3px] has-data-disabled:cursor-not-allowed has-data-disabled:opacity-50 has-data-[state=checked]:z-10"
                      >
                        <RadioGroupItem
                          id={`radio-17-r${number}`}
                          value={number.toString()}
                          className="sr-only after:absolute after:inset-0"
                        />
                        {number}
                      </label>
                    ))}
                  </RadioGroup>
                </fieldset>
                <div className="text-muted-foreground mt-2 flex justify-between text-xs">
                  <p>Very easy</p>
                  <p>Very dificult</p>
                </div>
              </div>

              <div className="*:not-first:mt-2">
                <Label>Why did you give this rating?</Label>
                <Textarea
                  id="feedback"
                  placeholder="How can we improve Origin UI?"
                  aria-label="Send feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
              </div>
            </div>
            <Button type="button" className="w-full" onClick={onSubmit}>
              Send feedback
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
