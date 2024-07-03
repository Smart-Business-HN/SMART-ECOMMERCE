'use client'
import React from "react";
import { BreadcrumbItem, Breadcrumbs, Link } from "@nextui-org/react";

export default function ProductBreadcrumbs(props: any) {
    console.log(props)
    return (
        <Breadcrumbs variant='solid'>
            <BreadcrumbItem href="/">Home</BreadcrumbItem>
            <BreadcrumbItem href="/shop">Tienda</BreadcrumbItem>
            <BreadcrumbItem href={`/shop/category/${props.product.subCategory.category.slug}`}>{props.product.subCategory.category.name}</BreadcrumbItem>
            <BreadcrumbItem href={`/shop/category/${props.product.subCategory.category.slug}/${props.product.subCategory.slug}`}>{props.product.subCategory.name}</BreadcrumbItem>
            <BreadcrumbItem>{props.product.name}</BreadcrumbItem>
        </Breadcrumbs>
    )
}