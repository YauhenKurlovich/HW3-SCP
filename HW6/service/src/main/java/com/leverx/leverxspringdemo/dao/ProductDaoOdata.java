package com.leverx.leverxspringdemo.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.sql.DataSource;

import com.leverx.leverxspringdemo.domain.Products;
import com.sap.cloud.sdk.odatav2.connectivity.ODataException;
import com.sap.cloud.sdk.odatav2.connectivity.ODataQueryBuilder;
import com.sap.cloud.sdk.odatav2.connectivity.ODataQueryResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.leverx.leverxspringdemo.dao.intfce.IPersonDao;
import com.leverx.leverxspringdemo.domain.Person;

@Repository
public class ProductDaoOdata {

    public List<Products> getProductsOdata(String destinationName) throws ODataException {
            ODataQueryResult  result = ODataQueryBuilder.withEntity("/V2/OData/OData.svc/","Products").
                    select("Name").build().execute(destinationName);
            List<Map<String,Object>> listMap =  result.asListOfMaps();
            return  getProductList(listMap);
    }


    public List<Products>  getProductList ( List<Map<String,Object>> listMap) {
        List <Products> productsList = new ArrayList<>();
        listMap.forEach(item->{
            Products prod = new Products();
            prod.setTitle(item.get("Name").toString());
            productsList.add(prod);
        });
        return productsList;
    }
}
