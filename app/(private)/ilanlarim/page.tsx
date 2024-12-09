import Footer from "@/components/Footer"
import AdsList from "./components/AdsList"


const page = () => {
  return (
    <>
    <main className="p-3">
    <AdsList/>
    
  </main>

  <div className="h-[150px]">

    <Footer fixed="fixed"/>
    </div>
    
    </>
  )
}

export default page