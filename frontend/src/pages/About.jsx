import { motion } from "framer-motion";
import { useEffect } from "react";

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-4 md:px-12 py-10 max-w-6xl mx-auto">
      {/* Intro */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Anjori Arts</h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
          At Anjori Arts, every brushstroke tells a story. We celebrate handmade beauty,
          cultural expression, and the journey of artistic creation.
        </p>
      </motion.section>

      {/* Artist Bio */}
      <motion.section
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="flex flex-col md:flex-row items-center gap-6 mb-12"
      >
        <img
          src="/images/avatar-jyotsna.png"
          alt="Jyotsna Sharma Avatar"
          className="w-40 h-40 rounded-full object-cover border-4 border-pink-300 shadow-lg"
        />
        <div>
          <h2 className="text-2xl font-semibold mb-2">Meet the Artist: Jyotsna Sharma</h2>
          <p className="text-gray-700">
            Currently pursuing her <strong>BVA (Bachelor of Visual Arts)</strong> in <strong> Painting </strong> at <strong>Pondicherry University</strong>,
            Jyotsna is the soul of Anjori Arts. Before choosing art full-time, she worked as a pharmacist —
            but her love for painting was too strong to ignore. She made the bold decision to leave her stable
            career and follow her true calling — creating art that speaks from the heart.
          </p>
          <blockquote className="mt-4 italic text-pink-600">
            “I gave up medicine to paint meaning into life. Art is where I feel truly alive.”
          </blockquote>
        </div>
      </motion.section>

      {/* Vision & Values */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="bg-gray-50 p-6 rounded-xl shadow mb-12"
      >
        <h3 className="text-2xl font-semibold mb-4">Our Vision & Values</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>🌟 Vision: Bringing art into everyday life</li>
          <li>🎨 Creativity & authenticity in every piece</li>
          <li>🌱 Sustainability & handmade craftsmanship</li>
        </ul>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <h3 className="text-2xl font-semibold mb-4">What People Are Saying</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="italic">“Truly unique pieces that speak to the heart!”</p>
            <p className="text-sm text-right mt-2 text-gray-600">— Aditya, Bengaluru</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="italic">“The detailing and colors are just stunning.”</p>
            <p className="text-sm text-right mt-2 text-gray-600">— Aditi, Samastipur</p>
          </div>
        </div>
      </motion.section>

      {/* Blog Preview */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <h3 className="text-2xl font-semibold mb-4">Latest from the Blog</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-pink-50 p-4 rounded-xl shadow">
            <h4 className="text-lg font-bold">Behind the Brush: My Creative Process</h4>
            <p className="text-sm mt-2 text-gray-600">A peek into how each artwork comes to life.</p>
            <a href="/blog/creative-process" className="text-pink-600 text-sm mt-2 inline-block hover:underline">
              Read More →
            </a>
          </div>
          <div className="bg-pink-50 p-4 rounded-xl shadow">
            <h4 className="text-lg font-bold">Color Stories: Finding Emotion in Shades</h4>
            <p className="text-sm mt-2 text-gray-600">How I choose colors to evoke feeling.</p>
            <a href="/blog/color-emotion" className="text-pink-600 text-sm mt-2 inline-block hover:underline">
              Read More →
            </a>
          </div>
        </div>
      </motion.section>

      {/* Follow + Newsletter */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h3 className="text-2xl font-semibold mb-4">Stay Connected</h3>
        <p className="mb-4 text-gray-600">Follow Anjori Arts on social media for updates, new launches & art behind-the-scenes.</p>
        <div className="flex justify-center gap-6 mb-6">
          <a href="https://www.instagram.com/anjoriarts" className="hover:scale-110 transition-transform">📸 Instagram</a>
          <a href="https://pin.it/lwclKG9Dw" className="hover:scale-110 transition-transform">📌 Pinterest</a>
       </div>
        <input
          type="email"
          placeholder="Your email for newsletter"
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        <button className="ml-2 px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700">
          Subscribe
        </button>
      </motion.section>
    </div>
  );
}
