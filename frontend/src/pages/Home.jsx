import { UseTrackVisitor } from '../stats/UseTrackVisitor'; // Adjust path as needed



export default function HomePage() {
    UseTrackVisitor(); // 🔁 Tracks on first render
  return (
    <div className="px-4 sm:px-8 lg:px-16 py-12 bg-white min-h-screen">
      {/* This empty space ensures consistent vertical spacing between navbar and footer */}
      <div className="text-center text-gray-500">
        {/* You can add content here later */}
      </div>
    </div>
  );
}

