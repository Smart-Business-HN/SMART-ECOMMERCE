'use client'
import React from "react";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";

export default function ProductBreadcrumbs(products: any) {
    return (
        <Breadcrumbs variant='solid'>
            <BreadcrumbItem href="/">Home</BreadcrumbItem>
            <BreadcrumbItem href="/shop">Tienda</BreadcrumbItem>
            {/* <BreadcrumbItem href={`/shop/category/${product.subCategory.category.slug}`}>{product.subCategory.category.name}</BreadcrumbItem> */}
        </Breadcrumbs>
    )
}