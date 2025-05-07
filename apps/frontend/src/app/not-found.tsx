import Link from "next/link";


export const NotFound = () => {

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
            <p className="text-gray-600 mb-4">
                The page you are looking for does not exist or has been moved.
            </p>
            <Link
                href="/"
                className="text-blue-500 hover:underline text-lg mb-4"
            >
                Go back to Home
            </Link>
            <p className="text-gray-600">
                Alternatively, try searching for what you need in the search bar.
            </p>
        </div>
    );
}

export default NotFound;