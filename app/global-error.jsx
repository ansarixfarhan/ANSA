"use client";

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body className="min-h-screen bg-[#faf6f1] flex flex-col items-center justify-center p-6 text-center font-sans">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Unexpected Application Error</h1>
        <p className="text-sm text-gray-600 mb-6">
          We encountered an issue while loading the application.
        </p>
        <button
          onClick={() => reset()}
          className="px-6 py-2.5 bg-[#9a4b00] text-white font-medium rounded-xl text-sm"
        >
          Try Again
        </button>
      </body>
    </html>
  );
}
