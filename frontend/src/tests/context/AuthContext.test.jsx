import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AuthProvider, useAuth } from "../../context/AuthContext";

describe("AuthContext", () => {

    it("should store authentication token", () => {

        const wrapper = ({ children }) => (
            <AuthProvider>{children}</AuthProvider>
        );

        const { result } = renderHook(
            () => useAuth(),
            { wrapper }
        );

        act(() => {
            result.current.login("jwt-token");
        });

        expect(result.current.token).toBe("jwt-token");

    });
    it("should initialize token from localStorage", () => {

        Storage.prototype.getItem = vi.fn(() => "stored-token");

        const wrapper = ({ children }) => (
            <AuthProvider>{children}</AuthProvider>
        );

        const { result } = renderHook(
            () => useAuth(),
            { wrapper }
        );

        expect(result.current.token).toBe("stored-token");

    });

});