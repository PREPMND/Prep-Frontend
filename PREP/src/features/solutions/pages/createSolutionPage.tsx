import CreateSolutionForm from "../components/createSolutionForm";

export default function CreateSolutionPage() {
  return (
    <main className="app-container py-10">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-3xl font-bold">
          Submit Your Solution
        </h1>

        <CreateSolutionForm />
      </div>
    </main>
  );
}