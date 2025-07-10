import { useEffect, useRef, useState } from "react"


export default function Quotes() {
    const [quote, setQuote] = useState<any>()
    const hasFetched = useRef(false)
    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;
        const getQuote = async () => {
            fetch("https://stoic-quotes.com/api/quote")
                .then(res => res.json())
                .then(data => setQuote(data));

        }
        getQuote()
    }, [])
    return (
        <div aria-label="quote-container" className="h-full hidden md:flex justify-center items-center border-r-1 border-olive">
            {quote && (
                <div className="w-4/5">
                    <p className="text-2xl text-accent">{quote?.text}</p>
                    <p className="text-right text-xl font-medium text-olive">- {quote?.author}</p>
                </div>
            )}
        </div>
    )
}
