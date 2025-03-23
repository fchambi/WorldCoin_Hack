"use client";
import { MiniKit, WalletAuthInput } from "@worldcoin/minikit-js";
import { Button } from "@worldcoin/mini-apps-ui-kit-react";
import { useCallback, useEffect, useState } from "react";

const walletAuthInput = (nonce: string): WalletAuthInput => {
    return {
        nonce,
        requestId: "0",
        expirationTime: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
        notBefore: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
        statement: "This is my statement and here is a link https://worldcoin.com/apps",
    };
};

type User = {
    walletAddress: string;
    username: string | null;
    profilePictureUrl: string | null;
};

interface LoginProps {
    onLoginSuccess?: () => void;
}

export const Login = ({ onLoginSuccess }: LoginProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    
    const refreshUserData = useCallback(async () => {
        try {
            const response = await fetch('/api/auth/me');
            if (response.ok) {
                const data = await response.json();
                if (data.user) {
                    setUser(data.user);
                    setIsVerified(true);
                }
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }, []);
    
    useEffect(() => {
        refreshUserData();
    }, [refreshUserData]);
    
    const handleLogin = async () => {
        try {
            setLoading(true);
            const res = await fetch(`/api/nonce`);
            const { nonce } = await res.json();

            const { finalPayload } = await MiniKit.commandsAsync.walletAuth(walletAuthInput(nonce));

            if (finalPayload.status === 'error') {
                setLoading(false);
                return;
            } else {
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        payload: finalPayload,
                        nonce,
                    }),
                });

                if (response.status === 200) {
                    setUser(MiniKit.user);
                    setIsVerified(true);
                }
                setLoading(false);
            }
        } catch (error) {
            console.error("Login error:", error);
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', {
                method: 'POST',
            });
            
            setUser(null);
            setIsVerified(false);
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    const handleEnter = () => {
        onLoginSuccess?.();
    };

    return (
        <div className="flex flex-col items-center space-y-6">
            {!user ? (
                <Button 
                    onClick={handleLogin} 
                    disabled={loading}
                >
                    {loading ? "Connecting..." : "Login"}
                </Button>
            ) : (
                <div className="flex flex-col items-center space-y-4">
                    <div className="text-green-600 font-medium">✓ Connected</div>
                    <div className="flex items-center space-x-2">
                        {user?.profilePictureUrl && (
                            <img
                                src={user.profilePictureUrl}
                                alt="Profile"
                                className="w-8 h-8 rounded-full"
                            />
                        )}
                        <span className="font-medium">
                            {user?.username || user?.walletAddress.slice(0, 6) + '...' + user?.walletAddress.slice(-4)}
                        </span>
                    </div>
                    
                    {isVerified && (
                        <div className="flex flex-col items-center space-y-4">
                            <div className="text-sm text-gray-600 text-center">
                                Your account has been verified. Click below to enter the platform.
                            </div>
                            <Button
                                onClick={handleEnter}
                                className="bg-blue-600 hover:bg-blue-700"
                            >
                                Enter Platform
                            </Button>
                        </div>
                    )}

                    <Button
                        onClick={handleLogout}
                        variant="secondary"
                        size="md"
                        disabled={loading}
                    >
                        {loading ? "Signing Out..." : "Sign Out"}
                    </Button>
                </div>
            )}
        </div>
    )
};
