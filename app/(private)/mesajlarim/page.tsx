import MessageList from "./components/MessageList"
import Footer from "@/components/Footer";

const page = () => {
  return (

    <>
    
    <main className="p-3">
  <MessageList/>
  </main>

<div className="h-[150px]">

<Footer fixed="fixed"/>
</div>
    </>
  )
}

export default page