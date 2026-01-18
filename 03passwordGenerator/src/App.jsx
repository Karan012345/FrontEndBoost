import { useCallback, useEffect, useState, useRef } from 'react'



function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useRef Hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_-+={}~`";

    for (let i = 0; i < length; i++) {
      let index = Math.floor(Math.random() * str.length);
      pass += str.charAt(index);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();         //To check current state
    passwordRef.current?.setSelectionRange(0, 4);  //To select text in certain range
    window.navigator.clipboard.writeText(password)   //For copy pass on clipboard
  }, [password])

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div className="w-screen h-screen flex items-center justify-center bg-slate-900">
        <div className="w-full max-w-md rounded-xl p-6 bg-slate-800 shadow-2xl">

          <h2 className="text-2xl font-bold text-white mb-4 text-center">
            Password Generator
          </h2>

          <div className="flex rounded-lg overflow-hidden border border-slate-600 mb-4">
            <input
              type="text"
              value={password}
              className="w-full px-3 py-2 bg-slate-700 text-white outline-none"
              placeholder="Your password"
              readOnly
              ref={passwordRef}
            />
            <button
              onClick={copyPasswordToClipboard}   //This method for copy password
              className="bg-blue-600 hover:bg-blue-700 text-blue px-4 py-2 rounded-md shrink-0 outline-none transition"
            >
              Copy
            </button>
          </div>

          <div className="flex items-center justify-between text-white mb-3">
            <label>Password Length: {length}</label>
            <input
              type="range"
              min="6"
              max="20"
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
          </div>

          <div className="flex items-center text-white mb-2">
            <input
              type="checkbox"
              checked={numberAllowed}
              id="numberInput"
              onChange={() => setNumberAllowed(!numberAllowed)}
              className="mr-2"
            />
            <label>Include Numbers</label>
          </div>

          <div className="flex items-center text-white">
            <input
              type="checkbox"
              checked={charAllowed}
              onChange={() => setCharAllowed(!charAllowed)}
              className="mr-2"
            />
            <label>Include Special Characters</label>
          </div>


        </div>
      </div>



    </>
  )
}

export default App
