import PeriscopeForm from "@/components/PeriscopeForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="flex items-center gap-4 mb-8">
        <img src="/periscope-1x1.png" alt="Periscope Logo" className="w-10"/>
        <h1 className="text-4xl font-bold">Periscope</h1>
      </div>
      <PeriscopeForm />
    </main>
  );
}
