import { useEffect, useState } from "react";
import request from "../utils/axios";
import SyntaxHIghlighter from 'react-syntax-highlighter'
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import showToast from "../utils/toast";


export default () => {
    const [input, setInput] = useState('');
    const [componentCode, setComponentCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await request.post('gemini/component-generator', { input });
            setComponentCode(response.data);
        } catch (err) {
            setError('An error occurred while fetching the component.');
        } finally {
            setLoading(false);
        }
    };

    function excludeFirstAndLastLine(text) {
        // Split the text into lines
        const lines = text.split('\n');

        // Check if there are enough lines to exclude
        if (lines.length <= 2) {
            return ''; // Not enough lines to exclude the first and last line
        }

        // Remove the first and last line
        const newLines = lines.slice(1, -1);

        // Join the remaining lines into a single string
        return newLines.join('\n');
    }


    return (
        <div className="flex flex-col gap-5">

            <p className="text-white font-bold text-3xl">Component Generator</p>
            <div className="mb-4">
                <label htmlFor="input" className="block text-sm font-medium text-white">Enter component type:</label>
                <input
                    name='input'
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    className="block w-full p-2 ps-4 mt-3 text-sm rounded-lg bg-[#1D1F25] autofill:bg-[#1D1F25] outline-none border text-white border-transparent focus:border-[#383D48]"
                    placeholder="Product Card"
                />
            </div>
            <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-[100px] inline-flex items-center px-6 py-2.5 bg-[#737b8e] text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-[#555a69] hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
            >
                {loading ? 'Loading...' : 'Generate'}
            </button>
            {error && <div className="mt-4 text-red-500">{error}</div>}
            {componentCode &&
                <div className="mt-4">
                    <h2 className="text-xl font-semibold mb-2 text-white">Generated Component Code:</h2>
                    <pre className="rounded-md overflow-x-auto">
                        <div className="flex justify-between px-4 pt-1 text-white text-xs items-cente bg-gray-500">
                            <p className="text-sm">Example code</p>
                            <button onClick={() => {
                                navigator.clipboard.writeText(excludeFirstAndLastLine(componentCode));
                                showToast({ message: 'success copy the code', type: 'success' })
                            }} className="py-1 inline-flex items-center gap-1">Copy code</button>
                        </div>
                        <SyntaxHIghlighter
                            language="javascript"
                            style={atomOneDark}
                            customStyle={{ padding: '25px' }}
                            wrapLongLines={true}
                        >
                            {excludeFirstAndLastLine(componentCode)}
                        </SyntaxHIghlighter>



                    </pre>
                </div>
            }
        </div>
    );
}