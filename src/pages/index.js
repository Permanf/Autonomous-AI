import Layout from "../component/layout/layout";
import CreateForm from "../component/prompt/create-form";
import SwitchA from "../component/ui/switch/switch";

export default function Home() {
  return (
    <Layout>
      <div className="bg-dark-2 w-full h-layout rounded-3xl px-6 py-4 text-white mt-2">
        <div className="flex justify-between items-start w-full h-header border-b border-neutral-700">
          <h1 className="text-2xl font-medium text-white">Creating New AI</h1>
          <div className="flex items-center space-x-6 mt-2">
            <p>Continous mode:</p>
            <SwitchA />
          </div>
        </div>
        <CreateForm />
      </div>
    </Layout>
  );
}
