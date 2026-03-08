import WorkflowCanvas from '@/components/workflow/WorkflowCanvas';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <div className="z-10 w-full max-w-7xl items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-2xl font-bold mb-4 text-foreground">InnoSage AI Pipeline Manager</h1>
      </div>
      <div className="w-full max-w-7xl flex-grow flex flex-col items-center">
        <div className="w-full shadow-lg flex-grow flex">
          <WorkflowCanvas />
        </div>
      </div>
    </main>
  );
}