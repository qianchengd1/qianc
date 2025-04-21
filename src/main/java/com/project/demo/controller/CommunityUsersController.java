package com.project.demo.controller;

import com.project.demo.entity.CommunityUsers;
import com.project.demo.service.CommunityUsersService;
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
 * 社区用户：(CommunityUsers)表控制层
 *
 */
@RestController
@RequestMapping("/community_users")
public class CommunityUsersController extends BaseController<CommunityUsers, CommunityUsersService> {

    /**
     * 社区用户对象
     */
    @Autowired
    public CommunityUsersController(CommunityUsersService service) {
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
