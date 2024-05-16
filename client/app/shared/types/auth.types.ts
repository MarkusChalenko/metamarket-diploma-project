import { NextPage } from "next";

export type TypeComponentAuthFields = { Component: TypeRoles };

export type TypeRoles = {
  isAdmin?: boolean;
  isUser?: boolean;
};

export type TypeNextAuthPage<P = {}> = NextPage<P> & TypeRoles;
