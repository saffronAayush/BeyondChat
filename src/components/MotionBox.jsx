import { motion } from "framer-motion";
import React from "react";

const MotionBox = React.forwardRef(({ children, isInView, style }, ref) => {
  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0, opacity: 0.8 }}
      animate={{
        scale: isInView ? 1 : 0.9,
        opacity: isInView ? 1 : 0.8,
      }}
      transition={{ duration: 0.3 }}
      style={style}
    >
      {children}
    </motion.div>
  );
});

export default MotionBox;
