"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
        toast.error("Critical Application Error", {
            description: error.message
        });
    }, [error]);

    return (
        <html>
            <body>
                 <div className="flex h-screen w-full flex-col items-center justify-center bg-white p-4 text-center text-black">
                    <h2 className="text-2xl font-bold mb-4">Critical Error</h2>
                    <p className="mb-8">The application has crashed completely.</p>
                    <button
                        onClick={() => reset()}
                        className="px-6 py-2 bg-blue-600 text-white rounded-full font-medium"
                    >
                        Reload App
                    </button>
                </div>
            </body>
        </html>
    );
}
