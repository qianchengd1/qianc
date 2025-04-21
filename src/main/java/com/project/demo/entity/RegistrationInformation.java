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
 * 报名信息：(RegistrationInformation)表实体类
 *
 */
@TableName("`registration_information`")
@Data
@EqualsAndHashCode(callSuper = false)
public class RegistrationInformation implements Serializable {

    // RegistrationInformation编号
    @TableId(value = "registration_information_id", type = IdType.AUTO)
    private Integer registration_information_id;

    // 活动编号
    @TableField(value = "`activity_number`")
    private String activity_number;
    // 活动名称
    @TableField(value = "`activity_name`")
    private String activity_name;
    // 活动类型
    @TableField(value = "`activity_type`")
    private String activity_type;
    // 发布人员
    @TableField(value = "`publishing_personnel`")
    private Integer publishing_personnel;
    // 活动时间
    @TableField(value = "`activity_time`")
    private String activity_time;
    // 活动地点
    @TableField(value = "`event_location`")
    private String event_location;
    // 报名用户
    @TableField(value = "`registered_users`")
    private Integer registered_users;
    // 报名时间
    @TableField(value = "`registration_time`")
    private Timestamp registration_time;
    // 报名备注
    @TableField(value = "`registration_remarks`")
    private String registration_remarks;










    // 更新时间
    @TableField(value = "update_time")
    private Timestamp update_time;

    // 创建时间
    @TableField(value = "create_time")
    private Timestamp create_time;







}
