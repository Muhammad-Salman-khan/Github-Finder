import Profile from "./components/ui/Profile";
import Suggestion from "./components/ui/Suggestion";
const App = () => {
  return (
    <>
      <div className="min-h-screen max-w-screen bg-zinc-950 text-white flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <Profile />
      </div>
    </>
  );
};

export default App;
