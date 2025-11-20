'use client'

import { useEffect, useState } from "react";
import axios from "axios"; // ✅ Import axios
import News from "../components/News/News";
import { toast } from "react-toastify";
import NewsContainer from "../components/NewsContainer/NewsContainer";

function BrezadaNews() {
  const [newsList, setNewsList] = useState([]);

  const getNews = async () => {
    try {
      const res = await axios.get("/api/news");
      setNewsList(res.data.news || []);
    } catch (err) {
      toast.error("Failed to load news");
      console.error(err);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  console.log(newsList)
  return (
    <div className="BrezadaNews">
     <NewsContainer/>
    </div>
  );
}

export default BrezadaNews;
