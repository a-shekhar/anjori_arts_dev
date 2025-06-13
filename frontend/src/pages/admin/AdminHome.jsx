import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminHome() {
  const [answer, setAnswer] = useState(null); // null, 'yes', 'no'
  const navigate = useNavigate();

  const handleYes = () => {
    setAnswer("yes");
    setTimeout(() => {
       useNavigate("/admin/dashboard"); 
    }, 3000);
  };

  const handleNo = () => {
    setAnswer("no");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-12 text-gray-800 bg-gradient-to-br from-pink-100 via-rose-100 to-violet-100">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center space-y-6 max-w-xl"
      >
        <h1 className="text-3xl md:text-4xl font-bold">
          Hey Joey ❤️
        </h1>
        <p className="text-lg md:text-xl font-medium">
          You’ve stolen the keys to this dashboard — and my heart 💘
        </p>

        {/* Buttons */}
        {answer === null && (
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <motion.button
              onClick={handleYes}
              whileHover={{ scale: 1.1 }}
              className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full shadow-md text-lg"
            >
              💖 Yes
            </motion.button>

            <motion.button
              onClick={handleNo}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-full shadow text-lg"
            >
              🙈 No
            </motion.button>
          </div>
        )}

        {/* On YES */}
        {answer === "yes" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 text-xl font-semibold text-pink-600"
          >
            💘 Yes! You now have full admin rights... to my heart 💘
          </motion.div>
        )}

        {/* On NO */}
        {answer === "no" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 space-y-6 text-lg font-medium text-red-500"
          >
            <div>
              🥺 Oh no... Are you sure? <br />
              This dashboard was built for two — and it's empty without you 💔 <br />
              I’ll wait here... hoping you’ll change your mind 💫
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3 }}
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={handleYes}
                className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full shadow-md text-lg"
              >
                Fine… Yes 😅
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
