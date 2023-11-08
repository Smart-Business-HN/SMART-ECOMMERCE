import { DataSheet } from "@/interfaces/data-sheet/data-sheet.interface";
import { ProductDataSheet } from "@/interfaces/product/product-data-sheet.interface";
import { ProductFeature } from "@/interfaces/product/product-feature.interface";
import { Product } from "@/interfaces/product/product.interface";
import { Tab } from "@headlessui/react";
import Link from "next/link";
import { Fragment } from "react";

export default function InformationProductTabs(props: any) {
    const dataSheet: ProductDataSheet[] = props.productDataSheets;
    const productFeatures: ProductFeature[] = props.productFeatures;
    return (
        <Tab.Group>
            <Tab.List className="flex justify-center gap-4">
                {dataSheet.length > 0 ? <Tab as={Fragment} >
                    {({ selected }) => (
                        <div className={!selected ? 'rounded-sm border-gray-400 bg-white  shadow-sm text-mx font-bold' : 'rounded-sm border-b  border-b-blue-500  text-mx font-bold'}>
                            <p className="text-xl">Ficha Tecnica</p>
                        </div>
                    )}
                </Tab> : null}
                {productFeatures.length > 0 ? <Tab as={Fragment} >
                    {({ selected }) => (
                        <div className={!selected ? 'rounded-sm border-gray-400 bg-white  shadow-sm text-mx font-bold' : 'rounded-sm border-b  border-b-blue-500  text-mx font-bold'}>
                            <p className="text-xl">Caracteristicas</p>
                        </div>
                    )}
                </Tab> : null}

            </Tab.List>
            <Tab.Panels className="flex mt-4 items-center mb-4 justify-center gap-4">
                {
                    dataSheet.length > 0 ?
                        <Tab.Panel className="w-full">
                            {
                                dataSheet.map((item: ProductDataSheet, key: number) => {
                                    return (
                                        <div className="text-md" key={key}>
                                            <h5 className="font-bold">
                                                {item.dataSheet?.name}:
                                            </h5>
                                            <p >
                                                {item.title}
                                            </p>
                                        </div>
                                    )
                                })
                            }
                        </Tab.Panel> : null
                }
                {
                    productFeatures.length > 0 ?
                        <Tab.Panel className="w-full">
                            {
                                productFeatures.map((item: ProductFeature, key: number) => {
                                    return (
                                        <div className="text-md mb-5" key={key}>
                                            <h5 className="font-bold">
                                                {item.title}:
                                            </h5>
                                            <p >
                                                {item.description}
                                            </p>
                                        </div>
                                    )
                                })
                            }
                        </Tab.Panel> : null
                }
            </Tab.Panels>
        </Tab.Group>
    )
}