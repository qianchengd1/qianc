package com.project.demo.controller;

import com.project.demo.entity.RegistrationInformation;
import com.project.demo.service.RegistrationInformationService;
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
 * 报名信息：(RegistrationInformation)表控制层
 *
 */
@RestController
@RequestMapping("/registration_information")
public class RegistrationInformationController extends BaseController<RegistrationInformation, RegistrationInformationService> {

    /**
     * 报名信息对象
     */
    @Autowired
    public RegistrationInformationController(RegistrationInformationService service) {
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
