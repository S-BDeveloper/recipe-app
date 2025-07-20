interface LoadingSkeletonProps {
  darkMode: boolean;
}

export default function LoadingSkeleton({ darkMode }: LoadingSkeletonProps) {
  return (
    <div className="compact-section">
      <div
        className={`rounded-xl shadow-lg border overflow-hidden ${
          darkMode
            ? "bg-neutral-900 border-neutral-700"
            : "bg-white border-gray-200"
        }`}
      >
        <div className="flex flex-col md:flex-row gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-6">
          <div className="flex-1 flex items-center justify-center">
            <div
              className={`w-full h-48 sm:h-64 md:h-80 lg:h-[500px] xl:h-[450px] 2xl:h-[500px] animate-pulse rounded-lg ${
                darkMode ? "bg-neutral-800" : "bg-gray-200"
              }`}
            ></div>
          </div>
          <div className="w-full md:w-80 flex flex-col justify-start md:justify-center">
            <div
              className={`h-6 animate-pulse rounded mb-4 ${
                darkMode ? "bg-neutral-800" : "bg-gray-200"
              }`}
            ></div>
            <div className="space-y-2 mb-4">
              <div
                className={`h-4 animate-pulse rounded ${
                  darkMode ? "bg-neutral-800" : "bg-gray-200"
                }`}
              ></div>
              <div
                className={`h-4 animate-pulse rounded w-3/4 ${
                  darkMode ? "bg-neutral-800" : "bg-gray-200"
                }`}
              ></div>
              <div
                className={`h-4 animate-pulse rounded w-1/2 ${
                  darkMode ? "bg-neutral-800" : "bg-gray-200"
                }`}
              ></div>
            </div>
            <div
              className={`h-4 animate-pulse rounded mb-3 ${
                darkMode ? "bg-neutral-800" : "bg-gray-200"
              }`}
            ></div>
            <div className="space-y-2">
              <div
                className={`h-4 animate-pulse rounded ${
                  darkMode ? "bg-neutral-800" : "bg-gray-200"
                }`}
              ></div>
              <div
                className={`h-4 animate-pulse rounded w-5/6 ${
                  darkMode ? "bg-neutral-800" : "bg-gray-200"
                }`}
              ></div>
              <div
                className={`h-4 animate-pulse rounded w-4/5 ${
                  darkMode ? "bg-neutral-800" : "bg-gray-200"
                }`}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

