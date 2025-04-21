package com.project.demo.controller;

import com.project.demo.entity.ServiceCenter;
import com.project.demo.service.ServiceCenterService;
import com.project.demo.controller.base.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.persistence.Query;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.*;


/**
 * 服务中心：(ServiceCenter)表控制层
 *
 */
@RestController
@RequestMapping("/service_center")
public class ServiceCenterController extends BaseController<ServiceCenter, ServiceCenterService> {

    /**
     * 服务中心对象
     */
    @Autowired
    public ServiceCenterController(ServiceCenterService service) {
        setService(service);
    }



    @PostMapping("/add")
    @Transactional
    public Map<String, Object> add(HttpServletRequest request) throws IOException {
        Map<String,Object> paramMap = service.readBody(request.getReader());
        this.addMap(paramMap);
        return success(1);
    }


}
