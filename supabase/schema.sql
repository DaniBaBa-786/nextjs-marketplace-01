-- CraftBay tables

create table products (
  id bigint generated always as identity primary key,
  seller text not null,
  name text not null,
  price numeric not null
);

create table orders (
  id bigint generated always as identity primary key,
  buyer text not null,
  product_id bigint references products(id),
  total numeric not null,
  status text not null default 'pending'
);

create table users (
  id bigint generated always as identity primary key,
  email text unique not null,
  password text not null,
  role text not null default 'buyer'
);
