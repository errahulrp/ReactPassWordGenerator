import { useCallback, useRef, useState } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [password, setPassword] = useState(0)
  const [charAllowed, setCharAllowed] = useState(false)
  const [NumAllowed, setNumAllowed] = useState(false)

  const passwordGenerator = useCallback(() => {

    let pass = '';
    let Str = "ABCDEFGHIJKLMNOPQRSTWXYZabcdefghijklmnopqrstwxyz"

    if (charAllowed) Str += "~!@#$%^&*()"
    if(NumAllowed) Str += "1234567890"

    for (let i = 1; i <= length; i++) {
      const char = Math.floor(Math.random() * Str.length)

      pass += Str.charAt(char)
    }

    setPassword(pass)

  }, [length, charAllowed, NumAllowed])

  const passwordRef = useRef(null)

  const handleCopy = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  }, [password])


  return (
    <div className=' flex flex-col gap-5 justify-center items-center h-screen bg-black'>
      <div className=' p-10 bg-green-700 rounded-sm'>
        <input type="text" readOnly className=' py-1 rounded-xl outline-none p-3' value={password} ref={passwordRef} />
        <label className=' text-white bg-blue-600 p-2 rounded-xl ml-3 ' onClick={handleCopy}>copy</label>
        <div className=' mt-5 ml-5'>
          <input type="Range" min={8} max={100} value={length} onChange={(e) => setLength(e.target.value)} />
          <label htmlFor="range" className='ml-2'>length: {length}</label>
        </div>
        <div className=' mt-4 ml-4'>
          <input type="checkbox" onChange={() => { setCharAllowed((prev) => !prev) }} />
          <label htmlFor="checkbox" className=' ml-1'>Special Allowed</label>
          <input type="checkbox" className=' ml-5' onChange={() => { setNumAllowed((prev) => !prev) }} />
          <label htmlFor="checkbox" className=' ml-1'>Number</label>
        </div>
      </div>
      <div className=' p-5 bg-sky-700 font-bold rounded-full text-white cursor-pointer' onClick={passwordGenerator}> Generate</div>
    </div>
  )
}

export default App
