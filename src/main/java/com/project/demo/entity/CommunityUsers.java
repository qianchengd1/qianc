package com.project.demo.entity;

import com.alibaba.fastjson.annotation.JSONField;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.*;

import java.io.Serializable;
import java.sql.Timestamp;


/**
 * 社区用户：(CommunityUsers)表实体类
 *
 */
@TableName("`community_users`")
@Data
@EqualsAndHashCode(callSuper = false)
public class CommunityUsers implements Serializable {

    // CommunityUsers编号
    @TableId(value = "community_users_id", type = IdType.AUTO)
    private Integer community_users_id;

    // 用户姓名
    @TableField(value = "`user_name`")
    private String user_name;
    // 用户年龄
    @TableField(value = "`user_age`")
    private String user_age;
    // 用户性别
    @TableField(value = "`user_gender`")
    private String user_gender;
    // 联系方式
    @TableField(value = "`contact_information`")
    private String contact_information;
    // 家庭住址
    @TableField(value = "`home_address`")
    private String home_address;







    // 用户编号
    @TableField(value = "user_id")
    private Integer userId;



    // 更新时间
    @TableField(value = "update_time")
    private Timestamp update_time;

    // 创建时间
    @TableField(value = "create_time")
    private Timestamp create_time;







}
