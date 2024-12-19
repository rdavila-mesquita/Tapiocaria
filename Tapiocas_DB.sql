--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

-- Started on 2024-12-18 21:16:12

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 218 (class 1259 OID 16516)
-- Name: filings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.filings (
    id integer NOT NULL,
    idfood integer NOT NULL,
    name character varying,
    price real
);


ALTER TABLE public.filings OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16509)
-- Name: foods; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.foods (
    id integer NOT NULL,
    name character varying,
    price real
);


ALTER TABLE public.foods OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16529)
-- Name: sales; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sales (
    id integer NOT NULL,
    idfood integer,
    cpf character varying,
    datesale timestamp without time zone DEFAULT now(),
    description character varying(100),
    price real
);


ALTER TABLE public.sales OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16528)
-- Name: sales_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sales_id_seq OWNER TO postgres;

--
-- TOC entry 4910 (class 0 OID 0)
-- Dependencies: 219
-- Name: sales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sales_id_seq OWNED BY public.sales.id;


--
-- TOC entry 4750 (class 2604 OID 16532)
-- Name: sales id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sales ALTER COLUMN id SET DEFAULT nextval('public.sales_id_seq'::regclass);


--
-- TOC entry 4755 (class 2606 OID 16522)
-- Name: filings filings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.filings
    ADD CONSTRAINT filings_pkey PRIMARY KEY (id, idfood);


--
-- TOC entry 4753 (class 2606 OID 16515)
-- Name: foods foods_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.foods
    ADD CONSTRAINT foods_pkey PRIMARY KEY (id);


--
-- TOC entry 4757 (class 2606 OID 16537)
-- Name: sales sales_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sales
    ADD CONSTRAINT sales_pkey PRIMARY KEY (id);


--
-- TOC entry 4758 (class 2606 OID 16523)
-- Name: filings filings_idfood_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.filings
    ADD CONSTRAINT filings_idfood_fkey FOREIGN KEY (idfood) REFERENCES public.foods(id);


--
-- TOC entry 4759 (class 2606 OID 16538)
-- Name: sales sales_idfood_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sales
    ADD CONSTRAINT sales_idfood_fkey FOREIGN KEY (idfood) REFERENCES public.foods(id);


-- Completed on 2024-12-18 21:16:12

--
-- PostgreSQL database dump complete
--

