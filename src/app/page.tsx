"use client";
import { useEffect, useState } from "react";
import { filteredProducts } from "~/server/db/actions";

export default function HomePage() {
  const [searchParam, setSearchParam] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    filteredProducts(searchParam).then((res) => {
      setResults(() => res);
      setLoading(false);
    });
  }, [searchParam]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div>
        Search:{" "}
        <input
          className="rounded-sm text-black"
          type="text"
          value={searchParam}
          onChange={async (e) => {
            setSearchParam(e.target.value);
          }}
        ></input>
      </div>
      { isLoading && <div>Loading...</div>}
      {!!results.length && (
        <table className="table-auto">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Product ID</th>
              <th>Metro Area Title</th>
              <th>Project Full Name</th>
              <th>Project Group ID</th>
            </tr>
          </thead>
          <tbody>
            {results.map((res, index) => (
              <tr key={index}>
                <td>{res.productName || "NULL"}</td>
                <td>{res.productID || "NULL"}</td>
                <td>{res.metroAreaTitle || "NULL"}</td>
                <td>{res.projectFullName || "NULL"}</td>
                <td>{res.projectGroupID || "NULL"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {!results.length && <div>No results found...</div>}
    </main>
  );
}
