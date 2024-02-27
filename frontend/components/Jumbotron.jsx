import React from "react";

export default function Jumbotron({ title, subtitle }) {
  return (
    <header className="relative overflow-hidden">
      <img
        alt="Header Image"
        src="https://res.cloudinary.com/ds4h5p2np/image/upload/q_100/v1708987274/tasty_tracks/jumbotron_dqm5oc.webp"
        className="object- absolute inset-0 h-full w-full object-cover"
      />

      <div className="relative flex items-center justify-center bg-gradient-to-t from-gray-900/70 to-gray-900/65 py-48">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="mx-auto text-center lg:mx-0">
            <h2 className="font-clash text-4xl font-bold leading-none tracking-normal text-white sm:text-6xl sm:leading-normal">
              {title}
            </h2>
            <p className="mt-4 font-geist leading-8 text-gray-200 sm:mt-0 sm:text-lg">
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
