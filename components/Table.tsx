import { CheckIcon } from '@heroicons/react/solid';
import { Product } from '@stripe/firestore-stripe-payments';
import React, { useState } from 'react'

interface ITableProps {
    products: Product[];
    selectedPlan: Product | null;
}

const Table = ({ products, selectedPlan }: ITableProps) => {
    return (
        <table>
            <tbody className="divide-y divide-[[gray]/75]">
                <tr className="table-row-style">
                    <td className="table-data-title">
                        Monthly Price
                    </td>
                    <div>
                        {products.map((product) => {
                            return (
                                <td
                                    key={product.id}
                                    className={`table-data ${selectedPlan?.id === product.id ? 'text-[#e50914]' : 'text-[gray]/75'}`}
                                >INR {product.prices[0].unit_amount! / 100}</td>
                            )
                        })}
                    </div>
                </tr>
                <tr className="table-row-style">
                    <td className="table-data-title">
                        Video Quality
                    </td>
                    <div>
                        {products.map((product) => {
                            return (
                                <td
                                    key={product.id}
                                    className={`table-data ${selectedPlan?.id === product.id ? 'text-[#e50914]' : 'text-[gray]/75'}`}
                                >{product.metadata.videoQuality}</td>
                            )
                        })}
                    </div>
                </tr>
                <tr className="table-row-style">
                    <td className="table-data-title">
                        Resolution
                    </td>
                    <div>
                        {products.map((product) => {
                            return (
                                <td
                                    key={product.id}
                                    className={`table-data ${selectedPlan?.id === product.id ? 'text-[#e50914]' : 'text-[gray]/75'}`}
                                >{product.metadata.resolution}</td>
                            )
                        })}
                    </div>
                </tr>
                <tr className="table-row-style">
                    <td className="table-data-title">
                        Watch on your TV, computer, mobile phone and tablet
                    </td>
                    <div>
                        {products.map((product) => {
                            return (
                                <td
                                    key={product.id}
                                    className={`table-data ${selectedPlan?.id === product.id ? 'text-[#e50914]' : 'text-[gray]/75'}`}
                                ><CheckIcon className='w-7 h-7 inline-block'/></td>
                            )
                        })}
                    </div>
                </tr>
            </tbody>
        </table>
    )
}

export default Table;