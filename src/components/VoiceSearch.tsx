/**
 * Copyright (c) 2024 Sabina Begum. All rights reserved.
 *
 * PROPRIETARY SOFTWARE - CONFIDENTIAL
 *
 * This file contains proprietary and confidential information.
 * Unauthorized copying, distribution, or use is strictly prohibited.
 *
 * For licensing inquiries: begumsabina81193@gmail.com
 *
 * Educational use only - Commercial use prohibited.
 */

import { useState, useRef, useEffect } from "react";
import Button from "./ui/Button";

interface VoiceSearchProps {
  onSearch: (searchTerm: string) => void;
  darkMode: boolean;
}

function VoiceSearch({ onSearch, darkMode }: VoiceSearchProps) {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    // Initialize speech recognition
    const SpeechRecognition =
      (window as unknown as { SpeechRecognition?: new () => SpeechRecognition })
        .SpeechRecognition ||
      (
        window as unknown as {
          webkitSpeechRecognition?: new () => SpeechRecognition;
        }
      ).webkitSpeechRecognition;

    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onstart = () => {
        setIsListening(true);
      };

      recognitionRef.current.onresult = (event: unknown) => {
        const e = event as { results: Array<Array<{ transcript: string }>> };
        const transcript = e.results[0][0].transcript;
        setIsListening(false);

        // Log successful voice recognition event
        console.log("Voice recognition successful:", {
          transcript,
          timestamp: new Date().toISOString(),
        });
      };

      recognitionRef.current.onerror = (event: unknown) => {
        const e = event as { error: string };
        const errorMessage = `Voice recognition error: ${e.error}`;
        console.error(errorMessage, {
          error: e.error,
          timestamp: new Date().toISOString(),
        });
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [onSearch]);

  const startListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error("Failed to start voice recognition:", error);
      }
    } else {
      console.error("Speech recognition not supported");
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  if (!recognitionRef.current) {
    return (
      <div
        className={`p-4 rounded-lg border ${
          darkMode
            ? "bg-neutral-800 border-stone-700"
            : "bg-gray-100 border-gray-300"
        }`}
      >
        <p
          className={`text-sm ${darkMode ? "text-stone-300" : "text-gray-600"}`}
        >
          🎤 Voice search is not supported in your browser. Please use Chrome or
          Edge for voice features.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`p-4 rounded-lg border ${
        darkMode
          ? "bg-black border-stone-700"
          : "bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3
          className={`text-lg font-bold break-words ${
            darkMode ? "text-green-400" : "text-green-900"
          }`}
        >
          Voice Search
        </h3>
        <div className="flex items-center space-x-2 flex-shrink-0">
          {isListening && (
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <div
                className="w-2 h-2 bg-red-500 rounded-full animate-pulse"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-2 h-2 bg-red-500 rounded-full animate-pulse"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
          )}
        </div>
      </div>

      {/* Voice Input Display */}
      {/* transcript state was removed, so this section is no longer needed */}

      {/* Error Display */}
      {/* error && ( // This state was removed, so this section is no longer needed */}
      {/*   <div // This state was removed, so this section is no longer needed */}
      {/*     className={`mb-4 p-3 rounded-lg ${ // This state was removed, so this section is no longer needed */}
      {/*       darkMode ? "bg-red-900 border-red-700" : "bg-red-100 border-red-400" // This state was removed, so this section is no longer needed */}
      {/*     } border`} // This state was removed, so this section is no longer needed */}
      {/*   > // This state was removed, so this section is no longer needed */}
      {/*     <p // This state was removed, so this section is no longer needed */}
      {/*       className={`text-sm break-words overflow-hidden ${ // This state was removed, so this section is no longer needed */}
      {/*         darkMode ? "text-red-100" : "text-red-700" // This state was removed, so this section is no longer needed */}
      {/*       }`} // This state was removed, so this section is no longer needed */}
      {/*     > // This state was removed, so this section is no longer needed */}
      {/*       {error} // This state was removed, so this section is no longer needed */}
      {/*     </p> // This state was removed, so this section is no longer needed */}
      {/*   </div> // This state was removed, so this section is no longer needed */}
      {/* ) // This state was removed, so this section is no longer needed */}

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <Button
          onClick={isListening ? stopListening : startListening}
          variant={isListening ? "danger" : "primary"}
          size="lg"
          darkMode={darkMode}
          className="flex items-center space-x-2 flex-shrink-0"
        >
          {isListening ? (
            <>
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="hidden sm:inline">Stop</span>
            </>
          ) : (
            <>
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="hidden sm:inline">Start Voice Search</span>
            </>
          )}
        </Button>

        {/* transcript state was removed, so this section is no longer needed */}
        {/* <Button
          onClick={handleSearch}
          variant="secondary"
          size="md"
          darkMode={darkMode}
          className="flex-shrink-0"
        >
          Search
        </Button>
        <Button
          onClick={clearTranscript}
          variant="secondary"
          size="md"
          darkMode={darkMode}
          className="flex-shrink-0"
        >
          Clear
        </Button> */}
      </div>

      {/* Instructions */}
      <div className="mt-4">
        <p
          className={`text-xs break-words overflow-hidden ${
            darkMode ? "text-stone-400" : "text-gray-600"
          }`}
        >
          Try saying: &quot;chicken recipes&quot;, &quot;vegetarian pasta&quot;,
          &quot;quick breakfast&quot;, etc.
        </p>
      </div>
    </div>
  );
}

export default VoiceSearch;
