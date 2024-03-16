import Jumbotron from "@/components/Jumbotron";
import React from "react";

export const metadata = {
  title: "About | Tasty Tracks",
  description: "About Tasty Tracks",
};

export default function page() {
  return (
    <div>
      <Jumbotron
        title="About Us"
        subtitle="Where Taste Meets Technology: Our Story"
      />
    </div>
  );
}
