'use client'
import React from "react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";

export default function ShopBreadcrumbs() {
    return(
        <Breadcrumbs variant='solid'>
            <BreadcrumbItem href="/">Home</BreadcrumbItem>
            <BreadcrumbItem href="/shop">Tienda</BreadcrumbItem>
        </Breadcrumbs>
    );
}