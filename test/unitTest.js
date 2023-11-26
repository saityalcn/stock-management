const assert = require('chai').assert;
const shopController = require('../controllers/shop');
const dbHelper = require('../data/DbHelper');

before(function() {
    dbHelper.initDb();
});

describe('Unit Test', function(){
    describe("CRUD Test", function(){
        
        it('Subeleri Cekme', async function(){
            let branchesRes = await dbHelper.getAllBranches();
            branchesRes = branchesRes.rows;
            assert.isAbove(branchesRes.length, 0, 'Subelerin sayisi en az 1 olmalidir');
        });
        
        it('Sube Ekleme', async function() {
            const branchesRes = await dbHelper.getAllBranches();
            const prevBranchesResSize = branchesRes.rows.length;
            const branch = {
                branch_name: 'Test',
                branch_address: 'Test',
                branch_manager_pid: 1
            }
            var addBranchRes = await dbHelper.addBranch(branch);
            const getBranhesRes = await dbHelper.getAllBranches();
            assert.equal(getBranhesRes.rows.length, prevBranchesResSize+1);
        });


        // TODO: Yapilacak                
        it('Sube Silme', async function() {
            const employee = {
                employee_name: 'Test',
                employee_salary: 120941,
                branch_id: 1,
                email: 'test@test.com',
                user_password: '1234'
            }
            var dbEmployee = await dbHelper.addEmployee(employee);
            dbEmployee = await dbHelper.findEmployeeByEmail(employee.email);
            dbEmployee = dbEmployee.rows[0];

            await dbHelper.deleteEmployeeById(dbEmployee.employee_id);
            dbEmployee = await dbHelper.findEmployeeByEmail(employee.email);

            assert.equal(dbEmployee.rows.length, 0);
        });


        it('Siparisleri Cekme', async function() {
            let getOrderRes = await dbHelper.getOrders();
            getOrderRes = getOrderRes.rows;
            assert.isAbove(getOrderRes.length, 0, 'Siparislerin sayisi en az 1 olmalidir');
        });

        it('Siparis Ekleme', async function() {
            const orderRes = await dbHelper.getOrders();
            const prevOrdersSize = orderRes.rows.length;
            const order = {
                product_id: 1,
                amount: 20,
                product_price: 800.54,
                branch_id: 2,
                order_date: '2023-11-26',
                estimated_shipment_date: '2023-12-26',
                order_state: 'Bekleniyor',
                skt: '2024-11-26'
            }
            const addOrderRes = await dbHelper.addOrder(order);
            const getOrderRes = await dbHelper.getOrders();
            assert.equal(getOrderRes.rows.length, prevOrdersSize+1);
        });

        
        it('Siparis Silme', async function() {
            const orderRes = await dbHelper.getOrders();
            const prevOrdersSize = orderRes.rows.length;
            const order = {
                product_id: 1,
                amount: 20,
                product_price: 800.54,
                branch_id: 2,
                order_date: '2023-11-26',
                estimated_shipment_date: '2023-12-26',
                order_state: 'Bekleniyor',
                skt: '2024-11-26'
            }
            const deleteOrderRes = await dbHelper.deleteOrder(order);
            const getOrderRes = await dbHelper.getOrders();
            assert.notEqual(getOrderRes.rows.length, prevOrdersSize);
        });

        it('Calisan cekme', async function(){
            let res = await dbHelper.getEmployees();
            res = res.rows;
            assert.isAbove(res.length, 0, 'Calisanlarin sayisi en az 1 olmalidir.');
        });

        it('Calisan Ekleme', async function() {
            const employeeRes = await dbHelper.getEmployees();
            const prevEmployeeResSize = employeeRes.rows.length;
            const employee = {
                employee_name: 'Test',
                employee_salary: 120941,
                branch_id: 1,
                email: 'addEmployeeTest@test.com',
                user_password: '1234'
            }
            var addEmployeeRes = await dbHelper.addEmployee(employee);
            const getEmployeeRes = await dbHelper.getEmployees();
            assert.equal(getEmployeeRes.rows.length, prevEmployeeResSize+1);
        });

        it('Calisan Silme', async function() {
            const employee = {
                employee_name: 'Test',
                employee_salary: 120941,
                branch_id: 1,
                email: 'test@test.com',
                user_password: '1234'
            }
            var dbEmployee = await dbHelper.addEmployee(employee);
            dbEmployee = await dbHelper.findEmployeeByEmail(employee.email);
            dbEmployee = dbEmployee.rows[0];

            await dbHelper.deleteEmployeeById(dbEmployee.employee_id);
            dbEmployee = await dbHelper.findEmployeeByEmail(employee.email);

            assert.equal(dbEmployee.rows.length, 0);
        });


        it('Urun cekme', async function(){
            let res = await dbHelper.getProducts();
            res = res.rows;
            assert.isAbove(res.length, 0, 'Urunlerin sayisi en az 1 olmalidir.');
        });

        
        it('Urun Ekleme', async function() {
            const productsRes = await dbHelper.getProducts();
            const prevProductsResSize = productsRes.rows.length;
            const product = {}
            var addProductRes = await dbHelper.addProduct(product);
            const getProductRes = await dbHelper.getProducts();
            assert.equal(getProductRes.rows.length, prevProductsResSize+1);
        });

        it('Urun Silme', async function() {
            var dbEmployee = await dbHelper.getProducts();
            dbEmployee = dbEmployee.rows;
            await dbHelper.deleteProduct(dbEmployee[dbEmployee.length-1].products_id);
            var afterDeletedbEmployee = await dbHelper.getProducts();

            assert.isAbove(dbEmployee.length, afterDeletedbEmployee.rows.length);
        });


        it('Satislari Cekme', async function(){
            const sales = await dbHelper.getAllSales();
            assert.isAbove(sales.rows.length, 0, 'Satislarin sayisi en az 1 olmalidir.');
        });

        it('Satis Ekleme', async function() {
            const sale = {
                amount: 100,
                sold_price: 1234.87,
                sold_date: '2024-01-06',
                sales_product_id: 1
            }
            const salesRes = await dbHelper.getAllSales();
            const prevSalesSize = salesRes.rows.length;
            var addSaleRes = await dbHelper.saveSale(sale);
            const getSalesRes = await dbHelper.getAllSales();
            assert.equal(getSalesRes.rows.length, prevSalesSize+1);
        });

        it('Satis Silme', async function() {
            let sales = await dbHelper.getAllSales();
            sales = sales.rows
            const prevSalesSize = sales.length;
            await dbHelper.deleteSale(sales[sales.length-1].sale_id);
            const getSalesRes = await dbHelper.getAllSales();

            assert.notEqual(getSalesRes.rows.length, prevSalesSize);
        });

    });
});

