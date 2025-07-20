import { render, screen } from "@testing-library/react";
import Favorites from "../Favorites";
import { AuthContext } from "../../contexts/AuthContextDef";
import { MemoryRouter } from "react-router-dom";
import { jest, describe, beforeEach, it } from "@jest/globals";
import type { AuthContextType } from "../../global"

jest.mock("firebase/auth", () => ({
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
  onAuthStateChanged: jest.fn(),
  updateProfile: jest.fn(),
  sendPasswordResetEmail: jest.fn(),
}));

const mockAuth = {
  currentUser: { uid: "test-user" },
  isDemoUser: false,
  // Add any other context values if needed
};

describe("Favorites", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders the header and empty state when no favorites", async () => {
    render(
      <AuthContext.Provider value={mockAuth as AuthContextType}>
        <MemoryRouter>
          <Favorites darkMode={false} />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    await screen.findByText(/My Favorites/i);
    await screen.findByText(/No favorites yet/i);
  });
});
