
const LoaderSpinner = () => {
  return (
   <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
        <p className="text-black font-semibold">Loading...</p>
      </div>
    </div>
  )
}

export default LoaderSpinner
