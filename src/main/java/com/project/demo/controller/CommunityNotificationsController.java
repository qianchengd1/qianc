package com.project.demo.controller;

import com.project.demo.entity.CommunityNotifications;
import com.project.demo.service.CommunityNotificationsService;
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
 * 社区通知：(CommunityNotifications)表控制层
 *
 */
@RestController
@RequestMapping("/community_notifications")
public class CommunityNotificationsController extends BaseController<CommunityNotifications, CommunityNotificationsService> {

    /**
     * 社区通知对象
     */
    @Autowired
    public CommunityNotificationsController(CommunityNotificationsService service) {
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
