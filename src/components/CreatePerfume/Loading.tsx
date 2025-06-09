"use client";

import React, { useEffect, useRef, useState } from "react";

interface LoadingProps {
  onFinish: () => void;
  onLoading: () => Promise<void>;
  onClose: () => void;
}

const Loading = ({ onFinish, onClose, onLoading }: LoadingProps) => {
  const [progress, setProgress] = useState(0);
  const hasFinished = useRef(false);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const hasStarted = useRef(false);

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    let interval: NodeJS.Timeout;

    async function runLoading() {
      await onLoading();
      setProgress(100);
    }

    runLoading();

    interval = setInterval(() => {
      setProgress((prev) => (prev < 50 ? prev + 1 : prev));
    }, 30);

    return () => clearInterval(interval);
  }, [onLoading]);


  useEffect(() => {
    if (progress === 100 && !hasFinished.current) {
      hasFinished.current = true;

      requestAnimationFrame(() => {
        if (progressBarRef.current) {
          onFinish();
          onClose();
        }
      });
    }
  }, [progress, onFinish, onClose]);

  return (
    <div className="fixed inset-0 bg-[#240E25]/75 flex items-center justify-center z-50">
      <div className="relative w-[70%] max-w-2xl">
        {/* Background bar */}
        <div className="h-5 bg-[#b392d0] rounded-full overflow-hidden shadow-inner">
          {/* Progress bar */}
          <div
            ref={progressBarRef}
            className="h-full bg-[#E6B9FC] transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Percentage label */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-sm">
          {progress}%
        </div>
      </div>
    </div>
  );
};

export default Loading;
