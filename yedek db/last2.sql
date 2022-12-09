select br.branch_id, br.branch_address, br.branch_manager_pid,emp.employee_name ,br.branch_name, count(*) number_of_employees from branches as br ,employees as emp where  br.branch_manager_pid = emp.employee_id group by br.branch_id, br.branch_manager_pid,br.branch_address,br.branch_name,emp.employee_name

SELECT * from products, product_infos

alter table product_infos rename column product_infos_id to info_id
alter table products rename column product_id to info_id

alter table product_infos add PRIMARY KEY (info_id)


SELECT * from products join product_infos on info_id = products_infos_id

create view products_with_infos AS
SELECT * from products join product_infos on info_id = products_infos_id

select * from products_with_infos