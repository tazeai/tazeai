'use client';

// import * as Sentry from "@sentry/nextjs";
// import { useEffect } from "react";
import NotFoundError from 'components/not-found-error';
// import { Button } from "@/components/button";
// import { logOut } from "@/utils/user";

export default function ErrorBoundary({ error }: any) {
  // useEffect(() => {
  //   Sentry.captureException(error);
  // }, [error]);

  return (
    <div className="p-4">
      <NotFoundError />
      {/* <Button className="mt-2" onClick={() => logOut()}>
        Log out
      </Button> */}
    </div>
  );
}
