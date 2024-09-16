import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../dataSlice';

const GithubTrending = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (loading) return <p className="text-white text-center h-screen content-center text-5xl">Loading...</p>;
  if (error) return <p className="text-white">Error: {error.message}</p>;
  if (data.length === 0) return <p className="text-white">No data available.</p>

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-white text-3xl font-bold">Github Trending</h1>
      <div className="grid grid-cols-2 gap-5 px-20">
        {data.map((e, i) => {
          const categories = e.builtBy || [];
          return (
            <a
              href={e.url}
              target="_blank"
              rel="noopener noreferrer"
              key={i}
              className="text-white bg-[#1D1F25] rounded-xl h-[700px] border border-[#353A44] hover:border-[#545A69] flex flex-col justify-between"
            >
              <p className="text-xl font-medium px-5 mt-4">#{`${i + 1} ${e.name}`}</p>
              <p className="text-xl font-medium px-5 mt-4 text-gray-400">{e.description}</p>
              <div className="p-2">
                <div className="flex gap-2 content-center">
                  <p className="text-[#757D92] ml-1">Contributor:</p>
                  {categories.map((category, j) => (
                    <a
                      href={category.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#757D92] ml-1 hover:text-white hover:cursor-pointer"
                      key={j}
                    >
                      #{category.username}
                    </a>
                  ))}
                </div>
                <img
                  className="w-full h-[480px] rounded-xl"
                  src={e.avatar}
                  alt={e.title}
                />
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default GithubTrending;
