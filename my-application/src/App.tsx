import { ComponentExamples } from './components/Eventscomponent';
import TanstackForm from './components/Form';

export function App() {
  return (
    <div>
      <ComponentExamples />

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            React Form: TanStack Form with Zod Validation
          </h1>

          <div className="max-w-xl mx-auto">
            <h2 className="text-xl font-semibold text-center mb-4 text-gray-700">
              TanStack Form
            </h2>
            <TanstackForm />
          </div>
        </div>
      </div>
    </div>
  );
}
