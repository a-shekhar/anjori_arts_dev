import React from "react";
import ParticlesBackground from "../components/ParticlesBackground";

const artworks = [
  {
    id: 1,
    title: "Radha Krishna",
    image: "/images/radha.jpg",
    size: "24×36",
    paintType: "Acrylic",
    surface: "Canvas",
    price: "₹2250",
  },
  {
    id: 2,
    title: "Floral Mandala",
    image: "/images/mandala.jpg",
    size: "12×12",
    paintType: "Ink",
    surface: "Handmade Paper",
    price: "₹899",
  },
  {
    id: 3,
    title: "Totebag Art",
    image: "/images/totebag.jpg",
    size: "Standard Tote",
    paintType: "Fabric Paint",
    surface: "Cotton Bag",
    price: "₹550",
  },
  // Add more artworks here up to 12
  {
      id: 3,
      title: "Totebag Art",
      image: "/images/totebag.jpg",
      size: "Standard Tote",
      paintType: "Fabric Paint",
      surface: "Cotton Bag",
      price: "₹550",
    },
{
    id: 3,
    title: "Totebag Art",
    image: "/images/totebag.jpg",
    size: "Standard Tote",
    paintType: "Fabric Paint",
    surface: "Cotton Bag",
    price: "₹550",
  },
  {
      id: 3,
      title: "Totebag Art",
      image: "/images/totebag.jpg",
      size: "Standard Tote",
      paintType: "Fabric Paint",
      surface: "Cotton Bag",
      price: "₹550",
    },
{
    id: 3,
    title: "Totebag Art",
    image: "/images/totebag.jpg",
    size: "Standard Tote",
    paintType: "Fabric Paint",
    surface: "Cotton Bag",
    price: "₹550",
  },
  {
      id: 3,
      title: "Totebag Art",
      image: "/images/totebag.jpg",
      size: "Standard Tote",
      paintType: "Fabric Paint",
      surface: "Cotton Bag",
      price: "₹550",
    },
{
    id: 3,
    title: "Totebag Art",
    image: "/images/totebag.jpg",
    size: "Standard Tote",
    paintType: "Fabric Paint",
    surface: "Cotton Bag",
    price: "₹550",
  },
  {
      id: 3,
      title: "Totebag Art",
      image: "/images/totebag.jpg",
      size: "Standard Tote",
      paintType: "Fabric Paint",
      surface: "Cotton Bag",
      price: "₹550",
    },
{
    id: 3,
    title: "Totebag Art",
    image: "/images/totebag.jpg",
    size: "Standard Tote",
    paintType: "Fabric Paint",
    surface: "Cotton Bag",
    price: "₹550",
  },
  {
      id: 3,
      title: "Totebag Art",
      image: "/images/totebag.jpg",
      size: "Standard Tote",
      paintType: "Fabric Paint",
      surface: "Cotton Bag",
      price: "₹550",
    },


];

const Homepage = () => {
  return (
    <div className="flex flex-col gap-8 p-4 md:p-8">

      {/* Hero Banner with Particles */}
      <section className="relative w-full h-[350px] md:h-[450px] bg-black rounded-2xl overflow-hidden text-white mb-8">
        <ParticlesBackground />
        <div className="absolute inset-0 flex items-center justify-center text-center z-10">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold">Welcome to Anjori Arts</h1>
            <p className="mt-2 text-lg italic"> “Art enables us to find ourselves and lose ourselves at the same time.” — Thomas Merton</p>
            <p className="mt-2 text-lg">Bring Your Imagination to Canvas</p>
            <a
              href="/custom-order"
              className="mt-4 inline-block px-6 py-2 bg-pink-500 text-white rounded-full shadow-md hover:bg-pink-600 transition-all"
            >
              Custom Order 🎨
            </a>
          </div>
        </div>
      </section>

      {/* Artwork Grid */}
      <section>
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">Gallery of Paintings</h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {artworks.slice(0, 12).map((art) => (
            <div key={art.id} className="bg-white rounded-xl shadow p-4">
              <img
                src={art.image}
                alt={art.title}
                className="w-full h-72 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-semibold">{art.title}</h3>
              <p className="text-sm text-gray-500">
                {art.size} • {art.paintType} on {art.surface}
              </p>
              <p className="text-blue-600 font-semibold mt-1">{art.price}</p>
              <button className="mt-4 w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-md transition">
                Buy Now
              </button>
            </div>
          ))}
        </div>

        {/* Show More Button */}
        <div className="text-center mt-8">
          <a
            href="/shop"
            className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-medium px-6 py-3 rounded-full transition shadow"
          >
            Show More →
          </a>
        </div>
      </section>

      {/* Custom Order CTA */}
      <section className="mt-8 rounded-2xl p-6 md:p-8 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 text-white text-center shadow-lg">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Have something in mind?</h2>
        <a
          href="/custom-order"
          className="bg-yellow-300 text-black px-6 py-3 rounded-full text-lg font-semibold inline-flex items-center gap-2 hover:bg-yellow-400 transition"
        >
          ✏️ Custom Order
        </a>
      </section>
    </div>
  );
};

export default Homepage;
