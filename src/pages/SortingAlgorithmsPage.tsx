import type React from "react";
import { useRef, useState } from "react";
import { ArrowUpDown, Clock, Code2, GitCompare, Eye } from "lucide-react";
import SortingVisualizer from "../components/SortingVisualizer";
import ParallelSortingVisualizer from "../components/ParallelSortingVisualizer";
import { Link } from "react-router-dom";
import { getAvailableAlgorithms } from "../utils/sortingAlgorithms";
import type Algorithm from "../types/algorithms";
import { SortingAlgorithms } from "../enums/SortingAlgorithms";

const sortingAlgorithms = getAvailableAlgorithms();

function SortingAlgorithmsPage() {
  const [selectedAlgorithm, setSelectedAlgorithm] =
    useState<Algorithm<SortingAlgorithms> | null>(null);
  const [selectedAlgorithm2, setSelectedAlgorithm2] =
    useState<Algorithm<SortingAlgorithms> | null>(null);
  const [inputArray, setInputArray] = useState<string>("");
  const [showVisualization, setShowVisualization] = useState(false);
  const [comparisonMode, setComparisonMode] = useState(false);
  const vizRef = useRef<HTMLDivElement | null>(null);

  const handleAlgorithmSelect = (algorithm: Algorithm<SortingAlgorithms>) => {
    setSelectedAlgorithm(algorithm);
    setInputArray("64 34 25 12 22 11 90");
    setShowVisualization(true);
    setTimeout(() => {
      if (vizRef.current) {
        vizRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 0);
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputArray.trim()) {
      setShowVisualization(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto py-4 px-4 md:p-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 md:gap-0 items-center justify-between">
            <div className="flex items-center space-x-3 min-h-[110px]">
              <Link to={"/"}>
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500">
                  <ArrowUpDown className="w-6 h-6 text-white" />
                </div>
              </Link>
              <div className="p-2">
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Sorting Algorithms Visualizer
                </h1>
                <p className="text-sm md:text-base mt-2 text-gray-600">
                  {comparisonMode
                    ? "Compare two sorting algorithms side by side"
                    : "Explore how different sorting algorithms organize data step by step"}
                </p>
              </div>
            </div>

            {/* Mode Toggle */}
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setComparisonMode(false)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${!comparisonMode
                    ? "bg-white shadow-sm text-blue-600"
                    : "text-gray-600 hover:text-gray-800"
                  }`}
              >
                <Eye className="w-5 h-5 md:w-6 md:h-6" />
                <span className="text-sm font-medium">Single View</span>
              </button>
              <button
                onClick={() => setComparisonMode(true)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${comparisonMode
                    ? "bg-white shadow-sm text-purple-600"
                    : "text-gray-600 hover:text-gray-800"
                  }`}
              >
                <GitCompare className="w-5 h-5 md:w-6 md:h-6" />
                <span className="text-sm font-medium">Compare</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 mb-8 md:grid-cols-2 lg:grid-cols-3">
          {sortingAlgorithms.map((algorithm) => (
            <div
              key={algorithm.name}
              className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 transform hover:-translate-y-1 ${comparisonMode
                  ? selectedAlgorithm?.name === algorithm.name
                    ? "border-blue-500 ring-2 ring-blue-200"
                    : selectedAlgorithm2?.name === algorithm.name
                      ? "border-purple-500 ring-2 ring-purple-200"
                      : "border-gray-200 hover:border-blue-300"
                  : selectedAlgorithm?.name === algorithm.name
                    ? "border-blue-500 ring-2 ring-blue-200"
                    : "border-gray-200 hover:border-blue-300"
                }`}
              onClick={() => {
                if (comparisonMode) {
                  if (!selectedAlgorithm) {
                    setSelectedAlgorithm(algorithm);
                  } else if (
                    !selectedAlgorithm2 &&
                    algorithm.name !== selectedAlgorithm.name
                  ) {
                    setSelectedAlgorithm2(algorithm);
                  } else if (selectedAlgorithm.name === algorithm.name) {
                    setSelectedAlgorithm(null);
                  } else if (selectedAlgorithm2?.name === algorithm.name) {
                    setSelectedAlgorithm2(null);
                  } else {
                    setSelectedAlgorithm2(algorithm);
                  }
                } else {
                  handleAlgorithmSelect(algorithm);
                }
              }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    {algorithm.name}
                  </h3>
                  <div className="flex items-center space-x-2">
                    {comparisonMode &&
                      selectedAlgorithm?.name === algorithm.name && (
                        <div className="px-2 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded">
                          Algorithm 1
                        </div>
                      )}
                    {comparisonMode &&
                      selectedAlgorithm2?.name === algorithm.name && (
                        <div className="px-2 py-1 text-xs font-medium text-purple-800 bg-purple-100 rounded">
                          Algorithm 2
                        </div>
                      )}
                    <div className="p-2 rounded-lg bg-gradient-to-r from-blue-100 to-purple-100">
                      <ArrowUpDown className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                </div>

                <p className="mb-6 leading-relaxed text-gray-600">
                  {algorithm.description}
                </p>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="p-3 rounded-lg bg-gray-50">
                    <div className="flex items-center mb-2 space-x-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">
                        Time Complexity
                      </span>
                    </div>
                    <p className="text-lg font-bold text-blue-600">
                      {algorithm.timeComplexity}
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-gray-50">
                    <div className="flex items-center mb-2 space-x-2">
                      <Code2 className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">
                        Space Complexity
                      </span>
                    </div>
                    <p className="text-lg font-bold text-purple-600">
                      {algorithm.spaceComplexity}
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="text-sm">
                    <span className="font-medium text-green-700">
                      Best Case:
                    </span>
                    <span className="ml-2 text-gray-600">
                      {algorithm.bestCase}
                    </span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-red-700">
                      Worst Case:
                    </span>
                    <span className="ml-2 text-gray-600">
                      {algorithm.worstCase}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {((comparisonMode && selectedAlgorithm && selectedAlgorithm2) ||
          (!comparisonMode && selectedAlgorithm)) && (
            <div className="bg-white border border-gray-200 shadow-lg rounded-2xl">
              <div className="p-6">
                <h3 className="mb-4 text-xl font-bold text-gray-900">
                  {comparisonMode
                    ? `Compare ${selectedAlgorithm.name} vs ${selectedAlgorithm2?.name}`
                    : `Visualize ${selectedAlgorithm.name}`}
                </h3>

                <form onSubmit={handleInputSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="array-input"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Array Elements
                    </label>
                    <input
                      id="array-input"
                      type="text"
                      value={inputArray}
                      onChange={(e) => setInputArray(e.target.value)}
                      placeholder="Enter array (e.g., 64 34 25 12 22 11 90)"
                      className="w-full px-4 py-3 transition-colors border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <p className="mt-2 text-sm text-gray-500">
                      Tip: For arrays with 100+ elements, zoom and pan controls will be automatically enabled for better visualization.
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full md:w-auto inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:-translate-y-0.5"
                  >
                    {comparisonMode ? (
                      <GitCompare className="w-5 h-5 mr-2" />
                    ) : (
                      <ArrowUpDown className="w-5 h-5 mr-2" />
                    )}
                    {comparisonMode
                      ? "Start Comparison"
                      : "Start Sorting Visualization"}
                  </button>
                </form>

                {showVisualization && (
                  <div ref={vizRef} className="pt-8 mt-8 border-t">
                    {comparisonMode && selectedAlgorithm2 ? (
                      <ParallelSortingVisualizer
                        algorithm1={selectedAlgorithm}
                        algorithm2={selectedAlgorithm2}
                        inputArray={inputArray}
                      />
                    ) : (
                      <SortingVisualizer
                        algorithm={selectedAlgorithm}
                        inputArray={inputArray}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

        {comparisonMode && (!selectedAlgorithm || !selectedAlgorithm2) && (
          <div className="p-6 border-2 border-purple-300 border-dashed bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl">
            <div className="text-center">
              <GitCompare className="w-12 h-12 mx-auto mb-4 text-purple-600" />
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                Select Two Algorithms to Compare
              </h3>
              <p className="text-gray-600">
                {!selectedAlgorithm
                  ? "Choose your first algorithm from the cards above"
                  : !selectedAlgorithm2
                    ? `Selected: ${selectedAlgorithm.name}. Now choose a second algorithm to compare with.`
                    : ""}
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default SortingAlgorithmsPage;
