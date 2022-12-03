PGDMP                     
    z            stock-management    15.0    15.0     #           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            $           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            %           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            &           1262    16522    stock-management    DATABASE     �   CREATE DATABASE "stock-management" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Turkish_Turkey.1254';
 "   DROP DATABASE "stock-management";
                postgres    false            �            1259    16589    branches    TABLE     �   CREATE TABLE public.branches (
    branch_id integer NOT NULL,
    branch_name character varying(255) NOT NULL,
    branch_address character varying(255) NOT NULL,
    branch_manager_pid integer
);
    DROP TABLE public.branches;
       public         heap    postgres    false            �            1259    16583 	   employees    TABLE     J  CREATE TABLE public.employees (
    employee_id integer NOT NULL,
    employee_name character varying(255) NOT NULL,
    employee_salary numeric(10,2) NOT NULL,
    branch_id integer NOT NULL,
    awl boolean DEFAULT false NOT NULL,
    awl_date date,
    email character varying(255),
    user_password character varying(255)
);
    DROP TABLE public.employees;
       public         heap    postgres    false            �            1259    16634    orders    TABLE     Z  CREATE TABLE public.orders (
    order_id integer NOT NULL,
    product_id integer NOT NULL,
    amount integer,
    order_product_price numeric(10,2) NOT NULL,
    branch_id integer,
    order_date date NOT NULL,
    estimated_shipment_date date,
    order_state character varying(60),
    CONSTRAINT orders_amount_check CHECK ((amount > 0))
);
    DROP TABLE public.orders;
       public         heap    postgres    false            �            1259    16650    product_infos    TABLE     �   CREATE TABLE public.product_infos (
    product_id integer NOT NULL,
    product_name character varying(255) NOT NULL,
    product_price numeric(10,2) NOT NULL,
    product_category_id integer NOT NULL
);
 !   DROP TABLE public.product_infos;
       public         heap    postgres    false            �            1259    16601    products    TABLE     �   CREATE TABLE public.products (
    products_id integer NOT NULL,
    products_branch_id integer,
    product_stock integer NOT NULL,
    product_skt date NOT NULL,
    product_infos_id integer
);
    DROP TABLE public.products;
       public         heap    postgres    false            �            1259    16617    sales    TABLE     �   CREATE TABLE public.sales (
    sale_id integer NOT NULL,
    amount integer NOT NULL,
    sold_price numeric(10,2) NOT NULL,
    sold_date date NOT NULL,
    sales_product_id integer,
    CONSTRAINT sales_amount_check CHECK ((amount > 0))
);
    DROP TABLE public.sales;
       public         heap    postgres    false                      0    16589    branches 
   TABLE DATA           ^   COPY public.branches (branch_id, branch_name, branch_address, branch_manager_pid) FROM stdin;
    public          postgres    false    215   p$                 0    16583 	   employees 
   TABLE DATA           �   COPY public.employees (employee_id, employee_name, employee_salary, branch_id, awl, awl_date, email, user_password) FROM stdin;
    public          postgres    false    214   �$                 0    16634    orders 
   TABLE DATA           �   COPY public.orders (order_id, product_id, amount, order_product_price, branch_id, order_date, estimated_shipment_date, order_state) FROM stdin;
    public          postgres    false    218   R%                  0    16650    product_infos 
   TABLE DATA           e   COPY public.product_infos (product_id, product_name, product_price, product_category_id) FROM stdin;
    public          postgres    false    219   �%                 0    16601    products 
   TABLE DATA           q   COPY public.products (products_id, products_branch_id, product_stock, product_skt, product_infos_id) FROM stdin;
    public          postgres    false    216   &                 0    16617    sales 
   TABLE DATA           Y   COPY public.sales (sale_id, amount, sold_price, sold_date, sales_product_id) FROM stdin;
    public          postgres    false    217   +&       ~           2606    16595    branches branches_branch_id_key 
   CONSTRAINT     _   ALTER TABLE ONLY public.branches
    ADD CONSTRAINT branches_branch_id_key UNIQUE (branch_id);
 I   ALTER TABLE ONLY public.branches DROP CONSTRAINT branches_branch_id_key;
       public            postgres    false    215            |           2606    16588 #   employees employees_employee_id_key 
   CONSTRAINT     e   ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_employee_id_key UNIQUE (employee_id);
 M   ALTER TABLE ONLY public.employees DROP CONSTRAINT employees_employee_id_key;
       public            postgres    false    214            �           2606    16639    orders orders_order_id_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_order_id_key UNIQUE (order_id);
 D   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_order_id_key;
       public            postgres    false    218            �           2606    16654 *   product_infos product_infos_product_id_key 
   CONSTRAINT     k   ALTER TABLE ONLY public.product_infos
    ADD CONSTRAINT product_infos_product_id_key UNIQUE (product_id);
 T   ALTER TABLE ONLY public.product_infos DROP CONSTRAINT product_infos_product_id_key;
       public            postgres    false    219            �           2606    16605    products products_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (products_id);
 @   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
       public            postgres    false    216            �           2606    16622    sales sales_sale_id_key 
   CONSTRAINT     U   ALTER TABLE ONLY public.sales
    ADD CONSTRAINT sales_sale_id_key UNIQUE (sale_id);
 A   ALTER TABLE ONLY public.sales DROP CONSTRAINT sales_sale_id_key;
       public            postgres    false    217            �           2606    16596 )   branches branches_branch_manager_pid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.branches
    ADD CONSTRAINT branches_branch_manager_pid_fkey FOREIGN KEY (branch_manager_pid) REFERENCES public.employees(employee_id);
 S   ALTER TABLE ONLY public.branches DROP CONSTRAINT branches_branch_manager_pid_fkey;
       public          postgres    false    215    3196    214            �           2606    16655    products fk_product_infos    FK CONSTRAINT     �   ALTER TABLE ONLY public.products
    ADD CONSTRAINT fk_product_infos FOREIGN KEY (product_infos_id) REFERENCES public.product_infos(product_id);
 C   ALTER TABLE ONLY public.products DROP CONSTRAINT fk_product_infos;
       public          postgres    false    219    216    3206            �           2606    16645    orders orders_branch_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(branch_id);
 F   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_branch_id_fkey;
       public          postgres    false    215    218    3198            �           2606    16662    orders orders_product_infos_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_product_infos_fk FOREIGN KEY (product_id) REFERENCES public.product_infos(product_id);
 H   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_product_infos_fk;
       public          postgres    false    218    219    3206            �           2606    16606 )   products products_products_branch_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_products_branch_id_fkey FOREIGN KEY (products_branch_id) REFERENCES public.branches(branch_id);
 S   ALTER TABLE ONLY public.products DROP CONSTRAINT products_products_branch_id_fkey;
       public          postgres    false    215    3198    216            �           2606    16623 !   sales sales_sales_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.sales
    ADD CONSTRAINT sales_sales_product_id_fkey FOREIGN KEY (sales_product_id) REFERENCES public.products(products_id);
 K   ALTER TABLE ONLY public.sales DROP CONSTRAINT sales_sales_product_id_fkey;
       public          postgres    false    216    217    3200               d   x�3�I�N-J�V8:�4)��#�2%�H�)�R�71CO��H�8?;1�Ӑˈ�%�����Լ�b���ֈ˘�7���ĢĜ#�������c���� @:09         ^   x�3�t��M-�44�00�37�4�,�4202�50"�? �2�tJ,N�Q�NͩʬL�46 =��4d�I U鹉�9z���@S�ML�b���� ��         U   x�3�4�44�00�35�4�4202�54�5��3�8CR�s2s\S2srSS2��8�9M8��LL���
A
-��Hz�:b���� �SS          G   x�3�<<'';�H�p{fv~NbI"��������	��ofNv"�����	�o��T�ih�gd�i����� ��e            x������ � �            x������ � �     