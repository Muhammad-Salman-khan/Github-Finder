import { Toaster } from "sonner";
import Profile from "./components/ui/Profile";
const App = () => {
  return (
    <>
      <div className="min-h-screen max-w-screen bg-zinc-950 text-white flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <Profile />
        <Toaster expand={true} richColors position={"top-center"} />
      </div>
    </>
  );
};

export default App;
