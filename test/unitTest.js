const assert = require('chai').assert;
const shopController = require('../controllers/shop');
const dbHelper = require('../data/DbHelper');

before(function() {
    dbHelper.initDb();
});

describe('Unit Test', function(){
    describe("CRUD Test", function(){

        describe('Sube CRUD Testleri', function () {
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
    
            describe('Sube Guncelleme Testleri', function () {
                it('Sube Adi Guncelleme', async function () {
                    const branchName = 'Sube Adi Guncelleme Testi';
                    const branches = await dbHelper.getAllBranches();
                    const branch = branches.rows[0];
                    branch.branch_name = branchName;
                    await dbHelper.updateBranch(branch);
                    const dbBranch = await dbHelper.findBranchById(branch.branch_id);
                    assert.equal(dbBranch.rows[0].branch_name, branchName);
                });
                
                it('Sube Adres Guncelleme', async function () {
                    const newAddress = 'Yeni Sube Adresi';
                    const branches = await dbHelper.getAllBranches();
                    const branch = branches.rows[0];
                    branch.branch_address = newAddress;
                    await dbHelper.updateBranch(branch);
                    const dbBranch = await dbHelper.findBranchById(branch.branch_id);
                    assert.equal(dbBranch.rows[0].branch_address, newAddress);
                });
            });
        });

        
        describe('Siparis CRUD Testleri', function () {
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

            describe('Siparis Guncelleme Testleri', function () {
                it('Siparis Miktar Guncelleme', async function () {
                    const newAmount = 5;
                    const orders = await dbHelper.getAllOrders();
                    const order = orders.rows[0];
                    order.amount = newAmount;
                    await dbHelper.updateOrder(order);
                    const dbOrder = await dbHelper.findOrderById(order.order_id);
                    assert.equal(dbOrder.rows[0].amount, newAmount);
                });
                
                it('Siparis Tahmini Sevkiyat Tarihi Guncelleme', async function () {
                    const newShipmentDate = new Date('2023-12-30T21:00:00.000Z');
                    const orders = await dbHelper.getAllOrders();
                    const order = orders.rows[0];
                    order.estimated_shipment_date = newShipmentDate;
                    await dbHelper.updateOrder(order);
                    const dbOrder = await dbHelper.findOrderById(order.order_id);
                    assert.strictEqual(dbOrder.rows[0].estimated_shipment_date.toISOString(), newShipmentDate.toISOString());
                });
                
                it('Siparis Urun Fiyati Guncelleme', async function () {
                    const newProductPrice = 50.99;
                    const orders = await dbHelper.getAllOrders();
                    const order = orders.rows[0];
                    order.order_product_price = newProductPrice;
                    await dbHelper.updateOrder(order);
                    const dbOrder = await dbHelper.findOrderById(order.order_id);
                    assert.equal(dbOrder.rows[0].order_product_price, newProductPrice);
                });
                
                it('Siparis Sube ID Guncelleme', async function () {
                    const newBranchId = 2;
                    const orders = await dbHelper.getAllOrders();
                    const order = orders.rows[0];
                    order.branch_id = newBranchId;
                    await dbHelper.updateOrder(order);
                    const dbOrder = await dbHelper.findOrderById(order.order_id);
                    assert.equal(dbOrder.rows[0].branch_id, newBranchId);
                });
                
                it('Siparis Tarih Guncelleme', async function () {
                    const newOrderDate = new Date('2023-12-30T21:00:00.000Z');
                    const orders = await dbHelper.getAllOrders();
                    const order = orders.rows[0];
                    order.order_date = newOrderDate;
                    await dbHelper.updateOrder(order);
                    const dbOrder = await dbHelper.findOrderById(order.order_id);
                    assert.equal(dbOrder.rows[0].order_date.toISOString(), newOrderDate.toISOString());
                });
                
                it('Siparis Son Kullanma Tarihi Guncelleme', async function () {
                    const newSkt = new Date('2023-12-30T21:00:00.000Z');
                    const orders = await dbHelper.getAllOrders();
                    const order = orders.rows[0];
                    order.skt = newSkt;
                    await dbHelper.updateOrder(order);
                    const dbOrder = await dbHelper.findOrderById(order.order_id);
                    assert.equal(dbOrder.rows[0].skt.toISOString(), newSkt.toISOString());
                });     
            });
        });


        describe('Calisan CRUD Testleri', function () {

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

            describe('Calisan Guncelleme Testleri', function () {
                it('Calisan Isim Guncelleme', async function() {
                    const employeeName = "Isim Guncelleme Testi";
                    const employees = await dbHelper.getEmployees();
                    const employee = employees.rows[0];
                    employee.employee_name = employeeName;
                    await dbHelper.updateEmployee(employee);
                    const dbEmployee = await dbHelper.findEmployeeById(employee.employee_id);
                    assert.equal(dbEmployee.rows[0].employee_name, employeeName);
                });

                it('Calisan Maas Guncelleme', async function () {
                    const newSalary = 15000;
                    const employees = await dbHelper.getEmployees();
                    const employee = employees.rows[0];
                    employee.employee_salary = newSalary;
                    await dbHelper.updateEmployee(employee);
                    const dbEmployee = await dbHelper.findEmployeeById(employee.employee_id);
                    assert.equal(dbEmployee.rows[0].employee_salary, newSalary);
                });

                it('Calisan Sube ID Guncelleme', async function () {
                    const newBranchId = 2;
                    const employees = await dbHelper.getEmployees();
                    const employee = employees.rows[0];
                    employee.branch_id = newBranchId;
                    await dbHelper.updateEmployee(employee);
                    const dbEmployee = await dbHelper.findEmployeeById(employee.employee_id);
                    assert.equal(dbEmployee.rows[0].branch_id, newBranchId);
                });

                it('Calisan Email Guncelleme', async function () {
                    const newEmail = 'test@example.com';
                    const employees = await dbHelper.getEmployees();
                    const employee = employees.rows[0];
                    employee.email = newEmail;
                    await dbHelper.updateEmployee(employee);
                    const dbEmployee = await dbHelper.findEmployeeById(employee.employee_id);
                    assert.equal(dbEmployee.rows[0].email, newEmail);
                });

                it('Calisan Sifre Guncelleme', async function () {
                    const newPassword = 'newpassword123';
                    const employees = await dbHelper.getEmployees();
                    const employee = employees.rows[0];
                    employee.user_password = newPassword;
                    await dbHelper.updateEmployee(employee);
                    const dbEmployee = await dbHelper.findEmployeeById(employee.employee_id);
                    assert.equal(dbEmployee.rows[0].user_password, newPassword);
                });
            });
        });

        
        describe('Urun CRUD Testleri', function () {
            it('Urunleri Cekme', async function(){
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
    
            describe('Urun Guncelleme Testleri', function () {
                it('Ürün Stok Bilgisini Güncelleme', async function () {
                    const newStock = 150;
                    const products = await dbHelper.getAllProducts();
                    const product = products.rows[0];
                    product.product_stock = newStock;
                
                    await dbHelper.updateProduct(product);
                    const dbProduct = await dbHelper.findProductById(product.products_id);
                
                    assert.equal(dbProduct.rows[0].product_stock, newStock);
                });
                
                it('Ürün SKT Bilgisini Güncelleme', async function () {
                    const newSkt = new Date('2023-12-30T21:00:00.000Z');
                    const products = await dbHelper.getAllProducts();
                    const product = products.rows[0];
                    product.product_skt = newSkt;
                
                    await dbHelper.updateProduct(product);
                    const dbProduct = await dbHelper.findProductById(product.products_id);
                
                    assert.equal(dbProduct.rows[0].product_skt.toISOString(), newSkt.toISOString());
                });
            
                it('Ürün İndirim Oranını Güncelleme', async function () {
                    const newDiscountRate = 10;
                    const products = await dbHelper.getAllProducts();
                    const product = products.rows[0];
                    product.discount_rate = newDiscountRate;
                
                    await dbHelper.updateProduct(product);
                    const dbProduct = await dbHelper.findProductById(product.products_id);
                
                    assert.equal(dbProduct.rows[0].discount_rate, newDiscountRate);
                });
            
                it('Ürün Sube Güncelleme', async function () {
                    const newBranchId = 2;
                    const products = await dbHelper.getAllProducts();
                    const product = products.rows[0];
                    product.products_branch_id = newBranchId;
                
                    await dbHelper.updateProduct(product);
                    const dbProduct = await dbHelper.findProductById(product.products_id);
                
                    assert.equal(dbProduct.rows[0].products_branch_id, newBranchId);
                });
            
                it('Ürün Bilgilerini Güncelleme', async function () {
                    const newInfosId = 3;
                    const products = await dbHelper.getAllProducts();
                    const product = products.rows[0];
                    product.products_infos_id = newInfosId;
                
                    await dbHelper.updateProduct(product);
                    const dbProduct = await dbHelper.findProductById(product.products_id);
                
                    assert.equal(dbProduct.rows[0].products_infos_id, newInfosId);
                });
            });
        });

                
        describe('Satis CRUD Testleri', function () {
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
    
            describe('Satis Guncelleme Testleri', function () {
                it('Satis Miktarını Güncelleme', async function () {
                    const newAmount = 20;
                    const sales = await dbHelper.getAllSales();
                    const sale = sales.rows[0];
                    sale.amount = newAmount;

                    await dbHelper.updateSale(sale);
                    const dbSale = await dbHelper.findSaleById(sale.sale_id);

                    assert.equal(dbSale.rows[0].amount, newAmount);
                });

                it('Satış Fiyatını Güncelleme', async function () {
                    const newSoldPrice = 59.99;
                    const sales = await dbHelper.getAllSales();
                    const sale = sales.rows[0];
                    sale.sold_price = newSoldPrice;

                    await dbHelper.updateSale(sale);
                    const dbSale = await dbHelper.findSaleById(sale.sale_id);

                    assert.equal(dbSale.rows[0].sold_price, newSoldPrice);
                });

                it('Satış Tarihini Güncelleme', async function () {
                    const newSoldDate = new Date('2023-12-30T21:00:00.000Z');
                    const sales = await dbHelper.getAllSales();
                    const sale = sales.rows[0];
                    sale.sold_date = newSoldDate;

                    await dbHelper.updateSale(sale);
                    const dbSale = await dbHelper.findSaleById(sale.sale_id);

                    assert.equal(dbSale.rows[0].sold_date.toISOString(), newSoldDate.toISOString());
                });

                it("Satış Urun ID'sini Güncelleme", async function () {
                    const newSalesProductId = 2;
                    const sales = await dbHelper.getAllSales();
                    const sale = sales.rows[0];
                    sale.sales_product_id = newSalesProductId;

                    await dbHelper.updateSale(sale);
                    const dbSale = await dbHelper.findSaleById(sale.sale_id);

                    assert.equal(dbSale.rows[0].sales_product_id, newSalesProductId);
                });

            });
        });
    });
});

