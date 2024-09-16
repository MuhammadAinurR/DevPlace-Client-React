import { useEffect, useState } from "react"
import request from "../utils/axios"
import { Link } from "react-router-dom"

export default () => {
    const [categories, setCategories] = useState([])
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const {data} = await request.get('/categories');
                setCategories(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchCategories();
    }, [])
    return (
        <div className="flex flex-col gap-5">
            <p className="text-white font-bold text-3xl">All tags</p>
            <div className="flex gap-4 flex-wrap">
            {categories.map((e, i) => {
                return (
                    <Link to={`/?category=${e.id}`} className="text-[#A8B3CF] hover:text-white bg-[#21262E] w-auto py-1 px-3 rounded-md text-xl" key={i}>#{e.name}</Link>
                )
            })}
            </div>
        </div>
    )
}