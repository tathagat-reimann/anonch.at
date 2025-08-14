import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-0 p-4">
      <div className="text-center">
        <h2 className="text-6xl font-bold text-gray-800 dark:text-gray-200 mb-4">404</h2>
        <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Page Not Found</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        <Link 
          href="/"
          className="inline-flex text-white bg-orange-500 border-0 py-3 px-6 focus:outline-none hover:bg-orange-600 rounded-lg transition-colors duration-200"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}
