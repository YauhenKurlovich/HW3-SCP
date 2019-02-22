package com.leverx.leverxspringdemo.controller;

import java.util.List;

import com.sap.cloud.sdk.odatav2.connectivity.ODataException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.leverx.leverxspringdemo.domain.Products;
import com.leverx.leverxspringdemo.dao.ProductDaoOdata;

@RestController
public class ProductController {

    public ProductDaoOdata odata = new ProductDaoOdata();

    @GetMapping(value="/products")
    public List<Products> getAllPerson() throws ODataException {
        return  odata.getProductsOdata("oDataDest");
    }

}
