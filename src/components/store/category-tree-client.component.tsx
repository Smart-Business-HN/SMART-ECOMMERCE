// @ts-nocheck
'use client';
import React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";
import { ChevronRightIcon, ChevronDownIcon, TagIcon } from "@heroicons/react/24/outline";
import { NavCategoryDto } from "@/interfaces/nav-category/nav-category.interface";

const CategoryTreeClient = ({ categories }: { categories: NavCategoryDto[] }) => {
    const [openAccordion, setOpenAccordion] = useState<number | null>(null);

    const handleOpen = (value: number) => {
        setOpenAccordion(openAccordion === value ? null : value);
    };

    return (
        <Card className="" >
            <List>
                {categories.map((category, index) => (
                    category.subCategories && category.subCategories.length > 0 ? (
                        <Accordion
                            key={category.id}
                            open={openAccordion === index}
                            icon={
                                <ChevronDownIcon
                                    strokeWidth={2.5}
                                    className={`mx-auto h-4 w-4 transition-transform ${openAccordion === index ? "rotate-180" : ""}`}
                                />
                            }
                        >
                            <ListItem className="p-0" selected={openAccordion === index}>
                                <AccordionHeader onClick={() => handleOpen(index)} className="border-b-0 p-3">
                                    {/* <ListItemPrefix>
                                        <TagIcon className="h-5 w-5" />
                                    </ListItemPrefix> */}
                                        <Link href={`/tienda/${category.slug}`} className="hover:text-blue-500">
                                            <Typography color="blue-gray" className="mr-auto font-normal">
                                                    {category.category}
                                            </Typography>
                                        </Link>
                                </AccordionHeader>
                            </ListItem>
                            <AccordionBody className="py-1">
                                <List className="p-0">
                                    {category.subCategories.map((subcategory) => (
                                            <Link href={`/tienda/${category.slug}/${subcategory.slug}`} className="hover:text-blue-500" key={subcategory.id}>
                                                <ListItem>
                                                    {/* <ListItemPrefix>
                                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                                    </ListItemPrefix> */}
                                                        {subcategory.name}
                                                </ListItem>
                                            </Link>
                                    ))}
                                </List>
                            </AccordionBody>
                        </Accordion>
                    ) : (
                        <ListItem key={category.id}>
                            {/* <ListItemPrefix>
                                <TagIcon className="h-5 w-5" />
                            </ListItemPrefix> */}
                            <Link href={`/tienda/${category.slug}`} className="hover:text-blue-500">
                                {category.category}
                            </Link>
                        </ListItem>
                    )
                ))}
            </List>
        </Card>
    );
};

export default CategoryTreeClient;