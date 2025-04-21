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
 * 预约信息：(AppointmentInformation)表实体类
 *
 */
@TableName("`appointment_information`")
@Data
@EqualsAndHashCode(callSuper = false)
public class AppointmentInformation implements Serializable {

    // AppointmentInformation编号
    @TableId(value = "appointment_information_id", type = IdType.AUTO)
    private Integer appointment_information_id;

    // 预约编号
    @TableField(value = "`appointment_number`")
    private String appointment_number;
    // 项目名称
    @TableField(value = "`entry_name`")
    private String entry_name;
    // 项目类型
    @TableField(value = "`project_type`")
    private String project_type;
    // 社区用户
    @TableField(value = "`community_users`")
    private Integer community_users;
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
    // 预约时间
    @TableField(value = "`appointment_time`")
    private Timestamp appointment_time;
    // 预约备注
    @TableField(value = "`appointment_remarks`")
    private String appointment_remarks;



    // 审核状态
    @TableField(value = "examine_state")
    private String examine_state;



    // 审核回复
    @TableField(value = "examine_reply")
    private String examine_reply;




    // 更新时间
    @TableField(value = "update_time")
    private Timestamp update_time;

    // 创建时间
    @TableField(value = "create_time")
    private Timestamp create_time;







}
