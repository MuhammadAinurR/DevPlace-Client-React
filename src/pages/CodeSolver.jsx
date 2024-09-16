import { useEffect, useState } from "react";
import request from "../utils/axios";
import SyntaxHIghlighter from 'react-syntax-highlighter'
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import showToast from "../utils/toast";


export default () => {
    const [input, setInput] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [componentCode, setComponentCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };
    const handleErrorChange = (e) => {
        setErrorMessage(e.target.value);
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await request.post('gemini/code-solver', { input, errorMessage });
            setComponentCode(response.data);
        } catch (err) {
            setError('An error occurred while fetching the component.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-5">

            <p className="text-white font-bold text-3xl">Code Solver</p>
            <div className="mb-4">
                <label htmlFor="input" className="block text-sm font-medium text-white">Do not suffer anymore, tell me your code and the error:</label>
                <input
                    name='input'
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    className="block w-full p-2 ps-4 mt-3 text-sm rounded-lg bg-[#1D1F25] autofill:bg-[#1D1F25] outline-none border text-white border-transparent focus:border-[#383D48]"
                    placeholder="Paste your code here"
                />
                <input
                    name='errorMessage'
                    type="text"
                    value={errorMessage}
                    onChange={handleErrorChange}
                    className="block w-full p-2 ps-4 mt-3 text-sm rounded-lg bg-[#1D1F25] autofill:bg-[#1D1F25] outline-none border text-white border-transparent focus:border-[#383D48]"
                    placeholder="Paste your error here"
                />
            </div>
            <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-[170px] text-center inline-flex justify-center items-center px-6 py-2.5 bg-[#737b8e] text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-[#555a69] hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
            >
                {loading ? 'Loading...' : 'Generate Solution'}
            </button>
            {error && <div className="mt-4 text-red-500">{error}</div>}
            {componentCode &&
                <div className="mt-4">
                    <h2 className="text-xl font-semibold mb-2 text-white">Generated Solution</h2>
                    <pre className="rounded-md overflow-x-auto">
                        <div className="flex justify-between px-4 pt-1 text-white text-xs items-cente bg-gray-500">
                            <p className="text-sm">Your solution is here!</p>
                            <button onClick={() => {
                                navigator.clipboard.writeText(componentCode);
                                showToast({ message: 'success copy the code', type: 'success' })
                            }} className="py-1 inline-flex items-center gap-1">Copy Solution</button>
                        </div>
                        <SyntaxHIghlighter
                            style={atomOneDark}
                            customStyle={{ padding: '25px' }}
                            wrapLongLines={true}
                        >
                            {componentCode}
                        </SyntaxHIghlighter>



                    </pre>
                </div>
            }
        </div>
    );
}