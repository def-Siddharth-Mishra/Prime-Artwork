import ArtworksTable from "./components/Table";
import { config } from "./config";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {config.app.name}
          </h1>
          <p className="text-gray-600">
            Browse and manage artwork collections from the Art Institute of Chicago
          </p>
        </header>
        
        <main>
          <ArtworksTable />
        </main>
        
        <footer className="mt-8 text-center text-sm text-gray-500">
          Version {config.app.version} | Data provided by Art Institute of Chicago API
        </footer>
      </div>
    </div>
  );
}

export default App;