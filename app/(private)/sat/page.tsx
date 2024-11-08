'use client'

import SetInfoBook from "./components/SetInfoBook"


const page = () => {
  const onClose = ()=>null
  return (
    <main className="p-3">
    <SetInfoBook arrange={false} onClose={onClose}/>
  </main>
  )
}

export default page