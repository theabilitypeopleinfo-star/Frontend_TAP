import React from "react";
import { Button, Wrap } from "../components/ui";

export default function NotFound() {
  return (
    <Wrap className="py-28 text-center">
      <p className="font-display text-[80px] text-teal-deep leading-none">404</p>
      <h1 className="text-[26px] text-teal-deep mt-2 mb-3">Page not found</h1>
      <p className="text-stone mb-7">The page you're looking for doesn't exist or may have moved.</p>
      <Button to="/" variant="primary">Back to home</Button>
    </Wrap>
  );
}
