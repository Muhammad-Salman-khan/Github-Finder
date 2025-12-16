import { useState } from "react";
import { Button } from "./components/ui/button";
const App = () => {
  const [state, setstate] = useState<any>(null);
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Button>Click me</Button>
    </div>
  );
};

export default App;
