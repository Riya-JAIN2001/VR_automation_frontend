import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Skeleton } from './ui/skeleton';

function Dashboard() {
  const [cryptoList, setCryptoList] = useState([]);
  const [loading, setLoading] = useState(true);

  function decimalToPercentage(decimal) {
    if (decimal === null || decimal === undefined) return "0.0";
    const percent = decimal * 100;
    return percent.toFixed(2);
  }

  function formatCurrency(
  value,
  currency = "USD",
  minimumFractionDigits = 2,
  maximumFractionDigits = 2
) {
  if (value === null || value === undefined) return "N/A";

  minimumFractionDigits = Math.max(0, minimumFractionDigits);
  maximumFractionDigits = Math.max(minimumFractionDigits, maximumFractionDigits);

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value);
}


  function convertDate(dateStr) {
    
    const date = new Date(dateStr);
    return date.toLocaleString();
  }

  function handleRowClick(coinId) {
    console.log("Clicked coin:", coinId);
    // optionally navigate or open modal
  }

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await axios.get('https://vr-backend-kyc2.onrender.com/api/coins');
        setCryptoList(res.data);
        console.log(res.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []); // run only once

  return (
   <div className=" bg-gray-950 rounded-lg flex justify-center items-center text-white">
    <Table className=" bg-gray-950 rounded-lg text-white">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[25px]">Sr.</TableHead>
          <TableHead className="w-[25px]">Icon</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className="text-right">% (24h)</TableHead>
          <TableHead className="text-right">Market Cap</TableHead>
          <TableHead className="text-right">Last Update</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cryptoList && cryptoList.map((coin, i) => {
          const isCoinObject = coin.price !== undefined;
          return (
            <TableRow
              key={`${coin.name}${i}`}
              className="cursor-pointer"
              onClick={() => handleRowClick(coin.coinId)}
            >
              <TableCell>
                <div className="font-medium flex items-center">
                  {i + 1}
                </div>
              </TableCell>
              <TableCell>
                <img
                  src={coin.image}
                  alt={`${coin.name} logo`}
                  class="w-6 h-6"
                />
              </TableCell>
              <TableCell>{coin.name}</TableCell>
              <TableCell>
                {coin.current_price}
              </TableCell>
              <TableCell
                className={
                  decimalToPercentage(coin.price_change_24h) < 0
                    ? "text-red-600"
                    : "text-green-600"
                }
              >
                <div className="flex justify-end items-center">
                  {
                    `${decimalToPercentage(coin.price_change_24h)}%`
                    }
                 
                </div>
              </TableCell>
              <TableCell className="text-right">
                {
                   formatCurrency(coin.market_cap, "USD", 2, 0)
                 }
              </TableCell>
              <TableCell className="text-right">{convertDate(coin.last_updated)}</TableCell>
            </TableRow>
          );
        })}
        {loading &&
          Array.from({ length: 8 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell colSpan={7} className="text-center">
                <Skeleton className="w-full h-12" />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
     
    </div >
   
  );
}

export default Dashboard;
