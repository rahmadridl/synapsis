--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1
-- Dumped by pg_dump version 15.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: cart; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cart (id, user_id, product_id, price, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.category (id, name, created_at, updated_at) FROM stdin;
1	Elektronic	2023-05-12 08:25:07	2023-05-12 08:25:07
2	Fashion	2023-05-12 08:25:07	2023-05-12 08:25:07
\.


--
-- Data for Name: payment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payment (id, user_id, total_price, status_payment, created_at, updated_at) FROM stdin;
1	1	500000	t	2023-05-12 09:15:09.000 +00:00	2023-05-12 09:32:00
\.


--
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product (id, name, category_id, created_at, updated_at, price) FROM stdin;
1	Handphone	1	2023-05-12 08:25:07	2023-05-12 08:25:07	200000
2	Laptop	1	2023-05-12 08:25:07	2023-05-12 08:25:07	300000
3	Shirt	2	2023-05-12 08:25:07	2023-05-12 08:25:07	10000
4	Short	2	2023-05-12 08:25:07	2023-05-12 08:25:07	15000
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, username, password, token, created_at, updated_at) FROM stdin;
1	synapsis	$2a$10$BABsd6DDnNaRodOQXAofFOOo1LU3g.22I0qmz807pbwIaRTWww5eG	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE2ODM4Nzk5MTMsImV4cCI6MTY4Mzk2NjMxM30.jAciteDVf6K6bXMkOYXVlrP9AMil52I658fhjmmKCDg	2023-05-12 08:25:07	2023-05-12 08:25:07
\.


--
-- Name: cart_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cart_id_seq', 5, true);


--
-- Name: category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.category_id_seq', 2, true);


--
-- Name: payment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payment_id_seq', 1, true);


--
-- Name: product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.product_id_seq', 4, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 1, true);


--
-- PostgreSQL database dump complete
--

