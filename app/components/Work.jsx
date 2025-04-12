import { assets, workData } from '@/assets/assets';
import Image from 'next/image';
import React, { useState } from 'react';
import { motion } from 'motion/react';

const Work = ({ isDarkMode }) => {
  const [itemsToShow, setItemsToShow] = useState(4);
  const [showAll, setShowAll] = useState(false);

  const handleShowMore = () => {
    if (showAll) {
      setItemsToShow(4);
      setShowAll(false);
    } else {
      setItemsToShow(workData.length);
      setShowAll(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      id="work"
      className="w-full px-[12%] py-10 scroll-mt-20"
    >
      <motion.h4
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-center mb-2 text-lg font-Ovo"
      >
        My portfolio
      </motion.h4>
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-center text-5xl font-Ovo"
      >
        My Latest Works
      </motion.h2>
      <motion.p
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="text-center max-w-2xl mx-auto mb-12 font-Ovo"
      >
        Welcome to my web development portfolio! Explore a collection of projects showcasing my latest projects.
      </motion.p>
      <motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 0.6, delay: 0.9 }}
  className="grid grid-cols-auto gap-5 my-10 dark:text-black"
>
  {workData.slice(0, itemsToShow).map((project, index) => (
    <a // Wrap the entire project card in an anchor tag
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      key={index}
      className="block" // Make the anchor tag a block element
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
        className="aspect-square bg-no-repeat bg-cover bg-center rounded-lg relative cursor-pointer group"
        style={{ backgroundImage: `url(${project.bgImage})` }}
      >
        <div
          className="bg-white w-10/12 rounded-md opacity-75 absolute bottom-5 left-1/2 -translate-x-1/2 py-3 px-5 flex items-center justify-between duration-500 group-hover:bottom-7 group-hover:opacity-100"
        >
          <div>
            <h2 className="font-semibold">{project.title}</h2>
            <p className="text-sm text-gray-700">{project.description}</p>
          </div>
          <div className="border rounded-full border-black w-9 aspect-square flex items-center justify-center shadow-[2px_2px_0_#000] group-hover:bg-lime-300 transition">
            <Image src={assets.send_icon} alt="send icon" className="w-5" />
          </div>
        </div>
      </motion.div>
    </a>
  ))}
</motion.div>
      {itemsToShow < workData.length || showAll ? (
        <motion.button
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          onClick={handleShowMore}
          className="w-max flex items-center justify-center gap-2 text-gray-700 border-[0.5px] border-gray-700 rounded-full py-3 px-10 mx-auto my-20 hover:bg-lightHover duration-500 dark:text-white dark:border-white dark:hover:bg-darkHover"
        >
          {showAll ? 'Show Less' : 'Show More'}
        </motion.button>
      ) : null}
    </motion.div>
  );
};

export default Work;