import { motion, AnimatePresence } from "framer-motion";
import Cal from "@calcom/embed-react";

export default function MentorBookingModal({
  isOpen,
  closeModal,
  mentorUsername,
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50  bg-opacity-50"
        >
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0"
            onClick={closeModal}
          />

          {/* Modal Container */}
          <div className="flex items-center justify-center min-h-screen">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-[80%] max-w-[1200px] rounded-xl"
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute right top-4 z-10 rounded-full  text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                <span className="sr-only">Close</span>
                {/* <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg> */}
              </button>

              {/* Calendar Content */}
              <div className="h-[92vh]">
                <Cal
                  calLink={mentorUsername}
                  style={{
                    width: "100%",
                    height: "100%",
                    minHeight: "92vh",
                  }}
                  config={{
                    layout: "month_view"
                  }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function getDeviceType() {
  if (typeof window === "undefined") return "desktop";
  const width = window.innerWidth;
  if (width < 768) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
}