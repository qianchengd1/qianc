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
 * 服务评价：(ServiceEvaluation)表实体类
 *
 */
@TableName("`service_evaluation`")
@Data
@EqualsAndHashCode(callSuper = false)
public class ServiceEvaluation implements Serializable {

    // ServiceEvaluation编号
    @TableId(value = "service_evaluation_id", type = IdType.AUTO)
    private Integer service_evaluation_id;

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
    // 评价等级
    @TableField(value = "`evaluation_level`")
    private String evaluation_level;
    // 评价内容
    @TableField(value = "`evaluation_content`")
    private String evaluation_content;










    // 更新时间
    @TableField(value = "update_time")
    private Timestamp update_time;

    // 创建时间
    @TableField(value = "create_time")
    private Timestamp create_time;







}
