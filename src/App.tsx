import { InfoIcon } from "lucide-react"
import { Button } from "./components/ui/button"
import { Inputs } from "./components/inputs"

function App() {
  return (
    <>
      <h1 className="text-2xl font-bold">Hello World</h1>
      <Inputs />
      <div className="flex gap-1">
        <InfoIcon />
        <p>This is a React app with TypeScript.</p>
      </div>
      <Button>Its a button from Shadcn</Button>
    </>
  )
}

export default App
