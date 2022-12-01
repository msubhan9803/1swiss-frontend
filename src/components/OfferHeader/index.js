import React from 'react'
import { nanoid } from "nanoid";

export default function OfferHeader() {
    return (
        <div className="hidden md:block grid grid-cols-12 lg:flex lg:flex-row lg:items-center bg-blue-50 rounded-md px-8 border border-blue-500 mt-8 shadow-lg" key={nanoid(8)}>
            <div className="col-span-12 sm:col-span-6 md:col-span-4 order-1 lg:order-none lg:col-span pr-16 text-blue-500 text-md font-medium">
                Marque
            </div>
            <div className="col-span-12 sm:col-span-6 md:col-span-4 order-2 md:px-4 lg:w-2/12 lg:order-none lg:col-span">
                <div className="group-327">
                    <p className="text-md font-medium text-blue-500">
                        Nom du fournisseur /
                    </p>
                    <p className="text-md font-medium text-blue-500">
                        Code d'offre
                    </p>
                </div>
            </div>
            <div className="col-span-12 block order-4 md:flex md:grow lg:w-3/6 lg:order-none py-4 justify-center">
                <p className="text-md font-medium text-blue-500">
                    Score généré par l'IA
                </p>
            </div>
            <div className="col-span-12 order-3 md:col-span-4 lg:order-4 lg:flex-none">
                <div className="flex items-center justify-start md:justify-center">
                    <p className="text-md font-medium text-blue-500">
                        Montante
                    </p>
                </div>
            </div>
        </div>
    )
}
