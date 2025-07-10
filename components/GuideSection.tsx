'use client';

import { motion } from 'framer-motion';

export default function GuideSection() {
  return (
    <section id="guide" className="px-6 py-16 max-w-5xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto"
      >
        <h2 className="text-4xl font-bold mb-6 text-center"> How to Use This Blog</h2>
        <p className="text-gray-600 mb-10 text-center">Just follow these simple steps to start blogging.</p>

        <ol className="space-y-6 list-decimal list-inside text-gray-800">
          <motion.li
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <span className="font-semibold">Create your account:</span> Sign up with your email and set up your profile.
          </motion.li>
          <motion.li
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <span className="font-semibold">Write your first post:</span> Use the editor to craft your content and hit publish.
          </motion.li>
          <motion.li
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <span className="font-semibold">Explore other blogs:</span> Discover new articles and follow topics that interest you.
          </motion.li>
          <motion.li
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <span className="font-semibold">Comment and connect:</span> Engage with others by commenting and sharing thoughts.
          </motion.li>
        </ol>
      </motion.div>
    </section>
  );
}
