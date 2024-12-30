export default function Protected() {
  return (
    <div className="p-8">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Protected Route</h1>
        <p className="text-gray-600">
          This page is only accessible with a valid API key.
        </p>
      </div>
    </div>
  );
} 